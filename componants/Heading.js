import { StyleSheet, Text, View } from 'react-native';

export default function Heading({ children, level }) {
  const headingLevel = level ? level : 5;
  const textStyle = [styles.text, styles[`h${headingLevel}`]];

  return (
    <View style={styles.container}>
      <Text style={textStyle} accessibilityRole={`header`}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eef1f6',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  text: {
    color: '#333',
    textAlign: 'center',
  },
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 28, fontWeight: 'bold' },
  h3: { fontSize: 24, fontWeight: 'bold' },
  h4: { fontSize: 20, fontWeight: '600' },
  h5: { fontSize: 16, fontWeight: '600' },
});