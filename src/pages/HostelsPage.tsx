import { useState, useEffect } from 'react';
import { Hotel as HotelIcon, MapPin, Building, Info, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Hostel, UserRole } from '../types';
import { useAuthStore } from '../store/authStore';
import { hostelService } from '../services/hostelService';
import { toast } from 'react-hot-toast';

export function HostelsPage() {
  const { user } = useAuthStore();
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const isAdmin = user?.role === UserRole.ADMIN;

  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    setIsLoading(true);
    try {
      const data = await hostelService.getHostels();
      setHostels(data);
    } catch (error: any) {
      toast.error('Failed to load facilities.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32 pt-8 text-black">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-light tracking-tight">Blocks</h2>
            <p className="text-slate-400 font-medium text-lg mt-2 max-w-xl">
              Catalogue of institutional residency structures and architectural deployments.
            </p>
          </div>
          {isAdmin && (
            <button className="px-8 py-3 bg-black text-white text-[12px] font-medium tracking-widest hover:bg-slate-800 transition-colors">
              NEW BLOCK
            </button>
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center py-48">
          <Loader2 className="w-6 h-6 animate-spin text-slate-100" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 pt-4">
          {hostels.map((hostel, i) => (
            <motion.div
              key={hostel.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="group border border-slate-50 flex flex-col h-full bg-white transition-all hover:bg-slate-50/10"
            >
              <div className="h-64 bg-slate-50/50 flex items-center justify-center overflow-hidden">
                <Building className="w-16 h-16 text-slate-100 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="space-y-4 mb-20">
                  <div className="flex items-center space-x-2 text-[10px] font-medium text-slate-300 uppercase tracking-widest">
                    <MapPin className="w-3 h-3" />
                    <span>{hostel.location}</span>
                  </div>
                  <h3 className="text-3xl font-medium tracking-tight h-16 overflow-hidden line-clamp-2">{hostel.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{hostel.description}</p>
                </div>
                
                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em]">INSTITUTIONAL GRADE</p>
                  <button className="text-[11px] font-semibold text-black border-b border-black pb-0.5 hover:opacity-50 transition-all">
                    EXPLORE
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
