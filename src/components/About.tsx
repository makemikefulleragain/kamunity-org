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

      <div className="mt-4 bg-white border border-parchment-edge rounded-[10px] p-[1.1rem] border-l-[3px] border-l-ku">
        <h3 className="font-sans text-[0.8rem] font-semibold text-ink mb-1">
          🎵 The Pack Music · Perth, WA
        </h3>
        <p className="text-[0.75rem] text-ink-light leading-relaxed">
          A music community coordinating events and sharing resources on their own terms — their own instance, their own branding, connected to the shared commons.
        </p>
      </div>
    </FadeIn>
  )
}
