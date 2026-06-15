import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'key-value-stores',
  rootStartOrder: 19,
  tree: [
    {
      id: 'key-value-fundamentals',
      title: 'Key-Value Store Fundamentals',
      summary: 'The simplest NoSQL model: keys mapped to opaque values.',
      level: 'beginner',
      children: [
        {
          id: 'kv-data-model',
          title: 'Data Model',
          children: [
            { id: 'keys-and-values', title: 'Keys & Values' },
            { id: 'opaque-vs-structured-values', title: 'Opaque vs Structured Values' },
            { id: 'namespaces-buckets', title: 'Namespaces & Buckets' },
            { id: 'kv-key-naming', title: 'Key Naming Conventions' },
          ],
        },
        {
          id: 'kv-operations',
          title: 'Core Operations',
          children: [
            { id: 'get-put-delete', title: 'GET / PUT / DELETE' },
            { id: 'conditional-writes-kv', title: 'Conditional Writes' },
            { id: 'batch-operations-kv', title: 'Batch & Bulk Operations' },
            { id: 'ttl-expiration-kv', title: 'TTL & Expiration' },
            { id: 'atomic-counters', title: 'Atomic Counters' },
          ],
        },
        {
          id: 'kv-characteristics',
          title: 'Characteristics',
          children: [
            { id: 'kv-performance', title: 'Performance & Low Latency' },
            { id: 'kv-simplicity', title: 'Simplicity & Predictability' },
            { id: 'kv-limitations', title: 'Limitations (No Rich Queries)' },
          ],
        },
        {
          id: 'kv-use-cases-detail',
          title: 'Use Cases',
          children: [
            { id: 'caching-use-case', title: 'Caching' },
            { id: 'session-store', title: 'Session Store' },
            { id: 'feature-flags', title: 'Feature Flags & Config' },
            { id: 'rate-limiting', title: 'Rate Limiting' },
            { id: 'leaderboards-counters', title: 'Leaderboards & Counters' },
            { id: 'shopping-carts', title: 'Shopping Carts' },
          ],
        },
        {
          id: 'in-memory-vs-persistent-kv',
          title: 'In-Memory vs Persistent',
          children: [
            { id: 'in-memory-kv', title: 'In-Memory Stores' },
            { id: 'persistent-kv', title: 'Persistent Stores' },
            { id: 'embedded-kv', title: 'Embedded KV Engines' },
          ],
        },
      ],
    },
    {
      id: 'redis',
      title: 'Redis',
      summary: 'The most popular in-memory data store (Redis 8 / Open Source).',
      level: 'intermediate',
      children: [
        {
          id: 'redis-basics',
          title: 'Redis Basics',
          children: [
            { id: 'redis-overview', title: 'Overview & Architecture' },
            { id: 'redis-installation', title: 'Installation & redis-cli' },
            { id: 'redis-single-threaded', title: 'Single-Threaded Model & I/O Threads' },
            { id: 'redis-keyspace', title: 'Keyspace & Key Expiration' },
            { id: 'redis-licensing', title: 'Licensing (AGPL) & Valkey Fork' },
          ],
        },
        {
          id: 'redis-data-types',
          title: 'Data Types',
          children: [
            { id: 'redis-strings', title: 'Strings' },
            { id: 'redis-lists', title: 'Lists' },
            { id: 'redis-sets', title: 'Sets' },
            { id: 'redis-sorted-sets', title: 'Sorted Sets' },
            { id: 'redis-hashes', title: 'Hashes' },
            { id: 'redis-streams', title: 'Streams' },
            { id: 'redis-bitmaps', title: 'Bitmaps' },
            { id: 'redis-hyperloglog', title: 'HyperLogLog' },
            { id: 'redis-geospatial', title: 'Geospatial' },
            { id: 'redis-vector-sets', title: 'Vector Sets' },
          ],
        },
        {
          id: 'redis-features',
          title: 'Core Features',
          children: [
            { id: 'redis-pubsub', title: 'Pub/Sub' },
            { id: 'redis-transactions', title: 'Transactions (MULTI/EXEC)' },
            { id: 'redis-pipelining', title: 'Pipelining' },
            { id: 'redis-lua-scripting', title: 'Lua Scripting' },
            { id: 'redis-functions', title: 'Redis Functions' },
            { id: 'redis-keyspace-notifications', title: 'Keyspace Notifications' },
            { id: 'redis-client-side-caching', title: 'Client-Side Caching' },
          ],
        },
        {
          id: 'redis-persistence',
          title: 'Persistence',
          children: [
            { id: 'redis-rdb', title: 'RDB Snapshots' },
            { id: 'redis-aof', title: 'AOF (Append-Only File)' },
            { id: 'redis-hybrid-persistence', title: 'Hybrid Persistence' },
            { id: 'redis-durability-tradeoffs', title: 'Durability Trade-offs' },
          ],
        },
        {
          id: 'redis-scaling',
          title: 'Scaling & HA',
          children: [
            { id: 'redis-replication', title: 'Replication' },
            { id: 'redis-sentinel', title: 'Redis Sentinel' },
            { id: 'redis-cluster', title: 'Redis Cluster' },
            { id: 'redis-hash-slots', title: 'Hash Slots & Resharding' },
            { id: 'redis-eviction-policies', title: 'Memory & Eviction Policies' },
          ],
        },
        {
          id: 'redis-modules-stack',
          title: 'Redis Stack & Modules',
          children: [
            { id: 'redis-json', title: 'RedisJSON' },
            { id: 'redis-search', title: 'RediSearch (Query Engine)' },
            { id: 'redis-timeseries', title: 'RedisTimeSeries' },
            { id: 'redis-bloom', title: 'RedisBloom (Probabilistic)' },
            { id: 'redis-vector-search', title: 'Vector Search' },
          ],
        },
        {
          id: 'redis-patterns',
          title: 'Patterns & Practices',
          children: [
            { id: 'redis-as-cache', title: 'Caching Patterns' },
            { id: 'redis-distributed-locks', title: 'Distributed Locks (Redlock)' },
            { id: 'redis-rate-limiting', title: 'Rate Limiting' },
            { id: 'redis-queues', title: 'Queues & Streams Processing' },
            { id: 'redis-best-practices', title: 'Best Practices & Anti-Patterns' },
          ],
        },
        {
          id: 'redis-ecosystem',
          title: 'Ecosystem & Variants',
          children: [
            { id: 'redis-enterprise', title: 'Redis Enterprise & Cloud' },
            { id: 'valkey', title: 'Valkey' },
            { id: 'keydb', title: 'KeyDB' },
            { id: 'dragonfly', title: 'DragonflyDB' },
            { id: 'redis-clients', title: 'Client Libraries' },
          ],
        },
      ],
    },
    {
      id: 'dynamodb',
      title: 'Amazon DynamoDB',
      summary: 'Fully-managed, serverless key-value and document database on AWS.',
      level: 'intermediate',
      children: [
        {
          id: 'dynamodb-basics',
          title: 'DynamoDB Basics',
          children: [
            { id: 'dynamodb-overview', title: 'Overview & History (Dynamo Paper)' },
            { id: 'dynamodb-tables-items', title: 'Tables, Items & Attributes' },
            { id: 'dynamodb-data-types', title: 'Data Types' },
            { id: 'dynamodb-primary-keys', title: 'Partition & Sort Keys' },
          ],
        },
        {
          id: 'dynamodb-capacity',
          title: 'Capacity & Performance',
          children: [
            { id: 'dynamodb-on-demand', title: 'On-Demand Mode' },
            { id: 'dynamodb-provisioned', title: 'Provisioned Capacity' },
            { id: 'dynamodb-auto-scaling', title: 'Auto Scaling' },
            { id: 'dynamodb-partitions-throughput', title: 'Partitions & Throughput' },
            { id: 'dynamodb-adaptive-capacity', title: 'Adaptive Capacity' },
          ],
        },
        {
          id: 'dynamodb-indexes',
          title: 'Indexes',
          children: [
            { id: 'dynamodb-gsi', title: 'Global Secondary Indexes' },
            { id: 'dynamodb-lsi', title: 'Local Secondary Indexes' },
            { id: 'dynamodb-sparse-indexes', title: 'Sparse Indexes' },
          ],
        },
        {
          id: 'dynamodb-operations',
          title: 'Operations & API',
          children: [
            { id: 'dynamodb-crud', title: 'CRUD Operations' },
            { id: 'dynamodb-query-scan', title: 'Query vs Scan' },
            { id: 'dynamodb-batch-ops', title: 'Batch Operations' },
            { id: 'dynamodb-transactions', title: 'Transactions' },
            { id: 'dynamodb-pagination', title: 'Pagination' },
            { id: 'dynamodb-conditional-expressions', title: 'Condition Expressions' },
            { id: 'dynamodb-partiql', title: 'PartiQL' },
          ],
        },
        {
          id: 'dynamodb-advanced',
          title: 'Advanced Features',
          children: [
            { id: 'dynamodb-streams', title: 'DynamoDB Streams' },
            { id: 'dynamodb-dax', title: 'DAX (Accelerator)' },
            { id: 'dynamodb-global-tables', title: 'Global Tables' },
            { id: 'dynamodb-ttl', title: 'TTL' },
            { id: 'dynamodb-backup-restore', title: 'Backup, Restore & PITR' },
            { id: 'dynamodb-export-s3', title: 'Export to S3' },
          ],
        },
        {
          id: 'dynamodb-design',
          title: 'Design & Best Practices',
          children: [
            { id: 'dynamodb-single-table', title: 'Single-Table Design' },
            { id: 'dynamodb-access-patterns', title: 'Access-Pattern Modeling' },
            { id: 'dynamodb-hot-partition-avoid', title: 'Avoiding Hot Partitions' },
            { id: 'dynamodb-cost-optimization', title: 'Cost Optimization' },
          ],
        },
      ],
    },
    {
      id: 'memcached',
      title: 'Memcached',
      summary: 'Simple, high-performance distributed memory caching system.',
      level: 'beginner',
      children: [
        {
          id: 'memcached-basics',
          title: 'Memcached Basics',
          children: [
            { id: 'memcached-overview', title: 'Overview & Architecture' },
            { id: 'memcached-operations', title: 'Operations' },
            { id: 'memcached-slab-allocation', title: 'Slab Allocation' },
            { id: 'memcached-lru-eviction', title: 'LRU Eviction' },
          ],
        },
        {
          id: 'memcached-scaling',
          title: 'Scaling',
          children: [
            { id: 'memcached-client-sharding', title: 'Client-Side Sharding' },
            { id: 'memcached-consistent-hashing', title: 'Consistent Hashing' },
          ],
        },
        {
          id: 'memcached-vs-redis',
          title: 'Memcached vs Redis',
          children: [
            { id: 'feature-comparison-mc-redis', title: 'Feature Comparison' },
            { id: 'when-to-use-memcached', title: 'When to Use Memcached' },
          ],
        },
      ],
    },
    {
      id: 'other-kv-stores',
      title: 'Other Key-Value Stores',
      summary: 'Specialized and embedded key-value engines beyond Redis & DynamoDB.',
      level: 'advanced',
      children: [
        {
          id: 'etcd',
          title: 'etcd',
          children: [
            { id: 'etcd-overview', title: 'Overview & Raft' },
            { id: 'etcd-use-in-kubernetes', title: 'Use in Kubernetes' },
            { id: 'etcd-watch-leases', title: 'Watches & Leases' },
          ],
        },
        {
          id: 'aerospike',
          title: 'Aerospike',
          children: [
            { id: 'aerospike-overview', title: 'Overview' },
            { id: 'aerospike-hybrid-memory', title: 'Hybrid Memory Architecture' },
          ],
        },
        {
          id: 'riak-kv',
          title: 'Riak KV',
          children: [
            { id: 'riak-overview', title: 'Overview (Dynamo-Style)' },
            { id: 'riak-consistency', title: 'Consistency & Conflict Resolution' },
          ],
        },
        {
          id: 'embedded-kv-engines',
          title: 'Embedded KV Engines',
          children: [
            { id: 'rocksdb', title: 'RocksDB' },
            { id: 'leveldb', title: 'LevelDB' },
            { id: 'lmdb', title: 'LMDB' },
            { id: 'badgerdb', title: 'BadgerDB' },
            { id: 'boltdb', title: 'BoltDB / bbolt' },
          ],
        },
        {
          id: 'distributed-kv-other',
          title: 'Other Distributed KV',
          children: [
            { id: 'foundationdb', title: 'FoundationDB' },
            { id: 'tikv', title: 'TiKV' },
            { id: 'hazelcast', title: 'Hazelcast' },
            { id: 'apache-ignite', title: 'Apache Ignite' },
          ],
        },
      ],
    },
  ],
})
