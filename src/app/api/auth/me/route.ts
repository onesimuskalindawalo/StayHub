import { NextResponse } from 'next/server';
import { users } from '@/lib/db';

export async function GET() {
  // Mock 'me' endpoint - returns the first user or a dummy
  // In a real app, this would check session/cookie
  return NextResponse.json(users[0]);
}
