import { Mark, mergeAttributes } from '@tiptap/core'

/** Inline glossary term — stores a local definition on the marked text. */
export const GlossaryTerm = Mark.create({
  name: 'glossaryTerm',

  inclusive: false,

  addAttributes() {
    return {
      definition: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-definition'),
        renderHTML: (attributes) => {
          if (!attributes.definition) return {}
          return { 'data-definition': attributes.definition }
        },
      },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-glossary-term]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-glossary-term': '',
        class: 'glossary-term',
        role: 'button',
        tabindex: '0',
      }),
      0,
    ]
  },
})
