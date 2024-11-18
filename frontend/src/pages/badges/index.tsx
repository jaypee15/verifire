import { useQuery } from '@tanstack/react-query';
import { badgesApi } from '@/lib/api/badges';
import { BadgesList } from '@/components/badges/badges-list';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function BadgesPage() {
  const { data: activeBadges, isLoading: loadingActive } = useQuery({
    queryKey: ['badges', 'active'],
    queryFn: badgesApi.getActiveBadges,
  });

  const { data: expiredBadges, isLoading: loadingExpired } = useQuery({
    queryKey: ['badges', 'expired'],
    queryFn: badgesApi.getExpiredBadges,
  });

  if (loadingActive || loadingExpired) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">My Badges</h1>
        <p className="text-muted-foreground">
          View and manage your earned badges
        </p>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Badges</TabsTrigger>
          <TabsTrigger value="expired">Expired Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <BadgesList
            badges={activeBadges || []}
            emptyMessage="No active badges found"
          />
        </TabsContent>
        <TabsContent value="expired">
          <BadgesList
            badges={expiredBadges || []}
            emptyMessage="No expired badges"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Add default export
export default BadgesPage; 