import { lazy, Suspense } from 'react'

const CodeBlock = lazy(() =>
  import('./CodeBlock').then((m) => ({ default: m.CodeBlock })),
)

function CodeBlockFallback({
  code,
  language = 'text',
  title,
}: {
  code: string
  language?: string
  title?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#282c34]">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2 sm:px-4">
        <span className="truncate text-xs font-medium text-slate-400">
          {title ?? language}
        </span>
      </div>
      <pre className="overflow-x-auto p-3.5 font-mono text-[0.8rem] text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function LazyCodeBlock({
  code,
  language,
  title,
}: {
  code: string
  language?: string
  title?: string
}) {
  return (
    <Suspense fallback={<CodeBlockFallback code={code} language={language} title={title} />}>
      <CodeBlock code={code} language={language} title={title} />
    </Suspense>
  )
}
