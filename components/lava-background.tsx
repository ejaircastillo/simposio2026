'use client'

import { motion } from 'framer-motion'

export function LavaBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-blue-50" />
      
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />
      
      {/* Animated blobs - Blue (logo color) */}
      <motion.div
        animate={{
          x: [0, 100, 50, -50, 0],
          y: [0, -100, 100, 50, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#2c4a7c] opacity-[0.15] blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -80, 60, -30, 0],
          y: [0, 80, -60, 100, 0],
          scale: [1, 0.8, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#3b5998] opacity-[0.12] blur-3xl"
      />
      
      {/* Gray blobs (logo color) */}
      <motion.div
        animate={{
          x: [0, 70, -90, 40, 0],
          y: [0, -50, 80, -70, 0],
          scale: [1, 1.1, 0.85, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-[#8a9db5] opacity-[0.15] blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -60, 100, -80, 0],
          y: [0, 100, -40, 60, 0],
          scale: [1, 0.9, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/3 w-[550px] h-[550px] rounded-full bg-[#6b7c93] opacity-[0.1] blur-3xl"
      />
      
      {/* Lighter accent blobs */}
      <motion.div
        animate={{
          x: [0, 50, -70, 90, 0],
          y: [0, -80, 50, -40, 0],
          scale: [1, 1.3, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4a6491] opacity-[0.08] blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -40, 80, -60, 0],
          y: [0, 60, -90, 30, 0],
          scale: [1, 0.95, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-[#1e3a5f] opacity-[0.1] blur-3xl"
      />
    </div>
  )
}
