/**
 * Taxonomy additions for Docker beginner→expert coverage (June 2026).
 * Applied by rebuild-tree.mjs after the base tree is built.
 *
 * - NEW_ROOT_TOPICS: full 3-level trees for new roadmap nodes
 * - ROOT_GROUPING_OVERRIDES: replace auto-grouped subtopics on existing roots
 * - NEW_SUBTOPICS: append subtopics (with leaves) to existing roots
 * - LEAF_ENRICHMENTS: append sub-subtopics to existing subtopics (by full subtopic id)
 */

/** @type {Record<string, { stageTag: string, level: string, title: string, summary: string, order: number, subtopics: Array<{ id: string, title: string, leaves: Array<string|{id:string,title:string}> }> }>} */
export const NEW_ROOT_TOPICS = {
  'docker-engine-api': {
    stageTag: 'docker-engine-install',
    level: 'intermediate',
    order: 2001,
    title: 'Docker Engine API',
    summary: 'REST API surface, versioning, streaming endpoints and client integration patterns.',
    subtopics: [
      {
        id: 'api-fundamentals',
        title: 'API Fundamentals',
        leaves: [
          'engine-api-versioning',
          'api-unix-socket-vs-tcp',
          'api-content-types',
          'api-pagination-filters',
        ],
      },
      {
        id: 'core-endpoints',
        title: 'Core Endpoints',
        leaves: [
          'containers-api-endpoints',
          'images-api-endpoints',
          'networks-volumes-api',
          'system-info-events-api',
        ],
      },
      {
        id: 'api-integration',
        title: 'API Integration',
        leaves: [
          'sdk-client-libraries',
          'api-streaming-logs-exec',
          'api-error-handling',
          'api-auth-tls-clients',
        ],
      },
    ],
  },
  'windows-containers': {
    stageTag: 'docker-engine-install',
    level: 'intermediate',
    order: 2002,
    title: 'Windows Containers',
    summary: 'WCOW/Hyper-V isolation, Windows base images and Docker on Windows Server.',
    subtopics: [
      {
        id: 'windows-isolation',
        title: 'Windows Isolation Modes',
        leaves: [
          'process-isolation-wcow',
          'hyper-v-isolation',
          'isolation-mode-selection',
          'windows-host-requirements',
        ],
      },
      {
        id: 'windows-images',
        title: 'Windows Base Images',
        leaves: [
          'server-core-base-images',
          'nanoserver-base-images',
          'windows-image-versioning',
          'mcr-windows-repositories',
        ],
      },
      {
        id: 'windows-workloads',
        title: 'Windows Workload Patterns',
        leaves: [
          'iis-dotnet-containers',
          'windows-compose-isolation',
          'gmsa-active-directory',
          'windows-linux-mixed-stacks',
        ],
      },
    ],
  },
  'cloud-native-buildpacks': {
    stageTag: 'building-images',
    level: 'intermediate',
    order: 2003,
    title: 'Cloud Native Buildpacks',
    summary: 'Pack, buildpacks.io and OCI images without hand-written Dockerfiles.',
    subtopics: [
      {
        id: 'buildpack-fundamentals',
        title: 'Buildpack Fundamentals',
        leaves: [
          'buildpack-lifecycle-phases',
          'builder-stack-concepts',
          'pack-cli-basics',
          'buildpacks-vs-dockerfile',
        ],
      },
      {
        id: 'pack-workflows',
        title: 'Pack Workflows',
        leaves: [
          'pack-build-local',
          'pack-build-publish',
          'custom-builders-stacks',
          'buildpack-cache-rebuild',
        ],
      },
      {
        id: 'buildpack-ecosystem',
        title: 'Buildpack Ecosystem',
        leaves: [
          'paketo-buildpacks',
          'heroku-cloud-native-buildpacks',
          'buildpacks-docker-buildx-integration',
          'buildpack-reproducibility-sbom',
        ],
      },
    ],
  },
  'dockerfile-validation': {
    stageTag: 'building-images',
    level: 'intermediate',
    order: 2004,
    title: 'Dockerfile Validation & Build Checks',
    summary: 'Hadolint, BuildKit checks and automated Dockerfile quality gates.',
    subtopics: [
      {
        id: 'linting-tools',
        title: 'Linting & Static Analysis',
        leaves: [
          'hadolint-rulesets',
          'dockerfile-lint-ci-integration',
          'checkov-dockerfile-policies',
          'custom-lint-rules',
        ],
      },
      {
        id: 'buildkit-checks',
        title: 'BuildKit Build Checks',
        leaves: [
          'build-checks-overview',
          'build-checks-json-output',
          'build-checks-ci-gates',
          'build-checks-supply-chain',
        ],
      },
      {
        id: 'validation-pipelines',
        title: 'Validation in Pipelines',
        leaves: [
          'pre-commit-dockerfile-hooks',
          'pr-dockerfile-review-gates',
          'validation-scorecards',
          'fix-automation-suggestions',
        ],
      },
    ],
  },
  'container-device-interface': {
    stageTag: 'runtime-internals',
    level: 'advanced',
    order: 2005,
    title: 'Container Device Interface (CDI)',
    summary: 'CDI spec, device injection, nvidia-ctk and Compose device requests.',
    subtopics: [
      {
        id: 'cdi-spec',
        title: 'CDI Specification',
        leaves: [
          'cdi-json-schema',
          'cdi-device-nodes-hooks',
          'cdi-vendor-directories',
          'cdi-vs-legacy-gpu-flags',
        ],
      },
      {
        id: 'cdi-generation',
        title: 'CDI Generation & Injection',
        leaves: [
          'nvidia-ctk-cdi-generate',
          'cdi-docker-run-injection',
          'cdi-compose-device-requests',
          'cdi-custom-device-specs',
        ],
      },
      {
        id: 'cdi-operations',
        title: 'CDI Operations',
        leaves: [
          'cdi-amd-intel-devices',
          'cdi-rootless-limitations',
          'cdi-troubleshooting',
          'cdi-kubernetes-parity',
        ],
      },
    ],
  },
  'supply-chain-policy-enforcement': {
    stageTag: 'image-security',
    level: 'advanced',
    order: 2006,
    title: 'Supply Chain Policy Enforcement',
    summary: 'Verify-at-pull, admission control and org-wide image policy.',
    subtopics: [
      {
        id: 'verify-at-pull',
        title: 'Verify-at-Pull',
        leaves: [
          'cosign-verify-policy',
          'notation-trust-policy',
          'registry-signature-enforcement',
          'policy-failure-handling',
        ],
      },
      {
        id: 'admission-control',
        title: 'Admission & Gatekeeping',
        leaves: [
          'conftest-opa-docker-policies',
          'kyverno-image-policies',
          'scout-policy-enforcement',
          'blocked-image-workflows',
        ],
      },
      {
        id: 'org-policy-program',
        title: 'Organization Policy Program',
        leaves: [
          'allowed-base-image-lists',
          'digest-only-promotion-rules',
          'sbom-attestation-requirements',
          'policy-exception-process',
        ],
      },
    ],
  },
  'docker-sandboxes': {
    stageTag: 'docker-desktop',
    level: 'advanced',
    order: 2007,
    title: 'Docker Sandboxes',
    summary: 'MicroVM-isolated environments for AI coding agents via sbx and docker sandbox.',
    subtopics: [
      {
        id: 'sandbox-fundamentals',
        title: 'Sandbox Fundamentals',
        leaves: [
          'sbx-vs-docker-sandbox',
          'microvm-isolation-model',
          'sandbox-workspace-mounts',
          'sandbox-docker-in-sandbox',
        ],
      },
      {
        id: 'sbx-cli',
        title: 'sbx CLI Workflows',
        leaves: [
          'sbx-install-login',
          'sbx-create-run-ls',
          'sbx-network-policies',
          'sbx-secrets-blueprints',
        ],
      },
      {
        id: 'agent-integration',
        title: 'Coding Agent Integration',
        leaves: [
          'claude-code-sandbox',
          'copilot-codex-sandbox',
          'yolo-mode-safely',
          'sandbox-port-publishing',
        ],
      },
      {
        id: 'sandbox-governance',
        title: 'Sandbox Governance',
        leaves: [
          'org-sandbox-policies',
          'sandbox-audit-events',
          'sandbox-restricted-networks',
          'sandbox-team-deployment',
        ],
      },
    ],
  },
  'docker-pass': {
    stageTag: 'docker-desktop',
    level: 'intermediate',
    order: 2008,
    title: 'docker pass & Secrets Engine',
    summary: 'Local keychain secrets, se:// references and runtime secret injection.',
    subtopics: [
      {
        id: 'pass-cli',
        title: 'docker pass CLI',
        leaves: [
          'pass-set-get-ls-rm',
          'pass-run-host-commands',
          'pass-plugins-backends',
          'pass-metadata-patterns',
        ],
      },
      {
        id: 'secrets-engine',
        title: 'Secrets Engine',
        leaves: [
          'secrets-engine-architecture',
          'se-reference-syntax',
          'secrets-engine-compose',
          'secrets-engine-resolver-api',
        ],
      },
      {
        id: 'pass-workflows',
        title: 'Developer Workflows',
        leaves: [
          'pass-docker-run-injection',
          'pass-compose-env-files',
          'pass-vs-swarm-secrets',
          'pass-security-practices',
        ],
      },
    ],
  },
  'docker-ai-governance': {
    stageTag: 'docker-desktop',
    level: 'advanced',
    order: 2009,
    title: 'Docker AI Governance',
    summary: 'Enterprise control plane for agent sandboxes, MCP tools and audit.',
    subtopics: [
      {
        id: 'governance-console',
        title: 'Admin Console & Policy',
        leaves: [
          'governance-policy-model',
          'org-vs-team-policies',
          'deny-wins-evaluation',
          'governance-api-automation',
        ],
      },
      {
        id: 'mcp-governance',
        title: 'MCP Tool Governance',
        leaves: [
          'org-mcp-server-allowlists',
          'mcp-gateway-policy-routing',
          'blocked-mcp-workflows',
          'mcp-audit-events',
        ],
      },
      {
        id: 'identity-provisioning',
        title: 'Identity & Provisioning',
        leaves: [
          'governance-saml-scim',
          'governance-custom-roles',
          'policy-propagation-auth',
          'siem-export-integration',
        ],
      },
      {
        id: 'runtime-enforcement',
        title: 'Runtime Enforcement',
        leaves: [
          'sandbox-network-filesystem-policy',
          'credential-scoping-sessions',
          'governance-sandbox-integration',
          'agent-compliance-evidence',
        ],
      },
    ],
  },
  'docker-subscriptions-licensing': {
    stageTag: 'docker-desktop',
    level: 'intermediate',
    order: 2010,
    title: 'Subscriptions & Licensing',
    summary: 'Personal, Pro, Team, Business plans and product entitlements.',
    subtopics: [
      {
        id: 'subscription-tiers',
        title: 'Subscription Tiers',
        leaves: [
          'personal-pro-plans',
          'team-business-plans',
          'hub-rate-limits-tiers',
          'education-open-source',
        ],
      },
      {
        id: 'product-entitlements',
        title: 'Product Entitlements',
        leaves: [
          'build-cloud-entitlement',
          'offload-entitlement',
          'scout-entitlement',
          'desktop-admin-entitlement',
        ],
      },
      {
        id: 'license-management',
        title: 'License Management',
        leaves: [
          'org-seat-management',
          'sso-enforcement',
          'air-gapped-licensing',
          'compliance-audit-licensing',
        ],
      },
    ],
  },
  'docker-logs-view': {
    stageTag: 'docker-desktop',
    level: 'intermediate',
    order: 2011,
    title: 'Docker Desktop Logs View',
    summary: 'Unified log browsing, Compose stack filtering and CLI integration.',
    subtopics: [
      {
        id: 'logs-view-ui',
        title: 'Logs View UI',
        leaves: [
          'logs-view-navigation',
          'compose-stack-filtering',
          'multi-container-log-streams',
          'log-search-highlighting',
        ],
      },
      {
        id: 'logs-cli-integration',
        title: 'CLI Integration',
        leaves: [
          'logs-view-docker-logs-hints',
          'logs-view-compose-logs-hints',
          'logs-export-sharing',
          'logs-gordon-diagnosis',
        ],
      },
    ],
  },
  'docker-offload-ci': {
    stageTag: 'ci-cd',
    level: 'advanced',
    order: 2012,
    title: 'Docker Offload in CI/CD',
    summary: 'Running builds and tests on Offload capacity from CI pipelines.',
    subtopics: [
      {
        id: 'offload-ci-setup',
        title: 'CI Setup',
        leaves: [
          'offload-ci-authentication',
          'offload-github-actions-setup',
          'offload-gitlab-ci-setup',
          'offload-jenkins-setup',
        ],
      },
      {
        id: 'offload-ci-patterns',
        title: 'CI Patterns',
        leaves: [
          'offload-build-test-split',
          'offload-gpu-ci-jobs',
          'offload-cache-in-ci',
          'offload-failure-debugging',
        ],
      },
      {
        id: 'offload-ci-governance',
        title: 'CI Governance',
        leaves: [
          'offload-ci-cost-controls',
          'offload-secrets-in-ci',
          'offload-network-restrictions',
          'offload-audit-trails',
        ],
      },
    ],
  },
  'ai-agent-runtime-security': {
    stageTag: 'security-hardening',
    level: 'advanced',
    order: 2013,
    title: 'AI Agent Runtime Security',
    summary: 'Securing Gordon, MCP tools and autonomous agent workloads.',
    subtopics: [
      {
        id: 'agent-threat-model',
        title: 'Agent Threat Model',
        leaves: [
          'prompt-injection-containers',
          'tool-privilege-escalation',
          'credential-exfiltration-risks',
          'supply-chain-agent-images',
        ],
      },
      {
        id: 'agent-controls',
        title: 'Runtime Controls',
        leaves: [
          'approval-gates-agents',
          'sandbox-boundary-enforcement',
          'mcp-least-privilege',
          'network-egress-restrictions',
        ],
      },
      {
        id: 'agent-governance-integration',
        title: 'Governance Integration',
        leaves: [
          'governance-policy-for-agents',
          'agent-audit-logging',
          'incident-response-agents',
          'red-team-agent-testing',
        ],
      },
    ],
  },
}

