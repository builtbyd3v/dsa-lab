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
    <div className="flex flex-col gap-4">
      <span className="text-sm tabular-nums text-zinc-400">{i + 1} / {cards.length}</span>
      <p className="text-xl font-medium text-zinc-100">{card.prompt}</p>
      <div className="flex flex-wrap gap-2">
        {card.options.map((o, idx) => (
          <button key={idx} onClick={() => pick(idx)} disabled={answered !== null}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-200 hover:border-teal-500 disabled:opacity-60">
            {o}
          </button>
        ))}
      </div>
      {answered === false && <p className="rounded-lg border border-red-900 bg-red-950 p-3 text-red-300">{card.explainWrong}</p>}
      {answered === true && <p className="rounded-lg border border-green-900 bg-green-950 p-3 text-green-300">Correct.</p>}
      {answered !== null && (
        last
          ? <button onClick={onDone} className="self-start rounded-lg bg-teal-600 px-5 py-2 text-white">Done</button>
          : <button onClick={next} className="self-start rounded-lg bg-zinc-800 px-5 py-2 text-zinc-200">Next</button>
      )}
    </div>
  );
}
