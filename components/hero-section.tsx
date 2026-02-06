'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.9])

  const stats = [
    { value: '14', label: 'Leyes Promovidas', sublabel: '5 Aprobadas' },
    { value: '37', label: 'Casos Activos', sublabel: 'Acompañamiento' },
    { value: '+1M', label: 'Visualizaciones', sublabel: 'Redes Sociales' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ opacity, scale, y }} className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center space-y-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex justify-center mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-[350px] md:w-[450px] h-[100px] md:h-[140px]"
            >
              <Image
                src="/logo-usina.png"
                alt="Usina de Justicia"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-2xl md:text-4xl text-slate-700 font-[family-name:var(--font-display)] font-light text-balance">
              Informe de Gestión
            </p>
            <p className="text-5xl md:text-7xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
              2021-2025
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="p-8 bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-2xl shadow-slate-300/30 hover:shadow-3xl hover:shadow-slate-400/30 transition-all duration-500 hover:-translate-y-2 group cursor-default">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="space-y-3"
                  >
                    <motion.div 
                      className="text-5xl md:text-6xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-base font-semibold text-slate-800">
                      {stat.label}
                    </div>
                    <div className="text-sm text-slate-500">{stat.sublabel}</div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="pt-16"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3 text-slate-500"
            >
              <span className="text-sm font-semibold font-[family-name:var(--font-display)] tracking-wide">Explorar</span>
              <div className="w-7 h-12 rounded-full border-2 border-slate-400 flex items-start justify-center p-2">
                <motion.div 
                  animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-3 bg-slate-500 rounded-full" 
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
