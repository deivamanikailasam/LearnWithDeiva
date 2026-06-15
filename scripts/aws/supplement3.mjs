import { addTopics } from './addTopics.mjs'

// Third pass: whole service families that were still absent (End-User Computing,
// customer engagement/messaging, Amplify, Cloud9, management & IoT extras).
// New L2 "group" subtopics are listed before their L3 children.
addTopics([
  // ---- End-User Computing (new subtopic under Other Compute) ----
  { id: 'end-user-computing', title: 'End-User Computing', parentId: 'other-compute', level: 'intermediate', tag: 'compute', order: 90 },
  { id: 'end-user-computing--workspaces', title: 'Amazon WorkSpaces', parentId: 'end-user-computing', level: 'intermediate', tag: 'compute', order: 1 },
  { id: 'end-user-computing--workspaces-web', title: 'Amazon WorkSpaces Web', parentId: 'end-user-computing', level: 'intermediate', tag: 'compute', order: 2 },
  { id: 'end-user-computing--appstream', title: 'Amazon AppStream 2.0', parentId: 'end-user-computing', level: 'intermediate', tag: 'compute', order: 3 },
  { id: 'end-user-computing--workspaces-thin-client', title: 'WorkSpaces Thin Client', parentId: 'end-user-computing', level: 'intermediate', tag: 'compute', order: 4 },

  // ---- Customer Engagement & Messaging (new subtopic under API & Workflow Integration) ----
  { id: 'customer-engagement', title: 'Customer Engagement & Messaging', parentId: 'api-workflow-integration', level: 'intermediate', tag: 'integration', order: 90 },
  { id: 'customer-engagement--ses', title: 'Amazon SES (Simple Email Service)', parentId: 'customer-engagement', level: 'intermediate', tag: 'integration', order: 1 },
  { id: 'customer-engagement--pinpoint', title: 'Amazon Pinpoint', parentId: 'customer-engagement', level: 'intermediate', tag: 'integration', order: 2 },
  { id: 'customer-engagement--connect', title: 'Amazon Connect', parentId: 'customer-engagement', level: 'intermediate', tag: 'integration', order: 3 },
  { id: 'customer-engagement--chime-sdk', title: 'Amazon Chime SDK', parentId: 'customer-engagement', level: 'advanced', tag: 'integration', order: 4 },

  // ---- Frontend & Mobile (Amplify) ----
  { id: 'serverless-frameworks--amplify-hosting', title: 'AWS Amplify Hosting', parentId: 'serverless-frameworks', level: 'intermediate', tag: 'serverless', order: 90 },
  { id: 'serverless-frameworks--amplify-gen2', title: 'Amplify Gen 2 (Code-First)', parentId: 'serverless-frameworks', level: 'advanced', tag: 'serverless', order: 91 },

  // ---- Developer Tooling ----
  { id: 'developer-tooling--cloud9', title: 'AWS Cloud9', parentId: 'developer-tooling', level: 'beginner', tag: 'getting-started', order: 90 },

  // ---- DevOps testing ----
  { id: 'testing-quality-gates--device-farm', title: 'AWS Device Farm', parentId: 'testing-quality-gates', level: 'advanced', tag: 'devops', order: 90 },

  // ---- Management & Governance (Systems Management) ----
  { id: 'operational-automation--license-manager', title: 'AWS License Manager', parentId: 'operational-automation', level: 'advanced', tag: 'iac-automation', order: 90 },
  { id: 'operational-automation--aws-chatbot', title: 'AWS Chatbot', parentId: 'operational-automation', level: 'intermediate', tag: 'iac-automation', order: 91 },
  { id: 'operational-automation--launch-wizard', title: 'AWS Launch Wizard', parentId: 'operational-automation', level: 'intermediate', tag: 'iac-automation', order: 92 },
  { id: 'operational-automation--managed-services', title: 'AWS Managed Services (AMS)', parentId: 'operational-automation', level: 'advanced', tag: 'iac-automation', order: 93 },

  // ---- Resilience ----
  { id: 'resilience-engineering--resilience-hub', title: 'AWS Resilience Hub', parentId: 'resilience-engineering', level: 'advanced', tag: 'well-architected', order: 90 },

  // ---- IoT extras ----
  { id: 'iot-services--iot-device-defender', title: 'AWS IoT Device Defender', parentId: 'iot-services', level: 'advanced', tag: 'advanced', order: 90 },
  { id: 'iot-services--iot-events', title: 'AWS IoT Events', parentId: 'iot-services', level: 'advanced', tag: 'advanced', order: 91 },
  { id: 'iot-services--freertos', title: 'FreeRTOS', parentId: 'iot-services', level: 'advanced', tag: 'advanced', order: 92 },
])
