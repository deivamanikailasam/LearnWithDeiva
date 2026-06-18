import type { Roadmap, SubjectMeta, TopicMeta } from '../types/content'
import type { CreateTopicPayload, SubjectMetaUpdatePayload, TopicMetaUpdatePayload } from './content-validation'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

async function parseApiError(res: Response): Promise<string> {
  const text = await res.text()
  let message = `Save failed (${res.status})`
  try {
    const err = JSON.parse(text) as { error?: string }
    if (err.error) message = err.error
  } catch {
    if (text.trim()) message = text.trim().slice(0, 200)
  }
  return message
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await parseApiError(res))
  return (await res.json()) as T
}

export async function saveTopicMeta(
  subjectId: string,
  topicId: string,
  meta: TopicMetaUpdatePayload,
): Promise<TopicMeta> {
  const body = await postJson<{ topic?: TopicMeta }>('/api/content/topic', {
    subjectId,
    topicId,
    meta,
  })
  if (!body.topic) throw new Error('Save succeeded but no topic was returned.')
  return body.topic
}

export async function createTopic(
  subjectId: string,
  topic: CreateTopicPayload,
): Promise<TopicMeta> {
  const payload = {
    ...topic,
    parentId: topic.parentId || undefined,
  }
  const body = await postJson<{ topic?: TopicMeta }>('/api/content/topic/create', {
    subjectId,
    topic: payload,
  })
  if (!body.topic) throw new Error('Create succeeded but no topic was returned.')
  return body.topic as TopicMeta
}

export async function deleteTopic(
  subjectId: string,
  topicId: string,
): Promise<string[]> {
  const body = await postJson<{ deletedIds?: string[] }>('/api/content/topic/delete', {
    subjectId,
    topicId,
  })
  return body.deletedIds ?? [topicId]
}

export async function saveSubjectMeta(
  subjectId: string,
  meta: SubjectMetaUpdatePayload,
): Promise<SubjectMeta> {
  const body = await postJson<{ subject?: SubjectMeta }>('/api/content/subject', {
    subjectId,
    meta,
  })
  if (!body.subject) throw new Error('Save succeeded but no subject was returned.')
  return body.subject
}

export async function saveRoadmap(
  subjectId: string,
  roadmap: Roadmap,
): Promise<Roadmap> {
  const body = await postJson<{ roadmap?: Roadmap }>('/api/content/roadmap', {
    subjectId,
    roadmap,
  })
  if (!body.roadmap) throw new Error('Save succeeded but no roadmap was returned.')
  return body.roadmap
}

export async function reorderTopics(
  subjectId: string,
  parentId: string | undefined,
  orderedIds: string[],
): Promise<void> {
  await postJson('/api/content/reorder', {
    subjectId,
    parentId: parentId ?? null,
    orderedIds,
  })
}
