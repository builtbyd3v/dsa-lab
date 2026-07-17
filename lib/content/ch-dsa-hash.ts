import type { Chapter, Unit } from "@/lib/types";

// ---------------------------------------------------------------------------
// Unit 1: hashing-buckets — a key runs through a hash function, the result
// gets squeezed into table size by modulo, and that index is a bucket row.
// ---------------------------------------------------------------------------

const hashingBucketsUnit: Unit = {
  id: "hashing-buckets",
  title: "Key to Index: Hash Then Mod",
  watch: [
    {
      state: {
        nodes: [
          { id: "table", label: "size 7", tag: "table", x: 3, y: 0, shape: "frame", emphasis: "new" },
          { id: "b0", label: "empty", tag: "0", x: 0, y: 2, shape: "box" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 2, shape: "box" },
          { id: "b2", label: "empty", tag: "2", x: 2, y: 2, shape: "box" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 2, shape: "box" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 2, shape: "box" },
          { id: "b5", label: "empty", tag: "5", x: 5, y: 2, shape: "box" },
          { id: "b6", label: "empty", tag: "6", x: 6, y: 2, shape: "box" },
        ],
        arrows: [],
      },
      caption: "A hash table with 7 buckets starts out completely empty, one box per index 0 through 6.",
    },
    {
      state: {
        nodes: [
          { id: "key", label: '"cat"', tag: "key", x: 3, y: 0, shape: "box", emphasis: "new" },
          { id: "b0", label: "empty", tag: "0", x: 0, y: 2, shape: "box", emphasis: "dim" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "b2", label: "empty", tag: "2", x: 2, y: 2, shape: "box", emphasis: "dim" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 2, shape: "box", emphasis: "dim" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 2, shape: "box", emphasis: "dim" },
          { id: "b5", label: "empty", tag: "5", x: 5, y: 2, shape: "box", emphasis: "dim" },
          { id: "b6", label: "empty", tag: "6", x: 6, y: 2, shape: "box", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: 'Storing key `"cat"` starts with the raw key, before any hashing has happened.',
    },
    {
      state: {
        nodes: [
          { id: "key", label: '"cat"', tag: "key", x: 3, y: 0, shape: "box", emphasis: "dim" },
          { id: "hashfn", label: "hash(key) = 41", tag: "hash function", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "key", to: "hashfn", emphasis: "active" }],
      },
      caption: '`hash("cat")` runs the key through Python\'s built-in hash function, producing some large integer, here `41` for illustration.',
    },
    {
      state: {
        nodes: [
          { id: "hashfn", label: "hash(key) = 41", tag: "hash function", x: 3, y: 1, shape: "frame", emphasis: "dim" },
          { id: "modfn", label: "41 % 7 = 6", tag: "index math", x: 3, y: 1.5, shape: "frame", emphasis: "new" },
        ],
        arrows: [{ from: "hashfn", to: "modfn", emphasis: "active" }],
      },
      caption: "`41 % 7` squeezes that huge number down into a valid bucket index: `6`, since the table only has 7 slots.",
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 2, shape: "box", emphasis: "dim" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "b2", label: "empty", tag: "2", x: 2, y: 2, shape: "box", emphasis: "dim" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 2, shape: "box", emphasis: "dim" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 2, shape: "box", emphasis: "dim" },
          { id: "b5", label: "empty", tag: "5", x: 5, y: 2, shape: "box", emphasis: "dim" },
          { id: "b6", label: '"cat"', tag: "6", x: 6, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: '`"cat"` lands in bucket row `6`, the exact index the hash-then-mod math produced.',
    },
    {
      state: {
        nodes: [
          { id: "key2", label: '"dog"', tag: "key", x: 3, y: 0, shape: "box", emphasis: "new" },
          { id: "hashfn2", label: "hash(key) = 30, 30 % 7 = 2", tag: "hash then mod", x: 3, y: 1, shape: "frame", emphasis: "active" },
        ],
        arrows: [{ from: "key2", to: "hashfn2", emphasis: "active" }],
      },
      caption: 'A different key, `"dog"`, produces a different hash, `30`, which mods down to index `2`.',
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 2, shape: "box", emphasis: "dim" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "b2", label: '"dog"', tag: "2", x: 2, y: 2, shape: "box", emphasis: "new" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 2, shape: "box", emphasis: "dim" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 2, shape: "box", emphasis: "dim" },
          { id: "b5", label: "empty", tag: "5", x: 5, y: 2, shape: "box", emphasis: "dim" },
          { id: "b6", label: '"cat"', tag: "6", x: 6, y: 2, shape: "box" },
        ],
        arrows: [],
      },
      caption: '`"dog"` lands at index `2`, a completely different bucket from `"cat"`, because its hash mods to a different number.',
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "A hash table has 5 buckets (indices 0-4). A key hashes to 23. Which bucket does it land in?",
      steps: [
        {
          state: {
            nodes: [{ id: "h", label: "hash(key) = 23", tag: "hash function", x: 3, y: 1, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "The raw hash value, `23`, still needs to be squeezed down to fit the table's 5 buckets.",
        },
      ],
      options: [
        { id: "a", label: "Bucket 23" },
        { id: "b", label: "Bucket 3" },
        { id: "c", label: "Bucket 4" },
        { id: "d", label: "Bucket 5" },
      ],
      correctId: "b",
      explainWrong: {
        a: "23 is the raw hash, not the bucket index; the table only has 5 buckets, so the hash must be reduced with modulo first.",
        c: "23 % 5 is 3, not 4; 5 goes into 23 four times (20), leaving a remainder of 3, not 4.",
        d: "There is no bucket 5 in a 5-bucket table; valid indices only run from 0 to 4, and modulo by 5 can never produce 5 itself.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "b3", label: "key", tag: "bucket 3", x: 3, y: 2, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "`23 % 5 = 3`, so the key lands in bucket `3`.",
      },
      reviewStep: 3,
    },
    {
      kind: "fillin",
      prompt: "Fill in the operator so a hash value gets reduced to a valid index for a table of size table_size.",
      code: ["def bucket_index(hash_value, table_size):", "    return hash_value {{op}} table_size"].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "%",
          explainWrong:
            "Only the modulo operator guarantees a result between 0 and table_size - 1 for any hash_value; +, -, or * would not keep the result inside the table's valid index range.",
        },
      ],
      tests: [
        { name: "41 mod 7 is 6", code: "assert bucket_index(41, 7) == 6, \"bucket_index(41, 7) should be 6: 41 % 7\"" },
        { name: "30 mod 7 is 2", code: "assert bucket_index(30, 7) == 2, \"bucket_index(30, 7) should be 2: 30 % 7\"" },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Given a `key` and a hash table size `table_size`, return the bucket index for `key` using Python's built-in `hash()` function reduced with modulo.",
      difficulty: "Easy",
      examples: [
        {
          input: "key = \"cat\", table_size = 7",
          output: "hash(\"cat\") % 7",
          explanation: "The bucket index is always `hash(key) % table_size`.",
        },
        { input: "key = 42, table_size = 7", output: "a value between `0` and `6`" },
      ],
      constraints: [
        "`table_size > 0`",
        "`key` can be any hashable Python value",
        "the returned index must satisfy `0 <= index < table_size`",
      ],
      bigO: { answer: "O(1)", explain: "`hash(key)` and `%` are constant-time operations, regardless of `table_size`." },
      starter: "def bucket_for(key, table_size):\n    # use hash(key) and modulo\n    pass\n",
      solution: "def bucket_for(key, table_size):\n    return hash(key) % table_size\n",
      tests: [
        {
          name: "index is always in range",
          code:
            "for k in ['a', 'bb', 'ccc', 42, 'zebra']:\n    idx = bucket_for(k, 7)\n    assert 0 <= idx < 7, f\"bucket_for({k!r}, 7) should be between 0 and 6, got {idx}: an index outside the table's size is not a valid bucket\"",
        },
        {
          name: "matches hash then mod",
          code: "assert bucket_for('cat', 7) == hash('cat') % 7, \"bucket_for('cat', 7) should equal hash('cat') % 7 exactly\"",
        },
      ],
      reviewStep: 3,
    },
  ],
  recall: [
    {
      id: "dsa-hash-tables.hashing-buckets.1",
      prompt: "Why does a hash table apply modulo to a key's hash value before using it as an index?",
      options: [
        "To keep the index inside the table's valid range of bucket positions",
        "To make the hash value larger and more unique",
        "Because Python requires modulo on every integer",
      ],
      correctIndex: 0,
      explainWrong:
        "hash() can return huge or negative-looking integers far outside the table's size. Modulo by the table size is what maps that value down into a valid bucket index; it isn't about size or a language requirement.",
    },
    {
      id: "dsa-hash-tables.hashing-buckets.2",
      prompt: 'Two different keys, "cat" and "dog", produce different hash values. What determines which bucket each lands in?',
      options: [
        "The order the keys were inserted in",
        "Each key's own hash value mod the table size",
        "Both always land in bucket 0 first",
      ],
      correctIndex: 1,
      explainWrong:
        "Insertion order doesn't decide bucket placement, and there's nothing special about bucket 0. Each key's own hash, reduced by modulo, determines its bucket independently of any other key.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 2: chaining — a collision links a new entry onto the bucket's chain;
// search has to walk the chain to find the right one.
// ---------------------------------------------------------------------------

const chainingUnit: Unit = {
  id: "chaining",
  title: "Collisions Chain Off the Bucket",
  watch: [
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2", x: 2, y: 1, shape: "box" },
        ],
        arrows: [],
      },
      caption: 'Bucket `2` already holds `"dog"`, the only key that has hashed there so far.',
    },
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2", x: 2, y: 1, shape: "box" },
          { id: "newkey", label: '"pig"', tag: "hashes to 2", x: 5, y: 0, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: '`"pig"` is being inserted, and it also hashes to bucket `2`: a collision with `"dog"`.',
    },
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain1", label: '"pig"', tag: "chained", x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "b2", to: "chain1", emphasis: "active" }],
      },
      caption: 'Instead of overwriting `"dog"`, chaining links `"pig"` onto the bucket as a chain: the bucket now holds a small list of entries.',
    },
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain1", label: '"pig"', tag: "chained", x: 4, y: 1, shape: "box", emphasis: "dim" },
          { id: "newkey2", label: '"owl"', tag: "hashes to 2", x: 6, y: 0, shape: "box", emphasis: "new" },
        ],
        arrows: [{ from: "b2", to: "chain1" }],
      },
      caption: '`"owl"` also hashes to bucket `2`, a second collision on the same bucket.',
    },
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain1", label: '"pig"', tag: "chained", x: 4, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain2", label: '"owl"', tag: "chained", x: 6, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [
          { from: "b2", to: "chain1" },
          { from: "chain1", to: "chain2", emphasis: "active" },
        ],
      },
      caption: '`"owl"` links onto the end of the chain, after `"pig"`, growing the chain to three entries deep.',
    },
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2, checking", x: 2, y: 1, shape: "box", emphasis: "active" },
          { id: "chain1", label: '"pig"', tag: "chained", x: 4, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain2", label: '"owl"', tag: "chained", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "b2", to: "chain1" },
          { from: "chain1", to: "chain2" },
        ],
      },
      caption: 'Searching for `"owl"` starts at bucket `2` and checks `"dog"` first: not a match, so the search keeps walking.',
    },
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain1", label: '"pig"', tag: "checking", x: 4, y: 1, shape: "box", emphasis: "active" },
          { id: "chain2", label: '"owl"', tag: "chained", x: 6, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [
          { from: "b2", to: "chain1" },
          { from: "chain1", to: "chain2" },
        ],
      },
      caption: '`"pig"` is checked next: still not a match, so the search steps to the next link.',
    },
    {
      state: {
        nodes: [
          { id: "b2", label: '"dog"', tag: "bucket 2", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain1", label: '"pig"', tag: "chained", x: 4, y: 1, shape: "box", emphasis: "dim" },
          { id: "chain2", label: '"owl"', tag: "found", x: 6, y: 1, shape: "box", emphasis: "active" },
        ],
        arrows: [
          { from: "b2", to: "chain1" },
          { from: "chain1", to: "chain2" },
        ],
      },
      caption: '`"owl"` is found at the third link: with chaining, search walks the whole chain until it matches, or runs off the end.',
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "Bucket 4 already has a chain: \"ant\" -> \"bee\" -> \"cow\". Searching for \"cow\" checks entries in what order?",
      steps: [
        {
          state: {
            nodes: [
              { id: "a", label: '"ant"', tag: "bucket 4", x: 2, y: 1, shape: "box", emphasis: "new" },
              { id: "b", label: '"bee"', tag: "chained", x: 4, y: 1, shape: "box", emphasis: "new" },
              { id: "c", label: '"cow"', tag: "chained", x: 6, y: 1, shape: "box", emphasis: "new" },
            ],
            arrows: [
              { from: "a", to: "b" },
              { from: "b", to: "c" },
            ],
          },
          caption: 'The chain at bucket `4` links `"ant"` to `"bee"` to `"cow"`, in that order.',
        },
      ],
      options: [
        { id: "a", label: "cow first, since that's the target" },
        { id: "b", label: "ant, then bee, then cow" },
        { id: "c", label: "cow, then bee, then ant" },
        { id: "d", label: "All three are checked at once" },
      ],
      correctId: "b",
      explainWrong: {
        a: "A chain search can't jump straight to the target; it has no way of knowing where a key sits without walking the links from the start of the chain.",
        c: "The walk starts at the bucket's first entry, not the last; the chain is followed in the order it was linked: ant, then bee, then cow.",
        d: "Chains are a linked structure, checked one entry at a time in sequence, not all simultaneously.",
      },
      revealStep: {
        state: {
          nodes: [
            { id: "a", label: '"ant"', tag: "checked", x: 2, y: 1, shape: "box", emphasis: "dim" },
            { id: "b", label: '"bee"', tag: "checked", x: 4, y: 1, shape: "box", emphasis: "dim" },
            { id: "c", label: '"cow"', tag: "found", x: 6, y: 1, shape: "box", emphasis: "active" },
          ],
          arrows: [
            { from: "a", to: "b" },
            { from: "b", to: "c" },
          ],
        },
        caption: 'The search checks `"ant"`, then `"bee"`, then finally `"cow"`: a full walk to the end of the chain.',
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "Fill in the condition so chain_search walks a Python list chain and returns True the moment it finds target.",
      code: [
        "def chain_search(chain, target):",
        "    for entry in chain:",
        "        if entry {{op}} target:",
        "            return True",
        "    return False",
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "==",
          explainWrong:
            "Checking each entry against target requires equality comparison, ==. Using = would be an assignment, which is not even valid inside an if condition in Python.",
        },
      ],
      tests: [
        { name: "finds present key", code: "assert chain_search(['ant', 'bee', 'cow'], 'cow') is True, \"chain_search should return True: cow is in the chain\"" },
        { name: "misses absent key", code: "assert chain_search(['ant', 'bee', 'cow'], 'owl') is False, \"chain_search should return False: owl is not in the chain\"" },
      ],
      reviewStep: 6,
    },
    {
      kind: "write",
      prompt:
        "Given a `table` (a dict mapping bucket index to a list of keys), a bucket `index`, and a `key`, append `key` to the chain living at `table[index]`, creating that chain as an empty list first if `index` is not yet in `table`.",
      difficulty: "Easy",
      examples: [
        {
          input: "table = {}, index = 2, key = \"dog\"",
          output: "table == {2: [\"dog\"]}",
          explanation: "The chain at index `2` is created as an empty list before `\"dog\"` is appended.",
        },
        {
          input: "table = {2: [\"dog\"]}, index = 2, key = \"pig\"",
          output: "table == {2: [\"dog\", \"pig\"]}",
          explanation: "`\"pig\"` chains onto the existing entry instead of replacing it.",
        },
      ],
      constraints: [
        "`table` maps `index -> list of keys`",
        "inserting on a bucket that already has a chain appends to it, it never overwrites",
      ],
      bigO: { answer: "O(1)", explain: "Dict lookup by `index` and `list.append` are both average constant-time operations." },
      starter: "def chain_insert(table, index, key):\n    # table is a dict mapping index -> list of keys\n    pass\n",
      solution: "def chain_insert(table, index, key):\n    if index not in table:\n        table[index] = []\n    table[index].append(key)\n",
      tests: [
        {
          name: "creates chain on first insert",
          code: "t = {}\nchain_insert(t, 2, 'dog')\nassert t[2] == ['dog'], \"t[2] should be ['dog'] after the first insert at index 2\"",
        },
        {
          name: "appends on collision",
          code: "t2 = {2: ['dog']}\nchain_insert(t2, 2, 'pig')\nassert t2[2] == ['dog', 'pig'], \"t2[2] should be ['dog', 'pig']: pig chains onto the existing entry, it doesn't replace it\"",
        },
      ],
      reviewStep: 4,
    },
  ],
  recall: [
    {
      id: "dsa-hash-tables.chaining.1",
      prompt: 'Two keys hash to the same bucket. What does chaining do about it?',
      options: [
        "Overwrites whichever key was there first",
        "Links the new key onto that bucket's chain, keeping both",
        "Rejects the insert as an error",
      ],
      correctIndex: 1,
      explainWrong:
        "Chaining doesn't discard either key or raise an error on collision. It keeps a small list, or chain, of every key that has hashed to that bucket.",
    },
    {
      id: "dsa-hash-tables.chaining.2",
      prompt: "With chaining, how does a search find a specific key inside a bucket that has three entries chained together?",
      options: [
        "It walks the chain from the start, comparing each entry until it finds a match or reaches the end",
        "It jumps straight to the matching entry",
        "It checks only the first entry in the chain",
      ],
      correctIndex: 0,
      explainWrong:
        "A chain has no shortcut to a specific entry. The search must walk it one link at a time, comparing each entry, until it either matches or runs out of chain.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 3: probing — open addressing walks the table itself on a collision,
// linearly, quadratically, or with a second hash function.
// ---------------------------------------------------------------------------

const probingUnit: Unit = {
  id: "probing",
  title: "Probing Walks the Table Itself",
  watch: [
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 1, shape: "box" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 1, shape: "box" },
          { id: "b2", label: '"cat"', tag: "2", x: 2, y: 1, shape: "box" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 1, shape: "box" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 1, shape: "box" },
        ],
        arrows: [],
      },
      caption: '`"cat"` already sits at index `2`. A new key, `"bat"`, is about to be inserted, and it also hashes to index `2`.',
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 1, shape: "box", emphasis: "dim" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 1, shape: "box", emphasis: "dim" },
          { id: "b2", label: '"cat"', tag: "2, occupied", x: 2, y: 1, shape: "box", emphasis: "error" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 1, shape: "box", emphasis: "dim" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: 'Linear probing checks index `2` first: occupied by `"cat"`, so `"bat"` can\'t go there.',
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 1, shape: "box", emphasis: "dim" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 1, shape: "box", emphasis: "dim" },
          { id: "b2", label: '"cat"', tag: "2", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "b3", label: '"bat"', tag: "2+1=3", x: 3, y: 1, shape: "box", emphasis: "new" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 1, shape: "box", emphasis: "dim" },
        ],
        arrows: [],
      },
      caption: 'Linear probing steps forward by `1` to index `3`, which is free, so `"bat"` lands there.',
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 1, shape: "box", emphasis: "dim" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 1, shape: "box", emphasis: "dim" },
          { id: "b2", label: '"cat"', tag: "2", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "b3", label: '"bat"', tag: "3", x: 3, y: 1, shape: "box", emphasis: "dim" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 1, shape: "box", emphasis: "dim" },
          { id: "newkey", label: '"rat"', tag: "hashes to 2", x: 2, y: 0, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'A third key, `"rat"`, also hashes to index `2`, landing in the same cluster of occupied slots as `"cat"` and `"bat"`.',
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 1, shape: "box", emphasis: "dim" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 1, shape: "box", emphasis: "dim" },
          { id: "b2", label: '"cat"', tag: "2, cluster", x: 2, y: 1, shape: "box", emphasis: "dim" },
          { id: "b3", label: '"bat"', tag: "3, cluster", x: 3, y: 1, shape: "box", emphasis: "dim" },
          { id: "b4", label: '"rat"', tag: "2+2=4", x: 4, y: 1, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'Linear probing has to step past both `"cat"` and `"bat"` before reaching the free slot at index `4`: linear probing tends to grow long clusters like this.',
    },
    {
      state: {
        nodes: [
          { id: "b0", label: "empty", tag: "0", x: 0, y: 3, shape: "box" },
          { id: "b1", label: '"cat"', tag: "1", x: 1, y: 3, shape: "box" },
          { id: "b2", label: "empty", tag: "2", x: 2, y: 3, shape: "box" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 3, shape: "box" },
          { id: "b4", label: "empty", tag: "4", x: 4, y: 3, shape: "box" },
          { id: "b5", label: "empty", tag: "5", x: 5, y: 3, shape: "box" },
          { id: "b6", label: "empty", tag: "6", x: 6, y: 3, shape: "box" },
        ],
        arrows: [],
      },
      caption: "A fresh 7-slot table with quadratic probing: a new key, `\"bat\"`, also hashes to index `1`, where `\"cat\"` already sits.",
    },
    {
      state: {
        nodes: [
          { id: "b1", label: '"cat"', tag: "1, occupied", x: 1, y: 3, shape: "box", emphasis: "error" },
          { id: "try1", label: "1+1²=2", tag: "probe 1", x: 2, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Quadratic probing's first jump adds `1**2 = 1`, checking index `2`. If that were also full, the next jump would add `2**2 = 4`, then `3**2 = 9`, spreading probes out instead of walking one by one.",
    },
    {
      state: {
        nodes: [
          { id: "b1", label: '"cat"', tag: "1", x: 1, y: 3, shape: "box", emphasis: "dim" },
          { id: "b2", label: '"bat"', tag: "1+1=2", x: 2, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'Index `2` is free, so `"bat"` lands there after just one quadratic jump.',
    },
    {
      state: {
        nodes: [
          { id: "b1", label: '"cat"', tag: "1, occupied", x: 1, y: 3, shape: "box", emphasis: "error" },
          { id: "dh", label: "step = hash2(key) = 3", tag: "double hashing", x: 4, y: 3, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Double hashing takes a different approach: a second hash function produces the step size itself, here `3`, instead of always using `1` or squared jumps.",
    },
    {
      state: {
        nodes: [
          { id: "b1", label: '"cat"', tag: "1", x: 1, y: 3, shape: "box", emphasis: "dim" },
          { id: "b4", label: "new key", tag: "1+3=4", x: 4, y: 3, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Adding that step, `1 + 3 = 4`, lands the new key at index `4`, a jump size unique to this key's own second hash.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt:
        "A 7-slot table has \"cat\" at index 3. A new key hashes to index 3 too. Using linear probing, where does the new key land if index 4 is also occupied but index 5 is free?",
      steps: [
        {
          state: {
            nodes: [
              { id: "b3", label: '"cat"', tag: "3", x: 3, y: 1, shape: "box", emphasis: "new" },
              { id: "b4", label: "occupied", tag: "4", x: 4, y: 1, shape: "box", emphasis: "new" },
              { id: "b5", label: "empty", tag: "5", x: 5, y: 1, shape: "box", emphasis: "new" },
            ],
            arrows: [],
          },
          caption: "Index `3` and `4` are both taken; index `5` is the first free slot walking forward.",
        },
      ],
      options: [
        { id: "a", label: "Index 4, since that's next" },
        { id: "b", label: "Index 5" },
        { id: "c", label: "Index 3, overwriting cat" },
        { id: "d", label: "Index 6, skipping ahead" },
      ],
      correctId: "b",
      explainWrong: {
        a: "Linear probing checks index 4, but 4 is occupied too, so it can't stop there; it must keep stepping forward one slot at a time.",
        c: "Probing never overwrites an occupied slot; it only looks for the next free one, walking forward from the original hash index.",
        d: "Linear probing steps by exactly 1 each time, so it can't skip from 4 straight to 6 without checking 5 first, and 5 is already free.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "b5", label: "new key", tag: "index 5", x: 5, y: 1, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "The new key walks past index `3` and `4`, both occupied, and settles into the first free slot at index `5`.",
      },
      reviewStep: 3,
    },
    {
      kind: "predict",
      prompt: "With quadratic probing starting from index i on collision, what is the third probe offset checked (after the original slot)?",
      steps: [
        {
          state: {
            nodes: [{ id: "i", label: "index i, occupied", tag: "collision", x: 2, y: 1, shape: "box", emphasis: "new" }],
            arrows: [],
          },
          caption: "Quadratic probing checks `i + 1**2`, then `i + 2**2`, then `i + 3**2`, using increasing squares as the jump size.",
        },
      ],
      options: [
        { id: "a", label: "i + 3" },
        { id: "b", label: "i + 6" },
        { id: "c", label: "i + 9" },
        { id: "d", label: "i + 1" },
      ],
      correctId: "c",
      explainWrong: {
        a: "Quadratic probing jumps by squares, not the probe number itself; the third jump squares 3 to get 9, it doesn't just add 3.",
        b: "6 isn't a perfect square offset in this sequence; the pattern is 1, 4, 9, from squaring 1, 2, 3, not 1, 2, 3, 6.",
        d: "i + 1 is the first probe, using 1² = 1. The third probe uses 3² = 9, a much larger jump.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "i9", label: "i + 9", tag: "third probe", x: 5, y: 1, shape: "box", emphasis: "new" }],
          arrows: [],
        },
        caption: "The sequence of jumps is `1, 4, 9`: squares of `1, 2, 3`, so the third probe checks index `i + 9`.",
      },
      reviewStep: 7,
    },
    {
      kind: "fillin",
      prompt: "Fill in the missing math so linear_probe returns the next index to check, wrapping around the table with modulo.",
      code: [
        "def linear_probe(start, attempt, table_size):",
        "    return (start {{op}} attempt) % table_size",
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: "+",
          explainWrong:
            "Linear probing steps forward by a fixed amount each attempt, so the offset is added to start. Subtracting, multiplying, or dividing would not produce the steady one-by-one walk linear probing needs.",
        },
      ],
      tests: [
        { name: "first probe steps by 1", code: "assert linear_probe(3, 1, 7) == 4, \"linear_probe(3, 1, 7) should be 4: (3 + 1) % 7\"" },
        { name: "probe wraps around table", code: "assert linear_probe(6, 2, 7) == 1, \"linear_probe(6, 2, 7) should be 1: (6 + 2) % 7 wraps past the end of the table\"" },
      ],
      reviewStep: 3,
    },
    {
      kind: "write",
      prompt:
        "Given a starting index `start`, an `attempt` number, and a hash table size `table_size`, return the next index to probe using quadratic probing: `start + attempt ** 2`, wrapped with `% table_size`.",
      difficulty: "Medium",
      examples: [
        { input: "start = 1, attempt = 1, table_size = 7", output: "2", explanation: "`(1 + 1**2) % 7 == 2`." },
        {
          input: "start = 1, attempt = 3, table_size = 7",
          output: "3",
          explanation: "`(1 + 3**2) % 7 == 10 % 7 == 3`, wrapping past the end of the table.",
        },
      ],
      constraints: ["`attempt >= 1`", "`table_size > 0`", "the result must satisfy `0 <= index < table_size`"],
      bigO: { answer: "O(1)", explain: "Squaring `attempt`, adding, and taking `%` are all constant-time arithmetic operations." },
      starter: "def quadratic_probe(start, attempt, table_size):\n    # attempt squared is the jump size\n    pass\n",
      solution: "def quadratic_probe(start, attempt, table_size):\n    return (start + attempt ** 2) % table_size\n",
      tests: [
        { name: "first probe jumps by 1", code: "assert quadratic_probe(1, 1, 7) == 2, \"quadratic_probe(1, 1, 7) should be 2: (1 + 1**2) % 7\"" },
        { name: "second probe jumps by 4", code: "assert quadratic_probe(1, 2, 7) == 5, \"quadratic_probe(1, 2, 7) should be 5: (1 + 2**2) % 7\"" },
        { name: "third probe wraps around", code: "assert quadratic_probe(1, 3, 7) == 3, \"quadratic_probe(1, 3, 7) should be 3: (1 + 3**2) % 7 = 10 % 7\"" },
      ],
      reviewStep: 7,
    },
  ],
  recall: [
    {
      id: "dsa-hash-tables.probing.1",
      prompt: "On a collision, what does linear probing do?",
      options: [
        "Checks the next slot, then the next, one step at a time, until it finds a free one",
        "Chains the new key onto the occupied slot",
        "Immediately resizes the whole table",
      ],
      correctIndex: 0,
      explainWrong:
        "Linear probing is a form of open addressing: it stays inside the table itself, stepping forward slot by slot, rather than chaining elsewhere or resizing on every single collision.",
    },
    {
      id: "dsa-hash-tables.probing.2",
      prompt: "Why might quadratic probing avoid long clusters better than linear probing?",
      options: [
        "Its jump sizes grow (1, 4, 9, ...) instead of always stepping by exactly 1, spreading probes farther apart",
        "It never has collisions",
        "It always checks every slot in the table",
      ],
      correctIndex: 0,
      explainWrong:
        "Quadratic probing still has collisions; it can't avoid them entirely, and it doesn't scan the whole table either. What helps is that its increasing jump sizes spread probes out instead of piling into one dense run of slots.",
    },
    {
      id: "dsa-hash-tables.probing.3",
      prompt: "What makes double hashing's probe sequence different from linear or quadratic probing?",
      options: [
        "The step size itself comes from a second hash function, so it varies by key",
        "It always uses a step size of exactly 2",
        "It never wraps around the table",
      ],
      correctIndex: 0,
      explainWrong:
        "Double hashing doesn't fix the step at 2, and it still wraps with modulo like the others. Its distinguishing feature is that a second hash function computes a step size unique to each key.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 4: resize-and-functions — load factor crossing a threshold triggers
// a bigger table and a full rehash of every key.
// ---------------------------------------------------------------------------

const resizeAndFunctionsUnit: Unit = {
  id: "resize-and-functions",
  title: "Load Factor Triggers a Resize",
  watch: [
    {
      state: {
        nodes: [
          { id: "b0", label: '"a"', tag: "0", x: 0, y: 1, shape: "box" },
          { id: "b1", label: "empty", tag: "1", x: 1, y: 1, shape: "box" },
          { id: "b2", label: '"b"', tag: "2", x: 2, y: 1, shape: "box" },
          { id: "b3", label: "empty", tag: "3", x: 3, y: 1, shape: "box" },
          { id: "load", label: "2 / 4 = 0.5", tag: "load factor", x: 1.5, y: 0, shape: "frame" },
        ],
        arrows: [],
      },
      caption: "A 4-slot table holds `2` keys, so its load factor, entries divided by capacity, is `0.5`.",
    },
    {
      state: {
        nodes: [
          { id: "b0", label: '"a"', tag: "0", x: 0, y: 1, shape: "box" },
          { id: "b1", label: '"c"', tag: "1", x: 1, y: 1, shape: "box", emphasis: "new" },
          { id: "b2", label: '"b"', tag: "2", x: 2, y: 1, shape: "box" },
          { id: "load", label: "3 / 4 = 0.75", tag: "load factor", x: 1.5, y: 0, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'Inserting `"c"` brings the count to `3`, pushing the load factor up to `0.75`.',
    },
    {
      state: {
        nodes: [
          { id: "b0", label: '"a"', tag: "0", x: 0, y: 1, shape: "box" },
          { id: "b1", label: '"c"', tag: "1", x: 1, y: 1, shape: "box" },
          { id: "b2", label: '"b"', tag: "2", x: 2, y: 1, shape: "box" },
          { id: "b3", label: '"d"', tag: "3, full", x: 3, y: 1, shape: "box", emphasis: "error" },
          { id: "load", label: "4 / 4 = 1.0", tag: "over threshold", x: 1.5, y: 0, shape: "frame", emphasis: "error" },
        ],
        arrows: [],
      },
      caption: 'Inserting `"d"` fills the table completely: load factor `1.0`, past the typical resize threshold of around `0.7`.',
    },
    {
      state: {
        nodes: [
          { id: "big", label: "size 8", tag: "new table", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: "Crossing the threshold triggers a resize: a brand new, bigger table is allocated, here doubled to `8` slots.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: "empty", tag: "0", x: 0, y: 2, shape: "box" },
          { id: "n1", label: "empty", tag: "1", x: 1, y: 2, shape: "box" },
          { id: "n2", label: "empty", tag: "2", x: 2, y: 2, shape: "box" },
          { id: "n3", label: "empty", tag: "3", x: 3, y: 2, shape: "box" },
          { id: "n4", label: "empty", tag: "4", x: 4, y: 2, shape: "box" },
          { id: "n5", label: "empty", tag: "5", x: 5, y: 2, shape: "box" },
          { id: "n6", label: "empty", tag: "6", x: 6, y: 2, shape: "box" },
          { id: "n7", label: "empty", tag: "7", x: 7, y: 2, shape: "box" },
        ],
        arrows: [],
      },
      caption: "The new 8-slot table starts empty; every existing key must now be rehashed into it, since `% 8` gives different indices than `% 4` did.",
    },
    {
      state: {
        nodes: [
          { id: "n0", label: '"a"', tag: "hash(a) % 8 = 0", x: 0, y: 2, shape: "box", emphasis: "new" },
          { id: "n1", label: "empty", tag: "1", x: 1, y: 2, shape: "box", emphasis: "dim" },
          { id: "n5", label: '"c"', tag: "hash(c) % 8 = 5", x: 5, y: 2, shape: "box", emphasis: "new" },
          { id: "n3", label: '"b"', tag: "hash(b) % 8 = 3", x: 3, y: 2, shape: "box", emphasis: "new" },
          { id: "n6", label: '"d"', tag: "hash(d) % 8 = 6", x: 6, y: 2, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'Each key is rehashed with the new table size: `"a"`, `"b"`, `"c"`, `"d"` land in fresh spots that have nothing to do with their old indices in the 4-slot table.',
    },
    {
      state: {
        nodes: [
          { id: "n0", label: '"a"', tag: "0", x: 0, y: 2, shape: "box" },
          { id: "n3", label: '"b"', tag: "3", x: 3, y: 2, shape: "box" },
          { id: "n5", label: '"c"', tag: "5", x: 5, y: 2, shape: "box" },
          { id: "n6", label: '"d"', tag: "6", x: 6, y: 2, shape: "box" },
          { id: "load2", label: "4 / 8 = 0.5", tag: "load factor", x: 3, y: 0, shape: "frame", emphasis: "active" },
        ],
        arrows: [],
      },
      caption: "After the resize, the load factor drops back down to `0.5`, with plenty of room before the next resize is needed.",
    },
  ],
  ladder: [
    {
      kind: "predict",
      prompt: "A table has 6 entries and 8 slots. What is its load factor, and does it typically trigger a resize at a common threshold of 0.7?",
      steps: [
        {
          state: {
            nodes: [{ id: "info", label: "6 entries, 8 slots", tag: "table", x: 3, y: 1, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "Load factor is `entries / slots`.",
        },
      ],
      options: [
        { id: "a", label: "0.75, yes it crosses 0.7" },
        { id: "b", label: "0.75, no it stays under 0.7" },
        { id: "c", label: "1.33, yes it crosses 0.7" },
        { id: "d", label: "0.48, no it stays under 0.7" },
      ],
      correctId: "a",
      explainWrong: {
        b: "6 / 8 = 0.75 is correct, but 0.75 is above the 0.7 threshold, not below it, so a resize would in fact be triggered.",
        c: "Load factor is entries divided by slots, 6 / 8, not slots divided by entries; 8 / 6 would give 1.33, which isn't how load factor is defined.",
        d: "6 / 8 is 0.75, not 0.48; 0.48 isn't the correct division of these two numbers at all.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "lf", label: "0.75, over threshold", tag: "load factor", x: 3, y: 1, shape: "frame", emphasis: "error" }],
          arrows: [],
        },
        caption: "`6 / 8 = 0.75`, which is past the common `0.7` threshold, so this table would trigger a resize.",
      },
      reviewStep: 2,
    },
    {
      kind: "predict",
      prompt: "After a table resizes from 4 slots to 8 slots, why can't the old keys simply stay at their old indices?",
      steps: [
        {
          state: {
            nodes: [{ id: "old", label: "hash(key) % 4", tag: "old index math", x: 3, y: 1, shape: "frame", emphasis: "new" }],
            arrows: [],
          },
          caption: "Every key's bucket index was computed using modulo the OLD table size, `4`.",
        },
      ],
      options: [
        { id: "a", label: "Because modulo a different table size generally produces a different index" },
        { id: "b", label: "Because the keys themselves change value during a resize" },
        { id: "c", label: "Because old indices become negative in the bigger table" },
      ],
      correctId: "a",
      explainWrong: {
        b: "Resizing never touches the key's actual value, only where it's stored; the key itself is unchanged.",
        c: "There's nothing about a bigger table that makes old indices negative; the real issue is that hash(key) % 4 and hash(key) % 8 are simply different calculations that usually give different results.",
      },
      revealStep: {
        state: {
          nodes: [{ id: "newh", label: "hash(key) % 8", tag: "new index math", x: 3, y: 1, shape: "frame", emphasis: "active" }],
          arrows: [],
        },
        caption: "Each key must be rehashed with the new table size, since `% 8` generally scatters keys to different buckets than `% 4` did.",
      },
      reviewStep: 5,
    },
    {
      kind: "fillin",
      prompt: "Fill in the comparison so should_resize returns True once load factor exceeds the threshold.",
      code: [
        "def should_resize(entry_count, table_size, threshold):",
        "    load_factor = entry_count / table_size",
        "    return load_factor {{op}} threshold",
      ].join("\n"),
      blanks: [
        {
          id: "op",
          placeholder: "___",
          answer: ">",
          explainWrong:
            "A resize should trigger only once the load factor climbs past the threshold, so the comparison needs strictly greater than; < or == would either never trigger correctly or trigger at the wrong exact boundary.",
        },
      ],
      tests: [
        { name: "below threshold, no resize", code: "assert should_resize(2, 4, 0.7) is False, \"should_resize(2, 4, 0.7) should be False: 0.5 load factor is under 0.7\"" },
        { name: "above threshold, resize", code: "assert should_resize(6, 8, 0.7) is True, \"should_resize(6, 8, 0.7) should be True: 0.75 load factor is over 0.7\"" },
      ],
      reviewStep: 2,
    },
  ],
  recall: [
    {
      id: "dsa-hash-tables.resize-and-functions.1",
      prompt: "What is a hash table's load factor?",
      options: [
        "The number of entries divided by the total number of slots",
        "The number of collisions that have occurred",
        "The table's total slot count",
      ],
      correctIndex: 0,
      explainWrong:
        "Load factor is specifically entries divided by capacity; it isn't a raw collision count or just the table's size on its own.",
    },
    {
      id: "dsa-hash-tables.resize-and-functions.2",
      prompt: "When a hash table resizes to a bigger table, why must every existing key be rehashed instead of just copied over at the same index?",
      options: [
        "Because bucket index depends on modulo table size, and the table size just changed",
        "Because the keys' hash values change during a resize",
        "Because resizing deletes half the keys on purpose",
      ],
      correctIndex: 0,
      explainWrong:
        "A key's hash value itself never changes; what changes is the table size used in the modulo step, which is exactly why the resulting bucket index usually changes too. Resizing also never deliberately drops entries.",
    },
    {
      id: "dsa-hash-tables.resize-and-functions.3",
      prompt: "Why do hash tables typically resize before the load factor reaches a full 1.0?",
      options: [
        "To keep chains short and probe sequences short, so lookups stay fast",
        "Because Python won't allow a load factor of exactly 1.0",
        "To save memory by using fewer slots",
      ],
      correctIndex: 0,
      explainWrong:
        "There's no hard rule against reaching 1.0, and resizing earlier uses more memory, not less. The real reason is performance: a lower load factor keeps collisions, chain lengths, and probe sequences short.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Unit 5: apply-hash — apply hashing ideas in a small word-count program.
// ---------------------------------------------------------------------------

const applyHashUnit: Unit = {
  id: "apply-hash",
  title: "Apply: Word Frequency Counter",
  watch: [
    {
      state: {
        nodes: [
          { id: "words", label: '["the", "cat", "the"]', tag: "input words", x: 3, y: 0, shape: "box", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'A list of `words` needs to be turned into a count of how many times each one appears, using a dictionary as the hash table underneath.',
    },
    {
      state: {
        nodes: [
          { id: "dict", label: '{"the": 2, "cat": 1}', tag: "counts (dict)", x: 3, y: 1, shape: "frame", emphasis: "new" },
        ],
        arrows: [],
      },
      caption: 'Under the hood, the dictionary hashes each word to find its bucket instantly: `"the"` appears twice, `"cat"` once, with no manual searching required.',
    },
  ],
  ladder: [
    {
      kind: "apply",
      prompt:
        "Given a list of strings `words`, return a dictionary mapping each word to the number of times it appears in `words`. Then, given a string `s` and a table size `size`, return `simple_hash(s, size)`: the sum of `ord(c)` for every character `c` in `s`, reduced with `% size`.",
      difficulty: "Medium",
      examples: [
        { input: "words = [\"the\", \"cat\", \"the\"]", output: "{\"the\": 2, \"cat\": 1}" },
        { input: "s = \"cat\", size = 7", output: "sum(ord(c) for c in \"cat\") % 7" },
      ],
      constraints: [
        "`words` may be empty, in which case the result is `{}`",
        "`simple_hash` must return a value satisfying `0 <= result < size`",
      ],
      bigO: { fn: "word_counts", answer: "O(n)", explain: "`word_counts` makes one pass over `words`, so its cost grows linearly with the list's length." },
      starter:
        "def word_counts(words):\n    # return a dict: word -> count\n    pass\n\ndef simple_hash(s, size):\n    # sum ord(c) for each character c in s, then reduce with modulo size\n    pass\n",
      solution:
        "def word_counts(words):\n    counts = {}\n    for word in words:\n        if word in counts:\n            counts[word] += 1\n        else:\n            counts[word] = 1\n    return counts\n\ndef simple_hash(s, size):\n    total = 0\n    for c in s:\n        total += ord(c)\n    return total % size\n",
      tests: [
        {
          name: "counts each word",
          code:
            "result = word_counts(['the', 'cat', 'the'])\nassert result == {'the': 2, 'cat': 1}, \"word_counts(['the', 'cat', 'the']) should be {'the': 2, 'cat': 1}\"",
        },
        {
          name: "empty list gives empty dict",
          code: "assert word_counts([]) == {}, \"word_counts([]) should be {}: no words means no counts\"",
        },
        {
          name: "simple_hash matches manual sum",
          code:
            "expected = sum(ord(c) for c in 'cat') % 7\nassert simple_hash('cat', 7) == expected, \"simple_hash('cat', 7) should equal sum(ord(c) for c in 'cat') % 7\"",
        },
        {
          name: "simple_hash stays in range",
          code:
            "for w in ['a', 'hash', 'table', 'zzz']:\n    idx = simple_hash(w, 5)\n    assert 0 <= idx < 5, f\"simple_hash({w!r}, 5) should be between 0 and 4, got {idx}: a hash index must fit the table size\"",
        },
      ],
      reviewStep: 1,
    },
  ],
  recall: [
    {
      id: "dsa-hash-tables.apply-hash.1",
      prompt: "Why does a word-counting dictionary not need to manually search for each word before updating its count?",
      options: [
        "Because the dictionary hashes each key to its bucket directly, giving near-instant lookup instead of a linear scan",
        "Because Python secretly sorts the dictionary first",
        "Because there are never more than a few words in any list",
      ],
      correctIndex: 0,
      explainWrong:
        "Python dictionaries aren't sorted internally, and the speed has nothing to do with how few words there are. The real reason is hashing itself: each key's hash points almost directly at its bucket.",
    },
    {
      id: "dsa-hash-tables.apply-hash.2",
      prompt: "In a simple hash function that sums character codes with ord(), why is the modulo step still necessary?",
      options: [
        "To reduce the potentially large sum down to a valid bucket index for the table's size",
        "To make the hash function run faster",
        "Because ord() values are always negative without it",
      ],
      correctIndex: 0,
      explainWrong:
        "ord() values are never negative, and modulo isn't a speed optimization here. Its job is purely to squeeze a sum that can be much larger than the table down into a valid index range.",
    },
  ],
};

export const chDsaHash: Chapter = {
  id: "dsa-hash-tables",
  phase: 2,
  title: "Hash Tables",
  units: [hashingBucketsUnit, chainingUnit, probingUnit, resizeAndFunctionsUnit, applyHashUnit],
};
