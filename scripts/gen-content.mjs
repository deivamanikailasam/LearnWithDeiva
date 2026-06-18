/**
 * Content build pipeline.
 *
 * Reads the on-disk content tree under `src/content/subjects/**` and emits a set
 * of consolidated, ready-to-fetch JSON artifacts into `public/data/`:
 *
 *   data/index.json                          – tiny subject index (cards/stats)
 *   data/subjects/<id>.json                  – one subject's full topic tree
 *                                              (metadata only, no section bodies)
 *   data/subjects/<id>/sections/<topic>.json – heavy section content, per topic
 *   data/search.json                         – prebuilt search document list
 *
 * This replaces the old `import.meta.glob({ eager: true })` registry that
 * inlined all ~13.5k topic files into the JS bundle. Pages now fetch only what
 * they need, so the initial load no longer depends on the size of the content.
 */
import { readFile, readdir, mkdir, writeFile, rm, rename } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SUBJECTS_DIR = path.join(ROOT, 'src', 'content', 'subjects')
const OUT_DIR = path.join(ROOT, 'public', 'data')
const OUT_TMP = path.join(ROOT, 'public', 'data.__tmp')
const OUT_STALE = path.join(ROOT, 'public', 'data.__stale')
const RM_OPTS = { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }

/** Canonical section order (mirrors src/content/sections.ts). */
const SECTION_ORDER = [
  'explanation',
  'examples',
  'diagrams',
  'charts',
  'images',
  'code',
  'synonyms',
  'connections',
  'applications',
  'tradeoffs',
  'mistakes',
  'misconceptions',
  'best-practices',
  'origins',
  'question-patterns',
  'materials',
  'references',
  'projects',
  'interview-questions',
  'scenario-questions',
  'case-studies',
  'exam-prep',
  'course-prep',
  'mastery',
]
const SECTION_LABELS = {
  explanation: 'Explanation',
  examples: 'Real-World Examples',
  diagrams: 'Diagrams',
  charts: 'Charts',
  images: 'Images',
  code: 'Code',
  synonyms: 'Synonyms & Glossary',
  connections: 'Conceptual Connections',
  applications: 'Applications',
  tradeoffs: 'Advantages & Disadvantages',
  mistakes: 'Common Mistakes',
  misconceptions: 'Common Misconceptions',
  'best-practices': 'Pitfalls & Best Practices',
  origins: 'Origin & History',
  'question-patterns': 'Question Patterns',
  materials: 'Learning Materials',
  references: 'References',
  projects: 'Projects',
  'interview-questions': 'Interview Questions',
  'scenario-questions': 'Scenario Questions',
  'case-studies': 'Case Studies',
  'exam-prep': 'Self-Assessment',
  'course-prep': 'Course Prep',
  mastery: 'Mastery Criteria',
}
const SECTION_RANK = new Map(SECTION_ORDER.map((k, i) => [k, i]))

/**
 * Subject-level extras: optional per-subject files surfaced as tabs on the
 * subject page. Each maps to an existing section renderer for display + search.
 * Mirrors `SUBJECT_EXTRA_DESCRIPTORS` in src/content/sections.ts.
 */
const SUBJECT_EXTRA_FILES = [
  { file: 'interview.json', key: 'interview', section: 'interview-questions', slug: 'interview', label: 'Interview Prep' },
  { file: 'scenarios.json', key: 'scenarios', section: 'scenario-questions', slug: 'scenarios', label: 'Scenarios' },
  { file: 'case-studies.json', key: 'caseStudies', section: 'case-studies', slug: 'case-studies', label: 'Case Studies' },
  { file: 'projects.json', key: 'projects', section: 'projects', slug: 'projects', label: 'Projects' },
  { file: 'quiz.json', key: 'quiz', section: 'exam-prep', slug: 'quiz', label: 'Quizzes' },
  { file: 'resources.json', key: 'resources', slug: 'resources', label: 'Resources' },
  { file: 'pitfalls.json', key: 'pitfalls', slug: 'pitfalls', label: 'Pitfalls & Best Practices' },
  { file: 'cheat-sheet.json', key: 'cheatsheet', slug: 'cheat-sheet', label: 'Cheat Sheet' },
  { file: 'glossary.json', key: 'glossary', slug: 'glossary', label: 'Glossary' },
]

