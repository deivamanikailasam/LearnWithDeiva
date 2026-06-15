import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'querying-indexing',
  rootStartOrder: 65,
  tree: [
    {
      id: 'nosql-query-languages',
      title: 'NoSQL Query Languages',
      summary: 'The diverse query languages and paradigms across NoSQL databases.',
      level: 'intermediate',
      children: [
        {
          id: 'query-paradigms',
          title: 'Query Paradigms',
          children: [
            { id: 'declarative-vs-imperative', title: 'Declarative vs Imperative' },
            { id: 'api-based-queries', title: 'API-Based Queries' },
            { id: 'sql-like-languages', title: 'SQL-Like Languages' },
            { id: 'traversal-queries', title: 'Traversal Queries' },
          ],
        },
        {
          id: 'document-query-languages',
          title: 'Document Query Languages',
          children: [
            { id: 'mongodb-query-language', title: 'MongoDB Query Language (MQL)' },
            { id: 'sqlpp-n1ql', title: 'SQL++ / N1QL' },
            { id: 'mango-query', title: 'Mango (CouchDB)' },
          ],
        },
        {
          id: 'sql-on-nosql',
          title: 'SQL on NoSQL',
          children: [
            { id: 'cql-lang', title: 'CQL (Cassandra)' },
            { id: 'partiql', title: 'PartiQL' },
            { id: 'presto-trino', title: 'Presto / Trino' },
            { id: 'apache-drill', title: 'Apache Drill' },
          ],
        },
        {
          id: 'specialized-query-languages',
          title: 'Specialized Languages',
          children: [
            { id: 'cypher-gql-lang', title: 'Cypher / GQL' },
            { id: 'gremlin-lang', title: 'Gremlin' },
            { id: 'promql-flux-lang', title: 'PromQL / Flux' },
            { id: 'es-query-dsl-lang', title: 'Elasticsearch Query DSL' },
          ],
        },
      ],
    },
    {
      id: 'indexing-strategies',
      title: 'Indexing Strategies',
      summary: 'How indexes work across NoSQL and how to design them.',
      level: 'advanced',
      children: [
        {
          id: 'index-types-nosql',
          title: 'Index Types',
          children: [
            { id: 'primary-index', title: 'Primary Index' },
            { id: 'secondary-index', title: 'Secondary Index' },
            { id: 'composite-index', title: 'Composite / Compound Index' },
            { id: 'multikey-index', title: 'Multikey (Array) Index' },
            { id: 'geospatial-index', title: 'Geospatial Index' },
            { id: 'text-index', title: 'Text / Full-Text Index' },
            { id: 'ttl-index', title: 'TTL Index' },
            { id: 'sparse-partial-index', title: 'Sparse & Partial Index' },
          ],
        },
        {
          id: 'index-internals',
          title: 'Index Internals',
          children: [
            { id: 'b-tree-index', title: 'B-Tree Indexes' },
            { id: 'lsm-index', title: 'LSM-Based Indexes' },
            { id: 'hash-index', title: 'Hash Indexes' },
            { id: 'inverted-index-internal', title: 'Inverted Indexes' },
            { id: 'covering-index', title: 'Covering Indexes' },
          ],
        },
        {
          id: 'distributed-indexing',
          title: 'Distributed Indexing',
          children: [
            { id: 'local-vs-global-index', title: 'Local vs Global Indexes' },
            { id: 'index-partitioning', title: 'Index Partitioning' },
            { id: 'index-consistency', title: 'Index Consistency' },
          ],
        },
        {
          id: 'index-design',
          title: 'Index Design & Tuning',
          children: [
            { id: 'choosing-indexes', title: 'Choosing What to Index' },
            { id: 'index-selectivity', title: 'Selectivity & Cardinality' },
            { id: 'index-overhead', title: 'Write Overhead & Cost' },
            { id: 'index-anti-patterns', title: 'Indexing Anti-Patterns' },
          ],
        },
      ],
    },
    {
      id: 'aggregation-analytics',
      title: 'Aggregation & Analytics',
      summary: 'Aggregating, transforming and analyzing data in NoSQL.',
      level: 'advanced',
      children: [
        {
          id: 'aggregation-frameworks',
          title: 'Aggregation Frameworks',
          children: [
            { id: 'aggregation-pipelines-general', title: 'Aggregation Pipelines' },
            { id: 'grouping-bucketing', title: 'Grouping & Bucketing' },
            { id: 'window-aggregations', title: 'Window Aggregations' },
          ],
        },
        {
          id: 'mapreduce-paradigm',
          title: 'MapReduce',
          children: [
            { id: 'map-reduce-concept', title: 'MapReduce Concept' },
            { id: 'map-reduce-in-nosql', title: 'MapReduce in NoSQL' },
            { id: 'incremental-mapreduce', title: 'Incremental MapReduce' },
          ],
        },
        {
          id: 'analytics-on-nosql',
          title: 'Analytics Integration',
          children: [
            { id: 'spark-on-nosql', title: 'Apache Spark' },
            { id: 'olap-on-nosql', title: 'OLAP & Columnar Offload' },
            { id: 'data-lake-integration', title: 'Data Lake Integration' },
            { id: 'materialized-views-analytics', title: 'Materialized Views' },
          ],
        },
      ],
    },
    {
      id: 'database-apis',
      title: 'Database APIs & Access',
      summary: 'How applications connect to and access NoSQL databases.',
      level: 'intermediate',
      children: [
        {
          id: 'drivers-clients',
          title: 'Drivers & Clients',
          children: [
            { id: 'native-drivers', title: 'Native Drivers' },
            { id: 'connection-management', title: 'Connection Management & Pooling' },
            { id: 'driver-retries', title: 'Retries & Timeouts' },
            { id: 'async-drivers', title: 'Async Drivers' },
          ],
        },
        {
          id: 'api-protocols',
          title: 'API Protocols',
          children: [
            { id: 'rest-apis-db', title: 'REST APIs' },
            { id: 'graphql-apis-db', title: 'GraphQL APIs' },
            { id: 'grpc-apis-db', title: 'gRPC APIs' },
            { id: 'wire-protocols', title: 'Wire Protocols' },
          ],
        },
        {
          id: 'odms-orms',
          title: 'ODMs & ORMs',
          children: [
            { id: 'mongoose', title: 'Mongoose (MongoDB)' },
            { id: 'spring-data-nosql', title: 'Spring Data' },
            { id: 'prisma-nosql', title: 'Prisma' },
            { id: 'odm-tradeoffs', title: 'ODM/ORM Trade-offs' },
          ],
        },
        {
          id: 'data-api-services',
          title: 'Data API Services',
          children: [
            { id: 'http-data-apis', title: 'HTTP Data APIs' },
            { id: 'serverless-data-access', title: 'Serverless Data Access' },
            { id: 'backend-as-a-service', title: 'Backend-as-a-Service' },
          ],
        },
      ],
    },
    {
      id: 'transactions-in-practice',
      title: 'Transactions & Consistency in Practice',
      summary: 'Using transactions and consistency controls in real NoSQL apps.',
      level: 'advanced',
      children: [
        {
          id: 'nosql-transactions',
          title: 'NoSQL Transactions',
          children: [
            { id: 'single-document-atomicity', title: 'Single-Document Atomicity' },
            { id: 'multi-document-txn', title: 'Multi-Document Transactions' },
            { id: 'lightweight-transactions', title: 'Lightweight / Conditional Transactions' },
            { id: 'optimistic-concurrency', title: 'Optimistic Concurrency Control' },
          ],
        },
        {
          id: 'consistency-tuning',
          title: 'Consistency Tuning',
          children: [
            { id: 'consistency-levels-practice', title: 'Choosing Consistency Levels' },
            { id: 'read-write-concerns-practice', title: 'Read & Write Concerns' },
            { id: 'idempotency', title: 'Idempotency' },
          ],
        },
        {
          id: 'concurrency-patterns',
          title: 'Concurrency Patterns',
          children: [
            { id: 'versioning-etags', title: 'Versioning & ETags' },
            { id: 'compare-and-swap', title: 'Compare-and-Swap' },
            { id: 'distributed-locking-practice', title: 'Distributed Locking' },
          ],
        },
      ],
    },
  ],
})
