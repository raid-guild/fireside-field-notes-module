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

export const buildJourneyFlair = (leg: number, count = 4): FlairEvent[] => {
  const rng = createRng(leg * 9_871 + 42)
  const spanStart = 8
  const spanEnd = 92
  const span = spanEnd - spanStart

  return Array.from({ length: count }, (_, index) => {
    const bandSize = span / count
    const bandCenter = spanStart + bandSize * index + bandSize * 0.5
    const jitter = (rng() - 0.5) * bandSize * 0.55
    const topPercent = Math.round(Math.min(spanEnd, Math.max(spanStart, bandCenter + jitter)))

    const sideRoll = rng()
    const side: FlairEvent['side'] =
      sideRoll < 0.28 ? 'left' : sideRoll < 0.56 ? 'right' : 'center'
    const kind = FLAIR_KINDS[Math.floor(rng() * FLAIR_KINDS.length)] ?? 'sparkles'
    const laneOffset = 8 + Math.floor(rng() * 16)

    return {
      id: `leg-${leg}-flair-${index}`,
      kind,
      topPercent,
      side,
      laneOffset,
    }
  })
}