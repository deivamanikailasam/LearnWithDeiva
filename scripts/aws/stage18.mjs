import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'cost-optimization',
  rootStartOrder: 52,
  tree: [
    {
      id: 'cost-visibility',
      title: 'Cost Visibility & Monitoring',
      summary: 'Cost Explorer, budgets and reports.',
      level: 'intermediate',
      children: [
        {
          id: 'cost-monitoring-tools',
          title: 'Cost Monitoring Tools',
          children: [
            { id: 'cost-explorer', title: 'AWS Cost Explorer' },
            { id: 'aws-budgets', title: 'AWS Budgets' },
            { id: 'budget-actions', title: 'Budget Actions' },
            { id: 'cost-anomaly-detection', title: 'Cost Anomaly Detection' },
            { id: 'billing-console', title: 'Billing Console & Bills' },
          ],
        },
        {
          id: 'cost-reporting',
          title: 'Cost Reporting',
          children: [
            { id: 'cost-and-usage-report', title: 'Cost & Usage Report (CUR)' },
            { id: 'cur-with-athena', title: 'Analyzing CUR with Athena' },
            { id: 'cost-categories', title: 'Cost Categories' },
            { id: 'cost-allocation-tags-cost', title: 'Cost Allocation Tags' },
          ],
        },
        {
          id: 'cost-organization',
          title: 'Cost Organization',
          children: [
            { id: 'consolidated-billing-cost', title: 'Consolidated Billing' },
            { id: 'chargeback-showback', title: 'Chargeback & Showback' },
            { id: 'tagging-for-cost', title: 'Tagging Strategy for Cost' },
            { id: 'billing-conductor', title: 'AWS Billing Conductor' },
          ],
        },
      ],
    },
    {
      id: 'cost-control-optimization',
      title: 'Cost Control & Optimization',
      summary: 'Optimization strategies and tooling.',
      level: 'advanced',
      children: [
        {
          id: 'optimization-tools',
          title: 'Optimization Tools',
          children: [
            { id: 'compute-optimizer', title: 'AWS Compute Optimizer' },
            { id: 'trusted-advisor-cost', title: 'Trusted Advisor Cost Checks' },
            { id: 'cost-optimization-hub', title: 'Cost Optimization Hub' },
            { id: 's3-storage-lens', title: 'S3 Storage Lens' },
          ],
        },
        {
          id: 'right-sizing',
          title: 'Right-Sizing & Efficiency',
          children: [
            { id: 'right-sizing-instances', title: 'Right-Sizing Instances' },
            { id: 'auto-scaling-cost', title: 'Auto Scaling for Cost' },
            { id: 'scheduling-resources', title: 'Scheduling (Instance Scheduler)' },
            { id: 'graviton-cost', title: 'Graviton for Cost Savings' },
          ],
        },
        {
          id: 'storage-network-cost',
          title: 'Storage & Network Cost',
          children: [
            { id: 's3-lifecycle-cost', title: 'S3 Lifecycle & Tiering' },
            { id: 'ebs-optimization', title: 'EBS Volume Optimization' },
            { id: 'data-transfer-optimization', title: 'Data Transfer Cost Reduction' },
            { id: 'idle-resource-cleanup', title: 'Idle Resource Cleanup' },
          ],
        },
        {
          id: 'finops',
          title: 'FinOps & Governance',
          children: [
            { id: 'finops-principles', title: 'FinOps Principles' },
            { id: 'cost-guardrails', title: 'Cost Guardrails (SCPs & Budgets)' },
            { id: 'cost-aware-architecture', title: 'Cost-Aware Architecture' },
            { id: 'cost-optimization-pillar', title: 'Cost Optimization Pillar' },
          ],
        },
      ],
    },
    {
      id: 'pricing-purchasing',
      title: 'Pricing Models & Purchasing Options',
      summary: 'On-demand, reserved, savings plans and spot.',
      level: 'intermediate',
      children: [
        {
          id: 'compute-purchasing',
          title: 'Compute Purchasing Options',
          children: [
            { id: 'on-demand-pricing', title: 'On-Demand' },
            { id: 'reserved-instances-pricing', title: 'Reserved Instances' },
            { id: 'savings-plans', title: 'Savings Plans' },
            { id: 'spot-pricing', title: 'Spot Instances' },
            { id: 'dedicated-hosts-pricing', title: 'Dedicated Hosts' },
          ],
        },
        {
          id: 'commitment-management',
          title: 'Commitment Management',
          children: [
            { id: 'ri-coverage-utilization', title: 'RI Coverage & Utilization' },
            { id: 'savings-plans-recommendations', title: 'Savings Plans Recommendations' },
            { id: 'reserved-capacity', title: 'Reserved Capacity (RDS, ElastiCache, etc.)' },
            { id: 'convertible-vs-standard-ri', title: 'Convertible vs Standard RIs' },
          ],
        },
        {
          id: 'pricing-models-services',
          title: 'Service Pricing Models',
          children: [
            { id: 'free-tier-pricing', title: 'Free Tier' },
            { id: 'serverless-pricing', title: 'Serverless Pricing' },
            { id: 'tiered-pricing', title: 'Tiered & Volume Pricing' },
            { id: 'data-transfer-pricing', title: 'Data Transfer Pricing' },
            { id: 'pricing-calculator-cost', title: 'AWS Pricing Calculator' },
          ],
        },
      ],
    },
  ],
})
