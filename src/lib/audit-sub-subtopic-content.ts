import type { Topic } from '../types/content'

/** Card styling for topics flagged by the dev-only content audit. */
export const CONTENT_GAP_CARD_CLASS =
  'border-amber-400 bg-amber-50 ring-1 ring-amber-300/60 dark:border-amber-500/50 dark:bg-amber-500/10 dark:ring-amber-500/30'

/** Minimum content-duration every sub-subtopic must meet. No upper bound —
 *  longer than 3h is acceptable. */
export const MIN_CONTENT_HOURS = 1.5

/** Why a sub-subtopic was flagged by the audit. Mirrors the CONTENT-FORMAT gates. */
export type AuditReason =
  | 'missing-content'
  | 'duration'
  | 'invalid-tiptap'
  | 'missing-svg'

const REASON_LABELS: Record<AuditReason, string> = {
  'missing-content': 'missing content',
  duration: 'duration under 1.5h',
  'invalid-tiptap': 'invalid TipTap content',
  'missing-svg': 'no SVG image',
}

export function auditReasonLabel(reason: AuditReason): string {
  return REASON_LABELS[reason]
}

/** Result of auditing a subject's sub-subtopics. */
export interface SubSubtopicAudit {
  /**
   * All topic ids to highlight: every failing sub-subtopic plus its ancestor
   * chain (root + intermediate subtopic), so the failing branch is visible and
   * navigable in a collapsed tree and on the roadmap.
   */
  flaggedTopicIds: Set<string>
  /** The failing sub-subtopics only, mapped to their failure reasons. */
  reasonsBySubSubtopicId: Map<string, AuditReason[]>
  /** How many distinct sub-subtopics tripped each reason. */
  breakdown: Record<AuditReason, number>
  /** Total number of failing sub-subtopics. */
  failingCount: number
}

/**
 * Evaluate one sub-subtopic against the CONTENT-FORMAT gates. Duration, TipTap
 * validity, and SVG presence are only checkable once content exists, so a
 * sub-subtopic with no content reports only `missing-content`.
 */
function auditSubSubtopic(topic: Topic): AuditReason[] {
  if (!topic.hasContent || topic.contentSectionCount === 0) {
    return ['missing-content']
  }
  // Duration, TipTap validity, and SVG presence are only assessable for TipTap
  // `document.json` bodies (the signals are undefined for legacy content), so a
  // legacy body with content is not flagged by these checks.
  const reasons: AuditReason[] = []
  if (typeof topic.contentHours === 'number' && topic.contentHours < MIN_CONTENT_HOURS) {
    reasons.push('duration')
  }
  if (topic.tiptapValid === false) reasons.push('invalid-tiptap')
  if (topic.hasSvgImage === false) reasons.push('missing-svg')
  return reasons
}

/**
 * Audit every sub-subtopic (two levels below a root topic) in a subject and
 * collect the ids to highlight plus a per-reason breakdown.
 */
export function auditSubSubtopicContent(topics: readonly Topic[]): SubSubtopicAudit {
  const flaggedTopicIds = new Set<string>()
  const reasonsBySubSubtopicId = new Map<string, AuditReason[]>()
  const breakdown: Record<AuditReason, number> = {
    'missing-content': 0,
    duration: 0,
    'invalid-tiptap': 0,
    'missing-svg': 0,
  }

  for (const root of topics) {
    for (const sub of root.subtopics) {
      for (const subSub of sub.subtopics) {
        const reasons = auditSubSubtopic(subSub)
        if (reasons.length === 0) continue
        reasonsBySubSubtopicId.set(subSub.id, reasons)
        for (const reason of reasons) breakdown[reason] += 1
        // Highlight the failing leaf and its ancestor chain.
        flaggedTopicIds.add(subSub.id)
        flaggedTopicIds.add(sub.id)
        flaggedTopicIds.add(root.id)
      }
    }
  }

  return {
    flaggedTopicIds,
    reasonsBySubSubtopicId,
    breakdown,
    failingCount: reasonsBySubSubtopicId.size,
  }
}

export function isContentGapHighlighted(
  contentGapTopicIds: ReadonlySet<string> | null | undefined,
  topicId: string | undefined,
): boolean {
  return Boolean(topicId && contentGapTopicIds?.has(topicId))
}
