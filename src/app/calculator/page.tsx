'use client'

import { useState } from 'react'
import Link from 'next/link'

const TOOLS = [
  {
    id: 'google-workspace', name: 'Google Workspace', icon: '🔵', cat: 'Productivity',
    cost: { free: 'Free tier', monthly: 14, trigger: 'Storage & advanced features' },
    lockIn: { score: 8, ease: 'Hard', time: '80+ hrs', alts: ['Microsoft 365', 'Zoho', 'Nextcloud'], why: 'Docs/Sheets format lock, email/calendar/contacts are separate migrations' },
    dataEx: { annual: 180, types: ['Email content', 'Document content', 'Search queries', 'Usage patterns'], why: "Google is an advertising company. Your org's data trains their models." }
  },
  {
    id: 'microsoft-365', name: 'Microsoft 365', icon: '🪟', cat: 'Productivity',
    cost: { free: 'NFP discount available', monthly: 12, trigger: 'Teams, advanced security, storage' },
    lockIn: { score: 8, ease: 'Hard', time: '60–100 hrs', alts: ['Google Workspace', 'Zoho', 'Nextcloud'], why: 'Outlook, Word, Excel, Teams all interlinked. Copilot is being added silently.' },
    dataEx: { annual: 160, types: ['Email content', 'Documents', 'Teams chats', 'Meeting recordings', 'Copilot queries'], why: 'Microsoft Copilot is now embedded in M365 and processes your emails, docs, and meetings by default.' }
  },
  {
    id: 'slack', name: 'Slack', icon: '🟣', cat: 'Communication',
    cost: { free: 'Free (90-day history)', monthly: 12, trigger: '90-day message limit forces upgrade' },
    lockIn: { score: 7, ease: 'Medium', time: '20–40 hrs', alts: ['Mattermost', 'Element/Matrix', 'Zulip'], why: 'Message history export requires paid plan. Integrations need rebuilding.' },
    dataEx: { annual: 120, types: ['Message content', 'File content', 'User behaviour', 'Network graph'], why: 'Slack (Salesforce) analyses your conversations for product improvement.' }
  },
  {
    id: 'canva', name: 'Canva', icon: '🎨', cat: 'Design',
    cost: { free: 'Free tier', monthly: 20, trigger: 'Premium templates, brand kit, team features' },
    lockIn: { score: 5, ease: 'Medium', time: '10–20 hrs', alts: ['GIMP', 'Inkscape', 'Adobe Express'], why: 'Designs in Canva format, export quality limited on free tier.' },
    dataEx: { annual: 60, types: ['Design content', 'Brand assets', 'Usage patterns'], why: 'Your designs and brand assets are processed by Canva AI systems.' }
  },
  {
    id: 'eventbrite', name: 'Eventbrite', icon: '🎟️', cat: 'Events',
    cost: { free: 'Free for free events', monthly: 0, trigger: '3.7% + $1.79 per paid ticket' },
    lockIn: { score: 4, ease: 'Medium', time: '5–10 hrs', alts: ['Humanitix', 'TryBooking', 'Stripe'], why: 'Attendee data export available but manual process.' },
    dataEx: { annual: 90, types: ['Attendee data', 'Event content', 'Transaction data', 'Behaviour analytics'], why: 'Eventbrite sells attendee data insights to the event industry.' }
  },
  {
    id: 'facebook-groups', name: 'Facebook Groups', icon: '📘', cat: 'Community',
    cost: { free: 'Free', monthly: 0, trigger: 'Free until Meta changes policy' },
    lockIn: { score: 9, ease: 'Hard', time: '60–100 hrs', alts: ['Discord', 'Element/Matrix', 'Mighty Networks'], why: 'No data export for posts, comments, or member lists. Community is trapped.' },
    dataEx: { annual: 240, types: ['Posts', 'Comments', 'Reactions', 'Member behaviour', 'Network graph', 'Content analysis'], why: "Facebook is the world's largest ad platform. Your community is the product." }
  },
  {
    id: 'whatsapp', name: 'WhatsApp', icon: '📱', cat: 'Communication',
    cost: { free: 'Free', monthly: 0, trigger: 'Free (Meta subsidises via data)' },
    lockIn: { score: 8, ease: 'Hard', time: '30–50 hrs', alts: ['Signal', 'Element/Matrix', 'Telegram'], why: 'No useful group history export. Contacts trapped in Meta ecosystem.' },
    dataEx: { annual: 200, types: ['Metadata', 'Contact graphs', 'Usage patterns', 'Message content (from 2024 policy)'], why: 'Meta now uses WhatsApp data for AI training by default (opt-out required).' }
  },
  {
    id: 'zoom', name: 'Zoom', icon: '📹', cat: 'Video',
    cost: { free: 'Free (40-min limit)', monthly: 22, trigger: '40-min limit forces upgrade for any real meeting' },
    lockIn: { score: 4, ease: 'Easy', time: '2–5 hrs', alts: ['Jitsi Meet', 'BigBlueButton', 'Google Meet'], why: 'Easy to switch — recordings download, no persistent community.' },
    dataEx: { annual: 80, types: ['Meeting content', 'Transcripts', 'Usage patterns', 'Participant data'], why: 'Zoom uses meeting data including transcripts for AI model training.' }
  },
  {
    id: 'mailchimp', name: 'Mailchimp', icon: '🐒', cat: 'Email',
    cost: { free: 'Free (500 contacts)', monthly: 35, trigger: 'Contact limits hit fast for active orgs' },
    lockIn: { score: 6, ease: 'Medium', time: '15–30 hrs', alts: ['Brevo', 'Mautic', 'Listmonk'], why: 'List export available but automations, templates, analytics stay on Mailchimp.' },
    dataEx: { annual: 100, types: ['Contact data', 'Email engagement', 'Open/click behaviour', 'Revenue attribution'], why: 'Mailchimp (Intuit) sells aggregate insights and uses data for product improvement.' }
  },
  {
    id: 'trello', name: 'Trello', icon: '📋', cat: 'Project',
    cost: { free: 'Free tier', monthly: 10, trigger: 'View limits, automation limits, file sizes' },
    lockIn: { score: 4, ease: 'Easy', time: '5–10 hrs', alts: ['Wekan', 'Planka', 'Nextcloud Deck'], why: 'JSON export available, some migration tools exist.' },
    dataEx: { annual: 40, types: ['Board content', 'Task data', 'User behaviour'], why: 'Atlassian (Trello) uses product data for improvement. Lower risk than social tools.' }
  },
  {
    id: 'discord', name: 'Discord', icon: '🎮', cat: 'Community',
    cost: { free: 'Free', monthly: 0, trigger: 'Free (Discord monetises via Nitro)' },
    lockIn: { score: 7, ease: 'Hard', time: '30–60 hrs', alts: ['Element/Matrix', 'Mattermost', 'Zulip'], why: 'No server data export. Message history stays on Discord.' },
    dataEx: { annual: 150, types: ['Message content', 'Voice usage', 'Server activity', 'User behaviour'], why: 'Discord uses all platform data including voice for product improvement and AI.' }
  },
]

