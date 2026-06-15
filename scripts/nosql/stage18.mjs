import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'integration-ecosystem',
  rootStartOrder: 93,
  tree: [
    {
      id: 'application-integration',
      title: 'Application Integration',
      summary: 'Connecting NoSQL databases cleanly into application architectures.',
      level: 'intermediate',
      children: [
        {
          id: 'data-access-layer',
          title: 'Data Access Layer',
          children: [
            { id: 'repository-pattern', title: 'Repository Pattern' },
            { id: 'data-mapper', title: 'Data Mapper' },
            { id: 'unit-of-work', title: 'Unit of Work' },
            { id: 'dao-pattern', title: 'DAO Pattern' },
          ],
        },
        {
          id: 'integration-patterns-app',
          title: 'Integration Patterns',
          children: [
            { id: 'caching-layer-integration', title: 'Caching Layer' },
            { id: 'read-write-splitting', title: 'Read/Write Splitting' },
            { id: 'database-per-service', title: 'Database-per-Service' },
            { id: 'shared-database-antipattern', title: 'Shared Database (Anti-Pattern)' },
          ],
        },
        {
          id: 'framework-integration',
          title: 'Framework Integration',
          children: [
            { id: 'spring-data-integration', title: 'Spring Data' },
            { id: 'nodejs-integration', title: 'Node.js Ecosystem' },
            { id: 'python-integration', title: 'Python Ecosystem' },
            { id: 'dotnet-integration', title: '.NET Ecosystem' },
          ],
        },
      ],
    },
    {
      id: 'change-data-capture',
      title: 'Change Data Capture (CDC)',
      summary: 'Streaming database changes to downstream systems in real time.',
      level: 'advanced',
      children: [
        {
          id: 'cdc-fundamentals',
          title: 'CDC Fundamentals',
          children: [
            { id: 'what-is-cdc', title: 'What is CDC' },
            { id: 'log-based-cdc', title: 'Log-Based CDC' },
            { id: 'query-based-cdc', title: 'Query / Trigger-Based CDC' },
            { id: 'change-streams-cdc', title: 'Change Streams & Feeds' },
          ],
        },
        {
          id: 'cdc-tools',
          title: 'CDC Tools',
          children: [
            { id: 'debezium', title: 'Debezium' },
            { id: 'kafka-connect', title: 'Kafka Connect' },
            { id: 'dynamodb-streams-cdc', title: 'DynamoDB Streams' },
            { id: 'mongodb-change-streams-cdc', title: 'MongoDB Change Streams' },
          ],
        },
        {
          id: 'cdc-use-cases',
          title: 'CDC Use Cases',
          children: [
            { id: 'cache-invalidation-cdc', title: 'Cache Invalidation' },
            { id: 'search-indexing-cdc', title: 'Search Index Sync' },
            { id: 'replication-cdc', title: 'Cross-System Replication' },
            { id: 'event-driven-cdc', title: 'Event-Driven Architecture' },
          ],
        },
      ],
    },
    {
      id: 'streaming-pipelines',
      title: 'Streaming & Event Pipelines',
      summary: 'Integrating NoSQL with streaming platforms and processors.',
      level: 'advanced',
      children: [
        {
          id: 'streaming-platforms-integ',
          title: 'Streaming Platforms',
          children: [
            { id: 'kafka-integration', title: 'Apache Kafka' },
            { id: 'pulsar-integration', title: 'Apache Pulsar' },
            { id: 'kinesis', title: 'Amazon Kinesis' },
          ],
        },
        {
          id: 'stream-processing',
          title: 'Stream Processing',
          children: [
            { id: 'kafka-streams-proc', title: 'Kafka Streams' },
            { id: 'apache-flink', title: 'Apache Flink' },
            { id: 'spark-streaming', title: 'Spark Structured Streaming' },
            { id: 'materialized-views-streaming', title: 'Streaming Materialized Views' },
          ],
        },
        {
          id: 'sink-source-connectors',
          title: 'Connectors',
          children: [
            { id: 'source-connectors', title: 'Source Connectors' },
            { id: 'sink-connectors', title: 'Sink Connectors' },
            { id: 'connector-config', title: 'Connector Configuration' },
          ],
        },
      ],
    },
    {
      id: 'data-pipelines-etl',
      title: 'Data Pipelines & ETL',
      summary: 'Moving NoSQL data into analytics and warehousing systems.',
      level: 'advanced',
      children: [
        {
          id: 'etl-elt',
          title: 'ETL & ELT',
          children: [
            { id: 'etl-vs-elt', title: 'ETL vs ELT' },
            { id: 'batch-vs-streaming-etl', title: 'Batch vs Streaming' },
            { id: 'data-transformation', title: 'Data Transformation' },
          ],
        },
        {
          id: 'pipeline-tools',
          title: 'Pipeline Tools',
          children: [
            { id: 'airflow', title: 'Apache Airflow' },
            { id: 'dbt', title: 'dbt' },
            { id: 'fivetran-airbyte', title: 'Fivetran & Airbyte' },
            { id: 'glue-dataflow', title: 'AWS Glue / GCP Dataflow' },
          ],
        },
        {
          id: 'analytics-warehouses',
          title: 'Analytics & Warehouses',
          children: [
            { id: 'data-warehouse-integration', title: 'Data Warehouse Integration' },
            { id: 'data-lake-lakehouse', title: 'Data Lake & Lakehouse' },
            { id: 'snowflake-databricks', title: 'Snowflake & Databricks' },
          ],
        },
      ],
    },
    {
      id: 'polyglot-persistence',
      title: 'Polyglot Persistence',
      summary: 'Using multiple databases together in one system.',
      level: 'advanced',
      children: [
        {
          id: 'polyglot-concepts',
          title: 'Polyglot Concepts',
          children: [
            { id: 'right-tool-per-job', title: 'Right Tool per Job' },
            { id: 'polyglot-tradeoffs', title: 'Operational Trade-offs' },
            { id: 'data-consistency-across-stores', title: 'Consistency Across Stores' },
          ],
        },
        {
          id: 'polyglot-patterns',
          title: 'Polyglot Patterns',
          children: [
            { id: 'command-query-stores', title: 'Separate Command & Query Stores' },
            { id: 'primary-plus-derived', title: 'Primary + Derived Stores' },
            { id: 'cache-search-primary', title: 'Primary + Cache + Search' },
          ],
        },
      ],
    },
    {
      id: 'ai-ml-integration',
      title: 'AI & ML Integration',
      summary: 'Using NoSQL databases as part of AI and ML systems.',
      level: 'advanced',
      children: [
        {
          id: 'rag-integration',
          title: 'RAG & LLM Integration',
          children: [
            { id: 'vector-db-rag-integ', title: 'Vector DB for RAG' },
            { id: 'semantic-caching', title: 'Semantic Caching' },
            { id: 'llm-memory-stores', title: 'LLM Memory Stores' },
            { id: 'graphrag-integration', title: 'GraphRAG' },
          ],
        },
        {
          id: 'feature-stores',
          title: 'Feature Stores',
          children: [
            { id: 'online-feature-store', title: 'Online Feature Store' },
            { id: 'offline-feature-store', title: 'Offline Feature Store' },
            { id: 'feature-store-tools', title: 'Feature Store Tools (Feast)' },
          ],
        },
        {
          id: 'ml-data-management',
          title: 'ML Data Management',
          children: [
            { id: 'embedding-storage', title: 'Embedding Storage' },
            { id: 'model-metadata-store', title: 'Model & Metadata Stores' },
            { id: 'real-time-inference-data', title: 'Real-Time Inference Data' },
          ],
        },
      ],
    },
  ],
})
