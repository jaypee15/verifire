import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsApi } from '@/lib/api/analytics';
import { BadgesList } from '@/components/badges/badges-list';

export function IssuerDashboard() {
  const { data: analytics } = useQuery({
    queryKey: ['issuer-analytics'],
    queryFn: analyticsApi.getIssuerAnalytics,
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Issuances</CardTitle>
          </CardHeader>
          <CardContent>
            <BadgesList
              badges={analytics?.recentIssuances || []}
              emptyMessage="No recent badge issuances"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <BadgesList
              badges={analytics?.popularTemplates || []}
              emptyMessage="No badge templates created yet"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 