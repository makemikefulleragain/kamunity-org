'use client'

interface StartingPointsProps {
  onSelect: (text: string) => void
}

const STARTING_POINTS = [
  { label: "I'm worried about AI", icon: '🤖' },
  { label: 'I want to check our digital setup', icon: '🧭' },
  { label: 'I need practical help', icon: '🤝' },
  { label: 'Who are you?', icon: '✨' },
]

export default function StartingPoints({ onSelect }: StartingPointsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
      {STARTING_POINTS.map((point) => (
        <button
          key={point.label}
          onClick={() => onSelect(point.label)}
          className="kai-card flex items-center gap-3 bg-white border border-parchment-edge rounded-xl px-4 py-3 text-left hover:border-kai-gold focus:border-kai-gold focus:outline-none focus:ring-2 focus:ring-kai-gold/30 transition-all"
        >
          <span className="text-lg flex-shrink-0">{point.icon}</span>
          <span className="font-dm text-sm text-ink-light">{point.label}</span>
        </button>
      ))}
    </div>
  )
}
