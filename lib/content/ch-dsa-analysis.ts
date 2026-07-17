import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: big-o — same task at growing n reveals how step counts scale.
// ---------------------------------------------------------------------------

const bigOUnit: Unit = {
  id: "big-o",
  title: "Big-O Is How Work Grows",
  watch: [
    {
      state: {
        nodes: [
          { id: "n8", label: "n = 8", x: 1, y: 1, shape: "frame", emphasis: "new" },
          { id: "s8", label: "1 step", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "arr[0]: reading one element by index takes exactly one step, no matter how big arr is.",
    },
    {
      state: {
        nodes: [
          { id: "n8", label: "n = 8", x: 1, y: 1, shape: "frame", emphasis: "dim" },
          { id: "s8", label: "1 step", x: 3, y: 1, shape: "box", emphasis: "dim" },
          { id: "n64", label: "n = 64", x: 1, y: 3, shape: "frame", emphasis: "new" },
          { id: "s64", label: "1 step", x: 3, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Grow the array to 64 elements and arr[0] still takes 1 step. That flat line is O(1), constant time.",
    },
    {
      state: {
        nodes: [
          { id: "n8b", label: "n = 8", x: 1, y: 1, shape: "frame", emphasis: "new" },
          { id: "h8a", label: "check mid", x: 3, y: 1, shape: "box", emphasis: "new" },
          { id: "h8b", label: "check mid", x: 5, y: 1, shape: "box", emphasis: "new" },
          { id: "h8c", label: "check mid", x: 7, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Binary search on 8 sorted elements halves the window each check: about 3 checks to finish.",
    },
    {
      state: {
        nodes: [
          { id: "n8b", label: "n = 8", x: 1, y: 1, shape: "frame", emphasis: "dim" },
          { id: "h8a", label: "check mid", x: 3, y: 1, shape: "box", emphasis: "dim" },
          { id: "h8b", label: "check mid", x: 5, y: 1, shape: "box", emphasis: "dim" },
          { id: "h8c", label: "check mid", x: 7, y: 1, shape: "box", emphasis: "dim" },
          { id: "n64b", label: "n = 64", x: 1, y: 3, shape: "frame", emphasis: "new" },
          { id: "h64a", label: "check mid", x: 3, y: 3, shape: "box", emphasis: "new" },
          { id: "h64b", label: "check mid", x: 4, y: 3, shape: "box", emphasis: "new" },
          { id: "h64c", label: "check mid", x: 5, y: 3, shape: "box", emphasis: "new" },
          { id: "h64d", label: "check mid", x: 6, y: 3, shape: "box", emphasis: "new" },
          { id: "h64e", label: "check mid", x: 7, y: 3, shape: "box", emphasis: "new" },
          { id: "h64f", label: "check mid", x: 8, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "At 64 elements, 8x the data, it only takes about 6 checks, not 8x as many. That is O(log n).",
    },
    {
      state: {
        nodes: [
          { id: "n8c", label: "n = 8", x: 1, y: 1, shape: "frame", emphasis: "new" },
          { id: "v0", label: "visit", x: 3, y: 1, shape: "circle", emphasis: "new" },
          { id: "v1", label: "visit", x: 4, y: 1, shape: "circle", emphasis: "new" },
          { id: "v2", label: "visit", x: 5, y: 1, shape: "circle", emphasis: "new" },
          { id: "v3", label: "visit", x: 6, y: 1, shape: "circle", emphasis: "new" },
          { id: "v4", label: "visit", x: 7, y: 1, shape: "circle", emphasis: "new" },
          { id: "v5", label: "visit", x: 8, y: 1, shape: "circle", emphasis: "new" },
          { id: "v6", label: "visit", x: 9, y: 1, shape: "circle", emphasis: "new" },
          { id: "v7", label: "visit", x: 10, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "A single loop over every element, like finding the max, visits all 8 items once: 8 steps.",
    },
    {
      state: {
        nodes: [
          { id: "n64c", label: "n = 64: 64 steps", x: 1, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "At 64 elements the same single loop takes 64 steps, growing exactly in step with n. That is O(n).",
    },
    {
      state: {
        nodes: [
          { id: "n8d", label: "n = 8", x: 1, y: 1, shape: "frame", emphasis: "new" },
          { id: "pair", label: "8 x 8 = 64 pairs checked", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "A nested loop comparing every pair, like a naive duplicate check, does 8 x 8 = 64 comparisons.",
    },
    {
      state: {
        nodes: [
          { id: "n64d", label: "n = 64: 64 x 64 = 4096 pairs checked", x: 1, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "At 64 elements that nested loop explodes to 4096 comparisons. Work grows with the square of n: O(n^2).",
    },
    {
      state: {
        nodes: [
          { id: "expr1", label: "3n + 5", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "expr2", label: "3n", x: 4, y: 1, shape: "box", emphasis: "active" },
          { id: "expr3", label: "n", x: 7, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "expr1", to: "expr2", label: "drop +5", emphasis: "active" },
          { from: "expr2", to: "expr3", label: "drop x3", emphasis: "active" },
        ],
      },
      caption: "Big-O drops constants and lower-order terms: 3n + 5 simplifies to O(n), because only the fastest-growing term matters at large n.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "def has_pair(arr):\n    for i in range(len(arr)):\n        for j in range(len(arr)):\n            if arr[i] + arr[j] == 0:\n                return True\n    return False\nWhat is the Big-O of this function?",
      steps: [
        {
          state: {
            nodes: [
              { id: "outer", label: "for i", x: 1, y: 1, shape: "frame", emphasis: "new" },
              { id: "inner", label: "for j", x: 3, y: 1, shape: "frame", emphasis: "new" },
            ],
            arrows: [{ from: "outer", to: "inner", label: "nested", emphasis: "active" }],
          },
          caption: "One loop runs inside another, and both range over the full length of `arr`.",
        },
      ],
      options: [
        { id: "a", label: "`O(n)`" },
        { id: "b", label: "`O(log n)`" },
        { id: "c", label: "`O(n^2)`" },
      ],
      correctId: "c",
      explainWrong: {
        a: "`O(n)` describes a single loop over the data. This function has a loop nested inside another loop, so its work grows faster than that.",
        b: "`O(log n)` comes from repeatedly cutting the problem in half, like binary search. Nothing here halves the search space; both loops scan the full array.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "outer", label: "for i (n times)", x: 1, y: 1, shape: "frame" },
            { id: "inner", label: "for j (n times)", x: 3, y: 1, shape: "frame", emphasis: "active" },
          ],
          arrows: [{ from: "outer", to: "inner", label: "n x n", emphasis: "active" }],
        },
        caption: "For each of the `n` outer passes, the inner loop runs `n` times too, giving `n x n = O(n^2)` total comparisons.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Simplify `O(3n + 5)` to its Big-O class by naming the single term that dominates as `n` grows.",
      code: [
        "# cost = 3n + 5",
        "# drop the constant +5 and the coefficient 3",
        "simplified = \"{{term}}\"",
      ].join("\n"),
      blanks: [
        {
          id: "term",
          placeholder: "___",
          answer: "O(n)",
          explainWrong:
            "Big-O keeps only the fastest-growing term and drops constants and coefficients. `3n + 5` has `n` as its only variable term, so it simplifies to `O(n)`, not `O(3n)` or `O(n + 5)`.",
        },
      ],
      tests: [
        {
          name: "simplified is O(n)",
          code: "assert simplified == \"O(n)\", \"simplified should be 'O(n)': constants like +5 and coefficients like x3 are dropped in Big-O\"",
        },
      ],
      reviewStep: 7,
    },
  ],
  recall: [
    {
      id: "dsa-analysis.big-o.1",
      prompt: "An algorithm's step count stays exactly the same whether `n` is 8 or 8 million. What is its Big-O?",
      options: ["`O(1)`", "`O(n)`", "`O(n^2)`"],
      correctIndex: 0,
      explainWrong: "`O(1)`, constant time, describes work that never depends on input size at all, like reading `arr[0]` by index.",
    },
    {
      id: "dsa-analysis.big-o.2",
      prompt: "Why does binary search on 64 elements take only about twice as many steps as on 8 elements, not eight times as many?",
      options: [
        "Because each check eliminates half of what remains, so doubling the data only adds one more check",
        "Because computers get faster automatically at larger sizes",
        "Because binary search skips checking most of the array randomly",
      ],
      correctIndex: 0,
      explainWrong: "Binary search halves the remaining window on every check. Each doubling of `n` only costs one extra halving step, which is exactly the `O(log n)` pattern, not randomness or hardware speed.",
    },
    {
      id: "dsa-analysis.big-o.3",
      prompt: "`O(3n + 5)` simplifies to which Big-O class?",
      options: ["`O(n)`", "`O(3n)`", "`O(n + 5)`"],
      correctIndex: 0,
      explainWrong: "Big-O analysis drops constant additions and multiplicative coefficients, keeping only the term that dominates as `n` grows large. That leaves just `O(n)`.",
    },
    {
      id: "dsa-analysis.big-o.4",
      prompt: "A nested loop where both loops run `n` times, like a naive pairwise comparison, has what Big-O?",
      options: ["`O(n)`", "`O(n^2)`", "`O(log n)`"],
      correctIndex: 1,
      explainWrong: "Each of the `n` outer passes triggers a full `n`-pass inner loop, multiplying to `n x n` total operations, which is `O(n^2)`, not a single pass through `n` or a halving pattern.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: binary-search — halve the window using lo/mid/hi on sorted data.
// ---------------------------------------------------------------------------

const binarySearchUnit: Unit = {
  id: "binary-search",
  title: "Binary Search Halves the Window",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "1", x: 1, y: 1, shape: "circle" },
          { id: "n1", label: "3", x: 2, y: 1, shape: "circle" },
          { id: "n2", label: "5", x: 3, y: 1, shape: "circle" },
          { id: "n3", label: "7", x: 4, y: 1, shape: "circle" },
          { id: "n4", label: "9", x: 5, y: 1, shape: "circle" },
          { id: "n5", label: "11", x: 6, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "arr = [1, 3, 5, 7, 9, 11] is sorted. We search for target = 9.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "1", x: 1, y: 1, shape: "circle" },
          { id: "n1", label: "3", x: 2, y: 1, shape: "circle" },
          { id: "n2", label: "5", x: 3, y: 1, shape: "circle", emphasis: "active" },
          { id: "n3", label: "7", x: 4, y: 1, shape: "circle" },
          { id: "n4", label: "9", x: 5, y: 1, shape: "circle" },
          { id: "n5", label: "11", x: 6, y: 1, shape: "circle" },
          { id: "lo", label: "lo", x: 1, y: 3, shape: "box" },
          { id: "mid", label: "mid", x: 3, y: 3, shape: "box", emphasis: "active" },
          { id: "hi", label: "hi", x: 6, y: 3, shape: "box" },
        ],
        arrows: [
          { from: "lo", to: "n0" },
          { from: "mid", to: "n2", emphasis: "active" },
          { from: "hi", to: "n5" },
        ],
      },
      caption: "lo=0, hi=5, mid=2 points at 5. Since 9 > 5, the entire left half, including mid, can be discarded.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "1", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "5", x: 3, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n3", label: "7", x: 4, y: 1, shape: "circle" },
          { id: "n4", label: "9", x: 5, y: 1, shape: "circle" },
          { id: "n5", label: "11", x: 6, y: 1, shape: "circle" },
          { id: "lo", label: "lo", x: 4, y: 3, shape: "box", emphasis: "active" },
          { id: "hi", label: "hi", x: 6, y: 3, shape: "box" },
        ],
        arrows: [
          { from: "lo", to: "n3", emphasis: "active" },
          { from: "hi", to: "n5" },
        ],
      },
      caption: "lo jumps to mid+1 = 3. The window shrinks to just [7, 9, 11], half of what it was.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "1", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "5", x: 3, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n3", label: "7", x: 4, y: 1, shape: "circle" },
          { id: "n4", label: "9", x: 5, y: 1, shape: "circle", emphasis: "active" },
          { id: "n5", label: "11", x: 6, y: 1, shape: "circle" },
          { id: "lo", label: "lo", x: 4, y: 3, shape: "box" },
          { id: "mid", label: "mid", x: 5, y: 3, shape: "box", emphasis: "active" },
          { id: "hi", label: "hi", x: 6, y: 3, shape: "box" },
        ],
        arrows: [
          { from: "lo", to: "n3" },
          { from: "mid", to: "n4", emphasis: "active" },
          { from: "hi", to: "n5" },
        ],
      },
      caption: "New mid = 4 points at 9. That matches target exactly.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "1", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "3", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "5", x: 3, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n3", label: "7", x: 4, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n4", label: "9", x: 5, y: 1, shape: "circle", emphasis: "new" },
          { id: "n5", label: "11", x: 6, y: 1, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "Found: index 4 holds 9. Binary search returns 4 after just two comparisons instead of scanning all six.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "2", x: 1, y: 1, shape: "circle" },
          { id: "m1", label: "4", x: 2, y: 1, shape: "circle" },
          { id: "m2", label: "6", x: 3, y: 1, shape: "circle", emphasis: "active" },
          { id: "m3", label: "8", x: 4, y: 1, shape: "circle" },
          { id: "m4", label: "10", x: 5, y: 1, shape: "circle" },
          { id: "midl", label: "mid", x: 3, y: 3, shape: "box", emphasis: "active" },
        ],
        arrows: [{ from: "midl", to: "m2", emphasis: "active" }],
      },
      caption: "Now search for target = 7 in [2, 4, 6, 8, 10]. mid = 2 points at 6; 7 > 6, so we move right.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "2", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "m1", label: "4", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "m2", label: "6", x: 3, y: 1, shape: "circle", emphasis: "dim" },
          { id: "m3", label: "8", x: 4, y: 1, shape: "circle", emphasis: "active" },
          { id: "m4", label: "10", x: 5, y: 1, shape: "circle" },
          { id: "lol", label: "lo", x: 4, y: 3, shape: "box" },
          { id: "hil", label: "hi", x: 4, y: 3, shape: "box" },
        ],
        arrows: [{ from: "lol", to: "m3" }],
      },
      caption: "lo and hi both land on index 3, holding 8. 7 != 8, and there is nowhere left to shrink.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "2", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "m1", label: "4", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "m2", label: "6", x: 3, y: 1, shape: "circle", emphasis: "dim" },
          { id: "m3", label: "8", x: 4, y: 1, shape: "circle", emphasis: "dim" },
          { id: "m4", label: "10", x: 5, y: 1, shape: "circle", emphasis: "dim" },
          { id: "miss", label: "not found: -1", x: 3, y: 3, shape: "frame", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: "Once lo passes hi, the window is empty. Binary search returns -1: 7 is not in this array.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "`arr = [2, 4, 6, 8, 10, 12, 14]`, `target = 4`. `lo=0, hi=6`, first `mid=3` (value `8`). Since `4 < 8`, the window shrinks to `lo=0, hi=2`. What is the next `mid` index?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a0", label: "2", x: 1, y: 1, shape: "circle" },
              { id: "a1", label: "4", x: 2, y: 1, shape: "circle" },
              { id: "a2", label: "6", x: 3, y: 1, shape: "circle" },
              { id: "lo", label: "lo", x: 1, y: 3, shape: "box" },
              { id: "hi", label: "hi", x: 3, y: 3, shape: "box" },
            ],
            arrows: [{ from: "lo", to: "a0" }, { from: "hi", to: "a2" }],
          },
          caption: "The window narrowed to `lo=0, hi=2`, which spans indices `0`, `1`, `2`.",
        },
      ],
      options: [
        { id: "a", label: "index 1" },
        { id: "b", label: "index 3" },
        { id: "c", label: "index 0" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Index 3 was the previous `mid`, already eliminated. The new window is `lo=0, hi=2`, and `mid` recomputes from that shrunk range.",
        c: "Index 0 is the new `lo`, not `mid`. `mid` is computed as `(lo + hi) // 2`, which sits between the two, not at the edge.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a0", label: "2", x: 1, y: 1, shape: "circle" },
            { id: "a1", label: "4", x: 2, y: 1, shape: "circle", emphasis: "active" },
            { id: "a2", label: "6", x: 3, y: 1, shape: "circle" },
          ],
          arrows: [],
        },
        caption: "`mid = (0 + 2) // 2 = 1`, pointing at value `4`, an exact match for `target`.",
      },
      reviewStep: 2,
    },
    {
      kind: "write",
      prompt:
        "Given a sorted list `arr` and a value `target`, return the index of `target` in `arr`, or `-1` if it is not present.",
      difficulty: "Medium",
      examples: [
        { input: "arr = [1, 3, 5, 7, 9, 11], target = 9", output: "4" },
        { input: "arr = [2, 4, 6, 8, 10], target = 7", output: "-1", explanation: "`7` does not appear in `arr`." },
      ],
      constraints: ["`arr` is sorted in ascending order", "`0 <= len(arr) <= 10^4`"],
      bigO: { answer: "O(log n)", explain: "Each step halves the `lo`/`hi` search window instead of scanning every element." },
      starter:
        "def binary_search(arr, target):\n    # your code here\n    pass\n",
      solution:
        "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n",
      tests: [
        {
          name: "finds a middle value",
          code: "assert binary_search([1, 3, 5, 7, 9, 11], 9) == 4, \"binary_search should return 4: index 4 holds 9 in this sorted list\"",
        },
        {
          name: "finds the first element",
          code: "assert binary_search([1, 3, 5, 7], 1) == 0, \"binary_search should return 0: 1 is the first element\"",
        },
        {
          name: "finds the last element",
          code: "assert binary_search([1, 3, 5, 7], 7) == 3, \"binary_search should return 3: 7 is the last element\"",
        },
        {
          name: "missing target returns -1",
          code: "assert binary_search([2, 4, 6, 8, 10], 7) == -1, \"binary_search should return -1: 7 does not appear in this sorted list, and the window must shrink to empty rather than loop forever\"",
        },
        {
          name: "empty list returns -1",
          code: "assert binary_search([], 5) == -1, \"binary_search should return -1: an empty list has no target to find\"",
        },
      ],
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "dsa-analysis.binary-search.1",
      prompt: "What must be true about `arr` before binary search can be used on it?",
      options: ["It must be sorted", "It must contain only integers", "It must have an even length"],
      correctIndex: 0,
      explainWrong: "Binary search relies on comparing `mid` to `target` to decide which half to discard. That logic only works if `arr` is sorted; type and length are irrelevant.",
    },
    {
      id: "dsa-analysis.binary-search.2",
      prompt: "After checking `mid` and finding `target` is greater than `arr[mid]`, what happens next?",
      options: [
        "`lo` moves to `mid + 1`, discarding `mid` and everything to its left",
        "`hi` moves to `mid - 1`, discarding `mid` and everything to its right",
        "The search restarts from index 0",
      ],
      correctIndex: 0,
      explainWrong: "If `target` is bigger than `arr[mid]`, it can only be to the right, so `lo` jumps past `mid` to `mid + 1`. Moving `hi` left or restarting would throw away the half that still might contain `target`, or waste the work already done.",
    },
    {
      id: "dsa-analysis.binary-search.3",
      prompt: "How does binary search signal that the `target` is not in the array?",
      options: [
        "It keeps looping forever",
        "The window becomes empty (`lo` passes `hi`) and it returns `-1`",
        "It returns the closest value instead",
      ],
      correctIndex: 1,
      explainWrong: "Each comparison shrinks the window by at least half. Once `lo` exceeds `hi` there is nothing left to check, and the function returns `-1` rather than looping forever or guessing a nearby value.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: basic-sorts — selection sort's gold prefix, insertion's shifting.
// ---------------------------------------------------------------------------

const basicSortsUnit: Unit = {
  id: "basic-sorts",
  title: "Selection and Insertion Sort",
  watch: [
    {
      state: {
        nodes: [
          { id: "s0", label: "5", x: 1, y: 1, shape: "circle" },
          { id: "s1", label: "2", x: 2, y: 1, shape: "circle" },
          { id: "s2", label: "8", x: 3, y: 1, shape: "circle" },
          { id: "s3", label: "1", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Selection sort on [5, 2, 8, 1]: scan the whole array to find the smallest value.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "5", x: 1, y: 1, shape: "circle" },
          { id: "s1", label: "2", x: 2, y: 1, shape: "circle", emphasis: "active" },
          { id: "s2", label: "8", x: 3, y: 1, shape: "circle" },
          { id: "s3", label: "1", x: 4, y: 1, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Comparing every value, 1 is the smallest found so far, beating the earlier candidate 2.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "1", x: 1, y: 1, shape: "circle", emphasis: "new" },
          { id: "s1", label: "2", x: 2, y: 1, shape: "circle" },
          { id: "s2", label: "8", x: 3, y: 1, shape: "circle" },
          { id: "s3", label: "5", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Swap the smallest (1) into position 0. Only that one slot is now guaranteed sorted, gold.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "1", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "s1", label: "2", x: 2, y: 1, shape: "circle", emphasis: "active" },
          { id: "s2", label: "8", x: 3, y: 1, shape: "circle", emphasis: "active" },
          { id: "s3", label: "5", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Second pass scans only the unsorted remainder [2, 8, 5]. 2 is already the smallest of what's left.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "1", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "s1", label: "2", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "s2", label: "8", x: 3, y: 1, shape: "circle" },
          { id: "s3", label: "5", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "No swap needed; 2 stays put and the gold prefix grows to [1, 2].",
    },
    {
      state: {
        nodes: [
          { id: "i0", label: "3", x: 1, y: 4, shape: "circle", emphasis: "new" },
          { id: "i1", label: "6", x: 2, y: 4, shape: "circle" },
          { id: "i2", label: "1", x: 3, y: 4, shape: "circle" },
          { id: "i3", label: "4", x: 4, y: 4, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Insertion sort on [3, 6, 1, 4] works differently: the sorted prefix starts as just the first item, [3].",
    },
    {
      state: {
        nodes: [
          { id: "i0", label: "3", x: 1, y: 4, shape: "circle" },
          { id: "i1", label: "6", x: 2, y: 4, shape: "circle", emphasis: "new" },
          { id: "i2", label: "1", x: 3, y: 4, shape: "circle" },
          { id: "i3", label: "4", x: 4, y: 4, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "6 is compared to the sorted prefix [3]. Since 6 > 3, it already belongs right where it is.",
    },
    {
      state: {
        nodes: [
          { id: "i0", label: "3", x: 2, y: 4, shape: "circle", emphasis: "active" },
          { id: "i1", label: "6", x: 3, y: 4, shape: "circle", emphasis: "active" },
          { id: "i2", label: "1", x: 1, y: 4, shape: "circle", emphasis: "new" },
          { id: "i3", label: "4", x: 4, y: 4, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Next, 1 is smaller than everything in [3, 6], so both 3 and 6 shift right and 1 slides in at the front.",
    },
    {
      state: {
        nodes: [
          { id: "i0", label: "1", x: 1, y: 4, shape: "circle", emphasis: "dim" },
          { id: "i1", label: "3", x: 2, y: 4, shape: "circle", emphasis: "active" },
          { id: "i2", label: "4", x: 3, y: 4, shape: "circle", emphasis: "new" },
          { id: "i3", label: "6", x: 4, y: 4, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "4 shifts past 6 but stops at 3, landing between them: sorted prefix grows to [1, 3, 4, 6].",
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "5", x: 1, y: 6, shape: "circle" },
          { id: "b1", label: "1", x: 2, y: 6, shape: "circle" },
          { id: "b2", label: "4", x: 3, y: 6, shape: "circle" },
          { id: "b3", label: "2", x: 4, y: 6, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Bubble sort, briefly: one pass compares each neighboring pair and swaps if out of order, bubbling the largest value to the end.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "Selection sort on `[7, 2, 9, 3]`. After exactly one full pass (one smallest-found-and-swapped), what does the array look like?",
      steps: [
        {
          state: {
            nodes: [
              { id: "p0", label: "7", x: 1, y: 1, shape: "circle" },
              { id: "p1", label: "2", x: 2, y: 1, shape: "circle" },
              { id: "p2", label: "9", x: 3, y: 1, shape: "circle" },
              { id: "p3", label: "3", x: 4, y: 1, shape: "circle" },
            ],
            arrows: [],
          },
          caption: "One pass scans the whole array once to find the overall smallest value.",
        },
      ],
      options: [
        { id: "a", label: "`[2, 7, 9, 3]`" },
        { id: "b", label: "`[2, 3, 7, 9]`" },
        { id: "c", label: "`[7, 2, 9, 3]`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "That is the FULLY sorted array. After only one pass, selection sort guarantees just the smallest value is in place; the rest of the array is untouched, not fully sorted.",
        c: "The array must change: the smallest value found (`2`) gets swapped into position `0`. Nothing changing at all would mean the pass never ran.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "p0", label: "2", x: 1, y: 1, shape: "circle", emphasis: "new" },
            { id: "p1", label: "7", x: 2, y: 1, shape: "circle", emphasis: "active" },
            { id: "p2", label: "9", x: 3, y: 1, shape: "circle" },
            { id: "p3", label: "3", x: 4, y: 1, shape: "circle" },
          ],
          arrows: [],
        },
        caption: "`2` is the smallest overall and swaps into position `0`. `7`, `9`, and `3` shuffle around each other but remain unsorted after just one pass.",
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "Fill in the comparison so insertion sort shifts elements right while they are greater than `key`.",
      code: [
        "def insertion_sort(arr):",
        "    for i in range(1, len(arr)):",
        "        key = arr[i]",
        "        j = i - 1",
        "        while j >= 0 and arr[j] {{op}} key:",
        "            arr[j + 1] = arr[j]",
        "            j -= 1",
        "        arr[j + 1] = key",
        "    return arr",
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: ">",
          explainWrong:
            "The shift should continue only while the sorted-prefix value is bigger than `key`, making room for `key` to slide left past it. Using `<` or `==` would stop shifting too early or shift values that are already in the right order.",
        },
      ],
      tests: [
        {
          name: "sorts a small list",
          code: "assert insertion_sort([3, 6, 1, 4]) == [1, 3, 4, 6], \"insertion_sort([3, 6, 1, 4]) should be [1, 3, 4, 6]\"",
        },
      ],
      reviewStep: 8,
    },
  ],
  recall: [
    {
      id: "dsa-analysis.basic-sorts.1",
      prompt: "After one full pass of selection sort, what is actually guaranteed about the array?",
      options: [
        "Only the smallest value found is in its final correct position; everything else may still be unsorted",
        "The whole array is fully sorted",
        "The two smallest values are both in place",
      ],
      correctIndex: 0,
      explainWrong: "Selection sort's single pass scans everything just to find and place one value, the overall smallest. The rest of the array is untouched by that pass and may still be completely out of order.",
    },
    {
      id: "dsa-analysis.basic-sorts.2",
      prompt: "In insertion sort, how does a new element find its place in the already-sorted prefix?",
      options: [
        "It is compared to prefix elements from the right, shifting larger ones over until it finds its spot",
        "It is always inserted at the very front",
        "The whole prefix is re-sorted from scratch each time",
      ],
      correctIndex: 0,
      explainWrong: "Insertion sort walks backward through the sorted prefix, shifting each larger element one slot right, and stops shifting as soon as it finds a value that isn't bigger than the key. It never blindly inserts at the front or re-sorts everything.",
    },
    {
      id: "dsa-analysis.basic-sorts.3",
      prompt: "What does a single pass of bubble sort accomplish?",
      options: [
        "It compares each pair of neighbors once, swapping out-of-order pairs, which bubbles the largest remaining value to the end",
        "It fully sorts the array in one pass",
        "It finds the smallest value like selection sort does",
      ],
      correctIndex: 0,
      explainWrong: "One bubble sort pass only walks through adjacent pairs and swaps them if they're out of order. That pushes the largest unsorted value to its final position at the end, but multiple passes are still needed to finish sorting.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: fast-sorts — quicksort partitioning, merge sort's zipper merge.
// ---------------------------------------------------------------------------

const fastSortsUnit: Unit = {
  id: "fast-sorts",
  title: "Quicksort and Merge Sort",
  watch: [
    {
      state: {
        nodes: [
          { id: "q0", label: "4", x: 1, y: 1, shape: "circle" },
          { id: "q1", label: "1", x: 2, y: 1, shape: "circle" },
          { id: "q2", label: "7", x: 3, y: 1, shape: "circle", emphasis: "active" },
          { id: "q3", label: "3", x: 4, y: 1, shape: "circle" },
          { id: "q4", label: "6", x: 5, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Quicksort on [4, 1, 7, 3, 6] picks a pivot, here 7 (last element).",
    },
    {
      state: {
        nodes: [
          { id: "q0", label: "4", x: 1, y: 1, shape: "circle", emphasis: "new" },
          { id: "q1", label: "1", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "q3", label: "3", x: 3, y: 1, shape: "circle", emphasis: "new" },
          { id: "q4", label: "6", x: 4, y: 1, shape: "circle", emphasis: "new" },
          { id: "q2", label: "7 (pivot)", x: 5, y: 1, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Partition: every value less than 7 moves to its left, everything greater goes to its right. All four happen to be smaller here.",
    },
    {
      state: {
        nodes: [
          { id: "q0", label: "4", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "q1", label: "1", x: 2, y: 1, shape: "circle", emphasis: "dim" },
          { id: "q3", label: "3", x: 3, y: 1, shape: "circle", emphasis: "dim" },
          { id: "q4", label: "6", x: 4, y: 1, shape: "circle", emphasis: "dim" },
          { id: "q2", label: "7", x: 5, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "After partitioning, the pivot 7 sits in its final sorted position; quicksort now recurses separately on the left group and (empty) right group.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "8", x: 1, y: 3, shape: "circle" },
          { id: "m1", label: "3", x: 2, y: 3, shape: "circle" },
          { id: "m2", label: "5", x: 3, y: 3, shape: "circle" },
          { id: "m3", label: "1", x: 4, y: 3, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Merge sort on [8, 3, 5, 1] takes the opposite approach: split first, sort later.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "8", x: 1, y: 3, shape: "circle", emphasis: "new" },
          { id: "m1", label: "3", x: 2, y: 3, shape: "circle", emphasis: "new" },
          { id: "m2", label: "5", x: 4, y: 3, shape: "circle", emphasis: "new" },
          { id: "m3", label: "1", x: 5, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "The array splits into two halves, [8, 3] and [5, 1], which each get split again down to single elements and sorted independently.",
    },
    {
      state: {
        nodes: [
          { id: "left0", label: "3", x: 1, y: 3, shape: "circle", emphasis: "active" },
          { id: "left1", label: "8", x: 2, y: 3, shape: "circle" },
          { id: "right0", label: "1", x: 4, y: 3, shape: "circle", emphasis: "active" },
          { id: "right1", label: "5", x: 5, y: 3, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Now merge the two sorted halves [3, 8] and [1, 5] zipper-style: compare their fronts, 3 vs 1. 1 is smaller, so it goes first.",
    },
    {
      state: {
        nodes: [
          { id: "out0", label: "1", x: 1, y: 5, shape: "circle", emphasis: "new" },
          { id: "left0", label: "3", x: 1, y: 3, shape: "circle", emphasis: "active" },
          { id: "left1", label: "8", x: 2, y: 3, shape: "circle" },
          { id: "right1", label: "5", x: 4, y: 3, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Compare the new fronts, 3 vs 5. 3 is smaller and goes next into the merged output.",
    },
    {
      state: {
        nodes: [
          { id: "out0", label: "1", x: 1, y: 5, shape: "circle", emphasis: "dim" },
          { id: "out1", label: "3", x: 2, y: 5, shape: "circle", emphasis: "new" },
          { id: "out2", label: "5", x: 3, y: 5, shape: "circle", emphasis: "new" },
          { id: "out3", label: "8", x: 4, y: 5, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Comparing fronts keeps picking the smaller value until one side runs out, then the rest copies over: the merged result is [1, 3, 5, 8].",
    },
    {
      state: {
        nodes: [
          { id: "sh0", label: "gap = 2", x: 1, y: 7, shape: "frame", emphasis: "new" },
          { id: "sh1", label: "9", x: 3, y: 7, shape: "circle", emphasis: "active" },
          { id: "sh2", label: "4", x: 5, y: 7, shape: "circle", emphasis: "active" },
        ],
        arrows: [{ from: "sh1", to: "sh2", label: "compare across gap", emphasis: "active" }],
      },
      caption: "Shell sort compares and swaps elements that are gap slots apart, here gap=2, before shrinking the gap toward 1 (plain insertion sort).",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "`arr = [5, 2, 8, 1, 9]`, pivot = last element (`9`). After one partition step, what does the array look like?",
      steps: [
        {
          state: {
            nodes: [
              { id: "p0", label: "5", x: 1, y: 1, shape: "circle" },
              { id: "p1", label: "2", x: 2, y: 1, shape: "circle" },
              { id: "p2", label: "8", x: 3, y: 1, shape: "circle" },
              { id: "p3", label: "1", x: 4, y: 1, shape: "circle" },
              { id: "p4", label: "9", x: 5, y: 1, shape: "circle", emphasis: "active" },
            ],
            arrows: [],
          },
          caption: "`9` is chosen as the pivot; every other value gets compared against it.",
        },
      ],
      options: [
        { id: "a", label: "`[5, 2, 8, 1, 9]`, since every value is less than 9" },
        { id: "b", label: "`[1, 2, 3, 5, 9]`, fully sorted" },
        { id: "c", label: "`9` moves to index `0`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "That is the end result of the WHOLE sort, not one partition step. Partitioning only groups values relative to the pivot; it does not sort the smaller-than-pivot group internally yet.",
        c: "The pivot ends up in its correct final position based on how many elements are smaller than it, not automatically at index `0`. Since every other value here is smaller than `9`, the pivot actually belongs at the end.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "p0", label: "5", x: 1, y: 1, shape: "circle", emphasis: "dim" },
            { id: "p1", label: "2", x: 2, y: 1, shape: "circle", emphasis: "dim" },
            { id: "p2", label: "8", x: 3, y: 1, shape: "circle", emphasis: "dim" },
            { id: "p3", label: "1", x: 4, y: 1, shape: "circle", emphasis: "dim" },
            { id: "p4", label: "9", x: 5, y: 1, shape: "circle", emphasis: "new" },
          ],
          arrows: [],
        },
        caption: "Since every other value (`5, 2, 8, 1`) is less than the pivot `9`, none move; the pivot is already in its correct final spot at the end.",
      },
      reviewStep: 2,
    },
    {
      kind: "fillin",
      prompt: "Fill in the comparison used while merging two sorted halves, so the smaller front element is always taken first.",
      code: [
        "def merge(left, right):",
        "    result = []",
        "    i = j = 0",
        "    while i < len(left) and j < len(right):",
        "        if left[i] {{op}} right[j]:",
        "            result.append(left[i])",
        "            i += 1",
        "        else:",
        "            result.append(right[j])",
        "            j += 1",
        "    result.extend(left[i:])",
        "    result.extend(right[j:])",
        "    return result",
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "<=",
          explainWrong:
            "Merging always takes whichever front value is smaller so the output stays sorted. `<=` (or `<`) compares the two fronts directly; comparing an index or using `>` would pick the larger value first and break the sorted order.",
        },
      ],
      tests: [
        {
          name: "merges two sorted halves",
          code: "assert merge([1, 5, 8], [2, 3]) == [1, 2, 3, 5, 8], \"merge([1, 5, 8], [2, 3]) should be [1, 2, 3, 5, 8]\"",
        },
      ],
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "dsa-analysis.fast-sorts.1",
      prompt: "What is guaranteed right after a single quicksort partition step around a chosen pivot?",
      options: [
        "The pivot sits in its final correct position, with smaller values to its left and larger to its right",
        "The whole array is fully sorted",
        "The pivot moves to index 0",
      ],
      correctIndex: 0,
      explainWrong: "Partitioning only guarantees the pivot's own final position and groups the rest around it. It does not sort those groups internally, and the pivot lands wherever its rank places it, not always at index 0.",
    },
    {
      id: "dsa-analysis.fast-sorts.2",
      prompt: "Merge sort splits the array first. What happens during the merge step?",
      options: [
        "The two sorted halves are zipped together by repeatedly taking the smaller of the two front elements",
        "The two halves are concatenated as-is, then the whole thing is sorted again",
        "One half is discarded",
      ],
      correctIndex: 0,
      explainWrong: "The merge step compares the fronts of both already-sorted halves and always takes the smaller one next, building a fully sorted result without needing to re-sort or discard anything.",
    },
    {
      id: "dsa-analysis.fast-sorts.3",
      prompt: "What idea does shell sort add on top of plain insertion sort?",
      options: [
        "It first compares and swaps elements that are far apart (a gap), shrinking the gap over time until it reaches 1",
        "It always compares only adjacent neighbors, same as bubble sort",
        "It sorts by splitting into two halves like merge sort",
      ],
      correctIndex: 0,
      explainWrong: "Shell sort's key idea is comparing elements separated by a shrinking gap, moving far-apart out-of-order values closer to their final spots early, before finishing with a gap of 1, which is plain insertion sort.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 5: special-sorts — radix bucketing by digit, quickselect discarding.
// ---------------------------------------------------------------------------

const specialSortsUnit: Unit = {
  id: "special-sorts",
  title: "Radix, Bucket, and Quickselect",
  watch: [
    {
      state: {
        nodes: [
          { id: "r0", label: "29", x: 1, y: 1, shape: "circle" },
          { id: "r1", label: "13", x: 2, y: 1, shape: "circle" },
          { id: "r2", label: "82", x: 3, y: 1, shape: "circle" },
          { id: "r3", label: "41", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Radix sort on [29, 13, 82, 41] sorts by digit place instead of comparing whole numbers.",
    },
    {
      state: {
        nodes: [
          { id: "b1", label: "bucket 1", x: 1, y: 3, shape: "frame" },
          { id: "r1", label: "41", x: 1, y: 3.5, shape: "circle", emphasis: "active" },
          { id: "b2", label: "bucket 2", x: 3, y: 3, shape: "frame" },
          { id: "r2", label: "82", x: 3, y: 3.5, shape: "circle", emphasis: "active" },
          { id: "b3", label: "bucket 3", x: 5, y: 3, shape: "frame" },
          { id: "r3", label: "13", x: 5, y: 3.5, shape: "circle", emphasis: "active" },
          { id: "b9", label: "bucket 9", x: 7, y: 3, shape: "frame" },
          { id: "r0", label: "29", x: 7, y: 3.5, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Pass 1 buckets by the ONES digit: 41 to bucket 1, 82 to bucket 2, 13 to bucket 3, 29 to bucket 9.",
    },
    {
      state: {
        nodes: [
          { id: "after1", label: "41, 82, 13, 29", x: 1, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Reading buckets in order (0 through 9) after pass 1 gives: 41, 82, 13, 29.",
    },
    {
      state: {
        nodes: [
          { id: "b1t", label: "bucket 1", x: 1, y: 3, shape: "frame" },
          { id: "r1t", label: "13", x: 1, y: 3.5, shape: "circle", emphasis: "active" },
          { id: "b2t", label: "bucket 2", x: 3, y: 3, shape: "frame" },
          { id: "r0t", label: "29", x: 3, y: 3.5, shape: "circle", emphasis: "active" },
          { id: "b4t", label: "bucket 4", x: 5, y: 3, shape: "frame" },
          { id: "r3t", label: "41", x: 5, y: 3.5, shape: "circle", emphasis: "active" },
          { id: "b8t", label: "bucket 8", x: 7, y: 3, shape: "frame" },
          { id: "r2t", label: "82", x: 7, y: 3.5, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Pass 2 buckets that same order by the TENS digit: 13 to bucket 1, 29 to bucket 2, 41 to bucket 4, 82 to bucket 8.",
    },
    {
      state: {
        nodes: [
          { id: "final", label: "13, 29, 41, 82", x: 1, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Reading the tens-digit buckets in order gives the final sorted result: 13, 29, 41, 82. No comparisons between whole numbers were ever made.",
    },
    {
      state: {
        nodes: [
          { id: "bk0", label: "0.12", x: 1, y: 5, shape: "circle" },
          { id: "bk1", label: "0.55", x: 2, y: 5, shape: "circle" },
          { id: "bk2", label: "0.31", x: 3, y: 5, shape: "circle" },
          { id: "bk3", label: "0.88", x: 4, y: 5, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Bucket sort instead groups values by RANGE: here, 0.0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0, each sorted internally then concatenated.",
    },
    {
      state: {
        nodes: [
          { id: "qs0", label: "7", x: 1, y: 7, shape: "circle" },
          { id: "qs1", label: "2", x: 2, y: 7, shape: "circle" },
          { id: "qs2", label: "9", x: 3, y: 7, shape: "circle" },
          { id: "qs3", label: "4", x: 4, y: 7, shape: "circle" },
          { id: "qs4", label: "1", x: 5, y: 7, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Quickselect finds the kth smallest without fully sorting. Looking for the 2nd smallest of [7, 2, 9, 4, 1], partition around pivot 1.",
    },
    {
      state: {
        nodes: [
          { id: "qs4b", label: "1", x: 1, y: 7, shape: "circle", emphasis: "new" },
          { id: "qsrest", label: "7, 2, 9, 4 (all > pivot)", x: 3, y: 7, shape: "frame", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "Every other value is greater than 1, so the entire right side is discarded from consideration: quickselect only recurses into the side that could contain the 2nd smallest, never sorting the rest.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "Radix sort is bucketing `[23, 45, 12, 34]` by the ONES digit first. Which order do the buckets place them in (reading bucket `0` through `9`)?",
      steps: [
        {
          state: {
            nodes: [
              { id: "d0", label: "23", x: 1, y: 1, shape: "circle" },
              { id: "d1", label: "45", x: 2, y: 1, shape: "circle" },
              { id: "d2", label: "12", x: 3, y: 1, shape: "circle" },
              { id: "d3", label: "34", x: 4, y: 1, shape: "circle" },
            ],
            arrows: [],
          },
          caption: "Look only at each number's ones digit: `3, 5, 2, 4`.",
        },
      ],
      options: [
        { id: "a", label: "`12, 23, 34, 45`" },
        { id: "b", label: "`23, 45, 12, 34`" },
        { id: "c", label: "`45, 34, 23, 12`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "That's the original, unbucketed order. Bucketing by ones digit (`2, 4, 5, 3`) reorders them by that digit alone, which happens to also produce the fully sorted order here.",
        c: "That's descending order, but radix sort's bucket pass reads buckets from `0` to `9` in increasing order, not decreasing.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "result", label: "12, 23, 34, 45", x: 1, y: 1, shape: "frame", emphasis: "new" }],
          arrows: [],
        },
        caption: "Ones digits are `2, 3, 4, 5` for `12, 23, 34, 45` respectively; reading buckets `0-9` in order gives exactly that sequence.",
      },
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-analysis.special-sorts.1",
      prompt: "How does radix sort avoid comparing whole numbers against each other?",
      options: [
        "It buckets numbers by individual digit place (ones, then tens, then hundreds), reading buckets back in order each pass",
        "It still compares every pair of numbers, just faster",
        "It only works on numbers with exactly one digit",
      ],
      correctIndex: 0,
      explainWrong: "Radix sort processes one digit position at a time, placing each number into a bucket 0-9 based on that digit, then reads the buckets back in order. It never directly compares two full numbers, and it works on multi-digit numbers by repeating this for each digit place.",
    },
    {
      id: "dsa-analysis.special-sorts.2",
      prompt: "What does bucket sort group values by, as opposed to radix sort's digit-based buckets?",
      options: [
        "Value ranges (like 0.0-0.25, 0.25-0.5), sorting each bucket internally and concatenating",
        "Alphabetical order of their string representation",
        "Whether the value is even or odd only",
      ],
      correctIndex: 0,
      explainWrong: "Bucket sort divides the value range into intervals and drops each element into the bucket matching its range, then sorts within each bucket before concatenating everything back together. It isn't about parity or digit place; that's radix sort.",
    },
    {
      id: "dsa-analysis.special-sorts.3",
      prompt: "How does quickselect find the kth smallest value faster than fully sorting?",
      options: [
        "It partitions around a pivot and recurses into only the one side that could contain the kth value, discarding the other side entirely",
        "It sorts the whole array first, then picks the kth item",
        "It checks every possible k value in a separate pass",
      ],
      correctIndex: 0,
      explainWrong: "After partitioning, quickselect can tell from the pivot's final position which side the kth smallest must be in, and it throws away the other side completely rather than sorting it, which is why it avoids the cost of a full sort.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 6: apply-analysis — implement insertion sort or a two-list merge.
// ---------------------------------------------------------------------------

const applyAnalysisUnit: Unit = {
  id: "apply-analysis",
  title: "Apply: Sort It Yourself",
  watch: [
    {
      state: {
        nodes: [
          { id: "u0", label: "6", x: 1, y: 1, shape: "circle" },
          { id: "u1", label: "2", x: 2, y: 1, shape: "circle" },
          { id: "u2", label: "9", x: 3, y: 1, shape: "circle" },
          { id: "u3", label: "4", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "unsorted = [6, 2, 9, 4] is what we need to sort using insertion sort's shifting technique.",
    },
    {
      state: {
        nodes: [
          { id: "u0", label: "2", x: 1, y: 1, shape: "circle", emphasis: "new" },
          { id: "u1", label: "4", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "u2", label: "6", x: 3, y: 1, shape: "circle", emphasis: "new" },
          { id: "u3", label: "9", x: 4, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "The finished, sorted result is [2, 4, 6, 9]. This is exactly the row _viz renders for you to check by eye after your code runs.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given a list `arr`, implement `insertion_sort(arr)` so it sorts `arr` in place using insertion sort and returns it, without using Python's built-in sort. Also implement `merge_sorted(a, b)` so it merges two already-sorted lists `a` and `b` into one sorted list, zipper-style.",
      difficulty: "Medium",
      examples: [
        { input: "arr = [6, 2, 9, 4]", output: "[2, 4, 6, 9]", explanation: "`insertion_sort(arr)` sorts in place and returns `arr`." },
        {
          input: "a = [1, 4, 7], b = [2, 3, 9]",
          output: "[1, 2, 3, 4, 7, 9]",
          explanation: "`merge_sorted(a, b)` zips the two sorted lists together.",
        },
      ],
      constraints: ["`0 <= len(arr) <= 10^3`", "`a` and `b` are each already sorted in ascending order"],
      bigO: { fn: "insertion_sort", answer: "O(n²)", explain: "`insertion_sort`'s shifting loop dominates: each of the `n` elements can shift back through the whole sorted prefix." },
      hidden:
        "def _viz(xs):\n    nodes = [{\"id\": f\"n{i}\", \"label\": repr(v), \"x\": i, \"y\": 0, \"shape\": \"circle\", \"emphasis\": \"new\"} for i, v in enumerate(xs)]\n    return {\"nodes\": nodes, \"arrows\": []}",
      starter:
        "def insertion_sort(arr):\n    # sort arr in place using the shifting technique, then return it\n    pass\n\ndef merge_sorted(a, b):\n    # merge two already-sorted lists into one sorted list\n    pass\n",
      solution:
        "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\ndef merge_sorted(a, b):\n    result = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i += 1\n        else:\n            result.append(b[j])\n            j += 1\n    result.extend(a[i:])\n    result.extend(b[j:])\n    return result\n",
      tests: [
        {
          name: "insertion_sort sorts a typical list",
          code: "assert insertion_sort([6, 2, 9, 4]) == [2, 4, 6, 9], \"insertion_sort([6, 2, 9, 4]) should be [2, 4, 6, 9]\"",
        },
        {
          name: "insertion_sort handles an empty list",
          code: "assert insertion_sort([]) == [], \"insertion_sort([]) should be []: an empty list is already sorted, with nothing to shift\"",
        },
        {
          name: "insertion_sort handles a single element",
          code: "assert insertion_sort([5]) == [5], \"insertion_sort([5]) should be [5]: a single element has no other value to compare against\"",
        },
        {
          name: "insertion_sort handles duplicates",
          code: "assert insertion_sort([3, 1, 3, 2, 1]) == [1, 1, 2, 3, 3], \"insertion_sort([3, 1, 3, 2, 1]) should be [1, 1, 2, 3, 3]: duplicate values must all be kept, just placed together\"",
        },
        {
          name: "merge_sorted zips two sorted lists",
          code: "assert merge_sorted([1, 4, 7], [2, 3, 9]) == [1, 2, 3, 4, 7, 9], \"merge_sorted([1, 4, 7], [2, 3, 9]) should be [1, 2, 3, 4, 7, 9]\"",
        },
        {
          name: "merge_sorted handles one empty list",
          code: "assert merge_sorted([], [1, 2, 3]) == [1, 2, 3], \"merge_sorted([], [1, 2, 3]) should be [1, 2, 3]: with nothing on one side, the other side's values just copy over in order\"",
        },
        {
          name: "merge_sorted handles duplicates across lists",
          code: "assert merge_sorted([1, 2, 2], [2, 3]) == [1, 2, 2, 2, 3], \"merge_sorted([1, 2, 2], [2, 3]) should be [1, 2, 2, 2, 3]: equal values from either side must all be kept\"",
        },
      ],
      vizExpr: "_viz(insertion_sort([6, 2, 9, 4]))",
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-analysis.apply-analysis.1",
      prompt: "Why does `insertion_sort([])` need to return `[]` without crashing?",
      options: [
        "Because the shifting loop should simply never execute when there is nothing to shift, an empty prefix is trivially sorted",
        "Because Python treats empty lists as an error case that must be special-cased",
        "It doesn't need to handle this; empty input is never tested",
      ],
      correctIndex: 0,
      explainWrong: "An empty list has no elements to compare or shift, so the loop that walks from index 1 onward simply never runs. That is not a special error case, and edge cases like empty input are exactly what teaching tests check.",
    },
    {
      id: "dsa-analysis.apply-analysis.2",
      prompt: "When `merge_sorted` receives one empty list and one non-empty sorted list, what should the result be?",
      options: [
        "The non-empty list's values, in their existing sorted order",
        "An empty list, since one side is empty",
        "An error, since merging requires two non-empty lists",
      ],
      correctIndex: 0,
      explainWrong: "Once one side runs out of elements to compare, the remaining elements from the other side are already sorted and just get copied over as-is. There is no error case here and no reason for the whole result to collapse to empty.",
    },
  ],
};

export const chDsaAnalysis: Chapter = {
  id: "dsa-analysis",
  phase: 2,
  title: "Searching, Sorting, and Big-O",
  units: [bigOUnit, binarySearchUnit, basicSortsUnit, fastSortsUnit, specialSortsUnit, applyAnalysisUnit],
};
