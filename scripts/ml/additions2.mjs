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

/* New subtopics appended under existing roots (orders avoid prior additions). */
const subAdds = [
  {
    parentId: 'linear-algebra',
    id: 'numerical-linear-algebra',
    title: 'Numerical Linear Algebra',
    order: 11,
    level: 'advanced',
    tag: 'math-foundations',
    children: [
      { id: 'condition-number', title: 'Condition Number' },
      { id: 'numerical-rank', title: 'Numerical Rank' },
      { id: 'sparse-linear-algebra', title: 'Sparse Linear Algebra' },
    ],
  },
  {
    parentId: 'optimization-math',
    id: 'metaheuristic-optimization',
    title: 'Metaheuristic Optimization',
    order: 11,
    level: 'advanced',
    tag: 'math-foundations',
    children: [
      { id: 'genetic-algorithms', title: 'Genetic Algorithms' },
      { id: 'simulated-annealing', title: 'Simulated Annealing' },
      { id: 'particle-swarm', title: 'Particle Swarm Optimization' },
      { id: 'evolutionary-strategies', title: 'Evolutionary Strategies' },
    ],
  },
  {
    parentId: 'probability',
    id: 'probability-inequalities',
    title: 'Inequalities & Bounds',
    order: 13,
    level: 'advanced',
    tag: 'math-foundations',
    children: [
      { id: 'markov-chebyshev-inequality', title: 'Markov & Chebyshev Inequalities' },
      { id: 'hoeffding-inequality', title: 'Hoeffding Inequality' },
      { id: 'jensen-inequality', title: 'Jensen Inequality' },
      { id: 'concentration-bounds', title: 'Concentration Bounds' },
    ],
  },
  {
    parentId: 'nonlinear-regression',
    id: 'specialized-regression',
    title: 'Specialized Regression',
    order: 11,
    level: 'advanced',
    tag: 'supervised-regression',
    children: [
      { id: 'quantile-regression', title: 'Quantile Regression' },
      { id: 'isotonic-regression-method', title: 'Isotonic Regression' },
      { id: 'bayesian-linear-regression', title: 'Bayesian Linear Regression' },
      { id: 'kernel-ridge-regression', title: 'Kernel Ridge Regression' },
    ],
  },
  {
    parentId: 'decision-trees',
    id: 'rule-based-classifiers',
    title: 'Rule-Based Classifiers',
    order: 11,
    level: 'intermediate',
    tag: 'supervised-classification',
    children: [
      { id: 'oner', title: 'OneR' },
      { id: 'ripper', title: 'RIPPER' },
      { id: 'decision-rules', title: 'Decision Rules' },
    ],
  },
  {
    parentId: 'neural-network-basics',
    id: 'embeddings-nn',
    title: 'Embedding Layers',
    order: 11,
    level: 'intermediate',
    tag: 'deep-learning-foundations',
    children: [
      { id: 'embedding-layers', title: 'Embedding Layers' },
      { id: 'learned-embeddings', title: 'Learned Embeddings' },
      { id: 'embedding-lookup', title: 'Embedding Lookup & Tables' },
    ],
  },
  {
    parentId: 'natural-language-processing',
    id: 'conversational-ai',
    title: 'Conversational AI',
    order: 12,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      { id: 'chatbots', title: 'Chatbots' },
      { id: 'dialogue-systems', title: 'Dialogue Systems' },
      { id: 'intent-recognition', title: 'Intent Recognition' },
      { id: 'slot-filling', title: 'Slot Filling' },
    ],
  },
  {
    parentId: 'time-series-analysis',
    id: 'ts-anomaly-changepoint',
    title: 'Time Series Anomaly & Change Detection',
    order: 11,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      { id: 'ts-anomaly-detection', title: 'Time Series Anomaly Detection' },
      { id: 'change-point-detection', title: 'Change Point Detection' },
      { id: 'motif-discovery', title: 'Motif Discovery' },
    ],
  },
  {
    parentId: 'emerging-research',
    id: 'foundation-models',
    title: 'Foundation Models',
    order: 11,
    level: 'advanced',
    tag: 'advanced-topics',
    children: [
      { id: 'foundation-model-concept', title: 'Foundation Model Concept' },
      { id: 'large-scale-pretraining', title: 'Large-Scale Pretraining' },
      { id: 'in-context-learning', title: 'In-Context Learning' },
      { id: 'fine-tuning-foundation-models', title: 'Fine-Tuning Foundation Models' },
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

/* New ROOT topics with subtrees. */
const rootAdds = [
  {
    id: 'statistical-learning-theory',
    title: 'Statistical Learning Theory',
    summary: 'PAC learning, VC dimension and generalization bounds.',
    order: 30.1,
    level: 'advanced',
    tag: 'core-ml-concepts',
    children: [
      {
        id: 'learning-theory-foundations',
        title: 'Learning Theory Foundations',
        children: [
          { id: 'empirical-risk-minimization', title: 'Empirical Risk Minimization' },
          { id: 'hypothesis-space', title: 'Hypothesis Space' },
          { id: 'generalization-error', title: 'Generalization Error' },
        ],
      },
      {
        id: 'pac-learning',
        title: 'PAC Learning',
        children: [
          { id: 'pac-framework', title: 'PAC Framework' },
          { id: 'sample-complexity', title: 'Sample Complexity' },
          { id: 'agnostic-pac', title: 'Agnostic PAC Learning' },
        ],
      },
      {
        id: 'complexity-measures',
        title: 'Complexity Measures',
        children: [
          { id: 'vc-dimension', title: 'VC Dimension' },
          { id: 'rademacher-complexity', title: 'Rademacher Complexity' },
          { id: 'growth-function', title: 'Growth Function' },
        ],
      },
      {
        id: 'generalization-bounds',
        title: 'Generalization Bounds',
        children: [
          { id: 'uniform-convergence', title: 'Uniform Convergence' },
          { id: 'generalization-bounds-theory', title: 'Generalization Bounds' },
          { id: 'no-free-lunch-theorem-theory', title: 'No Free Lunch Theorem' },
        ],
      },
    ],
  },
  {
    id: 'tabular-machine-learning',
    title: 'Tabular Machine Learning',
    summary: 'Best practices and deep learning for tabular data.',
    order: 82.2,
    level: 'advanced',
    tag: 'specialized-domains',
    children: [
      {
        id: 'tabular-fundamentals',
        title: 'Tabular Fundamentals',
        children: [
          { id: 'tabular-vs-other-data', title: 'Tabular vs Other Data' },
          { id: 'gbdt-vs-deep-tabular', title: 'GBDT vs Deep Learning' },
        ],
      },
      {
        id: 'tabular-deep-models',
        title: 'Tabular Deep Models',
        children: [
          { id: 'tabnet', title: 'TabNet' },
          { id: 'ft-transformer', title: 'FT-Transformer' },
          { id: 'node-model', title: 'NODE' },
          { id: 'saint', title: 'SAINT' },
        ],
      },
      {
        id: 'tabular-best-practices',
        title: 'Tabular Best Practices',
        children: [
          { id: 'tabular-feature-handling', title: 'Feature Handling' },
          { id: 'tabular-benchmarks', title: 'Benchmarks & Comparisons' },
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

console.log(`Additions (pass 2): wrote ${count} topic files.`)
