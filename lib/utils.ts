import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findSpeakerIds(text: string): Map<string, string> {
  const { speakers } = require('./speakers')
  const speakerMap = new Map<string, string>()

  speakers.forEach((speaker: any) => {
    if (text.includes(speaker.name)) {
      speakerMap.set(speaker.name, speaker.id)
    }
  })

  return speakerMap
}
