#!/bin/bash

# NovusCap Production Environment Startup Script
echo "🚀 Starting NovusCap Production Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "📦 Using unified docker-compose.yml with production configuration..."

# Load production environment and start services (including nginx)
docker compose --env-file .env.production --profile production up -d

# Check if services started successfully
if [ $? -eq 0 ]; then
    echo "✅ Production environment started successfully!"
    echo ""
    echo "🌐 Services available at:"
    echo "   Frontend: http://localhost (via Nginx)"
    echo "   HTTPS:    https://localhost (via Nginx)"
    echo "   Backend:  http://localhost:5000"
    echo "   Database: localhost:5432"
    echo "   Redis:    localhost:6379 (password protected)"
    echo ""
    echo "📊 To view logs: docker compose --profile production logs -f"
    echo "🛑 To stop: docker compose --profile production down"
else
    echo "❌ Failed to start production environment"
    exit 1
fi
