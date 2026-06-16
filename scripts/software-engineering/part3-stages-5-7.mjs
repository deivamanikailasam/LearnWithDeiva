/**
 * Part 3: subtopics + sub-subtopics for stages 5-7
 *   5. Agile & Lean Software Engineering
 *   6. Software Requirements Engineering
 *   7. Software Modeling & Analysis
 *
 * Run with: node scripts/software-engineering/part3-stages-5-7.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 5 — Agile & Lean Software Engineering
   * ============================================================ */

  /* ---- agile-fundamentals ---- */
  { id: 'agile-fundamentals--what-is-agile', title: 'What Is Agile?', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--why-agile-emerged', title: 'Why Agile Emerged', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--values-vs-practices', title: 'Values vs Practices', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--iteration-vs-increment', title: 'Iteration vs Increment (Agile View)', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--feedback-loops', title: 'Feedback Loops in Agile', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--adaptation', title: 'Adaptation & Inspect-Adapt', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--working-software-as-measure', title: 'Working Software as Primary Measure', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--agile-vs-waterfall', title: 'Agile vs Waterfall', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--agile-vs-iterative', title: 'Agile vs Iterative', parentId: 'agile-fundamentals' },
  { id: 'agile-fundamentals--agile-mindset', title: 'Agile Mindset', parentId: 'agile-fundamentals' },

  /* ---- agile-manifesto ---- */
  { id: 'agile-manifesto--snowbird-2001', title: 'Snowbird 2001 Origins', parentId: 'agile-manifesto' },
  { id: 'agile-manifesto--four-values', title: 'The Four Values', parentId: 'agile-manifesto' },
  { id: 'agile-manifesto--twelve-principles', title: 'The Twelve Principles', parentId: 'agile-manifesto' },
  { id: 'agile-manifesto--signatories', title: 'Manifesto Signatories', parentId: 'agile-manifesto' },
  { id: 'agile-manifesto--criticism-evolution', title: 'Manifesto Criticism & Evolution', parentId: 'agile-manifesto' },
  { id: 'agile-manifesto--in-2026', title: 'Manifesto Relevance in 2026', parentId: 'agile-manifesto' },
  { id: 'agile-manifesto--modern-agile', title: 'Modern Agile (Kerievsky)', parentId: 'agile-manifesto' },
  { id: 'agile-manifesto--heart-of-agile', title: 'Heart of Agile (Cockburn)', parentId: 'agile-manifesto' },

  /* ---- scrum-engineering ---- */
  { id: 'scrum-engineering--scrum-guide-2020', title: 'The Scrum Guide (2020)', parentId: 'scrum-engineering' },
  { id: 'scrum-engineering--scrum-pillars', title: 'Scrum Pillars (Transparency, Inspection, Adaptation)', parentId: 'scrum-engineering' },
  { id: 'scrum-engineering--scrum-values', title: 'Scrum Values', parentId: 'scrum-engineering' },
  { id: 'scrum-engineering--roles-overview', title: 'Scrum Roles Overview', parentId: 'scrum-engineering',
    children: [
      { id: 'product-owner-role', title: 'Product Owner Role' },
      { id: 'scrum-master-role', title: 'Scrum Master Role' },
      { id: 'developers-role', title: 'Developers Role' },
    ],
  },
  { id: 'scrum-engineering--events-overview', title: 'Scrum Events Overview', parentId: 'scrum-engineering',
    children: [
      { id: 'sprint', title: 'The Sprint' },
      { id: 'sprint-planning', title: 'Sprint Planning' },
      { id: 'daily-scrum', title: 'Daily Scrum' },
      { id: 'sprint-review', title: 'Sprint Review' },
      { id: 'sprint-retrospective', title: 'Sprint Retrospective' },
    ],
  },
  { id: 'scrum-engineering--artifacts-overview', title: 'Scrum Artifacts Overview', parentId: 'scrum-engineering',
    children: [
      { id: 'product-backlog', title: 'Product Backlog' },
      { id: 'sprint-backlog', title: 'Sprint Backlog' },
      { id: 'increment', title: 'Increment' },
      { id: 'definition-of-done', title: 'Definition of Done' },
      { id: 'product-goal', title: 'Product Goal' },
      { id: 'sprint-goal', title: 'Sprint Goal' },
    ],
  },
  { id: 'scrum-engineering--backlog-refinement', title: 'Backlog Refinement', parentId: 'scrum-engineering' },
  { id: 'scrum-engineering--sprint-cancellation', title: 'Sprint Cancellation', parentId: 'scrum-engineering' },
  { id: 'scrum-engineering--scrum-anti-patterns', title: 'Scrum Anti-Patterns (Engineering)', parentId: 'scrum-engineering' },
  { id: 'scrum-engineering--scrumban', title: 'Scrumban', parentId: 'scrum-engineering' },
  { id: 'scrum-engineering--scrum-certifications', title: 'Scrum Certifications (CSM, PSM)', parentId: 'scrum-engineering' },

  /* ---- kanban-engineering ---- */
  { id: 'kanban-engineering--origins-tps', title: 'Origins in Toyota Production System', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--six-practices', title: 'Six Core Practices', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--visualize-work', title: 'Visualize Work', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--limit-wip', title: 'Limit Work in Progress', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--manage-flow', title: 'Manage Flow', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--explicit-policies', title: 'Make Policies Explicit', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--feedback-loops', title: 'Feedback Loops in Kanban', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--improve-collaboratively', title: 'Improve Collaboratively', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--cumulative-flow-diagram', title: 'Cumulative Flow Diagram', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--lead-time', title: 'Lead Time', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--cycle-time', title: 'Cycle Time', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--throughput', title: 'Throughput', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--classes-of-service', title: 'Classes of Service', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--service-delivery-cadences', title: 'Service Delivery Cadences', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--kanban-vs-scrum', title: 'Kanban vs Scrum', parentId: 'kanban-engineering' },
  { id: 'kanban-engineering--anti-patterns', title: 'Kanban Anti-Patterns', parentId: 'kanban-engineering' },

  /* ---- extreme-programming ---- */
  { id: 'extreme-programming--xp-values', title: 'XP Values (Communication, Simplicity, Feedback, Courage, Respect)', parentId: 'extreme-programming' },
  { id: 'extreme-programming--xp-principles', title: 'XP Principles', parentId: 'extreme-programming' },
  { id: 'extreme-programming--planning-game', title: 'Planning Game', parentId: 'extreme-programming' },
  { id: 'extreme-programming--small-releases', title: 'Small Releases', parentId: 'extreme-programming' },
  { id: 'extreme-programming--metaphor', title: 'System Metaphor', parentId: 'extreme-programming' },
  { id: 'extreme-programming--simple-design', title: 'Simple Design', parentId: 'extreme-programming' },
  { id: 'extreme-programming--testing-xp', title: 'Testing in XP', parentId: 'extreme-programming' },
  { id: 'extreme-programming--refactoring-xp', title: 'Refactoring in XP', parentId: 'extreme-programming' },
  { id: 'extreme-programming--pair-programming-xp', title: 'Pair Programming (XP)', parentId: 'extreme-programming' },
  { id: 'extreme-programming--collective-ownership', title: 'Collective Code Ownership', parentId: 'extreme-programming' },
  { id: 'extreme-programming--continuous-integration-xp', title: 'Continuous Integration (XP)', parentId: 'extreme-programming' },
  { id: 'extreme-programming--40-hour-week', title: '40-Hour Week / Sustainable Pace', parentId: 'extreme-programming' },
  { id: 'extreme-programming--on-site-customer', title: 'On-Site Customer', parentId: 'extreme-programming' },
  { id: 'extreme-programming--coding-standard', title: 'Coding Standard', parentId: 'extreme-programming' },
  { id: 'extreme-programming--xp-vs-scrum', title: 'XP vs Scrum', parentId: 'extreme-programming' },

  /* ---- crystal-methods ---- */
  { id: 'crystal-methods--cockburn-philosophy', title: 'Cockburn Philosophy & Family', parentId: 'crystal-methods' },
  { id: 'crystal-methods--crystal-clear', title: 'Crystal Clear', parentId: 'crystal-methods' },
  { id: 'crystal-methods--crystal-yellow', title: 'Crystal Yellow', parentId: 'crystal-methods' },
  { id: 'crystal-methods--crystal-orange', title: 'Crystal Orange', parentId: 'crystal-methods' },
  { id: 'crystal-methods--crystal-red', title: 'Crystal Red', parentId: 'crystal-methods' },
  { id: 'crystal-methods--seven-properties', title: 'Seven Properties (Frequent Delivery, Reflective Improvement, etc.)', parentId: 'crystal-methods' },
  { id: 'crystal-methods--strategies-and-techniques', title: 'Crystal Strategies & Techniques', parentId: 'crystal-methods' },

  /* ---- feature-driven-development ---- */
  { id: 'feature-driven-development--fdd-overview', title: 'FDD Overview (DeLuca/Coad)', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--five-processes', title: 'Five FDD Processes', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--develop-overall-model', title: 'Develop an Overall Model', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--build-feature-list', title: 'Build a Features List', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--plan-by-feature', title: 'Plan By Feature', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--design-by-feature', title: 'Design By Feature', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--build-by-feature', title: 'Build By Feature', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--feature-template', title: 'Feature Template (action result object)', parentId: 'feature-driven-development' },
  { id: 'feature-driven-development--milestones-and-tracking', title: 'Milestones & Tracking', parentId: 'feature-driven-development' },

  /* ---- dsdm-method ---- */
  { id: 'dsdm-method--overview', title: 'DSDM / AgilePM Overview', parentId: 'dsdm-method' },
  { id: 'dsdm-method--principles', title: 'DSDM Principles', parentId: 'dsdm-method' },
  { id: 'dsdm-method--phases', title: 'DSDM Phases', parentId: 'dsdm-method' },
  { id: 'dsdm-method--roles', title: 'DSDM Roles', parentId: 'dsdm-method' },
  { id: 'dsdm-method--moscow', title: 'MoSCoW Prioritization', parentId: 'dsdm-method' },
  { id: 'dsdm-method--timeboxing', title: 'DSDM Timeboxing', parentId: 'dsdm-method' },
  { id: 'dsdm-method--products-deliverables', title: 'Products & Deliverables', parentId: 'dsdm-method' },
  { id: 'dsdm-method--apmg', title: 'APMG Certification', parentId: 'dsdm-method' },

  /* ---- lean-software ---- */
  { id: 'lean-software--poppendieck-principles', title: 'Poppendieck Lean Principles', parentId: 'lean-software' },
  { id: 'lean-software--eliminate-waste', title: 'Eliminate Waste', parentId: 'lean-software' },
  { id: 'lean-software--build-quality-in', title: 'Build Quality In', parentId: 'lean-software' },
  { id: 'lean-software--create-knowledge', title: 'Create Knowledge', parentId: 'lean-software' },
  { id: 'lean-software--defer-commitment', title: 'Defer Commitment', parentId: 'lean-software' },
  { id: 'lean-software--deliver-fast', title: 'Deliver Fast', parentId: 'lean-software' },
  { id: 'lean-software--respect-people', title: 'Respect People', parentId: 'lean-software' },
  { id: 'lean-software--optimize-the-whole', title: 'Optimize the Whole', parentId: 'lean-software' },
  { id: 'lean-software--seven-wastes', title: 'Seven Wastes of Software', parentId: 'lean-software' },
  { id: 'lean-software--value-stream-mapping', title: 'Value Stream Mapping', parentId: 'lean-software' },
  { id: 'lean-software--kaizen', title: 'Kaizen', parentId: 'lean-software' },
  { id: 'lean-software--pull-systems', title: 'Pull Systems', parentId: 'lean-software' },
  { id: 'lean-software--lean-startup-link', title: 'Lean Startup Connection', parentId: 'lean-software' },

  /* ---- safe-overview ---- */
  { id: 'safe-overview--safe-versions', title: 'SAFe Versions (4.x to 6.x)', parentId: 'safe-overview' },
  { id: 'safe-overview--core-values', title: 'SAFe Core Values', parentId: 'safe-overview' },
  { id: 'safe-overview--principles', title: 'SAFe Principles', parentId: 'safe-overview' },
  { id: 'safe-overview--configurations', title: 'SAFe Configurations (Essential, Large Solution, Portfolio, Full)', parentId: 'safe-overview' },
  { id: 'safe-overview--art', title: 'Agile Release Train (ART)', parentId: 'safe-overview' },
  { id: 'safe-overview--pi-planning', title: 'PI Planning', parentId: 'safe-overview' },
  { id: 'safe-overview--inspect-adapt', title: 'Inspect & Adapt Workshop', parentId: 'safe-overview' },
  { id: 'safe-overview--solution-train', title: 'Solution Train', parentId: 'safe-overview' },
  { id: 'safe-overview--portfolio-level', title: 'Portfolio Level', parentId: 'safe-overview' },
  { id: 'safe-overview--criticism', title: 'SAFe Criticism', parentId: 'safe-overview' },

  /* ---- less-overview ---- */
  { id: 'less-overview--less-fundamentals', title: 'LeSS Fundamentals', parentId: 'less-overview' },
  { id: 'less-overview--less-vs-less-huge', title: 'LeSS vs LeSS Huge', parentId: 'less-overview' },
  { id: 'less-overview--principles', title: 'LeSS Principles', parentId: 'less-overview' },
  { id: 'less-overview--rules', title: 'LeSS Rules', parentId: 'less-overview' },
  { id: 'less-overview--areas', title: 'Requirement Areas (LeSS Huge)', parentId: 'less-overview' },
  { id: 'less-overview--single-product-backlog', title: 'Single Product Backlog', parentId: 'less-overview' },
  { id: 'less-overview--criticism', title: 'LeSS Criticism', parentId: 'less-overview' },

  /* ---- nexus-overview ---- */
  { id: 'nexus-overview--nexus-framework', title: 'Nexus Framework', parentId: 'nexus-overview' },
  { id: 'nexus-overview--integration-team', title: 'Nexus Integration Team', parentId: 'nexus-overview' },
  { id: 'nexus-overview--events', title: 'Nexus Events', parentId: 'nexus-overview' },
  { id: 'nexus-overview--artifacts', title: 'Nexus Artifacts', parentId: 'nexus-overview' },
  { id: 'nexus-overview--cross-team-refinement', title: 'Cross-Team Refinement', parentId: 'nexus-overview' },
  { id: 'nexus-overview--scaling-up-to-nine-teams', title: 'Scaling Up to ~9 Teams', parentId: 'nexus-overview' },

  /* ---- scrum-at-scale-overview ---- */
  { id: 'scrum-at-scale-overview--sutherland-framework', title: 'Sutherland Scrum@Scale Framework', parentId: 'scrum-at-scale-overview' },
  { id: 'scrum-at-scale-overview--scrum-of-scrums', title: 'Scrum of Scrums', parentId: 'scrum-at-scale-overview' },
  { id: 'scrum-at-scale-overview--scaled-daily-scrum', title: 'Scaled Daily Scrum', parentId: 'scrum-at-scale-overview' },
  { id: 'scrum-at-scale-overview--exec-action-team', title: 'Executive Action Team', parentId: 'scrum-at-scale-overview' },
  { id: 'scrum-at-scale-overview--meta-scrum', title: 'MetaScrum', parentId: 'scrum-at-scale-overview' },
  { id: 'scrum-at-scale-overview--scaling-cycle', title: 'Scrum@Scale Cycle', parentId: 'scrum-at-scale-overview' },

  /* ---- disciplined-agile ---- */
  { id: 'disciplined-agile--da-overview', title: 'Disciplined Agile Overview', parentId: 'disciplined-agile' },
  { id: 'disciplined-agile--da-toolkit', title: 'DA Toolkit', parentId: 'disciplined-agile' },
  { id: 'disciplined-agile--da-mindset', title: 'DA Mindset', parentId: 'disciplined-agile' },
  { id: 'disciplined-agile--da-process-goals', title: 'DA Process Goals', parentId: 'disciplined-agile' },
  { id: 'disciplined-agile--da-life-cycles', title: 'DA Life Cycles', parentId: 'disciplined-agile' },
  { id: 'disciplined-agile--pmi-acquisition', title: 'PMI Acquisition of DA', parentId: 'disciplined-agile' },

  /* ---- agile-anti-patterns ---- */
  { id: 'agile-anti-patterns--cargo-cult-agile', title: 'Cargo-Cult Agile', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--fake-agile', title: 'Fake Agile / "Agile in Name Only"', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--dark-scrum', title: 'Dark Scrum', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--zombie-scrum', title: 'Zombie Scrum', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--velocity-as-target', title: 'Velocity as a Target', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--story-points-misuse', title: 'Story Points Misuse', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--sprint-zero-anti-pattern', title: 'Sprint Zero as an Excuse', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--mini-waterfall-sprints', title: 'Mini-Waterfall Sprints', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--scrum-but', title: 'ScrumBut', parentId: 'agile-anti-patterns' },
  { id: 'agile-anti-patterns--anti-patterns-recovery', title: 'Recovery from Agile Anti-Patterns', parentId: 'agile-anti-patterns' },

  /* ============================================================
   * STAGE 6 — Software Requirements Engineering
   * ============================================================ */

  /* ---- requirements-engineering-fundamentals ---- */
  { id: 'requirements-engineering-fundamentals--what-is-re', title: 'What Is Requirements Engineering?', parentId: 'requirements-engineering-fundamentals' },
  { id: 'requirements-engineering-fundamentals--re-process', title: 'Requirements Engineering Process', parentId: 'requirements-engineering-fundamentals' },
  { id: 'requirements-engineering-fundamentals--re-stakeholders', title: 'RE Stakeholders', parentId: 'requirements-engineering-fundamentals' },
  { id: 'requirements-engineering-fundamentals--re-artifacts', title: 'RE Artifacts', parentId: 'requirements-engineering-fundamentals' },
  { id: 'requirements-engineering-fundamentals--swebok-re-ka', title: 'SWEBOK Requirements KA', parentId: 'requirements-engineering-fundamentals' },
  { id: 'requirements-engineering-fundamentals--cmmi-rd-rm', title: 'CMMI RD & RM Practices', parentId: 'requirements-engineering-fundamentals' },
  { id: 'requirements-engineering-fundamentals--re-vs-ba', title: 'Requirements Engineering vs Business Analysis', parentId: 'requirements-engineering-fundamentals' },
  { id: 'requirements-engineering-fundamentals--ireb-cpre', title: 'IREB CPRE Certification', parentId: 'requirements-engineering-fundamentals' },

  /* ---- requirements-elicitation ---- */
  { id: 'requirements-elicitation--interviews', title: 'Interviews', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--workshops', title: 'Workshops & JAD Sessions', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--observation', title: 'Observation & Ethnography', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--surveys', title: 'Surveys & Questionnaires', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--document-analysis', title: 'Document Analysis', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--prototyping-elicitation', title: 'Prototyping for Elicitation', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--brainstorming', title: 'Brainstorming', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--focus-groups', title: 'Focus Groups', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--apprenticing', title: 'Apprenticing & Job Shadowing', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--scenarios-personas', title: 'Scenarios & Personas (Elicitation)', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--data-mining', title: 'Data Mining for Requirements', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--ai-assisted-elicitation', title: 'AI-Assisted Elicitation (2026)', parentId: 'requirements-elicitation' },
  { id: 'requirements-elicitation--elicitation-pitfalls', title: 'Elicitation Pitfalls', parentId: 'requirements-elicitation' },

  /* ---- requirements-analysis ---- */
  { id: 'requirements-analysis--classification', title: 'Requirements Classification', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--negotiation', title: 'Requirements Negotiation', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--conflict-resolution', title: 'Conflict Resolution', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--feasibility-analysis', title: 'Feasibility Analysis', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--requirements-derivation', title: 'Requirements Derivation', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--allocation', title: 'Requirements Allocation', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--volere-analysis', title: 'Volere Analysis', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--quality-attribute-workshop', title: 'Quality Attribute Workshop (QAW)', parentId: 'requirements-analysis' },
  { id: 'requirements-analysis--analysis-anti-patterns', title: 'Analysis Anti-Patterns', parentId: 'requirements-analysis' },

  /* ---- requirements-specification ---- */
  { id: 'requirements-specification--srs-document', title: 'Software Requirements Specification (SRS)', parentId: 'requirements-specification' },
  { id: 'requirements-specification--ieee-830', title: 'IEEE 830 SRS Template', parentId: 'requirements-specification' },
  { id: 'requirements-specification--iso-29148', title: 'ISO/IEC/IEEE 29148', parentId: 'requirements-specification' },
  { id: 'requirements-specification--volere-template', title: 'Volere Requirements Template', parentId: 'requirements-specification' },
  { id: 'requirements-specification--writing-good-requirements', title: 'Writing Good Requirements', parentId: 'requirements-specification' },
  { id: 'requirements-specification--smart-criteria', title: 'SMART Requirements', parentId: 'requirements-specification' },
  { id: 'requirements-specification--use-cases-spec', title: 'Use-Case Specifications', parentId: 'requirements-specification' },
  { id: 'requirements-specification--user-stories-spec', title: 'User Story Specifications', parentId: 'requirements-specification' },
  { id: 'requirements-specification--ears-syntax', title: 'EARS Syntax (Easy Approach to Requirements Syntax)', parentId: 'requirements-specification' },
  { id: 'requirements-specification--gherkin', title: 'Gherkin Specifications', parentId: 'requirements-specification' },
  { id: 'requirements-specification--specification-anti-patterns', title: 'Specification Anti-Patterns', parentId: 'requirements-specification' },

  /* ---- requirements-validation ---- */
  { id: 'requirements-validation--reviews', title: 'Requirements Reviews', parentId: 'requirements-validation' },
  { id: 'requirements-validation--inspections', title: 'Requirements Inspections', parentId: 'requirements-validation' },
  { id: 'requirements-validation--prototyping-validation', title: 'Prototyping for Validation', parentId: 'requirements-validation' },
  { id: 'requirements-validation--acceptance-criteria', title: 'Acceptance Criteria', parentId: 'requirements-validation' },
  { id: 'requirements-validation--given-when-then', title: 'Given-When-Then Validation', parentId: 'requirements-validation' },
  { id: 'requirements-validation--model-validation', title: 'Model-Based Validation', parentId: 'requirements-validation' },
  { id: 'requirements-validation--checklists', title: 'Validation Checklists', parentId: 'requirements-validation' },
  { id: 'requirements-validation--customer-acceptance', title: 'Customer Acceptance', parentId: 'requirements-validation' },
  { id: 'requirements-validation--ambiguity-detection', title: 'Ambiguity Detection', parentId: 'requirements-validation' },

  /* ---- requirements-management ---- */
  { id: 'requirements-management--baselining', title: 'Baselining Requirements', parentId: 'requirements-management' },
  { id: 'requirements-management--change-control', title: 'Requirements Change Control', parentId: 'requirements-management' },
  { id: 'requirements-management--ccb', title: 'Change Control Boards (CCB)', parentId: 'requirements-management' },
  { id: 'requirements-management--impact-analysis', title: 'Change Impact Analysis', parentId: 'requirements-management' },
  { id: 'requirements-management--versioning', title: 'Requirements Versioning', parentId: 'requirements-management' },
  { id: 'requirements-management--tooling', title: 'Requirements Management Tooling', parentId: 'requirements-management',
    children: [
      { id: 'doors', title: 'IBM DOORS' },
      { id: 'jama', title: 'Jama Connect' },
      { id: 'polarion', title: 'Polarion ALM' },
      { id: 'reqview', title: 'ReqView' },
      { id: 'modern-spec-tools', title: 'Modern Spec Tools (Notion/Linear/Productboard)' },
      { id: 'ai-spec-tools-2026', title: 'AI Spec Tools (2026)' },
    ],
  },
  { id: 'requirements-management--metrics', title: 'Requirements Metrics', parentId: 'requirements-management' },
  { id: 'requirements-management--anti-patterns', title: 'Requirements Management Anti-Patterns', parentId: 'requirements-management' },

  /* ---- functional-vs-nonfunctional ---- */
  { id: 'functional-vs-nonfunctional--functional', title: 'Functional Requirements', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--nonfunctional', title: 'Non-Functional Requirements', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--quality-attributes', title: 'Quality Attributes (RE View)', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--constraints', title: 'Constraints', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--business-requirements', title: 'Business Requirements', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--user-requirements', title: 'User Requirements', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--system-requirements', title: 'System Requirements', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--regulatory-requirements', title: 'Regulatory & Compliance Requirements', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--data-requirements', title: 'Data Requirements', parentId: 'functional-vs-nonfunctional' },
  { id: 'functional-vs-nonfunctional--interface-requirements', title: 'Interface Requirements', parentId: 'functional-vs-nonfunctional' },

  /* ---- user-stories-engineering ---- */
  { id: 'user-stories-engineering--story-anatomy', title: 'User Story Anatomy', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--invest', title: 'INVEST Criteria', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--three-cs', title: 'Three Cs (Card, Conversation, Confirmation)', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--story-splitting', title: 'Story Splitting Patterns', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--vertical-slices', title: 'Vertical Slicing', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--story-mapping', title: 'User Story Mapping (Patton)', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--epics', title: 'Epics', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--themes', title: 'Themes', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--spike-stories', title: 'Spike Stories', parentId: 'user-stories-engineering' },
  { id: 'user-stories-engineering--story-anti-patterns', title: 'Story Anti-Patterns', parentId: 'user-stories-engineering' },

  /* ---- use-case-modeling-re ---- */
  { id: 'use-case-modeling-re--use-case-fundamentals', title: 'Use Case Fundamentals', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--actors', title: 'Actors', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--main-success-scenario', title: 'Main Success Scenario', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--alternative-flows', title: 'Alternative & Exception Flows', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--use-case-diagrams', title: 'Use Case Diagrams', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--include-extend', title: 'Include & Extend Relationships', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--cockburn-style', title: 'Cockburn-Style Use Cases', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--essential-use-cases', title: 'Essential Use Cases (Constantine)', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--system-use-cases-vs-business-use-cases', title: 'System vs Business Use Cases', parentId: 'use-case-modeling-re' },
  { id: 'use-case-modeling-re--use-cases-vs-user-stories', title: 'Use Cases vs User Stories', parentId: 'use-case-modeling-re' },

  /* ---- requirements-traceability ---- */
  { id: 'requirements-traceability--traceability-fundamentals', title: 'Traceability Fundamentals', parentId: 'requirements-traceability' },
  { id: 'requirements-traceability--horizontal-vs-vertical', title: 'Horizontal vs Vertical Traceability', parentId: 'requirements-traceability' },
  { id: 'requirements-traceability--forward-backward', title: 'Forward & Backward Traceability', parentId: 'requirements-traceability' },
  { id: 'requirements-traceability--traceability-matrix', title: 'Requirements Traceability Matrix (RTM)', parentId: 'requirements-traceability' },
  { id: 'requirements-traceability--linking-to-tests', title: 'Linking to Tests', parentId: 'requirements-traceability' },
  { id: 'requirements-traceability--linking-to-code', title: 'Linking to Code & Commits', parentId: 'requirements-traceability' },
  { id: 'requirements-traceability--tooling', title: 'Traceability Tooling', parentId: 'requirements-traceability' },

  /* ---- requirements-prioritization ---- */
  { id: 'requirements-prioritization--moscow', title: 'MoSCoW', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--rice', title: 'RICE Scoring', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--kano', title: 'Kano Model', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--weighted-scoring', title: 'Weighted Scoring', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--wsjf', title: 'Weighted Shortest Job First (WSJF)', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--cost-of-delay', title: 'Cost of Delay', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--ahp', title: 'Analytic Hierarchy Process (AHP)', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--100-dollar', title: '$100 / Cumulative Voting', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--buy-a-feature', title: 'Buy-a-Feature', parentId: 'requirements-prioritization' },
  { id: 'requirements-prioritization--prioritization-pitfalls', title: 'Prioritization Pitfalls', parentId: 'requirements-prioritization' },

  /* ---- babok-overview ---- */
  { id: 'babok-overview--iiba-and-babok', title: 'IIBA & BABOK Guide', parentId: 'babok-overview' },
  { id: 'babok-overview--babok-v3', title: 'BABOK v3', parentId: 'babok-overview' },
  { id: 'babok-overview--six-knowledge-areas', title: 'Six Knowledge Areas', parentId: 'babok-overview' },
  { id: 'babok-overview--ka-business-analysis-planning', title: 'KA: Business Analysis Planning & Monitoring', parentId: 'babok-overview' },
  { id: 'babok-overview--ka-elicitation-collaboration', title: 'KA: Elicitation & Collaboration', parentId: 'babok-overview' },
  { id: 'babok-overview--ka-requirements-lifecycle', title: 'KA: Requirements Lifecycle Management', parentId: 'babok-overview' },
  { id: 'babok-overview--ka-strategy-analysis', title: 'KA: Strategy Analysis', parentId: 'babok-overview' },
  { id: 'babok-overview--ka-requirements-analysis-design', title: 'KA: Requirements Analysis & Design Definition', parentId: 'babok-overview' },
  { id: 'babok-overview--ka-solution-evaluation', title: 'KA: Solution Evaluation', parentId: 'babok-overview' },
  { id: 'babok-overview--cbap-ccba-ecba', title: 'CBAP / CCBA / ECBA Certifications', parentId: 'babok-overview' },

  /* ============================================================
   * STAGE 7 — Software Modeling & Analysis
   * ============================================================ */

  /* ---- modeling-fundamentals ---- */
  { id: 'modeling-fundamentals--why-model', title: 'Why Model Software?', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--abstraction-levels', title: 'Levels of Abstraction', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--notations', title: 'Notations & Languages', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--mda-mde', title: 'MDA & Model-Driven Engineering', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--metamodels', title: 'Metamodels', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--mof', title: 'Meta-Object Facility (MOF)', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--ocl', title: 'Object Constraint Language (OCL)', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--model-quality', title: 'Model Quality Criteria', parentId: 'modeling-fundamentals' },
  { id: 'modeling-fundamentals--just-enough-modeling', title: 'Just-Enough Modeling', parentId: 'modeling-fundamentals' },

  /* ---- uml-overview ---- */
  { id: 'uml-overview--history', title: 'UML History', parentId: 'uml-overview' },
  { id: 'uml-overview--uml-2x', title: 'UML 2.x Diagrams', parentId: 'uml-overview' },
  { id: 'uml-overview--structural-vs-behavioral', title: 'Structural vs Behavioral Diagrams', parentId: 'uml-overview' },
  { id: 'uml-overview--profiles-and-stereotypes', title: 'UML Profiles & Stereotypes', parentId: 'uml-overview' },
  { id: 'uml-overview--uml-in-2026', title: 'UML in 2026 (Status & Use)', parentId: 'uml-overview' },
  { id: 'uml-overview--uml-vs-c4', title: 'UML vs C4 Model', parentId: 'uml-overview' },
  { id: 'uml-overview--uml-criticisms', title: 'UML Criticisms', parentId: 'uml-overview' },

  /* ---- structural-uml ---- */
  { id: 'structural-uml--class-diagram', title: 'Class Diagram', parentId: 'structural-uml' },
  { id: 'structural-uml--object-diagram', title: 'Object Diagram', parentId: 'structural-uml' },
  { id: 'structural-uml--component-diagram', title: 'Component Diagram', parentId: 'structural-uml' },
  { id: 'structural-uml--composite-structure-diagram', title: 'Composite Structure Diagram', parentId: 'structural-uml' },
  { id: 'structural-uml--package-diagram', title: 'Package Diagram', parentId: 'structural-uml' },
  { id: 'structural-uml--deployment-diagram', title: 'Deployment Diagram', parentId: 'structural-uml' },
  { id: 'structural-uml--profile-diagram', title: 'Profile Diagram', parentId: 'structural-uml' },

  /* ---- behavioral-uml ---- */
  { id: 'behavioral-uml--use-case-diagram', title: 'Use Case Diagram', parentId: 'behavioral-uml' },
  { id: 'behavioral-uml--activity-diagram', title: 'Activity Diagram', parentId: 'behavioral-uml' },
  { id: 'behavioral-uml--state-machine-diagram', title: 'State Machine Diagram', parentId: 'behavioral-uml' },
  { id: 'behavioral-uml--sequence-diagram', title: 'Sequence Diagram', parentId: 'behavioral-uml' },
  { id: 'behavioral-uml--communication-diagram', title: 'Communication Diagram', parentId: 'behavioral-uml' },
  { id: 'behavioral-uml--timing-diagram', title: 'Timing Diagram', parentId: 'behavioral-uml' },
  { id: 'behavioral-uml--interaction-overview-diagram', title: 'Interaction Overview Diagram', parentId: 'behavioral-uml' },

  /* ---- erd-modeling ---- */
  { id: 'erd-modeling--entities-attributes', title: 'Entities & Attributes', parentId: 'erd-modeling' },
  { id: 'erd-modeling--relationships', title: 'Relationships', parentId: 'erd-modeling' },
  { id: 'erd-modeling--cardinality', title: 'Cardinality', parentId: 'erd-modeling' },
  { id: 'erd-modeling--participation', title: 'Participation Constraints', parentId: 'erd-modeling' },
  { id: 'erd-modeling--weak-strong-entities', title: 'Weak vs Strong Entities', parentId: 'erd-modeling' },
  { id: 'erd-modeling--chen-notation', title: 'Chen Notation', parentId: 'erd-modeling' },
  { id: 'erd-modeling--crow-foot', title: 'Crow’s Foot Notation', parentId: 'erd-modeling' },
  { id: 'erd-modeling--bachman-notation', title: 'Bachman Notation', parentId: 'erd-modeling' },
  { id: 'erd-modeling--idef1x', title: 'IDEF1X', parentId: 'erd-modeling' },
  { id: 'erd-modeling--enhanced-er', title: 'Enhanced ER (EER)', parentId: 'erd-modeling' },
  { id: 'erd-modeling--er-to-relational', title: 'ER to Relational Mapping', parentId: 'erd-modeling' },

  /* ---- bpmn-modeling ---- */
  { id: 'bpmn-modeling--bpmn-2', title: 'BPMN 2.0 Overview', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--flow-objects', title: 'Flow Objects (Events, Activities, Gateways)', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--connecting-objects', title: 'Connecting Objects', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--swimlanes', title: 'Pools & Swimlanes', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--artifacts', title: 'BPMN Artifacts', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--choreography-diagrams', title: 'Choreography Diagrams', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--collaboration-diagrams', title: 'Collaboration Diagrams', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--bpmn-tools', title: 'BPMN Tools', parentId: 'bpmn-modeling' },
  { id: 'bpmn-modeling--bpmn-to-execution', title: 'BPMN to Executable (BPEL/Camunda)', parentId: 'bpmn-modeling' },

  /* ---- sysml-overview ---- */
  { id: 'sysml-overview--sysml-vs-uml', title: 'SysML vs UML', parentId: 'sysml-overview' },
  { id: 'sysml-overview--block-definition-diagram', title: 'Block Definition Diagram', parentId: 'sysml-overview' },
  { id: 'sysml-overview--internal-block-diagram', title: 'Internal Block Diagram', parentId: 'sysml-overview' },
  { id: 'sysml-overview--requirement-diagram', title: 'Requirement Diagram', parentId: 'sysml-overview' },
  { id: 'sysml-overview--parametric-diagram', title: 'Parametric Diagram', parentId: 'sysml-overview' },
  { id: 'sysml-overview--activity-sysml', title: 'Activity Diagram (SysML)', parentId: 'sysml-overview' },
  { id: 'sysml-overview--sysml-2', title: 'SysML v2 (2026)', parentId: 'sysml-overview' },

  /* ---- data-flow-diagrams ---- */
  { id: 'data-flow-diagrams--processes', title: 'Processes', parentId: 'data-flow-diagrams' },
  { id: 'data-flow-diagrams--data-stores', title: 'Data Stores', parentId: 'data-flow-diagrams' },
  { id: 'data-flow-diagrams--external-entities', title: 'External Entities', parentId: 'data-flow-diagrams' },
  { id: 'data-flow-diagrams--data-flows', title: 'Data Flows', parentId: 'data-flow-diagrams' },
  { id: 'data-flow-diagrams--context-diagram', title: 'Context Diagram (Level 0)', parentId: 'data-flow-diagrams' },
  { id: 'data-flow-diagrams--leveling', title: 'DFD Leveling', parentId: 'data-flow-diagrams' },
  { id: 'data-flow-diagrams--gane-sarson-yourdon', title: 'Gane-Sarson vs Yourdon Notations', parentId: 'data-flow-diagrams' },

  /* ---- state-machines-modeling ---- */
  { id: 'state-machines-modeling--fsm', title: 'Finite State Machines', parentId: 'state-machines-modeling' },
  { id: 'state-machines-modeling--mealy-moore', title: 'Mealy vs Moore Machines', parentId: 'state-machines-modeling' },
  { id: 'state-machines-modeling--harel-statecharts', title: 'Harel Statecharts', parentId: 'state-machines-modeling' },
  { id: 'state-machines-modeling--hierarchical-states', title: 'Hierarchical States', parentId: 'state-machines-modeling' },
  { id: 'state-machines-modeling--orthogonal-regions', title: 'Orthogonal Regions', parentId: 'state-machines-modeling' },
  { id: 'state-machines-modeling--history-pseudostates', title: 'History Pseudostates', parentId: 'state-machines-modeling' },
  { id: 'state-machines-modeling--state-design-pattern', title: 'State Design Pattern (Reference)', parentId: 'state-machines-modeling' },
  { id: 'state-machines-modeling--state-machine-tooling', title: 'State Machine Tooling (XState et al.)', parentId: 'state-machines-modeling' },

  /* ---- petri-nets ---- */
  { id: 'petri-nets--basic-petri-nets', title: 'Basic Petri Nets', parentId: 'petri-nets' },
  { id: 'petri-nets--places-transitions', title: 'Places, Transitions & Tokens', parentId: 'petri-nets' },
  { id: 'petri-nets--firing-rules', title: 'Firing Rules', parentId: 'petri-nets' },
  { id: 'petri-nets--colored-petri-nets', title: 'Colored Petri Nets', parentId: 'petri-nets' },
  { id: 'petri-nets--timed-petri-nets', title: 'Timed Petri Nets', parentId: 'petri-nets' },
  { id: 'petri-nets--reachability', title: 'Reachability Analysis', parentId: 'petri-nets' },
  { id: 'petri-nets--applications-petri', title: 'Applications of Petri Nets', parentId: 'petri-nets' },

  /* ---- domain-modeling-se ---- */
  { id: 'domain-modeling-se--domain-model-fundamentals', title: 'Domain Model Fundamentals', parentId: 'domain-modeling-se' },
  { id: 'domain-modeling-se--rich-vs-anemic', title: 'Rich vs Anemic Domain Models', parentId: 'domain-modeling-se' },
  { id: 'domain-modeling-se--ubiquitous-language', title: 'Ubiquitous Language', parentId: 'domain-modeling-se' },
  { id: 'domain-modeling-se--conceptual-vs-design-vs-impl', title: 'Conceptual vs Design vs Implementation Models', parentId: 'domain-modeling-se' },
  { id: 'domain-modeling-se--domain-objects', title: 'Domain Objects', parentId: 'domain-modeling-se' },
  { id: 'domain-modeling-se--domain-services', title: 'Domain Services', parentId: 'domain-modeling-se' },
  { id: 'domain-modeling-se--cross-language-modeling', title: 'Cross-Language Domain Modeling', parentId: 'domain-modeling-se' },
  { id: 'domain-modeling-se--ai-and-domain-modeling', title: 'AI-Assisted Domain Modeling (2026)', parentId: 'domain-modeling-se' },

  /* ---- modeling-tools ---- */
  { id: 'modeling-tools--plantuml', title: 'PlantUML', parentId: 'modeling-tools' },
  { id: 'modeling-tools--mermaid', title: 'Mermaid', parentId: 'modeling-tools' },
  { id: 'modeling-tools--lucidchart', title: 'Lucidchart', parentId: 'modeling-tools' },
  { id: 'modeling-tools--drawio', title: 'draw.io / diagrams.net', parentId: 'modeling-tools' },
  { id: 'modeling-tools--enterprise-architect', title: 'Enterprise Architect', parentId: 'modeling-tools' },
  { id: 'modeling-tools--visual-paradigm', title: 'Visual Paradigm', parentId: 'modeling-tools' },
  { id: 'modeling-tools--miro-mural', title: 'Miro & Mural for Modeling', parentId: 'modeling-tools' },
  { id: 'modeling-tools--excalidraw', title: 'Excalidraw', parentId: 'modeling-tools' },
  { id: 'modeling-tools--d2', title: 'D2', parentId: 'modeling-tools' },
  { id: 'modeling-tools--structurizr', title: 'Structurizr', parentId: 'modeling-tools' },
  { id: 'modeling-tools--ai-diagramming-2026', title: 'AI Diagramming (2026)', parentId: 'modeling-tools' },
])
