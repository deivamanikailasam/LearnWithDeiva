import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'advanced-patterns',
  rootStartOrder: 99,
  tree: [
    {
      id: 'event-sourcing',
      title: 'Event Sourcing',
      summary: 'Persisting state as an immutable sequence of events.',
      level: 'advanced',
      children: [
        {
          id: 'event-sourcing-fundamentals',
          title: 'Fundamentals',
          children: [
            { id: 'event-store-concept', title: 'Event Store' },
            { id: 'events-as-source-of-truth', title: 'Events as Source of Truth' },
            { id: 'append-only-events', title: 'Append-Only Event Log' },
            { id: 'event-replay', title: 'Event Replay' },
          ],
        },
        {
          id: 'event-sourcing-mechanics',
          title: 'Mechanics',
          children: [
            { id: 'aggregates-event-streams', title: 'Aggregates & Streams' },
            { id: 'snapshots-event-sourcing', title: 'Snapshots' },
            { id: 'projections-read-models', title: 'Projections & Read Models' },
            { id: 'event-versioning', title: 'Event Versioning & Upcasting' },
          ],
        },
        {
          id: 'event-sourcing-tradeoffs',
          title: 'Trade-offs',
          children: [
            { id: 'audit-trail-benefit', title: 'Audit Trail & Time Travel' },
            { id: 'event-sourcing-complexity', title: 'Complexity Costs' },
            { id: 'eventual-consistency-es', title: 'Eventual Consistency' },
          ],
        },
      ],
    },
    {
      id: 'cqrs',
      title: 'CQRS',
      summary: 'Command Query Responsibility Segregation.',
      level: 'advanced',
      children: [
        {
          id: 'cqrs-fundamentals',
          title: 'Fundamentals',
          children: [
            { id: 'command-query-separation', title: 'Command/Query Separation' },
            { id: 'write-model', title: 'Write Model' },
            { id: 'read-model', title: 'Read Model' },
            { id: 'cqrs-vs-crud', title: 'CQRS vs CRUD' },
          ],
        },
        {
          id: 'cqrs-implementation',
          title: 'Implementation',
          children: [
            { id: 'separate-read-write-stores', title: 'Separate Read/Write Stores' },
            { id: 'cqrs-with-event-sourcing', title: 'CQRS with Event Sourcing' },
            { id: 'read-model-projections', title: 'Read Model Projections' },
            { id: 'eventual-consistency-cqrs', title: 'Handling Eventual Consistency' },
          ],
        },
        {
          id: 'cqrs-when-to-use',
          title: 'When to Use',
          children: [
            { id: 'cqrs-benefits', title: 'Benefits' },
            { id: 'cqrs-pitfalls', title: 'Pitfalls & Over-Engineering' },
          ],
        },
      ],
    },
    {
      id: 'distributed-transaction-patterns',
      title: 'Distributed Transaction Patterns',
      summary: 'Maintaining consistency across services without distributed locks.',
      level: 'advanced',
      children: [
        {
          id: 'saga-patterns-adv',
          title: 'Saga Patterns',
          children: [
            { id: 'choreography-saga-adv', title: 'Choreography' },
            { id: 'orchestration-saga-adv', title: 'Orchestration' },
            { id: 'compensation-adv', title: 'Compensating Actions' },
            { id: 'saga-failure-handling', title: 'Failure Handling' },
          ],
        },
        {
          id: 'outbox-pattern',
          title: 'Transactional Outbox',
          children: [
            { id: 'outbox-concept', title: 'Outbox Concept' },
            { id: 'outbox-relay', title: 'Message Relay & Polling' },
            { id: 'inbox-pattern', title: 'Inbox Pattern' },
            { id: 'dual-write-problem', title: 'The Dual-Write Problem' },
          ],
        },
        {
          id: 'other-txn-patterns',
          title: 'Other Patterns',
          children: [
            { id: 'tcc-pattern', title: 'Try-Confirm-Cancel (TCC)' },
            { id: 'two-phase-commit-adv', title: '2PC Revisited' },
            { id: 'event-driven-consistency', title: 'Event-Driven Consistency' },
          ],
        },
      ],
    },
    {
      id: 'consistency-reliability-patterns',
      title: 'Consistency & Messaging Patterns',
      summary: 'Patterns for idempotency, deduplication and delivery guarantees.',
      level: 'advanced',
      children: [
        {
          id: 'idempotency-patterns',
          title: 'Idempotency',
          children: [
            { id: 'idempotency-keys', title: 'Idempotency Keys' },
            { id: 'deduplication', title: 'Deduplication' },
            { id: 'idempotent-consumers', title: 'Idempotent Consumers' },
          ],
        },
        {
          id: 'delivery-guarantees',
          title: 'Delivery Guarantees',
          children: [
            { id: 'at-least-once', title: 'At-Least-Once' },
            { id: 'at-most-once', title: 'At-Most-Once' },
            { id: 'exactly-once', title: 'Exactly-Once Semantics' },
          ],
        },
        {
          id: 'data-consistency-patterns',
          title: 'Data Consistency Patterns',
          children: [
            { id: 'eventual-consistency-handling', title: 'Handling Eventual Consistency' },
            { id: 'read-repair-pattern', title: 'Read Repair' },
            { id: 'reconciliation-jobs', title: 'Reconciliation Jobs' },
            { id: 'conflict-free-types', title: 'CRDTs in Applications' },
          ],
        },
      ],
    },
    {
      id: 'advanced-data-patterns',
      title: 'Advanced Data & Scaling Patterns',
      summary: 'Patterns for global, multi-tenant and large-scale data systems.',
      level: 'advanced',
      children: [
        {
          id: 'multi-tenancy-patterns',
          title: 'Multi-Tenancy',
          children: [
            { id: 'tenant-per-database', title: 'Database-per-Tenant' },
            { id: 'shared-tenant-schema', title: 'Shared Schema with Tenant ID' },
            { id: 'hybrid-tenancy', title: 'Hybrid Tenancy' },
            { id: 'tenant-isolation-patterns', title: 'Isolation & Noisy Neighbors' },
          ],
        },
        {
          id: 'global-distribution-patterns',
          title: 'Global Distribution',
          children: [
            { id: 'geo-replication-patterns', title: 'Geo-Replication' },
            { id: 'data-locality', title: 'Data Locality & Residency' },
            { id: 'active-active', title: 'Active-Active' },
            { id: 'follow-the-sun', title: 'Follow-the-Sun' },
          ],
        },
        {
          id: 'large-scale-patterns',
          title: 'Large-Scale Patterns',
          children: [
            { id: 'data-tiering-pattern', title: 'Hot/Warm/Cold Tiering' },
            { id: 'archival-patterns', title: 'Archival & Cold Storage' },
            { id: 'sharding-patterns-adv', title: 'Advanced Sharding' },
            { id: 'fan-out-patterns', title: 'Fan-Out on Write/Read' },
          ],
        },
      ],
    },
  ],
})
