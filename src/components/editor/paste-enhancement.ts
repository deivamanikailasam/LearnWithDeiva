import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Fragment, Slice } from '@tiptap/pm/model'
import {
  normalizePastedHtml,
  pastedHtmlLooksBroken,
} from '../../lib/normalize-pasted-html'
import {
  markdownPasteHasStructure,
  markdownPasteHasTable,
  parseMarkdownPaste,
  parseTsvPaste,
  plainTextLooksLikeTsv,
} from '../../lib/parse-markdown-paste'

function clipboardHtmlHasTable(html: string): boolean {
  return /<table[\s>]/i.test(html)
}

function buildTableNode(
  schema: import('@tiptap/pm/model').Schema,
  rows: string[][],
  hasHeader: boolean,
): import('@tiptap/pm/model').Node | null {
  const table = schema.nodes.table
  const tableRow = schema.nodes.tableRow
  const tableCell = schema.nodes.tableCell
  const tableHeader = schema.nodes.tableHeader
  const paragraph = schema.nodes.paragraph
  if (!table || !tableRow || !tableCell || !paragraph) return null

  const makeCell = (text: string, header: boolean) => {
    const type = header && tableHeader ? tableHeader : tableCell
    const content = text
      ? [paragraph.create({}, schema.text(text))]
      : [paragraph.create()]
    return type.create({}, content)
  }

  const rowNodes = rows.map((cells, rowIndex) => {
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

function insertParsedMarkdown(
  view: import('@tiptap/pm/view').EditorView,
  text: string,
): boolean {
  const { schema } = view.state
  const codeBlock = schema.nodes.codeBlock
  const paragraph = schema.nodes.paragraph
  const heading = schema.nodes.heading
  if (!codeBlock || !paragraph) return false

  const blocks = parseMarkdownPaste(text)
  if (!blocks.length) return false

  const nodes = blocks
    .map((block) => {
      switch (block.type) {
        case 'code':
          return codeBlock.create(
            { language: block.language },
            block.code ? schema.text(block.code) : undefined,
          )
        case 'heading':
          return heading?.create(
            { level: block.level },
            block.text ? schema.text(block.text) : undefined,
          )
        case 'paragraph':
          return paragraph.create({}, block.text ? schema.text(block.text) : undefined)
        case 'table':
          return buildTableNode(schema, block.rows, block.hasHeader)
        default:
          return null
      }
    })
    .filter((n): n is NonNullable<typeof n> => n != null)

  if (!nodes.length) return false

  view.dispatch(view.state.tr.replaceSelection(new Slice(Fragment.from(nodes), 0, 0)).scrollIntoView())
  return true
}

export const PasteEnhancement = Extension.create({
  name: 'pasteEnhancement',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pasteEnhancement'),
        props: {
          transformPastedHTML(html) {
            return normalizePastedHtml(html)
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

            if (html && clipboardHtmlHasTable(html)) {
              return false
            }

            if (plainTextLooksLikeTsv(text)) {
              event.preventDefault()
              return insertTableFromRows(view, parseTsvPaste(text), true)
            }

            const normalized = html ? normalizePastedHtml(html) : ''

            if (markdownPasteHasTable(text) && (!html || !clipboardHtmlHasTable(html))) {
              event.preventDefault()
              return insertParsedMarkdown(view, text)
            }

            // Perplexity: plain-text markdown with fences is usually more faithful than HTML.
            if (markdownPasteHasStructure(text)) {
              const htmlBroken = !html || pastedHtmlLooksBroken(normalized || html)
              if (htmlBroken || /```/.test(text)) {
                return insertParsedMarkdown(view, text)
              }
            }

            return false
          },
        },
      }),
    ]
  },
})
