/**
 * Per-section JSON schema validators used by scripts/apply-content.mjs.
 *
 * Each validator receives the parsed `content` object for one section file
 * and returns an array of human-readable error strings. An empty array means
 * the content is acceptable. Validators are intentionally narrow: they catch
 * mistakes Perplexity is likely to make (missing keys, wrong types, broken
 * cross-references) without attempting full schema enforcement.
 *
 * The canonical SECTION_KEYS list mirrors src/content/sections.ts. Any key
 * not in this list is rejected by the caller before reaching a validator.
 */

export const SECTION_KEYS = [
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

const DIFFICULTY = new Set(['beginner', 'intermediate', 'advanced'])
const CHART_KINDS = new Set(['bar', 'line', 'pie', 'area'])
const MATERIAL_TYPES = new Set(['article', 'video', 'book', 'course', 'docs', 'tool'])
const QUESTION_PATTERNS = new Set([
  '5w1h',
  'socratic',
  'mindmap',
  'comparative',
  'what-if',
  'cause-effect',
  'what-breaks-this',
])
const FIVE_W1H_REQUIRED = ['who', 'what', 'when', 'where', 'why', 'how']
const MERMAID_RESERVED_IDS = new Set(['end', 'subgraph', 'graph', 'flowchart'])

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const isStringArray = (v) => Array.isArray(v) && v.every((x) => typeof x === 'string')

/**
 * Allowed top-level (`self`), item-level (`item.fields`), and any further
 * nested-array fields for every section. Mirrors `src/types/content.ts`
 * exactly. The dispatcher uses this to reject unknown fields so a section
 * like `references` cannot silently emit invented fields (e.g. `difficulty`,
 * `requirements`) without `apply-content.mjs` flagging them.
 *
 * Add a new field here whenever the TypeScript interface in `content.ts`
 * grows; the validator will reject any field not listed below.
 */
const ALLOWED_FIELDS = {
  explanation: {
    self: ['id', 'title', 'blocks'],
    item: {
      key: 'blocks',
      fields: ['type', 'content', 'level', 'ordered', 'items', 'language', 'code'],
    },
    nested: [{ parent: 'blocks', child: 'items', fields: ['content'] }],
  },
  examples: { self: ['items'], item: { key: 'items', fields: ['title', 'scenario', 'explanation'] } },
  diagrams: { self: ['items'], item: { key: 'items', fields: ['title', 'mermaid', 'caption'] } },
  charts: {
    self: ['items'],
    item: { key: 'items', fields: ['title', 'kind', 'data', 'xKey', 'series', 'caption'] },
    nested: [{ parent: 'items', child: 'series', fields: ['key', 'label'] }],
  },
  images: { self: ['items'], item: { key: 'items', fields: ['src', 'alt', 'caption'] } },
  code: { self: ['snippets'], item: { key: 'snippets', fields: ['title', 'language', 'code', 'explanation'] } },
  synonyms: { self: ['terms'], item: { key: 'terms', fields: ['term', 'definition'] } },
  connections: { self: ['items'], item: { key: 'items', fields: ['title', 'relation', 'description', 'topicId'] } },
  applications: { self: ['items'], item: { key: 'items', fields: ['title', 'description'] } },
  tradeoffs: { self: ['advantages', 'disadvantages'] },
  mistakes: { self: ['items'], item: { key: 'items', fields: ['mistake', 'fix', 'why', 'example'] } },
  misconceptions: { self: ['items'], item: { key: 'items', fields: ['myth', 'reality', 'example'] } },
  'best-practices': { self: ['items'], item: { key: 'items', fields: ['title', 'avoid', 'prefer', 'why', 'example'] } },
  origins: {
    self: ['content', 'timeline'],
    nested: [{ parent: null, child: 'timeline', fields: ['label', 'description'] }],
  },
  'question-patterns': {
    self: ['groups'],
    item: { key: 'groups', fields: ['pattern', 'items'] },
    nested: [{ parent: 'groups', child: 'items', fields: ['question', 'answer'] }],
  },
  materials: { self: ['items'], item: { key: 'items', fields: ['title', 'type', 'url', 'description'] } },
  references: { self: ['items'], item: { key: 'items', fields: ['title', 'url', 'author', 'note'] } },
  projects: { self: ['items'], item: { key: 'items', fields: ['title', 'difficulty', 'description', 'requirements'] } },
  'interview-questions': { self: ['items'], item: { key: 'items', fields: ['question', 'answer', 'difficulty', 'tags'] } },
  'scenario-questions': { self: ['items'], item: { key: 'items', fields: ['scenario', 'question', 'answer'] } },
  'case-studies': { self: ['items'], item: { key: 'items', fields: ['title', 'context', 'problem', 'solution', 'outcome'] } },
  'exam-prep': { self: ['items'], item: { key: 'items', fields: ['question', 'options', 'answer', 'explanation'] } },
  'course-prep': { self: ['modules'], item: { key: 'modules', fields: ['title', 'duration', 'lessons'] } },
  mastery: { self: ['criteria'], item: { key: 'criteria', fields: ['label', 'level', 'example'] } },
}

/**
 * Reject any key on `obj` not listed in `allowed`. Pushes one error per
 * unknown key into `errors` so the operator sees every drift at once.
 */
function rejectUnknownFields(obj, allowed, path, errors) {
  if (!isObject(obj)) return
  const allowedSet = allowed instanceof Set ? allowed : new Set(allowed)
  for (const k of Object.keys(obj)) {
    if (!allowedSet.has(k)) {
      errors.push(
        `${path}: unknown field "${k}" (allowed: ${[...allowedSet].join(', ')}). Either remove it or, if it should exist, add it to the canonical schema in src/types/content.ts first.`,
      )
    }
  }
}

/**
 * Walk the section's content per the ALLOWED_FIELDS catalogue and append an
 * error for every field that does not appear in the canonical schema. Runs
 * AFTER the section-specific validator so the unknown-field messages don't
 * crowd out missing-field messages.
 */
function checkAllowedFields(sectionKey, content, errors) {
  const spec = ALLOWED_FIELDS[sectionKey]
  if (!spec || !isObject(content)) return
  rejectUnknownFields(content, spec.self, sectionKey, errors)
  if (spec.item) {
    const list = content[spec.item.key]
    if (Array.isArray(list)) {
      list.forEach((it, i) => {
        rejectUnknownFields(it, spec.item.fields, `${sectionKey}.${spec.item.key}[${i}]`, errors)
      })
    }
  }
  if (Array.isArray(spec.nested)) {
    for (const n of spec.nested) {
      if (n.parent === null) {
        const list = content[n.child]
        if (Array.isArray(list)) {
          list.forEach((it, i) => {
            rejectUnknownFields(it, n.fields, `${sectionKey}.${n.child}[${i}]`, errors)
          })
        }
      } else {
        const parents = content[n.parent]
        if (!Array.isArray(parents)) continue
        parents.forEach((parent, pi) => {
          if (!isObject(parent)) return
          const sub = parent[n.child]
          if (!Array.isArray(sub)) return
          sub.forEach((it, i) => {
            rejectUnknownFields(it, n.fields, `${sectionKey}.${n.parent}[${pi}].${n.child}[${i}]`, errors)
          })
        })
      }
    }
  }
}

/** Coerce an array-of-items validator into a uniform shape. */
function requireArray(value, fieldName, errors) {
  if (!Array.isArray(value)) {
    errors.push(`${fieldName} must be an array.`)
    return false
  }
  if (value.length === 0) {
    errors.push(`${fieldName} must not be empty.`)
    return false
  }
  return true
}

const RICH_TEXT_TYPES = new Set(['text', 'bold', 'code', 'link'])
const PROSE_BLOCK_TYPES = new Set(['title', 'heading', 'paragraph', 'list', 'code_block', 'divider'])
const EMBED_BLOCK_TYPES = new Set([
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
const BLOCK_TYPES = new Set([...PROSE_BLOCK_TYPES, ...EMBED_BLOCK_TYPES])
const RESOURCE_TYPES = new Set([
  'article',
  'video',
  'book',
  'course',
  'docs',
  'tool',
  'reference',
])

function validateRichText(node, path, errors) {
  if (!isObject(node)) {
    errors.push(`${path}: must be an object.`)
    return
  }
  if (!RICH_TEXT_TYPES.has(node.type)) {
    errors.push(`${path}.type: must be one of ${[...RICH_TEXT_TYPES].join(', ')}.`)
    return
  }
  if (!isNonEmptyString(node.text)) {
    errors.push(`${path}.text: required non-empty string.`)
  }
  if (node.type === 'link' && !isNonEmptyString(node.href)) {
    errors.push(`${path}.href: required non-empty string for link nodes.`)
  }
}

function validateRichTextArray(value, path, errors) {
  if (!requireArray(value, path, errors)) return
  value.forEach((node, i) => validateRichText(node, `${path}[${i}]`, errors))
}

function validateInterviewQAItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.question)) errors.push(`${path}.question: required non-empty string.`)
  if (!isNonEmptyString(it.answer)) errors.push(`${path}.answer: required non-empty string.`)
  if (it.difficulty !== undefined && !DIFFICULTY.has(it.difficulty))
    errors.push(`${path}.difficulty: must be one of ${[...DIFFICULTY].join('/')} when present.`)
  if (it.tags !== undefined && !isStringArray(it.tags))
    errors.push(`${path}.tags: must be an array of strings when present.`)
}

function validateScenarioItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.scenario)) errors.push(`${path}.scenario: required non-empty string.`)
  if (!isNonEmptyString(it.question)) errors.push(`${path}.question: required non-empty string.`)
  if (!isNonEmptyString(it.answer)) errors.push(`${path}.answer: required non-empty string.`)
}

function validateCaseStudyItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  for (const k of ['title', 'context', 'problem', 'solution', 'outcome']) {
    if (!isNonEmptyString(it[k])) errors.push(`${path}.${k}: required non-empty string.`)
  }
}

function validateProjectItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.title)) errors.push(`${path}.title: required non-empty string.`)
  if (!isNonEmptyString(it.description)) errors.push(`${path}.description: required non-empty string.`)
  if (!DIFFICULTY.has(it.difficulty))
    errors.push(`${path}.difficulty: must be one of ${[...DIFFICULTY].join('/')} (got ${JSON.stringify(it.difficulty)}).`)
  if (it.requirements !== undefined && !isStringArray(it.requirements))
    errors.push(`${path}.requirements: must be an array of strings when present.`)
}

function validateExamQuestionItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.question)) errors.push(`${path}.question: required non-empty string.`)
  if (!isNonEmptyString(it.answer)) errors.push(`${path}.answer: required non-empty string.`)
  if (it.options !== undefined) {
    if (!isStringArray(it.options) || it.options.length < 2) {
      errors.push(`${path}.options: must be an array of ≥2 strings when present.`)
    } else if (!it.options.includes(it.answer)) {
      errors.push(`${path}.answer: must be one of options when options is present (answer=${JSON.stringify(it.answer)}).`)
    }
  }
  if (it.explanation !== undefined && !isNonEmptyString(it.explanation))
    errors.push(`${path}.explanation: must be a non-empty string when present.`)
}

function validateResourceItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.title)) errors.push(`${path}.title: required non-empty string.`)
  if (!isNonEmptyString(it.url)) errors.push(`${path}.url: required non-empty string.`)
  if (!RESOURCE_TYPES.has(it.type))
    errors.push(`${path}.type: must be one of ${[...RESOURCE_TYPES].join('/')} (got ${JSON.stringify(it.type)}).`)
  if (it.description !== undefined && !isNonEmptyString(it.description))
    errors.push(`${path}.description: must be a non-empty string when present.`)
  if (it.author !== undefined && !isNonEmptyString(it.author))
    errors.push(`${path}.author: must be a non-empty string when present.`)
}

function validatePitfallItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.title)) errors.push(`${path}.title: required non-empty string.`)
  if (!isNonEmptyString(it.avoid)) errors.push(`${path}.avoid: required non-empty string.`)
  if (!isNonEmptyString(it.prefer)) errors.push(`${path}.prefer: required non-empty string.`)
  if (it.why !== undefined && !isNonEmptyString(it.why))
    errors.push(`${path}.why: must be a non-empty string when present.`)
  if (it.example !== undefined && !isNonEmptyString(it.example))
    errors.push(`${path}.example: must be a non-empty string when present.`)
}

function validateCheatSheetGroup(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.title)) errors.push(`${path}.title: required non-empty string.`)
  if (!requireArray(it.entries, `${path}.entries`, errors)) return
  it.entries.forEach((entry, i) => {
    const ep = `${path}.entries[${i}]`
    if (!isObject(entry)) return errors.push(`${ep}: must be an object.`)
    if (!isNonEmptyString(entry.label)) errors.push(`${ep}.label: required non-empty string.`)
    if (entry.code !== undefined && !isNonEmptyString(entry.code))
      errors.push(`${ep}.code: must be a non-empty string when present.`)
    if (entry.language !== undefined && !isNonEmptyString(entry.language))
      errors.push(`${ep}.language: must be a non-empty string when present.`)
    if (entry.note !== undefined && !isNonEmptyString(entry.note))
      errors.push(`${ep}.note: must be a non-empty string when present.`)
  })
}

function validateSynonymItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  if (!isNonEmptyString(it.term)) errors.push(`${path}.term: required non-empty string.`)
  if (!isNonEmptyString(it.definition)) errors.push(`${path}.definition: required non-empty string.`)
}

function validateDiagramItem(it, path, errors) {
  if (!isObject(it)) return errors.push(`${path}: must be an object.`)
  lintMermaid(it.mermaid, path, errors)
  if (it.title !== undefined && !isNonEmptyString(it.title))
    errors.push(`${path}.title: must be a non-empty string when present.`)
  if (it.caption !== undefined && !isNonEmptyString(it.caption))
    errors.push(`${path}.caption: must be a non-empty string when present.`)
}

