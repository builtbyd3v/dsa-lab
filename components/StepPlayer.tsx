"use client";
import { useEffect, useRef, useState } from "react";
import type { Step } from "@/lib/types";
import { StructViz } from "./StructViz";

export interface StepPlayerProps {
  steps: Step[];
  autoPlay?: boolean;
  startAt?: number;
  onFinished?: () => void;
}

export function StepPlayer({ steps, autoPlay = true, startAt = 0, onFinished }: StepPlayerProps) {
  const [i, setI] = useState(Math.min(startAt, steps.length - 1));
  const [playing, setPlaying] = useState(autoPlay);
  const finished = useRef(false);

  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) { setPlaying(false); return; }
    const t = setInterval(() => setI((n) => Math.min(n + 1, steps.length - 1)), 2500);
    return () => clearInterval(t);
  }, [playing, i, steps.length]);

  useEffect(() => {
    if (i === steps.length - 1 && !finished.current) {
      finished.current = true;
      onFinished?.();
    }
  }, [i, steps.length, onFinished]);

  const manual = (n: number) => { setPlaying(false); setI(n); };
  const step = steps[i];

  return (
    <div className="flex flex-col gap-5">
      <div className="viz-canvas overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <StructViz state={step.state} className="mx-auto max-h-96 w-full" />
      </div>
      <p key={i} className="animate-caption min-h-12 text-center text-xl text-zinc-100">{step.caption}</p>
      <div className="flex items-center justify-center gap-2">
        <button aria-label="Previous step" disabled={i === 0} onClick={() => manual(i - 1)}
          className="rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200 disabled:opacity-30">←</button>
        <button aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}
          className="rounded-full bg-teal-600 px-4 py-1.5 text-sm text-white transition-all hover:brightness-110 active:scale-[0.98]">{playing ? "❚❚" : "▶"}</button>
        <button aria-label="Next step" disabled={i === steps.length - 1} onClick={() => manual(i + 1)}
          className="rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200 disabled:opacity-30">→</button>
        <span className="ml-2 text-xs tabular-nums text-zinc-500">{i + 1} / {steps.length}</span>
      </div>
      <div className="flex justify-center gap-1.5">
        {steps.map((_, n) => (
          <button key={n} aria-label={`Go to step ${n + 1}`} onClick={() => manual(n)}
            className={`h-1.5 w-4 rounded-full transition-colors ${n <= i ? "bg-teal-500" : "bg-zinc-800"}`} />
        ))}
      </div>
    </div>
  );
}
