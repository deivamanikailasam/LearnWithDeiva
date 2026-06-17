# RULES — non-negotiables for every generation

You are generating one **sub-subtopic** of learning content for the LearnWithDeiva
platform. You do **not** have access to the repo; everything you need is in this
Space. Read these rules before doing anything else.

> If a rule and a per-section schema disagree, follow the schema in
> `SECTION-SCHEMAS.md`. The schema is authoritative.

---

## 1. Core behaviour

- Accuracy beats speed. If you are not certain a fact is correct, omit it.
- Never invent facts, code behaviour, history, or topic structure.
- Never restate something already covered by another section of the same
  sub-subtopic.
- Teach for **understanding**, not shallow summarisation. Prefer first-principles
  explanations when suitable.
- Use plain-language explanations only when they preserve correctness.

## 2. Scope per query

- One Perplexity query produces content for **exactly one sub-subtopic** (the
  first sub-subtopic with `status: pending` in `QUEUE.md`).
- Do not write content for sibling, parent, or other sub-subtopics.
- Do not modify other repo files. Only fill the manifest described in
  `OUTPUT-CONTRACT.md`.

## 3. Output contract (strict)

- The response body MUST be exactly one fenced ```json code block matching the
  manifest schema in `OUTPUT-CONTRACT.md`, and **nothing else** — no preamble,
  no commentary, no closing remarks.
- The manifest MUST be valid JSON parseable by `JSON.parse`. No trailing commas,
  no comments, no smart quotes.
- `schemaVersion` is always `1`.
- `scope.subsubtopicId` MUST exactly match the queue entry being processed.
- Each `files[i].path` MUST be of the form
  `src/content/subjects/<subject>/topics/<subsubtopicId>/sections/<sectionKey>.json`
  where `<sectionKey>` is one of the 24 keys listed in `SECTION-SCHEMAS.md`.

## 4. Section selection rule

There are 24 possible sections. For each sub-subtopic, **include only the
sections that are genuinely relevant and useful**:

- It is **NOT** required to use all sections.
- Do **NOT** add a section just because it exists. Padding is worse than
  omitting.
- Arrange the selected sections in the most effective teaching order. There is
  no fixed universal order — pick what serves the concept best.
- Most sub-subtopics will use somewhere between **6 and 14** sections. Far more
  than that almost always means filler.

Use this template for the typical teaching arc, but skip anything that does not
serve this specific concept:

> **Naming note:** the "Section key" column is the canonical JSON key (what
> Perplexity emits in `files[i].path` and what the validator checks). The
> "Template label" column is the natural-language name the original
> `stage-generator-template.md` uses for the same concept. Use either when
> searching the rules.

| # | Section key | Template label | When to include |
|---|---|---|---|
| 1 | `explanation` | Core definition + Layman's explanation | Almost always |
| 2 | `examples` | Real-time examples | When a real-world scenario clarifies the concept |
| 3 | `code` | Code examples | When the concept manifests in code |
| 4 | `diagrams` (Mermaid) | Diagrams | When a flow / structure is non-trivial to describe in words |
| 5 | `charts` (data) | Charts | When a quantitative comparison or trend aids understanding |
| 6 | `synonyms` | (platform extra — glossary feed) | **MANDATORY** when the topic introduces ≥3 new terms (the global glossary depends on it). Otherwise: when any new terminology appears. |
| 7 | `applications` | (platform extra — real-world uses) | **MANDATORY** for foundational / theory stages (`math-classical-ml`, `deep-learning`, `classical-generative-models`, `deep-generative-models`, `nlp-transformers`, `genai-fundamentals`). Otherwise required when the concept has any real-world use. Omit only if you justify why in `notes`. |
| 8 | `connections` | Conceptual connections | When it builds on, contrasts with, or relates to other topics |
| 9 | `tradeoffs` | **Advantages & disadvantages** | **MANDATORY** for almost every concept — nearly all techniques, designs, algorithms, or notations have meaningful pros AND cons worth surfacing. Omit ONLY when the concept genuinely has no tradeoffs to weigh (e.g. a definitional notation, an immutable mathematical identity, a stage of pure terminology); when you omit, justify in `notes` (e.g. "Omitted `tradeoffs`: matrix transpose is a definitional operation with no design alternatives to weigh."). **When included, BOTH `advantages` and `disadvantages` arrays MUST be non-empty (≥2 items each)** — a one-sided tradeoff is a contract violation; ship both sides or omit-with-justification. |
| 10 | `mistakes` | Common mistakes | When learners commonly get it wrong |
| 11 | `misconceptions` | Common misconceptions | **REQUIRED** when at least one common myth exists. Almost always applies. Omit only if you justify why in `notes`. |
| 12 | `best-practices` | Pitfalls and best practices | When there are clear avoid / prefer rules |
| 13 | `origins` | Origin / what came before | When **any** of these illuminate the concept: (a) the originating problem it was invented to solve, (b) the predecessor technique it replaced or extended, (c) the historical context / key milestones. Not optional just because you don't know the date — focus on (a) and (b) when (c) is thin. |
| 14 | `question-patterns` | **Question patterns with strict answers** | When deeper inquiry would help. **Pick from exactly these 7 patterns** (use the canonical `pattern` keys verbatim — no others are valid): `5w1h`, `socratic`, `mindmap`, `comparative`, `what-if`, `cause-effect`, `what-breaks-this`. See §6 for the per-pattern completeness and strict-answer rules. |
| 15 | `references` | (platform extra — sources) | **MANDATORY** for foundational topics (math, classical ML, theory, anything where authoritative external sources clearly exist). Otherwise: when sources add value. |
| 16 | `interview-questions` | (platform extra — interview prep) | **AT LEAST ONE** of `interview-questions` or `scenario-questions` is **REQUIRED** for any topic that appears in technical interviews. Omit both only if you justify why in `notes`. |
| 17 | `scenario-questions` | (platform extra — scenario prep) | **AT LEAST ONE** of `interview-questions` or `scenario-questions` is **REQUIRED** (see row 16). Use both when each carries distinct value. |
| 18 | `exam-prep` | **Self-assessment test** | Almost always — short MCQs/answers to self-test |
| 19 | `mastery` | Mastery criteria | Almost always — concrete criteria for "I know this" |
| 20 | `images` | Images | Only when no Mermaid/chart can convey it (see `IMAGE-POLICY.md`) |
| 21 | `materials`, `projects`, `case-studies`, `course-prep` | (platform extras) | Rare; use only when truly useful |

> **Omission-with-justification rule:** for any row marked **MANDATORY** / **REQUIRED**
> above, you may omit the section ONLY if it is genuinely not applicable to the
> specific concept being taught. When you do, set `manifest.notes` to a single
> short sentence per omitted mandatory section explaining why (e.g. "Omitted
> `misconceptions`: this is a purely notational topic with no widespread myth.").
> Omitting without justification is treated as a contract violation.

## 5. Examples-in-sections rule

### 5.1 `mistakes`, `misconceptions`, `best-practices` — example strongly preferred

Include a short concrete `example` whenever it materially aids understanding.
The example should be a tiny realistic snippet (code, command, config,
scenario) — not a generic restatement of the rule. Skip the example **only**
when it would be filler.

### 5.2 `mastery` — example is REQUIRED on every criterion

Mastery is about provable capability, not aspiration. **Every**
`mastery.criteria[i]` MUST set `example` to a tiny, observable artefact the
learner could produce to demonstrate the criterion. Allowed forms:

- a small problem the learner can solve end-to-end (state inputs + expected
  output), e.g. `"Compute A·B for A=[[1,2],[3,4]], B=[[5,6],[7,8]]; expect [[19,22],[43,50]]."`;
- a fenced code/command snippet (Markdown) showing the learner's correct move;
- a one-sentence scenario in which the learner makes the right call and why.

Forbidden: restating the `label`, vague phrases like "can explain this", or
"various examples". A missing or filler `example` fails the apply pipeline.

## 6. Question-patterns rule (menu, completeness, strict answers)

### 6.1 The menu — exactly 7 valid patterns

When you emit `question-patterns.json`, every `groups[i].pattern` value MUST be
one of these 7 strings, **verbatim** (case-sensitive, hyphen-sensitive):

| Pattern key | Purpose | Schema notes |
|---|---|---|
| `5w1h` | Force-coverage of the concept from all six angles. | `items` MUST have **exactly 6 entries**, one per Who / What / When / Where / Why / How (in any order). Each question MUST start with the named angle. |
| `socratic` | Lead the learner deeper through a chain of questions. | `items` MUST be a **chain of ≥3 progressively deeper questions** — each one builds on the previous answer. A single question is not a Socratic pattern. |
| `mindmap` | Surface the concept's main branches in question form. | `items` MUST cover the central concept **plus at least 2 main branches**, one question per branch (≥3 items total). |
| `comparative` | Sharpen the concept by contrast. | Questions MUST compare **at least two named alternatives** (e.g. "X vs Y", not "Is X good?"). Answers MUST address both sides. |
| `what-if` | Test understanding via counterfactuals. | Every item MUST state **both the perturbation/scenario AND its concrete consequence** in the answer. |
| `cause-effect` | Connect mechanism to outcome. | Every item's answer MUST contain **both a cause AND its effect** (not just one half). |
| `what-breaks-this` | Probe failure modes. | Same shape as `what-if`: every item MUST state the **failing scenario AND what specifically breaks** (error, wrong output, silent corruption, etc.). |

Pick the patterns that **fit this sub-subtopic**. Do NOT include all 7
mechanically; 2–4 well-chosen patterns is typical. Inventing new pattern keys
(e.g. `qa`, `quiz`, `socratic-chain`) is a contract violation — the apply
pipeline rejects unknown keys.

### 6.2 Completeness — never ship a half-filled pattern

If you cannot cover a pattern completely per the table above for this specific
sub-subtopic, **do not include that pattern**. Pick a different one from the
menu or omit the section entirely. A partial pattern is worse than no pattern.

### 6.3 Strict answers — every answer must be definitive

The template explicitly demands "**question patterns with strict answers**".
That means every `items[].answer` MUST be:

- **Definitive**, not hedged. No "it depends" / "varies" / "could be many things"
  without immediately following with a concrete decision tree or enumeration.
- **Self-contained**. The answer alone (without re-reading the question) must
  convey the technical point. Treat the question as a prompt, the answer as
  the teaching.
- **Tied to this specific sub-subtopic**, not a generic platitude. A `5w1h`
  "What?" answer for `linear-algebra--vectors-and-spaces` must teach *vectors
  and vector spaces*, not "what mathematics is".
- **Technically correct and complete enough to stand alone**. If a one-line
  answer would lie by omission, write 2–4 lines. Strict answer ≠ short answer.
- **Free of "see X above"** cross-references. Each Q&A pair is a unit.

A correct answer that's vague or evasive is a strict-answer violation, even
if the question is well-formed.

## 7. Glossary rule (no duplicates, ever)

- Before introducing a term that has its own definition, check `GLOBAL-GLOSSARY.json`
  in this Space.
- If the term already exists with the same meaning, **reuse the existing
  definition verbatim** in any `synonyms.json` you emit; do **NOT** add it to
  `glossaryAdditions`.
- Only add a term to `glossaryAdditions` if it is genuinely new in this subject.
- If the existing definition is wrong or incomplete, set `notes` in the manifest
  describing the conflict; do not silently overwrite.
- **Contract violation:** emitting an empty `synonyms.json` **and** an empty
  `glossaryAdditions` on a sub-subtopic that introduces multiple new terms is
  treated as a hard violation by the apply pipeline. If you used a term in
  prose that is not already in `GLOBAL-GLOSSARY.json`, it MUST appear in
  either `synonyms.json` (topic-scoped definition) **or** `glossaryAdditions`
  (new entry for the global glossary) — typically both: the term goes in
  `synonyms.json` for in-context lookup AND in `glossaryAdditions` so future
  sub-subtopics see it.

## 8. Mermaid rules (when emitting `diagrams.json`)

- Standard Mermaid syntax only (no extensions). Render targets: `flowchart`,
  `sequenceDiagram`, `classDiagram`, `stateDiagram-v2`, `erDiagram`,
  `gantt`, `pie`, `journey`, `mindmap`, `timeline`.
- Node IDs must be camelCase / PascalCase / snake_case — **no spaces**.
- Wrap node labels in double quotes when they contain parentheses, brackets,
  colons, or commas: `A["Process (main)"]`.
- Quote edge labels that contain parens or special chars: `A -->|"O(1) lookup"| B`.
- Avoid reserved keywords as node IDs (`end`, `subgraph`, `graph`, `flowchart`).
- Do not use explicit `style` / `classDef` / `:::classname` styling — the host
  app theme handles colours; explicit colours break in dark mode.
- Do not use HTML entities or angle brackets in labels — they render literally.
- Do not include `click` events — the host app disables them for security.

## 9. Charts rule (when emitting `charts.json`)

- `kind` is one of `bar`, `line`, `pie`, `area`.
- `xKey` MUST be a key present in every row of `data`.
- Every entry in `series[].key` MUST be a key present in every row of `data`.
- Numeric values are plain numbers (not strings, not formatted).
- Always include a `caption` clarifying what the chart shows and whether the
  numbers are real or illustrative.

## 10. Code rule (when emitting `code.json`)

- Snippets must run as-is in the stated `language` (no pseudo-code).
- Use realistic, named identifiers tied to the topic — avoid `foo`/`bar`.
- Comments should explain non-obvious intent only; do not narrate the code.
- Prefer multiple short snippets over one long snippet when each illustrates a
  distinct point.

## 11. Markdown / formatting rules

- Use simple Markdown: headings (`##`, `###`), bullet/numbered lists, fenced
  code blocks with a language tag, tables, and inline backticks for code.
