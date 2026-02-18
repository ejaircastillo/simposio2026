'use client'

import { motion } from 'framer-motion'

export function VenueSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-display)] text-sky-800">
            Sede del Evento
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Colegio Público de Abogados de la Capital Federal
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-sky-800 font-[family-name:var(--font-display)] mb-4">
                Colegio Público de Abogados
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Av. Corrientes 1441, CABA
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Ciudad Autónoma de Buenos Aires, Argentina
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p className="text-gray-600">
                  A un paso del obelisco y del centro cultural de la ciudad
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p className="text-gray-600">
                  Acceso a transporte público: Metrobús, líneas de colectivo y subte
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p className="text-gray-600">
                  Salón de conferencias con capacidad para más de 300 asistentes
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-muted shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-foreground font-semibold">Mapa interactivo</p>
                <p className="text-sm text-muted-foreground">Próximamente</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