/** Replace entire subtopic tree for these roots (better than auto-grouping). */
export const ROOT_GROUPING_OVERRIDES = {
  'container-fundamentals': [
    {
      id: 'container-model',
      title: 'Container Model & Isolation',
      leaves: [
        { id: 'container-isolation-model', title: 'Container Isolation Model' },
        'containers-vs-vms',
      ],
    },
    {
      id: 'history-ecosystem',
      title: 'History & Ecosystem',
      leaves: [
        'history-of-containers',
        { id: 'chroot-to-docker-evolution', title: 'From chroot to Docker' },
        { id: 'open-source-container-ecosystem', title: 'Open Source Container Ecosystem' },
        { id: 'container-standards-timeline', title: 'Container Standards Timeline' },
      ],
    },
    {
      id: 'adoption-fit',
      title: 'Adoption & Workload Fit',
      leaves: [
        { id: 'workload-fit-patterns', title: 'Workload Fit Patterns' },
        { id: 'constraints-and-tradeoffs', title: 'Constraints & Tradeoffs' },
      ],
    },
    {
      id: 'container-ecosystem',
      title: 'Container Ecosystem Landscape',
      leaves: [
        'containerd-runc-ecosystem',
        'docker-vs-podman-positioning',
        'kubernetes-relationship',
        'cloud-container-services',
      ],
    },
  ],
  'docker-offload': [
    {
      id: 'offload-setup',
      title: 'Enabling & Configuring Offload',
      leaves: ['offload-overview', 'offload-enable', 'offload-target-selection'],
    },
    {
      id: 'offload-workload-parity',
      title: 'Workload Parity',
      leaves: [
        'offload-bind-mount-parity',
        'offload-compose-support',
        'offload-port-forwarding',
        'offload-idle-engine-states',
      ],
    },
    {
      id: 'offload-deployment-models',
      title: 'Deployment Models',
      leaves: [
        'offload-vdi-managed-desktop',
        'offload-byoc-single-tenant',
        'offload-gpu-backed-instances',
        'offload-restricted-networks',
      ],
    },
    {
      id: 'offload-governance',
      title: 'Billing, Security & Plans',
      leaves: ['offload-billing-quotas', 'offload-security-data', 'offload-business-plan'],
    },
  ],
  'enhanced-container-isolation': [
    {
      id: 'eci-fundamentals',
      title: 'ECI Fundamentals',
      leaves: [
        'eci-overview',
        'eci-sysbox-runtime',
        'eci-vs-default-runtime',
        'eci-enable-desktop',
      ],
    },
    {
      id: 'eci-policies',
      title: 'Protected Container Policies',
      leaves: [
        'eci-admin-policies',
        'eci-time-namespace-protected',
        'eci-command-block-policies',
        'eci-mount-restrictions',
      ],
    },
    {
      id: 'eci-operations',
      title: 'ECI Operations',
      leaves: [
        'eci-troubleshooting',
        'eci-performance-impact',
        'eci-compose-services',
        'eci-enterprise-rollout',
      ],
    },
  ],
  'compose-bridge': [
    {
      id: 'bridge-fundamentals',
      title: 'Bridge Fundamentals',
      leaves: [
        'compose-bridge-overview',
        'compose-bridge-cli',
        'compose-bridge-transformers',
        'compose-bridge-output-formats',
      ],
    },
    {
      id: 'kubernetes-bridge',
      title: 'Kubernetes Bridge',
      leaves: [
        'bridge-k8s-manifest-generation',
        'bridge-k8s-compose-v2-parity',
        'bridge-custom-k8s-templates',
        'bridge-k8s-validation',
      ],
    },
    {
      id: 'helm-bridge',
      title: 'Helm & Advanced Outputs',
      leaves: [
        'bridge-helm-chart-generation',
        'bridge-multi-file-output',
        'bridge-output-validation',
        'bridge-cicd-integration',
      ],
    },
  ],
  'compose-bridge-desktop': [
    {
      id: 'desktop-bridge-workflows',
      title: 'Desktop Bridge Workflows',
      leaves: [
        'desktop-bridge-ui',
        'desktop-bridge-preview',
        'desktop-bridge-export',
        'desktop-bridge-iteration',
      ],
    },
    {
      id: 'desktop-bridge-integration',
      title: 'Desktop Integration',
      leaves: [
        'desktop-bridge-compose-sync',
        'desktop-bridge-k8s-preview',
        'desktop-bridge-team-sharing',
        'desktop-bridge-troubleshooting',
      ],
    },
  ],
  'confidential-containers': [
    {
      id: 'cc-fundamentals',
      title: 'Confidential Computing Fundamentals',
      leaves: [
        'tee-trusted-execution',
        'confidential-containers-architecture',
        'attestation-concepts',
        'cc-threat-model',
      ],
    },
    {
      id: 'cc-runtimes',
      title: 'Confidential Runtimes',
      leaves: [
        'kata-confidential-containers',
        'azure-confidential-containers',
        'amd-sev-snp-containers',
        'intel-tdx-containers',
      ],
    },
    {
      id: 'cc-attestation',
      title: 'Attestation & Operations',
      leaves: [
        'remote-attestation-workflow',
        'cc-image-encryption',
        'cc-key-management',
        'cc-production-deployment',
      ],
    },
  ],
  'container-standards': [
    {
      id: 'oci-specifications',
      title: 'OCI Specifications',
      leaves: ['oci-image-spec', 'oci-runtime-spec', 'oci-distribution-spec', 'oci-artifacts'],
    },
    {
      id: 'runtime-interfaces',
      title: 'Runtime Interfaces',
      leaves: ['cri-spec', 'oci-conformance-testing', 'spec-versioning-compatibility'],
    },
    {
      id: 'distribution-artifacts',
      title: 'Distribution & Artifacts',
      leaves: [
        'referrers-api',
        'attestation-artifact-types',
        'model-artifact-oci-types',
      ],
    },
  ],
  'docker-scout': [
    {
      id: 'scout-cli',
      title: 'Scout CLI',
      leaves: [
        'scout-cves',
        'scout-compare-cmd',
        'scout-recommendations',
        'scout-quickview',
        'scout-enrollment',
      ],
    },
    {
      id: 'scout-policies',
      title: 'Scout Policies & Scoring',
      leaves: [
        'scout-policies',
        'scout-health-score',
        'scout-policy-indexes',
        'scout-vex-statements',
      ],
    },
    {
      id: 'scout-integration',
      title: 'Hub & Desktop Integration',
      leaves: [
        'scout-hub-dashboard',
        'scout-cli-first-desktop-workflow',
        'scout-dhi-integration',
        'scout-ci-enrollment',
      ],
    },
    {
      id: 'scout-supply-chain',
      title: 'Supply Chain Analysis',
      leaves: [
        'scout-sbom-analysis',
        'scout-provenance-verification',
        'scout-base-image-recommendations',
        'scout-ecosystem-packages',
      ],
    },
  ],
  'docker-hardened-images': [
    {
      id: 'dhi-catalog',
      title: 'DHI Catalog',
      leaves: [
        'dhi-catalog-browsing',
        'dhi-image-tiers',
        'dhi-language-stacks',
        'dhi-minimal-variants',
      ],
    },
    {
      id: 'dhi-security',
      title: 'DHI Security',
      leaves: [
        'dhi-signed-images',
        'dhi-sbom-attestations',
        'dhi-scout-analysis',
        'dhi-vulnerability-sla',
      ],
    },
    {
      id: 'dhi-adoption',
      title: 'DHI Adoption',
      leaves: [
        'dhi-migration-from-library',
        'dhi-enterprise-program',
        'dhi-compose-kubernetes',
        'dhi-update-cadence',
      ],
    },
  ],
  'docker-build-cloud': [
    {
      id: 'build-cloud-setup',
      title: 'Build Cloud Setup',
      leaves: [
        'build-cloud-account-setup',
        'build-cloud-builder-instances',
        'build-cloud-team-builders',
        'build-cloud-iam-access',
      ],
    },
    {
      id: 'build-cloud-buildx',
      title: 'Buildx Cloud Driver',
      leaves: [
        'buildx-cloud-driver-create',
        'buildx-cloud-build-workflows',
        'build-cloud-secrets-mounts',
        'build-cloud-multi-platform',
      ],
    },
    {
      id: 'build-cloud-operations',
      title: 'Operations & Cache',
      leaves: [
        'build-cloud-shared-cache',
        'build-cloud-org-cache-boundaries',
        'build-cloud-billing-usage',
        'build-cloud-troubleshooting',
      ],
    },
  ],
  'docker-model-runner': [
    {
      id: 'model-runner-core',
      title: 'Model Runner Core',
      leaves: [
        'model-runner-overview',
        'model-runner-enable',
        'model-runner-architecture',
        'model-runner-system-requirements',
      ],
    },
    {
      id: 'docker-model-cli',
      title: 'docker model CLI',
      leaves: [
        'docker-model-pull',
        'docker-model-run',
        'docker-model-ls',
        'docker-model-rm',
        'docker-model-inspect',
        'docker-model-push',
        'docker-model-status',
        'docker-model-logs',
        'docker-model-package',
      ],
    },
    {
      id: 'inference-backends',
      title: 'Inference Backends',
      leaves: [
        'model-runner-llama-cpp',
        'model-runner-vllm-backend',
        'model-runner-vulkan-gpu',
        'model-runner-metal-acceleration',
        'model-runner-openai-responses-api',
      ],
    },
    {
      id: 'model-networking-registry',
      title: 'Networking & Registry',
      leaves: [
        'model-runner-openai-api',
        'model-runner-tcp-host-binding',
        'model-runner-registry-mirrors',
        'model-runner-huggingface-gguf',
        'model-runner-private-models',
      ],
    },
    {
      id: 'model-compose-integration',
      title: 'Compose Integration',
      leaves: [
        'compose-models-top-level',
        'compose-service-models-ref',
        'compose-models-pull-policy',
        'model-runner-compose-integration',
      ],
    },
    {
      id: 'model-operations',
      title: 'Operations & Security',
      leaves: [
        'model-runner-gpu-support',
        'model-runner-quantization',
        'model-runner-resource-management',
        'model-runner-offload-handoff',
        'model-runner-security-hardening',
      ],
    },
  ],
  'docker-ai-gordon': [
    {
      id: 'gordon-core',
      title: 'Gordon & Docker Agent',
      leaves: [
        'gordon-overview',
        'gordon-cli',
        'gordon-desktop-integration',
        'gordon-tools',
        'gordon-embedded-desktop-launch',
      ],
    },
    {
      id: 'gordon-agent-runtime',
      title: 'Agent Runtime',
      leaves: [
        'gordon-approval-gates',
        'gordon-persistent-local-memory',
        'gordon-context-sources',
        'gordon-diagnose-from-logs',
        'gordon-stack-integration',
      ],
    },
    {
      id: 'mcp-toolkit',
      title: 'MCP Toolkit & Catalog',
      leaves: [
        'docker-mcp-toolkit',
        'docker-mcp-catalog',
        'docker-mcp-gateway',
        'docker-mcp-server-builders',
        'gordon-mcp-profile-templates',
      ],
    },
    {
      id: 'gordon-integration',
      title: 'Product Integration',
      leaves: [
        'gordon-compose-integration',
        'gordon-scout-integration',
        'gordon-offload-integration',
        'gordon-privacy-data',
      ],
    },
  ],
  'image-caching': [
    {
      id: 'local-cache-behavior',
      title: 'Local Cache Behavior',
      leaves: [
        'local-image-cache',
        'image-store-on-disk',
        'pull-layer-deduplication',
        'cache-hit-miss-patterns',
      ],
    },
    {
      id: 'cache-maintenance',
      title: 'Cache Maintenance',
      leaves: [
        'pruning-cache',
        'cache-invalidation-triggers',
        'cache-size-monitoring',
        'cache-troubleshooting',
      ],
    },
    {
      id: 'cache-strategy',
      title: 'Cache Strategy',
      leaves: [
        'registry-cache-backends',
        'build-cache-vs-image-cache',
        'multi-stage-cache-reuse',
        'cache-performance-tuning',
      ],
    },
  ],
  'compose-overview': [
    {
      id: 'compose-evolution',
      title: 'Compose Evolution',
      leaves: [
        'compose-v1-vs-v2',
        'compose-plugin-docker-compose',
        'compose-specification',
        'compose-spec-versioning',
      ],
    },
    {
      id: 'compose-positioning',
      title: 'Compose Positioning',
      leaves: [
        'compose-vs-swarm-vs-kubernetes',
        'compose-dev-vs-prod',
        'compose-single-host-limits',
        'when-to-use-compose',
      ],
    },
    {
      id: 'compose-tooling',
      title: 'Compose Tooling',
      leaves: [
        'compose-cli-plugins',
        'compose-desktop-integration',
        'compose-vscode-integration',
        'compose-project-layout',
      ],
    },
  ],
  'compose-include': [
    {
      id: 'include-syntax',
      title: 'Include Syntax',
      leaves: [
        'include-path',
        'include-project-directory',
        'include-env-file',
        'include-relative-paths',
      ],
    },
    {
      id: 'include-patterns',
      title: 'Include Patterns',
      leaves: [
        'include-modular-stacks',
        'include-shared-infra',
        'include-env-overlays',
        'include-troubleshooting',
      ],
    },
  ],
  'compose-extends': [
    {
      id: 'extends-syntax',
      title: 'Extends Syntax',
      leaves: [
        'extends-service-definition',
        'extends-file-reference',
        'extends-service-reference',
        'extends-env-interpolation',
      ],
    },
    {
      id: 'extends-patterns',
      title: 'Extends Patterns',
      leaves: [
        'extends-base-service-templates',
        'extends-multi-environment',
        'extends-vs-yaml-anchors',
        'extends-migration-include',
      ],
    },
  ],
  'compose-override-files': [
    {
      id: 'override-mechanics',
      title: 'Override Mechanics',
      leaves: [
        'compose-override-yaml',
        'override-precedence-rules',
        'multiple-compose-files',
        'override-env-files',
      ],
    },
    {
      id: 'override-patterns',
      title: 'Override Patterns',
      leaves: [
        'dev-prod-override-split',
        'local-override-gitignore',
        'override-debug-profiles',
        'override-ci-validation',
      ],
    },
  ],
  'lifecycle-hooks': [
    {
      id: 'hook-syntax',
      title: 'Hook Syntax',
      leaves: [
        'post-start-hook',
        'pre-stop-hook',
        'hook-command-format',
        'hook-environment',
      ],
    },
    {
      id: 'hook-patterns',
      title: 'Hook Patterns',
      leaves: [
        'hook-migration-scripts',
        'hook-graceful-shutdown',
        'hook-health-wait',
        'hook-troubleshooting',
      ],
    },
  ],
  'user-defined-networks': [
    {
      id: 'network-design',
      title: 'Network Design',
      leaves: [
        'default-bridge-vs-user-defined',
        'network-aliases-network-alias',
        'multiple-network-attachment',
        'internal-networks-internal',
      ],
    },
    {
      id: 'network-operations',
      title: 'Network Operations',
      leaves: [
        'network-create-custom-subnet',
        'network-connect-disconnect',
        'network-inspect-debugging',
        'network-cleanup-prune',
      ],
    },
    {
      id: 'network-patterns',
      title: 'Network Patterns',
      leaves: [
        'frontend-backend-networks',
        'service-mesh-lite-compose',
        'network-isolation-secrets',
        'ipv6-user-defined-networks',
      ],
    },
  ],
  'volume-types': [
    {
      id: 'volume-kinds',
      title: 'Volume Kinds',
      leaves: [
        'named-volumes',
        'anonymous-volumes',
        'bind-mounts',
        'tmpfs-mounts',
      ],
    },
    {
      id: 'volume-behavior',
      title: 'Volume Behavior',
      leaves: [
        'volume-populate-init',
        'volume-permissions-uid-gid',
        'volume-propagation-bind',
        'volume-readonly-mounts',
      ],
    },
    {
      id: 'volume-selection',
      title: 'Volume Selection',
      leaves: [
        'when-named-vs-bind',
        'volume-driver-selection',
        'volume-performance-characteristics',
        'volume-security-considerations',
      ],
    },
  ],
  'volume-backup-migration': [
    {
      id: 'backup-methods',
      title: 'Backup Methods',
      leaves: [
        'volume-backup-tar',
        'volume-backup-sidecar',
        'volume-snapshot-backup',
        'volume-backup-automation',
      ],
    },
    {
      id: 'migration-workflows',
      title: 'Migration Workflows',
      leaves: [
        'volume-migrate-hosts',
        'volume-restore-procedures',
        'volume-data-validation',
        'volume-migration-downtime',
      ],
    },
  ],
  'pull-through-cache': [
    {
      id: 'cache-configuration',
      title: 'Cache Configuration',
      leaves: [
        'configuring-proxy-remoteurl',
        'auth-with-pull-through-cache',
        'tls-for-pull-through-cache',
        'cache-storage-limits',
      ],
    },
    {
      id: 'cache-operations',
      title: 'Cache Operations',
      leaves: [
        'cache-mirror-failover',
        'cache-invalidation-upstream',
        'cache-monitoring-metrics',
        'cache-troubleshooting',
      ],
    },
  ],
  'registry-mirrors': [
    {
      id: 'mirror-configuration',
      title: 'Mirror Configuration',
      leaves: [
        'daemon-registry-mirrors',
        'mirror-vs-pull-through',
        'insecure-mirror-registries',
        'mirror-failover-behavior',
      ],
    },
    {
      id: 'mirror-operations',
      title: 'Mirror Operations',
      leaves: [
        'air-gapped-mirror-setup',
        'mirror-bandwidth-planning',
        'mirror-compliance-audit',
        'mirror-troubleshooting',
      ],
    },
  ],
  'node-labels-constraints': [
    {
      id: 'label-management',
      title: 'Label Management',
      leaves: [
        'node-labels',
        'engine-labels',
        'label-convention-patterns',
        'label-automation',
      ],
    },
    {
      id: 'constraint-syntax',
      title: 'Constraint Syntax',
      leaves: [
        'constraint-syntax-node-labels',
        'constraint-node-role-id',
        'placement-preferences-constraints',
        'constraint-debugging',
      ],
    },
  ],
  'swarm-vs-kubernetes': [
    {
      id: 'capability-comparison',
      title: 'Capability Comparison',
      leaves: [
        'feature-comparison',
        'scheduling-scaling-comparison',
        'networking-storage-comparison',
        'ecosystem-integration-comparison',
      ],
    },
    {
      id: 'decision-framework',
      title: 'Decision Framework',
      leaves: [
        'when-to-choose-which',
        'operational-complexity',
        'migration-swarm-to-k8s',
        'hybrid-swarm-k8s-patterns',
      ],
    },
  ],
  'docker-desktop-kubernetes': [
    {
      id: 'desktop-k8s-setup',
      title: 'Desktop Kubernetes Setup',
      leaves: [
        'desktop-k8s-enable',
        'desktop-k8s-version-selection',
        'desktop-k8s-resource-allocation',
        'desktop-k8s-reset',
      ],
    },
    {
      id: 'desktop-k8s-workflows',
      title: 'Desktop Kubernetes Workflows',
      leaves: [
        'desktop-k8s-kubectl-context',
        'desktop-k8s-compose-bridge',
        'desktop-k8s-local-development',
        'desktop-k8s-troubleshooting',
      ],
    },
  ],
  'docker-init': [
    {
      id: 'init-scaffolding',
      title: 'Init Scaffolding',
      leaves: [
        'generated-files-dockerfile-compose',
        'language-templates',
        'updating-existing-projects',
        'init-non-interactive',
      ],
    },
    {
      id: 'init-templates',
      title: 'Language Templates',
      leaves: [
        'init-node-template',
        'init-python-template',
        'init-go-template',
        'init-java-template',
      ],
    },
    {
      id: 'init-workflows',
      title: 'Init Workflows',
      leaves: [
        'init-compose-generation',
        'init-dockerignore-generation',
        'init-ci-starter-files',
        'init-customization-patterns',
      ],
    },
  ],
  'certifications-career': [
    {
      id: 'docker-certifications',
      title: 'Docker Certifications',
      leaves: [
        'dca-exam-overview',
        'dcp-exam-overview',
        'certification-study-path',
        'hands-on-lab-practice',
      ],
    },
    {
      id: 'career-development',
      title: 'Career Development',
      leaves: [
        'docker-portfolio-projects',
        'open-source-contributions',
        'community-engagement',
        'interview-preparation',
      ],
    },
  ],
  'desktop-extensions': [
    {
      id: 'extensions-marketplace',
      title: 'Extensions Marketplace',
      leaves: [
        'extensions-marketplace-browse',
        'extensions-install-manage',
        'extensions-permissions-model',
        'extensions-popular-tools',
      ],
    },
    {
      id: 'extensions-development',
      title: 'Building Extensions',
      leaves: [
        'extensions-sdk-overview',
        'extensions-ui-components',
        'extensions-publish-share',
        'extensions-security-review',
      ],
    },
  ],
  'resource-saver': [
    {
      id: 'resource-saver-config',
      title: 'Resource Saver Configuration',
      leaves: [
        'resource-saver-enable',
        'resource-saver-timeout',
        'resource-saver-wakeup',
        'resource-saver-settings',
      ],
    },
    {
      id: 'resource-saver-impact',
      title: 'Resource Saver Impact',
      leaves: [
        'resource-saver-cpu-memory',
        'resource-saver-container-behavior',
        'resource-saver-troubleshooting',
        'resource-saver-vs-quit',
      ],
    },
  ],
  'compose-watch-dev': [
    {
      id: 'watch-dev-workflows',
      title: 'Watch Dev Workflows',
      leaves: [
        'watch-local-development-loop',
        'watch-hot-reload-patterns',
        'watch-debug-rebuild',
        'watch-multi-service-dev',
      ],
    },
    {
      id: 'watch-dev-integration',
      title: 'Watch Dev Integration',
      leaves: [
        'watch-vscode-integration',
        'watch-test-driven-dev',
        'watch-compose-profiles-dev',
        'watch-troubleshooting-dev',
      ],
    },
  ],
  'production-parity': [
    {
      id: 'parity-principles',
      title: 'Parity Principles',
      leaves: [
        'twelve-factor-containers',
        'env-driven-configuration',
        'stdout-logging-conventions',
        'stateless-process-design',
      ],
    },
    {
      id: 'parity-patterns',
      title: 'Parity Patterns',
      leaves: [
        'dev-prod-image-parity',
        'compose-prod-simulation',
        'config-parity-secrets',
        'parity-testing-strategies',
      ],
    },
  ],
  'multi-platform-ci-builds': [
    {
      id: 'ci-multi-arch-setup',
      title: 'CI Multi-Arch Setup',
      leaves: [
        'ci-qemu-binfmt',
        'ci-buildx-multi-platform',
        'ci-matrix-arch-builds',
        'ci-native-arm-runners',
      ],
    },
    {
      id: 'ci-multi-arch-operations',
      title: 'CI Multi-Arch Operations',
      leaves: [
        'ci-manifest-list-push',
        'ci-cross-compile-buildkit',
        'ci-multi-arch-testing',
        'ci-multi-arch-troubleshooting',
      ],
    },
  ],
  'events': [
    {
      id: 'event-stream',
      title: 'Event Stream',
      leaves: [
        'docker-events-stream',
        'events-filter-types',
        'events-since-until',
        'events-format-output',
      ],
    },
    {
      id: 'event-integration',
      title: 'Event Integration',
      leaves: [
        'events-automation-hooks',
        'events-monitoring-pipelines',
        'events-swarm-service-events',
        'events-troubleshooting',
      ],
    },
  ],
  'alerting': [
    {
      id: 'alert-design',
      title: 'Alert Design',
      leaves: [
        'container-health-alerts',
        'resource-threshold-alerts',
        'daemon-health-alerts',
        'alert-noise-reduction',
      ],
    },
    {
      id: 'alert-integration',
      title: 'Alert Integration',
      leaves: [
        'prometheus-alertmanager',
        'pagerduty-integration',
        'slack-alert-routing',
        'alert-runbook-linking',
      ],
    },
  ],
  'dns-troubleshooting': [
    {
      id: 'dns-diagnosis',
      title: 'DNS Diagnosis',
      leaves: [
        'embedded-dns-debugging',
        'dns-options-troubleshooting',
        'hosts-file-conflicts',
        'dns-resolution-tools',
      ],
    },
    {
      id: 'dns-patterns',
      title: 'DNS Resolution Patterns',
      leaves: [
        'custom-dns-servers',
        'service-discovery-failures',
        'compose-dns-issues',
        'swarm-dns-troubleshooting',
      ],
    },
  ],
  'dev-environments': [
    {
      id: 'dev-env-fundamentals',
      title: 'Dev Environment Fundamentals',
      leaves: [
        'dev-env-create-share',
        'dev-env-git-integration',
        'dev-env-vscode-integration',
        'dev-env-jetbrains-integration',
      ],
    },
    {
      id: 'dev-env-operations',
      title: 'Dev Environment Operations',
      leaves: [
        'dev-env-lifecycle',
        'dev-env-collaboration',
        'dev-env-vs-devcontainers',
        'dev-env-migration',
      ],
    },
  ],
  'docker-debug': [
    {
      id: 'debug-cli',
      title: 'docker debug CLI',
      leaves: [
        'debug-running-containers',
        'debug-stopped-containers',
        'debug-image-filesystem',
        'debug-without-modification',
      ],
    },
    {
      id: 'debug-workflows',
      title: 'Debug Workflows',
      leaves: [
        'debug-production-incidents',
        'debug-with-gordon',
        'debug-vs-exec',
        'debug-security-considerations',
      ],
    },
  ],
}

