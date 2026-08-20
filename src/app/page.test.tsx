import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PortfolioPage from "./page";
import { PROJECTS } from "./projects";

vi.mock("next/image", () => ({
  default: ({
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    delete props.priority;
    // eslint-disable-next-line @next/next/no-img-element -- predictable static image test double
    return <img alt={alt} {...props} />;
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(cleanup);

describe("portfolio content", () => {
  it("retains all eight projects in the approved order", () => {
    expect(PROJECTS.map((project) => project.title)).toEqual([
      "Tagged — Weekly Photo Challenges",
      "Jobflow — AI Resume Customizer",
      "Peekaboo — AI Visibility Analytics",
      "Produ — SWE Soft-Skills Evaluator",
      "Visual Cognition Lab — Research Dashboard",
      "Dyrt — Waste Audit Tracking Platform",
      "Meta Glasses — Smart Glasses Prototypes",
      "PostaCare — Postnatal Depression Screening",
    ]);
  });

  it("provides a destination, image, description, and tags for every project", () => {
    expect(PROJECTS).toHaveLength(8);
    for (const project of PROJECTS) {
      expect(project.href).toMatch(/^https:\/\//);
      expect(project.description.length).toBeGreaterThan(20);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.image).toBeTruthy();
    }
  });
});

describe("PortfolioPage", () => {
  it("renders Nicole's intro, contact links, and all projects", () => {
    const { container } = render(<PortfolioPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Hi, I'm Nicole," })).toBeVisible();
    expect(screen.getAllByTestId("project-link")).toHaveLength(8);
    expect(container.querySelector(".section-heading")).toBeInTheDocument();
    expect(container.querySelector(".project-list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute("href", "https://github.com/n427");
    expect(screen.getByRole("link", { name: "linkedin" })).toHaveAttribute("href", "https://www.linkedin.com/in/nicolexzhang/");
    expect(screen.getByRole("link", { name: "nicolexzha@gmail.com" })).toHaveAttribute("href", "mailto:nicolexzha@gmail.com");
  });

  it("reveals the matching screenshot on project focus", () => {
    render(<PortfolioPage />);
    const tagged = screen.getByRole("link", { name: /Tagged — Weekly Photo Challenges/ });
    fireEvent.focus(tagged);
    expect(screen.getByRole("img", { name: "Tagged — Weekly Photo Challenges preview" })).toBeVisible();
    fireEvent.blur(tagged);
    expect(screen.queryByRole("img", { name: "Tagged — Weekly Photo Challenges preview" })).not.toBeInTheDocument();
  });

  it("does not render the reference author's content", () => {
    render(<PortfolioPage />);
    expect(screen.queryByText(/Dieter Rams/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Good design is as little design/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/writings/i)).not.toBeInTheDocument();
  });
});
