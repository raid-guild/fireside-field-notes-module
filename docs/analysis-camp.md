# Analysis Camp — Data & Charts

Act 2 of the Edge Report expedition: cross-session synthesis, corpus stats, and exploratory charts after the 13 NPC walk.

Editorial north star: **field researcher, not dashboard theater**. Every number should trace to `content/encounters.json`, Portal session artifacts, or a cited external source — never invented aggregates.

---

## Layout (current)

```
Analysis camp hero
├── Stat cards (6) — corpus metrics
├── Theme frequency chart — top tags, click → guest on trail
├── Guest lens chart — editorial role buckets
├── Tool & workflow mentions — curated from summaries
├── Concern vs leverage — highlight tone split
├── Output funnel — session → field note → recap → full interview
├── Publication lag — session to first Portal field note
├── Cohort vs industry — dual-sided contrast pairs (#analysis-camp-contrast)
├── Field voice on X — curated link cards (#analysis-camp-field-voice)
├── Portal wiki further reading (#analysis-camp-wiki)
└── Through-line pattern cards — qualitative synthesis
```

Implemented in:

| Piece | Location |
|-------|----------|
| Aggregate builder | `src/lib/analysisCamp.ts` |
| UI shell | `src/components/AnalysisCamp.tsx` |
| Stat tiles | `src/components/analysis/StatCard.tsx` |
| Theme chart | `src/components/analysis/ThemeFrequencyChart.tsx` |
| Lens chart | `src/components/analysis/GuestLensChart.tsx` |
| Tool mentions | `src/components/analysis/ToolMentionsChart.tsx` |
| Tone split | `src/components/analysis/ConcernLeverageChart.tsx` |
| Output funnel | `src/components/analysis/OutputFunnelChart.tsx` |
| Publication lag | `src/components/analysis/PublicationLagChart.tsx` |
| External context | `src/components/analysis/ExternalContextSection.tsx` |
| Cohort vs industry | `src/components/analysis/CohortIndustryContrast.tsx` |
| Field voice X | `src/components/analysis/FieldVoicePosts.tsx` |
| Wiki further reading | `src/components/analysis/WikiFurtherReading.tsx` |
| Curated data | `content/analysis-curated.json` |
| Cohort/industry contrast data | `content/industry-signals.json` |
| X research data | `content/x-post-research.json` |
| Curated loader | `src/lib/analysisCurated.ts` |
| External context builder | `src/lib/externalContext.ts` |

Charts are CSS bar charts (no chart library) to match the pixel expedition aesthetic and keep dependencies minimal.

---

## Slice 1 (shipped)

### Stat cards

Computed at render time from `encounters[]`:

| Card | Computation |
|------|-------------|
| Fireside sessions | `encounters.length` |
| Research span | Calendar days from earliest to latest `startsAt` |
| Field notes published | Sum of `links.posts.length` |
| Recap videos | Count where `media.recapYouTubeId` is set |
| Unique themes tagged | Distinct values across all `tags[]` |
| Full interview links | Count where `media.fullInterviewURL` is set |

### Theme frequency chart

- Input: per-encounter `tags[]` (curated from Prism summaries)
- Shows top 10 tags by session count
- Each row lists contributing guests (first name)
- Click bar or label → `scrollIntoView` to first guest with that tag

### Guest lens chart

Editorial buckets — **not** job titles or NPC archetypes. Mapping lives in `guestLensBySlug` inside `analysisCamp.ts`.

| Lens | Guests |
|------|--------|
| Education & craft | Adam Kerpelman, Cj Miller |
| Engineering & review | Spencer Graham, Justice Conder, Victor Ginelli |
| Consulting & client work | 0xHunter |
| Product & networks | Graven Prest, Bill Warren |
| Operations & domain QA | Jake Winckowski, Travis McCutcheon, Sara Brown |
| Community & alignment | Andrej Berlin |
| Agents & orchestration | Elco |

Re-bucket when guest framing changes; document rationale here when updated.

---

## Slice 2 (shipped)

Curated data in `content/analysis-curated.json`. Aggregates built in `buildAnalysisCampData()`.

### Tool & workflow mentions

- 12 curated entries (`tool` or `process` kind)
- Session slugs per entry; sourced from cross-cut #3 synthesis and encounter bios
- Sorted by session count; click → first guest on trail

### Concern vs leverage

- `highlightTones` maps each encounter slug → array of `leverage` | `friction` | `open`
- One tone per curated highlight, aligned to `encounters.json` highlight order
- Stacked bar + legend with counts and percentages

### Output funnel

Aggregate steps (of 13 sessions):

| Step | Source |
|------|--------|
| Fireside session | always |
| Field note published | `links.posts.length > 0` |
| Recap video | `media.recapYouTubeId` |
| Full interview link | `media.fullInterviewURL` |

Per-guest row: `note · recap · full` checklist (click → encounter).

### Publication lag

- `firstPostPublishedAt` per slug — earliest linked Portal post `createdAt` (snapshot 2026-06-26)
- Lag = calendar days from `startsAt` to first publish
- Sorted fastest → slowest; shows median in chart header

Refresh `firstPostPublishedAt` when `sync-portal-sessions.mjs` ships; until then, hand-update after Portal publishes new field notes.

---

## Slice 3 (planned) — Portal / Prism ingest

| Viz | Input |
|-----|-------|
| Wiki candidates seeded | Topic maps from session artifacts |
| Verified quote count | Angle brief quote review sheets |
| Normalized Prism tags | Summary tag export vs hand tags in encounters |

Build script `scripts/sync-portal-sessions.mjs` should refresh encounter snapshots; `buildAnalysisCampData()` recomputes aggregates automatically.

---

## Slice 4 (shipped) — external context

Two research files:

| File | Contents |
|------|----------|
| `content/x-post-research.json` | Field-voice + adjacent-builder X posts; `recommendedEmbeds` (6) |
| `content/industry-signals.json` | Big-name opinions and hard-number surveys/RCTs; `recommendedForCamp` (6) |

Wiki companion links live in `x-post-research.json` for further-reading rows.

External stats are **comparison cards only** — always labeled with source, date, and geography. Never presented as cohort voice. Prefer `cohortContrastPairs` in `industry-signals.json` for dual-bar “cohort claim vs industry datapoint” copy.

| External datapoint | Pairs with through-line |
|--------------------|-------------------------|
| Developer AI adoption rates | Role change / workflow rewrite |
| Assessment / integrity policy shifts | Education under pressure |
| OSS security / AI review adoption | Open source reframed |
| Enterprise AI spend vs productivity | Bottleneck shift |

Pattern: dual-bar “cohort vs industry” for 1–2 claims max, not a wall of third-party KPIs.

---

## Data guardrails

1. **No invented numbers** — if a metric cannot be sourced, omit the card.
2. **Distinguish cohort vs external** — visual treatment and copy must differ.
3. **Click-through to evidence** — charts prefer linking to NPC encounters over orphan stats.
4. **Unverified quotes** — never chart transcript-mined claims until quote review passes.
5. **Media gaps are data** — Sara Brown / Victor Ginelli missing recaps should appear in copy, not be smoothed over.

---

## Auth note

When `EDGE_REPORT_REQUIRE_AUTH=true` (Phase 4), Analysis Camp is members-only per [spec.md](./spec.md#auth--access). During local dev the full camp renders for everyone.

---

## References

- [Content outline — Act 2](./outline.md)
- [Technical spec — Phase 3](./spec.md#phase-3--analysis)
- Cohort data: `content/encounters.json`
