import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'kubernetes',
  stages: buildDefaultStages({
    subjectName: 'Kubernetes',
    subjectNoun: 'Kubernetes workloads',
    platformNoun: 'Kubernetes workloads',
  }),
})
