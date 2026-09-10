---
name: release-readiness
description: Run the final Wayfare assessment submission gate across product behavior, code quality, documentation, CI, and operability.
---

# Release Readiness

1. Confirm the primary journey works: browse, search, details, reviews, price/availability, checkout, and confirmation.
2. Exercise loading, empty, validation, not-found, API-error, retry, and narrow-layout states.
3. Apply the senior frontend, accessibility, architecture, test, performance, and security audit skills.
4. Run `npm run format:check`, `npm run lint`, `npm test`, `npm run build`, and `npm run audit:ux` when its server prerequisites are available.
5. Inspect README setup, scripts, architecture, tradeoffs, next steps, AI-use disclosure, CI configuration, and production build/deployment notes.

Return a concise go/no-go report:

- **Decision**: Ready, Ready with known risks, or Not ready.
- **Blocking findings**: only issues that should stop submission.
- **Non-blocking findings**: ordered by impact.
- **Checks**: exact command outcomes.
- **Submission gaps**: repository, README, AI note, deployment, and recording status.
- **Recommended final hour**: prioritized tasks that fit the remaining time.
