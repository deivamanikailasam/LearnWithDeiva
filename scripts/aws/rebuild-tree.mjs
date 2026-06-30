/**
 * Rebuild the AWS subject topic tree to enforce a strict 3-level hierarchy:
 *   Topic (roadmap node) → Subtopic → Sub-subtopic (content leaf)
 *
 * - Keeps roadmap.json stages unchanged.
 * - Restructures enterprise/production topics from 2 → 3 levels.
 * - Merges granular what/why/benefits/tradeoffs leaves into substantive pages.
 * - Removes orphaned topic folders (preserves document.json files).
 *
 * Usage: node scripts/aws/rebuild-tree.mjs [--dry-run]
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ENTERPRISE_GROUPINGS } from './enterprise-groupings.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/aws')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const DRY_RUN = process.argv.includes('--dry-run')

const PRESERVE_CONTENT_IDS = new Set()

/** Merge leaf ids into a single substantive leaf within the same subtopic. */
const LEAF_MERGES = {
  'what-is-cloud-computing': {
    'cloud-computing-fundamentals': {
      title: 'Cloud Computing Fundamentals',
      merge: [
        'definition-of-cloud',
        'traditional-it-vs-cloud',
        'on-premises-vs-cloud',
        'characteristics-of-cloud',
      ],
    },
  },
  'ec2-fundamentals': {
    'ec2-overview-and-lifecycle': {
      title: 'EC2 Overview & Instance Lifecycle',
      merge: ['what-is-ec2'],
    },
  },
  'amis': {
    'ami-fundamentals': {
      title: 'AMI Fundamentals',
      merge: ['what-is-ami'],
    },
  },
  'lambda-basics': {
    'lambda-fundamentals': {
      title: 'Lambda Fundamentals',
      merge: ['what-is-lambda'],
    },
  },
  's3-fundamentals': {
    's3-fundamentals-overview': {
      title: 'S3 Fundamentals',
      merge: ['what-is-s3'],
    },
  },
  'vpc-fundamentals': {
    'vpc-fundamentals-overview': {
      title: 'VPC Fundamentals',
      merge: ['what-is-a-vpc'],
    },
  },
  'iam-fundamentals': {
    'iam-fundamentals-overview': {
      title: 'IAM Fundamentals',
      merge: ['what-is-iam'],
    },
  },
  'iam-roles': {
    'iam-roles-overview': {
      title: 'IAM Roles Overview',
      merge: ['what-are-roles'],
    },
  },
  'identity-federation': {
    'identity-federation-overview': {
      title: 'Identity Federation Overview',
      merge: ['what-is-federation'],
    },
  },
  'mfa-account-security': {
    'multi-factor-authentication': {
      title: 'Multi-Factor Authentication (MFA)',
      merge: ['what-is-mfa'],
    },
  },
  'regions': {
    'aws-regions': {
      title: 'AWS Regions',
      merge: ['what-is-a-region'],
    },
  },
  'availability-zones': {
    'availability-zones-overview': {
      title: 'Availability Zones',
      merge: ['what-is-an-az'],
    },
  },
  'container-basics': {
    'containers-on-aws': {
      title: 'Containers on AWS',
      merge: ['what-are-containers', 'container-orchestration-intro'],
    },
  },
  'kubernetes-basics': {
    'kubernetes-on-aws': {
      title: 'Kubernetes on AWS',
      merge: ['what-is-kubernetes'],
    },
  },
  'iac-fundamentals': {
    'infrastructure-as-code': {
      title: 'Infrastructure as Code',
      merge: ['what-is-iac', 'iac-benefits'],
    },
  },
  'devops-fundamentals': {
    'devops-on-aws': {
      title: 'DevOps on AWS',
      merge: ['what-is-devops'],
    },
  },
  'migration-fundamentals': {
    'migration-drivers': {
      title: 'Migration Drivers & Business Case',
      merge: ['why-migrate'],
    },
  },
  'multi-account-strategy': {
    'multi-account-rationale': {
      title: 'Multi-Account Strategy',
      merge: ['why-multi-account'],
    },
  },
  'cloudwatch-metrics': {
    'cloudwatch-metrics-overview': {
      title: 'CloudWatch Metrics',
      merge: ['what-are-metrics'],
    },
  },
  'waf-overview': {
    'well-architected-framework-overview': {
      title: 'Well-Architected Framework Overview',
      merge: ['what-is-well-architected'],
    },
  },
  'cloudhsm': {
    'cloudhsm-overview-merged': {
      title: 'CloudHSM Overview',
      merge: ['cloudhsm-overview', 'cloudhsm-use-cases'],
    },
  },
  'amazon-file-cache': {
    'file-cache-overview-merged': {
      title: 'Amazon File Cache',
      merge: ['file-cache-overview', 'file-cache-use-cases'],
    },
  },
  'performance-efficiency-pillar': {
    'performance-tradeoffs': {
      title: 'Performance Design Tradeoffs',
      merge: ['tradeoffs'],
    },
  },
}

