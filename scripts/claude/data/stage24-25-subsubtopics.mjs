/** Sub-subtopic attachments for attachSubSubtopics() — Stages 17, 24, 25 (Claude). */

export const STAGE17_ANDROID = [
  {
    parentId: 'retrofit-okhttp-streaming-claude-api-android',
    children: [
      { id: 'okhttp-sse-interceptor-claude', title: 'OkHttp SSE Interceptors for Claude Streams' },
      { id: 'retrofit-suspend-messages-api', title: 'Retrofit Suspend Adapters for Messages API' },
      { id: 'compose-streaming-token-collector', title: 'Collecting Streamed Tokens in Jetpack Compose' },
    ],
  },
  {
    parentId: 'coroutines-flow-claude-async-streaming-responses',
    children: [
      { id: 'flow-collector-claude-deltas', title: 'Flow Collectors for Claude Streaming Deltas' },
      { id: 'channel-vs-flow-backpressure', title: 'Channels vs Flow Backpressure for Claude Streams' },
      { id: 'structured-concurrency-cancellation', title: 'Structured Concurrency for Cancellable Claude Calls' },
    ],
  },
  {
    parentId: 'android-keystore-api-key-storage',
    children: [
      { id: 'encrypted-prefs-vs-keystore', title: 'EncryptedSharedPreferences vs Android Keystore' },
      { id: 'biometric-gated-key-retrieval', title: 'Biometric-Gated Claude API Key Retrieval' },
      { id: 'key-rotation-secure-provisioning', title: 'Key Rotation and Secure Provisioning Patterns' },
    ],
  },
  {
    parentId: 'ml-kit-claude-on-device-cloud-hybrid-ai-patterns',
    children: [
      { id: 'on-device-nlu-claude-fallback', title: 'On-Device NLU with Claude Cloud Fallback' },
      { id: 'mlkit-vision-claude-reasoning', title: 'ML Kit Vision + Claude Reasoning Pipelines' },
      { id: 'offline-queue-cloud-sync', title: 'Offline Queues and Cloud Sync for Hybrid AI' },
    ],
  },
]

