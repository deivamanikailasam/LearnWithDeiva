export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type RichText =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; text: string; href: string }

export type ProseBlock =
  | { type: 'title'; content: RichText[] }
  | { type: 'heading'; level: 1 | 2 | 3 | 4; content: RichText[] }
  | { type: 'paragraph'; content: RichText[] }
  | { type: 'list'; ordered?: boolean; items: { content: RichText[] }[] }
  | { type: 'code_block'; language?: string; code: string }
  | { type: 'divider' }

/* ----- embed `item` payloads (same JSON shapes as section / subject extras) ----- */

export interface InterviewQAItem {
  question: string
  answer: string
  difficulty?: Difficulty
  tags?: string[]
}

export interface ScenarioItem {
  scenario: string
  question: string
  answer: string
}

export interface CaseStudyItem {
  title: string
  context: string
  problem: string
  solution: string
  outcome: string
}

export interface ProjectItem {
  title: string
  difficulty: Difficulty
  description: string
  requirements?: string[]
}

export interface QuizItem {
  question: string
  options?: string[]
  answer: string
  explanation?: string
}

export interface ResourceItem {
  title: string
  type: 'article' | 'video' | 'book' | 'course' | 'docs' | 'tool' | 'reference'
  url: string
  description?: string
  author?: string
}

export interface PitfallItem {
  title: string
  avoid: string
  prefer: string
  why?: string
  example?: string
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

export interface GlossaryTermItem {
  term: string
  definition: string
}

export interface MermaidItem {
  title?: string
  mermaid: string
  caption?: string
}

/** Embedded cards and diagrams inside a rich document. */
export type DocumentEmbedBlock =
  | { type: 'interview_qa'; item: InterviewQAItem }
  | { type: 'scenario'; item: ScenarioItem }
  | { type: 'case_study'; item: CaseStudyItem }
  | { type: 'project'; item: ProjectItem }
  | { type: 'quiz'; item: QuizItem }
  | { type: 'resource'; item: ResourceItem }
  | { type: 'pitfall'; item: PitfallItem }
  | { type: 'cheatsheet'; item: CheatSheetGroup }
  | { type: 'glossary_term'; item: GlossaryTermItem }
  | { type: 'mermaid'; item: MermaidItem }

export type Block = ProseBlock | DocumentEmbedBlock
export type DocumentEmbedType = DocumentEmbedBlock['type']

export interface DocumentData {
  id: string
  title: string
  blocks: Block[]
}
