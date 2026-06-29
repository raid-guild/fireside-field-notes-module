import { crossCutData, type CrossCutQuestion } from '@/lib/crossCut'

/** Offset for in-page anchors below fixed RaiderPath + two-row expedition nav */
export const EXPEDITION_HEADER_OFFSET_VAR = '--expedition-header-h'
export const EXPEDITION_HEADER_OFFSET_CLASS = 'pt-[var(--expedition-header-h,11.5rem)]'
export const EXPEDITION_SCROLL_MARGIN = 'scroll-mt-[var(--expedition-header-h,11.5rem)]'

export const crossCutNavQuestions = [...crossCutData.questions].sort(
  (a, b) => a.insertAfterEncounterIndex - b.insertAfterEncounterIndex,
)

export const crossCutNavLabel = (question: CrossCutQuestion, sequence: number) => {
  const labels: Record<string, string> = {
    'working-on-now': 'Working on',
    'workflow-changed': 'Workflow',
    'useful-tools': 'Tools',
    'broken-risky': 'Broken / risky',
    'builders-should-learn': 'For builders',
    'future-outlook': 'Future',
  }

  return labels[question.id] ?? `Q${sequence}`
}