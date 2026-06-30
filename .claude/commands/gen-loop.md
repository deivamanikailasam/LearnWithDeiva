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
   should not be — that is why it is pending). If one exists, STOP and report the
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
   - **Visuals / diagrams / images — REQUIRED in every document:**
     Every document must include at least one image. Author it yourself; no
     external image services.
       - Prefer an **SVG diagram you write by hand** (flowchart, architecture,
         sequence, comparison table, decision tree). Write the SVG inline in your
         Python generator, base64-encode it, and embed it directly as a
         `data:image/svg+xml;base64,...` URI in the image node's `src` attribute.
         Keep SVGs clean, labelled, theme-neutral (readable on light & dark), and
         sized ~640–900px wide.
       - For genuine **data charts**, write a small matplotlib script
         (`python3`, already available) that saves a PNG to the scratchpad dir,
         base64-encode it, and embed as `data:image/png;base64,...`.
       - Use the project scratchpad dir for temp `.svg`/`.png` files, not the repo.
       - The TipTap validator (step 4b) will hard-fail if no image node is present.
   - Respect the quality bar in `CLAUDE.md`: accuracy over breadth, no filler,
     code that runs as-is, teach for understanding. If unsure of a fact, omit it.
     Never invent APIs, history, or behavior.

4b. **Validate TipTap structure and image requirement.** Run:
   ```
   node scripts/validate-tiptap.mjs src/content/subjects/<subject>/topics/<scope.subsubtopicId>/document.json
   ```
   - **If validation fails with "must contain at least one image node":**
     Add a relevant SVG diagram to the document (architecture, flowchart, comparison,
     or decision diagram appropriate to the topic). Re-write the document and re-run
     validation until it passes.
   - **If validation fails with structural errors** (bad nesting, missing attrs, etc.):
     Fix the JSON, re-write, and re-run validation. Do NOT proceed to step 5 until
     validation exits with code 0.
   - Do not commit a document that failed this step.

5. **Embed images as base64.** If you authored SVG/PNG files using `FILE:` placeholder
   syntax, run:
   `npm run content:embed-images -- src/content/subjects/<subject>/topics/<scope.subsubtopicId>/document.json`
   This rewrites every `FILE:` src into an inline `data:` URI. Skip this step only
   if all images were already embedded inline (base64 in the `src` attr directly).

5b. **Recalculate duration.** Run:
   `node scripts/update-computed-durations.mjs --subject <subject> --topic <scope.subsubtopicId>`
   This reads the document content and writes computed `hours` + `hoursSource: "computed"` to
   `topic.json`. Never skip this step.

   **If computed hours < 1.5:**
   The document is too short. Extend it by inserting new sections (additional examples,
   deeper code walkthroughs, an operational considerations section, a comparison table,
   common pitfalls, or testing patterns) before the Summary heading. Then:
   - Re-run validation: `node scripts/validate-tiptap.mjs <path>`
   - Re-run duration: `node scripts/update-computed-durations.mjs ...`
   - Repeat until hours ≥ 1.5. Do NOT commit a document below the threshold.

6. **Rebuild app data.** Run `npm run gen:content`.

7. **Verify it renders.** Confirm
   `public/data/subjects/<subject>/sections/<scope.subsubtopicId>.json` now
   exists and is non-empty. If it is missing, your `document.json` is malformed
   (the build silently skips invalid docs) — fix the JSON and re-run steps 4b–7.
   Do NOT commit a document that failed to compile.

8. **Commit and push.** Stage the document AND the updated topic metadata, then push:
   ```
   git add src/content/subjects/<subject>/topics/<scope.subsubtopicId>/document.json
   git add src/content/subjects/<subject>/topics/<scope.subsubtopicId>/topic.json
   git commit -m "content(<subject>): <subsubtopic title>"
   git push -u origin claude/langchain-loop-content-gen-wt86f7
   ```
   - `public/data/**` is gitignored — do not try to add it.
   - If `git push` fails due to a network error, retry up to 4 times with
     exponential backoff (2s, 4s, 8s, 16s).
   - Never commit anything outside those two files for this run.

8b. **Merge to main if the stage is now complete.** After a successful push, check:
   ```
   npm run content:pending -- --subject <subject> --stage <scope.stageId> --count
   ```
   Parse the leading integer from the output. If it is **0** (no remaining sub-subtopics
   in this stage), the stage is done — merge the feature branch into `main` and push:
   ```
   git checkout main
   git pull --ff-only origin main
   git merge --no-ff claude/langchain-loop-content-gen-wt86f7 \
       -m "merge(<subject>): complete stage <scope.stageId>"
   git push -u origin main
   git checkout claude/langchain-loop-content-gen-wt86f7
   ```
   If the count is non-zero, skip this step silently.
   If the merge fails (conflict or non-fast-forward), report the failure and leave
   both branches as-is — do NOT force-merge or commit a broken state.

9. **Report and STOP this step.** Print one line:
   `LOOP-STEP done: <scope.subsubtopicId> — <title> (<N> remaining)`
   where `<N>` is from `npm run content:pending -- --subject <subject-id> --count`.
   If step 8b ran a stage merge, also print:
   `STAGE-MERGED: <scope.stageId> merged to main`
   Do not start another sub-subtopic in the same step — the `/loop` wrapper
   handles the next interval.

## Complete step order summary

```
1.  npm run content:pending -- --subject <subject>       # pick target
2.  cat topic.json                                        # read metadata
3.  read 2-3 sibling document.json files                 # format reference
4.  write document.json  (must include ≥1 image/SVG)    # author content
4b. node scripts/validate-tiptap.mjs <doc>               # structural + image gate
5.  npm run content:embed-images -- <doc>                # (if FILE: placeholders used)
5b. node scripts/update-computed-durations.mjs ...        # duration gate (≥1.5h)
    → if < 1.5h: extend → re-validate (4b) → recompute
6.  npm run gen:content                                   # rebuild public/data
7.  ls -lh public/data/subjects/.../sections/<id>.json   # render gate
8.  git add + git commit + git push                       # persist
8b. npm run content:pending -- --stage ... --count        # stage-complete check
    → if 0: git checkout main && git merge && git push main
9.  print LOOP-STEP done line and STOP
```

## Safety / correctness rules

- One sub-subtopic per step. Never batch.
- Never modify a sub-subtopic that already has content.
- Gates that must all pass before commit: TipTap validation (4b), duration ≥ 1.5h (5b), rendered file exists (7).
- If any step fails irrecoverably (validation errors after two fix attempts, push keeps failing),
  STOP and report the failure clearly. Do not push a broken or short document.
