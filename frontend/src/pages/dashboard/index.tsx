import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/auth-store';
import { DashboardStats } from './components/dashboard-stats';
import { RecentBadges } from './components/recent-badges';
import { IssuerDashboard } from './components/issuer-dashboard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { authApi } from '@/lib/api/auth';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getCurrentUser,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome, {profile?.name}</h1>
        <p className="text-muted-foreground">
          Manage your badges and achievements
        </p>
      </div>

      <DashboardStats />
      
      {user?.isIssuer ? (
        <IssuerDashboard />
      ) : (
        <RecentBadges />
      )}
    </div>
  );
}

// Add default export
export default DashboardPage; 