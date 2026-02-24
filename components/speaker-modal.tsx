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
      <DialogContent className="max-w-2xl p-0 bg-background/95 backdrop-blur-lg z-[50] overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{speaker.name}</DialogTitle>
        </DialogHeader>
          <div className="relative">
            {speaker.image ? (
              <>
                <div className="relative aspect-[3/4] md:aspect-[4/3] bg-slate-50">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    style={{
                      objectFit: (speaker.imageScale === 'object-cover' || !speaker.imageScale) 
                        ? 'cover' as const
                        : speaker.imageScale === 'object-contain'
                        ? 'contain' as const
                        : 'cover' as const,
                      objectPosition: speaker.objectPosition === 'object-top' 
                        ? 'top center' 
                        : speaker.objectPosition === 'object-center' || !speaker.objectPosition
                        ? 'center'
                        : speaker.objectPosition,
                      backgroundColor: '#f8fafc'
                    }}
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent p-8 space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground font-[family-name:var(--font-display)] mb-2">
                      {speaker.name}
                    </h3>
                    <p className="text-lg text-primary font-medium">
                      {speaker.title}
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>
              </>
            ) : (
              <div className="p-8 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-foreground font-[family-name:var(--font-display)] mb-2">
                    {speaker.name}
                  </h3>
                  <p className="text-lg text-primary font-medium">
                    {speaker.title}
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
