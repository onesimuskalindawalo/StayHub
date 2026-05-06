import { NextResponse } from 'next/server';
import { bookings } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  let filteredBookings = bookings;
  
  if (userId) {
    filteredBookings = bookings.filter(b => b.userId === userId);
  }

  return NextResponse.json(filteredBookings);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newBooking = {
    ...data,
    id: String(bookings.length + 1),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  return NextResponse.json(newBooking);
}
