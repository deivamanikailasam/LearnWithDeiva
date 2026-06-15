import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'foundations',
  rootStartOrder: 1,
  tree: [
    {
      id: 'data-storage-fundamentals',
      title: 'Data & Storage Fundamentals',
      summary: 'How data is represented, stored and structured on disk and in memory.',
      level: 'beginner',
      children: [
        {
          id: 'data-types-of-data',
          title: 'Types of Data',
          children: [
            { id: 'structured-data', title: 'Structured Data' },
            { id: 'semi-structured-data', title: 'Semi-Structured Data' },
            { id: 'unstructured-data', title: 'Unstructured Data' },
            { id: 'data-vs-information', title: 'Data vs Information' },
            { id: 'metadata', title: 'Metadata' },
          ],
        },
        {
          id: 'storage-basics',
          title: 'Storage Basics',
          children: [
            { id: 'memory-vs-disk', title: 'Memory vs Disk' },
            { id: 'volatile-vs-persistent', title: 'Volatile vs Persistent Storage' },
            { id: 'hdd-vs-ssd', title: 'HDD vs SSD' },
            { id: 'files-and-filesystems', title: 'Files & Filesystems' },
            { id: 'blocks-pages-sectors', title: 'Blocks, Pages & Sectors' },
            { id: 'sequential-vs-random-io', title: 'Sequential vs Random I/O' },
          ],
        },
        {
          id: 'storage-data-structures',
          title: 'Storage Data Structures',
          children: [
            { id: 'hash-tables', title: 'Hash Tables' },
            { id: 'b-trees-b-plus-trees', title: 'B-Trees & B+ Trees' },
            { id: 'lsm-trees', title: 'LSM Trees' },
            { id: 'sstables', title: 'SSTables' },
            { id: 'skip-lists', title: 'Skip Lists' },
            { id: 'bloom-filters', title: 'Bloom Filters' },
            { id: 'write-ahead-log', title: 'Write-Ahead Log (WAL)' },
          ],
        },
        {
          id: 'serialization-formats',
          title: 'Data Serialization Formats',
          children: [
            { id: 'json', title: 'JSON' },
            { id: 'bson', title: 'BSON' },
            { id: 'xml', title: 'XML' },
            { id: 'yaml', title: 'YAML' },
            { id: 'csv', title: 'CSV' },
            { id: 'protocol-buffers', title: 'Protocol Buffers' },
            { id: 'avro', title: 'Apache Avro' },
            { id: 'messagepack', title: 'MessagePack' },
            { id: 'parquet-orc', title: 'Parquet & ORC' },
          ],
        },
        {
          id: 'encoding-basics',
          title: 'Encoding & Compression',
          children: [
            { id: 'character-encoding', title: 'Character Encoding (UTF-8, Unicode)' },
            { id: 'binary-vs-text', title: 'Binary vs Text Formats' },
            { id: 'compression-basics', title: 'Compression Basics' },
            { id: 'hashing-checksums', title: 'Hashing & Checksums' },
          ],
        },
      ],
    },
    {
      id: 'databases-overview',
      title: 'Databases Overview',
      summary: 'What databases are, how a DBMS is built and the main workloads.',
      level: 'beginner',
      children: [
        {
          id: 'what-is-a-database',
          title: 'What is a Database',
          children: [
            { id: 'database-definition', title: 'Database Definition' },
            { id: 'dbms', title: 'Database Management System (DBMS)' },
            { id: 'data-model-concept', title: 'Data Model Concept' },
            { id: 'schema-vs-schemaless', title: 'Schema vs Schemaless' },
            { id: 'database-instance-vs-schema', title: 'Instance vs Schema' },
          ],
        },
        {
          id: 'database-history',
          title: 'History & Evolution',
          children: [
            { id: 'flat-files', title: 'Flat Files' },
            { id: 'hierarchical-network-dbs', title: 'Hierarchical & Network Databases' },
            { id: 'relational-era', title: 'The Relational Era' },
            { id: 'big-data-era', title: 'The Big Data Era' },
            { id: 'nosql-movement', title: 'The NoSQL Movement' },
            { id: 'newsql-era', title: 'NewSQL & Beyond' },
          ],
        },
        {
          id: 'dbms-components',
          title: 'DBMS Components',
          children: [
            { id: 'storage-engine', title: 'Storage Engine' },
            { id: 'query-processor', title: 'Query Processor' },
            { id: 'query-optimizer', title: 'Query Optimizer' },
            { id: 'transaction-manager', title: 'Transaction Manager' },
            { id: 'buffer-pool-cache', title: 'Buffer Pool & Cache' },
            { id: 'catalog-metadata', title: 'Catalog & Metadata' },
          ],
        },
        {
          id: 'database-workloads',
          title: 'Database Workloads',
          children: [
            { id: 'oltp', title: 'OLTP' },
            { id: 'olap', title: 'OLAP' },
            { id: 'htap', title: 'HTAP' },
            { id: 'read-vs-write-heavy', title: 'Read-Heavy vs Write-Heavy' },
            { id: 'data-warehouse-vs-lake', title: 'Data Warehouse vs Data Lake' },
          ],
        },
      ],
    },
    {
      id: 'relational-sql-recap',
      title: 'Relational Databases & SQL Recap',
      summary: 'The relational model, SQL and ACID — the baseline NoSQL departs from.',
      level: 'beginner',
      children: [
        {
          id: 'relational-model',
          title: 'Relational Model',
          children: [
            { id: 'tables-rows-columns', title: 'Tables, Rows & Columns' },
            { id: 'primary-foreign-keys', title: 'Primary & Foreign Keys' },
            { id: 'relationships', title: 'Relationships (1:1, 1:N, N:M)' },
            { id: 'normalization', title: 'Normalization (1NF–BCNF)' },
            { id: 'denormalization-intro', title: 'Denormalization' },
            { id: 'constraints', title: 'Constraints' },
          ],
        },
        {
          id: 'sql-basics',
          title: 'SQL Basics',
          children: [
            { id: 'ddl', title: 'DDL (CREATE, ALTER, DROP)' },
            { id: 'dml', title: 'DML (INSERT, UPDATE, DELETE)' },
            { id: 'select-queries', title: 'SELECT Queries' },
            { id: 'joins', title: 'Joins' },
            { id: 'aggregations-grouping', title: 'Aggregations & Grouping' },
            { id: 'sql-indexes', title: 'Indexes' },
            { id: 'views', title: 'Views' },
          ],
        },
        {
          id: 'acid-transactions',
          title: 'ACID Transactions',
          children: [
            { id: 'atomicity', title: 'Atomicity' },
            { id: 'consistency-acid', title: 'Consistency (ACID)' },
            { id: 'isolation', title: 'Isolation' },
            { id: 'durability', title: 'Durability' },
            { id: 'isolation-levels', title: 'Isolation Levels' },
            { id: 'locking-mvcc', title: 'Locking & MVCC' },
          ],
        },
        {
          id: 'rdbms-limitations',
          title: 'RDBMS Limitations at Scale',
          children: [
            { id: 'vertical-scaling-limits', title: 'Vertical Scaling Limits' },
            { id: 'rigid-schema', title: 'Rigid Schema' },
            { id: 'impedance-mismatch', title: 'Object-Relational Impedance Mismatch' },
            { id: 'join-cost-at-scale', title: 'Join Cost at Scale' },
            { id: 'sharding-pain-rdbms', title: 'Manual Sharding Pain' },
          ],
        },
      ],
    },
    {
      id: 'systems-foundations',
      title: 'OS, Networking & Concurrency Basics',
      summary: 'Operating-system, networking and concurrency concepts databases rely on.',
      level: 'beginner',
      children: [
        {
          id: 'os-basics',
          title: 'Operating System Basics',
          children: [
            { id: 'processes-threads', title: 'Processes & Threads' },
            { id: 'memory-management-os', title: 'Memory Management' },
            { id: 'file-io', title: 'File I/O & System Calls' },
            { id: 'page-cache', title: 'OS Page Cache' },
          ],
        },
        {
          id: 'networking-basics',
          title: 'Networking Basics',
          children: [
            { id: 'client-server-model', title: 'Client-Server Model' },
            { id: 'tcp-ip', title: 'TCP/IP' },
            { id: 'http-rest', title: 'HTTP & REST' },
            { id: 'rpc-grpc', title: 'RPC & gRPC' },
            { id: 'latency-throughput', title: 'Latency & Throughput' },
            { id: 'connection-pooling', title: 'Connection Pooling' },
          ],
        },
        {
          id: 'concurrency-basics',
          title: 'Concurrency Basics',
          children: [
            { id: 'concurrency-vs-parallelism', title: 'Concurrency vs Parallelism' },
            { id: 'race-conditions', title: 'Race Conditions' },
            { id: 'locks-mutexes', title: 'Locks & Mutexes' },
            { id: 'deadlocks', title: 'Deadlocks' },
            { id: 'atomic-operations', title: 'Atomic Operations' },
          ],
        },
        {
          id: 'dev-tooling',
          title: 'Developer Tooling',
          children: [
            { id: 'cli-shell', title: 'CLI & Shell' },
            { id: 'docker-for-databases', title: 'Docker for Databases' },
            { id: 'db-clients-guis', title: 'Database Clients & GUIs' },
            { id: 'cloud-accounts', title: 'Cloud Accounts & Free Tiers' },
          ],
        },
      ],
    },
  ],
})
