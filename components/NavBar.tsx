"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress, dueCardIds } from "@/lib/engine/progress";

export function NavBar() {
  const [due, setDue] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    setDue(dueCardIds(p, Object.keys(p.cards), Date.now()).length);
    setStreak(p.streak.count);
  }, []);

  return (
    <div className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink">
          DSA Lab
        </Link>
        <div className="flex items-center gap-1">
          {streak > 0 && (
            <span
              title={`${streak} day streak`}
              className="hidden items-center px-2.5 py-1 font-mono text-xs tabular-nums text-muted sm:inline-flex"
            >
              {streak}d
            </span>
          )}
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-body transition-colors hover:text-ink"
          >
            Dashboard
          </Link>
          <Link
            href="/review"
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-body transition-colors hover:text-ink"
          >
            Review
            {due > 0 && (
              <span className="animate-badge-pulse inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-white">
                {due}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}
