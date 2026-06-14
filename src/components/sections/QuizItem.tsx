import { useState } from 'react'
import clsx from 'clsx'
import type { ExamQuestion } from '../../types/content'
import { Markdown } from '../Markdown'

export function QuizItem({ item, index }: { item: ExamQuestion; index: number }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const hasOptions = !!item.options?.length

  return (
    <div className="card p-5">
      <p className="font-semibold">
        <span className="mr-2 text-brand-500">Q{index + 1}.</span>
        {item.question}
      </p>

      {hasOptions && (
        <ul className="mt-3 space-y-2">
          {item.options!.map((opt) => {
            const isCorrect = opt === item.answer
            const isPicked = opt === selected
            const show = revealed || isPicked
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(opt)
                    setRevealed(true)
                  }}
                  className={clsx(
                    'w-full rounded-lg border px-4 py-2 text-left text-sm transition',
                    !show &&
                      'border-slate-200 hover:border-brand-300 hover:bg-brand-50 dark:border-slate-700 dark:hover:bg-slate-800',
                    show && isCorrect &&
                      'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300',
                    show && isPicked && !isCorrect &&
                      'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300',
                    show && !isPicked && !isCorrect &&
                      'border-slate-200 opacity-60 dark:border-slate-700',
                  )}
                >
                  {opt}
                  {show && isCorrect && ' ✓'}
                  {show && isPicked && !isCorrect && ' ✗'}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {!hasOptions && (
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          className="btn-ghost mt-3 !px-3 !py-1 text-xs"
        >
          {revealed ? 'Hide answer' : 'Show answer'}
        </button>
      )}

      {revealed && (
        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800/50">
          {!hasOptions && (
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">
              {item.answer}
            </p>
          )}
          {item.explanation && (
            <div className="mt-1 text-slate-600 dark:text-slate-400">
              <Markdown>{item.explanation}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
