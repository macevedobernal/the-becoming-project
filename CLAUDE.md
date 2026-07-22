# The Becoming Project — Product Philosophy

This file is the persistent memory of *why* this app exists and *how* it should behave.
Read it before writing or reviewing any code. When a feature decision is ambiguous,
resolve it by asking "does this match the philosophy below?" rather than by default
mobile-app-design instincts (streaks, notifications, gamification, etc.), which are
explicitly rejected here.

## What this app is

The Becoming Project is an **adaptive life operating system**. It exists to help the
user become who they want to be, over years, not to help them complete tasks this week.

It is not:
- A coach (it does not cheerlead or push)
- A judge (it does not evaluate or score the user's worth or effort)
- A habit tracker (it is not built around streaks or completion counts)
- A productivity app (it is not optimizing for output or throughput)

It is a **steward of the user's long-term direction** — something that holds the
user's stated intentions in trust and helps them stay oriented toward those
intentions over time, especially across the periods when the user's own attention
drifts away from them.

## Core behavioral principles

### 1. Never motivate through guilt, streaks, or urgency
No red badges, no "you're about to lose your streak," no guilt-tripping copy, no
countdown pressure, no comparison to past performance framed as failure. If a
mechanic's primary function is to create anxiety to drive action, it does not
belong in this app — full stop. Motivation here comes from clarity and relevance,
not fear of loss.

### 2. Distinguish internal drift from external volatility — and respond differently
These are treated as fundamentally different states, not the same "off track" bucket:

- **Internal drift**: the user's motivation, focus, or follow-through has quietly
  waned while their life circumstances are basically stable. The right response is
  gentle re-orientation — surfacing the user's own stated intentions back to them,
  without pressure, so they can decide whether to recommit.
- **External volatility**: something real has changed — a move, a family change, a
  health event, a job change, a crisis. The right response is *not* to hold the
  user to their old plan. It's to help them adapt the plan itself, with more
  presence and support than usual, because the ground has shifted under them.

The app should never treat a house move the way it treats a lazy week. Detecting
which situation is occurring (as best it can) should shape tone, frequency, and
the type of intervention offered.

### 3. Involvement is adaptive to momentum
The app's presence is inversely related to how well the user is already doing on
their own:
- During consistent, self-directed periods: the app should be **nearly invisible**.
  Minimal check-ins, minimal prompts. Trust the user's own momentum and stay out
  of the way.
- During disruption, drift, or volatility: the app becomes **more proactive** —
  more present, more willing to surface things unprompted, more willing to initiate.

This adaptive dial is a core mechanic, not an incidental setting. Features should
be designed with "how does this scale up and down with the user's current
momentum?" in mind from the start.

### 4. Proactive surfacing, not passive waiting
The app should not simply sit and wait to be queried. It should notice relevant
ideas, opportunities, patterns, or connections and bring them to the user's
attention on its own initiative — the way a trusted chief of staff would, not the
way a search bar would. This is in tension with principle #3 (adaptivity) —
resolve that tension by adapting *frequency and intensity* of proactive surfacing,
not by turning proactivity off entirely.

### 5. Voice: sharp and composed
The tone is calm confidence — precise, economical, direct. Never:
- Cheerful or upbeat ("You've got this! 💪")
- Motivational-poster language ("Every journey begins with a single step")
- Performatively warm or effusive
- Apologetic or hedging

Think: a sharp, trusted advisor who respects the user enough not to perform
enthusiasm at them. Calm, clear, a little dry if anything. Confidence comes from
precision, not volume.

## How to use this when building

When implementing any feature — notifications, check-ins, onboarding, streak-like
mechanics, progress displays, copy/microcopy, AI-generated messages — check it
against all five principles above before writing code. If a feature only makes
sense assuming guilt, urgency, or constant visibility as the motivator, it's the
wrong feature, not just the wrong copy.