function validateBlock(block, path, errors) {
  if (!isObject(block)) {
    errors.push(`${path}: must be an object.`)
    return
  }
  if (!BLOCK_TYPES.has(block.type)) {
    errors.push(`${path}.type: must be one of ${[...BLOCK_TYPES].join(', ')}.`)
    return
  }

  switch (block.type) {
    case 'title':
    case 'paragraph':
      validateRichTextArray(block.content, `${path}.content`, errors)
      break
    case 'heading': {
      if (![1, 2, 3, 4].includes(block.level)) {
        errors.push(`${path}.level: must be 1, 2, 3, or 4.`)
      }
      validateRichTextArray(block.content, `${path}.content`, errors)
      break
    }
    case 'list': {
      if (block.ordered !== undefined && typeof block.ordered !== 'boolean') {
        errors.push(`${path}.ordered: must be a boolean when present.`)
      }
      if (!requireArray(block.items, `${path}.items`, errors)) break
      block.items.forEach((item, i) => {
        const itemPath = `${path}.items[${i}]`
        if (!isObject(item)) {
          errors.push(`${itemPath}: must be an object.`)
          return
        }
        validateRichTextArray(item.content, `${itemPath}.content`, errors)
      })
      break
    }
    case 'code_block':
      if (block.language !== undefined && !isNonEmptyString(block.language)) {
        errors.push(`${path}.language: must be a non-empty string when present.`)
      }
      if (!isNonEmptyString(block.code)) {
        errors.push(`${path}.code: required non-empty string.`)
      }
      break
    case 'divider':
      break
    case 'interview_qa':
      validateInterviewQAItem(block.item, `${path}.item`, errors)
      break
    case 'scenario':
      validateScenarioItem(block.item, `${path}.item`, errors)
      break
    case 'case_study':
      validateCaseStudyItem(block.item, `${path}.item`, errors)
      break
    case 'project':
      validateProjectItem(block.item, `${path}.item`, errors)
      break
    case 'quiz':
      validateExamQuestionItem(block.item, `${path}.item`, errors)
      break
    case 'resource':
      validateResourceItem(block.item, `${path}.item`, errors)
      break
    case 'pitfall':
      validatePitfallItem(block.item, `${path}.item`, errors)
      break
    case 'cheatsheet':
      validateCheatSheetGroup(block.item, `${path}.item`, errors)
      break
    case 'glossary_term':
      validateSynonymItem(block.item, `${path}.item`, errors)
      break
    case 'mermaid':
      validateDiagramItem(block.item, `${path}.item`, errors)
      break
    default:
      break
  }
}

function validateExplanation(content, errors) {
  if (!isObject(content)) {
    errors.push('explanation: content must be an object.')
    return
  }
  if (!isNonEmptyString(content.id)) {
    errors.push('explanation.id: required non-empty string.')
  }
  if (!isNonEmptyString(content.title)) {
    errors.push('explanation.title: required non-empty string.')
  }
  if (!requireArray(content.blocks, 'explanation.blocks', errors)) return
  content.blocks.forEach((block, i) => validateBlock(block, `explanation.blocks[${i}]`, errors))
}

