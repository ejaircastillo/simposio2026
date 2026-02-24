'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'

export function FloatingRegistrationButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <motion.button
      animate={{ 
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        const registrationSection = document.getElementById('registration')
        registrationSection?.scrollIntoView({ behavior: 'smooth' })
      }}
      style={{ position: 'fixed', top: '50%', transform: 'translateY(-50%)', right: '32px', zIndex: 999999 }}
      className="flex items-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative max-w-max"
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-600"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ zIndex: -1 }}
      />
      <Pencil className="w-5 h-5" />
      <span className="hidden sm:inline">Inscribirme ahora</span>
    </motion.button>,
    document.body
  )
}
