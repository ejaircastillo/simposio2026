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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
             {mainSpeakers.map((speaker) => (
                <motion.div
                  key={speaker.id}
                  variants={item}
                  onClick={() => setSelectedSpeakerId(speaker.id)}
                  className="cursor-pointer group"
                >
                    {speaker.image ? (
                      <div className="relative aspect-[3/4] overflow-hidden">
                         <Image
                           src={speaker.image}
                           alt={speaker.name}
                           fill
                           className="transition-transform duration-500 group-hover:scale-105"
                           style={{
                             objectFit: (speaker.imageScale === 'object-cover' || !speaker.imageScale) 
                               ? 'cover' as const
                               : speaker.imageScale === 'object-contain'
                               ? 'contain' as const
                               : 'cover' as const,
                             objectPosition: speaker.objectPosition === 'object-top' 
                               ? 'top center' 
                               : speaker.objectPosition === 'object-center' || !speaker.objectPosition
                               ? 'center'
                               : speaker.objectPosition,
                             backgroundColor: '#f8fafc'
                           }}
                         />
                         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent" />
                         <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                           <h3 className="text-xl md:text-2xl font-bold text-foreground font-[family-name:var(--font-display)] mb-2">
                             {speaker.name}
                           </h3>
                           <p className="text-sm text-muted-foreground line-clamp-1">
                             {speaker.title}
                           </p>
                         </div>
                       </div>
                    ) : (
                      <div className="p-6 space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground font-[family-name:var(--font-display)] mb-2">
                          {speaker.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {speaker.title}
                        </p>
                      </div>
                    )}
                </motion.div>
             ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              <span className="text-primary font-medium">Explora todos los oradores</span> en el programa del simposio
            </p>
          </motion.div>
        </div>
      </section>

      <SpeakerModal speakerId={selectedSpeakerId} onClose={() => setSelectedSpeakerId(null)} />
    </>
  )
}
