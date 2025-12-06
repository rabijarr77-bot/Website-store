import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const NotificationBanner = ({ notifications }) => {
  const [dismissedNotifications, setDismissedNotifications] = useState([]);

  if (!notifications || notifications.length === 0) {
    return null;
  }

  const activeNotifications = notifications.filter(
    n => !dismissedNotifications.includes(n._id)
  );

  if (activeNotifications.length === 0) {
    return null;
  }

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'maintenance':
        return {
          bg: 'bg-orange-50 border-orange-200',
          text: 'text-orange-800',
          icon: 'text-orange-600',
          border: 'border-orange-200'
        };
      case 'trouble':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: 'text-red-600',
          border: 'border-red-200'
        };
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-600',
          border: 'border-blue-200'
        };
    }
  };

  const dismissNotification = (notificationId) => {
    setDismissedNotifications(prev => [...prev, notificationId]);
  };

  return (
    <AnimatePresence>
      {activeNotifications.map((notification) => {
        const styles = getNotificationStyles(notification.type);
        const Icon = notification.type === 'trouble' 
          ? ExclamationTriangleIcon 
          : InformationCircleIcon;

        return (
          <motion.div
            key={notification._id}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className={`relative ${styles.bg} ${styles.border} border-b px-4 py-3 z-50`}
          >
            <div className="max-w-7xl mx-auto flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon className={`w-5 h-5 mt-0.5 ${styles.icon} flex-shrink-0`} />
                <div className="flex-1">
                  <h3 className={`font-semibold ${styles.text}`}>
                    {notification.title}
                  </h3>
                  <p className={`text-sm mt-1 ${styles.text}`}>
                    {notification.message}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => dismissNotification(notification._id)}
                className={`ml-4 p-1 rounded-lg ${styles.text} hover:bg-white/50 transition-colors`}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default NotificationBanner;