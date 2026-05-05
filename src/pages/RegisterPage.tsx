import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../services/authService';
import { Lock, Mail, Loader2, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.register({ fullName, email, password });
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account. Please try again.');
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
          <p className="text-slate-400 font-medium text-sm tracking-tight">Identity Initialization Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em] ml-0.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Institutional Name"
                className="w-full pb-4 bg-transparent border-b border-slate-100 text-sm font-medium focus:outline-none focus:border-black transition-all placeholder:text-slate-200"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em] ml-0.5">
                Institutional Email
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
                Secure Key
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
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'INITIALIZE'}
          </button>
        </form>

        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
          <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest">
            ALREADY REGISTERED?
          </p>
          <Link to="/login" className="text-[10px] font-bold text-black border-b border-black pb-0.5 hover:opacity-50 transition-all uppercase tracking-widest">
            SIGN IN
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
