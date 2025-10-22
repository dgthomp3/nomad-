import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecipeScreen({ navigation }) {
  const sampleRecipe = {
    name: "Pasta Carbonara",
    steps: 5,
    time: "20 min"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recipeName}>{sampleRecipe.name}</Text>
      <Text style={styles.recipeInfo}>{sampleRecipe.steps} steps • {sampleRecipe.time}</Text>
      
      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => navigation.navigate('Cooking')}
      >
        <Text style={styles.buttonText}>Start Cooking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#34C759',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});