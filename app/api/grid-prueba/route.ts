import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const pdfBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'plantilla_certificado.pdf'))
    const pdfDoc = await PDFDocument.load(pdfBuffer)
    const pages = pdfDoc.getPages()
    const page = pages[0]

    const { width, height } = page.getSize()
    const gridSize = 50
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    for (let x = 0; x <= width; x += gridSize) {
      page.drawLine({
        start: { x, y: 0 },
        end: { x, y: height },
        thickness: 0.5,
        color: rgb(0.8, 0.2, 0.2),
        opacity: 0.3,
      })
      page.drawText(`${x}`, { x: x + 2, y: height - 10, size: 8, font, color: rgb(0.8, 0.2, 0.2) })
    }

    for (let y = 0; y <= height; y += gridSize) {
      page.drawLine({
        start: { x: 0, y },
        end: { x: width, y },
        thickness: 0.5,
        color: rgb(0.8, 0.2, 0.2),
        opacity: 0.3,
      })
      page.drawText(`${y}`, { x: 5, y: y + 2, size: 8, font, color: rgb(0.8, 0.2, 0.2) })
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="grid-prueba.pdf"',
      },
    })
  } catch (error) {
    console.error('Error generando grid:', error)
    return NextResponse.json({ error: 'Error generando grid' }, { status: 500 })
  }
}
