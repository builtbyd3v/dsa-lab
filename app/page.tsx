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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-20 px-6 pb-32 pt-16">
      <header className="animate-fade-up flex flex-col gap-5">
        <h1 className="text-5xl font-normal leading-[1.1] tracking-[-0.03em] text-ink sm:text-6xl">
          Learn data structures, <em>visually</em>.
        </h1>
        <p className="max-w-lg text-body">
          Watch every structure move step by step, then build it yourself.
        </p>
        <div className="flex items-center gap-5 font-mono text-xs tabular-nums text-muted">
          <span>
            <span className="text-ink">{doneUnits}</span>/{totalUnits} units
          </span>
          <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />
          <span>
            <span className="text-ink">{p.streak.count}</span> day streak
          </span>
          <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />
          <span>
            <span className="text-ink">{due}</span> cards due
          </span>
        </div>
      </header>
      {due > 0 && (
        <Link
          href="/review"
          style={{ animationDelay: "80ms" }}
          className="animate-fade-up group -mt-8 flex items-center justify-between rounded-xl border border-hairline bg-card p-5 transition-colors hover:border-hairline-strong active:scale-[0.995]"
        >
          <span className="text-lg text-ink">
            Review due: {due} card{due > 1 ? "s" : ""}
          </span>
          <span className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-primary-active">
            Start review →
          </span>
        </Link>
      )}
      {phases.map((ph, phaseIdx) => {
        const chapters = chaptersAll.filter((c) => c.phase === ph.n);
        if (chapters.length === 0) return null;
        return (
          <section
            key={ph.n}
            style={{ animationDelay: `${120 + phaseIdx * 60}ms` }}
            className="animate-fade-up flex flex-col gap-12"
          >
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
              {ph.title}
            </h2>
            {chapters.map((c) => {
              const chapterNum = chaptersAll.indexOf(c) + 1;
              const doneCount = c.units.filter((u) => isUnitComplete(p, c.id, u.id)).length;
              return (
                <div key={c.id} className="flex flex-col">
                  <div className="flex items-baseline gap-3 pb-3">
                    <span className="font-mono text-xs tabular-nums text-muted-soft">
                      {String(chapterNum).padStart(2, "0")}
                    </span>
                    <h3 className="text-[26px] font-normal leading-tight tracking-[-0.0125em] text-ink">
                      {c.title}
                    </h3>
                    <span className="ml-auto font-mono text-xs tabular-nums text-muted">
                      {doneCount}/{c.units.length}
                    </span>
                  </div>
                  <div className="mb-1 h-px overflow-hidden bg-hairline">
                    <div
                      className="h-full bg-ink transition-all duration-700"
                      style={{ width: `${c.units.length ? (doneCount / c.units.length) * 100 : 0}%` }}
                    />
                  </div>
                  <ol className="flex flex-col">
                    {c.units.map((u, unitIdx) => {
                      const done = isUnitComplete(p, c.id, u.id);
                      return (
                        <li key={u.id} className={unitIdx > 0 ? "border-t border-hairline-soft" : ""}>
                          <Link
                            href={`/learn/${c.id}/${u.id}`}
                            className="group flex items-center gap-4 px-2 py-4 transition-colors hover:bg-card"
                          >
                            <span className="font-mono text-xs tabular-nums text-muted-soft transition-colors group-hover:text-primary">
                              {chapterNum}.{unitIdx + 1}
                            </span>
                            <span
                              className={`text-[15px] transition-colors ${
                                done ? "text-muted" : "text-ink"
                              }`}
                            >
                              {u.title}
                            </span>
                            {done ? (
                              <span className="ml-auto font-mono text-sm text-success" aria-label="Completed">
                                ✓
                              </span>
                            ) : (
                              <span
                                className="ml-auto -translate-x-1 font-mono text-sm text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                aria-hidden="true"
                              >
                                →
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </section>
        );
      })}
    </main>
  );
}
