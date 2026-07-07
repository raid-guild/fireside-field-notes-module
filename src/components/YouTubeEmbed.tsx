'use client'

import { useEffect, useRef, useState } from 'react'

type YouTubeEmbedProps = {
  videoId: string
  title: string
}

const pauseIframe = (iframe: HTMLIFrameElement) => {
  iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*')
}

export const YouTubeEmbed = ({ videoId, title }: YouTubeEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        if (entry.isIntersecting) {
          setShouldLoad(true)
          return
        }

        if (iframeRef.current) {
          pauseIframe(iframeRef.current)
        }
      },
      { rootMargin: '80px', threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-trail-border bg-black/5 shadow-panel" ref={containerRef}>
      <div className="relative aspect-video min-h-[220px] w-full sm:min-h-0">
        {shouldLoad ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1`}
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
