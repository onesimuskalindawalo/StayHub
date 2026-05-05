import { api } from './api';
import { User } from '../types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  
  getUser: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  
  createUser: async (data: any): Promise<User> => {
    const response = await api.post<User>('/users', data);
    return response.data;
  },
  
  updateUser: async (id: string, data: any): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },
  
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
  
  getUserFines: async (id: string): Promise<any[]> => {
    const response = await api.get(`/users/${id}/fines`);
    return response.data;
  },
  
  getUserHostel: async (id: string): Promise<any> => {
    const response = await api.get(`/users/${id}/hostel`);
    return response.data;
  },
  
  getUserReservations: async (id: string): Promise<any[]> => {
    const response = await api.get(`/users/${id}/reservations`);
    return response.data;
  }
};
