# LearnWithDeiva × Hermes Agent — Ideas

Analysis of how [Hermes Agent](https://hermes-agent.org/) (open-source, self-hosted autonomous
agent by Nous Research) could be used on this project.

## What this project is

LearnWithDeiva is a fully **data-driven** learning platform (React + Vite + TypeScript +
Tailwind, deployed to GitHub Pages, optional Supabase sync). All content is plain JSON
discovered at build time — no code changes needed to add content. Each topic can hold
**12 rich section files**: `explanation`, `code`, `synonyms`, `applications`, `materials`,
`references`, `projects`, `interview-questions`, `scenario-questions`, `case-studies`,
`exam-prep`, `course-prep`. Section shapes are defined in `src/types/content.ts`.

### The critical finding — a massive content gap

| Subject | Topic stubs |
|---|---|
| machine-learning | 1,874 |
| nextjs | 1,681 |
| python | 1,653 |
| aws | 1,555 |
| angular | 1,530 |
| agentic-ai | 1,401 |
| gen-ai | 1,392 |
| react | 943 |
| java | 844 |
| claude | 713 |
| javascript | 3 |
| **Total** | **~13,589 topics** |

But only **33 section files exist in the entire repo** — and essentially **only one topic**
(`javascript/variables-and-data-types`) is fully fleshed out with all 12 sections. So there's
a beautifully architected scaffold of ~13,500 topics that are empty shells. That gap is exactly
the kind of large-scale, repetitive, schema-bound, parallelizable work Hermes Agent is built for.

> **Caveat:** This is a Windows machine, and Hermes Agent lists native Windows as experimental —
> it recommends running under **WSL2**. Plan to run it from WSL2 against this same repo path.

---

## Best things Hermes Agent can do for this project

### 1. Bulk-generate the missing section content (the headline win)
Single highest-value use. Hermes's **batch processing** (configurable workers, batch sizes,
automatic checkpointing) plus **parallel sub-agents** map perfectly onto "13,500 topics × up to
12 sections."
- Point it at `src/types/content.ts` as the schema contract and
  `javascript/variables-and-data-types/sections/*` as the gold-standard example.
- Spawn one sub-agent per subject (or per roadmap stage) to write `explanation.json`,
  `code.json`, etc. for each topic, each adhering exactly to the TypeScript interfaces.
- **Checkpointing** means a run over thousands of topics can resume after interruption.
- Use **multi-model routing** (OpenRouter / local vLLM) to send cheap sections (synonyms, tags)
  to a small model and hard ones (explanation, case-studies) to a stronger model — controlling
  cost across 13k topics.

### 2. Web-research-backed `materials` and `references` sections
Hermes has **web search, page extraction, and full browser automation**.
- For each topic, search for real docs/articles/videos, **verify the URLs resolve** (browser
  control), and only then write `materials.json` / `references.json` with valid `url`, `author`,
  `type` fields.
- Turns dead-link risk into verified, citeable references — a real quality differentiator.

### 3. Automated validation, schema-conformance, and self-healing
Builds on the existing `scripts/agentic/validate.mjs`. Hermes has **sandboxed code execution**
(Docker / local terminal).
- Run `npm run lint`, `npm run build` (tsc type-check), and the validate scripts after each
  batch, read failures, and **fix them autonomously** in a loop.
- Detect dead links, duplicate IDs, orphan `parentId`s, roadmap nodes without a topic, and JSON
  that doesn't match `content.ts` — then repair.

### 4. Generate diagrams and visual assets
Hermes ships **image generation** and diagramming skills.
- Auto-generate architecture diagrams, flowcharts, and concept illustrations per topic, commit
  them under the repo, and embed in `explanation` markdown.
- Especially valuable for ML, gen-AI, and agentic-AI topics.

### 5. Scheduled, unattended content maintenance
Hermes's **cron scheduler** + **persistent memory** enable ongoing upkeep.
- Nightly: pick N empty topics, generate + validate + commit/PR, and send a **morning briefing**.
- Weekly: re-verify external links across all `references`/`materials`, flag/replace broken ones.
- Periodically refresh fast-moving subjects (Next.js, Claude, agentic-AI); memory prevents
  repeating already-covered material.

### 6. Multi-platform authoring & review workflow
The **Telegram / Discord / Slack / WhatsApp / CLI gateway** lets you drive content work from
your phone.
- "Hermes, fill out the React hooks topics tonight" from Telegram; review the diff/briefing later
  from your terminal — **cross-platform continuation** keeps the same conversation.
- Approve/reject generated topics from chat, with Hermes committing approved ones.

### 7. Turn the generation pipeline into reusable Hermes skills
Hermes **auto-creates SKILL.md documents** when it solves a hard problem.
- Capture the `genStage.mjs` / `addTopics.mjs` conventions (id derivation, `parentId`, order
  rules, fractional ordering) and "how to author a LearnWithDeiva topic/section correctly" as a
  portable skill, so every future run is consistent without re-explaining the schema.

### 8. Roadmap & taxonomy expansion
Use **multi-model reasoning** + web research to propose new topics/subtopics and roadmap nodes
for thin areas, generating `topic.json` stubs and `roadmap.json` entries that match the existing
ordering scheme — then immediately fill their sections (loops back to #1).

### 9. Quiz / exam-prep quality and answer-checking
For `exam-prep`, `interview-questions`, and `scenario-questions`, Hermes can **self-verify** by
running `code.json` snippets in its sandbox and cross-checking that stated answers are correct —
reducing wrong-answer risk in interactive quizzes.

### 10. Dev/ops assistance on the app itself
Beyond content: GitHub skill for PRs/issues, dependency bumps (bleeding-edge React 19 / Vite 8 /
TS 6), Supabase setup verification, and GitHub Pages deploy troubleshooting — all from one agent.

---

## Suggested starting sequence
1. Install Hermes under WSL2, point it at this repo, give it `content.ts` + the gold-standard JS
   topic as the contract/example.
2. Capture the authoring convention as a **skill** (#7).
3. Pilot on **one subject** (e.g. finish `javascript`, then `react`) with batch + validation loop
   (#1, #3) before scaling.
4. Add **web-verified references** (#2) and **diagrams** (#4) as enrichment passes.
5. Once trustworthy, set up the **nightly cron + morning briefing** (#5) and drive it from
   Telegram (#6) to grind through all ~13.5k topics over time.

**Decisive fit:** ~13,500 schema-defined slots need high-quality, verifiable, repetitive content
— and Hermes's batch processing, parallel sub-agents, checkpointing, web verification, sandboxed
validation, and scheduling line up almost exactly with that need.
