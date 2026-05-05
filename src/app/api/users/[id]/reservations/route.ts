import { NextResponse } from 'next/server';
import { bookings } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userBookings = bookings.filter(b => b.userId === id);
  return NextResponse.json(userBookings);
}
