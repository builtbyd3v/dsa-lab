import { describe, it, expect } from "vitest";
import { allChapters, allCards } from "./index";

const sentenceCount = (s: string): number => (s.match(/[.!?](\s|$)/g) ?? []).length;

describe("content schema", () => {
  it("has at least one chapter", () => {
    expect(allChapters().length).toBeGreaterThan(0);
  });
  it("every unit has watch, ladder, recall", () => {
    for (const c of allChapters()) for (const u of c.units) {
      expect(u.watch.length, `${c.id}/${u.id} watch`).toBeGreaterThan(0);
      expect(u.ladder.length, `${c.id}/${u.id} ladder`).toBeGreaterThan(0);
      expect(u.recall.length, `${c.id}/${u.id} recall`).toBeGreaterThan(0);
    }
  });
  it("captions are max 2 sentences", () => {
    for (const c of allChapters()) for (const u of c.units) for (const s of u.watch)
      expect(sentenceCount(s.caption), `${c.id}/${u.id}: "${s.caption}"`).toBeLessThanOrEqual(2);
  });
  it("reviewStep indexes are valid watch steps", () => {
    for (const c of allChapters()) for (const u of c.units) for (const r of u.ladder)
      expect(r.reviewStep, `${c.id}/${u.id}`).toBeLessThan(u.watch.length);
  });
  it("card ids are globally unique", () => {
    const ids = allCards().map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("predict rungs explain every wrong option", () => {
    for (const c of allChapters()) for (const u of c.units) for (const r of u.ladder) {
      if (r.kind !== "predict") continue;
      for (const o of r.options) if (o.id !== r.correctId)
        expect(r.explainWrong[o.id], `${c.id}/${u.id} option ${o.id}`).toBeTruthy();
    }
  });
});
