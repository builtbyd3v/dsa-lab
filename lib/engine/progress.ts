import { type CardState, initCard, review, isDue } from "./leitner";

export interface RungStat {
  passes: number;
  fails: number;
  lastPass?: number;    // epoch ms
  revealed?: boolean;   // solution was shown
}

export interface Progress {
  completedUnits: string[];
  cards: Record<string, CardState>;
  streak: { count: number; lastDay: string };
  rungs: Record<string, RungStat>;
  requeue: string[];    // rung keys owed a blank re-solve after a reveal
}

const KEY = "dsa-lab-progress-v1";
const empty = (): Progress => ({
  completedUnits: [],
  cards: {},
  streak: { count: 0, lastDay: "" },
  rungs: {},
  requeue: [],
});

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Progress;
    return p.completedUnits && p.cards && p.streak
      ? { ...p, rungs: p.rungs ?? {}, requeue: p.requeue ?? [] }
      : empty();
  } catch {
    return empty();
  }
}

export function saveProgress(p: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

const dayOf = (now: number): string => new Date(now).toISOString().slice(0, 10);

export function completeUnit(p: Progress, chapterId: string, unitId: string, now: number): Progress {
  const key = `${chapterId}/${unitId}`;
  const completedUnits = p.completedUnits.includes(key) ? p.completedUnits : [...p.completedUnits, key];
  const today = dayOf(now);
  let streak = p.streak;
  if (streak.lastDay !== today) {
    const yesterday = dayOf(now - 86_400_000);
    streak = { count: streak.lastDay === yesterday ? streak.count + 1 : 1, lastDay: today };
  }
  return { ...p, completedUnits, streak };
}

export function isUnitComplete(p: Progress, chapterId: string, unitId: string): boolean {
  return p.completedUnits.includes(`${chapterId}/${unitId}`);
}

export function recordReview(p: Progress, cardId: string, correct: boolean, now: number): Progress {
  const prev = p.cards[cardId] ?? initCard(now);
  return { ...p, cards: { ...p.cards, [cardId]: review(prev, correct, now) } };
}

export function dueCardIds(p: Progress, allIds: string[], now: number): string[] {
  return allIds.filter((id) => {
    const s = p.cards[id];
    return !s || isDue(s, now);
  });
}

export const rungKey = (chapterId: string, unitId: string, index: number): string =>
  `${chapterId}/${unitId}/${index}`;

export function recordRungResult(p: Progress, key: string, passed: boolean, now: number): Progress {
  const prev = p.rungs[key] ?? { passes: 0, fails: 0 };
  const stat: RungStat = passed
    ? { ...prev, passes: prev.passes + 1, lastPass: now }
    : { ...prev, fails: prev.fails + 1 };
  const requeue = passed ? p.requeue.filter((k) => k !== key) : p.requeue;
  return { ...p, rungs: { ...p.rungs, [key]: stat }, requeue };
}

export function markRevealed(p: Progress, key: string): Progress {
  const prev = p.rungs[key] ?? { passes: 0, fails: 0 };
  const stat: RungStat = { ...prev, revealed: true };
  const requeue = p.requeue.includes(key) ? p.requeue : [...p.requeue, key];
  return { ...p, rungs: { ...p.rungs, [key]: stat }, requeue };
}
