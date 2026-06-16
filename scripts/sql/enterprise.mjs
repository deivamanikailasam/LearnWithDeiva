import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'sql',
  stages: buildDefaultStages({
    subjectName: 'SQL',
    subjectNoun: 'SQL databases',
    platformNoun: 'SQL databases',
  }),
})
