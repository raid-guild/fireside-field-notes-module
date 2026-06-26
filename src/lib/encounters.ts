import raw from '../../content/encounters.json'

export type Highlight = {
  text: string
  source: string
  verifiedQuote?: boolean
}

export type SessionMedia = {
  recapYouTubeId: string | null
  fullInterviewURL: string | null
}

export type Encounter = {
  eventId: number
  guestName: string
  slug: string
  startsAt: string
  npcArchetype: string
  spriteSlug: string
  bio?: string
  hook: string
  highlights: Highlight[]
  tags: string[]
  media: SessionMedia
  links: {
    eventURL: string
    posts: Array<{ title: string; url: string }>
  }
}

export type ThroughLine = {
  id: string
  title: string
  summary: string
}

export type ExpeditionData = {
  meta: {
    title: string
    subtitle: string
    sessionCount: number
    threadURL: string
  }
  throughLines: ThroughLine[]
  encounters: Encounter[]
}

export const expeditionData = raw as ExpeditionData

export const formatSessionDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))