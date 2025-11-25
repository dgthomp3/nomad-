import * as Speech from 'expo-speech';

export const speakText = (text, options = {}) => {
  const defaultOptions = {
    language: 'en-US',
    pitch: 1.0,
    rate: 0.8,
    ...options
  };
  
  Speech.speak(text, defaultOptions);
};

export const stopSpeaking = () => {
  Speech.stop();
};

export const isSpeaking = () => {
  return Speech.isSpeakingAsync();
};

// Voice command patterns for recipe navigation
export const VOICE_COMMANDS = {
  NEXT: ['next', 'next step', 'continue', 'move on'],
  PREVIOUS: ['previous', 'back', 'go back', 'last step'],
  REPEAT: ['repeat', 'say again', 'repeat step'],
  PAUSE: ['pause', 'stop', 'wait'],
  INGREDIENTS: ['ingredients', 'what do I need', 'shopping list'],
  TIMER: ['timer', 'set timer', 'start timer'],
  HELP: ['help', 'what can you do', 'commands']
};

export const matchVoiceCommand = (input) => {
  const lowerInput = input.toLowerCase();
  
  for (const [command, patterns] of Object.entries(VOICE_COMMANDS)) {
    if (patterns.some(pattern => lowerInput.includes(pattern))) {
      return command;
    }
  }
  
  return null;
};