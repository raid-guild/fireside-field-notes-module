import { NextResponse } from 'next/server'

import { buildAgentManifest } from '@/lib/agentContext'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(buildAgentManifest())
}
