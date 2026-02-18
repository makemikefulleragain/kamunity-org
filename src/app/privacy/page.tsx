import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Kamunity',
  description: 'Plain English privacy policy for kamunity.org',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="font-dm text-xs text-kai-gold font-semibold mb-6">
          Plain English version &mdash; last updated February 2026
        </p>

        <div className="space-y-5 font-dm text-sm text-ink leading-relaxed">
          <p>
            We believe privacy is a right, not a feature. Here&apos;s how kamunity.org handles your information:
          </p>

          <div>
            <h2 className="font-semibold text-ink mb-1">We collect nothing</h2>
            <p className="text-ink-light">
              This website does not use cookies, analytics, tracking pixels, fingerprinting,
              or any other method to identify or monitor visitors. Zero.
              We don&apos;t know you visited, how long you stayed, or what you clicked.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Kai conversations are ephemeral</h2>
            <p className="text-ink-light">
              When you talk with Kai, your conversation exists only in your browser session.
              Nothing is stored on our servers, logged, or used to train AI models.
              When you close the tab, the conversation is gone. We cannot retrieve it.
              Kai&apos;s API calls are processed by Anthropic under their data usage policies &mdash;
              we use their API in a mode that does not retain or train on your data.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">No third-party scripts</h2>
            <p className="text-ink-light">
              There are no Google Analytics, Facebook pixels, Hotjar, or any third-party
              tracking scripts on this site. No data is shared with advertisers, data brokers, or anyone else.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Email contact</h2>
            <p className="text-ink-light">
              If you choose to email us using the contact button, your email address and message
              are handled by your own email provider and ours. We won&apos;t add you to a mailing list,
              sell your address, or share it with anyone. We&apos;ll only use it to reply to you.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">External sites are separate</h2>
            <p className="text-ink-light">
              Links on this site go to external services. Each has its own privacy policy.
              We encourage you to review them. We don&apos;t control what data those sites collect.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">AI discovery files</h2>
            <p className="text-ink-light">
              We publish /llms.txt and /llms-full.txt files so AI assistants can accurately describe Kamunity.
              These are static text files &mdash; they don&apos;t collect any information from you or your device.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Children&apos;s privacy</h2>
            <p className="text-ink-light">
              This site doesn&apos;t collect data from anyone, including children. It&apos;s safe for all ages.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Changes</h2>
            <p className="text-ink-light">
              If this policy changes, we&apos;ll update the date above. Since we don&apos;t collect data,
              there&apos;s not much that could change &mdash; but transparency matters.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-1">Contact</h2>
            <p className="text-ink-light">
              Questions about privacy? Email{' '}
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
          <Link href="/terms" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
            Terms
          </Link>
        </div>
      </div>
    </div>
  )
}
