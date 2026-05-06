import { NextResponse } from 'next/server';
import { rooms } from '@/lib/db';
import { RoomStatus, RoomType } from '@/types';

export async function GET() {
  return NextResponse.json(rooms);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newRoom = {
      id: String(rooms.length + 1),
      roomNumber: data.roomNumber,
      type: data.type || RoomType.SINGLE,
      capacity: parseInt(data.capacity) || 1,
      pricePerMonth: parseFloat(data.pricePerMonth) || 0,
      status: RoomStatus.AVAILABLE,
      amenities: data.amenities || [],
      isAvailable: true,
      hostelId: data.hostelId || '1'
    };
    rooms.push(newRoom);
    return NextResponse.json(newRoom);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
