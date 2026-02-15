'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 80)
      lastY = y

      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h > 0) setScrollProgress((y / h) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[3px] z-[200] bg-ku transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 py-2 flex items-center justify-between bg-parchment/95 backdrop-blur-[10px] border-b border-parchment-edge/30 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <a href="/" className="font-sans text-[0.95rem] font-bold text-ink no-underline flex items-center gap-1.5">
          <span className="text-[1.1rem]">🔥</span> kamunity<span className="text-ku">.</span>
        </a>
        <div className="flex gap-4 items-center">
          <a href="#how" className="font-sans text-[0.62rem] text-ink-faint no-underline uppercase tracking-[1.3px] hover:text-ink transition-colors hidden sm:inline">
            How It Works
          </a>
          <a href="#showcase" className="font-sans text-[0.62rem] text-ink-faint no-underline uppercase tracking-[1.3px] hover:text-ink transition-colors hidden sm:inline">
            Showcase
          </a>
          <a href="#feed" className="font-sans text-[0.62rem] text-ink-faint no-underline uppercase tracking-[1.3px] hover:text-ink transition-colors hidden sm:inline">
            Stories
          </a>
          <a
            href="https://kamunity.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.62rem] text-white bg-ku px-3.5 py-1.5 rounded-md font-semibold uppercase tracking-[1.3px] hover:bg-ku-light transition-colors no-underline"
          >
            Get Started
          </a>
        </div>
      </nav>
    </>
  )
}
