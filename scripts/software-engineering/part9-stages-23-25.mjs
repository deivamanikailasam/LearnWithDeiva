/**
 * Part 9: subtopics + sub-subtopics for stages 23-25
 *   23. Software Quality Management & Standards
 *   24. Software Metrics & Measurement
 *   25. Software Security Engineering Process
 *
 * Run with: node scripts/software-engineering/part9-stages-23-25.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 23 — Software Quality Management & Standards
   * ============================================================ */

  /* ---- quality-management-fundamentals ---- */
  { id: 'quality-management-fundamentals--definition-of-quality', title: 'Definitions of Quality (Crosby, Juran, Deming, ISO)', parentId: 'quality-management-fundamentals' },
  { id: 'quality-management-fundamentals--qms-overview', title: 'QMS Overview', parentId: 'quality-management-fundamentals' },
  { id: 'quality-management-fundamentals--quality-policy', title: 'Quality Policy', parentId: 'quality-management-fundamentals' },
  { id: 'quality-management-fundamentals--quality-objectives', title: 'Quality Objectives', parentId: 'quality-management-fundamentals' },
  { id: 'quality-management-fundamentals--continuous-improvement', title: 'Continuous Improvement (Kaizen, PDCA)', parentId: 'quality-management-fundamentals' },
  { id: 'quality-management-fundamentals--garvin-quality-dimensions', title: 'Garvin’s 8 Dimensions of Quality', parentId: 'quality-management-fundamentals' },
  { id: 'quality-management-fundamentals--cost-of-quality-coq', title: 'Cost of Quality (Prevention, Appraisal, Failure)', parentId: 'quality-management-fundamentals' },

  /* ---- iso-25010 ---- */
  { id: 'iso-25010--overview', title: 'ISO/IEC 25010 Overview (and 25010:2023)', parentId: 'iso-25010' },
  { id: 'iso-25010--functional-suitability', title: 'Functional Suitability', parentId: 'iso-25010' },
  { id: 'iso-25010--performance-efficiency', title: 'Performance Efficiency', parentId: 'iso-25010' },
  { id: 'iso-25010--compatibility', title: 'Compatibility', parentId: 'iso-25010' },
  { id: 'iso-25010--usability', title: 'Usability', parentId: 'iso-25010' },
  { id: 'iso-25010--reliability', title: 'Reliability', parentId: 'iso-25010' },
  { id: 'iso-25010--security', title: 'Security', parentId: 'iso-25010' },
  { id: 'iso-25010--maintainability', title: 'Maintainability', parentId: 'iso-25010' },
  { id: 'iso-25010--portability', title: 'Portability', parentId: 'iso-25010' },
  { id: 'iso-25010--flexibility-2023', title: 'Flexibility (added in 25010:2023)', parentId: 'iso-25010' },
  { id: 'iso-25010--safety-2023', title: 'Safety (added in 25010:2023)', parentId: 'iso-25010' },
  { id: 'iso-25010--quality-in-use-25011', title: 'Quality in Use (ISO/IEC 25011)', parentId: 'iso-25010' },
  { id: 'iso-25010--data-quality-25012', title: 'Data Quality (ISO/IEC 25012)', parentId: 'iso-25010' },

  /* ---- iso-9126-legacy ---- */
  { id: 'iso-9126-legacy--history', title: 'ISO/IEC 9126 History', parentId: 'iso-9126-legacy' },
  { id: 'iso-9126-legacy--six-characteristics', title: 'Six Characteristics & Sub-Characteristics', parentId: 'iso-9126-legacy' },
  { id: 'iso-9126-legacy--external-internal-quality', title: 'External, Internal & Quality-in-Use Models', parentId: 'iso-9126-legacy' },
  { id: 'iso-9126-legacy--mapping-to-25010', title: 'Mapping 9126 → 25010', parentId: 'iso-9126-legacy' },

  /* ---- iso-iec-ieee-12207 ---- */
  { id: 'iso-iec-ieee-12207--overview', title: 'ISO/IEC/IEEE 12207 Overview', parentId: 'iso-iec-ieee-12207' },
  { id: 'iso-iec-ieee-12207--agreement-processes', title: 'Agreement Processes', parentId: 'iso-iec-ieee-12207' },
  { id: 'iso-iec-ieee-12207--organizational-project-enabling', title: 'Organizational Project-Enabling Processes', parentId: 'iso-iec-ieee-12207' },
  { id: 'iso-iec-ieee-12207--technical-management-processes', title: 'Technical Management Processes', parentId: 'iso-iec-ieee-12207' },
  { id: 'iso-iec-ieee-12207--technical-processes', title: 'Technical Processes', parentId: 'iso-iec-ieee-12207' },
  { id: 'iso-iec-ieee-12207--tailoring', title: 'Tailoring 12207', parentId: 'iso-iec-ieee-12207' },

  /* ---- iso-iec-ieee-15288 ---- */
  { id: 'iso-iec-ieee-15288--overview', title: 'ISO/IEC/IEEE 15288 Overview', parentId: 'iso-iec-ieee-15288' },
  { id: 'iso-iec-ieee-15288--system-lifecycle-processes', title: 'System Lifecycle Processes', parentId: 'iso-iec-ieee-15288' },
  { id: 'iso-iec-ieee-15288--12207-vs-15288', title: '12207 vs 15288 Differences', parentId: 'iso-iec-ieee-15288' },
  { id: 'iso-iec-ieee-15288--tailoring-15288', title: 'Tailoring 15288', parentId: 'iso-iec-ieee-15288' },

  /* ---- cmmi-overview ---- */
  { id: 'cmmi-overview--cmmi-history', title: 'CMMI History (SW-CMM → CMMI)', parentId: 'cmmi-overview' },
  { id: 'cmmi-overview--cmmi-development-services-acquisition', title: 'CMMI for Development, Services & Acquisition', parentId: 'cmmi-overview' },
  { id: 'cmmi-overview--cmmi-2-0-and-3-0', title: 'CMMI 2.0 & 3.0 Updates', parentId: 'cmmi-overview' },
  { id: 'cmmi-overview--maturity-levels', title: 'Maturity Levels (1–5)', parentId: 'cmmi-overview' },
  { id: 'cmmi-overview--capability-levels', title: 'Capability Levels', parentId: 'cmmi-overview' },
  { id: 'cmmi-overview--process-areas', title: 'Process Areas', parentId: 'cmmi-overview' },
  { id: 'cmmi-overview--scampi-appraisals', title: 'SCAMPI Appraisals', parentId: 'cmmi-overview' },
  { id: 'cmmi-overview--cmmi-criticisms', title: 'CMMI Criticisms', parentId: 'cmmi-overview' },

  /* ---- iso-15504-spice ---- */
  { id: 'iso-15504-spice--history', title: 'SPICE History', parentId: 'iso-15504-spice' },
  { id: 'iso-15504-spice--process-reference-model', title: 'Process Reference Model', parentId: 'iso-15504-spice' },
  { id: 'iso-15504-spice--process-assessment-model', title: 'Process Assessment Model', parentId: 'iso-15504-spice' },
  { id: 'iso-15504-spice--capability-levels', title: 'Capability Levels (0–5)', parentId: 'iso-15504-spice' },
  { id: 'iso-15504-spice--iso-iec-33000-series', title: 'ISO/IEC 33000 Series (Successor)', parentId: 'iso-15504-spice' },

  /* ---- six-sigma-software ---- */
  { id: 'six-sigma-software--six-sigma-fundamentals', title: 'Six Sigma Fundamentals', parentId: 'six-sigma-software' },
  { id: 'six-sigma-software--dmaic', title: 'DMAIC', parentId: 'six-sigma-software' },
  { id: 'six-sigma-software--dmadv', title: 'DMADV / DFSS', parentId: 'six-sigma-software' },
  { id: 'six-sigma-software--belts', title: 'Yellow / Green / Black Belts', parentId: 'six-sigma-software' },
  { id: 'six-sigma-software--lean-six-sigma', title: 'Lean Six Sigma', parentId: 'six-sigma-software' },
  { id: 'six-sigma-software--six-sigma-in-software-debate', title: 'Six Sigma in Software (Debate)', parentId: 'six-sigma-software' },

  /* ---- tqm-software ---- */
  { id: 'tqm-software--tqm-history-deming', title: 'TQM History (Deming, Juran, Ishikawa)', parentId: 'tqm-software' },
  { id: 'tqm-software--deming-14-points', title: 'Deming’s 14 Points', parentId: 'tqm-software' },
  { id: 'tqm-software--seven-quality-tools', title: 'Seven Basic Quality Tools', parentId: 'tqm-software' },
  { id: 'tqm-software--ishikawa-fishbone', title: 'Ishikawa / Fishbone Diagrams', parentId: 'tqm-software' },
  { id: 'tqm-software--tqm-in-software-orgs', title: 'TQM in Software Orgs', parentId: 'tqm-software' },

  /* ---- ieee-software-standards ---- */
  { id: 'ieee-software-standards--ieee-730-sqa-plans', title: 'IEEE 730 (SQA Plans)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--ieee-829-test-docs', title: 'IEEE 829 (Test Documentation)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--ieee-830-srs', title: 'IEEE 830 (SRS)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--ieee-1012-vv', title: 'IEEE 1012 (V&V)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--ieee-1016-design-descriptions', title: 'IEEE 1016 (Software Design Descriptions)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--ieee-1028-reviews', title: 'IEEE 1028 (Reviews & Audits)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--ieee-1471-architecture', title: 'IEEE 1471 / ISO 42010 (Architecture Descriptions)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--ieee-29148-requirements', title: 'IEEE 29148 (Requirements Engineering)', parentId: 'ieee-software-standards' },
  { id: 'ieee-software-standards--swebok-as-standard', title: 'SWEBOK as Standard', parentId: 'ieee-software-standards' },

  /* ============================================================
   * STAGE 24 — Software Metrics & Measurement
   * ============================================================ */

  /* ---- measurement-fundamentals ---- */
  { id: 'measurement-fundamentals--what-is-measurement', title: 'What Is Measurement?', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--scales-of-measurement', title: 'Scales (Nominal, Ordinal, Interval, Ratio)', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--validity-and-reliability', title: 'Validity & Reliability of Metrics', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--metric-vs-indicator-vs-kpi', title: 'Metric vs Indicator vs KPI', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--leading-vs-lagging', title: 'Leading vs Lagging Indicators', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--goodharts-law', title: 'Goodhart’s Law', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--how-to-measure-anything', title: '"How to Measure Anything" (Hubbard)', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--practical-software-measurement', title: 'PSM (Practical Software Measurement)', parentId: 'measurement-fundamentals' },
  { id: 'measurement-fundamentals--isoiec-15939', title: 'ISO/IEC 15939 Measurement Process', parentId: 'measurement-fundamentals' },

  /* ---- product-metrics ---- */
  { id: 'product-metrics--size-as-product-metric', title: 'Size Metrics', parentId: 'product-metrics' },
  { id: 'product-metrics--complexity-as-product-metric', title: 'Complexity Metrics', parentId: 'product-metrics' },
  { id: 'product-metrics--quality-attribute-metrics', title: 'Quality-Attribute Metrics', parentId: 'product-metrics' },
  { id: 'product-metrics--structural-metrics', title: 'Structural Metrics', parentId: 'product-metrics' },
  { id: 'product-metrics--design-metrics', title: 'Design Metrics', parentId: 'product-metrics' },

  /* ---- process-metrics ---- */
  { id: 'process-metrics--process-efficiency', title: 'Process Efficiency', parentId: 'process-metrics' },
  { id: 'process-metrics--throughput-process', title: 'Throughput', parentId: 'process-metrics' },
  { id: 'process-metrics--lead-time-process', title: 'Lead Time', parentId: 'process-metrics' },
  { id: 'process-metrics--cycle-time-process', title: 'Cycle Time', parentId: 'process-metrics' },
  { id: 'process-metrics--defect-removal-efficiency', title: 'Defect Removal Efficiency (DRE)', parentId: 'process-metrics' },
  { id: 'process-metrics--rework-percent', title: 'Rework Percentage', parentId: 'process-metrics' },

  /* ---- project-metrics ---- */
  { id: 'project-metrics--effort-metrics', title: 'Effort Metrics', parentId: 'project-metrics' },
  { id: 'project-metrics--cost-metrics', title: 'Cost Metrics', parentId: 'project-metrics' },
  { id: 'project-metrics--schedule-metrics', title: 'Schedule Metrics', parentId: 'project-metrics' },
  { id: 'project-metrics--evm-metrics', title: 'EVM Metrics (Project View)', parentId: 'project-metrics' },
  { id: 'project-metrics--milestone-attainment', title: 'Milestone Attainment', parentId: 'project-metrics' },

  /* ---- size-metrics-loc-fp ---- */
  { id: 'size-metrics-loc-fp--loc-physical', title: 'Physical LOC', parentId: 'size-metrics-loc-fp' },
  { id: 'size-metrics-loc-fp--loc-logical', title: 'Logical LOC', parentId: 'size-metrics-loc-fp' },
  { id: 'size-metrics-loc-fp--sloc-tools', title: 'SLOC Counting Tools (cloc, scc, tokei)', parentId: 'size-metrics-loc-fp' },
  { id: 'size-metrics-loc-fp--loc-criticisms', title: 'LOC Criticisms', parentId: 'size-metrics-loc-fp' },
  { id: 'size-metrics-loc-fp--function-points-as-size', title: 'Function Points as Size', parentId: 'size-metrics-loc-fp' },
  { id: 'size-metrics-loc-fp--story-points-as-size', title: 'Story Points as Size', parentId: 'size-metrics-loc-fp' },
  { id: 'size-metrics-loc-fp--token-metrics-2026', title: 'Token / AI-Era Size Metrics (2026)', parentId: 'size-metrics-loc-fp' },

  /* ---- complexity-metrics ---- */
  { id: 'complexity-metrics--cyclomatic-overview', title: 'Cyclomatic Complexity (Overview)', parentId: 'complexity-metrics' },
  { id: 'complexity-metrics--cognitive-complexity-metric', title: 'Cognitive Complexity (SonarSource)', parentId: 'complexity-metrics' },
  { id: 'complexity-metrics--npath-complexity', title: 'NPath Complexity', parentId: 'complexity-metrics' },
  { id: 'complexity-metrics--essential-complexity', title: 'Essential Complexity', parentId: 'complexity-metrics' },
  { id: 'complexity-metrics--design-complexity', title: 'Design Complexity', parentId: 'complexity-metrics' },
  { id: 'complexity-metrics--integration-complexity', title: 'Integration Complexity', parentId: 'complexity-metrics' },

  /* ---- cyclomatic-complexity ---- */
  { id: 'cyclomatic-complexity--mccabe-1976', title: 'McCabe (1976) Original Paper', parentId: 'cyclomatic-complexity' },
  { id: 'cyclomatic-complexity--computation', title: 'Computing CC (Edges, Nodes, P)', parentId: 'cyclomatic-complexity' },
  { id: 'cyclomatic-complexity--thresholds', title: 'Thresholds (10, 20, 50)', parentId: 'cyclomatic-complexity' },
  { id: 'cyclomatic-complexity--cc-vs-cognitive', title: 'CC vs Cognitive Complexity', parentId: 'cyclomatic-complexity' },
  { id: 'cyclomatic-complexity--limitations', title: 'CC Limitations', parentId: 'cyclomatic-complexity' },

  /* ---- halstead-metrics ---- */
  { id: 'halstead-metrics--operators-operands', title: 'Operators & Operands', parentId: 'halstead-metrics' },
  { id: 'halstead-metrics--vocabulary-and-length', title: 'Vocabulary & Length', parentId: 'halstead-metrics' },
  { id: 'halstead-metrics--volume', title: 'Volume', parentId: 'halstead-metrics' },
  { id: 'halstead-metrics--difficulty-and-effort', title: 'Difficulty & Effort', parentId: 'halstead-metrics' },
  { id: 'halstead-metrics--time-and-bugs', title: 'Estimated Time & Delivered Bugs', parentId: 'halstead-metrics' },
  { id: 'halstead-metrics--maintainability-index', title: 'Maintainability Index (MI)', parentId: 'halstead-metrics' },

  /* ---- coupling-cohesion-metrics ---- */
  { id: 'coupling-cohesion-metrics--ck-metrics-suite', title: 'Chidamber & Kemerer (CK) Suite', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--wmc', title: 'WMC (Weighted Methods per Class)', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--dit', title: 'DIT (Depth of Inheritance Tree)', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--noc', title: 'NOC (Number of Children)', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--cbo', title: 'CBO (Coupling Between Objects)', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--rfc', title: 'RFC (Response For a Class)', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--lcom', title: 'LCOM (Lack of Cohesion in Methods)', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--mood-metrics', title: 'MOOD Metrics (Abreu)', parentId: 'coupling-cohesion-metrics' },
  { id: 'coupling-cohesion-metrics--instability-and-abstractness', title: 'Instability & Abstractness (Martin)', parentId: 'coupling-cohesion-metrics' },

  /* ---- defect-metrics ---- */
  { id: 'defect-metrics--defect-density', title: 'Defect Density', parentId: 'defect-metrics' },
  { id: 'defect-metrics--defect-escape-rate', title: 'Defect Escape Rate', parentId: 'defect-metrics' },
  { id: 'defect-metrics--defect-removal-efficiency-defect', title: 'Defect Removal Efficiency', parentId: 'defect-metrics' },
  { id: 'defect-metrics--defect-arrival-rate', title: 'Defect Arrival Rate', parentId: 'defect-metrics' },
  { id: 'defect-metrics--defect-aging', title: 'Defect Aging', parentId: 'defect-metrics' },
  { id: 'defect-metrics--severity-and-priority', title: 'Severity & Priority Distributions', parentId: 'defect-metrics' },
  { id: 'defect-metrics--root-cause-distribution', title: 'Root Cause Distribution', parentId: 'defect-metrics' },
  { id: 'defect-metrics--orthogonal-defect-classification', title: 'Orthogonal Defect Classification (ODC)', parentId: 'defect-metrics' },

  /* ---- gqm-paradigm ---- */
  { id: 'gqm-paradigm--basili-history', title: 'Basili History', parentId: 'gqm-paradigm' },
  { id: 'gqm-paradigm--goal-question-metric-structure', title: 'Goal → Question → Metric Structure', parentId: 'gqm-paradigm' },
  { id: 'gqm-paradigm--gqm-plus-strategies', title: 'GQM+Strategies', parentId: 'gqm-paradigm' },
  { id: 'gqm-paradigm--applying-gqm', title: 'Applying GQM in Practice', parentId: 'gqm-paradigm' },

  /* ---- dora-metrics ---- */
  { id: 'dora-metrics--accelerate-book', title: 'Accelerate (Forsgren, Humble, Kim)', parentId: 'dora-metrics' },
  { id: 'dora-metrics--deployment-frequency', title: 'Deployment Frequency', parentId: 'dora-metrics' },
  { id: 'dora-metrics--lead-time-for-changes', title: 'Lead Time for Changes', parentId: 'dora-metrics' },
  { id: 'dora-metrics--change-failure-rate', title: 'Change Failure Rate', parentId: 'dora-metrics' },
  { id: 'dora-metrics--mttr', title: 'MTTR / Time to Restore', parentId: 'dora-metrics' },
  { id: 'dora-metrics--reliability-fifth-key-metric', title: 'Reliability (5th Key Metric)', parentId: 'dora-metrics' },
  { id: 'dora-metrics--state-of-devops-reports', title: 'State of DevOps Reports', parentId: 'dora-metrics' },
  { id: 'dora-metrics--dora-anti-patterns', title: 'DORA Anti-Patterns', parentId: 'dora-metrics' },

  /* ---- space-framework ---- */
  { id: 'space-framework--space-paper', title: 'SPACE Paper (Forsgren et al., 2021)', parentId: 'space-framework' },
  { id: 'space-framework--satisfaction-and-wellbeing', title: 'Satisfaction & Well-Being', parentId: 'space-framework' },
  { id: 'space-framework--performance', title: 'Performance', parentId: 'space-framework' },
  { id: 'space-framework--activity', title: 'Activity', parentId: 'space-framework' },
  { id: 'space-framework--communication-collaboration', title: 'Communication & Collaboration', parentId: 'space-framework' },
  { id: 'space-framework--efficiency-and-flow', title: 'Efficiency & Flow', parentId: 'space-framework' },
  { id: 'space-framework--three-dimension-rule', title: 'Three-Dimension Rule', parentId: 'space-framework' },

  /* ---- devex-core-metrics ---- */
  { id: 'devex-core-metrics--devex-paper-2023', title: 'DevEx Paper (Noda, Forsgren, 2023)', parentId: 'devex-core-metrics' },
  { id: 'devex-core-metrics--feedback-loops', title: 'Feedback Loops', parentId: 'devex-core-metrics' },
  { id: 'devex-core-metrics--cognitive-load-devex', title: 'Cognitive Load', parentId: 'devex-core-metrics' },
  { id: 'devex-core-metrics--flow-state', title: 'Flow State', parentId: 'devex-core-metrics' },
  { id: 'devex-core-metrics--devex-perception-vs-workflow', title: 'Perception vs Workflow Metrics', parentId: 'devex-core-metrics' },
  { id: 'devex-core-metrics--applying-devex-2026', title: 'Applying DevEx in 2026', parentId: 'devex-core-metrics' },

  /* ---- flow-metrics ---- */
  { id: 'flow-metrics--flow-framework-tasktop', title: 'Flow Framework (Kersten / Tasktop)', parentId: 'flow-metrics' },
  { id: 'flow-metrics--flow-velocity', title: 'Flow Velocity', parentId: 'flow-metrics' },
  { id: 'flow-metrics--flow-time', title: 'Flow Time', parentId: 'flow-metrics' },
  { id: 'flow-metrics--flow-load', title: 'Flow Load', parentId: 'flow-metrics' },
  { id: 'flow-metrics--flow-efficiency', title: 'Flow Efficiency', parentId: 'flow-metrics' },
  { id: 'flow-metrics--flow-distribution', title: 'Flow Distribution (Features, Defects, Risks, Debt)', parentId: 'flow-metrics' },

  /* ============================================================
   * STAGE 25 — Software Security Engineering Process
   * ============================================================ */

  /* ---- secure-sdlc ---- */
  { id: 'secure-sdlc--what-is-secure-sdlc', title: 'What Is a Secure SDLC?', parentId: 'secure-sdlc' },
  { id: 'secure-sdlc--ssdlc-phases', title: 'Phases of a Secure SDLC', parentId: 'secure-sdlc' },
  { id: 'secure-sdlc--shift-left-security', title: 'Shift-Left Security', parentId: 'secure-sdlc' },
  { id: 'secure-sdlc--shift-right-security', title: 'Shift-Right Security', parentId: 'secure-sdlc' },
  { id: 'secure-sdlc--devsecops-process-view', title: 'DevSecOps (Process View)', parentId: 'secure-sdlc' },
  { id: 'secure-sdlc--security-champions-program', title: 'Security Champions Program', parentId: 'secure-sdlc' },
  { id: 'secure-sdlc--security-training', title: 'Security Training for Engineers', parentId: 'secure-sdlc' },

  /* ---- security-requirements-engineering ---- */
  { id: 'security-requirements-engineering--abuse-misuse-cases', title: 'Abuse & Misuse Cases', parentId: 'security-requirements-engineering' },
  { id: 'security-requirements-engineering--security-user-stories', title: 'Security User Stories', parentId: 'security-requirements-engineering' },
  { id: 'security-requirements-engineering--evil-user-stories', title: 'Evil User Stories', parentId: 'security-requirements-engineering' },
  { id: 'security-requirements-engineering--asset-identification', title: 'Asset Identification', parentId: 'security-requirements-engineering' },
  { id: 'security-requirements-engineering--regulatory-mapping', title: 'Regulatory Requirements Mapping', parentId: 'security-requirements-engineering' },
  { id: 'security-requirements-engineering--owasp-asvs-as-requirements', title: 'OWASP ASVS as Requirements Source', parentId: 'security-requirements-engineering' },

  /* ---- threat-modeling-process ---- */
  { id: 'threat-modeling-process--what-is-threat-modeling', title: 'What Is Threat Modeling?', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--four-question-framework', title: 'Four-Question Framework (Shostack)', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--stride', title: 'STRIDE', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--dread', title: 'DREAD (and Why It Fell Out of Favor)', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--linddun', title: 'LINDDUN (Privacy)', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--pasta', title: 'PASTA', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--attack-trees', title: 'Attack Trees (Schneier)', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--attack-libraries', title: 'CAPEC & MITRE ATT&CK', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--data-flow-diagrams-tm', title: 'Data Flow Diagrams for Threat Modeling', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--threat-modeling-tools', title: 'Tools (MS TM Tool, OWASP TM, IriusRisk, ThreatModeler)', parentId: 'threat-modeling-process' },
  { id: 'threat-modeling-process--ai-threat-modeling-2026', title: 'AI-Assisted Threat Modeling (2026)', parentId: 'threat-modeling-process' },

  /* ---- secure-design-principles-se ---- */
  { id: 'secure-design-principles-se--least-privilege', title: 'Least Privilege', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--fail-secure', title: 'Fail Secure / Fail Safe', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--complete-mediation', title: 'Complete Mediation', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--economy-of-mechanism', title: 'Economy of Mechanism', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--open-design', title: 'Open Design', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--separation-of-privilege', title: 'Separation of Privilege', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--least-common-mechanism', title: 'Least Common Mechanism', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--psychological-acceptability', title: 'Psychological Acceptability', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--defense-in-depth', title: 'Defense in Depth', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--secure-defaults', title: 'Secure Defaults', parentId: 'secure-design-principles-se' },
  { id: 'secure-design-principles-se--zero-trust-design', title: 'Zero Trust Design Mindset', parentId: 'secure-design-principles-se' },

  /* ---- secure-coding-practices ---- */
  { id: 'secure-coding-practices--cert-secure-coding', title: 'CERT Secure Coding Standards', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--owasp-secure-coding', title: 'OWASP Secure Coding Practices', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--misra', title: 'MISRA C / C++ (Safety-Critical)', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--input-validation', title: 'Input Validation & Output Encoding', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--injection-prevention', title: 'Injection Prevention', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--memory-safety', title: 'Memory Safety (C/C++ → Rust shift)', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--safe-deserialization', title: 'Safe Deserialization', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--safe-error-handling', title: 'Safe Error Handling & Logging', parentId: 'secure-coding-practices' },
  { id: 'secure-coding-practices--secrets-handling', title: 'Secrets Handling in Code', parentId: 'secure-coding-practices' },

  /* ---- owasp-top-10 ---- */
  { id: 'owasp-top-10--history', title: 'OWASP Top 10 History', parentId: 'owasp-top-10' },
  { id: 'owasp-top-10--top10-2021', title: 'Top 10 (2021)', parentId: 'owasp-top-10' },
  { id: 'owasp-top-10--top10-2025-2026', title: 'Top 10 (2025/2026)', parentId: 'owasp-top-10' },
  { id: 'owasp-top-10--api-security-top-10', title: 'OWASP API Security Top 10', parentId: 'owasp-top-10' },
  { id: 'owasp-top-10--mobile-top-10', title: 'OWASP Mobile Top 10', parentId: 'owasp-top-10' },
  { id: 'owasp-top-10--llm-top-10-2026', title: 'OWASP Top 10 for LLM Apps (2026)', parentId: 'owasp-top-10' },
  { id: 'owasp-top-10--cicd-top-10', title: 'OWASP Top 10 CI/CD Security Risks', parentId: 'owasp-top-10' },

  /* ---- owasp-asvs ---- */
  { id: 'owasp-asvs--asvs-overview', title: 'ASVS Overview', parentId: 'owasp-asvs' },
  { id: 'owasp-asvs--asvs-levels', title: 'ASVS Levels (1, 2, 3)', parentId: 'owasp-asvs' },
  { id: 'owasp-asvs--asvs-categories', title: 'ASVS Categories', parentId: 'owasp-asvs' },
  { id: 'owasp-asvs--asvs-as-checklist', title: 'ASVS as Verification Checklist', parentId: 'owasp-asvs' },
  { id: 'owasp-asvs--mstg-mobile', title: 'OWASP MASVS / MSTG (Mobile)', parentId: 'owasp-asvs' },
  { id: 'owasp-asvs--asvs-5-2026', title: 'ASVS 5.0 (2026)', parentId: 'owasp-asvs' },

  /* ---- sast-dast-iast ---- */
  { id: 'sast-dast-iast--sast-process-view', title: 'SAST in the SDLC', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--dast-overview', title: 'DAST Overview', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--iast-overview', title: 'IAST Overview', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--rasp-process', title: 'RASP (Process View)', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--sca', title: 'SCA (Software Composition Analysis)', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--secret-scanning', title: 'Secret Scanning', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--container-image-scanning', title: 'Container Image Scanning', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--iac-scanning', title: 'IaC Scanning', parentId: 'sast-dast-iast' },
  { id: 'sast-dast-iast--ai-security-scanning-2026', title: 'AI-Augmented Security Scanning (2026)', parentId: 'sast-dast-iast' },

  /* ---- supply-chain-security-process ---- */
  { id: 'supply-chain-security-process--solarwinds-and-historical-attacks', title: 'SolarWinds & Historical Attacks', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--xz-utils-incident-2024', title: 'xz-utils Incident (2024)', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--dependency-confusion-process', title: 'Dependency Confusion (Process)', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--build-pipeline-integrity', title: 'Build Pipeline Integrity', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--signing-and-attestation', title: 'Signing & Attestation', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--sigstore', title: 'Sigstore (cosign, fulcio, rekor)', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--in-toto-process', title: 'in-toto Framework', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--ssdf-nist', title: 'NIST SSDF (SP 800-218)', parentId: 'supply-chain-security-process' },
  { id: 'supply-chain-security-process--cra-2026', title: 'EU Cyber Resilience Act (2026)', parentId: 'supply-chain-security-process' },

  /* ---- sbom-and-slsa ---- */
  { id: 'sbom-and-slsa--what-is-sbom', title: 'What Is an SBOM?', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--cyclonedx', title: 'CycloneDX', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--spdx', title: 'SPDX', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--swid', title: 'SWID Tags', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--sbom-generation-tools', title: 'SBOM Generation Tools (Syft, Trivy, cdxgen)', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--vex-documents', title: 'VEX Documents', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--slsa-overview', title: 'SLSA Overview', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--slsa-levels', title: 'SLSA Levels (1–4)', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--slsa-provenance', title: 'SLSA Provenance', parentId: 'sbom-and-slsa' },
  { id: 'sbom-and-slsa--ai-sbom-2026', title: 'AI-BOM / AI Model Provenance (2026)', parentId: 'sbom-and-slsa' },

  /* ---- vulnerability-management-process ---- */
  { id: 'vulnerability-management-process--cve', title: 'CVE (Common Vulnerabilities and Exposures)', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--cvss', title: 'CVSS Scoring (v3.1, v4.0)', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--epss', title: 'EPSS (Exploit Prediction Scoring System)', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--kev-catalog', title: 'CISA KEV Catalog', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--ssvc', title: 'SSVC (Stakeholder-Specific Vulnerability Categorization)', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--vulnerability-triage', title: 'Vulnerability Triage Workflow', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--patching-cadence', title: 'Patching Cadence & SLAs', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--coordinated-disclosure', title: 'Coordinated Disclosure / Bug Bounty', parentId: 'vulnerability-management-process' },
  { id: 'vulnerability-management-process--security-advisory-publishing', title: 'Publishing Security Advisories (GHSA, OSV)', parentId: 'vulnerability-management-process' },

  /* ---- microsoft-sdl ---- */
  { id: 'microsoft-sdl--history', title: 'Microsoft SDL History', parentId: 'microsoft-sdl' },
  { id: 'microsoft-sdl--practices', title: 'SDL Practices', parentId: 'microsoft-sdl' },
  { id: 'microsoft-sdl--training-requirements', title: 'Training Requirement', parentId: 'microsoft-sdl' },
  { id: 'microsoft-sdl--design-requirements', title: 'Design Requirements', parentId: 'microsoft-sdl' },
  { id: 'microsoft-sdl--implementation-practices', title: 'Implementation Practices', parentId: 'microsoft-sdl' },
  { id: 'microsoft-sdl--verification-practices', title: 'Verification Practices', parentId: 'microsoft-sdl' },
  { id: 'microsoft-sdl--release-and-response', title: 'Release & Response', parentId: 'microsoft-sdl' },
  { id: 'microsoft-sdl--sdl-for-agile', title: 'SDL for Agile', parentId: 'microsoft-sdl' },

  /* ---- bsimm-and-samm ---- */
  { id: 'bsimm-and-samm--bsimm-overview', title: 'BSIMM Overview', parentId: 'bsimm-and-samm' },
  { id: 'bsimm-and-samm--bsimm-domains', title: 'BSIMM 4 Domains & 12 Practices', parentId: 'bsimm-and-samm' },
  { id: 'bsimm-and-samm--bsimm-15-2026', title: 'BSIMM 15 (2026)', parentId: 'bsimm-and-samm' },
  { id: 'bsimm-and-samm--samm-overview', title: 'OWASP SAMM Overview', parentId: 'bsimm-and-samm' },
  { id: 'bsimm-and-samm--samm-business-functions', title: 'SAMM Business Functions', parentId: 'bsimm-and-samm' },
  { id: 'bsimm-and-samm--samm-security-practices', title: 'SAMM Security Practices', parentId: 'bsimm-and-samm' },
  { id: 'bsimm-and-samm--samm-maturity-levels', title: 'SAMM Maturity Levels', parentId: 'bsimm-and-samm' },
  { id: 'bsimm-and-samm--bsimm-vs-samm', title: 'BSIMM vs SAMM', parentId: 'bsimm-and-samm' },
])
