import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/agentic-ai')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const ROADMAP_FILE = resolve(SUBJECT_DIR, 'roadmap.json')

/**
 * Enterprise development & production-grade lifecycle additions for Agentic AI.
 *
 * Two new stages are appended to the roadmap:
 *   - enterprise-delivery       (Enterprise Development & Enablement)
 *   - production-lifecycle      (Production-Grade Application Lifecycle)
 *
 * Each top-level (root) topic carries a stage tag and has children. Children
 * inherit the root's tag and level unless explicitly overridden. Existing
 * topic ids are left untouched (the writer skips duplicates).
 */
const STAGES = [
  {
    id: 'enterprise-delivery',
    title: 'Enterprise Development & Enablement',
    summary: 'Strategy, governance, platform and enablement for building agentic AI at enterprise scale.',
    tag: 'enterprise-delivery',
    nodes: [
      {
        id: 'enterprise-ai-strategy',
        title: 'Enterprise AI Strategy & Operating Model',
        summary: 'Strategy, operating model and AI center of excellence.',
        level: 'advanced',
        children: [
          { id: 'ai-center-of-excellence', title: 'AI Center of Excellence (CoE)' },
          { id: 'ai-operating-model', title: 'AI Target Operating Model' },
          { id: 'ai-strategy-roadmap', title: 'Enterprise AI Strategy & Roadmap' },
          { id: 'ai-portfolio-strategy', title: 'AI Portfolio Strategy' },
          { id: 'executive-sponsorship', title: 'Executive Sponsorship & Steering' },
          { id: 'ai-maturity-model', title: 'AI Maturity Model & Assessment' },
          { id: 'value-streams-mapping', title: 'AI Value Streams & Capability Mapping' },
        ],
      },
      {
        id: 'discovery-requirements',
        title: 'Discovery & Requirements Engineering',
        summary: 'Use case discovery, business case and requirements engineering.',
        level: 'intermediate',
        children: [
          { id: 'use-case-discovery', title: 'AI Use Case Discovery & Ideation' },
          { id: 'business-case-roi', title: 'Business Case & ROI Modeling' },
          { id: 'feasibility-assessment', title: 'Feasibility & Risk Assessment' },
          { id: 'stakeholder-management', title: 'Stakeholder Mapping & Management' },
          { id: 'requirements-elicitation', title: 'Requirements Elicitation Techniques' },
          { id: 'success-criteria-kpis', title: 'Success Criteria, OKRs & KPIs' },
          { id: 'poc-to-production-criteria', title: 'PoC-to-Production Criteria' },
          { id: 'user-research-discovery', title: 'User Research & Jobs-to-be-Done' },
        ],
      },
      {
        id: 'solution-architecture-process',
        title: 'Solution Architecture Process',
        summary: 'Architecture decisions, design reviews and reference blueprints.',
        level: 'advanced',
        children: [
          { id: 'architecture-decision-records', title: 'Architecture Decision Records (ADRs)' },
          { id: 'design-review-board', title: 'Design Review Board (DRB)' },
          { id: 'reference-architectures', title: 'Reference Architectures & Patterns Catalog' },
          { id: 'solution-blueprints', title: 'Solution Blueprints' },
          { id: 'non-functional-requirements', title: 'Non-Functional Requirements (NFRs)' },
          { id: 'capacity-planning', title: 'Capacity & Quota Planning' },
          { id: 'threat-modeling-process', title: 'Threat Modeling Process (STRIDE/MITRE)' },
          { id: 'tech-radar', title: 'Technology Radar Practice' },
        ],
      },
      {
        id: 'engineering-standards',
        title: 'Engineering Standards & Quality',
        summary: 'Coding standards, peer review, definition of done and quality gates.',
        level: 'intermediate',
        children: [
          { id: 'coding-standards-enterprise', title: 'Enterprise Coding Standards' },
          { id: 'prompt-engineering-standards', title: 'Prompt Engineering Standards' },
          { id: 'peer-review-process', title: 'Peer Review & Code Review Process' },
          { id: 'definition-of-done-enterprise', title: 'Definition of Done & Ready' },
          { id: 'quality-gates', title: 'Quality Gates & Build Promotion Rules' },
          { id: 'architectural-fitness-functions', title: 'Architectural Fitness Functions' },
          { id: 'dependency-policy', title: 'Dependency & License Policy' },
          { id: 'engineering-scorecards', title: 'Engineering Scorecards & Health Metrics' },
        ],
      },
      {
        id: 'developer-platform',
        title: 'Developer Platform & Paved Roads',
        summary: 'Internal developer platform, golden paths and shared SDKs for agent teams.',
        level: 'advanced',
        children: [
          { id: 'internal-developer-portal', title: 'Internal Developer Portal (IDP)' },
          { id: 'agent-starter-templates', title: 'Agent Starter Templates & Scaffolds' },
          { id: 'golden-paths', title: 'Golden Paths for Agent Teams' },
          { id: 'shared-libraries-sdks', title: 'Shared Libraries & Internal SDKs' },
          { id: 'self-service-tooling', title: 'Self-Service Tooling & Provisioning' },
          { id: 'inner-source-program', title: 'Inner-Source Program' },
          { id: 'developer-experience-metrics', title: 'Developer Experience (DevEx) Metrics' },
          { id: 'platform-as-product', title: 'Platform-as-a-Product Mindset' },
        ],
      },
      {
        id: 'procurement-sourcing',
        title: 'Vendor, Model & Tool Procurement',
        summary: 'Sourcing models, vendors and tools through enterprise procurement.',
        level: 'advanced',
        children: [
          { id: 'vendor-due-diligence', title: 'Vendor Due Diligence' },
          { id: 'model-evaluation-framework', title: 'Model Evaluation Framework' },
          { id: 'build-vs-buy', title: 'Build vs Buy vs Partner Analysis' },
          { id: 'multi-vendor-strategy', title: 'Multi-Vendor / Multi-Model Strategy' },
          { id: 'data-processing-agreements', title: 'Data Processing Agreements (DPAs)' },
          { id: 'contract-negotiation', title: 'Contract & SLA Negotiation' },
          { id: 'model-sourcing-policy', title: 'Model Sourcing & Usage Policy' },
          { id: 'tool-marketplace-governance', title: 'Tool Marketplace Governance' },
        ],
      },
      {
        id: 'enterprise-data-governance',
        title: 'Enterprise Data Governance',
        summary: 'Data classification, stewardship and governance for agent inputs/outputs.',
        level: 'advanced',
        children: [
          { id: 'data-classification', title: 'Data Classification & Sensitivity Tagging' },
          { id: 'data-residency-controls', title: 'Data Residency & Sovereignty Controls' },
          { id: 'data-lineage', title: 'Data Lineage & Provenance' },
          { id: 'data-stewardship', title: 'Data Stewardship & Ownership' },
          { id: 'data-quality-management', title: 'Data Quality Management' },
          { id: 'consent-management', title: 'Consent & Preference Management' },
          { id: 'master-data-management', title: 'Master & Reference Data Management' },
          { id: 'data-contracts', title: 'Data Contracts for Agent Inputs' },
        ],
      },
      {
        id: 'risk-compliance-program',
        title: 'Risk & Compliance Program',
        summary: 'Risk registers, model risk management and audit/certification programs.',
        level: 'advanced',
        children: [
          { id: 'enterprise-risk-register', title: 'Enterprise AI Risk Register' },
          { id: 'control-libraries', title: 'Control Libraries & Mappings' },
          { id: 'model-risk-management', title: 'Model Risk Management (MRM/SR 11-7)' },
          { id: 'third-party-risk-management', title: 'Third-Party Risk Management (TPRM)' },
          { id: 'audit-readiness', title: 'Audit Readiness & Evidence Collection' },
          { id: 'certifications-soc2-iso', title: 'SOC 2 / ISO 27001 / ISO 42001 Programs' },
          { id: 'regulatory-reporting', title: 'Regulatory Reporting & Disclosures' },
          { id: 'model-cards-datasheets', title: 'Model Cards, Datasheets & System Cards' },
          { id: 'algorithmic-impact-assessment', title: 'Algorithmic Impact Assessments' },
        ],
      },
      {
        id: 'enterprise-finops',
        title: 'Financial Management & FinOps',
        summary: 'Enterprise FinOps for agents: allocation, forecasting and unit economics.',
        level: 'advanced',
        children: [
          { id: 'cost-allocation-chargeback', title: 'Cost Allocation, Showback & Chargeback' },
          { id: 'budget-governance', title: 'Budget Governance & Guardrails' },
          { id: 'cost-forecasting', title: 'Cost Forecasting & Modeling' },
          { id: 'unit-economics-per-task', title: 'Unit Economics per Task / Conversation' },
          { id: 'rate-card-management', title: 'Internal Rate Card Management' },
          { id: 'commitments-discounts', title: 'Commitments, Reservations & Discounts' },
          { id: 'finops-reporting', title: 'FinOps Reporting & Reviews' },
        ],
      },
      {
        id: 'program-portfolio-management',
        title: 'Program & Portfolio Management',
        summary: 'Intake, prioritization and portfolio governance for AI initiatives.',
        level: 'intermediate',
        children: [
          { id: 'intake-prioritization', title: 'Demand Intake & Prioritization' },
          { id: 'okrs-roadmaps', title: 'OKRs & Roadmaps' },
          { id: 'dependency-mapping', title: 'Cross-Team Dependency Mapping' },
          { id: 'status-reporting', title: 'Status Reporting & Cadences' },
          { id: 'benefits-realization', title: 'Benefits Realization Tracking' },
          { id: 'portfolio-rebalancing', title: 'Portfolio Rebalancing & Stage Gates' },
          { id: 'agile-at-scale', title: 'Agile-at-Scale (SAFe / LeSS / Scrum@Scale)' },
        ],
      },
      {
        id: 'change-enablement',
        title: 'Change Enablement & Culture',
        summary: 'Organizational change, training and adoption of agentic AI.',
        level: 'intermediate',
        children: [
          { id: 'org-change-management', title: 'Organizational Change Management (OCM)' },
          { id: 'communications-strategy', title: 'Communications & Narrative Strategy' },
          { id: 'training-curricula', title: 'Training Curricula & Certifications' },
          { id: 'communities-of-practice', title: 'Communities of Practice (CoPs)' },
          { id: 'champions-network', title: 'AI Champions Network' },
          { id: 'adoption-metrics', title: 'Adoption & Stickiness Metrics' },
          { id: 'workforce-reskilling', title: 'Workforce Reskilling & Job Redesign' },
        ],
      },
      {
        id: 'legal-ethical-governance',
        title: 'Legal & Ethical Governance',
        summary: 'AI ethics, IP, liability and acceptable use governance.',
        level: 'advanced',
        children: [
          { id: 'ai-ethics-board', title: 'AI Ethics Board / Review Council' },
          { id: 'ip-and-licensing', title: 'IP, Copyright & Licensing for AI Outputs' },
          { id: 'liability-frameworks', title: 'Liability & Indemnity Frameworks' },
          { id: 'acceptable-use-policy', title: 'Acceptable Use Policy (AUP)' },
          { id: 'responsible-disclosure-policy', title: 'Responsible Disclosure & Vulnerability Policy' },
          { id: 'dpia-process', title: 'Data Protection Impact Assessment (DPIA)' },
          { id: 'open-source-governance', title: 'Open-Source Model & Code Governance' },
        ],
      },
    ],
  },
  {
    id: 'production-lifecycle',
    title: 'Production-Grade Application Lifecycle',
    summary: 'End-to-end delivery lifecycle for production-grade agentic applications.',
    tag: 'production-lifecycle',
    nodes: [
      {
        id: 'requirements-design-phase',
        title: 'Requirements & Design Phase',
        summary: 'Discovery, requirements, design and sign-off for new agent capabilities.',
        level: 'intermediate',
        children: [
          { id: 'discovery-workshops', title: 'Discovery Workshops & Event Storming' },
          { id: 'jobs-and-personas', title: 'Personas & Job Stories' },
          { id: 'journey-mapping', title: 'Journey Mapping & Service Blueprinting' },
          { id: 'prd-templates', title: 'PRDs, Spec & Brief Templates' },
          { id: 'lo-fi-prototyping', title: 'Lo-Fi Prototyping for Agent Flows' },
          { id: 'design-sign-off', title: 'Design Sign-Off & Acceptance' },
          { id: 'risk-impact-assessment', title: 'Risk & Impact Assessment for Features' },
        ],
      },
      {
        id: 'implementation-build-phase',
        title: 'Implementation & Build Phase',
        summary: 'Build discipline, branching, code ownership and refactoring practice.',
        level: 'intermediate',
        children: [
          { id: 'pairing-and-mobbing', title: 'Pairing, Mobbing & Ensemble Programming' },
          { id: 'trunk-based-development', title: 'Trunk-Based Development' },
          { id: 'branching-strategy', title: 'Branching Strategy & Release Branches' },
          { id: 'commit-conventions', title: 'Commit Conventions & Conventional Commits' },
          { id: 'code-ownership-codeowners', title: 'Code Ownership & CODEOWNERS' },
          { id: 'refactoring-discipline', title: 'Refactoring Discipline & Boy-Scout Rule' },
          { id: 'feature-toggling-build', title: 'Feature Toggling During Build' },
        ],
      },
      {
        id: 'testing-validation-phase',
        title: 'Testing & Validation Phase',
        summary: 'End-to-end test strategy, performance, security and acceptance testing.',
        level: 'intermediate',
        children: [
          { id: 'test-strategy-pyramid', title: 'Test Strategy & Pyramid for Agent Apps' },
          { id: 'contract-testing-process', title: 'Contract Testing Process (PACT/CDC)' },
          { id: 'performance-test-program', title: 'Performance & Load Test Program' },
          { id: 'security-test-program', title: 'Security Test Program (SAST/DAST/IAST)' },
          { id: 'accessibility-testing', title: 'Accessibility Testing Program' },
          { id: 'uat-process', title: 'User Acceptance Testing (UAT) Process' },
          { id: 'acceptance-criteria-bdd', title: 'Acceptance Criteria & BDD' },
          { id: 'eval-as-tests', title: 'Agent Evals as Tests in CI' },
        ],
      },
      {
        id: 'cicd-release-engineering',
        title: 'CI/CD & Release Engineering',
        summary: 'Pipelines, environment strategy, feature flags and supply-chain security.',
        level: 'advanced',
        children: [
          { id: 'cicd-pipeline-design', title: 'CI/CD Pipeline Design for Agents' },
          { id: 'build-promotion-stages', title: 'Build Promotion & Environment Stages' },
          { id: 'env-strategy-paths', title: 'Environment Strategy (Dev → Staging → Prod)' },
          { id: 'release-trains', title: 'Release Trains & Cadence' },
          { id: 'feature-flag-management', title: 'Feature Flag Management at Scale' },
          { id: 'secrets-management-process', title: 'Secrets Management Process' },
          { id: 'supply-chain-security-program', title: 'Supply-Chain Security (SLSA/SBOM)' },
          { id: 'artifact-versioning-strategy', title: 'Artifact & Prompt Versioning Strategy' },
        ],
      },
      {
        id: 'production-readiness',
        title: 'Production Readiness & Launch',
        summary: 'PRR, launch checklists, gradual rollout and rollback strategy.',
        level: 'advanced',
        children: [
          { id: 'production-readiness-review', title: 'Production Readiness Review (PRR)' },
          { id: 'launch-checklist', title: 'Launch Readiness Checklist' },
          { id: 'go-no-go-criteria', title: 'Go / No-Go Decision Criteria' },
          { id: 'dark-launches', title: 'Dark Launches & Shadow Mode' },
          { id: 'gradual-rollout-strategy', title: 'Gradual Rollout (Canary, Ringed, Blue-Green)' },
          { id: 'rollback-strategy', title: 'Rollback & Recovery Strategy' },
          { id: 'day-1-day-2-operations', title: 'Day-1 vs Day-2 Operations Plan' },
          { id: 'hypercare-period', title: 'Hypercare & Post-Launch Support' },
        ],
      },
      {
        id: 'operations-sre',
        title: 'Operations & SRE',
        summary: 'SLOs, error budgets, on-call programs and resilience engineering for agents.',
        level: 'advanced',
        children: [
          { id: 'sli-slo-sla-design', title: 'SLI/SLO/SLA Design for Agent Services' },
          { id: 'error-budget-policy', title: 'Error Budget Policy' },
          { id: 'on-call-program', title: 'On-Call Program & Schedules' },
          { id: 'escalation-paths', title: 'Escalation Paths & Severity Levels' },
          { id: 'capacity-management', title: 'Capacity & Demand Management' },
          { id: 'dr-bcp-planning', title: 'DR & Business Continuity Planning' },
          { id: 'chaos-engineering-program', title: 'Chaos Engineering Program' },
          { id: 'reliability-reviews', title: 'Reliability Reviews & Toil Audits' },
        ],
      },
      {
        id: 'observability-program',
        title: 'Observability Program',
        summary: 'Telemetry standards, dashboards, alerting policy and platform ownership.',
        level: 'advanced',
        children: [
          { id: 'telemetry-standards', title: 'Telemetry Standards & Conventions' },
          { id: 'golden-signals', title: 'Golden Signals for Agent Services' },
          { id: 'dashboards-as-code', title: 'Dashboards-as-Code' },
          { id: 'alerting-policy', title: 'Alerting Policy & Symptom-Based Alerts' },
          { id: 'log-management-policy', title: 'Log Management Policy' },
          { id: 'retention-and-sampling', title: 'Retention & Sampling Policy' },
          { id: 'observability-platform-ownership', title: 'Observability Platform Ownership' },
          { id: 'agent-trace-governance', title: 'Agent Trace & Conversation Governance' },
        ],
      },
      {
        id: 'incident-management-process',
        title: 'Incident Management Process',
        summary: 'Process for declaring, managing and learning from production incidents.',
        level: 'advanced',
        children: [
          { id: 'incident-classification', title: 'Incident Classification & Severity Matrix' },
          { id: 'incident-commander-role', title: 'Incident Commander Role & Roster' },
          { id: 'war-room-protocols', title: 'War Room & Bridge Call Protocols' },
          { id: 'status-page-comms', title: 'Status Page & Customer Communications' },
          { id: 'blameless-postmortems', title: 'Blameless Postmortem Process' },
          { id: 'action-item-tracking', title: 'Action Item Tracking & Closure' },
          { id: 'incident-metrics-mttx', title: 'Incident Metrics (MTTD/MTTA/MTTR)' },
          { id: 'major-incident-review', title: 'Major Incident Reviews' },
        ],
      },
      {
        id: 'support-maintenance',
        title: 'Support & Maintenance',
        summary: 'Tiered support, bug triage and ongoing maintenance programs.',
        level: 'intermediate',
        children: [
          { id: 'tiered-support-model', title: 'Tiered Support Model (L1/L2/L3)' },
          { id: 'bug-triage-process', title: 'Bug Triage & Backlog Hygiene' },
          { id: 'sla-management', title: 'SLA Management & Reporting' },
          { id: 'patch-management-cadence', title: 'Patch & Vulnerability Management Cadence' },
          { id: 'dependency-upgrade-program', title: 'Dependency Upgrade Program' },
          { id: 'decommissioning-sunsetting', title: 'Decommissioning & Sunsetting Process' },
          { id: 'knowledge-base-maintenance', title: 'Knowledge Base Maintenance' },
        ],
      },
      {
        id: 'continuous-improvement-program',
        title: 'Continuous Improvement & Evolution',
        summary: 'Feedback loops, technical debt management and evolutionary architecture practice.',
        level: 'advanced',
        children: [
          { id: 'feedback-loops-program', title: 'User & Operator Feedback Loops' },
          { id: 'post-launch-reviews', title: 'Post-Launch Reviews & Beta Graduations' },
          { id: 'technical-debt-management', title: 'Technical Debt Management Program' },
          { id: 'evolutionary-architecture-practice', title: 'Evolutionary Architecture Practice' },
          { id: 'version-deprecation-policy', title: 'Version Deprecation & Migration Policy' },
          { id: 'continuous-learning-loops', title: 'Continuous Learning Loops for Agents' },
          { id: 'retrospectives-cadence', title: 'Retrospectives & Improvement Cadence' },
        ],
      },
    ],
  },
]

