import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/python')

let count = 0
const writeTopic = (meta) => {
  const dir = resolve(SUBJECT_DIR, 'topics', meta.id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
  count += 1
}

/**
 * Each entry adds ONE new subtopic (level 2) under an existing root, plus its
 * leaves (level 3). subOrder continues after the root's existing subtopics so
 * nothing already on disk is disturbed.
 */
const additions = [
  {
    stageTag: 'oop',
    level: 'intermediate',
    parentId: 'dunder-methods',
    subId: 'attribute-dunders',
    subTitle: 'Attribute Access Methods',
    subOrder: 5,
    leaves: [
      { id: 'getattr-getattribute', title: '__getattr__ & __getattribute__' },
      { id: 'setattr-delattr', title: '__setattr__ & __delattr__' },
      { id: 'dir-dunder', title: '__dir__' },
    ],
  },
  {
    stageTag: 'functional-programming',
    level: 'intermediate',
    parentId: 'first-class-functions',
    subId: 'operator-module',
    subTitle: 'The operator Module',
    subOrder: 4,
    leaves: [
      { id: 'itemgetter-attrgetter', title: 'itemgetter & attrgetter' },
      { id: 'methodcaller', title: 'methodcaller' },
      { id: 'operator-functions', title: 'Operator Functions' },
    ],
  },
  {
    stageTag: 'file-io',
    level: 'beginner',
    parentId: 'file-handling',
    subId: 'io-streams',
    subTitle: 'In-Memory Streams',
    subOrder: 5,
    leaves: [
      { id: 'stringio-bytesio', title: 'StringIO & BytesIO' },
      { id: 'buffered-raw-io', title: 'Buffered & Raw I/O' },
      { id: 'mmap', title: 'Memory-Mapped Files (mmap)' },
    ],
  },
  {
    stageTag: 'file-io',
    level: 'intermediate',
    parentId: 'file-handling',
    subId: 'binary-struct',
    subTitle: 'Binary Data with struct',
    subOrder: 6,
    leaves: [
      { id: 'struct-module', title: 'The struct Module' },
      { id: 'packing-unpacking-binary', title: 'Packing & Unpacking' },
    ],
  },
  {
    stageTag: 'file-io',
    level: 'intermediate',
    parentId: 'file-handling',
    subId: 'compression-archives',
    subTitle: 'Compression & Archives',
    subOrder: 7,
    leaves: [
      { id: 'gzip-bz2-lzma', title: 'gzip, bz2 & lzma' },
      { id: 'zipfile', title: 'zipfile' },
      { id: 'tarfile', title: 'tarfile' },
      { id: 'shutil-archives', title: 'shutil Archives' },
    ],
  },
  {
    stageTag: 'standard-library',
    level: 'intermediate',
    parentId: 'collections-module',
    subId: 'sequence-modules',
    subTitle: 'Array & Algorithm Modules',
    subOrder: 4,
    leaves: [
      { id: 'array-module', title: 'array' },
      { id: 'heapq', title: 'heapq' },
      { id: 'bisect', title: 'bisect' },
    ],
  },
  {
    stageTag: 'standard-library',
    level: 'intermediate',
    parentId: 'cli-utilities',
    subId: 'more-stdlib-modules',
    subTitle: 'More Useful Modules',
    subOrder: 5,
    leaves: [
      { id: 'uuid', title: 'uuid' },
      { id: 'string-module', title: 'string' },
      { id: 'shlex-shutil', title: 'shlex' },
    ],
  },
  {
    stageTag: 'concurrency',
    level: 'advanced',
    parentId: 'concurrent-execution',
    subId: 'advanced-concurrency',
    subTitle: 'Advanced Concurrency Features',
    subOrder: 4,
    leaves: [
      { id: 'subinterpreters', title: 'Subinterpreters' },
      { id: 'contextvars', title: 'contextvars' },
    ],
  },
  {
    stageTag: 'testing',
    level: 'intermediate',
    parentId: 'testing-fundamentals',
    subId: 'doctest',
    subTitle: 'doctest',
    subOrder: 4,
    leaves: [
      { id: 'writing-doctests', title: 'Writing Doctests' },
      { id: 'doctest-in-docs', title: 'Doctests in Documentation' },
    ],
  },
  {
    stageTag: 'testing',
    level: 'advanced',
    parentId: 'advanced-testing',
    subId: 'test-automation',
    subTitle: 'Test Automation',
    subOrder: 5,
    leaves: [
      { id: 'tox', title: 'tox' },
      { id: 'nox', title: 'nox' },
    ],
  },
  {
    stageTag: 'web-development',
    level: 'advanced',
    parentId: 'building-apis',
    subId: 'graphql',
    subTitle: 'GraphQL APIs',
    subOrder: 5,
    leaves: [
      { id: 'graphql-basics', title: 'GraphQL Basics' },
      { id: 'strawberry-graphene', title: 'Strawberry & Graphene' },
    ],
  },
  {
    stageTag: 'data-science',
    level: 'intermediate',
    parentId: 'pandas',
    subId: 'modern-dataframes',
    subTitle: 'Modern DataFrames & Time Series',
    subOrder: 5,
    leaves: [
      { id: 'polars', title: 'Polars' },
      { id: 'time-series-pandas', title: 'Time Series' },
    ],
  },
]

for (const a of additions) {
  writeTopic({
    id: a.subId,
    title: a.subTitle,
    summary: a.subTitle,
    order: a.subOrder,
    level: a.level,
    tags: [a.stageTag],
    parentId: a.parentId,
  })
  a.leaves.forEach((leaf, k) => {
    writeTopic({
      id: `${a.subId}--${leaf.id}`,
      title: leaf.title,
      summary: leaf.title,
      order: k + 1,
      level: a.level,
      tags: [a.stageTag],
      parentId: a.subId,
    })
  })
}

console.log(`Additions: wrote ${count} topic files.`)
