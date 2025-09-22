#!/bin/bash

# Financial API Server Setup Script
echo "🚀 Setting up Financial API Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    echo "⚠️  Redis is not installed. Installing Redis..."
    
    # Install Redis based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install redis
        else
            echo "❌ Homebrew not found. Please install Redis manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install redis-server
    else
        echo "❌ Unsupported OS. Please install Redis manually."
        exit 1
    fi
fi

# Navigate to server directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing server dependencies..."
npm install

# Start Redis if not running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "🔄 Starting Redis server..."
    redis-server --daemonize yes
fi

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ Environment file created. Please update with your API keys."
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the server:"
echo "   npm run dev"
echo ""
echo "🔧 To start Redis manually:"
echo "   redis-server"
echo ""
echo "📊 Server will run on:"
echo "   - API Server: http://localhost:3001"
echo "   - WebSocket: ws://localhost:3002"
echo "   - Health Check: http://localhost:3001/api/health"
