# DSA Lab — Design Spec

Date: 2026-07-16
Status: Approved pending user review

## Purpose

Interactive app that teaches the user data structures and algorithms from the ground up, visually, with minimal reading. The user knows basic Python syntax only. The app replaces zyBooks (too much reading) and improves on Scrimba's watch-then-do loop (too passive, JS not Python, weak visuals).

## Learner profile

- Knows basic Python syntax; not intermediate concepts (references, classes, recursion depth).
- Learns visually; walls of text do not work.
- Wants to do real work, not watch. Retention through repetition and effort.

## Curriculum

Covers all 21 zyBooks chapters, reordered ground-up. All content is original (topics from zyBooks, never its text).

**Phase 1 — Python core, visual** (condenses zyBooks ch 12-21):

1. Variables and types (values as boxes)
2. Branching and loops (ticking pointers, flow arrows)
3. Strings
4. Functions and the call stack (animated stack frames)
5. Lists and dictionaries (references as arrows — the key mental model)
6. Classes and objects (blueprint spawns objects on a heap diagram)
7. Recursion (call stack animation, base case highlighting)

**Phase 2 — DSA** (zyBooks ch 1-11):

8. Intro to DSA and complexity (Big O, growth curves animated)
9. Lists (singly/doubly linked, built from nodes = objects + reference arrows from Phase 1)
10. Stacks and queues
11. Hash tables (hashing animation, collisions, chaining/probing)
12. Trees (BST insert/search/delete, traversals)
13. Balanced trees (AVL rotations, red-black)
14. Heaps and treaps (bubble-up/down, heapify)
15. Sets
16. Graphs (BFS/DFS spread, Dijkstra, topological sort)
17. B-trees
18. Searching and algorithm analysis (binary search, sorting algorithms compared side by side)

Each chapter is a chain of concept units, ~5-10 min each.

## Core learning loop — Watch / Do / Recall

Every concept unit is one loop. Roughly 70% of time is in Do.

### Watch (30-60s)

- Auto-playing step animation. One caption line per step; never more than two sentences on screen.
- No prose lessons anywhere. Captioned animation IS the content.
- Scrub, replay, step forward/back freely.
- Content must be complete: everything needed to pass the Do ladder is taught here (no-hints policy depends on this).

### Do — scaffolding ladder

Difficulty ramps per concept; the user always does the work:

1. **Predict** — animation pauses: "what happens next?" User clicks a node / picks an option.
2. **Fill-in** — working Python code with 1-2 blanks. The fill runs; visualization renders the result.
3. **Write** — full function from scratch. Tests run AND the user's structure is drawn live (the user's code builds the picture).
4. **Apply** — use the concept on a small problem.

Not every unit needs all four rungs; use what the concept warrants.

### Recall

- 2-3 quick cards per unit. Visual prompts preferred ("click the node that rotates").
- Feeds a spaced-repetition queue (Leitner boxes, localStorage).
- Dashboard surfaces due reviews first.

## Feedback and no-hints policy

- **Wrong answers render.** A broken linked list draws with the dangling pointer visible. Wrong predict shows the actual next state.
- **Wrong answers explain.** Every failure gets a specific verbal explanation of what went wrong and why (e.g. "you reassigned head before saving next, so the rest of the list is unreachable"). Never a bare "incorrect."
- **No hint button. Ever.** After 2 failures on a rung, show a "Review" link that jumps to the exact Watch step teaching that idea. The user relearns and retries. This makes Watch content quality load-bearing.

## Architecture

- **Stack**: Next.js (App Router) + TypeScript + Tailwind. Client-heavy; no server logic, no auth, no DB.
- **Python execution**: Pyodide (WASM), lazy-loaded on first code rung, cached after (~10MB first load).
- **Persistence**: localStorage — unit completion, ladder progress, Leitner box state, streaks.
- **Content as data**: chapters/units are TypeScript objects (steps, captions, quiz banks, challenge specs with tests). Engines are code; content is data. Adding a chapter adds no components.

### Engines (reused across all 21 chapters)

1. **Step player** — renders step arrays `{state, highlight, caption}` emitted by per-algorithm step generators. Powers Watch and Predict.
2. **Structure renderer** — draws arrays, linked lists, trees, heaps, hash tables, graphs (SVG). Used by player, sandbox, and live code output.
3. **Code runner** — Pyodide harness: run user code, execute tests, extract resulting structure, hand to renderer, map exceptions/failures to verbal feedback.
4. **Recall scheduler** — Leitner spaced repetition; due-queue selection.

### Pages

- `/` — dashboard: due reviews first, phase/chapter progress, streak.
- `/learn/[chapter]/[unit]` — the Watch/Do/Recall loop.
- `/review` — spaced-repetition queue.

## Data model (sketch)

```ts
type Chapter = { id: string; phase: 1 | 2; title: string; units: Unit[] };
type Unit = {
  id: string;
  title: string;
  watch: Step[];              // captioned animation steps
  ladder: Rung[];             // predict | fillin | write | apply
  recall: Card[];
};
type Step = { state: StructState; highlight?: NodeRef[]; caption: string };
type Rung =
  | { kind: "predict"; pauseAt: number; options: PredictOption[]; explainWrong: Record<string,string>; reviewStep: number }
  | { kind: "fillin"; code: string; blanks: Blank[]; tests: Test[]; reviewStep: number }
  | { kind: "write" | "apply"; prompt: string; starter: string; tests: Test[]; render?: StructKind; reviewStep: number };
```

Every rung carries `reviewStep` — the Watch step its Review link targets — and wrong-answer explanations.

## Visual design

- Modern, dark, minimal. Big canvas, small chrome. Progress streaks.
- Design skills (impeccable / taste-skill) invoked during UI build; this is a hard requirement, not polish-later.

## Build approach

- Sonnet subagents perform implementation work; main thread orchestrates and reviews.
- Order: scaffold + engines + Phase 1 units 1-3 first (user starts learning immediately), then remaining Phase 1, then Phase 2 in batches.

## Testing

- Unit tests: step generators (algorithm correctness), Leitner scheduler, code-runner feedback mapping.
- No UI test suite; manual verification of rendering per chapter batch.

## Out of scope

- Auth, accounts, cloud sync, deployment (runs on localhost).
- Mobile layout (desktop-first; usable, not optimized).
- Non-Python languages.
