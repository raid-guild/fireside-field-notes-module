import type { Encounter } from '@/lib/encounters'
import { crossCutByInsertIndex, type CrossCutQuestion } from '@/lib/crossCut'

export type JourneyNpcSegment = {
  kind: 'npc'
  encounter: Encounter
  encounterIndex: number
}

export type JourneyCrossCutSegment = {
  kind: 'cross-cut'
  question: CrossCutQuestion
  afterEncounterIndex: number
}

export type JourneySegment = JourneyNpcSegment | JourneyCrossCutSegment

export const buildJourneySegments = (encounters: Encounter[]): JourneySegment[] => {
  const segments: JourneySegment[] = []

  encounters.forEach((encounter, encounterIndex) => {
    segments.push({ kind: 'npc', encounter, encounterIndex })

    const crossCut = crossCutByInsertIndex[encounterIndex]
    if (crossCut) {
      segments.push({
        kind: 'cross-cut',
        question: crossCut,
        afterEncounterIndex: encounterIndex,
      })
    }
  })

  return segments
}

export const countNpcSegments = (segments: JourneySegment[]) =>
  segments.filter((segment): segment is JourneyNpcSegment => segment.kind === 'npc').length