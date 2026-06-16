/**
 * Part 10 (gap-fill #2): a few more commonly-used items missed in part 9.
 *  - Cloud KMS / HSM (cryptographic key management at scale)
 *  - K8s-centric observability & debugging tools (Coroot, Komodor, Robusta, Kubeshark)
 *  - API tooling (Buf, Connect RPC, Smithy)
 *  - Detection engineering (Sigma, YARA, Atomic Red Team, CALDERA, Stratus Red Team)
 *  - DevOps community / standards bodies (CDF, OpenSSF cross-ref, OpenInfra)
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* Cloud KMS / HSM — under secrets-management */
  {
    id: 'cloud-kms-hsm',
    title: 'Cloud KMS & HSM',
    parentId: 'secrets-management',
    children: [
      { id: 'aws-kms', title: 'AWS KMS' },
      { id: 'aws-cloudhsm', title: 'AWS CloudHSM' },
      { id: 'azure-key-vault-hsm', title: 'Azure Key Vault Managed HSM' },
      { id: 'gcp-cloud-kms', title: 'GCP Cloud KMS' },
      { id: 'gcp-cloud-hsm', title: 'GCP Cloud HSM' },
      { id: 'oracle-cloud-kms', title: 'OCI Vault & Key Management' },
      { id: 'hashicorp-vault-transit', title: 'HashiCorp Vault Transit Engine' },
      { id: 'yubihsm', title: 'YubiHSM 2' },
      { id: 'thales-luna-hsm', title: 'Thales Luna HSM' },
      { id: 'entrust-nshield', title: 'Entrust nShield' },
      { id: 'envelope-encryption', title: 'Envelope Encryption Pattern' },
      { id: 'byok-hyok', title: 'BYOK & HYOK Patterns' },
    ],
  },

  /* K8s-centric observability & debugging tools — under observability-fundamentals */
  {
    id: 'k8s-debugging-tools',
    title: 'Kubernetes Debugging & Live-Ops Tools',
    parentId: 'observability-fundamentals',
    children: [
      { id: 'coroot', title: 'Coroot' },
      { id: 'komodor', title: 'Komodor' },
      { id: 'robusta-dev', title: 'Robusta' },
      { id: 'kubeshark', title: 'Kubeshark' },
      { id: 'kubectl-debug', title: 'kubectl debug' },
      { id: 'crane-tool', title: 'Crane (go-containerregistry)' },
      { id: 'kubescape-cli', title: 'Kubescape' },
      { id: 'inspektor-gadget-cross', title: 'Inspektor Gadget (Cross-Reference)' },
    ],
  },

  /* API tooling — under api-gateways */
  {
    id: 'modern-api-tooling',
    title: 'Modern API Tooling (Protobuf, Connect, Smithy)',
    parentId: 'api-gateways',
    children: [
      { id: 'buf-build', title: 'Buf CLI & Schema Registry' },
      { id: 'connect-rpc', title: 'Connect RPC (Buf)' },
      { id: 'smithy-cli', title: 'Smithy (AWS API Model)' },
      { id: 'grpc-web', title: 'gRPC-Web' },
      { id: 'twirp-protocol', title: 'Twirp' },
      { id: 'protoc-gen-tools', title: 'protoc / protoc-gen plugins' },
      { id: 'asyncapi-generator', title: 'AsyncAPI Generator' },
      { id: 'openapi-generator-cli', title: 'OpenAPI Generator CLI' },
    ],
  },

  /* Detection engineering — under runtime-security */
  {
    id: 'detection-engineering',
    title: 'Detection Engineering',
    parentId: 'runtime-security',
    children: [
      { id: 'sigma-rules', title: 'Sigma Rules' },
      { id: 'yara-rules', title: 'YARA Rules' },
      { id: 'atomic-red-team', title: 'Atomic Red Team (Red Canary)' },
      { id: 'mitre-caldera', title: 'MITRE CALDERA' },
      { id: 'stratus-red-team', title: 'Stratus Red Team (DataDog)' },
      { id: 'mitre-attack-framework', title: 'MITRE ATT&CK Framework' },
      { id: 'mitre-d3fend', title: 'MITRE D3FEND' },
      { id: 'osquery-detection', title: 'osquery (Detection)' },
      { id: 'velociraptor-dfir', title: 'Velociraptor (DFIR)' },
    ],
  },

  /* Community / standards bodies — under continuous-learning */
  {
    id: 'devops-standards-bodies',
    title: 'DevOps Standards & Foundations',
    parentId: 'continuous-learning',
    children: [
      { id: 'cdf-foundation', title: 'CD Foundation (CDF)' },
      { id: 'openssf-cross-ref-continuous', title: 'OpenSSF (Cross-Reference)' },
      { id: 'cncf-cross-ref-continuous', title: 'CNCF (Cross-Reference)' },
      { id: 'openinfra-foundation', title: 'OpenInfra Foundation' },
      { id: 'iso-iec-jtc1-sc42', title: 'ISO/IEC JTC 1/SC 42 (AI)' },
      { id: 'eclipse-foundation-edge', title: 'Eclipse Foundation' },
      { id: 'finops-foundation-cross', title: 'FinOps Foundation (Cross-Reference)' },
      { id: 'cloud-security-alliance', title: 'Cloud Security Alliance (CSA)' },
      { id: 'open-application-model-org', title: 'OAM Community' },
      { id: 'agile-alliance', title: 'Agile Alliance' },
    ],
  },
])
