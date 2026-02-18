'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ConstitutionPage() {
  const [content, setContent] = useState('')
  const [showAmendForm, setShowAmendForm] = useState(false)
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])
  const [amendText, setAmendText] = useState('')
  const [amendEmail, setAmendEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/data/constitution.md')
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent('Constitution could not be loaded.'))
  }, [])

  const toggleEmoji = (emoji: string) => {
    setSelectedEmojis((prev) =>
      prev.includes(emoji) ? prev.filter((e) => e !== emoji) : prev.length < 3 ? [...prev, emoji] : prev
    )
  }

  const handleAmendSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEmojis.length === 0) return

    // Netlify form submission
    const formData = new URLSearchParams()
    formData.append('form-name', 'constitution-amendment')
    formData.append('reaction', selectedEmojis.join(' '))
    formData.append('thought', amendText)
    formData.append('email', amendEmail)

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })
    } catch {
      // Silently handle — form may not be configured yet
    }

    setSubmitted(true)
  }

  const openEmailAmendment = () => {
    const subject = encodeURIComponent('Constitution Amendment Proposal')
    const body = encodeURIComponent(
      `Hi Mike,\n\nI have a thought about the Kai Constitution:\n\nReaction: ${selectedEmojis.join(' ')}\n\n${amendText ? `My thought:\n${amendText}\n\n` : ''}---\nSent from the Kai Constitution page`
    )
    window.open(`mailto:mike@kamunityconsulting.com?subject=${subject}&body=${body}`, '_blank')
  }

  // Simple markdown-to-HTML for the constitution
  const renderMarkdown = (md: string) => {
    return md
      .split('\n\n')
      .map((block, i) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={i} className="font-fraunces text-2xl sm:text-3xl font-bold text-ink mb-2 mt-10">
              {trimmed.replace('# ', '')}
            </h1>
          )
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="font-fraunces text-xl sm:text-2xl font-semibold text-ink mb-2 mt-8 border-b border-parchment-edge pb-2">
              {trimmed.replace('## ', '')}
            </h2>
          )
        }
        if (trimmed === '---') {
          return <hr key={i} className="border-parchment-edge my-6" />
        }
        if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
          return (
            <p key={i} className="font-dm text-sm text-ink-faint italic leading-relaxed mb-3">
              {trimmed.replace(/^\*|\*$/g, '')}
            </p>
          )
        }
        if (trimmed.startsWith('**') && trimmed.includes('**')) {
          // Bold-starting paragraphs (article items)
          const parts = trimmed.split('**')
          return (
            <p key={i} className="font-dm text-sm text-ink leading-relaxed mb-3 pl-2 border-l-2 border-kai-gold/30">
              <strong className="text-ink font-semibold">{parts[1]}</strong>
              {parts[2]}
            </p>
          )
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter((l) => l.startsWith('- '))
          return (
            <ul key={i} className="font-dm text-sm text-ink leading-relaxed mb-3 list-disc list-inside space-y-1">
              {items.map((item, j) => (
                <li key={j}>{item.replace('- ', '')}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="font-dm text-sm text-ink leading-relaxed mb-3">
            {trimmed}
          </p>
        )
      })
      .filter(Boolean)
  }

  const REACTION_EMOJIS = ['🔥', '💛', '🤔', '✊', '🌱', '📜', '💡', '🙏', '⚡']

  return (
    <div className="min-h-screen bg-kai-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-kai-cream/95 backdrop-blur-md border-b border-parchment-edge/30 px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-dm text-sm text-ink-faint hover:text-ink transition-colors no-underline flex items-center gap-2"
        >
          ← Back to Kai
        </Link>
        <span className="font-fraunces text-sm font-semibold text-ink">📜 Constitution</span>
        <button
          onClick={() => setShowAmendForm(!showAmendForm)}
          className="font-dm text-xs font-semibold text-kai-gold border border-kai-gold/40 px-3 py-1.5 rounded-full hover:bg-kai-glow hover:text-kai-gold-dark transition-all"
        >
          {showAmendForm ? '✕ Close' : '💬 I have a thought'}
        </button>
      </header>

      {/* Form submissions handled via fetch POST + mailto fallback */}

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Amendment Form */}
        {showAmendForm && (
          <div className="mb-8 bg-white border border-parchment-edge rounded-xl p-5 animate-fade-in-up">
            {submitted ? (
              <div className="text-center py-4">
                <p className="text-2xl mb-2">🙏</p>
                <p className="font-fraunces text-lg text-ink mb-1">Thank you for witnessing.</p>
                <p className="font-dm text-sm text-ink-light">Your thought has been received. The constitution belongs to the community.</p>
                <button
                  onClick={() => { setSubmitted(false); setShowAmendForm(false); setSelectedEmojis([]); setAmendText(''); }}
                  className="font-dm text-xs text-kai-gold hover:text-kai-gold-dark mt-3 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleAmendSubmit}>
                <h3 className="font-fraunces text-lg font-semibold text-ink mb-1">Share your thought</h3>
                <p className="font-dm text-xs text-ink-light mb-4">
                  This is a Founder&apos;s Draft. Your reactions and thoughts shape what comes next.
                </p>

                {/* Emoji reactions */}
                <div className="mb-4">
                  <p className="font-dm text-xs text-ink-faint mb-2">Your reaction (pick up to 3):</p>
                  <div className="flex flex-wrap gap-2">
                    {REACTION_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => toggleEmoji(emoji)}
                        className={`text-xl p-1.5 rounded-lg transition-all ${
                          selectedEmojis.includes(emoji)
                            ? 'bg-kai-glow scale-110 ring-2 ring-kai-gold/30'
                            : 'hover:bg-parchment-dark/30'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional text */}
                <div className="mb-4">
                  <label className="font-dm text-xs text-ink-faint mb-1 block">Your thought (optional):</label>
                  <textarea
                    value={amendText}
                    onChange={(e) => setAmendText(e.target.value)}
                    className="w-full font-dm text-sm border border-parchment-edge rounded-lg px-3 py-2 bg-white focus:border-kai-gold focus:ring-2 focus:ring-kai-gold/20 outline-none resize-none"
                    rows={3}
                    placeholder="What stands out? What's missing? What would you change?"
                  />
                </div>

                {/* Optional email */}
                <div className="mb-4">
                  <label className="font-dm text-xs text-ink-faint mb-1 block">Your email (optional — only if you&apos;d like a response):</label>
                  <input
                    type="email"
                    value={amendEmail}
                    onChange={(e) => setAmendEmail(e.target.value)}
                    className="w-full font-dm text-sm border border-parchment-edge rounded-lg px-3 py-2 bg-white focus:border-kai-gold focus:ring-2 focus:ring-kai-gold/20 outline-none"
                    placeholder="you@example.org"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={selectedEmojis.length === 0}
                    className="font-dm text-xs font-semibold bg-kai-gold text-white px-4 py-2 rounded-lg hover:bg-kai-gold-dark disabled:opacity-30 transition-colors"
                  >
                    Submit via form
                  </button>
                  <button
                    type="button"
                    onClick={openEmailAmendment}
                    disabled={selectedEmojis.length === 0}
                    className="font-dm text-xs font-semibold text-kai-gold border border-kai-gold/30 px-4 py-2 rounded-lg hover:bg-kai-glow disabled:opacity-30 transition-colors"
                  >
                    Send via email ↗
                  </button>
                  <p className="font-dm text-[0.6rem] text-ink-faint ml-auto">
                    Email opens your mail client to send to mike@kamunityconsulting.com
                  </p>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Constitution content */}
        <article className="prose-sm">
          {content ? renderMarkdown(content) : (
            <div className="flex items-center justify-center py-20">
              <div className="w-2 h-2 bg-kai-gold rounded-full animate-ember-pulse" />
            </div>
          )}
        </article>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-parchment-edge text-center">
          <p className="font-dm text-xs text-ink-faint mb-3">
            This constitution is licensed under CC BY-SA 4.0. Any community may adopt, adapt, and build upon it.
          </p>
          <Link
            href="/"
            className="font-dm text-sm text-kai-gold hover:text-kai-gold-dark transition-colors no-underline"
          >
            ← Return to Kai
          </Link>
        </div>
      </div>
    </div>
  )
}
