import type { Encounter } from '@/lib/encounters'
import {
  industrySignalsData,
  type CohortContrastPair,
  type IndustrySignal,
} from '@/lib/industrySignals'
import { xPostResearchData, type WikiCompanion, type XResearchPost } from '@/lib/xPostResearch'

export type EnrichedContrastPair = {
  cohortClaim: string
  cohortVoice: string
  cohortEncounterSlug: string | null
  contrastNote: string
  industry: IndustrySignal
  barMetrics: Array<{ label: string; value: string; percent: number }>
}

export type ExternalContextData = {
  contrastPairs: EnrichedContrastPair[]
  industrySignals: IndustrySignal[]
  fieldVoicePosts: XResearchPost[]
  wikiCompanions: WikiCompanion[]
}

const parsePercent = (value: string): number | null => {
  const match = value.match(/(\d+(?:\.\d+)?)\s*%/)
  return match ? Number(match[1]) : null
}

const barMetricsFromSignal = (signal: IndustrySignal) =>
  signal.metrics
    .map((metric) => {
      const percent = parsePercent(metric.value)
      if (percent === null) return null
      return { label: metric.label, value: metric.value, percent }
    })
    .filter((row): row is { label: string; value: string; percent: number } => row !== null)
    .slice(0, 3)

const signalById = new Map(industrySignalsData.signals.map((signal) => [signal.id, signal]))

const postById = new Map(xPostResearchData.posts.map((post) => [post.id, post]))

const encounterSlugForVoice = (encounters: Encounter[], voice: string): string | null => {
  const match = encounters.find(
    (encounter) =>
      encounter.guestName === voice ||
      encounter.guestName.startsWith(`${voice} `) ||
      voice.startsWith(encounter.guestName),
  )
  return match?.slug ?? null
}

const enrichContrastPair = (
  pair: CohortContrastPair,
  encounters: Encounter[],
): EnrichedContrastPair | null => {
  const industry = signalById.get(pair.industrySignalId)
  if (!industry) return null

  return {
    cohortClaim: pair.cohortClaim,
    cohortVoice: pair.cohortVoice,
    cohortEncounterSlug: encounterSlugForVoice(encounters, pair.cohortVoice),
    contrastNote: pair.contrastNote,
    industry,
    barMetrics: barMetricsFromSignal(industry),
  }
}

export const buildExternalContextData = (encounters: Encounter[]): ExternalContextData => {
  const contrastPairs = industrySignalsData.cohortContrastPairs
    .map((pair) => enrichContrastPair(pair, encounters))
    .filter((pair): pair is EnrichedContrastPair => pair !== null)

  const industrySignals = industrySignalsData.recommendedForCamp
    .map((id) => signalById.get(id))
    .filter((signal): signal is IndustrySignal => signal !== undefined)

  const fieldVoicePosts = xPostResearchData.recommendedEmbeds
    .map((id) => postById.get(id))
    .filter((post): post is XResearchPost => post !== undefined)

  return {
    contrastPairs,
    industrySignals,
    fieldVoicePosts,
    wikiCompanions: xPostResearchData.wikiCompanion,
  }
}