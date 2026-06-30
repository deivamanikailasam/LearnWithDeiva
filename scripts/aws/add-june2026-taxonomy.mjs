/**
 * June 2026 AWS taxonomy gap-fill:
 * - Agentic AI: Bedrock AgentCore, Managed Knowledge Base, Nova 2, Frontier Agents
 * - Agent Toolkit for AWS (MCP server, skills, plugins)
 * - Next-gen Lambda: MicroVMs, Durable Functions, Managed Instances
 * - Modern compute: Graviton5, Trainium3, GPU UltraServers
 * - S3 Tables, Vectors, Annotations
 * - Security & modernization: AWS Continuum, AWS Transform, Database Savings Plans
 * - Enterprise & thin-area enrichments
 *
 * No document.json — metadata only.
 *
 * Usage: node scripts/aws/add-june2026-taxonomy.mjs [--dry-run]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/aws')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const ROADMAP_FILE = resolve(SUBJECT_DIR, 'roadmap.json')
const SUBJECT_FILE = resolve(SUBJECT_DIR, 'subject.json')
const DRY_RUN = process.argv.includes('--dry-run')

let written = 0
let skipped = 0

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

/** @param {string} rootId @param {string} tag @param {string} level @param {object} sub @param {number} order */
function writeSubtopic(rootId, tag, level, sub, order) {
  const subId = `${rootId}--${sub.id}`
  writeTopic({
    id: subId,
    title: sub.title,
    summary: sub.title,
    order,
    level: sub.level ?? level,
    tags: [tag],
    parentId: rootId,
  })
  writeLeavesUnderParent(subId, tag, sub.level ?? level, sub.leaves)
}

// ── New roadmap topic: AI Agents & AgentCore (ml-ai) ─────────────────────────

writeTree({
  id: 'ai-agents-platform',
  title: 'AI Agents & AgentCore',
  summary: 'Bedrock AgentCore, managed RAG, Nova 2 models and AWS Frontier Agents.',
  order: 49,
  level: 'advanced',
  tags: ['ml-ai'],
  subtopics: [
    {
      id: 'bedrock-agentcore',
      title: 'Amazon Bedrock AgentCore',
      leaves: [
        { id: 'agentcore-overview', title: 'Bedrock AgentCore Overview' },
        { id: 'managed-knowledge-base', title: 'Bedrock Managed Knowledge Base (GA)' },
        { id: 'agentic-retrieval', title: 'Agentic Retrieval & Query Planning' },
        { id: 'agentcore-web-search', title: 'AgentCore Web Search & Grounding' },
        { id: 'agentcore-guardrails', title: 'AgentCore Guardrails Integration' },
        { id: 'agentcore-observability', title: 'AgentCore Observability & Harness' },
        { id: 'multi-agent-orchestration', title: 'Multi-Agent Orchestration Patterns' },
      ],
    },
    {
      id: 'amazon-nova-2',
      title: 'Amazon Nova 2 Model Family',
      leaves: [
        { id: 'nova-2-lite', title: 'Nova 2 Lite' },
        { id: 'nova-2-pro', title: 'Nova 2 Pro' },
        { id: 'nova-2-sonic', title: 'Nova 2 Sonic (Speech-to-Speech)' },
        { id: 'nova-2-omni', title: 'Nova 2 Omni (Multimodal)' },
        { id: 'nova-act', title: 'Nova Act (UI Automation)' },
        { id: 'choosing-nova-models', title: 'Choosing Nova Models for Workloads' },
      ],
    },
    {
      id: 'aws-frontier-agents',
      title: 'AWS Frontier Agents',
      leaves: [
        { id: 'frontier-agents-overview', title: 'Frontier Agents Overview' },
        { id: 'kiro-developer-agent', title: 'Kiro Autonomous Developer Agent' },
        { id: 'aws-security-agent', title: 'AWS Security Agent' },
        { id: 'aws-devops-agent', title: 'AWS DevOps Agent (Autonomous SRE)' },
        { id: 'agent-governance', title: 'Governing Autonomous Agents on AWS' },
      ],
    },
    {
      id: 'production-agent-patterns',
      title: 'Production Agent Patterns',
      leaves: [
        { id: 'employee-assistants', title: 'Enterprise Employee Assistants' },
        { id: 'customer-support-agents', title: 'Customer Support Agent Architectures' },
        { id: 'multimodal-knowledge-bases', title: 'Multimodal Knowledge Bases' },
        { id: 'agent-evaluation', title: 'Agent Evaluation & Safety Testing' },
      ],
    },
  ],
})

