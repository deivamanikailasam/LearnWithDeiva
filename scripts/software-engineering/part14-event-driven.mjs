/**
 * Part 14: Event-driven additions
 *   Stage 3 (Programming Paradigms):
 *     - event-driven-programming (NEW root)
 *     - dataflow-programming (NEW root)
 *   Stage 11 (Software Construction Practices):
 *     - event-driven-development-process (NEW root)
 *
 * These are strictly the code-level paradigm view (Stage 3) and the
 * engineering construction-process view (Stage 11). The architectural
 * Event-Driven Architecture (EDA) is covered in System Design & Architecture
 * and is intentionally NOT duplicated here.
 *
 * Run with: node scripts/software-engineering/part14-event-driven.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 3 — Event-Driven Programming (paradigm, code-level)
   * ============================================================ */
  { id: 'event-driven-programming--definition', title: 'Definition (Code-Level Paradigm)', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--vs-architectural-eda', title: 'Event-Driven Programming vs Event-Driven Architecture', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--vs-reactive-programming', title: 'Event-Driven Programming vs Reactive Programming', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--event-loop', title: 'Event Loop', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--callbacks', title: 'Callbacks', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--callback-hell', title: 'Callback Hell', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--observer-pattern-link', title: 'Observer Pattern (Code Link)', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--pub-sub-in-process', title: 'In-Process Pub/Sub', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--event-emitter-apis', title: 'Event Emitter APIs', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--gui-event-driven-programming', title: 'GUI Event-Driven Programming', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--node-js-runtime-model', title: 'Node.js Runtime Model', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--browser-event-model', title: 'Browser Event Model', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--async-await-relation', title: 'Relation to async/await', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--coroutines-and-fibers-relation', title: 'Relation to Coroutines & Fibers', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--reentrancy-and-locking', title: 'Reentrancy & Locking', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--ordering-and-timing', title: 'Ordering & Timing', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--debugging-event-driven-code', title: 'Debugging Event-Driven Code', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--testing-event-driven-code', title: 'Testing Event-Driven Code', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--state-machines-and-events', title: 'State Machines & Events', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--inversion-of-control-events', title: 'Inversion of Control via Events', parentId: 'event-driven-programming' },
  { id: 'event-driven-programming--anti-patterns', title: 'Event-Driven Programming Anti-Patterns', parentId: 'event-driven-programming' },

  /* ============================================================
   * STAGE 3 — Dataflow Programming (paradigm)
   * ============================================================ */
  { id: 'dataflow-programming--definition', title: 'Definition of Dataflow Programming', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--vs-control-flow', title: 'Dataflow vs Control Flow', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--directed-graphs-of-operators', title: 'Directed Graphs of Operators', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--push-vs-pull', title: 'Push vs Pull Dataflow', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--demand-driven-evaluation', title: 'Demand-Driven Evaluation', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--lucid-language', title: 'Lucid Language', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--labview', title: 'LabVIEW (Visual Dataflow)', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--apache-beam', title: 'Apache Beam (Pipeline Model)', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--apache-nifi-paradigm-view', title: 'Apache NiFi (Paradigm View)', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--ml-frameworks-as-dataflow', title: 'ML Frameworks as Dataflow (TensorFlow, PyTorch)', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--spreadsheets-as-dataflow', title: 'Spreadsheets as Dataflow', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--unix-pipes-as-dataflow', title: 'Unix Pipes as Dataflow', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--csp-link', title: 'Relation to CSP', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--reactive-vs-dataflow', title: 'Reactive vs Dataflow', parentId: 'dataflow-programming' },
  { id: 'dataflow-programming--anti-patterns', title: 'Dataflow Programming Anti-Patterns', parentId: 'dataflow-programming' },

  /* ============================================================
   * STAGE 11 — Event-Driven Development (engineering process)
   * ============================================================ */
  { id: 'event-driven-development-process--what-is-edd', title: 'What Is Event-Driven Development?', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--edd-vs-eda-vs-edp', title: 'EDD vs EDA vs Event-Driven Programming', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--events-first-mindset', title: 'Events-First Mindset (Construction View)', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--ubiquitous-event-vocabulary', title: 'Ubiquitous Event Vocabulary', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--domain-events-in-code', title: 'Modeling Domain Events in Code', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--event-naming-conventions-code', title: 'Event Naming Conventions (Code Level)', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--event-payload-discipline', title: 'Event Payload Discipline', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--idempotent-handlers', title: 'Idempotent Handlers', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--at-least-once-handler-discipline', title: 'At-Least-Once Handler Discipline', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--outbox-pattern-construction', title: 'Outbox Pattern (Construction View)', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--inbox-pattern-construction', title: 'Inbox Pattern (Construction View)', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--saga-construction-view', title: 'Saga Construction (Code View)', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--testing-event-handlers', title: 'Testing Event Handlers', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--contract-testing-events', title: 'Contract Testing for Events', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--testing-with-fakes-and-test-buses', title: 'Test Doubles & In-Memory Buses', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--observability-of-events', title: 'Observability of Events (Engineering Practice)', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--debugging-event-flows', title: 'Debugging Event Flows', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--versioning-events-engineering', title: 'Versioning Events (Engineering Practice)', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--evolving-event-schemas', title: 'Evolving Event Schemas Safely', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--documentation-for-events', title: 'Documentation for Events', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--review-checklist', title: 'Code Review Checklist for Event Code', parentId: 'event-driven-development-process' },
  { id: 'event-driven-development-process--anti-patterns', title: 'Event-Driven Development Anti-Patterns', parentId: 'event-driven-development-process' },
])
