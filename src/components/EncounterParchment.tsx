import type { Encounter } from '@/lib/encounters'
import { formatSessionDate } from '@/lib/encounters'
import { PixelSprite } from '@/components/PixelSprite'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'

type EncounterParchmentProps = {
  encounter: Encounter
  index: number
}

export const EncounterParchment = ({ encounter, index }: EncounterParchmentProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="rounded-2xl border border-trail-border bg-trail-parchment p-4">
            <PixelSprite
              direction={index % 2 === 0 ? 'right' : 'left'}
              label={`${encounter.guestName} as ${encounter.heroArchetype}`}
              scale={1.2}
              slug={encounter.spriteSlug}
            />
          </div>
          <p className="font-pixel text-sm uppercase tracking-wide text-trail-moss">{encounter.heroArchetype}</p>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-pixel text-sm uppercase tracking-[0.15em] text-trail-ink/65">
            Stop {index + 1} · {formatSessionDate(encounter.startsAt)}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-trail-ink">{encounter.guestName}</h2>
          {encounter.bio ? (
            <p className="mt-3 text-base leading-7 text-trail-ink/80">{encounter.bio}</p>
          ) : null}

          <div className="dialog-tail relative mt-6 rounded-2xl border border-trail-border bg-trail-parchment p-6">
            <p className="text-lg leading-8 text-trail-ink">{encounter.hook}</p>
          </div>

          <ul className="mt-6 space-y-3">
            {encounter.highlights.map((highlight) => (
              <li
                className="rounded-xl border border-trail-border bg-trail-parchment px-4 py-3 text-base leading-7 text-trail-ink"
                key={highlight.text}
              >
                {highlight.text}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {encounter.tags.map((tag) => (
              <span
                className="rounded-full border border-trail-border px-3 py-1 font-pixel text-sm text-trail-ink/65"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {encounter.media.recapYouTubeId ? (
        <div>
          <p className="mb-3 font-pixel text-sm uppercase tracking-wide text-trail-ink/60">Recap</p>
          <YouTubeEmbed title={`${encounter.guestName} fireside recap`} videoId={encounter.media.recapYouTubeId} />
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-trail-border px-4 py-3 text-sm text-trail-ink/60">
          Recap video not linked yet — check the session page for updates.
        </p>
      )}

      <EncounterLinks encounter={encounter} />
    </div>
  )
}

export const EncounterLinks = ({ encounter }: { encounter: Encounter }) => {
  const sharedLinks = encounter.links.shared ?? []

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <p className="mb-2 font-pixel text-xs uppercase tracking-[0.16em] text-trail-ink/50">
          Session links
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          {encounter.media.fullInterviewURL ? (
            <a
              className="text-trail-accent underline-offset-4 hover:underline"
              href={encounter.media.fullInterviewURL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Watch full interview →
            </a>
          ) : null}
          <a
            className="text-trail-ink/75 underline-offset-4 hover:text-trail-ink hover:underline"
            href={encounter.links.eventURL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Session page
          </a>
          {encounter.links.posts.map((post) => (
            <a
              className="text-trail-ink/75 underline-offset-4 hover:text-trail-ink hover:underline"
              href={post.url}
              key={post.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {post.title}
            </a>
          ))}
        </div>
      </div>

      {sharedLinks.length > 0 ? (
        <div>
          <p className="mb-2 font-pixel text-xs uppercase tracking-[0.16em] text-trail-ink/50">
            Shared links
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            {sharedLinks.map((link) => (
              <a
                className="text-trail-ink/75 underline-offset-4 hover:text-trail-ink hover:underline"
                href={link.url}
                key={link.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
