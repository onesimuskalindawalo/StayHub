import { NextResponse } from 'next/server';
import { rooms } from '@/lib/db';

export async function GET() {
  return NextResponse.json(rooms);
}
