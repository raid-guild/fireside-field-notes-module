export type FlairKind = 'coins' | 'sparkles' | 'chest' | 'fireball' | 'arrows'

export type FlairEvent = {
  id: string
  kind: FlairKind
  topVh: number
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
  const usedTops = new Set<number>()

  return Array.from({ length: count }, (_, index) => {
    let topVh = 0
    for (let attempt = 0; attempt < 8; attempt += 1) {
      topVh = 22 + Math.floor(rng() * 58)
      if (!usedTops.has(topVh)) break
    }
    usedTops.add(topVh)

    const sideRoll = rng()
    const side: FlairEvent['side'] =
      sideRoll < 0.28 ? 'left' : sideRoll < 0.56 ? 'right' : 'center'
    const kind = FLAIR_KINDS[Math.floor(rng() * FLAIR_KINDS.length)] ?? 'sparkles'
    const laneOffset = 8 + Math.floor(rng() * 16)

    return {
      id: `leg-${leg}-flair-${index}`,
      kind,
      topVh,
      side,
      laneOffset,
    }
  })
}