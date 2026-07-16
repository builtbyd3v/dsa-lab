# DSA Lab Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the DSA Lab learning app foundation: all four engines, the Watch/Do/Recall loop, the first three Phase 1 chapters, deployed to Vercel.

**Architecture:** Client-only Next.js App Router app. Content is TypeScript data; four reusable engines (step player, structure renderer, code runner, recall scheduler) render it. Progress in localStorage. Pyodide (WASM) runs user Python in-browser, lazy-loaded.

**Tech Stack:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4, Pyodide (CDN), Vitest.

## Global Constraints

- Package manager: npm. Never npx.
- ES modules only. No `any` types.
- Tailwind for all styling; no inline styles, no CSS modules.
- Functional React components only; props typed with explicit interfaces.
- No new dependencies beyond: next, react, react-dom, tailwindcss, vitest, @vitejs/plugin-react, jsdom, @testing-library/react (dev).
- Pyodide loaded from CDN at runtime (script tag), NOT an npm dependency.
- No hint feature anywhere. Wrong answers must produce a specific verbal explanation plus a "Review" link target.
- All lesson text is captions: max 2 sentences visible at once. No prose paragraphs in content.
- All content original; zyBooks topics only, never zyBooks text.
- Dark, minimal visual design. Design skills (impeccable or taste-skill) MUST be invoked for Task 12.
- Subagent workers run terse (caveman ultra + ponytail ultra style): minimal prose in reports, laziest working implementation, no unrequested abstractions.
- Working directory: `D:\WOrkspace\Projects\dsa-lab`.

---

### Task 1: Scaffold

**Files:**
- Create: Next.js app at repo root (`app/`, `package.json`, `tsconfig.json`, `next.config.ts`, Tailwind config)
- Create: `vitest.config.ts`
- Test: none (scaffold verified by build + test runner executing)

**Interfaces:**
- Produces: runnable `npm run dev`, `npm run build`, `npm test` (vitest).

- [ ] **Step 1: Scaffold Next.js in existing repo**

Run (repo root, which already contains `docs/` and `.git/`):
```bash
npm create next-app@latest . -- --ts --tailwind --app --no-src-dir --import-alias "@/*" --use-npm --no-eslint --skip-install
npm install
```
If `create next-app` refuses non-empty dir, temporarily move `docs/` out, scaffold, move back.

- [ ] **Step 2: Add Vitest**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", include: ["lib/**/*.test.ts", "lib/**/*.test.tsx", "components/**/*.test.tsx"] },
  resolve: { alias: { "@": __dirname } },
});
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 3: Verify**

Run: `npm run build` — Expected: success.
Run: `npm test` — Expected: "no test files found" exit 0 (or pass with 0 tests; if vitest exits 1 on empty, add `passWithNoTests: true` to test config).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js + Tailwind + Vitest"
```

---

### Task 2: Core types + content registry

**Files:**
- Create: `lib/types.ts`
- Create: `lib/content/index.ts`
- Test: `lib/content/index.test.ts`

**Interfaces:**
- Produces (everything downstream depends on these exact names):

`lib/types.ts` — complete file:
```ts
// Visual state drawn by the renderer. One generic node/arrow scene covers
// variables (boxes), lists, stacks, call frames, trees, graphs.
export interface VizNode {
  id: string;
  label: string;        // value shown inside the node
  tag?: string;         // small label above (variable name, "head", "top")
  x: number;            // layout grid column (renderer scales to px)
  y: number;            // layout grid row
  shape?: "box" | "circle" | "frame";
  emphasis?: "active" | "new" | "error" | "dim";
}

export interface VizArrow {
  from: string;         // VizNode id
  to: string;           // VizNode id
  label?: string;
  emphasis?: "active" | "error";
}

export interface StructState {
  nodes: VizNode[];
  arrows: VizArrow[];
}

export interface Step {
  state: StructState;
  caption: string;      // max 2 sentences
}

export interface PredictOption {
  id: string;
  label: string;
}

export interface PredictRung {
  kind: "predict";
  prompt: string;
  steps: Step[];        // shown up to the pause, then question
  options: PredictOption[];
  correctId: string;
  explainWrong: Record<string, string>; // optionId -> why it is wrong
  revealStep: Step;     // the actual next state, shown after answering
  reviewStep: number;   // index into unit.watch to jump to on Review
}

export interface Blank {
  id: string;
  placeholder: string;  // shown in the blank, e.g. "___"
  answer: string;       // exact accepted text (whitespace-trimmed compare)
  explainWrong: string; // shown when filled wrong
}

export interface CodeTest {
  name: string;
  // Python appended after user code; must raise AssertionError with a
  // message on failure. Message is shown verbatim as verbal feedback.
  code: string;
}

export interface FillinRung {
  kind: "fillin";
  prompt: string;
  code: string;         // Python with {{blankId}} markers
  blanks: Blank[];
  tests: CodeTest[];
  vizExpr?: string;     // Python expr evaluated after run; JSON -> StructState via pyToViz
  reviewStep: number;
}

export interface WriteRung {
  kind: "write" | "apply";
  prompt: string;
  starter: string;      // starter Python code
  tests: CodeTest[];
  vizExpr?: string;
  reviewStep: number;
}

export type Rung = PredictRung | FillinRung | WriteRung;

export interface Card {
  id: string;           // globally unique: `${chapterId}.${unitId}.${n}`
  prompt: string;
  options: string[];
  correctIndex: number;
  explainWrong: string;
}

export interface Unit {
  id: string;
  title: string;
  watch: Step[];
  ladder: Rung[];
  recall: Card[];
}

export interface Chapter {
  id: string;
  phase: 1 | 2;
  title: string;
  units: Unit[];
}
```

`lib/content/index.ts`:
```ts
import type { Chapter, Unit, Card } from "@/lib/types";

const chapters: Chapter[] = []; // content tasks push imports here

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
```

- [ ] **Step 1: Write failing test** `lib/content/index.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { allChapters, getUnit, nextUnit } from "./index";

describe("content registry", () => {
  it("starts empty and safe", () => {
    expect(allChapters()).toEqual([]);
    expect(getUnit("nope", "nope")).toBeUndefined();
    expect(nextUnit("nope", "nope")).toBeNull();
  });
});
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL (module not found).
- [ ] **Step 3: Create both files** with content above.
- [ ] **Step 4: Run** `npm test` — Expected: PASS. Also `npx tsc --noEmit` via `npm run build` or add script `"typecheck": "tsc --noEmit"`; run it — Expected: clean. (Exception to no-npx rule: tsc runs through npm script.)
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: core types and content registry"`

---

### Task 3: Leitner scheduler

**Files:**
- Create: `lib/engine/leitner.ts`
- Test: `lib/engine/leitner.test.ts`

**Interfaces:**
- Produces:
```ts
export interface CardState { box: 1 | 2 | 3 | 4 | 5; due: number } // due = epoch ms
export function initCard(now: number): CardState;
export function review(s: CardState, correct: boolean, now: number): CardState;
export function isDue(s: CardState, now: number): boolean;
export const BOX_INTERVALS_MS: Record<1 | 2 | 3 | 4 | 5, number>;
```
Semantics: correct → box+1 (cap 5), wrong → box 1. Intervals: box1=0 (due immediately), box2=1d, box3=3d, box4=7d, box5=21d. `due = now + BOX_INTERVALS_MS[newBox]`.

- [ ] **Step 1: Write failing test** `lib/engine/leitner.test.ts`:
```ts
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
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Implement** `lib/engine/leitner.ts`:
```ts
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
```

- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: leitner spaced-repetition scheduler"`

---

### Task 4: Progress store (localStorage)

**Files:**
- Create: `lib/engine/progress.ts`
- Test: `lib/engine/progress.test.ts` (jsdom provides localStorage)

