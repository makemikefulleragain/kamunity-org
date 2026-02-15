export default function Hero() {
  return (
    <header className="pt-24 pb-16 px-8 bg-gradient-to-br from-[#faf8f4] via-[#f0ece0] to-ku-bg text-center relative">
      <div className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] bg-white border border-parchment-edge px-3 py-1 rounded-full text-ink-light uppercase tracking-[1px] font-semibold mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse-dot" />
        Free &amp; open source
      </div>

      <h1 className="font-sans text-[2.6rem] font-extrabold text-ink leading-[1.15] mb-4 max-w-[650px] mx-auto tracking-tight">
        Free digital tools your community{' '}
        <span className="text-ku">actually owns</span>
      </h1>

      <p className="text-[1.05rem] text-ink-light max-w-[520px] mx-auto mb-8 leading-relaxed">
        Stop renting from big tech. Kamunity gives your community its own space, custom tools, and
        real data control — with no coding, no contracts, and no catch.
      </p>

      <div className="flex gap-3 justify-center flex-wrap mb-10">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 bg-ku text-white font-sans text-[0.82rem] font-semibold px-6 py-3 rounded-lg shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:bg-ku-light hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.25)] transition-all no-underline"
        >
          Get your community started →
        </a>
        <a
          href="#showcase"
          className="inline-flex items-center gap-1.5 bg-white text-ku font-sans text-[0.82rem] font-semibold px-6 py-3 rounded-lg border-2 border-ku/20 hover:border-ku hover:bg-ku-bg transition-all no-underline"
        >
          See what&apos;s been built
        </a>
      </div>

      <div className="flex gap-8 justify-center flex-wrap pt-6 border-t border-parchment-edge">
        {[
          { num: '3', label: 'Live tools' },
          { num: '100%', label: 'Community owned' },
          { num: '$0', label: 'To get started' },
          { num: '0', label: 'Data sold, ever' },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="font-sans text-[1.4rem] font-bold text-ku leading-none">{item.num}</div>
            <div className="font-sans text-[0.55rem] text-ink-faint uppercase tracking-[1px] mt-0.5">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </header>
  )
}
