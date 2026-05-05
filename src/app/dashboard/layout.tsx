'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Hotel, 
  DoorOpen, 
  BookOpen, 
  CreditCard, 
  Bell, 
  Users, 
  LogOut, 
  Menu, 
  X,
  User as UserIcon
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: [UserRole.STUDENT, UserRole.ADMIN, UserRole.WARDEN] },
  { name: 'Hostels', href: '/dashboard/hostels', icon: Hotel, roles: [UserRole.ADMIN, UserRole.WARDEN, UserRole.STUDENT] },
  { name: 'Rooms', href: '/dashboard/rooms', icon: DoorOpen, roles: [UserRole.ADMIN, UserRole.WARDEN] },
  { name: 'My Bookings', href: '/dashboard/bookings', icon: BookOpen, roles: [UserRole.STUDENT] },
  { name: 'All Bookings', href: '/dashboard/admin-bookings', icon: BookOpen, roles: [UserRole.ADMIN, UserRole.WARDEN] },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard, roles: [UserRole.STUDENT, UserRole.ADMIN] },
  { name: 'Users', href: '/dashboard/users', icon: Users, roles: [UserRole.ADMIN] },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon, roles: [UserRole.STUDENT, UserRole.ADMIN, UserRole.WARDEN] },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredItems = sidebarItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-white selection:bg-black selection:text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-50 transition-all duration-500">
        <div className="p-10 pb-8 flex items-center">
          <div className="w-8 h-8 bg-black rounded-lg mr-3" />
          <h1 className="text-lg font-black tracking-[-0.05em] text-black">STAYHUB</h1>
        </div>
        <nav className="flex-1 px-4 mt-8 space-y-1">
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-300",
                pathname === item.href
                  ? "bg-slate-50 text-black font-semibold"
                  : "text-slate-400 hover:text-black hover:bg-slate-50/50"
              )}
            >
              <item.icon className={cn("w-4 h-4", pathname === item.href ? "text-black" : "text-slate-300")} />
              <span className="text-[12px] uppercase tracking-wider">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-50">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-5 py-3 text-slate-400 hover:text-red-500 transition-all rounded-xl hover:bg-red-50/50"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[12px] uppercase tracking-wider">Signout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-50 flex items-center justify-between px-10 z-10">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 bg-slate-50 rounded-xl">
              <Menu className="w-4 h-4 text-black" />
            </button>
            <h1 className="ml-4 text-lg font-black tracking-tighter">STAYHUB</h1>
          </div>

          <div className="flex-1" />

          <div className="flex items-center space-x-6">
            <button className="relative p-2.5 text-slate-300 hover:text-black transition-colors rounded-xl border border-transparent hover:border-slate-50">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-black rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-black leading-none">{user?.fullName}</p>
                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-1.5 opacity-60 leading-none">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-black flex items-center justify-center text-[14px] font-black border border-slate-100">
                {user?.fullName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-10 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        </section>
      </main>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-white/90 backdrop-blur-2xl"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-80 bg-white flex flex-col shadow-2xl border-r border-slate-50"
            >
              <div className="p-10 flex items-center justify-between mb-8">
                <h1 className="text-2xl font-black tracking-tighter italic">STAYHUB</h1>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-50 rounded-2xl">
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>
              <nav className="flex-1 px-6 space-y-2">
                {filteredItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-5 px-6 py-5 rounded-[28px] transition-all duration-300",
                      pathname === item.href
                        ? "bg-black text-white shadow-2xl shadow-black/20"
                        : "text-slate-400 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-black text-sm tracking-tight uppercase">{item.name}</span>
                  </Link>
                ))}
              </nav>
              <div className="p-8 border-t border-slate-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-5 w-full px-6 py-6 text-slate-300 hover:text-red-500 transition-all rounded-[28px] hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-black text-sm tracking-tight uppercase">SECURE SIGNOUT</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