**Interfaces:**
- Consumes: `CardState`, `initCard`, `review`, `isDue` from Task 3; `allCards` from Task 2.
- Produces:
```ts
export interface Progress {
  completedUnits: string[];              // `${chapterId}/${unitId}`
  cards: Record<string, CardState>;      // cardId -> state
  streak: { count: number; lastDay: string }; // lastDay = "YYYY-MM-DD"
}
export function loadProgress(): Progress;
export function saveProgress(p: Progress): void;
export function completeUnit(p: Progress, chapterId: string, unitId: string, now: number): Progress; // also bumps streak
export function recordReview(p: Progress, cardId: string, correct: boolean, now: number): Progress;
export function dueCardIds(p: Progress, allIds: string[], now: number): string[]; // unseen ids count as due
export function isUnitComplete(p: Progress, chapterId: string, unitId: string): boolean;
```
Storage key: `"dsa-lab-progress-v1"`. `loadProgress` returns fresh empty progress on missing/corrupt JSON. Streak: completing a unit on consecutive calendar days increments count; same day no-op; gap resets to 1.

- [ ] **Step 1: Write failing test** `lib/engine/progress.test.ts`:
```ts
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
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Implement** `lib/engine/progress.ts`:
```ts
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
```

- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: localStorage progress store with streaks"`

---

### Task 5: Structure renderer (SVG)

**Files:**
- Create: `lib/viz/layout.ts` (pure, tested)
- Create: `components/StructViz.tsx` (thin SVG component)
- Test: `lib/viz/layout.test.ts`

**Interfaces:**
- Consumes: `StructState`, `VizNode`, `VizArrow` from `@/lib/types`.
- Produces:
```ts
// lib/viz/layout.ts
export interface PlacedNode extends VizNode { px: number; py: number } // pixel center
export interface Layout { nodes: PlacedNode[]; width: number; height: number }
export const CELL = 96;      // grid cell px
export const NODE_W = 72;    // node width px
export const NODE_H = 48;
export function layout(state: StructState): Layout;
```
```tsx
// components/StructViz.tsx
export interface StructVizProps { state: StructState; className?: string }
export function StructViz(props: StructVizProps): React.ReactElement;
```
Layout: node center px = `x * CELL + CELL/2`, py = `y * CELL + CELL/2`; width/height = (max grid + 1) * CELL. StructViz draws: rect/circle per node (shape), label centered, tag above, arrows as SVG lines with arrowhead marker between node centers shortened to node edges (straight lines fine). Emphasis colors via Tailwind classes: active=teal, new=green, error=red, dim=40% opacity, default=zinc.

- [ ] **Step 1: Write failing test** `lib/viz/layout.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { layout, CELL } from "./layout";

describe("layout", () => {
  it("places nodes at grid centers and sizes canvas", () => {
    const l = layout({
      nodes: [
        { id: "a", label: "7", x: 0, y: 0 },
        { id: "b", label: "3", x: 2, y: 1 },
      ],
      arrows: [{ from: "a", to: "b" }],
    });
    expect(l.nodes[0].px).toBe(CELL / 2);
    expect(l.nodes[1].px).toBe(2 * CELL + CELL / 2);
    expect(l.nodes[1].py).toBe(CELL + CELL / 2);
    expect(l.width).toBe(3 * CELL);
    expect(l.height).toBe(2 * CELL);
  });
  it("empty state yields minimal canvas", () => {
    const l = layout({ nodes: [], arrows: [] });
    expect(l.width).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Implement** `lib/viz/layout.ts`:
```ts
import type { StructState, VizNode } from "@/lib/types";

export interface PlacedNode extends VizNode { px: number; py: number }
export interface Layout { nodes: PlacedNode[]; width: number; height: number }

export const CELL = 96;
export const NODE_W = 72;
export const NODE_H = 48;

export function layout(state: StructState): Layout {
  const nodes = state.nodes.map((n) => ({ ...n, px: n.x * CELL + CELL / 2, py: n.y * CELL + CELL / 2 }));
  const maxX = Math.max(0, ...state.nodes.map((n) => n.x));
  const maxY = Math.max(0, ...state.nodes.map((n) => n.y));
  return { nodes, width: (maxX + 1) * CELL, height: (maxY + 1) * CELL };
}
```

Implement `components/StructViz.tsx`:
```tsx
import type { StructState } from "@/lib/types";
import { layout, NODE_W, NODE_H } from "@/lib/viz/layout";

export interface StructVizProps { state: StructState; className?: string }

const nodeColor: Record<string, string> = {
  active: "stroke-teal-400 fill-teal-950",
  new: "stroke-green-400 fill-green-950",
  error: "stroke-red-400 fill-red-950",
  dim: "stroke-zinc-700 fill-zinc-900 opacity-40",
  default: "stroke-zinc-500 fill-zinc-900",
};
const arrowColor: Record<string, string> = {
  active: "stroke-teal-400",
  error: "stroke-red-400",
  default: "stroke-zinc-500",
};

