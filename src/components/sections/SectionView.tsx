import type { Block, DocumentData, DocumentEmbedBlock, RichText } from '../../types/rich-document'
import { CodeBlock } from '../CodeBlock'
import { DocumentEmbed } from './DocumentEmbed'

const EMBED_BLOCK_TYPES = new Set<DocumentEmbedBlock['type']>([
  'interview_qa',
  'scenario',
  'case_study',
  'project',
  'quiz',
  'resource',
  'pitfall',
  'cheatsheet',
  'glossary_term',
  'mermaid',
])

function isEmbedBlock(block: Block): block is DocumentEmbedBlock {
  return EMBED_BLOCK_TYPES.has(block.type as DocumentEmbedBlock['type'])
}

function renderInline(content: RichText[], keyPrefix = 'inline') {
  return content.map((node, i) => {
    const key = `${keyPrefix}-${i}`

    switch (node.type) {
      case 'text':
        return <span key={key}>{node.text}</span>

      case 'bold':
        return <strong key={key}>{node.text}</strong>

      case 'code':
        return (
          <code key={key} className="inline-code">
            {node.text}
          </code>
        )

      case 'link':
        return (
          <a
            key={key}
            href={node.href}
            target="_blank"
            rel="noreferrer"
            className="text-brand-600 underline decoration-brand-400/50 underline-offset-2 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            {node.text}
          </a>
        )

      default:
        return null
    }
  })
}

function renderBlock(block: Block, index: number, quizIndex?: number) {
  switch (block.type) {
    case 'title':
      return null

    case 'heading': {
      const content = renderInline(block.content, `heading-${index}`)
      switch (block.level) {
        case 1:
          return <h1 key={index}>{content}</h1>
        case 2:
          return <h2 key={index}>{content}</h2>
        case 3:
          return <h3 key={index}>{content}</h3>
        case 4:
          return <h4 key={index}>{content}</h4>
        default:
          return null
      }
    }

    case 'paragraph':
      return <p key={index}>{renderInline(block.content, `p-${index}`)}</p>

    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {renderInline(item.content, `li-${index}-${itemIndex}`)}
            </li>
          ))}
        </ListTag>
      )
    }

    case 'code_block':
      return (
        <div key={index} className="my-4">
          <CodeBlock code={block.code} language={block.language ?? 'text'} />
        </div>
      )

    case 'divider':
      return <hr key={index} className="rich-doc-divider" />

    default:
      if (isEmbedBlock(block)) {
        return (
          <div key={index} className="rich-doc-embed my-4">
            <DocumentEmbed block={block} quizIndex={quizIndex} />
          </div>
        )
      }
      return null
  }
}

export function SectionView({
  blocks,
  data,
}: {
  blocks?: Block[]
  data?: DocumentData
}) {
  const contentBlocks = blocks ?? data?.blocks ?? []
  let quizIndex = 0

  return (
    <article className="rich-doc">
      {contentBlocks.map((block, index) =>
        renderBlock(
          block,
          index,
          block.type === 'quiz' ? quizIndex++ : undefined,
        ),
      )}
    </article>
  )
}
