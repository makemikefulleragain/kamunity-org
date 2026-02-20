# KAMUNITY.ORG (KAI) ROADMAP
## User-Informed Development Queue
### Last Updated: Feb 20, 2026

## Current State
- Constitutional AI encounter interface — the front door of Kamunity
- Next.js 14 + TypeScript + Tailwind + Anthropic Claude API
- Deployed to kamunity.org via GitHub CI/CD (`kamunity-org` repo)
- @netlify/plugin-nextjs fix deployed Feb 19 — 200 confirmed ✅
- KP-01 safety sprint complete: crisis protocol, prompt injection, disclaimers ✅
- Kai Wayfinder (public) reads system prompt — not full BRAIN/ markdown files
- Known issues: doesn't run quiz/Vine-o-Code inline yet (t26, t27)

## User Feedback Log
| Date | Source | Feedback | Status |
|------|--------|----------|--------|
| (entries from actual user encounters) | | | |

## Improvement Queue

### Now (This Sprint)
- [ ] Deploy ecosystem-state-full.json — Kai knows all 13 live sites fully (t12)
- [ ] Kai runs AI Readiness quiz inline — cards + results interpreted (t26)
- [ ] Kai runs Vine-o-Code 6 questions conversationally — outputs foundation doc (t27)
- [ ] Kai describes all ecosystem sites with context (t28)
- [ ] Constitution page at /constitution — Founder's Draft + amendment mechanism (t29)
- [ ] Cross-link all ecosystem sites from kamunity.org (t15)
- [ ] Add llms.txt (t15)

### Next (Next Sprint)
- [ ] Sovereignty Calculator embedded as encounter card (Opus Move 2 — highest priority)
- [ ] Perth Directory integration — Kai surfaces local services (Phase 2)
- [ ] ElevenLabs voice responses for accessibility (Opus Move 7)

### Later
- [ ] MCP integration when available — Kai reads live ecosystem data (Opus leapfrog)
- [ ] ElevenLabs Conversational AI when released — voice-first encounter (Opus leapfrog)
- [ ] Local Kai instances — federated neighbourhood/org-specific deployments (Phase 4)

## Research Needed
- What are the most common questions community workers ask Kai? (needs usage data)
- Should Kai have memory across sessions? (data sovereignty tension with usefulness)
- Sovereign model evaluation — Llama/Mistral viability (Phase 5, t39)

## Change Log
| Date | Change | By | Method |
|------|--------|-----|--------|
| Feb 19, 2026 | @netlify/plugin-nextjs fix — 404 → 200 | Cascade | GitHub CI/CD |
| Feb 19, 2026 | G1 crisis protocol hardcoded — all 7 WA crisis lines | Cascade | GitHub CI/CD |
| Feb 19, 2026 | G4 honest disclaimer added | Cascade | GitHub CI/CD |
| Feb 19, 2026 | G3 prompt injection tested — constitution held | Mike | Manual test |
