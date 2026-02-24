'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function VenueSection() {
  const handleOpenMap = () => {
    const isAndroid = /android/i.test(navigator.userAgent)

    if (isAndroid) {
      window.location.href = 'geo:-34.60373,-58.38873?q=Av.+Corrientes+1441,+CABA'
    } else {
      window.open('https://maps.google.com/?q=Av.+Corrientes+1441,+CABA', '_blank')
    }
  }

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row bg-white/50 backdrop-blur-sm shadow-md rounded-xl overflow-hidden border border-gray-200"
        >
          <div className="w-full md:w-2/5 h-64 md:h-[500px] relative">
            <Image
              src="/Colegio_Abogados_Boceto.webp"
              alt="Colegio Público de Abogados"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-sky-800 font-[family-name:var(--font-display)]">
                Sede del Simposio
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Colegio Público de la Abogacía de la Capital Federal.<br />
                Av. Corrientes 1441, CABA, Argentina.
              </p>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenMap}
              className="self-start px-6 py-3 border-2 border-sky-800 text-sky-800 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-sky-800 hover:text-white"
            >
              <svg
                className="w-5 h-5"
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
              Abrir en mapas
            </motion.button>

            <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
              A un paso del Obelisco y del centro cultural de la ciudad
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
