/**
 * Part 8: subtopics + sub-subtopics for stages 20-22
 *   20. Software Project Management for Engineers
 *   21. Software Estimation & Planning
 *   22. Risk Management in Software
 *
 * Run with: node scripts/software-engineering/part8-stages-20-22.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 20 — Software Project Management for Engineers
   * ============================================================ */

  /* ---- project-management-overview ---- */
  { id: 'project-management-overview--what-is-a-project', title: 'What Is a Project?', parentId: 'project-management-overview' },
  { id: 'project-management-overview--project-vs-program-vs-portfolio', title: 'Project vs Program vs Portfolio', parentId: 'project-management-overview' },
  { id: 'project-management-overview--triple-constraint', title: 'Triple Constraint (Scope/Time/Cost)', parentId: 'project-management-overview' },
  { id: 'project-management-overview--iron-triangle-quality', title: 'Iron Triangle With Quality', parentId: 'project-management-overview' },
  { id: 'project-management-overview--pmi-process-groups', title: 'PMI Process Groups', parentId: 'project-management-overview' },
  { id: 'project-management-overview--pmi-knowledge-areas', title: 'PMI Knowledge Areas', parentId: 'project-management-overview' },
  { id: 'project-management-overview--predictive-vs-adaptive', title: 'Predictive vs Adaptive Approaches', parentId: 'project-management-overview' },
  { id: 'project-management-overview--engineering-pm-vs-people-leadership', title: 'Engineering PM vs People Leadership', parentId: 'project-management-overview' },

  /* ---- engineering-project-lifecycle ---- */
  { id: 'engineering-project-lifecycle--initiation-phase', title: 'Initiation Phase', parentId: 'engineering-project-lifecycle' },
  { id: 'engineering-project-lifecycle--project-charter', title: 'Project Charter', parentId: 'engineering-project-lifecycle' },
  { id: 'engineering-project-lifecycle--planning-phase', title: 'Planning Phase', parentId: 'engineering-project-lifecycle' },
  { id: 'engineering-project-lifecycle--execution-phase', title: 'Execution Phase', parentId: 'engineering-project-lifecycle' },
  { id: 'engineering-project-lifecycle--monitoring-and-control', title: 'Monitoring & Control', parentId: 'engineering-project-lifecycle' },
  { id: 'engineering-project-lifecycle--closing-phase', title: 'Closing Phase', parentId: 'engineering-project-lifecycle' },
  { id: 'engineering-project-lifecycle--engineering-deliverables-by-phase', title: 'Engineering Deliverables by Phase', parentId: 'engineering-project-lifecycle' },

  /* ---- wbs-decomposition ---- */
  { id: 'wbs-decomposition--what-is-wbs', title: 'What Is a WBS?', parentId: 'wbs-decomposition' },
  { id: 'wbs-decomposition--100-percent-rule', title: '100% Rule', parentId: 'wbs-decomposition' },
  { id: 'wbs-decomposition--deliverable-vs-phase-vs-responsibility', title: 'Deliverable vs Phase vs Responsibility WBS', parentId: 'wbs-decomposition' },
  { id: 'wbs-decomposition--work-package', title: 'Work Package Definition', parentId: 'wbs-decomposition' },
  { id: 'wbs-decomposition--wbs-dictionary', title: 'WBS Dictionary', parentId: 'wbs-decomposition' },
  { id: 'wbs-decomposition--rolling-wave-planning', title: 'Rolling Wave Planning', parentId: 'wbs-decomposition' },
  { id: 'wbs-decomposition--wbs-anti-patterns', title: 'WBS Anti-Patterns', parentId: 'wbs-decomposition' },

  /* ---- gantt-and-pert ---- */
  { id: 'gantt-and-pert--gantt-chart-basics', title: 'Gantt Chart Basics', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--gantt-history-henry-gantt', title: 'History (Henry Gantt)', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--milestones-and-baselines', title: 'Milestones & Baselines on Gantt', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--task-dependencies', title: 'Task Dependencies (FS, SS, FF, SF)', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--lag-and-lead', title: 'Lag & Lead', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--pert-chart', title: 'PERT Chart', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--three-point-estimate', title: 'Three-Point Estimate (PERT)', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--pert-vs-cpm', title: 'PERT vs CPM Differences', parentId: 'gantt-and-pert' },
  { id: 'gantt-and-pert--gantt-tools', title: 'Gantt Tools (MS Project, Smartsheet, GitHub Projects, Linear, Jira Plans)', parentId: 'gantt-and-pert' },

  /* ---- critical-path-method ---- */
  { id: 'critical-path-method--what-is-cpm', title: 'What Is CPM?', parentId: 'critical-path-method' },
  { id: 'critical-path-method--forward-pass', title: 'Forward Pass (ES/EF)', parentId: 'critical-path-method' },
  { id: 'critical-path-method--backward-pass', title: 'Backward Pass (LS/LF)', parentId: 'critical-path-method' },
  { id: 'critical-path-method--total-float', title: 'Total Float', parentId: 'critical-path-method' },
  { id: 'critical-path-method--free-float', title: 'Free Float', parentId: 'critical-path-method' },
  { id: 'critical-path-method--near-critical-paths', title: 'Near-Critical Paths', parentId: 'critical-path-method' },
  { id: 'critical-path-method--crashing-and-fast-tracking', title: 'Crashing & Fast Tracking', parentId: 'critical-path-method' },
  { id: 'critical-path-method--critical-chain-method', title: 'Critical Chain Method (Goldratt)', parentId: 'critical-path-method' },

  /* ---- earned-value-management ---- */
  { id: 'earned-value-management--evm-basics', title: 'EVM Basics', parentId: 'earned-value-management' },
  { id: 'earned-value-management--planned-value', title: 'Planned Value (PV / BCWS)', parentId: 'earned-value-management' },
  { id: 'earned-value-management--earned-value', title: 'Earned Value (EV / BCWP)', parentId: 'earned-value-management' },
  { id: 'earned-value-management--actual-cost', title: 'Actual Cost (AC / ACWP)', parentId: 'earned-value-management' },
  { id: 'earned-value-management--sv-and-spi', title: 'Schedule Variance & SPI', parentId: 'earned-value-management' },
  { id: 'earned-value-management--cv-and-cpi', title: 'Cost Variance & CPI', parentId: 'earned-value-management' },
  { id: 'earned-value-management--bac-and-eac', title: 'BAC & EAC Forecasting', parentId: 'earned-value-management' },
  { id: 'earned-value-management--etc-and-vac', title: 'ETC & VAC', parentId: 'earned-value-management' },
  { id: 'earned-value-management--evm-in-agile', title: 'EVM in Agile (AgileEVM)', parentId: 'earned-value-management' },

  /* ---- progress-tracking ---- */
  { id: 'progress-tracking--burndown-chart', title: 'Burndown Charts', parentId: 'progress-tracking' },
  { id: 'progress-tracking--burnup-chart', title: 'Burnup Charts', parentId: 'progress-tracking' },
  { id: 'progress-tracking--cumulative-flow-diagram', title: 'Cumulative Flow Diagram (CFD)', parentId: 'progress-tracking' },
  { id: 'progress-tracking--cycle-time-tracking', title: 'Cycle Time Tracking', parentId: 'progress-tracking' },
  { id: 'progress-tracking--lead-time-tracking', title: 'Lead Time Tracking', parentId: 'progress-tracking' },
  { id: 'progress-tracking--throughput-tracking', title: 'Throughput Tracking', parentId: 'progress-tracking' },
  { id: 'progress-tracking--wip-aging-charts', title: 'WIP Aging Charts', parentId: 'progress-tracking' },
  { id: 'progress-tracking--velocity-tracking', title: 'Velocity Tracking', parentId: 'progress-tracking' },
  { id: 'progress-tracking--status-reporting-cadence', title: 'Status Reporting Cadence', parentId: 'progress-tracking' },
  { id: 'progress-tracking--ai-progress-summarization-2026', title: 'AI Progress Summarization (2026)', parentId: 'progress-tracking' },

  /* ---- pmbok-overview ---- */
  { id: 'pmbok-overview--pmbok-history', title: 'PMBOK History & Editions', parentId: 'pmbok-overview' },
  { id: 'pmbok-overview--pmbok-7-principles', title: 'PMBOK 7 Principles & Performance Domains', parentId: 'pmbok-overview' },
  { id: 'pmbok-overview--pmbok-process-groups-detail', title: 'Process Groups in Detail', parentId: 'pmbok-overview' },
  { id: 'pmbok-overview--pmbok-knowledge-areas-detail', title: 'Knowledge Areas in Detail', parentId: 'pmbok-overview' },
  { id: 'pmbok-overview--pmp-certification', title: 'PMP Certification', parentId: 'pmbok-overview' },
  { id: 'pmbok-overview--capm-certification', title: 'CAPM Certification', parentId: 'pmbok-overview' },
  { id: 'pmbok-overview--pmbok-vs-agile', title: 'PMBOK vs Agile Approaches', parentId: 'pmbok-overview' },

  /* ---- prince2-overview ---- */
  { id: 'prince2-overview--prince2-history', title: 'PRINCE2 History', parentId: 'prince2-overview' },
  { id: 'prince2-overview--prince2-7-principles', title: '7 Principles', parentId: 'prince2-overview' },
  { id: 'prince2-overview--prince2-7-themes', title: '7 Themes', parentId: 'prince2-overview' },
  { id: 'prince2-overview--prince2-7-processes', title: '7 Processes', parentId: 'prince2-overview' },
  { id: 'prince2-overview--prince2-tailoring', title: 'Tailoring PRINCE2', parentId: 'prince2-overview' },
  { id: 'prince2-overview--prince2-agile', title: 'PRINCE2 Agile', parentId: 'prince2-overview' },
  { id: 'prince2-overview--prince2-vs-pmbok', title: 'PRINCE2 vs PMBOK', parentId: 'prince2-overview' },

  /* ============================================================
   * STAGE 21 — Software Estimation & Planning
   * ============================================================ */

  /* ---- estimation-fundamentals ---- */
  { id: 'estimation-fundamentals--estimate-vs-target-vs-commitment', title: 'Estimate vs Target vs Commitment (McConnell)', parentId: 'estimation-fundamentals' },
  { id: 'estimation-fundamentals--cone-of-uncertainty', title: 'Cone of Uncertainty', parentId: 'estimation-fundamentals' },
  { id: 'estimation-fundamentals--accuracy-vs-precision', title: 'Accuracy vs Precision', parentId: 'estimation-fundamentals' },
  { id: 'estimation-fundamentals--ranges-and-confidence', title: 'Ranges & Confidence Intervals', parentId: 'estimation-fundamentals' },
  { id: 'estimation-fundamentals--estimation-purpose', title: 'Why We Estimate', parentId: 'estimation-fundamentals' },
  { id: 'estimation-fundamentals--noestimates-movement', title: '#NoEstimates Movement', parentId: 'estimation-fundamentals' },
  { id: 'estimation-fundamentals--mcconnell-software-estimation', title: 'McConnell "Software Estimation: Demystifying the Black Art"', parentId: 'estimation-fundamentals' },
  { id: 'estimation-fundamentals--ai-assisted-estimation-2026', title: 'AI-Assisted Estimation (2026)', parentId: 'estimation-fundamentals' },

  /* ---- expert-judgment-estimation ---- */
  { id: 'expert-judgment-estimation--definition', title: 'Definition & When to Use', parentId: 'expert-judgment-estimation' },
  { id: 'expert-judgment-estimation--wideband-delphi', title: 'Wideband Delphi', parentId: 'expert-judgment-estimation' },
  { id: 'expert-judgment-estimation--structured-elicitation', title: 'Structured Elicitation', parentId: 'expert-judgment-estimation' },
  { id: 'expert-judgment-estimation--biases-in-expert-estimates', title: 'Biases in Expert Estimates', parentId: 'expert-judgment-estimation' },

  /* ---- analogy-based-estimation ---- */
  { id: 'analogy-based-estimation--analogy-method', title: 'Analogy-Based Method', parentId: 'analogy-based-estimation' },
  { id: 'analogy-based-estimation--reference-class-forecasting', title: 'Reference-Class Forecasting (Kahneman)', parentId: 'analogy-based-estimation' },
  { id: 'analogy-based-estimation--inside-vs-outside-view', title: 'Inside View vs Outside View', parentId: 'analogy-based-estimation' },
  { id: 'analogy-based-estimation--historical-data-archives', title: 'Historical Data Archives', parentId: 'analogy-based-estimation' },

  /* ---- cocomo-models ---- */
  { id: 'cocomo-models--boehm-history', title: 'Boehm History (1981)', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-i-modes', title: 'COCOMO I Modes (Organic, Semidetached, Embedded)', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-i-equations', title: 'COCOMO I Equations', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-ii-overview', title: 'COCOMO II Overview', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-ii-stages', title: 'COCOMO II Stages (App Composition, Early Design, Post-Architecture)', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-ii-cost-drivers', title: 'COCOMO II Cost Drivers', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-ii-scale-factors', title: 'COCOMO II Scale Factors', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-iii-2024-2026', title: 'COCOMO III Updates (2024–2026)', parentId: 'cocomo-models' },
  { id: 'cocomo-models--cocomo-criticisms', title: 'COCOMO Criticisms', parentId: 'cocomo-models' },

  /* ---- function-point-analysis ---- */
  { id: 'function-point-analysis--albrecht-history', title: 'Albrecht History (1979)', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--ifpug-method', title: 'IFPUG Method', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--external-inputs', title: 'External Inputs', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--external-outputs', title: 'External Outputs', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--external-inquiries', title: 'External Inquiries', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--internal-logical-files', title: 'Internal Logical Files', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--external-interface-files', title: 'External Interface Files', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--complexity-weights', title: 'Complexity Weights', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--vaf-and-gscs', title: 'Value Adjustment Factor & GSCs', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--snap-non-functional', title: 'SNAP for Non-Functional Sizing', parentId: 'function-point-analysis' },
  { id: 'function-point-analysis--cosmic-fp', title: 'COSMIC Function Points (ISO/IEC 19761)', parentId: 'function-point-analysis' },

  /* ---- use-case-points ---- */
  { id: 'use-case-points--karner-method', title: 'Karner Method', parentId: 'use-case-points' },
  { id: 'use-case-points--unadjusted-actor-weight', title: 'Unadjusted Actor Weight (UAW)', parentId: 'use-case-points' },
  { id: 'use-case-points--unadjusted-use-case-weight', title: 'Unadjusted Use Case Weight (UUCW)', parentId: 'use-case-points' },
  { id: 'use-case-points--technical-complexity-factor', title: 'Technical Complexity Factor', parentId: 'use-case-points' },
  { id: 'use-case-points--environmental-factor', title: 'Environmental Factor', parentId: 'use-case-points' },
  { id: 'use-case-points--ucp-conversion', title: 'UCP → Effort Conversion', parentId: 'use-case-points' },

  /* ---- story-points-velocity ---- */
  { id: 'story-points-velocity--what-are-story-points', title: 'What Are Story Points?', parentId: 'story-points-velocity' },
  { id: 'story-points-velocity--fibonacci-scale', title: 'Modified Fibonacci Scale', parentId: 'story-points-velocity' },
  { id: 'story-points-velocity--relative-vs-absolute-sizing', title: 'Relative vs Absolute Sizing', parentId: 'story-points-velocity' },
  { id: 'story-points-velocity--velocity-calculation', title: 'Velocity Calculation', parentId: 'story-points-velocity' },
  { id: 'story-points-velocity--velocity-stability', title: 'Velocity Stability Over Time', parentId: 'story-points-velocity' },
  { id: 'story-points-velocity--velocity-anti-patterns', title: 'Velocity Anti-Patterns (Velocity-as-KPI)', parentId: 'story-points-velocity' },
  { id: 'story-points-velocity--story-points-vs-hours', title: 'Story Points vs Hours Debate', parentId: 'story-points-velocity' },

  /* ---- t-shirt-sizing ---- */
  { id: 't-shirt-sizing--xs-to-xxl', title: 'XS / S / M / L / XL / XXL Buckets', parentId: 't-shirt-sizing' },
  { id: 't-shirt-sizing--when-to-use', title: 'When to Use T-Shirt Sizing', parentId: 't-shirt-sizing' },
  { id: 't-shirt-sizing--portfolio-level-sizing', title: 'Portfolio-Level Sizing', parentId: 't-shirt-sizing' },
  { id: 't-shirt-sizing--t-shirt-anti-patterns', title: 'T-Shirt Sizing Anti-Patterns', parentId: 't-shirt-sizing' },

  /* ---- planning-poker ---- */
  { id: 'planning-poker--origins-grenning-cohn', title: 'Origins (Grenning, Cohn)', parentId: 'planning-poker' },
  { id: 'planning-poker--how-it-works', title: 'How Planning Poker Works', parentId: 'planning-poker' },
  { id: 'planning-poker--card-decks', title: 'Card Decks (Fibonacci, Powers of 2)', parentId: 'planning-poker' },
  { id: 'planning-poker--remote-tools', title: 'Remote Planning Poker Tools', parentId: 'planning-poker' },
  { id: 'planning-poker--anti-patterns', title: 'Planning Poker Anti-Patterns', parentId: 'planning-poker' },

  /* ---- monte-carlo-estimation ---- */
  { id: 'monte-carlo-estimation--monte-carlo-basics', title: 'Monte Carlo Basics', parentId: 'monte-carlo-estimation' },
  { id: 'monte-carlo-estimation--probabilistic-forecasting', title: 'Probabilistic Forecasting', parentId: 'monte-carlo-estimation' },
  { id: 'monte-carlo-estimation--throughput-based-forecasting', title: 'Throughput-Based Forecasting', parentId: 'monte-carlo-estimation' },
  { id: 'monte-carlo-estimation--cycle-time-based-forecasting', title: 'Cycle-Time-Based Forecasting', parentId: 'monte-carlo-estimation' },
  { id: 'monte-carlo-estimation--actionable-agile-tools', title: 'ActionableAgile & Similar Tools', parentId: 'monte-carlo-estimation' },
  { id: 'monte-carlo-estimation--how-many-and-when', title: '"How Many?" & "When?" Forecasts (Vacanti)', parentId: 'monte-carlo-estimation' },

  /* ---- estimation-pitfalls ---- */
  { id: 'estimation-pitfalls--optimism-bias', title: 'Optimism Bias', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--planning-fallacy', title: 'Planning Fallacy (Kahneman & Tversky)', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--anchoring-bias', title: 'Anchoring Bias', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--padding', title: 'Padding & Hidden Buffers', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--parkinson-law', title: 'Parkinson’s Law', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--student-syndrome', title: 'Student Syndrome', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--scope-creep', title: 'Scope Creep', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--single-point-estimates', title: 'Single-Point Estimates', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--commitment-as-estimate', title: 'Commitment Used as Estimate', parentId: 'estimation-pitfalls' },
  { id: 'estimation-pitfalls--re-estimation-discipline', title: 'Re-Estimation Discipline', parentId: 'estimation-pitfalls' },

  /* ============================================================
   * STAGE 22 — Risk Management in Software
   * ============================================================ */

  /* ---- risk-management-fundamentals ---- */
  { id: 'risk-management-fundamentals--definition', title: 'Definition of Risk', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--risk-vs-issue-vs-uncertainty', title: 'Risk vs Issue vs Uncertainty', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--threat-vs-opportunity', title: 'Threat vs Opportunity', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--known-vs-unknown', title: 'Known vs Unknown Risks', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--known-unknowns-vs-unknown-unknowns', title: 'Known Unknowns vs Unknown Unknowns', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--risk-appetite-and-tolerance', title: 'Risk Appetite & Tolerance', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--risk-management-process', title: 'Risk Management Process Overview', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--swebok-and-pmbok-risk', title: 'SWEBOK & PMBOK Risk Treatment', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--isoiec-31000', title: 'ISO 31000 Risk Management', parentId: 'risk-management-fundamentals' },
  { id: 'risk-management-fundamentals--boehm-risk-mgmt', title: 'Boehm "Software Risk Management" (1989)', parentId: 'risk-management-fundamentals' },

  /* ---- risk-identification ---- */
  { id: 'risk-identification--brainstorming', title: 'Brainstorming', parentId: 'risk-identification' },
  { id: 'risk-identification--checklist-analysis', title: 'Checklist Analysis', parentId: 'risk-identification' },
  { id: 'risk-identification--assumption-analysis', title: 'Assumption & Constraint Analysis', parentId: 'risk-identification' },
  { id: 'risk-identification--swot-analysis', title: 'SWOT Analysis', parentId: 'risk-identification' },
  { id: 'risk-identification--prompt-lists', title: 'Prompt Lists (PESTLE, TECOP, VUCA)', parentId: 'risk-identification' },
  { id: 'risk-identification--delphi-technique', title: 'Delphi Technique (Risk View)', parentId: 'risk-identification' },
  { id: 'risk-identification--root-cause-analysis-risks', title: 'Root Cause Analysis for Risks', parentId: 'risk-identification' },
  { id: 'risk-identification--premortem', title: 'Premortem (Klein)', parentId: 'risk-identification' },
  { id: 'risk-identification--ai-risk-discovery-2026', title: 'AI-Assisted Risk Discovery (2026)', parentId: 'risk-identification' },

  /* ---- risk-analysis-qualitative ---- */
  { id: 'risk-analysis-qualitative--probability-impact-matrix', title: 'Probability/Impact Matrix', parentId: 'risk-analysis-qualitative' },
  { id: 'risk-analysis-qualitative--risk-heat-map', title: 'Risk Heat Map', parentId: 'risk-analysis-qualitative' },
  { id: 'risk-analysis-qualitative--risk-categorization', title: 'Risk Categorization (RBS)', parentId: 'risk-analysis-qualitative' },
  { id: 'risk-analysis-qualitative--risk-urgency-assessment', title: 'Risk Urgency Assessment', parentId: 'risk-analysis-qualitative' },
  { id: 'risk-analysis-qualitative--data-quality-assessment', title: 'Data-Quality Assessment of Risks', parentId: 'risk-analysis-qualitative' },

  /* ---- risk-analysis-quantitative ---- */
  { id: 'risk-analysis-quantitative--expected-monetary-value', title: 'Expected Monetary Value (EMV)', parentId: 'risk-analysis-quantitative' },
  { id: 'risk-analysis-quantitative--decision-trees-risk', title: 'Decision Trees', parentId: 'risk-analysis-quantitative' },
  { id: 'risk-analysis-quantitative--monte-carlo-risk', title: 'Monte Carlo Risk Analysis', parentId: 'risk-analysis-quantitative' },
  { id: 'risk-analysis-quantitative--sensitivity-analysis', title: 'Sensitivity Analysis (Tornado Diagrams)', parentId: 'risk-analysis-quantitative' },
  { id: 'risk-analysis-quantitative--three-point-estimates-risk', title: 'Three-Point Estimates for Risk', parentId: 'risk-analysis-quantitative' },
  { id: 'risk-analysis-quantitative--bayesian-risk-models', title: 'Bayesian Risk Models', parentId: 'risk-analysis-quantitative' },

  /* ---- risk-mitigation-strategies ---- */
  { id: 'risk-mitigation-strategies--avoid', title: 'Avoid', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--transfer', title: 'Transfer', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--mitigate', title: 'Mitigate', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--accept', title: 'Accept (Active vs Passive)', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--exploit', title: 'Exploit (Opportunity)', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--enhance', title: 'Enhance (Opportunity)', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--share', title: 'Share (Opportunity)', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--contingency-plans', title: 'Contingency Plans', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--fallback-plans', title: 'Fallback Plans', parentId: 'risk-mitigation-strategies' },
  { id: 'risk-mitigation-strategies--workarounds', title: 'Workarounds', parentId: 'risk-mitigation-strategies' },

  /* ---- risk-monitoring ---- */
  { id: 'risk-monitoring--risk-reassessment', title: 'Risk Reassessment Cadence', parentId: 'risk-monitoring' },
  { id: 'risk-monitoring--risk-audits', title: 'Risk Audits', parentId: 'risk-monitoring' },
  { id: 'risk-monitoring--variance-trend-analysis', title: 'Variance & Trend Analysis', parentId: 'risk-monitoring' },
  { id: 'risk-monitoring--reserve-analysis', title: 'Reserve Analysis (Contingency & Management)', parentId: 'risk-monitoring' },
  { id: 'risk-monitoring--risk-triggers', title: 'Risk Triggers / Symptoms', parentId: 'risk-monitoring' },
  { id: 'risk-monitoring--risk-burndown', title: 'Risk Burndown Charts', parentId: 'risk-monitoring' },

  /* ---- risk-registers ---- */
  { id: 'risk-registers--risk-register-structure', title: 'Risk Register Structure', parentId: 'risk-registers' },
  { id: 'risk-registers--risk-id-and-title', title: 'Risk ID & Title', parentId: 'risk-registers' },
  { id: 'risk-registers--risk-statement-format', title: 'Risk Statement Format ("If…then…")', parentId: 'risk-registers' },
  { id: 'risk-registers--ownership-and-status', title: 'Ownership & Status', parentId: 'risk-registers' },
  { id: 'risk-registers--probability-impact-fields', title: 'Probability & Impact Fields', parentId: 'risk-registers' },
  { id: 'risk-registers--mitigation-and-contingency-fields', title: 'Mitigation & Contingency Fields', parentId: 'risk-registers' },
  { id: 'risk-registers--review-cadence', title: 'Review Cadence', parentId: 'risk-registers' },
  { id: 'risk-registers--risk-register-tools', title: 'Risk Register Tools', parentId: 'risk-registers' },

  /* ---- common-software-risks ---- */
  { id: 'common-software-risks--schedule-risks', title: 'Schedule Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--cost-risks', title: 'Cost Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--scope-risks', title: 'Scope / Requirements Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--technology-risks', title: 'Technology Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--team-risks', title: 'Team & Staffing Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--vendor-and-third-party-risks', title: 'Vendor & Third-Party Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--regulatory-and-compliance-risks', title: 'Regulatory & Compliance Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--security-risks', title: 'Security Risks (Project View)', parentId: 'common-software-risks' },
  { id: 'common-software-risks--performance-risks', title: 'Performance Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--integration-risks', title: 'Integration Risks', parentId: 'common-software-risks' },
  { id: 'common-software-risks--ai-and-ml-project-risks-2026', title: 'AI/ML Project Risks (2026)', parentId: 'common-software-risks' },
])
