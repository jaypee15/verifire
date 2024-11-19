import { Outlet } from 'react-router-dom';
import { LandingNav, Footer } from '@/components/layout';

export function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
} 