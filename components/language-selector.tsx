'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

export function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const switchLocale = (newLocale: 'es' | 'en') => {
    const segments = pathname.split('/')
    
    if (params.locale) {
      segments[1] = newLocale
    } else {
      segments.unshift(newLocale)
    }
    
    router.push(segments.join('/'))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-slate-200/50">
        <motion.button
          onClick={() => switchLocale('es')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold font-[family-name:var(--font-display)] transition-all duration-300 ${
            locale === 'es'
              ? 'bg-gradient-to-r from-[#2c4a7c] to-[#4a6491] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="text-base">🇦🇷</span>
          <span>ES</span>
        </motion.button>
        
        <div className="w-px h-4 bg-slate-300" />
        
        <motion.button
          onClick={() => switchLocale('en')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold font-[family-name:var(--font-display)] transition-all duration-300 ${
            locale === 'en'
              ? 'bg-gradient-to-r from-[#2c4a7c] to-[#4a6491] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="text-base">🇺🇸</span>
          <span>EN</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
