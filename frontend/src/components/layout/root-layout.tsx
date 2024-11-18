import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { Toaster } from '../ui/toaster';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
} 