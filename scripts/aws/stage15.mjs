import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'analytics',
  rootStartOrder: 43,
  tree: [
    {
      id: 'data-lakes-etl',
      title: 'Data Lakes & ETL',
      summary: 'Glue, Lake Formation and data lakes.',
      level: 'advanced',
      children: [
        {
          id: 'data-analytics-fundamentals',
          title: 'Analytics Fundamentals',
          children: [
            { id: 'big-data-concepts', title: 'Big Data Concepts (Volume, Velocity, Variety)' },
            { id: 'batch-vs-streaming', title: 'Batch vs Streaming' },
            { id: 'data-lake-vs-warehouse', title: 'Data Lake vs Data Warehouse' },
            { id: 'data-lakehouse', title: 'Data Lakehouse' },
            { id: 'etl-vs-elt', title: 'ETL vs ELT' },
          ],
        },
        {
          id: 'data-lakes',
          title: 'Data Lakes on AWS',
          children: [
            { id: 's3-data-lake', title: 'S3 as a Data Lake' },
            { id: 'lake-formation', title: 'AWS Lake Formation' },
            { id: 'data-lake-permissions', title: 'Lake Formation Permissions' },
            { id: 'data-catalog', title: 'Glue Data Catalog' },
            { id: 'data-lake-zones', title: 'Raw, Curated & Trusted Zones' },
          ],
        },
        {
          id: 'aws-glue',
          title: 'AWS Glue',
          children: [
            { id: 'glue-overview', title: 'Glue Overview' },
            { id: 'glue-crawlers', title: 'Crawlers' },
            { id: 'glue-etl-jobs', title: 'ETL Jobs' },
            { id: 'glue-studio', title: 'Glue Studio' },
            { id: 'glue-databrew', title: 'Glue DataBrew' },
            { id: 'glue-workflows', title: 'Workflows & Triggers' },
          ],
        },
      ],
    },
    {
      id: 'querying-warehousing',
      title: 'Querying & Warehousing',
      summary: 'Athena, Redshift and EMR.',
      level: 'advanced',
      children: [
        {
          id: 'amazon-athena',
          title: 'Amazon Athena',
          children: [
            { id: 'athena-overview', title: 'Athena Overview' },
            { id: 'querying-s3', title: 'Querying S3 with SQL' },
            { id: 'athena-partitioning', title: 'Partitioning & Performance' },
            { id: 'athena-federated-queries', title: 'Federated Queries' },
            { id: 'athena-file-formats', title: 'File Formats (Parquet, ORC)' },
          ],
        },
        {
          id: 'amazon-redshift',
          title: 'Amazon Redshift',
          children: [
            { id: 'redshift-overview', title: 'Redshift Overview' },
            { id: 'redshift-cluster-architecture', title: 'Cluster Architecture' },
            { id: 'distribution-sort-keys', title: 'Distribution & Sort Keys' },
            { id: 'redshift-spectrum-analytics', title: 'Redshift Spectrum' },
            { id: 'redshift-serverless-analytics', title: 'Redshift Serverless' },
            { id: 'redshift-data-sharing', title: 'Data Sharing' },
          ],
        },
        {
          id: 'amazon-emr',
          title: 'Amazon EMR',
          children: [
            { id: 'emr-overview', title: 'EMR Overview' },
            { id: 'hadoop-spark-emr', title: 'Hadoop & Spark on EMR' },
            { id: 'emr-cluster-types', title: 'Cluster Types & Instance Fleets' },
            { id: 'emr-serverless', title: 'EMR Serverless' },
            { id: 'emr-on-eks', title: 'EMR on EKS' },
          ],
        },
      ],
    },
    {
      id: 'streaming-visualization',
      title: 'Streaming & Visualization',
      summary: 'Kinesis, MSK, OpenSearch and QuickSight.',
      level: 'advanced',
      children: [
        {
          id: 'kinesis',
          title: 'Amazon Kinesis',
          children: [
            { id: 'kinesis-data-streams', title: 'Kinesis Data Streams' },
            { id: 'kinesis-data-firehose', title: 'Kinesis Data Firehose' },
            { id: 'kinesis-data-analytics', title: 'Managed Service for Apache Flink' },
            { id: 'kinesis-video-streams', title: 'Kinesis Video Streams' },
            { id: 'shards-scaling', title: 'Shards & Scaling' },
          ],
        },
        {
          id: 'streaming-platforms',
          title: 'Streaming Platforms',
          children: [
            { id: 'amazon-msk', title: 'Amazon MSK (Kafka)' },
            { id: 'msk-connect', title: 'MSK Connect' },
            { id: 'kinesis-vs-msk', title: 'Kinesis vs MSK' },
          ],
        },
        {
          id: 'search-analytics',
          title: 'Search & Log Analytics',
          children: [
            { id: 'opensearch-overview', title: 'Amazon OpenSearch Service' },
            { id: 'opensearch-indexing', title: 'Indexing & Search' },
            { id: 'opensearch-dashboards', title: 'OpenSearch Dashboards' },
            { id: 'log-analytics-use-case', title: 'Log Analytics Use Cases' },
          ],
        },
        {
          id: 'data-visualization',
          title: 'Data Visualization',
          children: [
            { id: 'quicksight-overview', title: 'Amazon QuickSight Overview' },
            { id: 'quicksight-spice', title: 'SPICE Engine' },
            { id: 'quicksight-dashboards', title: 'Dashboards & Analyses' },
            { id: 'quicksight-ml-insights', title: 'ML Insights & Q' },
          ],
        },
        {
          id: 'data-governance-analytics',
          title: 'Data Governance & Sharing',
          children: [
            { id: 'datazone', title: 'Amazon DataZone' },
            { id: 'data-exchange', title: 'AWS Data Exchange' },
            { id: 'data-quality-glue', title: 'Glue Data Quality' },
          ],
        },
      ],
    },
  ],
})
