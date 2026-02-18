'use client'

import { CARD_REGISTRY } from '../../data/kai-cards'
import KaiCard from './KaiCard'

interface SurfacePanelProps {
  cardIds: string[]
  onDismiss: (id: string) => void
  open: boolean
  onToggle: () => void
}

export default function SurfacePanel({ cardIds, onDismiss, open, onToggle }: SurfacePanelProps) {
  const cards = cardIds.map((id) => CARD_REGISTRY[id]).filter(Boolean)
  const hasCards = cards.length > 0

  return (
    <>
      {/* Toggle tab — always visible on desktop when cards exist */}
      {hasCards && !open && (
        <button
          onClick={onToggle}
          className="fixed top-1/2 -translate-y-1/2 right-0 z-[140] hidden lg:flex items-center gap-2 py-4 px-2.5 rounded-l-xl bg-kai-gold text-white shadow-lg hover:bg-kai-gold-dark transition-all duration-200"
          aria-label="Open resources panel"
        >
          <span className="text-sm font-dm font-semibold" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            {cards.length} resource{cards.length !== 1 ? 's' : ''}
          </span>
        </button>
      )}

      {/* Floating modal panel — desktop only */}
      <div
        className={`fixed top-8 right-6 bottom-8 w-[340px] z-[130] hidden lg:flex flex-col bg-white/97 backdrop-blur-lg border border-parchment-edge rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${
          open && hasCards ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
        role="complementary"
        aria-label="Surfaced resources"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <h2 className="font-fraunces text-base font-semibold text-ink">Resources</h2>
            <p className="font-dm text-[0.65rem] text-ink-faint mt-0.5">
              Relevant to this conversation
            </p>
          </div>
          <button
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-parchment/60 text-ink-faint hover:text-ink hover:bg-parchment text-sm transition-all"
            aria-label="Close resources panel"
          >
            ✕
          </button>
        </div>

        {/* Card list */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 kai-scroll">
          {cards.map((card) => (
            <KaiCard
              key={card.id}
              card={card}
              onDismiss={() => onDismiss(card.id)}
            />
          ))}
        </div>

        <div className="px-5 py-3">
          <p className="font-dm text-[0.6rem] text-ink-faint/40 text-center">
            Cards update as the conversation evolves
          </p>
        </div>
      </div>
    </>
  )
}
