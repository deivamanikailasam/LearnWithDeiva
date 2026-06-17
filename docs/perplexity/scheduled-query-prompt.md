# Scheduled-query prompt

Paste **everything between the `--- PROMPT START ---` and `--- PROMPT END ---`
markers** into the Perplexity scheduled-search prompt field for the
`LearnWithDeiva — <Subject>` Space. Do not include the markers themselves.

The prompt is intentionally self-contained: it tells Perplexity to read the
Space files, pick the next queue item, generate content, and return one
manifest. It does NOT need any extra context outside the Space.

> **Tip:** to nudge the queue, edit the schedule's next-run time. Each scheduled
> run = one sub-subtopic.

---

--- PROMPT START ---

You are generating one sub-subtopic of LearnWithDeiva learning content. Use only the files attached to this Space. Follow them strictly.

Mandatory reading order:

1. RULES.md — non-negotiables, section selection, completeness, examples rules.
2. SECTION-SCHEMAS.md — JSON shape of every section file. Use only the 24 keys listed there.
3. OUTPUT-CONTRACT.md — the exact manifest schema you must produce.
4. IMAGE-POLICY.md — only emit images.json when Mermaid/charts cannot do the job; always include matching imageTasks.
5. ROADMAP-<subject>.md — the canonical Stage → Topic → Subtopic → Sub-subtopic tree for this subject.
6. GLOBAL-GLOSSARY.json — the existing glossary. Reuse definitions verbatim; never duplicate; flag conflicts in notes.
7. EXAMPLES.md — gold-standard reference outputs. Match their depth and tone.
8. QUEUE.md — the work queue.

Task (do exactly this, in order):

