export interface CardState { box: 1 | 2 | 3 | 4 | 5; due: number }

const DAY = 86_400_000;
export const BOX_INTERVALS_MS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 0, 2: DAY, 3: 3 * DAY, 4: 7 * DAY, 5: 21 * DAY,
};

export function initCard(now: number): CardState {
  return { box: 1, due: now };
}

export function review(s: CardState, correct: boolean, now: number): CardState {
  const box = (correct ? Math.min(5, s.box + 1) : 1) as CardState["box"];
  return { box, due: now + BOX_INTERVALS_MS[box] };
}

export function isDue(s: CardState, now: number): boolean {
  return now >= s.due;
}
