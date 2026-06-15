import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'

// Register only the languages we actually use to keep the bundle small.
const languages: Record<string, Parameters<typeof SyntaxHighlighter.registerLanguage>[1]> = {
  javascript,
  js: javascript,
  typescript,
  ts: typescript,
  jsx,
  tsx,
  bash,
  shell: bash,
  json,
  css,
  html: markup,
  xml: markup,
  python,
  py: python,
  sql,
  yaml,
}
for (const [name, def] of Object.entries(languages)) {
  SyntaxHighlighter.registerLanguage(name, def)
}

export function CodeBlock({
  code,
  language = 'text',
  title,
}: {
  code: string
  language?: string
  title?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#282c34]">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2 sm:px-4">
        <span className="truncate text-xs font-medium text-slate-400">
          {title ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            background: 'transparent',
            fontSize: '0.8rem',
            padding: '0.875rem',
          }}
          codeTagProps={{ style: { fontFamily: 'var(--font-mono, monospace)' } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
