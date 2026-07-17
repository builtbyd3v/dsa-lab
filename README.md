# DSA Lab

An interactive Python data-structures-and-algorithms lab I built to pass WGU's C949 (Data Structures and Algorithms I). Every chapter is a ladder: watch an animated walkthrough, predict the next state, fill in a blank, then write the whole thing from scratch. 18 chapters cover Python foundations through trees, graphs, heaps, and hashing. It's entirely client-side: Python runs in the browser through Pyodide, there's no backend and no accounts, and everything persists in localStorage.

**Live:** https://dsa-lab-delta.vercel.app

## Features

- LeetCode-style problems (difficulty, examples, constraints) that run and test real Python in the browser
- CodeMirror editor with a syntax theme, Ctrl/Cmd-Enter to run, and per-problem draft persistence
- Step-by-step animated visualizations of the underlying data structure as it changes
- A Big-O quiz after every solve
- Solution reveal after three failed runs, with a forced blank re-solve queued for later
- Gauntlet mode: random re-solves of previously passed problems from a blank editor
- Timed 30-question mock exam with a per-chapter score breakdown and a review of missed questions
- Spaced-repetition flashcard review using a Leitner system
- Progress, streaks, and weak-topic indicators, all stored in localStorage: no accounts, no sync

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- CodeMirror 6 (`@uiw/react-codemirror` + `@codemirror/lang-python`)
- Pyodide (Python runtime compiled to WebAssembly, loaded from a CDN at runtime)
- Vitest + Testing Library

## Getting started

Requires Node >= 22.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

```bash
npm test          # run the test suite (vitest)
npm run typecheck # tsc --noEmit
```

## Content layout

Each chapter lives in `lib/content/ch-*.ts` as a `Chapter` made of `Unit`s. A unit has a `watch` sequence (animated steps), a `ladder` of rungs (`predict` → `fillin` → `write`/`apply`), and a `recall` deck of flashcards. This ladder structure, from passive observation to unaided recall, is the whole point of the app.

## Why

I built this to pass C949, then kept extending it as general NeetCode-style interview prep. The retention mechanics (spacing, interleaving, forced recall from a blank editor) aren't polish on top of the content; they're the reason the app exists. Reading about a data structure once isn't the same as being able to rebuild it cold a week later, and this is my attempt to close that gap.
