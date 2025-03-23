import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Synopsis({ children }) {
  return <Text style={styles.synopsis}>{children}</Text>;
}

const styles = StyleSheet.create({
  synopsis: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
});