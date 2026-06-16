import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'nosql',
  stages: buildDefaultStages({
    subjectName: 'NoSQL',
    subjectNoun: 'NoSQL data systems',
    platformNoun: 'NoSQL data systems',
  }),
})
