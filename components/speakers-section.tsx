'use client'

import { motion } from 'framer-motion'
import { speakers } from '@/lib/speakers'
import Image from 'next/image'
import { useState } from 'react'
import { SpeakerModal } from '@/components/speaker-modal'

export function SpeakersSection() {
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null)
  const mainSpeakers = speakers.filter(s => s.highlight === true)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-display)] text-sky-800">
              Oradores Internacionales
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expertos internacionales en criminología, victimología y derechos humanos
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-wrap items-start gap-6 justify-center"
          >
            {mainSpeakers.map((speaker) => (
              <motion.div
                key={speaker.id}
                variants={item}
                onClick={() => setSelectedSpeakerId(speaker.id)}
                className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-0.75rem)] max-w-[280px]"
              >
                <div className="h-72 w-full flex-shrink-0 relative overflow-hidden">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectFit: 'cover',
                        objectPosition: speaker.objectPosition || 'center',
                        backgroundColor: '#f8fafc'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
                  )}
                </div>

                <div className="p-4 w-full bg-white border-t border-gray-100">
                  <h3 className="text-lg font-bold text-foreground font-[family-name:var(--font-display)] mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {speaker.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SpeakerModal speakerId={selectedSpeakerId} onClose={() => setSelectedSpeakerId(null)} />
    </>
  )
}
