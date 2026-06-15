import { addTopics } from './addTopics.mjs'

addTopics([
  /* ---- Key-Value: serverless & other modern stores ---- */
  {
    id: 'serverless-kv-stores',
    title: 'Serverless Key-Value Stores',
    parentId: 'other-kv-stores',
    children: [
      { id: 'upstash', title: 'Upstash (Serverless Redis)' },
      { id: 'cloudflare-workers-kv', title: 'Cloudflare Workers KV' },
      { id: 'momento', title: 'Momento Cache' },
      { id: 'vercel-kv', title: 'Vercel KV' },
    ],
  },
  {
    id: 'modern-kv-stores',
    title: 'Other Modern Key-Value Stores',
    parentId: 'other-kv-stores',
    children: [
      { id: 'microsoft-garnet', title: 'Microsoft Garnet' },
      { id: 'tarantool', title: 'Tarantool' },
      { id: 'oracle-nosql-db', title: 'Oracle NoSQL Database' },
      { id: 'berkeley-db', title: 'Berkeley DB' },
    ],
  },

  /* ---- Redis: administration & security ---- */
  {
    id: 'redis-administration',
    title: 'Administration & Security',
    parentId: 'redis',
    children: [
      { id: 'redis-acl', title: 'ACLs & Users' },
      { id: 'redis-tls', title: 'TLS & Encryption' },
      { id: 'redis-config-tuning', title: 'Configuration & Tuning' },
      { id: 'redis-cluster-routing', title: 'MOVED / ASK Redirection' },
    ],
  },

  /* ---- MongoDB: collection types & Atlas data services ---- */
  {
    id: 'mongodb-collection-types',
    title: 'Collection Types',
    parentId: 'mongodb',
    children: [
      { id: 'capped-collections', title: 'Capped Collections' },
      { id: 'clustered-collections', title: 'Clustered Collections' },
      { id: 'on-demand-materialized-views', title: 'On-Demand Materialized Views' },
      { id: 'mongodb-views', title: 'Views' },
    ],
  },
  {
    id: 'mongodb-atlas-data-services',
    title: 'Atlas Data Services',
    parentId: 'mongodb',
    children: [
      { id: 'atlas-stream-processing', title: 'Atlas Stream Processing' },
      { id: 'atlas-online-archive', title: 'Atlas Online Archive' },
      { id: 'atlas-data-federation', title: 'Atlas Data Federation' },
      { id: 'atlas-device-sync', title: 'Atlas Device Sync' },
    ],
  },

  /* ---- Document: cloud services & Firestore new features ---- */
  {
    id: 'cloud-document-services',
    title: 'Cloud Document Services',
    parentId: 'other-document-dbs',
    children: [
      { id: 'oracle-autonomous-json', title: 'Oracle Autonomous JSON Database' },
      { id: 'ibm-cloudant', title: 'IBM Cloudant' },
    ],
  },
  { id: 'firestore-features--mongodb-compat', title: 'MongoDB Compatibility', parentId: 'firestore-features' },
  { id: 'firestore-features--data-connect', title: 'Firestore Data Connect', parentId: 'firestore-features' },

  /* ---- Graph: lightweight / embedded & GraphRAG stores ---- */
  {
    id: 'lightweight-graph-databases',
    title: 'Lightweight & Embedded Graph DBs',
    parentId: 'other-graph-dbs',
    children: [
      { id: 'kuzu', title: 'K\u00f9zu' },
      { id: 'falkordb', title: 'FalkorDB' },
      { id: 'apache-age', title: 'Apache AGE (Postgres)' },
    ],
  },

  /* ---- Search: PostgreSQL search & lightweight engines ---- */
  {
    id: 'postgres-search',
    title: 'PostgreSQL Search',
    parentId: 'other-search-engines',
    children: [
      { id: 'paradedb', title: 'ParadeDB (pg_search)' },
      { id: 'postgres-fts', title: 'Postgres Full-Text Search' },
      { id: 'pg-trgm', title: 'pg_trgm (Trigram Search)' },
    ],
  },
  {
    id: 'lightweight-search-engines',
    title: 'Lightweight Search Engines',
    parentId: 'other-search-engines',
    children: [
      { id: 'zincsearch', title: 'ZincSearch' },
      { id: 'sonic-search', title: 'Sonic' },
      { id: 'tantivy', title: 'Tantivy' },
    ],
  },

  /* ---- Time-Series: emerging databases ---- */
  {
    id: 'emerging-tsdb',
    title: 'Emerging Time-Series Databases',
    parentId: 'other-tsdb',
    children: [
      { id: 'greptimedb', title: 'GreptimeDB' },
      { id: 'm3db', title: 'M3DB' },
      { id: 'horaedb', title: 'Apache HoraeDB' },
    ],
  },

  /* ---- Vector: Postgres extensions & managed/edge services ---- */
  {
    id: 'postgres-vector-extensions',
    title: 'PostgreSQL Vector Extensions',
    parentId: 'other-vector-dbs',
    children: [
      { id: 'pgvectorscale', title: 'pgvectorscale' },
      { id: 'vectorchord', title: 'VectorChord' },
    ],
  },
  {
    id: 'managed-vector-services',
    title: 'Managed & Edge Vector Services',
    parentId: 'other-vector-dbs',
    children: [
      { id: 'cloudflare-vectorize', title: 'Cloudflare Vectorize' },
      { id: 'upstash-vector', title: 'Upstash Vector' },
      { id: 'vertex-vector-search', title: 'Vertex AI Vector Search' },
    ],
  },

  /* ---- Specialized: edge SQL, local-first, reactive, BaaS ---- */
  {
    id: 'edge-sql-databases',
    title: 'Edge SQL Databases',
    parentId: 'specialized-stores',
    children: [
      { id: 'turso-libsql', title: 'Turso / libSQL' },
      { id: 'cloudflare-d1', title: 'Cloudflare D1' },
      { id: 'sqlite-at-edge', title: 'SQLite at the Edge' },
    ],
  },
  {
    id: 'local-first-sync-engines',
    title: 'Local-First Sync Engines',
    parentId: 'specialized-stores',
    children: [
      { id: 'electricsql', title: 'ElectricSQL' },
      { id: 'powersync', title: 'PowerSync' },
      { id: 'zero-rocicorp', title: 'Zero (Rocicorp)' },
      { id: 'yjs', title: 'Yjs' },
      { id: 'automerge', title: 'Automerge' },
    ],
  },
  {
    id: 'reactive-databases',
    title: 'Reactive Databases',
    parentId: 'specialized-stores',
    children: [
      { id: 'convex', title: 'Convex' },
      { id: 'instantdb', title: 'InstantDB' },
      { id: 'rxdb', title: 'RxDB' },
    ],
  },
  {
    id: 'backend-as-a-service-db',
    title: 'Backend-as-a-Service Databases',
    parentId: 'specialized-stores',
    children: [
      { id: 'supabase', title: 'Supabase' },
      { id: 'appwrite', title: 'Appwrite' },
      { id: 'pocketbase', title: 'PocketBase' },
      { id: 'nhost', title: 'Nhost' },
    ],
  },

  /* ---- Ledger: TigerBeetle ---- */
  { id: 'ledger-databases--tigerbeetle', title: 'TigerBeetle', parentId: 'ledger-databases' },

  /* ---- Streaming: NATS & Kafka-on-object-storage ---- */
  {
    id: 'nats',
    title: 'NATS / JetStream',
    parentId: 'streaming-event-stores',
    children: [
      { id: 'nats-jetstream', title: 'JetStream' },
      { id: 'nats-kv', title: 'NATS KV Store' },
      { id: 'nats-object-store', title: 'NATS Object Store' },
    ],
  },
  { id: 'streaming-platforms--warpstream', title: 'WarpStream (Kafka on S3)', parentId: 'streaming-platforms' },
  { id: 'streaming-platforms--bufstream', title: 'Bufstream', parentId: 'streaming-platforms' },

  /* ---- Object stores: open table formats & more providers ---- */
  {
    id: 'open-table-formats',
    title: 'Open Table Formats',
    parentId: 'object-blob-stores',
    children: [
      { id: 'apache-iceberg', title: 'Apache Iceberg' },
      { id: 'delta-lake', title: 'Delta Lake' },
      { id: 'apache-hudi', title: 'Apache Hudi' },
      { id: 'apache-paimon', title: 'Apache Paimon' },
    ],
  },
  { id: 'object-store-products--cloudflare-r2', title: 'Cloudflare R2', parentId: 'object-store-products' },
  { id: 'object-store-products--backblaze-b2', title: 'Backblaze B2', parentId: 'object-store-products' },
  { id: 'object-store-products--tigris', title: 'Tigris', parentId: 'object-store-products' },

  /* ---- Caching: in-process / embedded caches ---- */
  { id: 'cache-layers--caffeine', title: 'Caffeine', parentId: 'cache-layers' },
  { id: 'cache-layers--ehcache', title: 'Ehcache', parentId: 'cache-layers' },
  { id: 'cache-layers--in-process-cache', title: 'In-Process Caches', parentId: 'cache-layers' },

  /* ---- Serialization: high-performance formats ---- */
  { id: 'serialization-formats--apache-arrow', title: 'Apache Arrow', parentId: 'serialization-formats' },
  { id: 'serialization-formats--flatbuffers', title: 'FlatBuffers', parentId: 'serialization-formats' },
  { id: 'serialization-formats--capnproto', title: 'Cap\u2019n Proto', parentId: 'serialization-formats' },

  /* ---- Data modeling: tree encodings ---- */
  { id: 'relationships-in-nosql--closure-table', title: 'Closure Table', parentId: 'relationships-in-nosql' },
  { id: 'relationships-in-nosql--nested-set', title: 'Nested Set', parentId: 'relationships-in-nosql' },
  { id: 'relationships-in-nosql--materialized-path', title: 'Materialized Path', parentId: 'relationships-in-nosql' },

  /* ---- Indexing: geospatial index encodings ---- */
  { id: 'index-types-nosql--geohash', title: 'Geohash', parentId: 'index-types-nosql' },
  { id: 'index-types-nosql--h3', title: 'H3 Hexagonal Index', parentId: 'index-types-nosql' },
  { id: 'index-types-nosql--s2', title: 'S2 Geometry', parentId: 'index-types-nosql' },

  /* ---- Observability data backends ---- */
  {
    id: 'observability-backends',
    title: 'Observability Data Backends',
    parentId: 'monitoring-observability',
    children: [
      { id: 'grafana-loki', title: 'Grafana Loki (Logs)' },
      { id: 'grafana-tempo', title: 'Grafana Tempo (Traces)' },
      { id: 'clickhouse-observability', title: 'ClickHouse for Observability' },
    ],
  },

  /* ---- Multi-model: graph-relational ---- */
  { id: 'gel-edgedb', title: 'Gel (formerly EdgeDB)', parentId: 'multi-model-databases' },

  /* ---- RAG retrieval techniques ---- */
  { id: 'rag-integration--hybrid-search', title: 'Hybrid Search for RAG', parentId: 'rag-integration' },
  { id: 'rag-integration--contextual-retrieval', title: 'Contextual Retrieval', parentId: 'rag-integration' },
])
