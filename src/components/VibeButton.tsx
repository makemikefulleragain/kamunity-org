'use client'

import { useState } from 'react'

export default function VibeButton({ emoji }: { emoji: string }) {
  const [on, setOn] = useState(false)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        setOn(!on)
      }}
      className={`text-xl cursor-pointer select-none transition-transform duration-150 hover:scale-125 ${on ? 'scale-110 drop-shadow-[0_0_3px_rgba(99,102,241,0.4)]' : ''}`}
      aria-label={`React with ${emoji}`}
    >
      {emoji}
    </button>
  )
}
