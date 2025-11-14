import axiosInstance from './axios';

export const adminApi = {
  // Donor Management
  getAllDonors: async (params?: {
    search?: string;
    bloodGroup?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const response = await axiosInstance.get('/admin/donors', { params });
    return response.data;
  },

  getDonorById: async (id: string) => {
    const response = await axiosInstance.get(`/admin/donors/${id}`);
    return response.data;
  },

  updateDonor: async (id: string, data: any) => {
    const response = await axiosInstance.put(`/admin/donors/${id}`, data);
    return response.data;
  },

  toggleDonorStatus: async (id: string) => {
    const response = await axiosInstance.patch(`/admin/donors/${id}/toggle-status`);
    return response.data;
  },

  // Request Management
  getAllRequests: async (params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await axiosInstance.get('/admin/requests', { params });
    return response.data;
  },

  approveRequest: async (id: string, scheduledAt: string, adminNotes?: string) => {
    const response = await axiosInstance.patch(`/admin/requests/${id}/approve`, {
      scheduledAt,
      adminNotes,
    });
    return response.data;
  },

  rejectRequest: async (id: string, rejectionReason: string, adminNotes?: string) => {
    const response = await axiosInstance.patch(`/admin/requests/${id}/reject`, {
      rejectionReason,
      adminNotes,
    });
    return response.data;
  },

  completeRequest: async (id: string) => {
    const response = await axiosInstance.patch(`/admin/requests/${id}/complete`);
    return response.data;
  },

  // Audit Logs
  getAuditLogs: async (params?: {
    action?: string;
    entityType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await axiosInstance.get('/admin/audit-logs', { params });
    return response.data;
  },
};
