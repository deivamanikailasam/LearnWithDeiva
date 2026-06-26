import { normalizeLatexForKatex, looksLikeLatexFormulaLine } from './normalize-latex-for-katex'
import { clipboardHtmlHasMath } from './paste-math'

/** @deprecated Use {@link clipboardHtmlHasMath}. */
export function clipboardHtmlHasKatex(html: string): boolean {
  return clipboardHtmlHasMath(html)
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

function extractLatexFromAnnotation(el: Element): string | null {
  const enc = el.getAttribute('encoding') ?? ''
  if (!enc.includes('tex')) return null
  return el.textContent?.trim() || null
}

function insertMathNode(
  doc: Document,
  el: Element,
  latex: string,
  display: boolean,
): void {
  const normalized = normalizeLatexForKatex(latex)
  if (!normalized) return

  if (display) {
    const div = doc.createElement('div')
    div.setAttribute('data-type', 'block-math')
    div.setAttribute('data-latex', normalized)
    el.replaceWith(div)
    return
  }

  const span = doc.createElement('span')
  span.setAttribute('data-type', 'inline-math')
  span.setAttribute('data-latex', normalized)
  el.replaceWith(span)
}

function preprocessStandaloneTexAnnotations(doc: Document): boolean {
  let modified = false

  for (const ann of doc.querySelectorAll('annotation[encoding*="tex" i]')) {
    if (!(ann instanceof Element)) continue
    if (ann.closest('[data-type="inline-math"], [data-type="block-math"], .katex')) continue

    const latex = extractLatexFromAnnotation(ann)
    if (!latex) continue

    const host =
      ann.closest('.katex-display, .katex, math, [class*="math-display"]') ??
      ann.parentElement
    if (!host) continue

    const display =
      host.matches('.katex-display, [class*="math-display"]') ||
      looksLikeLatexFormulaLine(latex)
    insertMathNode(doc, host, latex, display)
    modified = true
  }

  return modified
}

/**
 * Replace KaTeX-rendered spans with TipTap-parseable math nodes before HTML paste.
 * Also handles standalone TeX annotations (Claude / ChatGPT / Perplexity variants).
 */
export function preprocessKatexHtml(html: string): string {
  if (!clipboardHtmlHasMath(html)) return html

  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    let modified = preprocessStandaloneTexAnnotations(doc)

    for (const el of doc.querySelectorAll('.katex-display')) {
      if (el.closest('[data-type="block-math"]')) continue
      const latex = normalizeLatexForKatex(extractLatexFromKatex(el) ?? '')
      if (!latex) continue
      insertMathNode(doc, el, latex, true)
      modified = true
    }

    for (const el of doc.querySelectorAll('span.katex')) {
      if (el.closest('[data-type]') || el.closest('.katex-display')) continue
      const raw = extractLatexFromKatex(el)
      if (!raw) continue
      const latex = normalizeLatexForKatex(raw)
      const useBlock = looksLikeLatexFormulaLine(latex)
      insertMathNode(doc, el, latex, useBlock)
      modified = true
    }

    for (const el of doc.querySelectorAll('[data-latex]')) {
      if (el.closest('[data-type="inline-math"], [data-type="block-math"]')) continue
      const latex = el.getAttribute('data-latex')?.trim()
      if (!latex) continue
      const display =
        el.matches('.katex-display, [class*="display"]') ||
        looksLikeLatexFormulaLine(latex)
      insertMathNode(doc, el, latex, display)
      modified = true
    }

    return modified ? doc.body.innerHTML : html
  } catch {
    return html
  }
}
