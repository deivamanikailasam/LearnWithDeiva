import { addTopics } from './addTopics.mjs'

// Stage 14 — Stateful Workloads
addTopics([
  /* ---------- statefulsets-deep ---------- */
  {
    id: 'statefulset-architecture',
    title: 'StatefulSet Architecture',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'statefulset-controller', title: 'StatefulSet Controller' },
      { id: 'identity-and-stable-naming', title: 'Identity & Stable Naming' },
      { id: 'hostname-pattern', title: 'Hostname Pattern (<name>-<ordinal>)' },
      { id: 'subdomain-and-headless-service', title: 'Subdomain & Headless Service' },
      { id: 'pod-ordinal-and-completion-mode', title: 'Pod Ordinal Index' },
      { id: 'start-ordinal-field', title: 'startOrdinal Field' },
    ],
  },
  {
    id: 'ordered-vs-parallel-management',
    title: 'Ordered vs Parallel Management',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'ordered-pod-creation', title: 'Ordered Pod Creation' },
      { id: 'ordered-pod-termination', title: 'Ordered Pod Termination' },
      { id: 'parallel-podmanagementpolicy', title: 'Parallel podManagementPolicy' },
      { id: 'when-to-use-parallel', title: 'When to Use Parallel Management' },
    ],
  },
  {
    id: 'statefulset-update-strategies-deep',
    title: 'StatefulSet Update Strategies (Deep)',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'rollingupdate-statefulset-deep', title: 'RollingUpdate (Deep)' },
      { id: 'ondelete-statefulset-deep', title: 'OnDelete (Deep)' },
      { id: 'partition-rolling-deep', title: 'Partition Rolling (Deep)' },
      { id: 'maxunavailable-on-statefulsets', title: 'maxUnavailable on StatefulSets (KEP-961)' },
      { id: 'min-replicas-on-update', title: 'minReplicasOnUpdate' },
    ],
  },
  {
    id: 'statefulset-storage',
    title: 'StatefulSet Storage',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'volumeclaimtemplates-deep', title: 'volumeClaimTemplates (Deep)' },
      { id: 'persistentvolumeclaim-retention-policy-deep', title: 'persistentVolumeClaimRetentionPolicy' },
      { id: 'retention-when-deleted', title: 'whenDeleted Behaviour' },
      { id: 'retention-when-scaled', title: 'whenScaled Behaviour' },
      { id: 'storage-class-considerations-statefulset', title: 'StorageClass Considerations' },
      { id: 'pvc-template-resizing', title: 'Resizing volumeClaimTemplates PVCs' },
    ],
  },
  {
    id: 'statefulset-networking',
    title: 'StatefulSet Networking',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'headless-service-required', title: 'Headless Service Required' },
      { id: 'per-pod-dns-records', title: 'Per-Pod DNS Records' },
      { id: 'reachability-during-rollout', title: 'Reachability During Rollout' },
      { id: 'pod-fqdn-and-srv-records', title: 'Pod FQDN & SRV Records' },
    ],
  },
  {
    id: 'multi-zone-statefulsets',
    title: 'Multi-Zone StatefulSets',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'zone-aware-volume-binding', title: 'Zone-Aware Volume Binding' },
      { id: 'topology-spread-on-statefulsets', title: 'Topology Spread on StatefulSets' },
      { id: 'zone-failure-recovery', title: 'Zone Failure Recovery' },
      { id: 'cross-zone-replication-considerations', title: 'Cross-Zone Replication Considerations' },
    ],
  },
  {
    id: 'statefulset-recovery-debugging',
    title: 'StatefulSet Recovery & Debugging',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'reclaiming-orphaned-pvs', title: 'Reclaiming Orphaned PVs' },
      { id: 'statefulset-pod-stuck-pending', title: 'Pod Stuck in Pending' },
      { id: 'forced-delete-stuck-pod', title: 'Force-Deleting a Stuck Pod' },
      { id: 'statefulset-bootstrap-issues', title: 'Bootstrap Issues' },
      { id: 'replacing-a-statefulset-pod', title: 'Replacing a StatefulSet Pod' },
    ],
  },
  {
    id: 'alternatives-to-statefulsets',
    title: 'Alternatives to StatefulSets',
    parentId: 'statefulsets-deep',
    children: [
      { id: 'controller-driven-state', title: 'Controller-Driven State (Operators)' },
      { id: 'operator-managed-state', title: 'Operator-Managed State' },
      { id: 'kustomized-deployments-with-pvc', title: 'Deployments + Standalone PVCs' },
      { id: 'application-managed-clustering', title: 'Application-Managed Clustering (e.g. Kafka KRaft)' },
    ],
  },

  /* ---------- databases-on-kubernetes ---------- */
  {
    id: 'database-on-k8s-considerations',
    title: 'Database-on-K8s Considerations',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'storage-performance-considerations', title: 'Storage Performance Considerations' },
      { id: 'networking-considerations-db', title: 'Networking Considerations' },
      { id: 'failure-domain-considerations', title: 'Failure Domain Considerations' },
      { id: 'upgrade-and-backup-considerations', title: 'Upgrade & Backup Considerations' },
      { id: 'operators-vs-statefulsets-only', title: 'Operators vs StatefulSets-Only' },
      { id: 'managed-db-vs-on-cluster-db', title: 'Managed DB vs On-Cluster DB' },
    ],
  },
  {
    id: 'postgresql-operators',
    title: 'PostgreSQL Operators',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'cloudnative-pg', title: 'CloudNativePG (CNPG)' },
      { id: 'zalando-postgres-operator', title: 'Zalando Postgres Operator' },
      { id: 'crunchydata-pgo', title: 'CrunchyData PGO' },
      { id: 'stackgres', title: 'StackGres' },
      { id: 'percona-postgres-operator', title: 'Percona PostgreSQL Operator' },
    ],
  },
  {
    id: 'mysql-and-mariadb-operators',
    title: 'MySQL & MariaDB Operators',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'oracle-mysql-operator', title: 'Oracle MySQL Operator' },
      { id: 'bitpoke-mysql-operator', title: 'Bitpoke MySQL Operator' },
      { id: 'percona-xtradb-cluster-operator', title: 'Percona XtraDB Cluster Operator' },
      { id: 'mariadb-operator', title: 'MariaDB Operator' },
      { id: 'vitess-on-k8s', title: 'Vitess on K8s' },
    ],
  },
  {
    id: 'mongodb-operators',
    title: 'MongoDB Operators',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'mongodb-community-operator', title: 'MongoDB Community Operator' },
      { id: 'mongodb-enterprise-operator', title: 'MongoDB Enterprise Operator' },
      { id: 'percona-server-for-mongodb-operator', title: 'Percona Server for MongoDB Operator' },
    ],
  },
  {
    id: 'redis-on-k8s',
    title: 'Redis & In-Memory Stores on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'redis-operator-spotahome', title: 'Spotahome Redis Operator' },
      { id: 'bitnami-redis-cluster-charts', title: 'Bitnami Redis Cluster Charts' },
      { id: 'redis-enterprise-operator', title: 'Redis Enterprise Operator' },
      { id: 'kvrocks-operator', title: 'Kvrocks Operator' },
      { id: 'dragonfly-operator', title: 'Dragonfly Operator' },
    ],
  },
  {
    id: 'cassandra-on-k8s',
    title: 'Cassandra on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'k8ssandra', title: 'K8ssandra' },
      { id: 'cass-operator', title: 'cass-operator' },
      { id: 'reaper-and-medusa-on-k8s', title: 'Reaper & Medusa on K8s' },
    ],
  },
  {
    id: 'elastic-and-opensearch-on-k8s',
    title: 'Elasticsearch & OpenSearch on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'elastic-cloud-on-kubernetes-eck', title: 'Elastic Cloud on Kubernetes (ECK)' },
      { id: 'opensearch-operator', title: 'OpenSearch Operator' },
    ],
  },
  {
    id: 'kafka-and-streaming-on-k8s',
    title: 'Kafka & Streaming on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'strimzi', title: 'Strimzi' },
      { id: 'confluent-operator', title: 'Confluent Operator' },
      { id: 'redpanda-on-k8s', title: 'Redpanda on K8s' },
      { id: 'pulsar-operator', title: 'Pulsar Operator' },
      { id: 'kraft-mode-on-k8s', title: 'Kafka KRaft Mode on K8s' },
    ],
  },
  {
    id: 'rabbitmq-and-messaging-on-k8s',
    title: 'RabbitMQ & Messaging on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'rabbitmq-cluster-operator', title: 'RabbitMQ Cluster Operator' },
      { id: 'messaging-topology-operator', title: 'Messaging Topology Operator' },
      { id: 'nats-operator', title: 'NATS Operator (Pointer)' },
    ],
  },
  {
    id: 'distributed-databases-on-k8s',
    title: 'Distributed Databases on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'cockroachdb-operator', title: 'CockroachDB Operator' },
      { id: 'tidb-operator', title: 'TiDB Operator' },
      { id: 'yugabytedb-operator', title: 'YugabyteDB Operator' },
      { id: 'clickhouse-operator', title: 'ClickHouse Operator' },
      { id: 'scylladb-operator', title: 'ScyllaDB Operator' },
    ],
  },
  {
    id: 'vector-and-search-databases-on-k8s',
    title: 'Vector & Search Databases on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'milvus-operator', title: 'Milvus Operator' },
      { id: 'weaviate-on-k8s', title: 'Weaviate on K8s' },
      { id: 'qdrant-on-k8s', title: 'Qdrant on K8s' },
      { id: 'pinecone-pointer', title: 'Pinecone (Managed, Pointer)' },
    ],
  },
  {
    id: 'time-series-and-analytics-on-k8s',
    title: 'Time-Series & Analytics on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'influxdb-operator', title: 'InfluxDB Operator' },
      { id: 'timescaledb-on-k8s', title: 'TimescaleDB on K8s' },
      { id: 'prometheus-operator-pointer-stage14', title: 'Prometheus Operator (Pointer)' },
      { id: 'victoriametrics-operator-pointer-stage14', title: 'VictoriaMetrics Operator (Pointer)' },
    ],
  },
  {
    id: 'data-platforms-on-k8s',
    title: 'Data Platforms on K8s',
    parentId: 'databases-on-kubernetes',
    children: [
      { id: 'spark-on-k8s', title: 'Apache Spark on K8s' },
      { id: 'flink-operator', title: 'Apache Flink Operator' },
      { id: 'airflow-on-k8s', title: 'Airflow on K8s' },
      { id: 'dagster-on-k8s', title: 'Dagster on K8s' },
      { id: 'trino-on-k8s', title: 'Trino on K8s' },
      { id: 'datafusion-and-druid-on-k8s', title: 'DataFusion & Druid on K8s' },
    ],
  },

  /* ---------- backup-restore ---------- */
  {
    id: 'backup-strategies-on-k8s',
    title: 'Backup Strategies on Kubernetes',
    parentId: 'backup-restore',
    children: [
      { id: 'resource-backup-vs-volume-backup', title: 'Resource Backup vs Volume Backup' },
      { id: 'application-aware-backups', title: 'Application-Aware Backups' },
      { id: 'scheduled-vs-on-demand', title: 'Scheduled vs On-Demand' },
      { id: 'cross-cluster-restore', title: 'Cross-Cluster Restore' },
      { id: 'rpo-rto-on-k8s', title: 'RPO / RTO on Kubernetes' },
      { id: 'immutable-backup-storage', title: 'Immutable Backup Storage' },
    ],
  },
  {
    id: 'velero',
    title: 'Velero',
    parentId: 'backup-restore',
    children: [
      { id: 'velero-overview', title: 'Velero Overview' },
      { id: 'velero-architecture', title: 'Velero Architecture' },
      { id: 'velero-backup-resource', title: 'Backup Resource' },
      { id: 'velero-restore-resource', title: 'Restore Resource' },
      { id: 'velero-schedule-resource', title: 'Schedule Resource' },
      { id: 'velero-backuprepository', title: 'BackupRepository' },
      { id: 'velero-resource-filtering', title: 'Resource Filtering' },
      { id: 'velero-pre-post-hooks', title: 'Pre / Post Backup Hooks' },
      { id: 'velero-csi-snapshot-integration', title: 'CSI Snapshot Integration' },
      { id: 'velero-restic-and-kopia-integration', title: 'Restic & Kopia File-System Backup' },
      { id: 'velero-plugins', title: 'Velero Plugins' },
      { id: 'velero-cluster-migration', title: 'Cluster Migration with Velero' },
    ],
  },
  {
    id: 'kasten-k10',
    title: 'Kasten K10',
    parentId: 'backup-restore',
    children: [
      { id: 'k10-overview-pointer', title: 'K10 Overview (Pointer)' },
      { id: 'k10-policies-and-blueprints', title: 'K10 Policies & Blueprints' },
      { id: 'k10-multi-cluster', title: 'K10 Multi-Cluster' },
    ],
  },
  {
    id: 'portworx-px-backup',
    title: 'Portworx PX-Backup',
    parentId: 'backup-restore',
    children: [
      { id: 'px-backup-overview-pointer', title: 'PX-Backup Overview (Pointer)' },
      { id: 'px-backup-namespaced-policies', title: 'Namespaced Policies' },
    ],
  },
  {
    id: 'kubestash-and-stash',
    title: 'KubeStash & Stash',
    parentId: 'backup-restore',
    children: [
      { id: 'kubestash-overview', title: 'KubeStash Overview' },
      { id: 'stash-legacy', title: 'Stash (Legacy)' },
      { id: 'restic-backend-pointer', title: 'Restic Backend (Pointer)' },
    ],
  },
  {
    id: 'volume-snapshot-based-backups',
    title: 'Volume-Snapshot-Based Backups',
    parentId: 'backup-restore',
    children: [
      { id: 'csi-snapshots-pointer', title: 'CSI Snapshots (Pointer)' },
      { id: 'volumegroupsnapshots-pointer-stage14', title: 'VolumeGroupSnapshots (Pointer)' },
      { id: 'snapshot-only-backup-strategy', title: 'Snapshot-Only Backup Strategy' },
    ],
  },
  {
    id: 'cluster-state-backup',
    title: 'Cluster State Backup',
    parentId: 'backup-restore',
    children: [
      { id: 'etcd-snapshot-backup-pointer', title: 'etcd Snapshot Backup (Pointer)' },
      { id: 'gitops-state-recovery', title: 'GitOps State Recovery' },
      { id: 'manifest-backup-via-velero', title: 'Manifest Backup via Velero' },
    ],
  },
  {
    id: 'application-aware-backup-patterns',
    title: 'Application-Aware Backup Patterns',
    parentId: 'backup-restore',
    children: [
      { id: 'cnpg-cluster-aware-backups', title: 'CloudNativePG Cluster-Aware Backups' },
      { id: 'kafka-backup-via-mirrormaker', title: 'Kafka Backup via MirrorMaker' },
      { id: 'mongodb-percona-backup', title: 'MongoDB Percona Backup' },
      { id: 'redis-aof-rdb-strategies', title: 'Redis AOF/RDB Strategies' },
    ],
  },
  {
    id: 'restore-testing-and-drills',
    title: 'Restore Testing & Drills',
    parentId: 'backup-restore',
    children: [
      { id: 'periodic-restore-drills', title: 'Periodic Restore Drills' },
      { id: 'partial-restore-strategies', title: 'Partial Restore Strategies' },
      { id: 'sandbox-restore-environments', title: 'Sandbox Restore Environments' },
    ],
  },
  {
    id: 'dr-pointer-from-stage14',
    title: 'Disaster Recovery (Pointer)',
    parentId: 'backup-restore',
    children: [
      { id: 'dr-strategies-pointer-stage14', title: 'DR Strategies (Pointer to Stage 18)' },
    ],
  },
])
