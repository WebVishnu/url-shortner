import connectDB from '@/lib/mongodb';
import Url from '@/lib/url';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  await connectDB();
  const url = await Url.findOneAndUpdate(
    { shortId },
    { $inc: { visitCount: 1 }, $set: { lastVisited: new Date() } },
    { new: true }
  );
  if (!url) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">404 - Not Found</h1>
        <p>The short URL you requested does not exist.</p>
      </div>
    );
  }
  redirect(url.originalUrl);
} 