function validateExamples(content, errors) {
  if (!isObject(content)) {
    errors.push('examples: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'examples.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `examples.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(it.scenario)) errors.push(`${p}.scenario: required non-empty string.`)
    if (it.explanation !== undefined && !isNonEmptyString(it.explanation))
      errors.push(`${p}.explanation: must be a non-empty string when present.`)
  })
}

function validateCode(content, errors) {
  if (!isObject(content)) {
    errors.push('code: content must be an object.')
    return
  }
  if (!requireArray(content.snippets, 'code.snippets', errors)) return
  content.snippets.forEach((s, i) => {
    const p = `code.snippets[${i}]`
    if (!isObject(s)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(s.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(s.language)) errors.push(`${p}.language: required non-empty string.`)
    if (!isNonEmptyString(s.code)) errors.push(`${p}.code: required non-empty string.`)
    if (s.explanation !== undefined && !isNonEmptyString(s.explanation))
      errors.push(`${p}.explanation: must be a non-empty string when present.`)
  })
}

/**
 * Lightweight Mermaid lint. Catches the rules called out in RULES.md §8:
 * - no `style`/`classDef`/`::someClass`,
 * - no `click ` events,
 * - no `end` as a node ID (followed by `[`/`(`/`{`/space),
 * - first non-blank line declares a known diagram type.
 */
function lintMermaid(mermaid, label, errors) {
  if (!isNonEmptyString(mermaid)) {
    errors.push(`${label}.mermaid: required non-empty string.`)
    return
  }
  const lines = mermaid.split(/\n/)
  const firstNonBlank = lines.find((l) => l.trim().length > 0) ?? ''
  const knownTypes = [
    'flowchart',
    'graph',
    'sequenceDiagram',
    'classDiagram',
    'stateDiagram-v2',
    'erDiagram',
    'gantt',
    'pie',
    'journey',
    'mindmap',
    'timeline',
  ]
  if (!knownTypes.some((t) => firstNonBlank.trim().startsWith(t))) {
    errors.push(`${label}.mermaid: first line should declare a known diagram type (got "${firstNonBlank.trim()}").`)
  }
  if (/(^|\n)\s*style\s+/.test(mermaid)) {
    errors.push(`${label}.mermaid: explicit \`style\` is disallowed (RULES.md §8) — theme handles colours.`)
  }
  if (/(^|\n)\s*classDef\s+/.test(mermaid)) {
    errors.push(`${label}.mermaid: \`classDef\` is disallowed — theme handles colours.`)
  }
  if (/:::\w+/.test(mermaid)) {
    errors.push(`${label}.mermaid: \`:::someClass\` styling is disallowed — theme handles colours.`)
  }
  if (/(^|\n)\s*click\s+\S+/.test(mermaid)) {
    errors.push(`${label}.mermaid: \`click\` events are disallowed (host app disables them).`)
  }
  for (const id of MERMAID_RESERVED_IDS) {
    const re = new RegExp(`(^|\\n|\\s|-->)\\s*${id}\\s*(\\[|\\(|\\{|\\-\\->|$)`, 'm')
    if (re.test(mermaid)) {
      errors.push(
        `${label}.mermaid: reserved keyword "${id}" used as a node ID — rename it (e.g. "${id}Node").`,
      )
    }
  }
}

function validateDiagrams(content, errors) {
  if (!isObject(content)) {
    errors.push('diagrams: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'diagrams.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `diagrams.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    lintMermaid(it.mermaid, p, errors)
    if (it.title !== undefined && !isNonEmptyString(it.title))
      errors.push(`${p}.title: must be a non-empty string when present.`)
    if (it.caption !== undefined && !isNonEmptyString(it.caption))
      errors.push(`${p}.caption: must be a non-empty string when present.`)
  })
}

function validateCharts(content, errors) {
  if (!isObject(content)) {
    errors.push('charts: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'charts.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `charts.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!CHART_KINDS.has(it.kind))
      errors.push(`${p}.kind: must be one of ${[...CHART_KINDS].join('/')} (got ${JSON.stringify(it.kind)}).`)
    if (!isNonEmptyString(it.xKey)) errors.push(`${p}.xKey: required non-empty string.`)
    if (!Array.isArray(it.series) || it.series.length === 0) {
      errors.push(`${p}.series: required non-empty array.`)
    }
    if (!Array.isArray(it.data) || it.data.length === 0) {
      errors.push(`${p}.data: required non-empty array.`)
    }
    if (
      Array.isArray(it.series) &&
      Array.isArray(it.data) &&
      isNonEmptyString(it.xKey)
    ) {
      const seriesKeys = it.series.map((s) => s?.key).filter(isNonEmptyString)
      it.series.forEach((s, j) => {
        if (!isObject(s)) errors.push(`${p}.series[${j}]: must be an object.`)
        else if (!isNonEmptyString(s.key)) errors.push(`${p}.series[${j}].key: required non-empty string.`)
      })
      it.data.forEach((row, j) => {
        if (!isObject(row)) {
          errors.push(`${p}.data[${j}]: must be an object.`)
          return
        }
        if (!(it.xKey in row)) {
          errors.push(`${p}.data[${j}]: missing xKey "${it.xKey}".`)
        }
        for (const k of seriesKeys) {
          if (!(k in row)) {
            errors.push(`${p}.data[${j}]: missing series key "${k}".`)
          } else if (typeof row[k] !== 'number') {
            errors.push(`${p}.data[${j}].${k}: must be a number, not ${typeof row[k]}.`)
          }
        }
      })
    }
  })
}

function validateImages(content, errors) {
  if (!isObject(content)) {
    errors.push('images: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'images.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `images.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.src)) errors.push(`${p}.src: required non-empty string.`)
    else if (/^https?:\/\//i.test(it.src))
      errors.push(`${p}.src: must be a path under public/ (got an external URL).`)
    else if (!it.src.startsWith('content-assets/'))
      errors.push(`${p}.src: must start with "content-assets/" (got ${JSON.stringify(it.src)}).`)
    if (!isNonEmptyString(it.alt)) errors.push(`${p}.alt: required non-empty string.`)
    if (it.caption !== undefined && !isNonEmptyString(it.caption))
      errors.push(`${p}.caption: must be a non-empty string when present.`)
  })
}

function validateSynonyms(content, errors) {
  if (!isObject(content)) {
    errors.push('synonyms: content must be an object.')
    return
  }
  if (!requireArray(content.terms, 'synonyms.terms', errors)) return
  content.terms.forEach((t, i) => {
    const p = `synonyms.terms[${i}]`
    if (!isObject(t)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(t.term)) errors.push(`${p}.term: required non-empty string.`)
    if (!isNonEmptyString(t.definition)) errors.push(`${p}.definition: required non-empty string.`)
  })
}

function validateConnections(content, errors) {
  if (!isObject(content)) {
    errors.push('connections: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'connections.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `connections.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(it.description)) errors.push(`${p}.description: required non-empty string.`)
    if (it.relation !== undefined && !isNonEmptyString(it.relation))
      errors.push(`${p}.relation: must be a non-empty string when present.`)
    if (it.topicId !== undefined && !isNonEmptyString(it.topicId))
      errors.push(`${p}.topicId: must be a non-empty string when present.`)
  })
}

function validateApplications(content, errors) {
  if (!isObject(content)) {
    errors.push('applications: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'applications.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `applications.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(it.description)) errors.push(`${p}.description: required non-empty string.`)
  })
}

function validateTradeoffs(content, errors) {
  if (!isObject(content)) {
    errors.push('tradeoffs: content must be an object.')
    return
  }
  // Per RULES.md §4 row 9 + §13: if tradeoffs is emitted, BOTH advantages
  // and disadvantages must be non-empty arrays of strings with ≥2 items each.
  // A one-sided tradeoff is a contract violation — ship both sides or omit
  // the section entirely.
  if (!isStringArray(content.advantages) || content.advantages.length === 0) {
    errors.push('tradeoffs.advantages: required non-empty array of strings.')
  } else if (content.advantages.length < 2) {
    errors.push(
      `tradeoffs.advantages: must contain ≥2 items when included (got ${content.advantages.length}). One-sided tradeoffs are a contract violation — ship both sides or omit the section.`,
    )
  }
  if (!isStringArray(content.disadvantages) || content.disadvantages.length === 0) {
    errors.push('tradeoffs.disadvantages: required non-empty array of strings.')
  } else if (content.disadvantages.length < 2) {
    errors.push(
      `tradeoffs.disadvantages: must contain ≥2 items when included (got ${content.disadvantages.length}). One-sided tradeoffs are a contract violation — ship both sides or omit the section.`,
    )
  }
}

function validateMistakes(content, errors) {
  if (!isObject(content)) {
    errors.push('mistakes: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'mistakes.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `mistakes.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.mistake)) errors.push(`${p}.mistake: required non-empty string.`)
    if (!isNonEmptyString(it.fix)) errors.push(`${p}.fix: required non-empty string.`)
    if (it.why !== undefined && !isNonEmptyString(it.why))
      errors.push(`${p}.why: must be a non-empty string when present.`)
    if (it.example !== undefined && !isNonEmptyString(it.example))
      errors.push(`${p}.example: must be a non-empty string when present.`)
  })
}

