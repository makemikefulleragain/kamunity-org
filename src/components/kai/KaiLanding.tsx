'use client'

import AmbientZone from './AmbientZone'
import EncounterZone from './EncounterZone'

export default function KaiLanding() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AmbientZone />

      {/* Acknowledgment of Country — subtle, always present */}
      <div className="relative z-10 text-center pt-16 pb-5 px-4">
        <p className="font-dm text-[0.55rem] text-ink-faint/50 tracking-wide">
          Built on Whadjuk Noongar boodja. Sovereignty was never ceded.
        </p>
      </div>

      {/* Encounter Zone — centre of the experience */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pb-4">
        <EncounterZone />
      </main>
    </div>
  )
}
