# Content format — default authoring spec

This is the default content brief the `/gen-next` loop follows when generating a
sub-subtopic's `document.json`. Override it per run by passing your own
instructions after the subject id; otherwise this spec applies.

> Critical: the output file is a **TipTap `tiptap/v1` document**, not Markdown.
> Everything below describes the content's depth, structure, and style; author
> it as TipTap nodes (see "Encoding as TipTap" at the end). Never put raw
> Markdown syntax (`##`, ```` ``` ````, `- `, `|`) inside `text` nodes — use the
> corresponding TipTap node instead.

## Length and depth

**DURATION REQUIREMENT (STRICT): Every sub-subtopic MUST compute to between 1 hour 30 minutes (1.5h) and 3 hours (3.0h). Both ends are hard limits — do not submit content below 1.5h or above 3.0h.**

To target the 1.5h–3.0h window reliably, aim for content with roughly:
- 15–25 headings (h2/h3)
- 3–6 code blocks totalling 100–200 lines of code
- 1–2 SVG diagrams
- 30–60 list items
- 1,500–3,000 words of prose text

These are calibration guides, not rigid counts. After authoring, mentally estimate whether the content reads as 1.5–3.0 hours of focused study. If it feels shorter, expand the thinnest sections. If it feels longer, trim repetition and merge overlapping sections.

- Maximize useful detail, not empty length.
- Explain the topic thoroughly, from fundamentals to advanced points — cover all applicable content areas, but do not pad with repetition or boilerplate.
- Each major section must have substantive explanation (multiple paragraphs or a code block), not just a sentence or two.
- Include multiple runnable code examples — at minimum one simple introductory example and one realistic/production example.
- Avoid filler, repetition, and generic statements; every paragraph must add new value.
- Use clear section headings and structured formatting so content stays readable.
- Include step-by-step guidance, comparisons, and real-world examples where they add genuine value.
- Do not pad sections to hit the duration floor; do not repeat information already covered in another section to push the word count up.

## Content structure

**MANDATORY: Cover ALL of the sections below in every sub-subtopic. Every section must be substantive — multiple paragraphs and/or code blocks per section. Do NOT omit any section. The only exception is if a section is completely inapplicable to the specific topic (e.g. "Security & reliability" for a purely mathematical concept) — in that case, combine it with the closest related section rather than skipping it entirely. When uncertain whether a section applies, include it.**

Organize the document into clearly labeled sections using headings:

1. **What it is** — definition and brief context; two or more paragraphs
2. **Why it matters** — purpose, importance, and problems it solves; explain the pain points this addresses with concrete examples
3. **Benefits** — key advantages and positive outcomes; list with explanation of each
4. **Trade-offs** — limitations, downsides, and costs; be honest and specific, not generic
5. **How it works** — core mechanics or workflow; thorough multi-paragraph explanation with any relevant math/formulas using `blockMath`/`inlineMath` nodes
6. **Architecture** — process / flow / component architecture; **REQUIRED: include a hand-authored SVG diagram showing the architecture or flow** (see "Visuals")
7. **When to use it** — typical scenarios and when *not* to use it; include decision criteria
8. **How to implement** — practical, step-by-step guidance; include a complete worked implementation with code
9. **Examples** — at minimum two runnable code examples: one simple/introductory, one more realistic
10. **Real-world example** — production usage or realistic scenario; mention scale, constraints, architecture choices; include code where applicable
11. **Common mistakes** — pitfalls, misconceptions, and anti-patterns; code examples of the wrong way vs. the right way when possible
12. **Best practices** — practical recommendations and optimization tips; actionable, specific guidance
13. **Performance & scalability** — behavior under load, bottlenecks, scaling strategies; include benchmarks or complexity analysis
14. **Tooling & ecosystem** — relevant tools, frameworks, platforms; include code showing how to use them
15. **Comparison with alternatives** — concise comparison to related approaches; **use a comparison table**
16. **Security & reliability** — risks, failure modes, mitigations; production hardening
17. **Images / visuals** — at minimum one SVG diagram is REQUIRED in every document (see "Visuals" and section 6 above)

For conceptual topics, ALSO include:

- **Mental model** — an intuitive way to think about the concept; use an analogy, visual description, or worked thought experiment
- **Key takeaways** — 5–9 concise bullets summarizing the most important points (minimum 5 bullets)

Every document MUST end with a Key takeaways section.

## Style and formatting

- Do NOT mention the query title, page title, or topic name in the very first line. Start with a short, high-level overview sentence instead.
- Do NOT end with a question or a call for follow-up. Finish with a declarative sentence (the Key takeaways list is an acceptable ending).
- Use concise paragraphs; avoid unnecessary verbosity, but do not sacrifice depth for brevity.
- Use bullet lists sparingly, only when they clearly improve readability.
- Use code blocks for code or configuration snippets, with language tags where appropriate.
- Use math nodes (KaTeX) for every formula, equation, or scientific symbol — never plain text like `x^2` or `sum`. Inline math → `inlineMath`; display/standalone math → `blockMath`. The LaTeX goes in the node's `latex` attr WITHOUT `$...$` or `\[ \]` delimiters (the node already implies display vs inline). Use `\\` for matrix row breaks.

## Constraints

- Content must be generic and reusable. Do NOT include personal details, anecdotes, or references to specific users, skills, jobs, or locations.
- Do NOT refer to anyone "asking" the question. Write in an impersonal, tutorial style (e.g. "This approach is useful when…").
- Prioritize up-to-date information, clear explanations, concrete real-world applicability, genuine non-boilerplate insight, and maximum useful depth and information density.
- Accuracy over breadth: if unsure of a fact, omit it rather than guess. Code must run as-is.

## Encoding as TipTap (`document.json`)

The file shape is:

```json
{ "format": "tiptap/v1", "doc": { "type": "doc", "content": [ /* block nodes */ ] } }
```

Map the structure above to these node types (all confirmed in this repo's
existing topics):

| Content construct | TipTap node |
| --- | --- |
| Section heading | `{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"..."}]}` |
| Sub-section heading | same with `"level":3` |
| Paragraph | `{"type":"paragraph","content":[{"type":"text","text":"..."}]}` |
| Bold / italic / inline code | a `text` node with `"marks":[{"type":"bold"}]` (or `italic`, or `code`) |
| Link | `text` node with `"marks":[{"type":"link","attrs":{"href":"..."}}]` |
| Code / config block | `{"type":"codeBlock","attrs":{"language":"bash"},"content":[{"type":"text","text":"..."}]}` |
| Bullet list | `{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[...]}]}]}` |
| Numbered list | `{"type":"orderedList","attrs":{"start":1},"content":[ /* listItem */ ]}` |
| Table | `{"type":"table","content":[{"type":"tableRow","content":[{"type":"tableHeader",...},{"type":"tableCell",...}]}]}` |
| Section divider | `{"type":"horizontalRule"}` |
| Inline math | `{"type":"inlineMath","attrs":{"latex":"x^2 + 1"}}` (sits inside a paragraph's `content`) |
| Display math | `{"type":"blockMath","attrs":{"latex":"E = mc^2"}}` (a top-level block) |
| Image / diagram | `{"type":"image","attrs":{"src":"data:image/...;base64,...","alt":"..."}}` — see "Visuals" below |

### Only these node types render

The live site renders `document.json` through the read-only TipTap viewer
(`src/components/editor/view-tiptap-extensions.ts`). It registers ONLY:
paragraph, heading (levels 2–4), bulletList/orderedList/listItem, blockquote,
codeBlock, table family, horizontalRule, link, image, and the math nodes
(`inlineMath`, `blockMath`), plus `bold`/`italic`/`code` marks. Any other node
type — notably `mermaid`, `bar`, `pie`, `line`, and other chart nodes that exist
elsewhere in the repo — is **silently dropped**. Do not author them. Express
diagrams as SVG/PNG `image` nodes (below), and comparisons as `table` nodes.

### Visuals (diagrams, charts, screenshots)

Author visuals yourself; never call an external image service. The base64 lives
inline inside `document.json` (the same pattern the existing image-bearing
topics use — there is no separate asset file because `public/data` is
gitignored).

To keep the authored JSON readable, point an image node at a local file with a
`FILE:` placeholder, then let the embedder inline it:

```json
{ "type": "image", "attrs": { "src": "FILE:/abs/path/diagram.svg", "alt": "Request flow" } }
```

then run `npm run content:embed-images -- <document.json>`, which rewrites every
`FILE:` src into a `data:<mime>;base64,...` URI.

- **Diagrams / flows / architecture:** hand-author an `.svg` (clean, labelled,
  readable on light and dark backgrounds, ~640–900px wide). SVG is preferred —
  no dependencies and crisp at any size.
- **Data charts:** write a small `python3` + matplotlib script that saves a
  `.png`, then reference that file the same way.
- **At least one SVG diagram is REQUIRED in every document.** The architecture section (section 6) must always have one. Add additional diagrams wherever they aid understanding.
- Add visuals where they genuinely aid understanding (architecture, a
  multi-step flow, a comparison best shown graphically). The minimum is one per document — include more when useful.

Encoding rules:

- Use heading `level` 2 for top-level sections and `level` 3 for sub-parts. Do NOT use `level` 1 (the build splits the page at each level-1 heading; these documents use 2/3, matching siblings).
- Newlines/structure come from separate block nodes, never from `\n` inside a single `text` node or from literal Markdown characters.
- The first block should be a `paragraph` giving a high-level overview (not a heading repeating the topic title).
- Mirror the depth, tone, and node usage of the 2–3 sibling `document.json` files read during generation.
