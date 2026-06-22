/**
 * Sub-subtopic attachments for Agentic AI stages 19 and 20.
 *
 * Adapts the GenAI enterprise/lifecycle scaffold with agentic-AI parent ids
 * and titles, plus agent-specific groups that do not exist in the GenAI tree.
 */
import {
  STAGE19_ENTERPRISE as GENAI_STAGE19,
  STAGE20_LIFECYCLE as GENAI_STAGE20,
} from '../../gen-ai/data/stage19-20-subsubtopics.mjs'

/** Map GenAI enterprise parent ids to Agentic AI subtopic ids. */
export function mapParentId(id) {
  const exact = {
    'change-enablement--genai-champions-network': 'change-enablement--champions-network',
    'engineering-standards--genai-style-guide': 'engineering-standards--prompt-engineering-standards',
    'engineering-standards--definition-of-done': 'engineering-standards--definition-of-done-enterprise',
    'developer-platform-program--genai-starter-templates': 'developer-platform--agent-starter-templates',
    'developer-platform-program--shared-genai-libraries': 'developer-platform--shared-libraries-sdks',
    'enterprise-data-governance--data-classification-program':
      'enterprise-data-governance--data-classification',
    'enterprise-finops-program--unit-economics': 'enterprise-finops--unit-economics-per-task',
    'procurement-sourcing--contract-sla-negotiation': 'procurement-sourcing--contract-negotiation',
    'implementation-build-phase--trunk-based-development-practice':
      'implementation-build-phase--trunk-based-development',
    'production-readiness--rollback-strategy-process': 'production-readiness--rollback-strategy',
    'testing-validation-phase--accessibility-testing-program':
      'testing-validation-phase--accessibility-testing',
  }
  if (exact[id]) return exact[id]
  return id
    .replace(/^enterprise-genai-strategy/, 'enterprise-ai-strategy')
    .replace(/^developer-platform-program/, 'developer-platform')
    .replace(/^enterprise-finops-program/, 'enterprise-finops')
    .replace(/^operations-sre-program/, 'operations-sre')
    .replace(/^support-maintenance-program/, 'support-maintenance')
    .replace(/--genai-/g, '--ai-')
}

