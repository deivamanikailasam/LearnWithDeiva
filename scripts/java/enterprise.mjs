import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'java',
  stages: buildDefaultStages({
    subjectName: 'Java',
    subjectNoun: 'Java applications',
    platformNoun: 'Java applications',
  }),
})
