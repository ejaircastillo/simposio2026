'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function RegistrationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    email: '',
    phone: '',
    profession: '',
    wantCertificate: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Formulario enviado correctamente')
    }, 2000)
  }

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-display)] text-sky-800">
            Inscripción
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Inscripción <span className="font-bold text-accent">Gratuita</span> con entrega de certificados
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                placeholder="Juan Pérez"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="dni" className="text-sm font-medium text-foreground">
                  DNI / Pasaporte *
                </label>
                <input
                  type="text"
                  id="dni"
                  required
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  placeholder="12345678"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="profession" className="text-sm font-medium text-foreground">
                Profesión / Institución (Opcional)
              </label>
              <input
                type="text"
                id="profession"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                placeholder="Abogado - Colegio Público de Abogados"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="certificate"
                checked={formData.wantCertificate}
                onChange={(e) => setFormData({ ...formData, wantCertificate: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-white/10 bg-background/50 focus:ring-primary/50"
              />
              <label htmlFor="certificate" className="text-sm text-foreground leading-tight">
                Deseo recibir certificado de asistencia
              </label>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/30 rounded-2xl p-6"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/30">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
                      Exclusivo
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tu inscripción incluye un{' '}
                    <span className="inline-flex items-center font-bold text-accent">
                      20% de descuento
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </span>{' '}
                    en la Diplomatura "Las leyes de víctimas en el marco de la victimología"
                  </p>
                </div>
              </div>
            </motion.div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5"
            >
              {isSubmitting ? 'Enviando...' : 'Inscribirse'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
