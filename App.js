import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ImageBackground, Button, TextInput, View } from 'react-native';
import Heading from './componants/Heading'; 
import ListContainer from './componants/ListContainer';

export default function App() {
  const [animeData, setAnimeData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [newCharacter, setNewCharacter] = useState({ name: '', anime: '', powerLevel: '' }); // State for new character creation
  const [selectedCharacter, setSelectedCharacter] = useState(null); // State for character to update

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

  // Function to add a new character
  const addCharacter = () => {
    fetch('https://bradleycruddemo-1b86f27b4c16.herokuapp.com/api/v1/animeCharacters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCharacter),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Character added:', data);
        setCharacters([...characters, data]); // Update the character list
        setNewCharacter({ name: '', anime: '', powerLevel: '' }); // Reset the form
      })
      .catch((err) => console.error('Error adding character:', err));
  };

  // Function to update a character
  const updateCharacter = () => {
    if (!selectedCharacter) return;

    fetch(`https://bradleycruddemo-1b86f27b4c16.herokuapp.com/api/v1/animeCharacters/${selectedCharacter._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedCharacter),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Character updated:', data);
        setCharacters(characters.map((char) => (char._id === data._id ? data : char))); // Update the character list
        setSelectedCharacter(null); // Reset the selection
      })
      .catch((err) => console.error('Error updating character:', err));
  };

  // Function to delete a character
  const deleteCharacter = (id) => {
    fetch(`https://bradleycruddemo-1b86f27b4c16.herokuapp.com/api/v1/animeCharacters/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Character deleted:', id);
        setCharacters(characters.filter((char) => char._id !== id)); // Remove character from list
      })
      .catch((err) => console.error('Error deleting character:', err));
  };

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
          <ListContainer data={characters} onDelete={deleteCharacter} />
          
          {/* Form to Add a New Character */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newCharacter.name}
              onChangeText={(text) => setNewCharacter({ ...newCharacter, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Anime"
              value={newCharacter.anime}
              onChangeText={(text) => setNewCharacter({ ...newCharacter, anime: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Power Level"
              keyboardType="numeric"
              value={newCharacter.powerLevel}
              onChangeText={(text) => setNewCharacter({ ...newCharacter, powerLevel: text })}
            />
            <Button title="Add Character" onPress={addCharacter} />
          </View>

          {/* Form to Update a Character */}
          {selectedCharacter && (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Update Name"
                value={selectedCharacter.name}
                onChangeText={(text) => setSelectedCharacter({ ...selectedCharacter, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Anime"
                value={selectedCharacter.anime}
                onChangeText={(text) => setSelectedCharacter({ ...selectedCharacter, anime: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Update Power Level"
                keyboardType="numeric"
                value={selectedCharacter.powerLevel}
                onChangeText={(text) => setSelectedCharacter({ ...selectedCharacter, powerLevel: text })}
              />
              <Button title="Update Character" onPress={updateCharacter} />
            </View>
          )}
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
    color: 'red',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  form: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});