import type { Block, DocumentData } from '../../types/rich-document'
import { SectionView } from './SectionView'

/** @deprecated Use `SectionView` — kept for existing imports. */
export function RichDocumentRenderer({
  data,
  blocks,
}: {
  data?: DocumentData
  blocks?: Block[]
}) {
  return <SectionView data={data} blocks={blocks} />
}
