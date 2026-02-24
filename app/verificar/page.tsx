import { Suspense } from 'react'
import { VerifyContent } from './verify-content'

export default function VerificarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sky-800 font-medium">Verificando certificado...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
