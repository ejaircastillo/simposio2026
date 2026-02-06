'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'

// TopoJSON del mundo (baja resolución para performance)
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Coordenadas aproximadas de las capitales de provincias donde hubo capacitación
const provinces = [
  { name: 'Catamarca', count: 23, coordinates: [-65.7841, -28.4696] },
  { name: 'La Rioja', count: 72, coordinates: [-66.8552, -29.4135] },
  { name: 'Santiago del Estero', count: 54, coordinates: [-64.2642, -27.7834] },
  { name: 'Corrientes', count: 46, coordinates: [-58.8341, -27.4696] },
  { name: 'Entre Rios', count: 62, coordinates: [-60.5188, -31.7444] },
  { name: 'San Luis', count: 49, coordinates: [-66.3378, -33.3017] },
  { name: 'Mendoza', count: 46, coordinates: [-68.8458, -32.8895] },
  { name: 'Rio Negro', count: 128, coordinates: [-68.0592, -40.8139] },
  { name: 'Chubut', count: 38, coordinates: [-65.1022, -43.2983] },
]

export function CapacitacionViz() {
  return (
    <Card className="p-8 bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-2xl shadow-slate-300/20">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 font-display">
            Alcance Nacional
          </h3>
          <p className="text-sm text-slate-500">
            Curso de Victimologia 2023
          </p>
        </div>

        {/* Mapa profesional con react-simple-maps */}
        <div className="relative w-full aspect-4/3 max-w-lg mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-linear-to-b from-blue-50/50 to-white">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 650,
              center: [-65, -38],
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }: any) =>
                  geographies.map((geo: any) => {
                    const isArgentina = geo.properties.ISO_A3 === 'ARG'
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isArgentina ? '#2c4a7c' : '#e2e8f0'}
                        fillOpacity={isArgentina ? 0.15 : 0.5}
                        stroke={isArgentina ? '#2c4a7c' : '#cbd5e1'}
                        strokeWidth={isArgentina ? 1.5 : 0.5}
                        strokeOpacity={isArgentina ? 0.6 : 0.3}
                        style={{
                          default: {
                            outline: 'none',
                            transition: 'all 0.3s ease',
                          },
                          hover: {
                            fill: isArgentina ? '#2c4a7c' : '#e2e8f0',
                            fillOpacity: isArgentina ? 0.25 : 0.5,
                            outline: 'none',
                            cursor: isArgentina ? 'pointer' : 'default',
                          },
                          pressed: {
                            outline: 'none',
                          },
                        }}
                      />
                    )
                  })
                }
              </Geographies>

              {/* Marcadores de provincias */}
              {provinces.map((province, index) => (
                <Marker key={province.name} coordinates={province.coordinates}>
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    viewport={{ once: false }}
                  >
                    {/* Anillo pulsante */}
                    <motion.circle
                      r={8}
                      fill="#2c4a7c"
                      fillOpacity={0.2}
                      animate={{
                        r: [8, 14, 8],
                        fillOpacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    
                    {/* Marcador principal */}
                    <circle
                      r={5}
                      fill="#2c4a7c"
                      stroke="white"
                      strokeWidth={2}
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(44, 74, 124, 0.3))',
                        cursor: 'pointer',
                      }}
                    />
                    
                    {/* Badge con número */}
                    <g transform="translate(4, -10)">
                      <circle r={7} fill="#2c4a7c" />
                      <text
                        textAnchor="middle"
                        dy={3}
                        fontSize={6}
                        fontWeight="bold"
                        fill="white"
                      >
                        {province.count}
                      </text>
                    </g>
                  </motion.g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Overlay con información */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2c4a7c]" />
              <span className="text-sm font-medium text-slate-700">
                9 Provincias con capacitación
              </span>
            </div>
          </div>

          {/* Título del mapa */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-slate-200">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              República Argentina
            </span>
          </div>
        </div>

        {/* Lista de provincias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: false }}
          className="grid grid-cols-3 gap-2 text-center"
        >
          {provinces.map((province, index) => (
            <motion.div
              key={province.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 + index * 0.05 }}
              viewport={{ once: false }}
              className="bg-slate-50 rounded-lg px-2 py-2 border border-slate-100"
            >
              <div className="text-xs font-semibold text-slate-700 truncate">
                {province.name}
              </div>
              <div className="text-xs text-[#2c4a7c] font-bold">
                {province.count}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
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
                transition={{ duration: 0.4, delay: 1.7 + i * 0.1 }}
                viewport={{ once: false }}
                className="space-y-1"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#2c4a7c] font-display">
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
