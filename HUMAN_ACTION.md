# HUMAN ACTION — Kamunity Org (kamunity.org)
## Actions Required from Mike

*Last updated: Mar 2, 2026*

---

## Critical (DNS Cutover — when ready)

### 1. DNS: point kamunity.org → Ring Two
**What:** Update DNS to point kamunity.org to `kamunity-ring-two.netlify.app`.
**Where:** Your DNS provider (Cloudflare or equivalent).
**After:** Set `ANTHROPIC_API_KEY` on the Ring Two Netlify site so Kai works.
**Runbook:** See `PROJECTS/ring-two-mvp/HUMAN_ACTION.md` for full step-by-step.

### 2. Detach old kamunity-org Netlify site from domain
**What:** After DNS cutover, remove kamunity.org custom domain from the old Netlify project.
**Why:** Prevents certificate conflicts and confusion.

---

## No Other Human Actions
This project is feature-complete and in retirement mode. All future kamunity.org work happens in `PROJECTS/ring-two-mvp/`.
