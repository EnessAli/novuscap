#!/bin/bash

# NovusCap Development Environment Startup Script
echo "🚀 Starting NovusCap Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "📦 Using unified docker-compose.yml with development configuration..."

# Load development environment and start services
docker compose --env-file .env up -d

# Check if services started successfully
if [ $? -eq 0 ]; then
    echo "✅ Development environment started successfully!"
    echo ""
    echo "🌐 Services available at:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:5002"
    echo "   Database: localhost:5432"
    echo "   Redis:    localhost:6379"
    echo ""
    echo "📊 To view logs: docker compose logs -f"
    echo "🛑 To stop: docker compose down"
else
    echo "❌ Failed to start development environment"
    exit 1
fi
