import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/root-layout';
import { LandingLayout } from '@/components/layout/landing-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load pages
const LandingPage = lazy(() => import('@/pages/landing').then(module => ({ default: module.default })));
const LoginPage = lazy(() => import('@/pages/auth/login').then(module => ({ default: module.default })));
const RegisterPage = lazy(() => import('@/pages/auth/register').then(module => ({ default: module.default })));
const DashboardPage = lazy(() => import('@/pages/dashboard').then(module => ({ default: module.default })));
const BadgesPage = lazy(() => import('@/pages/badges').then(module => ({ default: module.default })));
const CreateBadgePage = lazy(() => import('@/pages/badges/create').then(module => ({ default: module.default })));
const VerifyBadgePage = lazy(() => import('@/pages/badges/verify').then(module => ({ default: module.default })));
const NotFoundPage = lazy(() => import('@/pages/404').then(module => ({ default: module.default })));

export const router = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/badges',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <BadgesPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/badges/create',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <CreateBadgePage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/badges/verify/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <VerifyBadgePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]); 