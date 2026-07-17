import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: def-call — def builds a machine; calling feeds arguments in; return
// sends a value out to whatever box it gets assigned to.
// ---------------------------------------------------------------------------

const defCallUnit: Unit = {
  id: "def-call",
  title: "Def Builds a Machine, Call Runs It",
  watch: [
    {
      state: {
        nodes: [{ id: "fn", label: "square(x)", tag: "function", x: 2, y: 1, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "`def square(x): return x * x` builds a function machine. Defining it doesn't run anything yet.",
    },
    {
      state: {
        nodes: [
          { id: "fn", label: "square(x)", tag: "function", x: 2, y: 1, shape: "frame", emphasis: "dim" },
          { id: "call", label: "square(5)", tag: "x = 5", x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "fn", to: "call", emphasis: "active" }],
      },
      caption: "Calling `square(5)` feeds `5` into the machine: a new frame is pushed with `x` bound to `5`.",
    },
    {
      state: {
        nodes: [
          { id: "fn", label: "square(x)", tag: "function", x: 2, y: 1, shape: "frame", emphasis: "dim" },
          { id: "call", label: "square(5)", tag: "x = 5, computing x * x", x: 2, y: 3, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Inside the frame, `x * x` computes `25` from the value that was fed in.",
    },
    {
      state: {
        nodes: [
          { id: "fn", label: "square(x)", tag: "function", x: 2, y: 1, shape: "frame", emphasis: "dim" },
          { id: "result", label: "25", tag: "result", x: 2, y: 5, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`return` sends `25` out of the frame, which then pops off the stack, into the box named `result`.",
    },
    {
      state: {
        nodes: [{ id: "fn2", label: "greet(name)", tag: "function", x: 2, y: 1, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "`def greet(name): print(\"Hello, \" + name)` builds a different kind of machine: one with no `return` statement at all.",
    },
    {
      state: {
        nodes: [
          { id: "fn2", label: "greet(name)", tag: "function", x: 2, y: 1, shape: "frame", emphasis: "dim" },
          { id: "call2", label: 'greet("Sam")', tag: 'name = "Sam"', x: 2, y: 3, shape: "frame", emphasis: "active" },
          { id: "printed", label: '"Hello, Sam"', tag: "printed", x: 5, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "call2", to: "printed", emphasis: "active" }],
      },
      caption: '`greet("Sam")` prints `"Hello, Sam"` as a side effect while its frame is running.',
    },
    {
      state: {
        nodes: [
          { id: "printed", label: '"Hello, Sam"', tag: "printed", x: 5, y: 3, shape: "box", emphasis: "dim" },
          { id: "greeting", label: "None", tag: "greeting", x: 2, y: 5, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: '`greet`\'s frame pops without ever hitting a `return` statement, so `greeting = greet("Sam")` ends up holding `None`.',
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "def bar(n):\n    print(n * 2)\n    return n + 1\n\nx = bar(5)\nprint(x)\nWhat gets printed, in order?",
      steps: [
        {
          state: { nodes: [{ id: "n", label: "5", tag: "n", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
          caption: "`bar(5)` is called with `n` bound to `5`.",
        },
      ],
      options: [
        { id: "a", label: "10 then 6" },
        { id: "b", label: "6 then 10" },
        { id: "c", label: "10 then 10" },
        { id: "d", label: "6" },
      ],
      correctId: "a",
      explainWrong: {
        b: "print(n * 2) runs first, inside bar, before the function even returns; 10 is printed before 6, not after.",
        c: "The second print(x) shows what bar returned, not what it printed. bar returns n + 1, which is 6, not another 10.",
        d: "Two separate print calls both run: one inside bar (printing n * 2) and one after, printing x. Only counting one of them misses bar's own printed output.",
      },
      revealStep: {
        state: { nodes: [{ id: "x", label: "6", tag: "x", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
        caption: "`bar(5)` prints `10` as a side effect, then returns `6`, which gets stored in `x` and printed next.",
      },
      reviewStep: 6,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing keyword so double actually sends its computed value back, instead of just computing it and losing it.",
      code: ["def double(n):", "    {{kw}} n * 2"].join("\n"),
      blanks: [
        {
          id: "kw",
          placeholder: "___",
          answer: "return",
          explainWrong:
            "Without return, double computes n * 2 but never hands the value back to whoever called it; double(4) would give back None instead of 8.",
        },
      ],
      tests: [
        { name: "double(4) is 8", code: "assert double(4) == 8, \"double(4) should be 8: return must send n * 2 back to the caller\"" },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Given a rectangle's `width` and `height`, implement `rectangle_area(width, height)` that returns the rectangle's area (`width` times `height`).",
      starter: "def rectangle_area(width, height):\n    # your code here\n    pass\n",
      tests: [
        { name: "4 by 5 is 20", code: "assert rectangle_area(4, 5) == 20, \"rectangle_area(4, 5) should be 20: 4 * 5\"" },
        { name: "zero width is 0", code: "assert rectangle_area(0, 5) == 0, \"rectangle_area(0, 5) should be 0: anything times 0 is 0\"" },
        {
          name: "decimal sides",
          code: "assert rectangle_area(2.5, 4) == 10.0, \"rectangle_area(2.5, 4) should be 10.0: 2.5 * 4\"",
        },
      ],
      reviewStep: 2,
      difficulty: "Easy",
      examples: [
        { input: "width = 4, height = 5", output: "20", explanation: "`4 * 5 = 20`." },
        { input: "width = 0, height = 5", output: "0", explanation: "Anything times `0` is `0`." },
      ],
      constraints: ["`width` and `height` are non-negative numbers.", "Either side may be an `int` or a `float`."],
      bigO: { answer: "O(1)", explain: "`rectangle_area` does a single multiplication regardless of the input values." },
      solution: "def rectangle_area(width, height):\n    return width * height\n",
    },
  ],
  recall: [
    {
      id: "py-functions.def-call.1",
      prompt: "def square(x): return x * x defines a function. When does its body actually run?",
      options: [
        "Immediately, as soon as the def line finishes",
        "Only when the function is called, like square(5)",
        "Only the very first time the program starts",
      ],
      correctIndex: 1,
      explainWrong: "def only builds the function machine; it doesn't run the body. The body executes only when the function is actually called.",
    },
    {
      id: "py-functions.def-call.2",
      prompt: "A function runs to the end without ever hitting a return statement. What does calling it give back?",
      options: [
        "An error",
        "None",
        "The last value the function computed, even without return",
      ],
      correctIndex: 1,
      explainWrong:
        "Falling off the end of a function without a return statement is not an error, and Python doesn't guess at a 'last computed value' either. It simply gives back None.",
    },
    {
      id: "py-functions.def-call.3",
      prompt: 'def greet(name): print("Hi " + name), with no return line. What\'s the difference between what greet("Sam") prints and what it returns?',
      options: [
        'It prints "Hi Sam" as a side effect, but returns None since there\'s no return statement',
        'It returns "Hi Sam" and prints None',
        'It both prints and returns "Hi Sam"',
      ],
      correctIndex: 0,
      explainWrong:
        "print() and return do different jobs: print() only displays text as a side effect, it doesn't hand a value back. Since greet has no return statement, calling it gives back None, even though the greeting was printed.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: call-stack — frames stack up, newest on top; a frame's locals die
// the instant it pops on return.
// ---------------------------------------------------------------------------

const callStackUnit: Unit = {
  id: "call-stack",
  title: "Frames Stack Up, Newest on Top",
  watch: [
    {
      state: {
        nodes: [{ id: "main", label: "main()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "`main()` is called, pushing its frame onto the stack. It's the only frame there, at the bottom.",
    },
    {
      state: {
        nodes: [
          { id: "main", label: "main()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "dim" },
          { id: "f", label: "f()", tag: "locals: none", x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "main", to: "f", emphasis: "active" }],
      },
      caption: "Inside `main`, calling `f()` pushes a new frame on top. `main`'s frame pauses underneath and waits.",
    },
    {
      state: {
        nodes: [
          { id: "main", label: "main()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "dim" },
          { id: "f", label: "f()", tag: "locals: none", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "g", label: "g()", tag: "locals: none", x: 2, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "f", to: "g", emphasis: "active" }],
      },
      caption: "Inside `f`, `val = g()` calls `g()`. Its frame stacks on top of `f`'s, which sits on top of `main`'s: three frames deep.",
    },
    {
      state: {
        nodes: [
          { id: "main", label: "main()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "dim" },
          { id: "f", label: "f()", tag: "locals: none", x: 2, y: 3, shape: "frame", emphasis: "dim" },
          { id: "g", label: "g()", tag: "computing return 100", x: 2, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Inside `g`, `return 100` computes the value `g` is about to send back to whoever called it.",
    },
    {
      state: {
        nodes: [
          { id: "main", label: "main()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "dim" },
          { id: "f", label: "f()", tag: "val = 100", x: 2, y: 3, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "`g` returns `100`, and its frame is popped off the stack immediately: `g`'s local scope is gone for good. `f` resumes with `val` holding `100`.",
    },
    {
      state: {
        nodes: [
          { id: "main", label: "main()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "dim" },
          { id: "f", label: "f()", tag: "val = 100, computing val + 1", x: 2, y: 3, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "`f` computes `val + 1`, which comes out to `101`.",
    },
    {
      state: {
        nodes: [{ id: "main", label: "main()", tag: "result = 101", x: 2, y: 5, shape: "frame", emphasis: "active" }],
        arrows: [],
      },
      caption: "`f` returns `101` and its own frame pops too, taking `val` with it. `main` resumes with `result` holding `101`.",
    },
    {
      state: {
        nodes: [{ id: "printed", label: "101", tag: "printed by main", x: 2, y: 5, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "`main` prints `101`, then finishes. Its own frame pops as well, leaving the call stack empty.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "def inner():\n    return 1\n\ndef middle():\n    x = inner()\n    return x + 1\n\ndef outer():\n    y = middle()\n    return y + 1\n\nouter()\nAt the moment inner() is running, which frames are on the stack, listed from bottom to top?",
      steps: [
        {
          state: {
            nodes: [{ id: "outer", label: "outer()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "`outer()` begins; its frame is pushed first, at the bottom.",
        },
      ],
      options: [
        { id: "a", label: "outer, middle, inner" },
        { id: "b", label: "inner, middle, outer" },
        { id: "c", label: "outer, inner" },
        { id: "d", label: "middle, inner" },
      ],
      correctId: "a",
      explainWrong: {
        b: "The stack grows in call order, not reverse: outer, called first, stays at the bottom, and inner, called last, ends up on top.",
        c: "middle is missing here, but middle is the one that actually calls inner; its frame is still on the stack, paused between outer and inner.",
        d: "outer is missing. It's still paused at the very bottom of the stack the whole time, waiting for middle, and in turn inner, to finish.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "outer", label: "outer()", tag: "locals: none", x: 2, y: 5, shape: "frame", emphasis: "dim" },
            { id: "middle", label: "middle()", tag: "locals: none", x: 2, y: 3, shape: "frame", emphasis: "dim" },
            { id: "inner", label: "inner()", tag: "computing return 1", x: 2, y: 1, shape: "frame", emphasis: "active" },
          ],
          arrows: [],
        },
        caption: "Three frames deep: `outer` at the bottom, `middle` in the middle, `inner` on top and actively running.",
      },
      reviewStep: 2,
    },
    {
      kind: "predict",
      prompt:
        "def helper():\n    z = 99\n    return z\n\ndef main2():\n    result = helper()\n    return result\n\nmain2()\nAfter helper() returns, can you still reach z anywhere?",
      steps: [
        {
          state: {
            nodes: [{ id: "helper", label: "helper()", tag: "z = 99", x: 2, y: 3, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "Inside `helper`'s frame, `z` holds `99`, about to be returned.",
        },
      ],
      options: [
        { id: "a", label: "Yes, z still exists inside helper's frame" },
        { id: "b", label: "No, z was destroyed the moment helper's frame popped off the stack" },
        { id: "c", label: "Yes, but only from inside main2" },
      ],
      correctId: "b",
      explainWrong: {
        a: "helper's frame, and every local variable inside it including z, is removed from the stack as soon as helper returns. It doesn't linger for later use.",
        c: "main2 never had its own z; it only received helper's returned value through result. z itself lived solely inside helper's now-gone frame.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "main2", label: "main2()", tag: "result = 99", x: 2, y: 5, shape: "frame", emphasis: "active" }],
          arrows: [],
        },
        caption: "`helper`'s frame is gone, `z` along with it. `main2` resumes holding only what it captured: `result = 99`.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing keyword so square_it actually sends its result back to the caller.",
      code: ["def square_it(n):", "    value = n * n", "    {{kw}} value"].join("\n"),
      blanks: [
        {
          id: "kw",
          placeholder: "___",
          answer: "return",
          explainWrong:
            "Without return, square_it computes value but never sends it back; calling square_it(4) would give back None instead of 16, since a function with no return statement always returns None.",
        },
      ],
      tests: [
        { name: "square_it(4) is 16", code: "assert square_it(4) == 16, \"square_it(4) should be 16: return must send value back to the caller\"" },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Implement `double(n)`, which returns `n * 2`, and `double_twice(n)`, which returns the result of calling `double` on `n` and then calling `double` again on that result (chaining the first call's return value into the second call).",
      starter:
        "def double(n):\n    # your code here\n    pass\n\ndef double_twice(n):\n    # call double twice, using the first call's return value as the second call's input\n    pass\n",
      tests: [
        { name: "double(3) is 6", code: "assert double(3) == 6, \"double(3) should be 6: 3 * 2\"" },
        {
          name: "double_twice(3) is 12",
          code: "assert double_twice(3) == 12, \"double_twice(3) should be 12: double(3) is 6, then double(6) is 12\"",
        },
        {
          name: "double_twice(0) is 0",
          code: "assert double_twice(0) == 0, \"double_twice(0) should be 0: doubling 0 twice stays 0\"",
        },
      ],
      reviewStep: 6,
      difficulty: "Medium",
      examples: [
        { input: "n = 3", output: "double(3) = 6, double_twice(3) = 12", explanation: "`double(3)` is `6`, then `double(6)` is `12`." },
        { input: "n = 0", output: "double_twice(0) = 0", explanation: "Doubling `0` twice stays `0`." },
      ],
      constraints: ["`n` is an `int`.", "`double_twice` must call `double` twice, chaining the first return value into the second call."],
      bigO: { fn: "double_twice", answer: "O(1)", explain: "`double` and `double_twice` each do a fixed, constant number of multiplications." },
      solution:
        "def double(n):\n    return n * 2\n\ndef double_twice(n):\n    return double(double(n))\n",
    },
  ],
  recall: [
    {
      id: "py-functions.call-stack.1",
      prompt: "When a function returns, what happens to its frame on the call stack?",
      options: [
        "It stays on the stack in case the function is called again",
        "It's popped off immediately, and its local variables are destroyed with it",
        "It moves to the bottom of the stack for later",
      ],
      correctIndex: 1,
      explainWrong:
        "Frames don't linger or relocate. The instant a function returns, its frame, and every local variable inside it, is removed from the stack for good.",
    },
    {
      id: "py-functions.call-stack.2",
      prompt: "In outer() calling middle() calling inner(), which frame sits at the very bottom of the stack the entire time?",
      options: [
        "outer, since it was called first and is still paused waiting for the others to finish",
        "middle, since it's in between",
        "inner, since it's running most recently",
      ],
      correctIndex: 0,
      explainWrong:
        "The first frame pushed stays at the bottom until everything above it finishes. That's outer here; middle and inner are stacked above it and are the ones that come and go.",
    },
    {
      id: "py-functions.call-stack.3",
      prompt: "Can a function read a local variable belonging to a frame that has already returned?",
      options: [
        "Yes, as long as the variable name matches",
        "No, that frame and everything inside it are already gone",
        "Yes, but only if the variable held a number",
      ],
      correctIndex: 1,
      explainWrong:
        "A returned frame is removed from the stack entirely. There's nothing left to read from; matching the name or the type of the value doesn't change that it's gone.",
    },
    {
      id: "py-functions.call-stack.4",
      prompt: "Why do function calls need to stack, last one in, first one out, instead of all running at once?",
      options: [
        "So each paused caller can resume exactly where it left off, with its own local variables intact",
        "Because Python can only run one function definition at a time",
        "Because global variables would otherwise conflict",
      ],
      correctIndex: 0,
      explainWrong:
        "The stacking order is what lets a paused caller pick back up correctly once the function it called finishes: its frame, with all its locals, was waiting right where it left off. This isn't about definitions running one at a time or about global variable conflicts.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: scope — same name, different boxes; local shadows global.
// ---------------------------------------------------------------------------

const scopeUnit: Unit = {
  id: "scope",
  title: "Same Name, Different Boxes",
  watch: [
    {
      state: {
        nodes: [{ id: "gx", label: '"outside"', tag: "x (global)", x: 2, y: 1, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: '`x = "outside"` at the top level creates a variable living in the global scope.',
    },
    {
      state: {
        nodes: [
          { id: "gx", label: '"outside"', tag: "x (global)", x: 2, y: 1, shape: "box" },
          { id: "fn", label: "show_local()", tag: "function", x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`def show_local():` defines a function machine. It hasn't run yet, so no local `x` exists.",
    },
    {
      state: {
        nodes: [
          { id: "gx", label: '"outside"', tag: "x (global)", x: 2, y: 1, shape: "box" },
          { id: "frame", label: "show_local()", tag: "locals: none yet", x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "`show_local()` is called, pushing its own frame. So far it has no local variables.",
    },
    {
      state: {
        nodes: [
          { id: "gx", label: '"outside"', tag: "x (global)", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "frame", label: "show_local()", tag: 'local x = "inside"', x: 2, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: '`x = "inside"` inside the function creates a brand new local `x`, a completely separate box from the global `x` above.',
    },
    {
      state: {
        nodes: [
          { id: "gx", label: '"outside"', tag: "x (global)", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "frame", label: "show_local()", tag: 'local x = "inside"', x: 2, y: 3, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "`print(x)` inside the function reads the local `x` and prints `'inside'`, shadowing the global `x`, which sits untouched above.",
    },
    {
      state: {
        nodes: [{ id: "gx", label: '"outside"', tag: "x (global)", x: 2, y: 1, shape: "box" }],
        arrows: [],
      },
      caption: "`show_local()` returns; its frame pops, and the local `x` is destroyed along with it.",
    },
    {
      state: {
        nodes: [{ id: "gx", label: '"outside"', tag: "x (global)", x: 2, y: 1, shape: "box", emphasis: "active" }],
        arrows: [],
      },
      caption: "`print(x)` at the top level now reads the global `x`, still `'outside'`. It was never touched by the function's local shadow.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "x = 10\n\ndef show():\n    x = 20\n    print(x)\n\nshow()\nprint(x)\nWhat do the two print calls output, in order?",
      steps: [
        {
          state: { nodes: [{ id: "gx", label: "10", tag: "x (global)", x: 2, y: 1, shape: "box", emphasis: "new" }], arrows: [] },
          caption: "`x = 10` lives in the global scope, before `show()` runs.",
        },
      ],
      options: [
        { id: "a", label: "20 then 20" },
        { id: "b", label: "20 then 10" },
        { id: "c", label: "10 then 20" },
        { id: "d", label: "10 then 10" },
      ],
      correctId: "b",
      explainWrong: {
        a: "The second print(x) runs outside show(), where only the global x exists; show()'s local x = 20 never reaches out and changes it.",
        c: "The order is reversed: show()'s print(x) runs first and reads its own local x = 20, not the global 10.",
        d: "Inside show(), x = 20 creates a local x that shadows the global one, so the first print reads 20, not the untouched global value.",
      },
      revealStep: {
        state: { nodes: [{ id: "gx", label: "10", tag: "x (global)", x: 2, y: 1, shape: "box", emphasis: "active" }], arrows: [] },
        caption: "`show()` prints `20` using its own local `x`; once it returns, that local `x` is gone, and the final `print(x)` reads the global `x`, still `10`.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "The function body below refers to n. Fill in the parameter name so n is defined when triple is called.",
      code: ["def triple({{param}}):", "    return n * 3"].join("\n"),
      blanks: [
        {
          id: "param",
          placeholder: "___",
          answer: "n",
          explainWrong:
            "The parameter name is what creates the local variable the body refers to. Naming it anything other than n leaves n undefined inside the function, and n * 3 would raise a NameError.",
        },
      ],
      tests: [
        {
          name: "triple(5) is 15",
          code: "assert triple(5) == 15, \"triple(5) should be 15: the parameter must be named n so the body's n * 3 refers to it\"",
        },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Given a list `items`, implement `remove_duplicates(items)` that returns a NEW list with duplicates removed, keeping each value's first occurrence and preserving order. The returned list must be a different object from `items`, and `items` itself must not be mutated.",
      starter: "def remove_duplicates(items):\n    # return a new list; do not mutate items\n    pass\n",
      tests: [
        {
          name: "duplicates removed, order kept",
          code:
            "assert remove_duplicates([1, 2, 2, 3, 1]) == [1, 2, 3], \"remove_duplicates([1, 2, 2, 3, 1]) should be [1, 2, 3]: keep each value's first appearance, in order\"",
        },
        {
          name: "original list is untouched",
          code:
            "original = [1, 2, 2, 3, 1]\nremove_duplicates(original)\nassert original == [1, 2, 2, 3, 1], \"original should still be [1, 2, 2, 3, 1]: remove_duplicates must return a new list, never modify the list it was given\"",
        },
        {
          name: "result is a separate object",
          code:
            "original2 = [4, 5]\nresult = remove_duplicates(original2)\nassert result is not original2, \"the returned list must be a new object, not items itself: returning items directly would let future changes to one silently affect the other\"",
        },
      ],
      reviewStep: 6,
      difficulty: "Medium",
      examples: [
        {
          input: "items = `[1, 2, 2, 3, 1]`",
          output: "`[1, 2, 3]`",
          explanation: "Each value's first appearance is kept, in order; later duplicates are dropped.",
        },
        {
          input: "items = `[4, 5]`",
          output: "a NEW list equal to `[4, 5]`",
          explanation: "The result must be `is not items`, and `items` must remain unchanged after the call.",
        },
      ],
      constraints: [
        "`items` is a list of hashable values (e.g. `int`, `str`).",
        "Must not mutate `items` in place.",
        "Must return a brand new list object, not `items` itself.",
      ],
      bigO: { answer: "O(n)", explain: "`remove_duplicates` scans every element of `items` once to build the deduplicated result." },
      solution:
        "def remove_duplicates(items):\n    result = []\n    for item in items:\n        if item not in result:\n            result.append(item)\n    return result\n",
    },
  ],
  recall: [
    {
      id: "py-functions.scope.1",
      prompt: "A function creates a local variable with the same name as an existing global variable. What happens?",
      options: [
        "Python raises an error for the name clash",
        "The local variable shadows the global one inside the function; the global is left untouched",
        "The global variable's value gets overwritten everywhere",
      ],
      correctIndex: 1,
      explainWrong:
        "Python allows this without error. The local variable lives in its own box inside the function's frame and simply shadows the global name while the function runs; the global variable outside is never touched.",
    },
    {
      id: "py-functions.scope.2",
      prompt: "After a function's frame pops off the call stack, what happens to the local variables that lived inside it?",
      options: [
        "They're destroyed along with the frame",
        "They become global variables",
        "They stay available for the next function call",
      ],
      correctIndex: 0,
      explainWrong:
        "Local variables exist only as long as their frame does. Once the frame pops, they're gone; they never get promoted to globals or carried over into the next call.",
    },
    {
      id: "py-functions.scope.3",
      prompt: "Why should a function often build and return a NEW list instead of mutating the list it was given?",
      options: [
        "Because mutating lists is not allowed in Python",
        "Because the caller may not expect their list to change, so a fresh list keeps the function's effect predictable and contained",
        "Because building a new list always runs faster",
      ],
      correctIndex: 1,
      explainWrong:
        "Mutating lists is perfectly legal in Python, and returning a new list isn't about speed. It's about not silently changing something the caller still holds a reference to elsewhere.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-functions — refactor repeated code into a function.
// ---------------------------------------------------------------------------

const applyFunctionsUnit: Unit = {
  id: "apply-functions",
  title: "Apply: One Tax Function, Not Three",
  watch: [
    {
      state: {
        nodes: [
          { id: "item1", label: "12.00 * 1.08 = 12.96", tag: "cart item 1", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "item2", label: "8.00 * 1.08 = 8.64", tag: "cart item 2", x: 3, y: 1, shape: "box", emphasis: "new" },
          { id: "item3", label: "20.00 * 1.08 = 21.60", tag: "cart item 3", x: 5, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Tax is computed with `price * 1.08` written out three separate times. If the tax rate ever changes, all three places need editing.",
    },
    {
      state: {
        nodes: [
          { id: "fn", label: "with_tax(price)", tag: "function", x: 3, y: 1, shape: "frame", emphasis: "new" },
          { id: "item1", label: "12.96", tag: "with_tax(12.00)", x: 1, y: 3, shape: "box", emphasis: "active" },
          { id: "item2", label: "8.64", tag: "with_tax(8.00)", x: 3, y: 3, shape: "box", emphasis: "active" },
          { id: "item3", label: "21.60", tag: "with_tax(20.00)", x: 5, y: 3, shape: "box", emphasis: "active" },
        ],
        arrows: [
          { from: "fn", to: "item1", emphasis: "active" },
          { from: "fn", to: "item2", emphasis: "active" },
          { from: "fn", to: "item3", emphasis: "active" },
        ],
      },
      caption: "Refactored into one `with_tax(price)` function, all three call sites reuse it. Now the tax rate lives in exactly one place.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Refactor the repeated tax math into `with_tax(price)`, which returns `price` multiplied by `1.08`. Then implement `compute_totals()`, which calls `with_tax` for the prices `12.00`, `8.00`, and `20.00` and returns the results as a list `[total1, total2, total3]`.",
      starter:
        "def with_tax(price):\n    # your code here\n    pass\n\ndef compute_totals():\n    # use with_tax for each price below, don't repeat the tax math\n    pass\n",
      tests: [
        {
          name: "with_tax(12.00) is 12.96",
          code: "assert round(with_tax(12.00), 2) == 12.96, \"with_tax(12.00) should be 12.96: 12.00 * 1.08\"",
        },
        {
          name: "with_tax(8.00) is 8.64",
          code: "assert round(with_tax(8.00), 2) == 8.64, \"with_tax(8.00) should be 8.64: 8.00 * 1.08\"",
        },
        {
          name: "compute_totals uses with_tax for all three prices",
          code:
            "result = compute_totals()\nrounded = [round(v, 2) for v in result]\nassert rounded == [12.96, 8.64, 21.6], \"compute_totals() should return [12.96, 8.64, 21.6]: each price run through the same with_tax function\"",
        },
      ],
      reviewStep: 1,
      difficulty: "Medium",
      examples: [
        { input: "price = 12.00", output: "12.96", explanation: "`with_tax(12.00)` is `12.00 * 1.08`." },
        {
          input: "compute_totals()",
          output: "`[12.96, 8.64, 21.6]`",
          explanation: "Each of `12.00`, `8.00`, `20.00` is run through the same `with_tax` function.",
        },
      ],
      constraints: [
        "`with_tax` must be the single place the `1.08` tax rate is applied.",
        "`compute_totals` must call `with_tax` for each price rather than repeating the multiplication.",
      ],
      bigO: { fn: "compute_totals", answer: "O(1)", explain: "`compute_totals` calls `with_tax` a fixed three times, so its work doesn't grow with input." },
      solution:
        "def with_tax(price):\n    return price * 1.08\n\ndef compute_totals():\n    return [with_tax(12.00), with_tax(8.00), with_tax(20.00)]\n",
    },
  ],
  recall: [
    {
      id: "py-functions.apply-functions.1",
      prompt: 'Why refactor three separate "price * 1.08" calculations into one with_tax(price) function?',
      options: [
        "So the tax rate only needs updating in one place if it ever changes",
        "Because Python requires functions for any math",
        "Because it makes the code run faster",
      ],
      correctIndex: 0,
      explainWrong:
        "Python has no such requirement, and a single multiplication isn't meaningfully faster inside a function. The real win is maintainability: one function means one place to fix if the tax rate changes.",
    },
    {
      id: "py-functions.apply-functions.2",
      prompt: "After refactoring, compute_totals() calls with_tax(price) three times. What does each call get?",
      options: [
        "Its own frame, with its own local price parameter, independent of the others",
        "All three calls share the same frame and price value",
        "Only the first call actually runs; the rest are skipped",
      ],
      correctIndex: 0,
      explainWrong:
        "Every call to with_tax pushes a fresh frame with its own local price, just like any other function call. The calls don't share a frame, and none of them are skipped.",
    },
  ],
};

export const chFunctions: Chapter = {
  id: "py-functions",
  phase: 1,
  title: "Functions and the Call Stack",
  units: [defCallUnit, callStackUnit, scopeUnit, applyFunctionsUnit],
};
