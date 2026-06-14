import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './CodeBlock'

const components: Components = {
  // Fenced code blocks render via our CodeBlock; inline code stays inline.
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className ?? '')
    const text = String(children).replace(/\n$/, '')
    if (match) {
      return <CodeBlock code={text} language={match[1]} />
    }
    return (
      <code
        className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-700 dark:bg-slate-800 dark:text-brand-300"
        {...props}
      >
        {children}
      </code>
    )
  },
  // Let CodeBlock own the <pre>; pass through to avoid a nested <pre>.
  pre({ children }) {
    return <>{children}</>
  },
  a({ children, ...props }) {
    return (
      <a {...props} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  },
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 prose-a:text-brand-600 dark:prose-a:text-brand-400">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
