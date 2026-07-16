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
          className="rounded-full bg-teal-600 px-5 py-2 font-medium text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50">
          {running ? "Running…" : "Run"}
        </button>
        {failCount >= 2 && !passed && (
          <button onClick={onReview} className="rounded-full border border-amber-700/60 bg-amber-950/40 px-4 py-2 text-amber-300 transition-all active:scale-[0.98]">
            Review this concept
          </button>
        )}
      </div>
      {failures.length > 0 && (
        <ul className="animate-fade-up flex flex-col gap-1 rounded-xl border border-red-900/60 bg-red-950/40 p-3">
          {failures.map((f, i) => <li key={i} className="text-red-300">{f}</li>)}
        </ul>
      )}
      {passed && (
        <div className="animate-fade-up flex flex-col gap-3">
          {isStructState(viz) && (
            <div className="viz-canvas overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-4"><StructViz state={viz} className="mx-auto max-h-56 w-full" /></div>
          )}
          <p className="rounded-xl border border-green-900/60 bg-green-950/40 p-3 text-green-300">All checks passed. This is your structure.</p>
          <button onClick={onContinue} className="self-start rounded-full bg-teal-600 px-5 py-2 font-medium text-white transition-all hover:brightness-110 active:scale-[0.98]">Continue</button>
        </div>
      )}
    </div>
  );
}
