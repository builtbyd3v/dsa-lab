import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: why-btrees — a skewed BST can get tall and skinny; a 2-3-4 tree
// packs multiple keys per node to stay short and wide, which matters when
// each node is a disk block read.
// ---------------------------------------------------------------------------

const whyBtreesUnit: Unit = {
  id: "why-btrees",
  title: "Why B-trees: Short and Wide Beats Tall and Skinny",
  watch: [
    {
      state: {
        nodes: [
          { id: "n10", label: "10", x: 0, y: 0, shape: "circle", emphasis: "new" },
          { id: "n20", label: "20", x: 0, y: 1, shape: "circle" },
          { id: "n30", label: "30", x: 0, y: 2, shape: "circle" },
          { id: "n40", label: "40", x: 0, y: 3, shape: "circle" },
          { id: "n50", label: "50", x: 0, y: 4, shape: "circle" },
        ],
        arrows: [
          { from: "n10", to: "n20" }, { from: "n20", to: "n30" },
          { from: "n30", to: "n40" }, { from: "n40", to: "n50" },
        ],
      },
      caption: "Insert `10, 20, 30, 40, 50` into a plain BST in sorted order, and it degenerates into a straight chain, height `4`.",
    },
    {
      state: {
        nodes: [
          { id: "n10", label: "10", tag: "visit 1", x: 0, y: 0, shape: "circle" },
          { id: "n20", label: "20", tag: "visit 2", x: 0, y: 1, shape: "circle" },
          { id: "n30", label: "30", tag: "visit 3", x: 0, y: 2, shape: "circle" },
          { id: "n40", label: "40", tag: "visit 4", x: 0, y: 3, shape: "circle" },
          { id: "n50", label: "50", tag: "visit 5", x: 0, y: 4, shape: "circle", emphasis: "active" },
        ],
        arrows: [
          { from: "n10", to: "n20" }, { from: "n20", to: "n30" },
          { from: "n30", to: "n40" }, { from: "n40", to: "n50" },
        ],
      },
      caption: "Finding `50` in this chain takes `5` node visits, worst case: one comparison, and potentially one slow disk read, per level.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40", tag: "2 keys, 3 children", x: 3, y: 0, shape: "frame", emphasis: "new" },
          { id: "l", label: "10", x: 1, y: 2, shape: "box" },
          { id: "m", label: "30", x: 3, y: 2, shape: "box" },
          { id: "r", label: "50", x: 5, y: 2, shape: "box" },
        ],
        arrows: [{ from: "root", to: "l" }, { from: "root", to: "m" }, { from: "root", to: "r" }],
      },
      caption: "The exact same `5` values, packed into a `2-3-4` tree: the root holds `2` keys at once, so everything fits in height `1`, just two levels.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40", tag: "visit 1", x: 3, y: 0, shape: "frame", emphasis: "active" },
          { id: "l", label: "10", x: 1, y: 2, shape: "box" },
          { id: "m", label: "30", x: 3, y: 2, shape: "box" },
          { id: "r", label: "50", tag: "visit 2", x: 5, y: 2, shape: "box", emphasis: "active" },
        ],
        arrows: [{ from: "root", to: "l" }, { from: "root", to: "m" }, { from: "root", to: "r", emphasis: "active" }],
      },
      caption: "Finding `50` here takes only `2` node visits: the root, then the right child. Compare that to the `5` visits the skinny chain needed.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40", tag: "1 disk read for 2 keys", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Real databases treat each B-tree node as one disk block. Packing several keys into a single node means one disk read reveals several keys at once, not just one.",
    },
    {
      state: {
        nodes: [
          { id: "chain", label: "5 nodes, height 4", tag: "skinny BST", x: 1, y: 1, shape: "frame" },
          { id: "wide", label: "2 nodes, height 1", tag: "2-3-4 tree", x: 5, y: 1, shape: "frame" },
        ],
        arrows: [],
      },
      caption: "That's the whole point of B-trees: by packing multiple keys per node, the tree stays shallow, keeping the number of slow disk reads to a minimum.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A `2-3-4` tree node can hold up to `3` keys. How many children does a node with exactly `3` keys have?",
      steps: [
        {
          state: {
            nodes: [{ id: "n", label: "20 | 40 | 60", tag: "3 keys", x: 3, y: 1, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "A node holding `3` keys.",
        },
      ],
      options: [
        { id: "a", label: "`4`, one more than the number of keys" },
        { id: "b", label: "`3`, the same as the number of keys" },
        { id: "c", label: "`6`, twice the number of keys" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Keys divide the range of values into buckets, and there's always one more bucket than there are dividing keys. A node with `3` keys has `4` buckets, so `4` children, not `3`.",
        c: "Children count doesn't double the key count; it's always exactly one more than the number of keys, regardless of how many keys the node holds.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "n", label: "20 | 40 | 60", tag: "3 keys, 4 children", x: 3, y: 0, shape: "frame", emphasis: "active" },
            { id: "c1", label: "< 20", x: 0, y: 2, shape: "box" },
            { id: "c2", label: "20-40", x: 2, y: 2, shape: "box" },
            { id: "c3", label: "40-60", x: 4, y: 2, shape: "box" },
            { id: "c4", label: "> 60", x: 6, y: 2, shape: "box" },
          ],
          arrows: [{ from: "n", to: "c1" }, { from: "n", to: "c2" }, { from: "n", to: "c3" }, { from: "n", to: "c4" }],
        },
        caption: "`3` keys split the range into `4` buckets: less than `20`, between `20` and `40`, between `40` and `60`, and greater than `60`. Each bucket is a child.",
      },
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-btrees.why-btrees.1",
      prompt: "Why can a plain BST end up much taller than a `2-3-4` tree holding the exact same values?",
      options: [
        "A BST holds only one key per node, so a skewed insertion order can produce a long chain, while a `2-3-4` node can hold up to `3` keys at once",
        "A BST always sorts its values differently than a `2-3-4` tree",
        "`2-3-4` trees only work with a small, fixed number of values",
      ],
      correctIndex: 0,
      explainWrong:
        "Both structures maintain the same sorted order of values; that's not the difference. It's capacity per node: a BST node holds exactly one key, so a bad insertion order stretches it into a long chain, while a `2-3-4` node holding up to `3` keys packs the same values into far fewer levels.",
    },
    {
      id: "dsa-btrees.why-btrees.2",
      prompt: "Why does it matter, in a real database, how many nodes must be visited to find a value?",
      options: [
        "Each node visit can correspond to one disk block read, and disk reads are far slower than reading from memory",
        "Visiting more nodes uses more CPU cycles, which is the main cost",
        "It doesn't matter; node visits are effectively free",
      ],
      correctIndex: 0,
      explainWrong:
        "CPU cost per visit is negligible compared to the real bottleneck. Databases model each B-tree node as one disk block, and disk reads are dramatically slower than CPU work, so minimizing node visits directly minimizes slow disk access.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: search-234 — descending a multi-key node means picking the child
// between the two keys that bracket the search value.
// ---------------------------------------------------------------------------

const search234Unit: Unit = {
  id: "search-234",
  title: "Searching a 2-3-4 Tree",
  watch: [
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40 | 60", tag: "3 keys, 4 children", x: 3, y: 0, shape: "frame", emphasis: "new" },
          { id: "c1", label: "10", x: 0, y: 2, shape: "box" },
          { id: "c2", label: "30", x: 2, y: 2, shape: "box" },
          { id: "c3", label: "50", x: 4, y: 2, shape: "box" },
          { id: "c4", label: "70, 80", x: 6, y: 2, shape: "box" },
        ],
        arrows: [{ from: "root", to: "c1" }, { from: "root", to: "c2" }, { from: "root", to: "c3" }, { from: "root", to: "c4" }],
      },
      caption: "A node with `3` keys always has `4` children: the keys split the range of possible values into `4` buckets.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40 | 60", tag: "searching for 30", x: 3, y: 0, shape: "frame", emphasis: "active" },
          { id: "c1", label: "10", x: 0, y: 2, shape: "box" },
          { id: "c2", label: "30", x: 2, y: 2, shape: "box", emphasis: "new" },
          { id: "c3", label: "50", x: 4, y: 2, shape: "box" },
          { id: "c4", label: "70, 80", x: 6, y: 2, shape: "box" },
        ],
        arrows: [{ from: "root", to: "c1" }, { from: "root", to: "c2", emphasis: "active" }, { from: "root", to: "c3" }, { from: "root", to: "c4" }],
      },
      caption: "Searching for `30`: compare against the keys left to right. `30` is greater than `20` but less than `40`, so descend into the child BETWEEN those two keys.",
    },
    {
      state: {
        nodes: [
          { id: "c2", label: "30", tag: "match!", x: 3, y: 1, shape: "box", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "That child holds exactly `30`: found it.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40 | 60", tag: "searching for 75", x: 3, y: 0, shape: "frame", emphasis: "active" },
          { id: "c1", label: "10", x: 0, y: 2, shape: "box" },
          { id: "c2", label: "30", x: 2, y: 2, shape: "box" },
          { id: "c3", label: "50", x: 4, y: 2, shape: "box" },
          { id: "c4", label: "70, 80", x: 6, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "root", to: "c1" }, { from: "root", to: "c2" }, { from: "root", to: "c3" }, { from: "root", to: "c4", emphasis: "active" }],
      },
      caption: "Searching for `75`: it's greater than every key in the root, `20`, `40`, and `60`. When a value beats all the keys, descend into the LAST child.",
    },
    {
      state: {
        nodes: [
          { id: "c4", label: "70, 80", tag: "no children here", x: 3, y: 1, shape: "box", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "`75` sits between `70` and `80` in this leaf, but there's no child to descend into any further: since it doesn't match either key exactly, `75` isn't in this tree.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40 | 60", tag: "searching for 10", x: 3, y: 0, shape: "frame", emphasis: "active" },
          { id: "c1", label: "10", x: 0, y: 2, shape: "box", emphasis: "new" },
          { id: "c2", label: "30", x: 2, y: 2, shape: "box" },
          { id: "c3", label: "50", x: 4, y: 2, shape: "box" },
          { id: "c4", label: "70, 80", x: 6, y: 2, shape: "box" },
        ],
        arrows: [{ from: "root", to: "c1", emphasis: "active" }, { from: "root", to: "c2" }, { from: "root", to: "c3" }, { from: "root", to: "c4" }],
      },
      caption: "Searching for `10`: it's less than the very first key, `20`. When a value is smaller than every key, descend into the FIRST child.",
    },
    {
      state: {
        nodes: [{ id: "c1", label: "10", tag: "match!", x: 3, y: 1, shape: "box", emphasis: "active" }],
        arrows: [],
      },
      caption: "That first child holds exactly `10`: found.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "In a node holding keys `15 | 35 | 55`, which child do you descend into while searching for `45`?",
      steps: [
        {
          state: {
            nodes: [{ id: "root", label: "15 | 35 | 55", tag: "searching for 45", x: 3, y: 0, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "Compare `45` against each key, left to right.",
        },
      ],
      options: [
        { id: "a", label: "The 3rd child, between `35` and `55`" },
        { id: "b", label: "The 1st child, before `15`" },
        { id: "c", label: "The 4th (last) child, after `55`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "The first child only holds values less than the smallest key, `15`. `45` is far bigger than `15`, so that's the wrong bucket entirely.",
        c: "The last child only holds values greater than every key, including `55`. `45` is less than `55`, so it doesn't belong past the last key.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "root", label: "15 | 35 | 55", x: 3, y: 0, shape: "frame", emphasis: "dim" },
            { id: "target", label: "35-55 bucket", tag: "descend here", x: 4, y: 2, shape: "box", emphasis: "active" },
          ],
          arrows: [{ from: "root", to: "target", emphasis: "active" }],
        },
        caption: "`45` is greater than `35` but less than `55`, so it falls in the 3rd bucket, the child between those two keys.",
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing comparison so `pick_bucket` correctly decides whether the search value belongs to the LAST child of a node.",
      code: [
        "def is_last_bucket(search_value, largest_key):",
        "    return search_value {{cmp}} largest_key",
      ].join("\n"),
      blanks: [
        {
          id: "cmp",
          placeholder: "___",
          answer: ">",
          explainWrong:
            "The last child holds values greater than every key in the node, including the largest one. Using `>=` would incorrectly route a value EQUAL to the largest key into the last child, when it should match that key directly instead.",
        },
      ],
      tests: [
        { name: "greater than largest key goes last", code: "assert is_last_bucket(75, 60) == True, \"is_last_bucket(75, 60) should be True: 75 is greater than the largest key, 60\"" },
        { name: "equal to largest key is not last-bucket", code: "assert is_last_bucket(60, 60) == False, \"is_last_bucket(60, 60) should be False: 60 matches the key itself, it isn't greater than it\"" },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-btrees.search-234.1",
      prompt: "While searching a `2-3-4` tree node, when do you descend into the FIRST child?",
      options: [
        "When the search value is less than the smallest key in the node",
        "When the search value equals the smallest key",
        "Always, regardless of the search value",
      ],
      correctIndex: 0,
      explainWrong:
        "If the value equals the smallest key, that's a match right there in the node, no descent needed. The first child is only for values smaller than every key in the node, meaning less than the smallest one.",
    },
    {
      id: "dsa-btrees.search-234.2",
      prompt: "While searching, when do you descend into the LAST child of a node?",
      options: [
        "When the search value is greater than every key in the node",
        "When the search value is less than every key in the node",
        "When the node has exactly one key",
      ],
      correctIndex: 0,
      explainWrong:
        "Less-than-every-key describes the FIRST child, the opposite case, and key count doesn't determine which child to pick. The last child holds everything greater than the largest key in the node.",
    },
    {
      id: "dsa-btrees.search-234.3",
      prompt: "What happens when a search reaches a leaf node and the value still isn't found among its keys?",
      options: [
        "The search ends: since a leaf has no children to descend into, the value isn't in the tree",
        "The search restarts from the root with a different comparison rule",
        "The search always finds it eventually by checking every other leaf",
      ],
      correctIndex: 0,
      explainWrong:
        "There's no restart and no scanning of other leaves. Once you're at a leaf with no matching key and no child to descend into, the search is over: the value simply isn't in the tree.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: insert-split — inserting into a full node triggers a preemptive
// split on the way down; the middle key rises into the parent, keeping the
// tree shallow instead of growing downward.
// ---------------------------------------------------------------------------

const insertSplitUnit: Unit = {
  id: "insert-split",
  title: "Insert: Preemptive Splitting",
  watch: [
    {
      state: {
        nodes: [
          { id: "root", label: "40", tag: "inserting 25", x: 3, y: 0, shape: "frame", emphasis: "active" },
          { id: "l", label: "10, 20, 30", tag: "full (3 keys)", x: 1, y: 2, shape: "frame", emphasis: "new" },
          { id: "r", label: "50", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "l", emphasis: "active" }, { from: "root", to: "r" }],
      },
      caption: "Insert `25`: since `25` is less than root's key `40`, the next step would descend into the left child. But that child already holds `3` keys: it's full.",
    },
    {
      state: {
        nodes: [
          { id: "l", label: "10, 20, 30", tag: "must split before descending", x: 3, y: 1, shape: "frame", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: "A `2-3-4` tree never lets an insert descend into a full node. It splits that node FIRST, preemptively, on the way down.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40", tag: "gained a key", x: 3, y: 0, shape: "frame", emphasis: "new" },
          { id: "la", label: "10", x: 0, y: 2, shape: "frame", emphasis: "new" },
          { id: "lb", label: "30", x: 2, y: 2, shape: "frame", emphasis: "new" },
          { id: "r", label: "50", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "la" }, { from: "root", to: "lb" }, { from: "root", to: "r" }],
      },
      caption: "The middle key, `20`, rises up into the parent. The two remaining keys, `10` and `30`, become separate single-key children.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40", tag: "2 of 3 keys, still room", x: 3, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "The root now has `2` keys, still under its own limit of `3`, so no further splitting cascades upward here.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40", tag: "25 falls here", x: 3, y: 0, shape: "frame", emphasis: "active" },
          { id: "la", label: "10", x: 0, y: 2, shape: "frame" },
          { id: "lb", label: "30", x: 2, y: 2, shape: "frame", emphasis: "new" },
          { id: "r", label: "50", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "la" }, { from: "root", to: "lb", emphasis: "active" }, { from: "root", to: "r" }],
      },
      caption: "Now resume the original insert: `25` falls between `20` and `40`, so descend into the middle child, the one holding `30`.",
    },
    {
      state: {
        nodes: [
          { id: "lb", label: "25, 30", tag: "25 inserted", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "That child only had `1` key, well under the limit of `3`, so `25` is simply added: it becomes `[25, 30]`.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "20 | 40", x: 3, y: 0, shape: "frame" },
          { id: "la", label: "10", x: 0, y: 2, shape: "frame" },
          { id: "lb", label: "25, 30", x: 2, y: 2, shape: "frame", emphasis: "active" },
          { id: "r", label: "50", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "la" }, { from: "root", to: "lb" }, { from: "root", to: "r" }],
      },
      caption: "The tree stayed at the same height, `2` levels, even after the insert. Splitting is always preemptive, which is exactly what keeps `2-3-4` trees shallow.",
    },
    {
      state: {
        nodes: [
          { id: "old", label: "30", x: 2, y: 2, shape: "circle" },
          { id: "new", label: "25", tag: "plain BST: grows downward", x: 2, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "old", to: "new" }],
      },
      caption: "A plain BST would just tack `25` on as a brand-new node, one level deeper. A B-tree instead grows outward, sideways, not downward.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A node holding keys `5, 15, 25` (full, a `4-node`) is about to be split during an insert. Which key rises into the parent?",
      steps: [
        {
          state: {
            nodes: [{ id: "n", label: "5, 15, 25", tag: "full, about to split", x: 3, y: 1, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "This node has `3` keys and must split before the insert can descend through it.",
        },
      ],
      options: [
        { id: "a", label: "`15`, the middle key" },
        { id: "b", label: "`5`, the smallest key" },
        { id: "c", label: "`25`, the largest key" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Sending the smallest key up would leave the two larger keys, `15` and `25`, together in one child, unevenly splitting the node. Splitting always promotes the MIDDLE key specifically.",
        c: "Sending the largest key up would leave the two smaller keys, `5` and `15`, together, again splitting unevenly. It's always the middle key, `15`, that rises, leaving one key on each side.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "risen", label: "15", tag: "rises to parent", x: 3, y: 0, shape: "frame", emphasis: "new" },
            { id: "left", label: "5", x: 1, y: 2, shape: "frame" },
            { id: "right", label: "25", x: 5, y: 2, shape: "frame" },
          ],
          arrows: [{ from: "risen", to: "left" }, { from: "risen", to: "right" }],
        },
        caption: "`15`, the middle key, rises up. `5` and `25` become two separate single-key children, one on each side.",
      },
      reviewStep: 2,
    },
    {
      kind: "fillin",
      prompt: "Fill in when a node must be split during an insert descent, using its current key count.",
      code: [
        "MAX_KEYS = 3",
        "",
        "def must_split(current_key_count):",
        "    return current_key_count {{cmp}} MAX_KEYS",
      ].join("\n"),
      blanks: [
        {
          id: "cmp",
          placeholder: "___",
          answer: "==",
          explainWrong:
            "A node is split exactly when it's already full, holding the maximum of `3` keys; using `>` would never trigger, since a node's key count never legally exceeds `3` in the first place. The condition is `current_key_count == MAX_KEYS`.",
        },
      ],
      tests: [
        { name: "full node must split", code: "assert must_split(3) == True, \"must_split(3) should be True: 3 keys is full, the maximum\"" },
        { name: "non-full node does not split", code: "assert must_split(1) == False, \"must_split(1) should be False: 1 key is well under the limit of 3\"" },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-btrees.insert-split.1",
      prompt: "When does a `2-3-4` tree split a node during an insert?",
      options: [
        "Preemptively, the moment the insert path reaches a full node, before descending into it",
        "Only after a node has been given a 4th key, exceeding its capacity",
        "Only when the tree has run out of memory",
      ],
      correctIndex: 0,
      explainWrong:
        "A node is never actually allowed to hold a 4th key; splitting happens BEFORE that could occur, and it has nothing to do with running out of memory. The insert path checks each node on the way down and splits any full node preemptively, before ever descending into it.",
    },
    {
      id: "dsa-btrees.insert-split.2",
      prompt: "When a full node splits, which key moves up into the parent?",
      options: [
        "The middle key",
        "The smallest key",
        "The largest key",
      ],
      correctIndex: 0,
      explainWrong:
        "Promoting the smallest or largest key would leave the split lopsided, with two keys stuck together on one side. The middle key always rises, leaving exactly one key in each of the two resulting children.",
    },
    {
      id: "dsa-btrees.insert-split.3",
      prompt: "Why does preemptive splitting keep a `2-3-4` tree from growing taller with every insert, unlike a plain BST?",
      options: [
        "Splitting grows the tree sideways, adding a key to a node that already has room, instead of always adding a brand-new node one level deeper",
        "It doesn't; both structures grow taller by the same amount on every insert",
        "Because `2-3-4` trees limit how many values they can ever hold",
      ],
      correctIndex: 0,
      explainWrong:
        "Both claims are false: the two structures behave very differently, and `2-3-4` trees have no cap on total values. A BST insert always adds one brand-new, deeper node; a B-tree insert usually just adds a key to an existing node, only growing height on the rare occasion a split reaches all the way to the root.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: remove-rotate-fuse — an underflowed node borrows (rotates) from a
// sibling with keys to spare, or fuses with a sibling when neither has any.
// ---------------------------------------------------------------------------

const removeRotateFuseUnit: Unit = {
  id: "remove-rotate-fuse",
  title: "Remove: Rotation vs Fusion",
  watch: [
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "frame" },
          { id: "l", label: "20", tag: "removing 20", x: 1, y: 2, shape: "frame", emphasis: "active" },
          { id: "r", label: "70, 90", tag: "has spare keys", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "l" }, { from: "root", to: "r" }],
      },
      caption: "Remove `20` from the left child, which only holds that one key.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "50", x: 3, y: 0, shape: "frame" },
          { id: "l", label: "empty!", tag: "underflow", x: 1, y: 2, shape: "frame", emphasis: "error" },
          { id: "r", label: "70, 90", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "l" }, { from: "root", to: "r" }],
      },
      caption: "The left child now has `0` keys, underflowing below the minimum of `1`. It must borrow or fuse to fix this.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "70", tag: "70 rose up", x: 3, y: 0, shape: "frame", emphasis: "new" },
          { id: "l", label: "50", tag: "50 dropped down", x: 1, y: 2, shape: "frame", emphasis: "new" },
          { id: "r", label: "90", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "l", emphasis: "active" }, { from: "root", to: "r" }],
      },
      caption: "The right sibling has `2` keys, a key to spare, so we ROTATE: the parent's key, `50`, drops down into the empty left child, and the sibling's smallest key, `70`, rises up to take its place in the parent.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "70", x: 3, y: 0, shape: "frame" },
          { id: "l", label: "50", x: 1, y: 2, shape: "frame" },
          { id: "r", label: "90", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root", to: "l" }, { from: "root", to: "r" }],
      },
      caption: "Borrowing (rotation) fixed the underflow without changing the tree's height at all.",
    },
    {
      state: {
        nodes: [
          { id: "root2", label: "50", x: 3, y: 0, shape: "frame" },
          { id: "l2", label: "20", tag: "removing 20 again", x: 1, y: 2, shape: "frame", emphasis: "active" },
          { id: "r2", label: "80", tag: "also minimal, no spare", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root2", to: "l2" }, { from: "root2", to: "r2" }],
      },
      caption: "Different case: remove `20` again, but this time the sibling, `80`, only has `1` key too. It has nothing to lend.",
    },
    {
      state: {
        nodes: [
          { id: "root2", label: "50", x: 3, y: 0, shape: "frame" },
          { id: "l2", label: "empty!", tag: "underflow, sibling can't lend", x: 1, y: 2, shape: "frame", emphasis: "error" },
          { id: "r2", label: "80", x: 5, y: 2, shape: "frame" },
        ],
        arrows: [{ from: "root2", to: "l2" }, { from: "root2", to: "r2" }],
      },
      caption: "The left child underflows, and since the sibling has no extra key to lend, rotation isn't possible: the nodes must fuse instead.",
    },
    {
      state: {
        nodes: [
          { id: "fused", label: "50, 80", tag: "fused: parent key + sibling", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Fusion pulls the parent's key, `50`, down and combines it with the sibling's key, `80`, into one merged node. If the parent empties out as a result, the whole tree can shrink by a level.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A node underflows to `0` keys after a removal. Its sibling currently holds `2` keys. What fixes the underflow?",
      steps: [
        {
          state: {
            nodes: [
              { id: "n", label: "empty!", tag: "underflow", x: 1, y: 1, shape: "frame", emphasis: "error" },
              { id: "sib", label: "2 keys", tag: "sibling", x: 5, y: 1, shape: "frame" },
            ],
            arrows: [],
          },
          caption: "The underflowed node and its sibling, which has keys to spare.",
        },
      ],
      options: [
        { id: "a", label: "Rotation: borrow a key through the parent, since the sibling has one to spare" },
        { id: "b", label: "Fusion: merge with the sibling and the parent's key" },
        { id: "c", label: "Nothing; a node with `0` keys is left as-is" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Fusion is reserved for when the sibling ALSO has no spare key to lend. Since this sibling has `2` keys, there's a cheaper fix available first: rotation.",
        c: "An empty node violates the tree's minimum-key rule and can't be left as-is; it always gets repaired immediately, either by rotation or fusion, whichever applies.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "n", label: "1 key (borrowed)", x: 1, y: 1, shape: "frame", emphasis: "new" },
            { id: "sib", label: "1 key (lent one)", x: 5, y: 1, shape: "frame" },
          ],
          arrows: [],
        },
        caption: "Rotation borrows through the parent: the parent's key drops into the empty node, and the sibling's key rises to replace it in the parent.",
      },
      reviewStep: 2,
    },
    {
      kind: "fillin",
      prompt: "Fill in the condition that decides whether an underflowed node should rotate (borrow) or fuse with its sibling.",
      code: [
        "def should_rotate(sibling_key_count):",
        "    # rotate (borrow) only if the sibling has more than the bare minimum of 1 key",
        "    return sibling_key_count {{cmp}} 1",
      ].join("\n"),
      blanks: [
        {
          id: "cmp",
          placeholder: "___",
          answer: ">",
          explainWrong:
            "If the sibling has exactly `1` key, lending it away would underflow the sibling too, so that case must fuse instead. Rotation is only possible when the sibling has MORE than the bare minimum, meaning `sibling_key_count > 1`.",
        },
      ],
      tests: [
        { name: "sibling with spare keys rotates", code: "assert should_rotate(2) == True, \"should_rotate(2) should be True: 2 keys means the sibling has one to spare\"" },
        { name: "sibling at minimum fuses instead", code: "assert should_rotate(1) == False, \"should_rotate(1) should be False: 1 key is the bare minimum, lending it would underflow the sibling too, so it must fuse\"" },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "dsa-btrees.remove-rotate-fuse.1",
      prompt: "When a node underflows after a removal, and its sibling has a key to spare, what happens?",
      options: [
        "Rotation: the parent's key drops into the underflowed node, and the sibling's key rises to replace it in the parent",
        "Fusion: the underflowed node merges directly with the sibling",
        "The tree simply removes that node entirely",
      ],
      correctIndex: 0,
      explainWrong:
        "Fusion, and simply deleting the node, are both the wrong move when the sibling has a spare key to lend; those apply when the sibling has nothing to spare. With a spare key available, rotation is cheaper: borrow through the parent.",
    },
    {
      id: "dsa-btrees.remove-rotate-fuse.2",
      prompt: "When does fusion happen instead of rotation?",
      options: [
        "When the sibling is also at the minimum number of keys and has nothing to lend",
        "Whenever a removal happens, regardless of sibling state",
        "Only at the root of the tree",
      ],
      correctIndex: 0,
      explainWrong:
        "Fusion isn't automatic on every removal, and it isn't restricted to the root either. It's specifically needed when rotation isn't an option: the sibling itself is already at the bare minimum, so it has no key to spare.",
    },
    {
      id: "dsa-btrees.remove-rotate-fuse.3",
      prompt: "Can fusion ever cause the whole tree to shrink by a level?",
      options: [
        "Yes, if pulling the parent's key down leaves the parent itself empty",
        "No, fusion only ever affects the two nodes directly involved",
        "No, only splitting during insert can change the tree's height",
      ],
      correctIndex: 0,
      explainWrong:
        "Fusion isn't purely local; pulling a key out of the parent can underflow the parent in turn. If that emptied parent was the root, the tree's height shrinks by one level, so both insert splits and remove fusions can change the tree's height.",
    },
  ],
};

export const chDsaBtrees: Chapter = {
  id: "dsa-btrees",
  phase: 2,
  title: "B-trees",
  units: [whyBtreesUnit, search234Unit, insertSplitUnit, removeRotateFuseUnit],
};
