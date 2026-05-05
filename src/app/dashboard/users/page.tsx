'use client';

import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== UserRole.ADMIN) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-32 pt-8">
      <header className="space-y-4">
        <h2 className="text-4xl font-light tracking-tight text-black">Registry Users</h2>
        <p className="text-slate-400 font-medium text-lg mt-2 max-w-xl">
          Management of institutional residency identities.
        </p>
      </header>
      
      <div className="p-24 border border-dashed border-slate-100 text-center">
        <p className="text-slate-300 text-sm font-medium">User management protocols are undergoing scheduled updates.</p>
      </div>
    </div>
  );
}
