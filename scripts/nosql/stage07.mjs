import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'wide-column-stores',
  rootStartOrder: 31,
  tree: [
    {
      id: 'wide-column-fundamentals',
      title: 'Wide-Column Store Fundamentals',
      summary: 'Column-family databases optimized for huge write-heavy workloads.',
      level: 'intermediate',
      children: [
        {
          id: 'wide-column-model',
          title: 'Data Model',
          children: [
            { id: 'column-families', title: 'Column Families' },
            { id: 'rows-columns-cells', title: 'Rows, Columns & Cells' },
            { id: 'partition-rows', title: 'Partitions & Rows' },
            { id: 'sparse-columns', title: 'Sparse, Wide Rows' },
            { id: 'wide-column-vs-columnar', title: 'Wide-Column vs Columnar (Analytics)' },
          ],
        },
        {
          id: 'wide-column-architecture',
          title: 'Architecture Concepts',
          children: [
            { id: 'lsm-storage-wc', title: 'LSM-Tree Storage' },
            { id: 'memtable-sstable', title: 'Memtable & SSTable' },
            { id: 'commit-log', title: 'Commit Log' },
            { id: 'compaction-wc', title: 'Compaction' },
            { id: 'tombstones', title: 'Tombstones & Deletes' },
          ],
        },
        {
          id: 'wide-column-use-cases',
          title: 'Use Cases',
          children: [
            { id: 'time-series-wc', title: 'Time-Series Data' },
            { id: 'iot-sensor-data', title: 'IoT & Sensor Data' },
            { id: 'messaging-feeds', title: 'Messaging & Feeds' },
            { id: 'write-heavy-workloads', title: 'Write-Heavy Workloads' },
          ],
        },
      ],
    },
    {
      id: 'cassandra',
      title: 'Apache Cassandra',
      summary: 'Masterless, highly-available wide-column database (Cassandra 5.x).',
      level: 'advanced',
      children: [
        {
          id: 'cassandra-basics',
          title: 'Cassandra Basics',
          children: [
            { id: 'cassandra-overview', title: 'Overview & History' },
            { id: 'cassandra-masterless', title: 'Masterless / Peer-to-Peer Architecture' },
            { id: 'cassandra-keyspaces-tables', title: 'Keyspaces & Tables' },
            { id: 'cassandra-installation', title: 'Installation & cqlsh' },
          ],
        },
        {
          id: 'cassandra-data-model',
          title: 'Data Model',
          children: [
            { id: 'cassandra-partition-key', title: 'Partition Key' },
            { id: 'cassandra-clustering-columns', title: 'Clustering Columns' },
            { id: 'cassandra-primary-key', title: 'Primary Key Design' },
            { id: 'cassandra-data-types', title: 'Data Types & Collections' },
            { id: 'cassandra-query-first-design', title: 'Query-First Table Design' },
            { id: 'cassandra-denormalization', title: 'Denormalization & Duplication' },
          ],
        },
        {
          id: 'cassandra-cql',
          title: 'CQL',
          children: [
            { id: 'cql-basics', title: 'CQL Basics' },
            { id: 'cql-queries', title: 'Queries & ALLOW FILTERING' },
            { id: 'cql-batches', title: 'Batches' },
            { id: 'cql-lightweight-transactions', title: 'Lightweight Transactions (LWT)' },
            { id: 'cql-collections-udt', title: 'Collections & UDTs' },
            { id: 'cql-counters', title: 'Counters' },
          ],
        },
        {
          id: 'cassandra-architecture',
          title: 'Architecture',
          children: [
            { id: 'cassandra-ring', title: 'Ring & Token Ranges' },
            { id: 'cassandra-virtual-nodes', title: 'Virtual Nodes' },
            { id: 'cassandra-replication-strategy', title: 'Replication Strategies' },
            { id: 'cassandra-snitch', title: 'Snitches & Topology' },
            { id: 'cassandra-gossip', title: 'Gossip Protocol' },
            { id: 'cassandra-consistency-levels', title: 'Tunable Consistency Levels' },
            { id: 'cassandra-read-write-path', title: 'Read & Write Path' },
          ],
        },
        {
          id: 'cassandra-storage',
          title: 'Storage & Maintenance',
          children: [
            { id: 'cassandra-memtable-sstable', title: 'Memtables & SSTables' },
            { id: 'cassandra-compaction-strategies', title: 'Compaction Strategies (UCS)' },
            { id: 'cassandra-repair', title: 'Repair & Anti-Entropy' },
            { id: 'cassandra-hinted-handoff', title: 'Hinted Handoff' },
            { id: 'cassandra-bloom-filters', title: 'Bloom Filters & Caches' },
          ],
        },
        {
          id: 'cassandra-indexing',
          title: 'Indexing & Search',
          children: [
            { id: 'cassandra-secondary-indexes', title: 'Secondary Indexes' },
            { id: 'cassandra-sai', title: 'Storage-Attached Indexes (SAI)' },
            { id: 'cassandra-materialized-views', title: 'Materialized Views' },
            { id: 'cassandra-vector-search', title: 'Vector Search' },
          ],
        },
        {
          id: 'cassandra-operations',
          title: 'Operations',
          children: [
            { id: 'cassandra-nodetool', title: 'nodetool & Management' },
            { id: 'cassandra-scaling-nodes', title: 'Adding/Removing Nodes' },
            { id: 'cassandra-multi-dc', title: 'Multi-Datacenter' },
            { id: 'cassandra-backup', title: 'Backup & Restore' },
            { id: 'cassandra-monitoring', title: 'Monitoring & Metrics' },
          ],
        },
        {
          id: 'cassandra-ecosystem',
          title: 'Ecosystem',
          children: [
            { id: 'cassandra-drivers', title: 'Drivers' },
            { id: 'datastax-astra', title: 'DataStax & Astra DB' },
            { id: 'cassandra-spark', title: 'Spark Integration' },
          ],
        },
      ],
    },
    {
      id: 'scylladb',
      title: 'ScyllaDB',
      summary: 'C++ rewrite of Cassandra with shard-per-core architecture.',
      level: 'advanced',
      children: [
        {
          id: 'scylladb-basics',
          title: 'ScyllaDB Basics',
          children: [
            { id: 'scylladb-overview', title: 'Overview & Cassandra Compatibility' },
            { id: 'scylladb-shard-per-core', title: 'Shard-Per-Core (Seastar)' },
            { id: 'scylladb-performance', title: 'Performance Advantages' },
          ],
        },
        {
          id: 'scylladb-features',
          title: 'Features',
          children: [
            { id: 'scylladb-workload-prioritization', title: 'Workload Prioritization' },
            { id: 'scylladb-cdc', title: 'Change Data Capture' },
            { id: 'scylladb-cloud', title: 'ScyllaDB Cloud' },
          ],
        },
      ],
    },
    {
      id: 'hbase',
      title: 'Apache HBase',
      summary: 'Hadoop-based wide-column store modeled on Google Bigtable.',
      level: 'advanced',
      children: [
        {
          id: 'hbase-basics',
          title: 'HBase Basics',
          children: [
            { id: 'hbase-overview', title: 'Overview & Bigtable Model' },
            { id: 'hbase-architecture', title: 'Architecture (HMaster, RegionServers)' },
            { id: 'hbase-regions', title: 'Regions & Region Splitting' },
            { id: 'hbase-hdfs-zookeeper', title: 'HDFS & ZooKeeper Dependency' },
          ],
        },
        {
          id: 'hbase-data-model',
          title: 'Data Model',
          children: [
            { id: 'hbase-row-keys', title: 'Row Key Design' },
            { id: 'hbase-column-families-hbase', title: 'Column Families & Qualifiers' },
            { id: 'hbase-versions-timestamps', title: 'Versions & Timestamps' },
          ],
        },
        {
          id: 'hbase-operations',
          title: 'Operations & Access',
          children: [
            { id: 'hbase-shell-api', title: 'Shell & Java API' },
            { id: 'hbase-scans-filters', title: 'Scans & Filters' },
            { id: 'hbase-coprocessors', title: 'Coprocessors' },
            { id: 'hbase-phoenix', title: 'Apache Phoenix (SQL)' },
          ],
        },
      ],
    },
    {
      id: 'bigtable',
      title: 'Google Cloud Bigtable',
      summary: 'Google\u2019s fully-managed wide-column database that inspired the family.',
      level: 'advanced',
      children: [
        {
          id: 'bigtable-basics',
          title: 'Bigtable Basics',
          children: [
            { id: 'bigtable-overview', title: 'Overview & History' },
            { id: 'bigtable-architecture', title: 'Architecture & Tablets' },
            { id: 'bigtable-row-key-design', title: 'Row Key Design' },
            { id: 'bigtable-column-families-bt', title: 'Column Families' },
          ],
        },
        {
          id: 'bigtable-features',
          title: 'Features',
          children: [
            { id: 'bigtable-performance-scaling', title: 'Performance & Scaling' },
            { id: 'bigtable-replication-bt', title: 'Replication' },
            { id: 'bigtable-hbase-compatibility', title: 'HBase API Compatibility' },
            { id: 'bigtable-sql-support', title: 'SQL Support' },
          ],
        },
      ],
    },
    {
      id: 'other-wide-column',
      title: 'Other Wide-Column / Compatible',
      summary: 'Managed and compatible wide-column services.',
      level: 'advanced',
      children: [
        {
          id: 'amazon-keyspaces',
          title: 'Amazon Keyspaces',
          children: [
            { id: 'keyspaces-overview', title: 'Overview (Managed Cassandra)' },
          ],
        },
        {
          id: 'cosmos-cassandra-api',
          title: 'Azure Cosmos DB (Cassandra API)',
          children: [
            { id: 'cosmos-cassandra-overview', title: 'Overview' },
          ],
        },
        {
          id: 'apache-accumulo',
          title: 'Apache Accumulo',
          children: [
            { id: 'accumulo-overview', title: 'Overview & Cell-Level Security' },
          ],
        },
      ],
    },
  ],
})
