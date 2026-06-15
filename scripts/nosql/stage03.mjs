import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'distributed-systems',
  rootStartOrder: 9,
  tree: [
    {
      id: 'distributed-systems-basics',
      title: 'Distributed Systems Basics',
      summary: 'Core ideas, models and fallacies behind distributed databases.',
      level: 'intermediate',
      children: [
        {
          id: 'distributed-fundamentals',
          title: 'Fundamentals',
          children: [
            { id: 'what-is-distributed-system', title: 'What is a Distributed System' },
            { id: 'nodes-clusters', title: 'Nodes & Clusters' },
            { id: 'shared-nothing-architecture', title: 'Shared-Nothing Architecture' },
            { id: 'scalability-types', title: 'Scalability (Vertical vs Horizontal)' },
            { id: 'fault-tolerance', title: 'Fault Tolerance' },
            { id: 'high-availability', title: 'High Availability' },
          ],
        },
        {
          id: 'system-models',
          title: 'System Models',
          children: [
            { id: 'synchronous-vs-asynchronous', title: 'Synchronous vs Asynchronous' },
            { id: 'failure-models', title: 'Failure Models' },
            { id: 'crash-vs-byzantine', title: 'Crash vs Byzantine Faults' },
            { id: 'network-partitions', title: 'Network Partitions' },
          ],
        },
        {
          id: 'fallacies-of-distributed-computing',
          title: 'Fallacies of Distributed Computing',
          children: [
            { id: 'network-is-reliable', title: 'The Network is Reliable' },
            { id: 'latency-is-zero', title: 'Latency is Zero' },
            { id: 'bandwidth-is-infinite', title: 'Bandwidth is Infinite' },
            { id: 'topology-doesnt-change', title: 'Topology Doesn\u2019t Change' },
          ],
        },
        {
          id: 'time-in-distributed-systems',
          title: 'Time & Ordering',
          children: [
            { id: 'physical-clocks', title: 'Physical Clocks & NTP' },
            { id: 'logical-clocks', title: 'Logical Clocks' },
            { id: 'lamport-timestamps', title: 'Lamport Timestamps' },
            { id: 'vector-clocks', title: 'Vector Clocks' },
            { id: 'hybrid-logical-clocks', title: 'Hybrid Logical Clocks' },
            { id: 'true-time', title: 'TrueTime (Spanner)' },
          ],
        },
      ],
    },
    {
      id: 'cap-and-theory',
      title: 'CAP, PACELC & Consistency Theory',
      summary: 'The theoretical limits that shape NoSQL design decisions.',
      level: 'intermediate',
      children: [
        {
          id: 'cap-theorem-deep',
          title: 'CAP Theorem (Deep)',
          children: [
            { id: 'cap-formal-statement', title: 'Formal Statement' },
            { id: 'cp-systems', title: 'CP Systems' },
            { id: 'ap-systems', title: 'AP Systems' },
            { id: 'ca-misconception', title: 'The CA Misconception' },
            { id: 'cap-in-practice', title: 'CAP in Practice' },
          ],
        },
        {
          id: 'pacelc-theorem',
          title: 'PACELC Theorem',
          children: [
            { id: 'pacelc-explained', title: 'PACELC Explained' },
            { id: 'latency-consistency-tradeoff', title: 'Latency vs Consistency' },
            { id: 'pacelc-classification', title: 'Classifying Databases with PACELC' },
          ],
        },
        {
          id: 'consistency-models',
          title: 'Consistency Models',
          children: [
            { id: 'strong-consistency', title: 'Strong Consistency' },
            { id: 'linearizability', title: 'Linearizability' },
            { id: 'sequential-consistency', title: 'Sequential Consistency' },
            { id: 'causal-consistency', title: 'Causal Consistency' },
            { id: 'eventual-consistency-model', title: 'Eventual Consistency' },
            { id: 'read-your-writes', title: 'Read-Your-Writes' },
            { id: 'monotonic-reads-writes', title: 'Monotonic Reads & Writes' },
            { id: 'bounded-staleness', title: 'Bounded Staleness' },
            { id: 'session-consistency', title: 'Session Consistency' },
            { id: 'tunable-consistency', title: 'Tunable Consistency' },
          ],
        },
        {
          id: 'cap-related-concepts',
          title: 'Related Theory',
          children: [
            { id: 'acid-vs-base-theory', title: 'ACID vs BASE Revisited' },
            { id: 'flp-impossibility', title: 'FLP Impossibility' },
            { id: 'harvest-yield', title: 'Harvest & Yield' },
          ],
        },
      ],
    },
    {
      id: 'replication',
      title: 'Replication',
      summary: 'Copying data across nodes for availability and read scaling.',
      level: 'intermediate',
      children: [
        {
          id: 'replication-fundamentals',
          title: 'Replication Fundamentals',
          children: [
            { id: 'why-replicate', title: 'Why Replicate' },
            { id: 'replica-roles', title: 'Replica Roles' },
            { id: 'replication-factor', title: 'Replication Factor' },
            { id: 'synchronous-vs-async-replication', title: 'Synchronous vs Asynchronous' },
          ],
        },
        {
          id: 'replication-topologies',
          title: 'Replication Topologies',
          children: [
            { id: 'single-leader', title: 'Single-Leader (Primary-Replica)' },
            { id: 'multi-leader', title: 'Multi-Leader' },
            { id: 'leaderless', title: 'Leaderless' },
            { id: 'chain-replication', title: 'Chain Replication' },
          ],
        },
        {
          id: 'replication-mechanics',
          title: 'Replication Mechanics',
          children: [
            { id: 'statement-based-replication', title: 'Statement-Based' },
            { id: 'wal-shipping', title: 'WAL / Log Shipping' },
            { id: 'logical-replication', title: 'Logical (Row-Based)' },
            { id: 'replication-lag', title: 'Replication Lag' },
            { id: 'read-replicas', title: 'Read Replicas' },
          ],
        },
        {
          id: 'conflict-resolution',
          title: 'Conflict Resolution',
          children: [
            { id: 'write-conflicts', title: 'Write Conflicts' },
            { id: 'last-write-wins', title: 'Last-Write-Wins (LWW)' },
            { id: 'version-vectors', title: 'Version Vectors' },
            { id: 'crdts', title: 'CRDTs' },
            { id: 'read-repair', title: 'Read Repair' },
            { id: 'anti-entropy', title: 'Anti-Entropy & Merkle Trees' },
            { id: 'hinted-handoff', title: 'Hinted Handoff' },
          ],
        },
        {
          id: 'quorums',
          title: 'Quorums',
          children: [
            { id: 'quorum-concept', title: 'Quorum Concept (N, R, W)' },
            { id: 'strict-quorum', title: 'Strict Quorum' },
            { id: 'sloppy-quorum', title: 'Sloppy Quorum' },
            { id: 'tunable-quorum-consistency', title: 'Tuning Consistency with Quorums' },
          ],
        },
      ],
    },
    {
      id: 'partitioning-sharding',
      title: 'Partitioning & Sharding',
      summary: 'Splitting data across nodes to scale storage and throughput.',
      level: 'intermediate',
      children: [
        {
          id: 'partitioning-fundamentals',
          title: 'Partitioning Fundamentals',
          children: [
            { id: 'why-partition', title: 'Why Partition' },
            { id: 'partition-vs-shard', title: 'Partition vs Shard' },
            { id: 'partition-key', title: 'Partition Key' },
            { id: 'shard-key-design', title: 'Shard Key Design' },
          ],
        },
        {
          id: 'partitioning-strategies',
          title: 'Partitioning Strategies',
          children: [
            { id: 'range-partitioning', title: 'Range Partitioning' },
            { id: 'hash-partitioning', title: 'Hash Partitioning' },
            { id: 'list-partitioning', title: 'List Partitioning' },
            { id: 'consistent-hashing', title: 'Consistent Hashing' },
            { id: 'virtual-nodes', title: 'Virtual Nodes (vnodes)' },
            { id: 'directory-based-partitioning', title: 'Directory-Based' },
          ],
        },
        {
          id: 'partitioning-challenges',
          title: 'Partitioning Challenges',
          children: [
            { id: 'hot-partitions', title: 'Hot Partitions & Hotspots' },
            { id: 'data-skew', title: 'Data Skew' },
            { id: 'rebalancing', title: 'Rebalancing' },
            { id: 'cross-partition-queries', title: 'Cross-Partition Queries' },
            { id: 'secondary-index-partitioning', title: 'Partitioning Secondary Indexes' },
          ],
        },
        {
          id: 'request-routing',
          title: 'Request Routing',
          children: [
            { id: 'routing-tier', title: 'Routing Tier / Coordinator' },
            { id: 'gossip-membership', title: 'Gossip & Membership' },
            { id: 'service-discovery-routing', title: 'Service Discovery' },
          ],
        },
      ],
    },
    {
      id: 'consensus-coordination',
      title: 'Consensus & Coordination',
      summary: 'Agreement protocols and coordination services for distributed state.',
      level: 'advanced',
      children: [
        {
          id: 'consensus-algorithms',
          title: 'Consensus Algorithms',
          children: [
            { id: 'consensus-problem', title: 'The Consensus Problem' },
            { id: 'paxos', title: 'Paxos' },
            { id: 'multi-paxos', title: 'Multi-Paxos' },
            { id: 'raft', title: 'Raft' },
            { id: 'zab', title: 'ZAB (ZooKeeper)' },
            { id: 'viewstamped-replication', title: 'Viewstamped Replication' },
            { id: 'byzantine-fault-tolerance', title: 'Byzantine Fault Tolerance' },
          ],
        },
        {
          id: 'leader-election',
          title: 'Leader Election',
          children: [
            { id: 'leader-election-basics', title: 'Leader Election Basics' },
            { id: 'failover-promotion', title: 'Failover & Promotion' },
            { id: 'split-brain', title: 'Split-Brain & Fencing' },
          ],
        },
        {
          id: 'coordination-services',
          title: 'Coordination Services',
          children: [
            { id: 'zookeeper', title: 'Apache ZooKeeper' },
            { id: 'etcd-coordination', title: 'etcd' },
            { id: 'consul', title: 'HashiCorp Consul' },
            { id: 'distributed-locks', title: 'Distributed Locks' },
          ],
        },
      ],
    },
    {
      id: 'distributed-transactions',
      title: 'Distributed Transactions',
      summary: 'Atomicity and isolation across multiple nodes and partitions.',
      level: 'advanced',
      children: [
        {
          id: 'distributed-txn-fundamentals',
          title: 'Fundamentals',
          children: [
            { id: 'atomic-commit-problem', title: 'Atomic Commit Problem' },
            { id: 'distributed-isolation', title: 'Distributed Isolation' },
            { id: 'cross-shard-transactions', title: 'Cross-Shard Transactions' },
          ],
        },
        {
          id: 'commit-protocols',
          title: 'Commit Protocols',
          children: [
            { id: 'two-phase-commit', title: 'Two-Phase Commit (2PC)' },
            { id: 'three-phase-commit', title: 'Three-Phase Commit (3PC)' },
            { id: 'percolator-spanner-txn', title: 'Percolator / Spanner Transactions' },
          ],
        },
        {
          id: 'saga-pattern',
          title: 'Saga Pattern',
          children: [
            { id: 'choreography-saga', title: 'Choreography Saga' },
            { id: 'orchestration-saga', title: 'Orchestration Saga' },
            { id: 'compensating-transactions', title: 'Compensating Transactions' },
          ],
        },
      ],
    },
  ],
})
