"use client";
import { useState } from "react";
import type { Unit } from "@/lib/types";
import { StepPlayer } from "./StepPlayer";
import { PredictPane } from "./PredictPane";
import { FillinPane } from "./FillinPane";
import { WritePane } from "./WritePane";
import { RecallPane } from "./RecallPane";

export interface UnitPlayerProps {
  unit: Unit;
  onComplete: () => void;
  onRecallAnswer: (cardId: string, correct: boolean) => void;
}

type Phase = { kind: "watch"; startAt: number; returnTo: number | null } | { kind: "rung"; index: number } | { kind: "recall" } | { kind: "done" };

export function UnitPlayer({ unit, onComplete, onRecallAnswer }: UnitPlayerProps) {
  const [phase, setPhase] = useState<Phase>({ kind: "watch", startAt: 0, returnTo: null });
  const [watchDone, setWatchDone] = useState(false);

  const toRung = (index: number) =>
    index < unit.ladder.length ? setPhase({ kind: "rung", index }) : setPhase({ kind: "recall" });
  const review = (from: number) => (stepIndex: number) =>
    setPhase({ kind: "watch", startAt: stepIndex, returnTo: from });

  if (phase.kind === "watch") {
    return (
      <div className="flex flex-col gap-4">
        <StepPlayer key={phase.startAt} steps={unit.watch} startAt={phase.startAt}
          autoPlay={phase.returnTo === null} onFinished={() => setWatchDone(true)} />
        {phase.returnTo !== null ? (
          <button onClick={() => toRung(phase.returnTo!)}
            className="self-center rounded-full bg-teal-600 px-5 py-2 font-medium text-white transition-all hover:brightness-110 active:scale-[0.98]">Back to exercise</button>
        ) : watchDone ? (
          <button onClick={() => toRung(0)}
            className="self-center rounded-full bg-teal-600 px-5 py-2 font-medium text-white transition-all hover:brightness-110 active:scale-[0.98]">Start doing</button>
        ) : null}
      </div>
    );
  }

  if (phase.kind === "rung") {
    const rung = unit.ladder[phase.index];
    const onPass = () => toRung(phase.index + 1);
    const onReview = review(phase.index);
    if (rung.kind === "predict") return <PredictPane rung={rung} onPass={onPass} onReview={onReview} />;
    if (rung.kind === "fillin") return <FillinPane rung={rung} onPass={onPass} onReview={onReview} />;
    return <WritePane rung={rung} onPass={onPass} onReview={onReview} />;
  }

  if (phase.kind === "recall") {
    return <RecallPane cards={unit.recall} onAnswer={onRecallAnswer}
      onDone={() => { setPhase({ kind: "done" }); onComplete(); }} />;
  }

  return <p className="animate-fade-up rounded-xl border border-green-900/60 bg-green-950/40 p-4 text-green-300">Unit complete.</p>;
}
