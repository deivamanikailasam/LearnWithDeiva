import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { addTopics } from './addTopics.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/agentic-ai')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')
const ROADMAP_FILE = resolve(SUBJECT_DIR, 'roadmap.json')

function topicExists(id) {
  try {
    readFileSync(resolve(TOPICS_DIR, id, 'topic.json'))
    return true
  } catch {
    return false
  }
}

function writeRootTopic(meta) {
  if (topicExists(meta.id)) {
    console.log(`SKIP duplicate root: ${meta.id}`)
    return false
  }
  const dir = resolve(TOPICS_DIR, meta.id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
  console.log(`Added root topic: ${meta.id}`)
  return true
}

function updateRoadmapForEmbodiedRobotics() {
  const roadmap = JSON.parse(readFileSync(ROADMAP_FILE, 'utf8'))
  const stage = roadmap.stages.find((s) => s.id === 'specializations')
  if (!stage) throw new Error('specializations stage not found')
  if (stage.nodes.some((n) => n.topicId === 'embodied-robotics-agents')) {
    console.log('SKIP roadmap node: embodied-robotics-agents already present')
    return
  }
  stage.nodes.push({
    id: 'embodied-robotics-agents',
    title: 'Embodied & Robotics Agents',
    topicId: 'embodied-robotics-agents',
    status: 'core',
    description: 'Physical AI, robotics frameworks, sim-to-real transfer and fleet-scale deployment.',
  })
  writeFileSync(ROADMAP_FILE, JSON.stringify(roadmap, null, 2) + '\n')
  console.log('Updated roadmap.json with embodied-robotics-agents node')
}

writeRootTopic({
  id: 'embodied-robotics-agents',
  title: 'Embodied & Robotics Agents',
  summary: 'Physical AI, robotics middleware, simulation and fleet-scale autonomous deployment.',
  order: 57,
  level: 'advanced',
  tags: ['specializations'],
})

updateRoadmapForEmbodiedRobotics()

addTopics([
  /* ---- Embodied & Robotics Agents (critical gap) ---- */
  {
    id: 'robotics-frameworks',
    title: 'Robotics Frameworks',
    parentId: 'embodied-robotics-agents',
    children: [
      { id: 'ros2-fundamentals', title: 'ROS2 Fundamentals' },
      { id: 'nvidia-isaac-sim', title: 'NVIDIA Isaac Sim & Isaac ROS' },
      { id: 'physics-simulators', title: 'PyBullet & MuJoCo Simulators' },
    ],
  },
  {
    id: 'sim-to-real-transfer',
    title: 'Sim-to-Real Transfer',
    parentId: 'embodied-robotics-agents',
    children: [
      { id: 'domain-randomization', title: 'Domain Randomization' },
      { id: 'domain-adaptation', title: 'Domain Adaptation' },
      { id: 'reality-gap-mitigation', title: 'Reality Gap Mitigation' },
    ],
  },
  {
    id: 'robot-perception',
    title: 'Robot Perception & Sensor Fusion',
    parentId: 'embodied-robotics-agents',
    children: [
      { id: 'sensor-fusion', title: 'LiDAR, Camera & IMU Fusion' },
      { id: 'object-detection-navigation', title: 'Object Detection for Navigation' },
      { id: 'slam-localization', title: 'SLAM & Localization' },
    ],
  },
  {
    id: 'motion-planning',
    title: 'Motion & Path Planning',
    parentId: 'embodied-robotics-agents',
    children: [
      { id: 'path-planning-algorithms', title: 'Path Planning (A*, RRT, PRM)' },
      { id: 'pedestrian-interaction', title: 'Pedestrian Detection & Interaction' },
      { id: 'motor-control-integration', title: 'Motor Control & Actuator Integration' },
    ],
  },
  {
    id: 'robot-fleet-operations',
    title: 'Fleet Management & Deployment',
    parentId: 'embodied-robotics-agents',
    children: [
      { id: 'fleet-coordination', title: 'Fleet Coordination at Scale' },
      { id: 'v2x-infrastructure', title: 'V2X & Infrastructure Communication' },
      { id: 'sim-to-production-ops', title: 'Sim-to-Production Operations' },
    ],
  },

  /* ---- Scientific Discovery (deep gap) ---- */
  {
    id: 'scientific-discovery-pipelines',
    title: 'Scientific Discovery Pipelines',
    parentId: 'research-agents',
    children: [
      { id: 'hypothesis-experiment-loop', title: 'Hypothesis-Experiment-Observe Loops' },
      { id: 'lab-automation-apis', title: 'Lab Automation & Instrument APIs' },
      { id: 'design-of-experiments', title: 'Design of Experiments (DoE)' },
      { id: 'bayesian-experiment-optimization', title: 'Bayesian Optimization of Experiments' },
      { id: 'scientific-knowledge-graphs', title: 'Scientific Knowledge Graph Reasoning' },
      { id: 'scientific-data-formats', title: 'Scientific Data Formats (HDF5, netCDF, FASTA)' },
    ],
  },

  /* ---- Deep Research Pipelines ---- */
  {
    id: 'academic-research-pipelines',
    title: 'Academic Research Pipelines',
    parentId: 'research-agents',
    children: [
      { id: 'citation-source-pipelines', title: 'Citation & Source Attribution Pipelines' },
      { id: 'academic-database-apis', title: 'Academic Database APIs (arXiv, Semantic Scholar, PubMed)' },
      { id: 'research-paper-parsing', title: 'Research Paper Parsing (PDF, Tables, Figures)' },
      { id: 'multi-hop-document-chaining', title: 'Multi-Hop Document Chaining' },
    ],
  },

  /* ---- Fine-Tuning for Specialized Agents ---- */
  {
    id: 'parameter-efficient-finetuning',
    title: 'Parameter-Efficient Fine-Tuning',
    parentId: 'training-llms',
    children: [
      { id: 'lora-qlora', title: 'LoRA & QLoRA' },
      { id: 'dpo-preference-alignment', title: 'DPO & Preference Alignment' },
      { id: 'domain-adaptation-for-agents', title: 'Domain Adaptation for Agents' },
    ],
  },

  /* ---- Finance & Trading (deep gap) ---- */
  { id: 'vertical-domain-agents--finance-agents--market-data-integration', title: 'Market Data Integration', parentId: 'vertical-domain-agents--finance-agents' },
  { id: 'vertical-domain-agents--finance-agents--backtesting-pipelines', title: 'Backtesting Pipeline Architecture', parentId: 'vertical-domain-agents--finance-agents' },
  { id: 'vertical-domain-agents--finance-agents--portfolio-optimization', title: 'Portfolio Optimization Algorithms', parentId: 'vertical-domain-agents--finance-agents' },
  { id: 'vertical-domain-agents--finance-agents--time-series-reasoning', title: 'Time-Series Reasoning for Finance', parentId: 'vertical-domain-agents--finance-agents' },
  { id: 'vertical-domain-agents--finance-agents--oms-integration', title: 'Order Management System Integration', parentId: 'vertical-domain-agents--finance-agents' },
  { id: 'vertical-domain-agents--finance-agents--trading-compliance', title: 'Pre-Trade Compliance & Position Limits', parentId: 'vertical-domain-agents--finance-agents' },

  /* ---- Healthcare (deep gap) ---- */
  { id: 'vertical-domain-agents--healthcare-agents--fhir-integration', title: 'HL7 FHIR Integration', parentId: 'vertical-domain-agents--healthcare-agents' },
  { id: 'vertical-domain-agents--healthcare-agents--clinical-nlp', title: 'Clinical NLP (ICD, SNOMED, PHI De-identification)', parentId: 'vertical-domain-agents--healthcare-agents' },
  { id: 'vertical-domain-agents--healthcare-agents--differential-diagnosis', title: 'Differential Diagnosis Architectures', parentId: 'vertical-domain-agents--healthcare-agents' },
  { id: 'vertical-domain-agents--healthcare-agents--ehr-integration-patterns', title: 'EHR Integration (Epic SMART on FHIR, Cerner CDS Hooks)', parentId: 'vertical-domain-agents--healthcare-agents' },
  { id: 'vertical-domain-agents--healthcare-agents--samd-regulatory', title: 'SaMD Regulatory Pathways (FDA, TGA)', parentId: 'vertical-domain-agents--healthcare-agents' },

  /* ---- AIOps / SRE Agents (moderate gap) ---- */
  { id: 'vertical-domain-agents--devops-agents--runbook-automation', title: 'Runbook-to-Agent Automation', parentId: 'vertical-domain-agents--devops-agents' },
  { id: 'vertical-domain-agents--devops-agents--alert-correlation', title: 'Alert Correlation & Noise Reduction', parentId: 'vertical-domain-agents--devops-agents' },
  { id: 'vertical-domain-agents--devops-agents--log-analysis-pipelines', title: 'Log Analysis Agent Pipelines', parentId: 'vertical-domain-agents--devops-agents' },
  { id: 'vertical-domain-agents--devops-agents--iac-agent-patterns', title: 'Infrastructure-as-Code Agent Patterns', parentId: 'vertical-domain-agents--devops-agents' },
  { id: 'vertical-domain-agents--devops-agents--kubernetes-native-agents', title: 'Kubernetes-Native Agent Patterns', parentId: 'vertical-domain-agents--devops-agents' },

  /* ---- HR & People-Ops (shallow domain) ---- */
  { id: 'business-enterprise-agents--hr-recruiting-agents--ats-integration', title: 'ATS API Integration (Greenhouse, Lever, Workday)', parentId: 'business-enterprise-agents--hr-recruiting-agents' },
  { id: 'business-enterprise-agents--hr-recruiting-agents--resume-parsing', title: 'Resume Parsing & Structured Extraction', parentId: 'business-enterprise-agents--hr-recruiting-agents' },
  { id: 'business-enterprise-agents--hr-recruiting-agents--interview-scheduling', title: 'Interview Scheduling Automation', parentId: 'business-enterprise-agents--hr-recruiting-agents' },
  { id: 'business-enterprise-agents--hr-recruiting-agents--bias-fairness', title: 'Bias Detection & Fairness in Recruiting', parentId: 'business-enterprise-agents--hr-recruiting-agents' },

  /* ---- Travel & CX (shallow domain) ---- */
  { id: 'personal-productivity-agents--booking-travel-agents--gds-integration', title: 'GDS Integration (Amadeus, Sabre, Travelport)', parentId: 'personal-productivity-agents--booking-travel-agents' },
  { id: 'personal-productivity-agents--booking-travel-agents--dynamic-pricing', title: 'Real-Time Availability & Dynamic Pricing', parentId: 'personal-productivity-agents--booking-travel-agents' },
  { id: 'personal-productivity-agents--booking-travel-agents--multi-session-state', title: 'Multi-Session Conversation State Management', parentId: 'personal-productivity-agents--booking-travel-agents' },

  /* ---- Industrial / OT Systems (significant gap) ---- */
  {
    id: 'industrial-ot-agents',
    title: 'Industrial & OT Agents',
    parentId: 'vertical-domain-agents',
    children: [
      { id: 'manufacturing-quality-agents', title: 'Manufacturing Quality Agents' },
      { id: 'warehouse-logistics-agents', title: 'Warehouse & Logistics Agents' },
      { id: 'supply-chain-optimization-agents', title: 'Supply Chain Optimization Agents' },
      { id: 'energy-grid-agents', title: 'Energy Grid Optimization Agents' },
      { id: 'environmental-monitoring-agents', title: 'Environmental Monitoring Agents' },
      { id: 'scada-mes-integration', title: 'SCADA & MES Integration' },
    ],
  },

  /* ---- Enterprise System Integrations ---- */
  {
    id: 'enterprise-system-integrations',
    title: 'Enterprise System Integrations',
    parentId: 'integration-patterns',
    children: [
      { id: 'erp-api-patterns', title: 'ERP API Patterns (SAP, Oracle, Dynamics)' },
      { id: 'ats-api-patterns', title: 'ATS API Patterns (Greenhouse, Lever, Workday)' },
      { id: 'gds-travel-apis', title: 'GDS Travel APIs (Amadeus, Sabre)' },
      { id: 'ehr-fhir-integration', title: 'EHR & FHIR Integration Patterns' },
      { id: 'crm-workflow-automation', title: 'CRM Workflow Automation (Salesforce, HubSpot)' },
    ],
  },

  /* ---- Transaction Analysis & Compliance ---- */
  {
    id: 'transaction-analysis-agents',
    title: 'Transaction Analysis Agents',
    parentId: 'data-analytics-agents',
    children: [
      { id: 'streaming-event-ingestion', title: 'Streaming Event Ingestion for Agents' },
      { id: 'anomaly-detection-pipelines', title: 'Anomaly Detection Pipelines' },
      { id: 'fraud-compliance-agents', title: 'Fraud & Compliance Agents' },
    ],
  },

  /* ---- GTM / RevOps ---- */
  {
    id: 'gtm-revops-agents',
    title: 'GTM & RevOps Agents',
    parentId: 'business-enterprise-agents',
    children: [
      { id: 'outreach-automation', title: 'Autonomous Outreach & Follow-Up' },
      { id: 'crm-analytics-integration', title: 'CRM & Analytics Integration' },
      { id: 'pipeline-forecasting', title: 'Pipeline Forecasting & Revenue Ops' },
    ],
  },

  /* ---- SWE Agent depth ---- */
  { id: 'swe-agents--diff-application-strategies', title: 'Diff Application at Repository Scale', parentId: 'swe-agents' },
  { id: 'swe-agents--massive-parallel-execution', title: 'Massively Parallel Async Execution', parentId: 'swe-agents' },

  /* ---- Multi-Agent Debate Measurement ---- */
  { id: 'debate-consensus--aggregate-reasoning-metrics', title: 'Aggregate Reasoning Quality Metrics', parentId: 'debate-consensus' },

  /* ---- Composable Agent Services ---- */
  {
    id: 'agent-service-meshes',
    title: 'Composable Agent Service Meshes',
    parentId: 'application-patterns',
    level: 'advanced',
    children: [
      { id: 'agent-service-composition', title: 'Agent Service Composition' },
      { id: 'agent-mesh-orchestration', title: 'Agent Mesh Orchestration' },
      { id: 'autopilot-ecosystems', title: 'Autopilot Agent Ecosystems' },
    ],
  },
])
