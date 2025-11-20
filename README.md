# NOMAD+ (Navigational Oral Module for All Dishes)

A multi-modal smart kitchen assistant that integrates voice, gesture, and augmented reality (AR) to help people cook without needing to touch a screen. Features conversational AI powered by GPT-4o mini and real recipe data from Spoonacular API.

## Features

- **Conversational AI**: Natural language recipe search and cooking guidance
- **Voice Control**: Navigate recipes with voice commands
- **Gesture Recognition**: Mid-air gestures for hands-free interaction
- **AR Overlays**: Visual guidance for ingredients and steps
- **Smart Timers**: Voice-controlled cooking timers
- **Recipe Database**: 365,000+ recipes from Spoonacular

## Getting Started

### Quick Start (One Command)

1. Create `backend/.env` file with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   PORT=8080
   ```

2. Start both backend and frontend:
   ```bash
   ./start.sh
   ```
   
   Or using npm:
   ```bash
   npm install
   npm run dev
   ```

### Manual Setup

**Backend (Go):**
```bash
cd backend
# Create .env file with API keys:
echo "OPENAI_API_KEY=your_openai_api_key" > .env
echo "SPOONACULAR_API_KEY=your_spoonacular_api_key" >> .env
echo "PORT=8080" >> .env
go mod tidy && go run .
```

**Frontend (React Native):**
```bash
cd frontend && npm install && npm start
```

**Run on device:**
```bash
cd frontend
npm run ios    # for iOS
npm run android # for Android
```

## Project Structure

```
├── backend/              # Go API server
│   ├── main.go          # Server setup
│   ├── handlers.go      # API endpoints
│   ├── spoonacular.go   # Recipe API integration
│   └── .env            # API keys
├── frontend/            # React Native app
│   ├── src/
│   │   ├── screens/     # Main app screens
│   │   ├── components/  # Reusable UI components
│   │   ├── services/    # API and device services
│   │   ├── utils/      # Helper functions
│   │   └── data/       # Recipe data and constants
│   ├── App.js          # Main app component
│   └── package.json    # Frontend dependencies
```

## Tech Stack

**Frontend:**
- React Native with Expo
- React Navigation
- Expo Speech & Voice
- Expo Camera (for gesture recognition)
- Expo AV (for audio feedback)

**Backend:**
- Go with Gin framework
- OpenAI GPT-4o mini
- Spoonacular Recipe API
- RESTful API architecture

## API Endpoints

- `POST /api/chat` - Conversational AI for cooking assistance
- `GET /api/recipes/search?q={query}` - Search recipes
- `GET /api/recipes/{id}` - Get recipe details