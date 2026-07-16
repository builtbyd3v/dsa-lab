"use client";
import { useState } from "react";
import type { WriteRung } from "@/lib/types";
import { loadPy } from "@/lib/engine/pyodide";
import { runWithTests } from "@/lib/engine/runner";
import { CodePane } from "./CodePane";

export interface WritePaneProps { rung: WriteRung; onPass: () => void; onReview: (stepIndex: number) => void }

export function WritePane({ rung, onPass, onReview }: WritePaneProps) {
  const [code, setCode] = useState(rung.starter);
  const [failures, setFailures] = useState<string[]>([]);
  const [viz, setViz] = useState<unknown>();
  const [passed, setPassed] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    try {
      const r = runWithTests(await loadPy(), code, rung.tests, rung.vizExpr);
      setFailures(r.failures);
      setViz(r.viz);
      if (r.ok) setPassed(true); else setFailCount((c) => c + 1);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-medium text-zinc-100">{rung.prompt}</p>
      <CodePane failures={failures} viz={viz} passed={passed} failCount={failCount} running={running}
        onContinue={onPass} onReview={() => onReview(rung.reviewStep)} onRun={run}>
        <textarea aria-label="Code editor" rows={14} value={code} spellCheck={false}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-xl bg-zinc-950 p-4 font-mono text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-teal-700" />
      </CodePane>
    </div>
  );
}
