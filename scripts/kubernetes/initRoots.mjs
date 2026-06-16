/**
 * One-off script: create one topic.json per roadmap node.
 *
 * The 22 roadmap stages each have 3 root topics. This script writes those 66
 * root topic.json files with the correct id, title, level, tags and order so
 * subsequent stage scripts (stage01.mjs, stage02.mjs, ...) only need to add
 * subtopics + sub-subtopics under existing roots.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/kubernetes')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

/** Stage tag, level and the 3 root topics for that stage, in roadmap order. */
const STAGES = [
  {
    tag: 'kubernetes-foundations',
    level: 'beginner',
    roots: [
      { id: 'container-foundations', title: 'Container Foundations', summary: 'Containers, images, runtimes and registries used by Kubernetes.' },
      { id: 'linux-os-foundations', title: 'Linux & OS Foundations', summary: 'Linux kernel features (cgroups, namespaces) and shell basics.' },
      { id: 'networking-foundations', title: 'Networking Foundations', summary: 'TCP/IP, DNS, HTTP and proxies that underpin Kubernetes networking.' },
    ],
  },
  {
    tag: 'kubernetes-fundamentals',
    level: 'beginner',
    roots: [
      { id: 'what-is-kubernetes', title: 'What is Kubernetes?', summary: 'Kubernetes definition, goals and ecosystem.' },
      { id: 'kubernetes-evolution', title: 'Kubernetes Evolution & Versions', summary: 'History, release cadence and notable versions through v1.36.' },
      { id: 'kubernetes-architecture', title: 'Kubernetes Architecture Overview', summary: 'Control plane, nodes, API server and the declarative model.' },
    ],
  },
  {
    tag: 'cluster-setup',
    level: 'beginner',
    roots: [
      { id: 'local-development-clusters', title: 'Local Development Clusters', summary: 'Minikube, kind, k3d and Docker Desktop clusters.' },
      { id: 'cluster-installation', title: 'Cluster Installation Tools', summary: 'kubeadm, kops, kubespray and managed providers.', level: 'intermediate' },
      { id: 'kubectl-and-access', title: 'kubectl & Cluster Access', summary: 'kubectl, kubeconfig, contexts and cluster discovery.' },
    ],
  },
  {
    tag: 'workloads-pods',
    level: 'beginner',
    roots: [
      { id: 'pod-fundamentals', title: 'Pod Fundamentals', summary: 'Pod model, lifecycle, probes and lifecycle hooks.' },
      { id: 'workload-controllers', title: 'Workload Controllers', summary: 'Deployments, ReplicaSets, DaemonSets and StatefulSets.', level: 'intermediate' },
      { id: 'jobs-and-cronjobs', title: 'Jobs & CronJobs', summary: 'Run-to-completion and scheduled batch workloads.', level: 'intermediate' },
    ],
  },
  {
    tag: 'configuration-secrets',
    level: 'intermediate',
    roots: [
      { id: 'configmaps', title: 'ConfigMaps', summary: 'Storing and consuming non-sensitive configuration.' },
      { id: 'secrets', title: 'Secrets', summary: 'Sensitive values, encryption at rest and external secrets.' },
      { id: 'environment-and-configuration', title: 'Environment & Configuration Patterns', summary: 'Env vars, downward API, args and config patterns.' },
    ],
  },
  {
    tag: 'services-networking',
    level: 'intermediate',
    roots: [
      { id: 'services', title: 'Services', summary: 'ClusterIP, NodePort, LoadBalancer and headless services.' },
      { id: 'ingress-gateway-api', title: 'Ingress & Gateway API', summary: 'HTTP routing with Ingress and the Gateway API (GA).' },
      { id: 'network-policies', title: 'Network Policies', summary: 'Cluster-internal segmentation and admin policies.' },
    ],
  },
  {
    tag: 'storage-volumes',
    level: 'intermediate',
    roots: [
      { id: 'volumes-fundamentals', title: 'Volume Fundamentals', summary: 'Volumes, volume types and projected volumes.' },
      { id: 'persistent-volumes', title: 'Persistent Volumes & Claims', summary: 'PV/PVC binding, lifecycle and access modes.' },
      { id: 'storage-classes-csi', title: 'StorageClasses & CSI', summary: 'Dynamic provisioning, CSI drivers and snapshots.', level: 'advanced' },
    ],
  },
  {
    tag: 'scheduling-resources',
    level: 'intermediate',
    roots: [
      { id: 'scheduling-fundamentals', title: 'Scheduling Fundamentals', summary: 'kube-scheduler, predicates, priorities and scoring.' },
      { id: 'resource-management', title: 'Resource Management', summary: 'Requests, limits, QoS and resource quotas.' },
      { id: 'advanced-scheduling', title: 'Advanced Scheduling', summary: 'Affinity, taints, topology spread and custom schedulers.', level: 'advanced' },
    ],
  },
  {
    tag: 'control-plane-internals',
    level: 'advanced',
    roots: [
      { id: 'control-plane-components', title: 'Control Plane Components', summary: 'API server, controller manager, scheduler and cloud controllers.' },
      { id: 'node-internals', title: 'Node & Kubelet Internals', summary: 'kubelet, container runtime interface and kube-proxy.' },
      { id: 'etcd-internals', title: 'etcd Internals', summary: 'Cluster state, Raft, backup and restore for etcd.' },
    ],
  },
  {
    tag: 'security-authorization',
    level: 'advanced',
    roots: [
      { id: 'cluster-authentication', title: 'Authentication', summary: 'Users, ServiceAccounts, tokens and OIDC.' },
      { id: 'rbac-authorization', title: 'Authorization & RBAC', summary: 'RBAC, ABAC, webhook auth and admission control.' },
      { id: 'pod-security-and-admission', title: 'Pod Security & Admission', summary: 'Pod Security Admission, policies and runtime hardening.' },
    ],
  },
  {
    tag: 'observability',
    level: 'intermediate',
    roots: [
      { id: 'cluster-logging', title: 'Logging', summary: 'Container logs, log shippers and aggregation.' },
      { id: 'cluster-monitoring', title: 'Monitoring & Metrics', summary: 'Metrics Server, Prometheus and dashboards.' },
      { id: 'tracing-and-events', title: 'Tracing & Events', summary: 'OpenTelemetry, distributed tracing and Kubernetes Events.', level: 'advanced' },
    ],
  },
  {
    tag: 'app-lifecycle-packaging',
    level: 'intermediate',
    roots: [
      { id: 'helm', title: 'Helm', summary: 'Charts, releases, repositories and chart development.' },
      { id: 'kustomize', title: 'Kustomize', summary: 'Overlays, generators, patches and bases.' },
      { id: 'deployment-strategies', title: 'Deployment Strategies', summary: 'Rolling, blue-green, canary and progressive delivery.', level: 'advanced' },
    ],
  },
  {
    tag: 'extending-kubernetes',
    level: 'advanced',
    roots: [
      { id: 'custom-resources', title: 'Custom Resources (CRDs)', summary: 'CRDs, validation, conversion and versioning.' },
      { id: 'operators-pattern', title: 'Operators & Controller Pattern', summary: 'Reconciliation loops, frameworks and best practices.' },
      { id: 'api-extensions', title: 'API Server Extensions', summary: 'Aggregated API servers, webhooks and CEL admission.' },
    ],
  },
  {
    tag: 'stateful-workloads',
    level: 'advanced',
    roots: [
      { id: 'statefulsets-deep', title: 'StatefulSets In Depth', summary: 'Identity, ordering, headless services and rolling updates.' },
      { id: 'databases-on-kubernetes', title: 'Databases on Kubernetes', summary: 'Operator-managed databases, message brokers and caches.' },
      { id: 'backup-restore', title: 'Backup & Restore', summary: 'Velero, snapshots and application-aware backups.' },
    ],
  },
  {
    tag: 'service-mesh-advanced-networking',
    level: 'advanced',
    roots: [
      { id: 'service-mesh-fundamentals', title: 'Service Mesh Fundamentals', summary: 'Sidecar and sidecar-less meshes (Istio, Linkerd, Cilium).' },
      { id: 'cni-deep-dive', title: 'CNI Deep Dive', summary: 'CNI specification and major plugins (Calico, Cilium, Flannel).' },
      { id: 'multi-cluster-networking', title: 'Multi-Cluster Networking', summary: 'Submariner, Cilium ClusterMesh and MCS API.' },
    ],
  },
  {
    tag: 'gitops-cicd',
    level: 'intermediate',
    roots: [
      { id: 'gitops-fundamentals', title: 'GitOps Fundamentals', summary: 'GitOps principles, repository patterns and OpenGitOps.' },
      { id: 'argo-cd-and-rollouts', title: 'Argo CD & Argo Rollouts', summary: 'Declarative deployments and progressive delivery with Argo.', level: 'advanced' },
      { id: 'flux-and-other-cd', title: 'Flux & Other Continuous Delivery', summary: 'Flux, Jenkins X, Tekton and Spinnaker on Kubernetes.', level: 'advanced' },
    ],
  },
  {
    tag: 'multi-cluster-hybrid',
    level: 'advanced',
    roots: [
      { id: 'multi-cluster-management', title: 'Multi-Cluster Management', summary: 'Cluster API, Karmada, Open Cluster Management and Rancher.' },
      { id: 'cluster-federation-fleets', title: 'Federation & Fleet Management', summary: 'KubeFed v2, fleet patterns and policy distribution.' },
      { id: 'hybrid-edge-clusters', title: 'Hybrid & Edge Clusters', summary: 'KubeEdge, OpenYurt, virtual clusters and air-gapped setups.' },
    ],
  },
  {
    tag: 'cluster-operations-day2',
    level: 'advanced',
    roots: [
      { id: 'cluster-upgrades-maintenance', title: 'Cluster Upgrades & Maintenance', summary: 'Version skew, control-plane and node upgrades.' },
      { id: 'disaster-recovery', title: 'Disaster Recovery', summary: 'etcd backups, cluster reconstruction and DR drills.' },
      { id: 'troubleshooting-debugging', title: 'Troubleshooting & Debugging', summary: 'Debugging pods, nodes, networking and the control plane.' },
    ],
  },
  {
    tag: 'performance-scalability',
    level: 'advanced',
    roots: [
      { id: 'cluster-scaling', title: 'Cluster Scaling', summary: 'Cluster Autoscaler, Karpenter and large-cluster limits.' },
      { id: 'workload-autoscaling', title: 'Workload Autoscaling', summary: 'HPA, VPA, KEDA and event-driven autoscaling.' },
      { id: 'performance-tuning', title: 'Performance Tuning', summary: 'Latency, throughput, kernel and runtime tuning.' },
    ],
  },
  {
    tag: 'specialized-workloads',
    level: 'advanced',
    roots: [
      { id: 'ai-ml-on-kubernetes', title: 'AI/ML Workloads on Kubernetes', summary: 'GPU scheduling, Kubeflow, KServe and inference platforms.' },
      { id: 'batch-hpc-workloads', title: 'Batch & HPC Workloads', summary: 'Volcano, Kueue, JobSet and queueing systems.' },
      { id: 'edge-iot-virtualization', title: 'Edge, IoT & Virtualization', summary: 'KubeVirt, Kata Containers, gVisor and Wasm workloads.' },
    ],
  },
  {
    tag: 'distributions-platforms',
    level: 'intermediate',
    roots: [
      { id: 'managed-distributions', title: 'Managed Distributions', summary: 'Cloud-managed Kubernetes options at a glance.' },
      { id: 'self-managed-distributions', title: 'Self-Managed Distributions', summary: 'OpenShift, Rancher, Tanzu, k3s, Talos and more.', level: 'advanced' },
      { id: 'platform-engineering', title: 'Platform Engineering on Kubernetes', summary: 'Internal developer platforms, Backstage and Crossplane.', level: 'advanced' },
    ],
  },
  {
    tag: 'certifications-career',
    level: 'intermediate',
    roots: [
      { id: 'kubernetes-certifications', title: 'Kubernetes Certification Paths', summary: 'KCNA, KCSA, CKAD, CKA, CKS and beyond.' },
      { id: 'exam-preparation', title: 'Exam Preparation', summary: 'Practice strategies, killer.sh and lab environments.' },
      { id: 'career-community', title: 'Career & Community', summary: 'Roles, KubeCon, SIGs and contributing upstream.' },
    ],
  },
]

let written = 0
let skipped = 0
let order = 0
for (const stage of STAGES) {
  for (const root of stage.roots) {
    order += 1
    const dir = resolve(TOPICS_DIR, root.id)
    const file = resolve(dir, 'topic.json')
    if (existsSync(file)) {
      skipped += 1
      continue
    }
    mkdirSync(dir, { recursive: true })
    const meta = {
      id: root.id,
      title: root.title,
      summary: root.summary ?? root.title,
      order,
      level: root.level ?? stage.level,
      tags: [stage.tag],
    }
    writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
    written += 1
  }
}

console.log(`initRoots: wrote ${written} root topic files, skipped ${skipped} existing.`)
