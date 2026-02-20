'use client'

import { useState } from 'react'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Does your organisation use Microsoft 365 (Outlook, Teams, SharePoint, OneDrive)?',
    sub: 'This determines whether Copilot has access to your environment',
    options: [
      { value: 0, label: 'No — we use Google or other tools' },
      { value: 1, label: 'Yes — some staff use it' },
      { value: 3, label: 'Yes — it\'s our main platform' },
    ],
  },
  {
    id: 'q2',
    text: 'Has Copilot been enabled on your Microsoft 365 tenant (even as a trial)?',
    sub: 'Check with your IT admin or in Microsoft Admin Centre',
    options: [
      { value: 0, label: 'No — not enabled' },
      { value: 1, label: 'Not sure — nobody\'s checked' },
      { value: 3, label: 'Yes — it\'s active for some or all staff' },
    ],
  },
  {
    id: 'q3',
    text: 'Does your organisation store sensitive client, health, or personal data in Microsoft 365?',
    sub: 'Emails, documents, Teams messages, SharePoint files',
    options: [
      { value: 0, label: 'No — we keep sensitive data elsewhere' },
      { value: 2, label: 'Some — mainly internal staff information' },
      { value: 4, label: 'Yes — client records, case notes, health data' },
    ],
  },
  {
    id: 'q4',
    text: 'Has your organisation reviewed Microsoft\'s data processing terms for Copilot?',
    sub: 'Specifically the EU Data Boundary and data residency commitments',
    options: [
      { value: 0, label: 'Yes — we\'ve reviewed and are comfortable' },
      { value: 2, label: 'No — but we plan to' },
      { value: 3, label: 'No — and this is the first I\'ve heard of it' },
    ],
  },
  {
    id: 'q5',
    text: 'Do you have a board-approved AI or data governance policy?',
    sub: 'Covering how AI tools can be used with organisational or client data',
    options: [
      { value: 0, label: 'Yes — policy exists and staff know it' },
      { value: 2, label: 'Partial — something informal exists' },
      { value: 3, label: 'No — nothing formal in place' },
    ],
  },
]

type Risk = 'low' | 'medium' | 'high' | 'critical'

