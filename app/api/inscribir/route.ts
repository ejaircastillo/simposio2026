import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generarHash } from '@/lib/certificado'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, dni, email, telefono, profesion, institucion, esAbogado, jurisdiccionMatricula, otraJurisdiccion, numeroMatricula } = body

    console.log('Datos recibidos:', body)

    if (!nombre || !dni || !email || !telefono) {
      return NextResponse.json({ error: 'Nombre, DNI, email y teléfono son requeridos' }, { status: 400 })
    }

    const existingInscrito = await prisma.inscrito.findFirst({
      where: {
        OR: [
          { dni },
          { email },
        ],
      },
    })

    if (existingInscrito) {
      if (existingInscrito.dni === dni) {
        return NextResponse.json({ error: 'Ya existe un inscrito con este DNI' }, { status: 400 })
      }
      if (existingInscrito.email === email) {
        return NextResponse.json({ error: 'Ya existe un inscrito con este email' }, { status: 400 })
      }
    }

    const hash = generarHash(dni, email)

    const inscrito = await prisma.inscrito.create({
      data: {
        nombre,
        dni,
        email,
        hash,
        profesion: profesion || null,
        institucion: institucion || null,
        esAbogado: esAbogado || false,
        jurisdiccionMatricula: jurisdiccionMatricula || null,
        otraJurisdiccion: otraJurisdiccion || null,
        numeroMatricula: numeroMatricula || null,
      },
    })

    return NextResponse.json({ 
      mensaje: 'Inscripción exitosa',
      inscrito: {
        id: inscrito.id,
        nombre: inscrito.nombre,
      },
    }, { status: 201 })
  } catch (error) {
    console.error('Error en inscripción:', error)
    return NextResponse.json({ error: 'Error en inscripción' }, { status: 500 })
  }
}