import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { AmbientWeb, displacePoint, shouldAnimateWeb } from "./ambient-web";

describe("AmbientWeb", () => {
  it("renders a decorative canvas behind the page", () => {
    render(<AmbientWeb />);

    const canvas = screen.getByTestId("ambient-web");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas).toHaveClass("ambient-web");
  });

  it("pushes a nearby point away from the cursor", () => {
    expect(displacePoint({ x: 105, y: 100 }, { x: 100, y: 100 }, 40)).toEqual({
      x: 135.625,
      y: 100,
    });
  });

  it("does not move a point outside the cursor radius", () => {
    expect(displacePoint({ x: 150, y: 100 }, { x: 100, y: 100 }, 40)).toEqual({
      x: 150,
      y: 100,
    });
  });

  it("pauses for reduced motion, touch pointers, and hidden tabs", () => {
    expect(shouldAnimateWeb(false, false, false)).toBe(true);
    expect(shouldAnimateWeb(true, false, false)).toBe(false);
    expect(shouldAnimateWeb(false, true, false)).toBe(false);
    expect(shouldAnimateWeb(false, false, true)).toBe(false);
  });
});
