import raw from '../../content/cross-cut-questions.json'

export type CrossCutQuestion = {
  id: string
  insertAfterEncounterIndex: number
  question: string
  eyebrow: string
  body: string[]
  voices: string[]
}

export type CrossCutData = {
  questions: CrossCutQuestion[]
}

export const crossCutData = raw as CrossCutData

export const crossCutByInsertIndex = crossCutData.questions.reduce<Record<number, CrossCutQuestion>>(
  (acc, question) => {
    acc[question.insertAfterEncounterIndex] = question
    return acc
  },
  {},
)