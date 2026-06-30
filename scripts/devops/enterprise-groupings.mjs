/**
 * Curated 3-level groupings for DevOps enterprise-delivery and production-lifecycle
 * roadmap topics. Leaf `id` values match slugs from scripts/devops/enterprise.mjs.
 */
export const ENTERPRISE_GROUPINGS = {
  'enterprise-devops-strategy': [
    {
      id: 'strategy-governance',
      title: 'Strategy & Operating Model',
      leaves: [
        'devops-center-of-excellence',
        'devops-operating-model',
        'executive-sponsorship',
        'devops-maturity-model',
      ],
    },
    {
      id: 'roadmap-portfolio',
      title: 'Roadmap & Portfolio',
      leaves: [
        'devops-strategy-roadmap',
        'devops-portfolio-strategy',
        'value-streams-mapping',
      ],
    },
  ],
  'discovery-requirements': [
    {
      id: 'discovery-readiness',
      title: 'Discovery & Capability Analysis',
      leaves: ['capability-discovery', 'feasibility-assessment'],
    },
    {
      id: 'requirements-definition',
      title: 'Requirements & Success Criteria',
      leaves: [
        'requirements-elicitation',
        'success-criteria-kpis',
        'stakeholder-management',
      ],
    },
    {
      id: 'business-case',
      title: 'Business Case & Cost Modeling',
      leaves: ['business-case-roi', 'tco-modeling'],
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
      leaves: ['coding-standards-enterprise', 'iac-coding-standards'],
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
      leaves: [
        'architectural-fitness-functions',
        'dependency-policy',
        'dora-metrics-program',
      ],
    },
  ],
  'developer-platform-program': [
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
        'platform-starter-templates',
        'golden-paths',
        'shared-platform-modules',
        'service-catalog-program',
      ],
    },
    {
      id: 'collaboration-devex',
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
      id: 'tooling-procurement',
      title: 'Tooling & Procurement',
      leaves: [
        'tool-rationalization',
        'build-vs-buy',
        'enterprise-agreement-management',
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
      leaves: [
        'telemetry-data-governance',
        'data-residency-controls',
      ],
    },
    {
      id: 'stewardship-quality',
      title: 'Stewardship & Pipeline Data',
      leaves: [
        'log-data-stewardship',
        'pipeline-data-quality',
        'audit-data-lifecycle',
      ],
    },
    {
      id: 'consent-preferences',
      title: 'Consent & Preferences',
      leaves: ['consent-management'],
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
      title: 'Allocation & Budget Governance',
      leaves: [
        'cost-allocation-chargeback',
        'budget-governance',
        'finops-reporting',
      ],
    },
    {
      id: 'forecasting-economics',
      title: 'Forecasting & Unit Economics',
      leaves: ['cost-forecasting', 'unit-economics'],
    },
    {
      id: 'optimization-licensing',
      title: 'Optimization & Licensing',
      leaves: ['pipeline-cost-optimization', 'tooling-license-management'],
    },
  ],
  'program-portfolio-management': [
    {
      id: 'planning-prioritization',
      title: 'Planning & Prioritization',
      leaves: [
        'intake-prioritization',
        'okrs-roadmaps',
        'portfolio-rebalancing',
      ],
    },
    {
      id: 'coordination-reporting',
      title: 'Coordination & Reporting',
      leaves: [
        'dependency-mapping',
        'status-reporting',
        'benefits-realization',
      ],
    },
    {
      id: 'agile-at-scale',
      title: 'Agile at Scale',
      leaves: ['agile-at-scale'],
    },
  ],
  'change-enablement': [
    {
      id: 'change-management',
      title: 'Change Management',
      leaves: [
        'org-change-management',
        'communications-strategy',
        'workforce-reskilling',
      ],
    },
    {
      id: 'learning-communities',
      title: 'Learning & Communities',
      leaves: [
        'training-curricula',
        'communities-of-practice',
        'devops-champions-network',
      ],
    },
    {
      id: 'adoption-topologies',
      title: 'Adoption & Team Topologies',
      leaves: ['adoption-metrics', 'team-topologies-program'],
    },
  ],
  'legal-ethical-governance': [
    {
      id: 'ip-licensing',
      title: 'IP, Licensing & Open Source',
      leaves: ['ip-and-licensing', 'open-source-governance'],
    },
    {
      id: 'legal-policies',
      title: 'Legal Policies & Disclosure',
      leaves: [
        'liability-frameworks',
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
        'trunk-based-development-enterprise',
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
      id: 'supply-chain-governance',
      title: 'Supply Chain & Governance',
      leaves: [
        'secrets-management-process',
        'supply-chain-security-program',
        'pipeline-governance',
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
  'incident-management-process': [
    {
      id: 'incident-response',
      title: 'Incident Response',
      leaves: [
        'incident-classification-program',
        'major-incident-program',
        'war-room-protocols',
        'status-page-comms-program',
      ],
    },
    {
      id: 'incident-metrics',
      title: 'Incident Metrics & Reviews',
      leaves: [
        'action-item-tracking',
        'incident-metrics-mttx',
        'major-incident-review',
      ],
    },
    {
      id: 'crisis-management',
      title: 'Crisis Management',
      leaves: ['crisis-management-process'],
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
  'support-maintenance-program': [
    {
      id: 'support-model',
      title: 'Support Model',
      leaves: ['tiered-support-model', 'sla-management', 'bug-triage-process'],
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
      id: 'lifecycle-sunsetting',
      title: 'Lifecycle & Sunsetting',
      leaves: ['decommissioning-sunsetting', 'knowledge-base-maintenance'],
    },
  ],
  'continuous-improvement-program': [
    {
      id: 'feedback-reviews',
      title: 'Feedback & Post-Launch Reviews',
      leaves: ['feedback-loops-program', 'post-launch-reviews'],
    },
    {
      id: 'technical-evolution',
      title: 'Technical Debt & Evolution',
      leaves: [
        'technical-debt-management',
        'evolutionary-architecture-practice',
        'version-deprecation-policy',
      ],
    },
    {
      id: 'improvement-cadence',
      title: 'Improvement Cadence',
      leaves: ['retrospectives-cadence', 'kaizen-events'],
    },
  ],
}
