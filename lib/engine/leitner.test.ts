import { describe, it, expect } from "vitest";
import { initCard, review, isDue, BOX_INTERVALS_MS } from "./leitner";

const DAY = 86_400_000;

describe("leitner", () => {
  it("new card starts in box 1, due now", () => {
    const s = initCard(1000);
    expect(s.box).toBe(1);
    expect(isDue(s, 1000)).toBe(true);
  });
  it("correct promotes and schedules", () => {
    let s = initCard(0);
    s = review(s, true, 0);
    expect(s.box).toBe(2);
    expect(s.due).toBe(BOX_INTERVALS_MS[2]);
    expect(isDue(s, DAY - 1)).toBe(false);
    expect(isDue(s, DAY)).toBe(true);
  });
  it("caps at box 5", () => {
    let s = initCard(0);
    for (let i = 0; i < 10; i++) s = review(s, true, 0);
    expect(s.box).toBe(5);
  });
  it("wrong resets to box 1, due immediately", () => {
    let s = initCard(0);
    s = review(s, true, 0);
    s = review(s, false, 500);
    expect(s.box).toBe(1);
    expect(isDue(s, 500)).toBe(true);
  });
});
