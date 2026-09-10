---
name: accessibility-audit
description: Audit Wayfare against practical WCAG 2.2 AA expectations across keyboard, semantics, forms, status states, and responsive layouts.
---

# Accessibility Audit

Audit complete user journeys, not isolated markup:

- Keyboard-only navigation, logical focus order, visible focus, skip behavior, and focus after navigation or mutation.
- One descriptive `h1`, logical heading hierarchy, landmarks, link purpose, and native semantics before ARIA.
- Programmatic labels, instructions, required state, inline errors, error summaries, and focus management after invalid submission.
- Appropriate `aria-live`, `role=status`, or `role=alert` behavior for loading, errors, review submission, and booking confirmation without duplicate announcements.
- Image alternatives, icon button names, date input context, price meaning, and review rating meaning.
- Text and non-text contrast, zoom/reflow at 200% and 400%, narrow viewport overflow, 44px target guidance, and reduced-motion support when motion exists.

Use `npm run audit:ux` as supporting evidence, then manually inspect issues automation cannot prove. Report WCAG criterion when known, affected users, reproduction steps, and a concrete fix. Separate confirmed failures from manual checks still required.
