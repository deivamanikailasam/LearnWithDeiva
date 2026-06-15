import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'mlops-deployment',
  rootStartOrder: 83,
  tree: [
    {
      id: 'mlops-fundamentals',
      title: 'MLOps Fundamentals',
      summary: 'What MLOps is, its principles, maturity and roles.',
      level: 'intermediate',
      children: [
        {
          id: 'what-is-mlops',
          title: 'What is MLOps?',
          children: [
            { id: 'mlops-definition', title: 'MLOps Definition' },
            { id: 'mlops-vs-devops', title: 'MLOps vs DevOps' },
            { id: 'mlops-maturity', title: 'MLOps Maturity Levels' },
          ],
        },
        {
          id: 'mlops-principles',
          title: 'MLOps Principles',
          children: [
            { id: 'automation-principle', title: 'Automation' },
            { id: 'reproducibility-principle', title: 'Reproducibility' },
            { id: 'continuous-delivery-ml', title: 'Continuous Delivery for ML' },
          ],
        },
        {
          id: 'mlops-roles',
          title: 'Roles & Collaboration',
          children: [
            { id: 'ml-engineer-role', title: 'ML Engineer Role' },
            { id: 'cross-team-collaboration', title: 'Cross-Team Collaboration' },
          ],
        },
      ],
    },
    {
      id: 'model-deployment',
      title: 'Model Deployment',
      summary: 'Deployment patterns, serving, strategies and packaging.',
      level: 'advanced',
      children: [
        {
          id: 'deployment-patterns',
          title: 'Deployment Patterns',
          children: [
            { id: 'batch-inference-deploy', title: 'Batch Inference' },
            { id: 'online-inference-deploy', title: 'Online / Real-Time Inference' },
            { id: 'streaming-inference', title: 'Streaming Inference' },
            { id: 'edge-deployment', title: 'Edge Deployment' },
          ],
        },
        {
          id: 'model-serving',
          title: 'Model Serving',
          children: [
            { id: 'rest-api-serving', title: 'REST API Serving' },
            { id: 'model-servers', title: 'Model Servers (TF Serving, TorchServe, Triton)' },
            { id: 'serverless-ml', title: 'Serverless Inference' },
          ],
        },
        {
          id: 'deployment-strategies',
          title: 'Deployment Strategies',
          children: [
            { id: 'canary-deployment', title: 'Canary Deployment' },
            { id: 'blue-green-deployment', title: 'Blue-Green Deployment' },
            { id: 'shadow-deployment', title: 'Shadow Deployment' },
            { id: 'ab-testing-deployment', title: 'A/B Testing' },
          ],
        },
        {
          id: 'model-packaging',
          title: 'Model Packaging',
          children: [
            { id: 'containerization-ml', title: 'Containerization (Docker)' },
            { id: 'onnx', title: 'ONNX & Interchange Formats' },
            { id: 'model-serialization', title: 'Model Serialization' },
          ],
        },
      ],
    },
    {
      id: 'ml-pipelines-orchestration',
      title: 'ML Pipelines & Orchestration',
      summary: 'Data, training and inference pipelines and their orchestration.',
      level: 'advanced',
      children: [
        {
          id: 'pipeline-types',
          title: 'Pipeline Types',
          children: [
            { id: 'data-pipeline', title: 'Data Pipelines' },
            { id: 'training-pipeline', title: 'Training Pipelines' },
            { id: 'inference-pipeline', title: 'Inference Pipelines' },
          ],
        },
        {
          id: 'orchestration-tools',
          title: 'Orchestration Tools',
          children: [
            { id: 'airflow', title: 'Apache Airflow' },
            { id: 'kubeflow', title: 'Kubeflow Pipelines' },
            { id: 'prefect-dagster', title: 'Prefect & Dagster' },
          ],
        },
        {
          id: 'automated-retraining',
          title: 'Automated Retraining',
          children: [
            { id: 'retraining-triggers', title: 'Retraining Triggers' },
            { id: 'continuous-training', title: 'Continuous Training' },
          ],
        },
      ],
    },
    {
      id: 'experiment-tracking-versioning',
      title: 'Experiment Tracking & Versioning',
      summary: 'Tracking experiments, model registries and data versioning.',
      level: 'intermediate',
      children: [
        {
          id: 'experiment-tracking',
          title: 'Experiment Tracking',
          children: [
            { id: 'tracking-params-metrics', title: 'Tracking Params & Metrics' },
            { id: 'tracking-artifacts', title: 'Tracking Artifacts' },
            { id: 'run-comparison', title: 'Run Comparison' },
          ],
        },
        {
          id: 'tracking-tools',
          title: 'Tracking Tools',
          children: [
            { id: 'mlflow', title: 'MLflow' },
            { id: 'weights-and-biases', title: 'Weights & Biases' },
            { id: 'tensorboard-tracking', title: 'TensorBoard' },
          ],
        },
        {
          id: 'model-registry',
          title: 'Model Registry',
          children: [
            { id: 'model-versioning', title: 'Model Versioning' },
            { id: 'model-staging', title: 'Model Staging' },
            { id: 'model-lineage', title: 'Model Lineage' },
          ],
        },
        {
          id: 'data-feature-versioning',
          title: 'Data & Feature Versioning',
          children: [
            { id: 'dvc', title: 'DVC (Data Version Control)' },
            { id: 'dataset-versioning', title: 'Dataset Versioning' },
            { id: 'feature-stores', title: 'Feature Stores' },
          ],
        },
      ],
    },
    {
      id: 'model-monitoring',
      title: 'Monitoring & Observability',
      summary: 'Performance monitoring, drift detection and feedback loops.',
      level: 'advanced',
      children: [
        {
          id: 'performance-monitoring',
          title: 'Performance Monitoring',
          children: [
            { id: 'prediction-monitoring', title: 'Prediction Monitoring' },
            { id: 'metric-monitoring', title: 'Metric Monitoring' },
            { id: 'latency-throughput-monitoring', title: 'Latency & Throughput' },
          ],
        },
        {
          id: 'drift-detection',
          title: 'Drift Detection',
          children: [
            { id: 'data-drift', title: 'Data Drift' },
            { id: 'concept-drift', title: 'Concept Drift' },
            { id: 'covariate-shift', title: 'Covariate Shift' },
          ],
        },
        {
          id: 'logging-alerting',
          title: 'Logging & Alerting',
          children: [
            { id: 'ml-logging', title: 'ML Logging' },
            { id: 'alerting', title: 'Alerting' },
            { id: 'monitoring-dashboards', title: 'Dashboards' },
          ],
        },
        {
          id: 'feedback-loops',
          title: 'Feedback Loops',
          children: [
            { id: 'ground-truth-collection', title: 'Ground-Truth Collection' },
            { id: 'continuous-evaluation', title: 'Continuous Evaluation' },
          ],
        },
      ],
    },
    {
      id: 'model-optimization-inference',
      title: 'Model Optimization for Inference',
      summary: 'Compression and acceleration to serve models efficiently.',
      level: 'advanced',
      children: [
        {
          id: 'model-compression',
          title: 'Model Compression',
          children: [
            { id: 'quantization', title: 'Quantization' },
            { id: 'pruning', title: 'Pruning' },
            { id: 'knowledge-distillation', title: 'Knowledge Distillation' },
            { id: 'weight-sharing', title: 'Weight Sharing' },
          ],
        },
        {
          id: 'inference-acceleration',
          title: 'Inference Acceleration',
          children: [
            { id: 'hardware-acceleration', title: 'Hardware Acceleration' },
            { id: 'batching-inference', title: 'Request Batching' },
            { id: 'caching-inference', title: 'Caching' },
          ],
        },
        {
          id: 'optimization-runtimes',
          title: 'Optimized Runtimes',
          children: [
            { id: 'onnx-runtime', title: 'ONNX Runtime' },
            { id: 'tensorrt', title: 'TensorRT' },
            { id: 'tflite', title: 'TensorFlow Lite' },
          ],
        },
      ],
    },
    {
      id: 'ml-infrastructure-scaling',
      title: 'ML Infrastructure & Scaling',
      summary: 'Compute, distributed training, scaling and cost control.',
      level: 'advanced',
      children: [
        {
          id: 'compute-resources',
          title: 'Compute Resources',
          children: [
            { id: 'gpus-tpus', title: 'GPUs & TPUs' },
            { id: 'cloud-ml-platforms', title: 'Cloud ML Platforms' },
          ],
        },
        {
          id: 'distributed-training',
          title: 'Distributed Training',
          children: [
            { id: 'data-parallelism-infra', title: 'Data Parallelism' },
            { id: 'model-parallelism-infra', title: 'Model Parallelism' },
          ],
        },
        {
          id: 'scaling-serving',
          title: 'Scaling Serving',
          children: [
            { id: 'autoscaling-ml', title: 'Autoscaling' },
            { id: 'load-balancing-ml', title: 'Load Balancing' },
          ],
        },
        {
          id: 'cost-optimization-ml',
          title: 'Cost Optimization',
          children: [
            { id: 'cost-management-ml', title: 'Cost Management' },
            { id: 'spot-instances', title: 'Spot / Preemptible Instances' },
          ],
        },
      ],
    },
  ],
})
