---
name: senior-frontend-pr-review
description: Review a Wayfare pull request as a senior frontend engineer, prioritizing defects, regressions, and missing tests.
---

# Senior Frontend PR Review

1. Inspect `git status`, the complete diff, and the surrounding code that owns changed behavior.
2. Trace each changed user flow through routing, query/mutation state, validation, API handling, and responsive UI.
3. Check correctness under loading, empty, error, stale-data, double-submit, navigation, and retry conditions.
4. Check TypeScript contracts, Zod boundaries, cache keys/invalidation, date handling with Luxon, and server-authoritative pricing.
5. Check accessibility, performance, security, and whether tests prove behavior rather than implementation details.
6. Run the smallest relevant checks. Never infer success from code inspection alone.

Report sections:

1. **Findings**: Blocker, High, Medium, then Low. Include `path:line`, evidence, impact, and remediation.
2. **Questions/assumptions**: only items that materially affect correctness.
3. **Verification**: commands run and their results.
4. **Residual risk**: untested or environment-dependent behavior.

Do not summarize the diff before findings. Do not report formatting preferences as defects unless they violate repository conventions or create maintenance risk.
