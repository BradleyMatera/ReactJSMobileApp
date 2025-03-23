// components/CharacterForm.js
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

export default function CharacterForm({ character, onChange, onSubmit, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Character Name"
        value={character.name}
        onChangeText={(text) => onChange({ ...character, name: text })}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Anime"
        value={character.anime}
        onChangeText={(text) => onChange({ ...character, anime: text })}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Power Level"
        keyboardType="numeric"
        value={character.powerLevel}
        onChangeText={(text) => onChange({ ...character, powerLevel: text })}
        placeholderTextColor="#999"
      />
      <Button title="Submit" onPress={onSubmit} color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});