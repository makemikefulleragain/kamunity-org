'use client'

import { useState } from 'react'
import Link from 'next/link'

const TOOLS = [
  { id: 'office365',  name: 'Microsoft 365',       cat: 'Productivity', icon: '🏢', monthly: 12.50, timeCost: 80,  dataValue: 45,  switchCost: 2800, lock: 85 },
  { id: 'teams',      name: 'Microsoft Teams',      cat: 'Comms',        icon: '💬', monthly: 0,     timeCost: 60,  dataValue: 55,  switchCost: 1900, lock: 88 },
  { id: 'sharepoint', name: 'SharePoint',           cat: 'Storage',      icon: '📁', monthly: 0,     timeCost: 90,  dataValue: 40,  switchCost: 3200, lock: 92 },
  { id: 'copilot',    name: 'Microsoft Copilot',    cat: 'AI',           icon: '🤖', monthly: 30,    timeCost: 20,  dataValue: 120, switchCost: 1200, lock: 90 },
  { id: 'googlews',   name: 'Google Workspace',     cat: 'Productivity', icon: '🔵', monthly: 10,    timeCost: 60,  dataValue: 80,  switchCost: 2200, lock: 80 },
  { id: 'slack',      name: 'Slack',                cat: 'Comms',        icon: '⚡', monthly: 8.75,  timeCost: 50,  dataValue: 35,  switchCost: 1400, lock: 72 },
  { id: 'dropbox',    name: 'Dropbox',              cat: 'Storage',      icon: '📦', monthly: 15,    timeCost: 20,  dataValue: 25,  switchCost: 800,  lock: 60 },
  { id: 'zoom',       name: 'Zoom',                 cat: 'Comms',        icon: '📹', monthly: 16.99, timeCost: 30,  dataValue: 20,  switchCost: 600,  lock: 55 },
  { id: 'canva',      name: 'Canva',                cat: 'Design',       icon: '🎨', monthly: 17,    timeCost: 20,  dataValue: 15,  switchCost: 400,  lock: 50 },
  { id: 'mailchimp',  name: 'Mailchimp',            cat: 'Comms',        icon: '📧', monthly: 13,    timeCost: 30,  dataValue: 60,  switchCost: 1800, lock: 78 },
  { id: 'salesforce', name: 'Salesforce / CRM',     cat: 'Ops',          icon: '☁️', monthly: 25,    timeCost: 120, dataValue: 90,  switchCost: 8000, lock: 95 },
  { id: 'hubspot',    name: 'HubSpot',              cat: 'Ops',          icon: '🧡', monthly: 15,    timeCost: 80,  dataValue: 70,  switchCost: 3000, lock: 82 },
  { id: 'notion',     name: 'Notion',               cat: 'Productivity', icon: '📓', monthly: 8,     timeCost: 40,  dataValue: 30,  switchCost: 600,  lock: 58 },
  { id: 'asana',      name: 'Asana / Monday',       cat: 'Ops',          icon: '✅', monthly: 11,    timeCost: 50,  dataValue: 25,  switchCost: 900,  lock: 65 },
  { id: 'chatgpt',    name: 'ChatGPT Plus',         cat: 'AI',           icon: '🧠', monthly: 20,    timeCost: 20,  dataValue: 50,  switchCost: 200,  lock: 40 },
  { id: 'xero',       name: 'Xero / MYOB',          cat: 'Finance',      icon: '💳', monthly: 35,    timeCost: 40,  dataValue: 40,  switchCost: 4000, lock: 88 },
]

const USERS = [5, 10, 15, 20, 30, 50]

const lockLabel = (score: number) => {
  if (score >= 85) return { label: 'Critical lock-in', color: 'text-red-600', bg: 'bg-red-100' }
  if (score >= 70) return { label: 'High lock-in', color: 'text-orange-600', bg: 'bg-orange-100' }
  if (score >= 50) return { label: 'Moderate lock-in', color: 'text-amber-600', bg: 'bg-amber-100' }
  return { label: 'Manageable', color: 'text-green-600', bg: 'bg-green-100' }
}

