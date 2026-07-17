import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: heap-property — every parent is >= both its children (max-heap);
// insert always starts at the next open leaf, then glides up until the
// property holds again.
// ---------------------------------------------------------------------------

const heapPropertyUnit: Unit = {
  id: "heap-property",
  title: "The Heap Property",
  watch: [
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "b", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "c", label: "45", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "e", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "f", label: "35", x: 4, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "root", to: "b" },
          { from: "root", to: "c" },
          { from: "b", to: "d" },
          { from: "b", to: "e" },
          { from: "c", to: "f" },
        ],
      },
      caption: "A max-heap tree: every parent holds a value greater than or equal to both of its children, all the way down.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "b", label: "30", x: 1, y: 1, shape: "circle", emphasis: "active" },
          { id: "c", label: "45", x: 5, y: 1, shape: "circle", emphasis: "active" },
          { id: "d", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "e", label: "20", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "f", label: "35", x: 4, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [
          { from: "root", to: "b", emphasis: "active" },
          { from: "root", to: "c", emphasis: "active" },
          { from: "b", to: "d" },
          { from: "b", to: "e" },
          { from: "c", to: "f" },
        ],
      },
      caption: "Check the root against its two children: 50 is greater than or equal to both 30 and 45. Property holds here.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "30", x: 1, y: 1, shape: "circle", emphasis: "active" },
          { id: "c", label: "45", x: 5, y: 1, shape: "circle", emphasis: "dim" },
          { id: "d", label: "10", x: 0, y: 2, shape: "circle", emphasis: "active" },
          { id: "e", label: "20", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "f", label: "35", x: 4, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [
          { from: "root", to: "b" },
          { from: "root", to: "c" },
          { from: "b", to: "d", emphasis: "active" },
          { from: "b", to: "e", emphasis: "active" },
          { from: "c", to: "f" },
        ],
      },
      caption: "Move down one level: 30 is greater than or equal to both 10 and 20. Still valid.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "30", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "c", label: "45", x: 5, y: 1, shape: "circle", emphasis: "active" },
          { id: "d", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "e", label: "20", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "f", label: "35", x: 4, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [
          { from: "root", to: "b" },
          { from: "root", to: "c" },
          { from: "b", to: "d" },
          { from: "b", to: "e" },
          { from: "c", to: "f", emphasis: "active" },
        ],
      },
      caption: "Last check: 45 is greater than or equal to its only child, 35. Every parent in the tree passes, so this is a valid max-heap.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "30", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "c", label: "45", x: 5, y: 1, shape: "circle", emphasis: "dim" },
          { id: "d", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "e", label: "20", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "f", label: "35", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "g", label: "55", tag: "inserted", x: 6, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "root", to: "b" },
          { from: "root", to: "c" },
          { from: "b", to: "d" },
          { from: "b", to: "e" },
          { from: "c", to: "f" },
          { from: "c", to: "g", emphasis: "active" },
        ],
      },
      caption: "Insert 55: it always goes into the next open leaf spot first, keeping the tree's shape complete, even though it breaks the heap property there.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "30", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "g", label: "55", tag: "swapped up", x: 5, y: 1, shape: "circle", emphasis: "new" },
          { id: "d", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "e", label: "20", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "f", label: "35", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "45", tag: "glided down", x: 6, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [
          { from: "root", to: "b" },
          { from: "root", to: "g", emphasis: "active" },
          { from: "b", to: "d" },
          { from: "b", to: "e" },
          { from: "g", to: "f" },
          { from: "g", to: "c" },
        ],
      },
      caption: "55 is greater than its parent 45, so they swap: 55 glides up one level, and 45 glides down into the spot 55 left behind.",
    },
    {
      state: {
        nodes: [
          { id: "g", label: "55", tag: "new root", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "b", label: "30", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "root", label: "50", tag: "glided down", x: 5, y: 1, shape: "circle", emphasis: "active" },
          { id: "d", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "e", label: "20", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "f", label: "35", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "45", x: 6, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [
          { from: "g", to: "b" },
          { from: "g", to: "root", emphasis: "active" },
          { from: "b", to: "d" },
          { from: "b", to: "e" },
          { from: "root", to: "f" },
          { from: "root", to: "c" },
        ],
      },
      caption: "55 is still greater than the root, 50, so they swap again: 55 glides all the way to the root. The heap property holds everywhere once more.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "A max-heap has root `40`, with children `25` and `38`. You insert `60` as the next open leaf, under `38`. What happens on the very next comparison?",
      steps: [
        {
          state: {
            nodes: [
              { id: "root", label: "40", x: 3, y: 0, shape: "circle" },
              { id: "l", label: "25", x: 1, y: 1, shape: "circle" },
              { id: "r", label: "38", x: 5, y: 1, shape: "circle" },
              { id: "new", label: "60", tag: "inserted", x: 6, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [
              { from: "root", to: "l" },
              { from: "root", to: "r" },
              { from: "r", to: "new", emphasis: "active" },
            ],
          },
          caption: "60 is placed at the next open leaf, as a child of 38.",
        },
      ],
      options: [
        { id: "a", label: "`60` is compared to its parent `38`, and since `60` is bigger, they swap" },
        { id: "b", label: "`60` is compared to the root `40` first, since bubble-up always starts at the root" },
        { id: "c", label: "Nothing happens; the heap only fixes itself on the next pop" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Bubble-up starts at the newly inserted node and walks upward one parent at a time. It compares to its immediate parent, `38`, first, not the root.",
        c: "Insert must repair the heap property immediately, before the next operation. It doesn't wait for a future pop; that would let the property stay broken.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "root", label: "40", x: 3, y: 0, shape: "circle" },
            { id: "l", label: "25", x: 1, y: 1, shape: "circle" },
            { id: "new", label: "60", tag: "swapped up", x: 5, y: 1, shape: "circle", emphasis: "new" },
            { id: "r", label: "38", tag: "glided down", x: 6, y: 2, shape: "circle", emphasis: "active" },
          ],
          arrows: [
            { from: "root", to: "l" },
            { from: "root", to: "new", emphasis: "active" },
            { from: "new", to: "r" },
          ],
        },
        caption: "60 beats 38, so they swap: 60 glides up one level, and the comparison will continue against the root next.",
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "Fill in the comparison operator so `is_valid_max_heap` correctly checks the heap property between a parent and one child.",
      code: [
        "def parent_ok(parent_value, child_value):",
        "    return parent_value {{op}} child_value",
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: ">=",
          explainWrong:
            "The max-heap property requires the parent to be greater than OR EQUAL TO each child, not strictly greater. Equal values are allowed; using `>` alone would reject valid heaps that have duplicate values.",
        },
      ],
      tests: [
        { name: "parent_ok(50, 30) is True", code: "assert parent_ok(50, 30) == True, \"parent_ok(50, 30) should be True: 50 >= 30\"" },
        { name: "parent_ok(30, 30) is True", code: "assert parent_ok(30, 30) == True, \"parent_ok(30, 30) should be True: equal values still satisfy the max-heap property\"" },
        { name: "parent_ok(10, 20) is False", code: "assert parent_ok(10, 20) == False, \"parent_ok(10, 20) should be False: 10 is not >= 20\"" },
      ],
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-heaps.heap-property.1",
      prompt: "In a max-heap, what must be true of every parent node compared to its children?",
      options: [
        "The parent's value is greater than or equal to each child's value",
        "The parent's value is less than or equal to each child's value",
        "The parent's value must be exactly double each child's value",
      ],
      correctIndex: 0,
      explainWrong:
        "That describes a min-heap, or nothing at all. A max-heap requires every parent to be greater than or equal to both of its children, all the way down the tree.",
    },
    {
      id: "dsa-heaps.heap-property.2",
      prompt: "Where does a newly inserted value first get placed in a heap?",
      options: [
        "At the root, then it sinks down to where it belongs",
        "At the next open leaf position, keeping the tree's shape complete, and then it bubbles up",
        "Wherever there's a value smaller than it, anywhere in the tree",
      ],
      correctIndex: 1,
      explainWrong:
        "Insert never searches the whole tree for a spot. It always places the new value at the next open leaf, so the tree stays a complete shape, and only then compares it up against its parents.",
    },
    {
      id: "dsa-heaps.heap-property.3",
      prompt: "During bubble-up, when does the newly inserted value stop swapping with its parent?",
      options: [
        "After exactly one swap, always",
        "As soon as the parent is greater than or equal to it, or it reaches the root",
        "Only once it becomes the smallest value in the tree",
      ],
      correctIndex: 1,
      explainWrong:
        "Bubble-up can take zero swaps, one swap, or many; it's not fixed at one. It keeps swapping upward until it meets a parent that's already greater than or equal to it, or there's no parent left because it reached the root.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: array-heap — the same tree lives in a flat array; parent and child
// positions are pure index math, no pointers required.
// ---------------------------------------------------------------------------

const arrayHeapUnit: Unit = {
  id: "array-heap",
  title: "Heaps Live in Arrays",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "50", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n2", label: "45", x: 5, y: 1, shape: "circle" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n5", label: "35", x: 4, y: 2, shape: "circle" },
          { id: "n6", label: "25", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "n0", to: "n1" }, { from: "n0", to: "n2" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n2", to: "n5" }, { from: "n2", to: "n6" },
        ],
      },
      caption: "This is the same max-heap tree we've been using, drawn the usual way, with 7 nodes across 3 levels.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "50", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "45", x: 5, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n5", label: "35", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n6", label: "25", x: 6, y: 2, shape: "circle", emphasis: "dim" },
          { id: "a0", label: "50", tag: "i=0", x: 0, y: 4, shape: "box", emphasis: "new" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 4, shape: "box", emphasis: "new" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 4, shape: "box", emphasis: "new" },
          { id: "a3", label: "10", tag: "i=3", x: 3, y: 4, shape: "box", emphasis: "new" },
          { id: "a4", label: "20", tag: "i=4", x: 4, y: 4, shape: "box", emphasis: "new" },
          { id: "a5", label: "35", tag: "i=5", x: 5, y: 4, shape: "box", emphasis: "new" },
          { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "n0", to: "n1" }, { from: "n0", to: "n2" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n2", to: "n5" }, { from: "n2", to: "n6" },
        ],
      },
      caption: "The exact same values, packed into an array level by level, left to right, with no gaps at all.",
    },
    {
      state: {
        nodes: [
          { id: "a0", label: "50", tag: "i=0, root", x: 0, y: 4, shape: "box", emphasis: "active" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 4, shape: "box", emphasis: "dim" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 4, shape: "box", emphasis: "dim" },
          { id: "a3", label: "10", tag: "i=3", x: 3, y: 4, shape: "box", emphasis: "dim" },
          { id: "a4", label: "20", tag: "i=4", x: 4, y: 4, shape: "box", emphasis: "dim" },
          { id: "a5", label: "35", tag: "i=5", x: 5, y: 4, shape: "box", emphasis: "dim" },
          { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "Index 0 is always the root: the array's very first slot.",
    },
    {
      state: {
        nodes: [
          { id: "a0", label: "50", tag: "i=0", x: 0, y: 4, shape: "box", emphasis: "dim" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 4, shape: "box", emphasis: "active" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 4, shape: "box", emphasis: "active" },
          { id: "a3", label: "10", tag: "i=3", x: 3, y: 4, shape: "box", emphasis: "dim" },
          { id: "a4", label: "20", tag: "i=4", x: 4, y: 4, shape: "box", emphasis: "dim" },
          { id: "a5", label: "35", tag: "i=5", x: 5, y: 4, shape: "box", emphasis: "dim" },
          { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "a0", to: "a1", label: "2*0+1", emphasis: "active" },
          { from: "a0", to: "a2", label: "2*0+2", emphasis: "active" },
        ],
      },
      caption: "Children of index 0 sit at 2*0+1 = 1 and 2*0+2 = 2. That formula works for any index, not just the root.",
    },
    {
      state: {
        nodes: [
          { id: "a0", label: "50", tag: "i=0", x: 0, y: 4, shape: "box", emphasis: "dim" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 4, shape: "box", emphasis: "dim" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 4, shape: "box", emphasis: "dim" },
          { id: "a3", label: "10", tag: "i=3, parent (3-1)//2=1", x: 3, y: 4, shape: "box", emphasis: "active" },
          { id: "a4", label: "20", tag: "i=4", x: 4, y: 4, shape: "box", emphasis: "dim" },
          { id: "a5", label: "35", tag: "i=5", x: 5, y: 4, shape: "box", emphasis: "dim" },
          { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [{ from: "a3", to: "a1", label: "(3-1)//2", emphasis: "active" }],
      },
      caption: "Going the other direction: the parent of index 3 is (3-1)//2 = 1. Integer division floors the fraction down.",
    },
    {
      state: {
        nodes: [
          { id: "a0", label: "50", tag: "i=0", x: 0, y: 4, shape: "box", emphasis: "dim" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 4, shape: "box", emphasis: "dim" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 4, shape: "box", emphasis: "active" },
          { id: "a3", label: "10", tag: "i=3", x: 3, y: 4, shape: "box", emphasis: "dim" },
          { id: "a4", label: "20", tag: "i=4", x: 4, y: 4, shape: "box", emphasis: "dim" },
          { id: "a5", label: "35", tag: "i=5", x: 5, y: 4, shape: "box", emphasis: "active" },
          { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "active" },
        ],
        arrows: [
          { from: "a2", to: "a5", label: "2*2+1", emphasis: "active" },
          { from: "a2", to: "a6", label: "2*2+2", emphasis: "active" },
        ],
      },
      caption: "Children of index 2 are 2*2+1 = 5 and 2*2+2 = 6. Same formula, just plugged in with a different parent index.",
    },
    {
      state: {
        nodes: [
          { id: "a0", label: "50", tag: "i=0", x: 0, y: 4, shape: "box", emphasis: "dim" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 4, shape: "box", emphasis: "active" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 4, shape: "box", emphasis: "dim" },
          { id: "a3", label: "10", tag: "i=3", x: 3, y: 4, shape: "box", emphasis: "active" },
          { id: "a4", label: "20", tag: "i=4", x: 4, y: 4, shape: "box", emphasis: "active" },
          { id: "a5", label: "35", tag: "i=5", x: 5, y: 4, shape: "box", emphasis: "dim" },
          { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "a1", to: "a3", label: "2*1+1", emphasis: "active" },
          { from: "a1", to: "a4", label: "2*1+2", emphasis: "active" },
        ],
      },
      caption: "And children of index 1 are 2*1+1 = 3 and 2*1+2 = 4. Every parent/child link in the whole tree comes from this same pair of formulas.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "50", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "45", x: 5, y: 1, shape: "circle", emphasis: "dim" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n5", label: "35", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n6", label: "25", x: 6, y: 2, shape: "circle", emphasis: "dim" },
          { id: "a0", label: "50", tag: "i=0", x: 0, y: 4, shape: "box" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 4, shape: "box" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 4, shape: "box" },
          { id: "a3", label: "10", tag: "i=3", x: 3, y: 4, shape: "box" },
          { id: "a4", label: "20", tag: "i=4", x: 4, y: 4, shape: "box" },
          { id: "a5", label: "35", tag: "i=5", x: 5, y: 4, shape: "box" },
          { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box" },
        ],
        arrows: [
          { from: "n0", to: "n1" }, { from: "n0", to: "n2" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n2", to: "n5" }, { from: "n2", to: "n6" },
          { from: "a0", to: "a1" }, { from: "a0", to: "a2" },
          { from: "a1", to: "a3" }, { from: "a1", to: "a4" },
          { from: "a2", to: "a5" }, { from: "a2", to: "a6" },
        ],
      },
      caption: "The tree shape is never stored explicitly: it's entirely implied by array position. No parent or child pointers are needed at all.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "In an array-backed heap, what is the parent index of the element at index `6`?",
      steps: [
        {
          state: {
            nodes: [{ id: "a6", label: "?", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "new" }],
            arrows: [],
          },
          caption: "We want the parent of index 6.",
        },
      ],
      options: [
        { id: "a", label: "`2`" },
        { id: "b", label: "`3`" },
        { id: "c", label: "`13`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "That would be `(6-1)//2` computed as `(6-1)/2 = 2.5` rounded up. Integer division floors, it doesn't round to the nearest whole number.",
        c: "`13` comes from `2*6+1`, which is the CHILD formula, not the parent formula. Parent goes the other direction: `(i-1)//2`.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a2", label: "45", tag: "i=2, parent", x: 2, y: 4, shape: "box", emphasis: "active" },
            { id: "a6", label: "25", tag: "i=6", x: 6, y: 4, shape: "box", emphasis: "new" },
          ],
          arrows: [{ from: "a6", to: "a2", label: "(6-1)//2", emphasis: "active" }],
        },
        caption: "`(6-1)//2 = 5//2 = 2`. Index 6's parent lives at index 2.",
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "Fill in the two index formulas so `left_child` and `right_child` compute a node's children from its array index.",
      code: [
        "def left_child(i):",
        "    return {{left}}",
        "",
        "def right_child(i):",
        "    return {{right}}",
      ].join("\n"),
      blanks: [
        {
          id: "left",
          placeholder: "___",
          answer: "2 * i + 1",
          explainWrong: "The left child always sits at `2 * i + 1`. Using just `2 * i`, or `2 * i + 2`, lands on the wrong slot in the array.",
        },
        {
          id: "right",
          placeholder: "___",
          answer: "2 * i + 2",
          explainWrong: "The right child sits one slot after the left child, at `2 * i + 2`, not `2 * i + 1`, which is the left child's formula.",
        },
      ],
      tests: [
        { name: "left_child(0) is 1", code: "assert left_child(0) == 1, \"left_child(0) should be 1: 2*0+1\"" },
        { name: "right_child(0) is 2", code: "assert right_child(0) == 2, \"right_child(0) should be 2: 2*0+2\"" },
        { name: "left_child(2) is 5", code: "assert left_child(2) == 5, \"left_child(2) should be 5: 2*2+1\"" },
        { name: "right_child(2) is 6", code: "assert right_child(2) == 6, \"right_child(2) should be 6: 2*2+2\"" },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "dsa-heaps.array-heap.1",
      prompt: "Why can a heap be stored as a plain array instead of a tree of linked nodes?",
      options: [
        "Because heaps never have more than a handful of elements",
        "Because the tree is always a complete shape, so parent/child positions are pure index math",
        "Because arrays are the only structure Python supports",
      ],
      correctIndex: 1,
      explainWrong:
        "Size has nothing to do with it, and Python supports plenty of other structures. The real reason is that a heap's shape is always a complete binary tree, so every parent and child position can be computed from its index alone, no pointers needed.",
    },
    {
      id: "dsa-heaps.array-heap.2",
      prompt: "What is the formula for the parent of the element at array index `i` (for `i > 0`)?",
      options: [
        "`(i - 1) // 2`",
        "`2 * i + 1`",
        "`i // 2 + 1`",
      ],
      correctIndex: 0,
      explainWrong:
        "`2 * i + 1` is the left CHILD formula, going the opposite direction. The parent of index `i` is `(i - 1) // 2`, using integer division to floor the result.",
    },
    {
      id: "dsa-heaps.array-heap.3",
      prompt: "For the element at array index `i`, what are the indices of its two children?",
      options: [
        "`i - 1` and `i + 1`",
        "`2 * i + 1` and `2 * i + 2`",
        "`i * 2` and `i * 3`",
      ],
      correctIndex: 1,
      explainWrong:
        "Neighboring indices, or arbitrary multiples, don't describe the heap's layout. The left child is always at `2 * i + 1`, and the right child at `2 * i + 2`.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: heapsort-pq — popping the max swaps root with the last element,
// shrinks the heap, then percolates the new root down; repeating this drains
// the heap into sorted order and is exactly how a priority queue behaves.
// ---------------------------------------------------------------------------

const heapsortPqUnit: Unit = {
  id: "heapsort-pq",
  title: "Popping the Max: Heapsort and Priority Queues",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "50", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n2", label: "45", x: 5, y: 1, shape: "circle" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n5", label: "35", x: 4, y: 2, shape: "circle" },
          { id: "n6", label: "25", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "n0", to: "n1" }, { from: "n0", to: "n2" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n2", to: "n5" }, { from: "n2", to: "n6" },
        ],
      },
      caption: "pop_max() must return 50, the root, the largest value in the heap. But after removing it, the tree needs repairing.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "25", tag: "swapped in", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n2", label: "45", x: 5, y: 1, shape: "circle" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n5", label: "35", x: 4, y: 2, shape: "circle" },
          { id: "out", label: "50", tag: "popped out", x: 6, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [
          { from: "n0", to: "n1" }, { from: "n0", to: "n2" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n2", to: "n5" },
        ],
      },
      caption: "Step 1 of pop: swap the root with the very last array element. 50 moves to the end, and 25 becomes the new, out-of-place root.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "25", tag: "misplaced root", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n2", label: "45", x: 5, y: 1, shape: "circle" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n5", label: "35", x: 4, y: 2, shape: "circle" },
          { id: "sorted1", label: "50", tag: "sorted output", x: 6, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "n0", to: "n1" }, { from: "n0", to: "n2" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n2", to: "n5" },
        ],
      },
      caption: "The swapped-out 50 leaves the heap for good, shrinking its size by one, and lands in a growing sorted output row.",
    },
    {
      state: {
        nodes: [
          { id: "n2", label: "45", tag: "swapped up", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n0", label: "25", tag: "glided down", x: 5, y: 1, shape: "circle", emphasis: "active" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n5", label: "35", x: 4, y: 2, shape: "circle" },
          { id: "sorted1", label: "50", tag: "sorted output", x: 6, y: 4, shape: "box" },
        ],
        arrows: [
          { from: "n2", to: "n1" }, { from: "n2", to: "n0", emphasis: "active" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n0", to: "n5" },
        ],
      },
      caption: "Percolate down: 25 is compared against both children, 30 and 45, and swaps with the LARGER one, 45. 25 glides one level down.",
    },
    {
      state: {
        nodes: [
          { id: "n2", label: "45", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n5", label: "35", tag: "swapped up", x: 5, y: 1, shape: "circle", emphasis: "new" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n0", label: "25", tag: "glided down again", x: 4, y: 2, shape: "circle", emphasis: "active" },
          { id: "sorted1", label: "50", tag: "sorted output", x: 6, y: 4, shape: "box" },
        ],
        arrows: [
          { from: "n2", to: "n1" }, { from: "n2", to: "n5" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n5", to: "n0", emphasis: "active" },
        ],
      },
      caption: "25 is still smaller than its new child, 35, so they swap again: 25 keeps gliding down until it has no bigger child left, or hits a leaf.",
    },
    {
      state: {
        nodes: [
          { id: "n2", label: "45", x: 3, y: 0, shape: "circle" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n5", label: "35", x: 5, y: 1, shape: "circle" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n0", label: "25", x: 4, y: 2, shape: "circle" },
          { id: "sorted1", label: "50", tag: "sorted output", x: 6, y: 4, shape: "box" },
        ],
        arrows: [
          { from: "n2", to: "n1" }, { from: "n2", to: "n5" },
          { from: "n1", to: "n3" }, { from: "n1", to: "n4" },
          { from: "n5", to: "n0" },
        ],
      },
      caption: "One full pop_max complete: the heap property holds again, and its new root, 45, is the next-largest value waiting to come out.",
    },
    {
      state: {
        nodes: [
          { id: "sorted1", label: "50", tag: "sorted output", x: 3, y: 4, shape: "box", emphasis: "dim" },
          { id: "sorted2", label: "45", tag: "sorted output", x: 4, y: 4, shape: "box", emphasis: "dim" },
          { id: "sorted3", label: "35", tag: "sorted output", x: 5, y: 4, shape: "box", emphasis: "new" },
          { id: "n1", label: "30", x: 1, y: 1, shape: "circle" },
          { id: "n3", label: "10", x: 0, y: 2, shape: "circle" },
          { id: "n4", label: "20", x: 2, y: 2, shape: "circle" },
          { id: "n0", label: "25", x: 3, y: 0, shape: "circle" },
        ],
        arrows: [{ from: "n0", to: "n1" }, { from: "n1", to: "n3" }, { from: "n1", to: "n4" }],
      },
      caption: "Repeating swap-root-with-last, shrink, percolate down, again and again, drains the whole heap into descending order. That's heapsort.",
    },
    {
      state: {
        nodes: [
          { id: "pq", label: "task_queue", tag: "priority queue", x: 3, y: 1, shape: "frame", emphasis: "new" },
          { id: "t1", label: "urgent (50)", x: 1, y: 3, shape: "box" },
          { id: "t2", label: "normal (30)", x: 3, y: 3, shape: "box" },
          { id: "t3", label: "low (10)", x: 5, y: 3, shape: "box" },
        ],
        arrows: [{ from: "pq", to: "t1", label: "pop() first", emphasis: "active" }],
      },
      caption: "This is exactly what a priority queue is: push adds any priority, pop always removes the highest one first, using a heap underneath.",
    },
    {
      state: {
        nodes: [
          { id: "treap", label: "42", tag: "heap key: 0.83 (random)", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "tl", label: "17", tag: "heap key: 0.61", x: 1, y: 2, shape: "circle" },
          { id: "tr", label: "88", tag: "heap key: 0.44", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [{ from: "treap", to: "tl" }, { from: "treap", to: "tr" }],
      },
      caption: "A treap layers a random heap priority on top of normal BST key ordering (17 < 42 < 88), keeping the tree probabilistically balanced without rotations.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "A max-heap's root is popped: root and last element are swapped, and the old root value is removed. What must happen next, before any other operation?",
      steps: [
        {
          state: {
            nodes: [
              { id: "root", label: "?", tag: "misplaced", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "l", label: "?", x: 1, y: 1, shape: "circle" },
              { id: "r", label: "?", x: 5, y: 1, shape: "circle" },
            ],
            arrows: [{ from: "root", to: "l" }, { from: "root", to: "r" }],
          },
          caption: "The swapped-in value now sits at the root, possibly violating the heap property.",
        },
      ],
      options: [
        { id: "a", label: "Percolate the new root down, swapping with its larger child until it settles" },
        { id: "b", label: "Nothing; the heap stays correct as-is after the swap" },
        { id: "c", label: "Bubble the new root up toward wherever the swapped-out value used to point" },
      ],
      correctId: "a",
      explainWrong: {
        b: "The swap only fixes the size of the array; it does nothing to guarantee the new root is still the largest value. Skipping repair would leave the heap invalid for the next pop.",
        c: "Bubbling up is what insert does with a new leaf value. A misplaced ROOT needs to move DOWN toward its correct level, comparing against its children, not up.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "root", label: "?", tag: "swapped with larger child", x: 5, y: 1, shape: "circle", emphasis: "active" },
            { id: "child", label: "?", tag: "moved to root", x: 3, y: 0, shape: "circle", emphasis: "new" },
          ],
          arrows: [{ from: "child", to: "root", emphasis: "active" }],
        },
        caption: "Percolate down: compare against both children, swap with the larger one if it's bigger, and repeat until the property holds.",
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "Fill in which child `percolate_down` should compare against and swap with, when both children exist.",
      code: [
        "def pick_swap_child(left_value, right_value):",
        "    # percolate_down always swaps with whichever child is {{choice}}",
        "    return max(left_value, right_value)",
      ].join("\n"),
      blanks: [
        {
          id: "choice",
          placeholder: "___",
          answer: "larger",
          explainWrong:
            "Swapping with the smaller child would push a small value up and could still leave a bigger child above a smaller parent. `percolate_down` always compares against, and swaps with, whichever child is LARGER.",
        },
      ],
      tests: [
        { name: "pick_swap_child(30, 45) is 45", code: "assert pick_swap_child(30, 45) == 45, \"pick_swap_child(30, 45) should be 45: percolate_down swaps with the larger child\"" },
        { name: "pick_swap_child(60, 10) is 60", code: "assert pick_swap_child(60, 10) == 60, \"pick_swap_child(60, 10) should be 60: 60 is larger than 10\"" },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-heaps.heapsort-pq.1",
      prompt: "What are the two steps of popping the max from a max-heap, in order?",
      options: [
        "Remove the root directly, then insert a new value at the end",
        "Swap the root with the last element and shrink the heap, then percolate the new root down",
        "Sort the whole array, then take the first element",
      ],
      correctIndex: 1,
      explainWrong:
        "Removing the root directly would leave a hole in the middle of the array, and sorting the whole array every pop would be far too slow. The actual steps: swap root with the last element, shrink by one, then percolate the new root down.",
    },
    {
      id: "dsa-heaps.heapsort-pq.2",
      prompt: "Why does repeatedly popping the max from a heap produce a sorted list?",
      options: [
        "Each pop returns the current largest remaining value, so values come out in descending order",
        "Popping happens to sort things as a side effect of shrinking the array",
        "It doesn't; the output order depends on insertion order",
      ],
      correctIndex: 0,
      explainWrong:
        "It's not a side effect and it's not order-dependent. Every single pop is guaranteed to return whatever is currently the LARGEST value left in the heap, so popping repeatedly naturally produces descending sorted order. That's heapsort.",
    },
    {
      id: "dsa-heaps.heapsort-pq.3",
      prompt: "How does a priority queue relate to a heap?",
      options: [
        "They're unrelated; a priority queue is built from a linked list",
        "A priority queue is the ADT (push highest priority in, pop highest priority out), and a heap is the usual structure used to implement it efficiently",
        "A priority queue is just another name for a plain FIFO queue",
      ],
      correctIndex: 1,
      explainWrong:
        "A priority queue isn't a FIFO queue at all, and it's not naturally built from a linked list either. It's an abstract data type where pop always returns the highest-priority item, and a heap gives an efficient way to support both push and pop for that ADT.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-heaps — index math and heapq.nsmallest in practice.
// ---------------------------------------------------------------------------

const applyHeapsUnit: Unit = {
  id: "apply-heaps",
  title: "Apply: Index Math and heapq",
  watch: [
    {
      state: {
        nodes: [
          { id: "a0", label: "50", tag: "i=0", x: 0, y: 1, shape: "box" },
          { id: "a1", label: "30", tag: "i=1", x: 1, y: 1, shape: "box" },
          { id: "a2", label: "45", tag: "i=2", x: 2, y: 1, shape: "box" },
          { id: "fn", label: "parent(2) -> 0", tag: "(2-1)//2", x: 3, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "a2", to: "fn", emphasis: "active" }],
      },
      caption: "The same parent/child index math from this chapter becomes a small, testable Python function.",
    },
    {
      state: {
        nodes: [
          { id: "nums", label: "[9, 3, 7, 1, 5]", tag: "heapq.nsmallest(2, nums)", x: 2, y: 1, shape: "box", emphasis: "new" },
          { id: "out", label: "[1, 3]", tag: "2 smallest", x: 5, y: 1, shape: "box", emphasis: "active" },
        ],
        arrows: [{ from: "nums", to: "out", emphasis: "active" }],
      },
      caption: "Python's built-in heapq module already implements a heap; heapq.nsmallest(k, nums) hands back the k smallest values, in order.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given an index `i` into an array-backed heap, return the index of `i`'s parent using the standard heap formula. Then, given a list `nums` and an integer `k`, return the `k` smallest values from `nums` in ascending order, using Python's `heapq` module.",
      difficulty: "Easy",
      examples: [
        { input: "`i = 6`", output: "`2`", explanation: "`(6-1)//2` floors to `2`." },
        { input: "`nums = [9, 3, 7, 1, 5]`, `k = 2`", output: "`[1, 3]`", explanation: "The two smallest values, ascending." },
      ],
      constraints: ["`0 <= i` (a valid array index)", "`1 <= k <= len(nums)`"],
      bigO: { fn: "k_smallest", answer: "O(n log n)", explain: "`parent_index` is `O(1)` index math, but the dominant call is `heapq.nsmallest`, which is `O(n log k)`; closest offered option is `O(n log n)`." },
      starter:
        "import heapq\n\ndef parent_index(i):\n    # your code here\n    pass\n\ndef k_smallest(nums, k):\n    # use heapq to return the k smallest values from nums, ascending\n    pass\n",
      solution:
        "import heapq\n\ndef parent_index(i):\n    return (i - 1) // 2\n\ndef k_smallest(nums, k):\n    return heapq.nsmallest(k, nums)\n",
      tests: [
        { name: "parent_index(1) is 0", code: "assert parent_index(1) == 0, \"parent_index(1) should be 0: (1-1)//2\"" },
        { name: "parent_index(6) is 2", code: "assert parent_index(6) == 2, \"parent_index(6) should be 2: (6-1)//2\"" },
        {
          name: "k_smallest picks the smallest values",
          code: "assert k_smallest([9, 3, 7, 1, 5], 2) == [1, 3], \"k_smallest([9, 3, 7, 1, 5], 2) should be [1, 3]: the two smallest values, ascending\"",
        },
        {
          name: "k_smallest with k equal to the whole list",
          code: "assert k_smallest([4, 2, 8], 3) == [2, 4, 8], \"k_smallest([4, 2, 8], 3) should be [2, 4, 8]: all values, fully sorted ascending\"",
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-heaps.apply-heaps.1",
      prompt: "What does `heapq.nsmallest(k, nums)` return?",
      options: [
        "The `k` smallest values from `nums`, in ascending order",
        "The single smallest value, repeated `k` times",
        "The whole list `nums`, unchanged",
      ],
      correctIndex: 0,
      explainWrong:
        "It's not a repeated single value or a no-op. `heapq.nsmallest(k, nums)` uses a heap internally to efficiently find and return exactly the `k` smallest values from `nums`, sorted ascending.",
    },
    {
      id: "dsa-heaps.apply-heaps.2",
      prompt: "Why write `parent_index(i)` as `(i - 1) // 2` instead of `(i - 1) / 2`?",
      options: [
        "`//` performs integer division, flooring to a whole index; `/` would give a float, which isn't a valid array index",
        "There's no difference; both always give the same result",
        "`/` is faster to compute than `//`",
      ],
      correctIndex: 0,
      explainWrong:
        "They do give different results whenever `(i - 1)` is odd, and speed isn't the issue here. `/` produces a float like `2.5`, which can't be used to index an array; `//` floors that down to a valid integer index like `2`.",
    },
  ],
};

export const chDsaHeaps: Chapter = {
  id: "dsa-heaps",
  phase: 2,
  title: "Heaps and Priority Queues",
  units: [heapPropertyUnit, arrayHeapUnit, heapsortPqUnit, applyHeapsUnit],
};
