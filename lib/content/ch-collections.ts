import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: list-ops — append/insert/remove/pop, and the shifting of items
// that insert and remove/pop cause along the index row.
// ---------------------------------------------------------------------------

const listOpsUnit: Unit = {
  id: "list-ops",
  title: "Append, Insert, Remove, Pop",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "0", x: 0, y: 2, shape: "circle", emphasis: "new" },
          { id: "n1", label: "20", tag: "1", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "n2", label: "30", tag: "2", x: 2, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "n0", to: "n1" }, { from: "n1", to: "n2" }],
      },
      caption: "nums = [10, 20, 30]: three items sitting at indices 0, 1, 2.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "0", x: 0, y: 2, shape: "circle" },
          { id: "n1", label: "20", tag: "1", x: 1, y: 2, shape: "circle" },
          { id: "n2", label: "30", tag: "2", x: 2, y: 2, shape: "circle" },
          { id: "n3", label: "40", tag: "3", x: 3, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "n0", to: "n1" }, { from: "n1", to: "n2" }, { from: "n2", to: "n3" }],
      },
      caption: "nums.append(40) drops 40 onto the end. Nothing else moves; append is the cheap operation.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "0", x: 0, y: 2, shape: "circle" },
          { id: "n15", label: "15", tag: "1", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "n1", label: "20", tag: "2 (was 1)", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "n2", label: "30", tag: "3 (was 2)", x: 3, y: 2, shape: "circle", emphasis: "active" },
          { id: "n3", label: "40", tag: "4 (was 3)", x: 4, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [{ from: "n0", to: "n15" }, { from: "n15", to: "n1" }, { from: "n1", to: "n2" }, { from: "n2", to: "n3" }],
      },
      caption: "nums.insert(1, 15) pushes 20, 30, and 40 each one slot to the right to make room for the new 15 at index 1.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "0", x: 0, y: 2, shape: "circle" },
          { id: "n1", label: "20", tag: "1 (was 2)", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "n2", label: "30", tag: "2 (was 3)", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "n3", label: "40", tag: "3 (was 4)", x: 3, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [{ from: "n0", to: "n1" }, { from: "n1", to: "n2" }, { from: "n2", to: "n3" }],
      },
      caption: "nums.remove(15) deletes the first 15 it finds by value, then shifts everything after it one slot left to close the gap.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "0", x: 0, y: 2, shape: "circle" },
          { id: "n1", label: "20", tag: "1", x: 1, y: 2, shape: "circle" },
          { id: "n2", label: "30", tag: "2", x: 2, y: 2, shape: "circle" },
          { id: "popped", label: "40", tag: "popped()", x: 5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "nums.pop() with no index removes AND returns the last item, 40. It comes back out as a usable value.",
    },
    {
      state: {
        nodes: [
          { id: "n1", label: "20", tag: "0 (was 1)", x: 0, y: 2, shape: "circle", emphasis: "active" },
          { id: "n2", label: "30", tag: "1 (was 2)", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "popped0", label: "10", tag: "popped(0)", x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "n1", to: "n2" }],
      },
      caption: "nums.pop(0) removes and returns the item at index 0, 10 this time, and everything after it shifts left to close the gap.",
    },
    {
      state: {
        nodes: [
          { id: "n1", label: "20", tag: "0", x: 0, y: 2, shape: "circle" },
          { id: "n2", label: "30", tag: "1", x: 1, y: 2, shape: "circle" },
        ],
        arrows: [{ from: "n1", to: "n2" }],
      },
      caption: "After all that, nums is just [20, 30], re-indexed 0 and 1. Every removal and insertion keeps the index row contiguous.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "nums = [1, 2, 3]\nnums.insert(0, 0)\nnums.pop()\nprint(nums)\nWhat prints?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "0", tag: "0", x: 0, y: 2, shape: "circle", emphasis: "new" },
              { id: "b", label: "1", tag: "1", x: 1, y: 2, shape: "circle", emphasis: "active" },
              { id: "c", label: "2", tag: "2", x: 2, y: 2, shape: "circle", emphasis: "active" },
              { id: "d", label: "3", tag: "3", x: 3, y: 2, shape: "circle", emphasis: "active" },
            ],
            arrows: [{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "d" }],
          },
          caption: "insert(0, 0) shifts 1, 2, 3 right, giving [0, 1, 2, 3].",
        },
      ],
      options: [
        { id: "a", label: "[0, 1, 2]" },
        { id: "b", label: "[0, 1, 2, 3]" },
        { id: "c", label: "[1, 2, 3]" },
        { id: "d", label: "[0, 2, 3]" },
      ],
      correctId: "a",
      explainWrong: {
        b: "pop() with no argument removes the LAST item. After insert(0, 0) gives [0, 1, 2, 3], pop() removes the 3 at the end, not nothing.",
        c: "This ignores that insert(0, 0) added a 0 at the front first. That 0 is still there after pop() removes the last item.",
        d: "pop() with no index removes the last item, 3, not one from the middle. There's no reason index 1 would vanish here.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "0", tag: "0", x: 0, y: 2, shape: "circle" },
            { id: "b", label: "1", tag: "1", x: 1, y: 2, shape: "circle" },
            { id: "c", label: "2", tag: "2", x: 2, y: 2, shape: "circle" },
          ],
          arrows: [{ from: "a", to: "b" }, { from: "b", to: "c" }],
        },
        caption: "insert(0, 0) makes [0, 1, 2, 3]; pop() then removes the last item, 3, leaving [0, 1, 2].",
      },
      reviewStep: 2,
    },
    {
      kind: "fillin",
      prompt: "Fill in the method that removes AND returns the last item of a list.",
      code: ["nums = [5, 6, 7]", "last = nums.{{method}}()"].join("\n"),
      blanks: [
        {
          id: "method",
          placeholder: "___",
          answer: "pop",
          explainWrong:
            "remove() deletes by value and returns nothing; append() adds instead of removing. pop() with no argument is the one that both removes and returns the last item.",
        },
      ],
      tests: [
        { name: "last is 7", code: 'assert last == 7, "last should be 7: pop() with no argument removes and returns the final item"' },
        { name: "nums shrank", code: 'assert nums == [5, 6], "nums should be [5, 6]: pop() also removes the item it returns"' },
      ],
      reviewStep: 4,
    },
    {
      kind: "write",
      prompt: "Write rotate_left(items) that removes the first element and appends it to the end, then returns the same list (mutated in place).",
      starter: "def rotate_left(items):\n    # your code here\n    pass\n",
      tests: [
        { name: "[1, 2, 3] rotates to [2, 3, 1]", code: 'result = rotate_left([1, 2, 3])\nassert result == [2, 3, 1], "rotate_left([1, 2, 3]) should be [2, 3, 1]: pop(0) removes the first item, append puts it at the end"' },
        { name: "single item list stays the same", code: 'assert rotate_left([9]) == [9], "rotate_left([9]) should be [9]: moving the only item to the end changes nothing"' },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "py-collections.list-ops.1",
      prompt: "What's the difference between append(x) and insert(0, x)?",
      options: [
        "append adds x to the end without shifting anything; insert(0, x) adds x to the front and shifts every existing item right",
        "They do the same thing",
        "append shifts items and insert doesn't",
      ],
      correctIndex: 0,
      explainWrong: "append() only ever adds to the end, so nothing needs to move. insert(0, x) puts x at the very front, which means every existing item has to shift one slot to the right to make room.",
    },
    {
      id: "py-collections.list-ops.2",
      prompt: "remove(15) and pop() both delete an item. What's the key difference?",
      options: [
        "remove() deletes by value and returns nothing useful; pop() deletes by index (default last) and returns the removed item",
        "They're interchangeable",
        "remove() only works on the first item in the list",
      ],
      correctIndex: 0,
      explainWrong: "remove(value) searches for a matching value and deletes the first one it finds, giving back None. pop(index) instead deletes by position, defaulting to the last item, and hands that removed value back to you.",
    },
    {
      id: "py-collections.list-ops.3",
      prompt: "After nums.pop(0) removes the first item, what happens to the indices of the remaining items?",
      options: [
        "They all shift down by one to fill the gap; there's no leftover empty slot",
        "They stay the same, leaving index 0 empty",
        "The list becomes unusable until re-indexed manually",
      ],
      correctIndex: 0,
      explainWrong: "Python lists never have gaps. Removing an item from the middle or front automatically shifts every later item's index down by one to keep the list contiguous.",
    },
    {
      id: "py-collections.list-ops.4",
      prompt: "Why is inserting at the front of a large list slower than appending to the end?",
      options: [
        "Inserting at the front has to shift every other item one slot over; appending just adds a slot at the end",
        "There's no difference in cost",
        "Appending secretly copies the whole list every time",
      ],
      correctIndex: 0,
      explainWrong: "The cost comes from shifting: inserting anywhere except the end forces every later item to move over by one, which takes longer the more items there are. Appending needs no shifting at all.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: slicing-nesting — slice windows over a list, and lists that
// contain other lists, reached via a chain of arrows.
// ---------------------------------------------------------------------------

const slicingNestingUnit: Unit = {
  id: "slicing-nesting",
  title: "Slices and Lists Inside Lists",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "0", x: 0, y: 2, shape: "circle", emphasis: "new" },
          { id: "n1", label: "20", tag: "1", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "n2", label: "30", tag: "2", x: 2, y: 2, shape: "circle", emphasis: "new" },
          { id: "n3", label: "40", tag: "3", x: 3, y: 2, shape: "circle", emphasis: "new" },
          { id: "n4", label: "50", tag: "4", x: 4, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "n0", to: "n1" }, { from: "n1", to: "n2" }, { from: "n2", to: "n3" }, { from: "n3", to: "n4" }],
      },
      caption: "nums = [10, 20, 30, 40, 50], five items at indices 0 through 4.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "20", tag: "start", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "n2", label: "30", tag: "stop, excluded", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "n3", label: "40", x: 3, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n4", label: "50", x: 4, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "nums[1:3] opens a window over indices 1 and 2 only, giving [20, 30]. Index 3 is the stop and is excluded.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", tag: "start", x: 0, y: 2, shape: "circle", emphasis: "active" },
          { id: "n1", label: "20", tag: "stop, excluded", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "n2", label: "30", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n3", label: "40", x: 3, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n4", label: "50", x: 4, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "nums[:2] defaults the start to 0, giving [10, 20]: indices 0 and 1.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "10", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n1", label: "20", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n2", label: "30", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "n3", label: "40", tag: "-2", x: 3, y: 2, shape: "circle", emphasis: "active" },
          { id: "n4", label: "50", tag: "-1", x: 4, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "nums[-2:] counts from the end: starting two back from the last item and running to the end gives [40, 50].",
    },
    {
      state: {
        nodes: [
          { id: "outer0", label: "row 0", tag: "matrix[0]", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "outer1", label: "row 1", tag: "matrix[1]", x: 4, y: 1, shape: "box", emphasis: "new" },
          { id: "inner0", label: "[1, 2]", tag: "a separate list", x: 1, y: 3, shape: "frame", emphasis: "new" },
          { id: "inner1", label: "[3, 4]", tag: "a separate list", x: 4, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "outer0", to: "inner0", emphasis: "active" }, { from: "outer1", to: "inner1", emphasis: "active" }],
      },
      caption: "matrix = [[1, 2], [3, 4]] is a list whose elements are themselves lists. Each outer slot holds an arrow to its own separate inner list object.",
    },
    {
      state: {
        nodes: [
          { id: "outer0", label: "row 0", tag: "matrix[0]", x: 1, y: 1, shape: "box", emphasis: "active" },
          { id: "outer1", label: "row 1", tag: "matrix[1]", x: 4, y: 1, shape: "box", emphasis: "dim" },
          { id: "inner0", label: "[1, 2]", x: 1, y: 3, shape: "frame", emphasis: "active" },
          { id: "v", label: "2", tag: "matrix[0][1]", x: 2, y: 4, shape: "circle", emphasis: "new" },
          { id: "inner1", label: "[3, 4]", x: 4, y: 3, shape: "frame", emphasis: "dim" },
        ],
        arrows: [{ from: "outer0", to: "inner0", emphasis: "active" }, { from: "inner0", to: "v", emphasis: "active" }],
      },
      caption: "Reaching a nested value takes two indices: matrix[0] follows the arrow to the inner list [1, 2], then [1] picks out 2 within it.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "matrix = [[1, 2, 3], [4, 5, 6]]\nresult = matrix[1][0]\nWhat is result?",
      steps: [
        {
          state: {
            nodes: [
              { id: "row0", label: "row 0", tag: "[1, 2, 3]", x: 1, y: 1, shape: "box" },
              { id: "row1", label: "row 1", tag: "[4, 5, 6]", x: 4, y: 1, shape: "box", emphasis: "active" },
            ],
            arrows: [],
          },
          caption: "matrix[1] follows the arrow to the second inner list, [4, 5, 6].",
        },
      ],
      options: [
        { id: "a", label: "4" },
        { id: "b", label: "1" },
        { id: "c", label: "5" },
        { id: "d", label: "It raises an error" },
      ],
      correctId: "a",
      explainWrong: {
        b: "matrix[1] first picks the SECOND inner list, [4, 5, 6], not the first one. The 1 you're picturing belongs to the first inner list, which isn't the one selected here.",
        c: "matrix[1][0] takes index 0 of the second inner list, which is 4, not index 1, which would be 5.",
        d: "Both indices are valid: matrix has 2 rows (index 1 is fine), and that row has 3 elements (index 0 is fine too). Nothing here is out of range.",
      },
      revealStep: {
        state: { nodes: [{ id: "result", label: "4", tag: "matrix[1][0]", x: 3, y: 2, shape: "box", emphasis: "new" }], arrows: [] },
        caption: "matrix[1] is [4, 5, 6]; taking [0] of that gives 4.",
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "nums = [1, 2, 3, 4, 5]. Fill in the slice bounds so result is [2, 3, 4].",
      code: ["nums = [1, 2, 3, 4, 5]", "result = nums[{{a}}:{{b}}]"].join("\n"),
      blanks: [
        {
          id: "a",
          placeholder: "start",
          answer: "1",
          explainWrong: "The value 2 sits at index 1, not index 0 or 2. Starting anywhere else would shift the whole window off by one.",
        },
        {
          id: "b",
          placeholder: "stop",
          answer: "4",
          explainWrong: "The stop index is excluded, so to include index 3 (value 4) as the last element, the stop must be one past it: 4, not 3.",
        },
      ],
      tests: [
        { name: "result is [2, 3, 4]", code: 'assert result == [2, 3, 4], "result should be [2, 3, 4]: nums[1:4] covers indices 1, 2, 3"' },
      ],
      reviewStep: 1,
    },
    {
      kind: "write",
      prompt: "Write get_diagonal(matrix) that returns [matrix[0][0], matrix[1][1]] for a 2x2 matrix.",
      starter: "def get_diagonal(matrix):\n    # your code here\n    pass\n",
      tests: [
        { name: "diagonal of [[1, 2], [3, 4]] is [1, 4]", code: 'assert get_diagonal([[1, 2], [3, 4]]) == [1, 4], "get_diagonal([[1, 2], [3, 4]]) should be [1, 4]: matrix[0][0] is 1, matrix[1][1] is 4"' },
        { name: "diagonal of [[5, 6], [7, 8]] is [5, 8]", code: 'assert get_diagonal([[5, 6], [7, 8]]) == [5, 8], "get_diagonal([[5, 6], [7, 8]]) should be [5, 8]"' },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "py-collections.slicing-nesting.1",
      prompt: "nums = [10, 20, 30, 40]. What does nums[1:3] include?",
      options: ["Indices 1 and 2, giving [20, 30]", "Indices 1, 2, and 3", "Index 3 only"],
      correctIndex: 0,
      explainWrong: "A slice's stop bound is always excluded. nums[1:3] covers indices 1 and 2, stopping before index 3, giving exactly two elements.",
    },
    {
      id: "py-collections.slicing-nesting.2",
      prompt: "matrix = [[1, 2], [3, 4]]. What is matrix[0]?",
      options: [
        "The inner list [1, 2], not a single number",
        "The number 1",
        "An error, since matrix only has 2 rows",
      ],
      correctIndex: 0,
      explainWrong: "One index into a nested list gives back a whole inner list, not a number. matrix[0] is [1, 2] itself; you'd need a second index, like matrix[0][0], to reach the number 1.",
    },
    {
      id: "py-collections.slicing-nesting.3",
      prompt: "Why does reaching a value inside a nested list, like matrix[0][1], need two indices instead of one?",
      options: [
        "Because the outer index selects an inner list, and that inner list needs its own index to pick a value within it",
        "Because nested lists are actually stored as strings",
        "It doesn't; matrix[1] alone would also work",
      ],
      correctIndex: 0,
      explainWrong: "Each level of nesting needs its own index: the outer index picks which inner list to follow the arrow to, and only then does a second index pick a specific value inside that inner list.",
    },
    {
      id: "py-collections.slicing-nesting.4",
      prompt: "nums = [1, 2, 3, 4, 5]. What does nums[-2:] give?",
      options: [
        "[4, 5], the last two elements",
        "[1, 2], the first two elements",
        "An error, since negative numbers can't start a slice",
      ],
      correctIndex: 0,
      explainWrong: "Negative slice bounds work fine and count from the end. nums[-2:] starts two elements back from the end and runs to the end, giving the last two elements: [4, 5].",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: comprehensions — a loop pointer feeds a new list one item at a
// time; a filter clause skips items that don't pass.
// ---------------------------------------------------------------------------

const comprehensionsUnit: Unit = {
  id: "comprehensions",
  title: "Comprehensions Build Lists One Item at a Time",
  watch: [
    {
      state: {
        nodes: [
          { id: "n0", label: "1", tag: "pointer", x: 0, y: 1, shape: "circle", emphasis: "active" },
          { id: "n1", label: "2", x: 1, y: 1, shape: "circle" },
          { id: "n2", label: "3", x: 2, y: 1, shape: "circle" },
          { id: "n3", label: "4", x: 3, y: 1, shape: "circle" },
          { id: "n4", label: "5", x: 4, y: 1, shape: "circle" },
          { id: "s0", label: "1", tag: "squares[0]", x: 0, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "n0", to: "s0", emphasis: "active" }],
      },
      caption: "squares = [n * n for n in nums]: the pointer starts at n = 1, computes 1 * 1, and appends 1 into the new squares list.",
    },
    {
      state: {
        nodes: [
          { id: "n1", label: "2", tag: "pointer", x: 1, y: 1, shape: "circle", emphasis: "active" },
          { id: "n2", label: "3", x: 2, y: 1, shape: "circle" },
          { id: "n3", label: "4", x: 3, y: 1, shape: "circle" },
          { id: "n4", label: "5", x: 4, y: 1, shape: "circle" },
          { id: "s0", label: "1", x: 0, y: 3, shape: "circle", emphasis: "dim" },
          { id: "s1", label: "4", tag: "squares[1]", x: 1, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "n1", to: "s1", emphasis: "active" }],
      },
      caption: "The pointer moves to n = 2, computes 2 * 2, and appends 4 as the next element of squares.",
    },
    {
      state: {
        nodes: [
          { id: "s0", label: "1", x: 0, y: 3, shape: "circle" },
          { id: "s1", label: "4", x: 1, y: 3, shape: "circle" },
          { id: "s2", label: "9", x: 2, y: 3, shape: "circle", emphasis: "new" },
          { id: "s3", label: "16", x: 3, y: 3, shape: "circle", emphasis: "new" },
          { id: "s4", label: "25", x: 4, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "s0", to: "s1" }, { from: "s1", to: "s2" }, { from: "s2", to: "s3" }, { from: "s3", to: "s4" }],
      },
      caption: "The pointer keeps advancing through the rest of nums. squares ends up [1, 4, 9, 16, 25], a brand new list; nums itself is never touched.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "1", tag: "pointer", x: 0, y: 1, shape: "circle", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: "evens = [n for n in nums if n % 2 == 0]: the pointer checks n = 1 against the condition. 1 % 2 == 0 is False, so this item is SKIPPED, not appended.",
    },
    {
      state: {
        nodes: [
          { id: "n1", label: "2", tag: "pointer", x: 1, y: 1, shape: "circle", emphasis: "active" },
          { id: "e0", label: "2", tag: "evens[0]", x: 1, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "n1", to: "e0", emphasis: "active" }],
      },
      caption: "n = 2 passes the condition (2 % 2 == 0 is True), so it gets appended into evens. Only items that pass the if clause make it in.",
    },
    {
      state: {
        nodes: [
          { id: "e0", label: "2", x: 1, y: 3, shape: "circle" },
          { id: "e1", label: "4", x: 2, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "e0", to: "e1" }],
      },
      caption: "After checking every item, evens ends up [2, 4]: exactly the elements of nums that passed the filter, in their original order.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "nums = [1, 2, 3, 4]\nresult = [n for n in nums if n > 2]\nWhat is result?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "1", x: 0, y: 1, shape: "circle", emphasis: "error" },
              { id: "b", label: "2", x: 1, y: 1, shape: "circle", emphasis: "error" },
              { id: "c", label: "3", x: 2, y: 1, shape: "circle", emphasis: "active" },
              { id: "d", label: "4", x: 3, y: 1, shape: "circle", emphasis: "active" },
            ],
            arrows: [],
          },
          caption: "1 and 2 fail n > 2 and are skipped; 3 and 4 pass and get appended.",
        },
      ],
      options: [
        { id: "a", label: "[3, 4]" },
        { id: "b", label: "[1, 2]" },
        { id: "c", label: "[1, 2, 3, 4]" },
        { id: "d", label: "It raises an error" },
      ],
      correctId: "a",
      explainWrong: {
        b: "This keeps the items that FAIL the condition. The if clause keeps items where n > 2 is True, which is 3 and 4, not 1 and 2.",
        c: "The if clause filters items out; it doesn't just tag along for show. Items failing n > 2 are skipped entirely, so all four values can't end up in result.",
        d: "There's nothing invalid here: a list comprehension with an if clause is completely valid syntax and runs without error.",
      },
      revealStep: {
        state: { nodes: [{ id: "result", label: "[3, 4]", tag: "result", x: 2, y: 2, shape: "box", emphasis: "new" }], arrows: [] },
        caption: "Only 3 and 4 satisfy n > 2, so result is [3, 4].",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "nums = [1, 2, 3, 4]. Fill in the operator so doubled becomes [2, 4, 6, 8].",
      code: ["nums = [1, 2, 3, 4]", "doubled = [n {{op}} 2 for n in nums]"].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "*",
          explainWrong:
            "To double each n, the expression needs multiplication: n * 2. Addition (n + 2) or any other operator would produce different values, not a doubling.",
        },
      ],
      tests: [
        { name: "doubled is [2, 4, 6, 8]", code: 'assert doubled == [2, 4, 6, 8], "doubled should be [2, 4, 6, 8]: each n multiplied by 2"' },
      ],
      reviewStep: 0,
    },
    {
      kind: "write",
      prompt: "Write squares_of_evens(nums) that returns a list of the squares of only the even numbers in nums, using a single list comprehension.",
      starter: "def squares_of_evens(nums):\n    # your code here\n    pass\n",
      tests: [
        { name: "[1, 2, 3, 4] gives [4, 16]", code: 'assert squares_of_evens([1, 2, 3, 4]) == [4, 16], "squares_of_evens([1, 2, 3, 4]) should be [4, 16]: only 2 and 4 are even, squared to 4 and 16"' },
        { name: "no evens gives empty list", code: 'assert squares_of_evens([1, 3, 5]) == [], "squares_of_evens([1, 3, 5]) should be []: none of these are even"' },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "py-collections.comprehensions.1",
      prompt: "squares = [n * n for n in nums]. What happens to nums after this line runs?",
      options: [
        "nums is completely unchanged; squares is a brand new list",
        "nums is replaced by the squared values",
        "nums and squares become the same list object",
      ],
      correctIndex: 0,
      explainWrong: "A list comprehension only reads from nums; it never writes back into it. squares is built as an entirely separate, new list object.",
    },
    {
      id: "py-collections.comprehensions.2",
      prompt: "In [n for n in nums if n % 2 == 0], what does the if clause do?",
      options: [
        "Skips any n where the condition is False; only passing items get appended",
        "Stops the whole comprehension early the first time the condition is False",
        "Replaces failing items with 0 instead of skipping them",
      ],
      correctIndex: 0,
      explainWrong: "The if clause is a per-item filter, not an early exit and not a substitution. Every item in nums is still checked; only the ones where the condition is True get appended to the result.",
    },
    {
      id: "py-collections.comprehensions.3",
      prompt: "Does [n * 2 for n in nums] preserve the original order of nums?",
      options: [
        "Yes, items are processed and appended in the same order they appear in nums",
        "No, the result is always sorted",
        "No, the order is randomized each time",
      ],
      correctIndex: 0,
      explainWrong: "A comprehension's pointer walks nums from front to back, appending each transformed value as it goes. There's no sorting or randomization involved; the output order matches the input order.",
    },
    {
      id: "py-collections.comprehensions.4",
      prompt: "Why use a list comprehension instead of a plain for loop with .append() in a loop body?",
      options: [
        "It's more concise for the common pattern of building a new list from an existing one",
        "It runs a fundamentally different algorithm under the hood",
        "It's the only way to filter items while building a list",
      ],
      correctIndex: 0,
      explainWrong: "Under the hood, a comprehension does the same loop-and-append work a manual for loop would; it's just a more compact way to write that exact pattern. A plain loop with an if check can filter items too, just with more lines.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: dictionaries — key to value arrows; add, overwrite, delete; and
// iterating over keys.
// ---------------------------------------------------------------------------

const dictionariesUnit: Unit = {
  id: "dictionaries",
  title: "Dictionaries: Keys Point at Values",
  watch: [
    {
      state: {
        nodes: [
          { id: "ka", label: "\"a\"", tag: "key", x: 0, y: 1, shape: "box", emphasis: "new" },
          { id: "va", label: "1", tag: "value", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "kb", label: "\"b\"", tag: "key", x: 0, y: 3, shape: "box", emphasis: "new" },
          { id: "vb", label: "2", tag: "value", x: 2, y: 3, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "ka", to: "va", emphasis: "active" }, { from: "kb", to: "vb", emphasis: "active" }],
      },
      caption: 'd = {"a": 1, "b": 2}: each key has its own arrow pointing at its value. Keys are never repeated; each one points at exactly one value.',
    },
    {
      state: {
        nodes: [
          { id: "ka", label: "\"a\"", x: 0, y: 1, shape: "box" },
          { id: "va", label: "1", x: 2, y: 1, shape: "circle" },
          { id: "kb", label: "\"b\"", x: 0, y: 3, shape: "box" },
          { id: "vb", label: "2", x: 2, y: 3, shape: "circle" },
          { id: "kc", label: "\"c\"", tag: "new key", x: 0, y: 4, shape: "box", emphasis: "new" },
          { id: "vc", label: "3", x: 2, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "ka", to: "va" }, { from: "kb", to: "vb" }, { from: "kc", to: "vc", emphasis: "active" }],
      },
      caption: 'd["c"] = 3 adds a brand new key-value pair. The existing "a" and "b" pairs are completely untouched.',
    },
    {
      state: {
        nodes: [
          { id: "ka", label: "\"a\"", x: 0, y: 1, shape: "box", emphasis: "active" },
          { id: "va", label: "99", tag: "overwritten", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "kb", label: "\"b\"", x: 0, y: 3, shape: "box", emphasis: "dim" },
          { id: "vb", label: "2", x: 2, y: 3, shape: "circle", emphasis: "dim" },
        ],
        arrows: [{ from: "ka", to: "va", emphasis: "active" }, { from: "kb", to: "vb" }],
      },
      caption: 'd["a"] = 99 overwrites the value at the EXISTING key "a", changing 1 to 99. No new pair is created, and "b" is unaffected.',
    },
    {
      state: {
        nodes: [
          { id: "ka", label: "\"a\"", x: 0, y: 1, shape: "box" },
          { id: "va", label: "99", x: 2, y: 1, shape: "circle" },
        ],
        arrows: [{ from: "ka", to: "va" }],
      },
      caption: 'del d["b"] removes the key and its value entirely: the pair is gone, not just emptied.',
    },
    {
      state: {
        nodes: [
          { id: "ka", label: "\"a\"", x: 0, y: 1, shape: "box" },
          { id: "va", label: "99", x: 2, y: 1, shape: "circle" },
          { id: "none", label: "None", tag: 'd.get("z")', x: 4, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'd.get("z") looks for a key that isn\'t there and returns None (or a given default) instead of crashing.',
    },
    {
      state: {
        nodes: [
          { id: "ka", label: "\"a\"", x: 0, y: 1, shape: "box" },
          { id: "va", label: "99", x: 2, y: 1, shape: "circle" },
          { id: "err", label: "KeyError", tag: 'd["z"]', x: 4, y: 3, shape: "box", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: 'd["z"] with square brackets on a missing key raises a KeyError instead. get() and [] handle a missing key very differently.',
    },
    {
      state: {
        nodes: [
          { id: "ka", label: "\"a\"", tag: "1st", x: 0, y: 1, shape: "box", emphasis: "active" },
          { id: "kc", label: "\"c\"", tag: "2nd", x: 0, y: 4, shape: "box", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: "for key in d: walks over the dict's keys in the order they were originally added, not in any sorted order.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: 'd = {"a": 1, "b": 2}\nd["a"] = 100\nprint(len(d))\nWhat prints?',
      steps: [
        {
          state: {
            nodes: [
              { id: "ka", label: '"a"', x: 0, y: 1, shape: "box", emphasis: "active" },
              { id: "va", label: "100", tag: "overwritten", x: 2, y: 1, shape: "circle", emphasis: "new" },
              { id: "kb", label: '"b"', x: 0, y: 3, shape: "box", emphasis: "dim" },
              { id: "vb", label: "2", x: 2, y: 3, shape: "circle", emphasis: "dim" },
            ],
            arrows: [{ from: "ka", to: "va" }, { from: "kb", to: "vb" }],
          },
          caption: 'd["a"] = 100 overwrites the existing "a" pair; "b" is untouched.',
        },
      ],
      options: [
        { id: "a", label: "1" },
        { id: "b", label: "2" },
        { id: "c", label: "3" },
        { id: "d", label: "It raises an error" },
      ],
      correctId: "b",
      explainWrong: {
        a: 'Assigning to an existing key overwrites its value; it doesn\'t remove any pair. d still has both "a" and "b", so len(d) is 2, not 1.',
        c: 'd only has two keys, "a" and "b". Overwriting the value at "a" doesn\'t create a third key, so len(d) can\'t be 3.',
        d: "Overwriting the value at an existing key is completely normal and never raises an error.",
      },
      revealStep: {
        state: { nodes: [{ id: "len", label: "2", tag: "len(d)", x: 3, y: 2, shape: "box", emphasis: "new" }], arrows: [] },
        caption: 'd still has exactly two keys, "a" and "b", so len(d) is 2.',
      },
      reviewStep: 2,
    },
    {
      kind: "fillin",
      prompt: 'd has no key "z". Fill in the method that safely returns None for a missing key instead of raising an error.',
      code: ['d = {"a": 1, "b": 2}', 'result = d.{{method}}("z")'].join("\n"),
      blanks: [
        {
          id: "method",
          placeholder: "___",
          answer: "get",
          explainWrong:
            'd["z"] with square brackets raises a KeyError for a missing key. get("z") is the method that looks the key up safely and returns None (or a default) instead of crashing.',
        },
      ],
      tests: [
        { name: "result is None", code: 'assert result is None, "result should be None: get() returns None for a missing key instead of raising KeyError"' },
      ],
      reviewStep: 4,
    },
    {
      kind: "write",
      prompt: 'Write safe_lookup(d, key) that returns d[key] if it exists, or the string "not found" otherwise, using a single dict method call.',
      starter: "def safe_lookup(d, key):\n    # your code here\n    pass\n",
      tests: [
        { name: "existing key returns its value", code: 'assert safe_lookup({"a": 1}, "a") == 1, "safe_lookup({\\"a\\": 1}, \\"a\\") should be 1: the key exists"' },
        { name: "missing key returns the fallback", code: 'assert safe_lookup({"a": 1}, "z") == "not found", "safe_lookup({\\"a\\": 1}, \\"z\\") should be \\"not found\\": \\"z\\" is not a key in the dict"' },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "py-collections.dictionaries.1",
      prompt: 'd["b"] = 5 is run when "b" is already a key in d. What happens?',
      options: [
        "The value at the existing key \"b\" is overwritten; no new pair is created",
        "A second \"b\" key is added alongside the first",
        "It raises an error because \"b\" already exists",
      ],
      correctIndex: 0,
      explainWrong: "Dict keys are always unique. Assigning to a key that already exists just replaces its value in place; it never creates a duplicate key or raises an error.",
    },
    {
      id: "py-collections.dictionaries.2",
      prompt: 'del d["b"] is called. What happens to the key "b" afterward?',
      options: [
        "The key and its value are both removed entirely; \"b\" is no longer in d at all",
        "The key stays but its value becomes None",
        "Only the value is removed, leaving the key pointing at nothing",
      ],
      correctIndex: 0,
      explainWrong: "del removes the whole key-value pair, not just the value. After del d[\"b\"], the key \"b\" is gone; checking \"b\" in d would be False, and d[\"b\"] would raise a KeyError.",
    },
    {
      id: "py-collections.dictionaries.3",
      prompt: 'd.get("z") and d["z"] both look up a missing key "z". How do they differ?',
      options: [
        "get() returns None (or a given default) for a missing key; [] raises a KeyError",
        "They behave identically",
        "get() raises an error while [] returns None",
      ],
      correctIndex: 0,
      explainWrong: "The two behave oppositely for a missing key: square-bracket access raises a KeyError, while get() is designed to fail safely, returning None or an explicit default instead of crashing.",
    },
    {
      id: "py-collections.dictionaries.4",
      prompt: "When you write for key in d:, in what order are the keys visited?",
      options: [
        "In the order they were originally inserted into the dict",
        "In alphabetical order, always",
        "In a random order each time the loop runs",
      ],
      correctIndex: 0,
      explainWrong: "Modern Python dicts remember insertion order. Iterating gives keys back in the order they were first added, not sorted and not randomized.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 5: apply-collections — count words in a sentence using split + dict.
// ---------------------------------------------------------------------------

const applyCollectionsUnit: Unit = {
  id: "apply-collections",
  title: "Apply: Count Words in a Sentence",
  watch: [
    {
      state: {
        nodes: [{ id: "s", label: '"the cat and the dog"', tag: "sentence", x: 3, y: 2, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: 'sentence = "the cat and the dog" is one string, with "the" appearing twice.',
    },
    {
      state: {
        nodes: [
          { id: "kthe", label: '"the"', tag: "key", x: 0, y: 1, shape: "box", emphasis: "new" },
          { id: "vthe", label: "2", tag: "count", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "kcat", label: '"cat"', tag: "key", x: 0, y: 2, shape: "box", emphasis: "new" },
          { id: "vcat", label: "1", tag: "count", x: 2, y: 2, shape: "circle", emphasis: "new" },
          { id: "kand", label: '"and"', tag: "key", x: 0, y: 3, shape: "box", emphasis: "new" },
          { id: "vand", label: "1", tag: "count", x: 2, y: 3, shape: "circle", emphasis: "new" },
          { id: "kdog", label: '"dog"', tag: "key", x: 0, y: 4, shape: "box", emphasis: "new" },
          { id: "vdog", label: "1", tag: "count", x: 2, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "kthe", to: "vthe", emphasis: "active" },
          { from: "kcat", to: "vcat" },
          { from: "kand", to: "vand" },
          { from: "kdog", to: "vdog" },
        ],
      },
      caption: 'sentence.split(" ") gives each word; for every word, its running count in a dict goes up by one. "the" appears twice, so it ends at 2.',
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt: "Write word_count(sentence) that returns a dict mapping each word in sentence to how many times it appears, using split() and a dict.",
      starter:
        'def _viz(d):\n    keys = list(d.keys())\n    nodes = []\n    arrows = []\n    for i, k in enumerate(keys):\n        nodes.append({"id": f"k{i}", "label": str(k), "x": 0, "y": i, "shape": "box", "tag": "key"})\n        nodes.append({"id": f"v{i}", "label": str(d[k]), "x": 2, "y": i, "shape": "circle", "tag": "count"})\n        arrows.append({"from": f"k{i}", "to": f"v{i}"})\n    return {"nodes": nodes, "arrows": arrows}\n\ndef word_count(sentence):\n    # split the sentence into words, then tally each word in a dict\n    pass\n',
      tests: [
        {
          name: 'counts repeats correctly',
          code: 'assert word_count("the cat and the dog") == {"the": 2, "cat": 1, "and": 1, "dog": 1}, "word_count(\\"the cat and the dog\\") should count \\"the\\" twice and each other word once"',
        },
        {
          name: "all same word",
          code: 'assert word_count("a a a") == {"a": 3}, "word_count(\\"a a a\\") should be {\\"a\\": 3}: one key, tallied three times"',
        },
        {
          name: "single word",
          code: 'assert word_count("hello") == {"hello": 1}, "word_count(\\"hello\\") should be {\\"hello\\": 1}: one word, one count"',
        },
      ],
      vizExpr: 'word_count("the cat and the dog")',
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-collections.apply-collections.1",
      prompt: 'Building word_count, you use counts[word] = counts.get(word, 0) + 1 for each word. Why get(word, 0) instead of counts[word]?',
      options: [
        "So a word seen for the first time defaults to 0 instead of raising a KeyError",
        "get() is required syntax for all dict updates",
        "It makes the dict sort itself alphabetically",
      ],
      correctIndex: 0,
      explainWrong: "counts[word] would raise a KeyError the first time a brand-new word is seen, since it isn't a key yet. get(word, 0) sidesteps that by returning a safe default of 0 for words not yet counted.",
    },
    {
      id: "py-collections.apply-collections.2",
      prompt: '"the cat and the dog".split(" ") — how many times does "the" appear in the resulting list?',
      options: ["Twice, once for each occurrence in the sentence", "Once, since split() removes duplicates", "Zero, since split() only keeps unique words"],
      correctIndex: 0,
      explainWrong: "split() has no idea what a duplicate is; it just breaks the string apart at each separator. Every occurrence of a word, including repeats, ends up as its own list element.",
    },
  ],
};

export const chCollections: Chapter = {
  id: "py-collections",
  phase: 1,
  title: "Lists, Dictionaries, and Friends",
  units: [listOpsUnit, slicingNestingUnit, comprehensionsUnit, dictionariesUnit, applyCollectionsUnit],
};
