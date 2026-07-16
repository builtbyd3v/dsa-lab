import { describe, it, expect, beforeEach } from "vitest";
import { loadProgress, saveProgress, completeUnit, recordReview, dueCardIds, isUnitComplete } from "./progress";

const DAY = 86_400_000;

describe("progress", () => {
  beforeEach(() => localStorage.clear());

  it("loads empty on missing or corrupt data", () => {
    expect(loadProgress().completedUnits).toEqual([]);
    localStorage.setItem("dsa-lab-progress-v1", "{corrupt");
    expect(loadProgress().completedUnits).toEqual([]);
  });

  it("round-trips through localStorage", () => {
    let p = loadProgress();
    p = completeUnit(p, "py-vars", "boxes", Date.UTC(2026, 0, 1));
    saveProgress(p);
    expect(isUnitComplete(loadProgress(), "py-vars", "boxes")).toBe(true);
  });

  it("streak: consecutive days increment, same day no-op, gap resets", () => {
    let p = loadProgress();
    p = completeUnit(p, "c", "u1", Date.UTC(2026, 0, 1));
    expect(p.streak.count).toBe(1);
    p = completeUnit(p, "c", "u2", Date.UTC(2026, 0, 1));
    expect(p.streak.count).toBe(1);
    p = completeUnit(p, "c", "u3", Date.UTC(2026, 0, 2));
    expect(p.streak.count).toBe(2);
    p = completeUnit(p, "c", "u4", Date.UTC(2026, 0, 9));
    expect(p.streak.count).toBe(1);
  });

  it("review flow: unseen cards are due, wrong stays due, correct schedules out", () => {
    let p = loadProgress();
    expect(dueCardIds(p, ["a", "b"], 0)).toEqual(["a", "b"]);
    p = recordReview(p, "a", true, 0);
    expect(dueCardIds(p, ["a", "b"], 0)).toEqual(["b"]);
    expect(dueCardIds(p, ["a", "b"], DAY)).toEqual(["a", "b"]);
    p = recordReview(p, "b", false, 0);
    expect(dueCardIds(p, ["a", "b"], 0)).toContain("b");
  });
});
