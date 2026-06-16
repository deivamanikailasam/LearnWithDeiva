import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'docker',
  stages: buildDefaultStages({
    subjectName: 'Docker',
    subjectNoun: 'Docker workloads',
    platformNoun: 'containerized Docker workloads',
  }),
})
