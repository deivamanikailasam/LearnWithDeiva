import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'operations-devops',
  rootStartOrder: 81,
  tree: [
    {
      id: 'deployment-provisioning',
      title: 'Deployment & Provisioning',
      summary: 'Installing, configuring and deploying NoSQL databases.',
      level: 'advanced',
      children: [
        {
          id: 'deployment-models',
          title: 'Deployment Models',
          children: [
            { id: 'self-managed-deploy', title: 'Self-Managed' },
            { id: 'managed-dbaas-deploy', title: 'Managed (DBaaS)' },
            { id: 'on-prem-deploy', title: 'On-Premises' },
            { id: 'hybrid-deploy', title: 'Hybrid & Edge' },
          ],
        },
        {
          id: 'cluster-setup',
          title: 'Cluster Setup',
          children: [
            { id: 'topology-planning', title: 'Topology Planning' },
            { id: 'node-configuration', title: 'Node Configuration' },
            { id: 'replication-setup', title: 'Replication Setup' },
            { id: 'sharding-setup', title: 'Sharding Setup' },
          ],
        },
        {
          id: 'containerized-deployment',
          title: 'Containerized Deployment',
          children: [
            { id: 'docker-databases', title: 'Docker' },
            { id: 'kubernetes-databases', title: 'Kubernetes & StatefulSets' },
            { id: 'database-operators', title: 'Database Operators' },
            { id: 'persistent-volumes', title: 'Persistent Volumes & Storage Classes' },
          ],
        },
      ],
    },
    {
      id: 'monitoring-observability',
      title: 'Monitoring & Observability',
      summary: 'Tracking the health and performance of databases in production.',
      level: 'advanced',
      children: [
        {
          id: 'key-metrics',
          title: 'Key Metrics',
          children: [
            { id: 'throughput-latency-metrics', title: 'Throughput & Latency' },
            { id: 'resource-metrics', title: 'CPU, Memory, Disk, Network' },
            { id: 'replication-lag-metrics', title: 'Replication Lag' },
            { id: 'cache-metrics', title: 'Cache & Hit Ratios' },
            { id: 'error-rates', title: 'Error Rates' },
            { id: 'saturation-metrics', title: 'Saturation & Queue Depth' },
          ],
        },
        {
          id: 'monitoring-tools',
          title: 'Monitoring Tools',
          children: [
            { id: 'prometheus-grafana-mon', title: 'Prometheus & Grafana' },
            { id: 'datadog', title: 'Datadog' },
            { id: 'native-monitoring-tools', title: 'Native Monitoring (Atlas, etc.)' },
            { id: 'exporters-mon', title: 'Exporters & Agents' },
          ],
        },
        {
          id: 'logging-tracing',
          title: 'Logging & Tracing',
          children: [
            { id: 'slow-query-logs', title: 'Slow Query Logs' },
            { id: 'audit-logs-ops', title: 'Audit Logs' },
            { id: 'distributed-tracing-db', title: 'Distributed Tracing' },
            { id: 'opentelemetry-db', title: 'OpenTelemetry' },
          ],
        },
        {
          id: 'alerting-ops',
          title: 'Alerting & On-Call',
          children: [
            { id: 'slos-slis-db', title: 'SLOs & SLIs' },
            { id: 'alert-design', title: 'Alert Design' },
            { id: 'incident-response-db', title: 'Incident Response' },
            { id: 'runbooks', title: 'Runbooks & Postmortems' },
          ],
        },
      ],
    },
    {
      id: 'backup-recovery',
      title: 'Backup & Recovery',
      summary: 'Protecting data with backups and tested recovery procedures.',
      level: 'advanced',
      children: [
        {
          id: 'backup-types',
          title: 'Backup Types',
          children: [
            { id: 'full-backups', title: 'Full Backups' },
            { id: 'incremental-backups', title: 'Incremental Backups' },
            { id: 'snapshot-backups', title: 'Snapshots' },
            { id: 'continuous-backup-pitr', title: 'Continuous Backup & PITR' },
          ],
        },
        {
          id: 'backup-strategy',
          title: 'Backup Strategy',
          children: [
            { id: 'backup-scheduling', title: 'Scheduling & Frequency' },
            { id: 'backup-retention', title: 'Retention Policies' },
            { id: 'offsite-backups', title: 'Offsite & Cross-Region Backups' },
            { id: 'backup-encryption', title: 'Backup Encryption' },
          ],
        },
        {
          id: 'recovery-procedures',
          title: 'Recovery Procedures',
          children: [
            { id: 'restore-testing', title: 'Restore Testing' },
            { id: 'point-in-time-recovery', title: 'Point-in-Time Recovery' },
            { id: 'partial-recovery', title: 'Partial / Selective Recovery' },
            { id: 'recovery-drills', title: 'Recovery Drills' },
          ],
        },
      ],
    },
    {
      id: 'maintenance-upgrades',
      title: 'Maintenance & Upgrades',
      summary: 'Routine maintenance and safe version upgrades.',
      level: 'advanced',
      children: [
        {
          id: 'routine-maintenance',
          title: 'Routine Maintenance',
          children: [
            { id: 'compaction-maintenance', title: 'Compaction & Cleanup' },
            { id: 'reindexing', title: 'Reindexing' },
            { id: 'vacuuming-ttl-cleanup', title: 'TTL & Garbage Cleanup' },
            { id: 'repair-maintenance', title: 'Repair Operations' },
          ],
        },
        {
          id: 'upgrades-patching',
          title: 'Upgrades & Patching',
          children: [
            { id: 'rolling-upgrades', title: 'Rolling Upgrades' },
            { id: 'version-compatibility', title: 'Version Compatibility' },
            { id: 'blue-green-db', title: 'Blue-Green Deployments' },
            { id: 'rollback-strategies', title: 'Rollback Strategies' },
          ],
        },
        {
          id: 'configuration-management',
          title: 'Configuration Management',
          children: [
            { id: 'config-tuning', title: 'Configuration Tuning' },
            { id: 'parameter-groups', title: 'Parameter Groups' },
            { id: 'config-drift', title: 'Configuration Drift' },
          ],
        },
      ],
    },
    {
      id: 'devops-automation',
      title: 'DevOps & Automation',
      summary: 'Treating databases as code with automation and CI/CD.',
      level: 'advanced',
      children: [
        {
          id: 'infrastructure-as-code',
          title: 'Infrastructure as Code',
          children: [
            { id: 'terraform-db', title: 'Terraform' },
            { id: 'pulumi-cloudformation', title: 'Pulumi & CloudFormation' },
            { id: 'ansible-db', title: 'Ansible & Config Management' },
          ],
        },
        {
          id: 'database-cicd',
          title: 'Database CI/CD',
          children: [
            { id: 'schema-migrations-cicd', title: 'Schema Migrations in CI/CD' },
            { id: 'migration-tools', title: 'Migration Tools (Liquibase, etc.)' },
            { id: 'gitops-databases', title: 'GitOps for Databases' },
            { id: 'testing-database-changes', title: 'Testing Database Changes' },
          ],
        },
        {
          id: 'data-seeding-environments',
          title: 'Environments & Data',
          children: [
            { id: 'data-seeding', title: 'Data Seeding' },
            { id: 'ephemeral-databases', title: 'Ephemeral / Preview Databases' },
            { id: 'production-data-masking', title: 'Masking Prod Data for Dev' },
          ],
        },
      ],
    },
    {
      id: 'data-migration-ops',
      title: 'Data Migration',
      summary: 'Moving data between databases and platforms safely.',
      level: 'advanced',
      children: [
        {
          id: 'migration-strategies-ops',
          title: 'Migration Strategies',
          children: [
            { id: 'big-bang-migration', title: 'Big-Bang Migration' },
            { id: 'incremental-migration', title: 'Incremental / Trickle Migration' },
            { id: 'dual-write-migration', title: 'Dual-Write Migration' },
            { id: 'strangler-fig-db', title: 'Strangler Fig Pattern' },
          ],
        },
        {
          id: 'migration-types-ops',
          title: 'Migration Types',
          children: [
            { id: 'rdbms-to-nosql', title: 'RDBMS to NoSQL' },
            { id: 'nosql-to-nosql', title: 'NoSQL to NoSQL' },
            { id: 'on-prem-to-cloud', title: 'On-Prem to Cloud' },
            { id: 'version-migration', title: 'Version / Engine Migration' },
          ],
        },
        {
          id: 'migration-tooling',
          title: 'Tooling & Validation',
          children: [
            { id: 'cdc-for-migration', title: 'CDC for Migration' },
            { id: 'etl-migration-tools', title: 'ETL & Migration Services' },
            { id: 'data-validation-migration', title: 'Data Validation & Reconciliation' },
            { id: 'cutover-rollback', title: 'Cutover & Rollback' },
          ],
        },
      ],
    },
  ],
})