/** Retitle GenAI-oriented leaves for agentic AI delivery. */
export function transformTitle(title) {
  return title
    .replace(/\bGenAI Use Cases\b/g, 'Agent Use Cases')
    .replace(/\bGenAI Feature Experiments\b/g, 'Agent Capability Experiments')
    .replace(/\bGenAI Feature Delivery\b/g, 'Agent Capability Delivery')
    .replace(/\bGenAI Feature Discovery\b/g, 'Agent Capability Discovery')
    .replace(/\bGenAI Feature\b/g, 'Agent Capability')
    .replace(/\bGenAI applications\b/g, 'agentic applications')
    .replace(/\bGenAI application pipelines\b/g, 'agent application pipelines')
    .replace(/\bGenAI Apps\b/g, 'Agentic Applications')
    .replace(/\bGenAI apps\b/g, 'agentic applications')
    .replace(/\bGenAI Products\b/g, 'Agentic Products')
    .replace(/\bGenAI products\b/g, 'agentic products')
    .replace(/\bGenAI Services\b/g, 'Agent Services')
    .replace(/\bGenAI services\b/g, 'agent services')
    .replace(/\bGenAI Systems\b/g, 'Agent Systems')
    .replace(/\bGenAI systems\b/g, 'agent systems')
    .replace(/\bGenAI Workloads\b/g, 'Agent Workloads')
    .replace(/\bGenAI workloads\b/g, 'agent workloads')
    .replace(/\bGenAI Teams\b/g, 'Agent Teams')
    .replace(/\bGenAI teams\b/g, 'agent teams')
    .replace(/\bGenAI Programs\b/g, 'Agent Programs')
    .replace(/\bGenAI programs\b/g, 'agent programs')
    .replace(/\bGenAI Initiatives\b/g, 'Agent Initiatives')
    .replace(/\bGenAI initiatives\b/g, 'agent initiatives')
    .replace(/\bGenAI Integrations\b/g, 'Agent Integrations')
    .replace(/\bGenAI integrations\b/g, 'agent integrations')
    .replace(/\bGenAI Delivery\b/g, 'Agent Delivery')
    .replace(/\bGenAI delivery\b/g, 'agent delivery')
    .replace(/\bGenAI Stakeholders\b/g, 'Agent Stakeholders')
    .replace(/\bGenAI stakeholders\b/g, 'agent stakeholders')
    .replace(/\bGenAI Data Flows\b/g, 'Agent Data Flows')
    .replace(/\bGenAI data flows\b/g, 'agent data flows')
    .replace(/\bGenAI Traffic\b/g, 'Agent Traffic')
    .replace(/\bGenAI traffic\b/g, 'agent traffic')
    .replace(/\bGenAI Changes\b/g, 'Agent Changes')
    .replace(/\bGenAI changes\b/g, 'agent changes')
    .replace(/\bGenAI Ecosystem Tools\b/g, 'Agent Ecosystem Tools')
    .replace(/\bGenAI Ecosystem\b/g, 'Agent Ecosystem')
    .replace(/\bGenAI ecosystem\b/g, 'agent ecosystem')
    .replace(/\bGenAI Components\b/g, 'Agent Platform Components')
    .replace(/\bGenAI Tools\b/g, 'Agent Tools')
    .replace(/\bGenAI tools\b/g, 'agent tools')
    .replace(/\bGenAI Troubleshooting\b/g, 'Agent Troubleshooting')
    .replace(/\bGenAI Deploy\b/g, 'Agent Deploy')
    .replace(/\bGenAI deploy\b/g, 'agent deploy')
    .replace(/\bfor GenAI\b/g, 'for Agentic AI')
    .replace(/\bGenAI\b/g, 'Agentic AI')
    .replace(
      /\bRAG Reference Architecture for Enterprise Agentic AI\b/g,
      'RAG Reference Architecture for Enterprise Agents',
    )
    .replace(
      /\bAgent Orchestration Reference Patterns\b/g,
      'Multi-Agent Orchestration Reference Patterns',
    )
}

function adaptAttachments(groups) {
  return groups.map(({ parentId, children }) => ({
    parentId: mapParentId(parentId),
    children: children.map((child) => ({
      ...child,
      title: transformTitle(child.title),
    })),
  }))
}

