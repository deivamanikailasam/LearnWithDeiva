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
  /** Total estimated study time across all topics, in minutes. Computed at
   *  build time by summing each topic's level-based (or explicit) duration. */
  estimatedMinutes?: number
  /** @deprecated Legacy hand-authored total; replaced by `estimatedMinutes`. */
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
  /** Explicit learning time in hours. When absent it is estimated by level. */
  hours?: number
}

/* ------------------------------------------------------------------ */
/* Section payloads — one JSON file per section inside `sections/`.    */
/* ------------------------------------------------------------------ */

export interface ExplanationSection {
  /** Concise canonical definition of the concept (template item 1). */
  definition?: string
  /** Plain-language, jargon-free explanation (template item 2). */
  layman?: string
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

export interface ExampleItem {
  title: string
  /** A concrete, real-world situation where the concept shows up. */
  scenario: string
  /** Optional follow-up tying the scenario back to the concept. */
  explanation?: string
}
export interface ExamplesSection {
  items: ExampleItem[]
}

export interface DiagramItem {
  title?: string
  /** Mermaid diagram source rendered client-side. */
  mermaid: string
  caption?: string
}
export interface DiagramsSection {
  items: DiagramItem[]
}

export type ChartKind = 'bar' | 'line' | 'pie' | 'area'
export interface ChartSeries {
  /** Key in each data row holding this series' numeric value. */
  key: string
  label?: string
}
export interface ChartItem {
  title?: string
  kind: ChartKind
  /** Row objects, e.g. `{ name: "GPT-3", params: 175 }`. */
  data: Record<string, string | number>[]
  /** Key in each row used for the category axis / slice label. */
  xKey: string
  series: ChartSeries[]
  caption?: string
}
export interface ChartsSection {
  items: ChartItem[]
}

export interface ImageItem {
  src: string
  alt: string
  caption?: string
}
export interface ImagesSection {
  items: ImageItem[]
}

export interface ConnectionItem {
  title: string
  /** How this concept relates, e.g. "builds on", "contrasts with". */
  relation?: string
  description: string
  /** Optional topic id to deep-link to within the same subject. */
  topicId?: string
}
export interface ConnectionsSection {
  items: ConnectionItem[]
}

export type QuestionPattern =
  | '5w1h'
  | 'socratic'
  | 'mindmap'
  | 'comparative'
  | 'what-if'
  | 'cause-effect'
  | 'what-breaks-this'
export interface PatternQA {
  question: string
  answer: string
}
export interface QuestionPatternGroup {
  pattern: QuestionPattern
  items: PatternQA[]
}
export interface QuestionPatternsSection {
  groups: QuestionPatternGroup[]
}

export interface TradeoffsSection {
  advantages: string[]
  disadvantages: string[]
}

export interface MistakeItem {
  /** The common mistake. */
  mistake: string
  /** The correct approach. */
  fix: string
  why?: string
  /** Short concrete example (Markdown; may include fenced code) illustrating the mistake or the fix. */
  example?: string
}
export interface MistakesSection {
  items: MistakeItem[]
}

export interface MisconceptionItem {
  /** The widely-believed but incorrect statement. */
  myth: string
  /** The accurate reality. */
  reality: string
  /** Short concrete example (Markdown; may include fenced code) illustrating the reality. */
  example?: string
}
export interface MisconceptionsSection {
  items: MisconceptionItem[]
}

/** Topic-level pitfalls & best practices; reuses the `PitfallItem` shape. */
export interface BestPracticesSection {
  items: PitfallItem[]
}

export interface TimelineEntry {
  label: string
  description: string
}
export interface OriginsSection {
  /** Markdown narrative of the origin and what came before. */
  content: string
  timeline?: TimelineEntry[]
}

export interface MasteryCriterion {
  label: string
  level?: Difficulty
  example?: string
}
export interface MasterySection {
  criteria: MasteryCriterion[]
}

/* ----- subject-level-only payloads (no per-topic equivalent) ----- */

/** Subject-wide glossary; reuses the topic-level term/definition shape. */
export interface GlossarySection {
  items: SynonymItem[]
}

export interface ResourceItem {
  title: string
  type: 'article' | 'video' | 'book' | 'course' | 'docs' | 'tool' | 'reference'
  url: string
  description?: string
  author?: string
}
export interface ResourcesSection {
  items: ResourceItem[]
}

export interface PitfallItem {
  title: string
  /** The mistake / anti-pattern to avoid. */
  avoid: string
  /** The recommended approach. */
  prefer: string
  /** Why it matters. */
  why?: string
  /** Short concrete example (Markdown; may include fenced code) illustrating the pitfall or the preferred approach. */
  example?: string
}
export interface PitfallsSection {
  items: PitfallItem[]
}

export interface CheatSheetEntry {
  label: string
  code?: string
  language?: string
  note?: string
}
export interface CheatSheetGroup {
  title: string
  entries: CheatSheetEntry[]
}
export interface CheatSheetSection {
  /** Grouped quick-reference entries; one virtualized card per group. */
  items: CheatSheetGroup[]
}

/** Discriminated union of all section kinds, keyed by file name. */
export interface TopicSections {
  explanation?: ExplanationSection
  examples?: ExamplesSection
  diagrams?: DiagramsSection
  charts?: ChartsSection
  images?: ImagesSection
  code?: CodeSection
  synonyms?: SynonymsSection
  connections?: ConnectionsSection
  applications?: ApplicationsSection
  tradeoffs?: TradeoffsSection
  mistakes?: MistakesSection
  misconceptions?: MisconceptionsSection
  'best-practices'?: BestPracticesSection
  origins?: OriginsSection
  'question-patterns'?: QuestionPatternsSection
  materials?: MaterialsSection
  references?: ReferencesSection
  projects?: ProjectsSection
  'interview-questions'?: InterviewQuestionsSection
  'scenario-questions'?: ScenarioQuestionsSection
  'case-studies'?: CaseStudiesSection
  'exam-prep'?: ExamPrepSection
  'course-prep'?: CoursePrepSection
  mastery?: MasterySection
}

export type SectionKey = keyof TopicSections

/* ------------------------------------------------------------------ */
/* Subject-level extras — aggregate prep material shown on the subject  */
/* page itself, authored once per subject (independent of any topic).   */
/* Each lives in its own optional file: src/content/subjects/<id>/      */
/* <interview|scenarios|case-studies|projects|quiz>.json.               */
/* ------------------------------------------------------------------ */

export interface SubjectExtras {
  interview?: InterviewQuestionsSection
  scenarios?: ScenarioQuestionsSection
  caseStudies?: CaseStudiesSection
  projects?: ProjectsSection
  quiz?: ExamPrepSection
  resources?: ResourcesSection
  pitfalls?: PitfallsSection
  cheatsheet?: CheatSheetSection
  glossary?: GlossarySection
}

export type SubjectExtraKey = keyof SubjectExtras

/**
 * Tiny per-subject manifest listing how many items each extra has. Loaded on
 * every subject page (for the tab count badges) without pulling the — possibly
 * very large — item bodies, which are fetched per category on demand.
 */
export interface SubjectExtrasManifest {
  counts: Partial<Record<SubjectExtraKey, number>>
}

/** UI metadata for a subject-level extra: its tab and URL slug. */
export interface SubjectExtraDescriptor {
  key: SubjectExtraKey
  /** URL segment under `/subjects/:id/`. */
  slug: string
  label: string
  icon: string
}

/* ------------------------------------------------------------------ */
/* Assembled, in-memory shapes used by the UI.                         */
/* ------------------------------------------------------------------ */

/** The min/max difficulty span across a subject's topics. */
export interface LevelRange {
  min: Difficulty
  max: Difficulty
}

export interface Topic extends TopicMeta {
  subjectId: string
  /**
   * Which sections this topic provides, in canonical order. The heavy section
   * bodies are fetched separately (per topic) and are not part of the tree.
   */
  sectionKeys: SectionKey[]
  /** Direct subtopics (topics whose parentId === this.id). */
  subtopics: Topic[]
}

export interface Subject extends SubjectMeta {
  roadmap?: Roadmap
  topics: Topic[]
  /** Total number of topics including subtopics. */
  topicCount: number
  levelRange: LevelRange
}

/**
 * Lightweight subject record used by listing/stat surfaces (home, subjects,
 * account). Carries no topic tree — just enough to render a card. Loaded from
 * the tiny `data/index.json` so those pages don't pull any topic data.
 */
export interface SubjectIndexEntry extends SubjectMeta {
  topicCount: number
  levelRange: LevelRange
  hasRoadmap: boolean
}

export interface SectionDescriptor {
  key: SectionKey
  label: string
  icon: string
}