export function StructViz({ state, className }: StructVizProps) {
  const l = layout(state);
  const byId = new Map(l.nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 ${l.width} ${l.height}`} className={className} role="img">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400" />
        </marker>
      </defs>
      {state.arrows.map((a, i) => {
        const f = byId.get(a.from); const t = byId.get(a.to);
        if (!f || !t) return null;
        const dx = t.px - f.px; const dy = t.py - f.py;
        const len = Math.hypot(dx, dy) || 1;
        const trim = NODE_W / 2 + 4;
        const x1 = f.px + (dx / len) * trim; const y1 = f.py + (dy / len) * trim;
        const x2 = t.px - (dx / len) * trim; const y2 = t.py - (dy / len) * trim;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2} markerEnd="url(#arrow)"
              className={arrowColor[a.emphasis ?? "default"]} />
            {a.label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" className="fill-zinc-400 text-xs">{a.label}</text>}
          </g>
        );
      })}
      {l.nodes.map((n) => (
        <g key={n.id}>
          {n.shape === "circle" ? (
            <circle cx={n.px} cy={n.py} r={NODE_H / 2 + 4} strokeWidth={2} className={nodeColor[n.emphasis ?? "default"]} />
          ) : (
            <rect x={n.px - NODE_W / 2} y={n.py - NODE_H / 2} width={NODE_W} height={NODE_H} rx={n.shape === "frame" ? 4 : 10}
              strokeWidth={2} className={nodeColor[n.emphasis ?? "default"]} />
          )}
          <text x={n.px} y={n.py + 5} textAnchor="middle" className="fill-zinc-100 font-mono text-sm">{n.label}</text>
          {n.tag && <text x={n.px} y={n.py - NODE_H / 2 - 8} textAnchor="middle" className="fill-zinc-400 text-xs">{n.tag}</text>}
        </g>
      ))}
    </svg>
  );
}
```

- [ ] **Step 4: Run** `npm test` and typecheck — Expected: PASS/clean.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: SVG structure renderer"`

---

### Task 6: Step player (Watch engine)

**Files:**
- Create: `components/StepPlayer.tsx`
- Test: `components/StepPlayer.test.tsx`

**Interfaces:**
- Consumes: `Step` type, `StructViz`.
- Produces:
```tsx
export interface StepPlayerProps {
  steps: Step[];
  autoPlay?: boolean;          // default true; advance every 2500ms
  startAt?: number;            // initial step index (Review links use this)
  onFinished?: () => void;     // fired when last step reached
}
export function StepPlayer(props: StepPlayerProps): React.ReactElement;
```
Behavior: renders `StructViz` for current step + caption below + controls: prev (`aria-label="Previous step"`), play/pause (`aria-label="Play"`/`"Pause"`), next (`aria-label="Next step"`), step counter "3 / 8", clickable progress dots. Auto-advance pauses on any manual interaction. `"use client"` component. Interval via `useEffect` (needed: timer is an external system — this is the legitimate useEffect case).

- [ ] **Step 1: Write failing test** `components/StepPlayer.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepPlayer } from "./StepPlayer";
import type { Step } from "@/lib/types";

const steps: Step[] = [
  { state: { nodes: [{ id: "a", label: "1", x: 0, y: 0 }], arrows: [] }, caption: "First." },
  { state: { nodes: [{ id: "a", label: "2", x: 0, y: 0 }], arrows: [] }, caption: "Second." },
];

describe("StepPlayer", () => {
  it("shows caption, steps forward and back", () => {
    render(<StepPlayer steps={steps} autoPlay={false} />);
    expect(screen.getByText("First.")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Next step"));
    expect(screen.getByText("Second.")).toBeTruthy();
    expect(screen.getByText("2 / 2")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Previous step"));
    expect(screen.getByText("First.")).toBeTruthy();
  });
  it("fires onFinished at last step and respects startAt", () => {
    const done = vi.fn();
    render(<StepPlayer steps={steps} autoPlay={false} startAt={1} onFinished={done} />);
    expect(screen.getByText("Second.")).toBeTruthy();
    expect(done).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Implement** `components/StepPlayer.tsx` (complete):
```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import type { Step } from "@/lib/types";
import { StructViz } from "./StructViz";

export interface StepPlayerProps {
  steps: Step[];
  autoPlay?: boolean;
  startAt?: number;
  onFinished?: () => void;
}

export function StepPlayer({ steps, autoPlay = true, startAt = 0, onFinished }: StepPlayerProps) {
  const [i, setI] = useState(Math.min(startAt, steps.length - 1));
  const [playing, setPlaying] = useState(autoPlay);
  const finished = useRef(false);

  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) { setPlaying(false); return; }
    const t = setInterval(() => setI((n) => Math.min(n + 1, steps.length - 1)), 2500);
    return () => clearInterval(t);
  }, [playing, i, steps.length]);

  useEffect(() => {
    if (i === steps.length - 1 && !finished.current) {
      finished.current = true;
      onFinished?.();
    }
  }, [i, steps.length, onFinished]);

  const manual = (n: number) => { setPlaying(false); setI(n); };
  const step = steps[i];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-zinc-950 p-6">
        <StructViz state={step.state} className="mx-auto max-h-72 w-full" />
      </div>
      <p className="min-h-12 text-center text-lg text-zinc-200">{step.caption}</p>
      <div className="flex items-center justify-center gap-3">
        <button aria-label="Previous step" disabled={i === 0} onClick={() => manual(i - 1)}
          className="rounded-lg bg-zinc-800 px-3 py-2 text-zinc-200 disabled:opacity-30">←</button>
        <button aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}
          className="rounded-lg bg-teal-600 px-4 py-2 text-white">{playing ? "❚❚" : "▶"}</button>
        <button aria-label="Next step" disabled={i === steps.length - 1} onClick={() => manual(i + 1)}
          className="rounded-lg bg-zinc-800 px-3 py-2 text-zinc-200 disabled:opacity-30">→</button>
        <span className="ml-2 text-sm tabular-nums text-zinc-400">{i + 1} / {steps.length}</span>
      </div>
      <div className="flex justify-center gap-1.5">
        {steps.map((_, n) => (
          <button key={n} aria-label={`Go to step ${n + 1}`} onClick={() => manual(n)}
            className={`h-1.5 w-4 rounded-full ${n <= i ? "bg-teal-500" : "bg-zinc-700"}`} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: step player watch engine"`

---

### Task 7: Predict rung component

**Files:**
- Create: `components/PredictPane.tsx`
- Test: `components/PredictPane.test.tsx`

**Interfaces:**
- Consumes: `PredictRung`, `StepPlayer`, `StructViz`.
- Produces:
```tsx
export interface PredictPaneProps {
  rung: PredictRung;
  onPass: () => void;                 // correct answer chosen
  onReview: (stepIndex: number) => void; // fired when user clicks Review (shown after 2 wrong attempts)
}
export function PredictPane(props: PredictPaneProps): React.ReactElement;
```
Behavior: plays `rung.steps` (StepPlayer, autoPlay); after finished, shows prompt + option buttons. Wrong pick → show `explainWrong[optionId]` in red panel + render `revealStep.state` dimmed? No — reveal only after correct or after Review. Wrong twice → show "Review this concept" button calling `onReview(rung.reviewStep)`; options stay enabled (retry allowed). Correct → show `revealStep` state + green confirmation + "Continue" button calling `onPass`. No hint UI of any kind.

- [ ] **Step 1: Write failing test** `components/PredictPane.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PredictPane } from "./PredictPane";
import type { PredictRung } from "@/lib/types";

const rung: PredictRung = {
  kind: "predict",
  prompt: "What happens next?",
  steps: [{ state: { nodes: [], arrows: [] }, caption: "Setup." }],
  options: [{ id: "a", label: "x becomes 5" }, { id: "b", label: "x becomes 7" }],
  correctId: "b",
  explainWrong: { a: "x was reassigned after that line, so 5 is overwritten." },
  revealStep: { state: { nodes: [], arrows: [] }, caption: "x is 7." },
  reviewStep: 2,
};

describe("PredictPane", () => {
  it("wrong shows explanation, two wrongs show Review, correct passes", () => {
    const onPass = vi.fn(); const onReview = vi.fn();
    render(<PredictPane rung={rung} onPass={onPass} onReview={onReview} />);
    fireEvent.click(screen.getByText("x becomes 5"));
    expect(screen.getByText(/overwritten/)).toBeTruthy();
    expect(screen.queryByText(/Review this concept/)).toBeNull();
    fireEvent.click(screen.getByText("x becomes 5"));
    fireEvent.click(screen.getByText(/Review this concept/));
    expect(onReview).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByText("x becomes 7"));
    fireEvent.click(screen.getByText("Continue"));
    expect(onPass).toHaveBeenCalled();
  });
});
```
Note: rung.steps has one step, so StepPlayer fires onFinished immediately and options render.

- [ ] **Step 2: Run** — Expected: FAIL.
- [ ] **Step 3: Implement** `components/PredictPane.tsx`:
```tsx
"use client";
import { useState } from "react";
import type { PredictRung } from "@/lib/types";
import { StepPlayer } from "./StepPlayer";
import { StructViz } from "./StructViz";

export interface PredictPaneProps {
  rung: PredictRung;
  onPass: () => void;
  onReview: (stepIndex: number) => void;
}

export function PredictPane({ rung, onPass, onReview }: PredictPaneProps) {
  const [ready, setReady] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);

  const pick = (id: string) => {
    if (correct) return;
    if (id === rung.correctId) { setCorrect(true); setFeedback(null); }
    else { setWrongCount((c) => c + 1); setFeedback(rung.explainWrong[id] ?? "Not quite. Look at the last step again."); }
  };

  return (
    <div className="flex flex-col gap-4">
      <StepPlayer steps={rung.steps} onFinished={() => setReady(true)} />
      {ready && (
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium text-zinc-100">{rung.prompt}</p>
          <div className="flex flex-wrap gap-2">
            {rung.options.map((o) => (
              <button key={o.id} onClick={() => pick(o.id)} disabled={correct}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-200 hover:border-teal-500 disabled:opacity-50">
                {o.label}
              </button>
            ))}
          </div>
          {feedback && <p className="rounded-lg border border-red-900 bg-red-950 p-3 text-red-300">{feedback}</p>}
          {wrongCount >= 2 && !correct && (
            <button onClick={() => onReview(rung.reviewStep)}
              className="self-start rounded-lg border border-amber-700 bg-amber-950 px-4 py-2 text-amber-300">
              Review this concept
            </button>
          )}
          {correct && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-zinc-950 p-4">
                <StructViz state={rung.revealStep.state} className="mx-auto max-h-56 w-full" />
              </div>
              <p className="rounded-lg border border-green-900 bg-green-950 p-3 text-green-300">{rung.revealStep.caption}</p>
              <button onClick={onPass} className="self-start rounded-lg bg-teal-600 px-5 py-2 font-medium text-white">Continue</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: predict rung with verbal feedback and review link"`

---

### Task 8: Pyodide runner + feedback mapper

**Files:**
- Create: `lib/engine/pyodide.ts` (thin loader, untested)
- Create: `lib/engine/runner.ts` (pure logic where possible, tested with fake pyodide)
- Test: `lib/engine/runner.test.ts`

**Interfaces:**
- Produces:
```ts
// lib/engine/pyodide.ts
export interface Py { runPython(code: string): unknown }  // minimal surface we use
export function loadPy(): Promise<Py>; // injects CDN script once, caches instance

// lib/engine/runner.ts
export interface RunResult {
  ok: boolean;
  failures: string[];   // verbal feedback lines (assertion messages / explained errors)
  viz?: unknown;        // parsed JSON from vizExpr, if provided
}
export function runWithTests(py: Py, userCode: string, tests: CodeTest[], vizExpr?: string): RunResult;
export function explainPyError(message: string): string;  // maps raw python errors to plain-language feedback
```
`runWithTests`: for each test, `py.runPython(userCode + "\n" + test.code)`; catch → collect `explainPyError(msg)`. If all pass and `vizExpr`, run `import json; json.dumps(<vizExpr>)` after userCode, parse. `explainPyError` rules (substring match, first hit wins):
- `AssertionError: <msg>` → return `<msg>` verbatim (content authors write these as teaching feedback)
- `NameError: name 'X' is not defined` → `"You used X but never created it. Check your spelling and that you assigned it first."`
- `IndexError` → `"You reached past the end. Remember the last index is length minus 1."`
- `KeyError: X` → `"The key X is not in the dictionary. It must be added before you can read it."`
- `TypeError` → `"Type mismatch: <first line of original>. Check what kind of value each variable holds."`
- `IndentationError`/`SyntaxError` → `"Python could not read this code: <first line>. Check colons and indentation."`
- `RecursionError` → `"Your function never reaches a base case, so it calls itself forever."`
- fallback → first line of original message.

`loadPy` (untested, browser-only):
```ts
// lib/engine/pyodide.ts
export interface Py { runPython(code: string): unknown }

declare global { interface Window { loadPyodide?: (o: { indexURL: string }) => Promise<Py> } }

let instance: Promise<Py> | null = null;
const VERSION = "0.26.4";
const BASE = `https://cdn.jsdelivr.net/pyodide/v${VERSION}/full/`;

export function loadPy(): Promise<Py> {
  if (instance) return instance;
  instance = new Promise<Py>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `${BASE}pyodide.js`;
    s.onload = () => window.loadPyodide!({ indexURL: BASE }).then(resolve, reject);
    s.onerror = () => reject(new Error("Failed to load Python runtime. Check your connection and reload."));
    document.head.appendChild(s);
  });
  return instance;
}
```

- [ ] **Step 1: Write failing test** `lib/engine/runner.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { runWithTests, explainPyError, type RunResult } from "./runner";
import type { Py } from "./pyodide";

// fake Py: throws when code contains "BOOM: <error text>", else returns marker
const fake = (jsonOut = "{}"): Py => ({
  runPython(code: string) {
    const m = code.match(/BOOM: (.+)/);
    if (m) throw new Error(m[1]);
    return code.includes("json.dumps") ? jsonOut : undefined;
  },
});

describe("explainPyError", () => {
  it("passes assertion messages through verbatim", () => {
    expect(explainPyError("AssertionError: pop must return the last item")).toBe("pop must return the last item");
  });
  it("translates NameError", () => {
    expect(explainPyError("NameError: name 'totl' is not defined")).toContain("totl");
    expect(explainPyError("NameError: name 'totl' is not defined")).toContain("never created");
  });
  it("translates RecursionError", () => {
    expect(explainPyError("RecursionError: maximum recursion depth exceeded")).toContain("base case");
  });
});

describe("runWithTests", () => {
  const tests = [{ name: "t1", code: "assert True" }];
  it("passes when nothing throws and returns viz", () => {
    const r: RunResult = runWithTests(fake('{"nodes":[],"arrows":[]}'), "x = 1", tests, "state");
    expect(r.ok).toBe(true);
    expect(r.viz).toEqual({ nodes: [], arrows: [] });
  });
  it("collects verbal failures", () => {
    const r = runWithTests(fake(), "# BOOM: AssertionError: expected 3 items", tests);
    expect(r.ok).toBe(false);
    expect(r.failures).toEqual(["expected 3 items"]);
  });
});
```

- [ ] **Step 2: Run** — Expected: FAIL.
- [ ] **Step 3: Implement** `lib/engine/runner.ts`:
```ts
import type { CodeTest } from "@/lib/types";
import type { Py } from "./pyodide";

export interface RunResult { ok: boolean; failures: string[]; viz?: unknown }

const firstLine = (s: string): string => s.split("\n")[0];

export function explainPyError(message: string): string {
  const assertion = message.match(/AssertionError: ([\s\S]+)/);
  if (assertion) return firstLine(assertion[1]).trim();
  const nameErr = message.match(/NameError: name '(\w+)' is not defined/);
  if (nameErr) return `You used ${nameErr[1]} but never created it. Check your spelling and that you assigned it first.`;
  if (message.includes("IndexError")) return "You reached past the end. Remember the last index is length minus 1.";
  const keyErr = message.match(/KeyError: (.+)/);
  if (keyErr) return `The key ${firstLine(keyErr[1])} is not in the dictionary. It must be added before you can read it.`;
  if (message.includes("TypeError")) return `Type mismatch: ${firstLine(message)}. Check what kind of value each variable holds.`;
  if (message.includes("IndentationError") || message.includes("SyntaxError"))
    return `Python could not read this code: ${firstLine(message)}. Check colons and indentation.`;
  if (message.includes("RecursionError")) return "Your function never reaches a base case, so it calls itself forever.";
  return firstLine(message);
}

export function runWithTests(py: Py, userCode: string, tests: CodeTest[], vizExpr?: string): RunResult {
  const failures: string[] = [];
  for (const t of tests) {
    try {
      py.runPython(`${userCode}\n${t.code}`);
    } catch (e) {
      failures.push(explainPyError(e instanceof Error ? e.message : String(e)));
    }
  }
  let viz: unknown;
  if (failures.length === 0 && vizExpr) {
    try {
      const out = py.runPython(`${userCode}\nimport json\njson.dumps(${vizExpr})`);
      viz = JSON.parse(String(out));
    } catch { /* viz optional; ignore */ }
  }
  return { ok: failures.length === 0, failures, viz };
}
```
Create `lib/engine/pyodide.ts` exactly as in Interfaces above.

- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: pyodide runner with verbal error feedback"`

---

### Task 9: Fill-in + Write rung components

**Files:**
- Create: `components/CodePane.tsx` (shared: editor area, run button, feedback list, viz output, Review link)
- Create: `components/FillinPane.tsx`
- Create: `components/WritePane.tsx`
- Test: `components/FillinPane.test.tsx`

**Interfaces:**
- Consumes: `FillinRung`, `WriteRung`, `runWithTests`, `loadPy`, `StructViz`, `explainPyError`.
- Produces:
```tsx
export interface FillinPaneProps { rung: FillinRung; onPass: () => void; onReview: (stepIndex: number) => void }
export function FillinPane(props: FillinPaneProps): React.ReactElement;
export interface WritePaneProps { rung: WriteRung; onPass: () => void; onReview: (stepIndex: number) => void }
export function WritePane(props: WritePaneProps): React.ReactElement;
```

FillinPane behavior: render `rung.code` as monospace lines; each `{{blankId}}` becomes an inline `<input>` (aria-label = blank id). "Run" button (aria-label "Run code"): first check each blank against `blank.answer` (trim compare). Any wrong blank → failure list gets that blank's `explainWrong`; do NOT run Python. All blanks textually correct → substitute answers into code, `loadPy()` then `runWithTests`; failures shown in red panel; success → viz (if `rung.viz` result present) + "Continue" → `onPass`. 2 failed runs → "Review this concept" button → `onReview(rung.reviewStep)`. Retry always allowed.

WritePane behavior: `<textarea>` (aria-label "Code editor", monospace, rows≈14) seeded with `rung.starter`; Run → `loadPy` + `runWithTests(py, code, rung.tests, rung.vizExpr)`; result viz rendered with `StructViz` when shape matches `{nodes, arrows}`; failures listed verbally; 2 fails → Review button; pass → Continue.

Both panes show a "Running…" state while awaiting pyodide (first load is ~10MB; show "Loading Python runtime (first time only)…").

- [ ] **Step 1: Write failing test** `components/FillinPane.test.tsx` (blank-check path only; no pyodide in jsdom — mock `loadPy`):
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FillinPane } from "./FillinPane";
import type { FillinRung } from "@/lib/types";

