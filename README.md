# NOMAD+ (Navigational Oral Module for All Dishes)

A multi-modal smart kitchen assistant that integrates voice control and ingredient-based recipe search to help people cook hands-free. Features conversational AI powered by GPT-4o mini and real recipe data from Spoonacular API.

## Features

- **Ingredient-Based Search**: Find recipes by available ingredients
- **Voice Control**: Navigate recipes and search with voice commands
- **Smart Timers**: Built-in cooking timers with start/pause/reset
- **Step-by-Step Guidance**: Clear cooking instructions with progress tracking
- **Conversational AI**: Natural language processing for cooking assistance
- **Recipe Database**: 365,000+ recipes from Spoonacular API
- **Kitchen-Friendly UI**: Orange/gray/green color scheme optimized for cooking environments

## Getting Started

### Prerequisites
- Node.js (v16+)
- Go (v1.24+)
- Expo CLI (`npm install -g @expo/cli`)

### Quick Start

1. **Configure API Keys** - Create `backend/.env` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   PORT=3001
   ```

2. **Start Backend**:
   ```bash
   cd backend
   go mod tidy
   go run .
   ```

3. **Start Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Test on Device**: Use Expo Go app to scan QR code

### Network Configuration

**Important**: Update the IP address in `frontend/src/services/apiService.js` to match your development machine:

```javascript
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3001/api';
```

Find your IP with: `ifconfig | grep "inet " | grep -v 127.0.0.1`

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
│   │   └── utils/      # Helper functions
│   ├── App.js          # Main app component
│   └── package.json    # Frontend dependencies
```

## Tech Stack

**Frontend:**
- React Native with Expo (managed workflow)
- React Navigation for screen management
- Expo Speech for voice feedback
- Ionicons for UI icons
- Custom timer and voice control components

**Backend:**
- Go 1.24 with Gin web framework
- OpenAI GPT-4o mini for conversational AI
- Spoonacular API for recipe data
- RESTful API with CORS support
- Environment-based configuration

## API Endpoints

- `POST /api/chat` - Conversational AI for cooking assistance
- `GET /api/recipes/search?q={ingredients}` - Search recipes by ingredients
- `GET /api/recipes/{id}` - Get detailed recipe information
- `GET /health` - Health check endpoint

## Development Notes

### Known Limitations
- Voice recognition uses text input simulation in Expo Go (native voice requires custom dev build)
- Timer component requires manual start/stop (no automatic recipe timing)
- Gesture recognition framework in place but not fully implemented
- Network IP address needs manual configuration for different environments

### Security
- All dependencies updated to latest secure versions
- API keys properly environment-configured
- CORS enabled for cross-origin requests

### Color Palette
- Primary: Orange (`#FF6B35`)
- Secondary: Gray (`#6B6B6B`) 
- Accent: Fresh Green (`#27AE60`)
- Background: Warm Cream (`#FFF8F0`)

## Architecture

```
┌─────────────────┐    HTTP/JSON    ┌──────────────────┐
│  React Native   │◄──────────────►│   Go Backend     │
│   Frontend      │                 │                  │
│                 │                 │ ┌──────────────┐ │
│ ┌─────────────┐ │                 │ │ Spoonacular  │ │
│ │ Voice Input │ │                 │ │     API      │ │
│ └─────────────┘ │                 │ └──────────────┘ │
│ ┌─────────────┐ │                 │ ┌──────────────┐ │
│ │   Timer     │ │                 │ │   OpenAI     │ │
│ └─────────────┘ │                 │ │   GPT-4o     │ │
│ ┌─────────────┐ │                 │ └──────────────┘ │
│ │Recipe Search│ │                 │                  │
│ └─────────────┘ │                 └──────────────────┘
└─────────────────┘
```