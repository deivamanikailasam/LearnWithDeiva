---
description: Unattended loop step — generate content for the NEXT empty sub-subtopic of a subject (with renderable visuals + Claude-authored images), validate, commit, and push. Designed to be driven by /loop.
argument-hint: <subject-id> [content-format / structure instructions]
---

You are running ONE step of an unattended content-generation loop for
LearnWithDeiva. Each invocation fills in exactly ONE sub-subtopic, persists it,
and stops. The `/loop` wrapper re-invokes this command on its interval, so over
many runs the whole subject gets filled — newest pending first, no duplicates.

Arguments for this run: `$ARGUMENTS`
- The first token is the **subject id** (e.g. `gen-ai`, `react`, `python`).
- Everything after it (optional) is per-run **content-format instructions** that
  OVERRIDE the default spec in `docs/claude-code/CONTENT-FORMAT.md`. If none are
  given, follow that spec exactly.

This command is allowed to commit and push (unlike `/gen-next`). Do every step
in order. Do not skip validation. Do not stop early on the happy path.

## Steps

1. **Pick the target (deterministic, skips done work).** Run:
   `npm run content:pending -- --subject <subject-id>`
   - If it reports **no pending sub-subtopics**, the subject is complete: print
     `LOOP-DONE: <subject> fully generated` and STOP (do not commit). This is the
     loop's terminal state.
   - Otherwise use the printed `scope`. Target id = `scope.subsubtopicId`; folder
     = `src/content/subjects/<subject>/topics/<scope.subsubtopicId>/`.
   - The pending list excludes any sub-subtopic that already has a
     `document.json` or `explanation.json`, so existing content is never touched
     and the same one is never picked twice.

2. **Read the target metadata.** Read
   `src/content/subjects/<subject>/topics/<scope.subsubtopicId>/topic.json` for
   the title, level, and tags. Confirm there is no `document.json` yet (there
   should not be — that is why it is pending). If one exists, skip to step 1's
   "no pending" handling is wrong here — instead STOP and report the
   inconsistency without writing.

3. **Read 2–3 sibling examples.** Find 2–3 sub-subtopics under the SAME subject
   (ideally the same `scope.subtopicId`) that already have a `document.json` and
   read them in full. They define the exact `tiptap/v1` shape, depth, tone, and
   node usage your output must match.

4. **Author the content document.** Write
   `src/content/subjects/<subject>/topics/<scope.subsubtopicId>/document.json`.
   - Shape MUST be `{ "format": "tiptap/v1", "doc": { "type": "doc", "content": [ ... ] } }`.
     Never author under a `sections/` subfolder.
   - Follow `docs/claude-code/CONTENT-FORMAT.md` (depth, section structure,
     style, constraints, TipTap node mapping, and the supported-node list)
     UNLESS per-run `$ARGUMENTS` instructions override it. Either way mirror the
     siblings from step 3.
   - **Only these node types render** in the live viewer: `paragraph`, `heading`
     (level 2/3), `bulletList`/`orderedList`/`listItem`, `blockquote`,
     `codeBlock`, `table` (+ `tableRow`/`tableHeader`/`tableCell`),
     `horizontalRule`, `image`, `blockMath`, `inlineMath`, and the marks
     `bold`/`italic`/`code`/`link`. Do NOT use `mermaid`, `bar`, `pie`, `line`,
     or other chart nodes — they are silently dropped.
   - **Math / formulas:** use `inlineMath` / `blockMath` nodes with
     `{"attrs":{"latex":"..."}}` (KaTeX). Put LaTeX in the `latex` attr — do not
     wrap it in `\[ \]` or `$...$` inside the attr.
   - **Visuals / diagrams / images** (include where genuinely helpful, per the
     spec): you author them yourself, with no external image services.
       - Prefer an **SVG diagram you write by hand** (flowchart, architecture,
         sequence, comparison). Write the `.svg` text to a temp file, then add an
         image node that points at it with a `FILE:` placeholder:
         `{"type":"image","attrs":{"src":"FILE:/abs/path/to/diagram.svg","alt":"<describe it>"}}`.
         Keep SVGs clean, labelled, theme-neutral (readable on light & dark), and
         sized ~640–900px wide.
       - For genuine **data charts**, write a small matplotlib script
         (`python3`, already available) that saves a PNG to a temp file, then
         reference it the same way with `FILE:/abs/path/chart.png`.
       - Use the project scratchpad dir for temp `.svg`/`.png` files, not the repo.
   - Respect the quality bar in `CLAUDE.md`: accuracy over breadth, no filler,
     code that runs as-is, teach for understanding. If unsure of a fact, omit it.
     Never invent APIs, history, or behavior.

5. **Embed images as base64.** If you used any `FILE:` image placeholder, run:
   `npm run content:embed-images -- src/content/subjects/<subject>/topics/<scope.subsubtopicId>/document.json`
   This rewrites every `FILE:` src into an inline `data:` URI (base64 lives
   inside `document.json`; there is no separate asset file). Skip this step only
   if the document has no images.

6. **Rebuild app data.** Run `npm run gen:content`.

7. **Verify it renders.** Confirm
   `public/data/subjects/<subject>/sections/<scope.subsubtopicId>.json` now
   exists and is non-empty. If it is missing, your `document.json` is malformed
   (the build silently skips invalid docs) — fix the JSON and re-run steps 5–7.
   Do NOT commit a document that failed to compile.

8. **Commit and push.** Stage ONLY the source you authored and push to the
   feature branch:
   ```
   git add src/content/subjects/<subject>/topics/<scope.subsubtopicId>/document.json
   git commit -m "content(<subject>): <subsubtopic title>"
   git push -u origin claude/langchain-loop-content-gen-wt86f7
   ```
   - `public/data/**` is gitignored — do not try to add it.
   - If `git push` fails due to a network error, retry up to 4 times with
     exponential backoff (2s, 4s, 8s, 16s).
   - Never commit anything outside the single `document.json` for this run.

9. **Report and STOP this step.** Print one line:
   `LOOP-STEP done: <scope.subsubtopicId> — <title> (<N> remaining)`
   where `<N>` is from `npm run content:pending -- --subject <subject-id> --count`.
   Do not start another sub-subtopic in the same step — the `/loop` wrapper
   handles the next interval.

## Safety / correctness rules

- One sub-subtopic per step. Never batch.
- Never modify a sub-subtopic that already has content.
- If any step fails irrecoverably (e.g. JSON won't compile after a fix attempt,
  or `git push` keeps failing), STOP and report the failure clearly. Do not
  push a broken or empty document, and do not silently skip the target.
