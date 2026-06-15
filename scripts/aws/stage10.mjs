import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'iac-automation',
  rootStartOrder: 28,
  tree: [
    {
      id: 'cloudformation',
      title: 'AWS CloudFormation',
      summary: 'Templates, stacks and provisioning.',
      level: 'intermediate',
      children: [
        {
          id: 'iac-fundamentals',
          title: 'IaC Fundamentals',
          children: [
            { id: 'what-is-iac', title: 'What is Infrastructure as Code?' },
            { id: 'declarative-vs-imperative', title: 'Declarative vs Imperative' },
            { id: 'idempotency', title: 'Idempotency & Drift' },
            { id: 'iac-benefits', title: 'Benefits of IaC' },
          ],
        },
        {
          id: 'cfn-templates',
          title: 'CloudFormation Templates',
          children: [
            { id: 'template-structure', title: 'Template Structure' },
            { id: 'resources-section', title: 'Resources' },
            { id: 'parameters-section', title: 'Parameters' },
            { id: 'mappings-conditions', title: 'Mappings & Conditions' },
            { id: 'outputs-section', title: 'Outputs' },
            { id: 'intrinsic-functions', title: 'Intrinsic Functions' },
            { id: 'pseudo-parameters', title: 'Pseudo Parameters' },
          ],
        },
        {
          id: 'cfn-stacks',
          title: 'Stacks & Deployment',
          children: [
            { id: 'creating-stacks', title: 'Creating & Updating Stacks' },
            { id: 'change-sets', title: 'Change Sets' },
            { id: 'stack-policies', title: 'Stack Policies' },
            { id: 'nested-stacks', title: 'Nested Stacks' },
            { id: 'cross-stack-references', title: 'Cross-Stack References' },
            { id: 'stacksets', title: 'StackSets' },
            { id: 'rollback-handling', title: 'Rollback & Failure Handling' },
          ],
        },
        {
          id: 'cfn-advanced',
          title: 'Advanced CloudFormation',
          children: [
            { id: 'custom-resources', title: 'Custom Resources' },
            { id: 'cfn-modules', title: 'Modules' },
            { id: 'cfn-registry', title: 'CloudFormation Registry' },
            { id: 'cfn-hooks', title: 'Hooks & Guard' },
            { id: 'drift-detection', title: 'Drift Detection' },
          ],
        },
      ],
    },
    {
      id: 'cdk-other-iac',
      title: 'CDK & Other IaC Tools',
      summary: 'AWS CDK, SAM and Terraform.',
      level: 'intermediate',
      children: [
        {
          id: 'aws-cdk',
          title: 'AWS CDK',
          children: [
            { id: 'cdk-overview', title: 'CDK Overview' },
            { id: 'constructs', title: 'Constructs (L1, L2, L3)' },
            { id: 'cdk-stacks-apps', title: 'Stacks & Apps' },
            { id: 'cdk-synth-deploy', title: 'Synth & Deploy' },
            { id: 'cdk-languages', title: 'Supported Languages' },
            { id: 'cdk-testing', title: 'Testing CDK Code' },
          ],
        },
        {
          id: 'aws-sam',
          title: 'AWS SAM',
          children: [
            { id: 'sam-overview', title: 'SAM Overview' },
            { id: 'sam-templates', title: 'SAM Templates' },
            { id: 'sam-cli', title: 'SAM CLI & Local Testing' },
            { id: 'sam-vs-cloudformation', title: 'SAM vs CloudFormation' },
          ],
        },
        {
          id: 'third-party-iac',
          title: 'Third-Party IaC',
          children: [
            { id: 'terraform-on-aws', title: 'Terraform on AWS' },
            { id: 'pulumi', title: 'Pulumi' },
            { id: 'cloudformation-vs-terraform', title: 'CloudFormation vs Terraform' },
            { id: 'serverless-framework-iac', title: 'Serverless Framework' },
          ],
        },
        {
          id: 'service-catalog-proton',
          title: 'Self-Service Provisioning',
          children: [
            { id: 'service-catalog', title: 'AWS Service Catalog' },
            { id: 'aws-proton', title: 'AWS Proton' },
            { id: 'cloudformation-templates-sharing', title: 'Template Sharing & Standards' },
          ],
        },
      ],
    },
    {
      id: 'systems-management',
      title: 'Systems Management & Automation',
      summary: 'Systems Manager and operational automation.',
      level: 'advanced',
      children: [
        {
          id: 'systems-manager',
          title: 'AWS Systems Manager',
          children: [
            { id: 'ssm-overview', title: 'Systems Manager Overview' },
            { id: 'ssm-fleet-manager', title: 'Fleet Manager' },
            { id: 'ssm-session-manager', title: 'Session Manager' },
            { id: 'ssm-run-command', title: 'Run Command' },
            { id: 'ssm-patch-manager', title: 'Patch Manager' },
            { id: 'ssm-automation', title: 'Automation Documents' },
            { id: 'ssm-state-manager', title: 'State Manager' },
          ],
        },
        {
          id: 'config-management-tools',
          title: 'Configuration Management',
          children: [
            { id: 'opsworks', title: 'AWS OpsWorks' },
            { id: 'ec2-image-builder', title: 'EC2 Image Builder' },
            { id: 'parameter-store-config', title: 'Parameter Store for Config' },
            { id: 'appconfig', title: 'AWS AppConfig' },
          ],
        },
        {
          id: 'operational-automation',
          title: 'Operational Automation',
          children: [
            { id: 'eventbridge-automation', title: 'EventBridge-Driven Automation' },
            { id: 'lambda-automation', title: 'Lambda-Based Automation' },
            { id: 'maintenance-windows', title: 'Maintenance Windows' },
            { id: 'incident-manager', title: 'AWS Incident Manager' },
          ],
        },
      ],
    },
  ],
})
