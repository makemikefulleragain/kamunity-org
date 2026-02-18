'use client'

import { useEffect, useState } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export default function Typewriter({ text, speed = 20, onComplete, className = '' }: TypewriterProps) {
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setCharIndex(0)
    setDone(false)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setCharIndex(text.length)
      setDone(true)
      onComplete?.()
      return
    }

    let i = 0
    const interval = setInterval(() => {
      i++
      setCharIndex(i)
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  // Split the revealed text into paragraphs as they appear
  const revealed = text.slice(0, charIndex)
  const paragraphs = revealed.split('\n\n')

  return (
    <div className={`space-y-3 ${className}`}>
      {paragraphs.map((para, i) => (
        <p key={i} className="kai-voice text-ink text-sm leading-relaxed">
          {para}
          {i === paragraphs.length - 1 && !done && <span className="kai-cursor" />}
        </p>
      ))}
    </div>
  )
}
