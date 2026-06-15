import { addTopics } from './addTopics.mjs'

addTopics([
  /* ---- Foundations: APIs, Async & Networking ---- */
  {
    id: 'web-frameworks',
    title: 'Web Frameworks & Servers',
    parentId: 'apis-async-networking',
    children: [
      { id: 'fastapi', title: 'FastAPI' },
      { id: 'flask', title: 'Flask' },
      { id: 'asgi-wsgi', title: 'ASGI & WSGI' },
      { id: 'building-rest-apis', title: 'Building REST APIs' },
    ],
  },
  {
    id: 'message-queues',
    title: 'Message Queues & Brokers',
    parentId: 'apis-async-networking',
    children: [
      { id: 'redis', title: 'Redis' },
      { id: 'rabbitmq', title: 'RabbitMQ' },
      { id: 'kafka', title: 'Kafka' },
      { id: 'task-queues-celery', title: 'Task Queues (Celery)' },
    ],
  },

  /* ---- Foundations: Software Engineering ---- */
  {
    id: 'databases',
    title: 'Databases',
    parentId: 'software-engineering',
    children: [
      { id: 'sql-databases', title: 'SQL Databases' },
      { id: 'nosql-databases', title: 'NoSQL Databases' },
      { id: 'orms', title: 'ORMs' },
      { id: 'migrations', title: 'Schema Migrations' },
    ],
  },

  /* ---- Prompting ---- */
  {
    id: 'multimodal-prompting',
    title: 'Multimodal Prompting',
    parentId: 'prompting-fundamentals',
    level: 'intermediate',
    children: [
      { id: 'image-prompting', title: 'Image Prompting' },
      { id: 'document-prompting', title: 'Document Prompting' },
      { id: 'audio-prompting', title: 'Audio Prompting' },
      { id: 'multimodal-few-shot', title: 'Multimodal Few-Shot' },
    ],
  },

  /* ---- Tool Use & Function Calling ---- */
  {
    id: 'built-in-tools',
    title: 'Built-In & Hosted Tools',
    parentId: 'function-calling',
    children: [
      { id: 'hosted-web-search', title: 'Hosted Web Search' },
      { id: 'code-interpreter-tool', title: 'Code Interpreter Tool' },
      { id: 'file-search-tool', title: 'File Search Tool' },
      { id: 'image-generation-tool', title: 'Image Generation Tool' },
    ],
  },
  {
    id: 'mcp-advanced',
    title: 'MCP Advanced',
    parentId: 'model-context-protocol',
    level: 'advanced',
    children: [
      { id: 'mcp-elicitation', title: 'Elicitation' },
      { id: 'mcp-sampling', title: 'Sampling' },
      { id: 'mcp-roots', title: 'Roots' },
      { id: 'mcp-resource-templates', title: 'Resource Templates' },
      { id: 'oauth-for-mcp', title: 'OAuth for MCP' },
    ],
  },

  /* ---- RAG ---- */
  { id: 'ingestion-indexing--document-parsing-ocr', title: 'Document Parsing & OCR', parentId: 'ingestion-indexing' },
  {
    id: 'late-interaction-retrieval',
    title: 'Late-Interaction Retrieval',
    parentId: 'advanced-retrieval',
    children: [
      { id: 'colbert', title: 'ColBERT' },
      { id: 'multi-vector-retrieval', title: 'Multi-Vector Retrieval' },
      { id: 'late-chunking', title: 'Late Chunking' },
    ],
  },

  /* ---- Frameworks ---- */
  {
    id: 'cloud-agent-services',
    title: 'Cloud Agent Services',
    parentId: 'other-frameworks',
    children: [
      { id: 'bedrock-agents', title: 'Amazon Bedrock Agents' },
      { id: 'azure-ai-agent-service', title: 'Azure AI Foundry Agent Service' },
      { id: 'vertex-ai-agent-builder', title: 'Vertex AI Agent Builder' },
      { id: 'openai-assistants-api', title: 'OpenAI Assistants API' },
    ],
  },

  /* ---- Safety, Security & Guardrails ---- */
  {
    id: 'red-teaming',
    title: 'Red Teaming',
    parentId: 'agent-security',
    children: [
      { id: 'red-teaming-agents', title: 'Red-Teaming Agents' },
      { id: 'adversarial-testing', title: 'Adversarial Testing' },
      { id: 'attack-simulation', title: 'Attack Simulation' },
      { id: 'bug-bounties', title: 'Bug Bounties' },
    ],
  },
])
