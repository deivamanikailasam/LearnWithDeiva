import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'time-series-databases',
  rootStartOrder: 48,
  tree: [
    {
      id: 'time-series-fundamentals',
      title: 'Time-Series Database Fundamentals',
      summary: 'Databases optimized for timestamped, append-heavy data.',
      level: 'intermediate',
      children: [
        {
          id: 'time-series-data-model',
          title: 'Time-Series Data Model',
          children: [
            { id: 'measurements-metrics', title: 'Measurements & Metrics' },
            { id: 'timestamps', title: 'Timestamps' },
            { id: 'tags-fields', title: 'Tags & Fields' },
            { id: 'series-cardinality', title: 'Series & Cardinality' },
            { id: 'data-points', title: 'Data Points' },
          ],
        },
        {
          id: 'tsdb-characteristics',
          title: 'Characteristics',
          children: [
            { id: 'append-heavy-writes', title: 'Append-Heavy Writes' },
            { id: 'time-ordered-data', title: 'Time-Ordered Data' },
            { id: 'high-ingest-rate', title: 'High Ingest Rate' },
            { id: 'immutability-ts', title: 'Immutability' },
            { id: 'recent-data-bias', title: 'Recent-Data Bias' },
          ],
        },
        {
          id: 'tsdb-techniques',
          title: 'Storage & Query Techniques',
          children: [
            { id: 'time-partitioning', title: 'Time Partitioning' },
            { id: 'ts-compression', title: 'Compression (Gorilla, Delta)' },
            { id: 'downsampling', title: 'Downsampling & Rollups' },
            { id: 'retention-policies', title: 'Retention Policies' },
            { id: 'continuous-aggregates', title: 'Continuous Aggregates' },
            { id: 'window-functions-ts', title: 'Windowing & Gap Filling' },
          ],
        },
        {
          id: 'tsdb-use-cases',
          title: 'Use Cases',
          children: [
            { id: 'monitoring-observability', title: 'Monitoring & Observability' },
            { id: 'iot-telemetry', title: 'IoT Telemetry' },
            { id: 'financial-tick-data', title: 'Financial / Tick Data' },
            { id: 'application-metrics', title: 'Application Metrics' },
            { id: 'sensor-analytics', title: 'Sensor Analytics' },
          ],
        },
      ],
    },
    {
      id: 'influxdb',
      title: 'InfluxDB',
      summary: 'Popular purpose-built time-series database (InfluxDB 3.x).',
      level: 'advanced',
      children: [
        {
          id: 'influxdb-basics',
          title: 'InfluxDB Basics',
          children: [
            { id: 'influxdb-overview', title: 'Overview & Versions (1/2/3)' },
            { id: 'influxdb-data-model', title: 'Data Model (Buckets, Measurements)' },
            { id: 'influxdb-line-protocol', title: 'Line Protocol' },
            { id: 'influxdb-3-architecture', title: 'InfluxDB 3 (Arrow/Parquet/DataFusion)' },
          ],
        },
        {
          id: 'influxdb-querying',
          title: 'Querying',
          children: [
            { id: 'influxql', title: 'InfluxQL' },
            { id: 'flux', title: 'Flux' },
            { id: 'influxdb-sql', title: 'SQL Support' },
            { id: 'influxdb-tasks', title: 'Tasks & Downsampling' },
          ],
        },
        {
          id: 'influxdb-ecosystem',
          title: 'Ecosystem',
          children: [
            { id: 'telegraf', title: 'Telegraf' },
            { id: 'influxdb-cloud', title: 'InfluxDB Cloud' },
            { id: 'influxdb-clustering', title: 'Clustering & Scaling' },
          ],
        },
      ],
    },
    {
      id: 'timescaledb',
      title: 'TimescaleDB',
      summary: 'PostgreSQL extension turning Postgres into a time-series database.',
      level: 'advanced',
      children: [
        {
          id: 'timescaledb-basics',
          title: 'TimescaleDB Basics',
          children: [
            { id: 'timescaledb-overview', title: 'Overview (Postgres Extension)' },
            { id: 'hypertables', title: 'Hypertables & Chunks' },
            { id: 'timescaledb-sql', title: 'Full SQL Support' },
          ],
        },
        {
          id: 'timescaledb-features',
          title: 'Features',
          children: [
            { id: 'timescale-continuous-aggregates', title: 'Continuous Aggregates' },
            { id: 'timescale-compression', title: 'Columnar Compression' },
            { id: 'timescale-data-retention', title: 'Data Retention Policies' },
            { id: 'timescale-cloud', title: 'Timescale Cloud' },
          ],
        },
      ],
    },
    {
      id: 'prometheus',
      title: 'Prometheus',
      summary: 'Pull-based metrics & monitoring time-series database.',
      level: 'advanced',
      children: [
        {
          id: 'prometheus-basics',
          title: 'Prometheus Basics',
          children: [
            { id: 'prometheus-overview', title: 'Overview & Architecture' },
            { id: 'prometheus-pull-model', title: 'Pull Model & Scraping' },
            { id: 'prometheus-metric-types', title: 'Metric Types' },
            { id: 'prometheus-tsdb', title: 'Local TSDB Storage' },
          ],
        },
        {
          id: 'prometheus-querying',
          title: 'Querying & Alerting',
          children: [
            { id: 'promql', title: 'PromQL' },
            { id: 'prometheus-alerting', title: 'Alerting & Alertmanager' },
            { id: 'prometheus-exporters', title: 'Exporters' },
          ],
        },
        {
          id: 'prometheus-scaling',
          title: 'Scaling & Ecosystem',
          children: [
            { id: 'prometheus-remote-write', title: 'Remote Write/Read' },
            { id: 'thanos', title: 'Thanos' },
            { id: 'cortex-mimir', title: 'Cortex / Mimir' },
            { id: 'grafana-prometheus', title: 'Grafana Integration' },
          ],
        },
      ],
    },
    {
      id: 'other-tsdb',
      title: 'Other Time-Series Databases',
      summary: 'High-performance and managed time-series databases.',
      level: 'advanced',
      children: [
        {
          id: 'questdb',
          title: 'QuestDB',
          children: [
            { id: 'questdb-overview', title: 'Overview & SQL Performance' },
          ],
        },
        {
          id: 'victoriametrics',
          title: 'VictoriaMetrics',
          children: [
            { id: 'victoriametrics-overview', title: 'Overview (Prometheus-Compatible)' },
          ],
        },
        {
          id: 'clickhouse-ts',
          title: 'ClickHouse (for Time-Series)',
          children: [
            { id: 'clickhouse-overview', title: 'Overview (Columnar OLAP)' },
            { id: 'clickhouse-ts-usage', title: 'Time-Series & Observability Usage' },
          ],
        },
        {
          id: 'amazon-timestream',
          title: 'Amazon Timestream',
          children: [
            { id: 'timestream-overview', title: 'Overview (Managed TSDB)' },
          ],
        },
        {
          id: 'other-tsdb-engines',
          title: 'Other Engines',
          children: [
            { id: 'apache-iotdb', title: 'Apache IoTDB' },
            { id: 'tdengine', title: 'TDengine' },
            { id: 'graphite', title: 'Graphite' },
            { id: 'opentsdb', title: 'OpenTSDB' },
          ],
        },
      ],
    },
  ],
})
