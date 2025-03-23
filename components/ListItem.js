import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ListItem({ item, onDelete, onSelect }) {
  return (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.anime}>{item.anime}</Text>
        <Text style={styles.power}>{item.powerLevel}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 5,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)',  // Web-friendly shadow
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: '#fff',
  },
  anime: {
    fontSize: 14,
    color: '#aaa',
  },
  power: {
    fontSize: 14,
    color: '#aaa',
  },
  deleteButton: {
    padding: 5,
  },
});