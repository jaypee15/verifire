import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { router } from './router';
import { queryClient } from '@/lib/api/query-client';
import { Toaster } from '@/components/ui/toaster';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="badge-platform-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
} 