function validateMisconceptions(content, errors) {
  if (!isObject(content)) {
    errors.push('misconceptions: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'misconceptions.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `misconceptions.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.myth)) errors.push(`${p}.myth: required non-empty string.`)
    if (!isNonEmptyString(it.reality)) errors.push(`${p}.reality: required non-empty string.`)
    if (it.example !== undefined && !isNonEmptyString(it.example))
      errors.push(`${p}.example: must be a non-empty string when present.`)
  })
}

function validateBestPractices(content, errors) {
  if (!isObject(content)) {
    errors.push('best-practices: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'best-practices.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `best-practices.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(it.avoid)) errors.push(`${p}.avoid: required non-empty string.`)
    if (!isNonEmptyString(it.prefer)) errors.push(`${p}.prefer: required non-empty string.`)
    if (it.why !== undefined && !isNonEmptyString(it.why))
      errors.push(`${p}.why: must be a non-empty string when present.`)
    if (it.example !== undefined && !isNonEmptyString(it.example))
      errors.push(`${p}.example: must be a non-empty string when present.`)
  })
}

function validateOrigins(content, errors) {
  if (!isObject(content)) {
    errors.push('origins: content must be an object.')
    return
  }
  if (!isNonEmptyString(content.content)) {
    errors.push('origins.content: required non-empty string (Markdown narrative).')
  }
  if (content.timeline !== undefined) {
    if (!Array.isArray(content.timeline)) {
      errors.push('origins.timeline: must be an array when present.')
    } else {
      content.timeline.forEach((t, i) => {
        const p = `origins.timeline[${i}]`
        if (!isObject(t)) return errors.push(`${p}: must be an object.`)
        if (!isNonEmptyString(t.label)) errors.push(`${p}.label: required non-empty string.`)
        if (!isNonEmptyString(t.description)) errors.push(`${p}.description: required non-empty string.`)
      })
    }
  }
}

/**
 * Question-patterns completeness enforcement (RULES.md §6).
 * Beyond shape, this checks per-pattern coverage rules.
 */
