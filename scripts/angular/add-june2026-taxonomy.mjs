/**
 * June 2026 Angular taxonomy gap-fill (Angular v22):
 * - v22 template, router, CD, DI, signal-forms, async reactivity, AI/MCP leaves
 * - version-migrations topic, architecture patterns, roadmap visibility
 *
 * No document.json — metadata only.
 *
 * Usage: node scripts/angular/add-june2026-taxonomy.mjs [--dry-run]
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/angular')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const ROADMAP_FILE = resolve(SUBJECT_DIR, 'roadmap.json')
const SUBJECT_FILE = resolve(SUBJECT_DIR, 'subject.json')
const DRY_RUN = process.argv.includes('--dry-run')

let written = 0
let skipped = 0
let patched = 0

/** @param {Record<string, unknown>} meta */
function writeTopic(meta) {
  const file = resolve(TOPICS_DIR, meta.id, 'topic.json')
  if (existsSync(file)) {
    skipped += 1
    return false
  }
  const payload = { ...meta }
  if (payload.parentId === undefined) delete payload.parentId
  if (!DRY_RUN) {
    mkdirSync(resolve(TOPICS_DIR, meta.id), { recursive: true })
    writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`)
  }
  written += 1
  return true
}

/** @param {string} id @param {Record<string, unknown>} patch */
function patchTopic(id, patch) {
  const file = resolve(TOPICS_DIR, id, 'topic.json')
  if (!existsSync(file)) {
    console.warn(`patch: missing ${id}`)
    return
  }
  const existing = JSON.parse(readFileSync(file, 'utf8'))
  const next = { ...existing, ...patch }
  if (patch.parentId === null) delete next.parentId
  if (!DRY_RUN) {
    writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`)
  }
  patched += 1
}

/**
 * @param {string} parentId
 * @param {string} tag
 * @param {string} level
 * @param {Array<{ id: string, title: string, order?: number, level?: string }>} leaves
 * @param {number} [startOrder]
 */
function writeLeavesUnderParent(parentId, tag, level, leaves, startOrder = 0) {
  let nextOrder = startOrder
  for (const leaf of leaves) {
    const order = leaf.order ?? ++nextOrder
    if (leaf.order == null) nextOrder = order
    writeTopic({
      id: `${parentId}--${leaf.id}`,
      title: leaf.title,
      summary: leaf.title,
      order,
      level: leaf.level ?? level,
      tags: [tag],
      parentId,
    })
  }
}

/** @param {object} root */
function writeTree(root) {
  writeTopic({
    id: root.id,
    title: root.title,
    summary: root.summary ?? root.title,
    order: root.order,
    level: root.level,
    tags: root.tags,
    parentId: root.parentId,
  })

  for (const [subIdx, sub] of root.subtopics.entries()) {
    const subId = `${root.id}--${sub.id}`
    writeTopic({
      id: subId,
      title: sub.title,
      summary: sub.title,
      order: sub.order ?? subIdx + 1,
      level: sub.level ?? root.level,
      tags: root.tags,
      parentId: root.id,
    })
    for (const [leafIdx, leaf] of sub.leaves.entries()) {
      writeTopic({
        id: `${subId}--${leaf.id}`,
        title: leaf.title,
        summary: leaf.title,
        order: leaf.order ?? leafIdx + 1,
        level: leaf.level ?? sub.level ?? root.level,
        tags: root.tags,
        parentId: subId,
      })
    }
  }
}

// ── v22 template syntax ───────────────────────────────────────────────────────

writeLeavesUnderParent('control-flow', 'components', 'intermediate', [
  { id: 'multi-case-switch', title: 'Stacked @case Matching (v22)' },
])

writeLeavesUnderParent('interpolation-expressions', 'components', 'intermediate', [
  { id: 'spread-rest-syntax', title: 'Spread & Rest in Templates (v22)' },
  { id: 'template-arrow-functions', title: 'Inline Arrow Functions in Templates (v22)' },
  { id: 'safe-navigation-narrowing-v22', title: 'Safe Navigation Nullable Narrowing (v22)' },
])

// ── v22 router ────────────────────────────────────────────────────────────────

writeLeavesUnderParent('advanced-routing-features', 'routing', 'advanced', [
  { id: 'platform-navigation-api', title: 'withExperimentalPlatformNavigation() (v22)' },
  { id: 'auto-cleanup-injectors', title: 'withExperimentalAutoCleanupInjectors() (v22)' },
  { id: 'destroy-detached-route-handle', title: 'destroyDetachedRouteHandle() (v22)' },
])

