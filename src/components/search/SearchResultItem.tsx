import clsx from 'clsx'
import type { SearchDoc } from '../../lib/search'
import { SECTION_ICONS } from '../../content/sections'

const typeMeta: Record<SearchDoc['type'], { icon: string; label: string }> = {
  subject: { icon: '📦', label: 'Subject' },
  topic: { icon: '📄', label: 'Topic' },
  section: { icon: '🔖', label: 'Section' },
}

function resultIcon(doc: SearchDoc): string {
  if (doc.type === 'section' && doc.sectionKey) {
    return SECTION_ICONS[doc.sectionKey] ?? '🔖'
  }
  return typeMeta[doc.type].icon
}

export function SearchResultItem({
  doc,
  active = false,
  onClick,
}: {
  doc: SearchDoc
  active?: boolean
  onClick?: () => void
}) {
  const crumb = [doc.subjectTitle, doc.type === 'section' ? doc.topicTitle : null]
    .filter(Boolean)
    .join(' › ')

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition',
        active
          ? 'border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10'
          : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
      )}
    >
      <span className="mt-0.5 text-lg">{resultIcon(doc)}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-semibold">{doc.title}</span>
          {doc.sectionLabel && <span className="chip shrink-0">{doc.sectionLabel}</span>}
        </span>
        {crumb && <span className="block truncate text-xs text-slate-400">{crumb}</span>}
        {doc.text && (
          <span className="mt-0.5 line-clamp-2 block text-sm text-slate-500">
            {doc.text}
          </span>
        )}
      </span>
    </button>
  )
}
