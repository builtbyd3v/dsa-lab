"use client";
import { Fragment, useState } from "react";
import type { FillinRung } from "@/lib/types";
import { loadPy } from "@/lib/engine/pyodide";
import { runWithTests } from "@/lib/engine/runner";
import { CodePane } from "./CodePane";
import { PyCode } from "./PyCode";
import { Rich } from "./Rich";

export interface FillinPaneProps { rung: FillinRung; onPass: () => void; onReview: (stepIndex: number) => void }

export function FillinPane({ rung, onPass, onReview }: FillinPaneProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [failures, setFailures] = useState<string[]>([]);
  const [viz, setViz] = useState<unknown>();
  const [passed, setPassed] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [running, setRunning] = useState(false);

  const run = async () => {
    const wrong = rung.blanks.filter((b) => (values[b.id] ?? "").trim() !== b.answer);
    if (wrong.length > 0) {
      setFailures(wrong.map((b) => b.explainWrong));
      setFailCount((c) => c + 1);
      return;
    }
    setRunning(true);
    try {
      const code = rung.blanks.reduce((c, b) => c.replaceAll(`{{${b.id}}}`, b.answer), rung.code);
      const r = runWithTests(await loadPy(), code, rung.tests, rung.vizExpr);
      setFailures(r.failures);
      setViz(r.viz);
      if (r.ok) setPassed(true); else setFailCount((c) => c + 1);
    } finally {
      setRunning(false);
    }
  };

  const parts = rung.code.split(/(\{\{\w+\}\})/);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-medium text-ink"><Rich text={rung.prompt} /></p>
      <CodePane failures={failures} viz={viz} passed={passed} failCount={failCount} running={running}
        onContinue={onPass} onReview={() => onReview(rung.reviewStep)} onRun={run}>
        <pre className="whitespace-pre-wrap rounded-xl border border-hairline bg-card p-4 font-mono text-[13px] leading-relaxed text-ink">
          {parts.map((p, i) => {
            const m = p.match(/^\{\{(\w+)\}\}$/);
            if (!m) return <Fragment key={i}><PyCode code={p} /></Fragment>;
            const blank = rung.blanks.find((b) => b.id === m[1]);
            return (
              <input key={i} aria-label={m[1]} value={values[m[1]] ?? ""} placeholder={blank?.placeholder ?? "___"}
                onChange={(e) => setValues((v) => ({ ...v, [m[1]]: e.target.value }))}
                className="mx-1 inline-block w-28 rounded-md border border-hairline-strong bg-canvas-soft px-2 py-0.5 text-ink outline-none transition-colors focus:border-primary" />
            );
          })}
        </pre>
      </CodePane>
    </div>
  );
}
