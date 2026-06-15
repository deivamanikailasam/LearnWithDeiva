import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'multi-model-other',
  rootStartOrder: 60,
  tree: [
    {
      id: 'multi-model-databases',
      title: 'Multi-Model Databases',
      summary: 'Databases that support several data models in one engine.',
      level: 'advanced',
      children: [
        {
          id: 'multi-model-concept',
          title: 'Multi-Model Concept',
          children: [
            { id: 'what-is-multi-model', title: 'What is Multi-Model' },
            { id: 'polyglot-vs-multimodel', title: 'Polyglot vs Multi-Model' },
            { id: 'multi-model-tradeoffs', title: 'Trade-offs' },
          ],
        },
        {
          id: 'multi-model-products',
          title: 'Multi-Model Products',
          children: [
            { id: 'arangodb-mm', title: 'ArangoDB' },
            { id: 'orientdb', title: 'OrientDB' },
            { id: 'marklogic', title: 'MarkLogic' },
            { id: 'fauna', title: 'Fauna' },
            { id: 'couchbase-mm', title: 'Couchbase' },
          ],
        },
        {
          id: 'surrealdb',
          title: 'SurrealDB',
          children: [
            { id: 'surrealdb-overview', title: 'Overview & SurrealQL' },
            { id: 'surrealdb-models', title: 'Document, Graph & Relational' },
          ],
        },
      ],
    },
    {
      id: 'newsql',
      title: 'NewSQL & Distributed SQL',
      summary: 'Systems combining SQL and ACID with NoSQL-style horizontal scaling.',
      level: 'advanced',
      children: [
        {
          id: 'newsql-concept',
          title: 'NewSQL Concept',
          children: [
            { id: 'what-is-newsql', title: 'What is NewSQL' },
            { id: 'distributed-sql', title: 'Distributed SQL' },
            { id: 'newsql-vs-nosql', title: 'NewSQL vs NoSQL' },
            { id: 'htap-newsql', title: 'HTAP Workloads' },
          ],
        },
        {
          id: 'google-spanner',
          title: 'Google Spanner',
          children: [
            { id: 'spanner-overview', title: 'Overview & TrueTime' },
            { id: 'spanner-external-consistency', title: 'External Consistency' },
          ],
        },
        {
          id: 'cockroachdb',
          title: 'CockroachDB',
          children: [
            { id: 'cockroachdb-overview', title: 'Overview & Architecture' },
            { id: 'cockroachdb-geo-partitioning', title: 'Geo-Partitioning' },
          ],
        },
        {
          id: 'distributed-sql-others',
          title: 'Other Distributed SQL',
          children: [
            { id: 'tidb', title: 'TiDB' },
            { id: 'yugabytedb', title: 'YugabyteDB' },
            { id: 'voltdb', title: 'VoltDB' },
            { id: 'vitess', title: 'Vitess' },
          ],
        },
      ],
    },
    {
      id: 'object-blob-stores',
      title: 'Object & Blob Stores',
      summary: 'Massively-scalable storage for unstructured objects and files.',
      level: 'intermediate',
      children: [
        {
          id: 'object-storage-concept',
          title: 'Object Storage Concept',
          children: [
            { id: 'objects-buckets', title: 'Objects & Buckets' },
            { id: 'object-vs-block-file', title: 'Object vs Block vs File Storage' },
            { id: 'object-metadata', title: 'Object Metadata' },
            { id: 's3-api', title: 'S3 API Standard' },
          ],
        },
        {
          id: 'object-store-products',
          title: 'Products',
          children: [
            { id: 'amazon-s3', title: 'Amazon S3' },
            { id: 'minio', title: 'MinIO' },
            { id: 'google-cloud-storage', title: 'Google Cloud Storage' },
            { id: 'azure-blob-storage', title: 'Azure Blob Storage' },
            { id: 'ceph', title: 'Ceph' },
          ],
        },
      ],
    },
    {
      id: 'streaming-event-stores',
      title: 'Streaming & Event Stores',
      summary: 'Log-structured systems that store data as immutable event streams.',
      level: 'advanced',
      children: [
        {
          id: 'event-log-concept',
          title: 'Event Log Concept',
          children: [
            { id: 'append-only-log', title: 'Append-Only Log' },
            { id: 'log-as-database', title: 'The Log as a Database' },
            { id: 'stream-vs-table', title: 'Stream vs Table Duality' },
          ],
        },
        {
          id: 'streaming-platforms',
          title: 'Streaming Platforms',
          children: [
            { id: 'kafka-as-store', title: 'Apache Kafka (as Storage)' },
            { id: 'apache-pulsar', title: 'Apache Pulsar' },
            { id: 'redpanda', title: 'Redpanda' },
          ],
        },
        {
          id: 'event-store-products',
          title: 'Event Stores',
          children: [
            { id: 'eventstoredb', title: 'EventStoreDB' },
            { id: 'kafka-streams-ktables', title: 'Kafka Streams & KTables' },
          ],
        },
      ],
    },
    {
      id: 'specialized-stores',
      title: 'Other Specialized Stores',
      summary: 'Ledger, in-memory grid, RDF and embedded databases.',
      level: 'advanced',
      children: [
        {
          id: 'ledger-databases',
          title: 'Ledger Databases',
          children: [
            { id: 'ledger-concept', title: 'Immutable Ledger Concept' },
            { id: 'amazon-qldb', title: 'Amazon QLDB' },
            { id: 'immudb', title: 'immudb' },
          ],
        },
        {
          id: 'in-memory-data-grids',
          title: 'In-Memory Data Grids',
          children: [
            { id: 'idg-concept', title: 'Data Grid Concept' },
            { id: 'hazelcast-grid', title: 'Hazelcast' },
            { id: 'apache-ignite-grid', title: 'Apache Ignite' },
            { id: 'gemfire', title: 'GemFire / Geode' },
          ],
        },
        {
          id: 'rdf-triple-stores-specialized',
          title: 'RDF / Triple Stores',
          children: [
            { id: 'graphdb-ontotext', title: 'GraphDB (Ontotext)' },
            { id: 'stardog', title: 'Stardog' },
            { id: 'apache-jena', title: 'Apache Jena' },
          ],
        },
        {
          id: 'embedded-databases',
          title: 'Embedded Databases',
          children: [
            { id: 'sqlite-embedded', title: 'SQLite' },
            { id: 'duckdb', title: 'DuckDB' },
            { id: 'rocksdb-embedded', title: 'RocksDB' },
          ],
        },
      ],
    },
  ],
})
