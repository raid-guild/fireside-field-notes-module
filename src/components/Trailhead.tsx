import type { ExpeditionData } from '@/lib/encounters'
import { PixelSprite } from '@/components/PixelSprite'

type TrailheadProps = {
  meta: ExpeditionData['meta']
}

export const Trailhead = ({ meta }: TrailheadProps) => {
  return (
    <section className="relative overflow-hidden border-b border-trail-border bg-trail-panel/80 px-4 py-16 sm:px-6 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/backgrounds/adventure-map-background.webp)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="font-pixel text-lg uppercase tracking-[0.2em] text-trail-accent">Field report</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-trail-ink sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-trail-ink/80">{meta.subtitle}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-trail-ink/70">
            {meta.sessionCount} ~30-minute fireside interviews with RaidGuild members and adjacent builders.
            Scroll the trail to meet each guest, watch recap clips, and read what surfaced across sessions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-pixel text-base">
            <span className="rounded-full border border-trail-border bg-trail-parchment px-4 py-2">
              {meta.sessionCount} sessions
            </span>
            <span className="rounded-full border border-trail-border bg-trail-parchment px-4 py-2">
              20+ field notes
            </span>
            <span className="rounded-full border border-trail-border bg-trail-parchment px-4 py-2">
              June 2026 cohort
            </span>
          </div>
          <a
            className="mt-8 inline-flex items-center gap-2 font-medium text-trail-accent underline-offset-4 hover:underline"
            href={meta.threadURL}
            rel="noopener noreferrer"
            target="_blank"
          >
            View cohort thread on Portal
          </a>
        </div>
        <div className="flex flex-col items-center justify-end gap-4 rounded-2xl border border-trail-border bg-trail-parchment/80 p-8 shadow-panel">
          <PixelSprite direction="down" label="Raider preview" scale={1.35} slug="warrior" />
          <p className="text-center font-pixel text-lg text-trail-ink/75">Your raider walks the path above as you scroll.</p>
        </div>
      </div>
    </section>
  )
}