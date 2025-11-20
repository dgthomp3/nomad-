#!/bin/bash

echo "🚀 Starting NOMAD+ Development Environment..."

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install backend dependencies
echo "📦 Installing Go dependencies..."
cd backend && go mod tidy && cd ..

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Start both services
echo "🔥 Starting backend and frontend..."
npx concurrently \
    --names "BACKEND,FRONTEND" \
    --prefix-colors "blue,green" \
    "cd backend && go run ." \
    "cd frontend && npm run ios"