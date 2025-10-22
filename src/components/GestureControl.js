import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GestureControl({ currentStep, setCurrentStep }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gestureText}>Gesture Recognition Active</Text>
      <Text style={styles.instructions}>
        Wave right: Next step{'\n'}
        Wave left: Previous step{'\n'}
        Palm up: Pause
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5EA',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  gestureText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});