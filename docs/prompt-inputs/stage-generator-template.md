# Stage Learning Content Generator Input

## Variables

SUBJECT: Gen AI
ROADMAP_STAGE_NAME: Stage 3
ROADMAP_PURPOSE: Learning roadmap
GENERATION_MODE: Part-by-part
APPROVAL_MODE: Mandatory before each part

> **Platform schema (authoritative):** `docs/perplexity/space-files/RULES.md` and
> `SECTION-SCHEMAS.md` define 24 section keys and mandatory rules for this stage.
> Canonical roadmap: `space/gen-ai/ROADMAP-gen-ai.md` and `space/gen-ai/QUEUE.md`.

## Editable roadmap input

Paste or maintain the exact roadmap content for the current generation here.

## Stage: Deep Learning Foundations
- **stageId:** `deep-learning`
- Neural networks, frameworks and core architectures.

_See `space/gen-ai/ROADMAP-gen-ai.md` for the full Stage 3 taxonomy
(102 sub-subtopics across Neural Network Basics, Deep Learning Frameworks,
and Core Architectures)._

## Output goal

Generate learning content for all sub-subtopics in the specified roadmap stage.

## Non-negotiable requirements

- Content must be 100% accurate and genuine.
- No false or incorrect information.
- No duplicates.
- Ask me if a decision is needed.
- Do part by part.
- Before each part ask my approval to proceed.

## Learning content pattern

For each sub-subtopic, include only the sections that are genuinely relevant and useful.
Do not force a fixed universal order.
Arrange the selected sections in the most effective teaching order for that specific sub-subtopic, based on the nature of the concept, prerequisite flow, learner clarity, and pedagogical fit.

1. Core definition
2. Layman’s explanation
3. Real-time examples
4. Code examples
5. Diagrams
6. Charts
7. Images
8. Conceptual connections
9. Question patterns with strict answers:
   - 5W1H
   - Socratic
   - Mindmap
   - Comparative
   - What-if
   - Cause-effect
   - What breaks this
10. Advantages & disadvantages
11. Common mistakes
12. Common misconceptions
13. Pitfalls and best practices
14. Origin / what came before
15. Self-assessment test
16. Mastery criteria

Section selection rule:
- It is NOT required to use all sections for every sub-subtopic.
- For each sub-subtopic, include only the sections that are actually needed and helpful.
- Do NOT add a section just because it exists in the pattern list.
- Minimize filler; prioritize relevance and depth for that specific topic.

Examples-in-sections rule:
- For Common mistakes, Common misconceptions, Pitfalls, Best practices, and Mastery criteria include a short concrete example whenever it materially aids understanding.
- The example should be realistic (a tiny code snippet, command, config line, or scenario), not a generic restatement of the rule.
- Skip the example only when adding one would be filler or would not improve clarity.

Question patterns completeness rule:
- If a question pattern is chosen for a sub-subtopic, it MUST be covered completely; do not include a partial pattern.
- Specifically:
  - `5w1h` MUST include all 6 questions: Who, What, When, Where, Why, How.
  - `cause-effect` MUST include both a cause and its effect for each item.
  - `comparative` MUST compare at least two named alternatives (not a one-sided write-up).
  - `what-if` and `what-breaks-this` MUST include the scenario/perturbation AND its consequence.
  - `socratic` MUST be a coherent chain of progressively deeper questions (not a single question).
  - `mindmap` MUST cover the central concept plus its main branches (not just one branch).
- If you cannot cover a pattern completely for that sub-subtopic, do NOT choose that pattern; pick a different one or omit the section.

Image sourcing autonomy:
- When a section benefits from images, you may either generate images or use appropriate online images, whichever is the better choice for that topic.
- You do not need my approval to decide between generated images and online images.
- Make the decision autonomously based on educational value, relevance, visual quality, and topic fit.
- Prefer the option that improves understanding the most.
- Do not use images as decoration only.

## Section files and JSON shapes

Each applicable section is one JSON file at
`src/content/subjects/<subject>/topics/<topic-id>/explanation.json`.
The build (`scripts/gen-content.mjs`) and `SectionView` render this file only:

| Template item | File | JSON shape (top-level) |
| --- | --- | --- |
| 1 Core definition + 2 Layman + body | `explanation.json` | `DocumentData` in `src/types/rich-document.ts`: `{ id, title, blocks }`. Prose: `title`, `heading` (1–4), `paragraph`, `list`, `code_block`, `divider`. Embeds (each with `item`): `interview_qa`, `scenario`, `case_study`, `project`, `quiz`, `resource`, `pitfall`, `cheatsheet`, `glossary_term`, `mermaid`. See `scripts/__fixtures__/rich-document-example.json`. |

Notes:
- Omit any file a sub-subtopic does not need; missing files are simply skipped.
- `mermaid` strings use standard Mermaid syntax; charts are authored as data, not images.
- `topicId` in connections deep-links to another topic in the same subject.

## Glossary requirements

- Technical jargon should support glossary linking.
- Clicking a glossary term should open a small popup with the meaning in the context of that topic.
- No duplicate glossary entries.
- Also maintain a global glossary with no duplicates.
- Reuse glossary definitions whenever the meaning is the same.

## UX requirements

- Best design for readability and enjoyable learning.
- Clear, fun, and easy to scan.
- Avoid clutter and avoid duplicate content.

## Required first action by the agent

1. Read this file.
2. Identify ambiguities or missing inputs.
3. Propose the implementation plan in parts.
4. Ask for approval before any implementation or content generation.