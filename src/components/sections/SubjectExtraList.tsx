import { Fragment } from 'react'
import { WindowVirtualizer } from 'virtua'
import type {
  CaseStudyItem,
  CheatSheetGroup,
  ExamQuestion,
  PitfallItem,
  ProjectItem,
  QAItem,
  ResourceItem,
  ScenarioItem,
  SubjectExtraKey,
  SubjectExtras,
  SynonymItem,
} from '../../types/content'
import {
  CaseStudyCard,
  CheatSheetGroupCard,
  GlossaryTerm,
  InterviewQA,
  PitfallCard,
  ProjectCard,
  ResourceCard,
  ScenarioCard,
} from './SectionView'
import { QuizItem } from './QuizItem'

/**
 * Above this many items the list is windowed against the page scroll so only
 * the rows near the viewport are mounted — keeping render cost flat no matter
 * how large a subject's interview/quiz bank grows. Mirrors `TopicTree`.
 */
const VIRTUALIZE_THRESHOLD = 30

type ExtraItem =
  | QAItem
  | ScenarioItem
  | CaseStudyItem
  | ProjectItem
  | ExamQuestion
  | ResourceItem
  | PitfallItem
  | CheatSheetGroup
  | SynonymItem

function renderItem(key: SubjectExtraKey, item: ExtraItem, index: number) {
  switch (key) {
    case 'interview':
      return <InterviewQA item={item as QAItem} />
    case 'scenarios':
      return <ScenarioCard item={item as ScenarioItem} />
    case 'caseStudies':
      return <CaseStudyCard item={item as CaseStudyItem} />
    case 'projects':
      return <ProjectCard item={item as ProjectItem} />
    case 'quiz':
      return <QuizItem item={item as ExamQuestion} index={index} />
    case 'resources':
      return <ResourceCard item={item as ResourceItem} />
    case 'pitfalls':
      return <PitfallCard item={item as PitfallItem} />
    case 'cheatsheet':
      return <CheatSheetGroupCard group={item as CheatSheetGroup} />
    case 'glossary':
      return <GlossaryTerm item={item as SynonymItem} />
    default:
      return null
  }
}

/**
 * Renders one subject-level extra category. Small lists use the natural layout
 * (projects in a 2-up grid); large lists are virtualized as a single column.
 */
export function SubjectExtraList({
  extraKey,
  data,
}: {
  extraKey: SubjectExtraKey
  data: NonNullable<SubjectExtras[SubjectExtraKey]>
}) {
  const items = (data.items ?? []) as ExtraItem[]

  if (items.length > VIRTUALIZE_THRESHOLD) {
    return (
      <WindowVirtualizer>
        {items.map((item, i) => (
          <div key={i} className="pb-4">
            {renderItem(extraKey, item, i)}
          </div>
        ))}
      </WindowVirtualizer>
    )
  }

  const isGrid = extraKey === 'projects' || extraKey === 'glossary'
  return (
    <div className={isGrid ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
      {items.map((item, i) => (
        <Fragment key={i}>{renderItem(extraKey, item, i)}</Fragment>
      ))}
    </div>
  )
}
