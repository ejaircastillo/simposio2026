'use client'

import { motion } from 'framer-motion'
import { Users, Mail, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  const teamStats = [
    { label: 'Miembros Totales', value: '34' },
    { label: 'Victimas', value: '9' },
    { label: 'Abogados', value: '18' },
    { label: 'Empleados', value: '2' },
  ]

  const milestones = [
    { year: '2021', members: 18 },
    { year: '2022', members: 22 },
    { year: '2023', members: 25 },
    { year: '2024', members: 25 },
    { year: '2025', members: 34 },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2c4a7c] to-[#1e3a5f] text-white overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-center space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="flex justify-center"
            >
              <div className="relative w-[200px] h-[60px] opacity-90">
                <Image
                  src="/logo-usina.png"
                  alt="Usina de Justicia"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-balance font-[family-name:var(--font-display)]">
              Equipo Usina de Justicia
            </h2>
            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto text-balance">
              Un equipo comprometido con la defensa de los derechos de las victimas y la transformacion del sistema de justicia.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {teamStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: false }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="text-center space-y-2 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 cursor-default"
              >
                <div className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-display)]">
                  {stat.value}
                </div>
                <div className="text-sm text-blue-100/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Growth timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            <h3 className="text-xs font-bold text-blue-200/80 uppercase tracking-widest text-center font-[family-name:var(--font-display)]">
              Crecimiento del Equipo
            </h3>
            <div className="flex items-end justify-between gap-3 h-32 px-4">
              {milestones.map((milestone, index) => {
                const maxHeight = 34
                const heightPercent = (milestone.members / maxHeight) * 100

                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.5 + index * 0.1,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    viewport={{ once: false }}
                    className="flex-1 relative group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-full h-full bg-gradient-to-t from-white/40 to-white/20 rounded-t-lg cursor-pointer relative overflow-hidden"
                    >
                      {/* Shimmer */}
                      <motion.div
                        animate={{ y: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                      />
                    </motion.div>
                    <div className="absolute -top-8 inset-x-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-bold text-white drop-shadow font-[family-name:var(--font-display)]">
                        {milestone.members}
                      </span>
                    </div>
                    <div className="absolute -bottom-6 inset-x-0 text-center text-xs text-blue-200/80 font-semibold">
                      {milestone.year}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false }}
            className="flex flex-col items-center gap-8 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {[
                { icon: Users, label: 'Equipo', href: '#' },
                { icon: Mail, label: 'Contacto', href: '#' },
                { icon: ExternalLink, label: 'Web Oficial', href: '#' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 text-blue-200/80 hover:text-white transition-colors duration-200"
                >
                  <link.icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-blue-200/60">
                Enero 2026 - Informe de Gestion 2021-2025
              </p>
              <p className="text-xs text-blue-300/40">
                Usina de Justicia. Comprometidos con la defensa de las victimas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
