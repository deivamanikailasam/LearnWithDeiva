import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'python',
  stages: buildDefaultStages({
    subjectName: 'Python',
    subjectNoun: 'Python applications',
    platformNoun: 'Python applications',
  }),
})
