"use client";
import { useState } from "react";
import type { PredictRung } from "@/lib/types";
import { StepPlayer } from "./StepPlayer";
import { StructViz } from "./StructViz";
import { Rich } from "./Rich";

export interface PredictPaneProps {
  rung: PredictRung;
  onPass: () => void;
  onReview: (stepIndex: number) => void;
}

export function PredictPane({ rung, onPass, onReview }: PredictPaneProps) {
  const [ready, setReady] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);

  const pick = (id: string) => {
    if (correct) return;
    if (id === rung.correctId) { setCorrect(true); setFeedback(null); }
    else { setWrongCount((c) => c + 1); setFeedback(rung.explainWrong[id] ?? "Not quite. Look at the last step again."); }
  };

  return (
    <div className="flex flex-col gap-4">
      <StepPlayer steps={rung.steps} onFinished={() => setReady(true)} />
      {ready && (
        <div className="animate-fade-up flex flex-col gap-3">
          <p className="text-lg font-medium text-ink"><Rich text={rung.prompt} /></p>
          <div className="flex flex-wrap gap-2">
            {rung.options.map((o) => (
              <button key={o.id} onClick={() => pick(o.id)} disabled={correct}
                className="rounded-lg border border-hairline-strong bg-card px-4 py-2 text-ink transition-all hover:border-ink active:scale-[0.98] disabled:opacity-50">
                <Rich text={o.label} />
              </button>
            ))}
          </div>
          {feedback && <p className="rounded-xl border border-error/30 bg-card p-3 text-error"><Rich text={feedback} /></p>}
          {wrongCount >= 2 && !correct && (
            <button onClick={() => onReview(rung.reviewStep)}
              className="self-start rounded-lg border border-hairline-strong bg-strong px-4 py-2 text-ink transition-all active:scale-[0.98]">
              Review this concept
            </button>
          )}
          {correct && (
            <div className="animate-fade-up flex flex-col gap-3">
              <div className="viz-canvas overflow-hidden rounded-xl border border-hairline p-4">
                <StructViz state={rung.revealStep.state} className="mx-auto max-h-56 w-full" />
              </div>
              <p className="rounded-xl border border-success/30 bg-card p-3 text-success"><Rich text={rung.revealStep.caption} /></p>
              <button onClick={onPass} className="self-start rounded-lg bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-active active:scale-[0.98]">Continue</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
