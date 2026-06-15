import { addTopics } from './addTopics.mjs'

addTopics([
  /* ---- Foundations ---- */
  {
    id: 'cloud-fundamentals',
    title: 'Cloud Fundamentals',
    parentId: 'software-engineering',
    children: [
      { id: 'aws-basics', title: 'AWS Basics' },
      { id: 'gcp-basics', title: 'GCP Basics' },
      { id: 'azure-basics', title: 'Azure Basics' },
      { id: 'serverless-basics', title: 'Serverless Basics' },
    ],
  },
  { id: 'async-programming--threading', title: 'Threading', parentId: 'async-programming' },
  { id: 'async-programming--multiprocessing', title: 'Multiprocessing', parentId: 'async-programming' },
  { id: 'async-programming--gil', title: 'The GIL', parentId: 'async-programming' },

  /* ---- AI & LLM Foundations ---- */
  { id: 'text-generation--logprobs', title: 'Logprobs & Token Probabilities', parentId: 'text-generation' },
  { id: 'text-generation--logit-bias', title: 'Logit Bias', parentId: 'text-generation' },

  /* ---- Reasoning & Planning ---- */
  { id: 'verification-critique--process-reward-models', title: 'Process Reward Models (PRM)', parentId: 'verification-critique' },
  { id: 'reasoning-paradigms--self-discover', title: 'Self-Discover', parentId: 'reasoning-paradigms' },
  { id: 'advanced-reasoning-prompts--buffer-of-thoughts', title: 'Buffer of Thoughts', parentId: 'advanced-reasoning-prompts' },

  /* ---- Tool Use ---- */
  {
    id: 'tool-integration-platforms',
    title: 'Tool Integration Platforms',
    parentId: 'tool-design',
    children: [
      { id: 'composio', title: 'Composio' },
      { id: 'arcade', title: 'Arcade.dev' },
      { id: 'zapier-ai-actions', title: 'Zapier AI Actions' },
      { id: 'connector-marketplaces', title: 'Connector Marketplaces' },
    ],
  },

  /* ---- Memory & Knowledge ---- */
  { id: 'memory-frameworks--zep', title: 'Zep', parentId: 'memory-frameworks' },
  { id: 'memory-frameworks--graphiti', title: 'Graphiti', parentId: 'memory-frameworks' },
  { id: 'memory-frameworks--cognee', title: 'Cognee', parentId: 'memory-frameworks' },

  /* ---- Building Agentic Applications ---- */
  {
    id: 'auth-multitenancy',
    title: 'Auth & Multi-Tenancy',
    parentId: 'application-patterns',
    level: 'advanced',
    children: [
      { id: 'user-authentication', title: 'User Authentication' },
      { id: 'multi-tenancy', title: 'Multi-Tenancy' },
      { id: 'per-user-isolation', title: 'Per-User Isolation' },
      { id: 'api-key-management', title: 'API Key Management' },
    ],
  },

  /* ---- Safety, Security & Guardrails ---- */
  {
    id: 'ai-regulation',
    title: 'AI Regulation & Standards',
    parentId: 'agent-safety',
    children: [
      { id: 'eu-ai-act', title: 'EU AI Act' },
      { id: 'nist-ai-rmf', title: 'NIST AI RMF' },
      { id: 'iso-42001', title: 'ISO/IEC 42001' },
      { id: 'transparency-requirements', title: 'Transparency Requirements' },
    ],
  },

  /* ---- Advanced Agent Types & Specializations ---- */
  { id: 'research-agents--scientific-discovery', title: 'Scientific Discovery Agents', parentId: 'research-agents' },
  { id: 'vertical-domain-agents--cybersecurity-agents', title: 'Cybersecurity Agents', parentId: 'vertical-domain-agents' },
  { id: 'vertical-domain-agents--devops-agents', title: 'DevOps & SRE Agents', parentId: 'vertical-domain-agents' },
  { id: 'vertical-domain-agents--marketing-agents', title: 'Marketing Agents', parentId: 'vertical-domain-agents' },
])
