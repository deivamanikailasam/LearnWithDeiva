import { seedStages } from './seed.mjs'

seedStages([
  /* ---------------- Stage 1: Container Foundations ---------------- */
  {
    id: 'container-foundations',
    level: 'beginner',
    roots: [
      {
        id: 'container-fundamentals',
        title: 'Container Fundamentals',
        summary: 'What containers are, how they differ from VMs and how they evolved.',
        children: [
          { id: 'what-are-containers', title: 'What are Containers' },
          { id: 'containers-vs-vms', title: 'Containers vs Virtual Machines' },
          { id: 'history-of-containers', title: 'History of Containers' },
          { id: 'container-use-cases', title: 'Container Use Cases' },
          { id: 'container-benefits-limitations', title: 'Benefits & Limitations' },
        ],
      },
      {
        id: 'container-standards',
        title: 'Container Standards (OCI)',
        summary: 'OCI image, runtime and distribution specifications.',
        children: [
          { id: 'oci-image-spec', title: 'OCI Image Specification' },
          { id: 'oci-runtime-spec', title: 'OCI Runtime Specification' },
          { id: 'oci-distribution-spec', title: 'OCI Distribution Specification' },
          { id: 'oci-artifacts', title: 'OCI Artifacts' },
          { id: 'cri-spec', title: 'Container Runtime Interface (CRI)' },
        ],
      },
      {
        id: 'linux-container-primitives',
        title: 'Linux Container Primitives',
        summary: 'Namespaces, cgroups, capabilities, seccomp, LSMs and overlayfs.',
        children: [
          {
            id: 'linux-namespaces',
            title: 'Linux Namespaces',
            children: [
              { id: 'pid-namespace', title: 'PID Namespace' },
              { id: 'network-namespace', title: 'Network Namespace' },
              { id: 'mount-namespace', title: 'Mount Namespace' },
              { id: 'uts-namespace', title: 'UTS Namespace' },
              { id: 'ipc-namespace', title: 'IPC Namespace' },
              { id: 'user-namespace', title: 'User Namespace' },
              { id: 'cgroup-namespace', title: 'Cgroup Namespace' },
              { id: 'time-namespace', title: 'Time Namespace' },
            ],
          },
          {
            id: 'control-groups',
            title: 'Control Groups (cgroups)',
            children: [
              { id: 'cgroups-v1', title: 'cgroups v1' },
              { id: 'cgroups-v2', title: 'cgroups v2' },
              { id: 'cgroup-controllers', title: 'cgroup Controllers' },
            ],
          },
          { id: 'linux-capabilities', title: 'Linux Capabilities' },
          { id: 'seccomp', title: 'Seccomp' },
          { id: 'apparmor', title: 'AppArmor' },
          { id: 'selinux', title: 'SELinux' },
          { id: 'overlay-filesystem', title: 'OverlayFS' },
          { id: 'union-mounts', title: 'Union Mounts' },
          { id: 'pivot-root-chroot', title: 'pivot_root & chroot' },
        ],
      },
    ],
  },

  /* ---------------- Stage 2: Docker Engine & Installation ---------------- */
  {
    id: 'docker-engine-install',
    level: 'beginner',
    roots: [
      {
        id: 'docker-architecture',
        title: 'Docker Architecture',
        summary: 'Client, daemon, containerd, runc and shim components.',
        children: [
          { id: 'docker-client', title: 'Docker Client' },
          { id: 'docker-daemon', title: 'Docker Daemon (dockerd)' },
          { id: 'docker-rest-api', title: 'Docker REST API' },
          { id: 'containerd-component', title: 'containerd' },
          { id: 'runc-component', title: 'runc' },
          { id: 'docker-shim', title: 'containerd-shim' },
          { id: 'docker-objects', title: 'Docker Objects (images, containers, volumes, networks)' },
        ],
      },
      {
        id: 'docker-installation',
        title: 'Installation',
        summary: 'Installing Docker Desktop and Docker Engine on Linux, Mac and Windows.',
        children: [
          { id: 'install-docker-desktop', title: 'Install Docker Desktop' },
          { id: 'install-docker-engine-linux', title: 'Install Docker Engine on Linux' },
          { id: 'install-docker-windows', title: 'Install Docker on Windows' },
          { id: 'install-docker-mac', title: 'Install Docker on macOS' },
          { id: 'docker-on-wsl2', title: 'Docker on WSL2' },
          { id: 'post-install-steps', title: 'Post-Install Steps' },
          { id: 'non-root-user-setup', title: 'Adding User to docker Group' },
          { id: 'docker-versioning', title: 'Docker Versioning & Release Channels' },
          { id: 'uninstalling-docker', title: 'Uninstalling Docker' },
        ],
      },
      {
        id: 'rootless-docker',
        title: 'Rootless Docker',
        summary: 'Running the Docker daemon and containers without root.',
        children: [
          { id: 'rootless-setup', title: 'Rootless Setup' },
          { id: 'rootless-networking', title: 'Rootless Networking' },
          { id: 'rootless-storage', title: 'Rootless Storage' },
          { id: 'rootless-limitations', title: 'Rootless Limitations' },
        ],
      },
      {
        id: 'docker-cli-configuration',
        title: 'Docker CLI Configuration',
        summary: 'Contexts, CLI plugins, config files and completion.',
        children: [
          {
            id: 'docker-contexts',
            title: 'Docker Contexts',
            children: [
              { id: 'create-context', title: 'docker context create' },
              { id: 'use-context', title: 'docker context use' },
              { id: 'inspect-context', title: 'docker context inspect' },
              { id: 'remove-context', title: 'docker context rm' },
            ],
          },
          { id: 'cli-plugins', title: 'Docker CLI Plugins' },
          { id: 'docker-config-file', title: '~/.docker/config.json' },
          { id: 'shell-completion', title: 'Shell Completion' },
          { id: 'docker-environment-vars', title: 'Docker Environment Variables' },
        ],
      },
    ],
  },
])
