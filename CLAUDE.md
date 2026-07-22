# The Becoming Project — Product Blueprint

## Essence
The Becoming Project is an adaptive life operating system that reads a person's behavior across connected life domains and acts as a steward of their long-term direction. It protects direction, not a fixed destination. It exists because most tools in this space optimize for engagement or task completion, not for distinguishing when someone is genuinely losing their own motivation versus when their life circumstances have actually changed, and responding differently to each.

## Core Philosophy
- Direction over destination: becoming is protected motion, never a fixed target self.
- Fidelity over engagement: every decision serves the user's own evolving intent, never platform engagement or retention.
- Context before judgment: nothing is flagged as a failure before determining whether it's internal drift or external volatility.

## Non-Negotiables

Product:
- Cross-domain by design. Work, health, and habits are read as connected, never scored in isolation.
- No feature ships without tracing back to the core philosophy.

AI:
- Never uses guilt, urgency, or streak-loss mechanics.
- Self-report always overrides inference.
- Initiates rather than waits, at a frequency that respects Adaptive Presence (see below).

UX:
- Push-primary. The user never has to go looking for the app's read on their life.
- Consistency weeks are quiet. Disruption weeks are the only time the system takes up more space.

Ethical:
- No behavioral data monetized for anything beyond the user's own growth.
- Never quietly lowers the user's own bar to make progress look better.

## Adaptive Presence
System involvement scales with the user's momentum, not a fixed personality:
- Consistency: nearly invisible. One composed observation, occasionally one Proactive Inspiration idea. Never a dashboard to interpret.
- Internal drift (motivation stalls, distraction, no external cause): one sharp, specific observation reconnecting the user to their own stated intent. Not a plan overhaul.
- External volatility (real circumstances changed — moved, family disruption, routine collapsed): system reorganizes the plan and explicitly, unapologetically lowers the bar for what counts as "on track," stated plainly, never as failure.

## Intelligence Model
- Reads signal across domains as one connected picture, never siloed scores.
- Starts neutral: no assumed foundational domain.
- Once sufficient history exists, learns which domain empirically drags the others down for this specific person, and weights accordingly.
- Baseline recalibrates automatically, but only after sustained signal over a real time window (never a short dip), and the shift is always named explicitly to the user, never silent.
- Self-report always outranks inference at every step.

## Product Layers
1. Data Layer: raw log of habits/actions, their domain (work/health/habits), and whether they happened, when.
2. Interpretation Layer: the Intelligence Model. Determines state (consistency/drift/disruption), tracks the learned foundational domain, manages recalibration.
3. Voice Layer: turns Interpretation output into an actual message, in the brand voice (below), respecting Adaptive Presence.
4. Inspiration Layer: powers Proactive Inspiration — external ideas filtered by relevance to the user's own goals first, popularity second. Reads Data Layer for context but does not feed into state detection.
5. Delivery Layer: the push mechanism. Decides when a message reaches the user. Push-primary by default.

Keep these layers separate. Interpretation can get smarter without touching Voice. Voice can be refined without touching logic. Inspiration must never bleed into state detection.

## Ecosystem
Near-term core (build first): Google Calendar (signals external volatility directly — a suddenly packed or empty calendar) and Apple Health (signals drift early via sleep/activity, requires a custom Expo development build, not Expo Go, due to HealthKit access).
Near-term, after core: richer onboarding that captures the user's actual routine and interests; Spotify as a lightweight mood signal.
Long-term only (do not build yet): personal finance, friend/social coordination, beauty/wellness trend content. These are real and intentional future layers, not omissions, but depend on a proven core first.

## Brand & Voice
Name: The Becoming Project.
Feeling on open: sharp and composed — "it girl calm." Put together, not performing effort. Never earnest or motivational-poster in tone.
Voice: says less rather than more, states rather than cheers, unbothered by lapses, confident proposals over tentative suggestions, restraint over exclamation.

## Visual Design Language
- Flat, confident color-blocked cards over gradients or soft shadows. Reference: bold flat-color card UI (budgeting-app style), not soft/pastel/illustrated styles.
- Sans-serif type carrying most weight.
- Palette: punchy but grounded, not neon, not pastel. Reference tones: a yellow-green (wasabi), a pale cool blue, a deep burgundy (cassis), a muted sage green, a warm orange-red (orange topaze).
- Likely one dominant color per state (consistency/drift/disruption) rather than one uniform palette, so color itself communicates state.
- Minimal iconography, restraint over illustration.
- Interaction unit is a card to glance at, not a screen to scroll. Tapping in for detail is optional, never required to get the point.

## Experience Vision
Users should consistently feel in control without effort — composed, not soothed or hyped. Nothing in the product should feel like it's trying to convince the user of anything.

## Long-Term Vision
In 5-10 years, this is the layer a person checks before anything else, because it has already synthesized what matters across work, health, money, relationships, and growth into one trustworthy read. Differentiation from every other "life OS" or habit tracker: those require the user to organize themselves; this does the noticing and organizing, and only asks the user for what only the user can know — whether something still matters to them.

## Current Build Status
- Foundation is built and working: habit data model (name, domain, per-day log), seed data across all three domains, a functional logging UI (tap-to-toggle checkboxes), and the drift/consistency interpretation logic described under Intelligence Model. State is pooled across domains, not siloed, and defaults to consistency when there isn't yet enough history to judge.
- The single home screen reflects this real computed state (consistency / internal drift, plus a manual disruption flag) instead of placeholder text. Storage is local to the device only.
- Not yet built: the learned foundational-domain weighting and baseline recalibration described under Intelligence Model (currently starts neutral and stays neutral — no per-user learning yet), dedicated disruption/drift screens, Calendar/Health integration, Proactive Inspiration, push delivery, and the finalized visual design language (current UI is functional, not styled to the brand direction above).
