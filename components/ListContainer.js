// components/ListContainer.js
import { StyleSheet, FlatList, View, Text } from 'react-native';
import ListItem from './ListItem';

export default function ListContainer({ data, onDelete, onSelect }) {
  const renderItem = ({ item }) => (
    <ListItem 
      title={item.name} 
      subtitle={`${item.anime} - Power: ${item.powerLevel}`} 
      onDelete={() => onDelete(item._id)}
      onPress={() => onSelect(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  listContent: {
    paddingVertical: 4,
  },
});