const SUBTOPIC_ABSORB = {
  'cloud-concepts': {
    from: 'benefits-of-cloud',
    into: 'cloud-economics',
    leafMap: {
      'elasticity-scalability': 'elasticity-scalability',
      'agility-speed': 'agility-speed',
      'global-reach': 'global-reach',
      'economies-of-scale': 'economies-of-scale',
      'reliability-availability': 'reliability-availability',
      'cloud-security-benefits': 'cloud-security-benefits',
    },
  },
}

/** Rename subtopics away from what/why/benefits framing. */
const SUBTOPIC_RENAMES = {
  'what-is-cloud-computing': {
    title: 'Cloud Computing Fundamentals',
    summary: 'Core concepts, virtualization and cloud evolution.',
  },
}

/**
 * Additional expert-level sub-subtopics for thin subtopics.
 * Each entry: subtopicId → [{ id, title }]
 */
const TAXONOMY_ENRICHMENTS = {
  'online-data-transfer': [
    { id: 'transfer-bandwidth-planning', title: 'Transfer Bandwidth & Cost Planning' },
    { id: 'transfer-monitoring-validation', title: 'Transfer Monitoring & Validation' },
  ],
  'discovery-requirements--requirements-definition': [
    { id: 'requirements-traceability', title: 'Requirements Traceability Matrix' },
    { id: 'scope-boundaries-signoff', title: 'Scope Boundaries & Sign-Off' },
  ],
  'solution-architecture-process--security-architecture': [
    { id: 'security-architecture-patterns', title: 'Security Architecture Patterns' },
    { id: 'data-classification-in-design', title: 'Data Classification in Design' },
  ],
  'engineering-standards--architecture-governance': [
    { id: 'architecture-principles-standards', title: 'Architecture Principles & Standards' },
    { id: 'technical-debt-guardrails', title: 'Technical Debt Guardrails' },
  ],
  'procurement-sourcing--marketplace-governance': [
    { id: 'saas-procurement-process', title: 'SaaS Procurement Process' },
    { id: 'marketplace-chargeback', title: 'Marketplace Chargeback & Cost Allocation' },
  ],
  'risk-compliance-program--continuous-compliance': [
    { id: 'compliance-automation', title: 'Compliance Automation & Drift Detection' },
    { id: 'evidence-collection-pipeline', title: 'Evidence Collection Pipeline' },
  ],
  'program-portfolio-management--value-delivery': [
    { id: 'outcome-measurement', title: 'Outcome Measurement & KPI Tracking' },
    { id: 'value-stream-metrics', title: 'Value Stream Metrics' },
  ],
  'change-enablement--workforce-transformation': [
    { id: 'skills-gap-analysis', title: 'Skills Gap Analysis' },
    { id: 'role-transformation-playbooks', title: 'Role Transformation Playbooks' },
  ],
  'implementation-build-phase--build-practices': [
    { id: 'build-verification-checks', title: 'Build Verification Checks' },
    { id: 'local-dev-environment-standards', title: 'Local Development Environment Standards' },
  ],
  'cicd-release-engineering--supply-chain-security': [
    { id: 'signed-artifacts-policy', title: 'Signed Artifacts Policy' },
    { id: 'dependency-scanning-gates', title: 'Dependency Scanning Gates' },
  ],
  'operations-sre-program--slo-error-budgets': [
    { id: 'slo-implementation-aws', title: 'Implementing SLOs with AWS Observability' },
    { id: 'error-budget-policy-enforcement', title: 'Error Budget Policy Enforcement' },
  ],
  'incident-management-process--incident-metrics': [
    { id: 'incident-dashboards', title: 'Incident Dashboards & Reporting' },
    { id: 'reliability-target-tracking', title: 'Reliability Target Tracking' },
  ],
  'support-maintenance-program--lifecycle-end': [
    { id: 'end-of-life-communication', title: 'End-of-Life Communication Plan' },
    { id: 'data-migration-decommission', title: 'Data Migration During Decommission' },
  ],
  'continuous-improvement-program--well-architected-cadence': [
    { id: 'wa-workload-review-process', title: 'Workload Review Process' },
    { id: 'improvement-backlog-prioritization', title: 'Improvement Backlog Prioritization' },
  ],
}

