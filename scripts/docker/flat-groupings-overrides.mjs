/**
 * Manual subtopic groupings for flat roadmap topics.
 * Overrides auto-generated splits in generate-flat-groupings.mjs.
 */
export const MANUAL_FLAT_OVERRIDES = {
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
      leaves: ['history-of-containers'],
    },
    {
      id: 'adoption-fit',
      title: 'Adoption & Workload Fit',
      leaves: [
        { id: 'workload-fit-patterns', title: 'Workload Fit Patterns' },
        { id: 'constraints-and-tradeoffs', title: 'Constraints & Tradeoffs' },
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
      leaves: ['cri-spec'],
    },
  ],
  'image-store-backends': [
    {
      id: 'store-models',
      title: 'Image Store Models',
      leaves: ['classic-image-store', 'containerd-image-store-feature'],
    },
    {
      id: 'migration-operations',
      title: 'Migration & Operations',
      leaves: [
        'enabling-containerd-snapshotter-store',
        'migrating-image-stores',
        'image-store-feature-differences',
        'image-store-cli-differences',
        'image-store-storage-on-disk',
      ],
    },
  ],
}
