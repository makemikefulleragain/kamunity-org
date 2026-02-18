'use client'

import { useState } from 'react'
import { KaiCard as KaiCardType } from '../../data/kai-cards'

const TYPE_COLORS: Record<string, string> = {
  quiz: 'border-l-ku',
  resource: 'border-l-forest',
  event: 'border-l-fire-orange',
  connection: 'border-l-kai-gold',
  insight: 'border-l-fire-amber',
  constitution: 'border-l-kai-gold-dark',
}

export default function KaiCard({ card, onDismiss }: { card: KaiCardType; onDismiss?: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const borderColor = TYPE_COLORS[card.type] || 'border-l-parchment-edge'

  return (
    <div
      className={`kai-card animate-card-surface bg-white border border-parchment-edge ${borderColor} border-l-[3px] rounded-xl px-4 py-3 relative`}
      role="article"
      aria-label={card.title}
    >
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-parchment/60 text-ink-faint hover:text-ink hover:bg-parchment text-xs transition-all"
          aria-label={`Dismiss ${card.title}`}
        >
          ✕
        </button>
      )}

      {/* Always visible — icon, title, short description */}
      <div className="flex items-start gap-3 pr-6">
        <span className="text-xl flex-shrink-0 mt-0.5">{card.icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-dm text-sm font-semibold text-ink leading-snug">{card.title}</h3>
          <p className="font-dm text-xs text-ink-light leading-relaxed mt-1 line-clamp-2">{card.description}</p>
        </div>
      </div>

      {/* Action row — always visible */}
      <div className="flex items-center justify-between mt-3 pl-9">
        {card.action ? (
          <a
            href={card.action.url}
            target={card.action.external ? '_blank' : undefined}
            rel={card.action.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1.5 font-dm text-xs font-semibold text-kai-gold hover:text-kai-gold-dark transition-colors no-underline px-3 py-1.5 rounded-full border border-kai-gold/30 hover:border-kai-gold/60 hover:bg-kai-glow"
          >
            {card.action.label}
            <span className="text-sm">{card.action.external ? '↗' : '→'}</span>
          </a>
        ) : <span />}

        {(card.meta || card.description.length > 80) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-dm text-xs text-ink-faint hover:text-ink px-3 py-1.5 rounded-full border border-parchment-edge hover:border-ink-faint/30 transition-all"
            aria-label={expanded ? 'Show less' : 'Show more'}
          >
            {expanded ? 'Less ▴' : 'More ▾'}
          </button>
        )}
      </div>

      {/* Expanded detail */}
      {expanded && card.meta && (
        <div className="mt-2 pl-9 pb-1">
          <p className="font-dm text-xs text-ink-faint">{card.meta}</p>
        </div>
      )}
    </div>
  )
}
