---
name: performance-security-audit
description: Audit practical frontend performance and web/API security risks without overengineering the assessment.
---

# Performance And Security Audit

## Performance

Inspect bundle composition, route loading, image dimensions and formats, lazy loading, request waterfalls, TanStack Query caching, rerender triggers, layout shift, and behavior on slow networks. Measure before recommending memoization or code splitting.

## Security

Trace all user input across URL parameters, forms, Zod schemas, API handlers, and rendered output. Check injection exposure, unsafe HTML, validation gaps, sensitive logging, error leakage, CORS assumptions, abuse controls, booking tampering, and dependency risk. Treat client validation as UX only; server validation is required.

Classify findings by exploitability and user/business impact. Clearly label assessment-appropriate deferrals such as authentication, persistent inventory locking, rate limiting, and payment-provider integration rather than presenting every production concern as a blocker.
