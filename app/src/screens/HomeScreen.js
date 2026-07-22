import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { DOMAIN_LABELS } from '../domains';
import { FONTS } from '../fonts';
import { computeState, STATES } from '../state';
import { DOMAIN_COLORS, STATE_THEME, tint } from '../theme';

const OBSERVATIONS = {
  [STATES.CONSISTENCY]: 'Work, health, and habits have held steady this week.',
  [STATES.INTERNAL_DRIFT]: 'Follow-through has quieted this week. Noted, not judged.',
  [STATES.DISRUPTION]: 'Marked as a disrupted stretch. The usual plan can wait.',
};

export default function HomeScreen({ data, todayDate, todayKey, onToggleHabit, onToggleDisruption }) {
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
          const domainColor = DOMAIN_COLORS[habit.domain];
          return (
            <TouchableOpacity
              key={habit.id}
              style={[styles.row, { backgroundColor: tint(theme.ink, 0.08) }]}
              onPress={() => onToggleHabit(habit.id)}
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
                <View style={styles.domainRow}>
                  <View
                    style={[
                      styles.domainDot,
                      { backgroundColor: domainColor, borderColor: theme.ink },
                    ]}
                  />
                  <Text style={[styles.habitDomain, { color: tint(theme.ink, 0.6) }]}>
                    {DOMAIN_LABELS[habit.domain]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.disruptionRow, { backgroundColor: tint(theme.ink, 0.08) }]}
        onPress={onToggleDisruption}
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
    fontFamily: FONTS.bodyBold,
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  observation: {
    fontFamily: FONTS.headline,
    fontSize: 28,
    lineHeight: 35,
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
    fontFamily: FONTS.bodySemiBold,
    fontSize: 16,
  },
  domainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  domainDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 6,
  },
  habitDomain: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 12,
    letterSpacing: 0.5,
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
    fontFamily: FONTS.bodySemiBold,
    fontSize: 14,
  },
  togglePill: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  toggleText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
  },
});
