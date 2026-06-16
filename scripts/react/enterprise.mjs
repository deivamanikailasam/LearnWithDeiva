import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'react',
  stages: buildDefaultStages({
    subjectName: 'React',
    subjectNoun: 'React applications',
    platformNoun: 'React applications',
  }),
})
