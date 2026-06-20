import type { JSONContent } from '@tiptap/core'

export interface InlineGlossaryTerm {
  term: string
  definition: string
}

export function normalizeGlossaryTerm(term: string): string {
  return term.trim().toLowerCase()
}

export function normalizeGlossaryDefinition(definition: string): string {
  return definition.trim().replace(/\s+/g, ' ')
}

export function glossaryTermsMatch(
  a: Pick<InlineGlossaryTerm, 'term' | 'definition'>,
  b: Pick<InlineGlossaryTerm, 'term' | 'definition'>,
): boolean {
  return (
    normalizeGlossaryTerm(a.term) === normalizeGlossaryTerm(b.term) &&
    normalizeGlossaryDefinition(a.definition) === normalizeGlossaryDefinition(b.definition)
  )
}

/** Walk a TipTap JSON doc and collect inline glossary term usages. */
export function extractGlossaryTermsFromTiptap(doc: JSONContent | null | undefined): InlineGlossaryTerm[] {
  const out: InlineGlossaryTerm[] = []
  if (!doc || typeof doc !== 'object') return out

  function walk(node: JSONContent) {
    if (node.type === 'text' && typeof node.text === 'string' && Array.isArray(node.marks)) {
      const mark = node.marks.find((m) => m.type === 'glossaryTerm')
      const definition = mark?.attrs?.definition
      if (typeof definition === 'string' && definition.trim()) {
        out.push({ term: node.text.trim(), definition: definition.trim() })
      }
    }
    if (Array.isArray(node.content)) {
      for (const child of node.content) walk(child)
    }
  }

  walk(doc)
  return out
}

/** Count how many times a term+definition pair appears in one document. */
export function countTermUsageInDocument(
  doc: JSONContent,
  term: string,
  definition: string,
): number {
  const key = `${normalizeGlossaryTerm(term)}|${normalizeGlossaryDefinition(definition)}`
  return extractGlossaryTermsFromTiptap(doc).filter(
    (entry) =>
      `${normalizeGlossaryTerm(entry.term)}|${normalizeGlossaryDefinition(entry.definition)}` === key,
  ).length
}
