import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: base-case — every recursive function needs a condition that stops
// it from calling itself again; without one, frames stack forever.
// ---------------------------------------------------------------------------

const baseCaseUnit: Unit = {
  id: "base-case",
  title: "The Base Case Stops the Stack",
  watch: [
    {
      state: {
        nodes: [{ id: "c3", label: "countdown(3)", tag: "n = 3", x: 2, y: 4, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "Calling countdown(3) pushes its frame onto the stack. n starts at 3, which is not the base case yet.",
    },
    {
      state: {
        nodes: [
          { id: "c3", label: "countdown(3)", tag: "n = 3, printed 3", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "countdown(2)", tag: "n = 2", x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "c3", to: "c2", emphasis: "active" }],
      },
      caption: "countdown(3) prints 3, then calls countdown(2), pushing a new frame on top.",
    },
    {
      state: {
        nodes: [
          { id: "c3", label: "countdown(3)", tag: "n = 3", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "countdown(2)", tag: "n = 2, printed 2", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "c1", label: "countdown(1)", tag: "n = 1", x: 2, y: 2, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "c2", to: "c1", emphasis: "active" }],
      },
      caption: "countdown(2) prints 2, then calls countdown(1); the stack is now three frames deep.",
    },
    {
      state: {
        nodes: [
          { id: "c3", label: "countdown(3)", tag: "n = 3", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "countdown(2)", tag: "n = 2", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "c1", label: "countdown(1)", tag: "n = 1, printed 1", x: 2, y: 2, shape: "frame", emphasis: "dim" },
          { id: "c0", label: "countdown(0)", tag: "n = 0", x: 2, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "c1", to: "c0", emphasis: "active" }],
      },
      caption: "countdown(1) prints 1, then calls countdown(0), the frame that will finally hit the base case.",
    },
    {
      state: {
        nodes: [
          { id: "c3", label: "countdown(3)", tag: "n = 3", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "countdown(2)", tag: "n = 2", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "c1", label: "countdown(1)", tag: "n = 1", x: 2, y: 2, shape: "frame", emphasis: "dim" },
          { id: "c0", label: "countdown(0)", tag: 'n = 0, base case! prints "liftoff!"', x: 2, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: 'n == 0 is the base case: countdown(0) prints "liftoff!" and returns without calling itself again.',
    },
    {
      state: {
        nodes: [
          { id: "c3", label: "countdown(3)", tag: "n = 3", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "countdown(2)", tag: "n = 2", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "c1", label: "countdown(1)", tag: "n = 1, nothing left after the call, returns", x: 2, y: 2, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "countdown(0)'s frame pops off the stack immediately. countdown(1) resumes, but has nothing left to do, so it returns too.",
    },
    {
      state: {
        nodes: [
          { id: "c3", label: "countdown(3)", tag: "n = 3", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "c2", label: "countdown(2)", tag: "n = 2, nothing left after the call, returns", x: 2, y: 3, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "countdown(1)'s frame pops next. countdown(2) resumes, finds nothing left to do either, and returns.",
    },
    {
      state: {
        nodes: [
          { id: "c3", label: "countdown(3)", tag: "n = 3, nothing left after the call, returns", x: 2, y: 4, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "countdown(2)'s frame pops. countdown(3) resumes, returns too, and the call stack empties completely.",
    },
    {
      state: {
        nodes: [
          { id: "b3", label: "countdown_bad(3)", tag: "n = 3", x: 2, y: 4, shape: "frame", emphasis: "error" },
          { id: "b2", label: "countdown_bad(2)", tag: "n = 2", x: 2, y: 3, shape: "frame", emphasis: "error" },
          { id: "b1", label: "countdown_bad(1)", tag: "n = 1", x: 2, y: 2, shape: "frame", emphasis: "error" },
          { id: "b0", label: "countdown_bad(0)", tag: "n = 0, keeps going!", x: 2, y: 1, shape: "frame", emphasis: "error" },
          { id: "bneg", label: "countdown_bad(-1)", tag: "n = -1 ...", x: 2, y: 0, shape: "frame", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: "countdown_bad has no base case, so it never stops calling itself: the stack keeps growing past 0 into negative numbers until Python raises a RecursionError.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        'def countdown(n):\n    if n == 0:\n        print("liftoff!")\n    else:\n        print(n)\n        countdown(n - 1)\n\ncountdown(2)\nWhat gets printed, in order?',
      steps: [
        {
          state: { nodes: [{ id: "c2", label: "countdown(2)", tag: "n = 2", x: 2, y: 1, shape: "frame", emphasis: "new" }], arrows: [] },
          caption: "`countdown(2)` is called, pushing the first frame.",
        },
      ],
      options: [
        { id: "a", label: "`2, 1, liftoff!`" },
        { id: "b", label: "`liftoff!, 1, 2`" },
        { id: "c", label: "`2, 1, 0`" },
        { id: "d", label: "`2, 1`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "The order is reversed: each frame prints `n` before making its recursive call, so the prints happen `2`, then `1`, then `liftoff!`, not the other way around.",
        c: "The base case prints `\"liftoff!\"`, not the number `0`; `n` never gets printed once it reaches `0`, the else branch is skipped entirely at that point.",
        d: "This misses the base case's own print statement: `countdown(0)` still runs its `if` branch and prints `\"liftoff!\"` before returning.",
      },
      revealStep: {
        state: { nodes: [{ id: "printed", label: '"2, 1, liftoff!"', tag: "printed", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
        caption: '`countdown(2)` prints `2`, then `1`, then hits the base case and prints `"liftoff!"`.',
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing base case so `list_length` stops recursing once the list runs out of elements.",
      code: ["def list_length(items):", "    if len(items) == {{base}}:", "        return 0", "    return 1 + list_length(items[1:])"].join("\n"),
      blanks: [
        {
          id: "base",
          placeholder: "___",
          answer: "0",
          explainWrong:
            "`list_length` needs to recognize the empty list as its base case: once `len(items) == 0`, there's nothing left to count, so it should return `0` directly instead of recursing on an ever-shrinking list forever.",
        },
      ],
      tests: [
        { name: "list_length([]) is 0", code: "assert list_length([]) == 0, \"list_length([]) should be 0: the empty list is the base case\"" },
        { name: "list_length([1, 2, 3]) is 3", code: "assert list_length([1, 2, 3]) == 3, \"list_length([1, 2, 3]) should be 3: one plus the length of the rest, all the way down to the empty-list base case\"" },
      ],
      reviewStep: 4,
    },
    {
      kind: "write",
      prompt:
        "Given an integer `n`, return the sum of all integers from `1` to `n`. Use recursion with a base case of `n == 0` returning `0`.",
      difficulty: "Easy",
      examples: [
        { input: "n = 3", output: "6", explanation: "`3 + 2 + 1 + 0`." },
        { input: "n = 0", output: "0", explanation: "The base case: nothing left to add." },
      ],
      constraints: ["`0 <= n <= 10^3`", "`n` is always a non-negative integer"],
      bigO: { answer: "O(n)", explain: "Recurses once for each integer from `n` down to `0`, doing one addition per call." },
      starter: "def sum_up_to(n):\n    # base case: n == 0\n    # otherwise: n + sum_up_to(n - 1)\n    pass\n",
      solution: "def sum_up_to(n):\n    if n == 0:\n        return 0\n    return n + sum_up_to(n - 1)\n",
      tests: [
        { name: "sum_up_to(0) is 0 (base case)", code: "assert sum_up_to(0) == 0, \"sum_up_to(0) should be 0: this is the base case, nothing left to add\"" },
        { name: "sum_up_to(3) is 6", code: "assert sum_up_to(3) == 6, \"sum_up_to(3) should be 6: 3 + 2 + 1 + 0\"" },
        { name: "sum_up_to(1) is 1", code: "assert sum_up_to(1) == 1, \"sum_up_to(1) should be 1: 1 + sum_up_to(0), and sum_up_to(0) is 0\"" },
      ],
      reviewStep: 8,
    },
  ],
  recall: [
    {
      id: "py-recursion.base-case.1",
      prompt: "What is a base case in a recursive function?",
      options: [
        "The condition where the function stops calling itself and returns directly",
        "The very first call to the function",
        "Any line of code that uses a return statement",
      ],
      correctIndex: 0,
      explainWrong:
        "A base case is specifically the stopping condition: the point where the function answers directly instead of recursing further. It isn't just any return, and it isn't about which call happens first.",
    },
    {
      id: "py-recursion.base-case.2",
      prompt: "What happens if a recursive function has no base case at all?",
      options: [
        "It keeps calling itself forever, in practice until Python raises a `RecursionError` from exceeding the call stack limit",
        "Python automatically stops it after one call",
        "It simply returns None the first time it runs",
      ],
      correctIndex: 0,
      explainWrong:
        "Python doesn't guess a stopping point on its own. Without a base case, the function keeps pushing new frames until the call stack's limit is hit and a RecursionError is raised.",
    },
    {
      id: "py-recursion.base-case.3",
      prompt: "In `countdown(3)`, which frame is the first to pop off the stack?",
      options: [
        "`countdown(0)`, the base case frame, since it returns without making another call",
        "`countdown(3)`, since it was pushed first",
        "They all pop at the same time once the whole chain finishes",
      ],
      correctIndex: 0,
      explainWrong:
        "The stack is last-in-first-out: the most recently pushed frame is the first to pop. `countdown(3)` was pushed first and stays at the bottom until everything above it, ending with the base case, has returned.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: recursive-math — the stack builds down to the base case, then the
// actual multiplication happens on the way back up, as each frame resumes.
// ---------------------------------------------------------------------------

const recursiveMathUnit: Unit = {
  id: "recursive-math",
  title: "Building Down, Multiplying Back Up",
  watch: [
    {
      state: {
        nodes: [{ id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "factorial(4) is called. n = 4 is not the base case, so it will call factorial(3) before it can compute anything.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "f3", label: "factorial(3)", tag: "n = 3", x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "f4", to: "f3", emphasis: "active" }],
      },
      caption: "factorial(4) calls factorial(3), and waits: it can't multiply anything until that call returns a value.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "f3", label: "factorial(3)", tag: "n = 3", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "f2", label: "factorial(2)", tag: "n = 2", x: 2, y: 2, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "f3", to: "f2", emphasis: "active" }],
      },
      caption: "factorial(3) calls factorial(2) for the same reason: it needs that answer before it can multiply by 3.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "f3", label: "factorial(3)", tag: "n = 3", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "f2", label: "factorial(2)", tag: "n = 2", x: 2, y: 2, shape: "frame", emphasis: "dim" },
          { id: "f1", label: "factorial(1)", tag: "n = 1", x: 2, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "f2", to: "f1", emphasis: "active" }],
      },
      caption: "factorial(2) calls factorial(1). Four frames are now stacked, and none of them have multiplied anything yet.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "f3", label: "factorial(3)", tag: "n = 3", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "f2", label: "factorial(2)", tag: "n = 2", x: 2, y: 2, shape: "frame", emphasis: "dim" },
          { id: "f1", label: "factorial(1)", tag: "n = 1", x: 2, y: 1, shape: "frame", emphasis: "dim" },
          { id: "f0", label: "factorial(0)", tag: "n = 0, base case, returns 1", x: 2, y: 0, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "factorial(0) finally hits the base case and returns 1, the multiplicative identity, without multiplying anything at all.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "f3", label: "factorial(3)", tag: "n = 3", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "f2", label: "factorial(2)", tag: "n = 2", x: 2, y: 2, shape: "frame", emphasis: "dim" },
          { id: "f1", label: "factorial(1)", tag: "n = 1, computing 1 * 1 = 1", x: 2, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "factorial(0)'s frame pops. factorial(1) resumes and multiplies 1 * 1, its own n times what it got back, returning 1.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "f3", label: "factorial(3)", tag: "n = 3", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "f2", label: "factorial(2)", tag: "n = 2, computing 2 * 1 = 2", x: 2, y: 2, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "factorial(1)'s frame pops. factorial(2) resumes and multiplies 2 * 1, returning 2.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "factorial(4)", tag: "n = 4", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "f3", label: "factorial(3)", tag: "n = 3, computing 3 * 2 = 6", x: 2, y: 3, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "factorial(2)'s frame pops. factorial(3) resumes and multiplies 3 * 2, returning 6.",
    },
    {
      state: {
        nodes: [{ id: "result", label: "24", tag: "factorial(4) = 4 * 6", x: 2, y: 4, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "factorial(3)'s frame pops. factorial(4) resumes, multiplies 4 * 6, and returns the final answer, 24.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nfactorial(3)\nWhich multiplication happens LAST, right before factorial(3) finally returns its answer?",
      steps: [
        {
          state: { nodes: [{ id: "f3", label: "factorial(3)", tag: "n = 3", x: 2, y: 1, shape: "frame", emphasis: "new" }], arrows: [] },
          caption: "`factorial(3)` is called and immediately needs `factorial(2)`'s result first.",
        },
      ],
      options: [
        { id: "a", label: "`3 * 2`" },
        { id: "b", label: "`1 * 1`" },
        { id: "c", label: "They all happen at once, before any calls return" },
        { id: "d", label: "`0 * 1`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "That's the FIRST multiplication to happen, not the last: it's the deepest frame, so it resumes and multiplies before any of the frames above it can.",
        c: "Recursion doesn't compute everything upfront on the way down; each frame is paused waiting on its recursive call, and the multiplications only happen as those calls return, one at a time.",
        d: "`factorial(0)` is the base case: it returns `1` directly without multiplying anything at all.",
      },
      revealStep: {
        state: { nodes: [{ id: "result", label: "6", tag: "factorial(3) = 3 * 2", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
        caption: "`factorial(3)`'s own multiplication, `3 * 2`, is the last one to happen, since its frame is the last to resume.",
      },
      reviewStep: 8,
    },
    {
      kind: "fillin",
      prompt: "Fill in the base case's return value so `factorial` doesn't collapse every result to `0`.",
      code: ["def factorial(n):", "    if n == 0:", "        return {{base}}", "    return n * factorial(n - 1)"].join("\n"),
      blanks: [
        {
          id: "base",
          placeholder: "___",
          answer: "1",
          explainWrong:
            "If `factorial(0)` returned `0` instead of `1`, every `factorial` would collapse to `0`, since that `0` gets multiplied into the chain somewhere up the stack; the base case has to return `1`, the multiplicative identity, so it leaves every multiplication above it unchanged.",
        },
      ],
      tests: [
        { name: "factorial(0) is 1", code: "assert factorial(0) == 1, \"factorial(0) should be 1: the base case\"" },
        { name: "factorial(4) is 24", code: "assert factorial(4) == 24, \"factorial(4) should be 24: 4 * 3 * 2 * 1 * 1\"" },
      ],
      reviewStep: 4,
    },
    {
      kind: "write",
      prompt:
        "Given `base` and a non-negative integer `exp`, return `base` raised to the power `exp`. Use recursion with a base case of `exp == 0` returning `1`.",
      difficulty: "Easy",
      examples: [
        { input: "base = 2, exp = 3", output: "8", explanation: "`2 * 2 * 2`." },
        { input: "base = 5, exp = 0", output: "1", explanation: "The base case: any number to the 0th power is `1`." },
      ],
      constraints: ["`0 <= exp <= 20`", "`base` is an integer"],
      bigO: { answer: "O(n)", explain: "Recurses `exp` times, doing one multiplication by `base` per call." },
      starter: "def power(base, exp):\n    # base case: exp == 0\n    # otherwise: base * power(base, exp - 1)\n    pass\n",
      solution: "def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n",
      tests: [
        { name: "power(2, 3) is 8", code: "assert power(2, 3) == 8, \"power(2, 3) should be 8: 2 * 2 * 2\"" },
        { name: "power(5, 0) is 1 (base case)", code: "assert power(5, 0) == 1, \"power(5, 0) should be 1: the base case, any number to the 0th power\"" },
        { name: "power(1, 10) is 1", code: "assert power(1, 10) == 1, \"power(1, 10) should be 1: 1 multiplied by itself any number of times is still 1\"" },
      ],
      reviewStep: 8,
    },
  ],
  recall: [
    {
      id: "py-recursion.recursive-math.1",
      prompt: "In `factorial(n) = n * factorial(n - 1)`, when does the multiplication actually happen: on the way down building the stack, or on the way back up as frames return?",
      options: [
        "On the way back up: each frame is paused waiting on its recursive call before it can multiply",
        "On the way down: each frame multiplies immediately before calling `factorial(n - 1)`",
        "Both: it multiplies once going down and again coming back up",
      ],
      correctIndex: 0,
      explainWrong:
        "Each frame reaches `n * factorial(n - 1)` and has to pause there until the recursive call actually returns a value; the multiplication can't happen until then, so it happens as the frame resumes, on the way back up.",
    },
    {
      id: "py-recursion.recursive-math.2",
      prompt: "Why must `factorial`'s base case return `1`, and not `0`?",
      options: [
        "Because `1` is the multiplicative identity; returning `0` would zero out every result up the whole chain",
        "Because Python requires base cases to return `1`",
        "It doesn't matter, either value works fine",
      ],
      correctIndex: 0,
      explainWrong:
        "This is purely about the math, not a Python rule: since every frame above the base case multiplies its own `n` by what the base case (eventually) returned, a `0` there would multiply every single result down to `0`.",
    },
    {
      id: "py-recursion.recursive-math.3",
      prompt: "How many frames are on the stack at the deepest point of `factorial(4)`?",
      options: [
        "5: `factorial(4)`, `factorial(3)`, `factorial(2)`, `factorial(1)`, and `factorial(0)`",
        "4, one for each multiplication",
        "1, since only the base case frame does any real work",
      ],
      correctIndex: 0,
      explainWrong:
        "Every call from `factorial(4)` down through the base case `factorial(0)` pushes its own frame, and all of them are still on the stack, paused, at the moment the base case is reached: that's 5 frames total.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: recursion-on-sequences — a list breaks into a head and a rest; a
// string can be peeled apart the same way to build up a reversed copy.
// ---------------------------------------------------------------------------

const recursionOnSequencesUnit: Unit = {
  id: "recursion-on-sequences",
  title: "Head and Rest",
  watch: [
    {
      state: {
        nodes: [{ id: "s1", label: "sum_list([2, 4, 6])", tag: "head = 2, rest = [4, 6]", x: 2, y: 4, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "sum_list([2, 4, 6]) splits the list into its head, 2, and the rest, [4, 6], then calls itself on the rest.",
    },
    {
      state: {
        nodes: [
          { id: "s1", label: "sum_list([2, 4, 6])", tag: "head = 2, rest = [4, 6]", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "s2", label: "sum_list([4, 6])", tag: "head = 4, rest = [6]", x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "s1", to: "s2", emphasis: "active" }],
      },
      caption: "sum_list([4, 6]) does the same split: head 4, rest [6], and calls itself again on the rest.",
    },
    {
      state: {
        nodes: [
          { id: "s1", label: "sum_list([2, 4, 6])", tag: "head = 2, rest = [4, 6]", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "s2", label: "sum_list([4, 6])", tag: "head = 4, rest = [6]", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "s3", label: "sum_list([6])", tag: "head = 6, rest = []", x: 2, y: 2, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "s2", to: "s3", emphasis: "active" }],
      },
      caption: "sum_list([6]) splits into head 6 and rest [], an empty list.",
    },
    {
      state: {
        nodes: [
          { id: "s1", label: "sum_list([2, 4, 6])", tag: "head = 2, rest = [4, 6]", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "s2", label: "sum_list([4, 6])", tag: "head = 4, rest = [6]", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "s3", label: "sum_list([6])", tag: "head = 6, rest = []", x: 2, y: 2, shape: "frame", emphasis: "dim" },
          { id: "s0", label: "sum_list([])", tag: "empty list, base case, returns 0", x: 2, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "sum_list([]) hits the base case: an empty list has no head to add, so it returns 0 directly.",
    },
    {
      state: {
        nodes: [
          { id: "s1", label: "sum_list([2, 4, 6])", tag: "head = 2, rest = [4, 6]", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "s2", label: "sum_list([4, 6])", tag: "head = 4, rest = [6]", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "s3", label: "sum_list([6])", tag: "computing 6 + 0 = 6", x: 2, y: 2, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "sum_list([]) returns 0. sum_list([6]) resumes, adds its head, 6, to that 0, and returns 6.",
    },
    {
      state: {
        nodes: [
          { id: "s1", label: "sum_list([2, 4, 6])", tag: "head = 2, rest = [4, 6]", x: 2, y: 4, shape: "frame", emphasis: "dim" },
          { id: "s2", label: "sum_list([4, 6])", tag: "computing 4 + 6 = 10", x: 2, y: 3, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "sum_list([6]) returns 6. sum_list([4, 6]) resumes, adds its head, 4, and returns 10.",
    },
    {
      state: {
        nodes: [{ id: "result", label: "12", tag: "sum_list([2, 4, 6]) = 2 + 10", x: 2, y: 4, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "sum_list([4, 6]) returns 10. sum_list([2, 4, 6]) resumes, adds its head, 2, and returns the final answer, 12.",
    },
    {
      state: {
        nodes: [{ id: "r1", label: 'reverse_string("cat")', tag: 'saves "c", calls reverse_string("at")', x: 2, y: 4, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: 'A string can be split the same way: reverse_string("cat") saves its first character, "c", then recurses on the rest, "at".',
    },
    {
      state: {
        nodes: [{ id: "r2", label: '"tac"', tag: 'reverse_string("") = "" is the base case; each saved character gets appended on the way back up', x: 2, y: 4, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: 'The recursion bottoms out at the empty string, then each saved character is appended on the way back up, building "tac".',
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "def sum_list(items):\n    if items == []:\n        return 0\n    return items[0] + sum_list(items[1:])\n\nsum_list([1, 2, 3])\nWhat does this return?",
      steps: [
        {
          state: { nodes: [{ id: "s1", label: "sum_list([1, 2, 3])", tag: "head = 1, rest = [2, 3]", x: 2, y: 1, shape: "frame", emphasis: "new" }], arrows: [] },
          caption: "`sum_list([1, 2, 3])` splits into head `1` and rest `[2, 3]`.",
        },
      ],
      options: [
        { id: "a", label: "`6`" },
        { id: "b", label: "`0`" },
        { id: "c", label: "`3`" },
        { id: "d", label: "`1`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "`0` is only what the base case returns for the empty list; `sum_list` adds every head back on top of that as the recursion unwinds, so the final result is much more than just `0`.",
        c: "This only counts the last head added, `items[0]` at the final recursive call, and ignores that every earlier head, `1` and `2`, also gets added in.",
        d: "This only counts the very first head, `1`, and stops, ignoring the `+ sum_list(items[1:])` part that keeps adding the rest of the list.",
      },
      revealStep: {
        state: { nodes: [{ id: "result", label: "6", tag: "sum_list([1, 2, 3]) = 1 + 2 + 3", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
        caption: "Each head, `1`, `2`, and `3`, gets added in as the calls unwind, for a total of `6`.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in the base case so `sum_list` stops recursing once the list is empty.",
      code: ["def sum_list(items):", "    if items == {{base}}:", "        return 0", "    return items[0] + sum_list(items[1:])"].join("\n"),
      blanks: [
        {
          id: "base",
          placeholder: "___",
          answer: "[]",
          explainWrong:
            "The base case for this kind of list recursion is the empty list: once `items` has nothing left in it, `items[0]` would raise an `IndexError`, so the function must return `0` directly instead of trying to recurse further.",
        },
      ],
      tests: [
        { name: "sum_list([]) is 0", code: "assert sum_list([]) == 0, \"sum_list([]) should be 0: the empty list is the base case\"" },
        { name: "sum_list([5, 10]) is 15", code: "assert sum_list([5, 10]) == 15, \"sum_list([5, 10]) should be 15: 5 + 10\"" },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Given a non-negative integer `n`, return a list counting down from `n` to `1`. Use recursion with a base case of `n == 0` returning an empty list `[]`.",
      difficulty: "Easy",
      examples: [
        { input: "n = 3", output: "[3, 2, 1]" },
        { input: "n = 0", output: "[]", explanation: "The base case: nothing left to count down." },
      ],
      constraints: ["`0 <= n <= 10^3`"],
      bigO: { answer: "O(n)", explain: "Recurses once for each integer from `n` down to `0`, building one list element per call." },
      hidden:
        "def _viz(name, xs):\n    nodes = [{\"id\": f\"n{i}\", \"label\": repr(v), \"x\": i, \"y\": 0} for i, v in enumerate(xs)]\n    nodes.insert(0, {\"id\": \"var\", \"label\": name, \"x\": 0, \"y\": 1, \"shape\": \"box\", \"tag\": \"variable\"})\n    arrows = [{\"from\": \"var\", \"to\": \"n0\"}] + [{\"from\": f\"n{i}\", \"to\": f\"n{i+1}\"} for i in range(len(xs) - 1)]\n    return {\"nodes\": nodes, \"arrows\": arrows}",
      starter: "def build_countdown_list(n):\n    # base case: n == 0 returns an empty list\n    # otherwise: n followed by build_countdown_list(n - 1)\n    pass\n",
      solution: "def build_countdown_list(n):\n    if n == 0:\n        return []\n    return [n] + build_countdown_list(n - 1)\n",
      tests: [
        { name: "build_countdown_list(0) is [] (base case)", code: "assert build_countdown_list(0) == [], \"build_countdown_list(0) should be []: the base case, nothing left to count down\"" },
        { name: "build_countdown_list(3) is [3, 2, 1]", code: "assert build_countdown_list(3) == [3, 2, 1], \"build_countdown_list(3) should be [3, 2, 1]: each call puts n in front of the list built by build_countdown_list(n - 1)\"" },
        { name: "build_countdown_list(1) is [1]", code: "assert build_countdown_list(1) == [1], \"build_countdown_list(1) should be [1]: one call away from the empty-list base case\"" },
      ],
      vizExpr: '_viz("countdown", build_countdown_list(4))',
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "py-recursion.recursion-on-sequences.1",
      prompt: "In `sum_list`, why does the base case check `items == []`?",
      options: [
        "Because an empty list has no head to add, so returning `0` there stops the recursion where there's nothing left to sum",
        "Because Python requires all list recursion to check for `[]`",
        "Because `[]` is the only value equal to `0`",
      ],
      correctIndex: 0,
      explainWrong:
        "The empty list is chosen because it's exactly where the pattern of \"head plus the rest\" runs out: there's no `items[0]` left to grab, so the function has to stop and return `0` instead of indexing into nothing.",
    },
    {
      id: "py-recursion.recursion-on-sequences.2",
      prompt: "`sum_list([1, 2, 3])` splits the list into `items[0]` and `items[1:]`. What are these two pieces usually called?",
      options: [
        "The head and the rest (or head and tail)",
        "The base and the case",
        "The frame and the pointer",
      ],
      correctIndex: 0,
      explainWrong:
        "\"Base case\" and \"frame\" describe other parts of recursion. The specific terms for a sequence's first element and everything after it are the head and the rest.",
    },
    {
      id: "py-recursion.recursion-on-sequences.3",
      prompt: '`reverse_string(s) = reverse_string(s[1:]) + s[0]`. Which character of the original string ends up at the very end of the reversed result?',
      options: [
        "The first character, since its frame is the last to return and its saved character is appended last",
        "The last character, since it's processed by the base case",
        "Whichever character happens to be in the middle of the string",
      ],
      correctIndex: 0,
      explainWrong:
        "The base case just returns the empty string; it doesn't determine ordering by itself. It's the OUTERMOST call, the one holding the original first character, that resumes and appends last, placing that character at the very end.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-recursion — fibonacci needs two base cases and two recursive
// calls, since it depends on two smaller answers, not just one.
// ---------------------------------------------------------------------------

const applyRecursionUnit: Unit = {
  id: "apply-recursion",
  title: "Apply: Fibonacci Needs Two Base Cases",
  watch: [
    {
      state: {
        nodes: [
          { id: "f3", label: "fibonacci(3)", tag: "needs fibonacci(2) and fibonacci(1)", x: 3, y: 1, shape: "frame", emphasis: "new" },
          { id: "f2", label: "fibonacci(2)", tag: "n - 1", x: 1, y: 3, shape: "frame", emphasis: "new" },
          { id: "f1", label: "fibonacci(1)", tag: "n - 2", x: 5, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [
          { from: "f3", to: "f2", emphasis: "active" },
          { from: "f3", to: "f1", emphasis: "active" },
        ],
      },
      caption: "fibonacci isn't single-recursive like factorial: it needs two smaller answers, fibonacci(2) and fibonacci(1), so it makes two recursive calls, not one.",
    },
    {
      state: {
        nodes: [
          { id: "f1a", label: "fibonacci(1)", tag: "base case, returns 1", x: 1, y: 3, shape: "frame", emphasis: "active" },
          { id: "f0", label: "fibonacci(0)", tag: "base case, returns 0", x: 3, y: 3, shape: "frame", emphasis: "active" },
          { id: "result", label: "fibonacci(2) = 1", tag: "fibonacci(1) + fibonacci(0)", x: 2, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "f1a", to: "result", emphasis: "active" },
          { from: "f0", to: "result", emphasis: "active" },
        ],
      },
      caption: "fibonacci needs two base cases, fibonacci(0) = 0 and fibonacci(1) = 1; every other call adds two smaller results together until it reaches one of them.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given a non-negative integer `n`, return the `n`th Fibonacci number, computed recursively. `fibonacci(0)` returns `0`, `fibonacci(1)` returns `1`, and otherwise `fibonacci(n)` returns `fibonacci(n - 1) + fibonacci(n - 2)`.",
      difficulty: "Medium",
      examples: [
        { input: "n = 5", output: "5", explanation: "Sequence: `0, 1, 1, 2, 3, 5`." },
        { input: "n = 0", output: "0", explanation: "The first base case." },
      ],
      constraints: ["`0 <= n <= 30`"],
      bigO: { answer: "O(n²)", explain: "Each call branches into two more recursive calls, so the naive call tree grows explosively with `n`; among the offered options, `O(n²)` is closest to that blowup." },
      starter: "def fibonacci(n):\n    # two base cases: n == 0 and n == 1\n    # otherwise: fibonacci(n - 1) + fibonacci(n - 2)\n    pass\n",
      solution: "def fibonacci(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n",
      tests: [
        { name: "fibonacci(0) is 0 (base case)", code: "assert fibonacci(0) == 0, \"fibonacci(0) should be 0: this is one of the two base cases, not something to compute recursively\"" },
        { name: "fibonacci(1) is 1 (base case)", code: "assert fibonacci(1) == 1, \"fibonacci(1) should be 1: this is the second base case; without it, fibonacci would never stop recursing\"" },
        { name: "fibonacci(5) is 5", code: "assert fibonacci(5) == 5, \"fibonacci(5) should be 5: the sequence goes 0, 1, 1, 2, 3, 5, each number the sum of the two before it\"" },
        { name: "fibonacci(7) is 13", code: "assert fibonacci(7) == 13, \"fibonacci(7) should be 13: continuing the sequence 0, 1, 1, 2, 3, 5, 8, 13\"" },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-recursion.apply-recursion.1",
      prompt: "Why does `fibonacci` need two base cases instead of one?",
      options: [
        "Because `fibonacci(n)` depends on two smaller results, `fibonacci(n - 1)` and `fibonacci(n - 2)`, so recursion needs to bottom out at both `fibonacci(0)` and `fibonacci(1)`",
        "Because Python requires every function to have at least two base cases",
        "Because `fibonacci(0)` and `fibonacci(1)` are the two most commonly called values",
      ],
      correctIndex: 0,
      explainWrong:
        "This is about `fibonacci`'s own math, not a Python rule or a popularity contest: since each call branches into two smaller calls, one base case would leave the other branch, the `n - 2` side, with no way to stop.",
    },
    {
      id: "py-recursion.apply-recursion.2",
      prompt: "If `fibonacci` only had a base case for `n == 0`, what would go wrong calling `fibonacci(1)`?",
      options: [
        "`fibonacci(1)` would call `fibonacci(0) + fibonacci(-1)`, and `fibonacci(-1)` would keep recursing on ever more negative numbers, never hitting `0`",
        "`fibonacci(1)` would just return `0` instead of `1`",
        "Nothing; the missing base case only matters for larger n",
      ],
      correctIndex: 0,
      explainWrong:
        "Without `n == 1` as a base case, `fibonacci(1)` would recurse into `fibonacci(0)` and `fibonacci(-1)`; the second branch keeps subtracting `1` from an already-negative number and will never equal `0`, so it never stops.",
    },
    {
      id: "py-recursion.apply-recursion.3",
      prompt: "How is `fibonacci`'s recursion different from `factorial`'s?",
      options: [
        "`fibonacci` makes two recursive calls per call, branching, while `factorial` makes only one, forming a single stack line",
        "fibonacci and factorial recurse in exactly the same way",
        "fibonacci doesn't use a call stack at all",
      ],
      correctIndex: 0,
      explainWrong:
        "`factorial(n)` only ever calls `factorial(n - 1)` once, so its calls form one straight line on the stack. `fibonacci(n)` calls both `fibonacci(n - 1)` and `fibonacci(n - 2)`, so its calls branch into a tree instead, and it still uses the call stack just like any other recursive function.",
    },
  ],
};

export const chRecursion: Chapter = {
  id: "py-recursion",
  phase: 1,
  title: "Recursion",
  units: [baseCaseUnit, recursiveMathUnit, recursionOnSequencesUnit, applyRecursionUnit],
};
