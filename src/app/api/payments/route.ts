import { NextResponse } from 'next/server';
import { payments } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  let filteredPayments = payments;
  
  if (userId) {
    filteredPayments = payments.filter(p => p.userId === userId);
  }

  return NextResponse.json(filteredPayments);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newPayment = {
    ...data,
    id: String(payments.length + 1),
    status: 'paid',
    paymentDate: new Date().toISOString().split('T')[0]
  };
  payments.push(newPayment);
  return NextResponse.json(newPayment);
}
