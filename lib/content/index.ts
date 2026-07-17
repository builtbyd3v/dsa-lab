import type { Chapter, Unit, Card } from "@/lib/types";
import { chVariables } from "./ch-variables";
import { chFlow } from "./ch-flow";
import { chFunctions } from "./ch-functions";
import { chStrings } from "./ch-strings";
import { chCollections } from "./ch-collections";
import { chClasses } from "./ch-classes";
import { chRecursion } from "./ch-recursion";
import { chDsaIntro } from "./ch-dsa-intro";
import { chDsaLists } from "./ch-dsa-lists";
import { chDsaStacksQueues } from "./ch-dsa-stacks-queues";
import { chDsaHash } from "./ch-dsa-hash";
import { chDsaTrees } from "./ch-dsa-trees";
import { chDsaBalanced } from "./ch-dsa-balanced";
import { chDsaHeaps } from "./ch-dsa-heaps";
import { chDsaSets } from "./ch-dsa-sets";
import { chDsaGraphs } from "./ch-dsa-graphs";
import { chDsaBtrees } from "./ch-dsa-btrees";
import { chDsaAnalysis } from "./ch-dsa-analysis";

const chapters: Chapter[] = [
  // Phase 1: Python foundations
  chVariables,
  chFlow,
  chFunctions,
  chStrings,
  chCollections,
  chClasses,
  chRecursion,
  // Phase 2: data structures and algorithms (zyBooks order)
  chDsaIntro,
  chDsaLists,
  chDsaStacksQueues,
  chDsaHash,
  chDsaTrees,
  chDsaBalanced,
  chDsaHeaps,
  chDsaSets,
  chDsaGraphs,
  chDsaBtrees,
  chDsaAnalysis,
];

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
