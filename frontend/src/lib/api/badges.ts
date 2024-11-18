import { Badge, BadgeAssertion } from '../types';
import apiClient from './axios-client';

export const badgesApi = {
  getStats: async () => {
    const { data } = await apiClient.get<{
      totalBadges: number;
      activeBadges: number;
      expiringSoon: number;
    }>('/badges/stats');
    return data;
  },

  getRecentBadges: async () => {
    const { data } = await apiClient.get<BadgeAssertion[]>('/badges/recent');
    return data;
  },

  getBadgeById: async (id: string) => {
    const { data } = await apiClient.get<Badge>(`/badges/${id}`);
    return data;
  },

  createBadge: async (data: CreateBadgeDto) => {
    const { data: response } = await apiClient.post<Badge>('/badges', data);
    return response;
  },

  getTemplates: async () => {
    const { data } = await apiClient.get<Badge[]>('/badges/templates');
    return data;
  },

  createFromTemplate: async (templateId: string, customizations: Partial<CreateBadgeDto>) => {
    const { data } = await apiClient.post<Badge>(`/badges/templates/${templateId}/create`, customizations);
    return data;
  },

  getActiveBadges: async () => {
    const { data } = await apiClient.get<BadgeAssertion[]>('/badges/active');
    return data;
  },

  getExpiredBadges: async () => {
    const { data } = await apiClient.get<BadgeAssertion[]>('/badges/expired');
    return data;
  },

  verifyBadge: async (verificationId: string) => {
    const { data } = await apiClient.get<BadgeAssertion>(`/badges/verify/${verificationId}`);
    return data;
  }
}; 