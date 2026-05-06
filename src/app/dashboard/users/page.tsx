'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { User, UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/userService';
import { toast } from 'react-hot-toast';
import { Loader2, User as UserIcon, Shield, GraduationCap, MoreHorizontal, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export default function UsersPage() {
  const { user: currentUser } = useAuthStore();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.role !== UserRole.ADMIN) {
      router.push('/dashboard');
      return;
    }
    loadUsers();
  }, [currentUser, router]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error('Failed to access identity registry.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return <Shield className="w-4 h-4 text-slate-400" />;
      case UserRole.WARDEN: return <UserIcon className="w-4 h-4 text-slate-400" />;
      default: return <GraduationCap className="w-4 h-4 text-slate-400" />;
    }
  };

  const stats = [
    { label: 'Total Registry', value: users.length },
    { label: 'Verified Residents', value: users.filter(u => u.role === UserRole.STUDENT).length },
    { label: 'Authority Nodes', value: users.filter(u => u.role !== UserRole.STUDENT).length },
    { label: 'Active Sessions', value: users.filter(u => u.isActive).length },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32 pt-8 text-black">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-light tracking-tight">Identity Registry</h2>
            <p className="text-slate-400 font-medium text-lg mt-2 max-w-xl">
              Centralized management of institutional residency identities and authority parameters.
            </p>
          </div>
          <button className="flex items-center space-x-2 px-8 py-3 bg-black text-white text-[12px] font-medium tracking-widest hover:bg-slate-800 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>INITIALIZE ACCOUNT</span>
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center py-48">
          <Loader2 className="w-6 h-6 animate-spin text-slate-100" />
        </div>
      ) : (
        <div className="space-y-24">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-slate-50 pb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <p className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <section className="space-y-12">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-300">Registered nodes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="pb-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest w-1/3">Identity</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Authority</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Protocol</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((u, i) => (
                    <motion.tr 
                      key={u.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="group hover:bg-slate-50/30 transition-colors"
                    >
                      <td className="py-8">
                        <div className="flex items-center space-x-6">
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 font-bold text-xs border border-slate-100">
                            {u.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-black tracking-tight">{u.fullName}</p>
                            <p className="text-xs text-slate-300 font-medium mt-1">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-slate-50 rounded-md">
                            {getRoleIcon(u.role)}
                          </div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{u.role}</span>
                        </div>
                      </td>
                      <td className="py-8">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                          u.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {u.isActive ? 'Verified' : 'Suspended'}
                        </span>
                      </td>
                      <td className="py-8 text-right">
                        <button className="p-2 text-slate-200 hover:text-black transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