vi.mock("@/lib/engine/pyodide", () => ({
  loadPy: () => Promise.resolve({ runPython: () => undefined }),
}));

const rung: FillinRung = {
  kind: "fillin",
  prompt: "Complete the swap.",
  code: "a = 1\nb = 2\na, b = {{swap}}",
  blanks: [{ id: "swap", placeholder: "___", answer: "b, a", explainWrong: "Swap needs both names, right side first: b, a." }],
  tests: [{ name: "swapped", code: "assert a == 2, 'a should end as 2'" }],
  reviewStep: 1,
};

describe("FillinPane", () => {
  it("wrong blank gives its explanation without running python", async () => {
    render(<FillinPane rung={rung} onPass={vi.fn()} onReview={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("swap"), { target: { value: "a, b" } });
    fireEvent.click(screen.getByLabelText("Run code"));
    await waitFor(() => expect(screen.getByText(/right side first/)).toBeTruthy());
  });
  it("correct blank runs tests and passes", async () => {
    const onPass = vi.fn();
    render(<FillinPane rung={rung} onPass={onPass} onReview={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("swap"), { target: { value: "b, a" } });
    fireEvent.click(screen.getByLabelText("Run code"));
    await waitFor(() => screen.getByText("Continue"));
    fireEvent.click(screen.getByText("Continue"));
    expect(onPass).toHaveBeenCalled();
  });
  it("two failures reveal Review", async () => {
    const onReview = vi.fn();
    render(<FillinPane rung={rung} onPass={vi.fn()} onReview={onReview} />);
    const blank = screen.getByLabelText("swap");
    for (const v of ["x", "y"]) {
      fireEvent.change(blank, { target: { value: v } });
      fireEvent.click(screen.getByLabelText("Run code"));
      await waitFor(() => screen.getByText(/right side first/));
    }
    fireEvent.click(screen.getByText(/Review this concept/));
    expect(onReview).toHaveBeenCalledWith(1);
  });
});
```

- [ ] **Step 2: Run** — Expected: FAIL.
- [ ] **Step 3: Implement.** `components/CodePane.tsx` (shared feedback/viz/review block):
```tsx
"use client";
import type { ReactNode } from "react";
import { StructViz } from "./StructViz";
import type { StructState } from "@/lib/types";

export interface RunFeedbackProps {
  failures: string[];
  viz?: unknown;
  passed: boolean;
  failCount: number;
  running: boolean;
  onContinue: () => void;
  onReview: () => void;
  children?: ReactNode; // the editor area
  onRun: () => void;
}

const isStructState = (v: unknown): v is StructState =>
  typeof v === "object" && v !== null && "nodes" in v && "arrows" in v;

export function CodePane({ failures, viz, passed, failCount, running, onContinue, onReview, children, onRun }: RunFeedbackProps) {
  return (
    <div className="flex flex-col gap-3">
      {children}
      <div className="flex items-center gap-3">
        <button aria-label="Run code" onClick={onRun} disabled={running}
          className="rounded-lg bg-teal-600 px-5 py-2 font-medium text-white disabled:opacity-50">
          {running ? "Running…" : "Run"}
        </button>
        {failCount >= 2 && !passed && (
          <button onClick={onReview} className="rounded-lg border border-amber-700 bg-amber-950 px-4 py-2 text-amber-300">
            Review this concept
          </button>
        )}
      </div>
      {failures.length > 0 && (
        <ul className="flex flex-col gap-1 rounded-lg border border-red-900 bg-red-950 p-3">
          {failures.map((f, i) => <li key={i} className="text-red-300">{f}</li>)}
        </ul>
      )}
      {passed && (
        <div className="flex flex-col gap-3">
          {isStructState(viz) && (
            <div className="rounded-xl bg-zinc-950 p-4"><StructViz state={viz} className="mx-auto max-h-56 w-full" /></div>
          )}
          <p className="rounded-lg border border-green-900 bg-green-950 p-3 text-green-300">All checks passed. This is your structure.</p>
          <button onClick={onContinue} className="self-start rounded-lg bg-teal-600 px-5 py-2 font-medium text-white">Continue</button>
        </div>
      )}
    </div>
  );
}
```

`components/FillinPane.tsx`:
```tsx
"use client";
import { Fragment, useState } from "react";
import type { FillinRung } from "@/lib/types";
import { loadPy } from "@/lib/engine/pyodide";
import { runWithTests } from "@/lib/engine/runner";
import { CodePane } from "./CodePane";

export interface FillinPaneProps { rung: FillinRung; onPass: () => void; onReview: (stepIndex: number) => void }

export function FillinPane({ rung, onPass, onReview }: FillinPaneProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [failures, setFailures] = useState<string[]>([]);
  const [viz, setViz] = useState<unknown>();
  const [passed, setPassed] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [running, setRunning] = useState(false);

  const run = async () => {
    const wrong = rung.blanks.filter((b) => (values[b.id] ?? "").trim() !== b.answer);
    if (wrong.length > 0) {
      setFailures(wrong.map((b) => b.explainWrong));
      setFailCount((c) => c + 1);
      return;
    }
    setRunning(true);
    try {
      const code = rung.blanks.reduce((c, b) => c.replaceAll(`{{${b.id}}}`, b.answer), rung.code);
      const r = runWithTests(await loadPy(), code, rung.tests, rung.vizExpr);
      setFailures(r.failures);
      setViz(r.viz);
      if (r.ok) setPassed(true); else setFailCount((c) => c + 1);
    } finally {
      setRunning(false);
    }
  };

  const parts = rung.code.split(/(\{\{\w+\}\})/);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-medium text-zinc-100">{rung.prompt}</p>
      <CodePane failures={failures} viz={viz} passed={passed} failCount={failCount} running={running}
        onContinue={onPass} onReview={() => onReview(rung.reviewStep)} onRun={run}>
        <pre className="whitespace-pre-wrap rounded-xl bg-zinc-950 p-4 font-mono text-sm text-zinc-200">
          {parts.map((p, i) => {
            const m = p.match(/^\{\{(\w+)\}\}$/);
            if (!m) return <Fragment key={i}>{p}</Fragment>;
            const blank = rung.blanks.find((b) => b.id === m[1]);
            return (
              <input key={i} aria-label={m[1]} value={values[m[1]] ?? ""} placeholder={blank?.placeholder ?? "___"}
                onChange={(e) => setValues((v) => ({ ...v, [m[1]]: e.target.value }))}
                className="mx-1 inline-block w-28 rounded border border-teal-700 bg-zinc-900 px-2 py-0.5 text-teal-300" />
            );
          })}
        </pre>
      </CodePane>
    </div>
  );
}
```

`components/WritePane.tsx`:
```tsx
"use client";
import { useState } from "react";
import type { WriteRung } from "@/lib/types";
import { loadPy } from "@/lib/engine/pyodide";
import { runWithTests } from "@/lib/engine/runner";
import { CodePane } from "./CodePane";

export interface WritePaneProps { rung: WriteRung; onPass: () => void; onReview: (stepIndex: number) => void }

export function WritePane({ rung, onPass, onReview }: WritePaneProps) {
  const [code, setCode] = useState(rung.starter);
  const [failures, setFailures] = useState<string[]>([]);
  const [viz, setViz] = useState<unknown>();
  const [passed, setPassed] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    try {
      const r = runWithTests(await loadPy(), code, rung.tests, rung.vizExpr);
      setFailures(r.failures);
      setViz(r.viz);
      if (r.ok) setPassed(true); else setFailCount((c) => c + 1);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-medium text-zinc-100">{rung.prompt}</p>
      <CodePane failures={failures} viz={viz} passed={passed} failCount={failCount} running={running}
        onContinue={onPass} onReview={() => onReview(rung.reviewStep)} onRun={run}>
        <textarea aria-label="Code editor" rows={14} value={code} spellCheck={false}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-xl bg-zinc-950 p-4 font-mono text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-teal-700" />
      </CodePane>
    </div>
  );
}
```

- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: fillin and write code rungs"`

---

### Task 10: Recall cards + review queue

**Files:**
- Create: `components/RecallPane.tsx`
- Create: `app/review/page.tsx`
- Test: `components/RecallPane.test.tsx`

**Interfaces:**
- Consumes: `Card`, `recordReview`, `loadProgress`, `saveProgress`, `dueCardIds`, `allCards`.
- Produces:
```tsx
export interface RecallPaneProps {
  cards: Card[];
  onAnswer: (cardId: string, correct: boolean) => void; // fired per card
  onDone: () => void;
}
export function RecallPane(props: RecallPaneProps): React.ReactElement;
```
Behavior: shows one card at a time: prompt + option buttons. Wrong pick → red panel with `card.explainWrong`, then "Next" (card counted wrong, no retry — spaced repetition brings it back). Correct → brief green flash then next card. After last card, "Done" button → `onDone`. Progress "2 / 5" counter.

`app/review/page.tsx` (`"use client"`): loads progress, computes due cards via `dueCardIds(p, allCards().map(c => c.id), Date.now())`, maps back to Card objects, renders `RecallPane`; `onAnswer` → `recordReview` + `saveProgress`; `onDone` → link back to `/`. Empty due queue → "Nothing due. Go learn something new." + link `/`.

- [ ] **Step 1: Write failing test** `components/RecallPane.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecallPane } from "./RecallPane";
import type { Card } from "@/lib/types";

const cards: Card[] = [
  { id: "c1", prompt: "A list index starts at?", options: ["0", "1"], correctIndex: 0, explainWrong: "Python indexes from 0: the first item is item 0." },
  { id: "c2", prompt: "len('abc')?", options: ["2", "3"], correctIndex: 1, explainWrong: "len counts characters: a, b, c is 3." },
];

describe("RecallPane", () => {
  it("wrong shows explanation and records false; flows to done", () => {
    const onAnswer = vi.fn(); const onDone = vi.fn();
    render(<RecallPane cards={cards} onAnswer={onAnswer} onDone={onDone} />);
    fireEvent.click(screen.getByText("1"));
    expect(screen.getByText(/indexes from 0/)).toBeTruthy();
    expect(onAnswer).toHaveBeenCalledWith("c1", false);
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("3"));
    expect(onAnswer).toHaveBeenCalledWith("c2", true);
    fireEvent.click(screen.getByText("Done"));
    expect(onDone).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run** — Expected: FAIL.
- [ ] **Step 3: Implement** `components/RecallPane.tsx`:
```tsx
"use client";
import { useState } from "react";
import type { Card } from "@/lib/types";

export interface RecallPaneProps {
  cards: Card[];
  onAnswer: (cardId: string, correct: boolean) => void;
  onDone: () => void;
}

export function RecallPane({ cards, onAnswer, onDone }: RecallPaneProps) {
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const card = cards[i];
  const last = i === cards.length - 1;

  const pick = (idx: number) => {
    if (answered !== null) return;
    const correct = idx === card.correctIndex;
    setAnswered(correct);
    onAnswer(card.id, correct);
  };
  const next = () => { setAnswered(null); setI(i + 1); };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm tabular-nums text-zinc-400">{i + 1} / {cards.length}</span>
      <p className="text-xl font-medium text-zinc-100">{card.prompt}</p>
      <div className="flex flex-wrap gap-2">
        {card.options.map((o, idx) => (
          <button key={idx} onClick={() => pick(idx)} disabled={answered !== null}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-zinc-200 hover:border-teal-500 disabled:opacity-60">
            {o}
          </button>
        ))}
      </div>
      {answered === false && <p className="rounded-lg border border-red-900 bg-red-950 p-3 text-red-300">{card.explainWrong}</p>}
      {answered === true && <p className="rounded-lg border border-green-900 bg-green-950 p-3 text-green-300">Correct.</p>}
      {answered !== null && (
        last
          ? <button onClick={onDone} className="self-start rounded-lg bg-teal-600 px-5 py-2 text-white">Done</button>
          : <button onClick={next} className="self-start rounded-lg bg-zinc-800 px-5 py-2 text-zinc-200">Next</button>
      )}
    </div>
  );
}
```

`app/review/page.tsx`:
```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RecallPane } from "@/components/RecallPane";
import { allCards } from "@/lib/content";
import { loadProgress, saveProgress, recordReview, dueCardIds } from "@/lib/engine/progress";
import type { Card } from "@/lib/types";

