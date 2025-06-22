echo "🚀 Starting URL Shortener in DEVELOPMENT mode..."

docker-compose down

docker-compose -f docker-compose.dev.yml up --build -d

echo "✅ Development environment started!"
echo "📱 Next.js app: http://localhost:3000"
echo "🗄️  MongoDB: localhost:27017"
echo ""
echo "📝 To view logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.dev.yml down" 