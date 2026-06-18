import type { JSONContent } from '@tiptap/core'
import { tiptapNodeToPlain } from './tiptap-plain'

export interface TiptapSection {
  id: string
  /** `null` for content before the first H1 (intro). */
  title: string | null
  doc: JSONContent
}

function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return slug || 'section'
}

/** Split a TipTap document into sections at each level-1 heading node. */
export function splitTiptapByH1(fullDoc: JSONContent): TiptapSection[] {
  const nodes = fullDoc.content ?? []
  const sections: TiptapSection[] = []
  let currentNodes: JSONContent[] = []
  let currentTitle: string | null = null
  let currentId = 'intro'
  const usedIds = new Set<string>()

  const flush = () => {
    if (currentNodes.length === 0 && currentTitle === null) return
    let id = currentId
    let n = 1
    while (usedIds.has(id)) {
      id = `${currentId}-${n++}`
    }
    usedIds.add(id)
    sections.push({
      id,
      title: currentTitle,
      doc: { type: 'doc', content: currentNodes },
    })
    currentNodes = []
  }

  for (const node of nodes) {
    if (node.type === 'heading' && node.attrs?.level === 1) {
      flush()
      currentTitle = tiptapNodeToPlain(node)
      currentId = slugify(currentTitle)
      continue
    }
    currentNodes.push(node)
  }

  flush()
  return sections
}

export function sectionNavLabel(title: string | null): string {
  return title ?? 'Overview'
}

/** Section list for topic page side nav. */
export function getTiptapSectionNav(doc: JSONContent) {
  return splitTiptapByH1(doc).map((s) => ({
    id: s.id,
    title: sectionNavLabel(s.title),
  }))
}
