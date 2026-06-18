/**
 * Async content data layer.
 *
 * Replaces the old eager `import.meta.glob` registry. Content is fetched on
 * demand from the prebuilt artifacts in `public/data/` (produced by
 * `scripts/gen-content.mjs`) and cached in memory, so:
 *
 *   - the initial bundle no longer contains any topic data;
 *   - listing pages load a ~7 KB index instead of the whole corpus;
 *   - a subject's topic tree loads only when that subject is opened;
 *   - a topic's heavy section bodies load only when that topic is opened.
 *
 * All fetch helpers de-dupe in-flight requests and cache results for the
 * lifetime of the page.
 */
import type { DocumentData } from '../types/rich-document'
import {
  isTopicDocument,
  type TopicDocument,
} from '../types/tiptap-document'
import type {
  Difficulty,
  LevelRange,
  Subject,
  SubjectExtraKey,
  SubjectExtras,
  SubjectExtrasManifest,
  SubjectIndexEntry,
  Topic,
} from '../types/content'

const BASE = import.meta.env.BASE_URL
const dataUrl = (p: string) => `${BASE}data/${p}`

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`)
  return (await res.json()) as T
}

/* ----------------------------- subject index ---------------------------- */

let indexPromise: Promise<SubjectIndexEntry[]> | null = null

/** The lightweight list of all subjects (no topic trees). Cached. */
export function loadSubjectIndex(): Promise<SubjectIndexEntry[]> {
  if (!indexPromise) {
    indexPromise = fetchJson<{ subjects: SubjectIndexEntry[] }>(
      dataUrl('index.json'),
    ).then((d) => d.subjects)
  }
  return indexPromise
}

export async function loadSubjectIndexEntry(
  id: string,
): Promise<SubjectIndexEntry | undefined> {
  return (await loadSubjectIndex()).find((s) => s.id === id)
}

/* ------------------------------- subjects -------------------------------- */

const subjectCache = new Map<string, Promise<Subject | undefined>>()

/** One subject's full topic tree (metadata only). Cached per subject. */
export function loadSubject(id: string): Promise<Subject | undefined> {
  let p = subjectCache.get(id)
  if (!p) {
    p = fetchJson<Subject>(dataUrl(`subjects/${id}.json`))
      .then((s) => {
        indexSubject(s)
        return s
      })
      .catch(() => undefined)
    subjectCache.set(id, p)
  }
  return p
}

/* --------------------------- per-topic sections -------------------------- */

const sectionsCache = new Map<
  string,
  Promise<DocumentData | TopicDocument | undefined>
>()

export type TopicBody =
  | { format: 'tiptap/v1'; document: TopicDocument }
  | { format: 'blocks'; document: DocumentData }

/** Raw section body JSON for a single topic (TipTap or legacy blocks). Cached. */
export function loadTopicSections(
  subjectId: string,
  topicId: string,
): Promise<DocumentData | TopicDocument | undefined> {
  const key = `${subjectId}::${topicId}`
  let p = sectionsCache.get(key)
  if (!p) {
    p = fetchJson<DocumentData | TopicDocument>(
      dataUrl(`subjects/${subjectId}/sections/${topicId}.json`),
    ).catch(() => undefined)
    sectionsCache.set(key, p)
  }
  return p
}

/** Drop cached subject tree after a dev metadata save. */
export function invalidateSubjectCache(id: string): void {
  subjectCache.delete(id)
}

/** Drop cached section body after a dev save so the next read is fresh. */
export function invalidateTopicDocumentCache(
  subjectId: string,
  topicId: string,
): void {
  sectionsCache.delete(`${subjectId}::${topicId}`)
}

/** Seed cache with a freshly saved document (avoids reload after dev save). */
export function primeTopicDocumentCache(
  subjectId: string,
  topicId: string,
  document: TopicDocument,
): void {
  const key = `${subjectId}::${topicId}`
  sectionsCache.set(key, Promise.resolve(document))
}

/** Normalized topic body with a format discriminator. */
export async function loadTopicBody(
  subjectId: string,
  topicId: string,
): Promise<TopicBody | undefined> {
  const raw = await loadTopicSections(subjectId, topicId)
  if (!raw) return undefined
  if (isTopicDocument(raw)) {
    return { format: 'tiptap/v1', document: raw }
  }
  return { format: 'blocks', document: raw }
}

/* --------------------------- per-subject extras -------------------------- */

const extrasManifestCache = new Map<string, Promise<SubjectExtrasManifest>>()
const extraCache = new Map<string, Promise<SubjectExtras[SubjectExtraKey]>>()

/**
 * The tiny counts manifest for a subject's extras (interview / scenarios /
 * case studies / projects / quiz). Cheap to load on every subject page — it
 * carries only item counts, not the (potentially large) bodies. Cached.
 */
export function loadSubjectExtrasManifest(
  id: string,
): Promise<SubjectExtrasManifest> {
  let p = extrasManifestCache.get(id)
  if (!p) {
    p = fetchJson<SubjectExtrasManifest>(dataUrl(`subjects/${id}/extras.json`))
      .then((m) => ({ counts: m.counts ?? {} }))
      .catch(() => ({ counts: {} }))
    extrasManifestCache.set(id, p)
  }
  return p
}

/**
 * One category of a subject's extras, loaded only when its tab is opened so a
 * large interview/quiz bank never blocks the rest of the page. Cached per
 * `(subject, category)`; a missing file resolves to an empty section.
 */
export function loadSubjectExtra(
  id: string,
  key: SubjectExtraKey,
): Promise<SubjectExtras[SubjectExtraKey]> {
  const cacheKey = `${id}::${key}`
  let p = extraCache.get(cacheKey)
  if (!p) {
    p = fetchJson<NonNullable<SubjectExtras[SubjectExtraKey]>>(
      dataUrl(`subjects/${id}/extras/${key}.json`),
    ).catch(() => ({ items: [] }) as NonNullable<SubjectExtras[SubjectExtraKey]>)
    extraCache.set(cacheKey, p)
  }
  return p
}

/* ------------------- per-subject tree indexes & helpers ------------------ */

interface SubjectTopicIndex {
  byId: Map<string, Topic>
  /** Root → … → direct parent chain for each topic id (excludes the topic). */
  ancestors: Map<string, Topic[]>
  /** Flattened depth-first list (roots then their subtrees). */
  flat: Topic[]
}

const indexBySubject = new WeakMap<Subject, SubjectTopicIndex>()

/** Build (once) the O(1) lookup indexes for a loaded subject's topic tree. */
function indexSubject(subject: Subject): SubjectTopicIndex {
  const existing = indexBySubject.get(subject)
  if (existing) return existing

  const byId = new Map<string, Topic>()
  const ancestors = new Map<string, Topic[]>()
  const flat: Topic[] = []
  const walk = (topics: Topic[], chain: Topic[]) => {
    for (const t of topics) {
      byId.set(t.id, t)
      ancestors.set(t.id, chain)
      flat.push(t)
      if (t.subtopics.length) walk(t.subtopics, [...chain, t])
    }
  }
  walk(subject.topics, [])

  const idx = { byId, ancestors, flat }
  indexBySubject.set(subject, idx)
  return idx
}

/** Flatten a loaded subject's topic tree (roots + all subtopics). */
export function flattenTopics(subject: Subject): Topic[] {
  return indexSubject(subject).flat
}

/** Resolve a topic within an already-loaded subject. */
export function findTopic(subject: Subject, topicId: string): Topic | undefined {
  return indexSubject(subject).byId.get(topicId)
}

/** Root → … → direct parent chain for a topic (empty for top-level topics). */
export function getAncestors(subject: Subject, topicId: string): Topic[] {
  return indexSubject(subject).ancestors.get(topicId) ?? []
}

/* ----------------------- progress cascade helpers ----------------------- */

/** Every topic id at or below `topic`, preorder (self first). */
export function collectSubtreeIds(topic: Topic): string[] {
  const out: string[] = [topic.id]
  for (const sub of topic.subtopics) out.push(...collectSubtreeIds(sub))
  return out
}

/**
 * Compute the set of `subjectId::topicId` keys that should be added to and
 * removed from the completed map when toggling a topic's completion, so that:
 *   • All descendants follow the new state (cascade down).
 *   • Ancestors auto-complete when *all* of their direct subtopics are now
 *     complete; on uncomplete, every ancestor is uncompleted (since one of
 *     their descendants is now incomplete).
 *
 * Pure / side-effect free — caller decides how to apply the plan.
 */
export function planCompletionCascade(
  subject: Subject,
  topic: Topic,
  complete: boolean,
  isComplete: (topicId: string) => boolean,
): { addKeys: string[]; removeKeys: string[] } {
  const subjectId = subject.id
  const subtreeIds = collectSubtreeIds(topic)
  const addKeys: string[] = []
  const removeKeys: string[] = []
  for (const id of subtreeIds) {
    ;(complete ? addKeys : removeKeys).push(`${subjectId}::${id}`)
  }

  const ancestors = getAncestors(subject, topic.id)
  if (complete) {
    // Walk closest → furthest. Auto-mark only while every direct child of the
    // ancestor is complete (already, or as part of this cascade). Stop at the
    // first ancestor with an incomplete child.
    const projected = new Set<string>(subtreeIds)
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const anc = ancestors[i]
      const allDone = anc.subtopics.every(
        (sub) => projected.has(sub.id) || isComplete(sub.id),
      )
      if (!allDone) break
      addKeys.push(`${subjectId}::${anc.id}`)
      projected.add(anc.id)
    }
  } else {
    for (const anc of ancestors) {
      removeKeys.push(`${subjectId}::${anc.id}`)
    }
  }

  return { addKeys, removeKeys }
}

const LEVEL_ORDER: Record<Difficulty, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
}
const LEVEL_BY_ORDER: Difficulty[] = ['beginner', 'intermediate', 'advanced']

/** Difficulty span across a loaded subject's topics. */
export function subjectLevelRange(subject: Subject): LevelRange {
  if (subject.levelRange) return subject.levelRange
  let min = LEVEL_ORDER.advanced
  let max = LEVEL_ORDER.beginner
  for (const t of flattenTopics(subject)) {
    const o = LEVEL_ORDER[t.level]
    if (o < min) min = o
    if (o > max) max = o
  }
  if (min > max) return { min: subject.level, max: subject.level }
  return { min: LEVEL_BY_ORDER[min], max: LEVEL_BY_ORDER[max] }
}

/* ----------------------- resolving stored topic keys --------------------- */

export interface ResolvedTopic {
  key: string
  subject: Subject
  topic: Topic
  /** Root → … → direct parent, for showing the full path. */
  ancestors: Topic[]
}

/**
 * Resolve a set of `subjectId::topicId` keys (bookmarks / completed) into full
 * topic objects, loading only the subjects those keys reference.
 */
export async function resolveTopicKeys(
  keys: Iterable<string>,
): Promise<ResolvedTopic[]> {
  const all = [...keys]
  const subjectIds = new Set<string>()
  for (const key of all) {
    const sep = key.indexOf('::')
    if (sep !== -1) subjectIds.add(key.slice(0, sep))
  }

  const subjects = new Map<string, Subject>()
  await Promise.all(
    [...subjectIds].map(async (id) => {
      const s = await loadSubject(id)
      if (s) subjects.set(id, s)
    }),
  )

  const out: ResolvedTopic[] = []
  for (const key of all) {
    const sep = key.indexOf('::')
    if (sep === -1) continue
    const subjectId = key.slice(0, sep)
    const topicId = key.slice(sep + 2)
    const subject = subjects.get(subjectId)
    if (!subject) continue
    const topic = findTopic(subject, topicId)
    if (!topic) continue
    out.push({ key, subject, topic, ancestors: getAncestors(subject, topicId) })
  }
  return out
}
