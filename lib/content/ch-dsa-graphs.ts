import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: graph-basics — vertices and edges, directed vs undirected, weights.
// ---------------------------------------------------------------------------

const graphBasicsUnit: Unit = {
  id: "graph-basics",
  title: "Vertices, Edges, and Weights",
  watch: [
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle", emphasis: "new" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle", emphasis: "new" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle", emphasis: "new" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "A graph's vertices (nodes) are just the objects: people, cities, pages. Nothing connects them yet.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "b", emphasis: "active" },
          { from: "b", to: "c", emphasis: "active" },
        ],
      },
      caption: "An undirected edge is a two-way connection: A-B means you can travel A to B, or B to A, equally.",
    },
    {
      state: {
        nodes: [
          { id: "a2", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b2", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c2", label: "C", x: 5, y: 1, shape: "circle" },
        ],
        arrows: [
          { from: "a2", to: "b2", emphasis: "active" },
          { from: "b2", to: "c2", emphasis: "active" },
        ],
      },
      caption: "A directed edge only goes one way: A -> B means you can travel from A to B, but not necessarily back.",
    },
    {
      state: {
        nodes: [
          { id: "a3", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "c3", label: "C", x: 1, y: 3, shape: "circle" },
        ],
        arrows: [{ from: "c3", to: "a3", emphasis: "error" }],
      },
      caption: "In that directed graph, there's no edge from C back to A: order matters, and reaching A from C might not even be possible.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "b", label: "4", emphasis: "active" },
          { from: "b", to: "c", label: "2", emphasis: "active" },
          { from: "a", to: "d", label: "7" },
        ],
      },
      caption: "A weighted edge attaches a cost to the connection, like distance or travel time, not just whether it exists.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "b", label: "4" },
          { from: "b", to: "c", label: "2" },
          { from: "a", to: "d", label: "7" },
          { from: "d", to: "c", label: "1" },
        ],
      },
      caption: "Put it all together: this is a directed, weighted graph. Vertices are the objects, edges are the connections, and weights are their costs.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A road graph has an edge drawn as a single line between city X and city Y, with no arrowhead. What does that mean?",
      steps: [
        {
          state: {
            nodes: [
              { id: "x", label: "X", x: 1, y: 1, shape: "circle", emphasis: "new" },
              { id: "y", label: "Y", x: 4, y: 1, shape: "circle", emphasis: "new" },
            ],
            arrows: [{ from: "x", to: "y" }],
          },
          caption: "A plain line connects X and Y.",
        },
      ],
      options: [
        { id: "a", label: "You can travel from X to Y, but not from Y to X" },
        { id: "b", label: "You can travel between X and Y in either direction" },
        { id: "c", label: "X and Y are not actually connected" },
      ],
      correctId: "b",
      explainWrong: {
        a: "That one-way restriction is what a directed edge (drawn with an arrowhead) means. A plain line with no arrowhead is undirected: it works both ways.",
        c: "A drawn line between two vertices always represents a connection between them; there'd be no line at all if they weren't connected.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "x", label: "X", x: 1, y: 1, shape: "circle", emphasis: "active" },
            { id: "y", label: "Y", x: 4, y: 1, shape: "circle", emphasis: "active" },
          ],
          arrows: [{ from: "x", to: "y", emphasis: "active" }],
        },
        caption: "Undirected: X-Y works the same as Y-X, one connection, travel either way.",
      },
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing word describing what a number attached to an edge, like a road's distance in miles, is called.",
      code: "edge_cost = graph[\"A\"][\"B\"]  # this number is the edge's {{term}}",
      blanks: [
        {
          id: "term",
          placeholder: "___",
          answer: "weight",
          explainWrong:
            "That number isn't the vertex's label or the edge's direction; it's the cost attached to traveling that edge, which is called the edge's weight.",
        },
      ],
      tests: [
        { name: "term is used consistently", code: "assert edge_cost == graph[\"A\"][\"B\"], \"edge_cost should equal graph['A']['B']: the weight stored for that edge\"" },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-graphs.graph-basics.1",
      prompt: "What is the difference between a directed edge and an undirected edge?",
      options: [
        "A directed edge only allows travel one way; an undirected edge allows travel both ways",
        "A directed edge always has a weight; an undirected edge never does",
        "There is no real difference, just notation",
      ],
      correctIndex: 0,
      explainWrong:
        "Weights are a separate concept from direction; either kind of edge can carry a weight or not. The real difference is travel direction: directed edges are one-way, undirected edges work both ways.",
    },
    {
      id: "dsa-graphs.graph-basics.2",
      prompt: "In a directed graph, if there's an edge from C to A, can you always also travel from A to C?",
      options: [
        "Yes, direction never actually restricts anything",
        "Only if there's a separate edge explicitly drawn from A to C",
        "Yes, but only for weighted graphs",
      ],
      correctIndex: 1,
      explainWrong:
        "Direction is a real restriction, not just a formality, and it applies whether or not the graph is weighted. An edge C -> A says nothing about A -> C; that would need its own, separate edge to exist.",
    },
    {
      id: "dsa-graphs.graph-basics.3",
      prompt: "What does a weight attached to an edge typically represent?",
      options: [
        "How many vertices the graph has",
        "A cost, like distance, time, or price, associated with using that connection",
        "Whether the edge is directed or undirected",
      ],
      correctIndex: 1,
      explainWrong:
        "Weight has nothing to do with vertex count or direction. It's a number representing the cost of traversing that specific edge, such as a road's distance or a flight's price.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: representations — adjacency list vs adjacency matrix.
// ---------------------------------------------------------------------------

const representationsUnit: Unit = {
  id: "representations",
  title: "Adjacency List vs Adjacency Matrix",
  watch: [
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 0, shape: "circle", emphasis: "new" },
          { id: "b", label: "B", x: 4, y: 0, shape: "circle", emphasis: "new" },
          { id: "c", label: "C", x: 1, y: 3, shape: "circle", emphasis: "new" },
          { id: "d", label: "D", x: 4, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "a", to: "b" },
          { from: "a", to: "c" },
          { from: "b", to: "d" },
          { from: "c", to: "d" },
        ],
      },
      caption: "This small 4-node graph, a square of connections, will be shown two different ways to store it in memory.",
    },
    {
      state: {
        nodes: [
          { id: "rowA", label: "A", tag: "adjacency row", x: 0, y: 1, shape: "frame", emphasis: "new" },
          { id: "b1", label: "B", x: 2, y: 1, shape: "box" },
          { id: "c1", label: "C", x: 4, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "rowA", to: "b1", emphasis: "active" },
          { from: "rowA", to: "c1", emphasis: "active" },
        ],
      },
      caption: "An adjacency list gives each vertex a row listing only its actual neighbors: A connects to B and C.",
    },
    {
      state: {
        nodes: [
          { id: "rowB", label: "B", tag: "adjacency row", x: 0, y: 1, shape: "frame", emphasis: "new" },
          { id: "a2", label: "A", x: 2, y: 1, shape: "box" },
          { id: "d2", label: "D", x: 4, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "rowB", to: "a2", emphasis: "active" },
          { from: "rowB", to: "d2", emphasis: "active" },
        ],
      },
      caption: "B's row lists A and D, its only neighbors. No wasted space listing non-neighbors.",
    },
    {
      state: {
        nodes: [
          { id: "rowC", label: "C", tag: "adjacency row", x: 0, y: 1, shape: "frame", emphasis: "new" },
          { id: "a3", label: "A", x: 2, y: 1, shape: "box" },
          { id: "d3", label: "D", x: 4, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "rowC", to: "a3", emphasis: "active" },
          { from: "rowC", to: "d3", emphasis: "active" },
        ],
      },
      caption: "C's row lists A and D.",
    },
    {
      state: {
        nodes: [
          { id: "rowD", label: "D", tag: "adjacency row", x: 0, y: 1, shape: "frame", emphasis: "new" },
          { id: "b4", label: "B", x: 2, y: 1, shape: "box" },
          { id: "c4", label: "C", x: 4, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "rowD", to: "b4", emphasis: "active" },
          { from: "rowD", to: "c4", emphasis: "active" },
        ],
      },
      caption: "D's row lists B and C. All four rows together are the complete adjacency list.",
    },
    {
      state: {
        nodes: [
          { id: "h0", label: "", tag: "A", x: 1, y: 0, shape: "box" },
          { id: "h1", label: "", tag: "B", x: 2, y: 0, shape: "box" },
          { id: "h2", label: "", tag: "C", x: 3, y: 0, shape: "box" },
          { id: "h3", label: "", tag: "D", x: 4, y: 0, shape: "box" },
          { id: "m00", label: "0", x: 1, y: 1, shape: "box" },
          { id: "m01", label: "1", x: 2, y: 1, shape: "box", emphasis: "active" },
          { id: "m02", label: "1", x: 3, y: 1, shape: "box", emphasis: "active" },
          { id: "m03", label: "0", x: 4, y: 1, shape: "box" },
        ],
        arrows: [],
      },
      caption: "An adjacency matrix instead uses an N x N grid: row A has a 1 in B's and C's columns, and a 0 everywhere else, even for pairs with no edge.",
    },
    {
      state: {
        nodes: [
          { id: "list", label: "4 rows, 8 total entries", tag: "adjacency list", x: 1, y: 1, shape: "frame" },
          { id: "matrix", label: "4 x 4 = 16 cells", tag: "adjacency matrix", x: 5, y: 1, shape: "frame" },
        ],
        arrows: [],
      },
      caption: "Tradeoff: the list only stores real edges, so it's compact for sparse graphs; the matrix stores every possible pair, giving instant O(1) edge lookup but wasting space when edges are few.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A graph has 1000 vertices but only 3 edges total. Which representation uses drastically less memory?",
      steps: [
        {
          state: {
            nodes: [
              { id: "sparse", label: "1000 vertices, 3 edges", tag: "very sparse graph", x: 3, y: 1, shape: "frame", emphasis: "new" },
            ],
            arrows: [],
          },
          caption: "A sparse graph: almost no pairs of vertices are actually connected.",
        },
      ],
      options: [
        { id: "a", label: "Adjacency list, since it only stores the edges that actually exist" },
        { id: "b", label: "Adjacency matrix, since it's always more compact" },
        { id: "c", label: "They always use exactly the same amount of memory" },
      ],
      correctId: "a",
      explainWrong: {
        b: "A matrix is fixed at vertices squared cells, here 1,000,000, regardless of how few edges exist. It's the opposite of compact for a sparse graph like this one.",
        c: "The list scales with the number of edges (3, here), while the matrix scales with vertices squared (1,000,000 cells). Those are wildly different amounts of memory in this case.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "list", label: "3 entries", tag: "adjacency list", x: 2, y: 1, shape: "frame", emphasis: "active" },
            { id: "matrix", label: "1,000,000 cells", tag: "adjacency matrix", x: 5, y: 1, shape: "frame", emphasis: "error" },
          ],
          arrows: [],
        },
        caption: "The list stores 3 entries; the matrix reserves 1,000,000 cells regardless. For sparse graphs, the list wins by a huge margin.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in which representation gives the fastest way to check whether a specific edge exists between two known vertices.",
      code: "# checking graph[i][j] directly is fastest with an adjacency {{term}}",
      blanks: [
        {
          id: "term",
          placeholder: "___",
          answer: "matrix",
          explainWrong:
            "An adjacency list needs to scan through a vertex's whole neighbor list to check for one specific edge. A matrix gives that answer in one direct lookup, graph[i][j], which is why it's the faster structure for that specific question.",
        },
      ],
      tests: [
        { name: "term used consistently", code: "assert isinstance(term, str) and len(term) > 0, \"term should name the representation used for O(1) edge lookup\"" },
      ],
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "dsa-graphs.representations.1",
      prompt: "In an adjacency list, what does each vertex's row store?",
      options: [
        "Only its actual neighbors",
        "A 0 or 1 for every other vertex in the graph",
        "The total number of edges in the whole graph",
      ],
      correctIndex: 0,
      explainWrong:
        "A row of 0s and 1s for every vertex describes the MATRIX representation, not the list. An adjacency list's row only lists the vertices it's actually connected to.",
    },
    {
      id: "dsa-graphs.representations.2",
      prompt: "In an adjacency matrix, what does a 0 at row A, column B mean?",
      options: [
        "A and B are not directly connected by an edge",
        "A and B are the same vertex",
        "The graph has an error",
      ],
      correctIndex: 0,
      explainWrong:
        "A 0 is a completely normal, expected entry: it simply records that there's no direct edge between A and B. It doesn't indicate a self-loop or a broken graph.",
    },
    {
      id: "dsa-graphs.representations.3",
      prompt: "Why might an adjacency matrix waste a lot of memory on a sparse graph?",
      options: [
        "It reserves a cell for every possible pair of vertices, even the vast majority that have no edge",
        "It duplicates every edge twice by mistake",
        "It always stores vertex names as long strings",
      ],
      correctIndex: 0,
      explainWrong:
        "There's no duplication bug and string storage isn't the issue. The matrix simply allocates vertices squared cells total, and in a sparse graph, almost all of those cells hold a 0 for a nonexistent edge.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: bfs — level-by-level frontier, FIFO queue.
// ---------------------------------------------------------------------------

const bfsUnit: Unit = {
  id: "bfs",
  title: "BFS: Spreading Level by Level",
  watch: [
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "q0", label: "S", tag: "queue front", x: 2, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "BFS starts by marking S visited and putting it in the queue. Nothing else is discovered yet.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "active" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "qa", label: "A", tag: "queue front", x: 2, y: 4, shape: "box", emphasis: "new" },
          { id: "qb", label: "B", tag: "queue back", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a", emphasis: "active" }, { from: "s", to: "b", emphasis: "active" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "S is dequeued and its neighbors, A and B, are discovered and enqueued. The frontier spreads outward by one level.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "active" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "active" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "qb", label: "B", tag: "queue front", x: 2, y: 4, shape: "box", emphasis: "new" },
          { id: "qc", label: "C", tag: "queue back", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c", emphasis: "active" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "A is dequeued; its only unvisited neighbor, C, is discovered and enqueued behind B.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "active" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle", emphasis: "active" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle", emphasis: "active" },
          { id: "qc", label: "C", tag: "queue front", x: 1, y: 4, shape: "box", emphasis: "new" },
          { id: "qd", label: "D", x: 2, y: 4, shape: "box", emphasis: "new" },
          { id: "qe", label: "E", tag: "queue back", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d", emphasis: "active" }, { from: "b", to: "e", emphasis: "active" }],
      },
      caption: "B is dequeued; both of its unvisited neighbors, D and E, are discovered at once, starting level 2.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "qd", label: "D", tag: "queue front", x: 2, y: 4, shape: "box", emphasis: "new" },
          { id: "qe", label: "E", tag: "queue back", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "C is dequeued. Its only neighbor, A, is already visited, so nothing new is discovered; the queue just keeps draining.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "qe", label: "E", tag: "queue front and back", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "D is dequeued with no new neighbors either. Only E is left in the queue.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle", emphasis: "dim" },
          { id: "qempty", label: "empty", tag: "queue", x: 3, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "E is dequeued, no new neighbors, and the queue is finally empty: BFS is complete.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "level 0", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "level 1", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", tag: "level 1", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "level 2", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", tag: "level 2", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "e", label: "E", tag: "level 2", x: 6, y: 4, shape: "circle", emphasis: "dim" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "The visit order, S, A, B, C, D, E, is exactly the level order from the start: BFS uses a queue because the OLDEST discovered node should always go next.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "BFS from S has just dequeued A and enqueued its unvisited neighbor C. The queue is now [B, C]. Which node does BFS visit next?",
      steps: [
        {
          state: {
            nodes: [
              { id: "qb", label: "B", tag: "queue front", x: 2, y: 4, shape: "box", emphasis: "new" },
              { id: "qc", label: "C", tag: "queue back", x: 3, y: 4, shape: "box", emphasis: "new" },
            ],
            arrows: [],
          },
          caption: "Queue: `[B, C]`, with B at the front.",
        },
      ],
      options: [
        { id: "a", label: "B, since it's been waiting in the queue longer than C" },
        { id: "b", label: "C, since it was just discovered most recently" },
        { id: "c", label: "Whichever of B or C has a smaller label alphabetically" },
      ],
      correctId: "a",
      explainWrong: {
        b: "That describes a stack's LIFO behavior (most-recent-first), not a queue's. BFS uses a queue: the OLDEST discovered node goes next, not the most recently discovered one.",
        c: "BFS order depends entirely on discovery order, tracked by the queue, never on alphabetical or numeric comparison of labels.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "qc", label: "C", tag: "queue front and back", x: 3, y: 4, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "B is dequeued next since it's been waiting longest; only C remains after that.",
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "Fill in which data structure BFS uses to decide which discovered node to visit next.",
      code: "from collections import deque\nfrontier = {{struct}}()  # BFS: oldest discovered node goes first",
      blanks: [
        {
          id: "struct",
          placeholder: "___",
          answer: "deque",
          explainWrong:
            "A deque (used as a FIFO queue) is what gives BFS its level-by-level order: the oldest discovered node comes out first. A stack would visit the most recently discovered node first instead, which is DFS's behavior, not BFS's.",
        },
      ],
      tests: [
        { name: "frontier supports FIFO append/popleft", code: "frontier.append(1)\nfrontier.append(2)\nassert frontier.popleft() == 1, \"BFS's frontier should be FIFO: the first item enqueued should be the first one dequeued\"" },
      ],
      reviewStep: 0,
    },
    {
      kind: "write",
      prompt:
        "Given a graph as a dict mapping each node to a list of its neighbors (for example, `{\"S\": [\"A\", \"B\"], \"A\": [\"S\", \"C\"]}`) and a `start` node, return a list of nodes in BFS visit order beginning at `start`. Visit each node only once, and process neighbors in the order they appear in `graph[node]`.",
      difficulty: "Medium",
      examples: [
        {
          input: "`graph = {\"A\": [\"B\"], \"B\": [\"A\", \"C\"], \"C\": [\"B\"]}`, `start = \"A\"`",
          output: "`[\"A\", \"B\", \"C\"]`",
        },
        {
          input: "`graph = {\"X\": []}`, `start = \"X\"`",
          output: "`[\"X\"]`",
          explanation: "A graph with a single node and no edges returns just that node.",
        },
      ],
      constraints: ["`1 <= number of nodes <= 10^3`", "`start` is always a key in `graph`"],
      bigO: { answer: "O(n)", explain: "`bfs_order` visits every node and edge in `graph` exactly once; closest offered option to the true `O(V+E)` is `O(n)`." },
      starter:
        "from collections import deque\n\ndef bfs_order(graph, start):\n    # return a list of nodes in BFS visit order from start\n    pass\n",
      solution:
        "from collections import deque\n\ndef bfs_order(graph, start):\n    visited = {start}\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order\n",
      tests: [
        {
          name: "simple chain",
          code:
            "g = {\"A\": [\"B\"], \"B\": [\"A\", \"C\"], \"C\": [\"B\"]}\nassert bfs_order(g, \"A\") == [\"A\", \"B\", \"C\"], \"bfs_order on a straight chain A-B-C from A should visit them in order: [A, B, C]\"",
        },
        {
          name: "branching graph visits by level",
          code:
            "g = {\"S\": [\"A\", \"B\"], \"A\": [\"S\", \"C\"], \"B\": [\"S\", \"D\", \"E\"], \"C\": [\"A\"], \"D\": [\"B\"], \"E\": [\"B\"]}\nassert bfs_order(g, \"S\") == [\"S\", \"A\", \"B\", \"C\", \"D\", \"E\"], \"bfs_order should visit S, then both its neighbors A and B, then their neighbors C, D, E: level by level, in [S, A, B, C, D, E]\"",
        },
        {
          name: "single node graph",
          code: "g = {\"X\": []}\nassert bfs_order(g, \"X\") == [\"X\"], \"bfs_order on a graph with just one node should return [X]\"",
        },
      ],
      reviewStep: 7,
    },
  ],
  recall: [
    {
      id: "dsa-graphs.bfs.1",
      prompt: "What data structure does BFS use to track which node to visit next, and why?",
      options: [
        "A queue (FIFO), so the oldest discovered node is visited before newer ones",
        "A stack (LIFO), so the newest discovered node is visited first",
        "A sorted list, so the smallest-labeled node is visited first",
      ],
      correctIndex: 0,
      explainWrong:
        "Stack behavior (newest-first) and label sorting both describe other algorithms, not BFS. BFS specifically needs a FIFO queue so that discovery order is preserved: the oldest discovered node always goes next.",
    },
    {
      id: "dsa-graphs.bfs.2",
      prompt: "Why does BFS visit nodes in level order (all distance-1 nodes before any distance-2 nodes)?",
      options: [
        "Because every node at distance 1 gets enqueued before any node at distance 2 can be discovered",
        "Because BFS explicitly sorts nodes by distance before visiting them",
        "It's coincidental and not guaranteed",
      ],
      correctIndex: 0,
      explainWrong:
        "There's no sorting step, and this behavior is guaranteed, not coincidental. It falls directly out of the queue: all of a node's neighbors get enqueued together, so an entire level finishes being enqueued before the next level's nodes are even discovered.",
    },
    {
      id: "dsa-graphs.bfs.3",
      prompt: "In BFS, once a node has been marked visited, what happens if it's encountered again as another node's neighbor?",
      options: [
        "It's skipped, since it's already been discovered and doesn't need to be enqueued again",
        "It's enqueued again so it gets visited twice",
        "The whole search restarts from that node",
      ],
      correctIndex: 0,
      explainWrong:
        "BFS never revisits or restarts. A node marked visited is simply skipped the next time it's seen as a neighbor, since it's already been discovered and queued exactly once.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: dfs — dive deep first, backtrack when stuck, LIFO stack.
// ---------------------------------------------------------------------------

const dfsUnit: Unit = {
  id: "dfs",
  title: "DFS: Diving Deep, Then Backtracking",
  watch: [
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "st0", label: "S", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "DFS pushes the start node S onto the stack and dives in from there.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "st0", label: "S", x: 2, y: 4, shape: "box" },
          { id: "st1", label: "A", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a", emphasis: "active" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "DFS picks S's first unvisited neighbor, A, and dives straight into it, going as deep as possible before backtracking.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "active" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "st0", label: "S", x: 1, y: 4, shape: "box" },
          { id: "st1", label: "A", x: 2, y: 4, shape: "box" },
          { id: "st2", label: "C", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c", emphasis: "active" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "Deeper still: from A, DFS dives into C.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "st0", label: "S", x: 2, y: 4, shape: "box" },
          { id: "st1", label: "A", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "C has no unvisited neighbors (A is already visited), so DFS backtracks: C is popped off the stack, back to A.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "active" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "st0", label: "S", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "A also has no more unvisited neighbors, so it backtracks too, popping back to S.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "active" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "st0", label: "S", x: 2, y: 4, shape: "box" },
          { id: "st1", label: "B", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b", emphasis: "active" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "Back at S, DFS resumes exploring its next unvisited neighbor, B, the branch it hadn't tried yet.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle", emphasis: "active" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle" },
          { id: "st0", label: "S", x: 1, y: 4, shape: "box" },
          { id: "st1", label: "B", x: 2, y: 4, shape: "box" },
          { id: "st2", label: "D", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d", emphasis: "active" }, { from: "b", to: "e" }],
      },
      caption: "DFS dives into B's first unvisited neighbor, D.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "active" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle", emphasis: "active" },
          { id: "st0", label: "S", x: 1, y: 4, shape: "box" },
          { id: "st1", label: "B", x: 2, y: 4, shape: "box" },
          { id: "st2", label: "E", tag: "stack top", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e", emphasis: "active" }],
      },
      caption: "D has no unvisited neighbors, so it backtracks to B, which then dives into its last unvisited neighbor, E.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", x: 5, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", x: 0, y: 4, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", x: 4, y: 4, shape: "circle", emphasis: "dim" },
          { id: "e", label: "E", x: 6, y: 4, shape: "circle", emphasis: "dim" },
          { id: "stempty", label: "empty", tag: "stack", x: 3, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [{ from: "s", to: "a" }, { from: "s", to: "b" }, { from: "a", to: "c" }, { from: "b", to: "d" }, { from: "b", to: "e" }],
      },
      caption: "E backtracks, then B, then S, all with no unvisited neighbors left. The stack empties out: DFS is complete.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "DFS is at node A, which has two unvisited neighbors left: C and D, checked in that order. Where does DFS go next?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "A", x: 3, y: 1, shape: "circle", emphasis: "active" },
              { id: "c", label: "C", x: 1, y: 3, shape: "circle" },
              { id: "d", label: "D", x: 5, y: 3, shape: "circle" },
            ],
            arrows: [{ from: "a", to: "c" }, { from: "a", to: "d" }],
          },
          caption: "A has two unvisited neighbors: C, then D.",
        },
      ],
      options: [
        { id: "a", label: "C, the first unvisited neighbor; DFS dives fully into it before ever trying D" },
        { id: "b", label: "Both C and D are explored at the same time" },
        { id: "c", label: "D, since DFS always explores the last-listed neighbor first" },
      ],
      correctId: "a",
      explainWrong: {
        b: "DFS is not parallel; it commits fully to one neighbor at a time. It dives all the way into C, exploring everything reachable from there, before ever touching D.",
        c: "DFS follows the order neighbors are checked, first to last, not the reverse. It dives into C first, since that's the first unvisited neighbor.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "A", x: 3, y: 1, shape: "circle", emphasis: "dim" },
            { id: "c", label: "C", x: 1, y: 3, shape: "circle", emphasis: "active" },
          ],
          arrows: [{ from: "a", to: "c", emphasis: "active" }],
        },
        caption: "DFS dives into C first; D will only be tried once C's entire branch is fully explored and backtracked out of.",
      },
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: "Fill in which data structure's LIFO order naturally produces DFS's dive-then-backtrack behavior.",
      code: "explore_order = {{struct}}  # LIFO: most recently discovered node goes next",
      blanks: [
        {
          id: "struct",
          placeholder: "___",
          answer: "stack",
          explainWrong:
            "A queue's FIFO order (oldest-first) is what BFS uses, and it would spread level by level instead of diving deep. DFS needs LIFO order, the most recently discovered node explored first, which is exactly what a stack provides, whether explicit or via recursion's call stack.",
        },
      ],
      tests: [
        { name: "stack-like behavior", code: "s = []\ns.append(1)\ns.append(2)\nassert s.pop() == 2, \"DFS's structure should be LIFO: the most recently pushed item should come out first\"" },
      ],
      reviewStep: 0,
    },
  ],
  recall: [
    {
      id: "dsa-graphs.dfs.1",
      prompt: "What data structure's ordering matches how DFS explores a graph?",
      options: [
        "A stack (LIFO): the most recently discovered node is explored next",
        "A queue (FIFO): the oldest discovered node is explored next",
        "A sorted list of node labels",
      ],
      correctIndex: 0,
      explainWrong:
        "FIFO order and label sorting describe other approaches, not DFS. DFS matches a stack's LIFO order, diving into the most recently discovered node, whether that stack is explicit or is Python's own call stack via recursion.",
    },
    {
      id: "dsa-graphs.dfs.2",
      prompt: "In DFS, what triggers a backtrack?",
      options: [
        "The current node has no unvisited neighbors left to explore",
        "A fixed number of steps have passed",
        "The algorithm reaches a node with the same label as the start",
      ],
      correctIndex: 0,
      explainWrong:
        "Backtracking isn't on a timer or triggered by matching labels. It happens specifically when the current node runs out of unvisited neighbors, so DFS pops back to whatever node called it, to try any of ITS remaining unvisited neighbors.",
    },
    {
      id: "dsa-graphs.dfs.3",
      prompt: "DFS and BFS are given the exact same graph and start node. Do they always visit nodes in the same order?",
      options: [
        "Not necessarily; DFS dives deep along one branch first, while BFS spreads out level by level",
        "Yes, always, since both algorithms visit every reachable node eventually",
        "Yes, but only for graphs with no cycles",
      ],
      correctIndex: 0,
      explainWrong:
        "Reaching every node eventually doesn't mean the ORDER matches, and cycles aren't the deciding factor here. DFS commits to one deep branch before backtracking, while BFS visits everything at the current distance before moving further out; these produce genuinely different visit orders on the same graph.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 5: shortest-path — Dijkstra settles the smallest tentative distance
// each round; Bellman-Ford trades speed for handling negative weights.
// ---------------------------------------------------------------------------

const shortestPathUnit: Unit = {
  id: "shortest-path",
  title: "Dijkstra's Shortest Path",
  watch: [
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "active" },
          { id: "a", label: "A", tag: "dist: inf", x: 4, y: 0, shape: "circle" },
          { id: "b", label: "B", tag: "dist: inf", x: 4, y: 2, shape: "circle" },
          { id: "c", label: "C", tag: "dist: inf", x: 6, y: 0, shape: "circle" },
          { id: "d", label: "D", tag: "dist: inf", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "Dijkstra starts every distance at infinity except the source, S, which is 0 and already settled (done).",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 4", x: 4, y: 0, shape: "circle", emphasis: "new" },
          { id: "b", label: "B", tag: "dist: 1", x: 4, y: 2, shape: "circle", emphasis: "new" },
          { id: "c", label: "C", tag: "dist: inf", x: 6, y: 0, shape: "circle" },
          { id: "d", label: "D", tag: "dist: inf", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4", emphasis: "active" }, { from: "s", to: "b", label: "1", emphasis: "active" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "Relaxing S's edges gives A a tentative distance of 4 and B a tentative distance of 1.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 4", x: 4, y: 0, shape: "circle" },
          { id: "b", label: "B", tag: "dist: 1 (done)", x: 4, y: 2, shape: "circle", emphasis: "active" },
          { id: "c", label: "C", tag: "dist: inf", x: 6, y: 0, shape: "circle" },
          { id: "d", label: "D", tag: "dist: inf", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "The smallest tentative distance, B at 1, is settled (done): once settled, a distance can never improve again.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 3", x: 4, y: 0, shape: "circle", emphasis: "new" },
          { id: "b", label: "B", tag: "dist: 1 (done)", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "dist: inf", x: 6, y: 0, shape: "circle" },
          { id: "d", label: "D", tag: "dist: 6", x: 6, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2", emphasis: "active" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5", emphasis: "active" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "Relaxing from B: going through B, A improves from 4 to 1+2=3, and D gets its first distance, 1+5=6.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 3 (done)", x: 4, y: 0, shape: "circle", emphasis: "active" },
          { id: "b", label: "B", tag: "dist: 1 (done)", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "dist: inf", x: 6, y: 0, shape: "circle" },
          { id: "d", label: "D", tag: "dist: 6", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "A, now the smallest remaining tentative distance at 3, is settled.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 3 (done)", x: 4, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", tag: "dist: 1 (done)", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "dist: 4", x: 6, y: 0, shape: "circle", emphasis: "new" },
          { id: "d", label: "D", tag: "dist: 6", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1", emphasis: "active" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "Relaxing from A: C gets its first distance, 3+1=4.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 3 (done)", x: 4, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", tag: "dist: 1 (done)", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "dist: 4 (done)", x: 6, y: 0, shape: "circle", emphasis: "active" },
          { id: "d", label: "D", tag: "dist: 6", x: 6, y: 2, shape: "circle" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "C, the smallest remaining tentative distance at 4, is settled.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 3 (done)", x: 4, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", tag: "dist: 1 (done)", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "dist: 4 (done)", x: 6, y: 0, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", tag: "dist: 5", x: 6, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1", emphasis: "active" },
        ],
      },
      caption: "Relaxing from C: D improves from 6 to 4+1=5, a cheaper path than going through B directly.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: "S", tag: "dist: 0 (done)", x: 1, y: 1, shape: "circle", emphasis: "dim" },
          { id: "a", label: "A", tag: "dist: 3 (done)", x: 4, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", tag: "dist: 1 (done)", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "dist: 4 (done)", x: 6, y: 0, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", tag: "dist: 5 (done)", x: 6, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [
          { from: "s", to: "a", label: "4" }, { from: "s", to: "b", label: "1" },
          { from: "b", to: "a", label: "2" }, { from: "a", to: "c", label: "1" },
          { from: "b", to: "d", label: "5" }, { from: "c", to: "d", label: "1" },
        ],
      },
      caption: "D is settled at 5. Every node is now done: these are the final shortest distances from S.",
    },
    {
      state: {
        nodes: [
          { id: "x", label: "X", tag: "dist: 5", x: 2, y: 2, shape: "circle" },
          { id: "y", label: "Y", tag: "dist: 2", x: 5, y: 2, shape: "circle", emphasis: "error" },
        ],
        arrows: [{ from: "x", to: "y", label: "-3", emphasis: "error" }],
      },
      caption: "Dijkstra assumes weights are never negative, so it can't handle an edge like this. Bellman-Ford relaxes every edge repeatedly instead, which correctly handles negative weights, though not negative cycles.",
    },
  ],
  ladder: [
    {
      kind: "fillin",
      prompt: "Fill in the relaxation rule: update a neighbor's distance only when going through the current node gives a shorter path.",
      code: [
        "def relax(current_dist, edge_weight, neighbor_dist):",
        "    candidate = current_dist + edge_weight",
        "    if candidate {{cmp}} neighbor_dist:",
        "        return candidate",
        "    return neighbor_dist",
      ].join("\n"),
      blanks: [
        {
          id: "cmp",
          placeholder: "___",
          answer: "<",
          explainWrong:
            "Relaxation only updates the neighbor's distance when the new candidate path is strictly SHORTER than what's already recorded; using >= or <= would either skip real improvements or waste an update when nothing actually got shorter. The comparison must be candidate < neighbor_dist.",
        },
      ],
      tests: [
        { name: "shorter path updates", code: "assert relax(1, 2, 6) == 3, \"relax(1, 2, 6) should be 3: 1+2=3 is shorter than 6, so it updates\"" },
        { name: "longer path does not update", code: "assert relax(4, 5, 3) == 3, \"relax(4, 5, 3) should stay 3: 4+5=9 is not shorter than 3, so it should NOT update\"" },
        { name: "equal path does not update", code: "assert relax(1, 2, 3) == 3, \"relax(1, 2, 3) should stay 3: 1+2=3 is not strictly shorter than 3, so no update happens\"" },
      ],
      reviewStep: 1,
    },
    {
      kind: "predict",
      prompt: "Dijkstra has just settled node B at distance 1. Can B's distance ever change after this point?",
      steps: [
        {
          state: {
            nodes: [{ id: "b", label: "B", tag: "dist: 1 (done)", x: 3, y: 1, shape: "circle", emphasis: "active" }],
            arrows: [],
          },
          caption: "B has just been settled at distance 1.",
        },
      ],
      options: [
        { id: "a", label: "No, once settled, a node's distance is final and never revisited" },
        { id: "b", label: "Yes, if a cheaper path through a later-settled node is found" },
        { id: "c", label: "Only if the graph has negative weights" },
      ],
      correctId: "a",
      explainWrong: {
        b: "This is exactly the guarantee Dijkstra relies on: because it always settles the currently-smallest tentative distance, and all weights are non-negative, no later path could ever be cheaper. Settled means truly final.",
        c: "Dijkstra isn't even valid on graphs with negative weights in the first place; this 'never changes once settled' guarantee is what makes Dijkstra work correctly on non-negative graphs, not something that depends on negative weights existing.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "b", label: "B", tag: "dist: 1 (permanently done)", x: 3, y: 1, shape: "circle", emphasis: "active" }],
          arrows: [],
        },
        caption: "Settled means permanently final: Dijkstra never revisits a node once it's been settled.",
      },
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-graphs.shortest-path.1",
      prompt: "In Dijkstra's algorithm, which node gets settled next at each step?",
      options: [
        "The unsettled node with the smallest current tentative distance",
        "Whichever node was discovered most recently",
        "The node with the most outgoing edges",
      ],
      correctIndex: 0,
      explainWrong:
        "Discovery order and edge count aren't what Dijkstra uses to choose. It always settles whichever unsettled node currently has the smallest tentative distance, which is what guarantees that distance is already final.",
    },
    {
      id: "dsa-graphs.shortest-path.2",
      prompt: "Why can't Dijkstra's algorithm be trusted on a graph with negative edge weights?",
      options: [
        "It could settle a node too early, before a cheaper path through a negative edge is later discovered",
        "Negative weights make the graph disconnected",
        "It would run forever without terminating",
      ],
      correctIndex: 0,
      explainWrong:
        "Negative weights don't disconnect the graph or cause infinite loops in Dijkstra itself. The real problem is that Dijkstra assumes the smallest tentative distance can never be beaten later, but a negative edge discovered afterward could still produce a cheaper path, breaking that assumption.",
    },
    {
      id: "dsa-graphs.shortest-path.3",
      prompt: "What does Bellman-Ford do differently from Dijkstra to correctly handle negative weights?",
      options: [
        "It relaxes every edge repeatedly, across multiple full passes, instead of settling nodes greedily one at a time",
        "It ignores negative edges entirely",
        "It only works on undirected graphs",
      ],
      correctIndex: 0,
      explainWrong:
        "Bellman-Ford doesn't skip negative edges, and it isn't restricted to undirected graphs. It trades Dijkstra's greedy, one-settle-at-a-time speed for repeatedly relaxing every edge over multiple passes, which correctly handles negative weights (though still not negative cycles).",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 6: topo-mst — emitting nodes with no incoming edges in order; building
// a minimum spanning tree by picking the cheapest edge that avoids a cycle.
// ---------------------------------------------------------------------------

const topoMstUnit: Unit = {
  id: "topo-mst",
  title: "Topological Order and Minimum Spanning Trees",
  watch: [
    {
      state: {
        nodes: [
          { id: "a", label: "A", tag: "in-degree 0", x: 1, y: 0, shape: "circle" },
          { id: "b", label: "B", tag: "in-degree 0", x: 5, y: 0, shape: "circle" },
          { id: "c", label: "C", tag: "in-degree 2", x: 3, y: 2, shape: "circle" },
          { id: "d", label: "D", tag: "in-degree 1", x: 1, y: 4, shape: "circle" },
          { id: "e", label: "E", tag: "in-degree 1", x: 5, y: 4, shape: "circle" },
          { id: "f", label: "F", tag: "in-degree 2", x: 3, y: 6, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "c" }, { from: "b", to: "c" }, { from: "c", to: "d" }, { from: "c", to: "e" },
          { from: "d", to: "f" }, { from: "e", to: "f" },
        ],
      },
      caption: "Topological order needs a node with NO incoming edges first, since nothing depends on it yet: only A and B qualify right now.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", tag: "emitted", x: 1, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", tag: "in-degree 0", x: 5, y: 0, shape: "circle" },
          { id: "c", label: "C", tag: "in-degree 1", x: 3, y: 2, shape: "circle", emphasis: "new" },
          { id: "d", label: "D", tag: "in-degree 1", x: 1, y: 4, shape: "circle" },
          { id: "e", label: "E", tag: "in-degree 1", x: 5, y: 4, shape: "circle" },
          { id: "f", label: "F", tag: "in-degree 2", x: 3, y: 6, shape: "circle" },
        ],
        arrows: [
          { from: "b", to: "c" }, { from: "c", to: "d" }, { from: "c", to: "e" },
          { from: "d", to: "f" }, { from: "e", to: "f" },
        ],
      },
      caption: "A is emitted first and its outgoing edge is removed, dropping C's in-degree from 2 to 1. C still isn't ready yet.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", tag: "emitted", x: 1, y: 0, shape: "circle", emphasis: "dim" },
          { id: "b", label: "B", tag: "emitted", x: 5, y: 0, shape: "circle", emphasis: "dim" },
          { id: "c", label: "C", tag: "in-degree 0", x: 3, y: 2, shape: "circle", emphasis: "new" },
          { id: "d", label: "D", tag: "in-degree 1", x: 1, y: 4, shape: "circle" },
          { id: "e", label: "E", tag: "in-degree 1", x: 5, y: 4, shape: "circle" },
          { id: "f", label: "F", tag: "in-degree 2", x: 3, y: 6, shape: "circle" },
        ],
        arrows: [{ from: "c", to: "d" }, { from: "c", to: "e" }, { from: "d", to: "f" }, { from: "e", to: "f" }],
      },
      caption: "B is emitted too, removing its edge to C. Now that BOTH A and B are done, C's in-degree hits 0: C is finally ready.",
    },
    {
      state: {
        nodes: [
          { id: "c", label: "C", tag: "emitted", x: 3, y: 2, shape: "circle", emphasis: "dim" },
          { id: "d", label: "D", tag: "in-degree 0", x: 1, y: 4, shape: "circle", emphasis: "new" },
          { id: "e", label: "E", tag: "in-degree 0", x: 5, y: 4, shape: "circle", emphasis: "new" },
          { id: "f", label: "F", tag: "in-degree 2", x: 3, y: 6, shape: "circle" },
        ],
        arrows: [{ from: "d", to: "f" }, { from: "e", to: "f" }],
      },
      caption: "C is emitted, freeing up both D and E at once: their in-degree drops to 0.",
    },
    {
      state: {
        nodes: [
          { id: "d", label: "D", tag: "emitted", x: 1, y: 4, shape: "circle", emphasis: "dim" },
          { id: "e", label: "E", tag: "in-degree 0", x: 5, y: 4, shape: "circle" },
          { id: "f", label: "F", tag: "in-degree 1", x: 3, y: 6, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "e", to: "f" }],
      },
      caption: "D is emitted, dropping F's in-degree from 2 to 1. F still needs E to finish first.",
    },
    {
      state: {
        nodes: [
          { id: "e", label: "E", tag: "emitted", x: 5, y: 4, shape: "circle", emphasis: "dim" },
          { id: "f", label: "F", tag: "in-degree 0", x: 3, y: 6, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "E is emitted, and F's in-degree finally hits 0.",
    },
    {
      state: {
        nodes: [
          { id: "order", label: "[A, B, C, D, E, F]", tag: "topological order", x: 3, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "F is emitted last, completing the order. Every node appears only after everything that points to it has already been emitted.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "b", label: "1" }, { from: "b", to: "c", label: "4" },
          { from: "a", to: "c", label: "3" }, { from: "c", to: "d", label: "2" }, { from: "b", to: "d", label: "5" },
        ],
      },
      caption: "New graph, new goal: connect all 4 nodes as cheaply as possible, with a minimum spanning tree (MST).",
    },
    {
      state: {
        nodes: [
          { id: "sorted", label: "A-B:1, C-D:2, A-C:3, B-C:4, B-D:5", tag: "edges, cheapest first", x: 3, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Kruskal's approach: sort every edge by weight, cheapest first, then consider them one at a time in that order.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [{ from: "a", to: "b", label: "1", emphasis: "active" }],
      },
      caption: "A-B (weight 1), the cheapest edge, doesn't create a cycle, so it's added to the MST.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [{ from: "a", to: "b", label: "1" }, { from: "c", to: "d", label: "2", emphasis: "active" }],
      },
      caption: "Next cheapest, C-D (weight 2), also doesn't create a cycle: it connects a different, still-separate pair, so it's added too.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [{ from: "a", to: "b", label: "1" }, { from: "c", to: "d", label: "2" }, { from: "a", to: "c", label: "3", emphasis: "active" }],
      },
      caption: "A-C (weight 3) connects the {A,B} group to the {C,D} group without closing a cycle. All 4 nodes are now spanned with exactly 3 edges: one less than the node count.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "A", x: 1, y: 1, shape: "circle" },
          { id: "b", label: "B", x: 3, y: 0, shape: "circle" },
          { id: "c", label: "C", x: 5, y: 1, shape: "circle" },
          { id: "d", label: "D", x: 3, y: 3, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "b", label: "1" }, { from: "c", to: "d", label: "2" }, { from: "a", to: "c", label: "3" },
          { from: "b", to: "c", label: "4" }, { from: "b", to: "d", label: "5" },
        ],
      },
      caption: "The remaining edges, B-C and B-D, are skipped: the tree is already complete, and adding either would only close a cycle.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "Kruskal's algorithm is building an MST and has already added A-B (1) and C-D (2). The sorted edges left are A-C (3), B-C (4), B-D (5). Which edge does it take next?",
      steps: [
        {
          state: {
            nodes: [
              { id: "remaining", label: "A-C:3, B-C:4, B-D:5", tag: "remaining, sorted", x: 3, y: 2, shape: "box", emphasis: "new" },
            ],
            arrows: [],
          },
          caption: "Three edges remain, already sorted cheapest first.",
        },
      ],
      options: [
        { id: "a", label: "A-C (3), the cheapest remaining edge, since it doesn't close a cycle" },
        { id: "b", label: "B-D (5), to make sure D gets an extra connection" },
        { id: "c", label: "Whichever edge touches the most nodes already in the tree" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Kruskal never picks based on giving a node 'extra' connections, and it never jumps ahead in the sorted order. It always considers the next cheapest edge first; here that's A-C at weight 3.",
        c: "Kruskal's choice depends only on weight, cheapest first, and whether an edge would create a cycle. Touching the most already-included nodes isn't part of the rule at all.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "edge", label: "A-C", tag: "weight 3, added", x: 3, y: 1, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "A-C (3) is next: cheapest remaining, and it connects two separate groups without forming a cycle, so it's added.",
      },
      reviewStep: 11,
    },
    {
      kind: "fillin",
      prompt: "Fill in the condition for a node to be added to the topological order right now.",
      code: "def ready_to_emit(node_in_degree):\n    return node_in_degree {{cmp}} 0",
      blanks: [
        {
          id: "cmp",
          placeholder: "___",
          answer: "==",
          explainWrong:
            "A node is ready to emit only once ALL of its incoming edges have been removed, meaning its in-degree has reached exactly 0, not just dropped below some other threshold. The condition is node_in_degree == 0.",
        },
      ],
      tests: [
        { name: "in-degree 0 is ready", code: "assert ready_to_emit(0) == True, \"ready_to_emit(0) should be True: no incoming edges left\"" },
        { name: "in-degree 1 is not ready", code: "assert ready_to_emit(1) == False, \"ready_to_emit(1) should be False: still has an incoming edge that hasn't been removed\"" },
      ],
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-graphs.topo-mst.1",
      prompt: "In topological sort, which nodes are eligible to be emitted first?",
      options: [
        "Nodes with an in-degree of 0: no incoming edges at all",
        "Nodes with the most outgoing edges",
        "Whichever node was added to the graph first",
      ],
      correctIndex: 0,
      explainWrong:
        "Outgoing edge count and insertion order don't determine eligibility. Only nodes with in-degree 0, meaning nothing else needs to come before them, are eligible to be emitted at any given point.",
    },
    {
      id: "dsa-graphs.topo-mst.2",
      prompt: "Kruskal's algorithm considers edges from cheapest to most expensive. When does it skip an edge instead of adding it?",
      options: [
        "When adding that edge would create a cycle among already-connected nodes",
        "When the edge's two endpoints have the same label",
        "It never skips edges; it adds every single one",
      ],
      correctIndex: 0,
      explainWrong:
        "Label matching isn't a real rule, and Kruskal absolutely does skip some edges; an MST for N nodes uses exactly N-1 edges, not all of them. It skips any edge that would close a cycle among nodes already connected through previously added edges.",
    },
    {
      id: "dsa-graphs.topo-mst.3",
      prompt: "For a graph with N nodes, how many edges does a minimum spanning tree contain?",
      options: [
        "Exactly N - 1",
        "Exactly N",
        "As many as possible without exceeding the total edge count",
      ],
      correctIndex: 0,
      explainWrong:
        "A tree spanning N nodes always has exactly N - 1 edges: enough to connect everything, with no cycles and nothing extra. N edges would necessarily include a cycle, and 'as many as possible' isn't the goal at all, minimality is.",
    },
  ],
};

export const chDsaGraphs: Chapter = {
  id: "dsa-graphs",
  phase: 2,
  title: "Graphs",
  units: [graphBasicsUnit, representationsUnit, bfsUnit, dfsUnit, shortestPathUnit, topoMstUnit],
};
