import { describe, it, expect } from "vitest";
import { runWithTests, explainPyError, type RunResult } from "./runner";
import type { Py } from "./pyodide";

// fake Py: throws when code contains "BOOM: <error text>", else returns marker
const fake = (jsonOut = "{}"): Py => ({
  runPython(code: string) {
    const m = code.match(/BOOM: (.+)/);
    if (m) throw new Error(m[1]);
    return code.includes("json.dumps") ? jsonOut : undefined;
  },
});

describe("explainPyError", () => {
  it("passes assertion messages through verbatim", () => {
    expect(explainPyError("AssertionError: pop must return the last item")).toBe("pop must return the last item");
  });
  it("translates NameError", () => {
    expect(explainPyError("NameError: name 'totl' is not defined")).toContain("totl");
    expect(explainPyError("NameError: name 'totl' is not defined")).toContain("never created");
  });
  it("translates RecursionError", () => {
    expect(explainPyError("RecursionError: maximum recursion depth exceeded")).toContain("base case");
  });
});

describe("runWithTests", () => {
  const tests = [{ name: "t1", code: "assert True" }];
  it("passes when nothing throws and returns viz", () => {
    const r: RunResult = runWithTests(fake('{"nodes":[],"arrows":[]}'), "x = 1", tests, "state");
    expect(r.ok).toBe(true);
    expect(r.viz).toEqual({ nodes: [], arrows: [] });
  });
  it("collects verbal failures", () => {
    const r = runWithTests(fake(), "# BOOM: AssertionError: expected 3 items", tests);
    expect(r.ok).toBe(false);
    expect(r.failures).toEqual(["expected 3 items"]);
  });
});
