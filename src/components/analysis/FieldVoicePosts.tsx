import { jumpToGuest } from '@/components/analysis/jumpToGuest'
import { xCampSectionLabels, type XResearchPost } from '@/lib/xPostResearch'

type FieldVoicePostsProps = {
  posts: XResearchPost[]
}

const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const excerpt = (text: string, max = 220) => {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= max) return normalized
  return `${normalized.slice(0, max).trimEnd()}…`
}

export const FieldVoicePosts = ({ posts }: FieldVoicePostsProps) => {
  if (posts.length === 0) return null

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map((post) => (
        <article
          className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-5"
          key={post.id}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-trail-accent/35 px-2 py-0.5 font-pixel text-[10px] uppercase tracking-wide text-trail-accent">
              {xCampSectionLabels[post.campSection] ?? post.campSection}
            </span>
            <span className="font-pixel text-[10px] text-trail-parchment/50">{formatPostDate(post.createdAt)}</span>
          </div>

          <p className="mt-3 font-display text-base font-semibold text-trail-parchment">
            {post.authorDisplayName}{' '}
            <span className="font-normal text-trail-parchment/60">{post.authorHandle}</span>
          </p>

          <p className="mt-3 text-sm leading-7 text-trail-parchment/85">{excerpt(post.text)}</p>

          <p className="mt-3 text-xs leading-6 text-trail-parchment/60">{post.whySelected}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              className="font-pixel text-xs text-trail-accent transition-colors hover:text-trail-parchment"
              href={post.url}
              rel="noreferrer"
              target="_blank"
            >
              View on X ↗
            </a>
            {post.pairsWithEncounterSlug ? (
              <button
                className="font-pixel text-xs text-trail-moss transition-colors hover:text-trail-parchment"
                onClick={() => jumpToGuest(post.pairsWithEncounterSlug!)}
                type="button"
              >
                → Paired guest
              </button>
            ) : null}
            <span className="font-pixel text-[10px] text-trail-parchment/45">
              {post.metrics.likes} likes · {post.metrics.reposts} reposts
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}