// ── v22 change detection & DI ─────────────────────────────────────────────────

writeLeavesUnderParent('cd-strategies', 'performance', 'intermediate', [
  { id: 'eager-strategy-v22', title: 'ChangeDetectionStrategy.Eager (v22)' },
])

writeLeavesUnderParent('using-services', 'services-di', 'intermediate', [
  { id: 'injectasync-prefetch-onidle', title: 'injectAsync() Prefetch with onIdle (v22)' },
])

writeLeavesUnderParent('directive-composition-api', 'directives', 'advanced', [
  { id: 'host-directive-deduplication', title: 'Host Directive De-duplication (v22)' },
])

// ── v22 signals & async reactivity ────────────────────────────────────────────

writeLeavesUnderParent('signal-utilities', 'signals', 'intermediate', [
  { id: 'linkedsignal-write-back-v22', title: 'linkedSignal() Write-back (v22)' },
  { id: 'resource-params-return-statuses', title: 'resource() params Return Statuses (v22)' },
  { id: 'synchronous-stream-resources', title: 'Synchronous Values for Stream Resources (v22)' },
])

writeLeavesUnderParent('http-resource', 'http-backend', 'intermediate', [
  { id: 'async-reactivity-stable-v22', title: 'Async Reactivity APIs Stable (v22)' },
])

// ── v22 signal forms ──────────────────────────────────────────────────────────

writeLeavesUnderParent('signal-forms--core-api', 'forms', 'intermediate', [
  { id: 'signal-forms-stable-v22', title: 'Signal Forms Production-Ready (v22)' },
  { id: 'form-field-directive', title: 'FormField Directive & Template Bindings' },
])

writeLeavesUnderParent('signal-forms--validation-and-events', 'forms', 'intermediate', [
  { id: 'validate-standard-schema', title: 'validateStandardSchema() & Standard Schema (v22)' },
])

writeLeavesUnderParent('signal-forms--integration-and-advanced', 'forms', 'advanced', [
  { id: 'compat-form-reactive', title: 'compatForm() Reactive Forms Interop (v22)' },
  { id: 'material-signal-forms', title: 'Angular Material & Signal Forms Integration (v22)' },
])

// ── v22 Angular Aria ──────────────────────────────────────────────────────────

patchTopic('angular-aria', {
  title: 'Angular Aria (Headless UI, v22 Stable)',
  summary: 'Angular Aria (Headless UI, v22 Stable)',
})

writeLeavesUnderParent('angular-aria', 'i18n-a11y-security', 'advanced', [
  { id: 'test-harnesses', title: 'Aria Test Harnesses (v22)' },
])

// ── v22 AI / MCP ──────────────────────────────────────────────────────────────

writeLeavesUnderParent('ai-assisted-development', 'enterprise-advanced', 'advanced', [
  { id: 'mcp-devserver-tools', title: 'MCP Devserver Tools (start/stop/wait_for_build, v22)' },
  { id: 'mcp-stable-v22', title: 'Angular MCP Stable (v22)' },
  { id: 'angular-developer-skill', title: 'angular-developer Agent Skill' },
  { id: 'angular-new-app-skill', title: 'angular-new-app Agent Skill' },
  { id: 'contributor-skills', title: 'Contributor Agent Skills' },
  { id: 'ai-studio-gemini-builder', title: 'Google AI Studio & Gemini Canvas Builders' },
  { id: 'onpush-zoneless-migration-tool', title: 'onpush_zoneless_migration MCP Tool' },
  { id: 'provide-webmcp-tools', title: 'provideWebMcpTools() (v22)' },
])

writeLeavesUnderParent('staying-expert', 'enterprise-advanced', 'advanced', [
  { id: 'contributor-agent-skills', title: 'Using Contributor Agent Skills' },
])

// ── v22 history & build tooling ───────────────────────────────────────────────

writeLeavesUnderParent('angular-history-versions', 'angular-essentials', 'beginner', [
  { id: 'angular-v22-release-highlights', title: 'Angular v22 Release Highlights (June 2026)' },
  { id: 'updating-to-angular-v22', title: 'Updating to Angular v22' },
])

writeLeavesUnderParent('modern-build', 'build-deploy', 'intermediate', [
  { id: 'webpack-deprecation-v22', title: 'Webpack Builder Deprecation (v22)' },
  { id: 'tsgo-application-builder', title: 'TSGo & Application Builder (v22)' },
])

