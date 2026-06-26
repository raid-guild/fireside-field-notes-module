import { analysisCuratedData, type HighlightTone } from '@/lib/analysisCurated'
import type { Encounter } from '@/lib/encounters'
import { formatSessionDate } from '@/lib/encounters'

export type GuestLens =
  | 'education'
  | 'engineering'
  | 'consulting'
  | 'product'
  | 'operations'
  | 'community'
  | 'orchestration'

export const guestLensLabels: Record<GuestLens, string> = {
  education: 'Education & craft',
  engineering: 'Engineering & review',
  consulting: 'Consulting & client work',
  product: 'Product & networks',
  operations: 'Operations & domain QA',
  community: 'Community & alignment',
  orchestration: 'Agents & orchestration',
}

/** Editorial lens buckets — see docs/analysis-camp.md */
export const guestLensBySlug: Record<string, GuestLens> = {
  'spencer-graham': 'engineering',
  'adam-kerpelman': 'education',
  'justice-conder': 'engineering',
  elco: 'orchestration',
  'cj-miller': 'education',
  'andrej-berlin': 'community',
  'victor-ginelli': 'engineering',
  '0xhunter': 'consulting',
  'jake-winckowski': 'operations',
  'graven-prest': 'product',
  'travis-mccutcheon': 'operations',
  'bill-warren': 'product',
  'sara-brown': 'operations',
}

export type AnalysisStatCard = {
  id: string
  value: string
  label: string
  detail?: string
}

export type ThemeFrequencyRow = {
  tag: string
  label: string
  sessionCount: number
  guests: Array<{ slug: string; guestName: string }>
}

export type GuestLensRow = {
  lens: GuestLens
  label: string
  sessionCount: number
  guests: string[]
}

export type ToolMentionRow = {
  id: string
  label: string
  kind: 'tool' | 'process'
  sessionCount: number
  guests: Array<{ slug: string; guestName: string }>
}

export type ToneSplit = {
  tone: HighlightTone
  label: string
  count: number
  percent: number
}

export type OutputFunnelStep = {
  id: string
  label: string
  count: number
  percent: number
}

export type OutputFunnelGuest = {
  slug: string
  guestName: string
  hasFieldNote: boolean
  hasRecap: boolean
  hasFullInterview: boolean
}

export type PublicationLagRow = {
  slug: string
  guestName: string
  lagDays: number
  lagLabel: string
  sessionDate: string
  publishedDate: string
}

export type AnalysisCampData = {
  statCards: AnalysisStatCard[]
  themeFrequency: ThemeFrequencyRow[]
  guestLens: GuestLensRow[]
  toolMentions: ToolMentionRow[]
  toneSplit: ToneSplit[]
  outputFunnel: OutputFunnelStep[]
  outputFunnelGuests: OutputFunnelGuest[]
  publicationLag: PublicationLagRow[]
  medianPublicationLagDays: number | null
}

export const formatTagLabel = (tag: string) =>
  tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const researchSpanDays = (encounters: Encounter[]) => {
  const timestamps = encounters.map((encounter) => new Date(encounter.startsAt).getTime())
  const min = Math.min(...timestamps)
  const max = Math.max(...timestamps)
  const days = Math.round((max - min) / (1000 * 60 * 60 * 24)) + 1
  const start = formatSessionDate(new Date(min).toISOString())
  const end = formatSessionDate(new Date(max).toISOString())

  return { days, start, end }
}

const toneLabels: Record<HighlightTone, string> = {
  leverage: 'Leverage & useful patterns',
  friction: 'Friction & risks',
  open: 'Open questions',
}

const encounterBySlug = (encounters: Encounter[]) =>
  new Map(encounters.map((encounter) => [encounter.slug, encounter]))

