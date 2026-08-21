import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("portfolio metadata", () => {
  it("does not use em dashes in the browser title", () => {
    const layoutSource = readFileSync("src/app/layout.tsx", "utf8");

    expect(layoutSource).toContain('title: "Nicole Zhang: Product Builder"');
    expect(layoutSource).not.toContain("—");
  });

  it("uses the body font in the footer and tighter contact spacing", () => {
    const stylesheet = readFileSync("src/app/globals.css", "utf8");

    expect(stylesheet).toContain(".contact-section { margin-top: 3.25rem; }");
    expect(stylesheet).toMatch(/footer \{[^}]*margin-top: 3\.5rem;[^}]*font-family: inherit;/s);
  });
});
