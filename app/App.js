import { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DOMAIN_LABELS } from './src/domains';
import { formatDateKey } from './src/dates';
import { createSeedData } from './src/seedData';
import { loadData, saveData } from './src/storage';
import { computeState, STATES } from './src/state';

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

  const toggleDisruption = useCallback((value) => {
    setData((prev) => ({ ...prev, manualDisruption: value }));
  }, []);

  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#e5e5e7" />
      </View>
    );
  }

  const state = computeState({
    habits: data.habits,
    logs: data.logs,
    manualDisruption: data.manualDisruption,
    today: todayDate,
  });

  const todayLog = data.logs[todayKey] ?? {};

  return (
    <View style={styles.container}>
      <Text style={styles.observation}>{OBSERVATIONS[state]}</Text>

      <View style={styles.list}>
        {data.habits.map((habit) => {
          const done = !!todayLog[habit.id];
          return (
            <TouchableOpacity
              key={habit.id}
              style={styles.row}
              onPress={() => toggleHabit(habit.id)}
            >
              <Text style={styles.checkbox}>{done ? '[x]' : '[ ]'}</Text>
              <View style={styles.rowText}>
                <Text style={styles.habitName}>{habit.name}</Text>
                <Text style={styles.habitDomain}>{DOMAIN_LABELS[habit.domain]}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.disruptionRow}>
        <Text style={styles.disruptionLabel}>Life's disrupted right now</Text>
        <Switch value={data.manualDisruption} onValueChange={toggleDisruption} />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  observation: {
    color: '#e5e5e7',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
  },
  list: {
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    color: '#e5e5e7',
    fontSize: 18,
    width: 32,
  },
  rowText: {
    flex: 1,
  },
  habitName: {
    color: '#e5e5e7',
    fontSize: 16,
  },
  habitDomain: {
    color: '#8e8e93',
    fontSize: 13,
    marginTop: 2,
  },
  disruptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#3a3a3c',
    paddingTop: 16,
  },
  disruptionLabel: {
    color: '#8e8e93',
    fontSize: 14,
  },
});
