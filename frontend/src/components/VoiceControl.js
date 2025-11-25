import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendChatMessage } from '../services/apiService';
import { speakText, matchVoiceCommand } from '../services/voiceService';

export default function VoiceControl({ currentStep, setCurrentStep, totalSteps }) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceCommand = async (command) => {
    setIsProcessing(true);
    
    // First try local command matching for quick responses
    const localCommand = matchVoiceCommand(command);
    
    if (localCommand) {
      switch (localCommand) {
        case 'NEXT':
          if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
            speakText('Moving to next step');
          } else {
            speakText('This is the last step');
          }
          setIsProcessing(false);
          return;
          
        case 'PREVIOUS':
          if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            speakText('Going back to previous step');
          } else {
            speakText('This is the first step');
          }
          setIsProcessing(false);
          return;
          
        case 'REPEAT':
          speakText('Repeating current step');
          setIsProcessing(false);
          return;
      }
    }
    
    // If no local match, send to GPT for processing
    try {
      const response = await sendChatMessage(command);
      
      if (response.response) {
        speakText(response.response);
      }
    } catch (error) {
      console.error('Voice command error:', error);
      speakText('Sorry, I had trouble understanding that');
    }
    
    setIsProcessing(false);
  };

  const startListening = () => {
    setIsListening(true);
    
    // Simulate voice input for now - in real implementation would use speech-to-text
    Alert.prompt(
      'Voice Command',
      'Enter your voice command:',
      [
        { text: 'Cancel', onPress: () => setIsListening(false) },
        { 
          text: 'Send', 
          onPress: (text) => {
            setIsListening(false);
            if (text) handleVoiceCommand(text);
          }
        }
      ],
      'plain-text',
      '',
      'default'
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.voiceButton, isListening && styles.listening]}
        onPress={startListening}
      >
        <Text style={styles.buttonText}>
          {isProcessing ? 'Processing...' : isListening ? 'Listening...' : 'Voice Command'}
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