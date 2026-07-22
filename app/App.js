import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { formatDateKey } from './src/dates';
import { FONT_MAP } from './src/fonts';
import { loadOnboardingComplete, saveOnboardingComplete, saveRoutine } from './src/onboarding';
import { createSeedData } from './src/seedData';
import HomeScreen from './src/screens/HomeScreen';
import RoutineScreen from './src/screens/RoutineScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { loadData, saveData } from './src/storage';
import { PALETTE } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts(FONT_MAP);
  const [data, setData] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(null);
  const [screen, setScreen] = useState('welcome');

  const todayDate = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => formatDateKey(todayDate), [todayDate]);

  useEffect(() => {
    loadData().then((stored) => setData(stored ?? createSeedData()));
    loadOnboardingComplete().then((complete) => {
      setOnboardingComplete(complete);
      if (complete) setScreen('home');
    });
  }, []);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  const toggleHabit = useCallback(
    (habitId) => {
      setData((prev) => {
        const todayLog = prev.logs[todayKey] ?? {};
        return {
          ...prev,
          logs: {
            ...prev.logs,
            [todayKey]: { ...todayLog, [habitId]: !todayLog[habitId] },
          },
        };
      });
    },
    [todayKey]
  );

  const toggleDisruption = useCallback(() => {
    setData((prev) => ({ ...prev, manualDisruption: !prev.manualDisruption }));
  }, []);

  const handleRoutineComplete = useCallback(async (routine) => {
    await saveRoutine(routine);
    await saveOnboardingComplete();
    setOnboardingComplete(true);
    setScreen('home');
  }, []);

  const ready = fontsLoaded && data && onboardingComplete !== null;

  if (!ready) {
    return (
      <View style={[styles.loading, { backgroundColor: PALETTE.paleBlue }]}>
        <ActivityIndicator color={PALETTE.cassis} />
      </View>
    );
  }

  if (screen === 'welcome') {
    return <WelcomeScreen onContinue={() => setScreen('routine')} />;
  }

  if (screen === 'routine') {
    return <RoutineScreen onComplete={handleRoutineComplete} />;
  }

  return (
    <HomeScreen
      data={data}
      todayDate={todayDate}
      todayKey={todayKey}
      onToggleHabit={toggleHabit}
      onToggleDisruption={toggleDisruption}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
