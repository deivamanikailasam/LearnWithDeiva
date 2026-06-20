import type {
  Difficulty,
  Roadmap,
  RoadmapNode,
  RoadmapStage,
  SubjectMeta,
  TopicMeta,
  TopicStatus,
} from '../types/content'
import {
  durationPartsToHours,
  hoursToDurationParts,
  type DurationParts,
} from './duration'

export const DIFFICULTY_VALUES = [
  'beginner',
  'intermediate',
  'advanced',
] as const satisfies readonly Difficulty[]

export const TITLE_MAX_LENGTH = 200
export const SUMMARY_MAX_LENGTH = 2000
export const SUBJECT_DESCRIPTION_MAX_LENGTH = 5000
export const TAGLINE_MAX_LENGTH = 200
export const MAX_TAGS = 20
export const TAG_MAX_LENGTH = 40

const HEX_COLOR = /^#[0-9a-f]{6}$/i

export function isHexColor(value: string): boolean {
  return HEX_COLOR.test(value)
}

export function normalizeTags(tags: string[]): string[] {
  const out: string[] = []
  for (const raw of tags) {
    const tag = raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, TAG_MAX_LENGTH)
    if (!tag || out.includes(tag)) continue
    out.push(tag)
    if (out.length >= MAX_TAGS) break
  }
  return out
}

function validateTags(tags: string[]): string | null {
  if (tags.length > MAX_TAGS) return `At most ${MAX_TAGS} tags allowed.`
  for (const tag of tags) {
    if (!/^[a-z0-9-]+$/.test(tag)) {
      return 'Tags must use lowercase letters, numbers, or hyphens.'
    }
    if (tag.length > TAG_MAX_LENGTH) {
      return `Each tag must be at most ${TAG_MAX_LENGTH} characters.`
    }
  }
  return null
}

export interface TopicMetaDraft {
  title: string
  summary: string
  level: Difficulty
  tags: string[]
  status: TopicStatus
  useLevelDefault: boolean
  hoursSource?: TopicMeta['hoursSource']
  durationDays: number
  durationHours: number
  durationMinutes: number
}

export type TopicMetaUpdatePayload = Pick<TopicMeta, 'title' | 'level' | 'tags' | 'status'> & {
  summary?: string
  hours?: number | null
  hoursSource?: TopicMeta['hoursSource'] | null
}

export interface SubjectMetaDraft {
  title: string
  tagline: string
  description: string
  icon: string
  gradientFrom: string
  gradientTo: string
  tags: string[]
  level: Difficulty
}

export type SubjectMetaUpdatePayload = Pick<
  SubjectMeta,
  'title' | 'tagline' | 'description' | 'icon' | 'gradient' | 'tags' | 'level'
>

export function isDifficulty(value: string): value is Difficulty {
  return (DIFFICULTY_VALUES as readonly string[]).includes(value)
}

const SAFE_ID_PATTERN = /^[a-z0-9][a-z0-9._-]*$/i

export function isSafeTopicId(id: string): boolean {
  return (
    id.length > 0 &&
    id.length <= 200 &&
    SAFE_ID_PATTERN.test(id) &&
    !id.includes('..') &&
    !id.includes('/')
  )
}

/** Slug for a new topic folder id. */
export function slugifyTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || 'topic'
}

/** Parent depth: 0 = root topic, 1 = subtopic, 2 = sub-subtopic. */
export function proposeTopicId(title: string, parentId?: string, parentDepth?: number): string {
  const slug = slugifyTitle(title)
  if (parentDepth === 1 && parentId) return `${parentId}--${slug}`
  return slug
}

export function addLabelForDepth(parentDepth: number | undefined): string {
  if (parentDepth == null) return 'Add topic'
  if (parentDepth === 0) return 'Add subtopic'
  return 'Add sub-subtopic'
}

export interface CreateTopicPayload {
  id: string
  title: string
  level: Difficulty
  summary?: string
  parentId?: string
  status?: TopicStatus
  createEmptyDocument?: boolean
}

function normalizeTopicStatus(value: unknown): TopicStatus {
  return value === 'optional' ? 'optional' : 'core'
}

