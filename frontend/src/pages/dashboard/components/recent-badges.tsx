import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { badgesApi } from '@/lib/api/badges';
import { BadgesList } from '@/components/badges/badges-list';

export function RecentBadges() {
  const { data: badges } = useQuery({
    queryKey: ['recent-badges'],
    queryFn: badgesApi.getRecentBadges,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Recent Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <BadgesList
          badges={badges || []}
          emptyMessage="You haven't received any badges yet"
        />
      </CardContent>
    </Card>
  );
} 