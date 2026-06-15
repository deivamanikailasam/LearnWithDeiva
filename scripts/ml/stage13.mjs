import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'specialized-domains',
  rootStartOrder: 77,
  tree: [
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      summary: 'Image tasks, detection, segmentation and CV techniques.',
      level: 'advanced',
      children: [
        {
          id: 'cv-tasks',
          title: 'Computer Vision Tasks',
          children: [
            { id: 'image-classification', title: 'Image Classification' },
            { id: 'object-detection', title: 'Object Detection' },
            { id: 'semantic-segmentation', title: 'Semantic Segmentation' },
            { id: 'instance-segmentation', title: 'Instance Segmentation' },
            { id: 'pose-estimation', title: 'Pose Estimation' },
            { id: 'ocr', title: 'Optical Character Recognition (OCR)' },
          ],
        },
        {
          id: 'object-detection-models',
          title: 'Object Detection Models',
          children: [
            { id: 'rcnn-family', title: 'R-CNN Family' },
            { id: 'yolo', title: 'YOLO' },
            { id: 'ssd', title: 'SSD' },
            { id: 'detr', title: 'DETR' },
          ],
        },
        {
          id: 'segmentation-models',
          title: 'Segmentation Models',
          children: [
            { id: 'unet', title: 'U-Net' },
            { id: 'mask-rcnn', title: 'Mask R-CNN' },
            { id: 'fcn', title: 'Fully Convolutional Networks' },
          ],
        },
        {
          id: 'cv-techniques',
          title: 'CV Techniques',
          children: [
            { id: 'data-augmentation-cv', title: 'Data Augmentation' },
            { id: 'image-feature-extraction', title: 'Feature Extraction' },
            { id: 'video-analysis', title: 'Video Analysis' },
          ],
        },
      ],
    },
    {
      id: 'natural-language-processing',
      title: 'Natural Language Processing',
      summary: 'NLP tasks, text representation, models and pipelines.',
      level: 'advanced',
      children: [
        {
          id: 'nlp-tasks',
          title: 'NLP Tasks',
          children: [
            { id: 'text-classification-nlp', title: 'Text Classification' },
            { id: 'named-entity-recognition', title: 'Named Entity Recognition' },
            { id: 'sentiment-analysis', title: 'Sentiment Analysis' },
            { id: 'machine-translation', title: 'Machine Translation' },
            { id: 'text-summarization', title: 'Summarization' },
            { id: 'question-answering', title: 'Question Answering' },
            { id: 'text-generation-nlp', title: 'Text Generation' },
          ],
        },
        {
          id: 'text-representation',
          title: 'Text Representation',
          children: [
            { id: 'word-embeddings', title: 'Word Embeddings' },
            { id: 'word2vec', title: 'Word2Vec' },
            { id: 'glove', title: 'GloVe' },
            { id: 'fasttext', title: 'FastText' },
            { id: 'contextual-embeddings', title: 'Contextual Embeddings' },
          ],
        },
        {
          id: 'nlp-models',
          title: 'NLP Models',
          children: [
            { id: 'rnn-for-nlp', title: 'RNNs for NLP' },
            { id: 'transformers-for-nlp', title: 'Transformers for NLP' },
            { id: 'pretrained-language-models', title: 'Pretrained Language Models' },
          ],
        },
        {
          id: 'nlp-pipeline',
          title: 'NLP Pipeline',
          children: [
            { id: 'tokenization-nlp', title: 'Tokenization' },
            { id: 'pos-tagging', title: 'POS Tagging' },
            { id: 'parsing', title: 'Parsing' },
            { id: 'language-modeling', title: 'Language Modeling' },
          ],
        },
      ],
    },
    {
      id: 'time-series-analysis',
      title: 'Time Series Analysis',
      summary: 'Forecasting with classical and ML-based time series models.',
      level: 'advanced',
      children: [
        {
          id: 'ts-fundamentals',
          title: 'Time Series Fundamentals',
          children: [
            { id: 'trend-seasonality-components', title: 'Trend & Seasonality' },
            { id: 'stationarity', title: 'Stationarity' },
            { id: 'autocorrelation', title: 'Autocorrelation (ACF/PACF)' },
          ],
        },
        {
          id: 'classical-ts-models',
          title: 'Classical Models',
          children: [
            { id: 'arima', title: 'ARIMA' },
            { id: 'sarima', title: 'SARIMA' },
            { id: 'exponential-smoothing', title: 'Exponential Smoothing' },
            { id: 'prophet', title: 'Prophet' },
          ],
        },
        {
          id: 'ml-ts-models',
          title: 'ML & DL for Time Series',
          children: [
            { id: 'feature-based-ts', title: 'Feature-Based ML' },
            { id: 'lstm-time-series', title: 'LSTMs for Forecasting' },
            { id: 'transformers-time-series', title: 'Transformers for Forecasting' },
          ],
        },
        {
          id: 'ts-forecasting',
          title: 'Forecasting',
          children: [
            { id: 'univariate-multivariate', title: 'Univariate vs Multivariate' },
            { id: 'multi-step-forecasting', title: 'Multi-Step Forecasting' },
            { id: 'ts-evaluation', title: 'Forecast Evaluation' },
          ],
        },
      ],
    },
    {
      id: 'recommender-systems',
      title: 'Recommender Systems',
      summary: 'Collaborative, content-based and hybrid recommendation.',
      level: 'advanced',
      children: [
        {
          id: 'recsys-fundamentals',
          title: 'Recommender Fundamentals',
          children: [
            { id: 'types-of-recommenders', title: 'Types of Recommenders' },
            { id: 'explicit-implicit-feedback', title: 'Explicit vs Implicit Feedback' },
          ],
        },
        {
          id: 'collaborative-filtering',
          title: 'Collaborative Filtering',
          children: [
            { id: 'user-based-cf', title: 'User-Based CF' },
            { id: 'item-based-cf', title: 'Item-Based CF' },
            { id: 'matrix-factorization', title: 'Matrix Factorization' },
            { id: 'als-svd-recsys', title: 'ALS & SVD' },
          ],
        },
        {
          id: 'content-based-filtering',
          title: 'Content-Based Filtering',
          children: [
            { id: 'item-profiles', title: 'Item Profiles' },
            { id: 'user-profiles', title: 'User Profiles' },
          ],
        },
        {
          id: 'advanced-recsys',
          title: 'Hybrid & Advanced',
          children: [
            { id: 'hybrid-recommenders', title: 'Hybrid Recommenders' },
            { id: 'deep-learning-recsys', title: 'Deep Learning Recommenders' },
            { id: 'cold-start-problem', title: 'Cold-Start Problem' },
          ],
        },
      ],
    },
    {
      id: 'reinforcement-learning',
      title: 'Reinforcement Learning',
      summary: 'Agents, value/policy methods and deep reinforcement learning.',
      level: 'advanced',
      children: [
        {
          id: 'rl-fundamentals',
          title: 'RL Fundamentals',
          children: [
            { id: 'agent-environment', title: 'Agent & Environment' },
            { id: 'states-actions-rewards', title: 'States, Actions & Rewards' },
            { id: 'policy', title: 'Policy' },
            { id: 'value-function', title: 'Value Function' },
            { id: 'markov-decision-process', title: 'Markov Decision Process (MDP)' },
          ],
        },
        {
          id: 'rl-methods',
          title: 'Classical RL Methods',
          children: [
            { id: 'dynamic-programming-rl', title: 'Dynamic Programming' },
            { id: 'monte-carlo-rl', title: 'Monte Carlo Methods' },
            { id: 'temporal-difference', title: 'Temporal Difference Learning' },
            { id: 'q-learning', title: 'Q-Learning' },
            { id: 'sarsa', title: 'SARSA' },
          ],
        },
        {
          id: 'deep-rl',
          title: 'Deep Reinforcement Learning',
          children: [
            { id: 'dqn', title: 'Deep Q-Networks (DQN)' },
            { id: 'policy-gradient', title: 'Policy Gradient' },
            { id: 'actor-critic', title: 'Actor-Critic' },
            { id: 'ppo', title: 'PPO' },
            { id: 'a3c', title: 'A3C' },
          ],
        },
        {
          id: 'rl-concepts',
          title: 'Key RL Concepts',
          children: [
            { id: 'exploration-exploitation', title: 'Exploration vs Exploitation' },
            { id: 'reward-shaping', title: 'Reward Shaping' },
            { id: 'on-off-policy', title: 'On-Policy vs Off-Policy' },
          ],
        },
      ],
    },
    {
      id: 'audio-speech-processing',
      title: 'Audio & Speech Processing',
      summary: 'Speech recognition, synthesis and audio classification.',
      level: 'advanced',
      children: [
        {
          id: 'speech-recognition',
          title: 'Speech Recognition',
          children: [
            { id: 'asr', title: 'Automatic Speech Recognition (ASR)' },
            { id: 'acoustic-language-models', title: 'Acoustic & Language Models' },
          ],
        },
        {
          id: 'speech-synthesis',
          title: 'Speech Synthesis',
          children: [
            { id: 'tts', title: 'Text-to-Speech (TTS)' },
            { id: 'voice-cloning', title: 'Voice Cloning' },
          ],
        },
        {
          id: 'audio-ml',
          title: 'Audio Machine Learning',
          children: [
            { id: 'audio-classification', title: 'Audio Classification' },
            { id: 'sound-event-detection', title: 'Sound Event Detection' },
          ],
        },
      ],
    },
  ],
})
