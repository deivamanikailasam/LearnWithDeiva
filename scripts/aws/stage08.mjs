import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'security',
  rootStartOrder: 22,
  tree: [
    {
      id: 'data-protection',
      title: 'Data Protection & Encryption',
      summary: 'KMS, CloudHSM, Secrets Manager and certificates.',
      level: 'intermediate',
      children: [
        {
          id: 'encryption-fundamentals',
          title: 'Encryption Fundamentals',
          children: [
            { id: 'encryption-at-rest', title: 'Encryption at Rest' },
            { id: 'encryption-in-transit', title: 'Encryption in Transit' },
            { id: 'symmetric-asymmetric', title: 'Symmetric vs Asymmetric Keys' },
            { id: 'envelope-encryption', title: 'Envelope Encryption' },
          ],
        },
        {
          id: 'aws-kms',
          title: 'AWS KMS',
          children: [
            { id: 'kms-overview', title: 'KMS Overview' },
            { id: 'customer-managed-keys', title: 'Customer Managed Keys' },
            { id: 'aws-managed-owned-keys', title: 'AWS Managed & Owned Keys' },
            { id: 'key-policies', title: 'Key Policies & Grants' },
            { id: 'key-rotation-kms', title: 'Key Rotation' },
            { id: 'multi-region-keys', title: 'Multi-Region Keys' },
          ],
        },
        {
          id: 'cloudhsm',
          title: 'AWS CloudHSM',
          children: [
            { id: 'cloudhsm-overview', title: 'CloudHSM Overview' },
            { id: 'cloudhsm-vs-kms', title: 'CloudHSM vs KMS' },
            { id: 'cloudhsm-use-cases', title: 'Use Cases' },
          ],
        },
        {
          id: 'secrets-management',
          title: 'Secrets & Certificates',
          children: [
            { id: 'secrets-manager', title: 'AWS Secrets Manager' },
            { id: 'secrets-rotation', title: 'Automatic Secret Rotation' },
            { id: 'parameter-store', title: 'SSM Parameter Store' },
            { id: 'acm', title: 'AWS Certificate Manager (ACM)' },
            { id: 'private-ca', title: 'AWS Private CA' },
          ],
        },
      ],
    },
    {
      id: 'threat-detection-protection',
      title: 'Threat Detection & Protection',
      summary: 'GuardDuty, Inspector, WAF, Shield and Macie.',
      level: 'advanced',
      children: [
        {
          id: 'threat-detection-services',
          title: 'Threat Detection',
          children: [
            { id: 'guardduty', title: 'Amazon GuardDuty' },
            { id: 'inspector', title: 'Amazon Inspector' },
            { id: 'detective', title: 'Amazon Detective' },
            { id: 'macie', title: 'Amazon Macie' },
          ],
        },
        {
          id: 'edge-protection',
          title: 'Edge & Application Protection',
          children: [
            { id: 'aws-waf', title: 'AWS WAF' },
            { id: 'aws-shield', title: 'AWS Shield (Standard & Advanced)' },
            { id: 'firewall-manager', title: 'AWS Firewall Manager' },
            { id: 'ddos-protection', title: 'DDoS Protection' },
          ],
        },
        {
          id: 'security-posture-management',
          title: 'Security Posture Management',
          children: [
            { id: 'security-hub', title: 'AWS Security Hub' },
            { id: 'config-security', title: 'AWS Config for Security' },
            { id: 'trusted-advisor-security', title: 'Trusted Advisor Security Checks' },
            { id: 'well-architected-security', title: 'Security Pillar Reviews' },
          ],
        },
        {
          id: 'incident-response',
          title: 'Incident Response & Forensics',
          children: [
            { id: 'incident-response-process', title: 'Incident Response Process' },
            { id: 'automated-remediation', title: 'Automated Remediation' },
            { id: 'forensics-isolation', title: 'Forensics & Isolation' },
          ],
        },
      ],
    },
    {
      id: 'app-identity-compliance',
      title: 'Application Identity & Compliance',
      summary: 'Cognito, compliance programs and auditing.',
      level: 'advanced',
      children: [
        {
          id: 'amazon-cognito',
          title: 'Amazon Cognito',
          children: [
            { id: 'cognito-overview', title: 'Cognito Overview' },
            { id: 'user-pools', title: 'User Pools' },
            { id: 'identity-pools', title: 'Identity Pools' },
            { id: 'cognito-social-saml', title: 'Social & SAML Login' },
            { id: 'cognito-app-integration', title: 'App Integration & JWT Tokens' },
          ],
        },
        {
          id: 'directory-services',
          title: 'Directory Services',
          children: [
            { id: 'managed-microsoft-ad', title: 'AWS Managed Microsoft AD' },
            { id: 'ad-connector', title: 'AD Connector' },
            { id: 'simple-ad', title: 'Simple AD' },
          ],
        },
        {
          id: 'compliance-governance',
          title: 'Compliance & Governance',
          children: [
            { id: 'compliance-programs', title: 'Compliance Programs (SOC, PCI, HIPAA)' },
            { id: 'artifact', title: 'AWS Artifact' },
            { id: 'audit-manager', title: 'AWS Audit Manager' },
            { id: 'data-residency', title: 'Data Residency & Sovereignty' },
            { id: 'control-tower-compliance', title: 'Governance with Control Tower' },
          ],
        },
        {
          id: 'security-best-practices',
          title: 'Security Best Practices',
          children: [
            { id: 'defense-in-depth', title: 'Defense in Depth' },
            { id: 'zero-trust', title: 'Zero Trust on AWS' },
            { id: 'security-automation', title: 'Security Automation' },
            { id: 'secure-account-baseline', title: 'Secure Account Baseline' },
          ],
        },
      ],
    },
  ],
})
