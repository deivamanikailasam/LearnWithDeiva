/**
 * Part 5: subtopics + sub-subtopics for stages 11-13
 *   11. Software Construction Practices
 *   12. Version Control & Source Code Management
 *   13. Software Testing
 *
 * Run with: node scripts/software-engineering/part5-stages-11-13.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 11 — Software Construction Practices
   * ============================================================ */

  /* ---- software-construction-fundamentals ---- */
  { id: 'software-construction-fundamentals--swebok-construction-ka', title: 'SWEBOK Construction KA', parentId: 'software-construction-fundamentals' },
  { id: 'software-construction-fundamentals--mcconnell-code-complete', title: 'Code Complete (McConnell)', parentId: 'software-construction-fundamentals' },
  { id: 'software-construction-fundamentals--minimizing-complexity', title: 'Minimizing Complexity', parentId: 'software-construction-fundamentals' },
  { id: 'software-construction-fundamentals--anticipating-change', title: 'Anticipating Change', parentId: 'software-construction-fundamentals' },
  { id: 'software-construction-fundamentals--constructing-for-verification', title: 'Constructing for Verification', parentId: 'software-construction-fundamentals' },
  { id: 'software-construction-fundamentals--reuse-in-construction', title: 'Reuse in Construction', parentId: 'software-construction-fundamentals' },
  { id: 'software-construction-fundamentals--standards-in-construction', title: 'Standards in Construction', parentId: 'software-construction-fundamentals' },

  /* ---- coding-standards-and-style ---- */
  { id: 'coding-standards-and-style--why-style-guides', title: 'Why Style Guides Matter', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--google-style-guides', title: 'Google Style Guides', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--airbnb-style', title: 'Airbnb JavaScript Style', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--pep-8', title: 'PEP 8 (Python)', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--rust-style', title: 'Rust Style', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--effective-java', title: 'Effective Java (Bloch)', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--editorconfig', title: 'EditorConfig', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--enforcement-with-formatters', title: 'Enforcement With Formatters', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--enforcement-with-linters', title: 'Enforcement With Linters', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--commenting-conventions', title: 'Commenting Conventions', parentId: 'coding-standards-and-style' },
  { id: 'coding-standards-and-style--code-organization', title: 'Code Organization Conventions', parentId: 'coding-standards-and-style' },

  /* ---- defensive-programming ---- */
  { id: 'defensive-programming--what-is-defensive', title: 'What Is Defensive Programming?', parentId: 'defensive-programming' },
  { id: 'defensive-programming--barricades', title: 'Barricades & Trust Boundaries', parentId: 'defensive-programming' },
  { id: 'defensive-programming--assertions', title: 'Assertions', parentId: 'defensive-programming' },
  { id: 'defensive-programming--preconditions', title: 'Preconditions', parentId: 'defensive-programming' },
  { id: 'defensive-programming--postconditions', title: 'Postconditions', parentId: 'defensive-programming' },
  { id: 'defensive-programming--class-invariants', title: 'Class Invariants', parentId: 'defensive-programming' },
  { id: 'defensive-programming--input-validation', title: 'Input Validation', parentId: 'defensive-programming' },
  { id: 'defensive-programming--fail-fast', title: 'Fail Fast', parentId: 'defensive-programming' },
  { id: 'defensive-programming--paranoid-programming', title: 'Paranoid Programming', parentId: 'defensive-programming' },
  { id: 'defensive-programming--offensive-programming', title: 'Offensive Programming', parentId: 'defensive-programming' },
  { id: 'defensive-programming--anti-patterns', title: 'Defensive Programming Anti-Patterns', parentId: 'defensive-programming' },

  /* ---- error-handling-practices ---- */
  { id: 'error-handling-practices--exception-design', title: 'Exception Design', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--exception-hierarchies', title: 'Exception Hierarchies', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--meaningful-error-messages', title: 'Meaningful Error Messages', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--error-context', title: 'Error Context & Wrapping', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--logging-context', title: 'Logging Context With Errors', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--retry-and-backoff', title: 'Retry & Backoff (Code-Level)', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--graceful-degradation-code', title: 'Graceful Degradation (Code-Level)', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--never-swallow-exceptions', title: 'Never Swallow Exceptions', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--crash-only-software', title: 'Crash-Only Software', parentId: 'error-handling-practices' },
  { id: 'error-handling-practices--error-handling-anti-patterns', title: 'Error Handling Anti-Patterns', parentId: 'error-handling-practices' },

  /* ---- pair-programming ---- */
  { id: 'pair-programming--driver-navigator', title: 'Driver / Navigator Roles', parentId: 'pair-programming' },
  { id: 'pair-programming--ping-pong', title: 'Ping-Pong Pairing', parentId: 'pair-programming' },
  { id: 'pair-programming--strong-style', title: 'Strong-Style Pairing (Llewellyn Falco)', parentId: 'pair-programming' },
  { id: 'pair-programming--remote-pairing', title: 'Remote Pairing', parentId: 'pair-programming' },
  { id: 'pair-programming--rotation-strategies', title: 'Rotation Strategies', parentId: 'pair-programming' },
  { id: 'pair-programming--evidence-research', title: 'Evidence & Research on Pairing', parentId: 'pair-programming' },
  { id: 'pair-programming--anti-patterns', title: 'Pair Programming Anti-Patterns', parentId: 'pair-programming' },
  { id: 'pair-programming--ai-pair-2026', title: 'AI Pair Programming (2026 View)', parentId: 'pair-programming' },

  /* ---- mob-programming ---- */
  { id: 'mob-programming--woody-zuill-origins', title: 'Origins (Woody Zuill, 2011)', parentId: 'mob-programming' },
  { id: 'mob-programming--strong-style-mobbing', title: 'Strong-Style Mobbing', parentId: 'mob-programming' },
  { id: 'mob-programming--rotation', title: 'Mob Rotation', parentId: 'mob-programming' },
  { id: 'mob-programming--remote-mobbing', title: 'Remote Mobbing', parentId: 'mob-programming' },
  { id: 'mob-programming--mob-vs-pair', title: 'Mob vs Pair Programming', parentId: 'mob-programming' },
  { id: 'mob-programming--cost-benefit', title: 'Cost-Benefit of Mobbing', parentId: 'mob-programming' },
  { id: 'mob-programming--anti-patterns', title: 'Mob Programming Anti-Patterns', parentId: 'mob-programming' },

  /* ---- ensemble-programming ---- */
  { id: 'ensemble-programming--rename-from-mob', title: 'Rename from Mob to Ensemble', parentId: 'ensemble-programming' },
  { id: 'ensemble-programming--ensemble-roles', title: 'Ensemble Roles', parentId: 'ensemble-programming' },
  { id: 'ensemble-programming--ensemble-cadence', title: 'Ensemble Cadence', parentId: 'ensemble-programming' },
  { id: 'ensemble-programming--ensemble-tooling-2026', title: 'Ensemble Tooling (2026)', parentId: 'ensemble-programming' },

  /* ---- test-driven-development ---- */
  { id: 'test-driven-development--red-green-refactor', title: 'Red-Green-Refactor Cycle', parentId: 'test-driven-development' },
  { id: 'test-driven-development--three-laws-of-tdd', title: 'Three Laws of TDD (Uncle Bob)', parentId: 'test-driven-development' },
  { id: 'test-driven-development--classicist-vs-mockist', title: 'Classicist (Chicago) vs Mockist (London) TDD', parentId: 'test-driven-development' },
  { id: 'test-driven-development--inside-out', title: 'Inside-Out TDD', parentId: 'test-driven-development' },
  { id: 'test-driven-development--outside-in', title: 'Outside-In TDD', parentId: 'test-driven-development' },
  { id: 'test-driven-development--double-loop-tdd', title: 'Double-Loop TDD', parentId: 'test-driven-development' },
  { id: 'test-driven-development--tdd-by-example', title: 'TDD By Example (Beck)', parentId: 'test-driven-development' },
  { id: 'test-driven-development--triangulation', title: 'Triangulation', parentId: 'test-driven-development' },
  { id: 'test-driven-development--obvious-implementation', title: 'Obvious Implementation', parentId: 'test-driven-development' },
  { id: 'test-driven-development--fake-it-until-you-make-it', title: 'Fake It Till You Make It', parentId: 'test-driven-development' },
  { id: 'test-driven-development--legacy-tdd', title: 'TDD on Legacy Code', parentId: 'test-driven-development' },
  { id: 'test-driven-development--tdd-criticism', title: 'TDD Criticism (Hansson DHH Debate)', parentId: 'test-driven-development' },
  { id: 'test-driven-development--evidence-research', title: 'Evidence & Research on TDD', parentId: 'test-driven-development' },
  { id: 'test-driven-development--ai-and-tdd-2026', title: 'AI & TDD (2026)', parentId: 'test-driven-development' },

  /* ---- behavior-driven-development ---- */
  { id: 'behavior-driven-development--north-origins', title: 'BDD Origins (Dan North)', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--given-when-then', title: 'Given-When-Then', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--ubiquitous-language-bdd', title: 'BDD & Ubiquitous Language', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--three-amigos', title: 'Three Amigos Conversation', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--example-mapping', title: 'Example Mapping (Wynne)', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--cucumber', title: 'Cucumber', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--specflow-reqnroll', title: 'SpecFlow / Reqnroll', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--jbehave', title: 'JBehave', parentId: 'behavior-driven-development' },
  { id: 'behavior-driven-development--bdd-anti-patterns', title: 'BDD Anti-Patterns', parentId: 'behavior-driven-development' },

  /* ---- acceptance-test-driven-development ---- */
  { id: 'acceptance-test-driven-development--atdd-fundamentals', title: 'ATDD Fundamentals', parentId: 'acceptance-test-driven-development' },
  { id: 'acceptance-test-driven-development--customer-collaboration', title: 'Customer Collaboration in ATDD', parentId: 'acceptance-test-driven-development' },
  { id: 'acceptance-test-driven-development--atdd-cycle', title: 'ATDD Cycle (Discuss-Distill-Develop-Demo)', parentId: 'acceptance-test-driven-development' },
  { id: 'acceptance-test-driven-development--fitnesse', title: 'FitNesse', parentId: 'acceptance-test-driven-development' },
  { id: 'acceptance-test-driven-development--robot-framework', title: 'Robot Framework', parentId: 'acceptance-test-driven-development' },
  { id: 'acceptance-test-driven-development--atdd-vs-bdd-vs-tdd', title: 'ATDD vs BDD vs TDD', parentId: 'acceptance-test-driven-development' },

  /* ---- specification-by-example ---- */
  { id: 'specification-by-example--adzic-book', title: 'Adzic "Specification by Example" Book', parentId: 'specification-by-example' },
  { id: 'specification-by-example--key-process-patterns', title: 'Key Process Patterns', parentId: 'specification-by-example' },
  { id: 'specification-by-example--executable-specifications', title: 'Executable Specifications', parentId: 'specification-by-example' },
  { id: 'specification-by-example--living-documentation', title: 'Living Documentation', parentId: 'specification-by-example' },
  { id: 'specification-by-example--examples-as-tests', title: 'Examples as Tests', parentId: 'specification-by-example' },
  { id: 'specification-by-example--sbe-vs-bdd', title: 'SBE vs BDD', parentId: 'specification-by-example' },

  /* ---- construction-anti-patterns ---- */
  { id: 'construction-anti-patterns--premature-optimization-construction', title: 'Premature Optimization (Construction View)', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--copy-paste', title: 'Copy-Paste in Construction', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--wrong-abstractions', title: 'Wrong Abstractions', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--over-engineering', title: 'Over-Engineering', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--under-engineering', title: 'Under-Engineering', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--cargo-cult-construction', title: 'Cargo-Cult Construction', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--gold-plating', title: 'Gold Plating', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--reinventing-the-wheel', title: 'Reinventing the Wheel', parentId: 'construction-anti-patterns' },
  { id: 'construction-anti-patterns--ai-cargo-cult-2026', title: 'AI-Cargo-Cult Construction (2026)', parentId: 'construction-anti-patterns' },

  /* ============================================================
   * STAGE 12 — Version Control & Source Code Management
   * ============================================================ */

  /* ---- version-control-fundamentals ---- */
  { id: 'version-control-fundamentals--why-vcs', title: 'Why Version Control?', parentId: 'version-control-fundamentals' },
  { id: 'version-control-fundamentals--centralized-vs-distributed', title: 'Centralized vs Distributed VCS', parentId: 'version-control-fundamentals' },
  { id: 'version-control-fundamentals--repository-concepts', title: 'Repository Concepts', parentId: 'version-control-fundamentals' },
  { id: 'version-control-fundamentals--working-copy', title: 'Working Copy / Working Tree', parentId: 'version-control-fundamentals' },
  { id: 'version-control-fundamentals--commit-history', title: 'Commit History', parentId: 'version-control-fundamentals' },
  { id: 'version-control-fundamentals--snapshots-vs-deltas', title: 'Snapshots vs Deltas', parentId: 'version-control-fundamentals' },
  { id: 'version-control-fundamentals--locking-vs-merging', title: 'Locking vs Merging Models', parentId: 'version-control-fundamentals' },
  { id: 'version-control-fundamentals--vcs-history', title: 'History of VCS Tools', parentId: 'version-control-fundamentals' },

  /* ---- git-fundamentals-se ---- */
  { id: 'git-fundamentals-se--torvalds-2005', title: 'Linus Torvalds & Git Origin (2005)', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--git-internals-overview', title: 'Git Internals Overview', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--object-model', title: 'Git Object Model (Blob, Tree, Commit, Tag)', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--refs-heads-tags', title: 'Refs, Heads & Tags', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--working-tree-index-repo', title: 'Working Tree, Index & Repo', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--basic-commands', title: 'Basic Commands (init, add, commit, log)', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--remotes', title: 'Remotes', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--push-pull-fetch', title: 'Push, Pull & Fetch', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--branching-basics', title: 'Branching Basics', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--gitignore', title: '.gitignore', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--gitattributes', title: '.gitattributes', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--git-config', title: 'Git Configuration', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--git-hooks', title: 'Git Hooks', parentId: 'git-fundamentals-se' },
  { id: 'git-fundamentals-se--gpg-and-ssh-signing', title: 'GPG & SSH Commit Signing', parentId: 'git-fundamentals-se' },

  /* ---- git-advanced-workflows ---- */
  { id: 'git-advanced-workflows--rebase', title: 'Interactive Rebase', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--cherry-pick', title: 'Cherry-Pick', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--bisect', title: 'git bisect', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--stash', title: 'git stash', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--reflog', title: 'git reflog', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--worktrees', title: 'git worktree', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--submodules', title: 'Git Submodules', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--subtree', title: 'Git Subtree', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--filter-repo', title: 'git filter-repo', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--blame', title: 'git blame', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--revert', title: 'git revert', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--reset-modes', title: 'git reset Modes', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--shallow-clone', title: 'Shallow Clone & Partial Clone', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--lfs', title: 'Git LFS', parentId: 'git-advanced-workflows' },
  { id: 'git-advanced-workflows--scalar', title: 'Scalar (Microsoft)', parentId: 'git-advanced-workflows' },

  /* ---- branching-strategies ---- */
  { id: 'branching-strategies--gitflow', title: 'Gitflow', parentId: 'branching-strategies' },
  { id: 'branching-strategies--github-flow', title: 'GitHub Flow', parentId: 'branching-strategies' },
  { id: 'branching-strategies--gitlab-flow', title: 'GitLab Flow', parentId: 'branching-strategies' },
  { id: 'branching-strategies--trunk-based-development', title: 'Trunk-Based Development', parentId: 'branching-strategies' },
  { id: 'branching-strategies--release-branches', title: 'Release Branching', parentId: 'branching-strategies' },
  { id: 'branching-strategies--hotfix-branches', title: 'Hotfix Branching', parentId: 'branching-strategies' },
  { id: 'branching-strategies--feature-branches', title: 'Feature Branching', parentId: 'branching-strategies' },
  { id: 'branching-strategies--short-lived-vs-long-lived', title: 'Short-Lived vs Long-Lived Branches', parentId: 'branching-strategies' },
  { id: 'branching-strategies--branch-by-abstraction', title: 'Branch by Abstraction', parentId: 'branching-strategies' },
  { id: 'branching-strategies--feature-flags-instead-of-branches', title: 'Feature Flags Instead of Branches', parentId: 'branching-strategies' },
  { id: 'branching-strategies--strategy-selection', title: 'Choosing a Branching Strategy', parentId: 'branching-strategies' },

  /* ---- merging-and-rebasing ---- */
  { id: 'merging-and-rebasing--three-way-merge', title: 'Three-Way Merge', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--fast-forward-merge', title: 'Fast-Forward Merge', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--no-ff-merge', title: '--no-ff Merge', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--squash-merge', title: 'Squash Merge', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--rebase-vs-merge', title: 'Rebase vs Merge', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--merge-conflict-resolution', title: 'Merge Conflict Resolution', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--rerere', title: 'git rerere', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--merge-strategies', title: 'Merge Strategies (recursive, ort, octopus)', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--linear-vs-non-linear-history', title: 'Linear vs Non-Linear History', parentId: 'merging-and-rebasing' },
  { id: 'merging-and-rebasing--rebase-anti-patterns', title: 'Rebase Anti-Patterns', parentId: 'merging-and-rebasing' },

  /* ---- code-review-process-vcs ---- */
  { id: 'code-review-process-vcs--why-code-review', title: 'Why Code Review?', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--review-types', title: 'Types of Reviews (Tool-Assisted, Pair, Walkthrough)', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--reviewer-mindset', title: 'Reviewer Mindset', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--author-mindset', title: 'Author Mindset', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--review-checklists', title: 'Review Checklists', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--small-prs', title: 'Small PRs Principle', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--review-cadence', title: 'Review Cadence & SLAs', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--codeowners', title: 'CODEOWNERS', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--review-anti-patterns', title: 'Code Review Anti-Patterns', parentId: 'code-review-process-vcs' },
  { id: 'code-review-process-vcs--ai-code-review-2026', title: 'AI Code Review (2026)', parentId: 'code-review-process-vcs' },

  /* ---- pull-request-workflow ---- */
  { id: 'pull-request-workflow--pr-vs-mr', title: 'PR vs MR Terminology', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--pr-template', title: 'PR Templates', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--draft-prs', title: 'Draft PRs', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--required-reviewers', title: 'Required Reviewers', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--required-checks', title: 'Required Status Checks', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--branch-protection-rules', title: 'Branch Protection Rules', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--auto-merge', title: 'Auto-Merge', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--merge-queues', title: 'Merge Queues', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--stacked-prs', title: 'Stacked PRs', parentId: 'pull-request-workflow' },
  { id: 'pull-request-workflow--pr-anti-patterns', title: 'PR Workflow Anti-Patterns', parentId: 'pull-request-workflow' },

  /* ---- monorepo-vs-polyrepo ---- */
  { id: 'monorepo-vs-polyrepo--definitions', title: 'Definitions (Mono, Multi, Hybrid)', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--monorepo-pros', title: 'Monorepo Pros', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--monorepo-cons', title: 'Monorepo Cons', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--polyrepo-pros', title: 'Polyrepo Pros', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--polyrepo-cons', title: 'Polyrepo Cons', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--google-monorepo', title: 'Google Monorepo Case', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--meta-monorepo', title: 'Meta Monorepo Case', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--microsoft-windows-repo', title: 'Microsoft Windows Mega-Repo', parentId: 'monorepo-vs-polyrepo' },
  { id: 'monorepo-vs-polyrepo--decision-framework', title: 'Mono vs Poly Decision Framework', parentId: 'monorepo-vs-polyrepo' },

  /* ---- commit-conventions ---- */
  { id: 'commit-conventions--why-conventions', title: 'Why Commit Conventions Matter', parentId: 'commit-conventions' },
  { id: 'commit-conventions--conventional-commits', title: 'Conventional Commits 1.0', parentId: 'commit-conventions' },
  { id: 'commit-conventions--gitmoji', title: 'Gitmoji', parentId: 'commit-conventions' },
  { id: 'commit-conventions--angular-style', title: 'Angular Commit Style', parentId: 'commit-conventions' },
  { id: 'commit-conventions--atomic-commits', title: 'Atomic Commits', parentId: 'commit-conventions' },
  { id: 'commit-conventions--good-commit-messages', title: 'Writing Good Commit Messages (Pope, Beams)', parentId: 'commit-conventions' },
  { id: 'commit-conventions--commit-templates', title: 'Commit Templates', parentId: 'commit-conventions' },
  { id: 'commit-conventions--commit-linting', title: 'Commit Linting (commitlint)', parentId: 'commit-conventions' },

  /* ---- vcs-tools-comparison ---- */
  { id: 'vcs-tools-comparison--git', title: 'Git', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--mercurial', title: 'Mercurial', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--svn', title: 'Subversion (SVN)', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--perforce', title: 'Perforce Helix', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--cvs', title: 'CVS (Historic)', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--fossil', title: 'Fossil', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--pijul', title: 'Pijul (Patch-Based)', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--jj-jujutsu', title: 'Jujutsu (jj)', parentId: 'vcs-tools-comparison' },
  { id: 'vcs-tools-comparison--git-hosting-platforms', title: 'Git Hosting Platforms (GitHub, GitLab, Bitbucket, Codeberg, Sourcehut)', parentId: 'vcs-tools-comparison' },

  /* ---- version-control-anti-patterns ---- */
  { id: 'version-control-anti-patterns--long-lived-branches', title: 'Long-Lived Branches', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--mega-commits', title: 'Mega Commits', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--commit-zoo', title: 'Commit Zoo (Junk Commits)', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--force-pushes', title: 'Force Pushes to Shared Branches', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--committing-secrets', title: 'Committing Secrets', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--committing-large-binaries', title: 'Committing Large Binaries Without LFS', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--rewriting-shared-history', title: 'Rewriting Shared History', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--ignoring-merge-conflicts', title: 'Ignoring Merge Conflicts', parentId: 'version-control-anti-patterns' },
  { id: 'version-control-anti-patterns--no-review', title: 'Bypassing Review', parentId: 'version-control-anti-patterns' },

  /* ============================================================
   * STAGE 13 — Software Testing
   * ============================================================ */

  /* ---- testing-fundamentals ---- */
  { id: 'testing-fundamentals--what-is-testing', title: 'What Is Testing?', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--testing-vs-debugging', title: 'Testing vs Debugging', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--seven-testing-principles', title: 'Seven ISTQB Principles', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--istqb-foundation', title: 'ISTQB Foundation Syllabus', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--istqb-advanced', title: 'ISTQB Advanced Syllabi', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--istqb-specialist', title: 'ISTQB Specialist Tracks', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--testing-vs-qa', title: 'Testing vs QA', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--shift-left-shift-right', title: 'Shift-Left & Shift-Right Testing', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--continuous-testing', title: 'Continuous Testing', parentId: 'testing-fundamentals' },
  { id: 'testing-fundamentals--ai-testing-2026', title: 'AI in Testing (2026)', parentId: 'testing-fundamentals' },

  /* ---- test-levels-overview ---- */
  { id: 'test-levels-overview--test-levels-istqb', title: 'Test Levels (ISTQB)', parentId: 'test-levels-overview' },
  { id: 'test-levels-overview--component-testing', title: 'Component Testing', parentId: 'test-levels-overview' },
  { id: 'test-levels-overview--component-integration', title: 'Component Integration Testing', parentId: 'test-levels-overview' },
  { id: 'test-levels-overview--system-integration', title: 'System Integration Testing', parentId: 'test-levels-overview' },
  { id: 'test-levels-overview--end-to-end-level', title: 'End-to-End Test Level', parentId: 'test-levels-overview' },
  { id: 'test-levels-overview--user-acceptance-level', title: 'User Acceptance Test Level', parentId: 'test-levels-overview' },
  { id: 'test-levels-overview--operational-acceptance-level', title: 'Operational Acceptance Test Level', parentId: 'test-levels-overview' },

  /* ---- unit-testing ---- */
  { id: 'unit-testing--what-is-a-unit', title: 'What Is a Unit?', parentId: 'unit-testing' },
  { id: 'unit-testing--solitary-vs-sociable', title: 'Solitary vs Sociable Unit Tests', parentId: 'unit-testing' },
  { id: 'unit-testing--arrange-act-assert', title: 'Arrange-Act-Assert (AAA)', parentId: 'unit-testing' },
  { id: 'unit-testing--given-when-then-unit', title: 'Given-When-Then for Unit', parentId: 'unit-testing' },
  { id: 'unit-testing--unit-testing-frameworks', title: 'Unit Testing Frameworks', parentId: 'unit-testing',
    children: [
      { id: 'junit', title: 'JUnit (JVM)' },
      { id: 'testng', title: 'TestNG (JVM)' },
      { id: 'pytest', title: 'pytest (Python)' },
      { id: 'unittest', title: 'unittest (Python)' },
      { id: 'jest', title: 'Jest (JS/TS)' },
      { id: 'vitest', title: 'Vitest (JS/TS)' },
      { id: 'mocha', title: 'Mocha (JS)' },
      { id: 'rspec', title: 'RSpec (Ruby)' },
      { id: 'minitest', title: 'Minitest (Ruby)' },
      { id: 'phpunit', title: 'PHPUnit' },
      { id: 'go-testing', title: 'Go testing' },
      { id: 'rust-cargo-test', title: 'Rust cargo test' },
      { id: 'xctest', title: 'XCTest (Apple)' },
      { id: 'nunit-mstest-xunit', title: 'NUnit / MSTest / xUnit' },
    ],
  },
  { id: 'unit-testing--fast-deterministic-isolated', title: 'Fast, Deterministic, Isolated', parentId: 'unit-testing' },
  { id: 'unit-testing--unit-test-anti-patterns', title: 'Unit Test Anti-Patterns', parentId: 'unit-testing' },

  /* ---- integration-testing ---- */
  { id: 'integration-testing--big-bang', title: 'Big-Bang Integration', parentId: 'integration-testing' },
  { id: 'integration-testing--top-down', title: 'Top-Down Integration', parentId: 'integration-testing' },
  { id: 'integration-testing--bottom-up', title: 'Bottom-Up Integration', parentId: 'integration-testing' },
  { id: 'integration-testing--sandwich', title: 'Sandwich Integration', parentId: 'integration-testing' },
  { id: 'integration-testing--narrow-vs-broad', title: 'Narrow vs Broad Integration', parentId: 'integration-testing' },
  { id: 'integration-testing--testcontainers', title: 'Testcontainers', parentId: 'integration-testing' },
  { id: 'integration-testing--in-memory-fakes', title: 'In-Memory Fakes', parentId: 'integration-testing' },
  { id: 'integration-testing--integration-anti-patterns', title: 'Integration Test Anti-Patterns', parentId: 'integration-testing' },

  /* ---- system-testing ---- */
  { id: 'system-testing--functional-system', title: 'Functional System Testing', parentId: 'system-testing' },
  { id: 'system-testing--non-functional-system', title: 'Non-Functional System Testing', parentId: 'system-testing' },
  { id: 'system-testing--end-to-end-system', title: 'End-to-End System Testing', parentId: 'system-testing' },
  { id: 'system-testing--environment-management', title: 'Test Environment Management', parentId: 'system-testing' },
  { id: 'system-testing--data-management', title: 'Test Data Management', parentId: 'system-testing' },

  /* ---- acceptance-testing ---- */
  { id: 'acceptance-testing--uat', title: 'User Acceptance Testing (UAT)', parentId: 'acceptance-testing' },
  { id: 'acceptance-testing--alpha-testing', title: 'Alpha Testing', parentId: 'acceptance-testing' },
  { id: 'acceptance-testing--beta-testing', title: 'Beta Testing', parentId: 'acceptance-testing' },
  { id: 'acceptance-testing--operational-acceptance', title: 'Operational Acceptance Testing', parentId: 'acceptance-testing' },
  { id: 'acceptance-testing--contract-acceptance', title: 'Contract Acceptance Testing', parentId: 'acceptance-testing' },
  { id: 'acceptance-testing--regulation-acceptance', title: 'Regulation-Driven Acceptance', parentId: 'acceptance-testing' },
  { id: 'acceptance-testing--acceptance-criteria', title: 'Acceptance Criteria', parentId: 'acceptance-testing' },

  /* ---- regression-testing ---- */
  { id: 'regression-testing--what-is-regression', title: 'What Is Regression?', parentId: 'regression-testing' },
  { id: 'regression-testing--full-vs-selective', title: 'Full vs Selective Regression', parentId: 'regression-testing' },
  { id: 'regression-testing--test-impact-analysis', title: 'Test Impact Analysis', parentId: 'regression-testing' },
  { id: 'regression-testing--retest-vs-regression', title: 'Retest vs Regression', parentId: 'regression-testing' },
  { id: 'regression-testing--regression-suites', title: 'Regression Suites', parentId: 'regression-testing' },
  { id: 'regression-testing--ai-regression-2026', title: 'AI-Driven Regression Selection (2026)', parentId: 'regression-testing' },

  /* ---- smoke-and-sanity-testing ---- */
  { id: 'smoke-and-sanity-testing--smoke-tests', title: 'Smoke Tests', parentId: 'smoke-and-sanity-testing' },
  { id: 'smoke-and-sanity-testing--sanity-tests', title: 'Sanity Tests', parentId: 'smoke-and-sanity-testing' },
  { id: 'smoke-and-sanity-testing--smoke-vs-sanity', title: 'Smoke vs Sanity', parentId: 'smoke-and-sanity-testing' },
  { id: 'smoke-and-sanity-testing--build-verification', title: 'Build Verification Tests (BVT)', parentId: 'smoke-and-sanity-testing' },

  /* ---- exploratory-testing ---- */
  { id: 'exploratory-testing--bach-origin', title: 'Bach Origins', parentId: 'exploratory-testing' },
  { id: 'exploratory-testing--session-based', title: 'Session-Based Exploratory Testing', parentId: 'exploratory-testing' },
  { id: 'exploratory-testing--charters', title: 'Test Charters', parentId: 'exploratory-testing' },
  { id: 'exploratory-testing--heuristics', title: 'Exploratory Testing Heuristics', parentId: 'exploratory-testing' },
  { id: 'exploratory-testing--simultaneous-learning', title: 'Simultaneous Learning, Design, Execution', parentId: 'exploratory-testing' },
  { id: 'exploratory-testing--vs-scripted', title: 'Exploratory vs Scripted', parentId: 'exploratory-testing' },

  /* ---- mutation-testing ---- */
  { id: 'mutation-testing--mutation-operators', title: 'Mutation Operators', parentId: 'mutation-testing' },
  { id: 'mutation-testing--mutation-score', title: 'Mutation Score', parentId: 'mutation-testing' },
  { id: 'mutation-testing--equivalent-mutants', title: 'Equivalent Mutants', parentId: 'mutation-testing' },
  { id: 'mutation-testing--pitest', title: 'Pitest (JVM)', parentId: 'mutation-testing' },
  { id: 'mutation-testing--mutmut-stryker', title: 'mutmut & Stryker', parentId: 'mutation-testing' },
  { id: 'mutation-testing--cosmic-ray', title: 'Cosmic Ray (Python)', parentId: 'mutation-testing' },
  { id: 'mutation-testing--limitations', title: 'Mutation Testing Limitations', parentId: 'mutation-testing' },

  /* ---- property-based-testing ---- */
  { id: 'property-based-testing--quickcheck-origins', title: 'QuickCheck Origins', parentId: 'property-based-testing' },
  { id: 'property-based-testing--generators', title: 'Generators', parentId: 'property-based-testing' },
  { id: 'property-based-testing--shrinking', title: 'Shrinking', parentId: 'property-based-testing' },
  { id: 'property-based-testing--invariants-and-models', title: 'Invariants & Model-Based Properties', parentId: 'property-based-testing' },
  { id: 'property-based-testing--hypothesis', title: 'Hypothesis (Python)', parentId: 'property-based-testing' },
  { id: 'property-based-testing--fast-check', title: 'fast-check (JS/TS)', parentId: 'property-based-testing' },
  { id: 'property-based-testing--proptest', title: 'proptest (Rust)', parentId: 'property-based-testing' },
  { id: 'property-based-testing--scalacheck', title: 'ScalaCheck', parentId: 'property-based-testing' },
  { id: 'property-based-testing--anti-patterns', title: 'PBT Anti-Patterns', parentId: 'property-based-testing' },

  /* ---- fuzz-testing ---- */
  { id: 'fuzz-testing--what-is-fuzzing', title: 'What Is Fuzzing?', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--blackbox-fuzzing', title: 'Black-Box Fuzzing', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--whitebox-fuzzing', title: 'White-Box Fuzzing', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--coverage-guided', title: 'Coverage-Guided Fuzzing', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--afl', title: 'AFL / AFL++', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--libfuzzer', title: 'libFuzzer', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--honggfuzz', title: 'honggfuzz', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--go-fuzz', title: 'Go fuzz', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--cargo-fuzz', title: 'cargo fuzz (Rust)', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--oss-fuzz', title: 'OSS-Fuzz (Google)', parentId: 'fuzz-testing' },
  { id: 'fuzz-testing--ai-fuzzing-2026', title: 'AI-Assisted Fuzzing (2026)', parentId: 'fuzz-testing' },

  /* ---- contract-testing ---- */
  { id: 'contract-testing--consumer-driven', title: 'Consumer-Driven Contracts', parentId: 'contract-testing' },
  { id: 'contract-testing--provider-driven', title: 'Provider-Driven Contracts', parentId: 'contract-testing' },
  { id: 'contract-testing--pact-framework', title: 'Pact Framework', parentId: 'contract-testing' },
  { id: 'contract-testing--spring-cloud-contract', title: 'Spring Cloud Contract', parentId: 'contract-testing' },
  { id: 'contract-testing--openapi-contract', title: 'OpenAPI Contract Validation', parentId: 'contract-testing' },
  { id: 'contract-testing--graphql-contract', title: 'GraphQL Contract Testing', parentId: 'contract-testing' },
  { id: 'contract-testing--asyncapi-contract', title: 'AsyncAPI Contract Testing', parentId: 'contract-testing' },
  { id: 'contract-testing--contract-broker', title: 'Pact Broker', parentId: 'contract-testing' },

  /* ---- snapshot-testing ---- */
  { id: 'snapshot-testing--approval-tests', title: 'Approval Tests', parentId: 'snapshot-testing' },
  { id: 'snapshot-testing--golden-master', title: 'Golden Master Testing', parentId: 'snapshot-testing' },
  { id: 'snapshot-testing--jest-snapshots', title: 'Jest Snapshots', parentId: 'snapshot-testing' },
  { id: 'snapshot-testing--storybook-snapshots', title: 'Storybook Snapshots', parentId: 'snapshot-testing' },
  { id: 'snapshot-testing--insta-rust', title: 'insta (Rust)', parentId: 'snapshot-testing' },
  { id: 'snapshot-testing--anti-patterns', title: 'Snapshot Test Anti-Patterns', parentId: 'snapshot-testing' },

  /* ---- ui-and-end-to-end-testing ---- */
  { id: 'ui-and-end-to-end-testing--browser-automation', title: 'Browser Automation Fundamentals', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--selenium', title: 'Selenium WebDriver', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--playwright', title: 'Playwright', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--cypress', title: 'Cypress', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--puppeteer', title: 'Puppeteer', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--testcafe', title: 'TestCafe', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--mobile-ui-automation', title: 'Mobile UI Automation (Appium, Espresso, XCUITest)', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--page-objects', title: 'Page Object Model', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--screenplay-pattern', title: 'Screenplay Pattern', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--visual-regression', title: 'Visual Regression Testing', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--applitools-percy', title: 'Applitools & Percy', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--flaky-e2e', title: 'Dealing With Flaky E2E', parentId: 'ui-and-end-to-end-testing' },
  { id: 'ui-and-end-to-end-testing--ai-e2e-2026', title: 'AI-Generated E2E Tests (2026)', parentId: 'ui-and-end-to-end-testing' },

  /* ---- accessibility-testing ---- */
  { id: 'accessibility-testing--wcag-2-2', title: 'WCAG 2.2', parentId: 'accessibility-testing' },
  { id: 'accessibility-testing--wcag-3', title: 'WCAG 3.0 (Draft)', parentId: 'accessibility-testing' },
  { id: 'accessibility-testing--ada-eu-section508', title: 'ADA, EU EAA & Section 508', parentId: 'accessibility-testing' },
  { id: 'accessibility-testing--axe-core', title: 'axe-core', parentId: 'accessibility-testing' },
  { id: 'accessibility-testing--lighthouse-a11y', title: 'Lighthouse Accessibility', parentId: 'accessibility-testing' },
  { id: 'accessibility-testing--screen-reader-testing', title: 'Screen Reader Testing', parentId: 'accessibility-testing' },
  { id: 'accessibility-testing--manual-a11y-checks', title: 'Manual Accessibility Checks', parentId: 'accessibility-testing' },

  /* ---- usability-testing ---- */
  { id: 'usability-testing--moderated-vs-unmoderated', title: 'Moderated vs Unmoderated', parentId: 'usability-testing' },
  { id: 'usability-testing--remote-usability', title: 'Remote Usability Testing', parentId: 'usability-testing' },
  { id: 'usability-testing--think-aloud', title: 'Think-Aloud Protocol', parentId: 'usability-testing' },
  { id: 'usability-testing--task-success-metrics', title: 'Task Success Metrics', parentId: 'usability-testing' },
  { id: 'usability-testing--sus-survey', title: 'System Usability Scale (SUS)', parentId: 'usability-testing' },
  { id: 'usability-testing--ab-testing-link', title: 'Link to A/B Testing', parentId: 'usability-testing' },

  /* ---- performance-testing ---- */
  { id: 'performance-testing--load-testing', title: 'Load Testing', parentId: 'performance-testing' },
  { id: 'performance-testing--stress-testing', title: 'Stress Testing', parentId: 'performance-testing' },
  { id: 'performance-testing--spike-testing', title: 'Spike Testing', parentId: 'performance-testing' },
  { id: 'performance-testing--soak-testing', title: 'Soak / Endurance Testing', parentId: 'performance-testing' },
  { id: 'performance-testing--capacity-testing', title: 'Capacity Testing', parentId: 'performance-testing' },
  { id: 'performance-testing--scalability-testing', title: 'Scalability Testing', parentId: 'performance-testing' },
  { id: 'performance-testing--volume-testing', title: 'Volume Testing', parentId: 'performance-testing' },
  { id: 'performance-testing--jmeter', title: 'Apache JMeter', parentId: 'performance-testing' },
  { id: 'performance-testing--gatling', title: 'Gatling', parentId: 'performance-testing' },
  { id: 'performance-testing--k6', title: 'k6 (Grafana)', parentId: 'performance-testing' },
  { id: 'performance-testing--locust', title: 'Locust', parentId: 'performance-testing' },
  { id: 'performance-testing--wrk-vegeta', title: 'wrk & Vegeta', parentId: 'performance-testing' },
  { id: 'performance-testing--microbenchmarking', title: 'Microbenchmarking (JMH, Criterion)', parentId: 'performance-testing' },
  { id: 'performance-testing--profiling-link', title: 'Profiling in Performance Testing', parentId: 'performance-testing' },

  /* ---- security-testing ---- */
  { id: 'security-testing--what-is-security-testing', title: 'What Is Security Testing?', parentId: 'security-testing' },
  { id: 'security-testing--vulnerability-scanning', title: 'Vulnerability Scanning', parentId: 'security-testing' },
  { id: 'security-testing--penetration-testing', title: 'Penetration Testing', parentId: 'security-testing' },
  { id: 'security-testing--abuse-cases', title: 'Abuse Cases & Misuse Cases', parentId: 'security-testing' },
  { id: 'security-testing--owasp-zap', title: 'OWASP ZAP', parentId: 'security-testing' },
  { id: 'security-testing--burp-suite', title: 'Burp Suite', parentId: 'security-testing' },
  { id: 'security-testing--sca-tools', title: 'Software Composition Analysis (SCA)', parentId: 'security-testing' },
  { id: 'security-testing--secrets-scanning', title: 'Secrets Scanning', parentId: 'security-testing' },
  { id: 'security-testing--bug-bounty-programs', title: 'Bug Bounty Programs', parentId: 'security-testing' },
  { id: 'security-testing--red-team-vs-blue-team', title: 'Red Team vs Blue Team Testing', parentId: 'security-testing' },

  /* ---- testing-pyramid-trophy ---- */
  { id: 'testing-pyramid-trophy--cohn-pyramid', title: 'Cohn Test Pyramid', parentId: 'testing-pyramid-trophy' },
  { id: 'testing-pyramid-trophy--ice-cream-cone', title: 'Ice Cream Cone (Anti-Pattern)', parentId: 'testing-pyramid-trophy' },
  { id: 'testing-pyramid-trophy--testing-trophy', title: 'Testing Trophy (Kent C. Dodds)', parentId: 'testing-pyramid-trophy' },
  { id: 'testing-pyramid-trophy--testing-honeycomb', title: 'Testing Honeycomb (Spotify)', parentId: 'testing-pyramid-trophy' },
  { id: 'testing-pyramid-trophy--testing-diamond', title: 'Testing Diamond', parentId: 'testing-pyramid-trophy' },
  { id: 'testing-pyramid-trophy--practical-test-mix', title: 'Practical Test Mix', parentId: 'testing-pyramid-trophy' },
  { id: 'testing-pyramid-trophy--shape-debates-2026', title: 'Test-Shape Debates (2026)', parentId: 'testing-pyramid-trophy' },

  /* ---- test-doubles ---- */
  { id: 'test-doubles--meszaros-classification', title: 'Meszaros Classification', parentId: 'test-doubles' },
  { id: 'test-doubles--dummy', title: 'Dummy', parentId: 'test-doubles' },
  { id: 'test-doubles--stub', title: 'Stub', parentId: 'test-doubles' },
  { id: 'test-doubles--spy', title: 'Spy', parentId: 'test-doubles' },
  { id: 'test-doubles--mock', title: 'Mock', parentId: 'test-doubles' },
  { id: 'test-doubles--fake', title: 'Fake', parentId: 'test-doubles' },
  { id: 'test-doubles--in-memory-databases', title: 'In-Memory Databases as Fakes', parentId: 'test-doubles' },
  { id: 'test-doubles--http-mocks', title: 'HTTP Mocks (MSW, WireMock, nock)', parentId: 'test-doubles' },
  { id: 'test-doubles--mockist-vs-classicist', title: 'Mockist vs Classicist Style', parentId: 'test-doubles' },
  { id: 'test-doubles--anti-patterns', title: 'Test Double Anti-Patterns', parentId: 'test-doubles' },

  /* ---- coverage-criteria ---- */
  { id: 'coverage-criteria--statement-coverage', title: 'Statement Coverage', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--branch-coverage', title: 'Branch / Decision Coverage', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--condition-coverage', title: 'Condition Coverage', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--mc-dc', title: 'Modified Condition / Decision Coverage (MC/DC)', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--path-coverage', title: 'Path Coverage', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--loop-coverage', title: 'Loop Coverage', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--function-coverage', title: 'Function / Method Coverage', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--mutation-coverage', title: 'Mutation Coverage', parentId: 'coverage-criteria' },
  { id: 'coverage-criteria--coverage-targets', title: 'Coverage Targets & Pitfalls', parentId: 'coverage-criteria' },

  /* ---- test-design-techniques ---- */
  { id: 'test-design-techniques--equivalence-partitioning', title: 'Equivalence Partitioning', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--boundary-value-analysis', title: 'Boundary Value Analysis', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--decision-tables', title: 'Decision Tables', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--state-transition', title: 'State Transition Testing', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--use-case-testing', title: 'Use-Case Testing', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--pairwise-testing', title: 'Pairwise Testing', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--orthogonal-array', title: 'Orthogonal Array Testing', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--cause-effect-graphing', title: 'Cause-Effect Graphing', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--exploratory-techniques', title: 'Exploratory Techniques', parentId: 'test-design-techniques' },
  { id: 'test-design-techniques--risk-based-testing', title: 'Risk-Based Testing', parentId: 'test-design-techniques' },

  /* ---- test-automation-strategy ---- */
  { id: 'test-automation-strategy--what-to-automate', title: 'What to Automate (and Not)', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--automation-pyramid', title: 'Automation Pyramid', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--framework-selection', title: 'Framework Selection', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--keyword-driven', title: 'Keyword-Driven Testing', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--data-driven', title: 'Data-Driven Testing', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--bdd-driven', title: 'BDD-Driven Automation', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--in-pipeline-automation', title: 'In-Pipeline Automation', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--test-parallelization', title: 'Test Parallelization', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--test-selection', title: 'Test Selection & Sharding', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--ai-test-automation-2026', title: 'AI-Driven Test Automation (2026)', parentId: 'test-automation-strategy' },
  { id: 'test-automation-strategy--roi', title: 'Test Automation ROI', parentId: 'test-automation-strategy' },

  /* ---- test-anti-patterns ---- */
  { id: 'test-anti-patterns--flaky-tests', title: 'Flaky Tests', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--ice-cream-cone-anti', title: 'Ice Cream Cone Test Mix', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--happy-path-only', title: 'Happy-Path-Only Testing', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--testing-implementation', title: 'Testing Implementation Details', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--mock-overuse', title: 'Mock Overuse', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--coverage-as-target', title: 'Coverage as a Target', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--slow-test-suites', title: 'Slow Test Suites', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--shared-state', title: 'Shared State Between Tests', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--brittle-snapshots', title: 'Brittle Snapshots', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--ignored-tests', title: 'Ignored / Skipped Tests', parentId: 'test-anti-patterns' },
  { id: 'test-anti-patterns--testing-anti-patterns-2026', title: 'AI-Generated Test Anti-Patterns (2026)', parentId: 'test-anti-patterns' },
])