import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const password = authHeader?.replace('Bearer ', '')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ logs })
  } catch {
    return NextResponse.json({ error: 'Error al consultar los logs' }, { status: 500 })
  }
}
