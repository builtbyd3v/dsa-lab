"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { allCards } from "@/lib/content";
import { loadProgress, dueCardIds } from "@/lib/engine/progress";

export function NavBar() {
  const [due, setDue] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    setDue(dueCardIds(p, allCards().map((c) => c.id), Date.now()).length);
    setStreak(p.streak.count);
  }, []);

  return (
    <div className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-full border border-zinc-800 bg-zinc-950/70 px-5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100">
          <span className="inline-block h-2 w-2 rounded-full bg-teal-400" aria-hidden="true" />
          DSA Lab
        </Link>
        <div className="flex items-center gap-1.5">
          {streak > 0 && (
            <span className="hidden items-center gap-1 rounded-full px-2.5 py-1 text-xs tabular-nums text-zinc-400 sm:inline-flex">
              🔥 {streak}
            </span>
          )}
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:text-zinc-100"
          >
            Dashboard
          </Link>
          <Link
            href="/review"
            className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:text-zinc-100"
          >
            Review
            {due > 0 && (
              <span className="animate-badge-pulse inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-teal-600 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
                {due}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}