const LEVEL_ORDER = { beginner: 0, intermediate: 1, advanced: 2 }
const LEVEL_BY_ORDER = ['beginner', 'intermediate', 'advanced']

// Base study time per topic, by difficulty, in minutes. Mirrors
// `MINUTES_BY_LEVEL` in src/lib/duration.ts — keep the two in sync.
const MINUTES_BY_LEVEL = { beginner: 30, intermediate: 60, advanced: 90 }

/** Estimated study time for a single topic node, in minutes. */
function topicMinutes(node) {
  if (typeof node.hours === 'number' && node.hours >= 0) {
    return Math.round(node.hours * 60)
  }
  return MINUTES_BY_LEVEL[node.level] ?? 60
}

/**
 * Rolled-up study time for a topic node: a node with subtopics is a pure
 * aggregate (sum of its subtopics), a leaf contributes its own time. Mirrors
 * `subtreeMinutes` in src/lib/duration.ts.
 */
function subtreeMinutes(node) {
  const subs = node.subtopics ?? []
  if (subs.length === 0) return topicMinutes(node)
  return subs.reduce((sum, s) => sum + subtreeMinutes(s), 0)
}

/** Read + parse a JSON file, returning `undefined` if it doesn't exist. */
async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch {
    return undefined
  }
}

/** Run async tasks with a bounded concurrency to avoid exhausting fd limits. */
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length)
  let i = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx], idx)
    }
  })
  await Promise.all(workers)
  return out
}

