/**
 * Subtopic groupings for enterprise & production-lifecycle roadmap topics.
 * Each entry maps a root topic id to subtopics; leaf `id` is the slug suffix
 * from the existing `${rootId}--${id}` subtopic folders (preserves titles).
 */
export const ENTERPRISE_GROUPINGS = {
  'enterprise-frontend-strategy': [
    {
      id: 'strategy-governance',
      title: 'Strategy & Governance',
      leaves: [
        'frontend-center-of-excellence',
        'frontend-operating-model',
        'executive-sponsorship',
      ],
    },
    {
      id: 'roadmap-portfolio',
      title: 'Roadmap & Portfolio',
      leaves: [
        'frontend-roadmap-strategy',
        'frontend-portfolio-strategy',
      ],
    },
    {
      id: 'maturity-capability',
      title: 'Maturity & Capability',
      leaves: ['frontend-maturity-model', 'value-streams-mapping'],
    },
  ],
  'discovery-requirements': [
    {
      id: 'discovery-research',
      title: 'Discovery & Research',
      leaves: [
        'frontend-use-case-discovery',
        'user-research-discovery',
        'design-thinking-workshops',
      ],
    },
    {
      id: 'requirements-definition',
      title: 'Requirements Definition',
      leaves: [
        'requirements-elicitation',
        'success-criteria-kpis',
      ],
    },
    {
      id: 'business-stakeholders',
      title: 'Business Case & Stakeholders',
      leaves: [
        'business-case-roi',
        'feasibility-assessment',
        'stakeholder-management',
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
      ],
    },
    {
      id: 'blueprints-nfrs',
      title: 'Blueprints & NFRs',
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
      id: 'coding-standards',
      title: 'Coding Standards',
      leaves: [
        'angular-coding-standards',
        'eslint-config-standards',
        'cyclomatic-complexity-limits',
      ],
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
      ],
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
      id: 'golden-paths',
      title: 'Golden Paths & Templates',
      leaves: [
        'angular-starter-templates',
        'golden-paths',
        'shared-angular-libraries',
      ],
    },
    {
      id: 'design-system-collaboration',
      title: 'Design System & Collaboration',
      leaves: [
        'design-system-program',
        'inner-source-program',
        'developer-experience-metrics',
      ],
    },
  ],
  'enterprise-data-governance': [
    {
      id: 'data-classification',
      title: 'Data Classification & Residency',
      leaves: [
        'data-classification-frontend',
        'data-residency-controls',
        'data-retention-frontend',
      ],
    },
    {
      id: 'privacy-consent',
      title: 'Privacy & Consent',
      leaves: [
        'pii-handling-policies',
        'consent-management',
        'cookie-tracker-governance',
      ],
    },
    {
      id: 'telemetry-governance',
      title: 'Telemetry Governance',
      leaves: ['analytics-data-governance'],
    },
  ],
  'risk-compliance-program': [
    {
      id: 'risk-management',
      title: 'Risk Management',
      leaves: [
        'enterprise-risk-register',
        'control-libraries',
        'third-party-risk-management',
      ],
    },
    {
      id: 'audit-certifications',
      title: 'Audit & Certifications',
      leaves: [
        'audit-readiness',
        'certifications-soc2-iso',
        'regulatory-reporting',
      ],
    },
    {
      id: 'regulatory-compliance',
      title: 'Regulatory Compliance',
      leaves: [
        'wcag-compliance-program',
        'gdpr-ccpa-compliance',
      ],
    },
  ],
  'enterprise-finops': [
    {
      id: 'cost-governance',
      title: 'Cost Governance',
      leaves: [
        'cost-allocation-chargeback',
        'budget-governance',
        'cost-forecasting',
      ],
    },
    {
      id: 'optimization-reporting',
      title: 'Optimization & Reporting',
      leaves: [
        'cdn-cost-optimization',
        'tooling-license-management',
        'finops-reporting',
      ],
    },
  ],
  'program-portfolio-management': [
    {
      id: 'intake-prioritization',
      title: 'Intake & Prioritization',
      leaves: [
        'intake-prioritization',
        'portfolio-rebalancing',
      ],
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
        'angular-champions-network',
        'frontend-guild',
      ],
    },
  ],
  'legal-ethical-governance': [
    {
      id: 'ip-licensing',
      title: 'IP & Licensing',
      leaves: [
        'ip-and-licensing',
        'oss-contribution-policy',
        'liability-frameworks',
      ],
    },
    {
      id: 'policies-disclosure',
      title: 'Policies & Disclosure',
      leaves: [
        'acceptable-use-policy',
        'responsible-disclosure-policy',
        'dark-patterns-policy',
      ],
    },
    {
      id: 'privacy-impact',
      title: 'Privacy Impact',
      leaves: ['dpia-process'],
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
      leaves: [
        'prd-templates',
        'lo-fi-prototyping',
        'design-sign-off',
      ],
    },
    {
      id: 'design-validation',
      title: 'Design Validation',
      leaves: [
        'risk-impact-assessment',
        'accessibility-design-review',
      ],
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
        'contract-testing-process',
        'visual-regression-program',
        'mutation-testing-program',
      ],
    },
    {
      id: 'nonfunctional-testing',
      title: 'Non-Functional Testing',
      leaves: [
        'performance-test-program',
        'security-test-program',
        'accessibility-testing-program',
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
        'preview-environments',
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
        'rollback-strategy',
      ],
    },
    {
      id: 'post-launch-operations',
      title: 'Post-Launch Operations',
      leaves: ['day-1-day-2-operations', 'hypercare-period'],
    },
  ],
  'operations-sre-frontend': [
    {
      id: 'slo-error-budgets',
      title: 'SLOs & Error Budgets',
      leaves: [
        'sli-slo-sla-design',
        'error-budget-policy',
        'core-web-vitals-slos',
      ],
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
      id: 'telemetry-monitoring',
      title: 'Telemetry & Monitoring',
      leaves: [
        'telemetry-standards',
        'real-user-monitoring',
        'synthetic-monitoring',
        'frontend-error-tracking',
      ],
    },
    {
      id: 'dashboards-alerting',
      title: 'Dashboards & Alerting',
      leaves: [
        'dashboards-as-code',
        'alerting-policy',
      ],
    },
    {
      id: 'log-retention',
      title: 'Logs & Retention',
      leaves: ['log-management-policy', 'retention-and-sampling'],
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
  'support-maintenance': [
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
        'browser-support-policy',
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
      id: 'experimentation',
      title: 'Experimentation',
      leaves: ['experimentation-program'],
    },
  ],
}
