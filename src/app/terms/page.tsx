import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Kamunity',
  description: 'Plain English terms of service for kamunity.org',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-[640px] mx-auto px-6 py-16">
        <Link
          href="/"
          className="font-dm text-xs text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider"
        >
          &larr; Back to Kamunity
        </Link>

        <h1 className="font-fraunces text-2xl font-semibold text-ink mt-8 mb-2">
          Terms of Service
        </h1>
        <p className="font-dm text-xs text-kai-gold font-semibold mb-6">
          Plain English version &mdash; last updated February 2026
        </p>

        <div className="space-y-5 font-dm text-sm text-ink leading-relaxed">
          <p>
            This is kamunity.org, the public website for the Kamunity project. Here&apos;s what you need to know:
          </p>

          <div>
            <h2 className="font-semibold text-ink mb-1">What this site does</h2>
            <p className="text-ink-light">
              It tells you about Kamunity &mdash; what it is, how it works, and what&apos;s been built.
              It includes Kai, an AI encounter interface that helps you navigate the community ecosystem.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Kai &mdash; the AI encounter interface</h2>
            <p className="text-ink-light">
              Kai is powered by a large language model and governed by a public constitution.
              Kai is not a professional advisor, counsellor, or substitute for human expertise.
              Conversations with Kai are ephemeral &mdash; nothing is stored, logged, or used for training.
              For important decisions about your organisation, finances, legal matters, or wellbeing,
              always speak with a qualified human professional.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">No accounts, no data collection</h2>
            <p className="text-ink-light">
              This site has no user accounts, no cookies, no analytics, and no tracking.
              We don&apos;t collect personal information through this website.
              The only way we receive your information is if you choose to email us,
              which opens your own email app on your device.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">External links</h2>
            <p className="text-ink-light">
              This site links to other websites and tools. Each has its own terms and privacy policy.
              When you click an external link, you&apos;re leaving kamunity.org and entering that site&apos;s terms.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Content accuracy</h2>
            <p className="text-ink-light">
              We do our best to keep information current and accurate, but this is a community project
              and things change. Nothing on this site &mdash; including Kai&apos;s responses &mdash; constitutes
              professional advice or a binding offer.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Open source</h2>
            <p className="text-ink-light">
              The code for this site is open source. You can view it, fork it, and learn from it.
              Attribution is appreciated but not required.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Contact</h2>
            <p className="text-ink-light">
              Questions? Email{' '}
              <a href="mailto:mike@kamunityconsulting.com" className="text-kai-gold hover:text-kai-gold-dark no-underline">
                mike@kamunityconsulting.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-parchment-edge">
          <Link href="/constitution" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
            Constitution
          </Link>
          <span className="text-ink-faint/20 text-[0.5rem]">&middot;</span>
          <Link href="/privacy" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  )
}
