import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'model-evaluation',
  rootStartOrder: 59,
  tree: [
    {
      id: 'classification-metrics',
      title: 'Classification Metrics',
      summary: 'Confusion matrix, precision/recall, ROC/AUC and advanced metrics.',
      level: 'intermediate',
      children: [
        {
          id: 'confusion-matrix',
          title: 'Confusion Matrix',
          children: [
            { id: 'tp-fp-tn-fn', title: 'TP, FP, TN & FN' },
            { id: 'confusion-matrix-multiclass', title: 'Multiclass Confusion Matrix' },
          ],
        },
        {
          id: 'basic-classification-metrics',
          title: 'Basic Metrics',
          children: [
            { id: 'accuracy', title: 'Accuracy' },
            { id: 'precision', title: 'Precision' },
            { id: 'recall-sensitivity', title: 'Recall / Sensitivity' },
            { id: 'specificity', title: 'Specificity' },
            { id: 'f1-score', title: 'F1 Score' },
            { id: 'fbeta-score', title: 'F-Beta Score' },
          ],
        },
        {
          id: 'threshold-metrics',
          title: 'Threshold-Based Metrics',
          children: [
            { id: 'roc-curve', title: 'ROC Curve' },
            { id: 'auc-roc', title: 'AUC-ROC' },
            { id: 'precision-recall-curve', title: 'Precision-Recall Curve' },
            { id: 'average-precision', title: 'Average Precision' },
          ],
        },
        {
          id: 'advanced-classification-metrics',
          title: 'Advanced Metrics',
          children: [
            { id: 'mcc', title: 'Matthews Correlation Coefficient' },
            { id: 'cohens-kappa', title: "Cohen's Kappa" },
            { id: 'log-loss-metric', title: 'Log Loss' },
            { id: 'balanced-accuracy', title: 'Balanced Accuracy' },
          ],
        },
      ],
    },
    {
      id: 'ranking-metrics',
      title: 'Ranking & Recommendation Metrics',
      summary: 'Metrics for ranking, retrieval and recommendation tasks.',
      level: 'intermediate',
      children: [
        {
          id: 'ranking-metric-methods',
          title: 'Ranking Metrics',
          children: [
            { id: 'precision-at-k', title: 'Precision@K' },
            { id: 'recall-at-k', title: 'Recall@K' },
            { id: 'map-metric', title: 'Mean Average Precision (MAP)' },
            { id: 'ndcg', title: 'NDCG' },
            { id: 'mrr', title: 'Mean Reciprocal Rank (MRR)' },
          ],
        },
      ],
    },
    {
      id: 'cross-validation',
      title: 'Cross-Validation',
      summary: 'Resampling strategies for robust performance estimation.',
      level: 'intermediate',
      children: [
        {
          id: 'cv-methods',
          title: 'Cross-Validation Methods',
          children: [
            { id: 'holdout-validation', title: 'Holdout Validation' },
            { id: 'k-fold', title: 'K-Fold' },
            { id: 'stratified-k-fold', title: 'Stratified K-Fold' },
            { id: 'leave-one-out', title: 'Leave-One-Out (LOOCV)' },
            { id: 'leave-p-out', title: 'Leave-P-Out' },
          ],
        },
        {
          id: 'specialized-cv',
          title: 'Specialized Cross-Validation',
          children: [
            { id: 'time-series-cv', title: 'Time Series CV' },
            { id: 'group-k-fold', title: 'Group K-Fold' },
            { id: 'nested-cv', title: 'Nested Cross-Validation' },
            { id: 'repeated-k-fold', title: 'Repeated K-Fold' },
          ],
        },
        {
          id: 'cv-considerations',
          title: 'Cross-Validation Considerations',
          children: [
            { id: 'bias-variance-cv', title: 'Bias-Variance of CV' },
            { id: 'cv-pitfalls', title: 'Common Pitfalls' },
          ],
        },
      ],
    },
    {
      id: 'hyperparameter-tuning',
      title: 'Hyperparameter Tuning',
      summary: 'Search strategies, tools and best practices for tuning.',
      level: 'intermediate',
      children: [
        {
          id: 'search-methods',
          title: 'Search Methods',
          children: [
            { id: 'grid-search', title: 'Grid Search' },
            { id: 'random-search', title: 'Random Search' },
            { id: 'bayesian-optimization', title: 'Bayesian Optimization' },
            { id: 'hyperband', title: 'Hyperband' },
            { id: 'successive-halving', title: 'Successive Halving' },
            { id: 'evolutionary-search', title: 'Evolutionary / Genetic Search' },
          ],
        },
        {
          id: 'tuning-tools',
          title: 'Tuning Tools',
          children: [
            { id: 'sklearn-search', title: 'Scikit-Learn Search' },
            { id: 'optuna', title: 'Optuna' },
            { id: 'hyperopt', title: 'Hyperopt' },
            { id: 'ray-tune', title: 'Ray Tune' },
          ],
        },
        {
          id: 'tuning-best-practices',
          title: 'Tuning Best Practices',
          children: [
            { id: 'search-space-design', title: 'Search Space Design' },
            { id: 'budget-allocation', title: 'Budget Allocation' },
            { id: 'avoiding-tuning-overfitting', title: 'Avoiding Overfitting to Validation' },
          ],
        },
      ],
    },
    {
      id: 'model-selection',
      title: 'Model Selection',
      summary: 'Choosing and comparing models with sound criteria.',
      level: 'intermediate',
      children: [
        {
          id: 'selection-criteria',
          title: 'Selection Criteria',
          children: [
            { id: 'train-val-test-selection', title: 'Train/Validation/Test Selection' },
            { id: 'aic-bic', title: 'AIC & BIC' },
            { id: 'occams-razor', title: "Occam's Razor & Parsimony" },
          ],
        },
        {
          id: 'comparing-models',
          title: 'Comparing Models',
          children: [
            { id: 'mcnemar-test', title: "McNemar's Test" },
            { id: 'paired-t-test', title: 'Paired T-Test' },
            { id: 'cross-val-comparison', title: 'Cross-Validated Comparison' },
          ],
        },
        {
          id: 'model-complexity-selection',
          title: 'Complexity vs Performance',
          children: [
            { id: 'complexity-performance-tradeoff', title: 'Complexity-Performance Trade-off' },
            { id: 'no-free-lunch', title: 'No Free Lunch Theorem' },
          ],
        },
      ],
    },
    {
      id: 'validation-diagnostics',
      title: 'Validation & Error Analysis',
      summary: 'Diagnostic curves, error analysis and probability calibration.',
      level: 'intermediate',
      children: [
        {
          id: 'diagnostic-curves',
          title: 'Diagnostic Curves',
          children: [
            { id: 'learning-curves-eval', title: 'Learning Curves' },
            { id: 'validation-curves-eval', title: 'Validation Curves' },
          ],
        },
        {
          id: 'error-analysis',
          title: 'Error Analysis',
          children: [
            { id: 'error-breakdown', title: 'Error Breakdown' },
            { id: 'misclassification-analysis', title: 'Misclassification Analysis' },
            { id: 'slice-based-analysis', title: 'Slice-Based Analysis' },
          ],
        },
        {
          id: 'calibration-evaluation',
          title: 'Probability Calibration',
          children: [
            { id: 'reliability-diagrams', title: 'Reliability Diagrams' },
            { id: 'platt-scaling', title: 'Platt Scaling' },
            { id: 'isotonic-regression', title: 'Isotonic Regression' },
          ],
        },
      ],
    },
  ],
})
