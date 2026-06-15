import { addTopics } from './addTopics.mjs'

addTopics([
  /* ---- Real-time analytics / OLAP datastores (big NoSQL-adjacent gap) ---- */
  {
    id: 'realtime-analytics-stores',
    title: 'Real-Time Analytics / OLAP Stores',
    parentId: 'specialized-stores',
    children: [
      { id: 'apache-druid', title: 'Apache Druid' },
      { id: 'apache-pinot', title: 'Apache Pinot' },
      { id: 'starrocks', title: 'StarRocks' },
      { id: 'apache-doris', title: 'Apache Doris' },
      { id: 'apache-kudu', title: 'Apache Kudu' },
      { id: 'clickhouse-olap', title: 'ClickHouse (OLAP)' },
    ],
  },

  /* ---- Streaming databases (incremental view maintenance) ---- */
  {
    id: 'streaming-databases',
    title: 'Streaming Databases',
    parentId: 'streaming-event-stores',
    children: [
      { id: 'materialize', title: 'Materialize' },
      { id: 'risingwave', title: 'RisingWave' },
      { id: 'readyset', title: 'ReadySet' },
    ],
  },

  /* ---- Compression codecs ---- */
  {
    id: 'compression-codecs',
    title: 'Compression Codecs',
    parentId: 'data-storage-fundamentals',
    children: [
      { id: 'zstandard', title: 'Zstandard (zstd)' },
      { id: 'lz4', title: 'LZ4' },
      { id: 'snappy', title: 'Snappy' },
      { id: 'gzip-deflate', title: 'Gzip / Deflate' },
      { id: 'dictionary-compression', title: 'Dictionary Compression' },
    ],
  },

  /* ---- Index internals: additional index structures ---- */
  { id: 'index-internals--gin-index', title: 'GIN Index (Postgres)', parentId: 'index-internals' },
  { id: 'index-internals--gist-index', title: 'GiST Index', parentId: 'index-internals' },
  { id: 'index-internals--brin-index', title: 'BRIN Index', parentId: 'index-internals' },
  { id: 'index-internals--bitmap-index', title: 'Bitmap Index', parentId: 'index-internals' },

  /* ---- Cassandra 5.x specifics ---- */
  { id: 'cassandra-architecture--accord-transactions', title: 'Accord (General-Purpose Transactions)', parentId: 'cassandra-architecture' },
  { id: 'cassandra-storage--trie-memtables', title: 'Trie Memtables', parentId: 'cassandra-storage' },

  /* ---- RDF: ontologies & reasoning ---- */
  { id: 'rdf-triple-stores-specialized--ontologies-owl-rdfs', title: 'Ontologies (RDFS / OWL)', parentId: 'rdf-triple-stores-specialized' },
  { id: 'rdf-triple-stores-specialized--reasoning-inference', title: 'Reasoning & Inference', parentId: 'rdf-triple-stores-specialized' },
  { id: 'rdf-triple-stores-specialized--shacl', title: 'SHACL Validation', parentId: 'rdf-triple-stores-specialized' },

  /* ---- ANN libraries ---- */
  { id: 'other-vector-engines--scann', title: 'ScaNN', parentId: 'other-vector-engines' },
  { id: 'other-vector-engines--annoy', title: 'Annoy', parentId: 'other-vector-engines' },
  { id: 'other-vector-engines--hnswlib', title: 'hnswlib', parentId: 'other-vector-engines' },
  { id: 'other-vector-engines--usearch', title: 'USearch', parentId: 'other-vector-engines' },

  /* ---- Vector: retrieval & embedding techniques ---- */
  { id: 'vector-search-features--pre-vs-post-filtering', title: 'Pre- vs Post-Filtering', parentId: 'vector-search-features' },
  { id: 'embeddings--matryoshka-embeddings', title: 'Matryoshka Embeddings', parentId: 'embeddings' },
  { id: 'embeddings--fine-tuning-embeddings', title: 'Fine-Tuning Embeddings', parentId: 'embeddings' },
  { id: 'vector-indexes--spann', title: 'SPANN', parentId: 'vector-indexes' },

  /* ---- Redis 8 feature specifics ---- */
  { id: 'redis-features--hash-field-ttl', title: 'Hash Field TTL (HEXPIRE)', parentId: 'redis-features' },
  { id: 'redis-features--sharded-pubsub', title: 'Sharded Pub/Sub', parentId: 'redis-features' },
  {
    id: 'redis-probabilistic-data',
    title: 'Probabilistic Data Structures',
    parentId: 'redis',
    children: [
      { id: 'cuckoo-filter', title: 'Cuckoo Filter' },
      { id: 'count-min-sketch', title: 'Count-Min Sketch' },
      { id: 'top-k', title: 'Top-K' },
      { id: 't-digest', title: 't-digest' },
    ],
  },

  /* ---- CDC: additional tools ---- */
  { id: 'cdc-tools--estuary-flow', title: 'Estuary Flow', parentId: 'cdc-tools' },
  { id: 'cdc-tools--sequin', title: 'Sequin', parentId: 'cdc-tools' },
])
