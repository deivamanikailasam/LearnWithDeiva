/** Perplexity Space footnotes: [file:1], [doc:3], [source:12], [citation:7] */
const SPACE_CITATION_RE = /\[(?:file|doc|source|citation):\s*\d+\]/gi

/** Perplexity answer footnotes: [1], [2][3] */
const INLINE_NUMERIC_CITATION_RE = /\s*\[\d+\]/g

/**
 * Perplexity inline source tags copied as plain brackets, e.g.
 * [docs.omnifact], [platform.claude], [aguidetocloud]
 */
const NAMED_BRACKET_CITATION_RE = /(?:\s+|(?<=\S))\[([^\]]+)\](?!\()/g

/** Perplexity source links copied as markdown: [docs.omnifact](https://…) */
const MARKDOWN_SOURCE_LINK_RE = /(?:\s+|(?<=\S))\[([^\]]+)\]\([^)]*\)/g

/** Slug/domain-shaped ids Perplexity uses for inline source tags. */
export function looksLikePerplexitySourceId(label: string): boolean {
  const t = label.trim().toLowerCase()
  if (!t || /\s/.test(t)) return false
  if (/^(?:file|doc|source|citation):\d+$/.test(t)) return true
  if (/^\d+$/.test(t)) return true
  // domain-like: docs.omnifact, platform.claude, promptengineering.pdxdev
  if (/^[a-z][\w-]*(?:\.[a-z][\w.-]+)+$/.test(t)) return true
  // long slug without spaces: aguidetocloud, gguidetocloud
  if (/^[a-z][\w-]{7,}$/.test(t)) return true
  return false
}

function replaceNamedCitation(match: string, label: string): string {
  return looksLikePerplexitySourceId(label) ? '' : match
}

function tidyCitationSpacing(text: string): string {
  return text
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/ {2,}/g, ' ')
    .trimEnd()
}

/**
 * Remove Perplexity inline citation markers from a line of text.
 * Leaves real markdown links like [Read more](https://example.com) untouched.
 */
export function stripPerplexityInlineCitations(text: string): string {
  let out = text
    .replace(SPACE_CITATION_RE, '')
    .replace(INLINE_NUMERIC_CITATION_RE, '')
    .replace(MARKDOWN_SOURCE_LINK_RE, (match, label: string) =>
      replaceNamedCitation(match, label),
    )
    .replace(NAMED_BRACKET_CITATION_RE, (match, label: string) =>
      replaceNamedCitation(match, label),
    )

  return tidyCitationSpacing(out)
}

/** Drop trailing source-list blocks Perplexity appends to copied answers. */
export function stripTrailingPerplexitySources(text: string): string {
  const normalized = text.replace(/\r\n/g, '\n')

  const withHeaderRemoved = normalized.replace(
    /\n+(?:#{1,3}\s*)?(?:Sources|References|Citations|Footnotes)\s*:?\s*\n[\s\S]*$/i,
    '',
  )

  const lines = withHeaderRemoved.split('\n')
  let cut = lines.length

  for (let i = lines.length - 1; i >= 0; i--) {
    const trimmed = lines[i].trim()
    if (!trimmed) {
      cut = i
      continue
    }
    if (/^\[\d+\]\s+\S/.test(trimmed)) {
      cut = i
      continue
    }
    if (/^\[[^\]]+\]\s+https?:\/\//i.test(trimmed)) {
      cut = i
      continue
    }
    if (/^\d+\.\s+https?:\/\//i.test(trimmed)) {
      cut = i
      continue
    }
    break
  }

  return lines.slice(0, cut).join('\n').replace(/\n+$/, '')
}

/** Full cleanup for a pasted Perplexity plain-text blob. */
export function stripPerplexityCitations(text: string): string {
  return stripTrailingPerplexitySources(text)
}

function removeCitationAnchors(doc: Document): void {
  for (const anchor of [...doc.querySelectorAll('a')]) {
    if (anchor.closest('pre, code')) continue
    const label = (anchor.textContent ?? '').trim()
    if (!looksLikePerplexitySourceId(label)) continue
    anchor.remove()
  }
}

/** Walk pasted HTML and strip citation markers from text nodes and links. */
export function stripCitationsFromHtml(html: string): string {
  if (!html.trim()) return html
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    removeCitationAnchors(doc)
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
    let node: Node | null
    while ((node = walker.nextNode())) {
      const parent = node.parentElement
      if (parent?.closest('pre, code')) continue
      node.textContent = stripPerplexityInlineCitations(node.textContent ?? '')
    }
    return doc.body.innerHTML
  } catch {
    return html
  }
}
