export interface User {
  id: string;
  email: string;
  name: string;
  isIssuer: boolean;
  issuerProfile?: {
    organizationName: string;
    website?: string;
    description?: string;
  };
}

export interface Badge {
  id: string;
  type: string[];
  name: string;
  description?: string;
  image: string;
  issuer: {
    id: string;
    type: string[];
    name: string;
    url?: string;
    email?: string;
  };
  criteria?: {
    narrative?: string;
    achievementType?: string;
  };
  tags?: string[];
  isTemplate: boolean;
  validityPeriod?: number;
}

export interface BadgeAssertion {
  id: string;
  type: string[];
  badge: Badge;
  recipient: User;
  issuer: User;
  issuanceDate: string;
  expirationDate?: string;
  revoked: boolean;
  revocationReason?: string;
  verificationId: string;
} 