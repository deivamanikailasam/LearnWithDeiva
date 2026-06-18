import clsx from 'clsx'
import { DIFFICULTY_VALUES } from '../../lib/content-validation'
import { topicLevelStyles } from '../../lib/topic-level-styles'
import type { Difficulty } from '../../types/content'
import { fieldErrorClass, labelClass } from '../../lib/form-styles'

interface LevelSelectProps {
  value: Difficulty
  onChange: (level: Difficulty) => void
  disabled?: boolean
  error?: string
  compact?: boolean
}

export function LevelSelect({
  value,
  onChange,
  disabled,
  error,
  compact = false,
}: LevelSelectProps) {
  return (
    <div className={compact ? 'min-w-0' : undefined}>
      <span className={labelClass}>Level</span>
      <div
        role="radiogroup"
        aria-label="Topic level"
        className={clsx(
          'inline-flex rounded-lg border border-slate-200 bg-slate-100/80 p-0.5 dark:border-slate-700 dark:bg-slate-800/80',
          compact ? 'w-full' : 'w-full sm:w-auto',
        )}
      >
        {DIFFICULTY_VALUES.map((level) => {
          const selected = value === level
          return (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(level)}
              className={clsx(
                'flex-1 rounded-md px-2 py-1.5 text-xs font-semibold capitalize transition sm:px-3',
                selected
                  ? clsx(topicLevelStyles[level], 'shadow-sm')
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {level}
            </button>
          )
        })}
      </div>
      {error && <p className={fieldErrorClass}>{error}</p>}
    </div>
  )
}
