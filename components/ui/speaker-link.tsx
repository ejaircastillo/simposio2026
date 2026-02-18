'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SpeakerLinkProps {
  name: string
  onClick: (e: React.MouseEvent) => void
}

export function SpeakerLink({ name, onClick }: SpeakerLinkProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="font-bold cursor-pointer inline-flex items-center relative px-1.5 py-0.5 -mx-1.5 rounded-md bg-transparent border-none outline-none focus:outline-none transition-all duration-300 ease-out hover:bg-primary/5 hover:scale-105"
    >
      <span
        className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:100%_auto] transition-all duration-300 ease-out hover:bg-[length:200%_auto] hover:animate-shimmer"
        style={{
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text'
        }}
      >
        {name}
      </span>
    </button>
  )
}
