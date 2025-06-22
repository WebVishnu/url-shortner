# URL Shortener

A simple and modern URL shortener built with Next.js, MongoDB, and Tailwind CSS.

## Features
- Shorten long URLs
- List all your shortened URLs
- Track visit counts and last visited time
- Redirect short URLs
- Responsive and clean UI

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env.local` file in the root directory and add your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/url-shortener
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure
- `app/page.tsx`: Homepage with URL shortener form and list
- `app/[shortId]/page.tsx`: Redirect handler for short URLs
- `app/api/urls/route.ts`: API for creating and listing URLs
- `lib/mongodb.ts`: MongoDB connection helper
- `lib/url.ts`: Mongoose model for URLs

## License
MIT
