import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'nosql-fundamentals',
  rootStartOrder: 5,
  tree: [
    {
      id: 'what-is-nosql',
      title: 'What is NoSQL',
      summary: 'Definition, motivations and core characteristics of NoSQL databases.',
      level: 'beginner',
      children: [
        {
          id: 'nosql-definition',
          title: 'NoSQL Definition & Meaning',
          children: [
            { id: 'not-only-sql', title: '"Not Only SQL" Meaning' },
            { id: 'nosql-misconceptions', title: 'Common Misconceptions' },
            { id: 'when-nosql-fits', title: 'When NoSQL Fits' },
          ],
        },
        {
          id: 'why-nosql',
          title: 'Why NoSQL Emerged',
          children: [
            { id: 'big-data-volume-velocity-variety', title: 'Volume, Velocity & Variety' },
            { id: 'web-scale-applications', title: 'Web-Scale Applications' },
            { id: 'horizontal-scaling-need', title: 'Need for Horizontal Scaling' },
            { id: 'flexible-schema-need', title: 'Need for Flexible Schemas' },
            { id: 'agile-development', title: 'Agile & Rapid Development' },
            { id: 'cost-commodity-hardware', title: 'Commodity Hardware & Cost' },
          ],
        },
        {
          id: 'nosql-characteristics',
          title: 'Core Characteristics',
          children: [
            { id: 'schema-flexibility', title: 'Schema Flexibility' },
            { id: 'horizontal-scalability', title: 'Horizontal Scalability' },
            { id: 'high-availability-char', title: 'High Availability' },
            { id: 'distributed-by-design', title: 'Distributed by Design' },
            { id: 'eventual-consistency-char', title: 'Eventual Consistency' },
            { id: 'denormalized-data', title: 'Denormalized Data' },
            { id: 'commodity-clusters', title: 'Commodity Clusters' },
          ],
        },
        {
          id: 'nosql-history-influences',
          title: 'History & Influential Papers',
          children: [
            { id: 'google-bigtable-paper', title: 'Google Bigtable Paper' },
            { id: 'amazon-dynamo-paper', title: 'Amazon Dynamo Paper' },
            { id: 'google-mapreduce', title: 'Google MapReduce' },
            { id: 'hadoop-ecosystem', title: 'Hadoop Ecosystem' },
            { id: 'nosql-term-origin', title: 'Origin of the Term "NoSQL"' },
          ],
        },
      ],
    },
    {
      id: 'nosql-vs-sql',
      title: 'NoSQL vs SQL',
      summary: 'How NoSQL differs from relational databases and how to choose.',
      level: 'beginner',
      children: [
        {
          id: 'key-differences',
          title: 'Key Differences',
          children: [
            { id: 'schema-rigid-vs-flexible', title: 'Rigid vs Flexible Schema' },
            { id: 'scaling-vertical-vs-horizontal', title: 'Vertical vs Horizontal Scaling' },
            { id: 'acid-vs-base', title: 'ACID vs BASE' },
            { id: 'joins-vs-denormalization', title: 'Joins vs Denormalization' },
            { id: 'query-language-differences', title: 'Query Language Differences' },
            { id: 'relationships-handling', title: 'Handling Relationships' },
          ],
        },
        {
          id: 'tradeoffs',
          title: 'Trade-offs',
          children: [
            { id: 'consistency-vs-availability', title: 'Consistency vs Availability' },
            { id: 'flexibility-vs-integrity', title: 'Flexibility vs Data Integrity' },
            { id: 'read-vs-write-optimization', title: 'Read vs Write Optimization' },
            { id: 'developer-velocity-vs-governance', title: 'Developer Velocity vs Governance' },
          ],
        },
        {
          id: 'choosing-sql-or-nosql',
          title: 'Choosing SQL or NoSQL',
          children: [
            { id: 'use-cases-for-sql', title: 'Use Cases for SQL' },
            { id: 'use-cases-for-nosql', title: 'Use Cases for NoSQL' },
            { id: 'polyglot-persistence-intro', title: 'Polyglot Persistence' },
            { id: 'hybrid-approaches', title: 'Hybrid Approaches' },
            { id: 'newsql-as-middle-ground', title: 'NewSQL as a Middle Ground' },
          ],
        },
      ],
    },
    {
      id: 'nosql-database-types',
      title: 'Types of NoSQL Databases',
      summary: 'The main NoSQL families and what each is good for.',
      level: 'beginner',
      children: [
        {
          id: 'key-value-overview',
          title: 'Key-Value Stores (Overview)',
          children: [
            { id: 'kv-concept', title: 'Concept & Model' },
            { id: 'kv-use-cases', title: 'Typical Use Cases' },
            { id: 'kv-examples', title: 'Examples (Redis, DynamoDB)' },
          ],
        },
        {
          id: 'document-overview',
          title: 'Document Databases (Overview)',
          children: [
            { id: 'doc-concept', title: 'Concept & Model' },
            { id: 'doc-use-cases', title: 'Typical Use Cases' },
            { id: 'doc-examples', title: 'Examples (MongoDB, Couchbase)' },
          ],
        },
        {
          id: 'wide-column-overview',
          title: 'Wide-Column Stores (Overview)',
          children: [
            { id: 'wc-concept', title: 'Concept & Model' },
            { id: 'wc-use-cases', title: 'Typical Use Cases' },
            { id: 'wc-examples', title: 'Examples (Cassandra, HBase)' },
          ],
        },
        {
          id: 'graph-overview',
          title: 'Graph Databases (Overview)',
          children: [
            { id: 'graph-concept', title: 'Concept & Model' },
            { id: 'graph-use-cases', title: 'Typical Use Cases' },
            { id: 'graph-examples', title: 'Examples (Neo4j, Neptune)' },
          ],
        },
        {
          id: 'specialized-types-overview',
          title: 'Specialized Types (Overview)',
          children: [
            { id: 'search-engines-overview', title: 'Search Engines' },
            { id: 'time-series-overview', title: 'Time-Series Databases' },
            { id: 'vector-db-overview', title: 'Vector Databases' },
            { id: 'object-stores-overview', title: 'Object Stores' },
            { id: 'multi-model-overview', title: 'Multi-Model Databases' },
          ],
        },
        {
          id: 'choosing-a-type',
          title: 'Choosing a NoSQL Type',
          children: [
            { id: 'access-pattern-fit', title: 'Access-Pattern Fit' },
            { id: 'data-shape-fit', title: 'Data-Shape Fit' },
            { id: 'scale-and-consistency-fit', title: 'Scale & Consistency Fit' },
            { id: 'type-comparison-matrix', title: 'Comparison Matrix' },
          ],
        },
      ],
    },
    {
      id: 'nosql-core-concepts',
      title: 'Core NoSQL Concepts',
      summary: 'Foundational concepts shared across NoSQL systems.',
      level: 'beginner',
      children: [
        {
          id: 'aggregate-data-model',
          title: 'Aggregate Data Model',
          children: [
            { id: 'aggregates', title: 'Aggregates' },
            { id: 'aggregate-orientation', title: 'Aggregate Orientation' },
            { id: 'aggregate-vs-relational', title: 'Aggregate vs Relational' },
          ],
        },
        {
          id: 'schema-on-read',
          title: 'Schema-on-Read vs Schema-on-Write',
          children: [
            { id: 'schema-on-write', title: 'Schema-on-Write' },
            { id: 'schema-on-read-concept', title: 'Schema-on-Read' },
            { id: 'schema-evolution-intro', title: 'Schema Evolution' },
          ],
        },
        {
          id: 'consistency-models-intro',
          title: 'Consistency Models (Intro)',
          children: [
            { id: 'strong-consistency-intro', title: 'Strong Consistency' },
            { id: 'eventual-consistency-intro', title: 'Eventual Consistency' },
            { id: 'tunable-consistency-intro', title: 'Tunable Consistency' },
          ],
        },
        {
          id: 'base-properties',
          title: 'BASE Properties',
          children: [
            { id: 'basically-available', title: 'Basically Available' },
            { id: 'soft-state', title: 'Soft State' },
            { id: 'eventual-consistency-base', title: 'Eventual Consistency' },
          ],
        },
        {
          id: 'cap-theorem-intro',
          title: 'CAP Theorem (Intro)',
          children: [
            { id: 'cap-consistency', title: 'Consistency (CAP)' },
            { id: 'cap-availability', title: 'Availability (CAP)' },
            { id: 'cap-partition-tolerance', title: 'Partition Tolerance' },
            { id: 'cp-vs-ap', title: 'CP vs AP Systems' },
          ],
        },
        {
          id: 'distribution-intro',
          title: 'Distribution Concepts (Intro)',
          children: [
            { id: 'replication-intro', title: 'Replication' },
            { id: 'sharding-partitioning-intro', title: 'Sharding & Partitioning' },
            { id: 'clustering-intro', title: 'Clustering' },
          ],
        },
      ],
    },
  ],
})
