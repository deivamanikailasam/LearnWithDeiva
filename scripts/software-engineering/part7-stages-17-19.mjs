/**
 * Part 7: subtopics + sub-subtopics for stages 17-19
 *   17. Software Configuration Management
 *   18. Build, Packaging & Dependency Management
 *   19. Software Documentation
 *
 * Run with: node scripts/software-engineering/part7-stages-17-19.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 17 — Software Configuration Management
   * ============================================================ */

  /* ---- scm-fundamentals ---- */
  { id: 'scm-fundamentals--definition', title: 'Definition of SCM', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--swebok-scm-ka', title: 'SWEBOK SCM KA', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--configuration-identification', title: 'Configuration Identification', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--configuration-control', title: 'Configuration Control', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--configuration-status-accounting', title: 'Configuration Status Accounting', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--configuration-audits', title: 'Configuration Audits (FCA, PCA)', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--scm-vs-vcs', title: 'SCM vs VCS', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--scm-plan', title: 'SCM Plan (SCMP)', parentId: 'scm-fundamentals' },
  { id: 'scm-fundamentals--cmdb-and-cis', title: 'CMDB & Configuration Items', parentId: 'scm-fundamentals' },

  /* ---- baseline-management ---- */
  { id: 'baseline-management--what-is-a-baseline', title: 'What Is a Baseline?', parentId: 'baseline-management' },
  { id: 'baseline-management--functional-baseline', title: 'Functional Baseline', parentId: 'baseline-management' },
  { id: 'baseline-management--allocated-baseline', title: 'Allocated Baseline', parentId: 'baseline-management' },
  { id: 'baseline-management--developmental-baseline', title: 'Developmental Baseline', parentId: 'baseline-management' },
  { id: 'baseline-management--product-baseline', title: 'Product Baseline', parentId: 'baseline-management' },
  { id: 'baseline-management--baseline-naming', title: 'Baseline Naming Conventions', parentId: 'baseline-management' },
  { id: 'baseline-management--baseline-promotion', title: 'Baseline Promotion Workflow', parentId: 'baseline-management' },

  /* ---- change-control ---- */
  { id: 'change-control--change-control-board', title: 'Change Control Board (CCB)', parentId: 'change-control' },
  { id: 'change-control--rfc-process', title: 'Request-for-Change (RFC) Process', parentId: 'change-control' },
  { id: 'change-control--change-request-lifecycle', title: 'Change Request Lifecycle', parentId: 'change-control' },
  { id: 'change-control--change-impact-analysis', title: 'Change Impact Analysis', parentId: 'change-control' },
  { id: 'change-control--regression-impact-assessment', title: 'Regression Impact Assessment', parentId: 'change-control' },
  { id: 'change-control--standard-vs-normal-vs-emergency', title: 'Standard vs Normal vs Emergency Changes (ITIL)', parentId: 'change-control' },
  { id: 'change-control--change-advisory-board', title: 'Change Advisory Board (CAB)', parentId: 'change-control' },
  { id: 'change-control--change-success-metrics', title: 'Change Success Metrics', parentId: 'change-control' },

  /* ---- release-management-process ---- */
  { id: 'release-management-process--release-planning', title: 'Release Planning', parentId: 'release-management-process' },
  { id: 'release-management-process--release-types', title: 'Release Types (Major, Minor, Patch, Hotfix)', parentId: 'release-management-process' },
  { id: 'release-management-process--release-train', title: 'Release Train Cadence', parentId: 'release-management-process' },
  { id: 'release-management-process--release-notes', title: 'Release Notes (Process View)', parentId: 'release-management-process' },
  { id: 'release-management-process--go-no-go-meeting', title: 'Go/No-Go Meeting', parentId: 'release-management-process' },
  { id: 'release-management-process--release-checklist', title: 'Release Checklist', parentId: 'release-management-process' },
  { id: 'release-management-process--rollback-and-roll-forward', title: 'Rollback & Roll-Forward Strategy', parentId: 'release-management-process' },
  { id: 'release-management-process--post-release-review', title: 'Post-Release Review', parentId: 'release-management-process' },
  { id: 'release-management-process--release-anti-patterns', title: 'Release Anti-Patterns', parentId: 'release-management-process' },

  /* ---- environment-management ---- */
  { id: 'environment-management--dev-env', title: 'Development Environment', parentId: 'environment-management' },
  { id: 'environment-management--test-env', title: 'Test / QA Environment', parentId: 'environment-management' },
  { id: 'environment-management--integration-env', title: 'Integration Environment', parentId: 'environment-management' },
  { id: 'environment-management--staging-env', title: 'Staging / Pre-Prod Environment', parentId: 'environment-management' },
  { id: 'environment-management--prod-env', title: 'Production Environment', parentId: 'environment-management' },
  { id: 'environment-management--ephemeral-environments', title: 'Ephemeral / Preview Environments', parentId: 'environment-management' },
  { id: 'environment-management--env-parity', title: 'Environment Parity (12-Factor)', parentId: 'environment-management' },
  { id: 'environment-management--config-as-data', title: 'Config as Data Across Envs', parentId: 'environment-management' },
  { id: 'environment-management--data-management-non-prod', title: 'Data Management for Non-Prod', parentId: 'environment-management' },

  /* ---- build-management ---- */
  { id: 'build-management--build-process', title: 'The Build Process', parentId: 'build-management' },
  { id: 'build-management--build-engineer-role', title: 'Build Engineer Role', parentId: 'build-management' },
  { id: 'build-management--clean-vs-incremental', title: 'Clean vs Incremental Builds', parentId: 'build-management' },
  { id: 'build-management--build-versioning', title: 'Build Versioning Strategy', parentId: 'build-management' },
  { id: 'build-management--build-metadata', title: 'Build Metadata & Provenance', parentId: 'build-management' },
  { id: 'build-management--build-traceability', title: 'Build → Source Traceability', parentId: 'build-management' },
  { id: 'build-management--build-failure-triage', title: 'Build Failure Triage', parentId: 'build-management' },
  { id: 'build-management--green-build-discipline', title: 'Green Build Discipline', parentId: 'build-management' },

  /* ---- workspace-management ---- */
  { id: 'workspace-management--developer-workstation', title: 'Developer Workstation Setup', parentId: 'workspace-management' },
  { id: 'workspace-management--devcontainers', title: 'Dev Containers (devcontainer.json)', parentId: 'workspace-management' },
  { id: 'workspace-management--cloud-dev-envs-2026', title: 'Cloud Dev Environments (Codespaces, Gitpod, Coder, 2026)', parentId: 'workspace-management' },
  { id: 'workspace-management--mise-asdf', title: 'mise / asdf for Toolchain Management', parentId: 'workspace-management' },
  { id: 'workspace-management--dotfiles', title: 'Dotfiles Management', parentId: 'workspace-management' },
  { id: 'workspace-management--reproducible-shells', title: 'Reproducible Shells (Nix, Devenv, direnv)', parentId: 'workspace-management' },
  { id: 'workspace-management--workspace-anti-patterns', title: 'Workspace Anti-Patterns', parentId: 'workspace-management' },

  /* ---- scm-standards-iso ---- */
  { id: 'scm-standards-iso--ieee-828', title: 'IEEE 828 (SCM Plans)', parentId: 'scm-standards-iso' },
  { id: 'scm-standards-iso--iso-10007', title: 'ISO 10007 (Configuration Management)', parentId: 'scm-standards-iso' },
  { id: 'scm-standards-iso--isoiec-12207-scm', title: 'ISO/IEC 12207 SCM Activities', parentId: 'scm-standards-iso' },
  { id: 'scm-standards-iso--mil-std-973', title: 'MIL-STD-973 / EIA-649 Heritage', parentId: 'scm-standards-iso' },
  { id: 'scm-standards-iso--cmmi-cm', title: 'CMMI Configuration Management Process Area', parentId: 'scm-standards-iso' },

  /* ============================================================
   * STAGE 18 — Build, Packaging & Dependency Management
   * ============================================================ */

  /* ---- build-systems-overview ---- */
  { id: 'build-systems-overview--what-is-a-build-system', title: 'What Is a Build System?', parentId: 'build-systems-overview' },
  { id: 'build-systems-overview--task-vs-artifact-based', title: 'Task-Based vs Artifact-Based Builds', parentId: 'build-systems-overview' },
  { id: 'build-systems-overview--build-graph', title: 'The Build Graph (DAG)', parentId: 'build-systems-overview' },
  { id: 'build-systems-overview--incremental-builds', title: 'Incremental Builds', parentId: 'build-systems-overview' },
  { id: 'build-systems-overview--hermetic-builds', title: 'Hermetic Builds', parentId: 'build-systems-overview' },
  { id: 'build-systems-overview--correctness-vs-speed', title: 'Correctness vs Speed Trade-offs', parentId: 'build-systems-overview' },
  { id: 'build-systems-overview--linker-and-loader', title: 'Linker & Loader (SE View)', parentId: 'build-systems-overview' },
  { id: 'build-systems-overview--cross-compilation', title: 'Cross-Compilation Basics', parentId: 'build-systems-overview' },

  /* ---- make-cmake ---- */
  { id: 'make-cmake--make-fundamentals', title: 'GNU Make Fundamentals', parentId: 'make-cmake' },
  { id: 'make-cmake--makefile-targets', title: 'Targets, Prerequisites & Recipes', parentId: 'make-cmake' },
  { id: 'make-cmake--phony-targets', title: 'Phony Targets', parentId: 'make-cmake' },
  { id: 'make-cmake--pattern-rules', title: 'Pattern Rules & Implicit Rules', parentId: 'make-cmake' },
  { id: 'make-cmake--make-pitfalls', title: 'Common Make Pitfalls', parentId: 'make-cmake' },
  { id: 'make-cmake--cmake-overview', title: 'CMake Overview', parentId: 'make-cmake' },
  { id: 'make-cmake--cmakelists-anatomy', title: 'CMakeLists.txt Anatomy', parentId: 'make-cmake' },
  { id: 'make-cmake--modern-cmake', title: 'Modern CMake (Targets & Properties)', parentId: 'make-cmake' },
  { id: 'make-cmake--cmake-presets', title: 'CMake Presets', parentId: 'make-cmake' },
  { id: 'make-cmake--ninja-generator', title: 'Ninja as CMake Generator', parentId: 'make-cmake' },
  { id: 'make-cmake--meson-and-scons', title: 'Meson & SCons (Alternatives)', parentId: 'make-cmake' },

  /* ---- gradle-overview ---- */
  { id: 'gradle-overview--gradle-basics', title: 'Gradle Basics', parentId: 'gradle-overview' },
  { id: 'gradle-overview--groovy-vs-kotlin-dsl', title: 'Groovy DSL vs Kotlin DSL', parentId: 'gradle-overview' },
  { id: 'gradle-overview--gradle-tasks', title: 'Gradle Tasks & Lifecycle', parentId: 'gradle-overview' },
  { id: 'gradle-overview--gradle-plugins', title: 'Plugins (Core & Convention)', parentId: 'gradle-overview' },
  { id: 'gradle-overview--gradle-build-cache', title: 'Gradle Build Cache', parentId: 'gradle-overview' },
  { id: 'gradle-overview--gradle-version-catalogs', title: 'Version Catalogs', parentId: 'gradle-overview' },
  { id: 'gradle-overview--gradle-composite-builds', title: 'Composite Builds', parentId: 'gradle-overview' },

  /* ---- maven-overview ---- */
  { id: 'maven-overview--pom-anatomy', title: 'POM Anatomy', parentId: 'maven-overview' },
  { id: 'maven-overview--maven-coordinates', title: 'Maven Coordinates (GAV)', parentId: 'maven-overview' },
  { id: 'maven-overview--maven-lifecycle', title: 'Maven Lifecycle (default, clean, site)', parentId: 'maven-overview' },
  { id: 'maven-overview--maven-phases-and-goals', title: 'Phases & Goals', parentId: 'maven-overview' },
  { id: 'maven-overview--maven-plugins', title: 'Maven Plugins', parentId: 'maven-overview' },
  { id: 'maven-overview--maven-profiles', title: 'Maven Profiles', parentId: 'maven-overview' },
  { id: 'maven-overview--maven-repositories', title: 'Local & Remote Repositories', parentId: 'maven-overview' },
  { id: 'maven-overview--maven-dependency-scopes', title: 'Dependency Scopes', parentId: 'maven-overview' },

  /* ---- bazel-overview ---- */
  { id: 'bazel-overview--why-bazel', title: 'Why Bazel?', parentId: 'bazel-overview' },
  { id: 'bazel-overview--workspace-build-files', title: 'WORKSPACE & BUILD Files', parentId: 'bazel-overview' },
  { id: 'bazel-overview--bzlmod', title: 'Bzlmod (MODULE.bazel)', parentId: 'bazel-overview' },
  { id: 'bazel-overview--starlark', title: 'Starlark Language', parentId: 'bazel-overview' },
  { id: 'bazel-overview--rules-and-providers', title: 'Rules & Providers', parentId: 'bazel-overview' },
  { id: 'bazel-overview--remote-execution', title: 'Remote Execution', parentId: 'bazel-overview' },
  { id: 'bazel-overview--remote-caching', title: 'Remote Caching', parentId: 'bazel-overview' },
  { id: 'bazel-overview--bazel-vs-buck2-vs-pants', title: 'Bazel vs Buck2 vs Pants', parentId: 'bazel-overview' },

  /* ---- npm-yarn-pnpm ---- */
  { id: 'npm-yarn-pnpm--npm-basics', title: 'npm Basics', parentId: 'npm-yarn-pnpm' },
  { id: 'npm-yarn-pnpm--package-json', title: 'package.json Anatomy', parentId: 'npm-yarn-pnpm' },
  { id: 'npm-yarn-pnpm--lockfiles', title: 'Lockfiles (package-lock, yarn.lock, pnpm-lock)', parentId: 'npm-yarn-pnpm' },
  { id: 'npm-yarn-pnpm--workspaces', title: 'Workspaces (npm/yarn/pnpm)', parentId: 'npm-yarn-pnpm' },
  { id: 'npm-yarn-pnpm--yarn-berry', title: 'Yarn Berry & PnP', parentId: 'npm-yarn-pnpm' },
  { id: 'npm-yarn-pnpm--pnpm-store', title: 'pnpm Content-Addressable Store', parentId: 'npm-yarn-pnpm' },
  { id: 'npm-yarn-pnpm--bun-and-deno-pkg', title: 'Bun & Deno Package Managers (2026)', parentId: 'npm-yarn-pnpm' },
  { id: 'npm-yarn-pnpm--npm-anti-patterns', title: 'JS Package Manager Anti-Patterns', parentId: 'npm-yarn-pnpm' },

  /* ---- pip-poetry-uv ---- */
  { id: 'pip-poetry-uv--pip-basics', title: 'pip Basics', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--virtualenvs', title: 'Virtual Environments (venv, virtualenv)', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--requirements-txt', title: 'requirements.txt Workflows', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--pyproject-toml', title: 'pyproject.toml (PEP 621)', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--poetry', title: 'Poetry', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--pdm', title: 'PDM', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--pipenv', title: 'Pipenv', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--uv-2026', title: 'uv (Astral) — 2026 Default', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--rye-and-hatch', title: 'Rye & Hatch', parentId: 'pip-poetry-uv' },
  { id: 'pip-poetry-uv--conda-mamba', title: 'Conda & Mamba', parentId: 'pip-poetry-uv' },

  /* ---- nuget ---- */
  { id: 'nuget--nuget-basics', title: 'NuGet Basics', parentId: 'nuget' },
  { id: 'nuget--csproj-package-references', title: '.csproj PackageReferences', parentId: 'nuget' },
  { id: 'nuget--nuget-feeds', title: 'NuGet Feeds (nuget.org, private)', parentId: 'nuget' },
  { id: 'nuget--package-versioning', title: 'NuGet Versioning & Floating Versions', parentId: 'nuget' },
  { id: 'nuget--central-package-management', title: 'Central Package Management (CPM)', parentId: 'nuget' },

  /* ---- cargo ---- */
  { id: 'cargo--cargo-basics', title: 'Cargo Basics', parentId: 'cargo' },
  { id: 'cargo--cargo-toml-cargo-lock', title: 'Cargo.toml & Cargo.lock', parentId: 'cargo' },
  { id: 'cargo--workspaces-cargo', title: 'Cargo Workspaces', parentId: 'cargo' },
  { id: 'cargo--features-and-conditional-compilation', title: 'Features & Conditional Compilation', parentId: 'cargo' },
  { id: 'cargo--crates-io', title: 'crates.io Registry', parentId: 'cargo' },
  { id: 'cargo--vendoring-cargo', title: 'Vendoring Dependencies', parentId: 'cargo' },

  /* ---- go-modules ---- */
  { id: 'go-modules--go-mod-basics', title: 'go.mod Basics', parentId: 'go-modules' },
  { id: 'go-modules--go-sum', title: 'go.sum & Module Verification', parentId: 'go-modules' },
  { id: 'go-modules--module-versioning', title: 'Module Versioning & Pseudo-Versions', parentId: 'go-modules' },
  { id: 'go-modules--minimum-version-selection', title: 'Minimum Version Selection (MVS)', parentId: 'go-modules' },
  { id: 'go-modules--go-workspaces', title: 'Go Workspaces (go.work)', parentId: 'go-modules' },
  { id: 'go-modules--go-proxy-checksum-db', title: 'GOPROXY & Checksum Database', parentId: 'go-modules' },

  /* ---- artifact-repositories ---- */
  { id: 'artifact-repositories--what-is-an-artifact-repo', title: 'What Is an Artifact Repository?', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--sonatype-nexus', title: 'Sonatype Nexus', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--jfrog-artifactory', title: 'JFrog Artifactory', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--github-packages', title: 'GitHub Packages', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--ghcr', title: 'GHCR (Container Registry)', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--gitlab-package-registry', title: 'GitLab Package Registry', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--aws-codeartifact', title: 'AWS CodeArtifact', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--azure-artifacts', title: 'Azure Artifacts', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--google-artifact-registry', title: 'Google Artifact Registry', parentId: 'artifact-repositories' },
  { id: 'artifact-repositories--cleanup-and-retention', title: 'Cleanup & Retention Policies', parentId: 'artifact-repositories' },

  /* ---- dependency-management ---- */
  { id: 'dependency-management--direct-vs-transitive', title: 'Direct vs Transitive Dependencies', parentId: 'dependency-management' },
  { id: 'dependency-management--resolution-algorithms', title: 'Resolution Algorithms (SAT, MVS, nearest-wins)', parentId: 'dependency-management' },
  { id: 'dependency-management--dependency-locking', title: 'Dependency Locking', parentId: 'dependency-management' },
  { id: 'dependency-management--dependency-pinning', title: 'Pinning vs Range Versions', parentId: 'dependency-management' },
  { id: 'dependency-management--dependency-update-cadence', title: 'Update Cadence Policies', parentId: 'dependency-management' },
  { id: 'dependency-management--renovate-dependabot', title: 'Renovate & Dependabot', parentId: 'dependency-management' },
  { id: 'dependency-management--diamond-dependency-problem', title: 'Diamond Dependency Problem', parentId: 'dependency-management' },
  { id: 'dependency-management--dependency-confusion', title: 'Dependency Confusion Attacks', parentId: 'dependency-management' },
  { id: 'dependency-management--vulnerability-scanning', title: 'Vulnerability Scanning of Deps', parentId: 'dependency-management' },
  { id: 'dependency-management--dependency-anti-patterns', title: 'Dependency Anti-Patterns', parentId: 'dependency-management' },

  /* ---- semantic-versioning ---- */
  { id: 'semantic-versioning--semver-spec', title: 'SemVer 2.0 Spec', parentId: 'semantic-versioning' },
  { id: 'semantic-versioning--major-minor-patch', title: 'MAJOR.MINOR.PATCH Rules', parentId: 'semantic-versioning' },
  { id: 'semantic-versioning--pre-release-build-meta', title: 'Pre-Release & Build Metadata', parentId: 'semantic-versioning' },
  { id: 'semantic-versioning--zero-ver', title: '0.x Versioning Pitfalls', parentId: 'semantic-versioning' },
  { id: 'semantic-versioning--breaking-change-policy', title: 'Breaking Change Policy', parentId: 'semantic-versioning' },
  { id: 'semantic-versioning--calver', title: 'CalVer & Other Versioning Schemes', parentId: 'semantic-versioning' },
  { id: 'semantic-versioning--api-evolution', title: 'API Evolution & Deprecation Periods', parentId: 'semantic-versioning' },

  /* ---- reproducible-builds ---- */
  { id: 'reproducible-builds--definition', title: 'Definition (reproducible-builds.org)', parentId: 'reproducible-builds' },
  { id: 'reproducible-builds--why-it-matters', title: 'Why Reproducibility Matters', parentId: 'reproducible-builds' },
  { id: 'reproducible-builds--sources-of-nondeterminism', title: 'Sources of Non-Determinism', parentId: 'reproducible-builds' },
  { id: 'reproducible-builds--source-date-epoch', title: 'SOURCE_DATE_EPOCH', parentId: 'reproducible-builds' },
  { id: 'reproducible-builds--diffoscope', title: 'diffoscope Tooling', parentId: 'reproducible-builds' },
  { id: 'reproducible-builds--nix-and-guix', title: 'Nix & Guix for Reproducibility', parentId: 'reproducible-builds' },
  { id: 'reproducible-builds--bazel-hermeticity', title: 'Bazel Hermeticity Practices', parentId: 'reproducible-builds' },
  { id: 'reproducible-builds--in-toto-slsa', title: 'in-toto & SLSA Provenance (SE View)', parentId: 'reproducible-builds' },

  /* ---- build-caching ---- */
  { id: 'build-caching--local-cache', title: 'Local Build Cache', parentId: 'build-caching' },
  { id: 'build-caching--remote-cache', title: 'Remote Build Cache', parentId: 'build-caching' },
  { id: 'build-caching--cache-key-design', title: 'Cache Key Design', parentId: 'build-caching' },
  { id: 'build-caching--content-addressable-storage', title: 'Content-Addressable Storage', parentId: 'build-caching' },
  { id: 'build-caching--cache-invalidation', title: 'Cache Invalidation Pitfalls', parentId: 'build-caching' },
  { id: 'build-caching--gradle-vs-bazel-cache', title: 'Gradle vs Bazel vs Turborepo Caches', parentId: 'build-caching' },
  { id: 'build-caching--cache-poisoning', title: 'Cache Poisoning Risks', parentId: 'build-caching' },

  /* ---- monorepo-build-tools ---- */
  { id: 'monorepo-build-tools--bazel-monorepo', title: 'Bazel for Monorepos', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--buck2', title: 'Buck2 (Meta)', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--pants', title: 'Pants (v2)', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--nx', title: 'Nx', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--turborepo', title: 'Turborepo', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--lerna', title: 'Lerna', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--rush', title: 'Rush (Microsoft)', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--moonrepo', title: 'Moonrepo', parentId: 'monorepo-build-tools' },
  { id: 'monorepo-build-tools--monorepo-build-anti-patterns', title: 'Monorepo Build Anti-Patterns', parentId: 'monorepo-build-tools' },

  /* ============================================================
   * STAGE 19 — Software Documentation
   * ============================================================ */

  /* ---- documentation-fundamentals ---- */
  { id: 'documentation-fundamentals--why-documentation-matters', title: 'Why Documentation Matters', parentId: 'documentation-fundamentals' },
  { id: 'documentation-fundamentals--audiences', title: 'Documentation Audiences', parentId: 'documentation-fundamentals' },
  { id: 'documentation-fundamentals--quality-attributes', title: 'Documentation Quality Attributes', parentId: 'documentation-fundamentals' },
  { id: 'documentation-fundamentals--write-the-docs-community', title: 'Write the Docs Community', parentId: 'documentation-fundamentals' },
  { id: 'documentation-fundamentals--google-developer-documentation-style-guide', title: 'Google Developer Documentation Style Guide', parentId: 'documentation-fundamentals' },
  { id: 'documentation-fundamentals--microsoft-style-guide', title: 'Microsoft Writing Style Guide', parentId: 'documentation-fundamentals' },
  { id: 'documentation-fundamentals--inclusive-language', title: 'Inclusive Language in Docs', parentId: 'documentation-fundamentals' },

  /* ---- types-of-documentation ---- */
  { id: 'types-of-documentation--reference-docs', title: 'Reference Documentation', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--tutorials', title: 'Tutorials', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--how-to-guides', title: 'How-To Guides', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--explanation-docs', title: 'Explanation / Conceptual Docs', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--design-docs', title: 'Design Docs', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--rfc-documents', title: 'RFC Documents', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--adr', title: 'Architecture Decision Records (ADR)', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--runbooks-and-playbooks', title: 'Runbooks & Playbooks', parentId: 'types-of-documentation' },
  { id: 'types-of-documentation--retrospective-postmortem-docs', title: 'Retrospective & Postmortem Docs', parentId: 'types-of-documentation' },

  /* ---- diataxis-framework ---- */
  { id: 'diataxis-framework--four-modes', title: 'Four Modes of Documentation', parentId: 'diataxis-framework' },
  { id: 'diataxis-framework--tutorials-mode', title: 'Tutorials (Learning-Oriented)', parentId: 'diataxis-framework' },
  { id: 'diataxis-framework--how-to-mode', title: 'How-To Guides (Goal-Oriented)', parentId: 'diataxis-framework' },
  { id: 'diataxis-framework--reference-mode', title: 'Reference (Information-Oriented)', parentId: 'diataxis-framework' },
  { id: 'diataxis-framework--explanation-mode', title: 'Explanation (Understanding-Oriented)', parentId: 'diataxis-framework' },
  { id: 'diataxis-framework--applying-diataxis', title: 'Applying Diátaxis to a Project', parentId: 'diataxis-framework' },

  /* ---- readme-best-practices ---- */
  { id: 'readme-best-practices--what-good-readme-contains', title: 'What a Good README Contains', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--readme-structure', title: 'Recommended README Structure', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--badges', title: 'Badges (Build, Coverage, License)', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--quickstart-section', title: 'Quickstart / Getting Started Section', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--installation-and-usage', title: 'Installation & Usage Sections', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--contributing-md', title: 'CONTRIBUTING.md', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--code-of-conduct', title: 'CODE_OF_CONDUCT.md', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--security-md', title: 'SECURITY.md', parentId: 'readme-best-practices' },
  { id: 'readme-best-practices--license-and-attribution', title: 'LICENSE & Attribution', parentId: 'readme-best-practices' },

  /* ---- api-documentation ---- */
  { id: 'api-documentation--rest-doc-tools', title: 'REST API Doc Tools (OpenAPI/Swagger, Redoc)', parentId: 'api-documentation' },
  { id: 'api-documentation--openapi-spec', title: 'OpenAPI Specification', parentId: 'api-documentation' },
  { id: 'api-documentation--asyncapi', title: 'AsyncAPI Specification', parentId: 'api-documentation' },
  { id: 'api-documentation--graphql-schema-docs', title: 'GraphQL Schema Documentation', parentId: 'api-documentation' },
  { id: 'api-documentation--grpc-protobuf-docs', title: 'gRPC / Protobuf Documentation', parentId: 'api-documentation' },
  { id: 'api-documentation--javadoc-jsdoc-pydoc', title: 'JavaDoc, JSDoc, PyDoc, RustDoc', parentId: 'api-documentation' },
  { id: 'api-documentation--sphinx', title: 'Sphinx (Python)', parentId: 'api-documentation' },
  { id: 'api-documentation--typedoc', title: 'TypeDoc', parentId: 'api-documentation' },
  { id: 'api-documentation--versioning-api-docs', title: 'Versioning API Docs', parentId: 'api-documentation' },
  { id: 'api-documentation--examples-and-recipes', title: 'Examples & Recipes Section', parentId: 'api-documentation' },

  /* ---- user-and-admin-docs ---- */
  { id: 'user-and-admin-docs--end-user-guides', title: 'End-User Guides', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--admin-guides', title: 'Admin Guides', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--operator-guides', title: 'Operator Guides', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--installation-guide', title: 'Installation Guide', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--troubleshooting-guide', title: 'Troubleshooting Guide', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--faq-and-knowledge-base', title: 'FAQ & Knowledge Base', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--release-notes-user', title: 'User-Facing Release Notes', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--in-product-help', title: 'In-Product Help & Tooltips', parentId: 'user-and-admin-docs' },
  { id: 'user-and-admin-docs--video-and-multimedia', title: 'Video & Multimedia Documentation', parentId: 'user-and-admin-docs' },

  /* ---- internal-developer-docs ---- */
  { id: 'internal-developer-docs--onboarding-docs', title: 'Onboarding Documentation', parentId: 'internal-developer-docs' },
  { id: 'internal-developer-docs--system-overview-docs', title: 'System Overview Docs', parentId: 'internal-developer-docs' },
  { id: 'internal-developer-docs--service-catalog', title: 'Service Catalog', parentId: 'internal-developer-docs' },
  { id: 'internal-developer-docs--repo-readme-conventions', title: 'Repository README Conventions', parentId: 'internal-developer-docs' },
  { id: 'internal-developer-docs--adr-repo', title: 'ADR Repository', parentId: 'internal-developer-docs' },
  { id: 'internal-developer-docs--rfc-process', title: 'Internal RFC Process', parentId: 'internal-developer-docs' },
  { id: 'internal-developer-docs--knowledge-graphs', title: 'Internal Knowledge Graphs (2026)', parentId: 'internal-developer-docs' },

  /* ---- documentation-as-code ---- */
  { id: 'documentation-as-code--principles', title: 'Docs-as-Code Principles', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--markdown', title: 'Markdown (CommonMark, GFM, MyST)', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--asciidoc', title: 'AsciiDoc', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--restructuredtext', title: 'reStructuredText', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--mdx', title: 'MDX', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--static-site-generators', title: 'Static Site Generators (Docusaurus, MkDocs, Hugo, Antora, Astro Starlight)', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--docs-ci', title: 'Docs in CI (Linting, Link Checking, Build)', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--vale-and-style-linting', title: 'Vale & Style Linting', parentId: 'documentation-as-code' },
  { id: 'documentation-as-code--docs-versioning', title: 'Versioning Documentation Sites', parentId: 'documentation-as-code' },

  /* ---- diagrams-as-code ---- */
  { id: 'diagrams-as-code--mermaid', title: 'Mermaid', parentId: 'diagrams-as-code' },
  { id: 'diagrams-as-code--plantuml', title: 'PlantUML', parentId: 'diagrams-as-code' },
  { id: 'diagrams-as-code--d2', title: 'D2 (Terrastruct)', parentId: 'diagrams-as-code' },
  { id: 'diagrams-as-code--structurizr-dsl', title: 'Structurizr DSL', parentId: 'diagrams-as-code' },
  { id: 'diagrams-as-code--graphviz-dot', title: 'Graphviz DOT', parentId: 'diagrams-as-code' },
  { id: 'diagrams-as-code--excalidraw-as-code', title: 'Excalidraw (Programmatic)', parentId: 'diagrams-as-code' },
  { id: 'diagrams-as-code--ai-diagramming-2026', title: 'AI Diagramming (2026)', parentId: 'diagrams-as-code' },

  /* ---- changelog-and-release-notes ---- */
  { id: 'changelog-and-release-notes--keep-a-changelog', title: 'Keep a Changelog Spec', parentId: 'changelog-and-release-notes' },
  { id: 'changelog-and-release-notes--commit-driven-changelogs', title: 'Commit-Driven Changelogs (Conventional Commits)', parentId: 'changelog-and-release-notes' },
  { id: 'changelog-and-release-notes--release-please', title: 'Release-Please (Google)', parentId: 'changelog-and-release-notes' },
  { id: 'changelog-and-release-notes--changesets', title: 'Changesets (npm)', parentId: 'changelog-and-release-notes' },
  { id: 'changelog-and-release-notes--semantic-release', title: 'semantic-release', parentId: 'changelog-and-release-notes' },
  { id: 'changelog-and-release-notes--user-facing-vs-internal', title: 'User-Facing vs Internal Notes', parentId: 'changelog-and-release-notes' },
  { id: 'changelog-and-release-notes--changelog-anti-patterns', title: 'Changelog Anti-Patterns', parentId: 'changelog-and-release-notes' },

  /* ---- documentation-anti-patterns ---- */
  { id: 'documentation-anti-patterns--stale-docs', title: 'Stale / Outdated Docs', parentId: 'documentation-anti-patterns' },
  { id: 'documentation-anti-patterns--code-as-docs', title: '"The Code Is the Documentation"', parentId: 'documentation-anti-patterns' },
  { id: 'documentation-anti-patterns--over-documentation', title: 'Over-Documentation', parentId: 'documentation-anti-patterns' },
  { id: 'documentation-anti-patterns--marketing-disguised-as-docs', title: 'Marketing Disguised as Docs', parentId: 'documentation-anti-patterns' },
  { id: 'documentation-anti-patterns--missing-runbooks', title: 'Missing Runbooks', parentId: 'documentation-anti-patterns' },
  { id: 'documentation-anti-patterns--single-author-docs', title: 'Single-Author Docs (Bus-Factor 1)', parentId: 'documentation-anti-patterns' },
  { id: 'documentation-anti-patterns--ai-hallucinated-docs-2026', title: 'AI-Hallucinated Docs (2026)', parentId: 'documentation-anti-patterns' },
  { id: 'documentation-anti-patterns--docs-out-of-sync-with-api', title: 'Docs Out of Sync With API', parentId: 'documentation-anti-patterns' },
])
