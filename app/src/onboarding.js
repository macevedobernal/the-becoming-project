import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'becoming_project_onboarding_complete_v1';
const ROUTINE_KEY = 'becoming_project_routine_v1';

export async function loadOnboardingComplete() {
  const raw = await AsyncStorage.getItem(ONBOARDING_KEY);
  return raw === 'true';
}

export async function saveOnboardingComplete() {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
}

// Captured for future personalization only — not read by the interpretation
// logic yet.
export async function saveRoutine(routine) {
  await AsyncStorage.setItem(ROUTINE_KEY, JSON.stringify(routine));
}
