import { Badge, BadgeAssertion } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BadgesListProps {
  badges: Badge[] | BadgeAssertion[];
  emptyMessage: string;
}

export function BadgesList({ badges, emptyMessage }: BadgesListProps) {
  if (!badges.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">{emptyMessage}</div>
    );
  }

  return (
    <div className="space-y-4">
      {badges.map((badge) => {
        const badgeData = 'badge' in badge ? badge.badge : badge;
        const issuanceDate = 'issuanceDate' in badge ? badge.issuanceDate : undefined;

        return (
          <div
            key={'id' in badge ? badge.id : badgeData.id}
            className="flex items-center space-x-4 p-4 border rounded-lg"
          >
            <img
              src={badgeData.image}
              alt={badgeData.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{badgeData.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {badgeData.description}
              </p>
            </div>
            {issuanceDate && (
              <div className="text-sm text-muted-foreground">
                {formatDate(issuanceDate)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 