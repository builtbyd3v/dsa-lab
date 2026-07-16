import { describe, it, expect } from "vitest";
import { allChapters, getUnit, nextUnit } from "./index";

describe("content registry", () => {
  it("starts empty and safe", () => {
    expect(allChapters()).toEqual([]);
    expect(getUnit("nope", "nope")).toBeUndefined();
    expect(nextUnit("nope", "nope")).toBeNull();
  });
});
