'use client';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { getOrCreateMachineId } from '@/lib/fingerprint';

interface Url {
  _id: string;
  originalUrl: string;
  shortId: string;
  machineId: string;
  createdAt: string;
  visitCount: number;
  lastVisited?: string;
}

async function fetchUrls(machineId: string) {
  console.log('Fetching URLs for machineId:', machineId);
  const res = await fetch(`/api/urls?machineId=${machineId}`);
  const data = await res.json();
  console.log('Fetched URLs:', data);
  return data;
}

async function createShortUrl(originalUrl: string, machineId: string) {
  console.log('Creating short URL for machineId:', machineId);
  const res = await fetch('/api/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl, machineId }),
  });
  const data = await res.json();
  console.log('Created URL response:', data);
  return data;
}

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);
  const [machineId, setMachineId] = useState<string | null>(null);
  const [isLoadingMachine, setIsLoadingMachine] = useState(true);

  useEffect(() => {
    const initializeMachine = async () => {
      try {
        const id = await getOrCreateMachineId();
        console.log('Generated/Retrieved machineId:', id);
        setMachineId(id);
        const data = await fetchUrls(id);
        setUrls(data.urls || []);
      } catch (error) {
        console.error('Failed to initialize machine ID:', error);
        toast.error('Failed to initialize. Please refresh the page.');
      } finally {
        setIsLoadingMachine(false);
      }
    };

    initializeMachine();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!machineId) {
      toast.error('Machine ID not ready. Please wait...');
      return;
    }

    setLoading(true);
    const data = await createShortUrl(originalUrl, machineId);
    setLoading(false);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success('Short URL created!');
      setUrls([data.url, ...urls]);
      setOriginalUrl('');
    }
  };

  if (isLoadingMachine) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Toaster />
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            URL Shortener
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Shorten your links instantly • No signup required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-xl mb-8">
          <input
            type="url"
            required
            placeholder="Paste your long URL here..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={originalUrl}
            onChange={e => setOriginalUrl(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 font-medium"
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        <div className="w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Your Shortened URLs</h2>
          <ul className="space-y-3">
            {urls.length === 0 && (
              <li className="text-gray-500 text-center py-8">
                <div className="text-6xl mb-4">🔗</div>
                <p>No URLs yet. Create your first short link!</p>
              </li>
            )}
            {urls.map((url: Url) => (
              <li key={url.shortId} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex-1">
                    <a
                      href={`/${url.shortId}`}
                      className="text-blue-600 hover:underline break-all font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${typeof window !== 'undefined' ? window.location.origin : ''}/${url.shortId}`}
                    </a>
                    <div className="text-xs text-gray-500 mt-1 break-all">{url.originalUrl}</div>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center gap-3">
                    <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {url.visitCount || 0} visits
                    </span>
                    <Link
                      href={`/stats/${url.shortId}`}
                      className="text-xs text-blue-600 hover:underline bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded"
                    >
                      Stats
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Made with ❤️ by Vishnu Goswami</h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              A modern URL shortener built with Next.js, MongoDB, and machine fingerprinting.
              No accounts needed - your links are automatically saved to your device.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href="https://github.com/WebVishnu"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span>👨‍💻</span>
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vishnu-goswami/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com/VishnuTweets_"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900/20 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-900/30 transition-colors"
              >
                <span>🐦</span>
                <span>Twitter</span>
              </a>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                💡 Want to contribute?
                <a
                  href="https://github.com/WebVishnu/url-shortner"
                  target="_blank"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Star this project on GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