/** Topic ids to drop during rebuild (misplaced duplicates). */
const EXCLUDED_TOPIC_IDS = new Set([
  'graph-timeseries-dbs--amazon-documentdb',
  'graph-timeseries-dbs--amazon-keyspaces',
  'ledger-wide-column-dbs--amazon-memorydb',
])

/** @type {Map<string, object>} */
const out = new Map()

function loadExisting() {
  const topics = []
  for (const dir of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    if (EXCLUDED_TOPIC_IDS.has(dir.name)) continue
    const file = resolve(TOPICS_DIR, dir.name, 'topic.json')
    if (!existsSync(file)) continue
    topics.push(JSON.parse(readFileSync(file, 'utf8')))
  }
  return topics
}

function buildChildrenMap(topics) {
  const children = new Map()
  for (const t of topics) {
    if (!t.parentId) continue
    const list = children.get(t.parentId) ?? []
    list.push(t)
    children.set(t.parentId, list)
  }
  for (const list of children.values()) {
    list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }
  return children
}

function isGranularLeaf(id, title) {
  const slug = id.split('--').pop() ?? id
  if (
    /^(what-is|what-it-is|what-are|why-|benefits|tradeoffs|pros|cons|advantages|use-cases)$/.test(
      slug,
    )
  ) {
    return true
  }
  if (/^(what-is|what-are|why-|benefits|tradeoffs|use-cases)/.test(slug)) {
    return true
  }
  const t = (title ?? '').toLowerCase()
  return (
    t.startsWith('what is ') ||
    t.startsWith('what are ') ||
    t.startsWith('why ') ||
    t.startsWith('benefits of ') ||
    t === 'benefits' ||
    t === 'tradeoffs' ||
    t === 'use cases'
  )
}

function addTopic(meta) {
  out.set(meta.id, meta)
}

function rebuildEnterprise(topics, children, enterpriseRootIds) {
  for (const rootId of enterpriseRootIds) {
    const root = topics.find((t) => t.id === rootId)
    if (!root) continue
    const grouping = ENTERPRISE_GROUPINGS[rootId]
    if (!grouping) {
      console.warn(`No grouping defined for enterprise topic: ${rootId}`)
      continue
    }

    addTopic({
      id: root.id,
      title: root.title,
      summary: root.summary ?? root.title,
      order: root.order,
      level: root.level ?? 'advanced',
      tags: root.tags ?? [],
    })

    const oldSubs = children.get(rootId) ?? []
    const oldBySuffix = new Map(
      oldSubs.map((s) => {
        const suffix = s.id.startsWith(`${rootId}--`)
          ? s.id.slice(rootId.length + 2)
          : s.id
        return [suffix, s]
      }),
    )
    for (const s of oldSubs) {
      for (const leaf of children.get(s.id) ?? []) {
        const leafSuffix = leaf.id.split('--').pop()
        if (leafSuffix) oldBySuffix.set(leafSuffix, leaf)
      }
    }

    grouping.forEach((sub, subIdx) => {
      const subId = `${rootId}--${sub.id}`
      addTopic({
        id: subId,
        title: sub.title,
        summary: sub.title,
        order: subIdx + 1,
        level: root.level ?? 'advanced',
        tags: root.tags ?? [],
        parentId: rootId,
      })

      const leafMetas = sub.leaves.map((leaf) => {
        const leafSlug = typeof leaf === 'string' ? leaf : leaf.id
        const leafTitleOverride = typeof leaf === 'string' ? undefined : leaf.title
        const old =
          oldBySuffix.get(leafSlug) ??
          oldBySuffix.get(leafSlug.replace(/-tracking$/, ''))
        return {
          slug: leafSlug,
          id: `${subId}--${leafSlug}`,
          title: leafTitleOverride ?? old?.title ?? leafSlug.replace(/-/g, ' '),
          summary:
            leafTitleOverride ??
            old?.summary ??
            old?.title ??
            leafSlug.replace(/-/g, ' '),
          level: old?.level ?? root.level ?? 'advanced',
        }
      })

      const enrichments = TAXONOMY_ENRICHMENTS[subId] ?? []
      for (const e of enrichments) {
        const leafId = `${subId}--${e.id}`
        if (!leafMetas.some((l) => l.id === leafId)) {
          leafMetas.push({
            slug: e.id,
            id: leafId,
            title: e.title,
            summary: e.title,
            level: root.level ?? 'advanced',
          })
        }
      }

      leafMetas.forEach((leaf, leafIdx) => {
        addTopic({
          id: leaf.id,
          title: leaf.title,
          summary: leaf.summary,
          order: leafIdx + 1,
          level: leaf.level,
          tags: root.tags ?? [],
          parentId: subId,
        })
      })
    })
  }
}

