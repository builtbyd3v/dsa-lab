import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: nodes-and-links — a node is a box holding a value plus an arrow to
// the next node; traversal walks those arrows one at a time until None.
// ---------------------------------------------------------------------------

const nodesAndLinksUnit: Unit = {
  id: "nodes-and-links",
  title: "Nodes and Links",
  watch: [
    {
      state: {
        nodes: [{ id: "head", label: "None", tag: "head", x: 0, y: 1, shape: "box" }],
        arrows: [],
      },
      caption: "An empty linked list is just a head pointer set to None: no nodes exist yet.",
    },
    {
      state: {
        nodes: [
          { id: "head", label: "head", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 1.5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "head", to: "n0", emphasis: "active" }],
      },
      caption: "Node(10) creates a box holding 10, and head's arrow now points at it instead of None.",
    },
    {
      state: {
        nodes: [
          { id: "head", label: "head", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 1.5, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "head", to: "n0" },
          { from: "n0", to: "n1", emphasis: "active" },
        ],
      },
      caption: "n0.next = n1 draws a new arrow from the first node to the second; that is what linking means.",
    },
    {
      state: {
        nodes: [
          { id: "head", label: "head", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 1.5, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4.5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "head", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2", emphasis: "active" },
        ],
      },
      caption: "n1.next = n2 extends the chain again: three nodes now connected by two arrows.",
    },
    {
      state: {
        nodes: [
          { id: "head", label: "head", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 1.5, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4.5, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "head", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none", emphasis: "active" },
        ],
      },
      caption: "The last node's next arrow points at None, marking where the list ends.",
    },
    {
      state: {
        nodes: [
          { id: "head", label: "head", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", tag: "cur", x: 1.5, y: 1, shape: "box", emphasis: "active" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4.5, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "head", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "Traversal starts by pointing a separate variable cur at head, the very first node.",
    },
    {
      state: {
        nodes: [
          { id: "head", label: "head", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 1.5, y: 1, shape: "box" },
          { id: "n1", label: "20", tag: "cur", x: 3, y: 1, shape: "box", emphasis: "active" },
          { id: "n2", label: "30", x: 4.5, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "head", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "cur = cur.next follows the arrow forward, moving the pointer from n0 to n1.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "head points to a node holding 5, whose next points to a node holding 8, whose next is None. What is head.next.value?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "5", tag: "head", x: 1, y: 1, shape: "box" },
              { id: "b", label: "8", x: 3, y: 1, shape: "box" },
              { id: "c", label: "None", x: 5, y: 1, shape: "box", emphasis: "dim" },
            ],
            arrows: [
              { from: "a", to: "b" },
              { from: "b", to: "c" },
            ],
          },
          caption: "head names the first node; next follows one arrow at a time.",
        },
      ],
      options: [
        { id: "a", label: "5" },
        { id: "b", label: "8" },
        { id: "c", label: "None" },
      ],
      correctId: "b",
      explainWrong: {
        a: "head.value would be 5, but head.next.value follows one more arrow to the second node, 8.",
        c: "head.next reaches the second node, not the end of the list; only the second node's next is None.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "5", tag: "head", x: 1, y: 1, shape: "box" },
            { id: "b", label: "8", x: 3, y: 1, shape: "box", emphasis: "active" },
            { id: "c", label: "None", x: 5, y: 1, shape: "box", emphasis: "dim" },
          ],
          arrows: [
            { from: "a", to: "b", emphasis: "active" },
            { from: "b", to: "c" },
          ],
        },
        caption: "head.next follows one arrow to reach the second node, whose value is 8.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blanks to count the nodes in a linked list starting at head.",
      code: [
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "head = Node(1, Node(2, Node(3, None)))",
        "",
        "count = 0",
        "cur = {{start}}",
        "while cur is not None:",
        "    count += 1",
        "    cur = cur.{{advance}}",
      ].join("\n"),
      blanks: [
        {
          id: "start",
          placeholder: "___",
          answer: "head",
          explainWrong: "Traversal must begin at head, the first node, not at None or at count.",
        },
        {
          id: "advance",
          placeholder: "___",
          answer: "next",
          explainWrong: "Moving to the following node means following the next arrow, not reading value.",
        },
      ],
      tests: [
        {
          name: "count is 3",
          code: "assert count == 3, \"count should be 3: the loop must keep following next until cur becomes None\"",
        },
      ],
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt:
        "Write a function list_length(head) that returns the number of nodes in a singly linked list, starting from head, by walking next until you reach None.",
      starter: [
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "def list_length(head):",
        "    # return the number of nodes from head to the end",
        "    pass",
      ].join("\n"),
      tests: [
        {
          name: "empty list has length 0",
          code: "assert list_length(None) == 0, \"list_length(None) should be 0: an empty list has no nodes to count\"",
        },
        {
          name: "three node list has length 3",
          code:
            "n = Node(1, Node(2, Node(3, None)))\nassert list_length(n) == 3, \"list_length should be 3: traverse until cur becomes None, counting each node once\"",
        },
      ],
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "dsa-lists.nodes-and-links.1",
      prompt: "In a linked list, what does a node's next pointer being None mean?",
      options: [
        "The node is the head",
        "The node is the last node in the list",
        "The node holds no value",
      ],
      correctIndex: 1,
      explainWrong: "None as next has nothing to do with being the head or with holding no value; it marks the end of the chain, since there is no node after it.",
    },
    {
      id: "dsa-lists.nodes-and-links.2",
      prompt: "What is stored inside a node in a singly linked list?",
      options: [
        "Just the value",
        "The value and a pointer to the next node",
        "The value and pointers to both the next and previous nodes",
      ],
      correctIndex: 1,
      explainWrong: "A plain value alone can't form a chain, and previous pointers belong to doubly linked lists. A singly linked node holds its value plus one pointer forward, to next.",
    },
    {
      id: "dsa-lists.nodes-and-links.3",
      prompt: "To visit every node in a list, what must you do?",
      options: [
        "Access head.value directly for all data",
        "Start a pointer at head and follow next arrows until reaching None",
        "Sort the nodes by value first",
      ],
      correctIndex: 1,
      explainWrong: "head.value only ever gives the first node's value, and sorting isn't required to visit nodes. Traversal means walking a pointer forward one next arrow at a time until it hits None.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: sll-insert — the pointer-order rule: wire the new node's next
// before touching the previous node's next, or the rest of the list is lost.
// ---------------------------------------------------------------------------

const sllInsertUnit: Unit = {
  id: "sll-insert",
  title: "Inserting Into a Singly Linked List",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 2, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "Start with a three-node list: 10, 20, 30, ending at None.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 2, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
          { id: "newHead", label: "5", x: 0, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "To insert 5 at the head, first create the new node off to the side, unconnected.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 2, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
          { id: "newHead", label: "5", x: 0, y: 3, shape: "box" },
        ],
        arrows: [
          { from: "newHead", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "newHead.next = n0 must happen first: point the new node at the old head before anything else changes.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 3, shape: "box", emphasis: "dim" },
          { id: "newHead", label: "5", tag: "head", x: 0, y: 1, shape: "box", emphasis: "active" },
        ],
        arrows: [
          { from: "newHead", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "Only now does head move to point at the new node; the insert is complete and nothing was lost.",
    },
    {
      state: {
        nodes: [
          { id: "newHead", label: "5", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
          { id: "mid", label: "15", x: 1, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "newHead", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "To insert 15 between the first and second nodes, again create it unconnected first.",
    },
    {
      state: {
        nodes: [
          { id: "newHead", label: "5", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box", emphasis: "dim" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box", emphasis: "dim" },
          { id: "mid", label: "15", x: 1, y: 3, shape: "box", emphasis: "error" },
        ],
        arrows: [
          { from: "newHead", to: "n0" },
          { from: "n0", to: "mid", emphasis: "error" },
        ],
      },
      caption: "Wrong order: setting n0.next = mid first overwrites the only arrow to n1, losing the rest of the list.",
    },
    {
      state: {
        nodes: [
          { id: "newHead", label: "5", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
          { id: "mid", label: "15", x: 1, y: 3, shape: "box", emphasis: "active" },
        ],
        arrows: [
          { from: "newHead", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "mid", to: "n1", emphasis: "active" },
        ],
      },
      caption: "Correct order: mid.next = n1 is set first, while n0 still safely points at n1 too.",
    },
    {
      state: {
        nodes: [
          { id: "newHead", label: "5", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "mid", label: "15", x: 3, y: 3, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "newHead", to: "n0" },
          { from: "n0", to: "mid", emphasis: "active" },
          { from: "mid", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "Now n0.next = mid finishes the swap: the list reads 5, 10, 15, 20, 30, with nothing lost.",
    },
    {
      state: {
        nodes: [
          { id: "newHead", label: "5", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "mid", label: "15", x: 3, y: 3, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
          { id: "newTail", label: "40", x: 6, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "newHead", to: "n0" },
          { from: "n0", to: "mid" },
          { from: "mid", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "To insert 40 at the tail, create the new node, then find the current last node before None.",
    },
    {
      state: {
        nodes: [
          { id: "newHead", label: "5", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "mid", label: "15", x: 3, y: 3, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
          { id: "newTail", label: "40", x: 6, y: 3, shape: "box" },
        ],
        arrows: [
          { from: "newHead", to: "n0" },
          { from: "n0", to: "mid" },
          { from: "mid", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "newTail", emphasis: "active" },
        ],
      },
      caption: "n2.next = newTail extends the chain; the list now ends 5, 10, 15, 20, 30, 40, then None.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "You want to insert new_node between prev and prev.next. Which order is correct?",
      steps: [
        {
          state: {
            nodes: [
              { id: "prev", label: "prev", x: 0, y: 1, shape: "box" },
              { id: "new", label: "new_node", x: 3, y: 3, shape: "box", emphasis: "new" },
              { id: "nxt", label: "prev.next", x: 6, y: 1, shape: "box" },
            ],
            arrows: [{ from: "prev", to: "nxt" }],
          },
          caption: "new_node is created off to the side, not yet wired into the chain.",
        },
      ],
      options: [
        { id: "a", label: "prev.next = new_node, then new_node.next = prev.next" },
        { id: "b", label: "new_node.next = prev.next, then prev.next = new_node" },
        { id: "c", label: "Order does not matter, both assignments are equivalent" },
      ],
      correctId: "b",
      explainWrong: {
        a: "Setting prev.next first overwrites the only pointer to the rest of the list before the new node grabs it, permanently losing every node after prev.",
        c: "Order matters: if prev.next is overwritten first, the reference to the rest of the list is gone before new_node.next can capture it.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "prev", label: "prev", x: 0, y: 1, shape: "box" },
            { id: "new", label: "new_node", x: 3, y: 3, shape: "box", emphasis: "active" },
            { id: "nxt", label: "prev.next", x: 6, y: 1, shape: "box" },
          ],
          arrows: [
            { from: "new", to: "nxt", emphasis: "active" },
            { from: "prev", to: "new", emphasis: "active" },
          ],
        },
        caption: "new_node.next is set first, grabbing the rest of the list, then prev.next moves to point at new_node.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blanks to insert new_node at the head of the list, getting the pointer order right.",
      code: [
        "def _viz(head):",
        "    nodes = []",
        "    arrows = []",
        "    cur = head",
        "    i = 0",
        "    while cur is not None:",
        "        node = {\"id\": f\"n{i}\", \"label\": repr(cur.value), \"x\": i * 2, \"y\": 1, \"shape\": \"box\"}",
        "        if i == 0:",
        "            node[\"tag\"] = \"head\"",
        "        nodes.append(node)",
        "        if i > 0:",
        "            arrows.append({\"from\": f\"n{i-1}\", \"to\": f\"n{i}\"})",
        "        cur = cur.next",
        "        i += 1",
        "    return {\"nodes\": nodes, \"arrows\": arrows}",
        "",
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "head = Node(20, Node(30, None))",
        "new_node = Node(10)",
        "",
        "new_node.{{first}} = head",
        "head = {{second}}",
      ].join("\n"),
      blanks: [
        {
          id: "first",
          placeholder: "___",
          answer: "next",
          explainWrong: "The new node needs its own next arrow pointed at the old head before head moves; writing anything else here breaks that link.",
        },
        {
          id: "second",
          placeholder: "___",
          answer: "new_node",
          explainWrong: "head must move to point at new_node last, after new_node.next is already wired to the old head.",
        },
      ],
      tests: [
        {
          name: "head now points at new_node",
          code: "assert head.value == 10, \"head.value should be 10: head must move to the newly inserted node\"",
        },
        {
          name: "old head preserved",
          code: "assert head.next.value == 20, \"head.next.value should be 20: the old head must still follow the new node\"",
        },
      ],
      vizExpr: "_viz(head)",
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Write insert_after(prev, new_node) that inserts new_node right after prev in a singly linked list, being careful about pointer order so no nodes are lost.",
      starter: [
        "def _viz(head):",
        "    nodes = []",
        "    arrows = []",
        "    cur = head",
        "    i = 0",
        "    while cur is not None:",
        "        node = {\"id\": f\"n{i}\", \"label\": repr(cur.value), \"x\": i * 2, \"y\": 1, \"shape\": \"box\"}",
        "        if i == 0:",
        "            node[\"tag\"] = \"head\"",
        "        nodes.append(node)",
        "        if i > 0:",
        "            arrows.append({\"from\": f\"n{i-1}\", \"to\": f\"n{i}\"})",
        "        cur = cur.next",
        "        i += 1",
        "    return {\"nodes\": nodes, \"arrows\": arrows}",
        "",
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "def insert_after(prev, new_node):",
        "    # wire new_node into the list right after prev",
        "    # careful: set new_node.next before touching prev.next",
        "    pass",
      ].join("\n"),
      tests: [
        {
          name: "new node lands between prev and the following node",
          code:
            "n1 = Node(1)\nn1.next = Node(3)\nnew = Node(2)\ninsert_after(n1, new)\nassert n1.next.value == 2, \"n1.next.value should be 2: the new node must sit right after n1\"\nassert n1.next.next.value == 3, \"n1.next.next.value should be 3: the node that used to follow n1 must still be reachable\"",
        },
        {
          name: "no nodes are lost when inserting at the tail",
          code:
            "n = Node(1)\ninsert_after(n, Node(2))\nassert n.next.value == 2, \"n.next.value should be 2: inserting after the last node just extends the chain\"\nassert n.next.next is None, \"n.next.next should be None: the new node is now the last one\"",
        },
      ],
      vizExpr: "_viz((lambda h: (insert_after(h, Node(2)), h)[1])(Node(1, Node(3, None))))",
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "dsa-lists.sll-insert.1",
      prompt: "When inserting a new node between prev and prev.next, why must new_node.next be set before prev.next changes?",
      options: [
        "It doesn't matter, Python evaluates both at once",
        "prev.next is the only reference to the rest of the list, so it must be copied into new_node.next before it's overwritten",
        "Setting new_node.next first makes the code run faster",
      ],
      correctIndex: 1,
      explainWrong: "Python does not evaluate the two assignments simultaneously, and speed isn't the reason for the order. prev.next holds the only pointer to everything after it, so new_node must capture that pointer before prev.next is reassigned.",
    },
    {
      id: "dsa-lists.sll-insert.2",
      prompt: "What happens if you set prev.next = new_node before new_node.next is set?",
      options: [
        "Nothing breaks, new_node.next can still be set afterward",
        "Every node that used to follow prev becomes unreachable, since nothing points at them anymore",
        "The list becomes circular",
      ],
      correctIndex: 1,
      explainWrong: "Setting new_node.next afterward is too late: the only arrow to the rest of the list was already overwritten. That leftover chain becomes unreachable garbage, and no circularity is introduced.",
    },
    {
      id: "dsa-lists.sll-insert.3",
      prompt: "Inserting at the head of a list requires which two steps, in order?",
      options: [
        "Move head to the new node, then set the new node's next to the old head",
        "Set the new node's next to the old head, then move head to the new node",
        "Delete the old head, then create the new node",
      ],
      correctIndex: 1,
      explainWrong: "Moving head first loses the only pointer to the rest of the list before the new node can grab it, and deleting the old head is never part of an insert. The new node must first point at the old head, and only then does head move.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: sll-remove — bypassing rewires one arrow around the removed node;
// removing the head is a special case that only moves the head pointer.
// ---------------------------------------------------------------------------

const sllRemoveUnit: Unit = {
  id: "sll-remove",
  title: "Removing From a Singly Linked List",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 2, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "Start with list 10, 20, 30, ending at None.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box", emphasis: "active" },
          { id: "n1", label: "20", x: 2, y: 1, shape: "box", emphasis: "active" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "To remove the middle node (20), first identify prev (10) and the target node (20).",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 2, y: 3, shape: "box", emphasis: "dim" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n0", to: "n2", emphasis: "active" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "prev.next = target.next bypasses the removed node: n0 now points straight to n2.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 2, y: 3, shape: "box", emphasis: "dim" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n0", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "With no arrow pointing at it anymore, node 20 is unreachable garbage; the list is now 10, 30.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box", emphasis: "new" },
          { id: "n1", label: "20", x: 2, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "Now consider removing the head itself: start again with 10, 20, 30.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", x: 0, y: 3, shape: "box", emphasis: "dim" },
          { id: "n1", label: "20", tag: "head", x: 2, y: 1, shape: "box", emphasis: "active" },
          { id: "n2", label: "30", x: 4, y: 1, shape: "box" },
          { id: "none", label: "None", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "head = head.next moves the head pointer forward one node; node 10 is left with nothing pointing at it.",
    },
    {
      state: {
        nodes: [
          { id: "n1", label: "20", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 2, y: 1, shape: "box" },
          { id: "none", label: "None", x: 4, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "n1", to: "n2" },
          { from: "n2", to: "none" },
        ],
      },
      caption: "The list is now just 20, 30: removing the head only ever requires moving the head pointer, no bypass arrow needed.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "To remove the node right after prev in a singly linked list, what should you write?",
      steps: [
        {
          state: {
            nodes: [
              { id: "prev", label: "prev", x: 0, y: 1, shape: "box" },
              { id: "target", label: "target", x: 2, y: 1, shape: "box", emphasis: "active" },
              { id: "after", label: "target.next", x: 4, y: 1, shape: "box" },
            ],
            arrows: [
              { from: "prev", to: "target" },
              { from: "target", to: "after" },
            ],
          },
          caption: "target is the node right after prev, the one being removed.",
        },
      ],
      options: [
        { id: "a", label: "prev = prev.next" },
        { id: "b", label: "prev.next = prev.next.next" },
        { id: "c", label: "prev.next.next = prev" },
      ],
      correctId: "b",
      explainWrong: {
        a: "That moves prev forward instead of removing anything; the target node stays fully linked into the list.",
        c: "That points the node after the target back at prev, creating a broken loop instead of bypassing the target.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "prev", label: "prev", x: 0, y: 1, shape: "box" },
            { id: "target", label: "target", x: 2, y: 3, shape: "box", emphasis: "dim" },
            { id: "after", label: "target.next", x: 4, y: 1, shape: "box" },
          ],
          arrows: [{ from: "prev", to: "after", emphasis: "active" }],
        },
        caption: "prev.next = prev.next.next bypasses target: prev now points straight at what used to follow it.",
      },
      reviewStep: 2,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blank to remove the head node of a linked list.",
      code: [
        "def _viz(head):",
        "    nodes = []",
        "    arrows = []",
        "    cur = head",
        "    i = 0",
        "    while cur is not None:",
        "        node = {\"id\": f\"n{i}\", \"label\": repr(cur.value), \"x\": i * 2, \"y\": 1, \"shape\": \"box\"}",
        "        if i == 0:",
        "            node[\"tag\"] = \"head\"",
        "        nodes.append(node)",
        "        if i > 0:",
        "            arrows.append({\"from\": f\"n{i-1}\", \"to\": f\"n{i}\"})",
        "        cur = cur.next",
        "        i += 1",
        "    return {\"nodes\": nodes, \"arrows\": arrows}",
        "",
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "head = Node(10, Node(20, Node(30, None)))",
        "head = head.{{advance}}",
      ].join("\n"),
      blanks: [
        {
          id: "advance",
          placeholder: "___",
          answer: "next",
          explainWrong: "Removing the head means moving head to whatever it currently points at next, not re-reading its own value.",
        },
      ],
      tests: [
        {
          name: "head now holds 20",
          code: "assert head.value == 20, \"head.value should be 20: removing the old head moves head to the node it used to point at\"",
        },
      ],
      vizExpr: "_viz(head)",
      reviewStep: 5,
    },
    {
      kind: "write",
      prompt:
        "Write remove_after(prev) that removes the node right after prev in a singly linked list. Assume prev always has a next node.",
      starter: [
        "def _viz(head):",
        "    nodes = []",
        "    arrows = []",
        "    cur = head",
        "    i = 0",
        "    while cur is not None:",
        "        node = {\"id\": f\"n{i}\", \"label\": repr(cur.value), \"x\": i * 2, \"y\": 1, \"shape\": \"box\"}",
        "        if i == 0:",
        "            node[\"tag\"] = \"head\"",
        "        nodes.append(node)",
        "        if i > 0:",
        "            arrows.append({\"from\": f\"n{i-1}\", \"to\": f\"n{i}\"})",
        "        cur = cur.next",
        "        i += 1",
        "    return {\"nodes\": nodes, \"arrows\": arrows}",
        "",
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "def remove_after(prev):",
        "    # bypass the node right after prev",
        "    pass",
      ].join("\n"),
      tests: [
        {
          name: "middle node removed",
          code:
            "a = Node(1)\na.next = Node(2)\na.next.next = Node(3)\nremove_after(a)\nassert a.next.value == 3, \"a.next.value should be 3: the removed node (2) must be bypassed\"",
        },
        {
          name: "removing the last remaining next node leaves None",
          code:
            "b = Node(1, Node(2))\nremove_after(b)\nassert b.next is None, \"b.next should be None: removing the only following node leaves nothing after b\"",
        },
      ],
      vizExpr: "_viz((lambda h: (remove_after(h), h)[1])(Node(1, Node(2, Node(3, None)))))",
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-lists.sll-remove.1",
      prompt: "To remove the node right after prev, which single line rewires the list?",
      options: [
        "prev.next = prev.next.next",
        "prev = prev.next",
        "prev.next.next = None",
      ],
      correctIndex: 0,
      explainWrong: "prev = prev.next just moves prev without changing the list, and setting prev.next.next = None would sever the tail instead of removing the target. Bypassing means prev.next must skip over the target directly to what came after it.",
    },
    {
      id: "dsa-lists.sll-remove.2",
      prompt: "Why is removing the head node a special case?",
      options: [
        "It requires bypassing with a prev node, just like any other removal",
        "There is no prev before the head, so you move head itself rather than rewiring a prev.next arrow",
        "The head node cannot be removed at all",
      ],
      correctIndex: 1,
      explainWrong: "The head absolutely can be removed, and it's special precisely because there's no prev node before it to rewire. Instead of bypassing through a prev.next arrow, you move head directly to head.next.",
    },
    {
      id: "dsa-lists.sll-remove.3",
      prompt: "After a node is bypassed (no arrow points at it anymore), what happens to it?",
      options: [
        "It stays part of the list but is invisible",
        "It becomes unreachable and is effectively garbage",
        "It automatically becomes the new head",
      ],
      correctIndex: 1,
      explainWrong: "A bypassed node isn't secretly still in the list, nor does it become the head. With nothing pointing at it, there is no way to reach it anymore, so it is unreachable garbage.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: dll-and-variants — doubly linked lists add a prev arrow, circular
// lists loop the tail back to head, and dummy nodes remove special cases.
// ---------------------------------------------------------------------------

const dllAndVariantsUnit: Unit = {
  id: "dll-and-variants",
  title: "Doubly Linked, Circular, and Dummy Nodes",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "n2", label: "30", tag: "tail", x: 6, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "n0", to: "n1", label: "next", emphasis: "active" },
          { from: "n1", to: "n0", label: "prev" },
          { from: "n1", to: "n2", label: "next" },
          { from: "n2", to: "n1", label: "prev" },
        ],
      },
      caption: "A doubly linked list gives every node two arrows: next forward and prev backward.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "n2", label: "30", tag: "tail", x: 6, y: 1, shape: "box", emphasis: "active" },
        ],
        arrows: [
          { from: "n0", to: "n1", label: "next" },
          { from: "n1", to: "n0", label: "prev" },
          { from: "n1", to: "n2", label: "next" },
          { from: "n2", to: "n1", label: "prev", emphasis: "active" },
        ],
      },
      caption: "Because each node also has prev, you can walk backward from tail to head just as easily as forward.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "n2", label: "30", tag: "tail", x: 6, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "n0", to: "n1", label: "next" },
          { from: "n1", to: "n0", label: "prev" },
          { from: "n1", to: "n2", label: "next" },
          { from: "n2", to: "n1", label: "prev" },
          { from: "n2", to: "n0", label: "next", emphasis: "active" },
        ],
      },
      caption: "In a circular list, the tail's next arrow loops back to head instead of pointing at None.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "n2", label: "30", tag: "tail", x: 6, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "n0", to: "n1", label: "next" },
          { from: "n1", to: "n0", label: "prev" },
          { from: "n1", to: "n2", label: "next" },
          { from: "n2", to: "n1", label: "prev" },
          { from: "n2", to: "n0", label: "next" },
          { from: "n0", to: "n2", label: "prev", emphasis: "active" },
        ],
      },
      caption: "A circular doubly linked list closes the loop in both directions: head.prev reaches tail directly.",
    },
    {
      state: {
        nodes: [
          { id: "dummy", label: "-", tag: "dummy", x: 0, y: 1, shape: "box", emphasis: "new" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "dummy", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "A dummy node sits before the real head, holding no meaningful value of its own.",
    },
    {
      state: {
        nodes: [
          { id: "dummy", label: "-", tag: "dummy", x: 0, y: 1, shape: "box" },
          { id: "newNode", label: "5", x: 1, y: 3, shape: "box", emphasis: "new" },
          { id: "n0", label: "10", x: 2, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 4, y: 1, shape: "box" },
          { id: "n2", label: "30", x: 6, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "dummy", to: "newNode", emphasis: "active" },
          { from: "newNode", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "With a dummy node, inserting at the front is just insert_after(dummy): no special head case needed.",
    },
    {
      state: {
        nodes: [
          { id: "dummy", label: "-", tag: "dummy", x: 0, y: 1, shape: "box", emphasis: "dim" },
          { id: "newNode", label: "5", tag: "head", x: 2, y: 1, shape: "box" },
          { id: "n0", label: "10", x: 4, y: 1, shape: "box" },
          { id: "n1", label: "20", x: 6, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "dummy", to: "newNode" },
          { from: "newNode", to: "n0" },
          { from: "n0", to: "n1" },
        ],
      },
      caption: "Traversal always begins at dummy.next, never at dummy itself: the dummy is a placeholder, not real data.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "In a circular singly linked list with nodes 1 -> 2 -> 3, what does the last node's next point to?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "1", tag: "head", x: 0, y: 1, shape: "box" },
              { id: "b", label: "2", x: 3, y: 1, shape: "box" },
              { id: "c", label: "3", x: 6, y: 1, shape: "box" },
            ],
            arrows: [
              { from: "a", to: "b" },
              { from: "b", to: "c" },
            ],
          },
          caption: "In a normal list, node 3's next would be None; circular lists do something different.",
        },
      ],
      options: [
        { id: "a", label: "None" },
        { id: "b", label: "The node holding 1 (the head)" },
        { id: "c", label: "Itself" },
      ],
      correctId: "b",
      explainWrong: {
        a: "None marks the end in a normal, non-circular list; circular lists never use None to end the chain.",
        c: "The last node doesn't loop to itself; it loops all the way back to the first node, making a full circle.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "1", tag: "head", x: 0, y: 1, shape: "box" },
            { id: "b", label: "2", x: 3, y: 1, shape: "box" },
            { id: "c", label: "3", x: 6, y: 1, shape: "box", emphasis: "active" },
          ],
          arrows: [
            { from: "a", to: "b" },
            { from: "b", to: "c" },
            { from: "c", to: "a", emphasis: "active" },
          ],
        },
        caption: "Node 3's next loops back to node 1, the head, closing the circle.",
      },
      reviewStep: 2,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blank so inserting at the front never needs a special case.",
      code: [
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "dummy = Node(None)",
        "dummy.next = Node(20, Node(30, None))",
        "",
        "new_node = Node(10)",
        "new_node.next = dummy.{{link}}",
        "dummy.next = new_node",
      ].join("\n"),
      blanks: [
        {
          id: "link",
          placeholder: "___",
          answer: "next",
          explainWrong: "new_node needs to grab whatever dummy currently points at before dummy is redirected, so read dummy.next here.",
        },
      ],
      tests: [
        {
          name: "front insert works",
          code:
            "assert dummy.next.value == 10, \"dummy.next.value should be 10: the new node is now right after dummy\"\nassert dummy.next.next.value == 20, \"dummy.next.next.value should be 20: the old first node must still follow\"",
        },
      ],
      reviewStep: 5,
    },
    {
      kind: "write",
      prompt:
        "Write is_circular(head) that returns True if a linked list loops back on itself instead of ending at None, and False if it terminates normally. Assume it has at most 50 nodes, so walking that many steps is safe.",
      starter: [
        "class Node:",
        "    def __init__(self, value, next=None):",
        "        self.value = value",
        "        self.next = next",
        "",
        "def is_circular(head):",
        "    # walk up to 50 steps; if you hit None, it's not circular",
        "    # if you never hit None, it loops",
        "    pass",
      ].join("\n"),
      tests: [
        {
          name: "a normal list is not circular",
          code:
            "a = Node(1, Node(2, None))\nassert is_circular(a) == False, \"is_circular should be False: this list ends at None\"",
        },
        {
          name: "a looped list is circular",
          code:
            "b = Node(1)\nc = Node(2)\nb.next = c\nc.next = b\nassert is_circular(b) == True, \"is_circular should be True: this list loops back to b and never reaches None\"",
        },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "dsa-lists.dll-and-variants.1",
      prompt: "What extra pointer does every node in a doubly linked list have, compared to a singly linked list?",
      options: [
        "A pointer back to head",
        "A prev pointer to the node before it",
        "A pointer to the tail",
      ],
      correctIndex: 1,
      explainWrong: "Nodes don't each carry a shortcut to head or tail; only the list itself tracks those. A doubly linked node's extra pointer is prev, pointing at whichever node comes immediately before it.",
    },
    {
      id: "dsa-lists.dll-and-variants.2",
      prompt: "In a circular list, how does traversal know when it has visited every node?",
      options: [
        "It stops when cur becomes None",
        "It stops when cur comes back around to the starting node",
        "Circular lists cannot be traversed",
      ],
      correctIndex: 1,
      explainWrong: "A circular list never reaches None, so that check would loop forever, and it certainly can be traversed. The stopping condition is instead reaching the node you started from again.",
    },
    {
      id: "dsa-lists.dll-and-variants.3",
      prompt: "What problem does a dummy node solve?",
      options: [
        "It stores an extra real value at the front of the list",
        "It removes the need for special-case code when inserting or removing at the head",
        "It makes the list circular",
      ],
      correctIndex: 1,
      explainWrong: "A dummy node holds no meaningful data of its own and has nothing to do with making a list circular. Its purpose is to give every real node a prev, so head insertions and removals use the exact same code path as any other position.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 5: apply-lists — build a singly linked list from scratch with Node,
// append, and to_list.
// ---------------------------------------------------------------------------

const applyListsUnit: Unit = {
  id: "apply-lists",
  title: "Apply: Building a List From Scratch",
  watch: [
    {
      state: {
        nodes: [{ id: "head", label: "None", tag: "head", x: 0, y: 1, shape: "box" }],
        arrows: [],
      },
      caption: "We'll build a list from scratch using append: start with head = None, meaning empty.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: '"apple"', tag: "head", x: 0, y: 1, shape: "box" },
          { id: "n1", label: '"bread"', x: 3, y: 1, shape: "box" },
          { id: "n2", label: '"milk"', x: 6, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "Each append call finds the current tail and attaches one more node, growing the chain in order.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Implement a singly linked list: a Node class with value and next, an append(head, value) function that adds a new node to the end and returns the head, and a to_list(head) function that returns the values as a plain Python list, in order.",
      starter: [
        "def _viz(head):",
        "    nodes = []",
        "    arrows = []",
        "    cur = head",
        "    i = 0",
        "    while cur is not None:",
        "        node = {\"id\": f\"n{i}\", \"label\": repr(cur.value), \"x\": i * 2, \"y\": 1, \"shape\": \"box\"}",
        "        if i == 0:",
        "            node[\"tag\"] = \"head\"",
        "        nodes.append(node)",
        "        if i > 0:",
        "            arrows.append({\"from\": f\"n{i-1}\", \"to\": f\"n{i}\"})",
        "        cur = cur.next",
        "        i += 1",
        "    return {\"nodes\": nodes, \"arrows\": arrows}",
        "",
        "class Node:",
        "    def __init__(self, value):",
        "        # store value and next",
        "        pass",
        "",
        "def append(head, value):",
        "    # add a new node with value to the end of the list starting at head",
        "    # return the head of the list (unchanged unless head was None)",
        "    pass",
        "",
        "def to_list(head):",
        "    # return a plain Python list of values in order",
        "    pass",
      ].join("\n"),
      tests: [
        {
          name: "append builds the list in order",
          code:
            "head = None\nhead = append(head, 1)\nhead = append(head, 2)\nhead = append(head, 3)\nassert to_list(head) == [1, 2, 3], \"to_list(head) should be [1, 2, 3]: append must always attach to the current end, not the front\"",
        },
        {
          name: "append to an empty list",
          code:
            "h = append(None, 5)\nassert to_list(h) == [5], \"to_list should be [5]: appending to an empty list (head=None) creates the first node\"",
        },
        {
          name: "earlier nodes are preserved after more appends",
          code:
            "h2 = append(None, 'a')\nh2 = append(h2, 'b')\nassert to_list(h2) == ['a', 'b'], \"to_list should be ['a', 'b']: earlier nodes must stay linked in after later appends\"",
        },
      ],
      vizExpr: "_viz(append(append(append(None, 1), 2), 3))",
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-lists.apply-lists.1",
      prompt: "append(None, 5) is called on an empty list. What should the function return?",
      options: [
        "None, since the list was empty",
        "A new node holding 5, which becomes the new head",
        "An error, since head has no next to attach to",
      ],
      correctIndex: 1,
      explainWrong: "Appending to an empty list shouldn't raise an error or leave head as None; append must handle the empty case by creating the very first node and returning it as the new head.",
    },
    {
      id: "dsa-lists.apply-lists.2",
      prompt: "to_list(head) is called on a 3-node list holding 1, 2, 3. What should it return?",
      options: [
        "The head node itself",
        "The plain Python list [1, 2, 3]",
        "The number 3, the last value",
      ],
      correctIndex: 1,
      explainWrong: "to_list shouldn't hand back a node object or just the final value; it needs to walk the whole chain and collect every value into an ordinary Python list, in order.",
    },
  ],
};

export const chDsaLists: Chapter = {
  id: "dsa-lists",
  phase: 2,
  title: "Linked Lists",
  units: [nodesAndLinksUnit, sllInsertUnit, sllRemoveUnit, dllAndVariantsUnit, applyListsUnit],
};
