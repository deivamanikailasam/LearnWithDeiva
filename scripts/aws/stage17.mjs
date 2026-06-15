import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'migration',
  rootStartOrder: 49,
  tree: [
    {
      id: 'migration-strategy',
      title: 'Migration Strategy & Assessment',
      summary: 'Migration strategies and planning tools.',
      level: 'advanced',
      children: [
        {
          id: 'migration-fundamentals',
          title: 'Migration Fundamentals',
          children: [
            { id: 'why-migrate', title: 'Why Migrate to the Cloud?' },
            { id: 'migration-phases', title: 'Migration Phases' },
            { id: 'cloud-adoption-framework', title: 'AWS Cloud Adoption Framework (CAF)' },
            { id: 'migration-readiness', title: 'Migration Readiness Assessment' },
          ],
        },
        {
          id: 'seven-rs',
          title: 'The 7 Rs of Migration',
          children: [
            { id: 'rehost', title: 'Rehost (Lift & Shift)' },
            { id: 'replatform', title: 'Replatform' },
            { id: 'repurchase', title: 'Repurchase' },
            { id: 'refactor', title: 'Refactor / Re-architect' },
            { id: 'relocate', title: 'Relocate' },
            { id: 'retain', title: 'Retain' },
            { id: 'retire', title: 'Retire' },
          ],
        },
        {
          id: 'discovery-planning',
          title: 'Discovery & Planning',
          children: [
            { id: 'migration-hub', title: 'AWS Migration Hub' },
            { id: 'application-discovery-service', title: 'Application Discovery Service' },
            { id: 'migration-evaluator', title: 'Migration Evaluator (TSO Logic)' },
            { id: 'portfolio-assessment', title: 'Portfolio Assessment' },
          ],
        },
      ],
    },
    {
      id: 'migration-services',
      title: 'Migration Services',
      summary: 'MGN, DMS and Application Migration.',
      level: 'advanced',
      children: [
        {
          id: 'server-migration',
          title: 'Server Migration',
          children: [
            { id: 'application-migration-service', title: 'AWS Application Migration Service (MGN)' },
            { id: 'elastic-disaster-recovery', title: 'Elastic Disaster Recovery (DRS)' },
            { id: 'vm-import-export', title: 'VM Import/Export' },
          ],
        },
        {
          id: 'database-migration',
          title: 'Database Migration',
          children: [
            { id: 'dms-migration', title: 'AWS Database Migration Service (DMS)' },
            { id: 'sct-migration', title: 'Schema Conversion Tool (SCT)' },
            { id: 'dms-replication', title: 'Continuous Replication (CDC)' },
            { id: 'homogeneous-vs-heterogeneous', title: 'Homogeneous vs Heterogeneous' },
          ],
        },
        {
          id: 'app-refactoring',
          title: 'Application Refactoring',
          children: [
            { id: 'refactor-spaces', title: 'AWS Migration Hub Refactor Spaces' },
            { id: 'app2container', title: 'AWS App2Container' },
            { id: 'strangler-fig-pattern', title: 'Strangler Fig Pattern' },
          ],
        },
        {
          id: 'specialized-migrations',
          title: 'Specialized Migrations',
          children: [
            { id: 'mainframe-modernization', title: 'Mainframe Modernization' },
            { id: 'vmware-migration', title: 'VMware Migration' },
            { id: 'windows-migration', title: 'Windows Workload Migration' },
          ],
        },
      ],
    },
    {
      id: 'data-transfer-services',
      title: 'Data Transfer Services',
      summary: 'DataSync, Transfer Family and Snow Family.',
      level: 'intermediate',
      children: [
        {
          id: 'online-data-transfer',
          title: 'Online Data Transfer',
          children: [
            { id: 'datasync', title: 'AWS DataSync' },
            { id: 'transfer-family', title: 'AWS Transfer Family (SFTP/FTPS/FTP)' },
            { id: 's3-transfer-acceleration-migration', title: 'S3 Transfer Acceleration' },
            { id: 'direct-connect-transfer', title: 'Direct Connect for Transfer' },
          ],
        },
        {
          id: 'offline-data-transfer',
          title: 'Offline Data Transfer',
          children: [
            { id: 'snowball-transfer', title: 'AWS Snowball Edge' },
            { id: 'snowcone-transfer', title: 'AWS Snowcone' },
            { id: 'snowmobile-transfer', title: 'AWS Snowmobile' },
            { id: 'choosing-transfer-method', title: 'Choosing a Transfer Method' },
          ],
        },
        {
          id: 'hybrid-data-services',
          title: 'Hybrid Data Services',
          children: [
            { id: 'storage-gateway-migration', title: 'Storage Gateway for Migration' },
            { id: 'datasync-hybrid', title: 'DataSync for Hybrid' },
            { id: 'backup-migration', title: 'Backup-Based Migration' },
          ],
        },
      ],
    },
  ],
})
