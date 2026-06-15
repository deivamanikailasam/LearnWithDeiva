import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'monitoring',
  rootStartOrder: 25,
  tree: [
    {
      id: 'cloudwatch',
      title: 'Amazon CloudWatch',
      summary: 'Metrics, logs, alarms and dashboards.',
      level: 'intermediate',
      children: [
        {
          id: 'cloudwatch-metrics',
          title: 'CloudWatch Metrics',
          children: [
            { id: 'what-are-metrics', title: 'What are Metrics?' },
            { id: 'default-vs-custom-metrics', title: 'Default vs Custom Metrics' },
            { id: 'namespaces-dimensions', title: 'Namespaces & Dimensions' },
            { id: 'metric-resolution', title: 'Standard vs High Resolution' },
            { id: 'metric-math', title: 'Metric Math' },
          ],
        },
        {
          id: 'cloudwatch-logs',
          title: 'CloudWatch Logs',
          children: [
            { id: 'log-groups-streams', title: 'Log Groups & Log Streams' },
            { id: 'cloudwatch-agent', title: 'CloudWatch Agent' },
            { id: 'logs-insights', title: 'CloudWatch Logs Insights' },
            { id: 'metric-filters', title: 'Metric Filters' },
            { id: 'logs-subscriptions', title: 'Subscription Filters' },
            { id: 'log-retention', title: 'Retention & Export' },
          ],
        },
        {
          id: 'cloudwatch-alarms',
          title: 'CloudWatch Alarms',
          children: [
            { id: 'creating-alarms', title: 'Creating Alarms' },
            { id: 'alarm-states', title: 'Alarm States & Thresholds' },
            { id: 'composite-alarms', title: 'Composite Alarms' },
            { id: 'alarm-actions', title: 'Alarm Actions (SNS, Auto Scaling)' },
            { id: 'anomaly-detection', title: 'Anomaly Detection' },
          ],
        },
        {
          id: 'cloudwatch-dashboards-events',
          title: 'Dashboards & Events',
          children: [
            { id: 'dashboards', title: 'CloudWatch Dashboards' },
            { id: 'cloudwatch-events-eventbridge', title: 'Events & EventBridge' },
            { id: 'synthetics-canaries', title: 'CloudWatch Synthetics' },
            { id: 'rum', title: 'CloudWatch RUM' },
            { id: 'container-lambda-insights', title: 'Container & Lambda Insights' },
          ],
        },
      ],
    },
    {
      id: 'auditing-governance',
      title: 'Auditing & Governance',
      summary: 'CloudTrail and AWS Config.',
      level: 'intermediate',
      children: [
        {
          id: 'cloudtrail',
          title: 'AWS CloudTrail',
          children: [
            { id: 'cloudtrail-overview', title: 'CloudTrail Overview' },
            { id: 'management-data-events', title: 'Management & Data Events' },
            { id: 'cloudtrail-trails', title: 'Trails & Multi-Region' },
            { id: 'cloudtrail-lake', title: 'CloudTrail Lake' },
            { id: 'log-integrity-validation', title: 'Log File Integrity Validation' },
            { id: 'cloudtrail-insights', title: 'CloudTrail Insights' },
          ],
        },
        {
          id: 'aws-config',
          title: 'AWS Config',
          children: [
            { id: 'config-overview', title: 'Config Overview' },
            { id: 'config-rules', title: 'Config Rules (Managed & Custom)' },
            { id: 'configuration-history', title: 'Configuration History & Snapshots' },
            { id: 'config-remediation', title: 'Remediation Actions' },
            { id: 'conformance-packs', title: 'Conformance Packs' },
            { id: 'config-aggregators', title: 'Aggregators' },
          ],
        },
        {
          id: 'governance-tools',
          title: 'Governance Tooling',
          children: [
            { id: 'cloudtrail-vs-config', title: 'CloudTrail vs Config' },
            { id: 'tagging-strategies', title: 'Tagging Strategies' },
            { id: 'resource-explorer', title: 'AWS Resource Explorer' },
            { id: 'systems-manager-inventory', title: 'Systems Manager Inventory' },
          ],
        },
      ],
    },
    {
      id: 'tracing-observability',
      title: 'Tracing & Observability',
      summary: 'X-Ray and managed observability tooling.',
      level: 'advanced',
      children: [
        {
          id: 'aws-xray',
          title: 'AWS X-Ray',
          children: [
            { id: 'xray-overview', title: 'X-Ray Overview' },
            { id: 'traces-segments', title: 'Traces, Segments & Subsegments' },
            { id: 'service-map', title: 'Service Map' },
            { id: 'xray-instrumentation', title: 'Instrumenting Applications' },
            { id: 'xray-sampling', title: 'Sampling Rules' },
          ],
        },
        {
          id: 'observability-concepts',
          title: 'Observability Concepts',
          children: [
            { id: 'three-pillars', title: 'Metrics, Logs & Traces' },
            { id: 'distributed-tracing', title: 'Distributed Tracing' },
            { id: 'slos-slis', title: 'SLOs, SLIs & SLAs' },
            { id: 'monitoring-vs-observability', title: 'Monitoring vs Observability' },
          ],
        },
        {
          id: 'managed-observability',
          title: 'Managed Observability',
          children: [
            { id: 'managed-prometheus', title: 'Amazon Managed Prometheus' },
            { id: 'managed-grafana', title: 'Amazon Managed Grafana' },
            { id: 'opentelemetry-aws', title: 'AWS Distro for OpenTelemetry' },
            { id: 'devops-guru', title: 'Amazon DevOps Guru' },
          ],
        },
      ],
    },
  ],
})
