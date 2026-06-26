type SpriteDirection = 'down' | 'up' | 'left' | 'right'

const frameByDirection: Record<SpriteDirection, number> = {
  down: 0,
  up: 1,
  left: 2,
  right: 3,
}

type PixelSpriteProps = {
  slug: string
  direction?: SpriteDirection
  label: string
  scale?: number
  className?: string
}

export const PixelSprite = ({
  slug,
  direction = 'right',
  label,
  scale = 1,
  className = '',
}: PixelSpriteProps) => {
  const frame = frameByDirection[direction]
  const width = 54 * scale
  const height = 68 * scale

  return (
    <span
      aria-hidden="true"
      className={`pixel-sprite inline-block ${className}`}
      style={{
        width,
        height,
        backgroundImage: `url(/sprites/characters/${slug}.png)`,
        backgroundPosition: `-${frame * 54 * scale}px 0px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${540 * scale}px ${height}px`,
      }}
      title={label}
    />
  )
}