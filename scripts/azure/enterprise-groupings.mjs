/**
 * Subtopic groupings for Azure enterprise & production-lifecycle roadmap topics.
 * Each entry maps a root topic id to subtopics; leaf `id` is the slug suffix
 * from the existing `${rootId}--${id}` flat subtopic folders (preserves titles).
 */
export const ENTERPRISE_GROUPINGS = {
  'enterprise-cloud-strategy': [
    {
      id: 'strategy-governance',
      title: 'Strategy & Governance',
      leaves: [
        'cloud-center-of-excellence',
        'cloud-operating-model',
        'executive-sponsorship',
        'caf-alignment',
      ],
    },
    {
      id: 'roadmap-portfolio',
      title: 'Roadmap & Portfolio',
      leaves: [
        'cloud-strategy-roadmap',
        'cloud-portfolio-strategy',
        'multi-cloud-strategy',
      ],
    },
    {
      id: 'maturity-capability',
      title: 'Maturity & Capability',
      leaves: ['cloud-maturity-model', 'value-streams-mapping'],
    },
  ],
  'discovery-requirements': [
    {
      id: 'discovery-research',
      title: 'Discovery & Readiness',
      leaves: ['workload-discovery', 'cloud-readiness-assessment'],
    },
    {
      id: 'requirements-definition',
      title: 'Requirements Definition',
      leaves: ['requirements-elicitation', 'success-criteria-kpis'],
    },
    {
      id: 'business-stakeholders',
      title: 'Business Case & Stakeholders',
      leaves: [
        'business-case-roi',
        'feasibility-assessment',
        'stakeholder-management',
        'tco-modeling',
      ],
    },
  ],
  'solution-architecture-process': [
    {
      id: 'architecture-decisions',
      title: 'Architecture Decisions & Reviews',
      leaves: [
        'architecture-decision-records',
        'design-review-board',
        'tech-radar',
        'architecture-review-cadence',
      ],
    },
    {
      id: 'blueprints-nfrs',
      title: 'Blueprints, NFRs & Capacity',
      leaves: [
        'reference-architectures',
        'solution-blueprints',
        'non-functional-requirements',
        'capacity-planning',
      ],
    },
    {
      id: 'security-architecture',
      title: 'Security Architecture',
      leaves: ['threat-modeling-process'],
    },
  ],
  'engineering-standards': [
    {
      id: 'standards-conventions',
      title: 'Standards & Conventions',
      leaves: ['iac-coding-standards', 'azure-naming-conventions'],
    },
    {
      id: 'review-quality',
      title: 'Review & Quality Gates',
      leaves: [
        'peer-review-process',
        'definition-of-done',
        'quality-gates',
        'engineering-scorecards',
      ],
    },
    {
      id: 'architecture-dependencies',
      title: 'Architecture & Dependencies',
      leaves: ['architectural-fitness-functions', 'dependency-policy'],
    },
  ],
  'developer-platform': [
    {
      id: 'platform-foundation',
      title: 'Platform Foundation',
      leaves: [
        'internal-developer-portal',
        'platform-as-product',
        'self-service-tooling',
      ],
    },
    {
      id: 'golden-paths-templates',
      title: 'Golden Paths & Templates',
      leaves: [
        'cloud-starter-templates',
        'golden-paths',
        'shared-iac-modules',
        'service-catalog-program',
      ],
    },
    {
      id: 'collaboration-metrics',
      title: 'Collaboration & DevEx',
      leaves: ['inner-source-program', 'developer-experience-metrics'],
    },
  ],
  'procurement-sourcing': [
    {
      id: 'vendor-partner',
      title: 'Vendor & Partner Management',
      leaves: ['vendor-due-diligence', 'msp-partner-management'],
    },
    {
      id: 'marketplace-procurement',
      title: 'Marketplace & Procurement',
      leaves: [
        'azure-marketplace-governance',
        'enterprise-agreement-management',
        'build-vs-buy',
      ],
    },
    {
      id: 'contracts-legal',
      title: 'Contracts & Data Agreements',
      leaves: ['data-processing-agreements', 'contract-sla-negotiation'],
    },
  ],
  'enterprise-data-governance': [
    {
      id: 'classification-residency',
      title: 'Classification & Residency',
      leaves: ['data-classification', 'data-residency-controls'],
    },
    {
      id: 'stewardship-quality',
      title: 'Stewardship & Quality',
      leaves: [
        'data-stewardship',
        'data-quality-management',
        'data-lineage',
        'master-data-management',
      ],
    },
    {
      id: 'contracts-consent',
      title: 'Contracts & Consent',
      leaves: ['data-contracts', 'consent-management'],
    },
  ],
  'risk-compliance-program': [
    {
      id: 'risk-management',
      title: 'Risk Management',
      leaves: [
        'enterprise-risk-register',
        'third-party-risk-management',
        'control-libraries',
      ],
    },
    {
      id: 'audit-certifications',
      title: 'Audit & Certifications',
      leaves: [
        'audit-readiness',
        'certifications-soc2-iso',
        'pci-hipaa-program',
      ],
    },
    {
      id: 'compliance-reporting',
      title: 'Compliance & Reporting',
      leaves: ['regulatory-reporting', 'continuous-compliance-program'],
    },
  ],
  'enterprise-finops-program': [
    {
      id: 'allocation-governance',
      title: 'Allocation & Governance',
      leaves: [
        'cost-allocation-chargeback',
        'budget-governance',
        'finops-personas-roles',
      ],
    },
    {
      id: 'forecasting-economics',
      title: 'Forecasting & Unit Economics',
      leaves: ['cost-forecasting', 'unit-economics', 'rate-card-management'],
    },
    {
      id: 'optimization-commitments',
      title: 'Commitments & Reporting',
      leaves: ['commitments-discounts', 'finops-reporting'],
    },
  ],
  'program-portfolio-management': [
    {
      id: 'intake-prioritization',
      title: 'Intake & Prioritization',
      leaves: ['intake-prioritization', 'portfolio-rebalancing'],
    },
    {
      id: 'planning-coordination',
      title: 'Planning & Coordination',
      leaves: [
        'okrs-roadmaps',
        'dependency-mapping',
        'status-reporting',
        'agile-at-scale',
      ],
    },
    {
      id: 'value-delivery',
      title: 'Value Delivery',
      leaves: ['benefits-realization'],
    },
  ],
  'change-enablement': [
    {
      id: 'change-management',
      title: 'Change Management',
      leaves: [
        'org-change-management',
        'communications-strategy',
        'adoption-metrics',
      ],
    },
    {
      id: 'learning-communities',
      title: 'Learning & Communities',
      leaves: [
        'training-curricula',
        'communities-of-practice',
        'cloud-champions-network',
      ],
    },
    {
      id: 'workforce-transformation',
      title: 'Workforce Transformation',
      leaves: ['workforce-reskilling'],
    },
  ],
  'legal-ethical-governance': [
    {
      id: 'ip-licensing',
      title: 'IP & Licensing',
      leaves: [
        'ip-and-licensing',
        'liability-frameworks',
        'open-source-governance',
      ],
    },
    {
      id: 'policies-disclosure',
      title: 'Policies & Disclosure',
      leaves: [
        'acceptable-use-policy',
        'responsible-disclosure-policy',
        'dpia-process',
      ],
    },
    {
      id: 'sustainability-governance',
      title: 'Sustainability Governance',
      leaves: ['sustainability-governance'],
    },
  ],
  'requirements-design-phase': [
    {
      id: 'discovery-workshops',
      title: 'Discovery Workshops',
      leaves: [
        'discovery-workshops',
        'jobs-and-personas',
        'journey-mapping',
      ],
    },
    {
      id: 'specifications-prototypes',
      title: 'Specifications & Prototypes',
      leaves: ['prd-templates', 'lo-fi-prototyping', 'design-sign-off'],
    },
    {
      id: 'design-validation',
      title: 'Design Validation',
      leaves: ['risk-impact-assessment'],
    },
  ],
  'implementation-build-phase': [
    {
      id: 'collaboration-practices',
      title: 'Collaboration Practices',
      leaves: ['pairing-and-mobbing', 'refactoring-discipline'],
    },
    {
      id: 'version-control',
      title: 'Version Control & Branching',
      leaves: [
        'trunk-based-development',
        'branching-strategy',
        'commit-conventions',
        'code-ownership-codeowners',
      ],
    },
    {
      id: 'build-practices',
      title: 'Build Practices',
      leaves: ['feature-toggling-build'],
    },
  ],
  'testing-validation-phase': [
    {
      id: 'test-strategy',
      title: 'Test Strategy',
      leaves: [
        'test-strategy-pyramid',
        'acceptance-criteria-bdd',
        'uat-process',
      ],
    },
    {
      id: 'automated-testing',
      title: 'Automated Testing Programs',
      leaves: [
        'iac-testing-program',
        'contract-testing-process',
        'compliance-test-program',
      ],
    },
    {
      id: 'nonfunctional-testing',
      title: 'Non-Functional Testing',
      leaves: [
        'performance-test-program',
        'security-test-program',
        'game-day-testing',
      ],
    },
  ],
  'cicd-release-engineering': [
    {
      id: 'pipeline-design',
      title: 'Pipeline Design',
      leaves: [
        'cicd-pipeline-design',
        'build-promotion-stages',
        'env-strategy-paths',
      ],
    },
    {
      id: 'release-management',
      title: 'Release Management',
      leaves: [
        'release-trains',
        'feature-flag-management',
        'artifact-versioning-strategy',
      ],
    },
    {
      id: 'supply-chain-security',
      title: 'Supply Chain & Security',
      leaves: [
        'secrets-management-process',
        'supply-chain-security-program',
      ],
    },
  ],
  'production-readiness': [
    {
      id: 'readiness-reviews',
      title: 'Readiness Reviews',
      leaves: [
        'production-readiness-review',
        'launch-checklist',
        'go-no-go-criteria',
      ],
    },
    {
      id: 'launch-rollout',
      title: 'Launch & Rollout',
      leaves: [
        'dark-launches',
        'gradual-rollout-strategy',
        'rollback-strategy-process',
      ],
    },
    {
      id: 'post-launch-operations',
      title: 'Post-Launch Operations',
      leaves: ['day-1-day-2-operations', 'hypercare-period'],
    },
  ],
  'operations-sre-program': [
    {
      id: 'slo-error-budgets',
      title: 'SLOs & Error Budgets',
      leaves: ['sli-slo-sla-design', 'error-budget-policy'],
    },
    {
      id: 'on-call-operations',
      title: 'On-Call & Operations',
      leaves: [
        'on-call-program',
        'escalation-paths',
        'capacity-management',
      ],
    },
    {
      id: 'resilience-reliability',
      title: 'Resilience & Reliability',
      leaves: [
        'dr-bcp-planning',
        'chaos-engineering-program',
        'reliability-reviews',
      ],
    },
  ],
  'observability-program': [
    {
      id: 'telemetry-standards',
      title: 'Telemetry Standards',
      leaves: [
        'telemetry-standards',
        'golden-signals',
        'cost-of-telemetry',
      ],
    },
    {
      id: 'dashboards-alerting',
      title: 'Dashboards & Alerting',
      leaves: ['dashboards-as-code', 'alerting-policy'],
    },
    {
      id: 'log-retention-ownership',
      title: 'Logs, Retention & Ownership',
      leaves: [
        'log-management-policy',
        'retention-and-sampling',
        'observability-platform-ownership',
      ],
    },
  ],
  'incident-management-process': [
    {
      id: 'incident-response',
      title: 'Incident Response',
      leaves: [
        'incident-classification',
        'incident-commander-role',
        'war-room-protocols',
        'status-page-comms',
      ],
    },
    {
      id: 'post-incident-learning',
      title: 'Post-Incident Learning',
      leaves: [
        'blameless-postmortems',
        'action-item-tracking',
        'major-incident-review',
      ],
    },
    {
      id: 'incident-metrics',
      title: 'Incident Metrics',
      leaves: ['incident-metrics-mttx'],
    },
  ],
  'support-maintenance-program': [
    {
      id: 'support-model',
      title: 'Support Model',
      leaves: [
        'tiered-support-model',
        'bug-triage-process',
        'sla-management',
        'knowledge-base-maintenance',
      ],
    },
    {
      id: 'maintenance-upgrades',
      title: 'Maintenance & Upgrades',
      leaves: [
        'patch-management-cadence',
        'dependency-upgrade-program',
        'service-version-policy',
      ],
    },
    {
      id: 'lifecycle-end',
      title: 'Application Lifecycle End',
      leaves: ['decommissioning-sunsetting'],
    },
  ],
  'continuous-improvement-program': [
    {
      id: 'feedback-reviews',
      title: 'Feedback & Reviews',
      leaves: [
        'feedback-loops-program',
        'post-launch-reviews',
        'retrospectives-cadence',
      ],
    },
    {
      id: 'architecture-evolution',
      title: 'Architecture Evolution',
      leaves: [
        'technical-debt-management',
        'evolutionary-architecture-practice',
        'version-deprecation-policy',
      ],
    },
    {
      id: 'waf-cadence',
      title: 'Well-Architected Reviews',
      leaves: ['waf-review-cadence'],
    },
  ],
}
