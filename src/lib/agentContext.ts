import { crossCutData } from '@/lib/crossCut'
import { expeditionData } from '@/lib/encounters'
import { buildJourneySegments } from '@/lib/journey'

const version = '2026-07-02'

export const agentEntrypoints = {
  discovery: '/.well-known/agent-context.json',
  context: '/api/agent-context',
  manifest: '/api/agent-context/manifest',
  openapi: '/api/agent-context/openapi.json',
  llmsTxt: '/llms.txt',
}

const agentInstructions = {
  audience: 'Autonomous agents, research copilots, and retrieval pipelines consuming the Fireside Field Notes module.',
  recommendedUse:
    'Load the manifest first for a lightweight map, then load the full context when answering questions about guests, themes, links, or the journey.',
  traversal:
    'Use journey.segments as the canonical reading order. Follow hero segments for guest/session context and cross-cut segments for synthesis.',
  followThreadsBy: ['guestName', 'eventId', 'slug', 'tags', 'shared links', 'Portal posts', 'cross-cut question id'],
  citationGuidance:
    'Prefer cited URLs from links.posts, links.shared, media.fullInterviewURL, and entrypoints. Distinguish interview-derived summaries from external links.',
}

export const buildAgentManifest = () => {
  const journeySegments = buildJourneySegments(expeditionData.encounters)

  return {
    schemaVersion: version,
    title: expeditionData.meta.title,
    description: expeditionData.meta.subtitle,
    sessionCount: expeditionData.meta.sessionCount,
    generatedAt: new Date().toISOString(),
    entrypoints: agentEntrypoints,
    instructions: agentInstructions,
    indexes: {
      guests: expeditionData.encounters.map((encounter) => ({
        eventId: encounter.eventId,
        guestName: encounter.guestName,
        slug: encounter.slug,
        tags: encounter.tags,
        links: {
          eventURL: encounter.links.eventURL,
          posts: encounter.links.posts.map((link) => link.url),
          shared: encounter.links.shared?.map((link) => link.url) ?? [],
        },
      })),
      synthesis: crossCutData.questions.map((question) => ({
        id: question.id,
        question: question.question,
        insertAfterEncounterIndex: question.insertAfterEncounterIndex,
      })),
      journey: journeySegments.map((segment, index) =>
        segment.kind === 'hero'
          ? {
              index,
              kind: segment.kind,
              id: segment.encounter.slug,
              label: segment.encounter.guestName,
              eventId: segment.encounter.eventId,
            }
          : {
              index,
              kind: segment.kind,
              id: segment.question.id,
              label: segment.question.question,
              afterEncounterIndex: segment.afterEncounterIndex,
            },
      ),
    },
  }
}

export const buildAgentContext = () => {
  const journeySegments = buildJourneySegments(expeditionData.encounters)

  return {
    ...buildAgentManifest(),
    sourceMaterial: {
      meta: expeditionData.meta,
      throughLines: expeditionData.throughLines,
      encounters: expeditionData.encounters,
      synthesis: crossCutData.questions,
    },
    journey: {
      segments: journeySegments.map((segment, index) =>
        segment.kind === 'hero'
          ? {
              index,
              kind: segment.kind,
              encounterIndex: segment.encounterIndex,
              encounter: segment.encounter,
            }
          : {
              index,
              kind: segment.kind,
              afterEncounterIndex: segment.afterEncounterIndex,
              question: segment.question,
            },
      ),
    },
  }
}

export const buildAgentDiscovery = () => ({
  schemaVersion: version,
  name: 'Fireside Field Notes Agent Context',
  description: 'Discovery document for agents that need the full interview journey, source links, and synthesis map.',
  entrypoints: agentEntrypoints,
  contentTypes: {
    context: 'application/json',
    manifest: 'application/json',
    openapi: 'application/vnd.oai.openapi+json;version=3.1',
    llmsTxt: 'text/plain',
  },
  instructions: agentInstructions,
})

export const buildOpenApiDocument = () => ({
  openapi: '3.1.0',
  info: {
    title: 'Fireside Field Notes Agent Context API',
    version,
    description:
      'Agent-first API for downloading the RaidGuild Fireside Field Notes journey, guest encounters, shared links, and cross-interview synthesis.',
  },
  servers: [{ url: '/' }],
  paths: {
    '/.well-known/agent-context.json': {
      get: {
        summary: 'Agent discovery document',
        operationId: 'getAgentDiscovery',
        responses: {
          '200': {
            description: 'Discovery metadata and API entrypoints.',
          },
        },
      },
    },
    '/api/agent-context': {
      get: {
        summary: 'Full context download',
        operationId: 'getAgentContext',
        responses: {
          '200': {
            description: 'Full machine-readable context for the interview journey.',
          },
        },
      },
    },
    '/api/agent-context/manifest': {
      get: {
        summary: 'Lightweight context manifest',
        operationId: 'getAgentManifest',
        responses: {
          '200': {
            description: 'Indexes, traversal instructions, and source entrypoints.',
          },
        },
      },
    },
    '/api/agent-context/openapi.json': {
      get: {
        summary: 'OpenAPI document',
        operationId: 'getOpenApiDocument',
        responses: {
          '200': {
            description: 'OpenAPI 3.1 document for the agent context API.',
          },
        },
      },
    },
    '/llms.txt': {
      get: {
        summary: 'Plain-text AI documentation',
        operationId: 'getLlmsTxt',
        responses: {
          '200': {
            description: 'Short agent-oriented project overview and endpoint list.',
          },
        },
      },
    },
  },
})
