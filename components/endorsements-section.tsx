'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'

export function EndorsementsSection() {
  const endorsements = [
    {
      id: 'cpacf',
      name: 'Colegio Público de Abogados',
      image: '/Colegio_Abogados.png',
    },
    {
      id: 'usina',
      name: 'Usina de Justicia',
      image: '/logo-usina.png',
    },
    {
      id: 'ivujus',
      name: 'IVUJUS',
      image: '/IVUJUS.png',
    },
  ]

  const duplicatedEndorsements = useMemo(() => [...endorsements, ...endorsements, ...endorsements, ...endorsements, ...endorsements, ...endorsements], [])

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
            Avales Institucionales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instituciones que respaldan este simposio
          </p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 100,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex gap-24"
            style={{ width: '200%' }}
          >
            {duplicatedEndorsements.map((endorsement) => (
              <div
                key={`${endorsement.id}-${Math.random()}`}
                className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
              >
                <Image
                  src={endorsement.image}
                  alt={endorsement.name}
                  fill
                  className={`object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ${
                    endorsement.id === 'ivujus' || endorsement.id === 'cpacf'
                      ? 'mix-blend-multiply'
                      : ''
                  }`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
