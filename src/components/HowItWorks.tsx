import FadeIn from './FadeIn'

const cards = [
  { ico: '🏠', title: 'Your own spaces; public & private', desc: 'Your community gets its own Kamunity Rooms. Like Facebook or Doscord but it is yours. Plus a shared commons where people meet and support each other.' },
  { ico: '🔨', title: 'Tools built with you, not for you', desc: 'Describe what you need. Our AI-powered factory plans, builds, and delivers it. No coding. No consultants. No six-month timeline.' },
  { ico: '🔗', title: 'Connected by, not dependent on, the tech', desc: 'Built on simple and safe tech so you can leave and take your community with you, anytime. Your data and tools stay yours forever.' },
  { ico: '🤖', title: 'Support from a community AI you control', desc: 'Kai helps organise, summarise, and suggest. Kai never decides for you. An assistant, not a boss. Because it signs up to your Terms of Service' },
]

export default function HowItWorks() {
  return (
    <FadeIn className="max-w-[640px] mx-auto" id="how">
      <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
        How It Works
      </div>
      <h2 className="font-sans text-[1.6rem] font-bold text-ink mb-3 leading-tight tracking-tight">
        Start with four free things in one.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-white border border-parchment-edge rounded-[10px] p-[1.1rem] transition-all hover:border-ku-light hover:-translate-y-0.5 hover:shadow-[0_2px_16px_rgba(44,24,16,0.07)]"
          >
            <div className="text-[1.4rem] mb-1.5">{c.ico}</div>
            <h3 className="font-sans text-[0.8rem] font-semibold text-ink mb-1">{c.title}</h3>
            <p className="text-[0.75rem] text-ink-light leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  )
}