function clip(text, max = 220) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max)}…` : clean
}

async function listDirs(dir) {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}

/** Load one topic folder: meta plus optional `document.json` or `explanation.json`. */
async function loadTopic(subjectDir, topicId) {
  const topicDir = path.join(subjectDir, 'topics', topicId)
  const meta = await readJson(path.join(topicDir, 'topic.json'))
  if (!meta) return undefined

  const document = await readJson(path.join(topicDir, 'document.json'))
  const explanation = document
    ? undefined
    : await readJson(path.join(topicDir, 'explanation.json'))
  const body = document ?? explanation
  const hasContent = Boolean(body)
  const contentSectionCount = hasContent
    ? document
      ? splitTiptapByH1(document.doc).length
      : splitDocumentByHeading(explanation).length
    : 0

  return { meta, document, explanation, body, hasContent, contentSectionCount }
}

/** Split explanation.json blocks into navigable sections at each level-1 heading. */
function splitDocumentByHeading(doc) {
  const sections = []
  let currentBlocks = []
  let currentTitle = null
  let currentId = 'intro'
  const usedIds = new Set()

  const flush = () => {
    if (currentBlocks.length === 0 && currentTitle === null) return
    let id = currentId
    let n = 1
    while (usedIds.has(id)) id = `${currentId}-${n++}`
    usedIds.add(id)
    sections.push({ id, title: currentTitle, blocks: currentBlocks })
    currentBlocks = []
  }

  for (const block of doc.blocks ?? []) {
    if (block.type === 'title') continue
    if (block.type === 'heading' && block.level === 1) {
      flush()
      currentTitle = richTextToPlain(block.content)
      currentId =
        currentTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || 'section'
      continue
    }
    currentBlocks.push(block)
  }
  flush()
  return sections
}

/** Split a TipTap document into navigable sections at each level-1 heading. */
function splitTiptapByH1(fullDoc) {
  const nodes = fullDoc?.content ?? []
  const sections = []
  let currentNodes = []
  let currentTitle = null
  let currentId = 'intro'
  const usedIds = new Set()

  const flush = () => {
    if (currentNodes.length === 0 && currentTitle === null) return
    let id = currentId
    let n = 1
    while (usedIds.has(id)) id = `${currentId}-${n++}`
    usedIds.add(id)
    sections.push({
      id,
      title: currentTitle,
      doc: { type: 'doc', content: currentNodes },
    })
    currentNodes = []
  }

  for (const node of nodes) {
    if (node.type === 'heading' && node.attrs?.level === 1) {
      flush()
      currentTitle = tiptapNodeToPlain(node)
      currentId =
        currentTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || 'section'
      continue
    }
    currentNodes.push(node)
  }
  flush()
  return sections
}

/** Recursively flatten TipTap JSON into plain text. */
function tiptapNodeToPlain(node) {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  return (node.content ?? []).map(tiptapNodeToPlain).join(' ')
}

function tiptapDocToPlain(doc) {
  return tiptapNodeToPlain(doc)
}

/** Flatten rich-document inline nodes into plain text for search indexing. */
function richTextToPlain(nodes) {
  if (!Array.isArray(nodes)) return ''
  return nodes.map((n) => (n && typeof n.text === 'string' ? n.text : '')).join(' ')
}

/** Flatten a DocumentData explanation into plain text for search indexing. */
function explanationToPlain(doc) {
  const parts = [doc.title ?? '']
  for (const block of doc.blocks ?? []) {
    switch (block.type) {
      case 'title':
      case 'heading':
      case 'paragraph':
        parts.push(richTextToPlain(block.content))
        break
      case 'list':
        for (const item of block.items ?? []) parts.push(richTextToPlain(item.content))
        break
      case 'code_block':
        parts.push(block.code ?? '')
        break
      case 'interview_qa':
        parts.push(block.item?.question ?? '', block.item?.answer ?? '')
        break
      case 'scenario':
        parts.push(block.item?.scenario ?? '', block.item?.question ?? '', block.item?.answer ?? '')
        break
      case 'case_study':
        parts.push(
          block.item?.title ?? '',
          block.item?.context ?? '',
          block.item?.problem ?? '',
          block.item?.solution ?? '',
          block.item?.outcome ?? '',
        )
        break
      case 'project':
        parts.push(block.item?.title ?? '', block.item?.description ?? '')
        break
      case 'quiz':
        parts.push(block.item?.question ?? '', block.item?.answer ?? '', block.item?.explanation ?? '')
        break
      case 'resource':
        parts.push(block.item?.title ?? '', block.item?.description ?? '', block.item?.author ?? '')
        break
      case 'pitfall':
        parts.push(block.item?.title ?? '', block.item?.avoid ?? '', block.item?.prefer ?? '')
        break
      case 'cheatsheet':
        parts.push(block.item?.title ?? '')
        for (const entry of block.item?.entries ?? []) {
          parts.push(entry?.label ?? '', entry?.note ?? '', entry?.code ?? '')
        }
        break
      case 'glossary_term':
        parts.push(block.item?.term ?? '', block.item?.definition ?? '')
        break
      case 'mermaid':
        parts.push(block.item?.title ?? '', block.item?.mermaid ?? '', block.item?.caption ?? '')
        break
      default:
        break
    }
  }
  return parts.join(' ')
}

/** Pull searchable units out of one topic's TipTap document. */
function extractTiptapSectionDocs(subject, topicNode, document) {
  if (!document?.doc) return []
  const base = {
    type: 'section',
    subjectId: subject.id,
    subjectTitle: subject.title,
    topicId: topicNode.id,
    topicTitle: topicNode.title,
    url: `/subjects/${subject.id}/topics/${topicNode.id}`,
    tags: topicNode.tags,
  }

  const sections = splitTiptapByH1(document.doc)
  if (sections.length === 0) {
    return [
      {
        ...base,
        id: `${subject.id}/${topicNode.id}/explanation/0`,
        sectionKey: 'explanation',
        sectionLabel: 'Explanation',
        title: `${topicNode.title} · Explanation`,
        text: clip(tiptapDocToPlain(document.doc)),
      },
    ]
  }

  return sections.map((s, i) => ({
    ...base,
    id: `${subject.id}/${topicNode.id}/explanation/${i}`,
    sectionKey: 'explanation',
    sectionLabel: s.title ?? 'Overview',
    title: s.title ? `${topicNode.title} · ${s.title}` : `${topicNode.title} · Overview`,
    text: clip(tiptapDocToPlain(s.doc)),
  }))
}

/** Pull searchable units out of one topic's explanation document. */
function extractSectionDocs(subject, topicNode, explanation) {
  if (!explanation) return []
  const base = {
    type: 'section',
    subjectId: subject.id,
    subjectTitle: subject.title,
    topicId: topicNode.id,
    topicTitle: topicNode.title,
    url: `/subjects/${subject.id}/topics/${topicNode.id}`,
    tags: topicNode.tags,
  }

  const sections = splitDocumentByHeading(explanation)
  if (sections.length === 0) {
    return [
      {
        ...base,
        id: `${subject.id}/${topicNode.id}/explanation/0`,
        sectionKey: 'explanation',
        sectionLabel: 'Explanation',
        title: `${topicNode.title} · Explanation`,
        text: clip(explanationToPlain(explanation)),
      },
    ]
  }

  return sections.map((s, i) => ({
    ...base,
    id: `${subject.id}/${topicNode.id}/explanation/${i}`,
    sectionKey: 'explanation',
    sectionLabel: s.title ?? 'Overview',
    title: s.title ? `${topicNode.title} · ${s.title}` : `${topicNode.title} · Overview`,
    text: clip(
      s.blocks
        .map((block) => {
          switch (block.type) {
            case 'paragraph':
              return richTextToPlain(block.content)
            case 'list':
              return (block.items ?? [])
                .map((item) => richTextToPlain(item.content))
                .join(' ')
            case 'code_block':
              return block.code ?? ''
            default:
              return ''
          }
        })
        .join(' '),
    ),
  }))
}

/** Load a subject's optional extra files into a single `extras` object. */
async function loadSubjectExtras(subjectDir) {
  const extras = {}
  await Promise.all(
    SUBJECT_EXTRA_FILES.map(async ({ file, key }) => {
      const data = await readJson(path.join(subjectDir, file))
      if (data && Array.isArray(data.items)) extras[key] = data
    }),
  )
  return extras
}

/** Pull searchable units out of a subject's extras (works for every category). */
function extractSubjectExtraDocs(subjectMeta, extras) {
  const docs = []
  for (const { key, section, slug, label } of SUBJECT_EXTRA_FILES) {
    const data = extras[key]
    if (!data || !Array.isArray(data.items)) continue
    data.items.forEach((it, i) => {
      const title = it.question ?? it.title ?? it.label ?? it.term ?? `${label} ${i + 1}`
      const text = clip(
        it.answer ??
          it.definition ??
          it.description ??
          it.why ??
          [
            it.scenario,
            it.context,
            it.problem,
            it.solution,
            it.outcome,
            it.explanation,
            it.avoid,
            it.prefer,
            it.author,
            Array.isArray(it.entries) ? it.entries.map((e) => e.label).join(' ') : '',
          ]
            .filter(Boolean)
            .join(' '),
      )
      const doc = {
        id: `${subjectMeta.id}/extra/${key}/${i}`,
        type: 'section',
        subjectId: subjectMeta.id,
        subjectTitle: subjectMeta.title,
        sectionLabel: section ? SECTION_LABELS[section] : label,
        title,
        text,
        tags: subjectMeta.tags ?? [],
        url: `/subjects/${subjectMeta.id}/${slug}`,
      }
      if (section) doc.sectionKey = section
      docs.push(doc)
    })
  }
  return docs
}

export async function generateContent({ log = false, force = true } = {}) {
  contentGenerationQueue = contentGenerationQueue
    .catch(() => undefined)
    .then(() => runGenerateContent({ log, force }))
  return contentGenerationQueue
}

let contentGenerationQueue = Promise.resolve({})

async function runGenerateContent({ log = false, force = true } = {}) {
  const start = Date.now()

  // Dev fast path: if the artifacts already exist and we're not forcing a
  // rebuild, skip the (relatively slow) full scan. The Vite dev plugin watches
  // the content dir and regenerates on change, so this stays correct while
  // making server startup near-instant after the first generation.
  if (!force && existsSync(path.join(OUT_DIR, 'index.json'))) {
    if (log) console.log('[content] up-to-date, skipping generation')
    return { skipped: true }
  }

  const subjectIds = (await listDirs(SUBJECTS_DIR)).sort()

  // Build into a temp dir, then swap atomically. Deleting `public/data/` in
  // place races with the dev server serving those files (ENOTEMPTY on macOS).
  await rm(OUT_TMP, RM_OPTS).catch(() => undefined)
  await mkdir(path.join(OUT_TMP, 'subjects'), { recursive: true })
  const outDir = OUT_TMP

  const indexEntries = []
  const searchDocs = []
  const glossaryDocs = []

  for (const subjectId of subjectIds) {
    const subjectDir = path.join(SUBJECTS_DIR, subjectId)
    const meta = await readJson(path.join(subjectDir, 'subject.json'))
    if (!meta) continue
    const roadmap = await readJson(path.join(subjectDir, 'roadmap.json'))
    const extras = await loadSubjectExtras(subjectDir)

    const topicIds = await listDirs(path.join(subjectDir, 'topics'))
    const loaded = (
      await mapLimit(topicIds, 64, (id) => loadTopic(subjectDir, id))
    ).filter(Boolean)

    // Build parent/child tree from parentId references.
    const nodes = loaded.map(({ meta: m, hasContent, contentSectionCount }) => ({
      id: m.id,
      title: m.title,
      summary: m.summary,
      order: m.order ?? 0,
      level: m.level ?? 'beginner',
      tags: m.tags ?? [],
      parentId: m.parentId,
      hours: m.hours,
      subjectId,
      hasContent,
      contentSectionCount,
      subtopics: [],
    }))
    const byId = new Map(nodes.map((n) => [n.id, n]))
    const roots = []
    for (const n of nodes) {
      if (n.parentId && byId.has(n.parentId)) byId.get(n.parentId).subtopics.push(n)
      else roots.push(n)
    }
    const sortByOrder = (a, b) => a.order - b.order
    roots.sort(sortByOrder)
    for (const n of nodes) n.subtopics.sort(sortByOrder)

    // Difficulty span across all topics.
    let min = LEVEL_ORDER.advanced
    let max = LEVEL_ORDER.beginner
    for (const n of nodes) {
      const o = LEVEL_ORDER[n.level] ?? 0
      if (o < min) min = o
      if (o > max) max = o
    }
    const levelRange =
      min > max
        ? { min: meta.level, max: meta.level }
        : { min: LEVEL_BY_ORDER[min], max: LEVEL_BY_ORDER[max] }

    // Total estimated study time: roll up each top-level topic (a parent is a
    // pure aggregate of its subtopics; leaves contribute their own time).
    const estimatedMinutes = roots.reduce((sum, n) => sum + subtreeMinutes(n), 0)

    const subjectMetaOut = {
      id: meta.id,
      title: meta.title,
      tagline: meta.tagline,
      description: meta.description,
      icon: meta.icon,
      gradient: meta.gradient,
      tags: meta.tags ?? [],
      level: meta.level,
      estimatedMinutes,
      topicCount: nodes.length,
      levelRange,
      hasRoadmap: Boolean(roadmap),
    }

    // Per-subject file (full tree + roadmap, no heavy section bodies).
    await writeFile(
      path.join(outDir, 'subjects', `${subjectId}.json`),
      JSON.stringify({ ...subjectMetaOut, roadmap: roadmap ?? undefined, topics: roots }),
    )

    // Per-topic section bodies (only for topics that actually have sections).
    const withContent = loaded.filter((t) => t.hasContent)
    if (withContent.length) {
      const secDir = path.join(outDir, 'subjects', subjectId, 'sections')
      await mkdir(secDir, { recursive: true })
      await mapLimit(withContent, 64, (t) =>
        writeFile(path.join(secDir, `${t.meta.id}.json`), JSON.stringify(t.body)),
      )
    }

    // Subject-level extras. Split so the subject page only pays for what it
    // shows: a tiny counts manifest (always emitted, for the tab badges) plus
    // one file per non-empty category, fetched lazily when its tab is opened.
    const subjectOutDir = path.join(outDir, 'subjects', subjectId)
    await mkdir(subjectOutDir, { recursive: true })
    const extraCounts = {}
    const presentExtras = SUBJECT_EXTRA_FILES.filter(
      ({ key }) => Array.isArray(extras[key]?.items) && extras[key].items.length,
    )
    for (const { key } of presentExtras) extraCounts[key] = extras[key].items.length
    await writeFile(
      path.join(subjectOutDir, 'extras.json'),
      JSON.stringify({ counts: extraCounts }),
    )
    if (presentExtras.length) {
      const extraDir = path.join(subjectOutDir, 'extras')
      await mkdir(extraDir, { recursive: true })
      await Promise.all(
        presentExtras.map(({ key }) =>
          writeFile(path.join(extraDir, `${key}.json`), JSON.stringify(extras[key])),
        ),
      )
    }

    // Index entry (no topics) for cards / stats.
    indexEntries.push(subjectMetaOut)

    // Search docs: subject + every topic + its section units.
    searchDocs.push({
      id: `subject/${subjectId}`,
      type: 'subject',
      subjectId,
      subjectTitle: meta.title,
      title: meta.title,
      text: clip(`${meta.tagline ?? ''} ${meta.description ?? ''}`),
      tags: meta.tags ?? [],
      url: `/subjects/${subjectId}`,
    })
    searchDocs.push(...extractSubjectExtraDocs({ id: subjectId, title: meta.title, tags: meta.tags }, extras))

    // Global glossary: subject-level glossary extras (authored once per subject).
    extras.glossary?.items?.forEach((it) => {
      if (!it?.term) return
      glossaryDocs.push({
        term: String(it.term),
        definition: clip(it.definition ?? '', 600),
        subjectId,
        subjectTitle: meta.title,
        subjectIcon: meta.icon ?? '',
        source: 'subject',
        url: `/subjects/${subjectId}/glossary`,
      })
    })

    const bodyById = new Map(loaded.map((t) => [t.meta.id, t]))
    for (const n of nodes) {
      searchDocs.push({
        id: `topic/${subjectId}/${n.id}`,
        type: 'topic',
        subjectId,
        subjectTitle: meta.title,
        topicId: n.id,
        topicTitle: n.title,
        title: n.title,
        text: clip(n.summary),
        tags: n.tags,
        url: `/subjects/${subjectId}/topics/${n.id}`,
      })
      const loadedTopic = bodyById.get(n.id)
      if (loadedTopic?.document) {
        searchDocs.push(
          ...extractTiptapSectionDocs(
            { id: subjectId, title: meta.title },
            n,
            loadedTopic.document,
          ),
        )
      } else if (loadedTopic?.explanation) {
        searchDocs.push(
          ...extractSectionDocs(
            { id: subjectId, title: meta.title },
            n,
            loadedTopic.explanation,
          ),
        )
      }
    }
  }

  indexEntries.sort((a, b) => a.title.localeCompare(b.title))

  await writeFile(
    path.join(outDir, 'index.json'),
    JSON.stringify({ generatedAt: Date.now(), subjects: indexEntries }),
  )
  await writeFile(path.join(outDir, 'search.json'), JSON.stringify(searchDocs))

  // Global glossary: drop exact duplicates (same term + definition + source),
  // sort alphabetically and assign a stable id for the dedicated Glossary page.
  const seenTerms = new Set()
  const glossary = []
  for (const g of glossaryDocs) {
    const key = `${g.term.toLowerCase()}|${g.definition.toLowerCase()}|${g.url}`
    if (seenTerms.has(key)) continue
    seenTerms.add(key)
    glossary.push({ id: String(glossary.length), ...g })
  }
  glossary.sort((a, b) =>
    a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }),
  )
  await writeFile(
    path.join(outDir, 'glossary.json'),
    JSON.stringify({ generatedAt: Date.now(), terms: glossary }),
  )

  await rm(OUT_STALE, RM_OPTS).catch(() => undefined)
  if (existsSync(OUT_DIR)) {
    await rename(OUT_DIR, OUT_STALE)
  }
  await rename(outDir, OUT_DIR)
  await rm(OUT_STALE, RM_OPTS).catch(() => undefined)

  if (log) {
    const totalTopics = indexEntries.reduce((s, e) => s + e.topicCount, 0)
    console.log(
      `[content] ${indexEntries.length} subjects, ${totalTopics} topics, ` +
        `${searchDocs.length} search docs, ${glossary.length} glossary terms ` +
        `→ public/data (${Date.now() - start}ms)`,
    )
  }

  return { subjects: indexEntries.length }
}

// Allow running directly: `node scripts/gen-content.mjs`
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) {
  generateContent({ log: true, force: true }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
