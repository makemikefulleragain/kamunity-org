'use client'

import { useEffect, useRef } from 'react'

export default function AmbientZone() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    // Create ember particles — campfire warmth (generous spread)
    const embers: HTMLDivElement[] = []
    const EMBER_COUNT = 20

    for (let i = 0; i < EMBER_COUNT; i++) {
      const ember = document.createElement('div')
      ember.className = 'kai-ember'
      const size = 2 + Math.random() * 4
      ember.style.width = `${size}px`
      ember.style.height = `${size}px`
      ember.style.left = `${5 + Math.random() * 90}%`
      ember.style.bottom = `${Math.random() * 85}%`
      ember.style.animationDelay = `${Math.random() * 6}s`
      ember.style.animationDuration = `${3 + Math.random() * 5}s`
      ember.style.opacity = '0'
      container.appendChild(ember)
      embers.push(ember)
    }

    return () => {
      embers.forEach((e) => e.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-kai-cream via-[#FFF6EC] to-parchment" />

      {/* Very subtle radial glow at centre */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kai-glow rounded-full blur-3xl opacity-50" />
    </div>
  )
}
