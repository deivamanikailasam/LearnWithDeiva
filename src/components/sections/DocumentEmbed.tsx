import { lazy, Suspense } from 'react'
import type {
  CaseStudyItem,
  CheatSheetGroup,
  ExamQuestion,
  PitfallItem,
  ProjectItem,
  QAItem,
  ResourceItem,
  ScenarioItem,
  SynonymItem,
} from '../../types/content'
import type { DocumentEmbedBlock, MermaidItem } from '../../types/rich-document'
import {
  CaseStudyCard,
  CheatSheetGroupCard,
  GlossaryTerm,
  InterviewQA,
  PitfallCard,
  ProjectCard,
  ResourceCard,
  ScenarioCard,
} from './SectionCards'
import { QuizItem } from './QuizItem'

const Mermaid = lazy(() => import('../Mermaid'))

function MermaidEmbed({ item }: { item: MermaidItem }) {
  return (
    <div className="card p-4">
      {item.title ? <p className="mb-2 font-semibold">{item.title}</p> : null}
      <Suspense
        fallback={
          <div className="h-32 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        }
      >
        <Mermaid chart={item.mermaid} />
      </Suspense>
      {item.caption ? (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.caption}</p>
      ) : null}
    </div>
  )
}

export function DocumentEmbed({
  block,
  quizIndex = 0,
}: {
  block: DocumentEmbedBlock
  quizIndex?: number
}) {
  switch (block.type) {
    case 'interview_qa':
      return <InterviewQA item={block.item as QAItem} />
    case 'scenario':
      return <ScenarioCard item={block.item as ScenarioItem} />
    case 'case_study':
      return <CaseStudyCard item={block.item as CaseStudyItem} />
    case 'project':
      return <ProjectCard item={block.item as ProjectItem} />
    case 'quiz':
      return <QuizItem item={block.item as ExamQuestion} index={quizIndex} />
    case 'resource':
      return <ResourceCard item={block.item as ResourceItem} />
    case 'pitfall':
      return <PitfallCard item={block.item as PitfallItem} />
    case 'cheatsheet':
      return <CheatSheetGroupCard group={block.item as CheatSheetGroup} />
    case 'glossary_term':
      return <GlossaryTerm item={block.item as SynonymItem} />
    case 'mermaid':
      return <MermaidEmbed item={block.item} />
    default:
      return null
  }
}
