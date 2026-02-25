import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function authCheck(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const password = authHeader?.replace('Bearer ', '')
  return Boolean(password && password === process.env.ADMIN_PASSWORD)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await request.json()
    const { nombre, profesion, institucion, attended } = body as {
      nombre?: string
      profesion?: string
      institucion?: string
      attended?: boolean
    }

    const updateData: Record<string, unknown> = {}
    const cambios: string[] = []

    if (nombre !== undefined) {
      updateData.nombre = nombre
      cambios.push(`nombre → "${nombre}"`)
    }
    if (profesion !== undefined) {
      updateData.profesion = profesion || null
      cambios.push(`profesión → "${profesion || '—'}"`)
    }
    if (institucion !== undefined) {
      updateData.institucion = institucion || null
      cambios.push(`institución → "${institucion || '—'}"`)
    }
    if (attended !== undefined) {
      updateData.attended = attended
      cambios.push(`asistencia → ${attended ? 'presente' : 'ausente'}`)
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No hay campos para actualizar' }, { status: 400 })
    }

    const inscrito = await prisma.inscrito.update({
      where: { id },
      data: updateData,
    })

    const soloAsistencia = attended !== undefined && Object.keys(updateData).length === 1
    const accion = soloAsistencia ? 'MARCAR_ASISTENCIA' : 'EDITAR'

    await prisma.auditLog.create({
      data: {
        accion,
        inscritoId: id,
        inscritoNombre: inscrito.nombre,
        detalle: cambios.join(' | '),
      },
    })

    return NextResponse.json({ inscrito })
  } catch {
    return NextResponse.json({ error: 'Error al actualizar el registro' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  try {
    const inscrito = await prisma.inscrito.findUnique({
      where: { id },
      select: { nombre: true },
    })
    const nombreInscrito = inscrito?.nombre ?? 'Desconocido'

    await prisma.inscrito.delete({ where: { id } })

    await prisma.auditLog.create({
      data: {
        accion: 'BORRAR',
        inscritoId: id,
        inscritoNombre: nombreInscrito,
        detalle: 'Registro eliminado del sistema',
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar el registro' }, { status: 500 })
  }
}
