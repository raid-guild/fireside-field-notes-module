type ExpeditionFooterProps = {
  threadURL: string
}

const PORTAL_JOIN_URL = 'https://portal.raidguild.org/join'
const HIRE_URL = 'https://raidguild.ai/'

export const ExpeditionFooter = ({ threadURL }: ExpeditionFooterProps) => {
  return (
    <footer className="relative z-30 border-t border-trail-border bg-trail-parchment px-4 py-14 sm:px-6 sm:py-20" id="keep-going">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl border border-trail-border bg-trail-panel p-8 shadow-panel sm:p-10">
          <p className="font-pixel text-sm uppercase tracking-[0.2em] text-trail-accent">Keep going</p>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-trail-ink sm:text-3xl">
            This trail is the field notes — the Portal is where the guild keeps working.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-trail-ink/75">
            Log into RaidGuild Portal for full session threads, wiki research, briefs, and the live activity
            hub as new firesides publish. Public for now — no login required to read this report.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              className="inline-flex items-center justify-center rounded-full border-2 border-trail-accent bg-trail-accent px-6 py-3 font-pixel text-base text-white transition-colors hover:bg-trail-accent/90"
              href={PORTAL_JOIN_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Join Portal — dive deeper
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border-2 border-trail-border bg-trail-parchment px-6 py-3 font-pixel text-base text-trail-ink transition-colors hover:border-trail-accent/50 hover:text-trail-accent"
              href={HIRE_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Hire RaidGuild
            </a>
          </div>
        </section>

        <div className="mt-10 text-center text-sm text-trail-ink/60">
          <p>Edge Report · Field Experience from the Edge · June 2026 cohort</p>
          <p className="mt-3">
            <a className="underline-offset-4 hover:text-trail-accent hover:underline" href={threadURL}>
              Cohort thread on Portal
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}