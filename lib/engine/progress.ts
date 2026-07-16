import { type CardState, initCard, review, isDue } from "./leitner";

export interface Progress {
  completedUnits: string[];
  cards: Record<string, CardState>;
  streak: { count: number; lastDay: string };
}

const KEY = "dsa-lab-progress-v1";
const empty = (): Progress => ({ completedUnits: [], cards: {}, streak: { count: 0, lastDay: "" } });

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Progress;
    return p.completedUnits && p.cards && p.streak ? p : empty();
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
