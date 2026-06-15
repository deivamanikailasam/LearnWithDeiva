import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'document-databases',
  rootStartOrder: 24,
  tree: [
    {
      id: 'document-db-fundamentals',
      title: 'Document Database Fundamentals',
      summary: 'Storing semi-structured documents (JSON/BSON) as first-class records.',
      level: 'beginner',
      children: [
        {
          id: 'document-model',
          title: 'Document Model',
          children: [
            { id: 'documents-collections', title: 'Documents & Collections' },
            { id: 'json-bson-documents', title: 'JSON / BSON Documents' },
            { id: 'nested-documents-arrays', title: 'Nested Documents & Arrays' },
            { id: 'document-ids', title: 'Document IDs' },
            { id: 'flexible-schema-doc', title: 'Flexible / Dynamic Schema' },
          ],
        },
        {
          id: 'document-operations',
          title: 'Core Operations',
          children: [
            { id: 'doc-crud', title: 'CRUD Operations' },
            { id: 'doc-querying', title: 'Querying Documents' },
            { id: 'doc-projections', title: 'Projections' },
            { id: 'doc-updates-operators', title: 'Update Operators' },
            { id: 'doc-bulk-ops', title: 'Bulk Operations' },
          ],
        },
        {
          id: 'document-indexing-intro',
          title: 'Indexing (Intro)',
          children: [
            { id: 'doc-single-field-index', title: 'Single-Field Indexes' },
            { id: 'doc-compound-index', title: 'Compound Indexes' },
            { id: 'doc-multikey-index', title: 'Multikey (Array) Indexes' },
          ],
        },
        {
          id: 'document-use-cases',
          title: 'Use Cases',
          children: [
            { id: 'content-management', title: 'Content Management' },
            { id: 'catalogs-products', title: 'Catalogs & Product Data' },
            { id: 'user-profiles', title: 'User Profiles' },
            { id: 'event-logging-doc', title: 'Event & Activity Logging' },
            { id: 'real-time-analytics-doc', title: 'Real-Time Analytics' },
          ],
        },
      ],
    },
    {
      id: 'mongodb',
      title: 'MongoDB',
      summary: 'The leading document database (MongoDB 8.x).',
      level: 'intermediate',
      children: [
        {
          id: 'mongodb-basics',
          title: 'MongoDB Basics',
          children: [
            { id: 'mongodb-overview', title: 'Overview & Architecture' },
            { id: 'mongodb-installation', title: 'Installation & mongosh' },
            { id: 'mongodb-databases-collections', title: 'Databases & Collections' },
            { id: 'mongodb-bson', title: 'BSON & Data Types' },
            { id: 'mongodb-objectid', title: 'ObjectId & _id' },
            { id: 'mongodb-licensing', title: 'SSPL Licensing' },
          ],
        },
        {
          id: 'mongodb-crud',
          title: 'CRUD & Queries',
          children: [
            { id: 'mongodb-insert', title: 'Insert Operations' },
            { id: 'mongodb-find', title: 'Find & Query Operators' },
            { id: 'mongodb-update', title: 'Update Operators' },
            { id: 'mongodb-delete', title: 'Delete Operations' },
            { id: 'mongodb-cursors', title: 'Cursors & Pagination' },
            { id: 'mongodb-projection', title: 'Projections' },
          ],
        },
        {
          id: 'mongodb-aggregation',
          title: 'Aggregation Framework',
          children: [
            { id: 'aggregation-pipeline', title: 'Aggregation Pipeline' },
            { id: 'match-project-group', title: '$match, $project, $group' },
            { id: 'lookup-joins', title: '$lookup (Joins)' },
            { id: 'unwind-arrays', title: '$unwind' },
            { id: 'facet-bucket', title: '$facet & $bucket' },
            { id: 'aggregation-operators', title: 'Expression Operators' },
            { id: 'aggregation-performance', title: 'Pipeline Performance' },
          ],
        },
        {
          id: 'mongodb-indexing',
          title: 'Indexing',
          children: [
            { id: 'mongodb-index-types', title: 'Index Types' },
            { id: 'mongodb-compound-indexes', title: 'Compound & ESR Rule' },
            { id: 'mongodb-text-index', title: 'Text Indexes' },
            { id: 'mongodb-geospatial-index', title: 'Geospatial Indexes' },
            { id: 'mongodb-ttl-index', title: 'TTL Indexes' },
            { id: 'mongodb-wildcard-index', title: 'Wildcard Indexes' },
            { id: 'mongodb-explain', title: 'explain() & Index Analysis' },
          ],
        },
        {
          id: 'mongodb-data-modeling',
          title: 'Data Modeling',
          children: [
            { id: 'mongodb-embedding', title: 'Embedding' },
            { id: 'mongodb-referencing', title: 'Referencing' },
            { id: 'mongodb-schema-design-patterns', title: 'Schema Design Patterns' },
            { id: 'mongodb-schema-validation', title: 'Schema Validation' },
          ],
        },
        {
          id: 'mongodb-replication',
          title: 'Replication',
          children: [
            { id: 'mongodb-replica-sets', title: 'Replica Sets' },
            { id: 'mongodb-elections', title: 'Elections & Failover' },
            { id: 'mongodb-read-preference', title: 'Read Preference' },
            { id: 'mongodb-write-concern', title: 'Write Concern' },
            { id: 'mongodb-read-concern', title: 'Read Concern' },
          ],
        },
        {
          id: 'mongodb-sharding',
          title: 'Sharding',
          children: [
            { id: 'mongodb-shard-architecture', title: 'Sharded Cluster Architecture' },
            { id: 'mongodb-shard-key', title: 'Shard Key Selection' },
            { id: 'mongodb-chunks-balancer', title: 'Chunks & Balancer' },
            { id: 'mongodb-hashed-ranged-sharding', title: 'Hashed vs Ranged Sharding' },
            { id: 'mongodb-zone-sharding', title: 'Zone Sharding' },
          ],
        },
        {
          id: 'mongodb-advanced',
          title: 'Advanced Features',
          children: [
            { id: 'mongodb-transactions', title: 'Multi-Document Transactions' },
            { id: 'mongodb-change-streams', title: 'Change Streams' },
            { id: 'mongodb-time-series', title: 'Time-Series Collections' },
            { id: 'mongodb-gridfs', title: 'GridFS' },
            { id: 'mongodb-atlas-search', title: 'Atlas Search' },
            { id: 'mongodb-vector-search', title: 'Atlas Vector Search' },
            { id: 'mongodb-queryable-encryption', title: 'Queryable Encryption' },
          ],
        },
        {
          id: 'mongodb-ecosystem',
          title: 'Ecosystem & Tools',
          children: [
            { id: 'mongodb-atlas', title: 'MongoDB Atlas' },
            { id: 'mongodb-compass', title: 'Compass' },
            { id: 'mongodb-drivers', title: 'Drivers & ODMs (Mongoose)' },
            { id: 'mongodb-atlas-functions', title: 'Atlas App Services & Triggers' },
          ],
        },
      ],
    },
    {
      id: 'couchbase',
      title: 'Couchbase',
      summary: 'Distributed document database with memory-first architecture and SQL++.',
      level: 'advanced',
      children: [
        {
          id: 'couchbase-basics',
          title: 'Couchbase Basics',
          children: [
            { id: 'couchbase-overview', title: 'Overview & Architecture' },
            { id: 'couchbase-buckets-scopes', title: 'Buckets, Scopes & Collections' },
            { id: 'couchbase-memory-first', title: 'Memory-First Architecture' },
          ],
        },
        {
          id: 'couchbase-query',
          title: 'Querying',
          children: [
            { id: 'couchbase-sqlpp', title: 'SQL++ (N1QL)' },
            { id: 'couchbase-indexes', title: 'GSI & Indexes' },
            { id: 'couchbase-fts', title: 'Full-Text Search' },
            { id: 'couchbase-vector-search', title: 'Vector Search' },
          ],
        },
        {
          id: 'couchbase-features',
          title: 'Features',
          children: [
            { id: 'couchbase-xdcr', title: 'Cross Datacenter Replication (XDCR)' },
            { id: 'couchbase-eventing', title: 'Eventing' },
            { id: 'couchbase-mobile-sync', title: 'Mobile & Sync Gateway' },
            { id: 'couchbase-capella', title: 'Capella (DBaaS)' },
          ],
        },
      ],
    },
    {
      id: 'couchdb',
      title: 'Apache CouchDB',
      summary: 'HTTP/JSON document database built for offline-first sync.',
      level: 'advanced',
      children: [
        {
          id: 'couchdb-basics',
          title: 'CouchDB Basics',
          children: [
            { id: 'couchdb-overview', title: 'Overview & HTTP API' },
            { id: 'couchdb-mvcc', title: 'MVCC & Revisions' },
            { id: 'couchdb-views-mapreduce', title: 'Views & MapReduce' },
            { id: 'couchdb-mango', title: 'Mango Queries' },
          ],
        },
        {
          id: 'couchdb-sync',
          title: 'Replication & Sync',
          children: [
            { id: 'couchdb-replication-protocol', title: 'Replication Protocol' },
            { id: 'couchdb-offline-first', title: 'Offline-First & PouchDB' },
            { id: 'couchdb-conflict-handling', title: 'Conflict Handling' },
          ],
        },
      ],
    },
    {
      id: 'firestore',
      title: 'Cloud Firestore',
      summary: 'Google\u2019s serverless document database with realtime sync.',
      level: 'intermediate',
      children: [
        {
          id: 'firestore-basics',
          title: 'Firestore Basics',
          children: [
            { id: 'firestore-overview', title: 'Overview (Firestore vs Realtime DB)' },
            { id: 'firestore-documents-collections', title: 'Documents & Collections' },
            { id: 'firestore-subcollections', title: 'Subcollections' },
          ],
        },
        {
          id: 'firestore-features',
          title: 'Features',
          children: [
            { id: 'firestore-queries', title: 'Queries & Composite Indexes' },
            { id: 'firestore-realtime-listeners', title: 'Realtime Listeners' },
            { id: 'firestore-offline-persistence', title: 'Offline Persistence' },
            { id: 'firestore-security-rules', title: 'Security Rules' },
            { id: 'firestore-transactions', title: 'Transactions & Batched Writes' },
            { id: 'firestore-vector-search', title: 'Vector Search' },
          ],
        },
      ],
    },
    {
      id: 'other-document-dbs',
      title: 'Other Document Databases',
      summary: 'Additional document stores and MongoDB-compatible engines.',
      level: 'advanced',
      children: [
        {
          id: 'amazon-documentdb',
          title: 'Amazon DocumentDB',
          children: [
            { id: 'documentdb-overview', title: 'Overview & MongoDB Compatibility' },
            { id: 'documentdb-architecture', title: 'Architecture' },
          ],
        },
        {
          id: 'ravendb',
          title: 'RavenDB',
          children: [
            { id: 'ravendb-overview', title: 'Overview & ACID Documents' },
            { id: 'ravendb-indexes', title: 'Automatic Indexes' },
          ],
        },
        {
          id: 'ferretdb',
          title: 'FerretDB',
          children: [
            { id: 'ferretdb-overview', title: 'Overview (MongoDB on Postgres)' },
          ],
        },
        {
          id: 'other-doc-engines',
          title: 'Other Engines',
          children: [
            { id: 'pouchdb', title: 'PouchDB' },
            { id: 'orientdb-doc', title: 'OrientDB' },
            { id: 'postgres-jsonb', title: 'PostgreSQL JSONB' },
          ],
        },
      ],
    },
  ],
})
