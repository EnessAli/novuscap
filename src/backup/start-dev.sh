#!/bin/bash
# NovusCap Docker Development Script

echo "🚀 NovusCap Development Environment Starter"
echo "============================================"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Please copy .env.example to .env and configure your environment variables."
    exit 1
fi

echo "📋 Loading environment variables from .env..."
source .env

echo "🐳 Starting development environment with Docker Compose..."
echo "Backend will be available at: http://localhost:5002"
echo "Frontend will be available at: http://localhost:3000"
echo "Database will be available at: localhost:5432"

# Start services
docker compose --env-file .env up --build -d

echo ""
echo "✅ Services started successfully!"
echo ""
echo "📊 Service Status:"
docker compose ps

echo ""
echo "📝 Useful Commands:"
echo "  - View logs: docker compose logs -f [service_name]"
echo "  - Stop services: docker compose down"
echo "  - Rebuild: docker compose up --build"
echo "  - Access database: docker compose exec postgres psql -U postgres -d novuscapdb"
echo ""
echo "🎯 Ready for development!"
