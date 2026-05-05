/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from './components/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { HostelsPage } from './pages/HostelsPage';
import { RoomsPage } from './pages/RoomsPage';
import { ProfilePage } from './pages/ProfilePage';
import { PaymentsPage } from './pages/PaymentsPage';
import { BookingsPage } from './pages/BookingsPage';
import { UserRole } from './types';

// Placeholder components for other pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-white/[0.02] rounded-[40px] border border-dashed border-slate-200 dark:border-white/10 p-12">
    <h2 className="text-2xl font-bold text-slate-400">{title}</h2>
    <p className="text-slate-500 mt-2 text-sm">Module integrity verification in progress.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/hostels" element={<HostelsPage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/admin/bookings" element={<Placeholder title="Bookings Console" />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/users" element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                    <Placeholder title="Access Control" />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={<ProfilePage />} />
                {/* Fallback for within layout */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }>
          <Route path="/*" element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
