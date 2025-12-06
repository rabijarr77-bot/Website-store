import api from './authService';

export const notificationService = {
  // Get active notifications
  getActiveNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data.notifications;
  },

  // Get all notifications (admin)
  getAllNotifications: async () => {
    const response = await api.get('/notifications/admin/all');
    return response.data.notifications;
  },

  // Create notification (admin)
  createNotification: async (notificationData) => {
    const response = await api.post('/notifications/admin/create', notificationData);
    return response.data.notification;
  },

  // Update notification (admin)
  updateNotification: async (id, notificationData) => {
    const response = await api.put(`/notifications/admin/${id}`, notificationData);
    return response.data.notification;
  },

  // Delete notification (admin)
  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/admin/${id}`);
    return response.data;
  },

  // Toggle notification status (admin)
  toggleNotification: async (id) => {
    const response = await api.put(`/notifications/admin/${id}/toggle`);
    return response.data.notification;
  },
};