// ── New roadmap topic: AI-Assisted AWS Development (build-with-ai stage) ─────

writeTree({
  id: 'ai-assisted-aws-development',
  title: 'AI-Assisted AWS Development',
  summary: 'Agent Toolkit for AWS, MCP server, skills and secure AI coding workflows.',
  order: 50,
  level: 'advanced',
  tags: ['build-with-ai'],
  subtopics: [
    {
      id: 'agent-toolkit-aws',
      title: 'Agent Toolkit for AWS',
      leaves: [
        { id: 'agent-toolkit-overview', title: 'Agent Toolkit for AWS Overview' },
        { id: 'aws-mcp-server', title: 'AWS MCP Server (Managed)' },
        { id: 'agent-skills-iac', title: 'Agent Skills for IaC & CloudFormation' },
        { id: 'agent-skills-serverless', title: 'Agent Skills for Serverless & Lambda' },
        { id: 'agent-skills-data', title: 'Agent Skills for Data & Analytics' },
        { id: 'agent-skills-containers', title: 'Agent Skills for Containers & EKS' },
        { id: 'aws-core-plugin', title: 'AWS Core Agent Plugin' },
        { id: 'aws-data-analytics-plugin', title: 'AWS Data Analytics Plugin' },
      ],
    },
    {
      id: 'secure-ai-workflows',
      title: 'Secure AI Development Workflows',
      leaves: [
        { id: 'iam-guardrails-agents', title: 'IAM Guardrails for Coding Agents' },
        { id: 'agent-observability', title: 'CloudWatch & CloudTrail for AI Agents' },
        { id: 'sandboxed-code-execution', title: 'Sandboxed Agent Code Execution' },
        { id: 'validated-procedures', title: 'Validated Skills vs General Knowledge' },
      ],
    },
    {
      id: 'ai-assisted-operations',
      title: 'AI-Assisted Operations',
      leaves: [
        { id: 'ai-debugging-workflows', title: 'AI-Assisted Debugging Workflows' },
        { id: 'ai-infra-generation', title: 'AI-Assisted Infrastructure Generation' },
        { id: 'ai-cost-optimization', title: 'AI-Assisted Cost Optimization Reviews' },
      ],
    },
  ],
})

// ── Next-gen Lambda (serverless) ──────────────────────────────────────────────

writeSubtopic('lambda-deep', 'serverless', 'advanced', {
  id: 'next-gen-lambda',
  title: 'Next-Generation Lambda',
  leaves: [
    { id: 'lambda-microvms', title: 'Lambda MicroVMs (Firecracker Isolation)' },
    { id: 'lambda-durable-functions', title: 'Lambda Durable Functions' },
    { id: 'durable-functions-sdk', title: 'Durable Execution SDK (Checkpointing & Waits)' },
    { id: 'lambda-managed-instances', title: 'Lambda Managed Instances' },
    { id: 'capacity-providers', title: 'Lambda Capacity Providers' },
    { id: 'choosing-lambda-compute', title: 'Choosing Lambda Compute Types' },
  ],
}, 5)

writeLeavesUnderParent('serverless-compute-options', 'compute', 'intermediate', [
  { id: 'lambda-compute-type-selection', title: 'Standard vs MicroVM vs Managed Instances' },
])

// ── Modern compute silicon (EC2) ──────────────────────────────────────────────

writeLeavesUnderParent('instance-types', 'compute', 'intermediate', [
  { id: 'graviton5-nitro-isolation', title: 'Graviton5 & Nitro Isolation Engine' },
  { id: 'trainium3-ultraservers', title: 'Trainium3 UltraServers' },
  { id: 'p6e-gb300-gpu', title: 'P6e-GB300 GPU UltraServers' },
])

writeLeavesUnderParent('ec2-fundamentals', 'compute', 'beginner', [
  { id: 'nitro-isolation-engine', title: 'Nitro Isolation Engine & Formal Verification' },
])

// ── S3 modern analytics & AI (storage) ────────────────────────────────────────

