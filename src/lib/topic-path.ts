import type { Topic } from '../types/content'

/** `subject: root topic: subtopic: sub-subtopic` for clipboard / prompts. */
export function formatSubSubtopicPath(
  subjectTitle: string,
  ancestors: Topic[],
  topic: Topic,
): string {
  return `${subjectTitle}: ${ancestors[0].title}: ${ancestors[1].title}: ${topic.title}`
}
