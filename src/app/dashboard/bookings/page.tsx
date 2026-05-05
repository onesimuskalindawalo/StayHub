'use client';

import { useState, useEffect } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { bookingService } from '@/services/bookingService';
import { Booking } from '@/types';
import { toast } from 'react-hot-toast';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (error: any) {
      toast.error('Failed to load residency records.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeBooking = bookings.find(b => b.status === 'approved');

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32 pt-8">
      <header className="space-y-4">
        <h2 className="text-4xl font-light tracking-tight text-black">
          Placement
        </h2>
        <p className="text-slate-400 font-medium text-lg mt-2 max-w-xl">
          The official registry of your institutional residency and historical placement portfolio.
        </p>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center py-48">
          <Loader2 className="w-6 h-6 animate-spin text-slate-50" />
        </div>
      ) : (
        <div className="space-y-32">
          {/* Active Placement */}
          <section className="space-y-12">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Active engagement</h3>
            {activeBooking ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-baseline border-b border-slate-50 pb-20">
                <div className="md:col-span-6">
                  <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em] mb-4">Current Unit</p>
                  <h4 className="text-6xl font-light text-black tracking-tighter">Suite {activeBooking.room?.roomNumber || 'Pending'}</h4>
                  <p className="text-slate-400 font-medium text-lg mt-2">Institutional Placement Portfolio</p>
                </div>
                <div className="md:col-span-6 flex gap-12">
                  <div className="space-y-2">
                    <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">Engagement Start</p>
                    <p className="font-semibold text-sm tracking-tight text-black uppercase">{activeBooking.checkInDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">Contract Conclusion</p>
                    <p className="font-semibold text-sm tracking-tight text-black uppercase">{activeBooking.checkOutDate}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-24 border border-dashed border-slate-100 text-center">
                <p className="text-slate-300 text-sm font-medium">No active residency detected.</p>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            <div className="lg:col-span-8 space-y-12">
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Archived placements</h4>
              <div className="divide-y divide-slate-50">
                {bookings.map(booking => (
                  <div key={booking.id} className="py-8 first:pt-0 flex items-center justify-between group">
                    <div className="flex items-center space-x-6">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-medium text-black">Suite Reservation</p>
                        <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mt-1">{booking.status}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-400">{booking.checkInDate}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-8">
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Management</h4>
                <div className="space-y-2">
                  <button className="w-full py-4 bg-black text-white text-[12px] font-medium tracking-wide">
                    TRANSFER REQUEST
                  </button>
                  <button className="w-full py-4 border border-slate-100 text-black text-[12px] font-medium tracking-wide">
                    EXTEND CONTRACT
                  </button>
                </div>
              </div>

              <div className="space-y-6 pt-12 border-t border-slate-50">
                <h4 className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">Included Services</h4>
                <ul className="space-y-4">
                  {['Institutional Wifi', 'Climate Management', 'Sanitization Schedule'].map(item => (
                    <li key={item} className="flex items-center text-xs text-slate-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mr-4" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
