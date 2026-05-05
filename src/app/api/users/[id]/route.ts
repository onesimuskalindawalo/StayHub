import { NextResponse } from 'next/server';
import { users, bookings, hostels } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = users.find(u => u.id === id);
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}
