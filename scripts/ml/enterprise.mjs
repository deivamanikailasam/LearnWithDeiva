import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'machine-learning',
  stages: buildDefaultStages({
    subjectName: 'Machine Learning',
    subjectNoun: 'ML systems',
    platformNoun: 'ML systems',
    strategyId: 'enterprise-ml-strategy',
  }),
})
