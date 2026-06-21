/**
 * Client Engagement Skills content seeder.
 *
 * Generates roadmap.json + topic.json files for topics, subtopics, and sub-subtopics.
 *
 * Usage: node scripts/client-engagement-skills/seed.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/client-engagement-skills')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

/** @typedef {{ id: string, title: string, level?: string, children?: Child[] }} Child */
/** @typedef {{ id: string, title: string, summary: string, level: string, roots: Child[] }} Stage */

/** @type {Stage[]} */
const STAGES = [
  {
    id: 'fde-foundations',
    title: 'Forward Deployed Engineering Foundations',
    summary: 'What client engagement is, the FDE role, and the mindset for customer-facing engineering.',
    level: 'beginner',
    roots: [
      {
        id: 'what-is-client-engagement',
        title: 'What is Client Engagement?',
        children: [
          { id: 'definition-and-scope', title: 'Definition and Scope of Client Engagement' },
          { id: 'engagement-vs-support', title: 'Engagement vs Support vs Success' },
          { id: 'embedded-vs-remote', title: 'Embedded vs Remote Client Work' },
          { id: 'engagement-outcomes', title: 'Engagement Outcomes vs Activity' },
          { id: 'customer-obsession', title: 'Customer Obsession as a Discipline' },
          { id: 'engagement-lifecycle-overview', title: 'Engagement Lifecycle Overview' },
        ],
      },
      {
        id: 'forward-deployed-engineer-role',
        title: 'The Forward Deployed Engineer Role',
        children: [
          { id: 'fde-definition', title: 'Defining the Forward Deployed Engineer' },
          { id: 'fde-origin-and-evolution', title: 'Origin and Evolution of the FDE Role' },
          { id: 'fde-day-in-the-life', title: 'A Day in the Life of an FDE' },
          { id: 'fde-core-responsibilities', title: 'Core FDE Responsibilities' },
          { id: 'fde-vs-solutions-engineer', title: 'FDE vs Solutions Engineer' },
          { id: 'fde-vs-consultant', title: 'FDE vs Management Consultant' },
          { id: 'fde-vs-professional-services', title: 'FDE vs Professional Services Engineer' },
          { id: 'fde-vs-customer-success', title: 'FDE vs Customer Success Engineer' },
          { id: 'fde-vs-sales-engineer', title: 'FDE vs Sales Engineer' },
        ],
      },
      {
        id: 'customer-facing-engineering-landscape',
        title: 'Customer-Facing Engineering Landscape',
        children: [
          { id: 'role-archetypes', title: 'Customer-Facing Role Archetypes' },
          { id: 'palantir-fde-model', title: 'The Palantir FDE Model' },
          { id: 'databricks-fde-model', title: 'The Databricks FDE Model' },
          { id: 'ai-native-fde-2026', title: 'AI-Native FDE Roles (2026)' },
          { id: 'startup-vs-enterprise-fde', title: 'Startup vs Enterprise FDE Contexts' },
          { id: 'vendor-vs-client-side', title: 'Vendor-Side vs Client-Side Roles' },
          { id: 'career-paths-overview', title: 'Career Paths in Client-Facing Engineering' },
        ],
      },
      {
        id: 'client-engagement-lifecycle',
        title: 'Client Engagement Lifecycle',
        children: [
          { id: 'pre-engagement', title: 'Pre-Engagement and Qualification' },
          { id: 'discovery-phase', title: 'Discovery Phase' },
          { id: 'design-and-planning', title: 'Design and Planning Phase' },
          { id: 'implementation-phase', title: 'Implementation Phase' },
          { id: 'enablement-phase', title: 'Enablement and Training Phase' },
          { id: 'go-live-hypercare', title: 'Go-Live and Hypercare' },
          { id: 'steady-state-transition', title: 'Transition to Steady State' },
          { id: 'expansion-and-renewal', title: 'Expansion and Renewal' },
        ],
      },
      {
        id: 'fde-mindset',
        title: 'The FDE Mindset and Operating Principles',
        children: [
          { id: 'ownership-mentality', title: 'Ownership Mentality on Client Work' },
          { id: 'bias-for-action', title: 'Bias for Action in Client Settings' },
          { id: 'adaptability', title: 'Adaptability Across Clients and Domains' },
          { id: 'technical-humility', title: 'Technical Humility and Learning Posture' },
          { id: 'client-first-decisions', title: 'Client-First Decision Making' },
          { id: 'long-term-relationship-view', title: 'Long-Term Relationship View' },
          { id: 'shipping-over-perfection', title: 'Shipping Over Perfection' },
          { id: 'operating-in-ambiguity', title: 'Operating Comfortably in Ambiguity' },
        ],
      },
      {
        id: 'engagement-success-metrics',
        title: 'Engagement Success Metrics',
        children: [
          { id: 'defining-success', title: 'Defining Success with the Client' },
          { id: 'leading-vs-lagging', title: 'Leading vs Lagging Indicators' },
          { id: 'adoption-metrics', title: 'Adoption and Usage Metrics' },
          { id: 'business-outcome-metrics', title: 'Business Outcome Metrics' },
          { id: 'satisfaction-and-nps', title: 'Client Satisfaction and NPS' },
          { id: 'internal-health-metrics', title: 'Internal Engagement Health Metrics' },
        ],
      },
    ],
  },
  {
    id: 'trust-and-relationships',
    title: 'Trust, Rapport and Relationship Building',
    summary: 'Foundations of credibility, listening, and durable client relationships.',
    level: 'beginner',
    roots: [
      {
        id: 'trust-fundamentals',
        title: 'Trust Fundamentals',
        children: [
          { id: 'trust-equation', title: 'The Trust Equation (Maister)' },
          { id: 'competence-and-character', title: 'Competence vs Character' },
          { id: 'consistency-and-reliability', title: 'Consistency and Reliability' },
          { id: 'transparency', title: 'Transparency Without Oversharing' },
          { id: 'vulnerability-in-trust', title: 'Appropriate Vulnerability' },
          { id: 'trust-recovery', title: 'Recovering Broken Trust' },
        ],
      },
      {
        id: 'building-credibility',
        title: 'Building Technical Credibility',
        children: [
          { id: 'demonstrating-expertise', title: 'Demonstrating Expertise Without Arrogance' },
          { id: 'quick-wins', title: 'Early Quick Wins' },
          { id: 'follow-through', title: 'Follow-Through and Commitment Keeping' },
          { id: 'admitting-gaps', title: 'Admitting Knowledge Gaps Honestly' },
          { id: 'reference-clients', title: 'Leveraging Reference Stories' },
          { id: 'certifications-and-credentials', title: 'Credentials vs Demonstrated Skill' },
        ],
      },
      {
        id: 'active-listening',
        title: 'Active Listening in Client Settings',
        children: [
          { id: 'listening-levels', title: 'Levels of Listening' },
          { id: 'reflective-listening', title: 'Reflective and Paraphrasing Techniques' },
          { id: 'note-taking-rituals', title: 'Note-Taking Rituals in Client Meetings' },
          { id: 'listening-for-concerns', title: 'Listening for Unspoken Concerns' },
          { id: 'avoiding-interruption', title: 'Avoiding Premature Solutions' },
          { id: 'listening-remotely', title: 'Active Listening on Video Calls' },
        ],
      },
      {
        id: 'rapport-and-first-impressions',
        title: 'Rapport and First Impressions',
        children: [
          { id: 'first-meeting-prep', title: 'Preparing for First Client Meetings' },
          { id: 'introductions-and-agenda', title: 'Introductions and Agenda Setting' },
          { id: 'small-talk-with-purpose', title: 'Small Talk with Purpose' },
          { id: 'matching-communication-style', title: 'Matching Communication Style' },
          { id: 'professional-presence', title: 'Professional Presence On-Site and Remote' },
          { id: 'follow-up-after-first-meeting', title: 'Follow-Up After First Meetings' },
        ],
      },
      {
        id: 'stakeholder-psychology-basics',
        title: 'Stakeholder Psychology Basics',
        children: [
          { id: 'motivations-and-incentives', title: 'Understanding Motivations and Incentives' },
          { id: 'fear-and-risk-perception', title: 'Fear and Risk Perception' },
          { id: 'status-and-ego', title: 'Status and Ego Dynamics' },
          { id: 'change-resistance', title: 'Why People Resist Change' },
          { id: 'buy-in-psychology', title: 'Psychology of Buy-In' },
          { id: 'empathy-in-engagements', title: 'Empathy in Client Engagements' },
        ],
      },
      {
        id: 'cross-cultural-awareness',
        title: 'Cross-Cultural Client Awareness',
        children: [
          { id: 'cultural-dimensions', title: 'Cultural Dimensions (Hofstede Overview)' },
          { id: 'communication-norms', title: 'Communication Norms Across Cultures' },
          { id: 'hierarchy-and-deference', title: 'Hierarchy and Deference Patterns' },
          { id: 'time-and-punctuality', title: 'Time and Punctuality Expectations' },
          { id: 'global-team-dynamics', title: 'Global Team Dynamics' },
          { id: 'avoiding-cultural-assumptions', title: 'Avoiding Cultural Assumptions' },
        ],
      },
      {
        id: 'remote-vs-onsite-relationships',
        title: 'Remote vs On-Site Relationship Building',
        children: [
          { id: 'onsite-advantages', title: 'Advantages of On-Site Presence' },
          { id: 'remote-relationship-tactics', title: 'Building Relationships Remotely' },
          { id: 'hybrid-engagement-patterns', title: 'Hybrid Engagement Patterns' },
          { id: 'travel-and-onsite-etiquette', title: 'Travel and On-Site Etiquette' },
          { id: 'timezone-relationship-maintenance', title: 'Maintaining Relationships Across Time Zones' },
          { id: 'virtual-water-cooler', title: 'Creating Virtual Informal Touchpoints' },
        ],
      },
    ],
  },
  {
    id: 'discovery-and-problem-framing',
    title: 'Discovery and Problem Framing',
    summary: 'Structured methods to understand client problems before proposing solutions.',
    level: 'beginner',
    roots: [
      {
        id: 'structured-discovery',
        title: 'Structured Discovery Methods',
        children: [
          { id: 'discovery-vs-sales-call', title: 'Discovery vs Sales Conversations' },
          { id: 'discovery-workshops', title: 'Discovery Workshop Formats' },
          { id: 'interview-guides', title: 'Stakeholder Interview Guides' },
          { id: 'observation-and-shadowing', title: 'Observation and Shadowing' },
          { id: 'document-review', title: 'Document and Artifact Review' },
          { id: 'discovery-artifacts', title: 'Discovery Artifacts and Outputs' },
        ],
      },
      {
        id: 'problem-framing',
        title: 'Problem Framing',
        children: [
          { id: 'problem-vs-solution', title: 'Problem vs Solution Framing' },
          { id: 'five-whys', title: 'Five Whys and Root Cause' },
          { id: 'jobs-to-be-done', title: 'Jobs-to-Be-Done for Client Problems' },
          { id: 'problem-statements', title: 'Writing Clear Problem Statements' },
          { id: 'reframing-techniques', title: 'Reframing Techniques' },
          { id: 'avoiding-solution-bias', title: 'Avoiding Solution Bias' },
        ],
      },
      {
        id: 'requirements-elicitation',
        title: 'Requirements Elicitation',
        children: [
          { id: 'functional-vs-nonfunctional', title: 'Functional vs Non-Functional Requirements' },
          { id: 'elicitation-techniques', title: 'Elicitation Techniques (Interviews, Workshops, Prototyping)' },
          { id: 'implicit-requirements', title: 'Surfacing Implicit Requirements' },
          { id: 'prioritization-frameworks', title: 'MoSCoW, RICE and Prioritization' },
          { id: 'requirements-traceability', title: 'Requirements Traceability' },
          { id: 'validating-understanding', title: 'Validating Shared Understanding' },
        ],
      },
      {
        id: 'powerful-questions',
        title: 'Asking Powerful Questions',
        children: [
          { id: 'open-vs-closed', title: 'Open vs Closed Questions' },
          { id: 'probing-questions', title: 'Probing and Clarifying Questions' },
          { id: 'hypothesis-driven-questions', title: 'Hypothesis-Driven Questions' },
          { id: 'questions-for-executives', title: 'Questions for Executives' },
          { id: 'questions-for-practitioners', title: 'Questions for Practitioners' },
          { id: 'question-sequences', title: 'Question Sequences and Flow' },
        ],
      },
      {
        id: 'client-business-context',
        title: 'Understanding Client Business Context',
        children: [
          { id: 'business-model-canvas', title: 'Business Model Understanding' },
          { id: 'industry-dynamics', title: 'Industry Dynamics and Trends' },
          { id: 'competitive-landscape', title: 'Competitive Landscape Awareness' },
          { id: 'regulatory-context', title: 'Regulatory and Compliance Context' },
          { id: 'org-structure-impact', title: 'How Org Structure Affects Projects' },
          { id: 'business-kpi-mapping', title: 'Mapping Technical Work to Business KPIs' },
        ],
      },
      {
        id: 'domain-immersion',
        title: 'Domain and Industry Immersion',
        children: [
          { id: 'rapid-domain-learning', title: 'Rapid Domain Learning Techniques' },
          { id: 'industry-vocabulary', title: 'Learning Industry Vocabulary' },
          { id: 'subject-matter-experts', title: 'Working with Client SMEs' },
          { id: 'domain-driven-design-lite', title: 'Domain Concepts for FDEs' },
          { id: 'vertical-patterns', title: 'Common Vertical Patterns (FinTech, Health, Retail)' },
          { id: 'when-to-go-deep', title: 'When to Go Deep vs Stay Generalist' },
        ],
      },
      {
        id: 'current-state-assessment',
        title: 'Current-State Assessment',
        children: [
          { id: 'as-is-mapping', title: 'As-Is Process and System Mapping' },
          { id: 'technical-landscape-audit', title: 'Technical Landscape Audit' },
          { id: 'data-landscape-review', title: 'Data Landscape Review' },
          { id: 'integration-inventory', title: 'Integration Inventory' },
          { id: 'pain-point-catalog', title: 'Pain Point Cataloging' },
          { id: 'maturity-assessment', title: 'Maturity Assessment Frameworks' },
        ],
      },
      {
        id: 'gap-analysis-and-outcomes',
        title: 'Gap Analysis and Outcome Definition',
        children: [
          { id: 'current-vs-desired', title: 'Current vs Desired State' },
          { id: 'gap-prioritization', title: 'Gap Prioritization' },
          { id: 'outcome-hypotheses', title: 'Outcome Hypotheses' },
          { id: 'success-criteria-co-creation', title: 'Co-Creating Success Criteria' },
          { id: 'quick-win-identification', title: 'Quick Win Identification' },
          { id: 'discovery-to-proposal', title: 'From Discovery to Proposal' },
        ],
      },
    ],
  },
  {
    id: 'stakeholder-navigation',
    title: 'Stakeholder Mapping and Navigation',
    summary: 'Identify, align, and work effectively with everyone who affects the engagement.',
    level: 'intermediate',
    roots: [
      {
        id: 'stakeholder-mapping',
        title: 'Stakeholder Mapping',
        children: [
          { id: 'identifying-stakeholders', title: 'Identifying All Stakeholders' },
          { id: 'power-interest-grid', title: 'Power/Interest Grid' },
          { id: 'influence-mapping', title: 'Influence Mapping' },
          { id: 'stakeholder-registers', title: 'Stakeholder Registers' },
          { id: 'org-chart-decoding', title: 'Decoding Client Org Charts' },
          { id: 'hidden-stakeholders', title: 'Finding Hidden Stakeholders' },
        ],
      },
      {
        id: 'sponsors-champions-blockers',
        title: 'Sponsors, Champions and Blockers',
        children: [
          { id: 'executive-sponsors', title: 'Working with Executive Sponsors' },
          { id: 'building-champions', title: 'Building Internal Champions' },
          { id: 'neutralizing-blockers', title: 'Neutralizing Blockers' },
          { id: 'coalition-building', title: 'Coalition Building' },
          { id: 'sponsor-engagement-plan', title: 'Sponsor Engagement Plans' },
          { id: 'when-sponsor-leaves', title: 'When the Sponsor Leaves' },
        ],
      },
      {
        id: 'client-org-politics',
        title: 'Navigating Client Organizational Politics',
        children: [
          { id: 'political-awareness', title: 'Political Awareness Without Cynicism' },
          { id: 'competing-priorities', title: 'Competing Priorities Across Teams' },
          { id: 'turf-and-territory', title: 'Turf and Territory Issues' },
          { id: 'informal-power', title: 'Informal Power Structures' },
          { id: 'staying-neutral', title: 'Staying Neutral as an External' },
          { id: 'political-landmines', title: 'Avoiding Political Landmines' },
        ],
      },
      {
        id: 'decision-rights-raci',
        title: 'Decision Rights and RACI',
        children: [
          { id: 'raci-basics', title: 'RACI Basics for Engagements' },
          { id: 'decision-authority', title: 'Clarifying Decision Authority' },
          { id: 'approval-workflows', title: 'Client Approval Workflows' },
          { id: 'escalation-triggers', title: 'Escalation Triggers' },
          { id: 'consensus-vs-decide', title: 'Consensus vs Decider Models' },
          { id: 'documenting-decisions', title: 'Documenting Decisions (ADRs, Decision Logs)' },
        ],
      },
      {
        id: 'cross-functional-stakeholders',
        title: 'Working Across Client Functions',
        children: [
          { id: 'business-stakeholders', title: 'Business and Operations Stakeholders' },
          { id: 'it-and-platform-teams', title: 'IT and Platform Teams' },
          { id: 'security-and-compliance', title: 'Security and Compliance Teams' },
          { id: 'procurement-and-legal', title: 'Procurement and Legal' },
          { id: 'data-and-analytics-teams', title: 'Data and Analytics Teams' },
          { id: 'end-users-and-advocates', title: 'End Users and User Advocates' },
        ],
      },
      {
        id: 'executive-stakeholder-management',
        title: 'Executive Stakeholder Management',
        children: [
          { id: 'executive-communication-style', title: 'Executive Communication Style' },
          { id: 'board-and-c-suite', title: 'Board and C-Suite Dynamics' },
          { id: 'executive-briefings', title: 'Executive Briefing Formats' },
          { id: 'managing-up-at-client', title: 'Managing Up at the Client' },
          { id: 'executive-time-respect', title: 'Respecting Executive Time' },
          { id: 'executive-trust-building', title: 'Building Executive Trust' },
        ],
      },
      {
        id: 'resistant-stakeholders',
        title: 'Working with Resistant Stakeholders',
        children: [
          { id: 'sources-of-resistance', title: 'Sources of Resistance' },
          { id: 'empathy-first-approach', title: 'Empathy-First Approach' },
          { id: 'finding-common-ground', title: 'Finding Common Ground' },
          { id: 'incremental-wins', title: 'Incremental Wins with Skeptics' },
          { id: 'when-to-escalate-resistance', title: 'When to Escalate Resistance' },
          { id: 'converting-skeptics', title: 'Converting Skeptics to Advocates' },
        ],
      },
    ],
  },
  {
    id: 'client-communication',
    title: 'Client Communication and Facilitation',
    summary: 'Speak, write, present, and facilitate effectively with any client audience.',
    level: 'intermediate',
    roots: [
      {
        id: 'executive-communication',
        title: 'Executive Communication',
        children: [
          { id: 'pyramid-principle', title: 'Pyramid Principle for Executives' },
          { id: 'bluf-style', title: 'BLUF (Bottom Line Up Front)' },
          { id: 'executive-summaries', title: 'Executive Summaries' },
          { id: 'one-pagers', title: 'One-Pager Format' },
          { id: 'six-page-narrative', title: 'Six-Page Narrative (Amazon Style)' },
          { id: 'avoiding-jargon-with-execs', title: 'Avoiding Jargon with Executives' },
        ],
      },
      {
        id: 'technical-translation',
        title: 'Technical Translation for Non-Technical Audiences',
        children: [
          { id: 'analogy-and-metaphor', title: 'Analogy and Metaphor' },
          { id: 'layered-explanations', title: 'Layered Explanations (ELI5 to Expert)' },
          { id: 'visual-aids', title: 'Visual Aids and Diagrams' },
          { id: 'tradeoff-communication', title: 'Communicating Tradeoffs' },
          { id: 'risk-in-plain-language', title: 'Risk in Plain Language' },
          { id: 'demo-narration', title: 'Demo Narration Techniques' },
        ],
      },
      {
        id: 'client-presentations',
        title: 'Client Presentations',
        children: [
          { id: 'presentation-structure', title: 'Presentation Structure' },
          { id: 'storytelling-for-clients', title: 'Storytelling for Client Audiences' },
          { id: 'handling-qa', title: 'Handling Q&A Sessions' },
          { id: 'remote-presentation-skills', title: 'Remote Presentation Skills' },
          { id: 'onsite-presentation-skills', title: 'On-Site Presentation Skills' },
          { id: 'leave-behind-materials', title: 'Leave-Behind Materials' },
        ],
      },
      {
        id: 'workshop-facilitation',
        title: 'Workshop Facilitation',
        children: [
          { id: 'facilitation-fundamentals', title: 'Facilitation Fundamentals' },
          { id: 'discovery-workshops-facilitation', title: 'Facilitating Discovery Workshops' },
          { id: 'design-workshops', title: 'Design and Architecture Workshops' },
          { id: 'prioritization-workshops', title: 'Prioritization Workshops' },
          { id: 'retrospectives-with-clients', title: 'Retrospectives with Clients' },
          { id: 'managing-difficult-participants', title: 'Managing Difficult Participants' },
          { id: 'virtual-facilitation', title: 'Virtual Facilitation Techniques' },
        ],
      },
      {
        id: 'written-client-communication',
        title: 'Written Client Communication',
        children: [
          { id: 'status-reports', title: 'Status Reports and Updates' },
          { id: 'meeting-notes-and-actions', title: 'Meeting Notes and Action Items' },
          { id: 'brds-and-specs', title: 'BRDs and Technical Specifications' },
          { id: 'email-etiquette', title: 'Client Email Etiquette' },
          { id: 'slack-and-chat-norms', title: 'Slack and Chat Norms with Clients' },
          { id: 'documentation-for-clients', title: 'Client-Facing Documentation' },
        ],
      },
      {
        id: 'demo-and-poc-storytelling',
        title: 'Demo and POC Storytelling',
        children: [
          { id: 'demo-structure', title: 'Demo Structure (Problem → Solution → Value)' },
          { id: 'live-vs-recorded-demos', title: 'Live vs Recorded Demos' },
          { id: 'handling-demo-failures', title: 'Handling Demo Failures' },
          { id: 'poc-narrative', title: 'POC Narrative and Scope' },
          { id: 'tailoring-demos', title: 'Tailoring Demos to Audience' },
          { id: 'demo-to-production-bridge', title: 'Bridging Demo to Production' },
        ],
      },
      {
        id: 'visual-communication',
        title: 'Visual Communication and Whiteboarding',
        children: [
          { id: 'whiteboarding-basics', title: 'Whiteboarding Basics' },
          { id: 'architecture-sketches', title: 'Architecture Sketches for Clients' },
          { id: 'process-flow-diagrams', title: 'Process Flow Diagrams' },
          { id: 'digital-whiteboard-tools', title: 'Digital Whiteboard Tools (Miro, FigJam)' },
          { id: 'visual-hierarchy', title: 'Visual Hierarchy and Clarity' },
          { id: 'co-creation-on-whiteboard', title: 'Co-Creation on the Whiteboard' },
        ],
      },
      {
        id: 'async-communication',
        title: 'Asynchronous Client Communication',
        children: [
          { id: 'async-first-principles', title: 'Async-First Principles' },
          { id: 'timezone-aware-communication', title: 'Timezone-Aware Communication' },
          { id: 'video-messages', title: 'Video Messages (Loom, etc.)' },
          { id: 'shared-documents', title: 'Shared Documents and Wikis' },
          { id: 'response-time-expectations', title: 'Setting Response Time Expectations' },
          { id: 'async-decision-making', title: 'Async Decision Making' },
        ],
      },
    ],
  },
  {
    id: 'engagement-planning-delivery',
    title: 'Engagement Planning and Delivery Management',
    summary: 'Plan, execute, and report on client engagements with clarity and discipline.',
    level: 'intermediate',
    roots: [
      {
        id: 'engagement-planning',
        title: 'Engagement Planning',
        children: [
          { id: 'engagement-charter', title: 'Engagement Charter' },
          { id: 'work-breakdown', title: 'Work Breakdown for Client Projects' },
          { id: 'resource-planning', title: 'Resource and Staffing Planning' },
          { id: 'dependency-mapping', title: 'Dependency Mapping' },
          { id: 'assumption-logging', title: 'Assumption Logging' },
          { id: 'planning-with-uncertainty', title: 'Planning with Uncertainty' },
        ],
      },
      {
        id: 'kickoff-and-onboarding',
        title: 'Kickoff and Client Onboarding',
        children: [
          { id: 'kickoff-agenda', title: 'Kickoff Meeting Agenda' },
          { id: 'team-introductions', title: 'Team Introductions and Roles' },
          { id: 'communication-plan', title: 'Communication Plan' },
          { id: 'access-and-logistics', title: 'Access, Logistics and Onboarding Checklist' },
          { id: 'working-agreements', title: 'Working Agreements with Client Teams' },
          { id: 'first-week-playbook', title: 'First Week Playbook' },
        ],
      },
      {
        id: 'scope-and-sow',
        title: 'Scope, SOW and Success Criteria',
        children: [
          { id: 'sow-anatomy', title: 'Anatomy of a Statement of Work' },
          { id: 'in-scope-out-of-scope', title: 'In-Scope vs Out-of-Scope' },
          { id: 'acceptance-criteria', title: 'Acceptance Criteria' },
          { id: 'deliverable-definition', title: 'Deliverable Definition' },
          { id: 'assumptions-and-dependencies', title: 'Assumptions and Dependencies in SOW' },
          { id: 'scope-negotiation', title: 'Scope Negotiation Basics' },
        ],
      },
      {
        id: 'milestone-timeline-management',
        title: 'Milestone and Timeline Management',
        children: [
          { id: 'milestone-definition', title: 'Milestone Definition' },
          { id: 'critical-path', title: 'Critical Path Awareness' },
          { id: 'buffer-and-contingency', title: 'Buffer and Contingency Planning' },
          { id: 'timeline-communication', title: 'Timeline Communication to Clients' },
          { id: 'slippage-handling', title: 'Handling Timeline Slippage' },
          { id: 'accelerated-delivery', title: 'Accelerated Delivery Requests' },
        ],
      },
      {
        id: 'agile-in-client-context',
        title: 'Agile Delivery in Client Contexts',
        children: [
          { id: 'agile-vs-waterfall-clients', title: 'Agile vs Waterfall Client Expectations' },
          { id: 'sprint-cadence-with-clients', title: 'Sprint Cadence with Clients' },
          { id: 'client-sprint-reviews', title: 'Client Sprint Reviews and Demos' },
          { id: 'backlog-co-ownership', title: 'Backlog Co-Ownership' },
          { id: 'hybrid-delivery-models', title: 'Hybrid Delivery Models' },
          { id: 'agile-reporting-for-clients', title: 'Agile Reporting for Clients' },
        ],
      },
      {
        id: 'meeting-cadences',
        title: 'Client Meeting Cadences and Rituals',
        children: [
          { id: 'standing-meetings', title: 'Standing Meetings (Standups, Syncs)' },
          { id: 'steering-committee-meetings', title: 'Steering Committee Meetings' },
          { id: 'office-hours', title: 'Office Hours with Client Teams' },
          { id: 'quarterly-business-reviews', title: 'Quarterly Business Reviews (QBRs)' },
          { id: 'meeting-effectiveness', title: 'Meeting Effectiveness' },
          { id: 'calendar-hygiene', title: 'Calendar Hygiene Across Time Zones' },
        ],
      },
      {
        id: 'status-reporting',
        title: 'Status Reporting and Transparency',
        children: [
          { id: 'rag-status', title: 'RAG (Red/Amber/Green) Status' },
          { id: 'weekly-status-format', title: 'Weekly Status Report Format' },
          { id: 'executive-dashboards', title: 'Executive Dashboards' },
          { id: 'bad-news-early', title: 'Delivering Bad News Early' },
          { id: 'transparency-vs-alarm', title: 'Transparency vs Alarm' },
          { id: 'metrics-that-matter', title: 'Metrics That Matter to Clients' },
        ],
      },
    ],
  },
  {
    id: 'expectation-and-risk-management',
    title: 'Expectation, Risk and Difficult Situations',
    summary: 'Manage expectations, handle scope creep, and navigate crises professionally.',
    level: 'intermediate',
    roots: [
      {
        id: 'expectation-management',
        title: 'Expectation Management',
        children: [
          { id: 'setting-expectations-early', title: 'Setting Expectations Early' },
          { id: 'under-promise-over-deliver', title: 'Under-Promise, Over-Deliver (Responsibly)' },
          { id: 'realistic-timelines', title: 'Setting Realistic Timelines' },
          { id: 'capability-boundaries', title: 'Communicating Capability Boundaries' },
          { id: 'expectation-reset-conversations', title: 'Expectation Reset Conversations' },
          { id: 'documenting-agreements', title: 'Documenting Mutual Agreements' },
        ],
      },
      {
        id: 'scope-creep-change-requests',
        title: 'Scope Creep and Change Requests',
        children: [
          { id: 'recognizing-scope-creep', title: 'Recognizing Scope Creep Early' },
          { id: 'change-request-process', title: 'Change Request Process' },
          { id: 'impact-assessment', title: 'Impact Assessment for Changes' },
          { id: 'saying-no-to-scope', title: 'Saying No to Scope (With Alternatives)' },
          { id: 'tradeoff-conversations', title: 'Tradeoff Conversations' },
          { id: 'change-order-documentation', title: 'Change Order Documentation' },
        ],
      },
      {
        id: 'risk-management',
        title: 'Risk Identification and Mitigation',
        children: [
          { id: 'risk-registers', title: 'Risk Registers for Engagements' },
          { id: 'technical-risks', title: 'Technical Risks' },
          { id: 'organizational-risks', title: 'Organizational and Political Risks' },
          { id: 'dependency-risks', title: 'Dependency Risks' },
          { id: 'mitigation-strategies', title: 'Mitigation Strategies' },
          { id: 'risk-communication', title: 'Communicating Risks to Clients' },
        ],
      },
      {
        id: 'issue-escalation',
        title: 'Issue Escalation and Crisis Response',
        children: [
          { id: 'escalation-paths', title: 'Escalation Paths (Client and Internal)' },
          { id: 'when-to-escalate', title: 'When to Escalate' },
          { id: 'incident-communication', title: 'Incident Communication to Clients' },
          { id: 'war-room-dynamics', title: 'War Room Dynamics' },
          { id: 'post-incident-reviews', title: 'Post-Incident Reviews with Clients' },
          { id: 'crisis-leadership', title: 'Crisis Leadership as an FDE' },
        ],
      },
      {
        id: 'difficult-conversations',
        title: 'Difficult Conversations with Clients',
        children: [
          { id: 'preparing-for-hard-talks', title: 'Preparing for Hard Conversations' },
          { id: 'feedback-to-clients', title: 'Giving Feedback to Clients' },
          { id: 'receiving-criticism', title: 'Receiving Client Criticism' },
          { id: 'conflict-de-escalation', title: 'Conflict De-Escalation' },
          { id: 'mediating-disputes', title: 'Mediating Disputes Between Client Teams' },
          { id: 'repairing-relationships', title: 'Repairing Damaged Relationships' },
        ],
      },
      {
        id: 'failure-recovery',
        title: 'Recovering from Setbacks and Failures',
        children: [
          { id: 'acknowledging-failure', title: 'Acknowledging Failure Honestly' },
          { id: 'root-cause-with-clients', title: 'Root Cause Analysis with Clients' },
          { id: 'recovery-plans', title: 'Recovery Plans and Turnaround' },
          { id: 'rebuilding-confidence', title: 'Rebuilding Client Confidence' },
          { id: 'lessons-learned-sessions', title: 'Lessons Learned Sessions' },
          { id: 'when-to-walk-away', title: 'When to Walk Away from an Engagement' },
        ],
      },
      {
        id: 'boundary-setting',
        title: 'Professional Boundaries',
        children: [
          { id: 'availability-boundaries', title: 'Availability and After-Hours Boundaries' },
          { id: 'scope-boundaries', title: 'Scope Boundaries' },
          { id: 'personal-vs-professional', title: 'Personal vs Professional Boundaries' },
          { id: 'gifts-and-hospitality', title: 'Gifts and Hospitality Policies' },
          { id: 'conflict-of-interest', title: 'Conflict of Interest Awareness' },
          { id: 'saying-no-gracefully', title: 'Saying No Gracefully' },
        ],
      },
    ],
  },
  {
    id: 'solution-design-client-context',
    title: 'Solution Design in Client Contexts',
    summary: 'Design solutions that fit client constraints, IT realities, and business goals.',
    level: 'intermediate',
    roots: [
      {
        id: 'solution-design-constraints',
        title: 'Solution Design with Client Constraints',
        children: [
          { id: 'constraint-mapping', title: 'Constraint Mapping' },
          { id: 'technical-debt-awareness', title: 'Client Technical Debt Awareness' },
          { id: 'budget-constraints', title: 'Budget and Resource Constraints' },
          { id: 'timeline-constraints', title: 'Timeline Constraints' },
          { id: 'skill-constraints', title: 'Client Team Skill Constraints' },
          { id: 'good-enough-architecture', title: 'Good-Enough Architecture' },
        ],
      },
      {
        id: 'poc-and-pilot-design',
        title: 'POC and Pilot Design',
        children: [
          { id: 'poc-vs-pilot-vs-mvp', title: 'POC vs Pilot vs MVP' },
          { id: 'poc-scoping', title: 'POC Scoping and Success Criteria' },
          { id: 'pilot-rollout-plan', title: 'Pilot Rollout Plan' },
          { id: 'poc-to-production-path', title: 'POC to Production Path' },
          { id: 'managing-poc-expectations', title: 'Managing POC Expectations' },
          { id: 'killing-failed-pocs', title: 'Killing Failed POCs Gracefully' },
        ],
      },
      {
        id: 'integration-planning',
        title: 'Integration Planning in Client Environments',
        children: [
          { id: 'integration-inventory-design', title: 'Integration Inventory and Design' },
          { id: 'api-and-data-contracts', title: 'API and Data Contracts with Client Systems' },
          { id: 'middleware-patterns', title: 'Middleware and Adapter Patterns' },
          { id: 'legacy-system-integration', title: 'Legacy System Integration' },
          { id: 'integration-testing-with-client', title: 'Integration Testing with Client Teams' },
          { id: 'integration-governance', title: 'Integration Governance' },
        ],
      },
      {
        id: 'customization-tradeoffs',
        title: 'Customization vs Product Standard Tradeoffs',
        children: [
          { id: 'config-vs-custom', title: 'Configuration vs Customization vs Extension' },
          { id: 'product-roadmap-alignment', title: 'Aligning with Product Roadmap' },
          { id: 'technical-debt-from-customization', title: 'Technical Debt from Customization' },
          { id: 'upgrade-path-implications', title: 'Upgrade Path Implications' },
          { id: 'client-specific-vs-reusable', title: 'Client-Specific vs Reusable Solutions' },
          { id: 'negotiating-customization', title: 'Negotiating Customization Requests' },
        ],
      },
      {
        id: 'security-compliance-constraints',
        title: 'Security, Compliance and Client IT Constraints',
        children: [
          { id: 'client-security-reviews', title: 'Client Security Reviews' },
          { id: 'data-residency', title: 'Data Residency and Sovereignty' },
          { id: 'compliance-frameworks-client', title: 'Compliance Frameworks (SOC2, HIPAA, GDPR)' },
          { id: 'client-change-management', title: 'Client Change Management Processes' },
          { id: 'vpn-and-access-patterns', title: 'VPN and Access Patterns' },
          { id: 'working-with-client-infosec', title: 'Working with Client InfoSec' },
        ],
      },
      {
        id: 'client-engineering-collaboration',
        title: 'Working with Client Engineering Teams',
        children: [
          { id: 'pairing-with-client-engineers', title: 'Pairing with Client Engineers' },
          { id: 'code-review-with-clients', title: 'Code Review with Client Teams' },
          { id: 'shared-repositories', title: 'Shared Repositories and Workflows' },
          { id: 'knowledge-sharing-sessions', title: 'Knowledge Sharing Sessions' },
          { id: 'building-client-capability', title: 'Building Client Engineering Capability' },
          { id: 'managing-skill-gaps', title: 'Managing Client Skill Gaps' },
        ],
      },
      {
        id: 'architecture-presentations',
        title: 'Architecture Communication to Clients',
        children: [
          { id: 'architecture-decision-records-client', title: 'ADRs for Client Audiences' },
          { id: 'architecture-review-meetings', title: 'Architecture Review Meetings' },
          { id: 'tradeoff-presentations', title: 'Tradeoff Presentations' },
          { id: 'future-state-vision', title: 'Future-State Vision Documents' },
          { id: 'architecture-sign-off', title: 'Architecture Sign-Off Processes' },
          { id: 'diagram-standards', title: 'Diagram Standards for Client Deliverables' },
        ],
      },
    ],
  },
  {
    id: 'hands-on-implementation',
    title: 'Hands-On Implementation at Client Sites',
    summary: 'Build, debug, and deploy in unfamiliar client environments with confidence.',
    level: 'intermediate',
    roots: [
      {
        id: 'onsite-implementation',
        title: 'On-Site Implementation Practices',
        children: [
          { id: 'environment-setup-client', title: 'Environment Setup at Client Sites' },
          { id: 'client-tooling-adaptation', title: 'Adapting to Client Tooling' },
          { id: 'daily-standups-onsite', title: 'Daily Standups On-Site' },
          { id: 'working-hours-and-culture', title: 'Working Hours and Site Culture' },
          { id: 'badge-and-facility-access', title: 'Badge, Facility and Security Access' },
          { id: 'onsite-vs-remote-hybrid', title: 'On-Site vs Remote Implementation Split' },
        ],
      },
      {
        id: 'co-development',
        title: 'Co-Development with Client Teams',
        children: [
          { id: 'shared-coding-standards', title: 'Shared Coding Standards' },
          { id: 'mob-and-pair-programming', title: 'Mob and Pair Programming with Clients' },
          { id: 'handoff-and-ownership', title: 'Handoff and Ownership Models' },
          { id: 'client-contribution-workflows', title: 'Client Contribution Workflows' },
          { id: 'building-client-confidence', title: 'Building Client Confidence in Code' },
          { id: 'teaching-while-building', title: 'Teaching While Building' },
        ],
      },
      {
        id: 'debugging-unfamiliar-envs',
        title: 'Debugging in Unfamiliar Environments',
        children: [
          { id: 'rapid-environment-orientation', title: 'Rapid Environment Orientation' },
          { id: 'log-and-trace-access', title: 'Log and Trace Access Patterns' },
          { id: 'debugging-without-full-access', title: 'Debugging Without Full Access' },
          { id: 'collaborative-debugging', title: 'Collaborative Debugging Sessions' },
          { id: 'production-debugging-etiquette', title: 'Production Debugging Etiquette' },
          { id: 'documenting-findings', title: 'Documenting Findings for Client Teams' },
        ],
      },
      {
        id: 'deployment-and-cutover',
        title: 'Deployment and Cutover Support',
        children: [
          { id: 'deployment-planning-client', title: 'Deployment Planning with Clients' },
          { id: 'rollback-strategies', title: 'Rollback Strategies' },
          { id: 'cutover-runbooks', title: 'Cutover Runbooks' },
          { id: 'hypercare-period', title: 'Hypercare Period Management' },
          { id: 'go-no-go-decisions', title: 'Go/No-Go Decision Meetings' },
          { id: 'post-deployment-validation', title: 'Post-Deployment Validation' },
        ],
      },
      {
        id: 'data-migration',
        title: 'Data Migration and Transformation',
        children: [
          { id: 'migration-planning', title: 'Migration Planning with Clients' },
          { id: 'data-mapping', title: 'Data Mapping and Validation' },
          { id: 'dry-runs', title: 'Dry Runs and Rehearsals' },
          { id: 'migration-communication', title: 'Migration Communication to Stakeholders' },
          { id: 'data-quality-issues', title: 'Handling Data Quality Issues' },
          { id: 'rollback-data-migration', title: 'Rollback for Data Migration' },
        ],
      },
      {
        id: 'performance-in-client-context',
        title: 'Performance and Optimization in Client Context',
        children: [
          { id: 'baseline-measurement', title: 'Baseline Measurement with Client Data' },
          { id: 'performance-conversations', title: 'Performance Conversations with Clients' },
          { id: 'optimization-prioritization', title: 'Optimization Prioritization' },
          { id: 'client-infra-constraints', title: 'Client Infrastructure Constraints' },
          { id: 'load-testing-with-client', title: 'Load Testing with Client Teams' },
          { id: 'performance-sign-off', title: 'Performance Sign-Off' },
        ],
      },
      {
        id: 'implementation-documentation',
        title: 'Implementation Documentation and Handoff',
        children: [
          { id: 'runbook-creation', title: 'Runbook Creation' },
          { id: 'architecture-documentation', title: 'Architecture Documentation for Handoff' },
          { id: 'operational-playbooks', title: 'Operational Playbooks' },
          { id: 'known-issues-log', title: 'Known Issues Log' },
          { id: 'handoff-checklist', title: 'Handoff Checklist' },
          { id: 'documentation-standards', title: 'Documentation Standards for Clients' },
        ],
      },
    ],
  },
  {
    id: 'enablement-knowledge-transfer',
    title: 'Enablement and Knowledge Transfer',
    summary: 'Train client teams, measure adoption, and transition to steady-state support.',
    level: 'intermediate',
    roots: [
      {
        id: 'client-training-design',
        title: 'Training Design for Client Teams',
        children: [
          { id: 'audience-analysis', title: 'Audience Analysis for Training' },
          { id: 'learning-objectives', title: 'Learning Objectives' },
          { id: 'training-formats', title: 'Training Formats (Workshop, Self-Paced, Lab)' },
          { id: 'hands-on-labs', title: 'Hands-On Lab Design' },
          { id: 'training-materials', title: 'Training Materials and Slides' },
          { id: 'certification-paths', title: 'Certification and Assessment Paths' },
        ],
      },
      {
        id: 'train-the-trainer',
        title: 'Train-the-Trainer Approaches',
        children: [
          { id: 'identifying-client-trainers', title: 'Identifying Client Trainers' },
          { id: 'trainer-enablement', title: 'Trainer Enablement Sessions' },
          { id: 'trainer-materials', title: 'Trainer Materials and Facilitator Guides' },
          { id: 'cascade-training', title: 'Cascade Training Models' },
          { id: 'trainer-certification', title: 'Trainer Certification' },
          { id: 'sustaining-trainer-network', title: 'Sustaining a Trainer Network' },
        ],
      },
      {
        id: 'knowledge-transfer-planning',
        title: 'Knowledge Transfer Planning',
        children: [
          { id: 'kt-plan-structure', title: 'Knowledge Transfer Plan Structure' },
          { id: 'kt-milestones', title: 'KT Milestones and Checkpoints' },
          { id: 'shadowing-and-reverse-shadowing', title: 'Shadowing and Reverse Shadowing' },
          { id: 'documentation-as-kt', title: 'Documentation as Knowledge Transfer' },
          { id: 'kt-metrics', title: 'KT Completion Metrics' },
          { id: 'partial-kt-scenarios', title: 'Partial KT Scenarios' },
        ],
      },
      {
        id: 'building-self-sufficiency',
        title: 'Building Client Self-Sufficiency',
        children: [
          { id: 'self-service-enablement', title: 'Self-Service Enablement' },
          { id: 'admin-and-operator-training', title: 'Admin and Operator Training' },
          { id: 'developer-enablement', title: 'Developer Enablement' },
          { id: 'support-tier-transition', title: 'Support Tier Transition' },
          { id: 'community-of-practice', title: 'Community of Practice with Clients' },
          { id: 'measuring-self-sufficiency', title: 'Measuring Self-Sufficiency' },
        ],
      },
      {
        id: 'adoption-measurement',
        title: 'Adoption Measurement and Success',
        children: [
          { id: 'adoption-metrics-framework', title: 'Adoption Metrics Framework' },
          { id: 'usage-analytics', title: 'Usage Analytics with Clients' },
          { id: 'feedback-loops', title: 'Feedback Loops Post-Launch' },
          { id: 'health-scores', title: 'Client Health Scores' },
          { id: 'value-realization', title: 'Value Realization Tracking' },
          { id: 'adoption-interventions', title: 'Adoption Interventions' },
        ],
      },
      {
        id: 'steady-state-transition',
        title: 'Transition to Steady State',
        children: [
          { id: 'support-model-definition', title: 'Support Model Definition' },
          { id: 'sla-and-escalation-handoff', title: 'SLA and Escalation Handoff' },
          { id: 'hypercare-to-steady-state', title: 'Hypercare to Steady State' },
          { id: 'client-success-handoff', title: 'Handoff to Customer Success' },
          { id: 'internal-handoff', title: 'Internal Handoff (Eng to Support)' },
          { id: 'transition-sign-off', title: 'Transition Sign-Off' },
        ],
      },
      {
        id: 'ongoing-enablement',
        title: 'Ongoing Enablement and Office Hours',
        children: [
          { id: 'office-hours-format', title: 'Office Hours Format' },
          { id: 'office-hours-facilitation', title: 'Office Hours Facilitation' },
          { id: 'faq-and-knowledge-base', title: 'FAQ and Knowledge Base' },
          { id: 'release-notes-for-clients', title: 'Release Notes for Clients' },
          { id: 'feature-announcement', title: 'Feature Announcement to Clients' },
          { id: 'continuous-learning-programs', title: 'Continuous Learning Programs' },
        ],
      },
    ],
  },
  {
    id: 'presales-commercial',
    title: 'Pre-Sales and Commercial Awareness',
    summary: 'Support deals ethically, understand commercial dynamics, and drive expansion.',
    level: 'advanced',
    roots: [
      {
        id: 'presales-fundamentals',
        title: 'Pre-Sales Fundamentals for FDEs',
        children: [
          { id: 'presales-lifecycle', title: 'Pre-Sales Lifecycle' },
          { id: 'technical-discovery-for-sales', title: 'Technical Discovery for Sales' },
          { id: 'qualification-criteria', title: 'Qualification Criteria (BANT, MEDDIC Overview)' },
          { id: 'rfp-and-rfi-support', title: 'RFP and RFI Support' },
          { id: 'demo-environments', title: 'Demo Environments and Sandboxes' },
          { id: 'presales-to-delivery-handoff', title: 'Pre-Sales to Delivery Handoff' },
        ],
      },
      {
        id: 'technical-win-strategies',
        title: 'Technical Win Strategies',
        children: [
          { id: 'competitive-differentiation', title: 'Competitive Differentiation' },
          { id: 'proof-points', title: 'Proof Points and Case Studies' },
          { id: 'technical-objection-handling', title: 'Technical Objection Handling' },
          { id: 'architecture-in-sales', title: 'Architecture in Sales Conversations' },
          { id: 'poc-as-sales-tool', title: 'POC as a Sales Tool' },
          { id: 'avoiding-over-commitment', title: 'Avoiding Over-Commitment in Pre-Sales' },
        ],
      },
      {
        id: 'commercial-awareness',
        title: 'Commercial Awareness for FDEs',
        children: [
          { id: 'pricing-models', title: 'Pricing Models (Subscription, Usage, T&M)' },
          { id: 'contract-types', title: 'Contract Types (Fixed, T&M, Outcome-Based)' },
          { id: 'margin-and-profitability', title: 'Margin and Profitability Awareness' },
          { id: 'procurement-process', title: 'Client Procurement Process' },
          { id: 'vendor-management', title: 'Vendor Management at Client' },
          { id: 'commercial-conversations', title: 'Participating in Commercial Conversations' },
        ],
      },
      {
        id: 'expansion-and-renewal',
        title: 'Expansion, Upsell and Renewal',
        children: [
          { id: 'identifying-expansion-signals', title: 'Identifying Expansion Signals' },
          { id: 'land-and-expand', title: 'Land and Expand Strategy' },
          { id: 'expansion-proposals', title: 'Expansion Proposals' },
          { id: 'renewal-conversations', title: 'Renewal Conversations' },
          { id: 'churn-risk-indicators', title: 'Churn Risk Indicators' },
          { id: 'ethical-upsell', title: 'Ethical Upsell Practices' },
        ],
      },
      {
        id: 'roi-and-value-conversations',
        title: 'ROI and Value Conversations',
        children: [
          { id: 'business-case-development', title: 'Business Case Development' },
          { id: 'roi-calculation-basics', title: 'ROI Calculation Basics' },
          { id: 'tco-conversations', title: 'Total Cost of Ownership Conversations' },
          { id: 'value-realization-stories', title: 'Value Realization Stories' },
          { id: 'benchmarking', title: 'Benchmarking and Comparisons' },
          { id: 'executive-value-narrative', title: 'Executive Value Narrative' },
        ],
      },
      {
        id: 'partner-ecosystem',
        title: 'Partner and Ecosystem Coordination',
        children: [
          { id: 'si-and-partner-models', title: 'SI and Partner Models' },
          { id: 'co-selling-dynamics', title: 'Co-Selling Dynamics' },
          { id: 'partner-delivery-handoff', title: 'Partner Delivery Handoff' },
          { id: 'multi-vendor-engagements', title: 'Multi-Vendor Engagements' },
          { id: 'partner-conflict-resolution', title: 'Partner Conflict Resolution' },
          { id: 'ecosystem-integration', title: 'Ecosystem Integration Planning' },
        ],
      },
      {
        id: 'deal-support-without-overcommitting',
        title: 'Deal Support Without Over-Committing',
        children: [
          { id: 'honest-capability-assessment', title: 'Honest Capability Assessment' },
          { id: 'scope-in-proposals', title: 'Realistic Scope in Proposals' },
          { id: 'technical-assumptions', title: 'Documenting Technical Assumptions' },
          { id: 'red-flag-deals', title: 'Red Flag Deals' },
          { id: 'pushback-to-sales', title: 'Pushback to Sales Teams' },
          { id: 'post-win-reality-check', title: 'Post-Win Reality Check' },
        ],
      },
    ],
  },
  {
    id: 'advanced-engagement-patterns',
    title: 'Advanced Engagement Patterns',
    summary: 'Navigate complex industries, enterprise scale, and long-running strategic accounts.',
    level: 'advanced',
    roots: [
      {
        id: 'regulated-industry-engagements',
        title: 'Regulated Industry Engagements',
        children: [
          { id: 'fintech-engagements', title: 'FinTech Engagements' },
          { id: 'healthcare-engagements', title: 'Healthcare and HealthTech Engagements' },
          { id: 'government-public-sector', title: 'Government and Public Sector' },
          { id: 'defense-and-cleared-work', title: 'Defense and Cleared Work' },
          { id: 'audit-and-examination', title: 'Audit and Examination Support' },
          { id: 'regulatory-change-management', title: 'Regulatory Change Management' },
        ],
      },
      {
        id: 'enterprise-vs-startup-clients',
        title: 'Enterprise vs Startup Client Dynamics',
        children: [
          { id: 'enterprise-engagement-patterns', title: 'Enterprise Engagement Patterns' },
          { id: 'startup-engagement-patterns', title: 'Startup Engagement Patterns' },
          { id: 'mid-market-dynamics', title: 'Mid-Market Dynamics' },
          { id: 'speed-vs-process-tradeoffs', title: 'Speed vs Process Tradeoffs' },
          { id: 'decision-speed-differences', title: 'Decision Speed Differences' },
          { id: 'switching-between-contexts', title: 'Switching Between Contexts' },
        ],
      },
      {
        id: 'multi-site-global-rollouts',
        title: 'Multi-Site and Global Rollouts',
        children: [
          { id: 'rollout-strategies', title: 'Rollout Strategies (Big Bang, Phased, Pilot)' },
          { id: 'regional-variations', title: 'Regional Variations and Localization' },
          { id: 'global-program-management', title: 'Global Program Management' },
          { id: 'timezone-coordination', title: 'Timezone Coordination at Scale' },
          { id: 'regional-champions', title: 'Regional Champions Model' },
          { id: 'global-governance', title: 'Global Governance Structures' },
        ],
      },
      {
        id: 'strategic-account-management',
        title: 'Strategic Account Management',
        children: [
          { id: 'account-planning', title: 'Strategic Account Planning' },
          { id: 'relationship-mapping-at-scale', title: 'Relationship Mapping at Scale' },
          { id: 'executive-relationship-programs', title: 'Executive Relationship Programs' },
          { id: 'innovation-partnerships', title: 'Innovation Partnerships' },
          { id: 'co-development-agreements', title: 'Co-Development Agreements' },
          { id: 'reference-and-advocacy', title: 'Building Reference Clients and Advocacy' },
        ],
      },
      {
        id: 'transformation-programs',
        title: 'Large-Scale Transformation Programs',
        children: [
          { id: 'transformation-scope', title: 'Transformation Scope and Vision' },
          { id: 'change-management-integration', title: 'Change Management Integration' },
          { id: 'program-governance', title: 'Program Governance' },
          { id: 'multi-workstream-coordination', title: 'Multi-Workstream Coordination' },
          { id: 'transformation-metrics', title: 'Transformation Metrics' },
          { id: 'sustaining-transformation', title: 'Sustaining Transformation Gains' },
        ],
      },
      {
        id: 'industry-specific-patterns',
        title: 'Industry-Specific Engagement Patterns',
        children: [
          { id: 'retail-and-ecommerce', title: 'Retail and E-Commerce' },
          { id: 'manufacturing-and-supply-chain', title: 'Manufacturing and Supply Chain' },
          { id: 'media-and-entertainment', title: 'Media and Entertainment' },
          { id: 'energy-and-utilities', title: 'Energy and Utilities' },
          { id: 'telecom', title: 'Telecom' },
          { id: 'education-and-edtech', title: 'Education and EdTech' },
        ],
      },
      {
        id: 'long-running-engagements',
        title: 'Long-Running and Embedded Engagements',
        children: [
          { id: 'multi-year-engagement-models', title: 'Multi-Year Engagement Models' },
          { id: 'embedded-team-dynamics', title: 'Embedded Team Dynamics' },
          { id: 'avoiding-complacency', title: 'Avoiding Complacency Over Time' },
          { id: 'refreshing-engagement-value', title: 'Refreshing Engagement Value' },
          { id: 'rotation-and-continuity', title: 'Rotation and Continuity Planning' },
          { id: 'sunset-planning', title: 'Engagement Sunset Planning' },
        ],
      },
    ],
  },
  {
    id: 'security-compliance-ethics',
    title: 'Security, Compliance and Professional Ethics',
    summary: 'Handle data, access, and ethical boundaries correctly on every engagement.',
    level: 'advanced',
    roots: [
      {
        id: 'data-handling-client-sites',
        title: 'Data Handling at Client Sites',
        children: [
          { id: 'data-classification', title: 'Data Classification Awareness' },
          { id: 'pii-and-sensitive-data', title: 'PII and Sensitive Data Handling' },
          { id: 'data-minimization', title: 'Data Minimization Principles' },
          { id: 'client-data-on-personal-devices', title: 'Client Data on Personal Devices' },
          { id: 'data-retention-and-deletion', title: 'Data Retention and Deletion' },
          { id: 'breach-response', title: 'Data Breach Response Protocols' },
        ],
      },
      {
        id: 'access-and-security-clearances',
        title: 'Access Management and Clearances',
        children: [
          { id: 'least-privilege-access', title: 'Least Privilege Access' },
          { id: 'credential-management', title: 'Credential Management' },
          { id: 'security-clearance-basics', title: 'Security Clearance Basics' },
          { id: 'background-checks', title: 'Background Checks and Screening' },
          { id: 'access-reviews', title: 'Access Reviews and Offboarding' },
          { id: 'physical-security-onsite', title: 'Physical Security On-Site' },
        ],
      },
      {
        id: 'compliance-frameworks-fde',
        title: 'Compliance Frameworks for FDEs',
        children: [
          { id: 'soc2-awareness', title: 'SOC 2 Awareness' },
          { id: 'gdpr-for-fdes', title: 'GDPR for Client-Facing Engineers' },
          { id: 'hipaa-basics', title: 'HIPAA Basics for Health Engagements' },
          { id: 'pci-dss-awareness', title: 'PCI-DSS Awareness' },
          { id: 'industry-specific-compliance', title: 'Industry-Specific Compliance' },
          { id: 'compliance-documentation', title: 'Compliance Documentation' },
        ],
      },
      {
        id: 'nda-and-confidentiality',
        title: 'NDAs and Confidentiality',
        children: [
          { id: 'nda-types', title: 'NDA Types and Implications' },
          { id: 'confidentiality-in-practice', title: 'Confidentiality in Daily Practice' },
          { id: 'cross-client-knowledge', title: 'Cross-Client Knowledge Boundaries' },
          { id: 'public-speaking-and-clients', title: 'Public Speaking and Client References' },
          { id: 'social-media-and-clients', title: 'Social Media and Client Privacy' },
          { id: 'whistleblowing-awareness', title: 'Whistleblowing Awareness' },
        ],
      },
      {
        id: 'professional-ethics-fde',
        title: 'Professional Ethics for FDEs',
        children: [
          { id: 'honesty-and-integrity', title: 'Honesty and Integrity' },
          { id: 'conflict-of-interest-scenarios', title: 'Conflict of Interest Scenarios' },
          { id: 'gift-and-hospitality-ethics', title: 'Gift and Hospitality Ethics' },
          { id: 'vendor-neutrality', title: 'Vendor Neutrality' },
          { id: 'reporting-unethical-behavior', title: 'Reporting Unethical Behavior' },
          { id: 'ethical-ai-at-client', title: 'Ethical AI Deployment at Client Sites' },
        ],
      },
      {
        id: 'audit-support',
        title: 'Audit and Examination Support',
        children: [
          { id: 'audit-preparation', title: 'Audit Preparation' },
          { id: 'evidence-collection', title: 'Evidence Collection' },
          { id: 'auditor-interactions', title: 'Auditor Interactions' },
          { id: 'finding-remediation', title: 'Finding Remediation' },
          { id: 'continuous-audit-readiness', title: 'Continuous Audit Readiness' },
          { id: 'client-audit-coordination', title: 'Client Audit Coordination' },
        ],
      },
    ],
  },
  {
    id: 'personal-effectiveness-fde',
    title: 'Personal Effectiveness for FDEs',
    summary: 'Manage travel, energy, learning, and career growth as a client-facing engineer.',
    level: 'intermediate',
    roots: [
      {
        id: 'travel-and-onsite-life',
        title: 'Travel and On-Site Life',
        children: [
          { id: 'travel-logistics', title: 'Travel Logistics and Planning' },
          { id: 'onsite-routines', title: 'On-Site Routines and Productivity' },
          { id: 'jet-lag-management', title: 'Jet Lag and Timezone Management' },
          { id: 'expense-and-compliance', title: 'Expense Reporting and Compliance' },
          { id: 'work-life-balance-travel', title: 'Work-Life Balance While Traveling' },
          { id: 'safety-and-duty-of-care', title: 'Safety and Duty of Care' },
        ],
      },
      {
        id: 'energy-and-burnout',
        title: 'Energy Management and Burnout Prevention',
        children: [
          { id: 'client-facing-burnout', title: 'Client-Facing Burnout Patterns' },
          { id: 'recovery-rituals', title: 'Recovery Rituals Between Engagements' },
          { id: 'sustainable-pace', title: 'Sustainable Pace on Engagements' },
          { id: 'setting-personal-boundaries', title: 'Setting Personal Boundaries' },
          { id: 'support-systems', title: 'Support Systems (Manager, Peers, Mentor)' },
          { id: 'recognizing-burnout-early', title: 'Recognizing Burnout Early' },
        ],
      },
      {
        id: 'continuous-learning-fde',
        title: 'Continuous Learning as an FDE',
        children: [
          { id: 'learning-in-engagements', title: 'Learning During Engagements' },
          { id: 'domain-deep-dives', title: 'Domain Deep Dives Between Engagements' },
          { id: 'technical-skill-maintenance', title: 'Technical Skill Maintenance' },
          { id: 'soft-skill-development', title: 'Soft Skill Development' },
          { id: 'learning-from-failures', title: 'Learning from Failed Engagements' },
          { id: 'peer-learning-networks', title: 'Peer Learning Networks' },
        ],
      },
      {
        id: 'portfolio-and-storytelling',
        title: 'Portfolio and Career Storytelling',
        children: [
          { id: 'engagement-portfolio', title: 'Building an Engagement Portfolio' },
          { id: 'case-study-writing', title: 'Writing Client Case Studies (Anonymized)' },
          { id: 'resume-for-fde', title: 'Resume for FDE Roles' },
          { id: 'interview-for-fde', title: 'Interviewing for FDE Roles' },
          { id: 'internal-promotion-narrative', title: 'Internal Promotion Narrative' },
          { id: 'thought-leadership', title: 'Thought Leadership for FDEs' },
        ],
      },
      {
        id: 'networking-and-reputation',
        title: 'Networking and Reputation',
        children: [
          { id: 'internal-networking', title: 'Internal Networking (Sales, CS, Product)' },
          { id: 'client-alumni-networks', title: 'Client Alumni Networks' },
          { id: 'industry-events', title: 'Industry Events and Conferences' },
          { id: 'online-presence', title: 'Professional Online Presence' },
          { id: 'referrals-and-recommendations', title: 'Referrals and Recommendations' },
          { id: 'reputation-management', title: 'Reputation Management' },
        ],
      },
      {
        id: 'time-and-prioritization',
        title: 'Time Management and Prioritization',
        children: [
          { id: 'multi-engagement-prioritization', title: 'Multi-Engagement Prioritization' },
          { id: 'context-switching', title: 'Context Switching Between Clients' },
          { id: 'deep-work-on-engagements', title: 'Deep Work on Engagements' },
          { id: 'admin-and-overhead', title: 'Admin and Overhead Management' },
          { id: 'delegation-to-client', title: 'Delegation to Client Teams' },
          { id: 'weekly-planning-rituals', title: 'Weekly Planning Rituals' },
        ],
      },
    ],
  },
  {
    id: 'fde-leadership-expert',
    title: 'Expert FDE Leadership and Mastery',
    summary: 'Lead engagements, mentor FDEs, set standards, and operate at expert level.',
    level: 'advanced',
    roots: [
      {
        id: 'leading-client-engagements',
        title: 'Leading Client Engagements',
        children: [
          { id: 'engagement-lead-role', title: 'Engagement Lead Role' },
          { id: 'team-composition', title: 'Team Composition and Staffing' },
          { id: 'engagement-governance', title: 'Engagement Governance' },
          { id: 'quality-assurance-engagements', title: 'Quality Assurance on Engagements' },
          { id: 'client-relationship-ownership', title: 'Client Relationship Ownership' },
          { id: 'engagement-retrospectives', title: 'Engagement Retrospectives' },
        ],
      },
      {
        id: 'mentoring-fdes',
        title: 'Mentoring and Coaching FDEs',
        children: [
          { id: 'onboarding-new-fdes', title: 'Onboarding New FDEs' },
          { id: 'shadowing-programs', title: 'Shadowing Programs' },
          { id: 'coaching-difficult-situations', title: 'Coaching Through Difficult Situations' },
          { id: 'feedback-for-fdes', title: 'Giving Feedback to FDEs' },
          { id: 'career-coaching-fde', title: 'Career Coaching for FDEs' },
          { id: 'building-fde-bench', title: 'Building an FDE Bench' },
        ],
      },
      {
        id: 'engagement-standards-playbooks',
        title: 'Engagement Standards and Playbooks',
        children: [
          { id: 'methodology-definition', title: 'Methodology Definition' },
          { id: 'playbook-creation', title: 'Playbook Creation' },
          { id: 'templates-and-artifacts', title: 'Templates and Standard Artifacts' },
          { id: 'quality-bars', title: 'Quality Bars for Deliverables' },
          { id: 'lessons-learned-system', title: 'Lessons Learned System' },
          { id: 'continuous-improvement', title: 'Continuous Improvement of Methods' },
        ],
      },
      {
        id: 'reusable-ip-accelerators',
        title: 'Reusable IP and Accelerators',
        children: [
          { id: 'accelerator-design', title: 'Accelerator Design' },
          { id: 'reference-architectures', title: 'Reference Architectures for Clients' },
          { id: 'starter-kits', title: 'Starter Kits and Boilerplates' },
          { id: 'industry-accelerators', title: 'Industry-Specific Accelerators' },
          { id: 'ip-governance', title: 'IP Governance and Licensing' },
          { id: 'measuring-accelerator-impact', title: 'Measuring Accelerator Impact' },
        ],
      },
      {
        id: 'fde-org-design',
        title: 'FDE Organization Design',
        children: [
          { id: 'fde-team-structure', title: 'FDE Team Structure Models' },
          { id: 'regional-vs-centralized', title: 'Regional vs Centralized FDE Teams' },
          { id: 'fde-to-cs-handoff-model', title: 'FDE to CS Handoff Models' },
          { id: 'fde-and-product-feedback-loop', title: 'FDE and Product Feedback Loop' },
          { id: 'capacity-planning-fde', title: 'FDE Capacity Planning' },
          { id: 'metrics-for-fde-org', title: 'Metrics for FDE Organizations' },
        ],
      },
      {
        id: 'strategic-influence',
        title: 'Strategic Influence and Thought Leadership',
        children: [
          { id: 'influencing-product-roadmap', title: 'Influencing Product Roadmap from Field' },
          { id: 'executive-advisory', title: 'Executive Advisory Relationships' },
          { id: 'industry-analyst-relations', title: 'Industry Analyst Relations' },
          { id: 'speaking-and-writing', title: 'Speaking and Writing as an Expert FDE' },
          { id: 'building-practice-area', title: 'Building a Practice Area' },
          { id: 'setting-industry-standards', title: 'Setting Industry Standards' },
        ],
      },
      {
        id: 'fde-career-progression',
        title: 'FDE Career Progression to Expert',
        children: [
          { id: 'fde-levels-and-expectations', title: 'FDE Levels and Expectations' },
          { id: 'junior-to-mid-fde', title: 'Junior to Mid FDE Progression' },
          { id: 'mid-to-senior-fde', title: 'Mid to Senior FDE Progression' },
          { id: 'senior-to-staff-fde', title: 'Senior to Staff/Principal FDE' },
          { id: 'fde-to-leadership-tracks', title: 'FDE to Leadership Tracks' },
          { id: 'expert-fde-mastery-criteria', title: 'Expert FDE Mastery Criteria' },
        ],
      },
      {
        id: 'frontier-fde-2026',
        title: 'Frontier FDE Practices (2026)',
        children: [
          { id: 'ai-augmented-client-engagement', title: 'AI-Augmented Client Engagement' },
          { id: 'ai-copilots-for-fdes', title: 'AI Copilots for FDEs' },
          { id: 'eval-and-agent-deployments', title: 'Eval and Agent Deployments at Clients' },
          { id: 'responsible-ai-at-client', title: 'Responsible AI at Client Sites' },
          { id: 'fde-in-ai-native-companies', title: 'FDE in AI-Native Companies' },
          { id: 'future-of-fde-role', title: 'Future of the FDE Role' },
        ],
      },
    ],
  },
]

