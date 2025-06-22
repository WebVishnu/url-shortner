import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Url from '@/lib/url';
import { nanoid } from 'nanoid';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const machineId = searchParams.get('machineId');
  
  if (!machineId) {
    return NextResponse.json({ error: 'Machine ID required' }, { status: 400 });
  }
  
  const urls = await Url.find({ machineId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ urls });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { originalUrl, machineId } = await req.json();
  
  if (!originalUrl || typeof originalUrl !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }
  
  if (!machineId || typeof machineId !== 'string') {
    return NextResponse.json({ error: 'Machine ID required' }, { status: 400 });
  }
  
  // Check if already exilsts for this machine
  let url = await Url.findOne({ originalUrl, machineId });
  if (url) {
    return NextResponse.json({ url });
  }
  
  const shortId = nanoid(7);
  url = await Url.create({ originalUrl, shortId, machineId });
  return NextResponse.json({ url });
} 