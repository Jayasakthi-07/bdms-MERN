import axiosInstance from './axios';

export const metricsApi = {
  getDashboardSummary: async () => {
    const response = await axiosInstance.get('/metrics/summary');
    return response.data;
  },

  getBloodGroupDistribution: async () => {
    const response = await axiosInstance.get('/metrics/blood-group-distribution');
    return response.data;
  },

  getInventoryByBloodGroup: async () => {
    const response = await axiosInstance.get('/metrics/inventory-by-blood-group');
    return response.data;
  },

  getMonthlyDonations: async (months = 12) => {
    const response = await axiosInstance.get('/metrics/monthly-donations', {
      params: { months },
    });
    return response.data;
  },

  getRequestStatus: async () => {
    const response = await axiosInstance.get('/metrics/request-status');
    return response.data;
  },

  getFulfillmentRate: async () => {
    const response = await axiosInstance.get('/metrics/fulfillment-rate');
    return response.data;
  },

  getAverageLeadTime: async () => {
    const response = await axiosInstance.get('/metrics/average-lead-time');
    return response.data;
  },
};
