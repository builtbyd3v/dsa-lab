"use client";
import { useState } from "react";
import type { WriteRung } from "@/lib/types";
import { loadPy } from "@/lib/engine/pyodide";
import { runWithTests } from "@/lib/engine/runner";
import { CodePane } from "./CodePane";
import { PyCode } from "./PyCode";
import { PyEditor } from "./PyEditor";
import { Rich } from "./Rich";

export interface WritePaneProps {
  rung: WriteRung;
  onPass: () => void;
  onReview: (stepIndex: number) => void;
  onResult?: (passed: boolean) => void;
  onReveal?: () => void;
  draftKey?: string;
}

function draftStorageKey(draftKey: string) {
  return `dsa-lab-draft:${draftKey}`;
}

function readDraft(draftKey: string | undefined, fallback: string): string {
  if (!draftKey) return fallback;
  try {
    const stored = localStorage.getItem(draftStorageKey(draftKey));
    return stored ?? fallback;
  } catch {
    return fallback;
  }
}

function writeDraft(draftKey: string | undefined, value: string) {
  if (!draftKey) return;
  try {
    localStorage.setItem(draftStorageKey(draftKey), value);
  } catch {
    // ignore quota/privacy errors
  }
}

function clearDraft(draftKey: string | undefined) {
  if (!draftKey) return;
  try {
    localStorage.removeItem(draftStorageKey(draftKey));
  } catch {
    // ignore quota/privacy errors
  }
}

export function WritePane({ rung, onPass, onReview, onResult, onReveal, draftKey }: WritePaneProps) {
  const [code, setCode] = useState(() => readDraft(draftKey, rung.starter));
  const [failures, setFailures] = useState<string[]>([]);
  const [viz, setViz] = useState<unknown>();
  const [passed, setPassed] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleCodeChange = (value: string) => {
    setCode(value);
    writeDraft(draftKey, value);
  };

  const run = async () => {
    if (running) return;
    setRunning(true);
    try {
      const fullCode = rung.hidden ? `${rung.hidden}\n\n${code}` : code;
      const r = runWithTests(await loadPy(), fullCode, rung.tests, rung.vizExpr);
      setFailures(r.failures);
      setViz(r.viz);
      if (r.ok) {
        setPassed(true);
        clearDraft(draftKey);
      } else {
        setFailCount((c) => c + 1);
      }
      onResult?.(r.ok);
    } finally {
      setRunning(false);
    }
  };

  const reveal = () => {
    setRevealed(true);
    onReveal?.();
  };

  return (
    <div className="flex flex-col gap-3">
      {rung.difficulty && (
        <span className={`self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
          rung.difficulty === "Easy" ? "bg-success/15 text-success"
          : rung.difficulty === "Medium" ? "bg-tl-done/15 text-tl-done"
          : "bg-error/15 text-error"
        }`}>
          {rung.difficulty}
        </span>
      )}
      <p className="text-lg font-medium text-ink"><Rich text={rung.prompt} /></p>
      {rung.examples?.map((example, i) => (
        <div key={i}>
          <p className="text-sm font-semibold text-ink">Example {i + 1}:</p>
          <div className="mt-1.5 flex flex-col gap-1 rounded-xl border border-hairline bg-card p-3.5 font-mono text-[13px] leading-relaxed">
            <p><span className="font-semibold text-muted">Input: </span><span className="text-ink"><Rich text={example.input} /></span></p>
            <p><span className="font-semibold text-muted">Output: </span><span className="text-ink"><Rich text={example.output} /></span></p>
            {example.explanation && (
              <p><span className="font-semibold text-muted">Explanation: </span><span className="text-body"><Rich text={example.explanation} /></span></p>
            )}
          </div>
        </div>
      ))}
      {rung.constraints && rung.constraints.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-ink">Constraints:</p>
          <ul className="mt-1.5 list-disc pl-5 font-mono text-[13px] leading-relaxed text-body">
            {rung.constraints.map((constraint, i) => <li key={i}><Rich text={constraint} /></li>)}
          </ul>
        </div>
      )}
      <CodePane failures={failures} viz={viz} passed={passed} failCount={failCount} running={running}
        onContinue={onPass} onReview={() => onReview(rung.reviewStep)} onRun={run} bigO={rung.bigO}>
        <PyEditor value={code} onChange={handleCodeChange} onRun={run} />
      </CodePane>
      {failCount >= 3 && !passed && rung.solution && !revealed && (
        <button onClick={reveal}
          className="rounded-lg border border-hairline-strong bg-strong px-4 py-2 text-sm text-body transition-colors hover:text-ink">
          Show solution
        </button>
      )}
      {revealed && rung.solution && (
        <div className="flex flex-col gap-1.5">
          <pre className="animate-fade-up overflow-x-auto rounded-xl border border-hairline bg-card p-4 font-mono text-[13px] leading-relaxed text-ink"><PyCode code={rung.solution} /></pre>
          <p className="text-sm text-muted">Study it, then close this page — this problem returns for a blank re-solve.</p>
        </div>
      )}
    </div>
  );
}