function lockInColor(score: number): string {
  if (score <= 3) return '#27ae60'
  if (score <= 6) return '#f39c12'
  return '#c0392b'
}

export default function CalculatorPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedTools = TOOLS.filter(t => selected.has(t.id))
  const totalMonthly = selectedTools.reduce((s, t) => s + t.cost.monthly, 0)
  const totalDataEx = selectedTools.reduce((s, t) => s + t.dataEx.annual, 0)
  const totalMigrationHrs = selectedTools.map(t => {
    const match = t.lockIn.time.match(/(\d+)/)
    return match ? parseInt(match[1]) : 10
  }).reduce((s, v) => s + v, 0)
  const switchingCost = Math.round(totalMigrationHrs * 75)
  const avgLockIn = selectedTools.length
    ? Math.round(selectedTools.reduce((s, t) => s + t.lockIn.score, 0) / selectedTools.length)
    : 0
  const trueCost = Math.round(totalMonthly * 12 + totalDataEx + switchingCost / 5)

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-md border-b border-parchment-edge/50 px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-dm text-sm text-ink-faint hover:text-ink transition-colors no-underline flex items-center gap-2"
        >
          ← Back to Kai
        </Link>
        <span className="font-fraunces text-sm font-semibold text-ink">💰 Sovereignty Calculator</span>
        <a
          href="https://kamunity-audit.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-dm text-xs font-semibold text-kai-gold border border-kai-gold/40 px-3 py-1.5 rounded-full hover:bg-kai-glow transition-all hidden sm:block"
        >
          Full Audit →
        </a>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Intro */}
        <div className="mb-8">
          <h1 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink mb-2">
            The True Cost of "Free"
          </h1>
          <p className="font-dm text-sm text-ink-light leading-relaxed">
            Select the tools your organisation uses. See what they actually cost — in money, data, and lock-in.
          </p>
        </div>

        {/* Tool grid */}
        <section className="mb-8">
          <h2 className="font-dm text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">
            1. Select your tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {TOOLS.map(t => (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`flex flex-col items-center text-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  selected.has(t.id)
                    ? 'border-kai-gold bg-kai-glow/40 shadow-sm'
                    : 'border-parchment-edge bg-white hover:border-ku/40 hover:shadow-sm'
                }`}
              >
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="font-dm text-xs font-semibold text-ink leading-tight">{t.name}</span>
                <span className="font-dm text-[0.6rem] text-ink-faint mt-0.5">{t.cat}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Empty state */}
        {selected.size === 0 && (
          <div className="text-center py-12 text-ink-faint">
            <div className="text-3xl mb-3">💰</div>
            <p className="font-dm text-sm">Select tools above to see the true cost of "free"</p>
          </div>
        )}

        {/* Results */}
        {selected.size > 0 && (
          <>
            {/* Holy shit box */}
            <div className="mb-6 bg-gradient-to-br from-fire-amber/10 to-ku/5 border-2 border-kai-gold rounded-2xl p-6 text-center animate-fade-in-up">
              <p className="font-dm text-sm text-ink-light mb-2">
                Your {selected.size} {selected.size === 1 ? 'tool' : 'tools'} actually cost your org:
              </p>
              <p className="font-fraunces text-4xl sm:text-5xl font-bold text-kai-gold">
                ${trueCost.toLocaleString()}
              </p>
              <p className="font-dm text-xs text-ink-faint mt-2">
                estimated annual true cost (direct + data extraction + amortised switching risk)
              </p>
            </div>

            {/* Summary */}
            <section className="mb-6">
              <h2 className="font-dm text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">
                2. Summary
              </h2>
              <div className="bg-white border border-parchment-edge rounded-xl overflow-hidden">
                {[
                  { label: 'Direct annual cost (likely spend)', value: `$${(totalMonthly * 12).toLocaleString()}/yr` },
                  { label: 'Estimated data extraction value', value: `$${totalDataEx.toLocaleString()}/yr` },
                  { label: 'Migration time if you needed to switch', value: `${totalMigrationHrs}+ hours` },
                  { label: 'Switching cost estimate (@ $75/hr)', value: `$${switchingCost.toLocaleString()}` },
                  { label: 'Average lock-in score', value: `${avgLockIn}/10 — ${avgLockIn <= 3 ? 'Low' : avgLockIn <= 6 ? 'Medium' : 'High'} risk` },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center px-4 py-3 font-dm text-sm ${i < 4 ? 'border-b border-parchment-edge' : 'font-semibold text-kai-gold'}`}>
                    <span className="text-ink-light">{row.label}</span>
                    <span className="font-semibold text-ink">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tool breakdown */}
            <section className="mb-8">
              <h2 className="font-dm text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">
                3. Tool breakdown
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedTools.map(t => (
                  <div key={t.id} className="bg-white border border-parchment-edge rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{t.icon}</span>
                      <span className="font-dm text-sm font-bold text-ink">{t.name}</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-ink-faint">Direct cost</span>
                        <span className={`font-semibold ${t.cost.monthly === 0 ? 'text-forest' : 'text-kai-gold'}`}>
                          {t.cost.monthly === 0 ? '$0 + fees' : `$${t.cost.monthly}/mo`}
                        </span>
                      </div>
                      <p className="text-ink-faint text-[0.65rem]">⚠️ {t.cost.trigger}</p>

                      <div className="flex justify-between mt-1">
                        <span className="text-ink-faint">Lock-in score</span>
                        <span className="font-semibold" style={{ color: lockInColor(t.lockIn.score) }}>
                          {t.lockIn.score}/10 · {t.lockIn.ease}
                        </span>
                      </div>
                      <div className="h-1.5 bg-parchment-dark rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${t.lockIn.score * 10}%`, background: lockInColor(t.lockIn.score) }}
                        />
                      </div>
                      <p className="text-ink-faint text-[0.65rem]">
                        Migration: {t.lockIn.time} · Alternatives: {t.lockIn.alts.slice(0, 2).join(', ')}
                      </p>

                      <div className="flex justify-between mt-1">
                        <span className="text-ink-faint">Data extraction value</span>
                        <span className="font-semibold text-fire-orange">~${t.dataEx.annual}/yr</span>
                      </div>
                      <p className="text-ink-faint text-[0.65rem]">{t.dataEx.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Methodology note */}
            <div className="bg-white border border-parchment-edge rounded-xl p-4 mb-6 font-dm text-xs text-ink-faint leading-relaxed">
              <strong className="text-ink-light">Methodology:</strong> Direct costs reflect typical organisational spend including likely upgrade triggers. Lock-in scores assess migration difficulty (1=easy, 10=trapped). Data extraction values are estimates based on publicly available ARPU data and platform business models. These are illustrative figures — real values vary by organisation size and usage. This tool is for awareness, not legal or financial advice.
            </div>

            {/* CTA */}
            <div className="text-center mb-8">
              <a
                href="https://kamunity-audit.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-dm text-sm font-semibold bg-kai-gold text-white px-6 py-3 rounded-full hover:bg-kai-gold-dark transition-colors shadow-sm"
              >
                Take the full Digital Sovereignty Audit →
              </a>
            </div>
          </>
        )}

        {/* Footer cross-links */}
        <div className="pt-6 border-t border-parchment-edge text-center space-y-3">
          <p className="font-dm text-xs text-ink-faint">
            Part of the <a href="https://kamunity.org" className="text-kai-gold hover:text-kai-gold-dark no-underline">Kamunity</a> ecosystem of free community tools.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
              ← Kai
            </Link>
            <span className="text-ink-faint/30 text-[0.5rem]">·</span>
            <Link href="/copilot-check" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
              Copilot Check
            </Link>
            <span className="text-ink-faint/30 text-[0.5rem]">·</span>
            <Link href="/constitution" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
              Constitution
            </Link>
            <span className="text-ink-faint/30 text-[0.5rem]">·</span>
            <a href="https://kamunity-audit.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
              Full Audit ↗
            </a>
          </div>
          <p className="font-dm text-[0.55rem] text-ink-faint/50 italic">
            Built on Whadjuk Noongar boodja. Sovereignty was never ceded.
          </p>
        </div>
      </div>
    </div>
  )
}