// -----------------------------------------------------------------------------
// Sub-subtopic expansion — each subtopic gets a third level for future content.
// -----------------------------------------------------------------------------

function defaultGrandchildren(subtopic) {
  const base = subtopic.title
  return [
    { id: 'foundations', title: `Foundations of ${base}` },
    { id: 'execution', title: `Executing ${base} on Engagements` },
    { id: 'stakeholder-variations', title: `${base} Across Stakeholder Types` },
    { id: 'anti-patterns', title: `${base}: Anti-Patterns and Recovery` },
  ]
}

function withGrandchildren(roots) {
  return roots.map((root) => ({
    ...root,
    children: (root.children ?? []).map((child) => ({
      ...child,
      children: child.children?.length ? child.children : defaultGrandchildren(child),
    })),
  }))
}

const EXPANDED_STAGES = STAGES.map((stage) => ({
  ...stage,
  roots: withGrandchildren(stage.roots),
}))

// -----------------------------------------------------------------------------
// Writer
// -----------------------------------------------------------------------------

function buildRoadmap() {
  return {
    title: 'Client Engagement Skills Learning Roadmap',
    stages: STAGES.map((stage) => ({
      id: stage.id,
      title: stage.title,
      summary: stage.summary,
      nodes: stage.roots.map((root) => ({
        id: root.id,
        title: root.title,
        topicId: root.id,
        status: 'core',
        description: root.title,
      })),
    })),
  }
}

