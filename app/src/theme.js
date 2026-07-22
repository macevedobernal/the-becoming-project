import { STATES } from './state';
import { DOMAINS } from './domains';

// The five palette colors from CLAUDE.md. Not all five map to a state —
// sage and orange topaze are held in reserve for later (domain accents,
// Proactive Inspiration, etc.) rather than forced in here.
export const PALETTE = {
  wasabi: '#E9F056',
  paleBlue: '#D7EFFF',
  cassis: '#351E28',
  sage: '#AEB8A0',
  orangeTopaze: '#FF5C34',
};

// One dominant color per state, per CLAUDE.md's Visual Design Language.
// Consistency and drift share cassis as ink-on-light; disruption inverts
// the same two colors (pale blue ink on a cassis field) so the palette
// stays closed rather than reaching for plain black/white.
export const STATE_THEME = {
  [STATES.CONSISTENCY]: {
    label: 'Consistency',
    background: PALETTE.paleBlue,
    ink: PALETTE.cassis,
    statusBarStyle: 'dark',
  },
  [STATES.INTERNAL_DRIFT]: {
    label: 'Internal drift',
    background: PALETTE.wasabi,
    ink: PALETTE.cassis,
    statusBarStyle: 'dark',
  },
  [STATES.DISRUPTION]: {
    label: 'Disruption',
    background: PALETTE.cassis,
    ink: PALETTE.paleBlue,
    statusBarStyle: 'light',
  },
};

// Domain accents are separate from state color, so a habit's domain stays
// identifiable regardless of which state currently owns the screen.
// Work and health get colors no state ever uses as a background (orange
// topaze, sage), so they never disappear. Habits reuses cassis — the one
// unavoidable overlap given a 5-color palette and 3 states already claiming
// 3 of them — mitigated by always drawing the dot with an ink-colored ring,
// so it reads as an outline even on a disruption-state screen where the
// background is cassis too.
export const DOMAIN_COLORS = {
  [DOMAINS.WORK]: PALETTE.orangeTopaze,
  [DOMAINS.HEALTH]: PALETTE.sage,
  [DOMAINS.HABITS]: PALETTE.cassis,
};

export function tint(hexColor, alpha) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
