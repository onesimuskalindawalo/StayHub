import { api } from './api';
import { Payment } from '../types';

export const paymentService = {
  getPayments: async (): Promise<Payment[]> => {
    const response = await api.get<Payment[]>('/payments');
    return response.data;
  },
  
  createPayment: async (data: any): Promise<Payment> => {
    const response = await api.post<Payment>('/payments', data);
    return response.data;
  },
  
  getPayment: async (id: string): Promise<Payment> => {
    const response = await api.get<Payment>(`/payments/${id}`);
    return response.data;
  }
};
