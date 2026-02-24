'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Typewriter from './Typewriter'
import StartingPoints from './StartingPoints'
import SurfaceZone from './SurfaceZone'
import SurfacePanel from './SurfacePanel'
import { CARD_REGISTRY } from '../../data/kai-cards'

interface Message {
  role: 'user' | 'assistant'
  content: string
  cards?: string[]
  isTyping?: boolean
}

export default function EncounterZone() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeCards, setActiveCards] = useState<string[]>([])
  const [showStarting, setShowStarting] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    setShowStarting(false)
    const userMessage: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    // Auto-resize textarea back
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await res.json()

      if (data.error) {
        setMessages([...newMessages, {
          role: 'assistant',
          content: data.error,
        }])
      } else {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.content,
          cards: data.cards,
          isTyping: true,
        }
        setMessages([...newMessages, assistantMessage])

        // Surface new cards — REPLACE previous ones for this turn
        if (data.cards && data.cards.length > 0) {
          setActiveCards(data.cards.slice(0, 3))
        }
      }
    } catch (err) {
      console.error('Kai fetch error:', err)
      setMessages([...newMessages, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. The campfire's still warm — try again in a moment.",
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleStartingPoint = (text: string) => {
    sendMessage(text)
  }

  const dismissCard = (id: string) => {
    setActiveCards((prev) => prev.filter((c) => c !== id))
  }

  const handleTypewriterComplete = (index: number) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, isTyping: false } : m))
    )
  }

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  return (
    <div className={`flex flex-col items-center w-full max-w-2xl relative z-10 transition-all duration-300 mx-auto ${panelOpen ? 'lg:mr-[380px] lg:ml-auto' : 'mx-auto'}`}>
      {/* Welcome / Conversation area */}
      <div className="w-full flex-1 kai-scroll px-2">
        {/* Kai's ambient welcome when no messages */}
        {messages.length === 0 && (
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-kai-glow mb-4">
              <span className="text-3xl">🔥</span>
            </div>
            <h1 className="font-fraunces text-2xl sm:text-3xl font-semibold text-ink mb-3">
              Welcome to Kamunity
            </h1>
            <p className="kai-voice text-ink-light text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-6">
              I&apos;m Kai — the encounter interface for this community ecosystem. I&apos;m here with what&apos;s alive in the network right now.
            </p>
            <p className="font-dm text-[0.65rem] text-ink-faint/50 italic mb-3">
              A campfire for community conversations
            </p>
            <p className="font-dm text-sm text-ink-faint mb-8">
              What are you navigating?
            </p>
          </div>
        )}

        {/* Starting point cards */}
        {showStarting && messages.length === 0 && (
          <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <StartingPoints onSelect={handleStartingPoint} />
          </div>
        )}

        {/* Message thread */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 animate-fade-in-up ${
              message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex items-start gap-2 max-w-[90%]">
                <span className="text-lg mt-1 flex-shrink-0">🔥</span>
                <div className="bg-white/80 backdrop-blur-sm border border-parchment-edge rounded-2xl rounded-tl-sm px-4 py-3">
                  {message.isTyping ? (
                    <Typewriter
                      text={message.content}
                      speed={18}
                      onComplete={() => handleTypewriterComplete(index)}
                    />
                  ) : (
                    <div className="space-y-3">
                      {message.content.split('\n\n').map((para, pi) => (
                        <p key={pi} className="kai-voice text-ink text-sm leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {message.role === 'user' && (
              <div className="max-w-[80%]">
                <div className="bg-kai-gold/10 border border-kai-gold/20 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="font-dm text-ink text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            )}

          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-start gap-2 mb-4 animate-fade-in-up">
            <span className="text-lg mt-1">🔥</span>
            <div className="bg-white/80 backdrop-blur-sm border border-parchment-edge rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-kai-gold rounded-full animate-ember-pulse" />
                <div className="w-1.5 h-1.5 bg-kai-gold rounded-full animate-ember-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="w-1.5 h-1.5 bg-kai-gold rounded-full animate-ember-pulse" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Surfaced card links — centered pills above input */}
      {activeCards.length > 0 && (
        <div className="w-full px-2 pb-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {activeCards.map(id => {
              const card = CARD_REGISTRY[id]
              if (!card) return null
              return card.action?.url ? (
                <a
                  key={id}
                  href={card.action.url}
                  target={card.action.external ? '_blank' : undefined}
                  rel={card.action.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 font-dm text-xs text-kai-gold hover:text-kai-gold-dark transition-colors no-underline px-3 py-1 rounded-full border border-kai-gold/25 hover:border-kai-gold/50 hover:bg-kai-glow/50"
                >
                  <span>{card.icon}</span>
                  <span>{card.title}</span>
                  <span className="text-[0.6rem]">{card.action.external ? '↗' : '→'}</span>
                </a>
              ) : (
                <span key={id} className="inline-flex items-center gap-1.5 font-dm text-xs text-kai-gold px-3 py-1 rounded-full border border-kai-gold/25">
                  <span>{card.icon}</span>
                  <span>{card.title}</span>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="w-full px-2 pb-2"
        data-netlify="false"
      >
        <div className="flex items-end gap-2 bg-white border border-parchment-edge rounded-2xl px-4 py-2 shadow-sm focus-within:border-kai-gold focus-within:ring-2 focus-within:ring-kai-gold/20 transition-all">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="What are you navigating?"
            rows={1}
            className="flex-1 font-dm text-sm text-ink bg-transparent border-none outline-none resize-none placeholder:text-ink-faint/60 leading-relaxed py-1"
            disabled={loading}
            aria-label="Message Kai"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-kai-gold text-white hover:bg-kai-gold-dark disabled:opacity-30 disabled:hover:bg-kai-gold transition-colors"
            aria-label="Send message"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        {/* AI disclaimer — G4 required */}
        <p className="font-dm text-[0.6rem] text-ink-faint/60 text-center mt-2 leading-relaxed max-w-md mx-auto">
          Kai is an AI wayfinder, not a counsellor or professional advisor. Kamunity is a community project, not a certified professional service.
          For legal, financial, health, or safety matters, consult a qualified professional. Conversations are ephemeral — nothing is stored or tracked.
        </p>

        {/* Legal links */}
        <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
          <a
            href="/constitution"
            className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider"
          >
            📜 Constitution
          </a>
          <span className="text-ink-faint/20 text-[0.5rem]">·</span>
          <a
            href="/terms"
            className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider"
          >
            Terms
          </a>
          <span className="text-ink-faint/20 text-[0.5rem]">·</span>
          <a
            href="/privacy"
            className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider"
          >
            Privacy
          </a>
        </div>
      </form>

      {/* Surfaced cards — mobile only (inline below input) */}
      {activeCards.length > 0 && (
        <div className="w-full px-2 pb-4 lg:hidden">
          <SurfaceZone cardIds={activeCards} onDismiss={dismissCard} />
        </div>
      )}

      {/* Surfaced cards — desktop slide-out panel */}
      <SurfacePanel
        cardIds={activeCards}
        onDismiss={dismissCard}
        open={panelOpen}
        onToggle={() => setPanelOpen(!panelOpen)}
      />
    </div>
  )
}
