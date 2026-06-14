import Fuse from 'fuse.js'
import type { FuseResult } from 'fuse.js'
import { flattenTopics, subjects } from '../content/registry'
import { SECTION_LABELS } from '../content/sections'
import { paths } from './paths'
import type {
  SectionKey,
  Subject,
  Topic,
  TopicSections,
} from '../types/content'

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

function clip(text: string, max = 220): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max)}…` : clean
}

/** Pull searchable units out of one topic's sections. */
function extractSectionDocs(subject: Subject, topic: Topic): SearchDoc[] {
  const docs: SearchDoc[] = []
  const s: TopicSections = topic.sections
  const base = {
    type: 'section' as const,
    subjectId: subject.id,
    subjectTitle: subject.title,
    topicId: topic.id,
    topicTitle: topic.title,
    url: paths.topic(subject.id, topic.id),
    tags: topic.tags,
  }
  const make = (
    key: SectionKey,
    suffix: string,
    title: string,
    text: string,
  ): SearchDoc => ({
    ...base,
    id: `${subject.id}/${topic.id}/${key}/${suffix}`,
    sectionKey: key,
    sectionLabel: SECTION_LABELS[key],
    title,
    text: clip(text),
  })

  if (s.explanation) {
    docs.push(
      make(
        'explanation',
        '0',
        `${topic.title} · Explanation`,
        `${s.explanation.content} ${(s.explanation.keyPoints ?? []).join(' ')}`,
      ),
    )
  }
  s.code?.snippets.forEach((c, i) =>
    docs.push(make('code', String(i), c.title, `${c.code} ${c.explanation ?? ''}`)),
  )
  s.synonyms?.terms.forEach((t, i) =>
    docs.push(make('synonyms', String(i), t.term, t.definition)),
  )
  s.applications?.items.forEach((a, i) =>
    docs.push(make('applications', String(i), a.title, a.description)),
  )
  s.materials?.items.forEach((m, i) =>
    docs.push(make('materials', String(i), m.title, m.description ?? m.type)),
  )
  s.references?.items.forEach((r, i) =>
    docs.push(make('references', String(i), r.title, `${r.author ?? ''} ${r.note ?? ''}`)),
  )
  s.projects?.items.forEach((p, i) =>
    docs.push(make('projects', String(i), p.title, p.description)),
  )
  s['interview-questions']?.items.forEach((q, i) =>
    docs.push(make('interview-questions', String(i), q.question, q.answer)),
  )
  s['scenario-questions']?.items.forEach((q, i) =>
    docs.push(make('scenario-questions', String(i), q.question, `${q.scenario} ${q.answer}`)),
  )
  s['case-studies']?.items.forEach((c, i) =>
    docs.push(
      make('case-studies', String(i), c.title, `${c.context} ${c.problem} ${c.solution} ${c.outcome}`),
    ),
  )
  s['exam-prep']?.items.forEach((q, i) =>
    docs.push(make('exam-prep', String(i), q.question, `${q.answer} ${q.explanation ?? ''}`)),
  )
  s['course-prep']?.modules.forEach((m, i) =>
    docs.push(make('course-prep', String(i), m.title, m.lessons.join(' '))),
  )

  return docs
}

function buildDocuments(): SearchDoc[] {
  const docs: SearchDoc[] = []
  for (const subject of subjects) {
    docs.push({
      id: `subject/${subject.id}`,
      type: 'subject',
      subjectId: subject.id,
      subjectTitle: subject.title,
      title: subject.title,
      text: clip(`${subject.tagline} ${subject.description}`),
      tags: subject.tags,
      url: paths.subject(subject.id),
    })
    for (const topic of flattenTopics(subject)) {
      docs.push({
        id: `topic/${subject.id}/${topic.id}`,
        type: 'topic',
        subjectId: subject.id,
        subjectTitle: subject.title,
        topicId: topic.id,
        topicTitle: topic.title,
        title: topic.title,
        text: clip(topic.summary),
        tags: topic.tags,
        url: paths.topic(subject.id, topic.id),
      })
      docs.push(...extractSectionDocs(subject, topic))
    }
  }
  return docs
}

export const searchDocuments: SearchDoc[] = buildDocuments()

const fuse = new Fuse(searchDocuments, {
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
})

export interface SearchOptions {
  limit?: number
  subjectId?: string
  types?: SearchDocType[]
}

export function search(
  query: string,
  options: SearchOptions = {},
): SearchDoc[] {
  const q = query.trim()
  if (!q) return []
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
