'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { FileText, CheckCircle2, Clock, Sparkles } from 'lucide-react'

export function LegislativoViz() {
  const laws = [
    {
      year: 2021,
      title: 'Ley de Victimas Santa Fe',
      status: 'approved',
      description: 'Aprobada en 2022',
    },
    {
      year: 2021,
      title: 'Ley de Victimas Chaco',
      status: 'approved',
      description: 'Sancionada',
    },
    {
      year: 2024,
      title: 'Registro de Datos Geneticos',
      status: 'approved',
      description: 'Ley Nacional',
    },
    {
      year: 2024,
      title: 'Ley de Reiterancia',
      status: 'approved',
      description: 'Aprobada',
    },
    {
      year: 2025,
      title: 'Ley de Juicio en Ausencia',
      status: 'approved',
      description: 'Caso AMIA',
      highlight: true,
    },
    {
      year: 2025,
      title: 'Baja de Edad',
      status: 'pending',
      description: 'En tramite',
    },
    {
      year: 2025,
      title: 'Imprescriptibilidad Homicidios',
      status: 'pending',
      description: 'Nuevo Codigo Penal',
    },
  ]

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-2xl shadow-slate-300/20">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 font-[family-name:var(--font-display)]">
            Leyes Promovidas
          </h3>
          <p className="text-sm text-slate-500">
            Incidencia legislativa 2021-2025
          </p>
        </div>

        {/* Laws list */}
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
          {laws.map((law, index) => (
            <motion.div
              key={`${law.year}-${law.title}`}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
              viewport={{ once: false, margin: '-30px', amount: 0.5 }}
              whileHover={{ scale: 1.02, x: 8 }}
              className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                law.highlight
                  ? 'bg-gradient-to-r from-[#2c4a7c]/10 to-[#4a6491]/10 border-[#2c4a7c]/30 shadow-lg shadow-[#2c4a7c]/10'
                  : law.status === 'approved'
                    ? 'bg-white/80 border-slate-200 hover:border-[#2c4a7c]/30 hover:shadow-md'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className={`mt-1 p-2 rounded-xl ${
                    law.highlight
                      ? 'bg-[#2c4a7c] text-white'
                      : law.status === 'approved'
                        ? 'bg-[#2c4a7c]/10 text-[#2c4a7c]'
                        : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {law.highlight ? (
                    <Sparkles className="w-5 h-5" />
                  ) : law.status === 'approved' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1">
                      <h4
                        className={`font-semibold leading-snug font-[family-name:var(--font-display)] ${
                          law.highlight
                            ? 'text-[#2c4a7c] text-base'
                            : 'text-slate-800 text-sm'
                        }`}
                      >
                        {law.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {law.description}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        law.status === 'approved'
                          ? 'bg-[#2c4a7c]/10 text-[#2c4a7c]'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {law.year}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Highlight indicator */}
              {law.highlight && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2c4a7c] to-[#4a6491] rounded-b-xl origin-left"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
          className="pt-4 flex items-center justify-center gap-4 md:gap-6 border-t border-slate-200"
        >
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#2c4a7c]" />
            <span className="text-slate-700">
              <span className="font-bold text-[#2c4a7c]">5</span> Aprobadas
            </span>
          </div>
          <div className="w-px h-4 bg-slate-300" />
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-slate-700">
              <span className="font-bold text-slate-700">2</span> En tramite
            </span>
          </div>
          <div className="w-px h-4 bg-slate-300" />
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-slate-500" />
            <span className="text-slate-700">
              <span className="font-bold text-slate-700">6</span> Amicus
            </span>
          </div>
        </motion.div>
      </div>
    </Card>
  )
}
