import * as Haptics from 'expo-haptics';

// Thin, named wrapper so call sites read as intent ("tapSelection" at a
// chip) rather than raw Haptics API calls. Swallows errors since haptics
// are a nicety, never something that should crash an interaction.
export function tapSelection() {
  Haptics.selectionAsync().catch(() => {});
}

export function tapToggle() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

export function tapComplete() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}
