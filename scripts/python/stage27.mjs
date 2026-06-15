import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'security',
  rootStartOrder: 102,
  tree: [
    {
      id: 'secure-coding',
      title: 'Secure Coding',
      summary: 'Input validation and common pitfalls.',
      level: 'advanced',
      children: [
        {
          id: 'input-validation',
          title: 'Input Validation',
          children: [
            { id: 'validating-input', title: 'Validating Input' },
            { id: 'sanitization', title: 'Sanitization' },
            { id: 'schema-validation-security', title: 'Schema Validation' },
          ],
        },
        {
          id: 'safe-practices',
          title: 'Safe Practices',
          children: [
            { id: 'avoiding-eval', title: 'Avoiding eval & exec' },
            { id: 'safe-deserialization', title: 'Safe Deserialization' },
            { id: 'safe-file-handling', title: 'Safe File Handling' },
          ],
        },
        {
          id: 'secrets-handling',
          title: 'Secrets Handling',
          children: [
            { id: 'environment-secrets', title: 'Environment Variables' },
            { id: 'secret-managers', title: 'Secret Managers' },
            { id: 'avoiding-hardcoded-secrets', title: 'Avoiding Hardcoded Secrets' },
          ],
        },
      ],
    },
    {
      id: 'cryptography',
      title: 'Cryptography & Secrets',
      summary: 'Hashing, encryption and secrets management.',
      level: 'advanced',
      children: [
        {
          id: 'hashing',
          title: 'Hashing',
          children: [
            { id: 'hashlib', title: 'hashlib' },
            { id: 'password-hashing', title: 'Password Hashing' },
            { id: 'hmac', title: 'HMAC' },
          ],
        },
        {
          id: 'encryption',
          title: 'Encryption',
          children: [
            { id: 'symmetric-encryption', title: 'Symmetric Encryption' },
            { id: 'asymmetric-encryption', title: 'Asymmetric Encryption' },
            { id: 'cryptography-library', title: 'The cryptography Library' },
          ],
        },
        {
          id: 'secure-random',
          title: 'Secure Randomness',
          children: [
            { id: 'secrets-module', title: 'The secrets Module' },
            { id: 'tokens', title: 'Generating Tokens' },
          ],
        },
      ],
    },
    {
      id: 'common-vulnerabilities',
      title: 'Common Vulnerabilities',
      summary: 'Injection, deserialization and dependencies.',
      level: 'advanced',
      children: [
        {
          id: 'injection',
          title: 'Injection Attacks',
          children: [
            { id: 'sql-injection', title: 'SQL Injection' },
            { id: 'command-injection', title: 'Command Injection' },
            { id: 'path-traversal', title: 'Path Traversal' },
          ],
        },
        {
          id: 'deserialization-vulns',
          title: 'Deserialization Risks',
          children: [
            { id: 'pickle-vulnerabilities', title: 'Pickle Vulnerabilities' },
            { id: 'yaml-load-vulns', title: 'Unsafe YAML Loading' },
          ],
        },
        {
          id: 'dependency-security',
          title: 'Dependency Security',
          children: [
            { id: 'vulnerable-dependencies', title: 'Vulnerable Dependencies' },
            { id: 'supply-chain', title: 'Supply Chain Risks' },
            { id: 'scanning-tools', title: 'Scanning Tools' },
          ],
        },
        {
          id: 'web-vulnerabilities',
          title: 'Web Vulnerabilities',
          children: [
            { id: 'xss', title: 'XSS' },
            { id: 'csrf', title: 'CSRF' },
            { id: 'ssrf', title: 'SSRF' },
          ],
        },
      ],
    },
  ],
})
