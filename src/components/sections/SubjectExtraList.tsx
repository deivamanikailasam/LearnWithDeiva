import { Fragment } from 'react'
import { WindowVirtualizer } from 'virtua'
import type {
  CaseStudyItem,
  ExamQuestion,
  ProjectItem,
  QAItem,
  ScenarioItem,
  SectionKey,
  SubjectExtras,
} from '../../types/content'
import { CaseStudyCard, InterviewQA, ProjectCard, ScenarioCard } from './SectionView'
import { QuizItem } from './QuizItem'

/**
 * Above this many items the list is windowed against the page scroll so only
 * the rows near the viewport are mounted — keeping render cost flat no matter
 * how large a subject's interview/quiz bank grows. Mirrors `TopicTree`.
 */
const VIRTUALIZE_THRESHOLD = 30

type ExtraItem = QAItem | ScenarioItem | CaseStudyItem | ProjectItem | ExamQuestion

function renderItem(sectionKey: SectionKey, item: ExtraItem, index: number) {
  switch (sectionKey) {
    case 'interview-questions':
      return <InterviewQA item={item as QAItem} />
    case 'scenario-questions':
      return <ScenarioCard item={item as ScenarioItem} />
    case 'case-studies':
      return <CaseStudyCard item={item as CaseStudyItem} />
    case 'projects':
      return <ProjectCard item={item as ProjectItem} />
    case 'exam-prep':
      return <QuizItem item={item as ExamQuestion} index={index} />
    default:
      return null
  }
}

/**
 * Renders one subject-level extra category. Small lists use the natural layout
 * (projects in a 2-up grid); large lists are virtualized as a single column.
 */
export function SubjectExtraList({
  sectionKey,
  data,
}: {
  sectionKey: SectionKey
  data: NonNullable<SubjectExtras[keyof SubjectExtras]>
}) {
  const items = (data.items ?? []) as ExtraItem[]

  if (items.length > VIRTUALIZE_THRESHOLD) {
    return (
      <WindowVirtualizer>
        {items.map((item, i) => (
          <div key={i} className="pb-4">
            {renderItem(sectionKey, item, i)}
          </div>
        ))}
      </WindowVirtualizer>
    )
  }

  const isGrid = sectionKey === 'projects'
  return (
    <div className={isGrid ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
      {items.map((item, i) => (
        <Fragment key={i}>{renderItem(sectionKey, item, i)}</Fragment>
      ))}
    </div>
  )
}
