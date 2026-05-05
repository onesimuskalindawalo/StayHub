import { NextResponse } from 'next/server';
import { users } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = users.find(u => u.email === email);
    
    if (user) {
      // In a real app, verify password and set a real cookie/session
      return NextResponse.json({ user, access_token: 'mock-jwt-token' });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
