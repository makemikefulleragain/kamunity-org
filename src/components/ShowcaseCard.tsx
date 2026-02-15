'use client'

import { ShowcaseItem } from '../data/showcase'
import VibeButton from './VibeButton'

export default function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <div
      className="bg-white border border-parchment-edge rounded-xl overflow-hidden transition-all hover:-translate-y-[3px] hover:shadow-[0_2px_16px_rgba(44,24,16,0.07)] cursor-pointer"
      onClick={() => window.open(item.url, '_blank')}
    >
      <div
        className={`h-[150px] flex items-center justify-center text-[2.5rem] relative bg-gradient-to-br ${item.thumbGradient}`}
      >
        <span>{item.thumbEmoji}</span>
        <div className="absolute top-2 right-2 font-sans text-[0.48rem] bg-white/90 px-2 py-0.5 rounded-full text-ink-light uppercase tracking-[0.5px] font-bold">
          {item.badge}
        </div>
      </div>
      <div className="p-3 px-4">
        <h3 className="font-sans text-[0.82rem] font-semibold text-ink mb-1">{item.title}</h3>
        <p className="text-[0.72rem] text-ink-light mb-2 leading-[1.45]">{item.description}</p>
        <div className="flex gap-1 flex-wrap">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.48rem] bg-parchment-dark text-ink-faint px-1.5 py-0.5 rounded-full uppercase tracking-[0.5px] font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-2 border-t border-parchment-edge">
        <a
          href={item.url}
          className="font-sans text-[0.65rem] text-ku font-semibold no-underline hover:text-ku-light"
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.badge === 'Method' ? 'Learn how →' : 'Try it free →'}
        </a>
        <div className="flex gap-1.5">
          <VibeButton emoji="🔥" />
          <VibeButton emoji="💡" />
          <VibeButton emoji="🙋" />
        </div>
      </div>
    </div>
  )
}
