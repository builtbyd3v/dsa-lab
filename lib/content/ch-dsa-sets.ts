import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: set-adt — sets store distinct values only; adding a duplicate has
// no effect, and membership is checked with in.
// ---------------------------------------------------------------------------

const setAdtUnit: Unit = {
  id: "set-adt",
  title: "The Set ADT",
  watch: [
    {
      state: { nodes: [], arrows: [] },
      caption: "An empty set holds nothing yet.",
    },
    {
      state: {
        nodes: [{ id: "m0", label: "5", x: 1, y: 1, shape: "circle", emphasis: "new" }],
        arrows: [],
      },
      caption: "add(5) puts 5 into the set; sets store each distinct value only once.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "5", x: 1, y: 1, shape: "circle" },
          { id: "m1", label: "8", x: 3, y: 1, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "add(8) inserts a second, different value alongside the first.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "5", x: 1, y: 1, shape: "circle" },
          { id: "m1", label: "8", x: 3, y: 1, shape: "circle" },
          { id: "ghost", label: "5", x: 1, y: 3, shape: "circle", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: "add(5) again has no effect: the set already contains 5, so the duplicate attempt is rejected.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "5", x: 1, y: 1, shape: "circle" },
          { id: "m1", label: "8", x: 3, y: 1, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "8 in myset checks membership by looking for a match; since 8 is present, this is True.",
    },
    {
      state: {
        nodes: [
          { id: "m0", label: "5", x: 1, y: 1, shape: "circle" },
          { id: "m1", label: "8", x: 3, y: 1, shape: "circle" },
          { id: "ghost99", label: "99", x: 5, y: 1, shape: "circle", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: "99 in myset finds no match: the query value isn't stored anywhere in the set, so this is False.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "myset = {3, 7}; myset.add(3). What does myset contain afterward?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: "3", x: 1, y: 1, shape: "circle" },
              { id: "b", label: "7", x: 3, y: 1, shape: "circle" },
            ],
            arrows: [],
          },
          caption: "myset already contains 3 and 7 before add(3) runs.",
        },
      ],
      options: [
        { id: "a", label: "{3, 3, 7}" },
        { id: "b", label: "{3, 7}" },
        { id: "c", label: "{7}" },
      ],
      correctId: "b",
      explainWrong: {
        a: "Sets never store duplicates; adding a value already present changes nothing, so there is no second 3.",
        c: "add(3) doesn't remove anything; 3 stays in the set along with 7.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: "3", x: 1, y: 1, shape: "circle" },
            { id: "b", label: "7", x: 3, y: 1, shape: "circle" },
            { id: "ghost", label: "3", x: 1, y: 3, shape: "circle", emphasis: "error" },
          ],
          arrows: [],
        },
        caption: "add(3) bounces off since 3 is already present; myset stays exactly {3, 7}.",
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blank to check whether 4 is a member of nums without a loop.",
      code: ["nums = {1, 2, 3}", "has_four = {{value}} in nums"].join("\n"),
      blanks: [
        {
          id: "value",
          placeholder: "___",
          answer: "4",
          explainWrong: "The membership check should test for the specific value 4, not the set name itself.",
        },
      ],
      tests: [
        {
          name: "has_four is False",
          code: "assert has_four == False, \"has_four should be False: 4 is not in nums\"",
        },
      ],
      reviewStep: 5,
    },
    {
      kind: "write",
      prompt:
        "Write add_unique(my_set, value) that adds value to my_set only if it is not already present, returning True if it was added or False if it was already there (a duplicate).",
      starter: ["def add_unique(my_set, value):", "    pass"].join("\n"),
      tests: [
        {
          name: "new value is added",
          code:
            "s = {1, 2}\nresult = add_unique(s, 3)\nassert result == True, \"add_unique should return True: 3 was not already present\"\nassert s == {1, 2, 3}, \"my_set should now be {1, 2, 3}\"",
        },
        {
          name: "duplicate is rejected",
          code:
            "s2 = {1, 2}\nresult2 = add_unique(s2, 2)\nassert result2 == False, \"add_unique should return False: 2 was already present\"\nassert s2 == {1, 2}, \"my_set should stay {1, 2}: no duplicate should be added\"",
        },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "dsa-sets.set-adt.1",
      prompt: "What happens when you add a value to a set that it already contains?",
      options: [
        "A second copy of the value is stored",
        "Nothing changes; the set still contains that value exactly once",
        "The set raises an error",
      ],
      correctIndex: 1,
      explainWrong: "Sets never store a value twice, and adding a duplicate is not an error condition; the add simply has no visible effect since the value is already present.",
    },
    {
      id: "dsa-sets.set-adt.2",
      prompt: "How do you check whether a value belongs to a set?",
      options: [
        "Loop through every element manually and compare",
        "Use the in operator, like value in myset",
        "Sets don't support membership checks",
      ],
      correctIndex: 1,
      explainWrong: "A manual loop would work but isn't how sets are meant to be used, and membership checks are a core set feature. The in operator directly tests whether a value is present.",
    },
    {
      id: "dsa-sets.set-adt.3",
      prompt: "What is the defining property of a set, compared to a list?",
      options: [
        "A set keeps elements in insertion order like a list",
        "A set guarantees every element is distinct; duplicates cannot exist",
        "A set can only hold numbers",
      ],
      correctIndex: 1,
      explainWrong: "Sets don't guarantee insertion order the way lists do, and they can hold any hashable value, not just numbers. Their defining feature is uniqueness: no element ever appears more than once.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: set-operations — union, intersection, and difference combine two
// sets into a new result set.
// ---------------------------------------------------------------------------

const setOperationsUnit: Unit = {
  id: "set-operations",
  title: "Union, Intersection, and Difference",
  watch: [
    {
      state: {
        nodes: [
          { id: "a1", label: "1", x: 0, y: 0, shape: "circle" },
          { id: "a2", label: "2", x: 0, y: 1, shape: "circle" },
          { id: "a3", label: "3", x: 0, y: 2, shape: "circle" },
          { id: "b3", label: "3", x: 4, y: 2, shape: "circle" },
          { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
          { id: "b5", label: "5", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Set A holds 1, 2, 3. Set B holds 3, 4, 5, sharing the value 3 with A.",
    },
    {
      state: {
        nodes: [
          { id: "a1", label: "1", x: 0, y: 0, shape: "circle", emphasis: "active" },
          { id: "a2", label: "2", x: 0, y: 1, shape: "circle", emphasis: "active" },
          { id: "a3", label: "3", x: 0, y: 2, shape: "circle", emphasis: "active" },
          { id: "b3", label: "3", x: 4, y: 2, shape: "circle", emphasis: "active" },
          { id: "b4", label: "4", x: 4, y: 0, shape: "circle", emphasis: "active" },
          { id: "b5", label: "5", x: 4, y: 1, shape: "circle", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "Union combines every value from both sets, so every member of A and B is a candidate.",
    },
    {
      state: {
        nodes: [
          { id: "a1", label: "1", x: 0, y: 0, shape: "circle" },
          { id: "a2", label: "2", x: 0, y: 1, shape: "circle" },
          { id: "a3", label: "3", x: 0, y: 2, shape: "circle" },
          { id: "b3", label: "3", x: 4, y: 2, shape: "circle" },
          { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
          { id: "b5", label: "5", x: 4, y: 1, shape: "circle" },
          { id: "r1", label: "1", x: 0, y: 4, shape: "circle", emphasis: "new" },
          { id: "r2", label: "2", x: 1.5, y: 4, shape: "circle", emphasis: "new" },
          { id: "r3", label: "3", x: 3, y: 4, shape: "circle", emphasis: "new" },
          { id: "r4", label: "4", x: 4.5, y: 4, shape: "circle", emphasis: "new" },
          { id: "r5", label: "5", x: 6, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "A | B is {1, 2, 3, 4, 5}: the shared value 3 appears only once in the result.",
    },
    {
      state: {
        nodes: [
          { id: "a1", label: "1", x: 0, y: 0, shape: "circle" },
          { id: "a2", label: "2", x: 0, y: 1, shape: "circle" },
          { id: "a3", label: "3", x: 0, y: 2, shape: "circle", emphasis: "active" },
          { id: "b3", label: "3", x: 4, y: 2, shape: "circle", emphasis: "active" },
          { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
          { id: "b5", label: "5", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Intersection keeps only values that appear in both sets: here, that means checking for 3 in both.",
    },
    {
      state: {
        nodes: [
          { id: "a1", label: "1", x: 0, y: 0, shape: "circle" },
          { id: "a2", label: "2", x: 0, y: 1, shape: "circle" },
          { id: "a3", label: "3", x: 0, y: 2, shape: "circle" },
          { id: "b3", label: "3", x: 4, y: 2, shape: "circle" },
          { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
          { id: "b5", label: "5", x: 4, y: 1, shape: "circle" },
          { id: "ri", label: "3", x: 2, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "A & B is {3}: the only value common to both sets.",
    },
    {
      state: {
        nodes: [
          { id: "a1", label: "1", x: 0, y: 0, shape: "circle", emphasis: "active" },
          { id: "a2", label: "2", x: 0, y: 1, shape: "circle", emphasis: "active" },
          { id: "a3", label: "3", x: 0, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b3", label: "3", x: 4, y: 2, shape: "circle", emphasis: "dim" },
          { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
          { id: "b5", label: "5", x: 4, y: 1, shape: "circle" },
        ],
        arrows: [],
      },
      caption: "Difference A - B keeps values in A that are NOT in B, so 3 is excluded since B also has it.",
    },
    {
      state: {
        nodes: [
          { id: "a1", label: "1", x: 0, y: 0, shape: "circle" },
          { id: "a2", label: "2", x: 0, y: 1, shape: "circle" },
          { id: "a3", label: "3", x: 0, y: 2, shape: "circle" },
          { id: "b3", label: "3", x: 4, y: 2, shape: "circle" },
          { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
          { id: "b5", label: "5", x: 4, y: 1, shape: "circle" },
          { id: "rd1", label: "1", x: 0, y: 4, shape: "circle", emphasis: "new" },
          { id: "rd2", label: "2", x: 1.5, y: 4, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "A - B is {1, 2}: everything in A except the value it shares with B.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A = {1, 2, 3}; B = {2, 3, 4}. What is A & B (intersection)?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a1", label: "1", x: 0, y: 0, shape: "circle" },
              { id: "a2", label: "2", x: 0, y: 1, shape: "circle" },
              { id: "a3", label: "3", x: 0, y: 2, shape: "circle" },
              { id: "b2", label: "2", x: 4, y: 1, shape: "circle" },
              { id: "b3", label: "3", x: 4, y: 2, shape: "circle" },
              { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
            ],
            arrows: [],
          },
          caption: "A and B share the values 2 and 3.",
        },
      ],
      options: [
        { id: "a", label: "{1, 2, 3, 4}" },
        { id: "b", label: "{2, 3}" },
        { id: "c", label: "{1, 4}" },
      ],
      correctId: "b",
      explainWrong: {
        a: "That's the union (every value from both sets), not the intersection, which keeps only shared values.",
        c: "1 and 4 are exactly the values that are NOT shared; intersection wants the opposite: only what both sets have in common.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a1", label: "1", x: 0, y: 0, shape: "circle" },
            { id: "a2", label: "2", x: 0, y: 1, shape: "circle", emphasis: "active" },
            { id: "a3", label: "3", x: 0, y: 2, shape: "circle", emphasis: "active" },
            { id: "b2", label: "2", x: 4, y: 1, shape: "circle", emphasis: "active" },
            { id: "b3", label: "3", x: 4, y: 2, shape: "circle", emphasis: "active" },
            { id: "b4", label: "4", x: 4, y: 0, shape: "circle" },
            { id: "r1", label: "2", x: 1.5, y: 4, shape: "circle", emphasis: "new" },
            { id: "r2", label: "3", x: 3, y: 4, shape: "circle", emphasis: "new" },
          ],
          arrows: [],
        },
        caption: "A & B is {2, 3}: exactly the values present in both sets.",
      },
      reviewStep: 4,
    },
    {
      kind: "fillin",
      prompt: "Fill in the blank to compute the values in A but not in B.",
      code: ["a = {1, 2, 3}", "b = {2, 3, 4}", "only_in_a = a {{operator}} b"].join("\n"),
      blanks: [
        {
          id: "operator",
          placeholder: "___",
          answer: "-",
          explainWrong: "Set difference in Python uses the minus operator: a - b keeps a's values that aren't in b.",
        },
      ],
      tests: [
        {
          name: "only_in_a is correct",
          code: "assert only_in_a == {1}, \"only_in_a should be {1}: 2 and 3 are also in b, so only 1 is left\"",
        },
      ],
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt: "Write shared_elements(a, b) that returns the set of values present in both list a and list b, using Python sets.",
      starter: ["def shared_elements(a, b):", "    pass"].join("\n"),
      tests: [
        {
          name: "finds common values",
          code:
            "result = shared_elements([1, 2, 3], [2, 3, 4])\nassert result == {2, 3}, \"shared_elements should return {2, 3}: the values present in both lists\"",
        },
        {
          name: "no overlap returns empty set",
          code:
            "result2 = shared_elements([1, 2], [3, 4])\nassert result2 == set(), \"shared_elements should return an empty set when nothing is shared\"",
        },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-sets.set-operations.1",
      prompt: "What does the union of two sets contain?",
      options: [
        "Only values present in both sets",
        "Every distinct value from either set, combined",
        "Only values unique to the first set",
      ],
      correctIndex: 1,
      explainWrong: "Union isn't limited to shared values, and it isn't one-sided either. It combines every distinct value from both sets, counting any shared value only once.",
    },
    {
      id: "dsa-sets.set-operations.2",
      prompt: "What does A - B (difference) contain?",
      options: [
        "Values in A that are also in B",
        "Values in A that are not in B",
        "Values in B that are not in A",
      ],
      correctIndex: 1,
      explainWrong: "Difference is not the same as intersection, and A - B isn't about B's exclusive values either. A - B keeps exactly the values that belong to A but are absent from B.",
    },
    {
      id: "dsa-sets.set-operations.3",
      prompt: "If A and B have no values in common, what is A & B?",
      options: [
        "The empty set",
        "A itself",
        "An error, since there's nothing to intersect",
      ],
      correctIndex: 0,
      explainWrong: "Intersecting sets with nothing in common is not an error, and the result is not either original set. With no shared values, the intersection is simply empty.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: apply-sets — deduplicate a list and find common elements between
// two lists using Python sets.
// ---------------------------------------------------------------------------

const applySetsUnit: Unit = {
  id: "apply-sets",
  title: "Apply: Deduplicate and Find Overlap",
  watch: [
    {
      state: {
        nodes: [
          { id: "l0", label: "1", x: 0, y: 0, shape: "box" },
          { id: "l1", label: "2", x: 1.5, y: 0, shape: "box" },
          { id: "l2", label: "2", x: 3, y: 0, shape: "box" },
          { id: "l3", label: "3", x: 4.5, y: 0, shape: "box" },
          { id: "l4", label: "1", x: 6, y: 0, shape: "box" },
        ],
        arrows: [],
      },
      caption: "A raw list can contain duplicates, like 1, 2, 2, 3, 1: five items, some repeated.",
    },
    {
      state: {
        nodes: [
          { id: "l0", label: "1", x: 0, y: 0, shape: "box" },
          { id: "l1", label: "2", x: 1.5, y: 0, shape: "box" },
          { id: "l2", label: "2", x: 3, y: 0, shape: "box" },
          { id: "l3", label: "3", x: 4.5, y: 0, shape: "box" },
          { id: "l4", label: "1", x: 6, y: 0, shape: "box" },
          { id: "r1", label: "1", x: 0, y: 2, shape: "circle", emphasis: "new" },
          { id: "r2", label: "2", x: 1.5, y: 2, shape: "circle", emphasis: "new" },
          { id: "r3", label: "3", x: 3, y: 2, shape: "circle", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "set(the_list) collapses it down to distinct values only: 1, 2, 3, with no order guaranteed.",
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Write two functions. dedupe(items) should return a list of the distinct values in items, using a set internally, in any order. common_elements(a, b) should return a list of values that appear in both a and b, also using sets, in any order.",
      starter: ["def dedupe(items):", "    pass", "", "def common_elements(a, b):", "    pass"].join("\n"),
      tests: [
        {
          name: "dedupe removes repeats",
          code:
            "result = dedupe([1, 2, 2, 3, 1])\nassert sorted(result) == [1, 2, 3], \"dedupe([1, 2, 2, 3, 1]) should have exactly the distinct values 1, 2, 3, with no repeats\"",
        },
        {
          name: "dedupe on an empty list",
          code: "assert dedupe([]) == [], \"dedupe([]) should be [] since there's nothing to deduplicate\"",
        },
        {
          name: "common_elements finds shared values",
          code:
            "result2 = common_elements([1, 2, 3], [2, 3, 4])\nassert sorted(result2) == [2, 3], \"common_elements should return the values shared by both lists: 2 and 3\"",
        },
        {
          name: "common_elements with no overlap is empty",
          code:
            "result3 = common_elements([1, 2], [3, 4])\nassert result3 == [], \"common_elements should return [] when the two lists share nothing\"",
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-sets.apply-sets.1",
      prompt: "Why does converting a list to a set remove duplicates?",
      options: [
        "Sets sort their elements, which happens to group duplicates together",
        "A set can only contain each distinct value once, by definition",
        "Converting to a set is just a renaming of the list, duplicates stay",

      ],
      correctIndex: 1,
      explainWrong: "Sets don't guarantee sorted order, and conversion is not a mere renaming. A set's defining rule, that every element is distinct, is exactly what causes duplicates to disappear.",
    },
    {
      id: "dsa-sets.apply-sets.2",
      prompt: "What is an efficient way to find values shared between two lists?",
      options: [
        "Compare every pair of elements from both lists with nested loops",
        "Convert both lists to sets and use the intersection operator",
        "Sort both lists and print them side by side",
      ],
      correctIndex: 1,
      explainWrong: "Nested loops work but check far more pairs than needed, and sorting alone doesn't compute an intersection. Converting to sets and using & lets Python find shared values directly.",
    },
  ],
};

export const chDsaSets: Chapter = {
  id: "dsa-sets",
  phase: 2,
  title: "Sets",
  units: [setAdtUnit, setOperationsUnit, applySetsUnit],
};
