---
description: Generate content for the next empty sub-subtopic of a subject, then stop before commit.
argument-hint: <subject-id> [content-format / structure instructions]
---

You are generating LearnWithDeiva learning content for ONE sub-subtopic.

Arguments for this run: `$ARGUMENTS`
- The first token is the **subject id** (e.g. `claude`, `gen-ai`, `python`).
- Everything after it (optional) is my **content-format / structure
  instructions** for this run. If I provided some, follow them exactly. If I
  provided none, use the default content brief in
  `docs/claude-code/CONTENT-FORMAT.md` (and match the existing sibling documents
  from step 3).

Follow `CLAUDE.md` at the repo root. Do every step in order. Do NOT skip the
verification, and do NOT commit.

## Steps

1. **Pick the target.** Run:
   `npm run content:pending -- --subject <subject-id>`
   Use the printed `scope` object. The target sub-subtopic id is
   `scope.subsubtopicId`; its folder is
   `src/content/subjects/<subject>/topics/<scope.subsubtopicId>/`.
   If the command reports no pending sub-subtopics, stop and tell me.

2. **Read the topic metadata.** Read
   `src/content/subjects/<subject>/topics/<scope.subsubtopicId>/topic.json`
   for the title, level, and tags. Confirm it has no `document.json` /
   `explanation.json` yet (it should not — that is why it is pending).

3. **Read 2–3 sibling examples.** Find 2–3 sub-subtopics under the SAME subject
   (ideally under the same subtopic `scope.subtopicId`) that already have a
   `document.json`, and read them in full. These define the structure, depth,
   tone, and the exact `tiptap/v1` shape your output must match.

4. **Author the content document.** Write
   `src/content/subjects/<subject>/topics/<scope.subsubtopicId>/document.json`.
   - This MUST be the renderable format: `{ "format": "tiptap/v1", "doc": { "type": "doc", "content": [ ... ] } }`. Do NOT write under a `sections/` subfolder.
   - Follow the default content brief in `docs/claude-code/CONTENT-FORMAT.md` (depth, section structure, style, constraints, and the TipTap node mapping) UNLESS I gave per-run instructions in `$ARGUMENTS`, which override it. Either way, mirror the sibling documents from step 3.
   - Respect the quality bar in `CLAUDE.md`: accuracy over breadth, no filler, code that runs as-is, teach for understanding. If unsure of a fact, omit it.

5. **Rebuild app data.** Run `npm run gen:content`.

6. **Verify it renders.** Confirm
   `public/data/subjects/<subject>/sections/<scope.subsubtopicId>.json`
   now exists and is non-empty. (A malformed `document.json` is silently
   skipped, so if this file is missing, your JSON is invalid — fix it and
   re-run step 5.)

7. **Report and STOP.** Summarize the sub-subtopic generated and the file
   written. Do NOT run `git add`, `git commit`, or `git push` — I review and
   commit myself.
