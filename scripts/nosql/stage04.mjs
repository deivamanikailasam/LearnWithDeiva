import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'data-modeling',
  rootStartOrder: 15,
  tree: [
    {
      id: 'nosql-modeling-principles',
      title: 'NoSQL Data Modeling Principles',
      summary: 'The mindset shift from relational to query-driven NoSQL modeling.',
      level: 'intermediate',
      children: [
        {
          id: 'modeling-mindset',
          title: 'Modeling Mindset',
          children: [
            { id: 'query-driven-design', title: 'Query-Driven Design' },
            { id: 'access-patterns-first', title: 'Access Patterns First' },
            { id: 'data-vs-relational-thinking', title: 'Unlearning Relational Thinking' },
            { id: 'read-write-ratio', title: 'Read/Write Ratio Considerations' },
            { id: 'data-lifecycle', title: 'Data Lifecycle & TTL' },
          ],
        },
        {
          id: 'aggregate-modeling',
          title: 'Aggregate-Oriented Modeling',
          children: [
            { id: 'aggregate-boundaries', title: 'Aggregate Boundaries' },
            { id: 'atomic-aggregates', title: 'Atomic Aggregates' },
            { id: 'entity-vs-aggregate', title: 'Entity vs Aggregate' },
          ],
        },
        {
          id: 'normalization-vs-denormalization',
          title: 'Normalization vs Denormalization',
          children: [
            { id: 'denormalization', title: 'Denormalization' },
            { id: 'data-duplication', title: 'Data Duplication & Trade-offs' },
            { id: 'referencing-vs-embedding', title: 'Referencing vs Embedding' },
            { id: 'computed-precomputed-data', title: 'Computed & Precomputed Data' },
          ],
        },
        {
          id: 'relationships-in-nosql',
          title: 'Modeling Relationships',
          children: [
            { id: 'one-to-one', title: 'One-to-One' },
            { id: 'one-to-many', title: 'One-to-Many' },
            { id: 'many-to-many', title: 'Many-to-Many' },
            { id: 'hierarchies-trees', title: 'Hierarchies & Trees' },
            { id: 'graph-relationships', title: 'Graph Relationships' },
          ],
        },
      ],
    },
    {
      id: 'modeling-by-type',
      title: 'Modeling by Database Type',
      summary: 'How modeling differs across each NoSQL family.',
      level: 'intermediate',
      children: [
        {
          id: 'key-value-modeling',
          title: 'Key-Value Modeling',
          children: [
            { id: 'kv-key-design', title: 'Key Design & Namespacing' },
            { id: 'kv-value-structuring', title: 'Value Structuring' },
            { id: 'kv-composite-keys', title: 'Composite Keys' },
          ],
        },
        {
          id: 'document-modeling',
          title: 'Document Modeling',
          children: [
            { id: 'embedding-vs-referencing', title: 'Embedding vs Referencing' },
            { id: 'document-structure', title: 'Document Structure & Nesting' },
            { id: 'array-modeling', title: 'Modeling Arrays' },
            { id: 'polymorphic-documents', title: 'Polymorphic Documents' },
            { id: 'bucketing-pattern', title: 'Bucketing Pattern' },
          ],
        },
        {
          id: 'wide-column-modeling',
          title: 'Wide-Column Modeling',
          children: [
            { id: 'partition-clustering-keys', title: 'Partition & Clustering Keys' },
            { id: 'query-first-tables', title: 'Query-First Table Design' },
            { id: 'wide-rows', title: 'Wide Rows & Time Series' },
            { id: 'denormalized-tables', title: 'Denormalized Tables per Query' },
          ],
        },
        {
          id: 'graph-modeling',
          title: 'Graph Modeling',
          children: [
            { id: 'nodes-edges-properties', title: 'Nodes, Edges & Properties' },
            { id: 'labeled-property-graph', title: 'Labeled Property Graph' },
            { id: 'rdf-triples-modeling', title: 'RDF Triples' },
            { id: 'graph-modeling-best-practices', title: 'Graph Modeling Best Practices' },
          ],
        },
      ],
    },
    {
      id: 'data-modeling-patterns',
      title: 'Data Modeling Patterns',
      summary: 'Reusable schema design patterns for NoSQL.',
      level: 'advanced',
      children: [
        {
          id: 'document-patterns',
          title: 'Document Patterns',
          children: [
            { id: 'attribute-pattern', title: 'Attribute Pattern' },
            { id: 'subset-pattern', title: 'Subset Pattern' },
            { id: 'extended-reference-pattern', title: 'Extended Reference Pattern' },
            { id: 'computed-pattern', title: 'Computed Pattern' },
            { id: 'outlier-pattern', title: 'Outlier Pattern' },
            { id: 'schema-versioning-pattern', title: 'Schema Versioning Pattern' },
            { id: 'tree-patterns', title: 'Tree Patterns (Parent Ref, Materialized Path)' },
          ],
        },
        {
          id: 'single-table-design',
          title: 'Single-Table Design',
          children: [
            { id: 'single-table-concept', title: 'Single-Table Concept' },
            { id: 'overloading-keys', title: 'Overloading Keys & GSIs' },
            { id: 'item-collections', title: 'Item Collections' },
            { id: 'adjacency-list-pattern', title: 'Adjacency List Pattern' },
          ],
        },
        {
          id: 'time-series-patterns',
          title: 'Time-Series Patterns',
          children: [
            { id: 'time-bucketing', title: 'Time Bucketing' },
            { id: 'rollups-downsampling', title: 'Rollups & Downsampling' },
            { id: 'ttl-expiration', title: 'TTL & Expiration' },
          ],
        },
        {
          id: 'general-patterns',
          title: 'General Patterns',
          children: [
            { id: 'materialized-views-pattern', title: 'Materialized Views' },
            { id: 'index-table-pattern', title: 'Index Table Pattern' },
            { id: 'aggregation-pattern', title: 'Aggregation Pattern' },
            { id: 'event-log-pattern', title: 'Event Log Pattern' },
            { id: 'soft-delete-pattern', title: 'Soft Delete Pattern' },
          ],
        },
      ],
    },
    {
      id: 'schema-management',
      title: 'Schema & Data Governance',
      summary: 'Managing schema evolution, validation and data quality in NoSQL.',
      level: 'advanced',
      children: [
        {
          id: 'schema-evolution',
          title: 'Schema Evolution',
          children: [
            { id: 'schema-versioning', title: 'Schema Versioning' },
            { id: 'backward-forward-compatibility', title: 'Backward & Forward Compatibility' },
            { id: 'lazy-migration', title: 'Lazy / On-Read Migration' },
            { id: 'bulk-migration', title: 'Bulk Migration' },
          ],
        },
        {
          id: 'schema-validation',
          title: 'Schema Validation',
          children: [
            { id: 'json-schema-validation', title: 'JSON Schema Validation' },
            { id: 'schema-registry', title: 'Schema Registry' },
            { id: 'application-level-validation', title: 'Application-Level Validation' },
          ],
        },
        {
          id: 'data-modeling-antipatterns',
          title: 'Anti-Patterns',
          children: [
            { id: 'unbounded-arrays', title: 'Unbounded Arrays' },
            { id: 'large-documents', title: 'Oversized Documents' },
            { id: 'using-nosql-like-rdbms', title: 'Using NoSQL Like an RDBMS' },
            { id: 'ignoring-access-patterns', title: 'Ignoring Access Patterns' },
            { id: 'hot-key-antipattern', title: 'Hot Keys' },
          ],
        },
        {
          id: 'modeling-tools',
          title: 'Modeling Tools',
          children: [
            { id: 'hackolade', title: 'Hackolade' },
            { id: 'erd-for-nosql', title: 'ERD & Diagramming' },
            { id: 'nosql-workbench', title: 'NoSQL Workbench (DynamoDB)' },
          ],
        },
      ],
    },
  ],
})
