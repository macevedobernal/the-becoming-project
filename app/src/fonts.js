import {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

// Fraunces is reserved for large titles/headlines only; everything else
// (body, labels, buttons, habit names) uses Space Grotesk, per CLAUDE.md.
export const FONT_MAP = {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
};

export const FONTS = {
  headline: 'Fraunces_700Bold',
  headlineSemiBold: 'Fraunces_600SemiBold',
  body: 'SpaceGrotesk_400Regular',
  bodyMedium: 'SpaceGrotesk_500Medium',
  bodySemiBold: 'SpaceGrotesk_600SemiBold',
  bodyBold: 'SpaceGrotesk_700Bold',
};
