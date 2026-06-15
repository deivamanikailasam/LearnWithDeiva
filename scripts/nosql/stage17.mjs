import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'cloud-managed',
  rootStartOrder: 87,
  tree: [
    {
      id: 'cloud-database-concepts',
      title: 'Cloud Database Concepts',
      summary: 'Managed, serverless and multi-cloud database fundamentals.',
      level: 'intermediate',
      children: [
        {
          id: 'managed-database-models',
          title: 'Managed Models',
          children: [
            { id: 'dbaas-concept', title: 'Database-as-a-Service (DBaaS)' },
            { id: 'serverless-databases', title: 'Serverless Databases' },
            { id: 'managed-vs-self-managed', title: 'Managed vs Self-Managed' },
            { id: 'shared-responsibility-db', title: 'Shared Responsibility Model' },
          ],
        },
        {
          id: 'cloud-database-features',
          title: 'Common Cloud Features',
          children: [
            { id: 'auto-scaling-cloud', title: 'Auto-Scaling' },
            { id: 'managed-backups', title: 'Managed Backups & PITR' },
            { id: 'multi-region-cloud', title: 'Multi-Region Replication' },
            { id: 'pay-per-use', title: 'Pay-Per-Use Pricing' },
          ],
        },
        {
          id: 'multi-cloud-considerations',
          title: 'Multi-Cloud & Lock-In',
          children: [
            { id: 'vendor-lock-in', title: 'Vendor Lock-In' },
            { id: 'portability', title: 'Portability & Open APIs' },
            { id: 'multi-cloud-strategy', title: 'Multi-Cloud Strategy' },
          ],
        },
      ],
    },
    {
      id: 'aws-nosql',
      title: 'AWS NoSQL Services',
      summary: 'Amazon\u2019s managed NoSQL and data services.',
      level: 'advanced',
      children: [
        {
          id: 'aws-key-value-doc',
          title: 'Key-Value & Document',
          children: [
            { id: 'aws-dynamodb-service', title: 'DynamoDB' },
            { id: 'aws-documentdb-service', title: 'DocumentDB' },
            { id: 'aws-elasticache', title: 'ElastiCache (Redis/Valkey/Memcached)' },
            { id: 'aws-memorydb', title: 'MemoryDB' },
          ],
        },
        {
          id: 'aws-specialized',
          title: 'Specialized',
          children: [
            { id: 'aws-keyspaces-service', title: 'Keyspaces (Cassandra)' },
            { id: 'aws-neptune-service', title: 'Neptune (Graph)' },
            { id: 'aws-timestream-service', title: 'Timestream (Time-Series)' },
            { id: 'aws-opensearch-service', title: 'OpenSearch Service' },
            { id: 'aws-qldb-service', title: 'QLDB (Ledger)' },
          ],
        },
      ],
    },
    {
      id: 'azure-nosql',
      title: 'Azure NoSQL Services',
      summary: 'Microsoft Azure\u2019s NoSQL offerings, led by Cosmos DB.',
      level: 'advanced',
      children: [
        {
          id: 'azure-cosmos-db',
          title: 'Azure Cosmos DB',
          children: [
            { id: 'cosmos-overview', title: 'Overview & Architecture' },
            { id: 'cosmos-apis', title: 'Multi-API (NoSQL, Mongo, Cassandra, Gremlin, Table)' },
            { id: 'cosmos-consistency-levels', title: 'Five Consistency Levels' },
            { id: 'cosmos-partitioning', title: 'Partitioning & RU/s' },
            { id: 'cosmos-global-distribution', title: 'Global Distribution' },
            { id: 'cosmos-vector-search', title: 'Vector Search' },
            { id: 'cosmos-serverless', title: 'Serverless & Autoscale' },
          ],
        },
        {
          id: 'azure-other-nosql',
          title: 'Other Azure Services',
          children: [
            { id: 'azure-cache-redis', title: 'Azure Cache for Redis' },
            { id: 'azure-table-storage', title: 'Azure Table Storage' },
            { id: 'azure-blob-nosql', title: 'Azure Blob Storage' },
            { id: 'azure-ai-search', title: 'Azure AI Search' },
          ],
        },
      ],
    },
    {
      id: 'gcp-nosql',
      title: 'Google Cloud NoSQL Services',
      summary: 'Google Cloud\u2019s managed NoSQL and data services.',
      level: 'advanced',
      children: [
        {
          id: 'gcp-document-kv',
          title: 'Document & Key-Value',
          children: [
            { id: 'gcp-firestore-service', title: 'Firestore' },
            { id: 'gcp-bigtable-service', title: 'Bigtable' },
            { id: 'gcp-memorystore', title: 'Memorystore (Redis/Valkey)' },
          ],
        },
        {
          id: 'gcp-other-nosql',
          title: 'Other Services',
          children: [
            { id: 'gcp-spanner-service', title: 'Spanner (Distributed SQL)' },
            { id: 'gcp-bigquery-nosql', title: 'BigQuery (Analytics)' },
            { id: 'gcp-cloud-storage', title: 'Cloud Storage' },
          ],
        },
      ],
    },
    {
      id: 'independent-dbaas',
      title: 'Independent DBaaS Providers',
      summary: 'Vendor-managed cloud services across multiple clouds.',
      level: 'advanced',
      children: [
        {
          id: 'mongodb-atlas-service',
          title: 'MongoDB Atlas',
          children: [
            { id: 'atlas-overview', title: 'Overview & Clusters' },
            { id: 'atlas-search-vector', title: 'Atlas Search & Vector Search' },
            { id: 'atlas-data-federation', title: 'Data Federation & Triggers' },
          ],
        },
        {
          id: 'other-dbaas-providers',
          title: 'Other Providers',
          children: [
            { id: 'datastax-astra-service', title: 'DataStax Astra' },
            { id: 'redis-cloud-service', title: 'Redis Cloud' },
            { id: 'confluent-cloud', title: 'Confluent Cloud (Kafka)' },
            { id: 'elastic-cloud-service', title: 'Elastic Cloud' },
            { id: 'neo4j-aura-service', title: 'Neo4j Aura' },
            { id: 'cockroach-cloud', title: 'CockroachDB Cloud' },
          ],
        },
      ],
    },
    {
      id: 'cloud-cost-finops',
      title: 'Cloud Cost & FinOps',
      summary: 'Understanding and optimizing managed database costs.',
      level: 'advanced',
      children: [
        {
          id: 'cost-models',
          title: 'Cost Models',
          children: [
            { id: 'provisioned-vs-on-demand-cost', title: 'Provisioned vs On-Demand' },
            { id: 'request-units-cost', title: 'Request Units / Capacity Units' },
            { id: 'storage-transfer-cost', title: 'Storage & Data Transfer Costs' },
            { id: 'reserved-capacity', title: 'Reserved Capacity & Savings Plans' },
          ],
        },
        {
          id: 'cost-optimization-cloud',
          title: 'Cost Optimization',
          children: [
            { id: 'right-sizing', title: 'Right-Sizing' },
            { id: 'tiered-storage-cost', title: 'Tiered Storage' },
            { id: 'cost-monitoring-finops', title: 'Cost Monitoring & Budgets' },
            { id: 'ttl-archival-cost', title: 'TTL & Archival to Cut Cost' },
          ],
        },
      ],
    },
  ],
})
