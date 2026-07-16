"use client";
import { useState } from "react";
import type { PredictRung } from "@/lib/types";
import { StepPlayer } from "./StepPlayer";
import { StructViz } from "./StructViz";

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
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium text-zinc-100">{rung.prompt}</p>
          <div className="flex flex-wrap gap-2">
            {rung.options.map((o) => (
              <button key={o.id} onClick={() => pick(o.id)} disabled={correct}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-200 hover:border-teal-500 disabled:opacity-50">
                {o.label}
              </button>
            ))}
          </div>
          {feedback && <p className="rounded-lg border border-red-900 bg-red-950 p-3 text-red-300">{feedback}</p>}
          {wrongCount >= 2 && !correct && (
            <button onClick={() => onReview(rung.reviewStep)}
              className="self-start rounded-lg border border-amber-700 bg-amber-950 px-4 py-2 text-amber-300">
              Review this concept
            </button>
          )}
          {correct && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-zinc-950 p-4">
                <StructViz state={rung.revealStep.state} className="mx-auto max-h-56 w-full" />
              </div>
              <p className="rounded-lg border border-green-900 bg-green-950 p-3 text-green-300">{rung.revealStep.caption}</p>
              <button onClick={onPass} className="self-start rounded-lg bg-teal-600 px-5 py-2 font-medium text-white">Continue</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
