import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'ml-ai',
  rootStartOrder: 46,
  tree: [
    {
      id: 'sagemaker',
      title: 'Amazon SageMaker',
      summary: 'Building, training and deploying models.',
      level: 'advanced',
      children: [
        {
          id: 'sagemaker-fundamentals',
          title: 'SageMaker Fundamentals',
          children: [
            { id: 'sagemaker-overview', title: 'SageMaker Overview' },
            { id: 'ml-workflow', title: 'The ML Workflow' },
            { id: 'sagemaker-studio', title: 'SageMaker Studio' },
            { id: 'sagemaker-notebooks', title: 'Notebook Instances' },
            { id: 'sagemaker-domains', title: 'Domains & User Profiles' },
          ],
        },
        {
          id: 'sagemaker-data-prep',
          title: 'Data Preparation',
          children: [
            { id: 'data-wrangler', title: 'Data Wrangler' },
            { id: 'sagemaker-feature-store', title: 'Feature Store' },
            { id: 'sagemaker-ground-truth', title: 'Ground Truth (Labeling)' },
            { id: 'processing-jobs', title: 'Processing Jobs' },
          ],
        },
        {
          id: 'sagemaker-training',
          title: 'Model Training',
          children: [
            { id: 'training-jobs', title: 'Training Jobs' },
            { id: 'built-in-algorithms', title: 'Built-in Algorithms' },
            { id: 'bring-your-own-model', title: 'Bring Your Own Model/Container' },
            { id: 'hyperparameter-tuning', title: 'Hyperparameter Tuning' },
            { id: 'distributed-training-sagemaker', title: 'Distributed Training' },
            { id: 'spot-training', title: 'Managed Spot Training' },
          ],
        },
        {
          id: 'sagemaker-deployment',
          title: 'Model Deployment',
          children: [
            { id: 'real-time-endpoints', title: 'Real-Time Endpoints' },
            { id: 'serverless-inference', title: 'Serverless Inference' },
            { id: 'batch-transform', title: 'Batch Transform' },
            { id: 'async-inference', title: 'Asynchronous Inference' },
            { id: 'multi-model-endpoints', title: 'Multi-Model Endpoints' },
            { id: 'model-deployment-strategies', title: 'Deployment Strategies' },
          ],
        },
        {
          id: 'sagemaker-mlops',
          title: 'MLOps with SageMaker',
          children: [
            { id: 'sagemaker-pipelines', title: 'SageMaker Pipelines' },
            { id: 'model-registry', title: 'Model Registry' },
            { id: 'model-monitor', title: 'Model Monitor' },
            { id: 'sagemaker-clarify', title: 'SageMaker Clarify (Bias)' },
            { id: 'sagemaker-experiments', title: 'Experiments & Tracking' },
          ],
        },
      ],
    },
    {
      id: 'ai-services',
      title: 'AI Services',
      summary: 'Vision, language, speech and document AI.',
      level: 'intermediate',
      children: [
        {
          id: 'vision-ai',
          title: 'Vision AI',
          children: [
            { id: 'rekognition', title: 'Amazon Rekognition' },
            { id: 'rekognition-video', title: 'Rekognition Video' },
            { id: 'lookout-for-vision', title: 'Lookout for Vision' },
          ],
        },
        {
          id: 'language-ai',
          title: 'Language AI',
          children: [
            { id: 'comprehend', title: 'Amazon Comprehend' },
            { id: 'translate', title: 'Amazon Translate' },
            { id: 'textract', title: 'Amazon Textract' },
            { id: 'lex', title: 'Amazon Lex (Chatbots)' },
          ],
        },
        {
          id: 'speech-ai',
          title: 'Speech AI',
          children: [
            { id: 'transcribe', title: 'Amazon Transcribe' },
            { id: 'polly', title: 'Amazon Polly' },
          ],
        },
        {
          id: 'specialized-ai',
          title: 'Specialized AI Services',
          children: [
            { id: 'personalize', title: 'Amazon Personalize' },
            { id: 'forecast', title: 'Amazon Forecast' },
            { id: 'fraud-detector', title: 'Amazon Fraud Detector' },
            { id: 'kendra', title: 'Amazon Kendra (Enterprise Search)' },
            { id: 'comprehend-medical', title: 'Comprehend Medical & HealthLake' },
          ],
        },
      ],
    },
    {
      id: 'generative-ai-aws',
      title: 'Generative AI (Bedrock)',
      summary: 'Foundation models and generative AI services.',
      level: 'advanced',
      children: [
        {
          id: 'amazon-bedrock',
          title: 'Amazon Bedrock',
          children: [
            { id: 'bedrock-overview', title: 'Bedrock Overview' },
            { id: 'foundation-models', title: 'Foundation Models' },
            { id: 'bedrock-inference', title: 'Model Inference & Parameters' },
            { id: 'bedrock-fine-tuning', title: 'Customization & Fine-Tuning' },
            { id: 'bedrock-knowledge-bases', title: 'Knowledge Bases (RAG)' },
            { id: 'bedrock-agents', title: 'Bedrock Agents' },
            { id: 'bedrock-guardrails', title: 'Guardrails' },
          ],
        },
        {
          id: 'genai-tools',
          title: 'Generative AI Tools',
          children: [
            { id: 'amazon-q', title: 'Amazon Q' },
            { id: 'codewhisperer-q-developer', title: 'Amazon Q Developer' },
            { id: 'party-rock', title: 'PartyRock' },
            { id: 'titan-models', title: 'Amazon Titan Models' },
          ],
        },
        {
          id: 'genai-on-sagemaker',
          title: 'GenAI on SageMaker',
          children: [
            { id: 'jumpstart', title: 'SageMaker JumpStart' },
            { id: 'deploying-llms', title: 'Deploying LLMs' },
            { id: 'rag-on-aws', title: 'Building RAG on AWS' },
          ],
        },
        {
          id: 'ml-foundations',
          title: 'ML Foundations & Responsible AI',
          children: [
            { id: 'ml-types', title: 'Supervised, Unsupervised & Reinforcement' },
            { id: 'training-vs-inference', title: 'Training vs Inference' },
            { id: 'model-evaluation-metrics', title: 'Evaluation Metrics' },
            { id: 'responsible-ai-aws', title: 'Responsible AI' },
          ],
        },
      ],
    },
  ],
})
