export type FlairKind = 'coins' | 'sparkles' | 'chest' | 'fireball' | 'arrows'

export type FlairEvent = {
  id: string
  kind: FlairKind
  /** Position along the spacer container (0–100), not viewport height */
  topPercent: number
  side: 'left' | 'right' | 'center'
  laneOffset: number
}

const FLAIR_KINDS: FlairKind[] = ['coins', 'sparkles', 'chest', 'fireball', 'arrows']

const createRng = (seed: number) => {
  let state = seed
  return () => {
    state = (state * 16_807 + 1) % 2_147_483_647
    return (state - 1) / 2_147_483_646
  }
}

type BuildJourneyFlairOptions = {
  /** Keep flair in dungeon side lanes — never over cross-cut parchment */
  corridorOnly?: boolean
}

const UPPER_CORRIDOR_BAND = { start: 8, end: 24 }
const LOWER_CORRIDOR_BAND = { start: 76, end: 92 }
const FULL_LEG_BAND = { start: 8, end: 92 }

export const buildJourneyFlair = (
  leg: number,
  count = 4,
  options: BuildJourneyFlairOptions = {},
): FlairEvent[] => {
  const rng = createRng(leg * 9_871 + 42)
  const corridorOnly = options.corridorOnly ?? false
  const bands = corridorOnly ? [UPPER_CORRIDOR_BAND, LOWER_CORRIDOR_BAND] : [FULL_LEG_BAND]

  return Array.from({ length: count }, (_, index) => {
    const band = bands[index % bands.length]
    const bandIndex = Math.floor(index / bands.length)
    const slotsInBand = Math.ceil(count / bands.length)
    const bandSize = (band.end - band.start) / slotsInBand
    const bandCenter = band.start + bandSize * bandIndex + bandSize * 0.5
    const jitter = (rng() - 0.5) * bandSize * 0.55
    const topPercent = Math.round(
      Math.min(band.end, Math.max(band.start, bandCenter + jitter)),
    )

    const sideRoll = rng()
    const side: FlairEvent['side'] = corridorOnly
      ? sideRoll < 0.5
        ? 'left'
        : 'right'
      : sideRoll < 0.28
        ? 'left'
        : sideRoll < 0.56
          ? 'right'
          : 'center'
    const kind = FLAIR_KINDS[Math.floor(rng() * FLAIR_KINDS.length)] ?? 'sparkles'
    const laneOffset = corridorOnly ? 20 + Math.floor(rng() * 12) : 8 + Math.floor(rng() * 16)

    return {
      id: `leg-${leg}-flair-${index}`,
      kind,
      topPercent,
      side,
      laneOffset,
    }
  })
}