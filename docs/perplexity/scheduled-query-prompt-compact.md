# Scheduled-query prompt — compact (≤2000 chars)

Drop-in equivalent of `scheduled-query-prompt.md` with the same directives and
the same expected output, shrunk to fit ≤2000 characters in the prompt body so
it survives strict prompt-length limits. All deeper rules still live in
`RULES.md`, which the prompt makes Perplexity read as its first step.

> **Equivalence guarantee:** every directive that affects the generated output
> is preserved verbatim, or replaced by a `RULES.md §X` pointer that resolves
> to the exact same content (since Perplexity reads `RULES.md` first).

Paste **everything between the `--- PROMPT START ---` and `--- PROMPT END ---`
markers** into the Perplexity scheduled-search prompt field. Do not include
the markers themselves.

The body between the markers below is **1,979 characters**. To verify, run:

```bash
awk '/^--- PROMPT START ---$/{flag=1;next}/^--- PROMPT END ---$/{flag=0}flag' \
  docs/perplexity/scheduled-query-prompt-compact.md | awk 'NF' | wc -m
```

---

--- PROMPT START ---

Generate ONE LearnWithDeiva sub-subtopic. Use ONLY the Space files. Read first: RULES.md, SECTION-SCHEMAS.md, OUTPUT-CONTRACT.md, IMAGE-POLICY.md, ROADMAP-<subject>.md, GLOBAL-GLOSSARY.json, EXAMPLES.md, QUEUE.md.

1. Pick the FIRST `pending` entry in QUEUE.md. Verify its subsubtopicId is in ROADMAP-<subject>.md under the listed stage/topic/subtopic. If not: return manifest with files:[], queueCompletedIds:[], notes:<mismatch>, stop.
2. Generate content for that ONE sub-subtopic. Pick valid keys from SECTION-SCHEMAS.md. Apply ALL of RULES.md §4-§15. question-patterns (§6) keys: ONLY 5w1h, socratic, mindmap, comparative, what-if, cause-effect, what-breaks-this.
3. MANDATORY/REQUIRED (omit only with per-section justification in manifest.notes): synonyms (≥3 new terms); applications + references (§4 row 7); misconceptions (any common myth); ≥1 of interview-questions or scenario-questions; tradeoffs (almost always): BOTH advantages ≥2 AND disadvantages ≥2; mastery: every criterion needs a concrete `example` (§5.2).
4. Emit images.json only when Mermaid+charts can't (per IMAGE-POLICY.md); each item needs a matching imageTasks entry (same src+alt) with a prompt.
5. Output: EXACTLY one ```json fence with the Manifest object (OUTPUT-CONTRACT.md). NOTHING else.

Hard rules (validator rejects):
- schemaVersion=1; scope.subsubtopicId = queue entry; files[i].path = "src/content/subjects/<subject>/topics/<subsubtopicId>/sections/<key>.json"; queueCompletedIds = [subsubtopicId] if files else [].
- Valid JSON: double-quoted keys, no trailing commas, no smart quotes, no comments, no raw newlines in strings (use \n).
- ASCII math ONLY. NEVER \(...\), \[...\], $...$, $$...$$, \mathbb, \mathcal, \frac, \sum, \prod, \int, \sqrt, \hat, \bar, \vec, \cdot, \times, \leq, \geq or any backslash macro. Use R^n, c·v, sqrt(x), x_i, x^2, ||v||, M^T, <u,v>. (RULES.md §11 table.)

Quality: accuracy > breadth (omit if unsure); no filler; code runs as-is; match EXAMPLES.md.

Begin.

--- PROMPT END ---
