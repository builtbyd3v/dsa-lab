import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: blueprint-instances — a class is a template shape; each instance
// created from it is its own separate box with its own attribute arrows.
// ---------------------------------------------------------------------------

const blueprintInstancesUnit: Unit = {
  id: "blueprint-instances",
  title: "A Class Is a Blueprint, Instances Are Separate Boxes",
  watch: [
    {
      state: {
        nodes: [{ id: "cls", label: "Dog", tag: "class (blueprint)", x: 3, y: 0, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "class Dog: defines a blueprint, a template describing what every Dog object will look like. Defining it doesn't create any dogs yet.",
    },
    {
      state: {
        nodes: [
          { id: "cls", label: "Dog", tag: "class (blueprint)", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "d1", label: "d1", tag: "instance of Dog", x: 1, y: 2, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "cls", to: "d1", emphasis: "active" }],
      },
      caption: "d1 = Dog() calls the class, creating a new instance: a separate object built from the blueprint, not the blueprint itself.",
    },
    {
      state: {
        nodes: [
          { id: "cls", label: "Dog", tag: "class (blueprint)", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "d1", label: "d1", tag: "instance of Dog", x: 1, y: 2, shape: "frame" },
          { id: "name1", label: '"Rex"', tag: "d1.name", x: 1, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "cls", to: "d1" }, { from: "d1", to: "name1", emphasis: "active" }],
      },
      caption: "d1.name = \"Rex\" gives THIS instance its own name attribute, stored inside d1, not inside the class.",
    },
    {
      state: {
        nodes: [
          { id: "cls", label: "Dog", tag: "class (blueprint)", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "d1", label: "d1", tag: "instance of Dog", x: 1, y: 2, shape: "frame", emphasis: "dim" },
          { id: "name1", label: '"Rex"', tag: "d1.name", x: 1, y: 4, shape: "box", emphasis: "dim" },
          { id: "d2", label: "d2", tag: "instance of Dog", x: 5, y: 2, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "cls", to: "d1" }, { from: "d1", to: "name1" }, { from: "cls", to: "d2", emphasis: "active" }],
      },
      caption: "d2 = Dog() calls the class again, creating a SECOND, completely separate instance. d1 and its attribute are untouched.",
    },
    {
      state: {
        nodes: [
          { id: "d1", label: "d1", tag: "instance of Dog", x: 1, y: 2, shape: "frame", emphasis: "dim" },
          { id: "name1", label: '"Rex"', tag: "d1.name", x: 1, y: 4, shape: "box", emphasis: "dim" },
          { id: "d2", label: "d2", tag: "instance of Dog", x: 5, y: 2, shape: "frame" },
          { id: "name2", label: '"Biscuit"', tag: "d2.name", x: 5, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "d1", to: "name1" }, { from: "d2", to: "name2", emphasis: "active" }],
      },
      caption: "d2.name = \"Biscuit\" gives d2 its own name attribute. It does not share or overwrite d1's; d1.name is still \"Rex\".",
    },
    {
      state: {
        nodes: [
          { id: "d1", label: "d1", tag: "instance of Dog", x: 1, y: 2, shape: "frame" },
          { id: "name1", label: '"Rex"', tag: "d1.name", x: 1, y: 4, shape: "box", emphasis: "active" },
          { id: "d2", label: "d2", tag: "instance of Dog", x: 5, y: 2, shape: "frame" },
          { id: "name2", label: '"Biscuit"', tag: "d2.name", x: 5, y: 4, shape: "box", emphasis: "active" },
        ],
        arrows: [{ from: "d1", to: "name1", emphasis: "active" }, { from: "d2", to: "name2", emphasis: "active" }],
      },
      caption: "d1 and d2 each carry their own independent set of attributes, even though both were built from the exact same Dog blueprint.",
    },
    {
      state: {
        nodes: [{ id: "err", label: "AttributeError", tag: "Dog.name", x: 3, y: 2, shape: "box", emphasis: "error" }],
        arrows: [],
      },
      caption: "The class Dog itself never got a name attribute; only the instances did. Trying Dog.name directly raises an AttributeError.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: 'class Cat:\n    pass\n\nc1 = Cat()\nc2 = Cat()\nc1.color = "black"\nprint(c2.color)\nWhat happens?',
      steps: [
        {
          state: {
            nodes: [
              { id: "c1", label: "c1", tag: "instance", x: 1, y: 2, shape: "frame" },
              { id: "col", label: '"black"', tag: "c1.color", x: 1, y: 4, shape: "box", emphasis: "new" },
              { id: "c2", label: "c2", tag: "instance", x: 5, y: 2, shape: "frame", emphasis: "active" },
            ],
            arrows: [{ from: "c1", to: "col" }],
          },
          caption: "`c1.color` was set, but `c2` is a separate instance with no `color` attribute of its own.",
        },
      ],
      options: [
        { id: "a", label: 'Prints "black"' },
        { id: "b", label: "Raises an AttributeError" },
        { id: "c", label: "Prints None" },
        { id: "d", label: 'Prints "" (empty string)' },
      ],
      correctId: "b",
      explainWrong: {
        a: "c1 and c2 are separate instances. Setting c1.color only adds that attribute to c1; it never appears on c2.",
        c: "Python doesn't invent a default value like None for an attribute nobody ever set on that instance. Accessing it raises an error instead.",
        d: "There's no empty-string default either. c2 simply has no color attribute at all until something explicitly sets one.",
      },
      revealStep: {
        state: { nodes: [{ id: "err", label: "AttributeError", tag: "c2.color", x: 3, y: 2, shape: "box", emphasis: "error" }], arrows: [] },
        caption: "`c2` never had `color` set on it, so `c2.color` raises an `AttributeError`.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the call syntax that creates a new Point instance from the class below.",
      code: ["class Point:", "    pass", "", "p1 = Point{{call}}"].join("\n"),
      blanks: [
        {
          id: "call",
          placeholder: "___",
          answer: "()",
          explainWrong:
            "Creating an instance means calling the class like a function: Point(). Without the parentheses, Point{{call}} would just refer to the class itself, not build a new instance.",
        },
      ],
      tests: [
        { name: "p1 is a Point instance", code: 'assert isinstance(p1, Point), "p1 should be an instance of Point: Point() calls the class to build a new object"' },
      ],
      reviewStep: 1,
    },
    {
      kind: "write",
      prompt:
        "Given the class `class Dog: pass`, implement `make_two_dogs()` that creates two separate `Dog` instances, sets a different `.name` on each, and returns a tuple `(first_name, second_name)`.",
      difficulty: "Easy",
      examples: [
        {
          input: "make_two_dogs()",
          output: '("Rex", "Biscuit")',
          explanation: "Each `Dog` instance gets its own `.name`, and the two names must differ.",
        },
      ],
      constraints: ["Both returned names must be strings", "The two names must not be equal"],
      bigO: { answer: "O(1)", explain: "Creating two `Dog` instances and setting one attribute each is a fixed amount of work." },
      starter: "class Dog:\n    pass\n\ndef make_two_dogs():\n    # create two Dog() instances with different .name attributes\n    pass\n",
      solution:
        'class Dog:\n    pass\n\ndef make_two_dogs():\n    d1 = Dog()\n    d2 = Dog()\n    d1.name = "Rex"\n    d2.name = "Biscuit"\n    return (d1.name, d2.name)\n',
      tests: [
        {
          name: "returns two different names",
          code:
            'names = make_two_dogs()\nassert names[0] != names[1], "the two names should differ: each Dog instance needs its own distinct .name"',
        },
        {
          name: "both are strings",
          code: 'names = make_two_dogs()\nassert isinstance(names[0], str) and isinstance(names[1], str), "both names should be strings, one per Dog instance"',
        },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "py-classes.blueprint-instances.1",
      prompt: "What is the difference between a class and an instance?",
      options: [
        "A class is a blueprint describing structure; an instance is a specific object built from that blueprint",
        "They're the same thing, just different names",
        "A class can only ever produce one instance",
      ],
      correctIndex: 0,
      explainWrong: "A class only describes what instances will look like; it is not itself an object you use directly. Calling the class, like Dog(), is what produces an actual instance, and a class can produce as many instances as you want.",
    },
    {
      id: "py-classes.blueprint-instances.2",
      prompt: "d1 = Dog() and d2 = Dog() are both created. d1.name is set, but d2.name is not. What happens if you access d2.name?",
      options: [
        "It raises an AttributeError, since d2 never got its own name attribute",
        "It returns d1's name, since they came from the same class",
        "It returns an empty string by default",
      ],
      correctIndex: 0,
      explainWrong: "Each instance stores its own attributes independently. d1 and d2 share no data just because they came from the same class; since d2 never had name set, accessing it raises an AttributeError.",
    },
    {
      id: "py-classes.blueprint-instances.3",
      prompt: "Does writing class Dog: pass by itself create any Dog objects?",
      options: [
        "No, it only defines the blueprint; instances only appear when Dog() is actually called",
        "Yes, one default instance is created automatically",
        "Yes, but it's invisible until you assign it to a variable",
      ],
      correctIndex: 0,
      explainWrong: "A class statement only builds the template. No instance exists in memory until the class is actually called, like Dog(), which is a separate step that happens later, if at all.",
    },
    {
      id: "py-classes.blueprint-instances.4",
      prompt: "Why does accessing an attribute that was never set on a particular instance raise an error instead of returning something like None?",
      options: [
        "Because Python only tracks attributes that were actually assigned; there's no attribute to look up until something sets it",
        "Because None is reserved and can never be an attribute's value",
        "Because attributes must be declared in advance in every class",
      ],
      correctIndex: 0,
      explainWrong: "Instances don't come pre-loaded with placeholder attributes. An attribute simply doesn't exist on an instance until some code assigns it, so looking it up before that raises an AttributeError rather than silently returning None.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: constructors-methods — __init__ fills in attributes when an
// instance is created; methods read those attributes back through self.
// ---------------------------------------------------------------------------

const constructorsMethodsUnit: Unit = {
  id: "constructors-methods",
  title: "__init__ Fills Attributes, Methods Read Them Through self",
  watch: [
    {
      state: {
        nodes: [{ id: "cls", label: "Dog", tag: "__init__ defined (constructor)", x: 3, y: 0, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: "__init__ is a special method that runs automatically whenever Dog(...) is called. It's where a new instance gets its attributes filled in.",
    },
    {
      state: {
        nodes: [
          { id: "cls", label: "Dog", tag: "__init__ defined", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "d", label: "d", tag: 'self, name="Rex", age=3', x: 3, y: 2, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "cls", to: "d", emphasis: "active" }],
      },
      caption: 'd = Dog("Rex", 3) creates a new instance and passes it in as self, along with "Rex" and 3, into __init__.',
    },
    {
      state: {
        nodes: [
          { id: "d", label: "d", tag: "instance", x: 3, y: 1, shape: "frame" },
          { id: "name", label: '"Rex"', tag: "self.name", x: 1, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "d", to: "name", emphasis: "active" }],
      },
      caption: 'self.name = name stores "Rex" onto THIS specific instance. self means "the object currently being built."',
    },
    {
      state: {
        nodes: [
          { id: "d", label: "d", tag: "instance", x: 3, y: 1, shape: "frame" },
          { id: "name", label: '"Rex"', tag: "self.name", x: 1, y: 3, shape: "box" },
          { id: "age", label: "3", tag: "self.age", x: 5, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "d", to: "name" }, { from: "d", to: "age", emphasis: "active" }],
      },
      caption: "The same happens for age. Once __init__ finishes, d has both attributes filled in and ready to use.",
    },
    {
      state: {
        nodes: [
          { id: "d", label: "d", tag: "instance", x: 3, y: 0, shape: "frame", emphasis: "dim" },
          { id: "name", label: '"Rex"', tag: "self.name", x: 1, y: 2, shape: "box", emphasis: "active" },
          { id: "call", label: "d.bark()", tag: "self = d", x: 3, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "call", to: "d" }, { from: "call", to: "name", emphasis: "active" }],
      },
      caption: "d.bark() automatically passes d in as self, so the method can read this instance's own name attribute, not some other dog's.",
    },
    {
      state: {
        nodes: [{ id: "result", label: '"Rex says woof!"', tag: "return value", x: 3, y: 2, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "bark() builds and returns a string using the instance's own data. A different dog, with a different self.name, would return a different greeting.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "class Item:\n    def __init__(self, price):\n        self.price = price\n\n    def with_tax(self):\n        return self.price * 1.1\n\ni = Item(10)\nprint(i.with_tax())\nWhat prints?",
      steps: [
        {
          state: {
            nodes: [
              { id: "i", label: "i", tag: "instance", x: 2, y: 1, shape: "frame" },
              { id: "price", label: "10", tag: "self.price", x: 2, y: 3, shape: "box", emphasis: "active" },
            ],
            arrows: [{ from: "i", to: "price", emphasis: "active" }],
          },
          caption: "`i.with_tax()` passes `i` as `self`, so `self.price` reads `10`.",
        },
      ],
      options: [
        { id: "a", label: "11.0" },
        { id: "b", label: 'TypeError: with_tax() takes no arguments but 1 was given' },
        { id: "c", label: "10" },
        { id: "d", label: "AttributeError: Item has no price" },
      ],
      correctId: "a",
      explainWrong: {
        b: "i.with_tax() looks like a call with zero arguments, but Python automatically passes i itself as self. That's exactly the one argument with_tax(self) expects; nothing is missing.",
        c: "with_tax() doesn't just return self.price unchanged; it multiplies by 1.1 to add tax, giving 11.0, not the plain original price.",
        d: '__init__ already ran when Item(10) was called, storing 10 into self.price. By the time with_tax() runs, that attribute already exists on i.',
      },
      revealStep: {
        state: { nodes: [{ id: "result", label: "11.0", tag: "i.with_tax()", x: 3, y: 2, shape: "box", emphasis: "new" }], arrows: [] },
        caption: "`self.price` is `10`, and `10 * 1.1` is `11.0`.",
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing first parameter every instance method needs.",
      code: ["class Dog:", "    def __init__({{param}}, name):", "        self.name = name"].join("\n"),
      blanks: [
        {
          id: "param",
          placeholder: "___",
          answer: "self",
          explainWrong:
            "Every instance method, including __init__, needs self as its first parameter so Python can pass in the instance being created or acted on. Without it, name itself would end up bound to the instance, and self.name = name would fail.",
        },
      ],
      tests: [
        { name: "instance gets its name", code: 'd = Dog("Rex")\nassert d.name == "Rex", "d.name should be \\"Rex\\": self must be the first parameter so name binds correctly"' },
      ],
      reviewStep: 2,
    },
    {
      kind: "write",
      prompt:
        "Implement a class `Counter` with `__init__(self, start=0)` that sets `self.count` to `start`, and a method `increment(self)` that adds `1` to `self.count` and returns the new count.",
      difficulty: "Medium",
      examples: [
        {
          input: "c = Counter(); c.increment()",
          output: "1",
          explanation: "`increment()` adds 1 to `self.count` and returns the new value.",
        },
        { input: "c2 = Counter(10); c2.increment(); c2.increment()", output: "c2.count == 12" },
      ],
      constraints: [
        "`start` defaults to `0` when omitted",
        "each `Counter` instance keeps its own independent `count`",
      ],
      bigO: { fn: "increment", answer: "O(1)", explain: "`increment` just reads and updates `self.count`, one attribute access regardless of how many times it's called." },
      starter: "class Counter:\n    def __init__(self, start=0):\n        # your code here\n        pass\n\n    def increment(self):\n        # your code here\n        pass\n",
      solution:
        "class Counter:\n    def __init__(self, start=0):\n        self.count = start\n\n    def increment(self):\n        self.count += 1\n        return self.count\n",
      tests: [
        { name: "starts at 0 by default", code: 'c = Counter()\nassert c.count == 0, "Counter() with no argument should start count at 0"' },
        { name: "increment adds 1 and returns it", code: 'c = Counter()\nresult = c.increment()\nassert result == 1, "increment() should return 1 after the first call, and update self.count to match"' },
        { name: "custom start works", code: 'c2 = Counter(10)\nc2.increment()\nc2.increment()\nassert c2.count == 12, "Counter(10) then two increments should leave count at 12"' },
        { name: "counters are independent", code: 'a = Counter()\nb = Counter()\na.increment()\nassert b.count == 0, "b should still be 0: each Counter instance keeps its own separate count"' },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "py-classes.constructors-methods.1",
      prompt: "When does __init__ run?",
      options: [
        "Automatically, every time the class is called to create a new instance",
        "Only if you call it manually after creating the instance",
        "Once per program, the first time the class is used",
      ],
      correctIndex: 0,
      explainWrong: "__init__ isn't optional or manually triggered. Python calls it automatically every single time the class is called, like Dog(\"Rex\", 3), right as that new instance is being built.",
    },
    {
      id: "py-classes.constructors-methods.2",
      prompt: "Inside a method, what does self refer to?",
      options: [
        "The specific instance the method was called on",
        "The class itself, shared by every instance",
        "A brand new, empty object created just for that method call",
      ],
      correctIndex: 0,
      explainWrong: "self is not the class and not a fresh throwaway object. It's a reference to the exact instance the method was called through, like d in d.bark(), so the method can read and change that instance's own attributes.",
    },
    {
      id: "py-classes.constructors-methods.3",
      prompt: "d.bark() is called on an instance d. Do you need to pass d in yourself as an argument?",
      options: [
        "No, Python automatically passes d in as the method's self parameter",
        "Yes, you must write d.bark(d)",
        "No, but only because bark() takes zero parameters",
      ],
      correctIndex: 0,
      explainWrong: "Calling a method through an instance, like d.bark(), automatically supplies that instance as self behind the scenes. Writing d.bark(d) would actually pass d twice and cause an error, since bark only expects self.",
    },
    {
      id: "py-classes.constructors-methods.4",
      prompt: "Two Dog instances, d1 and d2, are created with different names. Does calling d1.bark() ever read d2's name?",
      options: [
        "No, self inside the method is bound to d1 specifically, so it only ever sees d1's own attributes",
        "Yes, since both came from the same class, they share attributes",
        "It depends on which one was created first",
      ],
      correctIndex: 0,
      explainWrong: "Each instance keeps its own separate attributes. When you call d1.bark(), self is bound to d1 alone; there's no mechanism by which it would reach into d2's data instead.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: dunder-custom — __str__ controls what print shows; __eq__
// controls whether == compares by value instead of by identity.
// ---------------------------------------------------------------------------

const dunderCustomUnit: Unit = {
  id: "dunder-custom",
  title: "Dunder Methods Customize print and ==",
  watch: [
    {
      state: {
        nodes: [
          { id: "p", label: "p", tag: "instance", x: 3, y: 1, shape: "frame" },
          { id: "x", label: "1", tag: "self.x", x: 1, y: 3, shape: "box", emphasis: "new" },
          { id: "y", label: "2", tag: "self.y", x: 5, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "p", to: "x" }, { from: "p", to: "y" }],
      },
      caption: "p = Point(1, 2) has x = 1 and y = 2 as attributes. No special printing behavior has been defined yet.",
    },
    {
      state: {
        nodes: [{ id: "out", label: "<Point object at 0x...>", tag: "print(p)", x: 3, y: 2, shape: "box", emphasis: "dim" }],
        arrows: [],
      },
      caption: "Without a __str__ method, print(p) falls back to Python's default, unhelpful representation of the object.",
    },
    {
      state: {
        nodes: [{ id: "cls", label: "Point", tag: "__str__ defined", x: 3, y: 1, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: 'Defining def __str__(self): return f"({self.x}, {self.y})" tells Python exactly what string to produce when the object is printed.',
    },
    {
      state: {
        nodes: [{ id: "out2", label: '"(1, 2)"', tag: "print(p)", x: 3, y: 2, shape: "box", emphasis: "new" }],
        arrows: [],
      },
      caption: "Now print(p) calls __str__ automatically, producing a readable \"(1, 2)\" instead of the default memory-address text.",
    },
    {
      state: {
        nodes: [
          { id: "p1", label: "p1", tag: "x=1, y=2", x: 1, y: 1, shape: "frame" },
          { id: "p2", label: "p2", tag: "x=1, y=2", x: 5, y: 1, shape: "frame" },
          { id: "cmp", label: "False", tag: "p1 == p2", x: 3, y: 3, shape: "box", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: "Without __eq__, == checks whether p1 and p2 are literally the SAME object in memory. They're separate instances, so p1 == p2 is False even though their x and y match.",
    },
    {
      state: {
        nodes: [
          { id: "p1", label: "p1", tag: "x=1, y=2", x: 1, y: 1, shape: "frame" },
          { id: "p2", label: "p2", tag: "x=1, y=2", x: 5, y: 1, shape: "frame" },
          { id: "cmp2", label: "True", tag: "p1 == p2", x: 3, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Defining __eq__ makes == compare by value instead: since p1.x == p2.x and p1.y == p2.y, p1 == p2 is now True, even though they're still two separate objects.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n\nm1 = Money(5)\nm2 = Money(5)\nprint(m1 == m2)\nWhat prints?",
      steps: [
        {
          state: {
            nodes: [
              { id: "m1", label: "m1", tag: "amount=5", x: 1, y: 1, shape: "frame" },
              { id: "m2", label: "m2", tag: "amount=5", x: 5, y: 1, shape: "frame" },
            ],
            arrows: [],
          },
          caption: "`Money` has no `__eq__` defined, and `m1`, `m2` are two separate instances.",
        },
      ],
      options: [
        { id: "a", label: "False" },
        { id: "b", label: "True" },
        { id: "c", label: "It raises an error" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Without a custom __eq__, == falls back to identity comparison: are these literally the same object? m1 and m2 are two separate Money instances, so even with matching amounts, == is False.",
        c: "Comparing two objects with == never raises an error by default, even without __eq__ defined; Python just uses its default identity check.",
      },
      revealStep: {
        state: { nodes: [{ id: "res", label: "False", tag: "m1 == m2", x: 3, y: 2, shape: "box", emphasis: "new" }], arrows: [] },
        caption: "No `__eq__` means `==` checks object identity, and `m1`, `m2` are different objects, so this is `False`.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the dunder method name that controls what str(instance) and print(instance) show.",
      code: ["class Money:", "    def __init__(self, amount):", "        self.amount = amount", "", "    def {{dunder}}(self):", '        return f"${self.amount}"'].join("\n"),
      blanks: [
        {
          id: "dunder",
          placeholder: "___",
          answer: "__str__",
          explainWrong:
            "__str__ is the specific method name Python looks for to decide what str() and print() should show for an instance. Any other name is just a regular method that print() won't call automatically.",
        },
      ],
      tests: [
        { name: "str(m) shows the formatted amount", code: 'm = Money(5)\nassert str(m) == "$5", "str(m) should be \\"$5\\": __str__ is the method print() and str() call automatically"' },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        'Implement a class `Song` with `__init__(self, title, artist)`, a `__str__` method returning `"title by artist"`, and an `__eq__` method that treats two `Song` instances as equal when both `title` and `artist` match.',
      difficulty: "Medium",
      examples: [
        { input: 'str(Song("Imagine", "John Lennon"))', output: '"Imagine by John Lennon"' },
        {
          input: 'Song("Yesterday", "The Beatles") == Song("Yesterday", "The Beatles")',
          output: "True",
          explanation: "Equal when both `title` and `artist` match, even though they are separate objects.",
        },
      ],
      constraints: [
        "Two `Song` instances with the same `title` and `artist` must compare equal via `==`",
        '`str(song)` must return exactly `"title by artist"`',
      ],
      bigO: { fn: "__init__", answer: "O(1)", explain: "`__init__`, `__str__`, and `__eq__` each touch a fixed handful of attributes." },
      starter:
        "class Song:\n    def __init__(self, title, artist):\n        # your code here\n        pass\n\n    def __str__(self):\n        # your code here\n        pass\n\n    def __eq__(self, other):\n        # your code here\n        pass\n",
      solution:
        'class Song:\n    def __init__(self, title, artist):\n        self.title = title\n        self.artist = artist\n\n    def __str__(self):\n        return f"{self.title} by {self.artist}"\n\n    def __eq__(self, other):\n        return self.title == other.title and self.artist == other.artist\n',
      tests: [
        { name: "__str__ formats correctly", code: 's = Song("Imagine", "John Lennon")\nassert str(s) == "Imagine by John Lennon", "str(song) should be \\"Imagine by John Lennon\\": title by artist"' },
        {
          name: "equal songs compare equal even as separate objects",
          code: 's1 = Song("Yesterday", "The Beatles")\ns2 = Song("Yesterday", "The Beatles")\nassert s1 == s2, "two Song instances with the same title and artist should be equal, even though they are separate objects"',
        },
        {
          name: "different songs are not equal",
          code: 's3 = Song("Yesterday", "The Beatles")\ns4 = Song("Hey Jude", "The Beatles")\nassert s3 != s4, "songs with different titles should not be equal"',
        },
      ],
      reviewStep: 5,
    },
  ],
  recall: [
    {
      id: "py-classes.dunder-custom.1",
      prompt: "A class has no __str__ method. What does print(instance) show?",
      options: [
        "Python's default, unhelpful representation, like <ClassName object at 0x...>",
        "An empty string",
        "It raises an error, since printing requires __str__",
      ],
      correctIndex: 0,
      explainWrong: "Printing an object never requires __str__; Python always has a fallback. Without __str__, that fallback is a generic, not very readable representation showing the class name and a memory address.",
    },
    {
      id: "py-classes.dunder-custom.2",
      prompt: "Why does defining __eq__ change what p1 == p2 does?",
      options: [
        "Because __eq__ overrides the default identity check with a custom value comparison you define",
        "Because __eq__ only affects print(), not ==",
        "Because Python ignores == entirely once __str__ is defined",
      ],
      correctIndex: 0,
      explainWrong: "__eq__ is specifically the method Python calls to evaluate ==. Defining it replaces the default same-object identity check with whatever value comparison you write inside it; __str__ has no effect on == at all.",
    },
    {
      id: "py-classes.dunder-custom.3",
      prompt: "Calling str(obj) directly, what method does it trigger?",
      options: ["obj's __str__ method", "obj's __init__ method", "obj's __eq__ method"],
      correctIndex: 0,
      explainWrong: "str() and print() are both defined to call an object's __str__ method to get its display text. __init__ only ever runs at construction time, and __eq__ is only for == comparisons; neither is involved in str() conversion.",
    },
    {
      id: "py-classes.dunder-custom.4",
      prompt: "Two objects have identical attribute values but the class defines no __eq__. Are they equal with ==?",
      options: [
        "No, without __eq__, == checks whether they're the same object in memory, and they aren't",
        "Yes, Python always compares attribute values by default",
        "It depends on whether __str__ is defined",
      ],
      correctIndex: 0,
      explainWrong: "Python's default == has nothing to do with attribute values; it checks object identity. Two separate instances are never == by default, no matter how similar their attributes are, unless __eq__ is defined to say otherwise.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: apply-classes — BankAccount combining constructor, a method, and
// __str__.
// ---------------------------------------------------------------------------

const applyClassesUnit: Unit = {
  id: "apply-classes",
  title: "Apply: A BankAccount Class",
  watch: [
    {
      state: {
        nodes: [{ id: "cls", label: "BankAccount", tag: "__init__(self, owner, balance=0)", x: 3, y: 0, shape: "frame", emphasis: "new" }],
        arrows: [],
      },
      caption: 'class BankAccount defines a constructor that fills in owner and balance (defaulting to 0) whenever a new account is created.',
    },
    {
      state: {
        nodes: [
          { id: "acc", label: "acc", tag: "instance", x: 3, y: 1, shape: "frame" },
          { id: "owner", label: '"Al"', tag: "self.owner", x: 1, y: 2, shape: "box" },
          { id: "bal", label: "150", tag: "self.balance", x: 5, y: 2, shape: "box", emphasis: "new" },
          { id: "out", label: '"Al: $150"', tag: "print(acc)", x: 3, y: 4, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "acc", to: "owner" }, { from: "acc", to: "bal", emphasis: "active" }],
      },
      caption: 'acc = BankAccount("Al", 100), then acc.deposit(50) raises self.balance to 150. With __str__ defined, print(acc) shows "Al: $150".',
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        'Implement a class `BankAccount` with `__init__(self, owner, balance=0)`, a method `deposit(self, amount)` that adds `amount` to `self.balance`, a method `withdraw(self, amount)` that subtracts `amount` from `self.balance`, and `__str__` returning `"owner: $balance"`.',
      difficulty: "Medium",
      examples: [
        { input: 'acc = BankAccount("Al", 100); acc.deposit(50)', output: "acc.balance == 150" },
        {
          input: 'str(BankAccount("Sam"))',
          output: '"Sam: $0"',
          explanation: "`balance` defaults to `0` when not provided.",
        },
      ],
      constraints: [
        "`balance` defaults to `0` when not provided",
        '`str(account)` must return exactly `"owner: $balance"`',
      ],
      bigO: { fn: "deposit", answer: "O(1)", explain: "`deposit`, `withdraw`, and `__str__` each perform a fixed number of attribute operations." },
      starter:
        "class BankAccount:\n    def __init__(self, owner, balance=0):\n        # your code here\n        pass\n\n    def deposit(self, amount):\n        # your code here\n        pass\n\n    def withdraw(self, amount):\n        # your code here\n        pass\n\n    def __str__(self):\n        # your code here\n        pass\n",
      solution:
        'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def withdraw(self, amount):\n        self.balance -= amount\n\n    def __str__(self):\n        return f"{self.owner}: ${self.balance}"\n',
      tests: [
        { name: "deposit increases balance", code: 'acc = BankAccount("Al", 100)\nacc.deposit(50)\nassert acc.balance == 150, "after depositing 50 into a 100 balance, balance should be 150"' },
        { name: "withdraw decreases balance", code: 'acc = BankAccount("Al", 150)\nacc.withdraw(30)\nassert acc.balance == 120, "after withdrawing 30 from a 150 balance, balance should be 120"' },
        { name: "__str__ formats owner and balance", code: 'acc = BankAccount("Al", 120)\nassert str(acc) == "Al: $120", "str(acc) should be \\"Al: $120\\": owner, colon, space, dollar sign, balance"' },
        { name: "default balance is 0", code: 'acc = BankAccount("Sam")\nassert acc.balance == 0, "BankAccount(\\"Sam\\") with no balance argument should default to 0"\nassert str(acc) == "Sam: $0", "str(acc) should be \\"Sam: $0\\""' },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "py-classes.apply-classes.1",
      prompt: "Why give BankAccount a __str__ method instead of relying on the default printing behavior?",
      options: [
        "So print(account) shows readable info like \"Al: $150\" instead of a generic memory-address representation",
        "Because deposit() and withdraw() won't work without it",
        "Because __init__ requires __str__ to be defined first",
      ],
      correctIndex: 0,
      explainWrong: "__str__ only affects how the object displays when printed or converted to a string; it has no bearing on whether deposit() or withdraw() work, and __init__ has no dependency on __str__ existing.",
    },
    {
      id: "py-classes.apply-classes.2",
      prompt: "__init__(self, owner, balance=0) is called as BankAccount(\"Sam\"), with no balance given. What does self.balance become?",
      options: [
        "0, the default value specified in the parameter list",
        "None, since no value was passed in",
        "It raises an error, since balance is required",
      ],
      correctIndex: 0,
      explainWrong: "balance=0 is a default parameter value; it isn't required at the call site. Leaving it out doesn't error and doesn't produce None, it simply falls back to the 0 written in the constructor's signature.",
    },
  ],
};

export const chClasses: Chapter = {
  id: "py-classes",
  phase: 1,
  title: "Classes and Objects",
  units: [blueprintInstancesUnit, constructorsMethodsUnit, dunderCustomUnit, applyClassesUnit],
};
