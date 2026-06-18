import type { Block, DocumentData, RichText } from '../types/rich-document'

export function richTextToPlain(content: RichText[]): string {
  return content.map((n) => n.text).join('')
}

export interface DocumentSection {
  id: string
  /** `null` for content before the first heading (intro). */
  title: string | null
  blocks: Block[]
}

function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return slug || 'section'
}

/** Split a document into sections at each level-1 `heading` block. Skips `title` blocks. */
export function splitDocumentByHeading(data: DocumentData): DocumentSection[] {
  const sections: DocumentSection[] = []
  let currentBlocks: Block[] = []
  let currentTitle: string | null = null
  let currentId = 'intro'
  const usedIds = new Set<string>()

  const flush = () => {
    if (currentBlocks.length === 0 && currentTitle === null) return
    let id = currentId
    let n = 1
    while (usedIds.has(id)) {
      id = `${currentId}-${n++}`
    }
    usedIds.add(id)
    sections.push({ id, title: currentTitle, blocks: currentBlocks })
    currentBlocks = []
  }

  for (const block of data.blocks) {
    if (block.type === 'title') continue

    if (block.type === 'heading' && block.level === 1) {
      flush()
      currentTitle = richTextToPlain(block.content)
      currentId = slugify(currentTitle)
      continue
    }

    currentBlocks.push(block)
  }

  flush()
  return sections
}
