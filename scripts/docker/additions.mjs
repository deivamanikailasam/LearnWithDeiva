import { addTopics } from './addTopics.mjs'

addTopics([
  /* ===================================================================
   * Stage 1: Container Foundations — additions
   * =================================================================== */
  {
    id: 'idmap-mounts',
    title: 'idmap Mounts',
    summary: 'Mount-time UID/GID remapping (kernel 5.12+) used by rootless and userns workloads.',
    parentId: 'linux-container-primitives',
  },
  {
    id: 'criu-checkpoint-restore',
    title: 'CRIU (Checkpoint/Restore in Userspace)',
    summary: 'Kernel-level live container checkpoint/restore used by docker checkpoint and live migration.',
    parentId: 'linux-container-primitives',
  },
  {
    id: 'subuid-subgid-files',
    title: '/etc/subuid & /etc/subgid',
    parentId: 'linux-container-primitives',
  },

  /* ===================================================================
   * Stage 2: Docker Engine & Installation — additions
   * =================================================================== */
  {
    id: 'docker-convenience-script',
    title: 'Convenience Script (get.docker.com)',
    parentId: 'docker-installation',
    children: [
      { id: 'script-source-options', title: 'CHANNEL & VERSION Variables' },
      { id: 'script-dry-run', title: 'Dry Run (DRY_RUN=1)' },
      { id: 'script-security-considerations', title: 'Security Considerations' },
      { id: 'script-supported-distros', title: 'Supported Distributions' },
    ],
  },
  {
    id: 'package-manager-install',
    title: 'Package Manager Install',
    parentId: 'docker-installation',
    children: [
      { id: 'apt-install', title: 'apt (Debian/Ubuntu)' },
      { id: 'yum-dnf-install', title: 'yum / dnf (RHEL/Fedora)' },
      { id: 'zypper-install', title: 'zypper (openSUSE/SLES)' },
      { id: 'apk-install', title: 'apk (Alpine)' },
      { id: 'pacman-install', title: 'pacman (Arch)' },
    ],
  },
  { id: 'homebrew-cask-docker', title: 'Homebrew (cask docker)', parentId: 'docker-installation' },
  { id: 'air-gapped-install', title: 'Air-Gapped Installation', parentId: 'docker-installation' },
  { id: 'static-binaries-install', title: 'Static Binaries Install', parentId: 'docker-installation' },
  { id: 'docker-engine-api-version', title: 'Docker Engine API Versioning', parentId: 'docker-architecture' },
  { id: 'docker-objects-relations', title: 'Object Lifecycles & Relations', parentId: 'docker-architecture' },

  /* New ROOT in Stage 2: image store backends */
  {
    id: 'image-store-backends',
    title: 'Image Store Backends',
    summary: 'Classic Docker image store vs the new containerd-backed image store.',
    tag: 'docker-engine-install',
    level: 'intermediate',
    children: [
      { id: 'classic-image-store', title: 'Classic Image Store' },
      { id: 'containerd-image-store-feature', title: 'containerd Image Store' },
      { id: 'enabling-containerd-snapshotter-store', title: 'Enabling containerd Snapshotter' },
      { id: 'migrating-image-stores', title: 'Migrating Between Stores' },
      { id: 'image-store-feature-differences', title: 'Feature Differences (multi-arch, attestations)' },
      { id: 'image-store-cli-differences', title: 'CLI Behavior Differences' },
      { id: 'image-store-storage-on-disk', title: 'On-Disk Layout per Backend' },
    ],
  },

  /* Rootless networking deep-dive */
  { id: 'slirp4netns-rootless-net', title: 'slirp4netns', parentId: 'rootless-docker--rootless-networking' },
  { id: 'pasta-rootless-net', title: 'pasta', parentId: 'rootless-docker--rootless-networking' },
  { id: 'vpnkit-rootless-net', title: 'VPNKit', parentId: 'rootless-docker--rootless-networking' },
  { id: 'port-forwarding-rootless', title: 'Port Forwarding in Rootless', parentId: 'rootless-docker--rootless-networking' },
  { id: 'rootless-firewall-considerations', title: 'Firewall Considerations', parentId: 'rootless-docker--rootless-networking' },

  /* CLI configuration formatting */
  {
    id: 'docker-cli-formatting',
    title: 'CLI Output Formatting',
    parentId: 'docker-cli-configuration',
    children: [
      { id: 'format-go-templates', title: 'Go Template Format' },
      { id: 'format-json-output', title: '--format json' },
      { id: 'format-table-output', title: 'table Format' },
      { id: 'format-jq-piping', title: 'Piping to jq' },
    ],
  },
  { id: 'docker-cli-pagination', title: 'CLI Pagination Behaviour', parentId: 'docker-cli-configuration' },

  /* ===================================================================
   * Stage 3: Container Lifecycle & Runtime — additions
   * =================================================================== */
  {
    id: 'docker-checkpoint',
    title: 'docker checkpoint',
    summary: 'Experimental CRIU-backed checkpoint/restore for containers.',
    parentId: 'creating-containers',
    children: [
      { id: 'checkpoint-create-cmd', title: 'docker checkpoint create' },
      { id: 'checkpoint-ls-cmd', title: 'docker checkpoint ls' },
      { id: 'checkpoint-rm-cmd', title: 'docker checkpoint rm' },
      { id: 'restore-from-checkpoint', title: 'Restoring from a Checkpoint' },
      { id: 'checkpoint-criu-requirements', title: 'CRIU Requirements & Limitations' },
    ],
  },
  { id: 'docker-container-prune', title: 'docker container prune', parentId: 'creating-containers' },

  { id: 'cidfile-flag', title: '--cidfile', parentId: 'container-runtime-options' },
  { id: 'annotation-flag', title: '--annotation', parentId: 'container-runtime-options' },
  { id: 'pull-flag-run-policy', title: '--pull (always/missing/never)', parentId: 'container-runtime-options' },
  { id: 'group-add-flag', title: '--group-add', parentId: 'container-runtime-options' },
  { id: 'volume-driver-flag', title: '--volume-driver', parentId: 'container-runtime-options' },
  { id: 'storage-opt-flag', title: '--storage-opt', parentId: 'container-runtime-options' },
  { id: 'runtime-flag', title: '--runtime', parentId: 'container-runtime-options' },

  /* ===================================================================
   * Stage 4: Working with Images — additions
   * =================================================================== */
  { id: 'dangling-images-concept', title: 'Dangling Images Concept', parentId: 'image-anatomy' },
  { id: 'intermediate-images-concept', title: 'Intermediate Images', parentId: 'image-anatomy' },
  { id: 'image-rootfs-extraction', title: 'Extracting rootfs from an Image', parentId: 'image-anatomy' },

  {
    id: 'image-prune-with-filters',
    title: 'docker image prune Filters',
    parentId: 'image-management',
    children: [
      { id: 'image-prune-until-filter', title: '--filter until=' },
      { id: 'image-prune-label-filter', title: '--filter label=' },
      { id: 'image-prune-dangling-flag', title: '-a / dangling vs all' },
    ],
  },
  { id: 'dangling-vs-untagged-images', title: 'Dangling vs Untagged Images', parentId: 'image-management' },

  /* ===================================================================
   * Stage 5: Building Images with Dockerfiles — additions
   * =================================================================== */
  {
    id: 'dockerfile-frontend-versions',
    title: 'Dockerfile Frontend Versions',
    parentId: 'dockerfile-basics',
    children: [
      { id: 'syntax-pinning-versions', title: 'Pinning # syntax=docker/dockerfile:<version>' },
      { id: 'frontend-labs-channel', title: 'labs Channel Features' },
      { id: 'custom-frontend-images', title: 'Custom Frontend Images' },
    ],
  },
  {
    id: 'buildkit-env-variables',
    title: 'BuildKit Environment Variables',
    parentId: 'build-command',
    children: [
      { id: 'env-docker-buildkit', title: 'DOCKER_BUILDKIT' },
      { id: 'env-buildkit-inline-cache', title: 'BUILDKIT_INLINE_CACHE' },
      { id: 'env-buildkit-progress', title: 'BUILDKIT_PROGRESS' },
      { id: 'env-buildkit-no-output', title: 'BUILDKIT_NO_OUTPUT' },
      { id: 'env-buildx-builder', title: 'BUILDX_BUILDER' },
      { id: 'env-buildx-no-default-load', title: 'BUILDX_NO_DEFAULT_LOAD' },
      { id: 'env-buildx-bake-file', title: 'BUILDX_BAKE_FILE' },
      { id: 'env-buildx-experimental', title: 'BUILDX_EXPERIMENTAL' },
    ],
  },

  /* ===================================================================
   * Stage 6: BuildKit, Buildx & Build Cloud — additions
   * =================================================================== */
  {
    id: 'cache-pruning-strategies',
    title: 'Cache Pruning Strategies',
    parentId: 'build-cache',
    children: [
      { id: 'buildx-prune-cache', title: 'docker buildx prune' },
      { id: 'gc-keepstorage', title: 'gc.keepstorage' },
      { id: 'gc-policies', title: 'gc Policies in buildkitd.toml' },
    ],
  },
  { id: 'buildx-history-export-import', title: 'buildx history export/import', parentId: 'buildx' },
  { id: 'attestation-registry-layout', title: 'Attestation Registry Layout (Referrers)', parentId: 'sbom-attestations' },

  /* ===================================================================
   * Stage 7: Container Networking — additions
   * =================================================================== */
  {
    id: 'ipv6-default-engine-28',
    title: 'IPv6 by Default (Engine 28+)',
    parentId: 'docker-network-drivers--bridge-network',
  },
  {
    id: 'docker-link-deprecated',
    title: '--link (Deprecated)',
    parentId: 'network-internals',
  },
  {
    id: 'firewalld-integration',
    title: 'firewalld Integration',
    parentId: 'network-internals',
  },
  {
    id: 'nftables-recent-engine',
    title: 'nftables in Recent Engines',
    parentId: 'network-internals',
  },
  {
    id: 'docker-rootlesskit-port-driver',
    title: 'RootlessKit Port Driver',
    parentId: 'network-internals',
  },
  { id: 'embedded-dns-resolution-order', title: 'DNS Resolution Order', parentId: 'container-dns' },

  /* ===================================================================
   * Stage 8: Storage & Volumes — additions
   * =================================================================== */
  {
    id: 'virtiofs-file-sharing-mac',
    title: 'VirtioFS File Sharing (macOS)',
    parentId: 'mount-syntax--docker-desktop-file-sharing',
  },
  {
    id: 'grpc-fuse-file-sharing-mac',
    title: 'gRPC FUSE File Sharing (legacy macOS)',
    parentId: 'mount-syntax--docker-desktop-file-sharing',
  },
  {
    id: 'mutagen-sync-file-sharing',
    title: 'Mutagen Sync',
    parentId: 'mount-syntax--docker-desktop-file-sharing',
  },
  {
    id: 'wsl2-9p-file-sharing',
    title: '9P File Sharing (WSL2 / older Windows)',
    parentId: 'mount-syntax--docker-desktop-file-sharing',
  },
  {
    id: 'smb-file-sharing-windows',
    title: 'SMB File Sharing (Windows)',
    parentId: 'mount-syntax--docker-desktop-file-sharing',
  },
  {
    id: 'file-sharing-implementation-selection',
    title: 'Choosing the File Sharing Implementation',
    parentId: 'mount-syntax--docker-desktop-file-sharing',
  },

  /* ===================================================================
   * Stage 9: Docker Compose — additions
   * =================================================================== */
  {
    id: 'top-level-models',
    title: 'models (Docker Model Runner)',
    parentId: 'compose-file--top-level-elements',
  },
  {
    id: 'top-level-provider',
    title: 'provider extensibility',
    parentId: 'compose-file--top-level-elements',
  },
  {
    id: 'service-models-ref',
    title: 'service.models',
    parentId: 'service-configuration',
  },
  {
    id: 'service-provider-ref',
    title: 'service.provider',
    parentId: 'service-configuration',
  },
  {
    id: 'service-pull-policy',
    title: 'service.pull_policy',
    parentId: 'service-configuration',
  },
  {
    id: 'service-develop',
    title: 'service.develop (watch container)',
    parentId: 'service-configuration',
  },
  {
    id: 'service-credential-spec',
    title: 'service.credential_spec (Windows)',
    parentId: 'service-configuration',
  },
  {
    id: 'service-runtime-key',
    title: 'service.runtime',
    parentId: 'service-configuration',
  },
  { id: 'watch-restart-action', title: 'develop.watch — action: restart', parentId: 'compose-watch' },
  { id: 'depends-on-completed-condition', title: 'depends_on: service_completed_successfully (init pattern)', parentId: 'service-configuration--depends-on' },
  { id: 'compose-secret-driver', title: 'secret.driver / driver_opts', parentId: 'compose-file--top-level-elements' },
  { id: 'compose-config-driver', title: 'config.driver / driver_opts', parentId: 'compose-file--top-level-elements' },

  /* ===================================================================
   * Stage 10: Container Registries — additions
   * =================================================================== */
  { id: 'docker-hub-image-vulnerability-insights', title: 'Image Vulnerability Insights on Hub', parentId: 'docker-hub' },
  { id: 'docker-hub-tag-immutability-feature', title: 'Tag Immutability Feature', parentId: 'docker-hub' },
  { id: 'docker-hub-image-management-actions', title: 'Bulk Image Management Actions', parentId: 'docker-hub' },
  {
    id: 'registry-lifecycle-policies',
    title: 'Image Lifecycle & Retention Policies',
    parentId: 'private-registries',
    children: [
      { id: 'tag-retention-rules', title: 'Tag Retention Rules' },
      { id: 'age-based-cleanup', title: 'Age-Based Cleanup' },
      { id: 'untagged-cleanup', title: 'Untagged Cleanup' },
    ],
  },
  { id: 'oci-distribution-spec-v1.1', title: 'OCI Distribution Spec v1.1+ Features', parentId: 'registry-api' },

  /* ===================================================================
   * Stage 11: Image Security & Supply Chain — additions
   * =================================================================== */
  {
    id: 'vulnerability-management-workflow',
    title: 'Vulnerability Management Workflow',
    parentId: 'vulnerability-scanning',
    children: [
      { id: 'vuln-triage', title: 'Triage' },
      { id: 'vuln-prioritisation', title: 'Prioritisation (KEV, EPSS)' },
      { id: 'vuln-suppression', title: 'Suppression with VEX' },
      { id: 'vuln-fix-strategies', title: 'Fix Strategies (rebuild, base bump, patch)' },
    ],
  },
  { id: 'vex-publishing', title: 'Publishing VEX Statements', parentId: 'image-signing' },
  { id: 'keyless-vs-keybased-signing', title: 'Keyless vs Key-based Signing', parentId: 'image-signing' },
  { id: 'verify-attestation-cli', title: 'Verifying Attestations from the CLI', parentId: 'attestations' },
  { id: 'image-provenance-policies', title: 'Provenance Verification at Admission', parentId: 'attestations' },

  /* ===================================================================
   * Stage 12: Container Runtime Internals — additions
   * =================================================================== */
  {
    id: 'containerd-2-features',
    title: 'containerd v2.x Features',
    parentId: 'containerd',
    children: [
      { id: 'containerd-v2-improved-snapshotters', title: 'Improved Snapshotter APIs' },
      { id: 'containerd-v2-sandbox-api', title: 'Sandbox API' },
      { id: 'containerd-v2-image-transfer-service', title: 'Image Transfer Service' },
      { id: 'containerd-v2-streamlined-cri', title: 'Streamlined CRI' },
    ],
  },
  { id: 'nerdctl-feature-parity', title: 'nerdctl Feature Parity with docker', parentId: 'containerd' },
  {
    id: 'nvidia-ctk-cli',
    title: 'nvidia-ctk CLI',
    parentId: 'gpu-runtimes--nvidia-container-toolkit',
    children: [
      { id: 'nvidia-ctk-cdi-generate', title: 'cdi generate' },
      { id: 'nvidia-ctk-runtime-configure', title: 'runtime configure' },
      { id: 'nvidia-ctk-system-create-dev-char-symlinks', title: 'system create-dev-char-symlinks' },
    ],
  },
  { id: 'nvidia-cdi-mode', title: 'NVIDIA CDI Mode', parentId: 'gpu-runtimes--nvidia-container-toolkit' },
  { id: 'wasmedge-aot-compilation', title: 'WasmEdge AOT Compilation', parentId: 'wasm-containers' },
  { id: 'wasi-preview-2-overview', title: 'WASI Preview 2 (Component Model)', parentId: 'wasm-containers' },

  /* ===================================================================
   * Stage 13: Swarm — additions
   * =================================================================== */
  { id: 'service-templating', title: 'Service Templating (Go template substitution)', parentId: 'swarm-services' },
  { id: 'swarm-ipam-customization', title: 'IPAM Customization', parentId: 'swarm-networking' },

  /* ===================================================================
   * Stage 14: Docker Desktop & Developer Tooling — additions
   * =================================================================== */
  {
    id: 'docker-desktop-cli',
    title: 'docker desktop CLI',
    parentId: 'docker-desktop-overview',
    children: [
      { id: 'desktop-cli-start', title: 'docker desktop start' },
      { id: 'desktop-cli-stop', title: 'docker desktop stop' },
      { id: 'desktop-cli-restart', title: 'docker desktop restart' },
      { id: 'desktop-cli-status', title: 'docker desktop status' },
      { id: 'desktop-cli-version', title: 'docker desktop version' },
      { id: 'desktop-cli-disable-enable', title: 'docker desktop disable / enable feature' },
    ],
  },
  { id: 'gordon-compose-integration', title: 'Gordon ↔ Compose Integration', parentId: 'docker-ai-gordon' },

  /* New ROOT in Stage 14: Docker Model Runner */
  {
    id: 'docker-model-runner',
    title: 'Docker Model Runner',
    summary: 'Run open-weight LLMs and embeddings locally through Docker, with OpenAI-compatible APIs and Compose integration.',
    tag: 'docker-desktop',
    level: 'intermediate',
    children: [
      { id: 'model-runner-overview', title: 'Overview & Goals' },
      { id: 'model-runner-architecture', title: 'Architecture (llama.cpp, GGUF, host inference)' },
      { id: 'model-runner-enable', title: 'Enabling Model Runner' },
      { id: 'model-runner-system-requirements', title: 'System Requirements' },
      {
        id: 'docker-model-cli',
        title: 'docker model CLI',
        children: [
          { id: 'docker-model-pull', title: 'docker model pull' },
          { id: 'docker-model-run', title: 'docker model run' },
          { id: 'docker-model-ls', title: 'docker model ls' },
          { id: 'docker-model-rm', title: 'docker model rm' },
          { id: 'docker-model-inspect', title: 'docker model inspect' },
          { id: 'docker-model-tag', title: 'docker model tag' },
          { id: 'docker-model-push', title: 'docker model push' },
          { id: 'docker-model-status', title: 'docker model status' },
          { id: 'docker-model-logs', title: 'docker model logs' },
          { id: 'docker-model-package', title: 'docker model package' },
        ],
      },
      { id: 'model-runner-openai-api', title: 'OpenAI-Compatible API Endpoint' },
      {
        id: 'model-runner-compose-integration',
        title: 'Compose Integration (models:)',
        children: [
          { id: 'compose-models-top-level', title: 'Top-level models:' },
          { id: 'compose-service-models-ref', title: 'services.<name>.models' },
          { id: 'compose-models-pull-policy', title: 'models pull_policy' },
        ],
      },
      { id: 'model-runner-gpu-support', title: 'GPU Support' },
      { id: 'model-runner-cpu-fallback', title: 'CPU Fallback' },
      {
        id: 'model-runner-supported-models',
        title: 'Supported Models (catalog)',
        children: [
          { id: 'llama-models-via-runner', title: 'Llama family' },
          { id: 'qwen-models-via-runner', title: 'Qwen family' },
          { id: 'mistral-models-via-runner', title: 'Mistral / Mixtral' },
          { id: 'phi-models-via-runner', title: 'Phi family' },
          { id: 'gemma-models-via-runner', title: 'Gemma family' },
          { id: 'embedding-models-runner', title: 'Embedding Models' },
        ],
      },
      { id: 'model-runner-quantization', title: 'Quantization Levels (Q4, Q5, Q8, fp16)' },
      { id: 'model-packaging-oci', title: 'Model Packaging as OCI Artifacts' },
      { id: 'model-runner-resource-management', title: 'Resource Management' },
      { id: 'model-runner-vs-ollama', title: 'Model Runner vs Ollama vs llama.cpp' },
      { id: 'model-runner-gordon-usage', title: 'Model Runner Used by Gordon' },
      { id: 'model-runner-security', title: 'Security & Network Exposure' },
    ],
  },

  /* New ROOT in Stage 14: Docker Offload (preview workload offload service) */
  {
    id: 'docker-offload',
    title: 'Docker Offload',
    summary: 'Offloading container workloads from local Desktop to managed cloud capacity.',
    tag: 'docker-desktop',
    level: 'advanced',
    children: [
      { id: 'offload-overview', title: 'Overview' },
      { id: 'offload-enable', title: 'Enabling Offload' },
      { id: 'offload-target-selection', title: 'Choosing Local vs Cloud Targets' },
      { id: 'offload-billing-quotas', title: 'Billing & Quotas' },
      { id: 'offload-security-data', title: 'Security & Data Boundaries' },
    ],
  },

  /* ===================================================================
   * Stage 15: Developer Workflows & Testing — additions
   * =================================================================== */
  {
    id: 'cloud-native-buildpacks',
    title: 'Cloud Native Buildpacks (CNB)',
    parentId: 'local-dev-with-docker',
    children: [
      { id: 'pack-cli', title: 'pack CLI' },
      { id: 'cnb-builders', title: 'Builders & Stacks' },
      { id: 'cnb-lifecycle', title: 'Lifecycle (detect, build, export)' },
      { id: 'cnb-vs-dockerfile', title: 'Buildpacks vs Dockerfile' },
      { id: 'paketo-buildpacks', title: 'Paketo Buildpacks' },
      { id: 'heroku-buildpacks', title: 'Heroku Buildpacks' },
      { id: 'google-cloud-buildpacks', title: 'Google Cloud Buildpacks' },
    ],
  },
  { id: 'watchtower-tool', title: 'Watchtower (auto-updater)', parentId: 'local-dev-with-docker' },
  { id: 'docker-rollout-tool', title: 'docker-rollout (zero-downtime)', parentId: 'local-dev-with-docker' },
  { id: 'devbox-with-docker', title: 'Devbox with Docker (overview)', parentId: 'local-dev-with-docker' },

  /* ===================================================================
   * Stage 16: CI/CD with Docker — additions
   * =================================================================== */
  {
    id: 'alternative-build-tools-ci',
    title: 'Alternative Build Tools',
    parentId: 'docker-in-ci',
    children: [
      {
        id: 'dagger-build-engine',
        title: 'Dagger',
        children: [
          { id: 'dagger-sdk-overview', title: 'Dagger SDKs (Go/Python/TypeScript/Java)' },
          { id: 'dagger-modules', title: 'Dagger Modules' },
          { id: 'dagger-cli', title: 'Dagger CLI' },
          { id: 'dagger-cloud', title: 'Dagger Cloud' },
        ],
      },
      {
        id: 'earthly-build-engine',
        title: 'Earthly',
        children: [
          { id: 'earthfile-syntax', title: 'Earthfile Syntax' },
          { id: 'earthly-satellites', title: 'Earthly Satellites' },
          { id: 'earthly-vs-buildx', title: 'Earthly vs buildx' },
        ],
      },
      { id: 'buildpacks-in-ci', title: 'Cloud Native Buildpacks in CI' },
      { id: 'kaniko-vs-buildkit-ci', title: 'Kaniko vs BuildKit Trade-offs' },
      { id: 'tekton-docker-tasks', title: 'Tekton Tasks for Docker Builds (overview)' },
      { id: 'bazel-oci-rules', title: 'Bazel rules_oci' },
      { id: 'nix-docker-images', title: 'Nix dockerTools (overview)' },
    ],
  },
  {
    id: 'other-ci-platforms-docker',
    title: 'Other CI Platforms',
    parentId: 'docker-in-ci',
    children: [
      { id: 'circleci-docker-integration', title: 'CircleCI Docker Orbs' },
      { id: 'bitbucket-pipelines-docker', title: 'Bitbucket Pipelines' },
      { id: 'buildkite-docker', title: 'Buildkite' },
      { id: 'drone-woodpecker-docker', title: 'Drone CI / Woodpecker' },
      { id: 'codefresh-docker', title: 'Codefresh' },
      { id: 'azure-pipelines-docker', title: 'Azure Pipelines' },
      { id: 'aws-codecatalyst-docker', title: 'AWS CodeCatalyst' },
      { id: 'concourse-docker', title: 'Concourse' },
      { id: 'teamcity-docker', title: 'JetBrains TeamCity' },
    ],
  },
  { id: 'oidc-cloud-auth-ci', title: 'OIDC Cloud Auth for Registries', parentId: 'github-actions-docker' },

  /* ===================================================================
   * Stage 17: Observability & Operations — additions
   * =================================================================== */
  { id: 'log-aggregator-fluent-bit', title: 'Fluent Bit Collector', parentId: 'log-drivers' },
  { id: 'log-aggregator-vector', title: 'Vector Collector', parentId: 'log-drivers' },
  { id: 'log-aggregator-promtail-loki', title: 'Promtail + Loki Pipeline', parentId: 'log-drivers' },
  { id: 'log-aggregator-filebeat', title: 'Filebeat / Elastic Agent', parentId: 'log-drivers' },
  { id: 'otel-collector-containers-metrics', title: 'OpenTelemetry Collector for Containers', parentId: 'metrics' },
  { id: 'prometheus-cadvisor-exporter', title: 'Prometheus cAdvisor Exporter', parentId: 'metrics' },
  { id: 'pushgateway-metrics', title: 'Prometheus Pushgateway (short jobs)', parentId: 'metrics' },

  /* New ROOT in Stage 17: tracing */
  {
    id: 'tracing-and-distributed-observability',
    title: 'Tracing & Distributed Observability',
    summary: 'OpenTelemetry tracing for containerized workloads and choosing a trace backend.',
    tag: 'observability',
    level: 'advanced',
    children: [
      { id: 'tracing-overview-containers', title: 'Tracing Overview for Containers' },
      { id: 'otel-instrumentation-containers', title: 'OTel Instrumentation' },
      { id: 'otel-collector-for-traces', title: 'OTel Collector for Traces' },
      { id: 'context-propagation-containers', title: 'Context Propagation' },
      {
        id: 'trace-backends',
        title: 'Trace Backends',
        children: [
          { id: 'jaeger-traces-containers', title: 'Jaeger' },
          { id: 'tempo-traces-containers', title: 'Grafana Tempo' },
          { id: 'zipkin-traces-containers', title: 'Zipkin' },
          { id: 'opentelemetry-protocol-only', title: 'OTLP-Native Backends' },
        ],
      },
      { id: 'tracing-sampling-strategies', title: 'Sampling Strategies' },
      { id: 'trace-log-correlation', title: 'Trace ↔ Log Correlation' },
    ],
  },

  /* ===================================================================
   * Stage 18: Performance & Production Deployment — additions
   * =================================================================== */
  {
    id: 'hashicorp-nomad-deployment',
    title: 'HashiCorp Nomad (Docker driver)',
    parentId: 'production-deployment-patterns',
    children: [
      { id: 'nomad-docker-driver', title: 'Docker Task Driver' },
      { id: 'nomad-volumes-csi', title: 'Volumes & CSI' },
      { id: 'nomad-networking-cni', title: 'Networking & CNI' },
      { id: 'nomad-vs-swarm-vs-k8s', title: 'Nomad vs Swarm vs Kubernetes' },
    ],
  },
  { id: 'docker-with-systemd-podman-quadlets-compare', title: 'systemd Quadlet Comparison (overview)', parentId: 'production-deployment-patterns' },

  /* ===================================================================
   * Stage 19: Security Hardening & Compliance — additions
   * =================================================================== */
  { id: 'opa-conftest-image-policies', title: 'OPA / Conftest for Image Policies', parentId: 'benchmarks-standards' },
  { id: 'ebpf-runtime-security', title: 'eBPF-based Runtime Security (overview)', parentId: 'runtime-security' },
  { id: 'external-secret-csi-integration', title: 'External Secrets via CSI (overview)', parentId: 'secrets-at-runtime' },
  { id: 'docker-engine-fips-mode', title: 'FIPS Mode in Docker Engine', parentId: 'benchmarks-standards' },

  /* ===================================================================
   * Stage 20: Administration & Troubleshooting — additions
   * =================================================================== */
  { id: 'daemon-default-shm-size', title: 'default-shm-size', parentId: 'daemon-configuration' },
  { id: 'daemon-cgroup-parent', title: 'cgroup-parent', parentId: 'daemon-configuration' },
  { id: 'daemon-selinux-enabled', title: 'selinux-enabled', parentId: 'daemon-configuration' },
  { id: 'daemon-api-cors-header', title: 'api-cors-header', parentId: 'daemon-configuration' },
  { id: 'daemon-default-ulimits', title: 'default-ulimits', parentId: 'daemon-configuration' },
  { id: 'daemon-default-runtime-args', title: 'default-runtime-args', parentId: 'daemon-configuration' },
  { id: 'daemon-max-concurrent-downloads', title: 'max-concurrent-downloads / uploads', parentId: 'daemon-configuration' },
  { id: 'daemon-shutdown-timeout', title: 'shutdown-timeout', parentId: 'daemon-configuration' },
  { id: 'daemon-default-network-opts', title: 'default-network-opts', parentId: 'daemon-configuration' },

  {
    id: 'tui-tools-troubleshooting',
    title: 'TUI Tools for Containers',
    parentId: 'troubleshooting-tools',
    children: [
      { id: 'dive-image-explorer', title: 'dive (image layer explorer)' },
      { id: 'ctop-tui-monitor', title: 'ctop' },
      { id: 'lazydocker-tui', title: 'lazydocker' },
      { id: 'docui-tui', title: 'docui' },
      { id: 'gotty-share-terminals', title: 'gotty (share terminal sessions)' },
    ],
  },
  { id: 'docker-trace-tool', title: 'docker trace (experimental)', parentId: 'troubleshooting-tools' },
  { id: 'cgroup-v1-to-v2-migration', title: 'cgroup v1 → v2 Migration', parentId: 'upgrades-maintenance' },

  /* ===================================================================
   * Stage 21: Ecosystem, Frontier & Career — additions
   * =================================================================== */
  {
    id: 'modern-build-orchestrators',
    title: 'Modern Build Orchestrators',
    parentId: 'docker-alternatives',
    children: [
      { id: 'dagger-alt', title: 'Dagger' },
      { id: 'earthly-alt', title: 'Earthly' },
      { id: 'bazel-rules-oci-alt', title: 'Bazel rules_oci' },
      { id: 'nix-docker-tools-alt', title: 'Nix dockerTools' },
    ],
  },
  {
    id: 'image-build-source-tools',
    title: 'Source-to-Image Tools',
    parentId: 'docker-alternatives',
    children: [
      { id: 'pack-cli-cnb-alt', title: 'pack CLI (Buildpacks)' },
      { id: 's2i-source-to-image-alt', title: 's2i (OpenShift Source-to-Image)' },
      { id: 'jib-google-alt', title: 'Jib (Java)' },
      { id: 'ko-go-alt', title: 'ko (Go)' },
    ],
  },
  { id: 'watchtower-ecosystem-alt', title: 'Watchtower (auto-updater)', parentId: 'docker-alternatives' },
  { id: 'docker-model-runner-trend', title: 'Docker Model Runner Trend', parentId: 'emerging-trends' },
  { id: 'agentic-containers-trend', title: 'Agentic Containers & MCP Servers', parentId: 'emerging-trends' },
  { id: 'wasi-component-model-trend', title: 'WASI Component Model & WASI Preview 2', parentId: 'emerging-trends' },
  { id: 'distroless-evolution-trend', title: 'Distroless / Chiseled / Wolfi Evolution', parentId: 'emerging-trends' },
  { id: 'docker-offload-trend', title: 'Docker Offload & Cloud Build Trend', parentId: 'emerging-trends' },
  { id: 'sustainability-greenops-trend', title: 'Sustainability & GreenOps for Containers', parentId: 'emerging-trends' },
])
