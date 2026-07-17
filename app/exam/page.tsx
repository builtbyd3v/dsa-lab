"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { allCards, getChapter } from "@/lib/content";
import type { Card } from "@/lib/types";
import { Rich } from "@/components/Rich";

const QUESTION_COUNT = 30;
const EXAM_SECONDS = 20 * 60;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleCards(): Card[] {
  return shuffle(allCards()).slice(0, QUESTION_COUNT);
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

interface ChapterBreakdownRow {
  chapterId: string;
  title: string;
  correct: number;
  total: number;
}

function chapterBreakdown(cards: Card[], answers: (number | null)[]): ChapterBreakdownRow[] {
  const byChapter = new Map<string, { correct: number; total: number }>();
  cards.forEach((card, i) => {
    const chapterId = card.id.split(".")[0];
    const entry = byChapter.get(chapterId) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (answers[i] === card.correctIndex) entry.correct += 1;
    byChapter.set(chapterId, entry);
  });
  return Array.from(byChapter.entries())
    .map(([chapterId, { correct, total }]) => ({
      chapterId,
      title: getChapter(chapterId)?.title ?? chapterId,
      correct,
      total,
    }))
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
}

export default function ExamPage() {
  const [phase, setPhase] = useState<"start" | "running" | "results">("start");
  const [cards, setCards] = useState<Card[]>([]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_SECONDS);
  const advanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const begin = () => {
    const sampled = sampleCards();
    setCards(sampled);
    setAnswers(new Array(sampled.length).fill(null));
    setI(0);
    setSecondsLeft(EXAM_SECONDS);
    setPhase("running");
  };

  useEffect(() => {
    if (phase !== "running") return;
    if (secondsLeft <= 0) {
      setPhase("results");
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft]);

  useEffect(() => {
    return () => {
      if (advanceTimeout.current) clearTimeout(advanceTimeout.current);
    };
  }, []);

  const pick = (idx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = idx;
      return next;
    });
    if (advanceTimeout.current) clearTimeout(advanceTimeout.current);
    advanceTimeout.current = setTimeout(() => {
      setI((cur) => (cur < cards.length - 1 ? cur + 1 : cur));
      if (i === cards.length - 1) setPhase("results");
    }, 150);
  };

  if (phase === "start") {
    return (
      <main className="mx-auto flex max-w-xl flex-col gap-4 p-8 pt-24">
        <div className="animate-fade-up flex flex-col gap-4 rounded-xl border border-hairline bg-card p-6 text-center">
          <h1 className="text-[26px] font-normal tracking-[-0.0125em] text-ink">Mock exam</h1>
          <p className="text-body">30 questions · 20 minutes · no feedback until the end — like the real thing.</p>
          <button
            onClick={begin}
            className="self-center rounded-lg bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-active active:scale-[0.98]"
          >
            Begin
          </button>
        </div>
        <Link href="/" className="self-center text-sm text-primary hover:text-primary-active">Back to dashboard</Link>
      </main>
    );
  }

  if (phase === "results") {
    const score = answers.reduce((n: number, a, idx) => (a === cards[idx].correctIndex ? n + 1 : n), 0);
    const percent = Math.round((score / cards.length) * 100);
    const onPace = percent >= 70;
    const breakdown = chapterBreakdown(cards, answers);
    const missed = cards
      .map((card, idx) => ({ card, idx }))
      .filter(({ card, idx }) => answers[idx] !== card.correctIndex);

    return (
      <main className="mx-auto flex max-w-2xl flex-col gap-6 p-8 pt-16">
        <div className="animate-fade-up flex flex-col gap-2 rounded-xl border border-hairline bg-card p-6 text-center">
          <h1 className="text-[26px] font-normal tracking-[-0.0125em] text-ink">Mock exam results</h1>
          <p className="text-4xl font-semibold text-ink">
            {score} / {cards.length}
            <span className="ml-2 text-2xl font-normal text-muted">{percent}%</span>
          </p>
          <p className={onPace ? "text-success" : "text-tl-done"}>
            {onPace ? "on pace" : "keep drilling"}
          </p>
        </div>

        <div className="animate-fade-up rounded-xl border border-hairline bg-card p-6">
          <p className="mb-3 text-sm font-semibold text-ink">Chapter breakdown</p>
          <ul className="flex flex-col gap-1.5">
            {breakdown.map((row) => (
              <li key={row.chapterId} className="flex items-baseline justify-between text-sm">
                <span className="text-body">{row.title}</span>
                <span className="font-mono tabular-nums text-muted">{row.correct}/{row.total}</span>
              </li>
            ))}
          </ul>
        </div>

        {missed.length > 0 && (
          <div className="animate-fade-up rounded-xl border border-hairline bg-card p-6">
            <p className="mb-3 text-sm font-semibold text-ink">Missed questions</p>
            <ul className="flex flex-col gap-4">
              {missed.map(({ card, idx }) => {
                const yourAnswer = answers[idx];
                return (
                  <li key={card.id} className="flex flex-col gap-1 border-t border-hairline pt-3 first:border-t-0 first:pt-0">
                    <p className="text-sm text-ink"><Rich text={card.prompt} /></p>
                    <p className="text-sm text-error">
                      Your answer: <Rich text={yourAnswer !== null ? card.options[yourAnswer] : "(no answer)"} />
                    </p>
                    <p className="text-sm text-success">
                      Correct answer: <Rich text={card.options[card.correctIndex]} />
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={begin}
            className="rounded-lg bg-primary px-5 py-2 font-medium text-white transition-colors hover:bg-primary-active active:scale-[0.98]"
          >
            Retake
          </button>
          <Link href="/" className="rounded-lg border border-hairline-strong px-5 py-2 text-body transition-colors hover:border-hairline-strong hover:text-ink">
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  const card = cards[i];
  const selected = answers[i];

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-4 p-8 pt-16">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs tabular-nums text-muted">{i + 1} / {cards.length}</span>
        <span className={`font-mono text-sm tabular-nums ${secondsLeft < 120 ? "text-error" : "text-ink"}`}>
          {formatTime(secondsLeft)}
        </span>
      </div>
      <div key={i} className="animate-fade-up flex flex-col gap-4">
        <p className="text-lg font-medium text-ink"><Rich text={card.prompt} /></p>
        <div className="flex flex-col gap-2">
          {card.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => pick(idx)}
              className={`rounded-xl border bg-card p-3 text-left text-body transition-colors hover:border-hairline-strong hover:text-ink ${
                selected === idx ? "border-primary/60 text-ink" : "border-hairline"
              }`}
            >
              <Rich text={option} />
            </button>
          ))}
        </div>
        {i > 0 && (
          <button
            onClick={() => setI((cur) => cur - 1)}
            className="self-start text-sm text-muted hover:text-ink"
          >
            ← previous
          </button>
        )}
      </div>
    </main>
  );
}
