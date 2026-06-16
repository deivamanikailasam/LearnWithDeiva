import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'nextjs',
  stages: buildDefaultStages({
    subjectName: 'Next.js',
    subjectNoun: 'Next.js applications',
    platformNoun: 'Next.js applications',
    strategyId: 'enterprise-nextjs-strategy',
  }),
})
