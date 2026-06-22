# LearnWithDeiva — Claude Code project memory

This is a data-driven tutorial site. Each leaf of the
Subject -> Topic -> Subtopic -> Sub-subtopic tree is a folder, and its learning
content is one authored document file inside that folder.

When asked to "generate content", you fill in the content for **one
sub-subtopic at a time**. Only sub-subtopics carry a content document — the
subject, topic, and subtopic levels do not.

## Where content lives

```
src/content/subjects/<subject>/
  subject.json                       subject metadata
  roadmap.json                       Stage -> node(topic) tree
  topics/<topicId>/topic.json        every topic, subtopic, sub-subtopic (flat, linked by parentId)
  topics/<subsubtopicId>/document.json   <-- the content you generate
```

A `topic.json` is a **sub-subtopic** when its `parentId` points at a subtopic
that itself has a `parentId` (two levels below a roadmap stage node). Only these
get a content document.

## The ONE format the site renders (important)

The build step `scripts/gen-content.mjs` (`loadTopic`) and the app
(`src/content/data.ts`) read a topic's body from, in order:

1. `topics/<id>/document.json` — TipTap, shape `{ "format": "tiptap/v1", "doc": { "type": "doc", "content": [ ... ] } }`. **This is what all 745 existing topics use — author new content in this format.**
2. `topics/<id>/explanation.json` — legacy "blocks" `DocumentData` (only used if no `document.json`).

Do NOT author content under a `topics/<id>/sections/` subfolder. That 24-section
"manifest" model (`scripts/apply-content.mjs`, `docs/perplexity/`) was a pilot
that the renderer does NOT read — content placed there will not appear on the
site. Ignore it unless explicitly told otherwise.

The on-disk `document.json` is regenerated into `public/data/subjects/<subject>/sections/<topicId>.json`
by `npm run gen:content`; that file is what the browser fetches.

## How to generate (workflow)

1. Find the next sub-subtopic with no content document:
   `npm run content:pending -- --subject <id>`. It prints the `scope`
   (subject, stageId, topicId, subtopicId, subsubtopicId).
2. Read 2–3 already-populated sibling sub-subtopics' `document.json` under the
   same subject as the structural + quality + format reference (find them via
   other `topics/<id>/document.json` files that already exist).
3. Author `src/content/subjects/<subject>/topics/<subsubtopicId>/document.json`.
   Default to the content brief in `docs/claude-code/CONTENT-FORMAT.md` (depth,
   section structure, style, constraints, and the TipTap node mapping), matching
   the `tiptap/v1` shape, depth, and tone of the sibling documents you just
   read. If I give explicit per-run content-format instructions, those override
   the default spec.
4. Rebuild app data: `npm run gen:content`.
5. Verify it renders: confirm
   `public/data/subjects/<subject>/sections/<subsubtopicId>.json` now exists and
   is non-empty (a malformed `document.json` is silently skipped, so this check
   matters).
6. Report what you wrote and **STOP**.

## Hard rule: never commit

Do NOT run `git commit`, `git add`, `git push`, or any state-changing git
command unless I explicitly ask in that same message. After step 4–5 the work is
"generated and validated" — I review and commit it myself.

## Quality bar (this repo's authoring rules)

- Accuracy over breadth. If unsure of a fact, omit it rather than guess. Never
  invent code behavior, history, or APIs.
- No filler to satisfy a template. Include only what genuinely helps the
  sub-subtopic.
- Code must run as-is.
- Match the depth, tone, and structural discipline of the populated sibling
  sub-subtopics you read as examples.
- Teach for understanding (first-principles where it helps), not shallow
  summarization.

## Useful commands

- `npm run content:pending -- --subject <id> [--all] [--count] [--stage <stageId>]` — next (or all) empty sub-subtopic(s).
- `npm run gen:content` — rebuild `public/data/**` so new content renders.
- `npm run lint` / `npm run build` — keep these green.
- `npm run dev` — view locally at http://localhost:5173.
