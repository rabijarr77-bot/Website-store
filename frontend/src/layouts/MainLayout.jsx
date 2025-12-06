import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotificationBanner from '../components/NotificationBanner';
import { useNotifications } from '../contexts/NotificationContext';

const MainLayout = () => {
  const { notifications } = useNotifications();
  const activeNotifications = notifications.filter(n => n.isActive);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Notification Banner */}
      <NotificationBanner notifications={activeNotifications} />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;