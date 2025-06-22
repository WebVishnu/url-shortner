import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Url from '@/lib/url';

export async function GET(req: NextRequest, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  await connectDB();
  const url = await Url.findOne({ shortId });
  if (!url) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ url });
} 