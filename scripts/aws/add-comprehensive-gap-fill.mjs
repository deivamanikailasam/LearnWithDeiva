/**
 * Comprehensive AWS taxonomy gap-fill (June 2026).
 * Adds roadmap nodes, promotes buried subtopics, expands thin areas, and
 * introduces missing service families (FinSpace, Elemental Media, HealthLake, etc.).
 * Metadata only — no document.json.
 *
 * Usage: node scripts/aws/add-comprehensive-gap-fill.mjs [--dry-run]
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/aws')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const ROADMAP_FILE = resolve(SUBJECT_DIR, 'roadmap.json')
const DRY_RUN = process.argv.includes('--dry-run')

let written = 0
let skipped = 0
let removed = 0

/** @param {Record<string, unknown>} meta @param {boolean} [force] */
function writeTopic(meta, force = false) {
  const file = resolve(TOPICS_DIR, meta.id, 'topic.json')
  if (!force && existsSync(file)) {
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
  writeLeaves(subId, tag, sub.level ?? level, sub.leaves)
}

/** @param {string} id */
function removeTopic(id) {
  const dir = resolve(TOPICS_DIR, id)
  if (!existsSync(dir)) return
  if (!DRY_RUN) rmSync(dir, { recursive: true, force: true })
  removed += 1
}

/** @param {string} parentId @param {string} tag @param {string} level @param {Array<{id:string,title:string}>} leaves @param {number} [startOrder] */
function writeLeaves(parentId, tag, level, leaves, startOrder = 0) {
  let order = startOrder
  for (const leaf of leaves) {
    order += 1
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
    writeLeaves(subId, root.tags[0], sub.level ?? root.level, sub.leaves)
  }
}

/**
 * Promote a subtopic to a roadmap root. Converts each former leaf into a
 * subtopic with expanded grandchildren leaves.
 * @param {object} opts
 */
function promoteSubtopicToRoot({
  subtopicId,
  title,
  summary,
  tag,
  level,
  order,
  expandLeaves,
}) {
  const subFile = resolve(TOPICS_DIR, subtopicId, 'topic.json')
  if (!existsSync(subFile)) {
    console.warn(`Promote skipped — missing subtopic: ${subtopicId}`)
    return
  }
  const sub = JSON.parse(readFileSync(subFile, 'utf8'))
  writeTopic(
    {
      id: subtopicId,
      title: title ?? sub.title,
      summary: summary ?? sub.summary ?? sub.title,
      order,
      level,
      tags: [tag],
    },
    true,
  )

  for (const [leafSuffix, leaves] of Object.entries(expandLeaves)) {
    const subSubId = `${subtopicId}--${leafSuffix}`
    const oldLeafFile = resolve(TOPICS_DIR, subSubId, 'topic.json')
    const oldTitle = existsSync(oldLeafFile)
      ? JSON.parse(readFileSync(oldLeafFile, 'utf8')).title
      : leafSuffix.replace(/-/g, ' ')

    writeTopic(
      {
        id: subSubId,
        title: oldTitle,
        summary: oldTitle,
        order: Object.keys(expandLeaves).indexOf(leafSuffix) + 1,
        level,
        tags: [tag],
        parentId: subtopicId,
      },
      true,
    )
    writeLeaves(subSubId, tag, level, leaves)
  }
}

// ── Remove misplaced duplicate database entries ───────────────────────────────

const DUPLICATE_IDS = [
  'graph-timeseries-dbs--amazon-documentdb',
  'graph-timeseries-dbs--amazon-keyspaces',
  'ledger-wide-column-dbs--amazon-memorydb',
]

for (const id of DUPLICATE_IDS) removeTopic(id)

// ── Promote buried subtopics to roadmap roots ─────────────────────────────────

promoteSubtopicToRoot({
  subtopicId: 'end-user-computing',
  title: 'End-User Computing (WorkSpaces & AppStream)',
  summary: 'Virtual desktops, application streaming and thin clients on AWS.',
  tag: 'compute',
  level: 'intermediate',
  order: 13,
  expandLeaves: {
    workspaces: [
      { id: 'workspaces-fundamentals', title: 'WorkSpaces Fundamentals' },
      { id: 'workspaces-pools-bundles', title: 'WorkSpaces Pools & Bundles' },
      { id: 'workspaces-directory-integration', title: 'Directory Service Integration' },
      { id: 'workspaces-monitoring-troubleshooting', title: 'Monitoring & Troubleshooting' },
    ],
    'workspaces-web': [
      { id: 'workspaces-web-fundamentals', title: 'WorkSpaces Web Fundamentals' },
      { id: 'workspaces-web-identity-providers', title: 'Identity Providers & SSO' },
      { id: 'workspaces-web-browser-isolation', title: 'Browser Isolation & Streaming' },
    ],
    appstream: [
      { id: 'appstream-fleets-stacks', title: 'Fleets, Stacks & Entitlements' },
      { id: 'appstream-image-builders', title: 'Image Builders & Applications' },
      { id: 'appstream-user-sessions', title: 'User Sessions & Scaling' },
    ],
    'workspaces-thin-client': [
      { id: 'thin-client-hardware', title: 'Thin Client Hardware & Procurement' },
      { id: 'thin-client-deployment', title: 'Deployment & Fleet Management' },
    ],
  },
})

promoteSubtopicToRoot({
  subtopicId: 'customer-engagement',
  title: 'Customer Engagement & Messaging',
  summary: 'Email, campaigns, contact centers and in-app communications.',
  tag: 'integration',
  level: 'intermediate',
  order: 40,
  expandLeaves: {
    ses: [
      { id: 'ses-fundamentals', title: 'Amazon SES Fundamentals' },
      { id: 'ses-configuration-sets', title: 'Configuration Sets & Event Publishing' },
      { id: 'ses-deliverability', title: 'Deliverability & Reputation' },
      { id: 'ses-dedicated-ips', title: 'Dedicated IPs & Suppression Lists' },
    ],
    pinpoint: [
      { id: 'pinpoint-fundamentals', title: 'Amazon Pinpoint Fundamentals' },
      { id: 'pinpoint-campaigns-journeys', title: 'Campaigns & Journeys' },
      { id: 'pinpoint-segmentation-analytics', title: 'Segmentation & Analytics' },
    ],
    connect: [
      { id: 'connect-instances-queues', title: 'Instances, Queues & Routing' },
      { id: 'connect-lex-chatbots', title: 'Lex Chatbots & Voice Bots' },
      { id: 'connect-case-management', title: 'Cases & Task Management' },
      { id: 'connect-analytics-qa', title: 'Analytics & Quality Assurance' },
    ],
    'chime-sdk': [
      { id: 'chime-sdk-meetings', title: 'Chime SDK Meetings' },
      { id: 'chime-sdk-messaging', title: 'Chime SDK Messaging' },
      { id: 'chime-sdk-voice', title: 'Chime SDK Voice & PSTN' },
    ],
  },
})

promoteSubtopicToRoot({
  subtopicId: 'data-governance-analytics',
  title: 'Data Governance, Sharing & Catalogs',
  summary: 'DataZone, Clean Rooms, catalog governance and entity resolution.',
  tag: 'analytics',
  level: 'advanced',
  order: 46,
  expandLeaves: {
    datazone: [
      { id: 'datazone-domains-projects', title: 'DataZone Domains & Projects' },
      { id: 'datazone-governance-catalog', title: 'Governance & Business Catalog' },
      { id: 'datazone-data-portal', title: 'Data Portal & Self-Service' },
    ],
    'clean-rooms': [
      { id: 'clean-rooms-fundamentals', title: 'AWS Clean Rooms Fundamentals' },
      { id: 'clean-rooms-collaboration', title: 'Collaboration & Query Rules' },
      { id: 'clean-rooms-privacy-tech', title: 'Privacy-Preserving Analytics' },
    ],
    'glue-semantic-search': [
      { id: 'glue-catalog-semantic-search', title: 'Glue Catalog Semantic Search' },
    ],
    'glue-business-context': [
      { id: 'glue-business-glossaries', title: 'Business Glossaries & Terms' },
      { id: 'glue-business-context-lineage', title: 'Business Context & Lineage' },
    ],
    'data-exchange': [
      { id: 'data-exchange-providers', title: 'Data Exchange for Providers' },
      { id: 'data-exchange-subscribers', title: 'Data Exchange for Subscribers' },
    ],
    'data-quality-glue': [
      { id: 'glue-data-quality-rules', title: 'Glue Data Quality Rules' },
      { id: 'glue-data-quality-monitoring', title: 'Data Quality Monitoring & Alerts' },
    ],
    'entity-resolution': [
      { id: 'entity-resolution-fundamentals', title: 'Entity Resolution Fundamentals' },
      { id: 'entity-resolution-matching-rules', title: 'Rule-Based & ML Matching' },
      { id: 'entity-resolution-workflows', title: 'Batch & Streaming Workflows' },
    ],
  },
})

promoteSubtopicToRoot({
  subtopicId: 'iot-services',
  title: 'IoT Platform & Connected Devices',
  summary: 'IoT Core, device management, analytics and industrial IoT on AWS.',
  tag: 'advanced',
  level: 'advanced',
  order: 61,
  expandLeaves: {
    'iot-core': [
      { id: 'iot-core-mqtt-topics', title: 'MQTT Topics & Device Communication' },
      { id: 'iot-core-device-shadows', title: 'Device Shadows & State Management' },
      { id: 'iot-core-rules-engine', title: 'Rules Engine & Actions' },
      { id: 'iot-core-fleet-provisioning', title: 'Fleet Provisioning & JITR' },
    ],
    'iot-device-management': [
      { id: 'device-management-jobs', title: 'OTA Updates & Jobs' },
      { id: 'device-management-indexing', title: 'Fleet Indexing & Search' },
      { id: 'device-management-security', title: 'Device Certificates & Policies' },
    ],
    'iot-analytics': [
      { id: 'iot-analytics-pipelines', title: 'IoT Analytics Pipelines' },
      { id: 'iot-analytics-storage', title: 'Data Stores & Queries' },
    ],
    'iot-sitewise': [
      { id: 'sitewise-assets-models', title: 'Assets, Models & Hierarchies' },
      { id: 'sitewise-gateways', title: 'Gateways & Data Ingestion' },
      { id: 'sitewise-dashboards', title: 'Monitor Dashboards & Alarms' },
    ],
    'iot-device-defender': [
      { id: 'device-defender-audit', title: 'Security Audit & Compliance' },
      { id: 'device-defender-detect', title: 'Anomaly Detection & Mitigation' },
    ],
    'iot-twinmaker': [
      { id: 'twinmaker-workspaces-entities', title: 'Workspaces & Digital Twin Entities' },
      { id: 'twinmaker-scenes-components', title: 'Scenes, Components & Connectors' },
    ],
    'iot-events': [
      { id: 'iot-events-detectors', title: 'Detectors & Event Inputs' },
      { id: 'iot-events-actions', title: 'Actions & Automation' },
    ],
    'iot-fleetwise': [
      { id: 'fleetwise-vehicles-signals', title: 'Vehicles, Signals & Campaigns' },
      { id: 'fleetwise-data-collection', title: 'Edge Data Collection' },
    ],
    freertos: [
      { id: 'freertos-kernel', title: 'FreeRTOS Kernel & Porting' },
      { id: 'freertos-iot-libraries', title: 'IoT Libraries & OTA' },
    ],
  },
})

// ── New roadmap roots with full 3-level trees ─────────────────────────────────

writeTree({
  id: 'frontend-mobile-aws',
  title: 'Frontend, Mobile & Real-Time APIs',
  summary: 'Amplify Gen 2, AppSync, Location Service and mobile/web patterns.',
  order: 37,
  level: 'intermediate',
  tags: ['serverless'],
  subtopics: [
    {
      id: 'amplify-gen2-platform',
      title: 'Amplify Gen 2',
      leaves: [
        { id: 'amplify-auth', title: 'Amplify Auth & Cognito Integration' },
        { id: 'amplify-data', title: 'Amplify Data & GraphQL' },
        { id: 'amplify-storage', title: 'Amplify Storage' },
        { id: 'amplify-functions', title: 'Amplify Functions & Triggers' },
        { id: 'amplify-hosting-ci', title: 'Hosting, Custom Domains & CI/CD' },
        { id: 'amplify-monorepo', title: 'Monorepo & Multi-Environment Deployments' },
      ],
    },
    {
      id: 'appsync-realtime',
      title: 'AWS AppSync',
      leaves: [
        { id: 'appsync-graphql-schema', title: 'GraphQL Schema & Resolvers' },
        { id: 'appsync-subscriptions', title: 'Real-Time Subscriptions' },
        { id: 'appsync-pipeline-resolvers', title: 'Pipeline Resolvers & Caching' },
        { id: 'appsync-multi-auth', title: 'Multi-Auth & Fine-Grained Access' },
        { id: 'appsync-merged-apis', title: 'Merged APIs & Federation' },
      ],
    },
    {
      id: 'location-web-mobile',
      title: 'Location & Mobile Patterns',
      leaves: [
        { id: 'amazon-location-maps', title: 'Amazon Location Service Maps' },
        { id: 'amazon-location-routes', title: 'Routes, Tracking & Geofencing' },
        { id: 'mobile-web-architecture', title: 'Mobile & Web Architecture on AWS' },
      ],
    },
  ],
})

writeTree({
  id: 'financial-analytics',
  title: 'Financial Analytics & Market Data',
  summary: 'FinSpace, market data pipelines and regulated analytics workloads.',
  order: 47,
  level: 'advanced',
  tags: ['analytics'],
  subtopics: [
    {
      id: 'finspace',
      title: 'Amazon FinSpace',
      leaves: [
        { id: 'finspace-overview', title: 'FinSpace Overview & Environments' },
        { id: 'finspace-datasets', title: 'Datasets & Data Ingestion' },
        { id: 'finspace-notebooks', title: 'Notebooks & Analytics' },
        { id: 'finspace-collaboration', title: 'Collaboration & Permissions' },
      ],
    },
    {
      id: 'market-data-patterns',
      title: 'Market Data Patterns',
      leaves: [
        { id: 'market-data-ingestion', title: 'Market Data Ingestion Pipelines' },
        { id: 'entitlements-compliance', title: 'Entitlements & Compliance Controls' },
        { id: 'tick-analytics-architecture', title: 'Tick Analytics Architecture' },
      ],
    },
  ],
})

writeTree({
  id: 'media-gaming-workloads',
  title: 'Media, Gaming & Specialized Workloads',
  summary: 'Elemental media services, GameLift, life sciences and simulation.',
  order: 62,
  level: 'advanced',
  tags: ['advanced'],
  subtopics: [
    {
      id: 'elemental-media',
      title: 'AWS Elemental Media Services',
      leaves: [
        { id: 'mediaconvert', title: 'AWS Elemental MediaConvert' },
        { id: 'medialive', title: 'AWS Elemental MediaLive' },
        { id: 'mediapackage', title: 'AWS Elemental MediaPackage' },
        { id: 'mediatailor', title: 'AWS Elemental MediaTailor' },
        { id: 'mediaconnect', title: 'AWS Elemental MediaConnect' },
        { id: 'media-store-cdn', title: 'Media Storage & CDN Integration' },
      ],
    },
    {
      id: 'gaming-cloud',
      title: 'Game Development & Hosting',
      leaves: [
        { id: 'gamelift-fleets', title: 'GameLift Fleets & Sessions' },
        { id: 'gamelift-flexmatch', title: 'FlexMatch Matchmaking' },
        { id: 'gamelift-fleetiq', title: 'FleetIQ & Game Server Hosting' },
        { id: 'gamelift-anywhere', title: 'GameLift Anywhere & Hybrid Hosting' },
        { id: 'game-analytics-patterns', title: 'Game Analytics & Player Data' },
      ],
    },
    {
      id: 'life-sciences',
      title: 'Life Sciences & Health Data',
      leaves: [
        { id: 'healthomics-workflows', title: 'AWS HealthOmics Workflows' },
        { id: 'healthlake-fhir', title: 'Amazon HealthLake FHIR Stores' },
        { id: 'healthlake-analytics', title: 'HealthLake Analytics & NLP' },
        { id: 'omics-data-lake', title: 'Omics Data Lake Patterns' },
      ],
    },
    {
      id: 'specialized-simulation',
      title: 'Simulation & Emerging Compute',
      leaves: [
        { id: 'braket-quantum', title: 'Amazon Braket Quantum Computing' },
        { id: 'ground-station', title: 'AWS Ground Station' },
        { id: 'simspace-weaver', title: 'AWS SimSpace Weaver' },
        { id: 'robomaker-simulation', title: 'AWS RoboMaker Simulation' },
      ],
    },
  ],
})

writeTree({
  id: 'resource-organization',
  title: 'Resource Organization & Tagging',
  summary: 'Resource Groups, tagging governance, Resource Explorer and Cloud Control API.',
  order: 7,
  level: 'beginner',
  tags: ['getting-started'],
  subtopics: [
    {
      id: 'resource-groups-tagging',
      title: 'Resource Groups & Tagging',
      leaves: [
        { id: 'resource-groups', title: 'AWS Resource Groups' },
        { id: 'tagging-api', title: 'Resource Groups Tagging API' },
        { id: 'tag-policies-orgs', title: 'Tag Policies in Organizations' },
        { id: 'cost-allocation-tags', title: 'Cost Allocation Tags' },
      ],
    },
    {
      id: 'resource-discovery',
      title: 'Resource Discovery & Inventory',
      leaves: [
        { id: 'resource-explorer', title: 'AWS Resource Explorer' },
        { id: 'cloud-control-api', title: 'AWS Cloud Control API' },
        { id: 'service-quotas', title: 'Service Quotas & Limits' },
      ],
    },
    {
      id: 'account-resource-hygiene',
      title: 'Account Resource Hygiene',
      leaves: [
        { id: 'naming-tagging-standards', title: 'Naming & Tagging Standards' },
        { id: 'unused-resource-cleanup', title: 'Unused Resource Cleanup' },
      ],
    },
  ],
})

writeTree({
  id: 'backup-disaster-recovery',
  title: 'Backup, DR & Resilience Services',
  summary: 'AWS Backup, Elastic Disaster Recovery and resilience architecture.',
  order: 52,
  level: 'intermediate',
  tags: ['migration'],
  subtopics: [
    {
      id: 'aws-backup-platform',
      title: 'AWS Backup',
      leaves: [
        { id: 'backup-plans-vaults', title: 'Backup Plans & Vaults' },
        { id: 'backup-cross-region', title: 'Cross-Region & Cross-Account Backup' },
        { id: 'backup-legal-hold', title: 'Legal Hold & Compliance' },
        { id: 'backup-monitoring-audit', title: 'Backup Monitoring & Audit' },
      ],
    },
    {
      id: 'elastic-disaster-recovery',
      title: 'AWS Elastic Disaster Recovery',
      leaves: [
        { id: 'drs-agent-replication', title: 'DRS Agent & Continuous Replication' },
        { id: 'drs-failover-failback', title: 'Failover & Failback Procedures' },
        { id: 'drs-testing-drills', title: 'DR Testing & Drills' },
      ],
    },
    {
      id: 'resilience-architecture',
      title: 'Resilience Architecture',
      leaves: [
        { id: 'rto-rpo-design', title: 'RTO/RPO Design Targets' },
        { id: 'multi-region-dr-patterns', title: 'Multi-Region DR Patterns' },
        { id: 'backup-vs-replication', title: 'Backup vs Replication Strategies' },
      ],
    },
  ],
})

writeTree({
  id: 'unified-cicd-platform',
  title: 'Unified CI/CD & Developer Platforms',
  summary: 'CodePipeline, CodeCatalyst, GitHub Actions and deployment platforms.',
  order: 43,
  level: 'intermediate',
  tags: ['devops'],
  subtopics: [
    {
      id: 'cicd-platforms',
      title: 'CI/CD Platforms',
      leaves: [
        { id: 'codepipeline-orchestration', title: 'CodePipeline Orchestration' },
        { id: 'codecatalyst-projects', title: 'Amazon CodeCatalyst Projects' },
        { id: 'codecatalyst-workflows', title: 'CodeCatalyst Workflows & Blueprints' },
        { id: 'github-actions-aws', title: 'GitHub Actions for AWS' },
      ],
    },
    {
      id: 'deployment-strategies',
      title: 'Deployment Strategies',
      leaves: [
        { id: 'blue-green-deployments', title: 'Blue/Green Deployments' },
        { id: 'canary-linear-deployments', title: 'Canary & Linear Deployments' },
        { id: 'codedeploy-ecs-lambda', title: 'CodeDeploy for ECS & Lambda' },
      ],
    },
    {
      id: 'developer-environments',
      title: 'Cloud Developer Environments',
      leaves: [
        { id: 'codecatalyst-dev-environments', title: 'CodeCatalyst Dev Environments' },
        { id: 'cloud9-ide', title: 'AWS Cloud9 IDE' },
        { id: 'workspace-ide-integration', title: 'IDE & Workspace Integration' },
      ],
    },
  ],
})

// ── Enrichments under existing subtopics (not roadmap roots) ──────────────────

const BAD_ENRICHMENT_IDS = [
  'auditing-governance--tag-governance-program',
  'auditing-governance--config-conformance-packs',
  'auditing-governance--cloudtrail-organization-trails',
  'tracing-observability--opentelemetry-on-aws',
  'tracing-observability--cloudwatch-application-signals',
  'tracing-observability--xray-service-maps',
  'deploy-pipelines--pipeline-approval-gates',
  'deploy-pipelines--multi-account-pipelines',
  'cdk-other-iac--cdk-aspects-testing',
  'cdk-other-iac--terraform-aws-best-practices',
  'cdk-other-iac--sam-pipeline-integration',
  'ecs-fargate--ecs-service-connect',
  'ecs-fargate--ecs-external-instances',
  'eks--eks-auto-mode',
  'eks--eks-pod-identity',
  'eks--eks-capacity-types',
  'generative-ai-aws--bedrock-model-evaluation',
  'generative-ai-aws--bedrock-custom-model-import',
  'generative-ai-aws--bedrock-guardrails-advanced',
  'sagemaker--sagemaker-hyperpod',
  'sagemaker--sagemaker-model-registry',
  'sagemaker--sagemaker-feature-store',
  'ha-disaster-recovery--route53-application-recovery-controller',
  'ha-disaster-recovery--elasticache-global-datastore',
  'multi-account-governance--control-tower-account-factory',
  'multi-account-governance--organizations-scp-strategies',
  'multi-account-governance--ram-sharing-patterns',
  'advanced-networking--transit-gateway-route-tables',
  'advanced-networking--network-firewall-egress-inspection',
  'advanced-networking--privatelink-service-providers',
]
for (const id of BAD_ENRICHMENT_IDS) {
  removeTopic(id)
  removeTopic(`${id}--overview`)
}

writeLeaves('governance-tools', 'monitoring', 'intermediate', [
  { id: 'tag-governance-program', title: 'Tag Governance Program' },
  { id: 'config-conformance-packs', title: 'Config Conformance Packs' },
  { id: 'cloudtrail-organization-trails', title: 'Organization CloudTrail Trails' },
])

writeLeaves('managed-observability', 'monitoring', 'advanced', [
  { id: 'opentelemetry-on-aws', title: 'OpenTelemetry on AWS' },
  { id: 'cloudwatch-application-signals', title: 'CloudWatch Application Signals' },
])

writeLeaves('aws-xray', 'monitoring', 'advanced', [
  { id: 'xray-service-maps', title: 'X-Ray Service Maps & Analytics' },
])

writeLeaves('codepipeline', 'devops', 'intermediate', [
  { id: 'pipeline-approval-gates', title: 'Pipeline Approval Gates' },
  { id: 'multi-account-pipeline-patterns', title: 'Multi-Account Pipeline Patterns' },
])

writeLeaves('aws-cdk', 'iac-automation', 'intermediate', [
  { id: 'cdk-aspects-testing', title: 'CDK Aspects & Testing' },
])

writeLeaves('third-party-iac', 'iac-automation', 'intermediate', [
  { id: 'terraform-aws-best-practices', title: 'Terraform on AWS Best Practices' },
])

writeLeaves('aws-sam', 'iac-automation', 'intermediate', [
  { id: 'sam-pipeline-integration', title: 'SAM Pipeline Integration' },
])

writeLeaves('ecs-core', 'containers', 'intermediate', [
  { id: 'ecs-service-connect', title: 'ECS Service Connect' },
  { id: 'ecs-external-instances', title: 'ECS External Instances' },
])

writeLeaves('eks-operations', 'containers', 'advanced', [
  { id: 'eks-auto-mode', title: 'Amazon EKS Auto Mode' },
  { id: 'eks-pod-identity', title: 'EKS Pod Identity' },
  { id: 'eks-capacity-types', title: 'EKS Capacity Types & Karpenter' },
])

writeLeaves('amazon-bedrock', 'ml-ai', 'advanced', [
  { id: 'bedrock-model-evaluation', title: 'Bedrock Model Evaluation' },
  { id: 'bedrock-custom-model-import', title: 'Bedrock Custom Model Import' },
  { id: 'bedrock-guardrails-advanced', title: 'Bedrock Guardrails Advanced' },
])

writeLeaves('sagemaker-mlops', 'ml-ai', 'advanced', [
  { id: 'sagemaker-hyperpod', title: 'SageMaker HyperPod' },
  { id: 'sagemaker-model-registry', title: 'SageMaker Model Registry & Monitoring' },
  { id: 'sagemaker-feature-store', title: 'SageMaker Feature Store' },
])

writeLeaves('disaster-recovery', 'well-architected', 'advanced', [
  { id: 'route53-application-recovery-controller', title: 'Route 53 Application Recovery Controller' },
  { id: 'elasticache-global-datastore', title: 'ElastiCache Global Datastore' },
])

writeLeaves('control-tower', 'advanced', 'advanced', [
  { id: 'account-factory-automation', title: 'Account Factory Automation' },
  { id: 'organizations-scp-strategies', title: 'Organizations SCP Strategies' },
])

writeLeaves('shared-services', 'advanced', 'advanced', [
  { id: 'ram-sharing-patterns', title: 'RAM Resource Sharing Patterns' },
])

writeLeaves('network-topology', 'advanced', 'advanced', [
  { id: 'transit-gateway-route-tables', title: 'Transit Gateway Route Tables' },
])

writeLeaves('network-security-advanced', 'advanced', 'advanced', [
  { id: 'network-firewall-egress-inspection', title: 'Network Firewall Egress Inspection' },
])

writeLeaves('private-connectivity', 'advanced', 'advanced', [
  { id: 'privatelink-service-providers', title: 'PrivateLink Service Provider Patterns' },
])

writeSubtopic('other-compute', 'compute', 'intermediate', {
  id: 'edge-hybrid-compute',
  title: 'Edge & Hybrid Compute',
  leaves: [
    { id: 'outposts-racks-servers', title: 'AWS Outposts Racks & Servers' },
    { id: 'local-zones-workloads', title: 'Local Zones Workload Placement' },
    { id: 'wavelength-5g-edge', title: 'Wavelength & 5G Edge' },
  ],
}, 6)

writeSubtopic('edge-hybrid-emerging', 'advanced', 'advanced', {
  id: 'edge-compute-expanded',
  title: 'Edge Compute & Greengrass',
  leaves: [
    { id: 'greengrass-components', title: 'IoT Greengrass Components' },
    { id: 'greengrass-deployments', title: 'Greengrass Deployments & Fleet' },
    { id: 'lambda-edge-cloudfront', title: 'Lambda@Edge & CloudFront Functions' },
    { id: 'snowball-edge-compute', title: 'Snowball Edge Compute' },
  ],
}, 5)

writeLeaves('batch-computing', 'compute', 'intermediate', [
  { id: 'batch-job-definitions', title: 'Batch Job Definitions' },
  { id: 'batch-job-queues-scheduling', title: 'Job Queues & Scheduling' },
  { id: 'batch-array-jobs', title: 'Array Jobs & Dependencies' },
  { id: 'batch-spot-capacity', title: 'Spot Capacity & Cost Optimization' },
])

writeLeaves('graph-timeseries-dbs', 'databases', 'advanced', [
  { id: 'neptune-gremlin-sparql', title: 'Neptune Gremlin & SPARQL' },
  { id: 'neptune-serverless', title: 'Neptune Serverless & Analytics' },
  { id: 'timestream-live-analytics', title: 'Timestream LiveAnalytics' },
  { id: 'timestream-influxdb', title: 'Amazon Timestream for InfluxDB' },
])

writeLeaves('document-key-value-dbs', 'databases', 'intermediate', [
  { id: 'documentdb-clusters', title: 'DocumentDB Clusters & Replication' },
  { id: 'keyspaces-capacity', title: 'Keyspaces Capacity & Replication' },
  { id: 'memorydb-multi-az', title: 'MemoryDB Multi-AZ & Durability' },
])

writeLeaves('threat-detection-services', 'security', 'advanced', [
  { id: 'security-hub-cspm', title: 'Security Hub CSPM & Standards' },
  { id: 'guardduty-malware-protection', title: 'GuardDuty Malware Protection' },
  { id: 'inspector-vulnerability-scanning', title: 'Inspector Vulnerability Scanning' },
])

writeLeaves('application-access-services', 'security', 'advanced', [
  { id: 'verified-permissions-cedar', title: 'Verified Permissions & Cedar Policy' },
  { id: 'verified-permissions-patterns', title: 'Fine-Grained Authorization Patterns' },
])

writeLeaves('specialized-ai', 'ml-ai', 'intermediate', [
  { id: 'comprehend-medical-nlp', title: 'Comprehend Medical NLP' },
  { id: 'textract-document-analysis', title: 'Textract Document Analysis' },
  { id: 'transcribe-call-analytics', title: 'Transcribe Call Analytics' },
])

// ── Roadmap updates ───────────────────────────────────────────────────────────

function updateRoadmap() {
  const roadmap = JSON.parse(readFileSync(ROADMAP_FILE, 'utf8'))

  const additions = [
    {
      stageId: 'getting-started',
      node: {
        id: 'resource-organization',
        title: 'Resource Organization & Tagging',
        topicId: 'resource-organization',
        status: 'core',
        description: 'Resource Groups, tagging governance, Resource Explorer and Cloud Control API.',
      },
    },
    {
      stageId: 'compute',
      node: {
        id: 'end-user-computing',
        title: 'End-User Computing (WorkSpaces & AppStream)',
        topicId: 'end-user-computing',
        status: 'core',
        description: 'Virtual desktops, application streaming and thin clients.',
      },
    },
    {
      stageId: 'serverless',
      node: {
        id: 'frontend-mobile-aws',
        title: 'Frontend, Mobile & Real-Time APIs',
        topicId: 'frontend-mobile-aws',
        status: 'core',
        description: 'Amplify Gen 2, AppSync, Location Service and mobile/web patterns.',
      },
    },
    {
      stageId: 'integration',
      node: {
        id: 'customer-engagement',
        title: 'Customer Engagement & Messaging',
        topicId: 'customer-engagement',
        status: 'core',
        description: 'SES, Pinpoint, Connect and Chime SDK.',
      },
    },
    {
      stageId: 'devops',
      node: {
        id: 'unified-cicd-platform',
        title: 'Unified CI/CD & Developer Platforms',
        topicId: 'unified-cicd-platform',
        status: 'core',
        description: 'CodePipeline, CodeCatalyst, GitHub Actions and deployment strategies.',
      },
    },
    {
      stageId: 'analytics',
      node: {
        id: 'data-governance-sharing',
        title: 'Data Governance, Sharing & Catalogs',
        topicId: 'data-governance-analytics',
        status: 'core',
        description: 'DataZone, Clean Rooms, catalog governance and entity resolution.',
      },
    },
    {
      stageId: 'analytics',
      node: {
        id: 'financial-analytics',
        title: 'Financial Analytics & Market Data',
        topicId: 'financial-analytics',
        status: 'core',
        description: 'FinSpace and market data analytics patterns.',
      },
    },
    {
      stageId: 'migration',
      node: {
        id: 'backup-disaster-recovery',
        title: 'Backup, DR & Resilience Services',
        topicId: 'backup-disaster-recovery',
        status: 'core',
        description: 'AWS Backup, Elastic Disaster Recovery and resilience architecture.',
      },
    },
    {
      stageId: 'advanced',
      node: {
        id: 'iot-edge-platform',
        title: 'IoT Platform & Connected Devices',
        topicId: 'iot-services',
        status: 'core',
        description: 'IoT Core, device management, analytics and industrial IoT.',
      },
    },
    {
      stageId: 'advanced',
      node: {
        id: 'media-gaming-workloads',
        title: 'Media, Gaming & Specialized Workloads',
        topicId: 'media-gaming-workloads',
        status: 'core',
        description: 'Elemental media, GameLift, life sciences and simulation.',
      },
    },
  ]

  for (const { stageId, node } of additions) {
    const stage = roadmap.stages.find((s) => s.id === stageId)
    if (!stage) continue
    if (!stage.nodes.some((n) => n.topicId === node.topicId)) {
      stage.nodes.push(node)
    }
  }

  if (!DRY_RUN) {
    writeFileSync(ROADMAP_FILE, `${JSON.stringify(roadmap, null, 2)}\n`)
  }
}

updateRoadmap()

console.log(
  `[aws] comprehensive gap-fill: wrote ${written}, skipped ${skipped}, removed ${removed}${DRY_RUN ? ' (dry-run)' : ''}.`,
)