- Do NOT use emoji unless the value is genuinely educational (e.g. a legend).
- Do NOT include images via Markdown syntax inside any section's text; images
  go in `images.json` only.
- **Math notation MUST be ASCII.** The app's Markdown pipeline is
  `react-markdown` + `remark-gfm` + `rehype-raw` only — it does **NOT** render
  LaTeX or KaTeX. Do **NOT** use any of: `\(...\)`, `\[...\]`, `$...$`,
  `$$...$$`, `\mathbb{...}`, `\mathcal{...}`, `\frac{...}{...}`, `\sum`,
  `\prod`, `\int`, `\sqrt{...}`, `\hat`, `\bar`, `\vec`, `\cdot`, `\times`,
  `\leq`, `\geq`, or any other backslash math macro. Anything you write that
  way will render as literal text in the UI, not as math. Use these ASCII
  conventions instead:
  | Math | Write as |
  |---|---|
  | ℝ, ℝⁿ, ℝ² | `R`, `R^n`, `R^2` |
  | a vector | `v`, `u`, `x` (plain letters, optionally in backticks) |
  | scalar multiplication | `c·v` or `c*v` (use `*` inside code blocks) |
  | linear combination | `c1·v1 + c2·v2 + ... + ck·vk` |
  | dot / inner product | `<u, v>` or `u·v` |
  | norm | `\|\|v\|\|` (escaped pipes for Markdown tables) |
  | transpose | `M^T` |
  | inverse | `M^-1` |
  | summation | `sum(i=1..n) x_i` |
  | square root | `sqrt(x)` |
  | subscript | `x_i` or `x[i]` |
  | superscript / power | `x^2`, `2^n`, `e^x` |
  | infinity | `inf` |
  | not-equal / leq / geq | `!=`, `<=`, `>=` |
  | element-of | `in`, e.g. `v in R^n` |
  | for-all / exists | `for all`, `there exists` |
  | union / intersection | `union`, `intersect` |

  When a math expression is more readable inside a fenced block, use one:

      ```
      basis change: x' = P^-1 · x
      ```

  This matches the existing repo convention (e.g. operators-and-expressions
  writes `2 ** 3 ** 2 = 512`, not `\(2^{3^2}=512\)`).

