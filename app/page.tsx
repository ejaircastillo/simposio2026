'use client'

import { LavaBackground } from '@/components/lava-background'
import { SpeakersSection } from '@/components/speakers-section'
import { ScheduleSection } from '@/components/schedule-section'
import { EndorsementsSection } from '@/components/endorsements-section'
import { VenueSection } from '@/components/venue-section'
import { RegistrationSection } from '@/components/registration-section'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <>
      <LavaBackground />
      <Navbar />
      <main className="pt-20">
        <section className="min-h-screen relative flex items-center justify-center">
          <div className="container mx-auto px-4 text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-sky-800 font-[family-name:var(--font-display)] leading-tight"
            >
              PRIMER SIMPOSIO AMERICANO Y EUROPEO<br />
              DE VICTIMOLOGÍA PENAL
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-xl md:text-2xl text-primary font-[family-name:var(--font-display)] max-w-4xl mx-auto"
            >
              Las víctimas de homicidio en contexto de inseguridad
            </motion.p>
          </div>
        </section>
        <SpeakersSection />
        <ScheduleSection />
        <VenueSection />
        <RegistrationSection />
        <EndorsementsSection />
      </main>
    </>
  )
}
