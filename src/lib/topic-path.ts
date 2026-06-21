import type { Topic } from '../types/content'

/** `root topic: subtopic: sub-subtopic` for clipboard / prompts. */
export function formatSubSubtopicPath(ancestors: Topic[], topic: Topic): string {
  return `${ancestors[0].title}: ${ancestors[1].title}: ${topic.title}`
}
