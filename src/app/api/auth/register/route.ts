import { NextResponse } from 'next/server';
import { users } from '@/lib/db';
import { UserRole } from '@/types';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newUser = { ...data, id: String(users.length + 1), role: UserRole.STUDENT, isActive: true };
    users.push(newUser);
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
