import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { FONTS } from '../fonts';
import { PALETTE, tint } from '../theme';

const BACKGROUND = PALETTE.paleBlue;
const INK = PALETTE.cassis;

const QUESTIONS = [
  {
    key: 'wakeTime',
    label: 'Rough wake time',
    placeholder: 'e.g. 7:00 AM',
  },
  {
    key: 'workRoutine',
    label: 'What work usually looks like',
    placeholder: 'e.g. 9–5, deep focus mornings',
  },
  {
    key: 'healthAndHabits',
    label: 'What health and habits usually look like',
    placeholder: 'e.g. gym three times a week, reading before bed',
  },
];

export default function RoutineScreen({ onComplete }) {
  const [answers, setAnswers] = useState({});

  const setAnswer = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Before we start</Text>
        <Text style={styles.subtitle}>
          Three quick notes on your routine. Nothing here is graded.
        </Text>

        {QUESTIONS.map((question) => (
          <View key={question.key} style={styles.field}>
            <Text style={styles.label}>{question.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={question.placeholder}
              placeholderTextColor={tint(INK, 0.4)}
              value={answers[question.key] ?? ''}
              onChangeText={(value) => setAnswer(question.key, value)}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onComplete(answers)}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  title: {
    fontFamily: FONTS.headline,
    fontSize: 28,
    color: INK,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: INK,
    marginBottom: 28,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13,
    color: INK,
    marginBottom: 8,
  },
  input: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: INK,
    backgroundColor: tint(INK, 0.08),
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: INK,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 15,
    color: BACKGROUND,
  },
});
