import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'certifications',
  rootStartOrder: 61,
  tree: [
    {
      id: 'certification-paths',
      title: 'AWS Certification Paths',
      summary: 'Foundational, associate, professional and specialty.',
      level: 'beginner',
      children: [
        {
          id: 'foundational-certs',
          title: 'Foundational',
          children: [
            { id: 'cloud-practitioner', title: 'Cloud Practitioner (CLF-C02)' },
            { id: 'ai-practitioner', title: 'AI Practitioner (AIF-C01)' },
          ],
        },
        {
          id: 'associate-certs',
          title: 'Associate',
          children: [
            { id: 'solutions-architect-associate', title: 'Solutions Architect – Associate (SAA)' },
            { id: 'developer-associate', title: 'Developer – Associate (DVA)' },
            { id: 'sysops-administrator-associate', title: 'SysOps Administrator – Associate (SOA)' },
            { id: 'data-engineer-associate', title: 'Data Engineer – Associate (DEA)' },
            { id: 'machine-learning-associate', title: 'Machine Learning Engineer – Associate (MLA)' },
          ],
        },
        {
          id: 'professional-certs',
          title: 'Professional',
          children: [
            { id: 'solutions-architect-professional', title: 'Solutions Architect – Professional (SAP)' },
            { id: 'devops-engineer-professional', title: 'DevOps Engineer – Professional (DOP)' },
          ],
        },
        {
          id: 'specialty-certs',
          title: 'Specialty',
          children: [
            { id: 'advanced-networking-specialty', title: 'Advanced Networking – Specialty (ANS)' },
            { id: 'security-specialty', title: 'Security – Specialty (SCS)' },
            { id: 'machine-learning-specialty', title: 'Machine Learning – Specialty (MLS)' },
          ],
        },
        {
          id: 'choosing-cert-path',
          title: 'Choosing a Path',
          children: [
            { id: 'cert-by-role', title: 'Certifications by Role' },
            { id: 'cert-prerequisites', title: 'Order & Prerequisites' },
            { id: 'cert-recertification', title: 'Validity & Recertification' },
          ],
        },
      ],
    },
    {
      id: 'exam-preparation',
      title: 'Exam Preparation',
      summary: 'Study resources, practice and strategy.',
      level: 'beginner',
      children: [
        {
          id: 'study-resources',
          title: 'Study Resources',
          children: [
            { id: 'exam-guides', title: 'Exam Guides & Blueprints' },
            { id: 'aws-skill-builder', title: 'AWS Skill Builder' },
            { id: 'whitepapers-faqs', title: 'Whitepapers & FAQs' },
            { id: 'documentation-study', title: 'AWS Documentation' },
            { id: 'third-party-courses', title: 'Third-Party Courses' },
          ],
        },
        {
          id: 'practice-hands-on',
          title: 'Practice & Hands-On',
          children: [
            { id: 'practice-exams', title: 'Practice Exams' },
            { id: 'free-tier-labs', title: 'Free Tier Labs' },
            { id: 'workshops', title: 'AWS Workshops' },
            { id: 'sandbox-environments', title: 'Sandbox Environments' },
          ],
        },
        {
          id: 'exam-strategy',
          title: 'Exam Strategy',
          children: [
            { id: 'question-types', title: 'Question Types' },
            { id: 'time-management-exam', title: 'Time Management' },
            { id: 'elimination-techniques', title: 'Answer Elimination Techniques' },
            { id: 'exam-logistics', title: 'Scheduling & Logistics (Online vs Center)' },
          ],
        },
      ],
    },
    {
      id: 'career-community',
      title: 'Career & Community',
      summary: 'Roles, hands-on practice and staying current.',
      level: 'beginner',
      children: [
        {
          id: 'cloud-career-paths',
          title: 'Cloud Career Paths',
          children: [
            { id: 'solutions-architect-role', title: 'Solutions Architect' },
            { id: 'cloud-engineer-role', title: 'Cloud / DevOps Engineer' },
            { id: 'sysops-sre-role', title: 'SysOps & SRE' },
            { id: 'data-ml-roles', title: 'Data & ML Roles' },
            { id: 'security-engineer-role', title: 'Cloud Security Engineer' },
          ],
        },
        {
          id: 'building-experience',
          title: 'Building Experience',
          children: [
            { id: 'personal-projects', title: 'Personal Projects' },
            { id: 'portfolio-architecture', title: 'Architecture Portfolio' },
            { id: 'open-source-contributions', title: 'Open Source Contributions' },
            { id: 'home-lab', title: 'Building a Home Lab' },
          ],
        },
        {
          id: 'staying-current',
          title: 'Staying Current',
          children: [
            { id: 'aws-blogs', title: 'AWS Blogs & Whats New' },
            { id: 're-invent', title: 're:Invent & re:Inforce' },
            { id: 'aws-community', title: 'AWS Community Builders & Heroes' },
            { id: 'user-groups', title: 'User Groups & Meetups' },
            { id: 'newsletters-podcasts', title: 'Newsletters & Podcasts' },
          ],
        },
      ],
    },
  ],
})
