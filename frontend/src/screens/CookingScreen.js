import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRecipeDetails } from '../services/apiService';
import VoiceControl from '../components/VoiceControl';
import GestureControl from '../components/GestureControl';
import Timer from '../components/Timer';

export default function CookingScreen({ route }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { recipeId } = route.params || {};

  useEffect(() => {
    if (recipeId) {
      loadRecipe();
    }
  }, [recipeId]);

  const loadRecipe = async () => {
    try {
      console.log('Loading recipe details for ID:', recipeId);
      const recipeData = await getRecipeDetails(recipeId);
      
      if (recipeData && recipeData.steps && recipeData.steps.length > 0) {
        console.log('Got real recipe data:', recipeData.name);
        setRecipe(recipeData);
      } else {
        console.log('No recipe data, using fallback');
        // Fallback to mock recipe
        setRecipe({
          id: recipeId,
          name: 'Chicken Teriyaki',
          time: '30 min',
          servings: 4,
          ingredients: ['2 lbs chicken thighs', '1/4 cup soy sauce', '2 tbsp honey', '1 tbsp ginger', '2 cloves garlic'],
          steps: [
            'Cut chicken into bite-sized pieces',
            'Mix soy sauce, honey, ginger, and garlic in a bowl',
            'Heat oil in a large pan over medium-high heat',
            'Add chicken and cook for 5-7 minutes until browned',
            'Pour sauce over chicken and simmer for 10 minutes',
            'Serve over rice and garnish with green onions'
          ]
        });
      }
    } catch (error) {
      console.error('Error loading recipe:', error);
      // Fallback on error
      setRecipe({
        id: recipeId,
        name: 'Chicken Teriyaki',
        time: '30 min',
        servings: 4,
        ingredients: ['2 lbs chicken thighs', '1/4 cup soy sauce', '2 tbsp honey', '1 tbsp ginger', '2 cloves garlic'],
        steps: [
          'Cut chicken into bite-sized pieces',
          'Mix soy sauce, honey, ginger, and garlic in a bowl',
          'Heat oil in a large pan over medium-high heat',
          'Add chicken and cook for 5-7 minutes until browned',
          'Pour sauce over chicken and simmer for 10 minutes',
          'Serve over rice and garnish with green onions'
        ]
      });
    }
    setLoading(false);
  };

  if (loading || !recipe) {
    return (
      <View style={styles.container}>
        <Text>Loading recipe...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stepNumber}>Step {currentStep + 1} of {recipe.steps.length}</Text>
      <Text style={styles.stepText}>{recipe.steps[currentStep]}</Text>
      
      <Timer />
      <VoiceControl 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        totalSteps={recipe.steps.length}
      />
      <GestureControl currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  stepNumber: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 30,
    color: '#000000',
  },
});