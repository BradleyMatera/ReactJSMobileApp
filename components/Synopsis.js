// components/Synopsis.js
import { StyleSheet, Text, View } from 'react-native';

export default function Synopsis({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
});