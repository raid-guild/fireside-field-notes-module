import raw from '../../content/industry-signals.json'

export type IndustrySourceType =
  | 'survey'
  | 'research-rct'
  | 'research-survey'
  | 'executive-claim'
  | 'thought-leader'

export type IndustryMetric = {
  label: string
  value: string
  context?: string
}

export type IndustrySignal = {
  id: string
  sourceType: IndustrySourceType
  speaker: string
  organization: string
  publishedAt: string
  headline: string
  metrics: IndustryMetric[]
  quote: string | null
  opinion: string
  primaryUrl: string
  secondaryUrl?: string
  pairsWithThroughLine: string
  pairsWithCohortEncounter: string
  campUse: string
  campSection: string
  caveats: string[]
}

export type CohortContrastPair = {
  cohortClaim: string
  cohortVoice: string
  industrySignalId: string
  contrastNote: string
}

export type IndustrySignalsData = {
  meta: {
    researchedAt: string
    purpose: string
    note: string
  }
  recommendedForCamp: string[]
  signals: IndustrySignal[]
  cohortContrastPairs: CohortContrastPair[]
}

export const industrySignalsData = raw as IndustrySignalsData

export const industrySourceLabels: Record<IndustrySourceType, string> = {
  survey: 'Survey',
  'research-rct': 'RCT',
  'research-survey': 'Research survey',
  'executive-claim': 'Executive claim',
  'thought-leader': 'Industry opinion',
}