/** @type {Array<{ parentId: string, children: Array<{ id: string, title: string }> }>} */
export const STAGE24_ENTERPRISE = [
  // enterprise-claude-strategy (7)
  {
    parentId: 'enterprise-claude-strategy--claude-center-of-excellence',
    children: [
      { id: 'coe-charter-governance', title: 'CoE Charter, Mandate and Governance Model' },
      { id: 'coe-service-catalog', title: 'CoE Service Catalog for Claude Teams' },
      { id: 'coe-operating-cadence', title: 'CoE Operating Cadence and Intake Process' },
    ],
  },
  {
    parentId: 'enterprise-claude-strategy--claude-operating-model',
    children: [
      { id: 'target-state-org-design', title: 'Target-State Org Design for Claude Delivery' },
      { id: 'roles-raci-claude-programs', title: 'Roles, RACI and Decision Rights for Claude Programs' },
      { id: 'hub-spoke-federated-models', title: 'Hub-and-Spoke vs Federated Claude Operating Models' },
    ],
  },
  {
    parentId: 'enterprise-claude-strategy--claude-strategy-roadmap',
    children: [
      { id: 'adoption-phases-milestones', title: 'Adoption Phases and Milestone Planning' },
      { id: 'investment-thesis-funding', title: 'Investment Thesis and Funding Case for Claude' },
      { id: 'roadmap-dependency-sequencing', title: 'Roadmap Dependency Sequencing and Horizon Planning' },
    ],
  },
  {
    parentId: 'enterprise-claude-strategy--claude-portfolio-strategy',
    children: [
      { id: 'use-case-segmentation', title: 'Use-Case Segmentation and Portfolio Tiers' },
      { id: 'build-buy-partner-matrix', title: 'Build-Buy-Partner Matrix for Claude Initiatives' },
      { id: 'portfolio-kill-criteria', title: 'Portfolio Kill Criteria and Sunset Rules' },
    ],
  },
  {
    parentId: 'enterprise-claude-strategy--executive-sponsorship',
    children: [
      { id: 'steering-committee-structure', title: 'Executive Steering Committee Structure' },
      { id: 'sponsor-accountability-model', title: 'Executive Sponsor Accountability Model' },
      { id: 'escalation-executive-comms', title: 'Executive Escalation and Board Reporting' },
    ],
  },
  {
    parentId: 'enterprise-claude-strategy--claude-maturity-model',
    children: [
      { id: 'maturity-dimensions-assessment', title: 'Maturity Dimensions and Assessment Rubric' },
      { id: 'baseline-current-state-audit', title: 'Baseline Current-State Maturity Audit' },
      { id: 'capability-gap-closure-plans', title: 'Capability Gap Closure and Progression Plans' },
    ],
  },
  {
    parentId: 'enterprise-claude-strategy--value-streams-mapping',
    children: [
      { id: 'value-stream-identification', title: 'Identifying Claude-Impacted Value Streams' },
      { id: 'capability-heat-mapping', title: 'Capability Heat Mapping Across Business Units' },
      { id: 'outcome-metrics-by-stream', title: 'Outcome Metrics Linked to Value Streams' },
    ],
  },
  // discovery-requirements (7)
  {
    parentId: 'discovery-requirements--use-case-discovery',
    children: [
      { id: 'ideation-workshops-claude', title: 'Ideation Workshops for Claude Use Cases' },
      { id: 'opportunity-backlog-scoring', title: 'Opportunity Backlog Scoring and Prioritization' },
      { id: 'agentic-vs-assistive-triage', title: 'Agentic vs Assistive Use-Case Triage' },
    ],
  },
  {
    parentId: 'discovery-requirements--business-case-roi',
    children: [
      { id: 'roi-models-claude-workloads', title: 'ROI Models for Claude Workloads and Agents' },
      { id: 'cost-benefit-scenario-planning', title: 'Cost-Benefit Scenario Planning with Token Economics' },
      { id: 'value-realization-assumptions', title: 'Value Realization Assumptions and Sensitivity Analysis' },
    ],
  },
  {
    parentId: 'discovery-requirements--feasibility-assessment',
    children: [
      { id: 'technical-feasibility-claude', title: 'Technical Feasibility for Claude Integration Patterns' },
      { id: 'data-readiness-assessment', title: 'Data Readiness and Grounding Feasibility Assessment' },
      { id: 'risk-feasibility-gates', title: 'Risk-Based Feasibility Gates Before Funding' },
    ],
  },
  {
    parentId: 'discovery-requirements--stakeholder-management',
    children: [
      { id: 'stakeholder-mapping-influence', title: 'Stakeholder Mapping and Influence Strategies' },
      { id: 'change-champion-identification', title: 'Change Champion Identification and Engagement' },
      { id: 'conflict-resolution-governance', title: 'Conflict Resolution Across Claude Stakeholders' },
    ],
  },
  {
    parentId: 'discovery-requirements--requirements-elicitation',
    children: [
      { id: 'conversational-requirements-elicitation', title: 'Eliciting Requirements for Conversational Experiences' },
      { id: 'prompt-behavior-specification', title: 'Prompt and Behavior Specification Techniques' },
      { id: 'nonfunctional-requirements-claude', title: 'Non-Functional Requirements for Claude Features' },
    ],
  },
  {
    parentId: 'discovery-requirements--success-criteria-kpis',
    children: [
      { id: 'outcome-vs-output-metrics', title: 'Outcome vs Output Metrics for Claude Products' },
      { id: 'eval-linked-success-criteria', title: 'Eval-Linked Success Criteria and Quality Bars' },
      { id: 'north-star-kpi-definition', title: 'North-Star KPI Definition and Tracking Plan' },
    ],
  },
  {
    parentId: 'discovery-requirements--poc-to-production-criteria',
    children: [
      { id: 'poc-exit-criteria-checklist', title: 'PoC Exit Criteria and Production Readiness Checklist' },
      { id: 'scale-readiness-assessment', title: 'Scale Readiness Assessment for Claude Apps' },
      { id: 'operational-handoff-requirements', title: 'Operational Handoff Requirements from PoC Teams' },
    ],
  },
  // solution-architecture-process (8)
  {
    parentId: 'solution-architecture-process--architecture-decision-records',
    children: [
      { id: 'adr-templates-claude-decisions', title: 'ADR Templates for Claude Architecture Decisions' },
      { id: 'model-routing-adr-patterns', title: 'Model Routing and Fallback ADR Patterns' },
      { id: 'adr-review-lifecycle', title: 'ADR Review, Approval and Deprecation Lifecycle' },
    ],
  },
  {
    parentId: 'solution-architecture-process--design-review-board',
    children: [
      { id: 'drb-charter-membership', title: 'Design Review Board Charter and Membership' },
      { id: 'review-gates-claude-systems', title: 'Review Gates for Claude System Designs' },
      { id: 'exception-waiver-process', title: 'Architecture Exception and Waiver Process' },
    ],
  },
  {
    parentId: 'solution-architecture-process--reference-architectures',
    children: [
      { id: 'rag-reference-architecture', title: 'RAG Reference Architecture for Enterprise Claude' },
      { id: 'agent-orchestration-patterns', title: 'Agent Orchestration Reference Patterns' },
      { id: 'human-in-the-loop-architecture', title: 'Human-in-the-Loop Reference Architecture' },
    ],
  },
  {
    parentId: 'solution-architecture-process--solution-blueprints',
    children: [
      { id: 'blueprint-components-catalog', title: 'Solution Blueprint Components and Catalog' },
      { id: 'deployment-topology-templates', title: 'Deployment Topology Templates for Claude Apps' },
      { id: 'integration-interface-standards', title: 'Integration Interface Standards in Blueprints' },
    ],
  },
  {
    parentId: 'solution-architecture-process--non-functional-requirements',
    children: [
      { id: 'latency-throughput-nfrs', title: 'Latency and Throughput NFRs for Claude Services' },
      { id: 'reliability-availability-nfrs', title: 'Reliability and Availability NFRs for AI Workloads' },
      { id: 'security-privacy-nfrs', title: 'Security and Privacy NFRs for Claude Data Flows' },
    ],
  },
  {
    parentId: 'solution-architecture-process--capacity-quota-planning',
    children: [
      { id: 'token-quota-forecasting', title: 'Token Quota Forecasting and Allocation Models' },
      { id: 'rate-limit-capacity-planning', title: 'Rate-Limit and API Capacity Planning' },
      { id: 'burst-scaling-strategies', title: 'Burst Scaling Strategies for Claude Traffic' },
    ],
  },
  {
    parentId: 'solution-architecture-process--threat-modeling-process',
    children: [
      { id: 'prompt-injection-threat-model', title: 'Prompt Injection Threat Modeling for Claude Apps' },
      { id: 'data-exfiltration-abuse-cases', title: 'Data Exfiltration and Tool-Abuse Threat Cases' },
      { id: 'mitigation-control-mapping', title: 'Threat Mitigation and Control Mapping' },
    ],
  },
  {
    parentId: 'solution-architecture-process--tech-radar',
    children: [
      { id: 'radar-rings-adopt-trial-hold', title: 'Tech Radar Rings for Claude Ecosystem Tools' },
      { id: 'model-version-radar-tracking', title: 'Model Version and SDK Radar Tracking' },
      { id: 'radar-governance-cadence', title: 'Radar Governance Cadence and Publication Process' },
    ],
  },
  // engineering-standards (7)
  {
    parentId: 'engineering-standards--coding-standards',
    children: [
      { id: 'claude-sdk-coding-conventions', title: 'Claude SDK Coding Conventions and Patterns' },
      { id: 'error-handling-retry-standards', title: 'Error Handling and Retry Standards for Claude APIs' },
      { id: 'logging-telemetry-standards', title: 'Logging and Telemetry Standards for Claude Apps' },
    ],
  },
  {
    parentId: 'engineering-standards--prompt-engineering-standards',
    children: [
      { id: 'prompt-template-governance', title: 'Prompt Template Governance and Version Control' },
      { id: 'system-prompt-style-guide', title: 'System Prompt Style Guide and Safety Baselines' },
      { id: 'prompt-review-approval-process', title: 'Prompt Review and Approval Process' },
    ],
  },
  {
    parentId: 'engineering-standards--peer-review-process',
    children: [
      { id: 'code-review-claude-checklist', title: 'Code Review Checklist for Claude Integrations' },
      { id: 'prompt-change-review-gates', title: 'Prompt Change Review Gates in Pull Requests' },
      { id: 'review-sla-ownership-rules', title: 'Review SLAs and Ownership Rules' },
    ],
  },
  {
    parentId: 'engineering-standards--definition-of-done',
    children: [
      { id: 'dod-claude-feature-checklist', title: 'Definition of Done for Claude Feature Delivery' },
      { id: 'eval-coverage-done-criteria', title: 'Eval Coverage as Definition-of-Done Criteria' },
      { id: 'operational-readiness-dod', title: 'Operational Readiness in Definition of Done' },
    ],
  },
  {
    parentId: 'engineering-standards--quality-gates',
    children: [
      { id: 'ci-quality-gates-claude', title: 'CI Quality Gates for Claude Application Pipelines' },
      { id: 'promotion-gates-environments', title: 'Environment Promotion Gates and Approvals' },
      { id: 'release-blocking-criteria', title: 'Release-Blocking Criteria for Claude Changes' },
    ],
  },
  {
    parentId: 'engineering-standards--architectural-fitness-functions',
    children: [
      { id: 'automated-architecture-tests', title: 'Automated Architecture Tests for Claude Systems' },
      { id: 'fitness-functions-token-cost', title: 'Fitness Functions for Token Cost Guardrails' },
      { id: 'drift-detection-architecture', title: 'Architecture Drift Detection and Alerts' },
    ],
  },
  {
    parentId: 'engineering-standards--engineering-scorecards',
    children: [
      { id: 'team-health-scorecard-metrics', title: 'Team Health Scorecard Metrics for Claude Teams' },
      { id: 'quality-reliability-scorecards', title: 'Quality and Reliability Engineering Scorecards' },
      { id: 'scorecard-review-cadence', title: 'Scorecard Review Cadence and Action Planning' },
    ],
  },
  // developer-platform (8)
  {
    parentId: 'developer-platform--internal-developer-portal',
    children: [
      { id: 'idp-claude-service-catalog', title: 'IDP Service Catalog for Claude Components' },
      { id: 'self-service-env-provisioning', title: 'Self-Service Environment Provisioning in IDP' },
      { id: 'developer-docs-runbooks-idp', title: 'Developer Docs and Runbooks in the Portal' },
    ],
  },
  {
    parentId: 'developer-platform--claude-starter-templates',
    children: [
      { id: 'scaffold-templates-repo-structure', title: 'Starter Scaffold Templates and Repo Structure' },
      { id: 'template-customization-variables', title: 'Template Customization Variables and Hooks' },
      { id: 'template-version-upgrade-path', title: 'Template Versioning and Upgrade Path' },
    ],
  },
  {
    parentId: 'developer-platform--golden-paths',
    children: [
      { id: 'golden-path-rag-apps', title: 'Golden Path for Enterprise RAG Applications' },
      { id: 'golden-path-agent-workflows', title: 'Golden Path for Agent Workflow Applications' },
      { id: 'golden-path-observability-baseline', title: 'Golden Path Observability and Security Baseline' },
    ],
  },
  {
    parentId: 'developer-platform--shared-libraries-sdks',
    children: [
      { id: 'internal-claude-sdk-wrappers', title: 'Internal Claude SDK Wrappers and Abstractions' },
      { id: 'shared-auth-telemetry-libraries', title: 'Shared Auth and Telemetry Libraries' },
      { id: 'library-versioning-support-policy', title: 'Library Versioning and Support Policy' },
    ],
  },
  {
    parentId: 'developer-platform--self-service-tooling',
    children: [
      { id: 'api-key-provisioning-self-service', title: 'Self-Service API Key and Quota Provisioning' },
      { id: 'eval-runner-self-service', title: 'Self-Service Eval Runner and Benchmark Tools' },
      { id: 'prompt-registry-self-service', title: 'Self-Service Prompt Registry and Publishing' },
    ],
  },
  {
    parentId: 'developer-platform--inner-source-program',
    children: [
      { id: 'inner-source-contribution-model', title: 'Inner-Source Contribution Model for Claude Tools' },
      { id: 'maintainer-ownership-model', title: 'Maintainer Ownership and Stewardship Model' },
      { id: 'inner-source-quality-bars', title: 'Inner-Source Quality Bars and Review Standards' },
    ],
  },
  {
    parentId: 'developer-platform--developer-experience-metrics',
    children: [
      { id: 'devex-surveys-feedback-loops', title: 'DevEx Surveys and Platform Feedback Loops' },
      { id: 'time-to-first-claude-deploy', title: 'Time-to-First Claude Deploy Metrics' },
      { id: 'platform-friction-tracking', title: 'Platform Friction Tracking and Backlog Prioritization' },
    ],
  },
  {
    parentId: 'developer-platform--platform-as-product',
    children: [
      { id: 'platform-product-roadmap', title: 'Platform Product Roadmap and Backlog Management' },
      { id: 'platform-sla-support-model', title: 'Platform SLA and Support Model for Teams' },
      { id: 'platform-adoption-growth-metrics', title: 'Platform Adoption and Growth Metrics' },
    ],
  },
  // procurement-sourcing (7)
  {
    parentId: 'procurement-sourcing--vendor-due-diligence',
    children: [
      { id: 'anthropic-security-diligence', title: 'Anthropic Security and Compliance Due Diligence' },
      { id: 'partner-vendor-assessment', title: 'Partner and Reseller Vendor Assessment' },
      { id: 'diligence-evidence-repositories', title: 'Due Diligence Evidence Repositories and Renewals' },
    ],
  },
  {
    parentId: 'procurement-sourcing--model-evaluation-framework',
    children: [
      { id: 'benchmark-harness-enterprise', title: 'Enterprise Benchmark Harness for Claude Models' },
      { id: 'task-specific-eval-suites', title: 'Task-Specific Eval Suites for Model Selection' },
      { id: 'model-comparison-decision-matrix', title: 'Model Comparison Decision Matrix and Sign-Off' },
    ],
  },
  {
    parentId: 'procurement-sourcing--build-vs-buy',
    children: [
      { id: 'total-cost-ownership-analysis', title: 'Total Cost of Ownership Analysis for Claude Solutions' },
      { id: 'capability-gap-build-buy', title: 'Capability Gap Analysis in Build vs Buy Decisions' },
      { id: 'partner-integration-cost-model', title: 'Partner Integration Cost and Timeline Modeling' },
    ],
  },
  {
    parentId: 'procurement-sourcing--multi-vendor-strategy',
    children: [
      { id: 'multi-model-routing-policy', title: 'Multi-Model Routing Policy and Fallback Rules' },
      { id: 'vendor-lock-in-mitigation', title: 'Vendor Lock-In Mitigation for Claude Programs' },
      { id: 'portfolio-diversification-strategy', title: 'Portfolio Diversification Across Model Providers' },
    ],
  },
  {
    parentId: 'procurement-sourcing--data-processing-agreements',
    children: [
      { id: 'dpa-clause-negotiation', title: 'DPA Clause Negotiation for Claude Data Processing' },
      { id: 'subprocessor-review-process', title: 'Subprocessor Review and Approval Process' },
      { id: 'cross-border-transfer-terms', title: 'Cross-Border Transfer Terms in DPAs' },
    ],
  },
  {
    parentId: 'procurement-sourcing--contract-sla-negotiation',
    children: [
      { id: 'sla-availability-latency-terms', title: 'SLA Terms for Availability and API Latency' },
      { id: 'support-escalation-contract-terms', title: 'Support Escalation Terms in Claude Contracts' },
      { id: 'commercial-terms-usage-commit', title: 'Commercial Terms and Usage Commit Structures' },
    ],
  },
  {
    parentId: 'procurement-sourcing--model-sourcing-policy',
    children: [
      { id: 'approved-model-catalog-policy', title: 'Approved Model Catalog and Usage Policy' },
      { id: 'model-upgrade-approval-process', title: 'Model Upgrade Approval and Rollout Process' },
      { id: 'prohibited-use-model-restrictions', title: 'Prohibited Use Cases and Model Restrictions' },
    ],
  },
  // enterprise-data-governance (7)
  {
    parentId: 'enterprise-data-governance--data-classification',
    children: [
      { id: 'sensitivity-labels-claude-data', title: 'Sensitivity Labels for Claude Inputs and Outputs' },
      { id: 'classification-automation-rules', title: 'Automated Classification Rules for AI Data' },
      { id: 'handling-rules-by-class', title: 'Handling Rules by Data Classification Tier' },
    ],
  },
  {
    parentId: 'enterprise-data-governance--data-residency-controls',
    children: [
      { id: 'regional-deployment-controls', title: 'Regional Deployment Controls for Claude Workloads' },
      { id: 'cross-border-data-restrictions', title: 'Cross-Border Data Restrictions and Routing' },
      { id: 'residency-audit-evidence', title: 'Data Residency Audit Evidence and Attestation' },
    ],
  },
  {
    parentId: 'enterprise-data-governance--data-lineage',
    children: [
      { id: 'prompt-context-lineage-tracking', title: 'Prompt and Context Lineage Tracking' },
      { id: 'retrieval-source-provenance', title: 'Retrieval Source Provenance for RAG Pipelines' },
      { id: 'lineage-metadata-standards', title: 'Lineage Metadata Standards for Claude Apps' },
    ],
  },
  {
    parentId: 'enterprise-data-governance--data-stewardship',
    children: [
      { id: 'steward-roles-accountability', title: 'Data Steward Roles and Accountability Model' },
      { id: 'domain-stewardship-claude', title: 'Domain Stewardship for Claude Knowledge Bases' },
      { id: 'steward-review-cadence', title: 'Steward Review Cadence and Exception Handling' },
    ],
  },
  {
    parentId: 'enterprise-data-governance--data-quality-management',
    children: [
      { id: 'grounding-data-quality-metrics', title: 'Grounding Data Quality Metrics and Thresholds' },
      { id: 'freshness-completeness-checks', title: 'Freshness and Completeness Checks for RAG Sources' },
      { id: 'quality-remediation-workflows', title: 'Data Quality Remediation Workflows' },
    ],
  },
  {
    parentId: 'enterprise-data-governance--consent-management',
    children: [
      { id: 'consent-capture-claude-features', title: 'Consent Capture for Claude-Powered Features' },
      { id: 'preference-center-ai-settings', title: 'Preference Centers for AI and Claude Settings' },
      { id: 'consent-audit-trail-reporting', title: 'Consent Audit Trail and Regulatory Reporting' },
    ],
  },
  {
    parentId: 'enterprise-data-governance--pii-redaction-process',
    children: [
      { id: 'pii-detection-pre-ingestion', title: 'PII Detection Before Claude Ingestion' },
      { id: 'output-redaction-guardrails', title: 'Output Redaction Guardrails and Filters' },
      { id: 'redaction-validation-sampling', title: 'Redaction Validation and Sampling Process' },
    ],
  },
  // risk-compliance-program (9)
  {
    parentId: 'risk-compliance-program--enterprise-risk-register',
    children: [
      { id: 'ai-risk-taxonomy-register', title: 'AI Risk Taxonomy and Enterprise Risk Register' },
      { id: 'risk-scoring-likelihood-impact', title: 'Risk Scoring by Likelihood and Impact' },
      { id: 'risk-owner-mitigation-tracking', title: 'Risk Owner Assignment and Mitigation Tracking' },
    ],
  },
  {
    parentId: 'risk-compliance-program--control-libraries',
    children: [
      { id: 'control-framework-mapping', title: 'Control Framework Mapping for Claude Programs' },
      { id: 'preventive-detective-controls', title: 'Preventive vs Detective Controls for AI Systems' },
      { id: 'control-testing-evidence', title: 'Control Testing and Evidence Collection' },
    ],
  },
  {
    parentId: 'risk-compliance-program--model-risk-management',
    children: [
      { id: 'mrm-governance-claude-models', title: 'MRM Governance for Claude Model Usage' },
      { id: 'model-validation-challenge-process', title: 'Model Validation and Challenge Process' },
      { id: 'model-inventory-lifecycle', title: 'Model Inventory and Lifecycle Management' },
    ],
  },
  {
    parentId: 'risk-compliance-program--third-party-risk-management',
    children: [
      { id: 'tprm-assessment-claude-vendors', title: 'TPRM Assessment for Claude Vendors and Integrators' },
      { id: 'continuous-monitoring-third-parties', title: 'Continuous Monitoring of Third-Party AI Risk' },
      { id: 'vendor-incident-coordination', title: 'Vendor Incident Coordination and Escalation' },
    ],
  },
  {
    parentId: 'risk-compliance-program--audit-readiness',
    children: [
      { id: 'audit-evidence-claude-controls', title: 'Audit Evidence for Claude Controls and Logs' },
      { id: 'control-owner-audit-prep', title: 'Control Owner Audit Preparation Playbooks' },
      { id: 'mock-audit-findings-remediation', title: 'Mock Audits, Findings and Remediation Tracking' },
    ],
  },
  {
    parentId: 'risk-compliance-program--certifications-soc2-iso',
    children: [
      { id: 'soc2-claude-control-mapping', title: 'SOC 2 Control Mapping for Claude Operations' },
      { id: 'iso-42001-ai-management', title: 'ISO 42001 AI Management System Alignment' },
      { id: 'certification-maintenance-cadence', title: 'Certification Maintenance and Surveillance Cadence' },
    ],
  },
  {
    parentId: 'risk-compliance-program--regulatory-reporting',
    children: [
      { id: 'ai-disclosure-reporting-requirements', title: 'AI Disclosure and Regulatory Reporting Requirements' },
      { id: 'incident-regulatory-notification', title: 'Incident Regulatory Notification Procedures' },
      { id: 'periodic-compliance-attestations', title: 'Periodic Compliance Attestations for Claude Programs' },
    ],
  },
  {
    parentId: 'risk-compliance-program--model-cards-datasheets',
    children: [
      { id: 'model-card-template-claude', title: 'Model Card Templates for Claude Deployments' },
      { id: 'system-card-operational-context', title: 'System Cards with Operational Context and Limits' },
      { id: 'card-maintenance-version-updates', title: 'Model Card Maintenance on Version Updates' },
    ],
  },
  {
    parentId: 'risk-compliance-program--algorithmic-impact-assessment',
    children: [
      { id: 'aia-scoping-methodology', title: 'Algorithmic Impact Assessment Scoping Methodology' },
      { id: 'bias-fairness-impact-analysis', title: 'Bias and Fairness Impact Analysis for Claude Use' },
      { id: 'aia-remediation-sign-off', title: 'AIA Remediation Plans and Sign-Off Process' },
    ],
  },
  // enterprise-finops-program (7)
  {
    parentId: 'enterprise-finops-program--cost-allocation-chargeback',
    children: [
      { id: 'token-cost-tagging-allocation', title: 'Token Cost Tagging and Allocation Models' },
      { id: 'showback-chargeback-claude', title: 'Showback and Chargeback for Claude Consumption' },
      { id: 'shared-cost-pool-rules', title: 'Shared Cost Pool Rules for Platform Overhead' },
    ],
  },
  {
    parentId: 'enterprise-finops-program--budget-governance',
    children: [
      { id: 'budget-enforcement-guardrails', title: 'Budget Enforcement Guardrails for Claude Usage' },
      { id: 'forecast-vs-actual-reviews', title: 'Forecast vs Actual Budget Review Cadence' },
      { id: 'exception-approval-overages', title: 'Exception Approval Process for Budget Overages' },
    ],
  },
  {
    parentId: 'enterprise-finops-program--cost-forecasting',
    children: [
      { id: 'usage-growth-forecast-models', title: 'Usage Growth Forecast Models for Claude Workloads' },
      { id: 'scenario-planning-cost-drivers', title: 'Scenario Planning for Token Cost Drivers' },
      { id: 'model-price-change-impact', title: 'Model Price Change Impact Forecasting' },
    ],
  },
  {
    parentId: 'enterprise-finops-program--unit-economics-per-conversation',
    children: [
      { id: 'cost-per-conversation-metrics', title: 'Cost-per-Conversation and Task Unit Metrics' },
      { id: 'margin-analysis-ai-features', title: 'Margin Analysis for Claude-Powered Features' },
      { id: 'unit-economics-dashboards', title: 'Unit Economics Dashboards and Benchmarks' },
    ],
  },
  {
    parentId: 'enterprise-finops-program--rate-card-management',
    children: [
      { id: 'internal-rate-card-design', title: 'Internal Rate Card Design for Claude Services' },
      { id: 'rate-card-update-communication', title: 'Rate Card Updates and Stakeholder Communication' },
      { id: 'cross-charge-reconciliation', title: 'Cross-Charge Reconciliation and Dispute Process' },
    ],
  },
  {
    parentId: 'enterprise-finops-program--caching-batching-optimization',
    children: [
      { id: 'prompt-caching-cost-optimization', title: 'Prompt Caching Strategies for Cost Optimization' },
      { id: 'batch-api-cost-reduction', title: 'Batch API Usage for Cost Reduction' },
      { id: 'optimization-playbooks-teams', title: 'FinOps Optimization Playbooks for Product Teams' },
    ],
  },
  {
    parentId: 'enterprise-finops-program--finops-reporting',
    children: [
      { id: 'executive-finops-dashboards', title: 'Executive FinOps Dashboards for Claude Spend' },
      { id: 'team-level-cost-reviews', title: 'Team-Level Cost Review Meetings and Actions' },
      { id: 'finops-kpi-tracking', title: 'FinOps KPI Tracking and Improvement Targets' },
    ],
  },
  // program-portfolio-management (7)
  {
    parentId: 'program-portfolio-management--intake-prioritization',
    children: [
      { id: 'demand-intake-portal-process', title: 'Demand Intake Portal and Triage Process' },
      { id: 'prioritization-scoring-framework', title: 'Prioritization Scoring Framework for Claude Ideas' },
      { id: 'capacity-aware-portfolio-planning', title: 'Capacity-Aware Portfolio Planning' },
    ],
  },
  {
    parentId: 'program-portfolio-management--okrs-roadmaps',
    children: [
      { id: 'claude-program-okr-cascade', title: 'Claude Program OKR Cascade and Alignment' },
      { id: 'multi-quarter-roadmap-planning', title: 'Multi-Quarter Roadmap Planning and Themes' },
      { id: 'okr-progress-review-cadence', title: 'OKR Progress Review Cadence and Adjustments' },
    ],
  },
  {
    parentId: 'program-portfolio-management--dependency-mapping',
    children: [
      { id: 'cross-team-dependency-registry', title: 'Cross-Team Dependency Registry for Claude Initiatives' },
      { id: 'critical-path-dependency-mgmt', title: 'Critical Path and Dependency Risk Management' },
      { id: 'integration-milestone-coordination', title: 'Integration Milestone Coordination Across Teams' },
    ],
  },
  {
    parentId: 'program-portfolio-management--status-reporting',
    children: [
      { id: 'program-status-report-templates', title: 'Program Status Report Templates and Rituals' },
      { id: 'rag-status-escalation-rules', title: 'RAG Status and Escalation Rules' },
      { id: 'stakeholder-comms-cadence', title: 'Stakeholder Communications Cadence for Programs' },
    ],
  },
  {
    parentId: 'program-portfolio-management--benefits-realization',
    children: [
      { id: 'benefits-baseline-measurement', title: 'Benefits Baseline Measurement Before Launch' },
      { id: 'post-launch-benefits-tracking', title: 'Post-Launch Benefits Tracking and Attribution' },
      { id: 'benefits-realization-reviews', title: 'Benefits Realization Reviews and Course Correction' },
    ],
  },
  {
    parentId: 'program-portfolio-management--agile-at-scale',
    children: [
      { id: 'safe-less-scrum-at-scale-claude', title: 'SAFe/LeSS/Scrum@Scale for Claude Programs' },
      { id: 'pi-planning-claude-initiatives', title: 'PI Planning for Claude Initiative Portfolios' },
      { id: 'agile-release-train-coordination', title: 'Agile Release Train Coordination Patterns' },
    ],
  },
  {
    parentId: 'program-portfolio-management--portfolio-rebalancing',
    children: [
      { id: 'portfolio-stage-gates', title: 'Portfolio Stage Gates and Investment Decisions' },
      { id: 'rebalancing-triggers-criteria', title: 'Portfolio Rebalancing Triggers and Criteria' },
      { id: 'sunset-reallocation-process', title: 'Sunset and Reallocation Process for Underperformers' },
    ],
  },
  // change-enablement (7)
  {
    parentId: 'change-enablement--org-change-management',
    children: [
      { id: 'ocm-plan-claude-adoption', title: 'OCM Plan for Enterprise Claude Adoption' },
      { id: 'resistance-management-strategies', title: 'Resistance Management Strategies for AI Change' },
      { id: 'change-impact-assessments', title: 'Change Impact Assessments by Role and Process' },
    ],
  },
  {
    parentId: 'change-enablement--communications-strategy',
    children: [
      { id: 'narrative-messaging-claude', title: 'Narrative and Messaging Strategy for Claude Rollouts' },
      { id: 'leader-employee-comms-plan', title: 'Leader and Employee Communications Plan' },
      { id: 'crisis-comms-ai-incidents', title: 'Crisis Communications for AI Incidents' },
    ],
  },
  {
    parentId: 'change-enablement--training-curricula',
    children: [
      { id: 'role-based-claude-curricula', title: 'Role-Based Claude Training Curricula' },
      { id: 'hands-on-labs-certification', title: 'Hands-On Labs and Certification Paths' },
      { id: 'training-effectiveness-measurement', title: 'Training Effectiveness Measurement and Iteration' },
    ],
  },
  {
    parentId: 'change-enablement--communities-of-practice',
    children: [
      { id: 'cop-charter-operating-model', title: 'CoP Charter and Operating Model for Claude Practitioners' },
      { id: 'knowledge-sharing-rituals', title: 'Knowledge-Sharing Rituals and Office Hours' },
      { id: 'cop-success-metrics', title: 'Community of Practice Success Metrics' },
    ],
  },
  {
    parentId: 'change-enablement--champions-network',
    children: [
      { id: 'champion-recruitment-onboarding', title: 'Champion Recruitment and Onboarding Program' },
      { id: 'champion-enablement-toolkit', title: 'Champion Enablement Toolkit and Playbooks' },
      { id: 'champion-impact-tracking', title: 'Champion Network Impact Tracking' },
    ],
  },
  {
    parentId: 'change-enablement--adoption-metrics',
    children: [
      { id: 'adoption-funnel-metrics', title: 'Adoption Funnel Metrics for Claude Tools' },
      { id: 'stickiness-engagement-tracking', title: 'Stickiness and Engagement Tracking by Cohort' },
      { id: 'adoption-barrier-analysis', title: 'Adoption Barrier Analysis and Interventions' },
    ],
  },
  {
    parentId: 'change-enablement--workforce-reskilling',
    children: [
      { id: 'skills-gap-analysis-claude', title: 'Skills Gap Analysis for Claude-Era Roles' },
      { id: 'job-redesign-ai-augmentation', title: 'Job Redesign for AI-Augmented Workflows' },
      { id: 'reskilling-pathways-programs', title: 'Reskilling Pathways and Transition Programs' },
    ],
  },
  // legal-ethical-governance (7)
  {
    parentId: 'legal-ethical-governance--ai-ethics-board',
    children: [
      { id: 'ethics-board-charter-scope', title: 'AI Ethics Board Charter and Review Scope' },
      { id: 'use-case-ethics-review-process', title: 'Use-Case Ethics Review and Approval Process' },
      { id: 'ethics-decision-documentation', title: 'Ethics Decision Documentation and Appeals' },
    ],
  },
  {
    parentId: 'legal-ethical-governance--ip-and-licensing',
    children: [
      { id: 'output-copyright-ownership', title: 'Copyright and Ownership of Claude-Generated Outputs' },
      { id: 'training-data-licensing-review', title: 'Training Data and Content Licensing Review' },
      { id: 'ip-indemnity-contract-terms', title: 'IP Indemnity Terms in Claude Agreements' },
    ],
  },
  {
    parentId: 'legal-ethical-governance--liability-frameworks',
    children: [
      { id: 'liability-allocation-ai-systems', title: 'Liability Allocation for Claude-Powered Systems' },
      { id: 'error-harm-remediation-policy', title: 'Error and Harm Remediation Policy Frameworks' },
      { id: 'insurance-risk-transfer-options', title: 'Insurance and Risk Transfer Options for AI Liability' },
    ],
  },
  {
    parentId: 'legal-ethical-governance--acceptable-use-policy',
    children: [
      { id: 'aup-scope-prohibited-uses', title: 'AUP Scope and Prohibited Claude Use Cases' },
      { id: 'aup-enforcement-monitoring', title: 'AUP Enforcement and Monitoring Mechanisms' },
      { id: 'aup-employee-training-attestation', title: 'AUP Employee Training and Attestation Process' },
    ],
  },
  {
    parentId: 'legal-ethical-governance--responsible-disclosure-policy',
    children: [
      { id: 'vulnerability-disclosure-program', title: 'Vulnerability Disclosure Program for Claude Apps' },
      { id: 'researcher-coordination-process', title: 'Researcher Coordination and Triage Process' },
      { id: 'disclosure-timeline-remediation', title: 'Disclosure Timelines and Remediation SLAs' },
    ],
  },
  {
    parentId: 'legal-ethical-governance--dpia-process',
    children: [
      { id: 'dpia-trigger-assessment-claude', title: 'DPIA Trigger Assessment for Claude Features' },
      { id: 'dpia-template-risk-mitigation', title: 'DPIA Templates and Risk Mitigation Plans' },
      { id: 'dpia-dpo-review-sign-off', title: 'DPO Review and DPIA Sign-Off Workflow' },
    ],
  },
  {
    parentId: 'legal-ethical-governance--open-source-governance',
    children: [
      { id: 'oss-usage-policy-claude-apps', title: 'Open-Source Usage Policy for Claude Applications' },
      { id: 'license-compliance-scanning', title: 'License Compliance Scanning and Approval' },
      { id: 'oss-contribution-review-process', title: 'Open-Source Contribution Review Process' },
    ],
  },
]

