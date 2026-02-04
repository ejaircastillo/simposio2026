'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

export function CapacitacionViz() {
  // Positions calibrated to the new accurate Argentina SVG
  const provinces = [
    { name: 'Catamarca', count: 23, x: 42, y: 22 },
    { name: 'La Rioja', count: 72, x: 38, y: 28 },
    { name: 'Santiago del Estero', count: 54, x: 52, y: 24 },
    { name: 'Corrientes', count: 46, x: 72, y: 26 },
    { name: 'Entre Rios', count: 62, x: 65, y: 36 },
    { name: 'San Luis', count: 49, x: 40, y: 42 },
    { name: 'Mendoza', count: 46, x: 32, y: 48 },
    { name: 'Rio Negro', count: 128, x: 38, y: 68 },
    { name: 'Chubut', count: 38, x: 42, y: 78 },
  ]

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-2xl shadow-slate-300/20">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 font-[family-name:var(--font-display)]">
            Alcance Nacional
          </h3>
          <p className="text-sm text-slate-500">
            Curso de Victimologia 2023
          </p>
        </div>

        {/* Map visualization */}
        <div className="relative aspect-[2/3] max-w-xs mx-auto">
          {/* Real Argentina SVG - accurate geographic outline */}
          <svg
            viewBox="0 0 180 340"
            className="w-full h-full"
            fill="none"
          >
            {/* Argentina continental */}
            <path
              d="M95.5,2 L100,3 L106,5 L112,8 L118,12 L122,16 L125,20 L127,24 L130,30 L133,38 L136,48 L138,56 L140,64 L141,72 L142,80 L142.5,88 L143,96 L143,104 L142.5,112 L142,120 L141,128 L140,134 L139,140 L138,146 L136,154 L134,162 L132,170 L130,178 L127,186 L124,194 L120,202 L116,210 L112,218 L108,226 L104,234 L100,242 L96,250 L92,257 L88,264 L84,271 L80,278 L77,284 L74,290 L72,295 L70,300 L68,305 L66,310 L63,316 L60,322 L57,327 L54,330 L50,332 L46,333 L42,332 L39,330 L37,326 L36,320 L36,314 L37,308 L38,302 L38,296 L37,290 L36,284 L34,278 L32,272 L30,266 L28,260 L26,254 L24,248 L23,242 L22,236 L22,230 L23,224 L25,218 L28,212 L32,206 L36,200 L40,195 L44,190 L48,186 L52,183 L55,180 L57,177 L58,174 L58,170 L57,166 L55,162 L52,158 L49,154 L46,150 L44,146 L43,142 L43,138 L44,134 L46,130 L49,126 L53,122 L57,119 L61,116 L64,113 L66,110 L67,106 L67,102 L66,98 L64,94 L62,90 L61,86 L61,82 L62,78 L64,74 L67,70 L70,67 L73,64 L76,62 L80,60 L84,58 L87,55 L89,51 L90,46 L90,40 L89,34 L88,28 L88,22 L89,16 L91,10 L93,6 L95.5,2 Z"
              fill="#2c4a7c"
              fillOpacity="0.12"
              stroke="#2c4a7c"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
            {/* Tierra del Fuego */}
            <path
              d="M42,338 L48,336 L56,336 L64,338 L70,342 L73,348 L72,354 L68,358 L62,360 L54,360 L46,358 L40,354 L38,348 L40,342 L42,338 Z"
              fill="#2c4a7c"
              fillOpacity="0.12"
              stroke="#2c4a7c"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
            {/* Islas Malvinas (reference) */}
            <path
              d="M120,330 L128,328 L136,330 L140,336 L138,342 L132,346 L124,346 L118,342 L116,336 L120,330 Z"
              fill="#2c4a7c"
              fillOpacity="0.08"
              stroke="#2c4a7c"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="3,2"
            />
          </svg>

          {/* Province markers */}
          {provinces.map((province, index) => (
            <motion.div
              key={province.name}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              viewport={{ once: false, amount: 0.5 }}
              className="absolute group cursor-pointer"
              style={{
                left: `${province.x}%`,
                top: `${province.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pulsing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="absolute inset-0 w-8 h-8 -m-1 rounded-full bg-[#2c4a7c]/30"
              />

              {/* Pin */}
              <motion.div
                whileHover={{ scale: 1.3, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-6 h-6 text-[#2c4a7c] fill-[#4a6491] drop-shadow-lg" />
              </motion.div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                whileHover={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 whitespace-nowrap pointer-events-none"
              >
                <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm shadow-2xl">
                  <div className="font-bold font-[family-name:var(--font-display)]">{province.name}</div>
                  <div className="text-xs text-slate-300">
                    {province.count} capacitados
                  </div>
                </div>
                <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 mx-auto" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
          className="pt-4"
        >
          <div className="flex items-center justify-center gap-6 md:gap-10 text-center">
            {[
              { value: '9', label: 'Provincias' },
              { value: '518', label: 'Capacitados' },
              { value: '1,300', label: 'Inscriptos Total' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                viewport={{ once: false }}
                className="space-y-1"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <div className="text-center">
          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            Convenio Marco con el Consejo Federal de Politica Criminal. Empleados judiciales del Poder Judicial en nueve provincias.
          </p>
        </div>
      </div>
    </Card>
  )
}
