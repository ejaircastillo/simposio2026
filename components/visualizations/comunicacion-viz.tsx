'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { TrendingUp, Sparkles, FileText, Radio, Clock } from 'lucide-react'

export function ComunicacionViz() {
  const socialStats = [
    { platform: 'X (Twitter)', followers: 29300, color: 'from-[#2c4a7c] to-[#3b5998]' },
    { platform: 'Facebook', followers: 10600, color: 'from-[#3b5998] to-[#4a6491]' },
    { platform: 'Instagram', followers: 2790, color: 'from-[#4a6491] to-[#6b7c93]' },
    { platform: 'TikTok', followers: 841, color: 'from-[#6b7c93] to-[#8a9db5]' },
  ]

  const totalFollowers = 43531
  const genderData = [
    { label: 'Mujeres', percentage: 71.8, color: 'bg-gradient-to-r from-[#1e3a5f] via-[#2c4a7c] to-[#3b5998]', ring: true },
    { label: 'Hombres', percentage: 28.2, color: 'bg-[#c5ced9]', ring: false },
  ]

  const pressData = [
    { year: '2021', articles: 8, highlight: 'Consolidación post-pandemia' },
    { year: '2022', articles: 12, highlight: 'Aumento en diarios nacionales' },
    { year: '2023', articles: 15, highlight: 'Lanzamiento programa universitario' },
    { year: '2024', articles: 18, highlight: 'Pico por 10° aniversario' },
    { year: '2025', articles: 22, highlight: 'Récord de publicaciones' },
  ]

  const mediaData = [
    { year: '2021', interventions: 35, minutes: 450 },
    { year: '2022', interventions: 48, minutes: 680 },
    { year: '2023', interventions: 65, minutes: 920 },
    { year: '2024', interventions: 82, minutes: 1200 },
    { year: '2025', interventions: 96, minutes: 1440 },
  ]

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-2xl shadow-slate-300/20">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 font-[family-name:var(--font-display)]">
            Impacto Mediático
          </h3>
          <p className="text-sm text-slate-500">
            Evolución 2021-2025
          </p>
        </div>

        {/* Press Evolution Chart */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2c4a7c]" />
            <h4 className="text-sm font-bold text-slate-700 font-[family-name:var(--font-display)]">
              Presencia en Prensa Escrita
            </h4>
          </div>
          
          <div className="relative pt-4 pb-10">
            <div className="relative px-2" style={{ height: '160px' }}>
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-slate-300" />
              
              <div className="relative flex justify-between gap-2 h-full">
                {pressData.map((item, index) => {
                  const maxArticles = 22
                  const barHeight = (item.articles / maxArticles) * 140
                  const isLast = index === pressData.length - 1

                  return (
                    <div 
                      key={item.year} 
                      className="relative flex-1 group cursor-pointer"
                      style={{ height: '100%' }}
                    >
                      <div className="absolute bottom-0 left-0 right-0">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: barHeight }}
                          transition={{ 
                            duration: 0.8, 
                            delay: index * 0.12,
                            ease: [0.34, 1.56, 0.64, 1] 
                          }}
                          viewport={{ once: false, amount: 0.3 }}
                          whileHover={{ scaleX: 1.1 }}
                          className={`w-full rounded-t-lg relative overflow-hidden origin-bottom ${
                            isLast
                              ? 'bg-gradient-to-t from-[#2c4a7c] to-[#4a6491]'
                              : 'bg-gradient-to-t from-[#6b7c93] to-[#8a9db5]'
                          }`}
                        >
                          <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                          />
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.12 + 0.6 }}
                            viewport={{ once: false }}
                            className="absolute top-2 inset-x-0 text-center"
                          >
                            <span className="text-white font-bold text-xs drop-shadow-lg font-[family-name:var(--font-display)]">
                              {item.articles}
                            </span>
                          </motion.div>
                        </motion.div>

                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                          <motion.div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl">
                            <div className="font-bold">{item.articles} artículos</div>
                            <div className="text-[10px] text-slate-300">{item.highlight}</div>
                          </motion.div>
                          <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 mx-auto" />
                        </div>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        viewport={{ once: false }}
                        className="absolute -bottom-6 inset-x-0 text-center"
                      >
                        <span className="text-[10px] font-semibold text-slate-600 font-[family-name:var(--font-display)]">
                          {item.year}
                        </span>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Radio/TV Evolution Chart */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#2c4a7c]" />
            <h4 className="text-sm font-bold text-slate-700 font-[family-name:var(--font-display)]">
              Presencia en Radio y TV
            </h4>
          </div>
          
          <div className="relative pt-4 pb-10">
            <div className="relative px-2" style={{ height: '160px' }}>
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-slate-300" />
              
              <div className="relative flex justify-between gap-2 h-full">
                {mediaData.map((item, index) => {
                  const maxInterventions = 96
                  const barHeight = (item.interventions / maxInterventions) * 140
                  const isLast = index === mediaData.length - 1

                  return (
                    <div 
                      key={item.year} 
                      className="relative flex-1 group cursor-pointer"
                      style={{ height: '100%' }}
                    >
                      <div className="absolute bottom-0 left-0 right-0">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: barHeight }}
                          transition={{ 
                            duration: 0.8, 
                            delay: index * 0.12,
                            ease: [0.34, 1.56, 0.64, 1] 
                          }}
                          viewport={{ once: false, amount: 0.3 }}
                          whileHover={{ scaleX: 1.1 }}
                          className={`w-full rounded-t-lg relative overflow-hidden origin-bottom ${
                            isLast
                              ? 'bg-gradient-to-t from-[#2c4a7c] to-[#4a6491]'
                              : 'bg-gradient-to-t from-[#6b7c93] to-[#8a9db5]'
                          }`}
                        >
                          <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                          />
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.12 + 0.6 }}
                            viewport={{ once: false }}
                            className="absolute top-2 inset-x-0 text-center"
                          >
                            <span className="text-white font-bold text-xs drop-shadow-lg font-[family-name:var(--font-display)]">
                              {item.interventions}
                            </span>
                          </motion.div>
                        </motion.div>

                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                          <motion.div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl">
                            <div className="font-bold">{item.interventions} intervenciones</div>
                            <div className="text-[10px] text-slate-300">{item.minutes} minutos de aire</div>
                          </motion.div>
                          <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 mx-auto" />
                        </div>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        viewport={{ once: false }}
                        className="absolute -bottom-6 inset-x-0 text-center"
                      >
                        <span className="text-[10px] font-semibold text-slate-600 font-[family-name:var(--font-display)]">
                          {item.year}
                        </span>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="pt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: false }}
              className="bg-slate-50 rounded-xl p-3 border border-slate-200"
            >
              <div className="text-2xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
                75
              </div>
              <div className="text-xs text-slate-600 font-semibold">Artículos Totales</div>
              <div className="text-[10px] text-slate-500">Prensa escrita 2021-2025</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: false }}
              className="bg-slate-50 rounded-xl p-3 border border-slate-200"
            >
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#2c4a7c]" />
                <span className="text-2xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
                  4.690
                </span>
              </div>
              <div className="text-xs text-slate-600 font-semibold">Minutos Totales</div>
              <div className="text-[10px] text-slate-500">Radio y TV 2021-2025</div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: false }}
            className="bg-gradient-to-r from-[#2c4a7c]/10 to-[#4a6491]/10 rounded-xl p-3 border border-[#2c4a7c]/20"
          >
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 rounded-lg bg-[#2c4a7c]"
              >
                <TrendingUp className="w-4 h-4 text-white" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
                    +274%
                  </span>
                  <Sparkles className="w-3 h-3 text-[#4a6491]" />
                </div>
                <div className="text-[10px] text-slate-600">
                  Crecimiento en intervenciones 2021-2025
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media Summary */}
        <div className="pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center font-[family-name:var(--font-display)] mb-3">
            Alcance Digital
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center">
            {socialStats.map((stat, index) => (
              <motion.div
                key={stat.platform}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                viewport={{ once: false }}
                className="bg-slate-50 rounded-lg p-2 border border-slate-100"
              >
                <div className="text-xs font-semibold text-[#2c4a7c] font-[family-name:var(--font-display)]">
                  {(stat.followers / 1000).toFixed(1)}K
                </div>
                <div className="text-[9px] text-slate-600 truncate">
                  {stat.platform.split(' ')[0]}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: false }}
            className="text-center pt-3"
          >
            <span className="text-sm font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
              {totalFollowers.toLocaleString()}
            </span>
            <span className="text-xs text-slate-600 ml-1">seguidores totales</span>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}
