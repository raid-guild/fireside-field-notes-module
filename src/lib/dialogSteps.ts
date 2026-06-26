import type { Encounter } from '@/lib/encounters'


export type DialogStep =
  | {
      id: string
      kind: 'greeting'
      greeting: string
      bio: string
    }
  | {
      id: string
      kind: 'highlight'
      text: string
      number: number
      total: number
    }
  | {
      id: string
      kind: 'recap'
      videoId: string
    }
  | {
      id: string
      kind: 'recap-missing'
    }
  | {
      id: string
      kind: 'links'
    }

export const buildDialogSteps = (encounter: Encounter, greeting: string): DialogStep[] => {
  const bio = encounter.bio ?? encounter.hook
  const steps: DialogStep[] = [
    {
      id: 'greeting',
      kind: 'greeting',
      greeting,
      bio,
    },
    ...encounter.highlights.map((highlight, index) => ({
      id: `highlight-${index}`,
      kind: 'highlight' as const,
      text: highlight.text,
      number: index + 1,
      total: encounter.highlights.length,
    })),
  ]

  if (encounter.media.recapYouTubeId) {
    steps.push({
      id: 'recap',
      kind: 'recap',
      videoId: encounter.media.recapYouTubeId,
    })
  } else {
    steps.push({ id: 'recap-missing', kind: 'recap-missing' })
  }

  steps.push({ id: 'links', kind: 'links' })

  return steps
}