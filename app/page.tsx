"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { allChapters } from "@/lib/content";
import { loadProgress, dueCardIds, isUnitComplete, type Progress } from "@/lib/engine/progress";

export default function Dashboard() {
  const [p, setP] = useState<Progress | null>(null);
  useEffect(() => setP(loadProgress()), []);
  if (!p) return null;
  const due = dueCardIds(p, Object.keys(p.cards), Date.now()).length;
  const chaptersAll = allChapters();
  const totalUnits = chaptersAll.reduce((n, c) => n + c.units.length, 0);
  const doneUnits = chaptersAll.reduce(
    (n, c) => n + c.units.filter((u) => isUnitComplete(p, c.id, u.id)).length,
    0
  );
  const phases: Array<{ n: 1 | 2; title: string }> = [
    { n: 1, title: "Phase 1 · Python foundations" },
    { n: 2, title: "Phase 2 · Data structures & algorithms" },
  ];

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 p-8 pb-24">
      <header className="animate-fade-up flex flex-col gap-5 pt-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Learn data structures,{" "}
          <span className="animate-gradient bg-gradient-to-r from-orange-200 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            visually
          </span>
        </h1>
        <p className="max-w-lg text-zinc-400">
          Watch every structure move step by step, then build it yourself.
        </p>
        <div className="flex items-center gap-5 font-mono text-xs tabular-nums text-zinc-500">
          <span>
            <span className="text-zinc-200">{doneUnits}</span>/{totalUnits} units
          </span>
          <span className="h-3 w-px bg-zinc-800" aria-hidden="true" />
          <span>
            <span className="text-zinc-200">{p.streak.count}</span> day streak
          </span>
          <span className="h-3 w-px bg-zinc-800" aria-hidden="true" />
          <span>
            <span className="text-zinc-200">{due}</span> cards due
          </span>
        </div>
      </header>
      {due > 0 && (
        <Link
          href="/review"
          style={{ animationDelay: "80ms" }}
          className="animate-fade-up group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-lg font-medium text-zinc-100 transition-all hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.15),0_8px_24px_-8px_rgba(45,212,191,0.25)] active:scale-[0.99]"
        >
          <span>
            Review due: {due} card{due > 1 ? "s" : ""}
          </span>
          <span className="rounded-full bg-teal-600 px-4 py-2 text-sm text-white transition-transform group-hover:scale-[1.03]">
            Start review →
          </span>
        </Link>
      )}
      {phases.map((ph, phaseIdx) => {
        const chapters = allChapters().filter((c) => c.phase === ph.n);
        if (chapters.length === 0) return null;
        return (
          <section
            key={ph.n}
            style={{ animationDelay: `${120 + phaseIdx * 60}ms` }}
            className="animate-fade-up flex flex-col gap-4"
          >
            <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">{ph.title}</h2>
            {chapters.map((c, chapterIdx) => {
              const doneCount = c.units.filter((u) => isUnitComplete(p, c.id, u.id)).length;
              return (
                <div
                  key={c.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
                >
                  <div className="mb-1 flex items-baseline gap-3">
                    <span className="font-mono text-xs tabular-nums text-zinc-600">
                      {String(chapterIdx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-medium text-zinc-200">{c.title}</h3>
                    <span className="ml-auto font-mono text-xs tabular-nums text-zinc-500">
                      {doneCount}/{c.units.length}
                    </span>
                  </div>
                  <div className="mb-4 ml-8 h-px overflow-hidden rounded bg-zinc-800">
                    <div
                      className="h-full bg-teal-500 transition-all duration-700"
                      style={{ width: `${c.units.length ? (doneCount / c.units.length) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="ml-8 flex flex-wrap gap-2">
                    {c.units.map((u) => {
                      const done = isUnitComplete(p, c.id, u.id);
                      return (
                        <Link key={u.id} href={`/learn/${c.id}/${u.id}`}
                          className={`rounded-full px-3 py-1 text-sm transition-all active:scale-[0.98] ${done ? "bg-teal-600 text-white hover:brightness-110" : "border border-zinc-700 text-zinc-300 hover:border-teal-500/60 hover:text-zinc-100"}`}>
                          {u.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </main>
  );
}