/** @type {Array<{ parentId: string, children: Array<{ id: string, title: string }> }>} */
export const STAGE25_LIFECYCLE = [
  // requirements-design-phase (7)
  {
    parentId: 'requirements-design-phase--discovery-workshops',
    children: [
      { id: 'event-storming-claude-features', title: 'Event Storming for Claude Feature Discovery' },
      { id: 'workshop-facilitation-artifacts', title: 'Workshop Facilitation and Artifact Templates' },
      { id: 'discovery-to-backlog-handoff', title: 'Discovery-to-Backlog Handoff Criteria' },
    ],
  },
  {
    parentId: 'requirements-design-phase--jobs-and-personas',
    children: [
      { id: 'ai-user-persona-development', title: 'AI User Persona Development for Claude Apps' },
      { id: 'job-stories-conversational-tasks', title: 'Job Stories for Conversational Task Flows' },
      { id: 'persona-driven-eval-scenarios', title: 'Persona-Driven Eval Scenario Design' },
    ],
  },
  {
    parentId: 'requirements-design-phase--journey-mapping',
    children: [
      { id: 'conversational-journey-mapping', title: 'Conversational Journey Mapping Techniques' },
      { id: 'service-blueprint-claude-touchpoints', title: 'Service Blueprints for Claude Touchpoints' },
      { id: 'failure-modes-journey-analysis', title: 'Failure Modes in User Journey Analysis' },
    ],
  },
  {
    parentId: 'requirements-design-phase--prd-templates',
    children: [
      { id: 'claude-feature-prd-sections', title: 'PRD Sections for Claude Feature Specifications' },
      { id: 'behavior-spec-prompt-requirements', title: 'Behavior Specs and Prompt Requirements in PRDs' },
      { id: 'prd-review-approval-gates', title: 'PRD Review and Approval Gates' },
    ],
  },
  {
    parentId: 'requirements-design-phase--lo-fi-prototyping',
    children: [
      { id: 'conversation-flow-wireframes', title: 'Conversation Flow Wireframes and Script Prototypes' },
      { id: 'rapid-prompt-prototype-testing', title: 'Rapid Prompt Prototype Testing with Users' },
      { id: 'prototype-to-build-handoff', title: 'Prototype-to-Build Handoff and Traceability' },
    ],
  },
  {
    parentId: 'requirements-design-phase--design-sign-off',
    children: [
      { id: 'design-review-checklist-claude', title: 'Design Review Checklist for Claude Experiences' },
      { id: 'stakeholder-sign-off-criteria', title: 'Stakeholder Sign-Off Criteria and RACI' },
      { id: 'design-change-control-process', title: 'Design Change Control After Sign-Off' },
    ],
  },
  {
    parentId: 'requirements-design-phase--risk-impact-assessment',
    children: [
      { id: 'feature-risk-register-template', title: 'Feature Risk Register Templates for Claude Releases' },
      { id: 'safety-impact-assessment', title: 'Safety Impact Assessment for New Claude Behaviors' },
      { id: 'risk-mitigation-before-build', title: 'Risk Mitigation Plans Before Build Start' },
    ],
  },
  // implementation-build-phase (7)
  {
    parentId: 'implementation-build-phase--pairing-and-mobbing',
    children: [
      { id: 'pairing-claude-integration-work', title: 'Pairing Practices for Claude Integration Work' },
      { id: 'mob-programming-agent-features', title: 'Mob Programming for Agent Feature Development' },
      { id: 'ensemble-review-prompt-changes', title: 'Ensemble Review for Prompt and Tool Changes' },
    ],
  },
  {
    parentId: 'implementation-build-phase--trunk-based-development',
    children: [
      { id: 'short-lived-branches-claude', title: 'Short-Lived Branches for Claude Application Teams' },
      { id: 'trunk-stability-feature-flags', title: 'Trunk Stability with Feature Flags for AI Features' },
      { id: 'continuous-integration-trunk-practices', title: 'Continuous Integration Practices on Trunk' },
    ],
  },
  {
    parentId: 'implementation-build-phase--branching-strategy',
    children: [
      { id: 'release-branch-claude-services', title: 'Release Branch Strategy for Claude Services' },
      { id: 'hotfix-branch-emergency-patches', title: 'Hotfix Branch Process for Emergency Patches' },
      { id: 'branch-protection-rules-ai-repos', title: 'Branch Protection Rules for AI Application Repos' },
    ],
  },
  {
    parentId: 'implementation-build-phase--commit-conventions',
    children: [
      { id: 'conventional-commits-claude-repos', title: 'Conventional Commits for Claude Application Repos' },
      { id: 'commit-message-prompt-traceability', title: 'Commit Messages Linking Prompt and Eval Changes' },
      { id: 'automated-changelog-release-notes', title: 'Automated Changelog and Release Notes Generation' },
    ],
  },
  {
    parentId: 'implementation-build-phase--code-ownership-codeowners',
    children: [
      { id: 'codeowners-prompt-registry-ownership', title: 'CODEOWNERS for Prompt Registries and Tools' },
      { id: 'ownership-boundaries-microservices', title: 'Ownership Boundaries in Claude Microservices' },
      { id: 'on-call-ownership-alignment', title: 'On-Call Ownership Alignment with CODEOWNERS' },
    ],
  },
  {
    parentId: 'implementation-build-phase--refactoring-discipline',
    children: [
      { id: 'refactoring-claude-integration-code', title: 'Refactoring Discipline for Claude Integration Code' },
      { id: 'strangler-pattern-ai-migrations', title: 'Strangler Pattern for AI Feature Migrations' },
      { id: 'refactor-safety-eval-regression', title: 'Refactor Safety with Eval Regression Suites' },
    ],
  },
  {
    parentId: 'implementation-build-phase--feature-toggling-build',
    children: [
      { id: 'feature-flags-during-development', title: 'Feature Flags During Claude Feature Development' },
      { id: 'flag-lifecycle-dev-to-prod', title: 'Flag Lifecycle from Development to Production' },
      { id: 'kill-switches-agent-behaviors', title: 'Kill Switches for Agent Behaviors in Build' },
    ],
  },
  // testing-validation-phase (8)
  {
    parentId: 'testing-validation-phase--test-strategy-pyramid',
    children: [
      { id: 'pyramid-claude-app-test-layers', title: 'Test Pyramid Layers for Claude Applications' },
      { id: 'integration-vs-e2e-ai-tests', title: 'Integration vs E2E Tests for AI Workflows' },
      { id: 'test-strategy-per-release-train', title: 'Test Strategy Aligned to Release Trains' },
    ],
  },
  {
    parentId: 'testing-validation-phase--eval-as-tests',
    children: [
      { id: 'ci-eval-gates-quality-bars', title: 'CI Eval Gates and Quality Bars' },
      { id: 'regression-eval-suites', title: 'Regression Eval Suites for Prompt Changes' },
      { id: 'eval-flake-management', title: 'Eval Flake Management and Stabilization' },
    ],
  },
  {
    parentId: 'testing-validation-phase--contract-testing-process',
    children: [
      { id: 'pact-contracts-claude-services', title: 'PACT Contracts Between Claude Service Consumers' },
      { id: 'schema-contract-tool-definitions', title: 'Schema Contracts for Tool Definitions' },
      { id: 'contract-test-ci-integration', title: 'Contract Test Integration in CI Pipelines' },
    ],
  },
  {
    parentId: 'testing-validation-phase--performance-test-program',
    children: [
      { id: 'load-testing-claude-api-paths', title: 'Load Testing Claude API Integration Paths' },
      { id: 'latency-sla-performance-benchmarks', title: 'Latency SLA Performance Benchmarks' },
      { id: 'capacity-test-automation', title: 'Capacity Test Automation and Reporting' },
    ],
  },
  {
    parentId: 'testing-validation-phase--security-test-program',
    children: [
      { id: 'sast-dast-claude-applications', title: 'SAST/DAST for Claude Application Codebases' },
      { id: 'prompt-injection-security-tests', title: 'Prompt Injection Security Test Cases' },
      { id: 'secrets-scanning-ci-gates', title: 'Secrets Scanning CI Gates for AI Repos' },
    ],
  },
  {
    parentId: 'testing-validation-phase--uat-process',
    children: [
      { id: 'uat-scenarios-claude-features', title: 'UAT Scenarios for Claude Feature Validation' },
      { id: 'business-sign-off-uat-criteria', title: 'Business Sign-Off and UAT Acceptance Criteria' },
      { id: 'uat-defect-triage-prioritization', title: 'UAT Defect Triage and Prioritization' },
    ],
  },
  {
    parentId: 'testing-validation-phase--acceptance-criteria-bdd',
    children: [
      { id: 'gherkin-claude-behavior-specs', title: 'Gherkin Behavior Specs for Claude Features' },
      { id: 'bdd-automation-eval-alignment', title: 'BDD Automation Aligned with Eval Suites' },
      { id: 'living-documentation-bdd', title: 'Living Documentation from BDD Scenarios' },
    ],
  },
  {
    parentId: 'testing-validation-phase--red-team-test-program',
    children: [
      { id: 'red-team-scenario-library', title: 'Red-Team Scenario Library for Claude Apps' },
      { id: 'adversarial-testing-cadence', title: 'Adversarial Testing Cadence and Reporting' },
      { id: 'red-team-findings-remediation', title: 'Red-Team Findings Remediation Workflow' },
    ],
  },
  // cicd-release-engineering (8)
  {
    parentId: 'cicd-release-engineering--cicd-pipeline-design',
    children: [
      { id: 'pipeline-stages-claude-apps', title: 'Pipeline Stages for Claude Application Delivery' },
      { id: 'parallel-eval-test-pipelines', title: 'Parallel Eval and Test Pipeline Design' },
      { id: 'pipeline-failure-triage-runbooks', title: 'Pipeline Failure Triage and Runbooks' },
    ],
  },
  {
    parentId: 'cicd-release-engineering--build-promotion-stages',
    children: [
      { id: 'artifact-promotion-gates', title: 'Artifact Promotion Gates Across Environments' },
      { id: 'immutable-build-artifacts', title: 'Immutable Build Artifacts for Claude Services' },
      { id: 'promotion-approval-workflows', title: 'Promotion Approval Workflows and Audit Trail' },
    ],
  },
  {
    parentId: 'cicd-release-engineering--env-strategy-paths',
    children: [
      { id: 'dev-staging-prod-env-parity', title: 'Dev-Staging-Prod Environment Parity for Claude Apps' },
      { id: 'sandbox-isolated-test-envs', title: 'Sandbox and Isolated Test Environments' },
      { id: 'env-config-secrets-separation', title: 'Environment Config and Secrets Separation' },
    ],
  },
  {
    parentId: 'cicd-release-engineering--release-trains',
    children: [
      { id: 'release-train-cadence-planning', title: 'Release Train Cadence and Planning Rituals' },
      { id: 'train-scope-cut-line-process', title: 'Release Train Scope and Cut-Line Process' },
      { id: 'cross-team-train-coordination', title: 'Cross-Team Coordination on Release Trains' },
    ],
  },
  {
    parentId: 'cicd-release-engineering--feature-flag-management',
    children: [
      { id: 'flag-registry-governance', title: 'Feature Flag Registry and Governance' },
      { id: 'gradual-rollout-flag-strategies', title: 'Gradual Rollout Strategies with Feature Flags' },
      { id: 'flag-cleanup-tech-debt', title: 'Flag Cleanup and Technical Debt Management' },
    ],
  },
  {
    parentId: 'cicd-release-engineering--secrets-management-process',
    children: [
      { id: 'secrets-rotation-claude-keys', title: 'Secrets Rotation for Claude API Keys' },
      { id: 'vault-integration-ci-cd', title: 'Vault Integration in CI/CD Pipelines' },
      { id: 'least-privilege-secret-access', title: 'Least-Privilege Secret Access Policies' },
    ],
  },
  {
    parentId: 'cicd-release-engineering--supply-chain-security-program',
    children: [
      { id: 'sbom-generation-claude-deps', title: 'SBOM Generation for Claude Application Dependencies' },
      { id: 'slsa-provenance-pipeline', title: 'SLSA Provenance for Build Pipelines' },
      { id: 'dependency-vulnerability-gates', title: 'Dependency Vulnerability Gates in CI' },
    ],
  },
  {
    parentId: 'cicd-release-engineering--prompt-versioning-strategy',
    children: [
      { id: 'prompt-artifact-version-control', title: 'Prompt Artifact Version Control Strategy' },
      { id: 'prompt-promotion-environments', title: 'Prompt Promotion Across Environments' },
      { id: 'rollback-prompt-versions', title: 'Rollback Strategies for Prompt Versions' },
    ],
  },
  // production-readiness (8)
  {
    parentId: 'production-readiness--production-readiness-review',
    children: [
      { id: 'prr-checklist-claude-services', title: 'PRR Checklist for Claude Production Services' },
      { id: 'prr-cross-functional-sign-off', title: 'Cross-Functional PRR Sign-Off Requirements' },
      { id: 'prr-exception-risk-acceptance', title: 'PRR Exceptions and Risk Acceptance Documentation' },
    ],
  },
  {
    parentId: 'production-readiness--launch-checklist',
    children: [
      { id: 'launch-readiness-task-owners', title: 'Launch Readiness Tasks and Owner Assignments' },
      { id: 'pre-launch-verification-steps', title: 'Pre-Launch Verification Steps for Claude Features' },
      { id: 'launch-comms-support-prep', title: 'Launch Communications and Support Preparation' },
    ],
  },
  {
    parentId: 'production-readiness--go-no-go-criteria',
    children: [
      { id: 'go-no-go-decision-forum', title: 'Go/No-Go Decision Forum and Participants' },
      { id: 'quantitative-launch-criteria', title: 'Quantitative Launch Criteria and Thresholds' },
      { id: 'no-go-remediation-plans', title: 'No-Go Remediation Plans and Reschedule Process' },
    ],
  },
  {
    parentId: 'production-readiness--dark-launches',
    children: [
      { id: 'shadow-mode-claude-responses', title: 'Shadow Mode for Claude Response Validation' },
      { id: 'dark-launch-traffic-routing', title: 'Dark Launch Traffic Routing Patterns' },
      { id: 'dark-launch-metrics-comparison', title: 'Dark Launch Metrics Comparison and Analysis' },
    ],
  },
  {
    parentId: 'production-readiness--gradual-rollout-strategy',
    children: [
      { id: 'canary-rollout-claude-features', title: 'Canary Rollout for Claude Feature Releases' },
      { id: 'ringed-blue-green-deployments', title: 'Ringed and Blue-Green Deployment Strategies' },
      { id: 'rollout-pause-rollback-triggers', title: 'Rollout Pause and Rollback Trigger Criteria' },
    ],
  },
  {
    parentId: 'production-readiness--rollback-strategy',
    children: [
      { id: 'rollback-runbooks-claude-services', title: 'Rollback Runbooks for Claude Services' },
      { id: 'data-migration-rollback-plans', title: 'Data Migration Rollback Plans' },
      { id: 'rollback-drill-exercises', title: 'Rollback Drill Exercises and Verification' },
    ],
  },
  {
    parentId: 'production-readiness--day-1-day-2-operations',
    children: [
      { id: 'day-1-launch-operations-plan', title: 'Day-1 Launch Operations Plan' },
      { id: 'day-2-steady-state-handoff', title: 'Day-2 Steady-State Handoff to SRE/Support' },
      { id: 'operational-runbook-completeness', title: 'Operational Runbook Completeness Criteria' },
    ],
  },
  {
    parentId: 'production-readiness--hypercare-period',
    children: [
      { id: 'hypercare-team-staffing-model', title: 'Hypercare Team Staffing and Coverage Model' },
      { id: 'hypercare-escalation-slas', title: 'Hypercare Escalation SLAs and War Room Protocols' },
      { id: 'hypercare-exit-criteria', title: 'Hypercare Exit Criteria and Transition Plan' },
    ],
  },
  // operations-sre-program (8)
  {
    parentId: 'operations-sre-program--sli-slo-sla-design',
    children: [
      { id: 'sli-selection-claude-services', title: 'SLI Selection for Claude API Integration Services' },
      { id: 'slo-target-setting-error-budgets', title: 'SLO Target Setting and Error Budget Linkage' },
      { id: 'customer-facing-sla-mapping', title: 'Customer-Facing SLA Mapping from Internal SLOs' },
    ],
  },
  {
    parentId: 'operations-sre-program--error-budget-policy',
    children: [
      { id: 'error-budget-burn-alerts', title: 'Error Budget Burn Alerts and Response' },
      { id: 'release-freeze-budget-exhaustion', title: 'Release Freeze Policies on Budget Exhaustion' },
      { id: 'error-budget-review-rituals', title: 'Error Budget Review Rituals with Product Teams' },
    ],
  },
  {
    parentId: 'operations-sre-program--on-call-program',
    children: [
      { id: 'on-call-rotation-claude-services', title: 'On-Call Rotation Design for Claude Services' },
      { id: 'on-call-handoff-runbooks', title: 'On-Call Handoff and Runbook Requirements' },
      { id: 'on-call-compensation-fatigue', title: 'On-Call Compensation and Fatigue Management' },
    ],
  },
  {
    parentId: 'operations-sre-program--escalation-paths',
    children: [
      { id: 'severity-matrix-claude-incidents', title: 'Severity Matrix for Claude Production Incidents' },
      { id: 'tiered-escalation-contacts', title: 'Tiered Escalation Contacts and Paging Policies' },
      { id: 'vendor-escalation-anthropic', title: 'Vendor Escalation Paths with Anthropic Support' },
    ],
  },
  {
    parentId: 'operations-sre-program--capacity-management',
    children: [
      { id: 'demand-forecast-claude-traffic', title: 'Demand Forecasting for Claude Traffic Growth' },
      { id: 'autoscaling-policies-ai-workloads', title: 'Autoscaling Policies for AI Workload Spikes' },
      { id: 'capacity-review-cadence', title: 'Capacity Review Cadence and Headroom Planning' },
    ],
  },
  {
    parentId: 'operations-sre-program--dr-bcp-planning',
    children: [
      { id: 'dr-rpo-rto-claude-services', title: 'DR RPO/RTO Targets for Claude Services' },
      { id: 'failover-multi-region-strategies', title: 'Failover and Multi-Region Strategies' },
      { id: 'bcp-tabletop-dr-drills', title: 'BCP Tabletop Exercises and DR Drills' },
    ],
  },
  {
    parentId: 'operations-sre-program--chaos-engineering-program',
    children: [
      { id: 'chaos-experiments-claude-paths', title: 'Chaos Experiments for Claude Integration Paths' },
      { id: 'failure-injection-guardrails', title: 'Failure Injection Guardrails in Production' },
      { id: 'chaos-learning-action-items', title: 'Chaos Experiment Learning and Action Items' },
    ],
  },
  {
    parentId: 'operations-sre-program--reliability-reviews',
    children: [
      { id: 'monthly-reliability-reviews', title: 'Monthly Reliability Reviews for Claude Services' },
      { id: 'toil-identification-reduction', title: 'Toil Identification and Reduction Programs' },
      { id: 'reliability-roadmap-prioritization', title: 'Reliability Roadmap Prioritization' },
    ],
  },
  // observability-program (7)
  {
    parentId: 'observability-program--telemetry-standards',
    children: [
      { id: 'otel-conventions-claude-spans', title: 'OpenTelemetry Conventions for Claude Spans' },
      { id: 'metric-naming-tagging-standards', title: 'Metric Naming and Tagging Standards' },
      { id: 'telemetry-schema-governance', title: 'Telemetry Schema Governance and Versioning' },
    ],
  },
  {
    parentId: 'observability-program--golden-signals',
    children: [
      { id: 'latency-traffic-errors-saturation', title: 'Latency, Traffic, Errors, Saturation for Claude' },
      { id: 'token-usage-cost-signals', title: 'Token Usage and Cost as Operational Signals' },
      { id: 'quality-signals-eval-drift', title: 'Quality Signals and Eval Drift Monitoring' },
    ],
  },
  {
    parentId: 'observability-program--dashboards-as-code',
    children: [
      { id: 'dashboard-gitops-workflow', title: 'Dashboard-as-Code GitOps Workflow' },
      { id: 'standard-dashboard-templates', title: 'Standard Dashboard Templates for Claude Teams' },
      { id: 'dashboard-review-ownership', title: 'Dashboard Review and Ownership Standards' },
    ],
  },
  {
    parentId: 'observability-program--alerting-policy',
    children: [
      { id: 'symptom-based-alert-design', title: 'Symptom-Based Alert Design for Claude Services' },
      { id: 'alert-noise-reduction-tuning', title: 'Alert Noise Reduction and Tuning Process' },
      { id: 'on-call-alert-runbook-linking', title: 'On-Call Alert-to-Runbook Linking Standards' },
    ],
  },
  {
    parentId: 'observability-program--log-management-policy',
    children: [
      { id: 'structured-logging-claude-requests', title: 'Structured Logging for Claude Request Lifecycles' },
      { id: 'pii-scrubbing-log-pipelines', title: 'PII Scrubbing in Log Ingestion Pipelines' },
      { id: 'log-access-audit-controls', title: 'Log Access Controls and Audit Logging' },
    ],
  },
  {
    parentId: 'observability-program--retention-and-sampling',
    children: [
      { id: 'trace-log-retention-tiers', title: 'Trace and Log Retention Tier Policies' },
      { id: 'tail-sampling-high-volume-traces', title: 'Tail Sampling for High-Volume Claude Traces' },
      { id: 'retention-compliance-requirements', title: 'Retention Policies for Compliance Requirements' },
    ],
  },
  {
    parentId: 'observability-program--conversation-trace-governance',
    children: [
      { id: 'conversation-trace-access-controls', title: 'Conversation Trace Access Controls and RBAC' },
      { id: 'trace-redaction-anonymization', title: 'Trace Redaction and Anonymization Rules' },
      { id: 'trace-retention-audit-trail', title: 'Trace Retention and Audit Trail Requirements' },
    ],
  },
  // incident-management-process (8)
  {
    parentId: 'incident-management-process--incident-classification',
    children: [
      { id: 'severity-impact-matrix-claude', title: 'Severity and Impact Matrix for Claude Incidents' },
      { id: 'incident-type-taxonomy', title: 'Incident Type Taxonomy for AI Service Failures' },
      { id: 'classification-decision-tree', title: 'Incident Classification Decision Tree' },
    ],
  },
  {
    parentId: 'incident-management-process--incident-commander-role',
    children: [
      { id: 'ic-role-responsibilities-roster', title: 'Incident Commander Role and Roster Management' },
      { id: 'ic-training-simulation-exercises', title: 'IC Training and Simulation Exercises' },
      { id: 'ic-handoff-de-escalation', title: 'IC Handoff and De-Escalation Procedures' },
    ],
  },
  {
    parentId: 'incident-management-process--war-room-protocols',
    children: [
      { id: 'bridge-call-war-room-setup', title: 'Bridge Call and War Room Setup Protocols' },
      { id: 'incident-comms-internal-external', title: 'Internal and External Incident Communications' },
      { id: 'war-room-tooling-collaboration', title: 'War Room Tooling and Collaboration Standards' },
    ],
  },
  {
    parentId: 'incident-management-process--status-page-comms',
    children: [
      { id: 'status-page-update-cadence', title: 'Status Page Update Cadence During Incidents' },
      { id: 'customer-comms-templates-claude', title: 'Customer Communication Templates for AI Outages' },
      { id: 'post-incident-customer-follow-up', title: 'Post-Incident Customer Follow-Up Process' },
    ],
  },
  {
    parentId: 'incident-management-process--blameless-postmortems',
    children: [
      { id: 'postmortem-template-timeline', title: 'Blameless Postmortem Template and Timeline' },
      { id: 'root-cause-analysis-techniques', title: 'Root Cause Analysis Techniques for AI Incidents' },
      { id: 'postmortem-sharing-culture', title: 'Postmortem Sharing and Learning Culture' },
    ],
  },
  {
    parentId: 'incident-management-process--action-item-tracking',
    children: [
      { id: 'action-item-ownership-slas', title: 'Action Item Ownership and Closure SLAs' },
      { id: 'incident-action-backlog-governance', title: 'Incident Action Backlog Governance' },
      { id: 'recurring-incident-prevention', title: 'Recurring Incident Prevention Tracking' },
    ],
  },
  {
    parentId: 'incident-management-process--incident-metrics-mttx',
    children: [
      { id: 'mttd-mtta-mttr-tracking', title: 'MTTD, MTTA, and MTTR Tracking for Claude Incidents' },
      { id: 'incident-volume-trend-analysis', title: 'Incident Volume and Trend Analysis' },
      { id: 'metrics-driven-improvement-targets', title: 'Metrics-Driven Improvement Targets' },
    ],
  },
  {
    parentId: 'incident-management-process--major-incident-review',
    children: [
      { id: 'major-incident-exec-review', title: 'Major Incident Executive Review Process' },
      { id: 'regulatory-customer-notification', title: 'Regulatory and Customer Notification for Major Incidents' },
      { id: 'major-incident-lessons-program', title: 'Major Incident Lessons Program-Wide Rollout' },
    ],
  },
  // support-maintenance-program (7)
  {
    parentId: 'support-maintenance-program--tiered-support-model',
    children: [
      { id: 'l1-l2-l3-claude-support', title: 'L1/L2/L3 Support Model for Claude Applications' },
      { id: 'support-escalation-knowledge-base', title: 'Support Escalation and Knowledge Base Integration' },
      { id: 'support-shift-handoff-procedures', title: 'Support Shift Handoff Procedures' },
    ],
  },
  {
    parentId: 'support-maintenance-program--bug-triage-process',
    children: [
      { id: 'bug-severity-priority-matrix', title: 'Bug Severity and Priority Matrix for AI Issues' },
      { id: 'triage-cadence-ownership', title: 'Triage Cadence and Ownership Rules' },
      { id: 'customer-reported-ai-issue-flow', title: 'Customer-Reported AI Issue Intake Flow' },
    ],
  },
  {
    parentId: 'support-maintenance-program--sla-management',
    children: [
      { id: 'support-sla-definition-tracking', title: 'Support SLA Definition and Tracking' },
      { id: 'sla-breach-escalation-process', title: 'SLA Breach Escalation Process' },
      { id: 'sla-reporting-customer-reviews', title: 'SLA Reporting and Customer Review Meetings' },
    ],
  },
  {
    parentId: 'support-maintenance-program--patch-management-cadence',
    children: [
      { id: 'security-patch-cadence-claude', title: 'Security Patch Cadence for Claude Dependencies' },
      { id: 'emergency-patch-procedures', title: 'Emergency Patch Procedures and Communication' },
      { id: 'patch-validation-regression-testing', title: 'Patch Validation and Regression Testing' },
    ],
  },
  {
    parentId: 'support-maintenance-program--dependency-upgrade-program',
    children: [
      { id: 'dependency-inventory-risk-scoring', title: 'Dependency Inventory and Risk Scoring' },
      { id: 'scheduled-upgrade-windows', title: 'Scheduled Upgrade Windows and Rollback Plans' },
      { id: 'sdk-model-version-upgrades', title: 'Claude SDK and Model Version Upgrade Program' },
    ],
  },
  {
    parentId: 'support-maintenance-program--model-version-policy',
    children: [
      { id: 'approved-model-version-matrix', title: 'Approved Claude Model Version Matrix' },
      { id: 'model-upgrade-testing-gates', title: 'Model Upgrade Testing and Promotion Gates' },
      { id: 'deprecated-model-sunset-process', title: 'Deprecated Model Sunset and Migration Process' },
    ],
  },
  {
    parentId: 'support-maintenance-program--decommissioning-sunsetting',
    children: [
      { id: 'feature-sunset-communication-plan', title: 'Feature Sunset Communication and Migration Plan' },
      { id: 'data-retention-decommission', title: 'Data Retention During Service Decommissioning' },
      { id: 'archival-knowledge-transfer', title: 'Archival and Knowledge Transfer on Sunsetting' },
    ],
  },
  // continuous-improvement-program (7)
  {
    parentId: 'continuous-improvement-program--feedback-loops-program',
    children: [
      { id: 'user-feedback-claude-products', title: 'User Feedback Collection for Claude Products' },
      { id: 'operator-feedback-sre-support', title: 'Operator Feedback from SRE and Support Teams' },
      { id: 'feedback-to-backlog-prioritization', title: 'Feedback-to-Backlog Prioritization Process' },
    ],
  },
  {
    parentId: 'continuous-improvement-program--post-launch-reviews',
    children: [
      { id: 'post-launch-review-template', title: 'Post-Launch Review Template and Timing' },
      { id: 'beta-graduation-criteria', title: 'Beta Graduation Criteria and Decision Forum' },
      { id: 'launch-retrospective-action-items', title: 'Launch Retrospective Action Items' },
    ],
  },
  {
    parentId: 'continuous-improvement-program--technical-debt-management',
    children: [
      { id: 'tech-debt-register-claude-teams', title: 'Technical Debt Register for Claude Teams' },
      { id: 'debt-allocation-sprint-planning', title: 'Debt Allocation in Sprint and PI Planning' },
      { id: 'debt-impact-prioritization', title: 'Debt Impact Prioritization Framework' },
    ],
  },
  {
    parentId: 'continuous-improvement-program--evolutionary-architecture-practice',
    children: [
      { id: 'incremental-architecture-evolution', title: 'Incremental Architecture Evolution for AI Systems' },
      { id: 'architecture-decision-reversibility', title: 'Architecture Decision Reversibility and Options' },
      { id: 'fitness-function-continuous-design', title: 'Fitness Functions for Continuous Design Validation' },
    ],
  },
  {
    parentId: 'continuous-improvement-program--prompt-deprecation-policy',
    children: [
      { id: 'prompt-sunset-notification-process', title: 'Prompt Sunset Notification and Migration Process' },
      { id: 'deprecated-prompt-grace-periods', title: 'Deprecated Prompt Grace Periods and Support' },
      { id: 'prompt-version-audit-trail', title: 'Prompt Version Audit Trail on Deprecation' },
    ],
  },
  {
    parentId: 'continuous-improvement-program--retrospectives-cadence',
    children: [
      { id: 'team-retro-formats-claude-delivery', title: 'Team Retrospective Formats for Claude Delivery' },
      { id: 'cross-team-improvement-forums', title: 'Cross-Team Improvement Forums and Guilds' },
      { id: 'retro-action-follow-through', title: 'Retrospective Action Follow-Through Tracking' },
    ],
  },
  {
    parentId: 'continuous-improvement-program--continuous-eval-loops',
    children: [
      { id: 'production-eval-sampling', title: 'Production Eval Sampling and Monitoring' },
      { id: 'eval-drift-detection-response', title: 'Eval Drift Detection and Response Playbooks' },
      { id: 'continuous-eval-ci-integration', title: 'Continuous Eval Integration with CI/CD Loops' },
    ],
  },
]
