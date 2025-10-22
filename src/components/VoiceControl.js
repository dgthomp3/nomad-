import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function VoiceControl({ currentStep, setCurrentStep }) {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setIsListening(true);
    // Voice recognition implementation will go here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.voiceButton, isListening && styles.listening]}
        onPress={startListening}
      >
        <Text style={styles.buttonText}>
          {isListening ? 'Listening...' : 'Voice Command'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  voiceButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  listening: {
    backgroundColor: '#FF6B60',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});