export function validateCreateTopic(
  draft: {
    id: string
    title: string
    level: Difficulty
    summary: string
    status: TopicStatus
    createEmptyDocument: boolean
  },
  options: { includeSummary: boolean; allowEmptyDocument: boolean; allowStatus: boolean },
): { ok: true; payload: CreateTopicPayload } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  const title = draft.title.trim()
  const id = draft.id.trim()

  if (!title) errors.title = 'Title is required.'
  else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be at most ${TITLE_MAX_LENGTH} characters.`
  }

  if (!id) errors.id = 'Id is required.'
  else if (!isSafeTopicId(id)) {
    errors.id = 'Id must use letters, numbers, dots, hyphens, or underscores.'
  }

  if (!isDifficulty(draft.level)) {
    errors.level = 'Choose beginner, intermediate, or advanced.'
  }

  let summary: string | undefined
  if (options.includeSummary) {
    summary = draft.summary.trim()
    if (summary.length > SUMMARY_MAX_LENGTH) {
      errors.summary = `Summary must be at most ${SUMMARY_MAX_LENGTH} characters.`
    }
    if (!summary) summary = undefined
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    payload: {
      id,
      title,
      level: draft.level,
      summary,
      status: options.allowStatus ? normalizeTopicStatus(draft.status) : undefined,
      createEmptyDocument: options.allowEmptyDocument && draft.createEmptyDocument,
    },
  }
}

export function topicToMetaDraft(
  topic: Pick<
    TopicMeta,
    'title' | 'summary' | 'level' | 'hours' | 'hoursSource' | 'tags' | 'status'
  >,
): TopicMetaDraft {
  const hasExplicitHours = typeof topic.hours === 'number' && topic.hours >= 0
  const parts = hoursToDurationParts(hasExplicitHours ? topic.hours : undefined)
  return {
    title: topic.title,
    summary: topic.summary ?? '',
    level: topic.level,
    tags: [...(topic.tags ?? [])],
    status: topic.status ?? 'core',
    useLevelDefault: !hasExplicitHours,
    hoursSource: topic.hoursSource,
    durationDays: parts.days,
    durationHours: parts.hours,
    durationMinutes: parts.minutes,
  }
}

export function metaFromTopicMeta(
  topic: Pick<
    TopicMeta,
    'title' | 'summary' | 'level' | 'hours' | 'hoursSource' | 'tags' | 'status'
  >,
): Pick<
  TopicMeta,
  'title' | 'summary' | 'level' | 'hours' | 'hoursSource' | 'tags' | 'status'
> {
  return {
    title: topic.title,
    summary: topic.summary,
    level: topic.level,
    hours: topic.hours,
    hoursSource: topic.hoursSource,
    tags: topic.tags ?? [],
    status: topic.status ?? 'core',
  }
}

export function topicMetaFingerprint(
  topic: Pick<
    TopicMeta,
    'title' | 'summary' | 'level' | 'hours' | 'hoursSource' | 'tags' | 'status'
  >,
): string {
  return JSON.stringify(metaFromTopicMeta(topic))
}

export function topicToMetaDraftFromSaved(saved: TopicMeta): TopicMetaDraft {
  return topicToMetaDraft(saved)
}

export function validateTopicMetaDraft(
  draft: TopicMetaDraft,
  options: { includeSummary: boolean; durationEditable: boolean; allowStatus?: boolean },
): { ok: true; payload: TopicMetaUpdatePayload } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  const title = draft.title.trim()

  if (!title) errors.title = 'Title is required.'
  else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be at most ${TITLE_MAX_LENGTH} characters.`
  }

  let summary: string | undefined
  if (options.includeSummary) {
    summary = draft.summary.trim()
    if (summary.length > SUMMARY_MAX_LENGTH) {
      errors.summary = `Summary must be at most ${SUMMARY_MAX_LENGTH} characters.`
    }
    if (!summary) summary = undefined
  }

  if (!isDifficulty(draft.level)) {
    errors.level = 'Choose beginner, intermediate, or advanced.'
  }

  const tags = normalizeTags(draft.tags)
  const tagError = validateTags(tags)
  if (tagError) errors.tags = tagError

  let hours: number | null | undefined = null
  if (options.durationEditable) {
    if (draft.useLevelDefault) {
      hours = null
    } else {
      hours = durationPartsToHours(
        draft.durationDays,
        draft.durationHours,
        draft.durationMinutes,
      )
      if (hours <= 0) {
        errors.duration = 'Duration must be greater than zero, or use the level default.'
      }
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const payload: TopicMetaUpdatePayload = {
    title,
    level: draft.level,
    tags,
  }
  if (options.allowStatus) payload.status = normalizeTopicStatus(draft.status)
  if (options.includeSummary) payload.summary = summary
  if (options.durationEditable) payload.hours = hours
  if (options.durationEditable) {
    if (draft.useLevelDefault) {
      payload.hoursSource = null
    } else {
      payload.hoursSource = 'manual'
    }
  }

  return { ok: true, payload }
}

export function metaDraftsEqual(a: TopicMetaDraft, b: TopicMetaDraft): boolean {
  return (
    a.title === b.title &&
    a.summary === b.summary &&
    a.level === b.level &&
    a.status === b.status &&
    a.tags.join('\0') === b.tags.join('\0') &&
    a.useLevelDefault === b.useLevelDefault &&
    a.durationDays === b.durationDays &&
    a.durationHours === b.durationHours &&
    a.durationMinutes === b.durationMinutes
  )
}

export function subjectToMetaDraft(subject: SubjectMeta): SubjectMetaDraft {
  return {
    title: subject.title,
    tagline: subject.tagline,
    description: subject.description,
    icon: subject.icon,
    gradientFrom: subject.gradient[0],
    gradientTo: subject.gradient[1],
    tags: [...subject.tags],
    level: subject.level,
  }
}

export function subjectMetaFingerprint(subject: SubjectMeta): string {
  return JSON.stringify(subjectToMetaDraft(subject))
}

export function subjectMetaDraftsEqual(a: SubjectMetaDraft, b: SubjectMetaDraft): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function validateSubjectMetaDraft(
  draft: SubjectMetaDraft,
): { ok: true; payload: SubjectMetaUpdatePayload } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  const title = draft.title.trim()
  const tagline = draft.tagline.trim()
  const description = draft.description.trim()
  const icon = draft.icon.trim()

  if (!title) errors.title = 'Title is required.'
  else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be at most ${TITLE_MAX_LENGTH} characters.`
  }

  if (!tagline) errors.tagline = 'Tagline is required.'
  else if (tagline.length > TAGLINE_MAX_LENGTH) {
    errors.tagline = `Tagline must be at most ${TAGLINE_MAX_LENGTH} characters.`
  }

  if (!description) errors.description = 'Description is required.'
  else if (description.length > SUBJECT_DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description must be at most ${SUBJECT_DESCRIPTION_MAX_LENGTH} characters.`
  }

  if (!icon) errors.icon = 'Icon is required.'

  if (!isHexColor(draft.gradientFrom)) {
    errors.gradientFrom = 'Use a 6-digit hex color, e.g. #6366f1.'
  }
  if (!isHexColor(draft.gradientTo)) {
    errors.gradientTo = 'Use a 6-digit hex color, e.g. #8b5cf6.'
  }

  if (!isDifficulty(draft.level)) {
    errors.level = 'Choose beginner, intermediate, or advanced.'
  }

  const tags = normalizeTags(draft.tags)
  const tagError = validateTags(tags)
  if (tagError) errors.tags = tagError

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    payload: {
      title,
      tagline,
      description,
      icon,
      gradient: [draft.gradientFrom, draft.gradientTo],
      tags,
      level: draft.level,
    },
  }
}

