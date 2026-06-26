import { ExpeditionClient } from '@/components/ExpeditionClient'
import { expeditionData } from '@/lib/encounters'

export default function HomePage() {
  return <ExpeditionClient data={expeditionData} />
}