import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendConfirmationEmail } from '@/lib/send-email'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const password = authHeader?.replace('Bearer ', '')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    const inscrito = await prisma.inscrito.findUnique({ where: { id } })
    if (!inscrito) {
      return NextResponse.json({ error: 'Inscripto no encontrado' }, { status: 404 })
    }

    const result = await sendConfirmationEmail({
      nombre: inscrito.nombre,
      email: inscrito.email,
      dni: inscrito.dni,
      esAbogado: inscrito.esAbogado,
      jurisdiccionMatricula: inscrito.jurisdiccionMatricula,
      otraJurisdiccion: inscrito.otraJurisdiccion,
      numeroMatricula: inscrito.numeroMatricula,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error ?? 'Error desconocido' }, { status: 500 })
    }

    await prisma.auditLog.create({
      data: {
        accion: 'REENVIAR_EMAIL',
        inscritoId: inscrito.id,
        inscritoNombre: inscrito.nombre,
        detalle: `Email reenviado a ${inscrito.email}`,
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al reenviar el email' }, { status: 500 })
  }
}
