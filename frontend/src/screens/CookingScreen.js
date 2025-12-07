import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRecipeDetails } from '../services/apiService';
import VoiceControl from '../components/VoiceControl';
import GestureControl from '../components/GestureControl';
import Timer from '../components/Timer';

/**
 * CookingScreen - Step-by-step cooking guidance interface
 * Features: Voice control, timer, gesture navigation, recipe steps
 */
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

  /**
   * Load recipe details from API with fallback to mock data
   */
  const loadRecipe = async () => {
    try {
      const recipeData = await getRecipeDetails(recipeId);
      
      if (recipeData && recipeData.steps && recipeData.steps.length > 0) {
        setRecipe(recipeData);
      } else {
        setRecipe(getMockRecipe());
      }
    } catch (error) {
      console.error('Error loading recipe:', error);
      setRecipe(getMockRecipe());
    }
    setLoading(false);
  };

  /**
   * Fallback mock recipe for development and error scenarios
   */
  const getMockRecipe = () => ({
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