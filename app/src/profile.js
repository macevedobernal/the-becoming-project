import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'becoming_project_profile_v1';

export async function loadProfile() {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
