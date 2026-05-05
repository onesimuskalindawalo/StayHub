import { NextResponse } from 'next/server';
import { rooms } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const room = rooms.find(r => r.id === id);
  if (!room) return NextResponse.json({ message: 'Room not found' }, { status: 404 });
  return NextResponse.json(room);
}
