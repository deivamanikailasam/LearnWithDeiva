import { isLanguageLabel, normalizeLanguage } from './code-languages'
import { stripCitationsFromHtml } from './strip-perplexity-citations'

function languageFromCodeEl(code: Element | null): string | null {
  if (!code) return null
  const cls = code.getAttribute('class') ?? ''
  const fromClass =
    cls.match(/(?:^|\s)language-([\w+#.-]+)/i)?.[1] ??
    cls.match(/(?:^|\s)lang-([\w+#.-]+)/i)?.[1] ??
    cls.match(/(?:^|\s)hljs-([\w+#.-]+)/i)?.[1]
  if (fromClass && !['hljs', 'highlight'].includes(fromClass.toLowerCase())) {
    return normalizeLanguage(fromClass)
  }
  const dataLang = code.getAttribute('data-language') ?? code.getAttribute('data-lang')
  if (dataLang) return normalizeLanguage(dataLang)
  return null
}

function isCopyUi(el: Element): boolean {
  const text = (el.textContent ?? '').trim().toLowerCase()
  if (text === 'copy' || text === 'copied') return true
  if (el.matches('button, [role="button"], svg, [aria-label*="copy" i]')) return true
  return false
}

function isCodeLikeText(text: string): boolean {
  const t = text.trim()
  if (!t || isLanguageLabel(t)) return false
  if (t.length > 500) return false
  if (/\b(the|and|for|with|used|heavily|common|operations|immutable|sequence)\b/i.test(t)) {
    return false
  }
  return (
    /^\s*(import|from|def|class|return|if|for|while|const|let|var|fn|func|public|private)\b/.test(
      t,
    ) ||
    /^\s*[\w.]+\s*=\s*[^=]/.test(t) ||
    /^\s*#\s*\w/.test(t) ||
    (/^[\s\t]*[\w$]+\([^)]*\)\s*[;{]?$/.test(t) && !/\s{2,}/.test(t))
  )
}

function looksLikeCodeLine(el: Element): boolean {
  if (el.tagName === 'PRE') return true
  if (isCopyUi(el)) return false

  const text = el.textContent?.trim() ?? ''
  if (!text || isLanguageLabel(text)) return false

  if (el.tagName === 'CODE') {
    return Boolean(el.closest('pre'))
  }
  if (el.querySelector('code') && !el.querySelector('pre, table')) return false

  const cls = el.getAttribute('class') ?? ''
  if (/\b(code|mono|hljs|language-|font-mono)\b/i.test(cls)) return true

  const style = el.getAttribute('style') ?? ''
  if (/monospace|mono/i.test(style)) return true

  return isCodeLikeText(text)
}

function lineText(el: Element): string {
  if (el.tagName === 'CODE') return el.textContent ?? ''
  const code = el.querySelector('code')
  if (code && (el.textContent ?? '').trim() === (code.textContent ?? '').trim()) {
    return code.textContent ?? ''
  }
  return el.textContent ?? ''
}

function languageNearPre(pre: Element): string | null {
  const code = pre.querySelector('code')
  const fromCode = languageFromCodeEl(code)
  if (fromCode && fromCode !== 'text') return fromCode

  const dataLang = pre.getAttribute('data-language') ?? pre.getAttribute('data-lang')
  if (dataLang) return normalizeLanguage(dataLang)

  let sib: Element | null = pre.previousElementSibling
  for (let i = 0; i < 3 && sib; i++) {
    if (isCopyUi(sib)) {
      sib = sib.previousElementSibling
      continue
    }
    const label = sib.textContent?.trim() ?? ''
    if (isLanguageLabel(label)) return normalizeLanguage(label)
    sib = sib.previousElementSibling
  }

  const parent = pre.parentElement
  if (parent) {
    for (const child of parent.children) {
      if (child === pre) break
      if (isCopyUi(child)) continue
      const label = child.textContent?.trim() ?? ''
      if (isLanguageLabel(label) && child.tagName !== 'PRE' && !child.querySelector('pre')) {
        return normalizeLanguage(label)
      }
    }
  }

  return fromCode
}

function writePre(doc: Document, language: string | null, code: string): HTMLPreElement {
  const pre = doc.createElement('pre')
  const codeEl = doc.createElement('code')
  codeEl.textContent = code
  if (language) {
    pre.setAttribute('data-language', language)
    codeEl.className = `language-${language}`
  }
  pre.appendChild(codeEl)
  return pre
}

function preCodeText(pre: Element): string {
  return (pre.querySelector('code') ?? pre).textContent?.trim() ?? ''
}

/** Absorb following sibling lines into an empty or label-only `<pre>`. */
function absorbTrailingCodeLines(pre: Element): void {
  const language = languageNearPre(pre)
  let body = preCodeText(pre)
  if (body && !isLanguageLabel(body)) return

  const lines: string[] = []
  let sib = pre.nextElementSibling
  while (sib) {
    if (isCopyUi(sib)) {
      sib = sib.nextElementSibling
      continue
    }
    if (!looksLikeCodeLine(sib)) break
    const t = lineText(sib).trimEnd()
    if (t) lines.push(t)
    const next = sib.nextElementSibling
    sib.remove()
    sib = next
  }

  if (!lines.length) {
    if (!body || isLanguageLabel(body)) pre.remove()
    return
  }

  const preEl = writePre(pre.ownerDocument, language, lines.join('\n'))
  pre.replaceWith(preEl)
}

/** Merge runs of sibling code-line elements into a single `<pre>`. */
function mergeSiblingCodeRuns(container: Element): void {
  const children = () => [...container.children]

  for (let i = 0; i < children().length; i++) {
    const el = children()[i]
    if (!el || el.tagName === 'PRE') continue

    let language: string | null = null
    const lines: string[] = []
    const toRemove: Element[] = []

    let j = i
    const list = children()
    while (j < list.length) {
      const cur = list[j]
      if (!cur || cur.tagName === 'PRE') break
      if (isCopyUi(cur)) {
        toRemove.push(cur)
        j++
        continue
      }
      const text = cur.textContent?.trim() ?? ''
      if (!text) {
        j++
        continue
      }
      if (isLanguageLabel(text) && lines.length === 0) {
        language = normalizeLanguage(text)
        toRemove.push(cur)
        j++
        continue
      }
      if (looksLikeCodeLine(cur) || (lines.length > 0 && isCodeLikeText(text))) {
        lines.push(lineText(cur).trimEnd())
        toRemove.push(cur)
        j++
        continue
      }
      break
    }

    if (
      lines.length >= 2 ||
      (lines.length === 1 && language && isCodeLikeText(lines[0]))
    ) {
      const pre = writePre(container.ownerDocument, language, lines.join('\n'))
      toRemove[0].replaceWith(pre)
      for (let k = 1; k < toRemove.length; k++) toRemove[k].remove()
      i = children().indexOf(pre)
    } else {
      i++
    }
  }
}

function hoistCodeFromContainers(doc: Document): void {
  // Perplexity wraps label + lines in a parent div without a single <pre>.
  for (const container of doc.querySelectorAll('div, section, article')) {
    if (container.querySelector('pre')) continue
    const kids = [...container.children]
    const hasLabel = kids.some((k) => isLanguageLabel(k.textContent?.trim() ?? ''))
    const codeKids = kids.filter((k) => looksLikeCodeLine(k) && !isCopyUi(k))
    if (!hasLabel || codeKids.length < 1) continue

    let language: string | null = null
    const lines: string[] = []
    for (const kid of kids) {
      if (isCopyUi(kid)) continue
      const text = kid.textContent?.trim() ?? ''
      if (isLanguageLabel(text)) {
        language = normalizeLanguage(text)
        continue
      }
      if (looksLikeCodeLine(kid)) lines.push(lineText(kid).trimEnd())
    }
    if (lines.length) {
      container.replaceWith(writePre(doc, language, lines.join('\n')))
    }
  }
}

/**
 * Normalize rich clipboard HTML (Perplexity, ChatGPT, Docs) into clean
 * `<pre><code class="language-…">` blocks TipTap can parse.
 */
export function normalizePastedHtml(html: string): string {
  if (!html.trim()) return html
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    hoistCodeFromContainers(doc)
    mergeSiblingCodeRuns(doc.body)
    for (const container of doc.querySelectorAll('div, section, article, main')) {
      mergeSiblingCodeRuns(container)
    }
    for (const pre of [...doc.querySelectorAll('pre')]) {
      absorbTrailingCodeLines(pre)
    }
    return stripCitationsFromHtml(doc.body.innerHTML)
  } catch {
    return html
  }
}

export function pastedHtmlLooksBroken(html: string): boolean {
  if (!html.trim()) return true
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    for (const pre of doc.querySelectorAll('pre')) {
      const body = preCodeText(pre)
      if (!body || isLanguageLabel(body)) return true
    }
    const pres = doc.querySelectorAll('pre').length
    const codeish = [...doc.body.querySelectorAll('div, p, code')].filter((el) =>
      looksLikeCodeLine(el),
    ).length
    return codeish > pres + 2
  } catch {
    return true
  }
}
