import { lastNDateKeys } from './dates';

export const STATES = {
  CONSISTENCY: 'consistency',
  INTERNAL_DRIFT: 'internal_drift',
  DISRUPTION: 'disruption',
};

const WINDOW_DAYS = 7;
const RECENT_DAYS = 3;

// Domains are pooled together on purpose: no domain is treated as the
// foundation the others sit on. A quiet week in one domain counts the
// same as a quiet week in another.
function tally(dateKeys, habits, logs) {
  let possible = 0;
  let done = 0;
  for (const key of dateKeys) {
    for (const habit of habits) {
      if (habit.createdAt > key) continue; // habit didn't exist yet on this day
      possible += 1;
      if (logs[key]?.[habit.id]) done += 1;
    }
  }
  return { possible, done };
}

// today: a Date object for "now".
export function computeState({ habits, logs, manualDisruption, today }) {
  if (manualDisruption) return STATES.DISRUPTION;

  const dateKeys = lastNDateKeys(today, WINDOW_DAYS);
  const recentKeys = dateKeys.slice(-RECENT_DAYS);
  const priorKeys = dateKeys.slice(0, -RECENT_DAYS);

  const recent = tally(recentKeys, habits, logs);
  const prior = tally(priorKeys, habits, logs);

  // Not enough history yet to say anything — stay quiet rather than judge.
  if (recent.possible === 0 || prior.possible === 0) return STATES.CONSISTENCY;

  const recentRate = recent.done / recent.possible;
  const priorRate = prior.done / prior.possible;

  const declined = recentRate < 0.5 && recentRate < priorRate - 0.25;

  return declined ? STATES.INTERNAL_DRIFT : STATES.CONSISTENCY;
}
