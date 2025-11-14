import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@store/AuthContext';
import { Navbar } from '@components/common/Navbar';
import { Sidebar } from '@components/common/Sidebar';
import { Breadcrumb } from '@components/common/Breadcrumb';
import { LoadingSpinner } from '@components/common/LoadingSpinner';

export const DonorLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (!isAuthenticated || user?.role !== 'DONOR') return <Navigate to="/login" />;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="DONOR" />
        <main className="flex-1 p-6 bg-gray-50/50 dark:bg-slate-900/50">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
