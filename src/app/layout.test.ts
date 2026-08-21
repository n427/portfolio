import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("portfolio metadata", () => {
  it("does not use em dashes in the browser title", () => {
    const layoutSource = readFileSync("src/app/layout.tsx", "utf8");

    expect(layoutSource).toContain('title: "Nicole Zhang: Product Builder"');
    expect(layoutSource).not.toContain("—");
  });
});
