/**
 * Azure roadmap topic scaffolder.
 *
 * Generates the `topic.json` metadata files for the Azure subject from a compact
 * nested tree definition (root topics → subtopics → sub-subtopics). It is
 * idempotent: existing topic ids are skipped, so it is safe to re-run as more
 * stages are added part by part.
 *
 * Conventions (mirroring the AWS subject):
 *   - Root topic id  == the roadmap node `topicId` (no parentId).
 *   - Subtopic id     == a descriptive slug, parentId = root id.
 *   - Sub-subtopic id == `${subtopicId}--${leafSlug}`, parentId = subtopic id.
 *   - `tags` for every node in a stage == [stage.tag].
 *   - `level` inherits from the parent unless overridden on the node.
 *   - `order` is the node's position among its siblings (1..n). Root `order`
 *     mirrors the roadmap node order within its stage.
 *
 * Usage: node scripts/azure/scaffold.mjs
 * After scaffolding, run `node scripts/azure/rebuild-tree.mjs` to enforce the
 * 3-level hierarchy and merge granular what/why/benefits leaves.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SUBJECT_DIR = resolve(__dirname, '../../src/content/subjects/azure')
const TOPICS_DIR = resolve(SUBJECT_DIR, 'topics')

/**
 * STAGES: only stages that have been fleshed out are listed here. Each is built
 * part by part. A node is `{ id, title, summary?, level?, children? }`.
 */
