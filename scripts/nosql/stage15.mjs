import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'security-compliance',
  rootStartOrder: 75,
  tree: [
    {
      id: 'database-authentication',
      title: 'Authentication',
      summary: 'Verifying the identity of users and services accessing the database.',
      level: 'advanced',
      children: [
        {
          id: 'auth-mechanisms',
          title: 'Authentication Mechanisms',
          children: [
            { id: 'password-auth', title: 'Username/Password (SCRAM)' },
            { id: 'certificate-auth', title: 'X.509 Certificate Auth' },
            { id: 'kerberos-ldap', title: 'Kerberos & LDAP' },
            { id: 'iam-auth', title: 'Cloud IAM Authentication' },
            { id: 'token-auth', title: 'Token & API Key Auth' },
          ],
        },
        {
          id: 'identity-federation',
          title: 'Identity & Federation',
          children: [
            { id: 'oauth-oidc-db', title: 'OAuth 2.0 / OIDC' },
            { id: 'sso-db', title: 'Single Sign-On' },
            { id: 'workload-identity', title: 'Workload Identity' },
          ],
        },
      ],
    },
    {
      id: 'authorization-access-control',
      title: 'Authorization & Access Control',
      summary: 'Controlling what authenticated principals can do.',
      level: 'advanced',
      children: [
        {
          id: 'access-control-models',
          title: 'Access Control Models',
          children: [
            { id: 'rbac', title: 'Role-Based Access Control (RBAC)' },
            { id: 'abac', title: 'Attribute-Based Access Control (ABAC)' },
            { id: 'least-privilege', title: 'Principle of Least Privilege' },
          ],
        },
        {
          id: 'fine-grained-access',
          title: 'Fine-Grained Access',
          children: [
            { id: 'collection-table-permissions', title: 'Collection / Table Permissions' },
            { id: 'field-level-security', title: 'Field-Level Security' },
            { id: 'row-document-level-security', title: 'Row / Document-Level Security' },
            { id: 'cell-level-security-sec', title: 'Cell-Level Security' },
          ],
        },
        {
          id: 'app-level-authz',
          title: 'Application-Level Authorization',
          children: [
            { id: 'security-rules-authz', title: 'Security Rules (Firestore)' },
            { id: 'multi-tenant-isolation-sec', title: 'Multi-Tenant Isolation' },
          ],
        },
      ],
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Encryption',
      summary: 'Protecting data at rest, in transit and in use.',
      level: 'advanced',
      children: [
        {
          id: 'encryption-at-rest',
          title: 'Encryption at Rest',
          children: [
            { id: 'storage-encryption', title: 'Storage Encryption' },
            { id: 'key-management-kms', title: 'Key Management (KMS)' },
            { id: 'customer-managed-keys', title: 'Customer-Managed Keys' },
            { id: 'tde', title: 'Transparent Data Encryption (TDE)' },
          ],
        },
        {
          id: 'encryption-in-transit',
          title: 'Encryption in Transit',
          children: [
            { id: 'tls-ssl-db', title: 'TLS/SSL' },
            { id: 'mtls', title: 'Mutual TLS (mTLS)' },
            { id: 'certificate-rotation', title: 'Certificate Rotation' },
          ],
        },
        {
          id: 'advanced-encryption',
          title: 'Advanced Encryption',
          children: [
            { id: 'field-level-encryption', title: 'Field-Level Encryption' },
            { id: 'client-side-encryption', title: 'Client-Side Encryption' },
            { id: 'queryable-encryption-sec', title: 'Queryable Encryption' },
          ],
        },
        {
          id: 'data-privacy',
          title: 'Data Privacy',
          children: [
            { id: 'data-masking', title: 'Data Masking' },
            { id: 'tokenization-privacy', title: 'Tokenization' },
            { id: 'anonymization-pseudonymization', title: 'Anonymization & Pseudonymization' },
            { id: 'pii-handling', title: 'PII Handling' },
          ],
        },
      ],
    },
    {
      id: 'network-security',
      title: 'Network Security',
      summary: 'Securing the network perimeter around the database.',
      level: 'advanced',
      children: [
        {
          id: 'network-isolation',
          title: 'Network Isolation',
          children: [
            { id: 'vpc-private-networking', title: 'VPC & Private Networking' },
            { id: 'firewalls-security-groups', title: 'Firewalls & Security Groups' },
            { id: 'ip-allowlisting', title: 'IP Allowlisting' },
            { id: 'private-endpoints', title: 'Private Endpoints / PrivateLink' },
          ],
        },
        {
          id: 'network-hardening',
          title: 'Hardening',
          children: [
            { id: 'disable-default-ports', title: 'Default Ports & Bind Addresses' },
            { id: 'bastion-hosts', title: 'Bastion Hosts' },
            { id: 'secrets-management', title: 'Secrets Management' },
          ],
        },
      ],
    },
    {
      id: 'nosql-security-threats',
      title: 'Security Threats & Auditing',
      summary: 'Common attacks against NoSQL and how to detect them.',
      level: 'advanced',
      children: [
        {
          id: 'nosql-attacks',
          title: 'Attacks',
          children: [
            { id: 'nosql-injection', title: 'NoSQL Injection' },
            { id: 'unsecured-databases', title: 'Unsecured / Exposed Databases' },
            { id: 'ransomware-attacks', title: 'Ransomware & Data Exfiltration' },
            { id: 'dos-attacks-db', title: 'Denial of Service' },
          ],
        },
        {
          id: 'auditing-monitoring-sec',
          title: 'Auditing & Monitoring',
          children: [
            { id: 'audit-logging', title: 'Audit Logging' },
            { id: 'access-monitoring', title: 'Access Monitoring' },
            { id: 'anomaly-detection-sec', title: 'Anomaly Detection' },
            { id: 'threat-detection-services', title: 'Threat Detection Services' },
          ],
        },
        {
          id: 'security-hardening-checklist',
          title: 'Hardening Best Practices',
          children: [
            { id: 'security-baselines', title: 'Security Baselines' },
            { id: 'patching-updates', title: 'Patching & Updates' },
            { id: 'security-testing-db', title: 'Security Testing' },
          ],
        },
      ],
    },
    {
      id: 'compliance-governance',
      title: 'Compliance & Governance',
      summary: 'Meeting regulatory and data-governance requirements.',
      level: 'advanced',
      children: [
        {
          id: 'regulations',
          title: 'Regulations',
          children: [
            { id: 'gdpr', title: 'GDPR' },
            { id: 'ccpa', title: 'CCPA / CPRA' },
            { id: 'hipaa', title: 'HIPAA' },
            { id: 'pci-dss', title: 'PCI DSS' },
            { id: 'soc2-iso27001', title: 'SOC 2 & ISO 27001' },
          ],
        },
        {
          id: 'data-governance-sec',
          title: 'Data Governance',
          children: [
            { id: 'data-residency', title: 'Data Residency & Sovereignty' },
            { id: 'data-retention-deletion', title: 'Retention & Right to Erasure' },
            { id: 'data-classification', title: 'Data Classification' },
            { id: 'data-lineage', title: 'Data Lineage' },
          ],
        },
      ],
    },
  ],
})
