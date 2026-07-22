import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';

import { formatDateKey } from './src/dates';
import { FONT_MAP } from './src/fonts';
import { buildAppDataFromSelection } from './src/habitBuilder';
import { loadOnboardingComplete, saveOnboardingComplete } from './src/onboarding';
import { loadProfile, saveProfile } from './src/profile';
import DailyPlannerScreen from './src/screens/DailyPlannerScreen';
import HabitPickerScreen from './src/screens/HabitPickerScreen';
import NameScreen from './src/screens/NameScreen';
import { loadData, saveData } from './src/storage';
import { PALETTE } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts(FONT_MAP);
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(null);
  const [screen, setScreen] = useState('name');

  const todayDate = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => formatDateKey(todayDate), [todayDate]);

  useEffect(() => {
    Promise.all([loadData(), loadOnboardingComplete(), loadProfile()]).then(
      ([storedData, complete, storedProfile]) => {
        if (storedData) setData(storedData);
        setProfile(storedProfile ?? {});
        setOnboardingComplete(complete);
        if (complete) setScreen('planner');
      }
    );
  }, []);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }).start();
  }, [screen, fadeAnim]);

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

  const handleNameContinue = useCallback((name) => {
    setProfile({ name });
    setScreen('habits');
  }, []);

  const handleHabitsComplete = useCallback(
    async (selection) => {
      const newData = buildAppDataFromSelection(selection);
      setData(newData);
      await saveProfile(profile ?? {});
      await saveOnboardingComplete();
      setOnboardingComplete(true);
      setScreen('planner');
    },
    [profile]
  );

  const ready =
    fontsLoaded &&
    onboardingComplete !== null &&
    profile !== null &&
    (onboardingComplete ? data !== null : true);

  if (!ready) {
    return (
      <View style={[styles.loading, { backgroundColor: PALETTE.paleBlue }]}>
        <ActivityIndicator color={PALETTE.cassis} />
      </View>
    );
  }

  let content;
  if (screen === 'name') {
    content = <NameScreen onContinue={handleNameContinue} />;
  } else if (screen === 'habits') {
    content = <HabitPickerScreen onComplete={handleHabitsComplete} />;
  } else {
    content = (
      <DailyPlannerScreen
        name={profile?.name}
        data={data}
        todayDate={todayDate}
        todayKey={todayKey}
        onToggleHabit={toggleHabit}
        onToggleDisruption={toggleDisruption}
      />
    );
  }

  return <Animated.View style={[styles.flex, { opacity: fadeAnim }]}>{content}</Animated.View>;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
