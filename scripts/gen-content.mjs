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
import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SUBJECTS_DIR = path.join(ROOT, 'src', 'content', 'subjects')
const OUT_DIR = path.join(ROOT, 'public', 'data')

/** Canonical section order (mirrors src/content/sections.ts). */
const SECTION_ORDER = [
  'explanation',
  'code',
  'synonyms',
  'applications',
  'materials',
  'references',
  'projects',
  'interview-questions',
  'scenario-questions',
  'case-studies',
  'exam-prep',
  'course-prep',
]
const SECTION_LABELS = {
  explanation: 'Explanation',
  code: 'Code',
  synonyms: 'Synonyms & Glossary',
  applications: 'Applications',
  materials: 'Learning Materials',
  references: 'References',
  projects: 'Projects',
  'interview-questions': 'Interview Questions',
  'scenario-questions': 'Scenario Questions',
  'case-studies': 'Case Studies',
  'exam-prep': 'Exam Prep',
  'course-prep': 'Course Prep',
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

/** Load one topic folder: its `topic.json` meta and assembled `sections`. */
async function loadTopic(subjectDir, topicId) {
  const topicDir = path.join(subjectDir, 'topics', topicId)
  const meta = await readJson(path.join(topicDir, 'topic.json'))
  if (!meta) return undefined

  const sections = {}
  const sectionsDir = path.join(topicDir, 'sections')
  if (existsSync(sectionsDir)) {
    const files = (await readdir(sectionsDir)).filter((f) => f.endsWith('.json'))
    await Promise.all(
      files.map(async (f) => {
        const key = f.replace(/\.json$/, '')
        const data = await readJson(path.join(sectionsDir, f))
        if (data) sections[key] = data
      }),
    )
  }

  const sectionKeys = Object.keys(sections).sort(
    (a, b) => (SECTION_RANK.get(a) ?? 99) - (SECTION_RANK.get(b) ?? 99),
  )
  return { meta, sections, sectionKeys }
}

/** Pull searchable units out of one topic's sections. */
function extractSectionDocs(subject, topicNode, sections) {
  const docs = []
  const base = {
    type: 'section',
    subjectId: subject.id,
    subjectTitle: subject.title,
    topicId: topicNode.id,
    topicTitle: topicNode.title,
    url: `/subjects/${subject.id}/topics/${topicNode.id}`,
    tags: topicNode.tags,
  }
  const make = (key, suffix, title, text) => ({
    ...base,
    id: `${subject.id}/${topicNode.id}/${key}/${suffix}`,
    sectionKey: key,
    sectionLabel: SECTION_LABELS[key],
    title,
    text: clip(text),
  })

  const s = sections
  if (s.explanation) {
    docs.push(
      make(
        'explanation',
        '0',
        `${topicNode.title} · Explanation`,
        `${s.explanation.content ?? ''} ${(s.explanation.keyPoints ?? []).join(' ')}`,
      ),
    )
  }
  s.code?.snippets?.forEach((c, i) =>
    docs.push(make('code', String(i), c.title, `${c.code ?? ''} ${c.explanation ?? ''}`)),
  )
  s.synonyms?.terms?.forEach((t, i) =>
    docs.push(make('synonyms', String(i), t.term, t.definition)),
  )
  s.applications?.items?.forEach((a, i) =>
    docs.push(make('applications', String(i), a.title, a.description)),
  )
  s.materials?.items?.forEach((m, i) =>
    docs.push(make('materials', String(i), m.title, m.description ?? m.type)),
  )
  s.references?.items?.forEach((r, i) =>
    docs.push(make('references', String(i), r.title, `${r.author ?? ''} ${r.note ?? ''}`)),
  )
  s.projects?.items?.forEach((p, i) =>
    docs.push(make('projects', String(i), p.title, p.description)),
  )
  s['interview-questions']?.items?.forEach((q, i) =>
    docs.push(make('interview-questions', String(i), q.question, q.answer)),
  )
  s['scenario-questions']?.items?.forEach((q, i) =>
    docs.push(
      make('scenario-questions', String(i), q.question, `${q.scenario ?? ''} ${q.answer ?? ''}`),
    ),
  )
  s['case-studies']?.items?.forEach((c, i) =>
    docs.push(
      make(
        'case-studies',
        String(i),
        c.title,
        `${c.context ?? ''} ${c.problem ?? ''} ${c.solution ?? ''} ${c.outcome ?? ''}`,
      ),
    ),
  )
  s['exam-prep']?.items?.forEach((q, i) =>
    docs.push(make('exam-prep', String(i), q.question, `${q.answer ?? ''} ${q.explanation ?? ''}`)),
  )
  s['course-prep']?.modules?.forEach((m, i) =>
    docs.push(make('course-prep', String(i), m.title, (m.lessons ?? []).join(' '))),
  )

  return docs
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

  // Clean + recreate the output dir so deletions in source are reflected.
  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(path.join(OUT_DIR, 'subjects'), { recursive: true })

  const indexEntries = []
  const searchDocs = []

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
    const nodes = loaded.map(({ meta: m, sectionKeys }) => ({
      id: m.id,
      title: m.title,
      summary: m.summary,
      order: m.order ?? 0,
      level: m.level ?? 'beginner',
      tags: m.tags ?? [],
      parentId: m.parentId,
      hours: m.hours,
      subjectId,
      sectionKeys,
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
      path.join(OUT_DIR, 'subjects', `${subjectId}.json`),
      JSON.stringify({ ...subjectMetaOut, roadmap: roadmap ?? undefined, topics: roots }),
    )

    // Per-topic section bodies (only for topics that actually have sections).
    const withSections = loaded.filter((t) => t.sectionKeys.length > 0)
    if (withSections.length) {
      const secDir = path.join(OUT_DIR, 'subjects', subjectId, 'sections')
      await mkdir(secDir, { recursive: true })
      await mapLimit(withSections, 64, (t) =>
        writeFile(path.join(secDir, `${t.meta.id}.json`), JSON.stringify(t.sections)),
      )
    }

    // Subject-level extras. Split so the subject page only pays for what it
    // shows: a tiny counts manifest (always emitted, for the tab badges) plus
    // one file per non-empty category, fetched lazily when its tab is opened.
    const subjectOutDir = path.join(OUT_DIR, 'subjects', subjectId)
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
    const sectionsById = new Map(loaded.map((t) => [t.meta.id, t.sections]))
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
      searchDocs.push(...extractSectionDocs({ id: subjectId, title: meta.title }, n, sectionsById.get(n.id) ?? {}))
    }
  }

  indexEntries.sort((a, b) => a.title.localeCompare(b.title))

  await writeFile(
    path.join(OUT_DIR, 'index.json'),
    JSON.stringify({ generatedAt: Date.now(), subjects: indexEntries }),
  )
  await writeFile(path.join(OUT_DIR, 'search.json'), JSON.stringify(searchDocs))

  if (log) {
    const totalTopics = indexEntries.reduce((s, e) => s + e.topicCount, 0)
    console.log(
      `[content] ${indexEntries.length} subjects, ${totalTopics} topics, ` +
        `${searchDocs.length} search docs → public/data (${Date.now() - start}ms)`,
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
