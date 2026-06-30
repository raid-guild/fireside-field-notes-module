'use client'

import { useEffect, useRef, useState } from 'react'

import type { FlairEvent } from '@/lib/journeyFlair'
import { FlairSprite } from '@/components/FlairSprite'
import { ItemSprite } from '@/components/ItemSprite'

type JourneyFlairEventProps = {
  event: FlairEvent
}

const SPARK_OFFSETS = [
  { tx: '0px', ty: '-36px' },
  { tx: '26px', ty: '-26px' },
  { tx: '38px', ty: '0px' },
  { tx: '26px', ty: '26px' },
  { tx: '0px', ty: '36px' },
  { tx: '-26px', ty: '26px' },
  { tx: '-38px', ty: '0px' },
  { tx: '-26px', ty: '-26px' },
]

const COIN_OFFSETS = [
  { tx: '0px', ty: '-24px', rot: '8deg' },
  { tx: '22px', ty: '-13px', rot: '-14deg' },
  { tx: '30px', ty: '5px', rot: '22deg' },
  { tx: '12px', ty: '22px', rot: '-6deg' },
  { tx: '-10px', ty: '24px', rot: '16deg' },
  { tx: '-26px', ty: '8px', rot: '-18deg' },
  { tx: '-23px', ty: '-11px', rot: '10deg' },
]

export const JourneyFlairEvent = ({ event }: JourneyFlairEventProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true)
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 0px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const positionStyle =
    event.side === 'center'
      ? { left: '50%', top: `${event.topPercent}%` }
      : event.side === 'left'
        ? { left: `calc(50% - ${event.laneOffset}%)`, top: `${event.topPercent}%` }
        : { left: `calc(50% + ${event.laneOffset}%)`, top: `${event.topPercent}%` }

  return (
    <div
      className={`journey-flair pointer-events-none absolute z-0 ${
        event.side === 'center' ? 'journey-flair-center' : ''
      } ${revealed ? 'journey-flair-revealed' : ''}`}
      data-kind={event.kind}
      ref={nodeRef}
      style={positionStyle}
    >
      {event.kind === 'coins' ? <CoinsFlair /> : null}
      {event.kind === 'sparkles' ? <SparklesFlair /> : null}
      {event.kind === 'chest' ? <ChestFlair /> : null}
      {event.kind === 'fireball' ? <FireballFlair side={event.side} /> : null}
      {event.kind === 'arrows' ? <ArrowsFlair side={event.side} /> : null}
    </div>
  )
}

const CoinsFlair = () => (
  <div className="flair-coins">
    {COIN_OFFSETS.map((offset, i) => (
      <span
        className="flair-particle-track flair-particle-track-coin"
        key={i}
        style={{
          ['--i' as string]: i,
          ['--tx' as string]: offset.tx,
          ['--ty' as string]: offset.ty,
          ['--rot' as string]: offset.rot,
        }}
      >
        <FlairSprite frame="coin" scale={0.55} />
      </span>
    ))}
  </div>
)

const SparklesFlair = () => (
  <div className="flair-sparkles">
    {SPARK_OFFSETS.map((offset, i) => (
      <span
        className="flair-particle-track flair-particle-track-sparkle"
        key={i}
        style={{
          ['--i' as string]: i,
          ['--tx' as string]: offset.tx,
          ['--ty' as string]: offset.ty,
        }}
      >
        <FlairSprite frame="sparkle" scale={0.5} />
      </span>
    ))}
  </div>
)

const ChestFlair = () => (
  <div className="flair-chest">
    <ItemSprite className="flair-chest-closed" frame="chest-closed" scale={1.2} />
    <ItemSprite className="flair-chest-open" frame="chest-open" scale={1.2} />
    <div className="flair-chest-sparkles">
      {SPARK_OFFSETS.slice(0, 5).map((offset, i) => (
        <span
          className="flair-particle-track flair-particle-track-sparkle flair-particle-track-sparkle-small"
          key={i}
          style={{
            ['--i' as string]: i,
            ['--tx' as string]: offset.tx,
            ['--ty' as string]: offset.ty,
          }}
        >
          <FlairSprite frame="sparkle" scale={0.38} />
        </span>
      ))}
    </div>
  </div>
)

const FireballFlair = ({ side }: { side: FlairEvent['side'] }) => (
  <div className={`flair-fireball ${side === 'right' ? 'flair-fireball-right' : ''}`}>
    <FlairSprite className="flair-sprite-fireball" frame="fireball" scale={0.95} />
  </div>
)

const ArrowsFlair = ({ side }: { side: FlairEvent['side'] }) => {
  const shootFromRight = side === 'right'

  return (
    <div className={`flair-arrows ${shootFromRight ? 'flair-arrows-right' : 'flair-arrows-left'}`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          className={`flair-arrow-track ${shootFromRight ? 'flair-arrow-track-right' : 'flair-arrow-track-left'}`}
          key={i}
          style={{ ['--i' as string]: i }}
        >
          <FlairSprite frame="arrow" flipX={!shootFromRight} scale={0.65} />
        </span>
      ))}
    </div>
  )
}
