# URL Shortener

A simple and modern URL shortener built with Next.js, MongoDB, and Tailwind CSS, containerized with Docker for easy deployment and development.

## 🚀 Quick Start with Docker

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd url-shortner
   ```

2. **Choose your mode and run**

   **For Development (with hot reload):**
   ```bash
   ./dev.sh
   ```

   **For Production:**
   ```bash
   ./prod.sh
   ```

3. **Access the application**
   - 🌐 **URL Shortener**: http://localhost:3000
   - 🗄️ **MongoDB**: localhost:27017

## 🛠️ Development vs Production

### Development Mode (`./dev.sh`)
- ✅ Hot reloading enabled
- ✅ Source code changes reflect immediately
- ✅ Development environment with Turbopack
- ✅ Volume mounts for live code updates

### Production Mode (`./prod.sh`)
- ✅ Optimized build
- ✅ Standalone output
- ✅ Production-ready environment
- ✅ Smaller container size

## 📁 Project Structure
```
url-shortner/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage with URL shortener form
│   ├── [shortId]/         # Short URL redirect handler
│   └── api/urls/          # API routes
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # MongoDB connection
│   └── url.ts            # URL model
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── Dockerfile            # Multi-stage Docker build
├── dev.sh               # Development startup script
└── prod.sh              # Production startup script
```

## 🐳 Docker Commands

### Start Services
```bash
# Development
./dev.sh

# Production
./prod.sh
```

### View Logs
```bash
# Development logs
docker-compose -f docker-compose.dev.yml logs -f

# Production logs
docker-compose logs -f
```

### Stop Services
```bash
# Development
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose down
```

### Rebuild Containers
```bash
# Development
docker-compose -f docker-compose.dev.yml up --build -d

# Production
docker-compose up --build -d
```

## 🔧 Manual Setup (Alternative)

If you prefer to run without Docker:

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MongoDB
- Install MongoDB locally or use MongoDB Atlas
- Create a `.env.local` file:
  ```
  MONGODB_URI=mongodb://localhost:27017/url-shortener
  ```

### 3. Run the development server
```bash
npm run dev
```

## 🌟 Features
- ✂️ Shorten long URLs
- 📊 Track visit counts and analytics
- 🔄 Automatic redirects
- 📱 Responsive design
- 🚀 Fast development with hot reload
- 🐳 Containerized for easy deployment

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://admin:password@mongodb:27017/url-shortener?authSource=admin` |
| `NODE_ENV` | Environment mode | `production` (prod) / `development` (dev) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🆘 Troubleshooting

### Port Already in Use
If port 3000 or 27017 is already in use:
```bash
# Stop existing containers
docker-compose down
docker-compose -f docker-compose.dev.yml down

# Or change ports in docker-compose files
```

### MongoDB Connection Issues
- Ensure MongoDB container is running: `docker-compose ps`
- Check logs: `docker-compose logs mongodb`
- Verify network connectivity between containers

### Build Issues
- Clear Docker cache: `docker system prune -a`
- Rebuild without cache: `docker-compose build --no-cache`
