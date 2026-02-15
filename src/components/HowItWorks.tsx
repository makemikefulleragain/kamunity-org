import FadeIn from './FadeIn'

const cards = [
  { ico: '🏠', title: '1. Your own space', desc: 'Your community gets its own Kamunity — your database, your domain, your rules. Plus access to the shared commons where communities meet and discover each other.' },
  { ico: '🔨', title: '2. Tools built for you', desc: 'Describe what you need in plain English. Our AI-powered factory plans, builds, and delivers it. No coding. No consultants. No six-month timeline.' },
  { ico: '🔗', title: '3. Connected, not dependent', desc: 'Built on ActivityPub (same tech as Mastodon). Find other communities. Share what you choose. Your data stays on your server.' },
  { ico: '🤖', title: '4. AI that works with you', desc: 'Kai helps organise, summarise, and suggest — but never decides for you. An assistant, not a boss.' },
]

const flow = [
  { ico: '💬', label: 'Describe' },
  { ico: '📐', label: 'Plan' },
  { ico: '🔨', label: 'Build' },
  { ico: '🔍', label: 'Test' },
  { ico: '✅', label: 'Yours' },
]

export default function HowItWorks() {
  return (
    <FadeIn className="max-w-[640px] mx-auto" id="how">
      <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
        How It Works
      </div>
      <h2 className="font-sans text-[1.6rem] font-bold text-ink mb-3 leading-tight tracking-tight">
        Three things, all free.
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

      <p className="text-center italic text-ink-light text-[0.88rem] mt-4">
        Describe what you need → It gets planned → Built → Tested → Delivered. That&apos;s it.
      </p>

      <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
        {flow.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1">
            <div className="bg-white border border-parchment-edge rounded-[10px] px-3.5 py-2.5 text-center min-w-[80px] hover:border-ku transition-colors">
              <div className="text-[1.1rem] mb-0.5">{s.ico}</div>
              <div className="font-sans text-[0.55rem] text-ink-light uppercase tracking-[1px]">{s.label}</div>
            </div>
            {i < flow.length - 1 && (
              <span className="text-ku text-base font-bold font-sans">→</span>
            )}
          </div>
        ))}
      </div>
    </FadeIn>
  )
}
