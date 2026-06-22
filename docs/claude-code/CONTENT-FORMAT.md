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

- Maximize useful detail, not empty length.
- Explain the topic thoroughly, from fundamentals to advanced points when relevant.
- Cover all major sub-points needed to properly understand the topic.
- Prefer complete coverage over concise summaries; do not stop at a short summary if more useful detail can be added.
- Avoid filler, repetition, and generic statements; every paragraph must add new value.
- Use clear section headings and structured formatting so long content stays readable.
- When the topic is broad, break it into logical parts and explain each part thoroughly.
- Include step-by-step guidance, comparisons, and real-world examples when helpful.
- Lead with the most important sections in full detail, then continue with the remaining sections as far as possible.
- Never intentionally shorten the content.

## Content structure

Organize the document into clearly labeled sections using headings. When
relevant and helpful, cover these aspects (omit sections clearly not
applicable):

1. What it is — definition and brief context
2. Why it matters — purpose, importance, and problems it solves
3. Benefits — key advantages and positive outcomes
4. Trade-offs — limitations, downsides, and costs
5. How it works — core mechanics, architecture, or workflow
6. When to use it — typical scenarios, and when *not* to use it
7. How to implement — practical, step-by-step guidance
8. Examples — simple, illustrative examples
9. Real-world example — production usage or realistic scenario (mention scale, constraints, architecture when appropriate)
10. Common mistakes — pitfalls, misconceptions, and anti-patterns
11. Best practices — practical recommendations and optimization tips
12. Performance & scalability — behavior under load, bottlenecks, and scaling strategies
13. Tooling & ecosystem — relevant tools, frameworks, and platforms
14. Comparison with alternatives — concise comparison to related approaches
15. Security & reliability — risks, failure modes, and mitigations
16. Mental model — an intuitive way to think about the concept

For conceptual topics, also include:

- Key takeaways — 3–7 concise bullets summarizing the most important points.

If the topic is narrow or simple, group multiple related aspects into the same
section and prioritize clarity over exhaustiveness.

## Style and formatting

- Do NOT mention the query title, page title, or topic name in the very first line. Start with a short, high-level overview sentence instead.
- Do NOT end with a question or a call for follow-up. Finish with a declarative sentence (the Key takeaways list is an acceptable ending).
- Use concise paragraphs; avoid unnecessary verbosity, but do not sacrifice depth for brevity.
- Use bullet lists sparingly, only when they clearly improve readability.
- Use code blocks for code or configuration snippets, with language tags where appropriate.

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

Encoding rules:

- Use heading `level` 2 for top-level sections and `level` 3 for sub-parts. Do NOT use `level` 1 (the build splits the page at each level-1 heading; these documents use 2/3, matching siblings).
- Newlines/structure come from separate block nodes, never from `\n` inside a single `text` node or from literal Markdown characters.
- The first block should be a `paragraph` giving a high-level overview (not a heading repeating the topic title).
- Mirror the depth, tone, and node usage of the 2–3 sibling `document.json` files read during generation.
