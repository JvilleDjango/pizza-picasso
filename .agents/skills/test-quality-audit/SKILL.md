---
name: test-quality-audit
description: Evaluate test coverage, reliability, and maintainability for critical Wayfare behavior.
---

# Test Quality Audit

Build a risk matrix for browse/search, stay details, reviews, checkout, confirmation, pricing, schemas, API errors, and routing. Inspect existing tests before proposing more.

Prioritize tests that prove:

- Shared pricing and date-boundary behavior.
- Zod rejection of malformed API and form input.
- API status codes and server-authoritative totals.
- Query loading/error/empty states and mutation invalidation.
- Checkout double-submit prevention and confirmation routing.
- Accessible user interactions through role/name queries.

Flag brittle selectors, excessive mocks, implementation-detail assertions, nondeterministic time/data, missing cleanup, and tests that can pass without exercising the intended behavior. Recommend the smallest high-value additions, naming the test level and exact behavior each should prove.
