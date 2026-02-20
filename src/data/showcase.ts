export interface ShowcaseItem {
  slug: string
  title: string
  description: string
  url: string
  thumbGradient: string
  thumbEmoji: string
  badge: 'Live Tool' | 'Method' | 'Coming Soon'
  tags: string[]
}

export const showcaseItems: ShowcaseItem[] = [
  {
    slug: 'kamunity-ai',
    title: 'Kamunity.Ai',
    description: 'Find, create, and join public and private rooms for your community. Discover conversations, share resources, and build together — no ads, no data harvesting.',
    url: 'https://kamunity.ai',
    thumbGradient: 'from-indigo-200 to-purple-200',
    thumbEmoji: '🔥',
    badge: 'Live Tool',
    tags: ['Community', 'Rooms', 'Discussion'],
  },
  {
    slug: 'grants-hub',
    title: 'Grant Acquittal Helper',
    description: 'Free grant reporting tool for Australian nonprofits. Step-by-step acquittal process. Works offline, your data stays local.',
    url: 'https://grants-hub.netlify.app',
    thumbGradient: 'from-green-100 to-green-200',
    thumbEmoji: '📋',
    badge: 'Live Tool',
    tags: ['Nonprofits', 'Grants', 'Australia'],
  },
  {
    slug: 'nonnas-knitting-circle',
    title: "Nonna's Knitting Circle",
    description: 'Community board for knitting groups. Share patterns, find groups, save resources. Built using Outcome Vine Coding.',
    url: 'https://nonnas-knitting-circle.netlify.app',
    thumbGradient: 'from-pink-100 to-pink-200',
    thumbEmoji: '🧶',
    badge: 'Live Tool',
    tags: ['Community', 'Craft', 'Vine Coded'],
  },
  {
    slug: 'outcome-vine-coding',
    title: 'Outcome Vine Coding',
    description: 'A new way to build with AI. Describe your idea, get a plan, build it step by step. No coding experience needed.',
    url: 'https://vine-o-coding.netlify.app',
    thumbGradient: 'from-indigo-100 to-indigo-200',
    thumbEmoji: '🌿',
    badge: 'Method',
    tags: ['Method', 'AI Building', 'Open'],
  },
  {
    slug: 'sovereignty-calculator',
    title: 'Sovereignty Calculator',
    description: 'See the true cost of "free" tools. Select the platforms your org uses — get the real direct cost, lock-in score, and data extraction value. The "holy shit" moment for digital sovereignty.',
    url: 'https://kamunity-audit.netlify.app',
    thumbGradient: 'from-amber-100 to-orange-200',
    thumbEmoji: '💰',
    badge: 'Live Tool',
    tags: ['Sovereignty', 'Tools', 'Data'],
  },
  {
    slug: 'copilot-check',
    title: 'Copilot Check',
    description: '5 questions. Is Microsoft Copilot putting your organisation\'s data at risk? Get a risk rating, findings, and recommended actions in under 5 minutes.',
    url: 'https://kamunity-audit.netlify.app',
    thumbGradient: 'from-blue-100 to-indigo-200',
    thumbEmoji: '🛡️',
    badge: 'Live Tool',
    tags: ['Sovereignty', 'Microsoft', 'AI Risk'],
  },
]
