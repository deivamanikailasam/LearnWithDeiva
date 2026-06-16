/**
 * Part 6: subtopics + sub-subtopics for stages 14-16
 *   14. Software Quality Assurance
 *   15. Code Quality, Refactoring & Technical Debt
 *   16. Software Maintenance & Evolution
 *
 * Run with: node scripts/software-engineering/part6-stages-14-16.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 14 — Software Quality Assurance
   * ============================================================ */

  /* ---- sqa-fundamentals ---- */
  { id: 'sqa-fundamentals--definition', title: 'SQA Definition', parentId: 'sqa-fundamentals' },
  { id: 'sqa-fundamentals--qa-vs-qc-vs-testing', title: 'QA vs QC vs Testing', parentId: 'sqa-fundamentals' },
  { id: 'sqa-fundamentals--swebok-quality-ka', title: 'SWEBOK Quality KA', parentId: 'sqa-fundamentals' },
  { id: 'sqa-fundamentals--ieee-730', title: 'IEEE 730 SQA Plans', parentId: 'sqa-fundamentals' },
  { id: 'sqa-fundamentals--qms-overview', title: 'Quality Management System Overview', parentId: 'sqa-fundamentals' },
  { id: 'sqa-fundamentals--quality-culture', title: 'Quality Culture', parentId: 'sqa-fundamentals' },
  { id: 'sqa-fundamentals--cost-of-quality', title: 'Cost of Quality (PAF Model)', parentId: 'sqa-fundamentals' },
  { id: 'sqa-fundamentals--quality-roles', title: 'SQA Roles & Responsibilities', parentId: 'sqa-fundamentals' },

  /* ---- verification-and-validation ---- */
  { id: 'verification-and-validation--definitions', title: 'V&V Definitions (IEEE 1012)', parentId: 'verification-and-validation' },
  { id: 'verification-and-validation--right-vs-right-thing', title: 'Building It Right vs The Right Thing', parentId: 'verification-and-validation' },
  { id: 'verification-and-validation--vv-activities', title: 'V&V Activities Across SDLC', parentId: 'verification-and-validation' },
  { id: 'verification-and-validation--ieee-1012', title: 'IEEE 1012 Standard', parentId: 'verification-and-validation' },
  { id: 'verification-and-validation--iv-and-v', title: 'Independent V&V (IV&V)', parentId: 'verification-and-validation' },
  { id: 'verification-and-validation--vv-tradeoffs', title: 'V&V Trade-Offs & ROI', parentId: 'verification-and-validation' },

  /* ---- inspections-walkthroughs ---- */
  { id: 'inspections-walkthroughs--review-types', title: 'Review Types Overview', parentId: 'inspections-walkthroughs' },
  { id: 'inspections-walkthroughs--informal-reviews', title: 'Informal Reviews', parentId: 'inspections-walkthroughs' },
  { id: 'inspections-walkthroughs--walkthroughs', title: 'Walkthroughs', parentId: 'inspections-walkthroughs' },
  { id: 'inspections-walkthroughs--technical-reviews', title: 'Technical Reviews', parentId: 'inspections-walkthroughs' },
  { id: 'inspections-walkthroughs--peer-reviews', title: 'Peer Reviews', parentId: 'inspections-walkthroughs' },
  { id: 'inspections-walkthroughs--management-reviews', title: 'Management Reviews', parentId: 'inspections-walkthroughs' },
  { id: 'inspections-walkthroughs--audits', title: 'Software Audits', parentId: 'inspections-walkthroughs' },
  { id: 'inspections-walkthroughs--ieee-1028', title: 'IEEE 1028 Reviews Standard', parentId: 'inspections-walkthroughs' },

  /* ---- formal-reviews-fagan ---- */
  { id: 'formal-reviews-fagan--fagan-method', title: 'Fagan Inspection Method (1976)', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--fagan-roles', title: 'Fagan Roles (Moderator, Author, Reader, Tester)', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--planning', title: 'Planning Phase', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--overview-meeting', title: 'Overview Meeting', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--preparation', title: 'Preparation Phase', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--inspection-meeting', title: 'Inspection Meeting', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--rework', title: 'Rework Phase', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--follow-up', title: 'Follow-Up Phase', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--defect-detection-rate', title: 'Defect Detection Rate', parentId: 'formal-reviews-fagan' },
  { id: 'formal-reviews-fagan--lightweight-inspections', title: 'Lightweight Inspection Variants', parentId: 'formal-reviews-fagan' },

  /* ---- code-review-quality ---- */
  { id: 'code-review-quality--google-code-review-standards', title: 'Google Code Review Standards', parentId: 'code-review-quality' },
  { id: 'code-review-quality--microsoft-code-review-research', title: 'Microsoft Code Review Research', parentId: 'code-review-quality' },
  { id: 'code-review-quality--what-to-look-for', title: 'What to Look For', parentId: 'code-review-quality' },
  { id: 'code-review-quality--design-vs-style-vs-defects', title: 'Design vs Style vs Defects', parentId: 'code-review-quality' },
  { id: 'code-review-quality--effective-feedback', title: 'Giving Effective Feedback', parentId: 'code-review-quality' },
  { id: 'code-review-quality--receiving-feedback', title: 'Receiving Feedback', parentId: 'code-review-quality' },
  { id: 'code-review-quality--review-fatigue', title: 'Review Fatigue & Mitigations', parentId: 'code-review-quality' },
  { id: 'code-review-quality--high-leverage-reviews', title: 'High-Leverage Review Strategies', parentId: 'code-review-quality' },
  { id: 'code-review-quality--evidence-research', title: 'Evidence & Research on Code Review', parentId: 'code-review-quality' },
  { id: 'code-review-quality--ai-assisted-review-2026', title: 'AI-Assisted Code Review (2026)', parentId: 'code-review-quality' },

  /* ---- static-analysis ---- */
  { id: 'static-analysis--what-is-static-analysis', title: 'What Is Static Analysis?', parentId: 'static-analysis' },
  { id: 'static-analysis--linters', title: 'Linters (Quick View)', parentId: 'static-analysis' },
  { id: 'static-analysis--type-checkers', title: 'Type Checkers as Static Analysis', parentId: 'static-analysis' },
  { id: 'static-analysis--data-flow-analysis', title: 'Data-Flow Analysis', parentId: 'static-analysis' },
  { id: 'static-analysis--control-flow-analysis', title: 'Control-Flow Analysis', parentId: 'static-analysis' },
  { id: 'static-analysis--symbolic-execution', title: 'Symbolic Execution', parentId: 'static-analysis' },
  { id: 'static-analysis--abstract-interpretation', title: 'Abstract Interpretation (SA View)', parentId: 'static-analysis' },
  { id: 'static-analysis--sast', title: 'SAST Tools', parentId: 'static-analysis' },
  { id: 'static-analysis--sonarqube', title: 'SonarQube / SonarCloud', parentId: 'static-analysis' },
  { id: 'static-analysis--codeql', title: 'CodeQL', parentId: 'static-analysis' },
  { id: 'static-analysis--semgrep', title: 'Semgrep', parentId: 'static-analysis' },
  { id: 'static-analysis--coverity', title: 'Synopsys Coverity', parentId: 'static-analysis' },
  { id: 'static-analysis--klocwork', title: 'Klocwork', parentId: 'static-analysis' },
  { id: 'static-analysis--clang-static-analyzer', title: 'Clang Static Analyzer', parentId: 'static-analysis' },
  { id: 'static-analysis--false-positives', title: 'Dealing With False Positives', parentId: 'static-analysis' },
  { id: 'static-analysis--ai-static-analysis-2026', title: 'AI-Augmented Static Analysis (2026)', parentId: 'static-analysis' },

  /* ---- dynamic-analysis ---- */
  { id: 'dynamic-analysis--what-is-dynamic-analysis', title: 'What Is Dynamic Analysis?', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--memory-sanitizers', title: 'Memory Sanitizers (ASan, MSan, UBSan)', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--thread-sanitizers', title: 'Thread Sanitizer (TSan)', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--valgrind', title: 'Valgrind', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--profilers-da', title: 'Profilers as Dynamic Analysis', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--coverage-as-da', title: 'Coverage Tools as Dynamic Analysis', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--runtime-instrumentation', title: 'Runtime Instrumentation', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--rasp', title: 'RASP (Runtime Application Self-Protection)', parentId: 'dynamic-analysis' },
  { id: 'dynamic-analysis--combined-with-static', title: 'Combining Static & Dynamic Analysis', parentId: 'dynamic-analysis' },

  /* ---- continuous-quality ---- */
  { id: 'continuous-quality--continuous-quality-overview', title: 'Continuous Quality Overview', parentId: 'continuous-quality' },
  { id: 'continuous-quality--quality-in-ci', title: 'Quality Checks in CI', parentId: 'continuous-quality' },
  { id: 'continuous-quality--quality-in-pr-review', title: 'Quality Checks at PR Review', parentId: 'continuous-quality' },
  { id: 'continuous-quality--quality-in-prod', title: 'Quality in Production (Telemetry)', parentId: 'continuous-quality' },
  { id: 'continuous-quality--quality-feedback-loops', title: 'Quality Feedback Loops', parentId: 'continuous-quality' },
  { id: 'continuous-quality--shift-left-quality', title: 'Shift-Left Quality', parentId: 'continuous-quality' },
  { id: 'continuous-quality--shift-right-quality', title: 'Shift-Right Quality', parentId: 'continuous-quality' },

  /* ---- quality-gates ---- */
  { id: 'quality-gates--what-are-quality-gates', title: 'What Are Quality Gates?', parentId: 'quality-gates' },
  { id: 'quality-gates--coverage-gates', title: 'Coverage Gates', parentId: 'quality-gates' },
  { id: 'quality-gates--static-analysis-gates', title: 'Static Analysis Gates', parentId: 'quality-gates' },
  { id: 'quality-gates--security-gates', title: 'Security Gates', parentId: 'quality-gates' },
  { id: 'quality-gates--performance-gates', title: 'Performance Gates', parentId: 'quality-gates' },
  { id: 'quality-gates--accessibility-gates', title: 'Accessibility Gates', parentId: 'quality-gates' },
  { id: 'quality-gates--license-compliance-gates', title: 'License-Compliance Gates', parentId: 'quality-gates' },
  { id: 'quality-gates--quality-gate-anti-patterns', title: 'Quality Gate Anti-Patterns', parentId: 'quality-gates' },

  /* ============================================================
   * STAGE 15 — Code Quality, Refactoring & Technical Debt
   * ============================================================ */

  /* ---- clean-code-principles ---- */
  { id: 'clean-code-principles--martin-clean-code', title: 'Clean Code (Martin)', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--clean-code-rules', title: 'Clean Code Rules', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--meaningful-names', title: 'Meaningful Names', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--small-functions', title: 'Small Functions', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--functions-do-one-thing', title: 'Functions Should Do One Thing', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--minimal-arguments', title: 'Minimize Function Arguments', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--no-side-effects', title: 'Avoid Side Effects', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--comments-as-failure', title: 'Comments as Failure of Code', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--newspaper-code-structure', title: 'Newspaper Code Structure', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--clean-code-criticisms', title: 'Clean Code Criticisms (DHH et al.)', parentId: 'clean-code-principles' },
  { id: 'clean-code-principles--a-philosophy-of-software-design', title: 'A Philosophy of Software Design (Ousterhout)', parentId: 'clean-code-principles' },

  /* ---- code-smells-catalog ---- */
  { id: 'code-smells-catalog--bloaters', title: 'Bloaters', parentId: 'code-smells-catalog',
    children: [
      { id: 'long-method', title: 'Long Method' },
      { id: 'large-class', title: 'Large Class' },
      { id: 'primitive-obsession-smell', title: 'Primitive Obsession' },
      { id: 'long-parameter-list', title: 'Long Parameter List' },
      { id: 'data-clumps-smell', title: 'Data Clumps' },
    ],
  },
  { id: 'code-smells-catalog--oo-abusers', title: 'Object-Orientation Abusers', parentId: 'code-smells-catalog',
    children: [
      { id: 'switch-statements', title: 'Switch Statements' },
      { id: 'temporary-field', title: 'Temporary Field' },
      { id: 'refused-bequest', title: 'Refused Bequest' },
      { id: 'alternative-classes-different-interfaces', title: 'Alternative Classes With Different Interfaces' },
    ],
  },
  { id: 'code-smells-catalog--change-preventers', title: 'Change Preventers', parentId: 'code-smells-catalog',
    children: [
      { id: 'divergent-change', title: 'Divergent Change' },
      { id: 'shotgun-surgery-smell', title: 'Shotgun Surgery' },
      { id: 'parallel-inheritance-hierarchies', title: 'Parallel Inheritance Hierarchies' },
    ],
  },
  { id: 'code-smells-catalog--dispensables', title: 'Dispensables', parentId: 'code-smells-catalog',
    children: [
      { id: 'comments-smell', title: 'Comments (as a Smell)' },
      { id: 'duplicate-code', title: 'Duplicate Code' },
      { id: 'lazy-class', title: 'Lazy Class' },
      { id: 'data-class', title: 'Data Class' },
      { id: 'dead-code', title: 'Dead Code' },
      { id: 'speculative-generality', title: 'Speculative Generality' },
    ],
  },
  { id: 'code-smells-catalog--couplers', title: 'Couplers', parentId: 'code-smells-catalog',
    children: [
      { id: 'feature-envy-smell', title: 'Feature Envy' },
      { id: 'inappropriate-intimacy', title: 'Inappropriate Intimacy' },
      { id: 'message-chains', title: 'Message Chains' },
      { id: 'middle-man', title: 'Middle Man' },
    ],
  },
  { id: 'code-smells-catalog--ai-generated-smells-2026', title: 'AI-Generated Code Smells (2026)', parentId: 'code-smells-catalog' },

  /* ---- refactoring-fundamentals ---- */
  { id: 'refactoring-fundamentals--definition', title: 'Definition (Fowler)', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--small-steps', title: 'Small-Steps Discipline', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--two-hats-rule', title: 'Two Hats Rule', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--green-bar-discipline', title: 'Green-Bar Discipline (Tests Always Pass)', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--when-to-refactor', title: 'When to Refactor', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--when-not-to-refactor', title: 'When NOT to Refactor', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--rule-of-three-refactor', title: 'Rule of Three (Refactor View)', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--refactoring-vs-rewrite', title: 'Refactoring vs Rewrite', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--mikado-method', title: 'Mikado Method', parentId: 'refactoring-fundamentals' },
  { id: 'refactoring-fundamentals--ai-refactoring-2026', title: 'AI-Assisted Refactoring (2026)', parentId: 'refactoring-fundamentals' },

  /* ---- refactoring-catalog ---- */
  { id: 'refactoring-catalog--composing-methods', title: 'Composing Methods', parentId: 'refactoring-catalog',
    children: [
      { id: 'extract-method', title: 'Extract Method / Function' },
      { id: 'inline-method', title: 'Inline Method' },
      { id: 'extract-variable', title: 'Extract Variable' },
      { id: 'inline-variable', title: 'Inline Variable' },
      { id: 'replace-temp-with-query', title: 'Replace Temp With Query' },
      { id: 'split-temporary-variable', title: 'Split Temporary Variable' },
      { id: 'remove-assignments-to-parameters', title: 'Remove Assignments to Parameters' },
    ],
  },
  { id: 'refactoring-catalog--moving-features', title: 'Moving Features Between Objects', parentId: 'refactoring-catalog',
    children: [
      { id: 'move-method', title: 'Move Method' },
      { id: 'move-field', title: 'Move Field' },
      { id: 'extract-class', title: 'Extract Class' },
      { id: 'inline-class', title: 'Inline Class' },
      { id: 'hide-delegate', title: 'Hide Delegate' },
      { id: 'remove-middle-man', title: 'Remove Middle Man' },
    ],
  },
  { id: 'refactoring-catalog--organizing-data', title: 'Organizing Data', parentId: 'refactoring-catalog',
    children: [
      { id: 'replace-magic-number-with-constant', title: 'Replace Magic Number With Constant' },
      { id: 'encapsulate-field', title: 'Encapsulate Field' },
      { id: 'replace-data-value-with-object', title: 'Replace Data Value With Object' },
      { id: 'replace-array-with-object', title: 'Replace Array With Object' },
      { id: 'change-value-to-reference', title: 'Change Value to Reference' },
      { id: 'change-reference-to-value', title: 'Change Reference to Value' },
    ],
  },
  { id: 'refactoring-catalog--simplifying-conditionals', title: 'Simplifying Conditional Expressions', parentId: 'refactoring-catalog',
    children: [
      { id: 'decompose-conditional', title: 'Decompose Conditional' },
      { id: 'consolidate-conditional', title: 'Consolidate Conditional' },
      { id: 'replace-nested-conditional-with-guard-clauses', title: 'Replace Nested Conditional With Guard Clauses' },
      { id: 'replace-conditional-with-polymorphism', title: 'Replace Conditional With Polymorphism' },
      { id: 'introduce-null-object', title: 'Introduce Null Object' },
    ],
  },
  { id: 'refactoring-catalog--simplifying-method-calls', title: 'Simplifying Method Calls', parentId: 'refactoring-catalog',
    children: [
      { id: 'rename-method', title: 'Rename Method / Function' },
      { id: 'add-parameter', title: 'Add Parameter' },
      { id: 'remove-parameter', title: 'Remove Parameter' },
      { id: 'separate-query-from-modifier', title: 'Separate Query From Modifier' },
      { id: 'parameterize-method', title: 'Parameterize Method' },
      { id: 'preserve-whole-object', title: 'Preserve Whole Object' },
      { id: 'replace-parameter-with-method-call', title: 'Replace Parameter With Method Call' },
      { id: 'introduce-parameter-object', title: 'Introduce Parameter Object' },
      { id: 'remove-setting-method', title: 'Remove Setting Method' },
    ],
  },
  { id: 'refactoring-catalog--dealing-with-generalization', title: 'Dealing With Generalization', parentId: 'refactoring-catalog',
    children: [
      { id: 'pull-up-field', title: 'Pull Up Field' },
      { id: 'pull-up-method', title: 'Pull Up Method' },
      { id: 'push-down-field', title: 'Push Down Field' },
      { id: 'push-down-method', title: 'Push Down Method' },
      { id: 'extract-superclass', title: 'Extract Superclass' },
      { id: 'extract-interface', title: 'Extract Interface' },
      { id: 'replace-inheritance-with-delegation', title: 'Replace Inheritance With Delegation' },
      { id: 'replace-delegation-with-inheritance', title: 'Replace Delegation With Inheritance' },
    ],
  },

  /* ---- working-with-legacy-code ---- */
  { id: 'working-with-legacy-code--feathers-book', title: 'Feathers "Working Effectively With Legacy Code"', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--definition-legacy', title: 'Definition: Legacy = Code Without Tests', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--seams', title: 'Seams (Object, Preprocessor, Link)', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--breaking-dependencies', title: 'Breaking Dependencies', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--sprouts-and-wraps', title: 'Sprout Method / Wrap Method', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--strangler-fig', title: 'Strangler Fig Application', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--anti-corruption-layer', title: 'Anti-Corruption Layer (Legacy View)', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--legacy-onboarding', title: 'Legacy Code Onboarding', parentId: 'working-with-legacy-code' },
  { id: 'working-with-legacy-code--ai-and-legacy-2026', title: 'AI & Legacy Code (2026)', parentId: 'working-with-legacy-code' },

  /* ---- characterization-tests ---- */
  { id: 'characterization-tests--what-are-they', title: 'What Are Characterization Tests?', parentId: 'characterization-tests' },
  { id: 'characterization-tests--writing-them', title: 'Writing Characterization Tests', parentId: 'characterization-tests' },
  { id: 'characterization-tests--golden-master-link', title: 'Golden Master Connection', parentId: 'characterization-tests' },
  { id: 'characterization-tests--coverage-with-pinning', title: 'Coverage With Pinning Tests', parentId: 'characterization-tests' },
  { id: 'characterization-tests--using-with-refactoring', title: 'Using With Refactoring', parentId: 'characterization-tests' },

  /* ---- technical-debt-types ---- */
  { id: 'technical-debt-types--code-debt', title: 'Code Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--design-debt', title: 'Design Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--test-debt', title: 'Test Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--documentation-debt', title: 'Documentation Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--infrastructure-debt', title: 'Infrastructure Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--architecture-debt', title: 'Architecture Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--people-debt', title: 'People & Knowledge Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--security-debt', title: 'Security Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--data-debt', title: 'Data Debt', parentId: 'technical-debt-types' },
  { id: 'technical-debt-types--ai-debt-2026', title: 'AI-Generated Code Debt (2026)', parentId: 'technical-debt-types' },

  /* ---- technical-debt-quadrant ---- */
  { id: 'technical-debt-quadrant--fowler-quadrant', title: 'Fowler Quadrant', parentId: 'technical-debt-quadrant' },
  { id: 'technical-debt-quadrant--reckless-deliberate', title: 'Reckless & Deliberate', parentId: 'technical-debt-quadrant' },
  { id: 'technical-debt-quadrant--reckless-inadvertent', title: 'Reckless & Inadvertent', parentId: 'technical-debt-quadrant' },
  { id: 'technical-debt-quadrant--prudent-deliberate', title: 'Prudent & Deliberate', parentId: 'technical-debt-quadrant' },
  { id: 'technical-debt-quadrant--prudent-inadvertent', title: 'Prudent & Inadvertent', parentId: 'technical-debt-quadrant' },
  { id: 'technical-debt-quadrant--debt-interest-vs-principal', title: 'Debt: Interest vs Principal', parentId: 'technical-debt-quadrant' },
  { id: 'technical-debt-quadrant--paying-down-debt', title: 'Strategies to Pay Down Debt', parentId: 'technical-debt-quadrant' },

  /* ---- code-readability ---- */
  { id: 'code-readability--why-readability', title: 'Why Code Readability', parentId: 'code-readability' },
  { id: 'code-readability--art-of-readable-code', title: 'The Art of Readable Code (Boswell & Foucher)', parentId: 'code-readability' },
  { id: 'code-readability--surface-vs-deep-readability', title: 'Surface vs Deep Readability', parentId: 'code-readability' },
  { id: 'code-readability--mental-model-alignment', title: 'Mental Model Alignment', parentId: 'code-readability' },
  { id: 'code-readability--cognitive-load-readability', title: 'Cognitive Load (Readability View)', parentId: 'code-readability' },
  { id: 'code-readability--readability-and-tooling', title: 'Readability and Tooling', parentId: 'code-readability' },

  /* ---- naming-conventions ---- */
  { id: 'naming-conventions--intent-revealing-names', title: 'Intent-Revealing Names', parentId: 'naming-conventions' },
  { id: 'naming-conventions--avoiding-disinformation', title: 'Avoiding Disinformation', parentId: 'naming-conventions' },
  { id: 'naming-conventions--meaningful-distinctions', title: 'Meaningful Distinctions', parentId: 'naming-conventions' },
  { id: 'naming-conventions--pronounceable-searchable', title: 'Pronounceable & Searchable Names', parentId: 'naming-conventions' },
  { id: 'naming-conventions--hungarian-debate', title: 'Hungarian Notation Debate', parentId: 'naming-conventions' },
  { id: 'naming-conventions--casing-conventions', title: 'Casing Conventions (snake, camel, Pascal, kebab)', parentId: 'naming-conventions' },
  { id: 'naming-conventions--abbreviations', title: 'Abbreviations & Acronyms', parentId: 'naming-conventions' },
  { id: 'naming-conventions--two-hard-things', title: '"Two Hard Things" (Karlton)', parentId: 'naming-conventions' },

  /* ---- complexity-management ---- */
  { id: 'complexity-management--essential-vs-accidental', title: 'Essential vs Accidental Complexity (Brooks)', parentId: 'complexity-management' },
  { id: 'complexity-management--cognitive-complexity', title: 'Cognitive Complexity (SonarSource)', parentId: 'complexity-management' },
  { id: 'complexity-management--simple-vs-easy', title: 'Simple vs Easy (Hickey)', parentId: 'complexity-management' },
  { id: 'complexity-management--out-of-the-tar-pit', title: 'Out of the Tar Pit (Moseley & Marks)', parentId: 'complexity-management' },
  { id: 'complexity-management--complexity-budget', title: 'Complexity Budget', parentId: 'complexity-management' },
  { id: 'complexity-management--measuring-complexity', title: 'Measuring Complexity (CC, NPath)', parentId: 'complexity-management' },
  { id: 'complexity-management--reducing-complexity', title: 'Strategies to Reduce Complexity', parentId: 'complexity-management' },

  /* ============================================================
   * STAGE 16 — Software Maintenance & Evolution
   * ============================================================ */

  /* ---- maintenance-fundamentals ---- */
  { id: 'maintenance-fundamentals--swebok-maintenance-ka', title: 'SWEBOK Maintenance KA', parentId: 'maintenance-fundamentals' },
  { id: 'maintenance-fundamentals--why-maintenance-dominates', title: 'Why Maintenance Dominates Cost', parentId: 'maintenance-fundamentals' },
  { id: 'maintenance-fundamentals--maintenance-vs-development', title: 'Maintenance vs Development', parentId: 'maintenance-fundamentals' },
  { id: 'maintenance-fundamentals--isoiec-14764', title: 'ISO/IEC 14764 Maintenance Standard', parentId: 'maintenance-fundamentals' },
  { id: 'maintenance-fundamentals--maintenance-process', title: 'Maintenance Process', parentId: 'maintenance-fundamentals' },
  { id: 'maintenance-fundamentals--maintenance-team-models', title: 'Maintenance Team Models (You Build It You Run It)', parentId: 'maintenance-fundamentals' },
  { id: 'maintenance-fundamentals--ai-maintenance-2026', title: 'AI-Assisted Maintenance (2026)', parentId: 'maintenance-fundamentals' },

  /* ---- maintenance-types ---- */
  { id: 'maintenance-types--corrective', title: 'Corrective Maintenance', parentId: 'maintenance-types' },
  { id: 'maintenance-types--adaptive', title: 'Adaptive Maintenance', parentId: 'maintenance-types' },
  { id: 'maintenance-types--perfective', title: 'Perfective Maintenance', parentId: 'maintenance-types' },
  { id: 'maintenance-types--preventive', title: 'Preventive Maintenance', parentId: 'maintenance-types' },
  { id: 'maintenance-types--emergency', title: 'Emergency Maintenance', parentId: 'maintenance-types' },
  { id: 'maintenance-types--maintenance-mix', title: 'Typical Mix Across Projects', parentId: 'maintenance-types' },

  /* ---- legacy-modernization ---- */
  { id: 'legacy-modernization--what-is-legacy', title: 'What Counts as Legacy?', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--gartner-7rs', title: 'Gartner 7 Rs (Rehost, Refactor, Replatform, Repurchase, Retire, Retain, Replace)', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--strangler-fig-modernization', title: 'Strangler Fig Modernization', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--branch-by-abstraction', title: 'Branch by Abstraction (Modernization)', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--rewrite-vs-refactor', title: 'Rewrite vs Refactor', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--lift-and-shift', title: 'Lift & Shift', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--mainframe-modernization', title: 'Mainframe Modernization', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--cobol-modernization', title: 'COBOL Modernization', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--ai-aided-modernization-2026', title: 'AI-Aided Modernization (2026)', parentId: 'legacy-modernization' },
  { id: 'legacy-modernization--modernization-anti-patterns', title: 'Modernization Anti-Patterns', parentId: 'legacy-modernization' },

  /* ---- software-aging ---- */
  { id: 'software-aging--parnas-aging', title: 'Parnas on Software Aging', parentId: 'software-aging' },
  { id: 'software-aging--why-software-ages', title: 'Why Software Ages', parentId: 'software-aging' },
  { id: 'software-aging--symptoms-of-aging', title: 'Symptoms of Aging', parentId: 'software-aging' },
  { id: 'software-aging--combating-aging', title: 'Combating Software Aging', parentId: 'software-aging' },
  { id: 'software-aging--aging-and-debt', title: 'Aging and Technical Debt', parentId: 'software-aging' },

  /* ---- lehman-laws ---- */
  { id: 'lehman-laws--continuing-change', title: 'Law of Continuing Change', parentId: 'lehman-laws' },
  { id: 'lehman-laws--increasing-complexity', title: 'Law of Increasing Complexity', parentId: 'lehman-laws' },
  { id: 'lehman-laws--self-regulation', title: 'Law of Self-Regulation', parentId: 'lehman-laws' },
  { id: 'lehman-laws--conservation-of-organizational-stability', title: 'Conservation of Organizational Stability', parentId: 'lehman-laws' },
  { id: 'lehman-laws--conservation-of-familiarity', title: 'Conservation of Familiarity', parentId: 'lehman-laws' },
  { id: 'lehman-laws--continuing-growth', title: 'Continuing Growth', parentId: 'lehman-laws' },
  { id: 'lehman-laws--declining-quality', title: 'Declining Quality', parentId: 'lehman-laws' },
  { id: 'lehman-laws--feedback-system', title: 'Feedback System (8th Law)', parentId: 'lehman-laws' },
  { id: 'lehman-laws--e-vs-s-vs-p-systems', title: 'E-Type vs S-Type vs P-Type Systems', parentId: 'lehman-laws' },

  /* ---- reengineering ---- */
  { id: 'reengineering--definition', title: 'Definition (Chikofsky & Cross)', parentId: 'reengineering' },
  { id: 'reengineering--examination', title: 'Examination', parentId: 'reengineering' },
  { id: 'reengineering--restructuring', title: 'Restructuring', parentId: 'reengineering' },
  { id: 'reengineering--reimplementation', title: 'Reimplementation', parentId: 'reengineering' },
  { id: 'reengineering--horseshoe-model', title: 'Horseshoe Model', parentId: 'reengineering' },
  { id: 'reengineering--reengineering-vs-refactoring', title: 'Reengineering vs Refactoring', parentId: 'reengineering' },

  /* ---- reverse-engineering ---- */
  { id: 'reverse-engineering--definition', title: 'Definition', parentId: 'reverse-engineering' },
  { id: 'reverse-engineering--purposes', title: 'Purposes (Recovery, Interop, Security)', parentId: 'reverse-engineering' },
  { id: 'reverse-engineering--source-recovery', title: 'Source Recovery', parentId: 'reverse-engineering' },
  { id: 'reverse-engineering--design-recovery', title: 'Design Recovery', parentId: 'reverse-engineering' },
  { id: 'reverse-engineering--documentation-recovery', title: 'Documentation Recovery', parentId: 'reverse-engineering' },
  { id: 'reverse-engineering--legality', title: 'Legality of Reverse Engineering', parentId: 'reverse-engineering' },
  { id: 'reverse-engineering--ai-aided-re-2026', title: 'AI-Aided Reverse Engineering (2026)', parentId: 'reverse-engineering' },

  /* ---- migration-strategies-se ---- */
  { id: 'migration-strategies-se--big-bang', title: 'Big-Bang Migration', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--phased', title: 'Phased Migration', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--parallel-run', title: 'Parallel Run / Coexistence', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--strangler-migration', title: 'Strangler Fig Migration', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--branch-by-abstraction-migration', title: 'Branch by Abstraction (Migration)', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--blue-green-migration', title: 'Blue-Green Migration', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--shadow-migration', title: 'Shadow Migration', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--data-migration', title: 'Data Migration Strategy', parentId: 'migration-strategies-se' },
  { id: 'migration-strategies-se--rollback-strategy', title: 'Rollback Strategy', parentId: 'migration-strategies-se' },

  /* ---- end-of-life-retirement ---- */
  { id: 'end-of-life-retirement--eol-policy', title: 'EOL & EOS Policies', parentId: 'end-of-life-retirement' },
  { id: 'end-of-life-retirement--deprecation-process', title: 'Deprecation Process', parentId: 'end-of-life-retirement' },
  { id: 'end-of-life-retirement--sunset-plan', title: 'Sunset Plan', parentId: 'end-of-life-retirement' },
  { id: 'end-of-life-retirement--data-export-and-portability', title: 'Data Export & Portability', parentId: 'end-of-life-retirement' },
  { id: 'end-of-life-retirement--customer-communication', title: 'Customer Communication', parentId: 'end-of-life-retirement' },
  { id: 'end-of-life-retirement--archival', title: 'Archival of Code & Artifacts', parentId: 'end-of-life-retirement' },
  { id: 'end-of-life-retirement--legal-and-compliance', title: 'Legal & Compliance Retirement', parentId: 'end-of-life-retirement' },
])
