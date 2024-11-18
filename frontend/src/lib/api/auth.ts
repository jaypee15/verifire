import { User } from '../types';
import apiClient from './axios-client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  isIssuer?: boolean;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  register: async (userData: RegisterData) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await apiClient.get<User>('/users/profile');
    return data;
  },
}; 