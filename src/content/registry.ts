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

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id)
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
  const subject = getSubject(subjectId)
  if (!subject) return undefined
  const topic = flattenTopics(subject).find((t) => t.id === topicId)
  if (!topic) return undefined
  return { subject, topic }
}
