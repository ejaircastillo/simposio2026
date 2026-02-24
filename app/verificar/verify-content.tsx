'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export function VerifyContent() {
  const searchParams = useSearchParams()
  const hash = searchParams.get('hash')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{ valido: boolean; nombre?: string; mensaje?: string; fechaInscripcion?: Date } | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function verificarCertificado() {
      if (!hash) {
        setError('No se proporcionó hash de verificación')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/verificar-certificado?hash=${hash}`)
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError('Error al verificar el certificado')
      } finally {
        setLoading(false)
      }
    }

    verificarCertificado()
  }, [hash])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sky-800 font-medium">Verificando certificado...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full"
      >
        {error ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4 font-[family-name:var(--font-display)]">
              Error de Verificación
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Volver al Inicio
            </a>
          </div>
        ) : data?.valido ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2 font-[family-name:var(--font-display)]">
              Certificado Auténtico
            </h1>
            <p className="text-gray-600 mb-6">Este certificado es válido y auténtico</p>
            
            <div className="bg-sky-50 rounded-xl p-6 mb-6 border-2 border-sky-200">
              <p className="text-sm text-gray-500 mb-2">Emitido a:</p>
              <p className="text-2xl font-bold text-sky-800 font-[family-name:var(--font-display)]">
                {data.nombre}
              </p>
            </div>

            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">Hash de verificación:</p>
              <p className="text-xs font-mono text-gray-700 break-all">{hash}</p>
            </div>

            <a
              href="/"
              className="inline-block px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Volver al Inicio
            </a>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-yellow-600 mb-4 font-[family-name:var(--font-display)]">
              Certificado No Válido
            </h1>
            <p className="text-gray-600 mb-6">{data?.mensaje || 'El certificado no es válido o no existe'}</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Volver al Inicio
            </a>
          </div>
        )}
      </motion.div>
    </div>
  )
}
