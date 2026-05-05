import { api } from './api';
import { User } from '../types';

export interface LoginResponse {
  user: User;
  access_token: string;
}

export const authService = {
  login: async (credentials: any): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data: any): Promise<User> => {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
  
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  }
};
