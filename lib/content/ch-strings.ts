import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: indexing-slicing — a string is a row of characters; positive and
// negative indices point into it; slices grab a window and always exclude
// the stop index.
// ---------------------------------------------------------------------------

const indexingSlicingUnit: Unit = {
  id: "indexing-slicing",
  title: "Strings Are Rows of Characters",
  watch: [
    {
      state: {
        nodes: [
          { id: "c0", label: "p", tag: "0 / -6", x: 0, y: 2, shape: "circle", emphasis: "new" },
          { id: "c1", label: "y", tag: "1 / -5", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "c2", label: "t", tag: "2 / -4", x: 2, y: 2, shape: "circle", emphasis: "new" },
          { id: "c3", label: "h", tag: "3 / -3", x: 3, y: 2, shape: "circle", emphasis: "new" },
          { id: "c4", label: "o", tag: "4 / -2", x: 4, y: 2, shape: "circle", emphasis: "new" },
          { id: "c5", label: "n", tag: "5 / -1", x: 5, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 's = "python" lays out as six characters in a row. Each has two valid indices: one counting from the start, one counting from the end.',
    },
    {
      state: {
        nodes: [
          { id: "c0", label: "p", tag: "index 0", x: 0, y: 2, shape: "circle", emphasis: "active" },
          { id: "c1", label: "y", x: 1, y: 2, shape: "circle" },
          { id: "c2", label: "t", x: 2, y: 2, shape: "circle" },
          { id: "c3", label: "h", x: 3, y: 2, shape: "circle" },
          { id: "c4", label: "o", x: 4, y: 2, shape: "circle" },
          { id: "c5", label: "n", x: 5, y: 2, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "s[0] points at the first character, \"p\". Counting from the start always begins at 0, not 1.",
    },
    {
      state: {
        nodes: [
          { id: "c0", label: "p", x: 0, y: 2, shape: "circle" },
          { id: "c1", label: "y", x: 1, y: 2, shape: "circle" },
          { id: "c2", label: "t", x: 2, y: 2, shape: "circle" },
          { id: "c3", label: "h", x: 3, y: 2, shape: "circle" },
          { id: "c4", label: "o", x: 4, y: 2, shape: "circle" },
          { id: "c5", label: "n", tag: "index -1", x: 5, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: 'Negative indices count backward from the end. s[-1] is the LAST character, "n", without needing to know the string\'s length.',
    },
    {
      state: {
        nodes: [
          { id: "c0", label: "p", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c1", label: "y", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "c2", label: "t", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "c3", label: "h", x: 3, y: 2, shape: "circle", emphasis: "active" },
          { id: "c4", label: "o", tag: "stop, excluded", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c5", label: "n", x: 5, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: 's[1:4] opens a window over indices 1, 2, 3, giving "yth". Index 4 is the stop bound and is never included.',
    },
    {
      state: {
        nodes: [
          { id: "c0", label: "p", x: 0, y: 2, shape: "circle", emphasis: "active" },
          { id: "c1", label: "y", x: 1, y: 2, shape: "circle", emphasis: "active" },
          { id: "c2", label: "t", tag: "stop, excluded", x: 2, y: 2, shape: "circle", emphasis: "active" },
          { id: "c3", label: "h", x: 3, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c4", label: "o", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c5", label: "n", x: 5, y: 2, shape: "circle", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: 's[:3] leaves out the start; it defaults to 0. The window covers indices 0, 1, 2, giving "pyt".',
    },
    {
      state: {
        nodes: [
          { id: "c0", label: "p", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c1", label: "y", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c2", label: "t", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c3", label: "h", tag: "start", x: 3, y: 2, shape: "circle", emphasis: "active" },
          { id: "c4", label: "o", x: 4, y: 2, shape: "circle", emphasis: "active" },
          { id: "c5", label: "n", x: 5, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: 's[3:] leaves out the stop; it defaults to the string\'s length. The window runs from index 3 to the very end, giving "hon".',
    },
    {
      state: {
        nodes: [
          { id: "c0", label: "p", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c1", label: "y", x: 1, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c2", label: "t", x: 2, y: 2, shape: "circle", emphasis: "dim" },
          { id: "c3", label: "h", tag: "-3", x: 3, y: 2, shape: "circle", emphasis: "active" },
          { id: "c4", label: "o", x: 4, y: 2, shape: "circle", emphasis: "active" },
          { id: "c5", label: "n", x: 5, y: 2, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: 's[-3:] starts three characters before the end and runs to the end: "hon" again, this time reached with negative counting.',
    },
    {
      state: {
        nodes: [{ id: "len", label: "6", tag: "len(s)", x: 3, y: 4, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: 'len(s) is 6. Valid positive indices run 0 through 5, and valid negative indices run -1 through -6, covering the same six characters.',
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: 's = "hello"\nresult = s[1:4]\nWhat is result?',
      steps: [
        {
          state: {
            nodes: [
              { id: "h0", label: "h", x: 0, y: 2, shape: "circle" },
              { id: "h1", label: "e", x: 1, y: 2, shape: "circle", emphasis: "active" },
              { id: "h2", label: "l", x: 2, y: 2, shape: "circle", emphasis: "active" },
              { id: "h3", label: "l", x: 3, y: 2, shape: "circle", emphasis: "active" },
              { id: "h4", label: "o", tag: "stop", x: 4, y: 2, shape: "circle", emphasis: "dim" },
            ],
            arrows: [],
          },
          caption: '`s[1:4]` opens a window over indices `1`, `2`, `3` of `"hello"`.',
        },
      ],
      options: [
        { id: "a", label: '"ell"' },
        { id: "b", label: '"ello"' },
        { id: "c", label: '"hell"' },
        { id: "d", label: '"loh"' },
      ],
      correctId: "a",
      explainWrong: {
        b: "The stop index, 4, is never included in the slice. Including s[4] would make this 4 characters, not 3.",
        c: "The start index is 1, not 0, so s[0], the letter \"h\", is skipped. Starting the window one character earlier is not what s[1:4] does.",
        d: "Slicing never reverses or reorders characters; it only selects a contiguous window in the string's original order.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "result", label: '"ell"', tag: "result", x: 3, y: 2, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: '`s[1:4]` on `"hello"` gives `"ell"`: indices `1`, `2`, `3`, stopping before index `4`.',
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "s holds \"banana\". Fill in the index that grabs the LAST character without needing to know the string's length.",
      code: ['s = "banana"', "last = s[{{idx}}]"].join("\n"),
      blanks: [
        {
          id: "idx",
          placeholder: "___",
          answer: "-1",
          explainWrong:
            'Positive index 6 is out of range for a 6-character string (valid indices are 0 through 5). -1 counts one step back from the end, which always lands on the last character no matter the length.',
        },
      ],
      tests: [
        { name: 'last is "a"', code: 'assert last == "a", "last should be \\"a\\": s[-1] is the final character of \\"banana\\""' },
      ],
      reviewStep: 2,
    },
    {
      kind: "write",
      prompt:
        "Given a string `s`, return a 2-character string made of `s`'s first character followed by its last character, using `s[0]` and `s[-1]`.",
      difficulty: "Easy",
      examples: [
        { input: '`s = "python"`', output: '`"pn"`', explanation: '`s[0]` is `"p"`, `s[-1]` is `"n"`.' },
        {
          input: '`s = "a"`',
          output: '`"aa"`',
          explanation: 'In a 1-character string, `s[0]` and `s[-1]` both point at the same character.',
        },
      ],
      constraints: ['`1 <= len(s) <= 1000`'],
      bigO: { answer: "O(1)", explain: "Only `s[0]` and `s[-1]` are read; the work does not grow with the length of `s`." },
      starter: "def first_last(s):\n    # your code here\n    pass\n",
      solution: "def first_last(s):\n    return s[0] + s[-1]\n",
      tests: [
        { name: 'first_last("python") is "pn"', code: 'assert first_last("python") == "pn", "first_last(\\"python\\") should be \\"pn\\": s[0] is \\"p\\", s[-1] is \\"n\\""' },
        { name: 'first_last("hi") is "hi"', code: 'assert first_last("hi") == "hi", "first_last(\\"hi\\") should be \\"hi\\": s[0] is \\"h\\", s[-1] is \\"i\\""' },
        {
          name: 'single character doubles up',
          code: 'assert first_last("a") == "aa", "first_last(\\"a\\") should be \\"aa\\": in a 1-character string, s[0] and s[-1] both point at the same character"',
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-strings.indexing-slicing.1",
      prompt: 's = "hello". What is s[0]?',
      options: ['"h", the first character', '"o", the last character', 'An error, since indexing starts at 1'],
      correctIndex: 0,
      explainWrong: "Python string indexing is zero-based: the first character sits at index 0, not 1, and indexing a valid position never raises an error.",
    },
    {
      id: "py-strings.indexing-slicing.2",
      prompt: "Why would you use s[-1] instead of s[len(s) - 1] to get the last character?",
      options: [
        "They're equivalent, but s[-1] reaches the last character directly without computing the length first",
        "s[-1] is a different character than s[len(s) - 1]",
        "s[-1] only works on strings shorter than 10 characters",
      ],
      correctIndex: 0,
      explainWrong: "Negative indexing is just a shortcut: s[-1] and s[len(s) - 1] land on the exact same character. The negative form skips the extra step of computing the length yourself, and it works for strings of any length.",
    },
    {
      id: "py-strings.indexing-slicing.3",
      prompt: "For s = \"abcdef\", what does s[2:5] include?",
      options: ["Indices 2, 3, 4, 5", "Indices 2, 3, 4, stopping before index 5", "Indices 3, 4, 5"],
      correctIndex: 1,
      explainWrong: "A slice's stop index is always excluded. s[2:5] runs from index 2 up to but not including index 5, covering exactly 3 characters, not 4.",
    },
    {
      id: "py-strings.indexing-slicing.4",
      prompt: 's = "abcdef". What does s[:3] mean?',
      options: [
        "Start from index 0 (the default) and stop before index 3",
        "Start from index 3 and go to the end",
        "It's a syntax error to omit the start index",
      ],
      correctIndex: 0,
      explainWrong: "Omitting the start of a slice doesn't error; it just defaults to 0. s[:3] is shorthand for s[0:3], the first three characters.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: methods — string methods transform text; the originals never
// change because every method returns a brand new string.
// ---------------------------------------------------------------------------

const methodsUnit: Unit = {
  id: "methods",
  title: "Methods Return New Strings, Never Change the Old One",
  watch: [
    {
      state: {
        nodes: [{ id: "s", label: '"Hello World"', tag: "s (original)", x: 1, y: 2, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: 's = "Hello World" is the string every method call in this unit starts from.',
    },
    {
      state: {
        nodes: [
          { id: "s", label: '"Hello World"', tag: "s (original)", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "up", label: '"HELLO WORLD"', tag: "s.upper()", x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "s.upper() returns a brand NEW string in all caps. s itself is untouched, still sitting there unchanged.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: '"Hello World"', tag: "s (original)", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "lo", label: '"hello world"', tag: "s.lower()", x: 4, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "s.lower() works the same way: a new lowercase string comes back, and s keeps its original mixed case.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: '"Hello World"', tag: "s (original)", x: 1, y: 2, shape: "box" },
          { id: "idx", label: "6", tag: 's.find("World")', x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "idx", to: "s", emphasis: "active" }],
      },
      caption: 's.find("World") returns 6, the index where "World" starts inside s. It doesn\'t change s, just reports a position.',
    },
    {
      state: {
        nodes: [
          { id: "s", label: '"Hello World"', tag: "s (original)", x: 1, y: 2, shape: "box" },
          { id: "idx2", label: "-1", tag: 's.find("xyz")', x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "When the substring isn't there, find() returns -1 instead of raising an error. -1 is never a valid index, so it's a safe \"not found\" signal.",
    },
    {
      state: {
        nodes: [
          { id: "s", label: '"Hello World"', tag: "s (original)", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "rep", label: '"Hello Python"', tag: 's.replace("World", "Python")', x: 4, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "replace() also returns a new string with the swap made. s still says \"Hello World\": replace never edits in place.",
    },
    {
      state: {
        nodes: [
          { id: "raw", label: '"  Hi  "', tag: "original", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "stripped", label: '"Hi"', tag: ".strip()", x: 4, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'strip() trims leading and trailing whitespace only, returning a new "Hi". The original padded string, if kept, would still have its spaces.',
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: 's = "Data Structures"\nprint(s.upper())\nprint(s)\nWhat gets printed, in order?',
      steps: [
        {
          state: { nodes: [{ id: "s", label: '"Data Structures"', tag: "s", x: 2, y: 2, shape: "box", emphasis: "new" }], arrows: [] },
          caption: '`s` holds `"Data Structures"` before either `print` call runs.',
        },
      ],
      options: [
        { id: "a", label: '"DATA STRUCTURES" then "DATA STRUCTURES"' },
        { id: "b", label: '"DATA STRUCTURES" then "Data Structures"' },
        { id: "c", label: '"Data Structures" then "DATA STRUCTURES"' },
        { id: "d", label: '"Data Structures" then "Data Structures"' },
      ],
      correctId: "b",
      explainWrong: {
        a: "s.upper() returns a NEW string; it never changes s in place. The second print(s) still reads the original s, unaffected by the earlier call.",
        c: "print(s.upper()) runs first in the code, so the uppercase version is printed first. The plain s only prints second, on the next line.",
        d: "s.upper() really does return an all-caps string; that returned value is exactly what the first print shows. Only s itself stays lowercase-preserved, not the printed output of upper().",
      },
      revealStep: {
        state: { nodes: [{ id: "s", label: '"Data Structures"', tag: "s (still original)", x: 2, y: 2, shape: "box", emphasis: "active" }], arrows: [] },
        caption: '`"DATA STRUCTURES"` prints first from `s.upper()`, then `"Data Structures"` prints second: `s` was never modified.',
      },
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: 'Fill in the method name so result becomes "bat" by swapping one letter in "cat".',
      code: ['s = "cat"', 'result = s.{{method}}("c", "b")'].join("\n"),
      blanks: [
        {
          id: "method",
          placeholder: "___",
          answer: "replace",
          explainWrong:
            'replace(old, new) is the method that swaps a substring for another. Without it (or with a different method name), s.{{method}}("c", "b") would not produce "bat" from "cat".',
        },
      ],
      tests: [
        { name: 'result is "bat"', code: 'assert result == "bat", "result should be \\"bat\\": replace(\\"c\\", \\"b\\") swaps the \\"c\\" in \\"cat\\" for \\"b\\""' },
        { name: "s is unchanged", code: 'assert s == "cat", "s should still be \\"cat\\": replace() returns a new string, it never edits s in place"' },
      ],
      reviewStep: 5,
    },
    {
      kind: "write",
      prompt:
        "Given a string `s`, return a new string with `s` stripped of leading/trailing whitespace and lowercased, without modifying `s` itself.",
      difficulty: "Easy",
      examples: [
        { input: '`s = "  HELLO  "`', output: '`"hello"`', explanation: 'Strip the whitespace, then lowercase.' },
        { input: '`s = "World"`', output: '`"world"`', explanation: 'Lowercase with no whitespace to strip.' },
      ],
      constraints: ['`0 <= len(s) <= 1000`', '`s` must be left unchanged after the call'],
      bigO: { answer: "O(n)", explain: "Both `strip()` and `lower()` scan every character of `s` once." },
      starter: "def normalize(s):\n    # your code here\n    pass\n",
      solution: "def normalize(s):\n    return s.strip().lower()\n",
      tests: [
        { name: 'normalize("  HELLO  ") is "hello"', code: 'assert normalize("  HELLO  ") == "hello", "normalize(\\"  HELLO  \\") should be \\"hello\\": strip the whitespace, then lowercase"' },
        { name: 'normalize("World") is "world"', code: 'assert normalize("World") == "world", "normalize(\\"World\\") should be \\"world\\": lowercase with no whitespace to strip"' },
        {
          name: "original string untouched",
          code: 'original = "  HELLO  "\nnormalize(original)\nassert original == "  HELLO  ", "original should be unchanged: strip() and lower() both return new strings, neither mutates original"',
        },
      ],
      reviewStep: 6,
    },
  ],
  recall: [
    {
      id: "py-strings.methods.1",
      prompt: "s.upper() is called but the result isn't stored anywhere. What happens to s?",
      options: [
        "s becomes uppercase",
        "s stays exactly as it was; upper() returned a new string that was simply discarded",
        "It raises an error since the result wasn't captured",
      ],
      correctIndex: 1,
      explainWrong: "String methods never modify the string they're called on. upper() built a new uppercase string and handed it back; since nothing captured it, that new string is just discarded, and s is untouched.",
    },
    {
      id: "py-strings.methods.2",
      prompt: 's.find("xyz") can\'t find "xyz" anywhere in s. What does it return?',
      options: ["It raises an error", "-1", "None"],
      correctIndex: 1,
      explainWrong: "find() never raises an error for a missing substring, and it doesn't return None either. It returns -1, a value that can never be a real index, as a signal that nothing matched.",
    },
    {
      id: "py-strings.methods.3",
      prompt: '"  Hi  ".strip() removes which whitespace?',
      options: [
        "All whitespace anywhere in the string, including between words",
        "Only the leading and trailing whitespace",
        "Nothing; strip() only works on lists",
      ],
      correctIndex: 1,
      explainWrong: "strip() only trims whitespace from the very start and very end of the string. Whitespace in the middle, between words, is left exactly as it was.",
    },
    {
      id: "py-strings.methods.4",
      prompt: 's.replace("a", "b") is called. What does it do to s?',
      options: [
        "Edits s in place, swapping every \"a\" for \"b\"",
        "Returns a new string with the swap made; s itself keeps its original characters",
        "Only swaps the first occurrence and errors on the rest",
      ],
      correctIndex: 1,
      explainWrong: "Like every string method, replace() cannot modify s in place, since strings are immutable in Python. It builds and returns a new string with the substitution done, leaving s exactly as it was.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: split-join — split explodes a string into a list; join glues a
// list of strings back together with a separator.
// ---------------------------------------------------------------------------

const splitJoinUnit: Unit = {
  id: "split-join",
  title: "Split Explodes, Join Glues Back Together",
  watch: [
    {
      state: {
        nodes: [{ id: "s", label: '"a,b,c"', tag: "s", x: 3, y: 2, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: 's = "a,b,c" is a single string, three letters glued together by commas.',
    },
    {
      state: {
        nodes: [
          { id: "s", label: '"a,b,c"', tag: "s", x: 3, y: 0, shape: "box", emphasis: "dim" },
          { id: "p0", label: '"a"', tag: "parts[0]", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "p1", label: '"b"', tag: "parts[1]", x: 3, y: 2, shape: "circle", emphasis: "new" },
          { id: "p2", label: '"c"', tag: "parts[2]", x: 5, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "p0", to: "p1" }, { from: "p1", to: "p2" }],
      },
      caption: 'parts = s.split(",") explodes s at every comma into a list of three separate pieces. The commas themselves are discarded, not kept as elements.',
    },
    {
      state: {
        nodes: [
          { id: "w0", label: '"one"', tag: "parts[0]", x: 1, y: 2, shape: "circle", emphasis: "new" },
          { id: "w1", label: '"two"', tag: "parts[1]", x: 3, y: 2, shape: "circle", emphasis: "new" },
          { id: "w2", label: '"three"', tag: "parts[2]", x: 5, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [{ from: "w0", to: "w1" }, { from: "w1", to: "w2" }],
      },
      caption: '"one   two three".split() with no argument splits on ANY run of whitespace, so the extra spaces between "one" and "two" don\'t create empty pieces.',
    },
    {
      state: {
        nodes: [
          { id: "p0", label: '"a"', x: 1, y: 0, shape: "circle", emphasis: "dim" },
          { id: "p1", label: '"b"', x: 3, y: 0, shape: "circle", emphasis: "dim" },
          { id: "p2", label: '"c"', x: 5, y: 0, shape: "circle", emphasis: "dim" },
          { id: "joined", label: '"a-b-c"', tag: '"-".join(parts)', x: 3, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "p0", to: "joined" }, { from: "p1", to: "joined" }, { from: "p2", to: "joined" }],
      },
      caption: '"-".join(parts) is called on the separator string, not the list. It glues parts[0], parts[1], parts[2] back together with "-" between each one.',
    },
    {
      state: {
        nodes: [{ id: "empty", label: '"xyz"', tag: '"".join(["x","y","z"])', x: 3, y: 2, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: 'An empty-string separator concatenates the pieces with nothing in between: "".join(["x", "y", "z"]) gives "xyz".',
    },
    {
      state: {
        nodes: [{ id: "err", label: "TypeError", tag: '",".join([1, 2, 3])', x: 3, y: 2, shape: "box", emphasis: "error" }],
        arrows: [],
      },
      caption: "join() requires every element to already be a string. Handing it a list of integers directly raises a TypeError; each number would need str(n) first.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: 's = "a-b-c-d"\nresult = len(s.split("-"))\nWhat is result?',
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: '"a"', x: 0, y: 2, shape: "circle", emphasis: "new" },
              { id: "b", label: '"b"', x: 2, y: 2, shape: "circle", emphasis: "new" },
              { id: "c", label: '"c"', x: 4, y: 2, shape: "circle", emphasis: "new" },
              { id: "d", label: '"d"', x: 6, y: 2, shape: "circle", emphasis: "new" },
            ],
            arrows: [{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "d" }],
          },
          caption: 'Splitting `"a-b-c-d"` on `"-"` produces four pieces: `"a"`, `"b"`, `"c"`, `"d"`.',
        },
      ],
      options: [
        { id: "a", label: "3" },
        { id: "b", label: "4" },
        { id: "c", label: "5" },
        { id: "d", label: "It raises an error" },
      ],
      correctId: "b",
      explainWrong: {
        a: 'Splitting on a separator produces one more piece than there are separators. Three dashes in "a-b-c-d" create four pieces, not three.',
        c: 'There are only three dashes in "a-b-c-d", which produces four pieces. Miscounting the separators themselves as extra pieces overcounts here.',
        d: "split() on a normal string with a valid separator string never raises an error; there's nothing here that would fail.",
      },
      revealStep: {
        state: { nodes: [{ id: "result", label: "4", tag: "result", x: 3, y: 2, shape: "box", emphasis: "new" }], arrows: [] },
        caption: '`s.split("-")` gives `["a", "b", "c", "d"]`, a list of length `4`.',
      },
      reviewStep: 1,
    },
    {
      kind: "fillin",
      prompt: 'Fill in the separator so joining these date parts produces "2024-01-15".',
      code: ['parts = ["2024", "01", "15"]', 'result = "{{sep}}".join(parts)'].join("\n"),
      blanks: [
        {
          id: "sep",
          placeholder: "___",
          answer: "-",
          explainWrong:
            'The separator is whatever string join() is called on, on the left of the dot. To get the dashes in "2024-01-15", that string must be "-", not one of the pieces or an empty string.',
        },
      ],
      tests: [
        { name: 'result is "2024-01-15"', code: 'assert result == "2024-01-15", "result should be \\"2024-01-15\\": join the parts with \\"-\\" between each"' },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Given a list of strings `fields`, return them joined into one comma-separated line.",
      difficulty: "Easy",
      examples: [
        { input: '`fields = ["a", "b", "c"]`', output: '`"a,b,c"`' },
        { input: '`fields = []`', output: '`""`', explanation: 'Joining an empty list produces an empty string.' },
      ],
      constraints: ['`0 <= len(fields) <= 1000`', 'each element of `fields` is already a string'],
      bigO: { answer: "O(n)", explain: "`join()` visits every character across all elements of `fields` once." },
      starter: "def to_csv(fields):\n    # your code here\n    pass\n",
      solution: "def to_csv(fields):\n    return \",\".join(fields)\n",
      tests: [
        { name: 'to_csv(["a", "b", "c"]) is "a,b,c"', code: 'assert to_csv(["a", "b", "c"]) == "a,b,c", "to_csv([\\"a\\", \\"b\\", \\"c\\"]) should be \\"a,b,c\\": join with a comma"' },
        { name: 'to_csv(["single"]) is "single"', code: 'assert to_csv(["single"]) == "single", "to_csv([\\"single\\"]) should be \\"single\\": one element needs no separator inserted"' },
        { name: "to_csv([]) is empty string", code: 'assert to_csv([]) == "", "to_csv([]) should be \\"\\": joining an empty list produces an empty string"' },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "py-strings.split-join.1",
      prompt: '"one   two three".split() is called with no argument, and there are extra spaces between "one" and "two". How many elements does the result have?',
      options: ["3, since split() collapses any run of whitespace into one separator", "5, counting the empty strings between extra spaces", "2, since extra spaces merge \"one\" and \"two\""],
      correctIndex: 0,
      explainWrong: "Argument-less split() treats any run of consecutive whitespace as a single separator, so it never produces empty-string pieces from extra spaces. It gives exactly the words: 3 elements here.",
    },
    {
      id: "py-strings.split-join.2",
      prompt: '"-".join(["a", "b", "c"]) — which object is the separator called on?',
      options: ['The list ["a", "b", "c"]', 'The string "-"', 'The first element, "a"'],
      correctIndex: 1,
      explainWrong: "join() is a string method, so it's called on the separator string, here \"-\", and the list is passed in as its argument. It is not a method of the list.",
    },
    {
      id: "py-strings.split-join.3",
      prompt: 'What happens if you call ",".join([1, 2, 3]) on a list of integers?',
      options: [
        "It raises a TypeError, since join() requires every element to already be a string",
        "It automatically converts each number to a string first",
        "It silently skips the non-string elements",
      ],
      correctIndex: 0,
      explainWrong: "join() does not convert elements for you. Every item in the list must already be a string, or it raises a TypeError; numbers need str(n) applied first.",
    },
    {
      id: "py-strings.split-join.4",
      prompt: '"a,,b".split(",") — what does the empty spot between the two commas produce?',
      options: [
        'An empty string element, giving ["a", "", "b"]',
        "The empty spot is skipped, giving [\"a\", \"b\"]",
        "It raises an error, since two commas in a row aren't allowed",
      ],
      correctIndex: 0,
      explainWrong: "Unlike the no-argument form, split(\",\") with an explicit separator does not collapse repeats: two commas in a row create an empty-string element between them, not a skipped gap or an error.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-strings — combine slicing and split into a name formatter.
// ---------------------------------------------------------------------------

const applyStringsUnit: Unit = {
  id: "apply-strings",
  title: "Apply: Format a Name",
  watch: [
    {
      state: {
        nodes: [{ id: "full", label: '"Ada Lovelace"', tag: "full_name", x: 3, y: 2, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: 'full_name = "Ada Lovelace" is a single string with a space separating the first and last names.',
    },
    {
      state: {
        nodes: [
          { id: "p0", label: '"Ada"', tag: "parts[0]", x: 1, y: 1, shape: "circle", emphasis: "new" },
          { id: "p1", label: '"Lovelace"', tag: "parts[1]", x: 4, y: 1, shape: "circle", emphasis: "new" },
          { id: "result", label: '"Lovelace, A."', tag: "formatted", x: 3, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "p1", to: "result", emphasis: "active" }, { from: "p0", to: "result", emphasis: "active" }],
      },
      caption: 'full_name.split(" ") gives ["Ada", "Lovelace"]. Taking parts[1], then ", ", then parts[0][0] and "." builds "Lovelace, A.".',
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        'Given a string `full_name` in `"First Last"` format, return it reformatted as `"Last, F."` — the last name, a comma and space, then the first initial and a period. Use `split()` to separate the names and slicing to grab the first initial.',
      difficulty: "Easy",
      examples: [
        { input: '`full_name = "Ada Lovelace"`', output: '`"Lovelace, A."`' },
        { input: '`full_name = "Grace Hopper"`', output: '`"Hopper, G."`' },
      ],
      constraints: ['`full_name` always contains exactly one space separating first and last name'],
      bigO: { answer: "O(n)", explain: "`split()` scans every character of `full_name` once to find the separator." },
      // _viz is a provided helper for the visualizer; it is run before your code, not something you need to write
      starter: 'def format_name(full_name):\n    # split into first and last, then build "Last, F."\n    pass\n',
      solution: 'def format_name(full_name):\n    parts = full_name.split(" ")\n    return parts[1] + ", " + parts[0][0] + "."\n',
      hidden:
        'def _viz(name, xs):\n    nodes = [{"id": f"n{i}", "label": repr(v), "x": i, "y": 0} for i, v in enumerate(xs)]\n    nodes.insert(0, {"id": "var", "label": name, "x": 0, "y": 1, "shape": "box", "tag": "variable"})\n    arrows = [{"from": "var", "to": "n0"}] + [{"from": f"n{i}", "to": f"n{i+1}"} for i in range(len(xs) - 1)]\n    return {"nodes": nodes, "arrows": arrows}\n',
      tests: [
        { name: '"Ada Lovelace" becomes "Lovelace, A."', code: 'assert format_name("Ada Lovelace") == "Lovelace, A.", "format_name(\\"Ada Lovelace\\") should be \\"Lovelace, A.\\": last name, comma, space, first initial, period"' },
        { name: '"Grace Hopper" becomes "Hopper, G."', code: 'assert format_name("Grace Hopper") == "Hopper, G.", "format_name(\\"Grace Hopper\\") should be \\"Hopper, G.\\""' },
        { name: '"Guido Rossum" becomes "Rossum, G."', code: 'assert format_name("Guido Rossum") == "Rossum, G.", "format_name(\\"Guido Rossum\\") should be \\"Rossum, G.\\""' },
      ],
      vizExpr: '_viz("parts", "Ada Lovelace".split(" "))',
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-strings.apply-strings.1",
      prompt: '"Ada Lovelace".split(" ") produces what?',
      options: ['["Ada", "Lovelace"]', '"AdaLovelace"', 'The string "Ada Lovelace" unchanged'],
      correctIndex: 0,
      explainWrong: 'split(" ") breaks the string apart at each space, discarding the space itself, and returns a list of the pieces: ["Ada", "Lovelace"].',
    },
    {
      id: "py-strings.apply-strings.2",
      prompt: 'Why does first[0] give just the initial letter, like "A" from "Ada"?',
      options: [
        "Indexing a string with [0] returns the single character at position 0",
        "It converts the whole string to uppercase",
        "It removes every character except the first word",
      ],
      correctIndex: 0,
      explainWrong: "first[0] is plain indexing: it returns whatever single character sits at index 0 of the string first. It doesn't change case and it isn't about words versus characters here, since first is already a single word.",
    },
  ],
};

export const chStrings: Chapter = {
  id: "py-strings",
  phase: 1,
  title: "Strings",
  units: [indexingSlicingUnit, methodsUnit, splitJoinUnit, applyStringsUnit],
};
