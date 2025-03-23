import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CharacterForm({ character, onChange, onSubmit, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={character.name}
        onChangeText={(text) => onChange({ ...character, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Anime"
        placeholderTextColor="#aaa"
        value={character.anime}
        onChangeText={(text) => onChange({ ...character, anime: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Power Level"
        placeholderTextColor="#aaa"
        value={character.powerLevel}
        onChangeText={(text) => onChange({ ...character, powerLevel: text })}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)',  // Web-friendly shadow
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});