## 12. UX requirements

- Optimise for readability and enjoyable learning: short paragraphs, clear
  headings, scannable tables.
- Avoid clutter, duplication, and walls of text.
- Use the **layman** explanation in `explanation.json` only when it adds clarity
  beyond the formal definition.

## 13. Quality floors (minimum item counts)

A section that exists but is too sparse is almost as bad as a missing one.
Apply these floors whenever you emit the listed section:

- **`exam-prep`** — aim for **4–6 items**; minimum **4**. Three is acceptable
  only when the concept is genuinely small (justify in `notes`).
- **`mastery`** — minimum **4 criteria** covering at least two of
  beginner / intermediate / advanced. **Foundational / theory stages MUST
  include at least one `advanced` criterion** — without a stretch target the
  learner has no way to know if they've gone deep enough. **Every criterion
  MUST also include a non-empty `example` per §5.2** (the demonstrable
  artefact); a criterion without an example is treated as missing.
- **`diagrams`** — when included, ship **≥2 distinct diagrams** (e.g. one for
  structure, one for flow; or one mindmap of concepts, one comparison).
  A single diagram is rarely worth more than a paragraph and often signals
  filler.
- **`question-patterns`** — when included, ship **≥2 patterns** drawn from
  the menu in §6.1. A single pattern usually doesn't justify the section
  overhead. Every chosen pattern must satisfy both §6.2 (completeness) and
  §6.3 (strict answers); a thin or hedged answer fails the quality floor even
  if the pattern is structurally complete.
