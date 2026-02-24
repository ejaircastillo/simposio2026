import { createHash } from 'crypto'

export function generarHash(dni: string, email: string): string {
  const secret = process.env.JWT_SECRET || 'default-secret'
  const data = `${dni}|${email}|${secret}`
  return createHash('sha256').update(data).digest('hex')
}

export async function generarCertificado(nombre: string, hash?: string) {
  const response = await fetch('/api/generar-certificado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, hash }),
  })

  if (!response.ok) {
    throw new Error('Error generando certificado')
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `certificado-${nombre}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

export async function generarGrid() {
  const response = await fetch('/api/grid-prueba')

  if (!response.ok) {
    throw new Error('Error generando grid')
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  window.open(url)
}
