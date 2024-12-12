import { StyleSheet, FlatList, View } from 'react-native';
import ListItem from './ListItem';

export default function ListContainer({ data }) {
  const renderItem = ({ item }) => (
    <ListItem title={item.name} subtitle={item.anime} /> // Add subtitle for more context
  );

  return (
    <View style={styles.container}>
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
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 10,
  },
});