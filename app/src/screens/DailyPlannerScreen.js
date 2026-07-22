import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import NeoCard from '../components/NeoCard';
import { DOMAIN_LABELS } from '../domains';
import { FONTS } from '../fonts';
import { tapToggle } from '../haptics';
import { computeState, STATES } from '../state';
import { BLACK, DOMAIN_THEME, HERO_THEME, NEUTRAL_CANVAS, STATE_THEME } from '../theme';
import { fetchBogotaWeather } from '../weather';

const OBSERVATIONS = {
  [STATES.CONSISTENCY]: 'Work, health, and habits have held steady this week.',
  [STATES.INTERNAL_DRIFT]: 'Follow-through has quieted this week. Noted, not judged.',
  [STATES.DISRUPTION]: 'Marked as a disrupted stretch. The usual plan can wait.',
};

function greetingForHour(hour) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DailyPlannerScreen({
  name,
  data,
  todayDate,
  todayKey,
  onToggleHabit,
  onToggleDisruption,
}) {
  const [weather, setWeather] = useState({ status: 'loading' });
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setWeather({ status: 'loading' });
    fetchBogotaWeather()
      .then((result) => {
        if (!cancelled) setWeather({ status: 'ready', ...result });
      })
      .catch((error) => {
        // Logged (not swallowed) so a real failure shows up in the
        // `npx expo start` terminal instead of just a generic UI message.
        console.warn('Bogota weather fetch failed:', error?.message ?? error);
        if (!cancelled) setWeather({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [retryToken]);

  const retryWeather = useCallback(() => setRetryToken((n) => n + 1), []);

  const state = computeState({
    habits: data.habits,
    logs: data.logs,
    manualDisruption: data.manualDisruption,
    today: todayDate,
  });

  const theme = STATE_THEME[state];
  const todayLog = data.logs[todayKey] ?? {};
  const greeting = greetingForHour(todayDate.getHours());

  const weatherLine =
    weather.status === 'ready'
      ? `${weather.temperatureC}°C in Bogotá, ${weather.description.toLowerCase()}.`
      : weather.status === 'error'
      ? 'Weather unavailable right now. Tap to retry.'
      : 'Checking the weather in Bogotá…';

  const handleToggleHabit = (habitId) => {
    tapToggle();
    onToggleHabit(habitId);
  };

  const handleToggleDisruption = () => {
    tapToggle();
    onToggleDisruption();
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <NeoCard
          backgroundColor={HERO_THEME.background}
          shadowOffset={8}
          borderRadius={20}
          style={styles.heroCard}
        >
          <Text style={[styles.heroGreeting, { color: HERO_THEME.text }]}>
            {greeting}
            {name ? `, ${name}` : ''}.
          </Text>
          <TouchableOpacity
            disabled={weather.status !== 'error'}
            onPress={retryWeather}
            activeOpacity={0.7}
          >
            <Text style={[styles.heroWeather, { color: HERO_THEME.text }]}>{weatherLine}</Text>
          </TouchableOpacity>
        </NeoCard>

        <NeoCard backgroundColor={theme.background} style={styles.stateCard}>
          <Text style={[styles.kicker, { color: theme.ink }]}>{theme.label.toUpperCase()}</Text>
          <Text style={[styles.observation, { color: theme.ink }]}>{OBSERVATIONS[state]}</Text>
        </NeoCard>

        <Text style={styles.sectionLabel}>TODAY</Text>

        {data.habits.map((habit) => {
          const done = !!todayLog[habit.id];
          const domainTheme = DOMAIN_THEME[habit.domain];
          return (
            <NeoCard
              key={habit.id}
              pressable
              onPress={() => handleToggleHabit(habit.id)}
              style={styles.habitCard}
            >
              <View style={styles.habitRow}>
                <View style={[styles.checkbox, done && styles.checkboxDone]} />
                <Text style={styles.habitName}>{habit.name}</Text>
                <View style={[styles.domainChip, { backgroundColor: domainTheme.color }]}>
                  <Text style={[styles.domainChipText, { color: domainTheme.text }]}>
                    {DOMAIN_LABELS[habit.domain].toUpperCase()}
                  </Text>
                </View>
              </View>
            </NeoCard>
          );
        })}

        <NeoCard pressable onPress={handleToggleDisruption} style={styles.disruptionCard}>
          <View style={styles.habitRow}>
            <Text style={styles.disruptionLabel}>Life's disrupted right now</Text>
            <View style={[styles.togglePill, data.manualDisruption && styles.togglePillOn]}>
              <Text style={[styles.toggleText, data.manualDisruption && styles.toggleTextOn]}>
                {data.manualDisruption ? 'On' : 'Off'}
              </Text>
            </View>
          </View>
        </NeoCard>
      </ScrollView>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: NEUTRAL_CANVAS,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    paddingVertical: 24,
  },
  heroGreeting: {
    fontFamily: FONTS.headline,
    fontSize: 26,
    marginBottom: 8,
  },
  heroWeather: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15,
  },
  stateCard: {},
  kicker: {
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  observation: {
    fontFamily: FONTS.headline,
    fontSize: 22,
    lineHeight: 28,
  },
  sectionLabel: {
    fontFamily: FONTS.bodyBold,
    fontSize: 13,
    letterSpacing: 1,
    color: BLACK,
    marginTop: 4,
    marginBottom: 12,
  },
  habitCard: {
    paddingVertical: 14,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: BLACK,
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: BLACK,
  },
  habitName: {
    flex: 1,
    fontFamily: FONTS.bodySemiBold,
    fontSize: 15,
    color: BLACK,
  },
  domainChip: {
    borderWidth: 2,
    borderColor: BLACK,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  domainChipText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  disruptionCard: {
    marginTop: 4,
  },
  disruptionLabel: {
    flex: 1,
    fontFamily: FONTS.bodySemiBold,
    fontSize: 14,
    color: BLACK,
  },
  togglePill: {
    borderWidth: 2,
    borderColor: BLACK,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  togglePillOn: {
    backgroundColor: BLACK,
  },
  toggleText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
    color: BLACK,
  },
  toggleTextOn: {
    color: '#FFFFFF',
  },
});
