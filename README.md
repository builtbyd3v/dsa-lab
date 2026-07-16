# DSA Lab

Learn data structures and algorithms visually. Watch each concept animate step by step, then build it yourself in Python, right in the browser.

**Live:** https://dsa-lab-delta.vercel.app

## How it works

Every concept is a Watch / Do / Recall loop:

- **Watch**: a captioned step animation (no walls of text)
- **Do**: predict outcomes, fill in code blanks, write full Python functions. Your code runs in-browser (Pyodide) and your resulting structure is drawn live. Wrong answers get a specific explanation, never a bare "incorrect". No hints: after two misses you get a Review link back to the exact step that teaches the idea.
- **Recall**: quick cards feeding a Leitner spaced-repetition queue

Progress, streaks, and review scheduling live in your browser's localStorage. No account.

## Curriculum

Phase 1: Python foundations (variables, control flow, functions and the call stack, with lists/dicts, classes, recursion coming next). Phase 2: DSA (lists through B-trees, graphs, algorithm analysis).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # vitest
npm run typecheck
```

Requires Node 22+.

## Stack

Next.js (App Router) + TypeScript + Tailwind, client-only. Python runs via Pyodide from CDN. Content is TypeScript data in `lib/content/`; engines (step player, SVG renderer, code runner, spaced repetition) are reused by every chapter.