- **`tradeoffs`** — when included, BOTH `advantages` and `disadvantages` MUST
  be **≥2 items each**. A one-sided tradeoff is a contract violation; either
  ship both sides honestly or omit the section.
- **`mistakes`**, **`misconceptions`**, **`best-practices`** — **≥2 items**
  each when included. One-item sections look thin.

## 14. Section count by stage type

The platform-wide **6–14 sections** range still holds, but where in that range
to land depends on the kind of topic:

- **Foundational / theory stages** (`computing-foundations`,
  `math-classical-ml`, `deep-learning`, `classical-generative-models`,
  `deep-generative-models`, `nlp-transformers`, `genai-fundamentals`):
  aim for **10–14 sections**. Most of the optional sections (`origins`,
  `misconceptions`, `question-patterns`, `connections`, ...) genuinely add
  value here because the concepts are general and reused everywhere.
- **Applied / tooling / framework stages** (`prompt-engineering-stage`,
  `building-text-apps`, `embeddings-rag`, `frameworks-orchestration`,
  `customization`, `llmops`, `full-stack`, ...): **8–12 sections**.
  Concrete `code`, `examples`, `mistakes`, `best-practices` carry more
  weight; `origins` / `question-patterns` carry less.
- **Process / governance / lifecycle stages** (`evaluation-safety`,
  `enterprise-delivery`, `production-lifecycle`, `agents`): **6–10 sections**.
  Lean toward `explanation`, `tradeoffs`, `mistakes`, `best-practices`,
  `case-studies`, `interview-questions`, `mastery`.

