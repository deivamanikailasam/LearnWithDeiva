import type {
  SectionDescriptor,
  SectionKey,
  SubjectExtraDescriptor,
} from '../types/content'

/**
 * Canonical ordering, labels and icons for every topic section. The UI renders
 * sections in this order and skips any a topic doesn't provide.
 */
export const SECTION_DESCRIPTORS: SectionDescriptor[] = [
  { key: 'explanation', label: 'Explanation', icon: '📖' },
  { key: 'examples', label: 'Real-World Examples', icon: '🌍' },
  { key: 'diagrams', label: 'Diagrams', icon: '🗺️' },
  { key: 'charts', label: 'Charts', icon: '📈' },
  { key: 'images', label: 'Images', icon: '🖼️' },
  { key: 'code', label: 'Code', icon: '💻' },
  { key: 'synonyms', label: 'Synonyms & Glossary', icon: '🔤' },
  { key: 'connections', label: 'Conceptual Connections', icon: '🕸️' },
  { key: 'applications', label: 'Applications', icon: '🚀' },
  { key: 'tradeoffs', label: 'Advantages & Disadvantages', icon: '⚖️' },
  { key: 'mistakes', label: 'Common Mistakes', icon: '🚫' },
  { key: 'misconceptions', label: 'Common Misconceptions', icon: '🤔' },
  { key: 'best-practices', label: 'Pitfalls & Best Practices', icon: '⚠️' },
  { key: 'origins', label: 'Origin & History', icon: '🏛️' },
  { key: 'question-patterns', label: 'Question Patterns', icon: '❓' },
  { key: 'materials', label: 'Learning Materials', icon: '🎓' },
  { key: 'references', label: 'References', icon: '🔗' },
  { key: 'projects', label: 'Projects', icon: '🛠️' },
  { key: 'interview-questions', label: 'Interview Questions', icon: '🎤' },
  { key: 'scenario-questions', label: 'Scenario Questions', icon: '🧩' },
  { key: 'case-studies', label: 'Case Studies', icon: '📊' },
  { key: 'exam-prep', label: 'Self-Assessment', icon: '📝' },
  { key: 'course-prep', label: 'Course Prep', icon: '📚' },
  { key: 'mastery', label: 'Mastery Criteria', icon: '🏆' },
]

export const SECTION_LABELS: Record<SectionKey, string> =
  Object.fromEntries(
    SECTION_DESCRIPTORS.map((d) => [d.key, d.label]),
  ) as Record<SectionKey, string>

export const SECTION_ICONS: Record<SectionKey, string> = Object.fromEntries(
  SECTION_DESCRIPTORS.map((d) => [d.key, d.icon]),
) as Record<SectionKey, string>

/**
 * Subject-level extras surfaced as tabs on the subject page. Each reuses an
 * existing topic-section renderer (see `SectionView`) so there is a single
 * source of truth for how this material looks.
 */
export const SUBJECT_EXTRA_DESCRIPTORS: SubjectExtraDescriptor[] = [
  { key: 'interview', slug: 'interview', label: 'Interview Prep', icon: '🎤' },
  { key: 'scenarios', slug: 'scenarios', label: 'Scenarios', icon: '🧩' },
  { key: 'caseStudies', slug: 'case-studies', label: 'Case Studies', icon: '📊' },
  { key: 'projects', slug: 'projects', label: 'Projects', icon: '🛠️' },
  { key: 'quiz', slug: 'quiz', label: 'Quizzes', icon: '📝' },
  { key: 'resources', slug: 'resources', label: 'Resources', icon: '📚' },
  { key: 'pitfalls', slug: 'pitfalls', label: 'Pitfalls & Best Practices', icon: '⚠️' },
  { key: 'cheatsheet', slug: 'cheat-sheet', label: 'Cheat Sheet', icon: '📋' },
  // Glossary is intentionally omitted here: it is surfaced globally on the
  // dedicated /glossary page instead of as a per-subject tab. The build still
  // reads each subject's glossary.json to populate that global page.
]
