import { Badge } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BadgesListProps {
  badges: Badge[];
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
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex items-center space-x-4 p-4 border rounded-lg"
        >
          <img
            src={badge.image}
            alt={badge.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{badge.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {badge.description}
            </p>
          </div>
          {badge.issuanceDate && (
            <div className="text-sm text-muted-foreground">
              {formatDate(badge.issuanceDate)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 