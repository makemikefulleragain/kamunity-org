'use client'

import { useState, useEffect, useCallback } from 'react'
import KaiLanding from '../components/kai/KaiLanding'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import SubHero from '../components/SubHero'
import ProblemSolution from '../components/ProblemSolution'
import HowItWorks from '../components/HowItWorks'
import Values from '../components/Values'
import Showcase from '../components/Showcase'
import Feed from '../components/Feed'
import About from '../components/About'
import CTA from '../components/CTA'
import MachineLayer from '../components/MachineLayer'
import Footer from '../components/Footer'

function Divider() {
  return <div className="w-10 h-0.5 bg-fire-amber mx-auto my-14 opacity-50 rounded-sm" />
}

function WebLanding() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="max-w-[960px] mx-auto px-8 pt-8">
        <SubHero />
        <Divider />
        <ProblemSolution />
        <Divider />
        <HowItWorks />
        <Divider />
        <Values />
        <Divider />
        <Showcase />
        <Divider />
        <Feed />
        <Divider />
        <About />
        <CTA />
        <MachineLayer />
      </div>
      <Footer />
    </>
  )
}

function KaiModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Kai chat"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container - responsive padding */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[calc(100vh-4rem)] sm:max-w-4xl sm:m-8 animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg border border-parchment-edge text-ink hover:text-kai-gold hover:border-kai-gold transition-colors"
          aria-label="Close Kai chat"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal content wrapper - constrains fixed elements */}
        <div className="relative w-full h-full sm:h-[calc(100vh-4rem)] sm:max-h-[800px] bg-kai-cream sm:rounded-2xl overflow-hidden shadow-2xl isolation-auto">
          <KaiLanding />
        </div>
      </div>
    </div>
  )
}

function KaiFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-kai-gold to-kai-gold-dark text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-white/20"
      aria-label="Open Kai chat"
    >
      <span className="text-2xl">🔥</span>
    </button>
  )
}

export default function Home() {
  const [kaiOpen, setKaiOpen] = useState(false)

  return (
    <>
      <WebLanding />
      <KaiFab onClick={() => setKaiOpen(true)} />
      <KaiModal open={kaiOpen} onClose={() => setKaiOpen(false)} />
    </>
  )
}
