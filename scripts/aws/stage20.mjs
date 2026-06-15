import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'advanced',
  rootStartOrder: 58,
  tree: [
    {
      id: 'multi-account-governance',
      title: 'Multi-Account & Governance at Scale',
      summary: 'Control Tower, Landing Zone and guardrails.',
      level: 'advanced',
      children: [
        {
          id: 'multi-account-strategy',
          title: 'Multi-Account Strategy',
          children: [
            { id: 'why-multi-account', title: 'Why Multiple Accounts?' },
            { id: 'account-structure-design', title: 'Account Structure Design' },
            { id: 'ou-design', title: 'Organizational Unit Design' },
            { id: 'account-vending', title: 'Account Vending & Automation' },
          ],
        },
        {
          id: 'control-tower',
          title: 'AWS Control Tower',
          children: [
            { id: 'control-tower-overview', title: 'Control Tower Overview' },
            { id: 'landing-zone', title: 'Landing Zone' },
            { id: 'guardrails-controls', title: 'Guardrails / Controls' },
            { id: 'account-factory', title: 'Account Factory' },
            { id: 'customizations-cfct', title: 'Customizations (CfCT)' },
          ],
        },
        {
          id: 'governance-at-scale',
          title: 'Governance at Scale',
          children: [
            { id: 'scps-governance', title: 'Service Control Policies' },
            { id: 'resource-control-policies', title: 'Resource Control Policies' },
            { id: 'config-aggregation-governance', title: 'Config Aggregation' },
            { id: 'centralized-logging', title: 'Centralized Logging' },
            { id: 'tag-policies', title: 'Tag Policies' },
          ],
        },
        {
          id: 'shared-services',
          title: 'Shared Services & Access',
          children: [
            { id: 'resource-access-manager', title: 'Resource Access Manager (RAM)' },
            { id: 'centralized-networking', title: 'Centralized Networking Account' },
            { id: 'centralized-security-account', title: 'Centralized Security Account' },
            { id: 'cross-account-access-patterns', title: 'Cross-Account Access Patterns' },
          ],
        },
      ],
    },
    {
      id: 'advanced-networking',
      title: 'Advanced Networking',
      summary: 'Transit Gateway, PrivateLink and multi-VPC.',
      level: 'advanced',
      children: [
        {
          id: 'network-topology',
          title: 'Network Topology at Scale',
          children: [
            { id: 'transit-gateway-advanced', title: 'Transit Gateway' },
            { id: 'transit-gateway-peering', title: 'Inter-Region TGW Peering' },
            { id: 'hub-and-spoke', title: 'Hub-and-Spoke Topology' },
            { id: 'shared-vpc-advanced', title: 'Shared VPC' },
            { id: 'ip-address-management', title: 'IPAM (IP Address Manager)' },
          ],
        },
        {
          id: 'private-connectivity',
          title: 'Private Connectivity',
          children: [
            { id: 'privatelink-advanced', title: 'AWS PrivateLink' },
            { id: 'vpc-endpoint-services', title: 'VPC Endpoint Services' },
            { id: 'interface-gateway-endpoints', title: 'Interface vs Gateway Endpoints' },
            { id: 'private-dns', title: 'Private DNS & Hybrid DNS' },
          ],
        },
        {
          id: 'network-security-advanced',
          title: 'Advanced Network Security',
          children: [
            { id: 'network-firewall-advanced', title: 'Network Firewall' },
            { id: 'dns-firewall', title: 'Route 53 Resolver DNS Firewall' },
            { id: 'traffic-mirroring', title: 'Traffic Mirroring' },
            { id: 'gwlb-inspection', title: 'GWLB Inspection Architecture' },
          ],
        },
        {
          id: 'network-performance',
          title: 'Network Performance',
          children: [
            { id: 'placement-groups-networking', title: 'Placement Groups & Cluster Networking' },
            { id: 'efa', title: 'Elastic Fabric Adapter (EFA)' },
            { id: 'global-accelerator-advanced', title: 'Global Accelerator' },
            { id: 'network-monitoring', title: 'Network Monitoring & Reachability' },
          ],
        },
      ],
    },
    {
      id: 'edge-hybrid-emerging',
      title: 'Edge, Hybrid & Emerging',
      summary: 'Outposts, Local Zones, IoT and emerging services.',
      level: 'advanced',
      children: [
        {
          id: 'hybrid-cloud-advanced',
          title: 'Hybrid Cloud',
          children: [
            { id: 'outposts-advanced', title: 'AWS Outposts' },
            { id: 'local-zones-advanced', title: 'AWS Local Zones' },
            { id: 'wavelength-advanced', title: 'AWS Wavelength' },
            { id: 'ecs-eks-anywhere', title: 'ECS & EKS Anywhere' },
          ],
        },
        {
          id: 'edge-computing',
          title: 'Edge Computing',
          children: [
            { id: 'iot-greengrass', title: 'AWS IoT Greengrass' },
            { id: 'snowball-edge-compute', title: 'Snowball Edge Compute' },
            { id: 'cloudfront-compute', title: 'Edge Compute (CloudFront/Lambda@Edge)' },
          ],
        },
        {
          id: 'iot-services',
          title: 'IoT Services',
          children: [
            { id: 'iot-core', title: 'AWS IoT Core' },
            { id: 'iot-device-management', title: 'IoT Device Management' },
            { id: 'iot-analytics', title: 'IoT Analytics' },
            { id: 'iot-sitewise', title: 'IoT SiteWise' },
          ],
        },
        {
          id: 'emerging-services',
          title: 'Emerging & Specialized',
          children: [
            { id: 'quantum-braket', title: 'Amazon Braket (Quantum)' },
            { id: 'robotics-robomaker', title: 'AWS RoboMaker' },
            { id: 'satellite-ground-station', title: 'AWS Ground Station' },
            { id: 'media-services', title: 'Media Services (Elemental)' },
            { id: 'gamelift', title: 'Amazon GameLift' },
          ],
        },
      ],
    },
  ],
})
