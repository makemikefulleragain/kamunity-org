'use client'

import { useEffect, useState, useCallback } from 'react'
import FadeIn from './FadeIn'
import BuildLoop from './BuildLoop'

const quotes = [
  'I need a way to track our community garden \u2014 what\u2019s planted, when to water, what\u2019s ready to harvest.',
  'Our local footy club runs off one person\u2019s phone. If they leave, we lose everything \u2014 the roster, the contacts, the finances.',
  'I\u2019m a uni student trying to start a study group but there\u2019s no free tool that isn\u2019t harvesting our data or shoving ads at us.',
  'I volunteer at a food bank. We coordinate with sticky notes and a whiteboard. There has to be a better way.',
  'My school P&C needs a place parents can actually find \u2014 not buried in a Facebook group nobody checks.',
]

export default function SubHero() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % quotes.length)
      setVisible(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(advance, 8000)
    return () => clearInterval(timer)
  }, [paused, advance])

  return (
    <section className="py-16">
      <FadeIn>
        <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
          The Journey
        </div>
        <h2 className="font-sans text-[1.8rem] font-bold text-ku mb-10 leading-tight tracking-tight max-w-[640px]">
          How a community builds its own tools
        </h2>
      </FadeIn>

      {/* Block 1: Text left, Build Loop right */}
      <FadeIn className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div>
            <h3 className="font-serif text-[1.5rem] italic text-fire-red/80 mb-6 leading-snug">
              Someone at the fire speaks.
            </h3>

            <div
              className="mb-6 min-h-[80px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <blockquote className="border-l-[3px] border-fire-amber pl-5">
                <p
                  className="font-serif text-[1.05rem] italic text-ink-light leading-relaxed transition-opacity duration-[2000ms] ease-in-out"
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  &ldquo;{quotes[current]}&rdquo;
                </p>
              </blockquote>
              <div className="flex justify-center gap-1.5 mt-3">
                {quotes.map((_, i) => (
                  <span
                    key={i}
                    className={`block w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i === current ? 'bg-ku' : 'bg-parchment-edge'}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-[0.88rem] text-ink mb-4 leading-relaxed">
              In most communities, that idea stays an idea. There&apos;s no developer on call. No budget for software. No time to learn to code. The need is real but the tools aren&apos;t.
            </p>

            <p className="text-[0.88rem] text-ink-light leading-relaxed">
              So the need sits. And the community keeps using spreadsheets, or group chats, or nothing.
            </p>
          </div>

          {/* Build Loop on the right */}
          <div className="flex items-start justify-center pt-4">
            <BuildLoop />
          </div>
        </div>
      </FadeIn>

      {/* Campfire text below block 1 */}
      <FadeIn className="mb-16 max-w-[640px]">
        <p className="text-[0.88rem] text-ink mb-3 leading-relaxed">
          This is what <a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="text-ku font-semibold no-underline hover:text-ku-light">Kamunity</a> is — the campfire where communities gather. A place to speak your needs, share ideas, and find others who&apos;ve solved similar problems.
        </p>
        <p className="text-[0.88rem] text-ink leading-relaxed">
          It&apos;s not a product pitch. It&apos;s a circle. You sit down, you say what you need, and the community responds — sometimes with advice, sometimes with a tool that already exists, and sometimes by building something new.
        </p>
      </FadeIn>

      {/* Block 2: Text left, Callout box right */}
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div>
            <h3 className="font-serif text-[1.5rem] italic text-fire-red/80 mb-6 leading-snug">
              What if the fire could build it?
            </h3>

            <p className="text-[0.88rem] text-ink mb-4 leading-relaxed">
              Not a company. Not a platform. Not a product you sign up for and hope they don&apos;t change the pricing.
            </p>

            <p className="text-[0.88rem] text-ink mb-4 leading-relaxed">
              A factory. Owned by the community. Running on the community&apos;s terms. When someone speaks a need, the factory listens, plans, builds, checks its own work, and delivers something that actually runs. Then it learns from what it built, so the next thing is better.
            </p>

            <p className="text-[0.88rem] text-ink-light leading-relaxed">
              People around the campfire. People in the factory. The same people — your community — pulling together to get the thing done.
            </p>
          </div>

          {/* Callout box on the right */}
          <div className="bg-white border border-parchment-edge rounded-xl p-5 shadow-sm">
            <div className="font-sans text-[0.5rem] uppercase tracking-[2px] text-ku mb-3 font-semibold">
              Built-in Guardrails
            </div>
            <p className="text-[0.75rem] text-ink-light mb-3 leading-relaxed">
              The factory has rules it cannot break — a constitution written by the community. No surveillance. No dark patterns. No vendor lock-in. No extracting data from people without their knowledge.
            </p>
            <p className="text-[0.75rem] text-ink-light mb-4 leading-relaxed">
              A request to build a user-tracking tool gets refused. Not by a person making a judgement call. By the infrastructure itself. The values are structural, not aspirational.
            </p>
            <a
              href="https://factoryk1.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ku font-sans text-[0.72rem] font-semibold no-underline hover:text-ku-light transition-colors"
            >
              See the factory at work →
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
