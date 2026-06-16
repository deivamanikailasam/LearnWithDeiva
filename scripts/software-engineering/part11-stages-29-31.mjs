/**
 * Part 11: subtopics + sub-subtopics for stages 29-31
 *   29. Formal Methods & Verification
 *   30. Empirical Software Engineering
 *   31. Software Engineering Economics
 *
 * Run with: node scripts/software-engineering/part11-stages-29-31.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 29 — Formal Methods & Verification
   * ============================================================ */

  /* ---- formal-methods-overview ---- */
  { id: 'formal-methods-overview--definition', title: 'Definition of Formal Methods', parentId: 'formal-methods-overview' },
  { id: 'formal-methods-overview--history', title: 'History (Hoare, Dijkstra, Floyd, Lamport)', parentId: 'formal-methods-overview' },
  { id: 'formal-methods-overview--why-formal-methods', title: 'Why Formal Methods?', parentId: 'formal-methods-overview' },
  { id: 'formal-methods-overview--when-to-use-fm', title: 'When to Use Formal Methods', parentId: 'formal-methods-overview' },
  { id: 'formal-methods-overview--lightweight-vs-heavyweight-fm', title: 'Lightweight vs Heavyweight Formal Methods', parentId: 'formal-methods-overview' },
  { id: 'formal-methods-overview--success-stories', title: 'Success Stories (AWS, Intel, Airbus, seL4)', parentId: 'formal-methods-overview' },
  { id: 'formal-methods-overview--criticisms-and-limits', title: 'Criticisms & Limits', parentId: 'formal-methods-overview' },

  /* ---- formal-specification ---- */
  { id: 'formal-specification--what-is-formal-spec', title: 'What Is a Formal Specification?', parentId: 'formal-specification' },
  { id: 'formal-specification--algebraic-specification', title: 'Algebraic Specification', parentId: 'formal-specification' },
  { id: 'formal-specification--model-based-specification', title: 'Model-Based Specification', parentId: 'formal-specification' },
  { id: 'formal-specification--axiomatic-specification', title: 'Axiomatic Specification', parentId: 'formal-specification' },
  { id: 'formal-specification--operational-specification', title: 'Operational Specification', parentId: 'formal-specification' },
  { id: 'formal-specification--temporal-specification', title: 'Temporal Specification (LTL, CTL)', parentId: 'formal-specification' },
  { id: 'formal-specification--refinement', title: 'Refinement & Stepwise Development', parentId: 'formal-specification' },
  { id: 'formal-specification--design-by-contract-fm', title: 'Design by Contract (FM Lens)', parentId: 'formal-specification' },

  /* ---- z-notation ---- */
  { id: 'z-notation--history-spivey', title: 'History (Spivey, Oxford)', parentId: 'z-notation' },
  { id: 'z-notation--schemas', title: 'Schemas', parentId: 'z-notation' },
  { id: 'z-notation--state-and-operations', title: 'State & Operations', parentId: 'z-notation' },
  { id: 'z-notation--invariants-and-preconditions', title: 'Invariants & Preconditions', parentId: 'z-notation' },
  { id: 'z-notation--schema-calculus', title: 'Schema Calculus', parentId: 'z-notation' },
  { id: 'z-notation--object-z', title: 'Object-Z', parentId: 'z-notation' },
  { id: 'z-notation--circus', title: 'Circus (Z + CSP)', parentId: 'z-notation' },
  { id: 'z-notation--tools', title: 'Z Tools (CZT, Z/EVES, ProofPower)', parentId: 'z-notation' },

  /* ---- vdm-method ---- */
  { id: 'vdm-method--history-vienna', title: 'Vienna History (IBM)', parentId: 'vdm-method' },
  { id: 'vdm-method--vdm-sl', title: 'VDM-SL Specification Language', parentId: 'vdm-method' },
  { id: 'vdm-method--vdmpp', title: 'VDM++ (Object-Oriented)', parentId: 'vdm-method' },
  { id: 'vdm-method--vdm-rt', title: 'VDM-RT (Real-Time)', parentId: 'vdm-method' },
  { id: 'vdm-method--operations-and-functions', title: 'Operations & Functions', parentId: 'vdm-method' },
  { id: 'vdm-method--data-types-and-invariants', title: 'Data Types & Invariants', parentId: 'vdm-method' },
  { id: 'vdm-method--vdm-tools', title: 'VDM Tools (Overture, VDMTools)', parentId: 'vdm-method' },

  /* ---- b-method ---- */
  { id: 'b-method--abrial-history', title: 'Abrial History', parentId: 'b-method' },
  { id: 'b-method--abstract-machines', title: 'Abstract Machines', parentId: 'b-method' },
  { id: 'b-method--substitutions', title: 'Generalized Substitutions', parentId: 'b-method' },
  { id: 'b-method--refinement-b', title: 'Refinement in B', parentId: 'b-method' },
  { id: 'b-method--proof-obligations', title: 'Proof Obligations', parentId: 'b-method' },
  { id: 'b-method--event-b', title: 'Event-B', parentId: 'b-method' },
  { id: 'b-method--rodin-platform', title: 'Rodin Platform', parentId: 'b-method' },
  { id: 'b-method--paris-metro-and-rail-applications', title: 'Paris Metro & Rail Applications', parentId: 'b-method' },

  /* ---- alloy-language ---- */
  { id: 'alloy-language--jackson-history', title: 'Daniel Jackson History', parentId: 'alloy-language' },
  { id: 'alloy-language--first-order-relational-logic', title: 'First-Order Relational Logic', parentId: 'alloy-language' },
  { id: 'alloy-language--signatures-and-fields', title: 'Signatures & Fields', parentId: 'alloy-language' },
  { id: 'alloy-language--facts-predicates-functions', title: 'Facts, Predicates & Functions', parentId: 'alloy-language' },
  { id: 'alloy-language--analyzer', title: 'Alloy Analyzer (Bounded Model Finding)', parentId: 'alloy-language' },
  { id: 'alloy-language--alloy-6-temporal', title: 'Alloy 6 Temporal Logic', parentId: 'alloy-language' },
  { id: 'alloy-language--software-abstractions-book', title: '"Software Abstractions" Book', parentId: 'alloy-language' },

  /* ---- tla-plus ---- */
  { id: 'tla-plus--lamport-tla', title: 'Lamport & TLA', parentId: 'tla-plus' },
  { id: 'tla-plus--tla-plus-language', title: 'TLA+ Language', parentId: 'tla-plus' },
  { id: 'tla-plus--pluscal', title: 'PlusCal Algorithm Language', parentId: 'tla-plus' },
  { id: 'tla-plus--tlc-model-checker', title: 'TLC Model Checker', parentId: 'tla-plus' },
  { id: 'tla-plus--apalache', title: 'Apalache Symbolic Checker', parentId: 'tla-plus' },
  { id: 'tla-plus--tla-toolbox', title: 'TLA Toolbox & VS Code Plugin', parentId: 'tla-plus' },
  { id: 'tla-plus--invariants-and-properties', title: 'Invariants & Temporal Properties', parentId: 'tla-plus' },
  { id: 'tla-plus--refinement-mappings', title: 'Refinement Mappings', parentId: 'tla-plus' },
  { id: 'tla-plus--aws-use-cases', title: 'AWS Use Cases (Newcombe et al.)', parentId: 'tla-plus' },
  { id: 'tla-plus--azure-cosmos-tla', title: 'Azure Cosmos DB TLA+ Specs', parentId: 'tla-plus' },

  /* ---- model-checking ---- */
  { id: 'model-checking--clarke-emerson-sifakis', title: 'Clarke-Emerson-Sifakis (Turing Award)', parentId: 'model-checking' },
  { id: 'model-checking--state-space-exploration', title: 'State-Space Exploration', parentId: 'model-checking' },
  { id: 'model-checking--explicit-state-mc', title: 'Explicit-State Model Checking', parentId: 'model-checking' },
  { id: 'model-checking--symbolic-mc-bdd', title: 'Symbolic Model Checking (BDDs)', parentId: 'model-checking' },
  { id: 'model-checking--bounded-mc-sat', title: 'Bounded Model Checking (SAT)', parentId: 'model-checking' },
  { id: 'model-checking--smt-based-mc', title: 'SMT-Based Model Checking', parentId: 'model-checking' },
  { id: 'model-checking--state-space-explosion', title: 'State-Space Explosion Problem', parentId: 'model-checking' },
  { id: 'model-checking--abstraction-and-cegar', title: 'Abstraction & CEGAR', parentId: 'model-checking' },
  { id: 'model-checking--tools-spin-nusmv-cbmc', title: 'Tools (Spin, NuSMV, CBMC, JPF)', parentId: 'model-checking' },
  { id: 'model-checking--probabilistic-model-checking-prism', title: 'Probabilistic Model Checking (PRISM)', parentId: 'model-checking' },

  /* ---- theorem-proving ---- */
  { id: 'theorem-proving--proof-assistants', title: 'Proof Assistants Overview', parentId: 'theorem-proving' },
  { id: 'theorem-proving--coq-rocq', title: 'Coq / Rocq (2025–2026)', parentId: 'theorem-proving' },
  { id: 'theorem-proving--isabelle-hol', title: 'Isabelle/HOL', parentId: 'theorem-proving' },
  { id: 'theorem-proving--lean4', title: 'Lean 4 & mathlib', parentId: 'theorem-proving' },
  { id: 'theorem-proving--agda', title: 'Agda', parentId: 'theorem-proving' },
  { id: 'theorem-proving--idris', title: 'Idris', parentId: 'theorem-proving' },
  { id: 'theorem-proving--f-star', title: 'F*', parentId: 'theorem-proving' },
  { id: 'theorem-proving--acl2', title: 'ACL2', parentId: 'theorem-proving' },
  { id: 'theorem-proving--curry-howard', title: 'Curry-Howard Correspondence', parentId: 'theorem-proving' },
  { id: 'theorem-proving--sel4-verified-kernel', title: 'seL4 Verified Microkernel', parentId: 'theorem-proving' },
  { id: 'theorem-proving--compcert-verified-compiler', title: 'CompCert Verified Compiler', parentId: 'theorem-proving' },
  { id: 'theorem-proving--ai-aided-theorem-proving-2026', title: 'AI-Aided Theorem Proving (2026)', parentId: 'theorem-proving' },

  /* ---- abstract-interpretation ---- */
  { id: 'abstract-interpretation--cousot-history', title: 'Cousot History (1977)', parentId: 'abstract-interpretation' },
  { id: 'abstract-interpretation--abstract-domains', title: 'Abstract Domains (Intervals, Polyhedra, Octagons)', parentId: 'abstract-interpretation' },
  { id: 'abstract-interpretation--galois-connections', title: 'Galois Connections', parentId: 'abstract-interpretation' },
  { id: 'abstract-interpretation--soundness-and-completeness', title: 'Soundness & Completeness', parentId: 'abstract-interpretation' },
  { id: 'abstract-interpretation--widening-narrowing', title: 'Widening & Narrowing', parentId: 'abstract-interpretation' },
  { id: 'abstract-interpretation--tools-astree-infer', title: 'Tools (Astrée, Infer, Polyspace)', parentId: 'abstract-interpretation' },

  /* ---- runtime-verification ---- */
  { id: 'runtime-verification--definition', title: 'Definition of Runtime Verification', parentId: 'runtime-verification' },
  { id: 'runtime-verification--monitors-and-instrumentation', title: 'Monitors & Instrumentation', parentId: 'runtime-verification' },
  { id: 'runtime-verification--ltl-monitors', title: 'LTL Monitors', parentId: 'runtime-verification' },
  { id: 'runtime-verification--regex-and-temporal-monitors', title: 'Regex & Temporal Monitors', parentId: 'runtime-verification' },
  { id: 'runtime-verification--runtime-assurance', title: 'Runtime Assurance / Safety Cages', parentId: 'runtime-verification' },
  { id: 'runtime-verification--tools-mop-jpf-trace', title: 'Tools (Java-MOP, RV-Match, Trace)', parentId: 'runtime-verification' },

  /* ---- type-driven-design ---- */
  { id: 'type-driven-design--make-illegal-states-unrepresentable', title: '"Make Illegal States Unrepresentable" (Yaron Minsky)', parentId: 'type-driven-design' },
  { id: 'type-driven-design--algebraic-data-types', title: 'Algebraic Data Types', parentId: 'type-driven-design' },
  { id: 'type-driven-design--newtypes-and-phantom-types', title: 'Newtypes & Phantom Types', parentId: 'type-driven-design' },
  { id: 'type-driven-design--refinement-types', title: 'Refinement Types (LiquidHaskell)', parentId: 'type-driven-design' },
  { id: 'type-driven-design--dependent-types', title: 'Dependent Types (Idris, Agda, Lean)', parentId: 'type-driven-design' },
  { id: 'type-driven-design--session-types', title: 'Session Types', parentId: 'type-driven-design' },
  { id: 'type-driven-design--effect-systems', title: 'Effect Systems', parentId: 'type-driven-design' },
  { id: 'type-driven-design--types-as-documentation', title: 'Types as Documentation', parentId: 'type-driven-design' },

  /* ============================================================
   * STAGE 30 — Empirical Software Engineering
   * ============================================================ */

  /* ---- empirical-se-fundamentals ---- */
  { id: 'empirical-se-fundamentals--what-is-empirical-se', title: 'What Is Empirical SE?', parentId: 'empirical-se-fundamentals' },
  { id: 'empirical-se-fundamentals--why-empirical-se', title: 'Why Empirical SE?', parentId: 'empirical-se-fundamentals' },
  { id: 'empirical-se-fundamentals--validity-types', title: 'Validity Types (Internal, External, Construct, Conclusion)', parentId: 'empirical-se-fundamentals' },
  { id: 'empirical-se-fundamentals--threats-to-validity', title: 'Threats to Validity', parentId: 'empirical-se-fundamentals' },
  { id: 'empirical-se-fundamentals--ese-journal-emse', title: 'EMSE Journal & ESEM Conference', parentId: 'empirical-se-fundamentals' },
  { id: 'empirical-se-fundamentals--basili-perspective', title: 'Basili Perspective on Empirical SE', parentId: 'empirical-se-fundamentals' },
  { id: 'empirical-se-fundamentals--ai-driven-empirical-se-2026', title: 'AI-Driven Empirical SE Research (2026)', parentId: 'empirical-se-fundamentals' },

  /* ---- evidence-based-se ---- */
  { id: 'evidence-based-se--kitchenham-ebse', title: 'Kitchenham EBSE Manifesto', parentId: 'evidence-based-se' },
  { id: 'evidence-based-se--evidence-hierarchy', title: 'Evidence Hierarchy', parentId: 'evidence-based-se' },
  { id: 'evidence-based-se--practitioner-vs-researcher', title: 'Practitioner vs Researcher Gap', parentId: 'evidence-based-se' },
  { id: 'evidence-based-se--decision-making-with-evidence', title: 'Decision-Making With Evidence', parentId: 'evidence-based-se' },
  { id: 'evidence-based-se--accelerate-as-evidence', title: '"Accelerate" Book as Evidence Source', parentId: 'evidence-based-se' },
  { id: 'evidence-based-se--evidence-deficits', title: 'Common Evidence Deficits in SE', parentId: 'evidence-based-se' },

  /* ---- controlled-experiments-se ---- */
  { id: 'controlled-experiments-se--experiment-design', title: 'Experiment Design', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--independent-and-dependent-vars', title: 'Independent & Dependent Variables', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--randomization-and-blocking', title: 'Randomization & Blocking', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--within-vs-between-subjects', title: 'Within-Subjects vs Between-Subjects', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--quasi-experiments', title: 'Quasi-Experiments', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--statistical-tests', title: 'Statistical Tests (t-test, Wilcoxon, ANOVA)', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--effect-size', title: 'Effect Size (Cohen’s d, Cliff’s δ)', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--statistical-power', title: 'Statistical Power', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--reproducibility-package', title: 'Reproducibility Package', parentId: 'controlled-experiments-se' },
  { id: 'controlled-experiments-se--experiments-with-developers', title: 'Experiments With Developers (Ethics)', parentId: 'controlled-experiments-se' },

  /* ---- case-study-research-se ---- */
  { id: 'case-study-research-se--yin-method', title: 'Yin Method', parentId: 'case-study-research-se' },
  { id: 'case-study-research-se--runeson-host-method', title: 'Runeson & Höst SE Method', parentId: 'case-study-research-se' },
  { id: 'case-study-research-se--single-vs-multiple-case', title: 'Single vs Multiple Case Studies', parentId: 'case-study-research-se' },
  { id: 'case-study-research-se--exploratory-vs-explanatory', title: 'Exploratory vs Explanatory Case Studies', parentId: 'case-study-research-se' },
  { id: 'case-study-research-se--data-collection', title: 'Data Collection (Interviews, Observation, Docs)', parentId: 'case-study-research-se' },
  { id: 'case-study-research-se--analysis-techniques', title: 'Analysis Techniques (Pattern Matching, Explanation Building)', parentId: 'case-study-research-se' },
  { id: 'case-study-research-se--triangulation', title: 'Triangulation', parentId: 'case-study-research-se' },

  /* ---- mining-software-repositories ---- */
  { id: 'mining-software-repositories--what-is-msr', title: 'What Is MSR?', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--msr-conference', title: 'MSR Conference', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--git-mining', title: 'Mining Git Repositories', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--issue-tracker-mining', title: 'Issue Tracker Mining', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--pr-and-review-mining', title: 'PR & Code Review Mining', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--bug-localization', title: 'Bug Localization', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--defect-prediction', title: 'Defect Prediction', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--ghtorrent-and-bigquery', title: 'GHTorrent & BigQuery on GitHub', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--world-of-code', title: 'World of Code', parentId: 'mining-software-repositories' },
  { id: 'mining-software-repositories--ai-msr-2026', title: 'LLM-Based MSR (2026)', parentId: 'mining-software-repositories' },

  /* ---- systematic-literature-reviews ---- */
  { id: 'systematic-literature-reviews--kitchenham-guidelines', title: 'Kitchenham SLR Guidelines', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--planning-phase', title: 'Planning Phase', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--research-questions', title: 'Research Questions Definition', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--search-strategy', title: 'Search Strategy', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--inclusion-exclusion-criteria', title: 'Inclusion / Exclusion Criteria', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--quality-assessment', title: 'Quality Assessment', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--data-extraction', title: 'Data Extraction', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--data-synthesis', title: 'Data Synthesis', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--mapping-studies', title: 'Systematic Mapping Studies', parentId: 'systematic-literature-reviews' },
  { id: 'systematic-literature-reviews--prisma-flow', title: 'PRISMA Flow Diagram', parentId: 'systematic-literature-reviews' },

  /* ---- meta-analysis-se ---- */
  { id: 'meta-analysis-se--what-is-meta-analysis', title: 'What Is Meta-Analysis?', parentId: 'meta-analysis-se' },
  { id: 'meta-analysis-se--effect-size-aggregation', title: 'Effect Size Aggregation', parentId: 'meta-analysis-se' },
  { id: 'meta-analysis-se--fixed-vs-random-effects', title: 'Fixed vs Random Effects Models', parentId: 'meta-analysis-se' },
  { id: 'meta-analysis-se--forest-and-funnel-plots', title: 'Forest & Funnel Plots', parentId: 'meta-analysis-se' },
  { id: 'meta-analysis-se--heterogeneity', title: 'Heterogeneity Analysis', parentId: 'meta-analysis-se' },
  { id: 'meta-analysis-se--publication-bias', title: 'Publication Bias', parentId: 'meta-analysis-se' },

  /* ---- se-research-methods ---- */
  { id: 'se-research-methods--quantitative-methods', title: 'Quantitative Methods', parentId: 'se-research-methods' },
  { id: 'se-research-methods--qualitative-methods', title: 'Qualitative Methods', parentId: 'se-research-methods' },
  { id: 'se-research-methods--mixed-methods', title: 'Mixed Methods', parentId: 'se-research-methods' },
  { id: 'se-research-methods--design-science-research', title: 'Design Science Research', parentId: 'se-research-methods' },
  { id: 'se-research-methods--action-research', title: 'Action Research', parentId: 'se-research-methods' },
  { id: 'se-research-methods--grounded-theory', title: 'Grounded Theory', parentId: 'se-research-methods' },
  { id: 'se-research-methods--ethnography-in-se', title: 'Ethnography in SE', parentId: 'se-research-methods' },
  { id: 'se-research-methods--surveys-in-se', title: 'Surveys & Questionnaires', parentId: 'se-research-methods' },
  { id: 'se-research-methods--interviews-in-se', title: 'Interviews in SE Research', parentId: 'se-research-methods' },
  { id: 'se-research-methods--research-ethics', title: 'Research Ethics & IRB', parentId: 'se-research-methods' },

  /* ============================================================
   * STAGE 31 — Software Engineering Economics
   * ============================================================ */

  /* ---- software-economics-fundamentals ---- */
  { id: 'software-economics-fundamentals--boehm-1981-book', title: 'Boehm "Software Engineering Economics" (1981)', parentId: 'software-economics-fundamentals' },
  { id: 'software-economics-fundamentals--engineering-economics-basics', title: 'Engineering Economics Basics', parentId: 'software-economics-fundamentals' },
  { id: 'software-economics-fundamentals--time-value-of-money', title: 'Time Value of Money', parentId: 'software-economics-fundamentals' },
  { id: 'software-economics-fundamentals--npv-irr-payback', title: 'NPV, IRR & Payback Period', parentId: 'software-economics-fundamentals' },
  { id: 'software-economics-fundamentals--opportunity-cost', title: 'Opportunity Cost', parentId: 'software-economics-fundamentals' },
  { id: 'software-economics-fundamentals--sunk-cost-fallacy', title: 'Sunk Cost Fallacy', parentId: 'software-economics-fundamentals' },
  { id: 'software-economics-fundamentals--real-options-thinking', title: 'Real-Options Thinking', parentId: 'software-economics-fundamentals' },
  { id: 'software-economics-fundamentals--swebok-economics-ka', title: 'SWEBOK Engineering Economics KA', parentId: 'software-economics-fundamentals' },

  /* ---- cost-benefit-analysis ---- */
  { id: 'cost-benefit-analysis--what-is-cba', title: 'What Is CBA?', parentId: 'cost-benefit-analysis' },
  { id: 'cost-benefit-analysis--identifying-costs', title: 'Identifying Costs', parentId: 'cost-benefit-analysis' },
  { id: 'cost-benefit-analysis--identifying-benefits', title: 'Identifying Benefits', parentId: 'cost-benefit-analysis' },
  { id: 'cost-benefit-analysis--quantifying-intangibles', title: 'Quantifying Intangibles', parentId: 'cost-benefit-analysis' },
  { id: 'cost-benefit-analysis--discounting-cash-flows', title: 'Discounting Cash Flows', parentId: 'cost-benefit-analysis' },
  { id: 'cost-benefit-analysis--benefit-cost-ratio', title: 'Benefit-Cost Ratio (BCR)', parentId: 'cost-benefit-analysis' },
  { id: 'cost-benefit-analysis--sensitivity-analysis-cba', title: 'Sensitivity Analysis', parentId: 'cost-benefit-analysis' },
  { id: 'cost-benefit-analysis--cba-anti-patterns', title: 'CBA Anti-Patterns', parentId: 'cost-benefit-analysis' },

  /* ---- total-cost-of-ownership ---- */
  { id: 'total-cost-of-ownership--what-is-tco', title: 'What Is TCO?', parentId: 'total-cost-of-ownership' },
  { id: 'total-cost-of-ownership--acquisition-cost', title: 'Acquisition Cost', parentId: 'total-cost-of-ownership' },
  { id: 'total-cost-of-ownership--operating-cost', title: 'Operating Cost', parentId: 'total-cost-of-ownership' },
  { id: 'total-cost-of-ownership--maintenance-cost', title: 'Maintenance Cost', parentId: 'total-cost-of-ownership' },
  { id: 'total-cost-of-ownership--training-and-support-cost', title: 'Training & Support Cost', parentId: 'total-cost-of-ownership' },
  { id: 'total-cost-of-ownership--retirement-cost', title: 'Retirement Cost', parentId: 'total-cost-of-ownership' },
  { id: 'total-cost-of-ownership--hidden-costs', title: 'Hidden Costs', parentId: 'total-cost-of-ownership' },
  { id: 'total-cost-of-ownership--tco-vs-tvo', title: 'TCO vs Total Value of Ownership (TVO)', parentId: 'total-cost-of-ownership' },

  /* ---- build-vs-buy-decisions ---- */
  { id: 'build-vs-buy-decisions--decision-framework', title: 'Decision Framework', parentId: 'build-vs-buy-decisions' },
  { id: 'build-vs-buy-decisions--core-vs-context', title: 'Core vs Context (Moore)', parentId: 'build-vs-buy-decisions' },
  { id: 'build-vs-buy-decisions--differentiator-vs-commodity', title: 'Differentiator vs Commodity', parentId: 'build-vs-buy-decisions' },
  { id: 'build-vs-buy-decisions--build-pros-cons', title: 'Build: Pros & Cons', parentId: 'build-vs-buy-decisions' },
  { id: 'build-vs-buy-decisions--buy-pros-cons', title: 'Buy: Pros & Cons', parentId: 'build-vs-buy-decisions' },
  { id: 'build-vs-buy-decisions--adopt-oss-pros-cons', title: 'Adopt OSS: Pros & Cons', parentId: 'build-vs-buy-decisions' },
  { id: 'build-vs-buy-decisions--vendor-lock-in', title: 'Vendor Lock-In Considerations', parentId: 'build-vs-buy-decisions' },
  { id: 'build-vs-buy-decisions--build-vs-buy-anti-patterns', title: 'Build-vs-Buy Anti-Patterns', parentId: 'build-vs-buy-decisions' },

  /* ---- vendor-evaluation ---- */
  { id: 'vendor-evaluation--rfi', title: 'Request for Information (RFI)', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--rfp', title: 'Request for Proposal (RFP)', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--rfq', title: 'Request for Quote (RFQ)', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--scoring-matrix', title: 'Vendor Scoring Matrix', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--proof-of-concept', title: 'Proof-of-Concept (POC)', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--reference-checks', title: 'Reference Checks', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--security-and-compliance-review', title: 'Security & Compliance Review', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--vendor-financial-health', title: 'Vendor Financial Health Review', parentId: 'vendor-evaluation' },
  { id: 'vendor-evaluation--exit-strategy', title: 'Exit Strategy & Data Portability', parentId: 'vendor-evaluation' },

  /* ---- saas-vs-self-hosted ---- */
  { id: 'saas-vs-self-hosted--saas-overview', title: 'SaaS Model Overview', parentId: 'saas-vs-self-hosted' },
  { id: 'saas-vs-self-hosted--self-hosted-overview', title: 'Self-Hosted Overview', parentId: 'saas-vs-self-hosted' },
  { id: 'saas-vs-self-hosted--bring-your-own-cloud', title: 'Bring-Your-Own-Cloud (BYOC)', parentId: 'saas-vs-self-hosted' },
  { id: 'saas-vs-self-hosted--cost-comparison', title: 'Cost Comparison', parentId: 'saas-vs-self-hosted' },
  { id: 'saas-vs-self-hosted--security-and-data-residency', title: 'Security & Data Residency', parentId: 'saas-vs-self-hosted' },
  { id: 'saas-vs-self-hosted--operational-burden', title: 'Operational Burden', parentId: 'saas-vs-self-hosted' },
  { id: 'saas-vs-self-hosted--upgrade-cadence', title: 'Upgrade Cadence', parentId: 'saas-vs-self-hosted' },
  { id: 'saas-vs-self-hosted--exit-cost', title: 'Exit Cost & Lock-In', parentId: 'saas-vs-self-hosted' },

  /* ---- pricing-models-engineering ---- */
  { id: 'pricing-models-engineering--per-seat-pricing', title: 'Per-Seat Pricing', parentId: 'pricing-models-engineering' },
  { id: 'pricing-models-engineering--usage-based-pricing', title: 'Usage-Based Pricing', parentId: 'pricing-models-engineering' },
  { id: 'pricing-models-engineering--tiered-pricing', title: 'Tiered Pricing', parentId: 'pricing-models-engineering' },
  { id: 'pricing-models-engineering--freemium', title: 'Freemium', parentId: 'pricing-models-engineering' },
  { id: 'pricing-models-engineering--open-core', title: 'Open Core', parentId: 'pricing-models-engineering' },
  { id: 'pricing-models-engineering--token-based-ai-pricing-2026', title: 'Token-Based AI Pricing (2026)', parentId: 'pricing-models-engineering' },
  { id: 'pricing-models-engineering--outcome-based-pricing', title: 'Outcome-Based Pricing', parentId: 'pricing-models-engineering' },
  { id: 'pricing-models-engineering--engineering-implications', title: 'Engineering Implications of Pricing', parentId: 'pricing-models-engineering' },

  /* ---- value-engineering ---- */
  { id: 'value-engineering--what-is-value-engineering', title: 'What Is Value Engineering?', parentId: 'value-engineering' },
  { id: 'value-engineering--value-vs-cost', title: 'Value vs Cost', parentId: 'value-engineering' },
  { id: 'value-engineering--mvp-and-mvf', title: 'MVP & Minimum Viable Feature', parentId: 'value-engineering' },
  { id: 'value-engineering--cost-of-delay', title: 'Cost of Delay', parentId: 'value-engineering' },
  { id: 'value-engineering--wsjf-economics', title: 'WSJF (Economics View)', parentId: 'value-engineering' },
  { id: 'value-engineering--feature-value-experiments', title: 'Feature Value Experiments', parentId: 'value-engineering' },
  { id: 'value-engineering--de-risking-via-spikes', title: 'De-Risking via Spikes', parentId: 'value-engineering' },
])
