# NOMAD+ Frontend

React Native mobile app for the NOMAD+ smart kitchen assistant.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Run on device:
   ```bash
   npm run ios    # for iOS
   npm run android # for Android
   ```

## Environment

Make sure the Go backend is running on `http://localhost:8080` before starting the frontend.

## Tech Stack

- React Native with Expo
- React Navigation
- Expo Speech & Voice
- Expo Camera (for gesture recognition)
- Expo AV (for audio feedback)