import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'architecture-use-cases',
  rootStartOrder: 104,
  tree: [
    {
      id: 'choosing-a-database',
      title: 'Choosing the Right Database',
      summary: 'A structured approach to selecting the right NoSQL database.',
      level: 'advanced',
      children: [
        {
          id: 'selection-criteria',
          title: 'Selection Criteria',
          children: [
            { id: 'access-patterns-criteria', title: 'Access Patterns' },
            { id: 'data-model-fit', title: 'Data Model Fit' },
            { id: 'consistency-requirements', title: 'Consistency Requirements' },
            { id: 'scalability-requirements', title: 'Scalability Requirements' },
            { id: 'latency-requirements', title: 'Latency Requirements' },
            { id: 'team-expertise', title: 'Team Expertise & Ecosystem' },
            { id: 'cost-criteria', title: 'Cost & TCO' },
          ],
        },
        {
          id: 'decision-frameworks',
          title: 'Decision Frameworks',
          children: [
            { id: 'decision-tree-db', title: 'Database Decision Tree' },
            { id: 'comparison-matrix-choose', title: 'Comparison Matrix' },
            { id: 'proof-of-concept', title: 'Proof of Concept' },
            { id: 'benchmark-driven-choice', title: 'Benchmark-Driven Selection' },
          ],
        },
        {
          id: 'sql-vs-nosql-decision',
          title: 'SQL vs NoSQL Decision',
          children: [
            { id: 'when-relational-wins', title: 'When Relational Wins' },
            { id: 'when-nosql-wins', title: 'When NoSQL Wins' },
            { id: 'when-newsql-wins', title: 'When NewSQL Wins' },
          ],
        },
      ],
    },
    {
      id: 'reference-architectures',
      title: 'Reference Architectures',
      summary: 'Proven architectural blueprints using NoSQL.',
      level: 'advanced',
      children: [
        {
          id: 'web-mobile-architectures',
          title: 'Web & Mobile',
          children: [
            { id: 'three-tier-nosql', title: 'Three-Tier with NoSQL' },
            { id: 'serverless-architecture', title: 'Serverless Architecture' },
            { id: 'offline-first-architecture', title: 'Offline-First / Sync' },
            { id: 'baas-architecture', title: 'BaaS Architecture' },
          ],
        },
        {
          id: 'data-intensive-architectures',
          title: 'Data-Intensive',
          children: [
            { id: 'lambda-architecture', title: 'Lambda Architecture' },
            { id: 'kappa-architecture', title: 'Kappa Architecture' },
            { id: 'cqrs-es-architecture', title: 'CQRS + Event Sourcing' },
            { id: 'data-mesh', title: 'Data Mesh' },
          ],
        },
        {
          id: 'caching-architectures',
          title: 'Caching & Performance',
          children: [
            { id: 'cache-aside-architecture', title: 'Cache-Aside Architecture' },
            { id: 'cdn-edge-data', title: 'CDN & Edge Data' },
            { id: 'materialized-view-architecture', title: 'Materialized View Architecture' },
          ],
        },
      ],
    },
    {
      id: 'industry-use-cases',
      title: 'Industry Use Cases',
      summary: 'How different industries apply NoSQL databases.',
      level: 'intermediate',
      children: [
        {
          id: 'consumer-use-cases',
          title: 'Consumer & Social',
          children: [
            { id: 'social-media-feeds', title: 'Social Media & Feeds' },
            { id: 'gaming-leaderboards', title: 'Gaming & Leaderboards' },
            { id: 'messaging-chat', title: 'Messaging & Chat' },
            { id: 'streaming-media', title: 'Streaming & Media' },
          ],
        },
        {
          id: 'commerce-finance-use-cases',
          title: 'Commerce & Finance',
          children: [
            { id: 'ecommerce-catalog', title: 'E-Commerce & Catalogs' },
            { id: 'fraud-detection-use-case', title: 'Fraud Detection' },
            { id: 'fintech-ledgers', title: 'Fintech & Ledgers' },
            { id: 'recommendations-use-case', title: 'Personalization & Recommendations' },
          ],
        },
        {
          id: 'enterprise-use-cases',
          title: 'Enterprise & Industrial',
          children: [
            { id: 'iot-use-case', title: 'IoT & Telemetry' },
            { id: 'observability-use-case', title: 'Logging & Observability' },
            { id: 'healthcare-use-case', title: 'Healthcare' },
            { id: 'knowledge-graph-use-case', title: 'Knowledge Graphs & Search' },
            { id: 'genai-rag-use-case', title: 'GenAI & RAG Applications' },
          ],
        },
      ],
    },
    {
      id: 'anti-patterns-pitfalls',
      title: 'Anti-Patterns & Pitfalls',
      summary: 'Common mistakes to avoid when using NoSQL.',
      level: 'advanced',
      children: [
        {
          id: 'modeling-pitfalls',
          title: 'Modeling Pitfalls',
          children: [
            { id: 'relational-modeling-in-nosql', title: 'Relational Modeling in NoSQL' },
            { id: 'unbounded-growth', title: 'Unbounded Document/Row Growth' },
            { id: 'ignoring-access-patterns-pitfall', title: 'Ignoring Access Patterns' },
            { id: 'over-denormalization', title: 'Over-Denormalization' },
          ],
        },
        {
          id: 'operational-pitfalls',
          title: 'Operational Pitfalls',
          children: [
            { id: 'hot-partition-pitfall', title: 'Hot Partitions' },
            { id: 'missing-indexes-pitfall', title: 'Missing or Excess Indexes' },
            { id: 'unbounded-queries', title: 'Unbounded Queries & Scans' },
            { id: 'ignoring-consistency-pitfall', title: 'Misunderstanding Consistency' },
          ],
        },
        {
          id: 'strategic-pitfalls',
          title: 'Strategic Pitfalls',
          children: [
            { id: 'wrong-database-choice', title: 'Wrong Database Choice' },
            { id: 'premature-nosql', title: 'Premature NoSQL Adoption' },
            { id: 'too-many-databases', title: 'Database Sprawl' },
            { id: 'vendor-lock-in-pitfall', title: 'Unmanaged Vendor Lock-In' },
          ],
        },
      ],
    },
    {
      id: 'case-studies-scale',
      title: 'Case Studies at Scale',
      summary: 'Lessons from large-scale real-world NoSQL deployments.',
      level: 'advanced',
      children: [
        {
          id: 'tech-company-cases',
          title: 'Tech Company Cases',
          children: [
            { id: 'netflix-cassandra', title: 'Netflix (Cassandra)' },
            { id: 'discord-cassandra-scylla', title: 'Discord (Cassandra/ScyllaDB)' },
            { id: 'uber-data-platform', title: 'Uber Data Platform' },
            { id: 'amazon-dynamo-case', title: 'Amazon (DynamoDB)' },
          ],
        },
        {
          id: 'scale-lessons',
          title: 'Scaling Lessons',
          children: [
            { id: 'scaling-challenges-case', title: 'Scaling Challenges' },
            { id: 'migration-lessons', title: 'Migration Lessons' },
            { id: 'cost-at-scale-lessons', title: 'Cost-at-Scale Lessons' },
            { id: 'reliability-lessons', title: 'Reliability Lessons' },
          ],
        },
      ],
    },
  ],
})
