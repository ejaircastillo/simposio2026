'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { TrendingUp, Sparkles } from 'lucide-react'

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

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-2xl shadow-slate-300/20">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 font-[family-name:var(--font-display)]">
            Alcance en Redes
          </h3>
          <p className="text-sm text-slate-500">
            +1M visualizaciones ultimo trimestre 2025
          </p>
        </div>

        {/* Donut Chart - Gender distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.5 }}
          className="relative mx-auto w-56 h-56"
        >
          <svg viewBox="0 0 100 100" className="transform -rotate-90 drop-shadow-lg">
            {/* Men segment (background - smaller portion) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#c5ced9"
              strokeWidth="12"
              strokeDasharray="238.76"
              strokeDashoffset="0"
              className="opacity-60"
            />

            {/* Women segment (main - 71.8%) */}
            <motion.circle
              initial={{ strokeDashoffset: 238.76 }}
              whileInView={{ strokeDashoffset: 238.76 - (238.76 * 71.8) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="url(#gradient-women-vibrant)"
              strokeWidth="12"
              strokeDasharray="238.76"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Gradient and filter definitions */}
            <defs>
              <linearGradient id="gradient-women-vibrant" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="50%" stopColor="#2c4a7c" />
                <stop offset="100%" stopColor="#3b5998" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Center content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: false }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]"
            >
              71.8%
            </motion.div>
            <div className="text-sm text-slate-600 font-semibold">Mujeres</div>
            <div className="text-xs text-slate-400 mt-1">Audiencia principal</div>
          </motion.div>
        </motion.div>

        {/* Gender legend */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
          className="flex items-center justify-center gap-8"
        >
          {genderData.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full ${item.color} ${item.ring ? 'ring-2 ring-[#2c4a7c]/30 ring-offset-2' : ''}`} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">
                  {item.label}
                </span>
                <span className="text-xs text-slate-500">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Platform breakdown */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center font-[family-name:var(--font-display)]">
            Seguidores por Plataforma
          </h4>
          {socialStats.map((stat, index) => {
            const percentage = (stat.followers / totalFollowers) * 100

            return (
              <motion.div 
                key={stat.platform} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.5 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">
                    {stat.platform}
                  </span>
                  <span className="text-slate-600 font-mono text-xs">
                    {stat.followers.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    viewport={{ once: false, amount: 0.5 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full relative overflow-hidden`}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Instagram growth highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: false, amount: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#2c4a7c]/10 to-[#4a6491]/10 border border-[#2c4a7c]/20"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-xl bg-[#2c4a7c]"
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
                  +196%
                </span>
                <Sparkles className="w-4 h-4 text-[#4a6491]" />
              </div>
              <div className="text-xs text-slate-600">
                Crecimiento Instagram ultimo trimestre
              </div>
            </div>
          </div>
        </motion.div>

        {/* Total followers */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: false }}
          className="text-center pt-4 border-t border-slate-200"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            viewport={{ once: false }}
            className="text-4xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]"
          >
            {totalFollowers.toLocaleString()}
          </motion.div>
          <div className="text-sm text-slate-600 font-semibold mt-1">
            Seguidores Totales
          </div>
        </motion.div>
      </div>
    </Card>
  )
}
