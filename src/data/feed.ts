export interface FeedItem {
  slug: string
  type: 'blog' | 'podcast' | 'toolkit' | 'org-improvement'
  title: string
  description: string
  date: string
  roomUrl: string
}

export const feedItems: FeedItem[] = [
  {
    slug: 'why-no-more-saas',
    type: 'blog',
    title: "Why Your Nonprofit Doesn't Need Another Subscription",
    description: 'The hidden costs of "free" tools — and what community-owned alternatives actually look like.',
    date: '12 Feb 2026',
    roomUrl: 'https://kamunity.ai',
  },
  {
    slug: 'sovereignty-question',
    type: 'podcast',
    title: 'Ep 1: The Sovereignty Question',
    description: 'What does it actually mean for a community to own its digital tools? A chat with Perth community organisers.',
    date: '10 Feb 2026',
    roomUrl: 'https://kamunity.ai',
  },
  {
    slug: 'digital-readiness',
    type: 'org-improvement',
    title: 'Digital Readiness Self-Assessment',
    description: 'Quick quiz, tailored action pack, and toolkit. Find out where your org is and get practical next steps.',
    date: '8 Feb 2026',
    roomUrl: 'https://kamunity.ai',
  },
  {
    slug: 'vine-coding-playbook',
    type: 'toolkit',
    title: 'The Vine Coding Playbook',
    description: 'Build real tools with AI, step by step. Templates, examples, and a phase-by-phase walkthrough.',
    date: '6 Feb 2026',
    roomUrl: 'https://kamunity.ai',
  },
]
