import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: binary-trees — root sits at the top, children spread below it, and
// height counts the longest path down to a leaf.
// ---------------------------------------------------------------------------

const binaryTreesUnit: Unit = {
  id: "binary-trees",
  title: "Root on Top, Leaves at the Bottom",
  watch: [
    {
      state: {
        nodes: [{ id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "new" }],
        arrows: [],
      },
      caption: "A tree with just one node: `8` is both the root, since it has no parent, and a leaf, since it has no children yet.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "r", to: "l", emphasis: "active" },
          { from: "r", to: "rt", emphasis: "active" },
        ],
      },
      caption: "`8` gains two children, `3` on the left and `10` on the right. Both `3` and `10` are leaves: neither has children of its own yet.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle" },
          { id: "ll", label: "1", x: 0, y: 4, shape: "circle", emphasis: "new" },
          { id: "lr", label: "6", x: 2, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "l", to: "ll", emphasis: "active" },
          { from: "l", to: "lr", emphasis: "active" },
        ],
      },
      caption: "`3` gains its own two children, `1` and `6`. Now `3` is neither root nor leaf: it's an internal node, sitting between `8` above and `1`, `6` below.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "active" },
          { id: "ll", label: "1", x: 0, y: 4, shape: "circle" },
          { id: "lr", label: "6", x: 2, y: 4, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "`10` stays a leaf: this tree never gave it any children. Leaves are wherever a branch simply stops.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root, height 2", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "ll", label: "1", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "lr", label: "6", x: 2, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "Height counts edges on the longest path from root to a leaf: root to `3` to `1` is `2` edges, so this tree's height is `2`.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "3, height 1", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "rt", label: "10, height 0", x: 5, y: 2, shape: "circle", emphasis: "active" },
          { id: "ll", label: "1", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "lr", label: "6", x: 2, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "Height is also defined per node: `3`'s subtree has height `1` (one edge down to a leaf), while `10`, a leaf itself, has height `0`.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "Root 5 has left child 2 and right child 9. 2 has a left child 1. What is the height of the whole tree?",
      steps: [
        {
          state: {
            nodes: [
              { id: "r", label: "5", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "l", label: "2", x: 1, y: 2, shape: "circle", emphasis: "new" },
              { id: "rt", label: "9", x: 5, y: 2, shape: "circle", emphasis: "new" },
              { id: "ll", label: "1", x: 0, y: 4, shape: "circle", emphasis: "new" },
            ],
            arrows: [
              { from: "r", to: "l" },
              { from: "r", to: "rt" },
              { from: "l", to: "ll" },
            ],
          },
          caption: "`5` is root; `2` and `9` are its children; `1` is `2`'s only child.",
        },
      ],
      options: [
        { id: "a", label: "0" },
        { id: "b", label: "1" },
        { id: "c", label: "2" },
        { id: "d", label: "3" },
      ],
      correctId: "c",
      explainWrong: {
        a: "Height 0 would mean the tree is just a single node with no children at all; this tree clearly has multiple levels below the root.",
        b: "Height 1 only covers root to 2 or root to 9; it ignores the deeper path down to 1, which is one level further.",
        d: "There is no path in this tree with 3 edges; the longest path, root to 2 to 1, only has 2 edges.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "r", label: "5", tag: "root, height 2", x: 3, y: 0, shape: "circle", emphasis: "active" }],
          arrows: [],
        },
        caption: "The longest path, `5` to `2` to `1`, has `2` edges, so the tree's height is `2`.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing check so is_leaf correctly identifies a node with no children, represented as a dict with 'left' and 'right' keys that are None when absent.",
      code: [
        "def is_leaf(node):",
        "    return node['left'] is {{val}} and node['right'] is None",
      ].join("\n"),
      blanks: [
        {
          id: "val",
          placeholder: "___",
          answer: "None",
          explainWrong:
            "A leaf has no children at all, so both left and right must be None. Checking against anything other than None, like 0 or False, would not correctly detect a missing child.",
        },
      ],
      tests: [
        {
          name: "leaf node detected",
          code: "assert is_leaf({'val': 5, 'left': None, 'right': None}) is True, \"a node with both children None should be a leaf\"",
        },
        {
          name: "non-leaf rejected",
          code:
            "assert is_leaf({'val': 5, 'left': {'val': 2, 'left': None, 'right': None}, 'right': None}) is False, \"a node with a left child is not a leaf\"",
        },
      ],
      reviewStep: 0,
    },
    {
      kind: "write",
      prompt:
        "Given a binary tree `node` represented as nested dicts with keys `'val'`, `'left'`, `'right'` (`None` when a child is absent), return its height: `-1` for `None` (an empty tree), `0` for a single leaf, and otherwise `1` plus the taller of its two child subtrees.",
      difficulty: "Medium",
      examples: [
        { input: "node = None", output: "-1", explanation: "An empty tree has height `-1`." },
        { input: "node = {'val': 5, 'left': None, 'right': None}", output: "0", explanation: "A single leaf has height `0`." },
      ],
      constraints: [
        "`node` is `None` or a dict with `'val'`, `'left'`, `'right'`",
        "height is measured in edges, not node count",
      ],
      bigO: { answer: "O(n)", explain: "`tree_height` recurses into every node once to find the longest path, so cost grows with the total node count `n`." },
      starter: "def tree_height(node):\n    # None (empty) has height -1\n    pass\n",
      solution:
        "def tree_height(node):\n    if node is None:\n        return -1\n    return 1 + max(tree_height(node['left']), tree_height(node['right']))\n",
      tests: [
        { name: "empty tree is -1", code: "assert tree_height(None) == -1, \"tree_height(None) should be -1: an empty tree has no nodes at all\"" },
        {
          name: "single leaf is 0",
          code: "assert tree_height({'val': 5, 'left': None, 'right': None}) == 0, \"a single leaf node should have height 0\"",
        },
        {
          name: "two levels is 1",
          code:
            "t = {'val': 5, 'left': {'val': 2, 'left': None, 'right': None}, 'right': None}\nassert tree_height(t) == 1, \"a root with one leaf child should have height 1\"",
        },
        {
          name: "three levels is 2",
          code:
            "t2 = {'val': 5, 'left': {'val': 2, 'left': {'val': 1, 'left': None, 'right': None}, 'right': None}, 'right': None}\nassert tree_height(t2) == 2, \"a root, one child, one grandchild should have height 2\"",
        },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-trees.binary-trees.1",
      prompt: "What makes a node in a binary tree a leaf?",
      options: [
        "It has no children",
        "It has no parent",
        "It holds the smallest value in the tree",
      ],
      correctIndex: 0,
      explainWrong:
        "Being a leaf is entirely about children, not parents or value: a node with no left or right child is a leaf, regardless of where it sits or what it holds. The node with no parent is the root, a different concept.",
    },
    {
      id: "dsa-trees.binary-trees.2",
      prompt: "How is a binary tree's height defined?",
      options: [
        "The number of edges on the longest path from the root down to a leaf",
        "The total number of nodes in the tree",
        "The number of leaves in the tree",
      ],
      correctIndex: 0,
      explainWrong:
        "Height counts edges along the longest root-to-leaf path specifically. It isn't the same as the total node count or leaf count, both of which can differ a lot from height in an unbalanced tree.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: bst-search-insert — compare and descend to find a spot; the same
// keys inserted in a different order build a different-shaped tree.
// ---------------------------------------------------------------------------

const bstSearchInsertUnit: Unit = {
  id: "bst-search-insert",
  title: "Compare, Then Go Left or Right",
  watch: [
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle" },
          { id: "target", label: "search for 3", tag: "goal", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
        ],
      },
      caption: "Searching for `3` starts at the root, `8`.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "3 < 8, go left", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [{ from: "r", to: "l", emphasis: "active" }],
      },
      caption: "`3` is less than `8`, so the search descends left.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "3", tag: "found", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "`3` matches the node at this position: the search stops here, found in exactly `2` comparisons.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle" },
          { id: "newkey", label: "insert 6", tag: "goal", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
        ],
      },
      caption: "Inserting `6` follows the same compare-and-descend path used for search, until it finds an empty spot.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "6 < 8, go left", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [{ from: "r", to: "l", emphasis: "active" }],
      },
      caption: "`6` is less than `8`: go left, to `3`.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "3", tag: "6 > 3, go right", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "`6` is greater than `3`: go right. `3` has no right child yet, so this is where `6` will land.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "new6", label: "6", tag: "inserted as leaf", x: 2, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "l", to: "new6", emphasis: "active" }],
      },
      caption: "`6` is inserted as a brand new leaf, the right child of `3`: insertion always lands where search would have found an empty spot.",
    },
    {
      state: {
        nodes: [
          { id: "s1", label: "5", tag: "insert order: 5, 3, 8", x: 1, y: 0, shape: "circle", emphasis: "new" },
          { id: "s2", label: "3", x: 0, y: 2, shape: "circle", emphasis: "new" },
          { id: "s3", label: "8", x: 2, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "s1", to: "s2" },
          { from: "s1", to: "s3" },
        ],
      },
      caption: "Inserting `5`, then `3`, then `8` builds a short, balanced-looking tree: `5` on top, `3` and `8` as its two children.",
    },
    {
      state: {
        nodes: [
          { id: "v1", label: "3", tag: "insert order: 3, 5, 8", x: 4, y: 0, shape: "circle", emphasis: "new" },
          { id: "v2", label: "5", x: 5, y: 2, shape: "circle", emphasis: "new" },
          { id: "v3", label: "8", x: 6, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "v1", to: "v2", emphasis: "active" },
          { from: "v2", to: "v3", emphasis: "active" },
        ],
      },
      caption: "The exact same three values, `3`, `5`, `8`, inserted in already-sorted order instead, produce a completely different shape: a long vine leaning right, with no branching at all.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "A BST has root 20, with left child 10 and right child 30. Searching for 25, which nodes get visited in order?",
      steps: [
        {
          state: {
            nodes: [
              { id: "r", label: "20", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "l", label: "10", x: 1, y: 2, shape: "circle", emphasis: "new" },
              { id: "rt", label: "30", x: 5, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [
              { from: "r", to: "l" },
              { from: "r", to: "rt" },
            ],
          },
          caption: "The tree has `20` at the root, `10` on the left, `30` on the right.",
        },
      ],
      options: [
        { id: "a", label: "20, then 30, ending not found" },
        { id: "b", label: "20, then 10, ending not found" },
        { id: "c", label: "20, then 30, then 10" },
        { id: "d", label: "30 only" },
      ],
      correctId: "a",
      explainWrong: {
        b: "25 is greater than 20, so the search goes right toward 30, not left toward 10.",
        c: "The search only follows one path down, it never backtracks to check 10 after going right; once it heads toward 30, 10 is never visited.",
        d: "The search always starts at the root, 20, before it can move anywhere else; it can't skip straight to 30.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "rt", label: "30", tag: "no left child, not found", x: 5, y: 2, shape: "circle", emphasis: "error" }],
          arrows: [],
        },
        caption: "`20` is checked first (`25 > 20`, go right), then `30` (`25 < 30`, go left), but `30` has no left child, so `25` is not found.",
      },
      reviewStep: 1,
    },
    {
      kind: "predict",
      prompt: "Inserting the values 1, 2, 3, 4 in that exact order into an empty BST produces what shape?",
      steps: [
        {
          state: {
            nodes: [{ id: "one", label: "1", tag: "first insert", x: 1, y: 0, shape: "circle", emphasis: "new" }],
            arrows: [],
          },
          caption: "`1` becomes the root, since it's inserted first into an empty tree.",
        },
      ],
      options: [
        { id: "a", label: "A balanced tree with 1 or 2 at the root" },
        { id: "b", label: "A vine leaning right: each new value becomes the right child of the last" },
        { id: "c", label: "A vine leaning left" },
        { id: "d", label: "It errors, since the values are already sorted" },
      ],
      correctId: "b",
      explainWrong: {
        a: "BST insertion never rebalances on its own; inserting already-sorted values in increasing order always produces a lopsided vine, not a balanced shape.",
        c: "Each new value, 2, 3, then 4, is greater than everything already in the tree, so every one of them goes right, not left.",
        d: "There is nothing invalid about inserting sorted values into a BST; it works fine, it just produces a very unbalanced shape.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "n1", label: "1", tag: "root", x: 0, y: 0, shape: "circle" },
            { id: "n2", label: "2", x: 1, y: 2, shape: "circle" },
            { id: "n3", label: "3", x: 2, y: 4, shape: "circle" },
          ],
          arrows: [
            { from: "n1", to: "n2", emphasis: "active" },
            { from: "n2", to: "n3", emphasis: "active" },
          ],
        },
        caption: "Each new value (`2`, `3`, `4`) is bigger than everything before it, so it always descends right, building a long vine instead of a branching tree.",
      },
      reviewStep: 8,
    },
    {
      kind: "fillin",
      prompt: "Fill in the comparison so bst_search correctly descends left when the target is smaller than the current node's value.",
      code: [
        "def bst_search(node, target):",
        "    if node is None:",
        "        return False",
        "    if node['val'] == target:",
        "        return True",
        "    if target {{op}} node['val']:",
        "        return bst_search(node['left'], target)",
        "    return bst_search(node['right'], target)",
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "<",
          explainWrong:
            "A BST keeps smaller values to the left. Descending left is only correct when target is less than the current node's value; using > or >= would send the search the wrong direction and miss values that actually exist.",
        },
      ],
      tests: [
        {
          name: "finds value in left subtree",
          code:
            "t = {'val': 8, 'left': {'val': 3, 'left': None, 'right': None}, 'right': {'val': 10, 'left': None, 'right': None}}\nassert bst_search(t, 3) is True, \"bst_search should find 3 in the left subtree\"",
        },
        {
          name: "reports missing value",
          code: "assert bst_search(t, 99) is False, \"bst_search should return False for a value not present\"",
        },
      ],
      reviewStep: 2,
    },
    {
      kind: "write",
      prompt:
        "Given a BST `node` (nested dicts with keys `'val'`, `'left'`, `'right'`) and a value `val`, return the BST with `val` inserted in the correct position. If `node` is `None`, return a new leaf dict for `val`.",
      difficulty: "Medium",
      examples: [
        { input: "node = None, val = 5", output: "{'val': 5, 'left': None, 'right': None}" },
        {
          input: "node = {'val': 5, 'left': None, 'right': None}, val = 3",
          output: "node['left'] == {'val': 3, 'left': None, 'right': None}",
          explanation: "`3` is less than `5`, so it becomes the left child.",
        },
      ],
      constraints: ["`val` is not already present in the tree", "the tree must stay a valid BST after insertion"],
      bigO: { answer: "O(n)", explain: "As this unit's `watch` steps show, inserting already-sorted values builds a vine-shaped BST, so `bst_insert` can walk all `n` nodes in the worst case." },
      starter: "def bst_insert(node, val):\n    # return a new leaf dict if node is None, otherwise descend and insert\n    pass\n",
      solution:
        "def bst_insert(node, val):\n    if node is None:\n        return {'val': val, 'left': None, 'right': None}\n    if val < node['val']:\n        node['left'] = bst_insert(node['left'], val)\n    else:\n        node['right'] = bst_insert(node['right'], val)\n    return node\n",
      tests: [
        {
          name: "inserting into empty tree makes a leaf",
          code:
            "t = bst_insert(None, 5)\nassert t == {'val': 5, 'left': None, 'right': None}, \"inserting into an empty tree should create a single leaf node holding 5\"",
        },
        {
          name: "smaller value goes left",
          code:
            "t2 = bst_insert({'val': 5, 'left': None, 'right': None}, 3)\nassert t2['left'] == {'val': 3, 'left': None, 'right': None}, \"3 is less than 5, so it should become the left child\"",
        },
        {
          name: "larger value goes right",
          code:
            "t3 = bst_insert({'val': 5, 'left': None, 'right': None}, 8)\nassert t3['right'] == {'val': 8, 'left': None, 'right': None}, \"8 is greater than 5, so it should become the right child\"",
        },
      ],
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "dsa-trees.bst-search-insert.1",
      prompt: "At each node during a BST search, what decides whether the search goes left or right?",
      options: [
        "Whether the target is less than or greater than the current node's value",
        "Whether the current node is a leaf",
        "The order the nodes were originally inserted",
      ],
      correctIndex: 0,
      explainWrong:
        "The BST property is what drives the decision: compare the target to the current node's value. Being a leaf or the historical insert order plays no role in which direction a search takes at a given node.",
    },
    {
      id: "dsa-trees.bst-search-insert.2",
      prompt: "Inserting the same three values into a BST but in a different order can produce what?",
      options: [
        "A differently shaped tree, sometimes balanced, sometimes a long vine",
        "The exact same tree every time, since BSTs always end up identical",
        "An error, since BSTs require values to be inserted in sorted order",
      ],
      correctIndex: 0,
      explainWrong:
        "BSTs place a value strictly by walking down the tree that already exists, so a different insertion order builds a different path each time, ending in a different shape. Sorted order isn't required to insert; it's actually the order that tends to produce the worst, most vine-like shape.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: bst-remove — three explicit removal cases: leaf, one child, and
// two children with a successor swap.
// ---------------------------------------------------------------------------

const bstRemoveUnit: Unit = {
  id: "bst-remove",
  title: "Remove: Leaf, One Child, or Successor Swap",
  watch: [
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
        ],
      },
      caption: "Removing `3`, a leaf with no children at all: the simplest case.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [{ from: "r", to: "rt" }],
      },
      caption: "A leaf is simply detached: `3` is removed outright, and the spot it occupied just becomes empty.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "rt", label: "10", tag: "removing", x: 5, y: 2, shape: "circle", emphasis: "active" },
          { id: "child", label: "9", x: 4, y: 4, shape: "circle" },
        ],
        arrows: [{ from: "rt", to: "child" }],
      },
      caption: "Now removing `10`, which has exactly one child, `9`.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "child", label: "9", x: 5, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "r", to: "child", emphasis: "active" }],
      },
      caption: "With one child, that child is spliced directly into the removed node's spot: `9` now hangs straight off `8`, taking `10`'s old place.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "removing", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "12", x: 5, y: 2, shape: "circle" },
          { id: "rtl", label: "9", tag: "successor", x: 4, y: 4, shape: "circle", emphasis: "active" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
          { from: "rt", to: "rtl" },
        ],
      },
      caption: "Removing `8` now, which has two children, `3` and `12`: the hardest case. Its in-order successor, the smallest value in its right subtree, is `9`.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "9", tag: "value swapped in", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "12", x: 5, y: 2, shape: "circle" },
          { id: "rtl", label: "9", tag: "now duplicate", x: 4, y: 4, shape: "circle", emphasis: "error" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
          { from: "rt", to: "rtl" },
        ],
      },
      caption: "`9`'s value is copied up into the root's spot, replacing `8`. Now there are two `9`s: the copy at the root, and the original still down in the right subtree.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "9", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "12", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
        ],
      },
      caption: "The original successor node, now a duplicate leaf, is deleted using the plain leaf-removal case: the tree ends with exactly one `9`, at the root.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "Removing a leaf node from a BST requires which of these steps?",
      steps: [
        {
          state: {
            nodes: [{ id: "leaf", label: "leaf node", tag: "no children", x: 3, y: 2, shape: "circle", emphasis: "new" }],
            arrows: [],
          },
          caption: "A leaf has no children to worry about reattaching.",
        },
      ],
      options: [
        { id: "a", label: "Just detach it; nothing needs to be reattached" },
        { id: "b", label: "Find its in-order successor first" },
        { id: "c", label: "Splice its child into its former spot" },
        { id: "d", label: "Swap it with the root" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Finding a successor is only needed for the two-children case, where a replacement value must come from somewhere; a leaf has no subtree to pull a successor from.",
        c: "Splicing a child in only makes sense when there is a child to splice; a leaf, by definition, has none.",
        d: "There's no reason to touch the root at all when removing an unrelated leaf elsewhere in the tree.",
      },
      revealStep: {
        state: {
          nodes: [],
          arrows: [],
        },
        caption: "A leaf is simply detached from its parent; there is no child or successor to deal with.",
      },
      reviewStep: 1,
    },
    {
      kind: "predict",
      prompt:
        "A node with two children is being removed. Where does its in-order successor come from?",
      steps: [
        {
          state: {
            nodes: [
              { id: "n", label: "removing", tag: "two children", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "left", label: "left subtree", x: 1, y: 2, shape: "frame", emphasis: "new" },
              { id: "right", label: "right subtree", x: 5, y: 2, shape: "frame", emphasis: "new" },
            ],
            arrows: [
              { from: "n", to: "left" },
              { from: "n", to: "right" },
            ],
          },
          caption: "The node being removed has both a `left` and `right` subtree.",
        },
      ],
      options: [
        { id: "a", label: "The smallest value in the right subtree" },
        { id: "b", label: "The largest value in the left subtree" },
        { id: "c", label: "The root of the whole tree" },
        { id: "d", label: "A random leaf anywhere in the tree" },
      ],
      correctId: "a",
      explainWrong: {
        b: "The largest value in the left subtree is the in-order predecessor, a valid alternative in some implementations, but the standard in-order successor specifically comes from the right subtree's smallest value.",
        c: "The removed node's replacement must preserve BST ordering relative to its own neighbors; the overall tree root has no guaranteed relationship to this local removal.",
        d: "A random leaf could violate the BST property entirely; the successor must be a specific value, the smallest in the right subtree, to keep every ordering rule intact.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "succ", label: "smallest in right subtree", tag: "successor", x: 4, y: 3, shape: "circle", emphasis: "active" }],
          arrows: [],
        },
        caption: "The in-order successor is always the smallest value in the `right` subtree, found by walking `left` from the right child as far as possible.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the direction so find_min correctly walks to the smallest value in a subtree by always going left.",
      code: [
        "def find_min(node):",
        "    while node['{{dir}}'] is not None:",
        "        node = node['{{dir}}']",
        "    return node['val']",
      ].join("\n"),
      blanks: [
        {
          id: "dir",
          placeholder: "___",
          answer: "left",
          explainWrong:
            "In a BST, smaller values are always found by walking left. Walking 'right' instead would find the largest value in the subtree, not the smallest.",
        },
      ],
      tests: [
        {
          name: "finds min of a small subtree",
          code:
            "t = {'val': 12, 'left': {'val': 9, 'left': None, 'right': None}, 'right': None}\nassert find_min(t) == 9, \"find_min should walk left to find 9, the smallest value\"",
        },
        {
          name: "single node is its own min",
          code: "assert find_min({'val': 4, 'left': None, 'right': None}) == 4, \"a single node with no left child is its own minimum\"",
        },
      ],
      reviewStep: 4,
    },
    {
      kind: "write",
      prompt:
        "Given a BST `node` (nested dicts with keys `'val'`, `'left'`, `'right'`) and a value `val` to remove, return the BST with `val` removed. Handle all three cases: a leaf is removed by returning `None`, a node with one child is replaced by that child, and a node with two children has its in-order successor's value copied up before the successor itself is removed from the right subtree.",
      difficulty: "Hard",
      examples: [
        {
          input: "node = {'val': 8, 'left': {'val': 3, ...}, 'right': {'val': 10, ...}}, val = 3",
          output: "node['left'] is None",
          explanation: "Removing leaf `3` simply detaches it.",
        },
        {
          input: "node with val = 8, two children, right subtree's smallest value is 9, val = 8",
          output: "node['val'] == 9",
          explanation: "The in-order successor's value, `9`, is copied up to replace `8`.",
        },
      ],
      constraints: ["`val` is always present in the tree", "the result must remain a valid BST"],
      bigO: { answer: "O(n)", explain: "A skewed BST (as seen elsewhere in this chapter) can force `bst_remove` to walk down `n` nodes before reaching `val`." },
      starter:
        "def bst_remove(node, val):\n    if node is None:\n        return None\n    if val < node['val']:\n        node['left'] = bst_remove(node['left'], val)\n    elif val > node['val']:\n        node['right'] = bst_remove(node['right'], val)\n    else:\n        # this is the node to remove: handle leaf, one-child, and two-children cases\n        pass\n    return node\n",
      solution:
        "def bst_remove(node, val):\n    if node is None:\n        return None\n    if val < node['val']:\n        node['left'] = bst_remove(node['left'], val)\n    elif val > node['val']:\n        node['right'] = bst_remove(node['right'], val)\n    else:\n        if node['left'] is None and node['right'] is None:\n            return None\n        if node['left'] is None:\n            return node['right']\n        if node['right'] is None:\n            return node['left']\n        successor = node['right']\n        while successor['left'] is not None:\n            successor = successor['left']\n        node['val'] = successor['val']\n        node['right'] = bst_remove(node['right'], successor['val'])\n    return node\n",
      tests: [
        {
          name: "removes a leaf",
          code:
            "t = {'val': 8, 'left': {'val': 3, 'left': None, 'right': None}, 'right': {'val': 10, 'left': None, 'right': None}}\nresult = bst_remove(t, 3)\nassert result['left'] is None, \"removing leaf 3 should leave 8's left child as None\"",
        },
        {
          name: "splices single child",
          code:
            "t2 = {'val': 8, 'left': None, 'right': {'val': 10, 'left': {'val': 9, 'left': None, 'right': None}, 'right': None}}\nresult2 = bst_remove(t2, 10)\nassert result2['right']['val'] == 9, \"removing 10 (one child, 9) should splice 9 into 10's old spot\"",
        },
        {
          name: "two-children removal preserves BST order",
          code:
                    "t3 = {'val': 8, 'left': {'val': 3, 'left': None, 'right': None}, 'right': {'val': 12, 'left': {'val': 9, 'left': None, 'right': None}, 'right': None}}\nresult3 = bst_remove(t3, 8)\nassert result3['val'] == 9, \"removing 8 (two children) should copy up 9, the in-order successor\"\nassert result3['right']['left'] is None, \"the original successor node 9 should be removed from the right subtree afterward\"",
        },
      ],
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "dsa-trees.bst-remove.1",
      prompt: "What happens when removing a BST node that has exactly one child?",
      options: [
        "The child is spliced directly into the removed node's former position",
        "The child becomes a duplicate leaf elsewhere",
        "The whole subtree below is deleted along with the node",
      ],
      correctIndex: 0,
      explainWrong:
        "The subtree below the removed node isn't discarded; that would lose real data. Instead, the single child simply takes over the removed node's spot in the tree, keeping everything below it intact.",
    },
    {
      id: "dsa-trees.bst-remove.2",
      prompt: "When removing a BST node with two children, why is its in-order successor used as the replacement value?",
      options: [
        "Because the successor is the smallest value still greater than everything in the node's left subtree, preserving BST order",
        "Because it's always the fastest node to find",
        "Because the root is always the correct replacement value",
      ],
      correctIndex: 0,
      explainWrong:
        "Finding the successor isn't chosen for raw speed, and the tree's overall root has nothing to do with a local removal elsewhere. The successor works specifically because it slots in without breaking the ordering: it's greater than the entire left subtree and smaller than everything else in the right subtree.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: traversals — in-order visits sorted order; pre/post/level order
// visit the same tree in different sequences.
// ---------------------------------------------------------------------------

const traversalsUnit: Unit = {
  id: "traversals",
  title: "Same Tree, Different Visiting Order",
  watch: [
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle" },
          { id: "ll", label: "1", x: 0, y: 4, shape: "circle" },
          { id: "lr", label: "6", x: 2, y: 4, shape: "circle" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
          { from: "l", to: "ll" },
          { from: "l", to: "lr" },
        ],
      },
      caption: "This tree will be walked four different ways: `in-order`, `pre-order`, `post-order`, and `level-order`.",
    },
    {
      state: {
        nodes: [
          { id: "ll", label: "1", tag: "visiting", x: 0, y: 4, shape: "circle", emphasis: "active" },
          { id: "out1", label: "1", tag: "output", x: 0, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "In-order walks left subtree, then node, then right subtree. That sends it all the way down to `1` first, emitting it.",
    },
    {
      state: {
        nodes: [
          { id: "l", label: "3", tag: "visiting", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "out2", label: "1, 3", tag: "output", x: 0, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Back up to `3` next, emitting it right after its left subtree finished.",
    },
    {
      state: {
        nodes: [
          { id: "lr", label: "6", tag: "visiting", x: 2, y: 4, shape: "circle", emphasis: "active" },
          { id: "out3", label: "1, 3, 6", tag: "output", x: 0, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Then `3`'s right subtree, `6`, is visited and emitted.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "visiting", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "out4", label: "1, 3, 6, 8", tag: "output", x: 0, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`8` is emitted once its entire left subtree is done, then finally `10`. In-order produces `1, 3, 6, 8, 10`: perfectly sorted.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "pre-order: node first", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "outpre", label: "8", tag: "output", x: 5, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Pre-order visits the node itself before either subtree, so `8` is emitted immediately, first.",
    },
    {
      state: {
        nodes: [
          { id: "outpre2", label: "8, 3, 1, 6, 10", tag: "pre-order output", x: 5, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Pre-order continues node-then-subtrees at every level: `8`, then `3`, then `3`'s children `1` and `6`, then finally `10`.",
    },
    {
      state: {
        nodes: [
          { id: "outpost", label: "1, 6, 3, 10, 8", tag: "post-order output", x: 5, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Post-order visits both subtrees fully before the node itself, so children always appear before their parent: `1, 6, 3, 10, 8`.",
    },
    {
      state: {
        nodes: [
          { id: "outlevel", label: "8, 3, 10, 1, 6", tag: "level-order output", x: 5, y: 6, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Level-order visits row by row, top to bottom, left to right: `8`, then `3` and `10`, then `1` and `6`, a completely different rhythm from the other three.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "A BST always produces sorted output using which traversal order?",
      steps: [
        {
          state: {
            nodes: [
              { id: "r", label: "5", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "l", label: "2", x: 1, y: 2, shape: "circle", emphasis: "new" },
              { id: "rt", label: "9", x: 5, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [
              { from: "r", to: "l" },
              { from: "r", to: "rt" },
            ],
          },
          caption: "Any valid BST keeps `left` subtree values smaller and `right` subtree values larger, at every node.",
        },
      ],
      options: [
        { id: "a", label: "In-order" },
        { id: "b", label: "Pre-order" },
        { id: "c", label: "Post-order" },
        { id: "d", label: "Level-order" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Pre-order emits the node before its subtrees, so a parent like 5 is emitted before its smaller left descendants, breaking sorted order.",
        c: "Post-order emits the node after both subtrees, so 5 would appear after its right subtree's larger values, again out of sorted order.",
        d: "Level-order groups by depth, not by value; a deep-left small value and a shallow-right large value can appear in the wrong relative order.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "out", label: "2, 5, 9", tag: "in-order output", x: 3, y: 4, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "In-order visits left, node, right at every level, which for a BST always emits values in ascending sorted order: `2, 5, 9`.",
      },
      reviewStep: 4,
    },
    {
      kind: "predict",
      prompt: "For the tree with root 8, left child 3, right child 10, what does level-order traversal emit?",
      steps: [
        {
          state: {
            nodes: [
              { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "l", label: "3", x: 1, y: 2, shape: "circle", emphasis: "new" },
              { id: "rt", label: "10", x: 5, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [
              { from: "r", to: "l" },
              { from: "r", to: "rt" },
            ],
          },
          caption: "Level-order visits row by row, top to bottom.",
        },
      ],
      options: [
        { id: "a", label: "8, 3, 10" },
        { id: "b", label: "3, 8, 10" },
        { id: "c", label: "3, 10, 8" },
        { id: "d", label: "10, 3, 8" },
      ],
      correctId: "a",
      explainWrong: {
        b: "This is in-order's output, left then node then right, not level-order, which visits the whole top row before moving down.",
        c: "This ordering doesn't correspond to any standard traversal of this tree; level-order always visits the root first, since it's the only node on the top row.",
        d: "Level-order starts at the root, the sole node on row 0, before it ever reaches row 1; 10 can't come first.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "out", label: "8, 3, 10", tag: "level-order output", x: 3, y: 4, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "Level-order visits the root's row first (just `8`), then the next row left to right (`3`, `10`): `8, 3, 10`.",
      },
      reviewStep: 7,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing recursive call so in_order visits left, then the node's value, then right, in that order.",
      code: [
        "def in_order(node, output):",
        "    if node is None:",
        "        return",
        "    in_order(node['left'], output)",
        "    output.append(node['val'])",
        "    in_order(node['{{side}}'], output)",
      ].join("\n"),
      blanks: [
        {
          id: "side",
          placeholder: "___",
          answer: "right",
          explainWrong:
            "In-order visits left, then the node, then right, in that exact sequence. The final recursive call must descend into 'right'; calling 'left' again would skip the right subtree entirely and revisit the left one.",
        },
      ],
      tests: [
        {
          name: "in-order gives sorted output",
          code:
            "t = {'val': 8, 'left': {'val': 3, 'left': None, 'right': None}, 'right': {'val': 10, 'left': None, 'right': None}}\nout = []\nin_order(t, out)\nassert out == [3, 8, 10], \"in_order should emit [3, 8, 10]: left, node, then right\"",
        },
      ],
      reviewStep: 4,
    },
    {
      kind: "write",
      prompt:
        "Given a binary tree `node` (nested dicts with keys `'val'`, `'left'`, `'right'`) and a list `output`, append every value to `output` in pre-order: the node itself, then its left subtree, then its right subtree.",
      difficulty: "Easy",
      examples: [
        {
          input: "node = {'val': 8, 'left': {'val': 3, ...}, 'right': {'val': 10, ...}}, output = []",
          output: "output == [8, 3, 10]",
        },
      ],
      constraints: ["`node` may be `None`, in which case nothing is appended", "`output` is mutated in place"],
      bigO: { answer: "O(n)", explain: "`pre_order` visits every node in the tree exactly once, so its cost grows linearly with the node count `n`." },
      starter: "def pre_order(node, output):\n    # node first, then left, then right\n    pass\n",
      solution:
        "def pre_order(node, output):\n    if node is None:\n        return\n    output.append(node['val'])\n    pre_order(node['left'], output)\n    pre_order(node['right'], output)\n",
      tests: [
        {
          name: "visits node before children",
          code:
            "t = {'val': 8, 'left': {'val': 3, 'left': None, 'right': None}, 'right': {'val': 10, 'left': None, 'right': None}}\nout = []\npre_order(t, out)\nassert out == [8, 3, 10], \"pre_order should emit [8, 3, 10]: node, then left, then right\"",
        },
        {
          name: "handles a deeper tree",
          code:
            "t2 = {'val': 8, 'left': {'val': 3, 'left': {'val': 1, 'left': None, 'right': None}, 'right': {'val': 6, 'left': None, 'right': None}}, 'right': None}\nout2 = []\npre_order(t2, out2)\nassert out2 == [8, 3, 1, 6], \"pre_order should emit [8, 3, 1, 6]: node before its own left and right subtrees at every level\"",
        },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "dsa-trees.traversals.1",
      prompt: "Which traversal order always emits a BST's values in sorted order?",
      options: [
        "In-order (left, node, right)",
        "Pre-order (node, left, right)",
        "Level-order (row by row)",
      ],
      correctIndex: 0,
      explainWrong:
        "Only in-order's left-node-right sequence lines up with the BST property at every node. Pre-order and level-order visit nodes in an order tied to structure or depth, not to value, so neither guarantees sorted output.",
    },
    {
      id: "dsa-trees.traversals.2",
      prompt: "What distinguishes post-order traversal from pre-order?",
      options: [
        "Post-order visits both children before the node itself; pre-order visits the node first",
        "Post-order only works on leaves",
        "Post-order and pre-order always produce identical output",
      ],
      correctIndex: 0,
      explainWrong:
        "Post-order isn't restricted to leaves, and the two orders are rarely identical for a tree with more than one node. The real difference is exactly when the node's own value gets emitted: after both children for post-order, before either for pre-order.",
    },
    {
      id: "dsa-trees.traversals.3",
      prompt: "How does level-order traversal differ fundamentally from the other three orders?",
      options: [
        "It visits nodes row by row using a queue, rather than diving depth-first down one branch first",
        "It skips every other node",
        "It only visits leaf nodes",
      ],
      correctIndex: 0,
      explainWrong:
        "Level-order doesn't skip nodes or ignore internal ones. Its defining trait is visiting breadth-first, row by row, typically using a queue, instead of the depth-first left/right/node ordering the other three share.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 5: apply-trees — apply recursive BST logic in a small program.
// ---------------------------------------------------------------------------

const applyTreesUnit: Unit = {
  id: "apply-trees",
  title: "Apply: BST Contains Check",
  watch: [
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "root", x: 3, y: 0, shape: "circle" },
          { id: "l", label: "3", x: 1, y: 2, shape: "circle" },
          { id: "rt", label: "10", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "r", to: "l" },
          { from: "r", to: "rt" },
        ],
      },
      caption: "A recursive `contains(node, target)` function reuses the same compare-and-descend idea from search, just returning a plain `True` or `False`.",
    },
    {
      state: {
        nodes: [
          { id: "r", label: "8", tag: "10 > 8, go right", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "rt", label: "10", tag: "found", x: 5, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [{ from: "r", to: "rt", emphasis: "active" }],
      },
      caption: "`contains(root, 10)` compares `10` to the root, descends right, and finds a match: it returns `True`.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given a BST `node` (nested dicts with keys `'val'`, `'left'`, `'right'`, `None` when a child is absent) and a value `target`, return `True` if `target` exists anywhere in the tree rooted at `node`, and `False` otherwise.",
      difficulty: "Easy",
      examples: [
        { input: "node with val = 8, left = 3, right = 10; target = 10", output: "True" },
        { input: "node = None, target = 5", output: "False", explanation: "An empty tree contains nothing." },
      ],
      constraints: ["`node` may be `None`", "the tree satisfies the BST property"],
      bigO: { answer: "O(n)", explain: "`contains` reuses `bst_search`'s descent, which can walk all `n` nodes when the BST is skewed rather than balanced." },
      starter: "def contains(node, target):\n    # compare and descend, just like bst_search\n    pass\n",
      solution:
        "def contains(node, target):\n    if node is None:\n        return False\n    if node['val'] == target:\n        return True\n    if target < node['val']:\n        return contains(node['left'], target)\n    return contains(node['right'], target)\n",
      tests: [
        {
          name: "finds root value",
          code:
            "t = {'val': 8, 'left': {'val': 3, 'left': None, 'right': None}, 'right': {'val': 10, 'left': None, 'right': None}}\nassert contains(t, 8) is True, \"contains(t, 8) should be True: 8 is the root\"",
        },
        {
          name: "finds value in a subtree",
          code: "assert contains(t, 10) is True, \"contains(t, 10) should be True: 10 is the right child\"",
        },
        {
          name: "reports missing value",
          code: "assert contains(t, 99) is False, \"contains(t, 99) should be False: 99 is not anywhere in this tree\"",
        },
        {
          name: "handles empty tree",
          code: "assert contains(None, 5) is False, \"contains(None, 5) should be False: an empty tree contains nothing\"",
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-trees.apply-trees.1",
      prompt: "Why can a BST's contains(node, target) function reuse the same left/right decision logic as search?",
      options: [
        "Because determining membership requires exactly the same compare-and-descend path as finding a value",
        "Because contains always checks every node in the tree",
        "Because contains only works on trees with a single node",
      ],
      correctIndex: 0,
      explainWrong:
        "contains doesn't need to scan every node, and it isn't limited to single-node trees. It reuses search's logic because 'does this value exist' and 'where is this value' both rely on the exact same BST ordering to decide direction.",
    },
    {
      id: "dsa-trees.apply-trees.2",
      prompt: "What should contains(None, target) return, and why?",
      options: [
        "False, because an empty subtree can't possibly contain any value",
        "True, because None means 'not yet determined'",
        "It should raise an error",
      ],
      correctIndex: 0,
      explainWrong:
        "None represents an empty subtree, not an undetermined result, so returning True would be incorrect: there is nothing there to match. It's also not an error case; hitting an empty subtree during a normal search is expected whenever the target isn't present.",
    },
  ],
};

export const chDsaTrees: Chapter = {
  id: "dsa-trees",
  phase: 2,
  title: "Trees and BSTs",
  units: [binaryTreesUnit, bstSearchInsertUnit, bstRemoveUnit, traversalsUnit, applyTreesUnit],
};
