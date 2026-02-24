import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'
import path from 'path'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENABLE_CERTIFICATES !== 'true') {
    return NextResponse.json({ error: 'Certificados deshabilitados' }, { status: 503 })
  }

  try {
    const { nombre, hash } = await request.json()

    if (!nombre) {
      return NextResponse.json({ error: 'Nombre es requerido' }, { status: 400 })
    }

    const pdfBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'plantilla_certificado.pdf'))
    const pdfDoc = await PDFDocument.load(pdfBuffer)
    const pages = pdfDoc.getPages()
    const page = pages[0]

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    page.drawText(nombre, {
      x: 420,
      y: 375,
      size: 35,
      font: boldFont,
      color: rgb(0, 0, 0),
    })

    if (hash) {
      const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verificar?hash=${hash}`

      page.drawText(`Verificación: ${hash}`, {
        x: 50,
        y: 30,
        size: 8,
        font: regularFont,
        color: rgb(0.5, 0.5, 0.5),
      })

      const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
        width: 80,
        margin: 0,
      })

      const qrImage = await pdfDoc.embedPng(qrCodeDataUrl)
      const { width } = qrImage.scale(0.8)
      
      page.drawImage(qrImage, {
        x: 750,
        y: 30,
        width,
        height: width,
      })
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificado-${nombre}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generando certificado:', error)
    return NextResponse.json({ error: 'Error generando certificado' }, { status: 500 })
  }
}
