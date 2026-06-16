/**
 * Part 14: sweep — fill gaps for modern (2025–2026) architecture topics
 * across previously-built stages, then run validation.
 *
 * Strict rule: only add topics that are architectural concerns. Tool-specific
 * topics (Docker, K8s, specific cloud services, language stacks, AI agents,
 * databases) live in their dedicated subjects.
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ------------------------------------------------------------
   * Networking & Communication gaps
   * ------------------------------------------------------------ */
  { id: 'webtransport-arch', title: 'WebTransport Architecture', parentId: 'streaming-protocols' },
  { id: 'webcodecs-arch', title: 'WebCodecs Architecture', parentId: 'streaming-protocols' },
  { id: 'masque-protocol', title: 'MASQUE (Multiplexed Application Substrate)', parentId: 'http-protocols' },
  { id: 'http3-quic-deep', title: 'HTTP/3 + QUIC (Deep)', parentId: 'http-protocols' },
  { id: 'web-push-protocol', title: 'Web Push Protocol', parentId: 'streaming-protocols' },

  /* ------------------------------------------------------------
   * API design gaps — modern IDLs, hypermedia revival
   * ------------------------------------------------------------ */
  { id: 'typespec-idl', title: 'TypeSpec IDL Architecture', parentId: 'api-design-fundamentals' },
  { id: 'smithy-idl', title: 'Smithy IDL Architecture', parentId: 'api-design-fundamentals' },
  { id: 'openapi-3-1-3-2', title: 'OpenAPI 3.1 / 3.2 (Architectural View)', parentId: 'api-design-fundamentals' },
  { id: 'jsonapi-spec', title: 'JSON:API Specification', parentId: 'rest-api-design' },
  { id: 'hal-spec', title: 'HAL Specification', parentId: 'rest-api-design' },
  { id: 'siren-spec', title: 'Siren Specification', parentId: 'rest-api-design' },
  { id: 'htmx-hypermedia-arch', title: 'htmx & Hypermedia Architecture', parentId: 'rest-api-design' },
  { id: 'jsonrpc-spec', title: 'JSON-RPC Specification', parentId: 'grpc-and-rpc' },
  { id: 'connect-rpc', title: 'Connect RPC Architecture', parentId: 'grpc-and-rpc' },
  { id: 'asyncapi-3', title: 'AsyncAPI 3.0 Architecture', parentId: 'async-event-driven-apis' },

  /* ------------------------------------------------------------
   * Storage gaps — modern open table formats, catalogs
   * ------------------------------------------------------------ */
  { id: 'apache-xtable-arch', title: 'Apache XTable / OneTable (Format Interop)', parentId: 'lakehouse-architecture' },
  { id: 'iceberg-rest-catalog', title: 'Iceberg REST Catalog', parentId: 'lakehouse-architecture' },
  { id: 'unity-catalog-os-arch', title: 'Unity Catalog (Open Source) Architecture', parentId: 'lakehouse-architecture' },
  { id: 'apache-polaris-arch', title: 'Apache Polaris Catalog Architecture', parentId: 'lakehouse-architecture' },
  { id: 'liquid-clustering', title: 'Liquid Clustering (Delta-Style)', parentId: 'lakehouse-architecture' },
  { id: 'open-lakehouse-interop', title: 'Open Lakehouse Interop (XTable / OneTable / UniForm)', parentId: 'lakehouse-architecture' },

  /* ------------------------------------------------------------
   * Data engineering gaps — modern catalogs, lineage, transport
   * ------------------------------------------------------------ */
  { id: 'openlineage-arch', title: 'OpenLineage Architecture', parentId: 'data-platforms-architecture' },
  { id: 'datahub-architecture', title: 'DataHub-Style Catalog Architecture', parentId: 'data-platforms-architecture' },
  { id: 'amundsen-architecture', title: 'Amundsen-Style Catalog Architecture', parentId: 'data-platforms-architecture' },
  { id: 'data-contracts-platform-arch', title: 'Data Contracts at Platform Level', parentId: 'data-platforms-architecture' },
  { id: 'arrow-flight-arch', title: 'Apache Arrow Flight Architecture', parentId: 'data-platforms-architecture' },
  { id: 'arrow-flight-sql-arch', title: 'Apache Arrow Flight SQL', parentId: 'data-platforms-architecture' },
  { id: 'dlt-data-load-tool-arch', title: 'DLT (Data Load Tool) Architecture', parentId: 'etl-elt-architecture' },
  { id: 'cdc-tools-arch', title: 'CDC Tools Architecture (Debezium-Style)', parentId: 'etl-elt-architecture' },
  { id: 'kafka-tiered-storage-arch', title: 'Kafka-Style Tiered Storage Architecture', parentId: 'streaming-data-architecture' },
  { id: 'flink-style-checkpoint-arch', title: 'Flink-Style Checkpoint Architecture', parentId: 'streaming-data-architecture' },
  { id: 'embedded-stream-engines', title: 'Embedded Stream Engines (DuckDB-Style)', parentId: 'streaming-data-architecture' },

  /* ------------------------------------------------------------
   * Distributed systems gaps — modern theory & papers
   * ------------------------------------------------------------ */
  { id: 'tail-at-scale-paper', title: 'Tail-at-Scale (Dean & Barroso)', parentId: 'percentiles-architecture' },
  { id: 'metastable-failures-paper', title: 'Metastable Failures Paper', parentId: 'failure-models' },
  { id: 'fearless-concurrency-arch', title: 'Fearless Concurrency (Architectural View)', parentId: 'concurrency-patterns' },
  { id: 'functional-core-imperative-shell', title: 'Functional Core, Imperative Shell', parentId: 'gof-patterns-overview' },

  /* ------------------------------------------------------------
   * Security gaps — modern AuthZ/AuthN protocols
   * ------------------------------------------------------------ */
  { id: 'oauth-2-1-arch', title: 'OAuth 2.1 Architecture', parentId: 'authentication-architecture' },
  { id: 'gnap-protocol', title: 'GNAP (Grant Negotiation and Authorization Protocol)', parentId: 'authentication-architecture' },
  { id: 'webauthn-l3-arch', title: 'WebAuthn L3 Architecture', parentId: 'authentication-architecture' },
  { id: 'token-binding-arch', title: 'Token Binding Architecture', parentId: 'authentication-architecture' },
  { id: 'dpop-arch', title: 'DPoP (Demonstrating Proof of Possession)', parentId: 'authentication-architecture' },
  { id: 'oidc-federation-arch', title: 'OIDC Federation Architecture', parentId: 'authentication-architecture' },
  { id: 'cedar-policy-deep', title: 'Cedar Policy Deep', parentId: 'authorization-architecture' },
  { id: 'verifiable-credentials-arch', title: 'Verifiable Credentials Architecture', parentId: 'authentication-architecture' },
  { id: 'sd-jwt-arch', title: 'SD-JWT (Selective Disclosure JWT) Architecture', parentId: 'authentication-architecture' },

  /* ------------------------------------------------------------
   * Observability gaps — modern signals
   * ------------------------------------------------------------ */
  { id: 'otel-collector-arch', title: 'OpenTelemetry Collector Architecture', parentId: 'observability-fundamentals-architecture' },
  { id: 'otel-semantic-conventions', title: 'OTel Semantic Conventions', parentId: 'observability-fundamentals-architecture' },
  { id: 'ebpf-observability-arch', title: 'eBPF-Based Observability Architecture', parentId: 'observability-fundamentals-architecture' },
  { id: 'parca-pyroscope-arch', title: 'Continuous Profiling Backends (Parca/Pyroscope-Style)', parentId: 'tracing-architecture' },
  { id: 'real-user-monitoring-arch', title: 'Real User Monitoring (RUM) Architecture', parentId: 'metrics-architecture' },
  { id: 'synthetic-monitoring-arch', title: 'Synthetic Monitoring Architecture', parentId: 'metrics-architecture' },

  /* ------------------------------------------------------------
   * Frontend gaps — modern rendering & API patterns
   * ------------------------------------------------------------ */
  { id: 'react-server-actions-arch', title: 'React Server Actions Architecture', parentId: 'rendering-architectures' },
  { id: 'view-transitions-api', title: 'View Transitions API Architecture', parentId: 'rendering-architectures' },
  { id: 'astro-style-mpa', title: 'Astro-Style Islands MPA', parentId: 'rendering-architectures' },
  { id: 'spa-vs-mpa-tradeoffs', title: 'SPA vs MPA Trade-offs (2025+)', parentId: 'rendering-architectures' },
  { id: 'speculation-rules-api', title: 'Speculation Rules API', parentId: 'rendering-architectures' },
  { id: 'partial-prerendering', title: 'Partial Prerendering Architecture', parentId: 'rendering-architectures' },
  { id: 'fe-rsc-cache-arch', title: 'RSC + Cache Architecture', parentId: 'frontend-architecture-fundamentals' },

  /* ------------------------------------------------------------
   * AI/ML & GenAI gaps — modern serving, agents, protocols
   * ------------------------------------------------------------ */
  { id: 'a2a-protocol-arch', title: 'A2A (Agent-to-Agent) Protocol Architecture', parentId: 'agent-system-architecture' },
  { id: 'mcp-server-arch', title: 'MCP Server Architecture', parentId: 'agent-system-architecture' },
  { id: 'mcp-host-arch', title: 'MCP Host Architecture', parentId: 'agent-system-architecture' },
  { id: 'ai-gateway-arch', title: 'AI / LLM Gateway Architecture', parentId: 'llm-system-design' },
  { id: 'test-time-compute-arch', title: 'Test-Time Compute Scaling Architecture', parentId: 'llm-system-design' },
  { id: 'reasoning-models-arch', title: 'Reasoning Models Architecture (o-Series / r-Style)', parentId: 'llm-system-design' },
  { id: 'self-consistency-arch', title: 'Self-Consistency Architecture', parentId: 'llm-system-design' },
  { id: 'tree-of-thoughts-arch', title: 'Tree-of-Thoughts Architecture (System View)', parentId: 'llm-system-design' },
  { id: 'constitutional-ai-arch', title: 'Constitutional AI Architecture (System View)', parentId: 'llm-system-design' },
  { id: 'router-models-arch', title: 'Router Models Architecture', parentId: 'llm-system-design' },
  { id: 'mixture-of-experts-serving-arch', title: 'MoE Serving Architecture', parentId: 'model-serving-architecture' },
  { id: 'tensor-rt-arch', title: 'Inference Compilation Architecture (TensorRT-Style)', parentId: 'model-serving-architecture' },
  { id: 'vllm-arch', title: 'vLLM-Style Serving Architecture', parentId: 'model-serving-architecture' },
  { id: 'paged-attention-arch', title: 'PagedAttention Architecture', parentId: 'model-serving-architecture' },
  { id: 'prefix-caching-llm', title: 'Prefix Caching for LLMs', parentId: 'llm-system-design' },
  { id: 'multi-lora-serving-arch', title: 'Multi-LoRA Serving Architecture', parentId: 'model-serving-architecture' },
  { id: 'streaming-rag-arch', title: 'Streaming RAG Architecture', parentId: 'rag-system-architecture' },
  { id: 'long-context-rag-arch', title: 'Long-Context RAG Architecture', parentId: 'rag-system-architecture' },
  { id: 'ai-guardrails-gateway-arch', title: 'Guardrails Gateway Architecture', parentId: 'llm-system-design' },

  /* ------------------------------------------------------------
   * Specialized architectures gaps — modern ops
   * ------------------------------------------------------------ */
  { id: 'iot-edge-ai-arch', title: 'Edge AI for IoT', parentId: 'iot-architecture' },
  { id: 'multi-protocol-iot-arch', title: 'Multi-Protocol IoT Gateway', parentId: 'iot-architecture' },
  { id: 'broadcast-pubsub-arch', title: 'Broadcast Pub/Sub Architecture', parentId: 'social-network-architecture' },

  /* ------------------------------------------------------------
   * Governance & evolution gaps — modern methodologies
   * ------------------------------------------------------------ */
  { id: 'continuous-architecture-method', title: 'Continuous Architecture Methodology', parentId: 'evolutionary-architecture' },
  { id: 'architecture-modernization', title: 'Architecture Modernization (Tune)', parentId: 'evolutionary-architecture' },
  { id: 'macro-vs-micro-arch', title: 'Macro vs Micro Architecture', parentId: 'architecture-governance' },
  { id: 'arch-as-code', title: 'Architecture as Code', parentId: 'architecture-governance' },
  { id: 'sociotechnical-architecture', title: 'Sociotechnical Architecture', parentId: 'conway-law' },
  { id: 'team-cognitive-load-measure', title: 'Measuring Team Cognitive Load', parentId: 'conway-law' },

  /* ------------------------------------------------------------
   * Frontier & trends gaps
   * ------------------------------------------------------------ */
  { id: 'sustainable-ai-arch', title: 'Sustainable AI Architecture', parentId: 'green-software-sustainability' },
  { id: 'physical-ai-trend', title: 'Physical AI / Embodied AI Architecture Trend', parentId: 'emerging-architectural-trends' },
  { id: 'agentic-os-trend', title: 'Agentic OS Trend', parentId: 'emerging-architectural-trends' },
  { id: 'liquid-architecture-trend', title: 'Liquid Architecture Trend', parentId: 'emerging-architectural-trends' },
  { id: 'spatial-web-trend', title: 'Spatial Web & Open Standards (OpenXR, WebXR)', parentId: 'emerging-architectural-trends' },
  { id: 'web5-trend', title: 'Web5 / Decentralized Identity Trend', parentId: 'emerging-architectural-trends' },
  { id: 'matter-thread-trend', title: 'Matter / Thread IoT Trend', parentId: 'emerging-architectural-trends' },
  { id: 'private-llm-trend', title: 'Private LLM / On-Prem GenAI Trend', parentId: 'emerging-architectural-trends' },
  { id: 'wasm-component-os-trend', title: 'WASM Component Model OS Trend', parentId: 'emerging-architectural-trends' },

  /* ------------------------------------------------------------
   * Case study sweeps — a couple of important modern cases
   * ------------------------------------------------------------ */
  { id: 'feature-flag-system-design', title: 'Design a Feature Flag System', parentId: 'common-system-design-questions' },
  { id: 'object-storage-system-design', title: 'Design an Object Storage System', parentId: 'common-system-design-questions' },
  { id: 'distributed-id-generator-design', title: 'Design a Distributed ID Generator', parentId: 'common-system-design-questions' },
  { id: 'logging-pipeline-design', title: 'Design a Logging Pipeline', parentId: 'common-system-design-questions' },
  { id: 'tracing-pipeline-design', title: 'Design a Tracing Pipeline', parentId: 'common-system-design-questions' },
  { id: 'leaderboard-system-design', title: 'Design a Leaderboard System', parentId: 'common-system-design-questions' },
  { id: 'top-k-system-design', title: 'Design a Top-K System', parentId: 'common-system-design-questions' },
  { id: 'realtime-analytics-design', title: 'Design a Real-Time Analytics System', parentId: 'common-system-design-questions' },
  { id: 'ml-feature-pipeline-design', title: 'Design an ML Feature Pipeline', parentId: 'common-system-design-questions' },
  { id: 'llm-serving-platform-design', title: 'Design an LLM Serving Platform', parentId: 'common-system-design-questions' },
  { id: 'multi-tenant-saas-design', title: 'Design a Multi-Tenant SaaS', parentId: 'common-system-design-questions' },
  { id: 'billing-metering-design', title: 'Design a Billing & Metering System', parentId: 'common-system-design-questions' },
])
