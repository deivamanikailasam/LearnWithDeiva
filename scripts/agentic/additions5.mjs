import { addTopics } from './addTopics.mjs'

addTopics([
  /* ---- Finance depth (remaining) ---- */
  {
    id: 'vertical-domain-agents--finance-agents--mifid-sec-compliance',
    title: 'MiFID II & SEC Reporting Compliance',
    parentId: 'vertical-domain-agents--finance-agents',
  },
  {
    id: 'vertical-domain-agents--finance-agents--risk-adjusted-return-modeling',
    title: 'Risk-Adjusted Return Modeling',
    parentId: 'vertical-domain-agents--finance-agents',
  },

  /* ---- Healthcare depth (remaining) ---- */
  {
    id: 'vertical-domain-agents--healthcare-agents--clinical-trial-data-management',
    title: 'Clinical Trial Data Management Agents',
    parentId: 'vertical-domain-agents--healthcare-agents',
  },

  /* ---- Deep Research depth (remaining) ---- */
  {
    id: 'academic-research-pipelines--attributed-report-generation',
    title: 'Attributed Report Generation',
    parentId: 'academic-research-pipelines',
  },
  {
    id: 'academic-research-pipelines--crossref-api',
    title: 'Crossref API Integration',
    parentId: 'academic-research-pipelines',
  },

  /* ---- Scientific Discovery depth (remaining) ---- */
  {
    id: 'scientific-discovery-pipelines--autonomous-lab-agent-architecture',
    title: 'Autonomous Lab Agent Architecture',
    summary: 'Co-scientist and ALAB-style propose → dispatch → observe → update loops.',
    parentId: 'scientific-discovery-pipelines',
  },
  {
    id: 'scientific-discovery-pipelines--scientific-data-formats--cif-crystallography',
    title: 'CIF Crystallography Data',
    parentId: 'scientific-discovery-pipelines--scientific-data-formats',
  },
  {
    id: 'scientific-discovery-pipelines--scientific-data-formats--fastq-genomics',
    title: 'FASTQ Genomics Data',
    parentId: 'scientific-discovery-pipelines--scientific-data-formats',
  },

  /* ---- Industrial / OT depth (remaining) ---- */
  {
    id: 'industrial-ot-agents--manufacturing-quality-agents--computer-vision-defect-detection',
    title: 'Computer Vision for Defect Detection',
    parentId: 'industrial-ot-agents--manufacturing-quality-agents',
  },
  {
    id: 'industrial-ot-agents--warehouse-logistics-agents--wms-integration',
    title: 'WMS Integration Patterns',
    parentId: 'industrial-ot-agents--warehouse-logistics-agents',
  },
  {
    id: 'industrial-ot-agents--supply-chain-optimization-agents--or-tools-integration',
    title: 'OR-Tools & Constraint Optimization',
    parentId: 'industrial-ot-agents--supply-chain-optimization-agents',
  },
  {
    id: 'industrial-ot-agents--energy-grid-agents--grid-topology-reasoning',
    title: 'Grid Topology Reasoning',
    parentId: 'industrial-ot-agents--energy-grid-agents',
  },

  /* ---- AIOps / IaC depth (remaining) ---- */
  {
    id: 'vertical-domain-agents--devops-agents--iac-agent-patterns--terraform-agents',
    title: 'Terraform Agent Patterns',
    parentId: 'vertical-domain-agents--devops-agents--iac-agent-patterns',
  },
  {
    id: 'vertical-domain-agents--devops-agents--iac-agent-patterns--pulumi-agents',
    title: 'Pulumi Agent Patterns',
    parentId: 'vertical-domain-agents--devops-agents--iac-agent-patterns',
  },

  /* ---- SWE agent depth (remaining) ---- */
  {
    id: 'coding-agent-tools--lsp-deep-integration',
    title: 'LSP Deep Integration',
    summary: 'Symbol resolution, go-to-definition, type inference and language-server-driven navigation.',
    parentId: 'coding-agent-tools',
  },

  /* ---- Fine-tuning for agents (remaining) ---- */
  {
    id: 'parameter-efficient-finetuning--rlhf-for-agents',
    title: 'RLHF for Agent Behavior',
    parentId: 'parameter-efficient-finetuning',
  },

  /* ---- CX depth (remaining) ---- */
  {
    id: 'business-enterprise-agents--customer-support-agents--multi-session-state-management',
    title: 'Multi-Session Conversation State Management',
    parentId: 'business-enterprise-agents--customer-support-agents',
  },

  /* ---- Framework gap: Novasys ---- */
  {
    id: 'other-tooling--novasys',
    title: 'Novasys Enterprise Orchestration',
    parentId: 'other-tooling',
  },
])
