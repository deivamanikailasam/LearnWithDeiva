import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'

export const tiptapTableExtensions = [
  Table.configure({
    resizable: false,
    renderWrapper: true,
    HTMLAttributes: { class: 'tiptap-table' },
  }),
  TableRow,
  TableHeader.configure({
    HTMLAttributes: { class: 'tiptap-table-header' },
  }),
  TableCell.configure({
    HTMLAttributes: { class: 'tiptap-table-cell' },
  }),
]
