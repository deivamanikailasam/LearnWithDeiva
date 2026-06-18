import clsx from 'clsx'
import { useState } from 'react'
import { compactInputClass, fieldErrorClass } from '../../lib/form-styles'
import { normalizeTags } from '../../lib/content-validation'

export function TagsInput({
  tags,
  onChange,
  disabled,
  error,
}: {
  tags: string[]
  onChange: (tags: string[]) => void
  disabled?: boolean
  error?: string
}) {
  const [input, setInput] = useState('')

  const addFromInput = () => {
    const next = normalizeTags([...tags, ...input.split(/[,\s]+/)])
    onChange(next)
    setInput('')
  }

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="chip inline-flex items-center gap-1 text-xs">
            #{tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded px-0.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            )}
          </span>
        ))}
      </div>
      {!disabled && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addFromInput()
              }
            }}
            placeholder="Add tag and press Enter"
            className={clsx(compactInputClass, 'flex-1')}
          />
          <button
            type="button"
            onClick={addFromInput}
            className="btn border border-slate-200 px-2 py-1 text-xs dark:border-slate-700"
          >
            Add
          </button>
        </div>
      )}
      {error && <p className={fieldErrorClass}>{error}</p>}
    </div>
  )
}
