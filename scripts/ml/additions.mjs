import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(
  __dirname,
  '../../src/content/subjects/machine-learning',
)

let count = 0
function writeTopic(meta) {
  const dir = resolve(SUBJECT_DIR, 'topics', meta.id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
  count += 1
}

/*
 * New SUBTOPICS appended under EXISTING root topics.
 * Each gets a high `order` so it sorts after the existing children, and its
 * parents are NOT rewritten (so their order/level stays intact).
 */
const subAdds = [
  {
    parentId: 'calculus',
    id: 'matrix-calculus',
    title: 'Matrix Calculus',
    order: 11,
    level: 'intermediate',
    tag: 'math-foundations',
    children: [
      { id: 'gradient-matrix-notation', title: 'Gradient & Matrix Notation' },
      { id: 'vector-matrix-derivatives', title: 'Vector & Matrix Derivatives' },
      { id: 'jacobian-hessian-ml', title: 'Jacobian & Hessian in ML' },
      { id: 'matrix-chain-rule', title: 'Matrix Chain Rule' },
    ],
  },
  {
    parentId: 'probability',
    id: 'stochastic-processes',
    title: 'Stochastic Processes',
    order: 11,
    level: 'advanced',
    tag: 'math-foundations',
    children: [
      { id: 'markov-chains', title: 'Markov Chains' },
      { id: 'poisson-process', title: 'Poisson Process' },
      { id: 'random-walks', title: 'Random Walks' },
    ],
  },
  {
    parentId: 'probability',
    id: 'multivariate-distributions',
    title: 'Multivariate Distributions',
    order: 12,
    level: 'intermediate',
    tag: 'math-foundations',
    children: [
      { id: 'multivariate-normal', title: 'Multivariate Normal Distribution' },
      { id: 'covariance-matrices-prob', title: 'Covariance Matrices' },
      { id: 'multinomial-distribution', title: 'Multinomial Distribution' },
    ],
  },
  {
    parentId: 'statistics',
    id: 'bayesian-statistics',
    title: 'Bayesian Statistics',
    order: 11,
    level: 'intermediate',
    tag: 'math-foundations',
    children: [
      { id: 'bayesian-vs-frequentist', title: 'Bayesian vs Frequentist' },
      { id: 'credible-intervals', title: 'Credible Intervals' },
      { id: 'bayesian-ab-testing', title: 'Bayesian A/B Testing' },
    ],
  },
  {
    parentId: 'statistics',
    id: 'resampling-statistics',
    title: 'Resampling Methods',
    order: 12,
    level: 'intermediate',
    tag: 'math-foundations',
    children: [
      { id: 'bootstrap-stats', title: 'Bootstrap' },
      { id: 'jackknife', title: 'Jackknife' },
      { id: 'permutation-tests', title: 'Permutation Tests' },
    ],
  },
  {
    parentId: 'statistics',
    id: 'experiment-design',
    title: 'Design of Experiments',
    order: 13,
    level: 'intermediate',
    tag: 'math-foundations',
    children: [
      { id: 'ab-testing-stats', title: 'A/B Testing' },
      { id: 'randomized-experiments', title: 'Randomized Experiments' },
      { id: 'statistical-power', title: 'Statistical Power & Sample Size' },
      { id: 'multiple-testing', title: 'Multiple Testing Correction' },
    ],
  },
  {
    parentId: 'data-collection-and-types',
    id: 'data-labeling',
    title: 'Data Labeling & Annotation',
    order: 11,
    level: 'beginner',
    tag: 'data-preprocessing',
    children: [
      { id: 'data-annotation', title: 'Data Annotation' },
      { id: 'weak-supervision', title: 'Weak Supervision (Snorkel)' },
      { id: 'crowdsourcing', title: 'Crowdsourcing' },
      { id: 'labeling-tools', title: 'Labeling Tools' },
    ],
  },
  {
    parentId: 'data-access-storage',
    id: 'big-data-tools',
    title: 'Big Data Tools',
    order: 11,
    level: 'intermediate',
    tag: 'programming-tools',
    children: [
      { id: 'apache-spark', title: 'Apache Spark' },
      { id: 'dask', title: 'Dask' },
      { id: 'polars', title: 'Polars' },
      { id: 'distributed-data-processing', title: 'Distributed Data Processing' },
    ],
  },
  {
    parentId: 'ml-fundamentals',
    id: 'learning-paradigms',
    title: 'Learning Paradigms',
    order: 11,
    level: 'beginner',
    tag: 'core-ml-concepts',
    children: [
      { id: 'parametric-vs-nonparametric', title: 'Parametric vs Non-Parametric' },
      { id: 'generative-vs-discriminative', title: 'Generative vs Discriminative' },
      { id: 'instance-vs-model-based', title: 'Instance-Based vs Model-Based' },
      { id: 'batch-vs-online-learning', title: 'Batch vs Online Learning' },
      { id: 'eager-vs-lazy-learning', title: 'Eager vs Lazy Learning' },
      { id: 'inductive-bias', title: 'Inductive Bias' },
    ],
  },
  {
    parentId: 'natural-language-processing',
    id: 'information-retrieval',
    title: 'Information Retrieval',
    order: 11,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      { id: 'search-indexing', title: 'Search & Indexing' },
      { id: 'text-similarity', title: 'Text Similarity' },
      { id: 'semantic-search-ir', title: 'Semantic Search' },
      { id: 'learning-to-rank-ir', title: 'Learning to Rank' },
    ],
  },
  {
    parentId: 'reinforcement-learning',
    id: 'advanced-rl',
    title: 'Advanced Reinforcement Learning',
    order: 11,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      { id: 'rlhf', title: 'RL from Human Feedback (RLHF)' },
      { id: 'inverse-rl', title: 'Inverse RL' },
      { id: 'multi-agent-rl', title: 'Multi-Agent RL' },
      { id: 'model-based-rl', title: 'Model-Based RL' },
      { id: 'offline-rl', title: 'Offline RL' },
    ],
  },
  {
    parentId: 'recommender-systems',
    id: 'advanced-recsys-topics',
    title: 'Advanced Recommender Topics',
    order: 11,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      { id: 'learning-to-rank-recsys', title: 'Learning to Rank' },
      { id: 'sequential-recommenders', title: 'Sequential Recommenders' },
      { id: 'session-based-rec', title: 'Session-Based Recommendations' },
      { id: 'recsys-evaluation', title: 'Recommender Evaluation' },
    ],
  },
  {
    parentId: 'computer-vision',
    id: 'cv-advanced-tasks',
    title: 'Advanced CV Tasks',
    order: 11,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      { id: 'image-captioning', title: 'Image Captioning' },
      { id: 'image-generation-cv', title: 'Image Generation' },
      { id: 'super-resolution', title: 'Super-Resolution' },
      { id: 'style-transfer', title: 'Style Transfer' },
      { id: 'three-d-vision', title: '3D Vision' },
    ],
  },
  {
    parentId: 'model-optimization-inference',
    id: 'edge-tinyml',
    title: 'Edge ML & TinyML',
    order: 11,
    level: 'advanced',
    tag: 'mlops-deployment',
    children: [
      { id: 'tinyml', title: 'TinyML' },
      { id: 'edge-optimization', title: 'Edge Optimization' },
      { id: 'mobile-deployment', title: 'Mobile Deployment' },
      { id: 'hardware-aware-optimization', title: 'Hardware-Aware Optimization' },
    ],
  },
]

