# SECTION-SCHEMAS — JSON shape for every section file

There are **24 section keys**. Each section is one JSON file at:

```
src/content/subjects/<subject>/topics/<subsubtopicId>/sections/<sectionKey>.json
```

The host app and build pipeline skip any section file you omit, so emit only
the sections that genuinely help (see `RULES.md` §4). Below, each section lists:

- the canonical filename,
- the TypeScript-style shape (required vs optional),
- one **good** example (kept tiny — your real output should be richer),
- one **bad** example highlighting a common failure mode.

Conventions used below:

- `?` after a field means optional.
- All `string` fields are plain Markdown unless noted.
- Use `\n` for newlines inside string fields; do not use unescaped raw newlines
  inside JSON strings.

---

## 1. `explanation.json` — Core definition + plain-language explanation

```ts
{
  definition?: string,      // concise canonical definition (one sentence ideal)
  layman?: string,          // jargon-free restatement that preserves correctness
  content: string,          // main Markdown body
  keyPoints?: string[]      // 3–6 takeaways
}
```

Good:

```json
{
  "definition": "An expression is any piece of code that evaluates to a value.",
  "layman": "Expressions are noun-phrases; operators are the verbs that combine them.",
  "content": "## Operators & Expressions\n\nAn **expression** ... ",
  "keyPoints": [
    "/ is float division, // is floor division.",
    "and/or short-circuit and return an operand, not always a bool."
  ]
}
```

Bad (definition restates the title; content is empty filler):

```json
{
  "definition": "Operators and expressions are operators and expressions.",
  "content": "This topic covers operators and expressions in Python."
}
```

---

## 2. `examples.json` — Real-world scenarios

```ts
{
  items: [
    { title: string, scenario: string, explanation?: string }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Retrying a flaky model API call",
      "scenario": "An LLM provider occasionally returns transient 5xx errors. Wrapping the call site with @retry(times=3) re-issues the request a few times before giving up.",
      "explanation": "The decorator owns the loop and error handling, so every API helper gets the same retry policy without copy-pasting try/except blocks."
    }
  ]
}
```

Bad (scenario is generic, not a real situation):

```json
{ "items": [{ "title": "Example 1", "scenario": "You can use decorators here." }] }
```

---

## 3. `code.json` — Runnable snippets

```ts
{
  snippets: [
    {
      title: string,
      language: string,         // e.g. "python", "typescript", "bash"
      code: string,             // verbatim runnable code
      explanation?: string
    }
  ]
}
```

Good:

```json
{
  "snippets": [
    {
      "title": "Division types and precedence",
      "language": "python",
      "code": "print(7 / 2)        # 3.5  -> float division\nprint(7 // 2)       # 3    -> floor division\nprint(2 ** 3 ** 2)  # 512  -> ** is right-associative",
      "explanation": "Know which operator binds first; reach for parentheses when an expression is non-obvious."
    }
  ]
}
```