const riskConfig: Record<Risk, { label: string; color: string; bg: string; border: string; bar: string; emoji: string }> = {
  low:      { label: 'Low Risk',      color: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200', bar: 'bg-green-500',  emoji: '✅' },
  medium:   { label: 'Medium Risk',   color: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200', bar: 'bg-amber-500',  emoji: '⚠️' },
  high:     { label: 'High Risk',     color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200',bar: 'bg-orange-500', emoji: '🚨' },
  critical: { label: 'Critical Risk', color: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200',   bar: 'bg-red-500',    emoji: '🔴' },
}

interface Finding { severity: Risk; text: string }
interface Action  { text: string; timeframe: string }

function getResults(answers: Record<string, number>, score: number): { risk: Risk; findings: Finding[]; actions: Action[] } {
  const risk: Risk = score <= 2 ? 'low' : score <= 6 ? 'medium' : score <= 10 ? 'high' : 'critical'

  const findings: Finding[] = []
  const actions: Action[] = []

  if (answers.q2 >= 3) {
    findings.push({ severity: 'critical', text: 'Copilot is active and has access to your Microsoft 365 data — emails, documents, Teams messages, SharePoint files — right now.' })
    actions.push({ text: 'Review which staff have Copilot enabled and what data they can access through it', timeframe: 'This week' })
  }

  if (answers.q3 >= 4 && answers.q2 >= 1) {
    findings.push({ severity: 'critical', text: 'Sensitive client or health data is stored in Microsoft 365 and may be accessible to Copilot\'s training and processing systems.' })
    actions.push({ text: 'Conduct an immediate data audit: identify all sensitive data in M365 and assess Copilot\'s access scope', timeframe: 'Urgent — within 2 weeks' })
  }

  if (answers.q4 >= 2) {
    findings.push({ severity: 'high', text: 'Your organisation has not reviewed Microsoft\'s data processing terms for Copilot. You may be operating outside your privacy obligations without knowing it.' })
    actions.push({ text: 'Download and review Microsoft\'s Data Processing Agreement and EU Data Boundary documentation', timeframe: 'This month' })
  }

  if (answers.q5 >= 2 && answers.q2 >= 1) {
    findings.push({ severity: 'high', text: 'No formal AI governance policy exists. Staff are using AI tools without documented guidelines, creating liability and compliance risk.' })
    actions.push({ text: 'Draft a simple AI Use Policy — Kamunity\'s AI Readiness toolkit has a free template', timeframe: 'This month' })
  }

  if (answers.q2 === 1) {
    findings.push({ severity: 'medium', text: 'Uncertainty about Copilot status is itself a risk — you can\'t manage what you don\'t know is active.' })
    actions.push({ text: 'Ask your IT admin (or Microsoft Partner) to confirm Copilot status in your tenant today', timeframe: 'This week' })
  }

  if (score === 0) {
    findings.push({ severity: 'low', text: 'Your current setup appears low risk for Copilot-related data exposure.' })
    actions.push({ text: 'Continue monitoring — Microsoft regularly changes what Copilot can access with product updates', timeframe: 'Quarterly review' })
  }

  return { risk, findings, actions }
}

export default function CopilotCheckPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)

  const allAnswered = QUESTIONS.every(q => q.id in answers)
  const score = Object.values(answers).reduce((s, v) => s + v, 0)
  const maxScore = QUESTIONS.reduce((s, q) => s + Math.max(...q.options.map(o => o.value)), 0)

  const handleAnswer = (qId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
    setShowResult(false)
  }

  const { risk, findings, actions } = showResult ? getResults(answers, score) : { risk: 'low' as Risk, findings: [], actions: [] }
  const rc = riskConfig[risk]

  return (
    <main className="min-h-screen bg-[#faf8f4] font-sans">
      {/* Header */}
      <div className="border-b border-[#e8e0d0] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#8B6914] font-dm font-semibold text-sm no-underline hover:text-[#6B4F10] transition-colors">
            🔥 Kamunity
          </Link>
          <span className="font-dm text-xs text-[#999] uppercase tracking-widest">Copilot Risk Check</span>
          <Link href="/calculator" className="font-dm text-xs font-semibold text-[#8B6914] no-underline border border-[#8B6914]/30 px-3 py-1 rounded-full hover:bg-[#8B6914]/10 transition-colors">
            Cost Calculator →
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-dm text-xs bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full mb-6 uppercase tracking-wider font-semibold">
            🛡️ 5-Question Assessment
          </div>
          <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
            Is Microsoft Copilot putting<br />
            <span className="text-[#3b5fc0]">your data at risk?</span>
          </h1>
          <p className="font-dm text-base text-[#666] max-w-md mx-auto leading-relaxed">
            Five questions. Under 3 minutes. Find out your risk level and what to do about it — before your board asks.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-5 mb-8">
          {QUESTIONS.map((q, qi) => (
            <div key={q.id} className={`bg-white border rounded-2xl p-5 transition-all ${q.id in answers ? 'border-[#8B6914]/30' : 'border-[#e8e0d0]'}`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-dm text-sm font-bold transition-colors ${q.id in answers ? 'bg-[#8B6914] text-white' : 'bg-[#f0ece0] text-[#999]'}`}>
                  {q.id in answers ? '✓' : qi + 1}
                </div>
                <div>
                  <div className="font-dm text-sm font-semibold text-[#1a1a1a] leading-snug">{q.text}</div>
                  <div className="font-dm text-xs text-[#999] mt-1">{q.sub}</div>
                </div>
              </div>
              <div className="space-y-2 pl-10">
                {q.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(q.id, opt.value)}
                    className={`w-full text-left font-dm text-sm px-4 py-3 rounded-xl border transition-all ${
                      answers[q.id] === opt.value
                        ? 'border-[#8B6914] bg-amber-50 text-[#8B6914] font-semibold'
                        : 'border-[#e8e0d0] text-[#444] hover:border-[#8B6914]/40 hover:bg-[#faf8f4]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Run check button */}
        {allAnswered && !showResult && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowResult(true)}
              className="font-dm font-bold text-sm bg-[#3b5fc0] text-white px-8 py-3 rounded-full hover:bg-[#2d4fa8] transition-colors shadow-md"
            >
              Run Copilot Check →
            </button>
          </div>
        )}

        {/* Results */}
        {showResult && (
          <div className="animate-fade-in-up space-y-5">
            {/* Risk score */}
            <div className={`${rc.bg} ${rc.border} border rounded-2xl p-6 text-center`}>
              <div className="text-3xl mb-2">{rc.emoji}</div>
              <div className={`font-sans text-2xl font-bold ${rc.color} mb-1`}>{rc.label}</div>
              <div className="font-dm text-sm text-[#666] mb-4">Score: {score} / {maxScore}</div>
              <div className="h-3 bg-white/60 rounded-full overflow-hidden max-w-xs mx-auto">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${rc.bar}`}
                  style={{ width: `${(score / maxScore) * 100}%` }}
                />
              </div>
            </div>

            {/* Findings */}
            {findings.length > 0 && (
              <div className="bg-white border border-[#e8e0d0] rounded-2xl p-5">
                <div className="font-dm text-sm font-bold text-[#1a1a1a] mb-4">Findings</div>
                <div className="space-y-3">
                  {findings.map((f, i) => {
                    const fc = riskConfig[f.severity]
                    return (
                      <div key={i} className={`${fc.bg} ${fc.border} border-l-4 rounded-r-xl px-4 py-3`}>
                        <div className={`font-dm text-xs font-bold ${fc.color} uppercase tracking-wider mb-1`}>{fc.label}</div>
                        <div className="font-dm text-sm text-[#444] leading-relaxed">{f.text}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Recommended actions */}
            {actions.length > 0 && (
              <div className="bg-white border border-[#e8e0d0] rounded-2xl p-5">
                <div className="font-dm text-sm font-bold text-[#1a1a1a] mb-4">Recommended actions</div>
                <div className="space-y-3">
                  {actions.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#8B6914]/10 text-[#8B6914] font-dm font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-dm text-sm text-[#1a1a1a] leading-relaxed">{a.text}</div>
                        <div className="font-dm text-xs text-[#8B6914] font-semibold mt-1">{a.timeframe}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center">
              <div className="font-dm text-sm font-bold text-[#8B6914] mb-2">Want a full sovereignty review?</div>
              <p className="font-dm text-sm text-[#666] mb-4 max-w-sm mx-auto">
                The full Digital Sovereignty Audit covers all your tools — not just Copilot. Free, 2 minutes, no sign-up.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://kamunity-audit.netlify.app" target="_blank" rel="noopener noreferrer"
                  className="font-dm text-sm font-bold bg-[#8B6914] text-white px-6 py-2.5 rounded-full no-underline hover:bg-[#6B4F10] transition-colors">
                  Take the full audit ↗
                </a>
                <button onClick={() => { setAnswers({}); setShowResult(false) }}
                  className="font-dm text-sm font-semibold border border-[#8B6914]/30 text-[#8B6914] px-6 py-2.5 rounded-full bg-white hover:bg-amber-50 transition-colors">
                  Start over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#e8e0d0] mt-12 py-6">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between flex-wrap gap-2">
          <Link href="/" className="font-dm text-xs text-[#999] no-underline hover:text-[#8B6914] transition-colors">← Back to Kamunity</Link>
          <span className="font-dm text-xs text-[#bbb]">No data collected · Free forever · Built on Whadjuk Noongar boodja</span>
        </div>
      </div>
    </main>
  )
}
