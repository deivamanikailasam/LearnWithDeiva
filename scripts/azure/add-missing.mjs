/**
 * Azure roadmap — additions pass.
 *
 * Adds commonly-used, must-learn Azure topics/subtopics/sub-subtopics that were
 * missing from the initial scaffold (current to June 2026). Idempotent: existing
 * ids are skipped. Sibling `order` continues after any existing siblings, so new
 * nodes append cleanly under existing parents.
 *
 * Node ids are written in full (using `parent--child` for leaves). A node is
 * either a NEW ROOT (`tag` set, no `parentId`) or a GRAFT under an existing
 * topic (`parentId` set). Children inherit the parent's tags; level inherits
 * unless overridden.
 *
 * Usage: node scripts/azure/add-missing.mjs
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOPICS_DIR = resolve(__dirname, '../../src/content/subjects/azure/topics')

const ADDITIONS = [
  // ============================ COMPUTE ============================
  {
    id: 'azure-virtual-desktop', tag: 'compute', level: 'intermediate',
    title: 'Azure Virtual Desktop & Windows 365',
    summary: 'Desktop and app virtualization on Azure.',
    children: [
      {
        id: 'avd-fundamentals', title: 'AVD Fundamentals', children: [
          { id: 'avd-fundamentals--host-pools', title: 'Host Pools' },
          { id: 'avd-fundamentals--session-hosts', title: 'Session Hosts' },
          { id: 'avd-fundamentals--application-groups', title: 'Application Groups' },
          { id: 'avd-fundamentals--workspaces', title: 'Workspaces' },
        ],
      },
      {
        id: 'avd-management', title: 'AVD Management', children: [
          { id: 'avd-management--fslogix-profiles', title: 'FSLogix Profiles' },
          { id: 'avd-management--scaling-plans', title: 'Scaling Plans' },
          { id: 'avd-management--msix-app-attach', title: 'MSIX App Attach' },
          { id: 'avd-management--golden-image', title: 'Golden Image Management' },
        ],
      },
      {
        id: 'avd-access-security', title: 'Access & Security', children: [
          { id: 'avd-access-security--remoteapp', title: 'RemoteApp' },
          { id: 'avd-access-security--conditional-access-avd', title: 'Conditional Access' },
          { id: 'avd-access-security--rbac-avd', title: 'RBAC' },
        ],
      },
      {
        id: 'windows-365', title: 'Windows 365', children: [
          { id: 'windows-365--cloud-pc', title: 'Cloud PC' },
          { id: 'windows-365--w365-provisioning', title: 'Provisioning Policies' },
          { id: 'windows-365--w365-frontline', title: 'Windows 365 Frontline' },
        ],
      },
    ],
  },
  {
    id: 'vm-security', parentId: 'virtual-machines', title: 'VM Security',
    children: [
      { id: 'vm-security--trusted-launch', title: 'Trusted Launch' },
      { id: 'vm-security--confidential-vms', title: 'Confidential VMs' },
      { id: 'vm-security--disk-encryption-sets', title: 'Disk Encryption Sets' },
      { id: 'vm-security--just-in-time-vm-access', title: 'Just-In-Time VM Access' },
    ],
  },
  {
    id: 'aks-service-mesh', parentId: 'aks', title: 'Service Mesh',
    children: [
      { id: 'aks-service-mesh--istio-addon', title: 'Istio-Based Add-On' },
      { id: 'aks-service-mesh--mesh-observability', title: 'Mesh Observability' },
    ],
  },

  // ============================ STORAGE ============================
  {
    id: 'specialized-storage', tag: 'storage', level: 'advanced',
    title: 'Specialized Storage',
    summary: 'NetApp Files, Elastic SAN and container storage.',
    children: [
      {
        id: 'azure-netapp-files', title: 'Azure NetApp Files', children: [
          { id: 'azure-netapp-files--service-levels', title: 'Service Levels' },
          { id: 'azure-netapp-files--volumes-pools', title: 'Capacity Pools & Volumes' },
          { id: 'azure-netapp-files--cross-region-replication', title: 'Cross-Region Replication' },
        ],
      },
      {
        id: 'elastic-san', title: 'Azure Elastic SAN', children: [
          { id: 'elastic-san--san-volumes', title: 'Volume Groups & Volumes' },
          { id: 'elastic-san--iscsi-connectivity', title: 'iSCSI Connectivity' },
        ],
      },
      {
        id: 'azure-container-storage', title: 'Azure Container Storage', children: [
          { id: 'azure-container-storage--storage-pools', title: 'Storage Pools' },
          { id: 'azure-container-storage--volume-types', title: 'Volume Types' },
        ],
      },
    ],
  },

  // ============================ NETWORKING ============================
  {
    id: 'virtual-network-manager', parentId: 'virtual-networks', title: 'Virtual Network Manager',
    children: [
      { id: 'virtual-network-manager--network-groups', title: 'Network Groups' },
      { id: 'virtual-network-manager--connectivity-configurations', title: 'Connectivity Configurations' },
      { id: 'virtual-network-manager--security-admin-rules', title: 'Security Admin Rules' },
      { id: 'virtual-network-manager--ip-address-management', title: 'IP Address Management' },
    ],
  },
  {
    id: 'ddos-protection', parentId: 'network-security', title: 'DDoS Protection',
    children: [
      { id: 'ddos-protection--ddos-network-protection', title: 'DDoS Network Protection' },
      { id: 'ddos-protection--ddos-ip-protection', title: 'DDoS IP Protection' },
      { id: 'ddos-protection--mitigation-policies', title: 'Mitigation Policies' },
    ],
  },
  {
    id: 'gateway-load-balancer', parentId: 'load-balancing', title: 'Gateway Load Balancer',
    children: [
      { id: 'gateway-load-balancer--nva-integration', title: 'NVA Integration' },
      { id: 'gateway-load-balancer--service-chaining-glb', title: 'Service Chaining' },
    ],
  },
  {
    id: 'azure-cdn', parentId: 'load-balancing', title: 'Azure CDN',
    children: [
      { id: 'azure-cdn--front-door-cdn', title: 'Front Door CDN' },
      { id: 'azure-cdn--caching-rules', title: 'Caching Rules' },
      { id: 'azure-cdn--cdn-migration', title: 'Classic CDN Migration' },
    ],
  },

  // ============================ DATABASES ============================
  {
    id: 'cosmos-mongodb-vcore', parentId: 'cosmos-db', title: 'Cosmos DB for MongoDB (vCore)',
    children: [
      { id: 'cosmos-mongodb-vcore--vcore-architecture', title: 'vCore Architecture' },
      { id: 'cosmos-mongodb-vcore--vcore-vs-ru', title: 'vCore vs RU' },
      { id: 'cosmos-mongodb-vcore--vcore-vector-search', title: 'Vector Search' },
    ],
  },

  // ============================ APP INTEGRATION ============================
  {
    id: 'app-configuration', tag: 'app-integration', level: 'intermediate',
    title: 'Azure App Configuration',
    summary: 'Centralized application settings and feature flags.',
    children: [
      {
        id: 'app-config-fundamentals', title: 'App Configuration Fundamentals', children: [
          { id: 'app-config-fundamentals--configuration-stores', title: 'Configuration Stores' },
          { id: 'app-config-fundamentals--keys-values', title: 'Keys & Values' },
          { id: 'app-config-fundamentals--key-vault-references', title: 'Key Vault References' },
        ],
      },
      {
        id: 'feature-management', title: 'Feature Management', children: [
          { id: 'feature-management--feature-flags', title: 'Feature Flags' },
          { id: 'feature-management--feature-filters', title: 'Feature Filters' },
        ],
      },
    ],
  },
  {
    id: 'api-center', parentId: 'api-management', title: 'Azure API Center',
    children: [
      { id: 'api-center--api-inventory', title: 'API Inventory' },
      { id: 'api-center--api-governance', title: 'API Governance' },
      { id: 'api-center--api-discovery', title: 'API Discovery' },
    ],
  },

  // ============================ GOVERNANCE ============================
  {
    id: 'azure-lighthouse', tag: 'governance', level: 'advanced',
    title: 'Azure Lighthouse',
    summary: 'Cross-tenant and delegated resource management.',
    children: [
      {
        id: 'lighthouse-fundamentals', title: 'Lighthouse Fundamentals', children: [
          { id: 'lighthouse-fundamentals--delegated-resource-management', title: 'Delegated Resource Management' },
          { id: 'lighthouse-fundamentals--multi-tenant-management', title: 'Multi-Tenant Management' },
          { id: 'lighthouse-fundamentals--onboarding-customers', title: 'Onboarding Customers' },
        ],
      },
      {
        id: 'lighthouse-operations', title: 'Operations', children: [
          { id: 'lighthouse-operations--cross-tenant-management', title: 'Cross-Tenant Management at Scale' },
          { id: 'lighthouse-operations--marketplace-offers', title: 'Managed Service Marketplace Offers' },
        ],
      },
    ],
  },
  {
    id: 'managed-applications', parentId: 'resource-manager', title: 'Managed Applications',
    children: [
      { id: 'managed-applications--service-catalog', title: 'Service Catalog' },
      { id: 'managed-applications--marketplace-managed-apps', title: 'Marketplace Managed Apps' },
      { id: 'managed-applications--publishing-managed-apps', title: 'Publishing Managed Apps' },
    ],
  },

  // ============================ MONITORING ============================
  {
    id: 'managed-prometheus', parentId: 'azure-monitor', title: 'Managed Prometheus',
    children: [
      { id: 'managed-prometheus--prometheus-metrics', title: 'Prometheus Metrics' },
      { id: 'managed-prometheus--promql', title: 'PromQL' },
      { id: 'managed-prometheus--prometheus-rule-groups', title: 'Rule Groups' },
    ],
  },

  // ============================ SECURITY ============================
  {
    id: 'defender-for-ai', parentId: 'defender-for-cloud', title: 'Defender for AI',
    children: [
      { id: 'defender-for-ai--ai-threat-protection', title: 'AI Threat Protection' },
      { id: 'defender-for-ai--ai-security-posture', title: 'AI Security Posture Management' },
      { id: 'defender-for-ai--prompt-injection-alerts', title: 'Prompt Injection Alerts' },
    ],
  },
  {
    id: 'azure-attestation', parentId: 'encryption-data-protection', title: 'Azure Attestation',
    children: [
      { id: 'azure-attestation--attestation-overview', title: 'Attestation Overview' },
      { id: 'azure-attestation--confidential-computing-attestation', title: 'Confidential Computing Attestation' },
    ],
  },

  // ============================ IDENTITY ============================
  {
    id: 'global-secure-access', parentId: 'entra-id-governance', title: 'Global Secure Access (SSE)',
    children: [
      { id: 'global-secure-access--internet-access', title: 'Microsoft Entra Internet Access' },
      { id: 'global-secure-access--private-access', title: 'Microsoft Entra Private Access' },
      { id: 'global-secure-access--traffic-forwarding-profiles', title: 'Traffic Forwarding Profiles' },
    ],
  },
  {
    id: 'entra-permissions-management', parentId: 'entra-id-governance', title: 'Permissions Management (CIEM)',
    children: [
      { id: 'entra-permissions-management--ciem-overview', title: 'CIEM Overview' },
      { id: 'entra-permissions-management--permissions-creep-index', title: 'Permissions Creep Index' },
      { id: 'entra-permissions-management--remediation-pm', title: 'Remediation' },
    ],
  },
  {
    id: 'entra-verified-id', parentId: 'external-identities', title: 'Entra Verified ID',
    children: [
      { id: 'entra-verified-id--decentralized-identity', title: 'Decentralized Identity' },
      { id: 'entra-verified-id--verifiable-credentials', title: 'Verifiable Credentials' },
      { id: 'entra-verified-id--issuance-verification', title: 'Issuance & Verification' },
    ],
  },

  // ============================ IAC & DEVOPS ============================
  {
    id: 'developer-environments', tag: 'iac-devops', level: 'intermediate',
    title: 'Developer Environments',
    summary: 'Dev Box and Deployment Environments via Dev Center.',
    children: [
      {
        id: 'azure-dev-box', title: 'Azure Dev Box', children: [
          { id: 'azure-dev-box--dev-box-pools', title: 'Dev Box Pools' },
          { id: 'azure-dev-box--dev-box-definitions', title: 'Dev Box Definitions' },
        ],
      },
      {
        id: 'azure-deployment-environments', title: 'Azure Deployment Environments', children: [
          { id: 'azure-deployment-environments--environment-definitions', title: 'Environment Definitions' },
          { id: 'azure-deployment-environments--catalogs-ade', title: 'Catalogs' },
        ],
      },
      {
        id: 'dev-center', title: 'Dev Center', children: [
          { id: 'dev-center--projects-dev-center', title: 'Projects' },
        ],
      },
    ],
  },
  {
    id: 'github-advanced-security', parentId: 'azure-devops', title: 'GitHub Advanced Security for Azure DevOps',
    children: [
      { id: 'github-advanced-security--code-scanning', title: 'Code Scanning' },
      { id: 'github-advanced-security--secret-scanning', title: 'Secret Scanning' },
      { id: 'github-advanced-security--dependency-scanning', title: 'Dependency Scanning' },
    ],
  },

  // ============================ DATA & ANALYTICS ============================
  {
    id: 'azure-data-share', parentId: 'data-factory', title: 'Azure Data Share',
    children: [
      { id: 'azure-data-share--snapshot-sharing', title: 'Snapshot-Based Sharing' },
      { id: 'azure-data-share--in-place-sharing', title: 'In-Place Sharing' },
    ],
  },

  // ============================ AI & ML ============================
  {
    id: 'openai-responsible-ai', parentId: 'azure-openai', title: 'Responsible AI',
    children: [
      { id: 'openai-responsible-ai--content-filters', title: 'Content Filters' },
      { id: 'openai-responsible-ai--abuse-monitoring', title: 'Abuse Monitoring' },
      { id: 'openai-responsible-ai--prompt-shields', title: 'Prompt Shields' },
    ],
  },

  // ============================ WEB, MOBILE & REALTIME ============================
  {
    id: 'azure-maps', tag: 'web-mobile', level: 'intermediate',
    title: 'Azure Maps',
    summary: 'Geospatial APIs and location intelligence.',
    children: [
      {
        id: 'maps-fundamentals', title: 'Maps Fundamentals', children: [
          { id: 'maps-fundamentals--map-rendering', title: 'Map Rendering' },
          { id: 'maps-fundamentals--search-service', title: 'Search Service' },
          { id: 'maps-fundamentals--route-service', title: 'Route Service' },
        ],
      },
      {
        id: 'maps-services', title: 'Location Services', children: [
          { id: 'maps-services--geolocation', title: 'Geolocation' },
          { id: 'maps-services--weather-services', title: 'Weather Services' },
          { id: 'maps-services--spatial-operations', title: 'Spatial Operations' },
        ],
      },
    ],
  },

  // ============================ MIGRATION & HYBRID ============================
  {
    id: 'azure-resource-mover', parentId: 'azure-migrate', title: 'Azure Resource Mover',
    children: [
      { id: 'azure-resource-mover--move-across-regions', title: 'Move Across Regions' },
      { id: 'azure-resource-mover--move-across-resource-groups', title: 'Move Across Resource Groups' },
    ],
  },
]

function loadTopics() {
  const byId = new Map()
  const maxOrderByParent = new Map()
  for (const d of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    try {
      const meta = JSON.parse(readFileSync(resolve(TOPICS_DIR, d.name, 'topic.json')))
      byId.set(meta.id, meta)
      const key = meta.parentId ?? '__root__'
      maxOrderByParent.set(key, Math.max(maxOrderByParent.get(key) ?? 0, meta.order ?? 0))
    } catch {
      // ignore
    }
  }
  return { byId, maxOrderByParent }
}

function main() {
  const { byId, maxOrderByParent } = loadTopics()
  const runningOrder = new Map()
  let created = 0
  let skipped = 0

  const nextOrder = (parentKey) => {
    if (!runningOrder.has(parentKey)) runningOrder.set(parentKey, maxOrderByParent.get(parentKey) ?? 0)
    const next = runningOrder.get(parentKey) + 1
    runningOrder.set(parentKey, next)
    return next
  }

  const write = (meta) => {
    if (byId.has(meta.id)) {
      skipped += 1
      return
    }
    const dir = resolve(TOPICS_DIR, meta.id)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
    byId.set(meta.id, meta)
    created += 1
  }

  const writeNode = (node, parentId, tags, parentLevel) => {
    const key = parentId ?? '__root__'
    const level = node.level ?? parentLevel
    const meta = {
      id: node.id,
      title: node.title,
      summary: node.summary ?? node.title,
      order: nextOrder(key),
      level,
      tags,
    }
    if (parentId) meta.parentId = parentId
    write(meta)
    for (const child of node.children ?? []) {
      writeNode(child, node.id, tags, level)
    }
  }

  for (const item of ADDITIONS) {
    let tags
    let parentLevel
    if (item.parentId) {
      const parent = byId.get(item.parentId)
      if (!parent) throw new Error(`Missing parent "${item.parentId}" for "${item.id}"`)
      tags = parent.tags
      parentLevel = parent.level
    } else {
      if (!item.tag) throw new Error(`Root "${item.id}" needs a tag`)
      tags = [item.tag]
      parentLevel = item.level ?? 'beginner'
    }
    writeNode(item, item.parentId, tags, parentLevel)
  }

  console.log(`Azure additions: created ${created} topic files, skipped ${skipped} existing.`)
}

main()
