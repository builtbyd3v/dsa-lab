import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: branching — if/elif/else forks the path; only the first True branch runs.
// ---------------------------------------------------------------------------

const branchingUnit: Unit = {
  id: "branching",
  title: "If/Elif/Else Is a Fork",
  watch: [
    {
      state: {
        nodes: [{ id: "score", label: "82", tag: "score", x: 1, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`score = 82` creates the value every condition below will test.",
    },
    {
      state: {
        nodes: [
          { id: "score", label: "82", tag: "score", x: 1, y: 1, shape: "box" },
          { id: "c1", label: "score >= 90?", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "score", to: "c1", emphasis: "active" }],
      },
      caption: "`if score >= 90` is the first condition Python checks.",
    },
    {
      state: {
        nodes: [
          { id: "score", label: "82", tag: "score", x: 1, y: 1, shape: "box" },
          { id: "c1", label: "score >= 90?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "score >= 80?", x: 5, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [
          { from: "score", to: "c1" },
          { from: "c1", to: "c2", label: "False", emphasis: "active" },
        ],
      },
      caption: "`82 >= 90` is False, so the elif's `score >= 80` check runs next.",
    },
    {
      state: {
        nodes: [
          { id: "score", label: "82", tag: "score", x: 1, y: 1, shape: "box" },
          { id: "c1", label: "score >= 90?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "score >= 80?", x: 5, y: 1, shape: "frame", emphasis: "active" },
          { id: "branchB", label: "B", tag: "grade", x: 7, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "score", to: "c1" },
          { from: "c1", to: "c2" },
          { from: "c2", to: "branchB", label: "True", emphasis: "active" },
        ],
      },
      caption: "`82 >= 80` is True, so this branch runs and assigns `grade` the value `B`.",
    },
    {
      state: {
        nodes: [
          { id: "score", label: "82", tag: "score", x: 1, y: 1, shape: "box" },
          { id: "c1", label: "score >= 90?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "score >= 80?", x: 5, y: 1, shape: "frame", emphasis: "dim" },
          { id: "branchB", label: "B", tag: "grade", x: 7, y: 1, shape: "box", emphasis: "dim" },
          { id: "c3", label: "score >= 70?", x: 9, y: 1, shape: "frame", emphasis: "dim" },
        ],
        arrows: [
          { from: "score", to: "c1" },
          { from: "c1", to: "c2" },
          { from: "c2", to: "branchB" },
          { from: "c2", to: "c3" },
        ],
      },
      caption: "Python never even checks `score >= 70`, even though `82` also satisfies it, because once a branch matches, every later `elif` and `else` is skipped.",
    },
    {
      state: {
        nodes: [
          { id: "score", label: "82", tag: "score", x: 1, y: 1, shape: "box" },
          { id: "c1", label: "score >= 90?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "score >= 80?", x: 5, y: 1, shape: "frame", emphasis: "dim" },
          { id: "branchB", label: "B", tag: "grade", x: 7, y: 1, shape: "box", emphasis: "dim" },
          { id: "c3", label: "score >= 70?", x: 9, y: 1, shape: "frame", emphasis: "dim" },
          { id: "c4", label: "else", x: 11, y: 1, shape: "frame", emphasis: "dim" },
        ],
        arrows: [
          { from: "score", to: "c1" },
          { from: "c1", to: "c2" },
          { from: "c2", to: "branchB" },
          { from: "c2", to: "c3" },
          { from: "c3", to: "c4" },
        ],
      },
      caption: "The `else` at the very bottom is skipped the same way; it would only run if nothing above it had matched.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "`temp = 65\nif temp > 90:\n    print(\"scorching\")\nelif temp > 80:\n    print(\"hot\")\nelif temp > 60:\n    print(\"warm\")\nelse:\n    print(\"cool\")`\nWhich line prints?",
      steps: [
        {
          state: {
            nodes: [{ id: "temp", label: "65", tag: "temp", x: 1, y: 1, shape: "box", emphasis: "new" }],
            arrows: [],
          },
          caption: "`temp = 65` will be tested against each condition in order.",
        },
      ],
      options: [
        { id: "a", label: "`scorching`" },
        { id: "b", label: "`hot`" },
        { id: "c", label: "`warm`" },
        { id: "d", label: "`cool`" },
      ],
      correctId: "c",
      explainWrong: {
        a: "`65` is not above `90`, so this branch's condition is False and its print never runs.",
        b: "`65` is not above `80` either; Python already moves past this `elif` before reaching a condition that's actually True.",
        d: "`cool` only prints when every condition above it is False, but `65 > 60` is True, so the `warm` branch runs before Python ever reaches `else`.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "temp", label: "65", tag: "temp", x: 1, y: 1, shape: "box" },
            { id: "cond", label: "temp > 60?", x: 3, y: 1, shape: "frame", emphasis: "active" },
            { id: "out", label: '"warm"', x: 5, y: 1, shape: "box", emphasis: "new" },
          ],
          arrows: [
            { from: "temp", to: "cond", emphasis: "active" },
            { from: "cond", to: "out", emphasis: "active" },
          ],
        },
        caption: "`65 > 60` is True, and since the earlier conditions were False, this is the first branch that runs.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the comparison so temperatures above `60` (but not above `90`) get labeled `\"warm\"`.",
      code: [
        'temp = 72',
        'if temp > 90:',
        '    label = "hot"',
        'elif temp {{op}} 60:',
        '    label = "warm"',
        'else:',
        '    label = "cool"',
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: ">",
          explainWrong:
            "`elif` needs `temp > 60` here. A different comparison would either mislabel `60` itself or fail to draw the line between `warm` and `cool` in the right place.",
        },
      ],
      tests: [
        {
          name: "label is warm",
          code: "assert label == \"warm\", \"label should be 'warm': 72 is above 60 but not above 90, so it matches the elif branch\"",
        },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Given an integer `score`, return the letter grade as a string: `\"A\"` for `score >= 90`, `\"B\"` for `score >= 80`, `\"C\"` for `score >= 70`, and `\"F\"` otherwise.",
      difficulty: "Easy",
      examples: [
        { input: "`score = 95`", output: "`\"A\"`", explanation: "`95` is at least `90`." },
        { input: "`score = 82`", output: "`\"B\"`", explanation: "`82` is below `90` but at least `80`." },
        { input: "`score = 50`", output: "`\"F\"`", explanation: "`50` doesn't reach any of the earlier cutoffs." },
      ],
      constraints: ["`0 <= score <= 100`", "Cutoffs are inclusive: `score = 90` counts as `\"A\"`, `score = 80` counts as `\"B\"`"],
      bigO: { answer: "O(1)", explain: "`letter_grade` checks a fixed handful of `if`/`elif` conditions regardless of `score`'s value." },
      solution:
        "def letter_grade(score):\n    if score >= 90:\n        return \"A\"\n    elif score >= 80:\n        return \"B\"\n    elif score >= 70:\n        return \"C\"\n    else:\n        return \"F\"\n",
      starter: "def letter_grade(score):\n    # your code here\n    pass\n",
      tests: [
        { name: "95 is A", code: "assert letter_grade(95) == \"A\", \"letter_grade(95) should be 'A': 95 >= 90\"" },
        { name: "90 is A (boundary)", code: "assert letter_grade(90) == \"A\", \"letter_grade(90) should be 'A': the cutoff is inclusive, so exactly 90 counts\"" },
        { name: "82 is B", code: "assert letter_grade(82) == \"B\", \"letter_grade(82) should be 'B': 82 is below 90 but at least 80\"" },
        { name: "80 is B (boundary)", code: "assert letter_grade(80) == \"B\", \"letter_grade(80) should be 'B': the cutoff is inclusive, so exactly 80 counts\"" },
        { name: "71 is C", code: "assert letter_grade(71) == \"C\", \"letter_grade(71) should be 'C': 71 is below 80 but at least 70\"" },
        { name: "50 is F", code: "assert letter_grade(50) == \"F\", \"letter_grade(50) should be 'F': 50 doesn't reach any of the earlier cutoffs\"" },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "py-flow.branching.1",
      prompt: "If multiple `elif` conditions would each be True, how many of their branches run?",
      options: [
        "All of them, in order",
        "Only the first one whose condition is True",
        "None, because `elif` always defers to `else`",
      ],
      correctIndex: 1,
      explainWrong:
        "`elif` chains stop at the first True condition. Every later `elif` and any `else` are skipped, no matter how many of them would also have been True.",
    },
    {
      id: "py-flow.branching.2",
      prompt: "In an `if`/`elif`/`else` chain, when does the `else` branch run?",
      options: [
        "Whenever any condition changes",
        "Only when every condition above it was False",
        "Every time, in addition to whichever branch matched",
      ],
      correctIndex: 1,
      explainWrong:
        "`else` carries no condition of its own. It's a catch-all that only executes when every `if` and `elif` above it evaluated to False.",
    },
    {
      id: "py-flow.branching.3",
      prompt:
        "`score = 90` with `if score >= 90: ...` then `elif score >= 90: ...` (the same condition twice). Which branch runs?",
      options: [
        "Both, since both conditions are True",
        "Only the `if` branch; the `elif` is never even checked",
        "Only the `elif` branch, since it comes second",
      ],
      correctIndex: 1,
      explainWrong:
        "Once the `if` branch's condition is True, Python runs it and skips the rest of the chain. It never even evaluates the `elif`'s condition to notice it was also True.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: while — a ticking pointer: check condition, run body, check again.
// ---------------------------------------------------------------------------

const whileUnit: Unit = {
  id: "while",
  title: "While Is a Ticking Pointer",
  watch: [
    {
      state: {
        nodes: [{ id: "n", label: "3", tag: "n", x: 1, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`n = 3` begins the countdown, before the loop has checked anything yet.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "3", tag: "n", x: 1, y: 1, shape: "box" },
          { id: "cond", label: "n > 0?", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "n", to: "cond", emphasis: "active" }],
      },
      caption: "`while n > 0:` checks the condition first. `3 > 0` is True, so the body runs.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "2", tag: "n", x: 1, y: 1, shape: "box", emphasis: "active" },
          { id: "cond", label: "n > 0?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
        ],
        arrows: [{ from: "n", to: "cond" }],
      },
      caption: "The body runs once, and `n -= 1` changes that same box from `3` to `2`.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "2", tag: "n", x: 1, y: 1, shape: "box" },
          { id: "cond", label: "n > 0?", x: 3, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [{ from: "n", to: "cond", label: "loop back", emphasis: "active" }],
      },
      caption: "Python re-checks the condition before every pass. `2 > 0` is still True, so the loop continues.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "1", tag: "n", x: 1, y: 1, shape: "box", emphasis: "active" },
          { id: "cond", label: "n > 0?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
        ],
        arrows: [{ from: "n", to: "cond" }],
      },
      caption: "The body runs again, dropping `n` from `2` to `1` in that very same box.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "1", tag: "n", x: 1, y: 1, shape: "box" },
          { id: "cond", label: "n > 0?", x: 3, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [{ from: "n", to: "cond", label: "loop back", emphasis: "active" }],
      },
      caption: "`1 > 0` is still True, so the loop fires one more time.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "0", tag: "n", x: 1, y: 1, shape: "box", emphasis: "active" },
          { id: "cond", label: "n > 0?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
        ],
        arrows: [{ from: "n", to: "cond" }],
      },
      caption: "`n -= 1` changes the box to `0`.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "0", tag: "n", x: 1, y: 1, shape: "box" },
          { id: "cond", label: "n > 0?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
        ],
        arrows: [{ from: "n", to: "cond" }],
      },
      caption: "`0 > 0` is False, so the check fails and the loop ends without running the body again.",
    },
    {
      state: {
        nodes: [
          { id: "n2", label: "3", tag: "n", x: 1, y: 4, shape: "box" },
          { id: "cond2", label: "n > 0?", x: 3, y: 4, shape: "frame", emphasis: "error" },
          { id: "danger", label: "never becomes False", x: 5, y: 4, shape: "frame", emphasis: "error" },
        ],
        arrows: [
          { from: "n2", to: "cond2", emphasis: "error" },
          { from: "cond2", to: "danger", emphasis: "error" },
        ],
      },
      caption: "If the body never changes `n`, `n > 0` stays True forever: an infinite loop that freezes the program.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "`n = 5\nwhile n > 2:\n    n -= 1`\nHow many times does the loop body run?",
      steps: [
        {
          state: {
            nodes: [{ id: "n", label: "5", tag: "n", x: 1, y: 1, shape: "box", emphasis: "new" }],
            arrows: [],
          },
          caption: "`n = 5`, and the loop keeps going as long as `n > 2`.",
        },
      ],
      options: [
        { id: "a", label: "`2`" },
        { id: "b", label: "`3`" },
        { id: "c", label: "`5`" },
      ],
      correctId: "b",
      explainWrong: {
        a: "`2` is how far `n` drops in total (`5` down to `2`), not the number of times the body executes.",
        c: "`5` is `n`'s starting value, not a count of iterations. The loop stops as soon as `n` reaches `2`, well before it could reach `0`.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "n", label: "2", tag: "n", x: 1, y: 1, shape: "box" },
            { id: "cond", label: "n > 2?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
          ],
          arrows: [{ from: "n", to: "cond" }],
        },
        caption: "`n` goes `5, 4, 3, 2`: three passes through the body, then the check finally fails at `2 > 2`.",
      },
      reviewStep: 7,
    },
    {
      kind: "fillin",
      prompt: "Fill in the condition so the loop keeps counting up until `count` reaches `5`.",
      code: ["count = 0", "while count {{op}} 5:", "    count += 1"].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "<",
          explainWrong:
            "The loop needs to keep running while `count` is still less than `5`. Any other comparison would either stop it immediately or let it run forever.",
        },
      ],
      tests: [
        {
          name: "count reaches 5",
          code: "assert count == 5, \"count should be 5: the loop must keep incrementing while count is less than 5, stopping the moment it reaches 5\"",
        },
      ],
      reviewStep: 1,
    },
    {
      kind: "write",
      prompt:
        "Given a positive integer `n`, return a list counting down from `n` to `1` inclusive, built using a `while` loop.",
      difficulty: "Easy",
      examples: [
        { input: "`n = 3`", output: "`[3, 2, 1]`" },
        { input: "`n = 1`", output: "`[1]`", explanation: "The loop still runs once when `n` starts at `1`." },
      ],
      constraints: ["`1 <= n <= 10^4`", "Use a `while` loop, not a `for` loop"],
      bigO: { answer: "O(n)", explain: "`countdown_list` runs its `while` loop once per number from `n` down to `1`." },
      solution:
        "def countdown_list(n):\n    result = []\n    while n > 0:\n        result.append(n)\n        n -= 1\n    return result\n",
      starter: "def countdown_list(n):\n    # your code here\n    pass\n",
      tests: [
        {
          name: "countdown_list(3) is [3, 2, 1]",
          code: "assert countdown_list(3) == [3, 2, 1], \"countdown_list(3) should be [3, 2, 1]: collect n, then keep subtracting 1 while n > 0\"",
        },
        {
          name: "countdown_list(1) is [1]",
          code: "assert countdown_list(1) == [1], \"countdown_list(1) should be [1]: the loop still runs once when n starts at 1\"",
        },
        {
          name: "countdown_list(5) has the right length and order",
          code:
            "result = countdown_list(5)\nassert len(result) == 5, \"countdown_list(5) should have 5 items: one for each number from 5 down to 1\"\nassert result[0] == 5 and result[-1] == 1, \"countdown_list(5) should start at 5 and end at 1, in that order\"",
        },
      ],
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "py-flow.while.1",
      prompt: "A `while` loop's condition is already False before the loop starts. How many times does the body run?",
      options: [
        "Once, to check the condition first",
        "Zero times; the condition is checked before every pass, including the first",
        "It depends on what's inside the body",
      ],
      correctIndex: 1,
      explainWrong:
        "`while` checks its condition before each pass, including the very first one. If it's False from the start, the body never runs at all.",
    },
    {
      id: "py-flow.while.2",
      prompt: "What actually causes an infinite loop in a `while` statement?",
      options: [
        "Using `>=` instead of `>`",
        "The condition never becoming False because nothing inside the loop changes the value it depends on",
        "Forgetting a colon after the condition",
      ],
      correctIndex: 1,
      explainWrong:
        "A missing colon is a syntax error, not an infinite loop, and the choice of `>=` versus `>` alone doesn't cause one either. An infinite loop happens when the body never updates the variable the condition depends on, so the condition stays True forever.",
    },
    {
      id: "py-flow.while.3",
      prompt: "Where should code that updates the loop's condition variable (like `n -= 1`) usually go?",
      options: [
        "Before the while statement, once",
        "Somewhere inside the loop body, so it runs every pass",
        "It doesn't matter; Python updates it automatically",
      ],
      correctIndex: 1,
      explainWrong:
        "Python never updates loop variables automatically. The update has to live inside the body and run on every pass, or the condition will never change and the loop runs forever.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: for-range — a pointer walking items left to right.
// ---------------------------------------------------------------------------

const forRangeUnit: Unit = {
  id: "for-range",
  title: "For Walks Items Left to Right",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "2", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "n1", label: "3", x: 4, y: 1, shape: "circle", emphasis: "new" },
          { id: "n2", label: "5", x: 6, y: 1, shape: "circle", emphasis: "new" },
          { id: "total", label: "0", tag: "total", x: 0, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`primes = [2, 3, 5]` and `total = 0` sit ready before the loop starts.",
    },
    {
      state: {
        nodes: [
          { id: "p", label: "p", tag: "variable", x: 0, y: 1, shape: "box", emphasis: "new" },
          { id: "n0", label: "2", x: 2, y: 1, shape: "circle", emphasis: "active" },
          { id: "n1", label: "3", x: 4, y: 1, shape: "circle" },
          { id: "n2", label: "5", x: 6, y: 1, shape: "circle" },
          { id: "total", label: "0", tag: "total", x: 0, y: 3, shape: "box" },
        ],
        arrows: [{ from: "p", to: "n0", emphasis: "active" }],
      },
      caption: "`for p in primes` binds `p` to the first item; `p` now points at `2`.",
    },
    {
      state: {
        nodes: [
          { id: "p", label: "p", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "2", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 4, y: 1, shape: "circle" },
          { id: "n2", label: "5", x: 6, y: 1, shape: "circle" },
          { id: "total", label: "2", tag: "total", x: 0, y: 3, shape: "box", emphasis: "active" },
        ],
        arrows: [{ from: "p", to: "n0" }],
      },
      caption: "`total += p` adds `2`. Once used, that item dims to show the loop has moved past it.",
    },
    {
      state: {
        nodes: [
          { id: "p", label: "p", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "2", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 4, y: 1, shape: "circle", emphasis: "active" },
          { id: "n2", label: "5", x: 6, y: 1, shape: "circle" },
          { id: "total", label: "2", tag: "total", x: 0, y: 3, shape: "box" },
        ],
        arrows: [{ from: "p", to: "n1", emphasis: "active" }],
      },
      caption: "The loop's next pass rebinds `p` to the second item, `3`.",
    },
    {
      state: {
        nodes: [
          { id: "p", label: "p", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "2", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 4, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "5", x: 6, y: 1, shape: "circle" },
          { id: "total", label: "5", tag: "total", x: 0, y: 3, shape: "box", emphasis: "active" },
        ],
        arrows: [{ from: "p", to: "n1" }],
      },
      caption: "`total` becomes `5`. Two items are consumed and dimmed; one is left to visit.",
    },
    {
      state: {
        nodes: [
          { id: "p", label: "p", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "2", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 4, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "5", x: 6, y: 1, shape: "circle", emphasis: "active" },
          { id: "total", label: "5", tag: "total", x: 0, y: 3, shape: "box" },
        ],
        arrows: [{ from: "p", to: "n2", emphasis: "active" }],
      },
      caption: "`p` now points at the last item, `5`.",
    },
    {
      state: {
        nodes: [
          { id: "p", label: "p", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "2", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 4, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "5", x: 6, y: 1, shape: "circle", emphasis: "dim" },
          { id: "total", label: "10", tag: "total", x: 0, y: 3, shape: "box", emphasis: "active" },
        ],
        arrows: [{ from: "p", to: "n2" }],
      },
      caption: "`total` ends at `10` once every item has been visited and consumed.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "`nums = [4, 1, 3]\ntotal = 0\nfor n in nums:\n    total += n`\nWhat is `total` after the loop finishes?",
      steps: [
        {
          state: {
            nodes: [
              { id: "n0", label: "4", x: 2, y: 1, shape: "circle", emphasis: "new" },
              { id: "n1", label: "1", x: 4, y: 1, shape: "circle", emphasis: "new" },
              { id: "n2", label: "3", x: 6, y: 1, shape: "circle", emphasis: "new" },
              { id: "total", label: "0", tag: "total", x: 0, y: 3, shape: "box", emphasis: "new" },
            ],
            arrows: [],
          },
          caption: "Every item in `nums` gets added into `total`, one at a time.",
        },
      ],
      options: [
        { id: "a", label: "`8`" },
        { id: "b", label: "`4`" },
        { id: "c", label: "`3`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "`4` is only the first item `nums` visits, not the running sum after all three have been added.",
        c: "`3` is the last item added, but `total` keeps every item added before it too, not just the final one.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "n0", label: "4", x: 2, y: 1, shape: "circle", emphasis: "dim" },
            { id: "n1", label: "1", x: 4, y: 1, shape: "circle", emphasis: "dim" },
            { id: "n2", label: "3", x: 6, y: 1, shape: "circle", emphasis: "dim" },
            { id: "total", label: "8", tag: "total", x: 0, y: 3, shape: "box", emphasis: "active" },
          ],
          arrows: [],
        },
        caption: "`total` ends at `8`: `4 + 1 + 3`, with every item consumed along the way.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in the range so the loop adds every whole number from `1` through `4` into `total`.",
      code: ["total = 0", "for i in range({{start}}, {{stop}}):", "    total += i"].join("\n"),
      blanks: [
        {
          id: "start",
          placeholder: "___",
          answer: "1",
          explainWrong: "`range`'s first argument is where counting begins. Starting at `0` would add an extra `0` into `total` that shouldn't be there.",
        },
        {
          id: "stop",
          placeholder: "___",
          answer: "5",
          explainWrong: "`range`'s second argument is exclusive, so reaching `4` requires stopping at `5`, not `4`.",
        },
      ],
      tests: [
        { name: "total is 10", code: "assert total == 10, \"total should be 10: 1 + 2 + 3 + 4\"" },
      ],
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt: "Given a list of integers `nums`, return the sum of only the even numbers in `nums`, using a `for` loop.",
      difficulty: "Easy",
      examples: [
        { input: "`nums = [1, 2, 3, 4]`", output: "`6`", explanation: "Only `2` and `4` are even." },
        { input: "`nums = [1, 3, 5]`", output: "`0`", explanation: "None of these numbers are even." },
      ],
      constraints: ["`0 <= len(nums) <= 10^4`", "`nums` may contain negative numbers"],
      bigO: { answer: "O(n)", explain: "`sum_of_evens` visits every element of `nums` once in its `for` loop." },
      solution:
        "def sum_of_evens(nums):\n    total = 0\n    for n in nums:\n        if n % 2 == 0:\n            total += n\n    return total\n",
      starter: "def sum_of_evens(nums):\n    total = 0\n    # your code here\n    return total\n",
      tests: [
        {
          name: "mixed list sums only evens",
          code: "assert sum_of_evens([1, 2, 3, 4]) == 6, \"sum_of_evens([1, 2, 3, 4]) should be 6: only 2 and 4 are even\"",
        },
        {
          name: "no evens gives 0",
          code: "assert sum_of_evens([1, 3, 5]) == 0, \"sum_of_evens([1, 3, 5]) should be 0: none of these numbers are even\"",
        },
        {
          name: "all evens sums everything",
          code: "assert sum_of_evens([2, 4, 6]) == 12, \"sum_of_evens([2, 4, 6]) should be 12: every number here is even\"",
        },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "py-flow.for-range.1",
      prompt: "`range(1, 5)` produces which numbers?",
      options: ["`1, 2, 3, 4`", "`1, 2, 3, 4, 5`", "`0, 1, 2, 3, 4`"],
      correctIndex: 0,
      explainWrong: "`range`'s stop value is exclusive: `range(1, 5)` counts from `1` up to but not including `5`, giving `1, 2, 3, 4`.",
    },
    {
      id: "py-flow.for-range.2",
      prompt: "`for p in primes:` iterates over `primes`. What does `p` hold on each pass?",
      options: [
        "The index of the current item, like `0, 1, 2`",
        "The current item's value itself, not an index",
        "The entire `primes` list every time",
      ],
      correctIndex: 1,
      explainWrong:
        "Looping directly over a list hands you each value in turn, not a position number. You'd need something like `enumerate(primes)` to also get an index.",
    },
    {
      id: "py-flow.for-range.3",
      prompt: "`total = 0; for n in nums: total += n`. What does this pattern build up?",
      options: [
        "A running sum across every item in `nums`",
        "Just the value of the last item in `nums`",
        "A new list containing every item doubled",
      ],
      correctIndex: 0,
      explainWrong:
        "Each pass adds one more item into `total` using `+=`, so by the time the loop finishes `total` holds the sum of everything, not just the final item, and no new list is built.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-flow — combine branching and looping in one problem.
// ---------------------------------------------------------------------------

const applyFlowUnit: Unit = {
  id: "apply-flow",
  title: "Apply: Ping Pong",
  watch: [
    {
      state: {
        nodes: [
          { id: "n", label: "3", tag: "n", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "cond15", label: "n % 15 == 0?", x: 3, y: 1, shape: "frame", emphasis: "dim" },
          { id: "cond3", label: "n % 3 == 0?", x: 5, y: 1, shape: "frame", emphasis: "active" },
          { id: "output", label: '"ping"', x: 7, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "n", to: "cond15" },
          { from: "cond15", to: "cond3", emphasis: "active" },
          { from: "cond3", to: "output", emphasis: "active" },
        ],
      },
      caption: "`n = 3`: `n % 15` isn't `0`, but `n % 3` is, so the ping branch runs.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "15", tag: "n", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "cond15", label: "n % 15 == 0?", x: 3, y: 1, shape: "frame", emphasis: "active" },
          { id: "output", label: '"pingpong"', x: 7, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "n", to: "cond15", emphasis: "active" },
          { from: "cond15", to: "output", emphasis: "active" },
        ],
      },
      caption: "`n = 15`: checking the combined condition first catches multiples of both `3` and `5`, printing `pingpong` before `ping` or `pong` get a chance.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given an integer `n`, return `\"pingpong\"` if `n` is divisible by both `3` and `5`, `\"ping\"` if divisible by only `3`, `\"pong\"` if divisible by only `5`, and `n` itself otherwise. The combined divisible-by-`15` case must be checked first, so multiples of `15` never fall into the `ping` or `pong` branches by mistake.",
      difficulty: "Medium",
      examples: [
        { input: "`n = 9`", output: "`\"ping\"`", explanation: "`9` is divisible by `3` but not by `5`." },
        { input: "`n = 15`", output: "`\"pingpong\"`", explanation: "`15` is divisible by both `3` and `5`, so the combined check must win over the single checks." },
      ],
      constraints: ["`1 <= n <= 10^4`", "Check `n % 15 == 0` before checking `n % 3 == 0` or `n % 5 == 0`"],
      bigO: { answer: "O(1)", explain: "`ping_pong` checks a fixed set of `%` conditions regardless of `n`'s size." },
      solution:
        "def ping_pong(n):\n    if n % 15 == 0:\n        return \"pingpong\"\n    elif n % 3 == 0:\n        return \"ping\"\n    elif n % 5 == 0:\n        return \"pong\"\n    else:\n        return n\n",
      starter: "def ping_pong(n):\n    # your code here\n    pass\n",
      tests: [
        {
          name: "divisible by 3 only gives ping",
          code: "assert ping_pong(9) == \"ping\", \"ping_pong(9) should be 'ping': 9 is divisible by 3 but not by 5\"",
        },
        {
          name: "divisible by 5 only gives pong",
          code: "assert ping_pong(10) == \"pong\", \"ping_pong(10) should be 'pong': 10 is divisible by 5 but not by 3\"",
        },
        {
          name: "divisible by both gives pingpong",
          code: "assert ping_pong(15) == \"pingpong\", \"ping_pong(15) should be 'pingpong': the combined check must run before the single checks\"",
        },
        {
          name: "neither gives the number itself",
          code: "assert ping_pong(4) == 4, \"ping_pong(4) should be 4: it isn't divisible by 3 or 5, so it falls through every branch\"",
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-flow.apply-flow.1",
      prompt: "Why must the `n % 15 == 0` check come before the `n % 3 == 0` and `n % 5 == 0` checks?",
      options: [
        "It doesn't matter what order they're in",
        "Because `elif` stops at the first True condition, a number divisible by both would get caught by the `n % 3` check first if it came earlier, and never reach the combined check",
        "Because Python evaluates conditions in reverse order",
      ],
      correctIndex: 1,
      explainWrong:
        "Order matters precisely because `elif` stops at the first match. If the `n % 3` check came first, `15` would satisfy it and print `ping`, never reaching the `n % 15` check meant to catch it.",
    },
    {
      id: "py-flow.apply-flow.2",
      prompt: "What should `ping_pong(9)` return?",
      options: [
        "`\"ping\"`, since `9` is divisible by `3` but not `5`",
        "`\"pingpong\"`, since `9` is divisible by `3`",
        "`9`, since `9` isn't divisible by `15`",
      ],
      correctIndex: 0,
      explainWrong:
        "`9` is divisible by `3` (`9 = 3 * 3`) but not by `5`, so it belongs in the `ping` branch specifically, not the combined `pingpong` branch or the fallback number case.",
    },
  ],
};

export const chFlow: Chapter = {
  id: "py-flow",
  phase: 1,
  title: "Branching and Loops",
  units: [branchingUnit, whileUnit, forRangeUnit, applyFlowUnit],
};
