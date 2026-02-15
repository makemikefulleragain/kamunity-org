import FadeIn from './FadeIn'

export default function About() {
  return (
    <FadeIn className="max-w-[640px] mx-auto">
      <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
        About
      </div>
      <h2 className="font-sans text-[1.6rem] font-bold text-ink mb-3 leading-tight tracking-tight">
        Built in Perth, for communities everywhere.
      </h2>
      <p className="mb-3">
        We&apos;re based in Western Australia, working with community organisations, small nonprofits, and the people that commercial platforms forgot — or chose to ignore.
      </p>
      <p className="text-ink-light text-[0.88rem]">
        11% of Western Australians experience digital exclusion. Aboriginal Community Controlled Organisations, culturally diverse service providers, and tiny volunteer-run groups all deserve tools as good as what corporations get. That&apos;s why Kamunity exists.
      </p>

      <div className="mt-6 bg-white border border-parchment-edge rounded-[10px] p-[1.1rem] border-l-[3px] border-l-ku">
        <div className="font-sans text-[0.5rem] uppercase tracking-[2px] text-ku mb-2 font-semibold">
          Community Highlight
        </div>
        <h3 className="font-sans text-[0.95rem] font-bold text-ink mb-1.5">
          🎵 The Pack Music · Perth, WA
        </h3>
        <p className="text-[0.78rem] text-ink-light leading-relaxed mb-4">
          An awesome community highlight and friend of Kamunity that we&apos;ve been playing, listening, and building for. A music community coordinating events and sharing resources on their own terms.
        </p>
        <div className="flex gap-2.5 flex-wrap">
          <a
            href="https://www.packmusic.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-ku text-white font-sans text-[0.72rem] font-semibold px-4 py-2 rounded-lg hover:bg-ku-light transition-colors no-underline"
          >
            🎵 Visit the Pack Home →
          </a>
          <a
            href="https://kamunity.ai/discover"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-ku font-sans text-[0.72rem] font-semibold px-4 py-2 rounded-lg border-2 border-ku/30 hover:border-ku hover:bg-ku-bg transition-all no-underline"
          >
            💬 Visit the Pack Room →
          </a>
        </div>
      </div>
    </FadeIn>
  )
}
