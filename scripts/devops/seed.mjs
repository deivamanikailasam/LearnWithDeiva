/**
 * Seed all top-level (roadmap-anchor) topic.json files for the DevOps subject.
 *
 * Each top-level topic has:
 *  - id    : roadmap node topicId
 *  - title : roadmap node title
 *  - summary, level, tags
 *  - order : sequential within its stage (1..n)
 *  - no parentId (it is a root)
 *
 * Run with: node scripts/devops/seed.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/devops')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

const roadmap = JSON.parse(readFileSync(resolve(SUBJECT_DIR, 'roadmap.json'), 'utf8'))

/** Difficulty level for each top-level topic (id → level). */
const LEVELS = {
  // 1. DevOps Foundations
  'devops-fundamentals': 'beginner',
  'devops-lifecycle': 'beginner',
  'devops-metrics': 'intermediate',
  // 2. Linux & Operating Systems
  'linux-fundamentals': 'beginner',
  'shell-cli': 'beginner',
  'system-administration': 'intermediate',
  // 3. Networking
  'networking-fundamentals': 'beginner',
  'dns-service-discovery': 'intermediate',
  'load-balancing-proxies': 'intermediate',
  'tls-ssl-pki': 'intermediate',
  // 4. Version Control
  'git-fundamentals': 'beginner',
  'git-workflows': 'intermediate',
  'code-hosting-platforms': 'beginner',
  'code-review-quality': 'intermediate',
  // 5. Scripting & Automation
  'bash-shell-scripting': 'intermediate',
  'powershell-scripting': 'intermediate',
  'go-for-devops': 'advanced',
  'configuration-languages': 'beginner',
  'regex-for-devops': 'intermediate',
  'python-for-devops': 'intermediate',
  'typescript-for-devops': 'intermediate',
  // 6. Build, Package & Artifact
  'build-tools': 'intermediate',
  'package-managers': 'beginner',
  'artifact-repositories': 'intermediate',
  'container-binary-registries': 'intermediate',
  // 7. Service Mesh & API Gateway
  'service-mesh-fundamentals': 'advanced',
  'istio': 'advanced',
  'linkerd': 'advanced',
  'other-service-meshes': 'advanced',
  'api-gateways': 'intermediate',
  // 8. IaC
  'iac-fundamentals': 'intermediate',
  'terraform-opentofu': 'intermediate',
  'pulumi': 'intermediate',
  'cloudformation-cdk': 'intermediate',
  'crossplane': 'advanced',
  'other-iac-tools': 'intermediate',
  'infrastructure-testing': 'advanced',
  // 9. Configuration Management
  'config-management-fundamentals': 'intermediate',
  'ansible': 'intermediate',
  'chef': 'intermediate',
  'puppet': 'intermediate',
  'saltstack': 'intermediate',
  // 10. CI/CD
  'cicd-fundamentals': 'intermediate',
  'jenkins': 'intermediate',
  'github-actions': 'intermediate',
  'gitlab-cicd': 'intermediate',
  'other-cicd-tools': 'intermediate',
  'pipeline-as-code': 'intermediate',
  'self-hosted-runners': 'advanced',
  'testing-quality-pipelines': 'intermediate',
  'performance-engineering': 'intermediate',
  // 11. GitOps
  'gitops-fundamentals': 'advanced',
  'argo-cd': 'advanced',
  'flux': 'advanced',
  'other-gitops-tools': 'advanced',
  // 12. Release & Progressive Delivery
  'deployment-strategies': 'intermediate',
  'feature-flags': 'intermediate',
  'progressive-delivery-tools': 'advanced',
  // 13. Observability
  'observability-fundamentals': 'intermediate',
  'prometheus-metrics': 'intermediate',
  'grafana-visualization': 'intermediate',
  'opentelemetry': 'advanced',
  'commercial-observability': 'intermediate',
  'observability-profiling': 'advanced',
  // 14. Logging
  'log-management-fundamentals': 'intermediate',
  'elk-efk-stack': 'intermediate',
  'loki-modern-logging': 'intermediate',
  'log-collectors': 'intermediate',
  // 15. Tracing & APM
  'tracing-fundamentals': 'intermediate',
  'jaeger': 'intermediate',
  'tempo-zipkin': 'intermediate',
  'apm-platforms': 'intermediate',
  // 16. SRE
  'sre-principles': 'advanced',
  'sli-slo-sla': 'advanced',
  'error-budgets': 'advanced',
  'toil-automation': 'advanced',
  'capacity-planning': 'advanced',
  'disaster-recovery-bcp': 'advanced',
  // 17. Incident Management
  'incident-response': 'intermediate',
  'on-call-practices': 'intermediate',
  'alerting-tools': 'intermediate',
  'postmortems': 'intermediate',
  'status-pages': 'intermediate',
  'itsm-service-management': 'intermediate',
  // 18. Chaos & Resilience
  'chaos-engineering-principles': 'advanced',
  'chaos-engineering-tools': 'advanced',
  'resilience-patterns': 'advanced',
  // 19. DevSecOps
  'devsecops-fundamentals': 'intermediate',
  'sast-dast-sca': 'intermediate',
  'secrets-management': 'intermediate',
  'container-cluster-security': 'advanced',
  'supply-chain-security': 'advanced',
  'runtime-security': 'advanced',
  'iac-security-scanning': 'advanced',
  'cnapp-cloud-security': 'advanced',
  // 20. Compliance, Policy & Governance
  'compliance-frameworks': 'intermediate',
  'policy-as-code': 'advanced',
  'cloud-governance': 'advanced',
  'auditing-drift-detection': 'advanced',
  // 21. Cloud-Native & Multi-Cloud
  'cncf-landscape': 'intermediate',
  'cloud-service-models': 'beginner',
  'cloud-provider-fundamentals': 'beginner',
  'multi-cloud-hybrid': 'advanced',
  'edge-computing': 'advanced',
  'serverless-for-devops': 'intermediate',
  'event-streaming-messaging': 'intermediate',
  // 22. Platform Engineering
  'platform-engineering-fundamentals': 'advanced',
  'idp-tools': 'advanced',
  'golden-paths-templates': 'advanced',
  'developer-self-service': 'advanced',
  // 23. FinOps
  'finops-principles': 'intermediate',
  'cost-visibility-tagging': 'intermediate',
  'cost-optimization': 'intermediate',
  'kubernetes-cost-management': 'advanced',
  // 24. DatabaseOps & DataOps
  'database-lifecycle': 'intermediate',
  'schema-migrations': 'intermediate',
  'database-cicd': 'advanced',
  'dataops-principles': 'advanced',
  'data-pipeline-orchestration': 'advanced',
  // 25. MLOps / LLMOps / AIOps
  'mlops-fundamentals': 'advanced',
  'model-deployment-serving': 'advanced',
  'model-monitoring': 'advanced',
  'llmops': 'advanced',
  'aiops-tools': 'advanced',
  // 26. Docs & Knowledge
  'documentation-as-code': 'intermediate',
  'runbooks-playbooks': 'intermediate',
  'knowledge-management': 'intermediate',
  // 27. AI-Augmented DevOps
  'ai-in-cicd': 'advanced',
  'ai-coding-agents-devops': 'advanced',
  'ebpf-for-devops': 'advanced',
  'webassembly-devops': 'advanced',
  'sustainable-devops': 'advanced',
  'agentic-ai-devops': 'advanced',
  // 28. Career
  'devops-roles-career': 'beginner',
  'devops-certifications': 'intermediate',
  'continuous-learning': 'beginner',
}

let created = 0
let skipped = 0
let order = 0

for (const stage of roadmap.stages) {
  for (const node of stage.nodes) {
    order += 1
    const dir = resolve(TOPICS_DIR, node.topicId)
    const file = resolve(dir, 'topic.json')
    if (existsSync(file)) {
      skipped += 1
      continue
    }
    const meta = {
      id: node.topicId,
      title: node.title,
      summary: node.description ?? node.title,
      order,
      level: LEVELS[node.topicId] ?? 'intermediate',
      tags: [stage.id],
    }
    mkdirSync(dir, { recursive: true })
    writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
    created += 1
  }
}

console.log(`[devops:seed] created ${created} topic files, skipped ${skipped} existing.`)
