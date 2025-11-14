import axiosInstance from './axios';

export interface DonationRequest {
  _id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  requestedAt: string;
  preferredDate?: string;
  center?: string;
  scheduledAt?: string;
  completedAt?: string;
  adminNotes?: string;
  donorNotes?: string;
  rejectionReason?: string;
}

export interface EligibilityResponse {
  isEligible: boolean;
  reasons: string[];
  nextEligibleDate?: string;
  lastDonationAt?: string;
}

export const donorApi = {
  getProfile: async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await axiosInstance.put('/users/me', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await axiosInstance.post('/users/me/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  getDonationHistory: async (params?: { status?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) => {
    const response = await axiosInstance.get('/users/me/history', { params });
    return response.data;
  },

  getEligibility: async (): Promise<{ success: boolean; data: EligibilityResponse }> => {
    const response = await axiosInstance.get('/users/me/eligibility');
    return response.data;
  },

  createDonationRequest: async (data: { preferredDate?: string; center?: string; donorNotes?: string }) => {
    const response = await axiosInstance.post('/requests', data);
    return response.data;
  },

  getMyRequests: async (status?: string) => {
    const response = await axiosInstance.get('/requests', { params: { status } });
    return response.data;
  },

  cancelRequest: async (id: string) => {
    const response = await axiosInstance.patch(`/requests/${id}/cancel`);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.delete('/users/me');
    return response.data;
  },
};
