import { NextResponse } from 'next/server';
import { hostels } from '@/lib/db';

export async function GET() {
  return NextResponse.json(hostels);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newHostel = { ...data, id: String(hostels.length + 1) };
    hostels.push(newHostel);
    return NextResponse.json(newHostel);
  } catch (error) {
    return NextResponse.json({ message: 'Error creating hostel' }, { status: 500 });
  }
}