Bad (pseudo-code, won't run):

```json
{ "snippets": [{ "title": "Divide", "language": "python", "code": "DIVIDE(a, b) -> a / b" }] }
```

---

## 4. `diagrams.json` — Mermaid diagrams

```ts
{
  items: [
    { title?: string, mermaid: string, caption?: string }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "How @deco rewrites a call",
      "mermaid": "flowchart LR\n  A[\"@deco above greet\"] --> B[\"greet = deco(greet)\"]\n  B --> C[\"name 'greet' now points at wrapper\"]\n  C --> D[\"call greet(x)\"]",
      "caption": "Decorating rebinds the function name to the wrapper returned by the decorator."
    }
  ]
}
```

Bad (uses spaces in node IDs, uses `end` as id, uses style):

```json
{
  "items": [{
    "mermaid": "flowchart LR\n  user input --> end\n  style end fill:#fff"
  }]
}
```

See `RULES.md` §8 for the full Mermaid rules.

---

## 5. `charts.json` — Data-only charts

```ts
{
  items: [
    {
      title?: string,
      kind: "bar" | "line" | "pie" | "area",
      xKey: string,                                  // key present in every row
      series: [{ key: string, label?: string }],     // each key present in every row
      data: Array<Record<string, string | number>>,
      caption?: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Latency with vs without lru_cache (illustrative)",
      "kind": "bar",
      "xKey": "call",
      "series": [
        { "key": "uncached", "label": "Uncached (ms)" },
        { "key": "cached", "label": "Cached (ms)" }
      ],
      "data": [
        { "call": "1st", "uncached": 120, "cached": 120 },
        { "call": "2nd", "uncached": 118, "cached": 0 }
      ],
      "caption": "Illustrative only. The first call pays full cost; later calls are cached."
    }
  ]
}
```

Bad (`xKey` not in rows; `series.key` mismatched; numbers as strings):

```json
{
  "items": [{
    "kind": "bar",
    "xKey": "label",
    "series": [{ "key": "ms" }],
    "data": [{ "name": "Cached", "value": "0" }]
  }]
}
```

---

## 6. `images.json` — Static images

```ts
{
  items: [
    { src: string, alt: string, caption?: string }
  ]
}
```

`src` is a path under `public/`, conventionally `content-assets/<subject>/<subsubtopicId>/<filename>.png`.
You will NOT be able to host the image yourself — see `IMAGE-POLICY.md`. Always
include a matching entry in the manifest's `imageTasks` for every `images.json`
file you emit.

Good:

```json
{
  "items": [
    {
      "src": "content-assets/gen-ai/jupyter-notebooks--cells-and-kernels/notebook-anatomy.png",
      "alt": "Schematic of a Jupyter notebook showing the toolbar, a Markdown cell, a code cell with execution count In [1] and its output Out [1], and a kernel status panel.",
      "caption": "Anatomy of a notebook: toolbar, Markdown and code cells, In[n]/Out[n] execution counts, output area, kernel status."
    }
  ]
}
```

Bad (decorative stock photo with no educational value, no `alt`):

```json
{ "items": [{ "src": "https://images.example.com/banner.jpg" }] }
```

---

## 7. `synonyms.json` — Topic-scoped glossary terms

```ts
{
  terms: [
    { term: string, definition: string }
  ]
}
```

Good:

```json
{
  "terms": [
    { "term": "Truthiness", "definition": "Whether a value is treated as true or false in a boolean context. Falsy: False, None, 0, 0.0, '', [], {}, set()." },
    { "term": "Floor division", "definition": "The // operator: divides and rounds toward negative infinity, yielding an integer-style quotient." }
  ]
}
```

Bad (duplicates an already-defined term with a worse wording):

```json
{
  "terms": [
    { "term": "Truthiness", "definition": "How truthy something is." }
  ]
}
```

> Cross-check every term against `GLOBAL-GLOSSARY.json` before adding.

---

## 8. `connections.json` — Conceptual links to other topics

```ts
{
  items: [
    {
      title: string,
      relation?: string,       // e.g. "builds on", "contrasts with", "uses"
      description: string,
      topicId?: string         // deep-link to another topic in the same subject
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Closures & first-class functions",
      "relation": "builds on",
      "description": "A decorator's wrapper is a closure that captures the original function; this only works because functions are first-class values that can be passed and returned."
    }
  ]
}
```

Bad (vague, no relation):

```json
{ "items": [{ "title": "Functions", "description": "Decorators relate to functions." }] }
```

---

## 9. `applications.json` — Real-world uses

```ts
{
  items: [
    { title: string, description: string }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Safe defaults and guards",
      "description": "Short-circuiting builds robust calls: model = requested or 'gpt-4o'; avoid using `or` for defaults when 0/0.0/'' are valid values."
    }
  ]
}
```

Bad (single-word, no content):

```json
{ "items": [{ "title": "Use cases", "description": "Many." }] }
```

---

## 10. `tradeoffs.json` — Advantages and disadvantages

```ts
{
  advantages: string[],
  disadvantages: string[]
}
```

Good:

```json
{
  "advantages": [
    "Removes duplicated cross-cutting code (logging, timing, retries) from many functions.",
    "Composable: multiple decorators can be stacked to combine behaviours."
  ],
  "disadvantages": [
    "Adds a layer of indirection that can make stack traces and debugging harder to follow.",
    "Easy to break introspection if you forget functools.wraps."
  ]
}
```

Bad (one-sided; restates rather than trades off):

```json
{ "advantages": ["Decorators are good."], "disadvantages": [] }
```

---

## 11. `mistakes.json` — Common mistakes + fix

```ts
{
  items: [
    {
      mistake: string,
      fix: string,
      why?: string,
      example?: string       // tiny Markdown snippet illustrating mistake or fix
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "mistake": "Forgetting functools.wraps on the wrapper",
      "fix": "Add @functools.wraps(fn) to the wrapper so the decorated function keeps its __name__, __doc__ and signature metadata.",
      "why": "Without it, tools, docs and debuggers see the generic 'wrapper' instead of the real function.",
      "example": "```python\n@deco\ndef embed(): ...\nembed.__name__   # 'wrapper'  <-- bug; with @functools.wraps(fn) it would be 'embed'\n```"
    }
  ]
}
```

Bad (mistake and fix are the same sentence):

```json
{ "items": [{ "mistake": "Bug", "fix": "Don't have the bug." }] }
```

---

## 12. `misconceptions.json` — Myth + reality

```ts
{
  items: [
    {
      myth: string,
      reality: string,
      example?: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "myth": "A decorator modifies or edits the original function's code.",
      "reality": "It leaves the original untouched and rebinds the name to a wrapper that calls the original.",
      "example": "After `@timing\\ndef embed(): ...`, the underlying `embed` is unchanged. With `@functools.wraps`, you can still reach it via `wrapper.__wrapped__()`."
    }
  ]
}
```

Bad (reality contradicts itself):

```json
{ "items": [{ "myth": "X is fast.", "reality": "X is fast." }] }
```

---

## 13. `best-practices.json` — Pitfalls & best practices

```ts
{
  items: [
    {
      title: string,
      avoid: string,
      prefer: string,
      why?: string,
      example?: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Preserve metadata",
      "avoid": "Returning a bare wrapper function that loses the original name and docstring.",
      "prefer": "Always wrap the inner function with @functools.wraps(fn).",
      "why": "Introspection, logging and documentation tools rely on accurate __name__ and __doc__.",
      "example": "```python\n@functools.wraps(fn)\ndef wrapper(*a, **kw): ...\n```"
    }
  ]
}
```

Bad (no `prefer`):

```json
{ "items": [{ "title": "Avoid this", "avoid": "Don't do X." }] }
```

---

## 14. `origins.json` — History / what came before

```ts
{
  content: string,                                    // Markdown narrative
  timeline?: [{ label: string, description: string }]
}
```

Good:

```json
{
  "content": "Before the `@` syntax existed, Python programmers wrapped functions by hand — assigning `fn = deco(fn)` after the definition. The `@decorator` syntax was added to make that intent explicit and visible right above the definition.",
  "timeline": [
    { "label": "PEP 318 (Python 2.4, 2004)", "description": "Introduced the @decorator syntax for functions and methods." },
    { "label": "PEP 3129 (Python 3.0)", "description": "Extended decorator syntax to classes." }
  ]
}
```

Bad (timeline labels are vague):

```json
{ "content": "Old then new.", "timeline": [{ "label": "Before", "description": "It was different." }] }
```

---

## 15. `question-patterns.json` — Structured inquiry

```ts
{
  groups: [
    {
      pattern: "5w1h" | "socratic" | "mindmap" | "comparative" | "what-if" | "cause-effect" | "what-breaks-this",
      items: [{ question: string, answer: string }]
    }
  ]
}
```

Completeness is mandatory — see `RULES.md` §6.

Good (5w1h has all six items; what-if has scenario + consequence):

```json
{
  "groups": [
    {
      "pattern": "5w1h",
      "items": [
        { "question": "Who uses decorators?", "answer": "Library authors and application devs who want to add cross-cutting behaviour without modifying call sites." },
        { "question": "What is a decorator?", "answer": "A callable that takes a function and returns a replacement, adding behaviour around it without changing its source." },
        { "question": "When does decoration happen?", "answer": "At definition/import time: `@deco` runs `fn = deco(fn)` once, the moment the `def` is executed." },
        { "question": "Where is decoration applied?", "answer": "Immediately above the `def` (function) or `class` definition, using the `@` syntax." },
        { "question": "Why use a decorator?", "answer": "To keep functions focused on their core logic while reusing behaviour like timing, retries, caching, auth." },
        { "question": "How do you preserve the original function's metadata?", "answer": "Wrap the inner function with `@functools.wraps(fn)`, which copies __name__, __doc__ and more." }
      ]
    }
  ]
}
```

Bad (5w1h missing Where; what-if has no consequence):

```json
{
  "groups": [
    { "pattern": "5w1h", "items": [
      { "question": "Who?", "answer": "..." },
      { "question": "What?", "answer": "..." },
      { "question": "When?", "answer": "..." },
      { "question": "Why?", "answer": "..." },
      { "question": "How?", "answer": "..." }
    ]},
    { "pattern": "what-if", "items": [{ "question": "What if you forget @wraps?", "answer": "Bad." }] }
  ]
}
```

---

## 16. `materials.json` — Learning materials

```ts
{
  items: [
    {
      title: string,
      type: "article" | "video" | "book" | "course" | "docs" | "tool",
      url: string,
      description?: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "PEP 318 — Decorators for Functions and Methods",
      "type": "docs",
      "url": "https://peps.python.org/pep-0318/",
      "description": "The original specification of the @decorator syntax."
    }
  ]
}
```

Bad (paywalled blog with no description; mismatched type):

```json
{ "items": [{ "title": "Random blog", "type": "tool", "url": "https://example.com" }] }
```

---

## 17. `references.json` — Authoritative references

```ts
{
  items: [
    {
      title: string,
      url: string,
      author?: string,
      note?: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Expressions — Python language reference",
      "url": "https://docs.python.org/3/reference/expressions.html",
      "author": "Python Software Foundation",
      "note": "Full definition of operators, expressions and the operator-precedence table."
    }
  ]
}
```

Bad (broken-looking URL, no note):

```json
{ "items": [{ "title": "Some ref", "url": "example.com/ref" }] }
```

---

## 18. `projects.json` — Hands-on projects

```ts
{
  items: [
    {
      title: string,
      difficulty: "beginner" | "intermediate" | "advanced",
      description: string,
      requirements?: string[]
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Build a @retry(times, on=Exception) decorator",
      "difficulty": "intermediate",
      "description": "Implement a parametrized decorator that re-runs the wrapped function up to `times` attempts, catching the specified exception. Preserve metadata with functools.wraps and add jittered exponential backoff between attempts.",
      "requirements": ["Python 3.10+", "Comfort with closures and *args/**kwargs"]
    }
  ]
}
```

Bad (no description, invalid difficulty):

```json
{ "items": [{ "title": "Project", "difficulty": "easy", "description": "Try it." }] }
```

---

## 19. `interview-questions.json` — Interview-style Q&A

```ts
{
  items: [
    {
      question: string,
      answer: string,
      difficulty?: "beginner" | "intermediate" | "advanced",
      tags?: string[]
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "question": "What do the `and` and `or` operators actually return?",
      "answer": "They short-circuit and return one of the operands, not necessarily a pure boolean. `a and b` returns a if a is falsy, else b. `a or b` returns a if a is truthy, else b. That is why `name or 'default'` works as a fallback.",
      "difficulty": "intermediate",
      "tags": ["boolean", "short-circuit"]
    }
  ]
}
```

Bad (answer is just "yes"):

```json
{ "items": [{ "question": "Is `is` the same as `==`?", "answer": "No." }] }
```

---

## 20. `scenario-questions.json` — Applied scenarios

```ts
{
  items: [
    {
      scenario: string,
      question: string,
      answer: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "scenario": "Your code sets temperature = config.get(\"temperature\") or 0.7, and a user explicitly passes temperature = 0.0 for deterministic output.",
      "question": "What goes wrong and how do you fix it?",
      "answer": "0.0 is falsy, so `or` discards it and the model runs at 0.7. Replace the short-circuit default with an explicit None check: value = config.get(\"temperature\"); temperature = value if value is not None else 0.7."
    }
  ]
}
```

Bad (scenario isn't a scenario):

```json
{ "items": [{ "scenario": "Decorators.", "question": "What are they?", "answer": "A callable." }] }
```

---

## 21. `case-studies.json` — Long-form cases

```ts
{
  items: [
    {
      title: string,
      context: string,
      problem: string,
      solution: string,
      outcome: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "title": "Adding a global retry policy to an LLM client",
      "context": "A team's chatbot occasionally failed because their LLM provider returned 502s during traffic spikes.",
      "problem": "Each API helper had its own ad-hoc try/except, with inconsistent backoff and no jitter, so retries hammered the provider.",
      "solution": "Wrapped every API helper with a single @retry(times=3, backoff='exponential-jitter') decorator, deleting the duplicated retry blocks.",
      "outcome": "Mean error rate fell from 1.2% to 0.05% with no change to provider load (jittered backoff prevented thundering-herd retries)."
    }
  ]
}
```

Bad (all five fields are one sentence each, no concreteness):

```json
{ "items": [{ "title": "Story", "context": "We had a bug.", "problem": "It was bad.", "solution": "We fixed it.", "outcome": "Better." }] }
```

---

## 22. `exam-prep.json` — Self-assessment (often MCQ)

```ts
{
  items: [
    {
      question: string,
      options?: string[],      // when present, answer must be one of these
      answer: string,
      explanation?: string
    }
  ]
}
```

Good:

```json
{
  "items": [
    {
      "question": "What is the result of 2 ** 3 ** 2?",
      "options": ["64", "512", "36", "128"],
      "answer": "512",
      "explanation": "** is right-associative, so it is 2 ** (3 ** 2) = 2 ** 9 = 512, not (2 ** 3) ** 2 = 64."
    }
  ]
}
```

Bad (`answer` not in `options`):

```json
{ "items": [{ "question": "Q?", "options": ["A", "B"], "answer": "C" }] }
```

---

## 23. `course-prep.json` — Mini-curriculum modules

```ts
{
  modules: [
    {
      title: string,
      duration?: string,
      lessons: string[]
    }
  ]
}
```

Good:

```json
{
  "modules": [
    {
      "title": "Decorators in depth",
      "duration": "90 min",
      "lessons": [
        "@deco is syntactic sugar for fn = deco(fn).",
        "Use *args/**kwargs in the wrapper so it works for any signature.",
        "Use functools.wraps to preserve __name__, __doc__, signature.",
        "Parametrized decorators add one extra layer.",
        "Know when lru_cache is safe (pure, hashable args)."
      ]
    }
  ]
}
```

Bad (one giant lesson; no structure):

```json
{ "modules": [{ "title": "Module", "lessons": ["Learn everything."] }] }
```

---

## 24. `mastery.json` — Concrete mastery criteria

```ts
{
  criteria: [
    {
      label: string,
      level?: "beginner" | "intermediate" | "advanced",
      example?: string
    }
  ]
}
```

Good:

```json
{
  "criteria": [
    {
      "label": "Explain why @deco is equivalent to fn = deco(fn) and when it runs.",
      "level": "beginner",
      "example": "```python\n@timing\ndef compute(): ...\n# is identical to:\ndef compute(): ...\ncompute = timing(compute)\n```\nThe decorator runs once at definition time; the wrapper runs on every call."
    }
  ]
}
```

Bad (criterion isn't measurable):

```json
{ "criteria": [{ "label": "Understand decorators." }] }
```

---

## Summary table — canonical section keys

| # | Section key | File |
|---|---|---|
| 1 | `explanation` | `explanation.json` |
| 2 | `examples` | `examples.json` |
| 3 | `code` | `code.json` |
| 4 | `diagrams` | `diagrams.json` |
| 5 | `charts` | `charts.json` |
| 6 | `images` | `images.json` |
| 7 | `synonyms` | `synonyms.json` |
| 8 | `connections` | `connections.json` |
| 9 | `applications` | `applications.json` |
| 10 | `tradeoffs` | `tradeoffs.json` |
| 11 | `mistakes` | `mistakes.json` |
| 12 | `misconceptions` | `misconceptions.json` |
| 13 | `best-practices` | `best-practices.json` |
| 14 | `origins` | `origins.json` |
| 15 | `question-patterns` | `question-patterns.json` |
| 16 | `materials` | `materials.json` |
| 17 | `references` | `references.json` |
| 18 | `projects` | `projects.json` |
| 19 | `interview-questions` | `interview-questions.json` |
| 20 | `scenario-questions` | `scenario-questions.json` |
| 21 | `case-studies` | `case-studies.json` |
| 22 | `exam-prep` | `exam-prep.json` |
| 23 | `course-prep` | `course-prep.json` |
| 24 | `mastery` | `mastery.json` |

Any other filename is invalid and will be rejected by the apply script.
