echo "🚀 Starting URL Shortener in PRODUCTION mode..."

docker-compose down

docker-compose up --build -d

echo "✅ Production environment started!"
echo "📱 Next.js app: http://localhost:3000"
echo "🗄️  MongoDB: localhost:27017"
echo ""
echo "📝 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down" 