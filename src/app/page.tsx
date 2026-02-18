'use client'

import { useState } from 'react'
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

function ViewToggle({ mode, onChange }: { mode: 'kai' | 'web'; onChange: (m: 'kai' | 'web') => void }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-parchment-edge rounded-full px-1.5 py-1 shadow-sm">
      <button
        onClick={() => onChange('kai')}
        className={`font-dm text-[0.6rem] font-semibold px-3 py-1 rounded-full transition-all uppercase tracking-wider ${
          mode === 'kai'
            ? 'bg-kai-gold text-white shadow-sm'
            : 'text-ink-faint hover:text-ink'
        }`}
        aria-label="Switch to Kai encounter view"
      >
        🔥 Kai
      </button>
      <button
        onClick={() => onChange('web')}
        className={`font-dm text-[0.6rem] font-semibold px-3 py-1 rounded-full transition-all uppercase tracking-wider ${
          mode === 'web'
            ? 'bg-ku text-white shadow-sm'
            : 'text-ink-faint hover:text-ink'
        }`}
        aria-label="Switch to web hub view"
      >
        🌐 Hub
      </button>
    </div>
  )
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

export default function Home() {
  const [mode, setMode] = useState<'kai' | 'web'>('kai')

  return (
    <>
      <ViewToggle mode={mode} onChange={setMode} />
      {mode === 'kai' ? <KaiLanding /> : <WebLanding />}
    </>
  )
}
