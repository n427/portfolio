import { describe, expect, it } from "vitest";
import { PROJECTS } from "./projects";

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
