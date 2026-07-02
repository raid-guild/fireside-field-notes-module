import { agentEntrypoints } from '@/lib/agentContext'

export const dynamic = 'force-static'

export function GET() {
  const body = `# Fireside Field Notes

Fireside Field Notes is a RaidGuild field report from 14 June 2026 fireside interviews about how builders are adapting AI in real work.

## Agent entrypoints

- Full context JSON: ${agentEntrypoints.context}
- Lightweight manifest: ${agentEntrypoints.manifest}
- Discovery document: ${agentEntrypoints.discovery}
- OpenAPI document: ${agentEntrypoints.openapi}

## Usage

Load the manifest for a quick map. Load the full context before answering questions about guests, themes, shared links, Portal posts, or the journey order. Use the OpenAPI document when wiring this project into an agent tool or retrieval pipeline.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