writeSubtopic('s3', 'storage', 'advanced', {
  id: 's3-analytics-ai',
  title: 'S3 Analytics & AI Features',
  leaves: [
    { id: 's3-tables-iceberg', title: 'S3 Tables (Apache Iceberg)' },
    { id: 's3-vectors', title: 'S3 Vectors' },
    { id: 's3-annotations', title: 'S3 Annotations for AI Discovery' },
    { id: 's3-batch-operations-scale', title: 'S3 Batch Operations at Scale' },
    { id: 's3-data-lake-patterns', title: 'S3 Data Lake Patterns with Tables' },
  ],
}, 6)

// ── Bedrock enrichments (generative-ai-aws) ───────────────────────────────────

writeLeavesUnderParent('amazon-bedrock', 'ml-ai', 'advanced', [
  { id: 'bedrock-managed-knowledge-base', title: 'Bedrock Managed Knowledge Base' },
  { id: 'bedrock-agentcore-integration', title: 'Bedrock AgentCore Integration' },
  { id: 'bedrock-hybrid-search', title: 'Hybrid Search & Document Ranking' },
  { id: 'bedrock-data-connectors', title: 'Managed KB Data Connectors (S3, SharePoint, Confluence)' },
])

writeLeavesUnderParent('genai-tools', 'ml-ai', 'advanced', [
  { id: 'amazon-q-transform', title: 'Amazon Q Developer Transform' },
  { id: 'amazon-quick-agents', title: 'Amazon Quick Autonomous Agents' },
])

// ── Cost optimization (June 2026) ─────────────────────────────────────────────

writeLeavesUnderParent('commitment-management', 'cost-optimization', 'advanced', [
  { id: 'database-savings-plans', title: 'Database Savings Plans (RDS, Aurora, DynamoDB)' },
])

writeLeavesUnderParent('pricing-models-services', 'cost-optimization', 'intermediate', [
  { id: 'lambda-managed-instances-pricing', title: 'Lambda Managed Instances Pricing Model' },
  { id: 'durable-functions-pricing', title: 'Lambda Durable Functions Pricing' },
])

// ── Security (June 2026) ────────────────────────────────────────────────────

writeLeavesUnderParent('threat-detection-services', 'security', 'advanced', [
  { id: 'aws-continuum', title: 'AWS Continuum (Security at Machine Speed)' },
  { id: 'aws-security-agent-threat-modeling', title: 'AWS Security Agent Threat Modeling' },
])

writeLeavesUnderParent('incident-response', 'security', 'advanced', [
  { id: 'security-agent-penetration-testing', title: 'Automated Penetration Testing with Security Agent' },
])

// ── Analytics & data (June 2026) ────────────────────────────────────────────

writeLeavesUnderParent('data-governance-analytics', 'analytics', 'advanced', [
  { id: 'glue-semantic-search', title: 'Glue Data Catalog Semantic Search (Preview)' },
  { id: 'glue-business-context', title: 'Glue Data Catalog Business Context' },
])

writeLeavesUnderParent('data-orchestration', 'analytics', 'advanced', [
  { id: 'glue-data-quality', title: 'AWS Glue Data Quality' },
])

// ── Migration & modernization ─────────────────────────────────────────────────

writeLeavesUnderParent('app-refactoring', 'migration', 'advanced', [
  { id: 'aws-transform-continuous', title: 'AWS Transform Continuous Modernization' },
  { id: 'aws-transform-mainframe', title: 'AWS Transform for Mainframe' },
  { id: 'aws-transform-generative-ai', title: 'AWS Transform Generative AI Models' },
])

writeLeavesUnderParent('database-migration-tools', 'databases', 'intermediate', [
  { id: 'dms-serverless', title: 'AWS DMS Serverless' },
  { id: 'homogeneous-migration-patterns', title: 'Homogeneous Migration Patterns' },
])

writeLeavesUnderParent('ledger-wide-column-dbs', 'databases', 'advanced', [
  { id: 'aurora-dsql', title: 'Amazon Aurora DSQL (Distributed SQL)' },
])

// ── Observability & DevOps ────────────────────────────────────────────────────

writeLeavesUnderParent('managed-observability', 'monitoring', 'advanced', [
  { id: 'cloudwatch-application-signals', title: 'CloudWatch Application Signals (SLOs)' },
  { id: 'healthomics-cloudwatch-logs', title: 'HealthOmics Real-Time CloudWatch Logs' },
])

