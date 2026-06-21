import type { Topic } from '../types/content'

/** Card styling for topics flagged by the dev-only content audit. */
export const CONTENT_GAP_CARD_CLASS =
  'border-amber-400 bg-amber-50 ring-1 ring-amber-300/60 dark:border-amber-500/50 dark:bg-amber-500/10 dark:ring-amber-500/30'

function subSubtopicLacksContent(topic: Topic): boolean {
  return !topic.hasContent || topic.contentSectionCount === 0
}

/** True when at least one sub-subtopic under `topic` is missing section content. */
export function topicHasSubSubtopicContentGap(topic: Topic): boolean {
  for (const sub of topic.subtopics) {
    for (const subSub of sub.subtopics) {
      if (subSubtopicLacksContent(subSub)) return true
    }
  }
  return false
}

/** Root topic ids that have one or more sub-subtopics without content. */
export function findTopicsWithSubSubtopicContentGaps(
  topics: readonly Topic[],
): Set<string> {
  const gaps = new Set<string>()
  for (const root of topics) {
    if (topicHasSubSubtopicContentGap(root)) gaps.add(root.id)
  }
  return gaps
}

export function isContentGapHighlighted(
  contentGapTopicIds: ReadonlySet<string> | null | undefined,
  topicId: string | undefined,
): boolean {
  return Boolean(topicId && contentGapTopicIds?.has(topicId))
}
