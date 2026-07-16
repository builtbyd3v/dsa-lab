"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RecallPane } from "@/components/RecallPane";
import { allCards } from "@/lib/content";
import { loadProgress, saveProgress, recordReview, dueCardIds } from "@/lib/engine/progress";
import type { Card } from "@/lib/types";

export default function ReviewPage() {
  const [due, setDue] = useState<Card[] | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const cards = allCards();
    const ids = new Set(dueCardIds(loadProgress(), cards.map((c) => c.id), Date.now()));
    setDue(cards.filter((c) => ids.has(c.id)));
  }, []);

  if (due === null) return null;
  if (done || due.length === 0)
    return (
      <main className="mx-auto flex max-w-xl flex-col gap-4 p-8">
        <p className="text-lg text-zinc-200">{done ? "Review complete." : "Nothing due. Go learn something new."}</p>
        <Link href="/" className="text-teal-400">Back to dashboard</Link>
      </main>
    );

  return (
    <main className="mx-auto max-w-xl p-8">
      <RecallPane
        cards={due}
        onAnswer={(id, correct) => saveProgress(recordReview(loadProgress(), id, correct, Date.now()))}
        onDone={() => setDone(true)}
      />
    </main>
  );
}
