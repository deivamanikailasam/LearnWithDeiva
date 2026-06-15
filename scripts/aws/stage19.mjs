import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'well-architected',
  rootStartOrder: 55,
  tree: [
    {
      id: 'well-architected-framework',
      title: 'Well-Architected Framework',
      summary: 'The six pillars and the review process.',
      level: 'advanced',
      children: [
        {
          id: 'waf-overview',
          title: 'Framework Overview',
          children: [
            { id: 'what-is-well-architected', title: 'What is Well-Architected?' },
            { id: 'general-design-principles', title: 'General Design Principles' },
            { id: 'well-architected-tool', title: 'AWS Well-Architected Tool' },
            { id: 'well-architected-lenses', title: 'Lenses' },
            { id: 'well-architected-reviews', title: 'Conducting Reviews' },
          ],
        },
        {
          id: 'operational-excellence-pillar',
          title: 'Operational Excellence',
          children: [
            { id: 'operations-as-code', title: 'Operations as Code' },
            { id: 'observability-pillar', title: 'Observability' },
            { id: 'operational-procedures', title: 'Procedures & Runbooks' },
            { id: 'continuous-improvement', title: 'Continuous Improvement' },
          ],
        },
        {
          id: 'security-pillar',
          title: 'Security Pillar',
          children: [
            { id: 'identity-foundations', title: 'Identity & Access Foundations' },
            { id: 'detective-controls', title: 'Detective Controls' },
            { id: 'infrastructure-protection', title: 'Infrastructure Protection' },
            { id: 'data-protection-pillar', title: 'Data Protection' },
          ],
        },
        {
          id: 'reliability-pillar',
          title: 'Reliability Pillar',
          children: [
            { id: 'foundations-reliability', title: 'Foundations & Quotas' },
            { id: 'workload-architecture', title: 'Workload Architecture' },
            { id: 'change-management-reliability', title: 'Change Management' },
            { id: 'failure-management', title: 'Failure Management' },
          ],
        },
        {
          id: 'performance-efficiency-pillar',
          title: 'Performance Efficiency',
          children: [
            { id: 'selection', title: 'Resource Selection' },
            { id: 'review-performance', title: 'Review & Evolve' },
            { id: 'monitoring-performance', title: 'Monitoring' },
            { id: 'tradeoffs', title: 'Trade-offs' },
          ],
        },
        {
          id: 'cost-sustainability-pillars',
          title: 'Cost & Sustainability',
          children: [
            { id: 'cost-optimization-pillar-waf', title: 'Cost Optimization Pillar' },
            { id: 'sustainability-pillar', title: 'Sustainability Pillar' },
            { id: 'sustainability-best-practices', title: 'Sustainability Best Practices' },
          ],
        },
      ],
    },
    {
      id: 'ha-disaster-recovery',
      title: 'High Availability & Disaster Recovery',
      summary: 'Resilience, redundancy and DR strategies.',
      level: 'advanced',
      children: [
        {
          id: 'high-availability',
          title: 'High Availability',
          children: [
            { id: 'multi-az-ha', title: 'Multi-AZ Deployments' },
            { id: 'multi-region-ha', title: 'Multi-Region Architectures' },
            { id: 'redundancy', title: 'Redundancy & Failover' },
            { id: 'load-balancing-ha', title: 'Load Balancing for HA' },
            { id: 'stateless-design', title: 'Stateless Design' },
          ],
        },
        {
          id: 'disaster-recovery',
          title: 'Disaster Recovery',
          children: [
            { id: 'rto-rpo', title: 'RTO & RPO' },
            { id: 'backup-restore-dr', title: 'Backup & Restore' },
            { id: 'pilot-light', title: 'Pilot Light' },
            { id: 'warm-standby', title: 'Warm Standby' },
            { id: 'multi-site-active-active', title: 'Multi-Site Active/Active' },
          ],
        },
        {
          id: 'resilience-engineering',
          title: 'Resilience Engineering',
          children: [
            { id: 'fault-isolation', title: 'Fault Isolation Boundaries' },
            { id: 'chaos-engineering', title: 'Chaos Engineering (FIS)' },
            { id: 'health-checks-resilience', title: 'Health Checks & Auto Recovery' },
            { id: 'graceful-degradation', title: 'Graceful Degradation' },
          ],
        },
      ],
    },
    {
      id: 'architecture-patterns',
      title: 'Architecture & Design Patterns',
      summary: 'Reference architectures and design patterns.',
      level: 'advanced',
      children: [
        {
          id: 'application-architectures',
          title: 'Application Architectures',
          children: [
            { id: 'monolith-vs-microservices', title: 'Monolith vs Microservices' },
            { id: 'three-tier-architecture', title: 'Three-Tier Architecture' },
            { id: 'event-driven-architecture-patterns', title: 'Event-Driven Architecture' },
            { id: 'serverless-architecture-patterns', title: 'Serverless Architecture' },
            { id: 'microservices-patterns', title: 'Microservices Patterns' },
          ],
        },
        {
          id: 'integration-data-patterns',
          title: 'Integration & Data Patterns',
          children: [
            { id: 'api-driven-architecture', title: 'API-Driven Architecture' },
            { id: 'cqrs-event-sourcing', title: 'CQRS & Event Sourcing' },
            { id: 'saga-pattern', title: 'Saga Pattern' },
            { id: 'data-partitioning-patterns', title: 'Data Partitioning' },
            { id: 'caching-patterns', title: 'Caching Patterns' },
          ],
        },
        {
          id: 'resilience-patterns',
          title: 'Resilience Patterns',
          children: [
            { id: 'circuit-breaker', title: 'Circuit Breaker' },
            { id: 'retry-backoff', title: 'Retry with Backoff' },
            { id: 'bulkhead', title: 'Bulkhead' },
            { id: 'throttling-pattern', title: 'Throttling' },
            { id: 'queue-based-load-leveling', title: 'Queue-Based Load Leveling' },
          ],
        },
        {
          id: 'architecture-resources',
          title: 'Architecture Resources',
          children: [
            { id: 'reference-architectures', title: 'AWS Reference Architectures' },
            { id: 'aws-solutions-library', title: 'AWS Solutions Library' },
            { id: 'architecture-decision-records', title: 'Architecture Decision Records' },
          ],
        },
      ],
    },
  ],
})
