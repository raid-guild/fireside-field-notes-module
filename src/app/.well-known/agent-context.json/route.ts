import { NextResponse } from 'next/server'

import { buildAgentDiscovery } from '@/lib/agentContext'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(buildAgentDiscovery())
}
