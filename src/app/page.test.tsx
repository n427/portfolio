import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PortfolioPage from "./page";
import { INTERNSHIPS, PROJECTS, RESEARCH, WORK_ITEMS } from "./projects";

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
  it("groups the approved work into internships, research, and projects", () => {
    expect(INTERNSHIPS.map((item) => item.title)).toEqual([
      "Meridian AI",
      "Evolution Design Lab",
      "Jobflow: AI Resume Customizer",
      "Peekaboo: AI Visibility Analytics",
      "Produ: SWE Soft-Skills Evaluator",
      "Dyrt: Waste Audit Tracking Platform",
    ]);
    expect(RESEARCH.map((item) => item.title)).toEqual([
      "USC Image Processing and Informatics Lab",
      "Visual Cognition Lab: Research Dashboard",
    ]);
    expect(PROJECTS.map((item) => item.title)).toEqual([
      "Tagged: Weekly Photo Challenges",
      "Meta Glasses: Smart Glasses Prototypes",
      "PostaCare: Postnatal Depression Screening",
    ]);
  });

  it("provides useful descriptions and tools without em dashes", () => {
    expect(WORK_ITEMS).toHaveLength(11);
    for (const item of WORK_ITEMS) {
      expect(item.description.length).toBeGreaterThan(20);
      expect(item.tags.length).toBeGreaterThan(0);
      expect(JSON.stringify(item)).not.toContain("—");
    }
  });

  it("includes resume-sourced roles and dates for the new experience entries", () => {
    expect(INTERNSHIPS[0]).toMatchObject({
      title: "Meridian AI",
      role: "Incoming AI Software Engineer",
      date: "Sep 2026",
    });
    expect(INTERNSHIPS[1]).toMatchObject({
      title: "Evolution Design Lab",
      role: "Applied AI Engineer",
      date: "May 2026 to present",
    });
    expect(RESEARCH[0]).toMatchObject({
      title: "USC Image Processing and Informatics Lab",
      role: "Incoming Machine Learning Researcher",
      date: "Sep 2026",
    });
  });
});

describe("PortfolioPage", () => {
  it("renders the three work sections, contact links, and all entries", () => {
    const { container } = render(<PortfolioPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Hi, I'm Nicole!" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "internships" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "research" })).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "projects" })).toBeVisible();
    expect(screen.getByText("© 2026 Nicole Zhang")).toBeVisible();
    expect(screen.getAllByTestId("work-item")).toHaveLength(11);
    expect(screen.getAllByTestId("project-link")).toHaveLength(9);
    expect(container.querySelector(".section-heading")).toBeInTheDocument();
    expect(container.querySelector(".project-list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "github opens in a new tab" })).toHaveAttribute(
      "href",
      "https://github.com/n427",
    );
    expect(screen.getByRole("link", { name: "linkedin opens in a new tab" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nicolexzhang/",
    );
    expect(screen.getByRole("link", { name: "nicolexzha@gmail.com" })).toHaveAttribute("href", "mailto:nicolexzha@gmail.com");
    expect(screen.getByRole("link", { name: /Evolution Design Lab/ })).toHaveAttribute(
      "href",
      "https://www.stylaos.com/",
    );

    for (const project of WORK_ITEMS.filter((item) => item.href)) {
      const roleAndDate = project.role && project.date
        ? `${project.role} · ${project.date}`
        : project.role ?? project.date ?? "";
      expect(
        screen.getByRole("link", {
          name: `${project.title} ${roleAndDate} ${project.description} ${project.tags.join(" · ")} opens in a new tab`.replace("  ", " "),
        }),
      ).toHaveAttribute("target", "_blank");
    }
    expect(container.textContent).not.toContain("—");
  });

  it("reveals the matching screenshot on project focus", () => {
    render(<PortfolioPage />);
    const tagged = screen.getByRole("link", { name: /Tagged: Weekly Photo Challenges/ });
    fireEvent.focus(tagged);
    expect(screen.getByRole("img", { name: "Tagged: Weekly Photo Challenges preview" })).toBeVisible();
    fireEvent.blur(tagged);
    expect(screen.queryByRole("img", { name: "Tagged: Weekly Photo Challenges preview" })).not.toBeInTheDocument();
  });

  it("keeps the focused preview after a hovered project is left", () => {
    render(<PortfolioPage />);
    const jobflow = screen.getByRole("link", { name: /Jobflow: AI Resume Customizer/ });
    const peekaboo = screen.getByRole("link", { name: /Peekaboo: AI Visibility Analytics/ });

    fireEvent.focus(jobflow);
    fireEvent.mouseEnter(peekaboo);
    expect(screen.getByRole("img", { name: "Jobflow: AI Resume Customizer preview" })).toBeVisible();

    fireEvent.mouseLeave(peekaboo);
    expect(screen.getByRole("img", { name: "Jobflow: AI Resume Customizer preview" })).toBeVisible();
  });

  it("restores the hovered preview after focus clears and hides it only after both clear", () => {
    render(<PortfolioPage />);
    const jobflow = screen.getByRole("link", { name: /Jobflow: AI Resume Customizer/ });
    const peekaboo = screen.getByRole("link", { name: /Peekaboo: AI Visibility Analytics/ });

    fireEvent.mouseEnter(jobflow);
    fireEvent.focus(peekaboo);
    expect(screen.getByRole("img", { name: "Peekaboo: AI Visibility Analytics preview" })).toBeVisible();

    fireEvent.blur(peekaboo);
    expect(screen.getByRole("img", { name: "Jobflow: AI Resume Customizer preview" })).toBeVisible();

    fireEvent.mouseLeave(jobflow);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("does not render the reference author's content", () => {
    render(<PortfolioPage />);
    expect(screen.queryByText(/Dieter Rams/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Good design is as little design/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/writings/i)).not.toBeInTheDocument();
  });
});
