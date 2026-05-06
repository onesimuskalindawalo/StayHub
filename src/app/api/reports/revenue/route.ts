import { NextResponse } from 'next/server';
import { payments } from '@/lib/db';

export async function GET() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  
  const revenueByMonth = months.map((month, index) => {
    const monthNum = (index + 1).toString().padStart(2, '0');
    const monthlyTotal = payments
      .filter(p => p.status === 'paid' && p.paymentDate?.startsWith(`${currentYear}-${monthNum}`))
      .reduce((sum, p) => sum + p.amount, 0);
    
    return { name: month, revenue: monthlyTotal };
  });

  // Filter out months with zero revenue if they are in the future, but keep the first 6 or 12?
  // Let's just return all for the chart.
  return NextResponse.json(revenueByMonth);
}
