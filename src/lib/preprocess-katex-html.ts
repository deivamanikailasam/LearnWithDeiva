import { normalizeLatexForKatex, looksLikeLatexFormulaLine } from './normalize-latex-for-katex'

/** Clipboard HTML from Perplexity / ChatGPT with rendered KaTeX math. */
export function clipboardHtmlHasKatex(html: string): boolean {
  return /katex|application\/x-tex|data-latex/i.test(html)
}

function extractLatexFromKatex(el: Element): string | null {
  for (const ann of el.querySelectorAll('annotation')) {
    const enc = ann.getAttribute('encoding') ?? ''
    if (enc.includes('tex')) {
      const text = ann.textContent?.trim()
      if (text) return text
    }
  }

  const mathmlAnn = el.querySelector('.katex-mathml annotation')
  if (mathmlAnn?.textContent?.trim()) return mathmlAnn.textContent.trim()

  const dataLatex = el.getAttribute('data-latex')
  if (dataLatex?.trim()) return dataLatex.trim()

  return null
}

/**
 * Replace KaTeX-rendered spans with TipTap-parseable math nodes before HTML paste.
 * Perplexity stores LaTeX in annotation[encoding="application/x-tex"].
 */
export function preprocessKatexHtml(html: string): string {
  if (!clipboardHtmlHasKatex(html)) return html

  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    let modified = false

    for (const el of doc.querySelectorAll('.katex-display')) {
      if (el.closest('[data-type="block-math"]')) continue
      const latex = normalizeLatexForKatex(extractLatexFromKatex(el) ?? '')
      if (!latex) continue
      const div = doc.createElement('div')
      div.setAttribute('data-type', 'block-math')
      div.setAttribute('data-latex', latex)
      el.replaceWith(div)
      modified = true
    }

    for (const el of doc.querySelectorAll('span.katex')) {
      if (el.closest('[data-type]') || el.closest('.katex-display')) continue
      const raw = extractLatexFromKatex(el)
      if (!raw) continue
      const latex = normalizeLatexForKatex(raw)
      const useBlock = looksLikeLatexFormulaLine(latex)
      if (useBlock) {
        const div = doc.createElement('div')
        div.setAttribute('data-type', 'block-math')
        div.setAttribute('data-latex', latex)
        el.replaceWith(div)
      } else {
        const span = doc.createElement('span')
        span.setAttribute('data-type', 'inline-math')
        span.setAttribute('data-latex', latex)
        el.replaceWith(span)
      }
      modified = true
    }

    return modified ? doc.body.innerHTML : html
  } catch {
    return html
  }
}
