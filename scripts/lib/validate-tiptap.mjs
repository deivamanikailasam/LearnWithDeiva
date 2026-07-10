/**
 * Shared TipTap `tiptap/v1` structural validator.
 *
 * Used by both the CLI gate (`scripts/validate-tiptap.mjs`) and the content
 * build (`scripts/gen-content.mjs`), so the dev-only audit surfaced in the app
 * matches exactly what the authoring loop enforces.
 *
 * `validateTiptapDocument` returns the *structural* errors only (bad nesting,
 * missing/forbidden content arrays, etc.). The "must contain an image" rule is
 * intentionally NOT part of `errors` — image presence is reported separately as
 * `imageCount` / `svgImageCount` so callers can treat structure and the visual
 * requirement as independent checks.
 */

const LIST_CONTAINER = new Set(['bulletList', 'orderedList'])
const TABLE_CONTAINER = new Set(['table', 'tableRow'])

const LEAF_NODES = new Set([
  'text',
  'horizontalRule',
  'blockMath',
  'inlineMath',
  'image',
  'hardBreak',
])

const CONTENT_REQUIRED = new Set([
  'paragraph',
  'heading',
  'listItem',
  'blockquote',
  'tableRow',
  'tableHeader',
  'tableCell',
  'bulletList',
  'orderedList',
])

/** True when an image `src` points at an SVG (inline data URI, FILE: placeholder, or URL). */
export function isSvgSrc(src) {
  if (typeof src !== 'string') return false
  const value = src.trim().toLowerCase()
  if (!value) return false
  if (value.startsWith('data:image/svg+xml')) return true
  // Strip any query string / fragment before checking the extension.
  const withoutQuery = value.split(/[?#]/)[0]
  return withoutQuery.endsWith('.svg')
}

function validateNode(node, path, parentType, ancestorTypes, errors) {
  if (!node || typeof node !== 'object') return
  const t = node.type
  if (!t) {
    errors.push(`  [${path}] node missing "type"`)
    return
  }

  const ancestors = [...ancestorTypes, parentType].filter(Boolean)

  if (t === 'blockMath' && parentType === 'paragraph') {
    errors.push(
      `  [${path}] blockMath cannot be nested inside paragraph (use it as a top-level block)`,
    )
  }

  if (t === 'inlineMath' && parentType !== 'paragraph') {
    errors.push(
      `  [${path}] inlineMath must be inside paragraph.content, not a ${parentType || 'top-level block'}`,
    )
  }

  if (t === 'horizontalRule') {
    const inList = ancestors.some((a) => LIST_CONTAINER.has(a) || a === 'listItem')
    const inTable = ancestors.some(
      (a) => TABLE_CONTAINER.has(a) || a === 'tableCell' || a === 'tableHeader',
    )
    if (inList) errors.push(`  [${path}] horizontalRule cannot be inside a list`)
    if (inTable) errors.push(`  [${path}] horizontalRule cannot be inside a table`)
  }

  if (t === 'heading' && ancestors.includes('listItem')) {
    errors.push(`  [${path}] heading cannot be nested inside a listItem`)
  }

  if (t === 'listItem') {
    const children = node.content || []
    if (children.length === 0) {
      errors.push(`  [${path}] listItem must have at least one child node`)
    } else {
      const hasParagraph = children.some((c) => c.type === 'paragraph')
      if (!hasParagraph) {
        errors.push(`  [${path}] listItem must contain at least one paragraph as a direct child`)
      }
      const rawText = children.filter((c) => c.type === 'text')
      if (rawText.length > 0) {
        errors.push(`  [${path}] listItem has raw text node(s) as direct children — wrap in paragraph`)
      }
    }
  }

  if (t === 'tableHeader' || t === 'tableCell') {
    const children = node.content || []
    if (children.length === 0) {
      errors.push(`  [${path}] ${t} must have at least one child paragraph`)
    } else {
      const rawText = children.filter((c) => c.type === 'text')
      if (rawText.length > 0) {
        errors.push(`  [${path}] ${t} has raw text node(s) as direct children — wrap in paragraph`)
      }
      const hasParagraph = children.some((c) => c.type === 'paragraph')
      if (!hasParagraph) {
        errors.push(`  [${path}] ${t} must contain at least one paragraph`)
      }
    }
  }

  if (LEAF_NODES.has(t) && node.content !== undefined) {
    errors.push(`  [${path}] ${t} is a leaf node and must not have a "content" property`)
  }

  if (CONTENT_REQUIRED.has(t)) {
    if (!Array.isArray(node.content) || node.content.length === 0) {
      errors.push(`  [${path}] ${t} must have a non-empty content array`)
    }
  }

  if (Array.isArray(node.content)) {
    node.content.forEach((child, i) => {
      validateNode(child, `${path}.content[${i}]`, t, ancestors, errors)
    })
  }
}

function collectImages(node, counts) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'image') {
    counts.imageCount += 1
    if (isSvgSrc(node.attrs?.src)) counts.svgImageCount += 1
  }
  if (Array.isArray(node.content)) {
    for (const child of node.content) collectImages(child, counts)
  }
}

/**
 * Validate a parsed `document.json` object (`{ format, doc }`).
 * Returns `{ errors, imageCount, svgImageCount }`. `errors` covers structure
 * only; image presence is reported via the counts.
 */
export function validateTiptapDocument(parsed) {
  const errors = []

  if (!parsed || typeof parsed !== 'object') {
    return { errors: ['  [root] document is not an object'], imageCount: 0, svgImageCount: 0 }
  }
  if (parsed.format !== 'tiptap/v1') {
    errors.push(`  [root] format must be "tiptap/v1", got "${parsed.format}"`)
  }
  if (!parsed.doc || parsed.doc.type !== 'doc') {
    errors.push('  [root] doc.doc must be a node with type "doc"')
  }

  const topContent = parsed.doc?.content || []
  topContent.forEach((node, i) => {
    validateNode(node, `doc.content[${i}]`, 'doc', [], errors)
  })

  const counts = { imageCount: 0, svgImageCount: 0 }
  collectImages(parsed.doc, counts)

  return { errors, imageCount: counts.imageCount, svgImageCount: counts.svgImageCount }
}
