import { addTopics } from './addTopics.mjs'

// Stage 1 — Foundations & Prerequisites
// Refocused on Kubernetes-specific angles to avoid duplicating the `docker`
// and `devops` subjects (general containers, OCI internals, Linux fundamentals
// and general networking are covered there).
addTopics([
  /* ---------- container-foundations (refocused: containers from K8s POV) ---------- */
  {
    id: 'containers-from-k8s-pov',
    title: "Containers from Kubernetes' Perspective",
    parentId: 'container-foundations',
    children: [
      { id: 'container-vs-pod-distinction', title: 'Container vs Pod Distinction' },
      { id: 'oci-image-format-in-k8s', title: 'OCI Image Format in K8s' },
      { id: 'image-pull-mechanics', title: 'Image Pull Mechanics' },
      { id: 'image-pull-policy', title: 'imagePullPolicy (Always / IfNotPresent / Never)' },
      { id: 'image-pull-secrets-overview', title: 'imagePullSecrets Overview' },
      { id: 'image-garbage-collection', title: 'Image Garbage Collection' },
      { id: 'image-volumes', title: 'Image Volumes (KEP-4639)' },
    ],
  },
  {
    id: 'container-runtime-interface',
    title: 'Container Runtime Interface (CRI)',
    parentId: 'container-foundations',
    children: [
      { id: 'why-cri-exists', title: 'Why CRI Exists' },
      { id: 'cri-grpc-api', title: 'CRI gRPC API' },
      { id: 'cri-implementations', title: 'CRI Implementations (containerd, CRI-O)' },
      { id: 'dockershim-deprecation', title: 'dockershim Deprecation & Removal (v1.24)' },
      { id: 'cri-dockerd', title: 'cri-dockerd (Mirantis)' },
      { id: 'cri-v1-requirement', title: 'CRI v1 Requirement (v1.26+)' },
      { id: 'crictl-cli', title: 'crictl CLI' },
    ],
  },
  {
    id: 'runtime-classes',
    title: 'RuntimeClass',
    parentId: 'container-foundations',
    children: [
      { id: 'runtimeclass-resource', title: 'RuntimeClass Resource' },
      { id: 'runtime-handler-mapping', title: 'Runtime Handler Mapping' },
      { id: 'runtimeclass-scheduling', title: 'RuntimeClass Scheduling Constraints' },
      { id: 'runtimeclass-overhead', title: 'Pod Overhead Field' },
    ],
  },
  {
    id: 'registries-from-k8s-pov',
    title: "Registries from Kubernetes' POV",
    parentId: 'container-foundations',
    children: [
      { id: 'imagepullsecrets-detail', title: 'imagePullSecrets In Detail' },
      { id: 'private-registry-auth', title: 'Private Registry Authentication' },
      { id: 'serviceaccount-image-pull-secrets', title: 'ServiceAccount imagePullSecrets' },
      { id: 'registry-mirrors-for-k8s', title: 'Registry Mirrors for Kubernetes' },
      { id: 'image-credential-providers', title: 'Image Credential Provider Plugins' },
    ],
  },

  /* ---------- linux-os-foundations (refocused: Linux for K8s nodes) ---------- */
  {
    id: 'linux-features-k8s-uses',
    title: 'Linux Features Kubernetes Uses',
    parentId: 'linux-os-foundations',
    children: [
      { id: 'cgroups-v1-vs-v2', title: 'cgroups v1 vs v2 in Kubernetes' },
      { id: 'pid-namespace-sharing', title: 'PID Namespace Sharing' },
      { id: 'network-namespace-and-pods', title: 'Network Namespace & Pods' },
      { id: 'ipc-and-uts-namespaces', title: 'IPC & UTS Namespaces' },
      { id: 'conntrack-and-iptables-for-services', title: 'conntrack & iptables for Services' },
      { id: 'ipvs-vs-iptables-vs-nftables', title: 'iptables vs IPVS vs nftables for kube-proxy' },
      { id: 'ebpf-in-kubernetes', title: 'eBPF in Kubernetes' },
      { id: 'overlayfs-on-nodes', title: 'overlayfs on Nodes' },
    ],
  },
  {
    id: 'node-operating-systems',
    title: 'Node Operating Systems',
    parentId: 'linux-os-foundations',
    children: [
      { id: 'general-purpose-linux', title: 'General-Purpose Linux (Ubuntu, Debian, RHEL)' },
      { id: 'container-optimized-os', title: 'Container-Optimized OS (COS)' },
      { id: 'flatcar-linux', title: 'Flatcar Container Linux' },
      { id: 'bottlerocket', title: 'Bottlerocket' },
      { id: 'talos-linux', title: 'Talos Linux' },
      { id: 'rhel-coreos', title: 'RHEL CoreOS' },
      { id: 'fedora-coreos', title: 'Fedora CoreOS' },
      { id: 'amazon-linux-2023', title: 'Amazon Linux 2023' },
      { id: 'azure-linux', title: 'Azure Linux (CBL-Mariner)' },
      { id: 'windows-nodes', title: 'Windows Nodes' },
    ],
  },
  {
    id: 'systemd-and-services-on-nodes',
    title: 'systemd & Services on Nodes',
    parentId: 'linux-os-foundations',
    children: [
      { id: 'kubelet-systemd-unit', title: 'kubelet systemd Unit' },
      { id: 'container-runtime-units', title: 'containerd / CRI-O systemd Units' },
      { id: 'kube-proxy-as-daemonset', title: 'kube-proxy as DaemonSet' },
      { id: 'logrotate-on-nodes', title: 'logrotate Configuration' },
      { id: 'journald-vs-files', title: 'journald vs File-Based Logs' },
    ],
  },
  {
    id: 'node-tuning-for-k8s',
    title: 'Node Tuning for Kubernetes',
    parentId: 'linux-os-foundations',
    children: [
      { id: 'sysctls-for-k8s', title: 'sysctls for Kubernetes' },
      { id: 'file-descriptor-pid-limits', title: 'File Descriptor & PID Limits' },
      { id: 'swap-in-kubernetes', title: 'Swap in Kubernetes (KEP-2400)' },
      { id: 'hugepages-on-nodes', title: 'HugePages on Nodes' },
      { id: 'cpu-isolation-isolcpus', title: 'CPU Isolation & isolcpus' },
      { id: 'numa-topology', title: 'NUMA Topology Awareness' },
      { id: 'inotify-limits', title: 'inotify Watch Limits' },
    ],
  },

  /* ---------- networking-foundations (refocused: K8s network model) ---------- */
  {
    id: 'kubernetes-network-model',
    title: 'Kubernetes Network Model',
    parentId: 'networking-foundations',
    children: [
      { id: 'flat-network-requirement', title: 'Flat Network Requirement' },
      { id: 'pod-ip-per-pod', title: 'One IP per Pod' },
      { id: 'no-nat-between-pods', title: 'No NAT Between Pods' },
      { id: 'node-to-pod-reachability', title: 'Node-to-Pod Reachability' },
      { id: 'four-types-of-traffic', title: 'Four Types of Traffic (Pod-to-Pod, Pod-to-Service, External-to-Service, Pod-to-External)' },
    ],
  },
  {
    id: 'ip-address-management-k8s',
    title: 'IP Address Management for Pods',
    parentId: 'networking-foundations',
    children: [
      { id: 'pod-cidr-per-node', title: 'Pod CIDR per Node' },
      { id: 'service-cidr', title: 'Service CIDR Range' },
      { id: 'ipam-strategies', title: 'IPAM Strategies' },
      { id: 'dual-stack-ipv4-ipv6', title: 'Dual-Stack IPv4/IPv6' },
      { id: 'service-cidrs-resource', title: 'ServiceCIDR Resource (KEP-1880)' },
    ],
  },
  {
    id: 'dns-in-kubernetes',
    title: 'DNS in Kubernetes',
    parentId: 'networking-foundations',
    children: [
      { id: 'coredns-in-kubernetes', title: 'CoreDNS in Kubernetes' },
      { id: 'cluster-dns-policy', title: 'DNS Policy for Pods' },
      { id: 'dns-config-for-pods', title: 'dnsConfig & dnsPolicy' },
      { id: 'cluster-dns-search-domains', title: 'Cluster DNS Search Domains' },
      { id: 'nodelocal-dnscache', title: 'NodeLocal DNSCache' },
      { id: 'pod-and-service-dns-records', title: 'Pod & Service DNS Records' },
      { id: 'externalname-dns-resolution', title: 'ExternalName DNS Resolution' },
    ],
  },
  {
    id: 'kube-proxy-modes',
    title: 'kube-proxy & Service Proxy Modes',
    parentId: 'networking-foundations',
    children: [
      { id: 'proxy-mode-iptables', title: 'iptables Proxy Mode' },
      { id: 'proxy-mode-ipvs', title: 'IPVS Proxy Mode' },
      { id: 'proxy-mode-nftables', title: 'nftables Proxy Mode (GA in v1.31)' },
      { id: 'proxy-mode-userspace-legacy', title: 'userspace Mode (Legacy)' },
      { id: 'kube-proxy-replacement-cilium', title: 'Cilium kube-proxy Replacement (eBPF)' },
      { id: 'kpng', title: 'KPNG (Kube-Proxy Next Generation)' },
    ],
  },
  {
    id: 'cluster-egress-and-proxies',
    title: 'Cluster Egress & Proxies',
    parentId: 'networking-foundations',
    children: [
      { id: 'http-proxy-for-image-pulls', title: 'HTTP Proxy for Image Pulls' },
      { id: 'egress-ip-management', title: 'Egress IP Management' },
      { id: 'source-nat-snat', title: 'Source NAT (SNAT) Behaviour' },
      { id: 'egress-gateways', title: 'Egress Gateways' },
    ],
  },
])
