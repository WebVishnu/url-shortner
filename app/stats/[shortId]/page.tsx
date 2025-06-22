import connectDB from '@/lib/mongodb';
import Url from '@/lib/url';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default async function StatsPage({ params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  await connectDB();
  const url = await Url.findOne({ shortId });

  if (!url) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">404 - Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The short URL you requested does not exist.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              URL Statistics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed analytics for your shortened link
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Short URL</h2>
              <a
                href={`/${url.shortId}`}
                className="text-blue-600 hover:underline break-all font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${url.shortId}`}
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Original URL</h2>
              <p className="text-gray-600 dark:text-gray-300 break-all">{url.originalUrl}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Total Visits</h3>
                <p className="text-3xl font-bold text-blue-600">{url.visitCount || 0}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">clicks</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Created</h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">ago</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Last Visited</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  {url.lastVisited 
                    ? formatDistanceToNow(new Date(url.lastVisited), { addSuffix: true })
                    : 'Never'
                  }
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  {url.lastVisited ? 'ago' : 'no visits yet'}
                </p>
              </div>
            </div>

            {url.machineId && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Machine ID</h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-mono break-all">
                  {url.machineId}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  This URL was created on your current device
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Made with ❤️ by Vishnu Goswami
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 