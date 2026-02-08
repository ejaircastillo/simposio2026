'use client'

import { useRef, type ComponentType } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AcompanamientoViz } from './visualizations/acompanamiento-viz'
import { CapacitacionViz } from './visualizations/capacitacion-viz'
import { LegislativoViz } from './visualizations/legislativo-viz'
import { ComunicacionViz } from './visualizations/comunicacion-viz'

type Direction = 'down' | 'right' | 'left'

type Section = {
  id: string
  title: string
  description: string
  stats: Array<{ label: string; value: string; trend: string }>
  highlights: string[]
  footerNote?: string
  visualization: ComponentType
  direction: Direction
  bgColor: string
}

const sections: Section[] = [
  {
    id: 'acompanamiento',
    title: 'Acompañamiento de Víctimas',
    description:
      'Desde 2021 hemos acompañado a víctimas en su búsqueda de justicia, brindando asistencia legal y apoyo en cada etapa del proceso judicial.',
    stats: [
      { label: 'Casos Acompañados', value: '37', trend: 'Crecimiento sostenido desde 2021' },
      { label: 'Asistencia a Juicios', value: '13', trend: 'Presencia activa en tribunales' },
      { label: 'Víctimas Agradecidas', value: '+20', trend: 'Testimonios recibidos en 2025' },
    ],
    highlights: [
      'Caso Oroño: Primera condena obtenida en 2023',
      'Caso Pablo Flores: Acompañamiento exitoso',
      'Caso Acosta: Condena lograda en 2024',
      'Base de Datos de Víctimas creada en 2025',
    ],
    visualization: AcompanamientoViz,
    direction: 'down' as Direction,
    bgColor: 'from-blue-50/50 to-transparent',
  },
  {
    id: 'capacitacion',
    title: 'Capacitación e Investigación',
    description:
      'Formamos profesionales en victimología y generamos conocimiento especializado para transformar el sistema de justicia.',
    stats: [
      { label: 'Personas Capacitadas', value: '518', trend: 'Empleados judiciales en 9 provincias' },
      { label: 'Jornadas Realizadas', value: '13', trend: 'Eventos académicos 2021-2025' },
      { label: 'Publicaciones', value: '5', trend: 'Libros y dossiers especializados' },
    ],
    highlights: [
      'Instituto de Victimología (IVUJUS) fundado en 2025',
      'Índice Legislativo con IA creado en 2025',
      'Convenio Marco con 9 provincias en 2023',
      'Curso de Victimología con 1,300 inscriptos',
    ],
    visualization: CapacitacionViz,
    direction: 'right' as Direction,
    bgColor: 'from-slate-50/50 to-transparent',
  },
  {
    id: 'legislativo',
    title: 'Incidencia Legislativa',
    description:
      'Promovemos leyes que protegen a las víctimas y mejoran el sistema de justicia penal en toda Argentina.',
    stats: [
      { label: 'Leyes Promovidas', value: '14', trend: '5 aprobadas, 2 en trámite' },
      { label: 'Amicus Curiae', value: '9', trend: '6 fallos favorables' },
      { label: 'Intervenciones OEA', value: '9', trend: 'Presencia internacional' },
    ],
    highlights: [
      '2025: Ley de Juicio en Ausencia - Caso AMIA',
      '2024: Ley de Registro de Datos Genéticos',
      '2024: Ley de Reiterancia aprobada',
      'Imprescriptibilidad de homicidios en nuevo Código Penal',
    ],
    visualization: LegislativoViz,
    direction: 'down' as Direction,
    bgColor: 'from-blue-50/30 to-transparent',
  },
  {
    id: 'comunicacion',
    title: 'Comunicación y Alcance',
    description:
      'Generamos conciencia ciudadana sobre derechos de las víctimas a través de medios y redes sociales.',
    stats: [
      { label: 'Seguidores Totales', value: '43,531', trend: 'En 4 plataformas sociales' },
      { label: 'Visualizaciones', value: '+1M', trend: 'Último trimestre 2025' },
      { label: 'Artículos Publicados', value: '85', trend: 'Opinión en medios 2021-2025' },
      { label: 'Intervenciones/mes', value: '5-8', trend: 'En medios nacionales' },
      { label: 'Tiempo de aire', value: '~120', trend: 'Minutos/mes en TV y radio' },
    ],
    highlights: [
      'Facebook: 660,000 visualizaciones (+570% seguidores)',
      'Instagram: 196% crecimiento de alcance',
      '71.8% audiencia femenina comprometida',
      'Campañas: Baja de Edad, Celulares en Cárceles',
      'Presencia en LN+ y TN (TV nacional)',
      'Columna semanal en Radio VEO Oeste',
    ],
    footerNote: 'Los datos presentados surgen del cruce del Registro de Actividad Institucional 2021-2025 y el Monitoreo de Medios realizado por el equipo técnico de la asociación. La evolución anual se estima en base a la indexación de artículos en prensa escrita nacional y la frecuencia de columnas fijas en medios radiales y de streaming.',
    visualization: ComunicacionViz,
    direction: 'left' as Direction,
    bgColor: 'from-slate-50/30 to-transparent',
  },
]

export function ScrollytellingSection() {
  return (
    <div className="relative">
      {sections.map((section, index) => (
        <ScrollySection key={section.id} section={section} index={index} />
      ))}
    </div>
  )
}

function ScrollySection({
  section,
  index,
}: {
  section: (typeof sections)[0]
  index: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Smoother, more gradual transitions with wider "stable" zone
  const yDown = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [60, 0, 0, -60])
  const xRight = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [-100, 0, 0, 100])
  const xLeft = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [100, 0, 0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.97, 1, 1, 0.97])

  const Visualization = section.visualization

  return (
    <div 
      ref={containerRef} 
      className={`relative min-h-screen bg-gradient-to-b ${section.bgColor}`}
    >
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <motion.div 
          style={{ 
            opacity, 
            x: section.direction === 'down' ? 0 : section.direction === 'right' ? xRight : xLeft, 
            y: section.direction === 'down' ? yDown : 0, 
            scale 
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text Content */}
          <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
            {/* Section number */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="px-4 py-2 rounded-full bg-[#2c4a7c]/10 text-[#2c4a7c] text-sm font-semibold font-[family-name:var(--font-display)] tracking-wide">
                Eje {index + 1}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 text-balance leading-[1.1] font-[family-name:var(--font-display)]"
            >
              {section.title}
            </motion.h2>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed text-pretty"
            >
              {section.description}
            </motion.p>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
            >
              {section.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="space-y-2 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/30 cursor-default"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#2c4a7c] font-[family-name:var(--font-display)]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500">{stat.trend}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-4 pt-4"
            >
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-[family-name:var(--font-display)]">
                Hitos Destacados
              </h3>
              <ul className="space-y-3">
                {section.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: section.direction === 'left' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-[#2c4a7c] to-[#4a6491] flex-shrink-0" 
                    />
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {section.footerNote && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: false, amount: 0.3 }}
                className="pt-6 mt-6 border-t border-slate-200/50"
              >
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  {section.footerNote}
                </p>
              </motion.div>
            )}
          </div>

          {/* Visualization */}
          <motion.div 
            className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Visualization />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
