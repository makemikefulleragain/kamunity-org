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

  // Get section label based on article number
  const getSectionLabel = (articleTitle: string): string | null => {
    if (articleTitle.includes('Article 2')) return '🔒 Inviolable Principles'
    if (articleTitle.includes('Article 3')) return '🌿 Encounter Principles'
    if (articleTitle.includes('Article 4')) return '📚 Knowledge Framework'
    if (articleTitle.includes('Article 5')) return '🔄 Evolution Process'
    return null
  }

  // Parse clause number and text from bold markdown
  // Format 1: "**2.1 No Surveillance.** Kai will never monitor..." (with title)
  // Format 2: "**1.1** Kai is a wayfinder..." (number only, no title)
  const parseClause = (text: string): { number: string; title: string; body: string } | null => {
    // Try Format 1: **X.X Title.** Body
    const matchWithTitle = text.match(/^\*\*(\d+\.\d+)\s+(.+?)\.\*\*\s*(.+)$/)
    if (matchWithTitle) {
      return { number: matchWithTitle[1], title: matchWithTitle[2], body: matchWithTitle[3] }
    }
    
    // Try Format 2: **X.X** Body
    const matchNumberOnly = text.match(/^\*\*(\d+\.\d+)\*\*\s*(.+)$/)
    if (matchNumberOnly) {
      return { number: matchNumberOnly[1], title: '', body: matchNumberOnly[2] }
    }
    
    return null
  }

  // Legal Document styling for constitution
  // Parse line by line to handle single-newline markdown
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n')
    const elements: JSX.Element[] = []
    let keyCounter = 0
    let i = 0

    const getKey = () => `block-${keyCounter++}`

    while (i < lines.length) {
      const line = lines[i].trim()
      
      // Skip empty lines
      if (!line) {
        i++
        continue
      }

      // Title (h1)
      if (line.startsWith('# ')) {
        elements.push(
          <div key={getKey()} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-kai-gold/10 px-4 py-2 rounded-full mb-4">
              <span className="text-xl">📜</span>
              <span className="font-dm text-xs font-semibold text-kai-gold-dark uppercase tracking-wider">Founder&apos;s Draft — February 2026</span>
            </div>
            <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-ink mb-3">
              {line.replace('# ', '')}
            </h1>
            <p className="font-dm text-sm text-ink-light italic">
              Written by Mike Fuller, Kamunity. This document will be superseded by one created through community deliberative process.
            </p>
          </div>
        )
        i++
        continue
      }

      // Article headers (h2) — sticky with gold accent
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '')
        const sectionLabel = getSectionLabel(title)
        
        elements.push(
          <div key={getKey()} className="sticky top-14 z-30 bg-kai-cream/95 backdrop-blur-sm border-l-4 border-kai-gold pl-4 py-3 my-8 -mx-4 shadow-sm">
            {sectionLabel && (
              <span className="font-dm text-[0.65rem] font-semibold text-kai-gold uppercase tracking-wider">
                {sectionLabel}
              </span>
            )}
            <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-ink">
              {title}
            </h2>
          </div>
        )
        i++
        continue
      }

      // Horizontal rule
      if (line === '---') {
        elements.push(<hr key={getKey()} className="border-parchment-edge/50 my-8" />)
        i++
        continue
      }

      // Italic single line (*text*)
      if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**') && line.length > 2) {
        elements.push(
          <p key={getKey()} className="font-fraunces text-base text-ink-light italic leading-relaxed mb-2 pl-4 border-l-2 border-parchment-edge">
            {line.replace(/^\*|\*$/g, '')}
          </p>
        )
        i++
        continue
      }

      // Clause paragraphs (**X.X Title.** body)
      if (line.startsWith('**')) {
        const clause = parseClause(line)
        
        if (clause) {
          elements.push(
            <div key={getKey()} className="mb-5 group">
              <div className="flex items-start gap-3">
                {/* Clause number badge */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white border-2 border-kai-gold/30 rounded-lg shadow-sm group-hover:border-kai-gold/50 transition-colors">
                  <span className="font-dm text-sm font-bold text-kai-gold">{clause.number}</span>
                </div>
                
                {/* Clause content */}
                <div className="flex-1 pt-1">
                  {clause.title && (
                    <h3 className="font-fraunces text-base font-semibold text-ink mb-1">
                      {clause.title}
                    </h3>
                  )}
                  <p className="font-dm text-sm text-ink-light leading-relaxed">
                    {clause.body}
                  </p>
                </div>
              </div>
            </div>
          )
          i++
          continue
        }
      }

      // Default paragraph
      elements.push(
        <p key={getKey()} className="font-dm text-sm text-ink-light leading-relaxed mb-4 pl-4">
          {line}
        </p>
      )
      i++
    }

    return elements
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

      <div className="max-w-3xl mx-auto px-6 py-8">
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
