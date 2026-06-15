import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'career-ethics',
  rootStartOrder: 98,
  tree: [
    {
      id: 'responsible-ai',
      title: 'Responsible AI & Ethics',
      summary: 'Ethics, fairness, transparency and privacy in ML.',
      level: 'intermediate',
      children: [
        {
          id: 'ai-ethics',
          title: 'AI Ethics',
          children: [
            { id: 'ethical-principles', title: 'Ethical Principles' },
            { id: 'ai-risks', title: 'AI Risks & Harms' },
            { id: 'ethical-frameworks', title: 'Ethical Frameworks' },
          ],
        },
        {
          id: 'fairness-bias',
          title: 'Fairness & Bias',
          children: [
            { id: 'types-of-bias', title: 'Types of Bias' },
            { id: 'fairness-metrics', title: 'Fairness Metrics' },
            { id: 'bias-mitigation', title: 'Bias Mitigation' },
            { id: 'protected-attributes', title: 'Protected Attributes' },
          ],
        },
        {
          id: 'transparency-accountability',
          title: 'Transparency & Accountability',
          children: [
            { id: 'model-documentation-ra', title: 'Model Documentation' },
            { id: 'model-cards', title: 'Model Cards & Datasheets' },
            { id: 'accountability-ml', title: 'Accountability' },
          ],
        },
        {
          id: 'privacy-regulations',
          title: 'Privacy & Regulation',
          children: [
            { id: 'data-privacy-ra', title: 'Data Privacy' },
            { id: 'gdpr-regulations', title: 'GDPR & Regulations' },
            { id: 'ai-governance', title: 'AI Governance' },
          ],
        },
      ],
    },
    {
      id: 'ml-system-design',
      title: 'ML System Design',
      summary: 'Designing end-to-end machine learning systems.',
      level: 'advanced',
      children: [
        {
          id: 'system-design-process',
          title: 'System Design Process',
          children: [
            { id: 'requirements-gathering', title: 'Requirements Gathering' },
            { id: 'problem-framing-design', title: 'Problem Framing' },
            { id: 'metrics-design', title: 'Metrics Design' },
          ],
        },
        {
          id: 'ml-system-components',
          title: 'System Components',
          children: [
            { id: 'data-layer', title: 'Data Layer' },
            { id: 'model-layer', title: 'Model Layer' },
            { id: 'serving-layer', title: 'Serving Layer' },
          ],
        },
        {
          id: 'design-tradeoffs',
          title: 'Design Trade-offs',
          children: [
            { id: 'latency-accuracy-tradeoff', title: 'Latency vs Accuracy' },
            { id: 'build-vs-buy', title: 'Build vs Buy' },
            { id: 'scalability-design', title: 'Scalability' },
          ],
        },
      ],
    },
    {
      id: 'ml-production-best-practices',
      title: 'ML Production Best Practices',
      summary: 'Testing, technical debt and documentation for ML systems.',
      level: 'advanced',
      children: [
        {
          id: 'testing-ml-systems',
          title: 'Testing ML Systems',
          children: [
            { id: 'data-tests', title: 'Data Tests' },
            { id: 'model-tests', title: 'Model Tests' },
            { id: 'integration-tests-ml', title: 'Integration Tests' },
          ],
        },
        {
          id: 'technical-debt-ml',
          title: 'ML Technical Debt',
          children: [
            { id: 'sources-of-debt', title: 'Sources of Technical Debt' },
            { id: 'ml-antipatterns', title: 'Anti-Patterns' },
          ],
        },
        {
          id: 'ml-documentation',
          title: 'Documentation',
          children: [
            { id: 'project-documentation', title: 'Project Documentation' },
            { id: 'reproducible-research', title: 'Reproducible Research' },
          ],
        },
      ],
    },
    {
      id: 'career-development',
      title: 'Career Development',
      summary: 'Career paths, portfolios and interview preparation.',
      level: 'beginner',
      children: [
        {
          id: 'ml-career-paths',
          title: 'ML Career Paths',
          children: [
            { id: 'data-scientist', title: 'Data Scientist' },
            { id: 'ml-engineer', title: 'ML Engineer' },
            { id: 'research-scientist', title: 'Research Scientist' },
            { id: 'mlops-engineer', title: 'MLOps Engineer' },
          ],
        },
        {
          id: 'building-portfolio-career',
          title: 'Building a Portfolio',
          children: [
            { id: 'ml-projects', title: 'ML Projects' },
            { id: 'kaggle', title: 'Kaggle Competitions' },
            { id: 'open-source-ml', title: 'Open Source Contributions' },
            { id: 'github-portfolio', title: 'GitHub Portfolio' },
          ],
        },
        {
          id: 'interview-preparation',
          title: 'Interview Preparation',
          children: [
            { id: 'ml-theory-questions', title: 'ML Theory Questions' },
            { id: 'coding-interviews-ml', title: 'Coding Interviews' },
            { id: 'ml-system-design-interviews', title: 'ML System Design Interviews' },
            { id: 'behavioral-interviews', title: 'Behavioral Interviews' },
          ],
        },
      ],
    },
    {
      id: 'continuous-learning',
      title: 'Continuous Learning',
      summary: 'Staying current, learning resources and communities.',
      level: 'beginner',
      children: [
        {
          id: 'staying-current',
          title: 'Staying Current',
          children: [
            { id: 'research-papers', title: 'Reading Research Papers' },
            { id: 'arxiv', title: 'arXiv & Preprints' },
            { id: 'ml-conferences', title: 'Conferences (NeurIPS, ICML, CVPR)' },
            { id: 'newsletters-ml', title: 'Newsletters & Blogs' },
          ],
        },
        {
          id: 'learning-resources',
          title: 'Learning Resources',
          children: [
            { id: 'online-courses-ml', title: 'Online Courses' },
            { id: 'books-ml', title: 'Books' },
            { id: 'tutorials-ml', title: 'Tutorials & Documentation' },
          ],
        },
        {
          id: 'communities-networking',
          title: 'Communities & Networking',
          children: [
            { id: 'ml-communities', title: 'ML Communities' },
            { id: 'forums-ml', title: 'Forums & Q&A' },
            { id: 'networking', title: 'Networking & Events' },
          ],
        },
      ],
    },
    {
      id: 'practical-wisdom',
      title: 'Practical Wisdom',
      summary: 'Pitfalls, debugging and effective collaboration.',
      level: 'intermediate',
      children: [
        {
          id: 'common-pitfalls',
          title: 'Common Pitfalls',
          children: [
            { id: 'data-pitfalls', title: 'Data Pitfalls' },
            { id: 'modeling-pitfalls', title: 'Modeling Pitfalls' },
            { id: 'evaluation-pitfalls', title: 'Evaluation Pitfalls' },
          ],
        },
        {
          id: 'debugging-collaboration',
          title: 'Debugging & Collaboration',
          children: [
            { id: 'debugging-ml-models', title: 'Debugging ML Models' },
            { id: 'team-collaboration-ml', title: 'Team Collaboration' },
            { id: 'communicating-results', title: 'Communicating Results' },
          ],
        },
      ],
    },
  ],
})
