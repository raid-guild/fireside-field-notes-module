import { NextResponse } from 'next/server'

import { buildAgentContext } from '@/lib/agentContext'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(buildAgentContext())
}