writeLeavesUnderParent('devops-observability', 'devops', 'advanced', [
  { id: 'devops-agent-incident-response', title: 'AWS DevOps Agent Incident Response' },
  { id: 'devops-agent-resilience', title: 'AWS DevOps Agent Resilience Monitoring' },
])

// ── Advanced & edge ───────────────────────────────────────────────────────────

writeLeavesUnderParent('emerging-services', 'advanced', 'advanced', [
  { id: 'healthomics', title: 'AWS HealthOmics' },
  { id: 'partner-central-agents', title: 'AWS Partner Central Agents' },
])

writeLeavesUnderParent('hybrid-cloud-advanced', 'advanced', 'advanced', [
  { id: 'eks-auto-mode', title: 'Amazon EKS Auto Mode' },
])

// ── Certifications & career ───────────────────────────────────────────────────

writeLeavesUnderParent('foundational-certs', 'certifications', 'beginner', [
  { id: 'generative-ai-essentials', title: 'AWS Generative AI Essentials (Learning Path)' },
])

writeLeavesUnderParent('study-resources', 'certifications', 'beginner', [
  { id: 'agentic-ai-learning-path', title: 'Agentic AI on AWS Learning Path' },
  { id: 'reinvent-2025-highlights', title: 're:Invent 2025 Key Announcements' },
])

// ── Thin-area enrichments ─────────────────────────────────────────────────────

writeLeavesUnderParent('streaming-integration', 'integration', 'advanced', [
  { id: 'eventbridge-pipes-patterns', title: 'EventBridge Pipes Integration Patterns' },
  { id: 'kinesis-lambda-streaming', title: 'Kinesis + Lambda Stream Processing' },
])

writeLeavesUnderParent('server-migration', 'migration', 'intermediate', [
  { id: 'mgn-agentless-replication', title: 'MGN Agentless Replication' },
  { id: 'mgn-cutover-planning', title: 'MGN Cutover Planning' },
])

writeLeavesUnderParent('specialized-migrations', 'migration', 'advanced', [
  { id: 'vmware-cloud-migration', title: 'VMware Cloud on AWS Migration' },
  { id: 'sap-on-aws-migration', title: 'SAP on AWS Migration' },
])

writeLeavesUnderParent('hybrid-data-services', 'migration', 'advanced', [
  { id: 'storage-gateway-hybrid-backup', title: 'Storage Gateway Hybrid Backup' },
  { id: 'datasync-scheduling', title: 'DataSync Scheduling & Bandwidth Throttling' },
])

writeLeavesUnderParent('cost-reporting', 'cost-optimization', 'intermediate', [
  { id: 'cost-anomaly-detection', title: 'Cost Anomaly Detection' },
  { id: 'cost-allocation-tags', title: 'Cost Allocation Tag Governance' },
])

writeLeavesUnderParent('cost-monitoring-tools', 'cost-optimization', 'intermediate', [
  { id: 'billing-conductor', title: 'AWS Billing Conductor' },
  { id: 'cost-optimization-hub', title: 'AWS Cost Optimization Hub' },
])

writeLeavesUnderParent('practice-hands-on', 'certifications', 'beginner', [
  { id: 'aws-skill-builder-labs', title: 'AWS Skill Builder Hands-On Labs' },
  { id: 'aws-workshop-studio', title: 'AWS Workshop Studio' },
])

writeLeavesUnderParent('staying-current', 'certifications', 'intermediate', [
  { id: 'aws-whats-new-rss', title: 'AWS What\'s New & Release Notes' },
  { id: 'aws-blog-architecture', title: 'AWS Architecture Blog' },
])

// ── Enterprise enrichments (3rd level under grouped subtopics) ────────────────

