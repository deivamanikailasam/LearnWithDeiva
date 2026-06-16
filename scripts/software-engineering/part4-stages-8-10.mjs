/**
 * Part 4: subtopics + sub-subtopics for stages 8-10
 *   8. Software Design Principles (Code-Level)
 *   9. Object-Oriented Analysis & Design
 *   10. Code-Level Design Patterns
 *
 * Run with: node scripts/software-engineering/part4-stages-8-10.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 8 — Software Design Principles (Code-Level)
   * ============================================================ */

  /* ---- design-principles-overview ---- */
  { id: 'design-principles-overview--why-principles', title: 'Why Design Principles?', parentId: 'design-principles-overview' },
  { id: 'design-principles-overview--principles-vs-patterns', title: 'Principles vs Patterns vs Practices', parentId: 'design-principles-overview' },
  { id: 'design-principles-overview--applicability', title: 'When Principles Apply', parentId: 'design-principles-overview' },
  { id: 'design-principles-overview--trade-offs', title: 'Trade-Offs Between Principles', parentId: 'design-principles-overview' },
  { id: 'design-principles-overview--principles-and-context', title: 'Principles in Context', parentId: 'design-principles-overview' },
  { id: 'design-principles-overview--principles-canon', title: 'Common Canon (SOLID, GRASP, DRY, KISS, YAGNI)', parentId: 'design-principles-overview' },
  { id: 'design-principles-overview--principles-vs-craftsmanship', title: 'Principles vs Software Craftsmanship', parentId: 'design-principles-overview' },

  /* ---- abstraction-encapsulation ---- */
  { id: 'abstraction-encapsulation--abstraction-fundamentals', title: 'Abstraction Fundamentals', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--levels-of-abstraction', title: 'Levels of Abstraction', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--data-abstraction', title: 'Data Abstraction', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--procedural-abstraction', title: 'Procedural Abstraction', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--encapsulation-fundamentals', title: 'Encapsulation Fundamentals', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--information-hiding', title: 'Information Hiding (Parnas)', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--leaky-abstractions', title: 'Leaky Abstractions (Spolsky)', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--ada-cliches', title: '"Wrong Abstraction" (Sandi Metz)', parentId: 'abstraction-encapsulation' },
  { id: 'abstraction-encapsulation--encapsulation-anti-patterns', title: 'Encapsulation Anti-Patterns', parentId: 'abstraction-encapsulation' },

  /* ---- modularity-cohesion-coupling ---- */
  { id: 'modularity-cohesion-coupling--modularity-fundamentals', title: 'Modularity Fundamentals', parentId: 'modularity-cohesion-coupling' },
  { id: 'modularity-cohesion-coupling--cohesion-fundamentals', title: 'Cohesion Fundamentals', parentId: 'modularity-cohesion-coupling' },
  { id: 'modularity-cohesion-coupling--types-of-cohesion', title: 'Types of Cohesion', parentId: 'modularity-cohesion-coupling',
    children: [
      { id: 'coincidental', title: 'Coincidental Cohesion' },
      { id: 'logical', title: 'Logical Cohesion' },
      { id: 'temporal', title: 'Temporal Cohesion' },
      { id: 'procedural', title: 'Procedural Cohesion' },
      { id: 'communicational', title: 'Communicational Cohesion' },
      { id: 'sequential', title: 'Sequential Cohesion' },
      { id: 'functional', title: 'Functional Cohesion' },
    ],
  },
  { id: 'modularity-cohesion-coupling--coupling-fundamentals', title: 'Coupling Fundamentals', parentId: 'modularity-cohesion-coupling' },
  { id: 'modularity-cohesion-coupling--types-of-coupling', title: 'Types of Coupling', parentId: 'modularity-cohesion-coupling',
    children: [
      { id: 'content', title: 'Content Coupling' },
      { id: 'common', title: 'Common Coupling' },
      { id: 'control', title: 'Control Coupling' },
      { id: 'stamp', title: 'Stamp (Data-Structure) Coupling' },
      { id: 'data', title: 'Data Coupling' },
      { id: 'message', title: 'Message Coupling' },
      { id: 'no-coupling', title: 'No Coupling' },
    ],
  },
  { id: 'modularity-cohesion-coupling--high-cohesion-low-coupling', title: 'High Cohesion, Low Coupling', parentId: 'modularity-cohesion-coupling' },
  { id: 'modularity-cohesion-coupling--connascence', title: 'Connascence', parentId: 'modularity-cohesion-coupling' },
  { id: 'modularity-cohesion-coupling--anti-patterns', title: 'Modularity Anti-Patterns', parentId: 'modularity-cohesion-coupling' },

  /* ---- separation-of-concerns ---- */
  { id: 'separation-of-concerns--what-is-soc', title: 'What Is Separation of Concerns?', parentId: 'separation-of-concerns' },
  { id: 'separation-of-concerns--dijkstra-soc', title: 'Dijkstra on Separation of Concerns', parentId: 'separation-of-concerns' },
  { id: 'separation-of-concerns--soc-and-encapsulation', title: 'SoC vs Encapsulation', parentId: 'separation-of-concerns' },
  { id: 'separation-of-concerns--soc-in-layers', title: 'SoC in Layers (Code-Level)', parentId: 'separation-of-concerns' },
  { id: 'separation-of-concerns--soc-anti-patterns', title: 'SoC Anti-Patterns', parentId: 'separation-of-concerns' },

  /* ---- single-responsibility ---- */
  { id: 'single-responsibility--definition', title: 'SRP Definition', parentId: 'single-responsibility' },
  { id: 'single-responsibility--reason-to-change', title: '"One Reason to Change"', parentId: 'single-responsibility' },
  { id: 'single-responsibility--actor-redefinition', title: 'Actor-Based Redefinition (Martin 2017)', parentId: 'single-responsibility' },
  { id: 'single-responsibility--examples', title: 'SRP Examples', parentId: 'single-responsibility' },
  { id: 'single-responsibility--violations', title: 'SRP Violations', parentId: 'single-responsibility' },
  { id: 'single-responsibility--applying-srp', title: 'Applying SRP in Practice', parentId: 'single-responsibility' },

  /* ---- open-closed-principle ---- */
  { id: 'open-closed-principle--meyer-vs-martin', title: 'Meyer vs Martin Definitions', parentId: 'open-closed-principle' },
  { id: 'open-closed-principle--polymorphic-extension', title: 'Polymorphic Extension', parentId: 'open-closed-principle' },
  { id: 'open-closed-principle--strategy-pattern-link', title: 'OCP and Strategy Pattern', parentId: 'open-closed-principle' },
  { id: 'open-closed-principle--examples', title: 'OCP Examples', parentId: 'open-closed-principle' },
  { id: 'open-closed-principle--violations', title: 'OCP Violations', parentId: 'open-closed-principle' },

  /* ---- liskov-substitution ---- */
  { id: 'liskov-substitution--liskov-paper', title: 'Liskov & Wing 1994 Paper', parentId: 'liskov-substitution' },
  { id: 'liskov-substitution--behavioral-subtyping', title: 'Behavioral Subtyping', parentId: 'liskov-substitution' },
  { id: 'liskov-substitution--preconditions-postconditions', title: 'Preconditions & Postconditions', parentId: 'liskov-substitution' },
  { id: 'liskov-substitution--invariants', title: 'Class Invariants', parentId: 'liskov-substitution' },
  { id: 'liskov-substitution--history-constraint', title: 'History Constraint', parentId: 'liskov-substitution' },
  { id: 'liskov-substitution--circle-ellipse-square-rect', title: 'Circle-Ellipse / Square-Rectangle Problem', parentId: 'liskov-substitution' },
  { id: 'liskov-substitution--violations', title: 'LSP Violations', parentId: 'liskov-substitution' },

  /* ---- interface-segregation ---- */
  { id: 'interface-segregation--definition', title: 'ISP Definition', parentId: 'interface-segregation' },
  { id: 'interface-segregation--fat-interfaces', title: 'Fat Interfaces', parentId: 'interface-segregation' },
  { id: 'interface-segregation--role-interfaces', title: 'Role Interfaces (Fowler)', parentId: 'interface-segregation' },
  { id: 'interface-segregation--examples', title: 'ISP Examples', parentId: 'interface-segregation' },
  { id: 'interface-segregation--violations', title: 'ISP Violations', parentId: 'interface-segregation' },

  /* ---- dependency-inversion ---- */
  { id: 'dependency-inversion--definition', title: 'DIP Definition', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--abstractions-vs-concretions', title: 'Abstractions vs Concretions', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--dependency-injection', title: 'Dependency Injection (DI)', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--di-types', title: 'DI Types (Constructor, Setter, Method, Interface)', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--di-containers', title: 'DI Containers', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--service-locator', title: 'Service Locator (Anti-Pattern Debate)', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--ioc-vs-di', title: 'IoC vs DI', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--examples', title: 'DIP Examples', parentId: 'dependency-inversion' },
  { id: 'dependency-inversion--violations', title: 'DIP Violations', parentId: 'dependency-inversion' },

  /* ---- dry-principle ---- */
  { id: 'dry-principle--pragmatic-programmer', title: 'DRY in The Pragmatic Programmer', parentId: 'dry-principle' },
  { id: 'dry-principle--knowledge-vs-code-duplication', title: 'Knowledge vs Code Duplication', parentId: 'dry-principle' },
  { id: 'dry-principle--rule-of-three', title: 'Rule of Three', parentId: 'dry-principle' },
  { id: 'dry-principle--wet-vs-dry', title: 'WET vs DRY', parentId: 'dry-principle' },
  { id: 'dry-principle--violations', title: 'DRY Violations', parentId: 'dry-principle' },
  { id: 'dry-principle--over-dry', title: 'Over-DRY (Premature Abstraction)', parentId: 'dry-principle' },

  /* ---- kiss-principle ---- */
  { id: 'kiss-principle--origin', title: 'KISS Origin', parentId: 'kiss-principle' },
  { id: 'kiss-principle--simplicity-vs-easiness', title: 'Simplicity vs Easiness (Hickey)', parentId: 'kiss-principle' },
  { id: 'kiss-principle--applying-kiss', title: 'Applying KISS', parentId: 'kiss-principle' },
  { id: 'kiss-principle--violations', title: 'KISS Violations', parentId: 'kiss-principle' },

  /* ---- yagni-principle ---- */
  { id: 'yagni-principle--origin-xp', title: 'YAGNI Origin (XP)', parentId: 'yagni-principle' },
  { id: 'yagni-principle--cost-of-yagni-violations', title: 'Cost of YAGNI Violations', parentId: 'yagni-principle' },
  { id: 'yagni-principle--yagni-vs-design-for-future', title: 'YAGNI vs Design-for-Future', parentId: 'yagni-principle' },
  { id: 'yagni-principle--applying-yagni', title: 'Applying YAGNI', parentId: 'yagni-principle' },
  { id: 'yagni-principle--violations', title: 'YAGNI Violations', parentId: 'yagni-principle' },

  /* ---- law-of-demeter ---- */
  { id: 'law-of-demeter--origin', title: 'Origin (Northeastern, 1987)', parentId: 'law-of-demeter' },
  { id: 'law-of-demeter--definition', title: 'Definition (Talk Only to Friends)', parentId: 'law-of-demeter' },
  { id: 'law-of-demeter--train-wreck-anti-pattern', title: 'Train Wreck Anti-Pattern', parentId: 'law-of-demeter' },
  { id: 'law-of-demeter--examples', title: 'LoD Examples', parentId: 'law-of-demeter' },
  { id: 'law-of-demeter--violations', title: 'LoD Violations', parentId: 'law-of-demeter' },
  { id: 'law-of-demeter--criticism', title: 'LoD Criticism', parentId: 'law-of-demeter' },

  /* ---- composition-over-inheritance ---- */
  { id: 'composition-over-inheritance--gof-recommendation', title: 'GoF Recommendation', parentId: 'composition-over-inheritance' },
  { id: 'composition-over-inheritance--has-a-vs-is-a', title: 'Has-A vs Is-A', parentId: 'composition-over-inheritance' },
  { id: 'composition-over-inheritance--inheritance-pitfalls', title: 'Inheritance Pitfalls', parentId: 'composition-over-inheritance' },
  { id: 'composition-over-inheritance--mixins-traits', title: 'Mixins & Traits as Composition', parentId: 'composition-over-inheritance' },
  { id: 'composition-over-inheritance--delegation', title: 'Delegation', parentId: 'composition-over-inheritance' },
  { id: 'composition-over-inheritance--decorator-pattern-link', title: 'Composition and Decorator Pattern', parentId: 'composition-over-inheritance' },
  { id: 'composition-over-inheritance--violations', title: 'Composition vs Inheritance Violations', parentId: 'composition-over-inheritance' },

  /* ---- principle-of-least-astonishment ---- */
  { id: 'principle-of-least-astonishment--origin', title: 'POLA Origin', parentId: 'principle-of-least-astonishment' },
  { id: 'principle-of-least-astonishment--definition', title: 'POLA Definition', parentId: 'principle-of-least-astonishment' },
  { id: 'principle-of-least-astonishment--api-design', title: 'POLA in API Design', parentId: 'principle-of-least-astonishment' },
  { id: 'principle-of-least-astonishment--ui-ux', title: 'POLA in UI/UX', parentId: 'principle-of-least-astonishment' },
  { id: 'principle-of-least-astonishment--violations', title: 'POLA Violations', parentId: 'principle-of-least-astonishment' },

  /* ---- design-heuristics-riel ---- */
  { id: 'design-heuristics-riel--riel-book', title: 'Riel "Object-Oriented Design Heuristics" Book', parentId: 'design-heuristics-riel' },
  { id: 'design-heuristics-riel--classes-and-objects', title: 'Classes & Objects Heuristics', parentId: 'design-heuristics-riel' },
  { id: 'design-heuristics-riel--topologies-of-actions', title: 'Topologies of Actions', parentId: 'design-heuristics-riel' },
  { id: 'design-heuristics-riel--inheritance-heuristics', title: 'Inheritance Heuristics', parentId: 'design-heuristics-riel' },
  { id: 'design-heuristics-riel--association-aggregation-heuristics', title: 'Association & Aggregation Heuristics', parentId: 'design-heuristics-riel' },
  { id: 'design-heuristics-riel--multiple-inheritance-heuristics', title: 'Multiple Inheritance Heuristics', parentId: 'design-heuristics-riel' },
  { id: 'design-heuristics-riel--reusability-heuristics', title: 'Reusability Heuristics', parentId: 'design-heuristics-riel' },

  /* ---- gof-foundations ---- */
  { id: 'gof-foundations--gof-book', title: 'GoF Book (1994)', parentId: 'gof-foundations' },
  { id: 'gof-foundations--patterns-vocabulary', title: 'Patterns Vocabulary', parentId: 'gof-foundations' },
  { id: 'gof-foundations--pattern-elements', title: 'Pattern Elements (Name, Problem, Solution, Consequences)', parentId: 'gof-foundations' },
  { id: 'gof-foundations--forces', title: 'Forces in Pattern Description', parentId: 'gof-foundations' },
  { id: 'gof-foundations--intent-vs-implementation', title: 'Intent vs Implementation', parentId: 'gof-foundations' },
  { id: 'gof-foundations--alexander-influence', title: 'Christopher Alexander Influence', parentId: 'gof-foundations' },
  { id: 'gof-foundations--patterns-vs-idioms-vs-styles', title: 'Patterns vs Idioms vs Styles', parentId: 'gof-foundations' },

  /* ============================================================
   * STAGE 9 — Object-Oriented Analysis & Design
   * ============================================================ */

  /* ---- ooad-fundamentals ---- */
  { id: 'ooad-fundamentals--definition', title: 'OOAD Definition', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--ooa-vs-ood-vs-oop', title: 'OOA vs OOD vs OOP', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--booch-method', title: 'Booch Method', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--rumbaugh-omt', title: 'Rumbaugh OMT', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--jacobson-ooseu', title: 'Jacobson OOSE', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--coad-yourdon', title: 'Coad-Yourdon Method', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--larman-applying-uml', title: 'Larman "Applying UML and Patterns"', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--ooad-process', title: 'OOAD Process', parentId: 'ooad-fundamentals' },
  { id: 'ooad-fundamentals--ooad-deliverables', title: 'OOAD Deliverables', parentId: 'ooad-fundamentals' },

  /* ---- object-oriented-analysis ---- */
  { id: 'object-oriented-analysis--problem-domain-modeling', title: 'Problem-Domain Modeling', parentId: 'object-oriented-analysis' },
  { id: 'object-oriented-analysis--conceptual-classes', title: 'Identifying Conceptual Classes', parentId: 'object-oriented-analysis' },
  { id: 'object-oriented-analysis--conceptual-class-list', title: 'Conceptual Class List', parentId: 'object-oriented-analysis' },
  { id: 'object-oriented-analysis--associations', title: 'Associations Between Concepts', parentId: 'object-oriented-analysis' },
  { id: 'object-oriented-analysis--attributes', title: 'Attributes', parentId: 'object-oriented-analysis' },
  { id: 'object-oriented-analysis--system-sequence-diagrams', title: 'System Sequence Diagrams (SSDs)', parentId: 'object-oriented-analysis' },
  { id: 'object-oriented-analysis--operation-contracts', title: 'Operation Contracts', parentId: 'object-oriented-analysis' },
  { id: 'object-oriented-analysis--ooa-anti-patterns', title: 'OOA Anti-Patterns', parentId: 'object-oriented-analysis' },

  /* ---- object-oriented-design ---- */
  { id: 'object-oriented-design--logical-design', title: 'Logical Design', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--physical-design', title: 'Physical Design', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--collaboration-design', title: 'Designing Object Collaborations', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--message-design', title: 'Designing Messages', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--method-design', title: 'Designing Methods', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--class-design', title: 'Designing Classes', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--package-design', title: 'Designing Packages', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--design-by-contract', title: 'Design by Contract (Meyer)', parentId: 'object-oriented-design' },
  { id: 'object-oriented-design--ood-anti-patterns', title: 'OOD Anti-Patterns', parentId: 'object-oriented-design' },

  /* ---- grasp-patterns ---- */
  { id: 'grasp-patterns--information-expert', title: 'Information Expert', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--creator', title: 'Creator', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--controller', title: 'Controller', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--low-coupling', title: 'Low Coupling', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--high-cohesion', title: 'High Cohesion', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--polymorphism', title: 'Polymorphism (GRASP)', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--pure-fabrication', title: 'Pure Fabrication', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--indirection', title: 'Indirection', parentId: 'grasp-patterns' },
  { id: 'grasp-patterns--protected-variations', title: 'Protected Variations', parentId: 'grasp-patterns' },

  /* ---- responsibility-driven-design ---- */
  { id: 'responsibility-driven-design--wirfs-brock', title: 'Wirfs-Brock Approach', parentId: 'responsibility-driven-design' },
  { id: 'responsibility-driven-design--roles', title: 'Roles in RDD', parentId: 'responsibility-driven-design' },
  { id: 'responsibility-driven-design--stereotypes', title: 'Object Stereotypes', parentId: 'responsibility-driven-design' },
  { id: 'responsibility-driven-design--responsibilities', title: 'Identifying Responsibilities', parentId: 'responsibility-driven-design' },
  { id: 'responsibility-driven-design--collaborations', title: 'Designing Collaborations', parentId: 'responsibility-driven-design' },
  { id: 'responsibility-driven-design--client-server-contracts', title: 'Client-Server Contracts', parentId: 'responsibility-driven-design' },
  { id: 'responsibility-driven-design--rdd-anti-patterns', title: 'RDD Anti-Patterns', parentId: 'responsibility-driven-design' },

  /* ---- crc-cards ---- */
  { id: 'crc-cards--origins', title: 'CRC Cards Origins (Beck & Cunningham)', parentId: 'crc-cards' },
  { id: 'crc-cards--card-format', title: 'CRC Card Format', parentId: 'crc-cards' },
  { id: 'crc-cards--running-a-session', title: 'Running a CRC Session', parentId: 'crc-cards' },
  { id: 'crc-cards--strengths', title: 'CRC Strengths', parentId: 'crc-cards' },
  { id: 'crc-cards--limitations', title: 'CRC Limitations', parentId: 'crc-cards' },

  /* ---- noun-verb-analysis ---- */
  { id: 'noun-verb-analysis--abbott-method', title: 'Abbott Method (1983)', parentId: 'noun-verb-analysis' },
  { id: 'noun-verb-analysis--noun-extraction', title: 'Noun Extraction', parentId: 'noun-verb-analysis' },
  { id: 'noun-verb-analysis--verb-extraction', title: 'Verb Extraction', parentId: 'noun-verb-analysis' },
  { id: 'noun-verb-analysis--filtering-candidates', title: 'Filtering Candidate Classes & Methods', parentId: 'noun-verb-analysis' },
  { id: 'noun-verb-analysis--limitations', title: 'Limitations of Noun-Verb Analysis', parentId: 'noun-verb-analysis' },

  /* ---- object-oriented-modeling ---- */
  { id: 'object-oriented-modeling--class-modeling', title: 'Class Modeling', parentId: 'object-oriented-modeling' },
  { id: 'object-oriented-modeling--object-modeling', title: 'Object Modeling', parentId: 'object-oriented-modeling' },
  { id: 'object-oriented-modeling--dynamic-modeling', title: 'Dynamic Modeling', parentId: 'object-oriented-modeling' },
  { id: 'object-oriented-modeling--functional-modeling', title: 'Functional Modeling', parentId: 'object-oriented-modeling' },
  { id: 'object-oriented-modeling--state-modeling-oo', title: 'State Modeling (OO View)', parentId: 'object-oriented-modeling' },
  { id: 'object-oriented-modeling--collaboration-modeling', title: 'Collaboration Modeling', parentId: 'object-oriented-modeling' },
  { id: 'object-oriented-modeling--ooa-to-ood-traceability', title: 'OOA-to-OOD Traceability', parentId: 'object-oriented-modeling' },

  /* ============================================================
   * STAGE 10 — Code-Level Design Patterns
   * ============================================================ */

  /* ---- gof-patterns-overview ---- */
  { id: 'gof-patterns-overview--gof-23-patterns', title: 'GoF 23 Patterns Map', parentId: 'gof-patterns-overview' },
  { id: 'gof-patterns-overview--purpose-classification', title: 'Purpose Classification', parentId: 'gof-patterns-overview' },
  { id: 'gof-patterns-overview--scope-classification', title: 'Scope Classification (Class vs Object)', parentId: 'gof-patterns-overview' },
  { id: 'gof-patterns-overview--how-to-select-a-pattern', title: 'How to Select a Pattern', parentId: 'gof-patterns-overview' },
  { id: 'gof-patterns-overview--pattern-relationships', title: 'Pattern Relationships', parentId: 'gof-patterns-overview' },
  { id: 'gof-patterns-overview--pattern-evolution-since-1994', title: 'Pattern Evolution Since 1994', parentId: 'gof-patterns-overview' },
  { id: 'gof-patterns-overview--patterns-in-modern-langs', title: 'Patterns in Modern Languages', parentId: 'gof-patterns-overview' },

  /* ---- creational-code-patterns ---- */
  { id: 'creational-code-patterns--singleton', title: 'Singleton', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--factory-method', title: 'Factory Method', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--abstract-factory', title: 'Abstract Factory', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--builder', title: 'Builder', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--prototype', title: 'Prototype', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--object-pool', title: 'Object Pool', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--lazy-initialization', title: 'Lazy Initialization', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--multiton', title: 'Multiton', parentId: 'creational-code-patterns' },
  { id: 'creational-code-patterns--dependency-injection-pattern', title: 'Dependency Injection (Pattern View)', parentId: 'creational-code-patterns' },

  /* ---- structural-code-patterns ---- */
  { id: 'structural-code-patterns--adapter', title: 'Adapter', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--bridge', title: 'Bridge', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--composite', title: 'Composite', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--decorator', title: 'Decorator', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--facade', title: 'Facade', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--flyweight', title: 'Flyweight', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--proxy', title: 'Proxy', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--module-pattern', title: 'Module Pattern', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--mixin', title: 'Mixin Pattern', parentId: 'structural-code-patterns' },
  { id: 'structural-code-patterns--marker-interface', title: 'Marker Interface', parentId: 'structural-code-patterns' },

  /* ---- behavioral-code-patterns ---- */
  { id: 'behavioral-code-patterns--chain-of-responsibility', title: 'Chain of Responsibility', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--command', title: 'Command', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--interpreter', title: 'Interpreter', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--iterator', title: 'Iterator', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--mediator', title: 'Mediator', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--memento', title: 'Memento', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--observer', title: 'Observer', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--state', title: 'State', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--strategy', title: 'Strategy', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--template-method', title: 'Template Method', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--visitor', title: 'Visitor', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--null-object', title: 'Null Object', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--specification', title: 'Specification', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--publish-subscribe-code', title: 'Publish-Subscribe (Code-Level)', parentId: 'behavioral-code-patterns' },
  { id: 'behavioral-code-patterns--servant', title: 'Servant', parentId: 'behavioral-code-patterns' },

  /* ---- concurrency-code-patterns ---- */
  { id: 'concurrency-code-patterns--monitor-object', title: 'Monitor Object', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--producer-consumer', title: 'Producer-Consumer', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--read-write-lock', title: 'Read-Write Lock', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--double-checked-locking', title: 'Double-Checked Locking', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--thread-pool', title: 'Thread Pool', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--active-object', title: 'Active Object', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--reactor', title: 'Reactor', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--proactor', title: 'Proactor', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--scheduler', title: 'Scheduler', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--futures-promises-pattern', title: 'Futures & Promises (Pattern View)', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--barrier', title: 'Barrier', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--lock-free-pattern', title: 'Lock-Free Patterns', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--immutable-pattern', title: 'Immutable Object Pattern', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--copy-on-write', title: 'Copy-on-Write', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--actor-model-pattern', title: 'Actor Model (Pattern View)', parentId: 'concurrency-code-patterns' },
  { id: 'concurrency-code-patterns--csp-pattern', title: 'CSP Channels (Pattern View)', parentId: 'concurrency-code-patterns' },

  /* ---- functional-code-patterns ---- */
  { id: 'functional-code-patterns--functor', title: 'Functor', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--applicative', title: 'Applicative', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--monad', title: 'Monad', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--monad-transformer', title: 'Monad Transformer', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--free-monad', title: 'Free Monad', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--reader-monad', title: 'Reader Monad', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--writer-monad', title: 'Writer Monad', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--state-monad', title: 'State Monad', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--io-monad', title: 'IO Monad', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--lens', title: 'Lens', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--prism', title: 'Prism', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--traversal', title: 'Traversal (Optics)', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--pipeline-pattern', title: 'Pipeline Pattern', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--transducer', title: 'Transducer', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--continuation', title: 'Continuation (CPS)', parentId: 'functional-code-patterns' },
  { id: 'functional-code-patterns--algebraic-effects-pattern', title: 'Algebraic Effects (Pattern View)', parentId: 'functional-code-patterns' },

  /* ---- code-anti-patterns ---- */
  { id: 'code-anti-patterns--god-object', title: 'God Object / God Class', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--spaghetti-code', title: 'Spaghetti Code', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--lava-flow', title: 'Lava Flow', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--golden-hammer', title: 'Golden Hammer', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--magic-numbers', title: 'Magic Numbers / Strings', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--copy-paste-programming', title: 'Copy-Paste Programming', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--cargo-cult-programming', title: 'Cargo-Cult Programming', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--shotgun-surgery', title: 'Shotgun Surgery', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--feature-envy', title: 'Feature Envy', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--data-clumps', title: 'Data Clumps', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--primitive-obsession', title: 'Primitive Obsession', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--poltergeist', title: 'Poltergeist', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--yo-yo-problem', title: 'Yo-Yo Problem', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--inner-platform-effect', title: 'Inner Platform Effect', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--soft-coding', title: 'Soft Coding', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--big-ball-of-mud', title: 'Big Ball of Mud (Code-Level)', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--circular-dependencies', title: 'Circular Dependencies', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--anemic-domain-model', title: 'Anemic Domain Model', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--accidental-complexity', title: 'Accidental Complexity', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--premature-optimization', title: 'Premature Optimization', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--premature-abstraction', title: 'Premature Abstraction', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--singleton-overuse', title: 'Singleton Overuse', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--inheritance-overuse', title: 'Inheritance Overuse', parentId: 'code-anti-patterns' },
  { id: 'code-anti-patterns--ai-generated-anti-patterns-2026', title: 'AI-Generated Code Anti-Patterns (2026)', parentId: 'code-anti-patterns' },
])