Far below these floors usually means filler-by-omission; far above usually
means filler-by-inclusion.

## 15. Connections cross-references (`connections.json` `topicId` must resolve)

If you emit `connections.json`, every item's `topicId` (when present) **MUST**
match an existing sub-subtopic in `ROADMAP-<subject>.md` — i.e., one of the
ids that appears under `Stages` in that file. Aspirational, future, or invented
ids fail the apply pipeline and produce dead deep-links in the UI.

Rules:

- The `topicId` field is **optional** in the schema. If a related topic does
  **not** exist in `ROADMAP-<subject>.md`, **omit the `topicId` field
  entirely** but keep the item's `title`, `relation`, and `description` so the
  reader still gets the context.
- A `topicId` MUST NOT equal the current `scope.subsubtopicId` — no
  self-references.
- A `topicId` MUST be from the same subject as `scope.subject`. Cross-subject
  links are not supported by the platform.
- Before adding any `topicId`, search `ROADMAP-<subject>.md` in this Space and
  copy the id **verbatim** (the ids are the leaf strings in the roadmap tree,
  e.g. `linear-algebra--norms-and-distances`).

The apply pipeline cross-checks every emitted `connections.json` `topicId`
against `src/content/subjects/<subject>/topics/<id>/topic.json` and fails fast
on any unknown id, so manifests with invented ids will be rejected before any
files are written.

## 16. When something is missing

If `QUEUE.md` is empty, ambiguous, or the requested sub-subtopic isn't found in
`ROADMAP-<subject>.md`, output a manifest with `files: []`, `queueCompletedIds: []`,
and put a clear message in `notes` describing what needs fixing. Do **not** guess.
