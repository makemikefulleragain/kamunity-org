# KAMUNITY ORG — PHASES
## kamunity.org (old) — Hub Site + Kai Wayfinder

*Inherits: BRAIN/CONSTITUTION.md in full. This document adds kamunity-org operational detail — done conditions, built items, open items. It never weakens the global constitution.*

*Note: kamunity.org is being superseded by Ring Two MVP (`PROJECTS/ring-two-mvp/`). This project remains live until DNS cutover. After cutover, this project retires and Ring Two becomes kamunity.org.*

*See `PLAN/PHASE_QUEUE.md` for Ring Two scheduling. See `PROJECTS/ring-two-mvp/PHASES.md` for the replacement build.*

---

## Phase Map

| # | Name | Status |
|---|---|---|
| 1 | Hub site (content, Kai, tools showcase) | ✅ Complete — Feb 2026 |
| 2 | Ecosystem expansion (consulting, calculator, Copilot Check) | ✅ Complete — Feb 2026 |
| 3 | DNS cutover to Ring Two | 🔨 In progress — human-gated |

---

## Phase 1: HUB SITE
**Status:** ✅ Complete — Feb 2026
**What:** kamunity.org rebuilt as Next.js 14 hub site. Kai wayfinder live. Tools showcase. Cross-linked ecosystem.

### Built
- Next.js 14 + TypeScript + Tailwind — deployed via GitHub → Netlify CI/CD
- Kai wayfinder — conversation mode, card surfacing, crisis protocol
- Sovereignty Calculator (11 tools, interactive)
- Copilot Risk Check (5 questions, risk levels)
- Constitution page + amendment form
- 7 showcase items
- `ecosystem-state.json` v0.4.0 — 12-site full site registry
- `llms.txt` + `llms-full.txt` — Constitution Principle 11
- Kai system prompt: knows kamunityconsulting.com, surfaces consulting card on consulting queries

### Stack
- GitHub: https://github.com/makemikefulleragain/kamunity-org
- Netlify: deploys to kamunity.org via GitHub CI/CD
- **Key:** Use PROJECTS/kamunity-org/ local clone — NOT C:\Users\mikef\kamunity-org (may be stale)

### Done Condition (Gate — ✅ complete)
- [x] Kai live on kamunity.org
- [x] Sovereignty Calculator live
- [x] Copilot Check live
- [x] Ecosystem cross-links working
- [x] llms.txt present
- [x] kamunity-consulting added to showcase + Kai knowledge (Feb 21)

---

## Phase 2: ECOSYSTEM EXPANSION
**Status:** ✅ Complete — Feb 2026
**What:** Add kamunity-consulting to Kai's knowledge, showcase, and ecosystem state.

### Built
- `src/data/showcase.ts` — kamunity-consulting card added
- `src/data/kai-cards.ts` — consulting card added
- `public/data/ecosystem-state.json` — v0.4.0, consulting added
- `public/llms-full.txt` — updated with consulting
- Kai API route — surfaces 'kamunity-consulting' card on consulting queries

### Done Condition (Gate — ✅ complete)
- [x] Kai surfaces consulting card when asked about paid help
- [x] Showcase includes consulting
- [x] Ecosystem state JSON current

---

## Phase 3: DNS CUTOVER TO RING TWO
**Status:** 🔨 In progress — all build work done, DNS is human-gated
**What:** kamunity.org switches to Ring Two MVP. This project retires.

### What Happens
1. Mike updates DNS: kamunity.org → `kamunity-ring-two.netlify.app`
2. ANTHROPIC_API_KEY set on Ring Two Netlify site
3. Old kamunity-org Netlify project detached from kamunity.org domain
4. Verify Ring Two handles all existing kamunity.org URLs (redirect rules in Ring Two `netlify.toml`)
5. This project archived (not deleted — source code preserved)

### Done Condition (Gate)
- [ ] DNS cutover complete — kamunity.org serves Ring Two
- [ ] No 404s on old URLs
- [ ] Kai works on new site
- [ ] This project marked RETIRED in PHASE_QUEUE.md

---

## R&R Log
*(No R&R triggers — stable since launch.)*
