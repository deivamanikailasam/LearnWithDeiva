import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'integration',
  rootStartOrder: 37,
  tree: [
    {
      id: 'messaging',
      title: 'Messaging (SQS & SNS)',
      summary: 'Queues, topics and pub/sub.',
      level: 'intermediate',
      children: [
        {
          id: 'messaging-fundamentals',
          title: 'Messaging Fundamentals',
          children: [
            { id: 'synchronous-vs-asynchronous', title: 'Synchronous vs Asynchronous' },
            { id: 'decoupling', title: 'Decoupling Applications' },
            { id: 'queues-vs-topics', title: 'Queues vs Topics' },
            { id: 'message-durability', title: 'Durability & Delivery Guarantees' },
          ],
        },
        {
          id: 'amazon-sqs',
          title: 'Amazon SQS',
          children: [
            { id: 'sqs-overview', title: 'SQS Overview' },
            { id: 'standard-queues', title: 'Standard Queues' },
            { id: 'fifo-queues', title: 'FIFO Queues' },
            { id: 'visibility-timeout', title: 'Visibility Timeout' },
            { id: 'dead-letter-queues', title: 'Dead-Letter Queues' },
            { id: 'long-short-polling', title: 'Long vs Short Polling' },
            { id: 'message-retention-delay', title: 'Retention & Delay Queues' },
          ],
        },
        {
          id: 'amazon-sns',
          title: 'Amazon SNS',
          children: [
            { id: 'sns-overview', title: 'SNS Overview' },
            { id: 'topics-subscriptions', title: 'Topics & Subscriptions' },
            { id: 'sns-fanout', title: 'Fan-Out (SNS + SQS)' },
            { id: 'message-filtering', title: 'Message Filtering' },
            { id: 'sns-fifo', title: 'SNS FIFO Topics' },
            { id: 'sns-delivery-protocols', title: 'Delivery Protocols (SMS, Email, HTTP)' },
          ],
        },
      ],
    },
    {
      id: 'event-routing-workflows',
      title: 'Event Routing & Workflows',
      summary: 'EventBridge and Step Functions.',
      level: 'intermediate',
      children: [
        {
          id: 'eventbridge-integration',
          title: 'Amazon EventBridge',
          children: [
            { id: 'eventbridge-overview', title: 'EventBridge Overview' },
            { id: 'default-custom-buses', title: 'Default & Custom Event Buses' },
            { id: 'partner-event-sources', title: 'Partner Event Sources' },
            { id: 'event-pattern-matching', title: 'Event Pattern Matching' },
            { id: 'eventbridge-targets', title: 'Targets & Input Transformation' },
          ],
        },
        {
          id: 'step-functions-integration',
          title: 'Step Functions',
          children: [
            { id: 'workflow-orchestration', title: 'Workflow Orchestration' },
            { id: 'sfn-service-integration', title: 'Direct Service Integrations' },
            { id: 'sfn-callback-pattern', title: 'Callback (Wait for Token) Pattern' },
            { id: 'sfn-error-handling', title: 'Error Handling & Catch' },
          ],
        },
        {
          id: 'streaming-integration',
          title: 'Streaming Integration',
          children: [
            { id: 'kinesis-data-streams-integration', title: 'Kinesis Data Streams' },
            { id: 'event-source-mapping', title: 'Event Source Mapping' },
            { id: 'msk-integration', title: 'Amazon MSK (Kafka)' },
          ],
        },
      ],
    },
    {
      id: 'api-workflow-integration',
      title: 'API & Workflow Integration',
      summary: 'AppFlow, MQ and integration patterns.',
      level: 'advanced',
      children: [
        {
          id: 'managed-message-brokers',
          title: 'Managed Message Brokers',
          children: [
            { id: 'amazon-mq', title: 'Amazon MQ (ActiveMQ & RabbitMQ)' },
            { id: 'mq-vs-sqs-sns', title: 'Amazon MQ vs SQS/SNS' },
            { id: 'jms-amqp', title: 'JMS, AMQP & MQTT Protocols' },
          ],
        },
        {
          id: 'saas-data-integration',
          title: 'SaaS & Data Integration',
          children: [
            { id: 'appflow', title: 'Amazon AppFlow' },
            { id: 'api-gateway-integration', title: 'API Gateway as Integration Layer' },
            { id: 'appsync-integration', title: 'AppSync Integration' },
          ],
        },
        {
          id: 'integration-patterns',
          title: 'Integration Patterns',
          children: [
            { id: 'pub-sub-pattern', title: 'Publish/Subscribe' },
            { id: 'point-to-point', title: 'Point-to-Point Messaging' },
            { id: 'request-reply', title: 'Request-Reply' },
            { id: 'message-routing', title: 'Message Routing & Filtering' },
            { id: 'claim-check-pattern', title: 'Claim Check Pattern' },
          ],
        },
        {
          id: 'integration-reliability',
          title: 'Reliability & Ordering',
          children: [
            { id: 'exactly-once-processing', title: 'Exactly-Once vs At-Least-Once' },
            { id: 'message-ordering', title: 'Message Ordering' },
            { id: 'idempotent-consumers', title: 'Idempotent Consumers' },
            { id: 'poison-messages', title: 'Poison Messages & Retries' },
          ],
        },
      ],
    },
  ],
})
