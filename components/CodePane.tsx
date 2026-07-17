"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { StructViz } from "./StructViz";
import { Rich } from "./Rich";
import type { StructState, BigOQuiz } from "@/lib/types";

export interface RunFeedbackProps {
  failures: string[];
  viz?: unknown;
  passed: boolean;
  failCount: number;
  running: boolean;
  onContinue: () => void;
  onReview: () => void;
  children?: ReactNode; // the editor area
  onRun: () => void;
  bigO?: BigOQuiz;
}

const isStructState = (v: unknown): v is StructState =>
  typeof v === "object" && v !== null && "nodes" in v && "arrows" in v;

const BIG_O_OPTIONS = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)"] as const;

export function CodePane({ failures, viz, passed, failCount, running, onContinue, onReview, children, onRun, bigO }: RunFeedbackProps) {
  const [bigOPick, setBigOPick] = useState<string | null>(null);
  const bigOCorrect = !bigO || bigOPick === bigO.answer;
  return (
    <div className="flex flex-col gap-3">
      {children}
      <div className="flex items-center gap-3">
        <button aria-label="Run code" onClick={onRun} disabled={running}
          className="rounded-lg bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-active active:scale-[0.98] disabled:opacity-50">
          {running ? "Running…" : "Run"}
        </button>
        {failCount >= 2 && !passed && (
          <button onClick={onReview} className="rounded-lg border border-hairline-strong bg-strong px-4 py-2 text-ink transition-all active:scale-[0.98]">
            Review this concept
          </button>
        )}
      </div>
      {failures.length > 0 && (
        <ul className="animate-fade-up flex flex-col gap-1 rounded-xl border border-error/30 bg-card p-3">
          {failures.map((f, i) => <li key={i} className="text-error"><Rich text={f} /></li>)}
        </ul>
      )}
      {passed && (
        <div className="animate-fade-up flex flex-col gap-3">
          {isStructState(viz) && (
            <div className="viz-canvas overflow-hidden rounded-xl border border-hairline p-4"><StructViz state={viz} className="mx-auto max-h-56 w-full" /></div>
          )}
          <p className="rounded-xl border border-success/30 bg-card p-3 text-success">All checks passed. This is your structure.</p>
          {bigO && (
            <div className="rounded-xl border border-hairline bg-card p-4">
              <p className="text-sm font-semibold text-ink"><Rich text={bigO.fn ? `One more thing: time complexity of \`${bigO.fn}\`?` : "One more thing: time complexity of your solution?"} /></p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {BIG_O_OPTIONS.map((option) => {
                  const picked = bigOPick === option;
                  const isAnswer = option === bigO.answer;
                  return (
                    <button key={option} onClick={() => setBigOPick(option)} disabled={bigOCorrect && !isAnswer}
                      className={`rounded-lg border px-3 py-1.5 font-mono text-[13px] transition-all active:scale-[0.98] ${
                        picked && isAnswer ? "border-success/40 bg-success/15 text-success"
                        : picked ? "border-error/40 bg-error/15 text-error"
                        : "border-hairline-strong bg-strong text-body hover:text-ink disabled:opacity-40"
                      }`}>
                      {option}
                    </button>
                  );
                })}
              </div>
              {bigOPick && (bigOPick === bigO.answer ? (
                <p className="animate-caption mt-2.5 text-sm text-success"><Rich text={`Correct. ${bigO.explain}`} /></p>
              ) : (
                <p className="animate-caption mt-2.5 text-sm text-error">Not quite — how does the work grow as the input grows?</p>
              ))}
            </div>
          )}
          {bigOCorrect && (
            <button onClick={onContinue} className="self-start rounded-lg bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-active active:scale-[0.98]">Continue</button>
          )}
        </div>
      )}
    </div>
  );
}
