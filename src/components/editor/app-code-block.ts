import CodeBlock from '@tiptap/extension-code-block'
import { mergeAttributes } from '@tiptap/core'
import { normalizeLanguage } from '../../lib/code-languages'

/** Code block with a `language` attr for syntax highlighting in view mode. */
export const AppCodeBlock = CodeBlock.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        default: null,
        parseHTML: (element) => {
          const code = element.querySelector('code') ?? element
          const cls = code.getAttribute('class') ?? ''
          const fromClass =
            cls.match(/(?:^|\s)language-([\w+#.-]+)/i)?.[1] ??
            cls.match(/(?:^|\s)lang-([\w+#.-]+)/i)?.[1]
          if (fromClass) return normalizeLanguage(fromClass)
          const dataLang =
            element.getAttribute('data-language') ??
            code.getAttribute('data-language')
          return dataLang ? normalizeLanguage(dataLang) : null
        },
        renderHTML: (attributes) => {
          if (!attributes.language) return {}
          return {
            'data-language': attributes.language,
            class: `language-${attributes.language}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
        getAttrs: (node) => {
          if (!(node instanceof HTMLElement)) return {}
          const code = node.querySelector('code')
          const cls = code?.getAttribute('class') ?? ''
          const fromClass =
            cls.match(/(?:^|\s)language-([\w+#.-]+)/i)?.[1] ??
            cls.match(/(?:^|\s)lang-([\w+#.-]+)/i)?.[1]
          const dataLang =
            node.getAttribute('data-language') ?? code?.getAttribute('data-language')
          const language = fromClass ?? dataLang
          return language ? { language: normalizeLanguage(language) } : {}
        },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const language =
      typeof node.attrs.language === 'string' ? node.attrs.language : null
    const codeAttrs = language
      ? { class: `language-${language}`, 'data-language': language }
      : {}
    return [
      'pre',
      mergeAttributes(HTMLAttributes, language ? { 'data-language': language } : {}),
      ['code', codeAttrs, 0],
    ]
  },
})
