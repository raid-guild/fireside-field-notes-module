import type { AnalysisStatCard } from '@/lib/analysisCamp'

type StatCardProps = {
  card: AnalysisStatCard
}

export const StatCard = ({ card }: StatCardProps) => {
  return (
    <article className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-5">
      <p className="font-pixel text-3xl leading-none text-trail-accent sm:text-4xl">{card.value}</p>
      <h3 className="mt-3 font-display text-lg font-semibold text-trail-parchment">{card.label}</h3>
      {card.detail ? <p className="mt-2 text-sm leading-6 text-trail-parchment/65">{card.detail}</p> : null}
    </article>
  )
}