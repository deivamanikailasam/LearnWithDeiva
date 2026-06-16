import { addEnterpriseStages } from '../_shared/enterpriseAdditions.mjs'
import { buildDefaultStages } from '../_shared/enterpriseTemplate.mjs'

addEnterpriseStages({
  subjectId: 'gen-ai',
  stages: buildDefaultStages({
    subjectName: 'GenAI',
    subjectNoun: 'GenAI applications',
    platformNoun: 'GenAI applications',
    strategyId: 'enterprise-genai-strategy',
  }),
})
