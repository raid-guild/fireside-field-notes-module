# Edge Report Module

External Portal module for RaidGuild's June 2026 cohort fireside research experience: a long-form, scroll-driven field report with NPC encounters, embedded recap media, and cross-session analysis.

## Status

Next.js local dev prototype — scroll expedition with 13 NPC encounters, YouTube recap embeds, and analysis camp stub.

**Auth:** Portal signed launch and preview gating are documented but intentionally deferred so local dev stays wide open. See [spec — Auth & access](./docs/spec.md#auth--access).

**Data:** Static `content/encounters.json` for now; Portal API sync script planned.

## Local dev

```bash
cd edge-report-module
pnpm install
pnpm dev
```

Open [http://localhost:3310](http://localhost:3310).

## Docs

- [Content outline](./docs/outline.md) — narrative structure, session inventory, through-lines, encounter template
- [Technical spec](./docs/spec.md) — Railway hosting, Portal signed launch, data model, video policy, build phases

## Source corpus

- Portal events titled `June Cohort Fireside Chats (<guest name>)`
- Cohort thread: [Field Experience from the Edge](https://portal.raidguild.org/threads/how-to-raidguild-field-experience-from-the-edge)
- Prism session artifacts (summaries, angle briefs, topic maps) attached to each event

## Related repos

- Portal boilerplate: `../2026-06-26-30213538`
- Sprite / game experiments: `../../Projects/raidguild/forge/arcade-roundtable-melee` (or local `forge/arcade-roundtable-melee`)