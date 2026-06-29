import type { CSSProperties } from 'react'

export type FlairSpriteFrame = 'coin' | 'sparkle' | 'fireball' | 'arrow'

type FlairSpriteProps = {
  frame: FlairSpriteFrame
  scale?: number
  className?: string
  style?: CSSProperties
}

const frameIndex: Record<FlairSpriteFrame, number> = {
  coin: 0,
  sparkle: 1,
  fireball: 2,
  arrow: 3,
}

const BASE_SIZE = 48

export const FlairSprite = ({ frame, scale = 1, className = '', style }: FlairSpriteProps) => {
  const index = frameIndex[frame]
  const size = BASE_SIZE * scale

  return (
    <span
      aria-hidden="true"
      className={`pixel-sprite inline-block ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/sprites/flair-items.png)',
        backgroundPosition: `-${index * BASE_SIZE * scale}px 0px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${BASE_SIZE * 4 * scale}px ${size}px`,
        ...style,
      }}
    />
  )
}