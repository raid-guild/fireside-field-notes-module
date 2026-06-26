'use client'

import { PixelSprite } from '@/components/PixelSprite'

type RaiderPathProps = {
  progress: number
  activeIndex: number
  totalStops: number
}

export const RaiderPath = ({ progress, activeIndex, totalStops }: RaiderPathProps) => {
  const clamped = Math.min(1, Math.max(0, progress))
  const raiderLeft = `calc(${clamped * 100}% - ${clamped * 2.5}rem)`

  return (
    <div className="pointer-events-none sticky top-0 z-40 border-b border-trail-border/80 bg-trail-parchment/92 backdrop-blur-md">
      <div
        className="pixel-sprite absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'url(/backgrounds/dungeon-floor-tile.png)',
          backgroundPosition: `${-clamped * 80}px ${-clamped * 40}px`,
          backgroundRepeat: 'repeat',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-3 sm:px-6">
        <div className="mb-2 flex items-center justify-between font-pixel text-sm uppercase tracking-wide text-trail-ink/70">
          <span>Edge trail</span>
          <span>
            Stop {Math.min(activeIndex + 1, totalStops)} / {totalStops}
          </span>
        </div>
        <div className="relative h-14 rounded-lg border border-trail-border/70 bg-trail-panel/70 shadow-inner">
          <div className="path-dots absolute inset-x-4 top-1/2 h-2 -translate-y-1/2 rounded-full" />
          <div
            className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-[88%] drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] transition-[left] duration-150 ease-out motion-reduce:transition-none"
            style={{ left: raiderLeft }}
          >
            <PixelSprite direction="right" label="Your raider" scale={0.95} slug="warrior" />
          </div>
        </div>
      </div>
    </div>
  )
}