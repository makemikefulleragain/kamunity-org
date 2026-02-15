import FadeIn from './FadeIn'
import ShowcaseCard from './ShowcaseCard'
import RoomCallout from './RoomCallout'
import { showcaseItems } from '@/data/showcase'

export default function Showcase() {
  return (
    <FadeIn id="showcase">
      <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
        Showcase
      </div>
      <h2 className="font-sans text-[1.6rem] font-bold text-ink mb-3 leading-tight tracking-tight">
        Real tools, built for real communities.
      </h2>
      <p className="text-ink-light text-[0.88rem] max-w-[640px] mb-6">
        Every tool below is live, free, and community-owned. Built using methods anyone can learn — no coding experience needed.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {showcaseItems.map((item) => (
          <ShowcaseCard key={item.slug} item={item} />
        ))}
      </div>

      <RoomCallout
        emoji="🏕️"
        title="Want something built for your community?"
        description="Tell us what you need. No sales pitch — just a conversation."
        url="https://kamunity.ai"
      />
    </FadeIn>
  )
}
