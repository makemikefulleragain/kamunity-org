'use client'

import { useEffect, useState } from 'react'

const steps = [
  { label: 'Speak', emoji: '🔥', desc: 'A need is spoken at the fire' },
  { label: 'Listen', emoji: '👂', desc: 'The factory hears it' },
  { label: 'Plan', emoji: '📐', desc: 'A build plan forms' },
  { label: 'Build', emoji: '🔨', desc: 'Tools get made' },
  { label: 'Check', emoji: '🔍', desc: 'Quality is verified' },
  { label: 'Deliver', emoji: '✅', desc: 'Community gets the tool' },
]

export default function BuildLoop() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const radius = 110
  const cx = 150
  const cy = 140

  return (
    <div className="flex flex-col items-center">
      <div className="font-sans text-[0.5rem] uppercase tracking-[2px] text-ink-faint mb-3 font-semibold">
        The Build Loop
      </div>
      <div className="relative w-[300px] h-[280px]">
        <svg
          viewBox="0 0 300 280"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#d4c9b5"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {steps.map((_, i) => {
            const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2
            const nextAngle = ((i + 1) % steps.length / steps.length) * Math.PI * 2 - Math.PI / 2
            const x1 = cx + Math.cos(angle) * radius
            const y1 = cy + Math.sin(angle) * radius
            const x2 = cx + Math.cos(nextAngle) * radius
            const y2 = cy + Math.sin(nextAngle) * radius

            return i === active ? (
              <line
                key={`arrow-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#6366f1"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            ) : null
          })}
        </svg>

        {steps.map((step, i) => {
          const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2
          const x = cx + Math.cos(angle) * radius
          const y = cy + Math.sin(angle) * radius
          const isActive = i === active

          return (
            <div
              key={step.label}
              className={`absolute flex flex-col items-center transition-all duration-500 ${isActive ? 'scale-110 z-10' : 'scale-100 z-0'}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) ${isActive ? 'scale(1.1)' : 'scale(1)'}`,
              }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 ${
                  isActive
                    ? 'bg-ku text-white border-ku shadow-[0_0_16px_rgba(99,102,241,0.35)]'
                    : 'bg-white text-ink border-parchment-edge'
                }`}
              >
                {step.emoji}
              </div>
              <span
                className={`font-sans text-[0.5rem] uppercase tracking-[1px] mt-1 font-semibold transition-colors duration-500 ${
                  isActive ? 'text-ku' : 'text-ink-faint'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4">
            <div className="text-sm font-sans font-semibold text-ink transition-all duration-500">
              {steps[active].emoji} {steps[active].label}
            </div>
            <div className="text-[0.65rem] text-ink-faint font-sans mt-0.5 transition-all duration-500">
              {steps[active].desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
