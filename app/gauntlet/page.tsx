"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { WritePane } from "@/components/WritePane";
import { allChapters } from "@/lib/content";
import { loadProgress, saveProgress, recordRungResult, markRevealed, rungKey } from "@/lib/engine/progress";
import type { WriteRung } from "@/lib/types";

interface GauntletProblem {
  key: string;
  rung: WriteRung;
  chapterTitle: string;
  unitTitle: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRun(): GauntletProblem[] {
  const progress = loadProgress();
  const candidates: GauntletProblem[] = [];
  for (const chapter of allChapters()) {
    for (const unit of chapter.units) {
      unit.ladder.forEach((rung, index) => {
        if (rung.kind !== "write" && rung.kind !== "apply") return;
        const key = rungKey(chapter.id, unit.id, index);
        const passed = (progress.rungs[key]?.passes ?? 0) > 0;
        const requeued = progress.requeue.includes(key);
        if (passed || requeued) {
          candidates.push({ key, rung, chapterTitle: chapter.title, unitTitle: unit.title });
        }
      });
    }
  }

  const requeueKeys = new Set(progress.requeue);
  const requeued = candidates.filter((c) => requeueKeys.has(c.key));
  const seen = new Set(requeued.map((c) => c.key));
  const rest = shuffle(candidates.filter((c) => !seen.has(c.key)));
  return [...requeued, ...rest].slice(0, 10);
}

export default function GauntletPage() {
  const [run, setRun] = useState<GauntletProblem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  useEffect(() => {
    setRun(buildRun());
  }, []);

  const reshuffle = () => {
    setRun(buildRun());
    setIndex(0);
    setResults([]);
  };

  if (run === null) return null;

  if (run.length === 0) {
    return (
      <main className="mx-auto flex max-w-xl flex-col gap-4 p-8 pt-24">
        <div className="animate-fade-up rounded-xl border border-hairline bg-card p-6 text-center">
          <h1 className="text-[26px] font-normal tracking-[-0.0125em] text-ink">Gauntlet</h1>
          <p className="mt-2 text-body">
            Pass problems in the chapters first — the gauntlet re-tests what you&apos;ve already solved, from a blank editor.
          </p>
        </div>
        <Link href="/" className="self-center text-sm text-primary hover:text-primary-active">Back to dashboard</Link>
      </main>
    );
  }

  const done = index >= run.length;

  if (done) {
    const solved = results.filter(Boolean).length;
    return (
      <main className="mx-auto flex max-w-xl flex-col gap-6 p-8 pt-16">
        <div className="animate-fade-up flex flex-col gap-4 rounded-xl border border-hairline bg-card p-6">
          <h1 className="text-[26px] font-normal tracking-[-0.0125em] text-ink">Gauntlet</h1>
          <p className="text-lg text-ink">{solved} / {run.length} solved</p>
          <ul className="flex flex-col gap-1.5">
            {run.map((problem, i) => (
              <li key={problem.key} className="flex items-baseline justify-between text-sm">
                <span className="text-body">{problem.chapterTitle} · {problem.unitTitle}</span>
                <span className={results[i] ? "text-success" : "text-muted"}>{results[i] ? "✓" : "—"}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={reshuffle}
            className="self-start rounded-lg bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-active active:scale-[0.98]"
          >
            Run again
          </button>
        </div>
        <Link href="/" className="self-center text-sm text-primary hover:text-primary-active">Back to dashboard</Link>
      </main>
    );
  }

  const current = run[index];

  const onPass = () => {
    saveProgress(recordRungResult(loadProgress(), current.key, true, Date.now()));
    setResults((r) => [...r, true]);
    setIndex((i) => i + 1);
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8 pt-10">
      <header className="animate-fade-up flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <h1 className="text-[26px] font-normal tracking-[-0.0125em] text-ink">Gauntlet</h1>
          <span className="font-mono text-sm tabular-nums text-muted">{index + 1} / {run.length}</span>
        </div>
        <div className="h-1 w-full rounded-full bg-hairline">
          <div
            className="h-1 rounded-full bg-primary transition-[width]"
            style={{ width: `${((index + 1) / run.length) * 100}%` }}
          />
        </div>
      </header>
      <div className="animate-fade-up flex flex-col gap-2" style={{ animationDelay: "60ms" }}>
        <p className="text-sm text-muted">{current.chapterTitle} · {current.unitTitle}</p>
        <WritePane
          key={current.key}
          rung={current.rung}
          draftKey={current.key}
          onPass={onPass}
          onReview={() => {}}
          onResult={(passed) => {
            if (!passed) {
              saveProgress(recordRungResult(loadProgress(), current.key, false, Date.now()));
            }
          }}
          onReveal={() => {
            saveProgress(markRevealed(loadProgress(), current.key));
          }}
        />
      </div>
    </main>
  );
}
