'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

export default function CTA() {
  const [consented, setConsented] = useState(false)

  return (
    <FadeIn id="contact" className="text-center py-10 px-8 my-8 bg-gradient-to-br from-ku-bg to-[#f0ece0] border border-parchment-edge rounded-[14px]">
      <h2 className="font-sans text-[1.4rem] font-bold text-ink mb-2">
        Ready to give your community real tools?
      </h2>
      <p className="text-[0.88rem] text-ink-light max-w-[420px] mx-auto mb-5">
        No sales pitch. No contracts. Just tell us about your community and what you need.
      </p>

      {!consented ? (
        <div className="max-w-[420px] mx-auto">
          <p className="text-[0.75rem] text-ink-faint mb-3 leading-relaxed">
            Clicking below will open your email app to send a message to <strong>mike@kamunityconsulting.com</strong>. We don&apos;t collect or store any data from this site. Your email stays between you and us.
          </p>
          <button
            onClick={() => setConsented(true)}
            className="inline-flex items-center gap-1.5 bg-ku text-white font-sans text-[0.82rem] font-semibold px-6 py-3 rounded-lg shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:bg-ku-light hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.25)] transition-all cursor-pointer border-none"
          >
            I understand — let me send an email →
          </button>
        </div>
      ) : (
        <a
          href="mailto:mike@kamunityconsulting.com?subject=Community%20enquiry%20via%20kamunity.org"
          className="inline-flex items-center gap-1.5 bg-ku text-white font-sans text-[0.82rem] font-semibold px-6 py-3 rounded-lg shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:bg-ku-light hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.25)] transition-all no-underline"
        >
          Open email to mike@kamunityconsulting.com →
        </a>
      )}
    </FadeIn>
  )
}