function applyLeafMerges(subtopicId, leaves) {
  const rules = LEAF_MERGES[subtopicId]
  if (!rules) return leaves

  let merged = [...leaves]
  for (const [newSlug, rule] of Object.entries(rules)) {
    const toMerge = rule.merge
      .map((slug) => merged.find((l) => (l.id.split('--').pop() ?? l.id) === slug))
      .filter(Boolean)
    if (toMerge.length === 0) continue

    merged = merged.filter(
      (l) =>
        !toMerge.includes(l) ||
        (rule.preserveId && (l.id.split('--').pop() ?? l.id) === rule.preserveId),
    )

    const preserve = rule.preserveId
      ? toMerge.find((l) => (l.id.split('--').pop() ?? l.id) === rule.preserveId)
      : null
    const id = preserve ? preserve.id : `${subtopicId}--${newSlug}`

    if (!merged.some((l) => l.id === id)) {
      merged.unshift({
        ...toMerge[0],
        id,
        title: rule.title,
        summary: rule.title,
      })
    } else {
      const existing = merged.find((l) => l.id === id)
      if (existing) {
        existing.title = rule.title
        existing.summary = rule.title
      }
    }
  }
  return merged
}

function rebuildTechnical(topics, children, enterpriseRootIds) {
  const enterpriseSet = new Set(enterpriseRootIds)
  const roots = topics
    .filter((t) => !t.parentId && !enterpriseSet.has(t.id))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  for (const root of roots) {
    addTopic({
      id: root.id,
      title: root.title,
      summary: root.summary ?? root.title,
      order: root.order,
      level: root.level ?? 'beginner',
      tags: root.tags ?? [],
    })

    let subs = [...(children.get(root.id) ?? [])]

    const absorb = SUBTOPIC_ABSORB[root.id]
    if (absorb) {
      const fromSub = subs.find((s) => s.id === absorb.from)
      const intoSub = subs.find((s) => s.id === absorb.into)
      if (fromSub && intoSub) {
        const fromLeaves = children.get(fromSub.id) ?? []
        const intoLeaves = children.get(intoSub.id) ?? []
        children.set(intoSub.id, intoLeaves)
        for (const leaf of fromLeaves) {
          const slug = leaf.id.split('--').pop() ?? leaf.id
          const newSlug = absorb.leafMap?.[slug] ?? slug
          intoLeaves.push({
            ...leaf,
            id: `${intoSub.id}--${newSlug}`,
            parentId: intoSub.id,
          })
        }
        subs = subs.filter((s) => s.id !== fromSub.id)
      }
    }

    subs.forEach((sub, subIdx) => {
      const rename = SUBTOPIC_RENAMES[sub.id]
      addTopic({
        id: sub.id,
        title: rename?.title ?? sub.title,
        summary: rename?.summary ?? sub.summary ?? sub.title,
        order: subIdx + 1,
        level: sub.level ?? root.level ?? 'beginner',
        tags: sub.tags ?? root.tags ?? [],
        parentId: root.id,
      })

      let leaves = [...(children.get(sub.id) ?? [])]
      leaves = applyLeafMerges(sub.id, leaves)

      const enrichments = TAXONOMY_ENRICHMENTS[sub.id]
      if (enrichments) {
        for (const e of enrichments) {
          const leafId = `${sub.id}--${e.id}`
          if (!leaves.some((l) => l.id === leafId)) {
            leaves.push({
              id: leafId,
              title: e.title,
              summary: e.title,
              level: sub.level ?? root.level,
              tags: sub.tags ?? root.tags,
            })
          }
        }
      }

      const substantive = leaves.filter((l) => !isGranularLeaf(l.id, l.title))
      if (substantive.length > 0) {
        leaves = leaves.filter(
          (l) => !isGranularLeaf(l.id, l.title) || PRESERVE_CONTENT_IDS.has(l.id),
        )
      }

      if (leaves.length === 0) {
        console.warn(`Subtopic ${sub.id} has no leaves — creating overview leaf`)
        leaves = [
          {
            id: `${sub.id}--overview`,
            title: sub.title,
            summary: sub.summary ?? sub.title,
            level: sub.level,
            tags: sub.tags,
          },
        ]
      }

      leaves.forEach((leaf, leafIdx) => {
        addTopic({
          id: leaf.id,
          title: leaf.title,
          summary: leaf.summary ?? leaf.title,
          order: leafIdx + 1,
          level: leaf.level ?? sub.level ?? root.level ?? 'beginner',
          tags: leaf.tags ?? sub.tags ?? root.tags ?? [],
          parentId: sub.id,
        })
      })
    })
  }
}

