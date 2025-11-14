import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DonorLayout } from '@/layouts/DonorLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Lazy load pages
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Lazy components
const Home = lazy(() => import('@/pages/public/Home'));
const Login = lazy(() => import('@/pages/public/Login'));
const Register = lazy(() => import('@/pages/public/Register'));
const About = lazy(() => import('@/pages/public/About'));
const Contact = lazy(() => import('@/pages/public/Contact'));
const ForgotPassword = lazy(() => import('@/pages/public/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/public/ResetPassword'));

const DonorDashboard = lazy(() => import('@/pages/donor/Dashboard'));
const Profile = lazy(() => import('@/pages/donor/Profile'));
const Eligibility = lazy(() => import('@/pages/donor/Eligibility'));
const NewRequest = lazy(() => import('@/pages/donor/NewRequest'));
const DonationHistory = lazy(() => import('@/pages/donor/DonationHistory'));

const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const ManageDonors = lazy(() => import('@/pages/admin/ManageDonors'));
const ApproveRequests = lazy(() => import('@/pages/admin/ApproveRequests'));
const ManageInventory = lazy(() => import('@/pages/admin/ManageInventory'));
const AuditLog = lazy(() => import('@/pages/admin/AuditLog'));
const Settings = lazy(() => import('@/pages/admin/Settings'));

// Wrapper for lazy loaded components
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner fullScreen />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { 
        index: true, 
        element: <LazyWrapper><Home /></LazyWrapper> 
      },
      { 
        path: 'about', 
        element: <LazyWrapper><About /></LazyWrapper> 
      },
      { 
        path: 'contact', 
        element: <LazyWrapper><Contact /></LazyWrapper> 
      },
      { 
        path: 'login', 
        element: <LazyWrapper><Login /></LazyWrapper> 
      },
      { 
        path: 'register', 
        element: <LazyWrapper><Register /></LazyWrapper> 
      },
      { 
        path: 'forgot-password', 
        element: <LazyWrapper><ForgotPassword /></LazyWrapper> 
      },
      { 
        path: 'reset-password', 
        element: <LazyWrapper><ResetPassword /></LazyWrapper> 
      },
    ],
  },
  {
    path: '/donor',
    element: <DonorLayout />,
    children: [
      { 
        path: 'dashboard', 
        element: <LazyWrapper><DonorDashboard /></LazyWrapper> 
      },
      { 
        path: 'profile', 
        element: <LazyWrapper><Profile /></LazyWrapper> 
      },
      { 
        path: 'eligibility', 
        element: <LazyWrapper><Eligibility /></LazyWrapper> 
      },
      { 
        path: 'new-request', 
        element: <LazyWrapper><NewRequest /></LazyWrapper> 
      },
      { 
        path: 'history', 
        element: <LazyWrapper><DonationHistory /></LazyWrapper> 
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { 
        path: 'dashboard', 
        element: <LazyWrapper><AdminDashboard /></LazyWrapper> 
      },
      { 
        path: 'donors', 
        element: <LazyWrapper><ManageDonors /></LazyWrapper> 
      },
      { 
        path: 'requests', 
        element: <LazyWrapper><ApproveRequests /></LazyWrapper> 
      },
      { 
        path: 'inventory', 
        element: <LazyWrapper><ManageInventory /></LazyWrapper> 
      },
      { 
        path: 'audit-logs', 
        element: <LazyWrapper><AuditLog /></LazyWrapper> 
      },
      { 
        path: 'settings', 
        element: <LazyWrapper><Settings /></LazyWrapper> 
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
