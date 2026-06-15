import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'devops-deployment',
  rootStartOrder: 108,
  tree: [
    {
      id: 'containerization',
      title: 'Containerization',
      summary: 'Docker and containerizing Python apps.',
      level: 'advanced',
      children: [
        {
          id: 'docker-basics',
          title: 'Docker Basics',
          children: [
            { id: 'what-is-docker', title: 'What is Docker?' },
            { id: 'images-containers', title: 'Images & Containers' },
            { id: 'dockerfile', title: 'Dockerfile' },
          ],
        },
        {
          id: 'python-in-docker',
          title: 'Python in Docker',
          children: [
            { id: 'dockerizing-python', title: 'Dockerizing a Python App' },
            { id: 'multi-stage-builds', title: 'Multi-Stage Builds' },
            { id: 'slim-images', title: 'Slim & Secure Images' },
          ],
        },
        {
          id: 'orchestration-intro',
          title: 'Orchestration',
          children: [
            { id: 'docker-compose', title: 'Docker Compose' },
            { id: 'kubernetes-intro', title: 'Kubernetes Intro' },
          ],
        },
      ],
    },
    {
      id: 'ci-cd',
      title: 'CI/CD Pipelines',
      summary: 'Automated testing, builds and releases.',
      level: 'advanced',
      children: [
        {
          id: 'ci-fundamentals',
          title: 'CI/CD Fundamentals',
          children: [
            { id: 'what-is-ci-cd', title: 'What is CI/CD?' },
            { id: 'pipeline-stages', title: 'Pipeline Stages' },
          ],
        },
        {
          id: 'ci-tools',
          title: 'CI Tools',
          children: [
            { id: 'github-actions', title: 'GitHub Actions' },
            { id: 'gitlab-ci', title: 'GitLab CI' },
            { id: 'other-ci-tools', title: 'Other CI Tools' },
          ],
        },
        {
          id: 'automated-checks',
          title: 'Automated Checks',
          children: [
            { id: 'running-tests-ci', title: 'Running Tests' },
            { id: 'linting-ci', title: 'Linting & Type Checks' },
            { id: 'build-publish-ci', title: 'Build & Publish' },
          ],
        },
        {
          id: 'cd-strategies',
          title: 'Deployment Strategies',
          children: [
            { id: 'deployment-strategies', title: 'Blue-Green & Canary' },
            { id: 'release-management', title: 'Release Management' },
          ],
        },
      ],
    },
    {
      id: 'deployment-ops',
      title: 'Deployment & Operations',
      summary: 'Servers, cloud, serverless and monitoring.',
      level: 'advanced',
      children: [
        {
          id: 'deployment-targets',
          title: 'Deployment Targets',
          children: [
            { id: 'vps-servers', title: 'VPS & Servers' },
            { id: 'paas-platforms', title: 'PaaS Platforms' },
            { id: 'serverless-deploy', title: 'Serverless' },
          ],
        },
        {
          id: 'cloud-platforms',
          title: 'Cloud Platforms',
          children: [
            { id: 'aws-python', title: 'AWS with Python' },
            { id: 'gcp-azure-python', title: 'GCP & Azure' },
          ],
        },
        {
          id: 'production-concerns',
          title: 'Production Concerns',
          children: [
            { id: 'process-managers', title: 'Process Managers' },
            { id: 'reverse-proxies', title: 'Reverse Proxies' },
            { id: 'scaling-deploy', title: 'Scaling' },
          ],
        },
        {
          id: 'observability',
          title: 'Observability',
          children: [
            { id: 'monitoring', title: 'Monitoring' },
            { id: 'alerting', title: 'Alerting' },
            { id: 'error-tracking', title: 'Error Tracking' },
          ],
        },
      ],
    },
  ],
})
