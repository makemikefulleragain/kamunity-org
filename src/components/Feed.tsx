import FadeIn from './FadeIn'
import FeedCard from './FeedCard'
import RoomCallout from './RoomCallout'
import { feedItems } from '../data/feed'

export default function Feed() {
  return (
    <FadeIn id="feed">
      <div className="font-sans text-[0.55rem] uppercase tracking-[3px] text-ku mb-2.5 font-semibold">
        From the Campfire
      </div>
      <h2 className="font-sans text-[1.6rem] font-bold text-ink mb-3 leading-tight tracking-tight">
        Stories, guides, and tools for community builders.
      </h2>
      <p className="text-ink-light text-[0.88rem] max-w-[640px] mb-6">
        Everything connects to a Kamunity room where the real conversation happens. React here, discuss there.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {feedItems.map((item) => (
          <FeedCard key={item.slug} item={item} />
        ))}
      </div>

      <RoomCallout
        emoji="💬"
        title="All conversations happen in Kamunity rooms"
        description="Every piece of content links to a room where the community discusses it. No comments section — real conversation."
        url="https://kamunity.ai"
      />
    </FadeIn>
  )
}
