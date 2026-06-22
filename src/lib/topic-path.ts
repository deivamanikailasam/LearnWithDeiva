import type { Topic } from '../types/content'

/** Prompt-style path for clipboard: sub-subtopic in subtopic, as part of subject: topic. */
export function formatSubSubtopicPath(
  subjectTitle: string,
  ancestors: Topic[],
  topic: Topic,
): string {
  const rootTopic = ancestors[0].title
  const subtopic = ancestors[1].title
  const subSubtopic = topic.title
  return `Topic: '${subSubtopic}' in '${subtopic}', as part of '${subjectTitle}': '${rootTopic}'`
}
