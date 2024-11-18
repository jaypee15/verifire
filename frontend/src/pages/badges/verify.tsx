import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { badgesApi } from '@/lib/api/badges';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

export function VerifyBadgePage() {
  const { id } = useParams<{ id: string }>();

  const { data: verification, isLoading, error } = useQuery({
    queryKey: ['verify-badge', id],
    queryFn: () => badgesApi.verifyBadge(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Verification Failed</AlertTitle>
        <AlertDescription>
          This badge could not be verified. It may have been revoked or expired.
        </AlertDescription>
      </Alert>
    );
  }

  if (!verification) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Valid Badge</AlertTitle>
        <AlertDescription>
          This badge has been verified as authentic.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Badge Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={verification.badge.image}
              alt={verification.badge.name}
              className="w-24 h-24 rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {verification.badge.name}
              </h2>
              <p className="text-muted-foreground">
                {verification.badge.description}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <h3 className="font-medium">Recipient</h3>
              <p>{verification.recipient.name}</p>
            </div>

            <div>
              <h3 className="font-medium">Issuer</h3>
              <p>{verification.issuer.name}</p>
            </div>

            <div>
              <h3 className="font-medium">Issue Date</h3>
              <p>{formatDate(verification.issuanceDate)}</p>
            </div>

            {verification.expirationDate && (
              <div>
                <h3 className="font-medium">Expiration Date</h3>
                <p>{formatDate(verification.expirationDate)}</p>
              </div>
            )}

            {verification.badge.criteria && (
              <div>
                <h3 className="font-medium">Achievement Criteria</h3>
                <p>{verification.badge.criteria.narrative}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add default export
export default VerifyBadgePage; 