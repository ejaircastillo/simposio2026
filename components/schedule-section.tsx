'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { schedule } from '@/lib/schedule'
import { speakers } from '@/lib/speakers'
import { cn } from '@/lib/utils'
import { SpeakerModal } from '@/components/speaker-modal'
import { SpeakerLink } from '@/components/ui/speaker-link'

export function ScheduleSection() {
  const [activeTab, setActiveTab] = useState('0')
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null)

  const renderTextWithLinks = (text: string) => {
    if (!text) return <span>{text}</span>

    const parts: React.ReactNode[] = []
    let lastIndex = 0
    const sortedSpeakers = [...speakers].sort((a, b) => b.name.length - a.name.length)

    sortedSpeakers.forEach((speaker) => {
      const name = speaker.name
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(${escapedName})(?!\\w)`, 'gi')
      const match = regex.exec(text.slice(lastIndex))

      if (match && match.index !== undefined) {
        const globalIndex = lastIndex + match.index
        if (globalIndex >= lastIndex) {
          parts.push(text.slice(lastIndex, globalIndex))
          parts.push(
            <SpeakerLink
              key={speaker.id}
              name={match[1]}
              onClick={() => setSelectedSpeakerId(speaker.id)}
            />
          )
          lastIndex = globalIndex + match[1].length
        }
      }
    })

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return <>{parts.length > 0 ? parts : <span>{text}</span>}</>
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'highlight':
        return 'default'
      case 'main':
        return 'secondary'
      case 'ceremony':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'highlight':
        return 'Ponencia Central'
      case 'main':
        return 'Apertura'
      case 'panel':
        return 'Panel'
      case 'ceremony':
        return 'Ceremonia'
      case 'logistics':
        return 'Logística'
      default:
        return ''
    }
  }

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-display)] text-sky-800">
            Programa
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cronograma completo del Simposio 2026
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="0">Jueves 9</TabsTrigger>
            <TabsTrigger value="1">Viernes 10</TabsTrigger>
          </TabsList>

          {schedule.map((day, dayIndex) => (
            <TabsContent key={dayIndex} value={dayIndex.toString()} className="mt-8">
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.3 }}
                  className="space-y-4"
                >
                  {day.events.map((event, eventIndex) => (
                    <motion.div
                      key={eventIndex}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4 }}
                    >
                    <Card className={cn(
                      'transition-all duration-300 hover:shadow-md',
                      event.type === 'highlight' && 'border-primary/50'
                    )}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="text-2xl font-bold text-primary font-[family-name:var(--font-mono)]">
                              {event.time}
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-3">
                              <h3 className="font-semibold text-lg text-foreground flex-1">
                                {event.title}
                              </h3>
                              {event.type && event.type !== 'panel' && (
                                <Badge variant={getBadgeVariant(event.type)}>
                                  {getTypeLabel(event.type)}
                                </Badge>
                              )}
                            </div>

                            {event.description && (
                              <p className="text-sm text-muted-foreground">
                                {event.description}
                              </p>
                            )}

                            {event.speakers && event.speakers.length > 0 && (
                              <div className="space-y-2">
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Expositores
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {event.speakers.map((speaker, idx) => (
                                    <Badge key={idx} variant="outline" className="font-normal">
                                      {renderTextWithLinks(speaker)}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {event.moderator && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium">Moderador:</span>
                                <span className="text-foreground">
                                  {renderTextWithLinks(event.moderator)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <SpeakerModal speakerId={selectedSpeakerId} onClose={() => setSelectedSpeakerId(null)} />
        </div>
      </section>
    )
}
