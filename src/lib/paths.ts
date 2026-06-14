/** Central place for building in-app route paths (used with HashRouter). */
export const paths = {
  home: () => '/',
  subjects: () => '/subjects',
  subject: (subjectId: string) => `/subjects/${subjectId}`,
  topic: (subjectId: string, topicId: string) =>
    `/subjects/${subjectId}/topics/${topicId}`,
  search: (query?: string) =>
    query ? `/search?q=${encodeURIComponent(query)}` : '/search',
  account: () => '/account',
}
