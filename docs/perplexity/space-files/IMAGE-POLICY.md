# IMAGE-POLICY — when (and how) to emit `images.json`

You CANNOT write image files into the repo. The app loads images from
`public/content-assets/<subject>/<subsubtopicId>/<file>.png`, and the user
fulfils those files manually after each batch. Be conservative.

---

## 1. Default: do NOT emit `images.json`

For almost every sub-subtopic in this project, images are either:

- **Replaceable by a Mermaid `diagrams.json` entry** — use it. Mermaid handles
  flowcharts, sequence diagrams, class diagrams, state machines, ERDs, mindmaps,
  timelines, journeys, gantt and pie out of the box, and the app renders them
  with the platform theme so they look right in light AND dark mode.
- **Replaceable by a data `charts.json` entry** — use it. The chart component
  handles `bar`, `line`, `pie`, and `area` from raw data; you do not need to
  ship an image of a chart.

If a Mermaid diagram or a data chart can convey the idea, **emit one of those
instead** and leave `images.json` out. Do not duplicate.

## 2. Emit `images.json` only when ALL of the following are true

1. The visual content is **irreducible to Mermaid or a data chart** — for
   example, a screenshot of a real UI, a photo of physical hardware, an
   anatomical illustration, a published diagram you cannot rebuild faithfully
   in Mermaid.
2. The image is **genuinely educational**, not decorative. A header banner or
   stock photo never qualifies.
3. The user has a reasonable way to fulfil it — either with a public-domain /
   CC-licensed source you can cite, or by generating one from a clear prompt
   you provide.

If any of those is false, drop the image and either use Mermaid/charts or
explain the idea in prose.

## 3. When you DO emit `images.json`

For every entry in `images.json`, you MUST also include a matching entry in
the manifest's `imageTasks` array. Counts must match exactly.

### `images.json` entry shape

```json
{
  "src": "content-assets/<subject>/<subsubtopicId>/<descriptive-filename>.png",
  "alt": "Detailed, accurate, screen-reader-friendly description of what is in the image.",
  "caption": "Short caption shown under the image in the UI."
}
```

- `src` is always a path **relative to `public/`** starting with
  `content-assets/`. Never an external URL. Never a file outside the
  sub-subtopic folder.
- `alt` must describe the image's content accurately — assume the reader cannot
  see it. This is also what the apply-script lints against the `imageTasks`
  entry.
- `caption` is optional but recommended.

### `imageTasks` entry shape (in the manifest, not in `images.json`)

```json
{
  "src": "content-assets/<subject>/<subsubtopicId>/<descriptive-filename>.png",
  "alt": "Same alt text as in images.json.",
  "prompt": "A clear directive describing what the image should look like. For generated images: an image-gen prompt. For sourced images: a description of what to look for and any framing/cropping needed.",
  "suggestedSources": [
    "https://commons.wikimedia.org/wiki/...",
    "https://docs.example.com/page-with-original-diagram"
  ]
}
```

- `prompt` is mandatory. Be specific: subject, framing, style, colour treatment,
  any text overlays, any constraints (e.g. "no logos", "neutral background").
- `suggestedSources` is optional. Only include URLs you are reasonably
  confident exist; do not invent URLs. Prefer:
  - Wikimedia Commons (CC / public domain)
  - Official project docs (when the licence permits embedding)
  - Public-domain government / academic sources
- Do NOT suggest paywalled, copyrighted, or unclear-licence sources.

## 4. Filename convention

Use lowercase, hyphen-separated, descriptive names. Match the topic.

Good:
- `content-assets/gen-ai/jupyter-notebooks--cells-and-kernels/notebook-anatomy.png`
- `content-assets/gen-ai/deep-learning--attention/attention-heads-diagram.svg`

Bad:
- `content-assets/.../IMG_1234.png` (not descriptive)
- `content-assets/.../banner.jpg` (decorative)
- `https://cdn.example.com/...png` (external URL — not allowed)

## 5. After the batch

The apply script will write `images.json` to disk but the file path in `src`
will not resolve until the user drops a real image at
`public/<src>`. The apply script prints the full `imageTasks` list at the end
of a successful apply so you (the human) can fulfil them.

If you generate or source images later, save them at the exact path you
declared in `src`. The host app will pick them up on the next `npm run build`.

## 6. Quick decision tree

```
need to visualise something?
├── can Mermaid represent it? → use diagrams.json
├── is it quantitative/comparison? → use charts.json
├── is it a screenshot / photo / irreplaceable illustration?
│   ├── do you have a clear prompt or trustworthy source? → emit images.json + imageTasks
│   └── otherwise → describe in prose, skip image
└── otherwise → skip
```
