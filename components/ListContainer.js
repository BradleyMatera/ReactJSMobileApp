import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListItem from './ListItem';

export default function ListContainer({ data, onDelete, onSelect }) {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});