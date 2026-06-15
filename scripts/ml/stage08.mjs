import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'ensemble-learning',
  rootStartOrder: 44,
  tree: [
    {
      id: 'ensemble-fundamentals',
      title: 'Ensemble Fundamentals',
      summary: 'Why ensembles work and how predictions are combined.',
      level: 'intermediate',
      children: [
        {
          id: 'why-ensembles',
          title: 'Why Ensembles Work',
          children: [
            { id: 'wisdom-of-crowds', title: 'Wisdom of Crowds' },
            { id: 'reducing-variance', title: 'Reducing Variance' },
            { id: 'reducing-bias', title: 'Reducing Bias' },
            { id: 'ensemble-diversity', title: 'Diversity of Learners' },
          ],
        },
        {
          id: 'ensemble-types',
          title: 'Types of Ensembles',
          children: [
            { id: 'homogeneous-heterogeneous', title: 'Homogeneous vs Heterogeneous' },
            { id: 'parallel-vs-sequential', title: 'Parallel vs Sequential' },
          ],
        },
        {
          id: 'combining-predictions',
          title: 'Combining Predictions',
          children: [
            { id: 'averaging', title: 'Averaging' },
            { id: 'weighted-averaging', title: 'Weighted Averaging' },
            { id: 'majority-voting-ensemble', title: 'Majority Voting' },
          ],
        },
      ],
    },
    {
      id: 'bagging',
      title: 'Bagging',
      summary: 'Bootstrap aggregation to reduce variance.',
      level: 'intermediate',
      children: [
        {
          id: 'bagging-concept',
          title: 'Bagging Concept',
          children: [
            { id: 'bootstrap-sampling', title: 'Bootstrap Sampling' },
            { id: 'aggregation', title: 'Aggregation' },
            { id: 'bagging-variance-reduction', title: 'Variance Reduction' },
          ],
        },
        {
          id: 'bagging-applications',
          title: 'Bagging in Practice',
          children: [
            { id: 'bagged-trees', title: 'Bagged Trees' },
            { id: 'pasting', title: 'Pasting' },
            { id: 'out-of-bag-error', title: 'Out-of-Bag Error' },
          ],
        },
      ],
    },
    {
      id: 'random-forests',
      title: 'Random Forests',
      summary: 'Bagged trees with feature randomness.',
      level: 'intermediate',
      children: [
        {
          id: 'random-forest-algorithm',
          title: 'Random Forest Algorithm',
          children: [
            { id: 'feature-randomness', title: 'Feature Randomness' },
            { id: 'tree-aggregation-rf', title: 'Tree Aggregation' },
            { id: 'oob-evaluation', title: 'OOB Evaluation' },
          ],
        },
        {
          id: 'random-forest-tuning',
          title: 'Tuning Random Forests',
          children: [
            { id: 'n-estimators', title: 'Number of Estimators' },
            { id: 'max-features-rf', title: 'Max Features' },
            { id: 'max-depth-rf', title: 'Max Depth' },
            { id: 'min-samples-rf', title: 'Min Samples Split / Leaf' },
          ],
        },
        {
          id: 'random-forest-extensions',
          title: 'Extensions & Features',
          children: [
            { id: 'feature-importance-rf', title: 'Feature Importance' },
            { id: 'extra-trees', title: 'Extremely Randomized Trees' },
          ],
        },
      ],
    },
    {
      id: 'boosting',
      title: 'Boosting',
      summary: 'Sequential weak learners: AdaBoost, GBM and gradient boosting libraries.',
      level: 'advanced',
      children: [
        {
          id: 'boosting-concept',
          title: 'Boosting Concept',
          children: [
            { id: 'sequential-learning', title: 'Sequential Learning' },
            { id: 'weak-learners', title: 'Weak Learners' },
            { id: 'additive-models', title: 'Additive Models' },
          ],
        },
        {
          id: 'adaboost',
          title: 'AdaBoost',
          children: [
            { id: 'adaboost-algorithm', title: 'AdaBoost Algorithm' },
            { id: 'sample-weighting', title: 'Sample Weighting' },
          ],
        },
        {
          id: 'gradient-boosting',
          title: 'Gradient Boosting',
          children: [
            { id: 'gbm-algorithm', title: 'GBM Algorithm' },
            { id: 'gradient-boosting-trees', title: 'Gradient Boosted Trees' },
            { id: 'learning-rate-shrinkage', title: 'Learning Rate & Shrinkage' },
            { id: 'subsampling-boosting', title: 'Stochastic Gradient Boosting' },
          ],
        },
        {
          id: 'xgboost',
          title: 'XGBoost',
          children: [
            { id: 'xgboost-features', title: 'XGBoost Features' },
            { id: 'xgboost-regularization', title: 'Regularization' },
            { id: 'xgboost-tuning', title: 'Tuning XGBoost' },
          ],
        },
        {
          id: 'lightgbm',
          title: 'LightGBM',
          children: [
            { id: 'leaf-wise-growth', title: 'Leaf-Wise Growth' },
            { id: 'histogram-based-splitting', title: 'Histogram-Based Splitting' },
            { id: 'lightgbm-features', title: 'LightGBM Features' },
          ],
        },
        {
          id: 'catboost',
          title: 'CatBoost',
          children: [
            { id: 'ordered-boosting', title: 'Ordered Boosting' },
            { id: 'categorical-handling-catboost', title: 'Categorical Feature Handling' },
          ],
        },
      ],
    },
    {
      id: 'stacking-blending',
      title: 'Stacking & Blending',
      summary: 'Combining diverse models with a meta-learner.',
      level: 'advanced',
      children: [
        {
          id: 'stacking',
          title: 'Stacking',
          children: [
            { id: 'base-learners', title: 'Base Learners' },
            { id: 'meta-learner', title: 'Meta-Learner' },
            { id: 'stacking-cross-validation', title: 'Stacking with Cross-Validation' },
          ],
        },
        {
          id: 'blending',
          title: 'Blending',
          children: [
            { id: 'holdout-blending', title: 'Holdout Blending' },
            { id: 'multi-level-stacking', title: 'Multi-Level Stacking' },
          ],
        },
      ],
    },
    {
      id: 'voting-ensembles',
      title: 'Voting Ensembles',
      summary: 'Hard, soft and weighted voting across models.',
      level: 'intermediate',
      children: [
        {
          id: 'voting-methods',
          title: 'Voting Methods',
          children: [
            { id: 'hard-voting', title: 'Hard Voting' },
            { id: 'soft-voting', title: 'Soft Voting' },
            { id: 'weighted-voting', title: 'Weighted Voting' },
          ],
        },
      ],
    },
    {
      id: 'ensemble-considerations',
      title: 'Ensemble Considerations',
      summary: 'Trade-offs, cost and when to use ensembles.',
      level: 'intermediate',
      children: [
        {
          id: 'ensemble-tradeoffs',
          title: 'Trade-offs',
          children: [
            { id: 'bias-variance-ensembles', title: 'Bias-Variance Effects' },
            { id: 'computational-cost-ensembles', title: 'Computational Cost' },
            { id: 'interpretability-ensembles', title: 'Interpretability' },
          ],
        },
        {
          id: 'using-ensembles',
          title: 'Using Ensembles Well',
          children: [
            { id: 'when-to-use-ensembles', title: 'When to Use Ensembles' },
            { id: 'overfitting-ensembles', title: 'Avoiding Overfitting' },
          ],
        },
      ],
    },
  ],
})
