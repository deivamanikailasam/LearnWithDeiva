/** Auto-generated flat topic groupings — edit flat-groupings-overrides.mjs for manual fixes. */
export const FLAT_GROUPINGS = {
  "container-fundamentals": [
    {
      "id": "container-model",
      "title": "Container Model & Isolation",
      "leaves": [
        {
          "id": "container-isolation-model",
          "title": "Container Isolation Model"
        },
        "containers-vs-vms"
      ]
    },
    {
      "id": "history-ecosystem",
      "title": "History & Ecosystem",
      "leaves": [
        "history-of-containers"
      ]
    },
    {
      "id": "adoption-fit",
      "title": "Adoption & Workload Fit",
      "leaves": [
        {
          "id": "workload-fit-patterns",
          "title": "Workload Fit Patterns"
        },
        {
          "id": "constraints-and-tradeoffs",
          "title": "Constraints & Tradeoffs"
        }
      ]
    }
  ],
  "container-standards": [
    {
      "id": "oci-specifications",
      "title": "OCI Specifications",
      "leaves": [
        "oci-image-spec",
        "oci-runtime-spec",
        "oci-distribution-spec",
        "oci-artifacts"
      ]
    },
    {
      "id": "runtime-interfaces",
      "title": "Runtime Interfaces",
      "leaves": [
        "cri-spec"
      ]
    }
  ],
  "docker-architecture": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-client",
        "docker-daemon",
        "docker-rest-api"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "containerd-component",
        "runc-component",
        "docker-shim"
      ]
    },
    {
      "id": "area-3",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-objects",
        "docker-engine-api-version",
        "docker-objects-relations"
      ]
    }
  ],
  "image-anatomy": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "image-layers",
        "image-manifests",
        "image-config-blob",
        "image-index-manifest-list"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "image-digests",
        "image-history-rootfs",
        "media-types-oci",
        "image-labels-annotations"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "dangling-images-concept",
        "intermediate-images-concept",
        "image-rootfs-extraction"
      ]
    }
  ],
  "image-tagging": [
    {
      "id": "area-1",
      "title": "Image Tagging Fundamentals",
      "leaves": [
        "image-naming-convention",
        "tag-syntax",
        "docker-tag-command",
        "latest-tag-pitfalls"
      ]
    },
    {
      "id": "area-2",
      "title": "Image Tagging Advanced",
      "leaves": [
        "immutable-tags",
        "semantic-version-tags",
        "rolling-vs-pinned-tags",
        "digest-pinning"
      ]
    }
  ],
  "image-caching": [
    {
      "id": "core",
      "title": "Image Caching Core",
      "leaves": [
        "local-image-cache",
        "pull-layer-deduplication",
        "image-store-on-disk",
        "pruning-cache"
      ]
    }
  ],
  "multi-stage-builds": [
    {
      "id": "area-1",
      "title": "Multi-Stage Builds Fundamentals",
      "leaves": [
        "stage-naming",
        "copy-from-stage",
        "target-stage-build",
        "external-images-as-stages"
      ]
    },
    {
      "id": "area-2",
      "title": "Multi-Stage Builds Advanced",
      "leaves": [
        "parallel-stage-builds",
        "final-stage-pattern",
        "builder-runtime-split",
        "test-stage-pattern"
      ]
    }
  ],
  "arg-vs-env": [
    {
      "id": "area-1",
      "title": "ARG vs ENV Fundamentals",
      "leaves": [
        "arg-scope",
        "env-scope",
        "global-args-before-from"
      ]
    },
    {
      "id": "area-2",
      "title": "ARG vs ENV Advanced",
      "leaves": [
        "arg-from-env-pattern",
        "arg-default-values",
        "arg-env-security"
      ]
    }
  ],
  "dockerfile-best-practices": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "layer-ordering-bp",
        "minimizing-image-size",
        "single-process-containers",
        "non-root-users-in-dockerfile",
        "reproducible-builds"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "cleaning-package-caches",
        "pinning-base-images",
        "avoiding-add-vs-copy",
        "combining-run-instructions",
        "using-buildkit-features"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "use-entrypoint-init",
        "dockerfile-lint-hadolint",
        "dockerfile-check-builtin"
      ]
    }
  ],
  "multi-platform-builds-buildx": [
    {
      "id": "area-1",
      "title": "Multi-Platform Builds Fundamentals",
      "leaves": [
        "mp-build-platform-list",
        "mp-build-emulation",
        "mp-build-native-nodes"
      ]
    },
    {
      "id": "area-2",
      "title": "Multi-Platform Builds Advanced",
      "leaves": [
        "mp-build-cross-compilation",
        "mp-build-push-vs-load",
        "mp-build-manifest-output"
      ]
    }
  ],
  "docker-bake": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "bake-files",
        "bake-targets",
        "bake-groups",
        "bake-inheritance"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "bake-hcl-vs-json",
        "bake-variables",
        "bake-matrix",
        "bake-functions"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "bake-overrides",
        "bake-print",
        "bake-call",
        "bake-compose-integration"
      ]
    }
  ],
  "docker-build-cloud": [
    {
      "id": "area-1",
      "title": "Docker Build Cloud Fundamentals",
      "leaves": [
        "build-cloud-overview",
        "build-cloud-setup",
        "build-cloud-shared-cache"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker Build Cloud Advanced",
      "leaves": [
        "build-cloud-native-multiarch",
        "build-cloud-ci-integration",
        "build-cloud-pricing-limits"
      ]
    }
  ],
  "sbom-attestations": [
    {
      "id": "area-1",
      "title": "SBOMs & Attestations Fundamentals",
      "leaves": [
        "sbom-buildx",
        "provenance-attestations",
        "slsa-levels",
        "in-toto-attestations"
      ]
    },
    {
      "id": "area-2",
      "title": "SBOMs & Attestations Advanced",
      "leaves": [
        "reading-attestations",
        "attestation-storage-formats",
        "attestation-registry-layout"
      ]
    }
  ],
  "build-outputs": [
    {
      "id": "area-1",
      "title": "Build Outputs Fundamentals",
      "leaves": [
        "output-type-image",
        "output-type-oci",
        "output-type-docker",
        "output-type-tar"
      ]
    },
    {
      "id": "area-2",
      "title": "Build Outputs Advanced",
      "leaves": [
        "output-type-local",
        "output-type-registry",
        "output-push-load"
      ]
    }
  ],
  "network-commands": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-network-create",
        "docker-network-ls",
        "docker-network-inspect",
        "docker-network-rm"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-network-connect",
        "docker-network-disconnect",
        "docker-network-prune"
      ]
    }
  ],
  "user-defined-networks": [
    {
      "id": "core",
      "title": "User-Defined Networks Core",
      "leaves": [
        "default-bridge-vs-user-defined",
        "network-aliases",
        "multi-network-attachment",
        "internal-networks"
      ]
    }
  ],
  "network-internals": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "iptables-rules",
        "linux-bridge-internals",
        "veth-pairs",
        "netns-namespaces"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "nftables-with-docker",
        "libnetwork",
        "cnm-architecture",
        "docker-link-deprecated"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "firewalld-integration",
        "nftables-recent-engine",
        "docker-rootlesskit-port-driver"
      ]
    }
  ],
  "volume-types": [
    {
      "id": "area-1",
      "title": "Volume Types Fundamentals",
      "leaves": [
        "bind-mounts",
        "named-volumes",
        "anonymous-volumes"
      ]
    },
    {
      "id": "area-2",
      "title": "Volume Types Advanced",
      "leaves": [
        "tmpfs-mounts-volumes",
        "image-volume-instruction"
      ]
    }
  ],
  "volume-commands": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-volume-create",
        "docker-volume-ls",
        "docker-volume-inspect"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-volume-rm",
        "docker-volume-prune",
        "docker-volume-update"
      ]
    }
  ],
  "storage-drivers": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "overlay2-driver",
        "btrfs-driver",
        "zfs-driver"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "vfs-driver",
        "devicemapper-deprecated",
        "aufs-deprecated"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "fuse-overlayfs-rootless",
        "storage-driver-selection",
        "storage-driver-config"
      ]
    }
  ],
  "volume-backup-migration": [
    {
      "id": "core",
      "title": "Volume Backup & Migration Core",
      "leaves": [
        "volume-backup-tar-pattern",
        "volume-restore-pattern",
        "volume-migration-hosts",
        "volume-snapshot-strategies"
      ]
    }
  ],
  "disk-usage": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-system-df",
        "docker-system-prune",
        "docker-system-events",
        "docker-system-info"
      ]
    },
    {
      "id": "area-2",
      "title": "Disk Usage & Cleanup Advanced",
      "leaves": [
        "image-cleanup-strategies",
        "volume-cleanup-strategies",
        "build-cache-cleanup",
        "log-file-rotation-cleanup"
      ]
    }
  ],
  "compose-overview": [
    {
      "id": "core",
      "title": "Compose Overview Core",
      "leaves": [
        "compose-history-v1-v2",
        "compose-vs-swarm-vs-k8s",
        "compose-specification-overview",
        "compose-plugin-cli"
      ]
    }
  ],
  "compose-profiles": [
    {
      "id": "core",
      "title": "Compose Profiles Core",
      "leaves": [
        "profiles-declaration",
        "profile-activation",
        "profiles-and-depends-on"
      ]
    }
  ],
  "compose-include": [
    {
      "id": "core",
      "title": "Compose Include Core",
      "leaves": [
        "include-path",
        "include-project-directory",
        "include-env-file"
      ]
    }
  ],
  "compose-extends": [
    {
      "id": "core",
      "title": "Compose Extends Core",
      "leaves": [
        "extends-service",
        "extends-file",
        "extends-vs-include"
      ]
    }
  ],
  "compose-override-files": [
    {
      "id": "core",
      "title": "Compose Override Files Core",
      "leaves": [
        "override-default-file",
        "override-multiple-files",
        "override-precedence",
        "merge-semantics"
      ]
    }
  ],
  "variable-interpolation": [
    {
      "id": "area-1",
      "title": "Variable Interpolation Fundamentals",
      "leaves": [
        "env-file-default",
        "shell-variables-compose",
        "interpolation-default-values"
      ]
    },
    {
      "id": "area-2",
      "title": "Variable Interpolation Advanced",
      "leaves": [
        "interpolation-required-values",
        "interpolation-empty-default",
        "interpolation-escaping"
      ]
    }
  ],
  "compose-watch": [
    {
      "id": "area-1",
      "title": "Compose Watch Fundamentals",
      "leaves": [
        "watch-actions-sync",
        "watch-actions-rebuild",
        "watch-actions-sync-restart",
        "watch-actions-sync-exec"
      ]
    },
    {
      "id": "area-2",
      "title": "Compose Watch Advanced",
      "leaves": [
        "watch-paths-targets",
        "watch-ignore",
        "watch-include-x-develop",
        "watch-restart-action"
      ]
    }
  ],
  "lifecycle-hooks": [
    {
      "id": "core",
      "title": "Lifecycle Hooks Core",
      "leaves": [
        "post-start-hooks",
        "pre-stop-hooks",
        "lifecycle-hook-options"
      ]
    }
  ],
  "compose-bridge": [
    {
      "id": "core",
      "title": "Compose Bridge Core",
      "leaves": [
        "compose-bridge-convert",
        "compose-bridge-templates",
        "compose-bridge-helm-output",
        "compose-bridge-k8s-output"
      ]
    }
  ],
  "docker-hub": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-hub-accounts",
        "docker-hub-repositories",
        "docker-hub-official-images",
        "docker-hub-verified-publisher"
      ]
    },
    {
      "id": "area-2",
      "title": "Topic Area 2",
      "leaves": [
        "docker-hub-sponsored-oss",
        "automated-builds-hub",
        "docker-hub-webhooks",
        "docker-hub-teams-permissions"
      ]
    },
    {
      "id": "area-3",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-hub-access-tokens",
        "docker-hub-org-access-tokens",
        "docker-hub-rate-limits",
        "docker-hub-scout-integration"
      ]
    },
    {
      "id": "area-4",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-hub-insights",
        "docker-hub-image-vulnerability-insights",
        "docker-hub-tag-immutability-feature",
        "docker-hub-image-management-actions"
      ]
    }
  ],
  "docker-hardened-images": [
    {
      "id": "area-1",
      "title": "Docker Hardened Images Fundamentals",
      "leaves": [
        "dhi-overview",
        "dhi-vs-official-images",
        "dhi-base-image-strategy"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker Hardened Images Advanced",
      "leaves": [
        "dhi-customization",
        "dhi-vulnerability-policies",
        "dhi-attestations"
      ]
    }
  ],
  "registry-api": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "registry-v2-api",
        "oci-distribution-api",
        "manifest-endpoints",
        "blob-endpoints"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "blob-upload-session",
        "tags-listing-endpoint",
        "catalog-endpoint",
        "referrers-api"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "cross-repo-mounting",
        "oci-distribution-spec-v1.1"
      ]
    }
  ],
  "pull-through-cache": [
    {
      "id": "core",
      "title": "Pull-Through Cache Core",
      "leaves": [
        "pull-through-cache-config",
        "pull-through-cache-auth",
        "pull-through-cache-tls"
      ]
    }
  ],
  "registry-mirrors": [
    {
      "id": "core",
      "title": "Registry Mirrors Core",
      "leaves": [
        "registry-mirrors-daemon-json",
        "insecure-registries",
        "allow-nondistributable-artifacts",
        "mirror-failover-behavior"
      ]
    }
  ],
  "sboms": [
    {
      "id": "area-1",
      "title": "SBOMs Fundamentals",
      "leaves": [
        "sbom-overview",
        "syft-tool",
        "cyclonedx-format",
        "spdx-format"
      ]
    },
    {
      "id": "area-2",
      "title": "SBOMs Advanced",
      "leaves": [
        "sbom-distribution",
        "sbom-referrers",
        "sbom-in-builds-docker"
      ]
    }
  ],
  "attestations": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "provenance-attestation",
        "slsa-framework",
        "slsa-build-levels"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "in-toto-spec",
        "attestation-bundles",
        "oci-referrers-attestations"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "vex-and-attestations",
        "verify-attestation-cli",
        "image-provenance-policies"
      ]
    }
  ],
  "base-image-strategy": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "distroless-images",
        "chiseled-images",
        "alpine-images"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "scratch-images",
        "wolfi-os",
        "debian-slim-images"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "busybox-images",
        "static-binary-images",
        "base-image-tradeoffs"
      ]
    }
  ],
  "alternate-runtimes": [
    {
      "id": "area-1",
      "title": "Alternate Runtimes Fundamentals",
      "leaves": [
        "crun-runtime",
        "youki-runtime",
        "kata-containers",
        "gvisor-runsc"
      ]
    },
    {
      "id": "area-2",
      "title": "Alternate Runtimes Advanced",
      "leaves": [
        "firecracker",
        "containerd-runwasi",
        "sysbox-runtime",
        "choosing-a-runtime"
      ]
    }
  ],
  "snapshotters": [
    {
      "id": "area-1",
      "title": "Snapshotters Fundamentals",
      "leaves": [
        "overlayfs-snapshotter",
        "native-snapshotter",
        "btrfs-snapshotter",
        "devmapper-snapshotter"
      ]
    },
    {
      "id": "area-2",
      "title": "Snapshotters Advanced",
      "leaves": [
        "stargz-snapshotter",
        "nydus-snapshotter",
        "fuse-overlayfs-snapshotter",
        "snapshotter-comparison"
      ]
    }
  ],
  "shims": [
    {
      "id": "core",
      "title": "Shims Core",
      "leaves": [
        "shim-protocol-v2",
        "containerd-shim-runc",
        "shim-binary-naming",
        "shim-runtimes-list"
      ]
    }
  ],
  "confidential-containers": [
    {
      "id": "area-1",
      "title": "Confidential Containers Fundamentals",
      "leaves": [
        "confidential-computing-overview",
        "tee-technologies",
        "kata-cc-runtime"
      ]
    },
    {
      "id": "area-2",
      "title": "Confidential Containers Advanced",
      "leaves": [
        "enarx",
        "remote-attestation"
      ]
    }
  ],
  "swarm-architecture": [
    {
      "id": "area-1",
      "title": "Swarm Architecture Fundamentals",
      "leaves": [
        "manager-nodes",
        "worker-nodes",
        "raft-consensus",
        "swarm-quorum"
      ]
    },
    {
      "id": "area-2",
      "title": "Swarm Operations",
      "leaves": [
        "swarm-tokens",
        "swarm-tls-mutual",
        "swarm-state-store",
        "swarm-leader-election"
      ]
    }
  ],
  "swarm-stacks": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-stack-deploy",
        "docker-stack-ls",
        "docker-stack-ps",
        "docker-stack-services"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "docker-stack-rm",
        "docker-stack-config",
        "stack-compose-file-support",
        "stack-deploy-resolve-image"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "stack-deploy-detach",
        "stack-deploy-with-registry-auth",
        "stack-deploy-prune"
      ]
    }
  ],
  "swarm-networking": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "swarm-overlay-network",
        "routing-mesh",
        "ingress-network"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "encrypted-overlay-swarm",
        "attachable-overlay-swarm",
        "service-discovery-swarm"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "load-balancing-vip-dnsrr",
        "host-mode-publish",
        "swarm-ipam-customization"
      ]
    }
  ],
  "swarm-storage": [
    {
      "id": "core",
      "title": "Swarm Storage Core",
      "leaves": [
        "volumes-per-service",
        "shared-storage-considerations",
        "cluster-volumes-swarm",
        "csi-plugins-swarm"
      ]
    }
  ],
  "node-labels-constraints": [
    {
      "id": "core",
      "title": "Node Labels & Constraints Core",
      "leaves": [
        "engine-labels",
        "node-labels",
        "placement-constraints-syntax"
      ]
    }
  ],
  "service-updates": [
    {
      "id": "area-1",
      "title": "Service Updates Fundamentals",
      "leaves": [
        "rolling-updates",
        "update-parallelism",
        "update-delay",
        "update-order"
      ]
    },
    {
      "id": "area-2",
      "title": "Service Updates Advanced",
      "leaves": [
        "update-failure-action",
        "update-monitor",
        "rollback-config",
        "rollback-parallelism"
      ]
    }
  ],
  "service-placement": [
    {
      "id": "core",
      "title": "Service Placement Core",
      "leaves": [
        "placement-constraints",
        "placement-preferences",
        "replicas-max-per-node",
        "placement-platforms"
      ]
    }
  ],
  "swarm-vs-kubernetes": [
    {
      "id": "core",
      "title": "Swarm vs Kubernetes Core",
      "leaves": [
        "swarm-vs-k8s-feature-comparison",
        "swarm-vs-k8s-operational-complexity",
        "swarm-vs-k8s-when-to-pick"
      ]
    }
  ],
  "docker-desktop-vm": [
    {
      "id": "area-1",
      "title": "Docker Desktop VM Fundamentals",
      "leaves": [
        "virtualization-framework-mac",
        "rosetta-x86-emulation-mac",
        "wsl2-backend",
        "hyperv-backend"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker Desktop VM Advanced",
      "leaves": [
        "qemu-fallback-linux",
        "vm-disk-image-management",
        "desktop-cpu-arch-handling"
      ]
    }
  ],
  "docker-desktop-kubernetes": [
    {
      "id": "core",
      "title": "Desktop Kubernetes Core",
      "leaves": [
        "desktop-k8s-enable",
        "desktop-k8s-version",
        "desktop-k8s-reset",
        "desktop-k8s-kubectl-context"
      ]
    }
  ],
  "dev-environments": [
    {
      "id": "area-1",
      "title": "Dev Environments Fundamentals",
      "leaves": [
        "dev-environment-create",
        "dev-environment-from-repo",
        "dev-environment-share"
      ]
    },
    {
      "id": "area-2",
      "title": "Dev Environments Advanced",
      "leaves": [
        "dev-environment-vscode-integration",
        "dev-environment-jetbrains-integration",
        "dev-environment-compose-config"
      ]
    }
  ],
  "docker-init": [
    {
      "id": "core",
      "title": "docker init Core",
      "leaves": [
        "docker-init-language-templates",
        "docker-init-generated-files",
        "docker-init-update-existing"
      ]
    }
  ],
  "docker-debug": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-debug-running",
        "docker-debug-stopped",
        "docker-debug-toolbox"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-debug-install-extra",
        "docker-debug-image",
        "docker-debug-troubleshooting"
      ]
    }
  ],
  "docker-ai-gordon": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "gordon-overview",
        "gordon-cli",
        "gordon-desktop-integration",
        "gordon-tools"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "gordon-context-sources",
        "docker-mcp-toolkit",
        "docker-mcp-catalog",
        "docker-mcp-gateway"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "docker-mcp-server-builders",
        "gordon-privacy-data",
        "gordon-compose-integration"
      ]
    }
  ],
  "enhanced-container-isolation": [
    {
      "id": "area-1",
      "title": "Enhanced Container Isolation Fundamentals",
      "leaves": [
        "eci-overview",
        "eci-enable",
        "eci-sysbox-runtime"
      ]
    },
    {
      "id": "area-2",
      "title": "Enhanced Container Isolation Advanced",
      "leaves": [
        "eci-limitations",
        "eci-admin-policy"
      ]
    }
  ],
  "docker-desktop-admin": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "admin-console",
        "settings-management",
        "registry-access-management"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "image-access-management",
        "sign-in-enforcement",
        "sso-saml-scim"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "desktop-insights",
        "audit-logs-desktop",
        "air-gapped-containers"
      ]
    }
  ],
  "resource-saver": [
    {
      "id": "core",
      "title": "Resource Saver Core",
      "leaves": [
        "resource-saver-overview",
        "resource-saver-configuration"
      ]
    }
  ],
  "compose-bridge-desktop": [
    {
      "id": "core",
      "title": "Compose Bridge (Desktop) Core",
      "leaves": [
        "compose-bridge-desktop-ui",
        "compose-bridge-desktop-templates"
      ]
    }
  ],
  "compose-watch-dev": [
    {
      "id": "core",
      "title": "Compose Watch for Dev Core",
      "leaves": [
        "compose-watch-sync-rules",
        "compose-watch-rebuild-rules",
        "compose-watch-debugging",
        "compose-watch-cross-os-tradeoffs"
      ]
    }
  ],
  "production-parity": [
    {
      "id": "area-1",
      "title": "Production Parity Fundamentals",
      "leaves": [
        "twelve-factor-app",
        "config-via-env",
        "logs-to-stdout"
      ]
    },
    {
      "id": "area-2",
      "title": "Production Parity Advanced",
      "leaves": [
        "disposability-fast-startup",
        "dev-prod-parity"
      ]
    }
  ],
  "docker-init-scaffolding": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-init-node-template",
        "docker-init-python-template",
        "docker-init-go-template",
        "docker-init-java-template"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-init-rust-template",
        "docker-init-php-template",
        "docker-init-aspnet-template",
        "docker-init-other-templates"
      ]
    }
  ],
  "gitlab-ci-docker": [
    {
      "id": "area-1",
      "title": "GitLab CI Fundamentals",
      "leaves": [
        "gitlab-dind-service",
        "gitlab-shell-executor-docker",
        "gitlab-docker-executor",
        "gitlab-kaniko-pattern"
      ]
    },
    {
      "id": "area-2",
      "title": "GitLab CI Advanced",
      "leaves": [
        "gitlab-buildkit-pattern",
        "gitlab-container-registry-integration",
        "gitlab-ci-cache-images",
        "gitlab-scanning-integration"
      ]
    }
  ],
  "jenkins-docker": [
    {
      "id": "area-1",
      "title": "Jenkins Fundamentals",
      "leaves": [
        "jenkins-docker-pipeline-plugin",
        "jenkins-docker-agent",
        "jenkins-docker-build-push"
      ]
    },
    {
      "id": "area-2",
      "title": "Jenkins Advanced",
      "leaves": [
        "jenkins-dind-vs-dood",
        "jenkins-kaniko-pattern",
        "jenkins-credentials-for-registries"
      ]
    }
  ],
  "ci-cache-strategies": [
    {
      "id": "area-1",
      "title": "CI Cache Strategies Fundamentals",
      "leaves": [
        "ci-inline-cache-strategy",
        "ci-registry-cache-strategy",
        "ci-gha-cache-strategy",
        "ci-s3-cache-strategy"
      ]
    },
    {
      "id": "area-2",
      "title": "CI Cache Strategies Advanced",
      "leaves": [
        "ci-azblob-cache-strategy",
        "ci-local-cache-strategy",
        "ci-cache-warming-jobs",
        "ci-cache-invalidation"
      ]
    }
  ],
  "multi-platform-ci-builds": [
    {
      "id": "area-1",
      "title": "Multi-Platform CI Builds Fundamentals",
      "leaves": [
        "mp-ci-qemu-setup",
        "mp-ci-native-runners",
        "mp-ci-multi-job-merge"
      ]
    },
    {
      "id": "area-2",
      "title": "Multi-Platform CI Builds Advanced",
      "leaves": [
        "mp-ci-buildx-bake",
        "mp-ci-build-cloud-integration"
      ]
    }
  ],
  "image-promotion": [
    {
      "id": "area-1",
      "title": "Image Promotion Fundamentals",
      "leaves": [
        "tag-promotion-strategies",
        "digest-based-promotion",
        "registry-promotion"
      ]
    },
    {
      "id": "area-2",
      "title": "Image Promotion Advanced",
      "leaves": [
        "staging-production-promotion",
        "promotion-with-attestations",
        "crane-skopeo-promotion"
      ]
    }
  ],
  "automated-scanning": [
    {
      "id": "area-1",
      "title": "Automated Scanning Fundamentals",
      "leaves": [
        "ci-scout-scanning",
        "ci-trivy-scanning",
        "ci-grype-scanning",
        "ci-snyk-scanning"
      ]
    },
    {
      "id": "area-2",
      "title": "Automated Scanning Advanced",
      "leaves": [
        "ci-sbom-generation",
        "ci-signing-pipelines",
        "ci-policy-gates",
        "ci-fail-on-severity"
      ]
    }
  ],
  "release-strategies": [
    {
      "id": "area-1",
      "title": "Release Strategies Fundamentals",
      "leaves": [
        "semantic-versioning-images",
        "immutable-tags-ci",
        "release-channels"
      ]
    },
    {
      "id": "area-2",
      "title": "Release Strategies Advanced",
      "leaves": [
        "auto-versioned-builds",
        "pre-release-tags",
        "release-notes-images"
      ]
    }
  ],
  "container-logs": [
    {
      "id": "area-1",
      "title": "Container Logs Fundamentals",
      "leaves": [
        "stdout-stderr-conventions",
        "docker-logs-cli-deep",
        "log-rotation-conf",
        "log-tail-follow-since"
      ]
    },
    {
      "id": "area-2",
      "title": "Container Logs Advanced",
      "leaves": [
        "multiline-logs-handling",
        "structured-logs-json",
        "log-redaction-best-practices"
      ]
    }
  ],
  "metrics": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "docker-stats-metrics",
        "daemon-prometheus-metrics",
        "metrics-addr-config",
        "cadvisor-metrics"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "node-exporter-host-metrics",
        "metrics-from-buildkit",
        "exporting-metrics-otel",
        "otel-collector-containers-metrics"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "prometheus-cadvisor-exporter",
        "pushgateway-metrics"
      ]
    }
  ],
  "events": [
    {
      "id": "core",
      "title": "Events Core",
      "leaves": [
        "docker-events-cmd",
        "event-filters",
        "event-types",
        "consuming-events-api"
      ]
    }
  ],
  "diagnostics": [
    {
      "id": "area-1",
      "title": "Diagnostics Fundamentals",
      "leaves": [
        "docker-debug-cli",
        "docker-desktop-diagnose",
        "daemon-debug-mode"
      ]
    },
    {
      "id": "area-2",
      "title": "Diagnostics Advanced",
      "leaves": [
        "goroutine-stack-dumps",
        "pprof-profiles",
        "docker-system-info-diag"
      ]
    }
  ],
  "alerting": [
    {
      "id": "area-1",
      "title": "Alerting Fundamentals",
      "leaves": [
        "alerting-restart-loops",
        "alerting-oom-events",
        "alerting-healthcheck-failures"
      ]
    },
    {
      "id": "area-2",
      "title": "Alerting Advanced",
      "leaves": [
        "alerting-image-pull-failures",
        "alerting-disk-pressure"
      ]
    }
  ],
  "image-performance": [
    {
      "id": "area-1",
      "title": "Image Performance Fundamentals",
      "leaves": [
        "image-size-strategies",
        "layer-caching-strategies-prod",
        "lazy-pulling-stargz"
      ]
    },
    {
      "id": "area-2",
      "title": "Image Performance Advanced",
      "leaves": [
        "image-prefetching",
        "parallel-layer-pulls",
        "multi-arch-image-perf"
      ]
    }
  ],
  "build-performance": [
    {
      "id": "area-1",
      "title": "Build Performance Fundamentals",
      "leaves": [
        "parallel-builds-buildx",
        "cache-tuning-buildkit",
        "remote-builders-perf",
        "incremental-builds"
      ]
    },
    {
      "id": "area-2",
      "title": "Build Performance Advanced",
      "leaves": [
        "avoiding-cache-busters",
        "bind-mount-source-perf",
        "cross-compilation-perf"
      ]
    }
  ],
  "runtime-performance": [
    {
      "id": "area-1",
      "title": "Runtime Performance Fundamentals",
      "leaves": [
        "container-startup-latency",
        "cpu-pinning",
        "numa-awareness",
        "huge-pages-containers"
      ]
    },
    {
      "id": "area-2",
      "title": "Runtime Performance Advanced",
      "leaves": [
        "realtime-priorities-containers",
        "kernel-tunables-containers",
        "low-latency-tuning"
      ]
    }
  ],
  "storage-tuning": [
    {
      "id": "area-1",
      "title": "Storage Tuning Fundamentals",
      "leaves": [
        "overlay2-perf-tuning",
        "btrfs-zfs-perf",
        "volume-fs-choice"
      ]
    },
    {
      "id": "area-2",
      "title": "Storage Tuning Advanced",
      "leaves": [
        "block-device-tuning",
        "io-scheduler-tuning",
        "desktop-mutagen-vs-bind"
      ]
    }
  ],
  "network-tuning": [
    {
      "id": "area-1",
      "title": "Network Tuning Fundamentals",
      "leaves": [
        "bridge-throughput-tuning",
        "host-network-perf",
        "overlay-encryption-overhead"
      ]
    },
    {
      "id": "area-2",
      "title": "Network Tuning Advanced",
      "leaves": [
        "iptables-conntrack-tuning",
        "mtu-tuning",
        "sriov-and-macvlan-perf"
      ]
    }
  ],
  "high-availability": [
    {
      "id": "area-1",
      "title": "High Availability Fundamentals",
      "leaves": [
        "multi-node-redundancy",
        "load-balancing-containers",
        "health-driven-routing",
        "backup-disaster-recovery"
      ]
    },
    {
      "id": "area-2",
      "title": "High Availability Advanced",
      "leaves": [
        "zero-downtime-deployments",
        "blue-green-deployments-docker",
        "canary-deployments-docker"
      ]
    }
  ],
  "read-only-filesystems": [
    {
      "id": "core",
      "title": "Read-only Filesystems Core",
      "leaves": [
        "read-only-flag-runtime",
        "tmpfs-with-readonly",
        "writable-paths-strategy"
      ]
    }
  ],
  "secrets-at-runtime": [
    {
      "id": "area-1",
      "title": "Secrets at Runtime Fundamentals",
      "leaves": [
        "secrets-via-files-runtime",
        "secrets-via-env-anti-pattern",
        "docker-secrets-vs-compose"
      ]
    },
    {
      "id": "area-2",
      "title": "Secrets at Runtime Advanced",
      "leaves": [
        "external-secret-injectors",
        "rotating-runtime-secrets",
        "external-secret-csi-integration"
      ]
    }
  ],
  "network-security": [
    {
      "id": "area-1",
      "title": "Network Security Fundamentals",
      "leaves": [
        "internal-networks-security",
        "encrypted-overlays-runtime",
        "firewall-considerations-docker",
        "docker-iptables-policies"
      ]
    },
    {
      "id": "area-2",
      "title": "Network Security Advanced",
      "leaves": [
        "inter-container-icc",
        "limit-published-ports",
        "tls-everywhere-containers"
      ]
    }
  ],
  "tls-and-remote-api": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "enabling-tcp-listener",
        "tls-mutual-auth",
        "tls-cert-generation"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-host-env-var",
        "docker-tls-verify-env",
        "docker-cert-path-env"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "exposing-daemon-securely",
        "docker-context-remote",
        "ssh-context-tunnels"
      ]
    }
  ],
  "upgrades-maintenance": [
    {
      "id": "area-1",
      "title": "Upgrades & Maintenance Fundamentals",
      "leaves": [
        "upgrading-docker-engine",
        "upgrading-containerd",
        "upgrading-runc",
        "migrating-storage-drivers"
      ]
    },
    {
      "id": "area-2",
      "title": "Upgrades & Maintenance Advanced",
      "leaves": [
        "migrating-to-containerd-snapshotter",
        "resource-quotas-cleanup",
        "rolling-restart-strategy",
        "cgroup-v1-to-v2-migration"
      ]
    }
  ],
  "common-errors": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "permission-denied-issues",
        "image-not-found-error",
        "manifest-unknown-error",
        "network-unreachable-error"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "oom-killed-error",
        "port-already-allocated-error",
        "no-space-left-on-device",
        "docker-daemon-not-running"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "exit-codes-troubleshoot",
        "context-deadline-exceeded",
        "rate-limit-pull-error"
      ]
    }
  ],
  "network-troubleshooting": [
    {
      "id": "area-1",
      "title": "Network Troubleshooting Fundamentals",
      "leaves": [
        "container-cant-reach-internet",
        "host-cant-reach-container",
        "container-to-container-dns-fail"
      ]
    },
    {
      "id": "area-2",
      "title": "Network Troubleshooting Advanced",
      "leaves": [
        "iptables-debug-network",
        "mtu-mismatch-debug",
        "overlay-vxlan-debug"
      ]
    }
  ],
  "storage-troubleshooting": [
    {
      "id": "area-1",
      "title": "Storage Troubleshooting Fundamentals",
      "leaves": [
        "mount-permission-issues",
        "volume-not-persisting-debug",
        "storage-driver-errors"
      ]
    },
    {
      "id": "area-2",
      "title": "Storage Troubleshooting Advanced",
      "leaves": [
        "inode-exhaustion",
        "layer-corruption",
        "fuse-overlayfs-debug"
      ]
    }
  ],
  "build-troubleshooting": [
    {
      "id": "area-1",
      "title": "Build Troubleshooting Fundamentals",
      "leaves": [
        "context-too-large",
        "cache-miss-debugging",
        "multi-platform-build-errors"
      ]
    },
    {
      "id": "area-2",
      "title": "Build Troubleshooting Advanced",
      "leaves": [
        "buildkit-internal-errors",
        "failed-secret-mount-debug",
        "build-debug-mode"
      ]
    }
  ],
  "dns-troubleshooting": [
    {
      "id": "core",
      "title": "DNS Troubleshooting Core",
      "leaves": [
        "embedded-dns-debug",
        "resolv-conf-issues",
        "systemd-resolved-collisions",
        "corporate-dns-issues"
      ]
    }
  ],
  "oci-ecosystem": [
    {
      "id": "area-1",
      "title": "OCI Ecosystem Fundamentals",
      "leaves": [
        "oci-runtime-spec-tools",
        "oci-image-spec-tools",
        "oci-distribution-spec-tools",
        "oras-tool"
      ]
    },
    {
      "id": "area-2",
      "title": "OCI Ecosystem Advanced",
      "leaves": [
        "umoci-tool",
        "go-containerregistry-tools",
        "oci-artifacts-ecosystem",
        "oci-referrers-ecosystem"
      ]
    }
  ],
  "emerging-trends": [
    {
      "id": "area-1",
      "title": "Topic Area 1",
      "leaves": [
        "wasm-containers-frontier",
        "confidential-containers-frontier",
        "sandboxing-tech-trends",
        "docker-ai-frontier"
      ]
    },
    {
      "id": "area-2",
      "title": "Topic Area 2",
      "leaves": [
        "docker-mcp-frontier",
        "cloud-native-evolution",
        "serverless-containers-trends",
        "image-format-evolution"
      ]
    },
    {
      "id": "area-3",
      "title": "Topic Area 3",
      "leaves": [
        "cdi-spec-trend",
        "sustainability-greenops",
        "docker-model-runner-trend",
        "agentic-containers-trend"
      ]
    },
    {
      "id": "area-4",
      "title": "Topic Area 4",
      "leaves": [
        "wasi-component-model-trend",
        "distroless-evolution-trend",
        "docker-offload-trend",
        "sustainability-greenops-trend"
      ]
    }
  ],
  "image-store-backends": [
    {
      "id": "store-models",
      "title": "Image Store Models",
      "leaves": [
        "classic-image-store",
        "containerd-image-store-feature"
      ]
    },
    {
      "id": "migration-operations",
      "title": "Migration & Operations",
      "leaves": [
        "enabling-containerd-snapshotter-store",
        "migrating-image-stores",
        "image-store-feature-differences",
        "image-store-cli-differences",
        "image-store-storage-on-disk"
      ]
    }
  ],
  "docker-offload": [
    {
      "id": "area-1",
      "title": "Docker Offload Fundamentals",
      "leaves": [
        "offload-overview",
        "offload-enable",
        "offload-target-selection"
      ]
    },
    {
      "id": "area-2",
      "title": "Docker Offload Advanced",
      "leaves": [
        "offload-billing-quotas",
        "offload-security-data"
      ]
    }
  ],
  "enterprise-docker-strategy": [
    {
      "id": "area-1",
      "title": "Docker CLI Commands",
      "leaves": [
        "docker-center-of-excellence",
        "docker-operating-model",
        "docker-strategy-roadmap",
        "docker-portfolio-strategy"
      ]
    },
    {
      "id": "area-2",
      "title": "Enterprise Docker Strategy & Operating Model Advanced",
      "leaves": [
        "executive-sponsorship",
        "docker-maturity-model",
        "value-streams-mapping"
      ]
    }
  ],
  "discovery-requirements": [
    {
      "id": "area-1",
      "title": "Discovery & Requirements Engineering Fundamentals",
      "leaves": [
        "use-case-discovery",
        "business-case-roi",
        "feasibility-assessment",
        "stakeholder-management"
      ]
    },
    {
      "id": "area-2",
      "title": "Discovery & Requirements Engineering Advanced",
      "leaves": [
        "requirements-elicitation",
        "success-criteria-kpis",
        "user-research-discovery",
        "poc-to-production-criteria"
      ]
    }
  ],
  "solution-architecture-process": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "architecture-decision-records",
        "design-review-board",
        "reference-architectures"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "solution-blueprints",
        "non-functional-requirements",
        "capacity-planning"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "threat-modeling-process",
        "tech-radar",
        "architecture-review-cadence"
      ]
    }
  ],
  "engineering-standards": [
    {
      "id": "area-1",
      "title": "Engineering Standards & Quality Fundamentals",
      "leaves": [
        "coding-standards-enterprise",
        "docker-style-guide",
        "peer-review-process",
        "definition-of-done"
      ]
    },
    {
      "id": "area-2",
      "title": "Engineering Standards & Quality Advanced",
      "leaves": [
        "quality-gates",
        "architectural-fitness-functions",
        "dependency-policy",
        "engineering-scorecards"
      ]
    }
  ],
  "developer-platform-program": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "internal-developer-portal",
        "docker-starter-templates",
        "golden-paths"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "shared-docker-libraries",
        "service-catalog-program",
        "self-service-tooling"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "inner-source-program",
        "developer-experience-metrics",
        "platform-as-product"
      ]
    }
  ],
  "procurement-sourcing": [
    {
      "id": "area-1",
      "title": "Vendor, Tool & Procurement Fundamentals",
      "leaves": [
        "vendor-due-diligence",
        "tool-rationalization",
        "build-vs-buy",
        "enterprise-agreement-management"
      ]
    },
    {
      "id": "area-2",
      "title": "Vendor, Tool & Procurement Advanced",
      "leaves": [
        "data-processing-agreements",
        "contract-sla-negotiation",
        "msp-partner-management"
      ]
    }
  ],
  "enterprise-data-governance": [
    {
      "id": "area-1",
      "title": "Enterprise Data Governance Fundamentals",
      "leaves": [
        "data-classification-program",
        "data-residency-controls",
        "data-lineage",
        "data-stewardship"
      ]
    },
    {
      "id": "area-2",
      "title": "Enterprise Data Governance Advanced",
      "leaves": [
        "data-quality-management",
        "consent-management",
        "master-data-management",
        "data-contracts"
      ]
    }
  ],
  "risk-compliance-program": [
    {
      "id": "area-1",
      "title": "Enterprise Risk & Compliance Program Fundamentals",
      "leaves": [
        "enterprise-risk-register",
        "control-libraries",
        "third-party-risk-management",
        "audit-readiness"
      ]
    },
    {
      "id": "area-2",
      "title": "Enterprise Risk & Compliance Program Advanced",
      "leaves": [
        "certifications-soc2-iso",
        "pci-hipaa-program",
        "regulatory-reporting",
        "continuous-compliance-program"
      ]
    }
  ],
  "enterprise-finops-program": [
    {
      "id": "area-1",
      "title": "Enterprise FinOps Program Fundamentals",
      "leaves": [
        "cost-allocation-chargeback",
        "budget-governance",
        "cost-forecasting",
        "unit-economics"
      ]
    },
    {
      "id": "area-2",
      "title": "Enterprise FinOps Program Advanced",
      "leaves": [
        "rate-card-management",
        "tooling-license-management",
        "finops-reporting"
      ]
    }
  ],
  "program-portfolio-management": [
    {
      "id": "area-1",
      "title": "Program & Portfolio Management Fundamentals",
      "leaves": [
        "intake-prioritization",
        "okrs-roadmaps",
        "dependency-mapping",
        "status-reporting"
      ]
    },
    {
      "id": "area-2",
      "title": "Program & Portfolio Management Advanced",
      "leaves": [
        "benefits-realization",
        "agile-at-scale",
        "portfolio-rebalancing"
      ]
    }
  ],
  "change-enablement": [
    {
      "id": "area-1",
      "title": "Change Enablement & Culture Fundamentals",
      "leaves": [
        "org-change-management",
        "communications-strategy",
        "training-curricula",
        "communities-of-practice"
      ]
    },
    {
      "id": "area-2",
      "title": "Change Enablement & Culture Advanced",
      "leaves": [
        "docker-champions-network",
        "adoption-metrics",
        "workforce-reskilling"
      ]
    }
  ],
  "legal-ethical-governance": [
    {
      "id": "area-1",
      "title": "Legal & Ethical Governance Fundamentals",
      "leaves": [
        "ip-and-licensing",
        "liability-frameworks",
        "acceptable-use-policy",
        "responsible-disclosure-policy"
      ]
    },
    {
      "id": "area-2",
      "title": "Legal & Ethical Governance Advanced",
      "leaves": [
        "dpia-process",
        "open-source-governance",
        "sustainability-governance"
      ]
    }
  ],
  "requirements-design-phase": [
    {
      "id": "area-1",
      "title": "Requirements & Design Phase Fundamentals",
      "leaves": [
        "discovery-workshops",
        "jobs-and-personas",
        "journey-mapping",
        "prd-templates"
      ]
    },
    {
      "id": "area-2",
      "title": "Requirements & Design Phase Advanced",
      "leaves": [
        "lo-fi-prototyping",
        "design-sign-off",
        "risk-impact-assessment"
      ]
    }
  ],
  "implementation-build-phase": [
    {
      "id": "area-1",
      "title": "Implementation & Build Phase Fundamentals",
      "leaves": [
        "pairing-and-mobbing",
        "trunk-based-development-practice",
        "branching-strategy",
        "commit-conventions"
      ]
    },
    {
      "id": "area-2",
      "title": "Implementation & Build Phase Advanced",
      "leaves": [
        "code-ownership-codeowners",
        "refactoring-discipline",
        "feature-toggling-build"
      ]
    }
  ],
  "testing-validation-phase": [
    {
      "id": "area-1",
      "title": "Testing & Validation Phase Fundamentals",
      "leaves": [
        "test-strategy-pyramid",
        "contract-testing-process",
        "performance-test-program",
        "security-test-program"
      ]
    },
    {
      "id": "area-2",
      "title": "Testing & Validation Phase Advanced",
      "leaves": [
        "accessibility-testing-program",
        "uat-process",
        "acceptance-criteria-bdd",
        "mutation-testing-program"
      ]
    }
  ],
  "cicd-release-engineering": [
    {
      "id": "area-1",
      "title": "Foundations",
      "leaves": [
        "cicd-pipeline-design",
        "build-promotion-stages",
        "env-strategy-paths"
      ]
    },
    {
      "id": "area-2",
      "title": "Configuration & Operations",
      "leaves": [
        "release-trains",
        "feature-flag-management",
        "secrets-management-process"
      ]
    },
    {
      "id": "area-3",
      "title": "Expert Topics",
      "leaves": [
        "supply-chain-security-program",
        "artifact-versioning-strategy",
        "preview-environments"
      ]
    }
  ],
  "production-readiness": [
    {
      "id": "area-1",
      "title": "Production Readiness & Launch Fundamentals",
      "leaves": [
        "production-readiness-review",
        "launch-checklist",
        "go-no-go-criteria",
        "dark-launches"
      ]
    },
    {
      "id": "area-2",
      "title": "Production Readiness & Launch Advanced",
      "leaves": [
        "gradual-rollout-strategy",
        "rollback-strategy-process",
        "day-1-day-2-operations",
        "hypercare-period"
      ]
    }
  ],
  "operations-sre-program": [
    {
      "id": "area-1",
      "title": "Operations & SRE Program Fundamentals",
      "leaves": [
        "sli-slo-sla-design",
        "error-budget-policy",
        "on-call-program",
        "escalation-paths"
      ]
    },
    {
      "id": "area-2",
      "title": "Operations & SRE Program Advanced",
      "leaves": [
        "capacity-management",
        "dr-bcp-planning",
        "chaos-engineering-program",
        "reliability-reviews"
      ]
    }
  ],
  "observability-program": [
    {
      "id": "area-1",
      "title": "Observability Program Fundamentals",
      "leaves": [
        "telemetry-standards",
        "golden-signals",
        "dashboards-as-code",
        "alerting-policy"
      ]
    },
    {
      "id": "area-2",
      "title": "Observability Program Advanced",
      "leaves": [
        "log-management-policy",
        "retention-and-sampling",
        "observability-platform-ownership",
        "cost-of-telemetry"
      ]
    }
  ],
  "incident-management-process": [
    {
      "id": "area-1",
      "title": "Incident Management Process Fundamentals",
      "leaves": [
        "incident-classification",
        "incident-commander-role",
        "war-room-protocols",
        "status-page-comms"
      ]
    },
    {
      "id": "area-2",
      "title": "Incident Management Process Advanced",
      "leaves": [
        "blameless-postmortems",
        "action-item-tracking",
        "incident-metrics-mttx",
        "major-incident-review"
      ]
    }
  ],
  "support-maintenance-program": [
    {
      "id": "area-1",
      "title": "Support & Maintenance Program Fundamentals",
      "leaves": [
        "tiered-support-model",
        "bug-triage-process",
        "sla-management",
        "patch-management-cadence"
      ]
    },
    {
      "id": "area-2",
      "title": "Support & Maintenance Program Advanced",
      "leaves": [
        "dependency-upgrade-program",
        "runtime-version-policy",
        "decommissioning-sunsetting",
        "knowledge-base-maintenance"
      ]
    }
  ],
  "continuous-improvement-program": [
    {
      "id": "area-1",
      "title": "Continuous Improvement & Evolution Fundamentals",
      "leaves": [
        "feedback-loops-program",
        "post-launch-reviews",
        "technical-debt-management",
        "evolutionary-architecture-practice"
      ]
    },
    {
      "id": "area-2",
      "title": "Continuous Improvement & Evolution Advanced",
      "leaves": [
        "version-deprecation-policy",
        "retrospectives-cadence",
        "experimentation-program"
      ]
    }
  ]
}
