'use client'

import { CARD_REGISTRY } from '../../data/kai-cards'
import KaiCard from './KaiCard'

interface SurfaceZoneProps {
  cardIds: string[]
  onDismiss: (id: string) => void
}

export default function SurfaceZone({ cardIds, onDismiss }: SurfaceZoneProps) {
  const cards = cardIds
    .map((id) => CARD_REGISTRY[id])
    .filter(Boolean)

  if (cards.length === 0) return null

  return (
    <div
      className="w-full"
      role="region"
      aria-label="Surfaced resources"
      aria-live="polite"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.map((card) => (
          <KaiCard
            key={card.id}
            card={card}
            onDismiss={() => onDismiss(card.id)}
          />
        ))}
      </div>
    </div>
  )
}
