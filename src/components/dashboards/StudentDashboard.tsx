'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { 
  formatCurrency
} from '@/lib/utils';
import { motion } from 'motion/react';
import { bookingService } from '@/services/bookingService';
import { paymentService } from '@/services/paymentService';
import { Booking, Payment } from '@/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export function StudentDashboard() {
  const { user } = useAuthStore();
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [bookingsData, paymentsData] = await Promise.all([
        bookingService.getBookings(user?.id),
        paymentService.getPayments(user?.id)
      ]);
      
      const active = bookingsData.find(b => b.status === 'approved');
      setActiveBooking(active || null);
      setPayments(paymentsData);
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-48">
        <Loader2 className="w-6 h-6 animate-spin text-slate-100" />
      </div>
    );
  }

  const stats = [
    { name: 'Stay Status', value: activeBooking ? 'Approved' : 'No Active Stay', color: activeBooking ? 'text-green-500' : 'text-slate-300' },
    { name: 'Room Assigned', value: activeBooking ? `Suite ${activeBooking.roomId}` : 'Pending', color: 'text-slate-900' },
    { name: 'Total Contributed', value: formatCurrency(payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)), color: 'text-slate-900' },
    { name: 'Check-in', value: activeBooking?.checkInDate || 'N/A', color: 'text-slate-900' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32 pt-8">
      <header className="space-y-4">
        <h2 className="text-4xl font-light tracking-tight text-black">
          Welcome, <span className="font-semibold">{user?.fullName?.split(' ')[0]}</span>.
        </h2>
        <p className="text-slate-400 font-medium text-lg max-w-xl">
          Everything is in order. Your institutional residency status is {activeBooking ? 'active and verified' : 'under review'} for the current semester.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="p-8 border border-slate-50 relative group"
          >
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] mb-4">{stat.name}</p>
            <p className={`text-2xl font-semibold tracking-tight ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        {/* Recent Notifications */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center justify-between">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Journal</h3>
            <button className="text-[11px] font-medium text-slate-400 hover:text-black transition-colors">
              VIEW ALL
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { title: 'Laundry Maintenance', time: '2h ago', msg: 'Laundry facilities offline for scheduled maintenance.' },
              { title: 'Payment Confirmed', time: 'Yesterday', msg: 'Term contributions have been successfully processed.' },
              { title: 'Guest Protocol', time: '2d ago', msg: 'Visitation hours updated for the semester period.' },
            ].map((note, i) => (
              <div key={i} className="py-10 first:pt-0 group border-slate-50">
                <div className="flex justify-between items-baseline mb-3">
                  <p className="text-lg font-medium text-black">{note.title}</p>
                  <span className="text-[10px] font-medium text-slate-300 uppercase tracking-wider">{note.time}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">{note.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-8">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Operations</h3>
          <div className="space-y-2">
            <Link href="/dashboard/rooms" className="block w-full py-4 px-6 bg-black text-white text-[12px] font-medium tracking-wide transition-all hover:bg-slate-800 text-center">
              BOOK NEW SUITE
            </Link>
            <Link href="/dashboard/payments" className="block w-full py-4 px-6 border border-slate-100 text-black text-[12px] font-medium tracking-wide transition-all hover:bg-slate-50 text-center">
              FINANCIAL LOG
            </Link>
            <button className="w-full py-4 px-6 border border-slate-100 text-black text-[12px] font-medium tracking-wide transition-all hover:bg-slate-50">
              PROTOCOL SUPPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
