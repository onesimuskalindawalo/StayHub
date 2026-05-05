'use client';

import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types';
import { StudentDashboard } from '@/components/dashboards/StudentDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { WardenDashboard } from '@/components/dashboards/WardenDashboard';

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />;
    case UserRole.WARDEN:
      return <WardenDashboard />;
    default:
      return <StudentDashboard />;
  }
}
