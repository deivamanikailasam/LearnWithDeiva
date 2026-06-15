import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'performance-scaling',
  rootStartOrder: 70,
  tree: [
    {
      id: 'performance-fundamentals',
      title: 'Performance Fundamentals',
      summary: 'Measuring and improving NoSQL read/write performance.',
      level: 'advanced',
      children: [
        {
          id: 'performance-metrics',
          title: 'Performance Metrics',
          children: [
            { id: 'latency-percentiles', title: 'Latency & Percentiles (p50/p99)' },
            { id: 'throughput-qps', title: 'Throughput (QPS/OPS)' },
            { id: 'tail-latency', title: 'Tail Latency' },
            { id: 'read-write-amplification', title: 'Read/Write Amplification' },
          ],
        },
        {
          id: 'query-optimization',
          title: 'Query Optimization',
          children: [
            { id: 'query-profiling', title: 'Query Profiling & explain()' },
            { id: 'avoiding-full-scans', title: 'Avoiding Full Scans' },
            { id: 'projection-optimization', title: 'Projection & Field Selection' },
            { id: 'pagination-performance', title: 'Efficient Pagination' },
            { id: 'n-plus-one-nosql', title: 'Avoiding N+1 Access' },
          ],
        },
        {
          id: 'write-optimization',
          title: 'Write Optimization',
          children: [
            { id: 'batching-writes', title: 'Batching & Bulk Writes' },
            { id: 'write-buffering', title: 'Write Buffering' },
            { id: 'bulk-loading', title: 'Bulk Loading' },
            { id: 'compaction-tuning', title: 'Compaction Tuning' },
          ],
        },
        {
          id: 'storage-memory-tuning',
          title: 'Storage & Memory Tuning',
          children: [
            { id: 'working-set-memory', title: 'Working Set & Memory' },
            { id: 'cache-hit-ratio', title: 'Cache Hit Ratio' },
            { id: 'disk-io-tuning', title: 'Disk I/O Tuning' },
            { id: 'data-compression-perf', title: 'Compression Trade-offs' },
          ],
        },
      ],
    },
    {
      id: 'caching-strategies',
      title: 'Caching Strategies',
      summary: 'Using caches to reduce database load and latency.',
      level: 'advanced',
      children: [
        {
          id: 'cache-patterns',
          title: 'Caching Patterns',
          children: [
            { id: 'cache-aside', title: 'Cache-Aside (Lazy Loading)' },
            { id: 'read-through', title: 'Read-Through' },
            { id: 'write-through', title: 'Write-Through' },
            { id: 'write-behind', title: 'Write-Behind (Write-Back)' },
            { id: 'refresh-ahead', title: 'Refresh-Ahead' },
          ],
        },
        {
          id: 'cache-invalidation',
          title: 'Cache Invalidation',
          children: [
            { id: 'ttl-based-invalidation', title: 'TTL-Based' },
            { id: 'event-based-invalidation', title: 'Event-Based' },
            { id: 'versioned-keys', title: 'Versioned Keys' },
            { id: 'cache-stampede', title: 'Cache Stampede & Locking' },
          ],
        },
        {
          id: 'cache-layers',
          title: 'Cache Layers',
          children: [
            { id: 'client-cache', title: 'Client-Side Cache' },
            { id: 'cdn-cache', title: 'CDN Cache' },
            { id: 'application-cache', title: 'Application / Distributed Cache' },
            { id: 'database-cache', title: 'Database Internal Cache' },
          ],
        },
      ],
    },
    {
      id: 'scaling-strategies',
      title: 'Scaling Strategies',
      summary: 'Growing capacity and throughput as load increases.',
      level: 'advanced',
      children: [
        {
          id: 'scaling-approaches',
          title: 'Scaling Approaches',
          children: [
            { id: 'vertical-scaling', title: 'Vertical Scaling' },
            { id: 'horizontal-scaling-scale', title: 'Horizontal Scaling' },
            { id: 'read-scaling', title: 'Read Scaling (Replicas)' },
            { id: 'write-scaling', title: 'Write Scaling (Sharding)' },
            { id: 'auto-scaling-db', title: 'Auto-Scaling' },
          ],
        },
        {
          id: 'sharding-in-practice',
          title: 'Sharding in Practice',
          children: [
            { id: 'shard-key-selection-perf', title: 'Shard Key Selection' },
            { id: 'resharding-operations', title: 'Resharding' },
            { id: 'avoiding-hotspots-scale', title: 'Avoiding Hotspots' },
            { id: 'cross-shard-queries-perf', title: 'Cross-Shard Query Cost' },
          ],
        },
        {
          id: 'connection-scaling',
          title: 'Connection Scaling',
          children: [
            { id: 'connection-pooling-scale', title: 'Connection Pooling' },
            { id: 'connection-proxies', title: 'Connection Proxies' },
            { id: 'serverless-connections', title: 'Serverless Connection Limits' },
          ],
        },
      ],
    },
    {
      id: 'reliability-resilience',
      title: 'Reliability & Resilience',
      summary: 'Keeping databases available and durable under failures.',
      level: 'advanced',
      children: [
        {
          id: 'high-availability-design',
          title: 'High Availability',
          children: [
            { id: 'redundancy-replicas-ha', title: 'Redundancy & Replicas' },
            { id: 'failover-mechanisms', title: 'Failover Mechanisms' },
            { id: 'multi-az-deployment', title: 'Multi-AZ Deployment' },
            { id: 'multi-region-ha', title: 'Multi-Region HA' },
          ],
        },
        {
          id: 'fault-tolerance-patterns',
          title: 'Fault Tolerance Patterns',
          children: [
            { id: 'retries-backoff', title: 'Retries & Exponential Backoff' },
            { id: 'circuit-breaker', title: 'Circuit Breaker' },
            { id: 'bulkhead', title: 'Bulkhead Isolation' },
            { id: 'graceful-degradation', title: 'Graceful Degradation' },
            { id: 'timeouts-deadlines', title: 'Timeouts & Deadlines' },
          ],
        },
        {
          id: 'durability-recovery',
          title: 'Durability & Recovery',
          children: [
            { id: 'durability-guarantees', title: 'Durability Guarantees' },
            { id: 'disaster-recovery', title: 'Disaster Recovery' },
            { id: 'rpo-rto', title: 'RPO & RTO' },
            { id: 'data-corruption-handling', title: 'Data Corruption Handling' },
          ],
        },
        {
          id: 'chaos-testing',
          title: 'Reliability Testing',
          children: [
            { id: 'chaos-engineering', title: 'Chaos Engineering' },
            { id: 'failure-injection', title: 'Failure Injection' },
            { id: 'load-testing-reliability', title: 'Load & Stress Testing' },
          ],
        },
      ],
    },
    {
      id: 'capacity-benchmarking',
      title: 'Capacity Planning & Benchmarking',
      summary: 'Sizing clusters and measuring database performance objectively.',
      level: 'advanced',
      children: [
        {
          id: 'capacity-planning',
          title: 'Capacity Planning',
          children: [
            { id: 'workload-estimation', title: 'Workload Estimation' },
            { id: 'storage-sizing', title: 'Storage Sizing' },
            { id: 'throughput-planning', title: 'Throughput Planning' },
            { id: 'growth-forecasting', title: 'Growth Forecasting' },
          ],
        },
        {
          id: 'benchmarking',
          title: 'Benchmarking',
          children: [
            { id: 'ycsb', title: 'YCSB' },
            { id: 'tpc-benchmarks', title: 'TPC Benchmarks' },
            { id: 'custom-benchmarks', title: 'Custom Benchmarks' },
            { id: 'benchmark-pitfalls', title: 'Benchmarking Pitfalls' },
          ],
        },
      ],
    },
  ],
})
