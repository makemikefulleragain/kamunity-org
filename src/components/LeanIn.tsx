'use client'

import { useState, ReactNode } from 'react'

export default function LeanIn({ children, label = 'lean in' }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-4">
      <button
        onClick={() => setOpen(!open)}
        className="font-sans text-[0.72rem] text-ink-faint border border-parchment-edge rounded-md px-3 py-1.5 hover:border-ink-faint hover:text-ink-light transition-all cursor-pointer bg-transparent flex items-center gap-1.5"
      >
        {label}
        <span className={`transition-transform duration-300 text-[0.6rem] ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
      >
        <div className="pl-4 border-l-2 border-fire-amber/40 text-[0.82rem] text-ink-light leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
