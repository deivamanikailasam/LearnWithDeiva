import Fuse from 'fuse.js'
import type { FuseResult } from 'fuse.js'

/**
 * One entry in the global glossary. Aggregated at build time from every
 * subject-level `glossary.json` and every topic-level "synonyms" section, with
 * a back-link to the source so a reader can jump to the full context.
 */
export interface GlossaryEntry {
  id: string
  term: string
  definition: string
  subjectId: string
  subjectTitle: string
  subjectIcon: string
  topicId?: string
  topicTitle?: string
  source: 'subject' | 'topic'
  url: string
}

const BASE = import.meta.env.BASE_URL

let termsPromise: Promise<GlossaryEntry[]> | null = null
let fusePromise: Promise<Fuse<GlossaryEntry>> | null = null

/**
 * Fetch the prebuilt, alphabetically-sorted glossary once. A missing artifact
 * (no terms authored yet) resolves to an empty list rather than throwing.
 */
export function loadGlossary(): Promise<GlossaryEntry[]> {
  if (!termsPromise) {
    termsPromise = fetch(`${BASE}data/glossary.json`)
      .then((res) =>
        res.ok
          ? (res.json() as Promise<{ terms: GlossaryEntry[] }>)
          : { terms: [] },
      )
      .then((d) => d.terms ?? [])
      .catch(() => [])
  }
  return termsPromise
}

/** Build (once) a Fuse index over the glossary for fuzzy term/definition search. */
function loadFuse(): Promise<Fuse<GlossaryEntry>> {
  if (!fusePromise) {
    fusePromise = loadGlossary().then(
      (terms) =>
        new Fuse(terms, {
          includeScore: true,
          threshold: 0.34,
          ignoreLocation: true,
          minMatchCharLength: 2,
          keys: [
            { name: 'term', weight: 0.7 },
            { name: 'definition', weight: 0.3 },
            { name: 'subjectTitle', weight: 0.1 },
          ],
        }),
    )
  }
  return fusePromise
}

/**
 * Fuzzy-search the glossary. An empty query returns the full (alphabetical)
 * list so callers can use this as the single source of filtered entries.
 */
export async function searchGlossary(query: string): Promise<GlossaryEntry[]> {
  const q = query.trim()
  if (!q) return loadGlossary()
  const fuse = await loadFuse()
  return (fuse.search(q) as FuseResult<GlossaryEntry>[]).map((r) => r.item)
}