export default function ReviewPage() {
  const [due, setDue] = useState<Card[] | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const cards = allCards();
    const ids = new Set(dueCardIds(loadProgress(), cards.map((c) => c.id), Date.now()));
    setDue(cards.filter((c) => ids.has(c.id)));
  }, []);

  if (due === null) return null;
  if (done || due.length === 0)
    return (
      <main className="mx-auto flex max-w-xl flex-col gap-4 p-8">
        <p className="text-lg text-zinc-200">{done ? "Review complete." : "Nothing due. Go learn something new."}</p>
        <Link href="/" className="text-teal-400">Back to dashboard</Link>
      </main>
    );

  return (
    <main className="mx-auto max-w-xl p-8">
      <RecallPane
        cards={due}
        onAnswer={(id, correct) => saveProgress(recordReview(loadProgress(), id, correct, Date.now()))}
        onDone={() => setDone(true)}
      />
    </main>
  );
}
```

- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: recall cards and review queue page"`

---

### Task 11: Unit player + learn route + dashboard

**Files:**
- Create: `components/UnitPlayer.tsx`
- Create: `app/learn/[chapter]/[unit]/page.tsx`
- Modify: `app/page.tsx` (dashboard)
- Modify: `app/layout.tsx` (dark bg, title "DSA Lab")
- Test: `components/UnitPlayer.test.tsx`

