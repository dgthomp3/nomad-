import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendChatMessage } from '../services/apiService';
import { speakText, matchVoiceCommand } from '../services/voiceService';

// Fallback Voice object for Expo compatibility
const Voice = {
  isAvailable: () => Promise.resolve(false),
  start: () => Promise.resolve(),
  stop: () => Promise.resolve(),
  destroy: () => Promise.resolve(),
  removeAllListeners: () => {},
  onSpeechStart: null,
  onSpeechEnd: null,
  onSpeechResults: null,
  onSpeechError: null
};

export default function VoiceControl({ currentStep, setCurrentStep, totalSteps }) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    // Check if voice recognition is available
    Voice.isAvailable().then(available => {
      setVoiceSupported(available);
    });

    // Set up voice event listeners
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      const spokenText = event.value[0];
      console.log('Speech recognized:', spokenText);
      handleVoiceCommand(spokenText);
    }
  };

  const onSpeechError = (error) => {
    console.error('Speech recognition error:', error);
    setIsListening(false);
    speakText('Sorry, I had trouble hearing you');
  };

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

  const startListening = async () => {
    if (!voiceSupported) {
      // Fallback to text input if voice not supported
      Alert.prompt(
        'Voice Command',
        'Voice not available. Enter command:',
        [
          { text: 'Cancel', onPress: () => {} },
          { 
            text: 'Send', 
            onPress: (text) => {
              if (text) handleVoiceCommand(text);
            }
          }
        ]
      );
      return;
    }

    try {
      await Voice.start('en-US');
      speakText('Listening for your command');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
    setIsListening(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.voiceButton, isListening && styles.listening]}
        onPress={isListening ? stopListening : startListening}
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