import FadeIn from './FadeIn'

export default function ProblemSolution() {
  return (
    <FadeIn className="max-w-[640px] mx-auto">
      <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
        The Real Problem
      </div>
      <h2 className="font-sans text-[1.6rem] font-bold text-ink mb-3 leading-tight tracking-tight">
        Our Community Groups Deserve Better
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <div className="p-5 rounded-[10px] bg-[#fff5f5] border border-[#f0d0d0]">
          <h3 className="font-sans text-[0.78rem] font-bold text-fire-red mb-2">What happens now</h3>
          <p className="text-[0.78rem] text-ink-light mb-1.5 leading-relaxed">
            Your group uses Facebook, WhatsApp, Google Docs, maybe a $200/month platform you barely use.
          </p>
          <p className="text-[0.78rem] text-ink-light mb-1.5 leading-relaxed">
            You don&apos;t own any of it. Your members&apos; data gets harvested. The free plan shrinks. The paid plan grows.
          </p>
          <p className="text-[0.78rem] text-ink-light leading-relaxed">
            When you leave, you leave empty-handed.
          </p>
        </div>

        <div className="p-5 rounded-[10px] bg-[#f0fdf0] border border-[#c8e6c8]">
          <h3 className="font-sans text-[0.78rem] font-bold text-forest mb-2">What could happen instead</h3>
          <p className="text-[0.78rem] text-ink-light mb-1.5 leading-relaxed">
            Your community gets its own digital space — chat, events, files, tools — that belongs to you.
          </p>
          <p className="text-[0.78rem] text-ink-light mb-1.5 leading-relaxed">
            Need a volunteer roster? A grant tracker? An event board? Just describe it. It gets built.
          </p>
          <p className="text-[0.78rem] text-ink-light leading-relaxed">
            Your data is yours. Portable. Deletable. Never sold.
          </p>
        </div>
      </div>
    </FadeIn>
  )
}
