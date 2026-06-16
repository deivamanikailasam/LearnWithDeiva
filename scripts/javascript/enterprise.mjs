import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'javascript',
  stages: buildDefaultStages({
    subjectName: 'JavaScript',
    subjectNoun: 'JavaScript applications',
    platformNoun: 'JavaScript applications',
    strategyId: 'enterprise-javascript-strategy',
  }),
})
