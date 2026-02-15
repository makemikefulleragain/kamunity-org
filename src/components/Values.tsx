import FadeIn from './FadeIn'

const values = [
  { ico: '🏛️', title: 'Sovereignty', desc: 'Your data is yours. Portable. Deletable. Never sold.' },
  { ico: '👐', title: 'Accessibility', desc: "If someone can't use it, it's not finished." },
  { ico: '✨', title: 'Joy', desc: 'Community tools should feel good, not grey.' },
  { ico: '🌱', title: 'Sustainability', desc: 'No single point of failure. Ever.' },
  { ico: '🤝', title: 'Agency', desc: 'With you, not for you.' },
]

export default function Values() {
  return (
    <FadeIn id="values">
      <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
        What We Stand For
      </div>
      <h2 className="font-sans text-[1.6rem] font-bold text-ink mb-3 leading-tight tracking-tight max-w-[640px] mx-auto">
        Five rules baked into every line of code.
      </h2>
      <p className="text-ink-light text-[0.88rem] max-w-[640px] mx-auto mb-5">
        These aren&apos;t marketing. They&apos;re enforced by the system itself. Our AI factory literally can&apos;t build surveillance tools — the constitution won&apos;t allow it.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-5">
        {values.map((v) => (
          <div
            key={v.title}
            className="text-center p-3 bg-white border border-parchment-edge rounded-[10px] hover:border-fire-amber transition-colors"
          >
            <div className="text-[1.3rem] mb-1">{v.ico}</div>
            <h4 className="font-sans text-[0.65rem] font-bold text-ink mb-0.5">{v.title}</h4>
            <p className="text-[0.55rem] text-ink-faint leading-snug">{v.desc}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  )
}
