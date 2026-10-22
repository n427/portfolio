import { describe, expect, it } from "vitest";
import { resolveUmamiConfig } from "./umami";

describe("resolveUmamiConfig", () => {
  it("stays off when no website id is configured", () => {
    expect(resolveUmamiConfig(undefined)).toBeNull();
    expect(resolveUmamiConfig("")).toBeNull();
    expect(resolveUmamiConfig("   ")).toBeNull();
  });

  it("defaults to Umami Cloud when no script url is given", () => {
    expect(resolveUmamiConfig("abc-123")).toEqual({
      src: "https://cloud.umami.is/script.js",
      websiteId: "abc-123",
    });
  });

  it("falls back to the cloud script when the url is blank", () => {
    expect(resolveUmamiConfig("abc-123", "  ")?.src).toBe(
      "https://cloud.umami.is/script.js",
    );
  });

  it("uses a self-hosted script url when one is given", () => {
    expect(resolveUmamiConfig("abc-123", "https://stats.example.com/script.js")).toEqual({
      src: "https://stats.example.com/script.js",
      websiteId: "abc-123",
    });
  });

  it("passes through a domain allowlist and omits it when blank", () => {
    expect(resolveUmamiConfig("abc-123", undefined, "n427.github.io")?.domains).toBe(
      "n427.github.io",
    );
    expect(resolveUmamiConfig("abc-123", undefined, "  ")).not.toHaveProperty("domains");
  });

  it("trims surrounding whitespace", () => {
    expect(resolveUmamiConfig(" abc-123 ", " https://stats.example.com/script.js ")).toEqual({
      src: "https://stats.example.com/script.js",
      websiteId: "abc-123",
    });
  });
});