**Interfaces:**
- Consumes: everything above.
- Produces:
```tsx
export interface UnitPlayerProps {
  unit: Unit;
  onComplete: () => void;   // all rungs + recall done
  onRecallAnswer: (cardId: string, correct: boolean) => void;
}
export function UnitPlayer(props: UnitPlayerProps): React.ReactElement;
```
UnitPlayer state machine: `phase: "watch" | { rung: number } | "recall" | "done"`. Watch → StepPlayer with a "Start doing" button once finished. Each rung renders its pane by `kind` (predict → PredictPane, fillin → FillinPane, write/apply → WritePane); `onPass` advances. Any pane's `onReview(stepIndex)` switches phase back to watch with `startAt=stepIndex` and `autoPlay=false`; "Back to exercise" button returns to the same rung. After last rung → RecallPane with `unit.recall`; `onDone` → phase done → `onComplete` + "Unit complete" panel.

Learn page (`"use client"`): `useParams()` for chapter/unit ids; `getUnit`; not found → link home. `onComplete` → `saveProgress(completeUnit(loadProgress(), chapterId, unitId, Date.now()))`; show "Next unit" link via `nextUnit()` or back to dashboard. `onRecallAnswer` → `recordReview` + save.

Dashboard `app/page.tsx` (`"use client"`): header "DSA Lab" + streak (🔥 n); "Review due: N cards" button → `/review` (teal, prominent, hidden when 0); chapter list grouped by phase (Phase 1: Python foundations / Phase 2: Data structures & algorithms) — each chapter shows title + units as pills (done = teal fill, next = outlined, links to `/learn/[c]/[u]`).

`app/layout.tsx`: `<body className="bg-zinc-950 text-zinc-100 antialiased">`, metadata title "DSA Lab".

- [ ] **Step 1: Write failing test** `components/UnitPlayer.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UnitPlayer } from "./UnitPlayer";
import type { Unit } from "@/lib/types";

const unit: Unit = {
  id: "u1",
  title: "Test unit",
  watch: [{ state: { nodes: [], arrows: [] }, caption: "Watch me." }],
  ladder: [{
    kind: "predict", prompt: "Next?", steps: [{ state: { nodes: [], arrows: [] }, caption: "S." }],
    options: [{ id: "a", label: "A" }, { id: "b", label: "B" }], correctId: "a",
    explainWrong: { b: "B is wrong because A." },
    revealStep: { state: { nodes: [], arrows: [] }, caption: "It was A." }, reviewStep: 0,
  }],
  recall: [{ id: "u1.c1", prompt: "Q?", options: ["yes", "no"], correctIndex: 0, explainWrong: "Because yes." }],
};

describe("UnitPlayer", () => {
  it("walks watch -> rung -> recall -> complete", () => {
    const onComplete = vi.fn();
    render(<UnitPlayer unit={unit} onComplete={onComplete} onRecallAnswer={vi.fn()} />);
    expect(screen.getByText("Watch me.")).toBeTruthy();
    fireEvent.click(screen.getByText("Start doing"));
    fireEvent.click(screen.getByText("A"));
    fireEvent.click(screen.getByText("Continue"));
    fireEvent.click(screen.getByText("yes"));
    fireEvent.click(screen.getByText("Done"));
    expect(onComplete).toHaveBeenCalled();
    expect(screen.getByText(/Unit complete/)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run** — Expected: FAIL.
- [ ] **Step 3: Implement** `components/UnitPlayer.tsx`:
```tsx
"use client";
import { useState } from "react";
import type { Unit } from "@/lib/types";
import { StepPlayer } from "./StepPlayer";
import { PredictPane } from "./PredictPane";
import { FillinPane } from "./FillinPane";
import { WritePane } from "./WritePane";
import { RecallPane } from "./RecallPane";

