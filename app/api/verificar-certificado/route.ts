import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const hash = request.nextUrl.searchParams.get('hash')

    if (!hash) {
      return NextResponse.json({ error: 'Hash es requerido' }, { status: 400 })
    }

    const inscrito = await prisma.inscrito.findUnique({
      where: { hash },
      select: {
        nombre: true,
        email: true,
        attended: true,
        createdAt: true,
      },
    })

    if (!inscrito) {
      return NextResponse.json({ valido: false, mensaje: 'Certificado no encontrado' }, { status: 404 })
    }

    if (!inscrito.attended) {
      return NextResponse.json({ valido: false, mensaje: 'El participante aún no ha asistido al evento' }, { status: 403 })
    }

    return NextResponse.json({
      valido: true,
      nombre: inscrito.nombre,
      fechaInscripcion: inscrito.createdAt,
    })
  } catch (error) {
    console.error('Error verificando certificado:', error)
    return NextResponse.json({ error: 'Error verificando certificado' }, { status: 500 })
  }
}