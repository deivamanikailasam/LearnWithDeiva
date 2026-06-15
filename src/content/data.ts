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
import type {
  Difficulty,
  LevelRange,
  Subject,
  SubjectExtraKey,
  SubjectExtras,
  SubjectExtrasManifest,
  SubjectIndexEntry,
  Topic,
  TopicSections,
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

const sectionsCache = new Map<string, Promise<TopicSections>>()

/** The heavy section bodies for a single topic. Cached per topic. */
export function loadTopicSections(
  subjectId: string,
  topicId: string,
): Promise<TopicSections> {
  const key = `${subjectId}::${topicId}`
  let p = sectionsCache.get(key)
  if (!p) {
    p = fetchJson<TopicSections>(
      dataUrl(`subjects/${subjectId}/sections/${topicId}.json`),
    ).catch(() => ({}) as TopicSections)
    sectionsCache.set(key, p)
  }
  return p
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
