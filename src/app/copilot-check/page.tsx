'use client'

import { useState } from 'react'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Does your organisation use Microsoft 365 (formerly Office 365)?',
    sub: 'This includes Teams, Outlook, SharePoint, OneDrive, Word, Excel.',
    opts: [
      { val: 'yes-paid', label: 'Yes — paid subscription', risk: 3 },
      { val: 'yes-nfp', label: 'Yes — NFP/charity licence', risk: 4 },
      { val: 'no', label: 'No — we use Google/other', risk: 0 },
      { val: 'unsure', label: 'Not sure / some staff do', risk: 3 },
    ]
  },
  {
    id: 'q2',
    text: 'Has anyone in your organisation checked whether Copilot is enabled on your M365 account?',
    sub: 'Copilot may be enabled by default depending on your licence tier. Check in Microsoft 365 Admin Centre.',
    opts: [
      { val: 'yes-off', label: "Yes — we checked, it's off", risk: 0 },
      { val: 'yes-on', label: "Yes — it's enabled", risk: 5 },
      { val: 'no', label: 'No — nobody has checked', risk: 5 },
      { val: 'unsure', label: 'Not sure', risk: 4 },
    ]
  },
  {
    id: 'q3',
    text: 'Does your organisation handle sensitive data in Microsoft 365?',
    sub: 'Sensitive data includes: client case notes, health information, financial records, confidential communications, personal details of service users.',
    opts: [
      { val: 'yes-high', label: 'Yes — health/case notes/legal', risk: 6 },
      { val: 'yes-med', label: 'Yes — financial/personal data', risk: 4 },
      { val: 'yes-low', label: 'Yes — basic org admin only', risk: 2 },
      { val: 'no', label: 'No sensitive data in M365', risk: 0 },
    ]
  },
  {
    id: 'q4',
    text: 'Do you have a policy governing AI tool use by staff?',
    sub: 'A policy would specify which AI tools are approved, what data can be used with them, and who approves exceptions.',
    opts: [
      { val: 'yes-full', label: 'Yes — written, staff trained', risk: 0 },
      { val: 'yes-draft', label: 'Draft exists but not finalised', risk: 2 },
      { val: 'informal', label: 'Informal understanding only', risk: 4 },
      { val: 'no', label: 'No policy exists', risk: 5 },
    ]
  },
  {
    id: 'q5',
    text: 'Has your board or leadership been briefed on Microsoft Copilot and what it can access?',
    sub: 'Board oversight of AI data risk is increasingly expected by funders, regulators, and insurers.',
    opts: [
      { val: 'yes-full', label: 'Yes — fully briefed and aware', risk: 0 },
      { val: 'yes-some', label: 'Partial awareness only', risk: 2 },
      { val: 'no', label: 'Not yet briefed', risk: 3 },
      { val: 'na', label: "We're very small / no board", risk: 1 },
    ]
  },
]

interface Finding {
  sev: 'critical' | 'high' | 'medium' | 'low'
  title: string
  body: string
}

const SEV_STYLES: Record<string, string> = {
  critical: 'border-l-[#c0392b] bg-[#c0392b]/5',
  high: 'border-l-fire-orange bg-fire-orange/5',
  medium: 'border-l-fire-amber bg-fire-amber/5',
  low: 'border-l-forest bg-forest/5',
}

const RISK_LEVELS = [
  { max: 20, level: 'low', label: '✅ Low Risk', desc: "Your organisation appears to have reasonable controls in place. Keep monitoring as Microsoft's AI features evolve.", color: '#27ae60' },
  { max: 45, level: 'medium', label: '⚠️ Medium Risk', desc: 'Some gaps identified. Action recommended before Copilot is widely used by staff.', color: '#f39c12' },
  { max: 70, level: 'high', label: '🔴 High Risk', desc: 'Significant data governance gaps. Immediate action recommended, especially if you handle sensitive client data.', color: '#e67e22' },
  { max: 101, level: 'critical', label: '🚨 Critical Risk', desc: 'Urgent attention required. Your sensitive data may already be processed by Copilot without governance, consent, or oversight.', color: '#c0392b' },
]

