import Fuse from 'fuse.js'
import type { FuseResult } from 'fuse.js'
import type { SectionKey } from '../types/content'

export type SearchDocType = 'subject' | 'topic' | 'section'

export interface SearchDoc {
  id: string
  type: SearchDocType
  subjectId: string
  subjectTitle: string
  topicId?: string
  topicTitle?: string
  sectionKey?: SectionKey
  sectionLabel?: string
  title: string
  text: string
  tags: string[]
  url: string
}

const BASE = import.meta.env.BASE_URL

/**
 * Lazily fetch the prebuilt search document list and build the Fuse index.
 * Cached so the (multi-MB) payload and index are created at most once, and only
 * when the user actually searches.
 */
let fusePromise: Promise<Fuse<SearchDoc>> | null = null

function loadFuse(): Promise<Fuse<SearchDoc>> {
  if (!fusePromise) {
    fusePromise = fetch(`${BASE}data/search.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load search index (${res.status})`)
        return res.json() as Promise<SearchDoc[]>
      })
      .then(
        (docs) =>
          new Fuse(docs, {
            includeScore: true,
            threshold: 0.38,
            ignoreLocation: true,
            minMatchCharLength: 2,
            keys: [
              { name: 'title', weight: 0.5 },
              { name: 'tags', weight: 0.2 },
              { name: 'topicTitle', weight: 0.15 },
              { name: 'subjectTitle', weight: 0.1 },
              { name: 'text', weight: 0.25 },
            ],
          }),
      )
  }
  return fusePromise
}

export interface SearchOptions {
  limit?: number
  subjectId?: string
  types?: SearchDocType[]
}

/** Run a query against the (lazily loaded) search index. */
export async function searchContent(
  query: string,
  options: SearchOptions = {},
): Promise<SearchDoc[]> {
  const q = query.trim()
  if (!q) return []
  const fuse = await loadFuse()
  let results: FuseResult<SearchDoc>[] = fuse.search(q)
  if (options.subjectId) {
    results = results.filter((r) => r.item.subjectId === options.subjectId)
  }
  if (options.types?.length) {
    results = results.filter((r) => options.types!.includes(r.item.type))
  }
  const items = results.map((r) => r.item)
  return options.limit ? items.slice(0, options.limit) : items
}
