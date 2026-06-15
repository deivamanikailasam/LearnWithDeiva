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

/* New subtopics appended under existing roots. */
const subAdds = [
  {
    parentId: 'optimization-math',
    id: 'mathematical-programming',
    title: 'Mathematical Programming',
    order: 12,
    level: 'advanced',
    tag: 'math-foundations',
    children: [
      { id: 'linear-programming', title: 'Linear Programming' },
      { id: 'quadratic-programming', title: 'Quadratic Programming' },
      { id: 'integer-programming', title: 'Integer Programming' },
    ],
  },
  {
    parentId: 'data-cleaning',
    id: 'data-validation',
    title: 'Data Validation',
    order: 11,
    level: 'intermediate',
    tag: 'data-preprocessing',
    children: [
      { id: 'schema-validation-dc', title: 'Schema Validation' },
      { id: 'great-expectations', title: 'Great Expectations' },
      { id: 'data-contracts', title: 'Data Contracts' },
    ],
  },
  {
    parentId: 'generalized-linear-models',
    id: 'survival-analysis',
    title: 'Survival Analysis',
    order: 11,
    level: 'advanced',
    tag: 'supervised-regression',
    children: [
      { id: 'kaplan-meier', title: 'Kaplan-Meier Estimator' },
      { id: 'cox-proportional-hazards', title: 'Cox Proportional Hazards' },
      { id: 'censoring', title: 'Censoring' },
    ],
  },
  {
    parentId: 'training-neural-networks',
    id: 'efficient-training',
    title: 'Efficient Training',
    order: 11,
    level: 'advanced',
    tag: 'deep-learning-foundations',
    children: [
      { id: 'mixed-precision', title: 'Mixed Precision Training' },
      { id: 'gradient-accumulation', title: 'Gradient Accumulation' },
      { id: 'gradient-checkpointing', title: 'Gradient Checkpointing' },
    ],
  },
  {
    parentId: 'graph-machine-learning',
    id: 'knowledge-graphs',
    title: 'Knowledge Graphs',
    order: 11,
    level: 'advanced',
    tag: 'advanced-topics',
    children: [
      { id: 'knowledge-graph-concept', title: 'Knowledge Graph Concept' },
      { id: 'kg-embeddings', title: 'Knowledge Graph Embeddings' },
      { id: 'kg-completion', title: 'Link Prediction & Completion' },
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
    id: 'ml-libraries',
    title: 'ML Libraries',
    summary: 'Scikit-learn, gradient boosting libraries and the ML ecosystem.',
    order: 13.1,
    level: 'beginner',
    tag: 'programming-tools',
    children: [
      {
        id: 'scikit-learn',
        title: 'Scikit-Learn',
        children: [
          { id: 'estimators-api', title: 'Estimators API' },
          { id: 'transformers-pipelines-sklearn', title: 'Transformers & Pipelines' },
          { id: 'model-selection-sklearn', title: 'Model Selection' },
          { id: 'preprocessing-sklearn', title: 'Preprocessing' },
        ],
      },
      {
        id: 'gradient-boosting-libraries',
        title: 'Gradient Boosting Libraries',
        children: [
          { id: 'xgboost-library', title: 'XGBoost' },
          { id: 'lightgbm-library', title: 'LightGBM' },
          { id: 'catboost-library', title: 'CatBoost' },
        ],
      },
      {
        id: 'other-ml-libraries',
        title: 'Other ML Libraries',
        children: [
          { id: 'statsmodels', title: 'statsmodels' },
          { id: 'imbalanced-learn', title: 'imbalanced-learn' },
          { id: 'sktime', title: 'sktime' },
        ],
      },
    ],
  },
  {
    id: 'probabilistic-graphical-models',
    title: 'Probabilistic Graphical Models',
    summary: 'Bayesian networks, Markov models, HMMs, CRFs and inference.',
    order: 97.1,
    level: 'advanced',
    tag: 'advanced-topics',
    children: [
      {
        id: 'pgm-fundamentals',
        title: 'PGM Fundamentals',
        children: [
          { id: 'directed-vs-undirected', title: 'Directed vs Undirected' },
          { id: 'factorization-pgm', title: 'Factorization' },
          { id: 'conditional-independence-pgm', title: 'Conditional Independence' },
        ],
      },
      {
        id: 'directed-models',
        title: 'Directed Models',
        children: [
          { id: 'bayesian-networks-pgm', title: 'Bayesian Networks' },
          { id: 'hidden-markov-models', title: 'Hidden Markov Models (HMM)' },
          { id: 'dynamic-bayesian-networks', title: 'Dynamic Bayesian Networks' },
        ],
      },
      {
        id: 'undirected-models',
        title: 'Undirected Models',
        children: [
          { id: 'markov-random-fields', title: 'Markov Random Fields' },
          { id: 'conditional-random-fields', title: 'Conditional Random Fields (CRF)' },
        ],
      },
      {
        id: 'pgm-inference',
        title: 'Inference in PGMs',
        children: [
          { id: 'variable-elimination', title: 'Variable Elimination' },
          { id: 'belief-propagation', title: 'Belief Propagation' },
          { id: 'sampling-inference-pgm', title: 'Sampling-Based Inference' },
        ],
      },
    ],
  },
  {
    id: 'ml-security-robustness',
    title: 'ML Security & Robustness',
    summary: 'Adversarial attacks, defenses and secure ML practices.',
    order: 97.2,
    level: 'advanced',
    tag: 'advanced-topics',
    children: [
      {
        id: 'adversarial-attacks',
        title: 'Adversarial Attacks',
        children: [
          { id: 'evasion-attacks', title: 'Evasion Attacks' },
          { id: 'data-poisoning', title: 'Data Poisoning' },
          { id: 'model-extraction', title: 'Model Extraction' },
          { id: 'membership-inference', title: 'Membership Inference' },
        ],
      },
      {
        id: 'adversarial-defenses',
        title: 'Adversarial Defenses',
        children: [
          { id: 'adversarial-training-defense', title: 'Adversarial Training' },
          { id: 'robustness-certification', title: 'Robustness Certification' },
          { id: 'input-preprocessing-defense', title: 'Input Preprocessing Defenses' },
        ],
      },
      {
        id: 'ml-security-practices',
        title: 'Security Practices',
        children: [
          { id: 'threat-modeling-ml', title: 'Threat Modeling' },
          { id: 'secure-ml-deployment', title: 'Secure Deployment' },
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

console.log(`Additions (pass 3): wrote ${count} topic files.`)
