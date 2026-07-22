import { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DOMAIN_LABELS } from './src/domains';
import { formatDateKey } from './src/dates';
import { createSeedData } from './src/seedData';
import { loadData, saveData } from './src/storage';
import { computeState, STATES } from './src/state';
import { STATE_THEME, tint } from './src/theme';

const OBSERVATIONS = {
  [STATES.CONSISTENCY]: 'Work, health, and habits have held steady this week.',
  [STATES.INTERNAL_DRIFT]: 'Follow-through has quieted this week. Noted, not judged.',
  [STATES.DISRUPTION]: 'Marked as a disrupted stretch. The usual plan can wait.',
};

export default function App() {
  const [data, setData] = useState(null);
  const todayDate = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => formatDateKey(todayDate), [todayDate]);

  useEffect(() => {
    loadData().then((stored) => setData(stored ?? createSeedData()));
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

  if (!data) {
    return (
      <View style={[styles.container, { backgroundColor: STATE_THEME[STATES.CONSISTENCY].background }]}>
        <ActivityIndicator color={STATE_THEME[STATES.CONSISTENCY].ink} />
      </View>
    );
  }

  const state = computeState({
    habits: data.habits,
    logs: data.logs,
    manualDisruption: data.manualDisruption,
    today: todayDate,
  });

  const theme = STATE_THEME[state];
  const todayLog = data.logs[todayKey] ?? {};

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.kicker, { color: theme.ink }]}>{theme.label.toUpperCase()}</Text>
        <Text style={[styles.observation, { color: theme.ink }]}>{OBSERVATIONS[state]}</Text>
      </View>

      <View style={styles.list}>
        {data.habits.map((habit) => {
          const done = !!todayLog[habit.id];
          return (
            <TouchableOpacity
              key={habit.id}
              style={[styles.row, { backgroundColor: tint(theme.ink, 0.08) }]}
              onPress={() => toggleHabit(habit.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  { borderColor: theme.ink },
                  done && { backgroundColor: theme.ink },
                ]}
              />
              <View style={styles.rowText}>
                <Text style={[styles.habitName, { color: theme.ink }]}>{habit.name}</Text>
                <Text style={[styles.habitDomain, { color: tint(theme.ink, 0.6) }]}>
                  {DOMAIN_LABELS[habit.domain]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.disruptionRow, { backgroundColor: tint(theme.ink, 0.08) }]}
        onPress={toggleDisruption}
        activeOpacity={0.7}
      >
        <Text style={[styles.disruptionLabel, { color: theme.ink }]}>Life's disrupted right now</Text>
        <View
          style={[
            styles.togglePill,
            { borderColor: theme.ink },
            data.manualDisruption && { backgroundColor: theme.ink },
          ]}
        >
          <Text style={[styles.toggleText, { color: data.manualDisruption ? theme.background : theme.ink }]}>
            {data.manualDisruption ? 'On' : 'Off'}
          </Text>
        </View>
      </TouchableOpacity>

      <StatusBar style={theme.statusBarStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 32,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  observation: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 33,
  },
  list: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 14,
  },
  rowText: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
  },
  habitDomain: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  disruptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  disruptionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  togglePill: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
