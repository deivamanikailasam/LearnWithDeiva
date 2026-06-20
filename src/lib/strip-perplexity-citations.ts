/** Perplexity Space footnotes: [file:1], [doc:3], [web:341], [source:12] */
const SPACE_CITATION_RE = /\[(?:file|doc|source|citation|web):\s*[\w-]+\]/gi

/** Perplexity answer footnotes: [1], [2][3] */
const INLINE_NUMERIC_CITATION_RE = /\s*\[\d+\]/g

/**
 * Perplexity inline source tags copied as plain brackets, e.g.
 * [docs.omnifact], [platform.claude], [aguidetocloud]
 */
const NAMED_BRACKET_CITATION_RE = /(?:\s+|(?<=\S))\[([^\]]+)\](?!\()/g

/** Perplexity source links copied as markdown: [docs.omnifact](https://…) */
const MARKDOWN_SOURCE_LINK_RE = /(?:\s+|(?<=\S))\[([^\]]+)\]\([^)]*\)/g

/** Common short Perplexity source labels (platform/site names). */
const SHORT_CITATION_SOURCES = new Set([
  'youtube',
  'reddit',
  'github',
  'medium',
  'arxiv',
  'wikipedia',
  'wiki',
  'twitter',
  'x',
  'linkedin',
  'facebook',
  'instagram',
  'tiktok',
  'vimeo',
  'quora',
  'substack',
  'notion',
  'google',
  'bing',
  'openai',
  'anthropic',
  'claude',
  'chatgpt',
  'perplexity',
  'huggingface',
  'mdn',
  'mozilla',
  'npm',
  'stackoverflow',
  'stackexchange',
  'devto',
  'hackernews',
  'hbr',
  'hn',
  'aws',
  'azure',
  'gcp',
  'docker',
  'kubernetes',
  'vercel',
  'netlify',
  'digitalocean',
  'baeldung',
  'geeksforgeeks',
  'w3schools',
  'freecodecamp',
  'towardsdatascience',
  'kaggle',
  'coursera',
  'udemy',
  'edx',
  'khanacademy',
  'nature',
  'ieee',
  'acm',
  'springer',
  'pubmed',
  'scholar',
  'researchgate',
  'doi',
  'pdf',
  'web',
  'blog',
  'news',
  'docs',
  'dev',
  'ibm',
  'orq'
])

/** Slug/domain-shaped ids Perplexity uses for inline source tags. */
export function looksLikePerplexitySourceId(label: string): boolean {
  const t = label.trim().toLowerCase()
  if (!t || /\s/.test(t)) return false
  if (/^(?:file|doc|source|citation|web):\d+$/.test(t)) return true
  if (/^(?:file|doc|source|citation|web):[\w-]+$/.test(t)) return true
  if (/^\d+$/.test(t)) return true
  if (SHORT_CITATION_SOURCES.has(t)) return true
  // domain-like: docs.omnifact, platform.claude, promptengineering.pdxdev
  if (/^[a-z][\w-]*(?:\.[a-z][\w.-]+)+$/.test(t)) return true
  // short platform slug: youtube, reddit, arxiv (4+ chars, lowercase)
  if (/^[a-z][a-z0-9.-]{3,39}$/.test(t)) return true
  return false
}

function isCitationHref(href: string, label: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false
  const t = label.trim().toLowerCase()
  if (!t || /\s/.test(t)) return false
  try {
    const host = new URL(href).hostname.replace(/^www\./, '').toLowerCase()
    const hostRoot = host.split('.')[0] ?? host
    if (host.includes(t) || t.includes(hostRoot)) return true
    if (looksLikePerplexitySourceId(t)) return true
  } catch {
    return looksLikePerplexitySourceId(t)
  }
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
    const href = anchor.getAttribute('href') ?? ''
    if (looksLikePerplexitySourceId(label) || isCitationHref(href, label)) {
      anchor.remove()
    }
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
