import type { Topic, TopicStatus } from '../types/content'

export function isOptionalStatus(status: TopicStatus | undefined): boolean {
  return status === 'optional'
}

/** True when this node or any ancestor is marked optional. */
export function isEffectivelyOptional(
  topic: { status?: TopicStatus },
  parentOptional = false,
): boolean {
  return parentOptional || isOptionalStatus(topic.status)
}

/** True when this node or any ancestor in `ancestors` (root → parent) is optional. */
export function isTopicEffectivelyOptionalInTree(
  topic: { status?: TopicStatus },
  ancestors: readonly { status?: TopicStatus }[],
): boolean {
  if (isOptionalStatus(topic.status)) return true
  return ancestors.some((a) => isOptionalStatus(a.status))
}

export function collectOptionalTopicIds(
  topics: readonly Topic[],
  parentOptional = false,
): string[] {
  const ids: string[] = []
  for (const topic of topics) {
    const optional = isEffectivelyOptional(topic, parentOptional)
    if (optional) ids.push(topic.id)
    if (topic.subtopics.length > 0) {
      ids.push(...collectOptionalTopicIds(topic.subtopics, optional))
    }
  }
  return ids
}

export function countRequiredTopics(
  topics: readonly Topic[],
  parentOptional = false,
): number {
  let count = 0
  for (const topic of topics) {
    const optional = isEffectivelyOptional(topic, parentOptional)
    if (!optional) count += 1
    if (topic.subtopics.length > 0) {
      count += countRequiredTopics(topic.subtopics, optional)
    }
  }
  return count
}

/** Completed topics that count toward required progress (excludes optional). */
export function countRequiredCompleted(
  subjectId: string,
  optionalTopicIds: readonly string[] | undefined,
  completed: ReadonlyMap<string, number>,
): number {
  const optional = optionalTopicIds?.length ? new Set(optionalTopicIds) : null
  const prefix = `${subjectId}::`
  let count = 0
  for (const key of completed.keys()) {
    if (!key.startsWith(prefix)) continue
    const topicId = key.slice(prefix.length)
    if (optional?.has(topicId)) continue
    count += 1
  }
  return count
}
