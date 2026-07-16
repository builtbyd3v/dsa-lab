import type { CodeTest } from "@/lib/types";
import type { Py } from "./pyodide";

export interface RunResult { ok: boolean; failures: string[]; viz?: unknown }

const firstLine = (s: string): string => s.split("\n")[0];

// Pyodide errors are often multi-line tracebacks like:
//   Traceback (most recent call last):
//     File "<user>", line 2, in <module>
//   TypeError: unsupported operand type(s) for +: 'int' and 'str'
// The real, human-relevant message is the last non-empty line, not the first
// (which is usually just "Traceback (most recent call last):").
const lastLine = (s: string): string => {
  const lines = s.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
  return lines.length > 0 ? lines[lines.length - 1] : s.trim();
};

// Isolate a run in a fresh namespace so variables from one test/rung never
// leak into the next. Without this, `py.runPython` shares pyodide's global
// namespace across every call, so a stale variable from an earlier run could
// mask a NameError in a later one.
const isolate = (code: string): string =>
  `exec(compile(${JSON.stringify(code)}, "<user>", "exec"), {})`;

const vizProgram = (code: string, expr: string): string =>
  `_ns = {}\nexec(compile(${JSON.stringify(code)}, "<user>", "exec"), _ns)\nimport json\njson.dumps(eval(${JSON.stringify(expr)}, _ns))`;

export function explainPyError(message: string): string {
  const assertion = message.match(/AssertionError: ([\s\S]+)/);
  if (assertion) return firstLine(assertion[1]).trim();
  const nameErr = message.match(/NameError: name '(\w+)' is not defined/);
  if (nameErr) return `You used ${nameErr[1]} but never created it. Check your spelling and that you assigned it first.`;
  if (message.includes("IndexError")) return "You reached past the end. Remember the last index is length minus 1.";
  const keyErr = message.match(/KeyError: (.+)/);
  if (keyErr) return `The key ${firstLine(keyErr[1])} is not in the dictionary. It must be added before you can read it.`;
  if (message.includes("TypeError")) return `Type mismatch: ${lastLine(message)}. Check what kind of value each variable holds.`;
  if (message.includes("IndentationError") || message.includes("SyntaxError"))
    return `Python could not read this code: ${lastLine(message)}. Check colons and indentation.`;
  if (message.includes("RecursionError")) return "Your function never reaches a base case, so it calls itself forever.";
  return lastLine(message);
}

export function runWithTests(py: Py, userCode: string, tests: CodeTest[], vizExpr?: string): RunResult {
  const failures: string[] = [];
  for (const t of tests) {
    try {
      py.runPython(isolate(`${userCode}\n${t.code}`));
    } catch (e) {
      failures.push(explainPyError(e instanceof Error ? e.message : String(e)));
    }
  }
  let viz: unknown;
  if (failures.length === 0 && vizExpr) {
    try {
      const out = py.runPython(vizProgram(userCode, vizExpr));
      viz = JSON.parse(String(out));
    } catch { /* viz optional; ignore */ }
  }
  return { ok: failures.length === 0, failures, viz };
}
