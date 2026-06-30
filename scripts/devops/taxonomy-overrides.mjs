/**
 * Manual overrides for auto-generated technical taxonomy groupings.
 * Keys replace entries in GENERATED_TAXONOMY entirely when present.
 */
export const TAXONOMY_OVERRIDES = {
  'devops-fundamentals': [
    {
      id: 'devops-fundamentals--concepts-history-comparisons',
      title: 'Concepts, History & Comparisons',
      leaves: [
        { id: 'what-is-devops', title: 'What is DevOps?' },
        { id: 'devops-history-evolution', title: 'History & Evolution of DevOps' },
        { id: 'devops-vs-traditional-it', title: 'DevOps vs Traditional IT' },
        { id: 'agile-vs-devops', title: 'Agile vs DevOps' },
      ],
    },
    {
      id: 'core-devops-principles',
      title: 'Core DevOps Principles',
      leaves: [
        { id: 'automation', title: 'Automation' },
        { id: 'collaboration', title: 'Collaboration' },
        { id: 'continuous-improvement', title: 'Continuous Improvement' },
        { id: 'customer-centricity', title: 'Customer Centricity' },
        { id: 'measurement', title: 'Measurement' },
        { id: 'sharing', title: 'Sharing' },
      ],
    },
    {
      id: 'calms-framework',
      title: 'CALMS Framework',
      leaves: [
        { id: 'calms-culture', title: 'Culture' },
        { id: 'calms-automation', title: 'Automation' },
        { id: 'calms-lean', title: 'Lean' },
        { id: 'calms-measurement', title: 'Measurement' },
        { id: 'calms-sharing', title: 'Sharing' },
      ],
    },
    {
      id: 'three-ways-of-devops',
      title: 'Three Ways of DevOps',
      leaves: [
        { id: 'first-way-flow', title: 'First Way: Flow' },
        { id: 'second-way-feedback', title: 'Second Way: Feedback' },
        { id: 'third-way-continuous-learning', title: 'Third Way: Continuous Learning' },
      ],
    },
    {
      id: 'devops-culture',
      title: 'DevOps Culture',
      leaves: [
        { id: 'psychological-safety', title: 'Psychological Safety' },
        { id: 'blameless-culture', title: 'Blameless Culture' },
        { id: 'shared-ownership', title: 'Shared Ownership' },
        { id: 'team-topologies', title: 'Team Topologies' },
        { id: 'devex-culture', title: 'Developer Experience Culture' },
      ],
    },
    {
      id: 'pitfalls-myths',
      title: 'Pitfalls, Myths & Anti-Patterns',
      leaves: [
        { id: 'devops-anti-patterns', title: 'DevOps Anti-Patterns' },
        { id: 'devops-myths', title: 'DevOps Myths' },
      ],
    },
    {
      id: 'essential-reading',
      title: 'Essential Reading & References',
      leaves: [
        { id: 'phoenix-project-unicorn-project', title: 'The Phoenix Project & The Unicorn Project' },
        { id: 'devops-handbook', title: 'The DevOps Handbook' },
        { id: 'accelerate-book', title: 'Accelerate (Forsgren, Humble, Kim)' },
      ],
    },
  ],
  'devops-lifecycle': [
    {
      id: 'devops-lifecycle--sdlc-phases',
      title: 'SDLC Phases',
      leaves: [
        { id: 'plan-phase', title: 'Plan Phase' },
        { id: 'code-phase', title: 'Code Phase' },
        { id: 'build-phase', title: 'Build Phase' },
        { id: 'test-phase', title: 'Test Phase' },
        { id: 'release-phase', title: 'Release Phase' },
        { id: 'deploy-phase', title: 'Deploy Phase' },
        { id: 'operate-phase', title: 'Operate Phase' },
        { id: 'monitor-phase', title: 'Monitor Phase' },
      ],
    },
    {
      id: 'devops-lifecycle--continuous-practices',
      title: 'Continuous Practices',
      leaves: [
        { id: 'continuous-integration-overview', title: 'Continuous Integration (Overview)' },
        { id: 'continuous-delivery-overview', title: 'Continuous Delivery (Overview)' },
        { id: 'continuous-deployment-overview', title: 'Continuous Deployment (Overview)' },
        { id: 'continuous-testing-overview', title: 'Continuous Testing (Overview)' },
        { id: 'continuous-monitoring-overview', title: 'Continuous Monitoring (Overview)' },
        { id: 'continuous-feedback-overview', title: 'Continuous Feedback (Overview)' },
        { id: 'continuous-security-overview', title: 'Continuous Security (Overview)' },
        { id: 'continuous-compliance-overview', title: 'Continuous Compliance (Overview)' },
      ],
    },
    {
      id: 'devops-lifecycle--delivery-philosophy',
      title: 'Delivery Philosophy',
      leaves: [
        { id: 'shift-left-shift-right', title: 'Shift-Left & Shift-Right' },
        { id: 'value-stream-overview', title: 'Value Streams (Overview)' },
      ],
    },
  ],
  'devops-metrics': [
    {
      id: 'dora-metrics',
      title: 'DORA Metrics',
      leaves: [
        { id: 'deployment-frequency', title: 'Deployment Frequency' },
        { id: 'lead-time-for-changes', title: 'Lead Time for Changes' },
        { id: 'change-failure-rate', title: 'Change Failure Rate' },
        { id: 'mean-time-to-restore', title: 'Mean Time to Restore (MTTR)' },
        { id: 'reliability-dora', title: 'Reliability (5th DORA metric)' },
      ],
    },
    {
      id: 'space-framework',
      title: 'SPACE Framework',
      leaves: [
        { id: 'satisfaction-wellbeing', title: 'Satisfaction & Wellbeing' },
        { id: 'performance', title: 'Performance' },
        { id: 'activity', title: 'Activity' },
        { id: 'communication-collaboration', title: 'Communication & Collaboration' },
        { id: 'efficiency-flow', title: 'Efficiency & Flow' },
      ],
    },
    {
      id: 'flow-metrics',
      title: 'Flow Metrics',
      leaves: [
        { id: 'flow-velocity', title: 'Flow Velocity' },
        { id: 'flow-time', title: 'Flow Time' },
        { id: 'flow-efficiency', title: 'Flow Efficiency' },
        { id: 'flow-load', title: 'Flow Load' },
        { id: 'flow-distribution', title: 'Flow Distribution' },
      ],
    },
    {
      id: 'devops-metrics--delivery-flow-metrics',
      title: 'Delivery & Flow Metrics',
      leaves: [
        { id: 'value-stream-mapping', title: 'Value Stream Mapping' },
        { id: 'cycle-time', title: 'Cycle Time' },
        { id: 'lead-time', title: 'Lead Time' },
        { id: 'mttr-mtbf-mttd', title: 'MTTR, MTBF, MTTD, MTTA' },
        { id: 'vanity-vs-actionable-metrics', title: 'Vanity vs Actionable Metrics' },
      ],
    },
    {
      id: 'devops-metrics--research-effectiveness',
      title: 'Research & Engineering Effectiveness',
      leaves: [
        { id: 'accelerate-state-of-devops', title: 'Accelerate / State of DevOps Reports' },
        { id: 'engineering-effectiveness-metrics', title: 'Engineering Effectiveness Metrics' },
        { id: 'developer-productivity-frameworks', title: 'Developer Productivity Frameworks' },
      ],
    },
  ],
  'package-managers': [
    {
      id: 'linux-os-package-managers',
      title: 'Linux OS Package Managers',
      leaves: [
        { id: 'apt-deb', title: 'APT & dpkg (Debian / Ubuntu)' },
        { id: 'yum-dnf-rpm', title: 'YUM / DNF & RPM (RHEL / Fedora)' },
        { id: 'apk-alpine', title: 'APK (Alpine)' },
        { id: 'pacman-arch', title: 'pacman (Arch)' },
        { id: 'zypper-opensuse', title: 'Zypper (openSUSE)' },
        { id: 'portage-gentoo', title: 'Portage (Gentoo)' },
      ],
    },
    {
      id: 'cross-platform-package-managers',
      title: 'Cross-Platform Package Managers',
      leaves: [
        { id: 'homebrew', title: 'Homebrew (macOS / Linux)' },
        { id: 'nix-package-manager', title: 'Nix' },
        { id: 'asdf-version-manager', title: 'asdf' },
        { id: 'mise-version-manager', title: 'mise (formerly rtx)' },
      ],
    },
    {
      id: 'windows-package-managers',
      title: 'Windows Package Managers',
      leaves: [
        { id: 'chocolatey', title: 'Chocolatey' },
        { id: 'winget', title: 'Winget' },
        { id: 'scoop', title: 'Scoop' },
      ],
    },
    {
      id: 'universal-package-formats',
      title: 'Universal Package Formats',
      leaves: [
        { id: 'snap-packages', title: 'Snap' },
        { id: 'flatpak', title: 'Flatpak' },
        { id: 'appimage', title: 'AppImage' },
      ],
    },
    {
      id: 'building-os-packages',
      title: 'Building OS Packages',
      leaves: [
        { id: 'building-deb-packages', title: 'Building .deb Packages' },
        { id: 'building-rpm-packages', title: 'Building .rpm Packages' },
        { id: 'fpm-tool', title: 'fpm (Effing Package Management)' },
        { id: 'goreleaser-pkg', title: 'GoReleaser for OS Packages' },
        { id: 'nfpm', title: 'nFPM' },
      ],
    },
  ],
  'error-budgets': [
    {
      id: 'error-budgets--definition-calculation',
      title: 'Definition & Calculation',
      leaves: [
        { id: 'error-budget-definition', title: 'Error Budget Definition' },
        { id: 'calculating-error-budgets', title: 'Calculating Error Budgets' },
        { id: 'error-budget-by-tier', title: 'Per-Tier Error Budgets' },
      ],
    },
    {
      id: 'error-budgets--burn-rate-alerting',
      title: 'Burn Rate & Alerting',
      leaves: [
        { id: 'burn-rate-calculation', title: 'Burn Rate Calculation' },
        { id: 'multi-burn-rate-alerting', title: 'Multi-Burn-Rate Alerting' },
        { id: 'error-budget-exhaustion', title: 'Error Budget Exhaustion' },
        { id: 'action-on-budget-burn', title: 'Action on Budget Burn' },
      ],
    },
    {
      id: 'error-budgets--policy-governance',
      title: 'Policy & Governance',
      leaves: [
        { id: 'error-budget-policy', title: 'Error Budget Policy' },
        { id: 'error-budget-freeze', title: 'Error Budget Freeze' },
        { id: 'budget-vs-feature-velocity', title: 'Error Budget vs Feature Velocity' },
        { id: 'error-budget-metrics', title: 'Error Budget Metrics & Reporting' },
      ],
    },
  ],
  'chaos-engineering-principles': [
    {
      id: 'chaos-engineering-principles--foundations',
      title: 'Chaos Engineering Foundations',
      leaves: [
        { id: 'principles-of-chaos-org', title: 'Principles of Chaos Engineering' },
        { id: 'hypothesis-driven-experiments', title: 'Hypothesis-Driven Experiments' },
        { id: 'steady-state-behavior', title: 'Steady State Behavior' },
        { id: 'blast-radius', title: 'Blast Radius' },
        { id: 'chaos-experiment-design', title: 'Chaos Experiment Design Process' },
      ],
    },
    {
      id: 'chaos-engineering-principles--practice-operations',
      title: 'Practice & Operations',
      leaves: [
        { id: 'game-days-chaos', title: 'Game Days' },
        { id: 'production-vs-staging-chaos', title: 'Production vs Staging Chaos' },
        { id: 'chaos-as-continuous-practice', title: 'Chaos as Continuous Practice' },
        { id: 'failure-injection-scope', title: 'Failure Injection Scope' },
        { id: 'observability-for-chaos', title: 'Observability for Chaos Experiments' },
      ],
    },
    {
      id: 'chaos-engineering-principles--maturity-integration',
      title: 'Maturity & SRE Integration',
      leaves: [
        { id: 'resilience-testing-strategies', title: 'Resilience Testing Strategies' },
        { id: 'chaos-maturity-model', title: 'Chaos Maturity Model' },
        { id: 'netflix-simian-army', title: 'Netflix Simian Army (Historical)' },
        { id: 'chaos-engineering-and-sre', title: 'Chaos Engineering & SRE' },
      ],
    },
  ],
}
