/**
 * Content registry.
 *
 * Uses Vite's `import.meta.glob` to eagerly discover every data file under
 * `src/content/subjects/**`. Authors only ever add JSON files in the right
 * folder — no code change is needed to register a new subject, topic or
 * section. This module stitches those files into the assembled `Subject`
 * tree consumed by the rest of the app.
 */
import type {
  Difficulty,
  Roadmap,
  SectionKey,
  Subject,
  SubjectMeta,
  Topic,
  TopicMeta,
  TopicSections,
} from '../types/content'

type Json = Record<string, unknown>

const subjectFiles = import.meta.glob<{ default: SubjectMeta }>(
  './subjects/*/subject.json',
  { eager: true },
)
const roadmapFiles = import.meta.glob<{ default: Roadmap }>(
  './subjects/*/roadmap.json',
  { eager: true },
)
const topicFiles = import.meta.glob<{ default: TopicMeta }>(
  './subjects/*/topics/*/topic.json',
  { eager: true },
)
const sectionFiles = import.meta.glob<{ default: Json }>(
  './subjects/*/topics/*/sections/*.json',
  { eager: true },
)

const SUBJECT_RE = /\.\/subjects\/([^/]+)\/subject\.json$/
const ROADMAP_RE = /\.\/subjects\/([^/]+)\/roadmap\.json$/
const TOPIC_RE = /\.\/subjects\/([^/]+)\/topics\/([^/]+)\/topic\.json$/
const SECTION_RE =
  /\.\/subjects\/([^/]+)\/topics\/([^/]+)\/sections\/([^/]+)\.json$/

function buildRegistry(): Subject[] {
  const roadmaps = new Map<string, Roadmap>()
  for (const [path, mod] of Object.entries(roadmapFiles)) {
    const m = path.match(ROADMAP_RE)
    if (m) roadmaps.set(m[1], mod.default)
  }

  // subjectId -> topicId -> assembled sections
  const sectionsByTopic = new Map<string, Map<string, TopicSections>>()
  for (const [path, mod] of Object.entries(sectionFiles)) {
    const m = path.match(SECTION_RE)
    if (!m) continue
    const [, subjectId, topicId, sectionName] = m
    if (!sectionsByTopic.has(subjectId))
      sectionsByTopic.set(subjectId, new Map())
    const topicMap = sectionsByTopic.get(subjectId)!
    const sections = topicMap.get(topicId) ?? {}
    sections[sectionName as SectionKey] = mod.default as never
    topicMap.set(topicId, sections)
  }

  // subjectId -> flat topic list
  const flatTopics = new Map<string, Topic[]>()
  for (const [path, mod] of Object.entries(topicFiles)) {
    const m = path.match(TOPIC_RE)
    if (!m) continue
    const [, subjectId, topicId] = m
    const meta = mod.default
    const sections =
      sectionsByTopic.get(subjectId)?.get(topicId ?? meta.id) ?? {}
    const topic: Topic = {
      ...meta,
      subjectId,
      sections,
      subtopics: [],
    }
    if (!flatTopics.has(subjectId)) flatTopics.set(subjectId, [])
    flatTopics.get(subjectId)!.push(topic)
  }

  const subjects: Subject[] = []
  for (const [path, mod] of Object.entries(subjectFiles)) {
    const m = path.match(SUBJECT_RE)
    if (!m) continue
    const subjectId = m[1]
    const meta = mod.default
    const all = flatTopics.get(subjectId) ?? []

    // Build the parent/child tree from parentId references.
    const byId = new Map(all.map((t) => [t.id, t]))
    const roots: Topic[] = []
    for (const t of all) {
      if (t.parentId && byId.has(t.parentId)) {
        byId.get(t.parentId)!.subtopics.push(t)
      } else {
        roots.push(t)
      }
    }
    const sortByOrder = (a: Topic, b: Topic) => a.order - b.order
    roots.sort(sortByOrder)
    for (const t of all) t.subtopics.sort(sortByOrder)

    subjects.push({
      ...meta,
      roadmap: roadmaps.get(subjectId),
      topics: roots,
      topicCount: all.length,
    })
  }

  subjects.sort((a, b) => a.title.localeCompare(b.title))
  return subjects
}

export const subjects: Subject[] = buildRegistry()

const subjectById = new Map(subjects.map((s) => [s.id, s]))

/**
 * Flat lookup indexes built once at module load so resolving a topic (or its
 * ancestor chain) is O(1) — important now that subjects can hold thousands of
 * deeply nested topics and pages like /account resolve many keys at once.
 */
interface TopicEntry {
  subject: Subject
  topic: Topic
  parent?: Topic
  /** Root → … → direct parent (excludes the topic itself). */
  ancestors: Topic[]
}
const topicIndex = new Map<string, TopicEntry>()
for (const subject of subjects) {
  const walk = (topics: Topic[], ancestors: Topic[]) => {
    for (const t of topics) {
      topicIndex.set(`${subject.id}::${t.id}`, {
        subject,
        topic: t,
        parent: ancestors[ancestors.length - 1],
        ancestors,
      })
      if (t.subtopics.length) walk(t.subtopics, [...ancestors, t])
    }
  }
  walk(subject.topics, [])
}

export function getSubject(id: string): Subject | undefined {
  return subjectById.get(id)
}

/** Flatten a subject's topic tree (roots + all subtopics) into one list. */
export function flattenTopics(subject: Subject): Topic[] {
  const out: Topic[] = []
  const walk = (topics: Topic[]) => {
    for (const t of topics) {
      out.push(t)
      if (t.subtopics.length) walk(t.subtopics)
    }
  }
  walk(subject.topics)
  return out
}

export function getTopic(
  subjectId: string,
  topicId: string,
): { subject: Subject; topic: Topic } | undefined {
  const entry = topicIndex.get(`${subjectId}::${topicId}`)
  if (!entry) return undefined
  return { subject: entry.subject, topic: entry.topic }
}

/** Root → … → direct parent chain for a topic (empty for top-level topics). */
export function getAncestors(subjectId: string, topicId: string): Topic[] {
  return topicIndex.get(`${subjectId}::${topicId}`)?.ancestors ?? []
}

const LEVEL_ORDER: Record<Difficulty, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
}
const LEVEL_BY_ORDER: Difficulty[] = ['beginner', 'intermediate', 'advanced']

/**
 * The span of difficulty levels across a subject's topics, e.g.
 * `{ min: 'beginner', max: 'advanced' }`. A single subject-level label is
 * misleading when topics range from beginner to advanced.
 */
export function subjectLevelRange(subject: Subject): {
  min: Difficulty
  max: Difficulty
} {
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
