import { NextResponse } from 'next/server'

import { buildOpenApiDocument } from '@/lib/agentContext'

export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(buildOpenApiDocument(), {
    headers: {
      'Content-Type': 'application/vnd.oai.openapi+json;version=3.1',
    },
  })
}
