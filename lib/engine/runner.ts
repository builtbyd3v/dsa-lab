import type { CodeTest } from "@/lib/types";
import type { Py } from "./pyodide";

export interface RunResult { ok: boolean; failures: string[]; viz?: unknown }

const firstLine = (s: string): string => s.split("\n")[0];

export function explainPyError(message: string): string {
  const assertion = message.match(/AssertionError: ([\s\S]+)/);
  if (assertion) return firstLine(assertion[1]).trim();
  const nameErr = message.match(/NameError: name '(\w+)' is not defined/);
  if (nameErr) return `You used ${nameErr[1]} but never created it. Check your spelling and that you assigned it first.`;
  if (message.includes("IndexError")) return "You reached past the end. Remember the last index is length minus 1.";
  const keyErr = message.match(/KeyError: (.+)/);
  if (keyErr) return `The key ${firstLine(keyErr[1])} is not in the dictionary. It must be added before you can read it.`;
  if (message.includes("TypeError")) return `Type mismatch: ${firstLine(message)}. Check what kind of value each variable holds.`;
  if (message.includes("IndentationError") || message.includes("SyntaxError"))
    return `Python could not read this code: ${firstLine(message)}. Check colons and indentation.`;
  if (message.includes("RecursionError")) return "Your function never reaches a base case, so it calls itself forever.";
  return firstLine(message);
}

export function runWithTests(py: Py, userCode: string, tests: CodeTest[], vizExpr?: string): RunResult {
  const failures: string[] = [];
  for (const t of tests) {
    try {
      py.runPython(`${userCode}\n${t.code}`);
    } catch (e) {
      failures.push(explainPyError(e instanceof Error ? e.message : String(e)));
    }
  }
  let viz: unknown;
  if (failures.length === 0 && vizExpr) {
    try {
      const out = py.runPython(`${userCode}\nimport json\njson.dumps(${vizExpr})`);
      viz = JSON.parse(String(out));
    } catch { /* viz optional; ignore */ }
  }
  return { ok: failures.length === 0, failures, viz };
}
