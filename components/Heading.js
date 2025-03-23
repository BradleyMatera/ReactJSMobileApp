// components/Heading.js
import { StyleSheet, Text, View } from 'react-native';

export default function Heading({ children, level = 1 }) {
  const textStyle = [styles.text, styles[`h${Math.min(Math.max(level, 1), 5)}`]];

  return (
    <View style={styles.container}>
      <Text style={textStyle} accessibilityRole="header">
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  h1: { fontSize: 32 },
  h2: { fontSize: 28 },
  h3: { fontSize: 24 },
  h4: { fontSize: 20 },
  h5: { fontSize: 16 },
});