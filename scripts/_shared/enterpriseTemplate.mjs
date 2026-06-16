/**
 * Build a default pair of "Enterprise Development & Enablement" and
 * "Production-Grade Application Lifecycle" stages for a subject, with
 * subject-flavored framing applied to the root topic titles/summaries.
 *
 * Callers can pass `roots` to override or extend the default roots per stage.
 * Top-level (root) topic IDs are kept unique enough not to collide with
 * common existing subject topics (e.g. `enterprise-strategy`, `finops`).
 *
 * @param {object} opts
 * @param {string} opts.subjectName      Display name, e.g. "Python".
 * @param {string} opts.subjectNoun      Short noun, e.g. "Python apps", "Spring services".
 * @param {string} [opts.platformNoun]   Platform noun, e.g. "cloud workloads"; defaults to subjectNoun.
 * @param {string} [opts.strategyId]     Override the strategy root id (defaults to `enterprise-${slug}-strategy`).
 * @param {object} [opts.overrides]      `{ [rootId]: { titleOverride?, summary? } }`.
 */
export function buildDefaultStages({ subjectName, subjectNoun, platformNoun = subjectNoun, strategyId, overrides = {} }) {
  const slug = subjectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const stratId = strategyId ?? `enterprise-${slug}-strategy`

  const applyOverride = (root) => {
    const o = overrides[root.id]
    if (!o) return root
    return { ...root, title: o.titleOverride ?? root.title, summary: o.summary ?? root.summary }
  }

  const enterpriseNodes = [
    {
      id: stratId,
      title: `Enterprise ${subjectName} Strategy & Operating Model`,
      summary: `Strategy, operating model and ${subjectName} center of excellence.`,
      level: 'advanced',
      children: [
        { id: `${slug}-center-of-excellence`, title: `${subjectName} Center of Excellence (CoE)` },
        { id: `${slug}-operating-model`, title: `${subjectName} Target Operating Model` },
        { id: `${slug}-strategy-roadmap`, title: `${subjectName} Strategy & Roadmap` },
        { id: `${slug}-portfolio-strategy`, title: `${subjectName} Portfolio Strategy` },
        { id: 'executive-sponsorship', title: 'Executive Sponsorship & Steering' },
        { id: `${slug}-maturity-model`, title: `${subjectName} Maturity Model & Assessment` },
        { id: 'value-streams-mapping', title: 'Value Streams & Capability Mapping' },
      ],
    },
    {
      id: 'discovery-requirements',
      title: 'Discovery & Requirements Engineering',
      summary: `Use case discovery, business case and requirements engineering for ${subjectNoun}.`,
      level: 'intermediate',
      children: [
        { id: 'use-case-discovery', title: 'Use Case Discovery & Ideation' },
        { id: 'business-case-roi', title: 'Business Case & ROI Modeling' },
        { id: 'feasibility-assessment', title: 'Feasibility & Risk Assessment' },
        { id: 'stakeholder-management', title: 'Stakeholder Mapping & Management' },
        { id: 'requirements-elicitation', title: 'Requirements Elicitation Techniques' },
        { id: 'success-criteria-kpis', title: 'Success Criteria, OKRs & KPIs' },
        { id: 'user-research-discovery', title: 'User Research & Jobs-to-be-Done' },
        { id: 'poc-to-production-criteria', title: 'PoC-to-Production Criteria' },
      ],
    },
    {
      id: 'solution-architecture-process',
      title: 'Solution Architecture Process',
      summary: `Architecture decisions, design reviews and reference blueprints for ${subjectNoun}.`,
      level: 'advanced',
      children: [
        { id: 'architecture-decision-records', title: 'Architecture Decision Records (ADRs)' },
        { id: 'design-review-board', title: 'Design Review Board (DRB)' },
        { id: 'reference-architectures', title: 'Reference Architectures Catalog' },
        { id: 'solution-blueprints', title: 'Solution Blueprints' },
        { id: 'non-functional-requirements', title: 'Non-Functional Requirements (NFRs)' },
        { id: 'capacity-planning', title: 'Capacity & Quota Planning' },
        { id: 'threat-modeling-process', title: 'Threat Modeling Process (STRIDE)' },
        { id: 'tech-radar', title: 'Technology Radar Practice' },
        { id: 'architecture-review-cadence', title: 'Architecture Review Cadence' },
      ],
    },
    {
      id: 'engineering-standards',
      title: 'Engineering Standards & Quality',
      summary: 'Coding standards, peer review, definition of done and quality gates.',
      level: 'intermediate',
      children: [
        { id: 'coding-standards-enterprise', title: 'Enterprise Coding Standards' },
        { id: `${slug}-style-guide`, title: `${subjectName} Style Guide & Linting` },
        { id: 'peer-review-process', title: 'Peer Review & Code Review Process' },
        { id: 'definition-of-done', title: 'Definition of Done & Ready' },
        { id: 'quality-gates', title: 'Quality Gates & Build Promotion Rules' },
        { id: 'architectural-fitness-functions', title: 'Architectural Fitness Functions' },
        { id: 'dependency-policy', title: 'Dependency & License Policy' },
        { id: 'engineering-scorecards', title: 'Engineering Scorecards & Health Metrics' },
      ],
    },
    {
      id: 'developer-platform-program',
      title: 'Developer Platform & Paved Roads',
      summary: `Internal developer platform, golden paths and shared SDKs for ${subjectNoun} teams.`,
      level: 'advanced',
      children: [
        { id: 'internal-developer-portal', title: 'Internal Developer Portal (IDP)' },
        { id: `${slug}-starter-templates`, title: `${subjectName} Starter Templates & Scaffolds` },
        { id: 'golden-paths', title: `Golden Paths for ${subjectName} Teams` },
        { id: `shared-${slug}-libraries`, title: `Shared ${subjectName} Libraries & SDKs` },
        { id: 'service-catalog-program', title: 'Service Catalog Program' },
        { id: 'self-service-tooling', title: 'Self-Service Tooling & Provisioning' },
        { id: 'inner-source-program', title: 'Inner-Source Program' },
        { id: 'developer-experience-metrics', title: 'Developer Experience (DevEx) Metrics' },
        { id: 'platform-as-product', title: 'Platform-as-a-Product Mindset' },
      ],
    },
    {
      id: 'procurement-sourcing',
      title: 'Vendor, Tool & Procurement',
      summary: `Sourcing SaaS, partners and tooling for ${subjectNoun} through enterprise procurement.`,
      level: 'advanced',
      children: [
        { id: 'vendor-due-diligence', title: 'Vendor Due Diligence' },
        { id: 'tool-rationalization', title: 'Tool Rationalization & Consolidation' },
        { id: 'build-vs-buy', title: 'Build vs Buy vs Partner Analysis' },
        { id: 'enterprise-agreement-management', title: 'Enterprise Agreement Management' },
        { id: 'data-processing-agreements', title: 'Data Processing Agreements (DPAs)' },
        { id: 'contract-sla-negotiation', title: 'Contract & SLA Negotiation' },
        { id: 'msp-partner-management', title: 'MSP / Partner Management' },
      ],
    },
    {
      id: 'enterprise-data-governance',
      title: 'Enterprise Data Governance',
      summary: `Data classification, residency and stewardship for ${subjectNoun}.`,
      level: 'advanced',
      children: [
        { id: 'data-classification-program', title: 'Data Classification & Sensitivity Tagging' },
        { id: 'data-residency-controls', title: 'Data Residency & Sovereignty Controls' },
        { id: 'data-lineage', title: 'Data Lineage & Provenance' },
        { id: 'data-stewardship', title: 'Data Stewardship & Ownership' },
        { id: 'data-quality-management', title: 'Data Quality Management' },
        { id: 'consent-management', title: 'Consent & Preference Management' },
        { id: 'master-data-management', title: 'Master & Reference Data Management' },
        { id: 'data-contracts', title: 'Data Contracts & Producer-Consumer SLAs' },
      ],
    },
    {
      id: 'risk-compliance-program',
      title: 'Enterprise Risk & Compliance Program',
      summary: `Risk registers, audit readiness and certification programs for ${subjectNoun}.`,
      level: 'advanced',
      children: [
        { id: 'enterprise-risk-register', title: 'Enterprise Risk Register' },
        { id: 'control-libraries', title: 'Control Libraries & Mappings (NIST/ISO/CIS)' },
        { id: 'third-party-risk-management', title: 'Third-Party Risk Management (TPRM)' },
        { id: 'audit-readiness', title: 'Audit Readiness & Evidence Collection' },
        { id: 'certifications-soc2-iso', title: 'SOC 2 / ISO 27001 / FedRAMP Programs' },
        { id: 'pci-hipaa-program', title: 'PCI-DSS / HIPAA / GDPR Program' },
        { id: 'regulatory-reporting', title: 'Regulatory Reporting & Disclosures' },
        { id: 'continuous-compliance-program', title: 'Continuous Compliance Program' },
      ],
    },
    {
      id: 'enterprise-finops-program',
      title: 'Enterprise FinOps Program',
      summary: `FinOps program for ${subjectNoun}: allocation, forecasting and unit economics.`,
      level: 'advanced',
      children: [
        { id: 'cost-allocation-chargeback', title: 'Cost Allocation, Showback & Chargeback' },
        { id: 'budget-governance', title: 'Budget Governance & Guardrails' },
        { id: 'cost-forecasting', title: 'Cost Forecasting & Modeling' },
        { id: 'unit-economics', title: 'Unit Economics per Workload / Customer' },
        { id: 'rate-card-management', title: 'Internal Rate Card Management' },
        { id: 'tooling-license-management', title: 'Tooling & License Management' },
        { id: 'finops-reporting', title: 'FinOps Reporting & Reviews' },
      ],
    },
    {
      id: 'program-portfolio-management',
      title: 'Program & Portfolio Management',
      summary: `Intake, prioritization and portfolio governance for ${subjectNoun}.`,
      level: 'intermediate',
      children: [
        { id: 'intake-prioritization', title: 'Demand Intake & Prioritization' },
        { id: 'okrs-roadmaps', title: 'OKRs & Roadmaps' },
        { id: 'dependency-mapping', title: 'Cross-Team Dependency Mapping' },
        { id: 'status-reporting', title: 'Status Reporting & Cadences' },
        { id: 'benefits-realization', title: 'Benefits Realization Tracking' },
        { id: 'agile-at-scale', title: 'Agile-at-Scale (SAFe / LeSS / Scrum@Scale)' },
        { id: 'portfolio-rebalancing', title: 'Portfolio Rebalancing & Stage Gates' },
      ],
    },
    {
      id: 'change-enablement',
      title: 'Change Enablement & Culture',
      summary: `Organizational change, training and adoption of ${subjectName} practices.`,
      level: 'intermediate',
      children: [
        { id: 'org-change-management', title: 'Organizational Change Management (OCM)' },
        { id: 'communications-strategy', title: 'Communications & Narrative Strategy' },
        { id: 'training-curricula', title: 'Training Curricula & Certifications' },
        { id: 'communities-of-practice', title: 'Communities of Practice (CoPs)' },
        { id: `${slug}-champions-network`, title: `${subjectName} Champions Network` },
        { id: 'adoption-metrics', title: 'Adoption & Stickiness Metrics' },
        { id: 'workforce-reskilling', title: 'Workforce Reskilling & Job Redesign' },
      ],
    },
    {
      id: 'legal-ethical-governance',
      title: 'Legal & Ethical Governance',
      summary: `IP, licensing, acceptable use and ethical governance for ${subjectNoun}.`,
      level: 'advanced',
      children: [
        { id: 'ip-and-licensing', title: 'IP, Copyright & OSS Licensing' },
        { id: 'liability-frameworks', title: 'Liability & Indemnity Frameworks' },
        { id: 'acceptable-use-policy', title: 'Acceptable Use Policy (AUP)' },
        { id: 'responsible-disclosure-policy', title: 'Responsible Disclosure & VDP' },
        { id: 'dpia-process', title: 'Data Protection Impact Assessment (DPIA)' },
        { id: 'open-source-governance', title: 'Open-Source Use & Contribution Governance' },
        { id: 'sustainability-governance', title: 'Sustainability & Carbon Governance' },
      ],
    },
  ].map(applyOverride)

  const productionNodes = [
    {
      id: 'requirements-design-phase',
      title: 'Requirements & Design Phase',
      summary: `Discovery, requirements, design and sign-off for new ${subjectNoun} features.`,
      level: 'intermediate',
      children: [
        { id: 'discovery-workshops', title: 'Discovery Workshops & Event Storming' },
        { id: 'jobs-and-personas', title: 'Personas & Job Stories' },
        { id: 'journey-mapping', title: 'Journey Mapping & Service Blueprinting' },
        { id: 'prd-templates', title: 'PRDs, Spec & Brief Templates' },
        { id: 'lo-fi-prototyping', title: 'Lo-Fi Prototyping' },
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
        { id: 'trunk-based-development-practice', title: 'Trunk-Based Development Practice' },
        { id: 'branching-strategy', title: 'Branching Strategy & Release Branches' },
        { id: 'commit-conventions', title: 'Commit Conventions & Conventional Commits' },
        { id: 'code-ownership-codeowners', title: 'Code Ownership & CODEOWNERS' },
        { id: 'refactoring-discipline', title: 'Refactoring Discipline' },
        { id: 'feature-toggling-build', title: 'Feature Toggling During Build' },
      ],
    },
    {
      id: 'testing-validation-phase',
      title: 'Testing & Validation Phase',
      summary: 'End-to-end test strategy, performance, security and acceptance programs.',
      level: 'intermediate',
      children: [
        { id: 'test-strategy-pyramid', title: `Test Strategy & Pyramid for ${subjectNoun}` },
        { id: 'contract-testing-process', title: 'Contract Testing Process (PACT/CDC)' },
        { id: 'performance-test-program', title: 'Performance & Load Test Program' },
        { id: 'security-test-program', title: 'Security Test Program (SAST/DAST/IAST)' },
        { id: 'accessibility-testing-program', title: 'Accessibility Testing Program' },
        { id: 'uat-process', title: 'User Acceptance Testing (UAT) Process' },
        { id: 'acceptance-criteria-bdd', title: 'Acceptance Criteria & BDD' },
        { id: 'mutation-testing-program', title: 'Mutation Testing Program' },
      ],
    },
    {
      id: 'cicd-release-engineering',
      title: 'CI/CD & Release Engineering',
      summary: 'Pipelines, environment strategy, feature flags and supply-chain security.',
      level: 'advanced',
      children: [
        { id: 'cicd-pipeline-design', title: `CI/CD Pipeline Design for ${subjectNoun}` },
        { id: 'build-promotion-stages', title: 'Build Promotion & Environment Stages' },
        { id: 'env-strategy-paths', title: 'Environment Strategy (Dev → Staging → Prod)' },
        { id: 'release-trains', title: 'Release Trains & Cadence' },
        { id: 'feature-flag-management', title: 'Feature Flag Management at Scale' },
        { id: 'secrets-management-process', title: 'Secrets Management Process' },
        { id: 'supply-chain-security-program', title: 'Supply-Chain Security (SLSA/SBOM)' },
        { id: 'artifact-versioning-strategy', title: 'Artifact & Image Versioning Strategy' },
        { id: 'preview-environments', title: 'Preview / PR Environments' },
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
        { id: 'rollback-strategy-process', title: 'Rollback & Recovery Strategy' },
        { id: 'day-1-day-2-operations', title: 'Day-1 vs Day-2 Operations Plan' },
        { id: 'hypercare-period', title: 'Hypercare & Post-Launch Support' },
      ],
    },
    {
      id: 'operations-sre-program',
      title: 'Operations & SRE Program',
      summary: `SLOs, error budgets, on-call programs and resilience for ${subjectNoun}.`,
      level: 'advanced',
      children: [
        { id: 'sli-slo-sla-design', title: `SLI/SLO/SLA Design for ${subjectNoun}` },
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
        { id: 'golden-signals', title: `Golden Signals for ${subjectNoun}` },
        { id: 'dashboards-as-code', title: 'Dashboards-as-Code' },
        { id: 'alerting-policy', title: 'Alerting Policy & Symptom-Based Alerts' },
        { id: 'log-management-policy', title: 'Log Management Policy' },
        { id: 'retention-and-sampling', title: 'Retention & Sampling Policy' },
        { id: 'observability-platform-ownership', title: 'Observability Platform Ownership' },
        { id: 'cost-of-telemetry', title: 'Cost of Telemetry & Optimization' },
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
      id: 'support-maintenance-program',
      title: 'Support & Maintenance Program',
      summary: 'Tiered support, bug triage and ongoing maintenance programs.',
      level: 'intermediate',
      children: [
        { id: 'tiered-support-model', title: 'Tiered Support Model (L1/L2/L3)' },
        { id: 'bug-triage-process', title: 'Bug Triage & Backlog Hygiene' },
        { id: 'sla-management', title: 'SLA Management & Reporting' },
        { id: 'patch-management-cadence', title: 'Patch & Vulnerability Management Cadence' },
        { id: 'dependency-upgrade-program', title: 'Dependency Upgrade Program' },
        { id: 'runtime-version-policy', title: `${subjectName} Runtime / Version Policy` },
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
        { id: 'retrospectives-cadence', title: 'Retrospectives & Improvement Cadence' },
        { id: 'experimentation-program', title: 'A/B Experimentation Program' },
      ],
    },
  ].map(applyOverride)

  return [
    {
      id: 'enterprise-delivery',
      title: 'Enterprise Development & Enablement',
      summary: `Strategy, governance, platform and enablement for delivering ${platformNoun} at enterprise scale.`,
      tag: 'enterprise-delivery',
      nodes: enterpriseNodes,
    },
    {
      id: 'production-lifecycle',
      title: 'Production-Grade Application Lifecycle',
      summary: `End-to-end delivery lifecycle for production-grade ${platformNoun}.`,
      tag: 'production-lifecycle',
      nodes: productionNodes,
    },
  ]
}
