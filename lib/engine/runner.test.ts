import { describe, it, expect } from "vitest";
import { runWithTests, explainPyError, type RunResult } from "./runner";
import type { Py } from "./pyodide";

// fake Py: throws when code contains "BOOM: <error text>", else returns marker
// The runner wraps user code in exec(compile(JSON.stringify(code), ...)), which
// escapes real newlines as literal "\n" sequences, so the BOOM marker's error
// text now sits inside a JSON string literal on a single line. Match
// non-greedily up to that escaped newline (or end of string) so we don't
// swallow the rest of the wrapper code.
const fake = (jsonOut = "{}"): Py => ({
  runPython(code: string) {
    const m = code.match(/BOOM: (.+?)(?:\\n|$)/);
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
  it("maps a multi-line traceback ending in TypeError to the real error line, not the traceback header", () => {
    const message = [
      "Traceback (most recent call last):",
      '  File "<user>", line 3, in <module>',
      "  File \"<user>\", line 1, in add",
      "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
    ].join("\n");
    const feedback = explainPyError(message);
    expect(feedback).toContain("TypeError: unsupported operand type(s) for +: 'int' and 'str'");
    expect(feedback).not.toContain("Traceback");
  });
  it("falls back to the last line of a multi-line traceback for unrecognized errors", () => {
    const message = [
      "Traceback (most recent call last):",
      '  File "<user>", line 2, in <module>',
      "ZeroDivisionError: division by zero",
    ].join("\n");
    expect(explainPyError(message)).toBe("ZeroDivisionError: division by zero");
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
  it("returns viz from the wrapped isolated program when all tests pass", () => {
    const r: RunResult = runWithTests(fake('{"nodes":[1],"arrows":[]}'), "x = 1", tests, "state");
    expect(r.ok).toBe(true);
    expect(r.viz).toEqual({ nodes: [1], arrows: [] });
  });
});
