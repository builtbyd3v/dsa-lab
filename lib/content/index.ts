import type { Chapter, Unit, Card } from "@/lib/types";
import { chVariables } from "./ch-variables";

const chapters: Chapter[] = [chVariables];

export function allChapters(): Chapter[] { return chapters; }
export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}
export function getUnit(chapterId: string, unitId: string): Unit | undefined {
  return getChapter(chapterId)?.units.find((u) => u.id === unitId);
}
export function allCards(): Card[] {
  return chapters.flatMap((c) => c.units.flatMap((u) => u.recall));
}
export function nextUnit(chapterId: string, unitId: string): { chapterId: string; unitId: string } | null {
  const flat = chapters.flatMap((c) => c.units.map((u) => ({ chapterId: c.id, unitId: u.id })));
  const i = flat.findIndex((f) => f.chapterId === chapterId && f.unitId === unitId);
  return i >= 0 && i + 1 < flat.length ? flat[i + 1] : null;
}
