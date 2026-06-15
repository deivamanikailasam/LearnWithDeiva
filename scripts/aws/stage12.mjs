import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'serverless',
  rootStartOrder: 34,
  tree: [
    {
      id: 'lambda-deep',
      title: 'Lambda In Depth',
      summary: 'Performance, configuration and patterns.',
      level: 'advanced',
      children: [
        {
          id: 'lambda-performance',
          title: 'Lambda Performance',
          children: [
            { id: 'cold-start-optimization', title: 'Cold Start Optimization' },
            { id: 'provisioned-concurrency', title: 'Provisioned Concurrency' },
            { id: 'snapstart', title: 'Lambda SnapStart' },
            { id: 'memory-cpu-tuning', title: 'Memory & CPU Tuning' },
            { id: 'lambda-power-tuning', title: 'Lambda Power Tuning' },
          ],
        },
        {
          id: 'lambda-concurrency-scaling',
          title: 'Concurrency & Scaling',
          children: [
            { id: 'reserved-concurrency', title: 'Reserved Concurrency' },
            { id: 'concurrency-limits', title: 'Account Concurrency Limits' },
            { id: 'throttling-behavior', title: 'Throttling Behavior' },
            { id: 'burst-scaling', title: 'Burst Scaling' },
          ],
        },
        {
          id: 'lambda-packaging',
          title: 'Packaging & Deployment',
          children: [
            { id: 'zip-deployment', title: 'ZIP Deployment Packages' },
            { id: 'container-image-lambda', title: 'Container Image Packaging' },
            { id: 'lambda-extensions', title: 'Lambda Extensions' },
            { id: 'lambda-function-urls', title: 'Function URLs' },
          ],
        },
        {
          id: 'lambda-patterns',
          title: 'Lambda Patterns & Pitfalls',
          children: [
            { id: 'idempotency-lambda', title: 'Idempotency' },
            { id: 'error-handling-retries', title: 'Error Handling & Retries' },
            { id: 'fan-out-patterns', title: 'Fan-Out Patterns' },
            { id: 'lambda-anti-patterns', title: 'Anti-Patterns' },
          ],
        },
      ],
    },
    {
      id: 'event-driven-orchestration',
      title: 'Event-Driven & Orchestration',
      summary: 'Step Functions and EventBridge workflows.',
      level: 'advanced',
      children: [
        {
          id: 'event-driven-architecture',
          title: 'Event-Driven Architecture',
          children: [
            { id: 'eda-concepts', title: 'EDA Concepts' },
            { id: 'events-vs-commands', title: 'Events vs Commands' },
            { id: 'producers-consumers', title: 'Producers & Consumers' },
            { id: 'choreography-vs-orchestration', title: 'Choreography vs Orchestration' },
          ],
        },
        {
          id: 'step-functions',
          title: 'AWS Step Functions',
          children: [
            { id: 'step-functions-overview', title: 'Step Functions Overview' },
            { id: 'state-machines', title: 'State Machines & ASL' },
            { id: 'standard-vs-express', title: 'Standard vs Express Workflows' },
            { id: 'state-types', title: 'State Types (Task, Choice, Parallel, Map)' },
            { id: 'error-handling-step-functions', title: 'Error Handling & Retries' },
            { id: 'service-integrations-sfn', title: 'Service Integrations' },
          ],
        },
        {
          id: 'eventbridge-serverless',
          title: 'Amazon EventBridge',
          children: [
            { id: 'event-bus', title: 'Event Buses' },
            { id: 'event-rules-patterns', title: 'Rules & Event Patterns' },
            { id: 'eventbridge-pipes', title: 'EventBridge Pipes' },
            { id: 'eventbridge-scheduler', title: 'EventBridge Scheduler' },
            { id: 'schema-registry', title: 'Schema Registry' },
          ],
        },
      ],
    },
    {
      id: 'serverless-frameworks-patterns',
      title: 'Serverless Frameworks & Patterns',
      summary: 'SAM, Serverless Framework and best practices.',
      level: 'advanced',
      children: [
        {
          id: 'serverless-frameworks',
          title: 'Serverless Frameworks',
          children: [
            { id: 'sam-serverless', title: 'AWS SAM' },
            { id: 'serverless-framework', title: 'Serverless Framework' },
            { id: 'cdk-serverless', title: 'CDK for Serverless' },
            { id: 'chalice-amplify', title: 'Chalice & Amplify' },
          ],
        },
        {
          id: 'serverless-data-apis',
          title: 'Serverless Data & APIs',
          children: [
            { id: 'serverless-rest-apis', title: 'Serverless REST APIs' },
            { id: 'appsync-graphql', title: 'AWS AppSync (GraphQL)' },
            { id: 'serverless-databases', title: 'Serverless Databases (DynamoDB, Aurora Serverless)' },
            { id: 'serverless-auth', title: 'Authentication (Cognito)' },
          ],
        },
        {
          id: 'serverless-patterns',
          title: 'Serverless Patterns',
          children: [
            { id: 'api-backend-pattern', title: 'API Backend' },
            { id: 'stream-processing-pattern', title: 'Stream Processing' },
            { id: 'web-app-pattern', title: 'Web Application' },
            { id: 'saga-pattern-serverless', title: 'Saga Pattern' },
            { id: 'serverless-microservices', title: 'Serverless Microservices' },
          ],
        },
        {
          id: 'serverless-best-practices',
          title: 'Serverless Best Practices',
          children: [
            { id: 'observability-serverless', title: 'Observability' },
            { id: 'cost-optimization-serverless', title: 'Cost Optimization' },
            { id: 'security-serverless', title: 'Security' },
            { id: 'testing-serverless', title: 'Testing Strategies' },
          ],
        },
      ],
    },
  ],
})
