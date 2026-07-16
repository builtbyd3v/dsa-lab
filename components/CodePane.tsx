"use client";
import type { ReactNode } from "react";
import { StructViz } from "./StructViz";
import type { StructState } from "@/lib/types";

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
}

const isStructState = (v: unknown): v is StructState =>
  typeof v === "object" && v !== null && "nodes" in v && "arrows" in v;

export function CodePane({ failures, viz, passed, failCount, running, onContinue, onReview, children, onRun }: RunFeedbackProps) {
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
          {failures.map((f, i) => <li key={i} className="text-error">{f}</li>)}
        </ul>
      )}
      {passed && (
        <div className="animate-fade-up flex flex-col gap-3">
          {isStructState(viz) && (
            <div className="viz-canvas overflow-hidden rounded-xl border border-hairline p-4"><StructViz state={viz} className="mx-auto max-h-56 w-full" /></div>
          )}
          <p className="rounded-xl border border-success/30 bg-card p-3 text-success">All checks passed. This is your structure.</p>
          <button onClick={onContinue} className="self-start rounded-lg bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-active active:scale-[0.98]">Continue</button>
        </div>
      )}
    </div>
  );
}
