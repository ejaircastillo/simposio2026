import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generarHash } from '@/lib/certificado'

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENABLE_CERTIFICATES !== 'true') {
    return NextResponse.json({ error: 'Certificados deshabilitados' }, { status: 503 })
  }

  try {
    const { dni } = await request.json()

    if (!dni) {
      return NextResponse.json({ error: 'DNI es requerido' }, { status: 400 })
    }

    const inscrito = await prisma.inscrito.findUnique({
      where: { dni },
    })

    if (!inscrito) {
      return NextResponse.json({ error: 'Inscrito no encontrado' }, { status: 404 })
    }

    if (!inscrito.hash) {
      const hash = generarHash(inscrito.dni, inscrito.email)
      await prisma.inscrito.update({
        where: { id: inscrito.id },
        data: { hash },
      })
      inscrito.hash = hash
    }

    const updated = await prisma.inscrito.update({
      where: { id: inscrito.id },
      data: { attended: true },
    })

    return NextResponse.json({ 
      mensaje: 'Asistencia marcada exitosamente',
      nombre: updated.nombre,
      hash: updated.hash,
    })
  } catch (error) {
    console.error('Error marcando asistencia:', error)
    return NextResponse.json({ error: 'Error marcando asistencia' }, { status: 500 })
  }
}