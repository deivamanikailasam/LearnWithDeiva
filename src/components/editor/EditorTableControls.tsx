import { useEffect, useRef, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import type { Editor } from '@tiptap/core'

function TableToolbarButton({
  title,
  disabled,
  onClick,
  children,
}: {
  title: string
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'rounded px-1.5 py-0.5 text-xs font-medium transition',
        'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
        disabled && 'cursor-not-allowed opacity-40',
      )}
    >
      {children}
    </button>
  )
}

interface EditorTableControlsProps {
  editor: Editor
  run: (fn: () => boolean) => void
}

export function EditorTableControls({ editor, run }: EditorTableControlsProps) {
  const [insertOpen, setInsertOpen] = useState(false)
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [withHeader, setWithHeader] = useState(true)
  const popoverRef = useRef<HTMLDivElement>(null)

  const inTable = editor.isActive('table')

  useEffect(() => {
    if (!insertOpen) return
    const onPointerDown = (event: MouseEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) {
        setInsertOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [insertOpen])

  const insertTable = () => {
    run(() =>
      editor
        .chain()
        .focus()
        .insertTable({
          rows: Math.min(20, Math.max(1, rows)),
          cols: Math.min(12, Math.max(1, cols)),
          withHeaderRow: withHeader,
        })
        .run(),
    )
    setInsertOpen(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5">
      <div className="relative" ref={popoverRef}>
        <TableToolbarButton
          title="Insert table"
          onClick={() => setInsertOpen((open) => !open)}
        >
          ⊞ Table
        </TableToolbarButton>
        {insertOpen && (
          <div
            className={clsx(
              'absolute left-0 top-full z-30 mt-1 w-52 rounded-lg border p-3 shadow-lg',
              'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-900',
            )}
          >
            <p className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              New table
            </p>
            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="text-xs text-slate-600 dark:text-slate-400">
                Rows
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800"
                />
              </label>
              <label className="text-xs text-slate-600 dark:text-slate-400">
                Columns
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={cols}
                  onChange={(e) => setCols(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800"
                />
              </label>
            </div>
            <label className="mb-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={withHeader}
                onChange={(e) => setWithHeader(e.target.checked)}
              />
              Header row
            </label>
            <button type="button" className="btn-primary w-full text-xs" onClick={insertTable}>
              Insert
            </button>
          </div>
        )}
      </div>

      {inTable && (
        <>
          <span className="mx-0.5 text-slate-300 dark:text-slate-600">|</span>
          <TableToolbarButton
            title="Add row above"
            onClick={() => run(() => editor.chain().focus().addRowBefore().run())}
          >
            Row↑
          </TableToolbarButton>
          <TableToolbarButton
            title="Add row below"
            onClick={() => run(() => editor.chain().focus().addRowAfter().run())}
          >
            Row↓
          </TableToolbarButton>
          <TableToolbarButton
            title="Delete row"
            onClick={() => run(() => editor.chain().focus().deleteRow().run())}
          >
            −Row
          </TableToolbarButton>
          <TableToolbarButton
            title="Add column left"
            onClick={() => run(() => editor.chain().focus().addColumnBefore().run())}
          >
            Col←
          </TableToolbarButton>
          <TableToolbarButton
            title="Add column right"
            onClick={() => run(() => editor.chain().focus().addColumnAfter().run())}
          >
            Col→
          </TableToolbarButton>
          <TableToolbarButton
            title="Delete column"
            onClick={() => run(() => editor.chain().focus().deleteColumn().run())}
          >
            −Col
          </TableToolbarButton>
          <TableToolbarButton
            title="Toggle header row"
            onClick={() => run(() => editor.chain().focus().toggleHeaderRow().run())}
          >
            H row
          </TableToolbarButton>
          <TableToolbarButton
            title="Toggle header column"
            onClick={() => run(() => editor.chain().focus().toggleHeaderColumn().run())}
          >
            H col
          </TableToolbarButton>
          <TableToolbarButton
            title="Merge or split cells"
            onClick={() => run(() => editor.chain().focus().mergeOrSplit().run())}
          >
            Merge
          </TableToolbarButton>
          <TableToolbarButton
            title="Delete table"
            onClick={() => run(() => editor.chain().focus().deleteTable().run())}
          >
            ✕ Table
          </TableToolbarButton>
        </>
      )}
    </div>
  )
}
