# OUTPUT-CONTRACT — the one and only manifest schema

Every Perplexity response from this Space is exactly **one fenced ```json code
block** containing a single object matching the schema below — and nothing
else. No preamble, no markdown headings, no closing remarks, no sources list,
no commentary.

If you cannot fulfil the request for any reason, still return a manifest with
`files: []`, `queueCompletedIds: []`, and a clear message in `notes`.

---

## Manifest schema

```ts
interface Manifest {
  schemaVersion: 1
  scope: {
    subject: string                // e.g. "gen-ai"
    stageId: string                // e.g. "computing-foundations"
    topicId: string                // top-level node id from the roadmap
    subtopicId: string             // parent of the sub-subtopic
    subsubtopicId: string          // == the folder under topics/
  }
  files: Array<{
    path: string                   // src/content/subjects/<subject>/topics/<subsubtopicId>/sections/<sectionKey>.json
    content: object                // matches the section's schema in SECTION-SCHEMAS.md
  }>
  glossaryAdditions: Array<{       // ONLY genuinely new terms (not already in GLOBAL-GLOSSARY.json)
    term: string
    definition: string
  }>
  imageTasks: Array<{              // one entry for every images.json item you emit
    src: string                    // must match the src field in images.json
    alt: string                    // must match the alt field in images.json
    prompt: string                 // either an image-gen prompt OR a directive like "screenshot of …"
    suggestedSources?: string[]    // optional URLs to Wikimedia / official docs / CC sources
  }>
  queueCompletedIds: string[]      // sub-subtopic ids that this manifest fully covers (usually exactly one)
  notes?: string                   // free-form notes about decisions, omissions, or blockers
}
```

### Hard rules

1. `schemaVersion` is the literal number `1`.
2. `scope.subsubtopicId` MUST match the queue entry being processed and MUST
   appear under the corresponding stage/topic/subtopic in `ROADMAP-<subject>.md`.
3. Every `files[i].path` MUST be of the form
   `src/content/subjects/<scope.subject>/topics/<scope.subsubtopicId>/sections/<sectionKey>.json`
   where `<sectionKey>` is one of the 24 keys in `SECTION-SCHEMAS.md`.
4. Each `files[i].content` MUST match the section schema for that key. Any
   extra fields will be rejected.
5. `glossaryAdditions` MUST exclude any term already present in
   `GLOBAL-GLOSSARY.json` (case-insensitive `term` match). If you find a
   conflicting definition for an existing term, leave it out and describe the
   conflict in `notes`.
6. `imageTasks` length MUST equal the number of items in the emitted
   `images.json` (or `0` if no `images.json` was emitted).
7. `queueCompletedIds` MUST include the sub-subtopic actually generated (usually
   `[scope.subsubtopicId]`) and nothing else.
8. The JSON MUST be strictly valid: double-quoted keys, no trailing commas, no
   JS comments, ASCII quotes only.

### Soft rules (apply script will warn, not abort)

- Aim for **6–14** populated section files per sub-subtopic. Outliers should be
  justified in `notes`.
- Keep individual snippet/code fields under ~3,000 characters; break very long
  sections into multiple items.

---

## Fully worked example

The sub-subtopic being generated is `programming-basics--operators-and-expressions`
under `computing-foundations > programming-fundamentals > programming-basics`
for the `gen-ai` subject.

```json
{
  "schemaVersion": 1,
  "scope": {
    "subject": "gen-ai",
    "stageId": "computing-foundations",
    "topicId": "programming-fundamentals",
    "subtopicId": "programming-basics",
    "subsubtopicId": "programming-basics--operators-and-expressions"
  },
  "files": [
    {
      "path": "src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/sections/explanation.json",
      "content": {
        "definition": "An expression is any piece of code that evaluates to a value; an operator is a symbol that combines values (its operands) into a new value.",
        "layman": "Expressions are noun-phrases; operators are the verbs that combine them.",
        "content": "## Operators & Expressions\n\nAn **expression** is any piece of code that evaluates to a value. An **operator** is a symbol that combines values - its **operands** - into a new value. In `2 + 3`, the whole thing is an expression, `+` is the operator, and `2` and `3` are operands.\n\n### Arithmetic operators\n\n`/` always returns a `float`; `//` is floor division and rounds toward negative infinity. `**` is right-associative, so `2 ** 3 ** 2` is `2 ** (3 ** 2) = 512`.\n\n### Boolean operators\n\n`and`, `or`, `not` short-circuit and return one of the operands - not always a pure boolean.\n\n### Truthiness\n\nFalsy values: `False`, `None`, `0`, `0.0`, `''`, `[]`, `{}`, `set()`. Everything else is truthy.",
        "keyPoints": [
          "/ is float division, // is floor division (toward negative infinity), ** is right-associative.",
          "and/or short-circuit and return an operand; comparisons can be chained.",
          "Use 'is None' (not 'or') for defaults when 0/0.0/'' are valid values."
        ]
      }
    },
    {
      "path": "src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/sections/code.json",
      "content": {
        "snippets": [
          {
            "title": "Division types and precedence",
            "language": "python",
            "code": "print(7 / 2)        # 3.5\nprint(7 // 2)       # 3\nprint(-7 // 2)      # -4 (rounds toward negative infinity)\nprint(2 ** 3 ** 2)  # 512 (** is right-associative)",
            "explanation": "Know which operator binds first; reach for parentheses when an expression is non-obvious."
          },
          {
            "title": "The 'or default' pitfall with zero",
            "language": "python",
            "code": "config = {\"temperature\": 0.0}\nbad = config.get(\"temperature\") or 0.7\nprint(bad)   # 0.7 (wrong: 0.0 is falsy)\n\nvalue = config.get(\"temperature\")\ngood = value if value is not None else 0.7\nprint(good)  # 0.0 (correct)",
            "explanation": "Use an explicit 'is not None' check whenever 0, 0.0 or '' are valid inputs."
          }
        ]
      }
    },
    {
      "path": "src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/sections/mistakes.json",
      "content": {
        "items": [
          {
            "mistake": "Using `or` as a default when 0, 0.0 or '' are legitimate values.",
            "fix": "Use an explicit None check: `value if value is not None else default`.",
            "why": "Falsy values are valid inputs; `or` discards them.",
            "example": "```python\ntemperature = config.get('temperature') or 0.7   # 0.0 becomes 0.7 - bug\n```"
          }
        ]
      }
    },
    {
      "path": "src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/sections/exam-prep.json",
      "content": {
        "items": [
          {
            "question": "What is the value of 7 // 2 in Python 3?",
            "options": ["3.5", "3", "4", "1"],
            "answer": "3",
            "explanation": "// is floor division and returns the integer quotient 3."
          },
          {
            "question": "What is the result of 2 ** 3 ** 2?",
            "options": ["64", "512", "36", "128"],
            "answer": "512",
            "explanation": "** is right-associative: 2 ** (3 ** 2) = 2 ** 9 = 512."
          }
        ]
      }
    },
    {
      "path": "src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/sections/mastery.json",
      "content": {
        "criteria": [
          { "label": "Predict the result of mixed-precedence expressions like 2 ** 3 ** 2 and 3 + 2 * 2 without running them.", "level": "beginner" },
          { "label": "List every falsy value in Python and explain why `if items:` is preferred over `if len(items) > 0:`.", "level": "beginner" },
          { "label": "Refactor an `x or default` bug into an `x if x is not None else default` fix and explain the difference.", "level": "intermediate" }
        ]
      }
    }
  ],
  "glossaryAdditions": [
    { "term": "Walrus operator", "definition": "The := assignment expression (Python 3.8+) that binds a name to a value as part of a larger expression." }
  ],
  "imageTasks": [],
  "queueCompletedIds": ["programming-basics--operators-and-expressions"],
  "notes": "Omitted diagrams/charts/origins/connections/question-patterns/case-studies/projects: a small-syntax topic like this is best taught with explanation + code + mistakes + self-test."
}
```

---

## What "nothing else" means

A bad response — even though the JSON itself is fine:

````
Sure! Here's the manifest for programming-basics--operators-and-expressions:

```json
{ "schemaVersion": 1, ... }
```

Let me know if you'd like me to expand any section!
````

A good response — exactly one ```json block, nothing surrounding it:

````
```json
{ "schemaVersion": 1, ... }
```
````

Anything outside the single ```json fence is treated as a contract violation by
the apply script.