const buildToolMentions = (encounters: Encounter[]): ToolMentionRow[] => {
  const bySlug = encounterBySlug(encounters)

  return [...analysisCuratedData.tools]
    .map((tool) => {
      const guests = tool.sessions
        .map((slug) => {
          const encounter = bySlug.get(slug)
          if (!encounter) return null
          return { slug, guestName: encounter.guestName }
        })
        .filter((guest): guest is { slug: string; guestName: string } => guest !== null)

      return {
        id: tool.id,
        label: tool.label,
        kind: tool.kind,
        sessionCount: guests.length,
        guests,
      }
    })
    .sort((a, b) => b.sessionCount - a.sessionCount || a.label.localeCompare(b.label))
}

const buildToneSplit = (encounters: Encounter[]): ToneSplit[] => {
  const totals: Record<HighlightTone, number> = { leverage: 0, friction: 0, open: 0 }

  for (const encounter of encounters) {
    const tones = analysisCuratedData.highlightTones[encounter.slug] ?? []
    for (const tone of tones) {
      totals[tone] += 1
    }
  }

  const total = totals.leverage + totals.friction + totals.open

  return (['leverage', 'friction', 'open'] as HighlightTone[]).map((tone) => ({
    tone,
    label: toneLabels[tone],
    count: totals[tone],
    percent: total > 0 ? Math.round((totals[tone] / total) * 100) : 0,
  }))
}

const buildOutputFunnel = (encounters: Encounter[]) => {
  const sessionCount = encounters.length
  const fieldNoteCount = encounters.filter((encounter) => encounter.links.posts.length > 0).length
  const recapCount = encounters.filter((encounter) => encounter.media.recapYouTubeId).length
  const fullInterviewCount = encounters.filter((encounter) => encounter.media.fullInterviewURL).length

  const steps: OutputFunnelStep[] = [
    {
      id: 'session',
      label: 'Fireside session',
      count: sessionCount,
      percent: 100,
    },
    {
      id: 'field-note',
      label: 'Field note published',
      count: fieldNoteCount,
      percent: Math.round((fieldNoteCount / sessionCount) * 100),
    },
    {
      id: 'recap',
      label: 'Recap video',
      count: recapCount,
      percent: Math.round((recapCount / sessionCount) * 100),
    },
    {
      id: 'full-interview',
      label: 'Full interview link',
      count: fullInterviewCount,
      percent: Math.round((fullInterviewCount / sessionCount) * 100),
    },
  ]

  const guests: OutputFunnelGuest[] = encounters.map((encounter) => ({
    slug: encounter.slug,
    guestName: encounter.guestName,
    hasFieldNote: encounter.links.posts.length > 0,
    hasRecap: Boolean(encounter.media.recapYouTubeId),
    hasFullInterview: Boolean(encounter.media.fullInterviewURL),
  }))

  return { steps, guests }
}

const formatLagLabel = (days: number) => {
  if (days <= 0) return 'Same day'
  if (days === 1) return '1 day'
  return `${days} days`
}

const buildPublicationLag = (encounters: Encounter[]): {
  rows: PublicationLagRow[]
  medianDays: number | null
} => {
  const rows = encounters
    .map((encounter) => {
      const publishedAt = analysisCuratedData.firstPostPublishedAt[encounter.slug]
      if (!publishedAt) return null

      const sessionMs = new Date(encounter.startsAt).getTime()
      const publishedMs = new Date(publishedAt).getTime()
      const lagDays = Math.max(0, Math.round((publishedMs - sessionMs) / (1000 * 60 * 60 * 24)))

      return {
        slug: encounter.slug,
        guestName: encounter.guestName,
        lagDays,
        lagLabel: formatLagLabel(lagDays),
        sessionDate: formatSessionDate(encounter.startsAt),
        publishedDate: formatSessionDate(publishedAt),
      }
    })
    .filter((row): row is PublicationLagRow => row !== null)
    .sort((a, b) => a.lagDays - b.lagDays)

  if (rows.length === 0) {
    return { rows, medianDays: null }
  }

  const midpoint = Math.floor(rows.length / 2)
  const medianDays =
    rows.length % 2 === 0
      ? Math.round((rows[midpoint - 1]!.lagDays + rows[midpoint]!.lagDays) / 2)
      : rows[midpoint]!.lagDays

  return { rows, medianDays }
}

