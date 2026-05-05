import { NextResponse } from 'next/server';
import { rooms } from '@/lib/db';

export async function GET() {
  const report = {
    occupied: rooms.filter(r => r.status === 'occupied').length,
    available: rooms.filter(r => r.status === 'available').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };
  return NextResponse.json(report);
}
