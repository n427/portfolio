import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveTheme, THEME_BOOTSTRAP_SCRIPT } from "./theme";
import { ThemeToggle } from "./theme-toggle";

function runBootstrap() {
  Function(THEME_BOOTSTRAP_SCRIPT)();
}

describe("resolveTheme", () => {
  it("prefers a saved valid theme over the system preference", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("falls back to the system preference", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });

  it("treats an invalid saved value like no saved preference", () => {
    expect(resolveTheme("sepia", true)).toBe("dark");
    expect(resolveTheme("sepia", false)).toBe("light");
  });
});

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.style.colorScheme = "";
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
  });

  afterEach(cleanup);

  it.each([
    { label: "saved dark", savedTheme: "dark", prefersDark: false },
    { label: "system dark", savedTheme: null, prefersDark: true },
    { label: "invalid saved value with system dark", savedTheme: "sepia", prefersDark: true },
  ])("initializes and applies a dark theme on mount for $label", ({ savedTheme, prefersDark }) => {
    if (savedTheme) localStorage.setItem("theme", savedTheme);
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: prefersDark })));

    render(<ThemeToggle />);

    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  });

  it("uses the system preference during bootstrap when the saved value is invalid", () => {
    localStorage.setItem("theme", "sepia");
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));

    runBootstrap();

    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("toggles and persists the active theme", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  });
});
