import { Badge } from '../types';
import apiClient from './axios-client';

interface IssuerAnalytics {
  recentIssuances: Badge[];
  popularTemplates: Badge[];
  totalIssuances: number;
  activeIssuances: number;
}

export const analyticsApi = {
  getIssuerAnalytics: async () => {
    const { data } = await apiClient.get<IssuerAnalytics>('/analytics/issuer');
    return data;
  },
}; 