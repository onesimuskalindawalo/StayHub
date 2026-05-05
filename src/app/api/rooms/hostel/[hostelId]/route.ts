import { NextResponse } from 'next/server';
import { rooms } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hostelId: string }> }
) {
  const { hostelId } = await params;
  const hostelRooms = rooms.filter(r => r.hostelId === hostelId);
  return NextResponse.json(hostelRooms);
}
