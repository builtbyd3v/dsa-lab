"use client";
import { useState } from "react";
import type { Card } from "@/lib/types";

export interface RecallPaneProps {
  cards: Card[];
  onAnswer: (cardId: string, correct: boolean) => void;
  onDone: () => void;
}

export function RecallPane({ cards, onAnswer, onDone }: RecallPaneProps) {
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const card = cards[i];
  const last = i === cards.length - 1;

  const pick = (idx: number) => {
    if (answered !== null) return;
    const correct = idx === card.correctIndex;
    setAnswered(correct);
    onAnswer(card.id, correct);
  };
  const next = () => { setAnswered(null); setI(i + 1); };

  return (
    <div key={i} className="animate-fade-up flex flex-col gap-4">
      <span className="font-mono text-xs tabular-nums text-muted">{i + 1} / {cards.length}</span>
      <p className="text-xl font-medium text-ink">{card.prompt}</p>
      <div className="flex flex-wrap gap-2">
        {card.options.map((o, idx) => (
          <button key={idx} onClick={() => pick(idx)} disabled={answered !== null}
            className="rounded-lg border border-hairline-strong bg-card px-4 py-2 text-ink transition-all hover:border-ink active:scale-[0.98] disabled:opacity-60">
            {o}
          </button>
        ))}
      </div>
      {answered === false && <p className="rounded-xl border border-error/30 bg-card p-3 text-error">{card.explainWrong}</p>}
      {answered === true && <p className="rounded-xl border border-success/30 bg-card p-3 text-success">Correct.</p>}
      {answered !== null && (
        last
          ? <button onClick={onDone} className="self-start rounded-lg bg-primary px-5 py-2 text-white transition-colors hover:bg-primary-active active:scale-[0.98]">Done</button>
          : <button onClick={next} className="self-start rounded-lg bg-ink px-5 py-2 text-canvas transition-all hover:opacity-90 active:scale-[0.98]">Next</button>
      )}
    </div>
  );
}