A. Open QUEUE.md and find the FIRST entry whose status is "pending".
B. Confirm that entry's `subsubtopicId` exists in ROADMAP-<subject>.md under the listed stage/topic/subtopic. If it does not, output a manifest with files: [], queueCompletedIds: [], and notes describing the mismatch. Stop.
C. Generate full learning content for that ONE sub-subtopic. Include only the sections (from the 24 keys) that genuinely help teach this specific concept (see RULES.md §4). Most sub-subtopics use 6–14 sections; do not pad.
D. Cross-check every term you introduce in synonyms.json against GLOBAL-GLOSSARY.json. Reuse existing definitions verbatim. Add a term to glossaryAdditions ONLY if it is genuinely new.
E. For diagrams.json, follow RULES.md §8 (no spaces in node IDs, no `end` keyword, no style/classDef, quoted labels for special chars).
F. For charts.json, follow RULES.md §9 (xKey and every series.key must be present in every data row; numeric values are numbers, not strings).
G. For question-patterns.json: choose 2–4 patterns from EXACTLY these 7 valid keys (verbatim): `5w1h`, `socratic`, `mindmap`, `comparative`, `what-if`, `cause-effect`, `what-breaks-this`. No other keys are valid. Every chosen pattern must be complete per RULES.md §6.2 (5w1h has all six; comparative has ≥2 named alternatives; what-if/what-breaks-this include consequence; cause-effect includes both halves; socratic is a chain of ≥3 progressively deeper questions; mindmap covers central + ≥2 branches). AND every answer must satisfy RULES.md §6.3 (strict answers): definitive (no "it depends" without a decision tree), self-contained (readable without re-reading the question), tied to THIS specific sub-subtopic (not generic), technically complete. A vague/hedged answer fails the contract even if the pattern is structurally complete. If you cannot satisfy both, omit that pattern.
H. Only emit images.json if Mermaid AND charts cannot convey the visual idea, per IMAGE-POLICY.md. For every images.json item, add a matching imageTasks entry (matching src + alt) with a clear prompt and optional suggestedSources.
I. Output your answer as EXACTLY one fenced ```json code block containing one Manifest object matching OUTPUT-CONTRACT.md. Output nothing else: no preamble, no commentary, no headings, no sources list, no closing remarks.

Hard contract reminders:

- schemaVersion must be the literal number 1.
- scope.subsubtopicId must equal the queue entry you processed.
- Each files[i].path must be "src/content/subjects/<scope.subject>/topics/<scope.subsubtopicId>/sections/<sectionKey>.json".
- Each files[i].content must validate against the section schema in SECTION-SCHEMAS.md. No extra fields.
- queueCompletedIds must be exactly [scope.subsubtopicId] when the manifest contains content; otherwise [].
- JSON must be strictly valid: double-quoted keys, no trailing commas, no comments, no smart quotes, no unescaped raw newlines inside string values (use \n).
- **ASCII math only.** The app does NOT render LaTeX. Never use \(...\), \[...\], $...$, \mathbb, \frac, \sum, \sqrt, or any backslash math macro. Use R^n, c1·v1 + c2·v2, <u, v>, ||v||, M^T, sqrt(x), x_i, etc. (see RULES.md §11 for the full table.)
- **Synonyms are MANDATORY when the topic introduces ≥3 new terms.** If you introduce new terminology, every new term must appear in either synonyms.json (topic-scoped) AND/OR glossaryAdditions (global) — typically both. Emitting both as empty on a term-dense topic is a hard contract violation.
- **References are MANDATORY for foundational topics** (math, classical ML, theory, anything where authoritative external sources clearly exist).
- **Applications are MANDATORY for foundational/theory stages** (math-classical-ml, deep-learning, classical-generative-models, deep-generative-models, nlp-transformers, genai-fundamentals). Otherwise required when the concept has any real-world use. (See RULES.md §4 row 7.)
- **Misconceptions are REQUIRED when at least one common myth exists** (almost always). (See RULES.md §4 row 11.)
- **At least one of interview-questions OR scenario-questions is REQUIRED** for any topic that appears in technical interviews. (See RULES.md §4 rows 16–17.)
- **Omission-with-justification:** for any MANDATORY/REQUIRED section you omit, set manifest.notes to a single short sentence per omitted section explaining why. Silent omission is a contract violation.
- **Quality floors (RULES.md §13):** exam-prep ≥4 items; mastery ≥4 criteria with ≥1 advanced on foundational topics AND **every criterion MUST have a concrete `example` per §5.2** (a tiny problem/snippet/scenario the learner can produce — not a restatement of the label); diagrams ≥2 when included; mistakes/misconceptions/best-practices ≥2 items each when included; question-patterns ≥2 patterns when included; tradeoffs requires BOTH advantages ≥2 AND disadvantages ≥2 when included.
- **Section count by stage (RULES.md §14):** foundational stages aim for 10–14 sections; applied/tooling 8–12; process/governance 6–10.
- **Connections topicIds must exist (RULES.md §15).** Every `connections.items[].topicId` MUST be copied verbatim from `ROADMAP-<subject>.md`. If a related topic is not yet in the roadmap, **omit the `topicId` field entirely** (keep `title`/`relation`/`description`). Inventing or guessing topicIds fails the apply pipeline and produces dead deep-links.
- **Tradeoffs is MANDATORY (RULES.md §4 row 9, §13).** Emit `tradeoffs.json` for almost every concept — nearly all techniques, designs, algorithms, and notations have meaningful pros AND cons. Omit ONLY when the concept genuinely has no design choices to weigh (e.g. a definitional notation or a pure mathematical identity); if so, justify in `manifest.notes`. When included, BOTH `advantages` and `disadvantages` arrays MUST have ≥2 items each — a one-sided tradeoff is a contract violation.
- **Origins is broader than dates (RULES.md §4 row 13).** `origins.json` should cover any of: the originating problem the concept was invented to solve, the predecessor technique it replaced or extended, or historical milestones. Skip the section only if all three are genuinely absent — not just because you don't know specific dates.

Quality bar:

- Accuracy > breadth. If unsure, omit.
- No filler. No restating the rule as the example. No padding to look complete.
- Code snippets must run as-is.
- Glossary terms must be reused verbatim from GLOBAL-GLOSSARY.json when they already exist.

Begin.

--- PROMPT END ---
