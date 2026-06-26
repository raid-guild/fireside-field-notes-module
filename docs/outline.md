# Edge Report — Content Outline

Long-form research and narrative module for RaidGuild's June 2026 cohort fireside interviews. The experience is a vertical scroll expedition: a Raider walks a trail at the top of the viewport; each guest appears as an NPC who speaks through sourced session highlights.

## Editorial north star

This is not a single blog recap or a generic AI summary page. It is a **field report** that:

- Preserves session evidence (summaries, quotes, posts, wiki candidates)
- Surfaces **cross-session through-lines** with linked claims
- Uses game presentation (sprites, parallax, dialog) without inventing narrative
- Embeds **YouTube recap** videos when available; links out to **full interview** recordings

Primary audience: RaidGuild members and adjacent builders exploring how people are adapting AI in real work. Secondary audience: public readers if the module visibility allows it.

## Source of truth

### Canonical session list

All sessions are Portal **events** matching:

```txt
title = "June Cohort Fireside Chats (<guest name>)"
```

Do **not** rely on the cohort thread page alone. The thread currently surfaces a subset of past sessions; the full set lives at [portal.raidguild.org/events](https://portal.raidguild.org/events).

**13 sessions** as of 2026-06-26:

| Order | Event ID | Guest | Date (UTC) | Portal |
|------:|---------:|-------|------------|--------|
| 1 | 49 | Spencer Graham | 2026-06-10 | [/events/49](https://portal.raidguild.org/events/49) |
| 2 | 53 | Adam Kerpelman | 2026-06-11 | [/events/53](https://portal.raidguild.org/events/53) |
| 3 | 50 | Justice Conder | 2026-06-11 | [/events/50](https://portal.raidguild.org/events/50) |
| 4 | 51 | Elco | 2026-06-12 | [/events/51](https://portal.raidguild.org/events/51) |
| 5 | 67 | Cj Miller | 2026-06-16 | [/events/67](https://portal.raidguild.org/events/67) |
| 6 | 65 | Andrej Berlin | 2026-06-17 | [/events/65](https://portal.raidguild.org/events/65) |
| 7 | 58 | Victor Ginelli | 2026-06-17 | [/events/58](https://portal.raidguild.org/events/58) |
| 8 | 69 | 0xHunter | 2026-06-23 | [/events/69](https://portal.raidguild.org/events/69) |
| 9 | 68 | Jake Winckowski | 2026-06-23 | [/events/68](https://portal.raidguild.org/events/68) |
| 10 | 52 | Graven Prest | 2026-06-24 | [/events/52](https://portal.raidguild.org/events/52) |
| 11 | 66 | Travis McCutcheon | 2026-06-24 | [/events/66](https://portal.raidguild.org/events/66) |
| 12 | 76 | Bill Warren | 2026-06-25 | [/events/76](https://portal.raidguild.org/events/76) |
| 13 | 59 | Sara Brown | 2026-06-25 | [/events/59](https://portal.raidguild.org/events/59) |

### Per-session artifacts (typical)

| Artifact | Use in module |
|----------|----------------|
| Session summary (Prism) | TL;DR, tags, narrative hook |
| Transcript | Quote verification, highlight cards |
| Angle brief | Editorial framing, blog vs wiki routing |
| Topic map | Wiki / research ledger links |
| Five-highlight recap plan | NPC dialog bullets |
| Published blog post | Deep-read outbound link |
| YouTube recap | **Embedded** player |
| YouTube full interview | **Outbound** link ("Watch full interview") |
| Remotion recap MP4 | Fallback if no YouTube recap |

### Video policy (content)

| Priority | Type | Presentation |
|----------|------|--------------|
| 1 | YouTube recap / highlight / recap clip | Embed in encounter section |
| 2 | YouTube full interview / session recording | Link below embed |
| 3 | `recordingURL` when YouTube | Use as full interview link |
| 4 | Discord adapter recording only | Link as "Session recording" when no YouTube full |
| 5 | Remotion MP4 only | Optional inline video; prefer YouTube recap when both exist |

**Current media coverage** (from Portal event resources, 2026-06-26):

| Guest | Recap embed | Full interview link |
|-------|-------------|---------------------|
| Spencer Graham | [highlight](https://youtu.be/0GrJo-mb70k) | [full](https://youtu.be/GAT4oMhf8Tk) |
| Adam Kerpelman | [highlight](https://youtu.be/PqHWbPfOZmw) | [full](https://youtu.be/LNOk_voJNkg) |
| Justice Conder | [highlight](https://youtu.be/exVWxi4vSBE) | [full](https://youtu.be/-zAISJjU2RQ) |
| Elco | [highlight](https://youtu.be/jBbT-nxAwX4) | [full](https://youtu.be/TYrT7HPUbPg) |
| Cj Miller | [recap clip](https://youtu.be/lGj9YsVIruw) | — |
| Andrej Berlin | [recap](https://youtu.be/0k59966ivMw) | — |
| Victor Ginelli | — | [recording](https://youtu.be/Ds4EZ4Jpt9I) |
| 0xHunter | [recap](https://youtu.be/Y-Xlv84NbTA) | [full](https://youtu.be/iTCxYD5pM4A) |
| Jake Winckowski | [recap](https://youtu.be/nzEe5-Rm3Ic) | [full](https://youtu.be/GbUmUQtjli4) |
| Graven Prest | [recap](https://youtu.be/m02tfKU3azw) | [full](https://youtu.be/U-9XKvwsNrU) |
| Travis McCutcheon | [recap](https://youtu.be/3W6HqjzB6TE) | [full](https://youtu.be/ReRgmFTJtQE) |
| Bill Warren | [recap](https://youtu.be/mYHv8Dcjb64) | [full](https://youtu.be/Fi28v2nRzTE) |
| Sara Brown | — | — (artifacts present; YouTube links pending) |

Refresh this table from Portal before publish. Sara Brown and Victor Ginelli are the main gaps today.

---

## Scroll structure

### Act 0 — Trailhead (1 viewport)

**Purpose:** Orient the reader; establish the research frame.

- **Eyebrow:** Field Experience from the Edge
- **Headline:** How builders are adapting AI in real work
- **Intro:** Short cohort framing — ~30-minute fireside interviews with RaidGuild members and adjacent builders; outputs feed blog posts, recaps, wiki research, and agency strategy. Source: [kickoff post](https://portal.raidguild.org/posts/cohort-fireside-chat-month).
- **Stats strip:** 13 sessions · ~6.5 hours of conversation · 20+ field notes · N recap videos
- **Raider setup:** Player sprite pinned to top path (cosmetic role selection optional)
- **Trail map:** 13 stops; click jumps to encounter (Phase 2)

### Act 1 — The Walk (13 encounter zones)

Chronological order (Jun 10 → Jun 25). Each zone is ~2–3 viewports.

#### Encounter template

Every NPC block uses the same shape:

```txt
[NPC sprite + guest name + role archetype]
Hook line (1 sentence, from angle brief or summary TL;DR)

Dialog highlights (3–5 cards)
  - Short pull quote or paraphrased insight
  - Source label (summary / transcript / highlight plan)
  - Optional: verified quote flag

[Embedded YouTube recap iframe — when available]

Links row
  - Watch full interview → YouTube or recordingURL
  - Read field note → Portal post (when published)
  - Session page → /events/:id
  - Artifacts → summary, angle brief (authenticated or public as appropriate)

Tags (from summary) — feed filters in Act 2
```

#### Suggested NPC role mapping

Cosmetic only; maps guests to existing RaidGuild sprite roster (dashboard map / arcade).

| Guest | NPC archetype | Rationale |
|-------|---------------|-----------|
| Spencer Graham | Scribe | Personal CRM, context systems, documentation |
| Adam Kerpelman | Wizard | Education, assessment, course tooling |
| Justice Conder | Warrior | Engineering identity, friction, moats |
| Elco | Alchemist | Agent orchestration, shared state experiments |
| Cj Miller | Monk | Human edit, craft, premium on judgment |
| Andrej Berlin | Paladin | Alignment, taste, community coordination |
| Victor Ginelli | Ranger | Senior dev as reviewer of machines |
| 0xHunter | Hunter | Consulting, self-hosting, tool walkthroughs |
| Jake Winckowski | Healer | Support workflows, coworker-not-replacement |
| Graven Prest | Druid | Public goods, product, builder relations |
| Travis McCutcheon | Cleric | Cleanup, agent readiness, operational discipline |
| Bill Warren | Tavern Keeper | Protocol networks, product compression |
| Sara Brown | Archer | Ad ops, programmatic QA, domain-specific agents |

#### Per-encounter content seeds

Brief hooks for drafting (from session summaries; expand during curation):

| Guest | Hook | Highlight themes |
|-------|------|------------------|
| Spencer Graham | Personal CRM + doer/reviewer agentic coding | Atomized developer; OSS security; UX QA agents |
| Adam Kerpelman | Proxy collapse in education | Taste vs execution; oral exams; model orchestration |
| Justice Conder | Engineering moved up the stack | Friction as moat; agents in product/engineering |
| Elco | Shared state in agent orchestration | Coordination harness; multi-agent workflows |
| Cj Miller | The premium is the human edit | Creative judgment; AI-assisted production |
| Andrej Berlin | AI shortens alignment, not taste | Community tools; matchmaking over chat |
| Victor Ginelli | Senior dev job is reviewing machines | CLI wrappers; emotional shift; collaboration |
| 0xHunter | Context transfer is the agency bottleneck | Self-hosted software; Codex workflows; client PRs |
| Jake Winckowski | Useful support agent is a coworker | Reviewed automation; domain tooling |
| Graven Prest | Product bottlenecks are moving | Speed vs testing; public goods; should-we decisions |
| Travis McCutcheon | Agent readiness starts with cleanup | Repo hygiene; realistic automation gates |
| Bill Warren | After the prototype, judgment does the work | PRD→prototype compression; scope discipline |
| Sara Brown | First useful ad ops agent is a QA auditor | Domain QA; programmatic workflows |

#### Published field notes (linked where available)

| Guest | Post slug |
|-------|-----------|
| Spencer Graham | `agentic-coding-doer-reviewer-pipeline`, `field-notes-spencer-graham-atomized-developer`, `open-source-security-after-the-bug-finding-boom` |
| Adam Kerpelman | `when-execution-gets-cheap-taste-gets-expensive`, `proxy-collapse-came-for-the-reflection-paper` |
| Justice Conder | `field-notes-fireside-justice-agents-engineering-product-friction`, `without-friction-there-is-no-moat`, `engineering-did-not-end-it-moved-up-the-stack` |
| Elco | `hard-part-agent-orchestration-shared-state` |
| Cj Miller | `fireside-cj-miller-premium-human-edit` |
| Andrej Berlin | `ai-can-shorten-alignment-but-it-cannot-choose-the-taste`, `next-community-tool-matchmaker-not-chat-room` |
| Victor Ginelli | `the-middle-is-easy-now-the-edges-are-the-work` |
| 0xHunter | `context-transfer-is-the-new-agency-bottleneck` |
| Jake Winckowski | `the-first-useful-ai-support-agent-is-a-coworker-not-a-replacement` |
| Graven Prest | `product-bottlenecks-are-moving` |
| Travis McCutcheon | `agent-readiness-starts-with-cleanup-not-magic` |
| Bill Warren | `after-the-prototype-judgment-does-the-work` |
| Sara Brown | `first-useful-ad-ops-agent-qa-auditor` |

---

### Act 2 — Analysis Camp (3–4 viewports)

**Purpose:** Cross-session synthesis and exploratory data views.

#### Section A — Through-line essay

Human-written synthesis (~800–1200 words). Each claim links to ≥2 sessions or posts.

**Eight through-lines** (working set):

1. **Bottleneck shift** — Execution cheap; taste, judgment, QA, distribution, production readiness expensive.
2. **Role change** — Developer → orchestrator/reviewer; PM → prototype author; senior → machine reviewer.
3. **Context crisis** — Shared memory, scoped context, atomized developers, copy-paste between agents.
4. **Verification everywhere** — Frontend QA, oral exams, PR review, support agents as coworkers.
5. **Education under pressure** — Proxy collapse; assessment must move closer to live explanation.
6. **Open source reframed** — Bug-finding boom may strengthen OSS with repair loops.
7. **Product compression** — PRD-to-prototype in hours; scope and delight still human gates.
8. **Community tooling** — Signal over noise; matchmaking; field research as guild motion.

#### Section B — Charts & data cards

**Slice 1–2 (shipped):** see [analysis-camp.md](./analysis-camp.md).

| Chart | Input | Interaction | Status |
|-------|-------|-------------|--------|
| Theme frequency | Summary tags across 13 sessions | Click → scroll to NPC | Shipped |
| Guest lens | Editorial role buckets | Static bars + guest list | Shipped |
| Tool mentions | `analysis-curated.json` | Click → guest | Shipped |
| Concern vs leverage | Highlight tone curation | Stacked bar | Shipped |
| Output funnel | encounters media + posts | Per-guest checklist | Shipped |
| Publication lag | Portal post `createdAt` snapshot | Click → guest | Shipped |
| Open questions | Wiki candidates from topic maps | Link to Portal wiki explore | Planned |

#### Section C — Quote wall

Only **verified** pull quotes (from angle brief quote review sheets or explicit approval). Mark unverified candidates as "pending review" in CMS, never in published UI.

---

### Act 3 — Research Ledger (1–2 viewports)

- Wiki topic candidates imported from session topic maps
- Open questions worth further research
- Links: cohort thread, events index, `/wiki/explore`
- CTA: attend future firesides / contribute a field note

---

## Access tiers (future)

Not implemented yet — full content stays available during local dev. When auth gating ships (see [spec — Auth & access](./spec.md#auth--access)):

| Tier | What they see |
|------|----------------|
| Unauthenticated | Act 0 preview + one sample encounter; CTA to Portal login/join |
| Authenticated (Portal launch) | Full walk, analysis camp, research ledger |

## Tone and guardrails

- Write like a field researcher, not a marketer.
- Do not invent quotes, commitments, or guest roles.
- Prefer "session summary says" / "in the fireside" over unsourced generalization.
- When ASR or summary confidence is low, say so.
- Recap embed + full interview link should always be visually distinct (embed vs text link).

## Content production workflow

1. **Ingest** — Pull all 13 events from Portal API; normalize YouTube recap vs full URLs.
2. **Curate** — For each encounter: hook, 3–5 highlights, tags, post links, media URLs.
3. **Verify** — Quote review pass; refresh Sara/Victor media when published.
4. **Synthesize** — Draft Act 2 essay with claim ledger.
5. **Publish** — Ship `content/encounters.json` (or CMS) with module release.

## Phased content delivery

| Phase | Content scope |
|-------|----------------|
| MVP | Act 0 + 3 pilot encounters (Spencer, Kerp, 0xHunter) + stub Analysis Camp |
| Beta | All 13 encounters + full media matrix |
| 1.0 | Act 2 charts + Research Ledger + quote wall |