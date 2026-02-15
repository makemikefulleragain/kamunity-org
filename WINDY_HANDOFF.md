# WINDY HANDOFF: kamunity.org Rebuild

**Date:** 2026-02-15
**From:** Opus
**Priority:** HIGH — This is the next build

---

## INFRASTRUCTURE SETUP (Mike does this first)

### 1. Create new GitHub repo
- **Name:** `kamunity-org` (under `makemikefulleragain`)
- Empty repo, no template, public
- The old `kamunity-10july` repo stays untouched (that's the kamunity.ai app)

### 2. Update Netlify
- Go to Netlify project `kamunityai` (the one serving kamunity.org)
- **Settings → Build & deploy → Link to a different repository**
- Point it at the new `kamunity-org` repo, `main` branch
- Build command: `npm run build`
- Publish directory: `.next`
- The domain (kamunity.org) stays bound to the same Netlify project

### 3. Local setup
- Clone the new repo into the kamunity-org-rebuild folder (or wherever suits)
- The DESIGN_MOCKUP.html and this WINDY_HANDOFF.md are already in `NeoKamunity/kamunity-org-rebuild/`

**Once Mike confirms these three steps are done, Windy can start building.**

---

## MISSION

Rebuild kamunity.org as the **Kamunity hub site** — a living content ecosystem that showcases community tools, hosts blog/podcast/toolkit content, and routes all conversation back to Kamunity rooms.

**Not** a platform. **Not** an app. A beautiful, fast, content-driven site that passes the "9th grader test" — a 14-year-old should understand what Kamunity is in 5 seconds.

---

## FRESH NEXT.JS PROJECT

```bash
npx create-next-app@14 kamunity-org --typescript --tailwind --eslint --app --src-dir --no-import-alias
cd kamunity-org
npm install clsx tailwind-merge
```

No other dependencies needed for Phase 1. No Supabase. No database. No auth. Pure static content site.

---

## THE DESIGN

**Reference mockup:** `DESIGN_MOCKUP.html` (in this same directory — open it in a browser)
Mike approved it. Direct quote: "lets do this dudster"

### Visual Language
- **Background:** Warm parchment `#f5f0e8` — NOT dark
- **Hero:** Bright gradient (cream → soft indigo), NOT dark campfire  
- **Typography:** System sans-serif for headings/UI, Georgia for body prose
- **Accent colors:** Kamunity indigo `#6366f1`, fire amber `#d4a574`, forest `#3d6b2e`
- **Cards:** White `#fff` with subtle borders and hover lift
- **Overall feel:** Warm, professional, approachable. Bright and immediate.

### Tailwind Theme Extension (tailwind.config.ts)
```js
theme: {
  extend: {
    colors: {
      parchment: { DEFAULT: '#f5f0e8', dark: '#e8dfd0', edge: '#d4c9b5' },
      ink: { DEFAULT: '#2c1810', light: '#5a4a3a', faint: '#8a7a6a' },
      fire: { amber: '#d4a574', orange: '#c47d3f', red: '#8b3a3a' },
      ku: { DEFAULT: '#6366f1', light: '#818cf8', bg: '#eef0ff' },
      forest: '#3d6b2e',
    },
    fontFamily: {
      serif: ['Georgia', 'Times New Roman', 'serif'],
      sans: ['system-ui', '-apple-system', 'sans-serif'],
    },
  },
},
```

---

## SITE MAP — Phase 1 (single-page hub)

```
/                    → Home (all sections as one scrolling page)
/llms.txt            → Static text file (public/)
/llms-full.txt       → Static text file (public/)  
/manifest.json       → Machine-readable capabilities (public/)
/sitemap.xml         → Standard sitemap (public/)
/robots.txt          → References sitemap (public/)
```

---

## HOME PAGE SECTIONS (in scroll order)

### 1. Hero
- Badge: "🟢 Free & open source"
- H1: "Free digital tools your community **actually owns**"
- Sub: "Stop renting from big tech. Kamunity gives your community its own space, custom tools, and real data control — with no coding, no contracts, and no catch."
- Two CTAs: "Get your community started →" (primary), "See what's been built" (secondary → #showcase)
- Proof strip: 3 live tools | 100% community owned | $0 to start | 0 data sold

### 2. The Problem
- Side-by-side: "What happens now" (red bg) vs "What could happen instead" (green bg)
- Direct language about Facebook/Google dependency, data harvesting, shrinking free plans

### 3. How It Works
- 4 cards: Own space + commons, Tools built for you, Connected not dependent, AI assistant Kai
- Flow: Describe → Plan → Build → Test → Yours

### 4. Values  
- 5 compact cards: Sovereignty, Accessibility, Joy, Sustainability, Agency
- One line about constitutional enforcement

### 5. Showcase
- Grid of showcase cards (3 initially)
- Each: colored gradient thumb, emoji, badge, title, description, tags, link, vibe reactions
- Room callout after grid

### 6. Stories (Feed)
- Grid of feed cards with type badges (Blog, Podcast, Toolkit, Org Improvement)
- Each: type, title, description, date, vibes, "💬 Discuss →" link
- Room callout after grid

### 7. About
- Perth context, 11% digital exclusion stat, community focus
- The Pack Music spotlight

### 8. CTA
- "Ready to give your community real tools?"
- mailto:hello@kamunity.org

### 9. Machine Layer (subtle)
- /llms.txt · /llms-full.txt · /manifest.json

---

## SHOWCASE DATA — hardcode in `src/data/showcase.ts`

```typescript
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
]
```

---

## FEED DATA — hardcode in `src/data/feed.ts`

```typescript
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
```

---

## VIBE REACTIONS

Emoji reactions on cards. Phase 1: local state only (useState, no persistence).
Available: 🔥 💡 🙋 🎧 📋 📦
No comments. All "💬 Discuss →" links go to Kamunity room URLs.

---

## COMPONENTS TO BUILD

```
src/
  app/
    layout.tsx          → Root layout, fonts, metadata, og tags
    page.tsx            → Home page composing all sections  
    globals.css         → Tailwind imports + parchment bg
  components/
    Nav.tsx             → Fixed nav, auto-hide on scroll
    Hero.tsx            → Bright hero with proof strip
    ProblemSolution.tsx → Red/green side-by-side
    HowItWorks.tsx      → Cards + flow diagram
    Values.tsx          → 5 compact value cards
    Showcase.tsx        → Section wrapper + grid
    ShowcaseCard.tsx    → Individual card (client component for vibes)
    Feed.tsx            → Section wrapper + grid  
    FeedCard.tsx        → Individual card (client component)
    RoomCallout.tsx     → Reusable room link block
    CTA.tsx             → Call to action
    MachineLayer.tsx    → llms.txt links
    Footer.tsx          → 🔥 branded footer
    FadeIn.tsx          → IntersectionObserver wrapper (client component)
    VibeButton.tsx      → Emoji toggle (client component)
  data/
    showcase.ts
    feed.ts
public/
  robots.txt
  manifest.json
  llms.txt              → placeholder (Opus drafting content)
  llms-full.txt         → placeholder
```

---

## STATIC FILES FOR public/

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://kamunity.org/sitemap.xml
```

### manifest.json
```json
{
  "name": "Kamunity",
  "description": "Community-owned digital infrastructure — free tools communities actually own",
  "url": "https://kamunity.org",
  "contact": "hello@kamunity.org"
}
```

### llms.txt (placeholder)
```
# Kamunity
> Community-owned digital infrastructure. Free tools communities actually own.
Content coming soon. See https://kamunity.org for full details.
```

---

## netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## CONSTITUTION COMPLIANCE
- No tracking/analytics — zero third-party scripts
- No cookies → no cookie banner needed
- WCAG 2.1 AA: keyboard nav, screen reader, contrast
- Target: 95+ Lighthouse performance
- No dark patterns

---

## GO SIGNAL

Mike approved. Fresh repo, fresh Netlify link, build Phase 1, deploy to kamunity.org.
