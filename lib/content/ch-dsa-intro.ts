import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: ds-and-adts — an ADT is an interface, a promise of WHAT operations
// exist; an array and a linked chain are two different HOW's behind it.
// ---------------------------------------------------------------------------

const dsAndAdtsUnit: Unit = {
  id: "ds-and-adts",
  title: "Interface vs. Implementation",
  watch: [
    {
      state: {
        nodes: [{ id: "adt", label: "List ADT", tag: "get(i), append(x), remove(i)", x: 3, y: 0, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "The List ADT defines WHAT operations a list supports: get, append, remove. It says nothing about HOW they're implemented.",
    },
    {
      state: {
        nodes: [
          { id: "adt", label: "List ADT", tag: "get(i), append(x), remove(i)", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "arr0", label: "10", tag: "index 0", x: 0, y: 2, shape: "box", emphasis: "new" },
          { id: "arr1", label: "20", tag: "index 1", x: 2, y: 2, shape: "box", emphasis: "new" },
          { id: "arr2", label: "30", tag: "index 2", x: 4, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "adt", to: "arr0", label: "implements", emphasis: "active" }],
      },
      caption: "One implementation stores the list as a row of boxes in memory, an array: get(1) can jump straight to index 1.",
    },
    {
      state: {
        nodes: [
          { id: "adt", label: "List ADT", tag: "get(i), append(x), remove(i)", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "arr0", label: "10", tag: "index 0", x: 0, y: 2, shape: "box", emphasis: "dim" },
          { id: "arr1", label: "20", tag: "get(1) -> direct jump", x: 2, y: 2, shape: "box", emphasis: "active" },
          { id: "arr2", label: "30", tag: "index 2", x: 4, y: 2, shape: "box", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "Because array slots sit at known offsets, get(1) jumps directly to index 1: one step, regardless of list size.",
    },
    {
      state: {
        nodes: [
          { id: "adt", label: "List ADT", tag: "get(i), append(x), remove(i)", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "link0", label: "10", tag: "head", x: 0, y: 4, shape: "box", emphasis: "new" },
          { id: "link1", label: "20", tag: "next", x: 2, y: 4, shape: "box", emphasis: "new" },
          { id: "link2", label: "30", tag: "next", x: 4, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "adt", to: "link0", label: "implements", emphasis: "active" },
          { from: "link0", to: "link1" },
          { from: "link1", to: "link2" },
        ],
      },
      caption: "A second implementation stores the same list as a linked chain, each node pointing to the next, scattered anywhere in memory.",
    },
    {
      state: {
        nodes: [
          { id: "adt", label: "List ADT", tag: "get(i), append(x), remove(i)", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "link0", label: "10", tag: "step 1: start at head", x: 0, y: 4, shape: "box", emphasis: "active" },
          { id: "link1", label: "20", tag: "step 2: follow next, found it", x: 2, y: 4, shape: "box", emphasis: "active" },
          { id: "link2", label: "30", tag: "next", x: 4, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [{ from: "link0", to: "link1", emphasis: "active" }],
      },
      caption: "Here get(1) can't jump anywhere: it must walk from the head, one next pointer at a time, to reach index 1.",
    },
    {
      state: {
        nodes: [
          { id: "arrSum", label: "get(i): O(1)", tag: "array implementation", x: 1, y: 2, shape: "box", emphasis: "active" },
          { id: "linkSum", label: "get(i): O(n)", tag: "linked implementation", x: 4, y: 2, shape: "box", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Same List ADT operation, get(i), costs a single step in the array version but can cost n steps in the linked version.",
    },
    {
      state: {
        nodes: [
          { id: "adt", label: "List ADT", tag: "same interface: get, append, remove", x: 3, y: 0, shape: "frame", emphasis: "active" },
          { id: "arrImpl", label: "Array implementation", tag: "", x: 1, y: 2, shape: "box", emphasis: "new" },
          { id: "linkImpl", label: "Linked implementation", tag: "", x: 5, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "adt", to: "arrImpl", emphasis: "active" },
          { from: "adt", to: "linkImpl", emphasis: "active" },
        ],
      },
      caption: "The List ADT is one interface with many possible implementations underneath; callers only ever see get, append, and remove, never the internals.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "The List ADT defines get(i), append(x), and remove(i). If a list is implemented as a linked chain instead of an array (assume a tail pointer is kept), which operation gets slower for large lists: get(i) by index, or append(x) at the end?",
      steps: [
        {
          state: { nodes: [{ id: "link0", label: "head", tag: "linked chain", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
          caption: "A linked chain only gives direct access to its `head`, and its `tail` if one is tracked.",
        },
      ],
      options: [
        { id: "a", label: "get(i), since reaching index i means walking node by node from the head" },
        { id: "b", label: "append(x), since adding to the end always requires walking the whole chain" },
        { id: "c", label: "Both stay equally fast in either implementation" },
        { id: "d", label: "Neither; the List ADT guarantees the same speed no matter the implementation" },
      ],
      correctId: "a",
      explainWrong: {
        b: "With a tail pointer kept up to date, append(x) on a linked list is a quick operation: attach one node at the already-known tail. It's random-access get(i) that requires walking from the head.",
        c: "The ADT hides the implementation, but it does not hide performance: array and linked implementations of the same operation can have very different costs.",
        d: "The ADT guarantees WHAT the operations do, not how fast they run; different implementations of get(i) really can have very different costs.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "link0", label: "10", tag: "step 1: start at head", x: 0, y: 1, shape: "box", emphasis: "active" },
            { id: "link1", label: "20", tag: "step 2: found it", x: 2, y: 1, shape: "box", emphasis: "active" },
          ],
          arrows: [{ from: "link0", to: "link1", emphasis: "active" }],
        },
        caption: "Reaching index `1` in a linked chain still means walking from the `head`, one `next` pointer at a time.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the array-based get so it returns the value at position i.",
      code:
        "def _viz(name, xs):\n    nodes = [{\"id\": f\"n{i}\", \"label\": repr(v), \"x\": i, \"y\": 0} for i, v in enumerate(xs)]\n    nodes.insert(0, {\"id\": \"var\", \"label\": name, \"x\": 0, \"y\": 1, \"shape\": \"box\", \"tag\": \"variable\"})\n    arrows = [{\"from\": \"var\", \"to\": \"n0\"}] + [{\"from\": f\"n{i}\", \"to\": f\"n{i+1}\"} for i in range(len(xs) - 1)]\n    return {\"nodes\": nodes, \"arrows\": arrows}\n\ndef get(items, i):\n    return items[{{idx}}]",
      blanks: [
        {
          id: "idx",
          placeholder: "___",
          answer: "i",
          explainWrong:
            "get(i) is supposed to return the value stored at position i; indexing with anything other than i would return the wrong element, or the wrong type entirely.",
        },
      ],
      tests: [
        { name: "get([10, 20, 30], 1) is 20", code: "assert get([10, 20, 30], 1) == 20, \"get([10, 20, 30], 1) should be 20: direct index access\"" },
        { name: "get([10, 20, 30], 0) is 10", code: "assert get([10, 20, 30], 0) == 10, \"get([10, 20, 30], 0) should be 10: index 0 is the first element\"" },
      ],
      vizExpr: '_viz("items", [10, 20, 30])',
      reviewStep: 2,
    },
    {
      kind: "write",
      prompt:
        "Given the `head` of a linked chain represented as nested dicts like `{\"value\": 10, \"next\": ...}` ending in `None`, and an integer `index`, return the value stored at that index.",
      difficulty: "Easy",
      examples: [
        {
          input: 'head = {"value": 10, "next": {"value": 20, "next": None}}, index = 1',
          output: "20",
        },
        {
          input: 'head = {"value": 10, "next": None}, index = 0',
          output: "10",
          explanation: "Index `0` is the head node itself, no traversal needed.",
        },
      ],
      constraints: ["`0 <= index < number of nodes in the chain`", "the chain ends with `next` equal to `None`"],
      bigO: { answer: "O(n)", explain: "Walks `index` steps forward from `head`, following `next` once per step." },
      starter:
        "def linked_get(head, index):\n    # walk `index` steps forward from head, following \"next\" each time\n    # then return that node's \"value\"\n    pass\n",
      solution:
        "def linked_get(head, index):\n    node = head\n    for _ in range(index):\n        node = node[\"next\"]\n    return node[\"value\"]\n",
      tests: [
        {
          name: "index 0 is the head's own value",
          code:
            "chain = {\"value\": 10, \"next\": {\"value\": 20, \"next\": {\"value\": 30, \"next\": None}}}\nassert linked_get(chain, 0) == 10, \"linked_get(chain, 0) should be 10: index 0 is the head node itself, no traversal needed\"",
        },
        {
          name: "index 2 requires walking two next pointers",
          code:
            "chain = {\"value\": 10, \"next\": {\"value\": 20, \"next\": {\"value\": 30, \"next\": None}}}\nassert linked_get(chain, 2) == 30, \"linked_get(chain, 2) should be 30: walk next twice from the head to reach the third node\"",
        },
        {
          name: "index 1 requires walking one next pointer",
          code:
            "chain = {\"value\": 10, \"next\": {\"value\": 20, \"next\": {\"value\": 30, \"next\": None}}}\nassert linked_get(chain, 1) == 20, \"linked_get(chain, 1) should be 20: walk next once from the head\"",
        },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-intro.ds-and-adts.1",
      prompt: "What does an ADT, an abstract data type, actually specify?",
      options: [
        "The operations it supports and what they do, without saying how they're implemented",
        "The exact memory layout that must be used internally",
        "The programming language a data structure must be written in",
      ],
      correctIndex: 0,
      explainWrong:
        "An ADT is defined purely by its interface, the operations and their behavior. It deliberately leaves the internal memory layout and implementation language unspecified, since those are implementation details.",
    },
    {
      id: "dsa-intro.ds-and-adts.2",
      prompt: "Two different implementations of the List ADT, array-based and linked, both support get(i). Why might one be much slower than the other for large lists?",
      options: [
        "Array offers direct index math, an O(1) jump; linked requires walking node by node from the head, O(n)",
        "The List ADT requires linked implementations to be slower on purpose",
        "They're always equally fast since they implement the same ADT",
      ],
      correctIndex: 0,
      explainWrong:
        "The ADT says nothing about speed; it's the underlying data layout that decides it. An array can compute an index's memory location directly, while a linked chain has no such shortcut and must traverse from the head.",
    },
    {
      id: "dsa-intro.ds-and-adts.3",
      prompt: "If code only ever calls get(i), append(x), and remove(i) on a MyList object, can the internal implementation be swapped from an array to a linked chain without changing that calling code?",
      options: [
        "Yes, as long as the new implementation still provides the same interface",
        "No, calling code always needs to know the internal implementation",
        "Only if the list is empty",
      ],
      correctIndex: 0,
      explainWrong:
        "This is the entire point of an ADT: calling code depends only on the interface, get, append, remove, so any implementation providing that same interface can be swapped in without touching the caller.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: huffman — repeatedly merge the two lowest-frequency nodes; a
// character's code is just the path of 0/1 edge labels down to its leaf.
// ---------------------------------------------------------------------------

const huffmanUnit: Unit = {
  id: "huffman",
  title: "Huffman: Merge the Two Smallest",
  watch: [
    {
      state: {
        nodes: [
          { id: "a", label: "a:2", x: 0, y: 4, shape: "circle", emphasis: "new" },
          { id: "b", label: "b:3", x: 2, y: 4, shape: "circle", emphasis: "new" },
          { id: "c", label: "c:4", x: 4, y: 4, shape: "circle", emphasis: "new" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Each character starts life as its own node holding its frequency count.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a:2", x: 0, y: 4, shape: "circle", emphasis: "active" },
          { id: "b", label: "b:3", x: 2, y: 4, shape: "circle", emphasis: "active" },
          { id: "c", label: "c:4", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "Huffman always merges the two smallest-frequency nodes first: here that's a, at 2, and b, at 3.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a:2", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "b", label: "b:3", x: 2, y: 4, shape: "circle", emphasis: "dim" },
          { id: "ab", label: "ab:5", x: 1, y: 3, shape: "circle", emphasis: "new" },
          { id: "c", label: "c:4", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [
          { from: "a", to: "ab", label: "0", emphasis: "active" },
          { from: "b", to: "ab", label: "1", emphasis: "active" },
        ],
      },
      caption: "a and b merge into a new parent node, ab:5, with edges labeled 0 and 1 leading down to each child.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a:2", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "b", label: "b:3", x: 2, y: 4, shape: "circle", emphasis: "dim" },
          { id: "ab", label: "ab:5", x: 1, y: 3, shape: "circle", emphasis: "active" },
          { id: "c", label: "c:4", x: 4, y: 4, shape: "circle", emphasis: "active" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [
          { from: "a", to: "ab", label: "0" },
          { from: "b", to: "ab", label: "1" },
        ],
      },
      caption: "Among what's left, ab, at 5, and c, at 4, are now the two smallest, so they merge next.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a:2", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "b", label: "b:3", x: 2, y: 4, shape: "circle", emphasis: "dim" },
          { id: "ab", label: "ab:5", x: 1, y: 3, shape: "circle", emphasis: "dim" },
          { id: "c", label: "c:4", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "abc", label: "abc:9", x: 2, y: 2, shape: "circle", emphasis: "new" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [
          { from: "a", to: "ab", label: "0" },
          { from: "b", to: "ab", label: "1" },
          { from: "c", to: "abc", label: "0", emphasis: "active" },
          { from: "ab", to: "abc", label: "1", emphasis: "active" },
        ],
      },
      caption: "c and ab merge into abc:9, again labeling the two new edges 0 and 1.",
    },
    {
      state: {
        nodes: [
          { id: "abc", label: "abc:9", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Only two nodes remain, abc at 9 and d at 20, so they merge last to form the root.",
    },
    {
      state: {
        nodes: [
          { id: "abc", label: "abc:9", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "dim" },
          { id: "root", label: "root:29", x: 4, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "abc", to: "root", label: "0", emphasis: "active" },
          { from: "d", to: "root", label: "1", emphasis: "active" },
        ],
      },
      caption: "abc and d merge into the root, root:29. Every character is now a leaf somewhere under it.",
    },
    {
      state: {
        nodes: [
          { id: "root", label: "root:29", x: 4, y: 1, shape: "circle", emphasis: "active" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "active" },
          { id: "abc", label: "abc:9", x: 2, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [{ from: "root", to: "d", label: "1", emphasis: "active" }],
      },
      caption: 'Reading edge labels from the root down to d takes just one step, label 1, so d\'s Huffman code is simply "1".',
    },
    {
      state: {
        nodes: [
          { id: "root", label: "root:29", x: 4, y: 1, shape: "circle", emphasis: "active" },
          { id: "abc", label: "abc:9", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "ab", label: "ab:5", x: 1, y: 3, shape: "circle", emphasis: "active" },
          { id: "a", label: "a:2", x: 0, y: 4, shape: "circle", emphasis: "active" },
          { id: "d", label: "d:20", x: 6, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [
          { from: "root", to: "abc", label: "0", emphasis: "active" },
          { from: "abc", to: "ab", label: "1", emphasis: "active" },
          { from: "ab", to: "a", label: "0", emphasis: "active" },
        ],
      },
      caption: 'Reaching a takes three edges, 0 then 1 then 0, giving code "010": the least frequent symbol gets the longest code, while d, the most frequent, got the shortest.',
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "Huffman coding always merges the two smallest-frequency nodes first. Given a:2, b:3, c:4, d:20, which two nodes merge first?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "a:2", x: 0, y: 1, shape: "circle", emphasis: "new" },
              { id: "b", label: "b:3", x: 2, y: 1, shape: "circle", emphasis: "new" },
              { id: "c", label: "c:4", x: 4, y: 1, shape: "circle", emphasis: "new" },
              { id: "d", label: "d:20", x: 6, y: 1, shape: "circle", emphasis: "new" },
            ],
            arrows: [],
          },
          caption: "Four leaf nodes, each holding its own frequency.",
        },
      ],
      options: [
        { id: "a", label: "a and b, the two smallest frequencies" },
        { id: "b", label: "c and d, the two largest frequencies" },
        { id: "c", label: "a and d, the smallest and the largest" },
        { id: "d", label: "b and c, the two middle frequencies" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Huffman merges the SMALLEST frequencies first, not the largest; merging the two biggest first would push the most common symbol deep into the tree, giving it an unnecessarily long code.",
        c: "Huffman doesn't pair extremes together; it repeatedly grabs whichever two nodes currently have the lowest frequencies, which starts with a and b here.",
        d: "b and c aren't the two smallest available at the start; a, at 2, is lower than both b, at 3, and c, at 4.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "a:2", x: 0, y: 1, shape: "circle", emphasis: "dim" },
            { id: "b", label: "b:3", x: 2, y: 1, shape: "circle", emphasis: "dim" },
            { id: "ab", label: "ab:5", x: 1, y: 0, shape: "circle", emphasis: "new" },
          ],
          arrows: [
            { from: "a", to: "ab", label: "0", emphasis: "active" },
            { from: "b", to: "ab", label: "1", emphasis: "active" },
          ],
        },
        caption: "`a` and `b` merge first into `ab:5`, since they were the two lowest frequencies available.",
      },
      reviewStep: 1,
    },
    {
      kind: "predict",
      prompt:
        "After the whole tree is built, d ends up one edge from the root while a ends up three edges deep. What does that difference in depth mean for their Huffman codes?",
      steps: [
        {
          state: {
            nodes: [
              { id: "root", label: "root:29", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "d", label: "d:20", x: 5, y: 1, shape: "circle", emphasis: "new" },
              { id: "a", label: "a:2", x: 0, y: 3, shape: "circle", emphasis: "new" },
            ],
            arrows: [{ from: "root", to: "d", label: "1" }],
          },
          caption: "`d` sits just one edge below the root; `a` sits much deeper.",
        },
      ],
      options: [
        { id: "a", label: "d gets a short code, fewer bits, and a gets a long code, more bits, since code length equals depth" },
        { id: "b", label: "Both get the same code length, since Huffman codes are always a fixed number of bits" },
        { id: "c", label: "a gets the shorter code, since it was merged first" },
        { id: "d", label: "Depth in the tree has nothing to do with code length" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Huffman codes are variable-length by design, that's the whole point: frequent symbols get short codes and rare symbols get long ones, unlike fixed-width encodings.",
        c: "Being merged first actually pushes a node deeper into the tree, not shallower, since every later merge stacks another edge above it; that's why a, merged first, ends up with the longest code.",
        d: "A node's Huffman code is read directly off the path of edge labels from the root to that node, so its length is exactly the node's depth in the tree.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "root", label: "root:29", x: 4, y: 1, shape: "circle", emphasis: "active" },
            { id: "abc", label: "abc:9", x: 2, y: 2, shape: "circle", emphasis: "active" },
            { id: "ab", label: "ab:5", x: 1, y: 3, shape: "circle", emphasis: "active" },
            { id: "a", label: "a:2", x: 0, y: 4, shape: "circle", emphasis: "active" },
          ],
          arrows: [
            { from: "root", to: "abc", label: "0", emphasis: "active" },
            { from: "abc", to: "ab", label: "1", emphasis: "active" },
            { from: "ab", to: "a", label: "0", emphasis: "active" },
          ],
        },
        caption: '`a`\'s code, `"010"`, is three bits long because `a` sits three edges below the root.',
      },
      reviewStep: 8,
    },
    {
      kind: "fillin",
      prompt: "Fill in the key so the SECOND-smallest frequency is found among what's left, not the original dictionary.",
      code:
        'freqs = {"a": 2, "b": 3, "c": 4, "d": 20}\nfirst = min(freqs, key=freqs.get)\nrest = {k: v for k, v in freqs.items() if k != first}\nsecond = min(rest, key={{key}})',
      blanks: [
        {
          id: "key",
          placeholder: "___",
          answer: "rest.get",
          explainWrong:
            "The second-smallest node has to be found among what's left AFTER removing the first pick, rest, not from the original freqs dict; using freqs.get again would just pick 'a' a second time instead of the true next-smallest, 'b'.",
        },
      ],
      tests: [
        { name: "first is 'a'", code: "assert first == 'a', \"first should be 'a': it has the smallest frequency, 2\"" },
        { name: "second is 'b'", code: "assert second == 'b', \"second should be 'b': after removing 'a', 'b' at frequency 3 is the smallest remaining\"" },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-intro.huffman.1",
      prompt: "Why does Huffman coding always merge the two lowest-frequency nodes first, instead of the two highest?",
      options: [
        "So the most frequent symbols stay closer to the root and end up with shorter codes",
        "Because merging small numbers is computationally easier",
        "The order doesn't actually matter for the final codes",
      ],
      correctIndex: 0,
      explainWrong:
        "The order matters entirely: merging the least-frequent nodes first means they get pushed deepest into the tree, while the most-frequent symbols stay shallow, near the root, and end up with the shortest codes.",
    },
    {
      id: "dsa-intro.huffman.2",
      prompt: "In the finished Huffman tree, how do you read off a character's code?",
      options: [
        "Follow the path of 0/1 edge labels from the root down to that character's leaf",
        "Count how many times the character appeared during merging",
        "Look at the character's original frequency number directly",
      ],
      correctIndex: 0,
      explainWrong:
        "A character's code isn't its frequency or a merge count; it's literally the sequence of 0/1 labels on the edges you cross walking from the root down to that character's leaf node.",
    },
    {
      id: "dsa-intro.huffman.3",
      prompt: "Why does the least frequent character in a Huffman tree end up with the longest code, while the most frequent gets the shortest?",
      options: [
        "Rare characters get merged first and sit deepest in the tree, while frequent ones get merged last and stay shallow",
        "Huffman assigns long codes to rare characters as an arbitrary rule",
        "It's the opposite: frequent characters get the longest codes",
      ],
      correctIndex: 0,
      explainWrong:
        "It follows directly from the merge order: a rare character is one of the first nodes merged, so every later merge stacks another edge above it, pushing it deep; a frequent character survives unmerged longer and ends up shallow.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: greedy-heuristics — grabbing the locally-best choice at each step
// works for some inputs, but can lock in a worse overall answer for others.
// ---------------------------------------------------------------------------

const greedyHeuristicsUnit: Unit = {
  id: "greedy-heuristics",
  title: "Greedy: Locally Best, Not Always Optimal",
  watch: [
    {
      state: {
        nodes: [{ id: "target", label: "target: 30", tag: "coins: 25, 10, 5, 1", x: 3, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "Starting with 30 cents to make, using coins worth 25, 10, 5, and 1.",
    },
    {
      state: {
        nodes: [
          { id: "pick25", label: "25", tag: "picked", x: 1, y: 3, shape: "circle", emphasis: "active" },
          { id: "remaining", label: "remaining: 5", tag: "", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "remaining", to: "pick25", emphasis: "active" }],
      },
      caption: "Greedy always grabs the largest coin that still fits: 25 cents, leaving 5 cents remaining.",
    },
    {
      state: {
        nodes: [
          { id: "pick25", label: "25", tag: "picked", x: 1, y: 3, shape: "circle", emphasis: "dim" },
          { id: "pick5", label: "5", tag: "picked", x: 3, y: 3, shape: "circle", emphasis: "active" },
          { id: "remaining", label: "remaining: 0", tag: "2 coins total", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Greedy grabs 5 next, hitting exactly 0 remaining: 2 coins total, which is in fact optimal here.",
    },
    {
      state: {
        nodes: [{ id: "target2", label: "target: 6", tag: "coins: 1, 3, 4", x: 3, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "Now try coins worth 1, 3, and 4 cents, aiming to make 6 cents.",
    },
    {
      state: {
        nodes: [
          { id: "pick4", label: "4", tag: "picked", x: 1, y: 3, shape: "circle", emphasis: "active" },
          { id: "remaining2", label: "remaining: 2", tag: "", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "remaining2", to: "pick4", emphasis: "active" }],
      },
      caption: "Greedy grabs the largest coin that fits, 4 cents, leaving 2 cents remaining.",
    },
    {
      state: {
        nodes: [
          { id: "pick4", label: "4", tag: "picked, but a mistake", x: 1, y: 3, shape: "circle", emphasis: "error" },
          { id: "pick1a", label: "1", tag: "picked", x: 3, y: 3, shape: "circle", emphasis: "active" },
          { id: "pick1b", label: "1", tag: "picked", x: 5, y: 3, shape: "circle", emphasis: "active" },
          { id: "remaining3", label: "remaining: 0", tag: "3 coins total", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Greedy finishes with two 1-cent coins, 3 coins total, but that first pick of 4 turns out to have been the wrong call.",
    },
    {
      state: {
        nodes: [
          { id: "pick4", label: "4", tag: "greedy's choice", x: 1, y: 3, shape: "circle", emphasis: "error" },
          { id: "opt3a", label: "3", tag: "optimal choice", x: 3, y: 3, shape: "circle", emphasis: "new" },
          { id: "opt3b", label: "3", tag: "optimal choice", x: 5, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "The optimal solution uses two 3-cent coins, just 2 coins total: greedy's early, locally-best pick of 4 boxed it into a worse overall answer.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "Coins worth 25, 10, 5, and 1 cent, making 41 cents. Greedy grabs the largest coin that fits each time. Does this greedy strategy give the fewest possible coins?",
      steps: [
        {
          state: { nodes: [{ id: "target", label: "target: 41", tag: "coins: 25, 10, 5, 1", x: 3, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
          caption: "41 cents, using the standard US coin denominations.",
        },
      ],
      options: [
        { id: "a", label: "Yes: 25 + 10 + 5 + 1 = 4 coins, and no combination does better" },
        { id: "b", label: "No, greedy wastes a coin somewhere" },
        { id: "c", label: "It depends on the order the coins are listed in" },
        { id: "d", label: "Greedy never works for coin change" },
      ],
      correctId: "a",
      explainWrong: {
        b: "For this particular coin system, 25, 10, 5, and 1, greedy happens to always produce the minimum number of coins; there's no better combination for 41 cents than 25 + 10 + 5 + 1.",
        c: "The order the coins are considered in doesn't change the outcome; greedy always looks at the largest available denomination first, regardless of list order.",
        d: "Greedy does work correctly for some coin systems, including the standard US denominations; it just isn't guaranteed to work for every possible set of coin values.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "pick25", label: "25", x: 0, y: 1, shape: "circle", emphasis: "active" },
            { id: "pick10", label: "10", x: 2, y: 1, shape: "circle", emphasis: "active" },
            { id: "pick5", label: "5", x: 4, y: 1, shape: "circle", emphasis: "active" },
            { id: "pick1", label: "1", x: 6, y: 1, shape: "circle", emphasis: "active" },
          ],
          arrows: [],
        },
        caption: "`25 + 10 + 5 + 1` uses 4 coins, and greedy finds it correctly.",
      },
      reviewStep: 2,
    },
    {
      kind: "predict",
      prompt:
        "Coins worth 1, 3, and 4 cents, making 6 cents. Greedy picks 4, then 1, then 1: 3 coins. Is 3 the fewest coins possible?",
      steps: [
        {
          state: { nodes: [{ id: "target2", label: "target: 6", tag: "coins: 1, 3, 4", x: 3, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
          caption: "6 cents, using coins worth 1, 3, and 4.",
        },
      ],
      options: [
        { id: "a", label: "No, 3 + 3 makes 6 using only 2 coins" },
        { id: "b", label: "Yes, 3 coins is the minimum possible" },
        { id: "c", label: "No, but there's no way to do better than 3 with only these coins" },
        { id: "d", label: "It's impossible to make 6 cents with these coins" },
      ],
      correctId: "a",
      explainWrong: {
        b: "There's a better combination available: two 3-cent coins add up to 6 using only 2 coins, one fewer than greedy's 3.",
        c: "Only the coins already available, 1, 3, and 4, are needed to find the better solution: 3 + 3 uses just these same denominations.",
        d: "6 cents is very much makeable with these coins; both greedy's 4 + 1 + 1 and the better 3 + 3 add up to 6.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "opt3a", label: "3", x: 2, y: 1, shape: "circle", emphasis: "new" },
            { id: "opt3b", label: "3", x: 4, y: 1, shape: "circle", emphasis: "new" },
          ],
          arrows: [],
        },
        caption: "`3 + 3 = 6` using only 2 coins, better than greedy's 3-coin answer.",
      },
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt:
        "Given a target `amount` and a list `coins` of coin denominations sorted largest to smallest (e.g. `[25, 10, 5, 1]`), return the number of coins the greedy strategy uses: repeatedly take the largest coin that still fits until `amount` reaches `0`.",
      difficulty: "Medium",
      examples: [
        { input: "amount = 30, coins = [25, 10, 5, 1]", output: "2", explanation: "`25 + 5`." },
        {
          input: "amount = 6, coins = [4, 3, 1]",
          output: "3",
          explanation: "Greedy takes `4`, then two `1`s, even though `3 + 3` would use fewer coins.",
        },
      ],
      constraints: ["`0 <= amount <= 10^4`", "`coins` is sorted largest to smallest and always includes `1`"],
      bigO: { answer: "O(n)", explain: "Repeatedly subtracts the largest fitting coin from `amount`, so the number of coin picks grows with `amount`." },
      starter:
        "def greedy_coin_count(amount, coins):\n    # repeatedly take the largest coin that still fits\n    # count how many coins get used in total\n    pass\n",
      solution:
        "def greedy_coin_count(amount, coins):\n    count = 0\n    for coin in coins:\n        while amount >= coin:\n            amount -= coin\n            count += 1\n    return count\n",
      tests: [
        { name: "greedy_coin_count(30, [25, 10, 5, 1]) is 2", code: "assert greedy_coin_count(30, [25, 10, 5, 1]) == 2, \"greedy_coin_count(30, [25, 10, 5, 1]) should be 2: 25 + 5\"" },
        {
          name: "greedy_coin_count(6, [4, 3, 1]) is 3",
          code:
            "assert greedy_coin_count(6, [4, 3, 1]) == 3, \"greedy_coin_count(6, [4, 3, 1]) should be 3: greedy grabs 4 first, the largest that fits, leaving 2, which takes two more 1-cent coins, even though 3 + 3 would only take 2 coins\"",
        },
        { name: "greedy_coin_count(0, [25, 10, 5, 1]) is 0 (edge case)", code: "assert greedy_coin_count(0, [25, 10, 5, 1]) == 0, \"greedy_coin_count(0, ...) should be 0: no coins are needed to make 0 cents\"" },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "dsa-intro.greedy-heuristics.1",
      prompt: "Why can a greedy algorithm fail to find the optimal, fewest-coin, answer for some coin systems?",
      options: [
        "Because it commits to the locally best choice at each step, with no way to reconsider once a later step reveals a better combination",
        "Because greedy algorithms always run out of time before finishing",
        "Because greedy algorithms only work on sorted lists",
      ],
      correctIndex: 0,
      explainWrong:
        "Greedy's failure mode isn't about speed or sorting; it's structural: once it locks in a choice like 'take the 4-cent coin', it never revisits that decision, even if a later step shows a smaller coin would have led to a better total.",
    },
    {
      id: "dsa-intro.greedy-heuristics.2",
      prompt: "For which of these coin systems does greedy correctly find the minimum number of coins: [25, 10, 5, 1] or [1, 3, 4]?",
      options: [
        "[25, 10, 5, 1] works correctly with greedy; [1, 3, 4] is a case where greedy can fail, for example making 6 cents",
        "Both coin systems always work correctly with greedy",
        "Neither coin system works correctly with greedy",
      ],
      correctIndex: 0,
      explainWrong:
        "Whether greedy works depends entirely on the specific coin system: the standard US denominations happen to make greedy optimal, while [1, 3, 4] contains a counterexample, making 6 cents, where greedy gives a worse answer than the optimal.",
    },
    {
      id: "dsa-intro.greedy-heuristics.3",
      prompt: "What's the fewest coins needed to make 6 cents from [1, 3, 4], and does greedy find it?",
      options: [
        "2 coins, 3 + 3; greedy does not find it, since it picks 4 first and ends up needing 3 coins total",
        "3 coins, 4 + 1 + 1, and greedy finds it correctly",
        "1 coin; some single coin in [1, 3, 4] must equal 6",
      ],
      correctIndex: 0,
      explainWrong:
        "No single coin in [1, 3, 4] equals 6, and greedy's own answer, 4 + 1 + 1, uses 3 coins, one more than the true optimal of 3 + 3, which greedy never considers because it already committed to the 4 first.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: dynamic-programming — naive recursive fib redoes identical
// subproblems over and over; a memo table solves each one exactly once.
// ---------------------------------------------------------------------------

const dynamicProgrammingUnit: Unit = {
  id: "dynamic-programming",
  title: "Memoization: Solve It Once",
  watch: [
    {
      state: {
        nodes: [
          { id: "f4", label: "fib(4)", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "f3", label: "fib(3)", x: 1, y: 1, shape: "circle", emphasis: "new" },
          { id: "f2", label: "fib(2)", tag: "direct child of fib(4)", x: 5, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "f4", to: "f3", emphasis: "active" },
          { from: "f4", to: "f2", emphasis: "active" },
        ],
      },
      caption: "fib(4) = fib(3) + fib(2): computing fib(4) requires both smaller results, so both calls are made.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "fib(4)", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "f3", label: "fib(3)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "f2", label: "fib(2)", tag: "will redo this same work again below", x: 5, y: 1, shape: "circle", emphasis: "dim" },
          { id: "f2dup", label: "fib(2)", tag: "fib(3)'s own copy", x: 0, y: 2, shape: "circle", emphasis: "new" },
          { id: "f1a", label: "fib(1)", x: 2, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "f3", to: "f2dup", emphasis: "active" },
          { from: "f3", to: "f1a", emphasis: "active" },
        ],
      },
      caption: "fib(3) branches into its own fib(2) and fib(1). This fib(2) is a brand-new computation, entirely separate from the fib(2) fib(4) already called.",
    },
    {
      state: {
        nodes: [
          { id: "f4", label: "fib(4)", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "f3", label: "fib(3)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "f2", label: "fib(2)", x: 5, y: 1, shape: "circle", emphasis: "dim" },
          { id: "f2dup", label: "fib(2)", tag: "about to expand again, same as the other one", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "f1a", label: "fib(1)", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "tally", label: "fib(2) so far: computed 2 times", x: 3, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Both fib(2) calls will fully re-expand into fib(1) and fib(0) on their own, each redoing identical work.",
    },
    {
      state: {
        nodes: [
          { id: "tally2", label: "fib(1): 3 calls, fib(0): 2 calls, fib(2): 2 calls", x: 3, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Without memoization, fib(4) recomputes fib(2) twice, fib(1) three times, and fib(0) twice: identical subproblems solved over and over.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "fib(0) = 0", x: 0, y: 2, shape: "box", emphasis: "new" },
          { id: "m1", label: "fib(1) = 1", x: 1, y: 2, shape: "box", emphasis: "new" },
          { id: "m2", label: "fib(2) = ?", x: 2, y: 2, shape: "box", emphasis: "new" },
          { id: "m3", label: "fib(3) = ?", x: 3, y: 2, shape: "box", emphasis: "new" },
          { id: "m4", label: "fib(4) = ?", x: 4, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "A memo table starts with the two base cases already known, fib(0) and fib(1), and empty slots waiting to be filled.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "fib(0) = 0", x: 0, y: 2, shape: "box", emphasis: "dim" },
          { id: "m1", label: "fib(1) = 1", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "m2", label: "fib(2) = 1", x: 2, y: 2, shape: "box", emphasis: "active" },
          { id: "m3", label: "fib(3) = ?", x: 3, y: 2, shape: "box", emphasis: "new" },
          { id: "m4", label: "fib(4) = ?", x: 4, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "m1", to: "m2", emphasis: "active" },
          { from: "m0", to: "m2", emphasis: "active" },
        ],
      },
      caption: "fib(2) is computed once, using memo(1) and memo(0) directly, then stored so it's never computed again.",
    },
    {
      state: {
        nodes: [
          { id: "m1", label: "fib(1) = 1", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "m2", label: "fib(2) = 1", x: 2, y: 2, shape: "box", emphasis: "dim" },
          { id: "m3", label: "fib(3) = 2", x: 3, y: 2, shape: "box", emphasis: "active" },
          { id: "m4", label: "fib(4) = ?", x: 4, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "m2", to: "m3", emphasis: "active" },
          { from: "m1", to: "m3", emphasis: "active" },
        ],
      },
      caption: "fib(3) reuses the already-stored fib(2) and fib(1) instead of re-deriving them, computing its own answer just once.",
    },
    {
      state: {
        nodes: [
          { id: "m2", label: "fib(2) = 1", x: 2, y: 2, shape: "box", emphasis: "dim" },
          { id: "m3", label: "fib(3) = 2", x: 3, y: 2, shape: "box", emphasis: "dim" },
          { id: "m4", label: "fib(4) = 3", x: 4, y: 2, shape: "box", emphasis: "active" },
        ],
        arrows: [
          { from: "m3", to: "m4", emphasis: "active" },
          { from: "m2", to: "m4", emphasis: "active" },
        ],
      },
      caption: "fib(4) reuses fib(3) and fib(2) the same way: every subproblem in this table was solved exactly once, unlike the naive version's repeats.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "Without memoization, computing fib(4) calls fib(2) more than once. How many separate times does the naive recursive fib(4) end up computing fib(2)?",
      steps: [
        {
          state: {
            nodes: [
              { id: "f4", label: "fib(4)", x: 3, y: 0, shape: "circle", emphasis: "new" },
              { id: "f3", label: "fib(3)", x: 1, y: 1, shape: "circle", emphasis: "new" },
              { id: "f2", label: "fib(2)", x: 5, y: 1, shape: "circle", emphasis: "new" },
            ],
            arrows: [
              { from: "f4", to: "f3" },
              { from: "f4", to: "f2" },
            ],
          },
          caption: "`fib(4)` branches directly into `fib(3)` and `fib(2)`.",
        },
      ],
      options: [
        { id: "a", label: "2 times: once as fib(4)'s direct child, once inside fib(3)'s branch" },
        { id: "b", label: "Once, since fib(2) only appears in one place in the call tree" },
        { id: "c", label: "4 times, once for every node in the tree" },
        { id: "d", label: "It depends on the value of n" },
      ],
      correctId: "a",
      explainWrong: {
        b: "fib(2) actually appears in two different branches of the call tree: directly under fib(4), and again under fib(3), since fib(3) also needs its own fib(2) to compute its answer.",
        c: "fib(2) specifically appears twice for fib(4), not once for every node; fib(1) and fib(0) get recomputed even more often, but fib(2) itself is exactly 2.",
        d: "For fib(4) specifically the count is fixed at 2; it's true that the number of repeats grows as n grows, but the question is about fib(4) itself.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "f2", label: "fib(2)", tag: "1st computation", x: 5, y: 1, shape: "circle", emphasis: "active" },
            { id: "f2dup", label: "fib(2)", tag: "2nd computation", x: 0, y: 2, shape: "circle", emphasis: "active" },
          ],
          arrows: [],
        },
        caption: "`fib(2)` gets computed twice, once as `fib(4)`'s direct child, once inside `fib(3)`'s branch.",
      },
      reviewStep: 1,
    },
    {
      kind: "predict",
      prompt: "With a memo table, how many times is fib(2) actually computed while working out fib(4)?",
      steps: [
        {
          state: { nodes: [{ id: "m2", label: "fib(2) = ?", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
          caption: "`fib(2)`'s slot in the memo table starts empty.",
        },
      ],
      options: [
        { id: "a", label: "Once: the first time it's needed, then every later request just reads the stored value" },
        { id: "b", label: "Twice, same as without memoization" },
        { id: "c", label: "Zero times, memoization skips computing it entirely" },
        { id: "d", label: "Once for each place fib(2) appears in the call tree" },
      ],
      correctId: "a",
      explainWrong: {
        b: "The entire point of the memo table is to avoid recomputation: once fib(2) is stored, any later call that needs it just reads memo[2] instead of recursing again.",
        c: "fib(2) does still get computed, just once, the very first time it's needed; after that its answer is simply looked up rather than skipped.",
        d: "That's the naive behavior, recomputing once per occurrence; memoization collapses all those occurrences down to a single computation, however many places would have asked for it.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "m1", label: "fib(1) = 1", x: 1, y: 1, shape: "box", emphasis: "dim" },
            { id: "m0", label: "fib(0) = 0", x: 0, y: 1, shape: "box", emphasis: "dim" },
            { id: "m2", label: "fib(2) = 1", x: 2, y: 1, shape: "box", emphasis: "active" },
          ],
          arrows: [
            { from: "m1", to: "m2", emphasis: "active" },
            { from: "m0", to: "m2", emphasis: "active" },
          ],
        },
        caption: "`fib(2)` is computed once here and stored; nothing later recomputes it.",
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "Fill in the memo dict check so fib_memo looks up the CURRENT call's input before recomputing it.",
      code:
        "def fib_memo(n, memo={}):\n    if {{key}} in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    result = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    memo[n] = result\n    return result",
      blanks: [
        {
          id: "key",
          placeholder: "___",
          answer: "n",
          explainWrong:
            "The memo check needs to look up the CURRENT call's input, n, to see whether it's already been solved; checking anything else would never match what's actually stored in the table under each n.",
        },
      ],
      tests: [
        { name: "fib_memo(0) is 0 (base case)", code: "assert fib_memo(0) == 0, \"fib_memo(0) should be 0: base case\"" },
        { name: "fib_memo(1) is 1 (base case)", code: "assert fib_memo(1) == 1, \"fib_memo(1) should be 1: base case\"" },
        { name: "fib_memo(5) is 5", code: "assert fib_memo(5) == 5, \"fib_memo(5) should be 5: 0, 1, 1, 2, 3, 5\"" },
        { name: "fib_memo(10) is 55", code: "assert fib_memo(10) == 55, \"fib_memo(10) should be 55: the 10th fibonacci number\"" },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-intro.dynamic-programming.1",
      prompt: "Why does naive recursive fib(n) get so slow for larger n?",
      options: [
        "It recomputes the same smaller fib values over and over, with the number of repeats growing exponentially as n grows",
        "Python's function calls themselves get slower as n increases",
        "It's actually just as fast as the memoized version",
      ],
      correctIndex: 0,
      explainWrong:
        "Function calls themselves don't slow down with n; the real cost is that the same subproblems, like fib(2), get computed again and again from scratch, and the number of these repeats grows exponentially as n grows.",
    },
    {
      id: "dsa-intro.dynamic-programming.2",
      prompt: "What does a memo table actually store?",
      options: [
        "The result of each subproblem, keyed by its input, the first time it's computed, so later requests can just look it up",
        "A count of how many times each function has been called",
        "A copy of the entire call stack",
      ],
      correctIndex: 0,
      explainWrong:
        "A memo table isn't a call counter or a stack snapshot; it's a cache mapping each subproblem's input to its already-computed answer, so a repeated request can be answered with a lookup instead of a recomputation.",
    },
    {
      id: "dsa-intro.dynamic-programming.3",
      prompt: "What's the main tradeoff memoization makes to speed up recursive fib?",
      options: [
        "It spends extra memory, the memo table, in exchange for never redoing the same computation twice",
        "It gives up correctness in exchange for speed",
        "There's no tradeoff; memoization is strictly free",
      ],
      correctIndex: 0,
      explainWrong:
        "Memoization doesn't sacrifice correctness, and it isn't free either: it uses additional memory to store every subproblem's answer, trading that memory cost for avoiding redundant recomputation.",
    },
  ],
};

export const chDsaIntro: Chapter = {
  id: "dsa-intro",
  phase: 2,
  title: "Data Structures, ADTs, and Algorithm Strategies",
  units: [dsAndAdtsUnit, huffmanUnit, greedyHeuristicsUnit, dynamicProgrammingUnit],
};
