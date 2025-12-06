import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { searchRecipes } from '../services/apiService';

export default function RecipeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.headerMicButton}
          onPress={handleVoiceSearch}
        >
          <Ionicons name="mic" size={24} color={isListening ? "#FF6B6B" : "#007AFF"} />
        </TouchableOpacity>
      ),
      headerLeft: () => null,
    });
  }, [isListening]);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async (query = searchQuery) => {
    setLoading(true);
    try {
      const results = await searchRecipes(query);
      console.log('API returned:', results);
      
      if (results && results.length > 0) {
        setRecipes(results);
      } else {
        console.log('No recipes returned, using fallback');
        // Fallback to dummy data if API returns empty
        setRecipes([
          { id: 1, name: 'Chicken Teriyaki', time: '30 min', difficulty: 'Easy' },
          { id: 2, name: 'Beef Stir Fry', time: '25 min', difficulty: 'Medium' }
        ]);
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      // Fallback to dummy data on error
      setRecipes([
        { id: 1, name: 'Chicken Teriyaki', time: '30 min', difficulty: 'Easy' },
        { id: 2, name: 'Beef Stir Fry', time: '25 min', difficulty: 'Medium' }
      ]);
    }
    setLoading(false);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    Alert.prompt(
      'Voice Search',
      'Speak your ingredients (simulated with text input)',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setIsListening(false)
        },
        {
          text: 'Search',
          onPress: (text) => {
            if (text) {
              setSearchQuery(text);
              loadRecipes(text);
              Speech.speak(`Searching for recipes with ${text}`);
            }
            setIsListening(false);
          }
        }
      ],
      'plain-text',
      searchQuery
    );
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate('Cooking', { recipeId: item.id })}
    >
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text style={styles.recipeInfo}>{item.time} • {item.difficulty}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Search</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for ingredients..."
          onSubmitEditing={() => loadRecipes(searchQuery)}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => loadRecipes(searchQuery)}
        >
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>

      </View>
      
      <Text style={styles.resultsText}>Results ({recipes.length})</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B35',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  headerMicButton: {
    marginRight: 15,
    padding: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6B6B6B',
  },
  recipeCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeInfo: {
    fontSize: 14,
    color: '#6B6B6B',
  },
});