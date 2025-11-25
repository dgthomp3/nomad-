import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function RecipeScreen({ navigation }) {
  const [recipes] = useState([
    { id: 1, name: 'Chicken Teriyaki', time: '30 min', difficulty: 'Easy' },
    { id: 2, name: 'Beef Stir Fry', time: '25 min', difficulty: 'Medium' }
  ]);

  const renderRecipe = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate('Cooking', { recipeId: item.id })}
    >
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text style={styles.recipeInfo}>{item.time} • {item.difficulty}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: '#666',
  },
});