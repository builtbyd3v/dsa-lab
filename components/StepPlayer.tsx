"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Step } from "@/lib/types";
import { boundsOf } from "@/lib/viz/layout";
import { StructViz } from "./StructViz";
import { Rich } from "./Rich";

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
    // reading time scales with caption length
    const delay = Math.min(3000 + steps[i].caption.length * 35, 7000);
    const t = setTimeout(() => setI((n) => Math.min(n + 1, steps.length - 1)), delay);
    return () => clearTimeout(t);
  }, [playing, i, steps]);

  useEffect(() => {
    if (i === steps.length - 1 && !finished.current) {
      finished.current = true;
      onFinished?.();
    }
  }, [i, steps.length, onFinished]);

  const manual = (n: number) => { setPlaying(false); setI(n); };
  const step = steps[i];
  // constant drawing bounds across all steps so the frame never rescales
  const bounds = useMemo(() => boundsOf(steps.map((s) => s.state)), [steps]);

  return (
    <div className="flex flex-col gap-5">
      <div className="viz-canvas flex h-96 items-center justify-center overflow-hidden rounded-xl border border-hairline p-8">
        <StructViz state={step.state} bounds={bounds} className="h-full w-full" />
      </div>
      <p key={i} className="animate-caption mx-auto min-h-16 max-w-xl text-center text-lg leading-relaxed text-ink"><Rich text={step.caption} /></p>
      <div className="flex items-center justify-center gap-2">
        <button aria-label="Previous step" disabled={i === 0} onClick={() => manual(i - 1)}
          className="rounded-lg border border-hairline-strong bg-card px-3 py-1.5 text-sm text-body transition-colors hover:text-ink disabled:opacity-30">←</button>
        <button aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}
          className="rounded-lg bg-ink px-4 py-1.5 text-sm text-canvas transition-all hover:opacity-90 active:scale-[0.98]">{playing ? "❚❚" : "▶"}</button>
        <button aria-label="Next step" disabled={i === steps.length - 1} onClick={() => manual(i + 1)}
          className="rounded-lg border border-hairline-strong bg-card px-3 py-1.5 text-sm text-body transition-colors hover:text-ink disabled:opacity-30">→</button>
        <span className="ml-2 font-mono text-xs tabular-nums text-muted">{i + 1} / {steps.length}</span>
      </div>
      <div className="flex justify-center gap-1.5">
        {steps.map((_, n) => (
          <button key={n} aria-label={`Go to step ${n + 1}`} onClick={() => manual(n)}
            className={`h-1.5 w-4 rounded-full transition-colors ${n <= i ? "bg-ink" : "bg-hairline"}`} />
        ))}
      </div>
    </div>
  );
}
