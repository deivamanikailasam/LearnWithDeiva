import { addTopics } from './addTopics.mjs'

addTopics([
  /* ---- SWE Agents (remaining) ---- */
  {
    id: 'coding-agent-fundamentals--repository-context-management',
    title: 'Repository-Level Context Management',
    summary: 'Indexing, dependency graphs, cross-file symbol maps and long-horizon repo state for Devin-scale agents.',
    parentId: 'coding-agent-fundamentals',
  },

  /* ---- Deep Research (remaining) ---- */
  {
    id: 'academic-research-pipelines--large-scale-literature-synthesis',
    title: 'Large-Scale Literature Synthesis',
    summary: 'Synthesizing findings across hundreds of papers with deduplication, clustering and evidence ranking.',
    parentId: 'academic-research-pipelines',
  },

  /* ---- Robotics perception depth (remaining) ---- */
  {
    id: 'robot-perception--semantic-segmentation',
    title: 'Semantic Segmentation for Robots',
    parentId: 'robot-perception',
  },
  {
    id: 'robot-perception--depth-estimation',
    title: 'Depth Estimation Pipelines',
    parentId: 'robot-perception',
  },
  {
    id: 'motion-planning--potential-field-navigation',
    title: 'Potential Field Navigation',
    parentId: 'motion-planning',
  },

  /* ---- Industrial / OT depth (remaining) ---- */
  {
    id: 'industrial-ot-agents--warehouse-logistics-agents--pick-path-optimization',
    title: 'Pick-Path Optimization',
    parentId: 'industrial-ot-agents--warehouse-logistics-agents',
  },
  {
    id: 'industrial-ot-agents--supply-chain-optimization-agents--demand-forecasting-agents',
    title: 'Demand Forecasting Agents',
    parentId: 'industrial-ot-agents--supply-chain-optimization-agents',
  },
  {
    id: 'industrial-ot-agents--energy-grid-agents--real-time-constraint-management',
    title: 'Real-Time Constraint Management',
    parentId: 'industrial-ot-agents--energy-grid-agents',
  },
  {
    id: 'industrial-ot-agents--environmental-monitoring-agents--sensor-network-integration',
    title: 'Sensor Network Integration',
    parentId: 'industrial-ot-agents--environmental-monitoring-agents',
  },
  {
    id: 'industrial-ot-agents--environmental-monitoring-agents--geospatial-reasoning',
    title: 'Geospatial Reasoning for Agents',
    parentId: 'industrial-ot-agents--environmental-monitoring-agents',
  },
  {
    id: 'industrial-ot-agents--environmental-monitoring-agents--climate-data-agents',
    title: 'Climate Data Agents',
    parentId: 'industrial-ot-agents--environmental-monitoring-agents',
  },

  /* ---- No-code builders (remaining) ---- */
  {
    id: 'no-code-agent-builders--hands-on-build-patterns',
    title: 'Hands-On Build Patterns',
    summary: 'End-to-end agent build walkthroughs with n8n, Flowise, Langflow and Dify.',
    parentId: 'no-code-agent-builders',
  },

  /* ---- Emerging / data pipelines (remaining) ---- */
  {
    id: 'data-analytics-agents--data-pipeline-agents--self-healing-pipelines',
    title: 'Self-Healing Data Pipelines',
    parentId: 'data-analytics-agents--data-pipeline-agents',
  },
])