function writeTopicFile(id, meta) {
  const dir = resolve(TOPICS_DIR, id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
}

function topicExists(id) {
  return existsSync(resolve(TOPICS_DIR, id, 'topic.json'))
}

function seedChildren(children, parentId, parentLevel, tag, depth = 0) {
  let written = 0
  let skipped = 0
  let order = 1
  for (const child of children) {
    const childId = `${parentId}--${child.id}`
    const childLevel = child.level ?? parentLevel
    if (topicExists(childId)) {
      skipped += 1
    } else {
      writeTopicFile(childId, {
        id: childId,
        title: child.title,
        ...(depth < 1 ? { summary: child.title } : {}),
        order,
        level: childLevel,
        tags: [tag],
        parentId,
      })
      written += 1
    }
    order += 1
    if (child.children?.length) {
      const nested = seedChildren(child.children, childId, childLevel, tag, depth + 1)
      written += nested.written
      skipped += nested.skipped
    }
  }
  return { written, skipped }
}

function seedAll() {
  const roadmap = buildRoadmap()
  writeFileSync(resolve(SUBJECT_DIR, 'roadmap.json'), JSON.stringify(roadmap, null, 2) + '\n')
  console.log(`Wrote roadmap.json (${roadmap.stages.length} stages, ${roadmap.stages.reduce((n, s) => n + s.nodes.length, 0)} root topics)`)

  let written = 0
  let skipped = 0
  let rootOrder = 1

  for (const stage of EXPANDED_STAGES) {
    const tag = stage.id
    const stageLevel = stage.level ?? 'beginner'

    for (const root of stage.roots) {
      const level = root.level ?? stageLevel
      if (topicExists(root.id)) {
        skipped += 1
      } else {
        writeTopicFile(root.id, {
          id: root.id,
          title: root.title,
          summary: root.title,
          order: rootOrder,
          level,
          tags: [tag],
        })
        written += 1
      }
      rootOrder += 1

      const nested = seedChildren(root.children ?? [], root.id, level, tag)
      written += nested.written
      skipped += nested.skipped
    }
  }

  console.log(`[client-engagement-skills] wrote ${written}, skipped ${skipped}.`)
}

seedAll()
