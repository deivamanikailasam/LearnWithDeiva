# PILOT-NOTES — first end-to-end Perplexity run (Gen AI, Stage 1)

This runbook walks you through the **first** real Perplexity run that exercises
every piece of the pipeline: build Space → upload → schedule prompt → produce
manifest → dry-run apply → real apply → A/B against the existing Cursor
version. Fill in the bracketed `_TODO_` fields as you go; future pilots
(other subjects/stages) can copy this as a template.

The goal is to verify **quality parity with the Cursor-generated content
already in this repo** before committing the workflow.

---

## Why we pilot on `programming-basics--operators-and-expressions`

- It already has a complete, high-quality Cursor-generated baseline at
  [src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/](../../src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/),
  giving us a fair A/B.
- It exercises the common section mix: `explanation`, `code`, `mistakes`,
  `applications`, `synonyms`, `scenario-questions`, `interview-questions`,
  `exam-prep`, `references`. No Mermaid/charts/images, so the first pilot
  isolates the textual-content path.

For the **second** pilot (rich visuals), repeat the workflow with
`python-syntax-idioms--decorators`, which adds `diagrams`, `charts`,
`question-patterns`, `connections`, `origins`, `tradeoffs`, and `mastery`.

---

## Step 1 — Build the Space bundle

Already verified once in this repo:

```bash
npm run perplexity:build-space -- --subject gen-ai --stage computing-foundations
```

Confirm the bundle exists at [space/gen-ai/](../../space/gen-ai/) and contains:

- `RULES.md`, `SECTION-SCHEMAS.md`, `OUTPUT-CONTRACT.md`, `IMAGE-POLICY.md`
- `scheduled-query-prompt.md`
- `ROADMAP-gen-ai.md`
- `GLOBAL-GLOSSARY.json` (~530 terms across the subject)
- `GLOSSARY-CONFLICTS.md` (informational; reconcile in a separate pass)
- `QUEUE.md` (71 pending sub-subtopics for Stage 1)
- `EXAMPLES.md` (3 auto-picked gold-standard sub-subtopics inlined)

> If you intentionally want the first queue entry to be
> `programming-basics--operators-and-expressions`, edit `QUEUE.md` once to
> move that line to the top of the list (the scheduled prompt picks the first
> `[ ] pending` entry).

## Step 2 — Stand up the Perplexity Space

1. Perplexity → **Spaces** → **New Space** → name it
   `LearnWithDeiva — Gen AI`.
2. Open the Space's settings; set its **system instructions** to:

   > Always follow `RULES.md`, `SECTION-SCHEMAS.md`, `OUTPUT-CONTRACT.md`, and
   > `IMAGE-POLICY.md` in the attached files. Always output exactly one fenced
   > ```json block matching the manifest contract, and nothing else.

3. Upload every file from `space/gen-ai/` to the Space.

## Step 3 — Configure the scheduled query

1. In the Space, create a new **Scheduled Search**.
2. Paste the body of [scheduled-query-prompt.md](scheduled-query-prompt.md)
   into the prompt field (do NOT include the `--- PROMPT START ---` / `--- PROMPT END ---`
   markers).
3. Pick a frequency that suits your throughput. For the pilot, set it to
   **daily** and then nudge by editing the next-run time once you're ready.
4. Save and wait for the first run.

## Step 4 — Capture the manifest

When the scheduled run completes:

1. Open the result. It should be exactly one ```json fenced block.
2. Copy the entire response (fences included is fine — the apply script
   strips them).
3. Save it locally:

   ```bash
   pbpaste > /tmp/manifest.json     # macOS
   # or: xclip -selection clipboard -o > /tmp/manifest.json   # Linux
   ```

## Step 5 — Dry-run the apply

```bash
npm run perplexity:apply -- --file /tmp/manifest.json --dry-run
```

Expected output:

- A `=== Summary ===` block with the scope, the section files, image-task
  count, and glossary delta.
- A `=== Dry run — no files written ===` block listing every file that would
  be written and where the queue/glossary updates would land.
- Exit code `0`.

If you see errors, do NOT proceed. Most common causes (and fixes):

| Error | Likely cause | Fix |
| --- | --- | --- |
| `Manifest is not valid JSON.` | Perplexity added prose before/after the fence | Strengthen the prompt; the script strips fences but cannot fix mid-string corruption |
| `files[i].path must start with ...` | Perplexity wrote a different sub-subtopic | Edit `QUEUE.md` so the intended item is first; re-upload; rerun |
| `5w1h MUST contain exactly 6 items` | Pattern incompleteness | Drop the pattern by editing the manifest, or re-run the query |
| `Glossary conflicts (refusing to merge without --force)` | Definition drift vs existing term | Reconcile manually, then re-run with `--force` |
| `mermaid: reserved keyword "end"` | Mermaid lint hit | Rewrite the diagram (rename node), or remove `diagrams.json` |

