Use the project rules as mandatory behavior.
Read the stage input file at docs/prompt-inputs/stage-generator-template.md.

Current source of truth:
- Claude
- Stage 1 (foundations)

Your task is to prepare a part-by-part implementation plan for generating high-quality learning content for the specified roadmap stage.

Instructions:
- First, extract and restate the detected SUBJECT, ROADMAP_STAGE_NAME, and roadmap structure from the file.
- Identify missing details, ambiguities, or decisions that need my input.
- Do not assume missing roadmap details.
- Do not generate final learning content yet.
- Do not implement files yet unless I approve.
- Provide:
  1. ambiguities
  2. decisions requiring approval
  3. architecture plan
  4. glossary strategy
  5. content schema
  6. UX/design direction
  7. proposed implementation parts
- Then stop and ask for approval to proceed only if context limit reached.