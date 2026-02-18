'use client'

import { useState } from 'react'

function LegalModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
      <div
        className="relative bg-parchment border border-parchment-edge rounded-xl max-w-[560px] w-full max-h-[80vh] overflow-y-auto p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans text-[1.1rem] font-bold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="text-ink-faint hover:text-ink text-[1.2rem] leading-none cursor-pointer bg-transparent border-none font-sans"
          >
            ✕
          </button>
        </div>
        <div className="text-[0.78rem] text-ink leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState<'terms' | 'privacy' | null>(null)

  return (
    <>
      <footer className="text-center py-10 px-8 bg-ink text-parchment-dark">
        <div className="font-sans text-base font-bold mb-1">
          🔥 kamunity<span className="text-ku-light">.</span>
        </div>
        <p className="italic text-[0.85rem] text-fire-amber mb-1">
          Built with care, by the community, for the community.
        </p>
        <p className="font-sans text-[0.58rem] text-ink-faint">
          Perth, Western Australia · 2026
        </p>
        <div className="mt-4 flex gap-4 justify-center flex-wrap">
          {[
            { href: '#values', label: 'Values' },
            { href: '#showcase', label: 'Showcase' },
            { href: '/llms.txt', label: 'llms.txt' },
            { href: 'https://kamunityconsulting.com', label: 'Consulting' },
            { href: 'https://github.com/kamunity', label: 'GitHub' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-[0.55rem] text-parchment-edge no-underline uppercase tracking-[1px] hover:text-fire-amber transition-colors"
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-3 flex gap-3 justify-center">
          <button
            onClick={() => setModal('terms')}
            className="font-sans text-[0.5rem] text-ink-faint no-underline uppercase tracking-[1px] hover:text-fire-amber transition-colors cursor-pointer bg-transparent border-none"
          >
            Terms of Service
          </button>
          <span className="text-ink-faint text-[0.5rem]">·</span>
          <button
            onClick={() => setModal('privacy')}
            className="font-sans text-[0.5rem] text-ink-faint no-underline uppercase tracking-[1px] hover:text-fire-amber transition-colors cursor-pointer bg-transparent border-none"
          >
            Privacy Policy
          </button>
        </div>
        <p className="font-sans text-[0.45rem] text-ink-faint/50 mt-3">
          © 2026 Kamunity. All rights reserved.
        </p>
      </footer>

      {modal === 'terms' && (
        <LegalModal title="Terms of Service" onClose={() => setModal(null)}>
          <p className="font-semibold text-ku">Plain English version — last updated February 2026</p>
          <p>
            This is kamunity.org, the public website for the Kamunity project. Here&apos;s what you need to know:
          </p>
          <p><strong>What this site does</strong></p>
          <p>
            It tells you about Kamunity — what it is, how it works, and what&apos;s been built.
            It includes Kai, an AI encounter interface that helps you navigate the community ecosystem.
          </p>
          <p><strong>Kai — the AI encounter interface</strong></p>
          <p>
            Kai is powered by a large language model and governed by a public constitution.
            Kai is not a professional advisor, counsellor, or substitute for human expertise.
            Conversations with Kai are ephemeral — nothing is stored, logged, or used for training.
            For important decisions, always speak with a qualified human professional.
          </p>
          <p><strong>No accounts, no data collection</strong></p>
          <p>
            This site has no user accounts, no cookies, no analytics, and no tracking. We don&apos;t collect personal information through this website. The only way we receive your information is if you choose to email us via the contact button, which opens your own email app on your device.
          </p>
          <p><strong>External links</strong></p>
          <p>
            This site links to other websites and tools (Kamunity.Ai, Grant Acquittal Helper, Pack Music, etc.). Each of those sites has its own terms and privacy policy. When you click an external link, you&apos;re leaving kamunity.org and entering that site&apos;s terms.
          </p>
          <p><strong>Content accuracy</strong></p>
          <p>
            We do our best to keep information current and accurate, but this is a community project and things change. Nothing on this site constitutes professional advice or a binding offer.
          </p>
          <p><strong>Open source</strong></p>
          <p>
            The code for this site is open source. You can view it, fork it, and learn from it. Attribution is appreciated but not required.
          </p>
          <p><strong>Contact</strong></p>
          <p>
            Questions? Email mike@kamunityconsulting.com.
          </p>
        </LegalModal>
      )}

      {modal === 'privacy' && (
        <LegalModal title="Privacy Policy" onClose={() => setModal(null)}>
          <p className="font-semibold text-ku">Plain English version — last updated February 2026</p>
          <p>
            We believe privacy is a right, not a feature. Here&apos;s how kamunity.org handles your information:
          </p>
          <p><strong>We collect nothing</strong></p>
          <p>
            This website does not use cookies, analytics, tracking pixels, fingerprinting, or any other method to identify or monitor visitors. Zero. We don&apos;t know you visited, how long you stayed, or what you clicked.
          </p>
          <p><strong>Kai conversations are ephemeral</strong></p>
          <p>
            When you talk with Kai, your conversation exists only in your browser session. Nothing is stored on our servers, logged, or used to train AI models. When you close the tab, the conversation is gone.
          </p>
          <p><strong>No third-party scripts</strong></p>
          <p>
            There are no Google Analytics, Facebook pixels, Hotjar, or any third-party tracking scripts on this site. No data is shared with advertisers, data brokers, or anyone else.
          </p>
          <p><strong>Email contact</strong></p>
          <p>
            If you choose to email us using the contact button, your email address and message are handled by your own email provider and ours. We won&apos;t add you to a mailing list, sell your address, or share it with anyone. We&apos;ll only use it to reply to you.
          </p>
          <p><strong>External sites are separate</strong></p>
          <p>
            Links on this site go to external services (Kamunity.Ai, Netlify-hosted tools, GitHub, Pack Music, etc.). Each has its own privacy policy. We encourage you to review them. We don&apos;t control what data those sites collect.
          </p>
          <p><strong>AI discovery files</strong></p>
          <p>
            We publish /llms.txt and /llms-full.txt files so AI assistants can accurately describe Kamunity. These are static text files — they don&apos;t collect any information from you or your device.
          </p>
          <p><strong>Children&apos;s privacy</strong></p>
          <p>
            This site doesn&apos;t collect data from anyone, including children. It&apos;s safe for all ages.
          </p>
          <p><strong>Changes</strong></p>
          <p>
            If this policy changes, we&apos;ll update the date above. Since we don&apos;t collect data, there&apos;s not much that could change — but transparency matters.
          </p>
          <p><strong>Contact</strong></p>
          <p>
            Questions about privacy? Email mike@kamunityconsulting.com.
          </p>
        </LegalModal>
      )}
    </>
  )
}
