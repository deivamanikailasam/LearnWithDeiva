import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Fragment, Slice } from '@tiptap/pm/model'
import {
  normalizePastedHtml,
  pastedHtmlLooksBroken,
} from '../../lib/normalize-pasted-html'
import {
  markdownPasteHasStructure,
  parseMarkdownPaste,
} from '../../lib/parse-markdown-paste'

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

            const html = clipboard.getData('text/html')
            const text = clipboard.getData('text/plain')
            if (!text) return false

            const normalized = html ? normalizePastedHtml(html) : ''

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
