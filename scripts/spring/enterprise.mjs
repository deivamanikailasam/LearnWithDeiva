import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'spring',
  stages: buildDefaultStages({
    subjectName: 'Spring',
    subjectNoun: 'Spring applications',
    platformNoun: 'Spring applications',
  }),
})