export default function CalculatorPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [users, setUsers] = useState(15)
  const [showResult, setShowResult] = useState(false)

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setShowResult(false)
  }

  const selectedTools = TOOLS.filter(t => selected.has(t.id))

  const directMonthly = selectedTools.reduce((s, t) => s + t.monthly * users, 0)
  const directAnnual = directMonthly * 12
  const hiddenTimeCost = selectedTools.reduce((s, t) => s + (t.timeCost / 60) * users * 35 / 12, 0)
  const dataValue = selectedTools.reduce((s, t) => s + t.dataValue * users / 12, 0)
  const switchCostTotal = selectedTools.reduce((s, t) => s + t.switchCost, 0)
  const avgLock = selectedTools.length
    ? Math.round(selectedTools.reduce((s, t) => s + t.lock, 0) / selectedTools.length)
    : 0
  const totalMonthly = directMonthly + hiddenTimeCost + dataValue

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`

  return (
    <main className="min-h-screen bg-[#faf8f4] font-sans">
      {/* Header */}
      <div className="border-b border-[#e8e0d0] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#8B6914] font-dm font-semibold text-sm no-underline hover:text-[#6B4F10] transition-colors">
            🔥 Kamunity
          </Link>
          <span className="font-dm text-xs text-[#999] uppercase tracking-widest">Sovereignty Calculator</span>
          <Link href="https://kamunity-audit.netlify.app" target="_blank" className="font-dm text-xs font-semibold text-[#8B6914] no-underline border border-[#8B6914]/30 px-3 py-1 rounded-full hover:bg-[#8B6914]/10 transition-colors">
            Full Audit ↗
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-dm text-xs bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full mb-6 uppercase tracking-wider font-semibold">
            💰 True Cost Calculator
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
            What are your &ldquo;free&rdquo; tools<br />
            <span className="text-[#8B6914]">actually costing you?</span>
          </h1>
          <p className="font-dm text-base text-[#666] max-w-xl mx-auto leading-relaxed">
            Select the tools your organisation uses. We&apos;ll show you the direct cost, hidden time cost, data extraction value, and what it would cost to leave — the number that changes conversations.
          </p>
        </div>

        {/* Users selector */}
        <div className="bg-white border border-[#e8e0d0] rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-dm text-sm font-semibold text-[#1a1a1a]">Team size (staff + regular volunteers)</span>
            <span className="font-dm text-sm font-bold text-[#8B6914]">{users} people</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {USERS.map(u => (
              <button
                key={u}
                onClick={() => { setUsers(u); setShowResult(false) }}
                className={`font-dm text-sm px-4 py-2 rounded-full border transition-all ${
                  users === u
                    ? 'bg-[#8B6914] text-white border-[#8B6914]'
                    : 'border-[#e8e0d0] text-[#666] hover:border-[#8B6914]/50 hover:text-[#8B6914]'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Tool grid */}
        <div className="mb-6">
          <p className="font-dm text-sm text-[#999] mb-3 uppercase tracking-wider font-semibold">Select your tools</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TOOLS.map(tool => {
              const isSelected = selected.has(tool.id)
              const { label: lockLbl, color: lockColor } = lockLabel(tool.lock)
              return (
                <button
                  key={tool.id}
                  onClick={() => toggle(tool.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#8B6914] bg-amber-50 shadow-sm'
                      : 'border-[#e8e0d0] bg-white hover:border-[#8B6914]/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xl">{tool.icon}</span>
                    {isSelected && <span className="text-[#8B6914] text-xs">✓</span>}
                  </div>
                  <div className="font-dm text-sm font-semibold text-[#1a1a1a] leading-snug">{tool.name}</div>
                  <div className={`font-dm text-[0.65rem] mt-1 ${lockColor} font-medium`}>{lockLbl}</div>
                  <div className="font-dm text-[0.65rem] text-[#999] mt-0.5">{tool.cat}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Calculate button */}
        {selected.size > 0 && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowResult(true)}
              className="font-dm font-bold text-sm bg-[#8B6914] text-white px-8 py-3 rounded-full hover:bg-[#6B4F10] transition-colors shadow-md"
            >
              Calculate my real costs →
            </button>
          </div>
        )}

        {selected.size === 0 && (
          <div className="text-center text-[#bbb] font-dm text-sm py-4">Select at least one tool to see your costs</div>
        )}

        {/* Results */}
        {showResult && selectedTools.length > 0 && (
          <div className="animate-fade-in">
            {/* Holy shit number */}
            <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 mb-6 text-center">
              <div className="font-dm text-xs uppercase tracking-widest text-amber-400 mb-2">True monthly cost to your organisation</div>
              <div className="font-sans text-5xl font-bold text-amber-400 mb-1">{fmt(totalMonthly)}</div>
              <div className="font-dm text-sm text-white/60">per month · {fmt(totalMonthly * 12)} per year</div>
              {totalMonthly > directMonthly * 1.5 && (
                <div className="mt-4 font-dm text-sm text-amber-300">
                  That&apos;s {Math.round((totalMonthly / Math.max(directMonthly, 1) - 1) * 100)}% more than what you think you&apos;re paying
                </div>
              )}
            </div>

            {/* Breakdown */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-[#e8e0d0] rounded-xl p-5">
                <div className="font-dm text-xs text-[#999] uppercase tracking-wider mb-1">Direct cost</div>
                <div className="font-sans text-2xl font-bold text-[#1a1a1a]">{fmt(directMonthly)}<span className="text-sm font-normal text-[#999]">/mo</span></div>
                <div className="font-dm text-xs text-[#999] mt-1">{fmt(directAnnual)} per year · {fmt(directMonthly / users)} per person</div>
              </div>
              <div className="bg-white border border-[#e8e0d0] rounded-xl p-5">
                <div className="font-dm text-xs text-[#999] uppercase tracking-wider mb-1">Hidden time cost</div>
                <div className="font-sans text-2xl font-bold text-orange-600">{fmt(hiddenTimeCost)}<span className="text-sm font-normal text-[#999]">/mo</span></div>
                <div className="font-dm text-xs text-[#999] mt-1">Staff time spent on tool overhead, at $35/hr avg</div>
              </div>
              <div className="bg-white border border-[#e8e0d0] rounded-xl p-5">
                <div className="font-dm text-xs text-[#999] uppercase tracking-wider mb-1">Data extraction value</div>
                <div className="font-sans text-2xl font-bold text-red-600">{fmt(dataValue)}<span className="text-sm font-normal text-[#999]">/mo</span></div>
                <div className="font-dm text-xs text-[#999] mt-1">Estimated value of your data to these vendors</div>
              </div>
              <div className="bg-white border border-[#e8e0d0] rounded-xl p-5">
                <div className="font-dm text-xs text-[#999] uppercase tracking-wider mb-1">Cost to leave (all tools)</div>
                <div className="font-sans text-2xl font-bold text-purple-600">{fmt(switchCostTotal)}</div>
                <div className="font-dm text-xs text-[#999] mt-1">Migration, training, and transition costs combined</div>
              </div>
            </div>

            {/* Lock-in score */}
            <div className="bg-white border border-[#e8e0d0] rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-dm text-sm font-semibold text-[#1a1a1a]">Average lock-in score</span>
                <span className={`font-dm text-sm font-bold ${lockLabel(avgLock).color} ${lockLabel(avgLock).bg} px-2 py-0.5 rounded-full`}>
                  {lockLabel(avgLock).label} ({avgLock}/100)
                </span>
              </div>
              <div className="h-3 bg-[#f0ece0] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    avgLock >= 85 ? 'bg-red-500' : avgLock >= 70 ? 'bg-orange-500' : avgLock >= 50 ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${avgLock}%` }}
                />
              </div>
              <div className="flex justify-between font-dm text-[0.6rem] text-[#bbb] mt-1">
                <span>Sovereign</span>
                <span>Locked in</span>
              </div>
            </div>

            {/* Per-tool breakdown */}
            <div className="bg-white border border-[#e8e0d0] rounded-xl p-5 mb-6">
              <div className="font-dm text-sm font-semibold text-[#1a1a1a] mb-4">Your tools, ranked by lock-in</div>
              <div className="space-y-3">
                {[...selectedTools].sort((a, b) => b.lock - a.lock).map(tool => {
                  const { label: lbl, color: lc, bg } = lockLabel(tool.lock)
                  return (
                    <div key={tool.id} className="flex items-center gap-3">
                      <span className="text-lg w-8 flex-shrink-0">{tool.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-dm text-sm text-[#1a1a1a]">{tool.name}</span>
                          <span className={`font-dm text-[0.65rem] font-semibold ${lc} ${bg} px-1.5 py-0.5 rounded`}>{lbl}</span>
                        </div>
                        <div className="h-1.5 bg-[#f0ece0] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${tool.lock >= 85 ? 'bg-red-400' : tool.lock >= 70 ? 'bg-orange-400' : tool.lock >= 50 ? 'bg-amber-400' : 'bg-green-400'}`}
                            style={{ width: `${tool.lock}%` }}
                          />
                        </div>
                      </div>
                      <span className="font-dm text-xs text-[#999] w-14 text-right flex-shrink-0">{fmt(tool.monthly * users)}/mo</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 text-center">
              <div className="font-dm text-sm font-bold text-[#8B6914] mb-2">Want the full picture?</div>
              <p className="font-dm text-sm text-[#666] mb-4 max-w-md mx-auto">
                The free Digital Sovereignty Audit assesses your full vendor risk — not just cost, but data exposure, governance gaps, and a practical path to better options.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://kamunity-audit.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm text-sm font-bold bg-[#8B6914] text-white px-6 py-2.5 rounded-full no-underline hover:bg-[#6B4F10] transition-colors"
                >
                  Take the full audit ↗
                </a>
                <a
                  href="mailto:mike@kamunityconsulting.com?subject=Sovereignty%20Calculator%20results"
                  className="font-dm text-sm font-semibold border border-[#8B6914]/30 text-[#8B6914] px-6 py-2.5 rounded-full no-underline hover:bg-amber-50 transition-colors"
                >
                  Talk to Mike about this
                </a>
              </div>
            </div>

            {/* Methodology */}
            <details className="mt-6 bg-white border border-[#e8e0d0] rounded-xl p-5">
              <summary className="font-dm text-xs text-[#999] cursor-pointer uppercase tracking-wider font-semibold">About these numbers</summary>
              <div className="font-dm text-xs text-[#999] leading-relaxed mt-3 space-y-2">
                <p><strong>Direct cost:</strong> Published pricing for standard plans, multiplied by team size.</p>
                <p><strong>Hidden time cost:</strong> Industry estimates for tool overhead (onboarding, admin, troubleshooting), at $35/hr average community sector rate.</p>
                <p><strong>Data extraction value:</strong> Estimated monthly value of behavioural, content, and metadata your organisation generates for each vendor. Based on published ad-tech and data broker market rates.</p>
                <p><strong>Lock-in score:</strong> Composite of: data portability, API openness, migration difficulty, feature dependency, and network effects. 0 = fully portable, 100 = impossible to leave.</p>
                <p><strong>Switching cost:</strong> Estimated one-time cost to migrate away — data export, staff retraining, new tool setup, productivity loss during transition.</p>
                <p>These are estimates for illustration. Your actual costs will vary. Use them to start the conversation, not to invoice someone.</p>
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#e8e0d0] mt-12 py-6">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-dm text-xs text-[#999] no-underline hover:text-[#8B6914] transition-colors">← Back to Kamunity</Link>
          <span className="font-dm text-xs text-[#bbb]">Free forever · No data collected · Built on Whadjuk Noongar boodja</span>
        </div>
      </div>
    </main>
  )
}
