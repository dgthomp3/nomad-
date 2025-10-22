# NOMAD+ (Navigational Oral Module for All Dishes)

A multi-modal smart kitchen assistant that integrates voice, gesture, and augmented reality (AR) to help people cook without needing to touch a screen.

## Features

- **Voice Control**: Navigate recipes with voice commands
- **Gesture Recognition**: Mid-air gestures for hands-free interaction
- **AR Overlays**: Visual guidance for ingredients and steps
- **Smart Timers**: Voice-controlled cooking timers
- **Recipe Navigation**: Step-by-step cooking guidance

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on device:
   ```bash
   npm run ios    # for iOS
   npm run android # for Android
   ```

## Project Structure

```
src/
├── screens/          # Main app screens
├── components/       # Reusable UI components
├── services/         # Voice, gesture, AR services
├── utils/           # Helper functions
└── data/            # Recipe data and constants
```

## Tech Stack

- React Native with Expo
- React Navigation
- Expo Speech & Voice
- Expo Camera (for gesture recognition)
- Expo AV (for audio feedback)