function validateTree(roadmap) {
  const errors = []
  const nodeIds = roadmap.stages.flatMap((s) => s.nodes.map((n) => n.topicId))

  for (const nodeId of nodeIds) {
    const root = out.get(nodeId)
    if (!root) {
      errors.push(`Missing root topic: ${nodeId}`)
      continue
    }
    const subs = [...out.values()].filter((t) => t.parentId === nodeId)
    if (subs.length === 0) errors.push(`Topic ${nodeId} has no subtopics`)
    for (const sub of subs) {
      const leaves = [...out.values()].filter((t) => t.parentId === sub.id)
      if (leaves.length === 0) errors.push(`Subtopic ${sub.id} has no sub-subtopics`)
    }
  }

  return errors
}

function writeTree() {
  const existingDirs = new Set(
    readdirSync(TOPICS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name),
  )
  const newIds = new Set(out.keys())

  let written = 0
  let removed = 0

  if (!DRY_RUN) {
    for (const id of newIds) {
      const dir = resolve(TOPICS_DIR, id)
      mkdirSync(dir, { recursive: true })
      writeFileSync(
        resolve(dir, 'topic.json'),
        JSON.stringify(out.get(id), null, 2) + '\n',
      )
      written += 1
    }

    for (const dir of existingDirs) {
      if (newIds.has(dir)) continue
      const docPath = resolve(TOPICS_DIR, dir, 'document.json')
      if (existsSync(docPath) && PRESERVE_CONTENT_IDS.has(dir)) {
        console.warn(`Preserving orphaned content folder: ${dir}`)
        continue
      }
      rmSync(resolve(TOPICS_DIR, dir), { recursive: true, force: true })
      removed += 1
    }
  }

  return { written, removed }
}

function main() {
  const roadmap = JSON.parse(readFileSync(resolve(SUBJECT_DIR, 'roadmap.json'), 'utf8'))
  const enterpriseStages = new Set(['enterprise-delivery', 'production-lifecycle'])
  const enterpriseRootIds = roadmap.stages
    .filter((s) => enterpriseStages.has(s.id))
    .flatMap((s) => s.nodes.map((n) => n.topicId))

  const topics = loadExisting()
  const children = buildChildrenMap(topics)

  rebuildEnterprise(topics, children, enterpriseRootIds)
  rebuildTechnical(topics, children, enterpriseRootIds)

  const errors = validateTree(roadmap)
  if (errors.length) {
    console.error('Validation errors:')
    errors.forEach((e) => console.error(' ', e))
    process.exit(1)
  }

  const { written, removed } = writeTree()

  console.log(`AWS tree rebuild ${DRY_RUN ? '(dry run)' : 'complete'}.`)
  console.log(`  Topics in new tree: ${out.size}`)
  console.log(`  Written: ${written}, Removed folders: ${removed}`)

  const roots = [...out.values()].filter((t) => !t.parentId).length
  const subs = [...out.values()].filter((t) => {
    if (!t.parentId) return false
    const p = out.get(t.parentId)
    return p && !p.parentId
  }).length
  const leaves = [...out.values()].filter((t) => {
    if (!t.parentId) return false
    const p = out.get(t.parentId)
    return p?.parentId
  }).length
  console.log(`  Depth counts — roots: ${roots}, subtopics: ${subs}, sub-subtopics: ${leaves}`)
}

main()
