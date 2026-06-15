import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'containers',
  rootStartOrder: 31,
  tree: [
    {
      id: 'container-fundamentals',
      title: 'Container Fundamentals on AWS',
      summary: 'Containers, registries and AWS options.',
      level: 'intermediate',
      children: [
        {
          id: 'container-basics',
          title: 'Container Basics',
          children: [
            { id: 'what-are-containers', title: 'What are Containers?' },
            { id: 'containers-vs-vms', title: 'Containers vs VMs' },
            { id: 'docker-basics-aws', title: 'Docker Basics' },
            { id: 'images-vs-containers', title: 'Images vs Containers' },
            { id: 'container-orchestration-intro', title: 'Why Orchestration?' },
          ],
        },
        {
          id: 'ecr',
          title: 'Amazon ECR',
          children: [
            { id: 'ecr-overview', title: 'ECR Overview' },
            { id: 'ecr-repositories', title: 'Repositories (Private & Public)' },
            { id: 'pushing-pulling-images', title: 'Pushing & Pulling Images' },
            { id: 'ecr-image-scanning', title: 'Image Scanning' },
            { id: 'ecr-lifecycle-policies', title: 'Lifecycle Policies' },
            { id: 'ecr-replication', title: 'Cross-Region Replication' },
          ],
        },
        {
          id: 'aws-container-options',
          title: 'AWS Container Options',
          children: [
            { id: 'ecs-vs-eks', title: 'ECS vs EKS' },
            { id: 'ec2-vs-fargate-launch', title: 'EC2 vs Fargate Launch Types' },
            { id: 'app-runner-containers', title: 'App Runner for Containers' },
            { id: 'choosing-container-service', title: 'Choosing a Container Service' },
          ],
        },
      ],
    },
    {
      id: 'ecs-fargate',
      title: 'Amazon ECS & Fargate',
      summary: 'AWS-native container orchestration.',
      level: 'intermediate',
      children: [
        {
          id: 'ecs-core',
          title: 'ECS Core Concepts',
          children: [
            { id: 'ecs-overview', title: 'ECS Overview' },
            { id: 'clusters', title: 'Clusters' },
            { id: 'task-definitions', title: 'Task Definitions' },
            { id: 'tasks-services', title: 'Tasks & Services' },
            { id: 'ecs-container-agent', title: 'Container Agent' },
          ],
        },
        {
          id: 'ecs-launch-types',
          title: 'Launch Types',
          children: [
            { id: 'ecs-on-ec2', title: 'ECS on EC2' },
            { id: 'ecs-on-fargate', title: 'ECS on Fargate' },
            { id: 'capacity-providers', title: 'Capacity Providers' },
          ],
        },
        {
          id: 'ecs-networking-scaling',
          title: 'Networking & Scaling',
          children: [
            { id: 'ecs-networking-modes', title: 'Networking Modes' },
            { id: 'ecs-load-balancing', title: 'Load Balancer Integration' },
            { id: 'ecs-service-auto-scaling', title: 'Service Auto Scaling' },
            { id: 'ecs-service-discovery', title: 'Service Discovery' },
          ],
        },
        {
          id: 'ecs-operations',
          title: 'ECS Operations',
          children: [
            { id: 'ecs-deployments', title: 'Deployment Strategies' },
            { id: 'ecs-task-iam-roles', title: 'Task IAM Roles' },
            { id: 'ecs-logging-monitoring', title: 'Logging & Monitoring' },
            { id: 'ecs-secrets', title: 'Secrets & Environment Config' },
            { id: 'ecs-anywhere', title: 'ECS Anywhere' },
          ],
        },
      ],
    },
    {
      id: 'eks',
      title: 'Amazon EKS (Kubernetes)',
      summary: 'Managed Kubernetes on AWS.',
      level: 'advanced',
      children: [
        {
          id: 'kubernetes-basics',
          title: 'Kubernetes Basics',
          children: [
            { id: 'what-is-kubernetes', title: 'What is Kubernetes?' },
            { id: 'pods-deployments', title: 'Pods, Deployments & ReplicaSets' },
            { id: 'k8s-services-ingress', title: 'Services & Ingress' },
            { id: 'k8s-namespaces-configmaps', title: 'Namespaces, ConfigMaps & Secrets' },
            { id: 'kubectl', title: 'kubectl' },
          ],
        },
        {
          id: 'eks-architecture',
          title: 'EKS Architecture',
          children: [
            { id: 'eks-overview', title: 'EKS Overview' },
            { id: 'eks-control-plane', title: 'Managed Control Plane' },
            { id: 'eks-node-types', title: 'Managed Nodes, Self-Managed & Fargate' },
            { id: 'eks-networking-cni', title: 'Networking & VPC CNI' },
            { id: 'eks-add-ons', title: 'EKS Add-ons' },
          ],
        },
        {
          id: 'eks-operations',
          title: 'EKS Operations',
          children: [
            { id: 'eks-iam-rbac', title: 'IAM & RBAC (IRSA)' },
            { id: 'eks-autoscaling', title: 'Cluster Autoscaler & Karpenter' },
            { id: 'eks-load-balancing', title: 'Load Balancer Controller' },
            { id: 'eks-observability', title: 'Logging & Observability' },
            { id: 'eks-upgrades', title: 'Cluster Upgrades' },
          ],
        },
        {
          id: 'eks-ecosystem',
          title: 'EKS Ecosystem',
          children: [
            { id: 'helm', title: 'Helm' },
            { id: 'gitops-eks', title: 'GitOps (Flux & Argo CD)' },
            { id: 'eks-anywhere', title: 'EKS Anywhere' },
            { id: 'eks-distro', title: 'Amazon EKS Distro' },
          ],
        },
      ],
    },
  ],
})
