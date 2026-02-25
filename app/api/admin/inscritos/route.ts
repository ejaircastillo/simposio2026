import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const password = authHeader?.replace('Bearer ', '')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const inscritos = await prisma.inscrito.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        dni: true,
        institucion: true,
        profesion: true,
        esAbogado: true,
        jurisdiccionMatricula: true,
        otraJurisdiccion: true,
        numeroMatricula: true,
        attended: true,
        mail_sent: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ inscritos })
  } catch {
    return NextResponse.json({ error: 'Error al consultar la base de datos' }, { status: 500 })
  }
}