function validateQuestionPatterns(content, errors) {
  if (!isObject(content)) {
    errors.push('question-patterns: content must be an object.')
    return
  }
  if (!requireArray(content.groups, 'question-patterns.groups', errors)) return
  content.groups.forEach((g, i) => {
    const p = `question-patterns.groups[${i}]`
    if (!isObject(g)) return errors.push(`${p}: must be an object.`)
    if (!QUESTION_PATTERNS.has(g.pattern)) {
      errors.push(
        `${p}.pattern: must be one of ${[...QUESTION_PATTERNS].join('/')} (got ${JSON.stringify(g.pattern)}).`,
      )
      return
    }
    if (!Array.isArray(g.items) || g.items.length === 0) {
      errors.push(`${p}.items: required non-empty array.`)
      return
    }
    g.items.forEach((it, j) => {
      const pp = `${p}.items[${j}]`
      if (!isObject(it)) return errors.push(`${pp}: must be an object.`)
      if (!isNonEmptyString(it.question)) errors.push(`${pp}.question: required non-empty string.`)
      if (!isNonEmptyString(it.answer)) errors.push(`${pp}.answer: required non-empty string.`)
      // RULES.md §6.3 — strict answers. A real, definitive, self-contained
      // answer almost never fits in fewer than ~40 chars. Below that floor it
      // is almost certainly a hedge ("Bad.", "It depends.", "Many things.")
      // or a placeholder. We deliberately use a length floor (objective) and
      // leave subjective judgement of definitiveness/specificity to review.
      if (isNonEmptyString(it.answer) && it.answer.trim().length < 40) {
        errors.push(
          `${pp}.answer: too short to be a strict answer (got ${it.answer.trim().length} chars, need ≥40). Hedge/placeholder answers like "Bad.", "It depends." or "Varies." fail RULES.md §6.3 — give a definitive, self-contained, topic-specific answer or drop the item.`,
        )
      }
    })

    if (g.pattern === '5w1h') {
      if (g.items.length !== 6) {
        errors.push(`${p}: 5w1h MUST contain exactly 6 items (one for Who/What/When/Where/Why/How); got ${g.items.length}.`)
      }
      const found = new Set()
      for (const it of g.items) {
        const q = String(it?.question ?? '').toLowerCase()
        for (const w of FIVE_W1H_REQUIRED) {
          // Match the word with a question mark/space boundary to avoid false hits.
          const re = new RegExp(`(^|[^a-z])${w}([^a-z]|$)`, 'i')
          if (re.test(q)) found.add(w)
        }
      }
      const missing = FIVE_W1H_REQUIRED.filter((w) => !found.has(w))
      if (missing.length) {
        errors.push(`${p}: 5w1h missing required question word(s): ${missing.join(', ')}.`)
      }
    } else if (g.pattern === 'mindmap') {
      if (g.items.length < 3) {
        errors.push(`${p}: mindmap MUST cover the central concept plus at least 2 branches (need ≥3 items).`)
      }
    } else if (g.pattern === 'socratic') {
      if (g.items.length < 3) {
        errors.push(`${p}: socratic MUST be a chain of progressively deeper questions (need ≥3 items; got ${g.items.length}).`)
      }
    } else if (g.pattern === 'comparative') {
      // Soft check: each item should compare something. Accept the section if
      // ≥2 items OR the question/answer mentions at least one comparative
      // connector ("vs", " versus ", " or ", "compared to", "differ").
      const hasComparator = g.items.some((it) => {
        const t = `${it?.question ?? ''} ${it?.answer ?? ''}`.toLowerCase()
        return /\bvs\.?\b|\bversus\b|\bcompared to\b|\bdiffer/.test(t)
      })
      if (g.items.length < 2 && !hasComparator) {
        errors.push(`${p}: comparative MUST compare at least 2 named alternatives.`)
      }
    } else if (g.pattern === 'what-if' || g.pattern === 'what-breaks-this' || g.pattern === 'cause-effect') {
      if (g.items.length < 1) {
        errors.push(`${p}: ${g.pattern} MUST contain at least one full scenario/cause AND its consequence/effect.`)
      }
    }
  })
}

function validateMaterials(content, errors) {
  if (!isObject(content)) {
    errors.push('materials: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'materials.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `materials.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(it.url)) errors.push(`${p}.url: required non-empty string.`)
    if (!MATERIAL_TYPES.has(it.type))
      errors.push(`${p}.type: must be one of ${[...MATERIAL_TYPES].join('/')} (got ${JSON.stringify(it.type)}).`)
    if (it.description !== undefined && !isNonEmptyString(it.description))
      errors.push(`${p}.description: must be a non-empty string when present.`)
  })
}

function validateReferences(content, errors) {
  if (!isObject(content)) {
    errors.push('references: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'references.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `references.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(it.url)) errors.push(`${p}.url: required non-empty string.`)
    if (it.author !== undefined && !isNonEmptyString(it.author))
      errors.push(`${p}.author: must be a non-empty string when present.`)
    if (it.note !== undefined && !isNonEmptyString(it.note))
      errors.push(`${p}.note: must be a non-empty string when present.`)
  })
}

function validateProjects(content, errors) {
  if (!isObject(content)) {
    errors.push('projects: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'projects.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `projects.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isNonEmptyString(it.description)) errors.push(`${p}.description: required non-empty string.`)
    if (!DIFFICULTY.has(it.difficulty))
      errors.push(`${p}.difficulty: must be one of ${[...DIFFICULTY].join('/')} (got ${JSON.stringify(it.difficulty)}).`)
    if (it.requirements !== undefined && !isStringArray(it.requirements))
      errors.push(`${p}.requirements: must be an array of strings when present.`)
  })
}

function validateInterviewQuestions(content, errors) {
  if (!isObject(content)) {
    errors.push('interview-questions: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'interview-questions.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `interview-questions.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.question)) errors.push(`${p}.question: required non-empty string.`)
    if (!isNonEmptyString(it.answer)) errors.push(`${p}.answer: required non-empty string.`)
    if (it.difficulty !== undefined && !DIFFICULTY.has(it.difficulty))
      errors.push(`${p}.difficulty: must be one of ${[...DIFFICULTY].join('/')} when present.`)
    if (it.tags !== undefined && !isStringArray(it.tags))
      errors.push(`${p}.tags: must be an array of strings when present.`)
  })
}

