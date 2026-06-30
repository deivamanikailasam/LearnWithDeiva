/**
 * Part 11 (2026 gap-fill): roadmap topics and depth missing for a complete
 * beginner-to-expert DevOps path as of June 2026.
 *
 * Adds new roadmap-anchor topics (parentId = stage root in roadmap.json) and
 * subtopics with sub-subtopics under existing roots.
 *
 * Run extract-taxonomy.mjs + rebuild-tree.mjs after editing.
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * NEW ROADMAP TOPICS — Scripting & Automation
   * ============================================================ */

  /* ---- python-for-devops ---- */
  {
    id: 'python-fundamentals-devops',
    title: 'Python Fundamentals for DevOps',
    parentId: 'python-for-devops',
    children: [
      { id: 'python-syntax-basics', title: 'Python Syntax & Data Structures' },
      { id: 'python-virtualenv-uv', title: 'venv, pip & uv Package Management' },
      { id: 'python-cli-argparse', title: 'CLI Scripts with argparse & typer' },
      { id: 'python-file-io-json', title: 'File I/O, JSON & YAML in Python' },
      { id: 'python-subprocess', title: 'subprocess & Shelling Out' },
      { id: 'python-requests-httpx', title: 'HTTP Clients (requests & httpx)' },
    ],
  },
  {
    id: 'python-automation-libraries',
    title: 'Python Automation Libraries',
    parentId: 'python-for-devops',
    children: [
      { id: 'boto3-aws-sdk', title: 'boto3 (AWS SDK)' },
      { id: 'azure-sdk-python', title: 'Azure SDK for Python' },
      { id: 'google-cloud-python', title: 'Google Cloud Client Libraries' },
      { id: 'kubernetes-python-client', title: 'kubernetes Python Client' },
      { id: 'docker-sdk-python', title: 'Docker SDK for Python' },
      { id: 'fabric-invoke', title: 'Fabric & Invoke (Remote Execution)' },
      { id: 'paramiko-ssh', title: 'Paramiko (SSH)' },
    ],
  },
  {
    id: 'python-iac-testing',
    title: 'Python for IaC & Testing',
    parentId: 'python-for-devops',
    children: [
      { id: 'pulumi-python', title: 'Pulumi with Python' },
      { id: 'cdk-python', title: 'AWS CDK with Python' },
      { id: 'pytest-devops', title: 'pytest for Infrastructure Tests' },
      { id: 'molecule-python', title: 'Molecule (Ansible Testing)' },
      { id: 'checkov-python-rules', title: 'Writing Custom Checkov Policies' },
    ],
  },
  {
    id: 'python-observability-data',
    title: 'Python for Observability & Data',
    parentId: 'python-for-devops',
    children: [
      { id: 'opentelemetry-python', title: 'OpenTelemetry Python SDK' },
      { id: 'pandas-ops-data', title: 'pandas for Ops Data Analysis' },
      { id: 'structlog-python', title: 'Structured Logging (structlog)' },
      { id: 'fastapi-internal-tools', title: 'FastAPI for Internal Tools' },
    ],
  },

  /* ---- typescript-for-devops ---- */
  {
    id: 'typescript-fundamentals-devops',
    title: 'TypeScript Fundamentals for DevOps',
    parentId: 'typescript-for-devops',
    children: [
      { id: 'typescript-node-basics', title: 'TypeScript & Node.js Basics' },
      { id: 'npm-pnpm-bun', title: 'npm, pnpm & Bun Package Managers' },
      { id: 'tsx-deno-runtime', title: 'tsx, ts-node & Deno Runtimes' },
      { id: 'typescript-cli-oclif', title: 'CLI Tools with oclif & commander' },
    ],
  },
  {
    id: 'typescript-iac-platform',
    title: 'TypeScript for IaC & Platform',
    parentId: 'typescript-for-devops',
    children: [
      { id: 'pulumi-typescript', title: 'Pulumi with TypeScript' },
      { id: 'aws-cdk-typescript', title: 'AWS CDK with TypeScript' },
      { id: 'cdktf-typescript', title: 'CDK for Terraform (CDKTF) TypeScript' },
      { id: 'projen-typescript', title: 'Projen (Project Generators)' },
      { id: 'sst-ion', title: 'SST (Serverless Stack)' },
    ],
  },
  {
    id: 'typescript-testing-tooling',
    title: 'TypeScript Testing & Tooling',
    parentId: 'typescript-for-devops',
    children: [
      { id: 'vitest-jest-devops', title: 'Vitest & Jest for Tooling Tests' },
      { id: 'playwright-api-testing', title: 'Playwright for API Testing' },
      { id: 'zod-config-validation', title: 'Zod for Config Validation' },
      { id: 'changesets-monorepo', title: 'Changesets for Monorepo Releases' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — CI/CD
   * ============================================================ */

  /* ---- testing-quality-pipelines ---- */
  {
    id: 'test-pyramid-ci',
    title: 'Test Pyramid in CI Pipelines',
    parentId: 'testing-quality-pipelines',
    children: [
      { id: 'unit-tests-ci', title: 'Unit Tests in CI' },
      { id: 'integration-tests-ci', title: 'Integration Tests in CI' },
      { id: 'e2e-tests-ci', title: 'End-to-End Tests in CI' },
      { id: 'smoke-sanity-ci', title: 'Smoke & Sanity Test Gates' },
      { id: 'test-parallelization-sharding', title: 'Test Parallelization & Sharding' },
      { id: 'flaky-test-management', title: 'Flaky Test Detection & Quarantine' },
    ],
  },
  {
    id: 'quality-gates-ci',
    title: 'Quality Gates & Policy in Pipelines',
    parentId: 'testing-quality-pipelines',
    children: [
      { id: 'code-coverage-gates', title: 'Code Coverage Thresholds' },
      { id: 'mutation-testing-ci', title: 'Mutation Testing (Stryker, PIT)' },
      { id: 'sonarqube-quality-gate', title: 'SonarQube Quality Gates' },
      { id: 'codecov-coveralls', title: 'Codecov & Coveralls' },
      { id: 'pr-quality-checks', title: 'PR Quality Checks & Required Status' },
    ],
  },
  {
    id: 'contract-mutation-testing',
    title: 'Contract & API Testing in CI',
    parentId: 'testing-quality-pipelines',
    children: [
      { id: 'pact-contract-testing', title: 'Pact Contract Testing' },
      { id: 'schemathesis-api', title: 'Schemathesis (OpenAPI Fuzzing)' },
      { id: 'dredd-api-testing', title: 'Dredd API Testing' },
      { id: 'postman-newman-ci', title: 'Postman & Newman in CI' },
      { id: 'karate-api-testing', title: 'Karate (API Test Framework)' },
    ],
  },
  {
    id: 'test-environments-data',
    title: 'Test Environments & Data in CI',
    parentId: 'testing-quality-pipelines',
    children: [
      { id: 'ephemeral-test-envs', title: 'Ephemeral Test Environments' },
      { id: 'testcontainers', title: 'Testcontainers' },
      { id: 'service-virtualization', title: 'Service Virtualization (WireMock, Mountebank)' },
      { id: 'synthetic-test-data-ci', title: 'Synthetic & Anonymized Test Data' },
    ],
  },

  /* ---- performance-engineering ---- */
  {
    id: 'load-testing-fundamentals',
    title: 'Load & Performance Testing Fundamentals',
    parentId: 'performance-engineering',
    children: [
      { id: 'performance-test-types', title: 'Load, Stress, Spike & Soak Tests' },
      { id: 'performance-slas-nfrs', title: 'Performance SLAs & NFRs' },
      { id: 'workload-modelling', title: 'Workload Modelling & Traffic Patterns' },
      { id: 'performance-test-environments', title: 'Performance Test Environments' },
    ],
  },
  {
    id: 'load-testing-tools',
    title: 'Load Testing Tools',
    parentId: 'performance-engineering',
    children: [
      { id: 'grafana-k6-deep', title: 'Grafana k6 (Scripting & Cloud)' },
      { id: 'locust-python-load', title: 'Locust' },
      { id: 'jmeter-load', title: 'Apache JMeter' },
      { id: 'gatling-load', title: 'Gatling' },
      { id: 'artillery-load', title: 'Artillery' },
      { id: 'vegeta-load', title: 'Vegeta' },
      { id: 'hey-load', title: 'hey (HTTP Load Generator)' },
    ],
  },
  {
    id: 'performance-analysis',
    title: 'Performance Analysis & Optimization',
    parentId: 'performance-engineering',
    children: [
      { id: 'apm-performance-analysis', title: 'APM-Driven Performance Analysis' },
      { id: 'flame-graphs-perf', title: 'Flame Graphs & Profiling for Perf' },
      { id: 'database-query-tuning', title: 'Database Query Performance Tuning' },
      { id: 'cdn-edge-performance', title: 'CDN & Edge Performance Optimization' },
      { id: 'performance-regression-ci', title: 'Performance Regression in CI' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — SRE
   * ============================================================ */

  /* ---- disaster-recovery-bcp ---- */
  {
    id: 'dr-fundamentals',
    title: 'Disaster Recovery Fundamentals',
    parentId: 'disaster-recovery-bcp',
    children: [
      { id: 'rto-rpo-deep', title: 'RTO, RPO & Recovery Objectives' },
      { id: 'backup-strategies-dr', title: 'Backup Strategies (3-2-1, Immutable)' },
      { id: 'recovery-tiering', title: 'Recovery Tiering & Criticality Classes' },
      { id: 'dr-runbooks', title: 'DR Runbooks & Playbooks' },
    ],
  },
  {
    id: 'bcp-planning',
    title: 'Business Continuity Planning',
    parentId: 'disaster-recovery-bcp',
    children: [
      { id: 'bcp-framework', title: 'BCP Framework & ISO 22301' },
      { id: 'crisis-communication-dr', title: 'Crisis Communication During Outages' },
      { id: 'failover-failback', title: 'Failover & Failback Procedures' },
      { id: 'geographic-redundancy', title: 'Geographic Redundancy & Multi-Region DR' },
    ],
  },
  {
    id: 'dr-patterns-tools',
    title: 'DR Patterns & Cloud Tools',
    parentId: 'disaster-recovery-bcp',
    children: [
      { id: 'active-active-dr', title: 'Active-Active & Active-Passive DR' },
      { id: 'pilot-light-warm-standby', title: 'Pilot Light, Warm Standby & Cold DR' },
      { id: 'velero-k8s-backup', title: 'Velero (Kubernetes Backup)' },
      { id: 'aws-dr-services', title: 'AWS DR (Route 53, DRS, Backup)' },
      { id: 'azure-site-recovery', title: 'Azure Site Recovery' },
      { id: 'gcp-dr-services', title: 'GCP DR & Backup Services' },
    ],
  },
  {
    id: 'dr-testing-exercises',
    title: 'DR Testing & Exercises',
    parentId: 'disaster-recovery-bcp',
    children: [
      { id: 'dr-drills-tabletop', title: 'Tabletop & DR Drills' },
      { id: 'chaos-for-dr', title: 'Chaos Engineering for DR Validation' },
      { id: 'dr-test-cadence', title: 'DR Test Cadence & Compliance Evidence' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — Observability
   * ============================================================ */

  /* ---- continuous-profiling ---- */
  {
    id: 'profiling-fundamentals',
    title: 'Continuous Profiling Fundamentals',
    parentId: 'observability-profiling',
    children: [
      { id: 'cpu-memory-profiling', title: 'CPU & Memory Profiling Concepts' },
      { id: 'sampling-vs-instrumentation', title: 'Sampling vs Instrumentation Profilers' },
      { id: 'profiling-production-safety', title: 'Production-Safe Profiling' },
      { id: 'profiling-otel-integration', title: 'Profiling & OpenTelemetry Integration' },
    ],
  },
  {
    id: 'profiling-platforms',
    title: 'Profiling Platforms & Tools',
    parentId: 'observability-profiling',
    children: [
      { id: 'grafana-pyroscope-deep', title: 'Grafana Pyroscope' },
      { id: 'parca-continuous', title: 'Parca' },
      { id: 'google-cloud-profiler', title: 'Google Cloud Profiler' },
      { id: 'datadog-profiler', title: 'Datadog Continuous Profiler' },
      { id: 'elastic-universal-profiling', title: 'Elastic Universal Profiling' },
      { id: 'async-profiler-java', title: 'Async Profiler (JVM)' },
      { id: 'pprof-go', title: 'pprof (Go)' },
    ],
  },
  {
    id: 'ebpf-profiling',
    title: 'eBPF-Based Profiling',
    parentId: 'observability-profiling',
    children: [
      { id: 'bpftrace-profiling', title: 'bpftrace for Ad-Hoc Profiling' },
      { id: 'pixie-profiling', title: 'Pixie (Auto-Profiling)' },
      { id: 'otel-ebpf-profiler', title: 'OpenTelemetry eBPF Profiler' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — Incident Management
   * ============================================================ */

  /* ---- itsm-service-management ---- */
  {
    id: 'itsm-fundamentals',
    title: 'ITSM Fundamentals for DevOps',
    parentId: 'itsm-service-management',
    children: [
      { id: 'itil4-devops', title: 'ITIL 4 & DevOps Integration' },
      { id: 'incident-problem-change', title: 'Incident, Problem & Change Management' },
      { id: 'cmdb-service-catalog', title: 'CMDB & Service Catalog' },
      { id: 'sla-ola-uc', title: 'SLA, OLA & Underpinning Contracts' },
    ],
  },
  {
    id: 'itsm-platforms',
    title: 'ITSM Platforms',
    parentId: 'itsm-service-management',
    children: [
      { id: 'servicenow-itsm', title: 'ServiceNow ITSM' },
      { id: 'jira-service-management', title: 'Jira Service Management' },
      { id: 'freshservice-itsm', title: 'Freshservice' },
      { id: 'bmc-helix-itsm', title: 'BMC Helix ITSM' },
      { id: 'pagerduty-service-catalog', title: 'PagerDuty Service Catalog' },
    ],
  },
  {
    id: 'chatops-platforms',
    title: 'ChatOps & Collaboration Platforms',
    parentId: 'itsm-service-management',
    children: [
      { id: 'slack-chatops', title: 'Slack ChatOps (Workflows & Apps)' },
      { id: 'microsoft-teams-ops', title: 'Microsoft Teams for Ops' },
      { id: 'mattermost-chatops', title: 'Mattermost' },
      { id: 'discord-ops-bots', title: 'Discord Ops Bots' },
      { id: 'incident-io-chatops', title: 'incident.io ChatOps' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — Cloud-Native
   * ============================================================ */

  /* ---- cloud-provider-fundamentals ---- */
  {
    id: 'cloud-shared-responsibility',
    title: 'Cloud Shared Responsibility & Models',
    parentId: 'cloud-provider-fundamentals',
    children: [
      { id: 'shared-responsibility-model', title: 'Shared Responsibility Model' },
      { id: 'cloud-deployment-models-deep', title: 'Public, Private, Hybrid & Sovereign Cloud' },
      { id: 'cloud-regions-availability', title: 'Regions, AZs & Availability Domains' },
      { id: 'cloud-well-architected-agnostic', title: 'Well-Architected Principles (Cloud-Agnostic)' },
    ],
  },
  {
    id: 'cloud-identity-networking-basics',
    title: 'Cloud Identity & Networking Basics',
    parentId: 'cloud-provider-fundamentals',
    children: [
      { id: 'cloud-iam-fundamentals', title: 'Cloud IAM Fundamentals' },
      { id: 'cloud-vpc-networking-basics', title: 'VPC / VNet / VPC Networking Basics' },
      { id: 'cloud-storage-types', title: 'Object, Block & File Storage Types' },
      { id: 'cloud-managed-services-catalog', title: 'Managed Services vs Self-Managed' },
    ],
  },
  {
    id: 'cloud-provider-landscape',
    title: 'Major Cloud Provider Landscape',
    parentId: 'cloud-provider-fundamentals',
    children: [
      { id: 'aws-overview-devops', title: 'AWS for DevOps (Overview)' },
      { id: 'azure-overview-devops', title: 'Azure for DevOps (Overview)' },
      { id: 'gcp-overview-devops', title: 'GCP for DevOps (Overview)' },
      { id: 'oracle-ibm-cloud-overview', title: 'Oracle Cloud & IBM Cloud (Overview)' },
      { id: 'digitalocean-linode-vultr', title: 'DigitalOcean, Linode & Vultr' },
    ],
  },

  /* ---- event-streaming-messaging ---- */
  {
    id: 'messaging-fundamentals',
    title: 'Event-Driven & Messaging Fundamentals',
    parentId: 'event-streaming-messaging',
    children: [
      { id: 'pub-sub-patterns', title: 'Pub/Sub & Event-Driven Patterns' },
      { id: 'message-queues-vs-streams', title: 'Message Queues vs Event Streams' },
      { id: 'event-schema-evolution', title: 'Event Schema & Evolution (Avro, Protobuf)' },
      { id: 'dead-letter-queues', title: 'Dead Letter Queues & Retry Patterns' },
    ],
  },
  {
    id: 'kafka-ecosystem',
    title: 'Apache Kafka Ecosystem',
    parentId: 'event-streaming-messaging',
    children: [
      { id: 'kafka-fundamentals-ops', title: 'Kafka Fundamentals for Operators' },
      { id: 'kafka-connect', title: 'Kafka Connect' },
      { id: 'kafka-streams-ops', title: 'Kafka Streams (Operations View)' },
      { id: 'confluent-platform', title: 'Confluent Platform & Cloud' },
      { id: 'redpanda-kafka', title: 'Redpanda' },
      { id: 'amazon-msk', title: 'Amazon MSK' },
      { id: 'strimzi-kafka-k8s', title: 'Strimzi (Kafka on Kubernetes)' },
    ],
  },
  {
    id: 'other-messaging-platforms',
    title: 'Other Messaging Platforms',
    parentId: 'event-streaming-messaging',
    children: [
      { id: 'rabbitmq-ops', title: 'RabbitMQ' },
      { id: 'nats-jetstream', title: 'NATS & JetStream' },
      { id: 'apache-pulsar', title: 'Apache Pulsar' },
      { id: 'aws-sqs-sns-eventbridge', title: 'AWS SQS, SNS & EventBridge' },
      { id: 'azure-service-bus', title: 'Azure Service Bus & Event Hubs' },
      { id: 'google-pubsub', title: 'Google Cloud Pub/Sub' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — DevSecOps
   * ============================================================ */

  /* ---- cnapp-cloud-security ---- */
  {
    id: 'cnapp-fundamentals',
    title: 'CNAPP Fundamentals',
    parentId: 'cnapp-cloud-security',
    children: [
      { id: 'cnapp-cspm-cwpp-ciem', title: 'CSPM, CWPP & CIEM in CNAPP' },
      { id: 'cloud-security-posture', title: 'Cloud Security Posture Management' },
      { id: 'cloud-workload-protection', title: 'Cloud Workload Protection' },
      { id: 'cloud-identity-entitlements', title: 'Cloud Identity Entitlement Management' },
    ],
  },
  {
    id: 'cnapp-platforms',
    title: 'CNAPP Platforms',
    parentId: 'cnapp-cloud-security',
    children: [
      { id: 'wiz-cnapp', title: 'Wiz' },
      { id: 'prisma-cloud-paloalto', title: 'Prisma Cloud (Palo Alto)' },
      { id: 'orca-security', title: 'Orca Security' },
      { id: 'lacework-cnapp', title: 'Lacework (Fortinet)' },
      { id: 'sysdig-secure-cnapp', title: 'Sysdig Secure' },
      { id: 'microsoft-defender-cspm', title: 'Microsoft Defender for Cloud' },
    ],
  },
  {
    id: 'cloud-native-threat-detection',
    title: 'Cloud-Native Threat Detection',
    parentId: 'cnapp-cloud-security',
    children: [
      { id: 'guardduty-threat-detection', title: 'AWS GuardDuty' },
      { id: 'azure-defender-threats', title: 'Microsoft Defender for Cloud Alerts' },
      { id: 'gcp-security-command-center', title: 'GCP Security Command Center' },
      { id: 'cloud-trail-audit-analytics', title: 'Cloud Audit Log Analytics' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — AI-Augmented DevOps
   * ============================================================ */

  /* ---- agentic-ai-devops ---- */
  {
    id: 'agentic-devops-fundamentals',
    title: 'Agentic DevOps Fundamentals',
    parentId: 'agentic-ai-devops',
    children: [
      { id: 'ai-agents-for-ops', title: 'AI Agents for Operations' },
      { id: 'agent-orchestration-patterns', title: 'Agent Orchestration Patterns' },
      { id: 'human-in-the-loop-agents', title: 'Human-in-the-Loop Agent Workflows' },
      { id: 'agent-guardrails-devops', title: 'Guardrails for DevOps AI Agents' },
    ],
  },
  {
    id: 'coding-agent-platforms',
    title: 'AI Coding Agent Platforms',
    parentId: 'agentic-ai-devops',
    children: [
      { id: 'cursor-background-agents', title: 'Cursor Background Agents' },
      { id: 'github-copilot-coding-agent', title: 'GitHub Copilot Coding Agent' },
      { id: 'devin-cognition', title: 'Devin (Cognition)' },
      { id: 'amazon-q-developer', title: 'Amazon Q Developer' },
      { id: 'gitlab-duo-agent', title: 'GitLab Duo Agent Platform' },
      { id: 'openai-codex-agent', title: 'OpenAI Codex Agent' },
    ],
  },
  {
    id: 'ai-remediation-automation',
    title: 'AI Remediation & Pipeline Automation',
    parentId: 'agentic-ai-devops',
    children: [
      { id: 'ai-incident-triage', title: 'AI Incident Triage & Summarization' },
      { id: 'ai-root-cause-analysis', title: 'AI-Assisted Root Cause Analysis' },
      { id: 'ai-runbook-generation', title: 'AI Runbook & Playbook Generation' },
      { id: 'ai-policy-remediation', title: 'AI Policy Violation Remediation' },
      { id: 'mcp-devops-integration', title: 'Model Context Protocol (MCP) for DevOps' },
    ],
  },

  /* ============================================================
   * NEW ROADMAP TOPICS — IaC
   * ============================================================ */

  /* ---- infrastructure-testing ---- */
  {
    id: 'iac-testing-fundamentals',
    title: 'Infrastructure Testing Fundamentals',
    parentId: 'infrastructure-testing',
    children: [
      { id: 'iac-test-pyramid', title: 'Infrastructure Test Pyramid' },
      { id: 'static-analysis-iac', title: 'Static Analysis for IaC' },
      { id: 'policy-testing-iac', title: 'Policy Testing (OPA, Sentinel)' },
      { id: 'drift-detection-testing', title: 'Drift Detection as Testing' },
    ],
  },
  {
    id: 'terraform-testing-tools',
    title: 'Terraform & OpenTofu Testing',
    parentId: 'infrastructure-testing',
    children: [
      { id: 'terratest-deep', title: 'Terratest' },
      { id: 'terraform-test-framework', title: 'terraform test Framework' },
      { id: 'kitchen-terraform', title: 'kitchen-terraform' },
      { id: 'tftest-opentofu', title: 'OpenTofu tftest' },
      { id: 'localstack-terraform-test', title: 'LocalStack for Terraform Tests' },
    ],
  },
  {
    id: 'config-mgmt-testing',
    title: 'Configuration Management Testing',
    parentId: 'infrastructure-testing',
    children: [
      { id: 'ansible-molecule-deep', title: 'Molecule (Ansible)' },
      { id: 'inspec-compliance', title: 'InSpec Compliance Testing' },
      { id: 'test-kitchen-chef', title: 'Test Kitchen (Chef)' },
      { id: 'serverspec', title: 'Serverspec' },
      { id: 'goss-testing', title: 'goss (Quick Server Validation)' },
    ],
  },
  {
    id: 'kubernetes-policy-testing',
    title: 'Kubernetes & Policy Testing',
    parentId: 'infrastructure-testing',
    children: [
      { id: 'kyverno-test-cli', title: 'Kyverno Test CLI & Chainsaw' },
      { id: 'kubeconform-validation', title: 'kubeconform' },
      { id: 'kube-score', title: 'kube-score' },
      { id: 'datree-k8s', title: 'Datree (Policy)' },
      { id: 'monokle-k8s', title: 'Monokle' },
    ],
  },

  /* ============================================================
   * EXPAND EXISTING ROOTS — thin topics & 2026 depth
   * ============================================================ */

  /* ---- other-service-meshes ---- */
  {
    id: 'cilium-service-mesh',
    title: 'Cilium Service Mesh',
    parentId: 'other-service-meshes',
    children: [
      { id: 'cilium-ebpf-dataplane', title: 'Cilium eBPF Data Plane' },
      { id: 'cilium-hubble-observability', title: 'Hubble Observability' },
      { id: 'cilium-gateway-api', title: 'Cilium Gateway API' },
      { id: 'cilium-mutual-auth', title: 'Cilium Mutual Authentication' },
    ],
  },
  {
    id: 'consul-connect-mesh',
    title: 'Consul Connect',
    parentId: 'other-service-meshes',
    children: [
      { id: 'consul-service-mesh', title: 'Consul Service Mesh' },
      { id: 'consul-intentions', title: 'Consul Intentions (L4/L7 AuthZ)' },
      { id: 'consul-api-gateway', title: 'Consul API Gateway' },
    ],
  },
  {
    id: 'kuma-service-mesh',
    title: 'Kuma / Kong Mesh',
    parentId: 'other-service-meshes',
    children: [
      { id: 'kuma-universal-k8s', title: 'Kuma on Kubernetes & Universal' },
      { id: 'kuma-policies', title: 'Kuma Traffic & Security Policies' },
      { id: 'kong-mesh-enterprise', title: 'Kong Mesh (Enterprise)' },
    ],
  },

  /* ---- other-gitops-tools ---- */
  {
    id: 'spinnaker-gitops',
    title: 'Spinnaker',
    parentId: 'other-gitops-tools',
    children: [
      { id: 'spinnaker-pipelines', title: 'Spinnaker Pipelines' },
      { id: 'spinnaker-deployment-strategies', title: 'Spinnaker Deployment Strategies' },
      { id: 'spinnaker-k8s-provider', title: 'Spinnaker Kubernetes Provider' },
    ],
  },
  {
    id: 'werf-gitops',
    title: 'Werf',
    parentId: 'other-gitops-tools',
    children: [
      { id: 'werf-giterminism', title: 'Werf Giterminism' },
      { id: 'werf-converge', title: 'Werf Converge & Cleanup' },
    ],
  },
  {
    id: 'jenkins-x-gitops',
    title: 'Jenkins X',
    parentId: 'other-gitops-tools',
    children: [
      { id: 'jenkins-x-lighthouse', title: 'Jenkins X Lighthouse' },
      { id: 'jenkins-x-tekton', title: 'Jenkins X & Tekton' },
    ],
  },
  {
    id: 'akuity-platform',
    title: 'Akuity Platform',
    parentId: 'other-gitops-tools',
    children: [
      { id: 'akuity-managed-argocd', title: 'Akuity Managed Argo CD' },
      { id: 'kargo-progressive-delivery', title: 'Kargo (Progressive Delivery)' },
    ],
  },

  /* ---- cloud-service-models ---- */
  {
    id: 'service-model-types',
    title: 'Cloud Service Model Types',
    parentId: 'cloud-service-models',
    children: [
      { id: 'iaas-deep', title: 'Infrastructure as a Service (IaaS)' },
      { id: 'paas-deep', title: 'Platform as a Service (PaaS)' },
      { id: 'saas-deep', title: 'Software as a Service (SaaS)' },
      { id: 'faas-serverless-deep', title: 'Functions as a Service (FaaS)' },
      { id: 'caas-containers-deep', title: 'Containers as a Service (CaaS)' },
      { id: 'dbaas-maas', title: 'DBaaS, MaaS & XaaS Variants' },
    ],
  },
  {
    id: 'cloud-economics-consumption',
    title: 'Cloud Economics & Consumption',
    parentId: 'cloud-service-models',
    children: [
      { id: 'pay-as-you-go-reserved', title: 'Pay-As-You-Go vs Reserved Capacity' },
      { id: 'cloud-billing-models', title: 'Cloud Billing & Metering Models' },
      { id: 'egress-data-transfer-costs', title: 'Egress & Data Transfer Costs' },
      { id: 'cloud-marketplace-models', title: 'Cloud Marketplace Models' },
    ],
  },
  {
    id: 'cloud-native-vs-cloud-enabled',
    title: 'Cloud-Native vs Cloud-Enabled',
    parentId: 'cloud-service-models',
    children: [
      { id: 'twelve-factor-apps', title: 'Twelve-Factor App Methodology' },
      { id: 'cloud-native-design-principles', title: 'Cloud-Native Design Principles' },
      { id: 'lift-and-shift-vs-refactor', title: 'Lift-and-Shift vs Refactor vs Replatform' },
    ],
  },

  /* ---- database-cicd ---- */
  {
    id: 'database-pipeline-patterns',
    title: 'Database Pipeline Patterns',
    parentId: 'database-cicd',
    children: [
      { id: 'declarative-vs-sequential-migrations', title: 'Declarative vs Sequential Migrations' },
      { id: 'expand-contract-pattern', title: 'Expand-Contract Migration Pattern' },
      { id: 'blue-green-schema-changes', title: 'Blue-Green Schema Changes' },
      { id: 'shadow-database-testing', title: 'Shadow Database Testing' },
    ],
  },
  {
    id: 'database-cicd-tools',
    title: 'Database CI/CD Tools & Integration',
    parentId: 'database-cicd',
    children: [
      { id: 'liquibase-cicd', title: 'Liquibase in CI/CD' },
      { id: 'flyway-cicd', title: 'Flyway in CI/CD' },
      { id: 'atlas-cicd', title: 'Atlas in CI/CD' },
      { id: 'bytebase-cicd', title: 'Bytebase CI/CD' },
      { id: 'sqitch-cicd', title: 'Sqitch' },
    ],
  },
  {
    id: 'database-governance-cicd',
    title: 'Database Change Governance',
    parentId: 'database-cicd',
    children: [
      { id: 'db-change-approval-workflows', title: 'DB Change Approval Workflows' },
      { id: 'rollback-strategies-db', title: 'Database Rollback Strategies' },
      { id: 'compliance-audit-db-changes', title: 'Compliance Audit for DB Changes' },
    ],
  },

  /* ---- kubernetes-cost-management ---- */
  {
    id: 'k8s-cost-visibility',
    title: 'Kubernetes Cost Visibility',
    parentId: 'kubernetes-cost-management',
    children: [
      { id: 'kubecost-platform', title: 'Kubecost' },
      { id: 'opencost-cncf', title: 'OpenCost (CNCF)' },
      { id: 'cast-ai-cost', title: 'Cast AI' },
      { id: 'cloudzero-k8s', title: 'CloudZero for Kubernetes' },
    ],
  },
  {
    id: 'k8s-cost-optimization',
    title: 'Kubernetes Cost Optimization',
    parentId: 'kubernetes-cost-management',
    children: [
      { id: 'rightsizing-k8s-requests', title: 'Rightsizing Requests & Limits' },
      { id: 'spot-preemptible-nodes', title: 'Spot & Preemptible Node Strategies' },
      { id: 'cluster-autoscaler-cost', title: 'Cluster Autoscaler for Cost' },
      { id: 'goldilocks-vpa', title: 'Goldilocks & VPA Recommendations' },
      { id: 'idle-resource-cleanup-k8s', title: 'Idle Resource Cleanup' },
    ],
  },
  {
    id: 'k8s-chargeback-allocation',
    title: 'Kubernetes Chargeback & Allocation',
    parentId: 'kubernetes-cost-management',
    children: [
      { id: 'namespace-chargeback', title: 'Namespace-Level Chargeback' },
      { id: 'label-based-allocation-k8s', title: 'Label-Based Cost Allocation' },
      { id: 'shared-cost-splitting-k8s', title: 'Shared Cluster Cost Splitting' },
    ],
  },

  /* ---- ai-coding-agents-devops ---- */
  {
    id: 'background-coding-agents',
    title: 'Background Coding Agents',
    parentId: 'ai-coding-agents-devops',
    children: [
      { id: 'cursor-background-agent', title: 'Cursor Background Agents' },
      { id: 'copilot-workspace-agent', title: 'GitHub Copilot Workspace' },
      { id: 'sweep-ai-pr-bot', title: 'Sweep AI (PR Bot)' },
      { id: 'coderabbit-review', title: 'CodeRabbit' },
    ],
  },
  {
    id: 'autonomous-fixers',
    title: 'Autonomous Fixers & Remediation Bots',
    parentId: 'ai-coding-agents-devops',
    children: [
      { id: 'dependabot-renovate-ai', title: 'Dependabot & Renovate (AI-Enhanced)' },
      { id: 'snyk-auto-fix', title: 'Snyk Auto-Fix' },
      { id: 'mintlify-doc-bots', title: 'AI Documentation Bots' },
      { id: 'test-generation-agents', title: 'AI Test Generation Agents' },
    ],
  },
  {
    id: 'agent-security-governance',
    title: 'Agent Security & Governance',
    parentId: 'ai-coding-agents-devops',
    children: [
      { id: 'agent-permissions-scoping', title: 'Agent Permissions & Scoping' },
      { id: 'agent-audit-trails', title: 'Agent Audit Trails' },
      { id: 'secrets-in-agent-context', title: 'Secrets Handling in Agent Context' },
      { id: 'agent-rate-cost-limits', title: 'Agent Rate & Cost Limits' },
    ],
  },

  /* ---- system-administration — Windows for DevOps ---- */
  {
    id: 'windows-server-admin',
    title: 'Windows Server Administration',
    parentId: 'system-administration',
    children: [
      { id: 'windows-server-core', title: 'Windows Server Core & Roles' },
      { id: 'iis-administration', title: 'IIS Administration' },
      { id: 'windows-services-sc', title: 'Windows Services & sc.exe' },
      { id: 'wsl2-devops', title: 'WSL 2 for DevOps on Windows' },
    ],
  },
  {
    id: 'windows-automation',
    title: 'Windows Automation',
    parentId: 'system-administration',
    children: [
      { id: 'powershell-remoting', title: 'PowerShell Remoting (WinRM)' },
      { id: 'desired-state-configuration', title: 'PowerShell DSC' },
      { id: 'group-policy-devops', title: 'Group Policy for DevOps' },
      { id: 'windows-containers', title: 'Windows Containers' },
    ],
  },

  /* ---- cicd-fundamentals — trunk-based & monorepo ---- */
  {
    id: 'trunk-based-development',
    title: 'Trunk-Based Development',
    parentId: 'cicd-fundamentals',
    children: [
      { id: 'trunk-based-principles', title: 'Trunk-Based Development Principles' },
      { id: 'feature-flags-trunk', title: 'Feature Flags with Trunk-Based Dev' },
      { id: 'short-lived-branches', title: 'Short-Lived Feature Branches' },
      { id: 'branch-by-abstraction', title: 'Branch by Abstraction' },
    ],
  },
  {
    id: 'monorepo-pipelines',
    title: 'Monorepo Pipeline Strategies',
    parentId: 'cicd-fundamentals',
    children: [
      { id: 'affected-target-detection', title: 'Affected Target Detection' },
      { id: 'bazel-remote-cache-ci', title: 'Bazel Remote Cache in CI' },
      { id: 'nx-turborepo-ci', title: 'Nx & Turborepo in CI' },
      { id: 'path-filter-workflows', title: 'Path Filters in Workflows' },
    ],
  },

  /* ---- devops-fundamentals — platform thinking ---- */
  {
    id: 'platform-engineering-intro',
    title: 'Platform Engineering Introduction',
    parentId: 'devops-fundamentals',
    children: [
      { id: 'platform-vs-devops-vs-sre', title: 'Platform Engineering vs DevOps vs SRE' },
      { id: 'internal-developer-platform-intro', title: 'Internal Developer Platform (IDP) Intro' },
      { id: 'golden-path-intro', title: 'Golden Paths Introduction' },
    ],
  },

  /* ---- iac-fundamentals — GitOps for infra ---- */
  {
    id: 'gitops-for-infrastructure',
    title: 'GitOps for Infrastructure',
    parentId: 'iac-fundamentals',
    children: [
      { id: 'infra-repo-structure', title: 'Infrastructure Repository Structure' },
      { id: 'environment-branching-iac', title: 'Environment Branching vs Directories' },
      { id: 'iac-pr-workflows', title: 'IaC Pull Request Workflows' },
    ],
  },
])
