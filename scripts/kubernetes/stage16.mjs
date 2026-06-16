import { addTopics } from './addTopics.mjs'

// Stage 16 — Multi-Cluster & Hybrid
addTopics([
  /* ---------- multi-cluster-management ---------- */
  {
    id: 'multi-cluster-management-overview',
    title: 'Multi-Cluster Management Overview',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'drivers-for-multi-cluster', title: 'Drivers for Multi-Cluster' },
      { id: 'control-plane-topology-options', title: 'Control Plane Topology Options' },
      { id: 'inventory-and-cluster-registry', title: 'Inventory & Cluster Registry' },
      { id: 'hub-and-spoke-vs-mesh-of-clusters', title: 'Hub-and-Spoke vs Mesh of Clusters' },
      { id: 'tenancy-and-isolation-models', title: 'Tenancy & Isolation Models' },
    ],
  },
  {
    id: 'cluster-api-for-multi-cluster',
    title: 'Cluster API for Multi-Cluster',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'capi-as-multi-cluster-platform', title: 'CAPI as a Multi-Cluster Platform' },
      { id: 'machineset-and-machinehealthcheck', title: 'MachineSet & MachineHealthCheck (Deep)' },
      { id: 'kubeadmcontrolplane-deep', title: 'KubeadmControlPlane (Deep)' },
      { id: 'capi-lifecycle-controllers', title: 'CAPI Lifecycle Controllers' },
      { id: 'capi-ipam-providers', title: 'CAPI IPAM Providers' },
      { id: 'capi-mgmt-vs-workload-cluster', title: 'Management vs Workload Cluster' },
      { id: 'capi-upgrade-flow', title: 'CAPI Upgrade Flow' },
      { id: 'capi-vs-managed-services', title: 'CAPI vs Managed Services' },
      { id: 'capi-fleet-patterns', title: 'CAPI Fleet Patterns' },
    ],
  },
  {
    id: 'karmada',
    title: 'Karmada',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'karmada-architecture', title: 'Karmada Architecture' },
      { id: 'propagationpolicy', title: 'PropagationPolicy' },
      { id: 'clusterpropagationpolicy', title: 'ClusterPropagationPolicy' },
      { id: 'overridepolicy', title: 'OverridePolicy' },
      { id: 'karmada-scheduler', title: 'Karmada Scheduler' },
      { id: 'karmada-aggregated-api', title: 'Karmada Aggregated API' },
      { id: 'karmada-failover', title: 'Karmada Failover' },
    ],
  },
  {
    id: 'open-cluster-management',
    title: 'Open Cluster Management (OCM)',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'ocm-architecture', title: 'OCM Architecture' },
      { id: 'managed-cluster-resource', title: 'ManagedCluster Resource' },
      { id: 'clusterclaim-and-placement', title: 'ClusterClaim & Placement' },
      { id: 'manifestwork', title: 'ManifestWork' },
      { id: 'ocm-addons', title: 'OCM Addons' },
      { id: 'ocm-policy-framework', title: 'OCM Policy Framework' },
    ],
  },
  {
    id: 'rancher-fleet-on-k8s',
    title: 'Rancher Fleet on Kubernetes',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'fleet-architecture', title: 'Fleet Architecture' },
      { id: 'fleet-bundles', title: 'Fleet Bundles' },
      { id: 'fleet-gitrepo', title: 'Fleet GitRepo' },
      { id: 'fleet-targeting', title: 'Fleet Targeting' },
    ],
  },
  {
    id: 'crossplane-multi-cluster',
    title: 'Crossplane for Multi-Cluster',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'crossplane-as-control-plane', title: 'Crossplane as a Control Plane' },
      { id: 'crossplane-providers-pointer', title: 'Crossplane Providers (Pointer)' },
      { id: 'crossplane-compositions-pointer', title: 'Compositions (Pointer)' },
    ],
  },
  {
    id: 'centralized-policy-and-rbac',
    title: 'Centralized Policy & RBAC',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'centralized-rbac-strategies', title: 'Centralized RBAC Strategies' },
      { id: 'kyverno-multi-cluster-pointer', title: 'Kyverno Multi-Cluster (Pointer)' },
      { id: 'gatekeeper-multi-cluster-pointer', title: 'Gatekeeper Multi-Cluster (Pointer)' },
    ],
  },
  {
    id: 'managed-multi-cluster-services',
    title: 'Managed Multi-Cluster Services',
    parentId: 'multi-cluster-management',
    children: [
      { id: 'aks-fleet-manager-pointer', title: 'AKS Fleet Manager (Pointer)' },
      { id: 'eks-fleet-pointer', title: 'EKS Fleet (Pointer)' },
      { id: 'gke-fleet-and-config-sync-pointer', title: 'GKE Fleet & Config Sync (Pointer)' },
    ],
  },

  /* ---------- cluster-federation-fleets ---------- */
  {
    id: 'federation-history',
    title: 'Federation History',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'kubefed-v1', title: 'KubeFed v1' },
      { id: 'kubefed-v2', title: 'KubeFed v2' },
      { id: 'federation-deprecation', title: 'Federation Deprecation' },
      { id: 'lessons-from-kubefed', title: 'Lessons From KubeFed' },
    ],
  },
  {
    id: 'modern-fleet-patterns',
    title: 'Modern Fleet Patterns',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'hub-and-spoke-fleet', title: 'Hub-and-Spoke Fleet' },
      { id: 'mesh-of-clusters-fleet', title: 'Mesh of Clusters' },
      { id: 'control-plane-isolation', title: 'Control Plane Isolation' },
      { id: 'workload-distribution-strategies', title: 'Workload Distribution Strategies' },
      { id: 'active-active-vs-active-passive', title: 'Active-Active vs Active-Passive' },
      { id: 'replication-vs-sharding', title: 'Replication vs Sharding' },
    ],
  },
  {
    id: 'argocd-applicationsets',
    title: 'Argo CD ApplicationSets',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'applicationset-overview', title: 'ApplicationSet Overview' },
      { id: 'cluster-generator', title: 'Cluster Generator' },
      { id: 'list-generator', title: 'List Generator' },
      { id: 'git-generator', title: 'Git Generator' },
      { id: 'scm-generator', title: 'SCM Generator' },
      { id: 'matrix-and-merge-generators', title: 'Matrix & Merge Generators' },
      { id: 'progressive-syncs-across-fleets', title: 'Progressive Syncs Across Fleets' },
    ],
  },
  {
    id: 'flux-multi-tenant-fleets',
    title: 'Flux Multi-Tenant Fleets',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'flux-tenant-pattern', title: 'Flux Tenant Pattern' },
      { id: 'flux-d2-architecture', title: 'Flux D2 Architecture' },
      { id: 'flux-image-policies-multi-cluster', title: 'Image Policies Across Clusters' },
    ],
  },
  {
    id: 'policy-distribution-across-fleets',
    title: 'Policy Distribution Across Fleets',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'kyverno-multi-cluster-fleets', title: 'Kyverno Multi-Cluster' },
      { id: 'opa-gatekeeper-multi-cluster-fleets', title: 'OPA Gatekeeper Multi-Cluster' },
      { id: 'hierarchical-namespaces', title: 'Hierarchical Namespaces (HNC)' },
    ],
  },
  {
    id: 'cross-cluster-secrets',
    title: 'Cross-Cluster Secrets',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'external-secrets-many-clusters', title: 'External Secrets Across Many Clusters' },
      { id: 'sealed-secrets-multi-cluster', title: 'Sealed Secrets Multi-Cluster' },
      { id: 'spire-trust-domains', title: 'SPIRE Trust Domains' },
    ],
  },
  {
    id: 'fleet-observability',
    title: 'Fleet Observability',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'centralized-metrics-pointer-stage16', title: 'Centralized Metrics (Pointer)' },
      { id: 'centralized-logs-pointer-stage16', title: 'Centralized Logs (Pointer)' },
      { id: 'cluster-inventory-and-health', title: 'Cluster Inventory & Health' },
    ],
  },
  {
    id: 'multi-tenancy-on-fleets',
    title: 'Multi-Tenancy on Fleets',
    parentId: 'cluster-federation-fleets',
    children: [
      { id: 'soft-vs-hard-multi-tenancy', title: 'Soft vs Hard Multi-Tenancy' },
      { id: 'capsule-multi-tenant', title: 'Capsule' },
      { id: 'kiosk-multi-tenant', title: 'Kiosk' },
      { id: 'vcluster-tenant-pattern', title: 'vcluster Tenant Pattern' },
    ],
  },

  /* ---------- hybrid-edge-clusters ---------- */
  {
    id: 'hybrid-cloud-on-k8s-overview',
    title: 'Hybrid Cloud on Kubernetes Overview',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'on-prem-plus-cloud', title: 'On-Prem + Cloud' },
      { id: 'bursting-to-cloud', title: 'Bursting to Cloud' },
      { id: 'data-locality-considerations', title: 'Data Locality Considerations' },
      { id: 'identity-bridge-considerations', title: 'Identity Bridge Considerations' },
    ],
  },
  {
    id: 'edge-kubernetes-overview',
    title: 'Edge Kubernetes Overview',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'edge-vs-fog-vs-near-edge', title: 'Edge vs Fog vs Near-Edge' },
      { id: 'constrained-environments', title: 'Constrained Environments' },
      { id: 'intermittent-connectivity', title: 'Intermittent Connectivity' },
      { id: 'edge-vs-data-center-tradeoffs', title: 'Edge vs Data Center Trade-offs' },
    ],
  },
  {
    id: 'kubeedge',
    title: 'KubeEdge',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'kubeedge-architecture', title: 'KubeEdge Architecture' },
      { id: 'cloudcore-and-edgecore', title: 'CloudCore & EdgeCore' },
      { id: 'device-twin-model', title: 'Device Twin Model' },
      { id: 'kubeedge-edgemesh', title: 'EdgeMesh' },
      { id: 'kubeedge-event-bus', title: 'KubeEdge EventBus' },
    ],
  },
  {
    id: 'openyurt',
    title: 'OpenYurt',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'openyurt-architecture', title: 'OpenYurt Architecture' },
      { id: 'yurthub', title: 'YurtHub' },
      { id: 'nodepool-and-yurtappset', title: 'NodePool & YurtAppSet' },
      { id: 'autonomous-edge-nodes', title: 'Autonomous Edge Nodes' },
    ],
  },
  {
    id: 'akri',
    title: 'Akri',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'akri-architecture', title: 'Akri Architecture' },
      { id: 'akri-discovery-handlers', title: 'Akri Discovery Handlers' },
      { id: 'akri-leaf-device-pods', title: 'Akri Leaf Device Pods' },
    ],
  },
  {
    id: 'lightweight-edge-distros',
    title: 'Lightweight Edge Distributions',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'k3s-for-edge-pointer', title: 'k3s for Edge (Pointer)' },
      { id: 'microshift', title: 'MicroShift' },
      { id: 'k0s-for-edge', title: 'k0s for Edge' },
      { id: 'baetyl-and-other-edge-platforms', title: 'Baetyl & Other Edge Platforms' },
    ],
  },
  {
    id: 'virtual-clusters',
    title: 'Virtual Clusters',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'vcluster', title: 'vcluster' },
      { id: 'kamaji', title: 'Kamaji' },
      { id: 'kcp-virtual-workspaces', title: 'kcp Virtual Workspaces' },
      { id: 'capsule-pointer-stage16', title: 'Capsule (Pointer)' },
    ],
  },
  {
    id: 'air-gapped-clusters',
    title: 'Air-Gapped Clusters',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'air-gapped-installation-flow', title: 'Air-Gapped Installation Flow' },
      { id: 'private-image-registries-airgap', title: 'Private Image Registries' },
      { id: 'offline-helm-charts', title: 'Offline Helm Charts' },
      { id: 'cosign-airgap-considerations', title: 'Cosign in Air-Gapped Environments' },
      { id: 'mirroring-tools-and-strategies', title: 'Mirroring Tools & Strategies' },
    ],
  },
  {
    id: 'cluster-bootstrapping-for-edge',
    title: 'Cluster Bootstrapping for Edge',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'zero-touch-provisioning', title: 'Zero-Touch Provisioning' },
      { id: 'immutable-os-pointer', title: 'Immutable OS (Pointer)' },
      { id: 'sd-card-and-low-storage-considerations', title: 'SD-Card & Low-Storage Considerations' },
      { id: 'edge-bootstrap-with-clusterapi', title: 'Edge Bootstrap with Cluster API' },
    ],
  },
  {
    id: 'edge-observability-and-security',
    title: 'Edge Observability & Security',
    parentId: 'hybrid-edge-clusters',
    children: [
      { id: 'edge-observability-pointer', title: 'Edge Observability (Pointer)' },
      { id: 'edge-tpm-and-attestation', title: 'TPM & Attestation at the Edge' },
      { id: 'edge-secrets-and-sealing', title: 'Edge Secrets & Sealing' },
    ],
  },
])
