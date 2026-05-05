import { NextResponse } from 'next/server';
import { payments } from '@/lib/db';

export async function GET() {
  return NextResponse.json(payments);
}
