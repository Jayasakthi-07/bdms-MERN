import axiosInstance from './axios';

export const inventoryApi = {
  getAllInventory: async (params?: { center?: string; bloodGroup?: string }) => {
    const response = await axiosInstance.get('/inventory', { params });
    return response.data;
  },

  getInventoryById: async (id: string) => {
    const response = await axiosInstance.get(`/inventory/${id}`);
    return response.data;
  },

  createInventory: async (data: {
    center: string;
    bloodGroup: string;
    units: number;
    lowStockThreshold: number;
    expiryDates?: string[];
  }) => {
    const response = await axiosInstance.post('/inventory', data);
    return response.data;
  },

  updateInventory: async (id: string, data: {
    units?: number;
    lowStockThreshold?: number;
    expiryDates?: string[];
  }) => {
    const response = await axiosInstance.patch(`/inventory/${id}`, data);
    return response.data;
  },

  deleteInventory: async (id: string) => {
    const response = await axiosInstance.delete(`/inventory/${id}`);
    return response.data;
  },

  getSummary: async () => {
    const response = await axiosInstance.get('/inventory/summary');
    return response.data;
  },

  getLowStock: async () => {
    const response = await axiosInstance.get('/inventory/low-stock');
    return response.data;
  },
};
