import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: stack — push stacks boxes upward (lower y is closer to the top),
// pop always takes the top box, LIFO order.
// ---------------------------------------------------------------------------

const stackUnit: Unit = {
  id: "stack",
  title: "Stacks: Last In, First Out",
  watch: [
    {
      state: { nodes: [], arrows: [] },
      caption: "The stack starts empty: no boxes yet.",
    },
    {
      state: {
        nodes: [{ id: "s0", label: "10", tag: "top", x: 2, y: 4, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`push(10)` adds the first box at the bottom of the stack; being the only one, it's also the top.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "10", x: 2, y: 4, shape: "box" },
          { id: "s1", label: "20", tag: "top", x: 2, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`push(20)` stacks a new box above the first; the top tag moves to whichever box was pushed most recently.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "10", x: 2, y: 4, shape: "box" },
          { id: "s1", label: "20", x: 2, y: 3, shape: "box" },
          { id: "s2", label: "30", tag: "top", x: 2, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`push(30)` adds another box on top; boxes stack upward, so a lower `y` means closer to the top.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "10", x: 2, y: 4, shape: "box" },
          { id: "s1", label: "20", x: 2, y: 3, shape: "box" },
          { id: "s2", label: "30", tag: "top", x: 2, y: 2, shape: "box", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "`peek()` looks at the top box (`30`) without removing it: the stack is unchanged.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "10", x: 2, y: 4, shape: "box" },
          { id: "s1", label: "20", x: 2, y: 3, shape: "box" },
          { id: "s2", label: "30", tag: "top", x: 2, y: 2, shape: "box", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "`pop()` removes the top box, `30`, taking it off the stack.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "10", x: 2, y: 4, shape: "box" },
          { id: "s1", label: "20", tag: "top", x: 2, y: 3, shape: "box", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "After the pop, `20` becomes the new top: LIFO means the most recently pushed box is always removed first.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "push(1); push(2); push(3); pop(). What does pop() return?",
      steps: [
        {
          state: {
            nodes: [
              { id: "s0", label: "1", x: 2, y: 4, shape: "box" },
              { id: "s1", label: "2", x: 2, y: 3, shape: "box" },
              { id: "s2", label: "3", tag: "top", x: 2, y: 2, shape: "box" },
            ],
            arrows: [],
          },
          caption: "Three values have been pushed in order: `1`, then `2`, then `3`.",
        },
      ],
      options: [
        { id: "a", label: "1" },
        { id: "b", label: "2" },
        { id: "c", label: "3" },
      ],
      correctId: "c",
      explainWrong: {
        a: "1 was pushed first, so it's at the bottom, not the top; LIFO removes the most recent push first.",
        b: "2 is buried under 3; pop always takes the very last item pushed, which is 3.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "s0", label: "1", x: 2, y: 4, shape: "box" },
            { id: "s1", label: "2", tag: "top", x: 2, y: 3, shape: "box", emphasis: "active" },
          ],
          arrows: [],
        },
        caption: "`pop()` removed `3`, and `2` is now the top of the stack.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blanks to peek at the top of a Python-list-based stack without removing it, then pop it.",
      code: ["stack = [10, 20, 30]", "top_value = stack[{{peek_index}}]", "popped = stack.{{pop_method}}()"].join("\n"),
      blanks: [
        {
          id: "peek_index",
          placeholder: "___",
          answer: "-1",
          explainWrong: "The top of a list-based stack is the last element, at index -1, not the first.",
        },
        {
          id: "pop_method",
          placeholder: "___",
          answer: "pop",
          explainWrong: "Removing the top element of a list stack uses the pop() method, which defaults to removing the last item.",
        },
      ],
      tests: [
        {
          name: "top_value is read before popping",
          code: "assert top_value == 30, \"top_value should be 30: the top of a list stack is its last element\"",
        },
        {
          name: "popped removes the top",
          code:
            "assert popped == 30, \"popped should be 30: pop() removes and returns the last element\"\nassert stack == [10, 20], \"stack should be [10, 20] after popping its top element\"",
        },
      ],
      reviewStep: 5,
    },
    {
      kind: "write",
      prompt:
        "Given a stack represented as a Python list where the end of the list is the top, implement `is_empty(stack)`, returning whether the stack has no items, and `peek(stack)`, returning the top item without removing it, or `None` if the stack is empty.",
      difficulty: "Easy",
      examples: [
        { input: "`is_empty([])`", output: "`True`" },
        { input: "`peek([1, 2, 3])`", output: "`3`", explanation: "The top of a list-based stack is its last element." },
        { input: "`peek([])`", output: "`None`", explanation: "There is no top item to look at on an empty stack." },
      ],
      constraints: ["`0 <= len(stack) <= 10^4`", "the end of the list is the top of the stack"],
      bigO: { fn: "peek", answer: "O(1)", explain: "Checking length and reading the last element of `stack` are both constant-time." },
      starter: [
        "def is_empty(stack):",
        "    pass",
        "",
        "def peek(stack):",
        "    # return the top item without removing it, or None if empty",
        "    pass",
      ].join("\n"),
      solution: [
        "def is_empty(stack):",
        "    return len(stack) == 0",
        "",
        "def peek(stack):",
        "    if is_empty(stack):",
        "        return None",
        "    return stack[-1]",
      ].join("\n"),
      tests: [
        {
          name: "empty stack detected",
          code:
            "assert is_empty([]) == True, \"is_empty([]) should be True: an empty list has nothing on it\"\nassert is_empty([1]) == False, \"is_empty([1]) should be False: this stack has one item\"",
        },
        {
          name: "peek reads the top",
          code: "assert peek([1, 2, 3]) == 3, \"peek([1, 2, 3]) should be 3: the top of a list stack is its last element\"",
        },
        {
          name: "peek on empty stack is None",
          code: "assert peek([]) is None, \"peek([]) should be None: there is no top item to look at\"",
        },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-stacks-queues.stack.1",
      prompt: "What does LIFO stand for, and what does it mean for a stack?",
      options: [
        "Last In, First Out: the most recently pushed item is removed first",
        "Last In, Forgotten Out: pushed items eventually get discarded",
        "Least Important, First Out: smaller values pop first",
      ],
      correctIndex: 0,
      explainWrong: "A stack has nothing to do with importance or discarding values over time. LIFO means the last item pushed is always the first one popped.",
    },
    {
      id: "dsa-stacks-queues.stack.2",
      prompt: "What is the difference between peek() and pop() on a stack?",
      options: [
        "There is no difference, both remove the top item",
        "peek() only looks at the top item; pop() removes and returns it",
        "peek() removes the bottom item; pop() removes the top",
      ],
      correctIndex: 1,
      explainWrong: "They are not interchangeable, and neither one touches the bottom of the stack. peek() reads the top without changing the stack, while pop() actually removes that top item.",
    },
    {
      id: "dsa-stacks-queues.stack.3",
      prompt: "In a Python list used as a stack, which end represents the top?",
      options: [
        "Index 0, the front of the list",
        "The last index, the end of the list",
        "Whichever end was used most recently",
      ],
      correctIndex: 1,
      explainWrong: "The top isn't the front, and it isn't a moving target; by convention, a list-based stack always treats its last index as the top, since append() and pop() both work there in O(1) time.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: queue — enqueue joins at the back, dequeue leaves from the front,
// FIFO order.
// ---------------------------------------------------------------------------

const queueUnit: Unit = {
  id: "queue",
  title: "Queues: First In, First Out",
  watch: [
    {
      state: { nodes: [], arrows: [] },
      caption: "The queue starts empty: nothing waiting in line yet.",
    },
    {
      state: {
        nodes: [{ id: "q0", label: "10", tag: "front & back", x: 1, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`enqueue(10)` adds the first item; being the only one, it's both the front and the back.",
    },
    {
      state: {
        nodes: [
          { id: "q0", label: "10", tag: "front", x: 1, y: 1, shape: "box" },
          { id: "q1", label: "20", tag: "back", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "q0", to: "q1", emphasis: "active" }],
      },
      caption: "`enqueue(20)` joins at the back; the front tag stays with the oldest item, `10`.",
    },
    {
      state: {
        nodes: [
          { id: "q0", label: "10", tag: "front", x: 1, y: 1, shape: "box" },
          { id: "q1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "q2", label: "30", tag: "back", x: 5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "q0", to: "q1" },
          { from: "q1", to: "q2", emphasis: "active" },
        ],
      },
      caption: "`enqueue(30)` always joins at the back, keeping the queue in arrival order: `10, 20, 30`.",
    },
    {
      state: {
        nodes: [
          { id: "q0", label: "10", tag: "front", x: 1, y: 1, shape: "box", emphasis: "active" },
          { id: "q1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "q2", label: "30", tag: "back", x: 5, y: 1, shape: "box" },
        ],
        arrows: [
          { from: "q0", to: "q1" },
          { from: "q1", to: "q2" },
        ],
      },
      caption: "`dequeue()` removes from the front: the oldest item, `10`, is next to leave.",
    },
    {
      state: {
        nodes: [
          { id: "q0", label: "10", tag: "front", x: 1, y: 1, shape: "box", emphasis: "dim" },
          { id: "q1", label: "20", x: 3, y: 1, shape: "box" },
          { id: "q2", label: "30", tag: "back", x: 5, y: 1, shape: "box" },
        ],
        arrows: [{ from: "q1", to: "q2" }],
      },
      caption: "`10` leaves the queue: FIFO means the first item enqueued is the first one dequeued.",
    },
    {
      state: {
        nodes: [
          { id: "q1", label: "20", tag: "front", x: 1, y: 1, shape: "box", emphasis: "active" },
          { id: "q2", label: "30", tag: "back", x: 3, y: 1, shape: "box" },
        ],
        arrows: [{ from: "q1", to: "q2" }],
      },
      caption: "After the dequeue, `20` becomes the new front while `30` remains the back.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "enqueue(1); enqueue(2); enqueue(3); dequeue(). What does dequeue() return?",
      steps: [
        {
          state: {
            nodes: [
              { id: "q0", label: "1", tag: "front", x: 1, y: 1, shape: "box" },
              { id: "q1", label: "2", x: 3, y: 1, shape: "box" },
              { id: "q2", label: "3", tag: "back", x: 5, y: 1, shape: "box" },
            ],
            arrows: [
              { from: "q0", to: "q1" },
              { from: "q1", to: "q2" },
            ],
          },
          caption: "Three values were enqueued in order: `1`, then `2`, then `3`.",
        },
      ],
      options: [
        { id: "a", label: "1" },
        { id: "b", label: "2" },
        { id: "c", label: "3" },
      ],
      correctId: "a",
      explainWrong: {
        b: "2 is in the middle of the queue; dequeue always removes from the front, not the middle.",
        c: "3 just joined at the back; the most recent arrival leaves last in FIFO order, not first.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "q1", label: "2", tag: "front", x: 1, y: 1, shape: "box", emphasis: "active" },
            { id: "q2", label: "3", tag: "back", x: 3, y: 1, shape: "box" },
          ],
          arrows: [{ from: "q1", to: "q2" }],
        },
        caption: "`dequeue()` removed `1`, the first item enqueued, and `2` is now the front.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blanks for a queue built from a plain Python list: enqueue adds to the back, dequeue removes from the front.",
      code: [
        "queue = []",
        "queue.{{enqueue_method}}(10)",
        "queue.{{enqueue_method}}(20)",
        "first_out = queue.pop({{dequeue_index}})",
      ].join("\n"),
      blanks: [
        {
          id: "enqueue_method",
          placeholder: "___",
          answer: "append",
          explainWrong: "Adding to the back of a list means using append, which adds to the end.",
        },
        {
          id: "dequeue_index",
          placeholder: "___",
          answer: "0",
          explainWrong: "The front of the queue is the first element, at index 0; popping index 0 removes the oldest item, not the most recent.",
        },
      ],
      tests: [
        {
          name: "first_out is the oldest item",
          code: "assert first_out == 10, \"first_out should be 10: dequeue removes the item that arrived first\"",
        },
        {
          name: "remaining queue has the newer item",
          code: "assert queue == [20], \"queue should be [20]: only the item enqueued later remains\"",
        },
      ],
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt:
        "Given a queue represented as a Python list where index `0` is the front and the end of the list is the back, implement `enqueue(queue, item)`, adding `item` to the back, and `dequeue(queue)`, removing and returning the front item.",
      difficulty: "Easy",
      examples: [
        { input: "`enqueue([1, 2], 3)`", output: "`[1, 2, 3]`" },
        { input: "`dequeue([1, 2, 3])`", output: "`1`, leaving `[2, 3]`", explanation: "dequeue removes and returns the item at index `0`." },
      ],
      constraints: ["`0 <= len(queue) <= 10^4`", "index `0` is always the front of the queue"],
      bigO: { fn: "dequeue", answer: "O(n)", explain: "Removing index `0` with `pop(0)` must shift every remaining element down by one." },
      starter: [
        "def enqueue(queue, item):",
        "    pass",
        "",
        "def dequeue(queue):",
        "    # remove and return the front item",
        "    pass",
      ].join("\n"),
      solution: [
        "def enqueue(queue, item):",
        "    queue.append(item)",
        "",
        "def dequeue(queue):",
        "    return queue.pop(0)",
      ].join("\n"),
      tests: [
        {
          name: "enqueue adds to the back",
          code:
            "q = [1, 2]\nenqueue(q, 3)\nassert q == [1, 2, 3], \"queue should be [1, 2, 3]: enqueue must add new items at the back\"",
        },
        {
          name: "dequeue removes from the front",
          code:
            "q2 = [1, 2, 3]\nout = dequeue(q2)\nassert out == 1, \"dequeue should return 1: it must remove the item at the front\"\nassert q2 == [2, 3], \"queue should be [2, 3] after removing the front item\"",
        },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "dsa-stacks-queues.queue.1",
      prompt: "What does FIFO stand for, and what does it mean for a queue?",
      options: [
        "First In, First Out: the item enqueued earliest is dequeued first",
        "First In, Forgotten Out: old items eventually expire",
        "Fast In, Fast Out: queues process items faster than stacks",
      ],
      correctIndex: 0,
      explainWrong: "Speed and expiration aren't what FIFO describes. FIFO means whichever item was enqueued first is always the first one dequeued.",
    },
    {
      id: "dsa-stacks-queues.queue.2",
      prompt: "Where does enqueue add a new item, and where does dequeue remove from?",
      options: [
        "enqueue adds to the front, dequeue removes from the back",
        "enqueue adds to the back, dequeue removes from the front",
        "Both operate on the same end",
      ],
      correctIndex: 1,
      explainWrong: "Queues use two different ends on purpose, and it's not front-for-enqueue: new items always join at the back, while removal always happens at the front, which is what keeps FIFO order.",
    },
    {
      id: "dsa-stacks-queues.queue.3",
      prompt: "Why is a plain Python list a poor choice for a high-performance queue?",
      options: [
        "Lists cannot store more than a few items",
        "Removing from the front with pop(0) has to shift every remaining item, making it O(n)",
        "Lists cannot be used as queues at all",
      ],
      correctIndex: 1,
      explainWrong: "Lists can hold any number of items and can be used as queues; the real issue is efficiency. Removing the front element with pop(0) forces every other element to shift down by one, which costs O(n) time.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: deque-and-python — both ends support insertion and removal; Python
// lists work as stacks with append/pop, but deque.popleft() is the efficient
// way to remove from the front.
// ---------------------------------------------------------------------------

const dequeAndPythonUnit: Unit = {
  id: "deque-and-python",
  title: "Deques and Python's Built-ins",
  watch: [
    {
      state: { nodes: [], arrows: [] },
      caption: "A deque starts empty and, unlike a stack or queue, supports insertion and removal at both ends.",
    },
    {
      state: {
        nodes: [{ id: "d0", label: "5", tag: "front", x: 2, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`appendleft(5)` adds to the front of a deque; a deque supports insertion at both ends.",
    },
    {
      state: {
        nodes: [
          { id: "d0", label: "5", tag: "front", x: 2, y: 1, shape: "box" },
          { id: "d1", label: "10", tag: "back", x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "d0", to: "d1", emphasis: "active" }],
      },
      caption: "`append(10)` adds to the back, the same as a normal queue's enqueue.",
    },
    {
      state: {
        nodes: [
          { id: "d0", label: "5", tag: "front", x: 2, y: 1, shape: "box" },
          { id: "d1", label: "10", tag: "back", x: 4, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [{ from: "d0", to: "d1" }],
      },
      caption: "`pop()` removes from the back of a deque, just like a stack's pop.",
    },
    {
      state: {
        nodes: [{ id: "d0", label: "5", tag: "front & back", x: 2, y: 1, shape: "box", emphasis: "active" }],
        arrows: [],
      },
      caption: "With only one item left, `5` is now both the front and back of the deque.",
    },
    {
      state: {
        nodes: [
          { id: "e0", label: "1", tag: "front", x: 0, y: 3, shape: "box", emphasis: "active" },
          { id: "e1", label: "2", x: 2, y: 3, shape: "box" },
          { id: "e2", label: "3", tag: "back", x: 4, y: 3, shape: "box" },
        ],
        arrows: [
          { from: "e0", to: "e1" },
          { from: "e1", to: "e2" },
        ],
      },
      caption: "Python's `deque.popleft()` removes from the front in `O(1)` time, unlike a plain list's `pop(0)`, which is slow.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "Using a plain Python list as a stack, which two operations give O(1) push and pop?",
      steps: [
        {
          state: {
            nodes: [
              { id: "s0", label: "1", x: 2, y: 4, shape: "box" },
              { id: "s1", label: "2", tag: "top", x: 2, y: 3, shape: "box" },
            ],
            arrows: [],
          },
          caption: "A list-based stack treats its last element as the top.",
        },
      ],
      options: [
        { id: "a", label: "insert(0, x) and pop(0)" },
        { id: "b", label: "append(x) and pop()" },
        { id: "c", label: "append(x) and pop(0)" },
      ],
      correctId: "b",
      explainWrong: {
        a: "insert(0, x) and pop(0) both operate on the front of a list, which requires shifting every other element; that's O(n), not O(1).",
        c: "append(x) is O(1), but pop(0) still has to shift the whole list left by one, making it O(n).",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "s0", label: "1", x: 2, y: 4, shape: "box" },
            { id: "s1", label: "2", tag: "top", x: 2, y: 3, shape: "box", emphasis: "active" },
          ],
          arrows: [],
        },
        caption: "`append(x)` and `pop()` both work at the end of the list, which never requires shifting other elements.",
      },
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blank to remove efficiently from the front of a collections.deque.",
      code: ["from collections import deque", "d = deque([1, 2, 3])", "first = d.{{method}}()"].join("\n"),
      blanks: [
        {
          id: "method",
          placeholder: "___",
          answer: "popleft",
          explainWrong: "Removing from the front efficiently is exactly what popleft() is for; pop() alone removes from the back.",
        },
      ],
      tests: [
        {
          name: "first is the front item",
          code: "assert first == 1, \"first should be 1: popleft() removes the item at the front\"",
        },
        {
          name: "remaining deque is in order",
          code: "assert list(d) == [2, 3], \"the deque should now contain [2, 3]\"",
        },
      ],
      reviewStep: 5,
    },
    {
      kind: "write",
      prompt:
        "Given a list of characters `chars`, return `True` if it reads the same forwards and backwards, and `False` otherwise. Use a `collections.deque` to repeatedly compare and remove characters from both ends.",
      difficulty: "Medium",
      examples: [
        { input: "`chars = list('racecar')`", output: "`True`" },
        { input: "`chars = list('hello')`", output: "`False`" },
      ],
      constraints: ["`0 <= len(chars) <= 10^4`"],
      bigO: { answer: "O(n)", explain: "Each character is compared and removed from an end of the `deque` exactly once." },
      starter: [
        "from collections import deque",
        "",
        "def is_palindrome(chars):",
        "    d = deque(chars)",
        "    # compare and remove from both ends until proven false or done",
        "    pass",
      ].join("\n"),
      solution: [
        "from collections import deque",
        "",
        "def is_palindrome(chars):",
        "    d = deque(chars)",
        "    while len(d) > 1:",
        "        if d.popleft() != d.pop():",
        "            return False",
        "    return True",
      ].join("\n"),
      tests: [
        {
          name: "a palindrome list returns True",
          code: "assert is_palindrome(list('racecar')) == True, \"'racecar' should be a palindrome\"",
        },
        {
          name: "a non-palindrome list returns False",
          code: "assert is_palindrome(list('hello')) == False, \"'hello' should not be a palindrome\"",
        },
      ],
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-stacks-queues.deque-and-python.1",
      prompt: "What makes a deque different from a stack or a queue?",
      options: [
        "A deque can only be used with numbers",
        "A deque supports efficient insertion and removal at both the front and the back",
        "A deque is just another name for a Python list",
      ],
      correctIndex: 1,
      explainWrong: "Deques work with any data type and are not simply another name for a list; a plain list is inefficient at the front. A deque's defining feature is O(1) operations at both ends.",
    },
    {
      id: "dsa-stacks-queues.deque-and-python.2",
      prompt: "Why is deque.popleft() preferred over list.pop(0) for removing from the front?",
      options: [
        "They perform identically, it's just a style preference",
        "popleft() is O(1), while pop(0) on a list is O(n) because every remaining element must shift",
        "popleft() only works on strings",
      ],
      correctIndex: 1,
      explainWrong: "The two are not equivalent in performance, and popleft() works on any deque, not just strings. A deque is built so front operations don't require shifting the rest of the elements, unlike a list.",
    },
    {
      id: "dsa-stacks-queues.deque-and-python.3",
      prompt: "Which Python list method is commonly used to implement a stack's push operation?",
      options: [
        "insert(0, x)",
        "append(x)",
        "extend(x)",
      ],
      correctIndex: 1,
      explainWrong: "insert(0, x) pushes onto the front, which is the wrong end and is slow; extend() is for adding multiple items, not a single push. append(x) adds one item to the end, matching how a list-based stack's top is defined.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-stack — checking balanced brackets with a list as a stack.
// ---------------------------------------------------------------------------

const applyStackUnit: Unit = {
  id: "apply-stack",
  title: "Apply: Balanced Parentheses",
  watch: [
    {
      state: {
        nodes: [
          { id: "s0", label: "(", x: 2, y: 3, shape: "box" },
          { id: "s1", label: "[", tag: "top", x: 2, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Scanning `( [ ] )`, each opening bracket gets pushed onto the stack.",
    },
    {
      state: { nodes: [], arrows: [] },
      caption: "Every closing bracket matched the top of the stack in reverse order, so the stack ends empty: balanced.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given a string `s`, return `True` if every `(`, `[`, `{` is closed by the matching `)`, `]`, `}` in the correct order, and `False` otherwise. Use a Python list as a stack.",
      difficulty: "Medium",
      examples: [
        { input: "`s = \"([])\"`", output: "`True`", explanation: "Each bracket closes its most recent match." },
        {
          input: "`s = \"([)]\"`",
          output: "`False`",
          explanation: "`]` closes before `[` does, so `)` closes the wrong bracket out of order.",
        },
        { input: "`s = \"(()\"`", output: "`False`", explanation: "One `(` is left unclosed." },
      ],
      constraints: ["`0 <= len(s) <= 10^4`", "`s` consists only of the characters `(`, `)`, `[`, `]`, `{`, `}`"],
      bigO: { answer: "O(n)", explain: "One pass over `s`, with an O(1) push or pop on the stack for each character." },
      starter: [
        "def is_balanced(s):",
        "    pairs = {')': '(', ']': '[', '}': '{'}",
        "    stack = []",
        "    for ch in s:",
        "        if ch in '([{':",
        "            # push an opening bracket",
        "            pass",
        "        elif ch in ')]}':",
        "            # pop and check it matches, or fail",
        "            pass",
        "    # after the loop, the stack must be empty for a balanced string",
        "    pass",
      ].join("\n"),
      solution: [
        "def is_balanced(s):",
        "    pairs = {')': '(', ']': '[', '}': '{'}",
        "    stack = []",
        "    for ch in s:",
        "        if ch in '([{':",
        "            stack.append(ch)",
        "        elif ch in ')]}':",
        "            if not stack or stack.pop() != pairs[ch]:",
        "                return False",
        "    return len(stack) == 0",
      ].join("\n"),
      tests: [
        {
          name: "simple balanced string",
          code:
            "assert is_balanced('([])') == True, \"is_balanced('([])') should be True: each bracket closes its most recent match\"",
        },
        {
          name: "mismatched close returns False",
          code:
            "assert is_balanced('([)]') == False, \"is_balanced('([)]') should be False: ] closes before [ does, so ) closes the wrong bracket out of order\"",
        },
        {
          name: "unclosed bracket returns False",
          code:
            "assert is_balanced('(()') == False, \"is_balanced('(()') should be False: one ( is left on the stack with nothing to close it\"",
        },
        {
          name: "empty string is trivially balanced",
          code:
            "assert is_balanced('') == True, \"is_balanced('') should be True: an empty string has no unmatched brackets\"",
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-stacks-queues.apply-stack.1",
      prompt: "Why does '([)]' fail the balanced check even though it has matching numbers of each bracket type?",
      options: [
        "Matching counts are all that matters, so it should actually pass",
        "The brackets close out of order: ) tries to close the stack's top, [, instead of the ( it should match",
        "Only () brackets are checked, not [] or {}",
      ],
      correctIndex: 1,
      explainWrong: "Balance isn't just about counts, and all three bracket types are checked. The order matters: when ) appears, the top of the stack is [, not (, so the check fails.",
    },
    {
      id: "dsa-stacks-queues.apply-stack.2",
      prompt: "What must be true about the stack after scanning a balanced string?",
      options: [
        "It must contain exactly one item",
        "It must be empty",
        "It must contain every opening bracket that appeared",
      ],
      correctIndex: 1,
      explainWrong: "A leftover opening bracket, whether one or many, means something was never closed. A balanced string closes everything it opens, so the stack must end completely empty.",
    },
  ],
};

export const chDsaStacksQueues: Chapter = {
  id: "dsa-stacks-queues",
  phase: 2,
  title: "Stacks and Queues",
  units: [stackUnit, queueUnit, dequeAndPythonUnit, applyStackUnit],
};
