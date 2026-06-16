import { addTopics } from './addTopics.mjs'

// Stage 5 — Configuration & Secrets
addTopics([
  /* ---------- configmaps ---------- */
  {
    id: 'configmap-basics',
    title: 'ConfigMap Basics',
    parentId: 'configmaps',
    children: [
      { id: 'configmap-purpose', title: 'ConfigMap Purpose' },
      { id: 'configmap-data-binarydata', title: 'data vs binaryData' },
      { id: 'configmap-creation-from-literal', title: 'Creation from Literal' },
      { id: 'configmap-creation-from-file', title: 'Creation from File' },
      { id: 'configmap-creation-from-env-file', title: 'Creation from env File' },
      { id: 'configmap-creation-from-yaml', title: 'Creation from YAML' },
      { id: 'configmap-size-limits', title: 'ConfigMap Size Limits (~1 MiB)' },
    ],
  },
  {
    id: 'configmap-consumption',
    title: 'ConfigMap Consumption',
    parentId: 'configmaps',
    children: [
      { id: 'configmap-as-env-vars', title: 'ConfigMap as Environment Variables' },
      { id: 'configmap-as-volume', title: 'ConfigMap as Volume' },
      { id: 'configmap-subpath', title: 'subPath Mounts' },
      { id: 'configmap-defaultmode', title: 'defaultMode & file Permissions' },
      { id: 'configmap-items', title: 'items Selectors' },
      { id: 'configmap-as-cli-args', title: 'ConfigMap Values as CLI Args' },
    ],
  },
  {
    id: 'configmap-immutability',
    title: 'ConfigMap Immutability',
    parentId: 'configmaps',
    children: [
      { id: 'immutable-configmaps', title: 'Immutable ConfigMaps' },
      { id: 'immutability-performance-benefits', title: 'Performance Benefits of Immutability' },
    ],
  },
  {
    id: 'configmap-updates-and-reloads',
    title: 'ConfigMap Updates & Reloads',
    parentId: 'configmaps',
    children: [
      { id: 'mounted-configmap-auto-update', title: 'Mounted ConfigMap Auto-Update' },
      { id: 'env-vars-no-auto-update', title: 'Env Vars Do Not Auto-Update' },
      { id: 'rolling-update-on-configmap-change', title: 'Rolling Update on ConfigMap Change' },
      { id: 'reloader-and-stakater', title: 'Reloader & Stakater Patterns' },
      { id: 'configmap-checksum-annotation', title: 'ConfigMap Checksum Annotation' },
    ],
  },
  {
    id: 'configmap-best-practices',
    title: 'ConfigMap Best Practices',
    parentId: 'configmaps',
    children: [
      { id: 'keeping-configmaps-small', title: 'Keeping ConfigMaps Small' },
      { id: 'separating-config-from-image', title: 'Separating Config from Image' },
      { id: 'environment-specific-configmaps', title: 'Environment-Specific ConfigMaps' },
      { id: 'configmap-naming-conventions', title: 'Naming Conventions' },
    ],
  },

  /* ---------- secrets ---------- */
  {
    id: 'secret-basics',
    title: 'Secret Basics',
    parentId: 'secrets',
    children: [
      { id: 'secret-purpose', title: 'Secret Purpose' },
      { id: 'secret-data-vs-stringdata', title: 'data vs stringData' },
      { id: 'secret-base64-not-encryption', title: 'Base64 Encoding ≠ Encryption' },
      { id: 'secret-creation-methods', title: 'Secret Creation Methods' },
      { id: 'secret-size-limits', title: 'Secret Size Limits' },
    ],
  },
  {
    id: 'secret-types',
    title: 'Secret Types',
    parentId: 'secrets',
    children: [
      { id: 'opaque-secret', title: 'Opaque Secret' },
      { id: 'service-account-token-secret', title: 'kubernetes.io/service-account-token' },
      { id: 'dockerconfigjson-secret', title: 'kubernetes.io/dockerconfigjson' },
      { id: 'dockercfg-secret', title: 'kubernetes.io/dockercfg' },
      { id: 'basic-auth-secret', title: 'kubernetes.io/basic-auth' },
      { id: 'ssh-auth-secret', title: 'kubernetes.io/ssh-auth' },
      { id: 'tls-secret', title: 'kubernetes.io/tls' },
      { id: 'bootstrap-token-secret', title: 'bootstrap.kubernetes.io/token' },
    ],
  },
  {
    id: 'secret-consumption',
    title: 'Secret Consumption',
    parentId: 'secrets',
    children: [
      { id: 'secret-as-env-vars', title: 'Secret as Environment Variables' },
      { id: 'secret-as-volume', title: 'Secret as Volume' },
      { id: 'secret-as-imagepullsecret', title: 'Secret as imagePullSecret' },
      { id: 'projected-secret-volumes', title: 'Projected Secret Volumes' },
    ],
  },
  {
    id: 'secret-immutability',
    title: 'Secret Immutability',
    parentId: 'secrets',
    children: [
      { id: 'immutable-secrets', title: 'Immutable Secrets' },
      { id: 'rotation-with-immutable-secrets', title: 'Rotating Immutable Secrets' },
    ],
  },
  {
    id: 'encryption-at-rest',
    title: 'Encryption at Rest',
    parentId: 'secrets',
    children: [
      { id: 'encryption-config-file', title: 'EncryptionConfiguration File' },
      { id: 'identity-aescbc-aesgcm-secretbox', title: 'identity / aescbc / aesgcm / secretbox Providers' },
      { id: 'kms-provider-v1', title: 'kms Provider v1' },
      { id: 'kms-provider-v2', title: 'kms Provider v2 (GA v1.29)' },
      { id: 'rotating-encryption-keys', title: 'Rotating Encryption Keys' },
    ],
  },
  {
    id: 'external-secret-backends-k8s',
    title: 'External Secret Backends (K8s Integration)',
    summary: 'How external stores plug into Kubernetes via CSI, operators and webhooks (deep dives live in the DevOps subject).',
    parentId: 'secrets',
    children: [
      { id: 'secrets-store-csi-driver', title: 'Secrets Store CSI Driver' },
      { id: 'external-secrets-operator', title: 'External Secrets Operator (K8s Integration)' },
      { id: 'vault-csi-driver', title: 'Vault CSI Driver' },
      { id: 'vault-agent-injector', title: 'Vault Agent Sidecar Injector' },
      { id: 'sealed-secrets-controller', title: 'Sealed Secrets Controller' },
      { id: 'sops-and-helm-secrets', title: 'SOPS & helm-secrets (K8s Workflow)' },
      { id: 'cloud-provider-secret-stores', title: 'Cloud-Provider Secret Stores via CSI' },
    ],
  },
  {
    id: 'secret-rotation',
    title: 'Secret Rotation',
    parentId: 'secrets',
    children: [
      { id: 'manual-rotation', title: 'Manual Rotation' },
      { id: 'controller-driven-rotation', title: 'Controller-Driven Rotation' },
      { id: 'serviceaccount-token-rotation', title: 'ServiceAccount Token Rotation' },
      { id: 'reload-on-rotation-patterns', title: 'Reload-on-Rotation Patterns' },
    ],
  },
  {
    id: 'secrets-best-practices',
    title: 'Secrets Best Practices',
    parentId: 'secrets',
    children: [
      { id: 'avoid-secrets-in-checked-in-yaml', title: 'Avoid Secrets in Checked-In YAML' },
      { id: 'secrets-vs-configmaps', title: 'Secrets vs ConfigMaps' },
      { id: 'rbac-for-secrets', title: 'RBAC for Secrets' },
      { id: 'audit-logging-for-secrets', title: 'Audit Logging for Secret Access' },
      { id: 'least-privilege-secret-access', title: 'Least-Privilege Secret Access' },
    ],
  },

  /* ---------- environment-and-configuration ---------- */
  {
    id: 'env-vars-in-pods',
    title: 'Environment Variables in Pods',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'direct-env-values', title: 'Direct env Values' },
      { id: 'configmap-keyref', title: 'configMapKeyRef' },
      { id: 'secret-keyref', title: 'secretKeyRef' },
      { id: 'fieldref-pod-fields', title: 'fieldRef (Pod Fields)' },
      { id: 'resourcefieldref', title: 'resourceFieldRef' },
      { id: 'dependent-env-values', title: 'Dependent env Values ($(VAR))' },
      { id: 'env-precedence-rules', title: 'env Precedence Rules' },
    ],
  },
  {
    id: 'envfrom',
    title: 'envFrom',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'envfrom-from-configmap', title: 'envFrom from ConfigMap' },
      { id: 'envfrom-from-secret', title: 'envFrom from Secret' },
      { id: 'envfrom-prefix', title: 'envFrom prefix' },
      { id: 'envfrom-optional', title: 'envFrom optional Flag' },
    ],
  },
  {
    id: 'downward-api',
    title: 'Downward API',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'downward-api-overview', title: 'Downward API Overview' },
      { id: 'downward-api-env-vars', title: 'Downward API as env Vars' },
      { id: 'downward-api-volume', title: 'Downward API as Volume' },
      { id: 'exposing-pod-ip-and-name', title: 'Exposing Pod IP & Name' },
      { id: 'exposing-resource-limits-requests', title: 'Exposing Resource Limits/Requests' },
      { id: 'exposing-labels-and-annotations', title: 'Exposing Labels & Annotations' },
    ],
  },
  {
    id: 'args-and-command',
    title: 'args & command',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'args-overriding-cmd', title: 'args Overriding CMD' },
      { id: 'command-overriding-entrypoint', title: 'command Overriding ENTRYPOINT' },
      { id: 'var-substitution-in-args', title: 'Variable Substitution in args' },
      { id: 'special-chars-and-escaping', title: 'Special Characters & Escaping' },
      { id: 'shell-vs-exec-form', title: 'Shell vs Exec Form' },
    ],
  },
  {
    id: 'projected-volumes',
    title: 'Projected Volumes',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'projected-volume-overview', title: 'Projected Volume Overview' },
      { id: 'combining-configmap-secret-downwardapi', title: 'Combining ConfigMap, Secret, DownwardAPI & ServiceAccountToken' },
      { id: 'serviceaccounttoken-projection', title: 'serviceAccountToken Projection (BoundServiceAccountToken)' },
      { id: 'projected-cluster-trust-bundle', title: 'clusterTrustBundle Projection (KEP-3257)' },
    ],
  },
  {
    id: 'file-based-config-patterns',
    title: 'File-Based Config Patterns',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'mounting-configmap-as-file', title: 'Mounting ConfigMap as File' },
      { id: 'sidecar-config-fetcher', title: 'Sidecar Config Fetcher' },
      { id: 'init-container-config-fetcher', title: 'Init Container Config Fetcher' },
      { id: 'config-templating-at-runtime', title: 'Config Templating at Runtime' },
    ],
  },
  {
    id: 'twelve-factor-on-kubernetes',
    title: 'Twelve-Factor Config on Kubernetes',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'config-from-environment', title: 'Config from Environment' },
      { id: 'separation-of-config-and-code', title: 'Separation of Config & Code' },
      { id: 'parity-across-environments', title: 'Parity Across Environments' },
    ],
  },
  {
    id: 'multi-environment-configuration',
    title: 'Multi-Environment Configuration',
    parentId: 'environment-and-configuration',
    children: [
      { id: 'per-namespace-config', title: 'Per-Namespace Config' },
      { id: 'per-cluster-config', title: 'Per-Cluster Config' },
      { id: 'kustomize-overlay-pointer', title: 'Kustomize Overlays (Pointer)' },
      { id: 'helm-values-pointer', title: 'Helm Values (Pointer)' },
      { id: 'config-promotion-across-envs', title: 'Config Promotion Across Environments' },
    ],
  },
])
