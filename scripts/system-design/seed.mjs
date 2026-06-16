/**
 * Seed all top-level (roadmap-anchor) topic.json files for the System Design
 * & Architecture subject.
 *
 * Run with: node scripts/system-design/seed.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/system-design')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

const roadmap = JSON.parse(readFileSync(resolve(SUBJECT_DIR, 'roadmap.json'), 'utf8'))

/** Difficulty level for each top-level topic (id → level). */
const LEVELS = {
  // 1. System Design Foundations
  'what-is-system-design': 'beginner',
  'software-architecture-fundamentals': 'beginner',
  'quality-attributes': 'beginner',
  'software-engineering-principles': 'beginner',
  // 2. System Design Process & Capacity Estimation
  'system-design-process': 'beginner',
  'requirements-gathering': 'beginner',
  'back-of-envelope-estimation': 'intermediate',
  'system-design-interview-framework': 'intermediate',
  // 3. Performance, Scalability & Reliability Fundamentals
  'performance-fundamentals': 'beginner',
  'scalability-fundamentals': 'beginner',
  'availability-reliability': 'intermediate',
  'slo-sli-sla-budgets': 'intermediate',
  // 4. Networking & Communication for Architects
  'networking-for-architects': 'beginner',
  'communication-protocols': 'intermediate',
  'synchronous-vs-asynchronous-communication': 'intermediate',
  'service-to-service-communication': 'intermediate',
  // 5. API Design & Architecture
  'api-design-fundamentals': 'intermediate',
  'rest-api-design': 'intermediate',
  'graphql-api-design': 'intermediate',
  'grpc-and-rpc': 'intermediate',
  'async-event-driven-apis': 'advanced',
  'api-versioning-evolution': 'intermediate',
  'api-gateway-architecture': 'intermediate',
  // 6. Data Storage & Database Architecture
  'data-modeling-architecture': 'intermediate',
  'choosing-databases': 'intermediate',
  'database-scaling': 'intermediate',
  'replication-strategies': 'advanced',
  'partitioning-sharding': 'advanced',
  'consistency-models': 'advanced',
  'transactions-architectural': 'advanced',
  'polyglot-persistence': 'advanced',
  // 7. Caching & CDN Architecture
  'caching-fundamentals': 'intermediate',
  'caching-patterns': 'intermediate',
  'cache-invalidation': 'intermediate',
  'multi-tier-caching': 'advanced',
  'cdn-architecture': 'intermediate',
  // 8. Messaging, Streams & Event-Driven Communication
  'messaging-fundamentals': 'intermediate',
  'message-brokers-architecture': 'intermediate',
  'event-streaming-architecture': 'advanced',
  'pub-sub-patterns': 'intermediate',
  'choosing-messaging-technology': 'intermediate',
  // 9. Distributed Systems Fundamentals
  'distributed-systems-overview': 'intermediate',
  'cap-pacelc-theorems': 'advanced',
  'consistency-models-distributed': 'advanced',
  'time-clocks-ordering': 'advanced',
  'failure-models': 'advanced',
  // 10. Distributed Coordination, Consensus & Algorithms
  'distributed-consensus': 'advanced',
  'leader-election-algorithms': 'advanced',
  'distributed-transactions': 'advanced',
  'replication-protocols': 'advanced',
  'distributed-locking': 'advanced',
  'gossip-protocols': 'advanced',
  // 11. Architectural Styles & Models
  'monolithic-architecture': 'beginner',
  'layered-n-tier-architecture': 'beginner',
  'modular-monolith': 'intermediate',
  'service-oriented-architecture': 'intermediate',
  'microservices-overview': 'intermediate',
  'serverless-architecture': 'intermediate',
  'event-driven-overview': 'intermediate',
  'space-based-architecture': 'advanced',
  'pipe-and-filter-architecture': 'intermediate',
  'microkernel-architecture': 'intermediate',
  'peer-to-peer-architecture': 'advanced',
  'cell-based-architecture': 'advanced',
  // 12. Microservices Architecture (Deep)
  'microservices-fundamentals': 'intermediate',
  'service-boundaries-decomposition': 'advanced',
  'inter-service-communication': 'intermediate',
  'microservices-data-management': 'advanced',
  'service-mesh-architecture': 'advanced',
  'microservices-deployment-patterns': 'intermediate',
  'microservices-anti-patterns': 'intermediate',
  'migration-to-microservices': 'advanced',
  // 13. EDA / Event Sourcing / CQRS
  'eda-fundamentals': 'intermediate',
  'event-sourcing': 'advanced',
  'cqrs': 'advanced',
  'saga-pattern': 'advanced',
  'event-storming': 'intermediate',
  'choreography-vs-orchestration': 'intermediate',
  // 14. Domain-Driven Design
  'ddd-fundamentals': 'intermediate',
  'strategic-ddd': 'advanced',
  'tactical-ddd': 'advanced',
  'bounded-contexts': 'advanced',
  'context-mapping': 'advanced',
  'aggregates-entities-value-objects': 'advanced',
  // 15. Clean, Hexagonal & Onion
  'clean-architecture': 'intermediate',
  'hexagonal-architecture': 'intermediate',
  'onion-architecture': 'intermediate',
  'vertical-slice-architecture': 'intermediate',
  'screaming-architecture': 'intermediate',
  // 16. Software Design Patterns
  'gof-patterns-overview': 'intermediate',
  'creational-patterns': 'intermediate',
  'structural-patterns': 'intermediate',
  'behavioral-patterns': 'intermediate',
  'concurrency-patterns': 'advanced',
  // 17. Enterprise Integration & Distributed Patterns
  'enterprise-integration-patterns': 'advanced',
  'messaging-patterns': 'intermediate',
  'distributed-systems-patterns': 'advanced',
  'cloud-design-patterns': 'intermediate',
  'data-management-patterns': 'advanced',
  // 18. Resilience & Fault Tolerance
  'resilience-fundamentals': 'intermediate',
  'failure-mitigation-patterns': 'advanced',
  'redundancy-failover': 'advanced',
  'graceful-degradation': 'advanced',
  'chaos-engineering-architecture': 'advanced',
  // 19. Security Architecture
  'security-architecture-fundamentals': 'intermediate',
  'authentication-architecture': 'intermediate',
  'authorization-architecture': 'advanced',
  'zero-trust-architecture': 'advanced',
  'threat-modeling-architecture': 'advanced',
  'secrets-key-management-architecture': 'advanced',
  'secure-by-design': 'advanced',
  'privacy-by-design-architecture': 'advanced',
  'secure-software-supply-chain-architecture': 'advanced',
  // 20. Observability Architecture
  'observability-fundamentals-architecture': 'intermediate',
  'logging-architecture': 'intermediate',
  'metrics-architecture': 'intermediate',
  'tracing-architecture': 'advanced',
  'alerting-architecture': 'intermediate',
  // 21. Multi-Region, Multi-Cloud & Edge
  'multi-region-deployment': 'advanced',
  'disaster-recovery-architecture': 'advanced',
  'multi-cloud-architecture': 'advanced',
  'hybrid-cloud-architecture': 'advanced',
  'edge-computing-architecture': 'advanced',
  'geo-distribution-strategies': 'advanced',
  // 22. Frontend & Mobile Architecture
  'frontend-architecture-fundamentals': 'intermediate',
  'rendering-architectures': 'intermediate',
  'micro-frontends': 'advanced',
  'bff-pattern': 'intermediate',
  'mobile-architecture': 'intermediate',
  'pwa-architecture': 'intermediate',
  'design-systems-architecture': 'intermediate',
  // 23. Backend Architecture Patterns
  'backend-architecture-fundamentals': 'intermediate',
  'transactional-outbox-inbox': 'advanced',
  'idempotency-architecture': 'intermediate',
  'repository-uow-patterns': 'intermediate',
  'background-job-architecture': 'intermediate',
  'workflow-orchestration-architecture': 'advanced',
  'rate-limiting-throttling-architecture': 'intermediate',
  // 24. Data Engineering & Analytics
  'data-platforms-architecture': 'intermediate',
  'olap-vs-oltp-architecture': 'intermediate',
  'data-warehouse-architecture': 'intermediate',
  'data-lake-architecture': 'intermediate',
  'lakehouse-architecture': 'advanced',
  'streaming-data-architecture': 'advanced',
  'lambda-kappa-architectures': 'advanced',
  'batch-vs-streaming': 'intermediate',
  'data-mesh-architecture': 'advanced',
  'etl-elt-architecture': 'intermediate',
  'master-data-management': 'advanced',
  // 25. AI/ML & GenAI System Design
  'ml-system-design-fundamentals': 'advanced',
  'training-inference-architecture': 'advanced',
  'feature-store-architecture': 'advanced',
  'model-serving-architecture': 'advanced',
  'ml-data-pipelines': 'advanced',
  'llm-system-design': 'advanced',
  'rag-system-architecture': 'advanced',
  'agent-system-architecture': 'advanced',
  'vector-database-architecture': 'advanced',
  'gpu-accelerator-architecture': 'advanced',
  'ai-cost-performance-architecture': 'advanced',
  // 26. Real-Time, Streaming & Low-Latency
  'real-time-systems-fundamentals': 'advanced',
  'streaming-architectures': 'advanced',
  'websocket-sse-architecture': 'intermediate',
  'low-latency-patterns': 'advanced',
  'high-frequency-systems': 'advanced',
  // 27. Specialized Architectures
  'iot-architecture': 'advanced',
  'blockchain-architecture': 'advanced',
  'gaming-architecture': 'advanced',
  'embedded-architecture': 'advanced',
  'payment-systems-architecture': 'advanced',
  'ecommerce-architecture': 'intermediate',
  'social-network-architecture': 'advanced',
  'ride-sharing-architecture': 'advanced',
  'streaming-media-architecture': 'advanced',
  // 28. System Design Case Studies
  'common-system-design-questions': 'intermediate',
  'url-shortener-design': 'intermediate',
  'pastebin-design': 'intermediate',
  'twitter-design': 'advanced',
  'instagram-design': 'advanced',
  'facebook-newsfeed-design': 'advanced',
  'youtube-design': 'advanced',
  'netflix-design': 'advanced',
  'uber-lyft-design': 'advanced',
  'whatsapp-design': 'advanced',
  'web-crawler-design': 'advanced',
  'typeahead-design': 'intermediate',
  'search-engine-design': 'advanced',
  'distributed-cache-design': 'advanced',
  'distributed-message-queue-design': 'advanced',
  'rate-limiter-design': 'intermediate',
  'distributed-counter-design': 'advanced',
  'distributed-file-storage-design': 'advanced',
  'payment-gateway-design': 'advanced',
  'notification-system-design': 'intermediate',
  'chat-system-design': 'advanced',
  'ride-sharing-system-design': 'advanced',
  'ad-click-aggregation-design': 'advanced',
  'recommendation-system-design': 'advanced',
  'e-commerce-system-design': 'advanced',
  'collaborative-document-editor-design': 'advanced',
  'stock-trading-design': 'advanced',
  'metrics-monitoring-system-design': 'advanced',
  'online-judge-design': 'advanced',
  'video-conferencing-design': 'advanced',
  // 29. Architecture Documentation
  'documentation-fundamentals': 'beginner',
  'c4-model': 'intermediate',
  'arc42-template': 'intermediate',
  'adrs': 'intermediate',
  'uml-overview': 'beginner',
  'architecture-diagrams': 'beginner',
  'diagram-tools-and-as-code': 'intermediate',
  // 30. Architecture Quality, Governance & Evolution
  'architecture-quality-attributes-deep': 'advanced',
  'atam-and-evaluation': 'advanced',
  'evolutionary-architecture': 'advanced',
  'fitness-functions': 'advanced',
  'technical-debt-architecture': 'advanced',
  'architecture-governance': 'advanced',
  'conway-law': 'intermediate',
  'migration-strategies-architecture': 'advanced',
  'togaf-zachman-frameworks': 'advanced',
  // 31. Modern Trends, Frontier & Career
  'emerging-architectural-trends': 'advanced',
  'green-software-sustainability': 'intermediate',
  'platform-engineering-architecture': 'advanced',
  'service-weaver-and-monorepos': 'advanced',
  'wasm-architecture': 'advanced',
  'ai-augmented-architecture': 'advanced',
  'architects-soft-skills': 'intermediate',
  'architects-career-path': 'intermediate',
  'communicating-with-stakeholders': 'intermediate',
  'architecture-katas': 'intermediate',
}

let created = 0
let skipped = 0
let order = 0
const missingLevel = []

for (const stage of roadmap.stages) {
  for (const node of stage.nodes) {
    order += 1
    const dir = resolve(TOPICS_DIR, node.topicId)
    const file = resolve(dir, 'topic.json')
    if (existsSync(file)) {
      skipped += 1
      continue
    }
    if (!LEVELS[node.topicId]) missingLevel.push(node.topicId)
    const meta = {
      id: node.topicId,
      title: node.title,
      summary: node.description ?? node.title,
      order,
      level: LEVELS[node.topicId] ?? 'intermediate',
      tags: [stage.id],
    }
    mkdirSync(dir, { recursive: true })
    writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
    created += 1
  }
}

console.log(`[system-design:seed] created ${created} topic files, skipped ${skipped} existing.`)
if (missingLevel.length) {
  console.log(`[system-design:seed] WARN: ${missingLevel.length} topics without explicit level:`, missingLevel)
}
