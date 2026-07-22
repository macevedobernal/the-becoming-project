import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Placeholder observation. Later this will be generated from the
// user's actual data, but the screen itself never becomes more than this.
const OBSERVATION = 'Your mornings held steady this week.';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.observation}>{OBSERVATION}</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  observation: {
    color: '#e5e5e7',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 28,
  },
});
