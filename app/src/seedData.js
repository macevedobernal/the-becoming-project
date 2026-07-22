import { DOMAINS } from './domains';
import { formatDateKey } from './dates';

export function createSeedData() {
  const today = formatDateKey(new Date());
  return {
    habits: [
      { id: 'deep-work-block', name: 'Deep work block', domain: DOMAINS.WORK, createdAt: today },
      { id: 'morning-routine', name: 'Morning routine', domain: DOMAINS.HEALTH, createdAt: today },
      { id: 'evening-reading', name: 'Evening reading', domain: DOMAINS.HABITS, createdAt: today },
    ],
    logs: {},
    manualDisruption: false,
  };
}
