import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VoiceControl from '../components/VoiceControl';
import GestureControl from '../components/GestureControl';
import Timer from '../components/Timer';

export default function CookingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "Boil water in a large pot",
    "Cook pasta according to package directions",
    "Beat eggs with cheese in a bowl",
    "Drain pasta and mix with egg mixture",
    "Serve immediately"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.stepNumber}>Step {currentStep + 1} of {steps.length}</Text>
      <Text style={styles.stepText}>{steps[currentStep]}</Text>
      
      <Timer />
      <VoiceControl currentStep={currentStep} setCurrentStep={setCurrentStep} />
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