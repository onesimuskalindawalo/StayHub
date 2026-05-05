import { api } from './api';
import { Notification } from '../types';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
  },
  
  createNotification: async (data: any): Promise<Notification> => {
    const response = await api.post<Notification>('/notifications', data);
    return response.data;
  }
};
