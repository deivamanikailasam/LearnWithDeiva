# Implementation summary

## New files

**Docs (Space contract — what Perplexity reads):**

- [docs/perplexity/README.md](README.md) — architecture + end-to-end flow
- [docs/perplexity/scheduled-query-prompt.md](scheduled-query-prompt.md) — literal prompt to paste into Perplexity
- [docs/perplexity/space-files/RULES.md](space-files/RULES.md) — non-negotiables, section selection, completeness, mermaid/charts/code rules
- [docs/perplexity/space-files/SECTION-SCHEMAS.md](space-files/SECTION-SCHEMAS.md) — all 24 section keys with good/bad examples
- [docs/perplexity/space-files/OUTPUT-CONTRACT.md](space-files/OUTPUT-CONTRACT.md) — strict manifest schema + worked example
- [docs/perplexity/space-files/IMAGE-POLICY.md](space-files/IMAGE-POLICY.md) — prefer Mermaid/charts; rules for `images.json` + `imageTasks`
- [docs/perplexity/PILOT-NOTES.md](PILOT-NOTES.md) — runbook + grading rubric for the first real Perplexity run
- [docs/perplexity/USAGE.md](USAGE.md) — day-to-day playbook + troubleshooting

**Scripts:**

- [scripts/build-perplexity-space.mjs](../../scripts/build-perplexity-space.mjs) — emits `space/<subject>/` (roadmap, glossary, queue, examples, copied docs)
- [scripts/apply-content.mjs](../../scripts/apply-content.mjs) — validates + applies a manifest, merges glossary, updates queue
- [scripts/lib/section-validators.mjs](../../scripts/lib/section-validators.mjs) — per-section JSON schema + question-pattern completeness + mermaid lint
- [scripts/fetch-images.mjs](../../scripts/fetch-images.mjs) — optional helper to download `imageTasks.suggestedSources` into `public/content-assets/...`
- [scripts/__fixtures__/manifest-example.json](../../scripts/__fixtures__/manifest-example.json) — fixture for dry-run smoke tests

**Modified:**

- [package.json](../../package.json) — added `perplexity:build-space`, `perplexity:apply`, `perplexity:fetch-images` scripts
- [.gitignore](../../.gitignore) — added `space/` (auto-added by the build script)

## Verified end-to-end

- `npm run perplexity:build-space -- --subject gen-ai --stage computing-foundations` produced 10 files, 71 queued sub-subtopics, 537 glossary terms, 3 auto-picked examples.
- Same builder works for other subjects (`python`: 33 stages, 1106 sub-subtopics).
- `npm run perplexity:apply -- --file scripts/__fixtures__/manifest-example.json --dry-run` cleanly exits 0 with full summary.
- Negative tests confirmed validators reject: cross-sub-subtopic paths, mermaid `style`/reserved `end` ID, charts with missing `xKey` and string-typed numeric values, `exam-prep.answer` not in `options`, `5w1h` missing "Where".
- Tolerant parser correctly strips ```json fences and trailing commas.
- Glossary conflict detection refuses to merge without `--force` and shows both definitions.
- `npm run lint` passes clean.

## What you do next (the one thing I can't do for you)

Run the actual Perplexity-side pilot following [docs/perplexity/PILOT-NOTES.md](PILOT-NOTES.md):

1. Spin up a Perplexity Space named `LearnWithDeiva — Gen AI`.
2. Upload everything in [space/gen-ai/](../../space/gen-ai/).
3. Paste the body of [docs/perplexity/scheduled-query-prompt.md](scheduled-query-prompt.md) as the scheduled search.
4. After the first scheduled run completes, copy the response and paste the whole thing (the single ```json fenced block — leading/trailing fences are fine, the apply script strips them) into [docs/perplexity/data/manifest.json](data/manifest.json). Then:

   ```bash
   # 1. Dry-run: validates envelope, scope, every section schema, glossary
   #    dedupe, mermaid lint, image-task reconciliation. Writes nothing.
   npm run perplexity:apply -- --file docs/perplexity/data/manifest.json --dry-run

   # 2. If the dry-run is green, apply for real: writes the section JSON
   #    files into src/content/subjects/<subject>/topics/<id>/sections/,
   #    merges new glossary terms into space/<subject>/GLOBAL-GLOSSARY.json,
   #    and marks the completed entry as [x] in space/<subject>/QUEUE.md.
   npm run perplexity:apply -- --file docs/perplexity/data/manifest.json

   # 3. Refresh the app data and view locally.
   npm run gen:content
   npm run dev
   ```

   Re-upload the changed `QUEUE.md` (and `GLOBAL-GLOSSARY.json` if any new terms merged) to the Space so the next scheduled run picks the next sub-subtopic.

5. A/B against the existing Cursor-generated `programming-basics--operators-and-expressions` and fill in the grading rubric in [PILOT-NOTES.md](PILOT-NOTES.md).

> **Tip:** The path `docs/perplexity/data/manifest.json` is just convention — `--file` accepts any path. You can also pipe directly with `pbpaste | npm run perplexity:apply -- --dry-run` if you don't need to keep the file. Keeping a copy under `docs/perplexity/data/` is useful for debugging when the apply script references "files[i]..." errors.

If the first pilot reveals quality gaps, the iteration loop is: tighten [docs/perplexity/space-files/RULES.md](space-files/RULES.md) or swap the examples in [docs/perplexity/space-files/SECTION-SCHEMAS.md](space-files/SECTION-SCHEMAS.md) → rerun `perplexity:build-space` → re-upload the changed files → rerun the schedule.
