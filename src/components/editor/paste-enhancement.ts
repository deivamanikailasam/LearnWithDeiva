import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Fragment, Slice, type Node as PmNode, type Schema } from '@tiptap/pm/model'
import {
  normalizePastedHtml,
  pastedHtmlLooksBroken,
} from '../../lib/normalize-pasted-html'
import { inlineTextToPmNodes } from '../../lib/inline-math-to-nodes'
import { normalizeLatexForKatex } from '../../lib/normalize-latex-for-katex'
import {
  clipboardHtmlHasKatex,
  preprocessKatexHtml,
} from '../../lib/preprocess-katex-html'
import {
  markdownPasteHasStructure,
  markdownPasteHasTable,
  parseMarkdownPaste,
  parseTsvPaste,
  plainTextLooksLikeTsv,
  shouldPreferMarkdownPaste,
} from '../../lib/parse-markdown-paste'
import { migratePastedMath } from '../../lib/migrate-pasted-math'
import { pasteTextHasMath } from '../../lib/paste-math'

function clipboardHtmlHasTable(html: string): boolean {
  return /<table[\s>]/i.test(html)
}

function inlineTextToNodes(schema: Schema, text: string): PmNode[] {
  return inlineTextToPmNodes(schema, text)
}

function paragraphFromText(schema: Schema, text: string): PmNode | null {
  const paragraph = schema.nodes.paragraph
  if (!paragraph) return null
  const content = inlineTextToNodes(schema, text)
  return paragraph.create({}, content.length ? content : undefined)
}

function buildTableNode(
  schema: Schema,
  rows: string[][],
  hasHeader: boolean,
): PmNode | null {
  const table = schema.nodes.table
  const tableRow = schema.nodes.tableRow
  const tableCell = schema.nodes.tableCell
  const tableHeader = schema.nodes.tableHeader
  const paragraph = schema.nodes.paragraph
  if (!table || !tableRow || !tableCell || !paragraph) return null

  const makeCell = (text: string, header: boolean) => {
    const type = header && tableHeader ? tableHeader : tableCell
    const inline = inlineTextToNodes(schema, text)
    const content = inline.length ? [paragraph.create({}, inline)] : [paragraph.create()]
    return type.create({}, content)
  }

  const normalizedRows = rows.map((row) => {
    const maxCols = Math.max(...rows.map((r) => r.length))
    return Array.from({ length: maxCols }, (_, i) => row[i] ?? '')
  })

  const rowNodes = normalizedRows.map((cells, rowIndex) => {
    const headerRow = hasHeader && rowIndex === 0
    return tableRow.create({}, cells.map((cell) => makeCell(cell, headerRow)))
  })

  if (!rowNodes.length) return null
  return table.create({}, rowNodes)
}

function insertTableFromRows(
  view: import('@tiptap/pm/view').EditorView,
  rows: string[][],
  hasHeader: boolean,
): boolean {
  const node = buildTableNode(view.state.schema, rows, hasHeader)
  if (!node) return false

  view.dispatch(
    view.state.tr.replaceSelection(new Slice(Fragment.from(node), 0, 0)).scrollIntoView(),
  )
  return true
}

function readClipboardImage(
  clipboard: DataTransfer,
): Promise<{ src: string; alt: string } | null> {
  const items = [...clipboard.items]
  const imageItem = items.find((item) => item.type.startsWith('image/'))
  if (!imageItem) return Promise.resolve(null)

  const file = imageItem.getAsFile()
  if (!file) return Promise.resolve(null)

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        resolve(null)
        return
      }
      resolve({ src: reader.result, alt: file.name || 'Pasted image' })
    }
    reader.onerror = () => resolve(null)
    reader.readAsDataURL(file)
  })
}

function insertImage(
  view: import('@tiptap/pm/view').EditorView,
  src: string,
  alt: string,
): boolean {
  const { schema } = view.state
  const image = schema.nodes.image
  if (!image) return false

  const node = image.create({ src, alt })
  view.dispatch(view.state.tr.replaceSelection(new Slice(Fragment.from(node), 0, 0)).scrollIntoView())
  return true
}