/** Append subtopics to existing roots (merged after base rebuild). */
export const NEW_SUBTOPICS = {
  'linux-container-primitives': [
    {
      id: 'cgroup-v2-migration',
      title: 'cgroups v2 Migration',
      leaves: [
        'cgroups-v2-unified-hierarchy',
        'docker-cgroups-v2-defaults',
        'cgroup-v2-resource-delegation',
        'cgroup-v1-legacy-hosts',
      ],
    },
  ],
  'rootless-docker': [
    {
      id: 'rootless-storage-networking',
      title: 'Rootless Storage & Networking',
      leaves: [
        'fuse-overlayfs-rootless',
        'rootless-cgroups-v2-requirements',
        'rootless-gpu-cdi-limits',
        'rootless-production-considerations',
      ],
    },
  ],
  'image-store-backends': [
    {
      id: 'containerd-store-advanced',
      title: 'containerd Store Advanced',
      leaves: [
        'containerd-store-attestation-referrers',
        'containerd-store-multi-arch-default',
        'containerd-store-production-rollout',
        'containerd-store-troubleshooting',
      ],
    },
  ],
  'creating-containers': [
    {
      id: 'device-assignment',
      title: 'Device Assignment',
      leaves: [
        'cdi-device-injection-run',
        'device-cgroup-v2-rules',
        'gpu-device-allocation-run',
        'compose-device-requests-run',
      ],
    },
  ],
  'buildkit': [
    {
      id: 'buildkit-governance',
      title: 'BuildKit Governance',
      leaves: [
        'buildkit-entitlements-allow',
        'buildkit-network-policy',
        'buildkit-secrets-isolation',
        'buildkit-supply-chain-hooks',
      ],
    },
  ],
  'compose-watch': [
    {
      id: 'watch-patterns',
      title: 'Watch Patterns',
      leaves: [
        'develop-watch-vs-top-level',
        'watch-init-container-ordering',
        'watch-rebuild-triggers',
        'watch-sync-vs-rebuild',
      ],
    },
  ],
  'compose-profiles': [
    {
      id: 'profile-patterns',
      title: 'Profile Patterns',
      leaves: [
        'profile-dev-prod-split',
        'profile-debug-overlays',
        'profile-ci-selection',
        'profile-compose-include',
      ],
    },
  ],
  'docker-hub': [
    {
      id: 'hub-artifacts',
      title: 'Hub Artifacts & Models',
      leaves: [
        'hub-model-repositories',
        'hub-oci-artifact-repos',
        'hub-automated-builds',
        'hub-webhooks-triggers',
      ],
    },
  ],
  'private-registries': [
    {
      id: 'artifact-registries',
      title: 'OCI Artifact Registries',
      leaves: [
        'sbom-registry-storage',
        'attestation-registry-layout',
        'model-artifact-registries',
        'referrers-api-registries',
      ],
    },
  ],
  'attestations': [
    {
      id: 'attestation-enforcement',
      title: 'Attestation Enforcement',
      leaves: [
        'verify-at-pull-attestations',
        'slsa-provenance-verification',
        'in-toto-verification',
        'registry-referrer-linking',
      ],
    },
  ],
  'gpu-runtimes': [
    {
      id: 'cdi-gpu-integration',
      title: 'CDI GPU Integration',
      leaves: [
        'nvidia-container-toolkit-cdi',
        'rocm-cdi-devices',
        'cdi-compose-kubernetes',
        'gpu-mig-cdi-patterns',
      ],
    },
  ],
  'wasm-containers': [
    {
      id: 'wasm-docker-cli',
      title: 'Docker WASM CLI',
      leaves: [
        'docker-wasm-run',
        'wasm-compose-services',
        'wasm-runtime-selection',
        'wasm-vs-native-containers',
      ],
    },
  ],
  'alternate-runtimes': [
    {
      id: 'sandbox-runtimes',
      title: 'Sandbox Runtimes',
      leaves: [
        'sysbox-runtime',
        'gvisor-runsc',
        'kata-containers-runtime',
        'lrun-lightweight-runtime',
      ],
    },
  ],
  'shims': [
    {
      id: 'shim-protocol',
      title: 'Shim Protocol',
      leaves: [
        'containerd-shim-v2',
        'io-containerd-shim-api',
        'sandbox-shim-runtimes',
        'shim-debugging',
      ],
    },
  ],
  'swarm-storage': [
    {
      id: 'swarm-volume-patterns',
      title: 'Swarm Volume Patterns',
      leaves: [
        'swarm-named-volumes',
        'swarm-nfs-volumes',
        'swarm-volume-placement',
        'swarm-stateful-services',
      ],
    },
  ],
  'service-placement': [
    {
      id: 'placement-strategies',
      title: 'Placement Strategies',
      leaves: [
        'spread-binpack-placement',
        'placement-preferences',
        'placement-constraints-advanced',
        'placement-debugging',
      ],
    },
  ],
  'testcontainers': [
    {
      id: 'testcontainers-cloud',
      title: 'Testcontainers Cloud',
      leaves: [
        'testcontainers-cloud-setup',
        'testcontainers-cloud-ci',
        'testcontainers-cloud-parallelism',
        'testcontainers-cloud-cost',
      ],
    },
  ],
  'secrets-at-runtime': [
    {
      id: 'modern-secret-injection',
      title: 'Modern Secret Injection',
      leaves: [
        'docker-pass-runtime-secrets',
        'secrets-engine-compose',
        'external-secret-stores',
        'secret-rotation-patterns',
      ],
    },
  ],
  'read-only-filesystems': [
    {
      id: 'readonly-patterns',
      title: 'Read-Only Patterns',
      leaves: [
        'readonly-tmpfs-overlays',
        'writable-layer-exceptions',
        'readonly-compose-services',
        'readonly-debugging',
      ],
    },
  ],
  'procurement-sourcing': [
    {
      id: 'docker-entitlements',
      title: 'Docker Product Entitlements',
      leaves: [
        'build-cloud-procurement',
        'offload-procurement',
        'scout-business-procurement',
        'desktop-admin-procurement',
      ],
    },
  ],
  'risk-compliance-program': [
    {
      id: 'ai-agent-compliance',
      title: 'AI Agent Compliance',
      leaves: [
        'agent-governance-controls',
        'mcp-tool-audit-requirements',
        'agent-data-residency',
        'agent-incident-response',
      ],
    },
  ],
  'engineering-standards': [
    {
      id: 'supply-chain-standards',
      title: 'Container Supply Chain Standards',
      leaves: [
        'org-dockerfile-standards',
        'org-sbom-requirements',
        'org-signing-policy',
        'org-base-image-allowlist',
      ],
    },
  ],
}