writeLeavesUnderParent('http-setup', 'http-backend', 'intermediate', [
  { id: 'httpxhr-backend-migration', title: 'HttpXhrBackend Migration Schematic (v22)' },
])

writeLeavesUnderParent('advanced-rendering', 'enterprise-advanced', 'advanced', [
  { id: 'shadow-root-bootstrap-v22', title: 'Bootstrap Under Shadow Roots (v22)' },
  { id: 'nested-leave-animations-v22', title: 'Nested Leave Animations (v22)' },
])

// ── Beginner roadmap orientation ──────────────────────────────────────────────

writeLeavesUnderParent('intro-overview', 'angular-essentials', 'beginner', [
  { id: 'using-this-roadmap', title: 'How to Use This Learning Roadmap' },
])

// ── Architecture patterns ─────────────────────────────────────────────────────

writeTopic({
  id: 'app-architecture--domain-driven-design',
  title: 'Domain-Driven Design',
  summary: 'Domain-Driven Design',
  order: 4,
  level: 'advanced',
  tags: ['architecture'],
  parentId: 'app-architecture',
})

writeLeavesUnderParent('app-architecture--domain-driven-design', 'architecture', 'advanced', [
  { id: 'ddd-fundamentals', title: 'DDD Fundamentals for Frontend' },
  { id: 'bounded-contexts', title: 'Bounded Contexts & Ubiquitous Language' },
  { id: 'frontend-ddd-patterns', title: 'Frontend DDD Patterns in Angular' },
])

writeTopic({
  id: 'app-architecture--feature-sliced-design',
  title: 'Feature-Sliced Design',
  summary: 'Feature-Sliced Design',
  order: 5,
  level: 'advanced',
  tags: ['architecture'],
  parentId: 'app-architecture',
})

writeLeavesUnderParent('app-architecture--feature-sliced-design', 'architecture', 'advanced', [
  { id: 'fsd-overview', title: 'Feature-Sliced Design Overview' },
  { id: 'fsd-layers', title: 'FSD Layers (app, pages, features, entities, shared)' },
  { id: 'fsd-in-angular', title: 'Applying FSD in Angular Projects' },
])

// ── Version migrations (new roadmap topic) ────────────────────────────────────

writeTree({
  id: 'version-migrations',
  title: 'Version Migrations',
  order: 198,
  level: 'intermediate',
  tags: ['angular-essentials'],
  subtopics: [
    {
      id: 'updating-to-v22',
      title: 'Updating to Angular v22',
      leaves: [
        { id: 'ng-update-v22', title: 'ng update @angular/core@22' },
        { id: 'v22-breaking-changes', title: 'v22 Breaking Changes' },
        { id: 'v22-deprecations', title: 'v22 Deprecations & Removals' },
        { id: 'v22-migration-checklist', title: 'v22 Migration Checklist' },
      ],
    },
    {
      id: 'ongoing-updates',
      title: 'Ongoing Framework Updates',
      leaves: [
        { id: 'angular-update-guide', title: 'Angular Update Guide Workflow' },
        { id: 'migration-schematics', title: 'Migration Schematics' },
        { id: 'third-party-library-updates', title: 'Updating Third-Party Libraries' },
        { id: 'peer-dependency-resolution', title: 'Peer Dependency Resolution' },
      ],
    },
    {
      id: 'deprecation-management',
      title: 'Deprecation Management',
      leaves: [
        { id: 'tracking-deprecations', title: 'Tracking Deprecation Warnings' },
        { id: 'webpack-to-esbuild-migration', title: 'Migrating from Webpack to Application Builder' },
        { id: 'eager-cd-migration', title: 'Migrating to OnPush & Eager Strategy' },
      ],
    },
  ],
})

// ── Roadmap & subject metadata ────────────────────────────────────────────────

