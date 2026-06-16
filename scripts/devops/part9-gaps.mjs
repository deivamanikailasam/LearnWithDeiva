/**
 * Part 9 (gap-fill): commonly used must-learn DevOps topics that were missing
 * after parts 1-8. Adds:
 *  - WAF & DDoS protection
 *  - Network observability & zero-trust platforms
 *  - Container image builders (Kaniko, Buildah, ko, Jib, CNB, Melange, Apko)
 *  - Hardened/minimal base images (Chainguard, Wolfi, etc.)
 *  - Dev environment tools (Nix flakes, Devbox, Devenv, Flox, Hermit)
 *  - Image / VM bake tools (Packer, EC2/Azure/GCP Image Builder, cloud-init)
 *  - Managed CI runner services (Depot, Namespace, Blacksmith, etc.)
 *  - ASPM platforms (Apiiro, ArmorCode, OX, Backslash, Cycode, etc.)
 *  - Modern SCA / supply-chain (Endor Labs, Socket.dev, Phylum, Aikido)
 *  - SPIFFE/SPIRE workload identity
 *  - Vulnerability management (Tenable, Qualys, Rapid7, Nessus, OpenVAS)
 *  - SIEM & XDR platforms
 *  - Authorization platforms (Cerbos, Oso, OpenFGA, AuthZed/SpiceDB, Permit.io, Casbin)
 *  - IAM governance (AWS IAM Access Analyzer, Identity Center, Azure PIM, PAM)
 *  - Steampipe ecosystem (Powerpipe, Flowpipe, Tailpipe)
 *  - Multi-cluster K8s mgmt (Karmada, OCM, Fleet, Clusternet, Cilium Cluster Mesh, Skupper)
 *  - K8s multi-tenancy (Capsule, HNC, Loft, Kiosk, Kamaji)
 *  - K8s virtualization (KubeVirt, Virtual Kubelet, Harvester, OpenShift Virt)
 *  - Database proxies (PgBouncer, ProxySQL, Pgpool, RDS Proxy, MySQL Router)
 *  - Database observability (pganalyze, Datadog DBM, Percona PMM, RDS PI, OtterTune)
 *  - Test data management (Tonic, Gretel, Synthesized, Mostly AI, Delphix, Redgate)
 *  - Managed DB migration (AWS/Azure/GCP DMS, Striim, Qlik Replicate, GoldenGate)
 *  - Confidential computing (Nitro Enclaves, SGX, TDX, SEV-SNP, ARM CCA, Confidential VMs, CoCo)
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * Networking gap-fill
   * ============================================================ */
  {
    id: 'waf-overview',
    title: 'Web Application Firewalls (WAF)',
    parentId: 'load-balancing-proxies',
    children: [
      { id: 'aws-waf', title: 'AWS WAF' },
      { id: 'cloudflare-waf', title: 'Cloudflare WAF' },
      { id: 'azure-waf', title: 'Azure WAF (Front Door & App Gateway)' },
      { id: 'gcp-cloud-armor-waf', title: 'GCP Cloud Armor (WAF)' },
      { id: 'akamai-app-protector', title: 'Akamai App & API Protector' },
      { id: 'f5-bigip-asm', title: 'F5 BIG-IP Advanced WAF (ASM)' },
      { id: 'modsecurity-waf', title: 'ModSecurity' },
      { id: 'owasp-coreruleset', title: 'OWASP Core Rule Set (CRS)' },
      { id: 'wallarm-waf', title: 'Wallarm' },
      { id: 'imperva-waf', title: 'Imperva WAF' },
      { id: 'fastly-next-gen-waf', title: 'Fastly Next-Gen WAF (Signal Sciences)' },
    ],
  },
  {
    id: 'ddos-protection',
    title: 'DDoS Protection',
    parentId: 'networking-fundamentals',
    children: [
      { id: 'aws-shield', title: 'AWS Shield (Standard & Advanced)' },
      { id: 'cloudflare-ddos-mitigation', title: 'Cloudflare DDoS Mitigation' },
      { id: 'azure-ddos-protection', title: 'Azure DDoS Protection' },
      { id: 'gcp-cloud-armor-ddos', title: 'GCP Cloud Armor (DDoS)' },
      { id: 'akamai-prolexic', title: 'Akamai Prolexic' },
      { id: 'radware-defense', title: 'Radware DefensePro' },
      { id: 'neustar-ddos', title: 'Neustar / Security Solutions DDoS' },
      { id: 'arbor-netscout', title: 'NETSCOUT Arbor' },
    ],
  },
  {
    id: 'network-observability',
    title: 'Network Observability',
    parentId: 'networking-fundamentals',
    children: [
      { id: 'kentik', title: 'Kentik' },
      { id: 'thousandeyes', title: 'Cisco ThousandEyes' },
      { id: 'librenms', title: 'LibreNMS' },
      { id: 'observium', title: 'Observium' },
      { id: 'netbox-ipam', title: 'NetBox (IPAM/DCIM)' },
      { id: 'netflow-protocol', title: 'NetFlow' },
      { id: 'sflow-protocol', title: 'sFlow' },
      { id: 'ipfix-protocol', title: 'IPFIX' },
      { id: 'pingmesh', title: 'PingMesh' },
      { id: 'ntopng', title: 'ntopng' },
    ],
  },
  {
    id: 'zero-trust-platforms',
    title: 'Zero-Trust Network Access (ZTNA) Platforms',
    parentId: 'tls-ssl-pki',
    children: [
      { id: 'beyondcorp-google', title: 'Google BeyondCorp Enterprise' },
      { id: 'cloudflare-one', title: 'Cloudflare One (Zero Trust)' },
      { id: 'cloudflare-tunnel', title: 'Cloudflare Tunnel' },
      { id: 'cloudflare-access', title: 'Cloudflare Access' },
      { id: 'zscaler-zpa', title: 'Zscaler Private Access (ZPA)' },
      { id: 'twingate-ztna', title: 'Twingate' },
      { id: 'netskope-private-access', title: 'Netskope Private Access' },
      { id: 'perimeter81', title: 'Check Point Perimeter 81' },
      { id: 'banyan-security', title: 'SonicWall (Banyan) Cloud Secure Edge' },
      { id: 'tailscale-ztna', title: 'Tailscale (Zero Trust Mode)' },
      { id: 'openziti-platform', title: 'OpenZiti / NetFoundry' },
    ],
  },

  /* ============================================================
   * Build & Artifact gap-fill
   * ============================================================ */
  {
    id: 'container-image-builders',
    title: 'Container Image Builders',
    parentId: 'build-tools',
    children: [
      { id: 'kaniko-builder', title: 'Kaniko (Google)' },
      { id: 'buildah-builder', title: 'Buildah (Red Hat)' },
      { id: 'ko-builder', title: 'ko (Go images)' },
      { id: 'jib-builder', title: 'Jib (Java images)' },
      { id: 'paketo-cnb', title: 'Paketo Cloud Native Buildpacks' },
      { id: 'heroku-cnb', title: 'Heroku Cloud Native Buildpacks' },
      { id: 'nerdctl-build', title: 'nerdctl (containerd CLI)' },
      { id: 'img-rootless', title: 'img (rootless OCI builds)' },
      { id: 'melange-chainguard', title: 'Melange (Chainguard)' },
      { id: 'apko-chainguard', title: 'apko (Chainguard)' },
      { id: 'depot-image-build', title: 'Depot Image Build' },
      { id: 'docker-buildx-cross-ref', title: 'Docker Buildx (Cross-Reference)' },
    ],
  },
  {
    id: 'hardened-base-images',
    title: 'Hardened & Minimal Base Images',
    parentId: 'container-binary-registries',
    children: [
      { id: 'chainguard-images', title: 'Chainguard Images' },
      { id: 'wolfi-os', title: 'Wolfi OS' },
      { id: 'google-distroless-cross-ref', title: 'Google Distroless (Cross-Reference)' },
      { id: 'rapidfort-platform', title: 'RapidFort' },
      { id: 'minimus-images', title: 'Minimus OS Images' },
      { id: 'redhat-ubi', title: 'Red Hat Universal Base Images (UBI)' },
      { id: 'iron-bank-dod', title: 'Iron Bank (DoD)' },
      { id: 'bitnami-secure-images', title: 'Bitnami Secure Images' },
    ],
  },
  {
    id: 'dev-environment-tools',
    title: 'Reproducible Dev Environment Tools',
    parentId: 'package-managers',
    children: [
      { id: 'nix-flakes', title: 'Nix Flakes' },
      { id: 'devbox-jetify', title: 'Devbox (Jetify)' },
      { id: 'devenv-cachix', title: 'Devenv (Cachix)' },
      { id: 'flox-cli', title: 'Flox' },
      { id: 'hermit-cli', title: 'Hermit' },
      { id: 'shadowenv', title: 'Shadowenv' },
      { id: 'aqua-cli', title: 'aquaproj/aqua' },
    ],
  },
  {
    id: 'machine-image-builders',
    title: 'Machine Image & Bake Tools',
    parentId: 'build-tools',
    children: [
      { id: 'hashicorp-packer', title: 'HashiCorp Packer' },
      { id: 'aws-ec2-image-builder', title: 'AWS EC2 Image Builder' },
      { id: 'azure-image-builder', title: 'Azure VM Image Builder' },
      { id: 'gcp-image-builder', title: 'GCP Image Builder (Cloud Build)' },
      { id: 'cloud-init', title: 'cloud-init' },
      { id: 'ignition-fcos', title: 'Ignition (CoreOS / Flatcar)' },
      { id: 'kickstart-rhel', title: 'Kickstart (RHEL)' },
      { id: 'preseed-debian', title: 'Preseed (Debian)' },
      { id: 'autoyast-suse', title: 'AutoYaST (SUSE)' },
      { id: 'lorax-imagefactory', title: 'Lorax / ImageFactory' },
    ],
  },

  /* ============================================================
   * CI/CD gap-fill — managed runner services
   * ============================================================ */
  {
    id: 'managed-runner-services',
    title: 'Managed CI Runner Services',
    parentId: 'self-hosted-runners',
    children: [
      { id: 'depot-runners', title: 'Depot (Build & Runners)' },
      { id: 'namespace-runners', title: 'Namespace.so' },
      { id: 'blacksmith-runners', title: 'Blacksmith' },
      { id: 'buildjet-runners', title: 'BuildJet' },
      { id: 'cirun-runners', title: 'Cirun' },
      { id: 'runs-on-runners', title: 'RunsOn (AWS-native)' },
      { id: 'ubicloud-runners', title: 'Ubicloud' },
      { id: 'warpbuild-runners', title: 'WarpBuild' },
      { id: 'actuated-runners', title: 'Actuated (OpenFaaS)' },
      { id: 'runforge-runners', title: 'RunForge' },
    ],
  },

  /* ============================================================
   * DevSecOps gap-fill
   * ============================================================ */
  {
    id: 'aspm-platforms',
    title: 'ASPM (Application Security Posture Management)',
    parentId: 'devsecops-fundamentals',
    children: [
      { id: 'apiiro-aspm', title: 'Apiiro' },
      { id: 'armorcode-aspm', title: 'ArmorCode' },
      { id: 'ox-security-aspm', title: 'OX Security' },
      { id: 'backslash-security', title: 'Backslash Security' },
      { id: 'legit-security', title: 'Legit Security' },
      { id: 'cycode-aspm', title: 'Cycode' },
      { id: 'tromzo-aspm', title: 'Tromzo' },
      { id: 'arnica-aspm', title: 'Arnica' },
      { id: 'bionic-aspm', title: 'Bionic (Continuous AppSec)' },
      { id: 'jit-aspm', title: 'Jit.io' },
      { id: 'phoenix-security-aspm', title: 'Phoenix Security' },
    ],
  },
  {
    id: 'modern-supply-chain-platforms',
    title: 'Modern Supply Chain & SCA Platforms',
    parentId: 'sast-dast-sca',
    children: [
      { id: 'endor-labs-platform', title: 'Endor Labs' },
      { id: 'socket-dev-platform', title: 'Socket.dev' },
      { id: 'phylum-io', title: 'Phylum' },
      { id: 'aikido-security', title: 'Aikido Security' },
      { id: 'chainguard-enforce', title: 'Chainguard Enforce' },
      { id: 'vulnert-renovate-pro', title: 'Mend Renovate Enterprise' },
      { id: 'safedep-vet', title: 'SafeDep vet' },
    ],
  },
  {
    id: 'spiffe-spire-identity',
    title: 'SPIFFE & SPIRE (Workload Identity)',
    parentId: 'secrets-management',
    children: [
      { id: 'spiffe-spec', title: 'SPIFFE Specification' },
      { id: 'spire-server', title: 'SPIRE Server' },
      { id: 'spire-agent', title: 'SPIRE Agent' },
      { id: 'jwt-svid', title: 'JWT-SVIDs' },
      { id: 'x509-svid', title: 'X.509-SVIDs' },
      { id: 'workload-attestation-spiffe', title: 'Workload Attestation' },
      { id: 'spiffe-trust-domain', title: 'Trust Domains & Federation' },
      { id: 'tornjak-spire-ui', title: 'Tornjak (SPIRE UI)' },
    ],
  },
  {
    id: 'vulnerability-management-platforms',
    title: 'Vulnerability Management Platforms',
    parentId: 'devsecops-fundamentals',
    children: [
      { id: 'tenable-vm', title: 'Tenable.io / Nessus' },
      { id: 'qualys-vmdr', title: 'Qualys VMDR' },
      { id: 'rapid7-insightvm', title: 'Rapid7 InsightVM (Nexpose)' },
      { id: 'openvas-greenbone', title: 'OpenVAS / Greenbone' },
      { id: 'microsoft-defender-vm', title: 'Microsoft Defender Vulnerability Management' },
      { id: 'frontline-vm', title: 'Frontline Vulnerability Manager (Digital Defense)' },
      { id: 'wiz-vm', title: 'Wiz Vulnerability Management' },
      { id: 'edgescan', title: 'Edgescan' },
      { id: 'crowdstrike-spotlight', title: 'CrowdStrike Falcon Spotlight' },
    ],
  },
  {
    id: 'siem-platforms',
    title: 'SIEM Platforms',
    parentId: 'auditing-drift-detection',
    children: [
      { id: 'splunk-enterprise-security', title: 'Splunk Enterprise Security' },
      { id: 'microsoft-sentinel', title: 'Microsoft Sentinel' },
      { id: 'elastic-siem', title: 'Elastic Security / SIEM' },
      { id: 'google-chronicle-siem', title: 'Google Chronicle SIEM' },
      { id: 'panther-siem', title: 'Panther' },
      { id: 'falcon-logscale', title: 'CrowdStrike Falcon LogScale (Humio)' },
      { id: 'exabeam-siem', title: 'Exabeam' },
      { id: 'ibm-qradar', title: 'IBM QRadar' },
      { id: 'sumo-logic-cse', title: 'Sumo Logic Cloud SIEM' },
      { id: 'securonix-siem', title: 'Securonix' },
      { id: 'logrhythm-siem', title: 'LogRhythm' },
      { id: 'wazuh-siem', title: 'Wazuh (Open Source)' },
    ],
  },
  {
    id: 'xdr-platforms',
    title: 'XDR Platforms',
    parentId: 'runtime-security',
    children: [
      { id: 'crowdstrike-falcon-xdr', title: 'CrowdStrike Falcon XDR' },
      { id: 'palo-alto-cortex-xdr', title: 'Palo Alto Cortex XDR' },
      { id: 'microsoft-defender-xdr', title: 'Microsoft Defender XDR' },
      { id: 'sentinelone-singularity', title: 'SentinelOne Singularity' },
      { id: 'trellix-xdr', title: 'Trellix XDR' },
      { id: 'sophos-xdr', title: 'Sophos XDR' },
      { id: 'cybereason-xdr', title: 'Cybereason XDR' },
    ],
  },
  {
    id: 'authorization-platforms',
    title: 'Authorization (AuthZ) Platforms',
    parentId: 'devsecops-fundamentals',
    children: [
      { id: 'cerbos-authz', title: 'Cerbos' },
      { id: 'oso-authz', title: 'Oso' },
      { id: 'openfga-authz', title: 'OpenFGA (CNCF)' },
      { id: 'authzed-spicedb', title: 'AuthZed / SpiceDB' },
      { id: 'permit-io-authz', title: 'Permit.io' },
      { id: 'casbin-authz', title: 'Casbin' },
      { id: 'aws-verified-permissions', title: 'AWS Verified Permissions (Cedar)' },
      { id: 'opa-as-authz', title: 'OPA as Authorization (Cross-Reference)' },
      { id: 'styra-das-authz', title: 'Styra DAS (Cross-Reference)' },
      { id: 'topaz-authz', title: 'Topaz (Cross-Reference)' },
    ],
  },
  {
    id: 'iam-governance-platforms',
    title: 'IAM Governance & PAM Platforms',
    parentId: 'secrets-management',
    children: [
      { id: 'aws-iam-access-analyzer', title: 'AWS IAM Access Analyzer' },
      { id: 'aws-iam-identity-center', title: 'AWS IAM Identity Center (SSO)' },
      { id: 'azure-pim', title: 'Azure PIM (Privileged Identity Management)' },
      { id: 'azure-entra-id', title: 'Microsoft Entra ID Governance' },
      { id: 'gcp-iam-recommender', title: 'GCP IAM Recommender & Policy Intelligence' },
      { id: 'sailpoint-identitynow', title: 'SailPoint IdentityNow' },
      { id: 'okta-identity-governance', title: 'Okta Identity Governance' },
      { id: 'cyberark-pam', title: 'CyberArk PAM' },
      { id: 'beyondtrust-pam', title: 'BeyondTrust PAM' },
      { id: 'delinea-thycotic', title: 'Delinea (Thycotic)' },
      { id: 'hashicorp-boundary', title: 'HashiCorp Boundary' },
      { id: 'teleport-iam', title: 'Teleport (Access Plane)' },
      { id: 'strongdm', title: 'StrongDM' },
    ],
  },

  /* ============================================================
   * Compliance & Governance gap-fill
   * ============================================================ */
  {
    id: 'steampipe-ecosystem',
    title: 'Steampipe Ecosystem (Turbot Pipes)',
    parentId: 'auditing-drift-detection',
    children: [
      { id: 'steampipe-core', title: 'Steampipe (Query)' },
      { id: 'powerpipe', title: 'Powerpipe (Dashboards & Benchmarks)' },
      { id: 'flowpipe', title: 'Flowpipe (Workflow Engine)' },
      { id: 'tailpipe', title: 'Tailpipe (Log Analytics)' },
      { id: 'turbot-guardrails', title: 'Turbot Guardrails' },
    ],
  },
  {
    id: 'continuous-controls-monitoring',
    title: 'Continuous Controls Monitoring (CCM)',
    parentId: 'compliance-frameworks',
    children: [
      { id: 'cyberguardian-ccm', title: 'CyberGuardian / RegScale' },
      { id: 'centraleyes-ccm', title: 'Centraleyes' },
      { id: 'risk-cloud-logicgate', title: 'LogicGate Risk Cloud' },
      { id: 'archer-rsa', title: 'RSA Archer' },
      { id: 'metricstream-grc', title: 'MetricStream GRC' },
    ],
  },

  /* ============================================================
   * Cloud-Native & Multi-Cloud gap-fill
   * ============================================================ */
  {
    id: 'multi-cluster-mgmt-tools',
    title: 'Multi-Cluster Kubernetes Management',
    parentId: 'multi-cloud-hybrid',
    children: [
      { id: 'karmada-cncf', title: 'Karmada (CNCF)' },
      { id: 'ocm-open-cluster-mgmt', title: 'Open Cluster Management (OCM)' },
      { id: 'rancher-fleet', title: 'Rancher Fleet' },
      { id: 'clusternet-multi', title: 'Clusternet' },
      { id: 'argo-cd-applicationsets-cross', title: 'Argo CD ApplicationSets (Cross-Reference)' },
      { id: 'cilium-cluster-mesh', title: 'Cilium Cluster Mesh' },
      { id: 'skupper-multi-cluster', title: 'Skupper' },
      { id: 'submariner-cross-ref', title: 'Submariner (Cross-Reference)' },
      { id: 'liqo-cross-ref', title: 'Liqo (Cross-Reference)' },
      { id: 'kubestellar', title: 'KubeStellar' },
    ],
  },
  {
    id: 'k8s-multi-tenancy-tools',
    title: 'Kubernetes Multi-Tenancy Tooling',
    parentId: 'cncf-landscape',
    children: [
      { id: 'capsule-tenant', title: 'Capsule' },
      { id: 'hierarchical-namespace-controller', title: 'Hierarchical Namespace Controller (HNC)' },
      { id: 'vcluster-cross-ref', title: 'vCluster (Cross-Reference)' },
      { id: 'loft-platform', title: 'Loft Platform' },
      { id: 'kiosk-multi-tenant', title: 'Kiosk' },
      { id: 'kamaji-tenant', title: 'Kamaji' },
      { id: 'project-multi-tenancy', title: 'Kubernetes Working Group Multi-Tenancy' },
    ],
  },
  {
    id: 'k8s-virtualization',
    title: 'Virtualization on Kubernetes',
    parentId: 'cncf-landscape',
    children: [
      { id: 'kubevirt', title: 'KubeVirt' },
      { id: 'virtual-kubelet', title: 'Virtual Kubelet' },
      { id: 'harvester-suse', title: 'Harvester (SUSE)' },
      { id: 'openshift-virtualization', title: 'OpenShift Virtualization' },
      { id: 'kata-containers-virt', title: 'Kata Containers (Cross-Reference)' },
      { id: 'firecracker-microvm', title: 'AWS Firecracker' },
      { id: 'cloud-hypervisor', title: 'Cloud Hypervisor' },
    ],
  },

  /* ============================================================
   * DatabaseOps gap-fill
   * ============================================================ */
  {
    id: 'database-proxies',
    title: 'Database Proxies & Connection Pooling',
    parentId: 'database-lifecycle',
    children: [
      { id: 'pgbouncer', title: 'PgBouncer (Postgres)' },
      { id: 'pgpool-ii', title: 'Pgpool-II (Postgres)' },
      { id: 'proxysql', title: 'ProxySQL (MySQL)' },
      { id: 'aws-rds-proxy', title: 'AWS RDS Proxy' },
      { id: 'mysql-router', title: 'MySQL Router' },
      { id: 'haproxy-for-databases', title: 'HAProxy for Databases' },
      { id: 'maxscale-mariadb', title: 'MariaDB MaxScale' },
      { id: 'pgcat', title: 'PgCat' },
      { id: 'pgagroal', title: 'pgagroal' },
      { id: 'odyssey-pg-proxy', title: 'Yandex Odyssey' },
    ],
  },
  {
    id: 'database-observability',
    title: 'Database Observability & Performance',
    parentId: 'database-lifecycle',
    children: [
      { id: 'pganalyze', title: 'pganalyze' },
      { id: 'datadog-database-monitoring', title: 'Datadog Database Monitoring (DBM)' },
      { id: 'percona-pmm', title: 'Percona Monitoring & Management (PMM)' },
      { id: 'solarwinds-dpa', title: 'SolarWinds Database Performance Analyzer' },
      { id: 'aws-rds-performance-insights', title: 'AWS RDS Performance Insights' },
      { id: 'azure-sql-insights', title: 'Azure SQL Insights' },
      { id: 'gcp-cloud-sql-insights', title: 'GCP Cloud SQL Insights' },
      { id: 'vivid-cortex-splunk', title: 'VividCortex (Splunk DB)' },
      { id: 'ottertune', title: 'OtterTune' },
      { id: 'releem', title: 'Releem' },
      { id: 'mongodb-ops-manager', title: 'MongoDB Ops Manager / Cloud Manager' },
      { id: 'redis-insight', title: 'Redis Insight' },
    ],
  },
  {
    id: 'test-data-management',
    title: 'Test Data Management & Synthetic Data',
    parentId: 'database-lifecycle',
    children: [
      { id: 'tonic-ai', title: 'Tonic.ai' },
      { id: 'gretel-ai', title: 'Gretel.ai' },
      { id: 'synthesized-tdm', title: 'Synthesized' },
      { id: 'mostly-ai', title: 'MOSTLY AI' },
      { id: 'delphix-platform', title: 'Delphix Continuous Data Platform' },
      { id: 'redgate-sql-provision', title: 'Redgate SQL Provision / Test Data Manager' },
      { id: 'k2view-tdm', title: 'K2View Test Data Management' },
      { id: 'curiosity-test-modeller', title: 'Curiosity Test Modeller' },
      { id: 'datprof-tdm', title: 'DATPROF' },
      { id: 'neosync', title: 'Neosync (Open Source)' },
    ],
  },
  {
    id: 'managed-migration-services',
    title: 'Managed Database Migration Services',
    parentId: 'database-lifecycle',
    children: [
      { id: 'aws-dms', title: 'AWS Database Migration Service' },
      { id: 'azure-database-migration-service', title: 'Azure Database Migration Service' },
      { id: 'gcp-database-migration-service', title: 'GCP Database Migration Service' },
      { id: 'striim-platform', title: 'Striim' },
      { id: 'qlik-replicate', title: 'Qlik Replicate (Attunity)' },
      { id: 'oracle-goldengate', title: 'Oracle GoldenGate' },
      { id: 'fivetran-cross-ref', title: 'Fivetran (Cross-Reference)' },
      { id: 'airbyte-cross-ref', title: 'Airbyte (Cross-Reference)' },
      { id: 'matillion-data-loader', title: 'Matillion Data Loader' },
      { id: 'arcion-replication', title: 'Databricks Arcion' },
    ],
  },

  /* ============================================================
   * AI-Augmented DevOps & Future gap-fill
   * ============================================================ */
  {
    id: 'confidential-computing',
    title: 'Confidential Computing',
    parentId: 'runtime-security',
    children: [
      { id: 'aws-nitro-enclaves', title: 'AWS Nitro Enclaves' },
      { id: 'intel-sgx', title: 'Intel SGX' },
      { id: 'intel-tdx', title: 'Intel TDX' },
      { id: 'amd-sev-snp', title: 'AMD SEV-SNP' },
      { id: 'arm-cca', title: 'ARM CCA (Realm Management Extension)' },
      { id: 'azure-confidential-vm', title: 'Azure Confidential VMs' },
      { id: 'azure-confidential-containers', title: 'Azure Confidential Containers (AKS)' },
      { id: 'gcp-confidential-vm', title: 'GCP Confidential VMs' },
      { id: 'gke-confidential-nodes', title: 'GKE Confidential Nodes' },
      { id: 'coco-cncf', title: 'Confidential Containers (CoCo) — CNCF Sandbox' },
      { id: 'occlum-tee', title: 'Occlum (LibOS for SGX)' },
      { id: 'gramine-tee', title: 'Gramine (LibOS)' },
      { id: 'open-enclave-sdk', title: 'Open Enclave SDK' },
      { id: 'enarx-wasm-tee', title: 'Enarx (WASM in TEEs)' },
    ],
  },
])
