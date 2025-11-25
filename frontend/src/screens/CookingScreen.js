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
    const recipeData = await getRecipeDetails(recipeId);
    setRecipe(recipeData);
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
    backgroundColor: '#f5f5f5',
  },
  stepNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 30,
  },
});