const enterpriseEnrichments = [
  ['enterprise-cloud-strategy--strategy-governance', 'enterprise-delivery', 'advanced', [
    { id: 'cloud-governance-framework', title: 'Cloud Governance Framework' },
    { id: 'landing-zone-accelerator', title: 'Landing Zone Accelerator on AWS' },
  ]],
  ['enterprise-cloud-strategy--roadmap-portfolio', 'enterprise-delivery', 'advanced', [
    { id: 'workload-placement-decisions', title: 'Workload Placement Decisions' },
  ]],
  ['discovery-requirements--discovery-research', 'enterprise-delivery', 'intermediate', [
    { id: 'application-portfolio-analysis', title: 'Application Portfolio Analysis' },
  ]],
  ['developer-platform--golden-paths', 'enterprise-delivery', 'advanced', [
    { id: 'terraform-module-registry', title: 'Terraform Module Registry Program' },
    { id: 'cdk-construct-library', title: 'Shared CDK Construct Library' },
  ]],
  ['enterprise-data-governance--lineage-contracts', 'enterprise-delivery', 'advanced', [
    { id: 'lake-formation-governance', title: 'Lake Formation Data Governance' },
  ]],
  ['risk-compliance-program--audit-certifications', 'enterprise-delivery', 'advanced', [
    { id: 'fedramp-program', title: 'FedRAMP Authorization Program' },
  ]],
  ['enterprise-finops-program--optimization-commitments', 'enterprise-delivery', 'advanced', [
    { id: 'sustainability-cost-optimization', title: 'Sustainability-Aware Cost Optimization' },
  ]],
  ['legal-ethical-governance--privacy-sustainability', 'enterprise-delivery', 'advanced', [
    { id: 'ai-ethics-governance', title: 'AI Ethics & Responsible AI Governance' },
  ]],
  ['testing-validation-phase--nonfunctional-testing', 'production-lifecycle', 'intermediate', [
    { id: 'chaos-testing-program', title: 'Chaos Testing Program' },
    { id: 'resilience-validation', title: 'Resilience Validation Testing' },
  ]],
  ['observability-program--telemetry-standards', 'production-lifecycle', 'advanced', [
    { id: 'opentelemetry-adoption', title: 'OpenTelemetry Adoption on AWS' },
  ]],
  ['continuous-improvement-program--architecture-evolution', 'production-lifecycle', 'advanced', [
    { id: 'platform-engineering-maturity', title: 'Platform Engineering Maturity' },
  ]],
]

for (const [parentId, tag, level, leaves] of enterpriseEnrichments) {
  writeLeavesUnderParent(parentId, tag, level, leaves, 90)
}

// ── Roadmap & subject metadata ────────────────────────────────────────────────

function updateRoadmap() {
  const roadmap = JSON.parse(readFileSync(ROADMAP_FILE, 'utf8'))

  const mlAi = roadmap.stages.find((s) => s.id === 'ml-ai')
  if (mlAi) {
    if (!mlAi.nodes.some((n) => n.topicId === 'ai-agents-platform')) {
      mlAi.nodes.push({
        id: 'ai-agents-platform',
        title: 'AI Agents & AgentCore',
        topicId: 'ai-agents-platform',
        status: 'core',
        description: 'Bedrock AgentCore, managed RAG, Nova 2 models and AWS Frontier Agents.',
      })
    }
  }

  if (!roadmap.stages.some((s) => s.id === 'build-with-ai')) {
    const certIdx = roadmap.stages.findIndex((s) => s.id === 'certifications')
    const insertAt = certIdx >= 0 ? certIdx : roadmap.stages.length
    roadmap.stages.splice(insertAt, 0, {
      id: 'build-with-ai',
      title: 'Build with AI',
      summary: 'AI-assisted AWS development with Agent Toolkit, MCP server and secure agent workflows.',
      nodes: [
        {
          id: 'ai-assisted-aws-development',
          title: 'AI-Assisted AWS Development',
          topicId: 'ai-assisted-aws-development',
          status: 'optional',
          description:
            'Agent Toolkit for AWS, managed MCP server, agent skills and secure AI coding workflows.',
        },
      ],
    })
  }

  if (!DRY_RUN) {
    writeFileSync(ROADMAP_FILE, `${JSON.stringify(roadmap, null, 2)}\n`)
  }
}

updateRoadmap()

if (existsSync(SUBJECT_FILE)) {
  const subject = JSON.parse(readFileSync(SUBJECT_FILE, 'utf8'))
  const note =
    'Roadmap updated for June 2026: Bedrock AgentCore, Managed Knowledge Base, Nova 2, Frontier Agents, Agent Toolkit for AWS, Lambda MicroVMs, Durable Functions, Managed Instances, Graviton5, S3 Tables/Vectors, and AWS Continuum.'
  if (!subject.description?.includes('June 2026')) {
    subject.description = subject.description ? `${subject.description} ${note}` : note
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
  `[aws] add-june2026: wrote ${written}, skipped ${skipped}${DRY_RUN ? ' (dry-run)' : ''}.`,
)