export default function CopilotCheckPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const selectOpt = (qid: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qid]: val }))
  }

  const answered = Object.keys(answers).length
  const allAnswered = answered === QUESTIONS.length

  const runCheck = () => {
    if (!allAnswered) return
    setShowResults(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const resetCheck = () => {
    setAnswers({})
    setShowResults(false)
  }

  // Compute results
  const totalRisk = QUESTIONS.reduce((sum, q) => {
    const opt = q.opts.find(o => o.val === answers[q.id])
    return sum + (opt ? opt.risk : 0)
  }, 0)
  const maxRisk = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.opts.map(o => o.risk)), 0)
  const pct = maxRisk > 0 ? Math.round((totalRisk / maxRisk) * 100) : 0

  const riskLevel = RISK_LEVELS.find(r => pct < r.max) || RISK_LEVELS[RISK_LEVELS.length - 1]

  const findings: Finding[] = []
  const actions: string[] = []

  if (showResults) {
    if (['yes-on', 'no', 'unsure'].includes(answers.q2 || '')) {
      findings.push({ sev: 'critical', title: 'Copilot status unknown or enabled without review', body: 'If Copilot is enabled and your staff use M365, it may already be processing emails, documents, and Teams conversations. This is happening now, not in the future.' })
      actions.push('Check Copilot status now: Microsoft 365 Admin Centre → Settings → Copilot. Document what you find.')
    }
    if (['yes-high', 'yes-med'].includes(answers.q3 || '') && ['yes-on', 'no', 'unsure'].includes(answers.q2 || '')) {
      findings.push({ sev: 'critical', title: 'Sensitive data in scope of Copilot processing', body: 'You handle sensitive data (health/case notes or financial/personal) in M365, and Copilot status is unclear or enabled. This creates potential consent, privacy, and regulatory obligations.' })
      actions.push('Conduct a data mapping exercise: identify which sensitive data lives in M365 (emails, SharePoint, Teams). This is your risk surface.')
    }
    if (['no', 'informal'].includes(answers.q4 || '')) {
      findings.push({ sev: 'high', title: 'No AI governance policy', body: 'Without a policy, staff may use Copilot (and other AI tools) with sensitive data without any guardrails. Funders and regulators are beginning to ask about this.' })
      actions.push('Draft a one-page AI Use Policy. Minimum: which tools are approved, what data is prohibited, who approves exceptions. Kamunity can help.')
    }
    if (['no', 'yes-some'].includes(answers.q5 || '')) {
      findings.push({ sev: 'medium', title: 'Board not fully informed on Copilot data risk', body: 'Boards are increasingly responsible for AI governance. Informing them is both good governance and funder due diligence protection.' })
      actions.push('Add a 10-minute AI governance briefing to the next board meeting. Use the Kamunity AI Safety Checklist as the agenda.')
    }
    if (answers.q1 === 'no') {
      findings.push({ sev: 'low', title: 'Not using Microsoft 365 — lower immediate Copilot risk', body: "You're not on M365, so Copilot is not your immediate concern. However, check whether any staff use personal M365 accounts for work purposes." })
    }
    if (!findings.length) {
      findings.push({ sev: 'low', title: 'Good baseline controls in place', body: "Your answers suggest reasonable AI governance awareness. Keep monitoring — Microsoft's AI features evolve rapidly and your risk profile can change." })
    }
    actions.push('Take the full Kamunity Digital Sovereignty Audit for a comprehensive assessment of all your digital tools.')
    actions.push("Review Microsoft's data processing documentation: learn exactly what Copilot accesses on your licence tier.")
  }

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
        <span className="font-fraunces text-sm font-semibold text-ink">🪟 Copilot Check</span>
        <a
          href="https://kamunity-audit.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-dm text-xs font-semibold text-kai-gold border border-kai-gold/40 px-3 py-1.5 rounded-full hover:bg-kai-glow transition-all hidden sm:block"
        >
          Full Audit →
        </a>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Intro */}
        <div className="mb-6">
          <h1 className="font-fraunces text-2xl sm:text-3xl font-bold text-ink mb-2">
            Copilot Risk Check
          </h1>
          <p className="font-dm text-sm text-ink-light leading-relaxed mb-4">
            Is Microsoft Copilot putting your organisation&apos;s data at risk? 5 minutes. Free. No sign-up.
          </p>
          <div className="bg-gradient-to-br from-fire-amber/10 to-ku/5 border border-parchment-edge rounded-xl p-4 font-dm text-sm text-ink leading-relaxed">
            <strong>Why this matters:</strong> Microsoft is rolling out Copilot across Microsoft 365 — including to NFP licence holders. Many organisations have it activated without knowing. Copilot processes your emails, documents, meetings, and Teams chats to generate AI responses. Your client data, case notes, and confidential documents may be in scope.
            <p className="text-xs text-ink-faint mt-2">This check helps you understand your current exposure and what to do about it. Not legal advice — consult your legal team for specific obligations.</p>
          </div>
        </div>

        {/* Results view */}
        {showResults && (
          <div className="animate-fade-in-up">
            {/* Risk summary */}
            <div className="bg-white border border-parchment-edge rounded-xl p-5 mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="font-fraunces text-lg font-bold text-ink">{riskLevel.label}</span>
                <span className="font-fraunces text-2xl font-bold" style={{ color: riskLevel.color }}>{pct}%</span>
              </div>
              <div className="h-3 bg-parchment-dark rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: riskLevel.color }}
                />
              </div>
              <p className="font-dm text-sm text-ink-light">{riskLevel.desc}</p>
            </div>

            {/* Findings */}
            <h2 className="font-dm text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">Findings</h2>
            <div className="space-y-2 mb-5">
              {findings.map((f, i) => (
                <div key={i} className={`border-l-4 px-4 py-3 rounded-r-xl ${SEV_STYLES[f.sev]}`}>
                  <p className="font-dm text-sm font-bold text-ink mb-1">{f.title}</p>
                  <p className="font-dm text-xs text-ink-light leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <h2 className="font-dm text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">Recommended Actions</h2>
            <div className="bg-white border border-parchment-edge rounded-xl p-4 mb-5">
              <div className="space-y-3">
                {actions.map((a, i) => (
                  <div key={i} className="flex gap-3 items-start font-dm text-sm text-ink">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-kai-gold text-white text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
                    <span className="leading-relaxed text-ink-light">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://kamunity-audit.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-dm text-sm font-semibold bg-kai-gold text-white px-5 py-2.5 rounded-full hover:bg-kai-gold-dark transition-colors"
              >
                Take the Full Sovereignty Audit →
              </a>
              <button
                onClick={resetCheck}
                className="inline-flex items-center gap-2 font-dm text-sm font-semibold text-ink border border-parchment-edge px-5 py-2.5 rounded-full hover:border-kai-gold hover:text-kai-gold transition-colors bg-white"
              >
                Start Over
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-white border border-parchment-edge rounded-xl p-4 mb-6 font-dm text-xs text-ink-faint leading-relaxed">
              <strong className="text-ink-light">Disclaimer:</strong> This assessment is for awareness purposes only. Findings are based on your answers and general knowledge of Microsoft Copilot&apos;s data handling practices as of early 2026. Microsoft&apos;s data processing terms change frequently. For legally binding advice about your data obligations, consult a qualified legal professional. Built by Kamunity — <Link href="/constitution" className="text-kai-gold hover:text-kai-gold-dark no-underline">kamunity.org/constitution</Link> (Principle 10: Ontological Honesty).
            </div>
          </div>
        )}

        {/* Questions view */}
        {!showResults && (
          <div>
            <h2 className="font-dm text-xs font-semibold text-ink-faint uppercase tracking-wider mb-4">
              Answer these 5 questions
            </h2>
            <div className="space-y-4">
              {QUESTIONS.map((q, qi) => (
                <div key={q.id} className="bg-white border border-parchment-edge rounded-xl p-4">
                  <p className="font-dm text-sm font-semibold text-ink mb-1">
                    <span className="text-kai-gold mr-2">{qi + 1}.</span>{q.text}
                  </p>
                  <p className="font-dm text-xs text-ink-faint mb-3 leading-relaxed">{q.sub}</p>
                  <div className="flex flex-col gap-2">
                    {q.opts.map(o => (
                      <button
                        key={o.val}
                        onClick={() => selectOpt(q.id, o.val)}
                        className={`text-left px-3 py-2 rounded-lg border-2 font-dm text-sm transition-all ${
                          answers[q.id] === o.val
                            ? 'border-kai-gold bg-kai-glow/40 font-semibold text-ink'
                            : 'border-parchment-edge text-ink-light hover:border-ku/30 hover:bg-parchment/50'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={runCheck}
                disabled={!allAnswered}
                className="w-full font-dm text-sm font-semibold bg-kai-gold text-white py-3 rounded-xl hover:bg-kai-gold-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {allAnswered ? 'Run Copilot Check →' : `Answer all questions (${QUESTIONS.length - answered} remaining)`}
              </button>
            </div>
          </div>
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
            <Link href="/calculator" className="font-dm text-[0.6rem] text-ink-faint hover:text-kai-gold transition-colors no-underline uppercase tracking-wider">
              Sovereignty Calculator
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
