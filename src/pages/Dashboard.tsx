import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types';
import { StudentDashboard } from './StudentDashboard';
import { AdminDashboard } from './AdminDashboard';
import { WardenDashboard } from './WardenDashboard';

export function Dashboard() {
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
