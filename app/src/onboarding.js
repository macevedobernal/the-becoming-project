import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'becoming_project_onboarding_complete_v1';

export async function loadOnboardingComplete() {
  const raw = await AsyncStorage.getItem(ONBOARDING_KEY);
  return raw === 'true';
}

export async function saveOnboardingComplete() {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
}
