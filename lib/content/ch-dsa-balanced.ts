import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: why-balance — a vine BST forces a walk through every node; a
// balanced tree reaches the same answer in far fewer steps.
// ---------------------------------------------------------------------------

const whyBalanceUnit: Unit = {
  id: "why-balance",
  title: "Vine vs Balanced: Same Data, Different Cost",
  watch: [
    {
      state: {
        nodes: [
          { id: "n1", label: "1", tag: "root", x: 0, y: 0, shape: "circle" },
          { id: "n2", label: "2", x: 1, y: 1, shape: "circle" },
          { id: "n3", label: "3", x: 2, y: 2, shape: "circle" },
          { id: "n4", label: "4", x: 3, y: 3, shape: "circle" },
          { id: "n5", label: "5", tag: "search target", x: 4, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "n1", to: "n2" },
          { from: "n2", to: "n3" },
          { from: "n3", to: "n4" },
          { from: "n4", to: "n5" },
        ],
      },
      caption: "Values 1 through 5 inserted in increasing order build a vine: every node has exactly one child. Searching for 5 means walking every single node.",
    },
    {
      state: {
        nodes: [
          { id: "n1", label: "1", tag: "step 1", x: 0, y: 0, shape: "circle", emphasis: "active" },
          { id: "n2", label: "2", tag: "step 2", x: 1, y: 1, shape: "circle" },
          { id: "n3", label: "3", tag: "step 3", x: 2, y: 2, shape: "circle" },
          { id: "n4", label: "4", tag: "step 4", x: 3, y: 3, shape: "circle" },
          { id: "n5", label: "5", tag: "step 5, found", x: 4, y: 4, shape: "circle" },
        ],
        arrows: [
          { from: "n1", to: "n2" },
          { from: "n2", to: "n3" },
          { from: "n3", to: "n4" },
          { from: "n4", to: "n5" },
        ],
      },
      caption: "Searching the vine for 5 takes 5 comparisons: every value is greater than the last, so the search never gets to skip anything.",
    },
    {
      state: {
        nodes: [
          { id: "b3", label: "3", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "b1", label: "1", x: 1, y: 2, shape: "circle" },
          { id: "b4", label: "4", x: 5, y: 2, shape: "circle" },
          { id: "b2", label: "2", x: 2, y: 4, shape: "circle" },
          { id: "b5", label: "5", tag: "search target", x: 6, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "b3", to: "b1" },
          { from: "b3", to: "b4" },
          { from: "b1", to: "b2" },
          { from: "b4", to: "b5" },
        ],
      },
      caption: "The exact same five values, arranged in a balanced shape instead, spread out into two short branches rather than one long chain.",
    },
    {
      state: {
        nodes: [
          { id: "b3", label: "3", tag: "step 1", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "b4", label: "4", tag: "step 2", x: 5, y: 2, shape: "circle" },
          { id: "b5", label: "5", tag: "step 3, found", x: 6, y: 4, shape: "circle" },
        ],
        arrows: [
          { from: "b3", to: "b4" },
          { from: "b4", to: "b5" },
        ],
      },
      caption: "Searching the balanced tree for 5 takes only 3 comparisons, not 5: each step eliminates roughly half of what's left, instead of just one node.",
    },
    {
      state: {
        nodes: [
          { id: "vine", label: "vine: height 4, worst case O(n)", tag: "5 nodes", x: 2, y: 0, shape: "frame", emphasis: "error" },
          { id: "bal", label: "balanced: height 2, worst case O(log n)", tag: "5 nodes", x: 2, y: 2, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Same 5 nodes, same values: the vine's height grows with every insert, while the balanced tree's height grows far more slowly, which is exactly the gap balanced trees are built to close.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A BST holds 7 values as a vine (each node has exactly one child). How many comparisons does searching for the deepest value take, worst case?",
      steps: [
        {
          state: {
            nodes: [{ id: "info", label: "vine of 7 nodes", tag: "shape", x: 3, y: 1, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "A vine has no branching: it's really just a linked list wearing a tree's clothing.",
        },
      ],
      options: [
        { id: "a", label: "About `log2(7)`, roughly 3" },
        { id: "b", label: "7, one per node" },
        { id: "c", label: "1, since BSTs are always fast" },
        { id: "d", label: "`0`" },
      ],
      correctId: "b",
      explainWrong: {
        a: "`log2(7)` is the cost in a balanced tree of 7 nodes, not a vine; a vine has no branching to cut the search space in half at each step.",
        c: "BSTs are only fast when they're reasonably balanced; a vine is the worst possible shape a BST can take, and searching it costs just as much as a linked list.",
        d: "Reaching the deepest node still requires visiting every node above it on the way down; the search can't skip straight there.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "cost", label: "7 comparisons, one per node", tag: "worst case", x: 3, y: 1, shape: "frame", emphasis: "error" }],
          arrows: [],
        },
        caption: "A vine of 7 nodes forces the search to walk every node in order, exactly like a linked list: 7 comparisons in the worst case.",
      },
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: "A vine has 8 nodes, each with exactly one child except the last. Fill in the subtraction so `vine_height` computes its height correctly.",
      code: ["nodes = 8", "vine_height = nodes {{op}} 1"].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "-",
          explainWrong:
            "A vine of `n` nodes has height `n - 1`: height counts edges, and a chain of `n` nodes has exactly `n - 1` edges connecting them. Adding or multiplying instead would not match how height is counted along a single unbranched chain.",
        },
      ],
      tests: [
        { name: "vine height is nodes minus 1", code: "assert vine_height == 7, \"a vine of 8 nodes should have height 7: nodes - 1\"" },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-balanced-trees.why-balance.1",
      prompt: "Why can searching a vine-shaped BST cost as much as searching an unsorted linked list?",
      options: [
        "Because a vine has no branching: every node has just one child, so the search must walk each one in turn",
        "Because vines store values unsorted",
        "Because vines always have more nodes than balanced trees",
      ],
      correctIndex: 0,
      explainWrong:
        "A vine's values are still perfectly BST-ordered; the problem isn't sorting or node count, both trees here have the same values. It's the shape: no branching means no way to skip past half the tree at each step, exactly like a linked list.",
    },
    {
      id: "dsa-balanced-trees.why-balance.2",
      prompt: "What does keeping a tree balanced actually guarantee?",
      options: [
        "That height stays close to `log2(n)`, keeping search, insert, and remove fast even as n grows",
        "That every value is stored in sorted array order",
        "That no rotations are ever needed again",
      ],
      correctIndex: 0,
      explainWrong:
        "A balanced BST isn't stored as a sorted array, and balance is an ongoing property maintained through rotations, not something achieved once and then never revisited. The real guarantee is a height that scales with `log2(n)` instead of `n`.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: avl-rotations — balance factors flag imbalance; LL triggers a
// single right rotation, LR triggers a double rotation.
// ---------------------------------------------------------------------------

const avlRotationsUnit: Unit = {
  id: "avl-rotations",
  title: "Balance Factor Triggers a Rotation",
  watch: [
    {
      state: {
        nodes: [
          { id: "n30", label: "30", tag: "bf = 0", x: 3, y: 0, shape: "circle" },
          { id: "n20", label: "20", tag: "bf = 0", x: 1, y: 2, shape: "circle" },
          { id: "n10", label: "10", tag: "bf = 0", x: 0, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "n30", to: "n20" },
          { from: "n20", to: "n10" },
        ],
      },
      caption: "10 is inserted, making 20's left subtree one taller than its (empty) right: 20's balance factor is fine, but 30's is now off.",
    },
    {
      state: {
        nodes: [
          { id: "n30", label: "30", tag: "bf = +2, imbalance!", x: 3, y: 0, shape: "circle", emphasis: "error" },
          { id: "n20", label: "20", tag: "bf = +1", x: 1, y: 2, shape: "circle" },
          { id: "n10", label: "10", tag: "bf = 0", x: 0, y: 4, shape: "circle" },
        ],
        arrows: [
          { from: "n30", to: "n20" },
          { from: "n20", to: "n10" },
        ],
      },
      caption: "30's balance factor, left height minus right height, is now +2: outside the allowed range of -1 to +1. This is the LL case: the heavy side is the left child's left subtree.",
    },
    {
      state: {
        nodes: [
          { id: "n30", label: "30", tag: "rotating right", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "n20", label: "20", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "n10", label: "10", x: 0, y: 4, shape: "circle" },
        ],
        arrows: [
          { from: "n30", to: "n20" },
          { from: "n20", to: "n10" },
        ],
      },
      caption: "An LL imbalance is fixed with a single right rotation: 20 rotates up to take 30's place, and 30 glides down to become 20's right child.",
    },
    {
      state: {
        nodes: [
          { id: "n20", label: "20", tag: "new root, bf = 0", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "n10", label: "10", tag: "bf = 0", x: 1, y: 2, shape: "circle" },
          { id: "n30", label: "30", tag: "bf = 0", x: 5, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "n20", to: "n10" },
          { from: "n20", to: "n30" },
        ],
      },
      caption: "After the right rotation: 20 is the new root, with 10 on its left and 30 on its right. Every balance factor is back within range.",
    },
    {
      state: {
        nodes: [
          { id: "m30", label: "30", tag: "bf = +2, imbalance!", x: 3, y: 0, shape: "circle", emphasis: "error" },
          { id: "m10", label: "10", tag: "bf = -1", x: 1, y: 2, shape: "circle" },
          { id: "m20", label: "20", x: 2, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "m30", to: "m10" },
          { from: "m10", to: "m20" },
        ],
      },
      caption: "A different insert order: now 30's left child is 10, but the heavy grandchild, 20, hangs off 10's RIGHT. This is the LR case, not LL: a single right rotation alone would not fix it.",
    },
    {
      state: {
        nodes: [
          { id: "m30", label: "30", tag: "still imbalanced", x: 3, y: 0, shape: "circle", emphasis: "error" },
          { id: "m20", label: "20", tag: "first: rotate 10 left", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "m10", label: "10", x: 0, y: 4, shape: "circle", emphasis: "active" },
        ],
        arrows: [{ from: "m30", to: "m20" }],
      },
      caption: "The double rotation's first step: rotate 10 left, so 20 takes 10's place as 30's left child, and 10 becomes 20's left child instead.",
    },
    {
      state: {
        nodes: [
          { id: "m20", label: "20", tag: "new root, bf = 0", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "m10", label: "10", tag: "bf = 0", x: 1, y: 2, shape: "circle" },
          { id: "m30", label: "30", tag: "bf = 0", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "m20", to: "m10" },
          { from: "m20", to: "m30" },
        ],
      },
      caption: "Second step: rotate 30 right, same as the LL case. 20 ends up as the new root with 10 and 30 as its two children: the subtree handoff between them is explicit at each step.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A node has balance factor `+2`, and its left child has balance factor `+1` (heavier on the left). What rotation fixes this?",
      steps: [
        {
          state: {
            nodes: [
              { id: "n", label: "bf = +2", tag: "imbalanced", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "lc", label: "bf = +1", tag: "left child", x: 1, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [{ from: "n", to: "lc" }],
          },
          caption: "The heavy side is the left child, and that child is itself heavier on its own left: LL shape.",
        },
      ],
      options: [
        { id: "a", label: "A single right rotation" },
        { id: "b", label: "A single left rotation" },
        { id: "c", label: "A left-right double rotation" },
        { id: "d", label: "No rotation needed" },
      ],
      correctId: "a",
      explainWrong: {
        b: "A left rotation is used to fix right-heavy (RR) imbalances; this node is left-heavy, so a left rotation would push it further out of balance, not fix it.",
        c: "A double rotation is needed only when the heavy grandchild sits on the opposite side from the heavy child, an LR or RL shape; here the left child is heavy on its OWN left too, so a single rotation suffices.",
        d: "A balance factor of `+2` is outside the allowed `-1` to `+1` range, so this is a real imbalance that must be corrected before this subtree is a valid AVL tree again.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "fixed", label: "single right rotation applied", tag: "balanced", x: 3, y: 1, shape: "frame", emphasis: "active" }],
          arrows: [],
        },
        caption: "Since both the node and its left child lean left, LL, one single right rotation restores balance in one step.",
      },
      reviewStep: 1,
    },
    {
      kind: "predict",
      prompt: "A node has balance factor `+2`, but its left child has balance factor `-1` (heavier on the RIGHT, opposite side). What shape is this, and what fixes it?",
      steps: [
        {
          state: {
            nodes: [
              { id: "n", label: "bf = +2", tag: "imbalanced", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "lc", label: "bf = -1", tag: "left child, heavy on right", x: 1, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [{ from: "n", to: "lc" }],
          },
          caption: "The heavy child leans one way, but its own heavy grandchild leans the opposite way: a zigzag shape.",
        },
      ],
      options: [
        { id: "a", label: "LR shape; needs a left-right double rotation" },
        { id: "b", label: "LL shape; needs a single right rotation" },
        { id: "c", label: "RR shape; needs a single left rotation" },
        { id: "d", label: "It's already balanced" },
      ],
      correctId: "a",
      explainWrong: {
        b: "LL would require the left child to ALSO be heavy on its own left; here it's heavy on the right instead, which makes this a zigzag LR shape, not a straight LL one.",
        c: "The overall imbalance is on the LEFT side of the node (bf = `+2`, not `-2`); calling this RR mixes up which side is heavy.",
        d: "A balance factor of `+2` on the node is outside the `-1` to `+1` allowed range, so this subtree is genuinely imbalanced and needs correcting.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "fixed", label: "double rotation: rotate left child left, then node right", tag: "balanced", x: 3, y: 1, shape: "frame", emphasis: "active" }],
          arrows: [],
        },
        caption: "This zigzag, LR, shape needs a double rotation: first rotate the left child left, then rotate the whole node right.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the comparison so `is_balanced` correctly flags any AVL node whose balance factor has drifted outside the allowed range.",
      code: [
        "def is_balanced(balance_factor):",
        "    return {{lo}} <= balance_factor <= 1",
      ].join("\n"),
      blanks: [
        {
          id: "lo",
          placeholder: "___",
          answer: "-1",
          explainWrong:
            "AVL trees allow a balance factor anywhere from `-1` to `+1`. Using `0` or `-2` as the lower bound would either reject valid balanced nodes or fail to catch a real imbalance.",
        },
      ],
      tests: [
        { name: "balanced at -1", code: "assert is_balanced(-1) is True, \"a balance factor of -1 is within the allowed AVL range\"" },
        { name: "balanced at 0", code: "assert is_balanced(0) is True, \"a balance factor of 0 is perfectly balanced\"" },
        { name: "imbalanced at +2", code: "assert is_balanced(2) is False, \"a balance factor of +2 is outside the allowed range and needs a rotation\"" },
        { name: "imbalanced at -2", code: "assert is_balanced(-2) is False, \"a balance factor of -2 is outside the allowed range and needs a rotation\"" },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-balanced-trees.avl-rotations.1",
      prompt: "In an AVL tree, what does a node's balance factor measure?",
      options: [
        "The height of its left subtree minus the height of its right subtree",
        "The total number of nodes in the tree",
        "How many rotations have been performed so far",
      ],
      correctIndex: 0,
      explainWrong:
        "Balance factor is a per-node, per-subtree measurement, not a whole-tree node count or a running rotation tally. It's specifically left subtree height minus right subtree height at that node.",
    },
    {
      id: "dsa-balanced-trees.avl-rotations.2",
      prompt: "When is a single rotation enough to fix an AVL imbalance, versus needing a double rotation?",
      options: [
        "A single rotation suffices when the heavy child leans the same direction as the node (LL or RR); a double rotation is needed when they lean opposite ways (LR or RL)",
        "A single rotation is always enough",
        "A double rotation is always required, regardless of shape",
      ],
      correctIndex: 0,
      explainWrong:
        "Neither extreme is correct: the number of rotations needed depends entirely on shape. Matching leans (LL or RR) need just one rotation; opposite leans (LR or RL), a zigzag, need two.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: red-black-basics — colors as tags; root is always black; a
// red-red violation gets fixed by recoloring or rotating.
// ---------------------------------------------------------------------------

const redBlackBasicsUnit: Unit = {
  id: "red-black-basics",
  title: "Colors Keep the Tree Roughly Balanced",
  watch: [
    {
      state: {
        nodes: [
          { id: "r", label: "20", tag: "B", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "10", tag: "R", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "30", tag: "R", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
        ],
      },
      caption: "A red-black tree tags each node R or B. The root, 20, is always black; here its two children are both red, which is perfectly valid.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "20", tag: "B", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "10", tag: "R", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "30", tag: "R", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "newkey", label: "5", tag: "R, inserting", x: 0, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "l", to: "newkey", emphasis: "active" }],
      },
      caption: "Inserting 5 as a new leaf: new nodes are always inserted red first.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "20", tag: "B", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "10", tag: "R", x: 1, y: 2, shape: "circle", emphasis: "error" },
          { id: "newkey", label: "5", tag: "R, red-red violation!", x: 0, y: 4, shape: "circle", emphasis: "error" },
        ],
        arrows: [{ from: "l", to: "newkey", emphasis: "error" }],
      },
      caption: "5 (red) now sits directly under 10 (also red): a red-red violation. The rule is simple: a red node can never have a red child.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "20", tag: "B", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "10", tag: "B, recolored", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "rt", label: "30", tag: "B, recolored", x: 5, y: 2, shape: "circle", emphasis: "new" },
          { id: "newkey", label: "5", tag: "R", x: 0, y: 4, shape: "circle" },
        ],
        arrows: [{ from: "l", to: "newkey" }],
      },
      caption: "Since 30, 10's sibling, is also red, the fix is a plain recolor: flip 10 and 30 to black, and the root stays black too. No rotation needed here.",
    },
    {
      state: {
        nodes: [
          { id: "r2", label: "20", tag: "B", x: 3, y: 0, shape: "circle" },
          { id: "l2", label: "10", tag: "R", x: 1, y: 2, shape: "circle", emphasis: "error" },
          { id: "rt2", label: "30", tag: "B", x: 5, y: 2, shape: "circle" },
          { id: "newkey2", label: "5", tag: "R, red-red violation!", x: 0, y: 4, shape: "circle", emphasis: "error" },
        ],
        arrows: [{ from: "l2", to: "newkey2", emphasis: "error" }],
      },
      caption: "Same violation, but this time 30, the sibling, is black, not red: recoloring alone won't fix a violation when the sibling is black.",
    },
    {
      state: {
        nodes: [
          { id: "l2", label: "10", tag: "rotating", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "newkey2", label: "5", tag: "rotating up", x: 0, y: 4, shape: "circle", emphasis: "active" },
        ],
        arrows: [{ from: "l2", to: "newkey2" }],
      },
      caption: "With a black sibling, the fix is a rotation instead: 5 rotates up to take 10's place, just like an AVL rotation reshapes the subtree.",
    },
    {
      state: {
        nodes: [
          { id: "r3", label: "20", tag: "B", x: 3, y: 0, shape: "circle" },
          { id: "n5", label: "5", tag: "B, new subtree root", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "n10", label: "10", tag: "R", x: 2, y: 4, shape: "circle", emphasis: "new" },
          { id: "rt3", label: "30", tag: "B", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "r3", to: "n5" },
          { from: "n5", to: "n10" },
          { from: "r3", to: "rt3" },
        ],
      },
      caption: "After the rotation, 5 becomes black and 10 becomes red beneath it: no red node has a red child anymore, and the tree is valid again.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "In a red-black tree, what color must the root always be?",
      steps: [
        {
          state: {
            nodes: [{ id: "r", label: "root", tag: "?", x: 3, y: 1, shape: "circle", emphasis: "new" }],
            arrows: [],
          },
          caption: "One of the red-black rules concerns the root specifically.",
        },
      ],
      options: [
        { id: "a", label: "Black" },
        { id: "b", label: "Red" },
        { id: "c", label: "Either color, it doesn't matter" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Red is never allowed for the root; that's one of the core red-black invariants, checked and enforced after every insertion.",
        c: "The root's color is not arbitrary; it's a required invariant. A red root would need to be recolored to black immediately.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "r", label: "root", tag: "B", x: 3, y: 1, shape: "circle", emphasis: "active" }],
          arrows: [],
        },
        caption: "The root is always black; if an operation ever makes it red, it gets recolored back to black as a fixup step.",
      },
      reviewStep: 0,
    },
    {
      kind: "predict",
      prompt: "A newly inserted red node creates a red-red violation with its red parent. The parent's sibling (the uncle) is also red. What's the fix?",
      steps: [
        {
          state: {
            nodes: [
              { id: "gp", label: "grandparent", tag: "B", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "parent", label: "parent", tag: "R, violation", x: 1, y: 2, shape: "circle", emphasis: "error" },
              { id: "uncle", label: "uncle", tag: "R", x: 5, y: 2, shape: "circle", emphasis: "new" },
              { id: "child", label: "new node", tag: "R", x: 0, y: 4, shape: "circle", emphasis: "error" },
            ],
            arrows: [
              { from: "gp", to: "parent" },
              { from: "gp", to: "uncle" },
              { from: "parent", to: "child" },
            ],
          },
          caption: "Both parent and uncle are red; the grandparent is black.",
        },
      ],
      options: [
        { id: "a", label: "Recolor parent and uncle to black, grandparent to red" },
        { id: "b", label: "Rotate the parent" },
        { id: "c", label: "Do nothing, this is already valid" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Rotation is the fix when the uncle is black, not red; with a red uncle, a plain recolor resolves the violation without touching the tree's structure at all.",
        c: "A red node, parent, directly above another red node, the new child, is exactly the red-red violation this tree needs to fix; it can't be left as is.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "gp", label: "grandparent", tag: "R", x: 3, y: 0, shape: "circle", emphasis: "new" },
            { id: "parent", label: "parent", tag: "B", x: 1, y: 2, shape: "circle", emphasis: "new" },
            { id: "uncle", label: "uncle", tag: "B", x: 5, y: 2, shape: "circle", emphasis: "new" },
          ],
          arrows: [
            { from: "gp", to: "parent" },
            { from: "gp", to: "uncle" },
          ],
        },
        caption: "Recoloring parent and uncle to black and grandparent to red fixes the local violation, though if the grandparent's own parent is also red, the fix may need to propagate further up.",
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing color so `has_red_red_violation` correctly detects when a red node has a red child.",
      code: [
        "def has_red_red_violation(node_color, child_color):",
        "    return node_color == '{{color}}' and child_color == 'R'",
      ].join("\n"),
      blanks: [
        {
          id: "color",
          placeholder: "___",
          answer: "R",
          explainWrong:
            "A red-red violation specifically means a red node has a red child, so `node_color` must be checked against `'R'`. Checking against `'B'` would never detect the violation, since a black node is always allowed to have a red child.",
        },
      ],
      tests: [
        { name: "detects red-red violation", code: "assert has_red_red_violation('R', 'R') is True, \"a red node with a red child is a violation\"" },
        { name: "black parent is fine", code: "assert has_red_red_violation('B', 'R') is False, \"a black node with a red child is perfectly valid\"" },
        { name: "black child is fine", code: "assert has_red_red_violation('R', 'B') is False, \"a red node with a black child is perfectly valid\"" },
      ],
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-balanced-trees.red-black-basics.1",
      prompt: "What color must the root of a red-black tree always be?",
      options: ["Black", "Red", "Whatever color it was inserted as"],
      correctIndex: 0,
      explainWrong:
        "The root's color is a fixed invariant, not something left as-is from insertion. Red-black trees always force the root to black, recoloring it if a fixup ever makes it red.",
    },
    {
      id: "dsa-balanced-trees.red-black-basics.2",
      prompt: "What is the fundamental rule a red-black tree can never violate?",
      options: [
        "A red node can never have a red child",
        "A black node can never have a black child",
        "Every leaf must be red",
      ],
      correctIndex: 0,
      explainWrong:
        "Black nodes having black children is completely normal and expected. The rule that must always hold is the opposite pairing: no red node may ever have a red child.",
    },
    {
      id: "dsa-balanced-trees.red-black-basics.3",
      prompt: "When fixing a red-red violation, what decides whether the fix is a recolor or a rotation?",
      options: [
        "Whether the uncle (the parent's sibling) is red or black",
        "Whether the tree has more than 10 nodes",
        "Whether the violation is at the root",
      ],
      correctIndex: 0,
      explainWrong:
        "Node count and whether the violation happens to be at the root don't determine the fix. The deciding factor is the uncle's color: red means recolor is enough, black means a rotation is needed.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-balanced — predict-heavy application: pick the rotation,
// fill in balance factor math, no Python writing required.
// ---------------------------------------------------------------------------

const applyBalancedUnit: Unit = {
  id: "apply-balanced",
  title: "Apply: Diagnose and Pick the Fix",
  watch: [
    {
      state: {
        nodes: [
          { id: "n", label: "50", tag: "bf = -2", x: 3, y: 0, shape: "circle", emphasis: "error" },
          { id: "rc", label: "70", tag: "bf = -1", x: 5, y: 2, shape: "circle" },
          { id: "rrc", label: "80", x: 6, y: 4, shape: "circle" },
        ],
        arrows: [
          { from: "n", to: "rc" },
          { from: "rc", to: "rrc" },
        ],
      },
      caption: "50 is heavy on the right (bf = -2), and its right child, 70, is also heavy on the right: an RR shape, the mirror image of LL.",
    },
    {
      state: {
        nodes: [
          { id: "rc2", label: "70", tag: "new root, bf = 0", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "n2", label: "50", tag: "bf = 0", x: 1, y: 2, shape: "circle" },
          { id: "rrc2", label: "80", tag: "bf = 0", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "rc2", to: "n2" },
          { from: "rc2", to: "rrc2" },
        ],
      },
      caption: "An RR imbalance is fixed with a single left rotation: 70 rotates up, 50 glides down to become its left child.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "Node 50 has balance factor `-2`. Its right child, 70, has balance factor `-1` (also right-heavy). Which rotation fixes this?",
      steps: [
        {
          state: {
            nodes: [
              { id: "n", label: "50", tag: "bf = -2", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "rc", label: "70", tag: "bf = -1", x: 5, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [{ from: "n", to: "rc" }],
          },
          caption: "Both the node and its right child lean right: a straight RR shape.",
        },
      ],
      options: [
        { id: "a", label: "Single left rotation" },
        { id: "b", label: "Single right rotation" },
        { id: "c", label: "Right-left double rotation" },
        { id: "d", label: "No fix needed" },
      ],
      correctId: "a",
      explainWrong: {
        b: "A right rotation fixes left-heavy (LL) imbalances; this node is right-heavy, so a right rotation would make the imbalance worse, not better.",
        c: "A double rotation is only needed when the heavy grandchild leans the opposite direction from the heavy child; here both 50 and 70 lean the same way, right, so a single rotation is enough.",
        d: "A balance factor of `-2` is outside the allowed `-1` to `+1` range: this is a genuine imbalance that must be corrected.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "fixed", label: "single left rotation applied", tag: "balanced", x: 3, y: 1, shape: "frame", emphasis: "active" }],
          arrows: [],
        },
        caption: "Since both 50 and 70 lean right, RR, a single left rotation restores balance in one step.",
      },
      reviewStep: 1,
    },
    {
      kind: "predict",
      prompt: "Node 50 has balance factor `-2`. Its right child, 70, has balance factor `+1` (heavy on its LEFT, opposite side). What fixes this?",
      steps: [
        {
          state: {
            nodes: [
              { id: "n", label: "50", tag: "bf = -2", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "rc", label: "70", tag: "bf = +1, heavy left", x: 5, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [{ from: "n", to: "rc" }],
          },
          caption: "50 leans right overall, but its right child, 70, leans left: a zigzag, RL shape.",
        },
      ],
      options: [
        { id: "a", label: "Right-left double rotation: rotate 70 right, then 50 left" },
        { id: "b", label: "Single left rotation only" },
        { id: "c", label: "Single right rotation only" },
        { id: "d", label: "Left-right double rotation" },
      ],
      correctId: "a",
      explainWrong: {
        b: "A single left rotation alone only fixes a straight RR shape; here the heavy grandchild sits on the opposite side, an RL zigzag, which a single rotation cannot fully resolve.",
        c: "A right rotation would fix LL, not RL; the overall imbalance here is on the right side, and a plain right rotation doesn't address that at all.",
        d: "Left-right (LR) is the mirror case for a left-heavy imbalance whose heavy child leans right; here the overall imbalance is right-heavy, so this is RL, not LR, and the rotation order is reversed.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "fixed", label: "double rotation: rotate 70 right, then 50 left", tag: "balanced", x: 3, y: 1, shape: "frame", emphasis: "active" }],
          arrows: [],
        },
        caption: "This RL zigzag needs a double rotation: first rotate the right child right, then rotate the whole node left.",
      },
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: "A node's left subtree has height 3 and its right subtree has height 1. Fill in its balance factor (left height minus right height).",
      code: ["# left height = 3, right height = 1", "balance_factor = {{val}}"].join("\n"),
      blanks: [
        {
          id: "val",
          placeholder: "___",
          answer: "2",
          explainWrong:
            "Balance factor is left height minus right height: `3 - 1 = 2`. This node is outside the allowed `-1` to `+1` range and would need a rotation to fix.",
        },
      ],
      tests: [
        { name: "computes balance factor", code: "assert balance_factor == 2, \"balance_factor should be 3 - 1 = 2\"" },
      ],
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: "A node's left subtree has height 1 and its right subtree has height 4. Fill in its balance factor.",
      code: ["# left height = 1, right height = 4", "balance_factor = {{val}}"].join("\n"),
      blanks: [
        {
          id: "val",
          placeholder: "___",
          answer: "-3",
          explainWrong:
            "Balance factor is left height minus right height: `1 - 4 = -3`. A negative balance factor means the tree is heavier on the right; `-3` is far outside the allowed `-1` to `+1` range.",
        },
      ],
      tests: [
        { name: "computes negative balance factor", code: "assert balance_factor == -3, \"balance_factor should be 1 - 4 = -3\"" },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-balanced-trees.apply-balanced.1",
      prompt: "A node's balance factor is -2 and its right child's balance factor is -1. What shape and fix is this?",
      options: [
        "RR shape; single left rotation",
        "LL shape; single right rotation",
        "RL shape; double rotation",
      ],
      correctIndex: 0,
      explainWrong:
        "LL would require the node to be left-heavy (a positive balance factor); this node is right-heavy (`-2`), with a right child that's also right-heavy (`-1`), which is a straight RR shape, fixed with one single left rotation, not a double rotation.",
    },
    {
      id: "dsa-balanced-trees.apply-balanced.2",
      prompt: "How do you compute a node's balance factor from its subtree heights?",
      options: [
        "Left subtree height minus right subtree height",
        "Right subtree height minus left subtree height",
        "Total node count in both subtrees",
      ],
      correctIndex: 0,
      explainWrong:
        "Balance factor is defined specifically as left height minus right height, not the reverse and not a node count. Flipping the subtraction would flip the sign, and would describe the imbalance backwards.",
    },
  ],
};

export const chDsaBalanced: Chapter = {
  id: "dsa-balanced-trees",
  phase: 2,
  title: "Balanced Trees",
  units: [whyBalanceUnit, avlRotationsUnit, redBlackBasicsUnit, applyBalancedUnit],
};
