import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'nodejs',
  stages: buildDefaultStages({
    subjectName: 'Node.js',
    subjectNoun: 'Node.js services',
    platformNoun: 'Node.js services',
    strategyId: 'enterprise-nodejs-strategy',
  }),
})