/** Append leaves to existing subtopics (key = full subtopic id). */
export const LEAF_ENRICHMENTS = {
  'docker-architecture--area-3': [
    { id: 'engine-api-surface', title: 'Engine REST API Surface' },
    { id: 'docker-objects-lifecycle', title: 'Docker Object Lifecycles' },
  ],
  'docker-installation--install-operations': [
    { id: 'engine-upgrade-path', title: 'Engine Upgrade Path' },
    { id: 'package-manager-repos', title: 'Package Manager Repositories' },
  ],
  'resource-constraints--gpu-support': [
    { id: 'cdi-gpu-allocation', title: 'CDI GPU Allocation' },
    { id: 'gpu-compose-swarm', title: 'GPU in Compose & Swarm' },
  ],
  'dockerfile-best-practices--area-1': [
    { id: 'build-checks-integration', title: 'Build Checks Integration' },
    { id: 'syntax-directive-versions', title: 'Dockerfile Syntax Directives' },
  ],
  'sboms--area-1': [
    { id: 'sbom-diff-regression', title: 'SBOM Diff & Regression Detection' },
    { id: 'vex-sbom-linkage', title: 'VEX & SBOM Linkage' },
  ],
  'metrics--area-1': [
    { id: 'daemon-metrics-prometheus', title: 'Daemon Prometheus Metrics' },
    { id: 'cadvisor-container-metrics', title: 'cAdvisor Container Metrics' },
  ],
  'emerging-trends--area-1': [
    { id: 'agentic-workloads-trend', title: 'Agentic Workload Trends' },
    { id: 'microvm-sandbox-trend', title: 'MicroVM Sandbox Trends' },
  ],
  'docker-desktop-admin--area-1': [
    { id: 'admin-ai-governance-policies', title: 'AI Governance Admin Policies' },
    { id: 'admin-offload-policies', title: 'Offload Admin Policies' },
  ],
  'github-actions-docker--area-1': [
    { id: 'gha-offload-integration', title: 'GitHub Actions Offload Integration' },
    { id: 'gha-scout-enrollment', title: 'Scout Enrollment in GHA' },
  ],
}
