'use client';

import { useState, useEffect } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { bookingService } from '@/services/bookingService';
import { Booking } from '@/types';
import { toast } from 'react-hot-toast';

export default function AdminBookingsPage() {
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

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32 pt-8">
      <header className="space-y-4">
        <h2 className="text-4xl font-light tracking-tight text-black">
          Global Placements
        </h2>
        <p className="text-slate-400 font-medium text-lg mt-2 max-w-xl">
          Complete registry of all institutional residency engagements.
        </p>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center py-48">
          <Loader2 className="w-6 h-6 animate-spin text-slate-50" />
        </div>
      ) : (
        <div className="space-y-12">
          <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Registry list</h4>
          <div className="divide-y divide-slate-50">
            {bookings.map(booking => (
              <div key={booking.id} className="py-8 first:pt-0 flex items-center justify-between group">
                <div className="flex items-center space-x-6">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Suite Reservation #{booking.id}</p>
                    <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mt-1">User ID: {booking.userId} • {booking.status}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-400">{booking.checkInDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
