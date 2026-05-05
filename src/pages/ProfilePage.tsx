import { useState, useEffect } from 'react';
import { User, Mail, Shield, Calendar, MapPin, Camera, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export function ProfilePage() {
  const { user, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const data = await authService.getMe();
      login(data, localStorage.getItem('token') || ''); // Refresh store
    } catch (error) {
      console.error('Failed to sync profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-24 pb-32 pt-8 text-black">
      <header className="space-y-4">
        <h2 className="text-4xl font-light tracking-tight">Identity</h2>
        <p className="text-slate-400 font-medium text-lg max-w-xl">
          The verified institutional profile and authority parameters associated with your residency.
        </p>
      </header>

      <div className="space-y-32">
        <section className="border-b border-slate-50 pb-20">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-48 h-48 bg-slate-50 flex items-center justify-center text-5xl font-light text-black border border-slate-100">
              {user?.fullName?.charAt(0) || '?'}
            </div>
            <div className="text-center md:text-left space-y-6">
              <div>
                <h3 className="text-5xl font-light tracking-tighter">{user?.fullName}</h3>
                <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.3em] mt-3">
                  {user?.role} • CORE IDENTITY
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">Registry</p>
                  <p className="font-semibold text-xs tracking-tight">ACTIVE STATUS</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">Auth Node</p>
                  <p className="font-semibold text-xs tracking-tight">INSTITUTIONAL GRADE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Credentials</h4>
            <div className="space-y-12">
              <div>
                <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-2">EMAIL ARCHIVE</p>
                <p className="text-xl font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest mb-2">IDENTIFIER</p>
                <p className="text-xl font-medium uppercase tracking-tighter">#{user?.id.substring(0, 10)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Operations</h4>
            <div className="space-y-4">
              <button className="w-full py-4 px-6 border border-slate-100 text-[12px] font-medium tracking-wide hover:bg-slate-50 transition-colors">
                MODIFY SECRET
              </button>
              <button className="w-full py-4 px-6 bg-black text-white text-[12px] font-medium tracking-wide hover:bg-slate-800 transition-colors">
                REFRESH NODE
              </button>
              <p className="text-[10px] text-center text-slate-300 font-medium pt-4 uppercase tracking-[0.2em]">
                Secure Session Active
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="p-8 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[32px]">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{label}</p>
      <div className="flex items-center text-slate-900 dark:text-white">
        <Icon className="w-4 h-4 mr-3 opacity-50" />
        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
}
