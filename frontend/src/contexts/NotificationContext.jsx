import React, { createContext, useContext, useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    // Join user room if authenticated
    if (isAuthenticated && user) {
      newSocket.emit('join-room', user.id);
    }

    // Listen for real-time notifications
    newSocket.on('new-notification', (data) => {
      setNotifications(prev => [data.notification, ...prev]);
    });

    newSocket.on('notification-updated', (data) => {
      setNotifications(prev => 
        prev.map(n => n._id === data.notification._id ? data.notification : n)
      );
    });

    newSocket.on('notification-toggled', (data) => {
      setNotifications(prev => 
        prev.map(n => n._id === data.notificationId ? { ...n, isActive: data.isActive } : n)
      );
    });

    newSocket.on('payment-verified', (data) => {
      // Handle payment verification notification
      console.log('Payment verified:', data);
    });

    newSocket.on('server-created', (data) => {
      // Handle server creation notification
      console.log('Server created:', data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Load active notifications
    const loadNotifications = async () => {
      try {
        const activeNotifications = await notificationService.getActiveNotifications();
        setNotifications(activeNotifications);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  const createNotification = async (notificationData) => {
    try {
      const notification = await notificationService.createNotification(notificationData);
      setNotifications(prev => [notification, ...prev]);
      return { success: true };
    } catch (error) {
      console.error('Failed to create notification:', error);
      return { success: false, message: error.message };
    }
  };

  const updateNotification = async (id, notificationData) => {
    try {
      const notification = await notificationService.updateNotification(id, notificationData);
      setNotifications(prev => 
        prev.map(n => n._id === id ? notification : n)
      );
      return { success: true };
    } catch (error) {
      console.error('Failed to update notification:', error);
      return { success: false, message: error.message };
    }
  };

  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      return { success: true };
    } catch (error) {
      console.error('Failed to delete notification:', error);
      return { success: false, message: error.message };
    }
  };

  const toggleNotification = async (id) => {
    try {
      const notification = await notificationService.toggleNotification(id);
      setNotifications(prev => 
        prev.map(n => n._id === id ? notification : n)
      );
      return { success: true };
    } catch (error) {
      console.error('Failed to toggle notification:', error);
      return { success: false, message: error.message };
    }
  };

  const value = {
    notifications,
    socket,
    createNotification,
    updateNotification,
    deleteNotification,
    toggleNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};