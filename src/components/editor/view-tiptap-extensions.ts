import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { ViewCodeBlock } from './ViewCodeBlock'
import { GlossaryTerm } from './glossary-term'
import { tiptapTableExtensions } from './tiptap-table-extensions'
import { viewMathExtensions } from './tiptap-math-extensions'

/** TipTap extensions for read-only viewers (syntax-highlighted code blocks). */
export const viewTiptapExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4] },
    link: false,
    codeBlock: false,
  }),
  ViewCodeBlock,
  Link.configure({
    openOnClick: true,
    HTMLAttributes: { class: 'text-brand-600 underline dark:text-brand-400' },
  }),
  Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full' } }),
  GlossaryTerm,
  ...tiptapTableExtensions,
  viewMathExtensions,
]
