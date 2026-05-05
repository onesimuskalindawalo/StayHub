import { api } from './api';

export const reportService = {
  getOccupancyReport: async (): Promise<any> => {
    const response = await api.get('/reports/occupancy');
    return response.data;
  },
  
  getRevenueReport: async (): Promise<any> => {
    const response = await api.get('/reports/revenue');
    return response.data;
  },
  
  getRoomsReport: async (): Promise<any> => {
    const response = await api.get('/reports/rooms');
    return response.data;
  }
};
