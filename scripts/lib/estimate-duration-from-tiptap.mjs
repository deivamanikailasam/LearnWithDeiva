/**
 * Estimate study time from TipTap JSON. Keep in sync with
 * `src/lib/estimate-duration-from-tiptap.ts`.
 */

const WPM_BY_LEVEL = { beginner: 180, intermediate: 150, advanced: 120 }
const CODE_SECONDS_PER_LINE = { beginner: 12, intermediate: 15, advanced: 18 }
const PRACTICE_BUFFER = { beginner: 1.05, intermediate: 1.12, advanced: 1.18 }
const HEADING_MINUTES = 1
const IMAGE_MINUTES = 2
const DIAGRAM_MINUTES = 3
const LIST_ITEM_MINUTES = 0.5
const MIN_MINUTES = 5
const MAX_MINUTES = 8 * 60

function countWords(text) {
  const trimmed = String(text ?? '').trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

function textFromNodes(nodes) {
  if (!Array.isArray(nodes) || !nodes.length) return ''
  let out = ''
  for (const node of nodes) {
    if (node?.type === 'text' && typeof node.text === 'string') out += `${node.text} `
    if (Array.isArray(node?.content) && node.content.length) {
      out += `${textFromNodes(node.content)} `
    }
  }
  return out
}

function walkNode(node, stats) {
  if (!node || typeof node !== 'object') return

  switch (node.type) {
    case 'text':
      if (typeof node.text === 'string') stats.words += countWords(node.text)
      break
    case 'codeBlock': {
      const code = textFromNodes(node.content).trim()
      const lines = code ? code.split('\n').filter((line) => line.trim()).length : 0
      stats.codeLines += lines
      if (node.attrs?.language === 'mermaid') stats.diagrams += 1
      break
    }
    case 'heading':
      stats.headings += 1
      break
    case 'image':
      stats.images += 1
      break
    case 'listItem':
      stats.listItems += 1
      break
    default:
      break
  }

  if (Array.isArray(node.content)) {
    for (const child of node.content) walkNode(child, stats)
  }
}

function roundToNearestFive(minutes) {
  return Math.round(minutes / 5) * 5
}

export function estimateDurationFromTiptap(doc, level = 'beginner') {
  const stats = {
    words: 0,
    codeLines: 0,
    headings: 0,
    images: 0,
    diagrams: 0,
    listItems: 0,
  }

  if (doc?.type === 'doc' && Array.isArray(doc.content)) {
    for (const child of doc.content) walkNode(child, stats)
  }

  const wpm = WPM_BY_LEVEL[level] ?? WPM_BY_LEVEL.beginner
  let minutes = stats.words / wpm
  minutes += (stats.codeLines * (CODE_SECONDS_PER_LINE[level] ?? 12)) / 60
  minutes += stats.headings * HEADING_MINUTES
  minutes += stats.images * IMAGE_MINUTES
  minutes += stats.diagrams * DIAGRAM_MINUTES
  minutes += stats.listItems * LIST_ITEM_MINUTES
  minutes *= PRACTICE_BUFFER[level] ?? 1.1

  minutes = roundToNearestFive(Math.max(MIN_MINUTES, Math.min(MAX_MINUTES, minutes)))
  return Math.round((minutes / 60) * 100) / 100
}
