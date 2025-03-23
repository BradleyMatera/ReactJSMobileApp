import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListItem from './ListItem';

export default function ListContainer({ data, onDelete, onSelect }) {
  const items = Array.isArray(data) ? data : [];

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))
      ) : (
        <Text style={styles.noItems}>No characters available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  noItems: {
    color: '#fff',
    fontSize: 16,
  },
});