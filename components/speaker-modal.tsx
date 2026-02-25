'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { speakers } from '@/lib/speakers'

export interface SpeakerModalProps {
  speakerId: string | null
  onClose: () => void
}

export function SpeakerModal({ speakerId, onClose }: SpeakerModalProps) {
  const speaker = speakers.find(s => s.id === speakerId)

  if (!speaker) return null

  return (
    <Dialog open={!!speakerId} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-background overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{speaker.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row">
          {/* Imagen: arriba en mobile, columna izquierda en desktop */}
          {speaker.image && (
            <div className="relative w-full md:w-[42%] aspect-[4/3] md:aspect-auto md:min-h-[420px] flex-shrink-0 bg-slate-100">
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                style={{
                  objectFit: speaker.imageScale === 'contain' ? 'contain' : 'cover',
                  objectPosition: speaker.objectPosition || 'center top',
                  backgroundColor: '#f1f5f9'
                }}
                priority
              />
            </div>
          )}

          {/* Texto: debajo en mobile, columna derecha en desktop */}
          {/* pt-10 garantiza espacio por encima del nombre, evitando solapamiento con el botón X (absolute top-4 right-4) */}
          <div className="flex-1 flex flex-col justify-start gap-4 p-6 pt-10 md:p-8 md:pt-10 overflow-y-auto max-h-[50vh] md:max-h-[420px]">
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-display)] leading-tight">
                {speaker.name}
              </h3>
              <p className="text-base text-primary font-semibold">
                {speaker.title}
              </p>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {speaker.bio}
            </p>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