function loadExistingTopicIds() {
  const ids = new Set()
  for (const d of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    ids.add(d.name)
  }
  return ids
}

function writeTopic(meta) {
  const dir = resolve(TOPICS_DIR, meta.id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
}

function applyAdditions() {
  const existing = loadExistingTopicIds()
  let written = 0
  let skipped = 0

  // Track next order per root across stages so multiple roots in the same
  // stage receive ascending order values, beginning high enough to follow
  // anything already present in the topics tree.
  let rootOrder = 1000

  for (const stage of STAGES) {
    stage.nodes.forEach((root) => {
      const tag = stage.tag
      const rootLevel = root.level ?? 'intermediate'
      if (existing.has(root.id)) {
        skipped += 1
      } else {
        writeTopic({
          id: root.id,
          title: root.title,
          summary: root.summary ?? root.title,
          order: rootOrder,
          level: rootLevel,
          tags: [tag],
        })
        existing.add(root.id)
        written += 1
      }
      rootOrder += 1

      ;(root.children ?? []).forEach((child, idx) => {
        const childId = `${root.id}--${child.id}`
        if (existing.has(childId)) {
          skipped += 1
          return
        }
        writeTopic({
          id: childId,
          title: child.title,
          order: idx + 1,
          level: child.level ?? rootLevel,
          tags: [tag],
          parentId: root.id,
        })
        existing.add(childId)
        written += 1
      })
    })
  }

  return { written, skipped }
}

function updateRoadmap() {
  const roadmap = JSON.parse(readFileSync(ROADMAP_FILE, 'utf8'))
  const existingStageIds = new Set(roadmap.stages.map((s) => s.id))

  for (const stage of STAGES) {
    if (existingStageIds.has(stage.id)) continue
    roadmap.stages.push({
      id: stage.id,
      title: stage.title,
      summary: stage.summary,
      nodes: stage.nodes.map((root) => ({
        id: root.id,
        title: root.title,
        topicId: root.id,
        status: 'core',
        description: root.summary ?? root.title,
      })),
    })
  }

  writeFileSync(ROADMAP_FILE, JSON.stringify(roadmap, null, 2) + '\n')
}

const result = applyAdditions()
updateRoadmap()

console.log(`enterprise/production additions: wrote ${result.written}, skipped ${result.skipped}.`)