/** Agentic-AI-only subtopics with no GenAI scaffold equivalent. */
const AGENTIC_ONLY = [
  {
    parentId: 'procurement-sourcing--model-evaluation-framework',
    children: [
      { id: 'benchmark-selection-criteria', title: 'Model Benchmark Selection Criteria for Agents' },
      { id: 'agent-capability-eval-harness', title: 'Agent Capability Evaluation Harness Design' },
      { id: 'model-comparison-scorecards', title: 'Model Comparison Scorecards for Tool-Use Quality' },
    ],
  },
  {
    parentId: 'procurement-sourcing--multi-vendor-strategy',
    children: [
      { id: 'vendor-failover-routing', title: 'Multi-Vendor Failover and Model Routing Strategy' },
      { id: 'model-abstraction-layer', title: 'Model Abstraction Layer for Vendor Portability' },
      { id: 'vendor-concentration-risk', title: 'Vendor Concentration Risk and Mitigation Planning' },
    ],
  },
  {
    parentId: 'procurement-sourcing--model-sourcing-policy',
    children: [
      { id: 'approved-model-registry', title: 'Approved Model Registry and Usage Tiers' },
      { id: 'model-approval-exceptions', title: 'Model Approval Exceptions and Waiver Process' },
      { id: 'open-vs-closed-model-policy', title: 'Open-Weight vs Closed-Model Sourcing Policy' },
    ],
  },
  {
    parentId: 'procurement-sourcing--tool-marketplace-governance',
    children: [
      { id: 'tool-approval-workflow', title: 'Enterprise Tool Approval Workflow for Agents' },
      { id: 'marketplace-security-review', title: 'Tool Marketplace Security and Compliance Review' },
      { id: 'tool-lifecycle-deprecation', title: 'Tool Lifecycle, Deprecation and Replacement Policy' },
    ],
  },
  {
    parentId: 'risk-compliance-program--model-risk-management',
    children: [
      { id: 'agent-mrm-framework', title: 'Model Risk Management Framework for Agent Systems' },
      { id: 'agent-model-validation', title: 'Model Validation for Agentic Decision Paths' },
      { id: 'ongoing-agent-drift-monitoring', title: 'Ongoing Monitoring for Agent Behavior Drift' },
    ],
  },
  {
    parentId: 'risk-compliance-program--model-cards-datasheets',
    children: [
      { id: 'agent-system-cards', title: 'Agent System Cards and Capability Disclosures' },
      { id: 'tool-capability-datasheets', title: 'Tool Capability Datasheets and Limitations' },
      { id: 'model-card-maintenance-cadence', title: 'Model Card Maintenance and Review Cadence' },
    ],
  },
  {
    parentId: 'risk-compliance-program--algorithmic-impact-assessment',
    children: [
      { id: 'agent-impact-assessment-template', title: 'Algorithmic Impact Assessment Template for Agents' },
      { id: 'high-risk-agent-classification', title: 'High-Risk Agent Classification Criteria' },
      { id: 'impact-mitigation-tracking', title: 'Impact Mitigation Plans and Tracking' },
    ],
  },
  {
    parentId: 'enterprise-finops--commitments-discounts',
    children: [
      { id: 'token-capacity-commitments', title: 'Token Capacity Commitments and Reservations' },
      { id: 'enterprise-discount-negotiation', title: 'Enterprise Discount and EDP Negotiation for LLM APIs' },
      { id: 'commitment-utilization-tracking', title: 'Commitment Utilization Tracking and True-Ups' },
    ],
  },
  {
    parentId: 'legal-ethical-governance--ai-ethics-board',
    children: [
      { id: 'ethics-board-charter', title: 'AI Ethics Board Charter, Scope and Membership' },
      { id: 'agent-use-case-ethics-review', title: 'Agent Use-Case Ethics Review Gates' },
      { id: 'ethics-decision-appeals', title: 'Ethics Decision Appeals and Escalation Process' },
    ],
  },
  {
    parentId: 'testing-validation-phase--eval-as-tests',
    children: [
      { id: 'trajectory-eval-ci-gates', title: 'Trajectory Evaluations as CI Quality Gates' },
      { id: 'tool-use-regression-tests', title: 'Tool-Use Regression Tests in CI Pipelines' },
      { id: 'eval-dataset-versioning-ci', title: 'Eval Dataset Versioning and CI Promotion Rules' },
    ],
  },
  {
    parentId: 'observability-program--agent-trace-governance',
    children: [
      { id: 'trace-retention-redaction', title: 'Agent Trace Retention and PII Redaction Policy' },
      { id: 'conversation-log-access', title: 'Conversation Log Access Controls and Audit Trails' },
      { id: 'trace-sampling-debugging', title: 'Trace Sampling Strategy for Agent Debugging' },
    ],
  },
  {
    parentId: 'continuous-improvement-program--continuous-learning-loops',
    children: [
      { id: 'production-feedback-to-prompts', title: 'Production Feedback Loops into Prompt and Policy Updates' },
      { id: 'trajectory-learning-pipelines', title: 'Trajectory Learning Pipelines from Production Runs' },
      { id: 'human-feedback-reinforcement', title: 'Human Feedback Reinforcement for Agent Improvement' },
    ],
  },
]

export const STAGE19_ENTERPRISE = adaptAttachments(GENAI_STAGE19)
export const STAGE20_LIFECYCLE = adaptAttachments(GENAI_STAGE20)

/** All attachments for stages 19–20, including agentic-only groups. */
export const ALL_ATTACHMENTS = [
  ...STAGE19_ENTERPRISE,
  ...STAGE20_LIFECYCLE,
  ...AGENTIC_ONLY,
]
