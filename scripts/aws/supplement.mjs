import { addTopics } from './addTopics.mjs'

// Genuinely missing topics across the AWS roadmap. New L2 "group" subtopics are
// listed before their L3 children. `order` is intentionally high so additions
// sort after existing siblings without renumbering them.
addTopics([
  // ---- IAM ----
  { id: 'iam-roles--service-linked-roles', title: 'Service-Linked Roles', parentId: 'iam-roles', level: 'intermediate', tag: 'iam', order: 90 },
  { id: 'iam-roles--iam-roles-anywhere', title: 'IAM Roles Anywhere', parentId: 'iam-roles', level: 'advanced', tag: 'iam', order: 91 },

  // ---- Compute ----
  { id: 'ec2-fundamentals--nitro-system', title: 'AWS Nitro System', parentId: 'ec2-fundamentals', level: 'intermediate', tag: 'compute', order: 90 },
  { id: 'ec2-fundamentals--instance-hibernation', title: 'Instance Hibernation', parentId: 'ec2-fundamentals', level: 'intermediate', tag: 'compute', order: 91 },
  { id: 'ec2-pricing--spot-fleet', title: 'Spot Fleet', parentId: 'ec2-pricing', level: 'advanced', tag: 'compute', order: 90 },
  { id: 'ec2-pricing--ec2-fleet', title: 'EC2 Fleet', parentId: 'ec2-pricing', level: 'advanced', tag: 'compute', order: 91 },

  // ---- Storage ----
  { id: 's3-data-management--multi-region-access-points', title: 'S3 Multi-Region Access Points', parentId: 's3-data-management', level: 'advanced', tag: 'storage', order: 90 },
  { id: 's3-data-management--storage-class-analysis', title: 'Storage Class Analysis', parentId: 's3-data-management', level: 'intermediate', tag: 'storage', order: 91 },
  { id: 'amazon-file-cache', title: 'Amazon File Cache', parentId: 'block-file-storage', level: 'advanced', tag: 'storage', order: 90 },
  { id: 'amazon-file-cache--file-cache-overview', title: 'File Cache Overview', parentId: 'amazon-file-cache', level: 'advanced', tag: 'storage', order: 1 },
  { id: 'amazon-file-cache--file-cache-use-cases', title: 'Use Cases', parentId: 'amazon-file-cache', level: 'advanced', tag: 'storage', order: 2 },

  // ---- Networking ----
  { id: 'vpc-routing--prefix-lists', title: 'Prefix Lists', parentId: 'vpc-routing', level: 'intermediate', tag: 'networking', order: 90 },
  { id: 'vpc-connectivity--byoip', title: 'Bring Your Own IP (BYOIP)', parentId: 'vpc-connectivity', level: 'advanced', tag: 'networking', order: 90 },

  // ---- Databases ----
  { id: 'amazon-rds--rds-custom', title: 'RDS Custom', parentId: 'amazon-rds', level: 'advanced', tag: 'databases', order: 90 },
  { id: 'amazon-aurora--babelfish', title: 'Babelfish for Aurora PostgreSQL', parentId: 'amazon-aurora', level: 'advanced', tag: 'databases', order: 90 },
  { id: 'dynamodb--partiql', title: 'PartiQL for DynamoDB', parentId: 'dynamodb', level: 'intermediate', tag: 'databases', order: 90 },
  { id: 'dynamodb--export-import-s3', title: 'Export & Import with S3', parentId: 'dynamodb', level: 'intermediate', tag: 'databases', order: 91 },

  // ---- Security ----
  { id: 'application-access-services', title: 'Application Access Services', parentId: 'app-identity-compliance', level: 'advanced', tag: 'security', order: 90 },
  { id: 'application-access-services--verified-access', title: 'AWS Verified Access', parentId: 'application-access-services', level: 'advanced', tag: 'security', order: 1 },
  { id: 'application-access-services--verified-permissions', title: 'Amazon Verified Permissions', parentId: 'application-access-services', level: 'advanced', tag: 'security', order: 2 },
  { id: 'application-access-services--cedar-policy', title: 'Cedar Policy Language', parentId: 'application-access-services', level: 'advanced', tag: 'security', order: 3 },
  { id: 'secrets-management--signer', title: 'AWS Signer', parentId: 'secrets-management', level: 'advanced', tag: 'security', order: 90 },
  { id: 'secrets-management--payment-cryptography', title: 'AWS Payment Cryptography', parentId: 'secrets-management', level: 'advanced', tag: 'security', order: 91 },

  // ---- Monitoring ----
  { id: 'cloudwatch-dashboards-events--evidently', title: 'CloudWatch Evidently', parentId: 'cloudwatch-dashboards-events', level: 'advanced', tag: 'monitoring', order: 90 },
  { id: 'cloudwatch-dashboards-events--application-signals', title: 'CloudWatch Application Signals', parentId: 'cloudwatch-dashboards-events', level: 'advanced', tag: 'monitoring', order: 91 },
  { id: 'cloudwatch-dashboards-events--internet-monitor', title: 'CloudWatch Internet Monitor', parentId: 'cloudwatch-dashboards-events', level: 'advanced', tag: 'monitoring', order: 92 },

  // ---- Containers ----
  { id: 'aws-container-options--copilot-cli', title: 'AWS Copilot CLI', parentId: 'aws-container-options', level: 'intermediate', tag: 'containers', order: 90 },
  { id: 'aws-container-options--app-mesh', title: 'AWS App Mesh', parentId: 'aws-container-options', level: 'advanced', tag: 'containers', order: 91 },
  { id: 'aws-container-options--ecs-service-connect', title: 'ECS Service Connect', parentId: 'aws-container-options', level: 'advanced', tag: 'containers', order: 92 },

  // ---- DevOps ----
  { id: 'pipeline-automation--codecatalyst', title: 'Amazon CodeCatalyst', parentId: 'pipeline-automation', level: 'advanced', tag: 'devops', order: 90 },

  // ---- Analytics ----
  { id: 'data-orchestration', title: 'Data Orchestration', parentId: 'data-lakes-etl', level: 'advanced', tag: 'analytics', order: 90 },
  { id: 'data-orchestration--mwaa', title: 'Amazon MWAA (Managed Airflow)', parentId: 'data-orchestration', level: 'advanced', tag: 'analytics', order: 1 },
  { id: 'data-orchestration--step-functions-etl', title: 'Step Functions for ETL', parentId: 'data-orchestration', level: 'advanced', tag: 'analytics', order: 2 },
  { id: 'data-orchestration--data-pipeline', title: 'AWS Data Pipeline', parentId: 'data-orchestration', level: 'intermediate', tag: 'analytics', order: 3 },
  { id: 'search-analytics--opensearch-serverless', title: 'OpenSearch Serverless', parentId: 'search-analytics', level: 'advanced', tag: 'analytics', order: 90 },
  { id: 'data-governance-analytics--clean-rooms', title: 'AWS Clean Rooms', parentId: 'data-governance-analytics', level: 'advanced', tag: 'analytics', order: 90 },
  { id: 'data-governance-analytics--entity-resolution', title: 'AWS Entity Resolution', parentId: 'data-governance-analytics', level: 'advanced', tag: 'analytics', order: 91 },

  // ---- Machine Learning & AI ----
  { id: 'sagemaker-low-code', title: 'Low-Code & AutoML', parentId: 'sagemaker', level: 'intermediate', tag: 'ml-ai', order: 90 },
  { id: 'sagemaker-low-code--canvas', title: 'SageMaker Canvas', parentId: 'sagemaker-low-code', level: 'intermediate', tag: 'ml-ai', order: 1 },
  { id: 'sagemaker-low-code--autopilot', title: 'SageMaker Autopilot', parentId: 'sagemaker-low-code', level: 'intermediate', tag: 'ml-ai', order: 2 },
  { id: 'sagemaker-low-code--neo', title: 'SageMaker Neo', parentId: 'sagemaker-low-code', level: 'advanced', tag: 'ml-ai', order: 3 },
  { id: 'sagemaker-low-code--augmented-ai', title: 'Amazon Augmented AI (A2I)', parentId: 'sagemaker-low-code', level: 'advanced', tag: 'ml-ai', order: 4 },
  { id: 'genai-tools--q-business', title: 'Amazon Q Business', parentId: 'genai-tools', level: 'advanced', tag: 'ml-ai', order: 90 },

  // ---- Advanced & Expert ----
  { id: 'network-topology--cloud-wan', title: 'AWS Cloud WAN', parentId: 'network-topology', level: 'advanced', tag: 'advanced', order: 90 },
  { id: 'private-connectivity--vpc-lattice', title: 'Amazon VPC Lattice', parentId: 'private-connectivity', level: 'advanced', tag: 'advanced', order: 90 },
])
