import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import NeoCard from '../components/NeoCard';
import { FONTS } from '../fonts';
import { PALETTE, tint } from '../theme';

const BACKGROUND = PALETTE.cassis;
const INK = PALETTE.paleBlue;

export default function NameScreen({ onContinue }) {
  const [name, setName] = useState('');
  const trimmed = name.trim();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.body}>
        <Text style={styles.title}>The Becoming Project</Text>
        <Text style={styles.subtitle}>
          This reads your week across work, health, and habits, and tells you the truth
          about your direction.
        </Text>

        <Text style={styles.label}>What should we call you?</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name or nickname"
          placeholderTextColor={tint(INK, 0.45)}
          value={name}
          onChangeText={setName}
          autoFocus
        />
      </View>

      <NeoCard
        backgroundColor={PALETTE.orangeTopaze}
        pressable
        disabled={!trimmed}
        onPress={() => onContinue(trimmed)}
        style={styles.buttonCard}
        containerStyle={[styles.buttonContainer, !trimmed && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </NeoCard>

      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.headline,
    fontSize: 32,
    color: INK,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 24,
    color: INK,
    marginBottom: 36,
  },
  label: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 14,
    color: INK,
    marginBottom: 10,
  },
  input: {
    fontFamily: FONTS.body,
    fontSize: 17,
    color: INK,
    backgroundColor: tint(INK, 0.12),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: tint(INK, 0.4),
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  buttonContainer: {
    marginBottom: 0,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonCard: {
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 16,
    color: '#000000',
  },
});
