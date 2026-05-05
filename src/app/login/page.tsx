'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      login(response.user, response.access_token);
      toast.success(`Welcome back, ${response.user.fullName}`);
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-[400px] space-y-16"
      >
        <div className="space-y-4">
          <div className="w-10 h-10 bg-black" />
          <h1 className="text-3xl font-light tracking-tight text-black">StayHub</h1>
          <p className="text-slate-400 font-medium text-sm tracking-tight">Institutional Residency Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em] ml-0.5">
                Identity
              </label>
              <input
                type="email"
                placeholder="university.edu"
                className="w-full pb-4 bg-transparent border-b border-slate-100 text-sm font-medium focus:outline-none focus:border-black transition-all placeholder:text-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em] ml-0.5">
                Secret
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pb-4 bg-transparent border-b border-slate-100 text-sm font-medium focus:outline-none focus:border-black transition-all placeholder:text-slate-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-black text-white text-[12px] font-semibold tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'AUTHENTICATE'}
          </button>
        </form>

        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
          <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest">
            NEW RESIDENT?
          </p>
          <Link href="/register" className="text-[10px] font-bold text-black border-b border-black pb-0.5 hover:opacity-50 transition-all uppercase tracking-widest">
            INITIALIZE
          </Link>
        </div>

        <div className="space-y-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-200">MODES</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { role: 'Adm.', email: 'admin@stayhub.com' },
              { role: 'War.', email: 'warden@stayhub.com' },
              { role: 'Stu.', email: 'student@stayhub.com' },
            ].map((cred) => (
              <div key={cred.role} className="flex space-x-2 items-baseline">
                <span className="text-[9px] font-bold text-black uppercase tracking-tighter">{cred.role}</span>
                <span className="text-[9px] font-medium text-slate-300">{cred.email}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
