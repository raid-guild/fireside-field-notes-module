type ItemSpriteProps = {
  frame: 'ham' | 'chest-closed' | 'chest-damaged' | 'chest-open'
  scale?: number
  className?: string
}

const frameIndex: Record<ItemSpriteProps['frame'], number> = {
  ham: 0,
  'chest-closed': 1,
  'chest-damaged': 2,
  'chest-open': 3,
}

export const ItemSprite = ({ frame, scale = 1, className = '' }: ItemSpriteProps) => {
  const index = frameIndex[frame]
  const size = 48 * scale

  return (
    <span
      aria-hidden="true"
      className={`pixel-sprite inline-block ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/sprites/items.png)',
        backgroundPosition: `-${index * 48 * scale}px 0px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${192 * scale}px ${size}px`,
      }}
    />
  )
}