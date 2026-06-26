'use client'

import { useSyncExternalStore } from 'react'

const subscribeReducedMotion = (onStoreChange: () => void) => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

const getReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type ParallaxDungeonProps = {
  scrollY: number
}

export const ParallaxDungeon = ({ scrollY }: ParallaxDungeonProps) => {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const ySlow = reducedMotion ? 0 : scrollY * 0.08
  const yMid = reducedMotion ? 0 : scrollY * 0.18
  const yFast = reducedMotion ? 0 : scrollY * 0.32
  const yDrift = reducedMotion ? 0 : scrollY * 0.05

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-dungeon-deep">
      <div
        className="dungeon-layer dungeon-floor-a pixel-sprite absolute inset-[-20%] opacity-40"
        style={{ transform: `translate3d(0, ${-ySlow}px, 0)` }}
      />
      <div
        className="dungeon-layer dungeon-floor-b pixel-sprite absolute inset-[-20%] opacity-25"
        style={{ transform: `translate3d(0, ${-yMid}px, 0)` }}
      />
      <div
        className="dungeon-layer dungeon-ambient pixel-sprite absolute inset-[-30%] opacity-[0.08]"
        style={{ transform: `translate3d(0, ${-yDrift}px, 0)` }}
      />
      <div
        className="dungeon-layer dungeon-wall dungeon-wall-left pixel-sprite absolute bottom-[-10%] top-[-10%] w-28 opacity-70 sm:w-36"
        style={{ transform: `translate3d(0, ${-yFast}px, 0)` }}
      />
      <div
        className="dungeon-layer dungeon-wall dungeon-wall-right pixel-sprite absolute bottom-[-10%] top-[-10%] w-28 opacity-70 sm:w-36"
        style={{ transform: `translate3d(0, ${-yFast}px, 0) scaleX(-1)` }}
      />
      <div className="dungeon-corridor absolute inset-y-0 left-1/2 w-32 -translate-x-1/2 sm:w-40" />
      <div className="dungeon-content-well absolute inset-y-0 left-1/2 w-full max-w-5xl -translate-x-1/2" />
      <div className="dungeon-vignette absolute inset-0" />
      <div className="dungeon-readability-fade absolute inset-0" />
    </div>
  )
}