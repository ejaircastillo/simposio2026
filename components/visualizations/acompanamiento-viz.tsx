'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export function AcompanamientoViz() {
  const data = [
    { year: '2021', cases: 1, label: 'Orono' },
    { year: '2022', cases: 3, label: 'Pablo Flores, Acosta' },
    { year: '2023', cases: 2, label: 'Condena Orono' },
    { year: '2024', cases: 3, label: 'Condena Acosta' },
    { year: '2025', cases: 37, label: '37 Casos Activos' },
  ]

  const maxCases = 37
  const containerHeight = 320

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-2xl shadow-slate-300/20">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 font-[family-name:var(--font-display)]">
            Evolucion de Casos
          </h3>
          <p className="text-sm text-slate-500">
            Acompanamiento 2021-2025
          </p>
        </div>

        {/* Chart */}
        <div className="relative pt-8 pb-12">
          {/* Grid lines */}
          <div className="absolute inset-x-4 top-8 bottom-12 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full border-t border-slate-200/70" />
            ))}
          </div>

          {/* Bars container with baseline */}
          <div className="relative px-4" style={{ height: `${containerHeight}px` }}>
            {/* Baseline */}
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-slate-300" />
            
            {/* Bars */}
            <div className="relative flex justify-between gap-3 h-full">
              {data.map((item, index) => {
                const barHeight = (item.cases / maxCases) * containerHeight
                const isLast = index === data.length - 1

                return (
                  <div 
                    key={item.year} 
                    className="relative flex-1 group cursor-pointer"
                    style={{ height: '100%' }}
                  >
                    {/* Bar container - positioned at bottom */}
                    <div className="absolute bottom-0 left-0 right-0">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: barHeight }}
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.15, 
                          ease: [0.34, 1.56, 0.64, 1] 
                        }}
                        viewport={{ once: false, amount: 0.3 }}
                        whileHover={{ scaleX: 1.08 }}
                        className={`w-full rounded-t-xl relative overflow-hidden origin-bottom ${
                          isLast
                            ? 'bg-gradient-to-t from-[#2c4a7c] via-[#3b5998] to-[#4a6491]'
                            : 'bg-gradient-to-t from-[#6b7c93] to-[#8a9db5]'
                        }`}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />

                        {/* Value inside bar */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.15 + 0.8 }}
                          viewport={{ once: false }}
                          className="absolute top-3 inset-x-0 text-center"
                        >
                          <span className="text-white font-bold text-sm drop-shadow-lg font-[family-name:var(--font-display)]">
                            {item.cases}
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Tooltip - above the bar */}
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                        <motion.div 
                          className="bg-slate-900 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-2xl"
                        >
                          <div className="font-bold text-lg">{item.cases} casos</div>
                          <div className="text-xs text-slate-300">{item.label}</div>
                        </motion.div>
                        <div className="w-3 h-3 bg-slate-900 rotate-45 -mt-1.5 mx-auto" />
                      </div>
                    </div>

                    {/* Year label - below baseline */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: false }}
                      className="absolute -bottom-8 inset-x-0 text-center"
                    >
                      <span className="text-xs font-semibold text-slate-600 font-[family-name:var(--font-display)]">
                        {item.year}
                      </span>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="pt-4 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-gradient-to-t from-[#6b7c93] to-[#8a9db5]" />
            <span className="text-slate-600">Casos historicos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-gradient-to-t from-[#2c4a7c] to-[#4a6491]" />
            <span className="text-slate-600">Casos activos 2025</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
