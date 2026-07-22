import { formatDateKey } from './dates';

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// entries: [{ name, domain }], in the order the user picked/added them
// during onboarding. Builds the same AppData shape the rest of the app
// (storage, interpretation logic) already expects.
export function buildAppDataFromSelection(entries) {
  const today = formatDateKey(new Date());
  const seenIds = new Set();

  const habits = entries.reduce((acc, { name, domain }) => {
    const trimmedName = name.trim();
    if (!trimmedName) return acc;
    const id = `${domain}-${slugify(trimmedName)}`;
    if (seenIds.has(id)) return acc;
    seenIds.add(id);
    acc.push({ id, name: trimmedName, domain, createdAt: today });
    return acc;
  }, []);

  return { habits, logs: {}, manualDisruption: false };
}
