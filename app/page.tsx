"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { allChapters, allCards } from "@/lib/content";
import { loadProgress, dueCardIds, isUnitComplete, type Progress } from "@/lib/engine/progress";

export default function Dashboard() {
  const [p, setP] = useState<Progress | null>(null);
  useEffect(() => setP(loadProgress()), []);
  if (!p) return null;
  const due = dueCardIds(p, allCards().map((c) => c.id), Date.now()).length;
  const phases: Array<{ n: 1 | 2; title: string }> = [
    { n: 1, title: "Phase 1 · Python foundations" },
    { n: 2, title: "Phase 2 · Data structures & algorithms" },
  ];

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">DSA Lab</h1>
        {p.streak.count > 0 && <span className="text-zinc-300">🔥 {p.streak.count} day{p.streak.count > 1 ? "s" : ""}</span>}
      </header>
      {due > 0 && (
        <Link href="/review" className="rounded-xl bg-teal-600 p-4 text-center text-lg font-medium text-white">
          Review due: {due} card{due > 1 ? "s" : ""}
        </Link>
      )}
      {phases.map((ph) => {
        const chapters = allChapters().filter((c) => c.phase === ph.n);
        if (chapters.length === 0) return null;
        return (
          <section key={ph.n} className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">{ph.title}</h2>
            {chapters.map((c) => (
              <div key={c.id} className="rounded-xl border border-zinc-800 p-4">
                <h3 className="mb-3 font-medium text-zinc-200">{c.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {c.units.map((u) => {
                    const done = isUnitComplete(p, c.id, u.id);
                    return (
                      <Link key={u.id} href={`/learn/${c.id}/${u.id}`}
                        className={`rounded-full px-3 py-1 text-sm ${done ? "bg-teal-600 text-white" : "border border-zinc-700 text-zinc-300 hover:border-teal-500"}`}>
                        {u.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </main>
  );
}
