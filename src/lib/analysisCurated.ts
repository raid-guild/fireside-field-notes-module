import raw from '../../content/analysis-curated.json'

export type HighlightTone = 'leverage' | 'friction' | 'open'

export type CuratedToolKind = 'tool' | 'process'

export type CuratedTool = {
  id: string
  label: string
  kind: CuratedToolKind
  sessions: string[]
}

export type AnalysisCuratedData = {
  tools: CuratedTool[]
  highlightTones: Record<string, HighlightTone[]>
  firstPostPublishedAt: Record<string, string>
  sources?: Record<string, string>
}

export const analysisCuratedData = raw as AnalysisCuratedData