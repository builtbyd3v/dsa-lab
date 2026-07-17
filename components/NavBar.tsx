"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { loadProgress, dueCardIds } from "@/lib/engine/progress";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/gauntlet", label: "Gauntlet" },
  { href: "/review", label: "Review" },
  { href: "/exam", label: "Exam" },
];

export function NavBar() {
  const [due, setDue] = useState(0);
  const [streak, setStreak] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const p = loadProgress();
    setDue(dueCardIds(p, Object.keys(p.cards), Date.now()).length);
    setStreak(p.streak.count);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      scrolled ? "border-hairline bg-canvas/85 backdrop-blur-md" : "border-transparent bg-canvas"
    }`}>
      <nav className="relative mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="text-[15px] tracking-tight">
          <span className="font-semibold text-ink">DSA</span>
          <span className="ml-1 font-normal text-muted">Lab</span>
        </Link>
        <div className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center sm:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className={`relative flex h-full items-center gap-2 px-4 text-sm transition-colors duration-200 ${
                  active ? "font-medium text-ink" : "text-body hover:text-ink"
                }`}>
                {label}
                {href === "/review" && due > 0 && (
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-strong px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-ink">
                    {due}
                  </span>
                )}
                {active && <span aria-hidden className="absolute inset-x-4 bottom-0 h-px bg-primary" />}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center sm:hidden">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className={`px-2.5 py-1.5 text-sm transition-colors duration-200 ${
                    active ? "font-medium text-ink" : "text-body hover:text-ink"
                  }`}>
                  {label}
                </Link>
              );
            })}
          </div>
          {streak > 0 && (
            <span title={`${streak} day streak`}
              className="hidden items-center rounded-full bg-strong px-2.5 py-1 font-mono text-xs tabular-nums text-body sm:inline-flex">
              {streak}d
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
