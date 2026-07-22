import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import NeoCard from '../components/NeoCard';
import { CURATED_HABITS } from '../curatedHabits';
import { DOMAIN_LABELS, DOMAINS } from '../domains';
import { FONTS } from '../fonts';
import { tapSelection, tapComplete } from '../haptics';
import { BLACK, DOMAIN_THEME, NEUTRAL_CANVAS, PALETTE, tint } from '../theme';

const DOMAIN_ORDER = [DOMAINS.WORK, DOMAINS.HEALTH, DOMAINS.HABITS];

function initialEntries() {
  const entries = {};
  for (const domain of DOMAIN_ORDER) {
    entries[domain] = CURATED_HABITS[domain].map((name) => ({ name, selected: false }));
  }
  return entries;
}

export default function HabitPickerScreen({ onComplete }) {
  const [entries, setEntries] = useState(initialEntries);
  const [customText, setCustomText] = useState({});

  const toggle = (domain, name) => {
    tapSelection();
    setEntries((prev) => ({
      ...prev,
      [domain]: prev[domain].map((entry) =>
        entry.name === name ? { ...entry, selected: !entry.selected } : entry
      ),
    }));
  };

  const addCustom = (domain) => {
    const raw = (customText[domain] ?? '').trim();
    if (!raw) return;
    tapSelection();
    setEntries((prev) => {
      const existing = prev[domain].find((e) => e.name.toLowerCase() === raw.toLowerCase());
      if (existing) {
        return {
          ...prev,
          [domain]: prev[domain].map((entry) =>
            entry.name.toLowerCase() === raw.toLowerCase() ? { ...entry, selected: true } : entry
          ),
        };
      }
      return { ...prev, [domain]: [...prev[domain], { name: raw, selected: true }] };
    });
    setCustomText((prev) => ({ ...prev, [domain]: '' }));
  };

  const selectedCount = DOMAIN_ORDER.reduce(
    (sum, domain) => sum + entries[domain].filter((e) => e.selected).length,
    0
  );

  const handleContinue = () => {
    if (selectedCount === 0) return;
    tapComplete();
    const selection = DOMAIN_ORDER.flatMap((domain) =>
      entries[domain].filter((e) => e.selected).map((e) => ({ name: e.name, domain }))
    );
    onComplete(selection);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Pick what you're already doing</Text>
        <Text style={styles.subtitle}>Tap to add. You can change these later.</Text>

        {DOMAIN_ORDER.map((domain) => {
          const domainTheme = DOMAIN_THEME[domain];
          return (
            <View key={domain} style={styles.section}>
              <Text style={[styles.sectionLabel, { color: domainTheme.color }]}>
                {DOMAIN_LABELS[domain].toUpperCase()}
              </Text>

              <View style={styles.chipRow}>
                {entries[domain].map((entry) => (
                  <NeoCard
                    key={entry.name}
                    pressable
                    onPress={() => toggle(domain, entry.name)}
                    backgroundColor={entry.selected ? domainTheme.color : NEUTRAL_CANVAS}
                    borderRadius={10}
                    shadowOffset={3}
                    style={styles.chip}
                    containerStyle={styles.chipContainer}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        { color: entry.selected ? domainTheme.text : BLACK },
                      ]}
                    >
                      {entry.name}
                    </Text>
                  </NeoCard>
                ))}
              </View>

              <View style={styles.addRow}>
                <TextInput
                  style={styles.addInput}
                  placeholder="Add your own"
                  placeholderTextColor={tint(BLACK, 0.4)}
                  value={customText[domain] ?? ''}
                  onChangeText={(value) => setCustomText((prev) => ({ ...prev, [domain]: value }))}
                  onSubmitEditing={() => addCustom(domain)}
                  returnKeyType="done"
                />
                <NeoCard
                  pressable
                  onPress={() => addCustom(domain)}
                  backgroundColor={PALETTE.paleBlue}
                  borderRadius={10}
                  shadowOffset={3}
                  style={styles.addButton}
                  containerStyle={styles.addButtonContainer}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </NeoCard>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        {selectedCount === 0 && <Text style={styles.hint}>Pick at least one to start.</Text>}
        <NeoCard
          pressable
          disabled={selectedCount === 0}
          onPress={handleContinue}
          backgroundColor={PALETTE.wasabi}
          style={styles.continueCard}
          containerStyle={selectedCount === 0 ? styles.continueDisabled : undefined}
        >
          <Text style={styles.continueText}>Continue{selectedCount > 0 ? ` (${selectedCount})` : ''}</Text>
        </NeoCard>
      </View>

      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NEUTRAL_CANVAS,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  title: {
    fontFamily: FONTS.headline,
    fontSize: 26,
    color: BLACK,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: BLACK,
    marginBottom: 24,
  },
  section: {
    marginBottom: 22,
  },
  sectionLabel: {
    fontFamily: FONTS.bodyBold,
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContainer: {
    marginRight: 10,
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addInput: {
    flex: 1,
    fontFamily: FONTS.body,
    fontSize: 14,
    color: BLACK,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: BLACK,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  },
  addButtonContainer: {
    marginBottom: 0,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addButtonText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 13,
    color: BLACK,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 8,
    backgroundColor: NEUTRAL_CANVAS,
  },
  hint: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: BLACK,
    textAlign: 'center',
    marginBottom: 10,
  },
  continueCard: {
    alignItems: 'center',
  },
  continueDisabled: {
    opacity: 0.5,
  },
  continueText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 16,
    color: BLACK,
  },
});
