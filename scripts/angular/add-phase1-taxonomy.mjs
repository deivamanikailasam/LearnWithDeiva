/**
 * Phase 1 Angular taxonomy: roadmap nodes + topic tree (no document.json).
 *
 * Usage: node scripts/angular/add-phase1-taxonomy.mjs [--dry-run]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/angular')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const ROADMAP_FILE = resolve(SUBJECT_DIR, 'roadmap.json')
const DRY_RUN = process.argv.includes('--dry-run')

/** @param {Record<string, unknown>} meta */
function writeTopic(meta) {
  const dir = resolve(TOPICS_DIR, meta.id)
  const file = resolve(dir, 'topic.json')
  const payload = { ...meta }
  if (payload.parentId === undefined) delete payload.parentId
  const text = `${JSON.stringify(payload, null, 2)}\n`
  if (DRY_RUN) return
  mkdirSync(dir, { recursive: true })
  writeFileSync(file, text)
}

/**
 * @param {object} root
 * @param {string} root.id
 * @param {string} root.title
 * @param {string} [root.summary]
 * @param {number} root.order
 * @param {string} root.level
 * @param {string[]} root.tags
 * @param {string} [root.parentId]
 * @param {Array<{ id: string, title: string, leaves: Array<{ id: string, title: string }> }>} root.subtopics
 */
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

  root.subtopics.forEach((sub, subIdx) => {
    const subId = root.parentId ? `${root.id}--${sub.id}` : `${root.id}--${sub.id}`
    // Subtopic id: if root is already a subtopic (has parentId), use root.id--sub.id
    // If root is roadmap topic, subtopic id is `${root.id}--${sub.id}` OR bare sub.id under root?
    // Convention: subtopics under roadmap root use bare id like `tosignal-toobservable` with parentId root.id
    // OR prefixed like `troubleshooting--cli-and-build-errors`
    // Enterprise uses prefix. Technical mixed: `http-resource` is bare under httpclient-basics.
    // For NEW topics use prefix pattern `${root.id}--${sub.id}` for consistency with enterprise.

    const actualSubId = sub.useBareId ? sub.id : `${root.id}--${sub.id}`
    writeTopic({
      id: actualSubId,
      title: sub.title,
      summary: sub.title,
      order: sub.order ?? subIdx + 1,
      level: sub.level ?? root.level,
      tags: root.tags,
      parentId: root.id,
    })

    sub.leaves.forEach((leaf, leafIdx) => {
      const leafId = `${actualSubId}--${leaf.id}`
      writeTopic({
        id: leafId,
        title: leaf.title,
        summary: leaf.title,
        order: leaf.order ?? leafIdx + 1,
        level: leaf.level ?? sub.level ?? root.level,
        tags: root.tags,
        parentId: actualSubId,
      })
    })
  })
}

/** @param {Array<{ id: string, title: string, order?: number, level?: string }>} leaves */
function writeLeavesUnderParent(parentId, tag, level, leaves, startOrder = 0) {
  let nextOrder = startOrder
  leaves.forEach((leaf, i) => {
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
  })
}

