/**
 * Reparent signal-forms leaves under subtopics (strict 3-level hierarchy).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const TOPICS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../../src/content/subjects/angular/topics')

const SUBTOPICS = [
  {
    id: 'signal-forms--core-api',
    title: 'Core API',
    order: 1,
    leaves: [
      'signal-forms--form-and-schema',
      'signal-forms--field',
      'signal-forms--form-state',
      'signal-forms--formvaluecontrol',
    ],
  },
  {
    id: 'signal-forms--validation-and-events',
    title: 'Validation & Events',
    order: 2,
    leaves: [
      'signal-forms--schema-validation',
      'signal-forms--geterror',
      'signal-forms--reloadvalidation',
      'signal-forms--debounce',
      'signal-forms--touched-and-touch',
      'signal-forms--when-option',
      'signal-forms--validators-mindate-maxdate',
      'signal-forms--submit-handling',
    ],
  },
  {
    id: 'signal-forms--integration-and-advanced',
    title: 'Integration & Advanced',
    order: 3,
    leaves: [
      'signal-forms--signalformcontrol-interop',
      'signal-forms--array-fields',
      'signal-forms--nested-groups',
      'signal-forms--migrating-from-reactive',
    ],
  },
]

for (const sub of SUBTOPICS) {
  mkdirSync(resolve(TOPICS_DIR, sub.id), { recursive: true })
  writeFileSync(
    resolve(TOPICS_DIR, sub.id, 'topic.json'),
    `${JSON.stringify(
      {
        id: sub.id,
        title: sub.title,
        summary: sub.title,
        order: sub.order,
        level: 'intermediate',
        tags: ['forms'],
        parentId: 'signal-forms',
      },
      null,
      2,
    )}\n`,
  )

  sub.leaves.forEach((leafId, i) => {
    const file = resolve(TOPICS_DIR, leafId, 'topic.json')
    const meta = JSON.parse(readFileSync(file, 'utf8'))
    meta.parentId = sub.id
    meta.order = i + 1
    writeFileSync(file, `${JSON.stringify(meta, null, 2)}\n`)
  })
}

console.log('[angular] signal-forms hierarchy fixed (3 subtopics, 16 leaves).')