## Step 6 — Real apply

```bash
npm run perplexity:apply -- --file /tmp/manifest.json
npm run gen:content          # refresh public/data
npm run dev                  # open http://localhost:5173 and view the topic
```

After apply, the script prints:

- Each written file path.
- Whether `space/gen-ai/GLOBAL-GLOSSARY.json` was merged.
- Whether `space/gen-ai/QUEUE.md` was updated.
- Pending image tasks (if any).
- The next-step checklist (re-upload `QUEUE.md` + `GLOBAL-GLOSSARY.json` to
  the Space; trigger or wait for the next run).

## Step 7 — A/B against the Cursor baseline

The pilot intentionally overwrites the existing Cursor-generated files. The
old version is safe in git history.

```bash
git diff -- src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/
```

Grade the diff against the rubric below. Each row is a hard pass/fail.

| Vector | Pass criterion | Result |
| --- | --- | --- |
| Definition correctness | `explanation.definition` is technically accurate and matches authoritative docs | `_TODO_` |
| Explanation depth | `explanation.content` covers the same concepts as the baseline, at comparable depth | `_TODO_` |
| Example realism | `examples` and `scenario-questions` describe believable, concrete situations (not "you can use X here") | `_TODO_` |
| Code correctness | Every snippet in `code.json` runs as-is in the stated language | `_TODO_` |
| Non-duplication | No content repeats across sections; no boilerplate filler | `_TODO_` |
| Glossary normalisation | No new terms added that already exist in `GLOBAL-GLOSSARY.json` (case-insensitive) | `_TODO_` |
| Self-assessment usefulness | `exam-prep` items are answerable from the explanation; MCQ answers are present in `options` | `_TODO_` |
| Mastery actionability | `mastery.criteria` are concrete, observable behaviours (not "understand X") | `_TODO_` |
| Question-pattern completeness | If `question-patterns` is present, every chosen pattern is fully covered per RULES.md §6 | `_TODO_` |
| Mermaid validity | If `diagrams` is present, every diagram lints clean (apply script confirms) | `_TODO_` |
| Schema strictness | The apply script accepted the manifest with no errors | `_TODO_` |
| Token budget vs Cursor | Time taken in Perplexity ≪ equivalent Cursor session | `_TODO_` |

## Step 8 — Restore baseline OR keep the Perplexity version

If the grade fails on **any** vector that can't be fixed by a small rules
tweak:

```bash
git checkout -- src/content/subjects/gen-ai/topics/programming-basics--operators-and-expressions/
```

If the grade passes, keep the new content and proceed.

## Step 9 — Iterate

Capture lessons here. Each iteration should be at most a tweak to one of the
Space files; rebuild and re-upload before the next run.

| Iteration | Date | What changed | Result | Notes |
| --- | --- | --- | --- | --- |
| 1 | `_TODO_` | first pass with default rules | `_TODO_` | `_TODO_` |
| 2 | `_TODO_` | `_TODO_` | `_TODO_` | `_TODO_` |
| 3 | `_TODO_` | `_TODO_` | `_TODO_` | `_TODO_` |

Common edits during early iterations:

- Tighten the **examples-in-sections rule** in `RULES.md` if Perplexity
  routinely emits generic examples ("you can use this here").
- Lift specific section guidance into the prompt itself (e.g. "for
  `exam-prep`, prefer 4-option MCQs with a 1-sentence `explanation`").
- Swap or extend the gold-standard examples in `EXAMPLES.md` if Perplexity
  is matching the wrong tone.

## Step 10 — Sign off the pilot

When all rubric rows pass for **two consecutive** sub-subtopics:

- Mark this file as the canonical procedure for future stages/subjects.
- Move on to Part 5 (generalize for any subject; write `USAGE.md`).
- Optionally update [docs/perplexity/README.md](README.md) with any lessons
  worth surfacing at the top.

---

## Appendix A — Pre-flight in-Cursor pipeline validation (already passed)

The pipeline was smoke-tested end-to-end before this pilot, without invoking
Perplexity:

- `npm run perplexity:build-space -- --subject gen-ai --stage computing-foundations`
  produced 10 files at `space/gen-ai/` with 71 queued sub-subtopics, 537
  glossary terms, and 3 auto-picked examples.
- `node scripts/apply-content.mjs --file scripts/__fixtures__/manifest-example.json --dry-run`
  validated envelope, scope, per-section schemas, image-task reconciliation,
  glossary dedupe, and queue update — all green.
- Negative tests confirmed the validators reject: cross-sub-subtopic paths,
  Mermaid using `style`/`end`, charts with `xKey` missing from rows or values
  typed as strings, `exam-prep.answer` not in `options`, and `5w1h` missing
  required question words.

The Perplexity-side run is the only unverified leg; this runbook is the
script for it.
