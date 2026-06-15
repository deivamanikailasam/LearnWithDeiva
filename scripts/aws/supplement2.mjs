import { addTopics } from './addTopics.mjs'

// Second deeper pass: additional notable AWS topics. All are L3 leaves under
// existing subtopics. Duplicates are skipped automatically by addTopics.
addTopics([
  // ---- Compute ----
  { id: 'instance-types--bare-metal-instances', title: 'Bare Metal Instances', parentId: 'instance-types', level: 'advanced', tag: 'compute', order: 90 },
  { id: 'ec2-fundamentals--ec2-instance-connect', title: 'EC2 Instance Connect', parentId: 'ec2-fundamentals', level: 'beginner', tag: 'compute', order: 92 },
  { id: 'ec2-fundamentals--ec2-serial-console', title: 'EC2 Serial Console', parentId: 'ec2-fundamentals', level: 'intermediate', tag: 'compute', order: 93 },

  // ---- Storage ----
  { id: 's3-fundamentals--s3-object-tagging', title: 'Object Tagging', parentId: 's3-fundamentals', level: 'intermediate', tag: 'storage', order: 90 },
  { id: 's3-security--s3-access-grants', title: 'S3 Access Grants', parentId: 's3-security', level: 'advanced', tag: 'storage', order: 90 },
  { id: 's3-security--s3-cors', title: 'CORS Configuration', parentId: 's3-security', level: 'intermediate', tag: 'storage', order: 91 },
  { id: 's3-performance-features--mountpoint-for-s3', title: 'Mountpoint for Amazon S3', parentId: 's3-performance-features', level: 'advanced', tag: 'storage', order: 90 },

  // ---- Networking ----
  { id: 'route53--route53-arc', title: 'Application Recovery Controller (ARC)', parentId: 'route53', level: 'advanced', tag: 'networking', order: 90 },
  { id: 'cloudfront--cloudfront-origin-shield', title: 'CloudFront Origin Shield', parentId: 'cloudfront', level: 'advanced', tag: 'networking', order: 90 },

  // ---- Databases ----
  { id: 'amazon-rds--rds-blue-green-deployments', title: 'RDS Blue/Green Deployments', parentId: 'amazon-rds', level: 'advanced', tag: 'databases', order: 91 },
  { id: 'elasticache--elasticache-serverless', title: 'ElastiCache Serverless', parentId: 'elasticache', level: 'intermediate', tag: 'databases', order: 90 },
  { id: 'amazon-aurora--aurora-serverless-v2', title: 'Aurora Serverless v2', parentId: 'amazon-aurora', level: 'advanced', tag: 'databases', order: 91 },

  // ---- Security ----
  { id: 'security-posture-management--security-lake', title: 'Amazon Security Lake', parentId: 'security-posture-management', level: 'advanced', tag: 'security', order: 90 },
  { id: 'encryption-fundamentals--nitro-enclaves', title: 'AWS Nitro Enclaves', parentId: 'encryption-fundamentals', level: 'advanced', tag: 'security', order: 90 },

  // ---- Monitoring ----
  { id: 'cloudwatch-dashboards-events--cross-account-observability', title: 'Cross-Account Observability', parentId: 'cloudwatch-dashboards-events', level: 'advanced', tag: 'monitoring', order: 93 },
  { id: 'cloudwatch-logs--logs-live-tail', title: 'Logs Live Tail', parentId: 'cloudwatch-logs', level: 'intermediate', tag: 'monitoring', order: 90 },

  // ---- Infrastructure as Code ----
  { id: 'aws-cdk--cdk-pipelines', title: 'CDK Pipelines', parentId: 'aws-cdk', level: 'advanced', tag: 'iac-automation', order: 90 },
  { id: 'cfn-stacks--cloudformation-git-sync', title: 'CloudFormation Git Sync', parentId: 'cfn-stacks', level: 'advanced', tag: 'iac-automation', order: 90 },

  // ---- Containers ----
  { id: 'container-basics--bottlerocket', title: 'Bottlerocket OS', parentId: 'container-basics', level: 'advanced', tag: 'containers', order: 90 },
  { id: 'ecs-launch-types--fargate-spot', title: 'Fargate Spot', parentId: 'ecs-launch-types', level: 'advanced', tag: 'containers', order: 90 },
  { id: 'ecs-operations--ecs-exec', title: 'ECS Exec', parentId: 'ecs-operations', level: 'advanced', tag: 'containers', order: 90 },
  { id: 'eks-operations--eks-pod-identity', title: 'EKS Pod Identity', parentId: 'eks-operations', level: 'advanced', tag: 'containers', order: 90 },

  // ---- Serverless ----
  { id: 'lambda-packaging--response-streaming', title: 'Lambda Response Streaming', parentId: 'lambda-packaging', level: 'advanced', tag: 'serverless', order: 90 },
  { id: 'step-functions--distributed-map', title: 'Distributed Map', parentId: 'step-functions', level: 'advanced', tag: 'serverless', order: 90 },
  { id: 'serverless-best-practices--powertools', title: 'Powertools for AWS Lambda', parentId: 'serverless-best-practices', level: 'advanced', tag: 'serverless', order: 90 },

  // ---- Integration ----
  { id: 'eventbridge-integration--api-destinations', title: 'EventBridge API Destinations', parentId: 'eventbridge-integration', level: 'advanced', tag: 'integration', order: 90 },

  // ---- Analytics ----
  { id: 'amazon-redshift--redshift-ml', title: 'Redshift ML', parentId: 'amazon-redshift', level: 'advanced', tag: 'analytics', order: 90 },
  { id: 'amazon-athena--athena-spark', title: 'Athena for Apache Spark', parentId: 'amazon-athena', level: 'advanced', tag: 'analytics', order: 90 },
  { id: 'aws-glue--glue-streaming', title: 'Glue Streaming ETL', parentId: 'aws-glue', level: 'advanced', tag: 'analytics', order: 90 },

  // ---- Machine Learning & AI ----
  { id: 'sagemaker-mlops--inference-recommender', title: 'SageMaker Inference Recommender', parentId: 'sagemaker-mlops', level: 'advanced', tag: 'ml-ai', order: 90 },
  { id: 'sagemaker-mlops--sagemaker-debugger', title: 'SageMaker Debugger & Profiler', parentId: 'sagemaker-mlops', level: 'advanced', tag: 'ml-ai', order: 91 },
  { id: 'amazon-bedrock--bedrock-flows', title: 'Bedrock Flows', parentId: 'amazon-bedrock', level: 'advanced', tag: 'ml-ai', order: 90 },
  { id: 'amazon-bedrock--bedrock-prompt-management', title: 'Bedrock Prompt Management', parentId: 'amazon-bedrock', level: 'advanced', tag: 'ml-ai', order: 91 },
  { id: 'amazon-bedrock--bedrock-evaluations', title: 'Bedrock Model Evaluation', parentId: 'amazon-bedrock', level: 'advanced', tag: 'ml-ai', order: 92 },
  { id: 'specialized-ai--lookout-for-metrics', title: 'Amazon Lookout for Metrics', parentId: 'specialized-ai', level: 'advanced', tag: 'ml-ai', order: 90 },
  { id: 'specialized-ai--monitron', title: 'Amazon Monitron', parentId: 'specialized-ai', level: 'advanced', tag: 'ml-ai', order: 91 },
  { id: 'specialized-ai--panorama', title: 'AWS Panorama', parentId: 'specialized-ai', level: 'advanced', tag: 'ml-ai', order: 92 },

  // ---- Advanced & Expert ----
  { id: 'private-connectivity--cloud-map', title: 'AWS Cloud Map', parentId: 'private-connectivity', level: 'advanced', tag: 'advanced', order: 91 },
  { id: 'iot-services--iot-twinmaker', title: 'AWS IoT TwinMaker', parentId: 'iot-services', level: 'advanced', tag: 'advanced', order: 90 },
  { id: 'iot-services--iot-fleetwise', title: 'AWS IoT FleetWise', parentId: 'iot-services', level: 'advanced', tag: 'advanced', order: 91 },
])
