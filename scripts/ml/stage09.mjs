import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'unsupervised-learning',
  rootStartOrder: 51,
  tree: [
    {
      id: 'clustering-fundamentals',
      title: 'Clustering Fundamentals',
      summary: 'Core clustering concepts, similarity measures and cluster types.',
      level: 'intermediate',
      children: [
        {
          id: 'clustering-concepts',
          title: 'Clustering Concepts',
          children: [
            { id: 'what-is-clustering', title: 'What is Clustering?' },
            { id: 'similarity-distance-measures', title: 'Similarity & Distance Measures' },
            { id: 'cluster-validity', title: 'Cluster Validity' },
          ],
        },
        {
          id: 'types-of-clustering',
          title: 'Types of Clustering',
          children: [
            { id: 'partitional-type', title: 'Partitional' },
            { id: 'hierarchical-type', title: 'Hierarchical' },
            { id: 'density-based-type', title: 'Density-Based' },
            { id: 'model-based-type', title: 'Model-Based' },
          ],
        },
      ],
    },
    {
      id: 'partitional-clustering',
      title: 'Partitional Clustering',
      summary: 'K-Means, K-Medoids and their variants.',
      level: 'intermediate',
      children: [
        {
          id: 'kmeans',
          title: 'K-Means',
          children: [
            { id: 'kmeans-algorithm', title: 'K-Means Algorithm' },
            { id: 'centroid-initialization', title: 'Centroid Initialization' },
            { id: 'kmeans-plusplus', title: 'K-Means++' },
            { id: 'elbow-method', title: 'Elbow Method' },
            { id: 'silhouette-analysis', title: 'Silhouette Analysis' },
          ],
        },
        {
          id: 'kmedoids',
          title: 'K-Medoids',
          children: [
            { id: 'pam-algorithm', title: 'PAM Algorithm' },
            { id: 'kmedoids-vs-kmeans', title: 'K-Medoids vs K-Means' },
          ],
        },
        {
          id: 'kmeans-variants',
          title: 'K-Means Variants',
          children: [
            { id: 'minibatch-kmeans', title: 'Mini-Batch K-Means' },
            { id: 'fuzzy-cmeans', title: 'Fuzzy C-Means' },
          ],
        },
      ],
    },
    {
      id: 'hierarchical-clustering',
      title: 'Hierarchical Clustering',
      summary: 'Agglomerative and divisive clustering with dendrograms.',
      level: 'intermediate',
      children: [
        {
          id: 'agglomerative-clustering',
          title: 'Agglomerative Clustering',
          children: [
            { id: 'linkage-methods', title: 'Linkage Methods' },
            { id: 'single-complete-average-linkage', title: 'Single, Complete & Average Linkage' },
            { id: 'wards-method', title: "Ward's Method" },
          ],
        },
        {
          id: 'divisive-clustering',
          title: 'Divisive Clustering',
          children: [
            { id: 'top-down-clustering', title: 'Top-Down Clustering' },
          ],
        },
        {
          id: 'dendrograms',
          title: 'Dendrograms',
          children: [
            { id: 'reading-dendrograms', title: 'Reading Dendrograms' },
            { id: 'cutting-dendrograms', title: 'Cutting the Tree' },
          ],
        },
      ],
    },
    {
      id: 'density-based-clustering',
      title: 'Density-Based Clustering',
      summary: 'DBSCAN, OPTICS, HDBSCAN and Mean-Shift.',
      level: 'intermediate',
      children: [
        {
          id: 'dbscan',
          title: 'DBSCAN',
          children: [
            { id: 'dbscan-algorithm', title: 'DBSCAN Algorithm' },
            { id: 'epsilon-minpts', title: 'Epsilon & MinPts' },
            { id: 'core-border-noise', title: 'Core, Border & Noise Points' },
          ],
        },
        {
          id: 'other-density-clustering',
          title: 'Other Density Methods',
          children: [
            { id: 'optics', title: 'OPTICS' },
            { id: 'hdbscan', title: 'HDBSCAN' },
            { id: 'mean-shift', title: 'Mean-Shift' },
          ],
        },
      ],
    },
    {
      id: 'model-based-clustering',
      title: 'Model-Based Clustering',
      summary: 'Gaussian Mixture Models and the EM algorithm.',
      level: 'advanced',
      children: [
        {
          id: 'gaussian-mixture-models',
          title: 'Gaussian Mixture Models',
          children: [
            { id: 'gmm-concept', title: 'GMM Concept' },
            { id: 'em-algorithm', title: 'Expectation-Maximization (EM)' },
            { id: 'gmm-vs-kmeans', title: 'GMM vs K-Means' },
          ],
        },
        {
          id: 'bayesian-clustering',
          title: 'Bayesian Clustering',
          children: [
            { id: 'bayesian-gmm', title: 'Bayesian GMM' },
            { id: 'dirichlet-process', title: 'Dirichlet Process Mixtures' },
          ],
        },
        {
          id: 'density-estimation',
          title: 'Density Estimation',
          children: [
            { id: 'kernel-density-estimation', title: 'Kernel Density Estimation' },
            { id: 'histogram-density', title: 'Histogram Density Estimation' },
          ],
        },
      ],
    },
    {
      id: 'association-rule-learning',
      title: 'Association Rule Learning',
      summary: 'Frequent itemsets and rule mining algorithms.',
      level: 'intermediate',
      children: [
        {
          id: 'association-concepts',
          title: 'Association Concepts',
          children: [
            { id: 'support-confidence-lift', title: 'Support, Confidence & Lift' },
            { id: 'frequent-itemsets', title: 'Frequent Itemsets' },
            { id: 'rule-generation', title: 'Rule Generation' },
          ],
        },
        {
          id: 'association-algorithms',
          title: 'Association Algorithms',
          children: [
            { id: 'apriori', title: 'Apriori' },
            { id: 'eclat', title: 'ECLAT' },
            { id: 'fp-growth', title: 'FP-Growth' },
          ],
        },
      ],
    },
    {
      id: 'anomaly-detection',
      title: 'Anomaly Detection',
      summary: 'Statistical, proximity-based and model-based outlier detection.',
      level: 'advanced',
      children: [
        {
          id: 'anomaly-concepts',
          title: 'Anomaly Detection Concepts',
          children: [
            { id: 'types-of-anomalies', title: 'Types of Anomalies' },
            { id: 'supervised-vs-unsupervised-anomaly', title: 'Supervised vs Unsupervised' },
          ],
        },
        {
          id: 'statistical-anomaly',
          title: 'Statistical Methods',
          children: [
            { id: 'z-score-anomaly', title: 'Z-Score Method' },
            { id: 'gaussian-anomaly', title: 'Gaussian Distribution Method' },
          ],
        },
        {
          id: 'proximity-anomaly',
          title: 'Proximity-Based Methods',
          children: [
            { id: 'knn-anomaly', title: 'KNN-Based Detection' },
            { id: 'local-outlier-factor', title: 'Local Outlier Factor (LOF)' },
          ],
        },
        {
          id: 'model-based-anomaly',
          title: 'Model-Based Methods',
          children: [
            { id: 'isolation-forest', title: 'Isolation Forest' },
            { id: 'one-class-svm', title: 'One-Class SVM' },
            { id: 'autoencoder-anomaly', title: 'Autoencoder-Based Detection' },
          ],
        },
      ],
    },
    {
      id: 'clustering-evaluation',
      title: 'Clustering Evaluation',
      summary: 'Internal and external validation metrics for clusters.',
      level: 'intermediate',
      children: [
        {
          id: 'internal-metrics',
          title: 'Internal Metrics',
          children: [
            { id: 'silhouette-score', title: 'Silhouette Score' },
            { id: 'davies-bouldin', title: 'Davies-Bouldin Index' },
            { id: 'calinski-harabasz', title: 'Calinski-Harabasz Index' },
            { id: 'inertia', title: 'Inertia / WCSS' },
          ],
        },
        {
          id: 'external-metrics',
          title: 'External Metrics',
          children: [
            { id: 'adjusted-rand-index', title: 'Adjusted Rand Index' },
            { id: 'normalized-mutual-information', title: 'Normalized Mutual Information' },
            { id: 'homogeneity-completeness', title: 'Homogeneity & Completeness' },
          ],
        },
      ],
    },
  ],
})