function blockToNode(schema: Schema, block: ReturnType<typeof parseMarkdownPaste>[number]): PmNode | null {
  const codeBlock = schema.nodes.codeBlock
  const paragraph = schema.nodes.paragraph
  const heading = schema.nodes.heading
  const horizontalRule = schema.nodes.horizontalRule
  const bulletList = schema.nodes.bulletList
  const orderedList = schema.nodes.orderedList
  const listItem = schema.nodes.listItem
  const blockquote = schema.nodes.blockquote
  const blockMath = schema.nodes.blockMath

  switch (block.type) {
    case 'code':
      return codeBlock?.create(
        { language: block.language },
        block.code ? schema.text(block.code) : undefined,
      ) ?? null
    case 'heading':
      if (!heading) return paragraphFromText(schema, block.text)
      return heading.create({ level: block.level }, inlineTextToNodes(schema, block.text))
    case 'paragraph':
      return paragraphFromText(schema, block.text)
    case 'table':
      return buildTableNode(schema, block.rows, block.hasHeader)
    case 'blockMath':
      return blockMath?.create({ latex: normalizeLatexForKatex(block.latex) }) ?? null
    case 'horizontalRule':
      return horizontalRule?.create() ?? null
    case 'bulletList': {
      if (!bulletList || !listItem || !paragraph) return null
      const items = block.items.map((item) => {
        const content = paragraphFromText(schema, item)
        return listItem.create({}, content ? [content] : [paragraph.create()])
      })
      return bulletList.create({}, items)
    }
    case 'orderedList': {
      if (!orderedList || !listItem || !paragraph) return null
      const items = block.items.map((item) => {
        const content = paragraphFromText(schema, item)
        return listItem.create({}, content ? [content] : [paragraph.create()])
      })
      return orderedList.create({}, items)
    }
    case 'blockquote': {
      if (!blockquote || !paragraph) return null
      const paragraphs = block.paragraphs
        .map((text) => paragraphFromText(schema, text))
        .filter((node): node is PmNode => node != null)
      if (!paragraphs.length) return null
      return blockquote.create({}, paragraphs)
    }
    default:
      return null
  }
}

function insertParsedMarkdown(
  view: import('@tiptap/pm/view').EditorView,
  text: string,
): boolean {
  const { schema } = view.state
  const paragraph = schema.nodes.paragraph
  if (!paragraph) return false

  const blocks = parseMarkdownPaste(text)
  if (!blocks.length) return false

  const nodes = blocks
    .map((block) => blockToNode(schema, block))
    .filter((n): n is PmNode => n != null)

  if (!nodes.length) return false

  view.dispatch(view.state.tr.replaceSelection(new Slice(Fragment.from(nodes), 0, 0)).scrollIntoView())
  return true
}

export const PasteEnhancement = Extension.create({
  name: 'pasteEnhancement',

  addProseMirrorPlugins() {
    const editor = this.editor

    const scheduleMathMigration = (plainText: string, html?: string) => {
      const needsMath =
        pasteTextHasMath(plainText) || (html && clipboardHtmlHasKatex(html))
      if (!needsMath) return
      window.setTimeout(() => {
        if (editor.isDestroyed) return
        migratePastedMath(editor)
      }, 0)
    }

    return [
      new Plugin({
        key: new PluginKey('pasteEnhancement'),
        props: {
          transformPastedHTML(html) {
            return normalizePastedHtml(preprocessKatexHtml(html))
          },

          handlePaste(view, event) {
            const clipboard = event.clipboardData
            if (!clipboard) return false

            const imageItems = [...clipboard.items].filter((item) =>
              item.type.startsWith('image/'),
            )
            if (imageItems.length > 0) {
              event.preventDefault()
              void readClipboardImage(clipboard).then((image) => {
                if (image) insertImage(view, image.src, image.alt)
              })
              return true
            }

            const html = clipboard.getData('text/html')
            const text = clipboard.getData('text/plain')
            if (!text) return false

            // Plain-text LaTeX from Perplexity is more faithful than rendered KaTeX HTML.
            if (pasteTextHasMath(text)) {
              event.preventDefault()
              const ok = insertParsedMarkdown(view, text)
              if (ok) {
                scheduleMathMigration(text, html)
                return true
              }
            }

            if (plainTextLooksLikeTsv(text) && !pasteTextHasMath(text)) {
              event.preventDefault()
              return insertTableFromRows(view, parseTsvPaste(text), true)
            }

            const normalizedHtml = html ? normalizePastedHtml(html) : ''

            // Markdown tables in plain text are more reliable than Perplexity HTML tables.
            if (markdownPasteHasTable(text) && !pasteTextHasMath(text)) {
              event.preventDefault()
              return insertParsedMarkdown(view, text)
            }

            if (shouldPreferMarkdownPaste(text, html) && !pasteTextHasMath(text)) {
              event.preventDefault()
              return insertParsedMarkdown(view, text)
            }

            // Perplexity: plain-text markdown with fences is usually more faithful than HTML.
            if (markdownPasteHasStructure(text)) {
              const htmlBroken = !html || pastedHtmlLooksBroken(normalizedHtml || html)
              if (htmlBroken || /```/.test(text)) {
                event.preventDefault()
                return insertParsedMarkdown(view, text)
              }
            }

            // Let TipTap handle well-formed HTML (including native HTML tables).
            if (html && clipboardHtmlHasTable(html)) {
              return false
            }

            scheduleMathMigration(text, html)
            return false
          },
        },
      }),
    ]
  },
})
