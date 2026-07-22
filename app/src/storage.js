import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'becoming_project_data_v1';

export async function loadData() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function saveData(data) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
