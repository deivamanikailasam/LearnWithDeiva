import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'frontier-career',
  rootStartOrder: 109,
  tree: [
    {
      id: 'emerging-trends',
      title: 'Emerging Trends',
      summary: 'Where NoSQL and data systems are heading as of 2026.',
      level: 'advanced',
      children: [
        {
          id: 'serverless-edge-trends',
          title: 'Serverless & Edge',
          children: [
            { id: 'serverless-databases-trend', title: 'Serverless Databases' },
            { id: 'edge-databases', title: 'Edge Databases' },
            { id: 'local-first-software', title: 'Local-First Software' },
            { id: 'database-at-the-edge', title: 'Compute & Data at the Edge' },
          ],
        },
        {
          id: 'convergence-trends',
          title: 'Convergence',
          children: [
            { id: 'multi-model-convergence', title: 'Multi-Model Convergence' },
            { id: 'htap-convergence', title: 'HTAP Convergence' },
            { id: 'translytical', title: 'Translytical Databases' },
            { id: 'sql-nosql-blur', title: 'Blurring SQL/NoSQL Lines' },
            { id: 'lakehouse-convergence', title: 'Lakehouse Convergence' },
          ],
        },
        {
          id: 'storage-trends',
          title: 'Storage & Architecture Trends',
          children: [
            { id: 'separation-storage-compute', title: 'Separation of Storage & Compute' },
            { id: 'object-storage-as-primary', title: 'Object Storage as Primary' },
            { id: 'disaggregated-databases', title: 'Disaggregated Databases' },
            { id: 'wasm-databases', title: 'WebAssembly in Databases' },
          ],
        },
      ],
    },
    {
      id: 'ai-and-databases',
      title: 'AI & Databases',
      summary: 'The deepening relationship between AI and data systems.',
      level: 'advanced',
      children: [
        {
          id: 'ai-native-databases',
          title: 'AI-Native Databases',
          children: [
            { id: 'vector-native-trend', title: 'Vector-Native Databases' },
            { id: 'embedded-ai-functions', title: 'In-Database AI Functions' },
            { id: 'rag-as-a-feature', title: 'RAG as a Built-In Feature' },
            { id: 'agentic-data-access', title: 'Agentic Data Access' },
          ],
        },
        {
          id: 'ai-for-database-ops',
          title: 'AI for Database Operations',
          children: [
            { id: 'autonomous-databases', title: 'Autonomous / Self-Driving Databases' },
            { id: 'ai-query-optimization', title: 'AI Query Optimization' },
            { id: 'ai-index-tuning', title: 'AI-Driven Index Tuning' },
            { id: 'nl-to-query', title: 'Natural Language to Query' },
          ],
        },
        {
          id: 'mcp-databases',
          title: 'LLM & Tooling Integration',
          children: [
            { id: 'mcp-for-databases', title: 'Model Context Protocol (MCP) for DBs' },
            { id: 'llm-data-agents', title: 'LLM Data Agents' },
            { id: 'text2sql-text2query', title: 'Text-to-Query Tools' },
          ],
        },
      ],
    },
    {
      id: 'research-frontiers',
      title: 'Research Frontiers',
      summary: 'Open problems and academic directions in NoSQL and databases.',
      level: 'advanced',
      children: [
        {
          id: 'research-topics',
          title: 'Research Topics',
          children: [
            { id: 'learned-indexes', title: 'Learned Indexes' },
            { id: 'new-consistency-models', title: 'New Consistency Models' },
            { id: 'crdt-research', title: 'CRDT Research' },
            { id: 'serverless-oltp-research', title: 'Serverless OLTP' },
            { id: 'confidential-computing-db', title: 'Confidential Computing' },
          ],
        },
        {
          id: 'hardware-trends',
          title: 'Hardware Trends',
          children: [
            { id: 'nvme-storage', title: 'NVMe & Fast Storage' },
            { id: 'persistent-memory', title: 'Persistent Memory' },
            { id: 'rdma-networking', title: 'RDMA Networking' },
            { id: 'computational-storage', title: 'Computational Storage' },
          ],
        },
      ],
    },
    {
      id: 'learning-resources',
      title: 'Learning Resources',
      summary: 'Where to keep learning about NoSQL and data systems.',
      level: 'beginner',
      children: [
        {
          id: 'books-papers',
          title: 'Books & Papers',
          children: [
            { id: 'ddia-book', title: 'Designing Data-Intensive Applications' },
            { id: 'foundational-papers', title: 'Foundational Papers' },
            { id: 'database-internals-book', title: 'Database Internals' },
          ],
        },
        {
          id: 'online-resources',
          title: 'Online Resources',
          children: [
            { id: 'official-docs', title: 'Official Documentation' },
            { id: 'courses-tutorials', title: 'Courses & Tutorials' },
            { id: 'blogs-newsletters', title: 'Blogs & Newsletters' },
            { id: 'communities', title: 'Communities & Forums' },
          ],
        },
        {
          id: 'hands-on-practice',
          title: 'Hands-On Practice',
          children: [
            { id: 'building-projects', title: 'Building Projects' },
            { id: 'contributing-open-source', title: 'Contributing to Open Source' },
            { id: 'certifications', title: 'Certifications' },
          ],
        },
      ],
    },
    {
      id: 'career-development',
      title: 'Career Development',
      summary: 'Building a career around NoSQL and data engineering.',
      level: 'beginner',
      children: [
        {
          id: 'career-roles',
          title: 'Roles',
          children: [
            { id: 'backend-engineer-role', title: 'Backend Engineer' },
            { id: 'data-engineer-role', title: 'Data Engineer' },
            { id: 'database-administrator-role', title: 'Database Administrator (DBA)' },
            { id: 'database-reliability-engineer', title: 'Database Reliability Engineer' },
            { id: 'data-architect-role', title: 'Data Architect' },
          ],
        },
        {
          id: 'skills-portfolio',
          title: 'Skills & Portfolio',
          children: [
            { id: 'core-skills', title: 'Core Skills' },
            { id: 'building-portfolio', title: 'Building a Portfolio' },
            { id: 'system-design-interviews', title: 'System Design Interviews' },
            { id: 'database-interviews', title: 'Database Interviews' },
          ],
        },
        {
          id: 'staying-current',
          title: 'Staying Current',
          children: [
            { id: 'continuous-learning-career', title: 'Continuous Learning' },
            { id: 'following-the-field', title: 'Following the Field' },
            { id: 'networking-community', title: 'Networking & Community' },
          ],
        },
      ],
    },
  ],
})