const STAGES = [
  {
    tag: 'cloud-foundations',
    roots: [
      {
        id: 'cloud-concepts',
        title: 'Cloud Computing Concepts',
        summary: 'Cloud models, service types, benefits and economics.',
        level: 'beginner',
        children: [
          {
            id: 'what-is-cloud-computing',
            title: 'Cloud Computing Fundamentals',
            children: [
              {
                id: 'cloud-computing-fundamentals',
                title: 'Cloud Computing Fundamentals',
              },
            ],
          },
          {
            id: 'cloud-service-models',
            title: 'Cloud Service Models',
            children: [
              { id: 'iaas', title: 'Infrastructure as a Service (IaaS)' },
              { id: 'paas', title: 'Platform as a Service (PaaS)' },
              { id: 'saas', title: 'Software as a Service (SaaS)' },
              { id: 'serverless-faas', title: 'Serverless & Functions as a Service' },
              { id: 'service-model-comparison', title: 'Service Model Comparison' },
            ],
          },
          {
            id: 'cloud-deployment-models',
            title: 'Cloud Deployment Models',
            children: [
              { id: 'public-cloud', title: 'Public Cloud' },
              { id: 'private-cloud', title: 'Private Cloud' },
              { id: 'hybrid-cloud', title: 'Hybrid Cloud' },
              { id: 'multicloud', title: 'Multicloud' },
              { id: 'deployment-model-comparison', title: 'Deployment Model Comparison' },
            ],
          },
          {
            id: 'benefits-of-cloud',
            title: 'Cloud Value Pillars',
            children: [
              {
                id: 'availability-scalability-elasticity',
                title: 'Availability, Scalability & Elasticity',
              },
              {
                id: 'agility-reliability-predictability',
                title: 'Agility, Reliability & Predictability',
              },
              {
                id: 'security-governance-manageability',
                title: 'Security, Governance & Manageability',
              },
            ],
          },
          {
            id: 'cloud-economics',
            title: 'Cloud Economics',
            children: [
              { id: 'capex-vs-opex', title: 'CapEx vs OpEx' },
              { id: 'consumption-based-model', title: 'Consumption-Based Model' },
              { id: 'total-cost-of-ownership', title: 'Total Cost of Ownership (TCO)' },
              { id: 'economies-of-scale', title: 'Economies of Scale' },
            ],
          },
        ],
      },
      {
        id: 'azure-global-infrastructure',
        title: 'Azure Global Infrastructure',
        summary: 'Regions, region pairs, availability zones and geographies.',
        level: 'beginner',
        children: [
          {
            id: 'regions-geographies',
            title: 'Regions & Geographies',
            children: [
              { id: 'azure-regions', title: 'Azure Regions' },
              { id: 'region-pairs', title: 'Region Pairs' },
              { id: 'geographies', title: 'Geographies' },
              { id: 'sovereign-clouds', title: 'Sovereign & Government Clouds' },
              { id: 'choosing-a-region', title: 'Choosing a Region' },
            ],
          },
          {
            id: 'availability-zones',
            title: 'Availability Zones',
            children: [
              { id: 'zonal-services', title: 'Zonal Services' },
              { id: 'zone-redundant-services', title: 'Zone-Redundant Services' },
              { id: 'zonal-vs-zone-redundant', title: 'Zonal vs Zone-Redundant' },
            ],
          },
          {
            id: 'datacenter-infrastructure',
            title: 'Datacenter Infrastructure',
            children: [
              { id: 'datacenters', title: 'Datacenters' },
              { id: 'availability-sets', title: 'Availability Sets' },
              { id: 'fault-domains', title: 'Fault Domains' },
              { id: 'update-domains', title: 'Update Domains' },
            ],
          },
          {
            id: 'edge-infrastructure',
            title: 'Edge Infrastructure',
            children: [
              { id: 'azure-edge-zones', title: 'Azure Edge Zones' },
              { id: 'points-of-presence', title: 'Points of Presence (PoPs)' },
              { id: 'content-delivery-edge', title: 'Content Delivery Edge' },
            ],
          },
        ],
      },
      {
        id: 'azure-architecture-overview',
        title: 'Azure Architecture & Services Overview',
        summary: 'Service categories, resource hierarchy and shared responsibility.',
        level: 'beginner',
        children: [
          {
            id: 'resource-hierarchy',
            title: 'Resource Hierarchy',
            children: [
              { id: 'management-groups', title: 'Management Groups' },
              { id: 'subscriptions', title: 'Subscriptions' },
              { id: 'resource-groups', title: 'Resource Groups' },
              { id: 'resources', title: 'Resources' },
            ],
          },
          {
            id: 'azure-service-categories',
            title: 'Azure Service Categories',
            children: [
              { id: 'compute-services', title: 'Compute Services' },
              { id: 'networking-services', title: 'Networking Services' },
              { id: 'storage-services', title: 'Storage Services' },
              { id: 'database-services', title: 'Database Services' },
              { id: 'security-services', title: 'Security Services' },
              { id: 'ai-ml-services', title: 'AI & Machine Learning Services' },
              { id: 'analytics-services', title: 'Analytics Services' },
              { id: 'integration-services', title: 'Integration Services' },
            ],
          },
          {
            id: 'shared-responsibility-model',
            title: 'Shared Responsibility Model',
            children: [
              { id: 'provider-vs-customer', title: 'Provider vs Customer Responsibilities' },
              { id: 'responsibilities-by-service-model', title: 'Responsibilities by Service Model' },
              { id: 'security-responsibilities', title: 'Security Responsibilities' },
            ],
          },
          {
            id: 'management-scopes',
            title: 'Management Scopes & Planes',
            children: [
              { id: 'control-plane-vs-data-plane', title: 'Control Plane vs Data Plane' },
              { id: 'scope-levels', title: 'Scope Levels' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'getting-started',
    roots: [
      {
        id: 'azure-accounts-subscriptions',
        title: 'Accounts & Subscriptions',
        summary: 'Azure accounts, subscriptions, tenants and free account.',
        level: 'beginner',
        children: [
          {
            id: 'azure-account',
            title: 'Azure Account',
            children: [
              { id: 'creating-an-azure-account', title: 'Creating an Azure Account' },
              { id: 'azure-free-account', title: 'Azure Free Account' },
              { id: 'account-types', title: 'Account Types' },
              { id: 'azure-account-vs-microsoft-account', title: 'Azure Account vs Microsoft Account' },
            ],
          },
          {
            id: 'subscriptions',
            title: 'Subscriptions',
            children: [
              { id: 'what-is-a-subscription', title: 'What is a Subscription?' },
              { id: 'subscription-types', title: 'Subscription Types & Offers' },
              { id: 'subscription-limits-quotas', title: 'Subscription Limits & Quotas' },
              { id: 'subscription-billing-boundary', title: 'Subscription as a Billing Boundary' },
              { id: 'moving-resources-between-subscriptions', title: 'Moving Resources Between Subscriptions' },
            ],
          },
          {
            id: 'tenants-directories',
            title: 'Tenants & Directories',
            children: [
              { id: 'what-is-a-tenant', title: 'What is a Tenant?' },
              { id: 'tenant-vs-subscription', title: 'Tenant vs Subscription' },
              { id: 'multiple-tenants', title: 'Working With Multiple Tenants' },
            ],
          },
          {
            id: 'account-administration',
            title: 'Account Administration',
            children: [
              { id: 'account-administrator-roles', title: 'Account & Billing Administrator Roles' },
              { id: 'enterprise-agreements', title: 'Enterprise Agreements (EA)' },
              { id: 'cloud-solution-provider', title: 'Cloud Solution Provider (CSP)' },
              { id: 'cost-center-organization', title: 'Cost Center Organization' },
            ],
          },
        ],
      },
      {
        id: 'azure-management-tools',
        title: 'Portal, CLI, PowerShell & Cloud Shell',
        summary: 'Ways to access and manage Azure resources.',
        level: 'beginner',
        children: [
          {
            id: 'azure-portal',
            title: 'Azure Portal',
            children: [
              { id: 'portal-overview', title: 'Portal Overview' },
              { id: 'dashboards', title: 'Dashboards' },
              { id: 'blades-and-navigation', title: 'Blades & Navigation' },
              { id: 'portal-settings', title: 'Portal Settings' },
              { id: 'azure-mobile-app', title: 'Azure Mobile App' },
            ],
          },
          {
            id: 'azure-cli',
            title: 'Azure CLI',
            children: [
              { id: 'installing-azure-cli', title: 'Installing Azure CLI' },
              { id: 'cli-authentication', title: 'CLI Authentication' },
              { id: 'cli-command-syntax', title: 'Command Syntax & Groups' },
              { id: 'cli-output-formats', title: 'Output Formats & Queries' },
              { id: 'cli-in-scripts', title: 'Using the CLI in Scripts' },
            ],
          },
          {
            id: 'azure-powershell',
            title: 'Azure PowerShell',
            children: [
              { id: 'installing-az-module', title: 'Installing the Az Module' },
              { id: 'powershell-authentication', title: 'PowerShell Authentication' },
              { id: 'common-cmdlets', title: 'Common Cmdlets' },
              { id: 'powershell-scripting', title: 'PowerShell Scripting' },
            ],
          },
          {
            id: 'cloud-shell',
            title: 'Azure Cloud Shell',
            children: [
              { id: 'bash-vs-powershell', title: 'Bash vs PowerShell' },
              { id: 'cloud-shell-storage', title: 'Cloud Shell Storage' },
              { id: 'cloud-shell-tools', title: 'Pre-Installed Tools' },
            ],
          },
          {
            id: 'rest-api-sdks',
            title: 'REST API & SDKs',
            children: [
              { id: 'azure-rest-api', title: 'Azure REST API' },
              { id: 'azure-sdks', title: 'Azure SDKs' },
              { id: 'arm-rest-endpoints', title: 'ARM REST Endpoints' },
            ],
          },
          {
            id: 'developer-tooling',
            title: 'Developer Tooling',
            children: [
              { id: 'vs-code-azure-extensions', title: 'VS Code Azure Extensions' },
              { id: 'azure-developer-cli-azd', title: 'Azure Developer CLI (azd)' },
              { id: 'azure-resource-explorer', title: 'Azure Resource Explorer' },
              { id: 'visual-studio-azure-tools', title: 'Visual Studio Azure Tools' },
            ],
          },
        ],
      },
      {
        id: 'resource-manager',
        title: 'Azure Resource Manager & Resource Groups',
        summary: 'ARM, resource groups, deployments and resource providers.',
        level: 'beginner',
        children: [
          {
            id: 'arm-fundamentals',
            title: 'ARM Fundamentals',
            children: [
              { id: 'what-is-arm', title: 'What is Azure Resource Manager?' },
              { id: 'resource-providers', title: 'Resource Providers' },
              { id: 'arm-request-flow', title: 'ARM Request Flow' },
              { id: 'control-plane-data-plane', title: 'Control Plane vs Data Plane' },
            ],
          },
          {
            id: 'resource-groups',
            title: 'Resource Groups',
            children: [
              { id: 'creating-resource-groups', title: 'Creating Resource Groups' },
              { id: 'resource-group-organization', title: 'Organizing Resource Groups' },
              { id: 'resource-group-location', title: 'Resource Group Location' },
              { id: 'moving-resources', title: 'Moving Resources' },
              { id: 'resource-group-deletion', title: 'Resource Group Deletion' },
            ],
          },
          {
            id: 'resources',
            title: 'Resources',
            children: [
              { id: 'resource-ids', title: 'Resource IDs' },
              { id: 'resource-types', title: 'Resource Types' },
              { id: 'resource-naming-conventions', title: 'Naming Conventions' },
              { id: 'resource-provider-registration', title: 'Provider Registration' },
            ],
          },
          {
            id: 'arm-deployments',
            title: 'Deployments',
            children: [
              { id: 'deployment-modes', title: 'Deployment Modes (Incremental vs Complete)' },
              { id: 'deployment-scopes', title: 'Deployment Scopes' },
              { id: 'template-deployments', title: 'Template Deployments' },
              { id: 'what-if-operation', title: 'What-If Operation' },
            ],
          },
        ],
      },
      {
        id: 'billing-pricing-support',
        title: 'Billing, Pricing & Support',
        summary: 'Pricing models, billing tools, SLAs and support plans.',
        level: 'beginner',
        children: [
          {
            id: 'pricing-models',
            title: 'Pricing Models',
            children: [
              { id: 'pay-as-you-go', title: 'Pay-As-You-Go' },
              { id: 'reservations', title: 'Reservations' },
              { id: 'savings-plans', title: 'Savings Plans' },
              { id: 'spot-pricing', title: 'Spot Pricing' },
              { id: 'azure-hybrid-benefit', title: 'Azure Hybrid Benefit' },
              { id: 'dev-test-pricing', title: 'Dev/Test Pricing' },
            ],
          },
          {
            id: 'pricing-tools',
            title: 'Pricing Tools',
            children: [
              { id: 'pricing-calculator', title: 'Pricing Calculator' },
              { id: 'tco-calculator', title: 'TCO Calculator' },
              { id: 'retail-prices-api', title: 'Retail Prices API' },
            ],
          },
          {
            id: 'billing-management',
            title: 'Billing Management',
            children: [
              { id: 'billing-accounts', title: 'Billing Accounts' },
              { id: 'billing-profiles', title: 'Billing Profiles & Invoice Sections' },
              { id: 'invoices', title: 'Invoices' },
              { id: 'payment-methods', title: 'Payment Methods' },
              { id: 'credits-and-offers', title: 'Credits & Offers' },
            ],
          },
          {
            id: 'cost-management-basics',
            title: 'Cost Management Basics',
            children: [
              { id: 'cost-analysis', title: 'Cost Analysis' },
              { id: 'budgets', title: 'Budgets' },
              { id: 'cost-alerts', title: 'Cost Alerts' },
            ],
          },
          {
            id: 'service-level-agreements',
            title: 'Service Level Agreements (SLAs)',
            children: [
              { id: 'what-is-an-sla', title: 'What is an SLA?' },
              { id: 'composite-slas', title: 'Composite SLAs' },
              { id: 'service-credits', title: 'Service Credits' },
            ],
          },
          {
            id: 'support-plans',
            title: 'Support Plans',
            children: [
              { id: 'basic-support', title: 'Basic Support' },
              { id: 'developer-support', title: 'Developer Support' },
              { id: 'standard-support', title: 'Standard Support' },
              { id: 'professional-direct', title: 'Professional Direct' },
              { id: 'creating-a-support-request', title: 'Creating a Support Request' },
            ],
          },
          {
            id: 'support-learning-resources',
            title: 'Support & Learning Resources',
            children: [
              { id: 'azure-documentation', title: 'Azure Documentation' },
              { id: 'microsoft-learn', title: 'Microsoft Learn' },
              { id: 'azure-architecture-center', title: 'Azure Architecture Center' },
              { id: 'azure-updates', title: 'Azure Updates' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'identity',
    roots: [
      {
        id: 'entra-id-core',
        title: 'Microsoft Entra ID Core',
        summary: 'Tenants, users, groups, devices and authentication.',
        level: 'beginner',
        children: [
          {
            id: 'entra-id-fundamentals',
            title: 'Entra ID Fundamentals',
            children: [
              { id: 'what-is-entra-id', title: 'What is Microsoft Entra ID?' },
              { id: 'entra-id-vs-active-directory', title: 'Entra ID vs Active Directory' },
              { id: 'entra-tenants', title: 'Tenants' },
              { id: 'entra-editions', title: 'Editions & Licensing' },
            ],
          },
          {
            id: 'identities',
            title: 'Identities',
            children: [
              { id: 'users', title: 'Users' },
              { id: 'groups', title: 'Groups' },
              { id: 'service-principals-overview', title: 'Service Principals' },
              { id: 'managed-identities-overview', title: 'Managed Identities' },
              { id: 'devices', title: 'Devices' },
              { id: 'administrative-units', title: 'Administrative Units' },
            ],
          },
          {
            id: 'authentication-methods',
            title: 'Authentication Methods',
            children: [
              { id: 'password-authentication', title: 'Password Authentication' },
              { id: 'multifactor-authentication', title: 'Multifactor Authentication (MFA)' },
              { id: 'passwordless-authentication', title: 'Passwordless Authentication' },
              { id: 'windows-hello-for-business', title: 'Windows Hello for Business' },
              { id: 'fido2-security-keys', title: 'FIDO2 Security Keys' },
              { id: 'certificate-based-authentication', title: 'Certificate-Based Authentication' },
              { id: 'self-service-password-reset', title: 'Self-Service Password Reset' },
            ],
          },
          {
            id: 'authentication-protocols',
            title: 'Authentication Protocols',
            children: [
              { id: 'oauth2', title: 'OAuth 2.0' },
              { id: 'openid-connect', title: 'OpenID Connect' },
              { id: 'saml', title: 'SAML' },
              { id: 'ws-federation', title: 'WS-Federation' },
            ],
          },
          {
            id: 'application-management',
            title: 'Application Management',
            children: [
              { id: 'app-registrations', title: 'App Registrations' },
              { id: 'enterprise-applications', title: 'Enterprise Applications' },
              { id: 'consent-and-permissions', title: 'Consent & Permissions' },
              { id: 'single-sign-on', title: 'Single Sign-On (SSO)' },
            ],
          },
          {
            id: 'hybrid-identity',
            title: 'Hybrid Identity',
            level: 'intermediate',
            children: [
              { id: 'entra-connect', title: 'Entra Connect Sync' },
              { id: 'entra-cloud-sync', title: 'Entra Cloud Sync' },
              { id: 'password-hash-sync', title: 'Password Hash Synchronization' },
              { id: 'pass-through-authentication', title: 'Pass-Through Authentication' },
              { id: 'federation-with-adfs', title: 'Federation with AD FS' },
            ],
          },
        ],
      },
      {
        id: 'azure-rbac',
        title: 'Azure RBAC',
        summary: 'Role-based access control, roles, scopes and assignments.',
        level: 'intermediate',
        children: [
          {
            id: 'rbac-fundamentals',
            title: 'RBAC Fundamentals',
            children: [
              { id: 'what-is-rbac', title: 'What is Azure RBAC?' },
              { id: 'security-principals', title: 'Security Principals' },
              { id: 'role-definitions', title: 'Role Definitions' },
              { id: 'rbac-scope', title: 'Scope' },
              { id: 'role-assignments', title: 'Role Assignments' },
            ],
          },
          {
            id: 'built-in-roles',
            title: 'Built-In Roles',
            children: [
              { id: 'owner', title: 'Owner' },
              { id: 'contributor', title: 'Contributor' },
              { id: 'reader', title: 'Reader' },
              { id: 'user-access-administrator', title: 'User Access Administrator' },
              { id: 'service-specific-roles', title: 'Service-Specific Roles' },
            ],
          },
          {
            id: 'custom-roles',
            title: 'Custom Roles',
            children: [
              { id: 'creating-custom-roles', title: 'Creating Custom Roles' },
              { id: 'actions-notactions', title: 'Actions & NotActions' },
              { id: 'dataactions-notdataactions', title: 'DataActions & NotDataActions' },
              { id: 'assignable-scopes', title: 'Assignable Scopes' },
            ],
          },
          {
            id: 'rbac-management',
            title: 'RBAC Management',
            children: [
              { id: 'assigning-roles', title: 'Assigning Roles' },
              { id: 'deny-assignments', title: 'Deny Assignments' },
              { id: 'how-rbac-determines-access', title: 'How RBAC Determines Access' },
              { id: 'rbac-vs-azure-policy', title: 'RBAC vs Azure Policy' },
              { id: 'rbac-vs-entra-roles', title: 'Azure RBAC vs Entra Roles' },
            ],
          },
        ],
      },
      {
        id: 'entra-id-governance',
        title: 'Entra ID Governance & PIM',
        summary: 'Privileged Identity Management, access reviews and entitlements.',
        level: 'advanced',
        children: [
          {
            id: 'privileged-identity-management',
            title: 'Privileged Identity Management (PIM)',
            children: [
              { id: 'pim-overview', title: 'PIM Overview' },
              { id: 'eligible-vs-active-assignments', title: 'Eligible vs Active Assignments' },
              { id: 'just-in-time-access', title: 'Just-In-Time Access' },
              { id: 'pim-approval-workflows', title: 'Approval Workflows' },
              { id: 'pim-for-groups', title: 'PIM for Groups' },
              { id: 'pim-alerts-reviews', title: 'PIM Alerts & Access Reviews' },
            ],
          },
          {
            id: 'identity-governance',
            title: 'Identity Governance',
            children: [
              { id: 'entitlement-management', title: 'Entitlement Management' },
              { id: 'access-packages', title: 'Access Packages' },
              { id: 'access-reviews', title: 'Access Reviews' },
              { id: 'lifecycle-workflows', title: 'Lifecycle Workflows' },
              { id: 'terms-of-use', title: 'Terms of Use' },
            ],
          },
          {
            id: 'conditional-access',
            title: 'Conditional Access',
            children: [
              { id: 'conditional-access-policies', title: 'Conditional Access Policies' },
              { id: 'signals-and-conditions', title: 'Signals & Conditions' },
              { id: 'grant-controls', title: 'Grant Controls' },
              { id: 'session-controls', title: 'Session Controls' },
              { id: 'named-locations', title: 'Named Locations' },
              { id: 'authentication-strengths', title: 'Authentication Strengths' },
            ],
          },
          {
            id: 'identity-protection',
            title: 'Identity Protection',
            children: [
              { id: 'risk-detections', title: 'Risk Detections' },
              { id: 'risky-users', title: 'Risky Users' },
              { id: 'risky-sign-ins', title: 'Risky Sign-Ins' },
              { id: 'risk-based-policies', title: 'Risk-Based Policies' },
            ],
          },
          {
            id: 'identity-monitoring',
            title: 'Monitoring & Reporting',
            children: [
              { id: 'sign-in-logs', title: 'Sign-In Logs' },
              { id: 'audit-logs', title: 'Audit Logs' },
              { id: 'provisioning-logs', title: 'Provisioning Logs' },
              { id: 'workbooks-and-insights', title: 'Workbooks & Insights' },
            ],
          },
        ],
      },
      {
        id: 'external-identities',
        title: 'External Identities (B2B & B2C)',
        summary: 'Guest access, External ID and customer identity.',
        level: 'intermediate',
        children: [
          {
            id: 'b2b-collaboration',
            title: 'B2B Collaboration',
            children: [
              { id: 'guest-users', title: 'Guest Users' },
              { id: 'inviting-external-users', title: 'Inviting External Users' },
              { id: 'cross-tenant-access-settings', title: 'Cross-Tenant Access Settings' },
              { id: 'b2b-direct-connect', title: 'B2B Direct Connect' },
            ],
          },
          {
            id: 'entra-external-id',
            title: 'Microsoft Entra External ID',
            children: [
              { id: 'external-id-for-customers', title: 'External ID for Customers (CIAM)' },
              { id: 'user-flows', title: 'User Flows' },
              { id: 'custom-branding', title: 'Custom Branding' },
              { id: 'external-identity-providers', title: 'Identity Providers' },
            ],
          },
          {
            id: 'azure-ad-b2c',
            title: 'Azure AD B2C (Legacy)',
            children: [
              { id: 'b2c-tenants', title: 'B2C Tenants' },
              { id: 'b2c-user-flows', title: 'B2C User Flows' },
              { id: 'b2c-custom-policies', title: 'Custom Policies' },
              { id: 'b2c-vs-external-id', title: 'B2C vs External ID' },
            ],
          },
          {
            id: 'multi-tenant-apps',
            title: 'Multi-Tenant Applications',
            children: [
              { id: 'multi-tenant-app-registration', title: 'Multi-Tenant App Registration' },
              { id: 'admin-consent', title: 'Admin Consent' },
              { id: 'tenant-restrictions', title: 'Tenant Restrictions' },
            ],
          },
        ],
      },
      {
        id: 'managed-identities',
        title: 'Managed Identities & Service Principals',
        summary: 'Workload identities for secure resource-to-resource access.',
        level: 'intermediate',
        children: [
          {
            id: 'managed-identity-types',
            title: 'Managed Identity Types',
            children: [
              { id: 'system-assigned', title: 'System-Assigned' },
              { id: 'user-assigned', title: 'User-Assigned' },
              { id: 'system-vs-user-assigned', title: 'System vs User-Assigned' },
            ],
          },
          {
            id: 'using-managed-identities',
            title: 'Using Managed Identities',
            children: [
              { id: 'enabling-managed-identities', title: 'Enabling Managed Identities' },
              { id: 'accessing-resources', title: 'Accessing Resources' },
              { id: 'managed-identities-and-rbac', title: 'Managed Identities & RBAC' },
              { id: 'token-acquisition', title: 'Token Acquisition' },
            ],
          },
          {
            id: 'service-principals',
            title: 'Service Principals',
            children: [
              { id: 'what-is-a-service-principal', title: 'What is a Service Principal?' },
              { id: 'app-vs-service-principal', title: 'App Object vs Service Principal' },
              { id: 'client-secrets', title: 'Client Secrets' },
              { id: 'certificate-credentials', title: 'Certificate Credentials' },
              { id: 'workload-identity-federation', title: 'Workload Identity Federation' },
            ],
          },
          {
            id: 'identity-best-practices',
            title: 'Best Practices',
            children: [
              { id: 'choosing-identity-type', title: 'Choosing an Identity Type' },
              { id: 'rotating-credentials', title: 'Rotating Credentials' },
              { id: 'least-privilege-identities', title: 'Least-Privilege Identities' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'governance',
    roots: [
      {
        id: 'management-groups',
        title: 'Management Groups & Subscription Organization',
        summary: 'Hierarchy of management groups, subscriptions and resources.',
        level: 'intermediate',
        children: [
          {
            id: 'management-group-hierarchy',
            title: 'Management Group Hierarchy',
            children: [
              { id: 'root-management-group', title: 'Root Management Group' },
              { id: 'creating-management-groups', title: 'Creating Management Groups' },
              { id: 'hierarchy-design', title: 'Hierarchy Design' },
              { id: 'moving-subscriptions', title: 'Moving Subscriptions' },
            ],
          },
          {
            id: 'subscription-organization',
            title: 'Subscription Organization',
            children: [
              { id: 'subscription-strategies', title: 'Subscription Strategies' },
              { id: 'subscription-vending', title: 'Subscription Vending' },
              { id: 'subscription-democratization', title: 'Subscription Democratization' },
            ],
          },
          {
            id: 'scope-and-inheritance',
            title: 'Scope & Inheritance',
            children: [
              { id: 'scope-levels', title: 'Scope Levels' },
              { id: 'policy-inheritance', title: 'Policy Inheritance' },
              { id: 'rbac-inheritance', title: 'RBAC Inheritance' },
            ],
          },
        ],
      },
      {
        id: 'azure-policy',
        title: 'Azure Policy',
        summary: 'Policies, initiatives, compliance and remediation.',
        level: 'intermediate',
        children: [
          {
            id: 'policy-fundamentals',
            title: 'Policy Fundamentals',
            children: [
              { id: 'what-is-azure-policy', title: 'What is Azure Policy?' },
              { id: 'policy-definitions', title: 'Policy Definitions' },
              { id: 'policy-assignments', title: 'Policy Assignments' },
              { id: 'policy-scope-exclusions', title: 'Scope & Exclusions' },
              { id: 'policy-vs-rbac', title: 'Policy vs RBAC' },
            ],
          },
          {
            id: 'policy-effects',
            title: 'Policy Effects',
            children: [
              { id: 'deny-effect', title: 'Deny' },
              { id: 'audit-effect', title: 'Audit' },
              { id: 'append-effect', title: 'Append' },
              { id: 'modify-effect', title: 'Modify' },
              { id: 'deployifnotexists', title: 'DeployIfNotExists' },
              { id: 'auditifnotexists', title: 'AuditIfNotExists' },
              { id: 'deny-action-disabled', title: 'DenyAction & Disabled' },
            ],
          },
          {
            id: 'policy-initiatives',
            title: 'Policy Initiatives',
            children: [
              { id: 'initiative-definitions', title: 'Initiative Definitions' },
              { id: 'initiative-parameters', title: 'Initiative Parameters' },
              { id: 'regulatory-compliance-initiatives', title: 'Regulatory Compliance Initiatives' },
            ],
          },
          {
            id: 'policy-compliance',
            title: 'Compliance & Remediation',
            children: [
              { id: 'compliance-evaluation', title: 'Compliance Evaluation' },
              { id: 'remediation-tasks', title: 'Remediation Tasks' },
              { id: 'policy-exemptions', title: 'Exemptions' },
              { id: 'compliance-dashboard', title: 'Compliance Dashboard' },
            ],
          },
          {
            id: 'authoring-policies',
            title: 'Authoring Policies',
            level: 'advanced',
            children: [
              { id: 'policy-rule-structure', title: 'Policy Rule Structure' },
              { id: 'policy-aliases', title: 'Aliases' },
              { id: 'policy-functions', title: 'Policy Functions' },
              { id: 'testing-policies', title: 'Testing Policies' },
            ],
          },
        ],
      },
      {
        id: 'resource-organization',
        title: 'Tags, Locks & Resource Graph',
        summary: 'Organizing, protecting and querying resources at scale.',
        level: 'beginner',
        children: [
          {
            id: 'resource-tagging',
            title: 'Resource Tagging',
            children: [
              { id: 'tag-basics', title: 'Tag Basics' },
              { id: 'tagging-strategy', title: 'Tagging Strategy' },
              { id: 'enforcing-tags-with-policy', title: 'Enforcing Tags with Policy' },
              { id: 'tags-and-billing', title: 'Tags & Billing' },
            ],
          },
          {
            id: 'resource-locks',
            title: 'Resource Locks',
            children: [
              { id: 'read-only-locks', title: 'Read-Only Locks' },
              { id: 'delete-locks', title: 'Delete (CanNotDelete) Locks' },
              { id: 'lock-inheritance', title: 'Lock Inheritance' },
            ],
          },
          {
            id: 'azure-resource-graph',
            title: 'Azure Resource Graph',
            level: 'intermediate',
            children: [
              { id: 'resource-graph-queries', title: 'Resource Graph Queries' },
              { id: 'kql-for-resources', title: 'KQL for Resources' },
              { id: 'resource-graph-explorer', title: 'Resource Graph Explorer' },
              { id: 'querying-at-scale', title: 'Querying at Scale' },
            ],
          },
          {
            id: 'naming-and-organization',
            title: 'Naming & Organization',
            children: [
              { id: 'naming-conventions', title: 'Naming Conventions' },
              { id: 'organizing-resources', title: 'Organizing Resources' },
              { id: 'resource-abbreviations', title: 'Recommended Abbreviations' },
            ],
          },
        ],
      },
      {
        id: 'landing-zones',
        title: 'Landing Zones & Blueprints',
        summary: 'Enterprise-scale landing zones and environment baselines.',
        level: 'advanced',
        children: [
          {
            id: 'landing-zone-concepts',
            title: 'Landing Zone Concepts',
            children: [
              { id: 'what-is-a-landing-zone', title: 'What is a Landing Zone?' },
              { id: 'platform-vs-application-landing-zones', title: 'Platform vs Application Landing Zones' },
              { id: 'landing-zone-design-areas', title: 'Design Areas' },
            ],
          },
          {
            id: 'enterprise-scale-landing-zones',
            title: 'Enterprise-Scale Landing Zones',
            children: [
              { id: 'reference-architecture', title: 'Reference Architecture' },
              { id: 'management-group-structure', title: 'Management Group Structure' },
              { id: 'connectivity-subscription', title: 'Connectivity Subscription' },
              { id: 'identity-subscription', title: 'Identity Subscription' },
              { id: 'management-subscription', title: 'Management Subscription' },
            ],
          },
          {
            id: 'landing-zone-accelerators',
            title: 'Landing Zone Accelerators',
            children: [
              { id: 'alz-bicep', title: 'ALZ Bicep' },
              { id: 'alz-terraform', title: 'ALZ Terraform' },
              { id: 'portal-accelerator', title: 'Portal Accelerator' },
            ],
          },
          {
            id: 'azure-blueprints',
            title: 'Azure Blueprints (Deprecated)',
            children: [
              { id: 'blueprint-definitions', title: 'Blueprint Definitions' },
              { id: 'blueprint-artifacts', title: 'Blueprint Artifacts' },
              { id: 'blueprint-assignments', title: 'Blueprint Assignments' },
              { id: 'blueprints-migration', title: 'Migration from Blueprints' },
            ],
          },
          {
            id: 'deployment-stacks',
            title: 'Deployment Stacks',
            children: [
              { id: 'what-are-deployment-stacks', title: 'What are Deployment Stacks?' },
              { id: 'deny-settings', title: 'Deny Settings' },
              { id: 'managing-resource-lifecycle', title: 'Managing Resource Lifecycle' },
            ],
          },
        ],
      },
      {
        id: 'azure-arc',
        title: 'Azure Arc',
        summary: 'Managing on-premises, multicloud and edge resources.',
        level: 'advanced',
        children: [
          {
            id: 'arc-fundamentals',
            title: 'Arc Fundamentals',
            children: [
              { id: 'what-is-azure-arc', title: 'What is Azure Arc?' },
              { id: 'arc-control-plane', title: 'Arc Control Plane' },
              { id: 'arc-use-cases', title: 'Use Cases' },
            ],
          },
          {
            id: 'arc-enabled-servers',
            title: 'Arc-Enabled Servers',
            children: [
              { id: 'onboarding-servers', title: 'Onboarding Servers' },
              { id: 'arc-connected-machine-agent', title: 'Connected Machine Agent' },
              { id: 'arc-extensions-policies', title: 'Extensions & Policies' },
              { id: 'arc-ssh-access', title: 'SSH Access' },
            ],
          },
          {
            id: 'arc-enabled-kubernetes',
            title: 'Arc-Enabled Kubernetes',
            children: [
              { id: 'connecting-clusters', title: 'Connecting Clusters' },
              { id: 'gitops-flux', title: 'GitOps with Flux' },
              { id: 'arc-cluster-extensions', title: 'Cluster Extensions' },
            ],
          },
          {
            id: 'arc-enabled-data-services',
            title: 'Arc-Enabled Data Services',
            children: [
              { id: 'arc-sql-managed-instance', title: 'Arc SQL Managed Instance' },
              { id: 'arc-postgresql', title: 'Arc PostgreSQL' },
            ],
          },
          {
            id: 'arc-enabled-infrastructure',
            title: 'Arc-Enabled Infrastructure',
            children: [
              { id: 'arc-vmware', title: 'Arc for VMware' },
              { id: 'arc-scvmm', title: 'Arc for SCVMM' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'compute',
    roots: [
      {
        id: 'virtual-machines',
        title: 'Azure Virtual Machines',
        summary: 'VMs, images, disks, sizing, availability and pricing.',
        level: 'beginner',
        children: [
          {
            id: 'vm-fundamentals',
            title: 'VM Fundamentals',
            children: [
              { id: 'what-is-a-vm', title: 'What is a Virtual Machine?' },
              { id: 'creating-a-vm', title: 'Creating a VM' },
              { id: 'vm-lifecycle', title: 'VM Lifecycle & States' },
              { id: 'vm-generations', title: 'VM Generations' },
              { id: 'connecting-to-vms', title: 'Connecting to VMs (RDP/SSH/Bastion)' },
            ],
          },
          {
            id: 'vm-sizes-families',
            title: 'VM Sizes & Families',
            children: [
              { id: 'general-purpose', title: 'General Purpose' },
              { id: 'compute-optimized', title: 'Compute Optimized' },
              { id: 'memory-optimized', title: 'Memory Optimized' },
              { id: 'storage-optimized', title: 'Storage Optimized' },
              { id: 'gpu-vms', title: 'GPU' },
              { id: 'hpc-vms', title: 'High-Performance Compute' },
              { id: 'resizing-vms', title: 'Resizing VMs' },
            ],
          },
          {
            id: 'vm-images',
            title: 'VM Images',
            children: [
              { id: 'marketplace-images', title: 'Marketplace Images' },
              { id: 'custom-images', title: 'Custom Images' },
              { id: 'azure-compute-gallery', title: 'Azure Compute Gallery' },
              { id: 'generalized-vs-specialized', title: 'Generalized vs Specialized' },
            ],
          },
          {
            id: 'vm-disks-storage',
            title: 'VM Disks & Storage',
            children: [
              { id: 'os-disk', title: 'OS Disk' },
              { id: 'data-disks', title: 'Data Disks' },
              { id: 'temporary-disk', title: 'Temporary Disk' },
              { id: 'vm-managed-disks', title: 'Managed Disks' },
              { id: 'vm-disk-encryption', title: 'Disk Encryption' },
            ],
          },
          {
            id: 'vm-networking',
            title: 'VM Networking',
            children: [
              { id: 'network-interfaces', title: 'Network Interfaces' },
              { id: 'public-private-ips', title: 'Public & Private IPs' },
              { id: 'nsg-on-vms', title: 'Network Security Groups on VMs' },
              { id: 'accelerated-networking', title: 'Accelerated Networking' },
            ],
          },
          {
            id: 'vm-availability',
            title: 'VM Availability',
            children: [
              { id: 'vm-availability-sets', title: 'Availability Sets' },
              { id: 'vm-availability-zones', title: 'Availability Zones' },
              { id: 'vm-sla', title: 'VM SLAs' },
            ],
          },
          {
            id: 'vm-management',
            title: 'VM Management',
            children: [
              { id: 'vm-extensions', title: 'VM Extensions' },
              { id: 'custom-script-extension', title: 'Custom Script Extension' },
              { id: 'vm-applications', title: 'VM Applications' },
              { id: 'vm-update-management', title: 'Update Management (Azure Update Manager)' },
              { id: 'run-command', title: 'Run Command' },
              { id: 'vm-serial-console', title: 'Serial Console' },
            ],
          },
          {
            id: 'vm-pricing',
            title: 'VM Pricing',
            children: [
              { id: 'pay-as-you-go-vms', title: 'Pay-As-You-Go' },
              { id: 'reserved-vm-instances', title: 'Reserved Instances' },
              { id: 'spot-vms', title: 'Spot VMs' },
              { id: 'azure-hybrid-benefit-vms', title: 'Azure Hybrid Benefit' },
            ],
          },
        ],
      },
      {
        id: 'vm-scale-sets',
        title: 'Virtual Machine Scale Sets',
        summary: 'Autoscaling fleets of identical virtual machines.',
        level: 'intermediate',
        children: [
          {
            id: 'vmss-fundamentals',
            title: 'Scale Set Fundamentals',
            children: [
              { id: 'what-are-scale-sets', title: 'What are Scale Sets?' },
              { id: 'uniform-vs-flexible-orchestration', title: 'Uniform vs Flexible Orchestration' },
              { id: 'creating-scale-sets', title: 'Creating Scale Sets' },
            ],
          },
          {
            id: 'vmss-scaling',
            title: 'Scaling',
            children: [
              { id: 'manual-scaling', title: 'Manual Scaling' },
              { id: 'autoscale-rules', title: 'Autoscale Rules' },
              { id: 'scheduled-scaling', title: 'Scheduled Scaling' },
              { id: 'predictive-autoscale', title: 'Predictive Autoscale' },
            ],
          },
          {
            id: 'vmss-management',
            title: 'Scale Set Management',
            children: [
              { id: 'instance-management', title: 'Instance Management' },
              { id: 'rolling-upgrades', title: 'Rolling Upgrades' },
              { id: 'automatic-os-upgrades', title: 'Automatic OS Upgrades' },
              { id: 'application-health-monitoring', title: 'Application Health Monitoring' },
            ],
          },
        ],
      },
      {
        id: 'app-service',
        title: 'Azure App Service',
        summary: 'Managed hosting for web apps and APIs.',
        level: 'beginner',
        children: [
          {
            id: 'app-service-fundamentals',
            title: 'App Service Fundamentals',
            children: [
              { id: 'what-is-app-service', title: 'What is App Service?' },
              { id: 'app-service-plans', title: 'App Service Plans' },
              { id: 'app-service-pricing-tiers', title: 'Pricing Tiers' },
              { id: 'runtime-stacks', title: 'Runtime Stacks' },
              { id: 'app-service-environment', title: 'App Service Environment (ASE)' },
            ],
          },
          {
            id: 'deploying-apps',
            title: 'Deploying Apps',
            children: [
              { id: 'deployment-slots', title: 'Deployment Slots' },
              { id: 'continuous-deployment', title: 'Continuous Deployment' },
              { id: 'zip-deploy', title: 'Zip Deploy & Run From Package' },
              { id: 'container-deployment', title: 'Container Deployment' },
              { id: 'local-git-deploy', title: 'Local Git Deployment' },
            ],
          },
          {
            id: 'app-service-configuration',
            title: 'Configuration',
            children: [
              { id: 'app-settings', title: 'App Settings' },
              { id: 'connection-strings', title: 'Connection Strings' },
              { id: 'custom-domains', title: 'Custom Domains' },
              { id: 'tls-ssl-bindings', title: 'TLS/SSL Bindings' },
            ],
          },
          {
            id: 'scaling-app-service',
            title: 'Scaling',
            children: [
              { id: 'scale-up', title: 'Scale Up' },
              { id: 'scale-out', title: 'Scale Out' },
              { id: 'app-service-autoscale', title: 'Autoscale' },
            ],
          },
          {
            id: 'app-service-networking',
            title: 'Networking',
            level: 'intermediate',
            children: [
              { id: 'vnet-integration', title: 'VNet Integration' },
              { id: 'app-service-private-endpoints', title: 'Private Endpoints' },
              { id: 'hybrid-connections', title: 'Hybrid Connections' },
              { id: 'access-restrictions', title: 'Access Restrictions' },
            ],
          },
          {
            id: 'app-service-features',
            title: 'Monitoring & Features',
            children: [
              { id: 'diagnostics-logging', title: 'Diagnostics & Logging' },
              { id: 'app-service-authentication', title: 'Authentication (Easy Auth)' },
              { id: 'app-service-backup-restore', title: 'Backup & Restore' },
              { id: 'webjobs', title: 'WebJobs' },
            ],
          },
        ],
      },
      {
        id: 'azure-functions',
        title: 'Azure Functions',
        summary: 'Event-driven serverless compute.',
        level: 'intermediate',
        children: [
          {
            id: 'functions-fundamentals',
            title: 'Functions Fundamentals',
            children: [
              { id: 'what-are-functions', title: 'What are Azure Functions?' },
              { id: 'triggers', title: 'Triggers' },
              { id: 'bindings', title: 'Bindings' },
              { id: 'functions-runtime', title: 'Functions Runtime' },
            ],
          },
          {
            id: 'functions-hosting-plans',
            title: 'Hosting Plans',
            children: [
              { id: 'consumption-plan', title: 'Consumption Plan' },
              { id: 'premium-plan', title: 'Premium Plan' },
              { id: 'dedicated-plan', title: 'Dedicated (App Service) Plan' },
              { id: 'flex-consumption-plan', title: 'Flex Consumption Plan' },
            ],
          },
          {
            id: 'functions-development',
            title: 'Development',
            children: [
              { id: 'supported-languages', title: 'Supported Languages' },
              { id: 'local-development', title: 'Local Development' },
              { id: 'isolated-worker-model', title: 'Isolated Worker Model' },
              { id: 'dependency-injection', title: 'Dependency Injection' },
            ],
          },
          {
            id: 'durable-functions',
            title: 'Durable Functions',
            level: 'advanced',
            children: [
              { id: 'function-chaining', title: 'Function Chaining' },
              { id: 'fan-out-fan-in', title: 'Fan-Out/Fan-In' },
              { id: 'async-http-apis', title: 'Async HTTP APIs' },
              { id: 'monitor-pattern', title: 'Monitor Pattern' },
              { id: 'human-interaction-pattern', title: 'Human Interaction Pattern' },
            ],
          },
          {
            id: 'functions-operations',
            title: 'Operations',
            children: [
              { id: 'scaling-functions', title: 'Scaling' },
              { id: 'cold-starts', title: 'Cold Starts' },
              { id: 'functions-networking', title: 'Networking' },
              { id: 'monitoring-functions', title: 'Monitoring' },
            ],
          },
        ],
      },
      {
        id: 'other-compute',
        title: 'Other Compute Services',
        summary: 'Batch, Service Fabric, dedicated hosts and more.',
        level: 'advanced',
        children: [
          {
            id: 'azure-batch',
            title: 'Azure Batch',
            children: [
              { id: 'batch-accounts', title: 'Batch Accounts' },
              { id: 'batch-pools-nodes', title: 'Pools & Nodes' },
              { id: 'batch-jobs-tasks', title: 'Jobs & Tasks' },
            ],
          },
          {
            id: 'service-fabric',
            title: 'Service Fabric',
            children: [
              { id: 'service-fabric-clusters', title: 'Clusters' },
              { id: 'stateless-stateful-services', title: 'Stateless & Stateful Services' },
              { id: 'reliable-collections', title: 'Reliable Collections' },
            ],
          },
          {
            id: 'azure-dedicated-host',
            title: 'Azure Dedicated Host',
            children: [
              { id: 'dedicated-hosts', title: 'Dedicated Hosts' },
              { id: 'host-groups', title: 'Host Groups' },
            ],
          },
          {
            id: 'specialized-compute',
            title: 'Specialized Compute',
            children: [
              { id: 'confidential-computing', title: 'Confidential Computing' },
              { id: 'azure-cyclecloud', title: 'Azure CycleCloud (HPC)' },
              { id: 'azure-quantum', title: 'Azure Quantum' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'containers',
    roots: [
      {
        id: 'container-registry',
        title: 'Azure Container Registry',
        summary: 'Storing and building container images.',
        level: 'intermediate',
        children: [
          {
            id: 'acr-fundamentals',
            title: 'ACR Fundamentals',
            children: [
              { id: 'what-is-acr', title: 'What is Azure Container Registry?' },
              { id: 'acr-tiers', title: 'Registry Tiers (Basic/Standard/Premium)' },
              { id: 'repositories-and-tags', title: 'Repositories & Tags' },
              { id: 'pushing-pulling-images', title: 'Pushing & Pulling Images' },
            ],
          },
          {
            id: 'acr-features',
            title: 'ACR Features',
            children: [
              { id: 'acr-tasks', title: 'ACR Tasks' },
              { id: 'image-building', title: 'Image Building' },
              { id: 'geo-replication', title: 'Geo-Replication' },
              { id: 'artifact-cache', title: 'Artifact Cache' },
              { id: 'content-trust', title: 'Content Trust' },
            ],
          },
          {
            id: 'acr-security',
            title: 'ACR Security',
            children: [
              { id: 'acr-authentication', title: 'Authentication' },
              { id: 'acr-rbac', title: 'RBAC & Tokens' },
              { id: 'acr-private-link', title: 'Private Link' },
              { id: 'acr-image-scanning', title: 'Image Scanning' },
            ],
          },
        ],
      },
      {
        id: 'container-instances',
        title: 'Azure Container Instances',
        summary: 'Serverless containers without orchestration.',
        level: 'beginner',
        children: [
          {
            id: 'aci-fundamentals',
            title: 'ACI Fundamentals',
            children: [
              { id: 'what-is-aci', title: 'What is Azure Container Instances?' },
              { id: 'container-groups', title: 'Container Groups' },
              { id: 'deploying-containers', title: 'Deploying Containers' },
            ],
          },
          {
            id: 'aci-features',
            title: 'ACI Features',
            children: [
              { id: 'aci-persistent-storage', title: 'Persistent Storage' },
              { id: 'aci-environment-variables-secrets', title: 'Environment Variables & Secrets' },
              { id: 'aci-restart-policies', title: 'Restart Policies' },
              { id: 'aci-networking', title: 'Networking' },
              { id: 'aci-virtual-nodes', title: 'Virtual Nodes' },
            ],
          },
        ],
      },
      {
        id: 'container-apps',
        title: 'Azure Container Apps',
        summary: 'Serverless containers and microservices with scaling.',
        level: 'intermediate',
        children: [
          {
            id: 'container-apps-fundamentals',
            title: 'Container Apps Fundamentals',
            children: [
              { id: 'what-are-container-apps', title: 'What are Container Apps?' },
              { id: 'container-apps-environments', title: 'Environments' },
              { id: 'revisions', title: 'Revisions' },
              { id: 'dapr-integration', title: 'Dapr Integration' },
            ],
          },
          {
            id: 'scaling-container-apps',
            title: 'Scaling',
            children: [
              { id: 'keda-scaling', title: 'KEDA Scaling' },
              { id: 'scale-rules', title: 'Scale Rules' },
              { id: 'scale-to-zero', title: 'Scale to Zero' },
            ],
          },
          {
            id: 'container-apps-networking',
            title: 'Networking & Traffic',
            children: [
              { id: 'container-apps-ingress', title: 'Ingress' },
              { id: 'traffic-splitting', title: 'Traffic Splitting' },
              { id: 'container-apps-custom-domains', title: 'Custom Domains' },
            ],
          },
          {
            id: 'container-apps-features',
            title: 'Features',
            children: [
              { id: 'container-apps-secrets', title: 'Secrets Management' },
              { id: 'container-apps-managed-identities', title: 'Managed Identities' },
              { id: 'container-apps-jobs', title: 'Jobs' },
              { id: 'service-discovery', title: 'Service Discovery' },
            ],
          },
        ],
      },
      {
        id: 'aks',
        title: 'Azure Kubernetes Service (AKS)',
        summary: 'Managed Kubernetes clusters, networking and operations.',
        level: 'advanced',
        children: [
          {
            id: 'aks-fundamentals',
            title: 'AKS Fundamentals',
            children: [
              { id: 'what-is-aks', title: 'What is AKS?' },
              { id: 'kubernetes-basics', title: 'Kubernetes Basics' },
              { id: 'cluster-architecture', title: 'Cluster Architecture' },
              { id: 'control-plane-and-nodes', title: 'Control Plane & Nodes' },
              { id: 'creating-a-cluster', title: 'Creating a Cluster' },
            ],
          },
          {
            id: 'aks-node-pools',
            title: 'Node Pools',
            children: [
              { id: 'system-vs-user-node-pools', title: 'System vs User Node Pools' },
              { id: 'node-pool-scaling', title: 'Node Pool Scaling' },
              { id: 'spot-node-pools', title: 'Spot Node Pools' },
              { id: 'node-pool-upgrades', title: 'Node Pool Upgrades' },
            ],
          },
          {
            id: 'aks-networking',
            title: 'AKS Networking',
            children: [
              { id: 'kubenet-vs-azure-cni', title: 'Kubenet vs Azure CNI' },
              { id: 'azure-cni-overlay', title: 'Azure CNI Overlay' },
              { id: 'ingress-controllers', title: 'Ingress Controllers' },
              { id: 'application-gateway-ingress', title: 'Application Gateway for Containers' },
              { id: 'network-policies', title: 'Network Policies' },
              { id: 'private-clusters', title: 'Private Clusters' },
            ],
          },
          {
            id: 'aks-storage',
            title: 'AKS Storage',
            children: [
              { id: 'persistent-volumes', title: 'Persistent Volumes' },
              { id: 'azure-disk-csi', title: 'Azure Disk CSI Driver' },
              { id: 'azure-files-csi', title: 'Azure Files CSI Driver' },
              { id: 'azure-blob-csi', title: 'Azure Blob CSI Driver' },
            ],
          },
          {
            id: 'aks-scaling',
            title: 'AKS Scaling',
            children: [
              { id: 'horizontal-pod-autoscaler', title: 'Horizontal Pod Autoscaler' },
              { id: 'cluster-autoscaler', title: 'Cluster Autoscaler' },
              { id: 'keda-aks', title: 'KEDA' },
              { id: 'vertical-pod-autoscaler', title: 'Vertical Pod Autoscaler' },
              { id: 'node-autoprovisioning', title: 'Node Autoprovisioning' },
            ],
          },
          {
            id: 'aks-security',
            title: 'AKS Security',
            children: [
              { id: 'aks-rbac', title: 'Kubernetes RBAC' },
              { id: 'aks-entra-integration', title: 'Entra ID Integration' },
              { id: 'aks-workload-identity', title: 'Workload Identity' },
              { id: 'pod-security', title: 'Pod Security' },
              { id: 'azure-policy-for-aks', title: 'Azure Policy for AKS' },
              { id: 'defender-for-containers', title: 'Defender for Containers' },
            ],
          },
          {
            id: 'aks-operations',
            title: 'AKS Operations',
            children: [
              { id: 'cluster-upgrades', title: 'Cluster Upgrades' },
              { id: 'monitoring-aks', title: 'Monitoring (Container Insights)' },
              { id: 'gitops-aks', title: 'GitOps with Flux' },
              { id: 'helm', title: 'Helm' },
              { id: 'aks-backup', title: 'AKS Backup' },
            ],
          },
          {
            id: 'aks-advanced',
            title: 'AKS Advanced',
            children: [
              { id: 'aks-automatic', title: 'AKS Automatic' },
              { id: 'aks-virtual-nodes', title: 'Virtual Nodes' },
              { id: 'windows-containers', title: 'Windows Containers' },
              { id: 'confidential-containers', title: 'Confidential Containers' },
              { id: 'aks-fleet-manager', title: 'Fleet Manager' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'storage',
    roots: [
      {
        id: 'storage-accounts',
        title: 'Azure Storage Accounts',
        summary: 'Account types, redundancy, access tiers and security.',
        level: 'beginner',
        children: [
          {
            id: 'storage-account-fundamentals',
            title: 'Account Fundamentals',
            children: [
              { id: 'what-is-a-storage-account', title: 'What is a Storage Account?' },
              { id: 'storage-account-types', title: 'Account Types' },
              { id: 'storage-services-overview', title: 'Storage Services Overview' },
              { id: 'storage-account-endpoints', title: 'Account Endpoints' },
            ],
          },
          {
            id: 'storage-redundancy',
            title: 'Redundancy',
            children: [
              { id: 'lrs', title: 'Locally Redundant Storage (LRS)' },
              { id: 'zrs', title: 'Zone-Redundant Storage (ZRS)' },
              { id: 'grs', title: 'Geo-Redundant Storage (GRS)' },
              { id: 'gzrs', title: 'Geo-Zone-Redundant Storage (GZRS)' },
              { id: 'read-access-geo-redundant', title: 'Read-Access (RA-GRS/RA-GZRS)' },
            ],
          },
          {
            id: 'storage-performance-tiers',
            title: 'Performance Tiers',
            children: [
              { id: 'standard-performance', title: 'Standard' },
              { id: 'premium-performance', title: 'Premium' },
            ],
          },
          {
            id: 'storage-account-security',
            title: 'Account Security',
            children: [
              { id: 'access-keys', title: 'Access Keys' },
              { id: 'shared-access-signatures', title: 'Shared Access Signatures (SAS)' },
              { id: 'entra-authorization-storage', title: 'Entra ID Authorization' },
              { id: 'storage-encryption-at-rest', title: 'Encryption at Rest' },
              { id: 'infrastructure-encryption', title: 'Infrastructure Encryption' },
            ],
          },
          {
            id: 'storage-account-networking',
            title: 'Account Networking',
            children: [
              { id: 'storage-firewalls-vnets', title: 'Firewalls & Virtual Networks' },
              { id: 'storage-private-endpoints', title: 'Private Endpoints' },
              { id: 'storage-service-endpoints', title: 'Service Endpoints' },
            ],
          },
        ],
      },
      {
        id: 'blob-storage',
        title: 'Azure Blob Storage',
        summary: 'Object storage, tiers, lifecycle and data protection.',
        level: 'beginner',
        children: [
          {
            id: 'blob-fundamentals',
            title: 'Blob Fundamentals',
            children: [
              { id: 'what-is-blob-storage', title: 'What is Blob Storage?' },
              { id: 'blob-containers', title: 'Containers' },
              { id: 'blob-types', title: 'Blob Types (Block/Append/Page)' },
              { id: 'blob-naming', title: 'Blob Naming' },
            ],
          },
          {
            id: 'blob-access-tiers',
            title: 'Access Tiers',
            children: [
              { id: 'hot-tier', title: 'Hot Tier' },
              { id: 'cool-tier', title: 'Cool Tier' },
              { id: 'cold-tier', title: 'Cold Tier' },
              { id: 'archive-tier', title: 'Archive Tier' },
              { id: 'blob-rehydration', title: 'Rehydration' },
            ],
          },
          {
            id: 'blob-data-management',
            title: 'Data Management',
            children: [
              { id: 'lifecycle-management', title: 'Lifecycle Management' },
              { id: 'blob-versioning', title: 'Versioning' },
              { id: 'blob-snapshots', title: 'Snapshots' },
              { id: 'object-replication', title: 'Object Replication' },
              { id: 'immutable-storage', title: 'Immutable Storage' },
            ],
          },
          {
            id: 'blob-features',
            title: 'Blob Features',
            children: [
              { id: 'static-website-hosting', title: 'Static Website Hosting' },
              { id: 'blob-index-tags', title: 'Blob Index Tags' },
              { id: 'change-feed', title: 'Change Feed' },
              { id: 'blob-inventory', title: 'Blob Inventory' },
              { id: 'nfs-sftp-support', title: 'NFS & SFTP Support' },
            ],
          },
          {
            id: 'blob-data-protection',
            title: 'Data Protection',
            children: [
              { id: 'point-in-time-restore', title: 'Point-in-Time Restore' },
              { id: 'blob-soft-delete', title: 'Blob Soft Delete' },
              { id: 'container-soft-delete', title: 'Container Soft Delete' },
            ],
          },
        ],
      },
      {
        id: 'files-queues-tables',
        title: 'Files, Queues & Tables',
        summary: 'Azure Files, Queue Storage and Table Storage.',
        level: 'intermediate',
        children: [
          {
            id: 'azure-files',
            title: 'Azure Files',
            children: [
              { id: 'file-shares', title: 'File Shares' },
              { id: 'smb-vs-nfs', title: 'SMB vs NFS' },
              { id: 'azure-file-sync', title: 'Azure File Sync' },
              { id: 'identity-based-auth-files', title: 'Identity-Based Authentication' },
              { id: 'file-share-snapshots', title: 'Share Snapshots' },
            ],
          },
          {
            id: 'queue-storage',
            title: 'Queue Storage',
            children: [
              { id: 'queues-overview', title: 'Queues Overview' },
              { id: 'queue-messages', title: 'Messages' },
              { id: 'queue-vs-service-bus', title: 'Queue Storage vs Service Bus' },
            ],
          },
          {
            id: 'table-storage',
            title: 'Table Storage',
            children: [
              { id: 'tables-overview', title: 'Tables Overview' },
              { id: 'entities-and-keys', title: 'Entities & Keys' },
              { id: 'table-vs-cosmos', title: 'Table Storage vs Cosmos DB' },
            ],
          },
        ],
      },
      {
        id: 'managed-disks',
        title: 'Azure Managed Disks',
        summary: 'Block storage for VMs, disk types and snapshots.',
        level: 'intermediate',
        children: [
          {
            id: 'disk-fundamentals',
            title: 'Disk Fundamentals',
            children: [
              { id: 'what-are-managed-disks', title: 'What are Managed Disks?' },
              { id: 'disk-roles', title: 'Disk Roles (OS/Data/Temp)' },
            ],
          },
          {
            id: 'disk-types',
            title: 'Disk Types',
            children: [
              { id: 'ultra-disk', title: 'Ultra Disk' },
              { id: 'premium-ssd-v2', title: 'Premium SSD v2' },
              { id: 'premium-ssd', title: 'Premium SSD' },
              { id: 'standard-ssd', title: 'Standard SSD' },
              { id: 'standard-hdd', title: 'Standard HDD' },
            ],
          },
          {
            id: 'disk-management',
            title: 'Disk Management',
            children: [
              { id: 'disk-snapshots', title: 'Snapshots' },
              { id: 'managed-disk-encryption', title: 'Disk Encryption' },
              { id: 'shared-disks', title: 'Shared Disks' },
              { id: 'disk-bursting', title: 'Disk Bursting' },
              { id: 'disk-resizing', title: 'Disk Resizing' },
            ],
          },
        ],
      },
      {
        id: 'data-lake-storage',
        title: 'Data Lake Storage Gen2',
        summary: 'Hierarchical namespace big-data storage on blobs.',
        level: 'advanced',
        children: [
          {
            id: 'adls-fundamentals',
            title: 'ADLS Fundamentals',
            children: [
              { id: 'what-is-data-lake-gen2', title: 'What is Data Lake Storage Gen2?' },
              { id: 'hierarchical-namespace', title: 'Hierarchical Namespace' },
              { id: 'blob-vs-adls', title: 'Blob vs ADLS Gen2' },
            ],
          },
          {
            id: 'adls-features',
            title: 'ADLS Features',
            children: [
              { id: 'posix-acls', title: 'POSIX ACLs' },
              { id: 'directories-and-files', title: 'Directories & Files' },
              { id: 'adls-performance', title: 'Performance' },
            ],
          },
          {
            id: 'adls-integration',
            title: 'Analytics Integration',
            children: [
              { id: 'synapse-integration', title: 'Synapse Integration' },
              { id: 'databricks-integration', title: 'Databricks Integration' },
              { id: 'hdfs-compatibility', title: 'HDFS Compatibility' },
            ],
          },
        ],
      },
      {
        id: 'data-transfer',
        title: 'Data Transfer & Migration',
        summary: 'AzCopy, Storage Mover, Data Box and import/export.',
        level: 'intermediate',
        children: [
          {
            id: 'online-data-transfer',
            title: 'Online Transfer',
            children: [
              { id: 'azcopy', title: 'AzCopy' },
              { id: 'storage-explorer', title: 'Storage Explorer' },
              { id: 'azure-storage-mover', title: 'Azure Storage Mover' },
              { id: 'data-factory-copy', title: 'Data Factory Copy' },
            ],
          },
          {
            id: 'offline-data-transfer',
            title: 'Offline Transfer',
            children: [
              { id: 'data-box', title: 'Azure Data Box' },
              { id: 'data-box-disk', title: 'Data Box Disk' },
              { id: 'data-box-heavy', title: 'Data Box Heavy' },
              { id: 'import-export-service', title: 'Import/Export Service' },
            ],
          },
          {
            id: 'transfer-optimization',
            title: 'Transfer Optimization',
            children: [
              { id: 'parallelism-and-throughput', title: 'Parallelism & Throughput' },
              { id: 'large-dataset-strategies', title: 'Large Dataset Strategies' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'networking',
    roots: [
      {
        id: 'virtual-networks',
        title: 'Azure Virtual Network (VNet)',
        summary: 'Subnets, peering, routing and IP addressing.',
        level: 'beginner',
        children: [
          {
            id: 'vnet-fundamentals',
            title: 'VNet Fundamentals',
            children: [
              { id: 'what-is-a-vnet', title: 'What is a Virtual Network?' },
              { id: 'address-space-cidr', title: 'Address Space & CIDR' },
              { id: 'subnets', title: 'Subnets' },
              { id: 'creating-a-vnet', title: 'Creating a VNet' },
            ],
          },
          {
            id: 'ip-addressing',
            title: 'IP Addressing',
            children: [
              { id: 'public-ip-addresses', title: 'Public IP Addresses' },
              { id: 'private-ip-addresses', title: 'Private IP Addresses' },
              { id: 'public-ip-prefixes', title: 'Public IP Prefixes' },
              { id: 'static-vs-dynamic-ip', title: 'Static vs Dynamic IPs' },
            ],
          },
          {
            id: 'vnet-connectivity',
            title: 'VNet Connectivity',
            children: [
              { id: 'vnet-peering', title: 'VNet Peering' },
              { id: 'global-vnet-peering', title: 'Global VNet Peering' },
              { id: 'service-chaining', title: 'Service Chaining' },
            ],
          },
          {
            id: 'vnet-routing',
            title: 'Routing',
            children: [
              { id: 'system-routes', title: 'System Routes' },
              { id: 'user-defined-routes', title: 'User-Defined Routes (UDR)' },
              { id: 'route-tables', title: 'Route Tables' },
              { id: 'bgp-routing', title: 'BGP Routing' },
              { id: 'route-server', title: 'Route Server' },
            ],
          },
          {
            id: 'vnet-services',
            title: 'VNet Services',
            children: [
              { id: 'nat-gateway', title: 'NAT Gateway' },
              { id: 'vnet-service-endpoints', title: 'Service Endpoints' },
              { id: 'vnet-integration', title: 'VNet Integration' },
            ],
          },
        ],
      },
      {
        id: 'network-security',
        title: 'Network Security',
        summary: 'NSGs, ASGs, Azure Firewall and Bastion.',
        level: 'intermediate',
        children: [
          {
            id: 'network-security-groups',
            title: 'Network Security Groups',
            children: [
              { id: 'nsg-rules', title: 'NSG Rules' },
              { id: 'nsg-default-rules', title: 'Default Rules' },
              { id: 'service-tags', title: 'Service Tags' },
              { id: 'application-security-groups', title: 'Application Security Groups' },
              { id: 'effective-security-rules', title: 'Effective Security Rules' },
            ],
          },
          {
            id: 'azure-firewall',
            title: 'Azure Firewall',
            children: [
              { id: 'firewall-overview', title: 'Firewall Overview' },
              { id: 'firewall-policies', title: 'Firewall Policies' },
              { id: 'application-rules', title: 'Application Rules' },
              { id: 'network-rules', title: 'Network Rules' },
              { id: 'dnat-rules', title: 'DNAT Rules' },
              { id: 'firewall-manager', title: 'Firewall Manager' },
              { id: 'firewall-premium', title: 'Firewall Premium' },
            ],
          },
          {
            id: 'azure-bastion',
            title: 'Azure Bastion',
            children: [
              { id: 'bastion-overview', title: 'Bastion Overview' },
              { id: 'bastion-tiers', title: 'Bastion Tiers' },
              { id: 'native-client-support', title: 'Native Client Support' },
            ],
          },
          {
            id: 'web-application-firewall',
            title: 'Web Application Firewall',
            children: [
              { id: 'waf-overview', title: 'WAF Overview' },
              { id: 'waf-on-app-gateway', title: 'WAF on Application Gateway' },
              { id: 'waf-on-front-door', title: 'WAF on Front Door' },
              { id: 'owasp-rule-sets', title: 'OWASP Rule Sets' },
              { id: 'bot-protection', title: 'Bot Protection' },
            ],
          },
        ],
      },
      {
        id: 'load-balancing',
        title: 'Load Balancing & Delivery',
        summary: 'Load Balancer, Application Gateway, Front Door, Traffic Manager.',
        level: 'intermediate',
        children: [
          {
            id: 'azure-load-balancer',
            title: 'Azure Load Balancer',
            children: [
              { id: 'load-balancer-overview', title: 'Load Balancer Overview' },
              { id: 'public-vs-internal-lb', title: 'Public vs Internal' },
              { id: 'load-balancer-skus', title: 'SKUs' },
              { id: 'backend-pools', title: 'Backend Pools' },
              { id: 'health-probes', title: 'Health Probes' },
              { id: 'load-balancing-rules', title: 'Load Balancing Rules' },
            ],
          },
          {
            id: 'application-gateway',
            title: 'Application Gateway',
            children: [
              { id: 'app-gateway-overview', title: 'Overview' },
              { id: 'layer-7-routing', title: 'Layer-7 Routing' },
              { id: 'listeners-and-rules', title: 'Listeners & Rules' },
              { id: 'ssl-termination', title: 'SSL Termination' },
              { id: 'app-gateway-autoscaling', title: 'Autoscaling' },
            ],
          },
          {
            id: 'azure-front-door',
            title: 'Azure Front Door',
            children: [
              { id: 'front-door-overview', title: 'Overview' },
              { id: 'global-load-balancing', title: 'Global Load Balancing' },
              { id: 'front-door-caching', title: 'CDN & Caching' },
              { id: 'front-door-routing-rules', title: 'Routing Rules' },
              { id: 'front-door-waf', title: 'WAF Integration' },
            ],
          },
          {
            id: 'traffic-manager',
            title: 'Traffic Manager',
            children: [
              { id: 'traffic-manager-overview', title: 'Overview' },
              { id: 'traffic-routing-methods', title: 'Routing Methods' },
              { id: 'endpoint-monitoring', title: 'Endpoint Monitoring' },
            ],
          },
          {
            id: 'choosing-load-balancing',
            title: 'Choosing a Load Balancer',
            children: [
              { id: 'global-vs-regional', title: 'Global vs Regional' },
              { id: 'http-vs-non-http', title: 'HTTP vs Non-HTTP' },
              { id: 'load-balancing-decision-guide', title: 'Decision Guide' },
            ],
          },
        ],
      },
      {
        id: 'hybrid-connectivity',
        title: 'Hybrid Connectivity',
        summary: 'VPN Gateway, ExpressRoute and Virtual WAN.',
        level: 'advanced',
        children: [
          {
            id: 'vpn-gateway',
            title: 'VPN Gateway',
            children: [
              { id: 'vpn-gateway-overview', title: 'Overview' },
              { id: 'site-to-site-vpn', title: 'Site-to-Site VPN' },
              { id: 'point-to-site-vpn', title: 'Point-to-Site VPN' },
              { id: 'vpn-gateway-skus', title: 'Gateway SKUs' },
              { id: 'active-active-vpn', title: 'Active-Active Gateways' },
            ],
          },
          {
            id: 'expressroute',
            title: 'ExpressRoute',
            children: [
              { id: 'expressroute-overview', title: 'Overview' },
              { id: 'expressroute-circuits', title: 'Circuits' },
              { id: 'expressroute-peering', title: 'Peering Types' },
              { id: 'expressroute-direct', title: 'ExpressRoute Direct' },
              { id: 'global-reach', title: 'Global Reach' },
              { id: 'expressroute-fastpath', title: 'FastPath' },
            ],
          },
          {
            id: 'virtual-wan',
            title: 'Virtual WAN',
            children: [
              { id: 'virtual-wan-overview', title: 'Overview' },
              { id: 'virtual-hubs', title: 'Virtual Hubs' },
              { id: 'hub-routing', title: 'Hub Routing' },
              { id: 'secured-virtual-hub', title: 'Secured Virtual Hub' },
            ],
          },
        ],
      },
      {
        id: 'azure-dns',
        title: 'Azure DNS',
        summary: 'Public DNS, Private DNS and zone management.',
        level: 'intermediate',
        children: [
          {
            id: 'public-dns',
            title: 'Public DNS',
            children: [
              { id: 'dns-zones', title: 'DNS Zones' },
              { id: 'record-sets', title: 'Record Sets' },
              { id: 'dns-delegation', title: 'DNS Delegation' },
              { id: 'alias-records', title: 'Alias Records' },
            ],
          },
          {
            id: 'private-dns',
            title: 'Private DNS',
            children: [
              { id: 'private-dns-zones', title: 'Private DNS Zones' },
              { id: 'virtual-network-links', title: 'Virtual Network Links' },
              { id: 'dns-autoregistration', title: 'Autoregistration' },
              { id: 'dns-private-resolver', title: 'DNS Private Resolver' },
            ],
          },
          {
            id: 'dns-management',
            title: 'DNS Management',
            children: [
              { id: 'app-service-domains', title: 'Domain Registration (App Service Domains)' },
              { id: 'dnssec', title: 'DNSSEC' },
            ],
          },
        ],
      },
      {
        id: 'private-connectivity',
        title: 'Private Connectivity',
        summary: 'Private Link, private endpoints and service endpoints.',
        level: 'advanced',
        children: [
          {
            id: 'azure-private-link',
            title: 'Azure Private Link',
            children: [
              { id: 'private-link-overview', title: 'Overview' },
              { id: 'private-endpoints', title: 'Private Endpoints' },
              { id: 'private-link-service', title: 'Private Link Service' },
              { id: 'dns-for-private-endpoints', title: 'DNS for Private Endpoints' },
            ],
          },
          {
            id: 'service-endpoints',
            title: 'Service Endpoints',
            children: [
              { id: 'service-endpoints-overview', title: 'Overview' },
              { id: 'service-endpoint-policies', title: 'Service Endpoint Policies' },
              { id: 'endpoints-vs-private-link', title: 'Endpoints vs Private Link' },
            ],
          },
          {
            id: 'connectivity-design',
            title: 'Connectivity Design',
            children: [
              { id: 'hub-spoke-topology', title: 'Hub-Spoke Topology' },
              { id: 'secure-connectivity-patterns', title: 'Secure Connectivity Patterns' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'databases',
    roots: [
      {
        id: 'azure-sql',
        title: 'Azure SQL',
        summary: 'Azure SQL Database, Managed Instance and SQL on VMs.',
        level: 'beginner',
        children: [
          {
            id: 'azure-sql-database',
            title: 'Azure SQL Database',
            children: [
              { id: 'what-is-azure-sql-database', title: 'What is Azure SQL Database?' },
              { id: 'single-database', title: 'Single Database' },
              { id: 'elastic-pools', title: 'Elastic Pools' },
              { id: 'purchasing-models', title: 'Purchasing Models (DTU vs vCore)' },
              { id: 'service-tiers', title: 'Service Tiers' },
              { id: 'serverless-tier', title: 'Serverless Tier' },
              { id: 'hyperscale', title: 'Hyperscale' },
            ],
          },
          {
            id: 'sql-managed-instance',
            title: 'SQL Managed Instance',
            level: 'intermediate',
            children: [
              { id: 'managed-instance-overview', title: 'Overview' },
              { id: 'mi-vs-sql-database', title: 'MI vs SQL Database' },
              { id: 'instance-pools', title: 'Instance Pools' },
              { id: 'mi-link-feature', title: 'Link Feature' },
            ],
          },
          {
            id: 'sql-on-vms',
            title: 'SQL Server on VMs',
            children: [
              { id: 'sql-vm-overview', title: 'Overview' },
              { id: 'sql-iaas-agent-extension', title: 'SQL IaaS Agent Extension' },
              { id: 'automated-backup-patching', title: 'Automated Backup & Patching' },
            ],
          },
          {
            id: 'sql-high-availability',
            title: 'High Availability & DR',
            level: 'advanced',
            children: [
              { id: 'active-geo-replication', title: 'Active Geo-Replication' },
              { id: 'failover-groups', title: 'Failover Groups' },
              { id: 'zone-redundancy-sql', title: 'Zone Redundancy' },
              { id: 'sql-read-replicas', title: 'Read Scale-Out Replicas' },
            ],
          },
          {
            id: 'sql-security',
            title: 'Security',
            level: 'intermediate',
            children: [
              { id: 'sql-authentication', title: 'Authentication' },
              { id: 'entra-authentication-sql', title: 'Entra ID Authentication' },
              { id: 'transparent-data-encryption', title: 'Transparent Data Encryption' },
              { id: 'always-encrypted', title: 'Always Encrypted' },
              { id: 'dynamic-data-masking', title: 'Dynamic Data Masking' },
              { id: 'sql-auditing', title: 'Auditing' },
              { id: 'sql-threat-protection', title: 'Advanced Threat Protection' },
            ],
          },
          {
            id: 'sql-performance',
            title: 'Performance',
            level: 'advanced',
            children: [
              { id: 'automatic-tuning', title: 'Automatic Tuning' },
              { id: 'query-performance-insight', title: 'Query Performance Insight' },
              { id: 'intelligent-query-processing', title: 'Intelligent Query Processing' },
              { id: 'scaling-sql', title: 'Scaling' },
            ],
          },
        ],
      },
      {
        id: 'cosmos-db',
        title: 'Azure Cosmos DB',
        summary: 'Globally distributed multi-model NoSQL database.',
        level: 'intermediate',
        children: [
          {
            id: 'cosmos-fundamentals',
            title: 'Cosmos DB Fundamentals',
            children: [
              { id: 'what-is-cosmos-db', title: 'What is Cosmos DB?' },
              { id: 'cosmos-resource-model', title: 'Resource Model' },
              { id: 'request-units', title: 'Request Units (RU)' },
              { id: 'partitioning', title: 'Partitioning' },
              { id: 'global-distribution', title: 'Global Distribution' },
            ],
          },
          {
            id: 'cosmos-apis',
            title: 'Cosmos DB APIs',
            children: [
              { id: 'nosql-api', title: 'NoSQL API' },
              { id: 'mongodb-api', title: 'MongoDB API' },
              { id: 'cassandra-api', title: 'Cassandra API' },
              { id: 'gremlin-api', title: 'Gremlin (Graph) API' },
              { id: 'cosmos-table-api', title: 'Table API' },
              { id: 'cosmos-postgresql', title: 'PostgreSQL API' },
            ],
          },
          {
            id: 'consistency-levels',
            title: 'Consistency Levels',
            children: [
              { id: 'strong-consistency', title: 'Strong' },
              { id: 'bounded-staleness', title: 'Bounded Staleness' },
              { id: 'session-consistency', title: 'Session' },
              { id: 'consistent-prefix', title: 'Consistent Prefix' },
              { id: 'eventual-consistency', title: 'Eventual' },
            ],
          },
          {
            id: 'cosmos-throughput',
            title: 'Throughput',
            children: [
              { id: 'provisioned-throughput', title: 'Provisioned Throughput' },
              { id: 'autoscale-throughput', title: 'Autoscale' },
              { id: 'serverless-cosmos', title: 'Serverless' },
              { id: 'shared-vs-dedicated-throughput', title: 'Shared vs Dedicated' },
            ],
          },
          {
            id: 'cosmos-features',
            title: 'Features',
            children: [
              { id: 'change-feed-cosmos', title: 'Change Feed' },
              { id: 'cosmos-ttl', title: 'Time to Live (TTL)' },
              { id: 'indexing-policies', title: 'Indexing Policies' },
              { id: 'stored-procedures-triggers', title: 'Stored Procedures & Triggers' },
              { id: 'cosmos-vector-search', title: 'Vector Search' },
            ],
          },
          {
            id: 'cosmos-ha-dr',
            title: 'High Availability & DR',
            level: 'advanced',
            children: [
              { id: 'multi-region-writes', title: 'Multi-Region Writes' },
              { id: 'cosmos-automatic-failover', title: 'Automatic Failover' },
              { id: 'cosmos-backup-restore', title: 'Backup & Restore' },
            ],
          },
        ],
      },
      {
        id: 'open-source-databases',
        title: 'Open-Source Databases',
        summary: 'Azure Database for PostgreSQL and MySQL.',
        level: 'intermediate',
        children: [
          {
            id: 'postgresql-flexible-server',
            title: 'Azure Database for PostgreSQL',
            children: [
              { id: 'postgres-flexible-overview', title: 'Flexible Server Overview' },
              { id: 'postgres-compute-storage', title: 'Compute & Storage Tiers' },
              { id: 'postgres-high-availability', title: 'High Availability' },
              { id: 'postgres-read-replicas', title: 'Read Replicas' },
              { id: 'postgres-extensions', title: 'Extensions' },
              { id: 'postgres-elastic-clusters', title: 'Elastic Clusters' },
            ],
          },
          {
            id: 'mysql-flexible-server',
            title: 'Azure Database for MySQL',
            children: [
              { id: 'mysql-flexible-overview', title: 'Flexible Server Overview' },
              { id: 'mysql-service-tiers', title: 'Service Tiers' },
              { id: 'mysql-high-availability', title: 'High Availability' },
              { id: 'mysql-read-replicas', title: 'Read Replicas' },
            ],
          },
          {
            id: 'oss-db-security',
            title: 'Security & Networking',
            children: [
              { id: 'oss-networking', title: 'Networking' },
              { id: 'oss-authentication', title: 'Authentication' },
              { id: 'oss-encryption', title: 'Encryption' },
            ],
          },
        ],
      },
      {
        id: 'azure-cache-redis',
        title: 'Azure Cache for Redis',
        summary: 'Managed in-memory caching and data store.',
        level: 'intermediate',
        children: [
          {
            id: 'redis-fundamentals',
            title: 'Redis Fundamentals',
            children: [
              { id: 'what-is-azure-cache-redis', title: 'What is Azure Cache for Redis?' },
              { id: 'redis-cache-tiers', title: 'Cache Tiers' },
              { id: 'redis-data-types', title: 'Data Types' },
              { id: 'azure-managed-redis', title: 'Azure Managed Redis' },
            ],
          },
          {
            id: 'redis-features',
            title: 'Redis Features',
            children: [
              { id: 'redis-clustering', title: 'Clustering' },
              { id: 'redis-persistence', title: 'Persistence' },
              { id: 'redis-geo-replication', title: 'Geo-Replication' },
              { id: 'redis-modules', title: 'Redis Modules' },
            ],
          },
          {
            id: 'redis-patterns',
            title: 'Caching Patterns',
            children: [
              { id: 'cache-aside', title: 'Cache-Aside' },
              { id: 'session-store', title: 'Session Store' },
              { id: 'pub-sub-redis', title: 'Pub/Sub' },
            ],
          },
        ],
      },
      {
        id: 'other-data-services',
        title: 'Other Data Services',
        summary: 'Managed Instance for Apache Cassandra and more.',
        level: 'advanced',
        children: [
          {
            id: 'managed-instance-cassandra',
            title: 'Managed Instance for Apache Cassandra',
            children: [
              { id: 'cassandra-mi-overview', title: 'Overview' },
              { id: 'cassandra-hybrid-clusters', title: 'Hybrid Clusters' },
            ],
          },
          {
            id: 'database-migration',
            title: 'Database Migration',
            children: [
              { id: 'database-migration-service', title: 'Database Migration Service' },
              { id: 'data-migration-assistant', title: 'Data Migration Assistant' },
            ],
          },
          {
            id: 'data-api-builder',
            title: 'Data API Builder',
            children: [
              { id: 'data-api-builder-overview', title: 'Overview' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'app-integration',
    roots: [
      {
        id: 'api-management',
        title: 'Azure API Management',
        summary: 'Publishing, securing and governing APIs.',
        level: 'intermediate',
        children: [
          {
            id: 'apim-fundamentals',
            title: 'APIM Fundamentals',
            children: [
              { id: 'what-is-apim', title: 'What is API Management?' },
              { id: 'apim-tiers', title: 'Tiers (incl. v2)' },
              { id: 'apis-and-operations', title: 'APIs & Operations' },
              { id: 'apim-products', title: 'Products' },
              { id: 'apim-gateway', title: 'API Gateway' },
            ],
          },
          {
            id: 'apim-policies',
            title: 'Policies',
            children: [
              { id: 'policy-overview', title: 'Policy Overview' },
              { id: 'inbound-outbound-policies', title: 'Inbound & Outbound Policies' },
              { id: 'rate-limiting-throttling', title: 'Rate Limiting & Throttling' },
              { id: 'transformation-policies', title: 'Transformation Policies' },
              { id: 'caching-policies', title: 'Caching Policies' },
              { id: 'authentication-policies', title: 'Authentication Policies' },
            ],
          },
          {
            id: 'apim-security',
            title: 'Security',
            children: [
              { id: 'subscription-keys', title: 'Subscription Keys' },
              { id: 'oauth-jwt-validation', title: 'OAuth & JWT Validation' },
              { id: 'apim-client-certificates', title: 'Client Certificates' },
              { id: 'managed-identity-apim', title: 'Managed Identity' },
              { id: 'apim-networking', title: 'Networking' },
            ],
          },
          {
            id: 'apim-developer-experience',
            title: 'Developer Experience',
            children: [
              { id: 'developer-portal', title: 'Developer Portal' },
              { id: 'api-versioning', title: 'API Versioning' },
              { id: 'api-revisions', title: 'API Revisions' },
              { id: 'api-documentation', title: 'API Documentation' },
            ],
          },
          {
            id: 'apim-advanced',
            title: 'Advanced',
            level: 'advanced',
            children: [
              { id: 'self-hosted-gateway', title: 'Self-Hosted Gateway' },
              { id: 'apim-workspaces', title: 'Workspaces' },
              { id: 'apim-genai-gateway', title: 'GenAI Gateway Capabilities' },
            ],
          },
        ],
      },
      {
        id: 'service-bus',
        title: 'Azure Service Bus',
        summary: 'Enterprise messaging with queues and topics.',
        level: 'intermediate',
        children: [
          {
            id: 'service-bus-fundamentals',
            title: 'Service Bus Fundamentals',
            children: [
              { id: 'what-is-service-bus', title: 'What is Service Bus?' },
              { id: 'service-bus-namespaces', title: 'Namespaces' },
              { id: 'service-bus-tiers', title: 'Tiers' },
            ],
          },
          {
            id: 'queues-and-topics',
            title: 'Queues & Topics',
            children: [
              { id: 'service-bus-queues', title: 'Queues' },
              { id: 'topics-and-subscriptions', title: 'Topics & Subscriptions' },
              { id: 'subscription-filters', title: 'Subscription Filters' },
            ],
          },
          {
            id: 'service-bus-messaging-features',
            title: 'Messaging Features',
            children: [
              { id: 'sessions', title: 'Sessions' },
              { id: 'dead-letter-queue', title: 'Dead-Letter Queue' },
              { id: 'scheduled-messages', title: 'Scheduled Messages' },
              { id: 'message-deferral', title: 'Message Deferral' },
              { id: 'duplicate-detection', title: 'Duplicate Detection' },
              { id: 'service-bus-transactions', title: 'Transactions' },
            ],
          },
          {
            id: 'service-bus-patterns',
            title: 'Messaging Patterns',
            children: [
              { id: 'competing-consumers', title: 'Competing Consumers' },
              { id: 'request-reply', title: 'Request-Reply' },
              { id: 'service-bus-vs-queue-storage', title: 'Service Bus vs Queue Storage' },
            ],
          },
        ],
      },
      {
        id: 'event-grid',
        title: 'Azure Event Grid',
        summary: 'Reactive event routing and pub/sub.',
        level: 'intermediate',
        children: [
          {
            id: 'event-grid-fundamentals',
            title: 'Event Grid Fundamentals',
            children: [
              { id: 'what-is-event-grid', title: 'What is Event Grid?' },
              { id: 'events-and-schemas', title: 'Events & Schemas' },
              { id: 'event-sources', title: 'Event Sources' },
              { id: 'event-handlers', title: 'Event Handlers' },
            ],
          },
          {
            id: 'event-grid-concepts',
            title: 'Concepts',
            children: [
              { id: 'system-topics', title: 'System Topics' },
              { id: 'custom-topics', title: 'Custom Topics' },
              { id: 'partner-topics', title: 'Partner Topics' },
              { id: 'event-subscriptions', title: 'Event Subscriptions' },
              { id: 'event-filtering', title: 'Event Filtering' },
            ],
          },
          {
            id: 'event-grid-features',
            title: 'Features',
            children: [
              { id: 'mqtt-messaging', title: 'MQTT Messaging' },
              { id: 'namespace-topics', title: 'Namespace Topics' },
              { id: 'event-grid-dead-lettering', title: 'Dead-Lettering' },
              { id: 'event-grid-retry-policies', title: 'Retry Policies' },
              { id: 'cloudevents-schema', title: 'CloudEvents Schema' },
            ],
          },
        ],
      },
      {
        id: 'event-hubs',
        title: 'Azure Event Hubs',
        summary: 'Big-data streaming and event ingestion.',
        level: 'intermediate',
        children: [
          {
            id: 'event-hubs-fundamentals',
            title: 'Event Hubs Fundamentals',
            children: [
              { id: 'what-is-event-hubs', title: 'What is Event Hubs?' },
              { id: 'event-hubs-namespaces', title: 'Namespaces' },
              { id: 'partitions', title: 'Partitions' },
              { id: 'throughput-units', title: 'Throughput & Processing Units' },
            ],
          },
          {
            id: 'event-hubs-concepts',
            title: 'Concepts',
            children: [
              { id: 'event-producers', title: 'Producers' },
              { id: 'consumer-groups', title: 'Consumers & Consumer Groups' },
              { id: 'checkpointing', title: 'Checkpointing' },
              { id: 'event-hubs-capture', title: 'Capture' },
            ],
          },
          {
            id: 'event-hubs-features',
            title: 'Features',
            children: [
              { id: 'kafka-on-event-hubs', title: 'Kafka on Event Hubs' },
              { id: 'schema-registry', title: 'Schema Registry' },
              { id: 'dedicated-clusters', title: 'Dedicated Clusters' },
              { id: 'event-hubs-geo-dr', title: 'Geo-Disaster Recovery' },
            ],
          },
        ],
      },
      {
        id: 'logic-apps',
        title: 'Azure Logic Apps',
        summary: 'Low-code workflow automation and integration.',
        level: 'beginner',
        children: [
          {
            id: 'logic-apps-fundamentals',
            title: 'Logic Apps Fundamentals',
            children: [
              { id: 'what-are-logic-apps', title: 'What are Logic Apps?' },
              { id: 'consumption-vs-standard', title: 'Consumption vs Standard' },
              { id: 'workflows', title: 'Workflows' },
              { id: 'triggers-and-actions', title: 'Triggers & Actions' },
            ],
          },
          {
            id: 'logic-apps-connectors',
            title: 'Connectors',
            children: [
              { id: 'built-in-connectors', title: 'Built-In Connectors' },
              { id: 'managed-connectors', title: 'Managed Connectors' },
              { id: 'custom-connectors', title: 'Custom Connectors' },
              { id: 'on-premises-data-gateway', title: 'On-Premises Data Gateway' },
            ],
          },
          {
            id: 'logic-apps-features',
            title: 'Features',
            level: 'intermediate',
            children: [
              { id: 'control-flow', title: 'Control Flow' },
              { id: 'expressions-and-functions', title: 'Expressions & Functions' },
              { id: 'integration-account', title: 'Integration Account' },
              { id: 'b2b-edi', title: 'B2B & EDI' },
            ],
          },
          {
            id: 'logic-apps-operations',
            title: 'Operations',
            children: [
              { id: 'monitoring-logic-apps', title: 'Monitoring' },
              { id: 'error-handling-retry', title: 'Error Handling & Retry' },
              { id: 'logic-apps-networking', title: 'Networking' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'security',
    roots: [
      {
        id: 'defender-for-cloud',
        title: 'Microsoft Defender for Cloud',
        summary: 'Posture management and workload protection.',
        level: 'intermediate',
        children: [
          {
            id: 'defender-fundamentals',
            title: 'Defender Fundamentals',
            children: [
              { id: 'what-is-defender-for-cloud', title: 'What is Defender for Cloud?' },
              { id: 'secure-score', title: 'Secure Score' },
              { id: 'security-recommendations', title: 'Security Recommendations' },
              { id: 'foundational-cspm', title: 'Foundational CSPM (Free)' },
            ],
          },
          {
            id: 'cloud-security-posture-management',
            title: 'Cloud Security Posture Management',
            children: [
              { id: 'defender-cspm-plan', title: 'Defender CSPM Plan' },
              { id: 'attack-path-analysis', title: 'Attack Path Analysis' },
              { id: 'cloud-security-explorer', title: 'Cloud Security Explorer' },
              { id: 'regulatory-compliance', title: 'Regulatory Compliance' },
              { id: 'governance-rules', title: 'Governance Rules' },
            ],
          },
          {
            id: 'workload-protection',
            title: 'Workload Protection',
            children: [
              { id: 'defender-for-servers', title: 'Defender for Servers' },
              { id: 'defender-for-containers', title: 'Defender for Containers' },
              { id: 'defender-for-storage', title: 'Defender for Storage' },
              { id: 'defender-for-databases', title: 'Defender for Databases' },
              { id: 'defender-for-app-service', title: 'Defender for App Service' },
              { id: 'defender-for-key-vault', title: 'Defender for Key Vault' },
              { id: 'defender-for-apis', title: 'Defender for APIs' },
            ],
          },
          {
            id: 'multicloud-and-devops-security',
            title: 'Multicloud & DevOps Security',
            level: 'advanced',
            children: [
              { id: 'aws-gcp-connectors', title: 'AWS & GCP Connectors' },
              { id: 'devops-security', title: 'DevOps Security' },
              { id: 'external-attack-surface-management', title: 'External Attack Surface Management' },
            ],
          },
        ],
      },
      {
        id: 'key-vault',
        title: 'Azure Key Vault',
        summary: 'Secrets, keys and certificate management.',
        level: 'beginner',
        children: [
          {
            id: 'key-vault-fundamentals',
            title: 'Key Vault Fundamentals',
            children: [
              { id: 'what-is-key-vault', title: 'What is Key Vault?' },
              { id: 'vaults-vs-managed-hsm', title: 'Vaults vs Managed HSM' },
              { id: 'key-vault-tiers', title: 'Tiers (Standard/Premium)' },
            ],
          },
          {
            id: 'key-vault-objects',
            title: 'Key Vault Objects',
            children: [
              { id: 'secrets', title: 'Secrets' },
              { id: 'keys', title: 'Keys' },
              { id: 'certificates', title: 'Certificates' },
            ],
          },
          {
            id: 'key-vault-access',
            title: 'Access Control',
            children: [
              { id: 'rbac-vs-access-policies', title: 'RBAC vs Access Policies' },
              { id: 'managed-identity-access', title: 'Managed Identity Access' },
              { id: 'key-vault-networking', title: 'Networking & Private Endpoints' },
            ],
          },
          {
            id: 'key-vault-operations',
            title: 'Operations',
            children: [
              { id: 'soft-delete-purge-protection', title: 'Soft Delete & Purge Protection' },
              { id: 'key-rotation', title: 'Key Rotation' },
              { id: 'backup-restore-keyvault', title: 'Backup & Restore' },
              { id: 'key-vault-monitoring', title: 'Monitoring' },
            ],
          },
        ],
      },
      {
        id: 'microsoft-sentinel',
        title: 'Microsoft Sentinel',
        summary: 'Cloud-native SIEM and SOAR.',
        level: 'advanced',
        children: [
          {
            id: 'sentinel-fundamentals',
            title: 'Sentinel Fundamentals',
            children: [
              { id: 'what-is-sentinel', title: 'What is Microsoft Sentinel?' },
              { id: 'sentinel-workspace', title: 'Workspace Setup' },
              { id: 'siem-vs-soar', title: 'SIEM vs SOAR' },
            ],
          },
          {
            id: 'data-collection',
            title: 'Data Collection',
            children: [
              { id: 'data-connectors', title: 'Data Connectors' },
              { id: 'content-hub', title: 'Content Hub' },
              { id: 'normalization-asim', title: 'Normalization (ASIM)' },
            ],
          },
          {
            id: 'threat-detection',
            title: 'Threat Detection',
            children: [
              { id: 'analytics-rules', title: 'Analytics Rules' },
              { id: 'incidents', title: 'Incidents' },
              { id: 'ueba', title: 'User & Entity Behavior Analytics' },
              { id: 'threat-intelligence', title: 'Threat Intelligence' },
              { id: 'hunting', title: 'Hunting' },
            ],
          },
          {
            id: 'response-automation',
            title: 'Response & Automation',
            children: [
              { id: 'playbooks', title: 'Playbooks' },
              { id: 'automation-rules', title: 'Automation Rules' },
              { id: 'soar-workflows', title: 'SOAR Workflows' },
            ],
          },
          {
            id: 'sentinel-platform',
            title: 'Unified SecOps Platform',
            children: [
              { id: 'defender-portal-integration', title: 'Defender Portal Integration' },
              { id: 'sentinel-data-lake', title: 'Sentinel Data Lake' },
              { id: 'security-copilot', title: 'Security Copilot' },
            ],
          },
        ],
      },
      {
        id: 'encryption-data-protection',
        title: 'Encryption & Data Protection',
        summary: 'Encryption at rest/in transit and key management.',
        level: 'intermediate',
        children: [
          {
            id: 'encryption-at-rest',
            title: 'Encryption at Rest',
            children: [
              { id: 'platform-managed-keys', title: 'Platform-Managed Keys' },
              { id: 'customer-managed-keys', title: 'Customer-Managed Keys' },
              { id: 'double-encryption', title: 'Double Encryption' },
              { id: 'confidential-computing-encryption', title: 'Confidential Computing' },
            ],
          },
          {
            id: 'encryption-in-transit',
            title: 'Encryption in Transit',
            children: [
              { id: 'tls-everywhere', title: 'TLS Everywhere' },
              { id: 'certificate-management', title: 'Certificate Management' },
            ],
          },
          {
            id: 'key-management',
            title: 'Key Management',
            children: [
              { id: 'managed-hsm', title: 'Managed HSM' },
              { id: 'bring-your-own-key', title: 'Bring Your Own Key (BYOK)' },
              { id: 'key-lifecycle', title: 'Key Lifecycle' },
            ],
          },
        ],
      },
      {
        id: 'microsoft-purview',
        title: 'Microsoft Purview',
        summary: 'Data governance, catalog and compliance.',
        level: 'advanced',
        children: [
          {
            id: 'purview-data-governance',
            title: 'Data Governance',
            children: [
              { id: 'unified-catalog', title: 'Unified Catalog' },
              { id: 'data-map', title: 'Data Map' },
              { id: 'data-discovery-scanning', title: 'Data Discovery & Scanning' },
              { id: 'data-lineage', title: 'Data Lineage' },
            ],
          },
          {
            id: 'purview-data-security',
            title: 'Data Security',
            children: [
              { id: 'information-protection', title: 'Information Protection' },
              { id: 'sensitivity-labels', title: 'Sensitivity Labels' },
              { id: 'data-loss-prevention', title: 'Data Loss Prevention' },
              { id: 'insider-risk-management', title: 'Insider Risk Management' },
            ],
          },
          {
            id: 'purview-compliance',
            title: 'Compliance',
            children: [
              { id: 'compliance-manager', title: 'Compliance Manager' },
              { id: 'audit', title: 'Audit' },
              { id: 'ediscovery', title: 'eDiscovery' },
              { id: 'data-lifecycle-management', title: 'Data Lifecycle Management' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'monitoring',
    roots: [
      {
        id: 'azure-monitor',
        title: 'Azure Monitor',
        summary: 'Metrics, logs, alerts and the monitoring platform.',
        level: 'beginner',
        children: [
          {
            id: 'monitor-fundamentals',
            title: 'Monitor Fundamentals',
            children: [
              { id: 'what-is-azure-monitor', title: 'What is Azure Monitor?' },
              { id: 'data-sources', title: 'Data Sources' },
              { id: 'metrics-vs-logs', title: 'Metrics vs Logs' },
              { id: 'monitoring-data-platform', title: 'Monitoring Data Platform' },
            ],
          },
          {
            id: 'metrics',
            title: 'Metrics',
            children: [
              { id: 'platform-metrics', title: 'Platform Metrics' },
              { id: 'custom-metrics', title: 'Custom Metrics' },
              { id: 'metrics-explorer', title: 'Metrics Explorer' },
              { id: 'metric-alerts', title: 'Metric Alerts' },
            ],
          },
          {
            id: 'data-collection-monitor',
            title: 'Data Collection',
            children: [
              { id: 'data-collection-rules', title: 'Data Collection Rules' },
              { id: 'azure-monitor-agent', title: 'Azure Monitor Agent' },
              { id: 'diagnostic-settings', title: 'Diagnostic Settings' },
            ],
          },
          {
            id: 'alerts-and-actions',
            title: 'Alerts & Actions',
            children: [
              { id: 'alert-rules', title: 'Alert Rules' },
              { id: 'action-groups', title: 'Action Groups' },
              { id: 'alert-processing-rules', title: 'Alert Processing Rules' },
              { id: 'log-alerts', title: 'Log Alerts' },
            ],
          },
          {
            id: 'visualization',
            title: 'Visualization',
            children: [
              { id: 'workbooks', title: 'Workbooks' },
              { id: 'azure-dashboards', title: 'Azure Dashboards' },
              { id: 'grafana-integration', title: 'Managed Grafana Integration' },
            ],
          },
          {
            id: 'insights',
            title: 'Insights',
            children: [
              { id: 'vm-insights', title: 'VM Insights' },
              { id: 'container-insights', title: 'Container Insights' },
              { id: 'network-insights', title: 'Network Insights' },
              { id: 'storage-insights', title: 'Storage Insights' },
            ],
          },
        ],
      },
      {
        id: 'log-analytics',
        title: 'Log Analytics & KQL',
        summary: 'Log Analytics workspaces and Kusto Query Language.',
        level: 'intermediate',
        children: [
          {
            id: 'log-analytics-workspaces',
            title: 'Log Analytics Workspaces',
            children: [
              { id: 'workspace-design', title: 'Workspace Design' },
              { id: 'tables-and-schemas', title: 'Tables & Schemas' },
              { id: 'data-retention-archive', title: 'Data Retention & Archive' },
              { id: 'log-data-plans', title: 'Table Plans (Analytics/Basic/Auxiliary)' },
            ],
          },
          {
            id: 'kql-basics',
            title: 'KQL Basics',
            children: [
              { id: 'kql-query-structure', title: 'Query Structure' },
              { id: 'filtering-projecting', title: 'Filtering & Projecting' },
              { id: 'aggregation-summarize', title: 'Aggregation & Summarize' },
              { id: 'time-operations', title: 'Time Operations' },
            ],
          },
          {
            id: 'kql-advanced',
            title: 'KQL Advanced',
            level: 'advanced',
            children: [
              { id: 'joins', title: 'Joins' },
              { id: 'parsing-data', title: 'Parsing Data' },
              { id: 'rendering-charts', title: 'Rendering Charts' },
              { id: 'functions-and-let', title: 'Functions & Let Statements' },
            ],
          },
          {
            id: 'cost-and-management',
            title: 'Cost & Management',
            children: [
              { id: 'workspace-cost-management', title: 'Cost Management' },
              { id: 'commitment-tiers', title: 'Commitment Tiers' },
              { id: 'workspace-rbac', title: 'Workspace RBAC' },
            ],
          },
        ],
      },
      {
        id: 'application-insights',
        title: 'Application Insights',
        summary: 'Application performance monitoring and telemetry.',
        level: 'intermediate',
        children: [
          {
            id: 'app-insights-fundamentals',
            title: 'App Insights Fundamentals',
            children: [
              { id: 'what-is-app-insights', title: 'What is Application Insights?' },
              { id: 'instrumentation', title: 'Instrumentation' },
              { id: 'auto-instrumentation', title: 'Auto-Instrumentation' },
              { id: 'opentelemetry', title: 'OpenTelemetry' },
            ],
          },
          {
            id: 'telemetry-types',
            title: 'Telemetry Types',
            children: [
              { id: 'requests-dependencies', title: 'Requests & Dependencies' },
              { id: 'exceptions-traces', title: 'Exceptions & Traces' },
              { id: 'custom-events-metrics', title: 'Custom Events & Metrics' },
              { id: 'live-metrics', title: 'Live Metrics' },
            ],
          },
          {
            id: 'analysis-tools',
            title: 'Analysis Tools',
            children: [
              { id: 'application-map', title: 'Application Map' },
              { id: 'transaction-search', title: 'Transaction Search' },
              { id: 'failures-performance', title: 'Failures & Performance' },
              { id: 'availability-tests', title: 'Availability Tests' },
              { id: 'smart-detection', title: 'Smart Detection' },
            ],
          },
        ],
      },
      {
        id: 'azure-automation',
        title: 'Azure Automation',
        summary: 'Runbooks, configuration and update management.',
        level: 'intermediate',
        children: [
          {
            id: 'automation-fundamentals',
            title: 'Automation Fundamentals',
            children: [
              { id: 'what-is-azure-automation', title: 'What is Azure Automation?' },
              { id: 'automation-accounts', title: 'Automation Accounts' },
              { id: 'shared-resources', title: 'Shared Resources' },
            ],
          },
          {
            id: 'runbooks',
            title: 'Runbooks',
            children: [
              { id: 'powershell-runbooks', title: 'PowerShell Runbooks' },
              { id: 'python-runbooks', title: 'Python Runbooks' },
              { id: 'webhooks-triggers', title: 'Webhooks & Triggers' },
              { id: 'hybrid-runbook-worker', title: 'Hybrid Runbook Worker' },
            ],
          },
          {
            id: 'configuration-management',
            title: 'Configuration & Updates',
            children: [
              { id: 'state-configuration-dsc', title: 'State Configuration (DSC)' },
              { id: 'machine-configuration', title: 'Machine Configuration' },
              { id: 'azure-update-manager', title: 'Azure Update Manager' },
              { id: 'change-tracking-inventory', title: 'Change Tracking & Inventory' },
            ],
          },
        ],
      },
      {
        id: 'service-health-advisor',
        title: 'Service Health & Advisor',
        summary: 'Platform health, advisories and recommendations.',
        level: 'beginner',
        children: [
          {
            id: 'azure-service-health',
            title: 'Azure Service Health',
            children: [
              { id: 'service-issues', title: 'Service Issues' },
              { id: 'planned-maintenance', title: 'Planned Maintenance' },
              { id: 'health-advisories', title: 'Health Advisories' },
              { id: 'resource-health', title: 'Resource Health' },
              { id: 'service-health-alerts', title: 'Service Health Alerts' },
            ],
          },
          {
            id: 'azure-advisor',
            title: 'Azure Advisor',
            children: [
              { id: 'advisor-reliability', title: 'Reliability Recommendations' },
              { id: 'advisor-security', title: 'Security Recommendations' },
              { id: 'advisor-performance', title: 'Performance Recommendations' },
              { id: 'advisor-cost', title: 'Cost Recommendations' },
              { id: 'advisor-operational-excellence', title: 'Operational Excellence' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'iac-devops',
    roots: [
      {
        id: 'arm-templates',
        title: 'ARM Templates',
        summary: 'Declarative JSON resource templates.',
        level: 'intermediate',
        children: [
          {
            id: 'arm-template-basics',
            title: 'Template Basics',
            children: [
              { id: 'template-structure', title: 'Template Structure' },
              { id: 'parameters', title: 'Parameters' },
              { id: 'variables', title: 'Variables' },
              { id: 'resources-section', title: 'Resources' },
              { id: 'outputs', title: 'Outputs' },
            ],
          },
          {
            id: 'arm-template-features',
            title: 'Template Features',
            children: [
              { id: 'template-functions', title: 'Template Functions' },
              { id: 'dependencies', title: 'Dependencies' },
              { id: 'nested-linked-templates', title: 'Nested & Linked Templates' },
              { id: 'conditions-loops', title: 'Conditions & Loops' },
              { id: 'template-specs', title: 'Template Specs' },
            ],
          },
          {
            id: 'arm-deployment-practices',
            title: 'Deployment Practices',
            children: [
              { id: 'deployment-scopes-arm', title: 'Deployment Scopes' },
              { id: 'what-if-arm', title: 'What-If' },
              { id: 'parameter-files', title: 'Parameter Files' },
            ],
          },
        ],
      },
      {
        id: 'bicep',
        title: 'Bicep',
        summary: 'Domain-specific language for Azure deployments.',
        level: 'intermediate',
        children: [
          {
            id: 'bicep-fundamentals',
            title: 'Bicep Fundamentals',
            children: [
              { id: 'what-is-bicep', title: 'What is Bicep?' },
              { id: 'bicep-vs-arm', title: 'Bicep vs ARM' },
              { id: 'bicep-syntax', title: 'Syntax' },
              { id: 'bicep-parameters-variables', title: 'Parameters & Variables' },
              { id: 'bicep-resources', title: 'Resources' },
            ],
          },
          {
            id: 'bicep-features',
            title: 'Bicep Features',
            children: [
              { id: 'bicep-modules', title: 'Modules' },
              { id: 'bicep-functions', title: 'Functions' },
              { id: 'loops-conditions-bicep', title: 'Loops & Conditions' },
              { id: 'decorators', title: 'Decorators' },
              { id: 'bicep-registry', title: 'Bicep Registry' },
            ],
          },
          {
            id: 'bicep-tooling',
            title: 'Tooling & Practices',
            children: [
              { id: 'bicep-cli', title: 'Bicep CLI' },
              { id: 'azure-verified-modules', title: 'Azure Verified Modules' },
              { id: 'bicep-deployment-stacks', title: 'Deployment Stacks' },
              { id: 'bicep-testing-linting', title: 'Testing & Linting' },
            ],
          },
        ],
      },
      {
        id: 'terraform-azure',
        title: 'Terraform on Azure',
        summary: 'Provisioning Azure with HashiCorp Terraform.',
        level: 'advanced',
        children: [
          {
            id: 'terraform-fundamentals',
            title: 'Terraform Fundamentals',
            children: [
              { id: 'terraform-basics', title: 'Terraform Basics' },
              { id: 'azurerm-provider', title: 'AzureRM Provider' },
              { id: 'azapi-provider', title: 'AzAPI Provider' },
              { id: 'hcl-syntax', title: 'HCL Syntax' },
            ],
          },
          {
            id: 'terraform-state',
            title: 'State Management',
            children: [
              { id: 'terraform-state-basics', title: 'State Basics' },
              { id: 'remote-state-storage', title: 'Remote State in Storage' },
              { id: 'state-locking', title: 'State Locking' },
            ],
          },
          {
            id: 'terraform-practices',
            title: 'Practices & Tooling',
            children: [
              { id: 'terraform-modules', title: 'Modules' },
              { id: 'azure-landing-zones-terraform', title: 'Azure Landing Zones' },
              { id: 'terraform-in-pipelines', title: 'Terraform in Pipelines' },
              { id: 'hcp-terraform', title: 'HCP Terraform' },
            ],
          },
        ],
      },
      {
        id: 'azure-devops',
        title: 'Azure DevOps',
        summary: 'Boards, Repos, Pipelines, Artifacts and Test Plans.',
        level: 'intermediate',
        children: [
          {
            id: 'azure-boards',
            title: 'Azure Boards',
            children: [
              { id: 'work-items', title: 'Work Items' },
              { id: 'backlogs-sprints', title: 'Backlogs & Sprints' },
              { id: 'boards-queries', title: 'Queries & Dashboards' },
            ],
          },
          {
            id: 'azure-repos',
            title: 'Azure Repos',
            children: [
              { id: 'git-repositories', title: 'Git Repositories' },
              { id: 'branch-policies', title: 'Branch Policies' },
              { id: 'pull-requests', title: 'Pull Requests' },
            ],
          },
          {
            id: 'azure-pipelines',
            title: 'Azure Pipelines',
            children: [
              { id: 'yaml-pipelines', title: 'YAML Pipelines' },
              { id: 'stages-jobs-steps', title: 'Stages, Jobs & Steps' },
              { id: 'pipeline-agents', title: 'Agents & Pools' },
              { id: 'pipeline-variables-secrets', title: 'Variables & Secrets' },
              { id: 'environments-approvals', title: 'Environments & Approvals' },
              { id: 'service-connections', title: 'Service Connections' },
            ],
          },
          {
            id: 'artifacts-test-plans',
            title: 'Artifacts & Test Plans',
            children: [
              { id: 'azure-artifacts', title: 'Azure Artifacts' },
              { id: 'azure-test-plans', title: 'Azure Test Plans' },
            ],
          },
        ],
      },
      {
        id: 'github-actions-azure',
        title: 'GitHub Actions for Azure',
        summary: 'CI/CD to Azure with GitHub Actions.',
        level: 'intermediate',
        children: [
          {
            id: 'github-actions-fundamentals',
            title: 'Actions Fundamentals',
            children: [
              { id: 'workflows-jobs', title: 'Workflows & Jobs' },
              { id: 'azure-login-action', title: 'Azure Login Action' },
              { id: 'oidc-federated-credentials', title: 'OIDC Federated Credentials' },
            ],
          },
          {
            id: 'deploying-to-azure',
            title: 'Deploying to Azure',
            children: [
              { id: 'deploy-app-service-actions', title: 'Deploy to App Service' },
              { id: 'deploy-aks-actions', title: 'Deploy to AKS' },
              { id: 'deploy-bicep-actions', title: 'Deploy Bicep/ARM' },
            ],
          },
          {
            id: 'devops-practices',
            title: 'DevOps Practices',
            children: [
              { id: 'ci-cd-fundamentals', title: 'CI/CD Fundamentals' },
              { id: 'gitops', title: 'GitOps' },
              { id: 'environments-secrets-github', title: 'Environments & Secrets' },
              { id: 'devsecops', title: 'DevSecOps' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'data-analytics',
    roots: [
      {
        id: 'microsoft-fabric',
        title: 'Microsoft Fabric',
        summary: 'Unified analytics platform with OneLake.',
        level: 'intermediate',
        children: [
          {
            id: 'fabric-fundamentals',
            title: 'Fabric Fundamentals',
            children: [
              { id: 'what-is-fabric', title: 'What is Microsoft Fabric?' },
              { id: 'onelake', title: 'OneLake' },
              { id: 'fabric-capacities', title: 'Capacities' },
              { id: 'workspaces-fabric', title: 'Workspaces' },
              { id: 'fabric-vs-synapse', title: 'Fabric vs Synapse' },
            ],
          },
          {
            id: 'fabric-workloads',
            title: 'Fabric Workloads',
            children: [
              { id: 'data-factory-fabric', title: 'Data Factory' },
              { id: 'data-engineering-fabric', title: 'Data Engineering (Spark)' },
              { id: 'data-warehouse-fabric', title: 'Data Warehouse' },
              { id: 'data-science-fabric', title: 'Data Science' },
              { id: 'real-time-intelligence', title: 'Real-Time Intelligence' },
              { id: 'power-bi-fabric', title: 'Power BI' },
              { id: 'databases-fabric', title: 'Databases' },
            ],
          },
          {
            id: 'fabric-features',
            title: 'Platform Features',
            children: [
              { id: 'lakehouse', title: 'Lakehouse' },
              { id: 'shortcuts', title: 'Shortcuts' },
              { id: 'mirroring', title: 'Mirroring' },
              { id: 'copilot-fabric', title: 'Copilot in Fabric' },
              { id: 'fabric-governance', title: 'Governance & Purview Integration' },
            ],
          },
        ],
      },
      {
        id: 'azure-synapse',
        title: 'Azure Synapse Analytics',
        summary: 'Enterprise data warehousing and big-data analytics.',
        level: 'advanced',
        children: [
          {
            id: 'synapse-fundamentals',
            title: 'Synapse Fundamentals',
            children: [
              { id: 'what-is-synapse', title: 'What is Synapse Analytics?' },
              { id: 'synapse-studio', title: 'Synapse Studio' },
              { id: 'synapse-workspaces', title: 'Workspaces' },
            ],
          },
          {
            id: 'synapse-sql',
            title: 'Synapse SQL',
            children: [
              { id: 'dedicated-sql-pools', title: 'Dedicated SQL Pools' },
              { id: 'serverless-sql-pools', title: 'Serverless SQL Pools' },
              { id: 'distribution-strategies', title: 'Distribution Strategies' },
              { id: 'polybase', title: 'PolyBase' },
            ],
          },
          {
            id: 'synapse-spark',
            title: 'Synapse Spark',
            children: [
              { id: 'apache-spark-pools', title: 'Apache Spark Pools' },
              { id: 'spark-notebooks', title: 'Notebooks' },
              { id: 'spark-data-processing', title: 'Data Processing' },
            ],
          },
          {
            id: 'synapse-integration',
            title: 'Integration',
            children: [
              { id: 'synapse-pipelines', title: 'Pipelines' },
              { id: 'synapse-link', title: 'Synapse Link' },
              { id: 'synapse-data-explorer-pools', title: 'Data Explorer Pools' },
            ],
          },
        ],
      },
      {
        id: 'data-factory',
        title: 'Azure Data Factory',
        summary: 'Cloud data integration and ETL/ELT pipelines.',
        level: 'intermediate',
        children: [
          {
            id: 'adf-fundamentals',
            title: 'ADF Fundamentals',
            children: [
              { id: 'what-is-data-factory', title: 'What is Data Factory?' },
              { id: 'pipelines-activities', title: 'Pipelines & Activities' },
              { id: 'datasets', title: 'Datasets' },
              { id: 'linked-services', title: 'Linked Services' },
              { id: 'integration-runtimes', title: 'Integration Runtimes' },
            ],
          },
          {
            id: 'data-movement',
            title: 'Data Movement',
            children: [
              { id: 'copy-activity', title: 'Copy Activity' },
              { id: 'connectors-adf', title: 'Connectors' },
              { id: 'self-hosted-ir', title: 'Self-Hosted Integration Runtime' },
            ],
          },
          {
            id: 'data-transformation',
            title: 'Data Transformation',
            children: [
              { id: 'mapping-data-flows', title: 'Mapping Data Flows' },
              { id: 'wrangling-data-flows', title: 'Wrangling Data Flows' },
              { id: 'external-compute-activities', title: 'External Compute Activities' },
            ],
          },
          {
            id: 'adf-orchestration',
            title: 'Orchestration & Operations',
            children: [
              { id: 'triggers-adf', title: 'Triggers' },
              { id: 'control-flow-adf', title: 'Control Flow' },
              { id: 'monitoring-adf', title: 'Monitoring' },
              { id: 'cicd-adf', title: 'CI/CD' },
            ],
          },
        ],
      },
      {
        id: 'azure-databricks',
        title: 'Azure Databricks',
        summary: 'Apache Spark-based analytics and lakehouse.',
        level: 'advanced',
        children: [
          {
            id: 'databricks-fundamentals',
            title: 'Databricks Fundamentals',
            children: [
              { id: 'what-is-databricks', title: 'What is Azure Databricks?' },
              { id: 'workspaces-databricks', title: 'Workspaces' },
              { id: 'clusters', title: 'Clusters' },
              { id: 'notebooks-databricks', title: 'Notebooks' },
            ],
          },
          {
            id: 'lakehouse-platform',
            title: 'Lakehouse Platform',
            children: [
              { id: 'delta-lake', title: 'Delta Lake' },
              { id: 'unity-catalog', title: 'Unity Catalog' },
              { id: 'medallion-architecture', title: 'Medallion Architecture' },
              { id: 'delta-live-tables', title: 'Delta Live Tables / Lakeflow' },
            ],
          },
          {
            id: 'databricks-workloads',
            title: 'Workloads',
            children: [
              { id: 'data-engineering-databricks', title: 'Data Engineering' },
              { id: 'databricks-sql', title: 'Databricks SQL' },
              { id: 'machine-learning-databricks', title: 'Machine Learning & MLflow' },
              { id: 'mosaic-ai', title: 'Mosaic AI' },
            ],
          },
        ],
      },
      {
        id: 'stream-analytics',
        title: 'Azure Stream Analytics',
        summary: 'Real-time stream processing.',
        level: 'intermediate',
        children: [
          {
            id: 'stream-analytics-fundamentals',
            title: 'Stream Analytics Fundamentals',
            children: [
              { id: 'what-is-stream-analytics', title: 'What is Stream Analytics?' },
              { id: 'streaming-units', title: 'Streaming Units' },
              { id: 'jobs-and-topology', title: 'Jobs & Topology' },
            ],
          },
          {
            id: 'inputs-outputs',
            title: 'Inputs & Outputs',
            children: [
              { id: 'streaming-inputs', title: 'Streaming Inputs' },
              { id: 'reference-data', title: 'Reference Data' },
              { id: 'streaming-outputs', title: 'Outputs' },
            ],
          },
          {
            id: 'stream-query-language',
            title: 'Query & Windowing',
            children: [
              { id: 'stream-analytics-query', title: 'Query Language' },
              { id: 'windowing-functions', title: 'Windowing Functions' },
              { id: 'temporal-joins', title: 'Temporal Joins' },
            ],
          },
        ],
      },
      {
        id: 'data-explorer',
        title: 'Azure Data Explorer',
        summary: 'Fast analytics over telemetry and time-series data.',
        level: 'advanced',
        children: [
          {
            id: 'adx-fundamentals',
            title: 'ADX Fundamentals',
            children: [
              { id: 'what-is-data-explorer', title: 'What is Data Explorer?' },
              { id: 'clusters-databases', title: 'Clusters & Databases' },
              { id: 'data-ingestion-adx', title: 'Data Ingestion' },
            ],
          },
          {
            id: 'adx-querying',
            title: 'Querying',
            children: [
              { id: 'kql-in-adx', title: 'KQL in ADX' },
              { id: 'time-series-analysis', title: 'Time-Series Analysis' },
              { id: 'materialized-views', title: 'Materialized Views' },
            ],
          },
          {
            id: 'adx-integration',
            title: 'Integration',
            children: [
              { id: 'fabric-real-time-intelligence', title: 'Fabric Real-Time Intelligence' },
              { id: 'adx-connectors', title: 'Connectors' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'ai-ml',
    roots: [
      {
        id: 'azure-ai-foundry',
        title: 'Azure AI Foundry',
        summary: 'Platform for building and operating AI applications and agents.',
        level: 'intermediate',
        children: [
          {
            id: 'foundry-fundamentals',
            title: 'Foundry Fundamentals',
            children: [
              { id: 'what-is-ai-foundry', title: 'What is Azure AI Foundry?' },
              { id: 'foundry-projects', title: 'Projects & Hubs' },
              { id: 'foundry-portal', title: 'Foundry Portal' },
              { id: 'foundry-sdk', title: 'Foundry SDK' },
            ],
          },
          {
            id: 'model-catalog',
            title: 'Model Catalog',
            children: [
              { id: 'foundation-models', title: 'Foundation Models' },
              { id: 'model-deployment-options', title: 'Deployment Options' },
              { id: 'model-router', title: 'Model Router' },
              { id: 'model-benchmarks', title: 'Model Benchmarks' },
              { id: 'fine-tuning-foundry', title: 'Fine-Tuning' },
            ],
          },
          {
            id: 'foundry-agent-service',
            title: 'Agent Service',
            children: [
              { id: 'what-is-agent-service', title: 'What is Agent Service?' },
              { id: 'agent-tools', title: 'Agent Tools' },
              { id: 'connected-agents', title: 'Connected Agents' },
              { id: 'agent-orchestration', title: 'Agent Orchestration' },
              { id: 'mcp-in-foundry', title: 'Model Context Protocol (MCP)' },
            ],
          },
          {
            id: 'building-ai-apps',
            title: 'Building AI Apps',
            children: [
              { id: 'prompt-flow', title: 'Prompt Flow' },
              { id: 'rag-in-foundry', title: 'Retrieval-Augmented Generation' },
              { id: 'foundry-evaluations', title: 'Evaluations' },
              { id: 'content-safety-integration', title: 'Content Safety' },
              { id: 'tracing-monitoring-foundry', title: 'Tracing & Monitoring' },
            ],
          },
        ],
      },
      {
        id: 'azure-openai',
        title: 'Azure OpenAI Service',
        summary: 'Hosted GPT, embeddings and reasoning models.',
        level: 'intermediate',
        children: [
          {
            id: 'openai-fundamentals',
            title: 'Azure OpenAI Fundamentals',
            children: [
              { id: 'what-is-azure-openai', title: 'What is Azure OpenAI?' },
              { id: 'azure-openai-vs-openai', title: 'Azure OpenAI vs OpenAI' },
              { id: 'openai-deployments', title: 'Model Deployments' },
              { id: 'openai-quotas-tps', title: 'Quotas & Rate Limits' },
            ],
          },
          {
            id: 'openai-models',
            title: 'Models',
            children: [
              { id: 'gpt-models', title: 'GPT & Chat Models' },
              { id: 'reasoning-models', title: 'Reasoning Models' },
              { id: 'embeddings-models', title: 'Embeddings Models' },
              { id: 'image-models', title: 'Image Models' },
              { id: 'audio-models', title: 'Audio & Realtime Models' },
            ],
          },
          {
            id: 'openai-capabilities',
            title: 'Capabilities',
            children: [
              { id: 'chat-completions', title: 'Chat Completions' },
              { id: 'function-calling-tools', title: 'Function Calling & Tools' },
              { id: 'structured-outputs', title: 'Structured Outputs' },
              { id: 'assistants-responses-api', title: 'Assistants & Responses API' },
              { id: 'on-your-data', title: 'On Your Data' },
            ],
          },
          {
            id: 'openai-deployment-types',
            title: 'Deployment & Provisioning',
            children: [
              { id: 'standard-deployment', title: 'Standard' },
              { id: 'provisioned-throughput', title: 'Provisioned Throughput (PTU)' },
              { id: 'batch-deployment', title: 'Batch' },
              { id: 'global-vs-regional-deployments', title: 'Global vs Regional' },
            ],
          },
        ],
      },
      {
        id: 'azure-ai-services',
        title: 'Azure AI Services',
        summary: 'Vision, language, speech and decision APIs.',
        level: 'beginner',
        children: [
          {
            id: 'ai-services-fundamentals',
            title: 'AI Services Fundamentals',
            children: [
              { id: 'what-are-ai-services', title: 'What are Azure AI Services?' },
              { id: 'multi-service-resource', title: 'Multi-Service Resource' },
              { id: 'ai-services-authentication', title: 'Authentication & Keys' },
            ],
          },
          {
            id: 'vision-services',
            title: 'Vision',
            children: [
              { id: 'computer-vision', title: 'Azure AI Vision' },
              { id: 'custom-vision', title: 'Custom Vision' },
              { id: 'face-service', title: 'Face' },
              { id: 'document-intelligence', title: 'Document Intelligence' },
              { id: 'video-indexer', title: 'Video Indexer' },
            ],
          },
          {
            id: 'language-services',
            title: 'Language',
            children: [
              { id: 'language-service', title: 'Azure AI Language' },
              { id: 'translator', title: 'Translator' },
              { id: 'question-answering', title: 'Question Answering' },
              { id: 'conversational-language-understanding', title: 'Conversational Language Understanding' },
            ],
          },
          {
            id: 'speech-services',
            title: 'Speech',
            children: [
              { id: 'speech-to-text', title: 'Speech to Text' },
              { id: 'text-to-speech', title: 'Text to Speech' },
              { id: 'speech-translation', title: 'Speech Translation' },
              { id: 'speaker-recognition', title: 'Speaker Recognition' },
            ],
          },
          {
            id: 'other-ai-services',
            title: 'Other Services',
            children: [
              { id: 'content-safety', title: 'Content Safety' },
              { id: 'content-understanding', title: 'Content Understanding' },
              { id: 'bot-service', title: 'Azure Bot Service' },
            ],
          },
        ],
      },
      {
        id: 'azure-machine-learning',
        title: 'Azure Machine Learning',
        summary: 'End-to-end ML model training and deployment.',
        level: 'advanced',
        children: [
          {
            id: 'aml-fundamentals',
            title: 'AML Fundamentals',
            children: [
              { id: 'what-is-azure-ml', title: 'What is Azure Machine Learning?' },
              { id: 'aml-workspaces', title: 'Workspaces' },
              { id: 'aml-studio', title: 'AML Studio' },
              { id: 'compute-targets', title: 'Compute Targets' },
            ],
          },
          {
            id: 'aml-assets',
            title: 'ML Assets',
            children: [
              { id: 'datastores-datasets', title: 'Datastores & Data Assets' },
              { id: 'environments-aml', title: 'Environments' },
              { id: 'models-registry', title: 'Models & Registry' },
              { id: 'components', title: 'Components' },
            ],
          },
          {
            id: 'model-training',
            title: 'Model Training',
            children: [
              { id: 'jobs-and-experiments', title: 'Jobs & Experiments' },
              { id: 'automated-ml', title: 'Automated ML' },
              { id: 'designer', title: 'Designer' },
              { id: 'hyperparameter-tuning', title: 'Hyperparameter Tuning' },
              { id: 'distributed-training', title: 'Distributed Training' },
            ],
          },
          {
            id: 'mlops',
            title: 'MLOps',
            children: [
              { id: 'pipelines-aml', title: 'ML Pipelines' },
              { id: 'model-deployment-endpoints', title: 'Online & Batch Endpoints' },
              { id: 'model-monitoring', title: 'Model Monitoring' },
              { id: 'responsible-ai-dashboard', title: 'Responsible AI Dashboard' },
              { id: 'cicd-mlops', title: 'CI/CD for ML' },
            ],
          },
        ],
      },
      {
        id: 'azure-ai-search',
        title: 'Azure AI Search',
        summary: 'Search and retrieval-augmented generation grounding.',
        level: 'intermediate',
        children: [
          {
            id: 'ai-search-fundamentals',
            title: 'AI Search Fundamentals',
            children: [
              { id: 'what-is-ai-search', title: 'What is Azure AI Search?' },
              { id: 'indexes', title: 'Indexes' },
              { id: 'indexers-data-sources', title: 'Indexers & Data Sources' },
              { id: 'search-tiers', title: 'Service Tiers' },
            ],
          },
          {
            id: 'search-capabilities',
            title: 'Search Capabilities',
            children: [
              { id: 'full-text-search', title: 'Full-Text Search' },
              { id: 'vector-search', title: 'Vector Search' },
              { id: 'hybrid-search', title: 'Hybrid Search' },
              { id: 'semantic-ranking', title: 'Semantic Ranking' },
              { id: 'faceting-filtering', title: 'Faceting & Filtering' },
            ],
          },
          {
            id: 'search-enrichment-rag',
            title: 'Enrichment & RAG',
            children: [
              { id: 'skillsets-ai-enrichment', title: 'Skillsets & AI Enrichment' },
              { id: 'integrated-vectorization', title: 'Integrated Vectorization' },
              { id: 'knowledge-store', title: 'Knowledge Store' },
              { id: 'rag-with-ai-search', title: 'RAG with AI Search' },
              { id: 'agentic-retrieval', title: 'Agentic Retrieval' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'web-mobile',
    roots: [
      {
        id: 'static-web-apps',
        title: 'Azure Static Web Apps',
        summary: 'Hosting for static sites with serverless APIs.',
        level: 'beginner',
        children: [
          {
            id: 'swa-fundamentals',
            title: 'Static Web Apps Fundamentals',
            children: [
              { id: 'what-are-static-web-apps', title: 'What are Static Web Apps?' },
              { id: 'swa-hosting-plans', title: 'Hosting Plans' },
              { id: 'staticwebapp-config', title: 'Configuration File' },
            ],
          },
          {
            id: 'swa-features',
            title: 'Features',
            children: [
              { id: 'integrated-apis', title: 'Integrated APIs' },
              { id: 'swa-authentication', title: 'Authentication & Authorization' },
              { id: 'swa-custom-domains', title: 'Custom Domains' },
              { id: 'swa-routing', title: 'Routing & Rules' },
            ],
          },
          {
            id: 'swa-deployment',
            title: 'Deployment',
            children: [
              { id: 'github-actions-swa', title: 'GitHub Actions Deployment' },
              { id: 'staging-environments', title: 'Staging Environments' },
            ],
          },
        ],
      },
      {
        id: 'signalr-service',
        title: 'Azure SignalR Service',
        summary: 'Managed realtime messaging for apps.',
        level: 'intermediate',
        children: [
          {
            id: 'signalr-fundamentals',
            title: 'SignalR Fundamentals',
            children: [
              { id: 'what-is-signalr-service', title: 'What is SignalR Service?' },
              { id: 'service-modes', title: 'Service Modes (Default/Serverless/Classic)' },
              { id: 'signalr-tiers', title: 'Tiers & Units' },
            ],
          },
          {
            id: 'signalr-usage',
            title: 'Usage Patterns',
            children: [
              { id: 'aspnet-core-signalr', title: 'ASP.NET Core Integration' },
              { id: 'serverless-signalr', title: 'Serverless with Functions' },
              { id: 'scaling-signalr', title: 'Scaling' },
            ],
          },
          {
            id: 'web-pubsub',
            title: 'Web PubSub',
            children: [
              { id: 'what-is-web-pubsub', title: 'What is Web PubSub?' },
              { id: 'web-pubsub-vs-signalr', title: 'Web PubSub vs SignalR' },
            ],
          },
        ],
      },
      {
        id: 'communication-services',
        title: 'Azure Communication Services',
        summary: 'Voice, video, chat, SMS and email in apps.',
        level: 'intermediate',
        children: [
          {
            id: 'acs-fundamentals',
            title: 'Communication Services Fundamentals',
            children: [
              { id: 'what-is-acs', title: 'What is Communication Services?' },
              { id: 'identities-and-tokens', title: 'Identities & Access Tokens' },
              { id: 'acs-sdks', title: 'SDKs' },
            ],
          },
          {
            id: 'acs-channels',
            title: 'Channels',
            children: [
              { id: 'voice-calling', title: 'Voice & Video Calling' },
              { id: 'chat-acs', title: 'Chat' },
              { id: 'sms', title: 'SMS' },
              { id: 'email-acs', title: 'Email' },
              { id: 'phone-numbers', title: 'Phone Numbers' },
            ],
          },
          {
            id: 'acs-integration',
            title: 'Integration',
            children: [
              { id: 'teams-interoperability', title: 'Teams Interoperability' },
              { id: 'call-automation', title: 'Call Automation' },
              { id: 'acs-event-handling', title: 'Event Handling' },
            ],
          },
        ],
      },
      {
        id: 'notification-hubs',
        title: 'Notification Hubs',
        summary: 'Cross-platform push notifications at scale.',
        level: 'intermediate',
        children: [
          {
            id: 'notification-hubs-fundamentals',
            title: 'Notification Hubs Fundamentals',
            children: [
              { id: 'what-are-notification-hubs', title: 'What are Notification Hubs?' },
              { id: 'namespaces-hubs', title: 'Namespaces & Hubs' },
              { id: 'platform-notification-systems', title: 'Platform Notification Systems' },
            ],
          },
          {
            id: 'notification-hubs-features',
            title: 'Features',
            children: [
              { id: 'registrations-installations', title: 'Registrations & Installations' },
              { id: 'tags-and-tag-expressions', title: 'Tags & Tag Expressions' },
              { id: 'templates-notifications', title: 'Templates' },
              { id: 'scheduled-notifications', title: 'Scheduled Notifications' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'iot',
    roots: [
      {
        id: 'iot-hub',
        title: 'Azure IoT Hub',
        summary: 'Bi-directional device-to-cloud communication.',
        level: 'intermediate',
        children: [
          {
            id: 'iot-hub-fundamentals',
            title: 'IoT Hub Fundamentals',
            children: [
              { id: 'what-is-iot-hub', title: 'What is IoT Hub?' },
              { id: 'iot-hub-tiers', title: 'Tiers & Units' },
              { id: 'device-identity-registry', title: 'Device Identity Registry' },
            ],
          },
          {
            id: 'iot-messaging',
            title: 'Messaging',
            children: [
              { id: 'device-to-cloud', title: 'Device-to-Cloud Messaging' },
              { id: 'cloud-to-device', title: 'Cloud-to-Device Messaging' },
              { id: 'message-routing', title: 'Message Routing' },
              { id: 'direct-methods', title: 'Direct Methods' },
            ],
          },
          {
            id: 'device-management-iot',
            title: 'Device Management',
            children: [
              { id: 'device-twins', title: 'Device Twins' },
              { id: 'device-provisioning-service', title: 'Device Provisioning Service (DPS)' },
              { id: 'iot-device-sdks', title: 'Device SDKs' },
              { id: 'iot-edge-integration', title: 'IoT Edge Integration' },
            ],
          },
          {
            id: 'iot-security',
            title: 'Security',
            children: [
              { id: 'iot-authentication', title: 'Device Authentication' },
              { id: 'x509-certificates-iot', title: 'X.509 Certificates' },
              { id: 'defender-for-iot', title: 'Defender for IoT' },
            ],
          },
        ],
      },
      {
        id: 'iot-central',
        title: 'Azure IoT Central',
        summary: 'Managed IoT application platform.',
        level: 'beginner',
        children: [
          {
            id: 'iot-central-fundamentals',
            title: 'IoT Central Fundamentals',
            children: [
              { id: 'what-is-iot-central', title: 'What is IoT Central?' },
              { id: 'application-templates', title: 'Application Templates' },
              { id: 'device-templates', title: 'Device Templates' },
            ],
          },
          {
            id: 'iot-central-features',
            title: 'Features',
            children: [
              { id: 'dashboards-iot-central', title: 'Dashboards' },
              { id: 'rules-and-actions-iot', title: 'Rules & Actions' },
              { id: 'data-export-iot', title: 'Data Export' },
              { id: 'jobs-iot-central', title: 'Jobs' },
            ],
          },
        ],
      },
      {
        id: 'digital-twins',
        title: 'Azure Digital Twins',
        summary: 'Modeling physical environments digitally.',
        level: 'advanced',
        children: [
          {
            id: 'digital-twins-fundamentals',
            title: 'Digital Twins Fundamentals',
            children: [
              { id: 'what-are-digital-twins', title: 'What are Digital Twins?' },
              { id: 'dtdl-models', title: 'DTDL Models' },
              { id: 'twin-graph', title: 'Twin Graph' },
            ],
          },
          {
            id: 'digital-twins-usage',
            title: 'Usage',
            children: [
              { id: 'ingesting-telemetry', title: 'Ingesting Telemetry' },
              { id: 'querying-twins', title: 'Querying Twins' },
              { id: 'event-routes-twins', title: 'Event Routes' },
              { id: 'digital-twins-integration', title: 'Integration' },
            ],
          },
        ],
      },
      {
        id: 'iot-edge-operations',
        title: 'Azure IoT Edge & Operations',
        summary: 'Edge compute and adaptive cloud IoT operations.',
        level: 'advanced',
        children: [
          {
            id: 'iot-edge',
            title: 'Azure IoT Edge',
            children: [
              { id: 'what-is-iot-edge', title: 'What is IoT Edge?' },
              { id: 'edge-runtime', title: 'Edge Runtime' },
              { id: 'edge-modules', title: 'Edge Modules' },
              { id: 'edge-deployments', title: 'Deployments' },
              { id: 'edge-offline-capabilities', title: 'Offline Capabilities' },
            ],
          },
          {
            id: 'azure-iot-operations',
            title: 'Azure IoT Operations',
            children: [
              { id: 'what-is-iot-operations', title: 'What is Azure IoT Operations?' },
              { id: 'mqtt-broker', title: 'MQTT Broker' },
              { id: 'data-flows-iot', title: 'Data Flows' },
              { id: 'arc-enabled-iot', title: 'Arc-Enabled Edge' },
            ],
          },
          {
            id: 'edge-ai',
            title: 'Edge AI',
            children: [
              { id: 'ml-at-the-edge', title: 'ML at the Edge' },
              { id: 'edge-vision', title: 'Edge Vision' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'migration-hybrid',
    roots: [
      {
        id: 'azure-migrate',
        title: 'Azure Migrate',
        summary: 'Discovery, assessment and migration of workloads.',
        level: 'intermediate',
        children: [
          {
            id: 'migrate-fundamentals',
            title: 'Migrate Fundamentals',
            children: [
              { id: 'what-is-azure-migrate', title: 'What is Azure Migrate?' },
              { id: 'migrate-project', title: 'Migrate Project' },
              { id: 'migration-strategies', title: 'Migration Strategies (5 Rs)' },
            ],
          },
          {
            id: 'discovery-assessment',
            title: 'Discovery & Assessment',
            children: [
              { id: 'appliance-discovery', title: 'Appliance Discovery' },
              { id: 'dependency-analysis', title: 'Dependency Analysis' },
              { id: 'assessment-reports', title: 'Assessment Reports' },
              { id: 'cost-estimation-migrate', title: 'Cost Estimation' },
            ],
          },
          {
            id: 'migration-tools',
            title: 'Migration Tools',
            children: [
              { id: 'server-migration', title: 'Server Migration' },
              { id: 'database-migration-migrate', title: 'Database Migration' },
              { id: 'web-app-migration', title: 'Web App Migration' },
              { id: 'vmware-migration', title: 'VMware Migration' },
            ],
          },
        ],
      },
      {
        id: 'azure-backup',
        title: 'Azure Backup',
        summary: 'Backup and recovery for Azure and on-premises.',
        level: 'beginner',
        children: [
          {
            id: 'backup-fundamentals',
            title: 'Backup Fundamentals',
            children: [
              { id: 'what-is-azure-backup', title: 'What is Azure Backup?' },
              { id: 'recovery-services-vault', title: 'Recovery Services Vault' },
              { id: 'backup-vault', title: 'Backup Vault' },
              { id: 'backup-policies', title: 'Backup Policies' },
            ],
          },
          {
            id: 'backup-workloads',
            title: 'Backup Workloads',
            children: [
              { id: 'vm-backup', title: 'VM Backup' },
              { id: 'sql-in-vm-backup', title: 'SQL in VM Backup' },
              { id: 'azure-files-backup', title: 'Azure Files Backup' },
              { id: 'blob-backup', title: 'Blob Backup' },
              { id: 'on-premises-backup', title: 'On-Premises Backup (MARS/MABS)' },
            ],
          },
          {
            id: 'backup-management',
            title: 'Management & Security',
            children: [
              { id: 'backup-center', title: 'Backup Center' },
              { id: 'soft-delete-backup', title: 'Soft Delete' },
              { id: 'immutable-vaults', title: 'Immutable Vaults' },
              { id: 'cross-region-restore', title: 'Cross-Region Restore' },
            ],
          },
        ],
      },
      {
        id: 'site-recovery',
        title: 'Azure Site Recovery',
        summary: 'Disaster recovery and business continuity.',
        level: 'advanced',
        children: [
          {
            id: 'asr-fundamentals',
            title: 'Site Recovery Fundamentals',
            children: [
              { id: 'what-is-site-recovery', title: 'What is Site Recovery?' },
              { id: 'replication-concepts', title: 'Replication Concepts' },
              { id: 'recovery-objectives', title: 'RPO & RTO' },
            ],
          },
          {
            id: 'asr-scenarios',
            title: 'Scenarios',
            children: [
              { id: 'azure-to-azure-dr', title: 'Azure-to-Azure DR' },
              { id: 'vmware-to-azure-dr', title: 'VMware-to-Azure DR' },
              { id: 'hyperv-to-azure-dr', title: 'Hyper-V-to-Azure DR' },
            ],
          },
          {
            id: 'asr-operations',
            title: 'Operations',
            children: [
              { id: 'recovery-plans', title: 'Recovery Plans' },
              { id: 'failover-failback', title: 'Failover & Failback' },
              { id: 'dr-drills', title: 'DR Drills (Test Failover)' },
            ],
          },
        ],
      },
      {
        id: 'azure-stack-vmware',
        title: 'Azure Stack & VMware Solution',
        summary: 'Hybrid and on-premises extensions of Azure.',
        level: 'advanced',
        children: [
          {
            id: 'azure-stack-portfolio',
            title: 'Azure Stack Portfolio',
            children: [
              { id: 'azure-stack-hci', title: 'Azure Local (Stack HCI)' },
              { id: 'azure-stack-hub', title: 'Azure Stack Hub' },
              { id: 'azure-stack-edge', title: 'Azure Stack Edge' },
            ],
          },
          {
            id: 'azure-vmware-solution',
            title: 'Azure VMware Solution',
            children: [
              { id: 'what-is-avs', title: 'What is Azure VMware Solution?' },
              { id: 'avs-private-clouds', title: 'Private Clouds' },
              { id: 'avs-networking', title: 'Networking' },
              { id: 'avs-migration', title: 'Migration to AVS' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'cost-management',
    roots: [
      {
        id: 'cost-management-billing',
        title: 'Cost Management + Billing',
        summary: 'Cost analysis, budgets, exports and alerts.',
        level: 'beginner',
        children: [
          {
            id: 'cost-management-fundamentals',
            title: 'Cost Management Fundamentals',
            children: [
              { id: 'what-is-cost-management', title: 'What is Cost Management?' },
              { id: 'scopes-and-billing-accounts', title: 'Scopes & Billing Accounts' },
              { id: 'cost-vs-usage', title: 'Cost vs Usage' },
            ],
          },
          {
            id: 'analyzing-costs',
            title: 'Analyzing Costs',
            children: [
              { id: 'cost-analysis-views', title: 'Cost Analysis Views' },
              { id: 'grouping-filtering-costs', title: 'Grouping & Filtering' },
              { id: 'amortized-vs-actual', title: 'Amortized vs Actual' },
              { id: 'cost-allocation', title: 'Cost Allocation' },
            ],
          },
          {
            id: 'controlling-costs',
            title: 'Controlling Costs',
            children: [
              { id: 'budgets-cost-mgmt', title: 'Budgets' },
              { id: 'cost-alerts-mgmt', title: 'Cost Alerts' },
              { id: 'cost-exports', title: 'Exports' },
              { id: 'anomaly-detection', title: 'Anomaly Detection' },
            ],
          },
        ],
      },
      {
        id: 'purchasing-options',
        title: 'Pricing & Purchasing Options',
        summary: 'Reservations, savings plans, spot and Hybrid Benefit.',
        level: 'intermediate',
        children: [
          {
            id: 'commitment-discounts',
            title: 'Commitment Discounts',
            children: [
              { id: 'reservations-purchasing', title: 'Reservations' },
              { id: 'savings-plans-purchasing', title: 'Savings Plans for Compute' },
              { id: 'reservations-vs-savings-plans', title: 'Reservations vs Savings Plans' },
            ],
          },
          {
            id: 'other-discounts',
            title: 'Other Discounts',
            children: [
              { id: 'azure-hybrid-benefit-purchasing', title: 'Azure Hybrid Benefit' },
              { id: 'spot-pricing-purchasing', title: 'Spot Pricing' },
              { id: 'dev-test-pricing-purchasing', title: 'Dev/Test Pricing' },
              { id: 'azure-credits', title: 'Azure Credits' },
            ],
          },
        ],
      },
      {
        id: 'cost-optimization',
        title: 'Cost Optimization Practices',
        summary: 'Rightsizing, governance and FinOps practices.',
        level: 'advanced',
        children: [
          {
            id: 'optimization-techniques',
            title: 'Optimization Techniques',
            children: [
              { id: 'rightsizing', title: 'Rightsizing' },
              { id: 'shutdown-deallocate', title: 'Shutdown & Deallocate' },
              { id: 'autoscaling-for-cost', title: 'Autoscaling for Cost' },
              { id: 'storage-tier-optimization', title: 'Storage Tier Optimization' },
              { id: 'orphaned-resources', title: 'Orphaned Resources' },
            ],
          },
          {
            id: 'cost-governance',
            title: 'Cost Governance',
            children: [
              { id: 'tagging-for-cost', title: 'Tagging for Cost' },
              { id: 'policy-for-cost', title: 'Policy for Cost Control' },
              { id: 'advisor-cost-recommendations', title: 'Advisor Cost Recommendations' },
            ],
          },
          {
            id: 'finops',
            title: 'FinOps',
            children: [
              { id: 'finops-framework', title: 'FinOps Framework' },
              { id: 'showback-chargeback', title: 'Showback & Chargeback' },
              { id: 'focus-dataset', title: 'FOCUS Dataset' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'architecture-frameworks',
    roots: [
      {
        id: 'well-architected-framework',
        title: 'Azure Well-Architected Framework',
        summary: 'Reliability, security, cost, operations and performance pillars.',
        level: 'intermediate',
        children: [
          {
            id: 'waf-overview',
            title: 'WAF Overview',
            children: [
              {
                id: 'well-architected-framework',
                title: 'Azure Well-Architected Framework',
              },
              { id: 'waf-pillars-overview', title: 'The Five Pillars' },
              { id: 'design-principles', title: 'Design Principles' },
            ],
          },
          {
            id: 'reliability-pillar',
            title: 'Reliability',
            children: [
              { id: 'resiliency-design', title: 'Resiliency Design' },
              { id: 'failure-mode-analysis', title: 'Failure Mode Analysis' },
              { id: 'reliability-targets', title: 'Reliability Targets' },
            ],
          },
          {
            id: 'security-pillar',
            title: 'Security',
            children: [
              { id: 'defense-in-depth', title: 'Defense in Depth' },
              { id: 'zero-trust', title: 'Zero Trust' },
              { id: 'security-governance-waf', title: 'Security Governance' },
            ],
          },
          {
            id: 'cost-optimization-pillar',
            title: 'Cost Optimization',
            children: [
              { id: 'cost-modeling', title: 'Cost Modeling' },
              { id: 'optimizing-spend', title: 'Optimizing Spend' },
            ],
          },
          {
            id: 'operational-excellence-pillar',
            title: 'Operational Excellence',
            children: [
              { id: 'devops-culture', title: 'DevOps Culture' },
              { id: 'observability-waf', title: 'Observability' },
              { id: 'automation-waf', title: 'Automation' },
            ],
          },
          {
            id: 'performance-efficiency-pillar',
            title: 'Performance Efficiency',
            children: [
              { id: 'scaling-design', title: 'Scaling Design' },
              { id: 'capacity-planning', title: 'Capacity Planning' },
              { id: 'performance-testing-waf', title: 'Performance Testing' },
            ],
          },
          {
            id: 'waf-tooling',
            title: 'Assessments & Service Guides',
            children: [
              { id: 'waf-review-assessment', title: 'WAF Review Assessment' },
              { id: 'service-guides', title: 'Service Guides' },
            ],
          },
        ],
      },
      {
        id: 'cloud-adoption-framework',
        title: 'Cloud Adoption Framework',
        summary: 'Strategy, plan, ready, adopt, govern and manage.',
        level: 'intermediate',
        children: [
          {
            id: 'caf-overview',
            title: 'CAF Overview',
            children: [
              { id: 'what-is-caf', title: 'What is the Cloud Adoption Framework?' },
              { id: 'caf-methodologies', title: 'Methodologies' },
            ],
          },
          {
            id: 'caf-strategy-plan',
            title: 'Strategy & Plan',
            children: [
              { id: 'cloud-strategy', title: 'Strategy' },
              { id: 'cloud-adoption-plan', title: 'Plan' },
              { id: 'organizational-alignment', title: 'Organizational Alignment' },
            ],
          },
          {
            id: 'caf-ready-adopt',
            title: 'Ready & Adopt',
            children: [
              { id: 'ready-landing-zones', title: 'Ready (Landing Zones)' },
              { id: 'migrate-methodology', title: 'Migrate' },
              { id: 'innovate-methodology', title: 'Innovate' },
            ],
          },
          {
            id: 'caf-govern-manage',
            title: 'Govern, Secure & Manage',
            children: [
              { id: 'govern-methodology', title: 'Govern' },
              { id: 'secure-methodology', title: 'Secure' },
              { id: 'manage-methodology', title: 'Manage' },
            ],
          },
        ],
      },
      {
        id: 'architecture-patterns',
        title: 'Architecture Patterns & Best Practices',
        summary: 'Cloud design patterns and reference architectures.',
        level: 'advanced',
        children: [
          {
            id: 'design-patterns',
            title: 'Cloud Design Patterns',
            children: [
              { id: 'reliability-patterns', title: 'Reliability Patterns' },
              { id: 'messaging-patterns', title: 'Messaging Patterns' },
              { id: 'data-management-patterns', title: 'Data Management Patterns' },
              { id: 'performance-scalability-patterns', title: 'Performance & Scalability Patterns' },
              { id: 'security-patterns', title: 'Security Patterns' },
            ],
          },
          {
            id: 'common-patterns',
            title: 'Common Patterns',
            children: [
              { id: 'retry-pattern', title: 'Retry' },
              { id: 'circuit-breaker', title: 'Circuit Breaker' },
              { id: 'cqrs', title: 'CQRS' },
              { id: 'event-sourcing', title: 'Event Sourcing' },
              { id: 'strangler-fig', title: 'Strangler Fig' },
              { id: 'saga-pattern', title: 'Saga' },
              { id: 'cache-aside-pattern', title: 'Cache-Aside' },
              { id: 'sidecar-pattern', title: 'Sidecar' },
            ],
          },
          {
            id: 'reference-architectures',
            title: 'Reference Architectures',
            children: [
              { id: 'architecture-center', title: 'Azure Architecture Center' },
              { id: 'microservices-architecture', title: 'Microservices Architecture' },
              { id: 'web-application-architecture', title: 'Web Application Architecture' },
              { id: 'data-architecture', title: 'Data Architecture' },
              { id: 'ai-architecture', title: 'AI Architecture' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'advanced',
    roots: [
      {
        id: 'high-availability-dr',
        title: 'High Availability & Disaster Recovery',
        summary: 'Availability zones, regions and recovery strategies.',
        level: 'advanced',
        children: [
          {
            id: 'availability-concepts',
            title: 'Availability Concepts',
            children: [
              { id: 'sla-availability', title: 'SLAs & Availability Targets' },
              { id: 'rto-rpo', title: 'RTO & RPO' },
              { id: 'redundancy-levels', title: 'Redundancy Levels' },
            ],
          },
          {
            id: 'ha-design',
            title: 'High Availability Design',
            children: [
              { id: 'zone-redundancy-ha', title: 'Zone Redundancy' },
              { id: 'load-balancing-ha', title: 'Load Balancing for HA' },
              { id: 'health-monitoring-ha', title: 'Health Monitoring' },
              { id: 'stateless-design', title: 'Stateless Design' },
            ],
          },
          {
            id: 'dr-strategies',
            title: 'Disaster Recovery Strategies',
            children: [
              { id: 'backup-restore-dr', title: 'Backup & Restore' },
              { id: 'pilot-light', title: 'Pilot Light' },
              { id: 'warm-standby', title: 'Warm Standby' },
              { id: 'hot-standby', title: 'Hot Standby / Multi-Site' },
              { id: 'dr-testing', title: 'DR Testing' },
            ],
          },
        ],
      },
      {
        id: 'multi-region-architecture',
        title: 'Multi-Region & Global Architecture',
        summary: 'Active-active, active-passive and global distribution.',
        level: 'advanced',
        children: [
          {
            id: 'multi-region-patterns',
            title: 'Multi-Region Patterns',
            children: [
              { id: 'active-active', title: 'Active-Active' },
              { id: 'active-passive', title: 'Active-Passive' },
              { id: 'region-pairs-architecture', title: 'Region Pairs' },
            ],
          },
          {
            id: 'global-distribution-arch',
            title: 'Global Distribution',
            children: [
              { id: 'global-traffic-routing', title: 'Global Traffic Routing' },
              { id: 'data-replication-strategies', title: 'Data Replication Strategies' },
              { id: 'data-residency', title: 'Data Residency & Sovereignty' },
            ],
          },
          {
            id: 'consistency-and-failover',
            title: 'Consistency & Failover',
            children: [
              { id: 'data-consistency-multiregion', title: 'Data Consistency' },
              { id: 'automated-failover-arch', title: 'Automated Failover' },
              { id: 'split-brain-avoidance', title: 'Split-Brain Avoidance' },
            ],
          },
        ],
      },
      {
        id: 'performance-scalability',
        title: 'Performance & Scalability',
        summary: 'Scaling, caching, partitioning and tuning.',
        level: 'advanced',
        children: [
          {
            id: 'scaling-strategies',
            title: 'Scaling Strategies',
            children: [
              { id: 'vertical-scaling', title: 'Vertical Scaling' },
              { id: 'horizontal-scaling', title: 'Horizontal Scaling' },
              { id: 'autoscaling-strategies', title: 'Autoscaling Strategies' },
            ],
          },
          {
            id: 'performance-techniques',
            title: 'Performance Techniques',
            children: [
              { id: 'caching-strategies', title: 'Caching Strategies' },
              { id: 'cdn-acceleration', title: 'CDN & Acceleration' },
              { id: 'data-partitioning', title: 'Data Partitioning' },
              { id: 'async-processing', title: 'Async Processing' },
              { id: 'connection-pooling', title: 'Connection Pooling' },
            ],
          },
          {
            id: 'performance-testing',
            title: 'Testing & Tuning',
            children: [
              { id: 'load-testing-azure', title: 'Azure Load Testing' },
              { id: 'chaos-engineering', title: 'Chaos Engineering (Chaos Studio)' },
              { id: 'performance-monitoring', title: 'Performance Monitoring' },
            ],
          },
        ],
      },
    ],
  },
  {
    tag: 'certifications-career',
    roots: [
      {
        id: 'azure-certifications',
        title: 'Azure Certifications',
        summary: 'Fundamentals, associate, expert and specialty paths.',
        level: 'beginner',
        children: [
          {
            id: 'fundamentals-certifications',
            title: 'Fundamentals',
            children: [
              { id: 'az-900', title: 'AZ-900: Azure Fundamentals' },
              { id: 'ai-900', title: 'AI-900: AI Fundamentals' },
              { id: 'dp-900', title: 'DP-900: Data Fundamentals' },
              { id: 'sc-900', title: 'SC-900: Security, Compliance & Identity Fundamentals' },
            ],
          },
          {
            id: 'associate-certifications',
            title: 'Associate',
            children: [
              { id: 'az-104', title: 'AZ-104: Azure Administrator' },
              { id: 'az-204', title: 'AZ-204: Azure Developer' },
              { id: 'az-500', title: 'AZ-500: Azure Security Engineer' },
              { id: 'az-700', title: 'AZ-700: Azure Network Engineer' },
              { id: 'ai-102', title: 'AI-102: Azure AI Engineer' },
              { id: 'dp-100', title: 'DP-100: Azure Data Scientist' },
              { id: 'dp-300', title: 'DP-300: Azure Database Administrator' },
              { id: 'dp-700', title: 'DP-700: Fabric Data Engineer' },
            ],
          },
          {
            id: 'expert-certifications',
            title: 'Expert',
            children: [
              { id: 'az-305', title: 'AZ-305: Azure Solutions Architect Expert' },
              { id: 'az-400', title: 'AZ-400: DevOps Engineer Expert' },
            ],
          },
          {
            id: 'specialty-certifications',
            title: 'Specialty',
            children: [
              { id: 'az-140', title: 'AZ-140: Azure Virtual Desktop Specialty' },
              { id: 'dp-420', title: 'DP-420: Cosmos DB Developer Specialty' },
              { id: 'az-800-801', title: 'AZ-800/AZ-801: Windows Server Hybrid' },
            ],
          },
          {
            id: 'exam-preparation',
            title: 'Exam Preparation',
            children: [
              { id: 'exam-format', title: 'Exam Format' },
              { id: 'study-resources-certs', title: 'Study Resources' },
              { id: 'practice-assessments', title: 'Practice Assessments' },
              { id: 'microsoft-applied-skills', title: 'Microsoft Applied Skills' },
            ],
          },
        ],
      },
      {
        id: 'career-paths',
        title: 'Career Paths & Continuous Learning',
        summary: 'Roles, portfolios and staying current.',
        level: 'beginner',
        children: [
          {
            id: 'azure-roles',
            title: 'Azure Roles',
            children: [
              { id: 'cloud-administrator', title: 'Cloud Administrator' },
              { id: 'cloud-developer', title: 'Cloud Developer' },
              { id: 'solutions-architect', title: 'Solutions Architect' },
              { id: 'devops-engineer', title: 'DevOps Engineer' },
              { id: 'security-engineer', title: 'Security Engineer' },
              { id: 'data-engineer', title: 'Data Engineer' },
              { id: 'ai-engineer', title: 'AI Engineer' },
            ],
          },
          {
            id: 'building-experience',
            title: 'Building Experience',
            children: [
              { id: 'hands-on-labs', title: 'Hands-On Labs' },
              { id: 'personal-projects', title: 'Personal Projects' },
              { id: 'github-portfolio', title: 'GitHub Portfolio' },
              { id: 'community-contribution', title: 'Community Contribution' },
            ],
          },
          {
            id: 'staying-current',
            title: 'Staying Current',
            children: [
              { id: 'tracking-azure-updates', title: 'Tracking Azure Updates' },
              { id: 'microsoft-learn-paths', title: 'Microsoft Learn Paths' },
              { id: 'community-events', title: 'Community & Events' },
              { id: 'blogs-newsletters', title: 'Blogs & Newsletters' },
            ],
          },
        ],
      },
    ],
  },
]

function loadExistingIds() {
  const ids = new Set()
  if (!existsSync(TOPICS_DIR)) return ids
  for (const d of readdirSync(TOPICS_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    try {
      const meta = JSON.parse(readFileSync(resolve(TOPICS_DIR, d.name, 'topic.json')))
      ids.add(meta.id)
    } catch {
      // ignore folders without a valid topic.json
    }
  }
  return ids
}

function main() {
  const existing = loadExistingIds()
  let created = 0
  let skipped = 0

  const write = (meta) => {
    if (existing.has(meta.id)) {
      skipped += 1
      return
    }
    const dir = resolve(TOPICS_DIR, meta.id)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'topic.json'), JSON.stringify(meta, null, 2) + '\n')
    existing.add(meta.id)
    created += 1
  }

  for (const stage of STAGES) {
    const tags = [stage.tag]
    stage.roots.forEach((root, ri) => {
      const rootLevel = root.level ?? 'beginner'
      write({
        id: root.id,
        title: root.title,
        summary: root.summary ?? root.title,
        order: ri + 1,
        level: rootLevel,
        tags,
      })

      ;(root.children ?? []).forEach((sub, si) => {
        const subLevel = sub.level ?? rootLevel
        write({
          id: sub.id,
          title: sub.title,
          summary: sub.summary ?? sub.title,
          order: si + 1,
          level: subLevel,
          tags,
          parentId: root.id,
        })

        ;(sub.children ?? []).forEach((leaf, li) => {
          write({
            id: `${sub.id}--${leaf.id}`,
            title: leaf.title,
            order: li + 1,
            level: leaf.level ?? subLevel,
            tags,
            parentId: sub.id,
          })
        })
      })
    })
  }

  console.log(`Azure scaffold: created ${created} topic files, skipped ${skipped} existing.`)
}

main()
