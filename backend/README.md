# NOMAD+ Backend

Go API server that integrates GPT-4o mini with Spoonacular for conversational cooking assistance.

## Setup

1. Install Go dependencies:
   ```bash
   go mod tidy
   ```

2. Add API keys to `.env`:
   ```
   OPENAI_API_KEY=your_openai_api_key
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   PORT=8080
   ```

3. Start server:
   ```bash
   go run .
   ```

## API Endpoints

- `POST /api/chat` - Conversational AI for cooking assistance
- `GET /api/recipes/search?q={query}` - Search recipes
- `GET /api/recipes/{id}` - Get recipe details

## Tech Stack

- Go with Gin framework
- OpenAI GPT-4o mini
- Spoonacular Recipe API
- RESTful API architecture