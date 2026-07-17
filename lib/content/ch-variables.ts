import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: boxes — variables are labels on boxes that hold values.
// ---------------------------------------------------------------------------

const boxesUnit: Unit = {
  id: "boxes",
  title: "Variables Are Labels",
  watch: [
    {
      state: { nodes: [], arrows: [] },
      caption: "We start with an empty workspace. No variables exist yet.",
    },
    {
      state: {
        nodes: [{ id: "age", label: "12", tag: "age", x: 1, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`age = 12` creates a box holding `12`, labeled `age`.",
    },
    {
      state: {
        nodes: [
          { id: "age", label: "12", tag: "age", x: 1, y: 1, shape: "box" },
          { id: "name", label: '"Sam"', tag: "name", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`name = \"Sam\"` creates a second, separate box next to the first.",
    },
    {
      state: {
        nodes: [
          { id: "age", label: "12", tag: "age", x: 1, y: 1, shape: "box", emphasis: "active" },
          { id: "name", label: '"Sam"', tag: "name", x: 3, y: 1, shape: "box" },
        ],
        arrows: [],
      },
      caption: "`age = age + 1` first reads what's inside the `age` box.",
    },
    {
      state: {
        nodes: [
          { id: "age", label: "13", tag: "age", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "name", label: '"Sam"', tag: "name", x: 3, y: 1, shape: "box" },
        ],
        arrows: [],
      },
      caption: "The box now holds `13`. Same box, new contents, old value gone.",
    },
    {
      state: {
        nodes: [
          { id: "age", label: "13", tag: "age", x: 1, y: 1, shape: "box" },
          { id: "name", label: '"Sam"', tag: "name", x: 3, y: 1, shape: "box" },
          { id: "buddy_age", label: "13", tag: "buddy_age", x: 5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`buddy_age = age` copies the value `13` into a brand new box.",
    },
    {
      state: {
        nodes: [
          { id: "age", label: "20", tag: "age", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "name", label: '"Sam"', tag: "name", x: 3, y: 1, shape: "box" },
          { id: "buddy_age", label: "13", tag: "buddy_age", x: 5, y: 1, shape: "box" },
        ],
        arrows: [],
      },
      caption: "Changing `age` to `20` does not touch `buddy_age`. They are separate boxes.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "`score = 5` then `score = score * 2`. What does `score` hold after both lines run?",
      steps: [
        {
          state: {
            nodes: [{ id: "score", label: "5", tag: "score", x: 2, y: 1, shape: "box", emphasis: "new" }],
            arrows: [],
          },
          caption: "`score = 5` puts `5` in a box labeled `score`.",
        },
      ],
      options: [
        { id: "a", label: "`5`" },
        { id: "b", label: "`10`" },
        { id: "c", label: "`score * 2`" },
      ],
      correctId: "b",
      explainWrong: {
        a: "That's the value before the second line runs. `score = score * 2` replaces the old contents.",
        c: "That's the expression, not the result. Python computes `score * 2` to a number first, then stores it.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "score", label: "10", tag: "score", x: 2, y: 1, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "`score` now holds `10`: the box's old value was read, doubled, then written back in.",
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "Swap the values of `a` and `b` using a temporary variable.",
      code: [
        "a = 1",
        "b = 2",
        "{{temp}} = a",
        "a = {{fromb}}",
        "b = {{fromtemp}}",
      ].join("\n"),
      blanks: [
        {
          id: "temp",
          placeholder: "___",
          answer: "temp",
          explainWrong: "Use the name `temp` here so the saved value has somewhere to live before `a` gets overwritten.",
        },
        {
          id: "fromb",
          placeholder: "___",
          answer: "b",
          explainWrong: "`a` should now get `b`'s value. Writing `a` here just keeps `a` unchanged.",
        },
        {
          id: "fromtemp",
          placeholder: "___",
          answer: "temp",
          explainWrong: "`b` should get `a`'s original value, which you saved in `temp`. Writing `b` here loses it.",
        },
      ],
      tests: [
        {
          name: "a and b swapped",
          code: "assert a == 2 and b == 1, \"a should be 2 and b should be 1: the temp variable should hold a's original value while a and b trade places\"",
        },
      ],
      reviewStep: 5,
    },
    {
      kind: "write",
      prompt:
        "A recipe needs `3` eggs, `2` cups of flour, and bakes at `350` degrees. Create three variables, `eggs`, `flour`, and `oven_temp`, holding those numbers.",
      difficulty: "Easy",
      examples: [
        {
          input: "`eggs = 3, flour = 2, oven_temp = 350`",
          output: "`eggs == 3, flour == 2, oven_temp == 350`",
          explanation: "Each variable simply holds the matching number from the recipe.",
        },
      ],
      constraints: ["`eggs`, `flour`, and `oven_temp` must be numbers, not strings"],
      bigO: { answer: "O(1)", explain: "Creating three fixed variables does a constant amount of work, no matter what." },
      solution: "eggs = 3\nflour = 2\noven_temp = 350\n",
      starter: "# create eggs, flour, and oven_temp below\n",
      tests: [
        { name: "eggs is 3", code: "assert eggs == 3, \"eggs should be 3: re-check the recipe amount\"" },
        { name: "flour is 2", code: "assert flour == 2, \"flour should be 2: re-check the recipe amount\"" },
        {
          name: "oven_temp is 350",
          code: "assert oven_temp == 350, \"oven_temp should be 350: re-check the recipe amount\"",
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-variables.boxes.1",
      prompt: "What happens when you write `x = 5` and then `x = 6`?",
      options: [
        "A second box named `x` is created holding `6`",
        "The same box now holds `6` instead of `5`",
        "Python keeps both `5` and `6` inside `x`",
      ],
      correctIndex: 1,
      explainWrong: "There is only ever one box per variable name. Reassignment overwrites its contents; it does not create a second box or keep both values.",
    },
    {
      id: "py-variables.boxes.2",
      prompt: "If `a = 4` and then `b = a`, what happens to `b` if `a` changes afterward?",
      options: [
        "`b` changes too, since it came from `a`",
        "`b` stays the same, because it got its own copy of the value",
        "Both `a` and `b` become undefined",
      ],
      correctIndex: 1,
      explainWrong: "Assigning a plain number copies the value into a new box. `b`'s box is separate from `a`'s, so later changes to `a` don't reach it.",
    },
    {
      id: "py-variables.boxes.3",
      prompt: "Two variables, `count` and `total`, both currently hold `0`. Are they the same box?",
      options: [
        "Yes, since they have the same value",
        "No, each variable name has its own separate box even with equal values",
        "It depends on which one was created first",
      ],
      correctIndex: 1,
      explainWrong: "Having the same value doesn't merge boxes. Every variable name gets its own box; the values inside just happen to match here.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: types — int/float/str/bool are box "shapes" with different rules.
// ---------------------------------------------------------------------------

const typesUnit: Unit = {
  id: "types",
  title: "Types Are Box Shapes",
  watch: [
    {
      state: {
        nodes: [{ id: "n", label: "7", tag: "n : int", x: 2, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`n = 7` makes an `int` box. The tag shows the value's type.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "7", tag: "n : int", x: 2, y: 1, shape: "box" },
          { id: "p", label: "7.0", tag: "p : float", x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`p = 7.0` looks similar but the decimal point makes it a `float` box.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "7", tag: "n : int", x: 2, y: 1, shape: "box" },
          { id: "p", label: "7.0", tag: "p : float", x: 4, y: 1, shape: "box" },
          { id: "w", label: '"7"', tag: "w : str", x: 6, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`w = \"7\"` is text, not a number, even though it looks like one. That makes it a `str` box.",
    },
    {
      state: {
        nodes: [
          { id: "n", label: "7", tag: "n : int", x: 2, y: 1, shape: "box", emphasis: "active" },
          { id: "p", label: "7.0", tag: "p : float", x: 4, y: 1, shape: "box" },
          { id: "w", label: '"7"', tag: "w : str", x: 6, y: 1, shape: "box" },
        ],
        arrows: [],
      },
      caption: "`type(n)` inspects the box and reports its shape without changing it.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "7", tag: "a : int", x: 1, y: 1, shape: "box" },
          { id: "b", label: "2", tag: "b : int", x: 3, y: 1, shape: "box" },
          { id: "r1", label: "3", tag: "a // b : int", x: 5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`a // b` is floor division: it drops the remainder and stays an `int`.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "7", tag: "a : int", x: 1, y: 1, shape: "box" },
          { id: "b", label: "2", tag: "b : int", x: 3, y: 1, shape: "box" },
          { id: "r1", label: "3", tag: "a // b : int", x: 5, y: 1, shape: "box", emphasis: "dim" },
          { id: "r2", label: "3.5", tag: "a / b : float", x: 5, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`a / b` is true division: it keeps the remainder as a decimal, always producing a `float`.",
    },
    {
      state: {
        nodes: [
          { id: "digits", label: '"5"', tag: "digits : str", x: 1, y: 1, shape: "box" },
          { id: "num", label: "5", tag: "num : int", x: 3, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`int(\"5\")` converts the text `\"5\"` into the number `5`, a new box with a new shape.",
    },
    {
      state: {
        nodes: [
          { id: "digits", label: '"5"', tag: "digits : str", x: 1, y: 1, shape: "box" },
          { id: "num", label: "5", tag: "num : int", x: 3, y: 1, shape: "box" },
          { id: "total", label: "7", tag: "total : int", x: 5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`num + 2` works because `num` is now an `int`; `total` holds `7`.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "What does `7 // 2` evaluate to?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "7", tag: "int", x: 1, y: 1, shape: "box" },
              { id: "b", label: "2", tag: "int", x: 3, y: 1, shape: "box" },
            ],
            arrows: [],
          },
          caption: "`//` is floor division: divide, then drop anything after the decimal point.",
        },
      ],
      options: [
        { id: "a", label: "`3.5`" },
        { id: "b", label: "`3`" },
        { id: "c", label: "`4`" },
      ],
      correctId: "b",
      explainWrong: {
        a: "`3.5` is what `/` (true division) would give. `//` throws away the remainder instead of keeping it as a decimal.",
        c: "`//` truncates toward zero here, it does not round to the nearest whole number. `3.5` rounds down to `3`, not up to `4`.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "7", tag: "int", x: 1, y: 1, shape: "box" },
            { id: "b", label: "2", tag: "int", x: 3, y: 1, shape: "box" },
            { id: "r", label: "3", tag: "7 // 2 : int", x: 5, y: 1, shape: "box", emphasis: "new" },
          ],
          arrows: [],
        },
        caption: "`7 // 2` is `3`: the remainder `1` is dropped, and the result stays an `int`.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Convert the text `\"5\"` into a number before adding `2` to it.",
      code: ["text = \"5\"", "result = {{convert}}(text) + 2"].join("\n"),
      blanks: [
        {
          id: "convert",
          placeholder: "___",
          answer: "int",
          explainWrong: "`str + int` cannot be added directly. `int()` converts the text to a whole number so addition works.",
        },
      ],
      tests: [
        { name: "result is 7", code: "assert result == 7, \"result should be 7: '5' must be converted to the int 5 before adding 2\"" },
      ],
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt:
        "Given a Celsius temperature `c`, implement `celsius_to_fahrenheit(c)` that converts it to Fahrenheit using `f = c * 9 / 5 + 32`. Return the result as a `float`.",
      difficulty: "Easy",
      examples: [
        { input: "`c = 0`", output: "`32.0`", explanation: "Freezing point of water in Fahrenheit." },
        { input: "`c = 100`", output: "`212.0`", explanation: "Boiling point of water in Fahrenheit." },
      ],
      constraints: ["the return value must be a `float`, even when the result is a whole number"],
      bigO: { answer: "O(1)", explain: "`celsius_to_fahrenheit` does one fixed arithmetic computation regardless of input size." },
      solution: "def celsius_to_fahrenheit(c):\n    return c * 9 / 5 + 32\n",
      starter: "def celsius_to_fahrenheit(c):\n    # your code here\n    pass\n",
      tests: [
        {
          name: "0 C is 32 F",
          code: "assert celsius_to_fahrenheit(0) == 32.0, \"celsius_to_fahrenheit(0) should be 32.0: freezing point of water in Fahrenheit\"",
        },
        {
          name: "100 C is 212 F",
          code: "assert celsius_to_fahrenheit(100) == 212.0, \"celsius_to_fahrenheit(100) should be 212.0: boiling point of water in Fahrenheit\"",
        },
        {
          name: "result is a float",
          code: "assert isinstance(celsius_to_fahrenheit(20), float), \"result should be a float: using / (true division) instead of // keeps the decimal part\"",
        },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "py-variables.types.1",
      prompt: "`x = 7.0` instead of `x = 7`. What type does `x` have?",
      options: ["`int`", "`float`", "`str`"],
      correctIndex: 1,
      explainWrong: "A decimal point in the literal makes Python store it as a `float`, even when the value is a whole number like `7.0`.",
    },
    {
      id: "py-variables.types.2",
      prompt: "What is the difference between `9 / 2` and `9 // 2`?",
      options: [
        "No difference, both give `4`",
        "`/` gives `4.5` as a `float`; `//` gives `4` as an `int`, dropping the remainder",
        "`//` gives `4.5`; `/` gives `4`",
      ],
      correctIndex: 1,
      explainWrong: "`/` is true division and always returns a `float` with the remainder kept as decimals. `//` is floor division and drops the remainder, returning an `int` when both inputs are ints.",
    },
    {
      id: "py-variables.types.3",
      prompt: "Why does `\"3\" + \"4\"` give `\"34\"` instead of `7`?",
      options: [
        "Python has a bug",
        "Both values are strings, so `+` joins the text instead of adding numbers",
        "`+` always joins text no matter the type",
      ],
      correctIndex: 1,
      explainWrong: "`+` behaves differently depending on type: it adds numbers but joins (concatenates) strings. Since `\"3\"` and `\"4\"` are strings here, the result is the text `\"34\"`.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: references — two names can point at one object.
// ---------------------------------------------------------------------------

const referencesUnit: Unit = {
  id: "references",
  title: "Two Names, One Object",
  watch: [
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "a", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
        ],
      },
      caption: "`a = [1, 2]` creates one list object. The variable `a` is an arrow pointing at it, not a copy of it.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "b", label: "b", tag: "variable", x: 0, y: 3, shape: "box", emphasis: "new" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "n0" },
          { from: "b", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
        ],
      },
      caption: "`b = a` does not build a new list. It draws a second arrow at the same object.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "b", label: "b", tag: "variable", x: 0, y: 3, shape: "box" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle", emphasis: "active" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "n0" },
          { from: "b", to: "n0" },
          { from: "n0", to: "n1" },
        ],
      },
      caption: "`b.append(3)` looks up `b`, follows its arrow, and finds the very same object `a` also points at.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "b", label: "b", tag: "variable", x: 0, y: 3, shape: "box" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
          { id: "n2", label: "3", x: 6, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "a", to: "n0" },
          { from: "b", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2", emphasis: "active" },
        ],
      },
      caption: "The one shared object grows a third slot. Since `a` and `b` point at the same object, `a` sees the `3` too.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "b", label: "b", tag: "variable", x: 0, y: 3, shape: "box" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle", emphasis: "active" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
          { id: "n2", label: "3", x: 6, y: 1, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "n0", emphasis: "active" },
          { from: "b", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "`print(a)` shows `[1, 2, 3]`. Both arrows lead to the same three-slot object, so both names see all three.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
          { id: "n2", label: "3", x: 6, y: 1, shape: "circle" },
        ],
        arrows: [
          { from: "a", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
        ],
      },
      caption: "Now compare: `c = list(a)` instead. First, here is `a` alone, unchanged, with its three slots.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "c", label: "c", tag: "variable", x: 0, y: 4, shape: "box", emphasis: "new" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
          { id: "n2", label: "3", x: 6, y: 1, shape: "circle" },
          { id: "m0", label: "1", x: 2, y: 4, shape: "circle", emphasis: "new" },
          { id: "m1", label: "2", x: 4, y: 4, shape: "circle", emphasis: "new" },
          { id: "m2", label: "3", x: 6, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "a", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "c", to: "m0", emphasis: "active" },
          { from: "m0", to: "m1" },
          { from: "m1", to: "m2" },
        ],
      },
      caption: "`list(a)` builds a brand new object with copied values. `c` points at its own object, separate from `a`'s.",
    },
    {
      state: {
        nodes: [
          { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "c", label: "c", tag: "variable", x: 0, y: 4, shape: "box" },
          { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
          { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
          { id: "n2", label: "3", x: 6, y: 1, shape: "circle" },
          { id: "m0", label: "1", x: 2, y: 4, shape: "circle", emphasis: "active" },
          { id: "m1", label: "2", x: 4, y: 4, shape: "circle" },
          { id: "m2", label: "3", x: 6, y: 4, shape: "circle" },
          { id: "m3", label: "4", x: 8, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "a", to: "n0" },
          { from: "n0", to: "n1" },
          { from: "n1", to: "n2" },
          { from: "c", to: "m0" },
          { from: "m0", to: "m1" },
          { from: "m1", to: "m2" },
          { from: "m2", to: "m3", emphasis: "active" },
        ],
      },
      caption: "`c.append(4)` only grows `c`'s own object. `a`'s object still has just `1, 2, 3`.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "`a = [1, 2]; b = a; b.append(3)`. What does `print(a)` show?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
              { id: "b", label: "b", tag: "variable", x: 0, y: 3, shape: "box" },
              { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
              { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
            ],
            arrows: [
              { from: "a", to: "n0" },
              { from: "b", to: "n0" },
              { from: "n0", to: "n1" },
            ],
          },
          caption: "`a` and `b` both point at the same list object.",
        },
      ],
      options: [
        { id: "a", label: "`[1, 2]`" },
        { id: "b", label: "`[1, 2, 3]`" },
        { id: "c", label: "Error, because `a` was never appended to" },
      ],
      correctId: "b",
      explainWrong: {
        a: "`b = a` doesn't make a copy. `a` and `b` point at the exact same object, so appending through `b` changes what `a` sees too.",
        c: "There's no error. `b.append(3)` is a valid call on the shared list, and since `a` points at that same object, `a` shows the change.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box", emphasis: "active" },
            { id: "b", label: "b", tag: "variable", x: 0, y: 3, shape: "box", emphasis: "active" },
            { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
            { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
            { id: "n2", label: "3", x: 6, y: 1, shape: "circle", emphasis: "new" },
          ],
          arrows: [
            { from: "a", to: "n0" },
            { from: "b", to: "n0" },
            { from: "n0", to: "n1" },
            { from: "n1", to: "n2" },
          ],
        },
        caption: "`print(a)` shows `[1, 2, 3]`: `a` and `b` share one object, so `a` sees `b`'s change.",
      },
      reviewStep: 3,
    },
    {
      kind: "predict",
      prompt: "`a = [1, 2]; c = list(a); c.append(3)`. What does `print(a)` show now?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box" },
              { id: "c", label: "c", tag: "variable", x: 0, y: 4, shape: "box" },
              { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
              { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
              { id: "m0", label: "1", x: 2, y: 4, shape: "circle" },
              { id: "m1", label: "2", x: 4, y: 4, shape: "circle" },
            ],
            arrows: [
              { from: "a", to: "n0" },
              { from: "n0", to: "n1" },
              { from: "c", to: "m0" },
              { from: "m0", to: "m1" },
            ],
          },
          caption: "`list(a)` made `c` point at a separate, freshly copied object.",
        },
      ],
      options: [
        { id: "a", label: "`[1, 2]`" },
        { id: "b", label: "`[1, 2, 3]`" },
      ],
      correctId: "a",
      explainWrong: {
        b: "`list(a)` creates a new, independent object with copied values. `c.append(3)` only changes `c`'s object, so `a` is untouched and stays `[1, 2]`.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "a", tag: "variable", x: 0, y: 1, shape: "box", emphasis: "active" },
            { id: "c", label: "c", tag: "variable", x: 0, y: 4, shape: "box" },
            { id: "n0", label: "1", x: 2, y: 1, shape: "circle" },
            { id: "n1", label: "2", x: 4, y: 1, shape: "circle" },
            { id: "m0", label: "1", x: 2, y: 4, shape: "circle" },
            { id: "m1", label: "2", x: 4, y: 4, shape: "circle" },
            { id: "m2", label: "3", x: 6, y: 4, shape: "circle", emphasis: "new" },
          ],
          arrows: [
            { from: "a", to: "n0" },
            { from: "n0", to: "n1" },
            { from: "c", to: "m0" },
            { from: "m0", to: "m1" },
            { from: "m1", to: "m2" },
          ],
        },
        caption: "`print(a)` still shows `[1, 2]`: `c`'s object is separate, so growing `c` never touches `a`'s object.",
      },
      reviewStep: 7,
    },
    {
      kind: "fillin",
      prompt: "`original` holds `[1, 2, 3]`. Make `copy` a real, independent copy so changing it never affects `original`.",
      code: ["original = [1, 2, 3]", "copy = {{makecopy}}(original)", "copy.append(4)"].join("\n"),
      blanks: [
        {
          id: "makecopy",
          placeholder: "___",
          answer: "list",
          explainWrong: "Writing `copy = original` (no function call) just points `copy` at the same object as `original`. `list(original)` builds a genuinely new object with copied values.",
        },
      ],
      tests: [
        {
          name: "original unaffected",
          code: "assert original == [1, 2, 3], \"original should still be [1, 2, 3]: copy must be a separate object, not another name for original\"",
        },
        {
          name: "copy grew",
          code: "assert copy == [1, 2, 3, 4], \"copy should be [1, 2, 3, 4]: append should only affect copy's own object\"",
        },
      ],
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt:
        "Given a list of numbers `nums`, implement two functions. `add_one_inplace(nums)` should append `1` to `nums` directly, mutating it in place and returning nothing meaningful. `add_one_new(nums)` should return a NEW list equal to `nums` with `1` appended, leaving `nums` untouched.",
      difficulty: "Medium",
      examples: [
        {
          input: "`nums = [1, 2]; add_one_inplace(nums)`",
          output: "`nums == [1, 2, 1]`",
          explanation: "`add_one_inplace` mutates the same list object it was given.",
        },
        {
          input: "`nums = [1, 2]; result = add_one_new(nums)`",
          output: "`result == [1, 2, 1], nums == [1, 2]`",
          explanation: "`add_one_new` returns a fresh list and leaves `nums` unchanged.",
        },
      ],
      constraints: ["`add_one_inplace` must not create a new list", "`add_one_new` must not mutate `nums`"],
      bigO: { fn: "add_one_new", answer: "O(n)", explain: "`add_one_new` must copy every element of `nums` into a fresh list before appending." },
      hidden:
        "def _viz(name, xs):\n    nodes = [{\"id\": f\"n{i}\", \"label\": repr(v), \"x\": i, \"y\": 0} for i, v in enumerate(xs)]\n    nodes.insert(0, {\"id\": \"var\", \"label\": name, \"x\": 0, \"y\": 1, \"shape\": \"box\", \"tag\": \"variable\"})\n    arrows = [{\"from\": \"var\", \"to\": \"n0\"}] + [{\"from\": f\"n{i}\", \"to\": f\"n{i+1}\"} for i in range(len(xs) - 1)]\n    return {\"nodes\": nodes, \"arrows\": arrows}",
      solution:
        "def add_one_inplace(nums):\n    nums.append(1)\n\ndef add_one_new(nums):\n    return nums + [1]\n",
      starter:
        "def add_one_inplace(nums):\n    # mutate nums directly\n    pass\n\ndef add_one_new(nums):\n    # return a new list, do not touch nums\n    pass\n",
      tests: [
        {
          name: "inplace mutates the original",
          code:
            "original = [1, 2]\nadd_one_inplace(original)\nassert original == [1, 2, 1], \"original should become [1, 2, 1]: add_one_inplace must mutate the same list object it was given\"",
        },
        {
          name: "new returns a fresh list and leaves original alone",
          code:
            "original2 = [1, 2]\nresult = add_one_new(original2)\nassert result == [1, 2, 1], \"result should be [1, 2, 1]: add_one_new should return a list with 1 appended\"\nassert original2 == [1, 2], \"original2 should stay [1, 2]: add_one_new must not mutate the list it was given\"",
        },
      ],
      vizExpr: '_viz("result", add_one_new([1, 2]))',
      reviewStep: 7,
    },
  ],
  recall: [
    {
      id: "py-variables.references.1",
      prompt: "`x = [1, 2]; y = x`. How many list objects exist now?",
      options: ["Two, one for `x` and one for `y`", "One, with both `x` and `y` pointing at it", "Zero, until one of them is printed"],
      correctIndex: 1,
      explainWrong: "`y = x` does not build a new list. It just makes `y` a second name pointing at the same single object `x` already points at.",
    },
    {
      id: "py-variables.references.2",
      prompt: "How does `list(x)` differ from `y = x`?",
      options: [
        "There is no difference, both create references to the same object",
        "`list(x)` builds a brand new object with copied values; `y = x` just adds another name to the existing object",
        "`list(x)` is slower but does the same thing as `y = x`",
      ],
      correctIndex: 1,
      explainWrong: "`list(x)` actually constructs a new list object and copies the values in. `y = x` skips construction entirely; it only creates a second arrow pointing at the object `x` already names.",
    },
    {
      id: "py-variables.references.3",
      prompt: "A function mutates the list you pass it with `.append()`. Does the caller's original list change?",
      options: [
        "Yes, because the function received a reference to the same object",
        "No, functions always work on their own private copy",
        "Only if the function also returns the list",
      ],
      correctIndex: 0,
      explainWrong: "Python passes the reference itself, not a copy, when you pass a list to a function. Mutating methods like `append()` change the one shared object, so the caller sees it too, whether or not anything is returned.",
    },
    {
      id: "py-variables.references.4",
      prompt: "You want a function to return a modified list without touching the one the caller passed in. What should it do?",
      options: [
        "Call `.append()` directly on the parameter",
        "Make a copy first (e.g. with `list(...)`), modify the copy, and return that",
        "Reassign the parameter name to a new list inside the function",
      ],
      correctIndex: 1,
      explainWrong: "Mutating the parameter directly changes the caller's object. Reassigning the parameter name inside the function only rebinds that local name, it does not protect against `.append()` calls elsewhere and is not how you produce a safe new result. Copying first, then modifying and returning the copy, is what keeps the original untouched.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-variables — combine boxes, types, and references.
// ---------------------------------------------------------------------------

const applyVariablesUnit: Unit = {
  id: "apply-variables",
  title: "Apply: Shopping Cart Totals",
  watch: [
    {
      state: {
        nodes: [
          { id: "cart", label: "cart", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "n0", label: "4.50", x: 2, y: 1, shape: "circle", emphasis: "new" },
          { id: "n1", label: "2.25", x: 4, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [
          { from: "cart", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
        ],
      },
      caption: "`cart` holds prices as floats: `[4.50, 2.25]`. One object, one arrow from `cart`.",
    },
    {
      state: {
        nodes: [
          { id: "cart", label: "cart", tag: "variable", x: 0, y: 1, shape: "box" },
          { id: "backup", label: "backup", tag: "variable", x: 0, y: 3, shape: "box", emphasis: "new" },
          { id: "n0", label: "4.50", x: 2, y: 1, shape: "circle" },
          { id: "n1", label: "2.25", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [
          { from: "cart", to: "n0" },
          { from: "backup", to: "n0", emphasis: "active" },
          { from: "n0", to: "n1" },
        ],
      },
      caption: "`backup = cart` looks like a safety copy, but it's just a second arrow to the same object: the bug to avoid.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given a shopping cart `cart` (a list of prices), implement `checkout(cart)` to return the total of all prices WITHOUT changing `cart` itself. Separately, implement `add_item(cart, price)` to add `price` into `cart` directly, mutating it, and returning nothing meaningful. Be careful that `checkout` never mutates its input, and that a `backup` made of `cart` before checkout stays correct even if `cart` changes later.",
      difficulty: "Medium",
      examples: [
        {
          input: "`cart = [4.50, 2.25, 5.25]; total = checkout(cart)`",
          output: "`total == 12.0, cart == [4.50, 2.25, 5.25]`",
          explanation: "`checkout` sums the prices and leaves `cart` unchanged.",
        },
        {
          input: "`cart = [4.50, 2.25]; backup = list(cart); add_item(cart, 5.25)`",
          output: "`cart == [4.50, 2.25, 5.25], backup == [4.50, 2.25]`",
          explanation: "`add_item` mutates `cart` in place; `backup`, made with `list(cart)`, is unaffected.",
        },
      ],
      constraints: ["`checkout` must not mutate `cart`", "`add_item` must mutate the same list object it was given"],
      bigO: { fn: "checkout", answer: "O(n)", explain: "`checkout` must add up every price in `cart`, so its work grows with the cart's length." },
      hidden:
        "def _viz(name, xs):\n    nodes = [{\"id\": f\"n{i}\", \"label\": repr(v), \"x\": i, \"y\": 0} for i, v in enumerate(xs)]\n    nodes.insert(0, {\"id\": \"var\", \"label\": name, \"x\": 0, \"y\": 1, \"shape\": \"box\", \"tag\": \"variable\"})\n    arrows = [{\"from\": \"var\", \"to\": \"n0\"}] + [{\"from\": f\"n{i}\", \"to\": f\"n{i+1}\"} for i in range(len(xs) - 1)]\n    return {\"nodes\": nodes, \"arrows\": arrows}",
      solution:
        "def checkout(cart):\n    total = 0\n    for price in cart:\n        total += price\n    return total\n\ndef add_item(cart, price):\n    cart.append(price)\n",
      starter:
        "def checkout(cart):\n    # return the sum of prices, do not mutate cart\n    pass\n\ndef add_item(cart, price):\n    # mutate cart in place by adding price\n    pass\n",
      tests: [
        {
          name: "checkout totals correctly",
          code:
            "cart = [4.50, 2.25, 5.25]\ntotal = checkout(cart)\nassert total == 12.0, \"total should be 12.0: sum 4.50 + 2.25 + 5.25\"",
        },
        {
          name: "checkout does not mutate cart",
          code:
            "cart2 = [4.50, 2.25, 5.25]\ncheckout(cart2)\nassert cart2 == [4.50, 2.25, 5.25], \"cart2 should be unchanged: checkout must only read prices, never modify the list\"",
        },
        {
          name: "add_item mutates the shared list, and a real copy protects a backup",
          code:
            "cart3 = [4.50, 2.25]\nbackup = list(cart3)\nadd_item(cart3, 5.25)\nassert cart3 == [4.50, 2.25, 5.25], \"cart3 should include the new item: add_item must mutate the same list object it was given\"\nassert backup == [4.50, 2.25], \"backup should still be [4.50, 2.25]: the copy must not change when the original grows\"",
        },
      ],
      vizExpr: '_viz("cart", (lambda c: (add_item(c, 5.25), c)[1])([4.50, 2.25]))',
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-variables.apply-variables.1",
      prompt: "You write `backup = cart` before checking out, hoping to restore `cart` later if something goes wrong. Does this work?",
      options: [
        "Yes, `backup` is a safe snapshot of `cart`'s current contents",
        "No, `backup` points at the same object as `cart`, so changes to `cart` also show up in `backup`",
      ],
      correctIndex: 1,
      explainWrong: "`backup = cart` never builds a new object; it's just another name for the exact list `cart` names. Any later mutation of `cart` (like `.append()`) is visible through `backup` too, since there's only one list underneath.",
    },
    {
      id: "py-variables.apply-variables.2",
      prompt: "To make `backup` a true snapshot that survives later changes to `cart`, what should you write instead?",
      options: [
        "`backup = cart[:]` or `backup = list(cart)`, which build a new, separate object",
        "`backup = cart`, exactly as before",
        "`cart = backup`, to reverse the direction",
      ],
      correctIndex: 0,
      explainWrong: "`backup = cart` shares one object, so it cannot protect against future mutation, and reversing the direction (`cart = backup`) doesn't create a copy either, it just repoints `cart`. Building a genuinely new object, e.g. with `cart[:]` or `list(cart)`, is what makes `backup` independent.",
    },
  ],
};

export const chVariables: Chapter = {
  id: "py-variables",
  phase: 1,
  title: "Values and Variables",
  units: [boxesUnit, typesUnit, referencesUnit, applyVariablesUnit],
};