export interface UnitPlayerProps {
  unit: Unit;
  onComplete: () => void;
  onRecallAnswer: (cardId: string, correct: boolean) => void;
}

type Phase = { kind: "watch"; startAt: number; returnTo: number | null } | { kind: "rung"; index: number } | { kind: "recall" } | { kind: "done" };

export function UnitPlayer({ unit, onComplete, onRecallAnswer }: UnitPlayerProps) {
  const [phase, setPhase] = useState<Phase>({ kind: "watch", startAt: 0, returnTo: null });
  const [watchDone, setWatchDone] = useState(false);

  const toRung = (index: number) =>
    index < unit.ladder.length ? setPhase({ kind: "rung", index }) : setPhase({ kind: "recall" });
  const review = (from: number) => (stepIndex: number) =>
    setPhase({ kind: "watch", startAt: stepIndex, returnTo: from });

  if (phase.kind === "watch") {
    return (
      <div className="flex flex-col gap-4">
        <StepPlayer key={phase.startAt} steps={unit.watch} startAt={phase.startAt}
          autoPlay={phase.returnTo === null} onFinished={() => setWatchDone(true)} />
        {phase.returnTo !== null ? (
          <button onClick={() => toRung(phase.returnTo!)}
            className="self-center rounded-lg bg-teal-600 px-5 py-2 font-medium text-white">Back to exercise</button>
        ) : watchDone ? (
          <button onClick={() => toRung(0)}
            className="self-center rounded-lg bg-teal-600 px-5 py-2 font-medium text-white">Start doing</button>
        ) : null}
      </div>
    );
  }

  if (phase.kind === "rung") {
    const rung = unit.ladder[phase.index];
    const onPass = () => toRung(phase.index + 1);
    const onReview = review(phase.index);
    if (rung.kind === "predict") return <PredictPane rung={rung} onPass={onPass} onReview={onReview} />;
    if (rung.kind === "fillin") return <FillinPane rung={rung} onPass={onPass} onReview={onReview} />;
    return <WritePane rung={rung} onPass={onPass} onReview={onReview} />;
  }

  if (phase.kind === "recall") {
    return <RecallPane cards={unit.recall} onAnswer={onRecallAnswer}
      onDone={() => { setPhase({ kind: "done" }); onComplete(); }} />;
  }

  return <p className="rounded-lg border border-green-900 bg-green-950 p-4 text-green-300">Unit complete.</p>;
}
```

Implement `app/learn/[chapter]/[unit]/page.tsx`:
```tsx
"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { UnitPlayer } from "@/components/UnitPlayer";
import { getUnit, getChapter, nextUnit } from "@/lib/content";
import { loadProgress, saveProgress, completeUnit, recordReview } from "@/lib/engine/progress";

export default function LearnPage() {
  const { chapter, unit } = useParams<{ chapter: string; unit: string }>();
  const [completed, setCompleted] = useState(false);
  const u = getUnit(chapter, unit);
  const c = getChapter(chapter);
  if (!u || !c) return <main className="p-8"><Link href="/" className="text-teal-400">Unit not found — back to dashboard</Link></main>;
  const next = nextUnit(chapter, unit);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <header className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold">{u.title}</h1>
        <Link href="/" className="text-sm text-zinc-400 hover:text-teal-400">{c.title}</Link>
      </header>
      <UnitPlayer
        unit={u}
        onComplete={() => { saveProgress(completeUnit(loadProgress(), chapter, unit, Date.now())); setCompleted(true); }}
        onRecallAnswer={(id, correct) => saveProgress(recordReview(loadProgress(), id, correct, Date.now()))}
      />
      {completed && (
        next
          ? <Link href={`/learn/${next.chapterId}/${next.unitId}`} className="self-start rounded-lg bg-teal-600 px-5 py-2 font-medium text-white">Next unit →</Link>
          : <Link href="/" className="self-start rounded-lg bg-teal-600 px-5 py-2 font-medium text-white">Back to dashboard</Link>
      )}
    </main>
  );
}
```

Implement `app/page.tsx`:
```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { allChapters, allCards } from "@/lib/content";
import { loadProgress, dueCardIds, isUnitComplete, type Progress } from "@/lib/engine/progress";

