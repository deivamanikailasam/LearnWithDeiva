/**
 * Part 13 (FINAL): subtopics + sub-subtopics for stages 35-37
 *   35. Developer Productivity & Developer Experience
 *   36. AI-Augmented Software Engineering (2026)
 *   37. Frontier Trends in Software Engineering (2026)
 *
 * Run with: node scripts/software-engineering/part13-stages-35-37.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 35 — Developer Productivity & Developer Experience
   * ============================================================ */

  /* ---- developer-productivity-fundamentals ---- */
  { id: 'developer-productivity-fundamentals--definition', title: 'Definition(s) of Developer Productivity', parentId: 'developer-productivity-fundamentals' },
  { id: 'developer-productivity-fundamentals--productivity-paradoxes', title: 'Productivity Paradoxes (Solow, Jevons)', parentId: 'developer-productivity-fundamentals' },
  { id: 'developer-productivity-fundamentals--measuring-productivity', title: 'Measuring Productivity (and Why It Is Hard)', parentId: 'developer-productivity-fundamentals' },
  { id: 'developer-productivity-fundamentals--productivity-anti-metrics', title: 'Productivity Anti-Metrics (LOC, Commits, Hours)', parentId: 'developer-productivity-fundamentals' },
  { id: 'developer-productivity-fundamentals--3p-framework', title: '3 Ps: People, Process, Platform', parentId: 'developer-productivity-fundamentals' },
  { id: 'developer-productivity-fundamentals--research-leaders', title: 'Research Leaders (Forsgren, Sadowski, Storey, Murphy)', parentId: 'developer-productivity-fundamentals' },
  { id: 'developer-productivity-fundamentals--ai-and-productivity-2026', title: 'AI & Developer Productivity (2026)', parentId: 'developer-productivity-fundamentals' },

  /* ---- developer-experience-fundamentals ---- */
  { id: 'developer-experience-fundamentals--definition', title: 'Definition of DevEx', parentId: 'developer-experience-fundamentals' },
  { id: 'developer-experience-fundamentals--devex-vs-developer-productivity', title: 'DevEx vs Developer Productivity', parentId: 'developer-experience-fundamentals' },
  { id: 'developer-experience-fundamentals--devex-as-discipline', title: 'DevEx as an Engineering Discipline', parentId: 'developer-experience-fundamentals' },
  { id: 'developer-experience-fundamentals--developer-as-customer', title: 'Developer as Customer', parentId: 'developer-experience-fundamentals' },
  { id: 'developer-experience-fundamentals--devex-research-papers', title: 'Key DevEx Research Papers', parentId: 'developer-experience-fundamentals' },
  { id: 'developer-experience-fundamentals--devex-orgs-and-teams', title: 'DevEx Orgs & Teams', parentId: 'developer-experience-fundamentals' },

  /* ---- inner-vs-outer-loop ---- */
  { id: 'inner-vs-outer-loop--inner-loop-definition', title: 'Inner Loop Definition', parentId: 'inner-vs-outer-loop' },
  { id: 'inner-vs-outer-loop--outer-loop-definition', title: 'Outer Loop Definition', parentId: 'inner-vs-outer-loop' },
  { id: 'inner-vs-outer-loop--inner-loop-friction', title: 'Inner-Loop Friction Sources', parentId: 'inner-vs-outer-loop' },
  { id: 'inner-vs-outer-loop--inner-loop-optimizations', title: 'Inner-Loop Optimizations', parentId: 'inner-vs-outer-loop' },
  { id: 'inner-vs-outer-loop--outer-loop-optimizations', title: 'Outer-Loop Optimizations', parentId: 'inner-vs-outer-loop' },
  { id: 'inner-vs-outer-loop--devbox-and-fast-feedback', title: 'Dev Box & Fast Feedback', parentId: 'inner-vs-outer-loop' },
  { id: 'inner-vs-outer-loop--rapid-deployment-loops-2026', title: 'Rapid Deployment Loops (2026)', parentId: 'inner-vs-outer-loop' },

  /* ---- flow-and-cognitive-load ---- */
  { id: 'flow-and-cognitive-load--csikszentmihalyi-flow', title: 'Csíkszentmihályi Flow Theory', parentId: 'flow-and-cognitive-load' },
  { id: 'flow-and-cognitive-load--cognitive-load-types', title: 'Cognitive Load Types (Intrinsic, Extraneous, Germane)', parentId: 'flow-and-cognitive-load' },
  { id: 'flow-and-cognitive-load--team-topologies-cognitive-load', title: 'Team Topologies on Cognitive Load', parentId: 'flow-and-cognitive-load' },
  { id: 'flow-and-cognitive-load--reducing-extraneous-load', title: 'Reducing Extraneous Load', parentId: 'flow-and-cognitive-load' },
  { id: 'flow-and-cognitive-load--protecting-flow-state', title: 'Protecting Flow State', parentId: 'flow-and-cognitive-load' },
  { id: 'flow-and-cognitive-load--devex-cognitive-load-link', title: 'DevEx Cognitive Load Link', parentId: 'flow-and-cognitive-load' },

  /* ---- focus-time-engineering ---- */
  { id: 'focus-time-engineering--maker-vs-manager-schedule', title: 'Maker vs Manager Schedule (PG)', parentId: 'focus-time-engineering' },
  { id: 'focus-time-engineering--deep-work-newport', title: 'Deep Work (Newport)', parentId: 'focus-time-engineering' },
  { id: 'focus-time-engineering--no-meeting-days', title: 'No-Meeting Days / Focus Time Policies', parentId: 'focus-time-engineering' },
  { id: 'focus-time-engineering--async-first-culture', title: 'Async-First Culture', parentId: 'focus-time-engineering' },
  { id: 'focus-time-engineering--notifications-and-interruptions', title: 'Notifications & Interruptions Hygiene', parentId: 'focus-time-engineering' },
  { id: 'focus-time-engineering--time-budgeting', title: 'Time Budgeting', parentId: 'focus-time-engineering' },

  /* ---- onboarding-and-paved-paths ---- */
  { id: 'onboarding-and-paved-paths--onboarding-time-as-metric', title: 'Onboarding Time as a Metric', parentId: 'onboarding-and-paved-paths' },
  { id: 'onboarding-and-paved-paths--first-pr-and-first-deploy', title: 'First-PR & First-Deploy Targets', parentId: 'onboarding-and-paved-paths' },
  { id: 'onboarding-and-paved-paths--paved-paths-concept', title: 'Paved-Paths Concept (Netflix)', parentId: 'onboarding-and-paved-paths' },
  { id: 'onboarding-and-paved-paths--golden-paths', title: 'Golden Paths (Spotify)', parentId: 'onboarding-and-paved-paths' },
  { id: 'onboarding-and-paved-paths--starter-templates', title: 'Starter Templates / Cookiecutters', parentId: 'onboarding-and-paved-paths' },
  { id: 'onboarding-and-paved-paths--onboarding-runbooks', title: 'Onboarding Runbooks', parentId: 'onboarding-and-paved-paths' },
  { id: 'onboarding-and-paved-paths--ai-onboarding-2026', title: 'AI-Powered Onboarding (2026)', parentId: 'onboarding-and-paved-paths' },

  /* ---- internal-developer-platforms-overview ---- */
  { id: 'internal-developer-platforms-overview--idp-definition', title: 'IDP Definition', parentId: 'internal-developer-platforms-overview' },
  { id: 'internal-developer-platforms-overview--platform-as-product', title: 'Platform-as-a-Product', parentId: 'internal-developer-platforms-overview' },
  { id: 'internal-developer-platforms-overview--idp-capabilities', title: 'IDP Capabilities Map', parentId: 'internal-developer-platforms-overview' },
  { id: 'internal-developer-platforms-overview--backstage', title: 'Backstage', parentId: 'internal-developer-platforms-overview' },
  { id: 'internal-developer-platforms-overview--port-and-cortex', title: 'Port & Cortex', parentId: 'internal-developer-platforms-overview' },
  { id: 'internal-developer-platforms-overview--humanitec', title: 'Humanitec', parentId: 'internal-developer-platforms-overview' },
  { id: 'internal-developer-platforms-overview--idp-anti-patterns', title: 'IDP Anti-Patterns', parentId: 'internal-developer-platforms-overview' },

  /* ---- toil-and-friction ---- */
  { id: 'toil-and-friction--google-sre-definition-of-toil', title: 'Google SRE Definition of Toil', parentId: 'toil-and-friction' },
  { id: 'toil-and-friction--toil-budget', title: 'Toil Budget', parentId: 'toil-and-friction' },
  { id: 'toil-and-friction--friction-logs', title: 'Friction Logs', parentId: 'toil-and-friction' },
  { id: 'toil-and-friction--developer-survey-data', title: 'Developer Survey Data', parentId: 'toil-and-friction' },
  { id: 'toil-and-friction--toil-vs-overhead', title: 'Toil vs Overhead vs Real Work', parentId: 'toil-and-friction' },
  { id: 'toil-and-friction--automating-toil', title: 'Automating Toil', parentId: 'toil-and-friction' },

  /* ---- engineering-effectiveness ---- */
  { id: 'engineering-effectiveness--ee-team-charter', title: 'EE Team Charter', parentId: 'engineering-effectiveness' },
  { id: 'engineering-effectiveness--ee-vs-platform-vs-devex', title: 'EE vs Platform vs DevEx Teams', parentId: 'engineering-effectiveness' },
  { id: 'engineering-effectiveness--ee-impact-measurement', title: 'EE Impact Measurement', parentId: 'engineering-effectiveness' },
  { id: 'engineering-effectiveness--ee-portfolio-management', title: 'EE Portfolio Management', parentId: 'engineering-effectiveness' },
  { id: 'engineering-effectiveness--ee-anti-patterns', title: 'EE Anti-Patterns', parentId: 'engineering-effectiveness' },

  /* ============================================================
   * STAGE 36 — AI-Augmented Software Engineering (2026)
   * ============================================================ */

  /* ---- ai-augmented-engineering-overview ---- */
  { id: 'ai-augmented-engineering-overview--map-of-ai-activities', title: 'Map of AI-Assisted Activities', parentId: 'ai-augmented-engineering-overview' },
  { id: 'ai-augmented-engineering-overview--levels-of-automation', title: 'Levels of AI Automation in SE', parentId: 'ai-augmented-engineering-overview' },
  { id: 'ai-augmented-engineering-overview--ai-augmentation-vs-replacement', title: 'AI Augmentation vs Replacement', parentId: 'ai-augmented-engineering-overview' },
  { id: 'ai-augmented-engineering-overview--state-of-ai-coding-2026', title: 'State of AI Coding (2026 Snapshot)', parentId: 'ai-augmented-engineering-overview' },
  { id: 'ai-augmented-engineering-overview--research-on-impact', title: 'Research on Impact (METR, GitHub, etc.)', parentId: 'ai-augmented-engineering-overview' },
  { id: 'ai-augmented-engineering-overview--ai-policy-in-orgs', title: 'AI Coding Policies in Orgs', parentId: 'ai-augmented-engineering-overview' },

  /* ---- llm-coding-assistants-2026 ---- */
  { id: 'llm-coding-assistants-2026--inline-completion-state', title: 'Inline Completion (2026 State)', parentId: 'llm-coding-assistants-2026' },
  { id: 'llm-coding-assistants-2026--chat-mode-state', title: 'Chat Mode (2026 State)', parentId: 'llm-coding-assistants-2026' },
  { id: 'llm-coding-assistants-2026--agent-mode-state', title: 'Agent Mode (2026 State)', parentId: 'llm-coding-assistants-2026' },
  { id: 'llm-coding-assistants-2026--frontier-models-for-coding', title: 'Frontier Models for Coding (Claude, GPT-5, Gemini, Llama, Qwen, DeepSeek)', parentId: 'llm-coding-assistants-2026' },
  { id: 'llm-coding-assistants-2026--coding-specialist-models', title: 'Coding-Specialist Models', parentId: 'llm-coding-assistants-2026' },
  { id: 'llm-coding-assistants-2026--multimodal-coding', title: 'Multimodal Coding (Screenshots → Code)', parentId: 'llm-coding-assistants-2026' },
  { id: 'llm-coding-assistants-2026--local-vs-cloud-llms', title: 'Local vs Cloud LLMs for Coding', parentId: 'llm-coding-assistants-2026' },

  /* ---- prompt-patterns-for-coding ---- */
  { id: 'prompt-patterns-for-coding--scoping-prompts', title: 'Scoping Prompts', parentId: 'prompt-patterns-for-coding' },
  { id: 'prompt-patterns-for-coding--few-shot-coding', title: 'Few-Shot Coding Prompts', parentId: 'prompt-patterns-for-coding' },
  { id: 'prompt-patterns-for-coding--chain-of-thought-coding', title: 'Chain-of-Thought for Code', parentId: 'prompt-patterns-for-coding' },
  { id: 'prompt-patterns-for-coding--reasoning-modes-2026', title: 'Reasoning Modes (2026)', parentId: 'prompt-patterns-for-coding' },
  { id: 'prompt-patterns-for-coding--context-engineering', title: 'Context Engineering for Coding', parentId: 'prompt-patterns-for-coding' },
  { id: 'prompt-patterns-for-coding--prompt-libraries', title: 'Reusable Prompt Libraries', parentId: 'prompt-patterns-for-coding' },
  { id: 'prompt-patterns-for-coding--guardrails-and-system-prompts', title: 'Guardrails & System Prompts for Coding', parentId: 'prompt-patterns-for-coding' },

  /* ---- ai-pair-programming ---- */
  { id: 'ai-pair-programming--driver-vs-navigator-with-ai', title: 'Driver vs Navigator With AI', parentId: 'ai-pair-programming' },
  { id: 'ai-pair-programming--accept-reject-discipline', title: 'Accept/Reject Discipline', parentId: 'ai-pair-programming' },
  { id: 'ai-pair-programming--specifying-intent-clearly', title: 'Specifying Intent Clearly', parentId: 'ai-pair-programming' },
  { id: 'ai-pair-programming--review-loops-with-ai', title: 'Review Loops With AI', parentId: 'ai-pair-programming' },
  { id: 'ai-pair-programming--ai-pairing-vs-human-pairing', title: 'AI Pairing vs Human Pairing', parentId: 'ai-pair-programming' },
  { id: 'ai-pair-programming--anti-patterns', title: 'AI Pair Programming Anti-Patterns', parentId: 'ai-pair-programming' },

  /* ---- ai-code-review ---- */
  { id: 'ai-code-review--ai-review-overview', title: 'AI Code Review Overview', parentId: 'ai-code-review' },
  { id: 'ai-code-review--bugbot-and-similar-2026', title: 'Cursor Bugbot, CodeRabbit, GitHub Copilot Review (2026)', parentId: 'ai-code-review' },
  { id: 'ai-code-review--security-focused-review', title: 'Security-Focused AI Review', parentId: 'ai-code-review' },
  { id: 'ai-code-review--style-and-convention-review', title: 'Style & Convention AI Review', parentId: 'ai-code-review' },
  { id: 'ai-code-review--test-coverage-suggestions', title: 'Test-Coverage Suggestions', parentId: 'ai-code-review' },
  { id: 'ai-code-review--ai-review-trust-calibration', title: 'AI Review Trust Calibration', parentId: 'ai-code-review' },
  { id: 'ai-code-review--review-noise-and-tuning', title: 'Review Noise & Tuning', parentId: 'ai-code-review' },

  /* ---- ai-test-generation ---- */
  { id: 'ai-test-generation--unit-test-generation', title: 'Unit Test Generation', parentId: 'ai-test-generation' },
  { id: 'ai-test-generation--integration-test-generation', title: 'Integration Test Generation', parentId: 'ai-test-generation' },
  { id: 'ai-test-generation--property-test-generation', title: 'Property Test Generation', parentId: 'ai-test-generation' },
  { id: 'ai-test-generation--mutation-aware-test-gen', title: 'Mutation-Aware Test Generation', parentId: 'ai-test-generation' },
  { id: 'ai-test-generation--snapshot-test-generation', title: 'Snapshot & Golden Test Generation', parentId: 'ai-test-generation' },
  { id: 'ai-test-generation--test-quality-pitfalls', title: 'AI Test Quality Pitfalls (Tautological Tests)', parentId: 'ai-test-generation' },

  /* ---- ai-spec-and-design ---- */
  { id: 'ai-spec-and-design--prd-drafting', title: 'PRD / Spec Drafting With AI', parentId: 'ai-spec-and-design' },
  { id: 'ai-spec-and-design--adr-drafting', title: 'ADR Drafting With AI', parentId: 'ai-spec-and-design' },
  { id: 'ai-spec-and-design--api-design-with-ai', title: 'API Design With AI', parentId: 'ai-spec-and-design' },
  { id: 'ai-spec-and-design--design-exploration', title: 'Design Exploration With AI', parentId: 'ai-spec-and-design' },
  { id: 'ai-spec-and-design--review-of-ai-designs', title: 'Reviewing AI-Generated Designs', parentId: 'ai-spec-and-design' },
  { id: 'ai-spec-and-design--spec-as-code', title: 'Spec-as-Code Pipelines', parentId: 'ai-spec-and-design' },

  /* ---- ai-refactoring ---- */
  { id: 'ai-refactoring--bulk-refactors', title: 'Bulk Refactors With AI', parentId: 'ai-refactoring' },
  { id: 'ai-refactoring--surgical-refactors', title: 'Surgical Refactors With AI', parentId: 'ai-refactoring' },
  { id: 'ai-refactoring--cross-repo-refactors', title: 'Cross-Repo Refactors', parentId: 'ai-refactoring' },
  { id: 'ai-refactoring--migration-refactors', title: 'Migration Refactors (Framework Upgrades)', parentId: 'ai-refactoring' },
  { id: 'ai-refactoring--codemods-vs-ai', title: 'Codemods vs AI Refactors', parentId: 'ai-refactoring' },
  { id: 'ai-refactoring--review-discipline', title: 'Review Discipline for AI Refactors', parentId: 'ai-refactoring' },

  /* ---- ai-bug-fixing ---- */
  { id: 'ai-bug-fixing--triage-with-ai', title: 'Bug Triage With AI', parentId: 'ai-bug-fixing' },
  { id: 'ai-bug-fixing--rca-with-ai', title: 'Root Cause Analysis With AI', parentId: 'ai-bug-fixing' },
  { id: 'ai-bug-fixing--patch-generation', title: 'Patch Generation', parentId: 'ai-bug-fixing' },
  { id: 'ai-bug-fixing--swe-bench-applied', title: 'SWE-Bench Applied to Real Repos', parentId: 'ai-bug-fixing' },
  { id: 'ai-bug-fixing--regression-prevention', title: 'Regression Prevention', parentId: 'ai-bug-fixing' },

  /* ---- ai-documentation-gen ---- */
  { id: 'ai-documentation-gen--readme-generation', title: 'README Generation', parentId: 'ai-documentation-gen' },
  { id: 'ai-documentation-gen--docstring-generation', title: 'Docstring & Comment Generation', parentId: 'ai-documentation-gen' },
  { id: 'ai-documentation-gen--api-docs-generation', title: 'API Docs Generation', parentId: 'ai-documentation-gen' },
  { id: 'ai-documentation-gen--changelog-and-release-notes-ai', title: 'Changelog & Release Notes With AI', parentId: 'ai-documentation-gen' },
  { id: 'ai-documentation-gen--diagram-generation', title: 'Diagram Generation From Code', parentId: 'ai-documentation-gen' },
  { id: 'ai-documentation-gen--keeping-docs-in-sync', title: 'Keeping Docs in Sync With Code', parentId: 'ai-documentation-gen' },

  /* ---- ai-code-search-navigation ---- */
  { id: 'ai-code-search-navigation--semantic-search-overview', title: 'Semantic Code Search Overview', parentId: 'ai-code-search-navigation' },
  { id: 'ai-code-search-navigation--embedding-pipelines', title: 'Code Embedding Pipelines', parentId: 'ai-code-search-navigation' },
  { id: 'ai-code-search-navigation--rag-over-codebases', title: 'RAG Over Codebases', parentId: 'ai-code-search-navigation' },
  { id: 'ai-code-search-navigation--code-intelligence-2026', title: 'Code Intelligence Platforms (2026)', parentId: 'ai-code-search-navigation' },
  { id: 'ai-code-search-navigation--symbol-graph-augmented-rag', title: 'Symbol-Graph-Augmented RAG', parentId: 'ai-code-search-navigation' },
  { id: 'ai-code-search-navigation--cross-repo-search', title: 'Cross-Repo AI Search', parentId: 'ai-code-search-navigation' },

  /* ---- agentic-coding-2026 ---- */
  { id: 'agentic-coding-2026--what-is-agentic-coding', title: 'What Is Agentic Coding?', parentId: 'agentic-coding-2026' },
  { id: 'agentic-coding-2026--task-decomposition', title: 'Task Decomposition by Agents', parentId: 'agentic-coding-2026' },
  { id: 'agentic-coding-2026--planning-and-acting-loops', title: 'Plan-and-Act Loops', parentId: 'agentic-coding-2026' },
  { id: 'agentic-coding-2026--tool-use-mcp', title: 'Tool Use & MCP', parentId: 'agentic-coding-2026' },
  { id: 'agentic-coding-2026--memory-and-context', title: 'Agent Memory & Context', parentId: 'agentic-coding-2026' },
  { id: 'agentic-coding-2026--self-correction', title: 'Self-Correction Loops', parentId: 'agentic-coding-2026' },
  { id: 'agentic-coding-2026--human-in-the-loop', title: 'Human-in-the-Loop Patterns', parentId: 'agentic-coding-2026' },
  { id: 'agentic-coding-2026--multi-agent-systems', title: 'Multi-Agent Coding Systems', parentId: 'agentic-coding-2026' },

  /* ---- background-coding-agents ---- */
  { id: 'background-coding-agents--what-they-are', title: 'What Background Coding Agents Are', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--devin-and-clones', title: 'Devin & Clones', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--cloud-agents', title: 'Cloud / Cursor Background Agents', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--copilot-workspace-agent', title: 'Copilot Workspace Agent', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--google-jules', title: 'Google Jules', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--openai-codex-agent', title: 'OpenAI Codex Agent', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--claude-code-agent', title: 'Claude Code Agent', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--running-issue-bots', title: 'Issue-Driven Background Bots', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--cost-and-leverage', title: 'Cost, Leverage & ROI', parentId: 'background-coding-agents' },
  { id: 'background-coding-agents--agent-anti-patterns', title: 'Background Agent Anti-Patterns', parentId: 'background-coding-agents' },

  /* ---- evals-for-coding-agents ---- */
  { id: 'evals-for-coding-agents--humaneval', title: 'HumanEval & HumanEval+', parentId: 'evals-for-coding-agents' },
  { id: 'evals-for-coding-agents--mbpp-and-similar', title: 'MBPP & Similar', parentId: 'evals-for-coding-agents' },
  { id: 'evals-for-coding-agents--swe-bench', title: 'SWE-Bench (Lite, Verified, Multimodal)', parentId: 'evals-for-coding-agents' },
  { id: 'evals-for-coding-agents--lcb', title: 'LiveCodeBench', parentId: 'evals-for-coding-agents' },
  { id: 'evals-for-coding-agents--terminal-bench', title: 'TerminalBench / RepoBench', parentId: 'evals-for-coding-agents' },
  { id: 'evals-for-coding-agents--internal-evals', title: 'Internal Coding Evals', parentId: 'evals-for-coding-agents' },
  { id: 'evals-for-coding-agents--eval-leaderboards-2026', title: 'Eval Leaderboards (2026)', parentId: 'evals-for-coding-agents' },
  { id: 'evals-for-coding-agents--eval-pitfalls', title: 'Eval Pitfalls (Contamination, Reward Hacking)', parentId: 'evals-for-coding-agents' },

  /* ---- ai-code-quality-trust ---- */
  { id: 'ai-code-quality-trust--verifying-ai-code', title: 'Verifying AI-Generated Code', parentId: 'ai-code-quality-trust' },
  { id: 'ai-code-quality-trust--attribution', title: 'Attribution of AI Contributions', parentId: 'ai-code-quality-trust' },
  { id: 'ai-code-quality-trust--license-and-ip-of-ai-code', title: 'License & IP of AI Code', parentId: 'ai-code-quality-trust' },
  { id: 'ai-code-quality-trust--hallucinations-in-coding', title: 'Hallucinations in Coding', parentId: 'ai-code-quality-trust' },
  { id: 'ai-code-quality-trust--security-of-ai-code', title: 'Security of AI Code', parentId: 'ai-code-quality-trust' },
  { id: 'ai-code-quality-trust--guardrails-and-policies', title: 'Guardrails & Org Policies', parentId: 'ai-code-quality-trust' },
  { id: 'ai-code-quality-trust--trust-calibration', title: 'Trust Calibration Discipline', parentId: 'ai-code-quality-trust' },

  /* ---- ai-coding-economics ---- */
  { id: 'ai-coding-economics--token-cost-models', title: 'Token Cost Models', parentId: 'ai-coding-economics' },
  { id: 'ai-coding-economics--seat-vs-usage-pricing-ai', title: 'Seat vs Usage Pricing', parentId: 'ai-coding-economics' },
  { id: 'ai-coding-economics--leverage-per-engineer', title: 'Leverage Per Engineer', parentId: 'ai-coding-economics' },
  { id: 'ai-coding-economics--roi-of-ai-tooling', title: 'ROI of AI Tooling', parentId: 'ai-coding-economics' },
  { id: 'ai-coding-economics--ai-budgeting', title: 'AI Budgeting in Engineering Orgs', parentId: 'ai-coding-economics' },
  { id: 'ai-coding-economics--vendor-lock-in-ai', title: 'Vendor Lock-In Considerations (AI)', parentId: 'ai-coding-economics' },
  { id: 'ai-coding-economics--hiring-and-headcount-impact', title: 'Hiring & Headcount Impact', parentId: 'ai-coding-economics' },

  /* ============================================================
   * STAGE 37 — Frontier Trends in Software Engineering (2026)
   * ============================================================ */

  /* ---- post-agile-engineering ---- */
  { id: 'post-agile-engineering--why-agile-fatigue', title: 'Why "Agile Fatigue"?', parentId: 'post-agile-engineering' },
  { id: 'post-agile-engineering--agile-is-dead-debate', title: '"Agile Is Dead" Debate (Dave Thomas)', parentId: 'post-agile-engineering' },
  { id: 'post-agile-engineering--shape-up-basecamp', title: 'Shape Up (Basecamp)', parentId: 'post-agile-engineering' },
  { id: 'post-agile-engineering--continuous-discovery', title: 'Continuous Discovery (Torres)', parentId: 'post-agile-engineering' },
  { id: 'post-agile-engineering--engineer-led-product-loops', title: 'Engineer-Led Product Loops', parentId: 'post-agile-engineering' },
  { id: 'post-agile-engineering--less-process-more-engineering', title: 'Less Process, More Engineering', parentId: 'post-agile-engineering' },

  /* ---- spec-driven-development ---- */
  { id: 'spec-driven-development--specs-as-source-of-truth', title: 'Specs as Source of Truth', parentId: 'spec-driven-development' },
  { id: 'spec-driven-development--karpathy-on-specs', title: 'Karpathy on Specs as the New Programming Surface', parentId: 'spec-driven-development' },
  { id: 'spec-driven-development--spec-driven-codegen', title: 'Spec-Driven Code Generation', parentId: 'spec-driven-development' },
  { id: 'spec-driven-development--spec-as-test-source', title: 'Spec as Source of Tests', parentId: 'spec-driven-development' },
  { id: 'spec-driven-development--executable-specs', title: 'Executable Specifications', parentId: 'spec-driven-development' },
  { id: 'spec-driven-development--spec-versioning', title: 'Spec Versioning & Evolution', parentId: 'spec-driven-development' },

  /* ---- product-engineering-mode ---- */
  { id: 'product-engineering-mode--what-is-product-engineering', title: 'What Is Product Engineering Mode?', parentId: 'product-engineering-mode' },
  { id: 'product-engineering-mode--full-stack-product-owners', title: 'Full-Stack Product Owners', parentId: 'product-engineering-mode' },
  { id: 'product-engineering-mode--missions-vs-features', title: 'Missions vs Features', parentId: 'product-engineering-mode' },
  { id: 'product-engineering-mode--rapid-experimentation', title: 'Rapid Experimentation', parentId: 'product-engineering-mode' },
  { id: 'product-engineering-mode--small-elite-teams', title: 'Small Elite Teams (Anthropic, OpenAI, Linear, Vercel)', parentId: 'product-engineering-mode' },

  /* ---- generative-engineering ---- */
  { id: 'generative-engineering--what-is-generative-engineering', title: 'What Is Generative Engineering?', parentId: 'generative-engineering' },
  { id: 'generative-engineering--end-to-end-generation', title: 'End-to-End Generation (UI, Code, Tests, Infra)', parentId: 'generative-engineering' },
  { id: 'generative-engineering--generative-vs-handcrafted', title: 'Generative vs Hand-Crafted', parentId: 'generative-engineering' },
  { id: 'generative-engineering--generation-quality-loops', title: 'Generation Quality Loops', parentId: 'generative-engineering' },
  { id: 'generative-engineering--generative-engineering-anti-patterns', title: 'Generative Engineering Anti-Patterns', parentId: 'generative-engineering' },

  /* ---- code-as-data ---- */
  { id: 'code-as-data--codebase-as-database', title: 'Codebase as Database', parentId: 'code-as-data' },
  { id: 'code-as-data--treesitter-and-asts-as-data', title: 'Tree-Sitter & ASTs as Data', parentId: 'code-as-data' },
  { id: 'code-as-data--codeql-as-data', title: 'CodeQL as Code Query Engine', parentId: 'code-as-data' },
  { id: 'code-as-data--code-graphs', title: 'Code Graphs & Symbol Indexes', parentId: 'code-as-data' },
  { id: 'code-as-data--queryable-codebases-2026', title: 'Queryable Codebases (2026)', parentId: 'code-as-data' },
  { id: 'code-as-data--ai-code-data-pipelines', title: 'AI Code-Data Pipelines', parentId: 'code-as-data' },

  /* ---- software-2-0-paradigm ---- */
  { id: 'software-2-0-paradigm--karpathy-software-2-0', title: 'Karpathy Software 2.0 (2017)', parentId: 'software-2-0-paradigm' },
  { id: 'software-2-0-paradigm--software-3-0-debate', title: 'Software 3.0 Debate', parentId: 'software-2-0-paradigm' },
  { id: 'software-2-0-paradigm--data-as-code', title: 'Data as Code', parentId: 'software-2-0-paradigm' },
  { id: 'software-2-0-paradigm--weights-as-code', title: 'Weights as Code', parentId: 'software-2-0-paradigm' },
  { id: 'software-2-0-paradigm--testing-software-2-0', title: 'Testing Software 2.0', parentId: 'software-2-0-paradigm' },
  { id: 'software-2-0-paradigm--debugging-software-2-0', title: 'Debugging Software 2.0', parentId: 'software-2-0-paradigm' },

  /* ---- end-of-traditional-coding-debate ---- */
  { id: 'end-of-traditional-coding-debate--will-ai-replace-coders', title: 'Will AI Replace Coders?', parentId: 'end-of-traditional-coding-debate' },
  { id: 'end-of-traditional-coding-debate--jensen-huang-quote', title: 'Jensen Huang "Don\'t Learn to Code" Quote', parentId: 'end-of-traditional-coding-debate' },
  { id: 'end-of-traditional-coding-debate--the-stop-coding-camp', title: 'The "Stop Coding" Camp', parentId: 'end-of-traditional-coding-debate' },
  { id: 'end-of-traditional-coding-debate--code-still-matters-camp', title: 'The "Code Still Matters" Camp', parentId: 'end-of-traditional-coding-debate' },
  { id: 'end-of-traditional-coding-debate--likely-2026-2030-trajectory', title: 'Likely 2026–2030 Trajectory', parentId: 'end-of-traditional-coding-debate' },

  /* ---- programming-by-example ---- */
  { id: 'programming-by-example--pbe-history', title: 'PbE History', parentId: 'programming-by-example' },
  { id: 'programming-by-example--flashfill-prose', title: 'FlashFill / PROSE (Microsoft)', parentId: 'programming-by-example' },
  { id: 'programming-by-example--demonstrational-interfaces', title: 'Demonstrational Interfaces', parentId: 'programming-by-example' },
  { id: 'programming-by-example--inductive-program-synthesis', title: 'Inductive Program Synthesis', parentId: 'programming-by-example' },
  { id: 'programming-by-example--neuro-symbolic-pbe-2026', title: 'Neuro-Symbolic PbE (2026)', parentId: 'programming-by-example' },

  /* ---- low-code-no-code-engineering ---- */
  { id: 'low-code-no-code-engineering--what-is-low-code', title: 'What Is Low-Code / No-Code?', parentId: 'low-code-no-code-engineering' },
  { id: 'low-code-no-code-engineering--platforms-overview', title: 'Platforms Overview (Power Platform, Mendix, OutSystems, Bubble, Retool)', parentId: 'low-code-no-code-engineering' },
  { id: 'low-code-no-code-engineering--citizen-developers', title: 'Citizen Developers', parentId: 'low-code-no-code-engineering' },
  { id: 'low-code-no-code-engineering--engineering-discipline-low-code', title: 'Engineering Discipline in Low-Code', parentId: 'low-code-no-code-engineering' },
  { id: 'low-code-no-code-engineering--ai-low-code-2026', title: 'AI + Low-Code (2026)', parentId: 'low-code-no-code-engineering' },
  { id: 'low-code-no-code-engineering--low-code-anti-patterns', title: 'Low-Code Anti-Patterns', parentId: 'low-code-no-code-engineering' },

  /* ---- nl-programming ---- */
  { id: 'nl-programming--natural-language-as-source', title: 'Natural Language as Source Code', parentId: 'nl-programming' },
  { id: 'nl-programming--nl-vs-formal-spec', title: 'NL vs Formal Specs', parentId: 'nl-programming' },
  { id: 'nl-programming--ambiguity-and-determinism', title: 'Ambiguity & Determinism Problems', parentId: 'nl-programming' },
  { id: 'nl-programming--english-as-programming-language', title: '"English as Programming Language" Debate', parentId: 'nl-programming' },
  { id: 'nl-programming--polyglot-and-localized-programming', title: 'Polyglot & Localized Programming', parentId: 'nl-programming' },

  /* ---- type-safe-stacks-2026 ---- */
  { id: 'type-safe-stacks-2026--end-to-end-typesafety', title: 'End-to-End Type Safety', parentId: 'type-safe-stacks-2026' },
  { id: 'type-safe-stacks-2026--trpc-and-typesafe-rpc', title: 'tRPC & Type-Safe RPC', parentId: 'type-safe-stacks-2026' },
  { id: 'type-safe-stacks-2026--prisma-drizzle-effect', title: 'Prisma, Drizzle, Effect-TS', parentId: 'type-safe-stacks-2026' },
  { id: 'type-safe-stacks-2026--full-stack-frameworks-2026', title: 'Full-Stack Type-Safe Frameworks (2026)', parentId: 'type-safe-stacks-2026' },
  { id: 'type-safe-stacks-2026--rust-everywhere-trend', title: 'Rust-Everywhere Trend', parentId: 'type-safe-stacks-2026' },
  { id: 'type-safe-stacks-2026--ts-as-default-2026', title: 'TypeScript as Default (2026)', parentId: 'type-safe-stacks-2026' },

  /* ---- effect-systems-trends ---- */
  { id: 'effect-systems-trends--algebraic-effects', title: 'Algebraic Effects', parentId: 'effect-systems-trends' },
  { id: 'effect-systems-trends--effect-systems-in-rust', title: 'Effect Systems in Rust', parentId: 'effect-systems-trends' },
  { id: 'effect-systems-trends--effect-ts', title: 'Effect-TS', parentId: 'effect-systems-trends' },
  { id: 'effect-systems-trends--unison-and-koka', title: 'Unison & Koka', parentId: 'effect-systems-trends' },
  { id: 'effect-systems-trends--capabilities-instead-of-globals', title: 'Capabilities Instead of Globals', parentId: 'effect-systems-trends' },
  { id: 'effect-systems-trends--ocaml-5-effect-handlers', title: 'OCaml 5 Effect Handlers', parentId: 'effect-systems-trends' },

  /* ---- wasm-portable-runtimes ---- */
  { id: 'wasm-portable-runtimes--why-wasm-everywhere', title: 'Why WASM Everywhere?', parentId: 'wasm-portable-runtimes' },
  { id: 'wasm-portable-runtimes--wasi', title: 'WASI', parentId: 'wasm-portable-runtimes' },
  { id: 'wasm-portable-runtimes--wasm-component-model-frontier', title: 'WASM Component Model (Frontier View)', parentId: 'wasm-portable-runtimes' },
  { id: 'wasm-portable-runtimes--wasmtime-wasmer-wasmcloud', title: 'Wasmtime, Wasmer, wasmCloud', parentId: 'wasm-portable-runtimes' },
  { id: 'wasm-portable-runtimes--wasm-on-edge', title: 'WASM on Edge (Cloudflare, Fastly)', parentId: 'wasm-portable-runtimes' },
  { id: 'wasm-portable-runtimes--wasm-in-server-runtimes-2026', title: 'WASM in Server Runtimes (2026)', parentId: 'wasm-portable-runtimes' },
  { id: 'wasm-portable-runtimes--portable-engineering-impact', title: 'Portable Engineering Impact', parentId: 'wasm-portable-runtimes' },

  /* ---- platform-engineering-discipline ---- */
  { id: 'platform-engineering-discipline--platform-engineering-as-2026-specialty', title: 'Platform Engineering as a 2026 Specialty', parentId: 'platform-engineering-discipline' },
  { id: 'platform-engineering-discipline--platform-engineer-role', title: 'Platform Engineer Role', parentId: 'platform-engineering-discipline' },
  { id: 'platform-engineering-discipline--idp-as-product-frontier', title: 'IDP-as-Product (Frontier View)', parentId: 'platform-engineering-discipline' },
  { id: 'platform-engineering-discipline--platform-team-topologies', title: 'Platform Team Topologies', parentId: 'platform-engineering-discipline' },
  { id: 'platform-engineering-discipline--platform-engineering-vs-devops', title: 'Platform Engineering vs DevOps', parentId: 'platform-engineering-discipline' },
  { id: 'platform-engineering-discipline--platform-anti-patterns', title: 'Platform Engineering Anti-Patterns', parentId: 'platform-engineering-discipline' },

  /* ---- internal-ai-platforms-se ---- */
  { id: 'internal-ai-platforms-se--internal-llm-gateways', title: 'Internal LLM Gateways', parentId: 'internal-ai-platforms-se' },
  { id: 'internal-ai-platforms-se--internal-agent-platforms', title: 'Internal Agent Platforms', parentId: 'internal-ai-platforms-se' },
  { id: 'internal-ai-platforms-se--internal-rag-systems', title: 'Internal RAG Systems for Engineers', parentId: 'internal-ai-platforms-se' },
  { id: 'internal-ai-platforms-se--governance-and-policy', title: 'Governance & Policy for Internal AI', parentId: 'internal-ai-platforms-se' },
  { id: 'internal-ai-platforms-se--observability-of-ai-platforms', title: 'Observability of AI Platforms', parentId: 'internal-ai-platforms-se' },
  { id: 'internal-ai-platforms-se--internal-evaluation-harnesses', title: 'Internal Evaluation Harnesses', parentId: 'internal-ai-platforms-se' },

  /* ---- vibe-coding-debate ---- */
  { id: 'vibe-coding-debate--karpathy-vibe-coding', title: 'Karpathy "Vibe Coding" Term', parentId: 'vibe-coding-debate' },
  { id: 'vibe-coding-debate--what-vibe-coding-is', title: 'What Vibe Coding Is', parentId: 'vibe-coding-debate' },
  { id: 'vibe-coding-debate--when-it-works', title: 'When It Works', parentId: 'vibe-coding-debate' },
  { id: 'vibe-coding-debate--when-it-fails', title: 'When It Fails (Production, Security)', parentId: 'vibe-coding-debate' },
  { id: 'vibe-coding-debate--vibe-vs-discipline', title: 'Vibe vs Disciplined Engineering', parentId: 'vibe-coding-debate' },
  { id: 'vibe-coding-debate--implications-for-juniors', title: 'Implications for Junior Engineers', parentId: 'vibe-coding-debate' },

  /* ---- post-llm-engineering ---- */
  { id: 'post-llm-engineering--what-if-llms-plateau', title: 'What If LLMs Plateau?', parentId: 'post-llm-engineering' },
  { id: 'post-llm-engineering--scaling-laws-current-state', title: 'Scaling Laws — Current State', parentId: 'post-llm-engineering' },
  { id: 'post-llm-engineering--alternative-architectures', title: 'Alternative Architectures (Mamba, RWKV, JEPA)', parentId: 'post-llm-engineering' },
  { id: 'post-llm-engineering--neuro-symbolic-systems', title: 'Neuro-Symbolic Systems', parentId: 'post-llm-engineering' },
  { id: 'post-llm-engineering--world-models-and-planning', title: 'World Models & Planning', parentId: 'post-llm-engineering' },
  { id: 'post-llm-engineering--engineering-after-agi-debate', title: 'Engineering After AGI (Debate)', parentId: 'post-llm-engineering' },

  /* ---- formal-methods-renaissance ---- */
  { id: 'formal-methods-renaissance--why-renaissance', title: 'Why a Formal Methods Renaissance?', parentId: 'formal-methods-renaissance' },
  { id: 'formal-methods-renaissance--ai-aided-proofs', title: 'AI-Aided Proofs (Lean, Coq)', parentId: 'formal-methods-renaissance' },
  { id: 'formal-methods-renaissance--auto-tla-generation', title: 'Auto TLA+ Generation', parentId: 'formal-methods-renaissance' },
  { id: 'formal-methods-renaissance--verified-llms', title: 'Verified LLM-Generated Code', parentId: 'formal-methods-renaissance' },
  { id: 'formal-methods-renaissance--proof-carrying-code', title: 'Proof-Carrying Code', parentId: 'formal-methods-renaissance' },
  { id: 'formal-methods-renaissance--end-to-end-verification', title: 'End-to-End Verified Stacks', parentId: 'formal-methods-renaissance' },

  /* ---- engineering-and-policy-2026 ---- */
  { id: 'engineering-and-policy-2026--eu-ai-act-engineer-impact', title: 'EU AI Act — Engineer Impact', parentId: 'engineering-and-policy-2026' },
  { id: 'engineering-and-policy-2026--eu-cyber-resilience-act', title: 'EU Cyber Resilience Act', parentId: 'engineering-and-policy-2026' },
  { id: 'engineering-and-policy-2026--us-software-liability', title: 'US Software Liability Discussions', parentId: 'engineering-and-policy-2026' },
  { id: 'engineering-and-policy-2026--secure-by-design-mandates', title: 'Secure-by-Design Mandates (CISA)', parentId: 'engineering-and-policy-2026' },
  { id: 'engineering-and-policy-2026--data-residency-laws', title: 'Data Residency Laws', parentId: 'engineering-and-policy-2026' },
  { id: 'engineering-and-policy-2026--export-controls-and-software', title: 'Export Controls & Software', parentId: 'engineering-and-policy-2026' },
  { id: 'engineering-and-policy-2026--engineer-role-in-policy', title: 'Engineer Role in Policy & Standards', parentId: 'engineering-and-policy-2026' },

  /* ---- sustainable-software-engineering ---- */
  { id: 'sustainable-software-engineering--green-software-foundation', title: 'Green Software Foundation', parentId: 'sustainable-software-engineering' },
  { id: 'sustainable-software-engineering--sci-score', title: 'SCI (Software Carbon Intensity)', parentId: 'sustainable-software-engineering' },
  { id: 'sustainable-software-engineering--carbon-aware-computing', title: 'Carbon-Aware Computing', parentId: 'sustainable-software-engineering' },
  { id: 'sustainable-software-engineering--green-coding-principles', title: 'Green Coding Principles', parentId: 'sustainable-software-engineering' },
  { id: 'sustainable-software-engineering--energy-efficient-engineering', title: 'Energy-Efficient Engineering Practices', parentId: 'sustainable-software-engineering' },
  { id: 'sustainable-software-engineering--ai-energy-cost-2026', title: 'AI Energy Cost (2026)', parentId: 'sustainable-software-engineering' },
  { id: 'sustainable-software-engineering--sustainability-reporting', title: 'Sustainability Reporting (CSRD)', parentId: 'sustainable-software-engineering' },
])
