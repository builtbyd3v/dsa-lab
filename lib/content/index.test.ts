import { describe, it, expect } from "vitest";
import { allChapters, getUnit, nextUnit } from "./index";

describe("content registry", () => {
  it("has registered chapters and stays safe for unknown lookups", () => {
    expect(allChapters().length).toBeGreaterThan(0);
    expect(getUnit("nope", "nope")).toBeUndefined();
    expect(nextUnit("nope", "nope")).toBeNull();
  });
});