function patchTopic(id, patch) {
  const file = resolve(TOPICS_DIR, id, 'topic.json')
  if (!existsSync(file)) {
    console.warn(`patch: missing ${id}`)
    return
  }
  const existing = JSON.parse(readFileSync(file, 'utf8'))
  const next = { ...existing, ...patch }
  if (patch.parentId === null) delete next.parentId
  if (DRY_RUN) return
  writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`)
}

function updateRoadmap() {
  const roadmap = JSON.parse(readFileSync(ROADMAP_FILE, 'utf8'))

  const essentials = roadmap.stages.find((s) => s.id === 'angular-essentials')
  if (essentials && !essentials.nodes.some((n) => n.topicId === 'troubleshooting')) {
    essentials.nodes.push(
      {
        id: 'troubleshooting',
        title: 'Troubleshooting & Debugging',
        topicId: 'troubleshooting',
        status: 'core',
        description: 'Common CLI, template and runtime errors and how to fix them.',
      },
      {
        id: 'practice-projects',
        title: 'Practice Projects',
        topicId: 'practice-projects',
        status: 'optional',
        description: 'Hands-on beginner, intermediate and capstone projects.',
      },
    )
  }

  const forms = roadmap.stages.find((s) => s.id === 'forms')
  if (forms && !forms.nodes.some((n) => n.topicId === 'signal-forms')) {
    const dynamicIdx = forms.nodes.findIndex((n) => n.topicId === 'dynamic-forms')
    const insertAt = dynamicIdx >= 0 ? dynamicIdx : forms.nodes.length
    forms.nodes.splice(insertAt, 0, {
      id: 'signal-forms',
      title: 'Signal Forms',
      topicId: 'signal-forms',
      status: 'core',
      description: 'Signal-based forms with schema validation and reactive field state.',
    })
  }

  const http = roadmap.stages.find((s) => s.id === 'http-backend')
  if (http && !http.nodes.some((n) => n.topicId === 'api-mocking')) {
    const backendIdx = http.nodes.findIndex((n) => n.topicId === 'backend-integration')
    const insertAt = backendIdx >= 0 ? backendIdx : http.nodes.length
    http.nodes.splice(insertAt, 0, {
      id: 'api-mocking',
      title: 'API Mocking (MSW)',
      topicId: 'api-mocking',
      status: 'optional',
      description: 'Mock HTTP and GraphQL APIs during development and testing.',
    })
  }

  const testing = roadmap.stages.find((s) => s.id === 'testing')
  if (testing && !testing.nodes.some((n) => n.topicId === 'component-documentation')) {
    testing.nodes.push({
      id: 'component-documentation',
      title: 'Component Documentation (Storybook)',
      topicId: 'component-documentation',
      status: 'optional',
      description: 'Document and develop components in isolation with Storybook.',
    })
  }

  if (!roadmap.stages.some((s) => s.id === 'cross-platform')) {
    roadmap.stages.push({
      id: 'cross-platform',
      title: 'Cross-Platform Apps',
      summary: 'Ship Angular apps to mobile and desktop with Capacitor, Ionic and Electron.',
      nodes: [
        {
          id: 'capacitor-mobile',
          title: 'Capacitor Mobile Apps',
          topicId: 'capacitor-mobile',
          status: 'optional',
          description: 'Wrap Angular apps as native iOS and Android applications.',
        },
        {
          id: 'ionic-framework',
          title: 'Ionic Framework',
          topicId: 'ionic-framework',
          status: 'optional',
          description: 'Mobile-first UI components and navigation with Ionic Angular.',
        },
        {
          id: 'electron-desktop',
          title: 'Electron Desktop Apps',
          topicId: 'electron-desktop',
          status: 'optional',
          description: 'Package Angular as cross-platform desktop applications.',
        },
      ],
    })
  }

  if (!DRY_RUN) {
    writeFileSync(ROADMAP_FILE, `${JSON.stringify(roadmap, null, 2)}\n`)
  }
}

// ── Promote signal-forms to roadmap root ─────────────────────────────────────
patchTopic('signal-forms', {
  parentId: null,
  order: 538,
  level: 'intermediate',
  title: 'Signal Forms',
  summary: 'Signal-based forms with schema validation and reactive field state.',
})

writeLeavesUnderParent('signal-forms', 'forms', 'intermediate', [
  { id: 'array-fields', title: 'Array Fields & Field Arrays' },
  { id: 'nested-groups', title: 'Nested Groups & Composite Models' },
  { id: 'migrating-from-reactive', title: 'Migrating from Reactive Forms' },
], 13)

// ── New roadmap topic trees ───────────────────────────────────────────────────

writeTree({
  id: 'troubleshooting',
  title: 'Troubleshooting & Debugging',
  order: 199,
  level: 'beginner',
  tags: ['angular-essentials'],
  subtopics: [
    {
      id: 'cli-and-build-errors',
      title: 'CLI & Build Errors',
      leaves: [
        { id: 'ng-serve-failures', title: 'ng serve Failures' },
        { id: 'build-budget-errors', title: 'Build Budget & Bundle Errors' },
        { id: 'dependency-resolution-errors', title: 'Dependency Resolution Errors' },
        { id: 'node-version-mismatch', title: 'Node.js Version Mismatch' },
      ],
    },
    {
      id: 'template-errors',
      title: 'Template Errors',
      leaves: [
        { id: 'ng-template-errors', title: 'NG0xxx Template Errors' },
        { id: 'binding-errors', title: 'Binding & Expression Errors' },
        { id: 'control-flow-errors', title: 'Control Flow Syntax Errors' },
        { id: 'standalone-import-errors', title: 'Standalone Import Errors' },
      ],
    },
    {
      id: 'runtime-errors',
      title: 'Runtime Errors',
      leaves: [
        { id: 'injector-errors', title: 'Injector & DI Errors' },
        { id: 'change-detection-errors', title: 'Change Detection Errors' },
        { id: 'null-reference-in-templates', title: 'Null Reference in Templates' },
        { id: 'zone-and-async-errors', title: 'Zone.js & Async Errors' },
      ],
    },
  ],
})

writeTree({
  id: 'practice-projects',
  title: 'Practice Projects',
  order: 200,
  level: 'beginner',
  tags: ['angular-essentials'],
  subtopics: [
    {
      id: 'beginner-projects',
      title: 'Beginner Projects',
      leaves: [
        { id: 'todo-app', title: 'Todo App' },
        { id: 'weather-dashboard', title: 'Weather Dashboard' },
        { id: 'quote-generator', title: 'Quote Generator' },
      ],
    },
    {
      id: 'intermediate-projects',
      title: 'Intermediate Projects',
      leaves: [
        { id: 'crud-with-auth', title: 'CRUD App with Auth' },
        { id: 'multi-step-form-wizard', title: 'Multi-Step Form Wizard' },
        { id: 'paginated-data-table', title: 'Paginated Data Table' },
      ],
    },
    {
      id: 'capstone-projects',
      title: 'Capstone Projects',
      leaves: [
        { id: 'full-stack-dashboard', title: 'Full-Stack Dashboard' },
        { id: 'e-commerce-storefront', title: 'E-Commerce Storefront' },
        { id: 'team-collaboration-app', title: 'Team Collaboration App' },
      ],
    },
  ],
})

writeTree({
  id: 'api-mocking',
  title: 'API Mocking (MSW)',
  order: 615,
  level: 'intermediate',
  tags: ['http-backend'],
  subtopics: [
    {
      id: 'msw-fundamentals',
      title: 'MSW Fundamentals',
      leaves: [
        { id: 'what-is-msw', title: 'What is Mock Service Worker?' },
        { id: 'setup-msw-angular', title: 'Setting Up MSW in Angular' },
        { id: 'request-handlers', title: 'Request Handlers' },
      ],
    },
    {
      id: 'msw-in-development',
      title: 'MSW in Development & Testing',
      leaves: [
        { id: 'mocking-httpclient', title: 'Mocking HttpClient' },
        { id: 'mocking-graphql', title: 'Mocking GraphQL' },
        { id: 'msw-with-tests', title: 'MSW with Unit & E2E Tests' },
      ],
    },
  ],
})

writeTree({
  id: 'component-documentation',
  title: 'Component Documentation (Storybook)',
  order: 910,
  level: 'intermediate',
  tags: ['testing'],
  subtopics: [
    {
      id: 'storybook-setup',
      title: 'Storybook Setup',
      leaves: [
        { id: 'installing-storybook', title: 'Installing Storybook' },
        { id: 'angular-storybook-config', title: 'Angular Storybook Configuration' },
        { id: 'storybook-project-structure', title: 'Storybook Project Structure' },
      ],
    },
    {
      id: 'writing-stories',
      title: 'Writing Stories',
      leaves: [
        { id: 'component-stories', title: 'Component Stories' },
        { id: 'controls-and-actions', title: 'Controls & Actions' },
        { id: 'composing-stories', title: 'Composing Stories' },
      ],
    },
    {
      id: 'storybook-operations',
      title: 'Storybook Operations',
      leaves: [
        { id: 'storybook-addons', title: 'Storybook Addons' },
        { id: 'visual-regression-testing', title: 'Visual Regression Testing' },
        { id: 'storybook-in-ci', title: 'Storybook in CI' },
      ],
    },
  ],
})

writeTree({
  id: 'capacitor-mobile',
  title: 'Capacitor Mobile Apps',
  order: 1190,
  level: 'advanced',
  tags: ['cross-platform'],
  subtopics: [
    {
      id: 'capacitor-setup',
      title: 'Capacitor Setup',
      leaves: [
        { id: 'capacitor-angular-setup', title: 'Capacitor + Angular Setup' },
        { id: 'native-build-workflow', title: 'Native Build Workflow' },
        { id: 'capacitor-config', title: 'capacitor.config' },
      ],
    },
    {
      id: 'capacitor-features',
      title: 'Capacitor Features',
      leaves: [
        { id: 'native-plugins', title: 'Native Plugins' },
        { id: 'camera-and-filesystem', title: 'Camera & Filesystem' },
        { id: 'push-notifications', title: 'Push Notifications' },
      ],
    },
    {
      id: 'capacitor-deployment',
      title: 'Capacitor Deployment',
      leaves: [
        { id: 'app-store-deployment', title: 'App Store Deployment' },
        { id: 'live-reload-on-device', title: 'Live Reload on Device' },
        { id: 'capacitor-troubleshooting', title: 'Capacitor Troubleshooting' },
      ],
    },
  ],
})

writeTree({
  id: 'ionic-framework',
  title: 'Ionic Framework',
  order: 1191,
  level: 'advanced',
  tags: ['cross-platform'],
  subtopics: [
    {
      id: 'ionic-angular-setup',
      title: 'Ionic Angular Setup',
      leaves: [
        { id: 'ionic-cli-and-angular', title: 'Ionic CLI & Angular' },
        { id: 'ionic-navigation', title: 'Ionic Navigation' },
        { id: 'ionic-ui-components', title: 'Ionic UI Components' },
      ],
    },
    {
      id: 'ionic-patterns',
      title: 'Ionic Patterns',
      leaves: [
        { id: 'ionic-forms', title: 'Ionic Forms' },
        { id: 'ionic-capacitor-bridge', title: 'Ionic + Capacitor Bridge' },
        { id: 'ionic-theming', title: 'Ionic Theming' },
      ],
    },
    {
      id: 'ionic-production',
      title: 'Ionic Production',
      leaves: [
        { id: 'ionic-performance', title: 'Ionic Performance' },
        { id: 'ionic-pwa-mobile', title: 'Ionic PWA on Mobile' },
        { id: 'ionic-testing', title: 'Ionic Testing' },
      ],
    },
  ],
})

writeTree({
  id: 'electron-desktop',
  title: 'Electron Desktop Apps',
  order: 1192,
  level: 'advanced',
  tags: ['cross-platform'],
  subtopics: [
    {
      id: 'electron-angular-setup',
      title: 'Electron + Angular Setup',
      leaves: [
        { id: 'electron-for-angular', title: 'Electron for Angular' },
        { id: 'main-vs-renderer-process', title: 'Main vs Renderer Process' },
        { id: 'electron-angular-build', title: 'Electron Angular Build' },
      ],
    },
    {
      id: 'electron-communication',
      title: 'Electron Communication',
      leaves: [
        { id: 'ipc-patterns', title: 'IPC Patterns' },
        { id: 'native-menus-and-dialogs', title: 'Native Menus & Dialogs' },
        { id: 'file-system-access', title: 'File System Access' },
      ],
    },
    {
      id: 'electron-distribution',
      title: 'Electron Distribution',
      leaves: [
        { id: 'packaging-and-installers', title: 'Packaging & Installers' },
        { id: 'auto-updates', title: 'Auto Updates' },
        { id: 'electron-security', title: 'Electron Security' },
      ],
    },
  ],
})

// OpenAPI subtopic under existing backend-integration
writeTopic({
  id: 'backend-integration--openapi-codegen',
  title: 'OpenAPI & Code Generation',
  summary: 'OpenAPI & Code Generation',
  order: 4,
  level: 'advanced',
  tags: ['http-backend'],
  parentId: 'backend-integration',
})
;[
  { id: 'openapi-spec-basics', title: 'OpenAPI Spec Basics' },
  { id: 'ng-openapi-codegen', title: 'ng-openapi-gen & Codegen Tools' },
  { id: 'typed-api-services', title: 'Typed API Services' },
  { id: 'contract-testing', title: 'Contract Testing' },
].forEach((leaf, i) => {
  writeTopic({
    id: `backend-integration--openapi-codegen--${leaf.id}`,
    title: leaf.title,
    summary: leaf.title,
    order: i + 1,
    level: 'advanced',
    tags: ['http-backend'],
    parentId: 'backend-integration--openapi-codegen',
  })
})

// Expand http-resource (leaves directly under subtopic)
writeLeavesUnderParent('http-resource', 'http-backend', 'advanced', [
  { id: 'request-params', title: 'Request Params & Options', order: 3 },
  { id: 'error-handling', title: 'Error Handling', order: 4 },
  { id: 'ssr-considerations', title: 'SSR Considerations', order: 5 },
  { id: 'rxresource-basics', title: 'rxResource Basics', order: 6 },
], 2)

// Expand signals-rxjs-interop
writeLeavesUnderParent('tosignal-toobservable', 'signals', 'advanced', [
  { id: 'tosignal-options', title: 'toSignal() Options' },
  { id: 'requiresync', title: 'requireSync & Initial Values' },
], 2)

writeLeavesUnderParent('combining-paradigms', 'signals', 'advanced', [
  { id: 'linkedsignal-with-rxjs', title: 'linkedSignal() with RxJS' },
  { id: 'resource-and-httpresource', title: 'Resource API & httpResource' },
], 2)

updateRoadmap()

// signal-forms promoted to roadmap root must keep 3-level depth
if (!DRY_RUN) {
  execSync('node scripts/angular/fix-signal-forms-hierarchy.mjs', {
    cwd: resolve(__dirname, '../..'),
    stdio: 'inherit',
  })
}

console.log(
  DRY_RUN
    ? '[dry-run] Phase 1 taxonomy plan validated (no files written).'
    : '[angular] Phase 1 taxonomy written. Run npm run gen:content to rebuild.',
)
