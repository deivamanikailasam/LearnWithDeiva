# Generating content with Claude Code

A repeatable, interactive loop for filling in sub-subtopic content using Claude
Code (included with your Claude Pro plan). You run one command per
sub-subtopic, watch it work, and it stops before committing so you review.

This is the Claude-native alternative to the Perplexity pipeline in
[../perplexity/](../perplexity/). Unlike Perplexity, Claude Code runs inside the
repo, so it reads the existing topics directly and writes the content document
itself — no Space upload, no copy-paste.

## What gets generated, and where it renders

- You author one document per sub-subtopic at
  `src/content/subjects/<subject>/topics/<subsubtopicId>/document.json`
  (TipTap `tiptap/v1` — the same format all existing topics use).
- `npm run gen:content` compiles it into
  `public/data/subjects/<subject>/sections/<subsubtopicId>.json`, which the app
  fetches and renders.

> Note: the `topics/<id>/sections/*.json` "manifest" model used by
> `scripts/apply-content.mjs` / `docs/perplexity/` is NOT rendered by the app.
> This loop intentionally targets `document.json` instead.

## One-time setup

1. Install Claude Code (see Anthropic's docs) and authenticate with your Claude
   Pro account: run `claude` once in this repo and complete the login.
2. That's it — `CLAUDE.md` (repo root) and `.claude/commands/gen-next.md` are
   already in the project, so Claude Code picks them up automatically.

## The loop (per sub-subtopic)

From the repo root:

```bash
claude
```

Then, inside the session:

```
/gen-next claude
```

- The first word is the **subject id** (`claude`, `gen-ai`, `python`, ...).
- You can append your own **content-format / structure instructions** after it,
  e.g.:

  ```
  /gen-next claude Keep it to a definition, a "How it works" section, one runnable code block, and 3 key takeaways.
  ```

  If you give no instructions, it mirrors the structure of existing sibling
  topics in that subject.

The command will: find the next sub-subtopic with no content, read 2–3 sibling
documents as a style reference, write `document.json`, run `npm run gen:content`,
verify the rendered data file was produced, then **stop without committing**.

## Review and commit (you do this)

```bash
npm run dev    # view at http://localhost:5173, navigate to the new sub-subtopic
git diff       # inspect the generated document.json
# if good:
git add -A && git commit -m "content: <subsubtopicId>"
```

## See what's left

```bash
npm run content:pending -- --subject claude --count   # how many remain
npm run content:pending -- --subject claude           # the next one
npm run content:pending -- --subject claude --all      # every pending scope (JSON)
npm run content:pending -- --subject gen-ai --stage foundations   # scope to one stage
```

"Pending" = a sub-subtopic with no `document.json` or `explanation.json` yet.

## Realistic expectations on the Pro plan

- Claude Code is included with Claude Pro, but it shares one usage pool with
  claude.ai on a rolling ~5-hour window plus a weekly cap, and Pro is
  Sonnet-only. Heavy generation drains the pool, so expect to work in bursts,
  not one marathon. Check remaining usage with `/usage` inside Claude Code.
- A whole subject is hundreds of sub-subtopics; it will span many sessions.
- This loop is interactive on purpose. Fully unattended scheduling would mean an
  OS scheduler (cron / launchd) calling `claude -p` in headless mode — there is
  no "routine" scheduler inside Claude itself. That can be added later as a
  batch command if you want it.

## Quality gate

Content is gated by your review: nothing is committed automatically. The
generation step also verifies the document compiled into `public/data` (an
invalid `document.json` is silently skipped by the build, so the loop checks the
output file exists). Keep `npm run lint` and `npm run build` green before
committing.
