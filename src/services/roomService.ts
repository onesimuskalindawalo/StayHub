import { api } from './api';
import { Room } from '../types';

export const roomService = {
  getRooms: async (): Promise<Room[]> => {
    const response = await api.get<Room[]>('/rooms');
    return response.data;
  },
  
  getRoomsByHostel: async (hostelId: string): Promise<Room[]> => {
    const response = await api.get<Room[]>(`/rooms/hostel/${hostelId}`);
    return response.data;
  },
  
  getRoom: async (id: string): Promise<Room> => {
    const response = await api.get<Room>(`/rooms/${id}`);
    return response.data;
  },
  
  createRoom: async (data: any): Promise<Room> => {
    const response = await api.post<Room>('/rooms', data);
    return response.data;
  },
  
  updateRoom: async (id: string, data: any): Promise<Room> => {
    const response = await api.put<Room>(`/rooms/${id}`, data);
    return response.data;
  },
  
  updateRoomStatus: async (id: string, status: string): Promise<Room> => {
    const response = await api.put<Room>(`/rooms/${id}/status`, { status });
    return response.data;
  },
  
  deleteRoom: async (id: string): Promise<void> => {
    await api.delete(`/rooms/${id}`);
  }
};