export const buildAnalysisCampData = (encounters: Encounter[]): AnalysisCampData => {
  const sessionCount = encounters.length
  const fieldNoteCount = encounters.reduce((sum, encounter) => sum + encounter.links.posts.length, 0)
  const recapCount = encounters.filter((encounter) => encounter.media.recapYouTubeId).length
  const fullInterviewCount = encounters.filter((encounter) => encounter.media.fullInterviewURL).length
  const uniqueTags = new Set(encounters.flatMap((encounter) => encounter.tags))
  const { days, start, end } = researchSpanDays(encounters)

  const tagMap = new Map<string, Array<{ slug: string; guestName: string }>>()
  for (const encounter of encounters) {
    for (const tag of encounter.tags) {
      const guests = tagMap.get(tag) ?? []
      guests.push({ slug: encounter.slug, guestName: encounter.guestName })
      tagMap.set(tag, guests)
    }
  }

  const themeFrequency = [...tagMap.entries()]
    .map(([tag, guests]) => ({
      tag,
      label: formatTagLabel(tag),
      sessionCount: guests.length,
      guests,
    }))
    .sort((a, b) => b.sessionCount - a.sessionCount || a.label.localeCompare(b.label))
    .slice(0, 10)

  const lensMap = new Map<GuestLens, string[]>()
  for (const encounter of encounters) {
    const lens = guestLensBySlug[encounter.slug]
    if (!lens) continue
    const guests = lensMap.get(lens) ?? []
    guests.push(encounter.guestName.split(' ')[0] ?? encounter.guestName)
    lensMap.set(lens, guests)
  }

  const guestLens = (Object.keys(guestLensLabels) as GuestLens[])
    .map((lens) => ({
      lens,
      label: guestLensLabels[lens],
      sessionCount: lensMap.get(lens)?.length ?? 0,
      guests: lensMap.get(lens) ?? [],
    }))
    .filter((row) => row.sessionCount > 0)
    .sort((a, b) => b.sessionCount - a.sessionCount)

  const statCards: AnalysisStatCard[] = [
    {
      id: 'sessions',
      value: String(sessionCount),
      label: 'Fireside sessions',
      detail: 'June cohort guests on the trail',
    },
    {
      id: 'span',
      value: `${days} days`,
      label: 'Research span',
      detail: `${start} – ${end}`,
    },
    {
      id: 'field-notes',
      value: String(fieldNoteCount),
      label: 'Field notes published',
      detail: 'Portal posts linked from encounters',
    },
    {
      id: 'recaps',
      value: `${recapCount}`,
      label: 'Recap videos',
      detail: `of ${sessionCount} sessions with YouTube recap embeds`,
    },
    {
      id: 'themes',
      value: String(uniqueTags.size),
      label: 'Unique themes tagged',
      detail: 'Curated from session summaries',
    },
    {
      id: 'full-interviews',
      value: `${fullInterviewCount}`,
      label: 'Full interview links',
      detail: `of ${sessionCount} sessions with long-form recordings`,
    },
  ]

  const toolMentions = buildToolMentions(encounters)
  const toneSplit = buildToneSplit(encounters)
  const { steps: outputFunnel, guests: outputFunnelGuests } = buildOutputFunnel(encounters)
  const { rows: publicationLag, medianDays: medianPublicationLagDays } = buildPublicationLag(encounters)

  return {
    statCards,
    themeFrequency,
    guestLens,
    toolMentions,
    toneSplit,
    outputFunnel,
    outputFunnelGuests,
    publicationLag,
    medianPublicationLagDays,
  }
}