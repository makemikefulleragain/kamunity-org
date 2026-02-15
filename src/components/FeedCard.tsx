'use client'

import { FeedItem } from '@/data/feed'
import VibeButton from './VibeButton'

const typeStyles: Record<FeedItem['type'], { color: string; label: string; vibes: string[] }> = {
  blog: { color: 'text-forest', label: 'Blog', vibes: ['🔥', '💡'] },
  podcast: { color: 'text-fire-orange', label: 'Podcast', vibes: ['🔥', '🎧'] },
  toolkit: { color: 'text-ku', label: 'Toolkit', vibes: ['🔥', '📦'] },
  'org-improvement': { color: 'text-fire-red', label: 'Org Improvement', vibes: ['🔥', '📋'] },
}

export default function FeedCard({ item }: { item: FeedItem }) {
  const style = typeStyles[item.type]

  return (
    <div className="bg-white border border-parchment-edge rounded-[10px] overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_16px_rgba(44,24,16,0.07)]">
      <div className={`font-sans text-[0.5rem] uppercase tracking-[1.5px] font-bold px-3 pt-2 pb-0.5 ${style.color}`}>
        {style.label}
      </div>
      <div className="px-3 pb-3">
        <h3 className="font-sans text-[0.78rem] font-semibold text-ink mb-1 leading-snug">
          {item.title}
        </h3>
        <p className="text-[0.68rem] text-ink-light leading-[1.45]">{item.description}</p>
      </div>
      <div className="flex justify-between items-center px-3 py-2 border-t border-parchment-edge font-sans text-[0.52rem] text-ink-faint">
        <span>{item.date}</span>
        <div className="flex gap-1.5">
          {style.vibes.map((v) => (
            <VibeButton key={v} emoji={v} />
          ))}
        </div>
        <a
          href={item.roomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ku no-underline font-bold flex items-center gap-0.5 text-[0.55rem] hover:text-ku-light"
        >
          💬 Discuss →
        </a>
      </div>
    </div>
  )
}