/** Server-friendly validator — returns a single error string. */
export function validateSubjectMetaPayload(
  meta: unknown,
): { ok: true; payload: SubjectMetaUpdatePayload } | { ok: false; error: string } {
  if (meta === null || typeof meta !== 'object' || Array.isArray(meta)) {
    return { ok: false, error: 'Invalid subject metadata.' }
  }
  const m = meta as Record<string, unknown>
  const draft: SubjectMetaDraft = {
    title: typeof m.title === 'string' ? m.title : '',
    tagline: typeof m.tagline === 'string' ? m.tagline : '',
    description: typeof m.description === 'string' ? m.description : '',
    icon: typeof m.icon === 'string' ? m.icon : '',
    gradientFrom:
      Array.isArray(m.gradient) && typeof m.gradient[0] === 'string'
        ? m.gradient[0]
        : '',
    gradientTo:
      Array.isArray(m.gradient) && typeof m.gradient[1] === 'string'
        ? m.gradient[1]
        : '',
    tags: Array.isArray(m.tags)
      ? m.tags.filter((t): t is string => typeof t === 'string')
      : [],
    level: typeof m.level === 'string' ? (m.level as Difficulty) : 'beginner',
  }
  const result = validateSubjectMetaDraft(draft)
  if (!result.ok) {
    const first = Object.values(result.errors)[0]
    return { ok: false, error: first ?? 'Invalid subject metadata.' }
  }
  return result
}

