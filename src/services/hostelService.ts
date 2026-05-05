import { api } from './api';
import { Hostel } from '../types';

export const hostelService = {
  getHostels: async (): Promise<Hostel[]> => {
    const response = await api.get<Hostel[]>('/hostel');
    return response.data;
  },
  
  createHostel: async (data: any): Promise<Hostel> => {
    const response = await api.post<Hostel>('/hostel', data);
    return response.data;
  },
  
  updateHostel: async (data: any): Promise<Hostel> => {
    const response = await api.put<Hostel>('/hostel', data);
    return response.data;
  },
  
  deleteHostel: async (id: string): Promise<void> => {
    await api.delete('/hostel', { data: { id } });
  }
};
