/** Central place for building in-app route paths (used with HashRouter). */
export const paths = {
  home: () => '/',
  subjects: () => '/subjects',
  subject: (subjectId: string) => `/subjects/${subjectId}`,
  /** A subject-level view tab, e.g. `/subjects/java/interview`. */
  subjectView: (subjectId: string, view: string) =>
    `/subjects/${subjectId}/${view}`,
  topic: (subjectId: string, topicId: string) =>
    `/subjects/${subjectId}/topics/${topicId}`,
  search: (query?: string) =>
    query ? `/search?q=${encodeURIComponent(query)}` : '/search',
  calendar: () => '/calendar',
  account: () => '/account',
}