export type { DurationParts }

export function cloneRoadmap(roadmap: Roadmap): Roadmap {
  return JSON.parse(JSON.stringify(roadmap)) as Roadmap
}

export function roadmapFingerprint(roadmap: Roadmap): string {
  return JSON.stringify(roadmap)
}

function uniqueId(base: string, used: Set<string>): string {
  const slug = slugifyTitle(base) || 'item'
  if (!used.has(slug)) return slug
  let n = 2
  while (used.has(`${slug}-${n}`)) n += 1
  return `${slug}-${n}`
}

export function proposeStageId(title: string, stages: RoadmapStage[]): string {
  const used = new Set(stages.map((s) => s.id))
  return uniqueId(title, used)
}

export function proposeNodeId(title: string, stages: RoadmapStage[]): string {
  const used = new Set(stages.flatMap((s) => s.nodes.map((n) => n.id)))
  return uniqueId(title, used)
}

function normalizeRoadmapNode(node: RoadmapNode): RoadmapNode | null {
  const id = node.id.trim()
  const title = node.title.trim()
  if (!isSafeTopicId(id)) return null
  if (!title || title.length > TITLE_MAX_LENGTH) return null

  const next: RoadmapNode = { id, title }
  const description = node.description?.trim()
  if (description) {
    if (description.length > SUMMARY_MAX_LENGTH) return null
    next.description = description
  }

  const topicId = node.topicId?.trim()
  if (topicId) {
    if (!isSafeTopicId(topicId)) return null
    next.topicId = topicId
  }

  if (node.status === 'optional') next.status = 'optional'
  else if (node.status === 'core' || node.status == null) next.status = 'core'

  return next
}

function normalizeRoadmapStage(stage: RoadmapStage): RoadmapStage | null {
  const id = stage.id.trim()
  const title = stage.title.trim()
  if (!isSafeTopicId(id)) return null
  if (!title || title.length > TITLE_MAX_LENGTH) return null

  const next: RoadmapStage = {
    id,
    title,
    nodes: [],
  }
  const summary = stage.summary?.trim()
  if (summary) {
    if (summary.length > SUMMARY_MAX_LENGTH) return null
    next.summary = summary
  }

  if (!Array.isArray(stage.nodes)) return null
  const nodeIds = new Set<string>()
  for (const raw of stage.nodes) {
    const node = normalizeRoadmapNode(raw)
    if (!node || nodeIds.has(node.id)) return null
    nodeIds.add(node.id)
    next.nodes.push(node)
  }

  return next
}

export function validateRoadmap(
  roadmap: Roadmap,
): { ok: true; payload: Roadmap } | { ok: false; errors: string[] } {
  const errors: string[] = []
  const title = roadmap.title?.trim() ?? ''
  if (!title) errors.push('Roadmap title is required.')
  else if (title.length > TITLE_MAX_LENGTH) {
    errors.push(`Roadmap title must be at most ${TITLE_MAX_LENGTH} characters.`)
  }

  if (!Array.isArray(roadmap.stages)) {
    errors.push('Stages must be an array.')
    return { ok: false, errors }
  }

  const stages: RoadmapStage[] = []
  const stageIds = new Set<string>()
  const allNodeIds = new Set<string>()

  for (const rawStage of roadmap.stages) {
    const stage = normalizeRoadmapStage(rawStage)
    if (!stage) {
      errors.push('Each stage needs a valid id, title, and nodes.')
      continue
    }
    if (stageIds.has(stage.id)) {
      errors.push(`Duplicate stage id "${stage.id}".`)
      continue
    }
    stageIds.add(stage.id)
    for (const node of stage.nodes) {
      if (allNodeIds.has(node.id)) {
        errors.push(`Duplicate node id "${node.id}".`)
      }
      allNodeIds.add(node.id)
    }
    stages.push(stage)
  }

  if (errors.length > 0) return { ok: false, errors }
  return { ok: true, payload: { title, stages } }
}

/** Server-friendly validator — returns a single error string. */
export function validateRoadmapPayload(
  roadmap: unknown,
): { ok: true; payload: Roadmap } | { ok: false; error: string } {
  if (roadmap === null || typeof roadmap !== 'object' || Array.isArray(roadmap)) {
    return { ok: false, error: 'Invalid roadmap payload.' }
  }
  const result = validateRoadmap(roadmap as Roadmap)
  if (!result.ok) return { ok: false, error: result.errors[0] ?? 'Invalid roadmap.' }
  return result
}
