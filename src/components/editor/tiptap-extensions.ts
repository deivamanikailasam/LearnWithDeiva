import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import type { Editor } from '@tiptap/core'
import { AppCodeBlock } from './app-code-block'
import { PasteEnhancement } from './paste-enhancement'
import { GlossaryTerm } from './glossary-term'
import { tiptapTableExtensions } from './tiptap-table-extensions'
import { createMathExtensions } from './tiptap-math-extensions'

export function createTiptapExtensions(options?: { getEditor?: () => Editor | null }) {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
      link: false,
      codeBlock: false,
    }),
    AppCodeBlock.configure({
      HTMLAttributes: { class: 'tiptap-code-block' },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: 'text-brand-600 underline dark:text-brand-400' },
    }),
    Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full' } }),
    GlossaryTerm,
    ...tiptapTableExtensions,
    createMathExtensions(
      options?.getEditor ? { getEditor: options.getEditor } : undefined,
    ),
    Placeholder.configure({ placeholder: 'Paste or start writing…' }),
    PasteEnhancement,
  ]
}

export const tiptapExtensions = createTiptapExtensions()

export const tiptapEditorProps = {
  attributes: {
    class: 'tiptap-content rich-doc min-h-[12rem] focus:outline-none',
  },
}

export const tiptapEditEditorProps = {
  attributes: {
    class: 'tiptap-content rich-doc focus:outline-none',
  },
}
