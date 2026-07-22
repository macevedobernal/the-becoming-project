import { STATES } from './state';
import { DOMAINS } from './domains';

// The five palette colors from CLAUDE.md. Spread across screens/elements
// rather than repeating one or two everywhere: wasabi and pale blue carry
// state color, cassis anchors the onboarding open, orange topaze headlines
// the Daily Planner hero, sage rounds out the domain accents.
export const PALETTE = {
  wasabi: '#E9F056',
  paleBlue: '#D7EFFF',
  cassis: '#351E28',
  sage: '#AEB8A0',
  orangeTopaze: '#FF5C34',
};

export const BLACK = '#000000';

// Neutral canvas the card-feed sits on. Not one of the five brand colors —
// it's negative space, the same role white plays in flat card UI, so the
// palette colors keep reading as deliberate accents rather than wallpaper.
export const NEUTRAL_CANVAS = '#F7F4EC';
export const NEUTRAL_CARD = '#FFFFFF';

// Neobrutalist primitives: every card/button gets the same thick border
// and hard-edged offset shadow, no blur.
export const BORDER_WIDTH = 3;
export const SHADOW_OFFSET = 6;

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

// Domain tags are solid color chips on a neutral card, not full-bleed
// backgrounds — so unlike state color, every domain gets its own color
// with no risk of blending into whatever's behind it. Text is dark by
// default per the brief; cassis is dark itself, so habits gets a light
// (pale blue) label instead so it stays legible.
export const DOMAIN_THEME = {
  [DOMAINS.WORK]: { color: PALETTE.orangeTopaze, text: BLACK },
  [DOMAINS.HEALTH]: { color: PALETTE.sage, text: BLACK },
  [DOMAINS.HABITS]: { color: PALETTE.cassis, text: PALETTE.paleBlue },
};

// The Daily Planner's hero banner is deliberately its own color, distinct
// from whatever the state card below it is showing.
export const HERO_THEME = {
  background: PALETTE.orangeTopaze,
  text: BLACK,
};

export function tint(hexColor, alpha) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
