import { NextResponse } from 'next/server';
import { bookings } from '@/lib/db';

export async function GET() {
  return NextResponse.json(bookings);
}
