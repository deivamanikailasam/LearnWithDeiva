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

// New subtopics (level 2) under existing roots, with their leaves (level 3).
const subtopicAdditions = [
  {
    stageTag: 'oop',
    level: 'intermediate',
    parentId: 'classes-objects',
    subId: 'object-introspection',
    subTitle: 'Introspection & Reflection',
    subOrder: 5,
    leaves: [
      { id: 'getattr-setattr-hasattr', title: 'getattr, setattr & hasattr' },
      { id: 'vars-dir', title: 'vars() & dir()' },
      { id: 'inspect-module', title: 'The inspect Module' },
      { id: 'type-introspection', title: 'Type Introspection' },
    ],
  },
  {
    stageTag: 'iterators-generators',
    level: 'intermediate',
    parentId: 'generators',
    subId: 'async-generators',
    subTitle: 'Async Generators',
    subOrder: 5,
    leaves: [
      { id: 'async-generator-functions', title: 'Async Generator Functions' },
      { id: 'async-comprehensions', title: 'Async Comprehensions' },
    ],
  },
  {
    stageTag: 'standard-library',
    level: 'intermediate',
    parentId: 'os-sys-platform',
    subId: 'signals-and-process',
    subTitle: 'Signals & Process Hooks',
    subOrder: 5,
    leaves: [
      { id: 'signal-module', title: 'The signal Module' },
      { id: 'atexit', title: 'atexit' },
    ],
  },
  {
    stageTag: 'standard-library',
    level: 'intermediate',
    parentId: 'cli-utilities',
    subId: 'i18n-l10n',
    subTitle: 'Internationalization',
    subOrder: 6,
    leaves: [
      { id: 'gettext', title: 'gettext' },
      { id: 'locale-module', title: 'locale' },
    ],
  },
  {
    stageTag: 'advanced-features',
    level: 'advanced',
    parentId: 'metaclasses',
    subId: 'ast-metaprogramming',
    subTitle: 'AST & Metaprogramming',
    subOrder: 4,
    leaves: [
      { id: 'ast-module', title: 'The ast Module' },
      { id: 'compile-exec-eval', title: 'compile, exec & eval' },
      { id: 'code-generation', title: 'Code Generation' },
    ],
  },
  {
    stageTag: 'tooling-packaging',
    level: 'intermediate',
    parentId: 'code-quality-tools',
    subId: 'documentation-tools',
    subTitle: 'Documentation',
    subOrder: 4,
    leaves: [
      { id: 'docstring-styles', title: 'Docstring Styles (Google/NumPy)' },
      { id: 'sphinx', title: 'Sphinx' },
      { id: 'mkdocs', title: 'MkDocs' },
      { id: 'api-doc-generation', title: 'API Doc Generation' },
    ],
  },
  {
    stageTag: 'data-science',
    level: 'advanced',
    parentId: 'ml-scientific',
    subId: 'big-data-tools',
    subTitle: 'Big Data & Distributed',
    subOrder: 5,
    leaves: [
      { id: 'dask', title: 'Dask' },
      { id: 'pyspark', title: 'PySpark' },
    ],
  },
  {
    stageTag: 'automation',
    level: 'intermediate',
    parentId: 'document-automation',
    subId: 'media-processing',
    subTitle: 'Image & Media Processing',
    subOrder: 5,
    leaves: [
      { id: 'pillow', title: 'Pillow (Images)' },
      { id: 'opencv', title: 'OpenCV' },
      { id: 'audio-video', title: 'Audio & Video (pydub, moviepy)' },
    ],
  },
  {
    stageTag: 'design-architecture',
    level: 'advanced',
    parentId: 'project-architecture',
    subId: 'architecture-styles',
    subTitle: 'Architecture Styles',
    subOrder: 5,
    leaves: [
      { id: 'monolith-microservices', title: 'Monolith vs Microservices' },
      { id: 'event-driven-arch', title: 'Event-Driven Architecture' },
      { id: 'domain-driven-design', title: 'Domain-Driven Design' },
    ],
  },
]

// Single leaves appended to existing subtopics.
const leafAdditions = [
  {
    stageTag: 'syntax-variables',
    level: 'beginner',
    parentId: 'assignment',
    id: 'assignment--del-statement',
    title: 'The del Statement',
    order: 5,
  },
  {
    stageTag: 'networking-apis',
    level: 'advanced',
    parentId: 'protocols',
    id: 'protocols--ssh-ftp',
    title: 'SSH & FTP (paramiko, ftplib)',
    order: 4,
  },
]

for (const a of subtopicAdditions) {
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
      order: k + 1,
      level: a.level,
      tags: [a.stageTag],
      parentId: a.subId,
    })
  })
}

for (const leaf of leafAdditions) {
  writeTopic({
    id: leaf.id,
    title: leaf.title,
    summary: leaf.title,
    order: leaf.order,
    level: leaf.level,
    tags: [leaf.stageTag],
    parentId: leaf.parentId,
  })
}

console.log(`Additions (pass 2): wrote ${count} topic files.`)
