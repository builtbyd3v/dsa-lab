"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { UnitPlayer } from "@/components/UnitPlayer";
import { getUnit, getChapter, nextUnit } from "@/lib/content";
import { loadProgress, saveProgress, completeUnit, recordReview } from "@/lib/engine/progress";

export default function LearnPage() {
  const { chapter, unit } = useParams<{ chapter: string; unit: string }>();
  const [completed, setCompleted] = useState(false);
  const u = getUnit(chapter, unit);
  const c = getChapter(chapter);
  if (!u || !c) return <main className="p-8 pt-24"><Link href="/" className="text-teal-400 hover:text-teal-300">Unit not found — back to dashboard</Link></main>;
  const next = nextUnit(chapter, unit);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8 pt-8">
      <header className="animate-fade-up flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight">{u.title}</h1>
        <Link href="/" className="text-sm text-zinc-500 hover:text-teal-400">{c.title}</Link>
      </header>
      <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
        <UnitPlayer
          unit={u}
          onComplete={() => { saveProgress(completeUnit(loadProgress(), chapter, unit, Date.now())); setCompleted(true); }}
          onRecallAnswer={(id, correct) => saveProgress(recordReview(loadProgress(), id, correct, Date.now()))}
        />
      </div>
      {completed && (
        next
          ? <Link href={`/learn/${next.chapterId}/${next.unitId}`} className="animate-fade-up self-start rounded-full bg-teal-600 px-5 py-2 font-medium text-white transition-all hover:brightness-110 active:scale-[0.98]">Next unit →</Link>
          : <Link href="/" className="animate-fade-up self-start rounded-full bg-teal-600 px-5 py-2 font-medium text-white transition-all hover:brightness-110 active:scale-[0.98]">Back to dashboard</Link>
      )}
    </main>
  );
}
