import type { WikiCompanion } from '@/lib/xPostResearch'

type WikiFurtherReadingProps = {
  companions: WikiCompanion[]
}

const throughLineLabels: Record<string, string> = {
  'context-crisis': 'Context crisis',
  'community-tooling': 'Community tooling',
  verification: 'Verification',
  'open-source': 'Open source',
  'bottleneck-shift': 'Bottleneck shift',
  'education-pressure': 'Education pressure',
}

export const WikiFurtherReading = ({ companions }: WikiFurtherReadingProps) => {
  if (companions.length === 0) return null

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {companions.map((companion) => (
        <li key={companion.wikiUrl}>
          <a
            className="group block rounded-xl border border-trail-parchment/15 bg-trail-parchment/5 p-4 transition-colors hover:border-trail-accent/35 hover:bg-trail-parchment/8"
            href={companion.wikiUrl}
            rel="noreferrer"
            target="_blank"
          >
            <p className="font-pixel text-[10px] uppercase tracking-wide text-trail-accent/80">
              {throughLineLabels[companion.throughLine] ?? companion.throughLine}
            </p>
            <p className="mt-2 font-display text-base font-semibold text-trail-parchment group-hover:text-trail-accent">
              {companion.wikiTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-trail-parchment/70">{companion.reason}</p>
          </a>
        </li>
      ))}
    </ul>
  )
}