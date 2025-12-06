import React from 'react';
import { Outlet } from 'react-router-dom';
import NotificationBanner from '../components/NotificationBanner';
import { useNotifications } from '../contexts/NotificationContext';

const AuthLayout = () => {
  const { notifications } = useNotifications();
  const activeNotifications = notifications.filter(n => n.isActive);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Notification Banner */}
      <NotificationBanner notifications={activeNotifications} />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;