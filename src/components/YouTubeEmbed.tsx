'use client'

import { useEffect, useRef, useState } from 'react'

type YouTubeEmbedProps = {
  videoId: string
  title: string
}

export const YouTubeEmbed = ({ videoId, title }: YouTubeEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-trail-border bg-black/5 shadow-panel" ref={containerRef}>
      <div className="relative aspect-video w-full">
        {shouldLoad ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-trail-ink/5 font-pixel text-lg text-trail-ink/60">
            Loading recap…
          </div>
        )}
      </div>
    </div>
  )
}