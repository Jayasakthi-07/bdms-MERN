import axiosInstance from './axios';

export const notificationsApi = {
  getMyNotifications: async (params?: {
    isRead?: boolean;
    type?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await axiosInstance.get('/notifications', { params });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axiosInstance.get('/notifications/unread-count');
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await axiosInstance.patch(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axiosInstance.patch('/notifications/mark-all-read');
    return response.data;
  },

  deleteNotification: async (id: string) => {
    const response = await axiosInstance.delete(`/notifications/${id}`);
    return response.data;
  },
};
