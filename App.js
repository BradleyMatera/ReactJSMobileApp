import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ImageBackground } from 'react-native';
import Heading from './componants/Heading'; 
import ListContainer from './componants/ListContainer';

export default function App() {
  const [animeData, setAnimeData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    // Fetch random anime from Jikan API
    fetch('https://api.jikan.moe/v4/random/anime')
      .then((res) => res.json())
      .then((data) => {
        console.log('Jikan API Response:', data); // Log the response for debugging
        if (data && data.data) {
          setAnimeData(data.data); // Set fetched anime data
          if (data.data.images && data.data.images.jpg) {
            setBackgroundImage(data.data.images.jpg.large_image_url); // Set background image
          }
        } else {
          console.error('Unexpected API response format:', data);
        }
      })
      .catch((err) => console.error('Error fetching anime data:', err));

    // Fetch anime characters from your API
    fetch('https://bradleycruddemo-1b86f27b4c16.herokuapp.com/api/v1/animeCharacters')
      .then((res) => res.json())
      .then((data) => {
        console.log('Your API Response:', data); // Log the response for debugging
        setCharacters(data); // Set characters data
      })
      .catch((err) => console.error('Error fetching characters:', err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {backgroundImage ? (
        <ImageBackground
          source={{ uri: backgroundImage }}
          resizeMode="cover"
          style={styles.background}
        >
          <Heading>{animeData?.title || 'Random Anime'}</Heading>
          <Text style={styles.synopsis}>{animeData?.synopsis || 'Loading synopsis...'}</Text>
          <Text style={styles.sectionTitle}>Characters from Your API:</Text>
          <ListContainer data={characters} />
        </ImageBackground>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  synopsis: {
    fontSize: 16,
    marginVertical: 10,
    color: 'red', //no hex code cause it can lol
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
});