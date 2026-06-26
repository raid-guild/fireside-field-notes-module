import raw from '../../content/x-post-research.json'

export type XPostSourceType = 'raidguild' | 'adjacent-builder' | 'industry'

export type XResearchPost = {
  id: string
  url: string
  authorHandle: string
  authorDisplayName: string
  createdAt: string
  text: string
  sourceType: XPostSourceType
  pairsWithThroughLine: string
  pairsWithEncounterSlug: string | null
  whySelected: string
  hasMedia: boolean
  outboundLinks: string[]
  metrics: { likes: number; reposts: number; replies: number }
  embedRecommended: boolean
  campSection: string
}

export type WikiCompanion = {
  throughLine: string
  wikiTitle: string
  wikiUrl: string
  reason: string
}

export type XPostResearchData = {
  recommendedEmbeds: string[]
  posts: XResearchPost[]
  wikiCompanion: WikiCompanion[]
}

export const xPostResearchData = raw as XPostResearchData

export const xCampSectionLabels: Record<string, string> = {
  'field-voice': 'Field voice',
  'wider-discourse': 'Wider discourse',
  'further-reading': 'Further reading',
}