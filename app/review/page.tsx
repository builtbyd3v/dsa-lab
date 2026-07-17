"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RecallPane } from "@/components/RecallPane";
import { allCards, getChapter, getUnit } from "@/lib/content";
import { loadProgress, saveProgress, recordReview, dueCardIds, type Progress } from "@/lib/engine/progress";
import type { Card } from "@/lib/types";

interface OwedResolve {
  key: string;
  index: string;
  unitTitle: string;
  chapterTitle: string;
}

function owedResolves(requeue: string[]): OwedResolve[] {
  return requeue.flatMap((key) => {
    const [chapterId, unitId, index] = key.split("/");
    const chapter = getChapter(chapterId);
    const unit = getUnit(chapterId, unitId);
    if (!chapter || !unit) return [];
    return [{ key, index, unitTitle: unit.title, chapterTitle: chapter.title }];
  });
}

function OwedResolvesCard({ requeue }: { requeue: string[] }) {
  const resolves = owedResolves(requeue);
  if (resolves.length === 0) return null;

  return (
    <div className="rounded-xl border border-hairline bg-card p-4">
      <p className="text-sm font-semibold text-ink">Owed re-solves</p>
      <p className="mt-1 text-sm text-muted">You saw the solution — prove it from a blank editor.</p>
      <ul className="mt-3 flex flex-col gap-2">
        {resolves.map((r) => (
          <li key={r.key} className="flex items-center gap-2 text-sm text-body">
            <span className="font-mono text-xs text-muted">#{r.index}</span>
            <span>{r.unitTitle} · {r.chapterTitle}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/gauntlet"
        className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-active"
      >
        Re-solve in the gauntlet
      </Link>
    </div>
  );
}

export default function ReviewPage() {
  const [due, setDue] = useState<Card[] | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const cards = allCards();
    const p = loadProgress();
    // only cards already met in a unit's recall are reviewable
    const ids = new Set(dueCardIds(p, Object.keys(p.cards), Date.now()));
    setDue(cards.filter((c) => ids.has(c.id)));
    setProgress(p);
  }, []);

  if (due === null || progress === null) return null;

  if (done || due.length === 0) {
    const hasRequeue = progress.requeue.length > 0;
    return (
      <main className="mx-auto flex max-w-xl flex-col gap-4 p-8 pt-24">
        <div className="animate-fade-up rounded-xl border border-hairline bg-card p-6 text-center">
          <p className="text-lg text-ink">{done ? "Review complete." : "Nothing due."}</p>
          {!done && !hasRequeue && (
            <p className="mt-2 text-sm text-muted">
              Cards become due on a schedule after you finish units — check back tomorrow.
            </p>
          )}
        </div>
        {!done && <OwedResolvesCard requeue={progress.requeue} />}
        <Link href="/" className="self-center text-sm text-primary hover:text-primary-active">Back to dashboard</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl p-8 pt-16">
      <h1 className="sr-only">Review</h1>
      <p className="mb-4 text-sm text-muted">
        Spaced repetition: cards from finished units come back right before you&apos;d forget them.
      </p>
      <OwedResolvesCard requeue={progress.requeue} />
      <div className="animate-fade-up mt-4 rounded-xl border border-hairline bg-card p-6">
        <RecallPane
          cards={due}
          onAnswer={(id, correct) => saveProgress(recordReview(loadProgress(), id, correct, Date.now()))}
          onDone={() => setDone(true)}
        />
      </div>
    </main>
  );
}
