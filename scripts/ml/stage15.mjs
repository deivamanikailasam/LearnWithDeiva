import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'advanced-topics',
  rootStartOrder: 90,
  tree: [
    {
      id: 'interpretability-explainability',
      title: 'Interpretability & Explainability (XAI)',
      summary: 'Understanding and explaining model predictions.',
      level: 'advanced',
      children: [
        {
          id: 'interpretability-concepts',
          title: 'Interpretability Concepts',
          children: [
            { id: 'interpretability-vs-explainability', title: 'Interpretability vs Explainability' },
            { id: 'intrinsic-vs-posthoc', title: 'Intrinsic vs Post-Hoc' },
            { id: 'global-vs-local', title: 'Global vs Local Explanations' },
          ],
        },
        {
          id: 'feature-attribution',
          title: 'Feature Attribution',
          children: [
            { id: 'shap', title: 'SHAP' },
            { id: 'lime', title: 'LIME' },
            { id: 'integrated-gradients', title: 'Integrated Gradients' },
            { id: 'partial-dependence-plots', title: 'Partial Dependence Plots' },
          ],
        },
        {
          id: 'model-specific-interpretability',
          title: 'Model-Specific Methods',
          children: [
            { id: 'tree-interpretation-xai', title: 'Tree Interpretation' },
            { id: 'attention-visualization', title: 'Attention Visualization' },
            { id: 'saliency-maps', title: 'Saliency Maps & Grad-CAM' },
          ],
        },
        {
          id: 'counterfactual-explanations',
          title: 'Counterfactual Explanations',
          children: [
            { id: 'counterfactual-concept', title: 'Counterfactual Concept' },
            { id: 'actionable-recourse', title: 'Actionable Recourse' },
          ],
        },
      ],
    },
    {
      id: 'automl',
      title: 'AutoML',
      summary: 'Automating model selection, tuning and architecture search.',
      level: 'advanced',
      children: [
        {
          id: 'automl-concepts',
          title: 'AutoML Concepts',
          children: [
            { id: 'automl-definition', title: 'AutoML Definition' },
            { id: 'automl-pipeline', title: 'Automated Pipelines' },
          ],
        },
        {
          id: 'neural-architecture-search',
          title: 'Neural Architecture Search',
          children: [
            { id: 'nas-concept', title: 'NAS Concept' },
            { id: 'nas-methods', title: 'NAS Methods' },
          ],
        },
        {
          id: 'automl-tools',
          title: 'AutoML Tools',
          children: [
            { id: 'auto-sklearn', title: 'Auto-sklearn' },
            { id: 'autogluon', title: 'AutoGluon' },
            { id: 'tpot', title: 'TPOT' },
            { id: 'h2o-automl', title: 'H2O AutoML' },
          ],
        },
      ],
    },
    {
      id: 'self-supervised-semi-supervised',
      title: 'Self-Supervised & Semi-Supervised Learning',
      summary: 'Learning from unlabeled or partially labeled data.',
      level: 'advanced',
      children: [
        {
          id: 'self-supervised-learning',
          title: 'Self-Supervised Learning',
          children: [
            { id: 'pretext-tasks', title: 'Pretext Tasks' },
            { id: 'contrastive-learning', title: 'Contrastive Learning' },
            { id: 'simclr-moco', title: 'SimCLR & MoCo' },
            { id: 'masked-modeling', title: 'Masked Modeling' },
          ],
        },
        {
          id: 'semi-supervised-learning',
          title: 'Semi-Supervised Learning',
          children: [
            { id: 'pseudo-labeling', title: 'Pseudo-Labeling' },
            { id: 'consistency-regularization', title: 'Consistency Regularization' },
            { id: 'self-training', title: 'Self-Training' },
          ],
        },
        {
          id: 'active-learning',
          title: 'Active Learning',
          children: [
            { id: 'query-strategies', title: 'Query Strategies' },
            { id: 'uncertainty-sampling', title: 'Uncertainty Sampling' },
          ],
        },
      ],
    },
    {
      id: 'bayesian-machine-learning',
      title: 'Bayesian Machine Learning',
      summary: 'Bayesian methods, probabilistic programming and uncertainty.',
      level: 'advanced',
      children: [
        {
          id: 'bayesian-methods',
          title: 'Bayesian Methods',
          children: [
            { id: 'bayesian-inference-ml', title: 'Bayesian Inference' },
            { id: 'bayesian-networks', title: 'Bayesian Networks' },
            { id: 'mcmc-sampling', title: 'MCMC Sampling' },
          ],
        },
        {
          id: 'probabilistic-programming',
          title: 'Probabilistic Programming',
          children: [
            { id: 'pymc', title: 'PyMC' },
            { id: 'stan', title: 'Stan' },
          ],
        },
        {
          id: 'bayesian-deep-learning',
          title: 'Bayesian Deep Learning',
          children: [
            { id: 'bayesian-neural-networks', title: 'Bayesian Neural Networks' },
            { id: 'uncertainty-quantification', title: 'Uncertainty Quantification' },
            { id: 'mc-dropout', title: 'MC Dropout' },
          ],
        },
      ],
    },
    {
      id: 'graph-machine-learning',
      title: 'Graph Machine Learning',
      summary: 'Graph representations, GNNs and graph tasks.',
      level: 'advanced',
      children: [
        {
          id: 'graph-fundamentals',
          title: 'Graph Fundamentals',
          children: [
            { id: 'graph-representation', title: 'Graph Representation' },
            { id: 'node-edge-features', title: 'Node & Edge Features' },
            { id: 'adjacency-matrices', title: 'Adjacency Matrices' },
          ],
        },
        {
          id: 'graph-neural-networks',
          title: 'Graph Neural Networks',
          children: [
            { id: 'gcn', title: 'Graph Convolutional Networks (GCN)' },
            { id: 'graphsage', title: 'GraphSAGE' },
            { id: 'gat', title: 'Graph Attention Networks (GAT)' },
            { id: 'message-passing-gnn', title: 'Message Passing' },
          ],
        },
        {
          id: 'graph-tasks',
          title: 'Graph Tasks',
          children: [
            { id: 'node-classification', title: 'Node Classification' },
            { id: 'link-prediction', title: 'Link Prediction' },
            { id: 'graph-classification', title: 'Graph Classification' },
          ],
        },
        {
          id: 'graph-embeddings',
          title: 'Graph Embeddings',
          children: [
            { id: 'node2vec', title: 'Node2Vec' },
            { id: 'deepwalk', title: 'DeepWalk' },
          ],
        },
      ],
    },
    {
      id: 'federated-privacy-learning',
      title: 'Federated & Privacy-Preserving Learning',
      summary: 'Decentralized training and privacy-preserving techniques.',
      level: 'advanced',
      children: [
        {
          id: 'federated-learning',
          title: 'Federated Learning',
          children: [
            { id: 'federated-concept', title: 'Federated Learning Concept' },
            { id: 'federated-aggregation', title: 'Federated Aggregation (FedAvg)' },
            { id: 'federated-challenges', title: 'Challenges' },
          ],
        },
        {
          id: 'privacy-preserving-ml',
          title: 'Privacy-Preserving ML',
          children: [
            { id: 'differential-privacy', title: 'Differential Privacy' },
            { id: 'secure-aggregation', title: 'Secure Aggregation' },
            { id: 'homomorphic-encryption-ml', title: 'Homomorphic Encryption' },
          ],
        },
      ],
    },
    {
      id: 'continual-meta-learning',
      title: 'Continual, Online & Meta-Learning',
      summary: 'Learning over time, on streams and learning to learn.',
      level: 'advanced',
      children: [
        {
          id: 'online-learning',
          title: 'Online Learning',
          children: [
            { id: 'incremental-learning', title: 'Incremental Learning' },
            { id: 'streaming-ml', title: 'Streaming ML' },
            { id: 'online-gradient-descent', title: 'Online Gradient Descent' },
          ],
        },
        {
          id: 'continual-learning',
          title: 'Continual Learning',
          children: [
            { id: 'catastrophic-forgetting', title: 'Catastrophic Forgetting' },
            { id: 'replay-methods', title: 'Replay Methods' },
            { id: 'regularization-continual', title: 'Regularization Approaches' },
          ],
        },
        {
          id: 'meta-learning',
          title: 'Meta-Learning',
          children: [
            { id: 'learning-to-learn', title: 'Learning to Learn' },
            { id: 'maml', title: 'MAML' },
            { id: 'few-shot-learning', title: 'Few-Shot Learning' },
          ],
        },
      ],
    },
    {
      id: 'emerging-research',
      title: 'Emerging Research Topics',
      summary: 'Causal inference, multi-task, neuro-symbolic and quantum ML.',
      level: 'advanced',
      children: [
        {
          id: 'causal-inference',
          title: 'Causal Inference',
          children: [
            { id: 'causal-ml', title: 'Causal ML' },
            { id: 'causal-graphs', title: 'Causal Graphs' },
            { id: 'treatment-effects', title: 'Treatment Effect Estimation' },
          ],
        },
        {
          id: 'emerging-paradigms',
          title: 'Emerging Paradigms',
          children: [
            { id: 'multi-task-learning', title: 'Multi-Task Learning' },
            { id: 'neuro-symbolic-ai', title: 'Neuro-Symbolic AI' },
            { id: 'quantum-ml', title: 'Quantum Machine Learning' },
          ],
        },
      ],
    },
  ],
})
