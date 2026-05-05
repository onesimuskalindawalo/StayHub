'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  XCircle,
  Plus,
  DoorOpen,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Room, RoomStatus, RoomType, UserRole } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { roomService } from '@/services/roomService';
import { toast } from 'react-hot-toast';

export default function RoomsPage() {
  const { user } = useAuthStore();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setIsLoading(true);
    try {
      const data = await roomService.getRooms();
      setRooms(data);
    } catch (error: any) {
      toast.error('Failed to load suites.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdminOrWarden = user?.role === UserRole.ADMIN || user?.role === UserRole.WARDEN;

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-1">
          <h2 className="text-5xl font-extrabold tracking-[-0.04em] text-black">Active Suites</h2>
          <p className="text-slate-400 font-medium text-xl">The refined selection of living spaces.</p>
        </div>
        {isAdminOrWarden && (
          <button className="flex items-center space-x-3 px-10 py-5 bg-black text-white rounded-2xl text-[13px] font-bold tracking-tight transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-black/10">
            <Plus className="w-4 h-4" />
            <span>CREATE LISTING</span>
          </button>
        )}
      </header>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full translate-y-2">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            placeholder="Filter by suite number..."
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-3xl text-[15px] font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto translate-y-2">
          <select 
            className="flex-1 lg:w-44 px-6 py-5 bg-white border border-slate-100 rounded-3xl text-[11px] font-black uppercase tracking-widest focus:outline-none cursor-pointer shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] appearance-none text-center"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">STATUS</option>
            <option value={RoomStatus.AVAILABLE}>Available</option>
            <option value={RoomStatus.OCCUPIED}>Occupied</option>
            <option value={RoomStatus.MAINTENANCE}>Maintenance</option>
          </select>
          <select 
            className="flex-1 lg:w-44 px-6 py-5 bg-white border border-slate-100 rounded-3xl text-[11px] font-black uppercase tracking-widest focus:outline-none cursor-pointer shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] appearance-none text-center"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">TYPE</option>
            <option value={RoomType.SINGLE}>Single</option>
            <option value={RoomType.DOUBLE}>Double</option>
            <option value={RoomType.TRIPLE}>Triple</option>
            <option value={RoomType.DORM}>Dorm</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-48">
          <Loader2 className="w-10 h-10 animate-spin text-slate-200" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                key={room.id}
                className="bg-white rounded-[48px] overflow-hidden flex flex-col h-full group hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-50"
              >
                <div className="aspect-[1/1] bg-slate-50 relative overflow-hidden m-3 rounded-[40px]">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-6 opacity-[0.05] group-hover:opacity-10 group-hover:rotate-0 transition-all duration-700">
                    <DoorOpen className="w-40 h-40" />
                  </div>
                  <div className="absolute top-8 left-8">
                    <div className={`px-5 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-[0.25em] shadow-sm backdrop-blur-md ${
                       room.status === RoomStatus.AVAILABLE 
                        ? 'bg-white text-black' 
                        : 'bg-black text-white'
                    }`}>
                      {room.status}
                    </div>
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <div className="space-y-1 mb-8 text-center sm:text-left">
                    <div className="flex items-baseline justify-center sm:justify-between">
                      <h3 className="text-3xl font-black tracking-tighter text-black">
                        #{room.roomNumber}
                      </h3>
                      <p className="text-xl font-bold tracking-tight text-black ml-2">
                        {formatCurrency(room.pricePerMonth)}
                      </p>
                    </div>
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                       {room.type} • {room.capacity} BEDROOM
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-12">
                    {room.amenities.map(item => (
                      <span key={item} className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-slate-50 rounded-full text-slate-400">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex gap-2">
                      {user?.role === UserRole.STUDENT && room.status === RoomStatus.AVAILABLE ? (
                        <button className="flex-1 py-5 bg-black text-white rounded-3xl text-[13px] font-bold transform transition-all hover:scale-[0.98] active:scale-[0.95] shadow-lg shadow-black/5">
                          SECURE SUITE
                        </button>
                      ) : (
                        <button className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-3xl text-[13px] font-bold transform transition-all hover:scale-[0.98]">
                          LOCKED
                        </button>
                      )}
                      {isAdminOrWarden && (
                        <button className="aspect-square w-16 flex items-center justify-center bg-red-50 text-red-500 rounded-3xl hover:bg-red-100 transition-colors">
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