function updateRoadmap() {
  const roadmap = JSON.parse(readFileSync(ROADMAP_FILE, 'utf8'))

  const essentials = roadmap.stages.find((s) => s.id === 'angular-essentials')
  if (essentials && !essentials.nodes.some((n) => n.topicId === 'version-migrations')) {
    const practiceIdx = essentials.nodes.findIndex((n) => n.topicId === 'practice-projects')
    const insertAt = practiceIdx >= 0 ? practiceIdx : essentials.nodes.length
    essentials.nodes.splice(insertAt, 0, {
      id: 'version-migrations',
      title: 'Version Migrations',
      topicId: 'version-migrations',
      status: 'core',
      description: 'Update guides, breaking changes and migration checklists for Angular v22.',
    })
  }

  const i18n = roadmap.stages.find((s) => s.id === 'i18n-a11y-security')
  if (i18n && !i18n.nodes.some((n) => n.topicId === 'angular-aria')) {
    const securityIdx = i18n.nodes.findIndex((n) => n.topicId === 'security')
    const insertAt = securityIdx >= 0 ? securityIdx : i18n.nodes.length
    i18n.nodes.splice(insertAt, 0, {
      id: 'angular-aria',
      title: 'Angular Aria',
      topicId: 'angular-aria',
      status: 'core',
      description: 'Headless, accessible UI primitives — stable in Angular v22.',
    })
  }

  if (!roadmap.stages.some((s) => s.id === 'ai-development')) {
    const buildDeployIdx = roadmap.stages.findIndex((s) => s.id === 'build-deploy')
    const insertAt = buildDeployIdx >= 0 ? buildDeployIdx + 1 : roadmap.stages.length
    roadmap.stages.splice(insertAt, 0, {
      id: 'ai-development',
      title: 'Build with AI',
      summary: 'AI-assisted development with Angular MCP, Agent Skills and WebMCP.',
      nodes: [
        {
          id: 'ai-assisted-development',
          title: 'AI-Assisted Development',
          topicId: 'ai-assisted-development',
          status: 'optional',
          description:
            'Angular MCP server, Agent Skills, WebMCP and AI debugging workflows.',
        },
      ],
    })
  }

  const signals = roadmap.stages.find((s) => s.id === 'signals')
  if (signals && !signals.nodes.some((n) => n.topicId === 'async-reactivity')) {
    const interopIdx = signals.nodes.findIndex((n) => n.topicId === 'signals-rxjs-interop')
    const insertAt = interopIdx >= 0 ? interopIdx + 1 : signals.nodes.length
    signals.nodes.splice(insertAt, 0, {
      id: 'async-reactivity',
      title: 'Async Reactivity',
      topicId: 'async-reactivity',
      status: 'core',
      description: 'resource(), httpResource() and rxResource() — stable in Angular v22.',
    })
  }

  if (!DRY_RUN) {
    writeFileSync(ROADMAP_FILE, `${JSON.stringify(roadmap, null, 2)}\n`)
  }
}

// ── Async reactivity roadmap root (aggregates stable v22 APIs) ──────────────────

writeTree({
  id: 'async-reactivity',
  title: 'Async Reactivity',
  order: 495,
  level: 'intermediate',
  tags: ['signals'],
  subtopics: [
    {
      id: 'resource-api',
      title: 'resource() API',
      leaves: [
        { id: 'resource-basics', title: 'resource() Basics' },
        { id: 'resource-params-loader', title: 'params & loader Functions' },
        { id: 'resource-error-reload', title: 'Error Handling & reload()' },
      ],
    },
    {
      id: 'http-and-rx-resources',
      title: 'httpResource & rxResource',
      leaves: [
        { id: 'httpresource-patterns', title: 'httpResource() Patterns' },
        { id: 'rxresource-patterns', title: 'rxResource() Patterns' },
        { id: 'stable-v22-production', title: 'Production-Ready in v22' },
      ],
    },
    {
      id: 'migration-from-rxjs',
      title: 'Migrating from RxJS Data Loading',
      leaves: [
        { id: 'from-switchmap', title: 'From switchMap + subscribe' },
        { id: 'from-async-pipe', title: 'From async Pipe Patterns' },
        { id: 'interop-with-rxjs', title: 'Interop with Existing RxJS Streams' },
      ],
    },
  ],
})

updateRoadmap()

if (existsSync(SUBJECT_FILE)) {
  const subject = JSON.parse(readFileSync(SUBJECT_FILE, 'utf8'))
  const note =
    'Beginner-to-expert roadmap updated for Angular v22 (June 2026): Signal Forms, Angular Aria, async reactivity, AI/MCP, template enhancements and migration guides.'
  if (!subject.description?.includes('Angular v22')) {
    subject.description = subject.description
      ? `${subject.description} ${note}`
      : note
    if (!DRY_RUN) {
      writeFileSync(SUBJECT_FILE, `${JSON.stringify(subject, null, 2)}\n`)
    }
  }
}

if (!DRY_RUN) {
  execSync('npm run gen:content', {
    cwd: resolve(__dirname, '../..'),
    stdio: 'inherit',
  })
}

console.log(
  `[angular] add-june2026: wrote ${written}, skipped ${skipped}, patched ${patched}${DRY_RUN ? ' (dry-run)' : ''}.`,
)