export default function Dashboard() {
  const [p, setP] = useState<Progress | null>(null);
  useEffect(() => setP(loadProgress()), []);
  if (!p) return null;
  const due = dueCardIds(p, allCards().map((c) => c.id), Date.now()).length;
  const phases: Array<{ n: 1 | 2; title: string }> = [
    { n: 1, title: "Phase 1 · Python foundations" },
    { n: 2, title: "Phase 2 · Data structures & algorithms" },
  ];

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">DSA Lab</h1>
        {p.streak.count > 0 && <span className="text-zinc-300">🔥 {p.streak.count} day{p.streak.count > 1 ? "s" : ""}</span>}
      </header>
      {due > 0 && (
        <Link href="/review" className="rounded-xl bg-teal-600 p-4 text-center text-lg font-medium text-white">
          Review due: {due} card{due > 1 ? "s" : ""}
        </Link>
      )}
      {phases.map((ph) => {
        const chapters = allChapters().filter((c) => c.phase === ph.n);
        if (chapters.length === 0) return null;
        return (
          <section key={ph.n} className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">{ph.title}</h2>
            {chapters.map((c) => (
              <div key={c.id} className="rounded-xl border border-zinc-800 p-4">
                <h3 className="mb-3 font-medium text-zinc-200">{c.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {c.units.map((u) => {
                    const done = isUnitComplete(p, c.id, u.id);
                    return (
                      <Link key={u.id} href={`/learn/${c.id}/${u.id}`}
                        className={`rounded-full px-3 py-1 text-sm ${done ? "bg-teal-600 text-white" : "border border-zinc-700 text-zinc-300 hover:border-teal-500"}`}>
                        {u.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </main>
  );
}
```

Modify `app/layout.tsx`: set metadata title/description ("DSA Lab", "Learn data structures and algorithms visually"), body classes `bg-zinc-950 text-zinc-100 antialiased`.

- [ ] **Step 4: Run** `npm test` and `npm run build` — Expected: PASS / clean build.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: unit player, learn route, dashboard"`

---

### Task 12: Visual design pass

**Files:**
- Modify: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, all components — styling only, zero behavior change.

**Interfaces:** none new. All tests from prior tasks must still pass unchanged (behavior frozen; tests are the guard).

- [ ] **Step 1: MANDATORY — invoke a design skill** (`impeccable` or `taste-skill:taste-skill`) and apply it to the whole app: dashboard, learn loop, review queue.
- [ ] **Step 2: Design direction constraints** (from spec): dark, minimal, modern; big canvas small chrome; the visualization is the hero — chrome recedes. Monospace for all code/values. Consistent accent (teal family already in components; refine, don't scatter new hues). Progress/streak visible but quiet. No decorative clutter, no cards-in-cards nesting.
- [ ] **Step 3: Typography + polish**: proper font stack via `next/font` (e.g. Geist Sans + Geist Mono already bundled with create-next-app), focus states on all interactive elements, `prefers-reduced-motion` respected for any added animation, caption transitions (fade between steps) if cheap.
- [ ] **Step 4: Verify** `npm test` (all green — no behavior change) and `npm run build`.
- [ ] **Step 5: Commit** `git add -A && git commit -m "style: visual design pass"`

---

### Task 13: Content — Chapter 1: Values and Variables

**Files:**
- Create: `lib/content/ch-variables.ts`
- Modify: `lib/content/index.ts` (import + register)
- Test: `lib/content/content.test.ts` (schema validation, shared by all content chapters)

**Interfaces:**
- Consumes: all types from Task 2.
- Produces: `export const chVariables: Chapter` with `id: "py-variables"`, `phase: 1`, `title: "Values and Variables"`.

Registration pattern in `lib/content/index.ts`:
```ts
import { chVariables } from "./ch-variables";
const chapters: Chapter[] = [chVariables];
```

**Content requirements (author original material, terse captions, max 2 sentences each):**

Units (4):
1. `boxes` — "Variables are labels": assignment draws a box (VizNode, tag=name, label=value); reassignment changes box contents; two variables can hold same value in separate boxes. Watch ≥6 steps. Ladder: predict (reassignment outcome) + fillin (swap two variables) + write (create three variables from a word problem, tests assert values). Recall 3 cards.
2. `types` — int/float/str/bool as box "shapes": same rendering, tag shows type; `type()` inspection; int vs float division (`/` vs `//`). Watch ≥6 steps. Ladder: predict (`7 // 2` result) + fillin (`int("5") + 2`) + write (temperature conversion function, tests assert float result). Recall 3 cards.
3. `references` — THE key unit: two names, one object. `a = [1, 2]; b = a; b.append(3)` — arrows from both names to ONE list node; contrast with `b = list(a)` copy. This mental model carries all of Phase 2. Watch ≥8 steps showing arrows converging then diverging. Ladder: predict (does `a` see the append?) + predict (after copy, does it?) + fillin (make a real copy) + write (function that mutates vs returns new list, tests assert both behaviors). Recall 4 cards.
4. `apply-variables` — apply rung only unit: small problem combining all three (shopping cart totals with a shared/copied list bug to avoid). Watch 2 steps (problem setup). Ladder: single apply rung. Recall 2 cards.

Every rung: `explainWrong` entries are specific (name the misconception), `reviewStep` points at the watch step that teaches that exact idea. Every code test's assert message teaches (e.g. `assert total == 12, "total should be 12: the copy must not change when the original grows"`).

`vizExpr` convention for list-rendering rungs: content includes a Python helper INSIDE the rung's test/viz setup that builds `{"nodes": [...], "arrows": [...]}` from the user's list, e.g. appended to code before vizExpr evaluation:
```python
def _viz(name, xs):
    nodes = [{"id": f"n{i}", "label": repr(v), "x": i, "y": 0} for i, v in enumerate(xs)]
    nodes.insert(0, {"id": "var", "label": name, "x": 0, "y": 1, "shape": "box", "tag": "variable"})
    arrows = [{"from": "var", "to": "n0"}] + [{"from": f"n{i}", "to": f"n{i+1}"} for i in range(len(xs) - 1)]
    return {"nodes": nodes, "arrows": arrows}
```
Put `_viz` in the rung's `code`/`starter` preamble comment-free zone or append via test code; `vizExpr` then is e.g. `_viz("cart", cart)`.

- [ ] **Step 1: Write schema test** `lib/content/content.test.ts` (validates ALL registered chapters; future content tasks get coverage free):
```ts
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
```

- [ ] **Step 2: Run** — Expected: FAIL ("has at least one chapter").
- [ ] **Step 3: Author** `lib/content/ch-variables.ts` per requirements above; register in index.
- [ ] **Step 4: Run** `npm test` — Expected: PASS. Then `npm run dev`, manually walk unit 1 end to end in browser including a code rung (real Pyodide): wrong answers must show specific feedback; Review must jump to the right watch step.
- [ ] **Step 5: Commit** `git add -A && git commit -m "content: chapter 1 - values and variables"`

---

### Task 14: Content — Chapter 2: Branching and Loops

**Files:**
- Create: `lib/content/ch-flow.ts`
- Modify: `lib/content/index.ts` (register after chVariables)

**Interfaces:** `export const chFlow: Chapter`, `id: "py-flow"`, `phase: 1`, `title: "Branching and Loops"`.

Same schema test covers it automatically (Task 13 Step 1).

**Content requirements:** Units (4):
1. `branching` — if/elif/else as a fork: condition node highlights true path (arrows, emphasis active/dim). Watch ≥6 steps. Ladder: predict (which branch runs) + fillin (elif condition) + write (grade classifier fn, tests per band with teaching asserts). Recall 3 cards.
2. `while` — loop as a ticking pointer: condition check → body → back, variable box updating each iteration; infinite-loop danger shown (condition never false → error emphasis). Watch ≥7 steps. Ladder: predict (loop runs how many times) + fillin (loop condition) + write (countdown collecting values, tests). Recall 3 cards.
3. `for-range` — for over range/list: pointer walking items left to right (this primes list traversal for Phase 2). Watch ≥6 steps. Ladder: predict (final accumulator value) + fillin (range bounds) + write (sum of evens, tests). Recall 3 cards.
4. `apply-flow` — apply: FizzBuzz-class problem (original variant, e.g. ping/pong on 3/5). Watch 2 steps. Single apply rung. Recall 2 cards.

Loop iteration visualization: variable boxes for `i`/accumulator with emphasis "active" on the changing box per step; range items as a row of circles, current one active, consumed ones dim.

- [ ] **Step 1: Author** `lib/content/ch-flow.ts`; register.
- [ ] **Step 2: Run** `npm test` — Expected: PASS (schema test validates new chapter).
- [ ] **Step 3: Manual browser walk** of one full unit including write rung.
- [ ] **Step 4: Commit** `git add -A && git commit -m "content: chapter 2 - branching and loops"`

---

### Task 15: Content — Chapter 3: Functions and the Call Stack

**Files:**
- Create: `lib/content/ch-functions.ts`
- Modify: `lib/content/index.ts` (register after chFlow)

**Interfaces:** `export const chFunctions: Chapter`, `id: "py-functions"`, `phase: 1`, `title: "Functions and the Call Stack"`.

**Content requirements:** Units (4):
1. `def-call` — define vs call: def creates a machine (frame shape node), calling feeds arguments in, return sends value out to the assigned box. Watch ≥7 steps. Ladder: predict (what prints vs returns) + fillin (return statement) + write (rectangle area fn, tests). Recall 3 cards.
2. `call-stack` — frames stack up: `main → f() → g()`, frames as stacked "frame"-shaped nodes (y increasing), pop on return, local variables live inside their frame and die with it. Watch ≥8 steps. Ladder: predict (which frame is on top) + predict (what happens to a local after return) + fillin (missing return) + write (fn composing two calls, tests). Recall 4 cards.
3. `scope` — same name, different boxes: local `x` vs global `x` drawn in separate frames; shadowing shown. Watch ≥6 steps. Ladder: predict (which x prints) + fillin (parameter naming) + write (fn that must not mutate its input list — ties back to references unit, tests assert original unchanged with teaching message). Recall 3 cards.
4. `apply-functions` — apply: refactor repeated code into a function (checkout with tax applied three places). Watch 2 steps. Single apply rung. Recall 2 cards.

Call-stack visualization primes recursion (later chapter) — frames MUST render as vertical stack, newest on top, shape "frame".

- [ ] **Step 1: Author** `lib/content/ch-functions.ts`; register.
- [ ] **Step 2: Run** `npm test` — Expected: PASS.
- [ ] **Step 3: Manual browser walk** of call-stack unit.
- [ ] **Step 4: Commit** `git add -A && git commit -m "content: chapter 3 - functions and call stack"`

---

### Task 16: Vercel deploy

**Files:**
- Create: `README.md` (what it is, run locally, deploy)
- Modify: none expected (app is already client-only)

- [ ] **Step 1: Production build check** — Run: `npm run build`. Expected: clean; all routes static/client.
- [ ] **Step 2: Deploy** via vercel:deploy skill (preview first). Expected: live preview URL.
- [ ] **Step 3: Smoke test on the deployed URL**: dashboard loads, complete one predict rung, run one code rung (Pyodide loads from CDN over HTTPS), refresh — progress persisted.
- [ ] **Step 4: Promote to production** (vercel:deploy prod) once smoke passes.
- [ ] **Step 5: Write README.md** (name, one-line pitch, `npm install && npm run dev`, deployed URL) and commit: `git add -A && git commit -m "docs: readme + deploy"`.

---

## Post-Milestone: remaining chapters

Chapters 4-18 (strings, lists/dicts, classes, recursion, then all of Phase 2 DSA) follow the Task 13-15 pattern exactly: one content file per chapter, register in index, schema test validates automatically, manual browser walk, commit. Each batch of 2-3 chapters is a short follow-up plan listing unit-level content requirements — engines need no changes unless a chapter demands a new visualization primitive (trees/graphs will need a `layoutTree`/`layoutGraph` helper added to `lib/viz/layout.ts` with tests, planned in that batch).
