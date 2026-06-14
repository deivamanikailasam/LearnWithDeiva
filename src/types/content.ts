/**
 * Content domain model.
 *
 * The platform is fully data-driven: every subject lives in its own folder
 * under `src/content/subjects/<subject-id>/`, and each topic splits its
 * material into individual JSON files inside `topics/<topic-id>/sections/`.
 * These types describe the shape of that on-disk data after it is loaded and
 * stitched together by the content registry.
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

/** Raw `subject.json` written by content authors. */
export interface SubjectMeta {
  id: string
  title: string
  tagline: string
  description: string
  /** Emoji or short glyph used as the subject avatar. */
  icon: string
  /** Tailwind gradient stops, e.g. ["#6366f1", "#8b5cf6"]. */
  gradient: [string, string]
  tags: string[]
  level: Difficulty
  estimatedHours?: number
}

/** A node in a subject roadmap. */
export interface RoadmapNode {
  id: string
  title: string
  /** Optional topic id this stage links to. */
  topicId?: string
  description?: string
  status?: 'core' | 'optional'
}

export interface RoadmapStage {
  id: string
  title: string
  summary?: string
  nodes: RoadmapNode[]
}

export interface Roadmap {
  title: string
  description?: string
  stages: RoadmapStage[]
}

/** Raw `topic.json` written by content authors. */
export interface TopicMeta {
  id: string
  title: string
  summary: string
  order: number
  level: Difficulty
  tags: string[]
  /** When set, this topic is a subtopic of another topic in the subject. */
  parentId?: string
}

/* ------------------------------------------------------------------ */
/* Section payloads — one JSON file per section inside `sections/`.    */
/* ------------------------------------------------------------------ */

export interface ExplanationSection {
  /** Markdown body. */
  content: string
  keyPoints?: string[]
}

export interface CodeSnippet {
  title: string
  language: string
  code: string
  explanation?: string
}
export interface CodeSection {
  snippets: CodeSnippet[]
}

export interface MaterialItem {
  title: string
  type: 'article' | 'video' | 'book' | 'course' | 'docs' | 'tool'
  url: string
  description?: string
}
export interface MaterialsSection {
  items: MaterialItem[]
}

export interface ReferenceItem {
  title: string
  url: string
  author?: string
  note?: string
}
export interface ReferencesSection {
  items: ReferenceItem[]
}

export interface SynonymItem {
  term: string
  definition: string
}
export interface SynonymsSection {
  terms: SynonymItem[]
}

export interface ApplicationItem {
  title: string
  description: string
}
export interface ApplicationsSection {
  items: ApplicationItem[]
}

export interface ProjectItem {
  title: string
  difficulty: Difficulty
  description: string
  requirements?: string[]
}
export interface ProjectsSection {
  items: ProjectItem[]
}

export interface QAItem {
  question: string
  answer: string
  difficulty?: Difficulty
  tags?: string[]
}
export interface InterviewQuestionsSection {
  items: QAItem[]
}

export interface ScenarioItem {
  scenario: string
  question: string
  answer: string
}
export interface ScenarioQuestionsSection {
  items: ScenarioItem[]
}

export interface CaseStudyItem {
  title: string
  context: string
  problem: string
  solution: string
  outcome: string
}
export interface CaseStudiesSection {
  items: CaseStudyItem[]
}

export interface ExamQuestion {
  question: string
  options?: string[]
  answer: string
  explanation?: string
}
export interface ExamPrepSection {
  items: ExamQuestion[]
}

export interface CourseModule {
  title: string
  duration?: string
  lessons: string[]
}
export interface CoursePrepSection {
  modules: CourseModule[]
}

/** Discriminated union of all section kinds, keyed by file name. */
export interface TopicSections {
  explanation?: ExplanationSection
  code?: CodeSection
  materials?: MaterialsSection
  references?: ReferencesSection
  synonyms?: SynonymsSection
  applications?: ApplicationsSection
  projects?: ProjectsSection
  'interview-questions'?: InterviewQuestionsSection
  'scenario-questions'?: ScenarioQuestionsSection
  'case-studies'?: CaseStudiesSection
  'exam-prep'?: ExamPrepSection
  'course-prep'?: CoursePrepSection
}

export type SectionKey = keyof TopicSections

/* ------------------------------------------------------------------ */
/* Assembled, in-memory shapes used by the UI.                         */
/* ------------------------------------------------------------------ */

export interface Topic extends TopicMeta {
  subjectId: string
  sections: TopicSections
  /** Direct subtopics (topics whose parentId === this.id). */
  subtopics: Topic[]
}

export interface Subject extends SubjectMeta {
  roadmap?: Roadmap
  topics: Topic[]
  /** Total number of topics including subtopics. */
  topicCount: number
}

export interface SectionDescriptor {
  key: SectionKey
  label: string
  icon: string
}