function validateScenarioQuestions(content, errors) {
  if (!isObject(content)) {
    errors.push('scenario-questions: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'scenario-questions.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `scenario-questions.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.scenario)) errors.push(`${p}.scenario: required non-empty string.`)
    if (!isNonEmptyString(it.question)) errors.push(`${p}.question: required non-empty string.`)
    if (!isNonEmptyString(it.answer)) errors.push(`${p}.answer: required non-empty string.`)
  })
}

function validateCaseStudies(content, errors) {
  if (!isObject(content)) {
    errors.push('case-studies: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'case-studies.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `case-studies.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    for (const k of ['title', 'context', 'problem', 'solution', 'outcome']) {
      if (!isNonEmptyString(it[k])) errors.push(`${p}.${k}: required non-empty string.`)
    }
  })
}

function validateExamPrep(content, errors) {
  if (!isObject(content)) {
    errors.push('exam-prep: content must be an object.')
    return
  }
  if (!requireArray(content.items, 'exam-prep.items', errors)) return
  content.items.forEach((it, i) => {
    const p = `exam-prep.items[${i}]`
    if (!isObject(it)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(it.question)) errors.push(`${p}.question: required non-empty string.`)
    if (!isNonEmptyString(it.answer)) errors.push(`${p}.answer: required non-empty string.`)
    if (it.options !== undefined) {
      if (!isStringArray(it.options) || it.options.length < 2) {
        errors.push(`${p}.options: must be an array of ≥2 strings when present.`)
      } else if (!it.options.includes(it.answer)) {
        errors.push(`${p}.answer: must be one of options when options is present (answer=${JSON.stringify(it.answer)}).`)
      }
    }
    if (it.explanation !== undefined && !isNonEmptyString(it.explanation))
      errors.push(`${p}.explanation: must be a non-empty string when present.`)
  })
}

function validateCoursePrep(content, errors) {
  if (!isObject(content)) {
    errors.push('course-prep: content must be an object.')
    return
  }
  if (!requireArray(content.modules, 'course-prep.modules', errors)) return
  content.modules.forEach((m, i) => {
    const p = `course-prep.modules[${i}]`
    if (!isObject(m)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(m.title)) errors.push(`${p}.title: required non-empty string.`)
    if (!isStringArray(m.lessons) || m.lessons.length === 0)
      errors.push(`${p}.lessons: required non-empty array of strings.`)
    if (m.duration !== undefined && !isNonEmptyString(m.duration))
      errors.push(`${p}.duration: must be a non-empty string when present.`)
  })
}

function validateMastery(content, errors) {
  if (!isObject(content)) {
    errors.push('mastery: content must be an object.')
    return
  }
  if (!requireArray(content.criteria, 'mastery.criteria', errors)) return
  content.criteria.forEach((c, i) => {
    const p = `mastery.criteria[${i}]`
    if (!isObject(c)) return errors.push(`${p}: must be an object.`)
    if (!isNonEmptyString(c.label)) errors.push(`${p}.label: required non-empty string.`)
    if (c.level !== undefined && !DIFFICULTY.has(c.level))
      errors.push(`${p}.level: must be one of ${[...DIFFICULTY].join('/')} when present.`)
    // RULES.md §5.2 + §13: mastery is provable capability, not aspiration. Every
    // criterion MUST ship a concrete `example` (problem statement, snippet, or
    // scenario the learner can actually produce). A missing or filler example
    // makes the criterion impossible to assess and is treated as missing.
    if (!isNonEmptyString(c.example)) {
      errors.push(
        `${p}.example: required non-empty string per RULES.md §5.2. Provide a tiny observable artefact the learner could produce to demonstrate "${typeof c.label === 'string' ? c.label.slice(0, 60) : '<unknown label>'}" — not a restatement of the label.`,
      )
    }
  })
}

const VALIDATORS = {
  explanation: validateExplanation,
  examples: validateExamples,
  code: validateCode,
  diagrams: validateDiagrams,
  charts: validateCharts,
  images: validateImages,
  synonyms: validateSynonyms,
  connections: validateConnections,
  applications: validateApplications,
  tradeoffs: validateTradeoffs,
  mistakes: validateMistakes,
  misconceptions: validateMisconceptions,
  'best-practices': validateBestPractices,
  origins: validateOrigins,
  'question-patterns': validateQuestionPatterns,
  materials: validateMaterials,
  references: validateReferences,
  projects: validateProjects,
  'interview-questions': validateInterviewQuestions,
  'scenario-questions': validateScenarioQuestions,
  'case-studies': validateCaseStudies,
  'exam-prep': validateExamPrep,
  'course-prep': validateCoursePrep,
  mastery: validateMastery,
}

/**
 * Run the validator for `sectionKey` against `content`.
 * Returns `{ ok: boolean, errors: string[] }`.
 */
export function validateSection(sectionKey, content) {
  const validator = VALIDATORS[sectionKey]
  if (!validator) {
    return { ok: false, errors: [`Unknown section key: ${sectionKey}`] }
  }
  const errors = []
  validator(content, errors)
  checkAllowedFields(sectionKey, content, errors)
  return { ok: errors.length === 0, errors }
}
