import { api } from './api';
import { Booking } from '../types';

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>('/bookings');
    return response.data;
  },
  
  createBooking: async (data: any): Promise<Booking> => {
    const response = await api.post<Booking>('/bookings', data);
    return response.data;
  },
  
  approveBooking: async (id: string): Promise<Booking> => {
    const response = await api.post<Booking>(`/bookings/${id}/approve`);
    return response.data;
  },
  
  deleteBooking: async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  }
};
