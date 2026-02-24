import { PDFDocument, rgb } from 'pdf-lib'

export async function generarGrid() {
  const pdfDoc = await PDFDocument.load(await fetch('/assets/plantilla_certificado.pdf').then(res => res.arrayBuffer()))
  const pages = pdfDoc.getPages()
  const page = pages[0]

  const { width, height } = page.getSize()
  const gridSize = 50

  for (let x = 0; x <= width; x += gridSize) {
    page.drawLine({
      start: { x, y: 0 },
      end: { x, y: height },
      thickness: 0.5,
      color: rgb(0.8, 0.2, 0.2),
      opacity: 0.3,
    })
    page.drawText(`${x}`, { x: x + 2, y: height - 10, size: 8, color: rgb(0.8, 0.2, 0.2) })
  }

  for (let y = 0; y <= height; y += gridSize) {
    page.drawLine({
      start: { x: 0, y },
      end: { x: width, y },
      thickness: 0.5,
      color: rgb(0.8, 0.2, 0.2),
      opacity: 0.3,
    })
    page.drawText(`${y}`, { x: 5, y: y + 2, size: 8, color: rgb(0.8, 0.2, 0.2) })
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  window.open(url)
}

export async function generarCertificado(nombre) {
  const pdfDoc = await PDFDocument.load(await fetch('/assets/plantilla_certificado.pdf').then(res => res.arrayBuffer()))
  const pages = pdfDoc.getPages()
  const page = pages[0]

  const font = await pdfDoc.embedFont(PDFDocument.StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(PDFDocument.StandardFonts.HelveticaBold)

  page.drawText(nombre, {
    x: 200,
    y: 300,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `certificado-${nombre}.pdf`
  a.click()
}
