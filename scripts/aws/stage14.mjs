import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'devops',
  rootStartOrder: 40,
  tree: [
    {
      id: 'source-build',
      title: 'Source & Build',
      summary: 'CodeCommit, CodeBuild and CodeArtifact.',
      level: 'intermediate',
      children: [
        {
          id: 'devops-fundamentals',
          title: 'DevOps Fundamentals',
          children: [
            { id: 'what-is-devops', title: 'What is DevOps?' },
            { id: 'ci-cd-concepts', title: 'CI, CD & Continuous Deployment' },
            { id: 'devops-culture', title: 'DevOps Culture & Practices' },
            { id: 'aws-developer-tools-suite', title: 'AWS Developer Tools Suite' },
          ],
        },
        {
          id: 'codecommit',
          title: 'AWS CodeCommit',
          children: [
            { id: 'codecommit-overview', title: 'CodeCommit Overview' },
            { id: 'repositories-git', title: 'Repositories & Git' },
            { id: 'codecommit-access', title: 'Access Control & Credentials' },
            { id: 'codecommit-triggers', title: 'Triggers & Notifications' },
          ],
        },
        {
          id: 'codebuild',
          title: 'AWS CodeBuild',
          children: [
            { id: 'codebuild-overview', title: 'CodeBuild Overview' },
            { id: 'buildspec', title: 'buildspec.yml' },
            { id: 'build-environments', title: 'Build Environments & Images' },
            { id: 'build-caching', title: 'Build Caching' },
            { id: 'codebuild-artifacts', title: 'Build Artifacts' },
          ],
        },
        {
          id: 'codeartifact',
          title: 'AWS CodeArtifact',
          children: [
            { id: 'codeartifact-overview', title: 'CodeArtifact Overview' },
            { id: 'package-repositories', title: 'Package Repositories' },
            { id: 'upstream-repositories', title: 'Upstream Repositories' },
            { id: 'dependency-management', title: 'Dependency Management' },
          ],
        },
      ],
    },
    {
      id: 'deploy-pipelines',
      title: 'Deploy & Pipelines',
      summary: 'CodeDeploy and CodePipeline.',
      level: 'advanced',
      children: [
        {
          id: 'codedeploy',
          title: 'AWS CodeDeploy',
          children: [
            { id: 'codedeploy-overview', title: 'CodeDeploy Overview' },
            { id: 'appspec', title: 'appspec.yml' },
            { id: 'deployment-groups', title: 'Deployment Groups' },
            { id: 'ec2-on-prem-deployments', title: 'EC2 & On-Premises Deployments' },
            { id: 'lambda-ecs-deployments', title: 'Lambda & ECS Deployments' },
            { id: 'deployment-configs', title: 'Deployment Configurations' },
          ],
        },
        {
          id: 'codepipeline',
          title: 'AWS CodePipeline',
          children: [
            { id: 'codepipeline-overview', title: 'CodePipeline Overview' },
            { id: 'stages-actions', title: 'Stages & Actions' },
            { id: 'pipeline-artifacts', title: 'Pipeline Artifacts' },
            { id: 'approval-actions', title: 'Manual Approval Actions' },
            { id: 'pipeline-triggers', title: 'Triggers & Source Events' },
            { id: 'cross-account-pipelines', title: 'Cross-Account Pipelines' },
          ],
        },
        {
          id: 'deployment-strategies',
          title: 'Deployment Strategies',
          children: [
            { id: 'in-place-deployment', title: 'In-Place Deployment' },
            { id: 'blue-green-deployment', title: 'Blue/Green Deployment' },
            { id: 'canary-deployment', title: 'Canary Deployment' },
            { id: 'rolling-deployment', title: 'Rolling Deployment' },
            { id: 'rollback-strategies', title: 'Rollback Strategies' },
          ],
        },
      ],
    },
    {
      id: 'devops-practices',
      title: 'DevOps Practices on AWS',
      summary: 'Strategies, automation and culture.',
      level: 'advanced',
      children: [
        {
          id: 'pipeline-automation',
          title: 'Pipeline Automation',
          children: [
            { id: 'cicd-for-iac', title: 'CI/CD for Infrastructure' },
            { id: 'cicd-for-containers', title: 'CI/CD for Containers' },
            { id: 'cicd-for-serverless', title: 'CI/CD for Serverless' },
            { id: 'github-actions-aws', title: 'GitHub Actions with AWS' },
          ],
        },
        {
          id: 'testing-quality-gates',
          title: 'Testing & Quality Gates',
          children: [
            { id: 'automated-testing-pipeline', title: 'Automated Testing in Pipelines' },
            { id: 'static-analysis', title: 'Static Analysis & Linting' },
            { id: 'security-scanning-pipeline', title: 'Security Scanning (SAST/DAST)' },
            { id: 'codeguru', title: 'Amazon CodeGuru' },
          ],
        },
        {
          id: 'release-management',
          title: 'Release Management',
          children: [
            { id: 'feature-flags', title: 'Feature Flags (AppConfig)' },
            { id: 'environment-promotion', title: 'Environment Promotion' },
            { id: 'release-strategies', title: 'Release Strategies' },
            { id: 'change-management', title: 'Change Management' },
          ],
        },
        {
          id: 'devops-observability',
          title: 'DevOps Observability & Culture',
          children: [
            { id: 'dora-metrics', title: 'DORA Metrics' },
            { id: 'monitoring-pipelines', title: 'Monitoring Pipelines' },
            { id: 'incident-management-devops', title: 'Incident Management' },
            { id: 'collaboration-tools', title: 'Collaboration & Notifications' },
          ],
        },
      ],
    },
  ],
})
