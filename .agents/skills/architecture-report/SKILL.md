---
name: architecture-report
description: Produce an evidence-based frontend and API architecture assessment for Wayfare.
---

# Architecture Report

Map the system before judging it:

- Route composition and error boundaries.
- Page, feature, shared-domain, API-client, and server ownership.
- URL state, local form state, TanStack Query server state, and derived state.
- Runtime validation and shared client/server contracts.
- Booking consistency, pricing authority, availability assumptions, and mutation invalidation.
- Styling boundaries, responsive primitives, test seams, and deployment topology.

Evaluate cohesion, coupling, dependency direction, duplicated business rules, failure isolation, evolvability, and whether complexity fits a four-hour assessment. Avoid recommending production-scale infrastructure without a demonstrated need.

Output:

1. Current architecture and data flow.
2. Decisions that are working well, with evidence.
3. Risks ordered by impact and likelihood.
4. Recommended next steps split into **before submission**, **next iteration**, and **production scale**.
5. A short decision log for major tradeoffs.