for (const s of subAdds) {
  writeTopic({
    id: s.id,
    title: s.title,
    summary: s.title,
    order: s.order,
    level: s.level,
    tags: [s.tag],
    parentId: s.parentId,
  })
  s.children.forEach((c, k) => {
    writeTopic({
      id: `${s.id}--${c.id}`,
      title: c.title,
      summary: c.title,
      order: k + 1,
      level: c.level ?? s.level,
      tags: [s.tag],
      parentId: s.id,
    })
  })
}

/*
 * New ROOT topics (with full subtrees). Fractional `order` slots each root
 * next to its sibling roots from the same stage in the flat topic tree.
 */
const rootAdds = [
  {
    id: 'advanced-clustering',
    title: 'Advanced Clustering',
    summary: 'Spectral, affinity propagation, BIRCH and self-organizing maps.',
    order: 58.1,
    level: 'advanced',
    tag: 'unsupervised-learning',
    children: [
      {
        id: 'spectral-clustering',
        title: 'Spectral Clustering',
        children: [
          { id: 'graph-laplacian', title: 'Graph Laplacian' },
          { id: 'affinity-matrix-spectral', title: 'Affinity Matrix' },
          { id: 'spectral-embedding', title: 'Spectral Embedding' },
        ],
      },
      {
        id: 'affinity-propagation',
        title: 'Affinity Propagation',
        children: [
          { id: 'message-passing-ap', title: 'Message Passing' },
          { id: 'exemplars', title: 'Exemplars' },
        ],
      },
      {
        id: 'birch',
        title: 'BIRCH',
        children: [
          { id: 'cf-tree', title: 'CF Tree' },
          { id: 'birch-scalability', title: 'Scalability' },
        ],
      },
      {
        id: 'self-organizing-maps',
        title: 'Self-Organizing Maps',
        children: [
          { id: 'som-grid', title: 'SOM Grid' },
          { id: 'som-training', title: 'Training' },
        ],
      },
    ],
  },
  {
    id: 'topic-modeling',
    title: 'Topic Modeling',
    summary: 'Discovering latent topics in document collections.',
    order: 58.2,
    level: 'advanced',
    tag: 'unsupervised-learning',
    children: [
      {
        id: 'topic-modeling-concepts',
        title: 'Topic Modeling Concepts',
        children: [
          { id: 'document-term-matrix', title: 'Document-Term Matrix' },
          { id: 'topics-as-distributions', title: 'Topics as Distributions' },
        ],
      },
      {
        id: 'topic-modeling-methods',
        title: 'Topic Modeling Methods',
        children: [
          { id: 'latent-semantic-analysis', title: 'Latent Semantic Analysis (LSA)' },
          { id: 'latent-dirichlet-allocation', title: 'Latent Dirichlet Allocation (LDA)' },
          { id: 'nmf-topic-modeling', title: 'Non-Negative Matrix Factorization (NMF)' },
          { id: 'bertopic', title: 'BERTopic & Top2Vec' },
        ],
      },
    ],
  },
  {
    id: 'specialized-architectures',
    title: 'Specialized Neural Architectures',
    summary: 'Metric learning, memory-augmented and other novel architectures.',
    order: 76.1,
    level: 'advanced',
    tag: 'deep-learning-architectures',
    children: [
      {
        id: 'metric-learning',
        title: 'Metric Learning',
        children: [
          { id: 'siamese-networks', title: 'Siamese Networks' },
          { id: 'triplet-loss', title: 'Triplet Loss' },
          { id: 'contrastive-loss', title: 'Contrastive Loss' },
        ],
      },
      {
        id: 'memory-augmented-networks',
        title: 'Memory-Augmented Networks',
        children: [
          { id: 'neural-turing-machines', title: 'Neural Turing Machines' },
          { id: 'memory-networks', title: 'Memory Networks' },
        ],
      },
      {
        id: 'other-neural-architectures',
        title: 'Other Architectures',
        children: [
          { id: 'capsule-networks', title: 'Capsule Networks' },
          { id: 'neural-odes', title: 'Neural ODEs' },
          { id: 'mixture-of-experts', title: 'Mixture of Experts' },
          { id: 'highway-networks', title: 'Highway Networks' },
          { id: 'spiking-neural-networks', title: 'Spiking Neural Networks' },
        ],
      },
    ],
  },
  {
    id: 'multimodal-learning',
    title: 'Multimodal Learning',
    summary: 'Combining vision, language and audio modalities.',
    order: 82.1,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      {
        id: 'multimodal-fundamentals',
        title: 'Multimodal Fundamentals',
        children: [
          { id: 'fusion-strategies', title: 'Fusion Strategies' },
          { id: 'joint-embeddings-mm', title: 'Joint Embeddings' },
          { id: 'modality-alignment', title: 'Modality Alignment' },
        ],
      },
      {
        id: 'multimodal-models',
        title: 'Multimodal Models',
        children: [
          { id: 'clip', title: 'CLIP' },
          { id: 'vision-language-models', title: 'Vision-Language Models' },
          { id: 'image-captioning-mm', title: 'Image Captioning' },
        ],
      },
      {
        id: 'multimodal-tasks',
        title: 'Multimodal Tasks',
        children: [
          { id: 'visual-question-answering', title: 'Visual Question Answering (VQA)' },
          { id: 'text-to-image-generation', title: 'Text-to-Image Generation' },
          { id: 'audio-visual-learning', title: 'Audio-Visual Learning' },
        ],
      },
    ],
  },
]

for (const r of rootAdds) {
  writeTopic({
    id: r.id,
    title: r.title,
    summary: r.summary ?? r.title,
    order: r.order,
    level: r.level,
    tags: [r.tag],
  })
  ;(r.children ?? []).forEach((sub, j) => {
    writeTopic({
      id: sub.id,
      title: sub.title,
      summary: sub.summary ?? sub.title,
      order: j + 1,
      level: sub.level ?? r.level,
      tags: [r.tag],
      parentId: r.id,
    })
    ;(sub.children ?? []).forEach((leaf, k) => {
      writeTopic({
        id: `${sub.id}--${leaf.id}`,
        title: leaf.title,
        summary: leaf.summary ?? leaf.title,
        order: k + 1,
        level: leaf.level ?? sub.level ?? r.level,
        tags: [r.tag],
        parentId: sub.id,
      })
    })
  })
}

console.log(`Additions: wrote ${count} topic files.`)
