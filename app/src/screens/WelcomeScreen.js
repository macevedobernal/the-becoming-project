import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { FONTS } from '../fonts';
import { PALETTE } from '../theme';

const BACKGROUND = PALETTE.paleBlue;
const INK = PALETTE.cassis;

export default function WelcomeScreen({ onContinue }) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>The Becoming Project</Text>
        <Text style={styles.subtitle}>
          This reads your week across work, health, and habits, and tells you the truth
          about your direction. Not a score. Not a lecture.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onContinue} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
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
    fontSize: 34,
    color: INK,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 24,
    color: INK,
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
