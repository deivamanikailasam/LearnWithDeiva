import type { SectionDescriptor, SectionKey } from '../types/content'

/**
 * Canonical ordering, labels and icons for every topic section. The UI renders
 * sections in this order and skips any a topic doesn't provide.
 */
export const SECTION_DESCRIPTORS: SectionDescriptor[] = [
  { key: 'explanation', label: 'Explanation', icon: '📖' },
  { key: 'code', label: 'Code', icon: '💻' },
  { key: 'synonyms', label: 'Synonyms & Glossary', icon: '🔤' },
  { key: 'applications', label: 'Applications', icon: '🚀' },
  { key: 'materials', label: 'Learning Materials', icon: '🎓' },
  { key: 'references', label: 'References', icon: '🔗' },
  { key: 'projects', label: 'Projects', icon: '🛠️' },
  { key: 'interview-questions', label: 'Interview Questions', icon: '🎤' },
  { key: 'scenario-questions', label: 'Scenario Questions', icon: '🧩' },
  { key: 'case-studies', label: 'Case Studies', icon: '📊' },
  { key: 'exam-prep', label: 'Exam Prep', icon: '📝' },
  { key: 'course-prep', label: 'Course Prep', icon: '📚' },
]

export const SECTION_LABELS: Record<SectionKey, string> =
  Object.fromEntries(
    SECTION_DESCRIPTORS.map((d) => [d.key, d.label]),
  ) as Record<SectionKey, string>

export const SECTION_ICONS: Record<SectionKey, string> = Object.fromEntries(
  SECTION_DESCRIPTORS.map((d) => [d.key, d.icon]),
) as Record<SectionKey, string>
