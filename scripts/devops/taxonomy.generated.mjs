/** Auto-generated from part scripts — do not edit by hand; re-run extract-taxonomy.mjs */
export const GENERATED_TAXONOMY = {
  "secrets-management": [
    {
      "id": "cloud-kms-hsm",
      "title": "Cloud KMS & HSM",
      "leaves": [
        {
          "id": "aws-kms",
          "title": "AWS KMS"
        },
        {
          "id": "aws-cloudhsm",
          "title": "AWS CloudHSM"
        },
        {
          "id": "azure-key-vault-hsm",
          "title": "Azure Key Vault Managed HSM"
        },
        {
          "id": "gcp-cloud-kms",
          "title": "GCP Cloud KMS"
        },
        {
          "id": "gcp-cloud-hsm",
          "title": "GCP Cloud HSM"
        },
        {
          "id": "oracle-cloud-kms",
          "title": "OCI Vault & Key Management"
        },
        {
          "id": "hashicorp-vault-transit",
          "title": "HashiCorp Vault Transit Engine"
        },
        {
          "id": "yubihsm",
          "title": "YubiHSM 2"
        },
        {
          "id": "thales-luna-hsm",
          "title": "Thales Luna HSM"
        },
        {
          "id": "entrust-nshield",
          "title": "Entrust nShield"
        },
        {
          "id": "envelope-encryption",
          "title": "Envelope Encryption Pattern"
        },
        {
          "id": "byok-hyok",
          "title": "BYOK & HYOK Patterns"
        }
      ]
    },
    {
      "id": "secrets-management--secrets-management-concepts-related-topics",
      "title": "Secrets Management Concepts & Related Topics",
      "leaves": [
        {
          "id": "secrets-management-concepts",
          "title": "Secrets Management Concepts"
        },
        {
          "id": "secret-rotation-practices",
          "title": "Secret Rotation"
        },
        {
          "id": "secret-zero-problem",
          "title": "Secret Zero Problem"
        }
      ]
    },
    {
      "id": "secrets-stores",
      "title": "Secrets Stores",
      "leaves": [
        {
          "id": "hashicorp-vault",
          "title": "HashiCorp Vault"
        },
        {
          "id": "aws-secrets-manager-overview",
          "title": "AWS Secrets Manager (Overview)"
        },
        {
          "id": "azure-key-vault-overview",
          "title": "Azure Key Vault (Overview)"
        },
        {
          "id": "google-secret-manager-overview",
          "title": "Google Secret Manager (Overview)"
        },
        {
          "id": "doppler",
          "title": "Doppler"
        },
        {
          "id": "1password-secrets-automation",
          "title": "1Password Secrets Automation"
        },
        {
          "id": "akeyless",
          "title": "Akeyless"
        },
        {
          "id": "infisical",
          "title": "Infisical"
        },
        {
          "id": "bitwarden-secrets-manager",
          "title": "Bitwarden Secrets Manager"
        },
        {
          "id": "cyberark-conjur",
          "title": "CyberArk Conjur"
        }
      ]
    },
    {
      "id": "k8s-secrets-tools",
      "title": "Kubernetes Secret Tooling",
      "leaves": [
        {
          "id": "k8s-native-secrets",
          "title": "Kubernetes Native Secrets"
        },
        {
          "id": "external-secrets-operator",
          "title": "External Secrets Operator (ESO)"
        },
        {
          "id": "sealed-secrets-bitnami",
          "title": "Sealed Secrets (Bitnami)"
        },
        {
          "id": "sops-mozilla",
          "title": "SOPS (Mozilla)"
        },
        {
          "id": "helm-secrets",
          "title": "Helm Secrets"
        },
        {
          "id": "vault-secrets-operator",
          "title": "Vault Secrets Operator"
        },
        {
          "id": "csi-secrets-store-driver",
          "title": "Secrets Store CSI Driver"
        }
      ]
    },
    {
      "id": "secret-detection-tools",
      "title": "Secret Detection Tools",
      "leaves": [
        {
          "id": "gitleaks",
          "title": "GitLeaks"
        },
        {
          "id": "trufflehog",
          "title": "TruffleHog"
        },
        {
          "id": "detect-secrets-yelp",
          "title": "detect-secrets (Yelp)"
        },
        {
          "id": "git-secrets-aws",
          "title": "git-secrets (AWS)"
        },
        {
          "id": "secretlint",
          "title": "SecretLint"
        },
        {
          "id": "ggshield",
          "title": "GitGuardian ggshield"
        }
      ]
    },
    {
      "id": "secrets-management--secrets-in-ci-cd-related-topics",
      "title": "Secrets in CI/CD & Related Topics",
      "leaves": [
        {
          "id": "secrets-in-cicd",
          "title": "Secrets in CI/CD"
        },
        {
          "id": "just-in-time-secrets",
          "title": "Just-in-Time Secrets"
        },
        {
          "id": "dynamic-secrets",
          "title": "Dynamic Secrets"
        },
        {
          "id": "workload-identity-secrets",
          "title": "Workload Identity (OIDC, IRSA, Workload Identity Federation)"
        }
      ]
    },
    {
      "id": "spiffe-spire-identity",
      "title": "SPIFFE & SPIRE (Workload Identity)",
      "leaves": [
        {
          "id": "spiffe-spec",
          "title": "SPIFFE Specification"
        },
        {
          "id": "spire-server",
          "title": "SPIRE Server"
        },
        {
          "id": "spire-agent",
          "title": "SPIRE Agent"
        },
        {
          "id": "jwt-svid",
          "title": "JWT-SVIDs"
        },
        {
          "id": "x509-svid",
          "title": "X.509-SVIDs"
        },
        {
          "id": "workload-attestation-spiffe",
          "title": "Workload Attestation"
        },
        {
          "id": "spiffe-trust-domain",
          "title": "Trust Domains & Federation"
        },
        {
          "id": "tornjak-spire-ui",
          "title": "Tornjak (SPIRE UI)"
        }
      ]
    },
    {
      "id": "iam-governance-platforms",
      "title": "IAM Governance & PAM Platforms",
      "leaves": [
        {
          "id": "aws-iam-access-analyzer",
          "title": "AWS IAM Access Analyzer"
        },
        {
          "id": "aws-iam-identity-center",
          "title": "AWS IAM Identity Center (SSO)"
        },
        {
          "id": "azure-pim",
          "title": "Azure PIM (Privileged Identity Management)"
        },
        {
          "id": "azure-entra-id",
          "title": "Microsoft Entra ID Governance"
        },
        {
          "id": "gcp-iam-recommender",
          "title": "GCP IAM Recommender & Policy Intelligence"
        },
        {
          "id": "sailpoint-identitynow",
          "title": "SailPoint IdentityNow"
        },
        {
          "id": "okta-identity-governance",
          "title": "Okta Identity Governance"
        },
        {
          "id": "cyberark-pam",
          "title": "CyberArk PAM"
        },
        {
          "id": "beyondtrust-pam",
          "title": "BeyondTrust PAM"
        },
        {
          "id": "delinea-thycotic",
          "title": "Delinea (Thycotic)"
        },
        {
          "id": "hashicorp-boundary",
          "title": "HashiCorp Boundary"
        },
        {
          "id": "teleport-iam",
          "title": "Teleport (Access Plane)"
        },
        {
          "id": "strongdm",
          "title": "StrongDM"
        }
      ]
    }
  ],
  "observability-fundamentals": [
    {
      "id": "k8s-debugging-tools",
      "title": "Kubernetes Debugging & Live-Ops Tools",
      "leaves": [
        {
          "id": "coroot",
          "title": "Coroot"
        },
        {
          "id": "komodor",
          "title": "Komodor"
        },
        {
          "id": "robusta-dev",
          "title": "Robusta"
        },
        {
          "id": "kubeshark",
          "title": "Kubeshark"
        },
        {
          "id": "kubectl-debug",
          "title": "kubectl debug"
        },
        {
          "id": "crane-tool",
          "title": "Crane (go-containerregistry)"
        },
        {
          "id": "kubescape-cli",
          "title": "Kubescape"
        },
        {
          "id": "inspektor-gadget-cross",
          "title": "Inspektor Gadget (Cross-Reference)"
        }
      ]
    },
    {
      "id": "observability-fundamentals--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "monitoring-vs-observability",
          "title": "Monitoring vs Observability"
        }
      ]
    },
    {
      "id": "pillars-of-observability",
      "title": "Pillars of Observability",
      "leaves": [
        {
          "id": "pillar-metrics",
          "title": "Metrics"
        },
        {
          "id": "pillar-logs",
          "title": "Logs"
        },
        {
          "id": "pillar-traces",
          "title": "Traces"
        },
        {
          "id": "pillar-events",
          "title": "Events"
        },
        {
          "id": "pillar-profiles",
          "title": "Continuous Profiles"
        }
      ]
    },
    {
      "id": "observability-fundamentals--concepts-history-comparisons-4",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "observability-vs-telemetry",
          "title": "Observability vs Telemetry"
        },
        {
          "id": "black-box-vs-white-box",
          "title": "Black-Box vs White-Box Monitoring"
        }
      ]
    },
    {
      "id": "monitoring-methods",
      "title": "Monitoring Methods",
      "leaves": [
        {
          "id": "use-method",
          "title": "USE Method (Utilization, Saturation, Errors)"
        },
        {
          "id": "red-method",
          "title": "RED Method (Rate, Errors, Duration)"
        },
        {
          "id": "four-golden-signals",
          "title": "Four Golden Signals"
        }
      ]
    },
    {
      "id": "observability-fundamentals--core-linux-systems",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "observability-slo-link",
          "title": "Observability ↔ SLOs"
        },
        {
          "id": "cardinality-concept",
          "title": "Cardinality"
        }
      ]
    },
    {
      "id": "sampling-strategies-overview",
      "title": "Sampling Strategies (Overview)",
      "leaves": [
        {
          "id": "head-based-sampling",
          "title": "Head-Based Sampling"
        },
        {
          "id": "tail-based-sampling",
          "title": "Tail-Based Sampling"
        },
        {
          "id": "probability-sampling",
          "title": "Probability Sampling"
        },
        {
          "id": "rate-limiting-sampling",
          "title": "Rate-Limiting Sampling"
        }
      ]
    },
    {
      "id": "observability-fundamentals--high-cardinality-metrics-related-topics",
      "title": "High-Cardinality Metrics & Related Topics",
      "leaves": [
        {
          "id": "high-cardinality-metrics",
          "title": "High-Cardinality Metrics"
        },
        {
          "id": "push-vs-pull-metrics",
          "title": "Push vs Pull Metric Collection"
        },
        {
          "id": "tsdb-concept",
          "title": "Time Series Databases (Concept)"
        },
        {
          "id": "observability-data-lifecycle",
          "title": "Observability Data Lifecycle"
        },
        {
          "id": "telemetry-pipelines",
          "title": "Telemetry Pipelines"
        },
        {
          "id": "cost-of-observability",
          "title": "Cost of Observability"
        }
      ]
    },
    {
      "id": "observability-fundamentals--observability-for-serverless-related-topics",
      "title": "Observability for Serverless & Related Topics",
      "leaves": [
        {
          "id": "observability-serverless",
          "title": "Observability for Serverless"
        },
        {
          "id": "observability-microservices",
          "title": "Observability for Microservices"
        },
        {
          "id": "sli-burn-rate-alerts",
          "title": "Burn-Rate Alerting (Multi-Window, Multi-Burn-Rate)"
        },
        {
          "id": "ebpf-for-observability",
          "title": "eBPF for Observability"
        }
      ]
    }
  ],
  "api-gateways": [
    {
      "id": "modern-api-tooling",
      "title": "Modern API Tooling (Protobuf, Connect, Smithy)",
      "leaves": [
        {
          "id": "buf-build",
          "title": "Buf CLI & Schema Registry"
        },
        {
          "id": "connect-rpc",
          "title": "Connect RPC (Buf)"
        },
        {
          "id": "smithy-cli",
          "title": "Smithy (AWS API Model)"
        },
        {
          "id": "grpc-web",
          "title": "gRPC-Web"
        },
        {
          "id": "twirp-protocol",
          "title": "Twirp"
        },
        {
          "id": "protoc-gen-tools",
          "title": "protoc / protoc-gen plugins"
        },
        {
          "id": "asyncapi-generator",
          "title": "AsyncAPI Generator"
        },
        {
          "id": "openapi-generator-cli",
          "title": "OpenAPI Generator CLI"
        }
      ]
    },
    {
      "id": "api-gateways--api-gateway-fundamentals-related-topics",
      "title": "API Gateway Fundamentals & Related Topics",
      "leaves": [
        {
          "id": "api-gateway-fundamentals",
          "title": "API Gateway Fundamentals"
        },
        {
          "id": "api-gateway-patterns",
          "title": "API Gateway Patterns (BFF, Aggregator, Edge)"
        }
      ]
    },
    {
      "id": "cloud-managed-api-gateways",
      "title": "Cloud-Managed API Gateways (Overview)",
      "leaves": [
        {
          "id": "aws-api-gateway-overview",
          "title": "AWS API Gateway"
        },
        {
          "id": "azure-api-management-overview",
          "title": "Azure API Management"
        },
        {
          "id": "google-apigee-overview",
          "title": "Google Apigee"
        },
        {
          "id": "google-cloud-endpoints",
          "title": "Google Cloud Endpoints"
        }
      ]
    },
    {
      "id": "open-source-api-gateways",
      "title": "Open-Source API Gateways",
      "leaves": [
        {
          "id": "kong-gateway",
          "title": "Kong Gateway"
        },
        {
          "id": "tyk-gateway",
          "title": "Tyk"
        },
        {
          "id": "krakend",
          "title": "KrakenD"
        },
        {
          "id": "apache-apisix",
          "title": "Apache APISIX"
        },
        {
          "id": "traefik-gateway",
          "title": "Traefik (Gateway Role)"
        },
        {
          "id": "envoy-gateway",
          "title": "Envoy Gateway"
        },
        {
          "id": "emissary-ingress",
          "title": "Emissary Ingress (Ambassador)"
        },
        {
          "id": "gloo-gateway",
          "title": "Solo.io Gloo Gateway"
        },
        {
          "id": "wso2-api-manager",
          "title": "WSO2 API Manager"
        },
        {
          "id": "goku-api-gateway",
          "title": "Goku API Gateway"
        }
      ]
    },
    {
      "id": "api-gateway-features",
      "title": "API Gateway Features",
      "leaves": [
        {
          "id": "rate-limiting-gateway",
          "title": "Rate Limiting & Throttling"
        },
        {
          "id": "gateway-authentication",
          "title": "Authentication & Authorization"
        },
        {
          "id": "request-response-transformation",
          "title": "Request / Response Transformation"
        },
        {
          "id": "gateway-caching",
          "title": "Response Caching"
        },
        {
          "id": "api-composition",
          "title": "API Composition & Aggregation"
        },
        {
          "id": "gateway-webhooks",
          "title": "Webhooks"
        },
        {
          "id": "api-versioning",
          "title": "API Versioning"
        },
        {
          "id": "developer-portals",
          "title": "Developer Portals"
        },
        {
          "id": "gateway-analytics",
          "title": "Analytics & Monetization"
        },
        {
          "id": "gateway-cors",
          "title": "CORS & Header Management"
        }
      ]
    },
    {
      "id": "api-specifications",
      "title": "API Specifications & Design",
      "leaves": [
        {
          "id": "openapi-swagger",
          "title": "OpenAPI / Swagger"
        },
        {
          "id": "asyncapi",
          "title": "AsyncAPI"
        },
        {
          "id": "graphql-gateway",
          "title": "GraphQL Gateway"
        },
        {
          "id": "grpc-gateway",
          "title": "gRPC Gateway"
        },
        {
          "id": "json-rpc-spec",
          "title": "JSON-RPC"
        }
      ]
    },
    {
      "id": "api-gateways--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "api-gateway-vs-service-mesh",
          "title": "API Gateway vs Service Mesh vs Ingress"
        },
        {
          "id": "gateway-api-spec",
          "title": "Kubernetes Gateway API (Spec)"
        }
      ]
    }
  ],
  "runtime-security": [
    {
      "id": "detection-engineering",
      "title": "Detection Engineering",
      "leaves": [
        {
          "id": "sigma-rules",
          "title": "Sigma Rules"
        },
        {
          "id": "yara-rules",
          "title": "YARA Rules"
        },
        {
          "id": "atomic-red-team",
          "title": "Atomic Red Team (Red Canary)"
        },
        {
          "id": "mitre-caldera",
          "title": "MITRE CALDERA"
        },
        {
          "id": "stratus-red-team",
          "title": "Stratus Red Team (DataDog)"
        },
        {
          "id": "mitre-attack-framework",
          "title": "MITRE ATT&CK Framework"
        },
        {
          "id": "mitre-d3fend",
          "title": "MITRE D3FEND"
        },
        {
          "id": "osquery-detection",
          "title": "osquery (Detection)"
        },
        {
          "id": "velociraptor-dfir",
          "title": "Velociraptor (DFIR)"
        }
      ]
    },
    {
      "id": "runtime-security--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "runtime-security-definition",
          "title": "Runtime Security Definition"
        },
        {
          "id": "behavioral-detection",
          "title": "Behavioral Detection"
        }
      ]
    },
    {
      "id": "falco",
      "title": "Falco",
      "leaves": [
        {
          "id": "falco-rules-engine",
          "title": "Rules Engine"
        },
        {
          "id": "falco-plugins",
          "title": "Plugins"
        },
        {
          "id": "falco-sidekick",
          "title": "Falco Sidekick"
        },
        {
          "id": "falco-talon",
          "title": "Falco Talon (Response)"
        }
      ]
    },
    {
      "id": "runtime-security--tetragon-isovalent-ebpf-related-topics",
      "title": "Tetragon (Isovalent eBPF) & Related Topics",
      "leaves": [
        {
          "id": "tetragon-runtime",
          "title": "Tetragon (Isovalent eBPF)"
        },
        {
          "id": "tracee-aqua",
          "title": "Tracee (Aqua)"
        },
        {
          "id": "sysdig-secure-runtime",
          "title": "Sysdig Secure"
        },
        {
          "id": "red-hat-acs-runtime",
          "title": "Red Hat ACS / StackRox"
        },
        {
          "id": "aqua-runtime",
          "title": "Aqua Runtime Protection"
        },
        {
          "id": "prisma-runtime",
          "title": "Prisma Cloud Runtime"
        }
      ]
    },
    {
      "id": "runtime-security--wiz-runtime-sensor-related-topics",
      "title": "Wiz Runtime Sensor & Related Topics",
      "leaves": [
        {
          "id": "wiz-runtime-sensor",
          "title": "Wiz Runtime Sensor"
        },
        {
          "id": "anomaly-detection-runtime",
          "title": "Anomaly Detection"
        },
        {
          "id": "file-integrity-monitoring",
          "title": "File Integrity Monitoring (FIM)"
        },
        {
          "id": "hids",
          "title": "HIDS (Host Intrusion Detection)"
        },
        {
          "id": "wazuh-hids",
          "title": "Wazuh"
        },
        {
          "id": "ossec-hids",
          "title": "OSSEC"
        }
      ]
    },
    {
      "id": "xdr-platforms",
      "title": "XDR Platforms",
      "leaves": [
        {
          "id": "crowdstrike-falcon-xdr",
          "title": "CrowdStrike Falcon XDR"
        },
        {
          "id": "palo-alto-cortex-xdr",
          "title": "Palo Alto Cortex XDR"
        },
        {
          "id": "microsoft-defender-xdr",
          "title": "Microsoft Defender XDR"
        },
        {
          "id": "sentinelone-singularity",
          "title": "SentinelOne Singularity"
        },
        {
          "id": "trellix-xdr",
          "title": "Trellix XDR"
        },
        {
          "id": "sophos-xdr",
          "title": "Sophos XDR"
        },
        {
          "id": "cybereason-xdr",
          "title": "Cybereason XDR"
        }
      ]
    },
    {
      "id": "confidential-computing",
      "title": "Confidential Computing",
      "leaves": [
        {
          "id": "aws-nitro-enclaves",
          "title": "AWS Nitro Enclaves"
        },
        {
          "id": "intel-sgx",
          "title": "Intel SGX"
        },
        {
          "id": "intel-tdx",
          "title": "Intel TDX"
        },
        {
          "id": "amd-sev-snp",
          "title": "AMD SEV-SNP"
        },
        {
          "id": "arm-cca",
          "title": "ARM CCA (Realm Management Extension)"
        },
        {
          "id": "azure-confidential-vm",
          "title": "Azure Confidential VMs"
        },
        {
          "id": "azure-confidential-containers",
          "title": "Azure Confidential Containers (AKS)"
        },
        {
          "id": "gcp-confidential-vm",
          "title": "GCP Confidential VMs"
        },
        {
          "id": "gke-confidential-nodes",
          "title": "GKE Confidential Nodes"
        },
        {
          "id": "coco-cncf",
          "title": "Confidential Containers (CoCo) — CNCF Sandbox"
        },
        {
          "id": "occlum-tee",
          "title": "Occlum (LibOS for SGX)"
        },
        {
          "id": "gramine-tee",
          "title": "Gramine (LibOS)"
        },
        {
          "id": "open-enclave-sdk",
          "title": "Open Enclave SDK"
        },
        {
          "id": "enarx-wasm-tee",
          "title": "Enarx (WASM in TEEs)"
        }
      ]
    }
  ],
  "continuous-learning": [
    {
      "id": "devops-standards-bodies",
      "title": "DevOps Standards & Foundations",
      "leaves": [
        {
          "id": "cdf-foundation",
          "title": "CD Foundation (CDF)"
        },
        {
          "id": "openssf-cross-ref-continuous",
          "title": "OpenSSF (Cross-Reference)"
        },
        {
          "id": "cncf-cross-ref-continuous",
          "title": "CNCF (Cross-Reference)"
        },
        {
          "id": "openinfra-foundation",
          "title": "OpenInfra Foundation"
        },
        {
          "id": "iso-iec-jtc1-sc42",
          "title": "ISO/IEC JTC 1/SC 42 (AI)"
        },
        {
          "id": "eclipse-foundation-edge",
          "title": "Eclipse Foundation"
        },
        {
          "id": "finops-foundation-cross",
          "title": "FinOps Foundation (Cross-Reference)"
        },
        {
          "id": "cloud-security-alliance",
          "title": "Cloud Security Alliance (CSA)"
        },
        {
          "id": "open-application-model-org",
          "title": "OAM Community"
        },
        {
          "id": "agile-alliance",
          "title": "Agile Alliance"
        }
      ]
    },
    {
      "id": "conferences-devops",
      "title": "Conferences",
      "leaves": [
        {
          "id": "kubecon-cloudnativecon",
          "title": "KubeCon + CloudNativeCon"
        },
        {
          "id": "devops-days",
          "title": "DevOpsDays"
        },
        {
          "id": "devops-enterprise-summit",
          "title": "DevOps Enterprise Summit"
        },
        {
          "id": "srecon-usenix",
          "title": "SREcon (USENIX)"
        },
        {
          "id": "devopsworld",
          "title": "DevOps World"
        },
        {
          "id": "hashiconf",
          "title": "HashiConf"
        },
        {
          "id": "platformcon",
          "title": "PlatformCon"
        },
        {
          "id": "gitops-con",
          "title": "GitOpsCon"
        },
        {
          "id": "observabilitycon",
          "title": "ObservabilityCON"
        },
        {
          "id": "re-invent-devops",
          "title": "AWS re:Invent / re:Inforce"
        },
        {
          "id": "google-cloud-next",
          "title": "Google Cloud Next"
        },
        {
          "id": "microsoft-build-ignite",
          "title": "Microsoft Build / Ignite"
        }
      ]
    },
    {
      "id": "devops-blogs-newsletters",
      "title": "Blogs & Newsletters",
      "leaves": [
        {
          "id": "cncf-blog",
          "title": "CNCF Blog"
        },
        {
          "id": "sre-weekly",
          "title": "SRE Weekly"
        },
        {
          "id": "devops-weekly",
          "title": "DevOps Weekly"
        },
        {
          "id": "kubernetes-blog",
          "title": "Kubernetes Blog"
        },
        {
          "id": "platform-weekly",
          "title": "Platform Weekly"
        },
        {
          "id": "last-week-in-aws",
          "title": "Last Week in AWS"
        },
        {
          "id": "cloud-native-now",
          "title": "Cloud Native Now"
        },
        {
          "id": "devops-com",
          "title": "DevOps.com"
        },
        {
          "id": "gradient-flow",
          "title": "Gradient Flow (MLOps)"
        }
      ]
    },
    {
      "id": "devops-podcasts",
      "title": "Podcasts",
      "leaves": [
        {
          "id": "kubernetes-podcast",
          "title": "Kubernetes Podcast (Google)"
        },
        {
          "id": "the-cloudcast",
          "title": "The Cloudcast"
        },
        {
          "id": "arrested-devops",
          "title": "Arrested DevOps"
        },
        {
          "id": "devops-cafe",
          "title": "DevOps Cafe"
        },
        {
          "id": "sre-prodcast",
          "title": "Google SRE Prodcast"
        },
        {
          "id": "platform-engineering-podcast",
          "title": "Platform Engineering Podcast"
        },
        {
          "id": "gradient-dissent",
          "title": "Gradient Dissent (MLOps)"
        }
      ]
    },
    {
      "id": "devops-books",
      "title": "Foundational Books",
      "leaves": [
        {
          "id": "phoenix-project-book",
          "title": "The Phoenix Project"
        },
        {
          "id": "unicorn-project-book",
          "title": "The Unicorn Project"
        },
        {
          "id": "devops-handbook-book",
          "title": "The DevOps Handbook"
        },
        {
          "id": "accelerate-book",
          "title": "Accelerate (Forsgren, Humble, Kim)"
        },
        {
          "id": "sre-book",
          "title": "Site Reliability Engineering (Google)"
        },
        {
          "id": "sre-workbook-book",
          "title": "The SRE Workbook"
        },
        {
          "id": "seeking-sre-book",
          "title": "Seeking SRE"
        },
        {
          "id": "team-topologies-book",
          "title": "Team Topologies"
        },
        {
          "id": "continuous-delivery-book",
          "title": "Continuous Delivery (Humble & Farley)"
        },
        {
          "id": "release-it-book",
          "title": "Release It! (Michael Nygard)"
        },
        {
          "id": "platform-engineering-book",
          "title": "Platform Engineering on Kubernetes"
        },
        {
          "id": "designing-data-intensive-apps",
          "title": "Designing Data-Intensive Applications"
        },
        {
          "id": "kim-mark-the-goal",
          "title": "The Goal (Goldratt)"
        }
      ]
    },
    {
      "id": "continuous-learning--open-source-contributions-related-topics",
      "title": "Open Source Contributions & Related Topics",
      "leaves": [
        {
          "id": "open-source-contribution",
          "title": "Open Source Contributions"
        },
        {
          "id": "mentoring-being-mentored",
          "title": "Mentoring / Being Mentored"
        },
        {
          "id": "learning-roadmaps",
          "title": "Online Learning Roadmaps (roadmap.sh, etc.)"
        }
      ]
    },
    {
      "id": "devops-mooc-platforms",
      "title": "MOOC & Hands-On Platforms",
      "leaves": [
        {
          "id": "kodekloud",
          "title": "KodeKloud"
        },
        {
          "id": "a-cloud-guru",
          "title": "A Cloud Guru / Pluralsight"
        },
        {
          "id": "linux-foundation-training",
          "title": "Linux Foundation Training"
        },
        {
          "id": "killercoda",
          "title": "Killercoda"
        },
        {
          "id": "instruqt",
          "title": "Instruqt"
        },
        {
          "id": "iximiuz-labs",
          "title": "iximiuz Labs"
        },
        {
          "id": "play-with-k8s-docker",
          "title": "Play with Kubernetes / Docker"
        },
        {
          "id": "qwiklabs-skill-boost",
          "title": "Google Cloud Skills Boost (Qwiklabs)"
        },
        {
          "id": "acg-microsoft-learn",
          "title": "Microsoft Learn"
        },
        {
          "id": "aws-skill-builder",
          "title": "AWS Skill Builder"
        }
      ]
    },
    {
      "id": "continuous-learning--communities-cncf-slack-reddit-discord",
      "title": "Communities (CNCF Slack, Reddit, Discord)",
      "leaves": [
        {
          "id": "communities-slack-discord",
          "title": "Communities (CNCF Slack, Reddit, Discord)"
        }
      ]
    }
  ],
  "python-for-devops": [
    {
      "id": "python-fundamentals-devops",
      "title": "Python Fundamentals for DevOps",
      "leaves": [
        {
          "id": "python-syntax-basics",
          "title": "Python Syntax & Data Structures"
        },
        {
          "id": "python-virtualenv-uv",
          "title": "venv, pip & uv Package Management"
        },
        {
          "id": "python-cli-argparse",
          "title": "CLI Scripts with argparse & typer"
        },
        {
          "id": "python-file-io-json",
          "title": "File I/O, JSON & YAML in Python"
        },
        {
          "id": "python-subprocess",
          "title": "subprocess & Shelling Out"
        },
        {
          "id": "python-requests-httpx",
          "title": "HTTP Clients (requests & httpx)"
        }
      ]
    },
    {
      "id": "python-automation-libraries",
      "title": "Python Automation Libraries",
      "leaves": [
        {
          "id": "boto3-aws-sdk",
          "title": "boto3 (AWS SDK)"
        },
        {
          "id": "azure-sdk-python",
          "title": "Azure SDK for Python"
        },
        {
          "id": "google-cloud-python",
          "title": "Google Cloud Client Libraries"
        },
        {
          "id": "kubernetes-python-client",
          "title": "kubernetes Python Client"
        },
        {
          "id": "docker-sdk-python",
          "title": "Docker SDK for Python"
        },
        {
          "id": "fabric-invoke",
          "title": "Fabric & Invoke (Remote Execution)"
        },
        {
          "id": "paramiko-ssh",
          "title": "Paramiko (SSH)"
        }
      ]
    },
    {
      "id": "python-iac-testing",
      "title": "Python for IaC & Testing",
      "leaves": [
        {
          "id": "pulumi-python",
          "title": "Pulumi with Python"
        },
        {
          "id": "cdk-python",
          "title": "AWS CDK with Python"
        },
        {
          "id": "pytest-devops",
          "title": "pytest for Infrastructure Tests"
        },
        {
          "id": "molecule-python",
          "title": "Molecule (Ansible Testing)"
        },
        {
          "id": "checkov-python-rules",
          "title": "Writing Custom Checkov Policies"
        }
      ]
    },
    {
      "id": "python-observability-data",
      "title": "Python for Observability & Data",
      "leaves": [
        {
          "id": "opentelemetry-python",
          "title": "OpenTelemetry Python SDK"
        },
        {
          "id": "pandas-ops-data",
          "title": "pandas for Ops Data Analysis"
        },
        {
          "id": "structlog-python",
          "title": "Structured Logging (structlog)"
        },
        {
          "id": "fastapi-internal-tools",
          "title": "FastAPI for Internal Tools"
        }
      ]
    }
  ],
  "typescript-for-devops": [
    {
      "id": "typescript-fundamentals-devops",
      "title": "TypeScript Fundamentals for DevOps",
      "leaves": [
        {
          "id": "typescript-node-basics",
          "title": "TypeScript & Node.js Basics"
        },
        {
          "id": "npm-pnpm-bun",
          "title": "npm, pnpm & Bun Package Managers"
        },
        {
          "id": "tsx-deno-runtime",
          "title": "tsx, ts-node & Deno Runtimes"
        },
        {
          "id": "typescript-cli-oclif",
          "title": "CLI Tools with oclif & commander"
        }
      ]
    },
    {
      "id": "typescript-iac-platform",
      "title": "TypeScript for IaC & Platform",
      "leaves": [
        {
          "id": "pulumi-typescript",
          "title": "Pulumi with TypeScript"
        },
        {
          "id": "aws-cdk-typescript",
          "title": "AWS CDK with TypeScript"
        },
        {
          "id": "cdktf-typescript",
          "title": "CDK for Terraform (CDKTF) TypeScript"
        },
        {
          "id": "projen-typescript",
          "title": "Projen (Project Generators)"
        },
        {
          "id": "sst-ion",
          "title": "SST (Serverless Stack)"
        }
      ]
    },
    {
      "id": "typescript-testing-tooling",
      "title": "TypeScript Testing & Tooling",
      "leaves": [
        {
          "id": "vitest-jest-devops",
          "title": "Vitest & Jest for Tooling Tests"
        },
        {
          "id": "playwright-api-testing",
          "title": "Playwright for API Testing"
        },
        {
          "id": "zod-config-validation",
          "title": "Zod for Config Validation"
        },
        {
          "id": "changesets-monorepo",
          "title": "Changesets for Monorepo Releases"
        }
      ]
    }
  ],
  "testing-quality-pipelines": [
    {
      "id": "test-pyramid-ci",
      "title": "Test Pyramid in CI Pipelines",
      "leaves": [
        {
          "id": "unit-tests-ci",
          "title": "Unit Tests in CI"
        },
        {
          "id": "integration-tests-ci",
          "title": "Integration Tests in CI"
        },
        {
          "id": "e2e-tests-ci",
          "title": "End-to-End Tests in CI"
        },
        {
          "id": "smoke-sanity-ci",
          "title": "Smoke & Sanity Test Gates"
        },
        {
          "id": "test-parallelization-sharding",
          "title": "Test Parallelization & Sharding"
        },
        {
          "id": "flaky-test-management",
          "title": "Flaky Test Detection & Quarantine"
        }
      ]
    },
    {
      "id": "quality-gates-ci",
      "title": "Quality Gates & Policy in Pipelines",
      "leaves": [
        {
          "id": "code-coverage-gates",
          "title": "Code Coverage Thresholds"
        },
        {
          "id": "mutation-testing-ci",
          "title": "Mutation Testing (Stryker, PIT)"
        },
        {
          "id": "sonarqube-quality-gate",
          "title": "SonarQube Quality Gates"
        },
        {
          "id": "codecov-coveralls",
          "title": "Codecov & Coveralls"
        },
        {
          "id": "pr-quality-checks",
          "title": "PR Quality Checks & Required Status"
        }
      ]
    },
    {
      "id": "contract-mutation-testing",
      "title": "Contract & API Testing in CI",
      "leaves": [
        {
          "id": "pact-contract-testing",
          "title": "Pact Contract Testing"
        },
        {
          "id": "schemathesis-api",
          "title": "Schemathesis (OpenAPI Fuzzing)"
        },
        {
          "id": "dredd-api-testing",
          "title": "Dredd API Testing"
        },
        {
          "id": "postman-newman-ci",
          "title": "Postman & Newman in CI"
        },
        {
          "id": "karate-api-testing",
          "title": "Karate (API Test Framework)"
        }
      ]
    },
    {
      "id": "test-environments-data",
      "title": "Test Environments & Data in CI",
      "leaves": [
        {
          "id": "ephemeral-test-envs",
          "title": "Ephemeral Test Environments"
        },
        {
          "id": "testcontainers",
          "title": "Testcontainers"
        },
        {
          "id": "service-virtualization",
          "title": "Service Virtualization (WireMock, Mountebank)"
        },
        {
          "id": "synthetic-test-data-ci",
          "title": "Synthetic & Anonymized Test Data"
        }
      ]
    }
  ],
  "performance-engineering": [
    {
      "id": "load-testing-fundamentals",
      "title": "Load & Performance Testing Fundamentals",
      "leaves": [
        {
          "id": "performance-test-types",
          "title": "Load, Stress, Spike & Soak Tests"
        },
        {
          "id": "performance-slas-nfrs",
          "title": "Performance SLAs & NFRs"
        },
        {
          "id": "workload-modelling",
          "title": "Workload Modelling & Traffic Patterns"
        },
        {
          "id": "performance-test-environments",
          "title": "Performance Test Environments"
        }
      ]
    },
    {
      "id": "load-testing-tools",
      "title": "Load Testing Tools",
      "leaves": [
        {
          "id": "grafana-k6-deep",
          "title": "Grafana k6 (Scripting & Cloud)"
        },
        {
          "id": "locust-python-load",
          "title": "Locust"
        },
        {
          "id": "jmeter-load",
          "title": "Apache JMeter"
        },
        {
          "id": "gatling-load",
          "title": "Gatling"
        },
        {
          "id": "artillery-load",
          "title": "Artillery"
        },
        {
          "id": "vegeta-load",
          "title": "Vegeta"
        },
        {
          "id": "hey-load",
          "title": "hey (HTTP Load Generator)"
        }
      ]
    },
    {
      "id": "performance-analysis",
      "title": "Performance Analysis & Optimization",
      "leaves": [
        {
          "id": "apm-performance-analysis",
          "title": "APM-Driven Performance Analysis"
        },
        {
          "id": "flame-graphs-perf",
          "title": "Flame Graphs & Profiling for Perf"
        },
        {
          "id": "database-query-tuning",
          "title": "Database Query Performance Tuning"
        },
        {
          "id": "cdn-edge-performance",
          "title": "CDN & Edge Performance Optimization"
        },
        {
          "id": "performance-regression-ci",
          "title": "Performance Regression in CI"
        }
      ]
    }
  ],
  "disaster-recovery-bcp": [
    {
      "id": "dr-fundamentals",
      "title": "Disaster Recovery Fundamentals",
      "leaves": [
        {
          "id": "rto-rpo-deep",
          "title": "RTO, RPO & Recovery Objectives"
        },
        {
          "id": "backup-strategies-dr",
          "title": "Backup Strategies (3-2-1, Immutable)"
        },
        {
          "id": "recovery-tiering",
          "title": "Recovery Tiering & Criticality Classes"
        },
        {
          "id": "dr-runbooks",
          "title": "DR Runbooks & Playbooks"
        }
      ]
    },
    {
      "id": "bcp-planning",
      "title": "Business Continuity Planning",
      "leaves": [
        {
          "id": "bcp-framework",
          "title": "BCP Framework & ISO 22301"
        },
        {
          "id": "crisis-communication-dr",
          "title": "Crisis Communication During Outages"
        },
        {
          "id": "failover-failback",
          "title": "Failover & Failback Procedures"
        },
        {
          "id": "geographic-redundancy",
          "title": "Geographic Redundancy & Multi-Region DR"
        }
      ]
    },
    {
      "id": "dr-patterns-tools",
      "title": "DR Patterns & Cloud Tools",
      "leaves": [
        {
          "id": "active-active-dr",
          "title": "Active-Active & Active-Passive DR"
        },
        {
          "id": "pilot-light-warm-standby",
          "title": "Pilot Light, Warm Standby & Cold DR"
        },
        {
          "id": "velero-k8s-backup",
          "title": "Velero (Kubernetes Backup)"
        },
        {
          "id": "aws-dr-services",
          "title": "AWS DR (Route 53, DRS, Backup)"
        },
        {
          "id": "azure-site-recovery",
          "title": "Azure Site Recovery"
        },
        {
          "id": "gcp-dr-services",
          "title": "GCP DR & Backup Services"
        }
      ]
    },
    {
      "id": "dr-testing-exercises",
      "title": "DR Testing & Exercises",
      "leaves": [
        {
          "id": "dr-drills-tabletop",
          "title": "Tabletop & DR Drills"
        },
        {
          "id": "chaos-for-dr",
          "title": "Chaos Engineering for DR Validation"
        },
        {
          "id": "dr-test-cadence",
          "title": "DR Test Cadence & Compliance Evidence"
        }
      ]
    }
  ],
  "observability-profiling": [
    {
      "id": "profiling-fundamentals",
      "title": "Continuous Profiling Fundamentals",
      "leaves": [
        {
          "id": "cpu-memory-profiling",
          "title": "CPU & Memory Profiling Concepts"
        },
        {
          "id": "sampling-vs-instrumentation",
          "title": "Sampling vs Instrumentation Profilers"
        },
        {
          "id": "profiling-production-safety",
          "title": "Production-Safe Profiling"
        },
        {
          "id": "profiling-otel-integration",
          "title": "Profiling & OpenTelemetry Integration"
        }
      ]
    },
    {
      "id": "profiling-platforms",
      "title": "Profiling Platforms & Tools",
      "leaves": [
        {
          "id": "grafana-pyroscope-deep",
          "title": "Grafana Pyroscope"
        },
        {
          "id": "parca-continuous",
          "title": "Parca"
        },
        {
          "id": "google-cloud-profiler",
          "title": "Google Cloud Profiler"
        },
        {
          "id": "datadog-profiler",
          "title": "Datadog Continuous Profiler"
        },
        {
          "id": "elastic-universal-profiling",
          "title": "Elastic Universal Profiling"
        },
        {
          "id": "async-profiler-java",
          "title": "Async Profiler (JVM)"
        },
        {
          "id": "pprof-go",
          "title": "pprof (Go)"
        }
      ]
    },
    {
      "id": "ebpf-profiling",
      "title": "eBPF-Based Profiling",
      "leaves": [
        {
          "id": "bpftrace-profiling",
          "title": "bpftrace for Ad-Hoc Profiling"
        },
        {
          "id": "pixie-profiling",
          "title": "Pixie (Auto-Profiling)"
        },
        {
          "id": "otel-ebpf-profiler",
          "title": "OpenTelemetry eBPF Profiler"
        }
      ]
    }
  ],
  "itsm-service-management": [
    {
      "id": "itsm-fundamentals",
      "title": "ITSM Fundamentals for DevOps",
      "leaves": [
        {
          "id": "itil4-devops",
          "title": "ITIL 4 & DevOps Integration"
        },
        {
          "id": "incident-problem-change",
          "title": "Incident, Problem & Change Management"
        },
        {
          "id": "cmdb-service-catalog",
          "title": "CMDB & Service Catalog"
        },
        {
          "id": "sla-ola-uc",
          "title": "SLA, OLA & Underpinning Contracts"
        }
      ]
    },
    {
      "id": "itsm-platforms",
      "title": "ITSM Platforms",
      "leaves": [
        {
          "id": "servicenow-itsm",
          "title": "ServiceNow ITSM"
        },
        {
          "id": "jira-service-management",
          "title": "Jira Service Management"
        },
        {
          "id": "freshservice-itsm",
          "title": "Freshservice"
        },
        {
          "id": "bmc-helix-itsm",
          "title": "BMC Helix ITSM"
        },
        {
          "id": "pagerduty-service-catalog",
          "title": "PagerDuty Service Catalog"
        }
      ]
    },
    {
      "id": "chatops-platforms",
      "title": "ChatOps & Collaboration Platforms",
      "leaves": [
        {
          "id": "slack-chatops",
          "title": "Slack ChatOps (Workflows & Apps)"
        },
        {
          "id": "microsoft-teams-ops",
          "title": "Microsoft Teams for Ops"
        },
        {
          "id": "mattermost-chatops",
          "title": "Mattermost"
        },
        {
          "id": "discord-ops-bots",
          "title": "Discord Ops Bots"
        },
        {
          "id": "incident-io-chatops",
          "title": "incident.io ChatOps"
        }
      ]
    }
  ],
  "cloud-provider-fundamentals": [
    {
      "id": "cloud-shared-responsibility",
      "title": "Cloud Shared Responsibility & Models",
      "leaves": [
        {
          "id": "shared-responsibility-model",
          "title": "Shared Responsibility Model"
        },
        {
          "id": "cloud-deployment-models-deep",
          "title": "Public, Private, Hybrid & Sovereign Cloud"
        },
        {
          "id": "cloud-regions-availability",
          "title": "Regions, AZs & Availability Domains"
        },
        {
          "id": "cloud-well-architected-agnostic",
          "title": "Well-Architected Principles (Cloud-Agnostic)"
        }
      ]
    },
    {
      "id": "cloud-identity-networking-basics",
      "title": "Cloud Identity & Networking Basics",
      "leaves": [
        {
          "id": "cloud-iam-fundamentals",
          "title": "Cloud IAM Fundamentals"
        },
        {
          "id": "cloud-vpc-networking-basics",
          "title": "VPC / VNet / VPC Networking Basics"
        },
        {
          "id": "cloud-storage-types",
          "title": "Object, Block & File Storage Types"
        },
        {
          "id": "cloud-managed-services-catalog",
          "title": "Managed Services vs Self-Managed"
        }
      ]
    },
    {
      "id": "cloud-provider-landscape",
      "title": "Major Cloud Provider Landscape",
      "leaves": [
        {
          "id": "aws-overview-devops",
          "title": "AWS for DevOps (Overview)"
        },
        {
          "id": "azure-overview-devops",
          "title": "Azure for DevOps (Overview)"
        },
        {
          "id": "gcp-overview-devops",
          "title": "GCP for DevOps (Overview)"
        },
        {
          "id": "oracle-ibm-cloud-overview",
          "title": "Oracle Cloud & IBM Cloud (Overview)"
        },
        {
          "id": "digitalocean-linode-vultr",
          "title": "DigitalOcean, Linode & Vultr"
        }
      ]
    }
  ],
  "event-streaming-messaging": [
    {
      "id": "messaging-fundamentals",
      "title": "Event-Driven & Messaging Fundamentals",
      "leaves": [
        {
          "id": "pub-sub-patterns",
          "title": "Pub/Sub & Event-Driven Patterns"
        },
        {
          "id": "message-queues-vs-streams",
          "title": "Message Queues vs Event Streams"
        },
        {
          "id": "event-schema-evolution",
          "title": "Event Schema & Evolution (Avro, Protobuf)"
        },
        {
          "id": "dead-letter-queues",
          "title": "Dead Letter Queues & Retry Patterns"
        }
      ]
    },
    {
      "id": "kafka-ecosystem",
      "title": "Apache Kafka Ecosystem",
      "leaves": [
        {
          "id": "kafka-fundamentals-ops",
          "title": "Kafka Fundamentals for Operators"
        },
        {
          "id": "kafka-connect",
          "title": "Kafka Connect"
        },
        {
          "id": "kafka-streams-ops",
          "title": "Kafka Streams (Operations View)"
        },
        {
          "id": "confluent-platform",
          "title": "Confluent Platform & Cloud"
        },
        {
          "id": "redpanda-kafka",
          "title": "Redpanda"
        },
        {
          "id": "amazon-msk",
          "title": "Amazon MSK"
        },
        {
          "id": "strimzi-kafka-k8s",
          "title": "Strimzi (Kafka on Kubernetes)"
        }
      ]
    },
    {
      "id": "other-messaging-platforms",
      "title": "Other Messaging Platforms",
      "leaves": [
        {
          "id": "rabbitmq-ops",
          "title": "RabbitMQ"
        },
        {
          "id": "nats-jetstream",
          "title": "NATS & JetStream"
        },
        {
          "id": "apache-pulsar",
          "title": "Apache Pulsar"
        },
        {
          "id": "aws-sqs-sns-eventbridge",
          "title": "AWS SQS, SNS & EventBridge"
        },
        {
          "id": "azure-service-bus",
          "title": "Azure Service Bus & Event Hubs"
        },
        {
          "id": "google-pubsub",
          "title": "Google Cloud Pub/Sub"
        }
      ]
    }
  ],
  "cnapp-cloud-security": [
    {
      "id": "cnapp-fundamentals",
      "title": "CNAPP Fundamentals",
      "leaves": [
        {
          "id": "cnapp-cspm-cwpp-ciem",
          "title": "CSPM, CWPP & CIEM in CNAPP"
        },
        {
          "id": "cloud-security-posture",
          "title": "Cloud Security Posture Management"
        },
        {
          "id": "cloud-workload-protection",
          "title": "Cloud Workload Protection"
        },
        {
          "id": "cloud-identity-entitlements",
          "title": "Cloud Identity Entitlement Management"
        }
      ]
    },
    {
      "id": "cnapp-platforms",
      "title": "CNAPP Platforms",
      "leaves": [
        {
          "id": "wiz-cnapp",
          "title": "Wiz"
        },
        {
          "id": "prisma-cloud-paloalto",
          "title": "Prisma Cloud (Palo Alto)"
        },
        {
          "id": "orca-security",
          "title": "Orca Security"
        },
        {
          "id": "lacework-cnapp",
          "title": "Lacework (Fortinet)"
        },
        {
          "id": "sysdig-secure-cnapp",
          "title": "Sysdig Secure"
        },
        {
          "id": "microsoft-defender-cspm",
          "title": "Microsoft Defender for Cloud"
        }
      ]
    },
    {
      "id": "cloud-native-threat-detection",
      "title": "Cloud-Native Threat Detection",
      "leaves": [
        {
          "id": "guardduty-threat-detection",
          "title": "AWS GuardDuty"
        },
        {
          "id": "azure-defender-threats",
          "title": "Microsoft Defender for Cloud Alerts"
        },
        {
          "id": "gcp-security-command-center",
          "title": "GCP Security Command Center"
        },
        {
          "id": "cloud-trail-audit-analytics",
          "title": "Cloud Audit Log Analytics"
        }
      ]
    }
  ],
  "agentic-ai-devops": [
    {
      "id": "agentic-devops-fundamentals",
      "title": "Agentic DevOps Fundamentals",
      "leaves": [
        {
          "id": "ai-agents-for-ops",
          "title": "AI Agents for Operations"
        },
        {
          "id": "agent-orchestration-patterns",
          "title": "Agent Orchestration Patterns"
        },
        {
          "id": "human-in-the-loop-agents",
          "title": "Human-in-the-Loop Agent Workflows"
        },
        {
          "id": "agent-guardrails-devops",
          "title": "Guardrails for DevOps AI Agents"
        }
      ]
    },
    {
      "id": "coding-agent-platforms",
      "title": "AI Coding Agent Platforms",
      "leaves": [
        {
          "id": "cursor-background-agents",
          "title": "Cursor Background Agents"
        },
        {
          "id": "github-copilot-coding-agent",
          "title": "GitHub Copilot Coding Agent"
        },
        {
          "id": "devin-cognition",
          "title": "Devin (Cognition)"
        },
        {
          "id": "amazon-q-developer",
          "title": "Amazon Q Developer"
        },
        {
          "id": "gitlab-duo-agent",
          "title": "GitLab Duo Agent Platform"
        },
        {
          "id": "openai-codex-agent",
          "title": "OpenAI Codex Agent"
        }
      ]
    },
    {
      "id": "ai-remediation-automation",
      "title": "AI Remediation & Pipeline Automation",
      "leaves": [
        {
          "id": "ai-incident-triage",
          "title": "AI Incident Triage & Summarization"
        },
        {
          "id": "ai-root-cause-analysis",
          "title": "AI-Assisted Root Cause Analysis"
        },
        {
          "id": "ai-runbook-generation",
          "title": "AI Runbook & Playbook Generation"
        },
        {
          "id": "ai-policy-remediation",
          "title": "AI Policy Violation Remediation"
        },
        {
          "id": "mcp-devops-integration",
          "title": "Model Context Protocol (MCP) for DevOps"
        }
      ]
    }
  ],
  "infrastructure-testing": [
    {
      "id": "iac-testing-fundamentals",
      "title": "Infrastructure Testing Fundamentals",
      "leaves": [
        {
          "id": "iac-test-pyramid",
          "title": "Infrastructure Test Pyramid"
        },
        {
          "id": "static-analysis-iac",
          "title": "Static Analysis for IaC"
        },
        {
          "id": "policy-testing-iac",
          "title": "Policy Testing (OPA, Sentinel)"
        },
        {
          "id": "drift-detection-testing",
          "title": "Drift Detection as Testing"
        }
      ]
    },
    {
      "id": "terraform-testing-tools",
      "title": "Terraform & OpenTofu Testing",
      "leaves": [
        {
          "id": "terratest-deep",
          "title": "Terratest"
        },
        {
          "id": "terraform-test-framework",
          "title": "terraform test Framework"
        },
        {
          "id": "kitchen-terraform",
          "title": "kitchen-terraform"
        },
        {
          "id": "tftest-opentofu",
          "title": "OpenTofu tftest"
        },
        {
          "id": "localstack-terraform-test",
          "title": "LocalStack for Terraform Tests"
        }
      ]
    },
    {
      "id": "config-mgmt-testing",
      "title": "Configuration Management Testing",
      "leaves": [
        {
          "id": "ansible-molecule-deep",
          "title": "Molecule (Ansible)"
        },
        {
          "id": "inspec-compliance",
          "title": "InSpec Compliance Testing"
        },
        {
          "id": "test-kitchen-chef",
          "title": "Test Kitchen (Chef)"
        },
        {
          "id": "serverspec",
          "title": "Serverspec"
        },
        {
          "id": "goss-testing",
          "title": "goss (Quick Server Validation)"
        }
      ]
    },
    {
      "id": "kubernetes-policy-testing",
      "title": "Kubernetes & Policy Testing",
      "leaves": [
        {
          "id": "kyverno-test-cli",
          "title": "Kyverno Test CLI & Chainsaw"
        },
        {
          "id": "kubeconform-validation",
          "title": "kubeconform"
        },
        {
          "id": "kube-score",
          "title": "kube-score"
        },
        {
          "id": "datree-k8s",
          "title": "Datree (Policy)"
        },
        {
          "id": "monokle-k8s",
          "title": "Monokle"
        }
      ]
    }
  ],
  "other-service-meshes": [
    {
      "id": "cilium-service-mesh",
      "title": "Cilium Service Mesh",
      "leaves": [
        {
          "id": "cilium-ebpf-dataplane",
          "title": "Cilium eBPF Data Plane"
        },
        {
          "id": "cilium-hubble-observability",
          "title": "Hubble Observability"
        },
        {
          "id": "cilium-gateway-api",
          "title": "Cilium Gateway API"
        },
        {
          "id": "cilium-mutual-auth",
          "title": "Cilium Mutual Authentication"
        }
      ]
    },
    {
      "id": "consul-connect-mesh",
      "title": "Consul Connect",
      "leaves": [
        {
          "id": "consul-service-mesh",
          "title": "Consul Service Mesh"
        },
        {
          "id": "consul-intentions",
          "title": "Consul Intentions (L4/L7 AuthZ)"
        },
        {
          "id": "consul-api-gateway",
          "title": "Consul API Gateway"
        }
      ]
    },
    {
      "id": "kuma-service-mesh",
      "title": "Kuma / Kong Mesh",
      "leaves": [
        {
          "id": "kuma-universal-k8s",
          "title": "Kuma on Kubernetes & Universal"
        },
        {
          "id": "kuma-policies",
          "title": "Kuma Traffic & Security Policies"
        },
        {
          "id": "kong-mesh-enterprise",
          "title": "Kong Mesh (Enterprise)"
        }
      ]
    },
    {
      "id": "other-service-meshes--hashicorp-consul-connect-related-topics",
      "title": "HashiCorp Consul Connect & Related Topics",
      "leaves": [
        {
          "id": "consul-connect",
          "title": "HashiCorp Consul Connect"
        },
        {
          "id": "kuma-mesh",
          "title": "Kuma"
        },
        {
          "id": "nginx-service-mesh",
          "title": "NGINX Service Mesh"
        },
        {
          "id": "tetrate-service-bridge",
          "title": "Tetrate Service Bridge (TSB)"
        },
        {
          "id": "gloo-mesh",
          "title": "Solo.io Gloo Mesh"
        },
        {
          "id": "osm-discontinued",
          "title": "Open Service Mesh (OSM) — Discontinued"
        }
      ]
    },
    {
      "id": "other-service-meshes--aws-app-mesh-discontinued-related-topics",
      "title": "AWS App Mesh — Discontinued & Related Topics",
      "leaves": [
        {
          "id": "aws-app-mesh-discontinued",
          "title": "AWS App Mesh — Discontinued"
        },
        {
          "id": "maesh-traefik-mesh-discontinued",
          "title": "Maesh / Traefik Mesh — Discontinued"
        }
      ]
    }
  ],
  "other-gitops-tools": [
    {
      "id": "spinnaker-gitops",
      "title": "Spinnaker",
      "leaves": [
        {
          "id": "spinnaker-pipelines",
          "title": "Spinnaker Pipelines"
        },
        {
          "id": "spinnaker-deployment-strategies",
          "title": "Spinnaker Deployment Strategies"
        },
        {
          "id": "spinnaker-k8s-provider",
          "title": "Spinnaker Kubernetes Provider"
        }
      ]
    },
    {
      "id": "werf-gitops",
      "title": "Werf",
      "leaves": [
        {
          "id": "werf-giterminism",
          "title": "Werf Giterminism"
        },
        {
          "id": "werf-converge",
          "title": "Werf Converge & Cleanup"
        }
      ]
    },
    {
      "id": "jenkins-x-gitops",
      "title": "Jenkins X",
      "leaves": [
        {
          "id": "jenkins-x-lighthouse",
          "title": "Jenkins X Lighthouse"
        },
        {
          "id": "jenkins-x-tekton",
          "title": "Jenkins X & Tekton"
        }
      ]
    },
    {
      "id": "akuity-platform",
      "title": "Akuity Platform",
      "leaves": [
        {
          "id": "akuity-managed-argocd",
          "title": "Akuity Managed Argo CD"
        },
        {
          "id": "kargo-progressive-delivery",
          "title": "Kargo (Progressive Delivery)"
        }
      ]
    },
    {
      "id": "other-gitops-tools--spinnaker-related-topics",
      "title": "Spinnaker & Related Topics",
      "leaves": [
        {
          "id": "spinnaker",
          "title": "Spinnaker"
        },
        {
          "id": "werf",
          "title": "Werf"
        },
        {
          "id": "jenkins-x",
          "title": "Jenkins X"
        },
        {
          "id": "weave-gitops",
          "title": "Weave GitOps"
        },
        {
          "id": "codefresh-gitops",
          "title": "Codefresh GitOps"
        },
        {
          "id": "octopus-deploy",
          "title": "Octopus Deploy"
        }
      ]
    },
    {
      "id": "other-gitops-tools--rancher-fleet-related-topics",
      "title": "Rancher Fleet & Related Topics",
      "leaves": [
        {
          "id": "rancher-fleet",
          "title": "Rancher Fleet"
        },
        {
          "id": "kargo",
          "title": "Kargo"
        },
        {
          "id": "kubevela",
          "title": "KubeVela"
        },
        {
          "id": "bunnyshell",
          "title": "Bunnyshell"
        },
        {
          "id": "plural-platform",
          "title": "Plural"
        },
        {
          "id": "argonaut",
          "title": "Argonaut (Commercial Argo)"
        }
      ]
    }
  ],
  "cloud-service-models": [
    {
      "id": "service-model-types",
      "title": "Cloud Service Model Types",
      "leaves": [
        {
          "id": "iaas-deep",
          "title": "Infrastructure as a Service (IaaS)"
        },
        {
          "id": "paas-deep",
          "title": "Platform as a Service (PaaS)"
        },
        {
          "id": "saas-deep",
          "title": "Software as a Service (SaaS)"
        },
        {
          "id": "faas-serverless-deep",
          "title": "Functions as a Service (FaaS)"
        },
        {
          "id": "caas-containers-deep",
          "title": "Containers as a Service (CaaS)"
        },
        {
          "id": "dbaas-maas",
          "title": "DBaaS, MaaS & XaaS Variants"
        }
      ]
    },
    {
      "id": "cloud-economics-consumption",
      "title": "Cloud Economics & Consumption",
      "leaves": [
        {
          "id": "pay-as-you-go-reserved",
          "title": "Pay-As-You-Go vs Reserved Capacity"
        },
        {
          "id": "cloud-billing-models",
          "title": "Cloud Billing & Metering Models"
        },
        {
          "id": "egress-data-transfer-costs",
          "title": "Egress & Data Transfer Costs"
        },
        {
          "id": "cloud-marketplace-models",
          "title": "Cloud Marketplace Models"
        }
      ]
    },
    {
      "id": "cloud-native-vs-cloud-enabled",
      "title": "Cloud-Native vs Cloud-Enabled",
      "leaves": [
        {
          "id": "twelve-factor-apps",
          "title": "Twelve-Factor App Methodology"
        },
        {
          "id": "cloud-native-design-principles",
          "title": "Cloud-Native Design Principles"
        },
        {
          "id": "lift-and-shift-vs-refactor",
          "title": "Lift-and-Shift vs Refactor vs Replatform"
        }
      ]
    },
    {
      "id": "cloud-service-models--iaas-infrastructure-as-a-service-related-topics",
      "title": "IaaS (Infrastructure as a Service) & Related Topics",
      "leaves": [
        {
          "id": "iaas-overview",
          "title": "IaaS (Infrastructure as a Service)"
        },
        {
          "id": "paas-overview",
          "title": "PaaS (Platform as a Service)"
        },
        {
          "id": "saas-overview",
          "title": "SaaS (Software as a Service)"
        },
        {
          "id": "faas-overview",
          "title": "FaaS (Function as a Service)"
        },
        {
          "id": "caas-overview",
          "title": "CaaS (Container as a Service)"
        },
        {
          "id": "baas-overview",
          "title": "BaaS (Backend as a Service)"
        }
      ]
    },
    {
      "id": "cloud-service-models--dbaas-database-as-a-service-related-topics",
      "title": "DBaaS (Database as a Service) & Related Topics",
      "leaves": [
        {
          "id": "dbaas-overview",
          "title": "DBaaS (Database as a Service)"
        },
        {
          "id": "monitoring-as-service",
          "title": "MaaS (Monitoring as a Service)"
        },
        {
          "id": "shared-responsibility-model",
          "title": "Shared Responsibility Model"
        },
        {
          "id": "managed-vs-self-hosted",
          "title": "Managed vs Self-Hosted Trade-offs"
        },
        {
          "id": "cloud-deployment-models",
          "title": "Cloud Deployment Models (Public / Private / Hybrid / Community)"
        }
      ]
    }
  ],
  "database-cicd": [
    {
      "id": "database-pipeline-patterns",
      "title": "Database Pipeline Patterns",
      "leaves": [
        {
          "id": "declarative-vs-sequential-migrations",
          "title": "Declarative vs Sequential Migrations"
        },
        {
          "id": "expand-contract-pattern",
          "title": "Expand-Contract Migration Pattern"
        },
        {
          "id": "blue-green-schema-changes",
          "title": "Blue-Green Schema Changes"
        },
        {
          "id": "shadow-database-testing",
          "title": "Shadow Database Testing"
        }
      ]
    },
    {
      "id": "database-cicd-tools",
      "title": "Database CI/CD Tools & Integration",
      "leaves": [
        {
          "id": "liquibase-cicd",
          "title": "Liquibase in CI/CD"
        },
        {
          "id": "flyway-cicd",
          "title": "Flyway in CI/CD"
        },
        {
          "id": "atlas-cicd",
          "title": "Atlas in CI/CD"
        },
        {
          "id": "bytebase-cicd",
          "title": "Bytebase CI/CD"
        },
        {
          "id": "sqitch-cicd",
          "title": "Sqitch"
        }
      ]
    },
    {
      "id": "database-governance-cicd",
      "title": "Database Change Governance",
      "leaves": [
        {
          "id": "db-change-approval-workflows",
          "title": "DB Change Approval Workflows"
        },
        {
          "id": "rollback-strategies-db",
          "title": "Database Rollback Strategies"
        },
        {
          "id": "compliance-audit-db-changes",
          "title": "Compliance Audit for DB Changes"
        }
      ]
    },
    {
      "id": "database-cicd--database-ci-cd-fundamentals-related-topics",
      "title": "Database CI/CD Fundamentals & Related Topics",
      "leaves": [
        {
          "id": "db-cicd-fundamentals",
          "title": "Database CI/CD Fundamentals"
        },
        {
          "id": "db-pipeline-stages",
          "title": "DB Pipeline Stages"
        },
        {
          "id": "db-environments-strategy",
          "title": "DB Environments Strategy"
        },
        {
          "id": "db-pre-deploy-checks",
          "title": "Pre-Deploy Checks"
        },
        {
          "id": "db-data-seeding",
          "title": "Data Seeding & Fixtures"
        },
        {
          "id": "db-blue-green-data",
          "title": "Blue/Green for Databases"
        }
      ]
    },
    {
      "id": "database-cicd--branching-release-workflows",
      "title": "Branching & Release Workflows",
      "leaves": [
        {
          "id": "db-feature-flags",
          "title": "Feature Flags for Schema Changes"
        },
        {
          "id": "db-change-approval",
          "title": "Change Approval & Review Workflows"
        }
      ]
    }
  ],
  "kubernetes-cost-management": [
    {
      "id": "k8s-cost-visibility",
      "title": "Kubernetes Cost Visibility",
      "leaves": [
        {
          "id": "kubecost-platform",
          "title": "Kubecost"
        },
        {
          "id": "opencost-cncf",
          "title": "OpenCost (CNCF)"
        },
        {
          "id": "cast-ai-cost",
          "title": "Cast AI"
        },
        {
          "id": "cloudzero-k8s",
          "title": "CloudZero for Kubernetes"
        }
      ]
    },
    {
      "id": "k8s-cost-optimization",
      "title": "Kubernetes Cost Optimization",
      "leaves": [
        {
          "id": "rightsizing-k8s-requests",
          "title": "Rightsizing Requests & Limits"
        },
        {
          "id": "spot-preemptible-nodes",
          "title": "Spot & Preemptible Node Strategies"
        },
        {
          "id": "cluster-autoscaler-cost",
          "title": "Cluster Autoscaler for Cost"
        },
        {
          "id": "goldilocks-vpa",
          "title": "Goldilocks & VPA Recommendations"
        },
        {
          "id": "idle-resource-cleanup-k8s",
          "title": "Idle Resource Cleanup"
        }
      ]
    },
    {
      "id": "k8s-chargeback-allocation",
      "title": "Kubernetes Chargeback & Allocation",
      "leaves": [
        {
          "id": "namespace-chargeback",
          "title": "Namespace-Level Chargeback"
        },
        {
          "id": "label-based-allocation-k8s",
          "title": "Label-Based Cost Allocation"
        },
        {
          "id": "shared-cost-splitting-k8s",
          "title": "Shared Cluster Cost Splitting"
        }
      ]
    },
    {
      "id": "kubernetes-cost-management--kubecost-related-topics",
      "title": "Kubecost & Related Topics",
      "leaves": [
        {
          "id": "kubecost",
          "title": "Kubecost"
        },
        {
          "id": "opencost-cncf",
          "title": "OpenCost (CNCF)"
        },
        {
          "id": "cast-ai-k8s",
          "title": "CAST AI for Kubernetes"
        },
        {
          "id": "stormforge",
          "title": "StormForge / Optimize Live"
        },
        {
          "id": "pixie-cost",
          "title": "Pixie (Cost Visibility)"
        },
        {
          "id": "kubernetes-resource-quotas",
          "title": "Resource Quotas & LimitRanges"
        }
      ]
    },
    {
      "id": "kubernetes-cost-management--namespace-level-chargeback-related-topics",
      "title": "Namespace-Level Chargeback & Related Topics",
      "leaves": [
        {
          "id": "namespace-chargeback",
          "title": "Namespace-Level Chargeback"
        },
        {
          "id": "goldilocks-vpa",
          "title": "Goldilocks & VPA Recommendations"
        },
        {
          "id": "karpenter-cost",
          "title": "Karpenter (Cost-Aware Autoscaling)"
        },
        {
          "id": "k8s-cost-best-practices",
          "title": "Kubernetes Cost Best Practices"
        }
      ]
    }
  ],
  "ai-coding-agents-devops": [
    {
      "id": "background-coding-agents",
      "title": "Background Coding Agents",
      "leaves": [
        {
          "id": "cursor-background-agent",
          "title": "Cursor Background Agents"
        },
        {
          "id": "copilot-workspace-agent",
          "title": "GitHub Copilot Workspace"
        },
        {
          "id": "sweep-ai-pr-bot",
          "title": "Sweep AI (PR Bot)"
        },
        {
          "id": "coderabbit-review",
          "title": "CodeRabbit"
        }
      ]
    },
    {
      "id": "autonomous-fixers",
      "title": "Autonomous Fixers & Remediation Bots",
      "leaves": [
        {
          "id": "dependabot-renovate-ai",
          "title": "Dependabot & Renovate (AI-Enhanced)"
        },
        {
          "id": "snyk-auto-fix",
          "title": "Snyk Auto-Fix"
        },
        {
          "id": "mintlify-doc-bots",
          "title": "AI Documentation Bots"
        },
        {
          "id": "test-generation-agents",
          "title": "AI Test Generation Agents"
        }
      ]
    },
    {
      "id": "agent-security-governance",
      "title": "Agent Security & Governance",
      "leaves": [
        {
          "id": "agent-permissions-scoping",
          "title": "Agent Permissions & Scoping"
        },
        {
          "id": "agent-audit-trails",
          "title": "Agent Audit Trails"
        },
        {
          "id": "secrets-in-agent-context",
          "title": "Secrets Handling in Agent Context"
        },
        {
          "id": "agent-rate-cost-limits",
          "title": "Agent Rate & Cost Limits"
        }
      ]
    },
    {
      "id": "ai-coding-agents-devops--autonomous-pr-bots-related-topics",
      "title": "Autonomous PR Bots & Related Topics",
      "leaves": [
        {
          "id": "autonomous-pr-bots",
          "title": "Autonomous PR Bots"
        },
        {
          "id": "auto-dependency-bots",
          "title": "AI Dependency Update Bots"
        },
        {
          "id": "agent-security-considerations",
          "title": "Agent Security Considerations"
        },
        {
          "id": "agent-cicd-integration",
          "title": "Agent Integration with CI/CD"
        },
        {
          "id": "agent-rate-cost-limits",
          "title": "Agent Rate Limits & Cost Controls"
        }
      ]
    }
  ],
  "system-administration": [
    {
      "id": "windows-server-admin",
      "title": "Windows Server Administration",
      "leaves": [
        {
          "id": "windows-server-core",
          "title": "Windows Server Core & Roles"
        },
        {
          "id": "iis-administration",
          "title": "IIS Administration"
        },
        {
          "id": "windows-services-sc",
          "title": "Windows Services & sc.exe"
        },
        {
          "id": "wsl2-devops",
          "title": "WSL 2 for DevOps on Windows"
        }
      ]
    },
    {
      "id": "windows-automation",
      "title": "Windows Automation",
      "leaves": [
        {
          "id": "powershell-remoting",
          "title": "PowerShell Remoting (WinRM)"
        },
        {
          "id": "desired-state-configuration",
          "title": "PowerShell DSC"
        },
        {
          "id": "group-policy-devops",
          "title": "Group Policy for DevOps"
        },
        {
          "id": "windows-containers",
          "title": "Windows Containers"
        }
      ]
    },
    {
      "id": "systemd",
      "title": "systemd",
      "leaves": [
        {
          "id": "systemctl",
          "title": "systemctl"
        },
        {
          "id": "systemd-units-services",
          "title": "Unit Files & Services"
        },
        {
          "id": "systemd-timers",
          "title": "systemd Timers"
        },
        {
          "id": "journald",
          "title": "journald & journalctl"
        },
        {
          "id": "systemd-targets",
          "title": "systemd Targets"
        },
        {
          "id": "systemd-sandboxing",
          "title": "systemd Service Sandboxing"
        }
      ]
    },
    {
      "id": "system-administration--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "init-systems",
          "title": "Other Init Systems (sysvinit, OpenRC, runit)"
        }
      ]
    },
    {
      "id": "cron-scheduling",
      "title": "Cron & Scheduling",
      "leaves": [
        {
          "id": "crontab",
          "title": "crontab"
        },
        {
          "id": "anacron",
          "title": "anacron"
        },
        {
          "id": "at-batch",
          "title": "at & batch"
        },
        {
          "id": "systemd-timers-vs-cron",
          "title": "systemd Timers vs Cron"
        }
      ]
    },
    {
      "id": "system-logging",
      "title": "System Logging",
      "leaves": [
        {
          "id": "syslog",
          "title": "syslog"
        },
        {
          "id": "rsyslog",
          "title": "rsyslog"
        },
        {
          "id": "syslog-ng",
          "title": "syslog-ng"
        },
        {
          "id": "journald-logging",
          "title": "journald"
        },
        {
          "id": "log-rotation-logrotate",
          "title": "logrotate"
        }
      ]
    },
    {
      "id": "process-supervision",
      "title": "Process Supervision",
      "leaves": [
        {
          "id": "supervisord",
          "title": "supervisord"
        },
        {
          "id": "runit",
          "title": "runit"
        },
        {
          "id": "s6-supervision",
          "title": "s6"
        },
        {
          "id": "monit",
          "title": "monit"
        }
      ]
    },
    {
      "id": "performance-monitoring-tools",
      "title": "Performance Monitoring Tools",
      "leaves": [
        {
          "id": "cpu-monitoring",
          "title": "CPU Monitoring"
        },
        {
          "id": "memory-monitoring",
          "title": "Memory Monitoring"
        },
        {
          "id": "disk-io-monitoring",
          "title": "Disk I/O Monitoring"
        },
        {
          "id": "network-monitoring-local",
          "title": "Network Monitoring"
        },
        {
          "id": "iostat-vmstat-mpstat",
          "title": "iostat, vmstat & mpstat"
        },
        {
          "id": "sar",
          "title": "sar (sysstat)"
        },
        {
          "id": "strace-ltrace",
          "title": "strace & ltrace"
        },
        {
          "id": "perf-linux",
          "title": "perf"
        },
        {
          "id": "bpftrace",
          "title": "bpftrace"
        },
        {
          "id": "flame-graphs",
          "title": "Flame Graphs"
        }
      ]
    },
    {
      "id": "storage-management",
      "title": "Storage Management",
      "leaves": [
        {
          "id": "disk-partitioning",
          "title": "Disk Partitioning"
        },
        {
          "id": "filesystems-overview",
          "title": "Filesystems (ext4, xfs, btrfs, zfs)"
        },
        {
          "id": "lvm",
          "title": "LVM"
        },
        {
          "id": "raid-software",
          "title": "Software RAID (mdadm)"
        },
        {
          "id": "mount-fstab",
          "title": "Mount & /etc/fstab"
        },
        {
          "id": "swap-management",
          "title": "Swap Management"
        },
        {
          "id": "nfs-smb",
          "title": "NFS & SMB Shares"
        }
      ]
    },
    {
      "id": "kernel-tuning",
      "title": "Kernel Tuning",
      "leaves": [
        {
          "id": "sysctl",
          "title": "sysctl"
        },
        {
          "id": "ulimit-rlimits",
          "title": "ulimit & rlimits"
        },
        {
          "id": "tcp-tuning",
          "title": "TCP Tuning"
        },
        {
          "id": "huge-pages",
          "title": "Transparent & Huge Pages"
        }
      ]
    },
    {
      "id": "system-administration--system-services-operations-11",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "package-management-deep",
          "title": "Linux Package Management (apt, dnf, pacman)"
        }
      ]
    },
    {
      "id": "backup-recovery",
      "title": "Backup & Recovery",
      "leaves": [
        {
          "id": "rsync-backups",
          "title": "rsync-based Backups"
        },
        {
          "id": "snapshots",
          "title": "Snapshots (LVM, ZFS, btrfs)"
        },
        {
          "id": "restic",
          "title": "restic"
        },
        {
          "id": "borgbackup",
          "title": "BorgBackup"
        },
        {
          "id": "duplicity-bacula",
          "title": "Duplicity & Bacula"
        }
      ]
    },
    {
      "id": "host-hardening",
      "title": "Host Hardening Basics",
      "leaves": [
        {
          "id": "selinux",
          "title": "SELinux"
        },
        {
          "id": "apparmor",
          "title": "AppArmor"
        },
        {
          "id": "iptables",
          "title": "iptables"
        },
        {
          "id": "nftables",
          "title": "nftables"
        },
        {
          "id": "firewalld-ufw",
          "title": "firewalld & ufw"
        },
        {
          "id": "fail2ban",
          "title": "fail2ban"
        },
        {
          "id": "cis-benchmarks-os",
          "title": "CIS Benchmarks (OS)"
        }
      ]
    },
    {
      "id": "system-administration--system-services-operations-14",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "time-sync-ntp",
          "title": "Time Synchronization (NTP, chrony)"
        }
      ]
    }
  ],
  "cicd-fundamentals": [
    {
      "id": "trunk-based-development",
      "title": "Trunk-Based Development",
      "leaves": [
        {
          "id": "trunk-based-principles",
          "title": "Trunk-Based Development Principles"
        },
        {
          "id": "feature-flags-trunk",
          "title": "Feature Flags with Trunk-Based Dev"
        },
        {
          "id": "short-lived-branches",
          "title": "Short-Lived Feature Branches"
        },
        {
          "id": "branch-by-abstraction",
          "title": "Branch by Abstraction"
        }
      ]
    },
    {
      "id": "monorepo-pipelines",
      "title": "Monorepo Pipeline Strategies",
      "leaves": [
        {
          "id": "affected-target-detection",
          "title": "Affected Target Detection"
        },
        {
          "id": "bazel-remote-cache-ci",
          "title": "Bazel Remote Cache in CI"
        },
        {
          "id": "nx-turborepo-ci",
          "title": "Nx & Turborepo in CI"
        },
        {
          "id": "path-filter-workflows",
          "title": "Path Filters in Workflows"
        }
      ]
    },
    {
      "id": "cicd-fundamentals--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-ci-cd",
          "title": "What is CI / CD?"
        },
        {
          "id": "ci-vs-cd-delivery-vs-deployment",
          "title": "CI vs Continuous Delivery vs Continuous Deployment"
        },
        {
          "id": "cicd-principles",
          "title": "CI/CD Principles"
        }
      ]
    },
    {
      "id": "pipeline-stages",
      "title": "Pipeline Stages",
      "leaves": [
        {
          "id": "source-stage",
          "title": "Source"
        },
        {
          "id": "build-stage",
          "title": "Build"
        },
        {
          "id": "test-stage",
          "title": "Test"
        },
        {
          "id": "package-stage",
          "title": "Package"
        },
        {
          "id": "security-scan-stage",
          "title": "Security Scan"
        },
        {
          "id": "deploy-stage",
          "title": "Deploy"
        },
        {
          "id": "verify-stage",
          "title": "Verify / Smoke Test"
        },
        {
          "id": "promote-stage",
          "title": "Promote"
        }
      ]
    },
    {
      "id": "cicd-fundamentals--pipeline-triggers-push-pr-schedule-manual-webhoo",
      "title": "Pipeline Triggers (push, PR, schedule, manual, webhook) & Related Topics",
      "leaves": [
        {
          "id": "pipeline-triggers",
          "title": "Pipeline Triggers (push, PR, schedule, manual, webhook)"
        },
        {
          "id": "artifacts-and-promotion",
          "title": "Artifacts & Artifact Promotion"
        },
        {
          "id": "cicd-environments",
          "title": "Environments (Dev, Stage, Prod)"
        },
        {
          "id": "approvals-and-gates",
          "title": "Approvals & Gates"
        },
        {
          "id": "pipeline-architecture-patterns",
          "title": "Pipeline Architecture (Linear, Parallel, Fan-In/Out)"
        },
        {
          "id": "build-agents-runners",
          "title": "Build Agents & Runners (Concept)"
        }
      ]
    },
    {
      "id": "cicd-fundamentals--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "pipeline-caching-artifacts",
          "title": "Caching & Artifact Sharing"
        },
        {
          "id": "parallel-jobs",
          "title": "Parallel & Matrix Jobs"
        },
        {
          "id": "pipeline-observability",
          "title": "Pipeline Observability"
        },
        {
          "id": "pipeline-security-overview",
          "title": "Pipeline Security & SLSA (Overview)"
        },
        {
          "id": "secrets-in-pipelines",
          "title": "Secrets in Pipelines"
        },
        {
          "id": "pipeline-metrics",
          "title": "Pipeline Metrics (DORA-aligned)"
        }
      ]
    },
    {
      "id": "cicd-fundamentals--hermetic-reproducible-pipeline-builds-related-to",
      "title": "Hermetic & Reproducible Pipeline Builds & Related Topics",
      "leaves": [
        {
          "id": "hermetic-builds-cicd",
          "title": "Hermetic & Reproducible Pipeline Builds"
        },
        {
          "id": "pr-validation-pipelines",
          "title": "Pull Request Validation Pipelines"
        },
        {
          "id": "trunk-based-cicd",
          "title": "Trunk-Based CI/CD"
        },
        {
          "id": "monorepo-cicd-strategies",
          "title": "Monorepo CI/CD Strategies"
        },
        {
          "id": "polyrepo-cicd-strategies",
          "title": "Polyrepo CI/CD Strategies"
        },
        {
          "id": "continuous-integration-anti-patterns",
          "title": "CI/CD Anti-Patterns"
        }
      ]
    },
    {
      "id": "cicd-fundamentals--fast-feedback-loops",
      "title": "Fast Feedback Loops",
      "leaves": [
        {
          "id": "fast-feedback-loops",
          "title": "Fast Feedback Loops"
        }
      ]
    }
  ],
  "devops-fundamentals": [
    {
      "id": "platform-engineering-intro",
      "title": "Platform Engineering Introduction",
      "leaves": [
        {
          "id": "platform-vs-devops-vs-sre",
          "title": "Platform Engineering vs DevOps vs SRE"
        },
        {
          "id": "internal-developer-platform-intro",
          "title": "Internal Developer Platform (IDP) Intro"
        },
        {
          "id": "golden-path-intro",
          "title": "Golden Paths Introduction"
        }
      ]
    },
    {
      "id": "devops-fundamentals--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-devops",
          "title": "What is DevOps?"
        },
        {
          "id": "devops-history-evolution",
          "title": "History & Evolution of DevOps"
        },
        {
          "id": "devops-vs-traditional-it",
          "title": "DevOps vs Traditional IT"
        },
        {
          "id": "agile-vs-devops",
          "title": "Agile vs DevOps"
        }
      ]
    },
    {
      "id": "core-devops-principles",
      "title": "Core DevOps Principles",
      "leaves": [
        {
          "id": "automation",
          "title": "Automation"
        },
        {
          "id": "collaboration",
          "title": "Collaboration"
        },
        {
          "id": "continuous-improvement",
          "title": "Continuous Improvement"
        },
        {
          "id": "customer-centricity",
          "title": "Customer Centricity"
        },
        {
          "id": "measurement",
          "title": "Measurement"
        },
        {
          "id": "sharing",
          "title": "Sharing"
        }
      ]
    },
    {
      "id": "calms-framework",
      "title": "CALMS Framework",
      "leaves": [
        {
          "id": "calms-culture",
          "title": "Culture"
        },
        {
          "id": "calms-automation",
          "title": "Automation"
        },
        {
          "id": "calms-lean",
          "title": "Lean"
        },
        {
          "id": "calms-measurement",
          "title": "Measurement"
        },
        {
          "id": "calms-sharing",
          "title": "Sharing"
        }
      ]
    },
    {
      "id": "three-ways-of-devops",
      "title": "Three Ways of DevOps",
      "leaves": [
        {
          "id": "first-way-flow",
          "title": "First Way: Flow"
        },
        {
          "id": "second-way-feedback",
          "title": "Second Way: Feedback"
        },
        {
          "id": "third-way-continuous-learning",
          "title": "Third Way: Continuous Learning"
        }
      ]
    },
    {
      "id": "devops-culture",
      "title": "DevOps Culture",
      "leaves": [
        {
          "id": "psychological-safety",
          "title": "Psychological Safety"
        },
        {
          "id": "blameless-culture",
          "title": "Blameless Culture"
        },
        {
          "id": "shared-ownership",
          "title": "Shared Ownership"
        },
        {
          "id": "team-topologies",
          "title": "Team Topologies"
        },
        {
          "id": "devex-culture",
          "title": "Developer Experience Culture"
        }
      ]
    },
    {
      "id": "devops-fundamentals--essential-reading-references",
      "title": "Essential Reading & References",
      "leaves": [
        {
          "id": "devops-anti-patterns",
          "title": "DevOps Anti-Patterns"
        },
        {
          "id": "devops-myths",
          "title": "DevOps Myths"
        },
        {
          "id": "phoenix-project-unicorn-project",
          "title": "The Phoenix Project & The Unicorn Project"
        },
        {
          "id": "devops-handbook",
          "title": "The DevOps Handbook"
        },
        {
          "id": "accelerate-book",
          "title": "Accelerate (Forsgren, Humble, Kim)"
        }
      ]
    }
  ],
  "iac-fundamentals": [
    {
      "id": "gitops-for-infrastructure",
      "title": "GitOps for Infrastructure",
      "leaves": [
        {
          "id": "infra-repo-structure",
          "title": "Infrastructure Repository Structure"
        },
        {
          "id": "environment-branching-iac",
          "title": "Environment Branching vs Directories"
        },
        {
          "id": "iac-pr-workflows",
          "title": "IaC Pull Request Workflows"
        }
      ]
    },
    {
      "id": "iac-fundamentals--what-is-infrastructure-as-code-related-topics",
      "title": "What is Infrastructure as Code? & Related Topics",
      "leaves": [
        {
          "id": "what-is-iac",
          "title": "What is Infrastructure as Code?"
        },
        {
          "id": "iac-benefits-challenges",
          "title": "IaC Benefits & Challenges"
        },
        {
          "id": "imperative-vs-declarative-iac",
          "title": "Imperative vs Declarative IaC"
        },
        {
          "id": "iac-state-management-concept",
          "title": "State Management (Concept)"
        },
        {
          "id": "iac-drift-detection-concept",
          "title": "Drift Detection (Concept)"
        },
        {
          "id": "iac-idempotency",
          "title": "Idempotency in IaC"
        }
      ]
    },
    {
      "id": "iac-fundamentals--mutable-vs-immutable-infrastructure-related-topi",
      "title": "Mutable vs Immutable Infrastructure & Related Topics",
      "leaves": [
        {
          "id": "mutable-vs-immutable-infra",
          "title": "Mutable vs Immutable Infrastructure"
        },
        {
          "id": "iac-modules-reusability",
          "title": "Modules & Reusability"
        },
        {
          "id": "providers-resources-concept",
          "title": "Providers & Resources (Concept)"
        },
        {
          "id": "plan-apply-destroy-cycle",
          "title": "Plan → Apply → Destroy Cycle"
        },
        {
          "id": "iac-testing-concept",
          "title": "Testing IaC (Concept)"
        },
        {
          "id": "iac-vs-config-mgmt",
          "title": "IaC vs Configuration Management"
        }
      ]
    },
    {
      "id": "iac-fundamentals--multi-cloud-iac-abstraction-related-topics",
      "title": "Multi-Cloud IaC Abstraction & Related Topics",
      "leaves": [
        {
          "id": "multi-cloud-iac-abstraction",
          "title": "Multi-Cloud IaC Abstraction"
        },
        {
          "id": "iac-secret-handling-concept",
          "title": "Secret Handling in IaC (Concept)"
        },
        {
          "id": "gitops-for-infra",
          "title": "GitOps for Infrastructure"
        },
        {
          "id": "iac-anti-patterns",
          "title": "IaC Anti-Patterns"
        }
      ]
    }
  ],
  "devops-lifecycle": [
    {
      "id": "devops-lifecycle--lifecycle-phases-continuous-practices",
      "title": "Lifecycle Phases & Continuous Practices",
      "leaves": [
        {
          "id": "plan-phase",
          "title": "Plan Phase"
        },
        {
          "id": "code-phase",
          "title": "Code Phase"
        },
        {
          "id": "build-phase",
          "title": "Build Phase"
        },
        {
          "id": "test-phase",
          "title": "Test Phase"
        },
        {
          "id": "release-phase",
          "title": "Release Phase"
        },
        {
          "id": "deploy-phase",
          "title": "Deploy Phase"
        }
      ]
    },
    {
      "id": "devops-lifecycle--lifecycle-phases-continuous-practices-2",
      "title": "Lifecycle Phases & Continuous Practices",
      "leaves": [
        {
          "id": "operate-phase",
          "title": "Operate Phase"
        },
        {
          "id": "monitor-phase",
          "title": "Monitor Phase"
        },
        {
          "id": "continuous-integration-overview",
          "title": "Continuous Integration (Overview)"
        },
        {
          "id": "continuous-delivery-overview",
          "title": "Continuous Delivery (Overview)"
        },
        {
          "id": "continuous-deployment-overview",
          "title": "Continuous Deployment (Overview)"
        },
        {
          "id": "continuous-testing-overview",
          "title": "Continuous Testing (Overview)"
        }
      ]
    },
    {
      "id": "devops-lifecycle--lifecycle-phases-continuous-practices-3",
      "title": "Lifecycle Phases & Continuous Practices",
      "leaves": [
        {
          "id": "continuous-monitoring-overview",
          "title": "Continuous Monitoring (Overview)"
        },
        {
          "id": "continuous-feedback-overview",
          "title": "Continuous Feedback (Overview)"
        },
        {
          "id": "continuous-security-overview",
          "title": "Continuous Security (Overview)"
        },
        {
          "id": "continuous-compliance-overview",
          "title": "Continuous Compliance (Overview)"
        },
        {
          "id": "shift-left-shift-right",
          "title": "Shift-Left & Shift-Right"
        },
        {
          "id": "value-stream-overview",
          "title": "Value Streams (Overview)"
        }
      ]
    }
  ],
  "devops-metrics": [
    {
      "id": "dora-metrics",
      "title": "DORA Metrics",
      "leaves": [
        {
          "id": "deployment-frequency",
          "title": "Deployment Frequency"
        },
        {
          "id": "lead-time-for-changes",
          "title": "Lead Time for Changes"
        },
        {
          "id": "change-failure-rate",
          "title": "Change Failure Rate"
        },
        {
          "id": "mean-time-to-restore",
          "title": "Mean Time to Restore (MTTR)"
        },
        {
          "id": "reliability-dora",
          "title": "Reliability (5th DORA metric)"
        }
      ]
    },
    {
      "id": "space-framework",
      "title": "SPACE Framework",
      "leaves": [
        {
          "id": "satisfaction-wellbeing",
          "title": "Satisfaction & Wellbeing"
        },
        {
          "id": "performance",
          "title": "Performance"
        },
        {
          "id": "activity",
          "title": "Activity"
        },
        {
          "id": "communication-collaboration",
          "title": "Communication & Collaboration"
        },
        {
          "id": "efficiency-flow",
          "title": "Efficiency & Flow"
        }
      ]
    },
    {
      "id": "flow-metrics",
      "title": "Flow Metrics",
      "leaves": [
        {
          "id": "flow-velocity",
          "title": "Flow Velocity"
        },
        {
          "id": "flow-time",
          "title": "Flow Time"
        },
        {
          "id": "flow-efficiency",
          "title": "Flow Efficiency"
        },
        {
          "id": "flow-load",
          "title": "Flow Load"
        },
        {
          "id": "flow-distribution",
          "title": "Flow Distribution"
        }
      ]
    },
    {
      "id": "devops-metrics--delivery-flow-metrics",
      "title": "Delivery & Flow Metrics",
      "leaves": [
        {
          "id": "value-stream-mapping",
          "title": "Value Stream Mapping"
        },
        {
          "id": "cycle-time",
          "title": "Cycle Time"
        },
        {
          "id": "lead-time",
          "title": "Lead Time"
        },
        {
          "id": "mttr-mtbf-mttd",
          "title": "MTTR, MTBF, MTTD, MTTA"
        },
        {
          "id": "vanity-vs-actionable-metrics",
          "title": "Vanity vs Actionable Metrics"
        },
        {
          "id": "accelerate-state-of-devops",
          "title": "Accelerate / State of DevOps Reports"
        }
      ]
    },
    {
      "id": "devops-metrics--delivery-flow-metrics-5",
      "title": "Delivery & Flow Metrics",
      "leaves": [
        {
          "id": "engineering-effectiveness-metrics",
          "title": "Engineering Effectiveness Metrics"
        },
        {
          "id": "developer-productivity-frameworks",
          "title": "Developer Productivity Frameworks"
        }
      ]
    }
  ],
  "linux-fundamentals": [
    {
      "id": "linux-distributions",
      "title": "Linux Distributions",
      "leaves": [
        {
          "id": "ubuntu",
          "title": "Ubuntu"
        },
        {
          "id": "debian",
          "title": "Debian"
        },
        {
          "id": "rhel-rocky-alma",
          "title": "RHEL, Rocky & AlmaLinux"
        },
        {
          "id": "fedora",
          "title": "Fedora"
        },
        {
          "id": "alpine",
          "title": "Alpine Linux"
        },
        {
          "id": "arch-linux",
          "title": "Arch Linux"
        },
        {
          "id": "opensuse",
          "title": "openSUSE & SLES"
        },
        {
          "id": "amazon-linux",
          "title": "Amazon Linux"
        },
        {
          "id": "bottlerocket-flatcar",
          "title": "Bottlerocket & Flatcar (Container OSes)"
        }
      ]
    },
    {
      "id": "linux-fundamentals--core-linux-systems",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "linux-kernel",
          "title": "Linux Kernel Basics"
        },
        {
          "id": "filesystem-hierarchy",
          "title": "Filesystem Hierarchy (FHS)"
        }
      ]
    },
    {
      "id": "file-permissions",
      "title": "File Permissions",
      "leaves": [
        {
          "id": "rwx-permissions",
          "title": "rwx Permissions"
        },
        {
          "id": "chmod",
          "title": "chmod"
        },
        {
          "id": "chown",
          "title": "chown"
        },
        {
          "id": "umask",
          "title": "umask"
        },
        {
          "id": "special-permissions",
          "title": "Setuid, Setgid & Sticky Bit"
        },
        {
          "id": "acl",
          "title": "POSIX ACLs"
        }
      ]
    },
    {
      "id": "users-groups",
      "title": "Users & Groups",
      "leaves": [
        {
          "id": "useradd-usermod",
          "title": "useradd & usermod"
        },
        {
          "id": "groupadd-groupmod",
          "title": "groupadd & groupmod"
        },
        {
          "id": "sudo",
          "title": "sudo & sudoers"
        },
        {
          "id": "su",
          "title": "su"
        },
        {
          "id": "passwd-shadow",
          "title": "/etc/passwd & /etc/shadow"
        }
      ]
    },
    {
      "id": "processes-signals",
      "title": "Processes & Signals",
      "leaves": [
        {
          "id": "process-states",
          "title": "Process States"
        },
        {
          "id": "ps-pgrep",
          "title": "ps & pgrep"
        },
        {
          "id": "top-htop-btop",
          "title": "top, htop & btop"
        },
        {
          "id": "kill-signals",
          "title": "kill & Signals"
        },
        {
          "id": "jobs-bg-fg",
          "title": "jobs, bg & fg"
        },
        {
          "id": "nohup-disown",
          "title": "nohup & disown"
        },
        {
          "id": "process-priorities",
          "title": "nice & renice"
        }
      ]
    },
    {
      "id": "linux-fundamentals--core-linux-systems-6",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "file-management",
          "title": "File Management"
        },
        {
          "id": "links-hard-soft",
          "title": "Hard & Symbolic Links"
        },
        {
          "id": "environment-variables",
          "title": "Environment Variables"
        },
        {
          "id": "linux-boot-process",
          "title": "Linux Boot Process"
        },
        {
          "id": "kernel-modules",
          "title": "Kernel Modules"
        },
        {
          "id": "namespaces-cgroups",
          "title": "Namespaces & cgroups"
        }
      ]
    },
    {
      "id": "linux-fundamentals--core-linux-systems-7",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "devices-udev",
          "title": "Devices & udev"
        },
        {
          "id": "proc-sys-filesystems",
          "title": "/proc and /sys Filesystems"
        }
      ]
    }
  ],
  "shell-cli": [
    {
      "id": "shell-cli--shells-configuration",
      "title": "Shells & Configuration",
      "leaves": [
        {
          "id": "bash-shell",
          "title": "Bash"
        },
        {
          "id": "zsh-shell",
          "title": "Zsh & Oh My Zsh"
        },
        {
          "id": "fish-shell",
          "title": "Fish Shell"
        },
        {
          "id": "shell-aliases-functions",
          "title": "Aliases & Shell Functions"
        },
        {
          "id": "shell-history",
          "title": "Shell History"
        },
        {
          "id": "dotfiles-management",
          "title": "Dotfiles Management"
        }
      ]
    },
    {
      "id": "terminal-multiplexers",
      "title": "Terminal Multiplexers",
      "leaves": [
        {
          "id": "tmux",
          "title": "tmux"
        },
        {
          "id": "screen",
          "title": "GNU Screen"
        },
        {
          "id": "byobu",
          "title": "Byobu"
        },
        {
          "id": "zellij",
          "title": "Zellij"
        }
      ]
    },
    {
      "id": "terminal-emulators",
      "title": "Terminal Emulators",
      "leaves": [
        {
          "id": "iterm2",
          "title": "iTerm2"
        },
        {
          "id": "alacritty",
          "title": "Alacritty"
        },
        {
          "id": "wezterm",
          "title": "WezTerm"
        },
        {
          "id": "kitty",
          "title": "Kitty"
        },
        {
          "id": "ghostty",
          "title": "Ghostty"
        },
        {
          "id": "warp",
          "title": "Warp"
        },
        {
          "id": "windows-terminal",
          "title": "Windows Terminal"
        }
      ]
    },
    {
      "id": "text-processing-tools",
      "title": "Text Processing Tools",
      "leaves": [
        {
          "id": "grep",
          "title": "grep"
        },
        {
          "id": "sed",
          "title": "sed"
        },
        {
          "id": "awk",
          "title": "awk"
        },
        {
          "id": "cut",
          "title": "cut"
        },
        {
          "id": "sort",
          "title": "sort"
        },
        {
          "id": "uniq",
          "title": "uniq"
        },
        {
          "id": "wc",
          "title": "wc"
        },
        {
          "id": "tr",
          "title": "tr"
        },
        {
          "id": "paste",
          "title": "paste"
        },
        {
          "id": "jq",
          "title": "jq"
        },
        {
          "id": "yq",
          "title": "yq"
        },
        {
          "id": "dasel",
          "title": "dasel"
        },
        {
          "id": "xmlstarlet",
          "title": "xmlstarlet"
        }
      ]
    },
    {
      "id": "file-finders",
      "title": "File Finders",
      "leaves": [
        {
          "id": "find",
          "title": "find"
        },
        {
          "id": "locate",
          "title": "locate"
        },
        {
          "id": "fd",
          "title": "fd"
        }
      ]
    },
    {
      "id": "modern-cli-replacements",
      "title": "Modern CLI Replacements",
      "leaves": [
        {
          "id": "ripgrep",
          "title": "ripgrep (rg)"
        },
        {
          "id": "bat",
          "title": "bat"
        },
        {
          "id": "eza",
          "title": "eza (formerly exa)"
        },
        {
          "id": "fzf",
          "title": "fzf"
        },
        {
          "id": "zoxide",
          "title": "zoxide"
        },
        {
          "id": "delta",
          "title": "delta (diffs)"
        },
        {
          "id": "duf-dust",
          "title": "duf & dust"
        },
        {
          "id": "starship-prompt",
          "title": "Starship Prompt"
        }
      ]
    },
    {
      "id": "ssh-and-file-transfer",
      "title": "SSH & File Transfer",
      "leaves": [
        {
          "id": "ssh-keys",
          "title": "SSH Keys"
        },
        {
          "id": "ssh-config",
          "title": "SSH Config"
        },
        {
          "id": "ssh-agent",
          "title": "SSH Agent & Forwarding"
        },
        {
          "id": "ssh-tunnels",
          "title": "SSH Tunnels & Port Forwarding"
        },
        {
          "id": "scp",
          "title": "scp"
        },
        {
          "id": "rsync",
          "title": "rsync"
        },
        {
          "id": "sftp",
          "title": "sftp"
        },
        {
          "id": "mosh",
          "title": "mosh"
        },
        {
          "id": "teleport-ssh",
          "title": "Teleport SSH"
        }
      ]
    },
    {
      "id": "http-cli-tools",
      "title": "HTTP CLI Tools",
      "leaves": [
        {
          "id": "curl",
          "title": "curl"
        },
        {
          "id": "wget",
          "title": "wget"
        },
        {
          "id": "httpie",
          "title": "HTTPie"
        },
        {
          "id": "xh",
          "title": "xh"
        }
      ]
    },
    {
      "id": "archive-compression",
      "title": "Archive & Compression",
      "leaves": [
        {
          "id": "tar",
          "title": "tar"
        },
        {
          "id": "gzip-bzip2-xz",
          "title": "gzip, bzip2, xz"
        },
        {
          "id": "zip-unzip",
          "title": "zip & unzip"
        },
        {
          "id": "zstd",
          "title": "zstd"
        }
      ]
    }
  ],
  "networking-fundamentals": [
    {
      "id": "networking-fundamentals--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "osi-model",
          "title": "OSI Model"
        },
        {
          "id": "tcp-ip-model",
          "title": "TCP/IP Model"
        },
        {
          "id": "ipv4-ipv6",
          "title": "IPv4 & IPv6"
        },
        {
          "id": "subnetting-cidr",
          "title": "Subnetting & CIDR"
        },
        {
          "id": "mac-addresses-arp",
          "title": "MAC Addresses & ARP"
        },
        {
          "id": "ports-sockets",
          "title": "Ports & Sockets"
        }
      ]
    },
    {
      "id": "networking-fundamentals--network-foundations-2",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "tcp-protocol",
          "title": "TCP"
        },
        {
          "id": "udp-protocol",
          "title": "UDP"
        },
        {
          "id": "icmp-protocol",
          "title": "ICMP"
        },
        {
          "id": "nat-pat",
          "title": "NAT & PAT"
        },
        {
          "id": "routing-basics",
          "title": "Routing Basics"
        },
        {
          "id": "switching-basics",
          "title": "Switching Basics"
        }
      ]
    },
    {
      "id": "networking-fundamentals--network-foundations-3",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "vlan-vxlan",
          "title": "VLAN & VXLAN"
        },
        {
          "id": "mtu-fragmentation",
          "title": "MTU & Fragmentation"
        },
        {
          "id": "qos-traffic-shaping",
          "title": "QoS & Traffic Shaping"
        },
        {
          "id": "sdn-overview",
          "title": "Software-Defined Networking (SDN)"
        }
      ]
    },
    {
      "id": "common-protocols",
      "title": "Common Application Protocols",
      "leaves": [
        {
          "id": "http-https",
          "title": "HTTP & HTTPS"
        },
        {
          "id": "http2-http3",
          "title": "HTTP/2 & HTTP/3"
        },
        {
          "id": "websocket-protocol",
          "title": "WebSocket"
        },
        {
          "id": "grpc-protocol",
          "title": "gRPC"
        },
        {
          "id": "quic-protocol",
          "title": "QUIC"
        },
        {
          "id": "ftp-sftp",
          "title": "FTP & SFTP"
        },
        {
          "id": "smtp-imap-pop3",
          "title": "SMTP, IMAP & POP3"
        },
        {
          "id": "dhcp",
          "title": "DHCP"
        },
        {
          "id": "ntp",
          "title": "NTP"
        },
        {
          "id": "snmp",
          "title": "SNMP"
        },
        {
          "id": "ldap-protocol",
          "title": "LDAP"
        },
        {
          "id": "syslog-protocol",
          "title": "Syslog Protocol"
        }
      ]
    },
    {
      "id": "network-troubleshooting-tools",
      "title": "Network Troubleshooting Tools",
      "leaves": [
        {
          "id": "ping",
          "title": "ping"
        },
        {
          "id": "traceroute",
          "title": "traceroute & tracepath"
        },
        {
          "id": "mtr-tool",
          "title": "mtr"
        },
        {
          "id": "netstat-ss",
          "title": "netstat & ss"
        },
        {
          "id": "tcpdump",
          "title": "tcpdump"
        },
        {
          "id": "wireshark-tshark",
          "title": "Wireshark & tshark"
        },
        {
          "id": "nmap",
          "title": "nmap"
        },
        {
          "id": "dig-nslookup-host",
          "title": "dig, nslookup & host"
        },
        {
          "id": "iperf-iperf3",
          "title": "iperf / iperf3"
        },
        {
          "id": "netcat-ncat",
          "title": "netcat & ncat"
        },
        {
          "id": "bandwidth-latency-tools",
          "title": "Bandwidth & Latency Tools"
        }
      ]
    },
    {
      "id": "vpns",
      "title": "VPNs",
      "leaves": [
        {
          "id": "wireguard",
          "title": "WireGuard"
        },
        {
          "id": "openvpn",
          "title": "OpenVPN"
        },
        {
          "id": "ipsec-vpn",
          "title": "IPsec VPN"
        },
        {
          "id": "tailscale",
          "title": "Tailscale & Headscale"
        },
        {
          "id": "zerotier",
          "title": "ZeroTier"
        }
      ]
    },
    {
      "id": "ddos-protection",
      "title": "DDoS Protection",
      "leaves": [
        {
          "id": "aws-shield",
          "title": "AWS Shield (Standard & Advanced)"
        },
        {
          "id": "cloudflare-ddos-mitigation",
          "title": "Cloudflare DDoS Mitigation"
        },
        {
          "id": "azure-ddos-protection",
          "title": "Azure DDoS Protection"
        },
        {
          "id": "gcp-cloud-armor-ddos",
          "title": "GCP Cloud Armor (DDoS)"
        },
        {
          "id": "akamai-prolexic",
          "title": "Akamai Prolexic"
        },
        {
          "id": "radware-defense",
          "title": "Radware DefensePro"
        },
        {
          "id": "neustar-ddos",
          "title": "Neustar / Security Solutions DDoS"
        },
        {
          "id": "arbor-netscout",
          "title": "NETSCOUT Arbor"
        }
      ]
    },
    {
      "id": "network-observability",
      "title": "Network Observability",
      "leaves": [
        {
          "id": "kentik",
          "title": "Kentik"
        },
        {
          "id": "thousandeyes",
          "title": "Cisco ThousandEyes"
        },
        {
          "id": "librenms",
          "title": "LibreNMS"
        },
        {
          "id": "observium",
          "title": "Observium"
        },
        {
          "id": "netbox-ipam",
          "title": "NetBox (IPAM/DCIM)"
        },
        {
          "id": "netflow-protocol",
          "title": "NetFlow"
        },
        {
          "id": "sflow-protocol",
          "title": "sFlow"
        },
        {
          "id": "ipfix-protocol",
          "title": "IPFIX"
        },
        {
          "id": "pingmesh",
          "title": "PingMesh"
        },
        {
          "id": "ntopng",
          "title": "ntopng"
        }
      ]
    }
  ],
  "dns-service-discovery": [
    {
      "id": "dns-service-discovery--dns-core-concepts",
      "title": "DNS Core Concepts",
      "leaves": [
        {
          "id": "dns-fundamentals",
          "title": "DNS Fundamentals"
        }
      ]
    },
    {
      "id": "dns-record-types",
      "title": "DNS Record Types",
      "leaves": [
        {
          "id": "a-aaaa-records",
          "title": "A & AAAA"
        },
        {
          "id": "cname-records",
          "title": "CNAME"
        },
        {
          "id": "mx-records",
          "title": "MX"
        },
        {
          "id": "txt-records",
          "title": "TXT"
        },
        {
          "id": "srv-records",
          "title": "SRV"
        },
        {
          "id": "ns-records",
          "title": "NS"
        },
        {
          "id": "ptr-records",
          "title": "PTR"
        },
        {
          "id": "caa-records",
          "title": "CAA"
        },
        {
          "id": "spf-dkim-dmarc",
          "title": "SPF, DKIM & DMARC"
        },
        {
          "id": "dnssec-records",
          "title": "DNSSEC Records"
        },
        {
          "id": "alias-anonymous-records",
          "title": "ALIAS / ANAME Records"
        }
      ]
    },
    {
      "id": "dns-service-discovery--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "dns-resolution-process",
          "title": "DNS Resolution Process"
        },
        {
          "id": "authoritative-vs-recursive",
          "title": "Authoritative vs Recursive DNS"
        }
      ]
    },
    {
      "id": "dns-servers",
      "title": "DNS Servers",
      "leaves": [
        {
          "id": "bind9",
          "title": "BIND 9"
        },
        {
          "id": "powerdns",
          "title": "PowerDNS"
        },
        {
          "id": "coredns",
          "title": "CoreDNS"
        },
        {
          "id": "unbound",
          "title": "Unbound"
        },
        {
          "id": "dnsmasq",
          "title": "dnsmasq"
        },
        {
          "id": "knot-dns",
          "title": "Knot DNS"
        }
      ]
    },
    {
      "id": "managed-dns-providers",
      "title": "Managed DNS Providers",
      "leaves": [
        {
          "id": "cloudflare-dns",
          "title": "Cloudflare DNS"
        },
        {
          "id": "ns1",
          "title": "NS1"
        },
        {
          "id": "dnsimple",
          "title": "DNSimple"
        },
        {
          "id": "godaddy-namecheap",
          "title": "GoDaddy & Namecheap"
        }
      ]
    },
    {
      "id": "dns-service-discovery--dns-core-concepts-6",
      "title": "DNS Core Concepts",
      "leaves": [
        {
          "id": "dnssec",
          "title": "DNSSEC"
        },
        {
          "id": "doh-dot",
          "title": "DNS over HTTPS & TLS (DoH/DoT)"
        },
        {
          "id": "dns-caching-ttl",
          "title": "DNS Caching & TTL"
        },
        {
          "id": "dns-load-balancing",
          "title": "DNS-based Load Balancing & GeoDNS"
        }
      ]
    },
    {
      "id": "service-discovery-patterns",
      "title": "Service Discovery Patterns",
      "leaves": [
        {
          "id": "client-side-discovery",
          "title": "Client-Side Discovery"
        },
        {
          "id": "server-side-discovery",
          "title": "Server-Side Discovery"
        },
        {
          "id": "service-registry-pattern",
          "title": "Service Registry"
        },
        {
          "id": "self-registration",
          "title": "Self-Registration"
        },
        {
          "id": "3rd-party-registration",
          "title": "3rd-Party Registration"
        }
      ]
    },
    {
      "id": "service-discovery-tools",
      "title": "Service Discovery Tools",
      "leaves": [
        {
          "id": "consul-sd",
          "title": "Consul"
        },
        {
          "id": "etcd-sd",
          "title": "etcd"
        },
        {
          "id": "zookeeper-sd",
          "title": "Apache ZooKeeper"
        },
        {
          "id": "eureka",
          "title": "Netflix Eureka"
        },
        {
          "id": "k8s-coredns-sd",
          "title": "CoreDNS for Kubernetes"
        }
      ]
    }
  ],
  "load-balancing-proxies": [
    {
      "id": "load-balancing-proxies--load-balancing-fundamentals-related-topics",
      "title": "Load Balancing Fundamentals & Related Topics",
      "leaves": [
        {
          "id": "load-balancing-fundamentals",
          "title": "Load Balancing Fundamentals"
        },
        {
          "id": "layer-4-load-balancing",
          "title": "Layer 4 Load Balancing"
        },
        {
          "id": "layer-7-load-balancing",
          "title": "Layer 7 Load Balancing"
        }
      ]
    },
    {
      "id": "load-balancing-algorithms",
      "title": "Load Balancing Algorithms",
      "leaves": [
        {
          "id": "round-robin",
          "title": "Round Robin"
        },
        {
          "id": "weighted-round-robin",
          "title": "Weighted Round Robin"
        },
        {
          "id": "least-connections",
          "title": "Least Connections"
        },
        {
          "id": "least-response-time",
          "title": "Least Response Time"
        },
        {
          "id": "ip-hash",
          "title": "IP Hash"
        },
        {
          "id": "consistent-hashing",
          "title": "Consistent Hashing"
        },
        {
          "id": "random-algorithm",
          "title": "Random"
        },
        {
          "id": "p2c-power-of-two",
          "title": "Power of Two Choices"
        }
      ]
    },
    {
      "id": "load-balancing-proxies--health-checks-active-passive-related-topics",
      "title": "Health Checks (Active & Passive) & Related Topics",
      "leaves": [
        {
          "id": "health-checks",
          "title": "Health Checks (Active & Passive)"
        },
        {
          "id": "sticky-sessions",
          "title": "Sticky Sessions / Session Affinity"
        },
        {
          "id": "tls-termination",
          "title": "TLS Termination & Passthrough"
        },
        {
          "id": "reverse-vs-forward-proxy",
          "title": "Reverse vs Forward Proxy"
        }
      ]
    },
    {
      "id": "software-load-balancers",
      "title": "Software Load Balancers & Proxies",
      "leaves": [
        {
          "id": "nginx",
          "title": "Nginx"
        },
        {
          "id": "haproxy",
          "title": "HAProxy"
        },
        {
          "id": "envoy",
          "title": "Envoy Proxy"
        },
        {
          "id": "traefik",
          "title": "Traefik"
        },
        {
          "id": "caddy",
          "title": "Caddy"
        },
        {
          "id": "apache-httpd",
          "title": "Apache HTTP Server"
        },
        {
          "id": "pingora",
          "title": "Pingora"
        }
      ]
    },
    {
      "id": "hardware-load-balancers",
      "title": "Hardware Load Balancers",
      "leaves": [
        {
          "id": "f5-bigip",
          "title": "F5 BIG-IP"
        },
        {
          "id": "citrix-adc",
          "title": "Citrix ADC (NetScaler)"
        },
        {
          "id": "a10-networks",
          "title": "A10 Networks"
        }
      ]
    },
    {
      "id": "load-balancing-proxies--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "global-load-balancing",
          "title": "Global Server Load Balancing (GSLB)"
        },
        {
          "id": "anycast-routing",
          "title": "Anycast Routing"
        }
      ]
    },
    {
      "id": "cdn-overview",
      "title": "Content Delivery Networks (CDNs)",
      "leaves": [
        {
          "id": "cloudflare-cdn",
          "title": "Cloudflare"
        },
        {
          "id": "fastly",
          "title": "Fastly"
        },
        {
          "id": "akamai",
          "title": "Akamai"
        },
        {
          "id": "bunny-net",
          "title": "Bunny.net"
        },
        {
          "id": "cloudfront-cdn",
          "title": "Amazon CloudFront (CDN overview)"
        }
      ]
    },
    {
      "id": "waf-overview",
      "title": "Web Application Firewalls (WAF)",
      "leaves": [
        {
          "id": "aws-waf",
          "title": "AWS WAF"
        },
        {
          "id": "cloudflare-waf",
          "title": "Cloudflare WAF"
        },
        {
          "id": "azure-waf",
          "title": "Azure WAF (Front Door & App Gateway)"
        },
        {
          "id": "gcp-cloud-armor-waf",
          "title": "GCP Cloud Armor (WAF)"
        },
        {
          "id": "akamai-app-protector",
          "title": "Akamai App & API Protector"
        },
        {
          "id": "f5-bigip-asm",
          "title": "F5 BIG-IP Advanced WAF (ASM)"
        },
        {
          "id": "modsecurity-waf",
          "title": "ModSecurity"
        },
        {
          "id": "owasp-coreruleset",
          "title": "OWASP Core Rule Set (CRS)"
        },
        {
          "id": "wallarm-waf",
          "title": "Wallarm"
        },
        {
          "id": "imperva-waf",
          "title": "Imperva WAF"
        },
        {
          "id": "fastly-next-gen-waf",
          "title": "Fastly Next-Gen WAF (Signal Sciences)"
        }
      ]
    }
  ],
  "tls-ssl-pki": [
    {
      "id": "tls-ssl-pki--tls-certificate-operations",
      "title": "TLS & Certificate Operations",
      "leaves": [
        {
          "id": "tls-fundamentals",
          "title": "TLS Fundamentals"
        },
        {
          "id": "tls-handshake",
          "title": "TLS Handshake"
        },
        {
          "id": "tls-versions",
          "title": "TLS Versions (1.2, 1.3)"
        },
        {
          "id": "cipher-suites",
          "title": "Cipher Suites"
        },
        {
          "id": "symmetric-asymmetric-crypto",
          "title": "Symmetric & Asymmetric Cryptography"
        },
        {
          "id": "x509-certificates",
          "title": "X.509 Certificates"
        }
      ]
    },
    {
      "id": "tls-ssl-pki--tls-certificate-operations-2",
      "title": "TLS & Certificate Operations",
      "leaves": [
        {
          "id": "certificate-authorities",
          "title": "Certificate Authorities (CAs)"
        },
        {
          "id": "pki-overview",
          "title": "Public Key Infrastructure (PKI)"
        },
        {
          "id": "csr-creation",
          "title": "CSR Creation"
        },
        {
          "id": "self-signed-certificates",
          "title": "Self-Signed Certificates"
        }
      ]
    },
    {
      "id": "acme-protocol",
      "title": "ACME Protocol & Tooling",
      "leaves": [
        {
          "id": "zerossl",
          "title": "ZeroSSL"
        },
        {
          "id": "certbot",
          "title": "Certbot"
        },
        {
          "id": "acme-sh",
          "title": "acme.sh"
        },
        {
          "id": "cert-manager-acme",
          "title": "cert-manager (Kubernetes)"
        }
      ]
    },
    {
      "id": "tls-ssl-pki--tls-certificate-operations-4",
      "title": "TLS & Certificate Operations",
      "leaves": [
        {
          "id": "mtls",
          "title": "mTLS (Mutual TLS)"
        },
        {
          "id": "certificate-rotation",
          "title": "Certificate Rotation & Renewal"
        },
        {
          "id": "certificate-monitoring",
          "title": "Certificate Monitoring & Expiry Alerts"
        },
        {
          "id": "hsts",
          "title": "HSTS & HSTS Preload"
        },
        {
          "id": "ocsp-crl",
          "title": "OCSP, OCSP Stapling & CRL"
        }
      ]
    },
    {
      "id": "private-cas",
      "title": "Private CAs",
      "leaves": [
        {
          "id": "smallstep-step-ca",
          "title": "Smallstep step-ca"
        },
        {
          "id": "vault-pki",
          "title": "HashiCorp Vault PKI"
        },
        {
          "id": "cfssl",
          "title": "CFSSL"
        },
        {
          "id": "easyrsa",
          "title": "EasyRSA"
        }
      ]
    },
    {
      "id": "tls-ssl-pki--tls-certificate-operations-6",
      "title": "TLS & Certificate Operations",
      "leaves": [
        {
          "id": "openssl-cli",
          "title": "openssl CLI"
        },
        {
          "id": "tls-testing-tools",
          "title": "TLS Testing Tools (testssl.sh, SSL Labs)"
        },
        {
          "id": "post-quantum-crypto",
          "title": "Post-Quantum Cryptography (PQC) Overview"
        }
      ]
    },
    {
      "id": "zero-trust-platforms",
      "title": "Zero-Trust Network Access (ZTNA) Platforms",
      "leaves": [
        {
          "id": "beyondcorp-google",
          "title": "Google BeyondCorp Enterprise"
        },
        {
          "id": "cloudflare-one",
          "title": "Cloudflare One (Zero Trust)"
        },
        {
          "id": "cloudflare-tunnel",
          "title": "Cloudflare Tunnel"
        },
        {
          "id": "cloudflare-access",
          "title": "Cloudflare Access"
        },
        {
          "id": "zscaler-zpa",
          "title": "Zscaler Private Access (ZPA)"
        },
        {
          "id": "twingate-ztna",
          "title": "Twingate"
        },
        {
          "id": "netskope-private-access",
          "title": "Netskope Private Access"
        },
        {
          "id": "perimeter81",
          "title": "Check Point Perimeter 81"
        },
        {
          "id": "banyan-security",
          "title": "SonicWall (Banyan) Cloud Secure Edge"
        },
        {
          "id": "tailscale-ztna",
          "title": "Tailscale (Zero Trust Mode)"
        },
        {
          "id": "openziti-platform",
          "title": "OpenZiti / NetFoundry"
        }
      ]
    }
  ],
  "git-fundamentals": [
    {
      "id": "git-fundamentals--git-core-mechanics",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "what-is-version-control",
          "title": "What is Version Control?"
        },
        {
          "id": "distributed-vs-centralized-vcs",
          "title": "Distributed vs Centralized VCS"
        },
        {
          "id": "git-installation-setup",
          "title": "Git Installation & Setup"
        },
        {
          "id": "git-config",
          "title": "git config"
        },
        {
          "id": "git-objects-internals",
          "title": "Git Objects & Internals"
        },
        {
          "id": "git-repository-structure",
          "title": "Repository Structure (.git)"
        }
      ]
    },
    {
      "id": "git-fundamentals--git-core-mechanics-2",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "working-tree-staging-area",
          "title": "Working Tree & Staging Area"
        }
      ]
    },
    {
      "id": "git-basic-commands",
      "title": "Basic Git Commands",
      "leaves": [
        {
          "id": "git-init",
          "title": "git init"
        },
        {
          "id": "git-clone",
          "title": "git clone"
        },
        {
          "id": "git-add",
          "title": "git add"
        },
        {
          "id": "git-commit",
          "title": "git commit"
        },
        {
          "id": "git-status",
          "title": "git status"
        },
        {
          "id": "git-log",
          "title": "git log"
        },
        {
          "id": "git-diff",
          "title": "git diff"
        },
        {
          "id": "git-show",
          "title": "git show"
        },
        {
          "id": "git-rm-mv",
          "title": "git rm & git mv"
        }
      ]
    },
    {
      "id": "git-remotes",
      "title": "Remotes",
      "leaves": [
        {
          "id": "git-remote",
          "title": "git remote"
        },
        {
          "id": "git-fetch",
          "title": "git fetch"
        },
        {
          "id": "git-pull",
          "title": "git pull"
        },
        {
          "id": "git-push",
          "title": "git push"
        }
      ]
    },
    {
      "id": "git-branches",
      "title": "Branches",
      "leaves": [
        {
          "id": "git-branch",
          "title": "git branch"
        },
        {
          "id": "git-checkout-switch",
          "title": "git checkout & switch"
        },
        {
          "id": "git-merge",
          "title": "git merge"
        },
        {
          "id": "tracking-branches",
          "title": "Tracking Branches"
        },
        {
          "id": "delete-branch",
          "title": "Delete Branch"
        }
      ]
    },
    {
      "id": "git-tags-releases",
      "title": "Tags & Releases",
      "leaves": [
        {
          "id": "lightweight-tags",
          "title": "Lightweight Tags"
        },
        {
          "id": "annotated-tags",
          "title": "Annotated Tags"
        },
        {
          "id": "pushing-tags",
          "title": "Pushing Tags"
        }
      ]
    },
    {
      "id": "git-undoing-changes",
      "title": "Undoing Changes",
      "leaves": [
        {
          "id": "git-reset",
          "title": "git reset"
        },
        {
          "id": "git-revert",
          "title": "git revert"
        },
        {
          "id": "git-restore",
          "title": "git restore"
        },
        {
          "id": "git-reflog",
          "title": "git reflog"
        },
        {
          "id": "git-clean",
          "title": "git clean"
        }
      ]
    },
    {
      "id": "git-fundamentals--git-core-mechanics-8",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "git-stash",
          "title": "git stash"
        },
        {
          "id": "git-cherry-pick",
          "title": "git cherry-pick"
        },
        {
          "id": "gitignore",
          "title": ".gitignore"
        },
        {
          "id": "gitattributes",
          "title": ".gitattributes"
        },
        {
          "id": "merge-conflicts",
          "title": "Merge Conflicts & Resolution"
        },
        {
          "id": "git-bisect",
          "title": "git bisect"
        }
      ]
    },
    {
      "id": "git-fundamentals--git-core-mechanics-9",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "git-blame",
          "title": "git blame"
        }
      ]
    }
  ],
  "git-workflows": [
    {
      "id": "git-workflows--branching-release-workflows",
      "title": "Branching & Release Workflows",
      "leaves": [
        {
          "id": "centralized-workflow",
          "title": "Centralized Workflow"
        },
        {
          "id": "feature-branch-workflow",
          "title": "Feature Branch Workflow"
        },
        {
          "id": "gitflow-workflow",
          "title": "GitFlow"
        },
        {
          "id": "github-flow",
          "title": "GitHub Flow"
        },
        {
          "id": "gitlab-flow",
          "title": "GitLab Flow"
        },
        {
          "id": "trunk-based-development",
          "title": "Trunk-Based Development"
        }
      ]
    },
    {
      "id": "git-workflows--git-core-mechanics",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "forking-workflow",
          "title": "Forking Workflow"
        },
        {
          "id": "release-branching",
          "title": "Release Branching"
        },
        {
          "id": "hotfix-branches",
          "title": "Hotfix Branches"
        },
        {
          "id": "environment-branches",
          "title": "Environment Branches"
        },
        {
          "id": "rebase-vs-merge",
          "title": "Rebase vs Merge"
        },
        {
          "id": "interactive-rebase",
          "title": "Interactive Rebase"
        }
      ]
    },
    {
      "id": "git-workflows--squash-merging-related-topics",
      "title": "Squash Merging & Related Topics",
      "leaves": [
        {
          "id": "squash-merging",
          "title": "Squash Merging"
        },
        {
          "id": "fast-forward-vs-no-ff",
          "title": "Fast-Forward vs No-FF Merges"
        },
        {
          "id": "conventional-commits",
          "title": "Conventional Commits"
        },
        {
          "id": "semantic-release",
          "title": "Semantic Release"
        },
        {
          "id": "changesets",
          "title": "Changesets"
        },
        {
          "id": "signed-commits",
          "title": "Signed Commits (GPG & SSH)"
        }
      ]
    },
    {
      "id": "git-hooks",
      "title": "Git Hooks",
      "leaves": [
        {
          "id": "pre-commit-hook",
          "title": "pre-commit"
        },
        {
          "id": "commit-msg-hook",
          "title": "commit-msg"
        },
        {
          "id": "pre-push-hook",
          "title": "pre-push"
        },
        {
          "id": "post-receive-hook",
          "title": "post-receive"
        },
        {
          "id": "husky",
          "title": "Husky"
        },
        {
          "id": "lefthook",
          "title": "Lefthook"
        },
        {
          "id": "pre-commit-framework",
          "title": "pre-commit Framework"
        }
      ]
    },
    {
      "id": "git-workflows--monorepo-vs-polyrepo-related-topics",
      "title": "Monorepo vs Polyrepo & Related Topics",
      "leaves": [
        {
          "id": "monorepo-vs-polyrepo",
          "title": "Monorepo vs Polyrepo"
        },
        {
          "id": "submodules-subtrees",
          "title": "Submodules & Subtrees"
        },
        {
          "id": "git-lfs",
          "title": "Git LFS (Large File Storage)"
        },
        {
          "id": "sparse-checkout",
          "title": "Sparse Checkout"
        },
        {
          "id": "partial-clone",
          "title": "Partial Clone"
        },
        {
          "id": "git-worktrees",
          "title": "Git Worktrees"
        }
      ]
    }
  ],
  "code-hosting-platforms": [
    {
      "id": "github-platform",
      "title": "GitHub",
      "leaves": [
        {
          "id": "github-repos",
          "title": "GitHub Repositories"
        },
        {
          "id": "github-issues",
          "title": "GitHub Issues"
        },
        {
          "id": "github-projects",
          "title": "GitHub Projects"
        },
        {
          "id": "github-discussions",
          "title": "GitHub Discussions"
        },
        {
          "id": "github-wiki",
          "title": "GitHub Wiki"
        },
        {
          "id": "github-pages",
          "title": "GitHub Pages"
        },
        {
          "id": "github-codespaces",
          "title": "GitHub Codespaces"
        },
        {
          "id": "github-copilot",
          "title": "GitHub Copilot"
        },
        {
          "id": "github-packages",
          "title": "GitHub Packages"
        },
        {
          "id": "github-advanced-security",
          "title": "GitHub Advanced Security"
        },
        {
          "id": "github-cli-gh",
          "title": "GitHub CLI (gh)"
        },
        {
          "id": "github-api",
          "title": "GitHub REST & GraphQL APIs"
        },
        {
          "id": "github-apps-webhooks",
          "title": "GitHub Apps & Webhooks"
        },
        {
          "id": "github-environments",
          "title": "GitHub Environments"
        }
      ]
    },
    {
      "id": "gitlab-platform",
      "title": "GitLab",
      "leaves": [
        {
          "id": "gitlab-repos",
          "title": "GitLab Repositories"
        },
        {
          "id": "gitlab-issues",
          "title": "GitLab Issues"
        },
        {
          "id": "gitlab-epics",
          "title": "GitLab Epics & Iterations"
        },
        {
          "id": "gitlab-pages",
          "title": "GitLab Pages"
        },
        {
          "id": "gitlab-package-registry",
          "title": "GitLab Package Registry"
        },
        {
          "id": "gitlab-container-registry",
          "title": "GitLab Container Registry"
        },
        {
          "id": "gitlab-environments",
          "title": "GitLab Environments"
        },
        {
          "id": "gitlab-duo",
          "title": "GitLab Duo (AI)"
        },
        {
          "id": "gitlab-self-managed",
          "title": "Self-Managed GitLab"
        }
      ]
    },
    {
      "id": "bitbucket-platform",
      "title": "Bitbucket",
      "leaves": [
        {
          "id": "bitbucket-cloud",
          "title": "Bitbucket Cloud"
        },
        {
          "id": "bitbucket-data-center",
          "title": "Bitbucket Data Center"
        },
        {
          "id": "bitbucket-pipelines-overview",
          "title": "Bitbucket Pipelines (Overview)"
        }
      ]
    },
    {
      "id": "code-hosting-platforms--azure-repos",
      "title": "Azure Repos",
      "leaves": [
        {
          "id": "azure-repos",
          "title": "Azure Repos"
        }
      ]
    },
    {
      "id": "self-hosted-git-platforms",
      "title": "Self-Hosted Git Platforms",
      "leaves": [
        {
          "id": "gitea",
          "title": "Gitea"
        },
        {
          "id": "forgejo",
          "title": "Forgejo"
        },
        {
          "id": "sourcehut",
          "title": "SourceHut"
        },
        {
          "id": "gerrit",
          "title": "Gerrit Code Review"
        }
      ]
    },
    {
      "id": "code-hosting-platforms--permissions-access-control-related-topics",
      "title": "Permissions & Access Control & Related Topics",
      "leaves": [
        {
          "id": "platform-permissions-access",
          "title": "Permissions & Access Control"
        },
        {
          "id": "sso-saml-scim",
          "title": "SSO, SAML & SCIM Integrations"
        },
        {
          "id": "deprecated-codecommit",
          "title": "AWS CodeCommit (Deprecation Note)"
        }
      ]
    }
  ],
  "code-review-quality": [
    {
      "id": "code-review-quality--code-review-quality-gates",
      "title": "Code Review & Quality Gates",
      "leaves": [
        {
          "id": "pull-merge-requests",
          "title": "Pull Requests & Merge Requests"
        },
        {
          "id": "code-review-best-practices",
          "title": "Code Review Best Practices"
        },
        {
          "id": "small-prs-incremental-review",
          "title": "Small PRs & Incremental Review"
        },
        {
          "id": "review-checklists",
          "title": "Review Checklists"
        },
        {
          "id": "stacked-prs",
          "title": "Stacked PRs & Diff Stacking"
        }
      ]
    },
    {
      "id": "automated-review-tools",
      "title": "Automated Review Tools",
      "leaves": [
        {
          "id": "reviewdog",
          "title": "reviewdog"
        },
        {
          "id": "danger-js",
          "title": "Danger JS"
        },
        {
          "id": "codeowners",
          "title": "CODEOWNERS"
        }
      ]
    },
    {
      "id": "ai-code-review-tools",
      "title": "AI Code Review Tools",
      "leaves": [
        {
          "id": "github-copilot-reviews",
          "title": "GitHub Copilot Reviews"
        },
        {
          "id": "cursor-bugbot",
          "title": "Cursor BugBot"
        },
        {
          "id": "graphite-reviewer",
          "title": "Graphite Reviewer"
        },
        {
          "id": "coderabbit",
          "title": "CodeRabbit"
        },
        {
          "id": "qodo-merge",
          "title": "Qodo Merge (formerly PR-Agent)"
        },
        {
          "id": "gitlab-duo-code-review",
          "title": "GitLab Duo Code Review"
        }
      ]
    },
    {
      "id": "linters",
      "title": "Linters",
      "leaves": [
        {
          "id": "eslint-lint",
          "title": "ESLint"
        },
        {
          "id": "pylint-ruff",
          "title": "Pylint & Ruff"
        },
        {
          "id": "golangci-lint",
          "title": "golangci-lint"
        },
        {
          "id": "shellcheck",
          "title": "ShellCheck"
        },
        {
          "id": "hadolint",
          "title": "hadolint (Dockerfile)"
        },
        {
          "id": "yamllint",
          "title": "yamllint"
        },
        {
          "id": "tflint",
          "title": "tflint (Terraform)"
        },
        {
          "id": "markdownlint",
          "title": "markdownlint"
        },
        {
          "id": "rubocop",
          "title": "RuboCop"
        }
      ]
    },
    {
      "id": "formatters",
      "title": "Formatters",
      "leaves": [
        {
          "id": "prettier",
          "title": "Prettier"
        },
        {
          "id": "black-formatter",
          "title": "Black (Python)"
        },
        {
          "id": "gofmt",
          "title": "gofmt & goimports"
        },
        {
          "id": "shfmt",
          "title": "shfmt"
        },
        {
          "id": "terraform-fmt",
          "title": "terraform fmt"
        },
        {
          "id": "rustfmt",
          "title": "rustfmt"
        },
        {
          "id": "clang-format",
          "title": "clang-format"
        }
      ]
    },
    {
      "id": "static-analysis-platforms",
      "title": "Static Analysis Platforms",
      "leaves": [
        {
          "id": "sonarqube",
          "title": "SonarQube"
        },
        {
          "id": "sonarcloud",
          "title": "SonarCloud / SonarQube Cloud"
        },
        {
          "id": "codeclimate",
          "title": "Code Climate"
        },
        {
          "id": "semgrep",
          "title": "Semgrep"
        },
        {
          "id": "codeql",
          "title": "GitHub CodeQL"
        }
      ]
    },
    {
      "id": "code-coverage-tools",
      "title": "Code Coverage Tools",
      "leaves": [
        {
          "id": "codecov",
          "title": "Codecov"
        },
        {
          "id": "coveralls",
          "title": "Coveralls"
        }
      ]
    },
    {
      "id": "code-review-quality--git-core-mechanics",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "quality-gates",
          "title": "Quality Gates"
        },
        {
          "id": "branch-protection-rules",
          "title": "Branch Protection Rules"
        }
      ]
    },
    {
      "id": "merge-queues",
      "title": "Merge Queues",
      "leaves": [
        {
          "id": "github-merge-queue",
          "title": "GitHub Merge Queue"
        },
        {
          "id": "mergify",
          "title": "Mergify"
        },
        {
          "id": "kodiak",
          "title": "Kodiak"
        },
        {
          "id": "aviator-merge",
          "title": "Aviator"
        }
      ]
    },
    {
      "id": "code-review-quality--dependency-update-bots-dependabot-renovate",
      "title": "Dependency Update Bots (Dependabot, Renovate)",
      "leaves": [
        {
          "id": "dependency-update-bots",
          "title": "Dependency Update Bots (Dependabot, Renovate)"
        }
      ]
    }
  ],
  "bash-shell-scripting": [
    {
      "id": "bash-shell-scripting--shells-configuration",
      "title": "Shells & Configuration",
      "leaves": [
        {
          "id": "bash-variables-quoting",
          "title": "Variables & Quoting"
        },
        {
          "id": "bash-conditionals",
          "title": "Conditionals (if, case, test)"
        },
        {
          "id": "bash-loops",
          "title": "Loops (for, while, until, select)"
        },
        {
          "id": "bash-functions",
          "title": "Functions"
        }
      ]
    },
    {
      "id": "bash-arrays",
      "title": "Arrays",
      "leaves": [
        {
          "id": "indexed-arrays",
          "title": "Indexed Arrays"
        },
        {
          "id": "associative-arrays",
          "title": "Associative Arrays"
        }
      ]
    },
    {
      "id": "bash-shell-scripting--string-manipulation-parameter-expansion-related-",
      "title": "String Manipulation & Parameter Expansion & Related Topics",
      "leaves": [
        {
          "id": "bash-string-manipulation",
          "title": "String Manipulation & Parameter Expansion"
        },
        {
          "id": "bash-arithmetic",
          "title": "Arithmetic"
        },
        {
          "id": "io-redirection",
          "title": "I/O Redirection"
        },
        {
          "id": "pipes-and-filters",
          "title": "Pipes & Filters"
        },
        {
          "id": "process-substitution",
          "title": "Process Substitution"
        },
        {
          "id": "command-substitution",
          "title": "Command Substitution"
        }
      ]
    },
    {
      "id": "bash-error-handling",
      "title": "Exit Codes & Error Handling",
      "leaves": [
        {
          "id": "set-e-u-pipefail",
          "title": "set -e, -u, -o pipefail"
        },
        {
          "id": "trap",
          "title": "trap"
        },
        {
          "id": "exit-codes",
          "title": "Exit Codes"
        },
        {
          "id": "bash-strict-mode",
          "title": "Bash Strict Mode"
        }
      ]
    },
    {
      "id": "bash-shell-scripting--subshells-background-jobs-related-topics",
      "title": "Subshells & Background Jobs & Related Topics",
      "leaves": [
        {
          "id": "subshells-background-jobs",
          "title": "Subshells & Background Jobs"
        },
        {
          "id": "reading-user-input",
          "title": "Reading User Input (read)"
        },
        {
          "id": "bash-getopts",
          "title": "CLI Argument Parsing (getopts, getopt)"
        },
        {
          "id": "heredocs-herestrings",
          "title": "Heredocs & Herestrings"
        },
        {
          "id": "bash-debugging",
          "title": "Debugging Bash Scripts (set -x, bash -n)"
        },
        {
          "id": "shellcheck-integration",
          "title": "ShellCheck Integration"
        }
      ]
    },
    {
      "id": "bash-common-patterns",
      "title": "Common Patterns",
      "leaves": [
        {
          "id": "shell-logging-pattern",
          "title": "Logging"
        },
        {
          "id": "shell-locking-flock",
          "title": "Locking (flock)"
        },
        {
          "id": "shell-retry-backoff",
          "title": "Retry & Backoff"
        },
        {
          "id": "shell-idempotency",
          "title": "Idempotency"
        },
        {
          "id": "shell-temp-files",
          "title": "Temp Files & Cleanup"
        }
      ]
    },
    {
      "id": "bash-shell-scripting--shells-configuration-7",
      "title": "Shells & Configuration",
      "leaves": [
        {
          "id": "bash-style-guide",
          "title": "Bash Style Guide & Best Practices"
        }
      ]
    }
  ],
  "powershell-scripting": [
    {
      "id": "powershell-editions",
      "title": "PowerShell Editions",
      "leaves": [
        {
          "id": "windows-powershell",
          "title": "Windows PowerShell 5.1"
        },
        {
          "id": "powershell-7-pwsh",
          "title": "PowerShell 7+ (pwsh)"
        }
      ]
    },
    {
      "id": "powershell-scripting--cmdlets-related-topics",
      "title": "Cmdlets & Related Topics",
      "leaves": [
        {
          "id": "cmdlets",
          "title": "Cmdlets"
        },
        {
          "id": "powershell-pipelines-objects",
          "title": "Pipelines & Objects"
        },
        {
          "id": "powershell-variables-types",
          "title": "Variables & Data Types"
        },
        {
          "id": "powershell-operators",
          "title": "Operators"
        },
        {
          "id": "powershell-control-flow",
          "title": "Control Flow"
        },
        {
          "id": "powershell-functions",
          "title": "Functions & Advanced Functions"
        }
      ]
    },
    {
      "id": "powershell-scripting--modules-related-topics",
      "title": "Modules & Related Topics",
      "leaves": [
        {
          "id": "powershell-modules",
          "title": "Modules"
        },
        {
          "id": "powershell-error-handling",
          "title": "Error Handling (try/catch, ErrorAction)"
        }
      ]
    },
    {
      "id": "powershell-remoting",
      "title": "PowerShell Remoting",
      "leaves": [
        {
          "id": "psremoting-winrm",
          "title": "PSRemoting & WinRM"
        },
        {
          "id": "powershell-ssh-remoting",
          "title": "SSH Remoting"
        }
      ]
    },
    {
      "id": "powershell-scripting--desired-state-configuration-dsc-related-topics",
      "title": "Desired State Configuration (DSC) & Related Topics",
      "leaves": [
        {
          "id": "desired-state-configuration",
          "title": "Desired State Configuration (DSC)"
        },
        {
          "id": "powershell-jobs",
          "title": "Background Jobs & ThreadJobs"
        },
        {
          "id": "powershell-profiles",
          "title": "Profiles"
        }
      ]
    },
    {
      "id": "powershell-package-management",
      "title": "Package Management",
      "leaves": [
        {
          "id": "powershellget",
          "title": "PowerShellGet"
        },
        {
          "id": "psresourceget",
          "title": "PSResourceGet"
        },
        {
          "id": "powershell-gallery",
          "title": "PowerShell Gallery"
        }
      ]
    },
    {
      "id": "powershell-scripting--microsoft-graph-azure-powershell-related-topics",
      "title": "Microsoft Graph & Azure PowerShell & Related Topics",
      "leaves": [
        {
          "id": "powershell-graph-azure",
          "title": "Microsoft Graph & Azure PowerShell"
        },
        {
          "id": "powershell-classes",
          "title": "PowerShell Classes"
        },
        {
          "id": "pester-testing",
          "title": "Pester (PowerShell Testing)"
        }
      ]
    }
  ],
  "go-for-devops": [
    {
      "id": "go-for-devops--why-go-for-devops-related-topics",
      "title": "Why Go for DevOps & Related Topics",
      "leaves": [
        {
          "id": "why-go-devops",
          "title": "Why Go for DevOps"
        },
        {
          "id": "go-basics",
          "title": "Go Basics (Variables, Types, Control Flow)"
        },
        {
          "id": "go-functions-methods",
          "title": "Functions & Methods"
        },
        {
          "id": "go-structs-interfaces",
          "title": "Structs & Interfaces"
        },
        {
          "id": "go-error-handling",
          "title": "Error Handling"
        }
      ]
    },
    {
      "id": "go-concurrency",
      "title": "Concurrency",
      "leaves": [
        {
          "id": "goroutines",
          "title": "Goroutines"
        },
        {
          "id": "go-channels",
          "title": "Channels"
        },
        {
          "id": "go-select",
          "title": "select Statement"
        },
        {
          "id": "go-context",
          "title": "context Package"
        },
        {
          "id": "sync-package",
          "title": "sync Package"
        }
      ]
    },
    {
      "id": "go-stdlib-for-devops",
      "title": "Standard Library Highlights",
      "leaves": [
        {
          "id": "os-exec",
          "title": "os & os/exec"
        },
        {
          "id": "net-http",
          "title": "net/http"
        },
        {
          "id": "encoding-json-yaml",
          "title": "encoding/json & yaml"
        },
        {
          "id": "go-flag-package",
          "title": "flag Package"
        },
        {
          "id": "go-log-slog",
          "title": "log & log/slog"
        },
        {
          "id": "go-io-fs",
          "title": "io & io/fs"
        }
      ]
    },
    {
      "id": "go-for-devops--cobra-cli-framework-related-topics",
      "title": "Cobra (CLI Framework) & Related Topics",
      "leaves": [
        {
          "id": "cobra-cli",
          "title": "Cobra (CLI Framework)"
        },
        {
          "id": "viper-config",
          "title": "Viper (Configuration)"
        },
        {
          "id": "building-cli-tools-go",
          "title": "Building DevOps CLI Tools"
        }
      ]
    },
    {
      "id": "kubernetes-operators-in-go",
      "title": "Building Kubernetes Operators in Go",
      "leaves": [
        {
          "id": "controller-runtime",
          "title": "controller-runtime"
        },
        {
          "id": "kubebuilder-go",
          "title": "Kubebuilder"
        },
        {
          "id": "operator-sdk-go",
          "title": "Operator SDK"
        }
      ]
    },
    {
      "id": "go-for-devops--cross-compilation-related-topics",
      "title": "Cross-Compilation & Related Topics",
      "leaves": [
        {
          "id": "go-cross-compilation",
          "title": "Cross-Compilation"
        },
        {
          "id": "go-modules-deps",
          "title": "Modules & Dependency Management"
        },
        {
          "id": "go-testing",
          "title": "Testing (testing, testify, ginkgo)"
        },
        {
          "id": "notable-go-devops-tools",
          "title": "Notable Go-Based DevOps Tools"
        },
        {
          "id": "goreleaser",
          "title": "GoReleaser"
        }
      ]
    }
  ],
  "configuration-languages": [
    {
      "id": "yaml",
      "title": "YAML",
      "leaves": [
        {
          "id": "yaml-syntax",
          "title": "YAML Syntax & Data Types"
        },
        {
          "id": "yaml-anchors-aliases",
          "title": "Anchors & Aliases"
        },
        {
          "id": "yaml-multiline-strings",
          "title": "Multiline Strings (|, >)"
        },
        {
          "id": "yaml-merge-keys",
          "title": "Merge Keys"
        },
        {
          "id": "yaml-versions",
          "title": "YAML 1.1 vs 1.2"
        },
        {
          "id": "yaml-pitfalls",
          "title": "YAML Pitfalls (Norway Problem)"
        },
        {
          "id": "yaml-schemas",
          "title": "YAML Schemas"
        },
        {
          "id": "strict-yaml",
          "title": "StrictYAML"
        }
      ]
    },
    {
      "id": "json",
      "title": "JSON",
      "leaves": [
        {
          "id": "json-syntax",
          "title": "JSON Syntax"
        },
        {
          "id": "json5",
          "title": "JSON5"
        },
        {
          "id": "json-with-comments",
          "title": "JSONC"
        },
        {
          "id": "json-schema",
          "title": "JSON Schema"
        },
        {
          "id": "json-pointer-patch",
          "title": "JSON Pointer & Patch"
        }
      ]
    },
    {
      "id": "toml",
      "title": "TOML",
      "leaves": [
        {
          "id": "toml-syntax",
          "title": "TOML Syntax"
        },
        {
          "id": "toml-use-cases",
          "title": "TOML Use Cases (Cargo, Poetry, pyproject)"
        }
      ]
    },
    {
      "id": "configuration-languages--hcl-hashicorp-configuration-language-related-top",
      "title": "HCL (HashiCorp Configuration Language) & Related Topics",
      "leaves": [
        {
          "id": "hcl",
          "title": "HCL (HashiCorp Configuration Language)"
        },
        {
          "id": "ini-files",
          "title": "INI Files"
        },
        {
          "id": "xml-overview",
          "title": "XML (Overview)"
        },
        {
          "id": "environment-files-dotenv",
          "title": ".env Files (dotenv)"
        },
        {
          "id": "env-substitution",
          "title": "envsubst & Variable Expansion"
        }
      ]
    },
    {
      "id": "templating-engines",
      "title": "Templating Engines",
      "leaves": [
        {
          "id": "jinja2",
          "title": "Jinja2"
        },
        {
          "id": "go-templates",
          "title": "Go Templates"
        },
        {
          "id": "helm-templates",
          "title": "Helm Templates (Sprig)"
        },
        {
          "id": "mustache-handlebars",
          "title": "Mustache & Handlebars"
        },
        {
          "id": "liquid-template",
          "title": "Liquid"
        }
      ]
    },
    {
      "id": "data-interchange-formats",
      "title": "Data Interchange Formats",
      "leaves": [
        {
          "id": "protocol-buffers",
          "title": "Protocol Buffers"
        },
        {
          "id": "apache-avro",
          "title": "Apache Avro"
        },
        {
          "id": "messagepack",
          "title": "MessagePack"
        },
        {
          "id": "cbor",
          "title": "CBOR"
        },
        {
          "id": "flatbuffers",
          "title": "FlatBuffers"
        }
      ]
    },
    {
      "id": "next-gen-config-languages",
      "title": "Next-Gen Configuration Languages",
      "leaves": [
        {
          "id": "jsonnet",
          "title": "Jsonnet"
        },
        {
          "id": "cue-lang",
          "title": "CUE"
        },
        {
          "id": "dhall",
          "title": "Dhall"
        },
        {
          "id": "nickel",
          "title": "Nickel"
        },
        {
          "id": "kcl-lang",
          "title": "KCL"
        },
        {
          "id": "pkl",
          "title": "Pkl (Apple)"
        },
        {
          "id": "starlark",
          "title": "Starlark"
        }
      ]
    }
  ],
  "regex-for-devops": [
    {
      "id": "regex-for-devops--regex-fundamentals-related-topics",
      "title": "Regex Fundamentals & Related Topics",
      "leaves": [
        {
          "id": "regex-fundamentals",
          "title": "Regex Fundamentals"
        },
        {
          "id": "regex-character-classes",
          "title": "Character Classes"
        },
        {
          "id": "regex-quantifiers",
          "title": "Quantifiers"
        },
        {
          "id": "regex-anchors",
          "title": "Anchors & Boundaries"
        },
        {
          "id": "regex-groups-backreferences",
          "title": "Groups & Backreferences"
        },
        {
          "id": "regex-lookaround",
          "title": "Lookahead & Lookbehind"
        }
      ]
    },
    {
      "id": "regex-for-devops--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "regex-greedy-vs-lazy",
          "title": "Greedy vs Lazy Matching"
        }
      ]
    },
    {
      "id": "regex-flavors",
      "title": "Regex Flavors",
      "leaves": [
        {
          "id": "posix-bre-ere",
          "title": "POSIX BRE & ERE"
        },
        {
          "id": "pcre",
          "title": "PCRE & PCRE2"
        },
        {
          "id": "perl-regex",
          "title": "Perl Regex"
        },
        {
          "id": "re2",
          "title": "RE2 (Go)"
        },
        {
          "id": "javascript-regex",
          "title": "JavaScript Regex"
        }
      ]
    },
    {
      "id": "regex-in-devops-tools",
      "title": "Regex in DevOps Tools",
      "leaves": [
        {
          "id": "regex-in-grep",
          "title": "Regex in grep / ripgrep"
        },
        {
          "id": "regex-in-sed-awk",
          "title": "Regex in sed & awk"
        },
        {
          "id": "regex-in-fluentd-vector",
          "title": "Regex in Fluentd / Fluent Bit / Vector"
        },
        {
          "id": "regex-in-prometheus-relabel",
          "title": "Regex in Prometheus relabel_configs"
        },
        {
          "id": "regex-in-logstash",
          "title": "Regex / Grok in Logstash"
        }
      ]
    },
    {
      "id": "regex-for-devops--regex-testing-tools-regex101-regexr",
      "title": "Regex Testing Tools (regex101, regexr)",
      "leaves": [
        {
          "id": "regex-testing-tools",
          "title": "Regex Testing Tools (regex101, regexr)"
        }
      ]
    },
    {
      "id": "regex-common-devops-patterns",
      "title": "Common DevOps Regex Patterns",
      "leaves": [
        {
          "id": "regex-ip-addresses",
          "title": "IP Addresses"
        },
        {
          "id": "regex-urls",
          "title": "URLs"
        },
        {
          "id": "regex-timestamps",
          "title": "Timestamps"
        },
        {
          "id": "regex-log-parsing",
          "title": "Log Line Parsing"
        },
        {
          "id": "regex-semver",
          "title": "Semantic Versions"
        }
      ]
    },
    {
      "id": "regex-for-devops--regex-performance-redos",
      "title": "Regex Performance & ReDoS",
      "leaves": [
        {
          "id": "regex-performance-redos",
          "title": "Regex Performance & ReDoS"
        }
      ]
    }
  ],
  "build-tools": [
    {
      "id": "build-tools--gnu-make-related-topics",
      "title": "GNU Make & Related Topics",
      "leaves": [
        {
          "id": "make",
          "title": "GNU Make"
        },
        {
          "id": "cmake",
          "title": "CMake"
        },
        {
          "id": "bazel",
          "title": "Bazel"
        },
        {
          "id": "buck2",
          "title": "Buck2"
        },
        {
          "id": "pants-build",
          "title": "Pants (v2)"
        },
        {
          "id": "please-build",
          "title": "Please"
        }
      ]
    },
    {
      "id": "build-tools--earthly-related-topics",
      "title": "Earthly & Related Topics",
      "leaves": [
        {
          "id": "earthly",
          "title": "Earthly"
        },
        {
          "id": "mill-build",
          "title": "Mill"
        },
        {
          "id": "just-runner",
          "title": "just (Command Runner)"
        },
        {
          "id": "task-taskfile",
          "title": "Task (Taskfile.dev)"
        },
        {
          "id": "ninja-build",
          "title": "Ninja"
        },
        {
          "id": "dagger",
          "title": "Dagger"
        }
      ]
    },
    {
      "id": "build-tools--mage-go-based-builds-related-topics",
      "title": "Mage (Go-based builds) & Related Topics",
      "leaves": [
        {
          "id": "mage-go-build",
          "title": "Mage (Go-based builds)"
        },
        {
          "id": "gradle-overview",
          "title": "Gradle (Overview)"
        },
        {
          "id": "maven-overview",
          "title": "Maven (Overview)"
        },
        {
          "id": "sbt-overview",
          "title": "sbt (Scala) Overview"
        },
        {
          "id": "build-caching",
          "title": "Build Caching"
        },
        {
          "id": "remote-build-execution",
          "title": "Remote Build Execution"
        }
      ]
    },
    {
      "id": "build-tools--reproducible-builds-related-topics",
      "title": "Reproducible Builds & Related Topics",
      "leaves": [
        {
          "id": "reproducible-builds",
          "title": "Reproducible Builds"
        },
        {
          "id": "hermetic-builds",
          "title": "Hermetic Builds"
        },
        {
          "id": "incremental-builds",
          "title": "Incremental Builds"
        }
      ]
    },
    {
      "id": "container-image-builders",
      "title": "Container Image Builders",
      "leaves": [
        {
          "id": "kaniko-builder",
          "title": "Kaniko (Google)"
        },
        {
          "id": "buildah-builder",
          "title": "Buildah (Red Hat)"
        },
        {
          "id": "ko-builder",
          "title": "ko (Go images)"
        },
        {
          "id": "jib-builder",
          "title": "Jib (Java images)"
        },
        {
          "id": "paketo-cnb",
          "title": "Paketo Cloud Native Buildpacks"
        },
        {
          "id": "heroku-cnb",
          "title": "Heroku Cloud Native Buildpacks"
        },
        {
          "id": "nerdctl-build",
          "title": "nerdctl (containerd CLI)"
        },
        {
          "id": "img-rootless",
          "title": "img (rootless OCI builds)"
        },
        {
          "id": "melange-chainguard",
          "title": "Melange (Chainguard)"
        },
        {
          "id": "apko-chainguard",
          "title": "apko (Chainguard)"
        },
        {
          "id": "depot-image-build",
          "title": "Depot Image Build"
        },
        {
          "id": "docker-buildx-cross-ref",
          "title": "Docker Buildx (Cross-Reference)"
        }
      ]
    },
    {
      "id": "machine-image-builders",
      "title": "Machine Image & Bake Tools",
      "leaves": [
        {
          "id": "hashicorp-packer",
          "title": "HashiCorp Packer"
        },
        {
          "id": "aws-ec2-image-builder",
          "title": "AWS EC2 Image Builder"
        },
        {
          "id": "azure-image-builder",
          "title": "Azure VM Image Builder"
        },
        {
          "id": "gcp-image-builder",
          "title": "GCP Image Builder (Cloud Build)"
        },
        {
          "id": "cloud-init",
          "title": "cloud-init"
        },
        {
          "id": "ignition-fcos",
          "title": "Ignition (CoreOS / Flatcar)"
        },
        {
          "id": "kickstart-rhel",
          "title": "Kickstart (RHEL)"
        },
        {
          "id": "preseed-debian",
          "title": "Preseed (Debian)"
        },
        {
          "id": "autoyast-suse",
          "title": "AutoYaST (SUSE)"
        },
        {
          "id": "lorax-imagefactory",
          "title": "Lorax / ImageFactory"
        }
      ]
    }
  ],
  "package-managers": [
    {
      "id": "linux-os-package-managers",
      "title": "Linux OS Package Managers",
      "leaves": [
        {
          "id": "apt-deb",
          "title": "APT & dpkg (Debian / Ubuntu)"
        },
        {
          "id": "yum-dnf-rpm",
          "title": "YUM / DNF & RPM (RHEL / Fedora)"
        },
        {
          "id": "apk-alpine",
          "title": "APK (Alpine)"
        },
        {
          "id": "pacman-arch",
          "title": "pacman (Arch)"
        },
        {
          "id": "zypper-opensuse",
          "title": "Zypper (openSUSE)"
        },
        {
          "id": "portage-gentoo",
          "title": "Portage (Gentoo)"
        }
      ]
    },
    {
      "id": "cross-platform-package-managers",
      "title": "Cross-Platform Package Managers",
      "leaves": [
        {
          "id": "homebrew",
          "title": "Homebrew (macOS / Linux)"
        },
        {
          "id": "nix-package-manager",
          "title": "Nix"
        },
        {
          "id": "asdf-version-manager",
          "title": "asdf"
        },
        {
          "id": "mise-version-manager",
          "title": "mise (formerly rtx)"
        }
      ]
    },
    {
      "id": "windows-package-managers",
      "title": "Windows Package Managers",
      "leaves": [
        {
          "id": "chocolatey",
          "title": "Chocolatey"
        },
        {
          "id": "winget",
          "title": "Winget"
        },
        {
          "id": "scoop",
          "title": "Scoop"
        }
      ]
    },
    {
      "id": "universal-package-formats",
      "title": "Universal Package Formats",
      "leaves": [
        {
          "id": "snap-packages",
          "title": "Snap"
        },
        {
          "id": "flatpak",
          "title": "Flatpak"
        },
        {
          "id": "appimage",
          "title": "AppImage"
        }
      ]
    },
    {
      "id": "building-os-packages",
      "title": "Building OS Packages",
      "leaves": [
        {
          "id": "building-deb-packages",
          "title": "Building .deb Packages"
        },
        {
          "id": "building-rpm-packages",
          "title": "Building .rpm Packages"
        },
        {
          "id": "fpm-tool",
          "title": "fpm (Effing Package Management)"
        },
        {
          "id": "goreleaser-pkg",
          "title": "GoReleaser for OS Packages"
        },
        {
          "id": "nfpm",
          "title": "nFPM"
        }
      ]
    },
    {
      "id": "dev-environment-tools",
      "title": "Reproducible Dev Environment Tools",
      "leaves": [
        {
          "id": "nix-flakes",
          "title": "Nix Flakes"
        },
        {
          "id": "devbox-jetify",
          "title": "Devbox (Jetify)"
        },
        {
          "id": "devenv-cachix",
          "title": "Devenv (Cachix)"
        },
        {
          "id": "flox-cli",
          "title": "Flox"
        },
        {
          "id": "hermit-cli",
          "title": "Hermit"
        },
        {
          "id": "shadowenv",
          "title": "Shadowenv"
        },
        {
          "id": "aqua-cli",
          "title": "aquaproj/aqua"
        }
      ]
    }
  ],
  "artifact-repositories": [
    {
      "id": "artifact-repositories--sonatype-nexus-repository-related-topics",
      "title": "Sonatype Nexus Repository & Related Topics",
      "leaves": [
        {
          "id": "sonatype-nexus",
          "title": "Sonatype Nexus Repository"
        },
        {
          "id": "jfrog-artifactory",
          "title": "JFrog Artifactory"
        },
        {
          "id": "cloudsmith",
          "title": "Cloudsmith"
        },
        {
          "id": "github-packages-repo",
          "title": "GitHub Packages"
        },
        {
          "id": "gitlab-package-registry-repo",
          "title": "GitLab Package Registry"
        },
        {
          "id": "azure-artifacts",
          "title": "Azure Artifacts"
        }
      ]
    },
    {
      "id": "artifact-repositories--aws-codeartifact-overview-related-topics",
      "title": "AWS CodeArtifact (Overview) & Related Topics",
      "leaves": [
        {
          "id": "aws-codeartifact",
          "title": "AWS CodeArtifact (Overview)"
        },
        {
          "id": "google-artifact-registry-meta",
          "title": "Google Artifact Registry (Overview)"
        },
        {
          "id": "verdaccio",
          "title": "Verdaccio (npm)"
        },
        {
          "id": "pulp-project",
          "title": "Pulp Project"
        }
      ]
    },
    {
      "id": "repository-types",
      "title": "Repository Types",
      "leaves": [
        {
          "id": "maven-repos",
          "title": "Maven Repositories"
        },
        {
          "id": "npm-repos",
          "title": "npm Repositories"
        },
        {
          "id": "pypi-repos",
          "title": "PyPI Repositories"
        },
        {
          "id": "nuget-repos",
          "title": "NuGet Repositories"
        },
        {
          "id": "go-module-proxies",
          "title": "Go Module Proxies"
        },
        {
          "id": "helm-repos",
          "title": "Helm Chart Repositories"
        },
        {
          "id": "generic-raw-repos",
          "title": "Generic / Raw Repositories"
        }
      ]
    },
    {
      "id": "repository-topologies",
      "title": "Repository Topologies",
      "leaves": [
        {
          "id": "proxy-repositories",
          "title": "Proxy Repositories"
        },
        {
          "id": "hosted-repositories",
          "title": "Hosted Repositories"
        },
        {
          "id": "group-virtual-repositories",
          "title": "Group / Virtual Repositories"
        }
      ]
    },
    {
      "id": "artifact-repositories--cleanup-retention-policies-related-topics",
      "title": "Cleanup & Retention Policies & Related Topics",
      "leaves": [
        {
          "id": "cleanup-retention-policies",
          "title": "Cleanup & Retention Policies"
        },
        {
          "id": "artifact-scanning-signing",
          "title": "Artifact Scanning & Signing"
        },
        {
          "id": "artifact-promotion",
          "title": "Artifact Promotion (Dev → Stage → Prod)"
        }
      ]
    }
  ],
  "container-binary-registries": [
    {
      "id": "public-container-registries",
      "title": "Public Container Registries",
      "leaves": [
        {
          "id": "docker-hub",
          "title": "Docker Hub"
        },
        {
          "id": "quay-io",
          "title": "Quay.io"
        },
        {
          "id": "github-container-registry",
          "title": "GitHub Container Registry (GHCR)"
        },
        {
          "id": "gitlab-container-registry-binreg",
          "title": "GitLab Container Registry"
        }
      ]
    },
    {
      "id": "cloud-container-registries",
      "title": "Cloud Container Registries",
      "leaves": [
        {
          "id": "amazon-ecr",
          "title": "Amazon ECR (Overview)"
        },
        {
          "id": "google-artifact-registry-gar",
          "title": "Google Artifact Registry (Overview)"
        },
        {
          "id": "azure-container-registry-acr",
          "title": "Azure Container Registry (Overview)"
        },
        {
          "id": "oracle-container-registry",
          "title": "Oracle Container Registry"
        }
      ]
    },
    {
      "id": "self-hosted-container-registries",
      "title": "Self-Hosted Container Registries",
      "leaves": [
        {
          "id": "docker-distribution",
          "title": "Docker Distribution (CNCF distribution)"
        },
        {
          "id": "harbor",
          "title": "Harbor (CNCF)"
        },
        {
          "id": "zot-registry",
          "title": "zot"
        },
        {
          "id": "jfrog-container-registry",
          "title": "JFrog Container Registry"
        }
      ]
    },
    {
      "id": "container-binary-registries--oci-distribution-specification",
      "title": "OCI Distribution Specification",
      "leaves": [
        {
          "id": "oci-distribution-spec",
          "title": "OCI Distribution Specification"
        }
      ]
    },
    {
      "id": "image-signing-verification",
      "title": "Image Signing & Verification",
      "leaves": [
        {
          "id": "cosign-signing",
          "title": "Cosign"
        },
        {
          "id": "notary-v2",
          "title": "Notary v2 / Notation"
        },
        {
          "id": "in-toto-attestations",
          "title": "in-toto Attestations"
        }
      ]
    },
    {
      "id": "registry-image-scanning",
      "title": "Registry Image Scanning",
      "leaves": [
        {
          "id": "trivy-registry",
          "title": "Trivy"
        },
        {
          "id": "grype-registry",
          "title": "Grype"
        },
        {
          "id": "clair",
          "title": "Clair"
        },
        {
          "id": "snyk-container-registry",
          "title": "Snyk Container"
        }
      ]
    },
    {
      "id": "container-binary-registries--registry-mirrors-pull-through-caches-related-top",
      "title": "Registry Mirrors & Pull-Through Caches & Related Topics",
      "leaves": [
        {
          "id": "registry-mirrors-pull-through",
          "title": "Registry Mirrors & Pull-Through Caches"
        },
        {
          "id": "registry-garbage-collection",
          "title": "Registry Garbage Collection"
        },
        {
          "id": "multi-arch-images",
          "title": "Multi-Arch Images"
        },
        {
          "id": "manifest-lists",
          "title": "Manifest Lists & Image Indexes"
        },
        {
          "id": "registry-immutable-tags",
          "title": "Immutable & Mutable Tags"
        },
        {
          "id": "registry-replication",
          "title": "Registry Replication & Geo-Distribution"
        }
      ]
    },
    {
      "id": "hardened-base-images",
      "title": "Hardened & Minimal Base Images",
      "leaves": [
        {
          "id": "chainguard-images",
          "title": "Chainguard Images"
        },
        {
          "id": "wolfi-os",
          "title": "Wolfi OS"
        },
        {
          "id": "google-distroless-cross-ref",
          "title": "Google Distroless (Cross-Reference)"
        },
        {
          "id": "rapidfort-platform",
          "title": "RapidFort"
        },
        {
          "id": "minimus-images",
          "title": "Minimus OS Images"
        },
        {
          "id": "redhat-ubi",
          "title": "Red Hat Universal Base Images (UBI)"
        },
        {
          "id": "iron-bank-dod",
          "title": "Iron Bank (DoD)"
        },
        {
          "id": "bitnami-secure-images",
          "title": "Bitnami Secure Images"
        }
      ]
    }
  ],
  "service-mesh-fundamentals": [
    {
      "id": "service-mesh-fundamentals--what-is-a-service-mesh-related-topics",
      "title": "What is a Service Mesh? & Related Topics",
      "leaves": [
        {
          "id": "what-is-service-mesh",
          "title": "What is a Service Mesh?"
        },
        {
          "id": "data-plane-vs-control-plane",
          "title": "Data Plane vs Control Plane"
        },
        {
          "id": "sidecar-pattern",
          "title": "Sidecar Pattern"
        },
        {
          "id": "ambient-mesh-pattern",
          "title": "Ambient / Sidecar-Less Mesh"
        },
        {
          "id": "service-mesh-use-cases",
          "title": "Service Mesh Use Cases"
        }
      ]
    },
    {
      "id": "service-mesh-capabilities",
      "title": "Core Capabilities",
      "leaves": [
        {
          "id": "mesh-traffic-management",
          "title": "Traffic Management"
        },
        {
          "id": "mesh-mtls",
          "title": "Mutual TLS (mTLS)"
        },
        {
          "id": "mesh-observability",
          "title": "Observability"
        },
        {
          "id": "mesh-policy-enforcement",
          "title": "Policy Enforcement"
        },
        {
          "id": "mesh-retries-circuit-breaking",
          "title": "Retries & Circuit Breaking"
        },
        {
          "id": "mesh-fault-injection",
          "title": "Fault Injection"
        }
      ]
    },
    {
      "id": "service-mesh-fundamentals--multi-cluster-service-mesh-related-topics",
      "title": "Multi-Cluster Service Mesh & Related Topics",
      "leaves": [
        {
          "id": "multi-cluster-service-mesh",
          "title": "Multi-Cluster Service Mesh"
        },
        {
          "id": "service-mesh-interface-smi",
          "title": "Service Mesh Interface (SMI)"
        },
        {
          "id": "gateway-api-mesh",
          "title": "Gateway API for Service Mesh (GAMMA)"
        },
        {
          "id": "wasm-mesh-extensions",
          "title": "WebAssembly (Wasm) Mesh Extensions"
        },
        {
          "id": "service-mesh-vs-libraries",
          "title": "Service Mesh vs Smart Libraries"
        }
      ]
    }
  ],
  "istio": [
    {
      "id": "istio--istio-architecture-related-topics",
      "title": "Istio Architecture & Related Topics",
      "leaves": [
        {
          "id": "istio-architecture",
          "title": "Istio Architecture"
        },
        {
          "id": "istiod-control-plane",
          "title": "Istiod (Control Plane)"
        },
        {
          "id": "istio-envoy-proxy",
          "title": "Envoy Proxy (Data Plane)"
        }
      ]
    },
    {
      "id": "istio-installation",
      "title": "Installation",
      "leaves": [
        {
          "id": "istioctl-install",
          "title": "istioctl"
        },
        {
          "id": "istio-helm-install",
          "title": "Helm Install"
        },
        {
          "id": "istio-operator",
          "title": "Istio Operator (Legacy)"
        }
      ]
    },
    {
      "id": "istio-ambient-mode",
      "title": "Ambient Mode",
      "leaves": [
        {
          "id": "istio-ztunnel",
          "title": "ztunnel"
        },
        {
          "id": "istio-waypoint-proxy",
          "title": "Waypoint Proxies"
        },
        {
          "id": "istio-l4-l7-modes",
          "title": "L4 vs L7 Ambient"
        }
      ]
    },
    {
      "id": "istio-traffic-management",
      "title": "Traffic Management",
      "leaves": [
        {
          "id": "virtualservice",
          "title": "VirtualService"
        },
        {
          "id": "destinationrule",
          "title": "DestinationRule"
        },
        {
          "id": "istio-gateway",
          "title": "Gateway (Ingress / Egress)"
        },
        {
          "id": "serviceentry",
          "title": "ServiceEntry"
        },
        {
          "id": "sidecar-resource",
          "title": "Sidecar Resource"
        },
        {
          "id": "istio-traffic-mirroring",
          "title": "Traffic Mirroring"
        },
        {
          "id": "istio-canary-traffic",
          "title": "Canary & Weighted Routing"
        }
      ]
    },
    {
      "id": "istio-security",
      "title": "Security",
      "leaves": [
        {
          "id": "peerauthentication",
          "title": "PeerAuthentication"
        },
        {
          "id": "requestauthentication",
          "title": "RequestAuthentication"
        },
        {
          "id": "authorizationpolicy",
          "title": "AuthorizationPolicy"
        },
        {
          "id": "istio-certificate-management",
          "title": "Certificate Management"
        }
      ]
    },
    {
      "id": "istio--delivery-flow-metrics",
      "title": "Delivery & Flow Metrics",
      "leaves": [
        {
          "id": "istio-telemetry",
          "title": "Telemetry (Metrics, Traces, Logs)"
        }
      ]
    },
    {
      "id": "istio-extensions",
      "title": "Extensions",
      "leaves": [
        {
          "id": "wasmplugin",
          "title": "WasmPlugin"
        },
        {
          "id": "envoyfilter",
          "title": "EnvoyFilter"
        }
      ]
    },
    {
      "id": "istio--multi-cluster-istio-related-topics",
      "title": "Multi-Cluster Istio & Related Topics",
      "leaves": [
        {
          "id": "istio-multi-cluster",
          "title": "Multi-Cluster Istio"
        },
        {
          "id": "istio-cni",
          "title": "Istio CNI"
        },
        {
          "id": "istio-gateway-api",
          "title": "Istio with Gateway API"
        },
        {
          "id": "istio-versioning",
          "title": "Istio Versions & Upgrades"
        },
        {
          "id": "istio-troubleshooting",
          "title": "Istio Troubleshooting"
        }
      ]
    }
  ],
  "linkerd": [
    {
      "id": "linkerd--core-linux-systems",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "linkerd-architecture",
          "title": "Linkerd Architecture"
        },
        {
          "id": "linkerd2-proxy-rust",
          "title": "linkerd2-proxy (Rust)"
        },
        {
          "id": "linkerd-control-plane",
          "title": "Control Plane Components"
        }
      ]
    },
    {
      "id": "linkerd-installation",
      "title": "Installation",
      "leaves": [
        {
          "id": "linkerd-cli",
          "title": "linkerd CLI"
        },
        {
          "id": "linkerd-helm",
          "title": "Helm Install"
        }
      ]
    },
    {
      "id": "linkerd--core-linux-systems-3",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "linkerd-mtls-default",
          "title": "mTLS by Default"
        },
        {
          "id": "linkerd-traffic-split",
          "title": "Traffic Split & SMI"
        },
        {
          "id": "linkerd-policy",
          "title": "Linkerd Policy (Server, ServerAuthorization)"
        },
        {
          "id": "linkerd-multi-cluster",
          "title": "Multi-Cluster Linkerd"
        },
        {
          "id": "linkerd-observability",
          "title": "Linkerd Observability"
        },
        {
          "id": "buoyant-cloud",
          "title": "Buoyant Cloud / Enterprise"
        }
      ]
    },
    {
      "id": "linkerd--core-linux-systems-4",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "linkerd-performance",
          "title": "Linkerd Performance Characteristics"
        }
      ]
    }
  ],
  "terraform-opentofu": [
    {
      "id": "terraform-opentofu--terraform-vs-opentofu-fork-related-topics",
      "title": "Terraform vs OpenTofu (Fork) & Related Topics",
      "leaves": [
        {
          "id": "terraform-vs-opentofu",
          "title": "Terraform vs OpenTofu (Fork)"
        },
        {
          "id": "terraform-installation",
          "title": "Installation (tfswitch, tfenv, tofuenv)"
        },
        {
          "id": "terraform-cli",
          "title": "Terraform CLI"
        },
        {
          "id": "hcl-for-terraform",
          "title": "HCL for Terraform"
        }
      ]
    },
    {
      "id": "terraform-providers",
      "title": "Providers",
      "leaves": [
        {
          "id": "official-providers",
          "title": "Official Providers"
        },
        {
          "id": "partner-providers",
          "title": "Partner & Community Providers"
        },
        {
          "id": "provider-versions-constraints",
          "title": "Provider Versions & Constraints"
        },
        {
          "id": "provider-aliases",
          "title": "Provider Aliases & Multi-Region"
        },
        {
          "id": "provider-mirroring",
          "title": "Provider Mirroring & Caching"
        }
      ]
    },
    {
      "id": "terraform-opentofu--resources-related-topics",
      "title": "Resources & Related Topics",
      "leaves": [
        {
          "id": "terraform-resources",
          "title": "Resources"
        },
        {
          "id": "terraform-data-sources",
          "title": "Data Sources"
        }
      ]
    },
    {
      "id": "terraform-variables",
      "title": "Variables",
      "leaves": [
        {
          "id": "input-variables-tf",
          "title": "Input Variables"
        },
        {
          "id": "output-variables-tf",
          "title": "Output Variables"
        },
        {
          "id": "local-variables-tf",
          "title": "Local Values (locals)"
        },
        {
          "id": "variable-validation-tf",
          "title": "Variable Validation"
        },
        {
          "id": "sensitive-variables-tf",
          "title": "Sensitive Variables"
        }
      ]
    },
    {
      "id": "terraform-modules",
      "title": "Modules",
      "leaves": [
        {
          "id": "root-vs-child-modules",
          "title": "Root vs Child Modules"
        },
        {
          "id": "module-sources",
          "title": "Module Sources (Local, Git, Registry)"
        },
        {
          "id": "module-composition-patterns",
          "title": "Composition Patterns"
        },
        {
          "id": "module-versioning",
          "title": "Module Versioning"
        },
        {
          "id": "public-module-registry",
          "title": "Public Module Registry"
        },
        {
          "id": "private-module-registry",
          "title": "Private Module Registry"
        }
      ]
    },
    {
      "id": "terraform-state",
      "title": "State Management",
      "leaves": [
        {
          "id": "tf-local-state",
          "title": "Local State"
        },
        {
          "id": "tf-remote-state",
          "title": "Remote State"
        },
        {
          "id": "tf-state-locking",
          "title": "State Locking"
        },
        {
          "id": "tf-backends-s3-gcs-azure",
          "title": "Backends (S3, GCS, Azure Blob, etc.)"
        },
        {
          "id": "tf-cloud-backend",
          "title": "Terraform Cloud Backend"
        },
        {
          "id": "tf-state-encryption-opentofu",
          "title": "State Encryption (OpenTofu)"
        },
        {
          "id": "tf-state-migration",
          "title": "State Migration & Backend Move"
        },
        {
          "id": "tf-import-block",
          "title": "import Block (1.5+)"
        },
        {
          "id": "tf-state-commands",
          "title": "terraform state Subcommands"
        },
        {
          "id": "tf-state-best-practices",
          "title": "State Best Practices"
        }
      ]
    },
    {
      "id": "terraform-opentofu--workspaces-related-topics",
      "title": "Workspaces & Related Topics",
      "leaves": [
        {
          "id": "terraform-workspaces",
          "title": "Workspaces"
        },
        {
          "id": "terraform-provisioners",
          "title": "Provisioners (and Why to Avoid)"
        },
        {
          "id": "terraform-plan-apply-destroy",
          "title": "plan, apply, destroy"
        },
        {
          "id": "terraform-refresh",
          "title": "Refresh & -refresh-only"
        },
        {
          "id": "terraform-targeting",
          "title": "-target & -replace"
        },
        {
          "id": "terraform-functions",
          "title": "Built-in Functions"
        }
      ]
    },
    {
      "id": "terraform-opentofu--dynamic-blocks-related-topics",
      "title": "Dynamic Blocks & Related Topics",
      "leaves": [
        {
          "id": "terraform-dynamic-blocks",
          "title": "Dynamic Blocks"
        },
        {
          "id": "terraform-count-foreach",
          "title": "count & for_each"
        },
        {
          "id": "terraform-conditional-resources",
          "title": "Conditional Resources"
        }
      ]
    },
    {
      "id": "terraform-lifecycle",
      "title": "Lifecycle Hooks",
      "leaves": [
        {
          "id": "lifecycle-create-before-destroy",
          "title": "create_before_destroy"
        },
        {
          "id": "lifecycle-prevent-destroy",
          "title": "prevent_destroy"
        },
        {
          "id": "lifecycle-ignore-changes",
          "title": "ignore_changes"
        },
        {
          "id": "lifecycle-replace-triggered-by",
          "title": "replace_triggered_by"
        }
      ]
    },
    {
      "id": "terraform-opentofu--moved-blocks-related-topics",
      "title": "moved Blocks & Related Topics",
      "leaves": [
        {
          "id": "terraform-moved-blocks",
          "title": "moved Blocks"
        },
        {
          "id": "terraform-removed-blocks",
          "title": "removed Blocks (1.7+)"
        },
        {
          "id": "terraform-check-blocks",
          "title": "check Blocks"
        },
        {
          "id": "terraform-test-framework",
          "title": "terraform test Framework"
        },
        {
          "id": "terraform-stacks",
          "title": "Stacks (HCP Terraform)"
        },
        {
          "id": "terraform-ephemeral-resources",
          "title": "Ephemeral Resources (1.10+)"
        }
      ]
    },
    {
      "id": "opentofu-specific",
      "title": "OpenTofu-Specific Features",
      "leaves": [
        {
          "id": "opentofu-state-encryption",
          "title": "State Encryption"
        },
        {
          "id": "opentofu-provider-iteration",
          "title": "Provider Iteration (for_each providers)"
        },
        {
          "id": "opentofu-removed-block-early",
          "title": "removed Block (Earlier)"
        },
        {
          "id": "opentofu-registry",
          "title": "OpenTofu Registry"
        }
      ]
    },
    {
      "id": "terraform-opentofu--provider-development-plugin-framework-sdkv2",
      "title": "Provider Development (Plugin Framework, SDKv2)",
      "leaves": [
        {
          "id": "terraform-provider-development",
          "title": "Provider Development (Plugin Framework, SDKv2)"
        }
      ]
    },
    {
      "id": "terraform-cloud-platforms",
      "title": "Terraform Cloud / Enterprise Platforms",
      "leaves": [
        {
          "id": "hcp-terraform",
          "title": "HCP Terraform (formerly Terraform Cloud)"
        },
        {
          "id": "terraform-enterprise",
          "title": "Terraform Enterprise"
        },
        {
          "id": "tfc-workspaces",
          "title": "TFC Workspaces"
        },
        {
          "id": "sentinel-policy-tfc",
          "title": "Sentinel Policy"
        }
      ]
    },
    {
      "id": "terraform-testing",
      "title": "Terraform Testing",
      "leaves": [
        {
          "id": "terratest",
          "title": "Terratest"
        },
        {
          "id": "kitchen-terraform",
          "title": "Kitchen-Terraform"
        },
        {
          "id": "terraform-test-builtin",
          "title": "Built-in terraform test"
        },
        {
          "id": "terraform-validate",
          "title": "terraform validate"
        }
      ]
    },
    {
      "id": "terraform-ecosystem-tools",
      "title": "Ecosystem Tooling",
      "leaves": [
        {
          "id": "terragrunt",
          "title": "Terragrunt"
        },
        {
          "id": "atlantis",
          "title": "Atlantis"
        },
        {
          "id": "spacelift",
          "title": "Spacelift"
        },
        {
          "id": "env0",
          "title": "env0"
        },
        {
          "id": "scalr",
          "title": "Scalr"
        },
        {
          "id": "tfsec-tool",
          "title": "tfsec"
        },
        {
          "id": "checkov-tf",
          "title": "Checkov"
        },
        {
          "id": "infracost-tool",
          "title": "Infracost"
        },
        {
          "id": "terraform-docs",
          "title": "terraform-docs"
        },
        {
          "id": "tflint-tool",
          "title": "tflint"
        },
        {
          "id": "tfswitch-tfenv",
          "title": "tfswitch & tfenv"
        },
        {
          "id": "digger-tf",
          "title": "Digger"
        }
      ]
    }
  ],
  "pulumi": [
    {
      "id": "pulumi--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-pulumi",
          "title": "What is Pulumi?"
        },
        {
          "id": "pulumi-vs-terraform",
          "title": "Pulumi vs Terraform"
        }
      ]
    },
    {
      "id": "pulumi-languages",
      "title": "Supported Languages",
      "leaves": [
        {
          "id": "pulumi-typescript",
          "title": "TypeScript / JavaScript"
        },
        {
          "id": "pulumi-python",
          "title": "Python"
        },
        {
          "id": "pulumi-go",
          "title": "Go"
        },
        {
          "id": "pulumi-csharp",
          "title": "C# / .NET"
        },
        {
          "id": "pulumi-java",
          "title": "Java"
        },
        {
          "id": "pulumi-yaml",
          "title": "YAML"
        }
      ]
    },
    {
      "id": "pulumi--pulumi-cli-related-topics",
      "title": "Pulumi CLI & Related Topics",
      "leaves": [
        {
          "id": "pulumi-cli",
          "title": "Pulumi CLI"
        },
        {
          "id": "pulumi-projects",
          "title": "Projects"
        },
        {
          "id": "pulumi-stacks",
          "title": "Stacks"
        },
        {
          "id": "pulumi-state-backends",
          "title": "State Backends (Pulumi Cloud, S3, etc.)"
        },
        {
          "id": "pulumi-providers",
          "title": "Resource Providers"
        },
        {
          "id": "pulumi-components",
          "title": "Component Resources"
        }
      ]
    },
    {
      "id": "pulumi--dynamic-providers-related-topics",
      "title": "Dynamic Providers & Related Topics",
      "leaves": [
        {
          "id": "pulumi-dynamic-providers",
          "title": "Dynamic Providers"
        },
        {
          "id": "pulumi-crosswalk",
          "title": "Pulumi Crosswalk (High-Level)"
        },
        {
          "id": "pulumi-esc",
          "title": "Pulumi ESC (Environments, Secrets, Config)"
        },
        {
          "id": "pulumi-crossguard",
          "title": "CrossGuard (Policy as Code)"
        },
        {
          "id": "pulumi-automation-api",
          "title": "Pulumi Automation API"
        },
        {
          "id": "pulumi-testing",
          "title": "Testing Pulumi Programs"
        }
      ]
    },
    {
      "id": "pulumi--importing-existing-resources-related-topics",
      "title": "Importing Existing Resources & Related Topics",
      "leaves": [
        {
          "id": "pulumi-import-existing",
          "title": "Importing Existing Resources"
        },
        {
          "id": "pulumi-secrets",
          "title": "Secrets in Pulumi"
        },
        {
          "id": "pulumi-deployments",
          "title": "Pulumi Deployments"
        },
        {
          "id": "pulumi-converter",
          "title": "Pulumi Converter (from Terraform, CFN, ARM)"
        },
        {
          "id": "pulumi-ai",
          "title": "Pulumi AI"
        }
      ]
    }
  ],
  "cloudformation-cdk": [
    {
      "id": "aws-cloudformation",
      "title": "AWS CloudFormation",
      "leaves": [
        {
          "id": "cfn-templates",
          "title": "Templates (YAML / JSON)"
        },
        {
          "id": "cfn-stacks",
          "title": "Stacks"
        },
        {
          "id": "cfn-stack-sets",
          "title": "Stack Sets"
        },
        {
          "id": "cfn-change-sets",
          "title": "Change Sets"
        },
        {
          "id": "cfn-drift-detection",
          "title": "Drift Detection"
        },
        {
          "id": "cfn-custom-resources",
          "title": "Custom Resources"
        },
        {
          "id": "cfn-macros",
          "title": "Macros"
        },
        {
          "id": "cfn-hooks",
          "title": "Hooks"
        },
        {
          "id": "cfn-modules",
          "title": "Modules"
        },
        {
          "id": "cfn-nested-stacks",
          "title": "Nested Stacks"
        },
        {
          "id": "cfn-cross-stack-refs",
          "title": "Cross-Stack References & Exports"
        },
        {
          "id": "cfn-rollback-triggers",
          "title": "Rollback Triggers"
        },
        {
          "id": "cfn-igc-import-existing",
          "title": "Importing Existing Resources (IGC)"
        }
      ]
    },
    {
      "id": "aws-cdk",
      "title": "AWS CDK",
      "leaves": [
        {
          "id": "cdk-concepts",
          "title": "Concepts (App, Stack, Construct)"
        },
        {
          "id": "cdk-construct-levels",
          "title": "Construct Levels (L1, L2, L3)"
        },
        {
          "id": "cdk-languages",
          "title": "Supported Languages"
        },
        {
          "id": "cdk-pipelines",
          "title": "CDK Pipelines"
        },
        {
          "id": "cdk-toolkit",
          "title": "CDK Toolkit (cdk CLI)"
        },
        {
          "id": "cdk-bootstrapping",
          "title": "Bootstrapping"
        },
        {
          "id": "cdk-aspects",
          "title": "Aspects"
        },
        {
          "id": "cdk-context-values",
          "title": "Context Values"
        },
        {
          "id": "cdk-migrate",
          "title": "cdk migrate"
        },
        {
          "id": "cdk-testing",
          "title": "Testing CDK Apps"
        },
        {
          "id": "cdk-construct-hub",
          "title": "Construct Hub"
        }
      ]
    },
    {
      "id": "aws-sam",
      "title": "AWS SAM",
      "leaves": [
        {
          "id": "sam-template",
          "title": "SAM Template"
        },
        {
          "id": "sam-cli",
          "title": "SAM CLI"
        },
        {
          "id": "sam-local-invoke",
          "title": "sam local (Invoke & API)"
        },
        {
          "id": "sam-deploy",
          "title": "sam deploy"
        },
        {
          "id": "sam-accelerate",
          "title": "SAM Accelerate"
        }
      ]
    },
    {
      "id": "cloudformation-cdk--cdk-for-terraform-cdktf-related-topics",
      "title": "CDK for Terraform (CDKTF) & Related Topics",
      "leaves": [
        {
          "id": "cdk-for-terraform-cdktf",
          "title": "CDK for Terraform (CDKTF)"
        },
        {
          "id": "cdk-for-kubernetes-cdk8s",
          "title": "CDK for Kubernetes (CDK8s)"
        },
        {
          "id": "aws-copilot",
          "title": "AWS Copilot"
        },
        {
          "id": "cfn-rain",
          "title": "Rain (CloudFormation tool)"
        },
        {
          "id": "former2",
          "title": "former2 (Generate IaC from existing infra)"
        }
      ]
    }
  ],
  "crossplane": [
    {
      "id": "crossplane--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-crossplane",
          "title": "What is Crossplane?"
        },
        {
          "id": "crossplane-architecture",
          "title": "Crossplane Architecture"
        }
      ]
    },
    {
      "id": "crossplane-compositions",
      "title": "Compositions",
      "leaves": [
        {
          "id": "composite-resources-xr",
          "title": "Composite Resources (XR)"
        },
        {
          "id": "composite-resource-claims-xrc",
          "title": "Composite Resource Claims (XRC)"
        },
        {
          "id": "composition-revisions",
          "title": "Composition Revisions"
        },
        {
          "id": "composition-validation",
          "title": "Composition Validation"
        }
      ]
    },
    {
      "id": "crossplane-providers",
      "title": "Providers",
      "leaves": [
        {
          "id": "provider-aws-crossplane",
          "title": "AWS Provider"
        },
        {
          "id": "provider-azure-crossplane",
          "title": "Azure Provider"
        },
        {
          "id": "provider-gcp-crossplane",
          "title": "GCP Provider"
        },
        {
          "id": "provider-kubernetes-crossplane",
          "title": "Kubernetes Provider"
        },
        {
          "id": "provider-helm-crossplane",
          "title": "Helm Provider"
        },
        {
          "id": "upjet-providers",
          "title": "Upjet-Generated Providers"
        }
      ]
    },
    {
      "id": "crossplane-functions",
      "title": "Composition Functions",
      "leaves": [
        {
          "id": "function-patch-and-transform",
          "title": "Patch & Transform"
        },
        {
          "id": "function-go-templating",
          "title": "Go Templating"
        },
        {
          "id": "function-kcl-fn",
          "title": "KCL"
        },
        {
          "id": "function-python-fn",
          "title": "Python"
        }
      ]
    },
    {
      "id": "crossplane--configuration-packages-related-topics",
      "title": "Configuration Packages & Related Topics",
      "leaves": [
        {
          "id": "crossplane-configuration-packages",
          "title": "Configuration Packages"
        },
        {
          "id": "crossplane-vs-terraform",
          "title": "Crossplane vs Terraform"
        },
        {
          "id": "operator-based-iac",
          "title": "Operator-Based IaC"
        },
        {
          "id": "upbound-platform",
          "title": "Upbound (Commercial Platform)"
        },
        {
          "id": "crossplane-cli",
          "title": "crossplane CLI"
        }
      ]
    }
  ],
  "other-iac-tools": [
    {
      "id": "azure-iac-tools",
      "title": "Azure IaC Tools",
      "leaves": [
        {
          "id": "bicep",
          "title": "Bicep"
        },
        {
          "id": "arm-templates",
          "title": "ARM Templates"
        }
      ]
    },
    {
      "id": "other-iac-tools--google-cloud-deployment-manager-related-topics",
      "title": "Google Cloud Deployment Manager & Related Topics",
      "leaves": [
        {
          "id": "gcp-deployment-manager",
          "title": "Google Cloud Deployment Manager"
        },
        {
          "id": "gcp-config-controller",
          "title": "Google Config Controller"
        },
        {
          "id": "sceptre",
          "title": "Sceptre (CloudFormation Wrapper)"
        },
        {
          "id": "cloud-custodian-iac",
          "title": "Cloud Custodian (Policy + IaC)"
        },
        {
          "id": "habitat",
          "title": "Chef Habitat"
        },
        {
          "id": "bosh",
          "title": "BOSH"
        }
      ]
    },
    {
      "id": "other-iac-tools--nomad-pack-related-topics",
      "title": "Nomad Pack & Related Topics",
      "leaves": [
        {
          "id": "nomad-pack",
          "title": "Nomad Pack"
        },
        {
          "id": "garden-io",
          "title": "Garden (Dev Platform / IaC)"
        },
        {
          "id": "cdk-for-aws-cdk-mention",
          "title": "AWS CDK & CDKTF Cross-Reference"
        },
        {
          "id": "kpt",
          "title": "kpt (Kubernetes Configuration)"
        },
        {
          "id": "tanka",
          "title": "Grafana Tanka (Jsonnet for Kubernetes)"
        },
        {
          "id": "winglang",
          "title": "Wing (winglang.io)"
        }
      ]
    },
    {
      "id": "other-iac-tools--sst-serverless-stack",
      "title": "SST (Serverless Stack)",
      "leaves": [
        {
          "id": "sst",
          "title": "SST (Serverless Stack)"
        }
      ]
    }
  ],
  "config-management-fundamentals": [
    {
      "id": "config-management-fundamentals--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-config-management",
          "title": "What is Configuration Management?"
        },
        {
          "id": "push-vs-pull-cm",
          "title": "Push vs Pull Models"
        },
        {
          "id": "agent-based-vs-agentless",
          "title": "Agent-Based vs Agentless"
        },
        {
          "id": "cm-idempotency",
          "title": "Idempotency in CM"
        },
        {
          "id": "desired-state-model",
          "title": "Desired State Model"
        },
        {
          "id": "cm-mutable-immutable",
          "title": "Mutable vs Immutable Infra (CM View)"
        }
      ]
    },
    {
      "id": "config-management-fundamentals--configuration-drift-related-topics",
      "title": "Configuration Drift & Related Topics",
      "leaves": [
        {
          "id": "configuration-drift",
          "title": "Configuration Drift"
        },
        {
          "id": "cm-inventory-management",
          "title": "Inventory Management"
        },
        {
          "id": "cm-convergence",
          "title": "Convergence"
        },
        {
          "id": "master-server-architecture",
          "title": "Master / Server Architecture"
        },
        {
          "id": "configuration-as-code",
          "title": "Configuration as Code"
        },
        {
          "id": "cm-bootstrap-pattern",
          "title": "Bootstrap Pattern (cloud-init, ignition)"
        }
      ]
    },
    {
      "id": "config-management-fundamentals--tool-comparison-ansible-chef-puppet-salt",
      "title": "Tool Comparison (Ansible / Chef / Puppet / Salt)",
      "leaves": [
        {
          "id": "cm-tool-comparison",
          "title": "Tool Comparison (Ansible / Chef / Puppet / Salt)"
        }
      ]
    }
  ],
  "ansible": [
    {
      "id": "ansible--ansible-architecture-related-topics",
      "title": "Ansible Architecture & Related Topics",
      "leaves": [
        {
          "id": "ansible-architecture",
          "title": "Ansible Architecture"
        },
        {
          "id": "ansible-installation",
          "title": "Installation & Setup"
        }
      ]
    },
    {
      "id": "ansible-inventories",
      "title": "Inventories",
      "leaves": [
        {
          "id": "static-inventory",
          "title": "Static Inventory"
        },
        {
          "id": "dynamic-inventory",
          "title": "Dynamic Inventory"
        },
        {
          "id": "ansible-inventory-plugins",
          "title": "Inventory Plugins"
        },
        {
          "id": "ansible-patterns",
          "title": "Host Patterns"
        },
        {
          "id": "host-group-vars-files",
          "title": "host_vars & group_vars"
        }
      ]
    },
    {
      "id": "ansible--playbooks-related-topics",
      "title": "Playbooks & Related Topics",
      "leaves": [
        {
          "id": "ansible-playbooks",
          "title": "Playbooks"
        },
        {
          "id": "ansible-tasks",
          "title": "Tasks"
        },
        {
          "id": "ansible-modules",
          "title": "Modules"
        },
        {
          "id": "ansible-roles",
          "title": "Roles"
        },
        {
          "id": "ansible-collections",
          "title": "Collections"
        },
        {
          "id": "ansible-galaxy",
          "title": "Ansible Galaxy"
        }
      ]
    },
    {
      "id": "ansible-variables",
      "title": "Variables & Facts",
      "leaves": [
        {
          "id": "ansible-variable-precedence",
          "title": "Variable Precedence"
        },
        {
          "id": "ansible-magic-variables",
          "title": "Magic Variables"
        },
        {
          "id": "ansible-facts",
          "title": "Facts & Custom Facts"
        },
        {
          "id": "ansible-set-fact",
          "title": "set_fact"
        },
        {
          "id": "ansible-register",
          "title": "register"
        }
      ]
    },
    {
      "id": "ansible--jinja2-templates-related-topics",
      "title": "Jinja2 Templates & Related Topics",
      "leaves": [
        {
          "id": "ansible-templates-jinja2",
          "title": "Jinja2 Templates"
        },
        {
          "id": "ansible-handlers",
          "title": "Handlers"
        },
        {
          "id": "ansible-conditionals-loops",
          "title": "Conditionals & Loops"
        },
        {
          "id": "ansible-blocks",
          "title": "Blocks (rescue / always)"
        },
        {
          "id": "ansible-tags",
          "title": "Tags"
        }
      ]
    },
    {
      "id": "ansible-vault",
      "title": "Ansible Vault (Secrets)",
      "leaves": [
        {
          "id": "vault-encrypt-decrypt",
          "title": "encrypt / decrypt"
        },
        {
          "id": "vault-ids",
          "title": "Vault IDs"
        },
        {
          "id": "vault-password-files",
          "title": "Password Files & Plugins"
        }
      ]
    },
    {
      "id": "ansible-plugins",
      "title": "Plugins",
      "leaves": [
        {
          "id": "callback-plugins",
          "title": "Callback Plugins"
        },
        {
          "id": "lookup-plugins",
          "title": "Lookup Plugins"
        },
        {
          "id": "filter-plugins",
          "title": "Filter Plugins"
        },
        {
          "id": "connection-plugins",
          "title": "Connection Plugins"
        }
      ]
    },
    {
      "id": "ansible--strategy-plugins-linear-free-debug-related-topic",
      "title": "Strategy Plugins (linear, free, debug) & Related Topics",
      "leaves": [
        {
          "id": "ansible-strategy-plugins",
          "title": "Strategy Plugins (linear, free, debug)"
        },
        {
          "id": "ansible-async-tasks",
          "title": "Async Tasks & Polling"
        },
        {
          "id": "ansible-delegate-to",
          "title": "delegate_to & run_once"
        },
        {
          "id": "ansible-performance-forks",
          "title": "Performance & Forks"
        },
        {
          "id": "ansible-custom-modules",
          "title": "Custom Modules"
        },
        {
          "id": "ansible-lint",
          "title": "ansible-lint"
        }
      ]
    },
    {
      "id": "ansible--molecule-role-testing",
      "title": "Molecule (Role Testing)",
      "leaves": [
        {
          "id": "molecule",
          "title": "Molecule (Role Testing)"
        }
      ]
    },
    {
      "id": "ansible-controllers",
      "title": "Controllers & Platform",
      "leaves": [
        {
          "id": "ansible-tower-awx",
          "title": "AWX / Ansible Tower"
        },
        {
          "id": "ansible-automation-platform",
          "title": "Ansible Automation Platform (AAP)"
        },
        {
          "id": "event-driven-ansible",
          "title": "Event-Driven Ansible (EDA)"
        }
      ]
    },
    {
      "id": "ansible--ansible-pull-related-topics",
      "title": "ansible-pull & Related Topics",
      "leaves": [
        {
          "id": "ansible-pull",
          "title": "ansible-pull"
        },
        {
          "id": "ansible-navigator",
          "title": "ansible-navigator"
        },
        {
          "id": "execution-environments",
          "title": "Execution Environments (Containers)"
        },
        {
          "id": "ansible-builder",
          "title": "ansible-builder"
        },
        {
          "id": "ansible-runner",
          "title": "ansible-runner"
        }
      ]
    }
  ],
  "chef": [
    {
      "id": "chef--chef-architecture-related-topics",
      "title": "Chef Architecture & Related Topics",
      "leaves": [
        {
          "id": "chef-architecture",
          "title": "Chef Architecture"
        },
        {
          "id": "chef-installation",
          "title": "Installation (Chef Workstation, chef-client)"
        }
      ]
    },
    {
      "id": "chef-cookbooks",
      "title": "Cookbooks",
      "leaves": [
        {
          "id": "chef-recipes",
          "title": "Recipes"
        },
        {
          "id": "chef-resources",
          "title": "Resources"
        },
        {
          "id": "chef-attributes",
          "title": "Attributes"
        },
        {
          "id": "chef-templates",
          "title": "Templates (ERB)"
        },
        {
          "id": "chef-files",
          "title": "Files"
        },
        {
          "id": "chef-metadata",
          "title": "Metadata"
        }
      ]
    },
    {
      "id": "chef--roles-related-topics",
      "title": "Roles & Related Topics",
      "leaves": [
        {
          "id": "chef-roles",
          "title": "Roles"
        },
        {
          "id": "chef-environments",
          "title": "Environments"
        },
        {
          "id": "chef-data-bags",
          "title": "Data Bags"
        },
        {
          "id": "chef-search",
          "title": "Search"
        },
        {
          "id": "knife-cli",
          "title": "knife CLI"
        },
        {
          "id": "berkshelf",
          "title": "Berkshelf"
        }
      ]
    },
    {
      "id": "chef--test-kitchen-related-topics",
      "title": "Test Kitchen & Related Topics",
      "leaves": [
        {
          "id": "test-kitchen",
          "title": "Test Kitchen"
        },
        {
          "id": "chefspec",
          "title": "ChefSpec"
        },
        {
          "id": "inspec-chef",
          "title": "InSpec"
        },
        {
          "id": "chef-infra",
          "title": "Chef Infra (Server / Client)"
        },
        {
          "id": "chef-workstation",
          "title": "Chef Workstation"
        },
        {
          "id": "chef-habitat-cm",
          "title": "Chef Habitat"
        }
      ]
    },
    {
      "id": "chef--chef-automate-related-topics",
      "title": "Chef Automate & Related Topics",
      "leaves": [
        {
          "id": "chef-automate",
          "title": "Chef Automate"
        },
        {
          "id": "chef-effortless",
          "title": "Chef Effortless Infrastructure"
        },
        {
          "id": "chef-policyfiles",
          "title": "Policyfiles"
        },
        {
          "id": "chef-custom-resources",
          "title": "Custom Resources"
        },
        {
          "id": "chef-ohai",
          "title": "Ohai (System Profiler)"
        },
        {
          "id": "chef-licensing",
          "title": "Chef Licensing Model (Progress)"
        }
      ]
    }
  ],
  "puppet": [
    {
      "id": "puppet-architecture",
      "title": "Puppet Architecture",
      "leaves": [
        {
          "id": "puppet-master-agent",
          "title": "Master / Agent"
        },
        {
          "id": "puppet-masterless",
          "title": "Masterless Puppet"
        }
      ]
    },
    {
      "id": "puppet--installation-related-topics",
      "title": "Installation & Related Topics",
      "leaves": [
        {
          "id": "puppet-installation",
          "title": "Installation"
        },
        {
          "id": "puppet-manifests",
          "title": "Manifests (.pp)"
        },
        {
          "id": "puppet-modules",
          "title": "Modules"
        },
        {
          "id": "puppet-classes",
          "title": "Classes & Defined Types"
        },
        {
          "id": "puppet-resources",
          "title": "Resources & Resource Types"
        },
        {
          "id": "puppet-facter",
          "title": "Facter & Facts"
        }
      ]
    },
    {
      "id": "puppet--hiera-data-lookup-related-topics",
      "title": "Hiera (Data Lookup) & Related Topics",
      "leaves": [
        {
          "id": "puppet-hiera",
          "title": "Hiera (Data Lookup)"
        },
        {
          "id": "puppet-functions",
          "title": "Functions"
        },
        {
          "id": "puppetdb",
          "title": "PuppetDB"
        },
        {
          "id": "puppet-forge",
          "title": "Puppet Forge"
        },
        {
          "id": "puppet-bolt",
          "title": "Bolt (Ad-Hoc Orchestration)"
        },
        {
          "id": "puppet-r10k",
          "title": "r10k"
        }
      ]
    },
    {
      "id": "puppet--code-manager-related-topics",
      "title": "Code Manager & Related Topics",
      "leaves": [
        {
          "id": "puppet-code-manager",
          "title": "Code Manager"
        },
        {
          "id": "rspec-puppet",
          "title": "rspec-puppet"
        },
        {
          "id": "puppet-enterprise",
          "title": "Puppet Enterprise"
        },
        {
          "id": "open-source-puppet",
          "title": "Open-Source Puppet"
        },
        {
          "id": "puppet-7-8",
          "title": "Puppet 7 / 8"
        },
        {
          "id": "openvox-fork",
          "title": "OpenVox (Open-Source Puppet Fork)"
        }
      ]
    },
    {
      "id": "puppet--mcollective-choria",
      "title": "MCollective → Choria",
      "leaves": [
        {
          "id": "puppet-mco-choria",
          "title": "MCollective → Choria"
        }
      ]
    }
  ],
  "saltstack": [
    {
      "id": "salt-architecture",
      "title": "Salt Architecture",
      "leaves": [
        {
          "id": "salt-master-minion",
          "title": "Master / Minion"
        },
        {
          "id": "salt-masterless",
          "title": "Masterless Salt"
        },
        {
          "id": "salt-ssh-agentless",
          "title": "Salt SSH (Agentless)"
        },
        {
          "id": "salt-syndic",
          "title": "Salt Syndic"
        }
      ]
    },
    {
      "id": "saltstack--installation-related-topics",
      "title": "Installation & Related Topics",
      "leaves": [
        {
          "id": "salt-installation",
          "title": "Installation"
        },
        {
          "id": "salt-states",
          "title": "States (SLS Files)"
        },
        {
          "id": "salt-pillars",
          "title": "Pillars"
        },
        {
          "id": "salt-grains",
          "title": "Grains"
        },
        {
          "id": "salt-mine",
          "title": "Salt Mine"
        },
        {
          "id": "salt-beacons",
          "title": "Beacons"
        }
      ]
    },
    {
      "id": "saltstack--reactor-system-related-topics",
      "title": "Reactor System & Related Topics",
      "leaves": [
        {
          "id": "salt-reactor",
          "title": "Reactor System"
        },
        {
          "id": "salt-engines",
          "title": "Engines"
        }
      ]
    },
    {
      "id": "salt-modules",
      "title": "Salt Modules",
      "leaves": [
        {
          "id": "salt-execution-modules",
          "title": "Execution Modules"
        },
        {
          "id": "salt-state-modules",
          "title": "State Modules"
        },
        {
          "id": "salt-returner-modules",
          "title": "Returners"
        },
        {
          "id": "salt-runner-modules",
          "title": "Runners"
        }
      ]
    },
    {
      "id": "saltstack--salt-cloud-related-topics",
      "title": "Salt Cloud & Related Topics",
      "leaves": [
        {
          "id": "salt-cloud",
          "title": "Salt Cloud"
        },
        {
          "id": "salt-top-file",
          "title": "Top File"
        },
        {
          "id": "salt-targeting",
          "title": "Targeting (Glob, Grain, Compound)"
        },
        {
          "id": "salt-renderer",
          "title": "Renderers (jinja, yaml, py)"
        },
        {
          "id": "salt-event-system",
          "title": "Event System"
        },
        {
          "id": "salt-orchestrate",
          "title": "Salt Orchestrate Runner"
        }
      ]
    },
    {
      "id": "saltstack--salt-formulas-related-topics",
      "title": "Salt Formulas & Related Topics",
      "leaves": [
        {
          "id": "salt-formulas",
          "title": "Salt Formulas"
        },
        {
          "id": "salt-project-vs-stack",
          "title": "Salt Project & SaltStack Heritage"
        },
        {
          "id": "vmware-aria-automation-config",
          "title": "VMware Aria Automation Config (Salt-Based)"
        }
      ]
    }
  ],
  "jenkins": [
    {
      "id": "jenkins--jenkins-architecture-controller-agents",
      "title": "Jenkins Architecture (Controller + Agents)",
      "leaves": [
        {
          "id": "jenkins-architecture",
          "title": "Jenkins Architecture (Controller + Agents)"
        }
      ]
    },
    {
      "id": "jenkins-installation",
      "title": "Installation",
      "leaves": [
        {
          "id": "jenkins-war-install",
          "title": "WAR Install"
        },
        {
          "id": "jenkins-deb-rpm-install",
          "title": "DEB / RPM Install"
        },
        {
          "id": "jenkins-container-install",
          "title": "Container Install"
        },
        {
          "id": "jenkins-helm-install",
          "title": "Helm on Kubernetes"
        }
      ]
    },
    {
      "id": "jenkins--distributions-lts-vs-weekly",
      "title": "Distributions (LTS vs Weekly)",
      "leaves": [
        {
          "id": "jenkins-distributions-lts",
          "title": "Distributions (LTS vs Weekly)"
        }
      ]
    },
    {
      "id": "jenkins-agents",
      "title": "Agents",
      "leaves": [
        {
          "id": "jenkins-ssh-agents",
          "title": "SSH Agents"
        },
        {
          "id": "jenkins-jnlp-agents",
          "title": "JNLP / Inbound Agents"
        },
        {
          "id": "jenkins-container-agents",
          "title": "Container Agents (Docker, Kubernetes)"
        },
        {
          "id": "jenkins-cloud-agents",
          "title": "EC2 / GCE Cloud Agents"
        }
      ]
    },
    {
      "id": "jenkins-job-types",
      "title": "Job Types",
      "leaves": [
        {
          "id": "jenkins-freestyle-jobs",
          "title": "Freestyle Jobs"
        },
        {
          "id": "jenkins-pipeline-jobs",
          "title": "Pipeline Jobs"
        },
        {
          "id": "jenkins-multibranch-pipelines",
          "title": "Multibranch Pipelines"
        },
        {
          "id": "jenkins-folder-jobs",
          "title": "Folders & Organization Folders"
        },
        {
          "id": "jenkins-multi-config",
          "title": "Multi-Configuration Projects"
        }
      ]
    },
    {
      "id": "jenkins--jenkinsfile",
      "title": "Jenkinsfile",
      "leaves": [
        {
          "id": "jenkinsfile",
          "title": "Jenkinsfile"
        }
      ]
    },
    {
      "id": "jenkins-pipeline-syntax",
      "title": "Pipeline Syntax",
      "leaves": [
        {
          "id": "declarative-pipeline",
          "title": "Declarative Pipeline"
        },
        {
          "id": "scripted-pipeline",
          "title": "Scripted Pipeline"
        },
        {
          "id": "stages-steps-post",
          "title": "Stages, Steps, Post"
        },
        {
          "id": "parallel-stages-jenkins",
          "title": "Parallel Stages"
        },
        {
          "id": "input-step-jenkins",
          "title": "input Step"
        }
      ]
    },
    {
      "id": "jenkins--shared-libraries-related-topics",
      "title": "Shared Libraries & Related Topics",
      "leaves": [
        {
          "id": "jenkins-shared-libraries",
          "title": "Shared Libraries"
        },
        {
          "id": "jenkins-plugins",
          "title": "Plugin Ecosystem"
        },
        {
          "id": "jenkins-credentials",
          "title": "Credentials & Credential Store"
        },
        {
          "id": "jcasc",
          "title": "Configuration as Code (JCasC)"
        },
        {
          "id": "jenkins-blue-ocean",
          "title": "Blue Ocean"
        },
        {
          "id": "jenkins-on-kubernetes",
          "title": "Jenkins on Kubernetes"
        }
      ]
    },
    {
      "id": "jenkins--jenkins-x-cloud-native-spinoff-related-topics",
      "title": "Jenkins X (Cloud-Native Spinoff) & Related Topics",
      "leaves": [
        {
          "id": "jenkins-x-mention",
          "title": "Jenkins X (Cloud-Native Spinoff)"
        },
        {
          "id": "distributed-builds",
          "title": "Distributed Builds"
        },
        {
          "id": "jenkins-security",
          "title": "Security & Role-Based Access"
        },
        {
          "id": "jenkins-backup-upgrade",
          "title": "Backup, Upgrade & Maintenance"
        },
        {
          "id": "cloudbees-platform",
          "title": "CloudBees (Commercial)"
        },
        {
          "id": "jenkins-best-practices",
          "title": "Pipeline Best Practices"
        }
      ]
    },
    {
      "id": "jenkins--troubleshooting",
      "title": "Troubleshooting",
      "leaves": [
        {
          "id": "jenkins-troubleshooting",
          "title": "Troubleshooting"
        }
      ]
    }
  ],
  "github-actions": [
    {
      "id": "github-actions--workflows-related-topics",
      "title": "Workflows & Related Topics",
      "leaves": [
        {
          "id": "gha-workflows",
          "title": "Workflows"
        },
        {
          "id": "gha-events-triggers",
          "title": "Events & Triggers"
        },
        {
          "id": "gha-jobs-steps",
          "title": "Jobs & Steps"
        }
      ]
    },
    {
      "id": "gha-actions",
      "title": "Actions",
      "leaves": [
        {
          "id": "gha-marketplace-actions",
          "title": "Marketplace Actions"
        },
        {
          "id": "gha-composite-actions",
          "title": "Composite Actions"
        },
        {
          "id": "gha-javascript-actions",
          "title": "JavaScript Actions"
        },
        {
          "id": "gha-container-actions",
          "title": "Docker Container Actions"
        }
      ]
    },
    {
      "id": "gha-runners",
      "title": "Runners",
      "leaves": [
        {
          "id": "gha-github-hosted-runners",
          "title": "GitHub-Hosted Runners"
        },
        {
          "id": "gha-self-hosted-runners-overview",
          "title": "Self-Hosted Runners (Overview)"
        },
        {
          "id": "gha-larger-runners",
          "title": "Larger Runners"
        },
        {
          "id": "gha-arm-macos-runners",
          "title": "ARM & macOS Runners"
        }
      ]
    },
    {
      "id": "github-actions--secrets-variables-related-topics",
      "title": "Secrets & Variables & Related Topics",
      "leaves": [
        {
          "id": "gha-secrets-variables",
          "title": "Secrets & Variables"
        },
        {
          "id": "gha-environments",
          "title": "Environments & Protection Rules"
        },
        {
          "id": "gha-matrix-builds",
          "title": "Matrix Builds"
        },
        {
          "id": "gha-reusable-workflows",
          "title": "Reusable Workflows"
        },
        {
          "id": "gha-oidc-cloud-auth",
          "title": "OIDC for Cloud Authentication"
        },
        {
          "id": "gha-artifacts",
          "title": "Artifacts (v4)"
        }
      ]
    },
    {
      "id": "github-actions--caching-related-topics",
      "title": "Caching & Related Topics",
      "leaves": [
        {
          "id": "gha-caching",
          "title": "Caching"
        },
        {
          "id": "gha-concurrency",
          "title": "Workflow Concurrency"
        },
        {
          "id": "gha-permissions-token",
          "title": "Permissions & GITHUB_TOKEN"
        },
        {
          "id": "gha-required-reviewers",
          "title": "Required Reviewers & Deployment Approvals"
        },
        {
          "id": "gha-starter-workflows",
          "title": "Workflow / Starter Templates"
        },
        {
          "id": "gha-arc-runner-controller",
          "title": "Actions Runner Controller (ARC)"
        }
      ]
    },
    {
      "id": "github-actions--actions-on-private-repos-related-topics",
      "title": "Actions on Private Repos & Related Topics",
      "leaves": [
        {
          "id": "gha-private-repos",
          "title": "Actions on Private Repos"
        },
        {
          "id": "gha-workflow-dispatch",
          "title": "workflow_dispatch & repository_dispatch"
        },
        {
          "id": "gha-apps-for-actions",
          "title": "GitHub Apps for Actions"
        },
        {
          "id": "gha-artifact-attestations",
          "title": "Artifact Attestations"
        },
        {
          "id": "gha-immutable-actions",
          "title": "Immutable Actions & SHA Pinning"
        },
        {
          "id": "gha-debugging-act",
          "title": "Debugging with act (Local Runner)"
        }
      ]
    }
  ],
  "gitlab-cicd": [
    {
      "id": "gitlab-cicd--gitlab-ci-yml-related-topics",
      "title": ".gitlab-ci.yml & Related Topics",
      "leaves": [
        {
          "id": "gitlab-ci-yml",
          "title": ".gitlab-ci.yml"
        },
        {
          "id": "gitlab-jobs",
          "title": "Jobs"
        },
        {
          "id": "gitlab-stages",
          "title": "Stages"
        }
      ]
    },
    {
      "id": "gitlab-pipelines-types",
      "title": "Pipeline Types",
      "leaves": [
        {
          "id": "gitlab-basic-pipelines",
          "title": "Basic Pipelines"
        },
        {
          "id": "gitlab-parent-child-pipelines",
          "title": "Parent-Child Pipelines"
        },
        {
          "id": "gitlab-multi-project-pipelines",
          "title": "Multi-Project Pipelines"
        },
        {
          "id": "gitlab-downstream-pipelines",
          "title": "Downstream Pipelines"
        },
        {
          "id": "gitlab-merge-request-pipelines",
          "title": "Merge Request Pipelines"
        },
        {
          "id": "gitlab-merge-trains",
          "title": "Merge Trains"
        }
      ]
    },
    {
      "id": "gitlab-cicd--gitlab-runners-related-topics",
      "title": "GitLab Runners & Related Topics",
      "leaves": [
        {
          "id": "gitlab-runners",
          "title": "GitLab Runners"
        },
        {
          "id": "gitlab-cache-artifacts",
          "title": "Cache & Artifacts"
        },
        {
          "id": "gitlab-variables-secrets",
          "title": "Variables & CI/CD Secrets"
        },
        {
          "id": "gitlab-cicd-environments",
          "title": "Environments & Deployments"
        },
        {
          "id": "gitlab-rules-only-except",
          "title": "Rules / only / except / changes"
        },
        {
          "id": "gitlab-include",
          "title": "include"
        }
      ]
    },
    {
      "id": "gitlab-cicd--extends-yaml-anchors-related-topics",
      "title": "extends & YAML Anchors & Related Topics",
      "leaves": [
        {
          "id": "gitlab-extends",
          "title": "extends & YAML Anchors"
        },
        {
          "id": "gitlab-components",
          "title": "CI/CD Components"
        },
        {
          "id": "gitlab-needs-dag",
          "title": "needs & DAG Pipelines"
        },
        {
          "id": "gitlab-manual-jobs",
          "title": "Manual Jobs & Approvals"
        },
        {
          "id": "gitlab-triggers",
          "title": "Triggers & Pipeline Schedules"
        },
        {
          "id": "gitlab-deploy-keys",
          "title": "Deploy Keys & Tokens"
        }
      ]
    },
    {
      "id": "gitlab-cicd--review-apps-related-topics",
      "title": "Review Apps & Related Topics",
      "leaves": [
        {
          "id": "gitlab-review-apps",
          "title": "Review Apps"
        },
        {
          "id": "gitlab-auto-devops",
          "title": "Auto DevOps"
        },
        {
          "id": "gitlab-cicd-k8s-integration",
          "title": "GitLab CI/CD with Kubernetes"
        },
        {
          "id": "gitlab-agent-for-kubernetes",
          "title": "GitLab Agent for Kubernetes (agentk)"
        },
        {
          "id": "gitlab-cicd-oidc",
          "title": "OIDC for Cloud Authentication"
        },
        {
          "id": "gitlab-protected-branches-envs",
          "title": "Protected Branches & Environments"
        }
      ]
    },
    {
      "id": "gitlab-cicd--gitlab-runner-executors-overview",
      "title": "GitLab Runner Executors (Overview)",
      "leaves": [
        {
          "id": "gitlab-runner-executors",
          "title": "GitLab Runner Executors (Overview)"
        }
      ]
    }
  ],
  "other-cicd-tools": [
    {
      "id": "cloud-cicd-platforms",
      "title": "Cloud CI/CD Platforms",
      "leaves": [
        {
          "id": "circleci",
          "title": "CircleCI"
        },
        {
          "id": "codefresh-platform",
          "title": "Codefresh"
        },
        {
          "id": "harness-ci",
          "title": "Harness CI/CD"
        },
        {
          "id": "semaphore-ci",
          "title": "Semaphore"
        },
        {
          "id": "codemagic-mobile",
          "title": "Codemagic (Mobile)"
        },
        {
          "id": "bitrise-mobile",
          "title": "Bitrise (Mobile)"
        },
        {
          "id": "travis-ci-deprecated",
          "title": "Travis CI (Mostly Deprecated)"
        }
      ]
    },
    {
      "id": "self-hosted-cicd-platforms",
      "title": "Self-Hosted CI/CD Platforms",
      "leaves": [
        {
          "id": "teamcity",
          "title": "TeamCity (JetBrains)"
        },
        {
          "id": "bamboo",
          "title": "Atlassian Bamboo"
        },
        {
          "id": "gocd",
          "title": "GoCD"
        },
        {
          "id": "drone-ci",
          "title": "Drone CI"
        },
        {
          "id": "concourse-ci",
          "title": "Concourse CI"
        },
        {
          "id": "buildkite",
          "title": "Buildkite (Hybrid)"
        },
        {
          "id": "woodpecker-ci",
          "title": "Woodpecker CI"
        }
      ]
    },
    {
      "id": "vendor-cloud-cicd",
      "title": "Cloud Vendor CI/CD (Overview)",
      "leaves": [
        {
          "id": "azure-devops-pipelines",
          "title": "Azure DevOps Pipelines"
        },
        {
          "id": "aws-codepipeline-overview",
          "title": "AWS CodePipeline / CodeBuild / CodeDeploy"
        },
        {
          "id": "google-cloud-build-overview",
          "title": "Google Cloud Build"
        },
        {
          "id": "bitbucket-pipelines",
          "title": "Bitbucket Pipelines"
        },
        {
          "id": "oracle-cloud-devops",
          "title": "Oracle Cloud DevOps"
        }
      ]
    }
  ],
  "pipeline-as-code": [
    {
      "id": "tekton",
      "title": "Tekton",
      "leaves": [
        {
          "id": "tekton-pipelines",
          "title": "Tekton Pipelines"
        },
        {
          "id": "tekton-tasks",
          "title": "Tasks"
        },
        {
          "id": "tekton-pipelineruns-taskruns",
          "title": "PipelineRuns & TaskRuns"
        },
        {
          "id": "tekton-triggers",
          "title": "Tekton Triggers"
        },
        {
          "id": "tekton-chains",
          "title": "Tekton Chains (Supply Chain Security)"
        },
        {
          "id": "tekton-hub",
          "title": "Tekton Hub & Artifact Hub"
        },
        {
          "id": "tekton-resolvers",
          "title": "Tekton Resolvers"
        }
      ]
    },
    {
      "id": "argo-workflows-pac",
      "title": "Argo Workflows",
      "leaves": [
        {
          "id": "workflow-templates",
          "title": "WorkflowTemplates & ClusterWorkflowTemplates"
        },
        {
          "id": "argo-cron-workflows",
          "title": "CronWorkflows"
        },
        {
          "id": "argo-events",
          "title": "Argo Events"
        },
        {
          "id": "argo-workflow-dag",
          "title": "DAG Workflows"
        }
      ]
    },
    {
      "id": "pipeline-as-code--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "dagger-pac",
          "title": "Dagger"
        },
        {
          "id": "earthly-pac",
          "title": "Earthly"
        },
        {
          "id": "brigade-pac",
          "title": "Brigade"
        },
        {
          "id": "gha-as-pac",
          "title": "GitHub Actions as Pipeline-as-Code"
        },
        {
          "id": "gitlab-as-pac",
          "title": "GitLab CI as Pipeline-as-Code"
        },
        {
          "id": "pac-comparison",
          "title": "Pipeline-as-Code Comparison"
        }
      ]
    }
  ],
  "self-hosted-runners": [
    {
      "id": "self-hosted-runners--self-hosted-runner-concepts",
      "title": "Self-Hosted Runner Concepts",
      "leaves": [
        {
          "id": "self-hosted-runner-concepts",
          "title": "Self-Hosted Runner Concepts"
        }
      ]
    },
    {
      "id": "arc-actions-runner-controller",
      "title": "Actions Runner Controller (ARC)",
      "leaves": [
        {
          "id": "arc-legacy-mode",
          "title": "Legacy Mode"
        },
        {
          "id": "arc-new-mode",
          "title": "New Mode (Runner Scale Sets)"
        },
        {
          "id": "arc-helm-install",
          "title": "Helm Install"
        },
        {
          "id": "arc-autoscaling",
          "title": "Autoscaling Behaviour"
        }
      ]
    },
    {
      "id": "gitlab-runner-types",
      "title": "GitLab Runner Executors",
      "leaves": [
        {
          "id": "gitlab-shell-executor",
          "title": "Shell Executor"
        },
        {
          "id": "gitlab-docker-executor",
          "title": "Docker Executor"
        },
        {
          "id": "gitlab-kubernetes-executor",
          "title": "Kubernetes Executor"
        },
        {
          "id": "gitlab-docker-machine-executor",
          "title": "Docker Machine (Autoscaling)"
        },
        {
          "id": "gitlab-custom-executor",
          "title": "Custom Executor"
        }
      ]
    },
    {
      "id": "self-hosted-runners--jenkins-agents-self-hosted-lens-related-topics",
      "title": "Jenkins Agents (Self-Hosted Lens) & Related Topics",
      "leaves": [
        {
          "id": "jenkins-agents-deep",
          "title": "Jenkins Agents (Self-Hosted Lens)"
        },
        {
          "id": "ephemeral-vs-persistent-runners",
          "title": "Ephemeral vs Persistent Runners"
        },
        {
          "id": "runner-autoscaling",
          "title": "Runner Autoscaling"
        },
        {
          "id": "runner-security",
          "title": "Runner Security"
        },
        {
          "id": "runner-network-egress",
          "title": "Network Egress & Firewalls"
        },
        {
          "id": "runner-image-management",
          "title": "Runner Image Management"
        }
      ]
    },
    {
      "id": "self-hosted-runners--self-hosted-runner-cost-operations-related-topic",
      "title": "Self-Hosted Runner Cost & Operations & Related Topics",
      "leaves": [
        {
          "id": "self-hosted-runner-cost",
          "title": "Self-Hosted Runner Cost & Operations"
        },
        {
          "id": "runner-pools-isolation",
          "title": "Runner Pools & Tenant Isolation"
        },
        {
          "id": "spot-runners",
          "title": "Spot / Preemptible Runners"
        }
      ]
    },
    {
      "id": "managed-runner-services",
      "title": "Managed CI Runner Services",
      "leaves": [
        {
          "id": "depot-runners",
          "title": "Depot (Build & Runners)"
        },
        {
          "id": "namespace-runners",
          "title": "Namespace.so"
        },
        {
          "id": "blacksmith-runners",
          "title": "Blacksmith"
        },
        {
          "id": "buildjet-runners",
          "title": "BuildJet"
        },
        {
          "id": "cirun-runners",
          "title": "Cirun"
        },
        {
          "id": "runs-on-runners",
          "title": "RunsOn (AWS-native)"
        },
        {
          "id": "ubicloud-runners",
          "title": "Ubicloud"
        },
        {
          "id": "warpbuild-runners",
          "title": "WarpBuild"
        },
        {
          "id": "actuated-runners",
          "title": "Actuated (OpenFaaS)"
        },
        {
          "id": "runforge-runners",
          "title": "RunForge"
        }
      ]
    }
  ],
  "gitops-fundamentals": [
    {
      "id": "gitops-fundamentals--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-gitops",
          "title": "What is GitOps?"
        }
      ]
    },
    {
      "id": "opengitops-principles",
      "title": "OpenGitOps Principles",
      "leaves": [
        {
          "id": "principle-declarative",
          "title": "Declarative"
        },
        {
          "id": "principle-versioned-immutable",
          "title": "Versioned & Immutable"
        },
        {
          "id": "principle-pulled-automatically",
          "title": "Pulled Automatically"
        },
        {
          "id": "principle-continuously-reconciled",
          "title": "Continuously Reconciled"
        }
      ]
    },
    {
      "id": "gitops-fundamentals--pull-vs-push-deployment-models-related-topics",
      "title": "Pull vs Push Deployment Models & Related Topics",
      "leaves": [
        {
          "id": "pull-vs-push-deployment",
          "title": "Pull vs Push Deployment Models"
        },
        {
          "id": "gitops-vs-traditional-cd",
          "title": "GitOps vs Traditional CD"
        },
        {
          "id": "gitops-workflows",
          "title": "GitOps Workflows (Single & Multi-Repo)"
        },
        {
          "id": "application-of-record",
          "title": "Application of Record"
        },
        {
          "id": "reconciliation-loops",
          "title": "Reconciliation Loops"
        },
        {
          "id": "multi-env-gitops",
          "title": "Multi-Environment GitOps"
        }
      ]
    },
    {
      "id": "gitops-fundamentals--trunk-based-gitops-related-topics",
      "title": "Trunk-Based GitOps & Related Topics",
      "leaves": [
        {
          "id": "trunk-based-gitops",
          "title": "Trunk-Based GitOps"
        },
        {
          "id": "rendered-manifests-pattern",
          "title": "Rendered Manifests Pattern"
        },
        {
          "id": "app-of-apps-pattern",
          "title": "App-of-Apps Pattern"
        },
        {
          "id": "gitops-for-non-k8s",
          "title": "GitOps for Non-Kubernetes Infrastructure"
        },
        {
          "id": "cncf-gitops-wg",
          "title": "CNCF GitOps WG & OpenGitOps"
        },
        {
          "id": "gitops-anti-patterns",
          "title": "GitOps Anti-Patterns"
        }
      ]
    }
  ],
  "argo-cd": [
    {
      "id": "argo-cd--argo-cd-architecture",
      "title": "Argo CD Architecture",
      "leaves": [
        {
          "id": "argocd-architecture",
          "title": "Argo CD Architecture"
        }
      ]
    },
    {
      "id": "argocd-installation",
      "title": "Installation",
      "leaves": [
        {
          "id": "argocd-manifests-install",
          "title": "Manifests Install"
        },
        {
          "id": "argocd-helm-install",
          "title": "Helm Install"
        },
        {
          "id": "argocd-autopilot",
          "title": "Argo CD Autopilot"
        },
        {
          "id": "argocd-ha-mode",
          "title": "HA Argo CD"
        }
      ]
    },
    {
      "id": "argo-cd--application-crd",
      "title": "Application CRD",
      "leaves": [
        {
          "id": "argocd-application-crd",
          "title": "Application CRD"
        }
      ]
    },
    {
      "id": "argocd-applicationsets",
      "title": "ApplicationSets",
      "leaves": [
        {
          "id": "applicationset-list-generator",
          "title": "List Generator"
        },
        {
          "id": "applicationset-cluster-generator",
          "title": "Cluster Generator"
        },
        {
          "id": "applicationset-git-generator",
          "title": "Git Generator"
        },
        {
          "id": "applicationset-matrix-generator",
          "title": "Matrix Generator"
        },
        {
          "id": "applicationset-scm-generator",
          "title": "SCM Generator"
        },
        {
          "id": "applicationset-pr-generator",
          "title": "Pull Request Generator"
        },
        {
          "id": "applicationset-cluster-decision-generator",
          "title": "Cluster Decision Resource Generator"
        }
      ]
    },
    {
      "id": "argo-cd--essential-reading-references",
      "title": "Essential Reading & References",
      "leaves": [
        {
          "id": "argocd-projects",
          "title": "Projects (AppProject)"
        }
      ]
    },
    {
      "id": "argocd-sync-strategies",
      "title": "Sync Strategies",
      "leaves": [
        {
          "id": "argocd-manual-sync",
          "title": "Manual Sync"
        },
        {
          "id": "argocd-auto-sync",
          "title": "Auto Sync"
        },
        {
          "id": "argocd-sync-prune",
          "title": "Prune"
        },
        {
          "id": "argocd-sync-replace",
          "title": "Replace"
        },
        {
          "id": "argocd-sync-force",
          "title": "Force"
        },
        {
          "id": "argocd-self-heal",
          "title": "Self-Heal"
        }
      ]
    },
    {
      "id": "argocd-sync-hooks-waves",
      "title": "Sync Hooks & Waves",
      "leaves": [
        {
          "id": "argocd-presync",
          "title": "PreSync"
        },
        {
          "id": "argocd-sync-hook",
          "title": "Sync Hook"
        },
        {
          "id": "argocd-postsync",
          "title": "PostSync"
        },
        {
          "id": "argocd-syncfail-hook",
          "title": "SyncFail"
        },
        {
          "id": "argocd-sync-waves",
          "title": "Sync Waves"
        }
      ]
    },
    {
      "id": "argo-cd--sync-windows-related-topics",
      "title": "Sync Windows & Related Topics",
      "leaves": [
        {
          "id": "argocd-sync-windows",
          "title": "Sync Windows"
        },
        {
          "id": "argocd-health-checks",
          "title": "Health Checks (Built-in & Lua)"
        },
        {
          "id": "argocd-resource-tracking",
          "title": "Resource Tracking Methods"
        },
        {
          "id": "argocd-helm-support",
          "title": "Helm Support"
        },
        {
          "id": "argocd-kustomize-support",
          "title": "Kustomize Support"
        },
        {
          "id": "argocd-multi-cluster",
          "title": "Multi-Cluster (Cluster Management)"
        }
      ]
    },
    {
      "id": "argo-cd--argocd-cli-related-topics",
      "title": "argocd CLI & Related Topics",
      "leaves": [
        {
          "id": "argocd-cli",
          "title": "argocd CLI"
        },
        {
          "id": "argocd-ui",
          "title": "Argo CD UI"
        },
        {
          "id": "argocd-rbac",
          "title": "RBAC"
        }
      ]
    },
    {
      "id": "argocd-sso",
      "title": "SSO & Auth",
      "leaves": [
        {
          "id": "argocd-oidc",
          "title": "OIDC"
        },
        {
          "id": "argocd-saml-dex",
          "title": "SAML via Dex"
        }
      ]
    },
    {
      "id": "argo-cd--notifications-related-topics",
      "title": "Notifications & Related Topics",
      "leaves": [
        {
          "id": "argocd-notifications",
          "title": "Notifications"
        },
        {
          "id": "argocd-image-updater",
          "title": "Argo CD Image Updater"
        },
        {
          "id": "akuity-platform",
          "title": "Akuity (Argo Enterprise)"
        }
      ]
    }
  ],
  "flux": [
    {
      "id": "flux--flux-architecture-toolkit",
      "title": "Flux Architecture (Toolkit)",
      "leaves": [
        {
          "id": "flux-architecture",
          "title": "Flux Architecture (Toolkit)"
        }
      ]
    },
    {
      "id": "flux-controllers",
      "title": "Flux Controllers",
      "leaves": [
        {
          "id": "source-controller",
          "title": "Source Controller"
        },
        {
          "id": "kustomize-controller",
          "title": "Kustomize Controller"
        },
        {
          "id": "helm-controller",
          "title": "Helm Controller"
        },
        {
          "id": "notification-controller",
          "title": "Notification Controller"
        },
        {
          "id": "image-reflector-controller",
          "title": "Image Reflector Controller"
        },
        {
          "id": "image-automation-controller",
          "title": "Image Automation Controller"
        }
      ]
    },
    {
      "id": "flux-source-resources",
      "title": "Source Resources",
      "leaves": [
        {
          "id": "flux-gitrepository",
          "title": "GitRepository"
        },
        {
          "id": "flux-ocirepository",
          "title": "OCIRepository"
        },
        {
          "id": "flux-helmrepository",
          "title": "HelmRepository"
        },
        {
          "id": "flux-bucket-source",
          "title": "Bucket"
        }
      ]
    },
    {
      "id": "flux--kustomization-resource-related-topics",
      "title": "Kustomization Resource & Related Topics",
      "leaves": [
        {
          "id": "flux-kustomization-resource",
          "title": "Kustomization Resource"
        },
        {
          "id": "flux-helmrelease-resource",
          "title": "HelmRelease Resource"
        },
        {
          "id": "flux-multi-tenancy",
          "title": "Multi-Tenancy"
        },
        {
          "id": "flux-multi-cluster",
          "title": "Multi-Cluster Flux"
        },
        {
          "id": "flux-cli",
          "title": "Flux CLI"
        },
        {
          "id": "flux-operator",
          "title": "Flux Operator"
        }
      ]
    },
    {
      "id": "flux--flux-bootstrap-related-topics",
      "title": "flux bootstrap & Related Topics",
      "leaves": [
        {
          "id": "flux-bootstrap",
          "title": "flux bootstrap"
        },
        {
          "id": "flux-receivers-webhooks",
          "title": "Receivers & Webhooks"
        },
        {
          "id": "flux-subsystem-for-argo",
          "title": "Flux Subsystem for Argo (FSA)"
        }
      ]
    }
  ],
  "deployment-strategies": [
    {
      "id": "deployment-strategies--recreate-big-bang-deployment-related-topics",
      "title": "Recreate / Big Bang Deployment & Related Topics",
      "leaves": [
        {
          "id": "recreate-big-bang",
          "title": "Recreate / Big Bang Deployment"
        },
        {
          "id": "rolling-deployment",
          "title": "Rolling Deployment"
        },
        {
          "id": "blue-green-deployment",
          "title": "Blue-Green Deployment"
        },
        {
          "id": "canary-deployment",
          "title": "Canary Deployment"
        },
        {
          "id": "dark-launches",
          "title": "Dark Launches"
        },
        {
          "id": "ab-testing-deployment",
          "title": "A/B Testing Deployments"
        }
      ]
    },
    {
      "id": "deployment-strategies--shadow-mirror-deployment-related-topics",
      "title": "Shadow / Mirror Deployment & Related Topics",
      "leaves": [
        {
          "id": "shadow-deployment",
          "title": "Shadow / Mirror Deployment"
        },
        {
          "id": "ramped-progressive",
          "title": "Ramped / Progressive Deployment"
        },
        {
          "id": "feature-toggle-deployment",
          "title": "Feature Toggle Deployment"
        },
        {
          "id": "hotfix-deployment",
          "title": "Hotfix Deployment"
        }
      ]
    },
    {
      "id": "database-deployment-patterns",
      "title": "Database Deployment Patterns",
      "leaves": [
        {
          "id": "expand-contract-pattern",
          "title": "Expand-Contract / Parallel Change"
        },
        {
          "id": "backwards-compat-db",
          "title": "Backwards-Compatible Schema Changes"
        },
        {
          "id": "online-schema-changes",
          "title": "Online Schema Changes"
        },
        {
          "id": "dual-writes-pattern",
          "title": "Dual Writes"
        }
      ]
    },
    {
      "id": "deployment-strategies--strangler-fig-pattern-related-topics",
      "title": "Strangler Fig Pattern & Related Topics",
      "leaves": [
        {
          "id": "strangler-fig-deployment",
          "title": "Strangler Fig Pattern"
        },
        {
          "id": "manual-approvals-gates",
          "title": "Manual Approvals & Gates"
        }
      ]
    },
    {
      "id": "rollback-strategies",
      "title": "Rollback Strategies",
      "leaves": [
        {
          "id": "instant-rollback",
          "title": "Instant Rollback"
        },
        {
          "id": "roll-forward",
          "title": "Roll Forward"
        },
        {
          "id": "compensating-changes",
          "title": "Compensating Changes"
        }
      ]
    },
    {
      "id": "deployment-strategies--zero-downtime-deployment-related-topics",
      "title": "Zero-Downtime Deployment & Related Topics",
      "leaves": [
        {
          "id": "zero-downtime-deployment",
          "title": "Zero-Downtime Deployment"
        },
        {
          "id": "multi-region-deployment",
          "title": "Multi-Region Deployment"
        },
        {
          "id": "immutable-deployment",
          "title": "Immutable Deployment"
        },
        {
          "id": "release-train",
          "title": "Release Trains"
        },
        {
          "id": "continuous-deployment-deep",
          "title": "Continuous Deployment in Depth"
        }
      ]
    }
  ],
  "feature-flags": [
    {
      "id": "feature-flag-categories",
      "title": "Feature Flag Categories",
      "leaves": [
        {
          "id": "release-toggles",
          "title": "Release Toggles"
        },
        {
          "id": "experiment-toggles",
          "title": "Experiment Toggles"
        },
        {
          "id": "ops-toggles",
          "title": "Ops Toggles"
        },
        {
          "id": "permission-toggles",
          "title": "Permission Toggles"
        }
      ]
    },
    {
      "id": "feature-flags--long-lived-vs-short-lived-flags-related-topics",
      "title": "Long-Lived vs Short-Lived Flags & Related Topics",
      "leaves": [
        {
          "id": "long-vs-short-lived-flags",
          "title": "Long-Lived vs Short-Lived Flags"
        },
        {
          "id": "flag-targeting-rules",
          "title": "Targeting Rules"
        },
        {
          "id": "ab-testing-with-flags",
          "title": "A/B Testing with Flags"
        },
        {
          "id": "cohort-segment-management",
          "title": "Cohort & Segment Management"
        },
        {
          "id": "feature-flag-debt",
          "title": "Feature Flag Debt"
        },
        {
          "id": "openfeature-standard",
          "title": "OpenFeature (CNCF Standard)"
        }
      ]
    },
    {
      "id": "feature-flags--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "openfeature-providers",
          "title": "OpenFeature Providers"
        },
        {
          "id": "server-vs-client-flags",
          "title": "Server-Side vs Client-Side Flags"
        },
        {
          "id": "self-hosted-vs-saas-flags",
          "title": "Self-Hosted vs SaaS"
        }
      ]
    },
    {
      "id": "feature-flag-platforms",
      "title": "Feature Flag Platforms",
      "leaves": [
        {
          "id": "launchdarkly",
          "title": "LaunchDarkly"
        },
        {
          "id": "flagsmith",
          "title": "Flagsmith"
        },
        {
          "id": "unleash",
          "title": "Unleash"
        },
        {
          "id": "growthbook",
          "title": "GrowthBook"
        },
        {
          "id": "split-io",
          "title": "Split.io"
        },
        {
          "id": "configcat",
          "title": "ConfigCat"
        },
        {
          "id": "posthog-feature-flags",
          "title": "PostHog Feature Flags"
        },
        {
          "id": "gitlab-feature-flags",
          "title": "GitLab Feature Flags"
        },
        {
          "id": "bucket-co",
          "title": "Bucket.co"
        },
        {
          "id": "devcycle",
          "title": "DevCycle"
        },
        {
          "id": "aws-appconfig-flags",
          "title": "AWS AppConfig Feature Flags"
        }
      ]
    },
    {
      "id": "feature-flags--flag-lifecycle-management-related-topics",
      "title": "Flag Lifecycle Management & Related Topics",
      "leaves": [
        {
          "id": "flag-lifecycle-management",
          "title": "Flag Lifecycle Management"
        },
        {
          "id": "flag-observability",
          "title": "Flag Observability & Analytics"
        }
      ]
    }
  ],
  "progressive-delivery-tools": [
    {
      "id": "argo-rollouts",
      "title": "Argo Rollouts",
      "leaves": [
        {
          "id": "rollout-crd",
          "title": "Rollout CRD"
        },
        {
          "id": "rollouts-canary",
          "title": "Canary Strategy"
        },
        {
          "id": "rollouts-blue-green",
          "title": "Blue-Green Strategy"
        },
        {
          "id": "rollouts-experiments",
          "title": "Experiments"
        },
        {
          "id": "analysis-template-run",
          "title": "AnalysisTemplate & AnalysisRun"
        },
        {
          "id": "rollouts-dashboard",
          "title": "Argo Rollouts Dashboard & Plugin"
        },
        {
          "id": "rollouts-metrics-providers",
          "title": "Metrics Providers (Prometheus, Datadog, Wavefront, NewRelic, CloudWatch)"
        },
        {
          "id": "rollouts-traffic-routing",
          "title": "Traffic Routing (Ingress, Service Mesh, Gateway API)"
        },
        {
          "id": "rollouts-pre-post-hooks",
          "title": "PrePromotionAnalysis & PostPromotionAnalysis"
        }
      ]
    },
    {
      "id": "flagger",
      "title": "Flagger",
      "leaves": [
        {
          "id": "flagger-architecture",
          "title": "Flagger Architecture"
        },
        {
          "id": "flagger-canary-crd",
          "title": "Canary CRD"
        },
        {
          "id": "flagger-mesh-integrations",
          "title": "Service Mesh Integrations (Istio, Linkerd, App Mesh, etc.)"
        },
        {
          "id": "flagger-ingress-integrations",
          "title": "Ingress Integrations (NGINX, Contour, Gloo, Traefik)"
        },
        {
          "id": "flagger-metrics-analysis",
          "title": "Metrics Analysis"
        },
        {
          "id": "flagger-webhooks",
          "title": "Webhooks (Pre-Rollout, Rollout, Post-Rollout)"
        },
        {
          "id": "flagger-notifications",
          "title": "Notifications (Slack, Teams, Discord)"
        }
      ]
    },
    {
      "id": "progressive-delivery-tools--launchdarkly-progressive-rollouts-related-topics",
      "title": "LaunchDarkly Progressive Rollouts & Related Topics",
      "leaves": [
        {
          "id": "launchdarkly-rollouts",
          "title": "LaunchDarkly Progressive Rollouts"
        },
        {
          "id": "harness-feature-deploy",
          "title": "Harness Feature Flags & Deployments"
        },
        {
          "id": "octopus-deploy-progressive",
          "title": "Octopus Deploy (Progressive Delivery)"
        },
        {
          "id": "codefresh-progressive",
          "title": "Codefresh Progressive Delivery"
        },
        {
          "id": "kayenta-spinnaker",
          "title": "Kayenta (Automated Canary Analysis)"
        },
        {
          "id": "service-mesh-progressive",
          "title": "Service-Mesh-Based Progressive Delivery"
        }
      ]
    },
    {
      "id": "progressive-delivery-tools--progressive-delivery-best-practices",
      "title": "Progressive Delivery Best Practices",
      "leaves": [
        {
          "id": "progressive-delivery-best-practices",
          "title": "Progressive Delivery Best Practices"
        }
      ]
    }
  ],
  "prometheus-metrics": [
    {
      "id": "prometheus-metrics--prometheus-architecture-related-topics",
      "title": "Prometheus Architecture & Related Topics",
      "leaves": [
        {
          "id": "prometheus-architecture",
          "title": "Prometheus Architecture"
        },
        {
          "id": "prometheus-installation",
          "title": "Installation & Deployment"
        },
        {
          "id": "prometheus-config-yml",
          "title": "prometheus.yml Configuration"
        },
        {
          "id": "prometheus-scraping",
          "title": "Scraping (Jobs & Targets)"
        }
      ]
    },
    {
      "id": "prometheus-service-discovery",
      "title": "Service Discovery",
      "leaves": [
        {
          "id": "kubernetes-sd",
          "title": "kubernetes_sd_configs"
        },
        {
          "id": "ec2-sd",
          "title": "ec2_sd_configs"
        },
        {
          "id": "gce-sd",
          "title": "gce_sd_configs"
        },
        {
          "id": "azure-sd",
          "title": "azure_sd_configs"
        },
        {
          "id": "file-sd",
          "title": "file_sd_configs"
        },
        {
          "id": "http-sd",
          "title": "http_sd_configs"
        },
        {
          "id": "consul-sd-prom",
          "title": "consul_sd_configs"
        },
        {
          "id": "dns-sd-prom",
          "title": "dns_sd_configs"
        }
      ]
    },
    {
      "id": "prometheus-metric-types",
      "title": "Metric Types",
      "leaves": [
        {
          "id": "counter-metric",
          "title": "Counter"
        },
        {
          "id": "gauge-metric",
          "title": "Gauge"
        },
        {
          "id": "histogram-metric",
          "title": "Histogram"
        },
        {
          "id": "summary-metric",
          "title": "Summary"
        },
        {
          "id": "native-histograms",
          "title": "Native (Sparse) Histograms"
        }
      ]
    },
    {
      "id": "promql",
      "title": "PromQL",
      "leaves": [
        {
          "id": "promql-selectors",
          "title": "Selectors & Matchers"
        },
        {
          "id": "promql-aggregations",
          "title": "Aggregations"
        },
        {
          "id": "promql-functions",
          "title": "Functions"
        },
        {
          "id": "promql-rate-irate-increase",
          "title": "rate, irate, increase"
        },
        {
          "id": "promql-histogram-quantile",
          "title": "histogram_quantile"
        },
        {
          "id": "promql-subqueries",
          "title": "Subqueries"
        },
        {
          "id": "promql-recording-rules",
          "title": "Recording Rules"
        },
        {
          "id": "promql-alerting-rules",
          "title": "Alerting Rules"
        },
        {
          "id": "promql-best-practices",
          "title": "PromQL Best Practices"
        }
      ]
    },
    {
      "id": "alertmanager",
      "title": "Alertmanager",
      "leaves": [
        {
          "id": "alertmanager-routes",
          "title": "Routes"
        },
        {
          "id": "alertmanager-receivers",
          "title": "Receivers"
        },
        {
          "id": "alertmanager-silences",
          "title": "Silences"
        },
        {
          "id": "alertmanager-inhibition",
          "title": "Inhibition"
        },
        {
          "id": "alertmanager-templates",
          "title": "Templates"
        },
        {
          "id": "alertmanager-clustering",
          "title": "Clustering"
        },
        {
          "id": "alertmanager-amtool",
          "title": "amtool"
        }
      ]
    },
    {
      "id": "prometheus-exporters",
      "title": "Exporters",
      "leaves": [
        {
          "id": "node-exporter",
          "title": "node_exporter"
        },
        {
          "id": "windows-exporter",
          "title": "windows_exporter"
        },
        {
          "id": "blackbox-exporter",
          "title": "blackbox_exporter"
        },
        {
          "id": "cadvisor-exporter",
          "title": "cAdvisor"
        },
        {
          "id": "mysqld-exporter",
          "title": "mysqld_exporter"
        },
        {
          "id": "postgres-exporter",
          "title": "postgres_exporter"
        },
        {
          "id": "redis-exporter",
          "title": "redis_exporter"
        },
        {
          "id": "jmx-exporter",
          "title": "jmx_exporter"
        },
        {
          "id": "snmp-exporter",
          "title": "snmp_exporter"
        },
        {
          "id": "kube-state-metrics",
          "title": "kube-state-metrics"
        },
        {
          "id": "pushgateway",
          "title": "Pushgateway"
        }
      ]
    },
    {
      "id": "prometheus-metrics--git-core-mechanics",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "prometheus-federation",
          "title": "Federation"
        },
        {
          "id": "prometheus-remote-write-read",
          "title": "Remote Write / Remote Read"
        }
      ]
    },
    {
      "id": "long-term-prometheus-storage",
      "title": "Long-Term Storage Backends",
      "leaves": [
        {
          "id": "thanos",
          "title": "Thanos"
        },
        {
          "id": "cortex",
          "title": "Cortex"
        },
        {
          "id": "grafana-mimir",
          "title": "Grafana Mimir"
        },
        {
          "id": "m3db",
          "title": "M3DB"
        },
        {
          "id": "victoriametrics",
          "title": "VictoriaMetrics"
        },
        {
          "id": "chronosphere-tsdb",
          "title": "Chronosphere"
        }
      ]
    },
    {
      "id": "prometheus-metrics--prometheus-operator-overview-related-topics",
      "title": "Prometheus Operator (Overview) & Related Topics",
      "leaves": [
        {
          "id": "prometheus-operator-overview",
          "title": "Prometheus Operator (Overview)"
        },
        {
          "id": "service-pod-monitor-crds",
          "title": "ServiceMonitor & PodMonitor CRDs"
        },
        {
          "id": "prometheus-multi-tenancy",
          "title": "Multi-Tenancy"
        },
        {
          "id": "prometheus-exemplars",
          "title": "Exemplars (Linking to Traces)"
        },
        {
          "id": "promtool",
          "title": "promtool"
        },
        {
          "id": "cardinality-control",
          "title": "Cardinality Control"
        }
      ]
    },
    {
      "id": "prometheus-metrics--delivery-flow-metrics",
      "title": "Delivery & Flow Metrics",
      "leaves": [
        {
          "id": "prometheus-adaptive-metrics",
          "title": "Adaptive Metrics (Mimir / Chronosphere)"
        }
      ]
    }
  ],
  "grafana-visualization": [
    {
      "id": "grafana-visualization--grafana-overview",
      "title": "Grafana Overview",
      "leaves": [
        {
          "id": "grafana-overview",
          "title": "Grafana Overview"
        }
      ]
    },
    {
      "id": "grafana-datasources",
      "title": "Data Sources",
      "leaves": [
        {
          "id": "grafana-prometheus-ds",
          "title": "Prometheus"
        },
        {
          "id": "grafana-loki-ds",
          "title": "Loki"
        },
        {
          "id": "grafana-tempo-ds",
          "title": "Tempo"
        },
        {
          "id": "grafana-mimir-ds",
          "title": "Mimir"
        },
        {
          "id": "grafana-pyroscope-ds",
          "title": "Pyroscope"
        },
        {
          "id": "grafana-elasticsearch-ds",
          "title": "Elasticsearch / OpenSearch"
        },
        {
          "id": "grafana-cloudwatch-ds",
          "title": "CloudWatch"
        },
        {
          "id": "grafana-influxdb-ds",
          "title": "InfluxDB"
        }
      ]
    },
    {
      "id": "grafana-visualization--dashboards-related-topics",
      "title": "Dashboards & Related Topics",
      "leaves": [
        {
          "id": "grafana-dashboards",
          "title": "Dashboards"
        },
        {
          "id": "grafana-panels",
          "title": "Panels & Visualizations"
        },
        {
          "id": "grafana-variables",
          "title": "Variables & Templating"
        },
        {
          "id": "grafana-annotations",
          "title": "Annotations"
        }
      ]
    },
    {
      "id": "grafana-alerting",
      "title": "Unified Alerting",
      "leaves": [
        {
          "id": "grafana-notification-policies",
          "title": "Notification Policies"
        },
        {
          "id": "grafana-contact-points",
          "title": "Contact Points"
        },
        {
          "id": "grafana-mute-timings",
          "title": "Mute Timings"
        },
        {
          "id": "grafana-alert-rules",
          "title": "Alert Rules"
        }
      ]
    },
    {
      "id": "grafana-visualization--provisioning-dashboards-datasources-alerts-as-co",
      "title": "Provisioning (Dashboards / Datasources / Alerts as Code) & Related Topics",
      "leaves": [
        {
          "id": "grafana-provisioning",
          "title": "Provisioning (Dashboards / Datasources / Alerts as Code)"
        },
        {
          "id": "grafana-plugins",
          "title": "Plugins"
        }
      ]
    },
    {
      "id": "lgtm-stack",
      "title": "LGTM Stack",
      "leaves": [
        {
          "id": "lgtm-loki",
          "title": "Loki"
        },
        {
          "id": "lgtm-grafana",
          "title": "Grafana"
        },
        {
          "id": "lgtm-tempo",
          "title": "Tempo"
        },
        {
          "id": "lgtm-mimir",
          "title": "Mimir"
        }
      ]
    },
    {
      "id": "grafana-visualization--grafana-cloud-related-topics",
      "title": "Grafana Cloud & Related Topics",
      "leaves": [
        {
          "id": "grafana-cloud",
          "title": "Grafana Cloud"
        },
        {
          "id": "grafana-enterprise",
          "title": "Grafana Enterprise"
        },
        {
          "id": "grafana-oncall",
          "title": "Grafana OnCall"
        },
        {
          "id": "grafana-k6",
          "title": "Grafana k6 (Load Testing)"
        },
        {
          "id": "grafana-faro",
          "title": "Grafana Faro (RUM)"
        },
        {
          "id": "grafana-pyroscope",
          "title": "Grafana Pyroscope (Profiling)"
        }
      ]
    },
    {
      "id": "grafana-visualization--grafana-beyla-ebpf-auto-instrumentation-related-",
      "title": "Grafana Beyla (eBPF Auto-Instrumentation) & Related Topics",
      "leaves": [
        {
          "id": "grafana-beyla",
          "title": "Grafana Beyla (eBPF Auto-Instrumentation)"
        },
        {
          "id": "grafana-adaptive-metrics",
          "title": "Grafana Adaptive Metrics"
        },
        {
          "id": "grafana-drilldown",
          "title": "Grafana Drilldown Apps (Logs, Metrics, Traces, Profiles)"
        },
        {
          "id": "grafana-public-dashboards",
          "title": "Public Dashboards"
        },
        {
          "id": "grafana-service-accounts",
          "title": "Service Accounts & API Keys"
        },
        {
          "id": "grafana-ai-assistant",
          "title": "Grafana AI Assistant (LLM Features)"
        }
      ]
    },
    {
      "id": "grafana-visualization--grafana-sift-auto-investigations",
      "title": "Grafana Sift (Auto Investigations)",
      "leaves": [
        {
          "id": "grafana-sift",
          "title": "Grafana Sift (Auto Investigations)"
        }
      ]
    }
  ],
  "opentelemetry": [
    {
      "id": "opentelemetry--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-otel",
          "title": "What is OpenTelemetry?"
        },
        {
          "id": "otel-architecture",
          "title": "OTel Architecture"
        }
      ]
    },
    {
      "id": "otel-signals",
      "title": "Signals",
      "leaves": [
        {
          "id": "otel-metrics-signal",
          "title": "Metrics"
        },
        {
          "id": "otel-traces-signal",
          "title": "Traces"
        },
        {
          "id": "otel-logs-signal",
          "title": "Logs"
        },
        {
          "id": "otel-profiles-signal",
          "title": "Profiles"
        }
      ]
    },
    {
      "id": "opentelemetry--otel-api-sdk-related-topics",
      "title": "OTel API & SDK & Related Topics",
      "leaves": [
        {
          "id": "otel-api-sdk",
          "title": "OTel API & SDK"
        },
        {
          "id": "otel-auto-instrumentation",
          "title": "Auto-Instrumentation"
        },
        {
          "id": "otel-manual-instrumentation",
          "title": "Manual Instrumentation"
        }
      ]
    },
    {
      "id": "otel-language-sdks",
      "title": "Language SDKs",
      "leaves": [
        {
          "id": "otel-java-sdk",
          "title": "Java SDK"
        },
        {
          "id": "otel-python-sdk",
          "title": "Python SDK"
        },
        {
          "id": "otel-go-sdk",
          "title": "Go SDK"
        },
        {
          "id": "otel-js-sdk",
          "title": "JavaScript / Node SDK"
        },
        {
          "id": "otel-dotnet-sdk",
          "title": ".NET SDK"
        },
        {
          "id": "otel-ruby-sdk",
          "title": "Ruby SDK"
        },
        {
          "id": "otel-rust-sdk",
          "title": "Rust SDK"
        },
        {
          "id": "otel-php-sdk",
          "title": "PHP SDK"
        },
        {
          "id": "otel-swift-sdk",
          "title": "Swift SDK"
        }
      ]
    },
    {
      "id": "otel-collector",
      "title": "OTel Collector",
      "leaves": [
        {
          "id": "collector-receivers",
          "title": "Receivers"
        },
        {
          "id": "collector-processors",
          "title": "Processors"
        },
        {
          "id": "collector-exporters",
          "title": "Exporters"
        },
        {
          "id": "collector-extensions",
          "title": "Extensions"
        },
        {
          "id": "collector-pipelines",
          "title": "Pipelines"
        },
        {
          "id": "collector-contrib",
          "title": "Contrib Distribution"
        }
      ]
    },
    {
      "id": "collector-deployments",
      "title": "Collector Deployment Patterns",
      "leaves": [
        {
          "id": "agent-deployment",
          "title": "Agent Deployment"
        },
        {
          "id": "gateway-deployment",
          "title": "Gateway Deployment"
        },
        {
          "id": "sidecar-collector",
          "title": "Sidecar Collector"
        }
      ]
    },
    {
      "id": "opentelemetry--opentelemetry-operator-kubernetes-related-topics",
      "title": "OpenTelemetry Operator (Kubernetes) & Related Topics",
      "leaves": [
        {
          "id": "otel-operator",
          "title": "OpenTelemetry Operator (Kubernetes)"
        },
        {
          "id": "otel-semantic-conventions",
          "title": "Semantic Conventions"
        },
        {
          "id": "otel-resource-detection",
          "title": "Resource Detection"
        }
      ]
    },
    {
      "id": "otel-context-propagation",
      "title": "Context Propagation",
      "leaves": [
        {
          "id": "w3c-tracecontext",
          "title": "W3C TraceContext"
        },
        {
          "id": "w3c-baggage",
          "title": "W3C Baggage"
        },
        {
          "id": "b3-propagation",
          "title": "B3 Propagation"
        }
      ]
    },
    {
      "id": "opentelemetry--otel-sampling-head-tail-related-topics",
      "title": "OTel Sampling (Head & Tail) & Related Topics",
      "leaves": [
        {
          "id": "otel-sampling",
          "title": "OTel Sampling (Head & Tail)"
        },
        {
          "id": "otlp-protocol",
          "title": "OTLP Protocol (gRPC, HTTP)"
        },
        {
          "id": "otel-profiling",
          "title": "OTel Profiling (eBPF, pprof)"
        },
        {
          "id": "otel-demo-app",
          "title": "OpenTelemetry Demo"
        }
      ]
    },
    {
      "id": "otel-cloud-integrations",
      "title": "Cloud Integrations",
      "leaves": [
        {
          "id": "otel-aws-lambda-layers",
          "title": "AWS Lambda Layers"
        },
        {
          "id": "otel-aws-distro",
          "title": "AWS Distro for OpenTelemetry (ADOT)"
        },
        {
          "id": "otel-azure-monitor",
          "title": "Azure Monitor OpenTelemetry"
        },
        {
          "id": "otel-gcp-ops-agent",
          "title": "Google Cloud Ops Agent"
        }
      ]
    },
    {
      "id": "opentelemetry--opentelemetry-arrow-related-topics",
      "title": "OpenTelemetry Arrow & Related Topics",
      "leaves": [
        {
          "id": "otel-arrow",
          "title": "OpenTelemetry Arrow"
        },
        {
          "id": "otel-collector-builder",
          "title": "OCB (OpenTelemetry Collector Builder)"
        }
      ]
    }
  ],
  "commercial-observability": [
    {
      "id": "datadog",
      "title": "Datadog",
      "leaves": [
        {
          "id": "datadog-agent",
          "title": "Datadog Agent"
        },
        {
          "id": "datadog-apm",
          "title": "Datadog APM"
        },
        {
          "id": "datadog-infrastructure",
          "title": "Infrastructure Monitoring"
        },
        {
          "id": "datadog-logs",
          "title": "Log Management"
        },
        {
          "id": "datadog-rum",
          "title": "Real User Monitoring (RUM)"
        },
        {
          "id": "datadog-synthetic",
          "title": "Synthetic Monitoring"
        },
        {
          "id": "datadog-npm",
          "title": "Network Performance Monitoring"
        },
        {
          "id": "datadog-database-monitoring",
          "title": "Database Monitoring"
        },
        {
          "id": "datadog-cloud-siem",
          "title": "Cloud SIEM"
        },
        {
          "id": "datadog-workflows",
          "title": "Datadog Workflows & Automations"
        },
        {
          "id": "datadog-bits-ai",
          "title": "Bits AI"
        }
      ]
    },
    {
      "id": "new-relic",
      "title": "New Relic",
      "leaves": [
        {
          "id": "newrelic-one",
          "title": "New Relic One Platform"
        },
        {
          "id": "newrelic-apm",
          "title": "New Relic APM"
        },
        {
          "id": "newrelic-infrastructure",
          "title": "Infrastructure"
        },
        {
          "id": "newrelic-browser",
          "title": "Browser"
        },
        {
          "id": "newrelic-synthetic",
          "title": "Synthetic Monitoring"
        },
        {
          "id": "nrql",
          "title": "NRQL"
        },
        {
          "id": "newrelic-ai",
          "title": "New Relic AI"
        }
      ]
    },
    {
      "id": "dynatrace",
      "title": "Dynatrace",
      "leaves": [
        {
          "id": "dynatrace-oneagent",
          "title": "OneAgent"
        },
        {
          "id": "dynatrace-smartscape",
          "title": "Smartscape"
        },
        {
          "id": "dynatrace-davis-ai",
          "title": "Davis AI"
        },
        {
          "id": "dynatrace-grail",
          "title": "Grail"
        },
        {
          "id": "dynatrace-dql",
          "title": "DQL (Dynatrace Query Language)"
        }
      ]
    },
    {
      "id": "splunk-observability",
      "title": "Splunk",
      "leaves": [
        {
          "id": "splunk-enterprise",
          "title": "Splunk Enterprise"
        },
        {
          "id": "splunk-cloud",
          "title": "Splunk Cloud"
        },
        {
          "id": "splunk-observability-cloud",
          "title": "Splunk Observability Cloud (SignalFx Heritage)"
        },
        {
          "id": "splunk-apm",
          "title": "Splunk APM"
        },
        {
          "id": "splunk-infrastructure-monitoring",
          "title": "Splunk Infrastructure Monitoring"
        },
        {
          "id": "spl-language",
          "title": "SPL (Search Processing Language)"
        }
      ]
    },
    {
      "id": "honeycomb",
      "title": "Honeycomb",
      "leaves": [
        {
          "id": "honeycomb-events",
          "title": "Wide Events Model"
        },
        {
          "id": "honeycomb-bubbleup",
          "title": "BubbleUp"
        },
        {
          "id": "honeycomb-slos",
          "title": "Honeycomb SLOs"
        },
        {
          "id": "honeycomb-refinery",
          "title": "Refinery (Sampling)"
        }
      ]
    },
    {
      "id": "elastic-observability",
      "title": "Elastic Observability",
      "leaves": [
        {
          "id": "elastic-apm-suite",
          "title": "Elastic APM"
        },
        {
          "id": "elastic-logs-platform",
          "title": "Elastic Logs"
        },
        {
          "id": "elastic-metrics-platform",
          "title": "Elastic Metrics"
        },
        {
          "id": "elastic-aiops",
          "title": "Elastic AIOps"
        }
      ]
    },
    {
      "id": "commercial-observability--lightstep-servicenow-cloud-observability-related",
      "title": "Lightstep / ServiceNow Cloud Observability & Related Topics",
      "leaves": [
        {
          "id": "lightstep-servicenow",
          "title": "Lightstep / ServiceNow Cloud Observability"
        },
        {
          "id": "solarwinds-observability",
          "title": "SolarWinds Observability"
        },
        {
          "id": "logicmonitor",
          "title": "LogicMonitor"
        },
        {
          "id": "sumo-logic",
          "title": "Sumo Logic"
        },
        {
          "id": "last9",
          "title": "Last9"
        },
        {
          "id": "chronosphere",
          "title": "Chronosphere"
        }
      ]
    },
    {
      "id": "commercial-observability--coralogix-related-topics",
      "title": "Coralogix & Related Topics",
      "leaves": [
        {
          "id": "coralogix",
          "title": "Coralogix"
        },
        {
          "id": "edge-delta",
          "title": "Edge Delta"
        },
        {
          "id": "better-stack",
          "title": "Better Stack (Better Uptime + Logs)"
        },
        {
          "id": "sentry-platform",
          "title": "Sentry (Errors & APM)"
        },
        {
          "id": "highlight-io",
          "title": "Highlight.io"
        },
        {
          "id": "signoz",
          "title": "SigNoz (Open-Source Alternative)"
        }
      ]
    },
    {
      "id": "commercial-observability--commercial-observability-comparison",
      "title": "Commercial Observability Comparison",
      "leaves": [
        {
          "id": "observability-platform-comparison",
          "title": "Commercial Observability Comparison"
        }
      ]
    }
  ],
  "log-management-fundamentals": [
    {
      "id": "log-management-fundamentals--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "logging-principles",
          "title": "Logging Principles"
        }
      ]
    },
    {
      "id": "log-levels",
      "title": "Log Levels",
      "leaves": [
        {
          "id": "level-trace",
          "title": "TRACE"
        },
        {
          "id": "level-debug",
          "title": "DEBUG"
        },
        {
          "id": "level-info",
          "title": "INFO"
        },
        {
          "id": "level-warn",
          "title": "WARN"
        },
        {
          "id": "level-error",
          "title": "ERROR"
        },
        {
          "id": "level-fatal",
          "title": "FATAL"
        }
      ]
    },
    {
      "id": "log-formats",
      "title": "Log Formats",
      "leaves": [
        {
          "id": "structured-json-logs",
          "title": "Structured (JSON) Logs"
        },
        {
          "id": "logfmt",
          "title": "logfmt"
        },
        {
          "id": "unstructured-logs",
          "title": "Unstructured Logs"
        },
        {
          "id": "common-event-format",
          "title": "CEF (Common Event Format)"
        },
        {
          "id": "cee-leef",
          "title": "CEE / LEEF"
        }
      ]
    },
    {
      "id": "log-management-fundamentals--log-sampling-related-topics",
      "title": "Log Sampling & Related Topics",
      "leaves": [
        {
          "id": "log-sampling",
          "title": "Log Sampling"
        },
        {
          "id": "log-retention",
          "title": "Log Retention"
        },
        {
          "id": "log-enrichment",
          "title": "Log Enrichment"
        },
        {
          "id": "log-correlation-ids",
          "title": "Correlation IDs & Trace IDs in Logs"
        },
        {
          "id": "centralized-logging",
          "title": "Centralized Logging"
        },
        {
          "id": "logging-pipeline-architecture",
          "title": "Logging Pipeline Architecture"
        }
      ]
    },
    {
      "id": "log-management-fundamentals--logging-in-containers-stdout-stderr-related-topi",
      "title": "Logging in Containers (stdout/stderr) & Related Topics",
      "leaves": [
        {
          "id": "logging-in-containers",
          "title": "Logging in Containers (stdout/stderr)"
        },
        {
          "id": "twelve-factor-logging",
          "title": "12-Factor App Logging"
        },
        {
          "id": "log-security-pii",
          "title": "Log Security & PII Redaction"
        },
        {
          "id": "log-sinks",
          "title": "Log Sinks & Routing"
        },
        {
          "id": "log-volume-estimation",
          "title": "Log Volume Estimation"
        },
        {
          "id": "log-cardinality",
          "title": "Log Cardinality"
        }
      ]
    },
    {
      "id": "log-management-fundamentals--log-indexing",
      "title": "Log Indexing",
      "leaves": [
        {
          "id": "log-indexing",
          "title": "Log Indexing"
        }
      ]
    },
    {
      "id": "log-storage-tiers",
      "title": "Hot / Warm / Cold Storage Tiers",
      "leaves": [
        {
          "id": "hot-tier-logs",
          "title": "Hot Tier"
        },
        {
          "id": "warm-tier-logs",
          "title": "Warm Tier"
        },
        {
          "id": "cold-tier-logs",
          "title": "Cold / Archive Tier"
        },
        {
          "id": "frozen-tier-logs",
          "title": "Frozen Tier (Searchable Snapshots)"
        }
      ]
    },
    {
      "id": "log-management-fundamentals--cost-optimization-for-logs-related-topics",
      "title": "Cost Optimization for Logs & Related Topics",
      "leaves": [
        {
          "id": "log-cost-optimization",
          "title": "Cost Optimization for Logs"
        },
        {
          "id": "log-shipping-protocols",
          "title": "Log Shipping Protocols (Syslog, GELF, etc.)"
        },
        {
          "id": "log-queries-vs-search",
          "title": "Log Queries vs Full-Text Search"
        }
      ]
    }
  ],
  "elk-efk-stack": [
    {
      "id": "elasticsearch",
      "title": "Elasticsearch",
      "leaves": [
        {
          "id": "es-architecture",
          "title": "Architecture & Cluster"
        },
        {
          "id": "es-indices-shards",
          "title": "Indices, Shards & Replicas"
        },
        {
          "id": "es-mapping",
          "title": "Mappings & Field Types"
        },
        {
          "id": "es-ilm",
          "title": "Index Lifecycle Management (ILM)"
        },
        {
          "id": "es-snapshots",
          "title": "Snapshots & Restore"
        },
        {
          "id": "es-search",
          "title": "Search & Query DSL"
        },
        {
          "id": "es-aggregations",
          "title": "Aggregations"
        },
        {
          "id": "es-cluster-sizing",
          "title": "Cluster Sizing"
        },
        {
          "id": "es-data-streams",
          "title": "Data Streams"
        },
        {
          "id": "es-ingest-pipelines",
          "title": "Ingest Pipelines"
        },
        {
          "id": "es-cross-cluster",
          "title": "Cross-Cluster Search & Replication"
        }
      ]
    },
    {
      "id": "logstash",
      "title": "Logstash",
      "leaves": [
        {
          "id": "logstash-pipelines",
          "title": "Pipelines"
        },
        {
          "id": "logstash-inputs",
          "title": "Inputs"
        },
        {
          "id": "logstash-filters",
          "title": "Filters"
        },
        {
          "id": "logstash-outputs",
          "title": "Outputs"
        },
        {
          "id": "logstash-codecs",
          "title": "Codecs"
        },
        {
          "id": "logstash-grok",
          "title": "Grok Parsing"
        },
        {
          "id": "logstash-dlq",
          "title": "Dead Letter Queue (DLQ)"
        }
      ]
    },
    {
      "id": "kibana",
      "title": "Kibana",
      "leaves": [
        {
          "id": "kibana-discover",
          "title": "Discover"
        },
        {
          "id": "kibana-dashboards",
          "title": "Dashboards"
        },
        {
          "id": "kibana-visualizations",
          "title": "Visualizations & Lens"
        },
        {
          "id": "kql",
          "title": "KQL (Kibana Query Language)"
        },
        {
          "id": "kibana-maps",
          "title": "Maps"
        },
        {
          "id": "kibana-canvas",
          "title": "Canvas"
        },
        {
          "id": "kibana-spaces",
          "title": "Spaces & RBAC"
        }
      ]
    },
    {
      "id": "elastic-beats",
      "title": "Beats",
      "leaves": [
        {
          "id": "filebeat",
          "title": "Filebeat"
        },
        {
          "id": "metricbeat",
          "title": "Metricbeat"
        },
        {
          "id": "auditbeat",
          "title": "Auditbeat"
        },
        {
          "id": "packetbeat",
          "title": "Packetbeat"
        },
        {
          "id": "heartbeat",
          "title": "Heartbeat"
        },
        {
          "id": "winlogbeat",
          "title": "Winlogbeat"
        }
      ]
    },
    {
      "id": "elk-efk-stack--efk-fluentd-instead-of-logstash-related-topics",
      "title": "EFK (Fluentd Instead of Logstash) & Related Topics",
      "leaves": [
        {
          "id": "efk-stack",
          "title": "EFK (Fluentd Instead of Logstash)"
        },
        {
          "id": "opensearch-fork",
          "title": "OpenSearch & OpenSearch Dashboards (Fork)"
        },
        {
          "id": "elastic-cloud",
          "title": "Elastic Cloud"
        },
        {
          "id": "opensearch-service-overview",
          "title": "OpenSearch Service (Overview)"
        },
        {
          "id": "elastic-agent",
          "title": "Elastic Agent (Integrations)"
        },
        {
          "id": "fleet-server",
          "title": "Fleet Server"
        }
      ]
    }
  ],
  "loki-modern-logging": [
    {
      "id": "grafana-loki",
      "title": "Grafana Loki",
      "leaves": [
        {
          "id": "loki-architecture",
          "title": "Architecture (Read / Write Paths)"
        },
        {
          "id": "logql",
          "title": "LogQL"
        },
        {
          "id": "loki-labels-cardinality",
          "title": "Labels & Cardinality"
        },
        {
          "id": "loki-storage-backends",
          "title": "Storage Backends (Object Stores)"
        },
        {
          "id": "loki-single-store",
          "title": "Single Store TSDB Layout"
        },
        {
          "id": "loki-microservices-mode",
          "title": "Microservices Mode"
        },
        {
          "id": "loki-ssd-mode",
          "title": "Simple Scalable Deployment (SSD) Mode"
        },
        {
          "id": "loki-monolithic-mode",
          "title": "Monolithic Mode"
        },
        {
          "id": "loki-operator",
          "title": "Loki Operator (Kubernetes)"
        },
        {
          "id": "loki-bloom-filters",
          "title": "Bloom Filters (Loki 3.x)"
        },
        {
          "id": "loki-promtail-legacy",
          "title": "Promtail (Legacy)"
        }
      ]
    },
    {
      "id": "loki-modern-logging--quickwit",
      "title": "Quickwit",
      "leaves": [
        {
          "id": "quickwit",
          "title": "Quickwit"
        }
      ]
    },
    {
      "id": "clickhouse-log-stacks",
      "title": "ClickHouse-Based Log Stacks",
      "leaves": [
        {
          "id": "clickhouse-for-logs",
          "title": "ClickHouse for Logs"
        },
        {
          "id": "signoz-logs",
          "title": "SigNoz"
        },
        {
          "id": "openobserve",
          "title": "OpenObserve"
        },
        {
          "id": "vector-clickhouse",
          "title": "Vector + ClickHouse"
        },
        {
          "id": "highlight-clickhouse",
          "title": "Highlight.io (ClickHouse)"
        }
      ]
    },
    {
      "id": "loki-modern-logging--victorialogs-related-topics",
      "title": "VictoriaLogs & Related Topics",
      "leaves": [
        {
          "id": "victorialogs",
          "title": "VictoriaLogs"
        },
        {
          "id": "parseable",
          "title": "Parseable"
        },
        {
          "id": "mezmo-logdna",
          "title": "Mezmo (LogDNA)"
        },
        {
          "id": "hyperdx",
          "title": "HyperDX"
        },
        {
          "id": "axiom-logs",
          "title": "Axiom"
        },
        {
          "id": "graylog",
          "title": "Graylog"
        }
      ]
    }
  ],
  "log-collectors": [
    {
      "id": "fluentd",
      "title": "Fluentd",
      "leaves": [
        {
          "id": "fluentd-plugins",
          "title": "Plugins"
        },
        {
          "id": "fluentd-routing",
          "title": "Routing"
        },
        {
          "id": "fluentd-buffering",
          "title": "Buffering & Reliability"
        },
        {
          "id": "fluentd-filters",
          "title": "Filters & Parsers"
        }
      ]
    },
    {
      "id": "fluent-bit",
      "title": "Fluent Bit",
      "leaves": [
        {
          "id": "fluent-bit-inputs",
          "title": "Inputs"
        },
        {
          "id": "fluent-bit-filters",
          "title": "Filters"
        },
        {
          "id": "fluent-bit-outputs",
          "title": "Outputs"
        },
        {
          "id": "fluent-bit-lua",
          "title": "Lua Scripting"
        },
        {
          "id": "fluent-bit-operator",
          "title": "Fluent Operator (Kubernetes)"
        }
      ]
    },
    {
      "id": "vector-datadog",
      "title": "Vector (Datadog)",
      "leaves": [
        {
          "id": "vrl",
          "title": "VRL (Vector Remap Language)"
        },
        {
          "id": "vector-sources",
          "title": "Sources"
        },
        {
          "id": "vector-transforms",
          "title": "Transforms"
        },
        {
          "id": "vector-sinks",
          "title": "Sinks"
        }
      ]
    },
    {
      "id": "log-collectors--filebeat-as-collector-related-topics",
      "title": "Filebeat (As Collector) & Related Topics",
      "leaves": [
        {
          "id": "filebeat-collector",
          "title": "Filebeat (As Collector)"
        },
        {
          "id": "logstash-collector",
          "title": "Logstash (As Collector)"
        },
        {
          "id": "otel-collector-logs",
          "title": "OpenTelemetry Collector for Logs"
        },
        {
          "id": "rsyslog-collector",
          "title": "Rsyslog"
        },
        {
          "id": "syslog-ng-collector",
          "title": "syslog-ng"
        },
        {
          "id": "promtail-loki-collector",
          "title": "Promtail (Loki Legacy)"
        }
      ]
    },
    {
      "id": "log-collectors--grafana-alloy-successor-to-promtail-grafana-agen",
      "title": "Grafana Alloy (Successor to Promtail / Grafana Agent) & Related Topics",
      "leaves": [
        {
          "id": "grafana-alloy",
          "title": "Grafana Alloy (Successor to Promtail / Grafana Agent)"
        },
        {
          "id": "cribl-stream",
          "title": "Cribl Stream / LogStream"
        },
        {
          "id": "nxlog",
          "title": "NXLog"
        },
        {
          "id": "collector-comparison",
          "title": "Fluentd vs Fluent Bit vs Vector vs OTel Collector"
        }
      ]
    }
  ],
  "tracing-fundamentals": [
    {
      "id": "tracing-fundamentals--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-distributed-tracing",
          "title": "What is Distributed Tracing?"
        }
      ]
    },
    {
      "id": "spans-and-traces",
      "title": "Spans & Traces",
      "leaves": [
        {
          "id": "span",
          "title": "Span"
        },
        {
          "id": "parent-child-span",
          "title": "Parent & Child Spans"
        },
        {
          "id": "span-attributes",
          "title": "Span Attributes"
        },
        {
          "id": "span-events",
          "title": "Span Events"
        },
        {
          "id": "span-links",
          "title": "Span Links"
        },
        {
          "id": "span-kinds",
          "title": "Span Kinds (Server, Client, Producer, Consumer, Internal)"
        },
        {
          "id": "span-status",
          "title": "Span Status & Errors"
        }
      ]
    },
    {
      "id": "tracing-fundamentals--trace-context-related-topics",
      "title": "Trace Context & Related Topics",
      "leaves": [
        {
          "id": "trace-context",
          "title": "Trace Context"
        },
        {
          "id": "baggage",
          "title": "Baggage"
        }
      ]
    },
    {
      "id": "context-propagation-formats",
      "title": "Context Propagation Formats",
      "leaves": [
        {
          "id": "tracecontext-w3c",
          "title": "W3C TraceContext"
        },
        {
          "id": "b3-format",
          "title": "B3 Single & Multi-Header"
        },
        {
          "id": "jaeger-format",
          "title": "Jaeger Propagation"
        },
        {
          "id": "aws-xray-format",
          "title": "AWS X-Ray Format"
        }
      ]
    },
    {
      "id": "tracing-sampling-strategies",
      "title": "Sampling Strategies (Tracing)",
      "leaves": [
        {
          "id": "head-sampling-tracing",
          "title": "Head-Based Sampling"
        },
        {
          "id": "tail-sampling-tracing",
          "title": "Tail-Based Sampling"
        },
        {
          "id": "probability-sampling-tracing",
          "title": "Probabilistic Sampling"
        },
        {
          "id": "rate-limited-sampling",
          "title": "Rate-Limited Sampling"
        },
        {
          "id": "adaptive-sampling",
          "title": "Adaptive Sampling"
        }
      ]
    },
    {
      "id": "tracing-fundamentals--trace-visualization-service-maps-related-topics",
      "title": "Trace Visualization & Service Maps & Related Topics",
      "leaves": [
        {
          "id": "trace-visualization",
          "title": "Trace Visualization & Service Maps"
        },
        {
          "id": "trace-analysis",
          "title": "Trace Analysis & Critical Path"
        },
        {
          "id": "trace-storage-tradeoffs",
          "title": "Trace Storage Tradeoffs"
        },
        {
          "id": "tracing-exemplars",
          "title": "Exemplars (Metrics → Traces)"
        },
        {
          "id": "logs-to-traces-correlation",
          "title": "Logs ↔ Traces Correlation"
        }
      ]
    },
    {
      "id": "continuous-profiling",
      "title": "Continuous Profiling",
      "leaves": [
        {
          "id": "pyroscope-profiler",
          "title": "Grafana Pyroscope"
        },
        {
          "id": "parca-profiler",
          "title": "Parca"
        },
        {
          "id": "ebpf-profilers",
          "title": "eBPF Profilers (Parca Agent, opentelemetry-ebpf-profiler)"
        },
        {
          "id": "datadog-continuous-profiler",
          "title": "Datadog Continuous Profiler"
        }
      ]
    }
  ],
  "jaeger": [
    {
      "id": "jaeger--jaeger-architecture",
      "title": "Jaeger Architecture",
      "leaves": [
        {
          "id": "jaeger-architecture",
          "title": "Jaeger Architecture"
        }
      ]
    },
    {
      "id": "jaeger-components",
      "title": "Jaeger Components",
      "leaves": [
        {
          "id": "jaeger-agent",
          "title": "Agent (Deprecated)"
        },
        {
          "id": "jaeger-collector",
          "title": "Collector"
        },
        {
          "id": "jaeger-query",
          "title": "Query Service"
        },
        {
          "id": "jaeger-ingester",
          "title": "Ingester"
        }
      ]
    },
    {
      "id": "jaeger-storage-backends",
      "title": "Storage Backends",
      "leaves": [
        {
          "id": "jaeger-cassandra",
          "title": "Cassandra"
        },
        {
          "id": "jaeger-elasticsearch",
          "title": "Elasticsearch / OpenSearch"
        },
        {
          "id": "jaeger-clickhouse",
          "title": "ClickHouse"
        },
        {
          "id": "jaeger-badger",
          "title": "Badger (Local)"
        },
        {
          "id": "jaeger-kafka-buffer",
          "title": "Kafka (Buffer)"
        }
      ]
    },
    {
      "id": "jaeger--jaeger-ui-related-topics",
      "title": "Jaeger UI & Related Topics",
      "leaves": [
        {
          "id": "jaeger-ui",
          "title": "Jaeger UI"
        },
        {
          "id": "jaeger-operator",
          "title": "Jaeger Operator"
        },
        {
          "id": "jaeger-sampling-config",
          "title": "Sampling Configuration"
        },
        {
          "id": "jaeger-v2",
          "title": "Jaeger v2 (OpenTelemetry-Based)"
        },
        {
          "id": "jaeger-spark-aggregation",
          "title": "Jaeger Spark Aggregation"
        },
        {
          "id": "jaeger-clients-libraries",
          "title": "Jaeger Clients & Libraries (Legacy)"
        }
      ]
    }
  ],
  "tempo-zipkin": [
    {
      "id": "grafana-tempo",
      "title": "Grafana Tempo",
      "leaves": [
        {
          "id": "tempo-architecture",
          "title": "Tempo Architecture"
        },
        {
          "id": "tempo-storage",
          "title": "Storage Backends (Object Storage)"
        },
        {
          "id": "traceql",
          "title": "TraceQL"
        },
        {
          "id": "tempo-operator",
          "title": "Tempo Operator"
        },
        {
          "id": "tempo-with-grafana",
          "title": "Tempo with Grafana"
        },
        {
          "id": "tempo-metrics-generator",
          "title": "Metrics Generator (Service Graphs, Span Metrics)"
        }
      ]
    },
    {
      "id": "zipkin",
      "title": "Zipkin",
      "leaves": [
        {
          "id": "zipkin-architecture",
          "title": "Zipkin Architecture"
        },
        {
          "id": "zipkin-storage",
          "title": "Storage Backends"
        },
        {
          "id": "zipkin-ui",
          "title": "Zipkin UI"
        },
        {
          "id": "zipkin-instrumentation",
          "title": "Zipkin Instrumentation"
        }
      ]
    },
    {
      "id": "tempo-zipkin--aws-x-ray-overview-related-topics",
      "title": "AWS X-Ray (Overview) & Related Topics",
      "leaves": [
        {
          "id": "aws-x-ray-overview",
          "title": "AWS X-Ray (Overview)"
        },
        {
          "id": "azure-application-insights-tracing",
          "title": "Azure Application Insights (Tracing)"
        },
        {
          "id": "google-cloud-trace",
          "title": "Google Cloud Trace"
        },
        {
          "id": "haystack-expedia",
          "title": "Haystack (Expedia)"
        },
        {
          "id": "skywalking-tracing",
          "title": "Apache SkyWalking"
        }
      ]
    }
  ],
  "apm-platforms": [
    {
      "id": "apm-platforms--appdynamics-cisco-related-topics",
      "title": "AppDynamics (Cisco) & Related Topics",
      "leaves": [
        {
          "id": "appdynamics-cisco",
          "title": "AppDynamics (Cisco)"
        },
        {
          "id": "instana-ibm",
          "title": "Instana (IBM)"
        },
        {
          "id": "elastic-apm-platform",
          "title": "Elastic APM"
        },
        {
          "id": "aws-xray-apm",
          "title": "AWS X-Ray (APM)"
        },
        {
          "id": "azure-app-insights-apm",
          "title": "Azure Application Insights"
        },
        {
          "id": "google-cloud-profiler-apm",
          "title": "Google Cloud Profiler & Trace"
        }
      ]
    },
    {
      "id": "apm-platforms--sentry-apm-related-topics",
      "title": "Sentry APM & Related Topics",
      "leaves": [
        {
          "id": "sentry-apm",
          "title": "Sentry APM"
        },
        {
          "id": "datadog-apm-mention",
          "title": "Datadog APM (Cross-Reference)"
        },
        {
          "id": "newrelic-apm-mention",
          "title": "New Relic APM (Cross-Reference)"
        },
        {
          "id": "dynatrace-apm-mention",
          "title": "Dynatrace APM (Cross-Reference)"
        },
        {
          "id": "splunk-apm-mention",
          "title": "Splunk APM (Cross-Reference)"
        },
        {
          "id": "solarwinds-apm",
          "title": "SolarWinds APM"
        }
      ]
    },
    {
      "id": "apm-platforms--logicmonitor-apm-related-topics",
      "title": "LogicMonitor APM & Related Topics",
      "leaves": [
        {
          "id": "logicmonitor-apm",
          "title": "LogicMonitor APM"
        },
        {
          "id": "otel-based-apm",
          "title": "OpenTelemetry-Based APM"
        },
        {
          "id": "signoz-apm",
          "title": "SigNoz APM (Open Source)"
        },
        {
          "id": "apm-comparison",
          "title": "APM Platforms Comparison"
        }
      ]
    }
  ],
  "sre-principles": [
    {
      "id": "sre-principles--essential-reading-references",
      "title": "Essential Reading & References",
      "leaves": [
        {
          "id": "sre-origins-google-book",
          "title": "Origins & The Google SRE Book"
        },
        {
          "id": "sre-workbook",
          "title": "The SRE Workbook"
        },
        {
          "id": "sre-vs-devops",
          "title": "SRE vs DevOps"
        }
      ]
    },
    {
      "id": "sre-team-models",
      "title": "SRE Team Models",
      "leaves": [
        {
          "id": "embedded-sre",
          "title": "Embedded SRE"
        },
        {
          "id": "centralized-sre",
          "title": "Centralized SRE"
        },
        {
          "id": "consulting-sre",
          "title": "Consulting SRE"
        },
        {
          "id": "tools-sre",
          "title": "Tools / Platform SRE"
        }
      ]
    },
    {
      "id": "sre-principles--production-engineer-role-related-topics",
      "title": "Production Engineer Role & Related Topics",
      "leaves": [
        {
          "id": "production-engineer-role",
          "title": "Production Engineer Role"
        },
        {
          "id": "risk-reliability-balance",
          "title": "Risk vs Reliability Balance"
        },
        {
          "id": "reducing-org-silos",
          "title": "Reducing Organizational Silos"
        },
        {
          "id": "acceptance-of-failure",
          "title": "Acceptance of Failure"
        },
        {
          "id": "gradual-changes",
          "title": "Implementing Gradual Changes"
        },
        {
          "id": "tooling-automation-sre",
          "title": "Tooling & Automation Principles"
        }
      ]
    },
    {
      "id": "sre-principles--measuring-everything-related-topics",
      "title": "Measuring Everything & Related Topics",
      "leaves": [
        {
          "id": "measuring-everything",
          "title": "Measuring Everything"
        },
        {
          "id": "building-sre-teams",
          "title": "Building & Hiring SRE Teams"
        },
        {
          "id": "sre-maturity-model",
          "title": "SRE Maturity Model"
        },
        {
          "id": "sre-roi",
          "title": "SRE Business Value & ROI"
        }
      ]
    }
  ],
  "sli-slo-sla": [
    {
      "id": "sli-slo-sla--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "sli-definition",
          "title": "SLI (Service Level Indicator)"
        },
        {
          "id": "slo-definition",
          "title": "SLO (Service Level Objective)"
        },
        {
          "id": "sla-definition",
          "title": "SLA (Service Level Agreement)"
        },
        {
          "id": "choosing-good-slis",
          "title": "Choosing Good SLIs"
        }
      ]
    },
    {
      "id": "sli-types",
      "title": "SLI Types",
      "leaves": [
        {
          "id": "latency-slis",
          "title": "Latency SLIs"
        },
        {
          "id": "availability-slis",
          "title": "Availability SLIs"
        },
        {
          "id": "throughput-slis",
          "title": "Throughput SLIs"
        },
        {
          "id": "correctness-slis",
          "title": "Correctness / Quality SLIs"
        },
        {
          "id": "freshness-slis",
          "title": "Freshness SLIs"
        },
        {
          "id": "coverage-slis",
          "title": "Coverage SLIs"
        }
      ]
    },
    {
      "id": "slo-targets",
      "title": "SLO Targets (Nines)",
      "leaves": [
        {
          "id": "slo-90-99",
          "title": "90% / 99%"
        },
        {
          "id": "slo-999",
          "title": "99.9% (Three Nines)"
        },
        {
          "id": "slo-9999",
          "title": "99.99% (Four Nines)"
        },
        {
          "id": "slo-99999",
          "title": "99.999% (Five Nines)"
        }
      ]
    },
    {
      "id": "sli-slo-sla--rolling-vs-calendar-slo-windows-related-topics",
      "title": "Rolling vs Calendar SLO Windows & Related Topics",
      "leaves": [
        {
          "id": "slo-time-windows",
          "title": "Rolling vs Calendar SLO Windows"
        },
        {
          "id": "multi-window-burn-rate-alerts",
          "title": "Multi-Window Multi-Burn-Rate Alerts"
        },
        {
          "id": "user-journeys-slos",
          "title": "User Journeys & SLOs"
        },
        {
          "id": "slo-calculator",
          "title": "SLO Calculators"
        }
      ]
    },
    {
      "id": "slo-tools",
      "title": "SLO Tooling",
      "leaves": [
        {
          "id": "sloth-slo",
          "title": "Sloth (PromQL → SLOs)"
        },
        {
          "id": "pyrra-slo",
          "title": "Pyrra"
        },
        {
          "id": "openslo-spec",
          "title": "OpenSLO Specification"
        },
        {
          "id": "nobl9",
          "title": "Nobl9"
        },
        {
          "id": "datadog-slos",
          "title": "Datadog SLOs"
        },
        {
          "id": "grafana-slo",
          "title": "Grafana SLO"
        },
        {
          "id": "dynatrace-slo",
          "title": "Dynatrace SLO"
        }
      ]
    },
    {
      "id": "sli-slo-sla--sla-penalties-contracts",
      "title": "SLA Penalties & Contracts",
      "leaves": [
        {
          "id": "sla-penalties",
          "title": "SLA Penalties & Contracts"
        }
      ]
    }
  ],
  "error-budgets": [
    {
      "id": "error-budgets--error-budget-definition-related-topics",
      "title": "Error Budget Definition & Related Topics",
      "leaves": [
        {
          "id": "error-budget-definition",
          "title": "Error Budget Definition"
        },
        {
          "id": "calculating-error-budgets",
          "title": "Calculating Error Budgets"
        },
        {
          "id": "error-budget-policy",
          "title": "Error Budget Policy"
        },
        {
          "id": "burn-rate-calculation",
          "title": "Burn Rate Calculation"
        },
        {
          "id": "multi-burn-rate-alerting",
          "title": "Multi-Burn-Rate Alerting"
        },
        {
          "id": "error-budget-exhaustion",
          "title": "Error Budget Exhaustion"
        }
      ]
    },
    {
      "id": "error-budgets--action-on-budget-burn-related-topics",
      "title": "Action on Budget Burn & Related Topics",
      "leaves": [
        {
          "id": "action-on-budget-burn",
          "title": "Action on Budget Burn"
        },
        {
          "id": "error-budget-freeze",
          "title": "Error Budget Freeze"
        },
        {
          "id": "error-budget-metrics",
          "title": "Error Budget Metrics & Reporting"
        },
        {
          "id": "budget-vs-feature-velocity",
          "title": "Error Budget vs Feature Velocity"
        },
        {
          "id": "error-budget-by-tier",
          "title": "Per-Tier Error Budgets"
        }
      ]
    }
  ],
  "toil-automation": [
    {
      "id": "toil-automation--defining-toil-related-topics",
      "title": "Defining Toil & Related Topics",
      "leaves": [
        {
          "id": "defining-toil",
          "title": "Defining Toil"
        },
        {
          "id": "measuring-toil",
          "title": "Measuring Toil"
        },
        {
          "id": "toil-budgets",
          "title": "Toil Budgets (50% Cap)"
        },
        {
          "id": "reducing-toil-automation",
          "title": "Reducing Toil via Automation"
        },
        {
          "id": "operational-work-classification",
          "title": "Operational Work Classification"
        },
        {
          "id": "eliminating-manual-processes",
          "title": "Eliminating Manual Processes"
        }
      ]
    },
    {
      "id": "toil-automation--runbook-automation-rundeck-etc-related-topics",
      "title": "Runbook Automation (Rundeck, etc.) & Related Topics",
      "leaves": [
        {
          "id": "runbook-automation-sre",
          "title": "Runbook Automation (Rundeck, etc.)"
        },
        {
          "id": "self-healing-systems",
          "title": "Self-Healing Systems"
        },
        {
          "id": "chatops-toil",
          "title": "ChatOps (Slack, Mattermost)"
        },
        {
          "id": "automation-strategies",
          "title": "Automation Strategies"
        },
        {
          "id": "toil-anti-patterns",
          "title": "Toil Anti-Patterns"
        },
        {
          "id": "cognitive-load-reduction",
          "title": "Cognitive Load Reduction"
        }
      ]
    },
    {
      "id": "toil-automation--toolchains-for-toil-reduction",
      "title": "Toolchains for Toil Reduction",
      "leaves": [
        {
          "id": "toolchains-toil",
          "title": "Toolchains for Toil Reduction"
        }
      ]
    }
  ],
  "capacity-planning": [
    {
      "id": "capacity-planning--demand-forecasting-related-topics",
      "title": "Demand Forecasting & Related Topics",
      "leaves": [
        {
          "id": "demand-forecasting",
          "title": "Demand Forecasting"
        },
        {
          "id": "capacity-modeling",
          "title": "Capacity Modeling"
        },
        {
          "id": "headroom-safety-margins",
          "title": "Headroom & Safety Margins"
        },
        {
          "id": "scaling-planning",
          "title": "Vertical vs Horizontal Scaling Planning"
        }
      ]
    },
    {
      "id": "load-testing-types",
      "title": "Load Testing Types",
      "leaves": [
        {
          "id": "load-testing",
          "title": "Load Testing"
        },
        {
          "id": "stress-testing",
          "title": "Stress Testing"
        },
        {
          "id": "soak-endurance-testing",
          "title": "Soak / Endurance Testing"
        },
        {
          "id": "spike-testing",
          "title": "Spike Testing"
        },
        {
          "id": "breakpoint-testing",
          "title": "Breakpoint Testing"
        }
      ]
    },
    {
      "id": "capacity-planning--performance-benchmarks-related-topics",
      "title": "Performance Benchmarks & Related Topics",
      "leaves": [
        {
          "id": "performance-benchmarks",
          "title": "Performance Benchmarks"
        },
        {
          "id": "capacity-dashboards",
          "title": "Capacity Dashboards"
        },
        {
          "id": "multi-region-capacity",
          "title": "Multi-Region Capacity"
        },
        {
          "id": "cloud-quota-management",
          "title": "Cloud Quota Management"
        },
        {
          "id": "cost-aware-capacity",
          "title": "Cost-Aware Capacity Planning"
        },
        {
          "id": "predictive-autoscaling",
          "title": "Predictive Autoscaling"
        }
      ]
    },
    {
      "id": "capacity-planning--capacity-planning-for-kubernetes",
      "title": "Capacity Planning for Kubernetes",
      "leaves": [
        {
          "id": "capacity-planning-k8s",
          "title": "Capacity Planning for Kubernetes"
        }
      ]
    },
    {
      "id": "load-test-tools",
      "title": "Load Testing Tools",
      "leaves": [
        {
          "id": "k6-load",
          "title": "Grafana k6"
        },
        {
          "id": "jmeter-load",
          "title": "Apache JMeter"
        },
        {
          "id": "gatling-load",
          "title": "Gatling"
        },
        {
          "id": "locust-load",
          "title": "Locust"
        },
        {
          "id": "vegeta-load",
          "title": "Vegeta"
        },
        {
          "id": "tsung-load",
          "title": "Tsung"
        },
        {
          "id": "wrk-wrk2",
          "title": "wrk / wrk2"
        },
        {
          "id": "hey-load",
          "title": "hey"
        },
        {
          "id": "siege-load",
          "title": "Siege"
        }
      ]
    }
  ],
  "incident-response": [
    {
      "id": "incident-response--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "incident-definitions",
          "title": "Incident Definitions"
        }
      ]
    },
    {
      "id": "severity-levels",
      "title": "Severity Levels",
      "leaves": [
        {
          "id": "sev1",
          "title": "SEV1 (Critical)"
        },
        {
          "id": "sev2",
          "title": "SEV2 (High)"
        },
        {
          "id": "sev3",
          "title": "SEV3 (Medium)"
        },
        {
          "id": "sev4",
          "title": "SEV4 (Low)"
        }
      ]
    },
    {
      "id": "incident-command-system",
      "title": "Incident Command System (ICS)",
      "leaves": [
        {
          "id": "incident-commander",
          "title": "Incident Commander"
        },
        {
          "id": "comms-lead",
          "title": "Communications Lead"
        },
        {
          "id": "operations-lead",
          "title": "Operations Lead"
        },
        {
          "id": "scribe-role",
          "title": "Scribe"
        },
        {
          "id": "subject-matter-expert",
          "title": "Subject Matter Expert (SME)"
        }
      ]
    },
    {
      "id": "incident-lifecycle",
      "title": "Incident Lifecycle",
      "leaves": [
        {
          "id": "detect-phase",
          "title": "Detect"
        },
        {
          "id": "triage-phase",
          "title": "Triage"
        },
        {
          "id": "mitigate-phase",
          "title": "Mitigate"
        },
        {
          "id": "resolve-phase",
          "title": "Resolve"
        },
        {
          "id": "review-phase",
          "title": "Review"
        }
      ]
    },
    {
      "id": "incident-response--major-incident-management-related-topics",
      "title": "Major Incident Management & Related Topics",
      "leaves": [
        {
          "id": "major-incident-management",
          "title": "Major Incident Management"
        },
        {
          "id": "incident-timeline-tracking",
          "title": "Incident Timeline Tracking"
        },
        {
          "id": "stakeholder-comms",
          "title": "Stakeholder Communication"
        },
        {
          "id": "customer-comms-incident",
          "title": "Customer Communications"
        },
        {
          "id": "status-updates-cadence",
          "title": "Status Update Cadence"
        },
        {
          "id": "war-room-virtual-response",
          "title": "War Room vs Virtual Response"
        }
      ]
    },
    {
      "id": "incident-response--incident-tooling-slack-zoom-bridges-related-topi",
      "title": "Incident Tooling (Slack, Zoom, Bridges) & Related Topics",
      "leaves": [
        {
          "id": "incident-tooling",
          "title": "Incident Tooling (Slack, Zoom, Bridges)"
        },
        {
          "id": "chatops-incidents",
          "title": "ChatOps for Incidents"
        }
      ]
    },
    {
      "id": "incident-metrics",
      "title": "Incident Metrics",
      "leaves": [
        {
          "id": "mtta-metric",
          "title": "MTTA"
        },
        {
          "id": "mttd-metric",
          "title": "MTTD"
        },
        {
          "id": "mttr-metric",
          "title": "MTTR"
        },
        {
          "id": "mtbf-metric",
          "title": "MTBF"
        }
      ]
    },
    {
      "id": "incident-response--continuous-improvement-after-incidents-related-t",
      "title": "Continuous Improvement After Incidents & Related Topics",
      "leaves": [
        {
          "id": "continuous-improvement-incidents",
          "title": "Continuous Improvement After Incidents"
        },
        {
          "id": "itil-incident-mgmt",
          "title": "ITIL Incident Management (Overview)"
        },
        {
          "id": "game-days-incident",
          "title": "Game Days"
        },
        {
          "id": "incident-playbooks",
          "title": "Incident Playbooks"
        },
        {
          "id": "dr-vs-incident",
          "title": "Disaster Recovery vs Incident"
        }
      ]
    }
  ],
  "on-call-practices": [
    {
      "id": "on-call-rotation-patterns",
      "title": "On-Call Rotation Patterns",
      "leaves": [
        {
          "id": "follow-the-sun",
          "title": "Follow-the-Sun"
        },
        {
          "id": "weekly-rotation",
          "title": "Weekly Rotation"
        },
        {
          "id": "daily-rotation",
          "title": "Daily Rotation"
        },
        {
          "id": "split-shift-rotation",
          "title": "Split Shift Rotation"
        }
      ]
    },
    {
      "id": "on-call-practices--primary-vs-secondary-on-call-related-topics",
      "title": "Primary vs Secondary On-Call & Related Topics",
      "leaves": [
        {
          "id": "primary-secondary-oncall",
          "title": "Primary vs Secondary On-Call"
        },
        {
          "id": "escalation-policies",
          "title": "Escalation Policies"
        },
        {
          "id": "handoff-practices",
          "title": "Handoff Practices"
        },
        {
          "id": "humane-on-call",
          "title": "Humane On-Call (Sleep, Hours)"
        },
        {
          "id": "on-call-compensation",
          "title": "On-Call Compensation"
        },
        {
          "id": "on-call-burnout",
          "title": "On-Call Burnout"
        }
      ]
    },
    {
      "id": "on-call-practices--on-call-onboarding-training-related-topics",
      "title": "On-Call Onboarding & Training & Related Topics",
      "leaves": [
        {
          "id": "on-call-onboarding",
          "title": "On-Call Onboarding & Training"
        },
        {
          "id": "on-call-runbooks",
          "title": "Runbooks for On-Callers"
        },
        {
          "id": "oncall-tooling",
          "title": "Tooling for On-Call"
        },
        {
          "id": "alert-fatigue",
          "title": "Alert Fatigue"
        },
        {
          "id": "quiet-hours-muting",
          "title": "Quiet Hours & Mute Timings"
        },
        {
          "id": "distributed-on-call",
          "title": "Geographically Distributed On-Call"
        }
      ]
    },
    {
      "id": "on-call-practices--delivery-flow-metrics",
      "title": "Delivery & Flow Metrics",
      "leaves": [
        {
          "id": "boring-oncall-goal",
          "title": "“Boring” On-Call Goal"
        },
        {
          "id": "on-call-health-metrics",
          "title": "On-Call Health Metrics"
        }
      ]
    }
  ],
  "alerting-tools": [
    {
      "id": "commercial-alerting-platforms",
      "title": "Commercial Alerting Platforms",
      "leaves": [
        {
          "id": "pagerduty",
          "title": "PagerDuty"
        },
        {
          "id": "opsgenie",
          "title": "Atlassian Opsgenie"
        },
        {
          "id": "splunk-oncall",
          "title": "Splunk On-Call (VictorOps)"
        },
        {
          "id": "xmatters",
          "title": "xMatters"
        },
        {
          "id": "squadcast",
          "title": "Squadcast"
        },
        {
          "id": "incident-io",
          "title": "incident.io"
        },
        {
          "id": "rootly",
          "title": "Rootly"
        },
        {
          "id": "firehydrant",
          "title": "FireHydrant"
        },
        {
          "id": "better-stack-incident",
          "title": "Better Stack Incident"
        },
        {
          "id": "pingdom-alerts",
          "title": "Pingdom"
        },
        {
          "id": "newrelic-alerts",
          "title": "New Relic AlertOps"
        },
        {
          "id": "datadog-incident-mgmt",
          "title": "Datadog Incident Management"
        }
      ]
    },
    {
      "id": "open-source-alerting",
      "title": "Open-Source Alerting",
      "leaves": [
        {
          "id": "grafana-oncall-alert",
          "title": "Grafana OnCall"
        },
        {
          "id": "alerta-tool",
          "title": "Alerta"
        },
        {
          "id": "karma-tool",
          "title": "Karma"
        },
        {
          "id": "oncall-app-linkedin",
          "title": "Oncall (LinkedIn)"
        }
      ]
    },
    {
      "id": "notification-channels",
      "title": "Notification Channels",
      "leaves": [
        {
          "id": "slack-notifications",
          "title": "Slack"
        },
        {
          "id": "teams-notifications",
          "title": "Microsoft Teams"
        },
        {
          "id": "webhook-notifications",
          "title": "Webhooks"
        },
        {
          "id": "sms-voice-notifications",
          "title": "SMS & Voice"
        },
        {
          "id": "mobile-push-notifications",
          "title": "Mobile Push"
        },
        {
          "id": "email-notifications",
          "title": "Email"
        }
      ]
    },
    {
      "id": "alerting-tools--alert-routing-related-topics",
      "title": "Alert Routing & Related Topics",
      "leaves": [
        {
          "id": "alert-routing",
          "title": "Alert Routing"
        },
        {
          "id": "on-call-schedules",
          "title": "On-Call Schedules"
        },
        {
          "id": "escalation-policies-tools",
          "title": "Escalation Policies (Tools)"
        },
        {
          "id": "alert-deduplication",
          "title": "Alert Deduplication"
        },
        {
          "id": "alert-correlation",
          "title": "Alert Correlation"
        },
        {
          "id": "aiops-alert-reduction",
          "title": "AIOps for Alert Noise Reduction"
        }
      ]
    }
  ],
  "postmortems": [
    {
      "id": "postmortems--postmortem-definition-related-topics",
      "title": "Postmortem Definition & Related Topics",
      "leaves": [
        {
          "id": "postmortem-definition",
          "title": "Postmortem Definition"
        },
        {
          "id": "blameless-postmortem",
          "title": "Blameless Postmortem"
        },
        {
          "id": "postmortem-template",
          "title": "Postmortem Template"
        }
      ]
    },
    {
      "id": "rca-methods",
      "title": "Root Cause Analysis Methods",
      "leaves": [
        {
          "id": "five-whys",
          "title": "Five Whys"
        },
        {
          "id": "fishbone-ishikawa",
          "title": "Fishbone (Ishikawa) Diagram"
        },
        {
          "id": "cast-method",
          "title": "CAST (Causal Analysis Systems Theory)"
        },
        {
          "id": "fault-tree-analysis",
          "title": "Fault Tree Analysis"
        }
      ]
    },
    {
      "id": "postmortems--contributing-factors-related-topics",
      "title": "Contributing Factors & Related Topics",
      "leaves": [
        {
          "id": "contributing-factors",
          "title": "Contributing Factors"
        },
        {
          "id": "action-items-followups",
          "title": "Action Items & Follow-Ups"
        },
        {
          "id": "lessons-learned-database",
          "title": "Lessons Learned Database"
        },
        {
          "id": "postmortem-facilitation",
          "title": "Postmortem Facilitation"
        },
        {
          "id": "postmortem-review-meetings",
          "title": "Postmortem Review Meetings"
        },
        {
          "id": "public-postmortems",
          "title": "Public Postmortems"
        }
      ]
    },
    {
      "id": "postmortems--howie-methodology-jeli-pagerduty-related-topics",
      "title": "Howie Methodology (Jeli / PagerDuty) & Related Topics",
      "leaves": [
        {
          "id": "howie-methodology",
          "title": "Howie Methodology (Jeli / PagerDuty)"
        },
        {
          "id": "etto-principle",
          "title": "ETTO Principle (Hollnagel)"
        },
        {
          "id": "just-culture",
          "title": "Just Culture"
        },
        {
          "id": "learning-reviews-vs-rca",
          "title": "Learning Reviews vs RCA"
        },
        {
          "id": "incident-analysis-tools",
          "title": "Incident Analysis Tools (Jeli, etc.)"
        }
      ]
    }
  ],
  "status-pages": [
    {
      "id": "status-pages--public-status-pages-related-topics",
      "title": "Public Status Pages & Related Topics",
      "leaves": [
        {
          "id": "public-status-pages",
          "title": "Public Status Pages"
        },
        {
          "id": "internal-status-pages",
          "title": "Internal Status Pages"
        },
        {
          "id": "component-level-status",
          "title": "Component-Level Status"
        },
        {
          "id": "subscription-notifications-status",
          "title": "Subscription Notifications"
        }
      ]
    },
    {
      "id": "status-page-platforms",
      "title": "Status Page Platforms",
      "leaves": [
        {
          "id": "atlassian-statuspage",
          "title": "Atlassian Statuspage"
        },
        {
          "id": "better-stack-status",
          "title": "Better Stack Status"
        },
        {
          "id": "instatus",
          "title": "Instatus"
        },
        {
          "id": "statusgator",
          "title": "StatusGator"
        },
        {
          "id": "statuscake",
          "title": "StatusCake"
        },
        {
          "id": "cachet-oss",
          "title": "Cachet (Open Source)"
        },
        {
          "id": "gatus",
          "title": "Gatus (Open Source)"
        },
        {
          "id": "uptime-kuma",
          "title": "Uptime Kuma"
        },
        {
          "id": "hund",
          "title": "Hund"
        },
        {
          "id": "freshstatus",
          "title": "Freshstatus"
        }
      ]
    },
    {
      "id": "status-pages--status-page-automation-related-topics",
      "title": "Status Page Automation & Related Topics",
      "leaves": [
        {
          "id": "status-page-automation",
          "title": "Status Page Automation"
        },
        {
          "id": "maintenance-windows",
          "title": "Maintenance Windows"
        },
        {
          "id": "incident-comms-best-practices",
          "title": "Incident Communication Best Practices"
        },
        {
          "id": "isitdown-downdetector",
          "title": "IsItDown & DownDetector"
        }
      ]
    }
  ],
  "chaos-engineering-principles": [
    {
      "id": "chaos-engineering-principles--principles-of-chaos-engineering-related-topics",
      "title": "Principles of Chaos Engineering & Related Topics",
      "leaves": [
        {
          "id": "principles-of-chaos-org",
          "title": "Principles of Chaos Engineering"
        },
        {
          "id": "hypothesis-driven-experiments",
          "title": "Hypothesis-Driven Experiments"
        },
        {
          "id": "steady-state-behavior",
          "title": "Steady State Behavior"
        },
        {
          "id": "blast-radius",
          "title": "Blast Radius"
        },
        {
          "id": "game-days-chaos",
          "title": "Game Days"
        },
        {
          "id": "production-vs-staging-chaos",
          "title": "Production vs Staging Chaos"
        }
      ]
    },
    {
      "id": "chaos-engineering-principles--chaos-as-continuous-practice-related-topics",
      "title": "Chaos as Continuous Practice & Related Topics",
      "leaves": [
        {
          "id": "chaos-as-continuous-practice",
          "title": "Chaos as Continuous Practice"
        },
        {
          "id": "resilience-testing-strategies",
          "title": "Resilience Testing Strategies"
        },
        {
          "id": "failure-injection-scope",
          "title": "Failure Injection Scope"
        },
        {
          "id": "observability-for-chaos",
          "title": "Observability for Chaos Experiments"
        },
        {
          "id": "chaos-maturity-model",
          "title": "Chaos Maturity Model"
        },
        {
          "id": "netflix-simian-army",
          "title": "Netflix Simian Army (Historical)"
        }
      ]
    },
    {
      "id": "chaos-engineering-principles--core-linux-systems",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "chaos-engineering-and-sre",
          "title": "Chaos Engineering & SRE"
        },
        {
          "id": "chaos-experiment-design",
          "title": "Chaos Experiment Design Process"
        }
      ]
    }
  ],
  "chaos-engineering-tools": [
    {
      "id": "chaos-engineering-tools--chaos-mesh-cncf-related-topics",
      "title": "Chaos Mesh (CNCF) & Related Topics",
      "leaves": [
        {
          "id": "chaos-mesh",
          "title": "Chaos Mesh (CNCF)"
        },
        {
          "id": "litmuschaos",
          "title": "LitmusChaos (CNCF)"
        },
        {
          "id": "chaos-toolkit",
          "title": "Chaos Toolkit"
        },
        {
          "id": "gremlin",
          "title": "Gremlin (Commercial)"
        },
        {
          "id": "aws-fis",
          "title": "AWS Fault Injection Service (FIS)"
        },
        {
          "id": "azure-chaos-studio",
          "title": "Azure Chaos Studio"
        }
      ]
    },
    {
      "id": "chaos-engineering-tools--steadybit-related-topics",
      "title": "Steadybit & Related Topics",
      "leaves": [
        {
          "id": "steadybit",
          "title": "Steadybit"
        },
        {
          "id": "chaosnative",
          "title": "Harness Chaos (formerly ChaosNative)"
        },
        {
          "id": "pumba",
          "title": "Pumba (Docker Chaos)"
        },
        {
          "id": "chaos-monkey-legacy",
          "title": "Chaos Monkey (Legacy)"
        },
        {
          "id": "powerfulseal",
          "title": "PowerfulSeal"
        },
        {
          "id": "toxiproxy",
          "title": "Toxiproxy"
        }
      ]
    },
    {
      "id": "chaos-engineering-tools--kraken-red-hat-related-topics",
      "title": "Kraken (Red Hat) & Related Topics",
      "leaves": [
        {
          "id": "kraken-chaos",
          "title": "Kraken (Red Hat)"
        },
        {
          "id": "reliably-tool",
          "title": "Reliably"
        }
      ]
    }
  ],
  "resilience-patterns": [
    {
      "id": "resilience-patterns--retries-with-exponential-backoff-jitter-related-",
      "title": "Retries with Exponential Backoff & Jitter & Related Topics",
      "leaves": [
        {
          "id": "retries-with-backoff",
          "title": "Retries with Exponential Backoff & Jitter"
        },
        {
          "id": "circuit-breakers",
          "title": "Circuit Breakers"
        },
        {
          "id": "bulkheads",
          "title": "Bulkheads"
        },
        {
          "id": "timeouts",
          "title": "Timeouts"
        },
        {
          "id": "fallbacks",
          "title": "Fallbacks"
        },
        {
          "id": "throttling-rate-limiting",
          "title": "Throttling & Rate Limiting"
        }
      ]
    },
    {
      "id": "resilience-patterns--load-shedding-related-topics",
      "title": "Load Shedding & Related Topics",
      "leaves": [
        {
          "id": "load-shedding",
          "title": "Load Shedding"
        },
        {
          "id": "backpressure",
          "title": "Backpressure"
        },
        {
          "id": "idempotency-patterns",
          "title": "Idempotency Patterns"
        },
        {
          "id": "cell-based-architecture",
          "title": "Cell-Based Architecture"
        },
        {
          "id": "shuffle-sharding",
          "title": "Shuffle Sharding"
        }
      ]
    },
    {
      "id": "ha-topologies",
      "title": "High-Availability Topologies",
      "leaves": [
        {
          "id": "active-active",
          "title": "Active-Active"
        },
        {
          "id": "active-passive",
          "title": "Active-Passive"
        },
        {
          "id": "multi-region-failover",
          "title": "Multi-Region Failover"
        }
      ]
    },
    {
      "id": "resilience-patterns--graceful-degradation-related-topics",
      "title": "Graceful Degradation & Related Topics",
      "leaves": [
        {
          "id": "graceful-degradation",
          "title": "Graceful Degradation"
        },
        {
          "id": "self-healing-pattern",
          "title": "Self-Healing"
        }
      ]
    },
    {
      "id": "disaster-recovery-strategies",
      "title": "Disaster Recovery Strategies",
      "leaves": [
        {
          "id": "rto-rpo",
          "title": "RTO & RPO"
        },
        {
          "id": "backup-restore-dr",
          "title": "Backup & Restore"
        },
        {
          "id": "pilot-light-dr",
          "title": "Pilot Light"
        },
        {
          "id": "warm-standby-dr",
          "title": "Warm Standby"
        },
        {
          "id": "multi-site-active-dr",
          "title": "Multi-Site Active-Active"
        }
      ]
    },
    {
      "id": "resilience-libraries",
      "title": "Resilience Libraries",
      "leaves": [
        {
          "id": "resilience4j",
          "title": "Resilience4j (Java)"
        },
        {
          "id": "polly-dotnet",
          "title": "Polly (.NET)"
        },
        {
          "id": "hystrix-legacy",
          "title": "Hystrix (Deprecated)"
        },
        {
          "id": "failsafe-java",
          "title": "Failsafe"
        },
        {
          "id": "opossum-node",
          "title": "Opossum (Node.js)"
        }
      ]
    }
  ],
  "devsecops-fundamentals": [
    {
      "id": "devsecops-fundamentals--what-is-devsecops-related-topics",
      "title": "What is DevSecOps? & Related Topics",
      "leaves": [
        {
          "id": "what-is-devsecops",
          "title": "What is DevSecOps?"
        },
        {
          "id": "shift-left-security",
          "title": "Shift-Left Security"
        },
        {
          "id": "shift-right-security",
          "title": "Shift-Right Security"
        },
        {
          "id": "security-gates-pipelines",
          "title": "Security Gates in Pipelines"
        }
      ]
    },
    {
      "id": "threat-modeling",
      "title": "Threat Modeling",
      "leaves": [
        {
          "id": "stride",
          "title": "STRIDE"
        },
        {
          "id": "pasta-threat",
          "title": "PASTA"
        },
        {
          "id": "linddun",
          "title": "LINDDUN"
        },
        {
          "id": "vast-threat",
          "title": "VAST"
        },
        {
          "id": "attack-trees",
          "title": "Attack Trees"
        },
        {
          "id": "threat-dragon",
          "title": "OWASP Threat Dragon"
        }
      ]
    },
    {
      "id": "devsecops-fundamentals--owasp-top-10-related-topics",
      "title": "OWASP Top 10 & Related Topics",
      "leaves": [
        {
          "id": "owasp-top-10",
          "title": "OWASP Top 10"
        },
        {
          "id": "owasp-asvs",
          "title": "OWASP ASVS"
        },
        {
          "id": "owasp-devsecops-maturity",
          "title": "OWASP DevSecOps Maturity Model"
        },
        {
          "id": "devsecops-culture",
          "title": "DevSecOps Culture"
        },
        {
          "id": "security-champions",
          "title": "Security Champions Program"
        },
        {
          "id": "security-as-code",
          "title": "Security as Code"
        }
      ]
    },
    {
      "id": "devsecops-fundamentals--risk-assessment-related-topics",
      "title": "Risk Assessment & Related Topics",
      "leaves": [
        {
          "id": "risk-assessment",
          "title": "Risk Assessment"
        },
        {
          "id": "pentesting-in-pipelines",
          "title": "Penetration Testing in Pipelines"
        },
        {
          "id": "bug-bounties-devsecops",
          "title": "Bug Bounty Programs"
        },
        {
          "id": "security-review-process",
          "title": "Security Review Process"
        },
        {
          "id": "bsimm-samm-models",
          "title": "BSIMM & OWASP SAMM Models"
        },
        {
          "id": "sbom-fundamentals-overview",
          "title": "SBOM (Concept Overview)"
        }
      ]
    },
    {
      "id": "aspm-platforms",
      "title": "ASPM (Application Security Posture Management)",
      "leaves": [
        {
          "id": "apiiro-aspm",
          "title": "Apiiro"
        },
        {
          "id": "armorcode-aspm",
          "title": "ArmorCode"
        },
        {
          "id": "ox-security-aspm",
          "title": "OX Security"
        },
        {
          "id": "backslash-security",
          "title": "Backslash Security"
        },
        {
          "id": "legit-security",
          "title": "Legit Security"
        },
        {
          "id": "cycode-aspm",
          "title": "Cycode"
        },
        {
          "id": "tromzo-aspm",
          "title": "Tromzo"
        },
        {
          "id": "arnica-aspm",
          "title": "Arnica"
        },
        {
          "id": "bionic-aspm",
          "title": "Bionic (Continuous AppSec)"
        },
        {
          "id": "jit-aspm",
          "title": "Jit.io"
        },
        {
          "id": "phoenix-security-aspm",
          "title": "Phoenix Security"
        }
      ]
    },
    {
      "id": "vulnerability-management-platforms",
      "title": "Vulnerability Management Platforms",
      "leaves": [
        {
          "id": "tenable-vm",
          "title": "Tenable.io / Nessus"
        },
        {
          "id": "qualys-vmdr",
          "title": "Qualys VMDR"
        },
        {
          "id": "rapid7-insightvm",
          "title": "Rapid7 InsightVM (Nexpose)"
        },
        {
          "id": "openvas-greenbone",
          "title": "OpenVAS / Greenbone"
        },
        {
          "id": "microsoft-defender-vm",
          "title": "Microsoft Defender Vulnerability Management"
        },
        {
          "id": "frontline-vm",
          "title": "Frontline Vulnerability Manager (Digital Defense)"
        },
        {
          "id": "wiz-vm",
          "title": "Wiz Vulnerability Management"
        },
        {
          "id": "edgescan",
          "title": "Edgescan"
        },
        {
          "id": "crowdstrike-spotlight",
          "title": "CrowdStrike Falcon Spotlight"
        }
      ]
    },
    {
      "id": "authorization-platforms",
      "title": "Authorization (AuthZ) Platforms",
      "leaves": [
        {
          "id": "cerbos-authz",
          "title": "Cerbos"
        },
        {
          "id": "oso-authz",
          "title": "Oso"
        },
        {
          "id": "openfga-authz",
          "title": "OpenFGA (CNCF)"
        },
        {
          "id": "authzed-spicedb",
          "title": "AuthZed / SpiceDB"
        },
        {
          "id": "permit-io-authz",
          "title": "Permit.io"
        },
        {
          "id": "casbin-authz",
          "title": "Casbin"
        },
        {
          "id": "aws-verified-permissions",
          "title": "AWS Verified Permissions (Cedar)"
        },
        {
          "id": "opa-as-authz",
          "title": "OPA as Authorization (Cross-Reference)"
        },
        {
          "id": "styra-das-authz",
          "title": "Styra DAS (Cross-Reference)"
        },
        {
          "id": "topaz-authz",
          "title": "Topaz (Cross-Reference)"
        }
      ]
    }
  ],
  "sast-dast-sca": [
    {
      "id": "sast-dast-sca--sast-static-application-security-testing-related",
      "title": "SAST (Static Application Security Testing) & Related Topics",
      "leaves": [
        {
          "id": "sast-tool-category",
          "title": "SAST (Static Application Security Testing)"
        },
        {
          "id": "dast-tool-category",
          "title": "DAST (Dynamic Application Security Testing)"
        },
        {
          "id": "iast-tool-category",
          "title": "IAST (Interactive AST)"
        },
        {
          "id": "sca-tool-category",
          "title": "SCA (Software Composition Analysis)"
        },
        {
          "id": "rasp-tool-category",
          "title": "RASP (Runtime Application Self-Protection)"
        },
        {
          "id": "fuzz-testing",
          "title": "Fuzz Testing"
        }
      ]
    },
    {
      "id": "commercial-sast-platforms",
      "title": "Commercial SAST/DAST Platforms",
      "leaves": [
        {
          "id": "sonarqube-sast",
          "title": "SonarQube / SonarCloud"
        },
        {
          "id": "checkmarx",
          "title": "Checkmarx One"
        },
        {
          "id": "veracode",
          "title": "Veracode"
        },
        {
          "id": "fortify",
          "title": "OpenText Fortify"
        },
        {
          "id": "snyk-platform",
          "title": "Snyk Platform"
        },
        {
          "id": "mend-whitesource",
          "title": "Mend (formerly WhiteSource)"
        },
        {
          "id": "black-duck",
          "title": "Black Duck"
        },
        {
          "id": "stackhawk",
          "title": "StackHawk"
        },
        {
          "id": "github-advanced-security-sast",
          "title": "GitHub Advanced Security"
        },
        {
          "id": "gitlab-ultimate-security",
          "title": "GitLab Ultimate Security"
        }
      ]
    },
    {
      "id": "open-source-sast",
      "title": "Open-Source SAST Tools",
      "leaves": [
        {
          "id": "semgrep-sast",
          "title": "Semgrep"
        },
        {
          "id": "codeql-sast",
          "title": "CodeQL"
        },
        {
          "id": "spotbugs-findsecbugs",
          "title": "SpotBugs / Find Security Bugs"
        },
        {
          "id": "bandit-py",
          "title": "Bandit (Python)"
        },
        {
          "id": "eslint-security",
          "title": "ESLint Security Plugins"
        },
        {
          "id": "gosec",
          "title": "gosec"
        },
        {
          "id": "brakeman-ruby",
          "title": "Brakeman (Ruby)"
        },
        {
          "id": "phpcs-security",
          "title": "PHPCS Security"
        },
        {
          "id": "devskim",
          "title": "DevSkim (Microsoft)"
        }
      ]
    },
    {
      "id": "open-source-dast",
      "title": "Open-Source DAST Tools",
      "leaves": [
        {
          "id": "owasp-zap",
          "title": "OWASP ZAP"
        },
        {
          "id": "burp-suite",
          "title": "Burp Suite (Community)"
        },
        {
          "id": "nuclei-projectdiscovery",
          "title": "Nuclei (ProjectDiscovery)"
        },
        {
          "id": "nikto-scanner",
          "title": "Nikto"
        },
        {
          "id": "wapiti",
          "title": "Wapiti"
        }
      ]
    },
    {
      "id": "sca-vulnerability-scanners",
      "title": "SCA & Vulnerability Scanners",
      "leaves": [
        {
          "id": "snyk-open-source",
          "title": "Snyk Open Source"
        },
        {
          "id": "dependabot-sca",
          "title": "Dependabot"
        },
        {
          "id": "renovate-sca",
          "title": "Renovate"
        },
        {
          "id": "trivy-fs-sca",
          "title": "Trivy (fs / repo)"
        },
        {
          "id": "grype-sca",
          "title": "Grype"
        },
        {
          "id": "osv-scanner",
          "title": "OSV-Scanner (Google)"
        },
        {
          "id": "safety-py",
          "title": "Safety (Python)"
        },
        {
          "id": "owasp-dep-check",
          "title": "OWASP Dependency-Check"
        },
        {
          "id": "npm-audit",
          "title": "npm audit / yarn audit / pnpm audit"
        }
      ]
    },
    {
      "id": "sast-dast-sca--sast-vs-dast-vs-iast-vs-sca",
      "title": "SAST vs DAST vs IAST vs SCA",
      "leaves": [
        {
          "id": "sast-dast-comparison",
          "title": "SAST vs DAST vs IAST vs SCA"
        }
      ]
    },
    {
      "id": "modern-supply-chain-platforms",
      "title": "Modern Supply Chain & SCA Platforms",
      "leaves": [
        {
          "id": "endor-labs-platform",
          "title": "Endor Labs"
        },
        {
          "id": "socket-dev-platform",
          "title": "Socket.dev"
        },
        {
          "id": "phylum-io",
          "title": "Phylum"
        },
        {
          "id": "aikido-security",
          "title": "Aikido Security"
        },
        {
          "id": "chainguard-enforce",
          "title": "Chainguard Enforce"
        },
        {
          "id": "vulnert-renovate-pro",
          "title": "Mend Renovate Enterprise"
        },
        {
          "id": "safedep-vet",
          "title": "SafeDep vet"
        }
      ]
    }
  ],
  "container-cluster-security": [
    {
      "id": "container-cluster-security--container-security-overview-related-topics",
      "title": "Container Security Overview & Related Topics",
      "leaves": [
        {
          "id": "container-security-overview",
          "title": "Container Security Overview"
        },
        {
          "id": "image-vulnerability-scanning",
          "title": "Image Vulnerability Scanning"
        },
        {
          "id": "image-signing-cluster",
          "title": "Image Signing (Cosign, Notary v2)"
        },
        {
          "id": "sbom-generation-syft",
          "title": "SBOM Generation (Syft, etc.)"
        },
        {
          "id": "distroless-minimal-images",
          "title": "Distroless & Minimal Images"
        },
        {
          "id": "rootless-containers-security",
          "title": "Rootless Containers"
        }
      ]
    },
    {
      "id": "container-cluster-security--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "container-hardening",
          "title": "Container Hardening"
        },
        {
          "id": "pod-security-admission",
          "title": "Pod Security Admission (PSA)"
        }
      ]
    },
    {
      "id": "pod-security-standards",
      "title": "Pod Security Standards",
      "leaves": [
        {
          "id": "pss-restricted",
          "title": "Restricted"
        },
        {
          "id": "pss-baseline",
          "title": "Baseline"
        },
        {
          "id": "pss-privileged",
          "title": "Privileged"
        }
      ]
    },
    {
      "id": "container-cluster-security--opa-gatekeeper-for-admission-related-topics",
      "title": "OPA Gatekeeper for Admission & Related Topics",
      "leaves": [
        {
          "id": "opa-gatekeeper-admission",
          "title": "OPA Gatekeeper for Admission"
        },
        {
          "id": "kyverno-admission",
          "title": "Kyverno for Admission"
        },
        {
          "id": "network-policies-security",
          "title": "Network Policies"
        },
        {
          "id": "mesh-mtls-security",
          "title": "Service Mesh mTLS"
        },
        {
          "id": "cis-k8s-benchmark",
          "title": "CIS Kubernetes Benchmark"
        },
        {
          "id": "kube-bench",
          "title": "kube-bench"
        }
      ]
    },
    {
      "id": "container-cluster-security--kube-hunter-related-topics",
      "title": "kube-hunter & Related Topics",
      "leaves": [
        {
          "id": "kube-hunter",
          "title": "kube-hunter"
        },
        {
          "id": "cluster-hardening",
          "title": "Cluster Hardening"
        },
        {
          "id": "etcd-encryption",
          "title": "ETCD Encryption at Rest"
        },
        {
          "id": "k8s-secrets-encryption",
          "title": "Kubernetes Secrets Encryption (KMS)"
        },
        {
          "id": "k8s-audit-logging",
          "title": "Kubernetes Audit Logging"
        },
        {
          "id": "k8s-admission-controllers",
          "title": "Admission Controllers"
        }
      ]
    },
    {
      "id": "cnapp-platforms",
      "title": "CNAPP Platforms",
      "leaves": [
        {
          "id": "wiz-cnapp",
          "title": "Wiz"
        },
        {
          "id": "prisma-cloud-cnapp",
          "title": "Prisma Cloud (Palo Alto)"
        },
        {
          "id": "sysdig-secure-cnapp",
          "title": "Sysdig Secure"
        },
        {
          "id": "aqua-platform",
          "title": "Aqua Security"
        },
        {
          "id": "lacework-cnapp",
          "title": "Lacework FortiCNAPP"
        },
        {
          "id": "orca-security-cnapp",
          "title": "Orca Security"
        },
        {
          "id": "red-hat-acs",
          "title": "Red Hat Advanced Cluster Security (StackRox)"
        }
      ]
    }
  ],
  "supply-chain-security": [
    {
      "id": "supply-chain-security--software-supply-chain-attacks-overview-related-t",
      "title": "Software Supply Chain Attacks (Overview) & Related Topics",
      "leaves": [
        {
          "id": "sw-supply-chain-attacks",
          "title": "Software Supply Chain Attacks (Overview)"
        },
        {
          "id": "famous-supply-chain-incidents",
          "title": "Famous Incidents (SolarWinds, Codecov, xz, etc.)"
        }
      ]
    },
    {
      "id": "sbom-formats",
      "title": "SBOM Formats",
      "leaves": [
        {
          "id": "spdx-format",
          "title": "SPDX"
        },
        {
          "id": "cyclonedx-format",
          "title": "CycloneDX"
        },
        {
          "id": "swid-tags",
          "title": "SWID Tags"
        }
      ]
    },
    {
      "id": "sbom-tools",
      "title": "SBOM Tools",
      "leaves": [
        {
          "id": "syft-sbom",
          "title": "Syft"
        },
        {
          "id": "cdxgen",
          "title": "cdxgen"
        },
        {
          "id": "trivy-sbom",
          "title": "Trivy SBOM"
        },
        {
          "id": "tern-sbom",
          "title": "Tern"
        },
        {
          "id": "spdx-sbom-generator",
          "title": "spdx-sbom-generator"
        }
      ]
    },
    {
      "id": "sigstore-ecosystem",
      "title": "Sigstore Ecosystem",
      "leaves": [
        {
          "id": "cosign-sigstore",
          "title": "Cosign"
        },
        {
          "id": "rekor",
          "title": "Rekor (Transparency Log)"
        },
        {
          "id": "fulcio",
          "title": "Fulcio (Code Signing CA)"
        },
        {
          "id": "gitsign",
          "title": "Gitsign"
        },
        {
          "id": "policy-controller-sigstore",
          "title": "Sigstore Policy Controller"
        }
      ]
    },
    {
      "id": "slsa-framework",
      "title": "SLSA Framework",
      "leaves": [
        {
          "id": "slsa-levels",
          "title": "SLSA Levels (Build L1–L4)"
        },
        {
          "id": "slsa-provenance",
          "title": "SLSA Provenance"
        },
        {
          "id": "slsa-attestations",
          "title": "SLSA Attestations"
        }
      ]
    },
    {
      "id": "in-toto",
      "title": "in-toto",
      "leaves": [
        {
          "id": "in-toto-attestations",
          "title": "in-toto Attestations"
        },
        {
          "id": "in-toto-layouts",
          "title": "in-toto Layouts"
        }
      ]
    },
    {
      "id": "supply-chain-security--verification-policies-kyverno-connaisseur-ratify",
      "title": "Verification Policies (Kyverno, Connaisseur, Ratify) & Related Topics",
      "leaves": [
        {
          "id": "verification-policies",
          "title": "Verification Policies (Kyverno, Connaisseur, Ratify)"
        },
        {
          "id": "reproducible-builds-sc",
          "title": "Reproducible Builds"
        },
        {
          "id": "source-provenance",
          "title": "Source Provenance"
        },
        {
          "id": "build-provenance-attest",
          "title": "Build Provenance & Attestations"
        },
        {
          "id": "github-artifact-attestations-sc",
          "title": "GitHub Artifact Attestations"
        },
        {
          "id": "vex-format",
          "title": "VEX (Vulnerability Exploitability eXchange)"
        }
      ]
    },
    {
      "id": "openssf-projects",
      "title": "OpenSSF Projects",
      "leaves": [
        {
          "id": "openssf-scorecard",
          "title": "OpenSSF Scorecard"
        },
        {
          "id": "openssf-best-practices-badge",
          "title": "OpenSSF Best Practices Badge"
        },
        {
          "id": "openssf-allstar",
          "title": "Allstar"
        },
        {
          "id": "gittuf",
          "title": "gittuf"
        },
        {
          "id": "guac",
          "title": "GUAC"
        }
      ]
    },
    {
      "id": "supply-chain-security--github-dependency-review-action-related-topics",
      "title": "GitHub Dependency Review Action & Related Topics",
      "leaves": [
        {
          "id": "dependency-review-action",
          "title": "GitHub Dependency Review Action"
        },
        {
          "id": "supply-chain-bug-bounties",
          "title": "Bug Bounties for Supply Chain"
        },
        {
          "id": "binary-authorization",
          "title": "Binary Authorization (GKE, GCP)"
        }
      ]
    }
  ],
  "iac-security-scanning": [
    {
      "id": "iac-security-scanning--static-iac-scanning-concept",
      "title": "Static IaC Scanning (Concept)",
      "leaves": [
        {
          "id": "static-iac-scanning-concept",
          "title": "Static IaC Scanning (Concept)"
        }
      ]
    },
    {
      "id": "iac-scanning-tools",
      "title": "IaC Scanning Tools",
      "leaves": [
        {
          "id": "checkov-scan",
          "title": "Checkov (Prisma Cloud)"
        },
        {
          "id": "tfsec-scan",
          "title": "tfsec (Aqua)"
        },
        {
          "id": "kics-checkmarx",
          "title": "KICS (Checkmarx)"
        },
        {
          "id": "terrascan-tenable",
          "title": "Terrascan (Tenable)"
        },
        {
          "id": "snyk-iac-scan",
          "title": "Snyk IaC"
        },
        {
          "id": "cfn-nag",
          "title": "cfn-nag"
        },
        {
          "id": "cfn-lint",
          "title": "cfn-lint"
        },
        {
          "id": "datree-iac",
          "title": "Datree"
        },
        {
          "id": "regula",
          "title": "Regula (Fugue)"
        },
        {
          "id": "bridgecrew-legacy",
          "title": "Bridgecrew (Now Prisma Cloud)"
        }
      ]
    },
    {
      "id": "iac-security-scanning--policy-as-code-for-iac-opa-sentinel-related-topi",
      "title": "Policy as Code for IaC (OPA, Sentinel) & Related Topics",
      "leaves": [
        {
          "id": "policy-as-code-iac",
          "title": "Policy as Code for IaC (OPA, Sentinel)"
        },
        {
          "id": "pre-commit-iac-scanning",
          "title": "Pre-Commit IaC Scanning"
        },
        {
          "id": "pipeline-iac-scanning",
          "title": "Pipeline IaC Scanning"
        },
        {
          "id": "drift-detection-iac",
          "title": "Drift Detection (IaC)"
        },
        {
          "id": "iac-cost-security-overlap",
          "title": "IaC Cost ↔ Security Overlap"
        }
      ]
    }
  ],
  "compliance-frameworks": [
    {
      "id": "security-compliance",
      "title": "Security & Privacy Compliance Frameworks",
      "leaves": [
        {
          "id": "soc-2",
          "title": "SOC 2 (Type I & II)"
        },
        {
          "id": "iso-27001",
          "title": "ISO/IEC 27001"
        },
        {
          "id": "iso-27017-27018",
          "title": "ISO/IEC 27017 & 27018"
        },
        {
          "id": "pci-dss",
          "title": "PCI DSS"
        },
        {
          "id": "hipaa",
          "title": "HIPAA / HITECH"
        },
        {
          "id": "fedramp",
          "title": "FedRAMP"
        },
        {
          "id": "fisma",
          "title": "FISMA"
        },
        {
          "id": "hitrust",
          "title": "HITRUST CSF"
        },
        {
          "id": "csa-star",
          "title": "CSA STAR"
        }
      ]
    },
    {
      "id": "nist-frameworks",
      "title": "NIST Frameworks",
      "leaves": [
        {
          "id": "nist-800-53",
          "title": "NIST SP 800-53"
        },
        {
          "id": "nist-800-171",
          "title": "NIST SP 800-171"
        },
        {
          "id": "nist-csf",
          "title": "NIST Cybersecurity Framework (CSF)"
        },
        {
          "id": "nist-ssdf",
          "title": "NIST SSDF (Secure Software Dev Framework)"
        }
      ]
    },
    {
      "id": "privacy-regulations",
      "title": "Privacy Regulations",
      "leaves": [
        {
          "id": "gdpr-compliance",
          "title": "GDPR"
        },
        {
          "id": "ccpa-cpra",
          "title": "CCPA / CPRA"
        },
        {
          "id": "pipl-china",
          "title": "PIPL (China)"
        },
        {
          "id": "lgpd-brazil",
          "title": "LGPD (Brazil)"
        },
        {
          "id": "pipeda-canada",
          "title": "PIPEDA (Canada)"
        },
        {
          "id": "appi-japan",
          "title": "APPI (Japan)"
        }
      ]
    },
    {
      "id": "regional-cloud-compliance",
      "title": "Regional Cloud Compliance",
      "leaves": [
        {
          "id": "dora-eu",
          "title": "EU DORA (Digital Operational Resilience Act)"
        },
        {
          "id": "ismap-japan",
          "title": "ISMAP (Japan)"
        },
        {
          "id": "irap-australia",
          "title": "IRAP (Australia)"
        },
        {
          "id": "eu-cra",
          "title": "EU Cyber Resilience Act"
        }
      ]
    },
    {
      "id": "compliance-frameworks--cis-critical-security-controls",
      "title": "CIS Critical Security Controls",
      "leaves": [
        {
          "id": "cis-controls",
          "title": "CIS Critical Security Controls"
        }
      ]
    },
    {
      "id": "compliance-automation-platforms",
      "title": "Compliance Automation Platforms",
      "leaves": [
        {
          "id": "vanta",
          "title": "Vanta"
        },
        {
          "id": "drata",
          "title": "Drata"
        },
        {
          "id": "secureframe",
          "title": "Secureframe"
        },
        {
          "id": "tugboat-logic",
          "title": "Tugboat Logic"
        },
        {
          "id": "hyperproof",
          "title": "Hyperproof"
        },
        {
          "id": "anecdotes",
          "title": "Anecdotes"
        },
        {
          "id": "sprinto",
          "title": "Sprinto"
        },
        {
          "id": "thoropass",
          "title": "Thoropass"
        }
      ]
    },
    {
      "id": "compliance-frameworks--lifecycle-phases-continuous-practices",
      "title": "Lifecycle Phases & Continuous Practices",
      "leaves": [
        {
          "id": "audit-evidence-collection",
          "title": "Audit Evidence Collection"
        },
        {
          "id": "continuous-compliance",
          "title": "Continuous Compliance"
        }
      ]
    },
    {
      "id": "continuous-controls-monitoring",
      "title": "Continuous Controls Monitoring (CCM)",
      "leaves": [
        {
          "id": "cyberguardian-ccm",
          "title": "CyberGuardian / RegScale"
        },
        {
          "id": "centraleyes-ccm",
          "title": "Centraleyes"
        },
        {
          "id": "risk-cloud-logicgate",
          "title": "LogicGate Risk Cloud"
        },
        {
          "id": "archer-rsa",
          "title": "RSA Archer"
        },
        {
          "id": "metricstream-grc",
          "title": "MetricStream GRC"
        }
      ]
    }
  ],
  "policy-as-code": [
    {
      "id": "policy-as-code--policy-as-code-concept",
      "title": "Policy-as-Code Concept",
      "leaves": [
        {
          "id": "pac-concept",
          "title": "Policy-as-Code Concept"
        }
      ]
    },
    {
      "id": "opa-policy",
      "title": "OPA (Open Policy Agent)",
      "leaves": [
        {
          "id": "rego-language",
          "title": "Rego Language"
        },
        {
          "id": "opa-rest-api",
          "title": "OPA REST API"
        },
        {
          "id": "opa-decision-logs",
          "title": "Decision Logs"
        },
        {
          "id": "opa-bundles",
          "title": "Bundles"
        },
        {
          "id": "opa-server-mode",
          "title": "OPA Server Mode"
        }
      ]
    },
    {
      "id": "policy-as-code--conftest-related-topics",
      "title": "Conftest & Related Topics",
      "leaves": [
        {
          "id": "conftest",
          "title": "Conftest"
        },
        {
          "id": "opa-gatekeeper-pac",
          "title": "OPA Gatekeeper (Kubernetes)"
        }
      ]
    },
    {
      "id": "kyverno-pac",
      "title": "Kyverno (Kubernetes)",
      "leaves": [
        {
          "id": "kyverno-policies",
          "title": "ClusterPolicy & Policy"
        },
        {
          "id": "kyverno-mutate-rules",
          "title": "Mutate Rules"
        },
        {
          "id": "kyverno-validate-rules",
          "title": "Validate Rules"
        },
        {
          "id": "kyverno-generate-rules",
          "title": "Generate Rules"
        },
        {
          "id": "kyverno-verify-images",
          "title": "Verify Images"
        }
      ]
    },
    {
      "id": "policy-as-code--cedar-amazon-related-topics",
      "title": "Cedar (Amazon) & Related Topics",
      "leaves": [
        {
          "id": "cedar-amazon",
          "title": "Cedar (Amazon)"
        },
        {
          "id": "sentinel-hashicorp-pac",
          "title": "Sentinel (HashiCorp)"
        },
        {
          "id": "polaris-pac",
          "title": "Polaris (Fairwinds)"
        },
        {
          "id": "datree-pac",
          "title": "Datree (Policy-as-Code Mode)"
        },
        {
          "id": "cloud-custodian-pac",
          "title": "Cloud Custodian"
        },
        {
          "id": "falco-rules-as-policy",
          "title": "Falco Rules as Policy"
        }
      ]
    },
    {
      "id": "policy-as-code--topaz-related-topics",
      "title": "Topaz & Related Topics",
      "leaves": [
        {
          "id": "topaz",
          "title": "Topaz"
        },
        {
          "id": "styra-das",
          "title": "Styra DAS (Commercial OPA)"
        },
        {
          "id": "osquery-policy",
          "title": "osquery for Policy & Inventory"
        }
      ]
    }
  ],
  "cloud-governance": [
    {
      "id": "cloud-governance--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "cloud-governance-frameworks",
          "title": "Cloud Governance Frameworks"
        },
        {
          "id": "multi-account-subscription-strategy",
          "title": "Multi-Account / Multi-Subscription Strategy"
        }
      ]
    },
    {
      "id": "landing-zones",
      "title": "Landing Zones",
      "leaves": [
        {
          "id": "aws-landing-zone-ct",
          "title": "AWS Landing Zone & Control Tower"
        },
        {
          "id": "azure-landing-zones",
          "title": "Azure Landing Zones"
        },
        {
          "id": "gcp-landing-zones",
          "title": "GCP Landing Zones"
        }
      ]
    },
    {
      "id": "cloud-governance--tagging-strategy-related-topics",
      "title": "Tagging Strategy & Related Topics",
      "leaves": [
        {
          "id": "cloud-tagging-strategy",
          "title": "Tagging Strategy"
        },
        {
          "id": "resource-organization-hierarchy",
          "title": "Resource Organization (Folders, OUs, MGs)"
        },
        {
          "id": "aws-scps",
          "title": "AWS Service Control Policies (SCPs)"
        },
        {
          "id": "azure-policy",
          "title": "Azure Policy"
        },
        {
          "id": "gcp-org-policies",
          "title": "GCP Organization Policies"
        },
        {
          "id": "cloud-custodian-governance",
          "title": "Cloud Custodian (Governance)"
        }
      ]
    },
    {
      "id": "cspm-platforms",
      "title": "CSPM Platforms",
      "leaves": [
        {
          "id": "wiz-cspm",
          "title": "Wiz"
        },
        {
          "id": "lacework-cspm",
          "title": "Lacework"
        },
        {
          "id": "prisma-cloud-cspm",
          "title": "Prisma Cloud"
        },
        {
          "id": "orca-cspm",
          "title": "Orca Security"
        },
        {
          "id": "crowdstrike-falcon-cloud",
          "title": "CrowdStrike Falcon Cloud Security"
        },
        {
          "id": "defender-for-cloud",
          "title": "Microsoft Defender for Cloud"
        },
        {
          "id": "aws-security-hub-cspm",
          "title": "AWS Security Hub"
        },
        {
          "id": "gcp-scc",
          "title": "GCP Security Command Center"
        }
      ]
    },
    {
      "id": "cloud-governance--cloud-access-security-broker-casb-related-topics",
      "title": "Cloud Access Security Broker (CASB) & Related Topics",
      "leaves": [
        {
          "id": "casb-overview",
          "title": "Cloud Access Security Broker (CASB)"
        },
        {
          "id": "cdr-overview",
          "title": "Cloud Detection and Response (CDR)"
        },
        {
          "id": "cnapp-cross-reference",
          "title": "CNAPP (Cross-Reference)"
        }
      ]
    }
  ],
  "auditing-drift-detection": [
    {
      "id": "auditing-drift-detection--audit-logs-overview",
      "title": "Audit Logs (Overview)",
      "leaves": [
        {
          "id": "audit-logs-overview",
          "title": "Audit Logs (Overview)"
        }
      ]
    },
    {
      "id": "cloud-audit-services",
      "title": "Cloud Audit Log Services",
      "leaves": [
        {
          "id": "aws-cloudtrail",
          "title": "AWS CloudTrail"
        },
        {
          "id": "gcp-cloud-audit-logs",
          "title": "GCP Cloud Audit Logs"
        },
        {
          "id": "azure-activity-log",
          "title": "Azure Activity & Diagnostic Logs"
        }
      ]
    },
    {
      "id": "auditing-drift-detection--drift-detection-concept-related-topics",
      "title": "Drift Detection (Concept) & Related Topics",
      "leaves": [
        {
          "id": "drift-detection-concept",
          "title": "Drift Detection (Concept)"
        },
        {
          "id": "iac-drift-detection",
          "title": "Configuration Drift in IaC"
        },
        {
          "id": "cm-drift-detection",
          "title": "Configuration Drift in CM"
        }
      ]
    },
    {
      "id": "drift-detection-tools",
      "title": "Drift Detection Tools",
      "leaves": [
        {
          "id": "driftctl",
          "title": "driftctl"
        },
        {
          "id": "snyk-drift",
          "title": "Snyk Drift"
        },
        {
          "id": "cloudquery",
          "title": "CloudQuery"
        },
        {
          "id": "terraform-drift-mode",
          "title": "Terraform Drift Detection"
        },
        {
          "id": "aws-config",
          "title": "AWS Config"
        },
        {
          "id": "azure-resource-graph",
          "title": "Azure Resource Graph"
        },
        {
          "id": "gcp-asset-inventory",
          "title": "GCP Asset Inventory"
        },
        {
          "id": "steampipe",
          "title": "Steampipe"
        }
      ]
    },
    {
      "id": "auditing-drift-detection--continuous-compliance-auditing-related-topics",
      "title": "Continuous Compliance Auditing & Related Topics",
      "leaves": [
        {
          "id": "continuous-compliance-auditing",
          "title": "Continuous Compliance Auditing"
        },
        {
          "id": "forensics-log-preservation",
          "title": "Forensics & Log Preservation"
        },
        {
          "id": "siem-integration",
          "title": "SIEM Integration"
        },
        {
          "id": "data-classification",
          "title": "Data Classification & DSPM"
        }
      ]
    },
    {
      "id": "siem-platforms",
      "title": "SIEM Platforms",
      "leaves": [
        {
          "id": "splunk-enterprise-security",
          "title": "Splunk Enterprise Security"
        },
        {
          "id": "microsoft-sentinel",
          "title": "Microsoft Sentinel"
        },
        {
          "id": "elastic-siem",
          "title": "Elastic Security / SIEM"
        },
        {
          "id": "google-chronicle-siem",
          "title": "Google Chronicle SIEM"
        },
        {
          "id": "panther-siem",
          "title": "Panther"
        },
        {
          "id": "falcon-logscale",
          "title": "CrowdStrike Falcon LogScale (Humio)"
        },
        {
          "id": "exabeam-siem",
          "title": "Exabeam"
        },
        {
          "id": "ibm-qradar",
          "title": "IBM QRadar"
        },
        {
          "id": "sumo-logic-cse",
          "title": "Sumo Logic Cloud SIEM"
        },
        {
          "id": "securonix-siem",
          "title": "Securonix"
        },
        {
          "id": "logrhythm-siem",
          "title": "LogRhythm"
        },
        {
          "id": "wazuh-siem",
          "title": "Wazuh (Open Source)"
        }
      ]
    },
    {
      "id": "steampipe-ecosystem",
      "title": "Steampipe Ecosystem (Turbot Pipes)",
      "leaves": [
        {
          "id": "steampipe-core",
          "title": "Steampipe (Query)"
        },
        {
          "id": "powerpipe",
          "title": "Powerpipe (Dashboards & Benchmarks)"
        },
        {
          "id": "flowpipe",
          "title": "Flowpipe (Workflow Engine)"
        },
        {
          "id": "tailpipe",
          "title": "Tailpipe (Log Analytics)"
        },
        {
          "id": "turbot-guardrails",
          "title": "Turbot Guardrails"
        }
      ]
    }
  ],
  "cncf-landscape": [
    {
      "id": "cncf-landscape--essential-reading-references",
      "title": "Essential Reading & References",
      "leaves": [
        {
          "id": "cncf-overview",
          "title": "CNCF Overview & Mission"
        },
        {
          "id": "cncf-graduated-projects",
          "title": "CNCF Graduated Projects"
        },
        {
          "id": "cncf-incubating-projects",
          "title": "CNCF Incubating Projects"
        },
        {
          "id": "cncf-sandbox-projects",
          "title": "CNCF Sandbox Projects"
        }
      ]
    },
    {
      "id": "cncf-categories",
      "title": "CNCF Landscape Categories",
      "leaves": [
        {
          "id": "cncf-orchestration",
          "title": "Orchestration & Management"
        },
        {
          "id": "cncf-runtime",
          "title": "Runtime"
        },
        {
          "id": "cncf-provisioning",
          "title": "Provisioning"
        },
        {
          "id": "cncf-app-definition",
          "title": "App Definition & Development"
        },
        {
          "id": "cncf-platform-tools",
          "title": "Platform"
        },
        {
          "id": "cncf-observability-cat",
          "title": "Observability & Analysis"
        },
        {
          "id": "cncf-serverless-cat",
          "title": "Serverless"
        },
        {
          "id": "cncf-special-cat",
          "title": "Special / WASM / AI"
        }
      ]
    },
    {
      "id": "cncf-landscape--git-core-mechanics",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "tag-app-delivery",
          "title": "CNCF TAG App Delivery"
        },
        {
          "id": "tag-runtime",
          "title": "CNCF TAG Runtime"
        },
        {
          "id": "tag-network",
          "title": "CNCF TAG Network"
        },
        {
          "id": "tag-security",
          "title": "CNCF TAG Security"
        },
        {
          "id": "tag-observability",
          "title": "CNCF TAG Observability"
        },
        {
          "id": "cnoe",
          "title": "CNOE (Cloud Native Operational Excellence)"
        }
      ]
    },
    {
      "id": "cncf-landscape--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "cncf-events-kubecon",
          "title": "CNCF Events (KubeCon, CloudNativeCon)"
        }
      ]
    },
    {
      "id": "k8s-multi-tenancy-tools",
      "title": "Kubernetes Multi-Tenancy Tooling",
      "leaves": [
        {
          "id": "capsule-tenant",
          "title": "Capsule"
        },
        {
          "id": "hierarchical-namespace-controller",
          "title": "Hierarchical Namespace Controller (HNC)"
        },
        {
          "id": "vcluster-cross-ref",
          "title": "vCluster (Cross-Reference)"
        },
        {
          "id": "loft-platform",
          "title": "Loft Platform"
        },
        {
          "id": "kiosk-multi-tenant",
          "title": "Kiosk"
        },
        {
          "id": "kamaji-tenant",
          "title": "Kamaji"
        },
        {
          "id": "project-multi-tenancy",
          "title": "Kubernetes Working Group Multi-Tenancy"
        }
      ]
    },
    {
      "id": "k8s-virtualization",
      "title": "Virtualization on Kubernetes",
      "leaves": [
        {
          "id": "kubevirt",
          "title": "KubeVirt"
        },
        {
          "id": "virtual-kubelet",
          "title": "Virtual Kubelet"
        },
        {
          "id": "harvester-suse",
          "title": "Harvester (SUSE)"
        },
        {
          "id": "openshift-virtualization",
          "title": "OpenShift Virtualization"
        },
        {
          "id": "kata-containers-virt",
          "title": "Kata Containers (Cross-Reference)"
        },
        {
          "id": "firecracker-microvm",
          "title": "AWS Firecracker"
        },
        {
          "id": "cloud-hypervisor",
          "title": "Cloud Hypervisor"
        }
      ]
    }
  ],
  "multi-cloud-hybrid": [
    {
      "id": "multi-cloud-hybrid--multi-cloud-strategy-related-topics",
      "title": "Multi-Cloud Strategy & Related Topics",
      "leaves": [
        {
          "id": "multi-cloud-strategy",
          "title": "Multi-Cloud Strategy"
        },
        {
          "id": "hybrid-cloud-strategy",
          "title": "Hybrid Cloud Strategy"
        },
        {
          "id": "multi-cloud-drivers",
          "title": "Multi-Cloud Drivers (Risk, Cost, Lock-in)"
        }
      ]
    },
    {
      "id": "cloud-abstractions",
      "title": "Cloud Abstractions",
      "leaves": [
        {
          "id": "crossplane-mc",
          "title": "Crossplane (Cross-Reference)"
        },
        {
          "id": "pulumi-mc",
          "title": "Pulumi (Cross-Reference)"
        },
        {
          "id": "terraform-providers-mc",
          "title": "Terraform Providers"
        },
        {
          "id": "cdk-multi-language",
          "title": "CDK (Multi-Cloud Patterns)"
        }
      ]
    },
    {
      "id": "portability-tools",
      "title": "Portability Tools",
      "leaves": [
        {
          "id": "k8s-cluster-api",
          "title": "Cluster API (CAPI)"
        },
        {
          "id": "kubefed-overview",
          "title": "KubeFed (Legacy)"
        },
        {
          "id": "kcp-project",
          "title": "kcp (Kubernetes Control Plane)"
        },
        {
          "id": "liqo-multi-cluster",
          "title": "Liqo"
        },
        {
          "id": "submariner-multi-cluster",
          "title": "Submariner"
        }
      ]
    },
    {
      "id": "multi-cloud-hybrid--cloud-interconnects-direct-connect-expressroute-",
      "title": "Cloud Interconnects (Direct Connect, ExpressRoute, Interconnect) & Related Topics",
      "leaves": [
        {
          "id": "cloud-interconnects",
          "title": "Cloud Interconnects (Direct Connect, ExpressRoute, Interconnect)"
        },
        {
          "id": "data-egress-costs",
          "title": "Data Egress Costs"
        },
        {
          "id": "sovereign-cloud",
          "title": "Sovereign Cloud"
        }
      ]
    },
    {
      "id": "on-prem-cloud-bridges",
      "title": "On-Prem ↔ Cloud Bridges",
      "leaves": [
        {
          "id": "aws-outposts",
          "title": "AWS Outposts"
        },
        {
          "id": "azure-arc-overview",
          "title": "Azure Arc"
        },
        {
          "id": "azure-stack",
          "title": "Azure Stack"
        },
        {
          "id": "gcp-anthos",
          "title": "Google Anthos"
        },
        {
          "id": "gcp-distributed-cloud",
          "title": "GCP Distributed Cloud"
        },
        {
          "id": "openshift-multi",
          "title": "Red Hat OpenShift (Multi-Cluster)"
        }
      ]
    },
    {
      "id": "multi-cloud-hybrid--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "workload-portability-patterns",
          "title": "Workload Portability Patterns"
        }
      ]
    },
    {
      "id": "multi-cluster-mgmt-tools",
      "title": "Multi-Cluster Kubernetes Management",
      "leaves": [
        {
          "id": "karmada-cncf",
          "title": "Karmada (CNCF)"
        },
        {
          "id": "ocm-open-cluster-mgmt",
          "title": "Open Cluster Management (OCM)"
        },
        {
          "id": "rancher-fleet",
          "title": "Rancher Fleet"
        },
        {
          "id": "clusternet-multi",
          "title": "Clusternet"
        },
        {
          "id": "argo-cd-applicationsets-cross",
          "title": "Argo CD ApplicationSets (Cross-Reference)"
        },
        {
          "id": "cilium-cluster-mesh",
          "title": "Cilium Cluster Mesh"
        },
        {
          "id": "skupper-multi-cluster",
          "title": "Skupper"
        },
        {
          "id": "submariner-cross-ref",
          "title": "Submariner (Cross-Reference)"
        },
        {
          "id": "liqo-cross-ref",
          "title": "Liqo (Cross-Reference)"
        },
        {
          "id": "kubestellar",
          "title": "KubeStellar"
        }
      ]
    }
  ],
  "edge-computing": [
    {
      "id": "edge-computing--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "edge-computing-concepts",
          "title": "Edge Computing Concepts"
        },
        {
          "id": "edge-vs-cloud-vs-fog",
          "title": "Edge vs Cloud vs Fog Computing"
        }
      ]
    },
    {
      "id": "lightweight-k8s-distros",
      "title": "Lightweight Kubernetes Distros",
      "leaves": [
        {
          "id": "k3s",
          "title": "K3s (Rancher)"
        },
        {
          "id": "microk8s",
          "title": "MicroK8s (Canonical)"
        },
        {
          "id": "k0s",
          "title": "k0s (Mirantis)"
        },
        {
          "id": "minikube-edge",
          "title": "minikube (Cross-Reference)"
        },
        {
          "id": "kind-cross-ref",
          "title": "KIND (Cross-Reference)"
        }
      ]
    },
    {
      "id": "edge-k8s-platforms",
      "title": "Edge Kubernetes Platforms",
      "leaves": [
        {
          "id": "kubeedge",
          "title": "KubeEdge"
        },
        {
          "id": "openyurt",
          "title": "OpenYurt"
        },
        {
          "id": "baetyl",
          "title": "Baetyl"
        },
        {
          "id": "akri",
          "title": "Akri (Microsoft)"
        },
        {
          "id": "k3sup",
          "title": "k3sup"
        },
        {
          "id": "super-edge",
          "title": "SuperEdge"
        }
      ]
    },
    {
      "id": "edge-cloud-services",
      "title": "Cloud Edge Services",
      "leaves": [
        {
          "id": "aws-iot-greengrass",
          "title": "AWS IoT Greengrass"
        },
        {
          "id": "azure-iot-edge",
          "title": "Azure IoT Edge"
        },
        {
          "id": "gcp-edge-tpu",
          "title": "GCP Edge TPU & Cloud Run on Anthos"
        },
        {
          "id": "cloudflare-workers",
          "title": "Cloudflare Workers"
        },
        {
          "id": "fastly-compute-edge",
          "title": "Fastly Compute@Edge"
        },
        {
          "id": "akamai-edgeworkers",
          "title": "Akamai EdgeWorkers"
        },
        {
          "id": "vercel-edge",
          "title": "Vercel Edge Functions"
        }
      ]
    },
    {
      "id": "edge-computing--edge-observability-related-topics",
      "title": "Edge Observability & Related Topics",
      "leaves": [
        {
          "id": "edge-observability",
          "title": "Edge Observability"
        },
        {
          "id": "edge-updates-air-gapped",
          "title": "Edge Updates & Air-Gapped Deploys"
        }
      ]
    }
  ],
  "serverless-for-devops": [
    {
      "id": "serverless-for-devops--serverless-concepts",
      "title": "Serverless Concepts",
      "leaves": [
        {
          "id": "serverless-concepts",
          "title": "Serverless Concepts"
        }
      ]
    },
    {
      "id": "cloud-faas-services",
      "title": "Cloud FaaS Services (Operations)",
      "leaves": [
        {
          "id": "aws-lambda-ops",
          "title": "AWS Lambda (Ops Perspective)"
        },
        {
          "id": "azure-functions-ops",
          "title": "Azure Functions (Ops Perspective)"
        },
        {
          "id": "gcp-cloud-functions-ops",
          "title": "GCP Cloud Functions / Cloud Run"
        },
        {
          "id": "cloudflare-workers-ops",
          "title": "Cloudflare Workers (Ops)"
        }
      ]
    },
    {
      "id": "self-hosted-serverless",
      "title": "Self-Hosted Serverless",
      "leaves": [
        {
          "id": "knative-serving",
          "title": "Knative Serving"
        },
        {
          "id": "knative-eventing",
          "title": "Knative Eventing"
        },
        {
          "id": "openfaas",
          "title": "OpenFaaS"
        },
        {
          "id": "kubeless-legacy",
          "title": "Kubeless (Legacy)"
        },
        {
          "id": "fission",
          "title": "Fission"
        },
        {
          "id": "nuclio",
          "title": "Nuclio"
        },
        {
          "id": "cloudevents-spec",
          "title": "CloudEvents Spec"
        }
      ]
    },
    {
      "id": "serverless-frameworks",
      "title": "Serverless Frameworks",
      "leaves": [
        {
          "id": "serverless-framework",
          "title": "Serverless Framework (Serverless Inc.)"
        },
        {
          "id": "aws-sam-overview",
          "title": "AWS SAM"
        },
        {
          "id": "sst-framework",
          "title": "SST"
        },
        {
          "id": "zappa-python",
          "title": "Zappa (Python)"
        },
        {
          "id": "wrangler-cf",
          "title": "Wrangler (Cloudflare)"
        }
      ]
    },
    {
      "id": "serverless-for-devops--cold-start-tuning-related-topics",
      "title": "Cold Start Tuning & Related Topics",
      "leaves": [
        {
          "id": "cold-start-tuning",
          "title": "Cold Start Tuning"
        },
        {
          "id": "serverless-observability",
          "title": "Serverless Observability"
        },
        {
          "id": "event-driven-architectures",
          "title": "Event-Driven Architectures (EDA)"
        },
        {
          "id": "serverless-cost",
          "title": "Serverless Cost Patterns"
        }
      ]
    }
  ],
  "platform-engineering-fundamentals": [
    {
      "id": "platform-engineering-fundamentals--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "what-is-platform-engineering",
          "title": "What is Platform Engineering?"
        },
        {
          "id": "platform-as-product",
          "title": "Platform as a Product"
        }
      ]
    },
    {
      "id": "team-topologies",
      "title": "Team Topologies",
      "leaves": [
        {
          "id": "stream-aligned-teams",
          "title": "Stream-Aligned Teams"
        },
        {
          "id": "platform-teams",
          "title": "Platform Teams"
        },
        {
          "id": "enabling-teams",
          "title": "Enabling Teams"
        },
        {
          "id": "complicated-subsystem-teams",
          "title": "Complicated-Subsystem Teams"
        },
        {
          "id": "team-interaction-modes",
          "title": "Team Interaction Modes"
        }
      ]
    },
    {
      "id": "platform-engineering-fundamentals--thinnest-viable-platform-tvp-related-topics",
      "title": "Thinnest Viable Platform (TVP) & Related Topics",
      "leaves": [
        {
          "id": "thinnest-viable-platform",
          "title": "Thinnest Viable Platform (TVP)"
        },
        {
          "id": "platform-maturity-models",
          "title": "Platform Maturity Models"
        },
        {
          "id": "platform-engineering-vs-sre-devops",
          "title": "Platform Engineering vs SRE vs DevOps"
        },
        {
          "id": "cognitive-load-platform",
          "title": "Cognitive Load Reduction"
        },
        {
          "id": "platform-personas",
          "title": "Platform Personas"
        },
        {
          "id": "platform-vision-strategy",
          "title": "Platform Vision & Strategy"
        }
      ]
    },
    {
      "id": "platform-engineering-fundamentals--platform-success-metrics-related-topics",
      "title": "Platform Success Metrics & Related Topics",
      "leaves": [
        {
          "id": "platform-success-metrics",
          "title": "Platform Success Metrics"
        },
        {
          "id": "platform-funding-models",
          "title": "Platform Funding Models"
        },
        {
          "id": "platform-community-cnoe",
          "title": "CNOE & Platform Community"
        }
      ]
    }
  ],
  "idp-tools": [
    {
      "id": "backstage-idp",
      "title": "Spotify Backstage",
      "leaves": [
        {
          "id": "backstage-catalog",
          "title": "Software Catalog"
        },
        {
          "id": "backstage-techdocs",
          "title": "TechDocs"
        },
        {
          "id": "backstage-plugins",
          "title": "Plugins"
        },
        {
          "id": "backstage-scaffolder",
          "title": "Scaffolder (Software Templates)"
        },
        {
          "id": "backstage-search",
          "title": "Backstage Search"
        },
        {
          "id": "backstage-cost-insights",
          "title": "Cost Insights"
        },
        {
          "id": "backstage-permission-framework",
          "title": "Permission Framework"
        },
        {
          "id": "red-hat-developer-hub",
          "title": "Red Hat Developer Hub (Backstage Distro)"
        },
        {
          "id": "spotify-portal-backstage",
          "title": "Spotify Portal for Backstage"
        }
      ]
    },
    {
      "id": "idp-tools--port-related-topics",
      "title": "Port & Related Topics",
      "leaves": [
        {
          "id": "port-idp",
          "title": "Port"
        },
        {
          "id": "cortex-idp",
          "title": "Cortex"
        },
        {
          "id": "humanitec",
          "title": "Humanitec"
        },
        {
          "id": "opslevel",
          "title": "OpsLevel"
        },
        {
          "id": "compass-atlassian",
          "title": "Atlassian Compass"
        },
        {
          "id": "roadie-backstage",
          "title": "Roadie (Managed Backstage)"
        }
      ]
    },
    {
      "id": "idp-tools--configure8-related-topics",
      "title": "Configure8 & Related Topics",
      "leaves": [
        {
          "id": "configure8",
          "title": "Configure8"
        },
        {
          "id": "kratix-idp",
          "title": "Kratix"
        },
        {
          "id": "choreo-wso2",
          "title": "WSO2 Choreo"
        },
        {
          "id": "qovery-idp",
          "title": "Qovery"
        }
      ]
    },
    {
      "id": "idp-building-blocks",
      "title": "IDP Building Blocks",
      "leaves": [
        {
          "id": "service-catalogs",
          "title": "Service Catalogs"
        },
        {
          "id": "developer-portals",
          "title": "Developer Portals"
        },
        {
          "id": "workload-specs",
          "title": "Workload Specifications (e.g. Score)"
        },
        {
          "id": "open-app-model-oam",
          "title": "Open Application Model (OAM) & KubeVela"
        },
        {
          "id": "crossplane-as-idp-engine",
          "title": "Crossplane as IDP Engine"
        },
        {
          "id": "argo-as-idp-engine",
          "title": "Argo CD/Workflows as IDP Engine"
        }
      ]
    }
  ],
  "golden-paths-templates": [
    {
      "id": "golden-paths-templates--golden-paths-concept-related-topics",
      "title": "Golden Paths Concept & Related Topics",
      "leaves": [
        {
          "id": "golden-paths-concept",
          "title": "Golden Paths Concept"
        },
        {
          "id": "paved-roads",
          "title": "Paved Roads"
        },
        {
          "id": "software-templates",
          "title": "Software Templates"
        },
        {
          "id": "scaffolders",
          "title": "Scaffolders"
        }
      ]
    },
    {
      "id": "scaffolding-tools",
      "title": "Scaffolding Tools",
      "leaves": [
        {
          "id": "cookiecutter",
          "title": "Cookiecutter"
        },
        {
          "id": "yeoman",
          "title": "Yeoman"
        },
        {
          "id": "plop-tool",
          "title": "Plop"
        },
        {
          "id": "projen-tool",
          "title": "Projen"
        },
        {
          "id": "copier-tool",
          "title": "Copier"
        },
        {
          "id": "backstage-templates-tool",
          "title": "Backstage Templates"
        }
      ]
    },
    {
      "id": "golden-paths-templates--reusable-pipelines-workflows-related-topics",
      "title": "Reusable Pipelines & Workflows & Related Topics",
      "leaves": [
        {
          "id": "reusable-pipelines",
          "title": "Reusable Pipelines & Workflows"
        },
        {
          "id": "reusable-iac-modules",
          "title": "Reusable IaC Modules"
        },
        {
          "id": "paved-road-vs-guardrails",
          "title": "Paved Roads vs Guardrails"
        },
        {
          "id": "golden-path-governance",
          "title": "Golden Path Governance & Evolution"
        }
      ]
    }
  ],
  "developer-self-service": [
    {
      "id": "developer-self-service--core-linux-systems",
      "title": "Core Linux Systems",
      "leaves": [
        {
          "id": "developer-self-service-overview",
          "title": "Self-Service Overview"
        },
        {
          "id": "self-service-environments",
          "title": "Self-Service Environments"
        }
      ]
    },
    {
      "id": "ephemeral-environments",
      "title": "Ephemeral Environments",
      "leaves": [
        {
          "id": "preview-envs",
          "title": "Preview Environments"
        },
        {
          "id": "pr-environments",
          "title": "PR Environments"
        },
        {
          "id": "vcluster",
          "title": "vCluster"
        },
        {
          "id": "okteto",
          "title": "Okteto"
        },
        {
          "id": "qovery-ephemeral",
          "title": "Qovery Preview Envs"
        },
        {
          "id": "release-app",
          "title": "Release.app"
        },
        {
          "id": "shipa-platform",
          "title": "Shipa"
        }
      ]
    },
    {
      "id": "dev-environment-as-code",
      "title": "Development Environment as Code",
      "leaves": [
        {
          "id": "github-codespaces",
          "title": "GitHub Codespaces"
        },
        {
          "id": "gitpod-flex",
          "title": "Gitpod Flex"
        },
        {
          "id": "coder-platform",
          "title": "Coder"
        },
        {
          "id": "devpod",
          "title": "DevPod (Loft)"
        },
        {
          "id": "devcontainers",
          "title": "Dev Containers"
        },
        {
          "id": "jetbrains-space-codewith",
          "title": "JetBrains CodeWithMe / Space (Legacy)"
        }
      ]
    },
    {
      "id": "dev-experience-tools",
      "title": "Developer Experience (DevEx) Tools",
      "leaves": [
        {
          "id": "tilt",
          "title": "Tilt"
        },
        {
          "id": "skaffold",
          "title": "Skaffold"
        },
        {
          "id": "devspace",
          "title": "DevSpace"
        },
        {
          "id": "telepresence",
          "title": "Telepresence"
        },
        {
          "id": "mirrord",
          "title": "mirrord"
        },
        {
          "id": "garden-io",
          "title": "Garden"
        }
      ]
    },
    {
      "id": "developer-self-service--devex-metrics-space-dx-core-4-related-topics",
      "title": "DevEx Metrics (SPACE, DX Core 4) & Related Topics",
      "leaves": [
        {
          "id": "devex-metrics",
          "title": "DevEx Metrics (SPACE, DX Core 4)"
        },
        {
          "id": "inner-loop-vs-outer-loop",
          "title": "Inner Loop vs Outer Loop"
        },
        {
          "id": "developer-feedback",
          "title": "Developer Feedback Loops"
        }
      ]
    }
  ],
  "finops-principles": [
    {
      "id": "finops-principles--finops-foundation-framework",
      "title": "FinOps Foundation Framework",
      "leaves": [
        {
          "id": "finops-foundation-framework",
          "title": "FinOps Foundation Framework"
        }
      ]
    },
    {
      "id": "finops-phases",
      "title": "FinOps Lifecycle Phases",
      "leaves": [
        {
          "id": "finops-inform-phase",
          "title": "Inform Phase"
        },
        {
          "id": "finops-optimize-phase",
          "title": "Optimize Phase"
        },
        {
          "id": "finops-operate-phase",
          "title": "Operate Phase"
        }
      ]
    },
    {
      "id": "finops-domains",
      "title": "FinOps Domains",
      "leaves": [
        {
          "id": "understand-cloud-usage",
          "title": "Understand Cloud Usage & Cost"
        },
        {
          "id": "manage-cloud-rate",
          "title": "Manage Cloud Rate"
        },
        {
          "id": "manage-cloud-usage",
          "title": "Manage Cloud Usage"
        },
        {
          "id": "plan-forecast-cloud",
          "title": "Plan & Forecast"
        }
      ]
    },
    {
      "id": "finops-principles--finops-personas-teams-related-topics",
      "title": "FinOps Personas & Teams & Related Topics",
      "leaves": [
        {
          "id": "finops-personas",
          "title": "FinOps Personas & Teams"
        },
        {
          "id": "finops-maturity",
          "title": "FinOps Maturity (Crawl, Walk, Run)"
        },
        {
          "id": "unit-economics",
          "title": "Unit Economics & Unit Cost"
        },
        {
          "id": "showback-chargeback",
          "title": "Showback vs Chargeback"
        },
        {
          "id": "finops-and-sustainability",
          "title": "FinOps & Sustainability"
        },
        {
          "id": "finops-certifications",
          "title": "FinOps Certifications (FOCP, FOCA)"
        }
      ]
    }
  ],
  "cost-visibility-tagging": [
    {
      "id": "cost-visibility-tagging--git-core-mechanics",
      "title": "Git Core Mechanics",
      "leaves": [
        {
          "id": "cost-allocation-tagging-strategy",
          "title": "Tagging & Labeling Strategy"
        },
        {
          "id": "mandatory-tag-policies",
          "title": "Mandatory Tag Policies"
        },
        {
          "id": "cost-categories-aws",
          "title": "AWS Cost Categories"
        }
      ]
    },
    {
      "id": "native-cloud-cost-tools",
      "title": "Native Cloud Cost Tools",
      "leaves": [
        {
          "id": "aws-cost-explorer",
          "title": "AWS Cost Explorer & CUR"
        },
        {
          "id": "aws-budgets",
          "title": "AWS Budgets"
        },
        {
          "id": "azure-cost-management",
          "title": "Azure Cost Management"
        },
        {
          "id": "gcp-billing",
          "title": "GCP Billing Reports & BigQuery Export"
        }
      ]
    },
    {
      "id": "commercial-finops-platforms",
      "title": "Commercial FinOps Platforms",
      "leaves": [
        {
          "id": "apptio-cloudability",
          "title": "IBM Apptio Cloudability"
        },
        {
          "id": "flexera-one",
          "title": "Flexera One"
        },
        {
          "id": "cloudhealth-vmware",
          "title": "CloudHealth (VMware)"
        },
        {
          "id": "finout",
          "title": "Finout"
        },
        {
          "id": "vantage-finops",
          "title": "Vantage"
        },
        {
          "id": "cloudzero",
          "title": "CloudZero"
        },
        {
          "id": "spot-by-netapp",
          "title": "Spot by NetApp"
        },
        {
          "id": "harness-cloud-cost",
          "title": "Harness Cloud Cost Management"
        },
        {
          "id": "densify",
          "title": "Densify"
        },
        {
          "id": "antimetal",
          "title": "Antimetal"
        }
      ]
    },
    {
      "id": "cost-visibility-tagging--focus-finops-open-cost-usage-spec-related-topics",
      "title": "FOCUS (FinOps Open Cost & Usage Spec) & Related Topics",
      "leaves": [
        {
          "id": "focus-spec",
          "title": "FOCUS (FinOps Open Cost & Usage Spec)"
        },
        {
          "id": "cost-dashboards-grafana",
          "title": "Cost Dashboards in Grafana"
        },
        {
          "id": "anomaly-detection-cost",
          "title": "Cost Anomaly Detection"
        },
        {
          "id": "cost-forecasting",
          "title": "Cost Forecasting"
        }
      ]
    }
  ],
  "cost-optimization": [
    {
      "id": "cost-optimization--rightsizing-resources",
      "title": "Rightsizing Resources",
      "leaves": [
        {
          "id": "rightsizing-resources",
          "title": "Rightsizing Resources"
        }
      ]
    },
    {
      "id": "commitment-discounts",
      "title": "Commitment-Based Discounts",
      "leaves": [
        {
          "id": "aws-reserved-instances",
          "title": "AWS Reserved Instances"
        },
        {
          "id": "aws-savings-plans",
          "title": "AWS Savings Plans"
        },
        {
          "id": "azure-reservations",
          "title": "Azure Reservations & Savings Plans"
        },
        {
          "id": "gcp-committed-use",
          "title": "GCP Committed Use Discounts"
        },
        {
          "id": "gcp-flex-cuds",
          "title": "GCP Flexible CUDs"
        }
      ]
    },
    {
      "id": "spot-preemptible",
      "title": "Spot / Preemptible Compute",
      "leaves": [
        {
          "id": "aws-spot-instances",
          "title": "AWS Spot"
        },
        {
          "id": "azure-spot-vms",
          "title": "Azure Spot VMs"
        },
        {
          "id": "gcp-spot-vms",
          "title": "GCP Spot VMs"
        },
        {
          "id": "karpenter-spot",
          "title": "Karpenter with Spot"
        },
        {
          "id": "cast-ai",
          "title": "CAST AI"
        }
      ]
    },
    {
      "id": "cost-optimization--autoscaling-for-cost-related-topics",
      "title": "Autoscaling for Cost & Related Topics",
      "leaves": [
        {
          "id": "autoscaling-cost",
          "title": "Autoscaling for Cost"
        },
        {
          "id": "idle-resource-cleanup",
          "title": "Idle Resource Cleanup"
        },
        {
          "id": "storage-tiering",
          "title": "Storage Tiering & Lifecycle Policies"
        },
        {
          "id": "data-transfer-optimization",
          "title": "Data Transfer Optimization"
        },
        {
          "id": "cost-aware-architecture",
          "title": "Cost-Aware Architecture"
        },
        {
          "id": "finops-toolchains-iac",
          "title": "FinOps in IaC (Infracost, Cycloid)"
        }
      ]
    }
  ],
  "database-lifecycle": [
    {
      "id": "database-lifecycle--database-provisioning-related-topics",
      "title": "Database Provisioning & Related Topics",
      "leaves": [
        {
          "id": "db-provisioning",
          "title": "Database Provisioning"
        },
        {
          "id": "db-as-iac",
          "title": "Databases as IaC (Operators, Crossplane)"
        }
      ]
    },
    {
      "id": "db-operators-on-k8s",
      "title": "Database Operators on Kubernetes",
      "leaves": [
        {
          "id": "cloudnativepg",
          "title": "CloudNativePG (Postgres)"
        },
        {
          "id": "zalando-postgres-operator",
          "title": "Zalando Postgres Operator"
        },
        {
          "id": "percona-operators",
          "title": "Percona Operators"
        },
        {
          "id": "mariadb-operator",
          "title": "MariaDB Operator"
        },
        {
          "id": "mongodb-community-operator",
          "title": "MongoDB Community Operator"
        },
        {
          "id": "vitess-operator",
          "title": "Vitess Operator"
        },
        {
          "id": "crunchy-postgres-operator",
          "title": "Crunchy Postgres Operator"
        },
        {
          "id": "redis-operator",
          "title": "Redis Operator"
        },
        {
          "id": "strimzi-kafka",
          "title": "Strimzi (Kafka)"
        }
      ]
    },
    {
      "id": "managed-db-services",
      "title": "Managed DB Services (Operations Perspective)",
      "leaves": [
        {
          "id": "aws-rds-ops",
          "title": "AWS RDS / Aurora"
        },
        {
          "id": "azure-sql-cosmos",
          "title": "Azure SQL & Cosmos DB"
        },
        {
          "id": "gcp-cloud-sql-spanner",
          "title": "GCP Cloud SQL & Spanner"
        },
        {
          "id": "planetscale-ops",
          "title": "PlanetScale"
        },
        {
          "id": "neon-ops",
          "title": "Neon"
        },
        {
          "id": "supabase-ops",
          "title": "Supabase"
        },
        {
          "id": "mongodb-atlas-ops",
          "title": "MongoDB Atlas"
        },
        {
          "id": "cockroachdb-cloud",
          "title": "CockroachDB Cloud"
        }
      ]
    },
    {
      "id": "database-lifecycle--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "db-backup-restore",
          "title": "Backup & Restore"
        }
      ]
    },
    {
      "id": "db-backup-tools",
      "title": "Database Backup Tools",
      "leaves": [
        {
          "id": "pgbackrest",
          "title": "pgBackRest (Postgres)"
        },
        {
          "id": "barman-pg",
          "title": "Barman (Postgres)"
        },
        {
          "id": "wal-g",
          "title": "WAL-G"
        },
        {
          "id": "velero-db",
          "title": "Velero for Stateful Workloads"
        },
        {
          "id": "kasten-k10",
          "title": "Kasten K10"
        },
        {
          "id": "percona-xtrabackup",
          "title": "Percona XtraBackup"
        }
      ]
    },
    {
      "id": "database-lifecycle--high-availability-replication-related-topics",
      "title": "High Availability & Replication & Related Topics",
      "leaves": [
        {
          "id": "db-ha-replication",
          "title": "High Availability & Replication"
        },
        {
          "id": "db-dr-strategy",
          "title": "Database Disaster Recovery"
        },
        {
          "id": "db-observability",
          "title": "Database Observability"
        },
        {
          "id": "db-capacity-planning",
          "title": "Database Capacity Planning"
        }
      ]
    },
    {
      "id": "database-proxies",
      "title": "Database Proxies & Connection Pooling",
      "leaves": [
        {
          "id": "pgbouncer",
          "title": "PgBouncer (Postgres)"
        },
        {
          "id": "pgpool-ii",
          "title": "Pgpool-II (Postgres)"
        },
        {
          "id": "proxysql",
          "title": "ProxySQL (MySQL)"
        },
        {
          "id": "aws-rds-proxy",
          "title": "AWS RDS Proxy"
        },
        {
          "id": "mysql-router",
          "title": "MySQL Router"
        },
        {
          "id": "haproxy-for-databases",
          "title": "HAProxy for Databases"
        },
        {
          "id": "maxscale-mariadb",
          "title": "MariaDB MaxScale"
        },
        {
          "id": "pgcat",
          "title": "PgCat"
        },
        {
          "id": "pgagroal",
          "title": "pgagroal"
        },
        {
          "id": "odyssey-pg-proxy",
          "title": "Yandex Odyssey"
        }
      ]
    },
    {
      "id": "database-observability",
      "title": "Database Observability & Performance",
      "leaves": [
        {
          "id": "pganalyze",
          "title": "pganalyze"
        },
        {
          "id": "datadog-database-monitoring",
          "title": "Datadog Database Monitoring (DBM)"
        },
        {
          "id": "percona-pmm",
          "title": "Percona Monitoring & Management (PMM)"
        },
        {
          "id": "solarwinds-dpa",
          "title": "SolarWinds Database Performance Analyzer"
        },
        {
          "id": "aws-rds-performance-insights",
          "title": "AWS RDS Performance Insights"
        },
        {
          "id": "azure-sql-insights",
          "title": "Azure SQL Insights"
        },
        {
          "id": "gcp-cloud-sql-insights",
          "title": "GCP Cloud SQL Insights"
        },
        {
          "id": "vivid-cortex-splunk",
          "title": "VividCortex (Splunk DB)"
        },
        {
          "id": "ottertune",
          "title": "OtterTune"
        },
        {
          "id": "releem",
          "title": "Releem"
        },
        {
          "id": "mongodb-ops-manager",
          "title": "MongoDB Ops Manager / Cloud Manager"
        },
        {
          "id": "redis-insight",
          "title": "Redis Insight"
        }
      ]
    },
    {
      "id": "test-data-management",
      "title": "Test Data Management & Synthetic Data",
      "leaves": [
        {
          "id": "tonic-ai",
          "title": "Tonic.ai"
        },
        {
          "id": "gretel-ai",
          "title": "Gretel.ai"
        },
        {
          "id": "synthesized-tdm",
          "title": "Synthesized"
        },
        {
          "id": "mostly-ai",
          "title": "MOSTLY AI"
        },
        {
          "id": "delphix-platform",
          "title": "Delphix Continuous Data Platform"
        },
        {
          "id": "redgate-sql-provision",
          "title": "Redgate SQL Provision / Test Data Manager"
        },
        {
          "id": "k2view-tdm",
          "title": "K2View Test Data Management"
        },
        {
          "id": "curiosity-test-modeller",
          "title": "Curiosity Test Modeller"
        },
        {
          "id": "datprof-tdm",
          "title": "DATPROF"
        },
        {
          "id": "neosync",
          "title": "Neosync (Open Source)"
        }
      ]
    },
    {
      "id": "managed-migration-services",
      "title": "Managed Database Migration Services",
      "leaves": [
        {
          "id": "aws-dms",
          "title": "AWS Database Migration Service"
        },
        {
          "id": "azure-database-migration-service",
          "title": "Azure Database Migration Service"
        },
        {
          "id": "gcp-database-migration-service",
          "title": "GCP Database Migration Service"
        },
        {
          "id": "striim-platform",
          "title": "Striim"
        },
        {
          "id": "qlik-replicate",
          "title": "Qlik Replicate (Attunity)"
        },
        {
          "id": "oracle-goldengate",
          "title": "Oracle GoldenGate"
        },
        {
          "id": "fivetran-cross-ref",
          "title": "Fivetran (Cross-Reference)"
        },
        {
          "id": "airbyte-cross-ref",
          "title": "Airbyte (Cross-Reference)"
        },
        {
          "id": "matillion-data-loader",
          "title": "Matillion Data Loader"
        },
        {
          "id": "arcion-replication",
          "title": "Databricks Arcion"
        }
      ]
    }
  ],
  "schema-migrations": [
    {
      "id": "schema-migrations--schema-migration-concepts",
      "title": "Schema Migration Concepts",
      "leaves": [
        {
          "id": "schema-migration-concepts",
          "title": "Schema Migration Concepts"
        }
      ]
    },
    {
      "id": "schema-migration-tools",
      "title": "Schema Migration Tools",
      "leaves": [
        {
          "id": "liquibase",
          "title": "Liquibase"
        },
        {
          "id": "flyway",
          "title": "Flyway"
        },
        {
          "id": "atlas-ariga",
          "title": "Atlas (Ariga)"
        },
        {
          "id": "bytebase",
          "title": "Bytebase"
        },
        {
          "id": "sqitch",
          "title": "Sqitch"
        },
        {
          "id": "goose-pressly",
          "title": "Goose (Pressly)"
        },
        {
          "id": "dbmate",
          "title": "dbmate"
        },
        {
          "id": "alembic-sqla",
          "title": "Alembic (SQLAlchemy)"
        },
        {
          "id": "prisma-migrate",
          "title": "Prisma Migrate"
        },
        {
          "id": "knex-migrations",
          "title": "Knex Migrations"
        },
        {
          "id": "spinach-go-migrate",
          "title": "golang-migrate"
        }
      ]
    },
    {
      "id": "zero-downtime-migrations",
      "title": "Zero-Downtime Migration Patterns",
      "leaves": [
        {
          "id": "expand-contract",
          "title": "Expand–Contract"
        },
        {
          "id": "double-write-pattern",
          "title": "Double-Write"
        },
        {
          "id": "shadow-table-pattern",
          "title": "Shadow Tables"
        },
        {
          "id": "online-ddl",
          "title": "Online DDL"
        },
        {
          "id": "gh-ost",
          "title": "gh-ost"
        },
        {
          "id": "pt-online-schema-change",
          "title": "pt-online-schema-change"
        },
        {
          "id": "spirit-postgres",
          "title": "Spirit (Postgres)"
        }
      ]
    },
    {
      "id": "schema-migrations--rollback-forward-only-strategies-related-topics",
      "title": "Rollback & Forward-Only Strategies & Related Topics",
      "leaves": [
        {
          "id": "rollback-strategy-db",
          "title": "Rollback & Forward-Only Strategies"
        },
        {
          "id": "migration-testing",
          "title": "Migration Testing"
        }
      ]
    }
  ],
  "dataops-principles": [
    {
      "id": "dataops-principles--dataops-definition-related-topics",
      "title": "DataOps Definition & Related Topics",
      "leaves": [
        {
          "id": "dataops-definition",
          "title": "DataOps Definition"
        },
        {
          "id": "dataops-manifesto",
          "title": "DataOps Manifesto"
        },
        {
          "id": "data-lifecycle",
          "title": "Data Lifecycle"
        },
        {
          "id": "data-mesh-overview",
          "title": "Data Mesh (Overview)"
        },
        {
          "id": "data-contracts",
          "title": "Data Contracts"
        },
        {
          "id": "data-lineage",
          "title": "Data Lineage (OpenLineage, Marquez)"
        }
      ]
    },
    {
      "id": "data-quality-tools",
      "title": "Data Quality Tools",
      "leaves": [
        {
          "id": "great-expectations",
          "title": "Great Expectations"
        },
        {
          "id": "soda-core",
          "title": "Soda Core / Soda Cloud"
        },
        {
          "id": "monte-carlo-data",
          "title": "Monte Carlo Data"
        },
        {
          "id": "bigeye",
          "title": "Bigeye"
        },
        {
          "id": "datafold",
          "title": "Datafold"
        },
        {
          "id": "elementary-data",
          "title": "Elementary Data"
        }
      ]
    },
    {
      "id": "data-catalog-tools",
      "title": "Data Catalog & Governance Tools",
      "leaves": [
        {
          "id": "datahub",
          "title": "DataHub"
        },
        {
          "id": "apache-atlas",
          "title": "Apache Atlas"
        },
        {
          "id": "amundsen",
          "title": "Amundsen"
        },
        {
          "id": "openmetadata",
          "title": "OpenMetadata"
        },
        {
          "id": "alation",
          "title": "Alation"
        },
        {
          "id": "collibra",
          "title": "Collibra"
        },
        {
          "id": "unity-catalog",
          "title": "Databricks Unity Catalog"
        }
      ]
    },
    {
      "id": "dataops-principles--data-observability-related-topics",
      "title": "Data Observability & Related Topics",
      "leaves": [
        {
          "id": "data-observability",
          "title": "Data Observability"
        },
        {
          "id": "data-platform-engineering",
          "title": "Data Platform Engineering"
        }
      ]
    }
  ],
  "data-pipeline-orchestration": [
    {
      "id": "workflow-orchestrators",
      "title": "Workflow Orchestrators",
      "leaves": [
        {
          "id": "apache-airflow",
          "title": "Apache Airflow"
        },
        {
          "id": "dagster",
          "title": "Dagster"
        },
        {
          "id": "prefect",
          "title": "Prefect"
        },
        {
          "id": "mage-ai",
          "title": "Mage AI"
        },
        {
          "id": "kestra",
          "title": "Kestra"
        },
        {
          "id": "temporal-data",
          "title": "Temporal (for Data Workflows)"
        },
        {
          "id": "flyte",
          "title": "Flyte"
        },
        {
          "id": "argo-workflows-data",
          "title": "Argo Workflows (Data Use Cases)"
        },
        {
          "id": "luigi-spotify",
          "title": "Luigi (Legacy)"
        }
      ]
    },
    {
      "id": "data-pipeline-orchestration--dbt-data-build-tool-orchestration-related-topics",
      "title": "dbt (Data Build Tool) Orchestration & Related Topics",
      "leaves": [
        {
          "id": "dbt-orchestration",
          "title": "dbt (Data Build Tool) Orchestration"
        },
        {
          "id": "sqlmesh",
          "title": "SQLMesh"
        }
      ]
    },
    {
      "id": "streaming-platforms-ops",
      "title": "Streaming Platforms (Ops)",
      "leaves": [
        {
          "id": "kafka-ops",
          "title": "Apache Kafka"
        },
        {
          "id": "redpanda",
          "title": "Redpanda"
        },
        {
          "id": "pulsar",
          "title": "Apache Pulsar"
        },
        {
          "id": "nats-jetstream",
          "title": "NATS JetStream"
        },
        {
          "id": "rabbitmq-ops",
          "title": "RabbitMQ"
        }
      ]
    },
    {
      "id": "data-pipeline-orchestration--cdc-tools-debezium-airbyte-related-topics",
      "title": "CDC Tools (Debezium, Airbyte) & Related Topics",
      "leaves": [
        {
          "id": "cdc-tools",
          "title": "CDC Tools (Debezium, Airbyte)"
        },
        {
          "id": "pipeline-as-code-data",
          "title": "Pipeline-as-Code for Data"
        },
        {
          "id": "reverse-etl",
          "title": "Reverse ETL (Hightouch, Census)"
        }
      ]
    }
  ],
  "mlops-fundamentals": [
    {
      "id": "mlops-fundamentals--what-is-mlops-related-topics",
      "title": "What is MLOps? & Related Topics",
      "leaves": [
        {
          "id": "mlops-definition",
          "title": "What is MLOps?"
        },
        {
          "id": "ml-lifecycle",
          "title": "ML Lifecycle (CRISP-ML(Q))"
        },
        {
          "id": "mlops-maturity-models",
          "title": "MLOps Maturity Models (Google, Microsoft)"
        },
        {
          "id": "ml-vs-traditional-cicd",
          "title": "ML vs Traditional CI/CD"
        }
      ]
    },
    {
      "id": "ml-pipeline-tools",
      "title": "ML Pipeline & Orchestration Tools",
      "leaves": [
        {
          "id": "kubeflow",
          "title": "Kubeflow"
        },
        {
          "id": "mlflow",
          "title": "MLflow"
        },
        {
          "id": "metaflow",
          "title": "Metaflow (Netflix)"
        },
        {
          "id": "zenml",
          "title": "ZenML"
        },
        {
          "id": "flyte-ml",
          "title": "Flyte for ML"
        },
        {
          "id": "airflow-ml",
          "title": "Airflow for ML"
        }
      ]
    },
    {
      "id": "feature-stores",
      "title": "Feature Stores",
      "leaves": [
        {
          "id": "feast",
          "title": "Feast"
        },
        {
          "id": "tecton",
          "title": "Tecton"
        },
        {
          "id": "hopsworks",
          "title": "Hopsworks"
        },
        {
          "id": "vertex-feature-store",
          "title": "Vertex AI Feature Store"
        },
        {
          "id": "sagemaker-feature-store",
          "title": "SageMaker Feature Store"
        }
      ]
    },
    {
      "id": "experiment-tracking",
      "title": "Experiment Tracking",
      "leaves": [
        {
          "id": "mlflow-tracking",
          "title": "MLflow Tracking"
        },
        {
          "id": "weights-biases",
          "title": "Weights & Biases"
        },
        {
          "id": "comet-ml",
          "title": "Comet ML"
        },
        {
          "id": "neptune-ai",
          "title": "Neptune.ai"
        },
        {
          "id": "aim-stack",
          "title": "Aim"
        }
      ]
    },
    {
      "id": "model-registry",
      "title": "Model Registries",
      "leaves": [
        {
          "id": "mlflow-registry",
          "title": "MLflow Registry"
        },
        {
          "id": "sagemaker-registry",
          "title": "SageMaker Model Registry"
        },
        {
          "id": "vertex-model-registry",
          "title": "Vertex AI Model Registry"
        },
        {
          "id": "wandb-registry",
          "title": "W&B Model Registry"
        }
      ]
    },
    {
      "id": "data-version-control-ml",
      "title": "Data & Model Versioning",
      "leaves": [
        {
          "id": "dvc-tool",
          "title": "DVC (Data Version Control)"
        },
        {
          "id": "lakefs",
          "title": "lakeFS"
        },
        {
          "id": "pachyderm",
          "title": "Pachyderm"
        },
        {
          "id": "git-lfs-ml",
          "title": "Git LFS for Models"
        }
      ]
    },
    {
      "id": "mlops-fundamentals--ci-cd-for-ml-cml-etc-related-topics",
      "title": "CI/CD for ML (CML, etc.) & Related Topics",
      "leaves": [
        {
          "id": "cicd-for-ml",
          "title": "CI/CD for ML (CML, etc.)"
        },
        {
          "id": "reproducibility-ml",
          "title": "Reproducibility in ML"
        }
      ]
    }
  ],
  "model-deployment-serving": [
    {
      "id": "serving-frameworks",
      "title": "Model Serving Frameworks",
      "leaves": [
        {
          "id": "kserve",
          "title": "KServe (KFServing)"
        },
        {
          "id": "seldon-core",
          "title": "Seldon Core / Seldon Deploy"
        },
        {
          "id": "bentoml",
          "title": "BentoML"
        },
        {
          "id": "triton-inference-server",
          "title": "NVIDIA Triton Inference Server"
        },
        {
          "id": "torchserve",
          "title": "TorchServe"
        },
        {
          "id": "tf-serving",
          "title": "TensorFlow Serving"
        },
        {
          "id": "ray-serve",
          "title": "Ray Serve"
        },
        {
          "id": "modelmesh",
          "title": "ModelMesh"
        },
        {
          "id": "cog-replicate",
          "title": "Cog (Replicate)"
        }
      ]
    },
    {
      "id": "cloud-ml-platforms",
      "title": "Cloud ML Platforms (Overview)",
      "leaves": [
        {
          "id": "sagemaker-overview",
          "title": "AWS SageMaker"
        },
        {
          "id": "vertex-ai-overview",
          "title": "GCP Vertex AI"
        },
        {
          "id": "azure-ml-overview",
          "title": "Azure ML"
        },
        {
          "id": "databricks-ml",
          "title": "Databricks ML"
        }
      ]
    },
    {
      "id": "deployment-strategies-ml",
      "title": "ML Deployment Strategies",
      "leaves": [
        {
          "id": "shadow-deploy-ml",
          "title": "Shadow Deployment"
        },
        {
          "id": "canary-ml",
          "title": "Canary Releases for ML"
        },
        {
          "id": "champion-challenger",
          "title": "Champion / Challenger"
        },
        {
          "id": "a-b-testing-ml",
          "title": "A/B Testing for ML"
        }
      ]
    },
    {
      "id": "model-deployment-serving--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "batch-vs-online-inference",
          "title": "Batch vs Online Inference"
        }
      ]
    },
    {
      "id": "gpu-accelerator-mgmt",
      "title": "GPU & Accelerator Management",
      "leaves": [
        {
          "id": "nvidia-gpu-operator",
          "title": "NVIDIA GPU Operator"
        },
        {
          "id": "mig-multi-instance-gpu",
          "title": "MIG (Multi-Instance GPU)"
        },
        {
          "id": "gpu-time-slicing",
          "title": "GPU Time-Slicing"
        },
        {
          "id": "amd-rocm",
          "title": "AMD ROCm Operator"
        },
        {
          "id": "aws-neuron",
          "title": "AWS Neuron (Inferentia/Trainium)"
        },
        {
          "id": "tpu-ops",
          "title": "TPU Operations (GCP)"
        }
      ]
    },
    {
      "id": "model-deployment-serving--edge-deployment-onnx-tflite",
      "title": "Edge Deployment (ONNX, TFLite)",
      "leaves": [
        {
          "id": "model-edge-deployment",
          "title": "Edge Deployment (ONNX, TFLite)"
        }
      ]
    }
  ],
  "model-monitoring": [
    {
      "id": "model-monitoring--model-drift-concept-detection-related-topics",
      "title": "Model Drift (Concept & Detection) & Related Topics",
      "leaves": [
        {
          "id": "model-drift",
          "title": "Model Drift (Concept & Detection)"
        },
        {
          "id": "data-drift",
          "title": "Data Drift Detection"
        },
        {
          "id": "concept-drift",
          "title": "Concept Drift Detection"
        },
        {
          "id": "feature-drift",
          "title": "Feature Drift"
        },
        {
          "id": "model-performance-monitoring",
          "title": "Performance Monitoring"
        },
        {
          "id": "data-quality-monitoring-ml",
          "title": "Data Quality Monitoring (ML)"
        }
      ]
    },
    {
      "id": "model-monitoring--fairness-bias-monitoring-related-topics",
      "title": "Fairness & Bias Monitoring & Related Topics",
      "leaves": [
        {
          "id": "fairness-bias-monitoring",
          "title": "Fairness & Bias Monitoring"
        },
        {
          "id": "explainability-shap-lime",
          "title": "Explainability (SHAP, LIME, Alibi)"
        }
      ]
    },
    {
      "id": "ml-observability-platforms",
      "title": "ML Observability Platforms",
      "leaves": [
        {
          "id": "arize-ai",
          "title": "Arize AI"
        },
        {
          "id": "whylabs-whylogs",
          "title": "WhyLabs / whylogs"
        },
        {
          "id": "evidently-ai",
          "title": "Evidently AI"
        },
        {
          "id": "fiddler-ai",
          "title": "Fiddler AI"
        },
        {
          "id": "aporia-ml",
          "title": "Aporia"
        },
        {
          "id": "truera",
          "title": "TruEra"
        },
        {
          "id": "datadog-ml-monitoring",
          "title": "Datadog ML Monitoring"
        }
      ]
    }
  ],
  "llmops": [
    {
      "id": "llmops--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "llmops-vs-mlops",
          "title": "LLMOps vs MLOps"
        }
      ]
    },
    {
      "id": "llm-gateways",
      "title": "LLM Gateways",
      "leaves": [
        {
          "id": "portkey-gateway",
          "title": "Portkey"
        },
        {
          "id": "litellm-gateway",
          "title": "LiteLLM"
        },
        {
          "id": "kong-ai-gateway",
          "title": "Kong AI Gateway"
        },
        {
          "id": "helicone",
          "title": "Helicone"
        },
        {
          "id": "cloudflare-ai-gateway",
          "title": "Cloudflare AI Gateway"
        },
        {
          "id": "martian-router",
          "title": "Martian Router"
        },
        {
          "id": "openrouter",
          "title": "OpenRouter"
        }
      ]
    },
    {
      "id": "prompt-management",
      "title": "Prompt Management & Versioning",
      "leaves": [
        {
          "id": "langfuse",
          "title": "Langfuse"
        },
        {
          "id": "langsmith",
          "title": "LangSmith"
        },
        {
          "id": "humanloop",
          "title": "Humanloop"
        },
        {
          "id": "promptlayer",
          "title": "PromptLayer"
        },
        {
          "id": "agenta",
          "title": "Agenta"
        },
        {
          "id": "promptfoo",
          "title": "promptfoo"
        }
      ]
    },
    {
      "id": "llm-evals",
      "title": "LLM Evaluation",
      "leaves": [
        {
          "id": "ragas",
          "title": "Ragas (RAG Evaluation)"
        },
        {
          "id": "deepeval",
          "title": "DeepEval"
        },
        {
          "id": "lm-evaluation-harness",
          "title": "lm-evaluation-harness (EleutherAI)"
        },
        {
          "id": "trulens",
          "title": "TruLens"
        },
        {
          "id": "arize-phoenix",
          "title": "Arize Phoenix"
        },
        {
          "id": "openai-evals",
          "title": "OpenAI Evals"
        }
      ]
    },
    {
      "id": "llmops--llm-cost-controls-budgets-related-topics",
      "title": "LLM Cost Controls & Budgets & Related Topics",
      "leaves": [
        {
          "id": "llm-cost-controls",
          "title": "LLM Cost Controls & Budgets"
        },
        {
          "id": "llm-caching",
          "title": "LLM Response Caching (GPTCache, etc.)"
        },
        {
          "id": "llm-routing-fallback",
          "title": "Model Routing & Fallback"
        },
        {
          "id": "guardrails-tools",
          "title": "Guardrails (Guardrails AI, NeMo Guardrails)"
        },
        {
          "id": "llm-observability",
          "title": "LLM Observability (Tracing, Spans, OTel GenAI)"
        },
        {
          "id": "self-hosting-llms",
          "title": "Self-Hosting LLMs (vLLM, TGI, Ollama, Llama.cpp)"
        }
      ]
    },
    {
      "id": "llmops--rag-ops-vector-dbs-indexes-related-topics",
      "title": "RAG Ops (Vector DBs, Indexes) & Related Topics",
      "leaves": [
        {
          "id": "rag-ops",
          "title": "RAG Ops (Vector DBs, Indexes)"
        },
        {
          "id": "agent-ops",
          "title": "Agent Ops (Cross-Reference: Agentic AI)"
        }
      ]
    }
  ],
  "aiops-tools": [
    {
      "id": "aiops-tools--system-services-operations",
      "title": "System Services & Operations",
      "leaves": [
        {
          "id": "aiops-definition",
          "title": "AIOps Definition (Gartner)"
        },
        {
          "id": "aiops-use-cases",
          "title": "AIOps Use Cases"
        }
      ]
    },
    {
      "id": "aiops-platforms",
      "title": "AIOps Platforms",
      "leaves": [
        {
          "id": "bigpanda",
          "title": "BigPanda"
        },
        {
          "id": "moogsoft",
          "title": "Moogsoft"
        },
        {
          "id": "dynatrace-davis-ai",
          "title": "Dynatrace Davis AI"
        },
        {
          "id": "newrelic-ai",
          "title": "New Relic AI"
        },
        {
          "id": "datadog-watchdog",
          "title": "Datadog Watchdog"
        },
        {
          "id": "splunk-itsi",
          "title": "Splunk ITSI"
        },
        {
          "id": "pagerduty-aiops",
          "title": "PagerDuty AIOps"
        },
        {
          "id": "servicenow-aiops",
          "title": "ServiceNow AIOps"
        },
        {
          "id": "ibm-instana-ai",
          "title": "IBM Instana AI"
        }
      ]
    },
    {
      "id": "aiops-tools--event-correlation-related-topics",
      "title": "Event Correlation & Related Topics",
      "leaves": [
        {
          "id": "event-correlation-aiops",
          "title": "Event Correlation"
        },
        {
          "id": "anomaly-detection-aiops",
          "title": "Anomaly Detection (Time-Series)"
        },
        {
          "id": "predictive-aiops",
          "title": "Predictive AIOps"
        },
        {
          "id": "root-cause-analysis-ai",
          "title": "AI-Powered Root Cause Analysis"
        }
      ]
    }
  ],
  "documentation-as-code": [
    {
      "id": "documentation-as-code--network-foundations",
      "title": "Network Foundations",
      "leaves": [
        {
          "id": "docs-as-code-principles",
          "title": "Docs-as-Code Principles"
        }
      ]
    },
    {
      "id": "static-site-generators-docs",
      "title": "Static Site Generators for Docs",
      "leaves": [
        {
          "id": "mkdocs-material",
          "title": "MkDocs / Material for MkDocs"
        },
        {
          "id": "docusaurus",
          "title": "Docusaurus (Meta)"
        },
        {
          "id": "antora",
          "title": "Antora (AsciiDoc)"
        },
        {
          "id": "hugo-docs",
          "title": "Hugo"
        },
        {
          "id": "jekyll-docs",
          "title": "Jekyll"
        },
        {
          "id": "sphinx-rtd",
          "title": "Sphinx / Read the Docs"
        },
        {
          "id": "gitbook",
          "title": "GitBook"
        },
        {
          "id": "starlight-astro",
          "title": "Astro Starlight"
        },
        {
          "id": "vitepress",
          "title": "VitePress"
        },
        {
          "id": "nextra",
          "title": "Nextra (Next.js)"
        }
      ]
    },
    {
      "id": "docs-formats",
      "title": "Docs Formats",
      "leaves": [
        {
          "id": "markdown-docs",
          "title": "Markdown / CommonMark"
        },
        {
          "id": "mdx-docs",
          "title": "MDX"
        },
        {
          "id": "asciidoc-docs",
          "title": "AsciiDoc"
        },
        {
          "id": "restructuredtext-docs",
          "title": "reStructuredText"
        }
      ]
    },
    {
      "id": "documentation-as-code--diagrams-as-code-mermaid-plantuml-d2-excalidraw-",
      "title": "Diagrams as Code (Mermaid, PlantUML, D2, Excalidraw) & Related Topics",
      "leaves": [
        {
          "id": "diagrams-as-code",
          "title": "Diagrams as Code (Mermaid, PlantUML, D2, Excalidraw)"
        },
        {
          "id": "api-docs-tooling",
          "title": "API Documentation (OpenAPI UI, Redoc, Slate)"
        },
        {
          "id": "docs-ci",
          "title": "Docs CI / Linting (Vale, markdownlint)"
        },
        {
          "id": "docs-versioning",
          "title": "Docs Versioning & Multi-Version"
        },
        {
          "id": "docs-search",
          "title": "Docs Search (Algolia DocSearch, MeiliSearch)"
        },
        {
          "id": "docs-translation",
          "title": "Docs Translation / i18n"
        }
      ]
    }
  ],
  "runbooks-playbooks": [
    {
      "id": "runbooks-playbooks--essential-reading-references",
      "title": "Essential Reading & References",
      "leaves": [
        {
          "id": "runbook-vs-playbook",
          "title": "Runbook vs Playbook"
        },
        {
          "id": "operational-runbooks",
          "title": "Operational Runbooks"
        },
        {
          "id": "incident-runbooks",
          "title": "Incident Runbooks"
        },
        {
          "id": "runbook-templates",
          "title": "Runbook Templates"
        },
        {
          "id": "executable-runbooks",
          "title": "Executable Runbooks"
        }
      ]
    },
    {
      "id": "runbook-automation-tools",
      "title": "Runbook Automation Tools",
      "leaves": [
        {
          "id": "rundeck",
          "title": "Rundeck (PagerDuty)"
        },
        {
          "id": "stackstorm",
          "title": "StackStorm"
        },
        {
          "id": "ansible-tower-aap",
          "title": "Ansible Automation Platform"
        },
        {
          "id": "shoreline",
          "title": "Shoreline"
        },
        {
          "id": "transposit",
          "title": "Transposit"
        }
      ]
    },
    {
      "id": "chatops-tools",
      "title": "ChatOps Tools",
      "leaves": [
        {
          "id": "slack-bots",
          "title": "Slack Bots"
        },
        {
          "id": "hubot-legacy",
          "title": "Hubot (Legacy)"
        },
        {
          "id": "errbot",
          "title": "Errbot"
        },
        {
          "id": "botkube",
          "title": "BotKube"
        },
        {
          "id": "kubechat",
          "title": "KubeChat"
        },
        {
          "id": "opsdroid",
          "title": "Opsdroid"
        }
      ]
    },
    {
      "id": "runbooks-playbooks--essential-reading-references-4",
      "title": "Essential Reading & References",
      "leaves": [
        {
          "id": "runbook-testing",
          "title": "Runbook Testing & Game Days"
        },
        {
          "id": "ai-generated-runbooks",
          "title": "AI-Generated Runbooks"
        }
      ]
    }
  ],
  "knowledge-management": [
    {
      "id": "wikis-platforms",
      "title": "Wikis & Knowledge Platforms",
      "leaves": [
        {
          "id": "confluence-atlassian",
          "title": "Atlassian Confluence"
        },
        {
          "id": "notion",
          "title": "Notion"
        },
        {
          "id": "bookstack",
          "title": "BookStack"
        },
        {
          "id": "outline-knowledge",
          "title": "Outline"
        },
        {
          "id": "wiki-js",
          "title": "Wiki.js"
        },
        {
          "id": "dokuwiki",
          "title": "DokuWiki"
        },
        {
          "id": "gitbook-wiki",
          "title": "GitBook"
        },
        {
          "id": "slab-wiki",
          "title": "Slab"
        },
        {
          "id": "tettra",
          "title": "Tettra"
        },
        {
          "id": "obsidian-vaults",
          "title": "Obsidian (Teams)"
        }
      ]
    },
    {
      "id": "architectural-decision-records",
      "title": "Architecture Decision Records (ADRs)",
      "leaves": [
        {
          "id": "adr-tools",
          "title": "adr-tools"
        },
        {
          "id": "log4brains",
          "title": "log4brains"
        },
        {
          "id": "pyne-adr",
          "title": "ADR + MkDocs (madr)"
        }
      ]
    },
    {
      "id": "knowledge-management--engineering-handbooks-gitlab-style-related-topic",
      "title": "Engineering Handbooks (GitLab-style) & Related Topics",
      "leaves": [
        {
          "id": "engineering-handbooks",
          "title": "Engineering Handbooks (GitLab-style)"
        },
        {
          "id": "rfc-process",
          "title": "RFC Process"
        },
        {
          "id": "postmortem-knowledge-base",
          "title": "Postmortem Knowledge Base"
        },
        {
          "id": "tribal-knowledge-mitigation",
          "title": "Tribal Knowledge Mitigation"
        },
        {
          "id": "enterprise-search-rag",
          "title": "Enterprise Search & RAG over Docs"
        },
        {
          "id": "ai-doc-assistants",
          "title": "AI Doc Assistants (Glean, Dust, etc.)"
        }
      ]
    }
  ],
  "ai-in-cicd": [
    {
      "id": "ai-in-cicd--ai-in-ci-cd-overview",
      "title": "AI in CI/CD Overview",
      "leaves": [
        {
          "id": "ai-cicd-overview",
          "title": "AI in CI/CD Overview"
        }
      ]
    },
    {
      "id": "llm-code-review",
      "title": "LLM-Powered Code Review",
      "leaves": [
        {
          "id": "github-copilot-review",
          "title": "GitHub Copilot Code Review"
        },
        {
          "id": "coderabbit",
          "title": "CodeRabbit"
        },
        {
          "id": "qodo-merge",
          "title": "Qodo Merge (formerly PR-Agent)"
        },
        {
          "id": "bito-ai-review",
          "title": "Bito AI Code Review"
        },
        {
          "id": "graphite-diamond",
          "title": "Graphite Diamond"
        },
        {
          "id": "greptile-review",
          "title": "Greptile"
        },
        {
          "id": "cursor-bugbot",
          "title": "Cursor Bugbot"
        }
      ]
    },
    {
      "id": "ai-test-generation",
      "title": "AI Test Generation",
      "leaves": [
        {
          "id": "qodo-cover",
          "title": "Qodo Cover"
        },
        {
          "id": "meta-testgen-llm",
          "title": "Meta TestGen-LLM"
        },
        {
          "id": "diffblue",
          "title": "Diffblue Cover"
        },
        {
          "id": "codium-tests",
          "title": "CodiumAI Tests"
        }
      ]
    },
    {
      "id": "ai-in-cicd--ai-powered-flaky-test-detection-related-topics",
      "title": "AI-Powered Flaky Test Detection & Related Topics",
      "leaves": [
        {
          "id": "flaky-test-detection-ai",
          "title": "AI-Powered Flaky Test Detection"
        },
        {
          "id": "ai-triage-bots",
          "title": "AI Triage Bots"
        },
        {
          "id": "auto-rollback-ai",
          "title": "AI-Driven Auto Rollback"
        },
        {
          "id": "ai-commit-pr-summaries",
          "title": "AI Commit & PR Summaries"
        },
        {
          "id": "ai-pipeline-optimization",
          "title": "AI Pipeline Optimization"
        },
        {
          "id": "ai-incident-summarization",
          "title": "AI Incident Summarization"
        }
      ]
    }
  ],
  "ebpf-for-devops": [
    {
      "id": "ebpf-for-devops--concepts-history-comparisons",
      "title": "Concepts, History & Comparisons",
      "leaves": [
        {
          "id": "ebpf-fundamentals",
          "title": "eBPF Fundamentals"
        },
        {
          "id": "ebpf-vs-sidecars",
          "title": "eBPF vs Sidecars"
        }
      ]
    },
    {
      "id": "ebpf-tools-projects",
      "title": "eBPF Tools & Projects",
      "leaves": [
        {
          "id": "cilium-ebpf",
          "title": "Cilium"
        },
        {
          "id": "hubble-ebpf",
          "title": "Hubble"
        },
        {
          "id": "tetragon-ebpf",
          "title": "Tetragon"
        },
        {
          "id": "pixie-ebpf",
          "title": "Pixie"
        },
        {
          "id": "parca",
          "title": "Parca (Continuous Profiling)"
        },
        {
          "id": "pyroscope-ebpf",
          "title": "Grafana Pyroscope"
        },
        {
          "id": "inspektor-gadget",
          "title": "Inspektor Gadget"
        },
        {
          "id": "bpftrace",
          "title": "bpftrace"
        },
        {
          "id": "kepler-ebpf",
          "title": "Kepler (Energy)"
        },
        {
          "id": "kubescape-ebpf",
          "title": "Kubescape (Runtime)"
        }
      ]
    },
    {
      "id": "ebpf-for-devops--ebpf-for-observability-related-topics",
      "title": "eBPF for Observability & Related Topics",
      "leaves": [
        {
          "id": "ebpf-observability",
          "title": "eBPF for Observability"
        },
        {
          "id": "ebpf-security-runtime",
          "title": "eBPF for Runtime Security"
        },
        {
          "id": "ebpf-networking",
          "title": "eBPF for Networking"
        },
        {
          "id": "ebpf-profiling",
          "title": "eBPF for Continuous Profiling"
        }
      ]
    }
  ],
  "webassembly-devops": [
    {
      "id": "webassembly-devops--webassembly-wasm-overview-related-topics",
      "title": "WebAssembly (Wasm) Overview & Related Topics",
      "leaves": [
        {
          "id": "wasm-overview-devops",
          "title": "WebAssembly (Wasm) Overview"
        },
        {
          "id": "wasi-spec",
          "title": "WASI (WebAssembly System Interface)"
        },
        {
          "id": "component-model-wasm",
          "title": "WASM Component Model"
        }
      ]
    },
    {
      "id": "wasm-runtimes",
      "title": "WASM Runtimes",
      "leaves": [
        {
          "id": "wasmtime",
          "title": "Wasmtime (Bytecode Alliance)"
        },
        {
          "id": "wasmer",
          "title": "Wasmer"
        },
        {
          "id": "wasmedge",
          "title": "WasmEdge"
        },
        {
          "id": "wazero",
          "title": "wazero"
        }
      ]
    },
    {
      "id": "wasm-platforms",
      "title": "WASM Platforms & Tooling",
      "leaves": [
        {
          "id": "fermyon-spin",
          "title": "Fermyon Spin"
        },
        {
          "id": "wasmcloud",
          "title": "wasmCloud (CNCF)"
        },
        {
          "id": "krustlet-legacy",
          "title": "Krustlet (Legacy)"
        },
        {
          "id": "fluxlet-wasm-shim",
          "title": "containerd Wasm Shims"
        },
        {
          "id": "wasi-cloud-cli",
          "title": "WASI Cloud CLI"
        }
      ]
    },
    {
      "id": "webassembly-devops--wasm-at-the-edge-related-topics",
      "title": "WASM at the Edge & Related Topics",
      "leaves": [
        {
          "id": "wasm-at-edge",
          "title": "WASM at the Edge"
        },
        {
          "id": "wasm-for-plugins",
          "title": "WASM for Extensibility / Plugins (Envoy, Proxy-Wasm)"
        }
      ]
    }
  ],
  "sustainable-devops": [
    {
      "id": "sustainable-devops--green-software-foundation-related-topics",
      "title": "Green Software Foundation & Related Topics",
      "leaves": [
        {
          "id": "green-software-foundation",
          "title": "Green Software Foundation"
        },
        {
          "id": "sci-spec",
          "title": "SCI (Software Carbon Intensity) Spec"
        },
        {
          "id": "carbon-aware-computing",
          "title": "Carbon-Aware Computing"
        }
      ]
    },
    {
      "id": "sustainability-tools",
      "title": "Sustainability Tools",
      "leaves": [
        {
          "id": "kepler-cncf",
          "title": "Kepler (CNCF Sandbox)"
        },
        {
          "id": "cloud-carbon-footprint",
          "title": "Cloud Carbon Footprint"
        },
        {
          "id": "aws-customer-carbon-tool",
          "title": "AWS Customer Carbon Footprint Tool"
        },
        {
          "id": "gcp-carbon-footprint",
          "title": "GCP Carbon Footprint"
        },
        {
          "id": "azure-emissions-impact",
          "title": "Azure Emissions Impact Dashboard"
        },
        {
          "id": "carbon-aware-sdk",
          "title": "Carbon Aware SDK"
        },
        {
          "id": "klimaat-tool",
          "title": "Klimaat"
        }
      ]
    },
    {
      "id": "sustainable-devops--sustainable-architecture-patterns-related-topics",
      "title": "Sustainable Architecture Patterns & Related Topics",
      "leaves": [
        {
          "id": "sustainable-arch-patterns",
          "title": "Sustainable Architecture Patterns"
        },
        {
          "id": "energy-efficient-coding",
          "title": "Energy-Efficient Coding Practices"
        },
        {
          "id": "csrd-eu-reporting",
          "title": "EU CSRD & Sustainability Reporting (Overview)"
        }
      ]
    }
  ],
  "devops-roles-career": [
    {
      "id": "devops-role-titles",
      "title": "Common Role Titles",
      "leaves": [
        {
          "id": "role-devops-engineer",
          "title": "DevOps Engineer"
        },
        {
          "id": "role-sre",
          "title": "Site Reliability Engineer (SRE)"
        },
        {
          "id": "role-platform-engineer",
          "title": "Platform Engineer"
        },
        {
          "id": "role-cloud-engineer",
          "title": "Cloud Engineer"
        },
        {
          "id": "role-cloud-architect",
          "title": "Cloud Architect"
        },
        {
          "id": "role-release-engineer",
          "title": "Release Engineer"
        },
        {
          "id": "role-build-engineer",
          "title": "Build Engineer"
        },
        {
          "id": "role-devsecops-engineer",
          "title": "DevSecOps Engineer"
        },
        {
          "id": "role-mlops-engineer",
          "title": "MLOps Engineer"
        },
        {
          "id": "role-data-platform-engineer",
          "title": "Data Platform Engineer"
        },
        {
          "id": "role-production-engineer",
          "title": "Production Engineer (Meta-style)"
        },
        {
          "id": "role-systems-engineer",
          "title": "Systems Engineer"
        },
        {
          "id": "role-infrastructure-engineer",
          "title": "Infrastructure Engineer"
        },
        {
          "id": "role-developer-experience",
          "title": "Developer Experience (DevEx) Engineer"
        }
      ]
    },
    {
      "id": "career-levels",
      "title": "Career Levels & Ladders",
      "leaves": [
        {
          "id": "junior-devops",
          "title": "Junior / L3"
        },
        {
          "id": "mid-devops",
          "title": "Mid / L4"
        },
        {
          "id": "senior-devops",
          "title": "Senior / L5"
        },
        {
          "id": "staff-devops",
          "title": "Staff / L6"
        },
        {
          "id": "principal-devops",
          "title": "Principal / L7"
        },
        {
          "id": "distinguished-fellow",
          "title": "Distinguished / Fellow"
        },
        {
          "id": "engineering-management-track",
          "title": "Engineering Management Track"
        }
      ]
    },
    {
      "id": "devops-roles-career--ic-vs-management-tracks-related-topics",
      "title": "IC vs Management Tracks & Related Topics",
      "leaves": [
        {
          "id": "ic-vs-management-track",
          "title": "IC vs Management Tracks"
        },
        {
          "id": "devops-portfolio-projects",
          "title": "Portfolio Projects"
        },
        {
          "id": "devops-resume-cv",
          "title": "Resume / CV for DevOps"
        },
        {
          "id": "devops-system-design-interviews",
          "title": "DevOps System Design Interviews"
        },
        {
          "id": "devops-behavioral-interviews",
          "title": "Behavioral Interviews & STAR"
        },
        {
          "id": "salary-leveling-guides",
          "title": "Salary & Leveling Guides (Levels.fyi, etc.)"
        }
      ]
    },
    {
      "id": "devops-roles-career--consulting-freelance-devops",
      "title": "Consulting & Freelance DevOps",
      "leaves": [
        {
          "id": "consulting-freelance-devops",
          "title": "Consulting & Freelance DevOps"
        }
      ]
    }
  ],
  "devops-certifications": [
    {
      "id": "kubernetes-certifications",
      "title": "Kubernetes Certifications",
      "leaves": [
        {
          "id": "cka",
          "title": "CKA (Certified Kubernetes Administrator)"
        },
        {
          "id": "ckad",
          "title": "CKAD (Certified Kubernetes Application Developer)"
        },
        {
          "id": "cks",
          "title": "CKS (Certified Kubernetes Security Specialist)"
        },
        {
          "id": "kcna",
          "title": "KCNA (Kubernetes & Cloud Native Associate)"
        },
        {
          "id": "kcsa",
          "title": "KCSA (Kubernetes & Cloud Native Security Associate)"
        }
      ]
    },
    {
      "id": "hashicorp-certifications",
      "title": "HashiCorp Certifications",
      "leaves": [
        {
          "id": "terraform-associate",
          "title": "Terraform Associate"
        },
        {
          "id": "vault-associate",
          "title": "Vault Associate"
        },
        {
          "id": "consul-associate",
          "title": "Consul Associate"
        },
        {
          "id": "packer-associate",
          "title": "Packer Associate"
        }
      ]
    },
    {
      "id": "aws-devops-certifications-overview",
      "title": "AWS Certifications (DevOps-relevant)",
      "leaves": [
        {
          "id": "aws-cloud-practitioner",
          "title": "AWS Cloud Practitioner"
        },
        {
          "id": "aws-sysops-admin",
          "title": "AWS SysOps Administrator – Associate"
        },
        {
          "id": "aws-developer-associate",
          "title": "AWS Developer – Associate"
        },
        {
          "id": "aws-solutions-architect-cert",
          "title": "AWS Solutions Architect (Associate / Professional)"
        },
        {
          "id": "aws-devops-pro",
          "title": "AWS DevOps Engineer – Professional"
        },
        {
          "id": "aws-security-specialty",
          "title": "AWS Security – Specialty"
        }
      ]
    },
    {
      "id": "azure-devops-certifications-overview",
      "title": "Azure Certifications (DevOps-relevant)",
      "leaves": [
        {
          "id": "az-104-administrator",
          "title": "AZ-104 (Azure Administrator)"
        },
        {
          "id": "az-204-developer",
          "title": "AZ-204 (Azure Developer)"
        },
        {
          "id": "az-400-devops-engineer",
          "title": "AZ-400 (Azure DevOps Engineer Expert)"
        },
        {
          "id": "az-500-security",
          "title": "AZ-500 (Azure Security Engineer)"
        },
        {
          "id": "az-305-architect",
          "title": "AZ-305 (Azure Solutions Architect)"
        }
      ]
    },
    {
      "id": "gcp-devops-certifications-overview",
      "title": "GCP Certifications (DevOps-relevant)",
      "leaves": [
        {
          "id": "gcp-cloud-engineer",
          "title": "Associate Cloud Engineer"
        },
        {
          "id": "gcp-devops-engineer",
          "title": "Professional Cloud DevOps Engineer"
        },
        {
          "id": "gcp-cloud-architect",
          "title": "Professional Cloud Architect"
        },
        {
          "id": "gcp-security-engineer",
          "title": "Professional Cloud Security Engineer"
        }
      ]
    },
    {
      "id": "platform-vendor-certs",
      "title": "Platform & Vendor Certifications",
      "leaves": [
        {
          "id": "gitlab-certifications",
          "title": "GitLab Certifications"
        },
        {
          "id": "github-actions-cert",
          "title": "GitHub Actions Certification"
        },
        {
          "id": "red-hat-certs-ex",
          "title": "Red Hat (RHCSA, RHCE, EX180 OpenShift)"
        },
        {
          "id": "docker-dca",
          "title": "Docker DCA (Cross-Reference)"
        },
        {
          "id": "argo-certs",
          "title": "Argo / GitOps Certifications"
        },
        {
          "id": "istio-certified-associate",
          "title": "Istio Certified Associate (ICA)"
        },
        {
          "id": "cilium-ccca",
          "title": "Cilium Certified Associate (CCA)"
        },
        {
          "id": "prometheus-pca",
          "title": "Prometheus Certified Associate (PCA)"
        },
        {
          "id": "opentofu-certifications",
          "title": "OpenTofu Certifications (Emerging)"
        },
        {
          "id": "finops-certifications-cross",
          "title": "FinOps Certifications (FOCP)"
        }
      ]
    }
  ]
}
