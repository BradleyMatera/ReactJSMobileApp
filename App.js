// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, ScrollView, View, ActivityIndicator } from 'react-native';
import Heading from './components/Heading';
import ListContainer from './components/ListContainer';
import CharacterForm from './components/CharacterForm';
import Synopsis from './components/Synopsis';

const API_URL = 'https://i0p044nu8c.execute-api.us-east-1.amazonaws.com/prod/characters';

export default function App() {
  const [animeData, setAnimeData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [newCharacter, setNewCharacter] = useState({ name: '', anime: '', powerLevel: '' });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch random anime
      const animeResponse = await fetch('https://api.jikan.moe/v4/random/anime');
      const animeJson = await animeResponse.json();
      setAnimeData(animeJson.data);
      setBackgroundImage(animeJson.data?.images?.jpg?.large_image_url);

      // Fetch characters
      const charactersResponse = await fetch(API_URL);
      const charactersJson = await charactersResponse.json();
      setCharacters(charactersJson);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCharacter = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCharacter),
      });
      const data = await response.json();
      setCharacters([...characters, data]);
      setNewCharacter({ name: '', anime: '', powerLevel: '' });
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  const updateCharacter = async () => {
    if (!selectedCharacter) return;
    try {
      const response = await fetch(`${API_URL}/${selectedCharacter._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedCharacter),
      });
      const data = await response.json();
      setCharacters(characters.map(char => char._id === data._id ? data : char));
      setSelectedCharacter(null);
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const deleteCharacter = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setCharacters(characters.filter(char => char._id !== id));
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: backgroundImage }} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Heading>{animeData?.title || 'Random Anime'}</Heading>
          <Synopsis>{animeData?.synopsis || 'No synopsis available'}</Synopsis>
          
          <ListContainer 
            data={characters} 
            onDelete={deleteCharacter}
            onSelect={handleSelectCharacter}
          />
          
          <CharacterForm
            character={newCharacter}
            onChange={setNewCharacter}
            onSubmit={addCharacter}
            title="Add New Character"
          />
          
          {selectedCharacter && (
            <CharacterForm
              character={selectedCharacter}
              onChange={setSelectedCharacter}
              onSubmit={updateCharacter}
              title="Update Character"
            />
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
});