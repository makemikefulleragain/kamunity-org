import FadeIn from './FadeIn'

export default function CTA() {
  return (
    <FadeIn id="contact" className="text-center py-10 px-8 my-8 bg-gradient-to-br from-ku-bg to-[#f0ece0] border border-parchment-edge rounded-[14px]">
      <h2 className="font-sans text-[1.4rem] font-bold text-ink mb-2">
        Ready to give your community real tools?
      </h2>
      <p className="text-[0.88rem] text-ink-light max-w-[420px] mx-auto mb-5">
        No sales pitch. No contracts. Just tell us about your community and what you need.
      </p>
      <a
        href="mailto:hello@kamunity.org"
        className="inline-flex items-center gap-1.5 bg-ku text-white font-sans text-[0.82rem] font-semibold px-6 py-3 rounded-lg shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:bg-ku-light hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.25)] transition-all no-underline"
      >
        Get in touch →
      </a>
    </FadeIn>
  )
}
